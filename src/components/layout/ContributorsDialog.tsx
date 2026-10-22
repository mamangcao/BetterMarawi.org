'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Code2, Globe, HandHeart, Mail, Phone, Users, X, type LucideIcon } from 'lucide-react';
import { useTranslation } from '@/i18n';
import {
  CONTRIBUTORS,
  CONTRIBUTOR_CATEGORIES,
  type ContributorContact,
} from '@/data/contributors';

const CONTACT_ICONS: Record<ContributorContact['type'], LucideIcon> = {
  website: Globe,
  email: Mail,
  github: Code2,
  phone: Phone,
};

/** Link target and short visible label for a contributor's single contact */
function contactLink(c: ContributorContact): { href: string; label: string; external: boolean } {
  switch (c.type) {
    case 'website':
      return { href: c.url, label: c.url.replace(/^https?:\/\//, '').replace(/\/$/, ''), external: true };
    case 'email':
      return { href: `mailto:${c.address}`, label: c.address, external: false };
    case 'github':
      return { href: `https://github.com/${c.username}`, label: `@${c.username}`, external: true };
    case 'phone':
      return { href: `tel:${c.number.replace(/[^\d+]/g, '')}`, label: c.number, external: false };
  }
}

function initials(name: string): string {
  const parts = name.split(/\s+/).filter(Boolean);
  return ((parts[0]?.[0] ?? '') + (parts[parts.length - 1]?.[0] ?? '')).toUpperCase();
}

/** Footer pill button that opens the Contributors window. */
export function ContributorsDialog({ buttonClassName }: { buttonClassName: string }) {
  const { t } = useTranslation();
  const dialogRef = useRef<HTMLDialogElement>(null);

  const filled = CONTRIBUTOR_CATEGORIES.filter((c) => CONTRIBUTORS.some((p) => p.category === c));
  const open = CONTRIBUTOR_CATEGORIES.filter((c) => !filled.includes(c));
  const close = () => dialogRef.current?.close();

  return (
    <>
      <button type="button" onClick={() => dialogRef.current?.showModal()} className={buttonClassName}>
        <Users className="w-4 h-4" />
        {t.contributorsButton}
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby="contributors-title"
        // Click on the backdrop (outside the panel) closes the window
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        className="m-auto w-[calc(100%-2rem)] max-w-lg rounded-2xl p-0 bg-white text-foreground shadow-2xl backdrop:bg-brand-950/60 backdrop:backdrop-blur-sm"
      >
        <div className="flex max-h-[min(80vh,640px)] flex-col">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 border-b border-surface-border px-6 pt-6 pb-4">
            <div>
              <h2 id="contributors-title" className="text-2xl font-bold font-display text-brand-950">
                {t.contributorsTitle}
              </h2>
              <p className="mt-1 text-sm text-foreground-muted">{t.contributorsIntro}</p>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label={t.contributorsClose}
              className="shrink-0 grid place-items-center w-9 h-9 rounded-full text-foreground-muted hover:bg-surface-card hover:text-brand-950 transition-colors focus-visible:outline-2 focus-visible:outline-brand-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* People, grouped by category */}
          <div className="overflow-y-auto px-6 py-5 space-y-6">
            {filled.map((cat) => (
              <section key={cat} aria-labelledby={`contrib-${cat}`}>
                <h3
                  id={`contrib-${cat}`}
                  className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-700"
                >
                  {t.contributorCategories[cat]}
                </h3>
                <ul className="mt-3 divide-y divide-surface-border-subtle rounded-xl border border-surface-border">
                  {CONTRIBUTORS.filter((p) => p.category === cat).map((p) => {
                    const link = contactLink(p.contact);
                    const Icon = CONTACT_ICONS[p.contact.type];
                    return (
                      <li key={p.name} className="flex items-center gap-3 px-4 py-3">
                        {p.photo ? (
                          <span className="relative shrink-0 w-10 h-10 rounded-full overflow-hidden bg-brand-50 ring-1 ring-surface-border">
                            <Image src={p.photo} alt="" fill sizes="40px" className="object-cover" />
                          </span>
                        ) : (
                          <span
                            aria-hidden="true"
                            className="grid place-items-center shrink-0 w-10 h-10 rounded-full bg-brand-900 text-white text-sm font-bold font-display"
                          >
                            {initials(p.name)}
                          </span>
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-brand-950 leading-snug">{p.name}</p>
                          <p className="text-xs text-foreground-subtle">{p.role}</p>
                        </div>
                        <a
                          href={link.href}
                          {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                          className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-surface-card px-3 py-1.5 text-xs font-semibold text-brand-800 hover:bg-surface-elevated hover:text-brand-950 transition-colors focus-visible:outline-2 focus-visible:outline-brand-700"
                        >
                          <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                          <span className="max-w-[10rem] truncate">{link.label}</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}

            {/* Categories still looking for people */}
            {open.length > 0 && (
              <section aria-labelledby="contrib-open">
                <h3
                  id="contrib-open"
                  className="text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground-subtle"
                >
                  {t.contributorsOpenRoles}
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {open.map((cat) => (
                    <span
                      key={cat}
                      className="rounded-full border border-dashed border-surface-border-strong px-3 py-1 text-xs text-foreground-muted"
                    >
                      {t.contributorCategories[cat]}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-surface-border px-6 py-4">
            <Link
              href="/contact"
              onClick={close}
              className="inline-flex items-center gap-2 rounded-lg bg-brand-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-950 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
            >
              <HandHeart className="w-4 h-4" />
              {t.volunteerWithUs}
            </Link>
          </div>
        </div>
      </dialog>
    </>
  );
}
