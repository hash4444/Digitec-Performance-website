
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
        style={{ backgroundImage: "url('/images/tuning-hero-bg.jpg')" }}
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

      {/* GAD Tuning Dubai Section */}
      <section className="relative py-16 md:py-24 bg-black overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-off-white mb-6 leading-tight">
              GAD Tuning Dubai | GAD Motors Parts & Performance Upgrades – Digitec
            </h1>
            <p className="text-base md:text-lg text-white/70 leading-relaxed mb-8">
              At Digitec Performance Center, we offer a wide range of GAD Motors performance parts in Dubai, engineered for maximum power, reliability, and precision. Our selection includes high-performance low-pressure fuel systems, intake manifolds, turbochargers, intercooler kits, piston sets, connecting rods, gearbox upgrades, and complete turbo kits designed specifically for Mercedes-Benz AMG and other high-performance platforms. Whether you're upgrading airflow, increasing boost, or building a fully tuned engine, all GAD parts we supply are developed and tested to deliver exceptional performance under demanding conditions. As a trusted provider of GAD parts in Dubai, we ensure every component meets the highest standards of engineering and performance tuning.
            </p>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-off-white mb-4">
              GAD Motors Performance Parts in Dubai
            </h2>
            <p className="text-base md:text-lg text-white/70 leading-relaxed">
              Digitec Performance Center is a trusted destination for GAD tuning in Dubai, offering expert installation, calibration, and performance optimization backed by our partnership with GAD Motors. Our technicians specialize in high-performance and German vehicles, using GAD-certified software, precision diagnostics, and advanced tuning techniques to unlock your vehicle's full potential safely and efficiently. We provide tailored tuning solutions, fast turnaround times, and complete transparency, ensuring every upgrade is performed to the highest standard. If you're searching for GAD tuning Dubai or a reliable GAD partner, Digitec delivers the expertise, technology, and results that set us apart in the performance automotive market.
            </p>
          </div>
        </div>
      </section>

      <TuningConfigurator />

      {/* GAD Tuning Near Me Section */}
      <section className="relative py-16 md:py-24 bg-black overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-off-white mb-4">
              GAD Tuning Near Me in Dubai
            </h2>
            <p className="text-base md:text-lg text-white/70 leading-relaxed">
              If you are searching for GAD tuning Dubai, GAD Motors Dubai, or GAD partner UAE, Digitec Performance Center is your trusted destination for professional performance upgrades.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Tuning;
