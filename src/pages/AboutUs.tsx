import React from 'react';
import { useSeo } from '@/hooks/use-seo';
import { buildBreadcrumb, buildWebPage, businessRef, pageGraph } from '@/lib/schema';
import Header from '@/components/Header';
import { WhyChooseUs } from '@/components/WhyChooseUs';
import { FinalCTA } from '@/components/FinalCTA';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { TrustBar } from '@/components/TrustBar';
import { MapPin, Phone, Mail, CheckCircle2, Zap, Wrench, Gauge } from 'lucide-react';
import workshopLuxuryBays from '@/assets/digitec-workshop-luxury-bays.jpg';
import workshopServiceFloor from '@/assets/digitec-workshop-service-floor.jpg';
import workshopLifts from '@/assets/digitec-workshop-lifts.jpg';
import porscheGt3rsWorkshop from '@/assets/porsche-gt3rs-workshop-dubai.jpg';
import ferrariEngineWorkshop from '@/assets/ferrari-engine-workshop-dubai.jpg';
import defenderWorkshop from '@/assets/defender-workshop-dubai.jpg';
import maybachWorkshop from '@/assets/maybach-workshop-dubai.jpg';
import lamborghiniWorkshop from '@/assets/lamborghini-workshop-dubai.jpg';
import porscheWorkshop from '@/assets/porsche-workshop-dubai.jpg';
import lamborghiniUrusWorkshop from '@/assets/lamborghini-urus-workshop-dubai.jpg';
import { useLocale } from '@/i18n/use-locale';

