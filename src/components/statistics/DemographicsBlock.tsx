import React from 'react';
import { cityProfileVerification } from '@/lib/verification';
import { DataStatus } from '@/components/ui';

export function DemographicsBlock() {
  const factSheet = [
    ['Official Name', 'Islamic City of Marawi (Declared via Parliamentary Bill No. 57, 1980)'],
    ['Original Charter', 'Commonwealth Act No. 592 (1940 as Dansalan); Renamed via RA 1552 (June 16, 1956)'],
    ['Province & Region', 'Capital of Lanao del Sur · Bangsamoro Autonomous Region in Muslim Mindanao (BARMM)'],
    ['Barangay Composition', '96 Barangays across 5 Geographic Sectors'],
    ['Income Classification', '4th Class Component City'],
    ['Geographic Coordinates', '8°00\'12" N, 124°17\'06" E (8.0034, 124.2851)'],
    ['Topography & Climate', 'Cool Tropical Highland (18°C – 25°C year-round) overlooking Lake Lanao and Agus River outlet'],
    ['Primary Languages', 'Meranaw (Maranao), Filipino, English, Arabic'],
    ['Major Academic Hub', 'Mindanao State University (MSU) Main Campus (Founded 1961)'],
    ['Tertiary Medical Center', 'Amai Pakpak Medical Center (APMC) — DOH Retained Level III Hospital'],
  ];

  return (
    <div className="space-y-8">
      {/* 4 Key Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-stone-200/90 p-5">
          <div className="flex items-center justify-between gap-2">
            <div className="text-xs text-stone-500">Latest Census Population</div>
            <DataStatus item={cityProfileVerification} />
          </div>
          <div className="text-3xl font-bold text-stone-950 font-mono-tabular mt-1">
            259,993
          </div>
          <div className="text-xs text-stone-500 mt-1">
            207,010 in 2020 PSA Census · 48,120 Households
          </div>
        </div>
        <div className="bg-white rounded-xl border border-stone-200/90 p-5">
          <div className="flex items-center justify-between gap-2">
            <div className="text-xs text-stone-500">Land Area &amp; Elevation</div>
            <DataStatus item={cityProfileVerification} />
          </div>
          <div className="text-3xl font-bold text-stone-950 font-mono-tabular mt-1">
            87.55 km²
          </div>
          <div className="text-xs text-stone-500 mt-1">
            ~700 meters ASL · Lake Lanao Highland Basin
          </div>
        </div>
      </div>

      {/* Detailed Fact Sheet Table */}
      <section className="bg-white rounded-xl border border-stone-200/90 p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-5 border-b border-stone-100">
          <h2 className="text-xl font-bold text-stone-900 font-display">
            Official City Fact Sheet &amp; Statutory Profile
          </h2>
          <DataStatus item={cityProfileVerification} />
        </div>
        <dl className="divide-y divide-stone-100 text-sm">
          {factSheet.map(([label, val]) => (
            <div
              key={label}
              className="py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2"
            >
              <dt className="font-semibold text-stone-600">{label}</dt>
              <dd className="sm:col-span-2 font-medium text-stone-900">
                {val}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
