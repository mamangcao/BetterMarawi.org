'use client';

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { ElectedOfficial } from '@/types';
import { DataStatus } from '@/components/ui';
import { useTranslation } from '@/i18n';

interface OfficialsGridProps {
  officials: ElectedOfficial[];
}

export function OfficialsGrid({ officials }: OfficialsGridProps) {
  const { t } = useTranslation();
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
        <Search className="w-4 h-4 text-mist-400 absolute left-3.5 top-3.5 pointer-events-none" />
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t.searchOfficialsPlaceholder}
          className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-mist-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-800"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((off) => (
          <div
            key={off.name}
            className="bg-white rounded-xl border border-mist-200/90 p-5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-brand-900 text-white font-bold font-display text-sm flex items-center justify-center shrink-0">
                  {off.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-1.5">
                    <div className="text-xs font-semibold text-brand-800">
                      {off.role} ({off.term})
                    </div>
                    <DataStatus item={off} />
                  </div>
                  <h2 className="text-base font-bold text-mist-900 mt-0.5">
                    {off.name}
                  </h2>
                  <p className="text-xs text-mist-600 mt-1">
                    {off.committeeOrOffice}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-mist-100 text-xs text-mist-600 space-y-1 font-mono-tabular">
              <div>{t.phone}: {off.phone}</div>
              <div>{t.email}: {off.email}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
