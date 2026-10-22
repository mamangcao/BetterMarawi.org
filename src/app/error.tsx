'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle, RotateCcw, Home } from 'lucide-react';
import { useTranslation } from '@/i18n';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useTranslation();
  useEffect(() => {
    console.error('App Error:', error);
  }, [error]);

  return (
    <main className="max-w-2xl mx-auto px-4 py-20 text-center">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-status-error-bg text-status-error-text mb-6">
        <AlertCircle className="w-8 h-8" />
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold font-display text-mist-900">
        {t.somethingWentWrong}
      </h1>
      <p className="mt-3 text-sm text-mist-600 max-w-md mx-auto leading-relaxed">
        {t.errorDesc}
      </p>
      <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-brand-900 text-white text-sm font-semibold hover:bg-brand-950 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          {t.tryAgain}
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white border border-mist-300 text-mist-800 text-sm font-semibold hover:bg-mist-50 transition-colors"
        >
          <Home className="w-4 h-4" />
          {t.backToHome}
        </Link>
      </div>
    </main>
  );
}

