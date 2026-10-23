import React from 'react';
import Link from 'next/link';
import { FileText } from 'lucide-react';
import { ArrowUpRight } from './ArrowUpRight';

interface LinkCardProps {
  href: string;
  /** Small label at the top left, e.g. an office acronym or "Overview" */
  label: string;
  /** Top-right detail, e.g. an office count or an icon */
  aside: React.ReactNode;
  title: string;
  description: string;
  /** Short, accurate footer, e.g. "10 city offices" */
  meta: string;
}

/** Card that links to a page: used by the /services grid and the section landing pages */
export function LinkCard({ href, label, aside, title, description, meta }: LinkCardProps) {
  return (
    <Link
      href={href}
      className="group bg-white rounded-xl border border-mist-200/90 p-6 hover:border-brand-800/50 transition-all flex flex-col justify-between focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
    >
      <div>
        <div className="flex items-center justify-between gap-3 text-xs text-mist-500 font-mono-tabular mb-3">
          <span className="font-semibold text-brand-800">{label}</span>
          {aside}
        </div>
        <h2 className="text-xl font-bold text-mist-900 group-hover:text-brand-900 font-display">{title}</h2>
        <p className="text-sm text-mist-600 mt-2 leading-relaxed">{description}</p>
      </div>
      <div className="mt-5 pt-4 border-t border-mist-100 flex items-center justify-between gap-3 text-xs font-semibold text-brand-800">
        <span className="inline-flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5" aria-hidden="true" />
          {meta}
        </span>
        <ArrowUpRight className="w-4 h-4 shrink-0" />
      </div>
    </Link>
  );
}
