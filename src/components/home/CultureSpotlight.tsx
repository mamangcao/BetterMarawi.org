'use client';
import React from 'react';
import Link from 'next/link';
import {
  Coffee,
  Gem,
  Landmark,
  LayoutGrid,
  Library,
  Waves,
  type LucideIcon,
} from 'lucide-react';
import { ArrowUpRight } from '@/components/ui';
import { TOURISM_CATEGORIES } from '@/data/tourism';
import { useTranslation } from '@/i18n';
import { tourismTone } from '@/lib/palette';
import {
  arrowClass,
  cellBg,
  cellBgAll,
  cellClass,
  descriptionClass,
  eyebrowClass,
  gridFrame,
  headerClass,
  headingClass,
  iconBase,
  iconClass,
  subheadingClass,
  titleClass,
} from './linkGridStyles';
import { DrivingCell, WeatherCell } from './VisitInfoCells';

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  heritage: Landmark,
  lakefront: Waves,
  museums: Library,
  artisan: Gem,
  dining: Coffee,
};

// First five categories in data order; the 6th cell links to the full tourism page,
// where new spots will be added over time.
const FEATURED = TOURISM_CATEGORIES.slice(0, 5);

export function CultureSpotlight() {
  const { t } = useTranslation();

  return (
    <section
      aria-labelledby="discover-marawi-heading"
      className="bg-surface-card border-y border-surface-border py-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={headerClass}>
          <h2 id="discover-marawi-heading" className={headingClass}>
            {t.discoverHeading}
          </h2>
          <p className={subheadingClass}>{t.summerCapitalSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Left: 2-column tourism grid */}
          <div className={`lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 auto-rows-fr ${gridFrame}`}>
            {FEATURED.map((cat) => {
              const Icon = CATEGORY_ICONS[cat.id] ?? Landmark;
              const text = t.tourismCards[cat.id];
              return (
                <Link
                  key={cat.id}
                  href="/services/tourism"
                  className={`${cellClass} ${cellBg}`}
                >
                  <Icon className={`${iconBase} ${tourismTone(cat.id)}`} aria-hidden="true" />
                  <div className="min-w-0 pr-6">
                    <h3 className={titleClass}>{text?.title ?? cat.title}</h3>
                    <p className={eyebrowClass}>
                      {t.sitesListed.replace('{n}', String(cat.places.length))}
                    </p>
                    <p className={descriptionClass}>{text?.description ?? cat.summary}</p>
                  </div>
                  <ArrowUpRight className={arrowClass} />
                </Link>
              );
            })}

            {/* 6th cell: all tourist spots */}
            <Link href="/services/tourism" className={`${cellClass} ${cellBgAll}`}>
              <LayoutGrid className={iconClass} aria-hidden="true" />
              <div className="min-w-0 pr-6">
                <h3 className={titleClass}>{t.allTourismTitle}</h3>
                <p className={eyebrowClass}>{t.allTourismEyebrow}</p>
                <p className={descriptionClass}>{t.allTourismDescription}</p>
              </div>
              <ArrowUpRight className={arrowClass} />
            </Link>

          </div>

          {/* Right: plan your visit (live weather and driving times) */}
          <aside
            aria-label={t.planYourVisit}
            className={`lg:col-span-5 grid grid-cols-1 lg:grid-rows-[auto_1fr] ${gridFrame}`}
          >
            <WeatherCell />
            <DrivingCell />
          </aside>
        </div>
      </div>
    </section>
  );
}
