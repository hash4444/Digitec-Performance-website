
import React from 'react';
import { useSeo } from '@/hooks/use-seo';
import Header from '@/components/Header';
import { Footer } from '@/components/Footer';
import TuningConfigurator from '@/components/TuningConfigurator';

const Tuning = () => {
  useSeo({
    title: 'Mercedes Performance Tuning Dubai | DIGI-TEC Performance Center',
    description: 'Unleash the full potential of your Mercedes-Benz with expert performance tuning in Dubai. ECU remapping, power upgrades, and precision calibration at DIGI-TEC.',
    canonical: 'https://digitecme.com/tuning',
  });

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
            <span className="text-red-600">GAD Motors</span> Performance Tuning
          </h1>
          <p className="text-lg md:text-xl text-off-white/80 max-w-2xl mx-auto">
            At Digi-Tec, we work in partnership with GAD Motors to provide high-performance ECU tuning solutions engineered to the highest standards. GAD Motors is known for its precision tuning and extensive testing, allowing us to offer optimized power gains, improved torque, and enhanced driving dynamics while maintaining engine reliability and safety.
          </p>
          <p className="text-base md:text-lg text-off-white/60 mt-4">
            For more info visit{' '}
            <a href="https://www.gad-motors.de/" target="_blank" rel="noopener noreferrer" className="text-burnt-orange hover:underline">
              www.gad-motors.de
            </a>
          </p>
        </div>
      </section>
      <TuningConfigurator />
      <Footer />
    </div>
  );
};

export default Tuning;
