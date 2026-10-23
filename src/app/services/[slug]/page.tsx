import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SERVICES_DATA } from '@/data/services';
import { RequirementsChecklist } from '@/components/services/RequirementsChecklist';
import { CharterSteps } from '@/components/services/CharterSteps';
import { FeeSchedule } from '@/components/services/FeeSchedule';
import { ServiceFAQ } from '@/components/services/ServiceFAQ';
import { ServiceSidebar } from '@/components/services/ServiceSidebar';
import { HealthFacilities } from '@/components/services/HealthFacilities';
import { ServiceOfficesCard } from '@/components/services/ServiceOfficesCard';
import { getServiceCard } from '@/data/serviceCatalog';
import { HealthPrograms } from '@/components/services/HealthPrograms';
import { YakapLabTests } from '@/components/services/YakapLabTests';
import { TourismDirectory } from '@/components/services/TourismDirectory';
import { BusinessServices } from '@/components/services/BusinessServices';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { formatWithPeso, StatGrid, UnverifiedNotice } from '@/components/ui';
import { JsonLd } from '@/components/seo/JsonLd';
import {
  buildBreadcrumbSchema,
  buildGovernmentServiceSchema,
  buildFAQSchema,
} from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';
import { SITE_CONFIG } from '@/config/site';

// Service pages where a sourced section replaces the template's header highlights
const SOURCED_SLUGS = ['health-services', 'business-and-livelihood'];

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
    // Same pattern as /services/certificates: topic first, about 40 to 60 characters
    title: `${service.title} in Marawi City | BetterMarawi.org`,
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
      <section className="bg-gradient-to-b from-surface-card to-surface border-b border-mist-200/90 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-brand-800 mb-3">
                <span>Citizen&apos;s Charter Service Guide</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono-tabular">{service.officeAcronym}</span>
                <span aria-hidden="true">·</span>
                <span>{service.classification}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-mist-950 font-display">
                {service.title}
              </h1>
              <p className="mt-4 text-base text-mist-700 leading-relaxed">
                {service.heroSummary}
              </p>
              <UnverifiedNotice items={[service]} className='mt-6' />
{/* Key Highlights (hidden on Health Services: its facility summary below carries the counts) */}
              {!SOURCED_SLUGS.includes(service.slug) && (
              <StatGrid
                items={service.highlights.map((h) => ({ label: h.label, value: formatWithPeso(h.value) }))}
                columns="grid-cols-1 sm:grid-cols-3"
                size="phrase"
                className="mt-6"
              />
              )}
            </div>

            {/* Responsible offices (every office, from the shared service catalogue) */}
            <ServiceOfficesCard
              offices={getServiceCard(service.slug)?.offices ?? [{ name: service.responsibleOffice }]}
              location={service.officeLocation}
              hours={service.operatingHours}
            />
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <article className="lg:col-span-8 space-y-10">
            {/* Business and Livelihood: sourced services, fees, and times */}
            {service.slug === 'business-and-livelihood' && <BusinessServices />}

            {/* Health Services: facilities, then programs (YAKAP detail follows) */}
            {service.slug === 'health-services' && <HealthFacilities />}
            {service.slug === 'health-services' && <HealthPrograms />}

            {/* Special Section for Health Services: PhilHealth YAKAP 13 Labs */}
            {service.slug === 'health-services' && <YakapLabTests />}

            {/* Special Section for Tourism: All 6 Cultural Categories */}
            {service.slug === 'tourism' && <TourismDirectory />}

            <RequirementsChecklist
              requirements={service.requirements}
              whoMayAvail={service.whoMayAvail}
              verification={service}
            />

            {/* Unsourced template steps and fees are hidden where a sourced section covers them */}
            {service.slug !== 'business-and-livelihood' && (
              <>
                <CharterSteps
                  steps={service.charterSteps}
                  totalProcessingTime={service.totalProcessingTime}
                />
                <FeeSchedule fees={service.fees} verification={service} />
              </>
            )}

            <ServiceFAQ faqs={service.faqs} numbered />
          </article>

          <ServiceSidebar currentSlug={service.slug} />
        </div>
      </div>

      <JsonLd data={buildBreadcrumbSchema(breadcrumbs)} />
      <JsonLd data={buildGovernmentServiceSchema(service, pageUrl)} />
      {service.faqs.length > 0 && <JsonLd data={buildFAQSchema(service.faqs)} />}
    </main>
  );
}

