import { useEffect, useSyncExternalStore } from 'react';

export const SUPPORTED_CURRENCIES = [
  'USD',
  'SAR',
  'AED',
  'JPY',
  'SGD',
  'HKD',
  'KWD',
  'QAR',
  'EUR',
  'GBP',
  'KRW',
  'AUD',
  'CAD',
  'CNY',
  'TWD',
] as const;

export type SupportedCurrency = (typeof SUPPORTED_CURRENCIES)[number];

export const CURRENCY_SYMBOLS: Partial<Record<SupportedCurrency, string>> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
};

export interface CurrencyRate {
  code: SupportedCurrency;
  symbol: string;
  rate: string;
}

export interface FxData {
  rates: CurrencyRate[];
  lastUpdatedUtc?: string;
  timestamp: number;
}

export const FX_CACHE_KEY = 'bm_fx_rates_v1';
export const FX_CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

export function formatRate(value: number): string {
  if (value < 1) {
    const fixed4 = value.toFixed(4);
    return fixed4.endsWith('0') ? value.toFixed(3) : fixed4;
  }
  return value.toFixed(2);
}

export function parseFxApiResponse(data: unknown): FxData | null {
  if (!data || typeof data !== 'object') return null;
  const obj = data as {
    result?: string;
    rates?: Record<string, number>;
    time_last_update_utc?: string;
  };

  if (obj.result !== 'success' || !obj.rates || typeof obj.rates !== 'object') {
    return null;
  }

  const rates: CurrencyRate[] = [];

  for (const code of SUPPORTED_CURRENCIES) {
    const foreignPerPhp = obj.rates[code];
    if (typeof foreignPerPhp !== 'number' || foreignPerPhp <= 0) {
      continue; // Skip any currency missing from the response instead of failing
    }

    const phpPerForeign = 1 / foreignPerPhp;
    const symbol = CURRENCY_SYMBOLS[code] || '';
    rates.push({
      code,
      symbol,
      rate: formatRate(phpPerForeign),
    });
  }

  if (rates.length === 0) return null;

  return {
    rates,
    lastUpdatedUtc: obj.time_last_update_utc,
    timestamp: Date.now(),
  };
}

// In-memory cache & listener subscription for zero-prop-drilling sync between Header and Footer
let memoryCache: FxData | null = null;
let inFlightPromise: Promise<FxData | null> | null = null;
const listeners = new Set<(data: FxData | null) => void>();

function notifyListeners(data: FxData | null) {
  listeners.forEach((listener) => listener(data));
}

function readLocalStorageCache(): FxData | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(FX_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as FxData;
    if (
      parsed &&
      Array.isArray(parsed.rates) &&
      parsed.rates.length > 0 &&
      typeof parsed.timestamp === 'number' &&
      Date.now() - parsed.timestamp < FX_CACHE_TTL_MS
    ) {
      return parsed;
    }
  } catch {
    // Ignore localStorage access failures
  }
  return null;
}

function writeLocalStorageCache(data: FxData): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(FX_CACHE_KEY, JSON.stringify(data));
  } catch {
    // Ignore localStorage write failures
  }
}

export async function fetchFxRates(): Promise<FxData | null> {
  // 1. Check in-memory cache
  if (memoryCache && Date.now() - memoryCache.timestamp < FX_CACHE_TTL_MS) {
    return memoryCache;
  }

  // 2. Check localStorage cache
  const local = readLocalStorageCache();
  if (local) {
    memoryCache = local;
    return local;
  }

  // 3. Deduplicate in-flight network requests
  if (inFlightPromise) {
    return inFlightPromise;
  }

  inFlightPromise = (async () => {
    try {
      const res = await fetch('https://open.er-api.com/v6/latest/PHP');
      if (!res.ok) {
        return null;
      }
      const json = await res.json();
      const parsed = parseFxApiResponse(json);
      if (parsed) {
        memoryCache = parsed;
        writeLocalStorageCache(parsed);
        notifyListeners(parsed);
        return parsed;
      }
    } catch {
      // Silently fail if blocked or offline
    } finally {
      inFlightPromise = null;
    }
    return null;
  })();

  return inFlightPromise;
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}
const getSnapshot = () => memoryCache;
// The server (and the hydration render) never sees browser storage, so both start with no data.
const getServerSnapshot = () => null;

export function useFxRates() {
  const data = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // After hydration: load saved rates (or fetch fresh ones) and tell every subscriber.
  useEffect(() => {
    if (!memoryCache || Date.now() - memoryCache.timestamp >= FX_CACHE_TTL_MS) {
      fetchFxRates().then((result) => {
        if (result) notifyListeners(result);
      });
    }
  }, []);

  return {
    rates: data?.rates ?? [],
    lastUpdated: data?.lastUpdatedUtc,
  };
}

export function formatFxDate(dateString: string | undefined, language: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '';
  const locale = language === 'FIL' ? 'fil-PH' : 'en-PH';
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

