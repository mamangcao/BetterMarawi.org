import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Code2, Leaf, Users } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          {/* Column 1: Brand & Mission */}
          <div className="md:col-span-5 space-y-4">
            <Link
              href="/"
              className="flex items-center gap-2.5 text-2xl font-bold text-white font-display tracking-tight inline-block"
            >
              <Image
                src="/branding/logo.svg"
                alt="BetterMarawi.org"
                width={32}
                height={32}
                className="shrink-0"
              />
              <span>BetterMarawi.org</span>
            </Link>
            <p className="text-sm text-stone-400 leading-relaxed max-w-sm">
              A community-run portal to find information and services of the Islamic City of Marawi, Lanao del Sur.
            </p>
            <div className="pt-2 text-xs text-stone-400 space-y-1 font-mono-tabular">
              <div>Coordinates: 8°00&apos;N, 124°17&apos;E (8.0034, 124.2851)</div>
              <div>Elevation: ~700m ASL · Lake Lanao Highland Basin</div>
              <div>Postal Code: 9700 · Lanao del Sur, BARMM</div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-400 font-sans">
              Quick Links
            </h2>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/statistics/city-profile" className="hover:text-white transition-colors">
                  About the Portal
                </Link>
              </li>
              <li>
                <Link
                  href="/sitemap"
                  className="hover:text-white transition-colors font-medium text-accent/90"
                >
                  Sitemap
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Accessibility
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Community Discord
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div className="md:col-span-4 space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-400 font-sans">
              Resources
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5 text-sm">
              <li>
                <Link
                  href="/government/departments-and-officials"
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  Official Marawi LGU Page
                </Link>
              </li>
              <li>
                <Link href="/statistics/open-data-ph" className="hover:text-white transition-colors">
                  Open Data
                </Link>
              </li>
              <li>
                <Link
                  href="/transparency/freedom-of-information"
                  className="hover:text-white transition-colors"
                >
                  Freedom of Information
                </Link>
              </li>
              <li>
                <a
                  href="https://bangsamoro.gov.ph"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  BARMM Official Portal
                  <ArrowUpRight className="w-3.5 h-3.5 text-stone-500" />
                </a>
              </li>
              <li>
                <Link href="/government/legislative" className="hover:text-white transition-colors">
                  Sangguniang Panlungsod
                </Link>
              </li>
              <li>
                <Link
                  href="/transparency/full-disclosure-policy"
                  className="hover:text-white transition-colors"
                >
                  DILG Full Disclosure
                </Link>
              </li>
              <li>
                <Link href="/statistics/dti-cmci-profile" className="hover:text-white transition-colors">
                  DTI CMCI
                </Link>
              </li>
              <li>
                <Link href="/transparency/annual-budget" className="hover:text-white transition-colors">
                  BLGF
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Badges & Attribution */}
        <div className="pt-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 text-xs text-stone-400">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="text-accent font-semibold font-mono-tabular">
              Cost to the People of Marawi: ₱0
            </span>
            <span aria-hidden="true" className="text-stone-700">·</span>
            <Link
              href="/contact"
              className="hover:text-white transition-colors inline-flex items-center gap-1.5"
            >
              <Users className="w-3.5 h-3.5 text-stone-500" />
              Volunteer with Us
            </Link>
            <span aria-hidden="true" className="text-stone-700">|</span>
            <Link
              href="/sitemap"
              className="hover:text-white transition-colors inline-flex items-center gap-1.5"
            >
              <Code2 className="w-3.5 h-3.5 text-stone-500" />
              Contribute at GitHub
            </Link>
            <span aria-hidden="true" className="text-stone-700">·</span>
            <span className="inline-flex items-center gap-1 text-stone-400">
              <Leaf className="w-3.5 h-3.5 text-emerald-500" />
              Website Carbon: 0.08g CO₂/view (A+)
            </span>
          </div>

          <div className="text-stone-400 font-mono-tabular">
            BetterGov.ph © 2026 BetterMarawi.org · Not an official government website. Built by the community · v0.7.4
          </div>
        </div>
      </div>
    </footer>
  );
}

