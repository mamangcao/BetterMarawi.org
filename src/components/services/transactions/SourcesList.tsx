import React from 'react';
import { ArrowUpRight } from '@/components/ui';
import type { TxSource } from '@/types/transactions';

/** Linked list of a page's sources, with an optional note underneath. */
export function SourcesList({ sources, note }: { sources: Record<string, TxSource>; note?: string }) {
  return (
    <div className="text-xs text-mist-500">
      <p className="font-semibold text-mist-600">Sources</p>
      <ul className="mt-1.5 space-y-1">
        {Object.values(sources).map((s) => (
          <li key={s.id}>
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-brand-800 inline-flex items-center gap-0.5"
            >
              {s.label}
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </li>
        ))}
      </ul>
      {note && <p className="mt-2">{note}</p>}
    </div>
  );
}
