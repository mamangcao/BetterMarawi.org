'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export function FOIRequestForm() {
  const [foiName, setFoiName] = useState('');
  const [foiEmail, setFoiEmail] = useState('');
  const [foiDocument, setFoiDocument] = useState('');
  const [foiPurpose, setFoiPurpose] = useState('');
  const [foiTrackingNumber, setFoiTrackingNumber] = useState<string | null>(null);

  const handleFoiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!foiName.trim() || !foiDocument.trim()) return;
    const randomCode = Math.floor(100000 + Math.random() * 900000);
    setFoiTrackingNumber(`FOI-MRW-2026-${randomCode}`);
  };

  return (
    <div className="space-y-8">
      <section className="bg-white rounded-xl border border-stone-200/90 p-6 sm:p-8">
        <h2 className="text-xl font-bold text-stone-900 font-display pb-3 mb-5 border-b border-stone-100">
          File an Electronic Freedom of Information (eFOI) Request
        </h2>

        {foiTrackingNumber ? (
          <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-800/30 space-y-3">
            <div className="flex items-center gap-2 text-emerald-900 font-bold">
              <CheckCircle2 className="w-5 h-5" />
              <span>FOI Request Logged Successfully</span>
            </div>
            <p className="text-sm text-stone-700">
              Your public record request has been routed to the Marawi City Public Information Office (PIO) &amp; City Records Unit. Under City Ordinance No. 2024-027, you will receive an official response within 15 working days.
            </p>
            <div className="p-3 bg-white rounded-lg border border-stone-200 font-mono-tabular text-xs">
              <strong>Tracking Reference:</strong> {foiTrackingNumber} · <strong>Applicant:</strong> {foiName}
            </div>
            <button
              type="button"
              onClick={() => {
                setFoiTrackingNumber(null);
                setFoiDocument('');
                setFoiPurpose('');
              }}
              className="px-4 py-2 rounded-lg bg-emerald-900 text-white text-xs font-semibold hover:bg-emerald-950 transition-colors"
            >
              Submit Another Request
            </button>
          </div>
        ) : (
          <form onSubmit={handleFoiSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Full Name of Requesting Citizen *
                </label>
                <input
                  type="text"
                  required
                  value={foiName}
                  onChange={(e) => setFoiName(e.target.value)}
                  placeholder="e.g., Najmah M. Balindong"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Email Address for Digital Release *
                </label>
                <input
                  type="email"
                  required
                  value={foiEmail}
                  onChange={(e) => setFoiEmail(e.target.value)}
                  placeholder="citizen@example.com"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Specific Public Document / Dataset Requested *
              </label>
              <input
                type="text"
                required
                value={foiDocument}
                onChange={(e) => setFoiDocument(e.target.value)}
                placeholder="e.g., Certified copy of City Ordinance No. 2026-014 or Q3 Infrastructure POW"
                className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Purpose of Request (Academic Research, Journalism, Community Audit, etc.) *
              </label>
              <textarea
                rows={3}
                required
                value={foiPurpose}
                onChange={(e) => setFoiPurpose(e.target.value)}
                placeholder="Briefly state how the requested public information will be used..."
                className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-900 text-white text-sm font-semibold hover:bg-emerald-950 transition-colors"
            >
              <Send className="w-4 h-4" />
              Generate Official FOI Tracking Ticket
            </button>
          </form>
        )}
      </section>
    </div>
  );
}

