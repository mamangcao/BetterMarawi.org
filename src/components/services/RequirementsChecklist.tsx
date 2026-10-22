'use client';

import React, { useState } from 'react';
import { CheckSquare, Square } from 'lucide-react';
import { Verification } from '@/types';
import { DataStatus } from '@/components/ui';
import { useTranslation } from '@/i18n';

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
  const { t } = useTranslation();
  const [checkedReqs, setCheckedReqs] = useState<Record<number, boolean>>({});

  const toggleReq = (index: number) => {
    setCheckedReqs((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const completedCount = Object.values(checkedReqs).filter(Boolean).length;

  return (
    <section
      aria-labelledby="requirements-heading"
      className="bg-white rounded-xl border border-mist-200/90 p-6 sm:p-8"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-5 border-b border-mist-100">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2
              id="requirements-heading"
              className="text-xl font-bold text-mist-900 font-display"
            >
              {t.docRequirementsHeading}
            </h2>
            <DataStatus item={verification} />
          </div>
          <p className="text-xs text-mist-500 mt-0.5">
            {t.whoMayAvail} {whoMayAvail}
          </p>
        </div>
        <span className="text-xs font-mono-tabular font-semibold text-brand-800">
          {completedCount} {t.of} {requirements.length} {t.preparedCount}
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
                  ? 'bg-brand-50/70 border-brand-800/40 text-mist-900'
                  : 'bg-mist-50/70 border-mist-200/80 text-mist-800 hover:bg-mist-100/70'
              }`}
            >
              {isChecked ? (
                <CheckSquare className="w-5 h-5 text-brand-800 shrink-0 mt-0.5" />
              ) : (
                <Square className="w-5 h-5 text-mist-400 shrink-0 mt-0.5" />
              )}
              <span
                className={`text-sm leading-relaxed ${
                  isChecked ? 'line-through text-mist-500' : 'font-medium'
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
