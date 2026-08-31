import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { LocalizedLink as Link } from '@/components/LocalizedLink';
import { Phone, MessageCircle, CheckCircle2, ArrowRight, Wrench, ShieldCheck } from 'lucide-react';
import Header from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useSeo } from '@/hooks/use-seo';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  BRAND_PROFILES,
  getBrandServiceCombo,
  getServicesForBrand,
} from '@/data/brandServices';
import { getBrandBySlug } from '@/data/brands';
import { CtaAssurance } from '@/components/TrustBar';
import {
  buildBrand,
  buildBreadcrumb,
  buildFAQ,
  buildService,
  buildWebPage,
  pageGraph,
  SITE_URL,
} from '@/lib/schema';
import { useLocale } from '@/i18n/use-locale';
import { MERCEDES_PROBLEMS_PATH } from '@/data/mercedesProblemGuides';
import {
  FERRARI_MAINTENANCE_GUIDE_PATH,
} from '@/data/ferrariModelPages';

const PORSCHE_RELATED_CONTENT: Record<string, { label: string; path: string }[]> = {
  'oil-change': [
    { label: 'Porsche 911 maintenance planning', path: '/blog/porsche-911-service-dubai-guide' },
    { label: 'Porsche Cayenne maintenance planning', path: '/blog/porsche-cayenne-service-dubai-guide' },
    { label: 'Porsche maintenance in Dubai', path: '/blog/porsche-maintenance-guide-dubai' },
  ],
  'transmission-repair': [
    { label: '911 manual and PDK systems', path: '/blog/porsche-911-service-dubai-guide' },
    { label: 'Macan PDK, PTM and driveline', path: '/porsche/macan' },
    { label: 'Panamera PDK considerations', path: '/blog/porsche-panamera-service-dubai-guide' },
  ],
  'suspension-repair': [
    { label: 'Cayenne air suspension and chassis', path: '/blog/porsche-cayenne-service-dubai-guide' },
    { label: 'Panamera PASM and air suspension', path: '/blog/porsche-panamera-service-dubai-guide' },
    { label: 'Taycan chassis systems', path: '/porsche/taycan' },
  ],
  'engine-diagnostics': [
    { label: 'Porsche 997 diagnostic considerations', path: '/porsche/911/997' },
    { label: 'Porsche 991 diagnostic considerations', path: '/porsche/911/991' },
    { label: 'Porsche 992 diagnostic considerations', path: '/porsche/911/992' },
  ],
  'mechanical-repair': [
    { label: 'Porsche 911 cooling and engine systems', path: '/blog/porsche-911-service-dubai-guide' },
    { label: 'Cayenne engine and cooling systems', path: '/blog/porsche-cayenne-service-dubai-guide' },
    { label: '718 powertrain and cooling', path: '/porsche/718' },
  ],
  'brake-repair': [
    { label: '911 steel and PCCB systems', path: '/blog/porsche-911-service-dubai-guide' },
    { label: 'Cayenne braking considerations', path: '/blog/porsche-cayenne-service-dubai-guide' },
    { label: 'Taycan regenerative and friction brakes', path: '/porsche/taycan' },
  ],
  'electrical-repair': [
    { label: 'Taycan low-voltage and charging overview', path: '/porsche/taycan' },
    { label: 'Panamera electrical considerations', path: '/blog/porsche-panamera-service-dubai-guide' },
    { label: 'Macan electrical and diagnostic scope', path: '/porsche/macan' },
  ],
  'battery-replacement': [
    { label: 'Taycan 12-volt system overview', path: '/porsche/taycan' },
    { label: 'Porsche maintenance in Dubai', path: '/blog/porsche-maintenance-guide-dubai' },
    { label: 'Porsche 992 electrical considerations', path: '/porsche/911/992' },
  ],
  'ac-repair': [
    { label: '911 cooling and AC considerations', path: '/blog/porsche-911-service-dubai-guide' },
    { label: 'Cayenne climate-system considerations', path: '/blog/porsche-cayenne-service-dubai-guide' },
    { label: 'Taycan thermal-management overview', path: '/porsche/taycan' },
  ],
};

