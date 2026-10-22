'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from '@/i18n';
import { cn } from '@/lib/utils';

const historyTimeline = [
  {
    era: 'Pre-colonial Era',
    title: 'Pat a Pangampong ko Ranao',
    description:
      'Traditional seat of the Four Principalities of Lanao along the shores of Lake Lanao, rich in royal Torogan architecture and Okir artistry.',
  },
  {
    era: '1940–1956',
    title: 'Charter of Dansalan to Marawi City',
    description:
      'Chartered as Dansalan in 1940 and officially renamed Marawi City in 1956 through RA 1552 authored by Senator Domocao Alonto.',
  },
  {
    era: '1961',
    title: 'Mindanao State University Founded',
    description:
      "MSU Main Campus was established in Marawi's cool highlands, becoming the premier educational and cultural institution in southern Philippines.",
  },
  {
    era: '1980',
    title: 'Islamic City of Marawi',
    description:
      'Declared the Islamic City of Marawi, reflecting the faith and heritage of its predominantly Meranaw Muslim people.',
  },
  {
    era: '2017',
    tone: 'okir',
    title: 'Marawi Siege',
    description:
      'From May 23 to October 23, 2017, a five-month armed conflict between government forces and ISIS-affiliated militants devastated the city center and displaced hundreds of thousands of residents.',
  },
  {
    era: 'Present Day',
    title: 'Rebuilding Marawi',
    description:
      'Rehabilitation of the most affected area continues, and the Marawi Siege Victims Compensation Act (RA 11696, 2022) provides for affected residents. Home to 259,993 people across 101 barangays (2024 POPCEN, PSA).',
  },
];

/** True once the element has scrolled into view (or immediately under reduced motion). */
function useInView<T extends Element>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, inView };
}

export function HistorySnapshot() {
  const { t } = useTranslation();
  const { ref, inView } = useInView<HTMLOListElement>();
  const last = historyTimeline.length - 1;

  return (
    <section aria-labelledby="history-heading" className="bg-surface-card border-y border-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-10 lg:mb-12">
          <h2 id="history-heading" className="text-2xl sm:text-3xl font-bold text-brand-950 font-display tracking-tight">
            {t.historySectionHeading}
          </h2>
          <p className="text-sm sm:text-base text-foreground-muted mt-2">{t.historySectionSubheading}</p>
        </div>

        {/*
          One list, two layouts: vertical on phones/tablets (line on the left),
          horizontal on desktop (line across the top). Each item draws the
          connector to the next marker; the present continues as a dashed line.
        */}
        <ol ref={ref} className="grid grid-cols-1 lg:grid-cols-3 gap-y-8 lg:gap-y-10 lg:gap-x-6">
          {historyTimeline.map((item, i) => {
            const isNow = i === last;
            // Last item in a desktop row: line runs to the row edge instead of into the gap
            const rowEnd = (i + 1) % 3 === 0;
            const delay = `${i * 200}ms`;
            return (
              <li key={item.era} className="relative pl-11 lg:pl-0 lg:pt-14">
                {/* Connector to the next marker (solid), or the dashed "ongoing" line after today */}
                {isNow ? (
                  <span
                    aria-hidden="true"
                    className="absolute border-dashed border-brand-300 left-[11px] top-7 h-10 border-l-2 lg:border-l-0 lg:border-t-2 lg:left-7 lg:right-0 lg:top-[11px] lg:h-0"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute bg-surface-border-strong left-[11px] top-7 -bottom-8 w-0.5 lg:left-7 lg:top-[11px] lg:bottom-auto lg:w-auto lg:h-0.5',
                      rowEnd ? 'lg:right-0' : 'lg:-right-6'
                    )}
                  >
                    <span
                      className={cn(
                        'block h-full w-full bg-brand-600 origin-top lg:origin-left transition-transform duration-700 ease-out motion-reduce:transition-none',
                        inView ? 'scale-100' : 'scale-y-0 lg:scale-y-100 lg:scale-x-0'
                      )}
                      style={{ transitionDelay: delay }}
                    />
                  </span>
                )}

                {/* Marker */}
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute left-0 top-0 grid place-items-center w-6 h-6 rounded-full transition-all duration-500 motion-reduce:transition-none',
                    inView ? 'opacity-100 scale-100' : 'opacity-0 scale-50',
                    isNow
                      ? 'bg-accent ring-4 ring-accent/30'
                      : item.tone === 'okir'
                        ? 'bg-white border-2 border-okir-700'
                        : 'bg-white border-2 border-brand-600'
                  )}
                  style={{ transitionDelay: delay }}
                >
                  {isNow ? (
                    <>
                      <span className="absolute inset-0 rounded-full bg-accent/60 animate-ping motion-reduce:animate-none" />
                      <span className="relative w-2 h-2 rounded-full bg-brand-950" />
                    </>
                  ) : (
                    <span className={cn('w-2 h-2 rounded-full', item.tone === 'okir' ? 'bg-okir-700' : 'bg-brand-600')} />
                  )}
                </span>

                {/* Card */}
                <article
                  aria-current={isNow ? 'step' : undefined}
                  className={cn(
                    'h-full rounded-2xl border p-6 transition-colors duration-300',
                    isNow
                      ? 'bg-brand-900 border-brand-900 text-white shadow-lg shadow-brand-900/20'
                      : 'bg-white border-surface-border hover:border-brand-300'
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={cn(
                        'text-xs font-mono-tabular font-semibold uppercase tracking-wider',
                        isNow ? 'text-brand-200' : item.tone === 'okir' ? 'text-okir-700' : 'text-brand-700'
                      )}
                    >
                      {item.era}
                    </span>
                    {isNow && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-brand-950">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-950" aria-hidden="true" />
                        {t.historyNow}
                      </span>
                    )}
                  </div>
                  <h3 className={cn('mt-2 text-lg font-bold leading-snug', isNow ? 'text-white' : 'text-brand-950')}>
                    {item.title}
                  </h3>
                  <p className={cn('mt-2 text-sm leading-relaxed', isNow ? 'text-brand-50/85' : 'text-foreground-muted')}>
                    {item.description}
                  </p>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
