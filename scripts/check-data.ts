/**
 * Civic data regression check. Run with `npm run check:data` (no network, no extra dependencies).
 *
 * Guards specific regressions found in the 2026 data-integrity review. Passing does NOT prove the
 * site's information is correct; it only proves these known mistakes have not come back.
 *
 * Deliberately NOT checked: repeated barangay phone numbers. DILG publishes some numbers for more
 * than one barangay, and shared numbers can be legitimate. They are kept as published unless a
 * source shows a specific entry is wrong.
 */
import fs from 'fs';
import path from 'path';
import { MARAWI_BARANGAYS } from '../src/data/barangays';
import { BARANGAY_LEADERS } from '../src/data/barangayLeaders';
import { ORDINANCES_LIST } from '../src/data/ordinances';
import { CITY_DEPARTMENTS } from '../src/data/departments';
import { EXECUTIVES } from '../src/data/officials';
import { EMERGENCY_HOTLINES } from '../src/config/site';
import { FDP_DOCUMENTS } from '../src/data/fdp';
import { SERVICES_DATA } from '../src/data/services';
import { isUnverified } from '../src/lib/verification';
import type { Verification } from '../src/types';

const ROOT = path.resolve(__dirname, '..');
const rel = (p: string) => path.relative(ROOT, p).split(path.sep).join('/');

const EXPECTED_BARANGAYS = 101; // PSA PSGC for the City of Marawi (see docs/data-sources.md)

/**
 * marawicity.gov.ph addresses allowed on the site. Add an entry only with a source showing the
 * address is real and in use (the domain did not resolve when checked on 2026-10-23).
 */
const EMAIL_ALLOWLIST: { address: string; source: string; sourceUrl: string }[] = [];

/** Owner-verified numbers that must not drift (confirmed 2026-10-23) */
const VERIFIED_HOTLINES = [
  { id: 'bfp', number: '0907-022-4843', telHref: 'tel:+639070224843', label: /\bBFP\b/ },
  { id: 'apmc', number: '(063) 876 0001', telHref: 'tel:+63638760001', label: /Amai Pakpak Medical Center/ },
];

/** Offices whose heads the owner verified; all other heads need their own source */
const VERIFIED_HEADS = [
  { deptId: 'cmo', officialId: 'mayor' },
  { deptId: 'sp', officialId: 'vice-mayor' },
];

// ---------------------------------------------------------------------------

type Failure = { file: string; record: string; problem: string; fix: string };
const failures: Failure[] = [];
const results: { name: string; failed: number }[] = [];

function check(name: string, run: () => void) {
  const before = failures.length;
  run();
  results.push({ name, failed: failures.length - before });
}
const fail = (file: string, record: string, problem: string, fix: string) => failures.push({ file, record, problem, fix });

/** A claim is "backed" only when it is marked sourced/confirmed AND names its source. */
const hasSource = (v?: Verification | null) => !!v && !isUnverified(v) && !!v.source?.trim();

function walk(dir: string, exts: RegExp, out: string[] = []): string[] {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) walk(p, exts, out);
    else if (exts.test(name)) out.push(p);
  }
  return out;
}
const SHIPPED = [
  ...walk(path.join(ROOT, 'src'), /\.(tsx?|jsx?|json|css)$/),
  ...walk(path.join(ROOT, 'public'), /\.(js|json|csv|html|txt|webmanifest|xml|svg)$/),
];
const lineOf = (text: string, index: number) => text.slice(0, index).split('\n').length;

// 1. Barangay count ----------------------------------------------------------
check('Barangay dataset has exactly 101 PSA barangays', () => {
  const file = 'src/data/barangays.ts';
  if (MARAWI_BARANGAYS.length !== EXPECTED_BARANGAYS) {
    fail(file, 'MARAWI_BARANGAYS', `has ${MARAWI_BARANGAYS.length} barangays, expected ${EXPECTED_BARANGAYS}.`,
      'Compare against the PSA PSGC list for the City of Marawi (1903617000) and restore the missing or extra rows.');
  }
  const seen = new Set<string>();
  for (const b of MARAWI_BARANGAYS) {
    if (!/^1903617\d{3}$/.test(b.psgcCode)) fail(file, b.name, `PSGC code "${b.psgcCode}" is not a Marawi barangay code (1903617xxx).`, 'Copy the 10-digit code from the PSA PSGC page.');
    if (seen.has(b.psgcCode)) fail(file, b.name, `duplicate PSGC code ${b.psgcCode}.`, 'Each barangay needs its own PSA code; check for a doubled row.');
    seen.add(b.psgcCode);
    if (!hasSource(b)) fail(file, b.name, 'has no source on its record.', 'Keep the PSA source fields (level, source, sourceUrl) on every barangay.');
  }
});

