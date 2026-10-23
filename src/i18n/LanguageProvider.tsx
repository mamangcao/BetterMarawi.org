'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { LanguageCode } from '@/types';
import { en } from './translations/en';
import { fil } from './translations/fil';
import { mrw } from './translations/mrw';

const translations = {
  EN: en,
  FIL: fil,
  MRW: mrw,
};

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: typeof en;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'EN',
  setLanguage: () => {},
  t: en,
});

/** BCP 47 tags for <html lang>: English, Filipino, and Maranao (ISO 639-3 "mrw") */
const HTML_LANG: Record<LanguageCode, string> = { EN: 'en', FIL: 'fil', MRW: 'mrw' };

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>('EN');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Pages are static, so the server never reads a language cookie. Remove the unused one that
    // earlier versions wrote; the choice lives in localStorage only.
    if (document.cookie.includes('bm_lang=')) document.cookie = 'bm_lang=; path=/; max-age=0; SameSite=Lax';
    const saved = localStorage.getItem('bm_lang') as LanguageCode | null;
    if (saved && (saved === 'EN' || saved === 'FIL' || saved === 'MRW')) {
      setLanguageState(saved);
    }
  }, []);

  // Stable across renders, so it never changes the context value by itself
  const setLanguage = useCallback((lang: LanguageCode) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('bm_lang', lang);
    }
  }, []);

  const currentTranslations = mounted ? translations[language] : translations.EN;

  // Memoized so consumers re-render only when the language or text actually changes. Without
  // this, flipping `mounted` after hydration created a new value and re-rendered every
  // useTranslation() consumer even for English visitors, whose text does not change.
  const value = useMemo(
    () => ({ language, setLanguage, t: currentTranslations }),
    [language, setLanguage, currentTranslations]
  );

  // Keep <html lang> in step with the language actually on screen, so screen readers use the
  // right pronunciation. The server always renders "en"; this runs only after hydration.
  useEffect(() => {
    document.documentElement.lang = HTML_LANG[mounted ? language : 'EN'];
  }, [language, mounted]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  return useContext(LanguageContext);
}
