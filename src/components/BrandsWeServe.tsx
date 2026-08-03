import React from 'react';
import { LocalizedLink as Link } from '@/components/LocalizedLink';
import { brands } from '@/data/brands';
import { useLocale } from '@/i18n/use-locale';
import { arHome } from '@/i18n/ar-home';

// Flat single-colour marks that ship as dark artwork: render them as clean white
// silhouettes so they read on the dark canvas at the same weight as the rest.
const DARK_MARKS = new Set(['Bentley', 'McLaren', 'Aston Martin', 'Rolls-Royce', 'Defender']);

const BrandLogo = ({ name, logo }: { name: string; logo: string }) => (
  <img
    src={logo}
    alt={`${name} logo`}
    className={`max-h-full max-w-full object-contain ${DARK_MARKS.has(name) ? 'brightness-0 invert' : ''}`}
    loading="lazy"
    draggable={false}
  />
);

const BrandTrack = ({ direction = 'left' }: { direction?: 'left' | 'right' }) => {
  // Two identical sets create a continuous, seamless loop while every logo remains a real internal link.
  const loopedBrands = [...brands, ...brands];

  return (
    <div className="brand-marquee overflow-hidden py-1.5 sm:py-2" aria-label="Car brands serviced by Digi-Tec">
      <div className={`brand-marquee-track ${direction === 'right' ? 'brand-marquee-right' : ''}`}>
        {loopedBrands.map((brand, index) => (
          <Link
            key={`${brand.slug}-${index}`}
            to={`/brands/${brand.slug}`}
            className="brand-marquee-item group"
            aria-label={`${brand.name} service and repair in Dubai`}
          >
            <span className="brand-marquee-logo" aria-hidden="true">
              <BrandLogo name={brand.name} logo={brand.logo} />
            </span>
            <span className="sr-only">{brand.name} service and repair in Dubai</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export const BrandsWeServe = () => {
  const { isArabic } = useLocale();
  const copy = isArabic ? arHome.brands : null;

  return (
    <section id="brands" className="relative overflow-hidden bg-[#101113] py-12 sm:py-16 lg:py-20">
      <style>{`
        @keyframes brand-marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .brand-marquee::before,
        .brand-marquee::after {
          content: '';
          position: absolute;
          z-index: 2;
          top: 0;
          bottom: 0;
          width: clamp(2rem, 8vw, 9rem);
          pointer-events: none;
        }
        .brand-marquee::before { left: 0; background: linear-gradient(90deg, #101113 12%, transparent); }
        .brand-marquee::after { right: 0; background: linear-gradient(270deg, #101113 12%, transparent); }
        .brand-marquee-track {
          display: flex;
          width: max-content;
          align-items: center;
          gap: clamp(1.75rem, 4vw, 4.5rem);
          animation: brand-marquee-scroll 88s linear infinite;
          will-change: transform;
        }
        .brand-marquee-right { animation-direction: reverse; animation-duration: 96s; }
        .brand-marquee:hover .brand-marquee-track,
        .brand-marquee:focus-within .brand-marquee-track { animation-play-state: paused; }
        .brand-marquee-item {
          display: flex;
          align-items: center;
          justify-content: center;
          width: clamp(5.5rem, 9vw, 7.5rem);
          height: clamp(3rem, 4.5vw, 3.75rem);
          flex: none;
          padding: 0;
          box-sizing: border-box;
          transition: transform 220ms ease, opacity 220ms ease;
          opacity: 0.92;
        }
        .brand-marquee-item:hover,
        .brand-marquee-item:focus-visible {
          transform: translateY(-2px);
          opacity: 1;
        }
        .brand-marquee-item:focus-visible { outline: 1px solid rgba(255,255,255,0.35); outline-offset: 6px; }
        .brand-marquee-logo {
          position: relative;
          display: flex;
          width: 100%;
          height: 100%;
          align-items: center;
          justify-content: center;
        }
        .brand-marquee-logo > img {
          max-height: 100%;
          max-width: 100%;
          object-fit: contain;
        }
        @media (max-width: 640px) {
          .brand-marquee::before,
          .brand-marquee::after { width: 2rem; }
          .brand-marquee-track { gap: 1.65rem; animation-duration: 72s; }
          .brand-marquee-right { animation-duration: 80s; }
        }
        @media (prefers-reduced-motion: reduce) {
          .brand-marquee { overflow-x: auto; }
          .brand-marquee-track { animation: none; }
        }
      `}</style>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(950px_360px_at_50%_45%,rgba(255,107,53,0.08),transparent_65%)]" />

      <div className="relative z-10 mx-auto mb-7 max-w-6xl px-4 text-center sm:mb-10 sm:px-6">
        <span className="eyebrow mb-3 sm:mb-5">{copy?.eyebrow ?? 'Marque Specialists'}</span>
        <h2 className="mb-3 text-[2rem] font-black tracking-tight text-white sm:mb-5 sm:text-4xl lg:text-6xl">
          {copy?.title ?? 'Brands We Serve'}
        </h2>
        <p className="mx-auto max-w-3xl text-sm leading-relaxed text-gray-400 sm:text-base lg:text-xl">
          {copy?.description ?? "Precision service for the world's most prestigious automotive marques."}
        </p>
      </div>

      <div className="relative z-10 space-y-3 sm:space-y-5" dir={isArabic ? 'rtl' : 'ltr'}>
        <BrandTrack />
        <BrandTrack direction="right" />
      </div>

      <div className="relative z-10 mt-8 px-4 text-center sm:mt-11">
        <p className="mb-5 text-sm text-gray-400 sm:text-base">
          {copy?.note ?? 'Choose your marque to explore specialist service, repair and diagnostics in Dubai.'}
        </p>
        <Link to="/brands" className="btn-primary w-full sm:w-auto">
          {copy?.view ?? 'Explore All Brands'}
        </Link>
      </div>
    </section>
  );
};
