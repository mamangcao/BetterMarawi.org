'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { ChevronDown, Phone, X } from 'lucide-react';
import { NAV_DROPDOWNS } from '@/config/site';
import { ITEM_ICONS } from './navIcons';

type DropdownKey = 'services' | 'government' | 'transparency' | 'statistics';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname();
  const [mobileAccordion, setMobileAccordion] = useState<DropdownKey | null>('services');

  if (!isOpen) return null;

  const dropdownMeta: { key: DropdownKey; label: string; rootHref: string }[] = [
    { key: 'services', label: 'Services', rootHref: '/services' },
    { key: 'government', label: 'Government', rootHref: '/government' },
    { key: 'transparency', label: 'Transparency', rootHref: '/transparency' },
    { key: 'statistics', label: 'Statistics', rootHref: '/statistics' },
  ];

  return (
    <div className="lg:hidden fixed inset-0 top-16 z-50 bg-stone-950/50 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-surface h-[calc(100vh-4rem)] overflow-y-auto border-l border-stone-200 p-5 flex flex-col justify-between shadow-2xl">
        <div className="space-y-2">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200">
            <Link href="/" onClick={onClose} className="flex items-center gap-2">
              <Image
                src="/branding/logo.png"
                alt="BetterMarawi.org logo"
                width={2000}
                height={2000}
                className="h-8 sm:h-9 w-auto shrink-0"
                priority
              />
              <span className="font-display font-bold text-stone-900 text-lg">BetterMarawi.org</span>
            </Link>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="p-1.5 rounded-lg text-stone-600 hover:bg-stone-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <Link
            href="/"
            onClick={onClose}
            className={`block px-3 py-2.5 rounded-lg text-base font-semibold ${
              pathname === '/'
                ? 'bg-emerald-900 text-white'
                : 'text-stone-900 hover:bg-stone-200/60'
            }`}
          >
            Home
          </Link>

          {dropdownMeta.map(({ key, label, rootHref }) => {
            const expanded = mobileAccordion === key;
            const items = NAV_DROPDOWNS[key];
            return (
              <div key={key} className="border-b border-stone-200/80 pb-2">
                <div className="flex items-center justify-between">
                  <Link
                    href={rootHref}
                    onClick={onClose}
                    className="px-3 py-2.5 text-base font-semibold text-stone-900 hover:text-emerald-800"
                  >
                    {label}
                  </Link>
                  <button
                    type="button"
                    aria-expanded={expanded}
                    onClick={() => setMobileAccordion(expanded ? null : key)}
                    className="p-2.5 text-stone-600 hover:text-stone-900 rounded-lg"
                  >
                    <ChevronDown
                      className={`w-5 h-5 transition-transform ${
                        expanded ? 'rotate-180 text-emerald-800' : ''
                      }`}
                    />
                  </button>
                </div>

                {expanded && (
                  <div className="mt-1 pl-3 space-y-1">
                    {items.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        onClick={onClose}
                        className={`flex items-start gap-2.5 px-3 py-2 rounded-lg text-sm ${
                          pathname === sub.href
                            ? 'bg-emerald-100/80 text-emerald-950 font-semibold'
                            : 'text-stone-700 hover:bg-stone-200/50'
                        }`}
                      >
                        <span className="mt-0.5">{ITEM_ICONS[sub.href]}</span>
                        <div>
                          <div className="font-medium text-stone-900">{sub.label}</div>
                          <div className="text-xs text-stone-500 line-clamp-1">
                            {sub.description}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          <Link
            href="/contact"
            onClick={onClose}
            className={`block px-3 py-2.5 rounded-lg text-base font-semibold ${
              pathname === '/contact'
                ? 'bg-emerald-900 text-white'
                : 'text-stone-900 hover:bg-stone-200/60'
            }`}
          >
            Contact
          </Link>
          <Link
            href="/sitemap"
            onClick={onClose}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-stone-600 hover:bg-stone-200/60"
          >
            Sitemap & SEO Schema Inspector
          </Link>
        </div>

        {/* Quick-Tap Emergency Hotlines at Bottom of Mobile Drawer */}
        <div className="mt-6 pt-4 border-t border-stone-300 bg-stone-100 rounded-xl p-4">
          <div className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-2.5 flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-emerald-800" />
            Quick-Tap Marawi Emergency Hotlines
          </div>
          <div className="grid grid-cols-1 gap-2 text-xs font-mono-tabular">
            <a
              href="tel:0633520117"
              className="flex items-center justify-between px-3 py-2 bg-white rounded-lg border border-stone-200 text-stone-900 font-medium"
            >
              <span>CDRRMO Rescue</span>
              <span className="text-emerald-800 font-semibold">(063) 352-0117</span>
            </a>
            <a
              href="tel:09178429910"
              className="flex items-center justify-between px-3 py-2 bg-white rounded-lg border border-stone-200 text-stone-900 font-medium"
            >
              <span>City Fire Station (BFP)</span>
              <span className="text-emerald-800 font-semibold">0917-842-9910</span>
            </a>
            <a
              href="tel:09985986678"
              className="flex items-center justify-between px-3 py-2 bg-white rounded-lg border border-stone-200 text-stone-900 font-medium"
            >
              <span>City Police (PNP)</span>
              <span className="text-emerald-800 font-semibold">0998-598-6678</span>
            </a>
            <a
              href="tel:0632212536"
              className="flex items-center justify-between px-3 py-2 bg-white rounded-lg border border-stone-200 text-stone-900 font-medium"
            >
              <span>CHO / APMC Hospital</span>
              <span className="text-emerald-800 font-semibold">(063) 221-2536</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

