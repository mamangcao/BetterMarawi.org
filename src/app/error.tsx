'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle, RotateCcw, Home } from 'lucide-react';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App Error:', error);
  }, [error]);

  return (
    <main className="max-w-2xl mx-auto px-4 py-20 text-center">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-status-error-bg text-status-error-text mb-6">
        <AlertCircle className="w-8 h-8" />
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold font-display text-stone-900">
        Something went wrong
      </h1>
      <p className="mt-3 text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
        An unexpected error occurred while loading this page. Please try again or return to the homepage.
      </p>
      <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-900 text-white text-sm font-semibold hover:bg-emerald-950 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Try Again
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white border border-stone-300 text-stone-800 text-sm font-semibold hover:bg-stone-50 transition-colors"
        >
          <Home className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </main>
  );
}

