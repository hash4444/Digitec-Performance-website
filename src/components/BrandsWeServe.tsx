import React from 'react';
import { LocalizedLink as Link } from '@/components/LocalizedLink';
import { brands } from '@/data/brands';
import { useLocale } from '@/i18n/use-locale';
import { arHome } from '@/i18n/ar-home';

const BrandLogo = ({ name, logo }: { name: string; logo: string }) => (
  <img
    src={logo}
    alt={`${name} logo`}
    className="h-full w-full object-contain"
    loading="lazy"
    draggable={false}
  />
);

const BrandTrack = ({ direction = 'left' }: { direction?: 'left' | 'right' }) => {
  // Two identical sets create a continuous, seamless loop while every logo remains a real internal link.
  const loopedBrands = [...brands, ...brands];

  return (
    <div className="brand-marquee overflow-hidden py-3" aria-label="Car brands serviced by Digi-Tec">
      <div className={`brand-marquee-track ${direction === 'right' ? 'brand-marquee-right' : ''}`}>
        {loopedBrands.map((brand, index) => (
          <Link
            key={`${brand.slug}-${index}`}
            to={`/brands/${brand.slug}`}
            className="brand-marquee-item group"
            aria-label={`${brand.name} service and repair in Dubai`}
          >
            <span className="brand-marquee-logo">
              <BrandLogo name={brand.name} logo={brand.logo} />
            </span>
            <span className="brand-marquee-name">{brand.name}</span>
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
    <section className="relative overflow-hidden bg-[#0a0a0a] py-14 sm:py-20 lg:py-24">
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
        .brand-marquee::before { left: 0; background: linear-gradient(90deg, #0a0a0a, transparent); }
        .brand-marquee::after { right: 0; background: linear-gradient(270deg, #0a0a0a, transparent); }
        .brand-marquee-track {
          display: flex;
          width: max-content;
          align-items: center;
          gap: 1rem;
          animation: brand-marquee-scroll 96s linear infinite;
          will-change: transform;
        }
        .brand-marquee-right { animation-direction: reverse; animation-duration: 104s; }
        .brand-marquee:hover .brand-marquee-track,
        .brand-marquee:focus-within .brand-marquee-track { animation-play-state: paused; }
        .brand-marquee-item {
          display: flex;
          min-width: 8.75rem;
          align-items: center;
          gap: 0.7rem;
          padding: 0.7rem 0.85rem;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 9999px;
          background: linear-gradient(135deg, rgba(255,255,255,0.07), rgba(255,255,255,0.025));
          transition: border-color 180ms ease, background 180ms ease, transform 180ms ease;
        }
        .brand-marquee-item:hover,
        .brand-marquee-item:focus-visible {
          transform: translateY(-2px);
          border-color: rgba(255,107,53,0.75);
          background: rgba(255,107,53,0.1);
          outline: none;
        }
        .brand-marquee-logo {
          display: flex;
          width: 2.75rem;
          height: 2.75rem;
          flex: none;
          align-items: center;
          justify-content: center;
          padding: 0.3rem;
          border-radius: 9999px;
          background: rgba(255,255,255,0.94);
        }
        .brand-marquee-name {
          max-width: 8rem;
          overflow: hidden;
          color: #f8f8f8;
          font-size: 0.78rem;
          font-weight: 700;
          line-height: 1.1;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        @media (prefers-reduced-motion: reduce) {
          .brand-marquee { overflow-x: auto; }
          .brand-marquee-track { animation: none; }
        }
      `}</style>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(950px_360px_at_50%_45%,rgba(255,107,53,0.08),transparent_65%)]" />

      <div className="relative z-10 mx-auto mb-6 max-w-6xl px-4 text-center sm:mb-9 sm:px-6">
        <span className="eyebrow mb-3 sm:mb-5">{copy?.eyebrow ?? 'Marque Specialists'}</span>
        <h2 className="mb-3 text-3xl font-black tracking-tight text-white sm:mb-5 sm:text-4xl lg:text-6xl">
          {copy?.title ?? 'Brands We Serve'}
        </h2>
        <p className="mx-auto max-w-3xl text-sm leading-relaxed text-gray-400 sm:text-base lg:text-xl">
          {copy?.description ?? "Precision service for the world's most prestigious automotive marques."}
        </p>
      </div>

      <div className="relative z-10 space-y-2" dir={isArabic ? 'rtl' : 'ltr'}>
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
