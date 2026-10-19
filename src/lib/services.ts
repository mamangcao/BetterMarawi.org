import { SERVICES_DATA } from '@/data/services';
import { ServicePageData } from '@/types';

/**
 * Returns popular services sorted by popularRank in ascending order, capped at 6.
 */
export function getPopularServices(): ServicePageData[] {
  return [...SERVICES_DATA]
    .filter((service) => Boolean(service.popular))
    .sort((a, b) => (a.popularRank ?? 99) - (b.popularRank ?? 99))
    .slice(0, 6);
}

