import React from 'react';
import { Stethoscope } from 'lucide-react';

/** Health Services page: PhilHealth YAKAP facilities and the 13 free laboratory tests */
export function YakapLabTests() {
  return (
    <section
      aria-labelledby="yakap-detail-heading"
      className="bg-brand-950 text-mist-100 rounded-xl p-6 border border-brand-900"
    >
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent">
        <Stethoscope className="w-4 h-4" />
        Universal Health Care (RA 11223) · Marawi City Network
      </div>
      <h3
        id="yakap-detail-heading"
        className="text-2xl font-bold text-white font-display mt-1"
      >
        PhilHealth YAKAP (Konsulta) Accredited Facilities &amp; 13 Free Lab Tests
      </h3>
      <p className="text-sm text-brand-100/90 mt-2 leading-relaxed">
        All residents registered at the Marawi City Health Office (CHO), Rural Health Units (RHU 1–4), and Amai Pakpak Medical Center (APMC) receive 100% free outpatient consultations, up to ₱20,000 in annual maintenance medicines, and these 13 diagnostic laboratory tests:
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-4 text-xs font-mono-tabular">
        {[
          '01. Complete Blood Count (CBC) w/ Platelet',
          '02. Urinalysis',
          '03. Fecalysis',
          '04. Sputum Microscopy',
          '05. Fasting Blood Sugar (FBS)',
          '06. Oral Glucose Tolerance Test (OGTT)',
          '07. Lipid Profile (Cholesterol, LDL, HDL, Triglycerides)',
          '08. Serum Creatinine',
          '09. Chest X-Ray',
          '10. 12-Lead Electrocardiogram (ECG)',
          '11. Pap Smear',
          '12. HbA1c (Glycosylated Hemoglobin)',
          '13. Fecal Occult Blood Test (FOBT)',
        ].map((lab) => (
          <div
            key={lab}
            className="bg-brand-900/70 border border-brand-800 rounded-lg px-3 py-2 text-brand-50"
          >
            {lab}
          </div>
        ))}
      </div>
    </section>
  );
}
