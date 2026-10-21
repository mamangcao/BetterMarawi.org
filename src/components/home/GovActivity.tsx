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
import { useTranslation } from '@/i18n';
import {
  arrowClass,
  cellBg,
  cellBgAll,
  cellClass,
  eyebrowClass,
  gridClass,
  headerClass,
  headingClass,
  iconClass,
  subheadingClass,
  titleClass,
} from './linkGridStyles';

// Five featured pages; the 6th cell links to the rest. Text lives in t.govCards.
const FEATURED: { key: string; href: string; icon: LucideIcon }[] = [
  { key: 'legislative', href: '/government/legislative', icon: Scale },
  { key: 'fdp', href: '/transparency/full-disclosure-policy', icon: FileCheck2 },
  { key: 'budget', href: '/transparency/annual-budget', icon: BookOpenCheck },
  { key: 'foi', href: '/transparency/freedom-of-information', icon: MessageSquareShare },
  { key: 'departments', href: '/government/departments-and-officials', icon: Building2 },
];


export function GovActivity() {
  const { t } = useTranslation();

  return (
    <section
      aria-labelledby="gov-activity-heading"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
    >
      <div className={headerClass}>
        <h2
          id="gov-activity-heading"
          className={headingClass}
        >
          {t.govActivitySectionHeading}
        </h2>
        <p className={subheadingClass}>
          {t.govActivitySectionSubheading}
        </p>
      </div>

      {/* gap-px over a border-colored background draws shared hairlines between cells */}
      <div className={gridClass}>
        {FEATURED.map(({ key, href, icon: Icon }) => {
          const card = t.govCards[key];
          return (
            <Link key={key} href={href} className={`${cellClass} ${cellBg}`}>
              <Icon className={iconClass} aria-hidden="true" />
              <div className="min-w-0 pr-6">
                <h3 className={titleClass}>
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
        <Link href="/transparency" className={`${cellClass} ${cellBgAll}`}>
          <LayoutGrid className={iconClass} aria-hidden="true" />
          <div className="min-w-0 pr-6">
            <h3 className={titleClass}>
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
