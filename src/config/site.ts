import { NavSubItem, HotlineItem } from '@/types';

export const SITE_CONFIG = {
  name: 'BetterMarawi.org',
  tagline: 'Islamic City of Marawi Citizen Services & Transparency Portal',
  description:
    'A community-run portal to find information and services of the Islamic City of Marawi, Lanao del Sur. Access Citizen\'s Charter guides, PhilHealth YAKAP, transparency disclosures, and 96 barangay statistics.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://bettermarawi.org',
  geo: {
    latitude: 8.0034,
    longitude: 124.2851,
    region: 'PH-BAS',
    placename: 'Islamic City of Marawi',
  },
  contact: {
    cityHallAddress: 'Marawi City Hall Complex, Kilometer 0, Marawi City, Lanao del Sur, BARMM 9700',
    hotline: '+63 (063) 520-2100',
    emergencyHotline: '911 / (063) 520-2911',
    cdrrmoHotline: '+63 (063) 520-3000',
    email: 'info@bettermarawi.org',
    officialEmail: 'lgu.marawicity@gmail.com',
  },
};

export const EMERGENCY_HOTLINES: HotlineItem[] = [
  {
    id: 'cdrrmo',
    label: 'CDRRMO',
    shortLabel: 'CDRRMO',
    number: '(063) 352-0117',
    telHref: 'tel:+63633520117',
    icon: 'Siren',
  },
  {
    id: 'bfp',
    label: 'City Fire Station (BFP)',
    shortLabel: 'BFP Fire',
    number: '0917-842-9910',
    telHref: 'tel:+639178429910',
    icon: 'Flame',
  },
  {
    id: 'pnp',
    label: 'City Police Station (PNP)',
    shortLabel: 'PNP Police',
    number: '0998-598-6678',
    telHref: 'tel:+639985986678',
    icon: 'Shield',
  },
  {
    id: 'cho-apmc',
    label: 'City Health Office / APMC',
    shortLabel: 'CHO / APMC',
    number: '(063) 221-2536',
    telHref: 'tel:+63632212536',
    icon: 'HeartPulse',
  },
];

export const NAV_DROPDOWNS: Record<'services' | 'government' | 'transparency' | 'statistics', NavSubItem[]> = {
  services: [
    {
      label: 'Health Services',
      href: '/services/health-services',
      description: 'Free check-ups, PhilHealth YAKAP, vaccines, CHO & APMC medical programs.',
    },
    {
      label: 'Education',
      href: '/services/education',
      description: 'Daycare, public schools, Toril/Madrasah enrollment, and MSU/city scholarships.',
    },
    {
      label: 'Business and Livelihood',
      href: '/services/business-and-livelihood',
      description: "Mayor's permits, BPLO tax renewal, Halal trade certification & livelihood grants.",
    },
    {
      label: 'Social Welfare',
      href: '/services/social-welfare',
      description: 'AICS, CSWDO, MSSD-BARMM support for seniors, PWDs, solo parents & IDPs.',
    },
    {
      label: 'Agriculture & Fisheries',
      href: '/services/agriculture-and-fisheries',
      description: 'Lake Lanao fishing registration, highland farm inputs, seeds & veterinary care.',
    },
    {
      label: 'Infrastructure & Public Works',
      href: '/services/infrastructure-and-public-works',
      description: 'Road & drainage reporting, water supply connections, and public markets.',
    },
    {
      label: 'Garbage and Waste Disposal',
      href: '/services/garbage-and-waste-disposal',
      description: 'Barangay collection schedules, segregation guidelines & solid waste management.',
    },
    {
      label: 'Environment',
      href: '/services/environment',
      description: 'Lake Lanao conservation, Agus watershed protection & tree planting programs.',
    },
    {
      label: 'Disaster Preparedness',
      href: '/services/disaster-preparedness',
      description: 'CDRRMO emergency response, early warning alerts & evacuation plans.',
    },
    {
      label: 'Housing & Land Use',
      href: '/services/housing-and-land-use',
      description: 'Permanent shelter rehabilitation, CPDO zoning clearance & OBO building permits.',
    },
    {
      label: 'Tourism',
      href: '/services/tourism',
      description: 'Cultural landmarks, Lake Lanao views, Torogan heritage & highland climate.',
    },
  ],
  government: [
    {
      label: 'Departments & Officials',
      href: '/government/departments-and-officials',
      description: 'Mandates, service windows, department heads, and direct contact directories.',
    },
    {
      label: 'Legislative',
      href: '/government/legislative',
      description: 'Sangguniang Panlungsod city ordinances, resolutions, and standing committees.',
    },
    {
      label: 'Local Officials Directory',
      href: '/government/local-officials-directory',
      description: 'Elected City Mayor, Vice Mayor, City Councilors, and Sectoral Representatives.',
    },
  ],
  transparency: [
    {
      label: 'Full Disclosure Policy (FDP)',
      href: '/transparency/full-disclosure-policy',
      description: 'DILG-mandated quarterly financial statements, SRE, SEF & bid results.',
    },
    {
      label: 'Transparency Documents',
      href: '/transparency/transparency-documents',
      description: 'Procurement notices, BAC awards, COA audit status & executive orders.',
    },
    {
      label: 'Reports & Statistics',
      href: '/transparency/reports-and-statistics',
      description: 'Local government performance metrics, SGLG compliance & fiscal scorecards.',
    },
    {
      label: 'Annual Budget',
      href: '/transparency/annual-budget',
      description: 'FY 2026 General Appropriation Ordinance breakdown by sector and fund source.',
    },
    {
      label: 'Freedom of Information (FOI)',
      href: '/transparency/freedom-of-information',
      description: 'Citizen guide to filing official public record requests under the Marawi FOI Manual.',
    },
  ],
  statistics: [
    {
      label: 'City Profile',
      href: '/statistics/city-profile',
      description: 'Geographic, demographic, economic & highland basin profile of Marawi City.',
    },
    {
      label: 'DTI CMCI Profile',
      href: '/statistics/dti-cmci-profile',
      description: 'Cities and Municipalities Competitiveness Index across 5 core pillars.',
    },
    {
      label: 'Barangay Data',
      href: '/statistics/barangay-data',
      description: 'Complete searchable directory and census data of all 96 Barangays.',
    },
    {
      label: 'Open Data PH',
      href: '/statistics/open-data-ph',
      description: 'Machine-readable CSV/JSON datasets on population, budget, health & business.',
    },
  ],
};
