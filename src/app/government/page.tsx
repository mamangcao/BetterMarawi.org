import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Building2, FileText, Gavel, Users } from 'lucide-react';
import { ArrowUpRight } from '@/components/ui';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { CITY_DEPARTMENTS } from '@/data/departments';
import { COUNCILORS, EXECUTIVES } from '@/data/officials';
import { MARAWI_BARANGAYS } from '@/data/barangays';
import { buildBreadcrumbSchema } from '@/lib/jsonld';
import { buildMetadata, getRouteBreadcrumbs } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'City Government of Marawi: Officials, Offices & Council | BetterMarawi.org',
  description:
    'Find who leads the Islamic City of Marawi: the Mayor and Vice Mayor, the 10 City Councilors, city departments, the Sangguniang Panlungsod, and the leaders of all 101 barangays.',
  path: '/government',
});

/** One card per Government page, in the same style as the /services grid. */
const SECTIONS = [
  {
    href: '/government/local-officials-directory',
    eyebrow: '2025–2028 Term',
    title: 'Local Officials Directory',
    description:
      'The Mayor and Vice Mayor, the City Council, the city offices and their services, and the leaders of every barangay.',
    meta: `${EXECUTIVES.length} executives · ${COUNCILORS.length} councilors · ${MARAWI_BARANGAYS.length} barangays`,
    icon: Users,
  },
  {
    href: '/government/departments-and-officials',
    eyebrow: 'Executive',
    title: 'Departments & Officials',
    description: 'The city departments, what each one is responsible for, and the services they handle.',
    meta: `${CITY_DEPARTMENTS.length} city offices`,
    icon: Building2,
  },
  {
    href: '/government/legislative',
    eyebrow: 'Sangguniang Panlungsod',
    title: 'Legislative',
    description: 'The city council’s ordinances, resolutions, and committees.',
    meta: 'Ordinances · resolutions · committees',
    icon: Gavel,
  },
];

export default function GovernmentOverviewPage() {
  const breadcrumbs = getRouteBreadcrumbs('/government');

  return (
    <main className="pb-16">
      <Breadcrumbs items={breadcrumbs} />

      <section className="bg-gradient-to-b from-surface-card to-surface border-b border-mist-200/90 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-800 mb-2">Government Directory</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-mist-950 font-display">
            City Government of Marawi
          </h1>
          <p className="mt-3 text-base text-mist-700 max-w-2xl">
            Who leads the Islamic City of Marawi, which offices do what, and what the city council passes. Choose a
            section below.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SECTIONS.map(({ href, eyebrow, title, description, meta, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="group bg-white rounded-xl border border-mist-200/90 p-6 hover:border-brand-800/50 transition-all flex flex-col justify-between focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
            >
              <div>
                <div className="flex items-center justify-between gap-3 text-xs text-mist-500 font-mono-tabular mb-3">
                  <span className="font-semibold text-brand-800">{eyebrow}</span>
                  <Icon className="w-4 h-4 text-brand-700" aria-hidden="true" />
                </div>
                <h2 className="text-xl font-bold text-mist-900 group-hover:text-brand-900 font-display">{title}</h2>
                <p className="text-sm text-mist-600 mt-2 leading-relaxed">{description}</p>
              </div>
              <div className="mt-5 pt-4 border-t border-mist-100 flex items-center justify-between gap-3 text-xs font-semibold text-brand-800">
                <span className="inline-flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" aria-hidden="true" />
                  {meta}
                </span>
                <ArrowUpRight className="w-4 h-4 shrink-0" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <JsonLd data={buildBreadcrumbSchema(breadcrumbs)} />
    </main>
  );
}
