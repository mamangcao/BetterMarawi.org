import React from 'react';
import { Metadata } from 'next';
import { Database, MapPin, MapPinned, TrendingUp } from 'lucide-react';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { SectionHub, type HubCard } from '@/components/layout/SectionHub';
import { JsonLd } from '@/components/seo/JsonLd';
import { MARAWI_BARANGAYS } from '@/data/barangays';
import { CMCI_PILLARS, CMCI_SUMMARY } from '@/data/cmci';
import { buildBreadcrumbSchema } from '@/lib/jsonld';
import { buildMetadata, getRouteBreadcrumbs } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Marawi Statistics & Open Data | BetterMarawi.org',
  description:
    'Facts and figures on the Islamic City of Marawi: city profile, population of all 101 barangays, DTI competitiveness scores, and downloadable open data.',
  path: '/statistics',
});

const CARDS: HubCard[] = [
  {
    path: '/statistics/city-profile',
    eyebrow: 'Overview',
    description: 'Marawi’s land, elevation, and people at a glance.',
    meta: 'Geography · population',
    icon: MapPin,
  },
  {
    path: '/statistics/barangay-data',
    eyebrow: 'PSA 2024 Census',
    description: 'Population and urban or rural classification for every barangay, searchable and downloadable.',
    meta: `${MARAWI_BARANGAYS.length} barangays`,
    icon: MapPinned,
  },
  {
    path: '/statistics/dti-cmci-profile',
    eyebrow: `DTI CMCI ${CMCI_SUMMARY.cycleYear}`,
    description: 'How Marawi scores on the DTI Cities and Municipalities Competitiveness Index.',
    meta: `${CMCI_PILLARS.length} pillars · rank ${CMCI_SUMMARY.overallRank} among ${CMCI_SUMMARY.category.toLowerCase()}`,
    icon: TrendingUp,
  },
  {
    path: '/statistics/open-data-ph',
    eyebrow: 'Open Data',
    description: 'Datasets about Marawi you can download and reuse.',
    meta: 'CSV and JSON files',
    icon: Database,
  },
];

export default function StatisticsPage() {
  const breadcrumbs = getRouteBreadcrumbs('/statistics');

  return (
    <main className="pb-16">
      <Breadcrumbs items={breadcrumbs} />
      <SectionHub
        eyebrow="Statistics & Data"
        title="Marawi in Numbers"
        intro="Facts and figures about the Islamic City of Marawi and its barangays, with their sources. Choose a section below."
        cards={CARDS}
      />
      <JsonLd data={buildBreadcrumbSchema(breadcrumbs)} />
    </main>
  );
}
