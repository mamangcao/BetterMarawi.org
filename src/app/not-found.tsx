'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Search } from 'lucide-react';
import { useTranslation } from '@/i18n';

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <main className="max-w-3xl mx-auto px-4 py-20 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-900 font-bold font-display text-2xl mb-6">
        404
      </div>
      <h1 className="text-3xl sm:text-4xl font-bold font-display text-stone-900">
        {t.pageNotFound}
      </h1>
      <p className="mt-4 text-base text-stone-600 max-w-lg mx-auto leading-relaxed">
        {t.pageNotFoundDesc}
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-900 text-white text-sm font-semibold hover:bg-emerald-950 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {t.backToHome}
        </Link>
        <Link
          href="/services"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white border border-stone-300 text-stone-800 text-sm font-semibold hover:bg-stone-50 transition-colors"
        >
          <Search className="w-4 h-4" />
          {t.browse11Services}
        </Link>
      </div>
    </main>
  );
}

