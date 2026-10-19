'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Download, ExternalLink, Code2 } from 'lucide-react';
import { APP_ROUTES } from '@/lib/routes';
import { SITE_CONFIG } from '@/config/site';
import {
  buildGovernmentOrganizationSchema,
  buildBreadcrumbSchema,
  buildGovernmentServiceSchema,
  buildFAQSchema,
} from '@/lib/jsonld';
import { SERVICES_DATA } from '@/data/services';

export function SitemapInspector() {
  const [selectedPath, setSelectedPath] = useState<string>('/services/health-services');

  const selectedRoute =
    APP_ROUTES.find((r) => r.path === selectedPath) || APP_ROUTES[0];

  const canonicalUrl = `${SITE_CONFIG.url}${selectedRoute.path === '/' ? '' : selectedRoute.path}`;

  // Build the inspected schemas dynamically
  const schemas: Record<string, unknown>[] = [
    buildGovernmentOrganizationSchema(),
    buildBreadcrumbSchema(selectedRoute.breadcrumbs),
  ];

  if (selectedRoute.path.startsWith('/services/')) {
    const slug = selectedRoute.path.replace('/services/', '');
    const service = SERVICES_DATA.find((s) => s.slug === slug);
    if (service) {
      schemas.push(buildGovernmentServiceSchema(service, canonicalUrl));
      if (service.faqs && service.faqs.length > 0) {
        schemas.push(buildFAQSchema(service.faqs));
      }
    }
  }

  const downloadSitemapXml = () => {
    const urls = APP_ROUTES.map(
      (r) => `  <url>
    <loc>${SITE_CONFIG.url}${r.path === '/' ? '' : r.path}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority.toFixed(2)}</priority>
  </url>`
    ).join('\n');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

    const blob = new Blob([xml], { type: 'application/xml;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left 5 Cols: Complete Indexable URL Tree */}
      <div className="lg:col-span-5 bg-white rounded-xl border border-stone-200/90 p-5">
        <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 pb-3 mb-3 border-b border-stone-100 flex items-center justify-between">
          <span>All Indexable Routes ({APP_ROUTES.length})</span>
          <span>Click to Inspect</span>
        </div>
        <div className="space-y-1 max-h-[680px] overflow-y-auto pr-1">
          {APP_ROUTES.map((route) => {
            const isSelected = selectedPath === route.path;
            return (
              <div
                key={route.path}
                className={`flex items-center justify-between gap-2 p-2.5 rounded-lg border text-xs transition-colors ${
                  isSelected
                    ? 'bg-emerald-50 border-emerald-800/40 text-stone-950'
                    : 'border-transparent hover:bg-stone-50 text-stone-700'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setSelectedPath(route.path)}
                  className="text-left min-w-0 flex-1"
                >
                  <div className="font-mono-tabular font-bold text-emerald-900 truncate">
                    {route.path}
                  </div>
                  <div className="text-stone-500 truncate mt-0.5">
                    {route.label} — {route.description}
                  </div>
                </button>
                <Link
                  href={route.path}
                  title={`Visit ${route.path}`}
                  className="p-1.5 rounded bg-stone-100 hover:bg-emerald-900 hover:text-white text-stone-700 shrink-0"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right 7 Cols: Live Metadata & JSON-LD Schema Inspector */}
      <div className="lg:col-span-7 space-y-6">
        <div className="bg-white rounded-xl border border-stone-200/90 p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800">
              <Code2 className="w-4 h-4" />
              Dynamic Head &amp; OpenGraph Metadata Preview
            </div>
            <Link
              href={selectedRoute.path}
              className="text-xs font-semibold text-emerald-800 hover:underline"
            >
              Open {selectedRoute.path} &rarr;
            </Link>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <span className="font-semibold text-stone-500 block">
                &lt;title&gt; &amp; og:title
              </span>
              <div className="font-bold text-stone-900 text-sm mt-0.5">
                {selectedRoute.label} | BetterMarawi.org
              </div>
            </div>
            <div>
              <span className="font-semibold text-stone-500 block">
                &lt;meta name=&quot;description&quot;&gt;
              </span>
              <div className="text-stone-700 mt-0.5 leading-relaxed">
                {selectedRoute.description}
              </div>
            </div>
            <div>
              <span className="font-semibold text-stone-500 block">
                &lt;link rel=&quot;canonical&quot;&gt;
              </span>
              <div className="font-mono-tabular text-emerald-900 font-semibold mt-0.5">
                {canonicalUrl}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-stone-950 text-stone-100 rounded-xl p-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono-tabular text-accent font-semibold">
              Injected &lt;script type=&quot;application/ld+json&quot;&gt; ({schemas.length} Schemas)
            </span>
            <span className="text-[11px] font-mono-tabular text-stone-400">
              GovernmentOrganization · BreadcrumbList · GovernmentService · FAQPage
            </span>
          </div>
          <pre className="text-xs font-mono-tabular text-emerald-200 overflow-x-auto max-h-[420px] overflow-y-auto p-4 rounded-lg bg-stone-900 border border-stone-800 leading-relaxed">
            {JSON.stringify(schemas, null, 2)}
          </pre>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={downloadSitemapXml}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-900 text-white text-xs font-semibold hover:bg-emerald-950 transition-colors whitespace-nowrap shrink-0 font-mono-tabular"
          >
            <Download className="w-4 h-4" />
            Download sitemap.xml ({APP_ROUTES.length} URLs)
          </button>
        </div>
      </div>
    </div>
  );
}