const MERCEDES_RELATED_CONTENT: Record<string, { label: string; path: string }[]> = {
  'transmission-repair': [
    { label: 'Why a Mercedes gearbox jerks', path: `${MERCEDES_PROBLEMS_PATH}/gearbox-jerking` },
    { label: 'How to recognise transmission slipping', path: `${MERCEDES_PROBLEMS_PATH}/transmission-slipping` },
    { label: 'E-Class transmission considerations', path: '/blog/mercedes-e-class-service-dubai-guide' },
  ],
  'suspension-repair': [
    { label: 'What an AIRMATIC malfunction means', path: `${MERCEDES_PROBLEMS_PATH}/airmatic-malfunction` },
    { label: 'Why air suspension drops overnight', path: `${MERCEDES_PROBLEMS_PATH}/suspension-dropping-overnight` },
    { label: 'S-Class suspension systems', path: '/blog/mercedes-s-class-service-dubai-guide' },
  ],
  'engine-diagnostics': [
    { label: 'Mercedes check-engine light guide', path: `${MERCEDES_PROBLEMS_PATH}/check-engine-light` },
    { label: "Mercedes won't-start guide", path: `${MERCEDES_PROBLEMS_PATH}/wont-start` },
    { label: 'Browse all Mercedes diagnostic guides', path: MERCEDES_PROBLEMS_PATH },
  ],
  'mechanical-repair': [
    { label: 'What to do when a Mercedes overheats', path: `${MERCEDES_PROBLEMS_PATH}/engine-overheating` },
    { label: 'How a Mercedes oil leak is traced', path: `${MERCEDES_PROBLEMS_PATH}/oil-leak` },
    { label: 'AMG G63 platform guide', path: '/blog/mercedes-g63-service-dubai-guide' },
  ],
  'ac-repair': [
    { label: 'Why Mercedes AC stops cooling', path: `${MERCEDES_PROBLEMS_PATH}/ac-not-cooling` },
    { label: 'GLE cooling and climate considerations', path: '/mercedes/models/gle-service-repair-dubai' },
    { label: 'GLS three-row climate considerations', path: '/mercedes/models/gls-service-repair-dubai' },
  ],
  'battery-replacement': [
    { label: 'What a Mercedes battery warning means', path: `${MERCEDES_PROBLEMS_PATH}/battery-warning` },
    { label: "Mercedes won't-start guide", path: `${MERCEDES_PROBLEMS_PATH}/wont-start` },
    { label: 'E-Class 12V and 48V considerations', path: '/blog/mercedes-e-class-service-dubai-guide' },
  ],
  'electrical-repair': [
    { label: 'Mercedes battery and charging warnings', path: `${MERCEDES_PROBLEMS_PATH}/battery-warning` },
    { label: "No-crank and crank-no-start diagnosis", path: `${MERCEDES_PROBLEMS_PATH}/wont-start` },
    { label: 'S-Class electrical considerations', path: '/blog/mercedes-s-class-service-dubai-guide' },
  ],
};

