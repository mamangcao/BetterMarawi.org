import React from 'react';
import { Gavel } from 'lucide-react';
import { SourceNote } from '@/components/ui';
import { BLGC_SOURCE, ORDINANCE_STEPS } from '@/data/ordinanceGuide';

/** The four steps from council vote to an ordinance taking effect, each with its BLGC section */
export function OrdinanceProcess() {
  return (
    <section className="bg-white rounded-xl border border-mist-200/90 p-6 sm:p-8" aria-labelledby="ordinance-process-heading">
      <div className="flex items-center gap-2">
        <Gavel className="w-5 h-5 text-brand-800" aria-hidden="true" />
        <h2 id="ordinance-process-heading" className="text-xl font-bold text-mist-900 font-display">
          How an ordinance becomes law in Marawi
        </h2>
      </div>
      <p className="text-sm text-mist-600 mt-1">An ordinance is a local law. Every city ordinance goes through these steps.</p>

      <ol className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-px overflow-hidden rounded-xl border border-mist-200 bg-mist-200">
        {ORDINANCE_STEPS.map((s, i) => (
          <li key={s.title} className="bg-white p-5 flex flex-col">
            <span className="font-mono-tabular text-sm font-bold text-brand-700" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="mt-1 text-base font-bold text-brand-950">{s.title}</h3>
            <p className="mt-1.5 text-sm text-mist-700 leading-relaxed flex-1">{s.text}</p>
            <p className="mt-3 text-[11px] font-mono-tabular text-mist-500">{s.sections}</p>
          </li>
        ))}
      </ol>

      <SourceNote item={BLGC_SOURCE} className="mt-4 pt-4 border-t border-mist-100" />
    </section>
  );
}
