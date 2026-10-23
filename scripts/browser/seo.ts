import { APP_ROUTES } from '../../src/lib/routes';
import type { Ctx } from './types';

type Head = { title: string; canonical: string; robots: string; description: string };
const HEAD_JS = `({
  title: document.title,
  canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? '',
  robots: [...document.querySelectorAll('meta[name="robots"]')].map((m) => m.content).join(' | '),
  description: document.querySelector('meta[name="description"]')?.content ?? '',
})`;

function serverHead(html: string): Head {
  const get = (re: RegExp) => (html.match(re) ?? [])[1] ?? '';
  const decode = (s: string) => s.replace(/&amp;/g, '&').replace(/&#x27;/g, "'").replace(/&quot;/g, '"');
  return {
    title: decode(get(/<title>([^<]*)<\/title>/)),
    canonical: get(/<link rel="canonical" href="([^"]*)"/),
    robots: '',
    description: decode(get(/<meta name="description" content="([^"]*)"/)),
  };
}

export async function seoChecks({ base, browser, check }: Ctx) {
  const page = await browser.newPage();
  await page.setViewport(1280);

  // 1. After hydration, the live title, description, and canonical match what the server sent
  const drift: string[] = [];
  for (const r of APP_ROUTES) {
    const server = serverHead(await (await fetch(base + r.path)).text());
    await page.goto(base + r.path, 300);
    const live = await page.eval<Head>(HEAD_JS);
    if (live.title !== server.title || live.canonical !== server.canonical || live.description !== server.description) drift.push(r.path);
  }
  check(`live title, description, and canonical match the server HTML on all ${APP_ROUTES.length} pages`, drift.length === 0, drift.join(', '));

  // 2. Client-side navigation updates the head for the new page
  await page.goto(base + '/');
  const contact = serverHead(await (await fetch(base + '/contact')).text());
  await page.eval(`document.querySelector('a[href="/contact"]').click()`);
  const moved = await page.waitFor(`location.pathname === '/contact'`);
  await page.waitFor(`document.title === ${JSON.stringify(contact.title)}`, 5000);
  const after = await page.eval<Head>(HEAD_JS);
  check('client navigation updates title and canonical', moved && after.title === contact.title && after.canonical === contact.canonical, `${after.title} | ${after.canonical}`);

  // 3. Unknown URLs: HTTP 404, noindex, their own title, no canonical
  const res = await fetch(base + '/no-such-page-for-tests');
  await page.goto(base + '/no-such-page-for-tests');
  const nf = await page.eval<Head>(HEAD_JS);
  check('unknown URL returns 404 with noindex and no canonical', res.status === 404 && /noindex/.test(nf.robots) && !/(^|\| )index/.test(nf.robots) && nf.canonical === '' && /Page Not Found/.test(nf.title), `${res.status}, robots "${nf.robots}", title "${nf.title}"`);

  // 4. sitemap.xml lists exactly the indexable registry routes, each answering 200
  const xml = await (await fetch(base + '/sitemap.xml')).text();
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname.replace(/\/$/, '') || '/');
  const want = APP_ROUTES.filter((r) => !r.noindex).map((r) => r.path);
  const statuses = await Promise.all(locs.map(async (p) => (await fetch(base + p)).status));
  check('sitemap.xml lists exactly the indexable pages, all reachable', locs.length === want.length && want.every((p) => locs.includes(p)) && statuses.every((s) => s === 200), `${locs.length} listed, ${want.length} indexable`);
  await page.close();
}
