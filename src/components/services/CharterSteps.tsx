'use client';
import React from 'react';
import { CharterStep } from '@/types';
import { useTranslation } from '@/i18n';

interface CharterStepsProps {
  steps: CharterStep[];
  totalProcessingTime: string;
}

export function CharterSteps({ steps, totalProcessingTime }: CharterStepsProps) {
  const { t } = useTranslation();
  return (
    <section
      aria-labelledby="charter-steps-heading"
      className="bg-white rounded-xl border border-stone-200/90 p-6 sm:p-8"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-6 border-b border-stone-100">
        <div>
          <h2
            id="charter-steps-heading"
            className="text-xl font-bold text-stone-900 font-display"
          >
            {t.charterStepsHeading}
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            {t.charterCompliance}
          </p>
        </div>
        <span className="text-xs font-mono-tabular font-semibold text-stone-700">
          {t.totalTime} {totalProcessingTime}
        </span>
      </div>

      <div className="space-y-6">
        {steps.map((step) => (
          <div
            key={step.stepNumber}
            className="rounded-xl border border-stone-200/90 p-5 bg-stone-50/50"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-stone-200/70">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-emerald-900 text-white font-mono-tabular text-xs font-bold flex items-center justify-center">
                  0{step.stepNumber}
                </span>
                <h3 className="text-base font-bold text-stone-900">
                  {step.title}
                </h3>
              </div>
              <span className="text-xs font-mono-tabular font-semibold text-emerald-900">
                ⏱ {step.processingTime}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">
                  {t.citizenAction}
                </div>
                <p className="text-stone-800 leading-relaxed">
                  {step.clientAction}
                </p>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">
                  {t.agencyAction}
                </div>
                <p className="text-stone-700 leading-relaxed">
                  {step.agencyAction}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-200/60 flex flex-wrap items-center justify-between gap-2 text-xs text-stone-500">
              <span>
                <strong className="text-stone-700">Window / Location:</strong> {step.officeWindow}
              </span>
              <span>
                <strong className="text-stone-700">Person Responsible:</strong> {step.personResponsible}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

