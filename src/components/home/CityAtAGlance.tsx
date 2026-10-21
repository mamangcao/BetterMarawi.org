'use client';
import React from 'react';
import Link from 'next/link';
import { Building2, MapPin, Mountain, Phone, Users } from 'lucide-react';
import { ArrowUpRight, Peso } from '@/components/ui';
import { useTranslation } from '@/i18n';

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
      <section
        aria-labelledby="yakap-heading"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <div className="bg-emerald-950 text-stone-100 rounded-2xl p-6 sm:p-10 border border-emerald-900">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="text-xs font-semibold uppercase tracking-widest text-accent">
                {t.freeHealthCareForAll}
              </div>
              <h2
                id="yakap-heading"
                className="text-3xl sm:text-4xl font-bold text-white font-display tracking-wide"
              >
                PhilHealth YAKAP
              </h2>
              <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed max-w-2xl">
                {t.yakapDescription}
              </p>

              {/* 3 Highlight Metrics */}
              <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm font-medium text-accent font-mono-tabular">
                <span><Peso />20k {t.maintenanceMedicines}</span>
                <span aria-hidden="true" className="text-emerald-700">·</span>
                <span>13 {t.coveredLabs}</span>
                <span aria-hidden="true" className="text-emerald-700">·</span>
                <span>{t.zeroCopay}</span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <Link
                href="/services/health-services"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-accent text-brand-950 text-sm font-bold hover:bg-accent-hover transition-colors whitespace-nowrap shrink-0 shadow-xs group"
              >
                {t.learnFreeBenefits}
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:0632212536"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-900/90 border border-emerald-700 text-white text-sm font-semibold hover:bg-emerald-800 transition-colors font-mono-tabular whitespace-nowrap shrink-0"
              >
                <Phone className="w-4 h-4 text-accent" />
                {t.callTheCho}(063) 221-2536
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

