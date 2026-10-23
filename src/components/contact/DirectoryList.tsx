'use client';
import React from 'react';
import { Phone, MapPin, Clock } from 'lucide-react';
import { useTranslation } from '@/i18n';
import { SITE_CONFIG } from '@/config/site';

// City Hall phone, email, and office hours are not shown: no official source confirms them, the
// listed trunkline is also given as the CDRRMO emergency line, and marawicity.gov.ph addresses do
// not resolve (checked Oct 23, 2026). The address is sourced (DTI CMCI profile).
export function DirectoryList() {
  const { t } = useTranslation();
  return (
    <div className="bg-white rounded-xl border border-mist-200/90 p-6 space-y-4">
      <h2 className="text-lg font-bold text-mist-900 font-display">
        {t.trunklineHeading}
      </h2>
      <div className="space-y-3 text-sm text-mist-700">
        <div className="flex items-start gap-3">
          <MapPin className="w-4 h-4 text-brand-800 mt-1 shrink-0" aria-hidden="true" />
          <div>
            <div className="font-bold text-mist-900">
              {SITE_CONFIG.contact.cityHallAddress}
            </div>
            <div className="text-xs text-mist-500">
              Coordinates: 8.0034, 124.2851
            </div>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Phone className="w-4 h-4 text-brand-800 mt-1 shrink-0" aria-hidden="true" />
          <div className="text-mist-600 italic">{t.cityHallContactTbc}</div>
        </div>
        <div className="flex items-start gap-3">
          <Clock className="w-4 h-4 text-brand-800 mt-1 shrink-0" aria-hidden="true" />
          <div>
            <div className="font-bold text-mist-900">{t.noNoonBreakPolicy}</div>
            <div className="text-xs text-mist-500">
              {t.noNoonBreakDesc}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
