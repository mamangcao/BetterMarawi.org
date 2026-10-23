import React from 'react';
import { Metadata } from 'next';
import { FDP_DOCUMENTS, FDP_YEAR } from '@/data/fdp';
import { FINANCE_ACTUALS } from '@/data/finances';
import { ArrowUpRight } from '@/components/ui';
import { FinancesOverview, SpecialFunds, TransparencySidebar } from '@/components/transparency';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbSchema } from '@/lib/jsonld';
import { buildMetadata, getRouteBreadcrumbs } from '@/lib/seo';

const FIRST = FINANCE_ACTUALS[0].year;
const LAST = FINANCE_ACTUALS[FINANCE_ACTUALS.length - 1].year;

export const metadata: Metadata = buildMetadata({
  title: `Marawi City Finances ${FIRST}–${LAST} and Annual Budget | BetterMarawi.org`,
  description: `How the City of Marawi raised and spent public money from ${FIRST} to ${LAST}, by year and by sector, plus its disaster and education funds, from Bureau of Local Government Finance records.`,
  path: '/transparency/annual-budget',
});

/** The city's own Annual Budget Report for the current year, on the DILG portal */
const budgetReport = FDP_DOCUMENTS.find((d) => d.filterId === 1)?.files[0];

export default function AnnualBudgetPage() {
  const breadcrumbs = getRouteBreadcrumbs('/transparency/annual-budget');

  return (
    <main className="pb-16">
      <Breadcrumbs items={breadcrumbs} />

      <section className="bg-gradient-to-b from-surface-card to-surface border-b border-mist-200/90 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-800 mb-2">
            City Budget · BLGF Records
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-mist-950 font-display">
            Annual Budget and City Finances
          </h1>
          <p className="mt-3 text-base text-mist-700 max-w-3xl leading-relaxed">
            How the Islamic City of Marawi raised and spent public money from {FIRST} to {LAST}, as recorded by the Bureau of Local Government Finance (BLGF). These are actual results, not the planned budget.
          </p>
          {budgetReport && (
            <p className="mt-3 text-sm text-mist-700">
              The city’s FY{FDP_YEAR} Annual Budget Report is posted on the DILG Full Disclosure Policy Portal:{' '}
              <a
                href={budgetReport.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-0.5 font-semibold text-brand-800 underline underline-offset-2 hover:text-brand-950"
              >
                open the report
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </p>
          )}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-8 min-w-0">
            <FinancesOverview />
            <SpecialFunds />
          </div>
          <TransparencySidebar />
        </div>
      </div>

      <JsonLd data={buildBreadcrumbSchema(breadcrumbs)} />
    </main>
  );
}
