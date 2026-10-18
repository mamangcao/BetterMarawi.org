'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [office, setOffice] = useState('Office of the City Mayor — Public Assistance');
  const [message, setMessage] = useState('');
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setSubmittedRef(`PACD-MRW-${Math.floor(10000 + Math.random() * 90000)}`);
  };

  return (
    <section className="bg-white rounded-xl border border-stone-200/90 p-6 sm:p-8">
      <h2 className="text-xl font-bold text-stone-900 font-display pb-4 mb-6 border-b border-stone-100">
        Send a Citizen Inquiry or Public Consultation Feedback
      </h2>

      {submittedRef ? (
        <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-800/30 space-y-3">
          <div className="flex items-center gap-2 text-emerald-900 font-bold">
            <CheckCircle2 className="w-5 h-5" />
            <span>Message Logged with Public Assistance Desk</span>
          </div>
          <p className="text-sm text-stone-700">
            Thank you, <strong>{name}</strong>. Your inquiry routed to <strong>{office}</strong> has been assigned Reference No. <span className="font-mono-tabular font-bold">{submittedRef}</span>. Expect a response within 2 business days.
          </p>
          <button
            type="button"
            onClick={() => {
              setSubmittedRef(null);
              setMessage('');
            }}
            className="px-4 py-2 rounded-lg bg-emerald-900 text-white text-xs font-semibold hover:bg-emerald-950 transition-colors"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Your Full Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Email or Mobile Number *
              </label>
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com / 0917-XXX-XXXX"
                className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Destination Office / Department
            </label>
            <select
              value={office}
              onChange={(e) => setOffice(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-800"
            >
              <option>Office of the City Mayor — Public Assistance</option>
              <option>Sangguniang Panlungsod — Public Consultation</option>
              <option>Business Permits &amp; Licensing Office (BPLO)</option>
              <option>City Health Office (CHO) — PhilHealth YAKAP</option>
              <option>City Social Welfare &amp; Development Office (CSWDO)</option>
              <option>City Engineering Office — Infrastructure Report</option>
              <option>BetterMarawi.org Civic Tech Volunteers</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Message, Service Inquiry, or Barangay Report *
            </label>
            <textarea
              rows={4}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Provide details including Barangay name if reporting a local issue..."
              className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800"
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-900 text-white text-sm font-semibold hover:bg-emerald-950 transition-colors"
          >
            <Send className="w-4 h-4" />
            Submit Inquiry
          </button>
        </form>
      )}
    </section>
  );
}

