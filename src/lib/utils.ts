export function cn(...inputs: (string | boolean | undefined | null)[]): string {
  return inputs.filter(Boolean).join(' ');
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-PH').format(num);
}

export function formatCurrency(num: number): string {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    maximumFractionDigits: 0,
  }).format(num);
}

