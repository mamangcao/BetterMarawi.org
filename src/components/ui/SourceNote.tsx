'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Verification } from '@/types';
import { formatRetrievedOn } from '@/lib/verification';
import { useTranslation } from '@/i18n';

export interface SourceNoteProps {
  item?: Verification | null;
  label?: string;
  sourceUrl?: string;
  date?: string;
  className?: string;
}

export function SourceNote({
  item,
  label,
  sourceUrl,
  date,
  className,
}: SourceNoteProps) {
  const { t } = useTranslation();

  const sourceLabel = label || item?.source;
  const url = sourceUrl || item?.sourceUrl;
  const rawDate = date || item?.retrievedOn;

  if (!sourceLabel) {
    return null;
  }

  const formattedDate = rawDate ? formatRetrievedOn(rawDate) : '';
  const sourcePrefix = t.sourcePrefix || 'Source:';
  const retrievedPrefix = t.retrievedPrefix || 'Retrieved on';

  return (
    <p className={cn('text-xs text-stone-500 font-sans leading-relaxed', className)}>
      <span>{sourcePrefix} </span>
      {url ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-stone-800 transition-colors inline-flex items-center gap-0.5"
        >
          <span>{sourceLabel}</span>
          <ArrowUpRight className="w-3 h-3 inline-block shrink-0" aria-hidden="true" />
        </a>
      ) : (
        <span>{sourceLabel}</span>
      )}
      <span>.</span>
      {formattedDate && (
        <span> {retrievedPrefix} {formattedDate}.</span>
      )}
    </p>
  );
}

