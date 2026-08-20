
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
    { question: 'How does Digi-Tec plan an ECU tuning project?', answer: 'The team starts with the vehicle, current condition, fuel, intended use and supporting hardware. The proposed calibration and any hardware requirements are then explained before work begins.' },
    { question: 'How much power can a tuned car gain?', answer: 'The result depends on the exact platform, its condition, fuel, calibration and supporting hardware. Vehicle-specific figures should be confirmed after inspection rather than treated as a universal promise.' },
    { question: 'Which cars can Digi-Tec assess for tuning?', answer: 'Digi-Tec assesses Mercedes-Benz and AMG, Porsche, Audi, BMW and other performance platforms for software and supporting-hardware projects in Dubai.' },
  ];
  const arabicFaqs = [
    { question: 'كيف تخطط ديجي-تك لمشروع برمجة ECU؟', answer: 'نبدأ بمراجعة السيارة وحالتها ونوع الوقود والاستخدام والقطع الداعمة، ثم نشرح المعايرة المقترحة وأي متطلبات قبل بدء العمل.' },
    { question: 'كم يمكن أن تزيد قوة السيارة بعد البرمجة؟', answer: 'تعتمد النتيجة على المنصة وحالة السيارة والوقود والمعايرة والقطع الداعمة. يجب تأكيد الأرقام الخاصة بالسيارة بعد الفحص بدلاً من اعتبارها وعداً عاماً.' },
    { question: 'ما السيارات التي يمكن تقييمها لتطوير الأداء؟', answer: 'نقيّم سيارات مرسيدس وAMG وبورش وأودي وBMW وغيرها من منصات الأداء لمشاريع البرمجة والقطع الداعمة في دبي.' },
  ];
  const tuningFaqs = isArabic ? arabicFaqs : englishFaqs;
  const tuningGraph = pageGraph([
    buildWebPage({
      url,
      name: isArabic ? arTuning.seo.title : 'Performance Tuning Dubai | ECU & Hardware Projects | Digi-Tec',
      description: isArabic ? arTuning.seo.description : 'Vehicle-specific ECU tuning and supporting-hardware projects for performance cars at Digi-Tec in Al Quoz, Dubai.',
      breadcrumbId: `${url}#breadcrumb`,
      primaryImage: 'https://digitecme.com/images/tuning-hero-bg.jpg',
      mainEntityId: `${url}#service`,
    }),
    buildBreadcrumb(url, [
      { name: isArabic ? 'الرئيسية' : 'Home', url: `https://digitecme.com${isArabic ? '/ar' : '/'}` },
      { name: isArabic ? 'تطوير الأداء' : 'Tuning', url },
    ]),
    buildService({
      url,
      name: isArabic ? 'برمجة وتطوير أداء السيارات في دبي' : 'Performance Tuning in Dubai',
      serviceType: isArabic ? 'برمجة ECU ومشاريع تطوير الأداء' : 'ECU Tuning and Performance Projects',
      description: isArabic ? arTuning.seo.description : 'Vehicle-specific ECU tuning and supporting-hardware projects for performance cars at Digi-Tec in Al Quoz, Dubai.',
      image: 'https://digitecme.com/images/tuning-hero-bg.jpg',
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
    }),
    ...(tuningFaqs.length > 0 ? [buildFAQ(url, tuningFaqs)!] : []),
  ]);

  useSeo({
    title: isArabic ? arTuning.seo.title : 'Performance Tuning Dubai | ECU & Hardware Projects | Digi-Tec',
    description: isArabic ? arTuning.seo.description : 'Vehicle-specific ECU tuning and supporting-hardware projects for performance cars at Digi-Tec in Al Quoz, Dubai.',
    canonical: url,
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
          <span className="eyebrow mb-4 sm:mb-6">{isArabic ? arTuning.hero.eyebrow : 'Vehicle-specific performance projects · Dubai'}</span>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 md:mb-6 tracking-tight">
            <span className="text-red-600">{isArabic ? arTuning.hero.titlePrefix : 'GAD Motors'}</span> {isArabic ? arTuning.hero.titleSuffix : 'Performance Tuning'}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-off-white/80 max-w-2xl mx-auto leading-relaxed">
            {isArabic ? arTuning.hero.description : 'Digi-Tec plans ECU tuning around the exact vehicle, its current condition, fuel, intended use and supporting hardware. The team explains the proposed calibration and expected result before the project begins.'}
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
        question={isArabic ? 'كيف تختار مشروع تطوير أداء مناسباً لسيارتك؟' : 'How should a performance tuning project be planned?'}
        answer={isArabic
          ? 'يبدأ المشروع المناسب بفحص حالة السيارة وتحديد نوع الوقود والاستخدام والهدف والقطع الداعمة. توضح ديجي-تك في القوز خطة المعايرة والمتطلبات والنتيجة المتوقعة قبل بدء العمل.'
          : 'A suitable project starts with the vehicle’s condition, fuel, intended use, target and supporting hardware. Digi-Tec in Al Quoz explains the calibration plan, requirements and expected result before work begins.'}
        facts={isArabic ? [
          'تقييم حالة السيارة قبل المعايرة',
          'خطة مرتبطة بالمنصة والوقود والاستخدام',
          'شرح المتطلبات والنتائج المتوقعة قبل العمل',
        ] : [
          'Vehicle-condition assessment before calibration',
          'A plan matched to the platform, fuel and intended use',
          'Requirements and expected results explained before work',
        ]}
      />

      {/* GAD Tuning Dubai Section */}
      <section id="gad-tuning-dubai" className="relative py-16 md:py-24 bg-black overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-off-white mb-6 leading-tight">
              {isArabic ? arTuning.content.heading : 'Performance Tuning and Supporting Hardware in Dubai'}
            </h2>
            <p className="text-base md:text-lg text-white/70 leading-relaxed mb-8">
              {isArabic ? arTuning.content.intro : 'Digi-Tec assesses performance projects for Mercedes, Porsche, Lamborghini, Aston Martin and other platforms. The scope is matched to the vehicle, its condition and the owner’s goal, with software and supporting hardware considered together.'}
            </p>
            <p className="text-base md:text-lg text-white/70 leading-relaxed mb-8">
              {isArabic ? 'استكشف ' : 'Explore the '}<Link to="/vrx" className="text-burnt-orange hover:underline font-semibold">{isArabic ? arTuning.content.vrx : 'GAD Motors V-Class VRX at our Dubai workshop'}</Link> {isArabic ? arTuning.content.vrxSuffix : '— a bespoke Mercedes V-Class project combining GAD performance engineering with a luxury conversion.'}
            </p>
            <p className="text-base md:text-lg text-white/70 leading-relaxed mb-8">
              {isArabic ? arTuning.content.parts : 'A project may involve fuel-system, intake, turbocharger, intercooler, engine or gearbox components depending on the platform and target. Parts are proposed only after the team reviews compatibility and the supporting systems required by the build.'}
            </p>
            <h3 id="gad-parts-dubai" className="text-xl sm:text-2xl md:text-3xl font-bold text-off-white mb-4">
              {isArabic ? arTuning.content.partsHeading : 'GAD Motors Performance Parts in Dubai'}
            </h3>
            <p className="text-base md:text-lg text-white/70 leading-relaxed">
              {isArabic ? arTuning.content.partsBody : 'Digi-Tec combines inspection, installation and calibration at its Al Quoz workshop. Owners receive a vehicle-specific proposal covering the intended software, supporting components and checks required after installation.'}
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
              {isArabic ? arTuning.content.nearBody : 'Digi-Tec provides performance-project assessment and ECU tuning from its workshop in Al Quoz Industrial Area 3, Dubai.'}
            </p>
            <p className="text-base md:text-lg text-white/70 leading-relaxed">
              {isArabic ? arTuning.content.nearBodyTwo : 'Contact the team with the make, model, year, current modifications and intended use so the appropriate inspection and project scope can be discussed.'}
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
