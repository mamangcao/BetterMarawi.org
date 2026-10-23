import React from 'react';
import Link from 'next/link';
import { Building2, ListChecks } from 'lucide-react';
import { ArrowUpRight } from '@/components/ui';
import type { CityOffice } from '@/data/cityOffices';

/** A city office: what it does, what it handles (sourced), and links to its services. */
export function CityOfficeCard({ office }: { office: CityOffice }) {
  return (
    <li id={`city-office-${office.id}`} className="scroll-mt-28 flex flex-col bg-white rounded-xl border border-mist-200/90 p-5">
      <div className="flex items-start gap-3">
        <Building2 className="w-6 h-6 shrink-0 text-brand-700 mt-0.5" aria-hidden="true" />
        <div className="min-w-0">
          <h3 className="font-bold text-brand-950 leading-snug">{office.name}</h3>
          <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-mist-500 font-mono-tabular">
            {office.acronym}
          </p>
        </div>
      </div>
      <p className="mt-3 text-sm text-mist-700 leading-relaxed">{office.description}</p>

      <dl className="mt-3 space-y-2 text-sm">
        <div>
          <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-mist-500">Office head</dt>
          {office.head ? (
            <dd>
              <span className="block font-semibold text-brand-950">{office.head}</span>
              <span className="block text-[11px] font-semibold text-brand-700">Verified current officeholder</span>
            </dd>
          ) : (
            <dd className="text-mist-500 italic">To be confirmed</dd>
          )}
        </div>
        {office.handles.length > 0 && (
          <div>
            <dt className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-mist-500">
              <ListChecks className="w-3.5 h-3.5" aria-hidden="true" /> Handles
            </dt>
            <dd>
              <ul className="mt-1 flex flex-wrap gap-1.5">
                {office.handles.map((h) => (
                  <li key={h.href}>
                    <Link
                      href={h.href}
                      className="inline-flex rounded-full border border-mist-200 bg-mist-50 px-2.5 py-0.5 text-xs text-brand-800 hover:border-brand-300 hover:bg-brand-50"
                    >
                      {h.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        )}
      </dl>

      {office.services.length > 0 && (
        <div className="mt-auto pt-4 flex flex-wrap gap-2">
          {office.services.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="inline-flex items-center gap-1.5 rounded-lg bg-brand-900 px-3 py-2 text-xs font-semibold text-white hover:bg-brand-950 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
            >
              View services: {s.label}
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          ))}
        </div>
      )}
    </li>
  );
}
