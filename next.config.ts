import type { NextConfig } from 'next';
import path from 'path';

/**
 * Content Security Policy, REPORT-ONLY for now: browsers log violations to the console but block
 * nothing. Promote it to `Content-Security-Policy` only after a period with no unexpected reports.
 * - script-src needs 'unsafe-inline': Next.js inlines bootstrap scripts into statically generated
 *   pages, and nonces would require rendering every page per request.
 * - style-src needs 'unsafe-inline' for React style attributes.
 * - connect-src lists the two public APIs the header uses (exchange rates, weather).
 * Production only, because `next dev` relies on eval for fast refresh.
 */
const CSP_REPORT_ONLY = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self' https://open.er-api.com https://api.open-meteo.com",
  "manifest-src 'self'",
  "worker-src 'self'",
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join('; ');

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          ...(process.env.NODE_ENV === 'production'
            ? [{ key: 'Content-Security-Policy-Report-Only', value: CSP_REPORT_ONLY }]
            : []),
        ],
      },
    ];
  },
};

export default nextConfig;
