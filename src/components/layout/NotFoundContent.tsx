'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Search } from 'lucide-react';
import { useTranslation } from '@/i18n';

/** Body of the 404 page. Client-side so the text follows the chosen language. */
export function NotFoundContent() {
  const { t } = useTranslation();
  return (
    <main className="max-w-3xl mx-auto px-4 py-20 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-100 text-brand-900 font-bold font-display text-2xl mb-6">
        404
      </div>
      <h1 className="text-3xl sm:text-4xl font-bold font-display text-mist-900">
        {t.pageNotFound}
      </h1>
      <p className="mt-4 text-base text-mist-600 max-w-lg mx-auto leading-relaxed">
        {t.pageNotFoundDesc}
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-900 text-white text-sm font-semibold hover:bg-brand-950 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {t.backToHome}
        </Link>
        <Link
          href="/services"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white border border-mist-300 text-mist-800 text-sm font-semibold hover:bg-mist-50 transition-colors"
        >
          <Search className="w-4 h-4" />
          {t.browse11Services}
        </Link>
      </div>
    </main>
  );
}
