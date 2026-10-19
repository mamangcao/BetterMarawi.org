import React from 'react';
import { Metadata } from 'next';
import { FDP_DOCUMENTS } from '@/data/fdp';
import { FDPTable, TransparencySidebar } from '@/components/transparency';
import { ServiceFAQ } from '@/components/services';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbSchema, buildFAQSchema } from '@/lib/jsonld';
import { buildMetadata, getRouteBreadcrumbs } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Full Disclosure Policy (FDP) Compliance Documents | BetterMarawi.org',
  description:
    'View DILG-mandated quarterly financial disclosures, Statement of Receipts and Expenditures (SRE), 20% NTA utilization, and LDRRMF reports of Marawi City.',
  path: '/transparency/full-disclosure-policy',
});

const faqs = [
  {
    question: 'What is the DILG Full Disclosure Policy (FDP)?',
    answer:
      'Pursuant to DILG Memorandum Circular No. 2013-140 and the General Appropriations Act, local government units are required to post 14 key financial documents, budget reports, and procurement results in three conspicuous public places and on the online FDP portal.',
  },
  {
    question: 'Where are the physical Full Disclosure Policy boards located in Marawi City?',
    answer:
      'Physical FDP bulletin boards are maintained at the Ground Floor Lobby of Marawi City Hall, the New Marawi Grand Padian Entrance, and the Mindanao State University (MSU) Commercial Center.',
  },
];

export default function FullDisclosurePolicyPage() {
  const breadcrumbs = getRouteBreadcrumbs('/transparency/full-disclosure-policy');

  return (
    <main className="pb-16">
      <Breadcrumbs items={breadcrumbs} />

      <section className="bg-gradient-to-b from-surface-card to-surface border-b border-stone-200/90 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-800 mb-2">
            DILG MC No. 2013-140 · 100% Compliant
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-950 font-display">
            Full Disclosure Policy (FDP) Compliance Documents
          </h1>
          <p className="mt-3 text-base text-stone-700 max-w-3xl leading-relaxed">
            View DILG-mandated quarterly financial disclosures, Statement of Receipts and Expenditures (SRE), 20% NTA utilization, and LDRRMF reports of Marawi City.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-8">
            <FDPTable documents={FDP_DOCUMENTS} />
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

