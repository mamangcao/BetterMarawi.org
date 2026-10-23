/**
 * Browser regression checks on the production build, in headless Chrome. No extra dependencies:
 * it drives an installed Chrome over the DevTools protocol (scripts/browser/cdp.ts).
 *
 *   npm run build
 *   npm run check:browser                      # starts `next start` on port 3210 and tests it
 *   npm run check:browser -- path/to/project   # test a build made in another folder
 *   npm run check:browser -- --url=http://localhost:3100   # test a server you already started
 *   npm run check:browser -- --only=i18n,csp   # run some groups only
 *
 * Needs Google Chrome or Chromium (set CHROME_PATH if it is not found). Do not run `npm run build`
 * in a folder where `npm run dev` is running: they share `.next`. The offline check stops the
 * server it started, so it is skipped with --url.
 */
import { spawn, type ChildProcess } from 'child_process';
import fs from 'fs';
import path from 'path';
import { Browser, findChrome } from './browser/cdp';
import { layoutChecks } from './browser/layout';
import { a11yChecks } from './browser/a11y';
import { seoChecks } from './browser/seo';
import { cspChecks, downloadChecks } from './browser/csp-download';
import { i18nChecks } from './browser/i18n';
import { errorChecks, offlineChecks } from './browser/error-offline';
import type { Ctx } from './browser/types';

const ROOT = path.resolve(__dirname, '..');
const args = process.argv.slice(2);
const urlArg = args.find((a) => a.startsWith('--url='))?.slice(6);
const only = args.find((a) => a.startsWith('--only='))?.slice(7).split(',');
const dir = path.resolve(args.find((a) => !a.startsWith('--')) ?? ROOT);
const PORT = Number(process.env.BROWSER_TEST_PORT ?? 3210);

const GROUPS: [string, (ctx: Ctx) => Promise<void>][] = [
  ['layout', layoutChecks],
  ['a11y', a11yChecks],
  ['seo', seoChecks],
  ['csp', cspChecks],
  ['download', downloadChecks],
  ['i18n', i18nChecks],
  ['error', errorChecks],
  ['offline', offlineChecks], // last: it stops the server
];

async function startServer(): Promise<ChildProcess> {
  if (!fs.existsSync(path.join(dir, '.next/BUILD_ID'))) {
    console.error(`No production build in ${dir}. Run \`npm run build\` first.`);
    process.exit(2);
  }
  const nextBin = [dir, ROOT].map((d) => path.join(d, 'node_modules/next/dist/bin/next')).find((p) => fs.existsSync(p))!;
  const proc = spawn(process.execPath, [nextBin, 'start', '-p', String(PORT)], { cwd: dir, stdio: 'ignore' });
  const base = `http://localhost:${PORT}`;
  for (let i = 0; i < 60; i++) {
    if (await fetch(base).then((r) => r.ok).catch(() => false)) return proc;
    await new Promise((r) => setTimeout(r, 500));
  }
  proc.kill();
  console.error(`The server did not start on port ${PORT}.`);
  process.exit(2);
}

async function main() {
  const chrome = findChrome();
  if (!chrome) {
    console.error('Chrome or Chromium not found. Install it or set CHROME_PATH.');
    process.exit(2);
  }
  let server: ChildProcess | null = urlArg ? null : await startServer();
  const base = (urlArg ?? `http://localhost:${PORT}`).replace(/\/$/, '');
  const browser = await Browser.launch(chrome);
  const results: { group: string; name: string; ok: boolean; detail: string }[] = [];
  const ctx: Ctx = {
    base,
    root: ROOT,
    browser,
    check: () => {},
    canStopServer: !!server,
    stopServer: async () => {
      server?.kill();
      server = null;
      await new Promise((r) => setTimeout(r, 800));
    },
  };

  console.log(`Browser regression check against ${base}\n`);
  for (const [group, run] of GROUPS) {
    if (only && !only.includes(group)) continue;
    ctx.check = (name, ok, detail = '') => {
      results.push({ group, name, ok, detail });
      console.log(`${ok ? 'PASS' : 'FAIL'}  [${group}] ${name}${detail ? ` (${detail})` : ''}`);
    };
    try {
      await run(ctx);
    } catch (e) {
      ctx.check('group finished without a crash', false, e instanceof Error ? e.message.slice(0, 200) : String(e));
    }
  }

  await browser.close();
  server?.kill();
  const failed = results.filter((r) => !r.ok).length;
  console.log(failed ? `\n${failed} of ${results.length} checks failed.` : `\nAll ${results.length} checks passed. Chrome only; not a screen-reader or cross-browser test.`);
  process.exit(failed ? 1 : 0);
}

main();
