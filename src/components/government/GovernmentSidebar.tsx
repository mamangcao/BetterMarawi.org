'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Building2, Scale, Users } from 'lucide-react';
import { NAV_DROPDOWNS, SITE_CONFIG } from '@/config/site';
import { useTranslation } from '@/i18n';

export function GovernmentSidebar() {
  const { t } = useTranslation();
  const pathname = usePathname();

  return (
    <aside className="lg:col-span-4">
      <div className="sticky top-24 space-y-6">
        <div className="bg-white rounded-xl border border-mist-200/90 p-5">
          <div className="text-xs font-semibold uppercase tracking-wider text-mist-500 pb-3 mb-3 border-b border-mist-100">
            {t.governmentSections}
          </div>
          <nav aria-label="Government Sibling Links" className="space-y-1.5">
            {NAV_DROPDOWNS.government.map((item) => {
              const isCurrent =
                pathname === item.href ||
                (pathname === '/government' &&
                  item.href === '/government/departments-and-officials');
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-3.5 py-2.5 rounded-lg text-xs transition-colors ${
                    isCurrent
                      ? 'bg-brand-900 text-white font-semibold'
                      : 'text-mist-700 hover:bg-mist-100 font-medium'
                  }`}
                >
                  <div>{item.label}</div>
                  <div
                    className={`text-[11px] mt-0.5 line-clamp-1 ${
                      isCurrent ? 'text-brand-100' : 'text-mist-500'
                    }`}
                  >
                    {item.description}
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="bg-mist-900 text-mist-200 rounded-xl p-5 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent">
            <Building2 className="w-4 h-4" />
            Marawi City Hall Seat
          </div>
          <p className="text-xs text-mist-300 leading-relaxed">
            {SITE_CONFIG.contact.cityHallAddress}, Bangsamoro Autonomous Region in Muslim Mindanao (BARMM).
          </p>
          <div className="pt-2 border-t border-mist-800 text-xs font-mono-tabular space-y-1">
            <div className="flex items-center gap-2">
              <Scale className="w-3.5 h-3.5 text-accent" />
              <span>SP Session: Tuesdays, 9:00 AM</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-3.5 h-3.5 text-accent" />
              <span>101 Constituent Barangays</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

