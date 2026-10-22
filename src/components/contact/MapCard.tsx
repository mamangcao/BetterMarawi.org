import React from 'react';
import { MapPin } from 'lucide-react';
import { ArrowUpRight, SourceNote } from '@/components/ui';
import { SITE_CONFIG } from '@/config/site';

export function MapCard() {
  return (
    <div className="bg-white rounded-xl border border-mist-200/90 p-6 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-mist-100">
        <h2 className="text-base font-bold text-mist-900 font-display flex items-center gap-2">
          <MapPin className="w-4 h-4 text-brand-800" />
          Location &amp; Coordinates
        </h2>
        <a
          href="https://www.google.com/maps/place/Marawi+City,+Lanao+del+Sur/@8.0034,124.2851,13z"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold text-brand-800 hover:text-brand-950 inline-flex items-center gap-1"
        >
          Google Maps
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
      <div className="text-sm text-mist-700 space-y-2">
        <div>
          <strong className="text-mist-900">City Hall:</strong> {SITE_CONFIG.contact.cityHallAddress}
        </div>
        <a
          href={SITE_CONFIG.contact.facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-brand-800 hover:text-brand-950 inline-flex items-center gap-1"
        >
          {SITE_CONFIG.contact.facebookLabel}
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
        <SourceNote
          label="DTI Cities and Municipalities Competitiveness Index, LGU profile"
          sourceUrl="https://cmci.dti.gov.ph/lgu-profile.php?lgu=Marawi"
          date="October 21, 2026"
        />
      </div>
      <div className="text-xs text-mist-600 space-y-2 font-mono-tabular">
        <div><strong>Latitude:</strong> 8.0034° N</div>
        <div><strong>Longitude:</strong> 124.2851° E</div>
        <div><strong>Kilometer Zero:</strong> Mindanao Island Center Point</div>
        <div><strong>Elevation:</strong> ~700 meters above sea level</div>
      </div>
    </div>
  );
}

