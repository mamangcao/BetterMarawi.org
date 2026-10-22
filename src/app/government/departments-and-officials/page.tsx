import React from 'react';
import { Metadata } from 'next';
import { CITY_DEPARTMENTS } from '@/data/departments';
import { DepartmentsList, GovernmentSidebar } from '@/components/government';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbSchema } from '@/lib/jsonld';
import { UnverifiedNotice } from '@/components/ui';
import { buildMetadata, getRouteBreadcrumbs } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Departments & Officials Directory — Marawi City Hall | BetterMarawi.org',
  description:
    'Complete directory of Marawi City LGU departments, department heads, mandates, service windows, hotlines, and office locations.',
  path: '/government/departments-and-officials',
});

export default function DepartmentsPage() {
  const breadcrumbs = getRouteBreadcrumbs('/government/departments-and-officials');

  return (
    <main className="pb-16">
      <Breadcrumbs items={breadcrumbs} />

      <section className="bg-gradient-to-b from-surface-card to-surface border-b border-mist-200/90 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-800 mb-2">
            Executive Branch · Islamic City of Marawi
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-mist-950 font-display">
            Departments &amp; Officials Directory
          </h1>
          <p className="mt-3 text-base text-mist-700 max-w-3xl leading-relaxed">
            Explore local government departments, offices, department heads, mandates, frontline services, and direct contact numbers at Marawi City Hall.
          </p>
          <UnverifiedNotice items={CITY_DEPARTMENTS} className="mt-6" />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8">
            <DepartmentsList departments={CITY_DEPARTMENTS} />
          </div>
          <GovernmentSidebar />
        </div>
      </div>

      <JsonLd data={buildBreadcrumbSchema(breadcrumbs)} />
    </main>
  );
}

