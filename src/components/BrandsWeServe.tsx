import { ArrowRight } from 'lucide-react';
import { LocalizedLink as Link } from '@/components/LocalizedLink';
import { brands } from '@/data/brands';
import { Reveal } from '@/components/motion/Reveal';
import { useLocale } from '@/i18n/use-locale';
import { arHome } from '@/i18n/ar-home';

const LIGHTEN_ON_DARK = new Set(['Hummer', 'Lincoln', 'Maserati', 'Nissan']);

export const BrandsWeServe = () => {
  const { isArabic } = useLocale();
  const copy = isArabic ? arHome.brands : null;

  return (
    <section id="brands" className="border-y border-white/[0.08] bg-[#0c0d0e] py-20 sm:py-24">
      <div className="home-container">
        <Reveal className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="home-kicker mb-4">{copy?.eyebrow ?? 'Marque specialists'}</p>
            <h2 className="home-heading">{copy?.title ?? 'Brands we serve'}</h2>
          </div>
          <div className="lg:justify-self-end">
            <p className="home-lead">{copy?.description ?? "Precision service for the world's most prestigious automotive marques."}</p>
            <Link to="/brands" className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-white transition-colors hover:text-burnt-orange">
              {copy?.view ?? 'Explore all brands'} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>

        <div className="horizontal-scroll-container -mx-5 mt-14 overflow-x-auto px-5 pb-3 sm:-mx-8 sm:px-8 lg:-mx-12 lg:mt-20 lg:px-12" aria-label="Car brands serviced by Digi-Tec">
          <div className="flex w-max items-center divide-x divide-white/[0.08] border-y border-white/[0.08]">
            {brands.map((brand) => (
              <Link
                key={brand.slug}
                to={`/brands/${brand.slug}`}
                className="group flex h-28 w-44 items-center justify-center px-7 transition-colors hover:bg-white/[0.025]"
                aria-label={`${brand.name} service and repair in Dubai`}
              >
                <img
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  className={`brand-logo-image opacity-65 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0 ${LIGHTEN_ON_DARK.has(brand.name) ? 'brand-logo-monochrome' : ''}`}
                  loading="lazy"
                  decoding="async"
                />
              </Link>
            ))}
          </div>
        </div>
        <p className="mt-5 text-xs text-white/35">{copy?.note ?? 'Choose your marque to explore specialist service, repair and diagnostics in Dubai.'}</p>
      </div>
    </section>
  );
};
