import { SITE_CONFIG } from '@/config/site';
import { FAQItem, ServicePageData } from '@/types';

/**
 * Serialize structured data for a <script type="application/ld+json"> tag.
 * JSON.stringify alone can emit "</script>" or "<!--" from a string value, which would end the
 * script element early and let the rest be parsed as HTML. Escaping every "<" as < keeps
 * the output inside the script while JSON parsers read it back as the same "<" character.
 */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export function buildGovernmentOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'GovernmentOrganization',
    '@id': `${SITE_CONFIG.url}/#organization`,
    name: 'City Government of the Islamic City of Marawi',
    // Not 'BetterMarawi.org': this site is community-run and is not a name of the City Government.
    alternateName: ['LGU Marawi City', 'Islamic City of Marawi'],
    url: SITE_CONFIG.url,
    // No telephone or email: no official source confirms one for the city (docs/VERIFICATION_CHECKLIST.md).
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'City Hall Complex, Brgy. Fort',
      addressLocality: 'Marawi City',
      addressRegion: 'Lanao del Sur, BARMM',
      postalCode: '9700',
      addressCountry: 'PH',
    },
    sameAs: [SITE_CONFIG.contact.facebookUrl],
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE_CONFIG.geo.latitude,
      longitude: SITE_CONFIG.geo.longitude,
    },
    areaServed: {
      '@type': 'City',
      name: 'Islamic City of Marawi',
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: 'Lanao del Sur, Bangsamoro Autonomous Region in Muslim Mindanao',
      },
    },
  };
}

export function buildBreadcrumbSchema(breadcrumbs: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function buildGovernmentServiceSchema(service: ServicePageData, pageUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'GovernmentService',
    name: `${service.title} — Islamic City of Marawi`,
    description: service.heroSummary,
    url: pageUrl,
    serviceType: service.title,
    serviceOperator: {
      '@type': 'GovernmentOrganization',
      name: service.responsibleOffice,
      // Office hotlines and emails are unverified, so they are not published as structured data.
      parentOrganization: { '@id': `${SITE_CONFIG.url}/#organization` },
    },
    areaServed: {
      '@type': 'City',
      name: 'Islamic City of Marawi, Lanao del Sur',
    },
    audience: {
      '@type': 'Audience',
      audienceType: service.whoMayAvail,
    },
    termsOfService: `Requirements: ${service.requirements.join('; ')}`,
  };
}

export function buildFAQSchema(faqs: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

