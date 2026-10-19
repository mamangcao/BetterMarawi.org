import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';
import { ArrowUpRight } from '@/components/ui';

export function LeadershipSection() {
  return (
    <section
      aria-labelledby="leadership-heading"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 border-t border-stone-200/80"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* City Leadership (7 Cols) */}
        <div className="lg:col-span-7 space-y-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2
                id="leadership-heading"
                className="text-2xl font-bold text-stone-900 font-display"
              >
                City Leadership
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Executive &amp; Legislative Leadership of the Islamic City of Marawi
              </p>
            </div>
            <Link
              href="/government/local-officials-directory"
              className="text-sm font-semibold text-emerald-800 hover:text-emerald-950 inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 group"
            >
              <span>View All Officials</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Mayor Card */}
            <div className="bg-white rounded-xl border border-stone-200/90 p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-emerald-900 text-white font-bold font-display text-lg flex items-center justify-center shrink-0">
                    SG
                  </div>
                  <div>
                    <div className="text-xs font-medium text-emerald-800">
                      Elected Mayor
                    </div>
                    <h3 className="text-base font-bold text-stone-900 leading-snug">
                      Hon. Shariff Zain Lanto Gandamra
                    </h3>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-stone-100 text-xs text-stone-600 space-y-1.5 font-mono-tabular">
                  <div className="font-sans font-medium text-stone-700">
                    City Mayor, 2025–2028
                  </div>
                  <div>Phone: (063) 352-0117</div>
                  <div>Email: mayor@marawicity.gov.ph</div>
                </div>
              </div>
            </div>

            {/* Vice Mayor Card */}
            <div className="bg-white rounded-xl border border-stone-200/90 p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-stone-800 text-white font-bold font-display text-lg flex items-center justify-center shrink-0">
                    MG
                  </div>
                  <div>
                    <div className="text-xs font-medium text-emerald-800">
                      Elected Vice Mayor
                    </div>
                    <h3 className="text-base font-bold text-stone-900 leading-snug">
                      Hon. Majul Usman Gandamra
                    </h3>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-stone-100 text-xs text-stone-600 space-y-1.5 font-mono-tabular">
                  <div className="font-sans font-medium text-stone-700">
                    City Vice Mayor, 2025–2028
                  </div>
                  <div>Phone: (063) 352-0117</div>
                  <div>Email: vicemayor@marawicity.gov.ph</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Us (5 Cols) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-stone-900 font-display">
                Contact Us
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Official Marawi City Hall Assistance &amp; Information
              </p>
            </div>
            <Link
              href="/government/departments-and-officials"
              className="text-sm font-semibold text-emerald-800 hover:text-emerald-950 inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 group"
            >
              <span>View All Departments</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-white rounded-xl border border-stone-200/90 p-5 divide-y divide-stone-100">
            <div className="pb-3.5 flex items-start gap-3">
              <Phone className="w-4 h-4 text-emerald-800 mt-1 shrink-0" />
              <div>
                <div className="text-xs text-stone-500">Phone</div>
                <a
                  href="tel:0633520117"
                  className="text-sm font-bold text-stone-900 font-mono-tabular hover:text-emerald-800"
                >
                  (063) 352-0117
                </a>
                <span className="text-xs text-stone-500 ml-2">
                  (Mon–Fri, 8AM–5PM)
                </span>
              </div>
            </div>

            <div className="py-3.5 flex items-start gap-3">
              <Mail className="w-4 h-4 text-emerald-800 mt-1 shrink-0" />
              <div>
                <div className="text-xs text-stone-500">Email</div>
                <a
                  href="mailto:info@marawicity.gov.ph"
                  className="text-sm font-bold text-stone-900 font-mono-tabular hover:text-emerald-800"
                >
                  info@marawicity.gov.ph
                </a>
                <span className="text-xs text-stone-500 ml-2">
                  (Response within 2 business days)
                </span>
              </div>
            </div>

            <div className="pt-3.5 flex items-start gap-3">
              <MapPin className="w-4 h-4 text-emerald-800 mt-1 shrink-0" />
              <div>
                <div className="text-xs text-stone-500">Address</div>
                <div className="text-sm font-semibold text-stone-900">
                  Marawi City Hall, Banggolo / Kormatan Matampay, Marawi City, Lanao del Sur 9700
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

