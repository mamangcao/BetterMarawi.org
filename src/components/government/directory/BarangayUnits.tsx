'use client';

import React, { useMemo, useState } from 'react';
import { Phone, Search } from 'lucide-react';
import { MARAWI_BARANGAYS } from '@/data/barangays';
import { BARANGAY_LEADERS, BARANGAY_LEADERS_AS_OF, BARANGAY_LEADERS_SOURCE } from '@/data/barangayLeaders';
import { CLASSIFICATION_CHIP } from '@/lib/palette';

/** All 101 barangays (PSA) with their Punong Barangay and contact, when confirmed. */
export function BarangayUnits() {
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();
  const rows = useMemo(
    () =>
      MARAWI_BARANGAYS.filter((b) => {
        if (!q) return true;
        const leader = BARANGAY_LEADERS[b.psgcCode]?.punongBarangay ?? '';
        return b.name.toLowerCase().includes(q) || leader.toLowerCase().includes(q);
      }),
    [q]
  );
  const confirmed = MARAWI_BARANGAYS.filter((b) => BARANGAY_LEADERS[b.psgcCode]).length;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <label className="relative block sm:w-80">
          <span className="sr-only">Search barangays</span>
          <Search className="w-4 h-4 text-mist-400 absolute left-3.5 top-3 pointer-events-none" aria-hidden="true" />
          <input
            id="barangay-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search a barangay or leader"
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-mist-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-700"
          />
        </label>
        <p className="text-xs text-mist-500">
          {rows.length} of {MARAWI_BARANGAYS.length} barangays · leaders confirmed for {confirmed}
        </p>
      </div>

      <div className="overflow-x-auto max-h-[640px] overflow-y-auto rounded-xl border border-mist-200 bg-white">
        <table className="w-full text-left text-sm border-collapse">
          <thead className="sticky top-0 z-10 bg-mist-100 text-xs uppercase tracking-wider text-mist-600">
            <tr>
              <th scope="col" className="py-3 px-3 font-semibold">Barangay</th>
              <th scope="col" className="py-3 px-3 font-semibold">Punong Barangay</th>
              <th scope="col" className="py-3 px-3 font-semibold">Contact</th>
              <th scope="col" className="py-3 px-3 font-semibold text-right">Population (2024)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-mist-100">
            {rows.map((b) => {
              const leader = BARANGAY_LEADERS[b.psgcCode];
              return (
                <tr key={b.psgcCode} className="hover:bg-mist-50">
                  <td className="py-2.5 px-3">
                    <div className="font-semibold text-brand-950">{b.name}</div>
                    <span className={`mt-0.5 inline-flex items-center rounded-full border px-1.5 py-px text-[10px] font-semibold ${CLASSIFICATION_CHIP[b.classification]}`}>
                      {b.classification}
                    </span>
                  </td>
                  <td className="py-2.5 px-3">
                    {leader ? (
                      <span className="text-mist-900">{leader.punongBarangay}</span>
                    ) : (
                      <span className="text-mist-400 italic">To be added</span>
                    )}
                  </td>
                  <td className="py-2.5 px-3 font-mono-tabular whitespace-nowrap">
                    {leader?.contact ? (
                      <a href={`tel:${leader.contact.replace(/[^\d+]/g, '')}`} className="inline-flex items-center gap-1 text-brand-800 hover:text-brand-950">
                        <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                        {leader.contact}
                      </a>
                    ) : (
                      <span className="text-mist-400">—</span>
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono-tabular text-mist-800">
                    {b.populationLatest.toLocaleString('en-US')}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-mist-500">
        Barangay names, classification, and population: Philippine Statistics Authority (PSGC and 2024 POPCEN).
        {BARANGAY_LEADERS_AS_OF
          ? ` Leaders as of ${BARANGAY_LEADERS_AS_OF}${BARANGAY_LEADERS_SOURCE ? `, from ${BARANGAY_LEADERS_SOURCE}` : ''}.`
          : ' Barangay leaders will be added once confirmed.'}{' '}
        Barangay and SK elections are scheduled for November 2, 2026.
      </p>
    </div>
  );
}
