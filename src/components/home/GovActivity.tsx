'use client';
import React from 'react';
import Link from 'next/link';
import {
  Building2,
  BookOpenCheck,
  FileCheck2,
  LayoutGrid,
  MessageSquareShare,
  Scale,
  type LucideIcon,
} from 'lucide-react';
import { ArrowUpRight } from '@/components/ui';
import { NAV_DROPDOWNS } from '@/config/site';
import { useTranslation } from '@/i18n';

// Five featured pages; the 6th cell links to the rest. Text lives in t.govCards.
const FEATURED: { key: string; href: string; icon: LucideIcon }[] = [
  { key: 'legislative', href: '/government/legislative', icon: Scale },
  { key: 'fdp', href: '/transparency/full-disclosure-policy', icon: FileCheck2 },
  { key: 'budget', href: '/transparency/annual-budget', icon: BookOpenCheck },
  { key: 'foi', href: '/transparency/freedom-of-information', icon: MessageSquareShare },
  { key: 'departments', href: '/government/departments-and-officials', icon: Building2 },
];

// All pages under the Government and Transparency menus
const TOTAL_PAGES = NAV_DROPDOWNS.government.length + NAV_DROPDOWNS.transparency.length;

// Same cell styling as QuickServices (Popular Services)
const cellClass =
  'group relative flex gap-4 p-6 sm:p-7 transition-colors duration-200 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-700';
const eyebrowClass =
  'mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground-subtle';
const arrowClass =
  'absolute top-6 right-6 w-4 h-4 text-foreground-subtle transition-all duration-200 group-hover:text-brand-800 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none';

export function GovActivity() {
  const { t } = useTranslation();

  return (
    <section
      aria-labelledby="gov-activity-heading"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-8">
        <h2
          id="gov-activity-heading"
          className="text-2xl sm:text-3xl font-bold text-brand-950 font-display tracking-tight"
        >
          {t.govActivitySectionHeading}
          <span className="text-foreground-subtle font-semibold">
            {' · '}
            {t.popularServicesCount
              .replace('{shown}', String(FEATURED.length))
              .replace('{total}', String(TOTAL_PAGES))}
          </span>
        </h2>
        <p className="text-sm sm:text-base text-foreground-muted md:text-right max-w-xl">
          {t.govActivitySectionSubheading}
        </p>
      </div>

      {/* gap-px over a border-colored background draws shared hairlines between cells */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-surface-border border border-surface-border rounded-2xl overflow-hidden">
        {FEATURED.map(({ key, href, icon: Icon }) => {
          const card = t.govCards[key];
          return (
            <Link key={key} href={href} className={`${cellClass} bg-white hover:bg-surface`}>
              <Icon className="shrink-0 mt-0.5 w-6 h-6 text-brand-700" aria-hidden="true" />
              <div className="min-w-0 pr-6">
                <h3 className="text-lg font-bold text-brand-950 group-hover:text-brand-800 transition-colors">
                  {card.title}
                </h3>
                <p className={eyebrowClass}>{card.kicker}</p>
                <p className="mt-3 text-[15px] text-foreground-muted leading-relaxed line-clamp-2">
                  {card.description}
                </p>
              </div>
              <ArrowUpRight className={arrowClass} />
            </Link>
          );
        })}

        {/* 6th cell: everything else under Government and Transparency */}
        <Link href="/transparency" className={`${cellClass} bg-surface-card hover:bg-surface-elevated`}>
          <LayoutGrid className="shrink-0 mt-0.5 w-6 h-6 text-brand-700" aria-hidden="true" />
          <div className="min-w-0 pr-6">
            <h3 className="text-lg font-bold text-brand-950 group-hover:text-brand-800 transition-colors">
              {t.allGovTitle}
            </h3>
            <p className={eyebrowClass}>{t.allGovEyebrow}</p>
            <p className="mt-3 text-[15px] text-foreground-muted leading-relaxed line-clamp-2">
              {t.allGovDescription}
            </p>
          </div>
          <ArrowUpRight className={arrowClass} />
        </Link>
      </div>
    </section>
  );
}
