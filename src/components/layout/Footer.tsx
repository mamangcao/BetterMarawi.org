'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Code2, Users } from 'lucide-react';
import { ArrowUpRight, Peso } from '@/components/ui';
import { useTranslation } from '@/i18n';
import { useFxRates, formatFxDate } from '@/lib/fx';
import { SITE_CONFIG } from '@/config/site';

export function Footer() {
  const { t, language } = useTranslation();
  const { lastUpdated: fxLastUpdated } = useFxRates();
  const formattedFxDate = formatFxDate(fxLastUpdated, language);
  // communityDisclaimer is "<not official>. <built by>"; show each part on its own line
  const [notOfficial, builtBy] = t.communityDisclaimer.split(/\.\s+/);
  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Column 1: Brand & Mission */}
          <div className="md:col-span-4 space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 text-2xl font-bold text-white font-display tracking-tight"
            >
              <Image
                src="/branding/BetterMarawi-org-islamic-highland-green-bg.png"
                alt=""
                width={36}
                height={36}
                className="shrink-0 rounded-md w-9 h-9 object-contain"
              />
              <span>BetterMarawi.org</span>
            </Link>
            <p className="text-sm text-stone-400 leading-relaxed max-w-sm">
              {t.heroSubtitle}
            </p>
            <div className="pt-2 text-xs text-stone-300 opacity-75 space-y-1 font-mono-tabular">
              <div>Coordinates: 8°00&apos;N, 124°17&apos;E (8.0034, 124.2851)</div>
              <div>Elevation: ~700m ASL · Lake Lanao Highland Basin</div>
              <div>{SITE_CONFIG.contact.cityHallAddress}</div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-400 font-sans">
              {t.quickLinks}
            </h2>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/statistics/city-profile" className="hover:text-white transition-colors">
                  {t.aboutPortal}
                </Link>
              </li>
              <li>
                <Link
                  href="/sitemap"
                  className="hover:text-white transition-colors font-medium text-accent"
                >
                  Sitemap
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  {t.accessibility}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Community Discord
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  {t.contactUs}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div className="md:col-span-5 space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-400 font-sans">
              {t.resources}
            </h2>
            {/* 2-column sub-grid: A (portal + external), B (transparency) */}
            <div className="grid grid-cols-[auto_auto] justify-start gap-x-8 text-sm">
            <ul className="space-y-2.5">
              <li>
                <Link href="/statistics/open-data-ph" className="hover:text-white transition-colors">
                  Open Data
                </Link>
              </li>
              <li>
                <Link href="/government/legislative" className="hover:text-white transition-colors">
                  Sangguniang Panlungsod
                </Link>
              </li>
              <li>
                <Link href="/statistics/dti-cmci-profile" className="hover:text-white transition-colors">
                  DTI CMCI
                </Link>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.contact.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  {SITE_CONFIG.contact.facebookLabel}
                  <ArrowUpRight className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                </a>
              </li>
              <li>
                <a
                  href="https://bangsamoro.gov.ph"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  BARMM Official Portal
                  <ArrowUpRight className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                </a>
              </li>
              <li>
                <a
                  href="https://betterbarmm.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  BetterBARMM.com
                  <ArrowUpRight className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                </a>
              </li>
            </ul>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/transparency/freedom-of-information"
                  className="hover:text-white transition-colors"
                >
                  Freedom of Information
                </Link>
              </li>
              <li>
                <Link
                  href="/transparency/full-disclosure-policy"
                  className="hover:text-white transition-colors"
                >
                  DILG Full Disclosure
                </Link>
              </li>
              <li>
                <Link href="/transparency/annual-budget" className="hover:text-white transition-colors">
                  BLGF
                </Link>
              </li>
            </ul>
            </div>

            {/* Data attributions */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 pt-4 border-t border-stone-800 text-xs">
              <li>
                <a
                  href="https://www.exchangerate-api.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  {t.fxAttribution}
                  <ArrowUpRight className="w-3 h-3 text-stone-500 shrink-0" />
                </a>
                {formattedFxDate && (
                  <span className="block text-stone-400 mt-0.5">
                    {t.fxRatesAsOf} {formattedFxDate}
                  </span>
                )}
              </li>
              <li>
                <a
                  href="https://open-meteo.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  {t.weatherAttribution}
                  <ArrowUpRight className="w-3 h-3 text-stone-500 shrink-0" />
                </a>
                <span className="block text-stone-400 mt-0.5">
                  {t.weatherForecastNote}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Badges & Attribution */}
        <div className="border-t border-stone-800 pt-6 mt-12 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 text-xs text-stone-400">
          <div className="space-y-2">
            <div className="text-accent font-bold">
              {t.costToPeople}<Peso />0
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <Link
                href="/contact"
                className="hover:text-white transition-colors inline-flex items-center gap-1.5"
              >
                <Users className="w-3.5 h-3.5 text-stone-500" />
                {t.volunteerWithUs}
              </Link>
              <span aria-hidden="true" className="text-stone-600">|</span>
              <Link
                href="/sitemap"
                className="hover:text-white transition-colors inline-flex items-center gap-1.5"
              >
                <Code2 className="w-3.5 h-3.5 text-stone-500" />
                {t.contributeGithub}
              </Link>
            </div>
          </div>

          <div className="space-y-2 text-stone-400 font-mono-tabular lg:text-right">
            <div>
              <a
                href="https://bettergov.ph/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-300 underline underline-offset-2 hover:text-white transition-colors"
              >
                BetterGov.ph
              </a>{' '}
              © 2026 BetterMarawi.org · {notOfficial}.
            </div>
            <div>
              {builtBy} · v{SITE_CONFIG.version}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

