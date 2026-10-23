import React from 'react';
import { Metadata } from 'next';
import { FDP_DOCUMENTS } from '@/data/fdp';
import { FDPTable, TransparencySidebar } from '@/components/transparency';
import { ServiceFAQ } from '@/components/services';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbSchema, buildFAQSchema } from '@/lib/jsonld';
import { UnverifiedNotice } from '@/components/ui';
import { buildMetadata, getRouteBreadcrumbs } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Full Disclosure Policy (FDP) Documents of Marawi City | BetterMarawi.org',
  description:
    'What the DILG Full Disclosure Policy requires local governments to publish, and where Marawi City’s budget, financial, and procurement reports will be listed once linked to official postings.',
  path: '/transparency/full-disclosure-policy',
});

const faqs = [
  {
    question: 'What is the DILG Full Disclosure Policy (FDP)?',
    answer:
      'The Full Disclosure Policy of the Department of the Interior and Local Government (DILG) requires provinces, cities, and municipalities to post specified financial documents, such as budget, financial, and procurement reports, in at least three conspicuous public places and on the online FDP Portal (fdpp.dilg.gov.ph). The current guidelines are in DILG Memorandum Circular No. 2024-021.',
  },
];

export default function FullDisclosurePolicyPage() {
  const breadcrumbs = getRouteBreadcrumbs('/transparency/full-disclosure-policy');

  return (
    <main className="pb-16">
      <Breadcrumbs items={breadcrumbs} />

      <section className="bg-gradient-to-b from-surface-card to-surface border-b border-mist-200/90 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-800 mb-2">
            DILG Full Disclosure Policy
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-mist-950 font-display">
            Full Disclosure Policy (FDP) Documents
          </h1>
          <p className="mt-3 text-base text-mist-700 max-w-3xl leading-relaxed">
            Under the DILG Full Disclosure Policy, local governments post their budget, financial, and procurement reports in public places and on the DILG FDP Portal. Marawi City’s documents will be listed here once each one is linked to its official posting.
          </p>
          {FDP_DOCUMENTS.length > 0 && <UnverifiedNotice items={FDP_DOCUMENTS} className="mt-6" />}
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

