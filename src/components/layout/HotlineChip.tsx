import React from 'react';
import { Siren, Flame, Shield, HeartPulse } from 'lucide-react';
import { HotlineItem } from '@/types';
import { useTranslation } from '@/i18n';
import { isUnverified } from '@/lib/verification';

const HOTLINE_ICONS = {
  Siren: Siren,
  Flame: Flame,
  Shield: Shield,
  HeartPulse: HeartPulse,
} as const;

export function HotlineChip({
  item,
  isDuplicate = false,
}: {
  item: HotlineItem;
  isDuplicate?: boolean;
}) {
  const { t } = useTranslation();
  const IconComponent = HOTLINE_ICONS[item.icon];
  const unverified = isUnverified(item);

  return (
    <a
      href={item.telHref}
      tabIndex={isDuplicate ? -1 : 0}
      aria-label={`${item.label}: ${item.number}${unverified ? ` (${t.dataStatus.unverified})` : ''}`}
      className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-[#F9FEFF] text-xs transition-colors shrink-0 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent"
    >
      <IconComponent className="w-3.5 h-3.5 text-accent shrink-0" aria-hidden="true" />
      <span className="font-semibold tracking-tight">{item.label}:</span>
      <span className="font-mono-tabular opacity-95">{item.number}</span>
      {unverified && (
        <span
          aria-hidden="true"
          className="rounded-full border border-accent/50 px-1.5 text-[10px] font-semibold uppercase tracking-wider text-accent"
        >
          {t.dataStatus.unverified}
        </span>
      )}
    </a>
  );
}
