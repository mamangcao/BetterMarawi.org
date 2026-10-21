'use client';
import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useTranslation } from '@/i18n';
import { SITE_CONFIG } from '@/config/site';

export function DirectoryList() {
  const { t } = useTranslation();
  return (
    <div className="bg-white rounded-xl border border-stone-200/90 p-6 space-y-4">
      <h2 className="text-lg font-bold text-stone-900 font-display">
        {t.trunklineHeading}
      </h2>
      <div className="space-y-3 text-sm text-stone-700">
        <div className="flex items-start gap-3">
          <Phone className="w-4 h-4 text-emerald-800 mt-1 shrink-0" />
          <div>
            <div className="font-bold text-stone-900 font-mono-tabular">
              (063) 352-0117
            </div>
            <div className="text-xs text-stone-500">Mon–Fri, 8:00 AM – 5:00 PM</div>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Mail className="w-4 h-4 text-emerald-800 mt-1 shrink-0" />
          <div>
            <div className="font-bold text-stone-900 font-mono-tabular">
              info@marawicity.gov.ph
            </div>
            <div className="text-xs text-stone-500">Response within 2 business days</div>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <MapPin className="w-4 h-4 text-emerald-800 mt-1 shrink-0" />
          <div>
            <div className="font-bold text-stone-900">
              {SITE_CONFIG.contact.cityHallAddress}
            </div>
            <div className="text-xs text-stone-500">
              Coordinates: 8.0034, 124.2851
            </div>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Clock className="w-4 h-4 text-emerald-800 mt-1 shrink-0" />
          <div>
            <div className="font-bold text-stone-900">{t.noNoonBreakPolicy}</div>
            <div className="text-xs text-stone-500">
              {t.noNoonBreakDesc}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

