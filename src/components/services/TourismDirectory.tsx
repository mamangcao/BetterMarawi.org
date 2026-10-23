import React from 'react';
import { Compass } from 'lucide-react';
import { TOURISM_CATEGORIES } from '@/data/tourism';
import { tourismTone } from '@/lib/palette';

/** Tourism page: landmarks grouped by category */
export function TourismDirectory() {
  return (
    <section aria-labelledby="tourism-directory-heading" className="space-y-6">
      <div>
        <h2
          id="tourism-directory-heading"
          className="text-2xl font-bold text-mist-900 font-display"
        >
          Registered Cultural &amp; Eco-Tourism Directory ({TOURISM_CATEGORIES.length} Categories)
        </h2>
        <p className="text-sm text-mist-600 mt-1">
          Curated landmarks across the Islamic City of Marawi and the Lake Lanao highland basin.
        </p>
      </div>
      <div className="space-y-5">
        {TOURISM_CATEGORIES.map((cat) => (
          <div
            key={cat.id}
            className="bg-white rounded-xl border border-mist-200/90 p-6"
          >
            <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b border-mist-100">
              <div className="flex items-center gap-2">
                <Compass className={`w-5 h-5 ${tourismTone(cat.id)}`} />
                <h3 className="text-lg font-bold text-mist-900">
                  {cat.title}
                </h3>
              </div>
              {/* Counted from the list, so it always matches the places shown */}
              <span className="text-xs font-mono-tabular font-semibold text-brand-800">
                {cat.places.length} {cat.places.length === 1 ? 'place' : 'places'}
              </span>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {cat.places.map((place) => (
                <div
                  key={place.name}
                  className="p-3.5 rounded-lg bg-mist-50 border border-mist-200/70"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-sm font-bold text-mist-900">
                      {place.name}
                    </span>
                    <span className="text-xs text-mist-500 font-mono-tabular">
                      Brgy. {place.barangay}
                    </span>
                  </div>
                  <p className="text-xs text-mist-600 mt-1 leading-relaxed">
                    {place.note}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="rounded-xl border border-dashed border-mist-300 p-5 text-center text-sm text-mist-600">
        <span className="font-semibold text-mist-800">More destinations coming soon!</span>{' '}
        New places will be added to each category as they are reviewed.
      </p>
    </section>
  );
}
