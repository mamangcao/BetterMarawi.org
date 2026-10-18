import { MetadataRoute } from 'next';
import { APP_ROUTES } from '@/lib/routes';
import { SITE_CONFIG } from '@/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString().split('T')[0];

  return APP_ROUTES.map((route) => ({
    url: `${SITE_CONFIG.url}${route.path === '/' ? '' : route.path}`,
    lastModified: currentDate,
    changeFrequency: route.changefreq,
    priority: route.priority,
  }));
}

