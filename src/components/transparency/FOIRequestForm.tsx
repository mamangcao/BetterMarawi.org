'use client';

import React from 'react';
import { Info } from 'lucide-react';
import { useTranslation } from '@/i18n';

/**
 * FOI guidance. This community-run site cannot receive or forward requests, so instead of a
 * form that sends nothing it explains that and lists what a request should include.
 * Add a form back only when there is a real, confirmed channel behind it.
 */
export function FOIRequestForm() {
  const { t } = useTranslation();
  const checklist = [t.foiChecklistName, t.foiChecklistDocument, t.foiChecklistPurpose];

  return (
    <div className="space-y-8">
      <section
        aria-labelledby="foi-panel-heading"
        className="bg-white rounded-xl border border-mist-200/90 p-6 sm:p-8 space-y-5"
      >
        <h2
          id="foi-panel-heading"
          className="text-xl font-bold text-mist-900 font-display pb-3 border-b border-mist-100"
        >
          {t.foiHeading}
        </h2>

        <div role="note" className="flex gap-3 rounded-xl border border-mist-200 bg-mist-50 p-4 sm:p-5">
          <Info className="w-5 h-5 shrink-0 text-brand-700 mt-0.5" aria-hidden="true" />
          <div className="space-y-2 text-sm">
            <p className="font-bold text-mist-900">{t.foiUnavailableTitle}</p>
            <p className="text-mist-700 leading-relaxed">{t.foiUnavailableBody}</p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-mist-900">{t.foiChecklistHeading}</h3>
          <ul className="mt-2 space-y-1.5 text-sm text-mist-700 list-disc pl-5">
            {checklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
