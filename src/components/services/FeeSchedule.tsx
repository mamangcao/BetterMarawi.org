'use client';
import React from 'react';
import { FeeItem, Verification } from '@/types';
import { formatWithPeso, DataStatus } from '@/components/ui';
import { useTranslation } from '@/i18n';

interface FeeScheduleProps {
  fees: FeeItem[];
  verification?: Verification;
}

export function FeeSchedule({ fees, verification }: FeeScheduleProps) {
  const { t } = useTranslation();
  return (
    <section
      aria-labelledby="fees-heading"
      className="bg-white rounded-xl border border-mist-200/90 p-6 sm:p-8"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-5 border-b border-mist-100">
        <h2
          id="fees-heading"
          className="text-xl font-bold text-mist-900 font-display"
        >
          {t.feeScheduleHeading}
        </h2>
        <DataStatus item={verification} />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b border-mist-200 text-xs uppercase tracking-wider text-mist-500">
              <th className="py-3 pr-4 font-semibold">{t.particularsHeader}</th>
              <th className="py-3 px-4 font-semibold">{t.amountHeader}</th>
              <th className="py-3 pl-4 font-semibold">{t.legalBasisHeader}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-mist-100">
            {fees.map((fee, i) => (
              <tr key={i} className="hover:bg-mist-50/80">
                <td className="py-3.5 pr-4 font-medium text-mist-900">
                  {fee.particular}
                </td>
                <td className="py-3.5 px-4 font-mono-tabular font-bold text-brand-900 whitespace-nowrap">
                  {formatWithPeso(fee.amount)}
                </td>
                <td className="py-3.5 pl-4 text-xs text-mist-500">
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
