/**
 * Security regression check for output encoding. Run with `npm run check:security`
 * (no network, no extra dependencies).
 *
 * Covers the two places where site data is written into another format by hand:
 * - JSON-LD inside <script type="application/ld+json"> (must not be able to close the tag)
 * - CSV downloads (RFC 4180 quoting and spreadsheet formula-injection protection)
 * It also checks the Content-Security-Policy header config in next.config.ts (report-only).
 *
 * Passing shows these encoders handle the hostile inputs below. It does not audit the whole site.
 */
import assert from 'node:assert/strict';
import fs from 'fs';
import path from 'path';
import {
  buildBreadcrumbSchema,
  buildFAQSchema,
  buildGovernmentOrganizationSchema,
  buildGovernmentServiceSchema,
  serializeJsonLd,
} from '../src/lib/jsonld';
import { csvCell, generateBarangaysCSV } from '../src/lib/csv';
import { MARAWI_BARANGAYS } from '../src/data/barangays';
import { SERVICES_DATA } from '../src/data/services';
import { CERTIFICATES_FAQS } from '../src/data/certificates';
import { APP_ROUTES } from '../src/lib/routes';
import type { BarangayRecord } from '../src/types';
import nextConfig from '../next.config';

const ROOT = path.resolve(__dirname, '..');
const results: { name: string; error?: string }[] = [];
const pending: Promise<void>[] = [];
function test(name: string, fn: () => void | Promise<void>) {
  pending.push((async () => {
    try {
      await fn();
      results.push({ name });
    } catch (e) {
      results.push({ name, error: e instanceof Error ? e.message.split('\n').slice(0, 6).join('\n      ') : String(e) });
    }
  })());
}

/** Strict RFC 4180 parser, used only to prove the generated CSV round-trips */
function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = '';
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (ch === '"') quoted = false;
      else cell += ch;
    } else if (ch === '"') {
      if (cell !== '') throw new Error(`quote in the middle of an unquoted cell at offset ${i}`);
      quoted = true;
    } else if (ch === ',') { row.push(cell); cell = ''; }
    else if (ch === '\n') { row.push(cell); rows.push(row); row = []; cell = ''; }
    else if (ch === '\r') { /* CRLF row ending */ }
    else cell += ch;
  }
  if (quoted) throw new Error('unterminated quoted cell');
  row.push(cell);
  rows.push(row);
  return rows;
}

const HOSTILE = [
  '</script><script>alert(1)</script>',
  '<!-- comment -->',
  'Tag <b>bold</b> & "quotes"',
  'line separator paragraph',
];

// --- JSON-LD ------------------------------------------------------------------
test('JSON-LD: hostile strings cannot close the script tag and round-trip unchanged', () => {
  for (const s of HOSTILE) {
    const data = { name: s, nested: [{ text: s }] };
    const out = serializeJsonLd(data);
    assert.ok(!out.includes('<'), `raw "<" in output for ${JSON.stringify(s)}`);
    assert.ok(!/<\/script/i.test(out), 'output contains </script');
    assert.deepEqual(JSON.parse(out), data, 'parsed value differs from input');
  }
});

test('JSON-LD: every schema the site emits is valid JSON with no raw "<"', () => {
  const schemas: unknown[] = [buildGovernmentOrganizationSchema(), buildFAQSchema(CERTIFICATES_FAQS)];
  for (const r of APP_ROUTES) schemas.push(buildBreadcrumbSchema(r.breadcrumbs));
  for (const s of SERVICES_DATA) {
    schemas.push(buildGovernmentServiceSchema(s, `https://bettermarawi.org/services/${s.slug}`));
    if (s.faqs.length) schemas.push(buildFAQSchema(s.faqs));
  }
  for (const schema of schemas) {
    const out = serializeJsonLd(schema);
    assert.ok(!out.includes('<'), 'raw "<" in a real schema');
    assert.deepEqual(JSON.parse(out), JSON.parse(JSON.stringify(schema)));
  }
  assert.ok(schemas.length > 30, `expected the full set of schemas, got ${schemas.length}`);
});

