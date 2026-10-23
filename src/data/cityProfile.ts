import { Verification } from '@/types';

/**
 * City history and derived figures. History entries are limited to those with an official
 * source (the law itself), as listed on https://lgu.betterbarmm.com/lanao-del-sur/marawi
 * (retrieved 2026-10-23).
 */
export const CITY_HISTORY: (Verification & { year: number; title: string; text: string })[] = [
  {
    year: 1940,
    title: 'Dansalan becomes a city',
    text: 'Commonwealth Act No. 592 made Dansalan a city.',
    level: 'sourced',
    source: 'Commonwealth Act No. 592',
    sourceUrl: 'https://lawyerly.ph/laws/view/l8fc0',
    retrievedOn: '2026-10-23',
  },
  {
    year: 1956,
    title: 'Renamed Marawi',
    text: 'Republic Act No. 1552 renamed the city Marawi.',
    level: 'sourced',
    source: 'Republic Act No. 1552',
    sourceUrl: 'https://lawphil.net/statutes/repacts/ra1956/ra_1552_1956.html',
    retrievedOn: '2026-10-23',
  },
];

/** PSA figures already shown on the City Profile page */
const POPULATION_2024 = 259993;
const POPULATION_2020 = 207010;
const LAND_AREA_KM2 = 87.55;

export const CITY_FIGURES: Verification & { densityPerKm2: number; growthSince2020Pct: number } = {
  level: 'sourced',
  source: 'Philippine Statistics Authority (PSA): 2020 and 2024 census population, PSGC land area',
  sourceUrl: 'https://psa.gov.ph/content/highlights-bangsamoro-autonomous-region-muslim-mindanao-barmm-population-2024-census',
  retrievedOn: '2026-10-23',
  densityPerKm2: Math.round(POPULATION_2024 / LAND_AREA_KM2),
  growthSince2020Pct: Math.round((POPULATION_2024 / POPULATION_2020 - 1) * 1000) / 10,
};
