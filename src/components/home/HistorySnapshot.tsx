import React from 'react';
import Link from 'next/link';
import { Mountain } from 'lucide-react';

export function HistorySnapshot() {
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
      era: 'Present Day',
      title: 'Modern Islamic City of Marawi',
      description:
        'Declared the Islamic City of Marawi in 1980; home to 259,993 residents across 96 barangays, advancing sustainable rehabilitation, peace, and open governance.',
    },
  ];

  return (
    <section
      aria-labelledby="history-heading"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 border-t border-stone-200/80"
    >
      <div className="mb-10">
        <h2
          id="history-heading"
          className="text-2xl sm:text-3xl font-bold text-stone-900 font-display"
        >
          History of the Islamic City of Marawi
        </h2>
        <p className="text-sm text-stone-600 mt-1">
          From the ancestral seat of Pat a Pangampong ko Ranao to the modern Islamic City of Marawi.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {historyTimeline.map((item) => (
          <div
            key={item.era}
            className="bg-white rounded-xl border border-stone-200/90 p-6 flex flex-col justify-between"
          >
            <div>
              <div className="text-xs font-mono-tabular font-semibold text-emerald-800">
                {item.era}
              </div>
              <h3 className="text-base font-bold text-stone-900 mt-2">
                {item.title}
              </h3>
              <p className="text-sm text-stone-600 mt-2 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Elevation Highlight Card */}
      <div className="mt-6 bg-stone-900 text-stone-100 rounded-xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-emerald-900/80 text-amber-300 shrink-0">
            <Mountain className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl font-bold text-white font-mono-tabular">
              700m Elevation
            </div>
            <p className="text-sm text-stone-300 mt-1 leading-relaxed max-w-3xl">
              Marawi sits at ~700 meters above sea level at coordinates 8°00&apos;N, 124°17&apos;E overlooking Lake Lanao, giving it a cool highland climate (&ldquo;Summer Capital of the South&rdquo;).
            </p>
          </div>
        </div>
        <Link
          href="/statistics/city-profile"
          className="px-4 py-2.5 rounded-lg bg-white text-stone-900 text-xs font-semibold hover:bg-stone-100 transition-colors whitespace-nowrap shrink-0"
        >
          Explore Geography Profile
        </Link>
      </div>
    </section>
  );
}

