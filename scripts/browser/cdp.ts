/**
 * Minimal Chrome DevTools Protocol client for the browser checks. No dependencies: it uses an
 * installed Chrome and the WebSocket built into Node 22.
 */
import { spawn, type ChildProcess } from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';

type Json = Record<string, unknown>;
type Listener = (params: Json, sessionId?: string) => void;

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/google-chrome-stable',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
];

export function findChrome(): string | null {
  return CHROME_CANDIDATES.find((p): p is string => !!p && fs.existsSync(p)) ?? null;
}

export class Browser {
  private ws!: WebSocket;
  private nextId = 1;
  private pending = new Map<number, { resolve: (v: Json) => void; reject: (e: Error) => void }>();
  private listeners = new Map<string, Set<Listener>>();
  private proc!: ChildProcess;
  readonly profileDir = fs.mkdtempSync(path.join(os.tmpdir(), 'bm-chrome-'));

  static async launch(chromePath: string): Promise<Browser> {
    const b = new Browser();
    b.proc = spawn(chromePath, [
      '--headless=new', '--remote-debugging-port=0', `--user-data-dir=${b.profileDir}`,
      '--no-first-run', '--no-default-browser-check', '--disable-extensions', 'about:blank',
    ], { stdio: ['ignore', 'ignore', 'pipe'] });
    const wsUrl = await new Promise<string>((resolve, reject) => {
      let buf = '';
      const timer = setTimeout(() => reject(new Error('Chrome did not start within 20 s')), 20000);
      b.proc.stderr!.on('data', (d: Buffer) => {
        buf += d.toString();
        const m = buf.match(/DevTools listening on (ws:\/\/\S+)/);
        if (m) { clearTimeout(timer); resolve(m[1]); }
      });
      b.proc.on('exit', () => reject(new Error('Chrome exited during start-up')));
    });
    b.ws = new WebSocket(wsUrl);
    await new Promise<void>((resolve, reject) => { b.ws.onopen = () => resolve(); b.ws.onerror = () => reject(new Error('CDP connection failed')); });
    b.ws.onmessage = (ev) => b.onMessage(JSON.parse(String(ev.data)));
    return b;
  }

  private onMessage(msg: { id?: number; result?: Json; error?: { message: string }; method?: string; params?: Json; sessionId?: string }) {
    if (msg.id !== undefined) {
      const p = this.pending.get(msg.id);
      this.pending.delete(msg.id);
      if (msg.error) p?.reject(new Error(msg.error.message));
      else p?.resolve(msg.result ?? {});
    } else if (msg.method) {
      for (const l of this.listeners.get(msg.method) ?? []) l(msg.params ?? {}, msg.sessionId);
    }
  }

  send(method: string, params: Json = {}, sessionId?: string): Promise<Json> {
    const id = this.nextId++;
    this.ws.send(JSON.stringify({ id, method, params, sessionId }));
    return new Promise((resolve, reject) => this.pending.set(id, { resolve, reject }));
  }

  on(method: string, fn: Listener): () => void {
    if (!this.listeners.has(method)) this.listeners.set(method, new Set());
    this.listeners.get(method)!.add(fn);
    return () => this.listeners.get(method)!.delete(fn);
  }

  async newPage(): Promise<Page> {
    const { targetId } = (await this.send('Target.createTarget', { url: 'about:blank' })) as { targetId: string };
    const { sessionId } = (await this.send('Target.attachToTarget', { targetId, flatten: true })) as { sessionId: string };
    const page = new Page(this, sessionId, targetId);
    await page.init();
    return page;
  }

