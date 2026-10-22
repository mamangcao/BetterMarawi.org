import React from 'react';
import { Metadata } from 'next';
import { Building2, Gavel, Users } from 'lucide-react';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { SectionHub, type HubCard } from '@/components/layout/SectionHub';
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

const CARDS: HubCard[] = [
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
      <SectionHub
        eyebrow="Government Directory"
        title="City Government of Marawi"
        intro="Who leads the Islamic City of Marawi, which offices do what, and what the city council passes. Choose a section below."
        cards={CARDS}
      />
      <JsonLd data={buildBreadcrumbSchema(breadcrumbs)} />
    </main>
  );
}
