'use client';
import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { DepartmentRecord } from '@/types';
import { DataStatus } from '@/components/ui';
import { isUnverified } from '@/lib/verification';
import { useTranslation } from '@/i18n';

interface DepartmentCardProps {
  dept: DepartmentRecord;
}

export function DepartmentCard({ dept }: DepartmentCardProps) {
  const { t } = useTranslation();
  return (
    <div className="bg-white rounded-xl border border-mist-200/90 p-6 space-y-4">
      {/* Phones: head below the title. Wider: title on the left, head pinned top-right, so a long
          office name wraps instead of pushing the head onto its own line. */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 pb-3 border-b border-mist-100">
        <div className="min-w-0 sm:flex-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono-tabular font-semibold text-brand-800">
              {dept.acronym}
            </span>
            {/* This badge covers the office's details (mandate, location, services), not its head */}
            {isUnverified(dept) && (
              <span className="inline-flex items-center gap-1.5 text-[11px] text-mist-500">
                {t.officeDetailsLabel}:
                <DataStatus item={dept} />
              </span>
            )}
          </div>
          <h2 className="text-xl font-bold text-mist-900 font-display mt-0.5">
            {/* Combined offices ("A & B") start the second office on its own line on wider screens */}
            {dept.name.includes(' & ') ? (
              <>
                {dept.name.slice(0, dept.name.indexOf(' & '))}
                <br className="hidden sm:inline" />{' '}
                {dept.name.slice(dept.name.indexOf(' & ') + 1)}
              </>
            ) : (
              dept.name
            )}
          </h2>
        </div>
        <div className="sm:text-right sm:shrink-0 sm:max-w-[45%]">
          <div className="text-xs text-mist-500">{dept.designation}</div>
          {/* A sourced head is shown plainly; only missing or unverified information is marked */}
          {dept.head && dept.headVerification ? (
            <div className="text-sm font-bold text-mist-900">{dept.head}</div>
          ) : (
            <div className="text-sm italic text-mist-500">{t.toBeConfirmed}</div>
          )}
        </div>
      </div>

      <p className="text-sm text-mist-600 leading-relaxed">{dept.mandate}</p>

      <div>
        <div className="text-xs font-semibold uppercase tracking-wider text-mist-500 mb-2">
          {t.frontlineServices}
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs text-mist-700">
          {dept.keyServices.map((srv, idx) => (
            <React.Fragment key={srv}>
              <span className="font-medium text-mist-800">{srv}</span>
              {idx < dept.keyServices.length - 1 && (
                <span aria-hidden="true" className="text-mist-400">
                  ·
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="pt-3 border-t border-mist-100 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-mist-600 font-mono-tabular">
        {dept.phone && (
          <div className="flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-brand-800 shrink-0" />
            <span>{dept.phone}</span>
          </div>
        )}
        {dept.email && (
          <div className="flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-brand-800 shrink-0" />
            <span className="truncate">{dept.email}</span>
          </div>
        )}
        <div className="flex items-center gap-1.5 font-sans">
          <MapPin className="w-3.5 h-3.5 text-brand-800 shrink-0" />
          <span className="truncate">{dept.location}</span>
        </div>
      </div>
    </div>
  );
}
