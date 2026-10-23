import { Verification } from '@/types';

/**
 * City of Marawi finances: actual results recorded by the Bureau of Local Government Finance
 * (BLGF), not the planned budget. Copied from https://lgu.betterbarmm.com/lanao-del-sur/marawi
 * (retrieved 2026-10-23), which cites the BLGF records below.
 * Amounts are in millions of pesos, as shown there. null = no record (shown as "—"), never 0.
 */
export const FINANCE_SOURCE: Verification = {
  level: 'sourced',
  source: 'Bureau of Local Government Finance (BLGF), Statement of Receipts and Expenditures',
  sourceUrl: 'https://blgf.gov.ph/lgu-fiscal-data/',
  retrievedOn: '2026-10-23',
};

export interface FinanceYear {
  year: number;
  localTaxes: number | null;
  nta: number | null;
  otherTransfers: number | null;
  operatingIncome: number | null;
  operatingSpending: number | null;
  capitalOutlay: number | null;
  borrowed: number | null;
  debtService: number | null;
  cashYearEnd: number | null;
}

export const FINANCE_ACTUALS: FinanceYear[] = [
  { year: 2021, localTaxes: 32.2, nta: 755.8, otherTransfers: 62.2, operatingIncome: 850.2, operatingSpending: 709.8, capitalOutlay: 0, borrowed: 0, debtService: 3.8, cashYearEnd: 222.7 },
  { year: 2022, localTaxes: 38.3, nta: 1010, otherTransfers: 20.6, operatingIncome: 1070, operatingSpending: 0, capitalOutlay: 0, borrowed: 0, debtService: 0, cashYearEnd: 1200 },
  { year: 2023, localTaxes: 40.2, nta: 862.5, otherTransfers: 133.6, operatingIncome: 1040, operatingSpending: 728.6, capitalOutlay: 43.0, borrowed: 0, debtService: 10.2, cashYearEnd: 190.4 },
  { year: 2024, localTaxes: 53.1, nta: 913.8, otherTransfers: 5.2, operatingIncome: 972.1, operatingSpending: 822.6, capitalOutlay: 139.2, borrowed: 0, debtService: 10.2, cashYearEnd: 13.9 },
  { year: 2025, localTaxes: 58.4, nta: 1080, otherTransfers: 6.5, operatingIncome: 1150, operatingSpending: 883.4, capitalOutlay: 21.7, borrowed: 0, debtService: 10.2, cashYearEnd: 236.2 },
];

/** BLGF's FY2025 figures are a preliminary release */
export const PRELIMINARY_YEAR = 2025;

/** Values kept exactly as BLGF records them, though they look unusual */
export const FINANCE_FOOTNOTES: { year: number; field: keyof FinanceYear; note: string }[] = [
  { year: 2022, field: 'operatingSpending', note: 'As recorded by BLGF' },
  { year: 2022, field: 'cashYearEnd', note: 'As recorded by BLGF' },
];

/** FY2025 operating spending by sector, grouped as BLGF's statement groups it (capital outlay excluded) */
export const SPENDING_BY_SECTOR = {
  year: 2025,
  sectors: [
    { name: 'General public services', millions: 539.3, share: 61 },
    { name: 'Economic services', millions: 158.9, share: 18 },
    { name: 'Other social services', millions: 122.3, share: 14 },
    { name: 'Health', millions: 48.6, share: 6 },
    { name: 'Education', millions: 12.9, share: 1 },
    { name: 'Interest on debt', millions: 1.3, share: 0 },
  ],
};

/** Local Disaster Risk Reduction and Management Fund: appropriated vs. spent (BLGF) */
export const LDRRMF: { year: number; appropriated: number; spent: number; shareUsed: number }[] = [
  { year: 2018, appropriated: 28.3, spent: 28.3, shareUsed: 100 },
  { year: 2019, appropriated: 31.2, spent: 22.7, shareUsed: 73 },
  { year: 2020, appropriated: 36.6, spent: 34.4, shareUsed: 94 },
  { year: 2021, appropriated: 39.3, spent: 32.3, shareUsed: 82 },
  { year: 2022, appropriated: 52.9, spent: 52.9, shareUsed: 100 },
  { year: 2023, appropriated: 45.0, spent: 31.5, shareUsed: 70 },
  { year: 2024, appropriated: 47.5, spent: 47.5, shareUsed: 100 },
  { year: 2025, appropriated: 56.0, spent: 36.1, shareUsed: 64 },
];

/** Special Education Fund: collected vs. spent (BLGF) */
export const SEF: { year: number; collected: number | null; spent: number | null }[] = [
  { year: 2018, collected: 1.1, spent: null },
  { year: 2019, collected: 2.8, spent: 1.4 },
  { year: 2020, collected: 2.1, spent: 2.1 },
  { year: 2021, collected: 3.1, spent: 3.1 },
  { year: 2022, collected: 3.6, spent: 3.6 },
  { year: 2023, collected: 2.9, spent: 2.5 },
  { year: 2024, collected: 2.7, spent: 2.5 },
  { year: 2025, collected: 2.3, spent: 2.1 },
];
