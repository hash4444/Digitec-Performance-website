import React from 'react';
import { ShieldCheck, Clock, Car, Truck } from 'lucide-react';

/**
 * Slim authority strip — social proof + credibility signals.
 * Designed to sit directly under a hero or above a CTA on dark sections.
 */
export const TrustBar = ({ className = '' }: { className?: string }) => {
  const items = [
    {
      icon: <Truck className="w-4 h-4 text-burnt-orange" />,
      value: 'Free',
      label: 'collection & delivery, Dubai',
    },
    {
      icon: <Clock className="w-4 h-4 text-burnt-orange" />,
      value: '40+ years',
      label: 'specialist experience',
    },
    {
      icon: <Car className="w-4 h-4 text-burnt-orange" />,
      value: '50,000+',
      label: 'vehicles serviced',
    },
    {
      icon: <ShieldCheck className="w-4 h-4 text-burnt-orange" />,
      value: 'OEM-grade',
      label: 'diagnostics & parts',
    },
  ];

  return (
    <div className={`border-y border-white/[0.07] bg-white/[0.02] ${className}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-5 grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-3">
        {items.map((item) => (
          <div key={item.label} className="flex items-center justify-center gap-2.5">
            {item.icon}
            <div className="leading-tight text-left">
              <span className="block text-off-white font-bold text-sm sm:text-base tabular-nums">{item.value}</span>
              <span className="block text-gray-400 text-[11px] sm:text-xs">{item.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Risk-reversal microcopy for directly beneath a primary CTA.
 * Lowers the perceived cost of acting (free, no commitment, fast reply).
 */
export const CtaAssurance = ({
  className = '',
  align = 'center',
}: {
  className?: string;
  align?: 'center' | 'start';
}) => (
  <p
    className={`flex items-center ${align === 'center' ? 'justify-center' : 'justify-start'} gap-2 text-[11px] sm:text-xs text-gray-400 tracking-wide ${className}`}
  >
    <ShieldCheck className="w-3.5 h-3.5 text-burnt-orange shrink-0" />
    Free assessment · No obligation · WhatsApp reply within minutes
  </p>
);
