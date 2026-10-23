// City offices for the Local Officials Directory.
// Names and descriptions come from src/data/departments.ts. Office heads, locations, phones,
// and emails there are unverified, so this directory does not show them.
// "Handles" is built from the sourced transaction directories (certificates, business),
// so every item links to a page with its fee, office steps, and sources.

import { CITY_DEPARTMENTS } from '@/data/departments';
import { CERTIFICATES_DIRECTORY } from '@/data/certificates';
import { BUSINESS_DIRECTORY } from '@/data/businessServices';
import type { TxDirectoryData } from '@/types/transactions';

interface HandledRef {
  /** Page that lists the transactions */
  page: string;
  data: TxDirectoryData;
  /** Office id inside that directory */
  officeId: string;
}

interface OfficeLinks {
  /** Service pages where residents can see what this office offers */
  services: { label: string; href: string }[];
  handles?: HandledRef[];
}

const CERT = { page: '/services/certificates', data: CERTIFICATES_DIRECTORY };
const BIZ = { page: '/services/business-and-livelihood', data: BUSINESS_DIRECTORY };

const LINKS: Record<string, OfficeLinks> = {
  cmo: { services: [{ label: 'All city services', href: '/services' }] },
  sp: { services: [{ label: 'Ordinances and resolutions', href: '/government/legislative' }] },
  bplo: {
    services: [{ label: 'Business & Livelihood', href: '/services/business-and-livelihood' }],
    handles: [{ ...BIZ, officeId: 'bplo' }],
  },
  cho: {
    services: [{ label: 'Health Services', href: '/services/health-services' }],
    handles: [{ ...CERT, officeId: 'cho' }],
  },
  cswdo: { services: [{ label: 'Social Welfare', href: '/services/social-welfare' }] },
  cdrrmo: { services: [{ label: 'Disaster Preparedness', href: '/services/disaster-preparedness' }] },
  cpdo: { services: [{ label: 'Housing & Land Use', href: '/services/housing-and-land-use' }] },
  ceo: {
    services: [
      { label: 'Infrastructure & Public Works', href: '/services/infrastructure-and-public-works' },
      { label: 'Housing & Land Use', href: '/services/housing-and-land-use' },
    ],
  },
  cto: {
    services: [
      { label: 'Business & Livelihood', href: '/services/business-and-livelihood' },
      { label: 'Certificates & Clearances', href: '/services/certificates' },
    ],
    handles: [
      { ...BIZ, officeId: 'treasurer' },
      { ...CERT, officeId: 'treasurer' },
    ],
  },
  ccro: {
    services: [{ label: 'Certificates & Clearances', href: '/services/certificates' }],
    handles: [{ ...CERT, officeId: 'lcr' }],
  },
};

export interface CityOffice {
  id: string;
  name: string;
  acronym: string;
  description: string;
  /** Only for verified officeholders (see headVerification in departments.ts) */
  head?: string;
  services: { label: string; href: string }[];
  /** Transactions this office handles, each linking to its entry */
  handles: { label: string; href: string }[];
}

export const CITY_OFFICES: CityOffice[] = CITY_DEPARTMENTS.map((d) => {
  const links = LINKS[d.id] ?? { services: [] };
  const seen = new Set<string>();
  const handles = (links.handles ?? []).flatMap(({ page, data, officeId }) =>
    data.items
      .filter((t) => t.officeId === officeId)
      .filter((t) => (seen.has(t.name) ? false : (seen.add(t.name), true)))
      .map((t) => ({ label: t.name, href: `${page}#${t.id}` }))
  );
  return {
    id: d.id,
    name: d.name,
    acronym: d.acronym,
    description: d.mandate,
    head: d.headVerification ? d.head : undefined,
    services: links.services,
    handles,
  };
});
