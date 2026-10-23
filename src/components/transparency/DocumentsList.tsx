import React from 'react';

/**
 * LGU performance reports. Empty until each figure can be linked to its official source.
 *
 * Removed Oct 23, 2026: a "Performance & Governance Scorecard (2025–2026)" captioned "Verified
 * indicators from DILG-BARMM, BLGF, and City Planning & Development Office" (100% FDP compliance,
 * +18.4% revenue growth, 94,200+ PhilHealth YAKAP registrants, 89.6% 20% Development Fund
 * utilization). None of the four figures had a source. See docs/AUDIT_STATUS.md.
 */
export function DocumentsList() {
  return (
    <section className="bg-white rounded-xl border border-mist-200/90 p-6 sm:p-8 space-y-6">
      <div className="pb-4 border-b border-mist-100">
        <h2 className="text-xl font-bold text-mist-900 font-display">
          LGU Performance &amp; Governance Reports
        </h2>
      </div>
      <p className="rounded-xl border border-dashed border-mist-300 p-6 text-center text-sm text-mist-600">
        No reports are listed yet. Each one will be added with a link to its official source, such as
        DILG, the Bureau of Local Government Finance (BLGF), or the city government.
      </p>
    </section>
  );
}
