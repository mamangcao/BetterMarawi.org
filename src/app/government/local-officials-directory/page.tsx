import React from 'react';
import { Metadata } from 'next';
import { Building2, Gavel, Landmark, MapPinned } from 'lucide-react';
import { GovernmentSidebar } from '@/components/government';
import { OfficialCard } from '@/components/government/directory/OfficialCard';
import { CityOfficeCard } from '@/components/government/directory/CityOfficeCard';
import { BarangayUnits } from '@/components/government/directory/BarangayUnits';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { ArrowUpRight } from '@/components/ui';
import { COUNCILORS, EXECUTIVES, EX_OFFICIO, OFFICIALS_SOURCES } from '@/data/officials';
import { CITY_OFFICES } from '@/data/cityOffices';
import { buildBreadcrumbSchema } from '@/lib/jsonld';
import { buildMetadata, getRouteBreadcrumbs } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Local Officials Directory (2025–2028) | BetterMarawi.org',
  description:
    'Marawi City’s Mayor, Vice Mayor, 10 City Councilors, ex-officio members, city offices and their services, and all 101 barangays.',
  path: '/government/local-officials-directory',
});

const SECTIONS = [
  { id: 'executive', label: 'Executive Branch', icon: Landmark },
  { id: 'council', label: 'Sangguniang Panlungsod', icon: Gavel },
  { id: 'offices', label: 'City Offices', icon: Building2 },
  { id: 'barangays', label: 'Barangay Units', icon: MapPinned },
];

const sectionHeading = 'flex items-center gap-2 text-2xl font-bold text-brand-950 font-display';
const frame = 'grid gap-px overflow-hidden rounded-xl border border-mist-200 bg-mist-200';

export default function LocalOfficialsPage() {
  const breadcrumbs = getRouteBreadcrumbs('/government/local-officials-directory');

  return (
    <main className="pb-16">
      <Breadcrumbs items={breadcrumbs} />

      <section className="bg-gradient-to-b from-surface-card to-surface border-b border-mist-200/90 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-800 mb-2">2025–2028 Term</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-mist-950 font-display">Local Officials Directory</h1>
          <p className="mt-3 text-base text-mist-700 max-w-3xl leading-relaxed">
            Who leads the Islamic City of Marawi: the executive branch, the city council, the city offices that deliver
            services, and the 101 barangays.
          </p>

          {/* In-page navigation */}
          <nav aria-label="Directory sections" className="mt-6 flex flex-wrap gap-2">
            {SECTIONS.map(({ id, label, icon: Icon }) => (
              <a
                key={id}
                href={`#${id}`}
                className="inline-flex items-center gap-1.5 rounded-lg border border-mist-200 bg-white px-3 py-2 text-sm font-semibold text-brand-900 hover:border-brand-300 hover:bg-brand-50"
              >
                <Icon className="w-4 h-4 text-brand-700" aria-hidden="true" />
                {label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-14 min-w-0">
            {/* Executive Branch */}
            <section id="executive" aria-labelledby="executive-heading" className="scroll-mt-28 space-y-4">
              <h2 id="executive-heading" className={sectionHeading}>
                <Landmark className="w-6 h-6 text-brand-700" aria-hidden="true" /> Executive Branch
              </h2>
              <ul className={`${frame} sm:grid-cols-2`}>
                {EXECUTIVES.map((o) => (
                  <OfficialCard key={o.id} official={o} large />
                ))}
              </ul>
            </section>

            {/* Sangguniang Panlungsod */}
            <section id="council" aria-labelledby="council-heading" className="scroll-mt-28 space-y-4">
              <div>
                <h2 id="council-heading" className={sectionHeading}>
                  <Gavel className="w-6 h-6 text-brand-700" aria-hidden="true" /> Sangguniang Panlungsod
                </h2>
                <p className="mt-1 text-sm text-mist-600">
                  The city council, presided over by the Vice Mayor. It passes ordinances and approves the city budget.
                </p>
              </div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-mist-500">City Councilors</h3>
              <ul className={`${frame} sm:grid-cols-2`}>
                {COUNCILORS.map((o) => (
                  <OfficialCard key={o.id} official={o} />
                ))}
              </ul>
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-mist-500 pt-2">Ex-officio members</h3>
              <ul className={`${frame} sm:grid-cols-2`}>
                {EX_OFFICIO.map((o) => (
                  <OfficialCard key={o.id} official={o} />
                ))}
              </ul>
              <p className="text-xs text-mist-500">
                Ex-officio seats come from the Liga ng mga Barangay and the SK Federation. Barangay and SK elections are
                scheduled for November 2, 2026, so these seats will be updated after the new officials take office.
              </p>
            </section>

            {/* City Offices */}
            <section id="offices" aria-labelledby="offices-heading" className="scroll-mt-28 space-y-4">
              <div>
                <h2 id="offices-heading" className={sectionHeading}>
                  <Building2 className="w-6 h-6 text-brand-700" aria-hidden="true" /> City Offices
                </h2>
                <p className="mt-1 text-sm text-mist-600">
                  The offices that deliver city services. Open a service page to see fees, steps, and what to bring.
                </p>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {CITY_OFFICES.map((o) => (
                  <CityOfficeCard key={o.id} office={o} />
                ))}
              </ul>
              <p className="text-xs text-mist-500">
                Office heads, room locations, and direct lines will be added once the city confirms them.
              </p>
            </section>

            {/* Barangay Units */}
            <section id="barangays" aria-labelledby="barangays-heading" className="scroll-mt-28 space-y-4">
              <div>
                <h2 id="barangays-heading" className={sectionHeading}>
                  <MapPinned className="w-6 h-6 text-brand-700" aria-hidden="true" /> Barangay Units
                </h2>
                <p className="mt-1 text-sm text-mist-600">
                  Marawi’s 101 barangays, each led by a Punong Barangay. Barangay certificates are issued at your own
                  barangay hall.
                </p>
              </div>
              <BarangayUnits />
            </section>

            {/* Sources */}
            <div className="border-t border-mist-200 pt-6 text-xs text-mist-500">
              <p className="font-semibold text-mist-600">Sources for officials</p>
              <ul className="mt-1.5 space-y-1">
                {Object.values(OFFICIALS_SOURCES).map((s) =>
                  s.url.startsWith('http') ? (
                    <li key={s.id}>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-2 hover:text-brand-800 inline-flex items-center gap-0.5"
                      >
                        {s.label}
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    </li>
                  ) : (
                    <li key={s.id}>{s.label}</li>
                  )
                )}
              </ul>
              <p className="mt-2">
                Councilor results are from the May 12, 2025 elections; confirm against COMELEC’s official canvass if you
                need certified results.
              </p>
            </div>
          </div>

          <GovernmentSidebar />
        </div>
      </div>

      <JsonLd data={buildBreadcrumbSchema(breadcrumbs)} />
    </main>
  );
}
