import React from 'react';
import { Ambulance, Baby, type LucideIcon } from 'lucide-react';

// Programs confirmed in public reports (see HEALTH_SOURCES in src/data/healthFacilities.ts).
// PhilHealth YAKAP has its own detailed panel right after this block.
const PROGRAMS: { icon: LucideIcon; title: string; where: string; description: string }[] = [
  {
    icon: Baby,
    title: '24/7 Birthing Clinic',
    where: 'City Health Unit, Marawi City Health Office',
    description: 'Round-the-clock maternal delivery care, opened with the City Health Unit in June 2023.',
  },
  {
    icon: Ambulance,
    title: 'Urgent Care (BUCAS)',
    where: 'Marawi City General Hospital building, under APMC',
    description:
      'Bagong Urgent Care and Ambulatory Service: walk-in urgent and outpatient care while the hospital is being completed.',
  },
];

export function HealthPrograms() {
  return (
    <section aria-labelledby="health-programs-heading" className="space-y-4">
      <div>
        <h2 id="health-programs-heading" className="text-2xl font-bold text-brand-950 font-display">
          Health Programs
        </h2>
        <p className="text-sm text-mist-600 mt-1">
          Public health services you can use in Marawi, including free primary care under PhilHealth YAKAP.
        </p>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-px overflow-hidden rounded-xl border border-mist-200 bg-mist-200">
        {PROGRAMS.map(({ icon: Icon, title, where, description }) => (
          <li key={title} className="bg-white p-5 flex gap-3">
            <Icon className="w-6 h-6 shrink-0 text-lake-700" aria-hidden="true" />
            <div className="min-w-0">
              <h3 className="font-bold text-brand-950">{title}</h3>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-mist-500 mt-0.5">{where}</p>
              <p className="mt-2 text-sm text-mist-600 leading-relaxed">{description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
