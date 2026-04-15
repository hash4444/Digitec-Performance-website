
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-bg.png')" }}
      />
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/70"></div>
      {/* Ambient lighting effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-burnt-orange/5 via-transparent to-burnt-orange/5"></div>
      <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-burnt-orange/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-40 h-40 sm:w-80 sm:h-80 bg-chocolate/10 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 text-center max-w-6xl mx-auto">
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-black mb-6 sm:mb-8 leading-tight">
          <span className="text-burnt-orange">D</span>IGI-TEC
          <br />
          Performance Center
        </h1>
        
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold mb-4 sm:mb-6 text-burnt-orange">
          Where Performance Meets Precision.
        </h2>
        
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed px-4">
          Digitec Performance Center is Dubai's elite automotive workshop, built for drivers who demand more. From diagnostics to full custom tuning, we bring cutting-edge service to the world's most powerful machines.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4">
          <a
            href={`https://wa.me/97143402223?text=${encodeURIComponent("Hi, I'd like to book an appointment at Digi-Tec Performance Center.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center bg-burnt-orange hover:bg-burnt-orange/90 text-black font-bold text-base sm:text-lg px-8 sm:px-12 py-4 sm:py-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
          >
            Book Appointment
          </a>
          
          <a
            href={`https://wa.me/97143402223?text=${encodeURIComponent("Hi, I'm interested in getting a free diagnosis for my vehicle.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center border-2 border-off-white bg-off-white text-black hover:bg-white hover:text-black font-bold text-base sm:text-lg px-8 sm:px-12 py-4 sm:py-6 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Get a Free Diagnosis
          </a>
        </div>
        
        <div className="mt-12 sm:mt-16 animate-bounce">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-burnt-orange/20 rounded-2xl flex items-center justify-center mx-auto backdrop-blur-sm">
            <ArrowDown className="text-burnt-orange" size={20} />
          </div>
        </div>
      </div>
      
      {/* Geometric accents - hidden on mobile */}
      <div className="absolute top-20 right-20 w-4 h-32 bg-burnt-orange/30 rounded-full rotate-45 hidden lg:block"></div>
      <div className="absolute bottom-20 left-20 w-4 h-32 bg-chocolate/30 rounded-full -rotate-45 hidden lg:block"></div>
    </section>
  );
};
