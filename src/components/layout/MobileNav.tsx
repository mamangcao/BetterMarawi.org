'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Phone } from 'lucide-react';
import { ArrowUpRight } from '@/components/ui';
import { NAV_DROPDOWNS } from '@/config/site';
import { useTranslation } from '@/i18n';
import { ITEM_ICONS } from './navIcons';

type DropdownKey = 'services' | 'government' | 'transparency' | 'statistics' | 'emergency';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  topOffset?: number;
}

const EMERGENCY_MENU_ITEMS = [
  {
    id: 'cdrrmo',
    label: 'CDRRMO Rescue',
    number: '(063) 352-0117',
    telHref: 'tel:0633520117',
  },
  {
    id: 'bfp',
    label: 'City Fire Station (BFP)',
    number: '0917-842-9910',
    telHref: 'tel:09178429910',
  },
  {
    id: 'pnp',
    label: 'City Police (PNP)',
    number: '0998-598-6678',
    telHref: 'tel:09985986678',
  },
  {
    id: 'cho-apmc',
    label: 'CHO / APMC Hospital',
    number: '(063) 221-2536',
    telHref: 'tel:0632212536',
  },
];

export function MobileNav({ isOpen, onClose, topOffset = 64 }: MobileNavProps) {
  const { t } = useTranslation();
  const pathname = usePathname();
  // All dropdowns collapsed by default
  const [mobileAccordion, setMobileAccordion] = useState<DropdownKey | null>(null);
  const prevPathname = useRef(pathname);

  // Reset dropdowns when drawer closes
  useEffect(() => {
    if (!isOpen) {
      setMobileAccordion(null);
    }
  }, [isOpen]);

  // Close drawer and reset dropdowns on route change
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      setMobileAccordion(null);
      onClose();
    }
  }, [pathname, onClose]);

  // Lock body scroll while open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Close on Escape key and reset dropdowns
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileAccordion(null);
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const dropdownMeta: { key: 'services' | 'government' | 'transparency' | 'statistics'; label: string; rootHref: string }[] = [
    { key: 'services', label: t.navServices, rootHref: '/services' },
    { key: 'government', label: t.navGovernment, rootHref: '/government' },
    { key: 'transparency', label: t.navTransparency, rootHref: '/transparency' },
    { key: 'statistics', label: t.navStatistics, rootHref: '/statistics' },
  ];

  const handleToggle = (key: DropdownKey) => {
    setMobileAccordion((prev) => (prev === key ? null : key));
  };

  return (
    <div
      id="mobile-nav-drawer"
      role="dialog"
      aria-modal="true"
      aria-label={t.navMenu}
      className="lg:hidden fixed inset-x-0 bottom-0 z-40 bg-mist-950/50 backdrop-blur-xs flex justify-end"
      style={{ top: `${topOffset}px` }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setMobileAccordion(null);
          onClose();
        }
      }}
    >
      <div
        className="w-full max-w-md bg-surface h-full overflow-y-auto border-l border-mist-200 p-4 sm:p-5 pt-3.5 sm:pt-4 flex flex-col justify-between shadow-2xl"
        style={{ maxHeight: `calc(100dvh - ${topOffset}px)` }}
      >
        <div className="space-y-2">
          {/* First Item: Home directly (14px padding above, no empty row/divider) */}
          <Link
            href="/"
            onClick={onClose}
            className={`block px-3 py-2.5 rounded-lg text-base font-semibold ${
              pathname === '/'
                ? 'bg-brand-900 text-white'
                : 'text-mist-900 hover:bg-mist-200/60'
            }`}
          >
            {t.navHome}
          </Link>

          {/* Standard Navigation Dropdowns */}
          {dropdownMeta.map(({ key, label, rootHref }) => {
            const expanded = mobileAccordion === key;
            const items = NAV_DROPDOWNS[key];
            return (
              <div key={key} className="border-b border-mist-200/80 pb-2">
                <button
                  type="button"
                  aria-expanded={expanded}
                  aria-controls={`mobile-submenu-${key}`}
                  onClick={() => handleToggle(key)}
                  className="w-full flex items-center justify-between px-3 py-2.5 text-base font-semibold text-mist-900 hover:text-brand-800 text-left rounded-lg transition-colors"
                >
                  <span>{label}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-mist-600 transition-transform ${
                      expanded ? 'rotate-180 text-brand-800' : ''
                    }`}
                  />
                </button>

                {expanded && (
                  <div id={`mobile-submenu-${key}`} className="mt-1 pl-3 space-y-1">
                    <Link
                      href={rootHref}
                      onClick={onClose}
                      className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-brand-800 hover:text-brand-950"
                    >
                      {t.viewAll} {label}
                      <ArrowUpRight className="w-3 h-3" />
                    </Link>
                    {items.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        onClick={onClose}
                        className={`flex items-start gap-2.5 px-3 py-2 rounded-lg text-sm ${
                          pathname === sub.href
                            ? 'bg-brand-100/80 text-brand-950 font-semibold'
                            : 'text-mist-700 hover:bg-mist-200/50'
                        }`}
                      >
                        <span className="mt-0.5">{ITEM_ICONS[sub.href]}</span>
                        <div>
                          <div className="font-medium text-mist-900">{sub.label}</div>
                          <div className="text-xs text-mist-500 line-clamp-1">
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

          {/* Emergency / Hotline Dropdown */}
          <div className="border-b border-mist-200/80 pb-2">
            <button
              type="button"
              aria-expanded={mobileAccordion === 'emergency'}
              aria-controls="mobile-submenu-emergency"
              onClick={() => handleToggle('emergency')}
              className="w-full flex items-center justify-between px-3 py-2.5 text-base font-semibold text-mist-900 hover:text-brand-800 text-left rounded-lg transition-colors"
            >
              <span className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-800 shrink-0" aria-hidden="true" />
                <span>{t.emergencyHotline}</span>
              </span>
              <ChevronDown
                className={`w-5 h-5 text-mist-600 transition-transform ${
                  mobileAccordion === 'emergency' ? 'rotate-180 text-brand-800' : ''
                }`}
              />
            </button>

            {mobileAccordion === 'emergency' && (
              <div id="mobile-submenu-emergency" className="mt-1 pl-3 space-y-1">
                {EMERGENCY_MENU_ITEMS.map((item) => (
                  <a
                    key={item.id}
                    href={item.telHref}
                    onClick={onClose}
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-mist-700 hover:bg-mist-200/50 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <Phone className="w-3.5 h-3.5 text-brand-800 shrink-0" aria-hidden="true" />
                      <span className="font-medium text-mist-900">{item.label}</span>
                    </div>
                    <span className="text-xs font-semibold text-brand-800 font-mono-tabular shrink-0">
                      {item.number}
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Contact */}
          <Link
            href="/contact"
            onClick={onClose}
            className={`block px-3 py-2.5 rounded-lg text-base font-semibold ${
              pathname === '/contact'
                ? 'bg-brand-900 text-white'
                : 'text-mist-900 hover:bg-mist-200/60'
            }`}
          >
            {t.navContact}
          </Link>

          {/* Sitemap */}
          <Link
            href="/sitemap"
            onClick={onClose}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-mist-600 hover:bg-mist-200/60"
          >
            {t.sitemapAndInspector}
          </Link>
        </div>
      </div>
    </div>
  );
}
