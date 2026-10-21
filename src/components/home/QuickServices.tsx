'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from '@/components/ui';
import { SERVICES_DATA } from '@/data/services';
import { useTranslation } from '@/i18n';
import { ITEM_ICONS } from '@/components/layout/navIcons';

export function QuickServices() {
  const { t } = useTranslation();
  return (
    <section
      aria-labelledby="services-grid-heading"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14"
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div className="max-w-2xl">
          <h2
            id="services-grid-heading"
            className="text-2xl sm:text-3xl font-bold text-stone-900 font-display"
          >
            {t.servicesAndChartersHeading}
          </h2>
          <p className="text-sm sm:text-base text-stone-600 mt-2">
            {t.servicesAndChartersSubheading}
          </p>
        </div>
        <Link
          href="/services"
          className="text-sm font-semibold text-emerald-800 hover:text-emerald-950 inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 group"
        >
          <span>{t.viewAll11Services}</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {SERVICES_DATA.map((service) => (
          <Link
            key={service.slug}
            href={`/services/${service.slug}`}
            className="group bg-white rounded-xl border border-stone-200/90 p-6 hover:border-emerald-800/50 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="p-2.5 rounded-lg bg-stone-100 group-hover:bg-emerald-50 transition-colors">
                  {ITEM_ICONS[`/services/${service.slug}`]}
                </div>
                <span className="text-xs text-stone-400 font-mono-tabular">
                  {service.officeAcronym}
                </span>
              </div>
              <h3 className="text-lg font-bold text-stone-900 group-hover:text-emerald-900 transition-colors">
                {service.title}
              </h3>
              <p className="text-sm text-stone-600 mt-2 leading-relaxed">
                {service.shortDescription}
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-emerald-800 group-hover:text-emerald-950">
              <span>{t.viewCharterAndRequirements}</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

