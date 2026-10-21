'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Code2, HandHeart, Tag } from 'lucide-react';
import { ArrowUpRight, Peso } from '@/components/ui';
import { useTranslation } from '@/i18n';
import { useFxRates, formatFxDate } from '@/lib/fx';
import { SITE_CONFIG } from '@/config/site';

const linkClass = 'hover:text-white transition-colors';

const RESOURCE_LINKS = [
  { label: 'Open Data', href: '/statistics/open-data-ph' },
  { label: 'Freedom of Information', href: '/transparency/freedom-of-information' },
  { label: 'Sangguniang Panlungsod', href: '/government/legislative' },
  { label: 'DILG Full Disclosure', href: '/transparency/full-disclosure-policy' },
  { label: 'DTI CMCI', href: '/statistics/dti-cmci-profile' },
  { label: 'BLGF', href: '/transparency/annual-budget' },
];

const EXTERNAL_LINKS = [
  { label: SITE_CONFIG.contact.facebookLabel, href: SITE_CONFIG.contact.facebookUrl },
  { label: 'BARMM Official Portal', href: 'https://bangsamoro.gov.ph' },
  { label: 'BetterBARMM.com', href: 'https://betterbarmm.com/' },
];

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.88v2.27h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07Z" />
    </svg>
  );
}

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${linkClass} inline-flex items-center gap-1`}
    >
      {children}
      <ArrowUpRight className="w-3.5 h-3.5 text-stone-500 shrink-0" />
    </a>
  );
}

export function Footer() {
  const { t, language } = useTranslation();
  const { lastUpdated: fxLastUpdated } = useFxRates();
  const formattedFxDate = formatFxDate(fxLastUpdated, language);
  // communityDisclaimer is "<not official>. <built by>"; shown as two parts
  const [notOfficial, builtBy] = t.communityDisclaimer.split(/\.\s+/);

  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Column 1: Brand, mission, location, social */}
          <div className="lg:col-span-4 space-y-5">
            <Link
              href="/"
              className="inline-flex items-center gap-3 text-2xl font-bold text-white font-display tracking-tight"
            >
              <Image
                src="/branding/BetterMarawi-org-islamic-highland-green-bg.png"
                alt=""
                width={64}
                height={64}
                className="shrink-0 w-16 h-16 object-contain"
              />
              <span>BetterMarawi.org</span>
            </Link>
            <p className="text-sm text-stone-400 leading-relaxed max-w-sm">{t.heroSubtitle}</p>
            <div className="text-xs text-stone-300 opacity-75 space-y-1 font-mono-tabular">
              <div>Coordinates: 8°00&apos;N, 124°17&apos;E (8.0034, 124.2851)</div>
              <div>Elevation: ~700m ASL · Lake Lanao Highland Basin</div>
              <div>{SITE_CONFIG.contact.cityHallAddress}</div>
            </div>
            <a
              href="https://www.facebook.com/BetterMarawi.org"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={SITE_CONFIG.contact.facebookLabel}
              title={SITE_CONFIG.contact.facebookLabel}
              className="inline-flex items-center justify-center w-11 h-11 rounded-lg bg-stone-800 text-stone-200 hover:bg-stone-700 hover:text-white transition-colors"
            >
              <FacebookIcon className="w-5 h-5" />
            </a>
          </div>

          {/* Column 2: Quick links */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-400 font-sans">
              {t.quickLinks}
            </h2>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/statistics/city-profile" className={linkClass}>{t.aboutPortal}</Link>
              </li>
              <li>
                <Link href="/sitemap" className={`${linkClass} font-medium text-accent`}>Sitemap</Link>
              </li>
              <li>
                <Link href="/services" className={linkClass}>{t.accessibility}</Link>
              </li>
              <li>
                <Link href="/contact" className={linkClass}>Community Discord</Link>
              </li>
              <li>
                <Link href="/contact" className={linkClass}>{t.contactUs}</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div className="lg:col-span-3 space-y-4">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-400 font-sans">
              {t.resources}
            </h2>
            <ul className="space-y-2.5 text-sm">
              {RESOURCE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>{link.label}</Link>
                </li>
              ))}
              {EXTERNAL_LINKS.map((link) => (
                <li key={link.href}>
                  <ExternalLink href={link.href}>{link.label}</ExternalLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Calls to action and data credits */}
          <div className="lg:col-span-3 space-y-3">
            <div className="inline-flex items-center gap-1 rounded-lg bg-stone-800/70 border border-stone-700/60 px-3.5 py-2 text-sm text-stone-200">
              {t.costToPeople}
              <span className="text-accent font-bold font-mono-tabular"><Peso />0</span>
            </div>
            <div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-stone-800 px-4 py-2.5 text-sm text-stone-200 hover:bg-stone-700 hover:text-white transition-colors"
              >
                <HandHeart className="w-4 h-4" />
                {t.volunteerWithUs}
              </Link>
            </div>
            <div>
              <Link
                href="/sitemap"
                className="inline-flex items-center gap-2 rounded-full bg-stone-800 px-4 py-2.5 text-sm text-stone-200 hover:bg-stone-700 hover:text-white transition-colors"
              >
                <Code2 className="w-4 h-4" />
                {t.contributeGithub}
              </Link>
            </div>
            <ul className="pt-3 space-y-3 text-xs text-stone-400">
              <li>
                <ExternalLink href="https://www.exchangerate-api.com">{t.fxAttribution}</ExternalLink>
                {formattedFxDate && (
                  <span className="block mt-0.5">
                    {t.fxRatesAsOf} {formattedFxDate}
                  </span>
                )}
              </li>
              <li>
                <ExternalLink href="https://open-meteo.com">{t.weatherAttribution}</ExternalLink>
                <span className="block mt-0.5">{t.weatherForecastNote}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-stone-800 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs text-stone-400">
          <p className="leading-relaxed">
            <span className="text-stone-300">© 2026 BetterMarawi.org</span>
            {' · MIT · '}
            <a
              href="https://bettergov.ph/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-white transition-colors"
            >
              BetterGov.ph
            </a>
            {` · ${notOfficial}. ${builtBy}.`}
          </p>
          <p className="inline-flex items-center gap-1.5 font-mono-tabular shrink-0">
            <Tag className="w-3.5 h-3.5" />
            Ver. {SITE_CONFIG.version}
          </p>
        </div>
      </div>
    </footer>
  );
}
