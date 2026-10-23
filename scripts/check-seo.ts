/**
 * SEO regression check on the production build. Run `npm run build` first, then `npm run check:seo`.
 * To check a build made elsewhere (for example a temporary worktree), pass its folder:
 *   npm run check:seo -- path/to/project
 *
 * It reads the HTML that `next build` writes for every page (.next/server/app/**\/*.html), plus the
 * generated sitemap.xml and robots.txt, and compares them with the route registry
 * (src/lib/routes.ts). This is the HTML search engines receive.
 *
 * Not covered: the error page (src/app/error.tsx renders only after a runtime error, so it is
 * never prerendered) and anything that changes after JavaScript runs in the browser.
 */
import fs from 'fs';
import path from 'path';
import { APP_ROUTES, isIndexable, type RouteItem } from '../src/lib/routes';
import { SITE_CONFIG } from '../src/config/site';

const ROOT = path.resolve(__dirname, '..');
const BUILD_ROOT = path.resolve(process.argv[2] ?? ROOT);
const APP_DIR = path.join(BUILD_ROOT, '.next/server/app');
const SITE = SITE_CONFIG.url;
const SITE_NAME = 'BetterMarawi.org';

/**
 * Built pages that are not in the route registry, and what they must look like. Add an entry here
 * (with a reason) only for pages that should never be in the sitemap.
 */
const SPECIAL_PAGES: Record<string, { reason: string; noindex: true }> = {
  '_not-found': { reason: 'The 404 page: noindex, no canonical URL.', noindex: true },
};

const failures: string[] = [];
let checks = 0;
function expect(ok: boolean, message: string) {
  checks++;
  if (!ok) failures.push(message);
}

// --- Read the build -------------------------------------------------------------------------------
if (!fs.existsSync(path.join(APP_DIR, 'index.html'))) {
  console.error(`No production build found at ${path.relative(process.cwd(), APP_DIR) || APP_DIR}. Run \`npm run build\` first.`);
  process.exit(2);
}

function walk(dir: string, out: string[] = []): string[] {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) walk(p, out);
    else if (name.endsWith('.html')) out.push(path.relative(APP_DIR, p).split(path.sep).join('/'));
  }
  return out;
}

const decode = (s: string) =>
  s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');

interface Head {
  titles: string[];
  descriptions: string[];
  canonicals: string[];
  robots: string[];
  og: Record<string, string[]>;
  twitter: Record<string, string[]>;
  lang?: string;
  jsonLd: string[];
}

function readHead(html: string): Head {
  const head = html.slice(0, html.indexOf('</head>'));
  const tags = (re: RegExp) => [...head.matchAll(re)].map((m) => m[0]);
  const attr = (tag: string, name: string) => decode((tag.match(new RegExp(`${name}="([^"]*)"`)) ?? [])[1] ?? '');
  const metas = tags(/<meta\b[^>]*>/g);
  const group = (key: 'property' | 'name', prefix: string) => {
    const out: Record<string, string[]> = {};
    for (const m of metas) {
      const k = attr(m, key);
      if (k.startsWith(prefix)) (out[k] ??= []).push(attr(m, 'content'));
    }
    return out;
  };
  return {
    titles: [...head.matchAll(/<title>([\s\S]*?)<\/title>/g)].map((m) => decode(m[1]).trim()),
    descriptions: metas.filter((m) => attr(m, 'name') === 'description').map((m) => attr(m, 'content')),
    canonicals: tags(/<link\b[^>]*rel="canonical"[^>]*>/g).map((t) => attr(t, 'href')),
    robots: metas.filter((m) => attr(m, 'name') === 'robots').map((m) => attr(m, 'content')),
    og: group('property', 'og:'),
    twitter: group('name', 'twitter:'),
    lang: (html.match(/<html\b[^>]*\blang="([^"]*)"/) ?? [])[1],
    jsonLd: [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]),
  };
}

/** Width and height of a PNG file, from its header */
function pngSize(file: string): [number, number] | null {
  if (!fs.existsSync(file)) return null;
  const b = fs.readFileSync(file);
  return b.toString('ascii', 1, 4) === 'PNG' ? [b.readUInt32BE(16), b.readUInt32BE(20)] : null;
}

/** Where a share-image URL comes from in the repo */
function imageFile(url: string): string {
  const p = new URL(url, SITE).pathname;
  return p === '/opengraph-image.png' ? path.join(ROOT, 'src/app/opengraph-image.png') : path.join(ROOT, 'public', p);
}

