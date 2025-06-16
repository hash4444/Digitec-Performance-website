
import React from 'react';
import { Hero } from '@/components/Hero';
import { WhatWeDo } from '@/components/WhatWeDo';
import { BrandsWeServe } from '@/components/BrandsWeServe';
import { ServiceGrid } from '@/components/ServiceGrid';
import { AppFeatures } from '@/components/AppFeatures';
import { WhyChooseUs } from '@/components/WhyChooseUs';
import { Reviews } from '@/components/Reviews';
import { PerformanceResults } from '@/components/PerformanceResults';
import { FAQ } from '@/components/FAQ';
import { FinalCTA } from '@/components/FinalCTA';
import { Footer } from '@/components/Footer';
import { ChatBot } from '@/components/ChatBot/ChatBot';

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-off-white">
      <Hero />
      <WhatWeDo />
      <BrandsWeServe />
      <ServiceGrid />
      <AppFeatures />
      <WhyChooseUs />
      <Reviews />
      <PerformanceResults />
      <FAQ />
      <FinalCTA />
      <Footer />
      <ChatBot />
    </div>
  );
};

export default Index;
