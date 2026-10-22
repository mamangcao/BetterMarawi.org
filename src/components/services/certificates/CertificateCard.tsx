'use client';

import React from 'react';
import Link from 'next/link';
import { Building2, Clock, Receipt, Sparkles } from 'lucide-react';
import { ArrowUpRight } from '@/components/ui';
import { LEGAL_LIMIT_SIMPLE, type Certificate, type FeeBasis, type Office } from '@/data/certificates';

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

interface Props {
  cert: Certificate;
  office: Office;
  onOpenOffice: (officeId: string) => void;
}

export function CertificateCard({ cert, office, onOpenOffice }: Props) {
  return (
    <li id={cert.id} className="scroll-mt-28 bg-white rounded-xl border border-mist-200/90 p-5">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h4 className="font-bold text-brand-950 leading-snug">{cert.name}</h4>
        {cert.freeForFirstJob && (
          <span className="inline-flex items-center gap-1 rounded-full bg-brand-900 px-2.5 py-0.5 text-[11px] font-semibold text-white">
            <Sparkles className="w-3 h-3 text-accent" aria-hidden="true" />
            Free for first-time jobseekers
          </span>
        )}
      </div>
      <p className="mt-1 text-sm text-mist-600">{cert.description}</p>

      <dl className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
        <div className="sm:col-span-2">
          <dt className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-mist-500">
            <Receipt className="w-3.5 h-3.5" aria-hidden="true" /> Fee
          </dt>
          <dd className="mt-1 text-mist-800">
            {cert.fee} <FeeBasisChip basis={cert.feeBasis} />
          </dd>
        </div>
        <div>
          <dt className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-mist-500">
            <Clock className="w-3.5 h-3.5" aria-hidden="true" /> Processing time
          </dt>
          <dd className="mt-1 text-mist-800">
            {cert.processing ?? 'Not yet published by the office.'}
            {!cert.processing && cert.simple && (
              <span className="block text-mist-600">By law: {LEGAL_LIMIT_SIMPLE}.</span>
            )}
          </dd>
        </div>
        <div>
          <dt className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-mist-500">
            <Building2 className="w-3.5 h-3.5" aria-hidden="true" /> Responsible office
          </dt>
          <dd className="mt-1">
            <button
              type="button"
              onClick={() => onOpenOffice(office.id)}
              className="inline-flex items-center gap-1 text-left font-semibold text-brand-800 underline decoration-brand-300 underline-offset-2 hover:text-brand-950 hover:decoration-brand-700 focus-visible:outline-2 focus-visible:outline-brand-700 rounded"
              aria-controls={`office-${office.id}`}
            >
              {office.name}
              <span className="sr-only">: see steps</span>
            </button>
          </dd>
        </div>
      </dl>

      {(cert.bring || cert.more) && (
        <div className="mt-4 border-t border-mist-100 pt-3 text-sm text-mist-600 space-y-1.5">
          {cert.bring && (
            <p>
              <span className="font-semibold text-mist-700">Also bring: </span>
              {cert.bring.join('; ')}
            </p>
          )}
          {cert.more && (
            <Link href={cert.more.href} className="inline-flex items-center gap-1 font-semibold text-brand-800 hover:text-brand-950">
              {cert.more.label}
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      )}
    </li>
  );
}
