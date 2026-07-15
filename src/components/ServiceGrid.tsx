import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, Settings, Battery, Car, Gauge, Bolt, PaintRoller, Shield, ChevronRight } from 'lucide-react';
import { services } from '@/data/services';
import { Reveal } from '@/components/motion/Reveal';

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
          <Reveal className="text-center mb-8 sm:mb-14 lg:mb-20">
            <span className="eyebrow mb-3 sm:mb-5">Complete Care</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-3 sm:mb-5">
              Explore Our Full Range of Services
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-300 max-w-3xl mx-auto mb-2 sm:mb-4 px-4 leading-snug sm:leading-relaxed">
              Premium care for every system, every detail, every ride.
            </p>
            <p className="hidden sm:inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
              Scroll to explore <span className="text-burnt-orange">→</span>
            </p>
          </Reveal>

          <div className="space-y-8 sm:space-y-16">
            {grouped.map((category) => (
              <div key={category.title} className="space-y-4 sm:space-y-8">
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-8 px-2">
                  <span className="block w-1 h-5 sm:h-7 rounded-full bg-burnt-orange" aria-hidden="true" />
                  <h3 className="text-base sm:text-2xl md:text-3xl font-bold text-off-white">
                    {category.title}
                  </h3>
                </div>

                {/* Horizontal scroll on all screens */}
                <div className="horizontal-scroll-container overflow-x-auto overflow-y-hidden pb-3 sm:pb-4">
                  <div className="flex gap-3 sm:gap-4 md:gap-6 pl-2 pr-2 sm:pl-4 sm:pr-4" style={{ width: 'max-content' }}>
                    {category.services.map((service) => (
                      <div key={service.slug} className="service-card group w-56 sm:w-80 md:w-96">
                        <div className="card-premium rounded-2xl p-3 sm:p-6 lg:p-8 transition-all duration-500 sm:hover:-translate-y-1 h-full flex flex-col min-h-0 sm:min-h-[400px]">
                          <div className="mb-3 sm:mb-6 overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 aspect-[4/3]">
                            <img
                              src={service.image}
                              alt={service.title}
                              loading="lazy"
                              className="w-full h-full object-cover group-hover:scale-110 group-hover:brightness-110 transition-all duration-500"
                              onError={(e) => {
                                e.currentTarget.src = 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop';
                              }}
                            />
                          </div>

                          <div className="flex-1 flex flex-col">
                            <div className="flex items-start gap-2 sm:gap-4 mb-2 sm:mb-4">
                              <div className="flex-1">
                                <h4 className="text-sm sm:text-xl lg:text-2xl font-bold mb-0 sm:mb-3 group-hover:text-burnt-orange transition-colors duration-300 leading-tight line-clamp-2">
                                  {service.title}
                                </h4>
                              </div>
                            </div>

                            <p className="text-gray-400 sm:text-gray-300 leading-snug sm:leading-relaxed text-xs sm:text-sm lg:text-base mb-3 sm:mb-6 flex-1 line-clamp-2 sm:line-clamp-none">
                              {service.description}
                            </p>

                            <div className="pt-2 sm:pt-4 sm:border-t sm:border-white/10 mt-auto">
                              <Link
                                to={`/services/${service.slug}`}
                                className="inline-flex sm:hidden items-center gap-1 text-burnt-orange font-semibold text-xs"
                              >
                                Learn More <ChevronRight className="w-3 h-3" />
                              </Link>
                              <Link
                                to={`/services/${service.slug}`}
                                className="hidden sm:block w-full bg-burnt-orange hover:bg-[#ff7d4d] text-black font-bold text-xs lg:text-sm uppercase tracking-[0.14em] px-6 py-3.5 rounded-lg transition-colors duration-300 text-center"
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
            <Link to="/services" className="btn-primary w-full sm:w-auto">
              View All Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
