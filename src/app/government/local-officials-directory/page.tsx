import React from 'react';
import { Metadata } from 'next';
import { ELECTED_OFFICIALS } from '@/data/officials';
import { OfficialsGrid, GovernmentSidebar } from '@/components/government';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbSchema } from '@/lib/jsonld';
import { UnverifiedNotice } from '@/components/ui';
import { buildMetadata, getRouteBreadcrumbs } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Local Officials Directory (2025–2028 Elected Leadership) | BetterMarawi.org',
  description:
    'Directory of Elected City Mayor Hon. Shariff Zain Lanto Gandamra, Vice Mayor Hon. Majul Usman Gandamra, City Councilors, and Ex-Officio Sectoral Representatives.',
  path: '/government/local-officials-directory',
});

export default function LocalOfficialsPage() {
  const breadcrumbs = getRouteBreadcrumbs('/government/local-officials-directory');

  return (
    <main className="pb-16">
      <Breadcrumbs items={breadcrumbs} />

      <section className="bg-gradient-to-b from-surface-card to-surface border-b border-mist-200/90 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-800 mb-2">
            Elected &amp; Ex-Officio Leadership
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-mist-950 font-display">
            Local Officials Directory (2025–2028)
          </h1>
          <p className="mt-3 text-base text-mist-700 max-w-3xl leading-relaxed">
            Official directory of the Elected City Mayor, City Vice Mayor, Sangguniang Panlungsod Members, and Ex-Officio Sectoral Representatives serving the 101 barangays of Marawi City.
          </p>
          <UnverifiedNotice items={ELECTED_OFFICIALS} className="mt-6" />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8">
            <OfficialsGrid officials={ELECTED_OFFICIALS} />
          </div>
          <GovernmentSidebar />
        </div>
      </div>

      <JsonLd data={buildBreadcrumbSchema(breadcrumbs)} />
    </main>
  );
}

