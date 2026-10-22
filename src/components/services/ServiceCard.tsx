'use client';
import React from 'react';
import Link from 'next/link';
import { FileText } from 'lucide-react';
import { ArrowUpRight } from '@/components/ui';
import { ServicePageData } from '@/types';
import { useTranslation } from '@/i18n';

interface ServiceCardProps {
  service: ServicePageData;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const { t } = useTranslation();
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group bg-white rounded-xl border border-mist-200/90 p-6 hover:border-brand-800/50 transition-all flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between text-xs text-mist-500 font-mono-tabular mb-3">
          <span className="font-semibold text-brand-800">{service.officeAcronym}</span>
          <span>{service.totalProcessingTime}</span>
        </div>
        <h2 className="text-xl font-bold text-mist-900 group-hover:text-brand-900 font-display">
          {service.title}
        </h2>
        <p className="text-sm text-mist-600 mt-2 leading-relaxed">
          {service.shortDescription}
        </p>
      </div>
      <div className="mt-5 pt-4 border-t border-mist-100 flex items-center justify-between text-xs font-semibold text-brand-800">
        <span className="inline-flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5" />
          {service.requirements.length} {t.requirementsCount} · {service.charterSteps.length} {t.stepsCount}
        </span>
        <ArrowUpRight className="w-4 h-4" />
      </div>
    </Link>
  );
}

