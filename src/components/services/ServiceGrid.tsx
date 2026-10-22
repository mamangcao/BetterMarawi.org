'use client';

import React, { useState } from 'react';
import type { ServiceCardData } from '@/data/serviceCatalog';
import { ServiceCard } from './ServiceCard';
import { useTranslation } from '@/i18n';

export function ServiceGrid({ cards }: { cards: ServiceCardData[] }) {
  const { t } = useTranslation();
  const [filterText, setFilterText] = useState('');
  const q = filterText.trim().toLowerCase();

  const filtered = cards.filter(
    (c) =>
      !q ||
      c.title.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.offices.some((o) => o.name.toLowerCase().includes(q))
  );

  return (
    <div>
      <div className="max-w-md mb-8">
        <input
          id="services-filter"
          type="search"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          placeholder={t.filterServicesPlaceholder}
          aria-label={t.filterServicesPlaceholder}
          className="w-full px-4 py-2.5 rounded-xl bg-white border border-mist-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-800"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((card) => (
          <ServiceCard key={card.slug} card={card} />
        ))}
      </div>
    </div>
  );
}
