import React from 'react';
import { Metadata } from 'next';
import { ORDINANCES_LIST } from '@/data/ordinances';
import { OrdinancesTable, CommitteesList, GovernmentSidebar, OrdinanceProcess } from '@/components/government';
import { ServiceFAQ } from '@/components/services';
import { ORDINANCE_FAQS } from '@/data/ordinanceGuide';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbSchema, buildFAQSchema } from '@/lib/jsonld';
import { UnverifiedNotice } from '@/components/ui';
import { buildMetadata, getRouteBreadcrumbs } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Sangguniang Panlungsod (City Council) of Marawi | BetterMarawi.org',
  description:
    'What the Sangguniang Panlungsod of Marawi City does, how an ordinance becomes law under the Bangsamoro Local Governance Code, and the council’s standing committees.',
  path: '/government/legislative',
});

export default function LegislativePage() {
  const breadcrumbs = getRouteBreadcrumbs('/government/legislative');

  return (
    <main className="pb-16">
      <Breadcrumbs items={breadcrumbs} />

      <section className="bg-gradient-to-b from-surface-card to-surface border-b border-mist-200/90 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-800 mb-2">
            Legislative Branch · City Council of Marawi
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-mist-950 font-display">
            Sangguniang Panlungsod (Legislative)
          </h1>
          <p className="mt-3 text-base text-mist-700 max-w-3xl leading-relaxed">
            The legislative body of the Islamic City of Marawi presided over by the City Vice Mayor — responsible for enacting ordinances, approving resolutions, and appropriating city funds.
          </p>
          <UnverifiedNotice items={ORDINANCES_LIST} className="mt-6" />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-8">
            <OrdinancesTable ordinances={ORDINANCES_LIST} />
            <OrdinanceProcess />
            <CommitteesList />
            <ServiceFAQ faqs={ORDINANCE_FAQS} />
          </div>
          <GovernmentSidebar />
        </div>
      </div>

      <JsonLd data={buildBreadcrumbSchema(breadcrumbs)} />
      <JsonLd data={buildFAQSchema(ORDINANCE_FAQS)} />
    </main>
  );
}

