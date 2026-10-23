'use client';

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { DepartmentRecord } from '@/types';
import { DepartmentCard } from './DepartmentCard';
import { useTranslation } from '@/i18n';

interface DepartmentsListProps {
  departments: DepartmentRecord[];
}

export function DepartmentsList({ departments }: DepartmentsListProps) {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = departments.filter(
    (d) =>
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.acronym.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (d.head ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.keyServices.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="max-w-md relative">
        <Search className="w-4 h-4 text-mist-400 absolute left-3.5 top-3.5 pointer-events-none" />
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t.searchDepartmentsPlaceholder}
          className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-mist-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-800"
        />
      </div>

      <div className="space-y-5">
        {filtered.map((dept) => (
          <DepartmentCard key={dept.id} dept={dept} />
        ))}
      </div>
    </div>
  );
}

