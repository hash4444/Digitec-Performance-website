import React from 'react';
import { useSeo } from '@/hooks/use-seo';
import { buildBreadcrumb, buildWebPage, businessRef, pageGraph } from '@/lib/schema';
import Header from '@/components/Header';
import { AnswerBlock } from '@/components/AnswerBlock';
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
import { PageIntro } from '@/components/PageIntro';

const AboutUs = () => {
  const { isArabic } = useLocale();
  const url = `https://digitecme.com${isArabic ? '/ar' : ''}/about`;
  const aboutGraph = React.useMemo(
    () =>
      pageGraph([
        buildWebPage({
          url,
          name: isArabic ? 'عن مركز ديجي-تك | ورشة سيارات في دبي' : 'About Digitec Performance Center | Car Workshop in Dubai',
          description: isArabic ? 'ديجي-تك ورشة سيارات مستقلة في القوز بدبي، تأسست عام 2002 وتعرض خدمات الفحص والصيانة والإصلاح وأعمال الهيكل واستشارات مشاريع الأداء.' : 'Digi-Tec Performance Center is an independent workshop in Al Quoz, Dubai, established in 2002, with inspection, maintenance, repair, bodywork and performance-project consultation services.',
          type: 'AboutPage',
          breadcrumbId: `${url}#breadcrumb`,
          mainEntityId: businessRef['@id'],
        }),
        buildBreadcrumb(url, [
          { name: isArabic ? 'الرئيسية' : 'Home', url: `https://digitecme.com${isArabic ? '/ar' : '/'}` },
          { name: isArabic ? 'من نحن' : 'About', url },
        ]),
      ]),
    [isArabic, url],
  );

  useSeo({
    title: isArabic ? 'عن مركز ديجي-تك | ورشة سيارات في دبي' : 'About Digitec Performance Center | Car Workshop in Dubai',
    description: isArabic ? 'تعرف على ديجي-تك، ورشة سيارات مستقلة في القوز بدبي منذ 2002 لخدمات الفحص والصيانة والإصلاح وأعمال الهيكل واستشارات مشاريع الأداء.' : 'Learn about Digi-Tec, an independent car workshop in Al Quoz, Dubai since 2002 for inspection, maintenance, repair, bodywork and performance-project consultation.',
    canonical: url,
    keywords: isArabic ? 'ورشة سيارات دبي، صيانة سيارات دبي، إصلاح سيارات دبي، فحص سيارات القوز، صيانة سيارات فاخرة' : 'car workshop Dubai, car maintenance Dubai, car repair Dubai, vehicle inspection Al Quoz, luxury car service',
    jsonLd: aboutGraph,
  });

  return (
    <div className="site-page min-h-screen bg-black text-off-white">
      <Header />

      <PageIntro
        eyebrow={isArabic ? 'من نحن' : 'Who We Are'}
        title={isArabic ? <>عن <span className="text-burnt-orange">D</span>IGI-TEC</> : <>About <span className="text-burnt-orange">D</span>IGI-TEC</>}
        description={isArabic ? 'ورشة سيارات مستقلة في دبي منذ عام 2002، لخدمات الفحص والصيانة والإصلاح للسيارات الألمانية والفاخرة وعالية الأداء والكهربائية.' : 'An independent Dubai car workshop established in 2002, offering inspection, maintenance and repair services for German, luxury, performance and electric vehicles.'}
      />
      <AnswerBlock
        question={isArabic ? 'لماذا يختار الملاك ديجي-تك في دبي؟' : 'Why do owners choose Digi-Tec in Dubai?'}
        answer={isArabic
          ? 'ديجي-تك ورشة مستقلة في دبي منذ 2002. يمكن للملاك حجز فحص خاص بالسيارة ومناقشة الصيانة والإصلاح الميكانيكي أو الكهربائي وأعمال الهيكل والعناية بالسيارة أو مشروع الأداء قبل تحديد نطاق العمل. الموقع: القوز الصناعية 3، المستودعات 11-15، دبي.'
          : 'Digi-Tec is an independent Dubai workshop established in 2002. Owners can book a vehicle-specific inspection and discuss maintenance, mechanical or electrical repair, bodywork, detailing or a performance project before the work scope is confirmed. The workshop is in Al Quoz Industrial Area 3, Warehouses 11-15, Dubai.'}
        facts={isArabic ? [
          'تأسست في دبي عام 2002',
          'فحص خاص بالسيارة قبل تحديد نطاق الإصلاح',
          'الهاتف والواتساب: +971 4 340 2223',
        ] : [
          'Established in Dubai in 2002',
          'Vehicle-specific inspection before repair scope is confirmed',
          'Call or WhatsApp +971 4 340 2223',
        ]}
      />

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
                {isArabic ? 'ديجي-تك ورشة سيارات مستقلة في دبي تأسست عام 2002. تشمل فئات الخدمة المعروضة فحص السيارة والصيانة والإصلاحات الميكانيكية والكهربائية وإصلاح الهيكل والطلاء والعناية بالسيارة واستشارات مشاريع الأداء.' : 'Digi-Tec Performance Centre is an independent Dubai car workshop established in 2002. Listed service categories include vehicle inspection, maintenance, mechanical and electrical repair, body repair, paintwork, detailing and performance-project consultation.'}
              </p>
              <p className="text-white/60 text-sm sm:text-base leading-relaxed mb-4">
                {isArabic ? 'يبدأ الموعد بتحديد السيارة والمشكلة أو الخدمة المطلوبة. بعد الفحص يمكن مناقشة النتائج والعمل المقترح قبل الاتفاق على نطاق الإصلاح.' : 'An appointment starts by identifying the vehicle and the concern or requested service. After inspection, the findings and proposed work can be discussed before the repair scope is agreed.'}
              </p>
              <p className="text-white/60 text-sm sm:text-base leading-relaxed">
                {isArabic ? 'تقع الورشة في القوز الصناعية 3، المستودعات 11–15، دبي. للحجز أو الاستفسار اتصل أو أرسل رسالة واتساب إلى +971 4 340 2223.' : 'The workshop is at Al Quoz Industrial Area 3, Warehouses 11–15, Dubai. To book or ask about a service, call or WhatsApp +971 4 340 2223.'}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { value: '2002', label: isArabic ? 'تأسست في دبي' : 'Established in Dubai' },
                { value: isArabic ? 'القوز 3' : 'Al Quoz 3', label: isArabic ? 'موقع الورشة' : 'Workshop location' },
                { value: '11–15', label: isArabic ? 'أرقام المستودعات' : 'Warehouse numbers' },
                { value: isArabic ? 'دبي' : 'Dubai', label: isArabic ? 'الإمارات العربية المتحدة' : 'United Arab Emirates' },
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
              {isArabic ? 'توضح الصور مساحات الورشة في القوز حيث تُجرى فحوص السيارات وأعمال الصيانة والإصلاح.' : 'These images show the Al Quoz workshop areas used for vehicle inspection, maintenance and repair work.'}
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
                label: isArabic ? 'ساحة الخدمة' : 'Service Floor',
              },
              {
                image: workshopLifts,
                alt: isArabic ? 'رافعات ومساحات إصلاح لدى ديجي-تك دبي' : 'Vehicle lifts and repair bays at Digi-Tec Dubai',
                label: isArabic ? 'مساحات الإصلاح' : 'Repair Bays',
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
            <p className="text-burnt-orange text-xs uppercase tracking-[0.3em] font-semibold mb-3">{isArabic ? 'فئات الخدمة' : 'Service Categories'}</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black">
              {isArabic ? <>طلبات خدمة حسب <span className="text-burnt-orange">السيارة</span></> : <>Vehicle-Specific <span className="text-burnt-orange">Service Enquiries</span></>}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: Wrench,
                title: isArabic ? 'خدمة السيارات الألمانية والفاخرة' : 'German & Luxury Vehicle Service',
                text: isArabic ? 'يمكن حجز فحص وصيانة وإصلاح لسيارات مرسيدس-بنز وBMW وأودي وبورشه وغيرها من السيارات الأوروبية والفاخرة، مع تحديد النطاق بحسب السيارة والمشكلة.' : 'Inspection, maintenance and repair can be requested for Mercedes-Benz, BMW, Audi, Porsche and other European or luxury vehicles, with the scope confirmed for the specific vehicle and concern.',
              },
              {
                icon: Zap,
                title: isArabic ? 'طلبات خدمة السيارات الصينية والكهربائية' : 'Chinese & Electric Vehicle Enquiries',
                text: isArabic ? 'يمكن الاستفسار عن فحص وخدمة سيارات مثل Zeekr وBYD وHongqi وJetour وROX. يؤكد الفريق نطاق العمل بعد معرفة الطراز والمشكلة المطلوبة.' : 'Owners of vehicles such as Zeekr, BYD, Hongqi, Jetour and ROX can request an inspection or service enquiry. The available scope is confirmed after the model and concern are reviewed.',
              },
              {
                icon: Gauge,
                title: isArabic ? 'استشارات مشاريع الأداء' : 'Performance Project Consultation',
                text: isArabic ? 'يمكن مناقشة هدف المشروع والاستخدام المطلوب وحالة السيارة قبل اقتراح أي برمجة أو تعديل. يعتمد النطاق النهائي على فحص السيارة.' : 'Performance enquiries begin with the project goal, intended use and vehicle condition. Any proposed programming or modification scope depends on a vehicle inspection.',
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
              {isArabic ? <>خطوات واضحة في كل <span className="text-burnt-orange">زيارة</span></> : <>A Clear Process, Every <span className="text-burnt-orange">Visit</span></>}
            </h2>
            <p className="text-white/60 text-base sm:text-lg leading-relaxed">
              {isArabic ? 'تقديم فحص وصيانة وإصلاح واستشارات لمشاريع السيارات في دبي، مع تحديد السيارة والمشكلة وشرح نطاق العمل المقترح قبل بدء الإصلاح.' : 'To provide vehicle inspection, maintenance, repair and project consultation in Dubai, identifying the vehicle and concern and explaining the proposed work scope before repair begins.'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-12 text-left">
            {[
              ...(isArabic ? [
                'ورشة مستقلة في دبي منذ 2002', 'فحص خاص بالسيارة قبل تحديد نطاق العمل', 'صيانة وإصلاح ميكانيكي وكهربائي', 'خدمات المحرك وناقل الحركة والتعليق والفرامل', 'إصلاح الهيكل والطلاء والعناية بالسيارة', 'استشارات مشاريع الأداء بحسب السيارة', 'شرح العمل المقترح قبل بدء الإصلاح', 'الموقع في القوز الصناعية 3',
              ] : [
                'Independent Dubai workshop since 2002', 'Vehicle-specific inspection before scope is confirmed', 'Mechanical and electrical maintenance and repair', 'Engine, transmission, suspension and brake services', 'Body repair, paintwork and detailing', 'Vehicle-specific performance-project consultation', 'Proposed work explained before repair begins', 'Located in Al Quoz Industrial Area 3',
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
              { icon: MapPin, title: isArabic ? 'الموقع' : 'Location', text: isArabic ? 'القوز الصناعية 3، المستودعات 11–15، دبي' : 'Al Quoz Industrial Area 3, Warehouses 11–15, Dubai' },
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
