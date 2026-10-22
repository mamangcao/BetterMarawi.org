'use client';
import React from 'react';
import Link from 'next/link';
import { Building2, MapPin, MessagesSquare, Users } from 'lucide-react';
import { ArrowUpRight, UnverifiedBadge } from '@/components/ui';
import { useTranslation } from '@/i18n';
import { SITE_CONFIG } from '@/config/site';
import {
  arrowClass,
  cellBgAll,
  cellClass,
  descriptionClass,
  eyebrowClass,
  gridFrame,
  headerClass,
  headingClass,
  iconClass,
  subheadingClass,
  titleClass,
} from './linkGridStyles';

// Names and terms are not yet verified (docs/VERIFICATION_CHECKLIST.md, Officials).
// Phone numbers and emails are left out until an official source confirms them.
const OFFICIALS = [
  { initials: 'SG', name: 'Hon. Shariff Zain Lanto Gandamra', roleKey: 'electedMayor', term: 'City Mayor, 2025–2028' },
  { initials: 'MG', name: 'Hon. Majul Usman Gandamra', roleKey: 'electedViceMayor', term: 'City Vice Mayor, 2025–2028' },
] as const;

export function LeadershipSection() {
  const { t } = useTranslation();

  return (
    <section aria-labelledby="leadership-heading" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className={headerClass}>
        <h2 id="leadership-heading" className={headingClass}>
          {t.leadershipContactHeading}
        </h2>
        <p className={subheadingClass}>{t.leadershipContactSubheading}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
        {/* Left: elected officials */}
        <div className={`lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 ${gridFrame}`}>
          {OFFICIALS.map((o, i) => (
            <div key={o.name} className={`${cellClass} bg-white`}>
              <span
                aria-hidden="true"
                className={`shrink-0 grid place-items-center w-12 h-12 rounded-xl text-white font-display font-bold text-lg ${
                  i === 0 ? 'bg-brand-900' : 'bg-brand-700'
                }`}
              >
                {o.initials}
              </span>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-brand-700">{t[o.roleKey]}</p>
                <h3 className={`${titleClass} mt-0.5 leading-snug`}>{o.name}</h3>
                <p className="mt-3 flex flex-wrap items-center gap-2 text-sm text-foreground-muted">
                  {o.term}
                  <UnverifiedBadge />
                </p>
              </div>
            </div>
          ))}

          <Link
            href="/government/local-officials-directory"
            className={`${cellClass} ${cellBgAll} sm:col-span-2`}
          >
            <Users className={iconClass} aria-hidden="true" />
            <div className="min-w-0 pr-6">
              <h3 className={titleClass}>{t.viewAllOfficials}</h3>
              <p className={eyebrowClass}>{t.allOfficialsEyebrow}</p>
              <p className={descriptionClass}>{t.allOfficialsDescription}</p>
            </div>
            <ArrowUpRight className={arrowClass} />
          </Link>
        </div>

        {/* Right: verified ways to reach City Hall */}
        <div className={`lg:col-span-5 grid grid-cols-1 ${gridFrame}`}>
          <div className={`${cellClass} bg-white`}>
            <MapPin className={iconClass} aria-hidden="true" />
            <div className="min-w-0">
              <h3 className={titleClass}>{SITE_CONFIG.contact.cityHallAddress}</h3>
              <p className={eyebrowClass}>
                {t.cityHallLabel} · {t.address}
              </p>
            </div>
          </div>

          <a
            href={SITE_CONFIG.contact.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${cellClass} bg-white hover:bg-surface`}
          >
            <MessagesSquare className={iconClass} aria-hidden="true" />
            <div className="min-w-0 pr-6">
              <h3 className={titleClass}>{SITE_CONFIG.contact.facebookLabel}</h3>
              <p className={eyebrowClass}>{t.officialChannel}</p>
              <p className={descriptionClass}>{t.facebookChannelDescription}</p>
            </div>
            <ArrowUpRight className={arrowClass} />
          </a>

          <Link href="/government/departments-and-officials" className={`${cellClass} ${cellBgAll}`}>
            <Building2 className={iconClass} aria-hidden="true" />
            <div className="min-w-0 pr-6">
              <h3 className={titleClass}>{t.viewAllDepartments}</h3>
              <p className={eyebrowClass}>{t.allDepartmentsEyebrow}</p>
              <p className={descriptionClass}>{t.allDepartmentsDescription}</p>
            </div>
            <ArrowUpRight className={arrowClass} />
          </Link>
        </div>
      </div>
    </section>
  );
}
