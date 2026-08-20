import { LocalizedLink as Link } from '@/components/LocalizedLink';
import { brands } from '@/data/brands';
import { useLocale } from '@/i18n/use-locale';
import { arHome } from '@/i18n/ar-home';

// These legacy marks are supplied as dark monochrome artwork. The normalized
// colour logos stay untouched; only these otherwise-invisible marks are lifted.
const LIGHTEN_ON_DARK = new Set(['Hummer', 'Lincoln', 'Maserati', 'Nissan']);

const BrandLogo = ({ name, logo }: { name: string; logo: string }) => (
  <img
    src={logo}
    alt={`${name} logo`}
    className={`brand-logo-image ${LIGHTEN_ON_DARK.has(name) ? 'brand-logo-monochrome' : ''}`}
    loading="lazy"
    decoding="async"
    draggable={false}
  />
);

const BrandTrack = ({ direction = 'left' }: { direction?: 'left' | 'right' }) => {
  // Two identical sets create a continuous, seamless loop while every logo remains a real internal link.
  const loopedBrands = [...brands, ...brands];

  return (
    <div className="brand-marquee overflow-hidden py-2 sm:py-3" aria-label="Car brands serviced by Digi-Tec">
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
