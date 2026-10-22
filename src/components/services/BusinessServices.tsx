import React from 'react';
import { AlertTriangle, Globe } from 'lucide-react';
import { ArrowUpRight } from '@/components/ui';
import { BUSINESS_DIRECTORY, BUSINESS_SOURCES, LATE_PAYMENT_RULE } from '@/data/businessServices';
import { TransactionsDirectory } from './transactions/TransactionsDirectory';
import { SourcesList } from './transactions/SourcesList';

/** Business & Livelihood: sourced business transactions in the shared directory format. */
export function BusinessServices() {
  return (
    <div className="space-y-8">
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
            The Marawi City BPLO System handles new applications, renewals, business tax, and real property tax.
            Track your application with your BIN.
          </p>
        </div>
        <ArrowUpRight className="w-5 h-5 shrink-0 text-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </a>

      <TransactionsDirectory
        data={BUSINESS_DIRECTORY}
        labels={{
          listHeading: 'Business Services in Marawi',
          intro:
            'Which office handles each service, what it costs, how long it takes, and when to file or pay. Amounts set by national law apply in Marawi as written; amounts set by the city are assessed by the BPLO and City Treasurer.',
          searchPlaceholder: 'Search, e.g. renewal, cedula, closure',
          noun: { one: 'service', many: 'services' },
          itemsHereLabel: 'Handled here',
          officesIntro: 'Open an office to see its steps, what to bring, and everything it handles.',
        }}
      />

      {/* Late payment */}
      <div className="flex gap-3 rounded-xl border border-status-warning/30 bg-status-warning-bg p-4 text-sm text-status-warning-text">
        <AlertTriangle className="w-5 h-5 shrink-0" aria-hidden="true" />
        <p>
          <strong>Paying late:</strong> {LATE_PAYMENT_RULE}
        </p>
      </div>

      <SourcesList
        sources={BUSINESS_SOURCES}
        note="Marawi’s fee schedule (City Revenue Code) is not yet published online. Ask the BPLO or City Treasurer’s Office for exact amounts."
      />
    </div>
  );
}
