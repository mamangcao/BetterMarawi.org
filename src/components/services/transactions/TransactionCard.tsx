'use client';

import React from 'react';
import Link from 'next/link';
import { Building2, CalendarClock, Clock, Receipt, Sparkles } from 'lucide-react';
import { ArrowUpRight } from '@/components/ui';
import type { FeeBasis, Transaction, TxOffice } from '@/types/transactions';

const BASIS: Record<FeeBasis, { text: string; className: string }> = {
  law: { text: 'National law', className: 'bg-brand-50 text-brand-800 border-brand-200' },
  agency: { text: 'Set by the agency', className: 'bg-lake-50 text-lake-800 border-lake-200' },
  city: { text: 'Set by the city · ask the office', className: 'bg-accent-light text-accent-deep border-accent-muted/40' },
  barangay: { text: 'Set by the barangay', className: 'bg-accent-light text-accent-deep border-accent-muted/40' },
};

export function FeeBasisChip({ basis }: { basis: FeeBasis }) {
  const b = BASIS[basis];
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${b.className}`}>
      {b.text}
    </span>
  );
}

const label = 'flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-mist-500';

interface Props {
  item: Transaction;
  office: TxOffice;
  onOpenOffice: (officeId: string) => void;
}

/** One transaction: fee (with its source), processing time, schedule, and the office that handles it. */
export function TransactionCard({ item, office, onOpenOffice }: Props) {
  return (
    <li id={item.id} className="scroll-mt-28 bg-white rounded-xl border border-mist-200/90 p-5">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h4 className="font-bold text-brand-950 leading-snug">{item.name}</h4>
        <div className="flex flex-wrap items-center gap-2">
          {item.freeForFirstJob && (
            <span className="inline-flex items-center gap-1 rounded-full bg-brand-900 px-2.5 py-0.5 text-[11px] font-semibold text-white">
              <Sparkles className="w-3 h-3 text-accent" aria-hidden="true" />
              Free for first-time jobseekers
            </span>
          )}
          {item.online && (
            <a
              href={item.online.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-800 hover:bg-brand-100"
            >
              {item.online.label}
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
      <p className="mt-1 text-sm text-mist-600">{item.description}</p>

      <dl className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
        <div className="sm:col-span-2">
          <dt className={label}>
            <Receipt className="w-3.5 h-3.5" aria-hidden="true" /> Fee
          </dt>
          <dd className="mt-1 text-mist-800">
            {item.fee} <FeeBasisChip basis={item.feeBasis} />
          </dd>
        </div>
        <div>
          <dt className={label}>
            <Clock className="w-3.5 h-3.5" aria-hidden="true" /> Processing time
          </dt>
          <dd className="mt-1 text-mist-800">
            {item.processing ?? 'Not yet published by the office.'}
            {!item.processing && item.legalLimit && (
              <span className="block text-mist-600">By law: {item.legalLimit}.</span>
            )}
          </dd>
        </div>
        {item.schedule ? (
          <div>
            <dt className={label}>
              <CalendarClock className="w-3.5 h-3.5" aria-hidden="true" /> When to file or pay
            </dt>
            <dd className="mt-1 text-mist-800">{item.schedule}</dd>
          </div>
        ) : null}
        <div className={item.schedule ? 'sm:col-span-2' : ''}>
          <dt className={label}>
            <Building2 className="w-3.5 h-3.5" aria-hidden="true" /> Responsible office
          </dt>
          <dd className="mt-1">
            <button
              type="button"
              onClick={() => onOpenOffice(office.id)}
              aria-controls={`office-${office.id}`}
              className="inline-flex items-center gap-1 text-left font-semibold text-brand-800 underline decoration-brand-300 underline-offset-2 hover:text-brand-950 hover:decoration-brand-700 focus-visible:outline-2 focus-visible:outline-brand-700 rounded"
            >
              {office.name}
              <span className="sr-only">: see steps</span>
            </button>
          </dd>
        </div>
      </dl>

      {(item.bring || item.notes || item.more) && (
        <div className="mt-4 border-t border-mist-100 pt-3 text-sm text-mist-600 space-y-1.5">
          {item.bring && (
            <p>
              <span className="font-semibold text-mist-700">Also bring: </span>
              {item.bring.join('; ')}
            </p>
          )}
          {item.notes?.map((n) => (
            <p key={n} className="flex gap-2">
              <span aria-hidden="true" className="text-mist-400">•</span>
              {n}
            </p>
          ))}
          {item.more && (
            <Link href={item.more.href} className="inline-flex items-center gap-1 font-semibold text-brand-800 hover:text-brand-950">
              {item.more.label}
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      )}
    </li>
  );
}
