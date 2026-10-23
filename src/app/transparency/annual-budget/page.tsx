import React from 'react';
import { Metadata } from 'next';
import { budgetVerification } from '@/data/budget';
import { UnverifiedNotice } from '@/components/ui';
import { BudgetChart, TransparencySidebar } from '@/components/transparency';
import { ServiceFAQ } from '@/components/services';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbSchema } from '@/lib/jsonld';
import { buildMetadata, getRouteBreadcrumbs } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'FY 2026 Annual Budget & Sectoral Allocations | BetterMarawi.org',
  description:
    'How the FY 2026 budget of the Islamic City of Marawi is divided by sector and fund source. The figures shown have not yet been verified against the appropriation ordinance.',
  path: '/transparency/annual-budget',
});

// Not published as FAQ structured data: the figures are unverified (see docs/AUDIT_STATUS.md).
const faqs = [
  {
    question: 'How is the FY 2026 Annual Budget of Marawi City funded?',
    answer:
      'The ₱1,845,200,000 FY 2026 Annual Budget is funded through the National Tax Allotment (NTA) share of ₱1,692,400,000 (91.7%) and Local Revenue Sources (Real Property Tax, Business Tax, Fees & Economic Enterprises) totaling ₱152,800,000 (8.3%).',
  },
];

export default function AnnualBudgetPage() {
  const breadcrumbs = getRouteBreadcrumbs('/transparency/annual-budget');

  return (
    <main className="pb-16">
      <Breadcrumbs items={breadcrumbs} />

      <section className="bg-gradient-to-b from-surface-card to-surface border-b border-mist-200/90 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-800 mb-2">
            City Budget · Figures Not Yet Verified
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-mist-950 font-display">
            FY 2026 Annual Budget (₱1.845 Billion)
          </h1>
          <p className="mt-3 text-base text-mist-700 max-w-3xl leading-relaxed">
            Comprehensive breakdown of how public funds of the Islamic City of Marawi are allocated across Social Services, Economic Development, Infrastructure, and Disaster Risk Reduction.
          </p>
          <UnverifiedNotice items={[budgetVerification]} className="mt-6" />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-8">
            <BudgetChart />
            <ServiceFAQ faqs={faqs} />
          </div>
          <TransparencySidebar />
        </div>
      </div>

      <JsonLd data={buildBreadcrumbSchema(breadcrumbs)} />
    </main>
  );
}

