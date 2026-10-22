export interface RouteItem {
  path: string;
  label: string;
  category: 'core' | 'services' | 'government' | 'transparency' | 'statistics';
  description: string;
  priority: number;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  breadcrumbs: { name: string; url: string }[];
}

const BASE_URL = 'https://bettermarawi.org';

export const APP_ROUTES: RouteItem[] = [
  // Core routes
  {
    path: '/',
    label: 'Home',
    category: 'core',
    description: 'Civic services and transparency portal for the Islamic City of Marawi, Lanao del Sur.',
    priority: 1.0,
    changefreq: 'daily',
    breadcrumbs: [{ name: 'Home', url: BASE_URL }],
  },
  {
    path: '/services',
    label: 'Services Directory',
    category: 'services',
    description: 'Comprehensive directory of 12 local government citizen services and charters.',
    priority: 0.9,
    changefreq: 'weekly',
    breadcrumbs: [
      { name: 'Home', url: BASE_URL },
      { name: 'Services', url: `${BASE_URL}/services` },
    ],
  },
  // 12 Services (11 charter services + Certificates & Clearances)
  {
    path: '/services/health-services',
    label: 'Health Services',
    category: 'services',
    description: 'Free check-ups, PhilHealth YAKAP, vaccines, CHO & APMC medical programs.',
    priority: 0.9,
    changefreq: 'weekly',
    breadcrumbs: [
      { name: 'Home', url: BASE_URL },
      { name: 'Services', url: `${BASE_URL}/services` },
      { name: 'Health Services', url: `${BASE_URL}/services/health-services` },
    ],
  },
  {
    path: '/services/education',
    label: 'Education',
    category: 'services',
    description: 'Daycare, public schools, Toril/Madrasah enrollment, and MSU/city scholarships.',
    priority: 0.9,
    changefreq: 'weekly',
    breadcrumbs: [
      { name: 'Home', url: BASE_URL },
      { name: 'Services', url: `${BASE_URL}/services` },
      { name: 'Education', url: `${BASE_URL}/services/education` },
    ],
  },
  {
    path: '/services/business-and-livelihood',
    label: 'Business and Livelihood',
    category: 'services',
    description: "Mayor's permits, BPLO tax renewal, Halal trade certification & livelihood grants.",
    priority: 0.9,
    changefreq: 'weekly',
    breadcrumbs: [
      { name: 'Home', url: BASE_URL },
      { name: 'Services', url: `${BASE_URL}/services` },
      { name: 'Business and Livelihood', url: `${BASE_URL}/services/business-and-livelihood` },
    ],
  },
  {
    path: '/services/social-welfare',
    label: 'Social Welfare',
    category: 'services',
    description: 'AICS, CSWDO, MSSD-BARMM support for seniors, PWDs, solo parents & IDPs.',
    priority: 0.9,
    changefreq: 'weekly',
    breadcrumbs: [
      { name: 'Home', url: BASE_URL },
      { name: 'Services', url: `${BASE_URL}/services` },
      { name: 'Social Welfare', url: `${BASE_URL}/services/social-welfare` },
    ],
  },
  {
    path: '/services/agriculture-and-fisheries',
    label: 'Agriculture & Fisheries',
    category: 'services',
    description: 'Lake Lanao fishing registration, highland farm inputs, seeds & veterinary care.',
    priority: 0.9,
    changefreq: 'weekly',
    breadcrumbs: [
      { name: 'Home', url: BASE_URL },
      { name: 'Services', url: `${BASE_URL}/services` },
      { name: 'Agriculture & Fisheries', url: `${BASE_URL}/services/agriculture-and-fisheries` },
    ],
  },
  {
    path: '/services/infrastructure-and-public-works',
    label: 'Infrastructure & Public Works',
    category: 'services',
    description: 'Road & drainage reporting, water supply connections, and public markets.',
    priority: 0.9,
    changefreq: 'weekly',
    breadcrumbs: [
      { name: 'Home', url: BASE_URL },
      { name: 'Services', url: `${BASE_URL}/services` },
      { name: 'Infrastructure & Public Works', url: `${BASE_URL}/services/infrastructure-and-public-works` },
    ],
  },
  {
    path: '/services/garbage-and-waste-disposal',
    label: 'Garbage & Waste Disposal',
    category: 'services',
    description: 'Barangay collection schedules, segregation guidelines & solid waste management.',
    priority: 0.9,
    changefreq: 'weekly',
    breadcrumbs: [
      { name: 'Home', url: BASE_URL },
      { name: 'Services', url: `${BASE_URL}/services` },
      { name: 'Garbage & Waste Disposal', url: `${BASE_URL}/services/garbage-and-waste-disposal` },
    ],
  },
  {
    path: '/services/environment',
    label: 'Environment',
    category: 'services',
    description: 'Lake Lanao conservation, Agus watershed protection & tree planting programs.',
    priority: 0.9,
    changefreq: 'weekly',
    breadcrumbs: [
      { name: 'Home', url: BASE_URL },
      { name: 'Services', url: `${BASE_URL}/services` },
      { name: 'Environment', url: `${BASE_URL}/services/environment` },
    ],
  },
  {
    path: '/services/disaster-preparedness',
    label: 'Disaster Preparedness',
    category: 'services',
    description: 'CDRRMO emergency response, early warning alerts & evacuation plans.',
    priority: 0.9,
    changefreq: 'weekly',
    breadcrumbs: [
      { name: 'Home', url: BASE_URL },
      { name: 'Services', url: `${BASE_URL}/services` },
      { name: 'Disaster Preparedness', url: `${BASE_URL}/services/disaster-preparedness` },
    ],
  },
  {
    path: '/services/housing-and-land-use',
    label: 'Housing & Land Use',
    category: 'services',
    description: 'Permanent shelter rehabilitation, CPDO zoning clearance & OBO building permits.',
    priority: 0.9,
    changefreq: 'weekly',
    breadcrumbs: [
      { name: 'Home', url: BASE_URL },
      { name: 'Services', url: `${BASE_URL}/services` },
      { name: 'Housing & Land Use', url: `${BASE_URL}/services/housing-and-land-use` },
    ],
  },
  {
    path: '/services/certificates',
    label: 'Certificates & Clearances',
    category: 'services',
    description: 'Birth, marriage, and death certificates, CENOMAR, barangay, police, and NBI clearances, cedula, and more.',
    priority: 0.9,
    changefreq: 'weekly',
    breadcrumbs: [
      { name: 'Home', url: BASE_URL },
      { name: 'Services', url: `${BASE_URL}/services` },
      { name: 'Certificates & Clearances', url: `${BASE_URL}/services/certificates` },
    ],
  },
  {
    path: '/services/tourism',
    label: 'Tourism',
    category: 'services',
    description: 'Cultural landmarks, Lake Lanao views, Torogan heritage & highland climate.',
    priority: 0.9,
    changefreq: 'weekly',
    breadcrumbs: [
      { name: 'Home', url: BASE_URL },
      { name: 'Services', url: `${BASE_URL}/services` },
      { name: 'Tourism', url: `${BASE_URL}/services/tourism` },
    ],
  },
  // Government routes
  {
    path: '/government',
    label: 'Government Overview',
    category: 'government',
    description: 'City government leadership, executive departments, and legislative council.',
    priority: 0.9,
    changefreq: 'weekly',
    breadcrumbs: [
      { name: 'Home', url: BASE_URL },
      { name: 'Government', url: `${BASE_URL}/government` },
    ],
  },
  {
    path: '/government/departments-and-officials',
    label: 'Departments & Officials',
    category: 'government',
    description: 'Mandates, service windows, department heads, and direct contact directories.',
    priority: 0.85,
    changefreq: 'monthly',
    breadcrumbs: [
      { name: 'Home', url: BASE_URL },
      { name: 'Government', url: `${BASE_URL}/government` },
      { name: 'Departments & Officials', url: `${BASE_URL}/government/departments-and-officials` },
    ],
  },
  {
    path: '/government/legislative',
    label: 'Legislative (Sangguniang Panlungsod)',
    category: 'government',
    description: 'City ordinances, resolutions, committees, and council proceedings.',
    priority: 0.85,
    changefreq: 'weekly',
    breadcrumbs: [
      { name: 'Home', url: BASE_URL },
      { name: 'Government', url: `${BASE_URL}/government` },
      { name: 'Legislative', url: `${BASE_URL}/government/legislative` },
    ],
  },
  {
    path: '/government/local-officials-directory',
    label: 'Local Officials Directory',
    category: 'government',
    description: 'Mayor, Vice Mayor, City Councilors, and Ex-Officio Sectoral Representatives.',
    priority: 0.85,
    changefreq: 'monthly',
    breadcrumbs: [
      { name: 'Home', url: BASE_URL },
      { name: 'Government', url: `${BASE_URL}/government` },
      { name: 'Local Officials Directory', url: `${BASE_URL}/government/local-officials-directory` },
    ],
  },
  // Transparency routes
  {
    path: '/transparency',
    label: 'Transparency Portal',
    category: 'transparency',
    description: 'Full Disclosure Policy, annual budget, COA compliance, and FOI portal.',
    priority: 0.9,
    changefreq: 'weekly',
    breadcrumbs: [
      { name: 'Home', url: BASE_URL },
      { name: 'Transparency', url: `${BASE_URL}/transparency` },
    ],
  },
  {
    path: '/transparency/full-disclosure-policy',
    label: 'Full Disclosure Policy (FDP)',
    category: 'transparency',
    description: 'DILG-mandated quarterly financial statements, SRE, SEF & bid results.',
    priority: 0.85,
    changefreq: 'weekly',
    breadcrumbs: [
      { name: 'Home', url: BASE_URL },
      { name: 'Transparency', url: `${BASE_URL}/transparency` },
      { name: 'Full Disclosure Policy (FDP)', url: `${BASE_URL}/transparency/full-disclosure-policy` },
    ],
  },
  {
    path: '/transparency/transparency-documents',
    label: 'Transparency Documents',
    category: 'transparency',
    description: 'Procurement notices, BAC awards, COA audit status & executive orders.',
    priority: 0.85,
    changefreq: 'weekly',
    breadcrumbs: [
      { name: 'Home', url: BASE_URL },
      { name: 'Transparency', url: `${BASE_URL}/transparency` },
      { name: 'Transparency Documents', url: `${BASE_URL}/transparency/transparency-documents` },
    ],
  },
  {
    path: '/transparency/reports-and-statistics',
    label: 'Reports & Statistics',
    category: 'transparency',
    description: 'Local government performance metrics, SGLG compliance & fiscal scorecards.',
    priority: 0.85,
    changefreq: 'monthly',
    breadcrumbs: [
      { name: 'Home', url: BASE_URL },
      { name: 'Transparency', url: `${BASE_URL}/transparency` },
      { name: 'Reports & Statistics', url: `${BASE_URL}/transparency/reports-and-statistics` },
    ],
  },
  {
    path: '/transparency/annual-budget',
    label: 'Annual Budget',
    category: 'transparency',
    description: 'FY 2026 General Appropriation Ordinance breakdown by sector and fund source.',
    priority: 0.85,
    changefreq: 'monthly',
    breadcrumbs: [
      { name: 'Home', url: BASE_URL },
      { name: 'Transparency', url: `${BASE_URL}/transparency` },
      { name: 'Annual Budget', url: `${BASE_URL}/transparency/annual-budget` },
    ],
  },
  {
    path: '/transparency/freedom-of-information',
    label: 'Freedom of Information (FOI)',
    category: 'transparency',
    description: 'Citizen guide to filing official public record requests under the Marawi FOI Manual.',
    priority: 0.85,
    changefreq: 'monthly',
    breadcrumbs: [
      { name: 'Home', url: BASE_URL },
      { name: 'Transparency', url: `${BASE_URL}/transparency` },
      { name: 'Freedom of Information (FOI)', url: `${BASE_URL}/transparency/freedom-of-information` },
    ],
  },
  // Statistics routes
  {
    path: '/statistics',
    label: 'Statistics & Data',
    category: 'statistics',
    description: 'City profile, DTI CMCI index, 101 barangay census, and open data datasets.',
    priority: 0.9,
    changefreq: 'weekly',
    breadcrumbs: [
      { name: 'Home', url: BASE_URL },
      { name: 'Statistics', url: `${BASE_URL}/statistics` },
    ],
  },
  {
    path: '/statistics/city-profile',
    label: 'City Profile',
    category: 'statistics',
    description: 'Geographic, demographic, economic & highland basin profile of Marawi City.',
    priority: 0.85,
    changefreq: 'monthly',
    breadcrumbs: [
      { name: 'Home', url: BASE_URL },
      { name: 'Statistics', url: `${BASE_URL}/statistics` },
      { name: 'City Profile', url: `${BASE_URL}/statistics/city-profile` },
    ],
  },
  {
    path: '/statistics/dti-cmci-profile',
    label: 'DTI CMCI Profile',
    category: 'statistics',
    description: 'Cities and Municipalities Competitiveness Index across 5 core pillars.',
    priority: 0.85,
    changefreq: 'monthly',
    breadcrumbs: [
      { name: 'Home', url: BASE_URL },
      { name: 'Statistics', url: `${BASE_URL}/statistics` },
      { name: 'DTI CMCI Profile', url: `${BASE_URL}/statistics/dti-cmci-profile` },
    ],
  },
  {
    path: '/statistics/barangay-data',
    label: 'Barangay Data',
    category: 'statistics',
    description: 'Complete searchable directory and census data of all 101 Barangays.',
    priority: 0.9,
    changefreq: 'weekly',
    breadcrumbs: [
      { name: 'Home', url: BASE_URL },
      { name: 'Statistics', url: `${BASE_URL}/statistics` },
      { name: 'Barangay Data', url: `${BASE_URL}/statistics/barangay-data` },
    ],
  },
  {
    path: '/statistics/open-data-ph',
    label: 'Open Data PH',
    category: 'statistics',
    description: 'Machine-readable CSV/JSON datasets on population, budget, health & business.',
    priority: 0.85,
    changefreq: 'monthly',
    breadcrumbs: [
      { name: 'Home', url: BASE_URL },
      { name: 'Statistics', url: `${BASE_URL}/statistics` },
      { name: 'Open Data PH', url: `${BASE_URL}/statistics/open-data-ph` },
    ],
  },
  // Contact & Sitemap
  {
    path: '/contact',
    label: 'Contact Us',
    category: 'core',
    description: 'Official hotlines, emergency directories, City Hall locations & citizen feedback.',
    priority: 0.8,
    changefreq: 'monthly',
    breadcrumbs: [
      { name: 'Home', url: BASE_URL },
      { name: 'Contact Us', url: `${BASE_URL}/contact` },
    ],
  },
  {
    path: '/sitemap',
    label: 'Sitemap & SEO Inspector',
    category: 'core',
    description: 'Complete URL tree, live Schema.org JSON-LD inspector, and sitemap downloads.',
    priority: 0.7,
    changefreq: 'weekly',
    breadcrumbs: [
      { name: 'Home', url: BASE_URL },
      { name: 'Sitemap & SEO Inspector', url: `${BASE_URL}/sitemap` },
    ],
  },
];

