import React from 'react';
import { ArrowUpRight, SourceNote, StatGrid, pesoMillions, type Stat } from '@/components/ui';
import { AUDIT_FY2020 } from '@/data/reports';

/** Commission on Audit findings for the city's FY2020 accounts, in plain language */
export function AuditSummary() {
  const a = AUDIT_FY2020;
  const figures: Stat[] = [
    { label: 'Audit observations', value: String(a.observations) },
    { label: 'Disallowed, unsettled', value: pesoMillions(a.disallowedMillions) },
    { label: 'Suspended, unsettled', value: pesoMillions(a.suspendedMillions) },
    { label: 'Earlier recommendations acted on', value: `${a.priorActedOn} of ${a.priorTotal}` },
  ];

  return (
    <section className="bg-white rounded-xl border border-mist-200/90 p-6 sm:p-8" aria-labelledby="audit-heading">
      <h2 id="audit-heading" className="text-xl font-bold text-mist-900 font-display">
        Commission on Audit report, FY{a.fiscalYear}
      </h2>
      <p className="mt-2 text-sm text-mist-700">
        Audit opinion: <strong className="text-mist-900">{a.opinion}</strong>.{' '}
        A qualified opinion means the auditor found the financial statements fair except for the specific matters listed.
      </p>

      <StatGrid items={figures} className="mt-5" />
      <p className="mt-3 text-xs text-mist-600">
        Suspended means the auditor has put payments on hold until missing documents or explanations are provided.
        {a.priorPartly > 0 && ` ${a.priorPartly} more earlier recommendation was partly acted on.`}
      </p>

      <h3 className="mt-6 text-sm font-bold text-mist-900">Main observations</h3>
      <ul className="mt-2 space-y-2 text-sm text-mist-700 list-disc pl-5 marker:text-brand-700">
        {a.keyObservations.map((o) => (
          <li key={o}>{o}</li>
        ))}
      </ul>

      <p className="mt-5 text-sm">
        <a
          href={a.reportUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-0.5 font-semibold text-brand-800 underline underline-offset-2 hover:text-brand-950"
        >
          Read the COA report
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
        <span className="text-mist-500"> · </span>
        <a
          href={a.archiveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-0.5 text-mist-600 underline underline-offset-2 hover:text-mist-900"
        >
          archived copy
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </p>
      <SourceNote item={a} className="mt-4 pt-4 border-t border-mist-100" />
    </section>
  );
}