const FERRARI_RELATED_CONTENT: Record<string, { label: string; path: string }[]> = {
  'oil-change': [
    { label: 'Ferrari 296 hybrid maintenance considerations', path: '/brands/ferrari-service-dubai/296' },
    { label: 'Ferrari 812 V12 maintenance considerations', path: '/brands/ferrari-service-dubai/812' },
    { label: 'Ferrari maintenance guide for Dubai', path: FERRARI_MAINTENANCE_GUIDE_PATH },
  ],
  'brake-repair': [
    { label: 'Ferrari 296 regenerative braking overview', path: '/brands/ferrari-service-dubai/296' },
    { label: 'Ferrari 812 brake-system overview', path: '/brands/ferrari-service-dubai/812' },
    { label: 'Ferrari Purosangue braking considerations', path: '/brands/ferrari-service-dubai/purosangue' },
  ],
  'transmission-repair': [
    { label: 'Portofino seven- versus eight-speed DCT', path: '/brands/ferrari-service-dubai/portofino' },
    { label: 'Ferrari 812 seven-speed transaxle overview', path: '/brands/ferrari-service-dubai/812' },
    { label: 'Purosangue eight-speed DCT and 4RM-S evo', path: '/brands/ferrari-service-dubai/purosangue' },
  ],
  'suspension-repair': [
    { label: 'Portofino SCM-E suspension overview', path: '/brands/ferrari-service-dubai/portofino' },
    { label: 'Ferrari 812 steering and SCM-E overview', path: '/brands/ferrari-service-dubai/812' },
    { label: 'Purosangue TASV active suspension', path: '/brands/ferrari-service-dubai/purosangue' },
  ],
  'engine-diagnostics': [
    { label: 'Ferrari 296 hybrid diagnostic scope', path: '/brands/ferrari-service-dubai/296' },
    { label: 'Ferrari 812 V12 diagnostic considerations', path: '/brands/ferrari-service-dubai/812' },
    { label: 'Purosangue V12 and chassis diagnostics', path: '/brands/ferrari-service-dubai/purosangue' },
  ],
  'mechanical-repair': [
    { label: 'Portofino V8 and roof-system overview', path: '/brands/ferrari-service-dubai/portofino' },
    { label: 'Ferrari 812 V12 and transaxle overview', path: '/brands/ferrari-service-dubai/812' },
    { label: 'Purosangue V12 and 4RM-S evo overview', path: '/brands/ferrari-service-dubai/purosangue' },
  ],
  'electrical-repair': [
    { label: 'Ferrari 296 hybrid and low-voltage scope', path: '/brands/ferrari-service-dubai/296' },
    { label: 'Portofino roof and electrical systems', path: '/brands/ferrari-service-dubai/portofino' },
    { label: 'Purosangue 12-volt, 48-volt and comfort systems', path: '/brands/ferrari-service-dubai/purosangue' },
  ],
  'battery-replacement': [
    { label: 'Ferrari 296 low-voltage and hybrid considerations', path: '/brands/ferrari-service-dubai/296' },
    { label: 'Portofino storage and roof-system considerations', path: '/brands/ferrari-service-dubai/portofino' },
    { label: 'Purosangue 12-volt and 48-volt considerations', path: '/brands/ferrari-service-dubai/purosangue' },
  ],
  'ac-repair': [
    { label: 'Ferrari 296 thermal-management overview', path: '/brands/ferrari-service-dubai/296' },
    { label: 'Portofino cooling and AC considerations', path: '/brands/ferrari-service-dubai/portofino' },
    { label: 'Purosangue four-seat climate considerations', path: '/brands/ferrari-service-dubai/purosangue' },
  ],
};

const serviceNamesArabic: Record<string, string> = {
  'oil-change': 'تغيير الزيت', 'brake-repair': 'إصلاح الفرامل', 'transmission-repair': 'إصلاح ناقل الحركة', 'ac-repair': 'إصلاح التكييف', 'suspension-repair': 'إصلاح التعليق', 'engine-diagnostics': 'تشخيص المحرك', 'mechanical-repair': 'الإصلاح الميكانيكي', 'steering-repair': 'إصلاح نظام التوجيه', 'battery-replacement': 'تبديل البطارية', 'electrical-repair': 'إصلاح الكهرباء', 'exhaust-repair': 'إصلاح العادم', 'fuel-system-repair': 'إصلاح نظام الوقود', 'body-repair': 'إصلاح الهيكل', 'tire-repair': 'إصلاح الإطارات',
  'soft-close-door-installation': 'تركيب وإصلاح الإغلاق الناعم للأبواب',
};

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

interface BrandServicePageProps {
  brandSlugOverride?: string;
  serviceSlugOverride?: string;
  canonicalPath?: string;
}

