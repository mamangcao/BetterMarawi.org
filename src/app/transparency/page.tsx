import React from 'react';
import { Metadata } from 'next';
import { BarChart3, FileCheck2, FileSearch, FileText, Wallet } from 'lucide-react';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { SectionHub, type HubCard } from '@/components/layout/SectionHub';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbSchema } from '@/lib/jsonld';
import { buildMetadata, getRouteBreadcrumbs } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Transparency Portal: Budget, Reports & Public Records | BetterMarawi.org',
  description:
    'How the Islamic City of Marawi spends public money and how to see its records: Full Disclosure Policy reports, transparency documents, the annual budget, governance reports, and Freedom of Information requests.',
  path: '/transparency',
});

const CARDS: HubCard[] = [
  {
    path: '/transparency/full-disclosure-policy',
    eyebrow: 'DILG FDP',
    description: 'The financial reports the city must post publicly every quarter and every year.',
    meta: 'Quarterly and annual reports',
    icon: FileCheck2,
  },
  {
    path: '/transparency/annual-budget',
    eyebrow: 'Budget',
    description: 'How the city budget is divided across sectors and where the money comes from.',
    meta: 'Spending by sector · fund sources',
    icon: Wallet,
  },
  {
    path: '/transparency/transparency-documents',
    eyebrow: 'Records',
    description: 'Public documents on procurement, audits, and other city transactions.',
    meta: 'Procurement · audits · orders',
    icon: FileText,
  },
  {
    path: '/transparency/reports-and-statistics',
    eyebrow: 'Performance',
    description: 'Reports on how the city government performs and meets national standards.',
    meta: 'Governance reports',
    icon: BarChart3,
  },
  {
    path: '/transparency/freedom-of-information',
    eyebrow: 'FOI',
    description: 'How to ask the city for a public record, and what to expect after you file.',
    meta: 'Request a public record',
    icon: FileSearch,
  },
];

export default function TransparencyPage() {
  const breadcrumbs = getRouteBreadcrumbs('/transparency');

  return (
    <main className="pb-16">
      <Breadcrumbs items={breadcrumbs} />
      <SectionHub
        eyebrow="Transparency Portal"
        title="Public Money & Public Records"
        intro="See how the Islamic City of Marawi plans and spends its budget, find its public reports, and request records. Choose a section below."
        cards={CARDS}
      />
      <JsonLd data={buildBreadcrumbSchema(breadcrumbs)} />
    </main>
  );
}
