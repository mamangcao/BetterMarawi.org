'use client';

import React, { useEffect, useState } from 'react';
import { Download, Share, X } from 'lucide-react';
import { useTranslation } from '@/i18n';

/** Chrome/Edge/Samsung Internet event that lets us show our own install button */
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const DISMISS_KEY = 'bm-install-dismissed-at';
const DISMISS_DAYS = 14;
const SHOW_DELAY_MS = 4000;

function readDismissed(): boolean {
  try {
    const at = Number(localStorage.getItem(DISMISS_KEY));
    return Boolean(at) && Date.now() - at < DISMISS_DAYS * 24 * 60 * 60 * 1000;
  } catch {
    return false;
  }
}

function isStandalone(): boolean {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

function isIosSafari(): boolean {
  const ua = navigator.userAgent;
  const ios = /iphone|ipad|ipod/i.test(ua) || (ua.includes('Macintosh') && navigator.maxTouchPoints > 1);
  // Other iOS browsers (Chrome, Firefox, etc.) also use Add to Home Screen via Share, but label it differently
  return ios && /safari/i.test(ua) && !/crios|fxios|edgios/i.test(ua);
}

/**
 * Bottom banner inviting visitors to install the site as an app.
 * - Android / desktop Chromium: real Install button (beforeinstallprompt).
 * - iOS Safari: short "Share, then Add to Home Screen" hint.
 * Hidden when already installed, and for 14 days after being dismissed.
 */
export function InstallPrompt() {
  const { t } = useTranslation();
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [mode, setMode] = useState<'install' | 'ios' | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        /* installability is optional; ignore registration errors */
      });
    }
    if (isStandalone() || readDismissed()) return;

    let timer: number | undefined;
    const showSoon = (m: 'install' | 'ios') => {
      setMode(m);
      timer = window.setTimeout(() => setVisible(true), SHOW_DELAY_MS);
    };

    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
      showSoon('install');
    };
    const onInstalled = () => {
      setVisible(false);
      setDeferred(null);
    };

    window.addEventListener('beforeinstallprompt', onPrompt);
    window.addEventListener('appinstalled', onInstalled);
    if (isIosSafari()) showSoon('ios');

    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt);
      window.removeEventListener('appinstalled', onInstalled);
      window.clearTimeout(timer);
    };
  }, []);

  const dismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch {
      /* private mode: banner just returns next visit */
    }
  };

  const install = async () => {
    if (!deferred) return;
    await deferred.prompt();
    const { outcome } = await deferred.userChoice;
    setDeferred(null);
    setVisible(false);
    if (outcome === 'dismissed') dismiss();
  };

  if (!visible || !mode) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={t.installPromptText}
      className="fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-50 mx-auto max-w-xl animate-fx-slide"
    >
      <div className="flex items-center gap-3 rounded-2xl bg-brand-900 text-white shadow-2xl ring-1 ring-brand-950/40 pl-4 pr-2 py-2.5">
        {mode === 'install' ? (
          <Download className="w-5 h-5 shrink-0 text-brand-200" aria-hidden="true" />
        ) : (
          <Share className="w-5 h-5 shrink-0 text-brand-200" aria-hidden="true" />
        )}
        <p className="flex-1 text-sm leading-snug">
          {mode === 'install' ? t.installPromptText : t.installIosHint}
        </p>
        {mode === 'install' ? (
          <button
            type="button"
            onClick={install}
            className="shrink-0 rounded-lg bg-accent px-4 py-2 text-sm font-bold text-brand-950 hover:bg-accent-hover transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {t.installButton}
          </button>
        ) : (
          <button
            type="button"
            onClick={dismiss}
            className="shrink-0 rounded-lg bg-white/10 px-3 py-2 text-sm font-semibold hover:bg-white/20 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {t.installGotIt}
          </button>
        )}
        <button
          type="button"
          onClick={dismiss}
          aria-label={t.installDismiss}
          className="shrink-0 grid place-items-center w-9 h-9 rounded-full hover:bg-white/10 transition-colors focus-visible:outline-2 focus-visible:outline-white"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
