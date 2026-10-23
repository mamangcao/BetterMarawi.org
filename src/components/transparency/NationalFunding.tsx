import React from 'react';
import { ArrowUpRight, SourceNote, pesoMillions } from '@/components/ui';
import { LGSF_PROJECTS, NATIONAL_RELEASES } from '@/data/reports';

const card = 'bg-white rounded-xl border border-mist-200/90 p-6 sm:p-8';
const th = 'py-2 px-3 font-semibold';
const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

/** National funds released to the city: LGSF projects and NCA/SARO releases (DBM) */
export function NationalFunding() {
  return (
    <div className="space-y-8">
      <section className={card} aria-labelledby="lgsf-heading">
        <h2 id="lgsf-heading" className="text-xl font-bold text-mist-900 font-display">Local Government Support Fund projects</h2>
        <p className="text-sm text-mist-600 mt-1">National funds given to the city for specific projects.</p>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[520px] text-sm">
            <thead>
              <tr className="border-b border-mist-200 text-xs uppercase tracking-wider text-mist-500 text-left">
                <th scope="col" className={`${th} pl-0`}>Project</th>
                <th scope="col" className={th}>Year</th>
                <th scope="col" className={`${th} text-right`}>Allotted</th>
                <th scope="col" className={`${th} text-right pr-0`}>Released</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-mist-100">
              {[...LGSF_PROJECTS].sort((a, b) => b.fiscalYear - a.fiscalYear).map((p) => (
                <tr key={p.title}>
                  <td className="py-2.5 pr-3 font-medium text-mist-800">{p.title}</td>
                  <td className="py-2.5 px-3 font-mono-tabular text-mist-700">FY{p.fiscalYear}</td>
                  <td className="py-2.5 px-3 text-right font-mono-tabular whitespace-nowrap">{pesoMillions(p.allottedMillions)}</td>
                  <td className="py-2.5 pl-3 text-right font-mono-tabular whitespace-nowrap">{pesoMillions(p.releasedMillions)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <SourceNote item={LGSF_PROJECTS[0]} className="mt-4 pt-4 border-t border-mist-100" />
      </section>

      <section className={card} aria-labelledby="releases-heading">
        <h2 id="releases-heading" className="text-xl font-bold text-mist-900 font-display">National releases to the city</h2>
        <p className="text-sm text-mist-600 mt-1">
          A SARO allows the city to spend up to an amount; an NCA is the cash itself. A release is not the same as money spent.
        </p>
        {/* relative keeps the sr-only header inside this scroll box on phones */}
        <div className="relative mt-5 overflow-x-auto">
          <table className="w-full min-w-[620px] text-sm">
            <thead>
              <tr className="border-b border-mist-200 text-xs uppercase tracking-wider text-mist-500 text-left">
                <th scope="col" className={`${th} pl-0`}>Date</th>
                <th scope="col" className={th}>Type</th>
                <th scope="col" className={th}>Purpose</th>
                <th scope="col" className={`${th} text-right`}>Amount</th>
                <th scope="col" className={`${th} pr-0`}>
                  <span className="sr-only">DBM file</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-mist-100">
              {[...NATIONAL_RELEASES].sort((a, b) => b.date.localeCompare(a.date)).map((r) => (
                <tr key={`${r.date}-${r.kind}`}>
                  <td className="py-2.5 pr-3 font-mono-tabular text-mist-700 whitespace-nowrap">{formatDate(r.date)}</td>
                  <td className="py-2.5 px-3 font-mono-tabular font-semibold text-brand-900">{r.kind}</td>
                  <td className="py-2.5 px-3 text-mist-800">{r.purpose}</td>
                  <td className="py-2.5 px-3 text-right font-mono-tabular whitespace-nowrap">{pesoMillions(r.amountMillions)}</td>
                  <td className="py-2.5 pl-3 text-right">
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`DBM ${r.kind} file for ${formatDate(r.date)} (opens in a new tab)`}
                      className="inline-flex items-center gap-0.5 text-xs font-semibold text-brand-800 underline underline-offset-2 hover:text-brand-950 whitespace-nowrap"
                    >
                      DBM file
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <SourceNote label="Department of Budget and Management (DBM), NCA and SARO releases" sourceUrl="https://www.dbm.gov.ph/" date="2026-10-23" className="mt-4 pt-4 border-t border-mist-100" />
      </section>
    </div>
  );
}
