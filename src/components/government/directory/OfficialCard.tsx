import React from 'react';
import Image from 'next/image';
import { UserRound } from 'lucide-react';
import type { LocalOfficial } from '@/data/officials';

function initials(name: string) {
  const parts = name.replace(/^Hon\.\s*/, '').split(/\s+/).filter((p) => /^[A-Z]/.test(p) && !p.endsWith('.'));
  return ((parts[0]?.[0] ?? '') + (parts[parts.length - 1]?.[0] ?? '')).toUpperCase();
}

/** One official: photo or initials, position, name (or "To be confirmed"), and details. */
export function OfficialCard({ official, large = false }: { official: LocalOfficial; large?: boolean }) {
  const size = large ? 'w-20 h-20' : 'w-12 h-12';
  return (
    <li className="flex items-center gap-4 bg-white p-5">
      {official.photo ? (
        <span className={`relative shrink-0 ${size} rounded-full overflow-hidden bg-brand-100 ring-2 ring-white shadow-sm`}>
          <Image src={official.photo} alt={official.name ?? official.position} fill sizes="80px" className="object-cover" />
        </span>
      ) : (
        <span
          aria-hidden="true"
          className={`grid place-items-center shrink-0 ${size} rounded-full font-display font-bold ${
            official.name ? 'bg-brand-900 text-white' : 'bg-mist-100 text-mist-400'
          }`}
        >
          {official.name ? initials(official.name) : <UserRound className="w-5 h-5" />}
        </span>
      )}
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-700">
          {official.position} ({official.term})
        </p>
        {official.name ? (
          <h3 className={`${large ? 'text-lg' : 'text-base'} font-bold text-brand-950 leading-snug mt-0.5`}>{official.name}</h3>
        ) : (
          <h3 className="text-base font-semibold text-mist-500 italic mt-0.5">To be confirmed</h3>
        )}
        {(official.detail || official.party) && (
          <p className="mt-1 text-sm text-mist-600">{[official.detail, official.party].filter(Boolean).join(' · ')}</p>
        )}
      </div>
    </li>
  );
}
