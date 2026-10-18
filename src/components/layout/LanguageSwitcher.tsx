'use client';

import React from 'react';
import { useTranslation } from '@/i18n';
import { LanguageCode } from '@/types';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const { language, setLanguage } = useTranslation();
  const languages: { code: LanguageCode; label: string }[] = [
    { code: 'EN', label: 'EN' },
    { code: 'FIL', label: 'FIL' },
    { code: 'MRW', label: 'MRW' },
  ];

  return (
    <div className="flex items-center gap-1 bg-stone-200/70 p-0.5 rounded-lg text-xs font-semibold">
      <Globe className="w-3.5 h-3.5 text-stone-500 ml-1.5 shrink-0" aria-hidden="true" />
      {languages.map(({ code }) => (
        <button
          key={code}
          type="button"
          onClick={() => setLanguage(code)}
          aria-label={`Switch language to ${code}`}
          className={`px-2 py-1 rounded-md transition-colors whitespace-nowrap shrink-0 ${
            language === code
              ? 'bg-white text-stone-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          {code}
        </button>
      ))}
    </div>
  );
}

