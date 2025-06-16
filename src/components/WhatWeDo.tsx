
import React from 'react';

export const WhatWeDo = () => {
  return (
    <section className="py-32 bg-charcoal">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black mb-8">
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
            <div className="w-28 h-28 bg-gradient-to-br from-burnt-orange/20 to-burnt-orange/5 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:from-burnt-orange/30 group-hover:to-burnt-orange/10 transition-all duration-500 shadow-xl backdrop-blur-sm">
              <div className="w-16 h-16 border-2 border-burnt-orange rounded-2xl group-hover:scale-110 transition-transform duration-300"></div>
            </div>
            <h3 className="text-2xl font-bold mb-6 text-white">Performance Tuning</h3>
            <p className="text-gray-300 leading-relaxed text-lg">
              ECU remapping, turbo upgrades, and exhaust system optimization 
              to unlock your vehicle's true potential.
            </p>
          </div>
          
          <div className="text-center group">
            <div className="w-28 h-28 bg-gradient-to-br from-burnt-orange/20 to-burnt-orange/5 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:from-burnt-orange/30 group-hover:to-burnt-orange/10 transition-all duration-500 shadow-xl backdrop-blur-sm">
              <div className="w-16 h-16 border-2 border-burnt-orange rounded-2xl group-hover:scale-110 transition-transform duration-300"></div>
            </div>
            <h3 className="text-2xl font-bold mb-6 text-white">Aesthetic Enhancement</h3>
            <p className="text-gray-300 leading-relaxed text-lg">
              Custom body kits, carbon fiber components, and premium wheel 
              upgrades for the ultimate visual impact.
            </p>
          </div>
          
          <div className="text-center group">
            <div className="w-28 h-28 bg-gradient-to-br from-burnt-orange/20 to-burnt-orange/5 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:from-burnt-orange/30 group-hover:to-burnt-orange/10 transition-all duration-500 shadow-xl backdrop-blur-sm">
              <div className="w-16 h-16 border-2 border-burnt-orange rounded-2xl group-hover:scale-110 transition-transform duration-300"></div>
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
