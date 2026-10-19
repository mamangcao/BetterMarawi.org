import React from 'react';
import Link from 'next/link';
import { Users } from 'lucide-react';
import { ArrowUpRight } from '@/components/ui';
import { getPopularServices } from '@/lib/services';
import { SERVICES_DATA } from '@/data/services';
import { HeroSearchCard } from './HeroSearchCard';

export function Hero() {
  const popularServices = getPopularServices();
  const searchableServices = SERVICES_DATA.map((s) => ({
    slug: s.slug,
    title: s.title,
    shortDescription: s.shortDescription,
  }));

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative bg-brand-900 text-[#F9FEFF] bg-dot-pattern py-14 sm:py-20 lg:py-24 border-b border-brand-950"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column (55% on lg: 7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#F9FEFF]/80">
              WELCOME TO
            </p>
            <h1
              id="hero-heading"
              className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#F9FEFF] font-display leading-[1.08]"
            >
              BetterMarawi.org
            </h1>
            <p className="text-base sm:text-lg text-[#F9FEFF]/90 leading-relaxed max-w-xl">
              A community-run portal to find information and services of the Islamic City of Marawi, Lanao del Sur.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#F9FEFF] text-brand-900 hover:bg-accent hover:text-brand-950 text-sm font-semibold shadow-xs transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <span>Browse Services</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-transparent border-2 border-[#F9FEFF] text-[#F9FEFF] hover:bg-white/10 text-sm font-semibold transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <Users className="w-4 h-4" aria-hidden="true" />
                <span>Contact Us</span>
              </Link>
            </div>
          </div>

          {/* Right Column (45% on lg: 5 cols) */}
          <div className="lg:col-span-5 w-full">
            <HeroSearchCard
              popularServices={popularServices}
              searchableServices={searchableServices}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
