/**
 * Format an amount in millions of pesos the way the official summaries show it:
 * ₱58.4M, ₱1.08B, ₱0. A missing value (no record) is "—", never ₱0.
 */
export function formatMillions(value: number | null): string {
  if (value === null) return '—';
  if (value === 0) return '₱0';
  if (value >= 1000) return `₱${(value / 1000).toFixed(2)}B`;
  return `₱${value.toFixed(1)}M`;
}
