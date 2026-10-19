'use client';

import React, { useState } from 'react';
import { Search, FileText } from 'lucide-react';
import { OrdinanceRecord } from '@/types';

interface OrdinancesTableProps {
  ordinances: OrdinanceRecord[];
}

export function OrdinancesTable({ ordinances }: OrdinancesTableProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = ordinances.filter(
    (o) =>
      o.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.sponsor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Presiding Officer Box */}
      <div className="bg-emerald-950 text-stone-100 rounded-xl p-6 border border-emerald-900">
        <div className="text-xs font-semibold uppercase tracking-wider text-accent">
          Presiding Officer · 2025–2028 Sangguniang Panlungsod
        </div>
        <h2 className="text-2xl font-bold text-white font-display mt-1">
          Hon. Majul Usman Gandamra — City Vice Mayor
        </h2>
        <p className="text-sm text-emerald-100/90 mt-2 leading-relaxed">
          Regular sessions of the Sangguniang Panlungsod of the Islamic City of Marawi are held every Tuesday at 9:00 AM at the Legislative Session Hall, Marawi City Hall. Public committee hearings are open to accredited Civil Society Organizations (CSOs) and barangay representatives.
        </p>
      </div>

      {/* Enacted Ordinances & Resolutions */}
      <section className="bg-white rounded-xl border border-stone-200/90 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-5 border-b border-stone-100">
          <div>
            <h2 className="text-xl font-bold text-stone-900 font-display flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-800" />
              Key Enacted City Ordinances &amp; Codes
            </h2>
            <span className="text-xs font-mono-tabular text-stone-500">
              {filtered.length} Records
            </span>
          </div>

          <div className="max-w-xs w-full relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3 pointer-events-none" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search ordinances..."
              className="w-full pl-9 pr-3 py-1.5 bg-stone-50 rounded-lg border border-stone-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-800"
            />
          </div>
        </div>

        <div className="space-y-4">
          {filtered.map((ord) => (
            <div
              key={ord.number}
              className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 space-y-2"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono-tabular">
                <span className="font-bold text-emerald-900">{ord.number}</span>
                <span className="text-stone-500">Enacted: {ord.dateEnacted}</span>
              </div>
              <h3 className="text-base font-bold text-stone-900 leading-snug">
                {ord.title}
              </h3>
              <div className="pt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-stone-600">
                <span>Category: {ord.category}</span>
                <span aria-hidden="true">·</span>
                <span>Principal Sponsor: {ord.sponsor}</span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-800 font-semibold">{ord.status}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

