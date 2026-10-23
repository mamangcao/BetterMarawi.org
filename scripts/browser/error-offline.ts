import { en } from '../../src/i18n/translations/en';
import type { Ctx } from './types';

/**
 * The error page (src/app/error.tsx) only renders after a runtime error, so it is never in the
 * built HTML. This check causes one: it intercepts the /sitemap page's JavaScript chunk in the
 * browser and replaces it with code that throws, then opens /sitemap with a client-side link.
 */
export async function errorChecks({ base, browser, check }: Ctx) {
  const page = await browser.newPage();
  await page.setViewport(1280);
  await page.goto(base + '/contact');
  await page.send('Fetch.enable', { patterns: [{ urlPattern: '*/_next/static/chunks/app/sitemap/page-*', requestStage: 'Request' }] });
  let intercepted = 0;
  const off = browser.on('Fetch.requestPaused', (p, s) => {
    if (s !== page.sessionId) return;
    intercepted++;
    const body = Buffer.from("throw new Error('bm-browser-check: simulated page failure');").toString('base64');
    void page.send('Fetch.fulfillRequest', { requestId: p.requestId, responseCode: 200, responseHeaders: [{ name: 'Content-Type', value: 'application/javascript' }], body });
  });
  // The footer's Sitemap link is a Next.js <Link>, so this is a client-side navigation
  await page.eval(`document.querySelector('footer a[href="/sitemap"]').click()`);
  const shown = await page.waitFor(`document.body.innerText.includes(${JSON.stringify(en.somethingWentWrong)})`, 10000);
  const state = await page.eval<{ title: string; robots: string; retry: boolean; home: boolean }>(`({
    title: document.title,
    robots: [...document.querySelectorAll('meta[name="robots"]')].map((m) => m.content).join(' | '),
    retry: [...document.querySelectorAll('main button')].some((b) => b.textContent.includes(${JSON.stringify(en.tryAgain)})),
    home: !!document.querySelector('main a[href="/"]'),
  })`);
  off();
  await page.send('Fetch.disable');
  check('a runtime error shows the error page with Try again and Home', intercepted > 0 && shown && state.retry && state.home, `chunk intercepted ${intercepted}x, shown ${shown}`);
  check('the error page sets its own title and noindex', state.title.startsWith(en.somethingWentWrong) && /noindex/.test(state.robots), `title "${state.title}", robots "${state.robots}"`);
  await page.close();
}

/** Offline: the service worker answers with the offline page, not a stale copy of another page */
export async function offlineChecks({ base, browser, check, canStopServer, stopServer }: Ctx) {
  if (!canStopServer) {
    console.log('SKIP  [offline] needs the server this script starts, so it does not run with --url');
    return;
  }
  const page = await browser.newPage();
  await page.setViewport(360);
  // Simulate a returning visitor: the old worker's cache held a copy of the home page.
  // /offline.html does not register the worker, so the cache exists before it installs.
  // Earlier groups may already have installed the current worker, so start from a clean state.
  await page.goto(base + '/offline.html', 100);
  await page.eval(`(async () => {
    for (const r of await navigator.serviceWorker.getRegistrations()) await r.unregister();
    for (const k of await caches.keys()) await caches.delete(k);
    await (await caches.open('bettermarawi-v1')).put('/', new Response('old home page'));
    return true;
  })()`);
  await page.goto(base + '/');
  const ready = await page.eval<boolean>(`navigator.serviceWorker.ready.then(() => true)`);
  await page.goto(base + '/', 300); // the second load is controlled by the worker
  const cached = await page.waitFor(`caches.match('/offline.html').then((r) => !!r)`, 8000);
  check('service worker installs and saves the offline page', ready && cached);
  const oldGone = await page.waitFor(`caches.keys().then((k) => !k.includes('bettermarawi-v1'))`, 5000);
  check('the new worker deletes the old cache that held a stale home page', oldGone, await page.eval<string>(`caches.keys().then((k) => k.join(', '))`));

  await stopServer();
  await page.goto(base + '/contact', 300);
  const off = await page.eval<{ title: string; text: string; robots: string; styled: boolean }>(`({
    title: document.title,
    text: document.body.innerText,
    robots: document.querySelector('meta[name="robots"]')?.content ?? '',
    styled: getComputedStyle(document.body).fontFamily !== '' && getComputedStyle(document.body).backgroundColor !== 'rgba(0, 0, 0, 0)',
  })`);
  check('offline navigation shows the offline page, not a stale copy of the home page', /offline/i.test(off.title) && /You.re offline/i.test(off.text) && !off.text.includes(en.heroSubtitle), `title "${off.title}"`);
  check('the offline page lists 911, works without other files, and is noindex', off.text.includes('911') && off.styled && /noindex/.test(off.robots));
  await page.close();
}
