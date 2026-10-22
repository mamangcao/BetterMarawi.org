import React from 'react';
import {
  Building2,
  Construction,
  HeartPulse,
  Hospital,
  House,
  Phone,
  Stethoscope,
  type LucideIcon,
} from 'lucide-react';
import { ArrowUpRight } from '@/components/ui';
import {
  BARANGAY_HEALTH,
  CITY_HEALTH_OFFICE,
  HEALTH_SOURCES,
  MARAWI_HOSPITALS,
  MARAWI_INFIRMARIES,
  RURAL_HEALTH_UNITS,
  UPCOMING_HOSPITAL,
  type AccreditedFacility,
} from '@/data/healthFacilities';

const chip = 'inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold';

function FacilityRow({ f }: { f: AccreditedFacility }) {
  return (
    <li className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-start justify-between gap-3">
      <div className="min-w-0">
        <h4 className="font-bold text-brand-950 leading-snug">{f.name}</h4>
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          <span className={`${chip} bg-mist-50 text-mist-700 border-mist-200`}>{f.level}</span>
          <span className={`${chip} bg-mist-50 text-mist-700 border-mist-200 font-mono-tabular`}>
            {f.beds} beds
          </span>
          <span
            className={`${chip} ${
              f.sector === 'Government'
                ? 'bg-brand-50 text-brand-800 border-brand-200'
                : 'bg-lake-50 text-lake-800 border-lake-200'
            }`}
          >
            {f.sector}
          </span>
        </div>
        <p className="mt-1.5 text-sm text-mist-600">{f.address}, Marawi City</p>
        {f.note && <p className="mt-1 text-xs text-mist-500">{f.note}</p>}
      </div>
      <a
        href={`tel:${f.phone.replace(/\s/g, '')}`}
        className="shrink-0 inline-flex items-center gap-1.5 rounded-lg border border-mist-200 px-3 py-1.5 text-xs font-semibold text-brand-800 hover:bg-mist-50 font-mono-tabular"
      >
        <Phone className="w-3.5 h-3.5" aria-hidden="true" />
        {f.phone}
      </a>
    </li>
  );
}

function Group({
  icon: Icon,
  title,
  count,
  children,
}: {
  icon: LucideIcon;
  title: string;
  count?: number;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl border border-mist-200/90 p-5 sm:p-6">
      <h3 className="flex items-center gap-2 pb-3 mb-4 border-b border-mist-100 text-base font-bold text-brand-950">
        <Icon className="w-5 h-5 text-brand-700" aria-hidden="true" />
        {title}
        {count !== undefined && (
          <span className="ml-auto text-xs font-mono-tabular font-semibold text-mist-500">{count}</span>
        )}
      </h3>
      {children}
    </div>
  );
}

