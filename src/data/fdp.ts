import { FDPDocument, FDPFile, Verification } from '@/types';

/**
 * Full Disclosure Policy documents of the City of Marawi, as posted on the DILG FDP Portal.
 * Copied from the portal links listed on https://lgu.betterbarmm.com/lanao-del-sur/marawi
 * (retrieved 2026-10-23). Each file links to DILG directly. Update each quarter
 * (docs/DATA_UPDATE_GUIDE.md).
 */
export const FDP_YEAR = 2026;

/** All of Marawi's postings on the DILG portal */
export const FDP_PORTAL_URL =
  'https://fdpp.dilg.gov.ph/fdpp/report/index?region_filter=19&province_filter=036&lgu_filter=17';

const DILG: Verification = {
  level: 'sourced',
  source: 'DILG Full Disclosure Policy Portal',
  sourceUrl: FDP_PORTAL_URL,
  retrievedOn: '2026-10-23',
};

const file = (period: FDPFile['period'], id: number): FDPFile => ({
  period,
  url: `https://fdpp.dilg.gov.ph/fdpp/report/document-download?id=${id}`,
});
const quarters = (q1: number, q2: number, q3: number): FDPFile[] => [file('Q1', q1), file('Q2', q2), file('Q3', q3)];

export const FDP_DOCUMENTS: FDPDocument[] = [
  { ...DILG, filterId: 1, title: 'Annual Budget Report', frequency: 'Annual', procurement: false, files: [file('Annual', 227136)] },
  { ...DILG, filterId: 2, title: 'Annual Gender and Development Accomplishment Report', frequency: 'Annual', procurement: false, files: [] },
  { ...DILG, filterId: 3, title: 'Annual Procurement Plan', frequency: 'Annual', procurement: true, files: [file('Annual', 227146)] },
  { ...DILG, filterId: 17, title: 'Supplemental Procurement Plan', frequency: 'Annual', procurement: true, files: [] },
  { ...DILG, filterId: 7, title: 'Statement of Indebtedness, Payments and Balances', frequency: 'Quarterly', procurement: false, files: quarters(240265, 263540, 267703) },
  { ...DILG, filterId: 8, title: '20% of the National Tax Allotment Utilization', frequency: 'Quarterly', procurement: false, files: quarters(240245, 263535, 267708) },
  { ...DILG, filterId: 9, title: 'Bid Results on Civil Works, Goods and Services and Consulting Services', frequency: 'Quarterly', procurement: true, files: quarters(242723, 263557, 267698) },
  { ...DILG, filterId: 10, title: 'Local Disaster Risk Reduction and Management Fund Utilization', frequency: 'Quarterly', procurement: false, files: quarters(240255, 263538, 267699) },
  { ...DILG, filterId: 11, title: 'Manpower Complement', frequency: 'Quarterly', procurement: false, files: quarters(242724, 263532, 267700) },
  { ...DILG, filterId: 12, title: 'Statement of Receipts and Expenditures', frequency: 'Quarterly', procurement: false, files: quarters(240273, 263548, 267704) },
  { ...DILG, filterId: 13, title: 'Trust Fund Utilization', frequency: 'Quarterly', procurement: false, files: quarters(242725, 263550, 267705) },
  { ...DILG, filterId: 14, title: 'Quarterly Statement of Cash Flow', frequency: 'Quarterly', procurement: false, files: quarters(240261, 263583, 267701) },
  { ...DILG, filterId: 15, title: 'Report of Special Education Fund Utilization', frequency: 'Quarterly', procurement: false, files: quarters(240263, 263539, 267702) },
  { ...DILG, filterId: 16, title: 'Unliquidated Cash Advances', frequency: 'Quarterly', procurement: false, files: quarters(240277, 263551, 267706) },
];
