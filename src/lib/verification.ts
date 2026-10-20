import { Verification } from '@/types';

export const cityProfileVerification: Verification = {
  verified: false,
};

/**
 * Returns true only if item has explicitly verified === true.
 */
export function isVerified(item?: Verification | null): boolean {
  return item?.verified === true;
}

/**
 * Computes verification summary counts for a collection of items.
 */
export function getVerificationSummary(items: (Verification | null | undefined)[]): {
  total: number;
  verified: number;
  unverified: number;
} {
  const total = items.length;
  let verified = 0;
  for (const item of items) {
    if (item && isVerified(item)) {
      verified++;
    }
  }
  return {
    total,
    verified,
    unverified: total - verified,
  };
}

/**
 * Formats a verification date into "Verified on Month DD, YYYY" style text.
 */
export function formatVerifiedOn(dateString?: string): string {
  if (!dateString) return '';
  const trimmed = dateString.trim();

  // If already prefixed with "Verified on", return directly
  if (trimmed.toLowerCase().startsWith('verified on')) {
    return trimmed;
  }

  // Handle YYYY-MM-DD
  const isoMatch = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (isoMatch) {
    const [, year, month, day] = isoMatch;
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    if (!isNaN(date.getTime())) {
      const formatted = date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
      return `Verified on ${formatted}`;
    }
  }

  return `Verified on ${trimmed}`;
}

