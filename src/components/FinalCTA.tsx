import React from 'react';
import { CtaAssurance } from '@/components/TrustBar';
import { Reveal } from '@/components/motion/Reveal';

export const FinalCTA = () => {
  return (
    <section className="py-10 sm:py-20 lg:py-32 bg-gradient-to-br from-charcoal via-black to-charcoal relative overflow-hidden">
      {/* Ambient effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-burnt-orange/5 via-transparent to-burnt-orange/5"></div>
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-48 h-48 sm:w-96 sm:h-96 bg-burnt-orange/10 rounded-full blur-3xl"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center relative z-10">
        <Reveal>
          <span className="eyebrow mb-3 sm:mb-6">Get Started</span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-3 sm:mb-6 leading-tight">
            Ready to Transform Your
            <br />
            <span className="text-burnt-orange">D</span>ream Machine?
          </h2>

          <p className="text-sm sm:text-xl lg:text-2xl text-gray-300 mb-5 sm:mb-10 max-w-4xl mx-auto leading-snug sm:leading-relaxed px-4">
            Join the elite circle of Dubai's most discerning automotive enthusiasts.
            Experience the pinnacle of luxury performance tuning at <span className="text-burnt-orange">D</span>IGI-TEC Performance Center.
          </p>
        </Reveal>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 justify-center items-center mb-4 sm:mb-5">
          <a
            href={`https://wa.me/97143402223?text=${encodeURIComponent("Hi, I'd like to schedule a consultation at Digi-Tec Performance Center.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full sm:w-auto"
          >
            Schedule Your Consultation
          </a>

          <a href="tel:+97143402223" className="btn-secondary w-full sm:w-auto">
            Call +971 4 340 2223
          </a>
        </div>

        <CtaAssurance className="mb-8 sm:mb-14" />
        
        <div className="grid grid-cols-3 gap-2 sm:gap-8 text-center">
          <Reveal className="card-premium rounded-2xl p-3 sm:p-8" delay={0}>
            <div className="text-xs sm:text-2xl font-bold text-burnt-orange mb-1 sm:mb-4 leading-tight">Free Consultation</div>
            <div className="text-gray-300 text-[11px] sm:text-lg leading-snug">Complimentary performance assessment</div>
          </Reveal>
          <Reveal className="card-premium rounded-2xl p-3 sm:p-8" delay={0.1}>
            <div className="text-xs sm:text-2xl font-bold text-burnt-orange mb-1 sm:mb-4 leading-tight">Expert Advice</div>
            <div className="text-gray-300 text-[11px] sm:text-lg leading-snug">Personalized tuning recommendations</div>
          </Reveal>
          <Reveal className="card-premium rounded-2xl p-3 sm:p-8" delay={0.2}>
            <div className="text-xs sm:text-2xl font-bold text-burnt-orange mb-1 sm:mb-4 leading-tight">Premium Service</div>
            <div className="text-gray-300 text-[11px] sm:text-lg leading-snug">White-glove treatment guaranteed</div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
