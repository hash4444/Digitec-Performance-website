import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Phone, MessageCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useSeo } from '@/hooks/use-seo';
import { brands, getBrandBySlug } from '@/data/brands';
import { getServiceBySlug } from '@/data/services';
import {
  BRAND_OFFER_CATALOG,
  buildBreadcrumb,
  buildFAQ,
  buildWebPage,
  businessRef,
  pageGraph,
} from '@/lib/schema';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import BrandBookingForm from '@/components/BrandBookingForm';
import { BRAND_PROFILES, getServicesForBrand } from '@/data/brandServices';
import { CtaAssurance } from '@/components/TrustBar';
import { LocalizedLink as Link } from '@/components/LocalizedLink';
import { useLocale } from '@/i18n/use-locale';
import { arBrandServices, arBrandServiceNames, localizeBrandToArabic } from '@/i18n/ar-brands';
import { localizeServiceToArabic } from '@/i18n/ar-services';
import ferrariEngineWorkshop from '@/assets/ferrari-engine-workshop-dubai.jpg';
import rangeRoverWorkshop from '@/assets/range-rover-workshop-dubai.png';
import defenderWorkshop from '@/assets/defender-workshop-dubai.jpg';
import nissanWorkshop from '@/assets/nissan-workshop-dubai.jpg';
import lamborghiniWorkshop from '@/assets/lamborghini-workshop-dubai.jpg';
import porscheWorkshop from '@/assets/porsche-workshop-dubai.jpg';
import porscheGt3rsWorkshop from '@/assets/porsche-gt3rs-workshop-dubai.jpg';

const getBrandSeoCopy = (brand: { name: string; specialization: string; whyChoose: { title: string }[] }) => {
  const focusAreas = brand.whyChoose.map((w) => w.title).slice(0, 4);
  return {
    intro: `Digi-Tec Performance Centre is one of Dubai's most established independent specialists for ${brand.name}. From routine servicing to advanced performance work, our workshop in Al Quoz combines factory-grade diagnostics, genuine parts, and technicians who have spent their entire careers inside the ${brand.name} platform. Owners across Dubai, Abu Dhabi, and Sharjah trust us because we deliver dealer-level work without dealer-level downtime or cost.`,
    dubai: `The UAE climate is unforgiving on luxury vehicles. Ambient temperatures above 45°C accelerate oil degradation, stress cooling systems, and shorten the life of rubber bushings, AC components, and battery cells. Every ${brand.name} we service at Digi-Tec is inspected with Dubai conditions in mind. We use heat-rated fluids, recommend shorter service intervals where appropriate, and pay particular attention to cooling, suspension, and air-conditioning systems that bear the brunt of summer driving.`,
    expertise: `Our ${brand.name} specialisation covers ${focusAreas.join(', ')}, and the wider mechanical, electrical, and bodywork disciplines that a modern ${brand.name} demands. We invest in the same factory diagnostic platforms used by the official dealer network, which means accurate fault tracing, correct adaptation resets, and software updates that protect your resale value.`,
    parts: `Every ${brand.name} service at Digi-Tec uses genuine OEM parts and manufacturer-approved fluids by default. Where customers prefer high-quality OE-supplier or performance equivalents, we document the choice clearly and only fit components that match or exceed factory specification. Nothing leaves our workshop without a full inspection report and a transparent breakdown of work completed.`,
    cta: `If you are searching for ${brand.specialization.toLowerCase()} or a trusted ${brand.name} service centre in Dubai, Digi-Tec is ready to help. Call +971 4 340 2223, send a WhatsApp enquiry, or use the booking form on this page to receive a same-day quote and the earliest available workshop slot.`,
  };
};

const SERVICES = [
  {
    title: 'Vehicle Maintenance',
    description:
      'Scheduled servicing, fluid changes, brake work, and preventive maintenance to keep your vehicle at factory standards.',
  },
  {
    title: 'Mechanical Repairs',
    description:
      'Engine, transmission, suspension, and drivetrain repair by certified technicians using genuine parts.',
  },
  {
    title: 'Auto Body & Painting',
    description:
      'Collision repair, panel work, and colour-matched refinishing in a controlled spray-booth environment.',
  },
  {
    title: 'Detailing',
    description:
      'Paint correction, ceramic coating, PPF, and full interior detailing tailored to luxury finishes.',
  },
  {
    title: 'Electrical & Diagnostics',
    description:
      'Advanced OEM-grade diagnostics, ECU coding, and electrical system repair for modern luxury platforms.',
  },
];

