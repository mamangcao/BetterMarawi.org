// Ranao palette helpers: one place for colour choices that repeat across pages.
// Tokens live in src/app/globals.css; rules are in docs/DESIGN_SYSTEM.md.

/**
 * Categorical colours for charts, in order. Every entry passes 4.5:1 on white,
 * so bars, dots, and labels stay readable. Pick by index: CHART_SERIES[i % length].
 */
export const CHART_SERIES = [
  { name: 'Highland Pine', bar: 'bg-brand-700', text: 'text-brand-700' },
  { name: 'Lanao Blue', bar: 'bg-lake-700', text: 'text-lake-700' },
  { name: 'Mosque Gold (deep)', bar: 'bg-accent-deep', text: 'text-accent-deep' },
  { name: 'Langkit Violet', bar: 'bg-langkit-600', text: 'text-langkit-600' },
  { name: 'Okir Maroon', bar: 'bg-okir-700', text: 'text-okir-700' },
  { name: 'Lake (light)', bar: 'bg-lake-500', text: 'text-lake-600' },
] as const;

export function chartColor(index: number) {
  return CHART_SERIES[index % CHART_SERIES.length];
}

/** Icon colour for each tourism category (home page and tourism page). */
export const TOURISM_TONES: Record<string, string> = {
  heritage: 'text-okir-700',
  lakefront: 'text-lake-700',
  museums: 'text-langkit-600',
  artisan: 'text-accent-deep',
  dining: 'text-brand-700',
  highland: 'text-brand-500',
};

export function tourismTone(categoryId: string): string {
  return TOURISM_TONES[categoryId] ?? 'text-brand-700';
}

/** Barangay classification chips (statistics). */
export const CLASSIFICATION_CHIP: Record<'Urban' | 'Rural', string> = {
  Urban: 'bg-lake-50 text-lake-800 border-lake-200',
  Rural: 'bg-brand-50 text-brand-800 border-brand-200',
};
