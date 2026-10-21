'use client';

import React from 'react';
import { Database } from 'lucide-react';
import { MARAWI_BARANGAYS } from '@/data/barangays';
import { BUDGET_BREAKDOWN_2026 } from '@/data/budget';
import { ORDINANCES_LIST } from '@/data/ordinances';
import { downloadCSV, downloadJSON, generateBarangaysCSV } from '@/lib/csv';
import { SourceNote } from '@/components/ui';
import { useTranslation } from '@/i18n';

export function OpenDataDownloads() {
  const { t } = useTranslation();
  const handleExportBarangaysCSV = () => {
    const csv = generateBarangaysCSV(MARAWI_BARANGAYS);
    downloadCSV('marawi_city_96_barangays_census.csv', csv);
  };

  return (
    <section className="bg-white rounded-xl border border-stone-200/90 p-6 sm:p-8 space-y-6">
      <div className="pb-4 border-b border-stone-100">
        <h2 className="text-xl font-bold text-stone-900 font-display flex items-center gap-2">
          <Database className="w-5 h-5 text-emerald-800" />
          {t.openDatasetsHeading}
        </h2>
        <p className="text-xs text-stone-500 mt-0.5">
          {t.clickToDownload}
        </p>
      </div>

      <div className="space-y-4">
        <div className="p-5 rounded-xl bg-stone-50 border border-stone-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono-tabular text-emerald-800 font-semibold">
              DATASET-MRW-01 · DEMOGRAPHICS &amp; PSGC
            </div>
            <h3 className="text-base font-bold text-stone-900 mt-0.5">
              Complete 96 Barangays Population &amp; Household Census (2020–2026)
            </h3>
            <p className="text-xs text-stone-600 mt-1">
              Includes PSGC codes, district cluster, 2020 census, latest population, and household counts.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleExportBarangaysCSV}
              className="px-3 py-2 rounded-lg bg-emerald-900 text-white text-xs font-semibold hover:bg-emerald-950 font-mono-tabular"
            >
              {t.downloadCSV}
            </button>
            <button
              type="button"
              onClick={() =>
                downloadJSON('marawi_96_barangays.json', MARAWI_BARANGAYS)
              }
              className="px-3 py-2 rounded-lg bg-white border border-stone-300 text-stone-800 text-xs font-semibold hover:bg-stone-100 font-mono-tabular"
            >
              {t.downloadJSON}
            </button>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-stone-50 border border-stone-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono-tabular text-emerald-800 font-semibold">
              DATASET-MRW-02 · PUBLIC FINANCE
            </div>
            <h3 className="text-base font-bold text-stone-900 mt-0.5">
              FY 2026 General Appropriation Budget Breakdown (₱1.845B)
            </h3>
            <p className="text-xs text-stone-600 mt-1">
              Sectoral allocations, NTA share, local revenue sources, and 5% CDRRMF/GAD shares.
            </p>
          </div>
          <button
            type="button"
            onClick={() =>
              downloadJSON('marawi_fy2026_budget.json', BUDGET_BREAKDOWN_2026)
            }
            className="px-3 py-2 rounded-lg bg-emerald-900 text-white text-xs font-semibold hover:bg-emerald-950 font-mono-tabular shrink-0"
          >
            {t.downloadJSON}
          </button>
        </div>

        <div className="p-5 rounded-xl bg-stone-50 border border-stone-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono-tabular text-emerald-800 font-semibold">
              DATASET-MRW-03 · LEGISLATIVE ARCHIVE
            </div>
            <h3 className="text-base font-bold text-stone-900 mt-0.5">
              Sangguniang Panlungsod Enacted Ordinances &amp; Codes
            </h3>
            <p className="text-xs text-stone-600 mt-1">
              Structured registry of key city ordinances, enactment dates, sponsors, and categories.
            </p>
          </div>
          <button
            type="button"
            onClick={() =>
              downloadJSON('marawi_ordinances.json', ORDINANCES_LIST)
            }
            className="px-3 py-2 rounded-lg bg-emerald-900 text-white text-xs font-semibold hover:bg-emerald-950 font-mono-tabular shrink-0"
          >
            {t.downloadJSON}
          </button>
        </div>
      </div>

      <SourceNote item={MARAWI_BARANGAYS[0]} className="pt-2 border-t border-stone-100" />
    </section>
  );
}
