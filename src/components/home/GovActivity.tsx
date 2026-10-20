'use client';
import React from 'react';
import Link from 'next/link';
import {
  Scale,
  Building2,
  Megaphone,
  BookOpenCheck,
  BarChart3,
  MessageSquareShare,
  FileCheck2,
} from 'lucide-react';
import { ArrowUpRight } from '@/components/ui';
import { useTranslation } from '@/i18n';

export function GovActivity() {
  const { t } = useTranslation();
  const govActivityCards = [
    {
      title: 'City Ordinances & Resolutions',
      href: '/government/legislative',
      description: 'Review legislative measures passed by the Sangguniang Panlungsod.',
      icon: <Scale className="w-5 h-5 text-emerald-800" />,
      kicker: 'Sangguniang Panlungsod',
    },
    {
      title: 'Full Disclosure Policy (FDP)',
      href: '/transparency/full-disclosure-policy',
      description: 'DILG quarterly financial reports, budget utilization, and procurement bids.',
      icon: <FileCheck2 className="w-5 h-5 text-emerald-800" />,
      kicker: 'DILG FDP Portal',
    },
    {
      title: 'DTI CMCI Competitiveness Profile',
      href: '/statistics/dti-cmci-profile',
      description: 'Economic dynamism, government efficiency, and resiliency benchmarks.',
      icon: <BarChart3 className="w-5 h-5 text-emerald-800" />,
      kicker: 'Competitiveness Index',
    },
    {
      title: 'Departments & Office Directory',
      href: '/government/departments-and-officials',
      description: 'Key officials, department mandates, locations, and direct contact details.',
      icon: <Building2 className="w-5 h-5 text-emerald-800" />,
      kicker: 'City Hall Structure',
    },
    {
      title: 'FY 2026 Annual Budget',
      href: '/transparency/annual-budget',
      description: '₱1.845 Billion General Fund sectoral allocations and revenue sources.',
      icon: <BookOpenCheck className="w-5 h-5 text-emerald-800" />,
      kicker: 'Local Budget Circular',
    },
    {
      title: 'Freedom of Information (FOI)',
      href: '/transparency/freedom-of-information',
      description: 'How to request official documents and public records in Marawi City.',
      icon: <MessageSquareShare className="w-5 h-5 text-emerald-800" />,
      kicker: 'Public Records Request',
    },
    {
      title: 'Transparency Disclosures',
      href: '/transparency/transparency-documents',
      description: 'Executive orders, invitations to bid, and public notices.',
      icon: <Megaphone className="w-5 h-5 text-emerald-800" />,
      kicker: 'DILG FDP & FOI',
    },
  ];

  return (
    <section
      aria-labelledby="gov-activity-heading"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
    >
      <div className="max-w-2xl mb-10">
        <h2
          id="gov-activity-heading"
          className="text-2xl sm:text-3xl font-bold text-stone-900 font-display"
        >
          {t.govActivitySectionHeading}
        </h2>
        <p className="text-sm sm:text-base text-stone-600 mt-2">
          {t.govActivitySectionSubheading}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {govActivityCards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="group bg-white rounded-xl border border-stone-200/90 p-6 hover:border-emerald-800/50 transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="p-2 rounded-lg bg-stone-100 group-hover:bg-emerald-50 transition-colors">
                  {card.icon}
                </div>
                <span className="text-xs text-stone-500">{card.kicker}</span>
              </div>
              <h3 className="text-lg font-bold text-stone-900 group-hover:text-emerald-900 transition-colors">
                {card.title}
              </h3>
              <p className="text-sm text-stone-600 mt-2 leading-relaxed">
                {card.description}
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-emerald-800">
              <span>{t.openDirectory}</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

