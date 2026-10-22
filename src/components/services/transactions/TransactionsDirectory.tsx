'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import type { TxDirectoryData } from '@/types/transactions';
import { TransactionCard } from './TransactionCard';
import { OfficePanel } from './OfficePanel';

export interface TxDirectoryLabels {
  /** Heading above the list, e.g. "Certificates and clearances" */
  listHeading: string;
  searchPlaceholder: string;
  /** Singular and plural for counts, e.g. document / documents */
  noun: { one: string; many: string };
  /** Office panel list title, e.g. "Documents issued here" */
  itemsHereLabel: string;
  officesIntro: string;
}

interface Props {
  data: TxDirectoryData;
  labels: TxDirectoryLabels;
}

/**
 * Shared directory for transaction-style service pages: searchable, filterable list of
 * transactions grouped by category, plus expandable responsible-office panels with steps.
 * Every item and office is in the initial HTML; filters only hide cards in the browser.
 */
export function TransactionsDirectory({ data, labels }: Props) {
  const { categories, offices, items, sources } = data;
  const officeById = useMemo(() => Object.fromEntries(offices.map((o) => [o.id, o])), [offices]);
  const [category, setCategory] = useState<string>('all');
  const [query, setQuery] = useState('');
  const [openOffices, setOpenOffices] = useState<Set<string>>(new Set());

  const toggleOffice = (id: string) =>
    setOpenOffices((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  /** Open an office panel and bring it into view (from a card's "Responsible office"). */
  const openOffice = useCallback((id: string) => {
    setOpenOffices((prev) => new Set(prev).add(id));
    window.history.replaceState(null, '', `#office-${id}`);
    requestAnimationFrame(() =>
      document.getElementById(`office-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    );
  }, []);

  // Deep links like #office-psa open that office on load
  useEffect(() => {
    const m = window.location.hash.match(/^#office-([\w-]+)$/);
    if (m && officeById[m[1]]) openOffice(m[1]);
  }, [openOffice, officeById]);

  const q = query.trim().toLowerCase();
  const visible = useMemo(
    () =>
      items.filter(
        (c) =>
          (category === 'all' || c.category === category) &&
          (!q ||
            c.name.toLowerCase().includes(q) ||
            c.description.toLowerCase().includes(q) ||
            officeById[c.officeId]?.name.toLowerCase().includes(q))
      ),
    [items, category, q, officeById]
  );

  const chip = (active: boolean) =>
    `px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
      active ? 'bg-brand-900 text-white' : 'bg-mist-100 text-mist-700 hover:bg-mist-200'
    }`;

  return (
    <div className="space-y-12">
      <section aria-labelledby="tx-list-heading" className="space-y-5">
        <h2 id="tx-list-heading" className="text-2xl font-bold text-brand-950 font-display">
          {labels.listHeading}
        </h2>

        <div className="space-y-3">
          <label className="relative block">
            <span className="sr-only">Search</span>
            <Search className="w-4 h-4 text-mist-400 absolute left-3.5 top-3 pointer-events-none" aria-hidden="true" />
            <input
              id="tx-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={labels.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-mist-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-700"
            />
          </label>
          {categories.length > 1 && (
            <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by category">
              <button type="button" className={chip(category === 'all')} aria-pressed={category === 'all'} onClick={() => setCategory('all')}>
                All ({items.length})
              </button>
              {categories.map((c) => (
                <button key={c.id} type="button" className={chip(category === c.id)} aria-pressed={category === c.id} onClick={() => setCategory(c.id)}>
                  {c.title}
                </button>
              ))}
            </div>
          )}
        </div>

        {categories.map((cat) => {
          const list = visible.filter((c) => c.category === cat.id);
          if (!list.length) return null;
          return (
            <div key={cat.id} className="space-y-3">
              <div>
                <h3 className="text-lg font-bold text-brand-900">{cat.title}</h3>
                <p className="text-sm text-mist-600">{cat.description}</p>
              </div>
              <ul className="grid grid-cols-1 gap-3">
                {list.map((c) => (
                  <TransactionCard key={c.id} item={c} office={officeById[c.officeId]} onOpenOffice={openOffice} />
                ))}
              </ul>
            </div>
          );
        })}
        {!visible.length && (
          <p className="rounded-xl border border-dashed border-mist-300 p-6 text-center text-sm text-mist-600">
            Nothing matches “{query}”. Try another word, or choose All.
          </p>
        )}
      </section>

      <section aria-labelledby="tx-offices-heading" className="space-y-4">
        <div>
          <h2 id="tx-offices-heading" className="text-2xl font-bold text-brand-950 font-display">
            Responsible offices
          </h2>
          <p className="text-sm text-mist-600 mt-1">{labels.officesIntro}</p>
        </div>
        <ul className="space-y-3">
          {offices.map((o) => (
            <OfficePanel
              key={o.id}
              office={o}
              items={items.filter((c) => c.officeId === o.id)}
              sources={sources}
              open={openOffices.has(o.id)}
              onToggle={() => toggleOffice(o.id)}
              noun={labels.noun}
              itemsHereLabel={labels.itemsHereLabel}
            />
          ))}
        </ul>
      </section>
    </div>
  );
}