const BrandServicePage: React.FC<BrandServicePageProps> = ({
  brandSlugOverride,
  serviceSlugOverride,
  canonicalPath,
}) => {
  const { isArabic, localizedPath } = useLocale();
  const { brandSlug: routeBrandSlug, serviceSlug: routeServiceSlug } = useParams<{ brandSlug: string; serviceSlug: string }>();
  const brandSlug = brandSlugOverride ?? routeBrandSlug;
  const serviceSlug = serviceSlugOverride ?? routeServiceSlug;
  const sourceCombo = brandSlug && serviceSlug ? getBrandServiceCombo(brandSlug, serviceSlug) : undefined;
  const combo = sourceCombo && isArabic ? (() => {
    const serviceName = serviceNamesArabic[sourceCombo.serviceSlug] ?? 'خدمة السيارات';
    const standardFaqs = [
      { question: `متى تحتاج سيارة ${sourceCombo.brandName} إلى ${serviceName}؟`, answer: 'عند ظهور تحذير أو صوت أو تغير في الأداء، أو وفق موعد الصيانة الموصى به للطراز والاستخدام.' },
      { question: 'هل يتم الفحص قبل الإصلاح؟', answer: 'نعم. نبدأ بالتشخيص ثم نوضح النتيجة وخيارات الإصلاح والتكلفة قبل بدء العمل.' },
      { question: 'هل تستخدمون قطعاً أصلية؟', answer: 'نوفر قطع OEM أصلية أو بدائل موثوقة مطابقة للمواصفات، ونوضح الخيارات قبل التركيب.' },
      { question: 'كيف أحجز موعداً؟', answer: 'اتصل بنا أو أرسل رسالة واتساب مع تفاصيل السيارة والخدمة المطلوبة.' },
    ];
    const steps = [
      { title: 'الفحص الأولي', description: 'مراجعة الأعراض وسجل السيارة وإجراء فحص بصري ومنظم.' },
      { title: 'التشخيص المتقدم', description: 'قراءة الأعطال والبيانات الحية واختبار المكونات المرتبطة.' },
      { title: 'الإصلاح والمعايرة', description: 'تنفيذ العمل المتفق عليه باستخدام قطع وإجراءات مناسبة للسيارة.' },
      { title: 'الفحص النهائي', description: 'اختبار النظام والسيارة وتوثيق النتيجة والتوصيات.' },
    ];
    const symptoms = ['ظهور رسالة أو ضوء تحذير', 'تغير ملحوظ في أداء السيارة', 'صوت أو اهتزاز غير معتاد', 'تأخر موعد الصيانة أو تكرار المشكلة'];
    return {
      ...sourceCombo,
      serviceName,
      serviceType: serviceName,
      h1: `${serviceName} ${sourceCombo.brandName} في دبي`,
      metaTitle: `${serviceName} ${sourceCombo.brandName} في دبي | ديجي-تك`,
      metaDescription: `${serviceName} متخصص لسيارات ${sourceCombo.brandName} في دبي مع تشخيص متقدم وقطع مناسبة وتسعير واضح لدى مركز ديجي-تك.`,
      heroCopy: `يقدم مركز ديجي-تك خدمة ${serviceName} المتخصصة لسيارات ${sourceCombo.brandName} في دبي، بدءاً من التشخيص الدقيق وحتى الإصلاح والمعايرة والاختبار النهائي.`,
      symptoms: sourceCombo.symptoms.map((_, index) => symptoms[index % symptoms.length]),
      processSteps: sourceCombo.processSteps.map((_, index) => steps[index % steps.length]),
      partsCopy: `نستخدم قطع OEM أصلية أو بدائل موثوقة مطابقة لمواصفات ${sourceCombo.brandName}، مع توثيق القطع والأعمال بوضوح.`,
      faqs: sourceCombo.faqs.map((_, index) => standardFaqs[index % standardFaqs.length]),
      whatsAppMessage: `مرحباً ديجي-تك، أريد حجز ${serviceName} لسيارة ${sourceCombo.brandName}.`,
    };
  })() : sourceCombo;
  const brand = brandSlug ? getBrandBySlug(brandSlug) : undefined;
  const profile = brandSlug ? BRAND_PROFILES[brandSlug] : undefined;

  const url = combo
    ? canonicalPath ? `${SITE_URL}${canonicalPath}` : `${SITE_URL}${isArabic ? '/ar' : ''}/brands/${combo.brandSlug}/${combo.serviceSlug}`
    : SITE_URL;

  const jsonLd = React.useMemo(() => {
    if (!combo || !brand || !profile) return undefined;
    const schemaDescription = isArabic
      ? `${combo.serviceName} لسيارات ${combo.brandName} لدى ورشة ديجي-تك في القوز، دبي. تواصل لترتيب الفحص أو الخدمة المناسبة.`
      : `${combo.serviceName} for ${combo.brandName} vehicles at Digi-Tec Performance Center in Al Quoz, Dubai. Contact the workshop to arrange the appropriate inspection or service.`;
    const breadcrumb = buildBreadcrumb(url, [
      { name: isArabic ? 'الرئيسية' : 'Home', url: `${SITE_URL}${isArabic ? '/ar' : '/'}` },
      { name: isArabic ? 'العلامات' : 'Brands', url: `${SITE_URL}${isArabic ? '/ar' : ''}/brands` },
      { name: combo.brandName, url: `${SITE_URL}${isArabic ? '/ar' : ''}/brands/${combo.brandSlug}` },
      { name: combo.serviceName, url },
    ]);
    const webPage = buildWebPage({
      url,
      name: combo.h1,
      description: schemaDescription,
      breadcrumbId: `${url}#breadcrumb`,
      primaryImage: brand.logo || undefined,
      mainEntityId: `${url}#service`,
    });
    const brandEntity = buildBrand({
      name: combo.brandName,
      logo: brand.logo || undefined,
    });
    const service = buildService({
      url,
      name: combo.h1,
      serviceType: `${combo.brandName} ${combo.serviceType}`,
      description: schemaDescription,
      brand: combo.brandName,
      areaServed: [isArabic ? 'دبي' : 'Dubai'],
    });
    const faq = buildFAQ(url, combo.faqs);
    return pageGraph([webPage, breadcrumb, brandEntity, service, ...(faq ? [faq] : [])]);
  }, [combo, brand, isArabic, profile, url]);

  useSeo({
    title: combo ? combo.metaTitle : isArabic ? 'خدمة السيارات | مركز ديجي-تك' : 'Brand Service | Digi-Tec Performance Centre',
    description: combo ? combo.metaDescription : isArabic ? 'خدمة متخصصة للسيارات في دبي لدى مركز ديجي-تك.' : 'Specialist brand service in Dubai at Digi-Tec Performance Centre.',
    canonical: combo ? url : `${SITE_URL}/services`,
    noindex: !combo || !brand || !profile,
    jsonLd,
  });

  if (!combo || !brand) {
    return <Navigate to={localizedPath('/services')} replace />;
  }

  const whatsappHref = `https://wa.me/97143402223?text=${encodeURIComponent(combo.whatsAppMessage)}`;
  const otherServices = getServicesForBrand(combo.brandSlug).filter((s) => s.serviceSlug !== combo.serviceSlug);
  const relatedMercedesContent = combo.brandSlug === 'mercedes-benz-service-dubai'
    ? MERCEDES_RELATED_CONTENT[combo.serviceSlug] ?? []
    : [];
  const relatedPorscheContent = combo.brandSlug === 'porsche-service-dubai'
    ? PORSCHE_RELATED_CONTENT[combo.serviceSlug] ?? [
        { label: 'Browse the Porsche Knowledge Centre', path: '/brands/porsche-service-dubai#porsche-knowledge-centre' },
        { label: 'Porsche 911 model guide', path: '/blog/porsche-911-service-dubai-guide' },
        { label: 'Porsche Macan model guide', path: '/porsche/macan' },
      ]
    : [];
  const relatedBmwContent = combo.brandSlug === 'bmw-service-dubai'
    ? [
        { label: 'BMW X5 service guide', path: '/brands/bmw-service-dubai/x5' },
        { label: combo.serviceSlug === 'transmission-repair' ? 'BMW M5 drivetrain guide' : 'BMW 3 Series service guide', path: combo.serviceSlug === 'transmission-repair' ? '/brands/bmw-service-dubai/m5' : '/brands/bmw-service-dubai/3-series' },
        { label: combo.serviceSlug === 'suspension-repair' ? 'BMW X6 chassis guide' : 'BMW M3 service guide', path: combo.serviceSlug === 'suspension-repair' ? '/brands/bmw-service-dubai/x6' : '/brands/bmw-service-dubai/m3' },
      ]
    : [];
  const relatedFerrariContent = combo.brandSlug === 'ferrari-service-dubai'
    ? FERRARI_RELATED_CONTENT[combo.serviceSlug] ?? [
        { label: 'Ferrari 296 model guide', path: '/brands/ferrari-service-dubai/296' },
        { label: 'Ferrari Purosangue model guide', path: '/brands/ferrari-service-dubai/purosangue' },
        { label: 'Ferrari maintenance guide for Dubai', path: FERRARI_MAINTENANCE_GUIDE_PATH },
      ]
    : [];
  const relatedAuthorityContent = relatedMercedesContent.length > 0
    ? relatedMercedesContent
    : relatedPorscheContent.length > 0
      ? relatedPorscheContent
      : relatedBmwContent.length > 0 ? relatedBmwContent : relatedFerrariContent;

  return (
    <div className="min-h-screen bg-black text-off-white">
      <Header />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 text-xs sm:text-sm text-gray-400">
        <ol className="flex flex-wrap items-center gap-2">
          <li><Link to="/" className="hover:text-burnt-orange">{isArabic ? 'الرئيسية' : 'Home'}</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link to="/brands" className="hover:text-burnt-orange">{isArabic ? 'العلامات' : 'Brands'}</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link to={`/brands/${combo.brandSlug}`} className="hover:text-burnt-orange">{combo.brandName}</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-off-white font-semibold">{combo.serviceName}</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="relative bg-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-burnt-orange/10 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16 lg:py-20 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-5 sm:mb-6">
              <div className="w-14 h-14 sm:w-20 sm:h-20 p-2 bg-white/90 rounded-full shadow-xl flex items-center justify-center overflow-hidden">
                {brand.logo ? (
                  <img src={brand.logo} alt={`${combo.brandName} logo`} className="w-full h-full object-contain" />
                ) : (
                  <span className="text-2xl font-black text-burnt-orange">{combo.brandName.charAt(0)}</span>
                )}
              </div>
              <span className="text-burnt-orange font-bold uppercase tracking-widest text-[11px] sm:text-sm">
                {isArabic ? `متخصصون في ${combo.brandName}` : `${combo.brandName} Specialists`}
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 leading-tight">
              {isArabic ? <><span className="text-burnt-orange">{combo.serviceName}</span> {combo.brandName} في دبي</> : combo.brandSlug === 'rox-service-dubai' && combo.serviceSlug === 'soft-close-door-installation' ? <>ROX 01 <span className="text-burnt-orange">Soft Close Installation Dubai</span></> : <>{combo.brandName} <span className="text-burnt-orange">{combo.serviceName}</span> Dubai</>}
            </h1>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
              {combo.heroCopy}
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
            <CtaAssurance className="mt-4" align="start" text={isArabic ? 'تواصل معنا لمناقشة السيارة وطلب موعد' : undefined} />
          </div>
        </div>
      </section>

      {/* Symptoms */}
      <section className="py-12 sm:py-16 bg-black border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-4xl font-black mb-6 sm:mb-8">
            {isArabic ? <>متى تحجز <span className="text-burnt-orange">{combo.serviceName} {combo.brandName}</span>؟</> : <>When to Book <span className="text-burnt-orange">{combo.brandName} {combo.serviceName}</span></>}
          </h2>
          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
            {combo.symptoms.map((s, i) => (
              <div key={i} className="card-premium flex items-start gap-3 rounded-2xl p-4 sm:p-5">
                <CheckCircle2 className="w-5 h-5 text-burnt-orange flex-shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm sm:text-base leading-relaxed">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Models */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-charcoal/40 to-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-4xl font-black mb-3">
            {isArabic ? <>طرازات {combo.brandName} التي نوفر لها <span className="text-burnt-orange">{combo.serviceName}</span></> : <>{combo.brandName} Models We <span className="text-burnt-orange">{combo.serviceName}</span></>}
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mb-6 sm:mb-8">
            {isArabic ? `يتم تأكيد نطاق الخدمة حسب طراز ${combo.brandName} والنظام المركب قبل الحجز.` : `Workshop scope, compatible functions and parts are confirmed for the exact ${combo.brandName} model before booking.`}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {combo.models.map((m) => (
              <div key={m} className="card-premium rounded-2xl p-3 sm:p-4 text-center">
                <span className="text-off-white text-xs sm:text-sm font-semibold">{m}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-12 sm:py-16 bg-black border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-4xl font-black mb-6 sm:mb-10">
            {isArabic ? <>خطوات <span className="text-burnt-orange">{combo.serviceName}</span></> : <>Our <span className="text-burnt-orange">{combo.serviceName}</span> Process</>}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {combo.processSteps.map((step, i) => (
              <div key={i} className="card-premium rounded-2xl p-5 sm:p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-burnt-orange text-black font-black flex items-center justify-center text-sm">{i + 1}</span>
                  <h3 className="text-base sm:text-lg font-bold text-off-white">{step.title}</h3>
                </div>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed pl-11">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Parts */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-charcoal/40 to-black border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-start gap-4">
            <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10 text-burnt-orange flex-shrink-0" />
            <div>
              <h2 className="text-xl sm:text-3xl font-black mb-3">
                {isArabic ? <>خيارات قطع <span className="text-burnt-orange">{combo.brandName}</span> موثقة</> : <><span className="text-burnt-orange">{combo.brandName}</span> Parts Options, Documented</>}
              </h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{combo.partsCopy}</p>
            </div>
          </div>
        </div>
      </section>

      {relatedAuthorityContent.length > 0 && !isArabic && (
        <section className="border-t border-white/5 bg-charcoal/15 py-12 sm:py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <p className="eyebrow mb-4">Model and owner guides</p>
            <h2 className="text-2xl font-black sm:text-4xl">Understand the symptom before the repair</h2>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/55">These informational pages explain the warning or platform. This page remains the commercial destination for the confirmed service need.</p>
            <ul className="mt-7 grid gap-4 sm:grid-cols-3">
              {relatedAuthorityContent.map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="card-premium group flex h-full items-center justify-between gap-3 rounded-xl p-4 text-sm font-semibold text-white/70 hover:text-burnt-orange">
                    <span>{item.label}</span><ArrowRight className="h-4 w-4 shrink-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="py-12 sm:py-16 bg-black border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-4xl font-black text-center mb-8 sm:mb-10">
            {combo.brandName} {combo.serviceName} <span className="text-burnt-orange">{isArabic ? 'الأسئلة الشائعة' : 'FAQs'}</span>
          </h2>
          <Accordion type="single" collapsible className="space-y-3">
            {combo.faqs.map((f, i) => (
              <AccordionItem key={i} value={`q-${i}`} className="bg-white/[0.03] border border-white/10 rounded-2xl px-5 sm:px-6 data-[state=open]:border-burnt-orange/40">
                <AccordionTrigger className="text-left text-off-white font-semibold text-base sm:text-lg hover:no-underline py-5">
                  {f.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 text-sm sm:text-base leading-relaxed pb-5">
                  {f.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Cross-links: other services for this brand */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-charcoal/40 to-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <Wrench className="w-6 h-6 sm:w-8 sm:h-8 text-burnt-orange" />
            <h2 className="text-2xl sm:text-4xl font-black">
              {isArabic ? <>المزيد من خدمات <span className="text-burnt-orange">{combo.brandName}</span></> : <>More <span className="text-burnt-orange">{combo.brandName}</span> Services</>}
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {otherServices.map((s) => (
              <Link
                key={s.serviceSlug}
                to={combo.brandSlug === 'mercedes-benz-service-dubai'
                  ? MERCEDES_SERVICE_PATHS[s.serviceSlug] ?? `/brands/${combo.brandSlug}/${s.serviceSlug}`
                  : `/brands/${combo.brandSlug}/${s.serviceSlug}`}
                className="card-premium group flex flex-col justify-between rounded-2xl p-4 sm:p-5 transition-all duration-300"
              >
                <span className="text-off-white font-bold text-sm sm:text-base leading-tight group-hover:text-burnt-orange">
                  {combo.brandName} {isArabic ? serviceNamesArabic[s.serviceSlug] ?? s.label : s.label}
                </span>
                <ArrowRight className={`w-4 h-4 text-burnt-orange mt-3 ${isArabic ? 'rotate-180' : ''}`} />
              </Link>
            ))}
            <Link
              to={`/brands/${combo.brandSlug}`}
              className="group flex flex-col justify-between bg-burnt-orange/10 border border-burnt-orange/30 hover:bg-burnt-orange/20 rounded-2xl p-4 sm:p-5 transition-all duration-300"
            >
              <span className="text-off-white font-bold text-sm sm:text-base leading-tight">
                {isArabic ? `جميع خدمات ${combo.brandName}` : `All ${combo.brandName} Services`}
              </span>
              <ArrowRight className={`w-4 h-4 text-burnt-orange mt-3 ${isArabic ? 'rotate-180' : ''}`} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BrandServicePage;
