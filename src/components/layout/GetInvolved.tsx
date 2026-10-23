'use client';

import React from 'react';
import { useTranslation } from '@/i18n';

const button =
  'inline-flex items-center justify-center min-h-[48px] px-6 rounded-lg text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent';

/** Call to help check and improve the site's records, shown above the footer on every page */
export function GetInvolved({ className = '' }: { className?: string }) {
  const { t } = useTranslation();
  const g = t.getInvolved;

  return (
    <section aria-labelledby="get-involved-heading" className={`relative overflow-hidden bg-brand-900 text-white ${className}`}>
      <div className="absolute inset-0 bg-dot-pattern opacity-60" aria-hidden="true" />
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{g.eyebrow}</p>
        <h2
          id="get-involved-heading"
          className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight leading-tight text-balance sm:whitespace-pre-line"
        >
          {g.title}
        </h2>
        <p className="mt-5 text-base sm:text-lg text-brand-100 leading-relaxed text-pretty">{g.body}</p>
        <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
          {/* Placeholder links until the Contribute and About pages exist */}
          <a href="#" className={`${button} bg-accent text-brand-950 hover:bg-accent-hover`}>
            {g.contribute}
          </a>
          <a href="#" className={`${button} border border-white/40 text-white hover:bg-white/10`}>
            {g.about}
          </a>
        </div>
      </div>
    </section>
  );
}
