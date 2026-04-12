
import React from 'react';
import Header from '@/components/Header';
import { Hero } from '@/components/Hero';
import { WhatWeDo } from '@/components/WhatWeDo';
import { BrandsWeServe } from '@/components/BrandsWeServe';
import { ServiceGrid } from '@/components/ServiceGrid';
import { PPFCeramicSection } from '@/components/PPFCeramicSection';
import { WhyChooseUs } from '@/components/WhyChooseUs';
import { Reviews } from '@/components/Reviews';

import { FAQ } from '@/components/FAQ';
import { FinalCTA } from '@/components/FinalCTA';
import { Footer } from '@/components/Footer';
import { ChatBot } from '@/components/ChatBot/ChatBot';

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-off-white">
      <Header />
      <div id="home">
        <Hero />
      </div>
      <WhatWeDo />
      <BrandsWeServe />
      <div id="services">
        <ServiceGrid />
      </div>
      <PPFCeramicSection />
      
      <div id="about">
        <WhyChooseUs />
      </div>
      <Reviews />
      <div id="faq">
        <FAQ />
      </div>
      <FinalCTA />
      <Footer />
      <ChatBot />
    </div>
  );
};

export default Index;
