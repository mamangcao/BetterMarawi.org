import React from 'react';
import { Metadata } from 'next';
import { DocumentsList, TransparencySidebar } from '@/components/transparency';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbSchema } from '@/lib/jsonld';
import { buildMetadata, getRouteBreadcrumbs } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'LGU Reports, Performance Metrics & SGLG Scorecard | BetterMarawi.org',
  description:
    'Review quarterly accomplishment reports, fiscal collection efficiency, and Seal of Good Local Governance (SGLG) indicators for the Islamic City of Marawi.',
  path: '/transparency/reports-and-statistics',
});

export default function ReportsAndStatisticsPage() {
  const breadcrumbs = getRouteBreadcrumbs('/transparency/reports-and-statistics');

  return (
    <main className="pb-16">
      <Breadcrumbs items={breadcrumbs} />

      <section className="bg-gradient-to-b from-surface-card to-surface border-b border-stone-200/90 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-800 mb-2">
            Seal of Good Local Governance (SGLG) Indicators
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-950 font-display">
            Reports &amp; Governance Performance Statistics
          </h1>
          <p className="mt-3 text-base text-stone-700 max-w-3xl leading-relaxed">
            Review quarterly accomplishment reports, fiscal collection efficiency, and Seal of Good Local Governance (SGLG) indicators for the Islamic City of Marawi.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8">
            <DocumentsList />
          </div>
          <TransparencySidebar />
        </div>
      </div>

      <JsonLd data={buildBreadcrumbSchema(breadcrumbs)} />
    </main>
  );
}

