import type { Ctx } from './types';

const ACTIVE_IN_DRAWER = `(() => {
  const a = document.activeElement;
  return !!a && (a.id === 'mobile-menu-toggle' || !!a.closest('#mobile-nav-drawer'));
})()`;

export async function a11yChecks({ base, browser, check }: Ctx) {
  const page = await browser.newPage();

  // 1. Mobile menu: focus moves in, Tab and Shift+Tab stay inside, Escape closes and returns focus
  await page.setViewport(360);
  await page.goto(base + '/');
  await page.eval(`document.getElementById('mobile-menu-toggle').click()`);
  const opened = await page.waitFor(`document.getElementById('mobile-nav-drawer')`);
  await page.waitFor(ACTIVE_IN_DRAWER, 2000);
  check('mobile menu opens and moves focus inside', opened && (await page.eval<boolean>(ACTIVE_IN_DRAWER)));
  let escaped = 0;
  for (let i = 0; i < 30; i++) {
    await page.press('Tab');
    if (!(await page.eval<boolean>(ACTIVE_IN_DRAWER))) escaped++;
  }
  for (let i = 0; i < 15; i++) {
    await page.press('Tab', true);
    if (!(await page.eval<boolean>(ACTIVE_IN_DRAWER))) escaped++;
  }
  check('Tab and Shift+Tab stay inside the open mobile menu', escaped === 0, `${escaped} of 45 presses left it`);
  await page.press('Escape');
  const closed = await page.waitFor(`!document.getElementById('mobile-nav-drawer')`, 2000);
  const returned = await page.eval<boolean>(`document.activeElement?.id === 'mobile-menu-toggle'`);
  check('Escape closes the mobile menu and returns focus to its button', closed && returned);

  // 2. Desktop dropdown toggles have names and open with the keyboard
  await page.setViewport(1280);
  await page.goto(base + '/');
  const names = await page.eval<string[]>(`[...document.querySelectorAll('header nav button[aria-expanded]')].map((b) => b.getAttribute('aria-label') || b.innerText.trim())`);
  check('desktop dropdown buttons have accessible names', names.length >= 4 && names.every(Boolean), names.join(', '));
  await page.eval(`document.querySelector('header nav button[aria-expanded]').focus()`);
  await page.press('Enter');
  const expanded = await page.waitFor(`document.querySelector('header nav button[aria-expanded]').getAttribute('aria-expanded') === 'true'`, 2000);
  await page.press('Escape');
  const collapsed = await page.waitFor(`document.querySelector('header nav button[aria-expanded]').getAttribute('aria-expanded') === 'false'`, 2000);
  check('Enter opens a dropdown and Escape closes it', expanded && collapsed);

  // 3. Home search: ARIA combobox, arrow keys, Enter navigates, empty results announced
  for (const width of [360, 1280]) {
    await page.setViewport(width);
    await page.goto(base + '/');
    const input = '#hero-card-search';
    const initial = await page.eval<string>(`(() => { const i = document.querySelector('${input}'); return i.getAttribute('role') + '|' + i.getAttribute('aria-expanded') + '|' + i.getAttribute('aria-controls'); })()`);
    await page.eval(`document.querySelector('${input}').focus()`);
    await page.type('business');
    const listed = await page.waitFor(`document.querySelector('${input}').getAttribute('aria-expanded') === 'true' && document.querySelectorAll('#hero-search-results [role=option]').length > 0`, 3000);
    await page.press('ArrowDown');
    const active = await page.eval<string>(`(() => { const id = document.querySelector('${input}').getAttribute('aria-activedescendant'); const o = id && document.getElementById(id); return o && o.getAttribute('aria-selected') === 'true' && document.activeElement === document.querySelector('${input}') ? id : ''; })()`);
    await page.press('Enter');
    const navigated = await page.waitFor(`location.pathname === '/services/business-and-livelihood'`, 8000);
    check(`home search works as an ARIA combobox @${width}px`, initial === 'combobox|false|hero-search-results' && listed && !!active && navigated, `initial ${initial}, option ${active || 'none'}, navigated ${navigated}`);
    await page.goto(base + '/');
    await page.eval(`document.querySelector('${input}').focus()`);
    await page.type('zzzz');
    const status = await page.waitFor(`document.querySelector('#hero-search-results [role=status]') && document.querySelector('${input}').getAttribute('aria-expanded') === 'false'`, 3000);
    check(`search with no matches shows a status message @${width}px`, status);
  }

  // 4. Language switcher: keyboard operable listbox
  await page.setViewport(1280);
  await page.goto(base + '/');
  await page.eval(`document.querySelector('[aria-haspopup="listbox"]').focus()`);
  await page.press('Enter');
  const listOpen = await page.waitFor(`document.querySelector('[role=listbox][aria-label="Select language"]')`, 2000);
  await page.press('Escape');
  const listClosed = await page.waitFor(`!document.querySelector('[role=listbox][aria-label="Select language"]')`, 2000);
  check('language menu opens with Enter and closes with Escape', listOpen && listClosed);

  check('no page errors during keyboard checks', page.errors.length === 0, page.errors.slice(0, 2).join(' | '));
  await page.close();
}
