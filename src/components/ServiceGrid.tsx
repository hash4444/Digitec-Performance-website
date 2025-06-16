
import React from 'react';
import { Wrench, Settings, Battery, Car, Gauge, Bolt, PaintRoller, Shield } from 'lucide-react';

export const ServiceGrid = () => {
  const serviceCategories = [
    {
      title: "Core Mechanical Services",
      icon: <Wrench className="w-6 h-6" />,
      services: [
        {
          title: 'Mercedes Repair',
          description: 'Factory-standard repair tailored for high-performance vehicles.',
          icon: <Car className="w-5 h-5" />
        },
        {
          title: 'Mechanical Repair',
          description: 'Precision work on all internal systems — from belts to blocks.',
          icon: <Settings className="w-5 h-5" />
        },
        {
          title: 'Transmission Services',
          description: 'Full diagnostics, clutch replacement, and gear optimization.',
          icon: <Gauge className="w-5 h-5" />
        },
        {
          title: 'Suspension Repair',
          description: 'Smooth, responsive ride quality — tuned for control and comfort.',
          icon: <Settings className="w-5 h-5" />
        },
        {
          title: 'Steering Repair',
          description: 'Refined alignment and steering system recalibration.',
          icon: <Settings className="w-5 h-5" />
        },
        {
          title: 'Brake System Repairs',
          description: 'Peak stopping power with OEM or performance-grade parts.',
          icon: <Settings className="w-5 h-5" />
        },
        {
          title: 'Routine Maintenance',
          description: 'Scheduled servicing to preserve engine health and performance.',
          icon: <Wrench className="w-5 h-5" />
        },
        {
          title: 'Oil Change Service',
          description: 'Premium oils, maximum efficiency, extended engine life.',
          icon: <Settings className="w-5 h-5" />
        },
        {
          title: 'Tire Repair',
          description: 'Balance, alignment, and performance-grade tire fitting.',
          icon: <Settings className="w-5 h-5" />
        },
        {
          title: 'Battery Changes',
          description: 'Fast, reliable battery replacements with top-tier brands.',
          icon: <Battery className="w-5 h-5" />
        }
      ]
    },
    {
      title: "Diagnostics & Electrical",
      icon: <Bolt className="w-6 h-6" />,
      services: [
        {
          title: 'Engine Diagnostics',
          description: 'Advanced scans to detect and prevent high-cost failures.',
          icon: <Gauge className="w-5 h-5" />
        },
        {
          title: 'Car Programming & Diagnostic',
          description: 'ECU coding, resets, and full digital system inspection.',
          icon: <Settings className="w-5 h-5" />
        },
        {
          title: 'Electrical System Repairs',
          description: 'Power delivery and sensor calibration to factory spec.',
          icon: <Bolt className="w-5 h-5" />
        },
        {
          title: 'Fuel System Repair',
          description: 'Optimal fuel delivery, flow, and combustion efficiency.',
          icon: <Settings className="w-5 h-5" />
        }
      ]
    },
    {
      title: "Comfort Systems",
      icon: <Settings className="w-6 h-6" />,
      services: [
        {
          title: 'AC Repair & Maintenance',
          description: 'Climate control diagnostics, refrigerant refills, and compressor tuning.',
          icon: <Settings className="w-5 h-5" />
        }
      ]
    },
    {
      title: "Performance & Customization",
      icon: <Gauge className="w-6 h-6" />,
      services: [
        {
          title: 'Performance Tuning',
          description: 'Horsepower unleashed. Dyno-tested and torque optimized.',
          icon: <Gauge className="w-5 h-5" />
        },
        {
          title: 'ECU Remapping',
          description: 'Custom maps tailored for responsiveness, economy, or raw speed.',
          icon: <Settings className="w-5 h-5" />
        },
        {
          title: 'Exhaust Repair',
          description: 'Smooth airflow, roaring tone, and emissions compliance.',
          icon: <Settings className="w-5 h-5" />
        },
        {
          title: 'Car Paint & Protection',
          description: 'Flawless finish. Ceramic coat. Paint protection films available.',
          icon: <PaintRoller className="w-5 h-5" />
        }
      ]
    },
    {
      title: "Body & Visual Work",
      icon: <Shield className="w-6 h-6" />,
      services: [
        {
          title: 'Car Body Repair',
          description: 'Precision repair for dents, cracks, scrapes, and frame issues.',
          icon: <Wrench className="w-5 h-5" />
        },
        {
          title: 'Paint Restoration & PPF',
          description: 'Restore your shine and protect it for years with clear film technology.',
          icon: <PaintRoller className="w-5 h-5" />
        }
      ]
    }
  ];

  return (
    <section className="py-32 bg-charcoal">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black mb-8">
            Explore Our Full Range of Services
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-4">
            Premium care for every system, every detail, every ride.
          </p>
          <p className="text-burnt-orange font-semibold text-lg">
            ← Swipe to Explore All Services →
          </p>
        </div>
        
        <div className="space-y-16">
          {serviceCategories.map((category, categoryIndex) => (
            <div key={category.title} className="space-y-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="text-burnt-orange">
                  {category.icon}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-off-white">
                  {category.title}
                </h3>
              </div>
              
              <div className="overflow-x-auto pb-4 scrollbar-thin scrollbar-track-charcoal scrollbar-thumb-burnt-orange hover:scrollbar-thumb-burnt-orange/80">
                <div className="flex gap-6 w-max">
                  {category.services.map((service, index) => (
                    <div 
                      key={service.title}
                      className={`
                        w-80 flex-shrink-0 p-8 border transition-all duration-300 group cursor-pointer
                        ${index % 2 === 0 
                          ? 'bg-black/50 border-gray-800 hover:border-burnt-orange/50' 
                          : 'bg-chocolate/20 border-chocolate/30 hover:border-burnt-orange/50'
                        }
                        hover:shadow-2xl hover:shadow-burnt-orange/10 hover:scale-105
                      `}
                    >
                      <div className="flex items-start gap-4 mb-6">
                        <div className="text-burnt-orange group-hover:text-burnt-orange/80 transition-colors duration-300">
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
                      
                      <div className="pt-4 border-t border-gray-700">
                        <button className="text-burnt-orange font-semibold text-sm hover:underline transition-all duration-300">
                          Learn More →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-20">
          <button className="bg-burnt-orange hover:bg-burnt-orange/90 text-black font-bold text-lg px-12 py-4 transition-all duration-300 transform hover:scale-105">
            View All Services & Pricing
          </button>
        </div>
      </div>
    </section>
  );
};
