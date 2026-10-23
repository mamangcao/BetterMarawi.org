/**
 * Translation check and review backlog. Run with `npm run check:translations`.
 *
 * Fails when:
 * - en.ts, fil.ts, and mrw.ts do not have the same keys, or
 * - a Meranaw string is still the English text but has no `// TODO(mrw-review)` comment above it
 *   (the placeholder rule in docs/TRANSLATION_GUIDE.md).
 *
 * `npm run check:translations -- --markdown docs/TRANSLATION_BACKLOG.md` also rewrites the review
 * backlog. It reports status only: it never translates anything.
 */
import fs from 'fs';
import path from 'path';
import { en } from '../src/i18n/translations/en';
import { fil } from '../src/i18n/translations/fil';
import { mrw } from '../src/i18n/translations/mrw';

const ROOT = path.resolve(__dirname, '..');

/**
 * Heuristic: files with visible English sentences written straight into JSX (text between tags,
 * starting with a capital and 16+ characters). That text never changes language.
 */
function hardcodedText(): { file: string; count: number; translated: boolean }[] {
  const out: { file: string; count: number; translated: boolean }[] = [];
  const walk = (dir: string) => {
    for (const name of fs.readdirSync(dir)) {
      const p = path.join(dir, name);
      if (fs.statSync(p).isDirectory()) walk(p);
      else if (name.endsWith('.tsx')) {
        const src = fs.readFileSync(p, 'utf8');
        const count = (src.match(/>\s*[A-Z][^<>{}\n]{15,}\s*</g) ?? []).length;
        if (count) out.push({ file: path.relative(ROOT, p).split(path.sep).join('/'), count, translated: src.includes('useTranslation') });
      }
    }
  };
  walk(path.join(ROOT, 'src/app'));
  walk(path.join(ROOT, 'src/components'));
  return out.sort((a, b) => b.count - a.count);
}
const MARKER = 'TODO(mrw-review)';

type Dict = { [k: string]: string | Dict };
function flatten(o: Dict, prefix = ''): Map<string, string> {
  const out = new Map<string, string>();
  for (const [k, v] of Object.entries(o)) {
    if (typeof v === 'string') out.set(prefix + k, v);
    else for (const [kk, vv] of flatten(v, `${prefix}${k}.`)) out.set(kk, vv);
  }
  return out;
}

/** Keys (dotted paths) in a translation file that have the marker comment directly above them or above a parent object */
export function markedKeys(file: string): Set<string> {
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
  const marked = new Set<string>();
  const stack: { key: string; marked: boolean }[] = [];
  let pendingMarker = false;
  for (const line of lines) {
    const t = line.trim();
    if (t.startsWith('//')) {
      if (t.includes(MARKER)) pendingMarker = true;
      continue;
    }
    const m = t.match(/^(?:'([^']+)'|"([^"]+)"|([A-Za-z0-9_]+))\s*:\s*(\{)?/);
    if (m && stack.length >= 1) {
      const key = m[1] ?? m[2] ?? m[3];
      const inherited = stack.slice(1).some((s) => s.marked);
      const full = [...stack.slice(1).map((s) => s.key), key].join('.');
      if (m[4] && !t.includes('}')) stack.push({ key, marked: pendingMarker });
      else if (pendingMarker || inherited) marked.add(full);
      pendingMarker = false;
    } else if (/^export const \w+(\s*:[^=]+)?\s*=\s*\{/.test(t)) {
      stack.push({ key: '', marked: false });
    } else if (/^\}/.test(t)) {
      const closed = stack.pop();
      if (closed?.marked) for (const k of flatten(getPath(mrw as unknown as Dict, stack, closed.key)).keys()) marked.add([...stack.slice(1).map((s) => s.key), closed.key, k].join('.'));
    }
  }
  return marked;
}
function getPath(root: Dict, stack: { key: string }[], last: string): Dict {
  let cur: Dict = root;
  for (const s of [...stack.slice(1), { key: last }]) cur = (cur[s.key] as Dict) ?? {};
  return cur;
}

