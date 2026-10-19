import React from 'react';

interface PesoProps {
  className?: string;
  children?: React.ReactNode;
}

/**
 * Renders the Philippine Peso sign (₱, U+20B1) using the body font
 * (Plus Jakarta Sans) with tabular numbers and baseline alignment,
 * ensuring it matches the exact height and weight of adjacent digits
 * without triggering system font fallback when inside monospace text.
 */
export function Peso({ className = '' }: PesoProps) {
  return (
    <span
      className={`peso font-sans tabular-nums inline-block align-baseline leading-none select-all ${className}`}
      aria-hidden="true"
    >
      ₱
    </span>
  );
}

/**
 * Helper to wrap any "₱" sign inside a string or number with the <Peso /> component.
 */
export function formatWithPeso(text: string | number): React.ReactNode {
  const str = String(text);
  if (!str.includes('₱')) return str;

  const parts = str.split('₱');
  return parts.map((part, index) => (
    <React.Fragment key={index}>
      {index > 0 && <Peso />}
      {part}
    </React.Fragment>
  ));
}

