'use client';
import React from 'react';
import { EMERGENCY_HOTLINES } from '@/config/site';
import { DataStatus } from '@/components/ui';
import { useTranslation } from '@/i18n';

export function EmergencyBanners() {
  const { t } = useTranslation();
  const national = EMERGENCY_HOTLINES.find((h) => h.id === 'ph-911');
  const cdrrmo = EMERGENCY_HOTLINES.find((h) => h.id === 'cdrrmo');
  const bfp = EMERGENCY_HOTLINES.find((h) => h.id === 'bfp');
  const pnp = EMERGENCY_HOTLINES.find((h) => h.id === 'pnp');
  const cho = EMERGENCY_HOTLINES.find((h) => h.id === 'cho');

  return (
    <div className="bg-mist-900 text-mist-100 rounded-xl p-6 space-y-3">
      <h2 className="text-base font-bold text-accent font-display">
        {t.emergencyDispatchHeading}
      </h2>
      <div className="space-y-2 text-xs font-mono-tabular">
        {national && (
          <div className="flex items-center justify-between py-2 border-b border-mist-800 gap-2">
            <span>
              {national.label}:
              <a
                href={national.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block font-sans text-[11px] text-mist-400 underline underline-offset-2 hover:text-accent"
              >
                EO No. 56, s. 2018
              </a>
            </span>
            <a href={national.telHref} className="font-bold text-white hover:text-accent">
              {national.number}
            </a>
          </div>
        )}
        <div className="flex items-center justify-between py-2 border-b border-mist-800 gap-2">
          <span>CDRRMO Command Center:</span>
          <div className="flex items-center gap-2">
            <a href="tel:0633520117" className="font-bold text-white hover:text-accent">
              (063) 352-0117
            </a>
            <DataStatus item={cdrrmo} />
          </div>
        </div>
        <div className="flex items-center justify-between py-2 border-b border-mist-800 gap-2">
          <span>City Fire Station (BFP Marawi):</span>
          <div className="flex items-center gap-2">
            <a href="tel:09178429910" className="font-bold text-white hover:text-accent">
              0917-842-9910
            </a>
            <DataStatus item={bfp} />
          </div>
        </div>
        <div className="flex items-center justify-between py-2 border-b border-mist-800 gap-2">
          <span>City Police Station (PNP Marawi):</span>
          <div className="flex items-center gap-2">
            <a href="tel:09985986678" className="font-bold text-white hover:text-accent">
              0998-598-6678
            </a>
            <DataStatus item={pnp} />
          </div>
        </div>
        <div className="flex items-center justify-between py-2 gap-2">
          <span>City Health Office / APMC ER:</span>
          <div className="flex items-center gap-2">
            <a href="tel:0632212536" className="font-bold text-white hover:text-accent">
              (063) 221-2536
            </a>
            <DataStatus item={cho} />
          </div>
        </div>
      </div>
    </div>
  );
}
