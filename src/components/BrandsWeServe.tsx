
import React from 'react';

export const BrandsWeServe = () => {
  const brands = [
    {
      name: 'Mercedes-Benz',
      specialization: 'AMG Performance & Star Diagnostics',
      logo: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=100&h=100&fit=crop&crop=center'
    },
    {
      name: 'Maybach',
      specialization: 'Ultra-Luxury Comfort & Precision Service',
      logo: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=100&h=100&fit=crop&crop=center'
    },
    {
      name: 'Porsche',
      specialization: 'GT3 & Turbo Powertrain Tuning',
      logo: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=100&h=100&fit=crop&crop=center'
    },
    {
      name: 'Audi',
      specialization: 'Quattro Systems & RS Performance',
      logo: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=100&h=100&fit=crop&crop=center'
    },
    {
      name: 'BMW',
      specialization: 'M Series Optimization & iDrive Coding',
      logo: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=100&h=100&fit=crop&crop=center'
    },
    {
      name: 'Lamborghini',
      specialization: 'V10 & V12 Specialists',
      logo: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=100&h=100&fit=crop&crop=center'
    },
    {
      name: 'Bentley',
      specialization: 'Continental & Flying Spur Excellence',
      logo: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=100&h=100&fit=crop&crop=center'
    },
    {
      name: 'McLaren',
      specialization: 'Carbon Fiber & Turbo V8 Mastery',
      logo: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=100&h=100&fit=crop&crop=center'
    },
    {
      name: 'Ferrari',
      specialization: 'ECU & Powertrain Calibration',
      logo: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=100&h=100&fit=crop&crop=center'
    },
    {
      name: 'Bugatti',
      specialization: 'Quad Turbo Optimization & Luxury Diagnostics',
      logo: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=100&h=100&fit=crop&crop=center'
    },
    {
      name: 'Range Rover',
      specialization: 'Terrain Response & Luxury SUV Systems',
      logo: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=100&h=100&fit=crop&crop=center'
    },
    {
      name: 'Rolls Royce',
      specialization: 'Quiet, Precise, Luxurious – Inside and Out',
      logo: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=100&h=100&fit=crop&crop=center'
    }
  ];

  return (
    <section className="py-32 bg-black relative overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-burnt-orange/5 via-transparent to-burnt-orange/5"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-burnt-orange/10 rounded-full blur-3xl opacity-30"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black mb-8 text-off-white">
            Only the Icons. Only the Elite.
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            We specialize in diagnostics, performance, and precision service for the world's most iconic automotive brands.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-16">
          {brands.map((brand, index) => (
            <div 
              key={brand.name}
              className="group relative bg-charcoal/30 border border-gray-800/50 p-8 text-center transition-all duration-500 hover:border-burnt-orange/50 hover:bg-charcoal/50 hover:scale-105 hover:shadow-2xl hover:shadow-burnt-orange/20 cursor-pointer"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-burnt-orange/0 via-burnt-orange/10 to-burnt-orange/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Actual brand logo */}
              <div className="relative mb-6">
                <div className="h-16 flex items-center justify-center mb-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gradient-to-r from-gray-500 via-gray-300 to-gray-500 group-hover:shadow-lg group-hover:shadow-burnt-orange/30 transition-all duration-500">
                    <img 
                      src={brand.logo} 
                      alt={`${brand.name} logo`}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                  </div>
                </div>
                
                {/* DIGI-TEC "D" overlay */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-burnt-orange font-black text-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:animate-pulse">
                  D
                </div>
              </div>
              
              {/* Brand name */}
              <h3 className="font-bold text-lg text-gray-300 group-hover:text-off-white transition-colors duration-300 mb-4">
                {brand.name}
              </h3>
              
              {/* Specialization - appears on hover */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100">
                <p className="text-burnt-orange font-semibold text-sm leading-tight">
                  {brand.specialization}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Final CTA */}
        <div className="text-center">
          <div className="mb-6">
            <p className="text-lg text-gray-400 mb-2">
              Don't see your brand?
            </p>
            <p className="text-gray-300">
              We service all European and ultra-luxury vehicles. Just ask.
            </p>
          </div>
          
          <button className="bg-burnt-orange hover:bg-burnt-orange/90 text-black font-bold text-lg px-12 py-4 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-burnt-orange/30">
            Talk to a Specialist
          </button>
        </div>
      </div>
    </section>
  );
};
