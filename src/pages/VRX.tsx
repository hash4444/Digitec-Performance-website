import React, { useState } from 'react';

import { useSeo } from '@/hooks/use-seo';
import Header from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Gauge, Shield, Settings, Crown, ChevronDown } from 'lucide-react';


const specs = [
  { label: 'Engine', value: 'V6 Biturbo', icon: Settings },
  { label: 'Power', value: '300+ HP', icon: Zap },
  { label: 'Torque', value: '500+ Nm', icon: Gauge },
  { label: 'Drive', value: 'AWD', icon: Shield },
];

const features = [
  {
    title: 'Performance ECU Tuning',
    description: 'Custom GAD Motors ECU calibration for maximum power delivery and throttle response.',
  },
  {
    title: 'Sport Suspension',
    description: 'Tuned suspension system for the perfect balance of comfort and dynamic handling.',
  },
  {
    title: 'Premium Sound System',
    description: 'High-fidelity audio system engineered for an immersive listening experience.',
  },
  {
    title: 'Exclusive Wheels',
    description: 'Forged alloy wheels designed exclusively for the VRX, combining style and performance.',
  },
];


const exteriorImage = { src: '/images/vrx-exterior.jpg', alt: 'VRX Exterior by GAD Motors' };


const VRX = () => {
  const [activeExteriorTab, setActiveExteriorTab] = useState('motor');

  useSeo({
    title: 'VRX Mercedes V-Class by GAD Motors | DIGI-TEC Performance Center Dubai',
    description: 'Discover the VRX, a modified Mercedes V-Class by GAD Motors. Performance tuning, luxury interior, and bespoke design. Available exclusively at DIGI-TEC Dubai.',
    canonical: 'https://digitecme.com/vrx',
  });

  return (
    <div className="min-h-screen bg-black text-off-white">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] md:min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-charcoal/50 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,107,53,0.08)_0%,_transparent_70%)]" />

        <div className="relative z-10 text-center px-5 sm:px-6 max-w-5xl mx-auto py-20 md:py-0">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-burnt-orange text-xs sm:text-sm uppercase tracking-[0.3em] font-semibold mb-4 text-primary-foreground"
          >
            By GAD Motors
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black mb-4 md:mb-6 tracking-tighter"
          >
            <span className="text-burnt-orange text-red-600">VRX</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-lg sm:text-xl md:text-2xl text-white/60 mb-3"
          >
            Mercedes V-Class, Redefined.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-sm sm:text-base md:text-lg text-white/40 max-w-2xl mx-auto leading-relaxed mb-10"
          >
            A bespoke modified Mercedes V-Class engineered by GAD Motors, combining performance, luxury, and exclusivity into one extraordinary machine.
          </motion.p>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="relative max-w-4xl mx-auto mb-10"
          >
            <img
              src="/images/vrx-hero.jpg"
              alt="VRX Mercedes V-Class by GAD Motors"
              className="w-full h-auto rounded-3xl shadow-2xl"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="animate-bounce"
          >
            <ChevronDown className="w-6 h-6 text-burnt-orange mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* Interior Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <div className="text-center mb-12 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-burnt-orange text-xs uppercase tracking-[0.3em] font-semibold mb-3">Interior</p>
            </motion.div>
          </div>

          {/* Interior Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative max-w-4xl mx-auto mb-10 md:mb-14"
          >
            <img
              src="/images/vrx-interior.jpg"
              alt="VRX Interior by GAD Motors"
              className="w-full h-auto rounded-3xl shadow-2xl"
            />
          </motion.div>

          {/* Interior Sub Images with Content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <img
                src="/images/vrx-seats.png"
                alt="VRX Custom Seats by GAD Motors"
                className="w-full h-auto rounded-3xl shadow-2xl mb-4"
              />
              <h3 className="text-lg font-bold text-off-white mb-2">Custom VRX sports seats from GAD Motors</h3>
              <p className="text-sm text-white/50 leading-relaxed">
                GAD Motors' VRX seats combine comfort, support, and outstanding design, perfectly tailored to the character of your vehicle. Leather version: from [price] per set.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <img
                src="/images/vrx-ambient.png"
                alt="VRX Ambient Lighting by GAD Motors"
                className="w-full h-auto rounded-3xl shadow-2xl mb-4"
              />
              <h3 className="text-lg font-bold text-off-white mb-2">Backlighting technology (Ambilight)</h3>
              <p className="text-sm text-white/50 leading-relaxed">
                LED lighting for the air vents, extensive color palette
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Exterior Section */}
      <section className="py-16 md:py-24 bg-white/[0.01]">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <div className="text-center mb-12 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-burnt-orange text-xs uppercase tracking-[0.3em] font-semibold mb-3">Exterior</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative max-w-4xl mx-auto mb-10 md:mb-14"
          >
            <img
              src={exteriorImage.src}
              alt={exteriorImage.alt}
              className="w-full h-auto rounded-3xl shadow-2xl"
            />
          </motion.div>

          {/* Exterior Tabs */}
          <ExteriorTabs activeTab={activeExteriorTab} setActiveTab={setActiveExteriorTab} />
        </div>
      </section>

      {/* Performance Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <div className="text-center mb-12 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Zap className="w-6 h-6 text-burnt-orange mx-auto mb-3" />
              <p className="text-burnt-orange text-xs uppercase tracking-[0.3em] font-semibold mb-3">Performance</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black">
                Engineered for <span className="text-burnt-orange">Excellence</span>
              </h2>
            </motion.div>
          </div>

          {/* Specs Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-10 md:mb-14">
            {specs.map((spec, i) => (
              <motion.div
                key={spec.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-4 md:p-6 rounded-2xl bg-white/[0.02] border border-white/[0.04]"
              >
                <spec.icon className="w-5 h-5 text-burnt-orange mx-auto mb-2" />
                <p className="text-xs uppercase tracking-widest text-white/40 mb-1">{spec.label}</p>
                <p className="text-xl md:text-2xl font-bold text-off-white">{spec.value}</p>
              </motion.div>
            ))}
          </div>

          {/* Performance Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-burnt-orange/20 transition-all duration-300 group"
              >
                <Crown className="w-5 h-5 text-burnt-orange mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-bold mb-2 text-off-white">{feature.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 border-t border-white/[0.06]">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 text-center">
          <Crown className="w-10 h-10 text-burnt-orange mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4">
            Interested in the <span className="text-burnt-orange">VRX</span>?
          </h2>
          <p className="text-white/50 mb-8 max-w-lg mx-auto text-sm md:text-base">
            Contact our team to learn more about the VRX Mercedes V-Class and schedule an exclusive viewing at Digi-Tec Performance Center.
          </p>
          <a
            href={`https://wa.me/97143402223?text=${encodeURIComponent("Hi, I'm interested in learning more about the VRX Mercedes V-Class.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-burnt-orange hover:bg-burnt-orange/90 text-black font-bold text-sm sm:text-base px-8 sm:px-10 py-3.5 sm:py-4 rounded-2xl transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-burnt-orange/30"
          >
            Enquire Now
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default VRX;
