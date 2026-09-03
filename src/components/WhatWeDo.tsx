import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';
import { LocalizedLink as Link } from '@/components/LocalizedLink';
import { useLocale } from '@/i18n/use-locale';
import { arHome } from '@/i18n/ar-home';
import mercedesAmgEngineImg from '@/assets/mercedes-amg-engine-repair-dubai.jpg';

const capabilities = [
  {
    title: 'Performance Tuning',
    text: 'ECU and supporting-hardware projects planned around the vehicle, fuel, intended use and current condition.',
    image: mercedesAmgEngineImg,
    alt: 'Mercedes-AMG engine prepared for performance tuning at DIGI-TEC Dubai',
    href: '/tuning',
  },
  {
    title: 'Aesthetic Enhancement',
    text: 'Body, exterior and wheel projects assessed for fitment, condition and the owner’s requested specification.',
    image: '/lovable-uploads/brabus-g-class.png',
    alt: 'Aesthetic Enhancement - Brabus G-Class',
    href: '/services/car-body-repair-dubai',
  },
  {
    title: 'Precision Maintenance',
    text: 'Scheduled maintenance and fault inspection for the mechanical, electrical, cooling, brake and comfort systems.',
    image: '/lovable-uploads/02e53b99-9978-4722-8945-bab63d4a4973.png',
    alt: 'Precision Maintenance - Engine Oil Service',
    href: '/services/car-service-dubai',
  },
];

export const WhatWeDo = () => {
  const { isArabic } = useLocale();
  const copy = isArabic ? arHome.expertise : null;

  return (
    <section className="home-section">
      <div className="home-container">
        <Reveal className="mb-14 grid gap-5 lg:mb-20 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="home-kicker mb-4">{copy?.eyebrow ?? 'Our expertise'}</p>
            <h2 className="home-heading">{copy?.title ?? 'Care for every part of the vehicle.'}</h2>
          </div>
          <p className="home-lead lg:justify-self-end">
            {copy?.description ?? 'Digi-Tec provides maintenance, diagnostics, mechanical and electrical repair, body work and vehicle-specific performance projects from its Al Quoz workshop.'}
          </p>
        </Reveal>

        <Reveal>
          <Link to={capabilities[0].href} className="group grid overflow-hidden rounded-xl bg-[#171819] lg:grid-cols-[1.35fr_0.65fr]">
            <div className="aspect-[16/10] overflow-hidden lg:aspect-[16/9]">
              <img src={capabilities[0].image} alt={capabilities[0].alt} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
            </div>
            <div className="flex flex-col justify-between p-6 sm:p-9 lg:p-12">
              <span className="text-xs text-white/35">01</span>
              <div className="mt-16 lg:mt-0">
                <h3 className="text-2xl font-semibold tracking-[-0.025em] text-white sm:text-3xl">{copy?.cards[0].title ?? capabilities[0].title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/50">{copy?.cards[0].text ?? capabilities[0].text}</p>
                <span className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-white transition-colors group-hover:text-burnt-orange">Explore <ArrowRight className="h-4 w-4" /></span>
              </div>
            </div>
          </Link>
        </Reveal>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {capabilities.slice(1).map((item, itemIndex) => {
            const copyIndex = itemIndex + 1;
            return (
              <Reveal key={item.title} delay={itemIndex * 0.08}>
                <Link to={item.href} className="group block">
                  <div className="aspect-[16/10] overflow-hidden rounded-xl bg-[#171819]">
                    <img src={item.image} alt={item.alt} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
                  </div>
                  <div className="grid grid-cols-[2rem_1fr] gap-4 border-b border-white/[0.08] py-6">
                    <span className="pt-1 text-xs text-white/30">0{copyIndex + 1}</span>
                    <div>
                      <h3 className="text-xl font-semibold tracking-[-0.02em] text-white sm:text-2xl">{copy?.cards[copyIndex].title ?? item.title}</h3>
                      <p className="mt-3 max-w-xl text-sm leading-6 text-white/45">{copy?.cards[copyIndex].text ?? item.text}</p>
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
