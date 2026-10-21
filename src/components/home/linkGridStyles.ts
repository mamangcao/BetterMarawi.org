// Shared styles for the home link grids: Popular Services, Government Activity,
// and Discover Marawi. Cells share hairline borders (gap-px over a border-colored grid).

export const gridClass =
  'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-surface-border border border-surface-border rounded-2xl overflow-hidden';

export const cellClass =
  'group relative flex gap-4 p-6 sm:p-7 transition-colors duration-200 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-700';

/** Background for a normal cell and for the tinted "view all" cell */
export const cellBg = 'bg-white hover:bg-surface';
export const cellBgAll = 'bg-surface-card hover:bg-surface-elevated';

export const iconClass = 'shrink-0 mt-0.5 w-6 h-6 text-brand-700';

export const titleClass =
  'text-lg font-bold text-brand-950 group-hover:text-brand-800 transition-colors';

export const eyebrowClass =
  'mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground-subtle';

export const descriptionClass = 'mt-3 text-[15px] text-foreground-muted leading-relaxed';

export const arrowClass =
  'absolute top-6 right-6 w-4 h-4 text-foreground-subtle transition-all duration-200 group-hover:text-brand-800 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none';

/** Section header: title left, one-line subtitle right, on a shared baseline */
export const headerClass =
  'flex flex-col md:flex-row md:items-baseline justify-between gap-x-8 gap-y-2 mb-8';
export const headingClass =
  'text-2xl sm:text-3xl font-bold text-brand-950 font-display tracking-tight';
export const subheadingClass = 'text-sm sm:text-base text-foreground-muted md:text-right';
