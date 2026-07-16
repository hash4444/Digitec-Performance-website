import React from 'react';
import { Reveal } from '@/components/motion/Reveal';
import { useLocale } from '@/i18n/use-locale';
import { arHome } from '@/i18n/ar-home';
import mercedesAmgEngineImg from '@/assets/mercedes-amg-engine-repair-dubai.jpg';

export const WhatWeDo = () => {
  const { isArabic } = useLocale();
  const copy = isArabic ? arHome.expertise : null;
  return (
    <section className="py-10 sm:py-20 lg:py-32 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal className="text-center mb-8 sm:mb-14 lg:mb-20">
          <span className="eyebrow mb-3 sm:mb-5">{copy?.eyebrow ?? 'Our Expertise'}</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-black mb-3 sm:mb-5 text-white">
            {copy ? copy.title : <>What We <span className="text-burnt-orange">D</span>o</>}
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-300 max-w-4xl mx-auto leading-snug sm:leading-relaxed px-4">
            {copy?.description ?? <>We transform luxury vehicles into bespoke performance machines through precision engineering,
            advanced diagnostics, and world-class craftsmanship. Every modification is tailored to exceed
            your expectations while maintaining the integrity of your investment.</>}
          </p>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-10">
          <Reveal className="text-center group" delay={0}>
            <div className="mb-3 sm:mb-8 overflow-hidden rounded-2xl ring-1 ring-white/10 group-hover:ring-burnt-orange/40 shadow-[0_24px_48px_-28px_rgba(0,0,0,0.8)] transition-all duration-500">
              <img 
                src={mercedesAmgEngineImg}
                alt="Mercedes-AMG engine prepared for performance tuning at DIGI-TEC Dubai"
                className="w-full h-32 sm:h-56 lg:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <h3 className="text-base sm:text-2xl font-bold mb-2 sm:mb-4 text-white">{copy?.cards[0].title ?? 'Performance Tuning'}</h3>
            <p className="text-xs sm:text-base text-gray-300 leading-snug sm:leading-relaxed px-2">
              {copy?.cards[0].text ?? "ECU remapping, turbo upgrades, and exhaust system optimization to unlock your vehicle's true potential."}
            </p>
          </Reveal>

          <Reveal className="text-center group" delay={0.12}>
            <div className="mb-3 sm:mb-8 overflow-hidden rounded-2xl ring-1 ring-white/10 group-hover:ring-burnt-orange/40 shadow-[0_24px_48px_-28px_rgba(0,0,0,0.8)] transition-all duration-500">
              <img
                src="/lovable-uploads/brabus-g-class.png"
                alt="Aesthetic Enhancement - Brabus G-Class"
                className="w-full h-32 sm:h-56 lg:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <h3 className="text-base sm:text-2xl font-bold mb-2 sm:mb-4 text-white">{copy?.cards[1].title ?? 'Aesthetic Enhancement'}</h3>
            <p className="text-xs sm:text-base text-gray-300 leading-snug sm:leading-relaxed px-2">
              {copy?.cards[1].text ?? 'Custom body kits, carbon fiber components, and premium wheel upgrades for the ultimate visual impact.'}
            </p>
          </Reveal>

          <Reveal className="text-center group col-span-2 md:col-span-1" delay={0.24}>
            <div className="mb-3 sm:mb-8 overflow-hidden rounded-2xl ring-1 ring-white/10 group-hover:ring-burnt-orange/40 shadow-[0_24px_48px_-28px_rgba(0,0,0,0.8)] transition-all duration-500">
              <img
                src="/lovable-uploads/02e53b99-9978-4722-8945-bab63d4a4973.png"
                alt="Precision Maintenance - Engine Oil Service"
                className="w-full h-32 sm:h-56 lg:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <h3 className="text-base sm:text-2xl font-bold mb-2 sm:mb-4 text-white">{copy?.cards[2].title ?? 'Precision Maintenance'}</h3>
            <p className="text-xs sm:text-base text-gray-300 leading-snug sm:leading-relaxed px-2">
              {copy?.cards[2].text ?? 'Comprehensive diagnostic services and preventive maintenance to keep your luxury vehicle in pristine condition.'}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
