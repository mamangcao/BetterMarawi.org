import React from 'react';

export interface Stat {
  label: React.ReactNode;
  value: React.ReactNode;
  /** Small line under the label, such as the year or source */
  note?: React.ReactNode;
}

const VALUE_SIZE = {
  /** Numbers: counts, pesos, areas */
  number: 'text-2xl sm:text-3xl',
  /** Short phrases such as "Same-Day Release" */
  phrase: 'text-lg sm:text-xl leading-snug',
};

/**
 * Stat cards: the value first in the display font, the label under it.
 * Values line up across a row however long each label is.
 */
export function StatGrid({
  items,
  columns = 'grid-cols-2 lg:grid-cols-4',
  size = 'number',
  className = '',
}: {
  items: Stat[];
  /** Full Tailwind grid-cols classes, e.g. "grid-cols-2 sm:grid-cols-3" */
  columns?: string;
  size?: keyof typeof VALUE_SIZE;
  className?: string;
}) {
  return (
    <dl className={`grid ${columns} gap-px overflow-hidden rounded-xl border border-mist-200 bg-mist-200 ${className}`}>
      {items.map((s, i) => (
        <div key={i} className="bg-white p-4 sm:p-5 flex flex-col">
          <dd className={`order-1 font-bold font-display text-brand-950 tabular-nums ${VALUE_SIZE[size]}`}>{s.value}</dd>
          <dt className="order-2 mt-1 text-sm font-semibold text-brand-800 leading-snug">
            {s.label}
            {s.note && <span className="block mt-1 text-[11px] font-normal text-mist-500">{s.note}</span>}
          </dt>
        </div>
      ))}
    </dl>
  );
}
