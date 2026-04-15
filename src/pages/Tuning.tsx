
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
        className="relative min-h-[60vh] md:min-h-[80vh] flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/tuning-bg.png')" }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center px-5 sm:px-6 max-w-4xl mx-auto py-12 md:py-0">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 md:mb-6 tracking-tight">
            <span className="text-red-600">GAD Motors</span> Performance Tuning
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-off-white/80 max-w-2xl mx-auto leading-relaxed">
            At Digi-Tec, we work in partnership with GAD Motors to provide high-performance ECU tuning solutions engineered to the highest standards. GAD Motors is known for its precision tuning and extensive testing, allowing us to offer optimized power gains, improved torque, and enhanced driving dynamics while maintaining engine reliability and safety.
          </p>
          <p className="text-sm sm:text-base md:text-lg text-off-white/60 mt-4">
            For more info visit{' '}
            <a href="https://www.gad-motors.de/" target="_blank" rel="noopener noreferrer" className="text-burnt-orange hover:underline">
              www.gad-motors.de
            </a>
          </p>
          <p className="text-xs sm:text-sm md:text-base text-off-white/50 mt-5 max-w-3xl mx-auto leading-relaxed">
            If you're looking for professional ECU tuning in Dubai, Digi-Tec Performance Center offers advanced performance upgrades for Mercedes, Porsche, Lamborghini, Aston Martin, and the VRX Mercedes. Our tuning solutions are developed in partnership with GAD Motors, ensuring maximum power gains, reliability, and precision engineering tailored to your car.
          </p>
          <p className="text-xs sm:text-sm md:text-base text-off-white/50 mt-3 max-w-3xl mx-auto leading-relaxed">
            Digi-Tec Performance Center is a trusted name for ECU tuning in Dubai, specializing in German vehicles. Whether you're searching for performance tuning near you or looking to increase horsepower and torque, our expert team delivers tailored solutions designed to enhance your driving experience while maintaining reliability and safety.
          </p>
        </div>
      </section>
      <TuningConfigurator />
      <Footer />
    </div>
  );
};

export default Tuning;
