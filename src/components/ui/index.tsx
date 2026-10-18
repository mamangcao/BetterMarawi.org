import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'info' | 'outline' | 'emerald';
}

export function Badge({ className, variant = 'default', children, ...props }: BadgeProps) {
  const variants = {
    default: 'bg-stone-100 text-stone-800 border-stone-200',
    emerald: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    success: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    warning: 'bg-amber-50 text-amber-800 border-amber-200',
    info: 'bg-sky-50 text-sky-800 border-sky-200',
    outline: 'bg-transparent text-stone-700 border-stone-300',
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
        'bg-white rounded-xl border border-stone-200 shadow-sm p-6',
        hover && 'hover:shadow-md hover:border-emerald-700/40 transition-all duration-200',
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
    primary: 'bg-emerald-800 text-white hover:bg-emerald-900 border border-emerald-800 shadow-sm',
    secondary: 'bg-amber-600 text-white hover:bg-amber-700 border border-amber-600 shadow-sm',
    outline: 'bg-white text-stone-800 border border-stone-300 hover:bg-stone-50 hover:border-stone-400',
    ghost: 'text-stone-700 hover:bg-stone-100',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs rounded-lg',
    md: 'px-4 py-2 text-sm rounded-lg',
    lg: 'px-6 py-3 text-base rounded-xl font-medium',
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
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
        'w-full px-3.5 py-2 text-sm bg-white border border-stone-300 rounded-lg placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 transition-colors',
        className
      )}
      {...props}
    />
  );
}
