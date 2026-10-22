import React from 'react';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { FileText } from 'lucide-react';
import { ArrowUpRight } from '@/components/ui';

export interface HubCard {
  href: string;
  /** Small label above the title, e.g. "2025–2028 Term" */
  eyebrow: string;
  title: string;
  description: string;
  /** Short, accurate footer, e.g. "10 city offices" */
  meta: string;
  icon: LucideIcon;
}

interface Props {
  eyebrow: string;
  title: string;
  intro: string;
  cards: HubCard[];
}

/**
 * Landing page body for a top-level section (Government, Transparency, Statistics):
 * a header and one card per sub-page, in the same style as the /services grid.
 */
export function SectionHub({ eyebrow, title, intro, cards }: Props) {
  return (
    <>
      <section className="bg-gradient-to-b from-surface-card to-surface border-b border-mist-200/90 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-800 mb-2">{eyebrow}</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-mist-950 font-display">{title}</h1>
          <p className="mt-3 text-base text-mist-700 max-w-2xl">{intro}</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map(({ href, eyebrow: label, title: cardTitle, description, meta, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="group bg-white rounded-xl border border-mist-200/90 p-6 hover:border-brand-800/50 transition-all flex flex-col justify-between focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
            >
              <div>
                <div className="flex items-center justify-between gap-3 text-xs text-mist-500 font-mono-tabular mb-3">
                  <span className="font-semibold text-brand-800">{label}</span>
                  <Icon className="w-4 h-4 text-brand-700" aria-hidden="true" />
                </div>
                <h2 className="text-xl font-bold text-mist-900 group-hover:text-brand-900 font-display">{cardTitle}</h2>
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
          ))}
        </div>
      </section>
    </>
  );
}
