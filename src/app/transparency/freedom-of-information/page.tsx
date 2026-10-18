import React from 'react';
import { Metadata } from 'next';
import { FOIRequestForm, TransparencySidebar } from '@/components/transparency';
import { ServiceFAQ } from '@/components/services';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbSchema, buildFAQSchema } from '@/lib/jsonld';
import { buildMetadata, getRouteBreadcrumbs } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Freedom of Information (FOI) Citizen Request Guide | BetterMarawi.org',
  description:
    'File a standard or electronic Freedom of Information (FOI) request for public records, ordinances, and financial datasets of the Islamic City of Marawi.',
  path: '/transparency/freedom-of-information',
});

const faqs = [
  {
    question: 'How long does it take to process a Freedom of Information (FOI) request in Marawi City?',
    answer:
      'Under the Marawi City People’s FOI Ordinance, the Public Information Office (PIO) and Records Officer must respond to and release requested public documents within fifteen (15) working days from receipt.',
  },
  {
    question: 'Is there a fee to file an FOI request?',
    answer:
      'Filing an FOI request and receiving digital copies via email is 100% free of charge. Minimal reproduction costs apply only if you request certified printed copies exceeding 20 pages.',
  },
];

export default function FreedomOfInformationPage() {
  const breadcrumbs = getRouteBreadcrumbs('/transparency/freedom-of-information');

  return (
    <main className="pb-16">
      <Breadcrumbs items={breadcrumbs} />

      <section className="bg-gradient-to-b from-[#F5F1EA] to-[#FAF8F5] border-b border-stone-200/90 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-800 mb-2">
            City Ordinance No. 2024-027 · Open Governance
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-950 font-display">
            Freedom of Information (FOI) Citizen Portal
          </h1>
          <p className="mt-3 text-base text-stone-700 max-w-3xl leading-relaxed">
            Every Filipino citizen has the right to access official records, public contracts, and government research data held by the City Government of Marawi.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-8">
            <FOIRequestForm />
            <ServiceFAQ faqs={faqs} />
          </div>
          <TransparencySidebar />
        </div>
      </div>

      <JsonLd data={buildBreadcrumbSchema(breadcrumbs)} />
      <JsonLd data={buildFAQSchema(faqs)} />
    </main>
  );
}

