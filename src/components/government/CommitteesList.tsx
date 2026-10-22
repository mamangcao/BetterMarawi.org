import React from 'react';
import { Scale, Users } from 'lucide-react';

export function CommitteesList() {
  const committees = [
    { name: 'Rules, Laws & Ordinances', chair: 'City Vice Mayor' },
    { name: 'Finance, Budget & Appropriations', chair: 'Chair, Committee on Finance' },
    { name: 'Health, Sanitation & Universal Care', chair: 'Chair, Committee on Health' },
    { name: 'Education, Madrasah & Islamic Affairs', chair: 'Chair, Committee on Education' },
    { name: 'Trade, Commerce & Industry', chair: 'Chair, Committee on Trade' },
    { name: 'Infrastructure, Housing & Urban Development', chair: 'Chair, Committee on Infrastructure' },
    { name: 'Peace, Public Order & CDRRMO', chair: 'Chair, Committee on Public Order' },
    { name: 'Barangay Affairs & Community Relations', chair: 'Liga ng mga Barangay President' },
  ];

  return (
    <section className="bg-white rounded-xl border border-mist-200/90 p-6">
      <div className="flex items-center gap-2 pb-4 mb-4 border-b border-mist-100">
        <Scale className="w-5 h-5 text-brand-800" />
        <h2 className="text-xl font-bold text-mist-900 font-display">
          Sangguniang Panlungsod Standing Committees
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
        {committees.map((c) => (
          <div key={c.name} className="p-3 bg-mist-50 rounded-lg border border-mist-200/80">
            <div className="font-semibold text-mist-900">{c.name}</div>
            <div className="text-xs text-mist-500 mt-0.5 flex items-center gap-1">
              <Users className="w-3 h-3 text-brand-800" />
              {c.chair}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

