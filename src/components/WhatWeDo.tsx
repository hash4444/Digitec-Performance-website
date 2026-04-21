
import React from 'react';

export const WhatWeDo = () => {
  return (
    <section className="py-10 sm:py-20 lg:py-32 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-14 lg:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-black mb-3 sm:mb-5 text-white">
            What We <span className="text-burnt-orange">D</span>o
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-300 max-w-4xl mx-auto leading-snug sm:leading-relaxed px-4">
            We transform luxury vehicles into bespoke performance machines through precision engineering, 
            advanced diagnostics, and world-class craftsmanship. Every modification is tailored to exceed 
            your expectations while maintaining the integrity of your investment.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-10">
          <div className="text-center group">
            <div className="mb-3 sm:mb-8 overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl group-hover:shadow-burnt-orange/20 transition-all duration-500">
              <img 
                src="/lovable-uploads/aeca6cb5-7000-451e-aaf7-d5171200659f.png" 
                alt="Performance Tuning - Mercedes-AMG Engine"
                className="w-full h-32 sm:h-56 lg:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <h3 className="text-base sm:text-2xl font-bold mb-2 sm:mb-4 text-white">Performance Tuning</h3>
            <p className="text-xs sm:text-base text-gray-300 leading-snug sm:leading-relaxed px-2">
              ECU remapping, turbo upgrades, and exhaust system optimization 
              to unlock your vehicle's true potential.
            </p>
          </div>
          
          <div className="text-center group">
            <div className="mb-3 sm:mb-8 overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl group-hover:shadow-burnt-orange/20 transition-all duration-500">
              <img 
                src="/lovable-uploads/brabus-g-class.png" 
                alt="Aesthetic Enhancement - Brabus G-Class"
                className="w-full h-32 sm:h-56 lg:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <h3 className="text-base sm:text-2xl font-bold mb-2 sm:mb-4 text-white">Aesthetic Enhancement</h3>
            <p className="text-xs sm:text-base text-gray-300 leading-snug sm:leading-relaxed px-2">
              Custom body kits, carbon fiber components, and premium wheel 
              upgrades for the ultimate visual impact.
            </p>
          </div>
          
          <div className="text-center group col-span-2 md:col-span-1">
            <div className="mb-3 sm:mb-8 overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl group-hover:shadow-burnt-orange/20 transition-all duration-500">
              <img 
                src="/lovable-uploads/02e53b99-9978-4722-8945-bab63d4a4973.png" 
                alt="Precision Maintenance - Engine Oil Service"
                className="w-full h-32 sm:h-56 lg:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <h3 className="text-base sm:text-2xl font-bold mb-2 sm:mb-4 text-white">Precision Maintenance</h3>
            <p className="text-xs sm:text-base text-gray-300 leading-snug sm:leading-relaxed px-2">
              Comprehensive diagnostic services and preventive maintenance 
              to keep your luxury vehicle in pristine condition.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
