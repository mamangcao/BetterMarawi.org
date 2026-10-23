/**
 * UI and rendering regression check. Run with `npm run check:regressions` (no network, no extra
 * dependencies).
 *
 * Guards fixes from the 2026 code-quality review that have no other automated test. Where the code
 * can run in Node (metadata, structured data, hydration renders) the test exercises it. Where it
 * needs a browser (keyboard focus, ARIA wiring) the test only checks the source still contains the
 * fix; the browser behaviour itself was checked by hand and is not covered here.
 */
import assert from 'node:assert/strict';
import fs from 'fs';
import path from 'path';
import { createElement, type ReactNode } from 'react';
import { renderToString } from 'react-dom/server';
import { buildMetadata } from '../src/lib/seo';
import { buildGovernmentOrganizationSchema, buildGovernmentServiceSchema } from '../src/lib/jsonld';
import { SERVICES_DATA } from '../src/data/services';
import { LanguageProvider, useTranslation } from '../src/i18n/LanguageProvider';
import { en } from '../src/i18n/translations/en';
import { fetchWeather, useWeather, WEATHER_CACHE_KEY } from '../src/lib/weather';
import { fetchFxRates, useFxRates, FX_CACHE_KEY } from '../src/lib/fx';
import { APP_ROUTES } from '../src/lib/routes';
import { NAV_DROPDOWNS } from '../src/config/site';
import { SERVICE_CARDS } from '../src/data/serviceCatalog';
import { TOURISM_CATEGORIES } from '../src/data/tourism';
import { formatMillions } from '../src/lib/money';
import { FDPTable } from '../src/components/transparency/FDPTable';
import { FDP_DOCUMENTS, FDP_PORTAL_URL, FDP_YEAR } from '../src/data/fdp';
import { FinancesOverview } from '../src/components/transparency/FinancesOverview';
import { SpecialFunds } from '../src/components/transparency/SpecialFunds';
import { AuditSummary } from '../src/components/transparency/AuditSummary';
import { NationalFunding } from '../src/components/transparency/NationalFunding';
import { AUDIT_FY2020, LGSF_PROJECTS, NATIONAL_RELEASES } from '../src/data/reports';
import { CityHistory } from '../src/components/statistics/CityHistory';
import { OrdinanceProcess } from '../src/components/government/OrdinanceProcess';
import { BLGC_SOURCE, ORDINANCE_FAQS, ORDINANCE_STEPS } from '../src/data/ordinanceGuide';
import { Footer } from '../src/components/layout/Footer';
import { CITY_HISTORY } from '../src/data/cityProfile';
import { YakapLabTests } from '../src/components/services/YakapLabTests';
import { TourismDirectory } from '../src/components/services/TourismDirectory';

const ROOT = path.resolve(__dirname, '..');
const read = (p: string) => fs.readFileSync(path.join(ROOT, p), 'utf8');
const results: { name: string; error?: string }[] = [];
async function test(name: string, fn: () => void | Promise<void>) {
  try {
    await fn();
    results.push({ name });
  } catch (e) {
    results.push({ name, error: e instanceof Error ? e.message.split('\n').slice(0, 6).join('\n      ') : String(e) });
  }
}

function walk(dir: string, out: string[] = []): string[] {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) walk(p, out);
    else out.push(path.relative(ROOT, p).split(path.sep).join('/'));
  }
  return out;
}

/** Minimal browser globals, so the code paths that read saved data think they are in a browser */
function fakeBrowser(storage: Record<string, string>) {
  const g = globalThis as Record<string, unknown>;
  g.window = globalThis;
  g.localStorage = {
    getItem: (k: string) => (k in storage ? storage[k] : null),
    setItem: (k: string, v: string) => { storage[k] = v; },
    removeItem: (k: string) => { delete storage[k]; },
  };
  return () => { delete g.window; delete g.localStorage; };
}

/** Deep search for keys anywhere in a JSON value */
function findKeys(value: unknown, keys: string[], at = '$'): string[] {
  if (Array.isArray(value)) return value.flatMap((v, i) => findKeys(v, keys, `${at}[${i}]`));
  if (!value || typeof value !== 'object') return [];
  return Object.entries(value).flatMap(([k, v]) => [...(keys.includes(k) ? [`${at}.${k}`] : []), ...findKeys(v, keys, `${at}.${k}`)]);
}

