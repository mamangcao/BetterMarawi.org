import React from 'react';
import { AlertTriangle, Building2, CalendarClock, Clock, Globe, Landmark, Receipt } from 'lucide-react';
import { ArrowUpRight } from '@/components/ui';
import {
  BUSINESS_SERVICES,
  BUSINESS_SOURCES,
  LATE_PAYMENT_RULE,
  type FigureBasis,
} from '@/data/businessServices';

const BASIS_LABEL: Record<FigureBasis, { text: string; className: string }> = {
  law: { text: 'National law', className: 'bg-brand-50 text-brand-800 border-brand-200' },
  city: { text: 'Set by the city · ask the BPLO', className: 'bg-accent-light text-accent-deep border-accent-muted/40' },
  portal: { text: 'City portal', className: 'bg-lake-50 text-lake-800 border-lake-200' },
  charter: { text: 'Marawi Citizen’s Charter', className: 'bg-brand-50 text-brand-800 border-brand-200' },
};

function Basis({ basis }: { basis: FigureBasis }) {
  const b = BASIS_LABEL[basis];
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${b.className}`}>
      {b.text}
    </span>
  );
}

function Detail({ icon: Icon, label, children }: { icon: typeof Clock; label: string; children: React.ReactNode }) {
  return (
    <div className="min-w-0">
      <dt className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-mist-500">
        <Icon className="w-3.5 h-3.5" aria-hidden="true" />
        {label}
      </dt>
      <dd className="mt-1 text-sm text-mist-800 leading-relaxed">{children}</dd>
    </div>
  );
}

export function BusinessServices() {
  return (
    <section aria-labelledby="business-services-heading" className="space-y-6">
      <div>
        <h2 id="business-services-heading" className="text-2xl font-bold text-brand-950 font-display">
          Business Services in Marawi
        </h2>
        <p className="text-sm text-mist-600 mt-1">
          Which office handles each service, what it costs, how long it takes, and when to file or
          pay. Amounts set by national law apply in Marawi as written; amounts set by the city are
          assessed by the BPLO and City Treasurer.
        </p>
      </div>

      {/* Online portal */}
      <a
        href={BUSINESS_SOURCES.portal.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-4 rounded-xl bg-brand-900 p-5 text-white hover:bg-brand-950 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
      >
        <Globe className="w-8 h-8 shrink-0 text-accent" aria-hidden="true" />
        <div className="min-w-0 flex-1">
          <p className="font-bold">Apply, renew, and pay online</p>
          <p className="text-sm text-brand-100">
            The Marawi City BPLO System handles new applications, renewals, business tax, and real
            property tax. Track your application with your BIN.
          </p>
        </div>
        <ArrowUpRight className="w-5 h-5 shrink-0 text-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </a>

      {/* Services */}
      <ol className="space-y-4">
        {BUSINESS_SERVICES.map((s) => (
          <li key={s.id} id={s.id} className="bg-white rounded-xl border border-mist-200/90 p-5 sm:p-6 scroll-mt-24">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <h3 className="text-lg font-bold text-brand-950 leading-snug">{s.name}</h3>
              {s.online && (
                <a
                  href={s.online.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-brand-200 bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-800 hover:bg-brand-100"
                >
                  {s.online.label}
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            <dl className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <Detail icon={Building2} label="Responsible office">
                  {s.office}
                </Detail>
              </div>
              <Detail icon={Clock} label="Processing time">
                {s.processing.duration ? (
                  <>
                    <span className="block font-semibold text-brand-950">{s.processing.duration}</span>
                    <span className="mt-1 inline-block">
                      <Basis basis="charter" />
                    </span>
                  </>
                ) : (
                  <>
                    <span className="block">Not yet published by the city.</span>
                    {s.processing.legalLimit && (
                      <span className="mt-1 block text-mist-600">
                        By law: {s.processing.legalLimit.charAt(0).toLowerCase() + s.processing.legalLimit.slice(1)}.{' '}
                        <Basis basis="law" />
                      </span>
                    )}
                  </>
                )}
              </Detail>
              <Detail icon={CalendarClock} label="When to file or pay">
                {s.schedule}
              </Detail>
              <div className="sm:col-span-2">
                <Detail icon={Receipt} label="Fee">
                  <span className="block">{s.fee}</span>
                  <span className="mt-1 inline-block">
                    <Basis basis={s.feeBasis} />
                  </span>
                </Detail>
              </div>
              <div className="sm:col-span-2">
                <Detail icon={Landmark} label="How to apply">
                  {s.how}
                </Detail>
              </div>
            </dl>

            {s.notes && (
              <ul className="mt-4 space-y-1 border-t border-mist-100 pt-3 text-sm text-mist-600">
                {s.notes.map((n) => (
                  <li key={n} className="flex gap-2">
                    <span aria-hidden="true" className="text-mist-400">•</span>
                    {n}
                  </li>
                ))}
              </ul>
            )}

            <p className="mt-3 text-[11px] text-mist-500">
              Based on: {s.sources.map((id) => BUSINESS_SOURCES[id].label).join('; ')}
            </p>
          </li>
        ))}
      </ol>

      {/* Late payment */}
      <div className="flex gap-3 rounded-xl border border-status-warning/30 bg-status-warning-bg p-4 text-sm text-status-warning-text">
        <AlertTriangle className="w-5 h-5 shrink-0" aria-hidden="true" />
        <p>
          <strong>Paying late:</strong> {LATE_PAYMENT_RULE}
        </p>
      </div>

      <div className="text-xs text-mist-500">
        <p className="font-semibold text-mist-600">Sources</p>
        <ul className="mt-1.5 space-y-1">
          {Object.values(BUSINESS_SOURCES).map((src) => (
            <li key={src.id}>
              <a
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-brand-800 inline-flex items-center gap-0.5"
              >
                {src.label}
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-2">
          Marawi’s fee schedule (City Revenue Code) is not yet published online. Ask the BPLO or City
          Treasurer’s Office for exact amounts.
        </p>
      </div>
    </section>
  );
}
