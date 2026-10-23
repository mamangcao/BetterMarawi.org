import React from 'react';
import { serializeJsonLd } from '@/lib/jsonld';

interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // serializeJsonLd escapes "<" so no string value can close the script tag early
      dangerouslySetInnerHTML={{
        __html: serializeJsonLd(data),
      }}
    />
  );
}
