import type { Browser } from './cdp';

export interface Ctx {
  /** Site origin, without a trailing slash */
  base: string;
  /** Project root, for reading the route registry and published files */
  root: string;
  browser: Browser;
  check: (name: string, ok: boolean, detail?: string) => void;
  /** True when this run started the server itself (needed for the offline check) */
  canStopServer: boolean;
  stopServer: () => Promise<void>;
}

/** In-page function source: elements past the right edge of the viewport, ignoring scroll containers */
export const OVERFLOW_JS = `(() => {
  const w = document.documentElement.clientWidth;
  const sw = document.documentElement.scrollWidth;
  const off = [...document.querySelectorAll('body *')].filter((el) => {
    const b = el.getBoundingClientRect();
    if (b.right <= w + 0.5 || getComputedStyle(el).position === 'fixed') return false;
    for (let a = el.parentElement; a && a !== document.body; a = a.parentElement) {
      if (['hidden', 'auto', 'scroll', 'clip'].includes(getComputedStyle(a).overflowX)) return false;
    }
    return true;
  }).slice(0, 2).map((el) => el.tagName.toLowerCase() + '.' + String(el.className).split(' ').slice(0, 3).join('.'));
  return { w, sw, off };
})()`;