const MERCEDES_SERVICE_PATHS: Record<string, string> = {
  'oil-change': '/services/mercedes-oil-change-dubai',
  'brake-repair': '/services/mercedes-brake-repair-dubai',
  'transmission-repair': '/services/mercedes-transmission-repair-dubai',
  'ac-repair': '/services/mercedes-ac-repair-dubai',
  'suspension-repair': '/services/mercedes-suspension-repair-dubai',
  'engine-diagnostics': '/services/mercedes-diagnostics-dubai',
  'mechanical-repair': '/services/mercedes-mechanical-repair-dubai',
  'steering-repair': '/services/mercedes-steering-repair-dubai',
  'battery-replacement': '/services/mercedes-battery-replacement-dubai',
  'electrical-repair': '/services/mercedes-electrical-repair-dubai',
  'exhaust-repair': '/services/mercedes-exhaust-repair-dubai',
  'fuel-system-repair': '/services/mercedes-fuel-system-repair-dubai',
  'body-repair': '/services/mercedes-body-repair-dubai',
  'tire-repair': '/services/mercedes-tire-repair-dubai',
};

// Models help search engines and AI systems understand the vehicles covered by
// each brand hub. Detailed profiles provide the fallback for newer brands.
const BRAND_MODELS: Record<string, string[]> = {
  'mercedes-benz-service-dubai': ['A-Class','C-Class','E-Class','CLA','CLS','GLA','GLC','GLE','GLS','S-Class','G-Class','AMG GT','SL','Maybach','EQ Series'],
  'maybach-service-dubai': ['Maybach S-Class','Maybach GLS','Maybach S680','Maybach S580'],
  'porsche-service-dubai': ['911','718 Cayman','718 Boxster','Panamera','Macan','Cayenne','Taycan'],
  'audi-service-dubai': ['A3','A4','A5','A6','A7','A8','Q3','Q5','Q7','Q8','RS Range','R8','e-tron'],
  'bmw-service-dubai': ['1 Series','3 Series','4 Series','5 Series','7 Series','8 Series','X1','X3','X5','X6','X7','M Range','i Range'],
  'lamborghini-service-dubai': ['Huracán','Urus','Revuelto','Aventador'],
  'bentley-service-dubai': ['Continental GT','Flying Spur','Bentayga'],
  'mclaren-service-dubai': ['720S','765LT','Artura','GT','750S'],
  'ferrari-service-dubai': ['Roma','Portofino','296','SF90','812','Purosangue'],
  'bugatti-service-dubai': ['Chiron','Divo','Mistral'],
  'land-rover-service-dubai': ['Range Rover','Range Rover Sport','Range Rover Velar','Range Rover Evoque','Defender','Discovery'],
  'range-rover-service-dubai': ['Range Rover','Range Rover Sport','Range Rover Velar','Range Rover Evoque'],
  'defender-service-dubai': ['Defender 90','Defender 110','Defender 130','Defender V8','Defender OCTA'],
  'rolls-royce-service-dubai': ['Phantom','Ghost','Cullinan','Spectre','Wraith','Dawn'],
  'aston-martin-service-dubai': ['DB12','Vantage','DBX','DBS'],
};

const getServiceProfileSlug = (brandSlug: string) => brandSlug;

