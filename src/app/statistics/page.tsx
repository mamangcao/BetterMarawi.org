import React from 'react';
import { Metadata } from 'next';
import { DemographicsBlock, StatisticsSidebar } from '@/components/statistics';
import { UnverifiedNotice } from '@/components/ui';
import { cityProfileVerification } from '@/lib/verification';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbSchema } from '@/lib/jsonld';
import { buildMetadata, getRouteBreadcrumbs } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Marawi City Statistics, Census & Competitiveness Data | BetterMarawi.org',
  description:
    'Official demographic, geographic, DTI CMCI competitiveness, and 101-barangay census statistics for the Islamic City of Marawi, Lanao del Sur.',
  path: '/statistics',
});

export default function StatisticsOverviewPage() {
  const breadcrumbs = getRouteBreadcrumbs('/statistics');

  return (
    <main className="pb-16">
      <Breadcrumbs items={breadcrumbs} />

      <section className="bg-gradient-to-b from-surface-card to-surface border-b border-stone-200/90 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-800 mb-2">
            Statistics &amp; Open Civic Data
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-950 font-display">
            Marawi City Demographics &amp; Data Portal
          </h1>
          <p className="mt-3 text-base text-stone-700 max-w-3xl leading-relaxed">
            Official demographic, geographic, DTI CMCI competitiveness, and 101-barangay census statistics for the Islamic City of Marawi, Lanao del Sur.
          </p>
          <UnverifiedNotice items={[cityProfileVerification]} className="mt-6" />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8">
            <DemographicsBlock />
          </div>
          <StatisticsSidebar />
        </div>
      </div>

      <JsonLd data={buildBreadcrumbSchema(breadcrumbs)} />
    </main>
  );
}
