import React from 'react';
import { Link } from 'react-router-dom';
import { useSeo } from '@/hooks/use-seo';
import Header from '@/components/Header';
import { Footer } from '@/components/Footer';
import { TrustBar } from '@/components/TrustBar';
import { FinalCTA } from '@/components/FinalCTA';

import { services } from '@/data/services';
import { buildBreadcrumb, buildWebPage, pageGraph } from '@/lib/schema';
import { brands } from '@/data/brands';

const brandLogoMap: Record<string, string> = {
  'Mercedes-Benz': '/lovable-uploads/a6f453f2-f2c5-4140-8f2a-bfa3401611d7.png',
  'Maybach': '/lovable-uploads/5cc5b8af-7dd9-46a9-9ee2-3e5b14fda559.png',
  'Porsche': '/lovable-uploads/8e7e2545-680e-42ac-bd97-ba1f9c063649.png',
  'Audi': '/lovable-uploads/a3e92dde-70a9-499b-a7b0-ae0df117baf9.png',
  'BMW': '/lovable-uploads/d66ea83e-7d6a-4c19-bf30-f27eca93ac8e.png',
  'Lamborghini': '/lovable-uploads/8c4046ee-9977-417a-90a9-820452146832.png',
  'Bentley': '/lovable-uploads/b2cd5f78-8a43-4a9b-8a0a-19124642ca5a.png',
  'McLaren': '/lovable-uploads/7f8d98f4-3581-451c-bfaf-262eb67cf14b.png',
  'Ferrari': '/lovable-uploads/11f29482-f2d3-4278-ae2a-397044a1ff95.png',
  'Bugatti': '/lovable-uploads/69bd2660-e800-47b4-bc4d-de6e6b65b984.png',
  'Range Rover': '/lovable-uploads/4bb58917-704a-4c5d-84b6-dc428a00c004.png',
  'Rolls-Royce': '/lovable-uploads/a4c040e8-740a-4fcb-b837-b86e15c25306.png',
  'Aston Martin': '/lovable-uploads/8d3bad14-09df-4ef1-86c6-13cfcba7042b.png',
};

const categories = [
  'Core Mechanical Services',
  'Diagnostics & Electrical',
  'Comfort Systems',
  'Body & Visual Work',
];

