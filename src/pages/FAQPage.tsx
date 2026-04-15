import React from 'react';
import { useSeo } from '@/hooks/use-seo';
import Header from '@/components/Header';
import { FAQ } from '@/components/FAQ';
import { FinalCTA } from '@/components/FinalCTA';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';

const FAQPage = () => {
  useSeo({
    title: 'FAQ | DIGI-TEC Performance Center Dubai',
    description: 'Find answers to common questions about luxury car servicing, ECU tuning, and performance upgrades at DIGI-TEC Performance Center Dubai.',
    canonical: 'https://digitecme.com/faq',
  });

  return (
    <div className="min-h-screen bg-black text-off-white">
      <Header />

      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-charcoal/30 to-black" />
        <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black mb-6"
          >
            Frequently Asked <span className="text-burnt-orange">Questions</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/50 text-base sm:text-lg max-w-2xl mx-auto"
          >
            Everything you need to know about our services, process, and expertise.
          </motion.p>
        </div>
      </section>

      {/* Reused FAQ component */}
      <FAQ />

      <FinalCTA />
      <Footer />
    </div>
  );
};

export default FAQPage;
