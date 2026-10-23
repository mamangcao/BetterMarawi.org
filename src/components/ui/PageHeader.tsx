import React from 'react';

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  intro: string;
  /** Optional content under the intro, e.g. an UnverifiedNotice */
  children?: React.ReactNode;
}

/** Header band for directory and section landing pages (/services, /government, /transparency, /statistics) */
export function PageHeader({ eyebrow, title, intro, children }: PageHeaderProps) {
  return (
    <section className="bg-gradient-to-b from-surface-card to-surface border-b border-mist-200/90 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-800 mb-2">{eyebrow}</p>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-mist-950 font-display">{title}</h1>
        <p className="mt-3 text-base text-mist-700 max-w-2xl">{intro}</p>
        {children}
      </div>
    </section>
  );
}
