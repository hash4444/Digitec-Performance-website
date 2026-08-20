import React from 'react';
import { CtaAssurance } from '@/components/TrustBar';
import { Reveal } from '@/components/motion/Reveal';
import { useLocale } from '@/i18n/use-locale';
import { arHome } from '@/i18n/ar-home';

export const FinalCTA = () => {
  const { isArabic } = useLocale();
  const copy = isArabic ? arHome.cta : null;
  return (
    <section className="py-10 sm:py-20 lg:py-32 bg-gradient-to-br from-charcoal via-black to-charcoal relative overflow-hidden">
      {/* Ambient effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-burnt-orange/5 via-transparent to-burnt-orange/5"></div>
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-48 h-48 sm:w-96 sm:h-96 bg-burnt-orange/10 rounded-full blur-3xl"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center relative z-10">
        <Reveal>
          <span className="eyebrow mb-3 sm:mb-6">{copy?.eyebrow ?? 'Get Started'}</span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-3 sm:mb-6 leading-tight">
            {copy ? copy.title : <>Tell Us About Your<br /><span className="text-burnt-orange">V</span>ehicle</>}
          </h2>

          <p className="text-sm sm:text-xl lg:text-2xl text-gray-300 mb-5 sm:mb-10 max-w-4xl mx-auto leading-snug sm:leading-relaxed px-4">
            {copy?.description ?? <>Share the make, model, year and the service or symptoms you want checked. The Digi-Tec team can help arrange the appropriate workshop visit.</>}
          </p>
        </Reveal>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 justify-center items-center mb-4 sm:mb-5">
          <a
            href={`https://wa.me/97143402223?text=${encodeURIComponent("Hi, I'd like to schedule a consultation at Digi-Tec Performance Center.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full sm:w-auto"
          >
            {copy?.schedule ?? 'Request an Appointment'}
          </a>

          <a href="tel:+97143402223" className="btn-secondary w-full sm:w-auto">
            {copy?.call ?? 'Call +971 4 340 2223'}
          </a>
        </div>

        <CtaAssurance className="mb-8 sm:mb-14" text={isArabic ? arHome.hero.assurance : undefined} />
        
        <div className="grid grid-cols-3 gap-2 sm:gap-8 text-center">
          <Reveal className="card-premium rounded-2xl p-3 sm:p-8" delay={0}>
            <div className="text-xs sm:text-2xl font-bold text-burnt-orange mb-1 sm:mb-4 leading-tight">{copy?.cards[0].title ?? 'Share the Details'}</div>
            <div className="text-gray-300 text-[11px] sm:text-lg leading-snug">{copy?.cards[0].text ?? 'Make, model, year and current concern'}</div>
          </Reveal>
          <Reveal className="card-premium rounded-2xl p-3 sm:p-8" delay={0.1}>
            <div className="text-xs sm:text-2xl font-bold text-burnt-orange mb-1 sm:mb-4 leading-tight">{copy?.cards[1].title ?? 'Arrange the Visit'}</div>
            <div className="text-gray-300 text-[11px] sm:text-lg leading-snug">{copy?.cards[1].text ?? 'Choose the appropriate workshop inspection or service'}</div>
          </Reveal>
          <Reveal className="card-premium rounded-2xl p-3 sm:p-8" delay={0.2}>
            <div className="text-xs sm:text-2xl font-bold text-burnt-orange mb-1 sm:mb-4 leading-tight">{copy?.cards[2].title ?? 'Review the Scope'}</div>
            <div className="text-gray-300 text-[11px] sm:text-lg leading-snug">{copy?.cards[2].text ?? 'Discuss findings and proposed work before approval'}</div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
