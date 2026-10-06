
import React from 'react';
import { LocalizedLink as Link } from '@/components/LocalizedLink';
import { useSeo } from '@/hooks/use-seo';
import Header from '@/components/Header';
import { AnswerBlock } from '@/components/AnswerBlock';
import { Footer } from '@/components/Footer';
import TuningConfigurator from '@/components/TuningConfigurator';
import TuningConfigurationDetails from '@/components/TuningConfigurationDetails';
import { tuningCars } from '@/data/tuningCars';
import { tuningModelPages } from '@/data/tuningModelPages';
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

const exampleVehicle = tuningCars.find(car => car.id === 'amg-gt-gts')!;
const exampleStage = exampleVehicle.stages.stage1!;

const Tuning = () => {
  const { isArabic } = useLocale();
  const url = `https://digitecme.com${isArabic ? '/ar' : ''}/tuning`;
  const title = isArabic ? arTuning.seo.title : 'Car Performance Tuning Dubai | ECU Remap & Prices | DIGI-TEC';
  const description = isArabic ? arTuning.seo.description : 'Car performance tuning and ECU remapping in Al Quoz, Dubai. Compare supported vehicles, stage packages, power, torque, EUR prices and workshop time.';
  const englishFaqs = [
    { question: 'How does Digi-Tec plan an ECU tuning project?', answer: 'The team starts with the vehicle, current condition, fuel, intended use and supporting hardware. The proposed calibration and any hardware requirements are then explained before work begins.' },
    { question: 'How much power can a tuned car gain?', answer: 'The result depends on the exact platform, its condition, fuel, calibration and supporting hardware. Vehicle-specific figures should be confirmed after inspection rather than treated as a universal promise.' },
    { question: 'Which cars does the Performance Configurator support?', answer: 'The configurator lists specific Mercedes-Benz and AMG models, the Aston Martin DB11 and Lamborghini Urus. Use the exact engine and package listing rather than assuming every model from a brand is covered. Porsche tuning is available by enquiry; its model and configuration details must be confirmed with the workshop.' },
    { question: 'How much does ECU or Stage 1 tuning cost in Dubai?', answer: `Price depends on the model, engine and package. For example, the ${exampleVehicle.engine} ${exampleVehicle.name} Stage 1 package is listed at ${exampleStage.price} with ${exampleStage.spec.hp} HP and an estimated ${exampleStage.time}. The comparison below shows every listed configuration in EUR. Confirm the vehicle, software version, existing modifications and final scope before booking.` },
    { question: 'Is chip tuning the same as an ECU remap?', answer: 'Chip tuning is a common search term for performance software. The listed packages describe engine software optimization or calibration, not a promise of physical chip replacement. The supported ECU and software version determine the work for the vehicle.' },
    { question: 'Are Stage 1, Stage 2 and Stage 3 the same for every vehicle?', answer: 'No. A stage is a vehicle-specific package label. The listed software, hardware, output, price and time vary by model and engine. Check each package rather than applying a universal stage definition.' },
    { question: 'Is gearbox or TCU tuning included with every engine tune?', answer: 'No. TCU software and transmission reinforcement appear only in particular package lists. For example, M178 AMG GT / GTS Stage 2 lists transmission software optimization. Confirm the package and gearbox compatibility rather than assuming every ECU tune includes it.' },
  ];
  const arabicFaqs = [
    { question: 'كيف تخطط ديجي-تك لمشروع برمجة ECU؟', answer: 'نبدأ بمراجعة السيارة وحالتها ونوع الوقود والاستخدام والقطع الداعمة، ثم نشرح المعايرة المقترحة وأي متطلبات قبل بدء العمل.' },
    { question: 'كم يمكن أن تزيد قوة السيارة بعد البرمجة؟', answer: 'تعتمد النتيجة على المنصة وحالة السيارة والوقود والمعايرة والقطع الداعمة. يجب تأكيد الأرقام الخاصة بالسيارة بعد الفحص بدلاً من اعتبارها وعداً عاماً.' },
    { question: 'ما السيارات المدرجة في مُهيئ الأداء؟', answer: 'يعرض المُهيئ طرازات محددة من Mercedes-Benz وAMG وأستون مارتن DB11 ولامبورغيني Urus. يجب مطابقة المحرك والحزمة، ولا يعني إدراج علامة دعم جميع طرازاتها. تتوفر استفسارات تطوير أداء بورش عبر الورشة مع تأكيد الطراز وتفاصيل الحزمة.' },
    { question: 'كم تبلغ تكلفة برمجة ECU أو المرحلة الأولى؟', answer: `يتحدد السعر حسب الطراز والمحرك والحزمة. مثلاً، حزمة المرحلة الأولى لمحرك ${exampleVehicle.engine} في ${exampleVehicle.name} مدرجة بسعر ${exampleStage.price} وقوة ${exampleStage.spec.hp} HP ومدة متوقعة ${exampleStage.time}. يعرض الجدول الأسعار باليورو كما نُشرت. أكّد مواصفات السيارة والبرمجة والتعديلات الحالية ونطاق العمل قبل الحجز.` },
    { question: 'هل مصطلح chip tuning يعني استبدال شريحة؟', answer: 'يُستخدم المصطلح عادة للبحث عن برمجة الأداء. تصف الحِزم المدرجة تحسين برمجة المحرك أو معايرته، ولا تعني وعداً باستبدال شريحة فعلية. تحدد وحدة ECU وإصدار البرمجة العمل المناسب للسيارة.' },
    { question: 'هل مواصفات مراحل تطوير الأداء موحدة؟', answer: 'لا. المرحلة اسم لحزمة خاصة بالسيارة. تختلف البرمجة والقطع والقوة والسعر والمدة حسب الطراز والمحرك، لذا راجع قائمة كل حزمة.' },
    { question: 'هل تشمل كل حزمة برمجة ناقل الحركة؟', answer: 'لا. تظهر برمجة TCU وتقوية ناقل الحركة في حِزم محددة فقط. مثلاً، تذكر المرحلة الثانية لمحرك M178 في AMG GT / GTS تحسين برمجة ناقل الحركة. أكّد توافق ناقل الحركة ونطاق الحزمة قبل العمل.' },
  ];
  const tuningFaqs = isArabic ? arabicFaqs : englishFaqs;
  const tuningGraph = pageGraph([
    buildWebPage({
      url,
      name: title,
      description,
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
      description,
      image: 'https://digitecme.com/images/tuning-hero-bg.jpg',
      offers: isArabic ? [
        'برمجة وحدة التحكم ECU',
        'برمجة المرحلة الأولى',
        'برمجة المرحلة الثانية',
        'حِزم التيربو',
        'حِزم فلاتر وصناديق الهواء',
        'داون بايب وأنظمة العادم',
        'ترقيات Mercedes-AMG',
      ] : [
        'ECU Remapping',
        'Stage 1 Tuning',
        'Stage 2 Tuning',
        'Turbo Kits',
        'Airfilter and Airbox Packages',
        'Downpipes & Exhaust Systems',
        'AMG Performance Upgrades',
      ],
    }),
    ...(tuningFaqs.length > 0 ? [buildFAQ(url, tuningFaqs)!] : []),
  ]);

  useSeo({
    title,
    description,
    canonical: url,
    ogImage: 'https://digitecme.com/images/tuning-hero-bg.jpg',
    jsonLd: tuningGraph,
  });

  return (
    <div className="site-page min-h-screen bg-black text-off-white">
      <Header />
      <main>
      <section
        className="theme-dark-section relative flex min-h-[68vh] items-end overflow-hidden bg-cover bg-center bg-no-repeat sm:min-h-[74vh]"
        style={{ backgroundImage: "url('/images/tuning-hero-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,9,10,0.9)_0%,rgba(8,9,10,0.58)_48%,rgba(8,9,10,0.2)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-b from-transparent to-[#101113]" />
        <div className="relative z-10 mx-auto w-full max-w-[90rem] px-5 pb-16 pt-24 sm:px-8 sm:pb-20 lg:px-12 lg:pb-24">
          <div className="max-w-3xl">
          <span className="eyebrow mb-5">{isArabic ? arTuning.hero.eyebrow : 'Vehicle-specific performance projects · Dubai'}</span>
          <h1 className="mb-5 text-[clamp(2.75rem,5vw,5rem)] font-semibold leading-[0.98] tracking-[-0.05em]">
            <span className="text-red-600">{isArabic ? 'تطوير أداء السيارات' : 'Car Performance Tuning'}</span> {isArabic ? 'في دبي' : 'Dubai'}
          </h1>
          <p className="max-w-2xl text-base leading-8 text-white/68 sm:text-lg">
            {isArabic ? arTuning.hero.description : 'Digi-Tec plans ECU tuning around the exact vehicle, its current condition, fuel, intended use and supporting hardware. The team explains the proposed calibration and expected result before the project begins.'}
          </p>
          <p className="mt-4 text-sm text-white/48 sm:text-base">
            {isArabic ? arTuning.hero.moreInfo : 'For more info visit'}{' '}
            <a href="https://www.gad-motors.de/" target="_blank" rel="noopener noreferrer" className="text-burnt-orange hover:underline">
              www.gad-motors.de
            </a>
          </p>
          <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row">
            <a
              href={`https://wa.me/97143402223?text=${encodeURIComponent(isArabic ? arTuning.hero.whatsapp : "Hi, I'm interested in GAD performance tuning for my car.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full sm:w-auto"
            >
              {isArabic ? arTuning.hero.cta : 'Book a Tuning Consultation'}
            </a>
            <a href="#performance-configurator" className="btn-secondary w-full sm:w-auto">{isArabic ? 'استكشف الحِزم والأسعار' : 'Explore Packages & Prices'}</a>
          </div>
          <CtaAssurance className="mt-4 justify-start" />
          </div>
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

      <section id="ecu-remapping-dubai" className="border-t border-white/10 py-14 sm:py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <h2 className="text-2xl font-semibold sm:text-4xl">{isArabic ? 'برمجة ECU ومعايرة المحرك في دبي' : 'ECU tuning, remapping and engine calibration in Dubai'}</h2>
          <div className="mt-6 space-y-5 text-base leading-8 text-white/70">
            <p>{isArabic ? 'تحدد برمجة وحدة ECU طريقة إدارة المحرك للعزم والضغط والإشعال والوقود. تعتمد التغييرات المناسبة على المحرك ووحدة التحكم وإصدار البرمجة والوقود والقطع الحالية. يصف المُهيئ العمل البرمجي والمكونات لكل حزمة، مع تأكيد توافق السيارة قبل التنفيذ.' : 'Engine ECU calibration manages how the engine requests torque and controls boost, ignition and fuel delivery. The appropriate changes depend on the engine, control unit, software version, fuel and installed hardware. Our packages identify the software work and supporting components for each configuration, with compatibility confirmed before installation.'}</p>
            <h3 className="text-xl font-semibold text-off-white">{isArabic ? 'ماذا يعني chip tuning؟' : 'What does chip tuning mean?'}</h3>
            <p>{isArabic ? 'يبحث بعض المالكين عن chip tuning عند طلب تحسين برمجة الأداء. تصف الحِزم هنا تحسين برمجة المحرك ومعايرته. لا يعني المصطلح تلقائياً استبدال شريحة فعلية، ويجب تأكيد طريقة البرمجة لوحدة التحكم الخاصة بالسيارة.' : 'Owners often search for chip tuning when they mean performance software or an ECU remap. The packages here describe engine software optimization and calibration. The term does not automatically mean a physical chip is replaced; confirm the programming method for your control unit.'}</p>
            <h3 className="text-xl font-semibold text-off-white">{isArabic ? 'لماذا تختلف النتائج؟' : 'Why do performance results vary?'}</h3>
            <p>{isArabic ? 'تؤثر حالة السيارة والوقود ودرجات الحرارة والبرمجة والتعديلات السابقة في النتيجة. قارن القوة والعزم الأصليين بأرقام الحزمة المناسبة في الجدول، ثم ناقش متطلبات الفحص والعمل والقياس. لا تُطبق زيادة عامة على كل سيارة.' : 'Vehicle condition, fuel, temperature, software and previous modifications affect the result. Compare stock horsepower and torque with the reference output for the correct package below, then discuss inspection, installation and measurement requirements. A generic tuning label cannot establish a universal power gain.'}</p>
          </div>
        </div>
      </section>

      <section id="tuning-stages-and-cost" className="border-t border-white/10 bg-charcoal/20 py-14 sm:py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <h2 className="text-2xl font-semibold sm:text-4xl">{isArabic ? 'مراحل تطوير الأداء والأسعار' : 'Stage 1, Stage 2 and Stage 3 tuning: packages and cost'}</h2>
          <div className="mt-6 space-y-5 text-base leading-8 text-white/70">
            <p>{isArabic ? 'كل مرحلة حزمة خاصة بالطراز والمحرك. مثلاً، تشمل المرحلة الأولى لمحرك M178 في AMG GT / GTS فلتر هواء وتحسين برمجة المحرك، وتضيف المرحلة الثانية داون بايب بمحفز رياضي وطلاء حراري وبرمجة ناقل الحركة. تتضمن المرحلة الثالثة قطع تيربو ووقود وتقوية ناقل الحركة ضمن قائمتها. تختلف الحِزم الأخرى، وتظهر المراحل الرابعة والخامسة وVIP فقط حيث يدعمها الطراز.' : 'A stage is a model and engine package. For example, M178 AMG GT / GTS Stage 1 lists an airfilter and engine software optimization. Stage 2 adds a sport-catalyst downpipe, heat coating and transmission software. Its Stage 3 list includes turbocharger and fuel-system work plus double-clutch reinforcement. Other models have different packages. Stage 4, Stage 5 and VIP appear only where listed for that vehicle.'}</p>
            <h3 className="text-xl font-semibold text-off-white">{isArabic ? 'سعر برمجة السيارة حسب الحزمة' : 'Car tuning price in Dubai depends on the configuration'}</h3>
            <p>{isArabic ? 'راجع سعر الحزمة المحددة ومدتها وقائمة العمل في الجداول. تعرض الأسعار باليورو EUR كما وردت في المُهيئ، مع إبقاء ملاحظات السعر مثل total أو From. لا يوجد سعر موحد لبرمجة ECU أو المرحلة الأولى أو الثانية. قد تؤثر مواصفات السيارة والقطع والبرمجة الحالية والفحص في نطاق العمل النهائي.' : 'Compare the price, estimated workshop time and included work for the exact model and engine. Prices are published in EUR, with source qualifiers such as “total” or “From” retained. There is no universal ECU, Stage 1 or Stage 2 price. Vehicle identification, hardware, software version, current modifications and inspection may affect the final agreed scope.'}</p>
            <h3 className="text-xl font-semibold text-off-white">{isArabic ? 'برمجة ناقل الحركة وTCU' : 'Gearbox tuning and TCU software'}</h3>
            <p>{isArabic ? 'برمجة ECU للمحرك لا تعني تلقائياً برمجة ناقل الحركة. تذكر المرحلة الثانية من AMG GT / GTS برمجة TCU. وتظهر تقوية ناقل الحركة بشكل منفصل في حِزم أعلى لطرازات محددة. راجع القائمة الخاصة بالسيارة للتفريق بين البرمجة وتقوية القطع. لأعطال ناقل الحركة ابدأ بالفحص والإصلاح.' : 'Engine ECU tuning does not automatically include gearbox calibration. AMG GT / GTS Stage 2 explicitly lists TCU software. Transmission reinforcement is listed separately in selected higher-stage packages. Check the vehicle’s list to distinguish software from mechanical reinforcement. For a gearbox fault, start with diagnosis and repair.'} <Link to="/services/transmission-repair-dubai" className="text-burnt-orange underline">{isArabic ? 'فحص وإصلاح ناقل الحركة' : 'Transmission diagnosis and repair'}</Link></p>
          </div>
        </div>
      </section>

      {/* GAD Tuning Dubai Section */}
      <section id="gad-tuning-dubai" className="relative py-16 md:py-24 bg-black overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-off-white mb-6 leading-tight">
              {isArabic ? arTuning.content.heading : 'Performance Tuning and Supporting Hardware in Dubai'}
            </h2>
            <p className="text-base md:text-lg text-white/70 leading-relaxed mb-8">
              {isArabic ? arTuning.content.intro : 'Compare the exact Mercedes-Benz and AMG, Aston Martin DB11 and Lamborghini Urus vehicles listed in our Performance Configurator. Each engine has its own software and supporting-hardware packages. For Porsche performance tuning, contact the workshop to confirm the supported model and configuration before discussing output or price.'}
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
            <p className="mt-6 text-base leading-8 text-white/70">{isArabic ? 'تُدرج GAD Motors ديجي-تك ضمن جهات الاتصال في الإمارات بالقوز، دبي. أكّد مصدر البرمجة والقطع ونطاق العمل لكل مشروع. ' : 'GAD Motors lists DIGI-TEC as a UAE contact in Al Quoz, Dubai. Confirm the calibration source, components and work included in your individual project. '}<a href="https://www.gad-motors.de/" target="_blank" rel="noopener noreferrer" className="text-burnt-orange underline">{isArabic ? 'جهات اتصال GAD Motors' : 'GAD Motors worldwide contacts'}</a></p>
          </div>
        </div>
      </section>

      {!isArabic && <section id="mercedes-amg-tuning" className="border-t border-white/10 bg-charcoal/20 py-14 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="text-2xl font-bold sm:text-4xl">Mercedes-AMG ECU tuning and project planning</h2>
          <div className="mt-6 space-y-5 text-base leading-8 text-white/65">
            <p>Share the model, year, engine, current modifications, fuel and intended use. The starting point is the car's condition: warnings, cooling, fuel delivery, brakes, tyres and drivetrain concerns should be assessed before a performance proposal is agreed.</p>
            <h3 className="text-xl font-bold text-off-white">What do Stage 1 and Stage 2 mean?</h3>
            <p>Stage labels describe a supplier's package and vary by platform. Confirm the exact calibration, fuel requirement, hardware dependencies and testing for your vehicle. A software-focused proposal and one requiring supporting hardware have different costs and installation scope; a stage name alone does not establish suitability or a fixed power gain.</p>
            <p>Diagnostic scanning and module coding serve different needs from performance tuning. For warnings or configuration requests, start with <Link to="/services/mercedes-diagnostics-dubai" className="text-burnt-orange hover:underline">Mercedes diagnostics and supported coding</Link>. Tuning availability is confirmed separately for the ECU, gearbox and vehicle specification.</p>
          </div>
          <h3 className="mt-8 text-xl font-bold">GAD guidance and documented Mercedes projects</h3>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2">
            {[
              ['Questions to ask about a GAD tuning project', '/blog/gad-tuning-explained'],
              ['Mercedes-AMG GT tuning assessment', '/blog/mercedes-amg-gt-tuning-dubai'],
              ['AMG GT Black Series project', '/blog/mercedes-amg-gt-black-series-1300hp-build-dubai'],
              ['G63 to Brabus G800 conversion project', '/blog/g63-to-brabus-g800-conversion-dubai'],
            ].map(([label, path]) => <li key={path}><Link to={path} className="card-premium block h-full rounded-xl p-5 text-sm font-semibold text-burnt-orange hover:underline">{label}</Link></li>)}
          </ul>
          <p className="mt-5 text-sm leading-7 text-white/55">Project photographs and specifications describe those individual builds. Your proposal and expected result depend on the assessed vehicle and agreed supporting work.</p>
        </div>
      </section>}

      <section className="border-t border-white/10 py-14 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-2xl font-bold sm:text-3xl">{isArabic ? 'أسئلة حول تطوير الأداء' : 'Performance tuning questions'}</h2>
          <div className="mt-7 space-y-6">{tuningFaqs.map((faq) => <div key={faq.question}><h3 className="text-lg font-semibold">{faq.question}</h3><p className="mt-2 text-sm leading-7 text-white/65">{faq.answer}</p></div>)}</div>
        </div>
      </section>

      <TuningConfigurator />
      <TuningConfigurationDetails cars={tuningCars} isArabic={isArabic} />

      {!isArabic && <section id="model-tuning-pages" className="border-t border-white/10 py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <h2 className="text-2xl font-semibold sm:text-4xl">Compare performance tuning by model</h2>
          <p className="mt-5 max-w-3xl text-base leading-8 text-white/65">Explore engine-specific software, hardware, stage prices and workshop estimates together on each model page. The remaining supported vehicles are included in the full configurator comparison above.</p>
          <ul className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{tuningModelPages.map(model => <li key={model.path}><Link to={model.path} className="block rounded-xl border border-white/15 p-5 text-burnt-orange hover:underline">{model.name} tuning packages</Link></li>)}</ul>
        </div>
      </section>}

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
      </main>
      <Footer />
    </div>
  );
};

export default Tuning;
