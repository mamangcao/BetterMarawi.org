import React from 'react';
import { FileText } from 'lucide-react';
import { FDPDocument } from '@/types';
import { ArrowUpRight, SourceNote } from '@/components/ui';

interface FDPTableProps {
  documents: FDPDocument[];
  year: number;
  heading: string;
}

const PERIOD_LABEL: Record<string, string> = { Annual: 'Annual report', Q1: 'Q1', Q2: 'Q2', Q3: 'Q3', Q4: 'Q4' };

/** Full Disclosure Policy documents for one year, each period linking to its DILG portal file */
export function FDPTable({ documents, year, heading }: FDPTableProps) {
  const posted = documents.filter((d) => d.files.length > 0).length;

  return (
    <section className="bg-white rounded-xl border border-mist-200/90 p-6 sm:p-8">
      <div className="pb-4 mb-6 border-b border-mist-100">
        <h2 className="text-xl font-bold text-mist-900 font-display">{heading}</h2>
        <p className="mt-1 text-sm text-mist-600">
          <span className="font-mono-tabular font-semibold text-brand-900">
            {posted} of {documents.length}
          </span>{' '}
          documents posted for {year}
        </p>
      </div>

      <ul className="space-y-3">
        {documents.map((doc) => (
          <li
            key={doc.filterId}
            className="p-4 rounded-xl bg-mist-50 border border-mist-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div className="flex items-start gap-2.5 min-w-0">
              <FileText className="w-4 h-4 mt-0.5 shrink-0 text-brand-700" aria-hidden="true" />
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-mist-900">{doc.title}</h3>
                <p className="text-xs text-mist-500 mt-0.5">{doc.frequency}</p>
              </div>
            </div>

            {doc.files.length > 0 ? (
              <ul className="flex flex-wrap gap-1.5 sm:justify-end shrink-0" aria-label={`${doc.title} files`}>
                {doc.files.map((f) => (
                  <li key={f.period}>
                    <a
                      href={f.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${doc.title}, ${PERIOD_LABEL[f.period]} ${year} (DILG file, opens in a new tab)`}
                      className="inline-flex items-center gap-1 rounded-full border border-mist-200 bg-white px-2.5 py-1 text-xs font-semibold font-mono-tabular text-brand-800 hover:border-brand-300 hover:bg-brand-50 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
                    >
                      {PERIOD_LABEL[f.period]}
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <span className="text-xs italic text-mist-600 shrink-0">Not posted for {year}</span>
            )}
          </li>
        ))}
      </ul>

      {documents[0] && <SourceNote item={documents[0]} className="mt-5 pt-4 border-t border-mist-100" />}
    </section>
  );
}
