'use client';

import React from 'react';
import { Download, FileCheck2 } from 'lucide-react';
import { FDPDocument } from '@/types';
import { downloadCSV } from '@/lib/csv';

interface FDPTableProps {
  documents: FDPDocument[];
}

export function FDPTable({ documents }: FDPTableProps) {
  const downloadSample = (doc: FDPDocument) => {
    const csvContent = [
      'Document Code,Title,Period,Date Posted,Responsible Office,Status',
      `"${doc.code}","${doc.title}","${doc.latestPeriod}","${doc.datePosted}","${doc.officeResponsible}","${doc.status}"`,
    ].join('\n');
    downloadCSV(`${doc.code}.csv`, csvContent);
  };

  return (
    <section className="bg-white rounded-xl border border-stone-200/90 p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-6 border-b border-stone-100">
        <div>
          <h2 className="text-xl font-bold text-stone-900 font-display">
            Published Full Disclosure &amp; Procurement Documents
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Conspicuous Posting Locations: (1) Marawi City Hall Lobby, (2) New Grand Padian, (3) MSU Commercial Center
          </p>
        </div>
        <span className="text-xs font-mono-tabular font-semibold text-emerald-800">
          Q3 2026 Updated
        </span>
      </div>

      <div className="space-y-4">
        {documents.map((doc) => (
          <div
            key={doc.code}
            className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 font-mono-tabular">
                <span className="font-bold text-emerald-900">{doc.code}</span>
                <span aria-hidden="true">·</span>
                <span>{doc.frequency}</span>
                <span aria-hidden="true">·</span>
                <span>Posted {doc.datePosted}</span>
              </div>
              <h3 className="text-base font-bold text-stone-900">
                {doc.title}
              </h3>
              <div className="text-xs text-stone-600">
                Period: <strong>{doc.latestPeriod}</strong> · {doc.officeResponsible}
              </div>
              <div className="text-xs text-emerald-800 font-medium flex items-center gap-1 pt-0.5">
                <FileCheck2 className="w-3.5 h-3.5" />
                {doc.status}
              </div>
            </div>

            <button
              type="button"
              onClick={() => downloadSample(doc)}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-white border border-stone-300 text-stone-800 text-xs font-semibold hover:bg-emerald-900 hover:text-white hover:border-emerald-900 transition-colors whitespace-nowrap shrink-0 font-mono-tabular"
            >
              <Download className="w-3.5 h-3.5" />
              Download ({doc.fileSize})
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

