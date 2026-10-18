import React from 'react';
import { Metadata } from 'next';
import { SERVICES_DATA } from '@/data/services';
import { ServiceGrid } from '@/components/services';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbSchema } from '@/lib/jsonld';
import { buildMetadata, getRouteBreadcrumbs } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'All 11 Citizen Services & Information Directory | BetterMarawi.org',
  description:
    'Browse all 11 official local government services in the Islamic City of Marawi: Health, Education, Business Permits, Social Welfare, Agriculture, Environment, and Housing.',
  path: '/services',
});

export default function ServicesPage() {
  const breadcrumbs = getRouteBreadcrumbs('/services');

  return (
    <main className="pb-16">
      <Breadcrumbs items={breadcrumbs} />

      <section className="bg-gradient-to-b from-[#F5F1EA] to-[#FAF8F5] border-b border-stone-200/90 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-800 mb-2">
            Citizen&apos;s Charter Directory
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-950 font-display">
            All 11 Citizen Services &amp; Information
          </h1>
          <p className="mt-3 text-base text-stone-700 max-w-2xl">
            Select any service below to open its dedicated Citizen&apos;s Charter page with documentary requirements, step-by-step procedures, fee tables, and responsible offices.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <ServiceGrid services={SERVICES_DATA} />
      </section>

      <JsonLd data={buildBreadcrumbSchema(breadcrumbs)} />
    </main>
  );
}