check('Public barangay files match the canonical dataset', () => {
  const canonical = new Map(MARAWI_BARANGAYS.map((b) => [b.psgcCode, b]));
  const regen = 'Run `npm run export:data` to regenerate public/data from src/data/barangays.ts.';

  const jsonFile = 'public/data/marawi-barangays.json';
  const json = JSON.parse(fs.readFileSync(path.join(ROOT, jsonFile), 'utf8')) as { psgcCode: string; populationLatest: number }[];
  if (json.length !== EXPECTED_BARANGAYS) fail(jsonFile, '(file)', `has ${json.length} rows, expected ${EXPECTED_BARANGAYS}.`, regen);
  for (const row of json) {
    const b = canonical.get(row.psgcCode);
    if (!b) fail(jsonFile, row.psgcCode, 'is not in the canonical dataset.', regen);
    else if (b.populationLatest !== row.populationLatest) fail(jsonFile, b.name, `population ${row.populationLatest} differs from canonical ${b.populationLatest}.`, regen);
  }

  const csvFile = 'public/data/marawi-barangays.csv';
  const rows = fs.readFileSync(path.join(ROOT, csvFile), 'utf8').replace(/\r/g, '').trim().split('\n').slice(1);
  if (rows.length !== EXPECTED_BARANGAYS) fail(csvFile, '(file)', `has ${rows.length} data rows, expected ${EXPECTED_BARANGAYS}.`, regen);
  for (const row of rows) {
    const code = row.match(/^\d+,"(?:[^"]|"")*",(\d{10}),/)?.[1];
    if (!code || !canonical.has(code)) fail(csvFile, row.slice(0, 40), 'row has no matching PSGC code in the canonical dataset.', regen);
  }
});

check('Barangay leaders map to real barangays (shared numbers are allowed)', () => {
  const codes = new Set(MARAWI_BARANGAYS.map((b) => b.psgcCode));
  for (const code of Object.keys(BARANGAY_LEADERS)) {
    if (!codes.has(code)) fail('src/data/barangayLeaders.ts', code, 'is not a PSGC code in src/data/barangays.ts, so this leader is never shown.', 'Fix the key to the barangay’s 10-digit PSGC code.');
  }
});

// 2. Invented official emails -------------------------------------------------
check('No unsourced marawicity.gov.ph email addresses', () => {
  const allowed = new Set(EMAIL_ALLOWLIST.map((a) => a.address.toLowerCase()));
  for (const file of SHIPPED) {
    const text = fs.readFileSync(file, 'utf8');
    for (const m of text.matchAll(/[A-Za-z0-9._%+-]+@(?:[A-Za-z0-9-]+\.)*marawicity\.gov\.ph/gi)) {
      if (allowed.has(m[0].toLowerCase())) continue;
      fail(`${rel(file)}:${lineOf(text, m.index ?? 0)}`, m[0],
        'is a marawicity.gov.ph address with no recorded source (the domain did not resolve on 2026-10-23).',
        'Remove it, or add it to EMAIL_ALLOWLIST in scripts/check-data.ts with a source showing it is real.');
    }
  }
});

// 3. Ordinances ---------------------------------------------------------------
check('Every listed ordinance has a source', () => {
  for (const o of ORDINANCES_LIST) {
    if (!hasSource(o) || !(o.sourceUrl?.trim() || o.level === 'confirmed')) {
      fail('src/data/ordinances.ts', o.number || o.title, 'is shown as an enacted ordinance but has no source.',
        'Set level, source, and sourceUrl from an official copy (Sangguniang Panlungsod records), or remove the entry.');
    }
  }
});

