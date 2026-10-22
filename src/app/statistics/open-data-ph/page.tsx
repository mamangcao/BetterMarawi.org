import React from 'react';
import { Metadata } from 'next';
import { MARAWI_BARANGAYS } from '@/data/barangays';
import { budgetVerification } from '@/data/budget';
import { ORDINANCES_LIST } from '@/data/ordinances';
import { UnverifiedNotice } from '@/components/ui';
import { OpenDataDownloads, StatisticsSidebar } from '@/components/statistics';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbSchema } from '@/lib/jsonld';
import { buildMetadata, getRouteBreadcrumbs } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Open Data PH — Downloadable Marawi Civic Datasets (CSV/JSON) | BetterMarawi.org',
  description:
    'Download open, machine-readable CSV and JSON datasets for Marawi City population census, annual budget, health facilities, and business registrations.',
  path: '/statistics/open-data-ph',
});

export default function OpenDataPage() {
  const breadcrumbs = getRouteBreadcrumbs('/statistics/open-data-ph');
  const datasetsVerification = [...MARAWI_BARANGAYS, budgetVerification, ...ORDINANCES_LIST];

  return (
    <main className="pb-16">
      <Breadcrumbs items={breadcrumbs} />

      <section className="bg-gradient-to-b from-surface-card to-surface border-b border-mist-200/90 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-800 mb-2">
            Open Civic Data Standard · CSV &amp; JSON Exports
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-mist-950 font-display">
            Open Data PH — Machine-Readable Marawi Datasets
          </h1>
          <p className="mt-3 text-base text-mist-700 max-w-3xl leading-relaxed">
            Download clean, unencumbered, machine-readable CSV and JSON datasets for academic research, civic applications, and public policy analysis.
          </p>
          <UnverifiedNotice items={datasetsVerification} className="mt-6" />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8">
            <OpenDataDownloads />
          </div>
          <StatisticsSidebar />
        </div>
      </div>

      <JsonLd data={buildBreadcrumbSchema(breadcrumbs)} />
    </main>
  );
}
