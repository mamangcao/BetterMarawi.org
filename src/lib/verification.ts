import { Verification } from '@/types';

export const cityProfileVerification: Verification = {
  level: 'sourced',
  source: 'Philippine Statistics Authority (PSA) PSGC & 2024 POPCEN',
  sourceUrl: 'https://psa.gov.ph/classification/psgc/barangays/1903617000',
  retrievedOn: 'October 21, 2026',
};

/**
 * Returns true if item has level === 'confirmed' or verified === true.
 */
export function isConfirmed(item?: Verification | null): boolean {
  return item?.level === 'confirmed' || item?.verified === true;
}

/**
 * isUnverified(item) is true unless level is "sourced" or "confirmed" (or verified is true).
 */
export function isUnverified(item?: Verification | null): boolean {
  if (!item) return true;
  if (item.level === 'sourced' || item.level === 'confirmed' || item.verified === true) {
    return false;
  }
  return true;
}

/**
 * Computes verification summary counts for a collection of items across the three states:
 * confirmed (or verified), sourced, and unverified.
 */
export function getVerificationSummary(items: (Verification | null | undefined)[]): {
  total: number;
  confirmed: number;
  sourced: number;
  unverified: number;
  verified: number;
} {
  const total = items.length;
  let confirmed = 0;
  let sourced = 0;
  let unverified = 0;

  for (const item of items) {
    if (isConfirmed(item)) {
      confirmed++;
    } else if (item?.level === 'sourced') {
      sourced++;
    } else {
      unverified++;
    }
  }

  return {
    total,
    confirmed,
    sourced,
    unverified,
    verified: confirmed,
  };
}

/**
 * Formats a retrieval date into "Month DD, YYYY" or preserves formatted text.
 */
export function formatRetrievedOn(dateString?: string): string {
  if (!dateString) return '';
  const trimmed = dateString.trim();

  // Handle YYYY-MM-DD
  const isoMatch = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (isoMatch) {
    const [, year, month, day] = isoMatch;
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    if (!isNaN(date.getTime())) {
      return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    }
  }

  return trimmed;
}
