'use client';

import React, { useState } from 'react';
import { CheckSquare, Square } from 'lucide-react';
import { Verification } from '@/types';
import { DataStatus } from '@/components/ui';

interface RequirementsChecklistProps {
  requirements: string[];
  whoMayAvail: string;
  verification?: Verification;
}

export function RequirementsChecklist({
  requirements,
  whoMayAvail,
  verification,
}: RequirementsChecklistProps) {
  const [checkedReqs, setCheckedReqs] = useState<Record<number, boolean>>({});

  const toggleReq = (index: number) => {
    setCheckedReqs((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const completedCount = Object.values(checkedReqs).filter(Boolean).length;

  return (
    <section
      aria-labelledby="requirements-heading"
      className="bg-white rounded-xl border border-stone-200/90 p-6 sm:p-8"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-5 border-b border-stone-100">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2
              id="requirements-heading"
              className="text-xl font-bold text-stone-900 font-display"
            >
              1. Documentary Requirements Checklist
            </h2>
            <DataStatus item={verification} />
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            Who may avail: {whoMayAvail}
          </p>
        </div>
        <span className="text-xs font-mono-tabular font-semibold text-emerald-800">
          {completedCount} of {requirements.length} Prepared
        </span>
      </div>

      <div className="space-y-3">
        {requirements.map((req, idx) => {
          const isChecked = !!checkedReqs[idx];
          return (
            <button
              key={idx}
              type="button"
              onClick={() => toggleReq(idx)}
              className={`w-full text-left flex items-start gap-3.5 p-3.5 rounded-lg border transition-colors ${
                isChecked
                  ? 'bg-emerald-50/70 border-emerald-800/40 text-stone-900'
                  : 'bg-stone-50/70 border-stone-200/80 text-stone-800 hover:bg-stone-100/70'
              }`}
            >
              {isChecked ? (
                <CheckSquare className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
              ) : (
                <Square className="w-5 h-5 text-stone-400 shrink-0 mt-0.5" />
              )}
              <span
                className={`text-sm leading-relaxed ${
                  isChecked ? 'line-through text-stone-500' : 'font-medium'
                }`}
              >
                {req}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
