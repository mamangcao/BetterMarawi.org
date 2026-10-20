'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQItem } from '@/types';
import { useTranslation } from '@/i18n';

interface ServiceFAQProps {
  faqs: FAQItem[];
}

export function ServiceFAQ({ faqs }: ServiceFAQProps) {
  const { t } = useTranslation();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  if (!faqs || faqs.length === 0) return null;

  return (
    <section
      aria-labelledby="faq-heading"
      className="bg-white rounded-xl border border-stone-200/90 p-6 sm:p-8"
    >
      <div className="pb-4 mb-5 border-b border-stone-100">
        <h2
          id="faq-heading"
          className="text-xl font-bold text-stone-900 font-display"
        >
          {t.faqHeading}
        </h2>
        <p className="text-xs text-stone-500 mt-0.5">
          {t.faqSubheading}
        </p>
      </div>
      <div className="divide-y divide-stone-200/80">
        {faqs.map((faq, idx) => {
          const isOpen = openFaq === idx;
          return (
            <div key={idx} className="py-4 first:pt-0 last:pb-0">
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpenFaq(isOpen ? null : idx)}
                className="w-full flex items-center justify-between gap-4 text-left font-bold text-stone-900 hover:text-emerald-900 text-base"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-stone-500 shrink-0 transition-transform ${
                    isOpen ? 'rotate-180 text-emerald-800' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <p className="mt-3 text-sm text-stone-600 leading-relaxed">
                  {faq.answer}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

