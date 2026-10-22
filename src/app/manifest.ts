import type { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/config/site';

// Web app manifest: lets visitors install BetterMarawi.org on their phone or desktop.
// Colours match globals.css (--color-surface background, --color-primary theme).
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_CONFIG.name,
    short_name: 'BetterMarawi',
    description: SITE_CONFIG.tagline,
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#F9FEFF',
    theme_color: '#1B4D3E',
    lang: 'en',
    categories: ['government', 'utilities', 'news'],
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
