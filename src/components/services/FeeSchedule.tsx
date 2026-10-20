import React from 'react';
import { FeeItem, Verification } from '@/types';
import { formatWithPeso, DataStatus } from '@/components/ui';

interface FeeScheduleProps {
  fees: FeeItem[];
  verification?: Verification;
}

export function FeeSchedule({ fees, verification }: FeeScheduleProps) {
  return (
    <section
      aria-labelledby="fees-heading"
      className="bg-white rounded-xl border border-stone-200/90 p-6 sm:p-8"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-5 border-b border-stone-100">
        <h2
          id="fees-heading"
          className="text-xl font-bold text-stone-900 font-display"
        >
          3. Official Schedule of Fees &amp; Legal Basis
        </h2>
        <DataStatus item={verification} />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b border-stone-200 text-xs uppercase tracking-wider text-stone-500">
              <th className="py-3 pr-4 font-semibold">Particulars / Service Fee</th>
              <th className="py-3 px-4 font-semibold">Amount</th>
              <th className="py-3 pl-4 font-semibold">Legal Basis</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {fees.map((fee, i) => (
              <tr key={i} className="hover:bg-stone-50/80">
                <td className="py-3.5 pr-4 font-medium text-stone-900">
                  {fee.particular}
                </td>
                <td className="py-3.5 px-4 font-mono-tabular font-bold text-emerald-900 whitespace-nowrap">
                  {formatWithPeso(fee.amount)}
                </td>
                <td className="py-3.5 pl-4 text-xs text-stone-500">
                  {fee.legalBasis}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
