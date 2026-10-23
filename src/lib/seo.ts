import { Metadata } from 'next';
import { SITE_CONFIG } from '@/config/site';
import { APP_ROUTES, isIndexable } from './routes';

/**
 * Share image for every page: src/app/opengraph-image.png (1200 x 630). Listed explicitly because a
 * page that sets its own openGraph metadata does not inherit the root file-based image.
 */
export const SHARE_IMAGE = {
  url: '/opengraph-image.png',
  width: 1200,
  height: 630,
  alt: 'BetterMarawi.org, community portal for the Islamic City of Marawi',
};

export function buildMetadata({
  title,
  description,
  path = '',
}: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const url = `${SITE_CONFIG.url}${path === '/' ? '' : path}`;
  // Indexing follows the route registry, so robots and sitemap.xml always agree
  const route = APP_ROUTES.find((r) => r.path === path);
  const index = route ? isIndexable(route) : true;
  const fullTitle = title.includes('BetterMarawi.org') ? title : `${title} | BetterMarawi.org`;

  return {
    // `absolute` skips the root layout's '%s | BetterMarawi.org' template; fullTitle already has the suffix.
    title: { absolute: fullTitle },
    description,
    metadataBase: new URL(SITE_CONFIG.url),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_CONFIG.name,
      locale: 'en_PH',
      type: 'website',
      images: [SHARE_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [SHARE_IMAGE.url],
    },
    robots: {
      index,
      follow: true,
      googleBot: {
        index,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export function getRouteBreadcrumbs(pathname: string) {
  const route = APP_ROUTES.find((r) => r.path === pathname);
  if (route) return route.breadcrumbs;

  // Fallback dynamic generator
  const parts = pathname.split('/').filter(Boolean);
  const breadcrumbs = [{ name: 'Home', url: SITE_CONFIG.url }];
  let currentPath = '';

  for (const part of parts) {
    currentPath += `/${part}`;
    const matched = APP_ROUTES.find((r) => r.path === currentPath);
    breadcrumbs.push({
      name: matched ? matched.label : part.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      url: `${SITE_CONFIG.url}${currentPath}`,
    });
  }

  return breadcrumbs;
}

