import React from 'react';
import { Building2 } from 'lucide-react';
import { LinkCard } from '@/components/ui/LinkCard';
import type { ServiceCardData } from '@/data/serviceCatalog';

/** A service on the /services grid. Every service, including Certificates, uses this same card. */
export function ServiceCard({ card }: { card: ServiceCardData }) {
  return (
    <LinkCard
      href={card.href}
      label={card.acronym}
      aside={
        <span className="inline-flex items-center gap-1 font-sans">
          <Building2 className="w-3.5 h-3.5" aria-hidden="true" />
          {card.offices.length} {card.offices.length === 1 ? 'office' : 'offices'}
        </span>
      }
      title={card.title}
      description={card.description}
      meta={card.meta}
    />
  );
}
