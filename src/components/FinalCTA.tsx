
import React from 'react';
import { Button } from '@/components/ui/button';

export const FinalCTA = () => {
  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-charcoal via-black to-charcoal relative overflow-hidden">
      {/* Ambient effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-burnt-orange/5 via-transparent to-burnt-orange/5"></div>
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-48 h-48 sm:w-96 sm:h-96 bg-burnt-orange/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center relative z-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 sm:mb-8 leading-tight">
          Ready to Transform Your 
          <br />
          <span className="text-burnt-orange">D</span>ream Machine?
        </h2>
        
        <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed px-4">
          Join the elite circle of Dubai's most discerning automotive enthusiasts. 
          Experience the pinnacle of luxury performance tuning at <span className="text-burnt-orange">D</span>IGI-TEC Performance Center.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-12 sm:mb-16">
          <Button 
            className="w-full sm:w-auto bg-burnt-orange hover:bg-burnt-orange/90 text-black font-bold text-lg sm:text-xl px-12 sm:px-16 py-4 sm:py-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-burnt-orange/25"
          >
            Schedule Your Consultation
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full sm:w-auto border-2 border-off-white text-off-white hover:bg-off-white hover:text-black font-bold text-lg sm:text-xl px-12 sm:px-16 py-4 sm:py-6 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl"
          >
            Call +971 4 XXX XXXX
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-center">
          <div className="bg-gradient-to-br from-black/40 to-charcoal/20 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="text-xl sm:text-2xl font-bold text-burnt-orange mb-3 sm:mb-4">Free Consultation</div>
            <div className="text-gray-300 text-base sm:text-lg">Complimentary performance assessment</div>
          </div>
          <div className="bg-gradient-to-br from-black/40 to-charcoal/20 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="text-xl sm:text-2xl font-bold text-burnt-orange mb-3 sm:mb-4">Expert Advice</div>
            <div className="text-gray-300 text-base sm:text-lg">Personalized tuning recommendations</div>
          </div>
          <div className="bg-gradient-to-br from-black/40 to-charcoal/20 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="text-xl sm:text-2xl font-bold text-burnt-orange mb-3 sm:mb-4">Premium Service</div>
            <div className="text-gray-300 text-base sm:text-lg">White-glove treatment guaranteed</div>
          </div>
        </div>
      </div>
    </section>
  );
};
