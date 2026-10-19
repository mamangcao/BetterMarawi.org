import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Phone, MapPin, Clock, Stethoscope, Compass } from 'lucide-react';
import { SERVICES_DATA } from '@/data/services';
import { TOURISM_CATEGORIES } from '@/data/tourism';
import { RequirementsChecklist } from '@/components/services/RequirementsChecklist';
import { CharterSteps } from '@/components/services/CharterSteps';
import { FeeSchedule } from '@/components/services/FeeSchedule';
import { ServiceFAQ } from '@/components/services/ServiceFAQ';
import { ServiceSidebar } from '@/components/services/ServiceSidebar';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { formatWithPeso } from '@/components/ui';
import { JsonLd } from '@/components/seo/JsonLd';
import {
  buildBreadcrumbSchema,
  buildGovernmentServiceSchema,
  buildFAQSchema,
} from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';
import { SITE_CONFIG } from '@/config/site';

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SERVICES_DATA.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES_DATA.find((s) => s.slug === slug);
  if (!service) return {};

  return buildMetadata({
    title: `${service.title} in Marawi City — Citizen's Charter & Guide | BetterMarawi.org`,
    description: `${service.shortDescription} View requirements, fees, and step-by-step instructions at ${service.officeAcronym}.`,
    path: `/services/${slug}`,
  });
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = SERVICES_DATA.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const pageUrl = `${SITE_CONFIG.url}/services/${service.slug}`;
  const breadcrumbs = [
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'Services', url: `${SITE_CONFIG.url}/services` },
    { name: service.title, url: pageUrl },
  ];

  return (
    <main className="pb-16">
      <Breadcrumbs items={breadcrumbs} />

      {/* Page Header Banner */}
      <section className="bg-gradient-to-b from-surface-card to-surface border-b border-stone-200/90 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-emerald-800 mb-3">
                <span>Citizen&apos;s Charter Service Guide</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono-tabular">{service.officeAcronym}</span>
                <span aria-hidden="true">·</span>
                <span>{service.classification}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-950 font-display">
                {service.title}
              </h1>
              <p className="mt-4 text-base text-stone-700 leading-relaxed">
                {service.heroSummary}
              </p>

              {/* Key Highlights */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {service.highlights.map((h) => (
                  <div
                    key={h.label}
                    className="bg-white rounded-xl border border-stone-200/90 p-3.5"
                  >
                    <div className="text-xs text-stone-500">{h.label}</div>
                    <div className="text-sm font-bold text-stone-900 font-mono-tabular mt-0.5">
                      {formatWithPeso(h.value)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Office Contact Card */}
            <div className="bg-white rounded-xl border border-stone-200/90 p-5 lg:w-80 shrink-0 space-y-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                Responsible Office
              </div>
              <div className="text-sm font-bold text-stone-900">
                {service.responsibleOffice}
              </div>
              <div className="text-xs text-stone-600 space-y-1.5 pt-2 border-t border-stone-100">
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-emerald-800 shrink-0 mt-0.5" />
                  <span>{service.officeLocation}</span>
                </div>
                <div className="flex items-center gap-2 font-mono-tabular">
                  <Clock className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
                  <span>{service.operatingHours}</span>
                </div>
              </div>
              <div className="pt-2">
                <a
                  href={`tel:${service.hotline.replace(/[^0-9]/g, '')}`}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-900 text-white text-xs font-semibold hover:bg-emerald-950 transition-colors font-mono-tabular"
                >
                  <Phone className="w-3.5 h-3.5" />
                  Call Hotline: {service.hotline}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <article className="lg:col-span-8 space-y-10">
            {/* Special Section for Health Services: PhilHealth YAKAP 13 Labs */}
            {service.slug === 'health-services' && (
              <section
                aria-labelledby="yakap-detail-heading"
                className="bg-emerald-950 text-stone-100 rounded-xl p-6 border border-emerald-900"
              >
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent">
                  <Stethoscope className="w-4 h-4" />
                  Universal Health Care (RA 11223) · Marawi City Network
                </div>
                <h2
                  id="yakap-detail-heading"
                  className="text-2xl font-bold text-white font-display mt-1"
                >
                  PhilHealth YAKAP (Konsulta) Accredited Facilities &amp; 13 Free Lab Tests
                </h2>
                <p className="text-sm text-emerald-100/90 mt-2 leading-relaxed">
                  All residents registered at the Marawi City Health Office (CHO), Rural Health Units (RHU 1–4), and Amai Pakpak Medical Center (APMC) receive 100% free outpatient consultations, up to ₱20,000 in annual maintenance medicines, and these 13 diagnostic laboratory tests:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-4 text-xs font-mono-tabular">
                  {[
                    '01. Complete Blood Count (CBC) w/ Platelet',
                    '02. Urinalysis',
                    '03. Fecalysis',
                    '04. Sputum Microscopy',
                    '05. Fasting Blood Sugar (FBS)',
                    '06. Oral Glucose Tolerance Test (OGTT)',
                    '07. Lipid Profile (Cholesterol, LDL, HDL, Triglycerides)',
                    '08. Serum Creatinine',
                    '09. Chest X-Ray',
                    '10. 12-Lead Electrocardiogram (ECG)',
                    '11. Pap Smear',
                    '12. HbA1c (Glycosylated Hemoglobin)',
                    '13. Fecal Occult Blood Test (FOBT)',
                  ].map((lab) => (
                    <div
                      key={lab}
                      className="bg-emerald-900/70 border border-emerald-800 rounded-lg px-3 py-2 text-emerald-50"
                    >
                      {lab}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Special Section for Tourism: All 6 Cultural Categories */}
            {service.slug === 'tourism' && (
              <section aria-labelledby="tourism-directory-heading" className="space-y-6">
                <div>
                  <h2
                    id="tourism-directory-heading"
                    className="text-2xl font-bold text-stone-900 font-display"
                  >
                    Registered Cultural &amp; Eco-Tourism Directory (6 Categories)
                  </h2>
                  <p className="text-sm text-stone-600 mt-1">
                    Curated landmarks across the Islamic City of Marawi and the Lake Lanao highland basin.
                  </p>
                </div>
                <div className="space-y-5">
                  {TOURISM_CATEGORIES.map((cat) => (
                    <div
                      key={cat.id}
                      className="bg-white rounded-xl border border-stone-200/90 p-6"
                    >
                      <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b border-stone-100">
                        <div className="flex items-center gap-2">
                          <Compass className="w-5 h-5 text-emerald-800" />
                          <h3 className="text-lg font-bold text-stone-900">
                            {cat.title}
                          </h3>
                        </div>
                        <span className="text-xs font-mono-tabular font-semibold text-emerald-800">
                          {cat.countLabel}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 gap-3">
                        {cat.places.map((place) => (
                          <div
                            key={place.name}
                            className="p-3.5 rounded-lg bg-stone-50 border border-stone-200/70"
                          >
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <span className="text-sm font-bold text-stone-900">
                                {place.name}
                              </span>
                              <span className="text-xs text-stone-500 font-mono-tabular">
                                Brgy. {place.barangay}
                              </span>
                            </div>
                            <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                              {place.note}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <RequirementsChecklist
              requirements={service.requirements}
              whoMayAvail={service.whoMayAvail}
            />

            <CharterSteps
              steps={service.charterSteps}
              totalProcessingTime={service.totalProcessingTime}
            />

            <FeeSchedule fees={service.fees} />

            <ServiceFAQ faqs={service.faqs} />
          </article>

          <ServiceSidebar currentSlug={service.slug} email={service.email} />
        </div>
      </div>

      <JsonLd data={buildBreadcrumbSchema(breadcrumbs)} />
      <JsonLd data={buildGovernmentServiceSchema(service, pageUrl)} />
      {service.faqs.length > 0 && <JsonLd data={buildFAQSchema(service.faqs)} />}
    </main>
  );
}