/** WCAG 2.x contrast ratio between two #RRGGBB colours */
function contrast(a: string, b: string): number {
  const lum = (hex: string) => {
    const [r, g, bl] = [1, 3, 5].map((i) => {
      const c = parseInt(hex.slice(i, i + 2), 16) / 255;
      return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * bl;
  };
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

async function main() {
  // --- Page titles ------------------------------------------------------------------------------
  await test('Titles: buildMetadata adds the site name once and bypasses the layout template', () => {
    for (const title of ['Business Permit', 'Business Permit | BetterMarawi.org']) {
      const meta = buildMetadata({ title, description: 'x', path: '/x' });
      const t = meta.title as { absolute?: string };
      assert.equal(typeof t?.absolute, 'string', 'title must be { absolute } so the layout template is not applied again');
      assert.equal(t.absolute!.split('BetterMarawi.org').length - 1, 1, `site name repeated in "${t.absolute}"`);
    }
  });

  // Pages allowed to skip buildMetadata, with the reason. The rendered result is checked by
  // `npm run check:seo`; this source check catches the mistake before a build.
  const METADATA_EXCEPTIONS: Record<string, string> = {};
  await test('Titles: every page exports metadata built with buildMetadata', () => {
    const pages = walk(path.join(ROOT, 'src/app')).filter((f) => /\/page\.tsx$/.test(f));
    const bad = pages.filter((f) => {
      if (METADATA_EXCEPTIONS[f]) return false;
      const src = read(f);
      return !/export (const metadata|(async )?function generateMetadata)/.test(src) || !src.includes('buildMetadata(');
    });
    assert.ok(pages.length >= 20, `expected the full set of pages, found ${pages.length}`);
    assert.deepEqual(bad, [], `pages without buildMetadata (add metadata, or an exception with a reason): ${bad.join(', ')}`);
  });

  // --- Navigation consistency -------------------------------------------------------------------
  // Hub cards, menus, and the /services grid must use registry links and names, so labels cannot
  // drift ("Competitiveness Profile" vs "DTI CMCI Profile") and every link points to a real page.
  await test('Navigation: hub pages link every section page, titled with its registry label', async () => {
    const problems: string[] = [];
    for (const hub of ['government', 'transparency', 'statistics'] as const) {
      const mod = (await import(`../src/app/${hub}/page`)) as { default: () => ReactNode };
      const html = renderToString(createElement(LanguageProvider, null, mod.default()));
      const cards = [...html.matchAll(/<a[^>]*href="([^"]+)"[^>]*>(?:(?!<\/a>)[\s\S])*?<h2[^>]*>([^<]*)<\/h2>/g)].map((m) => ({ href: m[1], title: m[2].replace(/&amp;/g, '&') }));
      const expected = APP_ROUTES.filter((r) => r.category === hub && r.path !== `/${hub}`);
      for (const c of cards) {
        const route = APP_ROUTES.find((r) => r.path === c.href);
        if (!route) problems.push(`/${hub}: card links to ${c.href}, which is not in the route registry`);
        else if (route.label !== c.title) problems.push(`/${hub}: card "${c.title}" should be titled "${route.label}"`);
      }
      for (const r of expected) if (!cards.some((c) => c.href === r.path)) problems.push(`/${hub}: no card for ${r.path}`);
    }
    assert.deepEqual(problems, [], problems.join('\n'));
  });

  await test('Navigation: menus and the /services grid use registry links, names, and descriptions', () => {
    const problems: string[] = [];
    for (const [section, items] of Object.entries(NAV_DROPDOWNS)) {
      for (const i of items) {
        const route = APP_ROUTES.find((r) => r.path === i.href);
        if (!route) problems.push(`menu ${section}: ${i.href} is not in the route registry`);
        else if (route.label !== i.label || route.description !== i.description) problems.push(`menu ${section}: "${i.label}" differs from the registry entry for ${i.href}`);
      }
      const expected = APP_ROUTES.filter((r) => r.category === section && r.path !== `/${section}`).map((r) => r.path);
      const listed = items.map((i) => i.href);
      for (const p of expected) if (!listed.includes(p)) problems.push(`menu ${section}: missing ${p}`);
    }
    const services = APP_ROUTES.filter((r) => r.category === 'services' && r.path !== '/services').map((r) => r.path).sort();
    const grid = SERVICE_CARDS.map((c) => c.href).sort();
    if (JSON.stringify(services) !== JSON.stringify(grid)) problems.push(`/services grid links [${grid.join(', ')}] differ from the registry's service pages`);
    assert.deepEqual(problems, [], problems.join('\n'));
  });

  await test('Service sections: YAKAP lab tests and the tourism directory render in full', () => {
    const yakap = renderToString(createElement(YakapLabTests));
    assert.ok(yakap.includes('id="yakap-detail-heading"'), 'YAKAP heading missing');
    assert.equal((yakap.match(/>\d{2}\. /g) ?? []).length, 13, 'expected 13 numbered lab tests');
    const tourism = renderToString(createElement(TourismDirectory));
    assert.ok(tourism.includes('id="tourism-directory-heading"'), 'tourism heading missing');
    const places = TOURISM_CATEGORIES.flatMap((c) => c.places.map((p) => p.name));
    const missing = [...TOURISM_CATEGORIES.map((c) => c.title), ...places].filter((n) => !tourism.includes(n.replace(/&/g, '&amp;').replace(/'/g, '&#x27;')));
    assert.deepEqual(missing, [], `not rendered: ${missing.join(', ')}`);
    // Each category's count must match the places actually listed (it was once typed by hand)
    const counts = [...tourism.matchAll(/>(\d+)<!-- --> <!-- -->(places?)</g)].map((m) => Number(m[1]));
    assert.deepEqual(counts, TOURISM_CATEGORIES.map((c) => c.places.length), 'category counts differ from the places listed');
    assert.ok(tourism.includes('More destinations coming soon!'), 'the "more destinations" note is missing');
  });

  await test('FDP: headline counts posted documents and unposted ones say so', () => {
    const html = renderToString(createElement(LanguageProvider, null, createElement(FDPTable, { documents: FDP_DOCUMENTS, year: FDP_YEAR, heading: 'Documents' })));
    const text = html.replace(/<[^>]+>/g, ''); // visible text only
    assert.ok(text.includes('12 of 14 documents posted for 2026'), 'headline "12 of 14 documents posted for 2026"');
    assert.equal((text.match(/Not posted for 2026/g) ?? []).length, 2, 'two unposted documents');
    const fileLinks = (html.match(/fdpp\.dilg\.gov\.ph\/fdpp\/report\/document-download\?id=\d+/g) ?? []).length;
    assert.equal(fileLinks, FDP_DOCUMENTS.reduce((n, d) => n + d.files.length, 0), 'one link per posted file');
    assert.ok(html.includes(FDP_PORTAL_URL.replace(/&/g, '&amp;')), 'portal link in the source line');
  });

  await test('Finances: actuals render with gaps, footnotes, and sources', () => {
    const html = renderToString(createElement(LanguageProvider, null, createElement(FinancesOverview), createElement(SpecialFunds)));
    const text = html.replace(/<[^>]+>/g, '');
    assert.ok(text.includes('₱1.15B') && text.includes('₱58.4M'), 'FY2025 operating income and local taxes');
    assert.ok(text.includes('As recorded by BLGF'), '2022 footnote');
    assert.ok(text.includes('—'), 'SEF 2018 spent is a gap, not ₱0');
    assert.ok((html.match(/blgf\.gov\.ph/g) ?? []).length >= 2, 'source lines on both components');
  });

  await test('Reports: audit, LGSF, and national releases render with their sources', () => {
    const html = renderToString(createElement(LanguageProvider, null, createElement(AuditSummary), createElement(NationalFunding)));
    const text = html.replace(/<[^>]+>/g, '');
    assert.ok(text.includes('Qualified'), 'audit opinion');
    for (const o of AUDIT_FY2020.keyObservations) assert.ok(text.includes(o.replace(/’/g, '’')), `observation: ${o.slice(0, 30)}`);
    for (const r of NATIONAL_RELEASES) assert.ok(html.includes(r.url), `release link ${r.date} ${r.kind}`);
    for (const p of LGSF_PROJECTS) assert.ok(text.includes(p.title), `LGSF project ${p.fiscalYear}`);
    assert.ok(html.includes('coa.gov.ph'), 'COA report link');
  });

  await test('Peso signs use the Peso component so they match the digits', () => {
    const html = renderToString(
      createElement(
        LanguageProvider,
        null,
        createElement(FinancesOverview),
        createElement(SpecialFunds),
        createElement(AuditSummary),
        createElement(NationalFunding),
      ),
    );
    const wrapped = (html.match(/<span[^>]*class="peso[^"]*"[^>]*>₱<\/span>/g) ?? []).length;
    const bare = html.replace(/<span[^>]*class="peso[^"]*"[^>]*>₱<\/span>/g, '').split('₱').length - 1;
    assert.ok(wrapped > 50, `expected many wrapped peso signs, found ${wrapped}`);
    assert.equal(bare, 0, `${bare} bare ₱ signs fall back to another font`);
  });

  await test('Year tables list the most recent year first', () => {
    const html = renderToString(
      createElement(LanguageProvider, null, createElement(FinancesOverview), createElement(SpecialFunds), createElement(NationalFunding)),
    );
    const yearOf = (s: string) => Number(s.replace(/<[^>]+>/g, '').match(/(?<!\d)(20\d\d)(?!\d)/)?.[1] ?? NaN);
    const tables = html.split('<table').slice(1).map((t) => t.split('</table>')[0]);
    assert.ok(tables.length >= 5, `expected 5 year tables, found ${tables.length}`);
    // Years run across the header (finances) or down the rows: the first cell in a row that holds a year
    const lists = tables.map((t) => {
      const head = (t.split('</thead>')[0].match(/<th[^>]*>[\s\S]*?<\/th>/g) ?? []).map(yearOf).filter((y) => !isNaN(y));
      if (head.length > 1) return head;
      const rows = (t.split('<tbody')[1] ?? '').split('<tr').slice(1);
      return rows
        .map((r) => (r.match(/<t[hd][^>]*>[\s\S]*?<\/t[hd]>/g) ?? []).map(yearOf).find((y) => !isNaN(y)) ?? NaN)
        .filter((y) => !isNaN(y));
    });
    lists.forEach((years, i) => {
      assert.ok(years.length > 1, `table ${i + 1} has years`);
      assert.ok(years.every((y, j) => j === 0 || y <= years[j - 1]), `table ${i + 1} is oldest-first: ${years.join(', ')}`);
    });
  });

  await test('Every page: the get-involved band sits above the footer with its two buttons', () => {
    const html = renderToString(createElement(LanguageProvider, null, createElement(Footer)));
    const band = html.indexOf('id="get-involved-heading"');
    assert.ok(band >= 0, 'get-involved heading missing');
    assert.ok(band < html.indexOf('<footer'), 'band comes before the footer');
    const text = html.replace(/<[^>]+>/g, '');
    for (const s of [en.getInvolved.eyebrow, en.getInvolved.title, en.getInvolved.contribute, en.getInvolved.about]) {
      assert.ok(text.includes(s.replace(/&/g, '&amp;').replace(/'/g, '&#x27;')), `shows "${s}"`);
    }
    const section = html.slice(html.lastIndexOf('<section', band), html.indexOf('</section>', band));
    assert.equal((section.match(/<a [^>]*href="#"/g) ?? []).length, 2, 'two placeholder links until the pages exist');
  });

  await test('Legislative: ordinance steps and FAQs cite their BLGC sections', () => {
    const html = renderToString(createElement(LanguageProvider, null, createElement(OrdinanceProcess)));
    const text = html.replace(/<[^>]+>/g, '');
    assert.equal(ORDINANCE_STEPS.length, 4, 'four steps');
    for (const s of ORDINANCE_STEPS) {
      assert.ok(text.includes(s.title), `step "${s.title}" shown`);
      assert.ok(s.sections.length > 0 && text.includes(s.sections), `step "${s.title}" cites its sections`);
    }
    assert.ok(html.includes(BLGC_SOURCE.sourceUrl!), 'links the official BLGC text');
    assert.ok(ORDINANCE_FAQS.length >= 5, 'at least five FAQs');
    for (const f of ORDINANCE_FAQS) assert.match(f.answer, /\(BLGC ss?\. \d+( and \d+)*\)$/, `FAQ "${f.question}" ends with its section`);
  });

  await test('City profile: history entries render with their law or source links', () => {
    const html = renderToString(createElement(LanguageProvider, null, createElement(CityHistory)));
    for (const e of CITY_HISTORY) {
      assert.ok(html.includes(String(e.year)) && html.includes(e.sourceUrl!), `history ${e.year} with its source link`);
    }
  });

  await test('Money: amounts render exactly as the source shows them', () => {
    for (const [input, want] of [[58.4, '₱58.4M'], [1080, '₱1.08B'], [1200, '₱1.20B'], [0, '₱0'], [null, '—'], [10.8, '₱10.8M']] as const) {
      assert.equal(formatMillions(input), want, `formatMillions(${input})`);
    }
  });

  // --- Streaming fallback -----------------------------------------------------------------------
  await test('Rendering: no loading.tsx, so page content is not streamed in hidden markup', () => {
    const hits = walk(path.join(ROOT, 'src/app')).filter((f) => /\/loading\.(tsx?|jsx?)$/.test(f));
    assert.deepEqual(hits, [], `loading files found: ${hits.join(', ')}`);
  });

  // --- Structured data --------------------------------------------------------------------------
  await test('Structured data: no unverified phone or email, and the LGU is not named as this site', () => {
    const org = buildGovernmentOrganizationSchema();
    const schemas: [string, unknown][] = [['organization', org]];
    for (const s of SERVICES_DATA) schemas.push([s.slug, buildGovernmentServiceSchema(s, `https://bettermarawi.org/services/${s.slug}`)]);
    for (const [name, schema] of schemas) {
      const hits = findKeys(schema, ['telephone', 'email', 'faxNumber', 'contactPoint']);
      assert.deepEqual(hits, [], `${name} schema publishes contact details: ${hits.join(', ')}`);
    }
    const alt = ([] as unknown[]).concat((org as { alternateName?: unknown }).alternateName ?? []);
    assert.ok(!alt.some((a) => /bettermarawi/i.test(String(a))), 'the city government must not be named BetterMarawi.org');
  });

  // --- Hydration --------------------------------------------------------------------------------
  // React renders the hydration pass with the server snapshot, so these renders must match the
  // server's markup even when the browser already has saved data.
  await test('Hydration: language starts as English even when another language is saved', () => {
    const restore = fakeBrowser({ bm_lang: 'FIL' });
    try {
      const Probe = () => {
        const { language, t } = useTranslation();
        return createElement('p', null, `${language}|${t === en ? 'en-text' : 'other-text'}`);
      };
      const html = renderToString(createElement(LanguageProvider, null, createElement(Probe) as ReactNode));
      assert.ok(html.includes('EN|en-text'), `first render used saved language: ${html}`);
    } finally {
      restore();
    }
  });

  await test('Hydration: weather and exchange rates start empty even with saved or loaded data', async () => {
    const now = Date.now();
    const storage: Record<string, string> = {
      [WEATHER_CACHE_KEY]: JSON.stringify({ current: { time: '2026-10-23T08:00', temperature: 25, weatherCode: 1 }, timestamp: now }),
      [FX_CACHE_KEY]: JSON.stringify({ rates: [{ code: 'USD', symbol: '$', rate: '58.00' }], timestamp: now }),
    };
    const restore = fakeBrowser(storage);
    try {
      // Load the saved data into each module's memory, as a previous page view would
      assert.ok(await fetchWeather(), 'fake saved weather was not loaded (test setup)');
      assert.ok(await fetchFxRates(), 'fake saved rates were not loaded (test setup)');
      const Probe = () => {
        const { weather, isLoading } = useWeather();
        const { rates } = useFxRates();
        return createElement('p', null, `weather=${weather ? 'data' : 'none'} loading=${isLoading} rates=${rates.length}`);
      };
      const html = renderToString(createElement(Probe));
      assert.ok(html.includes('weather=none loading=true rates=0'), `first render showed saved data: ${html}`);
    } finally {
      restore();
    }
  });

  await test('Language: <html lang> starts as "en" and follows the chosen language', () => {
    assert.ok(/<html\s+lang="en"/.test(read('src/app/layout.tsx')), 'root layout must render lang="en"');
    const src = read('src/i18n/LanguageProvider.tsx');
    assert.ok(/EN:\s*'en',\s*FIL:\s*'fil',\s*MRW:\s*'mrw'/.test(src), 'language-to-BCP-47 map changed');
    assert.ok(/document\.documentElement\.lang\s*=/.test(src), 'LanguageProvider no longer updates <html lang>');
  });

  // --- Accessibility (source checks; behaviour needs a browser) ---------------------------------
  await test('Accessibility: home search keeps the ARIA combobox wiring', () => {
    const src = read('src/components/home/HeroSearchCard.tsx');
    for (const needle of ['role="combobox"', 'aria-controls={LISTBOX_ID}', 'aria-activedescendant=', 'aria-expanded=', 'role="option"', 'aria-selected=', 'role="status"']) {
      assert.ok(src.includes(needle), `HeroSearchCard is missing ${needle}`);
    }
  });

  await test('Accessibility: desktop dropdown buttons have names and the mobile menu traps Tab', () => {
    const header = read('src/components/layout/Header.tsx');
    assert.ok(/aria-label=\{`\$\{label\} \$\{t\.directorySuffix\}`\}/.test(header), 'dropdown toggle buttons lost their accessible name');
    const nav = read('src/components/layout/MobileNav.tsx');
    assert.ok(/e\.key !== 'Tab'/.test(nav) && /e\.preventDefault\(\)/.test(nav), 'mobile menu no longer handles Tab');
    assert.ok(/getElementById\('mobile-menu-toggle'\)/.test(nav), 'mobile menu focus loop no longer includes the close button');
  });

  await test('Accessibility: barangay table placeholders meet 4.5:1 contrast', () => {
    const css = read('src/app/globals.css');
    const token = (name: string) => {
      const m = css.match(new RegExp(`--color-${name}:\\s*(#[0-9A-Fa-f]{6})`));
      assert.ok(m, `token --color-${name} not found`);
      return m![1];
    };
    const src = read('src/components/government/directory/BarangayUnits.tsx');
    for (const label of ['To be added', 'Not listed']) {
      const m = src.match(new RegExp(`className="[^"]*\\btext-([a-z]+-\\d+)\\b[^"]*">${label}<`));
      assert.ok(m, `"${label}" placeholder not found`);
      for (const bg of ['#FFFFFF', token('mist-50')]) {
        const ratio = contrast(token(m![1]), bg);
        assert.ok(ratio >= 4.5, `"${label}" text-${m![1]} on ${bg} is ${ratio.toFixed(2)}:1`);
      }
    }
  });

  // --- Honest content ---------------------------------------------------------------------------
  await test('Content: no simulated submissions or reference numbers, and no City Health Office call link', () => {
    const files = walk(path.join(ROOT, 'src')).filter((f) => /\.(tsx?|jsx?)$/.test(f));
    const offenders: string[] = [];
    for (const f of files) {
      const src = read(f).replace(/^\s*\/\/.*$/gm, '');
      if (/<form\b/.test(src)) offenders.push(`${f}: <form>`);
      if (/Math\.random\(/.test(src)) offenders.push(`${f}: Math.random()`);
      if (/(PACD|FOI)-MRW/.test(src)) offenders.push(`${f}: fake reference number`);
      if (/221-?2536/.test(src)) offenders.push(`${f}: unverified City Health Office number`);
    }
    assert.deepEqual(offenders, [], offenders.join('\n'));
  });

  // --- Report -----------------------------------------------------------------------------------
  console.log('UI and rendering regression check\n');
  for (const r of results) console.log(`${r.error ? 'FAIL' : 'PASS'}  ${r.name}${r.error ? `\n      ${r.error}` : ''}`);
  const failed = results.filter((r) => r.error).length;
  console.log(failed ? `\n${failed} check(s) failed.` : '\nAll checks passed. Source-only checks do not prove browser behaviour.');
  process.exit(failed ? 1 : 0);
}

main();
