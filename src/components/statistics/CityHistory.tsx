import React from 'react';
import { ArrowUpRight } from '@/components/ui';
import { CITY_HISTORY } from '@/data/cityProfile';

/** Dated milestones in the city's legal history, each linked to the law itself */
export function CityHistory() {
  return (
    <section className="bg-white rounded-xl border border-mist-200/90 p-6 sm:p-8" aria-labelledby="history-heading">
      <h2 id="history-heading" className="text-xl font-bold text-mist-900 font-display">
        How the city came to be
      </h2>
      <ol className="mt-5 space-y-5 border-l-2 border-brand-100 pl-5">
        {CITY_HISTORY.map((e) => (
          <li key={e.year} className="relative">
            <span className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-brand-700 ring-4 ring-white" aria-hidden="true" />
            <p className="text-xs font-mono-tabular font-semibold text-brand-800">{e.year}</p>
            <h3 className="text-base font-bold text-mist-900 mt-0.5">{e.title}</h3>
            <p className="text-sm text-mist-700 mt-1">
              {e.text}{' '}
              <a
                href={e.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-0.5 font-semibold text-brand-800 underline underline-offset-2 hover:text-brand-950"
              >
                Read {e.source}
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
