'use client';
import React from 'react';
import Link from 'next/link';
import { LayoutGrid } from 'lucide-react';
import { ArrowUpRight } from '@/components/ui';
import { getPopularServices } from '@/lib/services';
import { useTranslation } from '@/i18n';
import { ITEM_ICONS } from '@/components/layout/navIcons';
import {
  arrowClass,
  cellBg,
  cellBgAll,
  cellClass,
  eyebrowClass,
  gridClass,
  headerClass,
  headingClass,
  subheadingClass,
  titleClass,
} from './linkGridStyles';

// Top 5 by the popularRank already set in src/data/services.ts
const POPULAR = getPopularServices().slice(0, 5);

const iconClass =
  'shrink-0 mt-0.5 text-brand-700 [&>svg]:w-6 [&>svg]:h-6 [&>svg]:text-brand-700';

export function QuickServices() {
  const { t } = useTranslation();

  return (
    <section
      aria-labelledby="services-grid-heading"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14"
    >
      <div className={headerClass}>
        <h2
          id="services-grid-heading"
          className={headingClass}
        >
          {t.popularServicesTitle}
        </h2>
        <p className={subheadingClass}>
          {t.servicesAndChartersSubheading}
        </p>
      </div>

      {/* gap-px over a border-colored background draws shared hairlines between cells */}
      <div className={gridClass}>
        {POPULAR.map((service) => {
          const text = t.serviceCards[service.slug];
          return (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className={`${cellClass} ${cellBg}`}
            >
              <span className={iconClass} aria-hidden="true">
                {ITEM_ICONS[`/services/${service.slug}`]}
              </span>
              <div className="min-w-0 pr-6">
                <h3 className={titleClass}>
                  {text?.title ?? service.title}
                </h3>
                <p className={eyebrowClass}>{service.officeAcronym}</p>
                <p className="mt-3 text-[15px] text-foreground-muted leading-relaxed">
                  {text?.description ?? service.shortDescription}
                </p>
              </div>
              <ArrowUpRight className={arrowClass} />
            </Link>
          );
        })}

        {/* 6th cell: all services */}
        <Link href="/services" className={`${cellClass} ${cellBgAll}`}>
          <span className={iconClass} aria-hidden="true">
            <LayoutGrid />
          </span>
          <div className="min-w-0 pr-6">
            <h3 className={titleClass}>
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
