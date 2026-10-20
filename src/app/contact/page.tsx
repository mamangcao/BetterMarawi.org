import React from 'react';
import { Metadata } from 'next';
import {
  ContactForm,
  DirectoryList,
  EmergencyBanners,
  MapCard,
} from '@/components/contact';
import { UnverifiedNotice } from '@/components/ui';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbSchema } from '@/lib/jsonld';
import { buildMetadata, getRouteBreadcrumbs } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Contact Us & Emergency Hotlines — Marawi City Hall | BetterMarawi.org',
  description:
    'Get in touch with Marawi City Hall, CDRRMO (063) 352-0117, City Health Office (063) 221-2536, BFP, PNP, or submit a citizen feedback message.',
  path: '/contact',
});

export default function ContactPage() {
  const breadcrumbs = getRouteBreadcrumbs('/contact');

  return (
    <main className="pb-16">
      <Breadcrumbs items={breadcrumbs} />

      <section className="bg-gradient-to-b from-surface-card to-surface border-b border-stone-200/90 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-800 mb-2">
            Public Assistance &amp; Citizen Feedback
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-950 font-display">
            Contact Us &amp; Emergency Hotlines
          </h1>
          <p className="mt-3 text-base text-stone-700 max-w-2xl leading-relaxed">
            Reach out to Marawi City Hall departments, emergency dispatch centers, or the BetterMarawi.org civic volunteer team.
          </p>
          <UnverifiedNotice show={true} className="mt-6" />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
          <aside className="lg:col-span-5 space-y-6">
            <DirectoryList />
            <EmergencyBanners />
            <MapCard />
          </aside>
        </div>
      </div>

      <JsonLd data={buildBreadcrumbSchema(breadcrumbs)} />
    </main>
  );
}
