'use client';
import React from 'react';
import Link from 'next/link';
import { Building2, MapPin, Mountain, Users } from 'lucide-react';
import { ArrowUpRight } from '@/components/ui';
import { useTranslation } from '@/i18n';
import { FeatureCarousel } from './FeatureCarousel';

export function CityAtAGlance() {
  const { t } = useTranslation();

  // Figures are PSA-sourced; see docs/VERIFICATION_CHECKLIST.md section 5
  const stats = [
    {
      href: '/statistics/city-profile',
      icon: Users,
      value: '259,993',
      label: t.residentsLabel,
      note: t.latestCensusNote,
    },
    {
      href: '/statistics/barangay-data',
      icon: MapPin,
      value: '101',
      label: t.barangaysLabel,
      note: t.adminVillagesNote,
    },
    {
      href: '/statistics/city-profile',
      icon: Building2,
      value: '3rd Class',
      label: t.incomeClassification,
      note: `Component City · ${t.capitalLanao}`,
    },
    {
      href: '/statistics/city-profile',
      icon: Mountain,
      value: '87.55 km²',
      label: t.totalLandArea,
      note: t.highlandBasin,
    },
  ];
  return (
    <>
      {/* 2. "MARAWI AT A GLANCE" SECTION */}
      <section
        aria-labelledby="glance-heading"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 border-b border-stone-200/80"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="inline-flex items-center rounded-full bg-brand-50 border border-brand-100 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-widest text-brand-800 mb-3">
              {t.cityMetricsBadge}
            </span>
            <h2
              id="glance-heading"
              className="text-2xl sm:text-3xl font-bold text-stone-900 font-display"
            >
              {t.atAGlance}
            </h2>
            <p className="text-sm text-stone-600 mt-1">
              {t.glanceSubheading}
            </p>
          </div>
          <Link
            href="/statistics/city-profile"
            className="text-sm font-semibold text-emerald-800 hover:text-emerald-950 inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 group"
          >
            <span>{t.viewCityProfile}</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map(({ href, icon: Icon, value, label, note }) => (
            <Link
              key={label}
              href={href}
              className="group relative overflow-hidden flex flex-col h-full bg-white rounded-2xl border border-surface-border p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-brand-500/50 motion-reduce:transition-none motion-reduce:hover:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2"
            >
              {/* Top accent line: faint by default, full on hover */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-400 via-brand-600 to-brand-900 opacity-30 transition-opacity duration-300 group-hover:opacity-100"
              />
              <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-brand-50 border border-brand-100 text-brand-800 transition-colors duration-300 group-hover:bg-brand-900 group-hover:text-white group-hover:border-brand-900">
                <Icon className="w-5 h-5" aria-hidden="true" />
              </span>
              <div className="mt-5 text-3xl lg:text-4xl font-extrabold text-stone-950 font-display tabular-nums leading-none">
                {value}
              </div>
              <div className="text-sm font-semibold text-stone-700 mt-2">{label}</div>
              <div className="mt-auto pt-3">
                <span className="inline-block rounded-md bg-surface-card px-2 py-1 text-[11px] leading-snug text-stone-600">
                  {note}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. "FREE HEALTH CARE FOR ALL — PHILHEALTH YAKAP" BANNER */}
      <FeatureCarousel />
    </>
  );
}

