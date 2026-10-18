import React from 'react';

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center justify-center">
      <div className="w-8 h-8 border-3 border-emerald-800 border-t-transparent rounded-full animate-spin mb-4" />
      <span className="text-xs text-stone-500 font-mono-tabular">
        Loading BetterMarawi.org...
      </span>
    </div>
  );
}

