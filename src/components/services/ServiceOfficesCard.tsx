import React from 'react';
import { Building2, Clock, MapPin, Phone } from 'lucide-react';
import type { ServiceOffice } from '@/data/serviceCatalog';

interface Props {
  offices: ServiceOffice[];
  location?: string;
  hours?: string;
  hotline?: string;
}

/** Header card on a service page: every responsible office, then the main office's contact details. */
export function ServiceOfficesCard({ offices, location, hours, hotline }: Props) {
  return (
    <div className="bg-white rounded-xl border border-mist-200/90 p-5 lg:w-80 shrink-0 space-y-3">
      <div className="text-xs font-semibold uppercase tracking-wider text-mist-500">
        {offices.length === 1 ? 'Responsible Office' : 'Responsible Offices'}
      </div>
      <ul className="space-y-1.5 text-sm">
        {offices.map((o) => (
          <li key={o.name}>
            {o.href ? (
              <a href={o.href} className="flex items-start gap-2 rounded-md px-1 py-0.5 font-semibold text-mist-900 hover:bg-mist-50 hover:text-brand-800">
                <Building2 className="w-3.5 h-3.5 text-brand-800 shrink-0 mt-1" aria-hidden="true" />
                {o.name}
              </a>
            ) : (
              <span className="flex items-start gap-2 px-1 py-0.5 font-semibold text-mist-900">
                <Building2 className="w-3.5 h-3.5 text-brand-800 shrink-0 mt-1" aria-hidden="true" />
                {o.name}
              </span>
            )}
          </li>
        ))}
      </ul>
      {(location || hours) && (
        <div className="text-xs text-mist-600 space-y-1.5 pt-2 border-t border-mist-100">
          {location && (
            <div className="flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 text-brand-800 shrink-0 mt-0.5" aria-hidden="true" />
              <span>{location}</span>
            </div>
          )}
          {hours && (
            <div className="flex items-center gap-2 font-mono-tabular">
              <Clock className="w-3.5 h-3.5 text-brand-800 shrink-0" aria-hidden="true" />
              <span>{hours}</span>
            </div>
          )}
        </div>
      )}
      {hotline && (
        <div className="pt-2">
          <a
            href={`tel:${hotline.replace(/[^0-9]/g, '')}`}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-brand-900 text-white text-xs font-semibold hover:bg-brand-950 transition-colors font-mono-tabular"
          >
            <Phone className="w-3.5 h-3.5" aria-hidden="true" />
            Call Hotline: {hotline}
          </a>
        </div>
      )}
    </div>
  );
}
