'use client';

import React from 'react';
import Link from 'next/link';
import { AlertTriangle, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Verification } from '@/types';
import { getVerificationSummary } from '@/lib/verification';
import { useTranslation } from '@/i18n';

export interface UnverifiedNoticeProps {
  items?: (Verification | null | undefined)[];
  show?: boolean;
  className?: string;
  learnMoreHref?: string;
}

export function UnverifiedNotice({
  items,
  show,
  className,
  learnMoreHref = '/statistics/open-data-ph',
}: UnverifiedNoticeProps) {
  const { t } = useTranslation();

  // If items array is provided, show only if at least one item is unverified
  if (items && items.length > 0) {
    const summary = getVerificationSummary(items);
    if (summary.unverified === 0) {
      return null;
    }
  } else if (show === false) {
    return null;
  }

  const noticeText =
    t.dataStatus?.notice ||
    'Some information on this page has not yet been verified against official sources. Check with City Hall before relying on it.';
  const learnMoreText = t.dataStatus?.learnMore || 'Learn how we verify data';

  return (
    <div
      role="status"
      aria-label="Data verification notice"
      className={cn(
        'rounded-xl border border-status-warning/40 bg-status-warning-bg/90 p-3.5 sm:px-4 text-xs text-status-warning-text flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4',
        className
      )}
    >
      <div className="flex items-start sm:items-center gap-2.5 min-w-0">
        <AlertTriangle aria-hidden="true" className="w-4 h-4 shrink-0 text-status-warning mt-0.5 sm:mt-0" />
        <p className="leading-relaxed font-medium">
          {noticeText}
        </p>
      </div>

      <Link
        href={learnMoreHref}
        className="inline-flex items-center gap-1 font-semibold underline underline-offset-4 hover:opacity-80 transition-opacity whitespace-nowrap shrink-0 text-status-warning-text"
      >
        <span>{learnMoreText}</span>
        <ArrowUpRight aria-hidden="true" className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}

