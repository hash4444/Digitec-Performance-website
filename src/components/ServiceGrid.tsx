import React from 'react';
import { Wrench, Settings, Battery, Car, Gauge, Bolt, PaintRoller, Shield } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

export const ServiceGrid = () => {
  const serviceCategories = [
    {
      title: "Core Mechanical Services",
      icon: <Wrench className="w-5 h-5 sm:w-6 sm:h-6" />,
      services: [
        {
          title: 'Mercedes Repair',
          description: 'Factory-standard repair tailored for high-performance vehicles.',
          icon: <Car className="w-4 h-4 sm:w-5 sm:h-5" />
        },
        {
          title: 'Mechanical Repair',
          description: 'Precision work on all internal systems — from belts to blocks.',
          icon: <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
        },
        {
          title: 'Transmission Services',
          description: 'Full diagnostics, clutch replacement, and gear optimization.',
          icon: <Gauge className="w-4 h-4 sm:w-5 sm:h-5" />
        },
        {
          title: 'Suspension Repair',
          description: 'Smooth, responsive ride quality — tuned for control and comfort.',
          icon: <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
        },
        {
          title: 'Steering Repair',
          description: 'Refined alignment and steering system recalibration.',
          icon: <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
        },
        {
          title: 'Brake System Repairs',
          description: 'Peak stopping power with OEM or performance-grade parts.',
          icon: <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
        },
        {
          title: 'Routine Maintenance',
          description: 'Scheduled servicing to preserve engine health and performance.',
          icon: <Wrench className="w-4 h-4 sm:w-5 sm:h-5" />
        },
        {
          title: 'Oil Change Service',
          description: 'Premium oils, maximum efficiency, extended engine life.',
          icon: <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
        },
        {
          title: 'Tire Repair',
          description: 'Balance, alignment, and performance-grade tire fitting.',
          icon: <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
        },
        {
          title: 'Battery Changes',
          description: 'Fast, reliable battery replacements with top-tier brands.',
          icon: <Battery className="w-4 h-4 sm:w-5 sm:h-5" />
        }
      ]
    },
    {
      title: "Diagnostics & Electrical",
      icon: <Bolt className="w-5 h-5 sm:w-6 sm:h-6" />,
      services: [
        {
          title: 'Engine Diagnostics',
          description: 'Advanced scans to detect and prevent high-cost failures.',
          icon: <Gauge className="w-4 h-4 sm:w-5 sm:h-5" />
        },
        {
          title: 'Car Programming & Diagnostic',
          description: 'ECU coding, resets, and full digital system inspection.',
          icon: <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
        },
        {
          title: 'Electrical System Repairs',
          description: 'Power delivery and sensor calibration to factory spec.',
          icon: <Bolt className="w-4 h-4 sm:w-5 sm:h-5" />
        },
        {
          title: 'Fuel System Repair',
          description: 'Optimal fuel delivery, flow, and combustion efficiency.',
          icon: <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
        }
      ]
    },
    {
      title: "Comfort Systems",
      icon: <Settings className="w-5 h-5 sm:w-6 sm:h-6" />,
      services: [
        {
          title: 'AC Repair & Maintenance',
          description: 'Climate control diagnostics, refrigerant refills, and compressor tuning.',
          icon: <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
        }
      ]
    },
    {
      title: "Performance & Customization",
      icon: <Gauge className="w-5 h-5 sm:w-6 sm:h-6" />,
      services: [
        {
          title: 'Performance Tuning',
          description: 'Horsepower unleashed. Dyno-tested and torque optimized.',
          icon: <Gauge className="w-4 h-4 sm:w-5 sm:h-5" />
        },
        {
          title: 'ECU Remapping',
          description: 'Custom maps tailored for responsiveness, economy, or raw speed.',
          icon: <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
        },
        {
          title: 'Exhaust Repair',
          description: 'Smooth airflow, roaring tone, and emissions compliance.',
          icon: <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
        },
        {
          title: 'Car Paint & Protection',
          description: 'Flawless finish. Ceramic coat. Paint protection films available.',
          icon: <PaintRoller className="w-4 h-4 sm:w-5 sm:h-5" />
        }
      ]
    },
    {
      title: "Body & Visual Work",
      icon: <Shield className="w-5 h-5 sm:w-6 sm:h-6" />,
      services: [
        {
          title: 'Car Body Repair',
          description: 'Precision repair for dents, cracks, scrapes, and frame issues.',
          icon: <Wrench className="w-4 h-4 sm:w-5 sm:h-5" />
        },
        {
          title: 'Paint Restoration & PPF',
          description: 'Restore your shine and protect it for years with clear film technology.',
          icon: <PaintRoller className="w-4 h-4 sm:w-5 sm:h-5" />
        }
      ]
    }
  ];

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 sm:mb-8">
            Explore Our Full Range of Services
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-4 px-4">
            Premium care for every system, every detail, every ride.
          </p>
          <p className="text-burnt-orange font-semibold text-base sm:text-lg">
            ← Swipe to Explore All Services →
          </p>
        </div>
        
        <div className="space-y-12 sm:space-y-16">
          {serviceCategories.map((category, categoryIndex) => (
            <div key={category.title} className="space-y-6 sm:space-y-8">
              <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 px-2">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-burnt-orange/20 to-burnt-orange/5 flex items-center justify-center text-burnt-orange shadow-lg backdrop-blur-sm">
                  {category.icon}
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-off-white">
                  {category.title}
                </h3>
              </div>
              
              {/* Mobile: Vertical stack, Desktop: Horizontal carousel */}
              <div className="block sm:hidden space-y-4">
                {category.services.map((service, index) => (
                  <div 
                    key={service.title}
                    className="p-6 rounded-2xl transition-all duration-300 group cursor-pointer shadow-xl backdrop-blur-sm bg-gradient-to-br from-charcoal/80 to-charcoal/40 border border-gray-800/50 hover:border-burnt-orange/50 hover:shadow-2xl hover:shadow-burnt-orange/20 active:scale-95"
                  >
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-burnt-orange/20 to-burnt-orange/5 flex items-center justify-center text-burnt-orange group-hover:text-burnt-orange/80 transition-colors duration-300 shadow-md">
                        {service.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold mb-2 group-hover:text-burnt-orange transition-colors duration-300">
                          {service.title}
                        </h4>
                        <p className="text-gray-300 leading-relaxed text-sm">
                          {service.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="pt-3 border-t border-gray-700/50">
                      <button className="text-burnt-orange font-semibold text-sm hover:underline transition-all duration-300 flex items-center gap-2">
                        Learn More
                        <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop: Horizontal carousel */}
              <div className="hidden sm:block">
                <Carousel className="w-full">
                  <CarouselContent className="-ml-2 md:-ml-4">
                    {category.services.map((service, index) => (
                      <CarouselItem key={service.title} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                        <div 
                          className={`
                            p-6 lg:p-8 rounded-2xl lg:rounded-3xl transition-all duration-300 group cursor-pointer shadow-xl backdrop-blur-sm h-full
                            ${index % 2 === 0 
                              ? 'bg-gradient-to-br from-charcoal/80 to-charcoal/40 border border-gray-800/50 hover:border-burnt-orange/50' 
                              : 'bg-gradient-to-br from-chocolate/30 to-chocolate/10 border border-chocolate/30 hover:border-burnt-orange/50'
                            }
                            hover:shadow-2xl hover:shadow-burnt-orange/20 hover:scale-105 hover:-translate-y-2
                          `}
                        >
                          <div className="flex items-start gap-4 mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-burnt-orange/20 to-burnt-orange/5 flex items-center justify-center text-burnt-orange group-hover:text-burnt-orange/80 transition-colors duration-300 shadow-md">
                              {service.icon}
                            </div>
                            <div className="flex-1">
                              <h4 className="text-xl font-bold mb-3 group-hover:text-burnt-orange transition-colors duration-300">
                                {service.title}
                              </h4>
                              <p className="text-gray-300 leading-relaxed text-sm">
                                {service.description}
                              </p>
                            </div>
                          </div>
                          
                          <div className="pt-4 border-t border-gray-700/50">
                            <button className="text-burnt-orange font-semibold text-sm hover:underline transition-all duration-300 flex items-center gap-2">
                              Learn More
                              <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                            </button>
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="hidden lg:flex" />
                  <CarouselNext className="hidden lg:flex" />
                </Carousel>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12 sm:mt-16 lg:mt-20">
          <button className="w-full sm:w-auto bg-burnt-orange hover:bg-burnt-orange/90 text-black font-bold text-base sm:text-lg px-8 sm:px-12 py-4 rounded-2xl sm:rounded-3xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-burnt-orange/30">
            View All Services & Pricing
          </button>
        </div>
      </div>
    </section>
  );
};
