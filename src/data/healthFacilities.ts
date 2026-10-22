// Health facilities in the Islamic City of Marawi.
// Every figure here comes from a public source listed in HEALTH_SOURCES.
// Do not add facilities, counts, or contact details without a source.

export interface HealthSource {
  id: string;
  label: string;
  url: string;
  date: string;
}

export const HEALTH_SOURCES: Record<string, HealthSource> = {
  philhealth: {
    id: 'philhealth',
    label: 'PhilHealth, List of Accredited Hospitals and Infirmaries for CY 2026',
    url: 'https://www.philhealth.gov.ph/partners/providers/facilities/accredited/HOSP_093026.pdf',
    date: 'Updated as of September 30, 2026',
  },
  piaCho2023: {
    id: 'piaCho2023',
    label: 'Philippine Information Agency (PIA), report on the Marawi City Health Office',
    url: 'https://mirror.pia.gov.ph/news/2023/06/09/paghatag-kalidad-nga-serbisyo-sa-panglawas-mas-gipauswag-pa-cho-marawi',
    date: 'June 9, 2023',
  },
  barmmBhs2021: {
    id: 'barmmBhs2021',
    label: 'Bangsamoro Government, MOH turns over 3 barangay health stations in Marawi City',
    url: 'https://bangsamoro.gov.ph/news/latest-news/moh-turns-over-3-barangay-health-stations-in-marawi-city/',
    date: 'September 28, 2021',
  },
  piaMcgh2026: {
    id: 'piaMcgh2026',
    label: 'PIA, Government pushes completion of Marawi City General Hospital',
    url: 'https://pia.gov.ph/news/mindanao/barmm/government-pushes-completion-of-marawi-city-general-hospital',
    date: 'October 2026',
  },
  ra12207: {
    id: 'ra12207',
    label: 'Republic Act No. 12207 (APMC bed capacity increased to 800)',
    url: 'https://www.lawphil.net/statutes/repacts/ra2025/ra_12207_2025.html',
    date: 'May 8, 2025',
  },
};

export type FacilitySector = 'Government' | 'Private';

export interface AccreditedFacility {
  name: string;
  /** PhilHealth category: hospital service level, or infirmary/dispensary */
  level: 'Level 3' | 'Level 2' | 'Level 1' | 'Infirmary';
  /** PhilHealth-accredited beds (not necessarily the authorized bed capacity) */
  beds: number;
  sector: FacilitySector;
  /** Street / barangay exactly as listed by PhilHealth */
  address: string;
  phone: string;
  note?: string;
}

/** Hospitals in Marawi City accredited by PhilHealth (source: philhealth). */
export const MARAWI_HOSPITALS: AccreditedFacility[] = [
  {
    name: 'Amai Pakpak Medical Center (APMC)',
    level: 'Level 3',
    beds: 438,
    sector: 'Government',
    address: 'Bo. Datu Saber',
    phone: '0917 899 0640',
    note: 'DOH-run regional referral hospital. Authorized bed capacity raised to 800 by RA 12207 (2025).',
  },
  {
    name: 'Mindalano Specialist Hospital Foundation, Inc.',
    level: 'Level 1',
    beds: 50,
    sector: 'Private',
    address: 'Panggao, Saduc Proper',
    phone: '0908 758 4496',
  },
  {
    name: 'Dr. Abdullah Hospital Foundation Inc.',
    level: 'Level 1',
    beds: 30,
    sector: 'Private',
    address: 'New Capitol, Brgy. Marawi',
    phone: '0917 585 8021',
  },
  {
    name: 'Salaam Hospital Foundation, Inc.',
    level: 'Level 1',
    beds: 30,
    sector: 'Private',
    address: 'Brgy. Papandayan',
    phone: '0917 718 0675',
  },
  {
    name: 'Al-Shiek Hospital II',
    level: 'Level 1',
    beds: 28,
    sector: 'Private',
    address: 'Brgy. Biaba-Damag',
    phone: '0917 701 0022',
  },
];

/** Infirmaries in Marawi City accredited by PhilHealth (source: philhealth). */
export const MARAWI_INFIRMARIES: AccreditedFacility[] = [
  {
    name: 'Ranao Family Medical Clinic',
    level: 'Infirmary',
    beds: 12,
    sector: 'Private',
    address: '092 Panggao Saduc',
    phone: '0917 273 4706',
  },
  {
    name: 'Marawi Midtown Infirmary',
    level: 'Infirmary',
    beds: 10,
    sector: 'Private',
    address: 'Amai Pakpak Avenue, Basak Malutlut',
    phone: '0955 930 2852',
  },
  {
    name: 'Ranao Doctors Infirmary',
    level: 'Infirmary',
    beds: 10,
    sector: 'Private',
    address: '07 Omar Dianalan St., Saduc',
    phone: '0917 203 6490',
  },
  {
    name: 'Hijrah Infirmary',
    level: 'Infirmary',
    beds: 5,
    sector: 'Private',
    address: '35 Baguindali St., Brgy. Marawi Poblacion',
    phone: '0927 228 9577',
  },
];

/** City Health Office facilities (source: piaCho2023). */
export const CITY_HEALTH_OFFICE = {
  name: 'Marawi City Health Office (CHO) · City Health Unit',
  description:
    'The city government’s main public health office. Its City Health Unit, opened in June 2023, includes a 24/7 birthing clinic.',
};

/** Rural Health Units by barangay (source: piaCho2023). */
export const RURAL_HEALTH_UNITS = ['Papandayan', 'Kilala', 'Timbangalan', 'Cabingan'];

/** Barangay-level facilities (source: piaCho2023), counts as reported in June 2023. */
export const BARANGAY_HEALTH = {
  stations: 30,
  stationsArea: 'less affected areas',
  centers: 24,
  centersArea: 'most affected area (MAA)',
  /** Stations confirmed by name in public reports (source: barmmBhs2021) */
  namedStations: ['Amito Marantao', 'Bacolod Chico', 'East Basak'],
};

/** Hospital under construction (source: piaMcgh2026). Bed figures differ across reports, so none is shown. */
export const UPCOMING_HOSPITAL = {
  name: 'Marawi City General Hospital',
  location: 'Brgy. Datu Naga',
  status:
    'Under construction and reported as nearly complete in October 2026, with full operations expected in 2027. Once open, it will be run by the Marawi City government. Part of the building already operates as a BUCAS (Bagong Urgent Care and Ambulatory Service) center under APMC.',
};
