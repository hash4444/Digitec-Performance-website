import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { useLocale } from '@/i18n/use-locale';
import { arHome } from '@/i18n/ar-home';

/**
 * Slim workshop-facts strip.
 * Designed to sit directly under a hero or above a CTA on dark sections.
 */
export const TrustBar = ({ className = '' }: { className?: string }) => {
  const { isArabic } = useLocale();
  const englishItems = [
    {
      value: 'Since 2002',
      label: 'independent workshop',
    },
    {
      value: 'European & luxury',
      label: 'service and repair',
    },
    {
      value: 'Inspection-led',
      label: 'recommendations',
    },
    {
      value: 'Al Quoz',
      label: 'Dubai workshop',
    },
  ];
  const items = isArabic
    ? arHome.trust
    : englishItems;

  return (
    <div className={`border-b border-white/[0.08] bg-[#101113] ${className}`}>
      <div className="mx-auto grid max-w-[90rem] grid-cols-2 px-5 sm:px-8 lg:grid-cols-4 lg:px-12">
        {items.map((item) => (
          <div key={item.label} className="border-white/[0.08] py-6 odd:border-r odd:pr-5 even:pl-5 lg:border-r lg:px-8 lg:py-7 lg:first:pl-0 lg:last:border-r-0">
            <div className="text-left leading-tight">
              <span className="block text-sm font-semibold text-off-white sm:text-[0.95rem]">{item.value}</span>
              <span className="mt-1.5 block text-xs text-white/38">{item.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Factual microcopy for directly beneath a primary CTA.
 */
export const CtaAssurance = ({
  className = '',
  align = 'center',
  text,
}: {
  className?: string;
  align?: 'center' | 'start';
  text?: string;
}) => {
  const { isArabic } = useLocale();
  return (
    <p
      className={`flex items-center ${align === 'center' ? 'justify-center' : 'justify-start'} gap-2 text-[11px] sm:text-xs text-gray-400 tracking-wide ${className}`}
    >
      <ShieldCheck className="w-3.5 h-3.5 text-burnt-orange shrink-0" />
      {text ?? (isArabic ? 'تواصل معنا لمناقشة سيارتك وطلب موعد' : 'Contact us to discuss your vehicle and request an appointment')}
    </p>
  );
};