const canonicalFor = (p: string) => `${SITE}${p === '/' ? '' : p}`;
const routeForFile = (file: string) => (file === 'index.html' ? '/' : `/${file.replace(/\.html$/, '')}`);
const PLACEHOLDER = /lorem ipsum|\bTODO\b|\bTBD\b|placeholder|\bundefined\b|\bnull\b|\[object /i;

const built = new Map(walk(APP_DIR).map((f) => [f, readHead(fs.readFileSync(path.join(APP_DIR, f), 'utf8'))]));
const registry = new Map(APP_ROUTES.map((r) => [r.path, r]));

// --- Every page is in the registry (or a declared special page), and vice versa --------------------
for (const file of built.keys()) {
  const key = file.replace(/\.html$/, '');
  if (SPECIAL_PAGES[key]) continue;
  expect(registry.has(routeForFile(file)), `${routeForFile(file)}: built page is missing from APP_ROUTES (src/lib/routes.ts). Add it there, or to SPECIAL_PAGES in this script with a reason.`);
}
for (const r of APP_ROUTES) {
  const file = r.path === '/' ? 'index.html' : `${r.path.slice(1)}.html`;
  expect(built.has(file), `${r.path}: listed in APP_ROUTES but no prerendered HTML was built`);
}

// --- Per-page checks ------------------------------------------------------------------------------
const seenTitles = new Map<string, string>();
const seenDescriptions = new Map<string, string>();

function checkPage(p: string, h: Head, route: RouteItem) {
  const indexable = isIndexable(route);
  const canonical = canonicalFor(p);
  const title = h.titles[0] ?? '';
  const description = h.descriptions[0] ?? '';

  expect(h.titles.length === 1 && title.length > 0, `${p}: expected exactly one non-empty <title>, found ${h.titles.length}`);
  expect(title.split(SITE_NAME).length - 1 === 1, `${p}: title must contain "${SITE_NAME}" exactly once: "${title}"`);
  expect(p === '/' || title.endsWith(` | ${SITE_NAME}`), `${p}: title must end with " | ${SITE_NAME}" (use buildMetadata): "${title}"`);
  expect(!PLACEHOLDER.test(title), `${p}: title looks like a placeholder: "${title}"`);

  expect(h.descriptions.length === 1, `${p}: expected exactly one meta description, found ${h.descriptions.length}`);
  expect(description.length >= 50 && description.length <= 320, `${p}: description should be 50–320 characters, is ${description.length}`);
  expect(!PLACEHOLDER.test(description), `${p}: description looks like a placeholder: "${description}"`);
  expect(!/₱\s?\d/.test(description), `${p}: description states a peso amount; keep figures on the page, next to their verification status`);
  expect(description !== SITE_CONFIG.description, `${p}: description is the site-wide default, not written for this page`);

  expect(h.canonicals.length === 1 && h.canonicals[0] === canonical, `${p}: canonical should be ${canonical}, found [${h.canonicals.join(', ')}]`);

  expect(h.robots.length === 1, `${p}: expected one meta robots tag, found ${h.robots.length} [${h.robots.join(' | ')}]`);
  const noindex = h.robots.some((r) => /\bnoindex\b/.test(r));
  expect(noindex === !indexable, `${p}: robots "${h.robots.join(' | ')}" does not match the registry (${indexable ? 'indexable' : 'noindex'})`);

  expect(h.og['og:title']?.[0] === title, `${p}: og:title differs from <title>`);
  expect(h.og['og:description']?.[0] === description, `${p}: og:description differs from the meta description`);
  expect(h.og['og:url']?.[0] === canonical, `${p}: og:url should be ${canonical}, is ${h.og['og:url']?.[0]}`);
  expect(h.og['og:site_name']?.[0] === SITE_NAME, `${p}: og:site_name should be ${SITE_NAME}`);
  expect(h.twitter['twitter:card']?.[0] === 'summary_large_image', `${p}: twitter:card should be summary_large_image`);
  expect(h.twitter['twitter:title']?.[0] === title, `${p}: twitter:title differs from <title>`);

  // Share image: present, and the declared size matches the real file
  const images = h.og['og:image'] ?? [];
  expect(images.length >= 1, `${p}: no og:image`);
  images.forEach((img, i) => {
    const size = pngSize(imageFile(img));
    expect(size !== null, `${p}: og:image ${img} does not resolve to a PNG in the repo`);
    const w = Number(h.og['og:image:width']?.[i]);
    const hgt = Number(h.og['og:image:height']?.[i]);
    if (size && (w || hgt)) expect(w === size[0] && hgt === size[1], `${p}: og:image declares ${w}x${hgt} but ${img} is ${size[0]}x${size[1]}`);
  });

  expect(h.lang === 'en', `${p}: <html lang> should be "en" (metadata is English), is "${h.lang}"`);

  // Structured data: valid JSON and a breadcrumb that ends at this page
  const parsed = h.jsonLd.map((s) => {
    try {
      return JSON.parse(s) as Record<string, unknown>;
    } catch {
      return null;
    }
  });
  expect(parsed.every(Boolean), `${p}: a JSON-LD block is not valid JSON`);
  expect(h.jsonLd.every((s) => !s.includes('<')), `${p}: JSON-LD contains a raw "<" (use serializeJsonLd)`);
  const crumbs = parsed.find((j) => j?.['@type'] === 'BreadcrumbList') as { itemListElement?: { item?: string }[] } | undefined;
  const last = crumbs?.itemListElement?.at(-1)?.item;
  expect(last === canonical, `${p}: BreadcrumbList should end at ${canonical}, ends at ${last}`);

  if (indexable) {
    expect(!seenTitles.has(title), `${p}: same title as ${seenTitles.get(title)}`);
    expect(!seenDescriptions.has(description), `${p}: same description as ${seenDescriptions.get(description)}`);
    seenTitles.set(title, p);
    seenDescriptions.set(description, p);
  }
}

for (const r of APP_ROUTES) {
  const h = built.get(r.path === '/' ? 'index.html' : `${r.path.slice(1)}.html`);
  if (h) checkPage(r.path, h, r);
}
// Unregistered pages get the same checks (as indexable), so every problem shows at once
for (const [file, h] of built) {
  const p = routeForFile(file);
  if (!SPECIAL_PAGES[file.replace(/\.html$/, '')] && !registry.has(p)) {
    checkPage(p, h, { path: p, label: p, category: 'core', description: '', priority: 0, changefreq: 'monthly', breadcrumbs: [] });
  }
}

// --- Special pages ----------------------------------------------------------------------------------
for (const [key, spec] of Object.entries(SPECIAL_PAGES)) {
  const h = built.get(`${key}.html`);
  expect(!!h, `${key}: special page was not built`);
  if (!h) continue;
  expect(h.titles.length === 1 && h.titles[0].length > 0 && h.titles[0] !== built.get('index.html')?.titles[0], `${key}: needs its own title, not the home page's`);
  expect(h.robots.length >= 1 && h.robots.every((r) => /\bnoindex\b/.test(r)) === spec.noindex, `${key}: every robots tag must say noindex, found [${h.robots.join(' | ')}]`);
  expect(h.canonicals.length === 0, `${key}: must not declare a canonical URL, found [${h.canonicals.join(', ')}]`);
  expect((h.og['og:url'] ?? []).length === 0, `${key}: must not declare og:url`);
}

// --- sitemap.xml and robots.txt -----------------------------------------------------------------------
const sitemapFile = path.join(APP_DIR, 'sitemap.xml.body');
const robotsFile = path.join(APP_DIR, 'robots.txt.body');
expect(fs.existsSync(sitemapFile), 'sitemap.xml was not generated');
if (fs.existsSync(sitemapFile)) {
  const urls = [...fs.readFileSync(sitemapFile, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]).sort();
  const want = APP_ROUTES.filter(isIndexable).map((r) => canonicalFor(r.path)).sort();
  const missing = want.filter((u) => !urls.includes(u));
  const extra = urls.filter((u) => !want.includes(u));
  expect(missing.length === 0, `sitemap.xml is missing indexable pages: ${missing.join(', ')}`);
  expect(extra.length === 0, `sitemap.xml lists pages that are noindex or unknown: ${extra.join(', ')}`);
  expect(new Set(urls).size === urls.length, 'sitemap.xml lists a URL twice');
}
expect(fs.existsSync(robotsFile), 'robots.txt was not generated');
if (fs.existsSync(robotsFile)) {
  const robots = fs.readFileSync(robotsFile, 'utf8');
  expect(robots.includes(`Sitemap: ${SITE}/sitemap.xml`), 'robots.txt must point to sitemap.xml');
  expect(!/^Disallow:\s*\/\s*$/m.test(robots), 'robots.txt blocks the whole site');
}

// --- Report -------------------------------------------------------------------------------------------
const indexableCount = APP_ROUTES.filter(isIndexable).length;
console.log(`SEO check on the production build (${built.size} pages: ${indexableCount} indexable, ${APP_ROUTES.length - indexableCount} noindex, ${Object.keys(SPECIAL_PAGES).length} special)\n`);
if (failures.length) {
  for (const f of failures) console.log(`FAIL  ${f}`);
  console.log(`\n${failures.length} of ${checks} checks failed.`);
} else {
  console.log(`All ${checks} checks passed.`);
}
process.exit(failures.length ? 1 : 0);
