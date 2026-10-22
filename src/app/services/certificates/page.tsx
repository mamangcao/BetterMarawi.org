import React from 'react';
import { Metadata } from 'next';
import { Building2, MapPin, Sparkles } from 'lucide-react';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { ServiceFAQ } from '@/components/services/ServiceFAQ';
import { ServiceSidebar } from '@/components/services/ServiceSidebar';
import { TransactionsDirectory } from '@/components/services/transactions/TransactionsDirectory';
import { SourcesList } from '@/components/services/transactions/SourcesList';
import { CERTIFICATES_DIRECTORY, CERTIFICATES_FAQS } from '@/data/certificates';
import { buildBreadcrumbSchema, buildFAQSchema } from '@/lib/jsonld';
import { buildMetadata, getRouteBreadcrumbs } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Certificates & Clearances in Marawi City | BetterMarawi.org',
  description:
    'Where to get birth, marriage, and death certificates, CENOMAR, barangay clearance, police and NBI clearance, cedula, and other certificates in Marawi City: fees, offices, and steps.',
  path: '/services/certificates',
});

export default function CertificatesPage() {
  const breadcrumbs = getRouteBreadcrumbs('/services/certificates');
  const { offices } = CERTIFICATES_DIRECTORY;

  return (
    <main className="pb-16">
      <Breadcrumbs items={breadcrumbs} />

      {/* Page header: same structure as the other service pages */}
      <section className="bg-gradient-to-b from-surface-card to-surface border-b border-mist-200/90 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-brand-800 mb-3">
                <span>Citizen&apos;s Charter Service Guide</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono-tabular">PSA / LCR</span>
                <span aria-hidden="true">·</span>
                <span>{offices.length} offices · {CERTIFICATES_DIRECTORY.items.length} documents</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-mist-950 font-display">
                Certificates &amp; Clearances
              </h1>
              <p className="mt-4 text-base text-mist-700 leading-relaxed">
                Find the certificate you need, what it costs, and which office issues it. Open an office to see the
                steps and what to bring.
              </p>

              {/* RA 11261 */}
              <div className="mt-6 flex gap-3 rounded-xl border border-brand-200 bg-brand-50 p-4 sm:p-5">
                <Sparkles className="w-5 h-5 shrink-0 text-brand-700 mt-0.5" aria-hidden="true" />
                <div className="text-sm text-brand-950">
                  <p className="font-bold">First job? Get these documents free, once.</p>
                  <p className="mt-1 text-mist-700">
                    Under RA 11261, first-time jobseekers pay nothing for their PSA birth and marriage certificates,
                    barangay clearance, police clearance, and NBI clearance. Get a First Time Jobseeker Certification
                    from your barangay first, and show it when you apply.
                  </p>
                </div>
              </div>
            </div>

            {/* Responsible offices card: links open each office's steps below */}
            <nav
              aria-label="Responsible offices"
              className="bg-white rounded-xl border border-mist-200/90 p-5 lg:w-80 shrink-0 space-y-3"
            >
              <div className="text-xs font-semibold uppercase tracking-wider text-mist-500">Responsible Offices</div>
              <ul className="space-y-1.5 text-sm">
                {offices.map((o) => (
                  <li key={o.id}>
                    <a
                      href={`#office-${o.id}`}
                      className="flex items-start gap-2 rounded-md px-1 py-0.5 font-semibold text-mist-900 hover:bg-mist-50 hover:text-brand-800"
                    >
                      <Building2 className="w-3.5 h-3.5 text-brand-800 shrink-0 mt-1" aria-hidden="true" />
                      {o.name}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="flex items-start gap-2 pt-2 border-t border-mist-100 text-xs text-mist-600">
                <MapPin className="w-3.5 h-3.5 text-brand-800 shrink-0 mt-0.5" aria-hidden="true" />
                <span>PSA CRS Marawi City Outlet: Rima Building, Brgy. Datu Saber, Marawi City</span>
              </p>
            </nav>
          </div>
        </div>
      </section>

      {/* Main content and services sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <article className="lg:col-span-8 space-y-10 min-w-0">
            <TransactionsDirectory
              data={CERTIFICATES_DIRECTORY}
              labels={{
                listHeading: 'Certificates and clearances',
                searchPlaceholder: 'Search, e.g. birth, clearance, cedula',
                noun: { one: 'document', many: 'documents' },
                itemsHereLabel: 'Documents issued here',
                officesIntro: 'Open an office to see its steps, what to bring, and every document it issues.',
              }}
            />

            <ServiceFAQ faqs={CERTIFICATES_FAQS} />

            <div className="border-t border-mist-200 pt-6">
              <SourcesList
                sources={CERTIFICATES_DIRECTORY.sources}
                note="City and barangay fees are set by local ordinance and are not yet published online. Processing times will be added when the offices publish their Citizen’s Charters."
              />
            </div>
          </article>

          <ServiceSidebar currentSlug="certificates" />
        </div>
      </div>

      <JsonLd data={buildBreadcrumbSchema(breadcrumbs)} />
      <JsonLd data={buildFAQSchema(CERTIFICATES_FAQS)} />
    </main>
  );
}