const BrandPage = () => {
  const { isArabic, localizedPath } = useLocale();
  const { slug } = useParams<{ slug: string }>();
  const sourceBrand = slug ? getBrandBySlug(slug) : undefined;
  const brand = sourceBrand && isArabic ? localizeBrandToArabic(sourceBrand) : sourceBrand;
  const serviceProfileSlug = brand ? getServiceProfileSlug(brand.slug) : '';

  const brandJsonLd = React.useMemo(() => {
    if (!brand) return undefined;
    const url = `https://digitecme.com${isArabic ? '/ar' : ''}/brands/${brand.slug}`;
    const breadcrumb = buildBreadcrumb(url, [
      { name: isArabic ? 'الرئيسية' : 'Home', url: `https://digitecme.com${isArabic ? '/ar' : '/'}` },
      { name: isArabic ? 'العلامات' : 'Brands', url: `https://digitecme.com${isArabic ? '/ar' : ''}/brands` },
      { name: brand.name, url },
    ]);
    const webPage = buildWebPage({
      url,
      name: isArabic ? `صيانة وإصلاح ${brand.name} في دبي` : `${brand.name} Service & Repair in Dubai`,
      description: brand.intro,
      breadcrumbId: `${url}#breadcrumb`,
      primaryImage: brand.logo || undefined,
    });
    const models = BRAND_MODELS[brand.slug] ?? BRAND_PROFILES[serviceProfileSlug]?.models ?? [];
    const brandEntity = {
      '@type': 'Brand',
      '@id': `${url}#brand`,
      name: brand.name,
      ...(brand.logo ? { logo: brand.logo.startsWith('http') ? brand.logo : `https://digitecme.com${brand.logo}` } : {}),
    };
    const svc = {
      '@type': 'Service',
      '@id': `${url}#service`,
      name: isArabic ? `صيانة وإصلاح ${brand.name} في دبي` : `${brand.name} Service & Repair in Dubai`,
      serviceType: isArabic ? `إصلاح ${brand.name}` : `${brand.name} Repair`,
      description: brand.intro,
      url,
      provider: businessRef,
      brand: { '@id': `${url}#brand` },
      areaServed: [
        { '@type': 'City', name: isArabic ? 'دبي' : 'Dubai' },
        { '@type': 'City', name: isArabic ? 'أبوظبي' : 'Abu Dhabi' },
        { '@type': 'City', name: isArabic ? 'الشارقة' : 'Sharjah' },
        { '@type': 'Country', name: isArabic ? 'الإمارات العربية المتحدة' : 'United Arab Emirates' },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: isArabic ? `دليل خدمات ${brand.name}` : `${brand.name} Service Catalog`,
        itemListElement: (isArabic ? arBrandServices.map((service) => service.title) : BRAND_OFFER_CATALOG).map((n) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: `${brand.name} ${n}` },
        })),
      },
      ...(models.length > 0
        ? {
            audience: {
              '@type': 'Audience',
              name: isArabic ? `مالكو ${brand.name}` : `${brand.name} owners`,
            },
            isRelatedTo: models.map((m) => ({
              '@type': 'Vehicle',
              vehicleModelDate: undefined,
              manufacturer: { '@id': `${url}#brand` },
              model: m,
              name: `${brand.name} ${m}`,
            })),
          }
        : {}),
    };
    const faq = buildFAQ(
      url,
      brand.faqs.map((f) => ({ question: f.q, answer: f.a })),
    );
    return pageGraph([webPage, breadcrumb, brandEntity, svc, ...(faq ? [faq] : [])]);
  }, [brand, isArabic, serviceProfileSlug]);

  const isMercedesServiceHub = brand?.slug === 'mercedes-benz-service-dubai';

  useSeo({
    title: brand
      ? isArabic ? `إصلاح وصيانة ${brand.name} في دبي | مركز ديجي-تك` : isMercedesServiceHub ? 'Mercedes Service Dubai | Service A, B & XENTRY | Digi-Tec' : `${brand.name} Repair Dubai | Digi-Tec`
      : 'Brand Service in Dubai | Digi-Tec Performance Centre',
    description: brand
      ? isArabic ? `إصلاح وصيانة ${brand.name} في دبي: تشخيص وصيانة وفرامل وناقل حركة وتعليق وتكييف مع قطع بالمواصفات المناسبة لدى مركز ديجي-تك.` : isMercedesServiceHub ? 'Mercedes Service A and Service B in Dubai with XENTRY diagnostics, approved fluids and OEM parts. Book Digi-Tec in Al Quoz.' : `Specialist ${brand.name} repair and service in Dubai: diagnostics, maintenance, brakes, transmission, suspension and AC at Digi-Tec, Al Quoz.`
      : 'Expert luxury car maintenance, diagnostics, and performance tuning in Dubai at Digi-Tec Performance Centre.',
    canonical: brand ? `https://digitecme.com${isArabic ? '/ar' : ''}/brands/${brand.slug}` : `https://digitecme.com${isArabic ? '/ar' : '/'}`,
    noindex: !brand,
    jsonLd: brandJsonLd,
  });

  if (!brand) {
    return <Navigate to={localizedPath('/')} replace />;
  }

  const whatsappHref = `https://wa.me/97143402223?text=${encodeURIComponent(
    isArabic ? `مرحباً، أود الاستفسار عن خدمة ${brand.name} لدى مركز ديجي-تك بيرفورمانس.` : `Hi, I'd like to enquire about ${brand.name} service at Digi-Tec Performance Centre.`,
  )}`;

  const otherBrands = brands.filter((b) => b.slug !== brand.slug).slice(0, 12);
  const relatedServices = brand.relatedServices
    .map((s) => getServiceBySlug(s))
    .filter((s): s is NonNullable<ReturnType<typeof getServiceBySlug>> => Boolean(s));
  const seoCopy = isArabic ? {
    intro: `ديجي-تك مركز مستقل ومتخصص في خدمة ${brand.name} في دبي. نجمع بين التشخيص المتقدم والقطع المناسبة والفنيين ذوي الخبرة لتقديم صيانة وإصلاح واضحين من ورشتنا في القوز.`,
    dubai: `تضع حرارة الإمارات ضغطاً إضافياً على التبريد والزيوت والبطارية والمطاط والتكييف. لذلك نفحص سيارات ${brand.name} مع مراعاة ظروف دبي وطريقة الاستخدام الفعلية.`,
    expertise: `تشمل خبرتنا بسيارات ${brand.name} الصيانة والتشخيص والمحرك وناقل الحركة والتعليق والفرامل والكهرباء والتكييف، مع المعايرة والاختبار بعد الإصلاح.`,
    parts: `نستخدم قطع OEM أصلية أو بدائل موثوقة مطابقة للمواصفات، ونوثق الاختيار والأعمال والتوصيات بوضوح قبل تسليم السيارة.`,
    cta: `لحجز خدمة ${brand.name} في دبي، اتصل على +971 4 340 2223 أو أرسل رسالة واتساب أو استخدم نموذج الحجز في هذه الصفحة.`,
  } : getBrandSeoCopy(brand);
  const displayedServices = isArabic ? arBrandServices : SERVICES;
  const brandServices = getServicesForBrand(serviceProfileSlug);
  const profile = BRAND_PROFILES[serviceProfileSlug];
  const models = BRAND_MODELS[brand.slug] ?? profile?.models ?? [];
  const getServicePath = (serviceSlug: string) =>
    brand.slug === 'mercedes-benz-service-dubai'
      ? MERCEDES_SERVICE_PATHS[serviceSlug] ?? `/brands/${serviceProfileSlug}/${serviceSlug}`
      : `/brands/${serviceProfileSlug}/${serviceSlug}`;
  const isFerrari = brand.slug === 'ferrari-service-dubai';
  const isRangeRover = brand.slug === 'range-rover-service-dubai';
  const isDefender = brand.slug === 'defender-service-dubai' || brand.name === 'Defender';
  const isNissan = brand.slug === 'nissan-service-dubai';
  const isLamborghini = brand.slug === 'lamborghini-service-dubai';
  const isPorsche = brand.slug === 'porsche-service-dubai';

  return (
    <div className="min-h-screen bg-black text-off-white">
      <Header />

      {/* Hero */}
      <section className="relative bg-black overflow-hidden">
        {isFerrari || isRangeRover || isDefender || isNissan || isLamborghini || isPorsche ? (
          <>
            <img
              src={isPorsche ? porscheGt3rsWorkshop : isLamborghini ? lamborghiniWorkshop : isNissan ? nissanWorkshop : isDefender ? defenderWorkshop : isRangeRover ? rangeRoverWorkshop : ferrariEngineWorkshop}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover object-center opacity-60"
            />
            <div className="absolute inset-0 bg-black/80" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-burnt-orange/10 via-transparent to-transparent" />
        )}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-20 lg:py-24 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div>
              <div className="flex items-center gap-4 mb-5 sm:mb-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 p-2 bg-white/90 rounded-full shadow-xl flex items-center justify-center overflow-hidden">
                  {brand.logo ? (
                    <img src={brand.logo} alt={`${brand.name} logo`} className="w-full h-full object-contain" />
                  ) : (
                    <span className="text-2xl font-black text-burnt-orange">{brand.name.charAt(0)}</span>
                  )}
                </div>
                <span className="text-burnt-orange font-bold uppercase tracking-widest text-xs sm:text-sm">
                  {brand.specialization}
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 leading-tight">
                {brand.name} <span className="text-burnt-orange">{isArabic ? 'للإصلاح والصيانة في دبي' : isMercedesServiceHub ? 'Service Dubai' : 'Repair & Service Dubai'}</span>
              </h1>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 max-w-2xl">
                {brand.intro}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <MessageCircle className="w-5 h-5" />
                  {isArabic ? 'راسلنا عبر واتساب' : 'WhatsApp Us'}
                </a>
                <a href="tel:+97143402223" className="btn-secondary">
                  <Phone className="w-5 h-5" />
                  {isArabic ? 'اتصل على +971 4 340 2223' : 'Call +971 4 340 2223'}
                </a>
              </div>
              <CtaAssurance className="mt-4" align="start" text={isArabic ? 'تقييم مجاني · بلا التزام · رد خلال دقائق' : undefined} />
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-12 sm:py-20 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black mb-3 sm:mb-4">
              {isArabic ? <>خدمات <span className="text-burnt-orange">{brand.name}</span></> : <>Our <span className="text-burnt-orange">{brand.name}</span> Services</>}
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto text-sm sm:text-lg">
              {isArabic ? `عناية متكاملة بسيارات ${brand.name}، من الصيانة الدورية إلى الإصلاحات المتقدمة.` : `Comprehensive care for every ${brand.name}, from routine maintenance to advanced performance work.`}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {displayedServices.map((s) => (
              <div
                key={s.title}
                className="card-premium rounded-2xl p-6 sm:p-7 transition-all duration-300"
              >
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{s.title}</h3>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand-specific workshop capability */}
      {profile && (
        <section className="py-12 sm:py-20 bg-gradient-to-br from-charcoal/40 to-black border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black mb-3">
                {isArabic ? <>كيف نخدم <span className="text-burnt-orange">{brand.name}</span> في دبي</> : <>How We Service <span className="text-burnt-orange">{brand.name}</span> in Dubai</>}
              </h2>
              <p className="text-gray-400 max-w-3xl mx-auto text-sm sm:text-base">
                {isArabic ? `نخصص خطوات الورشة لأنظمة التشخيص ومجموعة الحركة ونقاط التآكل المرتبطة بالمناخ في سيارة ${brand.name}.` : `The workshop process is tailored to the diagnostic systems, drivetrain, and climate-related wear points of your ${brand.name}.`}
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
              <div className="card-premium rounded-2xl p-5 sm:p-6">
                <h3 className="text-lg font-bold text-off-white mb-3">{isArabic ? 'منصة التشخيص' : 'Diagnostic platform'}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{isArabic ? `أجهزة تشخيص متخصصة لسيارات ${brand.name} لتتبع الأعطال وقراءة البيانات الحية والبرمجة وإعادة ضبط الصيانة.` : `${profile.diagnosticTool} for fault tracing, live data, coding, and service resets.`}</p>
              </div>
              <div className="card-premium rounded-2xl p-5 sm:p-6">
                <h3 className="text-lg font-bold text-off-white mb-3">{isArabic ? 'الأنظمة الأساسية' : 'Core systems'}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{isArabic ? `المحرك وناقل الحركة ونظام التعليق والأنظمة الإلكترونية الخاصة بطرازات ${brand.name}.` : <>{profile.transmissionName} • {profile.suspensionType} • {profile.engineFamily}</>}</p>
              </div>
              <div className="card-premium rounded-2xl p-5 sm:p-6">
                <h3 className="text-lg font-bold text-off-white mb-3">{isArabic ? 'عناية تناسب دبي' : 'Dubai-focused care'}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{isArabic ? 'نفحص التبريد والبطارية والزيوت والإطارات والفرامل مع مراعاة حرارة دبي والازدحام وطريقة الاستخدام.' : profile.climateNote}</p>
              </div>
            </div>
            {isPorsche && (
              <figure className="max-w-xl mx-auto mt-6 sm:mt-8 rounded-2xl overflow-hidden border border-white/10 bg-black/40 flex">
                <img
                  src={porscheWorkshop}
                  alt="Porsche receiving specialist service at Digi-Tec Performance Centre in Dubai"
                  className="w-28 sm:w-36 h-36 sm:h-40 object-cover"
                  loading="lazy"
                />
                <figcaption className="p-4 sm:p-5 flex flex-col justify-center">
                  <span className="text-burnt-orange text-xs font-bold uppercase tracking-widest mb-1">Porsche workshop</span>
                  <p className="text-gray-300 text-sm leading-relaxed">Specialist care for Porsche performance, maintenance and repair in our Al Quoz workshop.</p>
                </figcaption>
              </figure>
            )}
            {models.length > 0 && (
              <div className="mt-6 sm:mt-8 card-premium rounded-2xl p-5 sm:p-6">
                <h3 className="text-lg font-bold text-off-white mb-3">{isArabic ? `طرازات ${brand.name} التي نخدمها` : `${brand.name} models we work with`}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{models.join(' • ')}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Why Choose */}
      <section className="py-12 sm:py-20 bg-gradient-to-br from-charcoal/40 to-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black mb-3 sm:mb-4">
              {isArabic ? <>لماذا يختار ملاك {brand.name} <span className="text-burnt-orange">D</span>IGI-TEC؟</> : <>Why {brand.name} Owners Choose <span className="text-burnt-orange">D</span>igi-Tec</>}
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
              {isArabic ? `خبرة فنية فعلية بأنظمة ${brand.name} وخدمة مصممة للسيارة، لا حلول عامة.` : `Real technical depth on the systems that define your ${brand.name}, not generic service copy.`}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
            {brand.whyChoose.map((item) => (
              <div
                key={item.title}
                className="card-premium rounded-2xl p-5 sm:p-6 transition-colors"
              >
                <div className="flex items-start gap-3 mb-2">
                  <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-burnt-orange flex-shrink-0 mt-1" />
                  <h3 className="text-base sm:text-lg font-bold text-off-white">{item.title}</h3>
                </div>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed pl-8">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dedicated brand-service SEO pages */}
      {brandServices.length > 0 && (
        <section className="py-12 sm:py-20 bg-black border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black mb-3">
                {brand.name} <span className="text-burnt-orange">{isArabic ? 'للإصلاح في دبي' : 'Repair Dubai'}</span> — {isArabic ? 'جميع الخدمات' : 'Every Service'}
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
                {isArabic ? `سواء كنت تبحث عن إصلاح ${brand.name} أو تغيير الزيت أو إصلاح الفرامل في دبي، ستجد صفحة مخصصة لكل خدمة.` : `Whether you searched for ${brand.name} repair Dubai, ${brand.name} oil change Dubai, or ${brand.name} brake repair Dubai, every specialist service has its own dedicated page with brand-specific parts, tools, and technical detail.`}
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              {brandServices.map((s) => (
                <Link
                  key={s.serviceSlug}
                  to={getServicePath(s.serviceSlug)}
                  className="card-premium group flex flex-col justify-between rounded-2xl p-4 sm:p-5 transition-all duration-300 min-h-[110px]"
                >
                  <span className="text-off-white font-bold text-sm sm:text-base leading-tight group-hover:text-burnt-orange">
                    {brand.name} {isArabic ? arBrandServiceNames[s.serviceSlug] ?? s.label : s.label}
                  </span>
                  <span className="inline-flex items-center gap-1 text-burnt-orange text-xs font-semibold mt-3">
                    {isArabic ? 'اعرف المزيد' : 'Learn more'} <ArrowRight className={`w-3.5 h-3.5 ${isArabic ? 'rotate-180' : ''}`} />
                  </span>
                </Link>
              ))}
            </div>
            {/* Secondary-intent keyword copy — targets "{brand} repair dubai", "{brand} oil change dubai", "{brand} brake repair dubai" */}
            <div className="max-w-4xl mx-auto mt-10 sm:mt-14 space-y-6 sm:space-y-8">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-off-white mb-2">
                  {isArabic ? `إصلاح ${brand.name} في دبي` : `${brand.name} Repair Dubai`}
                </h3>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                  {isArabic ? `إصلاح ميكانيكي وكهربائي متكامل لسيارات ${brand.name}، من المحرك وناقل الحركة إلى التعليق والفرامل والتبريد باستخدام تشخيص متقدم وقطع مناسبة.` : `Full mechanical and electrical repair for every ${brand.name} platform, from engine and transmission overhauls to suspension, brakes, and cooling system work. Our workshop in Al Quoz handles ${brand.name} repair in Dubai with genuine OEM parts and factory diagnostic tools.`}
                </p>
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-off-white mb-2">
                  {isArabic ? `تغيير زيت ${brand.name} في دبي` : `${brand.name} Oil Change Dubai`}
                </h3>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                  {isArabic ? `زيت وفلتر بالمواصفة المناسبة لسيارات ${brand.name} مع فحص متعدد النقاط وإعادة ضبط مؤشر الصيانة.` : `Manufacturer-approved oil and filter service using the correct ${brand.name} specification fluid for Dubai's climate. Every ${brand.name} oil change in Dubai includes a full multi-point inspection, service reset, and digital service record.`}
                </p>
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-off-white mb-2">
                  {isArabic ? `إصلاح فرامل ${brand.name} في دبي` : `${brand.name} Brake Repair Dubai`}
                </h3>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                  {isArabic ? `فحمات وأقراص وحساسات وكليبرات وخدمة للنظام الهيدروليكي باستخدام قطع مناسبة لسيارات ${brand.name}.` : `Pads, discs, sensors, calipers, and full hydraulic system work using genuine ${brand.name} components. Our ${brand.name} brake repair service in Dubai covers ceramic, carbon-ceramic, and standard iron setups with proper bedding-in and system bleeding.`}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Trust */}
      <section className="py-12 sm:py-20 bg-black border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="card-premium text-center rounded-2xl p-6 sm:p-10">
            <p className="text-off-white font-bold text-xl sm:text-2xl mb-2">
              {isArabic ? `موثوق لدى ملاك ${brand.name} في الإمارات` : `Trusted by ${brand.name} owners across the UAE`}
            </p>
            <p className="text-gray-400 text-sm sm:text-base mb-8">
              {isArabic ? 'قطع OEM وتشخيص متقدم وأسعار واضحة.' : 'Genuine OEM parts, factory-grade diagnostics, and transparent pricing since 2002.'}
            </p>
            <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto">
              <div>
                <div className="text-2xl sm:text-4xl font-black text-burnt-orange">50,000+</div>
                <div className="text-xs sm:text-sm text-gray-400 mt-1">{isArabic ? 'سيارة تمت خدمتها' : 'Cars Served'}</div>
              </div>
              <div>
                <div className="text-2xl sm:text-4xl font-black text-burnt-orange">8,000+</div>
                <div className="text-xs sm:text-sm text-gray-400 mt-1">{isArabic ? 'عميل راضٍ' : 'Satisfied Customers'}</div>
              </div>
              <div>
                <div className="text-2xl sm:text-4xl font-black text-burnt-orange">40,000</div>
                <div className="text-xs sm:text-sm text-gray-400 mt-1">{isArabic ? 'قدم مربعة' : 'Sq Ft Facility'}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      {/* SEO Content */}
      <section className="py-12 sm:py-20 bg-black border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <article className="space-y-8 sm:space-y-10">
            <header>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 leading-tight">
                {isArabic ? <>خدمة <span className="text-burnt-orange">{brand.name}</span> المتخصصة في دبي</> : <>Specialist <span className="text-burnt-orange">{brand.name}</span> Service in Dubai</>}
              </h2>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed">{seoCopy.intro}</p>
            </header>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-off-white mb-3">
                {isArabic ? 'خدمة تناسب ظروف القيادة في دبي' : 'Built for Dubai Driving Conditions'}
              </h3>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{seoCopy.dubai}</p>
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-off-white mb-3">
                {isArabic ? `خبرة موثوقة بسيارات ${brand.name}` : `${brand.name} Expertise You Can Verify`}
              </h3>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{seoCopy.expertise}</p>
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-off-white mb-3">
                {isArabic ? 'قطع أصلية وتقارير واضحة' : 'Genuine Parts and Transparent Reporting'}
              </h3>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{seoCopy.parts}</p>
            </div>
            <div className={`${isArabic ? 'border-r-2 pr-5 sm:pr-6' : 'border-l-2 pl-5 sm:pl-6'} border-burnt-orange`}>
              <p className="text-gray-200 text-sm sm:text-base leading-relaxed">{seoCopy.cta}</p>
            </div>
          </article>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 sm:py-20 bg-gradient-to-br from-charcoal/40 to-black border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black mb-3 sm:mb-4">
              {brand.name} <span className="text-burnt-orange">{isArabic ? 'الأسئلة الشائعة' : 'FAQs'}</span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base">
              {isArabic ? `أكثر الأسئلة التي يطرحها ملاك ${brand.name}.` : `The questions ${brand.name} owners ask us most.`}
            </p>
          </div>
          <Accordion type="single" collapsible className="space-y-3">
            {brand.faqs.map((f, i) => (
              <AccordionItem
                key={i}
                value={`q-${i}`}
                className="bg-white/[0.03] border border-white/10 rounded-2xl px-5 sm:px-6 data-[state=open]:border-burnt-orange/40"
              >
                <AccordionTrigger className={`${isArabic ? 'text-right' : 'text-left'} text-off-white font-semibold text-base sm:text-lg hover:no-underline py-5`}>
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 text-sm sm:text-base leading-relaxed pb-5">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Booking CTA + Form */}
      <section className="py-12 sm:py-20 bg-black border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 leading-tight">
                {isArabic ? <>احجز خدمة <span className="text-burnt-orange">{brand.name}</span></> : <>Book Your <span className="text-burnt-orange">{brand.name}</span> Service</>}
              </h2>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6">
                {isArabic ? 'أخبرنا عن سيارتك والخدمة المطلوبة، وسنتواصل معك عبر واتساب بعرض السعر وأقرب موعد متاح.' : 'Tell us about your car and the work you need. We will get back to you on WhatsApp with a quote and the earliest available slot.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-burnt-orange hover:bg-burnt-orange/90 text-black font-bold px-6 py-3 rounded-2xl transition-all duration-300 hover:scale-105 shadow-xl"
                >
                  <MessageCircle className="w-5 h-5" />
                  {isArabic ? 'واتساب الآن' : 'WhatsApp Now'}
                </a>
                <a
                  href="tel:+97143402223"
                  className="inline-flex items-center justify-center gap-2 bg-off-white text-black hover:bg-white font-bold px-6 py-3 rounded-2xl transition-all duration-300 shadow-xl"
                >
                  <Phone className="w-5 h-5" />
                  +971 4 340 2223
                </a>
              </div>
              <p className="text-gray-500 text-sm">
                {isArabic ? 'أو استخدم النموذج لإرسال تفاصيلك مباشرة.' : 'Or use the form to send your details directly.'}
              </p>
            </div>
            <div className="card-premium rounded-2xl p-5 sm:p-8">
              <BrandBookingForm brandName={brand.name} />
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="py-12 sm:py-20 bg-gradient-to-br from-charcoal/40 to-black border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-4xl font-black mb-3">
                {isArabic ? <>خدمات <span className="text-burnt-orange">ذات صلة</span> بـ {brand.name}</> : <>Related <span className="text-burnt-orange">Services</span> for {brand.name}</>}
              </h2>
              <p className="text-gray-400 text-sm sm:text-base">
                {isArabic ? `أكثر الخدمات التي نقدمها لملاك ${brand.name}.` : `The specialist work we do most often for ${brand.name} owners.`}
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedServices.map((sourceService) => {
                const s = isArabic ? localizeServiceToArabic(sourceService) : sourceService;
                return (
                <Link
                  key={s.slug}
                  to={`/services/${s.slug}`}
                  className="card-premium group flex flex-col rounded-2xl overflow-hidden transition-all duration-300"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-black">
                    <img
                      src={typeof s.image === 'string' ? s.image : (s.image as unknown as string)}
                      alt={s.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-base sm:text-lg font-bold text-off-white mb-2 group-hover:text-burnt-orange transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1">{s.description}</p>
                    <span className="inline-flex items-center gap-1 text-burnt-orange text-sm font-semibold">
                      {isArabic ? 'اعرف المزيد' : 'Learn more'} <ArrowRight className={`w-4 h-4 ${isArabic ? 'rotate-180' : ''}`} />
                    </span>
                  </div>
                </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Other Brands */}
      <section className="py-12 sm:py-20 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-4xl font-black mb-3">
              {isArabic ? <>علامات <span className="text-burnt-orange">أخرى</span> نخدمها</> : <>Other <span className="text-burnt-orange">Brands</span> We Service</>}
            </h2>
            <p className="text-gray-400 text-sm sm:text-base">
              {isArabic ? 'عناية متخصصة بمختلف علامات السيارات الفاخرة في ورشتنا.' : 'Specialist care for every prestige marque in our workshop.'}
            </p>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-5">
            {otherBrands.map((b) => (
              <Link
                key={b.slug}
                to={`/brands/${b.slug}`}
                className="group flex flex-col items-center gap-2 p-3 sm:p-4 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-burnt-orange/40 rounded-2xl transition-all duration-300"
                aria-label={isArabic ? `خدمة ${b.name} في دبي` : `${b.name} service in Dubai`}
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 p-2 bg-white/90 rounded-full flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform duration-300">
                  {b.logo ? (
                    <img src={b.logo} alt={isArabic ? `شعار ${b.name}` : `${b.name} logo`} className="w-full h-full object-contain" />
                  ) : (
                    <span className="text-xl font-black text-burnt-orange">{b.name.charAt(0)}</span>
                  )}
                </div>
                <span className="text-[11px] sm:text-xs text-gray-300 group-hover:text-burnt-orange text-center font-medium leading-tight">
                  {b.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BrandPage;
