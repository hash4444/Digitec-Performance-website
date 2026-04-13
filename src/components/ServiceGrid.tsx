
import React from 'react';
import { Wrench, Settings, Battery, Car, Gauge, Bolt, PaintRoller, Shield } from 'lucide-react';

export const ServiceGrid = () => {
  const serviceCategories = [
    {
      title: "Core Mechanical Services",
      icon: <Wrench className="w-5 h-5 sm:w-6 sm:h-6" />,
      services: [
        {
          title: 'Mercedes Repair',
          description: 'Factory-standard repair tailored for high-performance vehicles.',
          icon: <Car className="w-4 h-4 sm:w-5 sm:h-5" />,
          image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400&h=300&fit=crop'
        },
        {
          title: 'Mechanical Repair',
          description: 'Precision work on all internal systems, from belts to blocks.',
          icon: <Settings className="w-4 h-4 sm:w-5 sm:h-5" />,
          image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop'
        },
        {
          title: 'Transmission Services',
          description: 'Full diagnostics, clutch replacement, and gear optimization.',
          icon: <Gauge className="w-4 h-4 sm:w-5 sm:h-5" />,
          image: '/lovable-uploads/b56133bf-55e4-4bc9-884f-15f732132259.png'
        },
        {
          title: 'Suspension Repair',
          description: 'Smooth, responsive ride quality, tuned for control and comfort.',
          icon: <Settings className="w-4 h-4 sm:w-5 sm:h-5" />,
          image: '/lovable-uploads/0f7fde8d-a57b-45bc-bb10-c80f98525682.png'
        },
        {
          title: 'Steering Repair',
          description: 'Refined alignment and steering system recalibration.',
          icon: <Settings className="w-4 h-4 sm:w-5 sm:h-5" />,
          image: '/lovable-uploads/b8278b01-7cf1-43fb-ae22-3f731c36cec5.png'
        },
        {
          title: 'Brake System Repairs',
          description: 'Peak stopping power with OEM or performance-grade parts.',
          icon: <Settings className="w-4 h-4 sm:w-5 sm:h-5" />,
          image: '/lovable-uploads/99d04ebd-5104-40f5-961d-f26cff7f2030.png'
        },
        {
          title: 'Routine Maintenance',
          description: 'Scheduled servicing to preserve engine health and performance.',
          icon: <Wrench className="w-4 h-4 sm:w-5 sm:h-5" />,
          image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=400&h=300&fit=crop'
        },
        {
          title: 'Oil Change Service',
          description: 'Premium oils, maximum efficiency, extended engine life.',
          icon: <Settings className="w-4 h-4 sm:w-5 sm:h-5" />,
          image: '/lovable-uploads/b25532a7-eae9-45ae-b8bf-425984dbfa6d.png'
        },
        {
          title: 'Tire Repair',
          description: 'Balance, alignment, and performance-grade tire fitting.',
          icon: <Settings className="w-4 h-4 sm:w-5 sm:h-5" />,
          image: '/lovable-uploads/00377e13-62b4-4290-8054-c0aad75b9c00.png'
        },
        {
          title: 'Battery Changes',
          description: 'Fast, reliable battery replacements with top-tier brands.',
          icon: <Battery className="w-4 h-4 sm:w-5 sm:h-5" />,
          image: '/lovable-uploads/c1c2c5d8-fd7e-4d38-945c-e52315b4229e.png'
        },
        {
          title: 'Exhaust Repair',
          description: 'Smooth airflow, roaring tone, and emissions compliance.',
          icon: <Settings className="w-4 h-4 sm:w-5 sm:h-5" />,
          image: '/lovable-uploads/b400327f-926f-4da6-97f8-cff91a39e3ec.png'
        }
      ]
    },
    {
      title: "Diagnostics & Electrical",
      icon: <Bolt className="w-5 h-5 sm:w-6 sm:h-6" />,
      services: [
        {
          title: 'Car Programming & Diagnostic',
          description: 'ECU coding, resets, and full digital system inspection.',
          icon: <Settings className="w-4 h-4 sm:w-5 sm:h-5" />,
          image: '/lovable-uploads/150c684d-11eb-476b-b768-afe7cad297cc.png'
        },
        {
          title: 'Electrical System Repairs',
          description: 'Power delivery and sensor calibration to factory spec.',
          icon: <Bolt className="w-4 h-4 sm:w-5 sm:h-5" />,
          image: '/lovable-uploads/9f435c28-2f08-437b-99ad-2252d8ea2071.png'
        },
        {
          title: 'Fuel System Repair',
          description: 'Optimal fuel delivery, flow, and combustion efficiency.',
          icon: <Settings className="w-4 h-4 sm:w-5 sm:h-5" />,
          image: '/lovable-uploads/678fdd1f-2841-4606-8533-51f82257a4a0.png'
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
          icon: <Settings className="w-4 h-4 sm:w-5 sm:h-5" />,
          image: '/lovable-uploads/9db7fc3e-a988-4b9d-a7ab-a6494b58561e.png'
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
          icon: <Wrench className="w-4 h-4 sm:w-5 sm:h-5" />,
          image: '/lovable-uploads/car-body-repair-v2.png'
        },
        {
          title: 'Car Paint & Protection',
          description: 'Flawless finish. Ceramic coat. Paint protection films available.',
          icon: <PaintRoller className="w-4 h-4 sm:w-5 sm:h-5" />,
          image: '/lovable-uploads/f1cfe23e-d23b-4717-9f75-a07199716d98.png'
        }
      ]
    }
  ];

  return (
    <>
      <style>{`
        .horizontal-scroll-container {
          -webkit-overflow-scrolling: touch;
          scroll-behavior: smooth;
          touch-action: pan-x;
          scroll-snap-type: x proximity;
          scrollbar-width: thin;
          scrollbar-color: #ff6b35 #0a0a0a;
        }
        
        .horizontal-scroll-container::-webkit-scrollbar {
          height: 8px;
        }
        
        .horizontal-scroll-container::-webkit-scrollbar-track {
          background: #0a0a0a;
        }
        
        .horizontal-scroll-container::-webkit-scrollbar-thumb {
          background: #ff6b35;
          border-radius: 4px;
        }
        
        .horizontal-scroll-container::-webkit-scrollbar-thumb:hover {
          background: #e55a2b;
        }
        
        .service-card {
          scroll-snap-align: start;
          flex: 0 0 auto;
        }
      `}</style>
      
      <section className="py-16 sm:py-24 lg:py-32 bg-black">
        <div className="max-w-full mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 sm:mb-8">
              Explore Our Full Range of Services
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-4 px-4">
              Premium care for every system, every detail, every ride.
            </p>
            <p className="text-burnt-orange font-semibold text-base sm:text-lg">
              ← Scroll to Explore All Services →
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
                
                {/* True Horizontal Scroll Container */}
                <div 
                  className="horizontal-scroll-container overflow-x-auto overflow-y-hidden pb-4"
                >
                  <div className="flex gap-4 md:gap-6 pl-4 pr-4" style={{ width: 'max-content' }}>
                    {category.services.map((service, index) => (
                      <div 
                        key={service.title} 
                        className="service-card group cursor-pointer w-80 sm:w-96"
                      >
                        <div className="bg-gradient-to-br from-charcoal/90 to-charcoal/60 backdrop-blur-sm border border-gray-800/50 rounded-3xl p-6 lg:p-8 shadow-2xl transition-all duration-500 hover:shadow-burnt-orange/20 hover:border-burnt-orange/50 hover:scale-[1.02] hover:-translate-y-1 h-full flex flex-col min-h-[400px]">
                          
                          {/* Service Image */}
                          <div className="mb-6 overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 aspect-[4/3]">
                            <img 
                              src={service.image} 
                              alt={service.title}
                              className="w-full h-full object-cover group-hover:scale-110 group-hover:brightness-110 transition-all duration-500"
                              onError={(e) => {
                                e.currentTarget.src = 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop';
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                          </div>
                          
                          {/* Service Content */}
                          <div className="flex-1 flex flex-col">
                            <div className="flex items-start gap-4 mb-4">
                              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-burnt-orange/20 to-burnt-orange/5 flex items-center justify-center text-burnt-orange group-hover:text-burnt-orange group-hover:shadow-lg group-hover:shadow-burnt-orange/30 transition-all duration-300">
                                {service.icon}
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
                            
                            {/* CTA Button */}
                            <div className="pt-4 border-t border-gray-700/50 mt-auto">
                              <button className="w-full bg-gradient-to-r from-burnt-orange to-burnt-orange/80 hover:from-burnt-orange/90 hover:to-burnt-orange text-black font-bold text-sm lg:text-base px-6 py-3 rounded-2xl transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-burnt-orange/30">
                                Learn More
                              </button>
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
          
          <div className="text-center mt-12 sm:mt-16 lg:mt-20">
            <button className="w-full sm:w-auto bg-burnt-orange hover:bg-burnt-orange/90 text-black font-bold text-base sm:text-lg px-8 sm:px-12 py-4 rounded-2xl sm:rounded-3xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-burnt-orange/30">
              View All Services & Pricing
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
