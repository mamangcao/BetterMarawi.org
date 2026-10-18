'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
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

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>('EN');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('bm_lang') as LanguageCode | null;
    if (saved && (saved === 'EN' || saved === 'FIL' || saved === 'MRW')) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('bm_lang', lang);
      document.cookie = `bm_lang=${lang}; path=/; max-age=31536000; SameSite=Lax`;
    }
  };

  const currentTranslations = mounted ? translations[language] : translations.EN;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: currentTranslations }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  return useContext(LanguageContext);
}
