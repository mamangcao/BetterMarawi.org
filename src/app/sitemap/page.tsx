import React from 'react';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { SitemapInspector } from '@/components/seo/SitemapInspector';
import { buildBreadcrumbSchema } from '@/lib/jsonld';
import { buildMetadata, getRouteBreadcrumbs } from '@/lib/seo';
import { APP_ROUTES, isIndexable } from '@/lib/routes';

const INDEXABLE_COUNT = APP_ROUTES.filter(isIndexable).length;

export const metadata: Metadata = buildMetadata({
  title: `Sitemap & SEO Inspector — ${INDEXABLE_COUNT} Indexable Pages | BetterMarawi.org`,
  description:
    `Interactive index of all ${INDEXABLE_COUNT} indexable pages on BetterMarawi.org, with each page's live title, description, canonical URL, and Schema.org JSON-LD.`,
  path: '/sitemap',
});

export default function SitemapPage() {
  const breadcrumbs = getRouteBreadcrumbs('/sitemap');

  return (
    <main className="pb-16">
      <Breadcrumbs items={breadcrumbs} />

      <section className="bg-gradient-to-b from-surface-card to-surface border-b border-mist-200/90 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-800 mb-2">
            SEO, Transparency &amp; Schema Registry
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-mist-950 font-display">
            Sitemap &amp; SEO Inspector
          </h1>
          <p className="mt-3 text-base text-mist-700 max-w-3xl leading-relaxed">
            Live index of all {APP_ROUTES.length} pages on BetterMarawi.org ({INDEXABLE_COUNT} listed for search engines). Pick a page to see the title, description, canonical URL, and Schema.org JSON-LD it actually publishes, or download the XML sitemap.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <SitemapInspector />
      </div>

      <JsonLd data={buildBreadcrumbSchema(breadcrumbs)} />
    </main>
  );
}

