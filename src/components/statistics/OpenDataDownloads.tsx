'use client';

import React from 'react';
import { Database } from 'lucide-react';
import { MARAWI_BARANGAYS } from '@/data/barangays';
import { downloadCSV, downloadJSON, generateBarangaysCSV } from '@/lib/csv';
import { SourceNote } from '@/components/ui';
import { useTranslation } from '@/i18n';

// Only sourced datasets are offered. The FY 2026 budget (unverified) and the ordinance list
// (removed: unsourced and contradicted) were taken out on Oct 23, 2026.
export function OpenDataDownloads() {
  const { t } = useTranslation();
  const handleExportBarangaysCSV = () => {
    const csv = generateBarangaysCSV(MARAWI_BARANGAYS);
    downloadCSV('marawi_city_101_barangays_census.csv', csv);
  };

  return (
    <section className="bg-white rounded-xl border border-mist-200/90 p-6 sm:p-8 space-y-6">
      <div className="pb-4 border-b border-mist-100">
        <h2 className="text-xl font-bold text-mist-900 font-display flex items-center gap-2">
          <Database className="w-5 h-5 text-brand-800" />
          {t.openDatasetsHeading}
        </h2>
        <p className="text-xs text-mist-500 mt-0.5">
          {t.clickToDownload}
        </p>
      </div>

      <div className="space-y-4">
        <div className="p-5 rounded-xl bg-mist-50 border border-mist-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono-tabular text-brand-800 font-semibold">
              DATASET-MRW-01 · DEMOGRAPHICS &amp; PSGC
            </div>
            <h3 className="text-base font-bold text-mist-900 mt-0.5">
              Complete 101 Barangays Master Directory (PSGC)
            </h3>
            <p className="text-xs text-mist-600 mt-1">
              Includes 10-digit PSGC codes, correspondence codes, Urban/Rural classification, and 2024 POPCEN population from PSA.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleExportBarangaysCSV}
              className="px-3 py-2 rounded-lg bg-brand-900 text-white text-xs font-semibold hover:bg-brand-950 font-mono-tabular"
            >
              {t.downloadCSV}
            </button>
            <button
              type="button"
              onClick={() =>
                downloadJSON(
                  'marawi_101_barangays.json',
                  MARAWI_BARANGAYS.map((b) => ({
                    id: b.id,
                    name: b.name,
                    psgcCode: b.psgcCode,
                    correspondenceCode: b.correspondenceCode,
                    classification: b.classification,
                    population2024Popcen: b.populationLatest,
                    level: b.level,
                    source: b.source,
                    sourceUrl: b.sourceUrl,
                    retrievedOn: b.retrievedOn,
                  }))
                )
              }
              className="px-3 py-2 rounded-lg bg-white border border-mist-300 text-mist-800 text-xs font-semibold hover:bg-mist-100 font-mono-tabular"
            >
              {t.downloadJSON}
            </button>
          </div>
        </div>

      </div>

      <SourceNote item={MARAWI_BARANGAYS[0]} className="pt-2 border-t border-mist-100" />
    </section>
  );
}
