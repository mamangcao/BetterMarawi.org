import { NavSubItem, HotlineItem } from '@/types';
import { getRoute } from '@/lib/routes';

export const SITE_CONFIG = {
  name: 'BetterMarawi.org',
  tagline: 'Islamic City of Marawi Citizen Services & Transparency Portal',
  description:
    'A community-run portal to find information and services of the Islamic City of Marawi, Lanao del Sur. Access Citizen\'s Charter guides, PhilHealth YAKAP, transparency disclosures, and 101 barangay statistics.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://bettermarawi.org',
  // Site version shown in the footer. v1.0.0 is the official launch version.
  // Bump on releases (major: big feature or redesign, minor: new pages or
  // datasets, patch: fixes) and keep "version" in package.json in sync.
  version: '1.0.0',
  geo: {
    latitude: 8.0034,
    longitude: 124.2851,
    region: 'PH-BAS',
    placename: 'Islamic City of Marawi',
  },
  contact: {
    // Source: DTI CMCI LGU profile (cmci.dti.gov.ph), retrieved October 21, 2026
    cityHallAddress: 'City Hall Complex, Brgy. Fort, Marawi City, Lanao del Sur',
    // The city has no official website; this Facebook page is the LGU link listed on DTI CMCI
    facebookUrl: 'https://www.facebook.com/marawicitygovernment',
    facebookLabel: 'Marawi City Government on Facebook',
    // Site contact for BetterMarawi.org itself (not a city government address)
    email: 'info@bettermarawi.org',
    // Removed Oct 23, 2026 (unused and unsourced): City Hall trunkline (063) 520-2100, emergency
    // line (063) 520-2911, CDRRMO (063) 520-3000 (conflicts with the CDRRMO number in
    // EMERGENCY_HOTLINES), and an "official" Gmail address. Add a contact here only with a source.
  },
};

// 911 is sourced (EO 56, s. 2018); BFP and APMC were confirmed by the site owner (Oct 23, 2026).
// CDRRMO and PNP have no source yet, so the UI labels them "Unverified" (see docs/VERIFICATION_CHECKLIST.md, section 1).
export const EMERGENCY_HOTLINES: HotlineItem[] = [
  {
    id: 'ph-911',
    label: 'National Emergency Hotline',
    shortLabel: 'Emergency 911',
    number: '911',
    telHref: 'tel:911',
    icon: 'Siren',
    level: 'sourced',
    source: 'Executive Order No. 56, s. 2018 (Emergency 911 as the nationwide emergency hotline)',
    sourceUrl: 'https://elibrary.judiciary.gov.ph/thebookshelf/showdocs/5/83090',
    retrievedOn: '2026-10-23',
  },
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
    number: '0907-022-4843',
    telHref: 'tel:+639070224843',
    icon: 'Flame',
    level: 'confirmed',
    verified: true,
    source: 'BFP Marawi number confirmed by the BetterMarawi.org team (site owner)',
    verifiedOn: '2026-10-23',
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
    id: 'apmc',
    label: 'Amai Pakpak Medical Center (APMC)',
    shortLabel: 'APMC',
    number: '(063) 876 0001',
    telHref: 'tel:+63638760001',
    icon: 'HeartPulse',
    level: 'confirmed',
    verified: true,
    source: 'APMC number confirmed by the BetterMarawi.org team (site owner)',
    verifiedOn: '2026-10-23',
  },
];

/**
 * Dropdown menus. Labels, links, and descriptions come from the route registry (src/lib/routes.ts),
 * so the menus, hub cards, breadcrumbs, and sitemap use the same names. Only the order is set here.
 */
const navItems = (paths: string[]): NavSubItem[] =>
  paths.map((p) => {
    const { label, path, description } = getRoute(p);
    return { label, href: path, description };
  });

export const NAV_DROPDOWNS: Record<'services' | 'government' | 'transparency' | 'statistics', NavSubItem[]> = {
  services: navItems([
    '/services/certificates',
    '/services/health-services',
    '/services/education',
    '/services/business-and-livelihood',
    '/services/social-welfare',
    '/services/agriculture-and-fisheries',
    '/services/infrastructure-and-public-works',
    '/services/garbage-and-waste-disposal',
    '/services/environment',
    '/services/disaster-preparedness',
    '/services/housing-and-land-use',
    '/services/tourism',
  ]),
  government: navItems([
    '/government/departments-and-officials',
    '/government/legislative',
    '/government/local-officials-directory',
  ]),
  transparency: navItems([
    '/transparency/full-disclosure-policy',
    '/transparency/transparency-documents',
    '/transparency/reports-and-statistics',
    '/transparency/annual-budget',
    '/transparency/freedom-of-information',
  ]),
  statistics: navItems([
    '/statistics/city-profile',
    '/statistics/dti-cmci-profile',
    '/statistics/barangay-data',
    '/statistics/open-data-ph',
  ]),
};
