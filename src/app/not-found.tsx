import type { Metadata } from 'next';
import { NotFoundContent } from '@/components/layout/NotFoundContent';

// Not built with buildMetadata on purpose: a 404 must not be indexed and has no canonical URL.
export const metadata: Metadata = {
  title: { absolute: 'Page Not Found | BetterMarawi.org' },
  description: 'This page does not exist on BetterMarawi.org. Go back to the home page or browse city services.',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return <NotFoundContent />;
}
