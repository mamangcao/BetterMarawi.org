import React from 'react';
import { Metadata } from 'next';
import { cmciVerification } from '@/data/cmci';
import { UnverifiedNotice } from '@/components/ui';
import { CMCICard, StatisticsSidebar } from '@/components/statistics';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbSchema } from '@/lib/jsonld';
import { buildMetadata, getRouteBreadcrumbs } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'DTI CMCI Competitiveness Profile — Marawi City | BetterMarawi.org',
  description:
    'Cities and Municipalities Competitiveness Index (CMCI) scores for Marawi City across Economic Dynamism, Government Efficiency, Infrastructure, Resiliency, and Innovation.',
  path: '/statistics/dti-cmci-profile',
});

export default function CMCIPage() {
  const breadcrumbs = getRouteBreadcrumbs('/statistics/dti-cmci-profile');

  return (
    <main className="pb-16">
      <Breadcrumbs items={breadcrumbs} />

      <section className="bg-gradient-to-b from-surface-card to-surface border-b border-stone-200/90 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-800 mb-2">
            Cities and Municipalities Competitiveness Index
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-950 font-display">
            DTI CMCI Competitiveness Profile
          </h1>
          <p className="mt-3 text-base text-stone-700 max-w-3xl leading-relaxed">
            Annual competitiveness performance of the Islamic City of Marawi evaluated across the five DTI CMCI pillars: Economic Dynamism, Government Efficiency, Infrastructure, Resiliency, and Innovation.
          </p>
          <UnverifiedNotice items={[cmciVerification]} className="mt-6" />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8">
            <CMCICard />
          </div>
          <StatisticsSidebar />
        </div>
      </div>

      <JsonLd data={buildBreadcrumbSchema(breadcrumbs)} />
    </main>
  );
}