test('JSON-LD: the only dangerouslySetInnerHTML in src uses serializeJsonLd', () => {
  const hits: string[] = [];
  const walk = (dir: string) => {
    for (const name of fs.readdirSync(dir)) {
      const p = path.join(dir, name);
      if (fs.statSync(p).isDirectory()) walk(p);
      else if (/\.tsx?$/.test(name) && fs.readFileSync(p, 'utf8').includes('dangerouslySetInnerHTML')) hits.push(path.relative(ROOT, p).split(path.sep).join('/'));
    }
  };
  walk(path.join(ROOT, 'src'));
  assert.deepEqual(hits, ['src/components/seo/JsonLd.tsx'], `unexpected raw HTML sinks: ${hits.join(', ')}`);
  const src = fs.readFileSync(path.join(ROOT, 'src/components/seo/JsonLd.tsx'), 'utf8');
  assert.ok(/__html:\s*serializeJsonLd\(/.test(src), 'JsonLd.tsx must pass data through serializeJsonLd');
});

// --- CSV ----------------------------------------------------------------------
test('CSV: cell encoding cases', () => {
  const cases: [string | number, { quote?: boolean } | undefined, string][] = [
    ['Ambolong', undefined, 'Ambolong'],
    ['Ambolong', { quote: true }, '"Ambolong"'],
    ['Bito, Buadi', undefined, '"Bito, Buadi"'],
    ['Say "hi"', undefined, '"Say ""hi"""'],
    ['two\nlines', undefined, '"two\nlines"'],
    ['two\r\nlines', undefined, '"two\r\nlines"'],
    ['=HYPERLINK("http://x","y")', undefined, `"'=HYPERLINK(""http://x"",""y"")"`],
    ['+1+1', undefined, "'+1+1"],
    ['-2+3', undefined, "'-2+3"],
    ['@SUM(A1)', undefined, "'@SUM(A1)"],
    ['\tTab', undefined, "'\tTab"],
    ['\rReturn', undefined, `"'\rReturn"`],
    [1903617001, undefined, '1903617001'],
    [-5, undefined, '-5'],
    [Number.NaN, undefined, ''],
    ['', undefined, ''],
  ];
  for (const [value, opts, want] of cases) assert.equal(csvCell(value, opts), want, `csvCell(${JSON.stringify(value)})`);
});

test('CSV: hostile barangay names round-trip through an RFC 4180 parser', () => {
  const base = MARAWI_BARANGAYS[0];
  const names = ['Comma, Town', 'Quote "Q" Village', 'Multi\nLine', '=1+2', '@cmd', '-3', '+4', 'Plain'];
  const rows: BarangayRecord[] = names.map((name, i) => ({ ...base, id: i + 1, name }));
  const parsed = parseCsv(generateBarangaysCSV(rows));
  assert.equal(parsed.length, names.length + 1, 'row count (header + rows)');
  for (let i = 0; i < names.length; i++) {
    assert.equal(parsed[i + 1].length, 6, `row ${i + 1} should have 6 columns`);
    const expected = /^[=+\-@\t\r]/.test(names[i]) ? `'${names[i]}` : names[i];
    assert.equal(parsed[i + 1][1], expected, `name column for ${JSON.stringify(names[i])}`);
  }
});

test('CSV: real barangay export is unchanged and matches the published file', () => {
  const csv = generateBarangaysCSV(MARAWI_BARANGAYS);
  const published = fs.readFileSync(path.join(ROOT, 'public/data/marawi-barangays.csv'), 'utf8').replace(/\r\n/g, '\n');
  assert.equal(csv, published, 'generated CSV differs from public/data/marawi-barangays.csv (run npm run export:data)');
  const parsed = parseCsv(csv);
  assert.equal(parsed.length, 102, 'header + 101 barangays');
  assert.ok(parsed.every((r) => r.length === 6), 'every row has 6 columns');
});

// --- Content Security Policy --------------------------------------------------
type Header = { key: string; value: string };
async function configHeaders(nodeEnv: string): Promise<Header[]> {
  const env = process.env as Record<string, string | undefined>;
  const previous = env.NODE_ENV;
  env.NODE_ENV = nodeEnv;
  try {
    const rules = (await nextConfig.headers?.()) ?? [];
    return rules.filter((r) => r.source === '/:path*').flatMap((r) => r.headers as Header[]);
  } finally {
    env.NODE_ENV = previous;
  }
}

test('CSP: production sends a report-only policy and nothing enforcing; development sends none', async () => {
  const prod = await configHeaders('production');
  const keys = prod.map((h) => h.key.toLowerCase());
  assert.ok(!keys.includes('content-security-policy'), 'an enforcing CSP is set; this batch keeps CSP report-only');
  const csp = prod.find((h) => h.key === 'Content-Security-Policy-Report-Only');
  assert.ok(csp, 'production is missing Content-Security-Policy-Report-Only');
  const directives = new Map(csp!.value.split(';').map((d) => d.trim().split(/\s+/)).map(([k, ...v]) => [k, v]));
  for (const [name, want] of [['frame-ancestors', "'none'"], ['object-src', "'none'"], ['base-uri', "'self'"], ['default-src', "'self'"]]) {
    assert.ok(directives.get(name)?.includes(want), `${name} should include ${want}`);
  }
  for (const api of ['https://open.er-api.com', 'https://api.open-meteo.com']) {
    assert.ok(directives.get('connect-src')?.includes(api), `connect-src must allow ${api} (header widgets)`);
  }
  assert.ok(!/report-(uri|to)/.test(csp!.value), 'a reporting endpoint was added');
  const dev = await configHeaders('development');
  assert.ok(!dev.some((h) => /content-security-policy/i.test(h.key)), 'next dev needs eval; no CSP outside production');
});

// --- Report -------------------------------------------------------------------
Promise.all(pending).then(() => {
  console.log('Security regression check\n');
  for (const r of results) console.log(`${r.error ? 'FAIL' : 'PASS'}  ${r.name}${r.error ? `\n      ${r.error}` : ''}`);
  const failed = results.filter((r) => r.error).length;
  console.log(failed ? `\n${failed} check(s) failed.` : '\nAll checks passed. This covers output encoding and the CSP header only; it is not a full security audit.');
  process.exit(failed ? 1 : 0);
});
