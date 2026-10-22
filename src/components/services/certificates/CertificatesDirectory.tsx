'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { CERTIFICATES, CERT_CATEGORIES, OFFICES, type CertCategory } from '@/data/certificates';
import { CertificateCard } from './CertificateCard';
import { OfficePanel } from './OfficePanel';

const OFFICE_BY_ID = Object.fromEntries(OFFICES.map((o) => [o.id, o]));

/** Certificates grouped by category, plus expandable responsible-office panels with steps. */
export function CertificatesDirectory() {
  const [category, setCategory] = useState<CertCategory | 'all'>('all');
  const [query, setQuery] = useState('');
  const [openOffices, setOpenOffices] = useState<Set<string>>(new Set());

  const toggleOffice = (id: string) =>
    setOpenOffices((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  /** Open an office panel and bring it into view (from a certificate's "Responsible office"). */
  const openOffice = useCallback((id: string) => {
    setOpenOffices((prev) => new Set(prev).add(id));
    window.history.replaceState(null, '', `#office-${id}`);
    requestAnimationFrame(() =>
      document.getElementById(`office-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    );
  }, []);

  // Support links like /services/certificates#office-psa
  useEffect(() => {
    const m = window.location.hash.match(/^#office-([\w-]+)$/);
    if (m && OFFICE_BY_ID[m[1]]) openOffice(m[1]);
  }, [openOffice]);

  const q = query.trim().toLowerCase();
  const visible = useMemo(
    () =>
      CERTIFICATES.filter(
        (c) =>
          (category === 'all' || c.category === category) &&
          (!q ||
            c.name.toLowerCase().includes(q) ||
            c.description.toLowerCase().includes(q) ||
            OFFICE_BY_ID[c.officeId].name.toLowerCase().includes(q))
      ),
    [category, q]
  );

  const chip = (active: boolean) =>
    `px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
      active ? 'bg-brand-900 text-white' : 'bg-mist-100 text-mist-700 hover:bg-mist-200'
    }`;

  return (
    <div className="space-y-12">
      <section aria-labelledby="cert-list-heading" className="space-y-5">
        <h2 id="cert-list-heading" className="text-2xl font-bold text-brand-950 font-display">
          Certificates and clearances
        </h2>

        <div className="space-y-3">
          <label className="relative block">
            <span className="sr-only">Search certificates</span>
            <Search className="w-4 h-4 text-mist-400 absolute left-3.5 top-3 pointer-events-none" aria-hidden="true" />
            <input
              id="cert-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search, e.g. birth, clearance, cedula"
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-mist-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-700"
            />
          </label>
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by category">
            <button type="button" className={chip(category === 'all')} aria-pressed={category === 'all'} onClick={() => setCategory('all')}>
              All ({CERTIFICATES.length})
            </button>
            {CERT_CATEGORIES.map((c) => (
              <button key={c.id} type="button" className={chip(category === c.id)} aria-pressed={category === c.id} onClick={() => setCategory(c.id)}>
                {c.title}
              </button>
            ))}
          </div>
        </div>

        {CERT_CATEGORIES.map((cat) => {
          const items = visible.filter((c) => c.category === cat.id);
          if (!items.length) return null;
          return (
            <div key={cat.id} className="space-y-3">
              <div>
                <h3 className="text-lg font-bold text-brand-900">{cat.title}</h3>
                <p className="text-sm text-mist-600">{cat.description}</p>
              </div>
              <ul className="grid grid-cols-1 gap-3">
                {items.map((c) => (
                  <CertificateCard key={c.id} cert={c} office={OFFICE_BY_ID[c.officeId]} onOpenOffice={openOffice} />
                ))}
              </ul>
            </div>
          );
        })}
        {!visible.length && (
          <p className="rounded-xl border border-dashed border-mist-300 p-6 text-center text-sm text-mist-600">
            No certificate matches “{query}”. Try another word, or choose All.
          </p>
        )}
      </section>

      <section aria-labelledby="offices-heading" className="space-y-4">
        <div>
          <h2 id="offices-heading" className="text-2xl font-bold text-brand-950 font-display">
            Responsible offices
          </h2>
          <p className="text-sm text-mist-600 mt-1">Open an office to see its steps, what to bring, and every document it issues.</p>
        </div>
        <ul className="space-y-3">
          {OFFICES.map((o) => (
            <OfficePanel
              key={o.id}
              office={o}
              certificates={CERTIFICATES.filter((c) => c.officeId === o.id)}
              open={openOffices.has(o.id)}
              onToggle={() => toggleOffice(o.id)}
            />
          ))}
        </ul>
      </section>
    </div>
  );
}
