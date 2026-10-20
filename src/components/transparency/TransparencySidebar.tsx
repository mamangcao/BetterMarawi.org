'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_DROPDOWNS } from '@/config/site';
import { useTranslation } from '@/i18n';

export function TransparencySidebar() {
  const { t } = useTranslation();
  const pathname = usePathname();

  return (
    <aside className="lg:col-span-4">
      <div className="sticky top-24 space-y-6">
        <div className="bg-white rounded-xl border border-stone-200/90 p-5">
          <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 pb-3 mb-3 border-b border-stone-100">
            {t.transparencySections}
          </div>
          <nav aria-label="Transparency Sibling Links" className="space-y-1.5">
            {NAV_DROPDOWNS.transparency.map((item) => {
              const isCurrent =
                pathname === item.href ||
                (pathname === '/transparency' &&
                  item.href === '/transparency/full-disclosure-policy');
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
      </div>
    </aside>
  );
}

