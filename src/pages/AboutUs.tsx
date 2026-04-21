import React from 'react';
import { useSeo } from '@/hooks/use-seo';
import Header from '@/components/Header';
import { WhyChooseUs } from '@/components/WhyChooseUs';
import { FinalCTA } from '@/components/FinalCTA';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, CheckCircle2, Zap, Wrench, Gauge } from 'lucide-react';

const AboutUs = () => {
  useSeo({
    title: 'About Digitec Performance Center | Car Workshop in Dubai',
    description: 'Digitec Performance Center is a trusted car workshop in Dubai specialising in Mercedes, BMW, Audi, luxury vehicles, Chinese EVs, and GAD Motors performance tuning.',
    canonical: 'https://digitecme.com/about',
    keywords: 'car workshop Dubai, Mercedes repair Dubai, German car specialist, GAD Motors tuning, EV repair Dubai, luxury car service',
  });

  return (
    <div className="min-h-screen bg-black text-off-white">
      <Header />

      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-charcoal/30 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,107,53,0.06)_0%,_transparent_70%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-burnt-orange text-xs uppercase tracking-[0.3em] font-semibold mb-4"
          >
            Who We Are
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black mb-6"
          >
            About <span className="text-burnt-orange">D</span>IGI-TEC
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-white/50 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            A leading car workshop in Dubai, specialising in German, luxury, performance, and advanced electric vehicles. Expert diagnostics, OEM parts, and dealer-level technology.
          </motion.p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-5 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-6">
                Our <span className="text-burnt-orange">Story</span>
              </h2>
              <p className="text-white/50 text-sm sm:text-base leading-relaxed mb-4">
                Founded with a singular vision: to provide the UAE's most discerning drivers with a service center that matches the caliber of their vehicles. DIGI-TEC Performance Center was built from the ground up by automotive enthusiasts who understand that luxury cars demand luxury care.
              </p>
              <p className="text-white/50 text-sm sm:text-base leading-relaxed">
                With over 40 years of combined expertise spanning German engineering, performance tuning, and bespoke modifications, our team delivers results that exceed factory standards. Every vehicle that enters our facility leaves performing at its absolute peak.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { value: '40+', label: 'Years of Expertise' },
                { value: '30,000+', label: 'Cars Served' },
                { value: '3,000+', label: 'Happy Clients' },
                { value: '10,000', label: 'Sq Ft Facility' },
              ].map((stat) => (
                <div key={stat.label} className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 text-center">
                  <div className="text-2xl sm:text-3xl font-black text-burnt-orange mb-1">{stat.value}</div>
                  <div className="text-xs text-white/40">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us (reused) */}
      <WhyChooseUs />

      {/* Contact Info */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-5 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4">
              Visit <span className="text-burnt-orange">Us</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { icon: MapPin, title: 'Location', text: 'Al Quoz Industrial Area 3, Warehouse No.11-15, Dubai' },
              { icon: Phone, title: 'Phone', text: '+971 4 340 2223' },
              { icon: Mail, title: 'Email', text: 'info@digitecme.com' },
            ].map((item) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 text-center"
              >
                <item.icon className="w-6 h-6 text-burnt-orange mx-auto mb-3" />
                <h3 className="font-bold text-sm mb-1">{item.title}</h3>
                <p className="text-white/50 text-xs leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      
      <Footer />
    </div>
  );
};

export default AboutUs;
