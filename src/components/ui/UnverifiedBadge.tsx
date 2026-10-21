'use client';

import React from 'react';
import { AlertTriangle, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Verification } from '@/types';
import { isConfirmed, isSourced, formatVerifiedOn } from '@/lib/verification';
import { useTranslation } from '@/i18n';

export interface BadgeVariantProps {
  variant?: 'inline' | 'notice';
  className?: string;
}

export interface UnverifiedBadgeProps extends BadgeVariantProps {
  title?: string;
}

export function UnverifiedBadge({
  variant = 'inline',
  className,
  title,
}: UnverifiedBadgeProps) {
  const { t } = useTranslation();
  const label = t.dataStatus?.unverified || 'Unverified';
  const defaultTooltip =
    t.dataStatus?.tooltip ||
    'This information has not yet been checked against an official source.';
  const tooltipText = title || defaultTooltip;

  return (
    <span
      role="status"
      tabIndex={0}
      title={tooltipText}
      aria-label={`${label}: ${tooltipText}`}
      className={cn(
        'inline-flex items-center gap-1 rounded-full border whitespace-nowrap font-medium select-none cursor-help',
        'border-status-warning/40 bg-status-warning-bg text-status-warning-text',
        'focus:outline-none focus:ring-1 focus:ring-status-warning',
        variant === 'notice' ? 'px-2.5 py-1 text-xs' : 'px-2 py-0.5 text-[11px] leading-tight',
        className
      )}
    >
      <AlertTriangle aria-hidden="true" className="w-3 h-3 shrink-0" />
      <span>{label}</span>
    </span>
  );
}

export interface VerifiedBadgeProps extends BadgeVariantProps {
  verifiedOn?: string;
  source?: string;
}

export function VerifiedBadge({
  variant = 'inline',
  className,
  verifiedOn,
  source,
}: VerifiedBadgeProps) {
  const { t } = useTranslation();
  const label = t.dataStatus?.verified || 'Verified';
  const dateText = verifiedOn ? formatVerifiedOn(verifiedOn) : '';
  const tooltip = [dateText, source ? `Source: ${source}` : '']
    .filter(Boolean)
    .join(' · ') || label;

  return (
    <span
      role="status"
      tabIndex={0}
      title={tooltip}
      aria-label={tooltip}
      className={cn(
        'inline-flex items-center gap-1 rounded-full border whitespace-nowrap font-medium select-none',
        'border-status-success/40 bg-status-success-bg text-status-success-text',
        'focus:outline-none focus:ring-1 focus:ring-status-success',
        variant === 'notice' ? 'px-2.5 py-1 text-xs' : 'px-2 py-0.5 text-[11px] leading-tight',
        className
      )}
    >
      <Check aria-hidden="true" className="w-3 h-3 shrink-0" />
      <span>{label}</span>
      {verifiedOn && (
        <span className="text-[10px] opacity-80 font-mono-tabular">
          {verifiedOn}
        </span>
      )}
    </span>
  );
}

export interface DataStatusProps extends BadgeVariantProps {
  item?: Verification | null;
}

export function DataStatus({ item, variant = 'inline', className }: DataStatusProps) {
  // Renders nothing for "sourced" (the SourceNote carries the information)
  if (isSourced(item)) {
    return null;
  }

  // Green Verified badge for "confirmed"
  if (isConfirmed(item)) {
    return (
      <VerifiedBadge
        variant={variant}
        className={className}
        verifiedOn={item?.verifiedOn}
        source={item?.source}
      />
    );
  }

  // Unverified badge otherwise
  return <UnverifiedBadge variant={variant} className={className} />;
}
