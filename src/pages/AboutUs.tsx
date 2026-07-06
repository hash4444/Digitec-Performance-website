import React from 'react';
import { useSeo } from '@/hooks/use-seo';
import { buildBreadcrumb, buildWebPage, businessRef, pageGraph } from '@/lib/schema';
import Header from '@/components/Header';
import { WhyChooseUs } from '@/components/WhyChooseUs';
import { FinalCTA } from '@/components/FinalCTA';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, CheckCircle2, Zap, Wrench, Gauge } from 'lucide-react';

const AboutUs = () => {
  const url = 'https://digitecme.com/about';
  const aboutGraph = React.useMemo(
    () =>
      pageGraph([
        buildWebPage({
          url,
          name: 'About Digitec Performance Center | Car Workshop in Dubai',
          description:
            'Digitec Performance Center is a trusted Dubai workshop specialising in Mercedes, BMW, Audi, luxury vehicles, Chinese EVs and GAD Motors performance tuning.',
          type: 'AboutPage',
          breadcrumbId: `${url}#breadcrumb`,
        }),
        buildBreadcrumb(url, [
          { name: 'Home', url: 'https://digitecme.com/' },
          { name: 'About', url },
        ]),
        // AboutPage explicitly declares its subject as the Business.
        { '@type': 'Thing', '@id': `${url}#about`, mainEntity: businessRef },
      ]),
    [],
  );

  useSeo({
    title: 'About Digitec Performance Center | Car Workshop in Dubai',
    description: 'Digitec Performance Center is a trusted car workshop in Dubai specialising in Mercedes, BMW, Audi, luxury vehicles, Chinese EVs, and GAD Motors performance tuning.',
    canonical: 'https://digitecme.com/about',
    keywords: 'car workshop Dubai, Mercedes repair Dubai, German car specialist, GAD Motors tuning, EV repair Dubai, luxury car service',
    jsonLd: aboutGraph,
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
                About <span className="text-burnt-orange">D</span>igitec Performance Center
              </h2>
              <p className="text-white/60 text-sm sm:text-base leading-relaxed mb-4">
                Digi-Tec Performance Centre is a premier automotive service and maintenance company based in Dubai, dedicated to comprehensive vehicle care. We specialise in vehicle diagnostics, mechanical repairs, preventive maintenance, auto body repair and painting, detailing, and performance enhancement.
              </p>
              <p className="text-white/60 text-sm sm:text-base leading-relaxed mb-4">
                Backed by a team of highly qualified technicians and state-of-the-art equipment, we deliver reliable, efficient, and cost-effective automotive solutions built to the highest industry standards. Our commitment to quality workmanship, innovation, safety, and customer satisfaction has made us a trusted name in the UAE automotive sector.
              </p>
              <p className="text-white/60 text-sm sm:text-base leading-relaxed">
                Whether you're an individual vehicle owner or managing a corporate fleet, our focus is the same: exceptional service and long-term value, ensuring every vehicle that leaves our workshop operates safely, efficiently, and at peak performance.
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
                { value: '50,000+', label: 'Cars Served' },
                { value: '8,000+', label: 'Happy Clients' },
                { value: '40,000', label: 'Sq Ft Facility' },
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

      {/* Specialisations */}
      <section className="py-16 md:py-24 bg-charcoal/20">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-burnt-orange text-xs uppercase tracking-[0.3em] font-semibold mb-3">What We Specialise In</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black">
              Precision Across Every <span className="text-burnt-orange">Platform</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: Wrench,
                title: 'German & Performance Vehicles',
                text: 'Known for our expertise in German car repair in Dubai, particularly Mercedes-Benz and AMG models. Our technicians use Star Diagnostic systems and advanced tools to accurately diagnose complex mechanical, electrical, and performance issues.',
              },
              {
                icon: Zap,
                title: 'Luxury Chinese & Electric Vehicles',
                text: 'One of the few workshops in Dubai specialising in luxury Chinese and electric vehicles including Zeekr, BYD, Hongqi, Jetour, and Rox. Equipped to handle modern EV battery systems, electric drivetrains, and smart technology platforms.',
              },
              {
                icon: Gauge,
                title: 'GAD Motors Tuning Partner',
                text: 'Official partnership with GAD Motors delivering high-performance tuning solutions. From ECU remapping to full performance upgrades, we increase power and driving dynamics while maintaining reliability and safety.',
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6"
              >
                <item.icon className="w-7 h-7 text-burnt-orange mb-4" />
                <h3 className="font-bold text-base sm:text-lg mb-3">{item.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-burnt-orange text-xs uppercase tracking-[0.3em] font-semibold mb-3">Our Mission</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-6">
              Engineering Excellence, Every <span className="text-burnt-orange">Drive</span>
            </h2>
            <p className="text-white/60 text-base sm:text-lg leading-relaxed">
              To deliver high-quality automotive repair and performance services in Dubai, combining precision engineering, advanced diagnostics, and customer-focused service to keep every vehicle performing at its best.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-12 text-left">
            {[
              'German car specialists in Dubai',
              'Expertise in luxury, performance, and EVs',
              'GAD Motors performance tuning partner',
              'Dealer-level diagnostics and equipment',
              'OEM and performance-grade parts',
              'Transparent pricing, no hidden costs',
              'Fast turnaround and trusted service',
              'Servicing all major luxury marques',
            ].map((point) => (
              <div key={point} className="flex items-start gap-3 bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
                <CheckCircle2 className="w-5 h-5 text-burnt-orange shrink-0 mt-0.5" />
                <span className="text-white/70 text-sm">{point}</span>
              </div>
            ))}
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
