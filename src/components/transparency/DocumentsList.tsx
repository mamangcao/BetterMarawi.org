import React from 'react';

export function DocumentsList() {
  const scorecards = [
    {
      metric: 'DILG Full Disclosure Policy Compliance',
      value: '100% (All 4 Quarters)',
      detail: 'Zero delinquent financial or procurement postings across FY 2025–2026.',
    },
    {
      metric: 'Local Revenue Collection Growth (BLGF)',
      value: '+18.4% YoY',
      detail: 'Driven by eBOSS digitalization and Grand Padian commercial revival.',
    },
    {
      metric: 'PhilHealth YAKAP Primary Care Accreditation',
      value: '94,200+ Registered Residents',
      detail: 'Active across CHO Marawi, 4 RHUs, and Amai Pakpak Medical Center.',
    },
    {
      metric: '20% Development Fund Utilization Rate',
      value: '89.6% Obligated & Disbursed',
      detail: 'Focused on barangay road concreting, solar street lighting, and water access.',
    },
  ];

  return (
    <section className="bg-white rounded-xl border border-mist-200/90 p-6 sm:p-8 space-y-6">
      <div className="pb-4 border-b border-mist-100">
        <h2 className="text-xl font-bold text-mist-900 font-display">
          LGU Performance &amp; Governance Scorecard (2025–2026)
        </h2>
        <p className="text-xs text-mist-500 mt-0.5">
          Verified indicators from DILG-BARMM, BLGF, and City Planning &amp; Development Office
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {scorecards.map((card) => (
          <div
            key={card.metric}
            className="p-5 rounded-xl bg-mist-50 border border-mist-200/80"
          >
            <div className="text-xs text-mist-500">{card.metric}</div>
            <div className="text-xl font-bold text-brand-900 font-mono-tabular mt-1">
              {card.value}
            </div>
            <p className="text-xs text-mist-600 mt-2 leading-relaxed">
              {card.detail}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

