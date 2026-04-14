
import React from 'react';
import Header from '@/components/Header';
import { Footer } from '@/components/Footer';

const Tuning = () => {
  return (
    <div className="min-h-screen bg-black text-off-white">
      <Header />
      <section
        className="relative min-h-[80vh] flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/tuning-bg.png')" }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Mercedes <span className="text-burnt-orange">Performance Tuning</span>
          </h1>
          <p className="text-lg md:text-xl text-off-white/80 max-w-2xl mx-auto">
            Unleash the full potential of your Mercedes-Benz with our expert performance tuning solutions.
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Tuning;
