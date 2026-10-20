'use client';

import React, { useState } from 'react';
import { ServicePageData } from '@/types';
import { ServiceCard } from './ServiceCard';
import { useTranslation } from '@/i18n';

interface ServiceGridProps {
  services: ServicePageData[];
}

export function ServiceGrid({ services }: ServiceGridProps) {
  const { t } = useTranslation();
  const [filterText, setFilterText] = useState('');

  const filtered = services.filter(
    (s) =>
      s.title.toLowerCase().includes(filterText.toLowerCase()) ||
      s.shortDescription.toLowerCase().includes(filterText.toLowerCase()) ||
      s.responsibleOffice.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div>
      <div className="max-w-md mb-8">
        <input
          type="search"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          placeholder={t.filterServicesPlaceholder}
          className="w-full px-4 py-2.5 rounded-xl bg-white border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((service) => (
          <ServiceCard key={service.slug} service={service} />
        ))}
      </div>
    </div>
  );
}

