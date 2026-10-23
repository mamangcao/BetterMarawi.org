import { Verification } from '@/types';

/**
 * Audit and national funding records for the City of Marawi. Copied from
 * https://lgu.betterbarmm.com/lanao-del-sur/marawi (retrieved 2026-10-23); each record cites the
 * official document it comes from. Amounts are in millions of pesos.
 */
const RETRIEVED = '2026-10-23';
const COA_REPORT =
  'https://www.coa.gov.ph/phocadownloadpap/userupload/annual_audit_report/LGUs/2020/BARMM/Cities/Lanao-del-Sur/MarawiCity_LDS_ES2020.pdf';

/** Commission on Audit, annual audit report for FY2020 (Executive Summary) */
export const AUDIT_FY2020 = {
  level: 'sourced',
  source: 'Commission on Audit (COA), Annual Audit Report FY2020, Executive Summary',
  sourceUrl: COA_REPORT,
  retrievedOn: RETRIEVED,
  fiscalYear: 2020,
  opinion: 'Qualified',
  observations: 9,
  disallowedMillions: 0,
  suspendedMillions: 18.0,
  priorActedOn: 8,
  priorTotal: 9,
  priorPartly: 1,
  keyObservations: [
    'The road network balance cannot be verified: the city has no road network report, physical count, or ledger cards.',
    'Property and equipment were not depreciated.',
    'Unspent funds from other agencies’ programs were not returned.',
    'Fuel spending could not be verified because drivers did not submit monthly consumption reports.',
    'Purchases of goods are of doubtful validity because purchase orders were incomplete.',
    'Long-overdue receivables remain on the books without analysis or write-off.',
  ],
  reportUrl: COA_REPORT,
  archiveUrl: `https://web.archive.org/web/20220104024023/${COA_REPORT}`,
} satisfies Verification & Record<string, unknown>;

const DBM: Verification = {
  level: 'sourced',
  source: 'Department of Budget and Management (DBM), Local Government Support Fund',
  sourceUrl: 'https://www.dbm.gov.ph/',
  retrievedOn: RETRIEVED,
};

/** Local Government Support Fund projects for the City of Marawi (DBM) */
export const LGSF_PROJECTS: (Verification & { title: string; fiscalYear: number; program: string; allottedMillions: number; releasedMillions: number })[] = [
  { ...DBM, title: 'Assistance to Indigent Individuals or Families: food assistance (rice distribution)', fiscalYear: 2026, program: 'FALGU', allottedMillions: 39.0, releasedMillions: 39.0 },
  { ...DBM, title: 'Construction of Public Park in the City of Marawi', fiscalYear: 2024, program: 'GGG', allottedMillions: 10.8, releasedMillions: 10.8 },
];

const DBM_FILES = 'https://www.dbm.gov.ph/wp-content/uploads';
const release = (date: string, kind: 'NCA' | 'SARO', amountMillions: number, purpose: string, path: string) => ({
  level: 'sourced' as const,
  source: kind === 'NCA' ? 'DBM, Notice of Cash Allocation (NCA) releases' : 'DBM, Special Allotment Release Order (SARO) releases',
  sourceUrl: `${DBM_FILES}/${path}`,
  retrievedOn: RETRIEVED,
  date,
  kind,
  amountMillions,
  purpose,
  url: `${DBM_FILES}/${path}`,
});

/** National releases to the City of Marawi. A release is an allotment or cash, not spending. */
export const NATIONAL_RELEASES = [
  release('2020-04-14', 'NCA', 558.2, 'NDRRM Fund, FY2019 Marawi recovery programs', 'NCA/2020/NCA-2020.pdf'),
  release('2020-04-15', 'SARO', 558.2, 'FY2019 Marawi recovery programs', 'SARO/2020/SARO-2020.pdf'),
  release('2021-05-07', 'NCA', 730.7, 'NDRRM Fund, FY2021 Marawi recovery programs', 'NCA/2021/NCA-Releases-FY-2021.pdf'),
  release('2021-05-07', 'SARO', 730.7, 'FY2021 Marawi recovery programs', 'SARO/2021/SARO-Releases-FY-2021.pdf'),
  release('2021-06-02', 'NCA', 380.0, 'Lake Lanao Promenade construction', 'NCA/2021/NCA-Releases-FY-2021.pdf'),
  release('2021-06-03', 'SARO', 380.0, 'Lake Lanao Promenade construction', 'SARO/2021/SARO-Releases-FY-2021.pdf'),
  release('2021-06-23', 'NCA', 100.0, 'NDRRM Fund, FY2021 Marawi recovery programs', 'NCA/2021/NCA-Releases-FY-2021.pdf'),
  release('2021-06-23', 'SARO', 100.0, 'FY2021 Marawi recovery programs', 'SARO/2021/SARO-Releases-FY-2021.pdf'),
  release('2021-11-24', 'SARO', 50.0, 'FY2021 Marawi recovery programs', 'SARO/2021/SARO-Releases-FY-2021.pdf'),
  release('2021-11-26', 'NCA', 50.0, 'NDRRM Fund, FY2021 Marawi recovery program', 'NCA/2021/NCA-Releases-FY-2021.pdf'),
  release('2022-05-12', 'SARO', 84.0, 'FY2022 Marawi recovery programs', 'SARO/2022/UPDATED_SARO_2022.pdf'),
  release('2022-05-13', 'NCA', 84.0, 'NDRRM Fund, FY2022 Marawi recovery programs', 'NCA/2022/NCA-Releases-FY-2022.pdf'),
  release('2025-11-11', 'NCA', 10.8, 'LGSF Green program, City of Marawi project', 'NCA/2025/NCA_2025.pdf'),
];
