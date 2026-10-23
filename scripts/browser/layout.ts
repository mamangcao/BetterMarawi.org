import { APP_ROUTES } from '../../src/lib/routes';
import { OVERFLOW_JS, type Ctx } from './types';

type Overflow = { w: number; sw: number; off: string[] };

export async function layoutChecks({ base, browser, check }: Ctx) {
  const page = await browser.newPage();

  // 1. No sideways scrolling on phones, on every page in the route registry
  for (const width of [360, 375]) {
    await page.setViewport(width);
    const bad: string[] = [];
    for (const r of APP_ROUTES) {
      await page.goto(base + r.path, 300);
      const o = await page.eval<Overflow>(OVERFLOW_JS);
      if (o.sw > o.w) bad.push(`${r.path} ${o.sw}px ${o.off.join(' ')}`);
    }
    check(`no horizontal overflow on all ${APP_ROUTES.length} pages at ${width}px`, bad.length === 0, bad.join('; '));
  }

  // 2. /sitemap inspector at phone and desktop widths: every route selected, real metadata shown
  for (const width of [360, 1280]) {
    await page.setViewport(width);
    await page.goto(base + '/sitemap');
    await page.waitFor(`!document.querySelector('[aria-busy="true"]')`);
    const count = await page.eval<number>(`document.querySelectorAll('main button[type="button"]').length - 1`);
    const mismatches: string[] = [];
    let worst = 0;
    for (let i = 0; i < count; i++) {
      const path = await page.eval<string>(`(() => { const b = document.querySelectorAll('main button[type="button"]')[${i}]; b.click(); return b.querySelector('div').firstChild.textContent.trim(); })()`);
      await page.waitFor(`!document.querySelector('[aria-busy="true"]')`);
      const ok = await page.eval<boolean>(`(async () => {
        const html = await (await fetch(${JSON.stringify(path)})).text();
        const d = new DOMParser().parseFromString(html, 'text/html');
        const shown = document.querySelector('[aria-live="polite"]').innerText;
        return [d.title, d.querySelector('meta[name="description"]')?.content, d.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? '(none)']
          .every((v) => v && shown.includes(v));
      })()`);
      if (!ok) mismatches.push(path);
      const o = await page.eval<Overflow>(OVERFLOW_JS);
      worst = Math.max(worst, o.sw - o.w);
    }
    check(`/sitemap inspector shows each page's real title, description, and canonical @${width}px`, count === APP_ROUTES.length && mismatches.length === 0, `${count - mismatches.length}/${count}${mismatches.length ? ' mismatched: ' + mismatches.join(', ') : ''}`);
    check(`/sitemap has no overflow after selecting any route @${width}px`, worst <= 0, worst > 0 ? `${worst}px too wide` : '');
  }

  // 3. With JavaScript off, page content is visible (no loading screen hiding <main>)
  await page.setViewport(1280);
  await page.send('Emulation.setScriptExecutionDisabled', { value: true });
  const hidden: string[] = [];
  for (const r of APP_ROUTES) {
    await page.goto(base + r.path, 100);
    const ok = await page.eval<boolean>(`(() => {
      const main = document.querySelector('main');
      return !!main && !main.closest('[hidden]') && main.innerText.trim().length > 150;
    })()`);
    if (!ok) hidden.push(r.path);
  }
  await page.send('Emulation.setScriptExecutionDisabled', { value: false });
  check(`page content is visible with JavaScript off on all ${APP_ROUTES.length} pages`, hidden.length === 0, hidden.join(', '));
  await page.close();
}
