import React, { useState } from 'react';

import { useSeo } from '@/hooks/use-seo';
import { buildBreadcrumb, buildWebPage, pageGraph, businessRef } from '@/lib/schema';
import Header from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Gauge, Shield, Settings, Crown, ChevronDown } from 'lucide-react';
import ExteriorTabs from '@/components/VRX/ExteriorTabs';
import FounderMessage from '@/components/VRX/FounderMessage';


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
    title: 'GAD Motors V-Class VRX Dubai | Official Workshop | DIGI-TEC',
    description: 'Explore the GAD Motors V-Class VRX at DIGI-TEC Dubai, the official GAD Motors workshop partner for bespoke Mercedes V-Class performance, luxury, and conversion work.',
    canonical: 'https://digitecme.com/vrx',
    jsonLd: (() => {
      const url = 'https://digitecme.com/vrx';
      return pageGraph([
        buildWebPage({
          url,
          name: 'GAD Motors V-Class VRX | DIGI-TEC Dubai Workshop',
          description:
            'The GAD Motors V-Class VRX: bespoke Mercedes V-Class performance, luxury interior and design, available at the official GAD Motors workshop partner, DIGI-TEC Dubai.',
          type: 'ItemPage',
          breadcrumbId: `${url}#breadcrumb`,
        }),
        buildBreadcrumb(url, [
          { name: 'Home', url: 'https://digitecme.com/' },
          { name: 'VRX', url },
        ]),
        {
          '@type': 'Product',
          '@id': `${url}#product`,
          name: 'GAD Motors V-Class VRX',
          brand: { '@type': 'Brand', name: 'GAD Motors' },
          manufacturer: { '@type': 'Organization', name: 'GAD Motors', url: 'https://www.gad-motors.de/' },
          category: 'Modified Mercedes V-Class',
          description:
            'Bespoke GAD Motors V-Class VRX conversion, offered at DIGI-TEC Performance Center, the official GAD Motors workshop partner in Dubai.',
          url,
          offers: {
            '@type': 'Offer',
            availability: 'https://schema.org/InStock',
            priceCurrency: 'AED',
            seller: businessRef,
          },
        },
      ]);
    })(),
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
            className="eyebrow mb-4"
          >
            By GAD Motors · Exclusively at DIGI-TEC
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black mb-4 md:mb-6 tracking-tighter"
          >
            <span className="text-red-600">GAD Motors V-Class VRX</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-lg sm:text-xl md:text-2xl text-white/60 mb-3"
          >
            Dubai Workshop for the GAD Motors V-Class.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-sm sm:text-base md:text-lg text-white/40 max-w-2xl mx-auto leading-relaxed mb-10"
          >
            DIGI-TEC is Dubai's official GAD Motors workshop partner for the bespoke V-Class VRX: a Mercedes V-Class engineered for extreme performance, luxury, and exclusivity.
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
              className="w-full h-auto rounded-2xl ring-1 ring-white/10 shadow-[0_24px_48px_-28px_rgba(0,0,0,0.8)]"
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
              <p className="eyebrow mb-3">Interior</p>
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
              className="w-full h-auto rounded-2xl ring-1 ring-white/10 shadow-[0_24px_48px_-28px_rgba(0,0,0,0.8)]"
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
                className="w-full h-auto rounded-2xl ring-1 ring-white/10 shadow-[0_24px_48px_-28px_rgba(0,0,0,0.8)] mb-4"
              />
              <h3 className="text-lg font-bold text-off-white mb-2">Custom VRX sports seats from GAD Motors</h3>
              <p className="text-sm text-white/50 leading-relaxed">
                GAD Motors' VRX seats combine comfort, support, and outstanding design, perfectly tailored to the character of your vehicle.
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
                className="w-full h-auto rounded-2xl ring-1 ring-white/10 shadow-[0_24px_48px_-28px_rgba(0,0,0,0.8)] mb-4"
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
              <p className="eyebrow mb-3">Exterior</p>
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
              className="w-full h-auto rounded-2xl ring-1 ring-white/10 shadow-[0_24px_48px_-28px_rgba(0,0,0,0.8)]"
            />
          </motion.div>

          {/* Exterior Tabs */}
          <ExteriorTabs activeTab={activeExteriorTab} setActiveTab={setActiveExteriorTab} />
        </div>
      </section>

      {/* Series vs GAD VRX Comparison */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-5 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-14"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black">
              SERIES <span className="font-normal italic text-white/50">vs</span> <span className="text-red-600">GAD VRX</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden bg-white/[0.04] border border-white/[0.06]"
          >
            {/* Headers */}
            <div className="grid grid-cols-2">
              <div className="bg-white/[0.06] px-6 py-4">
                <h3 className="text-sm sm:text-base md:text-lg font-bold uppercase tracking-wider text-white/70">Mercedes V-Class</h3>
              </div>
              <div className="bg-red-800 px-6 py-4">
                <h3 className="text-sm sm:text-base md:text-lg font-bold uppercase tracking-wider text-white">GADVIP VRX</h3>
              </div>
            </div>

            {/* Comparison Rows */}
            {[
              { icon: '⚙️', standard: '239 hp', vrx: '920 hp' },
              { icon: '⏱️', standard: '9.5 SEK', vrx: '3.8 SEK' },
              { icon: '◎', standard: '500 Nm', vrx: '1100 Nm' },
              { icon: '🔊', standard: 'Standard sound insulation', vrx: 'Sporty exhaust sound' },
              { icon: '🛡️', standard: 'Standard Mercedes body package', vrx: 'Carbon GAD Carbon Body kit by GAD' },
              { icon: '💺', standard: 'Comfort seats', vrx: 'VIP Executive Suite Seats' },
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-2 border-t border-white/[0.06]">
                <div className="px-6 py-4 flex items-center gap-3">
                  <span className="text-base">{row.icon}</span>
                  <span className="text-sm sm:text-base text-white/60">{row.standard}</span>
                </div>
                <div className="px-6 py-4 flex items-center gap-3 bg-red-800/20">
                  <span className="text-base">{row.icon}</span>
                  <span className="text-sm sm:text-base text-red-400 font-semibold">{row.vrx}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Founder's Message */}
      <FounderMessage />

      {/* Pricing & CTA Section */}
      <section className="py-16 md:py-24 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto px-5 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-center gap-6 md:gap-10"
          >
            {/* Left: Pricing Info */}
            <div className="flex-1">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight mb-2">
                Entry-Level Model <span className="text-red-600">VRX</span>
              </h2>
              <p className="text-xl sm:text-2xl font-bold text-off-white mb-4">
                FROM €146,500
              </p>
              <p className="text-xs sm:text-sm text-white/40 leading-relaxed">
                *The price includes only the assembly of the VRX with 585 hp (without TÜV approval). Additional options and custom solutions will be charged separately.
              </p>
            </div>

            {/* Right: Recall CTA */}
            <a
              href={`https://wa.me/97143402223?text=${encodeURIComponent("Hi, I'm interested in the VRX Mercedes V-Class. Could you please get in touch with me?")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 w-full md:w-auto inline-flex items-center justify-center gap-3 bg-red-700 hover:bg-red-600 text-white font-bold text-xs sm:text-sm uppercase tracking-[0.14em] px-10 sm:px-12 py-4 sm:py-5 rounded-lg transition-all duration-300 hover:-translate-y-0.5 shadow-[0_10px_28px_-10px_rgba(185,28,28,0.6)]"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Request a Callback
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default VRX;
