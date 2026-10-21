'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { LucideIcon } from 'lucide-react';
import { ArrowUpRight } from '@/components/ui';
import { cn } from '@/lib/utils';

export interface FeatureSlideData {
  id: string;
  badgeIcon: LucideIcon;
  badge: string;
  title: string;
  titleAccent: string;
  description: string;
  highlights: { icon: LucideIcon; text: React.ReactNode }[];
  primary: { href: string; label: string };
  secondary: { href: string; label: string; icon: LucideIcon; mono?: boolean };
  image: { src: string; alt: string; position?: string };
  credit: { label: string; href: string };
}

interface FeatureSlideProps {
  slide: FeatureSlideData;
  active: boolean;
  /** e.g. "1 of 2", announced as the slide's name */
  positionLabel: string;
}

/** One slide of the home feature carousel. Inactive slides fade out and leave the tab order. */
export function FeatureSlide({ slide, active, positionLabel }: FeatureSlideProps) {
  const { badgeIcon: BadgeIcon, secondary } = slide;
  const SecondaryIcon = secondary.icon;
  const secondaryIsLink = secondary.href.startsWith('/');
  const secondaryClass = cn(
    'inline-flex items-center justify-center gap-2 min-h-[52px] px-6 rounded-xl border border-white/30 bg-white/10 text-white text-sm sm:text-base font-semibold backdrop-blur-sm hover:bg-white/20 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:w-[20rem]',
    secondary.mono && 'font-mono-tabular'
  );

  return (
    <div
      role="group"
      aria-roledescription="slide"
      aria-label={positionLabel}
      aria-hidden={!active}
      inert={!active}
      className={cn(
        'group relative isolate col-start-1 row-start-1 transition-opacity duration-700 ease-out motion-reduce:transition-none',
        active ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none'
      )}
    >
      {/* Photo: full-bleed on mobile, right side on desktop */}
      <div className="absolute inset-0 lg:left-auto lg:w-[52%] -z-20 overflow-hidden">
        <Image
          src={slide.image.src}
          alt={slide.image.alt}
          fill
          sizes="(min-width: 1024px) 52vw, 100vw"
          className={cn(
            'object-cover transition-transform duration-[6000ms] ease-out motion-reduce:transition-none',
            slide.image.position ?? 'object-center',
            active ? 'scale-105' : 'scale-100'
          )}
        />
        <div className="absolute inset-0 bg-brand-900/85 lg:bg-gradient-to-r lg:from-brand-900/70 lg:via-brand-900/40 lg:to-brand-900/20" />
      </div>

      {/* Slanted content panel (desktop) with the Marawi star lattice */}
      <div
        aria-hidden="true"
        className="hidden lg:block absolute inset-y-0 left-0 w-[64%] -z-10 bg-brand-900 [clip-path:polygon(0_0,100%_0,88%_100%,0_100%)]"
      >
        <div className="absolute inset-0 bg-marawi-pattern opacity-70 [mask-image:linear-gradient(to_right,black,transparent_85%)]" />
      </div>
      <div
        aria-hidden="true"
        className="hidden lg:block absolute inset-y-0 left-0 w-[64%] -z-10 bg-brand-700/40 [clip-path:polygon(100%_0,100.6%_0,88.6%_100%,88%_100%)]"
      />

      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center px-6 pt-6 pb-24 sm:px-10 sm:pt-10 lg:px-12 lg:pt-12 lg:pb-24">
        <div className="lg:col-span-7 space-y-5">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm">
            <BadgeIcon className="w-4 h-4 text-brand-200" aria-hidden="true" />
            {slide.badge}
          </span>
          <h2
            id={`${slide.id}-heading`}
            className="text-4xl sm:text-5xl font-extrabold font-display tracking-tight leading-none"
          >
            {slide.title} <span className="text-accent">{slide.titleAccent}</span>
          </h2>
          <p className="text-base sm:text-lg text-brand-50/90 leading-relaxed max-w-2xl">
            {slide.description}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-3 pt-1 text-sm sm:text-base font-medium text-brand-50">
            {slide.highlights.map(({ icon: Icon, text }, i) => (
              <li key={i} className="inline-flex items-center gap-2">
                <Icon className="w-4.5 h-4.5 text-brand-200 shrink-0" aria-hidden="true" />
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col lg:items-end gap-3">
          <Link
            href={slide.primary.href}
            className="inline-flex items-center justify-center gap-2 min-h-[52px] px-6 rounded-xl bg-accent text-brand-950 text-sm sm:text-base font-bold shadow-md hover:bg-accent-hover hover:-translate-y-0.5 transition-all motion-reduce:hover:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent lg:w-[20rem]"
          >
            {slide.primary.label}
            <ArrowUpRight className="w-4 h-4" />
          </Link>
          {secondaryIsLink ? (
            <Link href={secondary.href} className={secondaryClass}>
              <SecondaryIcon className="w-4 h-4 text-brand-200" aria-hidden="true" />
              {secondary.label}
            </Link>
          ) : (
            <a href={secondary.href} className={secondaryClass}>
              <SecondaryIcon className="w-4 h-4 text-brand-200" aria-hidden="true" />
              {secondary.label}
            </a>
          )}
        </div>
      </div>

      <a
        href={slide.credit.href}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-2 right-3 text-[10px] text-white/60 hover:text-white transition-colors"
      >
        {slide.credit.label}
      </a>
    </div>
  );
}
