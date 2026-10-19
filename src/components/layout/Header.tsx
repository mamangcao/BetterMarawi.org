"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu } from "lucide-react";
import { ArrowUpRight } from "@/components/ui";
import { NAV_DROPDOWNS } from "@/config/site";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { LiveClock } from "./LiveClock";
import { MobileNav } from "./MobileNav";
import { QuickContacts } from "./QuickContacts";
import { FxTicker } from "./FxTicker";
import { ITEM_ICONS } from "./navIcons";

type DropdownKey = "services" | "government" | "transparency" | "statistics";

export function Header() {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<DropdownKey | null>(null);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenDropdown(null);
        setMobileDrawerOpen(false);
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
      { key: "services", label: "Services", rootHref: "/services" },
      { key: "government", label: "Government", rootHref: "/government" },
      { key: "transparency", label: "Transparency", rootHref: "/transparency" },
      { key: "statistics", label: "Statistics", rootHref: "/statistics" },
    ];

  return (
    <>
      {/* Top Utility Bars */}
      <div className="bg-stone-900 text-stone-200 text-xs border-b border-stone-800">
        {/* Bar 1 — Emergency Hotlines / Quick Contacts */}
        <QuickContacts />

        {/* Bar 2 — Live Ticker Bar */}
        <div className="bg-stone-950/80 border-t border-stone-800/80 text-stone-400">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono-tabular">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <FxTicker />
              <span aria-hidden="true">|</span>
              <span className="text-stone-300">Marawi City 22°C</span>
              <span aria-hidden="true">|</span>
              <LiveClock />
            </div>
            <div className="hidden sm:flex items-center gap-2 text-stone-400">
              <span>Islamic City of Marawi, Lanao del Sur · 700m ASL</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        ref={navRef}
        className="sticky top-0 z-40 bg-surface/95 backdrop-blur-md border-b border-stone-200/90"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          {/* Brand Wordmark & Logo */}
          <Link
            href="/"
            className="flex items-center text-xl font-bold tracking-tight text-stone-900 font-display whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800"
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
              <span className="-mt-0.5 self-end text-xs text-stone-700 sm:text-sm font-medium leading-none">
                .org
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-6 text-sm font-medium text-stone-700"
          >
            <Link
              href="/"
              className={`py-2 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                pathname === "/"
                  ? "border-emerald-800 text-emerald-950 font-semibold"
                  : "border-transparent hover:text-stone-950"
              }`}
            >
              Home
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
                          ? "border-emerald-800 text-emerald-950 font-semibold"
                          : "border-transparent hover:text-stone-950"
                      }`}
                    >
                      {label}
                    </Link>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenDropdown(isOpen ? null : key)}
                      className="p-1 text-stone-500 hover:text-stone-900 rounded-md"
                    >
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-150 ${
                          isOpen ? "rotate-180 text-emerald-800" : ""
                        }`}
                      />
                    </button>
                  </div>

                  {isOpen && (
                    <div
                      className={`absolute top-full left-0 mt-1 bg-white rounded-xl shadow-xl border border-stone-200/90 py-3 z-50 animate-in fade-in-0 duration-150 ${
                        isWideGrid
                          ? "w-[640px] grid grid-cols-2 gap-1 p-3"
                          : "w-72"
                      }`}
                    >
                      <div
                        className={
                          isWideGrid
                            ? "col-span-2 px-3 pb-2 mb-1 border-b border-stone-100 flex items-center justify-between"
                            : "px-4 pb-2 mb-1 border-b border-stone-100 flex items-center justify-between"
                        }
                      >
                        <span className="text-[11px] font-bold uppercase tracking-wider text-stone-700">
                          {label} Directory
                        </span>
                        <Link
                          href={rootHref}
                          onClick={() => setOpenDropdown(null)}
                          className="text-xs text-emerald-800 hover:text-emerald-950 font-semibold flex items-center gap-1"
                        >
                          View All
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
                                ? "bg-emerald-50 text-emerald-950 font-semibold"
                                : "hover:bg-stone-50 text-stone-700"
                            }`}
                          >
                            <span className="mt-0.5">
                              {ITEM_ICONS[sub.href]}
                            </span>
                            <div>
                              <div className="text-xs font-semibold text-stone-900 group-hover:text-emerald-900">
                                {sub.label}
                              </div>
                              <div className="text-[11px] text-stone-500 line-clamp-1 leading-relaxed">
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
                  ? "border-emerald-800 text-emerald-950 font-semibold"
                  : "border-transparent hover:text-stone-950"
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Right Utility: Language Selector & Mobile Trigger */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher />

            <button
              type="button"
              aria-expanded={mobileDrawerOpen}
              aria-label="Open navigation menu"
              onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
              className="lg:hidden p-2 rounded-lg text-stone-700 hover:bg-stone-200/60 focus-visible:outline-2 focus-visible:outline-emerald-800"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        <MobileNav
          isOpen={mobileDrawerOpen}
          onClose={() => setMobileDrawerOpen(false)}
        />
      </header>
    </>
  );
}
