import React from 'react';
import { cn } from '@/lib/utils';

export interface ArrowUpRightProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  strokeWidth?: number | string;
}

/**
 * Shared up-right (↗) arrow icon for all links, buttons, and CTAs across BetterMarawi.org.
 * Rendered as an inline SVG with stroke="currentColor" so it always inherits text color
 * and never triggers mobile emoji substitution (e.g. blue square emoji on iOS/Android).
 */
export function ArrowUpRight({
  className,
  size = '1em',
  strokeWidth = 2,
  ...props
}: ArrowUpRightProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={cn(
        'inline-block shrink-0 transition-transform motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5',
        className
      )}
      {...props}
    >
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  );
}

export default ArrowUpRight;

