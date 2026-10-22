import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ScrollText } from 'lucide-react';
import { SERVICES_DATA } from '@/data/services';
import { ServiceGrid } from '@/components/services';
import { ArrowUpRight, UnverifiedNotice } from '@/components/ui';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbSchema } from '@/lib/jsonld';
import { buildMetadata, getRouteBreadcrumbs } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'All 12 Citizen Services & Information Directory | BetterMarawi.org',
  description:
    'Browse all 12 official local government services in the Islamic City of Marawi: Certificates and Clearances, Health, Education, Business Permits, Social Welfare, Agriculture, Environment, and Housing.',
  path: '/services',
});

export default function ServicesPage() {
  const breadcrumbs = getRouteBreadcrumbs('/services');

  return (
    <main className="pb-16">
      <Breadcrumbs items={breadcrumbs} />

      <section className="bg-gradient-to-b from-surface-card to-surface border-b border-mist-200/90 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-800 mb-2">
            Citizen&apos;s Charter Directory
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-mist-950 font-display">
            All 12 Citizen Services &amp; Information
          </h1>
          <p className="mt-3 text-base text-mist-700 max-w-2xl">
            Select any service below to open its dedicated Citizen&apos;s Charter page with documentary requirements, step-by-step procedures, fee tables, and responsible offices.
          </p>
          <UnverifiedNotice items={SERVICES_DATA} className="mt-6" />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-6">
        <Link
          href="/services/certificates"
          className="group flex items-center gap-4 rounded-xl bg-brand-900 p-5 sm:p-6 text-white hover:bg-brand-950 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
        >
          <ScrollText className="w-8 h-8 shrink-0 text-accent" aria-hidden="true" />
          <div className="min-w-0 flex-1">
            <p className="text-lg font-bold">Certificates &amp; Clearances</p>
            <p className="text-sm text-brand-100">
              Birth, marriage, and death certificates, CENOMAR, barangay, police, and NBI clearances, cedula, and more:
              fees, offices, and step-by-step guides.
            </p>
          </div>
          <ArrowUpRight className="w-5 h-5 shrink-0 text-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
        <ServiceGrid services={SERVICES_DATA} />
      </section>

      <JsonLd data={buildBreadcrumbSchema(breadcrumbs)} />
    </main>
  );
}
