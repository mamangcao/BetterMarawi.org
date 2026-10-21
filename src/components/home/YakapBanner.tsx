'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FlaskConical, Phone, Pill, ShieldCheck, Stethoscope } from 'lucide-react';
import { ArrowUpRight, Peso } from '@/components/ui';
import { useTranslation } from '@/i18n';

/**
 * PhilHealth YAKAP feature banner on the home page.
 * Photo: Thirdman on Pexels (free to use), pexels.com/photo/7659567
 */
export function YakapBanner() {
  const { t } = useTranslation();

  const highlights = [
    { icon: Pill, text: <><Peso />20k {t.maintenanceMedicines}</> },
    { icon: FlaskConical, text: <>13 {t.coveredLabs}</> },
    { icon: Stethoscope, text: <>{t.zeroCopay}</> },
  ];

  return (
    <section aria-labelledby="yakap-heading" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="group relative isolate overflow-hidden rounded-3xl bg-brand-900 text-white shadow-lg ring-1 ring-brand-950/40">
        {/* Photo: full-bleed on mobile, right side on desktop */}
        <div className="absolute inset-0 lg:left-auto lg:w-[52%] -z-20">
          <Image
            src="/images/home/yakap-doctor-patient.jpg"
            alt="A doctor checks the blood pressure of a patient wearing a hijab"
            fill
            sizes="(min-width: 1024px) 52vw, 100vw"
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
          {/* Green tint keeps the photo on-brand and text readable */}
          <div className="absolute inset-0 bg-brand-900/85 lg:bg-gradient-to-r lg:from-brand-900/70 lg:via-brand-900/40 lg:to-brand-900/20" />
        </div>

        {/* Slanted content panel (desktop) with the Marawi star lattice */}
        <div
          aria-hidden="true"
          className="hidden lg:block absolute inset-y-0 left-0 w-[64%] -z-10 bg-brand-900 [clip-path:polygon(0_0,100%_0,88%_100%,0_100%)]"
        >
          <div className="absolute inset-0 bg-marawi-pattern opacity-70 [mask-image:linear-gradient(to_right,black,transparent_85%)]" />
        </div>
        {/* Thin highlight along the slanted edge */}
        <div
          aria-hidden="true"
          className="hidden lg:block absolute inset-y-0 left-0 w-[64%] -z-10 bg-brand-700/40 [clip-path:polygon(100%_0,100.6%_0,88.6%_100%,88%_100%)]"
        />

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center p-6 sm:p-10 lg:p-12">
          {/* Text */}
          <div className="lg:col-span-7 space-y-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm">
              <ShieldCheck className="w-4 h-4 text-brand-200" aria-hidden="true" />
              {t.freeHealthCareForAll}
            </span>
            <h2
              id="yakap-heading"
              className="text-4xl sm:text-5xl font-extrabold font-display tracking-tight leading-none"
            >
              PhilHealth <span className="text-accent">YAKAP</span>
            </h2>
            <p className="text-base sm:text-lg text-brand-50/90 leading-relaxed max-w-2xl">
              {t.yakapDescription}
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-3 pt-1 text-sm sm:text-base font-medium text-brand-50">
              {highlights.map(({ icon: Icon, text }, i) => (
                <li key={i} className="inline-flex items-center gap-2">
                  <Icon className="w-4.5 h-4.5 text-brand-200 shrink-0" aria-hidden="true" />
                  <span className="font-mono-tabular">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col lg:items-end gap-3">
            <Link
              href="/services/health-services"
              className="inline-flex items-center justify-center gap-2 min-h-[52px] px-6 rounded-xl bg-accent text-brand-950 text-sm sm:text-base font-bold shadow-md hover:bg-accent-hover hover:-translate-y-0.5 transition-all motion-reduce:hover:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent lg:w-[20rem]"
            >
              {t.learnFreeBenefits}
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:0632212536"
              className="inline-flex items-center justify-center gap-2 min-h-[52px] px-6 rounded-xl border border-white/30 bg-white/10 text-white text-sm sm:text-base font-semibold backdrop-blur-sm hover:bg-white/20 transition-colors font-mono-tabular focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:w-[20rem]"
            >
              <Phone className="w-4 h-4 text-brand-200" aria-hidden="true" />
              {t.callTheCho}(063) 221-2536
            </a>
          </div>
        </div>

        {/* Photo credit */}
        <a
          href="https://www.pexels.com/photo/a-doctor-taking-patient-s-blood-pressure-7659567/"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-2 right-3 text-[10px] text-white/60 hover:text-white transition-colors"
        >
          Photo: Thirdman / Pexels
        </a>
      </div>
    </section>
  );
}
