'use client';
import React from 'react';
import Link from 'next/link';
import { Phone } from 'lucide-react';
import { ArrowUpRight, Peso } from '@/components/ui';
import { useTranslation } from '@/i18n';

export function CityAtAGlance() {
  const { t } = useTranslation();
  return (
    <>
      {/* 2. "MARAWI AT A GLANCE" SECTION */}
      <section
        aria-labelledby="glance-heading"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 border-b border-stone-200/80"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <Link
            href="/statistics/city-profile"
            className="bg-white rounded-xl border border-stone-200/90 p-6 hover:border-emerald-800/40 transition-colors block"
          >
            <div className="text-3xl font-bold text-stone-950 font-mono-tabular">
              259,993
            </div>
            <div className="text-sm font-semibold text-stone-800 mt-2">
              {t.residentsLabel}
            </div>
            <div className="text-xs text-stone-500 mt-1">
              {t.latestCensusNote}
            </div>
          </Link>

          <Link
            href="/statistics/barangay-data"
            className="bg-white rounded-xl border border-stone-200/90 p-6 hover:border-emerald-800/40 transition-colors block"
          >
            <div className="text-3xl font-bold text-stone-950 font-mono-tabular">
              96
            </div>
            <div className="text-sm font-semibold text-stone-800 mt-2">
              {t.barangaysLabel}
            </div>
            <div className="text-xs text-stone-500 mt-1">
              {t.adminVillagesNote}
            </div>
          </Link>

          <Link
            href="/statistics/dti-cmci-profile"
            className="bg-white rounded-xl border border-stone-200/90 p-6 hover:border-emerald-800/40 transition-colors block"
          >
            <div className="text-xl sm:text-2xl font-bold text-stone-950 leading-tight">
              4th Class Component City
            </div>
            <div className="text-sm font-semibold text-stone-800 mt-2">
              {t.incomeClassification}
            </div>
            <div className="text-xs text-stone-500 mt-1">
              {t.capitalLanao}
            </div>
          </Link>

          <Link
            href="/statistics/city-profile"
            className="bg-white rounded-xl border border-stone-200/90 p-6 hover:border-emerald-800/40 transition-colors block"
          >
            <div className="text-3xl font-bold text-stone-950 font-mono-tabular">
              87.55 km²
            </div>
            <div className="text-sm font-semibold text-stone-800 mt-2">
              {t.totalLandArea}
            </div>
            <div className="text-xs text-stone-500 mt-1">
              {t.highlandBasin}
            </div>
          </Link>
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

