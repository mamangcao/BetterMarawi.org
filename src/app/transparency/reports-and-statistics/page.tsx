import React from 'react';
import { Metadata } from 'next';
import { AuditSummary, NationalFunding, TransparencySidebar } from '@/components/transparency';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbSchema } from '@/lib/jsonld';
import { buildMetadata, getRouteBreadcrumbs } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Audit Report & National Funding for Marawi City | BetterMarawi.org',
  description:
    'What the Commission on Audit found in Marawi City’s FY2020 accounts, and the national funds released to the city: support-fund projects and DBM cash and allotment releases.',
  path: '/transparency/reports-and-statistics',
});

export default function ReportsAndStatisticsPage() {
  const breadcrumbs = getRouteBreadcrumbs('/transparency/reports-and-statistics');

  return (
    <main className="pb-16">
      <Breadcrumbs items={breadcrumbs} />

      <section className="bg-gradient-to-b from-surface-card to-surface border-b border-mist-200/90 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-800 mb-2">
            Audit &amp; National Funding
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-mist-950 font-display">
            Reports &amp; Governance Performance Statistics
          </h1>
          <p className="mt-3 text-base text-mist-700 max-w-3xl leading-relaxed">
            The latest Commission on Audit (COA) findings on the city’s accounts, and national funds released to the Islamic City of Marawi, each linked to the official document.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-8 min-w-0">
            <AuditSummary />
            <NationalFunding />
          </div>
          <TransparencySidebar />
        </div>
      </div>

      <JsonLd data={buildBreadcrumbSchema(breadcrumbs)} />
    </main>
  );
}
