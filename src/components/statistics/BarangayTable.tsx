'use client';

import React, { useState, useMemo } from 'react';
import { Search, Download } from 'lucide-react';
import { BarangayRecord } from '@/types';
import { downloadCSV, generateBarangaysCSV } from '@/lib/csv';
import { SourceNote } from '@/components/ui';
import { useTranslation } from '@/i18n';

interface BarangayTableProps {
  barangays: BarangayRecord[];
}

export function BarangayTable({ barangays }: BarangayTableProps) {
  const { t } = useTranslation();
  const [brgySearch, setBrgySearch] = useState('');
  const [classFilter, setClassFilter] = useState<string>('ALL');

  const classFilters = ['ALL', 'Urban', 'Rural'];

  const filteredBarangays = useMemo(() => {
    const query = brgySearch.trim().toLowerCase();
    return barangays.filter((b) => {
      const matchesClass = classFilter === 'ALL' || b.classification === classFilter;
      const matchesQuery =
        b.name.toLowerCase().includes(query) ||
        b.psgcCode.includes(query) ||
        (b.correspondenceCode !== '' && b.correspondenceCode.includes(query));
      return matchesClass && matchesQuery;
    });
  }, [barangays, brgySearch, classFilter]);

  const handleExportCSV = () => {
    const csv = generateBarangaysCSV(barangays);
    downloadCSV('marawi_city_101_barangays_census.csv', csv);
  };

  return (
    <section className="bg-white rounded-xl border border-mist-200/90 p-6 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-mist-100">
        <div>
          <h2 className="text-xl font-bold text-mist-900 font-display">
            {t.barangaysCensusHeading}
          </h2>
          <p className="text-xs text-mist-500 mt-0.5">
            Showing {filteredBarangays.length} of {barangays.length} Barangays
          </p>
        </div>
        <button
          type="button"
          onClick={handleExportCSV}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-brand-900 text-white text-xs font-semibold hover:bg-brand-950 transition-colors whitespace-nowrap shrink-0"
        >
          <Download className="w-3.5 h-3.5" />
          {t.exportAllBarangays}
        </button>
      </div>

      {/* Search & Urban/Rural Filter Controls */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-mist-400 absolute left-3.5 top-3 pointer-events-none" />
          <input
            type="search"
            value={brgySearch}
            onChange={(e) => setBrgySearch(e.target.value)}
            placeholder={t.searchBarangayPlaceholder}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-mist-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-800"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {classFilters.map((cls) => (
            <button
              key={cls}
              type="button"
              onClick={() => setClassFilter(cls)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                classFilter === cls
                  ? 'bg-mist-900 text-white'
                  : 'bg-mist-100 text-mist-700 hover:bg-mist-200'
              }`}
            >
              {cls === 'ALL' ? `All ${barangays.length} Barangays` : cls}
            </button>
          ))}
        </div>
      </div>

      {/* Tabular-Nums Table */}
      <div className="overflow-x-auto max-h-[640px] overflow-y-auto border border-mist-200 rounded-xl">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead className="bg-mist-100 sticky top-0 z-10 border-b border-mist-200 text-xs uppercase tracking-wider text-mist-600">
            <tr>
              <th className="py-3 px-3 font-semibold">#</th>
              <th className="py-3 px-3 font-semibold">Barangay</th>
              <th className="py-3 px-3 font-semibold">Urban/Rural</th>
              <th className="py-3 px-3 font-semibold text-right">Population (2024 POPCEN)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-mist-100">
            {filteredBarangays.map((b) => (
              <tr key={b.id} className="hover:bg-mist-50">
                <td className="py-2.5 px-3 text-mist-400 font-mono-tabular">{b.id}</td>
                <td className="py-2.5 px-3">
                  <div className="font-bold text-mist-900">{b.name}</div>
                  <div className="text-[11px] text-mist-400 font-mono-tabular">
                    PSGC: {b.psgcCode}
                    {b.correspondenceCode && ` · Corr.: ${b.correspondenceCode}`}
                  </div>
                </td>
                <td className="py-2.5 px-3 text-xs font-medium text-mist-700">
                  {b.classification}
                </td>
                <td className="py-2.5 px-3 text-right font-mono-tabular text-mist-900">
                  {b.populationLatest.toLocaleString('en-US')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SourceNote item={barangays[0]} className="pt-2 border-t border-mist-100" />
    </section>
  );
}
