import React from 'react';
import { Metadata } from 'next';
import { MARAWI_BARANGAYS } from '@/data/barangays';
import { UnverifiedNotice } from '@/components/ui';
import { BarangayTable, StatisticsSidebar } from '@/components/statistics';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbSchema } from '@/lib/jsonld';
import { buildMetadata, getRouteBreadcrumbs } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'All 101 Barangays Directory & Census Data — Marawi City | BetterMarawi.org',
  description:
    'PSGC-indexed directory of all 101 Barangays of the Islamic City of Marawi, with PSA codes, Urban/Rural classification, and 2024 POPCEN population.',
  path: '/statistics/barangay-data',
});

export default function BarangayDataPage() {
  const breadcrumbs = getRouteBreadcrumbs('/statistics/barangay-data');

  return (
    <main className="pb-16">
      <Breadcrumbs items={breadcrumbs} />

      <section className="bg-gradient-to-b from-surface-card to-surface border-b border-mist-200/90 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-800 mb-2">
            PSGC 1903617000 · Complete Administrative Directory
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-mist-950 font-display">
            All 101 Barangays Directory &amp; Census Data
          </h1>
          <p className="mt-3 text-base text-mist-700 max-w-3xl leading-relaxed">
            Search and filter all 101 official Barangays of the Islamic City of Marawi by name, PSGC code, and Urban/Rural classification, with 2024 POPCEN population.
          </p>
          <UnverifiedNotice items={MARAWI_BARANGAYS} className="mt-6" />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8">
            <BarangayTable barangays={MARAWI_BARANGAYS} />
          </div>
          <StatisticsSidebar />
        </div>
      </div>

      <JsonLd data={buildBreadcrumbSchema(breadcrumbs)} />
    </main>
  );
}

