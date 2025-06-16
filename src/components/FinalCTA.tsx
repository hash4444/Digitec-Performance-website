
import React from 'react';
import { Button } from '@/components/ui/button';

export const FinalCTA = () => {
  return (
    <section className="py-32 bg-gradient-to-br from-charcoal via-black to-charcoal relative overflow-hidden">
      {/* Ambient effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-burnt-orange/5 via-transparent to-burnt-orange/5"></div>
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-burnt-orange/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight">
          Ready to Transform Your 
          <br />
          <span className="text-burnt-orange">D</span>ream Machine?
        </h2>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
          Join the elite circle of Dubai's most discerning automotive enthusiasts. 
          Experience the pinnacle of luxury performance tuning at <span className="text-burnt-orange">D</span>IGI-TEC Performance Center.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <Button 
            className="bg-burnt-orange hover:bg-burnt-orange/90 text-black font-bold text-xl px-16 py-6 rounded-none transition-all duration-300 transform hover:scale-105"
          >
            Schedule Your Consultation
          </Button>
          
          <Button 
            variant="outline" 
            className="border-2 border-off-white text-off-white hover:bg-off-white hover:text-black font-bold text-xl px-16 py-6 rounded-none transition-all duration-300"
          >
            Call +971 4 XXX XXXX
          </Button>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-2xl font-bold text-burnt-orange mb-2">Free Consultation</div>
            <div className="text-gray-300">Complimentary performance assessment</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-burnt-orange mb-2">Expert Advice</div>
            <div className="text-gray-300">Personalized tuning recommendations</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-burnt-orange mb-2">Premium Service</div>
            <div className="text-gray-300">White-glove treatment guaranteed</div>
          </div>
        </div>
      </div>
    </section>
  );
};
