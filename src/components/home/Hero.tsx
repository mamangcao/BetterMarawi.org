'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, ArrowRight } from 'lucide-react';
import { useTranslation } from '@/i18n';
import { SERVICES_DATA } from '@/data/services';
import { NAV_DROPDOWNS } from '@/config/site';

export function Hero() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');

  const allSearchableRoutes = useMemo(() => {
    const list: { label: string; href: string; category: string; description: string }[] = [];
    SERVICES_DATA.forEach((s) => {
      list.push({
        label: s.title,
        href: `/services/${s.slug}`,
        category: 'Citizen Service',
        description: s.shortDescription,
      });
    });
    NAV_DROPDOWNS.government.forEach((g) => {
      list.push({
        label: g.label,
        href: g.href,
        category: 'Government',
        description: g.description,
      });
    });
    NAV_DROPDOWNS.transparency.forEach((tr) => {
      list.push({
        label: tr.label,
        href: tr.href,
        category: 'Transparency',
        description: tr.description,
      });
    });
    NAV_DROPDOWNS.statistics.forEach((st) => {
      list.push({
        label: st.label,
        href: st.href,
        category: 'Statistics',
        description: st.description,
      });
    });
    return list;
  }, []);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return allSearchableRoutes
      .filter(
        (item) =>
          item.label.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
      )
      .slice(0, 6);
  }, [searchQuery, allSearchableRoutes]);

  const popularLinks = [
    { label: 'Health Services', href: '/services/health-services' },
    { label: 'PhilHealth YAKAP', href: '/services/health-services' },
    { label: 'Business Permits', href: '/services/business-and-livelihood' },
    { label: '96 Barangays', href: '/statistics/barangay-data' },
    { label: 'Annual Budget', href: '/transparency/annual-budget' },
    { label: 'Full Disclosure (FDP)', href: '/transparency/full-disclosure-policy' },
  ];

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative border-b border-stone-200/90 bg-gradient-to-b from-[#F5F1EA] to-[#FAF8F5] py-14 sm:py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-800 mb-3">
            {t.welcomeEyebrow}
          </p>
          <h1
            id="hero-heading"
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-950 font-display"
          >
            BetterMarawi.org
          </h1>
          <p className="mt-4 text-base sm:text-lg text-stone-700 leading-relaxed max-w-2xl">
            {t.heroSubtitle}
          </p>

          {/* Primary CTAs */}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-900 text-white text-sm font-semibold hover:bg-emerald-950 transition-colors whitespace-nowrap shrink-0"
            >
              {t.browseServices}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white border border-stone-300 text-stone-800 text-sm font-semibold hover:bg-stone-100 transition-colors whitespace-nowrap shrink-0"
            >
              {t.contactUs}
            </Link>
          </div>

          {/* Search Services Bar */}
          <div className="mt-8 relative max-w-2xl">
            <label htmlFor="hero-service-search" className="sr-only">
              Search Services
            </label>
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-stone-400 absolute left-4 pointer-events-none" />
              <input
                id="hero-service-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder || 'Search Services, Permits, Barangays...'}
                className="w-full pl-12 pr-28 py-3.5 bg-white rounded-xl border border-stone-300 text-sm text-stone-900 placeholder:text-stone-400 shadow-xs focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-emerald-800"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 px-2.5 py-1 text-xs font-medium text-stone-500 hover:text-stone-800"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Instant Search Results Dropdown */}
            {searchResults.length > 0 && (
              <div className="absolute left-0 right-0 mt-2 bg-white rounded-xl border border-stone-200 shadow-xl z-30 divide-y divide-stone-100 overflow-hidden">
                {searchResults.map((res) => (
                  <Link
                    key={res.href}
                    href={res.href}
                    onClick={() => setSearchQuery('')}
                    className="flex items-start justify-between gap-4 p-3.5 hover:bg-emerald-50/60 transition-colors"
                  >
                    <div>
                      <div className="text-xs text-emerald-800 font-medium">{res.category}</div>
                      <div className="text-sm font-semibold text-stone-900 mt-0.5">{res.label}</div>
                      <div className="text-xs text-stone-500 line-clamp-1 mt-0.5">{res.description}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-stone-400 shrink-0 mt-1" />
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Popular Services Quick-Links */}
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-stone-500 mr-1">{t.popularServices}</span>
            {popularLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-1.5 rounded-lg bg-white border border-stone-200/90 hover:border-emerald-800/50 hover:bg-emerald-50/40 text-xs font-medium text-stone-700 hover:text-emerald-950 transition-colors whitespace-nowrap shrink-0"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

