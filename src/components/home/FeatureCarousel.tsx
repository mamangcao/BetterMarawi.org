'use client';

import React, { useCallback, useEffect, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  FlaskConical,
  MapPin,
  Mountain,
  Pause,
  Hospital,
  Pill,
  Play,
  ShieldCheck,
  Stethoscope,
  ThermometerSun,
  Waves,
} from 'lucide-react';
import { Peso } from '@/components/ui';
import { useTranslation } from '@/i18n';
import { TOURISM_CATEGORIES } from '@/data/tourism';
import { cn } from '@/lib/utils';
import { FeatureSlide, FeatureSlideData } from './FeatureSlide';

/**
 * Time each slide stays up. Common carousel guidance is about 5 to 7 seconds,
 * enough to read a heading and a short paragraph. Autoplay pauses on hover,
 * on keyboard focus, with the pause button, and when reduced motion is set.
 */
const SLIDE_INTERVAL_MS = 6000;

const controlClass =
  'inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white';

export function FeatureCarousel() {
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const slides: FeatureSlideData[] = [
    {
      id: 'yakap',
      badgeIcon: ShieldCheck,
      badge: t.freeHealthCareForAll,
      title: 'PhilHealth',
      titleAccent: 'YAKAP',
      description: t.yakapDescription,
      highlights: [
        { icon: Pill, text: <span className="font-mono-tabular"><Peso />20k {t.maintenanceMedicines}</span> },
        { icon: FlaskConical, text: <span className="font-mono-tabular">13 {t.coveredLabs}</span> },
        { icon: Stethoscope, text: t.zeroCopay },
      ],
      primary: { href: '/services/health-services', label: t.learnFreeBenefits },
      // The City Health Office number is unverified, so this links to the sourced facility list
      // instead of offering a call (APMC's verified number is a different entity's line).
      secondary: { href: '/services/health-services#health-facilities-heading', label: t.seeHealthFacilities, icon: Hospital },
      image: {
        src: '/images/home/yakap-doctor-patient.jpg',
        alt: 'A doctor checks the blood pressure of a patient wearing a hijab',
      },
      credit: {
        label: 'Photo: Thirdman / Pexels',
        href: 'https://www.pexels.com/photo/a-doctor-taking-patient-s-blood-pressure-7659567/',
      },
    },
    {
      id: 'explore-marawi',
      badgeIcon: MapPin,
      badge: t.summerCapitalBadge,
      title: t.exploreTitle,
      titleAccent: 'Marawi',
      description: t.exploreMarawiDescription,
      highlights: [
        { icon: MapPin, text: `${TOURISM_CATEGORIES.length} ${t.tourismCategoriesLabel}` },
        { icon: Waves, text: t.highlandBasin },
        { icon: ThermometerSun, text: t.highlandClimateShort },
      ],
      primary: { href: '/services/tourism', label: t.exploreTourism },
      secondary: { href: '/statistics/city-profile', label: t.exploreGeographyProfile, icon: Mountain },
      image: {
        src: '/images/home/explore-marawi-lake-lanao.jpg',
        alt: 'Lake Lanao seen from Marawi City',
      },
      credit: {
        label: 'Photo: PeterParker22 / Wikimedia Commons, CC BY-SA 4.0',
        href: 'https://commons.wikimedia.org/wiki/File:Lake_Lanao_Marawi_City.jpg',
      },
    },
  ];
  const count = slides.length;

  const goTo = useCallback((i: number) => setIndex(((i % count) + count) % count), [count]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const paused = userPaused || hovered || focused || reducedMotion;

  useEffect(() => {
    if (paused) return;
    const timer = window.setTimeout(() => goTo(index + 1), SLIDE_INTERVAL_MS);
    return () => window.clearTimeout(timer);
  }, [index, paused, goTo]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label={t.featuredHighlights}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
      }}
    >
      <div className="relative overflow-hidden rounded-3xl bg-brand-900 text-white shadow-lg ring-1 ring-brand-950/40">
        {/* Slides share one grid cell, so the card takes the tallest slide's height */}
        <div className="grid" aria-live={paused ? 'polite' : 'off'}>
          {slides.map((slide, i) => (
            <FeatureSlide
              key={slide.id}
              slide={slide}
              active={i === index}
              positionLabel={`${i + 1} / ${count}`}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 lg:left-[36%] z-20 flex items-center gap-2.5">
          <button type="button" onClick={() => goTo(index - 1)} className={controlClass} aria-label={t.previousSlide}>
            <ChevronLeft className="w-4 h-4" />
          </button>
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`${t.goToSlide} ${i + 1}`}
              aria-current={i === index ? 'true' : undefined}
              className="group/dot h-9 px-1 inline-flex items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded-full"
            >
              <span
                className={cn(
                  'block h-2 rounded-full transition-all duration-300',
                  i === index ? 'w-7 bg-white' : 'w-2 bg-white/50 group-hover/dot:bg-white/80'
                )}
              />
            </button>
          ))}
          <button type="button" onClick={() => goTo(index + 1)} className={controlClass} aria-label={t.nextSlide}>
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setUserPaused((p) => !p)}
            className={controlClass}
            aria-label={userPaused ? t.playSlideshow : t.pauseSlideshow}
            aria-pressed={userPaused}
          >
            {userPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </section>
  );
}
