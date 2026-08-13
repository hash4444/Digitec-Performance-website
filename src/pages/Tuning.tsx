
import React from 'react';
import { LocalizedLink as Link } from '@/components/LocalizedLink';
import { useSeo } from '@/hooks/use-seo';
import Header from '@/components/Header';
import { AnswerBlock } from '@/components/AnswerBlock';
import { Footer } from '@/components/Footer';
import TuningConfigurator from '@/components/TuningConfigurator';
import { TrustBar, CtaAssurance } from '@/components/TrustBar';
import { FinalCTA } from '@/components/FinalCTA';
import {
  buildBreadcrumb,
  buildFAQ,
  buildService,
  buildWebPage,
  pageGraph,
} from '@/lib/schema';
import { useLocale } from '@/i18n/use-locale';
import { arTuning } from '@/i18n/ar-tuning';

const Tuning = () => {
  const { isArabic } = useLocale();
  const url = `https://digitecme.com${isArabic ? '/ar' : ''}/tuning`;
  const englishFaqs = [
    { question: 'Is Digitec an official GAD Motors partner in Dubai?', answer: 'Yes. Digitec Performance Center is the official GAD Motors partner in the UAE, providing genuine GAD ECU files, parts and turbo kits with full factory support.' },
    { question: 'How much power can I gain from GAD tuning?', answer: 'Power gains depend on the platform and the chosen GAD stage. Mercedes AMG models typically gain meaningful horsepower and torque per stage, with hardware upgrades unlocking further gains.' },
    { question: 'Which cars do you tune?', answer: 'We tune Mercedes-Benz and AMG, Porsche, Audi, BMW and other German performance cars, including hardware projects with turbos, intercoolers and intake manifolds.' },
  ];
  const arabicFaqs = [
    { question: 'هل ديجي-تك شريك رسمي لـGAD Motors في دبي؟', answer: 'نعم. ديجي-تك بيرفورمانس سنتر هو الشريك الرسمي لـGAD Motors في الإمارات، ويقدم برمجيات GAD الأصلية وقطع الأداء وحِزم التيربو بدعم فني مباشر.' },
    { question: 'كم يمكن أن تزيد قوة السيارة مع برمجة GAD؟', answer: 'تعتمد الزيادة على منصة السيارة ومرحلة التطوير وحالتها والقطع الداعمة. نبدأ بفحص أساسي ثم نوضح أرقام القوة والعزم المتوقعة لكل مرحلة.' },
    { question: 'ما السيارات التي تطورون أداءها؟', answer: 'نطور سيارات مرسيدس وAMG وبورش وأودي وBMW وغيرها من السيارات الألمانية وعالية الأداء، بما يشمل مشاريع التيربو والإنتركولر ومجمعات السحب.' },
  ];
  const tuningFaqs = isArabic ? arabicFaqs : englishFaqs;
  const tuningGraph = pageGraph([
    buildWebPage({
      url,
      name: isArabic ? arTuning.seo.title : 'GAD Tuning Dubai | Official GAD Motors Partner | Digitec',
      description: isArabic ? arTuning.seo.description : 'Official GAD Motors partner in Dubai. ECU tuning, turbo kits and AMG upgrades with proven power gains and reliability.',
      breadcrumbId: `${url}#breadcrumb`,
      primaryImage: 'https://digitecme.com/images/tuning-hero-bg.jpg',
    }),
    buildBreadcrumb(url, [
      { name: isArabic ? 'الرئيسية' : 'Home', url: `https://digitecme.com${isArabic ? '/ar' : '/'}` },
      { name: isArabic ? 'تطوير الأداء' : 'Tuning', url },
    ]),
    buildService({
      url,
      name: isArabic ? 'برمجة GAD في دبي' : 'GAD Tuning Dubai',
      serviceType: isArabic ? 'برمجة ECU وترقيات أداء GAD' : 'GAD Tuning & ECU Performance Upgrades',
      description: isArabic ? arTuning.seo.description : 'Official GAD Motors partner in Dubai. ECU tuning, performance parts, turbo kits, intake manifolds and AMG upgrades for German vehicles.',
      image: 'https://digitecme.com/images/tuning-hero-bg.jpg',
      brand: 'GAD Motors',
      offers: isArabic ? [
        'برمجة وحدة التحكم ECU',
        'برمجة المرحلة الأولى',
        'برمجة المرحلة الثانية',
        'حِزم التيربو',
        'ترقية مجمعات السحب',
        'داون بايب وأنظمة العادم',
        'ترقيات Mercedes-AMG',
      ] : [
        'ECU Remapping',
        'Stage 1 Tuning',
        'Stage 2 Tuning',
        'Turbo Kits',
        'Intake Manifold Upgrades',
        'Downpipes & Exhaust Systems',
        'AMG Performance Upgrades',
      ],
      keywords: [
        'GAD Tuning Dubai',
        'GAD Motors Dubai',
        'ECU Tuning Dubai',
        'ECU Remapping Dubai',
        'AMG Tuning Dubai',
        'Performance Tuning Dubai',
      ],
    }),
    ...(tuningFaqs.length > 0 ? [buildFAQ(url, tuningFaqs)!] : []),
  ]);

  useSeo({
    title: isArabic ? arTuning.seo.title : 'GAD Tuning Dubai | Official GAD Motors Partner | Digitec',
    description: isArabic ? arTuning.seo.description : 'Official GAD Motors partner in Dubai. ECU tuning, turbo kits and AMG upgrades with proven power gains and reliability. Book your tuning session today.',
    canonical: url,
    keywords: isArabic ? arTuning.seo.keywords : 'GAD tuning Dubai, GAD Motors Dubai, GAD partner UAE, ECU tuning Dubai, Mercedes AMG tuning, performance tuning Dubai, GAD parts Dubai, turbo upgrade Dubai',
    ogImage: 'https://digitecme.com/images/tuning-hero-bg.jpg',
    jsonLd: tuningGraph,
  });

  return (
    <div className="min-h-screen bg-black text-off-white">
      <Header />
      <section
        className="relative min-h-[60vh] md:min-h-[80vh] flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/tuning-hero-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute bottom-0 inset-x-0 h-24 sm:h-32 bg-gradient-to-b from-transparent to-black" />
        <div className="relative z-10 text-center px-5 sm:px-6 max-w-4xl mx-auto py-12 md:py-0">
          <span className="eyebrow mb-4 sm:mb-6">{isArabic ? arTuning.hero.eyebrow : 'Official GAD Motors Partner · UAE'}</span>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 md:mb-6 tracking-tight">
            <span className="text-red-600">{isArabic ? arTuning.hero.titlePrefix : 'GAD Motors'}</span> {isArabic ? arTuning.hero.titleSuffix : 'Performance Tuning'}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-off-white/80 max-w-2xl mx-auto leading-relaxed">
            {isArabic ? arTuning.hero.description : 'At Digi-Tec, we work in partnership with GAD Motors to provide high-performance ECU tuning solutions engineered to the highest standards. GAD Motors is known for its precision tuning and extensive testing, allowing us to offer optimized power gains, improved torque, and enhanced driving dynamics while maintaining engine reliability and safety.'}
          </p>
          <p className="text-sm sm:text-base md:text-lg text-off-white/60 mt-4">
            {isArabic ? arTuning.hero.moreInfo : 'For more info visit'}{' '}
            <a href="https://www.gad-motors.de/" target="_blank" rel="noopener noreferrer" className="text-burnt-orange hover:underline">
              www.gad-motors.de
            </a>
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 justify-center items-center mt-7 sm:mt-9">
            <a
              href={`https://wa.me/97143402223?text=${encodeURIComponent(isArabic ? arTuning.hero.whatsapp : "Hi, I'm interested in GAD performance tuning for my car.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full sm:w-auto"
            >
              {isArabic ? arTuning.hero.cta : 'Book a Tuning Consultation'}
            </a>
          </div>
          <CtaAssurance className="mt-4" />
        </div>
      </section>

      <TrustBar />
      <AnswerBlock
        question={isArabic ? 'من يقدم برمجة GAD الرسمية في الإمارات؟' : 'Who is the official GAD Motors tuning partner in the UAE?'}
        answer={isArabic
          ? 'ديجي-تك بيرفورمانس سنتر في القوز، دبي هو الشريك الرسمي لـGAD Motors في الإمارات، ويقدم برمجيات ECU الأصلية من GAD وقطع الأداء وحِزم التيربو ومجمعات السحب وترقيات مرسيدس-AMG، مع فحص السيارة قبل البرمجة ومعايرة مناسبة لحرارة الإمارات.'
          : 'Digi-Tec Performance Centre in Al Quoz, Dubai is the official GAD Motors partner in the UAE. It supplies genuine GAD ECU calibration files, performance parts, turbo kits and intake manifolds, plus Mercedes-AMG upgrades, with a vehicle health check before calibration and mapping suited to UAE ambient temperatures.'}
        facts={isArabic ? [
          'برمجيات وقطع GAD الأصلية بدعم مباشر من المصنع',
          'فحص فني قبل أي برمجة أو ترقية',
          'معايرة تراعي حرارة الإمارات ودرجات حرارة السحب',
        ] : [
          'Genuine GAD software and parts with direct factory support',
          'A vehicle health check before any calibration or upgrade',
          'Calibration that accounts for UAE ambient and intake temperatures',
        ]}
      />

      {/* GAD Tuning Dubai Section */}
      <section id="gad-tuning-dubai" className="relative py-16 md:py-24 bg-black overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-off-white mb-6 leading-tight">
              {isArabic ? arTuning.content.heading : 'GAD Tuning Dubai | GAD Motors Parts & Performance Upgrades – Digitec'}
            </h2>
            <p className="text-base md:text-lg text-white/70 leading-relaxed mb-8">
              {isArabic ? arTuning.content.intro : "If you're looking for professional ECU tuning in Dubai, Digi-Tec Performance Center offers advanced performance upgrades for Mercedes, Porsche, Lamborghini, Aston Martin, and the VRX Mercedes. Our tuning solutions are developed in partnership with GAD Motors, ensuring maximum power gains, reliability, and precision engineering tailored to your car."}
            </p>
            <p className="text-base md:text-lg text-white/70 leading-relaxed mb-8">
              {isArabic ? 'استكشف ' : 'Explore the '}<Link to="/vrx" className="text-burnt-orange hover:underline font-semibold">{isArabic ? arTuning.content.vrx : 'GAD Motors V-Class VRX at our Dubai workshop'}</Link> {isArabic ? arTuning.content.vrxSuffix : '— a bespoke Mercedes V-Class project combining GAD performance engineering with a luxury conversion.'}
            </p>
            <p className="text-base md:text-lg text-white/70 leading-relaxed mb-8">
              {isArabic ? arTuning.content.parts : "At Digitec Performance Center, we offer a wide range of GAD Motors performance parts in Dubai, engineered for maximum power, reliability, and precision. Our selection includes high-performance low-pressure fuel systems, intake manifolds, turbochargers, intercooler kits, piston sets, connecting rods, gearbox upgrades, and complete turbo kits designed specifically for Mercedes-Benz AMG and other high-performance platforms. Whether you're upgrading airflow, increasing boost, or building a fully tuned engine, all GAD parts we supply are developed and tested to deliver exceptional performance under demanding conditions. As a trusted provider of GAD parts in Dubai, we ensure every component meets the highest standards of engineering and performance tuning."}
            </p>
            <h3 id="gad-parts-dubai" className="text-xl sm:text-2xl md:text-3xl font-bold text-off-white mb-4">
              {isArabic ? arTuning.content.partsHeading : 'GAD Motors Performance Parts in Dubai'}
            </h3>
            <p className="text-base md:text-lg text-white/70 leading-relaxed">
              {isArabic ? arTuning.content.partsBody : "Digitec Performance Center is a trusted destination for GAD tuning in Dubai, offering expert installation, calibration, and performance optimization backed by our partnership with GAD Motors. Our technicians specialize in high-performance and German vehicles, using GAD-certified software, precision diagnostics, and advanced tuning techniques to unlock your vehicle's full potential safely and efficiently. We provide tailored tuning solutions, fast turnaround times, and complete transparency, ensuring every upgrade is performed to the highest standard. If you're searching for GAD tuning Dubai or a reliable GAD partner, Digitec delivers the expertise, technology, and results that set us apart in the performance automotive market."}
            </p>
          </div>
        </div>
      </section>

      <TuningConfigurator />

      {/* GAD Tuning Near Me Section */}
      <section id="gad-tuning-near-me" className="relative py-16 md:py-24 bg-black overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-off-white mb-4">
              {isArabic ? arTuning.content.nearHeading : 'GAD Tuning Near Me in Dubai'}
            </h2>
            <p className="text-base md:text-lg text-white/70 leading-relaxed mb-6">
              {isArabic ? arTuning.content.nearBody : 'If you are searching for GAD tuning Dubai, GAD Motors Dubai, or GAD partner UAE, Digitec Performance Center is your trusted destination for professional performance upgrades.'}
            </p>
            <p className="text-base md:text-lg text-white/70 leading-relaxed">
              {isArabic ? arTuning.content.nearBodyTwo : "Digi-Tec Performance Center is a trusted name for ECU tuning in Dubai, specializing in German vehicles. Whether you're searching for performance tuning near you or looking to increase horsepower and torque, our expert team delivers tailored solutions designed to enhance your driving experience while maintaining reliability and safety."}
            </p>
          </div>
        </div>
      </section>

      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Tuning;
