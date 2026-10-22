'use client';

import React from 'react';
import { ChevronDown, Globe, MapPin } from 'lucide-react';
import { ArrowUpRight } from '@/components/ui';
import type { Transaction, TxOffice, TxSource } from '@/types/transactions';

interface Props {
  office: TxOffice;
  items: Transaction[];
  sources: Record<string, TxSource>;
  open: boolean;
  onToggle: () => void;
  noun: { one: string; many: string };
  itemsHereLabel: string;
}

/** Expandable office: steps, what to bring, and everything it handles. Content stays in the page while closed. */
export function OfficePanel({ office, items, sources, open, onToggle, noun, itemsHereLabel }: Props) {
  const bodyId = `office-${office.id}-body`;
  const h = 'text-[11px] font-semibold uppercase tracking-[0.14em] text-mist-500';
  return (
    <li id={`office-${office.id}`} className="scroll-mt-28 bg-white rounded-xl border border-mist-200/90 overflow-hidden">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={bodyId}
          className="flex w-full items-start justify-between gap-4 p-5 text-left hover:bg-mist-50 transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-700"
        >
          <span className="min-w-0">
            <span className="block font-bold text-brand-950">{office.name}</span>
            <span className="mt-1 block text-sm text-mist-600">{office.description}</span>
            <span className="mt-2 block text-xs font-semibold text-brand-700">
              {items.length} {items.length === 1 ? noun.one : noun.many} · {open ? 'Hide steps' : 'Show steps'}
            </span>
          </span>
          <ChevronDown className={`mt-1 w-5 h-5 shrink-0 text-mist-500 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
        </button>
      </h3>

      <div id={bodyId} hidden={!open} className="border-t border-mist-100 p-5 space-y-5">
        {(office.location || office.online) && (
          <div className="space-y-2 text-sm">
            {office.location && (
              <p className="flex items-start gap-2 text-mist-700">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-brand-700" aria-hidden="true" />
                {office.location}
              </p>
            )}
            {office.online && (
              <a href={office.online.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-semibold text-brand-800 hover:text-brand-950">
                <Globe className="w-4 h-4" aria-hidden="true" />
                {office.online.label}
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        )}

        <div>
          <h4 className={h}>Steps</h4>
          <ol className="mt-2 space-y-2">
            {office.steps.map((step, i) => (
              <li key={step} className="flex gap-3 text-sm text-mist-800">
                <span className="grid place-items-center shrink-0 w-6 h-6 rounded-full bg-brand-900 text-white text-xs font-bold font-mono-tabular">
                  {i + 1}
                </span>
                <span className="pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <h4 className={h}>What to bring</h4>
            <ul className="mt-2 space-y-1 text-sm text-mist-700 list-disc pl-5">
              {office.bring.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className={h}>{itemsHereLabel}</h4>
            <ul className="mt-2 space-y-1 text-sm">
              {items.map((c) => (
                <li key={c.id}>
                  <a href={`#${c.id}`} className="text-brand-800 hover:text-brand-950 underline underline-offset-2 decoration-brand-200">
                    {c.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {office.notes && (
          <ul className="space-y-1 text-sm text-mist-600">
            {office.notes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        )}

        <p className="text-[11px] text-mist-500">
          Steps are a general guide; the office may ask for more. Based on:{' '}
          {office.sources.map((id) => sources[id]?.label).filter(Boolean).join('; ')}.
        </p>
      </div>
    </li>
  );
}
