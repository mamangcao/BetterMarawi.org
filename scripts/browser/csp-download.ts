import fs from 'fs';
import os from 'os';
import path from 'path';
import { APP_ROUTES } from '../../src/lib/routes';
import { sleep } from './cdp';
import type { Ctx } from './types';

export async function cspChecks({ base, browser, check }: Ctx) {
  // 1. The production server sends the report-only policy and no enforcing one
  const res = await fetch(base + '/');
  const reportOnly = res.headers.get('content-security-policy-report-only') ?? '';
  check('responses carry a report-only CSP and no enforcing CSP', !!reportOnly && !res.headers.get('content-security-policy'), reportOnly ? '' : 'header missing (is this a production build?)');

  // 2. No page violates it, including the header's calls to the rates and weather APIs
  const page = await browser.newPage();
  await page.setViewport(1280);
  // Clear saved rates and weather so the header really calls both APIs under the policy
  await page.goto(base + '/offline.html', 100);
  await page.eval('localStorage.clear()');
  const violations: string[] = [];
  for (const r of APP_ROUTES) {
    await page.goto(base + r.path, 800);
    const v = await page.eval<string[]>('window.__csp');
    if (v.length) violations.push(`${r.path}: ${v.join(', ')}`);
  }
  check(`no CSP violations on all ${APP_ROUTES.length} pages`, violations.length === 0, violations.slice(0, 3).join('; '));
  check('no page errors while loading every page', page.errors.length === 0, page.errors.slice(0, 2).join(' | '));
  await page.close();
}

export async function downloadChecks({ base, root, browser, check }: Ctx) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bm-dl-'));
  try {
    await browser.send('Browser.setDownloadBehavior', { behavior: 'allow', downloadPath: dir, eventsEnabled: true });
    const page = await browser.newPage();
    await page.setViewport(1280);
    await page.goto(base + '/statistics/open-data-ph');
    const clicked = await page.eval<boolean>(`(() => { const b = [...document.querySelectorAll('main button')].find((x) => x.textContent.trim() === 'Download CSV'); b?.click(); return !!b; })()`);
    let file = '';
    for (let i = 0; i < 50 && !file; i++) {
      await sleep(100);
      file = fs.readdirSync(dir).find((f) => f.endsWith('.csv')) ?? '';
    }
    await sleep(200);
    const got = file ? fs.readFileSync(path.join(dir, file), 'utf8') : '';
    const published = fs.readFileSync(path.join(root, 'public/data/marawi-barangays.csv'), 'utf8').replace(/\r\n/g, '\n');
    check('open-data CSV download equals the published barangay file', clicked && got === published, `${file || 'no file'}, ${got.split('\n').length - 1} rows`);
    await page.close();
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}
