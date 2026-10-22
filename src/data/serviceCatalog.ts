// One catalogue of all 12 citizen services, used by the /services grid and by each service
// page's "Responsible offices" card, so both always say the same thing.
// Offices come from the sourced transaction directories where a page has one (Certificates,
// Business), from the health facility data for Health, and otherwise from the service's
// responsibleOffice text (split where it names more than one office).

import { SERVICES_DATA } from '@/data/services';
import { CERTIFICATES_DIRECTORY } from '@/data/certificates';
import { BUSINESS_DIRECTORY } from '@/data/businessServices';
import { BARANGAY_HEALTH, MARAWI_HOSPITALS, MARAWI_INFIRMARIES, RURAL_HEALTH_UNITS } from '@/data/healthFacilities';
import type { TxDirectoryData } from '@/types/transactions';

export interface ServiceOffice {
  name: string;
  /** In-page or cross-page link to the office's details, when the site has them */
  href?: string;
}

export interface ServiceCardData {
  slug: string;
  href: string;
  title: string;
  acronym: string;
  description: string;
  /** Short, accurate summary for the card footer, e.g. "7 services · 2 offices" */
  meta: string;
  offices: ServiceOffice[];
}

function directoryOffices(page: string, data: TxDirectoryData): ServiceOffice[] {
  return data.offices.map((o) => ({ name: o.name, href: `${page}#office-${o.id}` }));
}

function plural(n: number, one: string, many: string) {
  return `${n} ${n === 1 ? one : many}`;
}

const CERTIFICATES_CARD: ServiceCardData = {
  slug: 'certificates',
  href: '/services/certificates',
  title: 'Certificates & Clearances',
  acronym: 'PSA / LCR',
  description:
    'Birth, marriage, and death certificates, CENOMAR, barangay, police, and NBI clearances, cedula, and more: fees, offices, and step-by-step guides.',
  meta: `${plural(CERTIFICATES_DIRECTORY.items.length, 'document', 'documents')} · ${plural(CERTIFICATES_DIRECTORY.offices.length, 'office', 'offices')}`,
  offices: directoryOffices('/services/certificates', CERTIFICATES_DIRECTORY),
};

/** Per-service overrides where the site has sourced office data */
const OVERRIDES: Record<string, Partial<Pick<ServiceCardData, 'meta' | 'offices'>>> = {
  'business-and-livelihood': {
    meta: `${plural(BUSINESS_DIRECTORY.items.length, 'service', 'services')} · ${plural(BUSINESS_DIRECTORY.offices.length, 'office', 'offices')}`,
    offices: directoryOffices('/services/business-and-livelihood', BUSINESS_DIRECTORY),
  },
  'health-services': {
    meta: `${MARAWI_HOSPITALS.length} hospitals · ${MARAWI_INFIRMARIES.length} infirmaries · ${BARANGAY_HEALTH.stations + BARANGAY_HEALTH.centers} health stations`,
    offices: [
      { name: 'City Health Office (CHO)', href: '/services/health-services#health-facilities-heading' },
      { name: `Rural Health Units (${RURAL_HEALTH_UNITS.length})`, href: '/services/health-services#health-facilities-heading' },
      { name: 'Amai Pakpak Medical Center (APMC)', href: '/services/health-services#health-facilities-heading' },
    ],
  },
};

/** Split "Office A & Office B" into separate offices; keeps names like "Environment & Solid Waste" intact. */
function splitOffices(text: string): ServiceOffice[] {
  return text
    .split(/\s&\s(?=(?:Office|City|Amai|Marawi|MBHTE|Local)\b)/)
    .map((name) => ({ name: name.trim() }))
    .filter((o) => o.name);
}

export const SERVICE_CARDS: ServiceCardData[] = [
  CERTIFICATES_CARD,
  ...SERVICES_DATA.map((s) => ({
    slug: s.slug,
    href: `/services/${s.slug}`,
    title: s.title,
    acronym: s.officeAcronym,
    description: s.shortDescription,
    meta: `${plural(s.requirements.length, 'requirement', 'requirements')} · ${plural(s.charterSteps.length, 'step', 'steps')}`,
    offices: splitOffices(s.responsibleOffice),
    ...OVERRIDES[s.slug],
  })),
];

export function getServiceCard(slug: string): ServiceCardData | undefined {
  return SERVICE_CARDS.find((c) => c.slug === slug);
}
