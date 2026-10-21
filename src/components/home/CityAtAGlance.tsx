'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from '@/components/ui';
import { useTranslation } from '@/i18n';
import { MARAWI_BARANGAYS } from '@/data/barangays';
import { FeatureCarousel } from './FeatureCarousel';

// Barangay counts come straight from the PSA-sourced data file
const BARANGAY_COUNT = MARAWI_BARANGAYS.length;
const URBAN_COUNT = MARAWI_BARANGAYS.filter((b) => b.classification === 'Urban').length;
const RURAL_COUNT = BARANGAY_COUNT - URBAN_COUNT;

export function CityAtAGlance() {
  const { t } = useTranslation();

  // Figures are PSA-sourced; see docs/VERIFICATION_CHECKLIST.md sections 5 and 7
  const stats: { href: string; value: React.ReactNode; label: string; note: string }[] = [
    {
      href: '/statistics/city-profile',
      value: '259,993',
      label: t.statPeopleLabel,
      note: t.statPeopleNote,
    },
    {
      href: '/statistics/barangay-data',
      value: String(BARANGAY_COUNT),
      label: t.barangaysLabel,
      note: t.statBarangaysNote
        .replace('{urban}', String(URBAN_COUNT))
        .replace('{rural}', String(RURAL_COUNT)),
    },
    {
      href: '/statistics/city-profile',
      value: (
        <>
          3<span className="text-[0.5em] align-top ml-0.5">rd</span>
        </>
      ),
      label: t.incomeClassification,
      note: t.statIncomeNote,
    },
    {
      href: '/statistics/city-profile',
      value: (
        <>
          87.55<span className="text-[0.4em] ml-1.5 font-semibold">km²</span>
        </>
      ),
      label: t.totalLandArea,
      note: t.statLandNote,
    },
  ];

  return (
    <>
      {/* 2. "MARAWI AT A GLANCE": editorial stats band */}
      <section aria-labelledby="glance-heading" className="relative bg-surface text-foreground overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-marawi-pattern-ink [mask-image:linear-gradient(to_bottom_left,black,transparent_55%)]"
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          {/* Eyebrow */}
          <div className="flex items-center gap-4 border-t border-surface-border pt-6 text-xs font-semibold uppercase tracking-[0.2em]">
            <span className="text-brand-700">{t.atAGlance}</span>
          </div>

          {/* Headline + intro */}
          <div className="mt-10 sm:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
            <h2
              id="glance-heading"
              className="lg:col-span-7 font-display font-bold tracking-tight leading-[1.02] text-[clamp(2.25rem,6vw,4.75rem)]"
            >
              <span className="block text-brand-950">{t.glanceHeadlineLead}</span>
              <span className="block text-brand-500">
                {t.glanceHeadlineRest.replace('{barangays}', String(BARANGAY_COUNT))}
              </span>
            </h2>
            <div className="lg:col-span-5 lg:text-right space-y-4">
              <p className="text-base sm:text-lg text-foreground-muted leading-relaxed">{t.glanceIntro}</p>
              <Link
                href="/statistics/city-profile"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-800 hover:text-brand-950 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-700 rounded"
              >
                {t.viewCityProfile}
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-14 sm:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-x-6 lg:gap-x-10 gap-y-12">
            {stats.map(({ href, value, label, note }) => (
              <Link
                key={label}
                href={href}
                className="group @container block border-t border-surface-border-strong pt-7 transition-colors duration-300 hover:border-brand-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-700"
              >
                <div className="font-display font-bold leading-none tabular-nums text-brand-950 whitespace-nowrap text-[clamp(2.5rem,24cqi,4.75rem)]">
                  {value}
                </div>
                <div className="mt-5 inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
                  {label}
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 motion-reduce:transition-none" />
                </div>
                <p className="mt-3 text-sm sm:text-[15px] text-foreground-muted leading-relaxed">{note}</p>
              </Link>
            ))}
          </div>

          <p className="mt-14 text-xs text-foreground-subtle">
            <a
              href="https://psa.gov.ph/classification/psgc/barangays/1903617000"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-brand-900 transition-colors"
            >
              {t.glanceSourceNote}
            </a>
          </p>
        </div>
      </section>

      {/* 3. FEATURE CAROUSEL: PhilHealth YAKAP and Explore Marawi */}
      <FeatureCarousel />
    </>
  );
}
