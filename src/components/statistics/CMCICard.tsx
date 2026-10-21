import React from 'react';
import { ArrowUpRight, TrendingUp } from 'lucide-react';
import { CMCI_PILLARS, CMCI_SUMMARY, cmciVerification } from '@/data/cmci';
import { SourceNote } from '@/components/ui';

export function CMCICard() {
  return (
    <section className="bg-white rounded-xl border border-stone-200/90 p-6 sm:p-8 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-100">
        <div>
          <h2 className="text-xl font-bold text-stone-900 font-display flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-800" />
            5 Pillars of Competitiveness (DTI CMCI)
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Official {CMCI_SUMMARY.cycleYear} Competitiveness Cycle · {CMCI_SUMMARY.category}
          </p>
        </div>
        <div className="text-left sm:text-right">
          <div className="text-sm font-mono-tabular font-bold text-emerald-900">
            Composite Score: {CMCI_SUMMARY.compositeScore.toFixed(4)}
          </div>
          <div className="text-xs text-stone-500 font-mono-tabular">
            Rank #{CMCI_SUMMARY.overallRank} Nationwide
          </div>
        </div>
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
                <span className="text-stone-500">Cycle: {p.year}</span>
                {p.rank && (
                  <span className="text-stone-700 bg-stone-200/70 px-2 py-0.5 rounded font-medium">
                    Rank #{p.rank}
                  </span>
                )}
                <span className="font-bold text-stone-900 text-sm">
                  Score: {p.score.toFixed(4)}
                </span>
              </div>
            </div>
            {p.summary && (
              <p className="text-xs text-stone-600 leading-relaxed">
                {p.summary}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-100 text-xs">
        <SourceNote item={cmciVerification} />
        <a
          href="https://cmci.dti.gov.ph"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-emerald-800 hover:text-emerald-950 inline-flex items-center gap-1 shrink-0"
        >
          <span>View on DTI CMCI Portal</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </section>
  );
}
