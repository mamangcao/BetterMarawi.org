import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export function DirectoryList() {
  return (
    <div className="bg-white rounded-xl border border-stone-200/90 p-6 space-y-4">
      <h2 className="text-lg font-bold text-stone-900 font-display">
        Marawi City Hall Trunkline &amp; Location
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
              Marawi City Hall, Banggolo / Kormatan Matampay
            </div>
            <div className="text-xs text-stone-500">
              Marawi City, Lanao del Sur 9700 · Coordinates: 8.0034, 124.2851
            </div>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Clock className="w-4 h-4 text-emerald-800 mt-1 shrink-0" />
          <div>
            <div className="font-bold text-stone-900">No Noon Break Policy</div>
            <div className="text-xs text-stone-500">
              Frontline windows open 8:00 AM – 5:00 PM under RA 11032
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

