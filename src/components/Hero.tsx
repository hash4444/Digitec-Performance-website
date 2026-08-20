
import React from 'react';
import { ArrowDown } from 'lucide-react';
import { CtaAssurance } from '@/components/TrustBar';
import { useLocale } from '@/i18n/use-locale';
import { arHome } from '@/i18n/ar-home';

export const Hero = () => {
  const { isArabic } = useLocale();
  const copy = isArabic ? arHome.hero : null;
  return (
    <section className="relative min-h-[88vh] sm:min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-bg.png')" }}
      />
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/70"></div>
      {/* Ambient lighting effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-burnt-orange/5 via-transparent to-burnt-orange/5"></div>
      <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-burnt-orange/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-40 h-40 sm:w-80 sm:h-80 bg-chocolate/10 rounded-full blur-3xl"></div>
      {/* Seamless fade into the next section */}
      <div className="absolute bottom-0 inset-x-0 h-24 sm:h-40 bg-gradient-to-b from-transparent to-[#101113]"></div>

      <div className="relative z-10 text-center max-w-6xl mx-auto">
        <span className="eyebrow mb-4 sm:mb-8">{copy?.eyebrow ?? 'Established in 2002 · Al Quoz, Dubai'}</span>

        <h1 className="text-[2rem] sm:text-5xl md:text-6xl lg:text-8xl font-black mb-3 sm:mb-8 leading-tight">
          <span className="text-burnt-orange">D</span>IGI-TEC
          <br />
          {copy?.titleLine ?? 'Performance Center'}
        </h1>

        <h2 className="text-base sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-6 text-burnt-orange tracking-tight">
          {copy?.subtitle ?? 'Where Performance Meets Precision.'}
        </h2>

        <p className="text-sm sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-12 max-w-3xl mx-auto leading-snug sm:leading-relaxed px-4">
          {copy?.description ?? 'Independent vehicle maintenance, diagnostics, repair, body work and performance-project support from Digi-Tec Performance Center in Al Quoz Industrial Area 3.'}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 justify-center items-center px-4">
          <a
            href={`https://wa.me/97143402223?text=${encodeURIComponent("Hi, I'd like to book an appointment at Digi-Tec Performance Center.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full sm:w-auto"
          >
            {copy?.book ?? 'Book Appointment'}
          </a>

          <a
            href={`https://wa.me/97143402223?text=${encodeURIComponent("Hi, I'd like to discuss an inspection for my vehicle.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary w-full sm:w-auto"
          >
            {copy?.diagnosis ?? 'Discuss an Inspection'}
          </a>
        </div>

        <CtaAssurance className="mt-4 sm:mt-5" text={copy?.assurance} />

        <div className="mt-8 sm:mt-16 animate-bounce">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm flex items-center justify-center mx-auto">
            <ArrowDown className="text-burnt-orange" size={18} />
          </div>
        </div>
      </div>
    </section>
  );
};
