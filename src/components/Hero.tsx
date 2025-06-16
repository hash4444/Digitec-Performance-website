
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-charcoal to-black overflow-hidden">
      {/* Ambient lighting effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-burnt-orange/5 via-transparent to-burnt-orange/5"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-burnt-orange/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-chocolate/10 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight">
          <span className="text-burnt-orange">D</span>IGI-TEC
          <br />
          Performance Center
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
          Dubai's premier luxury automotive tuning specialists. Unleashing the ultimate potential of Mercedes, Ferrari, Porsche, Audi, and Rolls Royce through cutting-edge performance engineering.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button 
            className="bg-burnt-orange hover:bg-burnt-orange/90 text-black font-bold text-lg px-12 py-4 rounded-none transition-all duration-300 transform hover:scale-105"
          >
            Book Your Performance Upgrade
          </Button>
          
          <Button 
            variant="outline" 
            className="border-2 border-off-white text-off-white hover:bg-off-white hover:text-black font-bold text-lg px-12 py-4 rounded-none transition-all duration-300"
          >
            Explore Our Services
          </Button>
        </div>
        
        <div className="mt-16 animate-bounce">
          <ArrowDown className="mx-auto text-burnt-orange" size={32} />
        </div>
      </div>
      
      {/* Geometric accents */}
      <div className="absolute top-20 right-20 w-2 h-32 bg-burnt-orange/30 rotate-45 hidden lg:block"></div>
      <div className="absolute bottom-20 left-20 w-2 h-32 bg-chocolate/30 -rotate-45 hidden lg:block"></div>
    </section>
  );
};
