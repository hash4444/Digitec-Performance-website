
import React from 'react';

export const ServiceGrid = () => {
  const services = [
    {
      title: 'ECU Remapping',
      description: 'Optimize engine performance with custom software calibration',
      price: 'From AED 2,500'
    },
    {
      title: 'Turbo Upgrades',
      description: 'High-performance turbocharger systems for maximum power',
      price: 'From AED 8,000'
    },
    {
      title: 'Exhaust Systems',
      description: 'Premium exhaust solutions for enhanced sound and performance',
      price: 'From AED 3,500'
    },
    {
      title: 'Suspension Tuning',
      description: 'Precision suspension setup for track and street performance',
      price: 'From AED 4,500'
    },
    {
      title: 'Carbon Fiber Packages',
      description: 'Lightweight carbon fiber components for ultimate performance',
      price: 'From AED 6,000'
    },
    {
      title: 'Wheel & Tire Packages',
      description: 'Premium wheel and tire combinations for optimal grip',
      price: 'From AED 5,500'
    }
  ];

  return (
    <section className="py-32 bg-charcoal">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black mb-8">
            Performance Services
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive performance solutions crafted for the most discerning automotive enthusiasts
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {services.map((service, index) => (
            <div 
              key={service.title}
              className="bg-black/50 border border-gray-800 p-10 hover:border-burnt-orange/50 transition-all duration-300 group"
            >
              <div className="mb-8">
                <div className="w-16 h-1 bg-burnt-orange mb-6"></div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-burnt-orange transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  {service.description}
                </p>
                <div className="text-burnt-orange font-bold text-lg">
                  {service.price}
                </div>
              </div>
              
              <button className="w-full bg-transparent border border-gray-600 text-off-white py-3 px-6 hover:border-burnt-orange hover:text-burnt-orange transition-all duration-300 font-semibold">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
