'use client';

import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Verification } from '@/types';
import { isUnverified } from '@/lib/verification';
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

export interface DataStatusProps extends BadgeVariantProps {
  item?: Verification | null;
}

/**
 * Marks unverified information only. Verified (sourced or confirmed) information shows no badge:
 * the absence of "Unverified" is the signal, and sources stay in SourceNote and the data files.
 */
export function DataStatus({ item, variant = 'inline', className }: DataStatusProps) {
  if (!isUnverified(item)) return null;
  return <UnverifiedBadge variant={variant} className={className} />;
}
