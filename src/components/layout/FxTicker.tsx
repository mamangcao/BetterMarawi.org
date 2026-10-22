'use client';

import React, { useState, useEffect } from 'react';
import { Peso } from '@/components/ui';
import { useTranslation } from '@/i18n';
import { CurrencyRate, formatFxDate } from '@/lib/fx';

export { type CurrencyRate } from '@/lib/fx';

// Rotation interval: 3000ms (3 seconds) per WCAG 2.2.2 pausable auto-updating content guideline
export const FX_ROTATE_MS = 3000;

export interface FxTickerProps {
  rates?: CurrencyRate[];
  lastUpdated?: string;
}

export function FxTicker({ rates, lastUpdated }: FxTickerProps) {
  const { t, language } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTabVisible, setIsTabVisible] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const motionListener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', motionListener);

    const handleVisibility = () => {
      setIsTabVisible(document.visibilityState === 'visible');
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      mediaQuery.removeEventListener('change', motionListener);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  const totalRates = rates?.length ?? 0;

  useEffect(() => {
    if (!mounted || isPaused || !isTabVisible || prefersReducedMotion || totalRates <= 1) {
      return;
    }

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalRates);
    }, FX_ROTATE_MS);

    return () => clearInterval(timer);
  }, [mounted, isPaused, isTabVisible, prefersReducedMotion, totalRates]);

  if (!rates || rates.length === 0) {
    return null;
  }

  // Ensure SSR and first client mount render identical initial state
  const currentItem = mounted ? rates[currentIndex] || rates[0] : rates[0];
  const formattedDate = formatFxDate(lastUpdated, language);
  const tooltip = formattedDate
    ? `${t.fxPauseHint} · ${t.fxRatesAsOf} ${formattedDate}`
    : t.fxPauseHint;

  return (
    <div
      role="region"
      aria-label={t.fxRatesLabel}
      aria-live="off"
      className="relative inline-flex items-center h-[18px] w-[16ch] shrink-0 overflow-hidden select-none outline-none focus-visible:ring-1 focus-visible:ring-mist-400 rounded-sm"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      tabIndex={0}
      title={tooltip}
    >
      {/* Screen reader only comprehensive list */}
      <span className="sr-only">
        {t.fxRatesLabel}
        {formattedDate ? ` (${t.fxRatesAsOf} ${formattedDate})` : ''}:{' '}
        {rates
          .map((r) => `${r.symbol ? `${r.symbol}1` : '1'} ${r.code} = ₱${r.rate}`)
          .join(', ')}
      </span>

      {/* Visible rotating ticker item */}
      <div
        key={mounted ? currentIndex : 'initial'}
        aria-hidden="true"
        className="flex items-center gap-0.5 whitespace-nowrap motion-safe:animate-fx-slide"
      >
        <span>{currentItem.symbol ? `${currentItem.symbol}1` : `1 ${currentItem.code}`} = </span>
        <Peso />
        <span>{currentItem.rate}</span>
      </div>
    </div>
  );
}
