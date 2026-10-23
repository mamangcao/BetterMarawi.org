import { fil } from '../../src/i18n/translations/fil';
import { en } from '../../src/i18n/translations/en';
import type { Ctx } from './types';

const HYDRATION = /hydrat|did not match|Minified React error #4(18|19|23|25)/i;

async function choose(page: Awaited<ReturnType<Ctx['browser']['newPage']>>, label: string) {
  await page.eval(`document.querySelector('[aria-haspopup="listbox"]').click()`);
  await page.waitFor(`document.querySelector('[role=listbox][aria-label="Select language"]')`, 2000);
  await page.eval(`[...document.querySelectorAll('[role=option]')].find((o) => o.textContent.includes(${JSON.stringify(label)}))?.click()`);
}

export async function i18nChecks({ base, browser, check }: Ctx) {
  const page = await browser.newPage();
  await page.setViewport(1280);
  await page.goto(base + '/');

  // 1. Switching language changes the text and <html lang>
  await choose(page, 'Filipino');
  const filOk = await page.waitFor(`document.documentElement.lang === 'fil' && document.body.innerText.includes(${JSON.stringify(fil.navServices)})`, 3000);
  check('switching to Filipino updates the text and <html lang="fil">', filOk);

  // 2. The choice survives a reload; the server still sends English, the browser switches after hydration
  const serverLang = ((await (await fetch(base + '/contact')).text()).match(/<html[^>]*lang="([^"]+)"/) ?? [])[1];
  page.errors = [];
  await page.goto(base + '/contact', 800);
  const restored = await page.waitFor(`document.documentElement.lang === 'fil'`, 3000);
  check('saved Filipino is restored after reload (server HTML stays lang="en")', serverLang === 'en' && restored, `server ${serverLang}`);
  const hydration = page.errors.filter((e) => HYDRATION.test(e));
  check('no hydration errors when a saved language is restored', hydration.length === 0, hydration[0]?.slice(0, 160));

  // 3. Meranaw sets lang="mrw"; English restores lang="en"
  await choose(page, 'Meranaw');
  check('switching to Meranaw sets <html lang="mrw">', await page.waitFor(`document.documentElement.lang === 'mrw'`, 3000));
  await choose(page, 'English');
  const enOk = await page.waitFor(`document.documentElement.lang === 'en' && document.body.innerText.includes(${JSON.stringify(en.navServices)})`, 3000);
  check('switching back to English restores the text and lang="en"', enOk);

  // 4. Persistence is localStorage only; the unused bm_lang cookie is gone
  const stored = await page.eval<string>(`localStorage.getItem('bm_lang')`);
  const cookie = await page.eval<string>(`document.cookie`);
  check('language is saved in localStorage and no bm_lang cookie is set', stored === 'EN' && !/bm_lang=/.test(cookie), `localStorage ${stored}, cookie "${cookie}"`);
  await page.close();
}
