'use client';
import React from 'react';
import { BUDGET_BREAKDOWN_2026, budgetVerification } from '@/data/budget';
import { formatWithPeso, DataStatus } from '@/components/ui';
import { useTranslation } from '@/i18n';

export function BudgetChart() {
  const { t } = useTranslation();
  return (
    <div className="space-y-8">
      {/* Summary KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-stone-200/90 p-5">
          <div className="flex items-center justify-between gap-2">
            <div className="text-xs text-stone-500">{t.totalAnnualBudget}</div>
            <DataStatus item={budgetVerification} />
          </div>
          <div className="text-2xl font-bold text-stone-950 font-mono-tabular mt-1">
            {formatWithPeso(BUDGET_BREAKDOWN_2026.totalBudget)}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-stone-200/90 p-5">
          <div className="text-xs text-stone-500">{t.nationalTaxAllotment}</div>
          <div className="text-lg font-bold text-emerald-900 font-mono-tabular mt-1">
            {formatWithPeso(BUDGET_BREAKDOWN_2026.ntaShare)}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-stone-200/90 p-5">
          <div className="text-xs text-stone-500">{t.localRevenueSources}</div>
          <div className="text-lg font-bold text-stone-900 font-mono-tabular mt-1">
            {formatWithPeso(BUDGET_BREAKDOWN_2026.localSources)}
          </div>
        </div>
      </div>

      {/* Sectoral Progress Bars */}
      <section className="bg-white rounded-xl border border-stone-200/90 p-6 sm:p-8 space-y-6">
        <div className="pb-4 border-b border-stone-100">
          <h2 className="text-xl font-bold text-stone-900 font-display">
            {t.appropriationsBySector}
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            {t.enactedViaBudget}
          </p>
        </div>

        <div className="space-y-6">
          {BUDGET_BREAKDOWN_2026.sectors.map((item) => (
            <div key={item.sector} className="space-y-2">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-sm font-bold text-stone-900">
                  {item.sector}
                </h3>
                <div className="text-sm font-mono-tabular font-bold text-emerald-900">
                  {formatWithPeso(item.amount)} ({item.percentage}%)
                </div>
              </div>
              <div className="w-full h-3 bg-stone-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-800 rounded-full"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
