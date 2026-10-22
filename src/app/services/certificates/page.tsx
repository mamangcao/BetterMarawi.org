import React from 'react';
import { Metadata } from 'next';
import { Sparkles } from 'lucide-react';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { ArrowUpRight } from '@/components/ui';
import { CertificatesDirectory } from '@/components/services/certificates/CertificatesDirectory';
import { CERT_SOURCES } from '@/data/certificates';
import { buildBreadcrumbSchema } from '@/lib/jsonld';
import { buildMetadata, getRouteBreadcrumbs } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Certificates & Clearances in Marawi City | BetterMarawi.org',
  description:
    'Where to get birth, marriage, and death certificates, CENOMAR, barangay clearance, police and NBI clearance, cedula, and other certificates in Marawi City: fees, offices, and steps.',
  path: '/services/certificates',
});

export default function CertificatesPage() {
  const breadcrumbs = getRouteBreadcrumbs('/services/certificates');

  return (
    <main className="pb-16">
      <Breadcrumbs items={breadcrumbs} />

      <section className="bg-gradient-to-b from-surface-card to-surface border-b border-mist-200/90 py-10 sm:py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-800 mb-2">Services</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-mist-950 font-display">
            Certificates &amp; Clearances
          </h1>
          <p className="mt-3 text-base text-mist-700 max-w-3xl leading-relaxed">
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
                barangay clearance, police clearance, and NBI clearance. Get a First Time Jobseeker Certification from
                your barangay first, and show it when you apply.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <CertificatesDirectory />

        <div className="mt-12 border-t border-mist-200 pt-6 text-xs text-mist-500">
          <p className="font-semibold text-mist-600">Sources</p>
          <ul className="mt-1.5 space-y-1">
            {Object.values(CERT_SOURCES).map((s) => (
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
            ))}
          </ul>
          <p className="mt-2">
            City and barangay fees are set by local ordinance and are not yet published online. Processing times will
            be added when the offices publish their Citizen’s Charters.
          </p>
        </div>
      </div>

      <JsonLd data={buildBreadcrumbSchema(breadcrumbs)} />
    </main>
  );
}
