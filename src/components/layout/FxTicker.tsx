'use client';

import React, { useState, useEffect } from 'react';
import { Peso } from '@/components/ui';

// Rotation interval: 3000ms (3 seconds) per WCAG 2.2.2 pausable auto-updating content guideline
export const FX_ROTATE_MS = 3000;

export interface CurrencyRate {
  code: string;
  symbol: string;
  rate: string;
}

export const DEFAULT_RATES: CurrencyRate[] = [
  { code: 'EUR', symbol: '€', rate: '63.80' },
  { code: 'USD', symbol: '$', rate: '57.40' },
];

interface FxTickerProps {
  rates?: CurrencyRate[];
}

export function FxTicker({ rates = DEFAULT_RATES }: FxTickerProps) {
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

  useEffect(() => {
    if (!mounted || isPaused || !isTabVisible || prefersReducedMotion || rates.length <= 1) {
      return;
    }

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % rates.length);
    }, FX_ROTATE_MS);

    return () => clearInterval(timer);
  }, [mounted, isPaused, isTabVisible, prefersReducedMotion, rates.length]);

  // Ensure SSR and first client mount render identical initial state
  const currentItem = mounted ? rates[currentIndex] || rates[0] : rates[0];

  return (
    <div
      role="region"
      aria-label="Exchange rates"
      aria-live="off"
      className="relative inline-flex items-center h-[18px] w-[15.5ch] shrink-0 overflow-hidden select-none outline-none focus-visible:ring-1 focus-visible:ring-stone-400 rounded-sm"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      tabIndex={0}
      title="Hover or focus to pause rotation"
    >
      {/* Screen reader only comprehensive list */}
      <span className="sr-only">
        Exchange rates: {rates.map((r) => `${r.symbol}1 ${r.code} = ₱${r.rate}`).join(', ')}
      </span>

      {/* Visible rotating ticker item */}
      <div
        key={mounted ? currentIndex : 'initial'}
        aria-hidden="true"
        className="flex items-center gap-0.5 whitespace-nowrap motion-safe:animate-fx-slide"
      >
        <span>{currentItem.symbol}1 {currentItem.code} = </span>
        <Peso />
        <span>{currentItem.rate}</span>
      </div>
    </div>
  );
}

