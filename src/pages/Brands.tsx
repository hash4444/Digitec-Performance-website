import React from 'react';
import { LocalizedLink as Link } from '@/components/LocalizedLink';
import Header from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useSeo } from '@/hooks/use-seo';
import { brands } from '@/data/brands';
import { buildBreadcrumb, buildWebPage, pageGraph } from '@/lib/schema';
import { useLocale } from '@/i18n/use-locale';

const Brands = () => {
  const { isArabic } = useLocale();
  const url = `https://digitecme.com${isArabic ? '/ar' : ''}/brands`;
  const jsonLd = React.useMemo(
    () => pageGraph([
      buildWebPage({
        url,
        name: isArabic ? 'علامات السيارات التي نخدمها | ديجي-تك دبي' : 'Luxury Car Brands We Service | DIGI-TEC Dubai',
        description: isArabic ? 'استكشف علامات السيارات الفاخرة وعالية الأداء التي نخدمها لدى مركز ديجي-تك في القوز، دبي.' : 'Explore the luxury and performance car brands serviced at DIGI-TEC Performance Center in Al Quoz, Dubai.',
        type: 'CollectionPage',
        breadcrumbId: `${url}#breadcrumb`,
      }),
      buildBreadcrumb(url, [
        { name: isArabic ? 'الرئيسية' : 'Home', url: `https://digitecme.com${isArabic ? '/ar' : '/'}` },
        { name: isArabic ? 'العلامات' : 'Brands', url },
      ]),
      {
        '@type': 'ItemList',
        '@id': `${url}#brandlist`,
        name: isArabic ? 'علامات السيارات التي يخدمها مركز ديجي-تك' : 'Car brands serviced by DIGI-TEC Performance Center',
        numberOfItems: brands.length,
        itemListElement: brands.map((brand, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: isArabic ? `خدمة ${brand.name} في دبي` : `${brand.name} Service Dubai`,
          url: `https://digitecme.com${isArabic ? '/ar' : ''}/brands/${brand.slug}`,
        })),
      },
    ]),
    [isArabic, url],
  );

  useSeo({
    title: isArabic ? 'علامات السيارات التي نخدمها | ديجي-تك دبي' : 'Luxury Car Brands We Service | DIGI-TEC Dubai',
    description: isArabic ? 'استكشف علامات السيارات الفاخرة وعالية الأداء التي نخدمها لدى مركز ديجي-تك في القوز، دبي.' : 'Explore the luxury and performance car brands serviced at DIGI-TEC Performance Center in Al Quoz, Dubai.',
    canonical: url,
    jsonLd,
  });

  return (
    <div className="min-h-screen bg-black text-off-white">
      <Header />
      <section className="relative overflow-hidden py-12 sm:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-burnt-orange/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-6xl px-4 text-center sm:px-6">
          <span className="eyebrow mb-2 block sm:mb-4">{isArabic ? 'العلامات التي نخدمها' : 'Brands We Serve'}</span>
          <h1 className="mb-3 text-3xl font-black sm:text-5xl md:text-6xl">{isArabic ? 'علامات السيارات الفاخرة وعالية الأداء' : 'Luxury & Performance Car Brands'}</h1>
          <p className="mx-auto max-w-3xl text-sm leading-relaxed text-gray-400 sm:text-lg">
            {isArabic ? 'اختر علامة سيارتك للاطلاع على صفحة ديجي-تك المتخصصة وخدمات الورشة المتاحة لها في دبي.' : 'Choose your vehicle brand to explore its dedicated DIGI-TEC page and specialist workshop capability in Dubai.'}
          </p>
        </div>
      </section>

      <section className="pb-16 sm:pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {brands.map((brand) => (
              <Link
                key={brand.slug}
                to={`/brands/${brand.slug}`}
                className="card-premium group flex items-center gap-3 rounded-2xl p-3 transition-all duration-300 sm:gap-4 sm:p-4"
                aria-label={isArabic ? `صيانة وإصلاح ${brand.name} في دبي` : `${brand.name} service and repair in Dubai`}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/90 p-1.5 sm:h-14 sm:w-14">
                  {brand.logo ? (
                    <img
                      src={brand.name === 'ROX' ? '/brand-logos/rox-card.png' : brand.logo}
                      alt={isArabic ? `شعار ${brand.name}` : `${brand.name} logo`}
                      className="h-full w-full object-contain"
                      loading="lazy"
                    />
                  ) : (
                    <span className="text-lg font-black text-burnt-orange">{brand.name.charAt(0)}</span>
                  )}
                </div>
                <div className="min-w-0">
                  <h2 className="truncate text-sm font-bold leading-tight transition-colors group-hover:text-burnt-orange sm:text-base">{brand.name}</h2>
                  <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-gray-400 sm:text-xs">{isArabic ? 'صيانة • إصلاح • تشخيص • أداء' : brand.specialization}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Brands;
