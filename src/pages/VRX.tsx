import { useSeo } from '@/hooks/use-seo';
import { buildBreadcrumb, buildService, buildWebPage, pageGraph } from '@/lib/schema';
import Header from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { useLocale } from '@/i18n/use-locale';
import { arVrx } from '@/i18n/ar-vrx';

const exteriorImage = { src: '/images/vrx-exterior.jpg', alt: 'Mercedes V-Class VRX exterior' };


const VrxPage = () => {
  const { isArabic } = useLocale();
  const consultationAreas = isArabic ? arVrx.consultation.rows : [
    { title: 'Vehicle condition', description: 'The current vehicle and its condition are reviewed before a project scope is proposed.' },
    { title: 'Intended use', description: 'Daily use, passenger needs and project goals are discussed during the consultation.' },
    { title: 'Interior plan', description: 'Seating, lighting, trim and cabin requests can be reviewed for the specific vehicle.' },
    { title: 'Exterior plan', description: 'Bodywork, finish and exterior requests can be discussed without assuming a fixed package.' },
  ];
  const processSteps = isArabic ? arVrx.process.steps : [
    { title: '1. Share the vehicle details', description: 'Send the model, year, current condition and the result you want to discuss.' },
    { title: '2. Arrange an inspection', description: 'The workshop reviews the vehicle before confirming what work may be suitable.' },
    { title: '3. Confirm the scope', description: 'Any proposed work and estimate are confirmed for that vehicle before work begins.' },
  ];

  useSeo({
    title: isArabic ? arVrx.seo.title : 'Mercedes V-Class VRX Consultation Dubai | DIGI-TEC',
    description: isArabic ? arVrx.seo.description : 'Book a vehicle-specific inspection and consultation for a Mercedes V-Class VRX project at DIGI-TEC in Al Quoz, Dubai. Scope is confirmed after review.',
    canonical: `https://digitecme.com${isArabic ? '/ar' : ''}/vrx`,
    jsonLd: (() => {
      const url = `https://digitecme.com${isArabic ? '/ar' : ''}/vrx`;
      return pageGraph([
        buildWebPage({
          url,
          name: isArabic ? arVrx.seo.title : 'Mercedes V-Class VRX Consultation | DIGI-TEC Dubai',
          description: isArabic ? arVrx.seo.description : 'Vehicle-specific inspection and consultation for a Mercedes V-Class VRX project at the DIGI-TEC workshop in Al Quoz, Dubai.',
          type: 'ItemPage',
          breadcrumbId: `${url}#breadcrumb`,
          primaryImage: exteriorImage.src,
          mainEntityId: `${url}#service`,
        }),
        buildBreadcrumb(url, [
          { name: isArabic ? 'الرئيسية' : 'Home', url: `https://digitecme.com${isArabic ? '/ar' : '/'}` },
          { name: 'VRX', url },
        ]),
        buildService({
          url,
          name: isArabic ? 'استشارة ورشة مرسيدس V-Class VRX' : 'Mercedes V-Class VRX workshop consultation',
          serviceType: isArabic ? 'فحص السيارة واستشارة مشروع التحويل' : 'Vehicle inspection and conversion-project consultation',
          description: isArabic
            ? 'خدمة فحص واستشارة خاصة بسيارة مرسيدس V-Class لمشروع VRX، تشمل مناقشة الأداء وخطة المقصورة والتصميم الخارجي في ورشة ديجي-تك بدبي.'
            : 'Vehicle-specific inspection and consultation for a Mercedes V-Class VRX project, covering performance goals, interior planning and exterior requests at DIGI-TEC in Dubai.',
          image: exteriorImage.src,
          brand: 'Mercedes-Benz',
        }),
      ]);
    })(),
  });

  return (
    <div className="site-page min-h-screen bg-black text-off-white">
      <Header />

      {/* Hero Section */}
      <section className="border-b border-white/[0.08] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto grid max-w-[90rem] items-center gap-10 px-5 sm:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16 lg:px-12">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
            <p className="eyebrow mb-5">{isArabic ? arVrx.hero.eyebrow : 'Vehicle-Specific Inspection & Consultation'}</p>
            <h1 className="text-[clamp(2.75rem,5vw,5rem)] font-semibold leading-[0.98] tracking-[-0.05em]">
              Mercedes V-Class <span className="text-red-500">VRX</span> Consultation
            </h1>
            <p className="mt-6 text-lg text-white/64 sm:text-xl">
              {isArabic ? arVrx.hero.subtitle : 'Dubai workshop consultation for a Mercedes V-Class project.'}
            </p>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/45 sm:text-base">
              {isArabic ? arVrx.hero.description : 'Discuss the vehicle, its current condition, intended use, interior or exterior requests, and performance goals before a project scope is confirmed.'}
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <img
              src="/images/vrx-hero.jpg"
              alt={isArabic ? 'مرسيدس V-Class VRX في دبي' : 'Mercedes V-Class VRX in Dubai'}
              className="aspect-[4/3] w-full rounded-lg object-cover ring-1 ring-white/10"
            />
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
              <p className="eyebrow mb-3">{isArabic ? arVrx.interior : 'Interior'}</p>
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
              alt={isArabic ? 'المقصورة الداخلية لسيارة مرسيدس V-Class VRX' : 'Mercedes V-Class VRX interior'}
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
                alt={isArabic ? 'مقاعد داخلية في مشروع مرسيدس V-Class VRX' : 'Interior seating shown for a Mercedes V-Class VRX project'}
                className="w-full h-auto rounded-2xl ring-1 ring-white/10 shadow-[0_24px_48px_-28px_rgba(0,0,0,0.8)] mb-4"
              />
              <h2 className="text-lg font-bold text-off-white mb-2">{isArabic ? arVrx.seatsTitle : 'VRX interior seating consultation'}</h2>
              <p className="text-sm text-white/50 leading-relaxed">
                {isArabic ? arVrx.seatsDescription : 'The seating shown can be reviewed as part of a vehicle-specific interior consultation. The final scope depends on the vehicle and requested design.'}
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
                alt={isArabic ? 'إضاءة داخلية في مشروع مرسيدس V-Class VRX' : 'Interior lighting shown for a Mercedes V-Class VRX project'}
                className="w-full h-auto rounded-2xl ring-1 ring-white/10 shadow-[0_24px_48px_-28px_rgba(0,0,0,0.8)] mb-4"
              />
              <h2 className="text-lg font-bold text-off-white mb-2">{isArabic ? arVrx.ambientTitle : 'Interior lighting consultation'}</h2>
              <p className="text-sm text-white/50 leading-relaxed">
                {isArabic ? arVrx.ambientDescription : 'Interior-lighting requests can be discussed during the consultation and confirmed for the specific vehicle.'}
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
              <p className="eyebrow mb-3">{isArabic ? arVrx.exterior : 'Exterior'}</p>
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
              alt={isArabic ? 'التصميم الخارجي لسيارة مرسيدس V-Class VRX' : exteriorImage.alt}
              className="w-full h-auto rounded-2xl ring-1 ring-white/10 shadow-[0_24px_48px_-28px_rgba(0,0,0,0.8)]"
            />
          </motion.div>

          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow mb-3">{isArabic ? arVrx.consultation.eyebrow : 'Consultation Areas'}</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black">
              {isArabic ? arVrx.consultation.title : 'A VRX project starts with the vehicle'}
            </h2>
            <p className="mt-4 text-sm sm:text-base text-white/55 leading-relaxed">
              {isArabic ? arVrx.consultation.intro : 'There is no one-size-fits-all specification. The workshop reviews the vehicle and requested outcome before discussing a possible project scope.'}
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {consultationAreas.map((area) => (
              <div key={area.title} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6">
                <h3 className="font-bold text-off-white">{area.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation process */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-5 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-14"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black">
              {isArabic ? arVrx.process.title : 'How a VRX consultation works'}
            </h2>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-3">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6"
              >
                <h3 className="font-bold text-red-400">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/55">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation CTA Section */}
      <section className="py-16 md:py-24 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto px-5 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-center gap-6 md:gap-10"
          >
            <div className="flex-1">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight mb-2">
                {isArabic ? arVrx.cta.title : 'VRX Project Consultation'}
              </h2>
              <p className="mt-4 text-sm text-white/55 leading-relaxed">
                {isArabic ? arVrx.cta.description : 'Request an inspection and consultation. Any proposed work, availability, timeline and estimate are confirmed only after the specific vehicle and request are reviewed.'}
              </p>
            </div>

            <a
              href={`https://wa.me/97143402223?text=${encodeURIComponent(isArabic ? arVrx.cta.whatsapp : "Hi, I would like to arrange an inspection and consultation for a Mercedes V-Class VRX project.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 w-full md:w-auto inline-flex items-center justify-center gap-3 bg-red-700 hover:bg-red-600 text-white font-bold text-xs sm:text-sm uppercase tracking-[0.14em] px-10 sm:px-12 py-4 sm:py-5 rounded-lg transition-all duration-300 hover:-translate-y-0.5 shadow-[0_10px_28px_-10px_rgba(185,28,28,0.6)]"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {isArabic ? arVrx.cta.button : 'Request a Consultation'}
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default VrxPage;
