'use client';
import React from 'react';
import Link from 'next/link';
import { Mail, Building2 } from 'lucide-react';
import { SERVICES_DATA } from '@/data/services';
import { useTranslation } from '@/i18n';
import { SITE_CONFIG } from '@/config/site';

interface ServiceSidebarProps {
  currentSlug: string;
  email: string;
}

export function ServiceSidebar({ currentSlug, email }: ServiceSidebarProps) {
  const { t } = useTranslation();
  return (
    <aside className="lg:col-span-4">
      <div className="sticky top-24 space-y-6">
        <div className="bg-white rounded-xl border border-mist-200/90 p-5">
          <div className="text-xs font-semibold uppercase tracking-wider text-mist-500 pb-3 mb-3 border-b border-mist-100">
            {t.allServicesTitle}
          </div>
          <nav aria-label="Services Sibling Navigation" className="space-y-1">
            <Link
              href="/services/certificates"
              className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors text-mist-700 hover:bg-mist-100"
            >
              <span className="truncate">Certificates &amp; Clearances</span>
              <span className="font-mono-tabular opacity-75 ml-2 shrink-0">PSA / LCR</span>
            </Link>
            {SERVICES_DATA.map((item) => {
              const active = item.slug === currentSlug;
              return (
                <Link
                  key={item.slug}
                  href={`/services/${item.slug}`}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    active
                      ? 'bg-brand-900 text-white font-semibold'
                      : 'text-mist-700 hover:bg-mist-100'
                  }`}
                >
                  <span className="truncate">{item.title}</span>
                  <span className="font-mono-tabular opacity-75 ml-2 shrink-0">
                    {item.officeAcronym}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="bg-mist-900 text-mist-200 rounded-xl p-5 space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-accent">
            Anti-Red Tape Act (RA 11032)
          </div>
          <p className="text-xs text-mist-300 leading-relaxed">
            {t.antiRedTapeNotice}
          </p>
          <div className="pt-2 border-t border-mist-800 text-xs font-mono-tabular space-y-1">
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-accent" />
              <span>{email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="w-3.5 h-3.5 text-accent shrink-0" />
              <span>{SITE_CONFIG.contact.cityHallAddress}</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