export function HealthFacilities() {
  const bhsTotal = BARANGAY_HEALTH.stations + BARANGAY_HEALTH.centers;
  const summary = [
    { value: MARAWI_HOSPITALS.length, label: 'Hospitals', note: 'PhilHealth-accredited, Sept 2026' },
    { value: MARAWI_INFIRMARIES.length, label: 'Infirmaries', note: 'PhilHealth-accredited, Sept 2026' },
    { value: RURAL_HEALTH_UNITS.length, label: 'Rural Health Units', note: 'PIA, June 2023' },
    { value: bhsTotal, label: 'Barangay health stations & centers', note: 'PIA, June 2023' },
    { value: 1, label: 'City Health Office', note: 'With a 24/7 birthing clinic' },
  ];

  return (
    <section aria-labelledby="health-facilities-heading" className="space-y-6">
      <div>
        <h2 id="health-facilities-heading" className="text-2xl font-bold text-brand-950 font-display">
          Health Facilities in Marawi
        </h2>
        <p className="text-sm text-mist-600 mt-1">
          Hospitals, infirmaries, and public health offices serving the Islamic City of Marawi, with
          the source of each figure listed below.
        </p>
      </div>

      {/* Summary counts */}
      <dl className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-px overflow-hidden rounded-xl border border-mist-200 bg-mist-200">
        {summary.map((s) => (
          <div key={s.label} className="bg-white p-4 flex flex-col">
            <dd className="order-1 text-3xl font-bold font-display text-brand-950 tabular-nums">{s.value}</dd>
            <dt className="order-2 mt-1 text-sm font-semibold text-brand-800 leading-snug">{s.label}</dt>
            <span className="order-3 mt-1 text-[11px] text-mist-500">{s.note}</span>
          </div>
        ))}
      </dl>

      <Group icon={Hospital} title="Hospitals" count={MARAWI_HOSPITALS.length}>
        <ul className="divide-y divide-mist-100">
          {MARAWI_HOSPITALS.map((f) => (
            <FacilityRow key={f.name} f={f} />
          ))}
        </ul>
      </Group>

      <Group icon={Stethoscope} title="Infirmaries" count={MARAWI_INFIRMARIES.length}>
        <ul className="divide-y divide-mist-100">
          {MARAWI_INFIRMARIES.map((f) => (
            <FacilityRow key={f.name} f={f} />
          ))}
        </ul>
      </Group>

      <Group icon={Building2} title="City Health Office and Rural Health Units">
        <p className="font-bold text-brand-950">{CITY_HEALTH_OFFICE.name}</p>
        <p className="mt-1 text-sm text-mist-600">{CITY_HEALTH_OFFICE.description}</p>
        <p className="mt-4 text-sm font-semibold text-brand-800">
          {RURAL_HEALTH_UNITS.length} Rural Health Units (RHUs), by barangay
        </p>
        <ul className="mt-2 flex flex-wrap gap-2">
          {RURAL_HEALTH_UNITS.map((b) => (
            <li key={b} className={`${chip} bg-brand-50 text-brand-800 border-brand-200 text-xs px-3 py-1`}>
              Brgy. {b}
            </li>
          ))}
        </ul>
      </Group>

      <Group icon={House} title="Barangay Health Stations and Centers" count={bhsTotal}>
        <p className="text-sm text-mist-700">
          <strong className="text-brand-950">{BARANGAY_HEALTH.stations} barangay health stations</strong> in the{' '}
          {BARANGAY_HEALTH.stationsArea}, and{' '}
          <strong className="text-brand-950">{BARANGAY_HEALTH.centers} barangay health centers</strong> in the{' '}
          {BARANGAY_HEALTH.centersArea}, as reported in June 2023.
        </p>
        <p className="mt-3 text-xs text-mist-500">Stations confirmed by name in public reports:</p>
        <ul className="mt-1.5 flex flex-wrap gap-2">
          {BARANGAY_HEALTH.namedStations.map((b) => (
            <li key={b} className={`${chip} bg-mist-50 text-mist-700 border-mist-200 text-xs px-3 py-1`}>
              {b}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-mist-500">
          The full list by barangay will be added once it is confirmed with the City Health Office.
        </p>
      </Group>

      <div className="rounded-xl border border-dashed border-lake-300 bg-lake-50 p-5 sm:p-6">
        <h3 className="flex items-center gap-2 text-base font-bold text-lake-800">
          <Construction className="w-5 h-5" aria-hidden="true" />
          Coming soon: {UPCOMING_HOSPITAL.name}
        </h3>
        <p className="mt-1 text-sm text-lake-900/80">{UPCOMING_HOSPITAL.location}</p>
        <p className="mt-2 text-sm text-mist-700">{UPCOMING_HOSPITAL.status}</p>
      </div>

      <div className="text-xs text-mist-500">
        <p className="flex items-center gap-1.5 font-semibold text-mist-600">
          <HeartPulse className="w-3.5 h-3.5" aria-hidden="true" />
          Sources
        </p>
        <ul className="mt-1.5 space-y-1">
          {Object.values(HEALTH_SOURCES).map((s) => (
            <li key={s.id}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-brand-800 inline-flex items-center gap-0.5"
              >
                {s.label}
                <ArrowUpRight className="w-3 h-3" />
              </a>
              <span>. {s.date}.</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
