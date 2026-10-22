'use client';

import React from 'react';
import { Download, FileCheck2 } from 'lucide-react';
import { FDPDocument } from '@/types';
import { downloadCSV } from '@/lib/csv';
import { DataStatus } from '@/components/ui';
import { useTranslation } from '@/i18n';

interface FDPTableProps {
  documents: FDPDocument[];
}

export function FDPTable({ documents }: FDPTableProps) {
  const { t } = useTranslation();
  const downloadSample = (doc: FDPDocument) => {
    const csvContent = [
      'Document Code,Title,Period,Date Posted,Responsible Office,Status',
      `"${doc.code}","${doc.title}","${doc.latestPeriod}","${doc.datePosted}","${doc.officeResponsible}","${doc.status}"`,
    ].join('\n');
    downloadCSV(`${doc.code}.csv`, csvContent);
  };

  return (
    <section className="bg-white rounded-xl border border-mist-200/90 p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-6 border-b border-mist-100">
        <div>
          <h2 className="text-xl font-bold text-mist-900 font-display">
            {t.fdpHeading}
          </h2>
          <p className="text-xs text-mist-500 mt-0.5">
            {t.conspicuousPosting}
          </p>
        </div>
        <span className="text-xs font-mono-tabular font-semibold text-brand-800">
          Q3 2026 Updated
        </span>
      </div>

      <div className="space-y-4">
        {documents.map((doc) => (
          <div
            key={doc.code}
            className="p-4 rounded-xl bg-mist-50 border border-mist-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2 text-xs text-mist-500 font-mono-tabular">
                <span className="font-bold text-brand-900">{doc.code}</span>
                <DataStatus item={doc} />
                <span aria-hidden="true">·</span>
                <span>{doc.frequency}</span>
                <span aria-hidden="true">·</span>
                <span>{t.posted} {doc.datePosted}</span>
              </div>
              <h3 className="text-base font-bold text-mist-900">
                {doc.title}
              </h3>
              <div className="text-xs text-mist-600">
                {t.period} <strong>{doc.latestPeriod}</strong> · {doc.officeResponsible}
              </div>
              <div className="text-xs text-brand-800 font-medium flex items-center gap-1 pt-0.5">
                <FileCheck2 className="w-3.5 h-3.5" />
                {doc.status}
              </div>
            </div>

            <button
              type="button"
              onClick={() => downloadSample(doc)}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-white border border-mist-300 text-mist-800 text-xs font-semibold hover:bg-brand-900 hover:text-white hover:border-brand-900 transition-colors whitespace-nowrap shrink-0 font-mono-tabular"
            >
              <Download className="w-3.5 h-3.5" />
              {t.downloadCSV} ({doc.fileSize})
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
