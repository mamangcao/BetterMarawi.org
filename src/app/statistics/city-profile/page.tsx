import React from 'react';
import { Metadata } from 'next';
import { cityProfileVerification } from '@/lib/verification';
import { UnverifiedNotice } from '@/components/ui';
import { DemographicsBlock, StatisticsSidebar } from '@/components/statistics';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbSchema } from '@/lib/jsonld';
import { buildMetadata, getRouteBreadcrumbs } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Marawi City Profile — Geography, Demographics & Highland Climate | BetterMarawi.org',
  description:
    'Detailed socio-economic and geographic profile of the Islamic City of Marawi: 259,993 residents (2024 POPCEN), 101 barangays, 3rd class component city, 87.55 km² land area at 700m elevation overlooking Lake Lanao.',
  path: '/statistics/city-profile',
});

export default function CityProfilePage() {
  const breadcrumbs = getRouteBreadcrumbs('/statistics/city-profile');

  return (
    <main className="pb-16">
      <Breadcrumbs items={breadcrumbs} />

      <section className="bg-gradient-to-b from-surface-card to-surface border-b border-stone-200/90 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-800 mb-2">
            Capital of Lanao del Sur · BARMM
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-950 font-display">
            Marawi City Socio-Economic &amp; Geographic Profile
          </h1>
          <p className="mt-3 text-base text-stone-700 max-w-3xl leading-relaxed">
            Comprehensive demographic, territorial, climatic, and economic baseline of the Islamic City of Marawi — located at ~700 meters above sea level along the northern shores of ancient Lake Lanao.
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

