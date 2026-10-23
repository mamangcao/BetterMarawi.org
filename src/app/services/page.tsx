import React from 'react';
import { Metadata } from 'next';
import { SERVICES_DATA } from '@/data/services';
import { ServiceGrid } from '@/components/services';
import { SERVICE_CARDS } from '@/data/serviceCatalog';
import { UnverifiedNotice } from '@/components/ui';
import { PageHeader } from '@/components/ui/PageHeader';
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

      <PageHeader
        eyebrow="Citizen's Charter Directory"
        title="All 12 Citizen Services & Information"
        intro="Select any service below to open its dedicated Citizen's Charter page with documentary requirements, step-by-step procedures, fee tables, and responsible offices."
      >
        <UnverifiedNotice items={SERVICES_DATA} className="mt-6" />
      </PageHeader>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <ServiceGrid cards={SERVICE_CARDS} />
      </section>

      <JsonLd data={buildBreadcrumbSchema(breadcrumbs)} />
    </main>
  );
}