const AboutUs = () => {
  const { isArabic } = useLocale();
  const url = `https://digitecme.com${isArabic ? '/ar' : ''}/about`;
  const aboutGraph = React.useMemo(
    () =>
      pageGraph([
        buildWebPage({
          url,
          name: isArabic ? 'عن مركز ديجي-تك | ورشة سيارات في دبي' : 'About Digitec Performance Center | Car Workshop in Dubai',
          description: isArabic ? 'تعرف على مركز ديجي-تك في القوز، دبي والمتخصص في صيانة وتشخيص وإصلاح السيارات الفاخرة والألمانية والكهربائية وتطوير الأداء.' : 'Digitec Performance Center is a trusted Dubai workshop specialising in Mercedes, BMW, Audi, luxury vehicles, Chinese EVs and GAD Motors performance tuning.',
          type: 'AboutPage',
          breadcrumbId: `${url}#breadcrumb`,
        }),
        buildBreadcrumb(url, [
          { name: isArabic ? 'الرئيسية' : 'Home', url: `https://digitecme.com${isArabic ? '/ar' : '/'}` },
          { name: isArabic ? 'من نحن' : 'About', url },
        ]),
        // AboutPage explicitly declares its subject as the Business.
        { '@type': 'Thing', '@id': `${url}#about`, mainEntity: businessRef },
      ]),
    [isArabic, url],
  );

  useSeo({
    title: isArabic ? 'عن مركز ديجي-تك | ورشة سيارات في دبي' : 'About Digitec Performance Center | Car Workshop in Dubai',
    description: isArabic ? 'تعرف على مركز ديجي-تك في القوز، دبي: متخصصون في صيانة وتشخيص وإصلاح السيارات الفاخرة والألمانية والكهربائية وتطوير الأداء.' : 'Digitec Performance Center is a trusted Dubai workshop for Mercedes, BMW, Audi, luxury cars, Chinese EVs and GAD Motors tuning.',
    canonical: url,
    keywords: isArabic ? 'ورشة سيارات دبي، إصلاح مرسيدس دبي، متخصص سيارات ألمانية، GAD Motors، إصلاح سيارات كهربائية دبي، صيانة سيارات فاخرة' : 'car workshop Dubai, Mercedes repair Dubai, German car specialist, GAD Motors tuning, EV repair Dubai, luxury car service',
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
            className="eyebrow mb-4"
          >
            {isArabic ? 'من نحن' : 'Who We Are'}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black mb-6"
          >
            {isArabic ? <>عن <span className="text-burnt-orange">D</span>IGI-TEC</> : <>About <span className="text-burnt-orange">D</span>IGI-TEC</>}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-white/50 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            {isArabic ? 'ورشة سيارات رائدة في دبي، متخصصة بالسيارات الألمانية والفاخرة وعالية الأداء والكهربائية الحديثة، مع تشخيص متقدم وقطع OEM وتقنيات بمستوى الوكالة.' : 'A leading car workshop in Dubai, specialising in German, luxury, performance, and advanced electric vehicles. Expert diagnostics, OEM parts, and dealer-level technology.'}
          </motion.p>
        </div>
      </section>

      <TrustBar />

      {/* Our Story */}
      <section id="contact" className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-5 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: isArabic ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-6">
                {isArabic ? <>عن مركز <span className="text-burnt-orange">D</span>IGI-TEC للأداء</> : <>About <span className="text-burnt-orange">D</span>igitec Performance Center</>}
              </h2>
              <p className="text-white/60 text-sm sm:text-base leading-relaxed mb-4">
                {isArabic ? 'ديجي-تك مركز رائد لخدمة وصيانة السيارات في دبي، يقدم عناية شاملة تشمل التشخيص والإصلاحات الميكانيكية والصيانة الوقائية وإصلاح الهيكل والطلاء والعناية الخارجية وتطوير الأداء.' : 'Digi-Tec Performance Centre is a premier automotive service and maintenance company based in Dubai, dedicated to comprehensive vehicle care. We specialise in vehicle diagnostics, mechanical repairs, preventive maintenance, auto body repair and painting, detailing, and performance enhancement.'}
              </p>
              <p className="text-white/60 text-sm sm:text-base leading-relaxed mb-4">
                {isArabic ? 'يدعمنا فريق من الفنيين المؤهلين وأجهزة حديثة لتقديم حلول موثوقة وفعالة وفق معايير عالية. وقد جعلنا التزامنا بجودة العمل والابتكار والسلامة ورضا العملاء اسماً موثوقاً في قطاع السيارات بالإمارات.' : 'Backed by a team of highly qualified technicians and state-of-the-art equipment, we deliver reliable, efficient, and cost-effective automotive solutions built to the highest industry standards. Our commitment to quality workmanship, innovation, safety, and customer satisfaction has made us a trusted name in the UAE automotive sector.'}
              </p>
              <p className="text-white/60 text-sm sm:text-base leading-relaxed">
                {isArabic ? 'سواء كنت مالك سيارة أو تدير أسطولاً، يبقى هدفنا واحداً: خدمة استثنائية وقيمة طويلة المدى، مع التأكد من أن كل سيارة تغادر الورشة تعمل بأمان وكفاءة وفي أفضل أداء.' : "Whether you're an individual vehicle owner or managing a corporate fleet, our focus is the same: exceptional service and long-term value, ensuring every vehicle that leaves our workshop operates safely, efficiently, and at peak performance."}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { value: '40+', label: isArabic ? 'عاماً من الخبرة' : 'Years of Expertise' },
                { value: '50,000+', label: isArabic ? 'سيارة تمت خدمتها' : 'Cars Served' },
                { value: '8,000+', label: isArabic ? 'عميل راضٍ' : 'Happy Clients' },
                { value: '40,000', label: isArabic ? 'قدم مربعة' : 'Sq Ft Facility' },
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

      {/* Workshop gallery */}
      <section className="py-16 md:py-24 bg-charcoal/20">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mb-10 md:mb-12"
          >
            <p className="text-burnt-orange text-xs uppercase tracking-[0.3em] font-semibold mb-3">{isArabic ? 'داخل ديجي-تك' : 'Inside Digi-Tec'}</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4">
              {isArabic ? <>ورشتنا في <span className="text-burnt-orange">دبي</span></> : <>Our Dubai <span className="text-burnt-orange">Workshop</span></>}
            </h2>
            <p className="text-white/60 text-sm sm:text-base leading-relaxed">
              {isArabic ? 'من التشخيص المتخصص إلى الإصلاحات الميكانيكية ومشاريع الأداء، نتعامل مع كل سيارة داخل منشأتنا المجهزة في القوز.' : 'From specialist diagnostic work to mechanical repairs and performance builds, every vehicle is handled in our purpose-built Al Quoz facility.'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {[
              {
                image: workshopLuxuryBays,
                alt: isArabic ? 'سيارات فاخرة وعالية الأداء داخل ورشة ديجي-تك في دبي' : 'Luxury performance cars inside the Digi-Tec workshop in Dubai',
                label: isArabic ? 'مساحات السيارات الفاخرة والأداء' : 'Luxury & Performance Bays',
              },
              {
                image: workshopServiceFloor,
                alt: isArabic ? 'ساحة خدمة ديجي-تك للسيارات الفاخرة في القوز دبي' : 'Digi-Tec service floor with luxury vehicles in Al Quoz, Dubai',
                label: isArabic ? 'ساحة خدمة مجهزة' : 'Purpose-Built Service Floor',
              },
              {
                image: workshopLifts,
                alt: isArabic ? 'رافعات ومساحات إصلاح متخصصة لدى ديجي-تك دبي' : 'Vehicle lifts and specialist repair bays at Digi-Tec Dubai',
                label: isArabic ? 'مساحات إصلاح متخصصة' : 'Specialist Repair Bays',
              },
            ].map((photo, index) => (
              <motion.div
                key={photo.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-black aspect-[4/3]"
              >
                <img
                  src={photo.image}
                  alt={photo.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </motion.div>
            ))}
          </div>

          <div className="mt-4 md:mt-5 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {[
              {
                image: porscheGt3rsWorkshop,
                alt: isArabic ? 'بورشه GT3 RS داخل ورشة ديجي-تك في دبي' : 'Porsche GT3 RS inside the Digi-Tec workshop in Dubai',
              },
              {
                image: ferrariEngineWorkshop,
                alt: isArabic ? 'محرك فيراري داخل ورشة ديجي-تك في دبي' : 'Ferrari engine work inside the Digi-Tec workshop in Dubai',
              },
              {
                image: defenderWorkshop,
                alt: isArabic ? 'لاند روفر ديفندر داخل ورشة ديجي-تك في دبي' : 'Land Rover Defender inside the Digi-Tec workshop in Dubai',
              },
              {
                image: maybachWorkshop,
                alt: isArabic ? 'مايباخ تخضع للفحص في ورشة ديجي-تك بدبي' : 'Maybach receiving an inspection at the Digi-Tec workshop in Dubai',
              },
              {
                image: lamborghiniWorkshop,
                alt: isArabic ? 'لامبورغيني أوروس داخل ورشة ديجي-تك في دبي' : 'Lamborghini Urus inside the Digi-Tec workshop in Dubai',
              },
              {
                image: porscheWorkshop,
                alt: isArabic ? 'سيارات بورشه داخل ورشة ديجي-تك في دبي' : 'Porsche cars inside the Digi-Tec workshop in Dubai',
              },
              {
                image: lamborghiniUrusWorkshop,
                alt: isArabic ? 'لامبورغيني أوروس على الرافعة في ورشة ديجي-تك بدبي' : 'Lamborghini Urus on a lift at the Digi-Tec workshop in Dubai',
              },
            ].map((photo, index) => (
              <motion.div
                key={photo.alt}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-black aspect-[3/4]"
              >
                <img
                  src={photo.image}
                  alt={photo.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </motion.div>
            ))}
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
            <p className="text-burnt-orange text-xs uppercase tracking-[0.3em] font-semibold mb-3">{isArabic ? 'مجالات تخصصنا' : 'What We Specialise In'}</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black">
              {isArabic ? <>دقة في كل <span className="text-burnt-orange">منصة</span></> : <>Precision Across Every <span className="text-burnt-orange">Platform</span></>}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: Wrench,
                title: isArabic ? 'السيارات الألمانية وعالية الأداء' : 'German & Performance Vehicles',
                text: isArabic ? 'نمتلك خبرة في إصلاح السيارات الألمانية في دبي، خصوصاً مرسيدس-بنز وAMG، باستخدام أجهزة Star Diagnostic وأدوات متقدمة لتشخيص الأعطال الميكانيكية والكهربائية وأعطال الأداء.' : 'Known for our expertise in German car repair in Dubai, particularly Mercedes-Benz and AMG models. Our technicians use Star Diagnostic systems and advanced tools to accurately diagnose complex mechanical, electrical, and performance issues.',
              },
              {
                icon: Zap,
                title: isArabic ? 'السيارات الصينية الفاخرة والكهربائية' : 'Luxury Chinese & Electric Vehicles',
                text: isArabic ? 'من الورش المتخصصة في دبي بالسيارات الصينية الفاخرة والكهربائية مثل Zeekr وBYD وHongqi وJetour وROX، مع تجهيزات للتعامل مع البطاريات وأنظمة الدفع والمنصات الذكية.' : 'One of the few workshops in Dubai specialising in luxury Chinese and electric vehicles including Zeekr, BYD, Hongqi, Jetour, and Rox. Equipped to handle modern EV battery systems, electric drivetrains, and smart technology platforms.',
              },
              {
                icon: Gauge,
                title: isArabic ? 'شريك GAD Motors لتطوير الأداء' : 'GAD Motors Tuning Partner',
                text: isArabic ? 'شراكة رسمية مع GAD Motors لتقديم حلول تطوير أداء متقدمة، من برمجة ECU إلى الترقيات الكاملة مع الحفاظ على الاعتمادية والسلامة.' : 'Official partnership with GAD Motors delivering high-performance tuning solutions. From ECU remapping to full performance upgrades, we increase power and driving dynamics while maintaining reliability and safety.',
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
            <p className="text-burnt-orange text-xs uppercase tracking-[0.3em] font-semibold mb-3">{isArabic ? 'رسالتنا' : 'Our Mission'}</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-6">
              {isArabic ? <>تميز هندسي في كل <span className="text-burnt-orange">رحلة</span></> : <>Engineering Excellence, Every <span className="text-burnt-orange">Drive</span></>}
            </h2>
            <p className="text-white/60 text-base sm:text-lg leading-relaxed">
              {isArabic ? 'تقديم خدمات إصلاح وتطوير أداء عالية الجودة في دبي، تجمع بين الهندسة الدقيقة والتشخيص المتقدم وخدمة تركز على العميل للحفاظ على أفضل أداء لكل سيارة.' : 'To deliver high-quality automotive repair and performance services in Dubai, combining precision engineering, advanced diagnostics, and customer-focused service to keep every vehicle performing at its best.'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-12 text-left">
            {[
              ...(isArabic ? [
                'متخصصون في السيارات الألمانية في دبي', 'خبرة بالسيارات الفاخرة وعالية الأداء والكهربائية', 'شريك GAD Motors لتطوير الأداء', 'تشخيص وأجهزة بمستوى الوكالة', 'قطع OEM وقطع أداء عالية الجودة', 'أسعار واضحة بلا تكاليف مخفية', 'إنجاز سريع وخدمة موثوقة', 'خدمة أهم العلامات الفاخرة',
              ] : [
                'German car specialists in Dubai', 'Expertise in luxury, performance, and EVs', 'GAD Motors performance tuning partner', 'Dealer-level diagnostics and equipment', 'OEM and performance-grade parts', 'Transparent pricing, no hidden costs', 'Fast turnaround and trusted service', 'Servicing all major luxury marques',
              ]),
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
              {isArabic ? <>زوروا <span className="text-burnt-orange">ديجي-تك</span></> : <>Visit <span className="text-burnt-orange">Us</span></>}
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { icon: MapPin, title: isArabic ? 'الموقع' : 'Location', text: isArabic ? 'القوز الصناعية 3، مستودع 11-15، دبي' : 'Al Quoz Industrial Area 3, Warehouse No.11-15, Dubai' },
              { icon: Phone, title: isArabic ? 'الهاتف' : 'Phone', text: '+971 4 340 2223' },
              { icon: Mail, title: isArabic ? 'البريد الإلكتروني' : 'Email', text: 'info@digitecme.com' },
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

      <FinalCTA />
      <Footer />
    </div>
  );
};

export default AboutUs;
