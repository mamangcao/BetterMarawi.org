import React from 'react';
import { SourceNote, StatGrid, pesoMillions } from '@/components/ui';
import { chartColor } from '@/lib/palette';
import {
  FINANCE_ACTUALS,
  FINANCE_FOOTNOTES,
  FINANCE_SOURCE,
  FinanceYear,
  PRELIMINARY_YEAR,
  SPENDING_BY_SECTOR,
} from '@/data/finances';

const ROWS: { field: keyof FinanceYear; label: string; strong?: boolean }[] = [
  { field: 'localTaxes', label: 'Local taxes and fees' },
  { field: 'nta', label: 'National Tax Allotment (NTA)' },
  { field: 'otherTransfers', label: 'Other shares, transfers and grants' },
  { field: 'operatingIncome', label: 'Operating income', strong: true },
  { field: 'operatingSpending', label: 'Operating spending', strong: true },
  { field: 'capitalOutlay', label: 'Capital outlay' },
  { field: 'borrowed', label: 'Borrowed' },
  { field: 'debtService', label: 'Debt service (principal and interest)' },
  { field: 'cashYearEnd', label: 'Cash at year end' },
];

const card = 'bg-white rounded-xl border border-mist-200/90 p-6 sm:p-8';
const hasFootnote = (year: number, field: keyof FinanceYear) =>
  FINANCE_FOOTNOTES.some((n) => n.year === year && n.field === field);

/** City finances: FY2025 key figures, 2021–2025 actuals, FY2025 spending by sector, NTA trend */
export function FinancesOverview() {
  const latest = FINANCE_ACTUALS[FINANCE_ACTUALS.length - 1];
  const kpis: { label: string; value: number | null }[] = [
    { label: 'Operating income', value: latest.operatingIncome },
    { label: 'National Tax Allotment', value: latest.nta },
    { label: 'Operating spending', value: latest.operatingSpending },
    { label: 'Cash at year end', value: latest.cashYearEnd },
  ];
  const ntaYears = FINANCE_ACTUALS.filter((y) => y.nta !== null);
  const maxNta = Math.max(...ntaYears.map((y) => y.nta as number));
  // Tables and bars show the most recent year first
  const newestFirst = [...FINANCE_ACTUALS].reverse();

  return (
    <div className="space-y-8">
      <StatGrid
        items={kpis.map((k) => ({
          label: k.label,
          value: pesoMillions(k.value),
          note: `FY${latest.year}${latest.year === PRELIMINARY_YEAR ? ' (preliminary)' : ''}`,
        }))}
      />

      <section className={card} aria-labelledby="actuals-heading">
        <h2 id="actuals-heading" className="text-xl font-bold text-mist-900 font-display">
          Income and spending, {FINANCE_ACTUALS[0].year}–{latest.year}
        </h2>
        <p className="text-sm text-mist-600 mt-1">
          Actual results recorded by BLGF, not the planned budget. FY{PRELIMINARY_YEAR} is BLGF’s preliminary release.
        </p>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-mist-200 text-xs uppercase tracking-wider text-mist-500">
                <th scope="col" className="py-2 pr-4 text-left font-semibold">Item</th>
                {newestFirst.map((y) => (
                  <th key={y.year} scope="col" className="py-2 pl-4 text-right font-semibold font-mono-tabular">{y.year}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-mist-100">
              {ROWS.map((row) => (
                <tr key={row.field}>
                  <th scope="row" className={`py-2.5 pr-4 text-left ${row.strong ? 'font-bold text-mist-900' : 'font-medium text-mist-700'}`}>
                    {row.label}
                  </th>
                  {newestFirst.map((y) => (
                    <td key={y.year} className={`py-2.5 pl-4 text-right font-mono-tabular whitespace-nowrap ${row.strong ? 'font-bold text-mist-900' : 'text-mist-800'}`}>
                      {pesoMillions(y[row.field] as number | null)}
                      {hasFootnote(y.year, row.field) && <sup className="ml-0.5 text-accent-deep">*</sup>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-mist-600">
          <span className="text-accent-deep">*</span> {FINANCE_FOOTNOTES[0].note}. “—” means no record, not zero.
        </p>
        <SourceNote item={FINANCE_SOURCE} className="mt-4 pt-4 border-t border-mist-100" />
      </section>

      <section className={card} aria-labelledby="sectors-heading">
        <h2 id="sectors-heading" className="text-xl font-bold text-mist-900 font-display">
          Where FY{SPENDING_BY_SECTOR.year} operating spending went
        </h2>
        <p className="text-sm text-mist-600 mt-1">Grouped as in BLGF’s statement; capital outlay is not included.</p>
        <div className="mt-6 space-y-5">
          {SPENDING_BY_SECTOR.sectors.map((s, i) => (
            <div key={s.name} className="space-y-2">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-sm font-bold text-mist-900 inline-flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${chartColor(i).bar}`} aria-hidden="true" />
                  {s.name}
                </h3>
                <div className="text-sm font-mono-tabular font-bold text-brand-900">
                  {pesoMillions(s.millions)} ({s.share}%)
                </div>
              </div>
              <div className="w-full h-3 bg-mist-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${chartColor(i).bar}`} style={{ width: `${s.share}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={card} aria-labelledby="nta-heading">
        <h2 id="nta-heading" className="text-xl font-bold text-mist-900 font-display">
          National Tax Allotment, {ntaYears[0].year}–{latest.year}
        </h2>
        <p className="text-sm text-mist-600 mt-1">The city’s share of national taxes, its largest source of income.</p>
        <div className="mt-6 space-y-3">
          {[...ntaYears].reverse().map((y) => (
            <div key={y.year} className="grid grid-cols-[3rem_1fr_5rem] items-center gap-3">
              <span className="text-sm font-mono-tabular text-mist-700">{y.year}</span>
              <div className="h-3 bg-mist-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-lake-700" style={{ width: `${((y.nta as number) / maxNta) * 100}%` }} />
              </div>
              <span className="text-sm font-mono-tabular font-bold text-brand-900 text-right">{pesoMillions(y.nta)}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
