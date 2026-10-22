"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { ArrowUpRight } from "@/components/ui";
import { NAV_DROPDOWNS } from "@/config/site";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { LiveClock } from "./LiveClock";
import { MobileNav } from "./MobileNav";
import { QuickContacts } from "./QuickContacts";
import { FxTicker } from "./FxTicker";
import { WeatherTicker } from "./WeatherTicker";
import { ITEM_ICONS } from "./navIcons";
import { useTranslation } from "@/i18n";
import { useFxRates } from "@/lib/fx";
import { useWeather } from "@/lib/weather";

type DropdownKey = "services" | "government" | "transparency" | "statistics";

export function Header() {
  const { t } = useTranslation();
  const { rates: fxRates, lastUpdated: fxLastUpdated } = useFxRates();
  const { weather, isLoading: weatherLoading } = useWeather();
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<DropdownKey | null>(null);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [headerBottom, setHeaderBottom] = useState(64);
  const navRef = useRef<HTMLElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Measure header bottom offset so mobile drawer opens directly below sticky header
  useEffect(() => {
    const updateHeaderBottom = () => {
      if (navRef.current) {
        const rect = navRef.current.getBoundingClientRect();
        setHeaderBottom(rect.bottom);
      }
    };

    updateHeaderBottom();
    window.addEventListener("resize", updateHeaderBottom);
    window.addEventListener("scroll", updateHeaderBottom, { passive: true });
    return () => {
      window.removeEventListener("resize", updateHeaderBottom);
      window.removeEventListener("scroll", updateHeaderBottom);
    };
  }, [mobileDrawerOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenDropdown(null);
        setLangDropdownOpen(false);
        if (mobileDrawerOpen) {
          setMobileDrawerOpen(false);
          toggleButtonRef.current?.focus();
        }
      }
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileDrawerOpen]);

  // Opening one closes the other
  const handleToggleMobileDrawer = () => {
    if (!mobileDrawerOpen) {
      setLangDropdownOpen(false);
      setOpenDropdown(null);
    }
    setMobileDrawerOpen((prev) => !prev);
  };

  const handleLangDropdownChange = (open: boolean) => {
    if (open) {
      setMobileDrawerOpen(false);
      setOpenDropdown(null);
    }
    setLangDropdownOpen(open);
  };

  const handleCloseMobileDrawer = useCallback(() => {
    setMobileDrawerOpen(false);
    toggleButtonRef.current?.focus();
  }, []);

  const handleMouseEnter = (key: DropdownKey) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setOpenDropdown(key);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 140);
  };

  const dropdownMeta: { key: DropdownKey; label: string; rootHref: string }[] =
    [
      { key: "services", label: t.navServices, rootHref: "/services" },
      { key: "government", label: t.navGovernment, rootHref: "/government" },
      { key: "transparency", label: t.navTransparency, rootHref: "/transparency" },
      { key: "statistics", label: t.navStatistics, rootHref: "/statistics" },
    ];

  return (
    <>
      {/* Top Utility Bars */}
      <div className="bg-mist-900 text-mist-200 text-xs border-b border-mist-800">
        {/* Bar 1 — Emergency Hotlines / Quick Contacts */}
        <QuickContacts />

        {/* Bar 2 — Live Ticker Bar (Single-line on mobile & desktop) */}
        <div className="bg-mist-950/80 border-t border-mist-800/80 text-mist-400">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-7 sm:h-8 flex flex-nowrap items-center justify-between overflow-hidden whitespace-nowrap font-mono-tabular ticker-bar-text">
            <div className="flex flex-nowrap items-center gap-1.5 sm:gap-3 shrink-0">
              <FxTicker rates={fxRates} lastUpdated={fxLastUpdated} />
              {fxRates.length > 0 && (
                <span aria-hidden="true" className="text-mist-600 select-none">|</span>
              )}
              <WeatherTicker weather={weather} isLoading={weatherLoading} />
              {(weatherLoading || weather) && (
                <span aria-hidden="true" className="text-mist-600 select-none">|</span>
              )}
              <LiveClock />
            </div>
            <div className="hidden sm:flex items-center gap-2 text-mist-400 shrink-0">
              <span>Islamic City of Marawi, Lanao del Sur · 700m ASL</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        ref={navRef}
        className="sticky top-0 z-50 bg-surface/95 backdrop-blur-md border-b border-mist-200/90"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-8">
          {/* Brand Wordmark & Logo */}
          <Link
            href="/"
            className="flex items-center text-xl font-bold tracking-tight text-mist-900 font-display whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-800"
          >
            <Image
              src="/branding/logo.png"
              alt="BetterMarawi.org logo"
              width={2000}
              height={2000}
              className="h-18 sm:h-18 lg:h-20 w-auto shrink-0"
              priority
            />

            <span className="flex flex-col leading-none text-primary">
              <span>Better</span>
              <span>Marawi</span>
              <span className="-mt-0.5 self-end text-xs text-mist-700 sm:text-sm font-medium leading-none">
                .org
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label={t.mainNavigation}
            className="hidden lg:flex items-center gap-6 text-sm font-medium text-mist-700"
          >
            <Link
              href="/"
              className={`py-2 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                pathname === "/"
                  ? "border-brand-800 text-brand-950 font-semibold"
                  : "border-transparent hover:text-mist-950"
              }`}
            >
              {t.navHome}
            </Link>

            {dropdownMeta.map(({ key, label, rootHref }) => {
              const isOpen = openDropdown === key;
              const isActive =
                pathname === rootHref || pathname.startsWith(`${rootHref}/`);
              const items = NAV_DROPDOWNS[key];
              const isWideGrid = key === "services";

              return (
                <div
                  key={key}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(key)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="flex items-center gap-0.5">
                    <Link
                      href={rootHref}
                      className={`py-2 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                        isActive
                          ? "border-brand-800 text-brand-950 font-semibold"
                          : "border-transparent hover:text-mist-950"
                      }`}
                    >
                      {label}
                    </Link>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenDropdown(isOpen ? null : key)}
                      className="p-1 text-mist-500 hover:text-mist-900 rounded-md"
                    >
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-150 ${
                          isOpen ? "rotate-180 text-brand-800" : ""
                        }`}
                      />
                    </button>
                  </div>

                  {isOpen && (
                    <div
                      className={`absolute top-full left-0 mt-1 bg-white rounded-xl shadow-xl border border-mist-200/90 py-3 z-50 animate-in fade-in-0 duration-150 ${
                        isWideGrid
                          ? "w-[640px] grid grid-cols-2 gap-1 p-3"
                          : "w-72"
                      }`}
                    >
                      <div
                        className={
                          isWideGrid
                            ? "col-span-2 px-3 pb-2 mb-1 border-b border-mist-100 flex items-center justify-between"
                            : "px-4 pb-2 mb-1 border-b border-mist-100 flex items-center justify-between"
                        }
                      >
                        <span className="text-[11px] font-bold uppercase tracking-wider text-mist-700">
                          {label} {t.directorySuffix}
                        </span>
                        <Link
                          href={rootHref}
                          onClick={() => setOpenDropdown(null)}
                          className="text-xs text-brand-800 hover:text-brand-950 font-semibold flex items-center gap-1"
                        >
                          {t.viewAll}
                          <ArrowUpRight className="w-3 h-3" />
                        </Link>
                      </div>

                      {items.map((sub) => {
                        const isSubActive = pathname === sub.href;
                        return (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            onClick={() => setOpenDropdown(null)}
                            className={`flex items-start gap-3 p-2.5 rounded-lg transition-colors group ${
                              isSubActive
                                ? "bg-brand-50 text-brand-950 font-semibold"
                                : "hover:bg-mist-50 text-mist-700"
                            }`}
                          >
                            <span className="mt-0.5">
                              {ITEM_ICONS[sub.href]}
                            </span>
                            <div>
                              <div className="text-xs font-semibold text-mist-900 group-hover:text-brand-900">
                                {sub.label}
                              </div>
                              <div className="text-[11px] text-mist-500 line-clamp-1 leading-relaxed">
                                {sub.description}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            <Link
              href="/contact"
              className={`py-2 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                pathname === "/contact"
                  ? "border-brand-800 text-brand-950 font-semibold"
                  : "border-transparent hover:text-mist-950"
              }`}
            >
              {t.navContact}
            </Link>
          </nav>

          {/* Right Utility: Language Selector & Mobile Trigger */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <LanguageSwitcher
              isOpen={langDropdownOpen}
              onOpenChange={handleLangDropdownChange}
            />

            <button
              ref={toggleButtonRef}
              type="button"
              id="mobile-menu-toggle"
              aria-expanded={mobileDrawerOpen}
              aria-controls="mobile-nav-drawer"
              aria-label={mobileDrawerOpen ? t.closeMenu : t.openMenu}
              onClick={handleToggleMobileDrawer}
              className="lg:hidden p-2 rounded-lg text-mist-700 hover:bg-mist-200/60 focus-visible:outline-2 focus-visible:outline-brand-800"
            >
              {mobileDrawerOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      <MobileNav
        isOpen={mobileDrawerOpen}
        onClose={handleCloseMobileDrawer}
        topOffset={headerBottom}
      />
    </>
  );
}