const Services = () => {
  const url = 'https://digitecme.com/services';
  const servicesGraph = React.useMemo(
    () =>
      pageGraph([
        buildWebPage({
          url,
          name: 'All Services | DIGI-TEC Performance Center Dubai',
          description:
            'Full catalog of automotive services in Dubai — mechanical repair, diagnostics, body work, and paint protection at DIGI-TEC Performance Center.',
          type: 'CollectionPage',
          breadcrumbId: `${url}#breadcrumb`,
        }),
        buildBreadcrumb(url, [
          { name: 'Home', url: 'https://digitecme.com/' },
          { name: 'Services', url },
        ]),
        {
          '@type': 'ItemList',
          '@id': `${url}#servicelist`,
          name: 'Services offered by Digitec Performance Center',
          numberOfItems: services.length,
          itemListElement: services.map((s, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            url: `https://digitecme.com/services/${s.slug}`,
            name: s.title,
          })),
        },
        {
          '@type': 'ItemList',
          '@id': `${url}#brandlist`,
          name: 'Car brands serviced by Digitec Performance Center',
          numberOfItems: brands.length,
          itemListElement: brands.map((b, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            url: `https://digitecme.com/brands/${b.slug}`,
            name: `${b.name} Service Dubai`,
          })),
        },
      ]),
    [],
  );

  useSeo({
    title: 'All Services | DIGI-TEC Performance Center Dubai',
    description:
      'Explore our full range of automotive services in Dubai — from mechanical repair and diagnostics to body work and paint protection. DIGI-TEC Performance Center.',
    canonical: 'https://digitecme.com/services',
    jsonLd: servicesGraph,
  });

  return (
    <div className="min-h-screen bg-black text-off-white">
      <Header />

      {/* Hero */}
      <section className="relative py-12 sm:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-burnt-orange/10 via-transparent to-transparent" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <span className="eyebrow mb-2 sm:mb-4">What We Offer</span>
          <h1 className="text-2xl sm:text-5xl md:text-6xl font-black mb-2 sm:mb-4">
            Our Services
          </h1>
          <p className="text-gray-400 text-xs sm:text-lg max-w-4xl mx-auto leading-snug sm:leading-relaxed">
            At Digitec Performance Center, we offer a comprehensive range of automotive services tailored to meet the needs of most vehicle brands, combining dealership-level expertise with faster turnaround times and competitive pricing. Our workshop specializes in servicing, diagnostics, mechanical repairs, performance upgrades, and maintenance for premium and everyday vehicles, including Mercedes-Benz and Maybach, Audi, BMW, Porsche, Lamborghini, Aston Martin, Bugatti, Nissan, Ferrari, McLaren, Bentley, Range Rover and Land Rover, Rolls-Royce, Toyota, Rox, Jetour, Zeekr, BYD, and Hongqi. Whether you own a luxury supercar, a high-performance vehicle, or a daily driver, Digitec delivers reliable, high-quality automotive solutions designed to keep your car performing at its best.
          </p>
        </div>
      </section>

      <TrustBar className="mb-8 sm:mb-16" />

      {/* Brands We Service */}
      <section className="pb-8 sm:pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-6 sm:mb-10">
            <span className="text-burnt-orange font-semibold text-[11px] uppercase tracking-[0.3em] mb-2 block">
              Brands We Service
            </span>
            <h2 className="text-xl sm:text-3xl md:text-4xl font-black mb-2 sm:mb-3">
              Dedicated Service for Every Luxury Brand
            </h2>
            <p className="text-gray-400 text-sm sm:text-base max-w-3xl leading-relaxed">
              Tap any brand below for a dedicated service page covering diagnostics, mechanical repair, transmission, suspension, brakes, and performance work tuned to that marque.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {brands.map((b) => (
              <Link
                key={b.slug}
                to={`/brands/${b.slug}`}
                className="card-premium group flex items-center gap-3 sm:gap-4 rounded-2xl p-3 sm:p-4 transition-all duration-300"
                aria-label={`${b.name} service and repair in Dubai`}
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 p-1.5 bg-white/90 rounded-full flex items-center justify-center">
                  {brandLogoMap[b.name] ? (
                    <img
                      src={brandLogoMap[b.name]}
                      alt={`${b.name} logo`}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  ) : (
                    <span className="text-lg font-black text-burnt-orange">{b.name.charAt(0)}</span>
                  )}
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-sm sm:text-base leading-tight group-hover:text-burnt-orange transition-colors truncate">
                    {b.name}
                  </h3>
                  <p className="text-gray-400 text-[11px] sm:text-xs mt-0.5 line-clamp-2 leading-snug">
                    {b.specialization}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services by Category */}
      <section className="pb-12 sm:pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8 sm:space-y-16">
          {categories.map((cat) => {
            const items = services.filter((s) => s.category === cat);
            if (items.length === 0) return null;
            return (
              <div key={cat}>
                <h2 className="text-lg sm:text-3xl font-bold mb-4 sm:mb-8 border-l-4 border-burnt-orange pl-3 sm:pl-4">
                  {cat}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-2.5 sm:gap-5 lg:gap-6">
                  {items.map((s) => (
                    <Link
                      key={s.slug}
                      to={`/services/${s.slug}`}
                      className="card-premium group rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300"
                    >
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={s.image}
                          alt={s.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.src =
                              'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop';
                          }}
                        />
                      </div>
                      <div className="p-2.5 sm:p-4 lg:p-5">
                        <h3 className="font-bold text-[13px] sm:text-base lg:text-lg leading-tight group-hover:text-burnt-orange transition-colors line-clamp-2">
                          {s.title}
                        </h3>
                        <p className="text-gray-400 text-xs sm:text-sm mt-1 sm:mt-2 line-clamp-2">
                          {s.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Services;
