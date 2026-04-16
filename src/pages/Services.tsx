import React from 'react';
import { Link } from 'react-router-dom';
import { useSeo } from '@/hooks/use-seo';
import Header from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FinalCTA } from '@/components/FinalCTA';
import { services } from '@/data/services';

const categories = [
  'Core Mechanical Services',
  'Diagnostics & Electrical',
  'Comfort Systems',
  'Body & Visual Work',
];

const Services = () => {
  useSeo({
    title: 'All Services | DIGI-TEC Performance Center Dubai',
    description:
      'Explore our full range of automotive services in Dubai — from mechanical repair and diagnostics to body work and paint protection. DIGI-TEC Performance Center.',
    canonical: 'https://digitecme.com/services',
  });

  return (
    <div className="min-h-screen bg-black text-off-white">
      <Header />

      {/* Hero */}
      <section className="relative py-20 sm:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-burnt-orange/10 via-transparent to-transparent" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-burnt-orange font-semibold text-sm uppercase tracking-widest mb-3 block">
            What We Offer
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4">
            Our Services
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            From engine rebuilds to ceramic coatings — everything your vehicle needs under one roof.
          </p>
        </div>
      </section>

      {/* Intro Content */}
      <section className="py-12 sm:py-16 bg-black border-b border-gray-800/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            At Digitec Performance Center, we offer a comprehensive range of automotive services tailored to meet the needs of most vehicle brands, combining dealership level expertise with faster turnaround times and competitive pricing. Our workshop specializes in servicing, diagnostics, mechanical repairs, performance upgrades, and maintenance for premium and everyday vehicles.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-2 sm:gap-3">
            {['Mercedes Benz', 'Maybach', 'Audi', 'BMW', 'Porsche', 'Lamborghini', 'Aston Martin', 'Bugatti', 'Nissan', 'Ferrari', 'McLaren', 'Bentley', 'Range Rover', 'Land Rover', 'Rolls Royce', 'Toyota', 'Rox', 'Jetour', 'Zeekr', 'BYD', 'Hongqi'].map((brand) => (
              <span key={brand} className="px-3 py-1.5 bg-charcoal/60 border border-gray-700/50 rounded-full text-xs sm:text-sm text-gray-400 hover:text-burnt-orange hover:border-burnt-orange/50 transition-colors">
                {brand}
              </span>
            ))}
          </div>
          <p className="mt-8 text-gray-400 text-sm sm:text-base">
            Whether you own a luxury supercar, a high performance vehicle, or a daily driver, Digitec delivers reliable, high quality automotive solutions designed to keep your car performing at its best.
          </p>
        </div>
      </section>

      {/* Services by Category */}
      <section className="pb-20 sm:pb-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-16">
          {categories.map((cat) => {
            const items = services.filter((s) => s.category === cat);
            if (items.length === 0) return null;
            return (
              <div key={cat}>
                <h2 className="text-2xl sm:text-3xl font-bold mb-8 border-l-4 border-burnt-orange pl-4">
                  {cat}
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((s) => (
                    <Link
                      key={s.slug}
                      to={`/services/${s.slug}`}
                      className="group bg-charcoal/60 border border-gray-800/50 rounded-2xl overflow-hidden hover:border-burnt-orange/50 transition-all duration-300"
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
                      <div className="p-5">
                        <h3 className="font-bold text-lg group-hover:text-burnt-orange transition-colors">
                          {s.title}
                        </h3>
                        <p className="text-gray-400 text-sm mt-2 line-clamp-2">
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
