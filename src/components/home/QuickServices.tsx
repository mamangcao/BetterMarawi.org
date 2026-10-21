'use client';
import React from 'react';
import Link from 'next/link';
import { LayoutGrid } from 'lucide-react';
import { ArrowUpRight } from '@/components/ui';
import { SERVICES_DATA } from '@/data/services';
import { getPopularServices } from '@/lib/services';
import { useTranslation } from '@/i18n';
import { ITEM_ICONS } from '@/components/layout/navIcons';

// Top 5 by the popularRank already set in src/data/services.ts
const POPULAR = getPopularServices().slice(0, 5);

const cellClass =
  'group relative flex gap-4 p-6 sm:p-7 transition-colors duration-200 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-700';
const iconClass =
  'shrink-0 mt-0.5 text-brand-700 [&>svg]:w-6 [&>svg]:h-6 [&>svg]:text-brand-700';
const eyebrowClass =
  'mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground-subtle';
const arrowClass =
  'absolute top-6 right-6 w-4 h-4 text-foreground-subtle transition-all duration-200 group-hover:text-brand-800 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none';

export function QuickServices() {
  const { t } = useTranslation();
  const total = SERVICES_DATA.length;

  return (
    <section
      aria-labelledby="services-grid-heading"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-8">
        <h2
          id="services-grid-heading"
          className="text-2xl sm:text-3xl font-bold text-brand-950 font-display tracking-tight"
        >
          {t.popularServicesTitle}
          <span className="text-foreground-subtle font-semibold">
            {' · '}
            {t.popularServicesCount
              .replace('{shown}', String(POPULAR.length))
              .replace('{total}', String(total))}
          </span>
        </h2>
        <p className="text-sm sm:text-base text-foreground-muted md:text-right max-w-xl">
          {t.servicesAndChartersSubheading}
        </p>
      </div>

      {/* gap-px over a border-colored background draws shared hairlines between cells */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-surface-border border border-surface-border rounded-2xl overflow-hidden">
        {POPULAR.map((service) => {
          const text = t.serviceCards[service.slug];
          return (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className={`${cellClass} bg-white hover:bg-surface`}
            >
              <span className={iconClass} aria-hidden="true">
                {ITEM_ICONS[`/services/${service.slug}`]}
              </span>
              <div className="min-w-0 pr-6">
                <h3 className="text-lg font-bold text-brand-950 group-hover:text-brand-800 transition-colors">
                  {text?.title ?? service.title}
                </h3>
                <p className={eyebrowClass}>{service.officeAcronym}</p>
                <p className="mt-3 text-[15px] text-foreground-muted leading-relaxed line-clamp-2">
                  {text?.description ?? service.shortDescription}
                </p>
              </div>
              <ArrowUpRight className={arrowClass} />
            </Link>
          );
        })}

        {/* 6th cell: all services */}
        <Link href="/services" className={`${cellClass} bg-surface-card hover:bg-surface-elevated`}>
          <span className={iconClass} aria-hidden="true">
            <LayoutGrid />
          </span>
          <div className="min-w-0 pr-6">
            <h3 className="text-lg font-bold text-brand-950 group-hover:text-brand-800 transition-colors">
              {t.viewAll11Services}
            </h3>
            <p className={eyebrowClass}>{t.allServicesEyebrow}</p>
            <p className="mt-3 text-[15px] text-foreground-muted leading-relaxed line-clamp-2">
              {t.viewAllServicesDescription}
            </p>
          </div>
          <ArrowUpRight className={arrowClass} />
        </Link>
      </div>
    </section>
  );
}
