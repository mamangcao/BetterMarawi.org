import React from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, CloudSun, Car } from 'lucide-react';
import { TOURISM_CATEGORIES } from '@/data/tourism';

export function CultureSpotlight() {
  return (
    <section
      aria-labelledby="discover-marawi-heading"
      className="bg-[#F3EFE6] border-y border-stone-200/90 py-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <h2
              id="discover-marawi-heading"
              className="text-2xl sm:text-3xl font-bold text-stone-900 font-display"
            >
              Discover Marawi
            </h2>
            <p className="text-sm text-stone-600 mt-1">
              &ldquo;The Summer Capital of the South&rdquo; · Registered cultural &amp; eco-tourism sites across 6 categories
            </p>
          </div>
          <Link
            href="/services/tourism"
            className="text-sm font-semibold text-emerald-800 hover:text-emerald-950 inline-flex items-center gap-1 whitespace-nowrap shrink-0"
          >
            View all tourism &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left 7 Cols: 6 Tourism Category Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TOURISM_CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href="/services/tourism"
                className="bg-white rounded-xl border border-stone-200/90 p-5 hover:border-emerald-800/50 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs text-stone-500 font-mono-tabular">
                    <span>Marawi Directory</span>
                    <span className="font-semibold text-emerald-800">{cat.countLabel}</span>
                  </div>
                  <h3 className="text-base font-bold text-stone-900 mt-1.5">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    {cat.summary}
                  </p>
                </div>
                <div className="mt-4 pt-2.5 border-t border-stone-100 text-xs font-medium text-emerald-800 flex items-center justify-between">
                  <span>Explore sites</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>

          {/* Right 5 Cols: Plan Your Visit — Getting to Marawi */}
          <div className="lg:col-span-5 bg-white rounded-xl border border-stone-200/90 p-6 flex flex-col justify-between space-y-6">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                Plan Your Visit — Getting to Marawi
              </div>

              {/* Live Weather Card */}
              <div className="mt-3 p-4 rounded-xl bg-stone-50 border border-stone-200/80">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xs text-stone-500">
                      Current conditions · Marawi City, Lanao del Sur
                    </div>
                    <div className="text-3xl font-bold text-stone-950 font-mono-tabular mt-1 flex items-center gap-2">
                      <CloudSun className="w-7 h-7 text-amber-600" />
                      22°C
                    </div>
                    <div className="text-xs font-medium text-stone-600 mt-1">
                      Cool Highland Climate · 700m ASL
                    </div>
                  </div>
                  <a
                    href="https://www.google.com/maps/place/Marawi+City,+Lanao+del+Sur/@8.0034,124.2851,13z"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 inline-flex items-center gap-1 whitespace-nowrap"
                  >
                    Open in Google Maps
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Driving time to Marawi */}
              <div className="mt-5">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-3 flex items-center gap-1.5">
                  <Car className="w-4 h-4 text-emerald-800" />
                  Driving time to Marawi
                </h3>
                <div className="divide-y divide-stone-100 text-sm">
                  <div className="py-2.5 flex items-center justify-between gap-3">
                    <div>
                      <div className="font-semibold text-stone-900">From Iligan City</div>
                      <div className="text-xs text-stone-500">Marawi–Iligan Hwy (38 km)</div>
                    </div>
                    <span className="font-mono-tabular font-bold text-emerald-900 whitespace-nowrap">
                      45 min
                    </span>
                  </div>

                  <div className="py-2.5 flex items-center justify-between gap-3">
                    <div>
                      <div className="font-semibold text-stone-900">
                        From Cagayan de Oro / Laguindingan
                      </div>
                      <div className="text-xs text-stone-500">CDO–Iligan–Marawi Rd (102 km)</div>
                    </div>
                    <span className="font-mono-tabular font-bold text-emerald-900 whitespace-nowrap">
                      1 hr 50 min
                    </span>
                  </div>

                  <div className="py-2.5 flex items-center justify-between gap-3">
                    <div>
                      <div className="font-semibold text-stone-900">From Cotabato City</div>
                      <div className="text-xs text-stone-500">Narciso Ramos Hwy (158 km)</div>
                    </div>
                    <span className="font-mono-tabular font-bold text-emerald-900 whitespace-nowrap">
                      3 hr 30 min
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <Link
              href="/services/tourism"
              className="w-full py-2.5 px-4 rounded-lg bg-stone-900 text-white text-xs font-semibold text-center hover:bg-stone-800 transition-colors"
            >
              View Complete Visitor &amp; Cultural Etiquette Guide
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

