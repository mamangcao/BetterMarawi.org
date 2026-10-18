import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { DepartmentRecord } from '@/types';

interface DepartmentCardProps {
  dept: DepartmentRecord;
}

export function DepartmentCard({ dept }: DepartmentCardProps) {
  return (
    <div className="bg-white rounded-xl border border-stone-200/90 p-6 space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-2 pb-3 border-b border-stone-100">
        <div>
          <span className="text-xs font-mono-tabular font-semibold text-emerald-800">
            {dept.acronym}
          </span>
          <h2 className="text-xl font-bold text-stone-900 font-display mt-0.5">
            {dept.name}
          </h2>
        </div>
        <div className="text-right">
          <div className="text-xs text-stone-500">{dept.designation}</div>
          <div className="text-sm font-bold text-stone-900">{dept.head}</div>
        </div>
      </div>

      <p className="text-sm text-stone-600 leading-relaxed">{dept.mandate}</p>

      <div>
        <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
          Frontline Services
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs text-stone-700">
          {dept.keyServices.map((srv, idx) => (
            <React.Fragment key={srv}>
              <span className="font-medium text-stone-800">{srv}</span>
              {idx < dept.keyServices.length - 1 && (
                <span aria-hidden="true" className="text-stone-400">
                  ·
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="pt-3 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-stone-600 font-mono-tabular">
        <div className="flex items-center gap-1.5">
          <Phone className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
          <span>{dept.phone}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Mail className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
          <span className="truncate">{dept.email}</span>
        </div>
        <div className="flex items-center gap-1.5 font-sans">
          <MapPin className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
          <span className="truncate">{dept.location}</span>
        </div>
      </div>
    </div>
  );
}

