import React from 'react';
import { Metadata } from 'next';
import { FDP_DOCUMENTS } from '@/data/fdp';
import { FDPTable, TransparencySidebar } from '@/components/transparency';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbSchema } from '@/lib/jsonld';
import { UnverifiedNotice } from '@/components/ui';
import { buildMetadata, getRouteBreadcrumbs } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Transparency Documents, Bids & COA Audit Reports | BetterMarawi.org',
  description:
    'Browse official Bids and Awards Committee (BAC) notices, Annual Procurement Plan (APP), Executive Orders, and COA audit compliance records.',
  path: '/transparency/transparency-documents',
});

export default function TransparencyDocumentsPage() {
  const breadcrumbs = getRouteBreadcrumbs('/transparency/transparency-documents');

  return (
    <main className="pb-16">
      <Breadcrumbs items={breadcrumbs} />

      <section className="bg-gradient-to-b from-surface-card to-surface border-b border-mist-200/90 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-800 mb-2">
            RA 9184 Government Procurement Reform Act
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-mist-950 font-display">
            Transparency Documents &amp; Procurement Archive
          </h1>
          <p className="mt-3 text-base text-mist-700 max-w-3xl leading-relaxed">
            Browse official Bids and Awards Committee (BAC) notices, Annual Procurement Plan (APP), Executive Orders, and Commission on Audit (COA) audit compliance records.
          </p>
          <UnverifiedNotice items={FDP_DOCUMENTS} className="mt-6" />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8">
            <FDPTable documents={FDP_DOCUMENTS} />
          </div>
          <TransparencySidebar />
        </div>
      </div>

      <JsonLd data={buildBreadcrumbSchema(breadcrumbs)} />
    </main>
  );
}

