import React from 'react';
import { TrendingUp } from 'lucide-react';
import { CMCI_PILLARS } from '@/data/cmci';

export function CMCICard() {
  return (
    <section className="bg-white rounded-xl border border-stone-200/90 p-6 sm:p-8 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-stone-100">
        <div>
          <h2 className="text-xl font-bold text-stone-900 font-display flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-800" />
            5 Pillars of Competitiveness (DTI CMCI)
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Year-over-Year Pillar Score Comparison (2025 vs 2026)
          </p>
        </div>
        <span className="text-xs font-mono-tabular font-bold text-emerald-900">
          Overall Composite Score: 55.25 (+8.48)
        </span>
      </div>

      <div className="space-y-4">
        {CMCI_PILLARS.map((p) => (
          <div
            key={p.pillar}
            className="p-5 rounded-xl bg-stone-50 border border-stone-200/80 space-y-2"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-base font-bold text-stone-900">
                {p.pillar}
              </h3>
              <div className="flex items-center gap-3 font-mono-tabular text-xs">
                <span className="text-stone-500">2025: {p.score2025.toFixed(2)}</span>
                <span className="font-bold text-stone-900 text-sm">
                  2026: {p.score2026.toFixed(2)}
                </span>
                <span className="text-emerald-800 font-bold">({p.change})</span>
              </div>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              {p.summary}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