  async close() {
    try { this.ws.close(); } catch { /* already closed */ }
    this.proc.kill();
    await new Promise((r) => setTimeout(r, 300));
    fs.rmSync(this.profileDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
  }
}

const KEYS: Record<string, { code: string; keyCode: number; text?: string }> = {
  Tab: { code: 'Tab', keyCode: 9 },
  Enter: { code: 'Enter', keyCode: 13, text: '\r' },
  Escape: { code: 'Escape', keyCode: 27 },
  ArrowDown: { code: 'ArrowDown', keyCode: 40 },
  ArrowUp: { code: 'ArrowUp', keyCode: 38 },
};

export class Page {
  /** Errors from the page: uncaught exceptions and console.error calls */
  errors: string[] = [];
  private loadWaiters: (() => void)[] = [];

  constructor(readonly browser: Browser, readonly sessionId: string, readonly targetId: string) {}

  send(method: string, params: Json = {}) {
    return this.browser.send(method, params, this.sessionId);
  }

  async init() {
    this.browser.on('Page.loadEventFired', (_p, s) => {
      if (s !== this.sessionId) return;
      this.loadWaiters.splice(0).forEach((w) => w());
    });
    this.browser.on('Runtime.exceptionThrown', (p, s) => {
      if (s === this.sessionId) this.errors.push(String((p.exceptionDetails as Json)?.text ?? 'exception') + ' ' + String(((p.exceptionDetails as Json)?.exception as Json)?.description ?? ''));
    });
    this.browser.on('Runtime.consoleAPICalled', (p, s) => {
      if (s !== this.sessionId || p.type !== 'error') return;
      this.errors.push((p.args as Json[]).map((a) => String(a.value ?? a.description ?? '')).join(' '));
    });
    await this.send('Page.enable');
    await this.send('Runtime.enable');
    // Record Content-Security-Policy violations (report-only ones included) on every page
    await this.send('Page.addScriptToEvaluateOnNewDocument', {
      source: "window.__csp=[];document.addEventListener('securitypolicyviolation',e=>window.__csp.push(e.violatedDirective+' '+e.blockedURI));",
    });
  }

  async setViewport(width: number, height = 900) {
    const mobile = width < 768;
    await this.send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile });
    await this.send('Emulation.setTouchEmulationEnabled', { enabled: mobile });
  }

  /** Navigate and wait for the load event, then a short settle for hydration */
  async goto(url: string, settleMs = 500) {
    const loaded = new Promise<void>((r) => this.loadWaiters.push(r));
    const res = (await this.send('Page.navigate', { url })) as { errorText?: string };
    if (res.errorText) throw new Error(`navigation to ${url} failed: ${res.errorText}`);
    await Promise.race([loaded, sleep(20000)]);
    await sleep(settleMs);
  }

  async eval<T>(expression: string): Promise<T> {
    const r = (await this.send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })) as { result: { value: T }; exceptionDetails?: Json };
    if (r.exceptionDetails) throw new Error(`evaluate failed: ${JSON.stringify(r.exceptionDetails).slice(0, 300)}`);
    return r.result.value;
  }

  /** Poll a JavaScript expression (it may return a promise) until it is truthy */
  async waitFor(expression: string, timeoutMs = 8000): Promise<boolean> {
    const end = Date.now() + timeoutMs;
    while (Date.now() < end) {
      if (await this.eval<boolean>(`(async () => !!(await (${expression})))()`).catch(() => false)) return true;
      await sleep(100);
    }
    return false;
  }

  async press(key: keyof typeof KEYS, shift = false) {
    const k = KEYS[key];
    const base = { key, code: k.code, windowsVirtualKeyCode: k.keyCode, modifiers: shift ? 8 : 0 };
    await this.send('Input.dispatchKeyEvent', { type: 'keyDown', ...base, ...(k.text ? { text: k.text } : {}) });
    await this.send('Input.dispatchKeyEvent', { type: 'keyUp', ...base });
    await sleep(40);
  }

  async type(text: string) {
    await this.send('Input.insertText', { text });
    await sleep(150);
  }

  close() {
    return this.browser.send('Target.closeTarget', { targetId: this.targetId });
  }
}

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
