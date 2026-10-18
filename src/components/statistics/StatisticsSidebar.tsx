'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MapPin } from 'lucide-react';
import { NAV_DROPDOWNS } from '@/config/site';

export function StatisticsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="lg:col-span-4">
      <div className="sticky top-24 space-y-6">
        <div className="bg-white rounded-xl border border-stone-200/90 p-5">
          <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 pb-3 mb-3 border-b border-stone-100">
            Statistics &amp; Open Data (4)
          </div>
          <nav aria-label="Statistics Sibling Links" className="space-y-1.5">
            {NAV_DROPDOWNS.statistics.map((item) => {
              const isCurrent =
                pathname === item.href ||
                (pathname === '/statistics' &&
                  item.href === '/statistics/city-profile');
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-3.5 py-2.5 rounded-lg text-xs transition-colors ${
                    isCurrent
                      ? 'bg-emerald-900 text-white font-semibold'
                      : 'text-stone-700 hover:bg-stone-100 font-medium'
                  }`}
                >
                  <div>{item.label}</div>
                  <div
                    className={`text-[11px] mt-0.5 line-clamp-1 ${
                      isCurrent ? 'text-emerald-100' : 'text-stone-500'
                    }`}
                  >
                    {item.description}
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="bg-stone-900 text-stone-200 rounded-xl p-5 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-300">
            <MapPin className="w-4 h-4" />
            Geographic Benchmark
          </div>
          <p className="text-xs text-stone-300 leading-relaxed">
            Marawi City serves as Kilometer Zero (0.00 km) for all highway distance measurements across the island of Mindanao.
          </p>
        </div>
      </div>
    </aside>
  );
}

