'use client';
import React from 'react';
import { Phone } from 'lucide-react';
import { EMERGENCY_HOTLINES } from '@/config/site';
import { useTranslation } from '@/i18n';
import { QuickContactsMarquee } from './QuickContactsMarquee';

export function QuickContacts() {
  const { t } = useTranslation();
  return (
    <div
      role="region"
      aria-label="Emergency Quick Contacts"
      className="relative w-full bg-brand-950 text-[#F9FEFF] text-xs border-t-2 border-t-accent border-b border-mist-800/80 h-10 select-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto h-full px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
        {/* Pinned Left Label */}
        <div className="flex items-center gap-1.5 shrink-0 pr-3 border-r border-white/15 z-10 bg-brand-950 py-1">
          <Phone className="w-3.5 h-3.5 text-accent shrink-0" aria-hidden="true" />
          <span className="font-bold uppercase tracking-wider text-[11px] text-accent hidden sm:inline whitespace-nowrap">
            {t.quickContactsLabel}
          </span>
          <span className="font-bold uppercase tracking-wider text-[10px] text-accent sm:hidden whitespace-nowrap">
            {t.hotlinesLabel}
          </span>
        </div>

        {/* Dynamic Overflow-Aware Marquee (All Screen Sizes) */}
        <QuickContactsMarquee hotlines={EMERGENCY_HOTLINES} />
      </div>
    </div>
  );
}
