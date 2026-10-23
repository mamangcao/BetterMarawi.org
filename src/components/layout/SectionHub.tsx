import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { LinkCard } from '@/components/ui/LinkCard';
import { PageHeader } from '@/components/ui/PageHeader';
import { getRoute } from '@/lib/routes';

export interface HubCard {
  /** Page in the route registry (src/lib/routes.ts); its link and title come from there */
  path: string;
  /** Small label above the title, e.g. "2025–2028 Term" */
  eyebrow: string;
  description: string;
  /** Short, accurate footer, e.g. "10 city offices" */
  meta: string;
  icon: LucideIcon;
}

interface Props {
  eyebrow: string;
  title: string;
  intro: string;
  cards: HubCard[];
}

/**
 * Landing page body for a top-level section (Government, Transparency, Statistics):
 * a header and one card per sub-page, in the same style as the /services grid.
 * Card titles are the registry labels, so they match the menus, breadcrumbs, and sitemap.
 */
export function SectionHub({ eyebrow, title, intro, cards }: Props) {
  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} intro={intro} />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map(({ path, eyebrow: label, description, meta, icon: Icon }) => (
            <LinkCard
              key={path}
              href={path}
              label={label}
              aside={<Icon className="w-4 h-4 text-brand-700" aria-hidden="true" />}
              title={getRoute(path).label}
              description={description}
              meta={meta}
            />
          ))}
        </div>
      </section>
    </>
  );
}
