import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, Settings, Battery, Car, Gauge, Bolt, PaintRoller, Shield, ChevronRight } from 'lucide-react';
import { services } from '@/data/services';

const categoryIcons: Record<string, React.ReactNode> = {
  'Core Mechanical Services': <Wrench className="w-4 h-4 sm:w-6 sm:h-6" />,
  'Diagnostics & Electrical': <Bolt className="w-4 h-4 sm:w-6 sm:h-6" />,
  'Comfort Systems': <Settings className="w-4 h-4 sm:w-6 sm:h-6" />,
  'Body & Visual Work': <Shield className="w-4 h-4 sm:w-6 sm:h-6" />,
};

const serviceIcons: Record<string, React.ReactNode> = {
  'Mercedes Repair': <Car className="w-4 h-4 sm:w-5 sm:h-5" />,
  'Battery Changes': <Battery className="w-4 h-4 sm:w-5 sm:h-5" />,
  'Electrical System Repairs': <Bolt className="w-4 h-4 sm:w-5 sm:h-5" />,
  'Routine Maintenance': <Wrench className="w-4 h-4 sm:w-5 sm:h-5" />,
  'Car Body Repair': <Wrench className="w-4 h-4 sm:w-5 sm:h-5" />,
  'Car Paint & Protection': <PaintRoller className="w-4 h-4 sm:w-5 sm:h-5" />,
};

const defaultIcon = <Settings className="w-4 h-4 sm:w-5 sm:h-5" />;

const categoryOrder = ['Core Mechanical Services', 'Diagnostics & Electrical', 'Comfort Systems', 'Body & Visual Work'];
const grouped = categoryOrder.map((cat) => ({
  title: cat,
  icon: categoryIcons[cat],
  services: services.filter((s) => s.category === cat),
}));

export const ServiceGrid = () => {
  return (
    <>
      <style>{`
        .horizontal-scroll-container {
          -webkit-overflow-scrolling: touch;
          scroll-behavior: smooth;
          touch-action: auto;
          scrollbar-width: thin;
          scrollbar-color: #ff6b35 #0a0a0a;
        }
        .horizontal-scroll-container::-webkit-scrollbar { height: 8px; }
        .horizontal-scroll-container::-webkit-scrollbar-track { background: #0a0a0a; }
        .horizontal-scroll-container::-webkit-scrollbar-thumb { background: #ff6b35; border-radius: 4px; }
        .horizontal-scroll-container::-webkit-scrollbar-thumb:hover { background: #e55a2b; }
        .service-card { scroll-snap-align: start; flex: 0 0 auto; }
      `}</style>

      <section className="py-10 sm:py-20 lg:py-32 bg-black">
        <div className="max-w-full mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-14 lg:mb-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-black mb-3 sm:mb-5">
              Explore Our Full Range of Services
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-300 max-w-3xl mx-auto mb-2 sm:mb-4 px-4 leading-snug sm:leading-relaxed">
              Premium care for every system, every detail, every ride.
            </p>
            <p className="hidden sm:block text-burnt-orange font-semibold text-base sm:text-lg">
              ← Scroll to Explore All Services →
            </p>
          </div>

          <div className="space-y-8 sm:space-y-16">
            {grouped.map((category) => (
              <div key={category.title} className="space-y-4 sm:space-y-8">
                <div className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-8 px-2">
                  <div className="w-9 h-9 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-burnt-orange/20 to-burnt-orange/5 flex items-center justify-center text-burnt-orange shadow-lg backdrop-blur-sm">
                    {category.icon}
                  </div>
                  <h3 className="text-base sm:text-2xl md:text-3xl font-bold text-off-white">
                    {category.title}
                  </h3>
                </div>

                {/* Mobile: 2-column grid */}
                <div className="grid grid-cols-2 gap-3 px-1 sm:hidden">
                  {category.services.map((service) => (
                    <div key={service.slug} className="group">
                      <div className="bg-gradient-to-br from-charcoal/90 to-charcoal/60 backdrop-blur-sm border border-gray-800/50 rounded-3xl p-3 shadow-2xl transition-all duration-500 hover:border-burnt-orange/50 h-full flex flex-col">
                        <div className="mb-3 overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 aspect-[4/3]">
                          <img
                            src={service.image}
                            alt={service.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.src = 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop';
                            }}
                          />
                        </div>
                        <h4 className="text-sm font-bold mb-1 leading-tight group-hover:text-burnt-orange transition-colors line-clamp-2">
                          {service.title}
                        </h4>
                        <p className="text-gray-400 text-xs leading-snug mb-3 line-clamp-2 flex-1">
                          {service.description}
                        </p>
                        <Link
                          to={`/services/${service.slug}`}
                          className="inline-flex items-center gap-1 text-burnt-orange font-semibold text-xs mt-auto"
                        >
                          Learn More <ChevronRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tablet/Desktop: horizontal scroll */}
                <div className="hidden sm:block horizontal-scroll-container overflow-x-auto overflow-y-hidden pb-4">
                  <div className="flex gap-4 md:gap-6 pl-4 pr-4" style={{ width: 'max-content' }}>
                    {category.services.map((service) => (
                      <div key={service.slug} className="service-card group w-80 md:w-96">
                        <div className="bg-gradient-to-br from-charcoal/90 to-charcoal/60 backdrop-blur-sm border border-gray-800/50 rounded-3xl p-5 sm:p-6 lg:p-8 shadow-2xl transition-all duration-500 hover:shadow-burnt-orange/20 hover:border-burnt-orange/50 hover:scale-[1.02] hover:-translate-y-1 h-full flex flex-col min-h-[400px]">
                          <div className="mb-6 overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 aspect-[4/3]">
                            <img
                              src={service.image}
                              alt={service.title}
                              className="w-full h-full object-cover group-hover:scale-110 group-hover:brightness-110 transition-all duration-500"
                              onError={(e) => {
                                e.currentTarget.src = 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop';
                              }}
                            />
                          </div>

                          <div className="flex-1 flex flex-col">
                            <div className="flex items-start gap-4 mb-4">
                              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-burnt-orange/20 to-burnt-orange/5 flex items-center justify-center text-burnt-orange group-hover:shadow-lg group-hover:shadow-burnt-orange/30 transition-all duration-300">
                                {serviceIcons[service.title] || defaultIcon}
                              </div>
                              <div className="flex-1">
                                <h4 className="text-xl lg:text-2xl font-bold mb-3 group-hover:text-burnt-orange transition-colors duration-300 leading-tight">
                                  {service.title}
                                </h4>
                              </div>
                            </div>

                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base mb-6 flex-1">
                              {service.description}
                            </p>

                            <div className="pt-4 border-t border-gray-700/50 mt-auto">
                              <Link
                                to={`/services/${service.slug}`}
                                className="block w-full bg-gradient-to-r from-burnt-orange to-burnt-orange/80 hover:from-burnt-orange/90 hover:to-burnt-orange text-black font-bold text-sm lg:text-base px-6 py-3 rounded-2xl transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-burnt-orange/30 text-center"
                              >
                                Learn More
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-16 lg:mt-20">
            <Link
              to="/services"
              className="inline-block w-full sm:w-auto bg-burnt-orange hover:bg-burnt-orange/90 text-black font-bold text-sm sm:text-lg px-6 sm:px-12 py-3 sm:py-4 rounded-2xl sm:rounded-3xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-burnt-orange/30"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
