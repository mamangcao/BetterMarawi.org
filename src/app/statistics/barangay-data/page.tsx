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
  title: 'All 96 Barangays Directory & Census Data — Marawi City | BetterMarawi.org',
  description:
    'Complete PSGC-indexed census directory of all 96 Barangays of the Islamic City of Marawi, including population counts, household data, and district clusters.',
  path: '/statistics/barangay-data',
});

export default function BarangayDataPage() {
  const breadcrumbs = getRouteBreadcrumbs('/statistics/barangay-data');

  return (
    <main className="pb-16">
      <Breadcrumbs items={breadcrumbs} />

      <section className="bg-gradient-to-b from-surface-card to-surface border-b border-stone-200/90 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-800 mb-2">
            PSGC 153617000 · Complete Administrative Directory
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-950 font-display">
            All 96 Barangays Directory &amp; Census Data
          </h1>
          <p className="mt-3 text-base text-stone-700 max-w-3xl leading-relaxed">
            Search and filter all 96 official Barangays of the Islamic City of Marawi by district sector, PSGC code, 2020 PSA Census, and latest 259,993 population distribution.
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

