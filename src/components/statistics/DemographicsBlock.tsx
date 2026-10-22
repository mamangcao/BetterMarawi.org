import React from 'react';
import { cityProfileVerification } from '@/lib/verification';
import { SourceNote, UnverifiedBadge } from '@/components/ui';

export function DemographicsBlock() {
  const factSheet: [string, React.ReactNode][] = [
    ['Official Name', 'Islamic City of Marawi (Declared via Parliamentary Bill No. 57, 1980)'],
    ['Original Charter', 'Commonwealth Act No. 592 (1940 as Dansalan); Renamed via RA 1552 (June 16, 1956)'],
    ['Province & Region', 'Capital of Lanao del Sur · Bangsamoro Autonomous Region in Muslim Mindanao (BARMM)'],
    ['PSGC 10-Digit Code', '1903617000 (Correspondence Code: 153617000)'],
    ['Barangay Composition', '101 Barangays across 5 Geographic Sectors (PSA PSGC, as of 31 July 2025)'],
    ['Income Classification', '3rd Class Component City (PSA PSGC)'],
    ['Latest Population', '259,993 (2024 Census of Population [POPCEN], PSA)'],
    ['2020 Census Population', '207,010 (PSA 2020 Census of Population and Housing, Proclamation No. 1179)'],
    ['2020 Census Households', '34,444 households (PSA 2020 Census of Population and Housing)'],
    ['Total Land Area', '87.55 km² (PSA PSGC)'],
    ['Geographic Coordinates', '8°00\'12" N, 124°17\'06" E (8.0034, 124.2851)'],
    [
      'Topography & Elevation',
      (
        <span key="topography" className="inline-flex items-center gap-2">
          <span>Cool Tropical Highland (~700 meters ASL) overlooking Lake Lanao and Agus River outlet</span>
          <UnverifiedBadge />
        </span>
      ),
    ],
    ['Primary Languages', 'Meranaw (Maranao), Filipino, English, Arabic'],
    ['Major Academic Hub', 'Mindanao State University (MSU) Main Campus (Founded 1961)'],
    ['Tertiary Medical Center', 'Amai Pakpak Medical Center (APMC) — DOH Retained Level III Hospital'],
  ];

  return (
    <div className="space-y-8">
      {/* 4 Key Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-mist-200/90 p-5">
          <div className="text-xs text-mist-500">Latest Population</div>
          <div className="text-3xl font-bold text-mist-950 font-mono-tabular mt-1">
            259,993
          </div>
          <div className="text-xs text-mist-500 mt-1">
            2024 Census of Population (POPCEN), PSA
          </div>
        </div>
        <div className="bg-white rounded-xl border border-mist-200/90 p-5">
          <div className="text-xs text-mist-500">Barangays</div>
          <div className="text-3xl font-bold text-mist-950 font-mono-tabular mt-1">
            101
          </div>
          <div className="text-xs text-mist-500 mt-1">
            PSA PSGC (as of 31 July 2025)
          </div>
        </div>
        <div className="bg-white rounded-xl border border-mist-200/90 p-5">
          <div className="text-xs text-mist-500">Income Classification</div>
          <div className="text-3xl font-bold text-mist-950 font-display mt-1">
            3rd Class
          </div>
          <div className="text-xs text-mist-500 mt-1">
            Component City (PSA PSGC)
          </div>
        </div>
        <div className="bg-white rounded-xl border border-mist-200/90 p-5">
          <div className="text-xs text-mist-500">Total Land Area</div>
          <div className="text-3xl font-bold text-mist-950 font-mono-tabular mt-1">
            87.55 km²
          </div>
          <div className="text-xs text-mist-500 mt-1">
            Lake Lanao Highland Basin (PSA PSGC)
          </div>
        </div>
      </div>

      {/* Detailed Fact Sheet Table */}
      <section className="bg-white rounded-xl border border-mist-200/90 p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-5 border-b border-mist-100">
          <h2 className="text-xl font-bold text-mist-900 font-display">
            Official City Fact Sheet &amp; Statutory Profile
          </h2>
        </div>
        <dl className="divide-y divide-mist-100 text-sm">
          {factSheet.map(([label, val]) => (
            <div
              key={label}
              className="py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2"
            >
              <dt className="font-semibold text-mist-600">{label}</dt>
              <dd className="sm:col-span-2 font-medium text-mist-900">
                {val}
              </dd>
            </div>
          ))}
        </dl>
        <SourceNote item={cityProfileVerification} className="mt-6 pt-4 border-t border-mist-100" />
      </section>
    </div>
  );
}
