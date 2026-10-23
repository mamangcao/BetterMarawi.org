'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Download, Code2 } from 'lucide-react';
import { ArrowUpRight } from '@/components/ui';
import { APP_ROUTES, isIndexable } from '@/lib/routes';
import { SITE_CONFIG } from '@/config/site';

interface PageHead {
  title: string;
  description: string;
  canonical: string;
  robots: string;
  schemas: unknown[];
}

/** Read the SEO tags a page actually publishes, from its server-rendered HTML */
function readHead(html: string): PageHead {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const attr = (selector: string, name: string) => doc.querySelector(selector)?.getAttribute(name) ?? '';
  const schemas: unknown[] = [];
  doc.querySelectorAll('script[type="application/ld+json"]').forEach((s) => {
    try {
      schemas.push(JSON.parse(s.textContent ?? ''));
    } catch {
      schemas.push({ error: 'Invalid JSON-LD' });
    }
  });
  return {
    title: doc.title,
    description: attr('meta[name="description"]', 'content'),
    canonical: attr('link[rel="canonical"]', 'href'),
    robots: attr('meta[name="robots"]', 'content'),
    schemas,
  };
}

const schemaType = (s: unknown) => String((s as { '@type'?: unknown })?.['@type'] ?? 'Unknown');

export function SitemapInspector() {
  const [selectedPath, setSelectedPath] = useState<string>('/services/health-services');
  const [loaded, setLoaded] = useState<{ path: string; head?: PageHead; failed?: boolean } | null>(null);

  const selectedRoute =
    APP_ROUTES.find((r) => r.path === selectedPath) || APP_ROUTES[0];

  // Fetch the page itself so the preview shows its real metadata, not a guess
  useEffect(() => {
    const path = selectedRoute.path;
    let cancelled = false;
    fetch(path, { headers: { Accept: 'text/html' } })
      .then((res) => {
        if (!res.ok) throw new Error(String(res.status));
        return res.text();
      })
      .then((html) => {
        if (!cancelled) setLoaded({ path, head: readHead(html) });
      })
      .catch(() => {
        if (!cancelled) setLoaded({ path, failed: true });
      });
    return () => {
      cancelled = true;
    };
  }, [selectedRoute.path]);

  const current = loaded?.path === selectedRoute.path ? loaded : null;
  const head = current?.head;
  const status = !current ? 'Loading…' : current.failed ? 'Could not load this page. Open it and use View Source instead.' : '';

  const downloadSitemapXml = () => {
    const urls = APP_ROUTES.filter(isIndexable).map(
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
      <div className="lg:col-span-5 bg-white rounded-xl border border-mist-200/90 p-5">
        <div className="text-xs font-semibold uppercase tracking-wider text-mist-500 pb-3 mb-3 border-b border-mist-100 flex items-center justify-between">
          <span>All Routes ({APP_ROUTES.length})</span>
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
                    ? 'bg-brand-50 border-brand-800/40 text-mist-950'
                    : 'border-transparent hover:bg-mist-50 text-mist-700'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setSelectedPath(route.path)}
                  className="text-left min-w-0 flex-1"
                >
                  <div className="font-mono-tabular font-bold text-brand-900 truncate">
                    {route.path}
                    {!isIndexable(route) && <span className="ml-1.5 font-semibold text-mist-600">(noindex)</span>}
                  </div>
                  <div className="text-mist-500 truncate mt-0.5">
                    {route.label} — {route.description}
                  </div>
                </button>
                <Link
                  href={route.path}
                  title={`Visit ${route.path}`}
                  className="p-1.5 rounded bg-mist-100 hover:bg-brand-900 hover:text-white text-mist-700 shrink-0"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right 7 Cols: Live Metadata & JSON-LD Schema Inspector */}
      <div className="lg:col-span-7 space-y-6">
        <div className="bg-white rounded-xl border border-mist-200/90 p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-mist-100">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-800">
              <Code2 className="w-4 h-4" />
              Dynamic Head &amp; OpenGraph Metadata Preview
            </div>
            <Link
              href={selectedRoute.path}
              className="text-xs font-semibold text-brand-800 hover:underline inline-flex items-center gap-1 group"
            >
              <span>Open {selectedRoute.path}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3 text-xs" aria-live="polite" aria-busy={!current}>
            {status ? (
              <p className="text-mist-600">{status}</p>
            ) : (
              <>
                <div>
                  <span className="font-semibold text-mist-500 block">
                    &lt;title&gt;
                  </span>
                  <div className="font-bold text-mist-900 text-sm mt-0.5 break-words">
                    {head?.title || '(none)'}
                  </div>
                </div>
                <div>
                  <span className="font-semibold text-mist-500 block">
                    &lt;meta name=&quot;description&quot;&gt;
                  </span>
                  <div className="text-mist-700 mt-0.5 leading-relaxed">
                    {head?.description || '(none)'}
                  </div>
                </div>
                <div>
                  <span className="font-semibold text-mist-500 block">
                    &lt;link rel=&quot;canonical&quot;&gt; · &lt;meta name=&quot;robots&quot;&gt;
                  </span>
                  <div className="font-mono-tabular text-brand-900 font-semibold mt-0.5 break-all">
                    {head?.canonical || '(none)'}
                  </div>
                  <div className="font-mono-tabular text-mist-700 mt-0.5">
                    {head?.robots || '(none)'}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="bg-mist-950 text-mist-100 rounded-xl p-6 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
            <span className="text-xs font-mono-tabular text-accent font-semibold">
              &lt;script type=&quot;application/ld+json&quot;&gt; ({head?.schemas.length ?? 0} on this page)
            </span>
            <span className="text-[11px] font-mono-tabular text-mist-400">
              {head?.schemas.map(schemaType).join(' · ')}
            </span>
          </div>
          <pre className="text-xs font-mono-tabular text-brand-200 overflow-x-auto max-h-[420px] overflow-y-auto p-4 rounded-lg bg-mist-900 border border-mist-800 leading-relaxed">
            {status || JSON.stringify(head?.schemas, null, 2)}
          </pre>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={downloadSitemapXml}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-brand-900 text-white text-xs font-semibold hover:bg-brand-950 transition-colors whitespace-nowrap shrink-0 font-mono-tabular"
          >
            <Download className="w-4 h-4" />
            Download sitemap.xml ({APP_ROUTES.filter(isIndexable).length} URLs)
          </button>
        </div>
      </div>
    </div>
  );
}

