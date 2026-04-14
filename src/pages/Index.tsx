
import React from 'react';
import { useSeo } from '@/hooks/use-seo';
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


const Index = () => {
  useSeo({
    title: 'DIGI-TEC Performance Center – Luxury Car Repair & Tuning Dubai',
    description: "Dubai's premier luxury automotive repair and performance tuning center. Expert servicing for Mercedes, Ferrari, Porsche, Audi, Rolls Royce. OEM parts, factory-trained technicians.",
    canonical: 'https://digitec-performance.ae/',
  });

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
      
      <div id="faq">
        <FAQ />
      </div>
      <FinalCTA />
      <Footer />
      
    </div>
  );
};

export default Index;