function main() {
  const E = flatten(en as unknown as Dict);
  const F = flatten(fil as unknown as Dict);
  const M = flatten(mrw as unknown as Dict);
  const marked = markedKeys(path.join(ROOT, 'src/i18n/translations/mrw.ts'));
  const problems: string[] = [];

  for (const [name, map] of [['fil.ts', F], ['mrw.ts', M]] as const) {
    const missing = [...E.keys()].filter((k) => !map.has(k));
    const extra = [...map.keys()].filter((k) => !E.has(k));
    if (missing.length) problems.push(`${name} is missing keys: ${missing.join(', ')}`);
    if (extra.length) problems.push(`${name} has keys that en.ts does not: ${extra.join(', ')}`);
  }
  const placeholders = [...E.keys()].filter((k) => M.get(k) === E.get(k));
  const unmarked = placeholders.filter((k) => !marked.has(k));
  if (unmarked.length) problems.push(`Meranaw strings still in English without a ${MARKER} comment: ${unmarked.join(', ')}`);
  const meranawText = [...E.keys()].filter((k) => M.has(k) && M.get(k) !== E.get(k));
  const filSameAsEnglish = [...E.keys()].filter((k) => F.get(k) === E.get(k));

  console.log('Translation check\n');
  console.log(`Keys: ${E.size} in each of en, fil, mrw${problems.some((p) => p.includes('keys')) ? ' (MISMATCH)' : ''}`);
  console.log(`Meranaw: ${meranawText.length} strings in Meranaw (review status not recorded), ${placeholders.length} still English placeholders`);
  console.log(`Filipino: ${E.size - filSameAsEnglish.length} translated, ${filSameAsEnglish.length} identical to English (names and loanwords; check with a reviewer)`);

  const mdArg = process.argv.indexOf('--markdown');
  if (mdArg > 0) {
    const out = path.resolve(process.argv[mdArg + 1]);
    const row = (k: string) => `| \`${k}\` | ${(E.get(k) ?? '').replace(/\|/g, '\\|').slice(0, 90)} |`;
    const groups = new Map<string, string[]>();
    for (const k of placeholders) {
      const g = k.includes('.') ? k.split('.')[0] : 'Single strings';
      groups.set(g, [...(groups.get(g) ?? []), k]);
    }
    const md = [
      '# Translation Review Backlog',
      '',
      `Generated by \`npm run check:translations -- --markdown docs/TRANSLATION_BACKLOG.md\`. Do not edit by hand; update the translation files and regenerate. Rules: \`docs/TRANSLATION_GUIDE.md\`.`,
      '',
      '## Summary',
      '',
      '| Language | Strings | Status |',
      '| --- | --- | --- |',
      `| English | ${E.size} | Source |`,
      `| Filipino | ${E.size} | ${E.size - filSameAsEnglish.length} translated, ${filSameAsEnglish.length} identical to English. No fluent-speaker review is recorded in the review log. |`,
      `| Meranaw | ${E.size} | ${meranawText.length} in Meranaw, review status not recorded; ${placeholders.length} English placeholders awaiting a fluent speaker |`,
      '',
      'Page text written directly in page and component files (not in the translation files) is English only and is not counted here. See "English-only text in pages and components" at the end.',
      '',
      '## Meranaw text with no recorded review',
      '',
      'These strings are in Meranaw, but the review log has no reviewer for them. A fluent speaker should confirm or correct them.',
      '',
      '| Key | Meranaw |',
      '| --- | --- |',
      ...meranawText.map((k) => `| \`${k}\` | ${(M.get(k) ?? '').replace(/\|/g, '\\|')} |`),
      '',
      '## Filipino strings identical to English',
      '',
      'Usually correct (names, loanwords). A Filipino reviewer should confirm each one.',
      '',
      '| Key | Text |',
      '| --- | --- |',
      ...filSameAsEnglish.map(row),
      '',
      `## Meranaw placeholders (English text, marked \`${MARKER}\`)`,
      '',
      `${placeholders.length} strings, grouped by area. Each needs a fluent Meranaw speaker; do not use machine translation.`,
      '',
      ...[...groups].flatMap(([g, ks]) => [`### ${g} (${ks.length})`, '', '| Key | English |', '| --- | --- |', ...ks.map(row), '']),
      '## English-only text in pages and components',
      '',
      'Found by a simple scan for English sentences written straight into JSX, so treat counts as approximate. This text stays English in every language. Server-rendered pages cannot use `useTranslation`, so moving their text into the translation files needs a design decision (see docs/AUDIT_STATUS.md).',
      '',
      '| File | Sentences | Uses translations elsewhere |',
      '| --- | --- | --- |',
      ...hardcodedText().map((h) => `| \`${h.file}\` | ${h.count} | ${h.translated ? 'Yes' : 'No'} |`),
      '',
    ].join('\n');
    fs.writeFileSync(out, md.replace(/\n/g, '\r\n'));
    console.log(`\nWrote ${path.relative(ROOT, out)}`);
  }

  if (problems.length) {
    console.log('');
    for (const p of problems) console.log(`FAIL  ${p}`);
    process.exit(1);
  }
  console.log('\nAll checks passed. This checks structure and markers only, not translation quality.');
}

if (require.main === module) main();
