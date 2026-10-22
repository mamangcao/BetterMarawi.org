import React from 'react';
import Link from 'next/link';
import { Building2, FileText } from 'lucide-react';
import { ArrowUpRight } from '@/components/ui';
import type { ServiceCardData } from '@/data/serviceCatalog';

/** A service on the /services grid. Every service, including Certificates, uses this same card. */
export function ServiceCard({ card }: { card: ServiceCardData }) {
  return (
    <Link
      href={card.href}
      className="group bg-white rounded-xl border border-mist-200/90 p-6 hover:border-brand-800/50 transition-all flex flex-col justify-between focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
    >
      <div>
        <div className="flex items-center justify-between gap-3 text-xs text-mist-500 font-mono-tabular mb-3">
          <span className="font-semibold text-brand-800">{card.acronym}</span>
          <span className="inline-flex items-center gap-1 font-sans">
            <Building2 className="w-3.5 h-3.5" aria-hidden="true" />
            {card.offices.length} {card.offices.length === 1 ? 'office' : 'offices'}
          </span>
        </div>
        <h2 className="text-xl font-bold text-mist-900 group-hover:text-brand-900 font-display">{card.title}</h2>
        <p className="text-sm text-mist-600 mt-2 leading-relaxed">{card.description}</p>
      </div>
      <div className="mt-5 pt-4 border-t border-mist-100 flex items-center justify-between gap-3 text-xs font-semibold text-brand-800">
        <span className="inline-flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5" aria-hidden="true" />
          {card.meta}
        </span>
        <ArrowUpRight className="w-4 h-4 shrink-0" />
      </div>
    </Link>
  );
}
