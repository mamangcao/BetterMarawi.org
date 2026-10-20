import React from "react";
import Link from "next/link";
import { Users } from "lucide-react";
import { ArrowUpRight } from "@/components/ui";
import { getPopularServices } from "@/lib/services";
import { SERVICES_DATA } from "@/data/services";
import { HeroSearchCard } from "./HeroSearchCard";

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
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,48%)] items-center gap-10 lg:gap-16">
          {/* Left Column */}
          <div className="min-w-0 flex flex-col justify-center">
            {/* Small uppercase label */}
            <p className="text-sm font-semibold uppercase tracking-widest text-[#F9FEFF]/80 mb-3">
              WELCOME TO
            </p>
            {/* Fluid responsive title */}
            <h1
              id="hero-heading"
              className="font-bold text-accent tracking-tight text-[#F9FEFF] font-display text-[clamp(1.8rem,6vw,4.5rem)] sm:text-[clamp(2.5rem,4.2vw,4.5rem)] leading-[1.05]"
            >
              BetterMarawi<span className="text-accent-light">.org</span>
            </h1>
            {/* Description balanced over two lines on desktop */}
            <p className="mt-6 sm:mt-7 text-lg sm:text-xl text-[#F9FEFF]/90 leading-relaxed max-w-[36rem] text-balance">
              A community-run portal to find information and services of the
              Islamic City of Marawi, Lanao del Sur.
            </p>
            {/* Action Buttons */}
            <div className="mt-8 sm:mt-11 grid grid-cols-2 items-stretch gap-2 sm:gap-4">
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-1.5 sm:gap-2 min-h-[48px] sm:min-h-[54px] w-full px-2.5 sm:px-6 rounded-lg bg-[#F9FEFF] text-brand-900 hover:bg-accent hover:text-brand-950 text-sm sm:text-base font-semibold shadow-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <span>Browse Services</span>
                <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-1.5 sm:gap-2 min-h-[48px] sm:min-h-[54px] w-full px-2.5 sm:px-6 rounded-lg bg-transparent border-2 border-[#F9FEFF] text-[#F9FEFF] hover:bg-white/10 text-sm sm:text-base font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <Users className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Contact Us</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Card takes 48% on desktop */}
          <div className="w-full flex justify-end">
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