check('Numbered ordinance citations point to a sourced ordinance', () => {
  const sourced = new Set(ORDINANCES_LIST.filter(hasSource).map((o) => o.number.match(/\d{4}-\d{2,4}/)?.[0]));
  for (const file of SHIPPED) {
    const text = fs.readFileSync(file, 'utf8');
    for (const m of text.matchAll(/\bOrdinance\s+No\.?\s*(\d{4}-\d{2,4})/g)) {
      if (sourced.has(m[1])) continue;
      fail(`${rel(file)}:${lineOf(text, m.index ?? 0)}`, m[0], 'cites a numbered ordinance that is not a sourced entry in src/data/ordinances.ts.',
        'Add the ordinance to ORDINANCES_LIST with its source, or remove the citation.');
    }
  }
});

// 5. User-verified exceptions -------------------------------------------------
check('Verified BFP and APMC hotlines are unchanged and backed', () => {
  const file = 'src/config/site.ts';
  for (const want of VERIFIED_HOTLINES) {
    const h = EMERGENCY_HOTLINES.find((x) => x.id === want.id);
    if (!h) { fail(file, want.id, 'verified hotline is missing from EMERGENCY_HOTLINES.', `Restore it: ${want.number}.`); continue; }
    if (h.number !== want.number || h.telHref !== want.telHref) {
      fail(file, h.label, `number is "${h.number}" (${h.telHref}); the owner-verified number is "${want.number}" (${want.telHref}).`,
        'Restore the verified number, or record the new number’s source and update VERIFIED_HOTLINES in scripts/check-data.ts.');
    }
    if (!want.label.test(h.label)) fail(file, h.label, `label no longer identifies ${want.id.toUpperCase()}.`, 'Keep the label specific to this office.');
    if (!hasSource(h)) fail(file, h.label, 'is no longer marked verified with a source.', 'Restore its level and source (owner confirmation, 2026-10-23).');
  }
});

check('Every hotline marked verified names its source', () => {
  for (const h of EMERGENCY_HOTLINES) {
    if (!isUnverified(h) && !h.source?.trim()) {
      fail('src/config/site.ts', h.label, 'is marked verified/sourced but has no source.', 'Add the source, or remove the verification fields so the site labels it Unverified.');
    }
  }
});

check('APMC and the City Health Office are not conflated', () => {
  const near = (text: string, i: number) => text.slice(Math.max(0, i - 80), i);
  for (const file of SHIPPED) {
    const text = fs.readFileSync(file, 'utf8');
    for (const m of text.matchAll(/876[\s-]?0001/g)) {
      const before = near(text, m.index ?? 0);
      if (/City Health Office|\bCHO\b/.test(before) && !/APMC|Amai Pakpak/.test(before)) {
        fail(`${rel(file)}:${lineOf(text, m.index ?? 0)}`, '(063) 876 0001', 'APMC’s number is attributed to the City Health Office.', 'Label it as Amai Pakpak Medical Center (APMC); the CHO number is separate and unverified.');
      }
    }
    for (const m of text.matchAll(/221[\s-]?2536/g)) {
      const before = near(text, m.index ?? 0);
      if (/APMC|Amai Pakpak/.test(before)) {
        fail(`${rel(file)}:${lineOf(text, m.index ?? 0)}`, '(063) 221-2536', 'the unverified CHO number is attributed to APMC.', 'APMC’s verified number is (063) 876 0001; do not reuse the CHO number for APMC.');
      }
    }
  }
});

check('Department heads: Mayor and Vice Mayor verified, no other unsourced heads', () => {
  const file = 'src/data/departments.ts';
  for (const { deptId, officialId } of VERIFIED_HEADS) {
    const d = CITY_DEPARTMENTS.find((x) => x.id === deptId);
    const official = EXECUTIVES.find((o) => o.id === officialId);
    if (!d) { fail(file, deptId, 'office is missing.', 'Restore the office record.'); continue; }
    if (!official?.name) { fail('src/data/officials.ts', officialId, 'verified official is missing, so the office head cannot be cross-checked.', 'Restore the official in EXECUTIVES.'); continue; }
    if (!d.head || !hasSource(d.headVerification)) fail(file, d.name, 'head is no longer shown as a verified officeholder.', 'Restore head and headVerification (owner-verified, 2026-10-23).');
    else if (d.head !== official.name) fail(file, d.name, `head "${d.head}" does not match ${officialId} "${official.name}" in src/data/officials.ts.`, 'Use the same verified name in both files.');
  }
  for (const d of CITY_DEPARTMENTS) {
    if (d.head && !hasSource(d.headVerification)) {
      fail(file, d.name, `head "${d.head}" has no source.`, 'Remove the name (the site shows "To be confirmed") or add headVerification with its source.');
    }
    if ((d.phone || d.email) && !hasSource(d)) {
      fail(file, d.name, `shows ${[d.phone && 'a phone', d.email && 'an email'].filter(Boolean).join(' and ')} with no source.`, 'Remove the contact, or source the office record.');
    }
  }
});

