import React from 'react';
import { ArrowRight } from 'lucide-react';
import { LocalizedLink as Link } from '@/components/LocalizedLink';
import { useLocale } from '@/i18n/use-locale';
import { arHome } from '@/i18n/ar-home';

export const Hero = () => {
  const { isArabic } = useLocale();
  const copy = isArabic ? arHome.hero : null;

  return (
    <section className="theme-dark-section relative flex min-h-[100svh] items-center overflow-hidden border-b border-white/[0.08]">
      <div
        className="absolute inset-0 bg-cover bg-[62%_center] bg-no-repeat sm:bg-center"
        style={{ backgroundImage: "url('/images/hero-bg.png')" }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,11,12,0.94)_0%,rgba(10,11,12,0.78)_42%,rgba(10,11,12,0.25)_76%,rgba(10,11,12,0.38)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#101113]/80 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-[90rem] px-5 pb-16 pt-36 sm:px-8 sm:pb-20 lg:px-12">
        <div className="max-w-[46rem]">
          <p className="home-kicker mb-6">{copy?.eyebrow ?? 'Established in 2002 · Al Quoz, Dubai'}</p>
          <h1 className="text-[clamp(3rem,6.2vw,6.25rem)] font-semibold leading-[0.96] tracking-[-0.055em] text-white">
            <span className="block"><span className="text-burnt-orange">D</span>IGI-TEC</span>
            <span className="block text-[0.78em] sm:text-[0.72em]">{copy?.titleLine ?? 'Performance Center'}</span>
          </h1>
          <h2 className="mt-7 max-w-xl text-xl font-medium tracking-[-0.025em] text-white/90 sm:text-2xl">
            {copy?.subtitle ?? 'Where Performance Meets Precision.'}
          </h2>
          <p className="mt-4 max-w-xl text-[0.95rem] leading-7 text-white/60 sm:text-base">
            {copy?.description ?? 'Independent vehicle maintenance, diagnostics, repair, body work and performance-project support from Digi-Tec Performance Center in Al Quoz Industrial Area 3.'}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={`https://wa.me/97143402223?text=${encodeURIComponent("Hi, I'd like to book an appointment at Digi-Tec Performance Center.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="home-button home-button-primary"
            >
              {copy?.book ?? 'Book Appointment'} <ArrowRight className="h-4 w-4" />
            </a>
            <Link to="/services" className="home-button home-button-secondary">
              {isArabic ? 'استكشف خدماتنا' : 'Explore Services'}
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-7 right-8 z-10 hidden items-center gap-3 text-xs text-white/45 lg:flex">
        <span>European & luxury vehicle workshop</span>
        <span className="h-px w-10 bg-white/25" aria-hidden="true" />
      </div>
    </section>
  );
};
