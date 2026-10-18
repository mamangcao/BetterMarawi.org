import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbsProps {
  items: { name: string; url: string }[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (!items || items.length <= 1) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className="bg-stone-100 border-b border-stone-200/90 py-3 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs text-stone-600">
        <ol className="flex flex-wrap items-center gap-1.5">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            // Parse relative path from url if needed
            const href = item.url.startsWith('https://bettermarawi.org')
              ? item.url.replace('https://bettermarawi.org', '') || '/'
              : item.url;

            return (
              <li key={item.url} className="flex items-center gap-1.5">
                {index > 0 && <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />}
                {isLast ? (
                  <span className="font-semibold text-stone-900" aria-current="page">
                    {item.name}
                  </span>
                ) : (
                  <Link href={href} className="hover:text-emerald-900 font-medium transition-colors">
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}

