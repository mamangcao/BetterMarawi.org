'use client';

import React, { useState, useMemo } from 'react';
import { Search, Download } from 'lucide-react';
import { BarangayRecord } from '@/types';
import { downloadCSV, generateBarangaysCSV } from '@/lib/csv';

interface BarangayTableProps {
  barangays: BarangayRecord[];
}

export function BarangayTable({ barangays }: BarangayTableProps) {
  const [brgySearch, setBrgySearch] = useState('');
  const [districtFilter, setDistrictFilter] = useState<string>('ALL');

  const districts = [
    'ALL',
    'Central Poblacion',
    'Basak & MSU Corridor',
    'Lakefront & Saduc',
    'Angoyao & East Basin',
    'Northwest Highland',
  ];

  const filteredBarangays = useMemo(() => {
    return barangays.filter((b) => {
      const matchesDistrict = districtFilter === 'ALL' || b.district === districtFilter;
      const matchesQuery =
        b.name.toLowerCase().includes(brgySearch.toLowerCase()) ||
        b.psgcCode.includes(brgySearch) ||
        b.district.toLowerCase().includes(brgySearch.toLowerCase());
      return matchesDistrict && matchesQuery;
    });
  }, [barangays, brgySearch, districtFilter]);

  const handleExportCSV = () => {
    const csv = generateBarangaysCSV(barangays);
    downloadCSV('marawi_city_96_barangays_census.csv', csv);
  };

  return (
    <section className="bg-white rounded-xl border border-stone-200/90 p-6 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
        <div>
          <h2 className="text-xl font-bold text-stone-900 font-display">
            Official 96 Barangays Census Directory
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Showing {filteredBarangays.length} of 96 Barangays · Total Population: 259,993
          </p>
        </div>
        <button
          type="button"
          onClick={handleExportCSV}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-900 text-white text-xs font-semibold hover:bg-emerald-950 transition-colors whitespace-nowrap shrink-0"
        >
          <Download className="w-3.5 h-3.5" />
          Export All 96 Barangays (CSV)
        </button>
      </div>

      {/* Search & Sector Filter Controls */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3 pointer-events-none" />
          <input
            type="search"
            value={brgySearch}
            onChange={(e) => setBrgySearch(e.target.value)}
            placeholder="Search by Barangay name, PSGC code, or sector..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {districts.map((dist) => (
            <button
              key={dist}
              type="button"
              onClick={() => setDistrictFilter(dist)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                districtFilter === dist
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {dist === 'ALL' ? 'All 96 Barangays' : dist}
            </button>
          ))}
        </div>
      </div>

      {/* Tabular-Nums Table */}
      <div className="overflow-x-auto max-h-[640px] overflow-y-auto border border-stone-200 rounded-xl">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead className="bg-stone-100 sticky top-0 z-10 border-b border-stone-200 text-xs uppercase tracking-wider text-stone-600">
            <tr>
              <th className="py-3 px-3 font-semibold">#</th>
              <th className="py-3 px-3 font-semibold">Barangay</th>
              <th className="py-3 px-3 font-semibold">District Sector</th>
              <th className="py-3 px-3 font-semibold text-right">2020 Pop.</th>
              <th className="py-3 px-3 font-semibold text-right">Latest Pop.</th>
              <th className="py-3 px-3 font-semibold text-right">Households</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 font-mono-tabular">
            {filteredBarangays.map((b) => (
              <tr key={b.id} className="hover:bg-stone-50">
                <td className="py-2.5 px-3 text-stone-400">{b.id}</td>
                <td className="py-2.5 px-3 font-sans">
                  <div className="font-bold text-stone-900">{b.name}</div>
                  <div className="text-[11px] text-stone-400 font-mono-tabular">
                    PSGC: {b.psgcCode} · {b.zoneStatus}
                  </div>
                </td>
                <td className="py-2.5 px-3 font-sans text-xs text-stone-600">
                  {b.district}
                </td>
                <td className="py-2.5 px-3 text-right text-stone-600">
                  {b.population2020.toLocaleString()}
                </td>
                <td className="py-2.5 px-3 text-right font-bold text-emerald-900">
                  {b.populationLatest.toLocaleString()}
                </td>
                <td className="py-2.5 px-3 text-right text-stone-700">
                  {b.households.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

