'use client';

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { ElectedOfficial } from '@/types';

interface OfficialsGridProps {
  officials: ElectedOfficial[];
}

export function OfficialsGrid({ officials }: OfficialsGridProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = officials.filter(
    (off) =>
      off.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      off.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      off.committeeOrOffice.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="max-w-md relative">
        <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5 pointer-events-none" />
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search officials by name or committee..."
          className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((off) => (
          <div
            key={off.name}
            className="bg-white rounded-xl border border-stone-200/90 p-5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-emerald-900 text-white font-bold font-display text-sm flex items-center justify-center shrink-0">
                  {off.initials}
                </div>
                <div>
                  <div className="text-xs font-semibold text-emerald-800">
                    {off.role} ({off.term})
                  </div>
                  <h2 className="text-base font-bold text-stone-900 mt-0.5">
                    {off.name}
                  </h2>
                  <p className="text-xs text-stone-600 mt-1">
                    {off.committeeOrOffice}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-100 text-xs text-stone-600 space-y-1 font-mono-tabular">
              <div>Phone: {off.phone}</div>
              <div>Email: {off.email}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

