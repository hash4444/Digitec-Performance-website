
import React from 'react';

export const WhatWeDo = () => {
  return (
    <section className="py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black mb-8 text-white">
            What We <span className="text-burnt-orange">D</span>o
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            We transform luxury vehicles into bespoke performance machines through precision engineering, 
            advanced diagnostics, and world-class craftsmanship. Every modification is tailored to exceed 
            your expectations while maintaining the integrity of your investment.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12">
          <div className="text-center group">
            <div className="mb-8 overflow-hidden rounded-3xl shadow-2xl group-hover:shadow-burnt-orange/20 transition-all duration-500">
              <img 
                src="/lovable-uploads/aeca6cb5-7000-451e-aaf7-d5171200659f.png" 
                alt="Performance Tuning - Mercedes-AMG Engine"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <h3 className="text-2xl font-bold mb-6 text-white">Performance Tuning</h3>
            <p className="text-gray-300 leading-relaxed text-lg">
              ECU remapping, turbo upgrades, and exhaust system optimization 
              to unlock your vehicle's true potential.
            </p>
          </div>
          
          <div className="text-center group">
            <div className="mb-8 overflow-hidden rounded-3xl shadow-2xl group-hover:shadow-burnt-orange/20 transition-all duration-500">
              <img 
                src="/lovable-uploads/23c141a0-8b10-4263-a16b-a1c71773f3e5.png" 
                alt="Aesthetic Enhancement - Professional Car Detailing"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <h3 className="text-2xl font-bold mb-6 text-white">Aesthetic Enhancement</h3>
            <p className="text-gray-300 leading-relaxed text-lg">
              Custom body kits, carbon fiber components, and premium wheel 
              upgrades for the ultimate visual impact.
            </p>
          </div>
          
          <div className="text-center group">
            <div className="mb-8 overflow-hidden rounded-3xl shadow-2xl group-hover:shadow-burnt-orange/20 transition-all duration-500">
              <img 
                src="/lovable-uploads/02e53b99-9978-4722-8945-bab63d4a4973.png" 
                alt="Precision Maintenance - Engine Oil Service"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <h3 className="text-2xl font-bold mb-6 text-white">Precision Maintenance</h3>
            <p className="text-gray-300 leading-relaxed text-lg">
              Comprehensive diagnostic services and preventive maintenance 
              to keep your luxury vehicle in pristine condition.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
