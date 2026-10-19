import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'info' | 'outline' | 'emerald';
}

export function Badge({ className, variant = 'default', children, ...props }: BadgeProps) {
  const variants = {
    default: 'bg-surface-card text-foreground-secondary border-surface-border',
    emerald: 'bg-brand-50 text-brand-900 border-brand-200',
    success: 'bg-status-success-bg text-status-success-text border-status-success/30',
    warning: 'bg-status-warning-bg text-status-warning-text border-status-warning/30',
    info: 'bg-status-info-bg text-status-info-text border-status-info/30',
    outline: 'bg-transparent text-foreground-secondary border-surface-border',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export function Card({ className, hover = false, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-xl border border-surface-border shadow-sm p-6',
        hover && 'hover:shadow-md hover:border-brand-700/40 transition-all duration-200',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  children,
  ...props
}: ButtonProps) {
  const variants = {
    primary: 'bg-brand text-foreground-inverse hover:bg-brand-950 border border-brand shadow-sm',
    secondary: 'bg-accent text-brand-950 hover:bg-accent-hover border border-accent-muted shadow-sm font-semibold',
    outline: 'bg-white text-foreground-secondary border border-surface-border hover:bg-surface-card hover:border-surface-border-strong',
    ghost: 'text-foreground-secondary hover:bg-surface-card',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs rounded-lg',
    md: 'px-4 py-2 text-sm rounded-lg',
    lg: 'px-6 py-3 text-base rounded-xl font-medium',
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        'w-full px-3.5 py-2 text-sm bg-white border border-surface-border rounded-lg placeholder-foreground-subtle focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-colors',
        className
      )}
      {...props}
    />
  );
}

export * from './ArrowUpRight';
export * from './CurrencySymbol';
