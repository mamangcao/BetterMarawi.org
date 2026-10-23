'use client';

import React from 'react';
import Link from 'next/link';
import { Info, Phone } from 'lucide-react';
import { ArrowUpRight } from '@/components/ui';
import { useTranslation } from '@/i18n';

/**
 * Contact panel. This community-run site cannot deliver messages to city offices,
 * so it explains that plainly instead of showing a form that sends nothing.
 * Add a form back only when there is a real, confirmed channel behind it.
 */
export function ContactForm() {
  const { t } = useTranslation();

  return (
    <section
      aria-labelledby="contact-panel-heading"
      className="bg-white rounded-xl border border-mist-200/90 p-6 sm:p-8 space-y-5"
    >
      <h2
        id="contact-panel-heading"
        className="text-xl font-bold text-mist-900 font-display pb-4 border-b border-mist-100"
      >
        {t.contactFormTitle}
      </h2>

      <div role="note" className="flex gap-3 rounded-xl border border-mist-200 bg-mist-50 p-4 sm:p-5">
        <Info className="w-5 h-5 shrink-0 text-brand-700 mt-0.5" aria-hidden="true" />
        <div className="space-y-2 text-sm">
          <p className="font-bold text-mist-900">{t.contactUnavailableTitle}</p>
          <p className="text-mist-700 leading-relaxed">{t.contactUnavailableBody}</p>
          <Link
            href="/government/local-officials-directory#offices"
            className="inline-flex items-center gap-1 font-semibold text-brand-800 hover:text-brand-950 underline underline-offset-2 decoration-brand-300"
          >
            {t.contactFindOffice}
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      <p className="flex items-center gap-2 text-sm text-mist-700">
        <Phone className="w-4 h-4 shrink-0 text-brand-700" aria-hidden="true" />
        <span>
          {t.emergencyCall911}{' '}
          <a href="tel:911" className="font-bold text-brand-800 hover:text-brand-950 font-mono-tabular">
            911
          </a>
        </span>
      </p>
    </section>
  );
}
