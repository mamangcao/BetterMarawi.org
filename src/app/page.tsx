import React from 'react';
import { Metadata } from 'next';
import {
  Hero,
  CityAtAGlance,
  QuickServices,
  CultureSpotlight,
  GovActivity,
  HistorySnapshot,
  LeadershipSection,
} from '@/components/home';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbSchema } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';
import { SITE_CONFIG } from '@/config/site';

export const metadata: Metadata = buildMetadata({
  title: 'BetterMarawi.org — Islamic City of Marawi Citizen Services & Transparency Portal',
  description:
    'A community-run portal to find information and services of the Islamic City of Marawi, Lanao del Sur. Access Citizen’s Charter guides, PhilHealth YAKAP, and 96 barangay statistics.',
  path: '/',
});

export default function HomePage() {
  const breadcrumbs = [{ name: 'Home', url: SITE_CONFIG.url }];

  return (
    <main>
      <Hero />
      <CityAtAGlance />
      <QuickServices />
      <CultureSpotlight />
      <GovActivity />
      <HistorySnapshot />
      <LeadershipSection />
      <JsonLd data={buildBreadcrumbSchema(breadcrumbs)} />
    </main>
  );
}

