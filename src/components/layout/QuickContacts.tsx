import React from 'react';
import { Phone, Siren, Flame, Shield, HeartPulse } from 'lucide-react';
import { EMERGENCY_HOTLINES } from '@/config/site';
import { HotlineItem } from '@/types';

const HOTLINE_ICONS = {
  Siren: Siren,
  Flame: Flame,
  Shield: Shield,
  HeartPulse: HeartPulse,
} as const;

function HotlineChip({
  item,
  isDuplicate = false,
}: {
  item: HotlineItem;
  isDuplicate?: boolean;
}) {
  const IconComponent = HOTLINE_ICONS[item.icon];

  return (
    <a
      href={item.telHref}
      tabIndex={isDuplicate ? -1 : 0}
      aria-label={`${item.label}: ${item.number}`}
      className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-[#F9FEFF] text-xs transition-colors shrink-0 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent"
    >
      <IconComponent className="w-3.5 h-3.5 text-accent shrink-0" aria-hidden="true" />
      <span className="font-semibold tracking-tight">{item.label}:</span>
      <span className="font-mono-tabular opacity-95">{item.number}</span>
    </a>
  );
}

export function QuickContacts() {
  return (
    <div
      role="region"
      aria-label="Emergency Quick Contacts"
      className="relative w-full bg-brand-950 text-[#F9FEFF] text-xs border-t-2 border-t-accent border-b border-stone-800/80 h-10 select-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto h-full px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
        {/* Pinned Left Label */}
        <div className="flex items-center gap-1.5 shrink-0 pr-3 border-r border-white/15 z-10 bg-brand-950 py-1">
          <Phone className="w-3.5 h-3.5 text-accent shrink-0" aria-hidden="true" />
          <span className="font-bold uppercase tracking-wider text-[11px] text-accent hidden sm:inline whitespace-nowrap">
            Quick Contacts
          </span>
          <span className="font-bold uppercase tracking-wider text-[10px] text-accent sm:hidden whitespace-nowrap">
            Hotlines
          </span>
        </div>

        {/* Desktop View (md and up): Static single line with hidden scrollbar if narrow */}
        <div className="hidden md:flex flex-1 items-center gap-2.5 overflow-x-auto no-scrollbar mask-edges-fade py-0.5">
          {EMERGENCY_HOTLINES.map((hotline) => (
            <HotlineChip key={hotline.id} item={hotline} />
          ))}
        </div>

        {/* Mobile View (below md): Auto-scrolling seamless CSS marquee */}
        <div
          className="flex md:hidden flex-1 items-center overflow-x-auto no-scrollbar mask-edges-fade py-0.5 relative"
          style={{ ['--marquee-duration' as string]: '35s' }}
        >
          <div className="flex items-center gap-2.5 w-max animate-marquee pause-marquee pr-2.5">
            {/* Primary Set */}
            <div className="flex items-center gap-2.5">
              {EMERGENCY_HOTLINES.map((hotline) => (
                <HotlineChip key={`primary-${hotline.id}`} item={hotline} />
              ))}
            </div>

            {/* Duplicate Set for Seamless Continuous Loop */}
            <div className="flex items-center gap-2.5" aria-hidden="true">
              {EMERGENCY_HOTLINES.map((hotline) => (
                <HotlineChip
                  key={`duplicate-${hotline.id}`}
                  item={hotline}
                  isDuplicate={true}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

