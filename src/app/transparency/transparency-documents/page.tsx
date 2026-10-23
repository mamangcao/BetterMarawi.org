import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { FDP_DOCUMENTS, FDP_YEAR } from '@/data/fdp';
import { FDPTable, TransparencySidebar } from '@/components/transparency';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbSchema } from '@/lib/jsonld';
import { buildMetadata, getRouteBreadcrumbs } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Procurement Plans & Bid Results of Marawi City | BetterMarawi.org',
  description:
    'Marawi City’s Annual Procurement Plan and quarterly bid results for civil works, goods, and services, as posted on the DILG Full Disclosure Policy Portal.',
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
            Marawi City’s procurement plans and bid results, as posted on the DILG Full Disclosure Policy Portal. For the city’s other financial reports, see the{' '}
            <Link href="/transparency/full-disclosure-policy" className="font-semibold text-brand-800 underline underline-offset-2 hover:text-brand-950">
              Full Disclosure Policy documents
            </Link>
            ; for the COA audit, see{' '}
            <Link href="/transparency/reports-and-statistics" className="font-semibold text-brand-800 underline underline-offset-2 hover:text-brand-950">
              Reports
            </Link>
            .
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8">
            <FDPTable documents={FDP_DOCUMENTS.filter((d) => d.procurement)} year={FDP_YEAR} heading="Procurement documents" />
          </div>
          <TransparencySidebar />
        </div>
      </div>

      <JsonLd data={buildBreadcrumbSchema(breadcrumbs)} />
    </main>
  );
}

