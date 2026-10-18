import React from 'react';
import Link from 'next/link';
import { FileText, ArrowRight } from 'lucide-react';
import { ServicePageData } from '@/types';

interface ServiceCardProps {
  service: ServicePageData;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group bg-white rounded-xl border border-stone-200/90 p-6 hover:border-emerald-800/50 transition-all flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between text-xs text-stone-500 font-mono-tabular mb-3">
          <span className="font-semibold text-emerald-800">{service.officeAcronym}</span>
          <span>{service.totalProcessingTime}</span>
        </div>
        <h2 className="text-xl font-bold text-stone-900 group-hover:text-emerald-900 font-display">
          {service.title}
        </h2>
        <p className="text-sm text-stone-600 mt-2 leading-relaxed">
          {service.shortDescription}
        </p>
      </div>
      <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-emerald-800">
        <span className="inline-flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5" />
          {service.requirements.length} Requirements · {service.charterSteps.length} Steps
        </span>
        <ArrowRight className="w-4 h-4" />
      </div>
    </Link>
  );
}