check('Every Full Disclosure Policy document links to its official posting', () => {
  for (const d of FDP_DOCUMENTS) {
    if (!hasSource(d) || !d.sourceUrl) {
      fail('src/data/fdp.ts', d.code, 'has no source and link to the official posting.', 'Add source and sourceUrl (DILG FDP Portal or a City Hall copy), or leave the list empty.');
    }
  }
});

/** Local laws and programs cited as a fee's legal basis that a source has confirmed (none yet) */
const SOURCED_LOCAL_CITATIONS: { citation: string; source: string }[] = [];
const LOCAL_CITATION = /\b(Marawi|City)\b[^/]*\b(Ordinance|Code|Program)\b/i;

check('Fees do not cite unconfirmed local ordinances, codes, or programs', () => {
  for (const s of SERVICES_DATA) {
    for (const fee of s.fees) {
      if (LOCAL_CITATION.test(fee.legalBasis) && !SOURCED_LOCAL_CITATIONS.some((c) => c.citation === fee.legalBasis)) {
        fail('src/data/services.ts', `${s.slug}: ${fee.particular}`, `cites "${fee.legalBasis}", which no source confirms.`, 'Use "To be confirmed", or add the citation to SOURCED_LOCAL_CITATIONS with its source.');
      }
    }
  }
});

check('Offline page lists exactly the sourced or verified hotlines', () => {
  const file = 'public/offline.html';
  const html = fs.readFileSync(path.join(ROOT, file), 'utf8');
  const shown = [...html.matchAll(/href="(tel:[^"]+)"[^>]*>([^<]+)</g)].map((m) => `${m[1]} ${m[2].trim()}`).sort();
  const want = EMERGENCY_HOTLINES.filter((h) => hasSource(h)).map((h) => `${h.telHref} ${h.number}`).sort();
  if (JSON.stringify(shown) !== JSON.stringify(want)) {
    fail(file, 'Emergency numbers', `shows [${shown.join(', ')}], expected [${want.join(', ')}].`, 'Copy the sourced or verified entries of EMERGENCY_HOTLINES (src/config/site.ts) exactly; never list unverified numbers offline.');
  }
});

check('No open-data licence is claimed for government data', () => {
  // docs/LICENSING.md: official data is not licensed by this project, so no CC0 or similar claim.
  for (const file of SHIPPED) {
    const text = fs.readFileSync(file, 'utf8');
    const m = /\bCC0\b|public domain dedication/i.exec(text);
    if (m) fail(path.relative(ROOT, file).split(path.sep).join('/'), `line ${lineOf(text, m.index)}`, `claims a licence ("${m[0]}") for data this project does not own.`, 'Remove the licence claim; point to the data source instead (docs/LICENSING.md).');
  }
});

// Report ----------------------------------------------------------------------
console.log('Civic data regression check\n');
for (const r of results) console.log(`${r.failed === 0 ? 'PASS' : 'FAIL'}  ${r.name}${r.failed ? ` (${r.failed})` : ''}`);
console.log('NOTE  Repeated barangay phone numbers are not checked: shared DILG numbers can be legitimate.');

if (failures.length) {
  console.log(`\n${failures.length} problem(s):\n`);
  for (const f of failures) console.log(`- ${f.file} [${f.record}]\n    Problem: ${f.problem}\n    Fix: ${f.fix}`);
  process.exit(1);
}
console.log('\nAll checks passed. This guards known regressions only; it does not prove the data is correct.');
