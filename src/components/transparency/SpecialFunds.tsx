import React from 'react';
import { SourceNote, pesoMillions } from '@/components/ui';
import { FINANCE_SOURCE, LDRRMF, SEF } from '@/data/finances';

const card = 'bg-white rounded-xl border border-mist-200/90 p-6 sm:p-8';
const th = 'py-2 pl-4 text-right font-semibold font-mono-tabular';
const td = 'py-2.5 pl-4 text-right font-mono-tabular whitespace-nowrap text-mist-800';

/** Disaster fund (LDRRMF) and Special Education Fund, year by year (BLGF) */
export function SpecialFunds() {
  return (
    <div className="space-y-8">
      <section className={card} aria-labelledby="ldrrmf-heading">
        <h2 id="ldrrmf-heading" className="text-xl font-bold text-mist-900 font-display">Disaster fund: appropriated and spent</h2>
        <p className="text-sm text-mist-600 mt-1">
          The Local Disaster Risk Reduction and Management Fund (LDRRMF) pays for disaster preparedness and response.
        </p>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[520px] text-sm">
            <thead>
              <tr className="border-b border-mist-200 text-xs uppercase tracking-wider text-mist-500">
                <th scope="col" className="py-2 pr-4 text-left font-semibold">Year</th>
                <th scope="col" className={th}>Appropriated</th>
                <th scope="col" className={th}>Spent</th>
                <th scope="col" className={th}>Share used</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-mist-100">
              {[...LDRRMF].reverse().map((r) => (
                <tr key={r.year}>
                  <th scope="row" className="py-2.5 pr-4 text-left font-mono-tabular font-medium text-mist-700">{r.year}</th>
                  <td className={td}>{pesoMillions(r.appropriated)}</td>
                  <td className={td}>{pesoMillions(r.spent)}</td>
                  <td className={`${td} font-bold text-brand-900`}>{r.shareUsed}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <SourceNote item={FINANCE_SOURCE} className="mt-4 pt-4 border-t border-mist-100" />
      </section>

      <section className={card} aria-labelledby="sef-heading">
        <h2 id="sef-heading" className="text-xl font-bold text-mist-900 font-display">Special Education Fund</h2>
        <p className="text-sm text-mist-600 mt-1">
          A share of real property tax set aside for public schools. “—” means no record, not zero.
        </p>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[420px] text-sm">
            <thead>
              <tr className="border-b border-mist-200 text-xs uppercase tracking-wider text-mist-500">
                <th scope="col" className="py-2 pr-4 text-left font-semibold">Year</th>
                <th scope="col" className={th}>Collected</th>
                <th scope="col" className={th}>Spent</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-mist-100">
              {[...SEF].reverse().map((r) => (
                <tr key={r.year}>
                  <th scope="row" className="py-2.5 pr-4 text-left font-mono-tabular font-medium text-mist-700">{r.year}</th>
                  <td className={td}>{pesoMillions(r.collected)}</td>
                  <td className={td}>{pesoMillions(r.spent)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <SourceNote item={FINANCE_SOURCE} className="mt-4 pt-4 border-t border-mist-100" />
      </section>
    </div>
  );
}
