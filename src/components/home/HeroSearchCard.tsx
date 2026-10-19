'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  Briefcase,
  Stethoscope,
  HeartHandshake,
  Home as HomeIcon,
  GraduationCap,
  ShieldAlert,
  Sprout,
  Hammer,
  Trash2,
  Trees,
  Compass,
} from 'lucide-react';
import { ArrowUpRight } from '@/components/ui';
import { ServicePageData } from '@/types';

// Map slug to Lucide Icon component for the popular service tiles
const SERVICE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  'business-and-livelihood': Briefcase,
  'health-services': Stethoscope,
  'social-welfare': HeartHandshake,
  'housing-and-land-use': HomeIcon,
  'education': GraduationCap,
  'disaster-preparedness': ShieldAlert,
  'agriculture-and-fisheries': Sprout,
  'infrastructure-and-public-works': Hammer,
  'garbage-and-waste-disposal': Trash2,
  'environment': Trees,
  'tourism': Compass,
};

interface HeroSearchCardProps {
  popularServices: ServicePageData[];
  searchableServices: { slug: string; title: string; shortDescription: string }[];
}

export function HeroSearchCard({ popularServices, searchableServices }: HeroSearchCardProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsContainerRef = useRef<HTMLDivElement>(null);

  const filteredResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return searchableServices
      .filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.shortDescription.toLowerCase().includes(q)
      )
      .slice(0, 6);
  }, [searchQuery, searchableServices]);

  const showResults = isFocused && searchQuery.trim().length > 0;

  // Reset selected index when filtered results change
  useEffect(() => {
    setSelectedIndex(-1);
  }, [filteredResults]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showResults) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < filteredResults.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredResults.length - 1
      );
    } else if (e.key === 'Enter') {
      if (selectedIndex >= 0 && selectedIndex < filteredResults.length) {
        e.preventDefault();
        const selected = filteredResults[selectedIndex];
        router.push(`/services/${selected.slug}`);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      inputRef.current?.blur();
      setIsFocused(false);
    }
  };

  return (
    <div className="w-full bg-[#F9FEFF] rounded-3xl shadow-xl p-5 sm:p-8 text-foreground border border-stone-200/80">
      {/* Heading: body sans font, text-xl, semibold */}
      <h2 className="text-xl font-semibold tracking-tight text-foreground mb-5">
        Search Services
      </h2>

      {/* Instant Search Bar (h-[52px], rounded-xl, 18px icon) */}
      <div className="relative">
        <label htmlFor="hero-card-search" className="sr-only">
          Search for a service
        </label>
        <div className="relative flex items-center">
          <Search className="w-[18px] h-[18px] text-foreground-subtle absolute left-4 pointer-events-none" aria-hidden="true" />
          <input
            id="hero-card-search"
            ref={inputRef}
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              setTimeout(() => setIsFocused(false), 200);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search for a service..."
            autoComplete="off"
            className="w-full h-[52px] pl-11 pr-10 rounded-xl border border-stone-300 bg-white text-base text-foreground placeholder:text-foreground-subtle/70 shadow-xs focus:outline-hidden focus:ring-2 focus:ring-brand-800 focus:border-brand-800 transition-shadow"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                inputRef.current?.focus();
              }}
              className="absolute right-3.5 p-1 text-xs font-semibold text-foreground-subtle hover:text-foreground transition-colors"
            >
              Clear
            </button>
          )}
        </div>

        {/* Live Search Results Overlay: Absolute overlay directly under input */}
        {showResults && (
          <div
            ref={resultsContainerRef}
            className="absolute left-0 right-0 top-full mt-1.5 bg-white rounded-xl shadow-lg border border-stone-200/90 z-30 divide-y divide-stone-100 max-h-[280px] overflow-y-auto overflow-hidden animate-in fade-in-0 duration-150"
          >
            {filteredResults.length > 0 ? (
              filteredResults.map((item, index) => {
                const Icon = SERVICE_ICONS[item.slug] || Briefcase;
                const isSelected = index === selectedIndex;
                return (
                  <Link
                    key={item.slug}
                    href={`/services/${item.slug}`}
                    className={`flex items-start gap-3 p-3 transition-colors ${
                      isSelected
                        ? 'bg-brand-50 text-brand-950'
                        : 'hover:bg-brand-50/60 text-stone-900'
                    }`}
                  >
                    <div className="p-1.5 rounded-lg bg-brand-50 text-brand-900 shrink-0 mt-0.5">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-stone-950 truncate">
                        {item.title}
                      </div>
                      <div className="text-xs text-stone-500 line-clamp-1 mt-0.5">
                        {item.shortDescription}
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-stone-400 shrink-0 mt-1" />
                  </Link>
                );
              })
            ) : (
              <div className="p-4 text-center text-xs text-stone-500 font-medium">
                No services found matching &ldquo;{searchQuery}&rdquo;
              </div>
            )}
          </div>
        )}
      </div>

      {/* POPULAR SERVICES Header: 28px gap above, 12px below */}
      <div className="mt-7 mb-3">
        <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-foreground-muted">
          Popular Services
        </span>
      </div>

      {/* 3x2 Grid of Tiles: min-height ~100px, 44-46px icon box, 22px icon, 14px font-medium label */}
      <div className="grid grid-cols-2 min-[380px]:grid-cols-3 gap-3">
        {popularServices.map((service) => {
          const Icon = SERVICE_ICONS[service.slug] || Briefcase;

          return (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group flex flex-col items-center text-center justify-center min-h-[100px] p-3.5 sm:p-4 rounded-2xl border border-stone-200/90 bg-white hover:border-brand-800 hover:shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-800 transition-all motion-safe:hover:-translate-y-0.5"
            >
              {/* 44px-46px rounded-xl icon box with soft brand green tint */}
              <div className="w-11 h-11 sm:w-[46px] sm:h-[46px] rounded-xl bg-brand-50 text-brand-900 group-hover:bg-accent group-hover:text-brand-950 flex items-center justify-center transition-colors shrink-0 mb-2">
                <Icon className="w-[22px] h-[22px]" />
              </div>
              <span className="text-sm font-medium text-stone-900 group-hover:text-brand-950 line-clamp-2 leading-tight">
                {service.title}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
