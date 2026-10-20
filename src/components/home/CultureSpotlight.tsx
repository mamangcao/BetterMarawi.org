'use client';
import React from 'react';
import Link from 'next/link';
import { CloudSun, Car } from 'lucide-react';
import { ArrowUpRight } from '@/components/ui';
import { TOURISM_CATEGORIES } from '@/data/tourism';
import { useTranslation } from '@/i18n';

export function CultureSpotlight() {
  const { t } = useTranslation();
  return (
    <section
      aria-labelledby="discover-marawi-heading"
      className="bg-surface-card border-y border-stone-200/90 py-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <h2
              id="discover-marawi-heading"
              className="text-2xl sm:text-3xl font-bold text-stone-900 font-display"
            >
              {t.discoverHeading}
            </h2>
            <p className="text-sm text-stone-600 mt-1">
              {t.summerCapitalSubtitle}
            </p>
          </div>
          <Link
            href="/services/tourism"
            className="text-sm font-semibold text-emerald-800 hover:text-emerald-950 inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 group"
          >
            <span>{t.viewAllTourism}</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left 7 Cols: 6 Tourism Category Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TOURISM_CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href="/services/tourism"
                className="bg-white rounded-xl border border-stone-200/90 p-5 hover:border-emerald-800/50 transition-colors flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs text-stone-500 font-mono-tabular">
                    <span>Marawi {t.directorySuffix}</span>
                    <span className="font-semibold text-emerald-800">{cat.countLabel}</span>
                  </div>
                  <h3 className="text-base font-bold text-stone-900 mt-1.5">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    {cat.summary}
                  </p>
                </div>
                <div className="mt-4 pt-2.5 border-t border-stone-100 text-xs font-medium text-emerald-800 flex items-center justify-between">
                  <span>{t.exploreSites}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>

          {/* Right 5 Cols: Plan Your Visit — Getting to Marawi */}
          <div className="lg:col-span-5 bg-white rounded-xl border border-stone-200/90 p-6 flex flex-col justify-between space-y-6">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                {t.planYourVisit}
              </div>

              {/* Live Weather Card */}
              <div className="mt-3 p-4 rounded-xl bg-stone-50 border border-stone-200/80">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xs text-stone-500">
                      {t.currentConditions}
                    </div>
                    <div className="text-3xl font-bold text-stone-950 font-mono-tabular mt-1 flex items-center gap-2">
                      <CloudSun className="w-7 h-7 text-amber-600" />
                      22°C
                    </div>
                    <div className="text-xs font-medium text-stone-600 mt-1">
                      {t.coolHighlandClimate}
                    </div>
                  </div>
                  <a
                    href="https://www.google.com/maps/place/Marawi+City,+Lanao+del+Sur/@8.0034,124.2851,13z"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 inline-flex items-center gap-1 whitespace-nowrap"
                  >
                    {t.openInGoogleMaps}
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Driving time to Marawi */}
              <div className="mt-5">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-3 flex items-center gap-1.5">
                  <Car className="w-4 h-4 text-emerald-800" />
                  {t.drivingTimeToMarawi}
                </h3>
                <div className="divide-y divide-stone-100 text-sm">
                  <div className="py-2.5 flex items-center justify-between gap-3">
                    <div>
                      <div className="font-semibold text-stone-900">{t.fromIligan}</div>
                      <div className="text-xs text-stone-500">Marawi–Iligan Hwy (38 km)</div>
                    </div>
                    <span className="font-mono-tabular font-bold text-emerald-900 whitespace-nowrap">
                      45 min
                    </span>
                  </div>

                  <div className="py-2.5 flex items-center justify-between gap-3">
                    <div>
                      <div className="font-semibold text-stone-900">
                        {t.fromCdo}
                      </div>
                      <div className="text-xs text-stone-500">CDO–Iligan–Marawi Rd (102 km)</div>
                    </div>
                    <span className="font-mono-tabular font-bold text-emerald-900 whitespace-nowrap">
                      1 hr 50 min
                    </span>
                  </div>

                  <div className="py-2.5 flex items-center justify-between gap-3">
                    <div>
                      <div className="font-semibold text-stone-900">{t.fromCotabato}</div>
                      <div className="text-xs text-stone-500">Narciso Ramos Hwy (158 km)</div>
                    </div>
                    <span className="font-mono-tabular font-bold text-emerald-900 whitespace-nowrap">
                      3 hr 30 min
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <Link
              href="/services/tourism"
              className="w-full py-2.5 px-4 rounded-lg bg-stone-900 text-white text-xs font-semibold text-center hover:bg-stone-800 transition-colors"
            >
              {t.viewVisitorGuide}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

