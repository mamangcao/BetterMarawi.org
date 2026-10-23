'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { Phone, Search } from 'lucide-react';
import { MARAWI_BARANGAYS } from '@/data/barangays';
import {
  BARANGAY_LEADERS,
  BARANGAY_LEADERS_AS_OF,
  BARANGAY_LEADERS_SOURCE,
  BARANGAY_LEADERS_SOURCE_URL,
} from '@/data/barangayLeaders';
import { CLASSIFICATION_CHIP } from '@/lib/palette';

/** 0917 123 4567 style for 11-digit mobile numbers */
function formatPhone(n: string) {
  const d = n.replace(/\D/g, '');
  return d.length === 11 ? `${d.slice(0, 4)} ${d.slice(4, 7)} ${d.slice(7)}` : n;
}

/** An official's name with their contact number, when one is listed */
function Official({ name, contact }: { name: string; contact?: string }) {
  return (
    <>
      <span className="block text-mist-900">{name}</span>
      {contact && (
        <a
          href={`tel:${contact.replace(/[^\d+]/g, '')}`}
          className="mt-0.5 inline-flex items-center gap-1 text-xs font-mono-tabular text-brand-800 hover:text-brand-950 whitespace-nowrap"
        >
          <Phone className="w-3 h-3" aria-hidden="true" />
          {formatPhone(contact)}
        </a>
      )}
    </>
  );
}

/** All 101 barangays (PSA) with their Punong Barangay and SK Chairperson, and contacts when listed. */
export function BarangayUnits() {
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();
  const rows = useMemo(
    () =>
      MARAWI_BARANGAYS.filter((b) => {
        if (!q) return true;
        const l = BARANGAY_LEADERS[b.psgcCode];
        const people = `${l?.punongBarangay ?? ''} ${l?.skChairperson ?? ''}`.toLowerCase();
        return b.name.toLowerCase().includes(q) || people.includes(q);
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
            placeholder="Search a barangay or official"
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
              <th scope="col" className="py-3 px-3 font-semibold">SK Chairperson</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-mist-100">
            {rows.map((b) => {
              const leader = BARANGAY_LEADERS[b.psgcCode];
              return (
                <tr key={b.psgcCode} className="hover:bg-mist-50 align-top">
                  <td className="py-2.5 px-3">
                    <div className="font-semibold text-brand-950">{b.name}</div>
                    <span className={`mt-0.5 inline-flex items-center rounded-full border px-1.5 py-px text-[10px] font-semibold ${CLASSIFICATION_CHIP[b.classification]}`}>
                      {b.classification}
                    </span>
                  </td>
                  <td className="py-2.5 px-3">
                    {leader ? (
                      <Official name={leader.punongBarangay} contact={leader.contact} />
                    ) : (
                      <span className="text-mist-600 italic">To be added</span>
                    )}
                  </td>
                  <td className="py-2.5 px-3">
                    {leader?.skChairperson ? (
                      <Official name={leader.skChairperson} contact={leader.skContact} />
                    ) : (
                      <span className="text-mist-600 italic">Not listed</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-mist-500">
        Barangay names and classification: Philippine Statistics Authority (PSGC). Population and other figures are on{' '}
        <Link href="/statistics/barangay-data" className="underline underline-offset-2 hover:text-brand-800">
          Barangay Data
        </Link>
        .
        {BARANGAY_LEADERS_AS_OF
          ? ` Leaders as of ${BARANGAY_LEADERS_AS_OF}, from `
          : ' Barangay leaders will be added once confirmed.'}
        {BARANGAY_LEADERS_AS_OF && BARANGAY_LEADERS_SOURCE && (
          <>
            <a href={BARANGAY_LEADERS_SOURCE_URL} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-brand-800">
              {BARANGAY_LEADERS_SOURCE}
            </a>
            . Barangays marked “To be added” are not listed there.
          </>
        )}{' '}
        Barangay and SK elections are scheduled for November 2, 2026.
      </p>
    </div>
  );
}
