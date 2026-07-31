import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const siteUrl = 'https://digitecme.com';

// Lovable deploys this Vite app as a single-page application. These route files
// make the page metadata and main topic independently understandable before JS
// runs. The visible React pages remain the source of truth; this is matching
// crawlable HTML for search engines and social crawlers that read the initial
// response only.
const priorityRoutes = [
  {
    path: '/ar',
    title: 'مركز ديجي-تك للسيارات في دبي | صيانة وإصلاح السيارات',
    description: 'مركز ديجي-تك في القوز، دبي لخدمات صيانة وإصلاح وتشخيص السيارات الألمانية والفاخرة. مرسيدس، بي إم دبليو، أودي، بورشه، فيراري ورينج روفر.',
    heading: 'مركز ديجي-تك لصيانة وإصلاح السيارات في دبي',
    sectionHeading: 'خدمات السيارات المتخصصة في دبي',
    summary: 'يوفر مركز ديجي-تك في القوز، دبي خدمات صيانة وإصلاح وتشخيص السيارات الألمانية والفاخرة مع فحص واضح قبل بدء العمل.',
    services: ['صيانة دورية للسيارات', 'تشخيص إلكتروني دقيق', 'إصلاحات ميكانيكية وكهربائية', 'خدمات مرسيدس والسيارات الفاخرة'],
  },
  {
    path: '/brands/mercedes-benz-service-dubai',
    title: 'Mercedes Repair & Service Dubai | Digi-Tec Specialists',
    description: 'Specialist Mercedes repair and service in Dubai for C-Class, E-Class, S-Class, G-Class, GLE, GLS and AMG. XENTRY diagnostics at our Al Quoz workshop in Dubai.',
    heading: 'Mercedes-Benz Repair & Service Dubai',
    sectionHeading: 'Independent Mercedes specialist workshop in Dubai',
    summary: 'Digi-Tec Performance Centre is an independent Mercedes-Benz specialist workshop in Al Quoz, Dubai. We diagnose, maintain and repair C-Class, E-Class, S-Class, G-Class, GLE, GLS, AMG and other Mercedes models using XENTRY and Star Diagnostics, with a clear inspection and estimate before approved work begins.',
    services: ['Mercedes Service A and Service B', 'XENTRY, DAS and Star Diagnostics', '7G-Tronic and 9G-Tronic transmission repair', 'AIRMATIC, ABC and E-ACTIVE suspension repair', 'AMG and G-Class mechanical support', 'AC, cooling, brakes and electrical repair'],
  },
];

const titleCase = (value) => value
  .split('-')
  .filter(Boolean)
  .map((word) => ({ ac: 'AC', ecu: 'ECU', byd: 'BYD', rox: 'ROX', amg: 'AMG' }[word] ?? `${word.charAt(0).toUpperCase()}${word.slice(1)}`))
  .join(' ');

const brandNameFromSlug = (slug) => titleCase(slug.replace(/-service-dubai$/, ''))
  .replace('Mercedes Benz', 'Mercedes-Benz')
  .replace('Rolls Royce', 'Rolls-Royce')
  .replace('Land Rover', 'Land Rover');

const serviceNameFromSlug = (slug) => titleCase(slug)
  .replace('Ac ', 'AC ')
  .replace('Ecu ', 'ECU ');

const arabicServiceNames = {
  'ac-repair': 'إصلاح مكيف السيارة',
  'auto-electrical-repair': 'إصلاح كهرباء السيارات',
  'battery-replacement': 'تبديل بطارية السيارة',
  'body-repair': 'إصلاح هيكل السيارة',
  'brake-repair': 'إصلاح فرامل السيارات',
  'car-ac-repair': 'إصلاح مكيف السيارة',
  'car-body-repair': 'إصلاح هيكل السيارة',
  'car-diagnostics': 'فحص وتشخيص السيارات',
  'car-garage': 'كراج سيارات',
  'car-service': 'صيانة السيارات',
  'ceramic-coating': 'طلاء سيراميك للسيارة',
  'electrical-repair': 'إصلاح كهرباء السيارة',
  'engine-diagnostics': 'فحص وتشخيص المحرك',
  'exhaust-repair': 'إصلاح نظام العادم',
  'fuel-system-repair': 'إصلاح نظام الوقود',
  'garage-near-me': 'كراج سيارات قريب',
  'mechanical-repair': 'إصلاح ميكانيكي للسيارات',
  'oil-change': 'تغيير زيت المحرك',
  'paint-protection': 'حماية طلاء السيارة',
  'paint-protection-film': 'فيلم حماية طلاء السيارة',
  'roadside-assistance': 'مساعدة السيارات على الطريق',
  'soft-close-door-installation': 'تركيب أبواب الإغلاق الناعم',
  'soft-close-door-repair': 'تركيب وإصلاح أبواب الإغلاق الناعم',
  'steering-repair': 'إصلاح نظام التوجيه',
  'suspension-repair': 'إصلاح نظام التعليق',
  'tire-repair': 'إصلاح الإطارات',
  'transmission-repair': 'إصلاح ناقل الحركة',
};

const arabicServiceNameFromSlug = (slug) => {
  const normalized = slug.replace(/-dubai$/, '');
  if (normalized === 'mercedes-repair') return 'إصلاح سيارات مرسيدس';
  if (normalized === 'mercedes-diagnostics') return 'فحص وتشخيص سيارات مرسيدس';
  if (normalized.startsWith('mercedes-')) {
    const service = arabicServiceNames[normalized.replace(/^mercedes-/, '')];
    if (service) return `${service} مرسيدس`;
  }
  return arabicServiceNames[normalized] ?? serviceNameFromSlug(normalized);
};

const blogPostMetadata = {
  'car-ac-repair-dubai': {
    en: {
      title: 'Why Your Car AC Stops Cooling in Dubai | Workshop Diagnosis Guide',
      heading: 'Car AC Repair in Dubai: Why Your AC Stops Cooling',
      description: 'Why does a car AC stop cooling in Dubai? Learn the common causes, warning signs, and what a proper workshop diagnosis should include.',
      summary: 'Learn why car AC systems lose cooling performance in Dubai and what a complete workshop diagnosis should check before parts are replaced.',
    },
    ar: {
      title: 'إصلاح تكييف السيارة في دبي | دليل التشخيص',
      heading: 'إصلاح تكييف السيارة في دبي: أسباب ضعف التبريد والحل الصحيح',
      description: 'تعرّف إلى أسباب ضعف تكييف السيارة في دبي، وعلامات الأعطال، وخطوات التشخيص والإصلاح الصحيح لدى ورشة متخصصة في القوز.',
      summary: 'دليل عملي لأسباب ضعف تكييف السيارة في حرارة دبي، وأكثر الأعطال شيوعاً، وما الذي يجب أن يتضمنه التشخيص الصحيح.',
    },
  },
  'brake-repair-dubai': {
    en: {
      title: 'Why Brakes Wear Faster in Dubai | Warning Signs & Workshop Guide',
      heading: 'Brake Repair in Dubai: Why Brakes Wear Faster in UAE Heat',
      description: 'Learn why brakes wear faster in Dubai, the warning signs to act on, and what a thorough brake inspection should cover.',
      summary: 'Heat, traffic and fine sand put extra load on braking systems. Learn the warning signs and what a proper brake inspection should include.',
    },
    ar: {
      title: 'إصلاح فرامل السيارات في دبي | دليل المالك',
      heading: 'إصلاح الفرامل في دبي: لماذا تتآكل أسرع في أجواء الإمارات؟',
      description: 'دليل علامات تلف الفرامل في دبي وأسباب التآكل السريع وخطوات الفحص والإصلاح الآمن للسيارات الفاخرة والألمانية.',
      summary: 'تأثير الحرارة والازدحام والغبار في الفرامل، وعلامات التحذير التي يجب عدم تجاهلها.',
    },
  },
  'car-battery-replacement-dubai': {
    en: {
      title: 'Why Car Batteries Fail Faster in Dubai Heat | Owner Guide',
      heading: 'Car Battery Replacement in Dubai: Why Heat Kills Batteries Faster',
      description: 'Learn why Dubai heat shortens car battery life, the warning signs of failure, and when to arrange a professional battery test.',
      summary: 'Dubai heat shortens battery life. Learn the warning signs, testing steps and how to choose the correct replacement for your vehicle.',
    },
    ar: {
      title: 'تبديل بطارية السيارة في دبي | دليل حرارة الإمارات',
      heading: 'تبديل بطارية السيارة في دبي: لماذا تقصر الحرارة عمر البطارية؟',
      description: 'لماذا تتلف بطارية السيارة سريعاً في دبي؟ تعرّف إلى علامات الضعف والفحص الصحيح واختيار بطارية مناسبة لمواصفات سيارتك.',
      summary: 'تعرّف إلى أسباب ضعف البطارية في دبي، وعلامات الحاجة إلى الاستبدال، وكيف يتم اختيار البطارية المناسبة.',
    },
  },
  'best-car-workshop-dubai': {
    en: {
      title: 'How to Choose a Car Workshop in Dubai | 2026 Owner Guide',
      heading: 'Best Car Workshop in Dubai (2026 Guide)',
      description: 'A practical 2026 guide to choosing a car workshop in Dubai, including the questions to ask about diagnostics, parts, estimates, and aftercare.',
      summary: 'A practical checklist for comparing Dubai workshops by diagnostic quality, technical experience, written estimates, parts and aftercare.',
    },
    ar: {
      title: 'كيف تختار أفضل ورشة سيارات في دبي؟ | دليل 2026',
      heading: 'أفضل ورشة سيارات في دبي: دليل الاختيار لعام 2026',
      description: 'دليل عملي لاختيار ورشة سيارات في دبي وفق جودة التشخيص وخبرة الفنيين ووضوح عرض السعر والقطع والضمان وخدمة ما بعد الإصلاح.',
      summary: 'معايير عملية لاختيار ورشة موثوقة في دبي، من التشخيص والخبرة إلى الشفافية والضمان.',
    },
  },
  'mercedes-service-intervals-dubai-heat': {
    en: {
      title: 'Mercedes Service Intervals Dubai | Digitec Performance',
      heading: 'Mercedes Service Intervals in Dubai Heat: What You Need to Know',
      description: 'Learn the right Mercedes service interval for Dubai heat. Expert advice on oil, coolant, and brake intervals from Digitec Performance Center.',
      summary: 'Dubai temperatures put extra stress on vehicle components. Learn how local conditions should influence Mercedes service planning.',
    },
    ar: {
      title: 'جدول صيانة مرسيدس في دبي | دليل حرارة الإمارات',
      heading: 'مواعيد صيانة مرسيدس في حرارة دبي: ما الذي يجب معرفته؟',
      description: 'دليل مواعيد صيانة مرسيدس في دبي وفحص الزيت والتبريد والفرامل والبطارية بما يناسب الحرارة والغبار والازدحام في الإمارات.',
      summary: 'كيف تؤثر حرارة دبي والاستخدام اليومي في جدول صيانة مرسيدس والزيوت والتبريد والبطارية.',
    },
  },
  'gad-tuning-explained': {
    en: {
      title: 'GAD Tuning Explained | Digitec Performance Center Dubai',
      heading: 'GAD Tuning Explained: What Makes It Different',
      description: 'Discover what makes GAD Motors tuning different. Official GAD partner in Dubai explains the engineering behind every stage.',
      summary: 'A practical look at the GAD Motors approach to calibration, supporting hardware and reliable performance for Dubai conditions.',
    },
    ar: {
      title: 'شرح برمجة GAD في دبي | ديجي-تك',
      heading: 'شرح برمجة GAD: ما الذي يجعلها مختلفة؟',
      description: 'تعرّف إلى منهج GAD Motors في برمجة المحرك وتطوير الأداء، ودور الفحص والقطع الداعمة في تقديم قوة موثوقة تناسب أجواء دبي.',
      summary: 'نظرة على منهج GAD في تطوير الأداء، من الفحص الأساسي إلى البرمجة والترقيات الداعمة.',
    },
  },
  'why-ceramic-coating-matters-uae': {
    en: {
      title: 'Ceramic Coating UAE | Digitec Performance Center Dubai',
      heading: 'Why Ceramic Coating Matters in the UAE',
      description: 'Learn why ceramic coating is essential for cars in the UAE. Protection from sun, sand, and salt by Digitec Performance Center Dubai.',
      summary: 'Learn how ceramic coating helps protect vehicle paint from intense sun, fine sand and coastal humidity in the UAE.',
    },
    ar: {
      title: 'الطلاء السيراميكي للسيارات في الإمارات | دليل الحماية',
      heading: 'لماذا يهم الطلاء السيراميكي في الإمارات؟',
      description: 'دليل فوائد الطلاء السيراميكي في الإمارات وحماية دهان السيارة من الشمس والغبار والرطوبة مع توضيح الفرق بينه وبين الشمع وPPF.',
      summary: 'كيف يساعد الطلاء السيراميكي في حماية اللمعان وتسهيل العناية بالسيارة في ظروف الإمارات.',
    },
  },
  'mercedes-repair-dubai-complete-guide': {
    en: {
      title: 'Common Mercedes Problems Dubai | 2026 Owner Guide',
      heading: 'Common Mercedes Problems in Dubai: 2026 Owner Guide',
      description: 'Common Mercedes problems in Dubai: AIRMATIC faults, cooling, AC, batteries and warning signs. Learn what to check and when diagnostics are needed in Dubai.',
      summary: 'A practical guide to Mercedes warning signs in Dubai, including AIRMATIC faults, cooling, AC, batteries and the checks that should happen before repair.',
    },
    ar: {
      title: 'أعطال مرسيدس الشائعة في دبي | دليل المالك 2026',
      heading: 'أعطال مرسيدس الشائعة في دبي: دليل المالك 2026',
      description: 'تعرّف إلى أعطال مرسيدس الشائعة في دبي: تعليق AIRMATIC والتبريد والتكييف والبطارية وإشارات التحذير، وما يجب فحصه قبل اعتماد الإصلاح.',
      summary: 'دليل عملي لتحذيرات مرسيدس الشائعة في دبي وخطوات التشخيص المناسبة قبل اعتماد الإصلاح.',
    },
  },
  'g63-to-brabus-g800-conversion-dubai': {
    en: {
      title: 'G63 to BRABUS G 800 Conversion Dubai | Before & After',
      heading: 'G63 to BRABUS G 800-Style Conversion in Dubai: Before & After',
      description: 'See a real Mercedes-AMG G63 to BRABUS G 800-style conversion in Dubai, from strip-down and fitment to final inspection at Digi-Tec.',
      summary: 'Follow a real Mercedes-AMG G63 conversion at our Al Quoz workshop, from careful interior and body strip-down to final exterior fitment and quality checks.',
    },
    ar: {
      title: 'تحويل G63 إلى طراز BRABUS G 800 في دبي | قبل وبعد',
      heading: 'تحويل G63 إلى طراز BRABUS G 800 في دبي: قبل وبعد',
      description: 'شاهد مشروع تحويل حقيقي لمرسيدس AMG G63 إلى طراز BRABUS G 800 في دبي، من التفكيك والتركيب إلى الفحص النهائي في ديجي-تك.',
      summary: 'تابع مشروع تحويل حقيقي لمرسيدس AMG G63 في ورشتنا بالقوز، من التفكيك الدقيق إلى تركيب القطع الخارجية والفحوصات النهائية.',
    },
  },
  'range-rover-land-rover-air-suspension-problems-dubai': {
    en: {
      title: 'Range Rover Air Suspension Problems Dubai | Digi-Tec',
      heading: 'Range Rover & Land Rover Air Suspension Problems in Dubai',
      description: 'Range Rover leaning to one side or showing Suspension Fault? Learn common air suspension faults, warning signs and repair steps in Dubai.',
      summary: 'Learn why air springs, compressors and airlines fail, what a Suspension Fault warning means and how the system should be diagnosed.',
    },
    ar: {
      title: 'إصلاح تعليق رينج روفر الهوائي في دبي | ديجي-تك',
      heading: 'مشاكل التعليق الهوائي في رينج روفر ولاند روفر في دبي',
      description: 'دليل أعطال التعليق الهوائي في رينج روفر ولاند روفر: ميلان السيارة، تحذير التعليق، تسريب الوسائد، الكمبروسر وخطوات التشخيص في دبي.',
      summary: 'دليل لأسباب ميلان السيارة أو ظهور تحذير عطل نظام التعليق، وفحص الوسائد الهوائية والكمبروسر وخطوط الهواء.',
    },
  },
  'best-defender-workshop-dubai': {
    en: {
      title: 'Best Defender Workshop Dubai | Digi-Tec',
      heading: 'Best Defender Workshop in Dubai: A Real Accident Repair Case Study',
      description: 'Looking for a Defender workshop in Dubai? See how Digi-Tec approaches accident repair, diagnostics, bodywork and final checks for Land Rover Defender owners.',
      summary: 'Follow a real Defender accident repair from strip-down and hidden-damage inspection to reassembly, bodywork and final workshop checks.',
    },
    ar: {
      title: 'أفضل ورشة ديفندر في دبي | إصلاح حادث حقيقي',
      heading: 'أفضل ورشة ديفندر في دبي: دراسة حالة إصلاح حادث حقيقي',
      description: 'شاهد مراحل إصلاح لاند روفر ديفندر بعد حادث في دبي: الفحص، التفكيك، إصلاح الهيكل والدهان وإعادة التجميع داخل ورشة ديجي-تك.',
      summary: 'من أضرار الحادث وتفكيك الواجهة إلى إعادة التجميع والدهان والتسليم النهائي: شاهد مراحل إصلاح ديفندر داخل ورشة ديجي-تك.',
    },
  },
};

const brandArticleDetails = (slug) => {
  const maintenanceSuffix = '-maintenance-guide-dubai';
  const workshopSuffix = '-best-workshop-dubai';
  const isMaintenance = slug.endsWith(maintenanceSuffix);
  const suffix = isMaintenance ? maintenanceSuffix : workshopSuffix;
  if (!isMaintenance && !slug.endsWith(workshopSuffix)) return null;

  const brand = titleCase(slug.slice(0, -suffix.length))
    .replace('Mercedes Benz', 'Mercedes-Benz')
    .replace('Rolls Royce', 'Rolls-Royce')
    .replace('Bmw', 'BMW')
    .replace('Mclaren', 'McLaren')
    .replace('Mini', 'MINI');

  return { brand, isMaintenance };
};

const createGeneratedRoute = (pathname) => {
  const isArabic = pathname === '/ar' || pathname.startsWith('/ar/');
  const segments = pathname.replace(/^\/ar\//, '/').split('/').filter(Boolean);
  const [section, brandSlug, serviceSlug] = segments;

  if (section === 'blog') {
    if (!brandSlug) {
      return {
        path: pathname,
        schemaType: 'CollectionPage',
        title: isArabic ? 'مدونة السيارات في دبي | مركز ديجي-تك' : 'Automotive Blog Dubai | Digitec Performance Center',
        description: isArabic
          ? 'مقالات وإرشادات عن صيانة السيارات الفاخرة وإصلاح مرسيدس وتطوير الأداء وحماية الطلاء والعناية بالسيارات في دبي.'
          : 'Expert insights on Mercedes service, GAD tuning, ceramic coating, and luxury car care in Dubai from Digitec Performance Center.',
        heading: isArabic ? 'مجلة ديجي-تك للسيارات' : 'The Digitec Journal',
        sectionHeading: isArabic ? 'مقالات وإرشادات السيارات في دبي' : 'Automotive guides from our Dubai workshop',
        summary: isArabic
          ? 'مقالات عربية يكتبها فريق ورشة ديجي-تك عن تشخيص السيارات وصيانتها وإصلاحها وتطوير أدائها في ظروف دبي والإمارات.'
          : 'Workshop-written articles about vehicle diagnostics, maintenance, repair, performance and ownership in Dubai and the UAE.',
        services: isArabic
          ? ['أدلة الصيانة والإصلاح', 'أعطال السيارات الشائعة', 'مرسيدس والسيارات الفاخرة', 'تطوير الأداء والعناية بالسيارة']
          : ['Maintenance and repair guides', 'Common vehicle problems', 'Mercedes and luxury cars', 'Performance and vehicle care'],
      };
    }

    const fixed = blogPostMetadata[brandSlug]?.[isArabic ? 'ar' : 'en'];
    if (fixed) {
      return {
        path: pathname,
        schemaType: 'Article',
        ...fixed,
        sectionHeading: isArabic ? 'دليل عملي لمالكي السيارات في دبي' : 'A practical guide for Dubai vehicle owners',
        services: isArabic
          ? ['علامات العطل التي تستحق الانتباه', 'خطوات التشخيص الصحيح', 'خيارات الصيانة والإصلاح', 'متى يجب حجز فحص متخصص']
          : ['Warning signs to watch', 'Correct diagnostic steps', 'Maintenance and repair options', 'When to book a specialist inspection'],
      };
    }

    const article = brandArticleDetails(brandSlug);
    if (!article) return null;

    const { brand, isMaintenance } = article;
    const heading = isArabic
      ? `دليل ورشة ${brand} المتخصصة في دبي`
      : (isMaintenance ? `${brand} Maintenance Guide for Dubai Owners` : `Best ${brand} Workshop in Dubai: Owner Guide`);

    return {
      path: pathname,
      schemaType: 'Article',
      title: isArabic
        ? `ورشة ${brand} في دبي | ديجي-تك`
        : (isMaintenance ? `${brand} Maintenance Dubai | DIGI-TEC` : `Best ${brand} Workshop Dubai | DIGI-TEC`),
      description: isArabic
        ? `ورشة متخصصة في ${brand} بدبي للفحص والصيانة والإصلاح. احجز لدى ديجي-تك في القوز للحصول على تشخيص واضح وخدمة احترافية.`
        : `${brand} workshop in Dubai for diagnostics, maintenance and repair. Visit DIGI-TEC in Al Quoz for clear inspections, practical guidance and booking support.`,
      heading,
      sectionHeading: isArabic ? `صيانة وإصلاح ${brand} في دبي` : `${brand} maintenance and repair in Dubai`,
      summary: isArabic
        ? `دليل عملي لمالكي ${brand} في دبي عن الصيانة والتشخيص والأعطال الشائعة وكيفية اختيار ورشة متخصصة.`
        : `A practical ${brand} owner guide covering common concerns, diagnostic steps, maintenance planning and workshop preparation in Dubai.`,
      services: isArabic
        ? ['الأعطال الشائعة في أجواء دبي', 'الفحص والتشخيص المتخصص', 'الصيانة والإصلاح', 'القطع والضمان وخدمة ما بعد الإصلاح']
        : ['Common concerns in Dubai conditions', 'Specialist inspection and diagnostics', 'Maintenance and repair planning', 'Parts, warranty and aftercare'],
    };
  }

  if (section === 'brands') {
    const brand = brandNameFromSlug(brandSlug);
    const service = serviceSlug ? serviceNameFromSlug(serviceSlug) : null;
    const arabicService = serviceSlug ? arabicServiceNameFromSlug(serviceSlug) : null;
    const EnglishHeading = service ? `${brand} ${service} in Dubai` : `${brand} Service & Repair in Dubai`;
    const heading = isArabic
      ? (arabicService ? `${arabicService} ${brand} في دبي` : `صيانة وإصلاح ${brand} في دبي`)
      : EnglishHeading;
    const title = isArabic
      ? `${heading} | ديجي-تك`
      : `${EnglishHeading} | Digi-Tec`;
    const description = isArabic
      ? `خدمة ${brand} المتخصصة في دبي لدى ديجي-تك في القوز: فحص دقيق، صيانة وإصلاحات موثوقة.`
      : `${brand} specialist service in Dubai at Digi-Tec Al Quoz. Accurate diagnostics, maintenance and repairs with clear advice.`;

    return {
      path: pathname,
      title,
      description,
      heading,
      sectionHeading: isArabic ? `خدمات ${brand} المتخصصة في دبي` : `${brand} specialist services in Dubai`,
      summary: isArabic
        ? `يوفر ديجي-تك في القوز، دبي خدمة ${brand} المتخصصة، من التشخيص إلى الصيانة والإصلاح، مع فحص واضح قبل بدء العمل.`
        : `Digi-Tec Performance Centre in Al Quoz, Dubai provides specialist ${brand} diagnostics, maintenance and repair with a clear inspection before work begins.`,
      services: isArabic
        ? ['فحص وتشخيص متخصص', 'صيانة دورية', 'إصلاحات ميكانيكية وكهربائية', 'قطع مناسبة واختبار نهائي']
        : ['Specialist diagnostic inspection', 'Routine maintenance', 'Mechanical and electrical repair', 'Suitable parts and final testing'],
    };
  }

  if (section === 'services') {
    const service = serviceNameFromSlug(brandSlug.replace(/-dubai$/, ''));
    const arabicService = arabicServiceNameFromSlug(brandSlug);
    const EnglishHeading = `${service} in Dubai`;
    const heading = isArabic ? `${arabicService} في دبي` : EnglishHeading;
    return {
      path: pathname,
      title: isArabic ? `${heading} | ديجي-تك` : `${EnglishHeading} | Digi-Tec`,
      description: isArabic
        ? `خدمة ${arabicService} في دبي لدى ديجي-تك في القوز. فحص احترافي وإصلاحات موثوقة للسيارات.`
        : `${service} in Dubai at Digi-Tec Al Quoz. Professional inspection, clear advice and reliable vehicle repair.`,
      heading,
      sectionHeading: isArabic ? `خدمة سيارات متخصصة في دبي` : `Specialist vehicle service in Dubai`,
      summary: isArabic
        ? `يوفر ديجي-تك في القوز، دبي خدمة ${arabicService} للسيارات مع فحص واضح وخطة عمل مناسبة.`
        : `Digi-Tec Performance Centre in Al Quoz, Dubai provides ${service} with a clear inspection and a suitable repair plan.`,
      services: isArabic
        ? ['فحص شامل', 'تشخيص دقيق', 'إصلاحات موثوقة', 'اختبار نهائي']
        : ['Vehicle inspection', 'Accurate diagnostics', 'Reliable repair', 'Final testing'],
    };
  }

  return null;
};

const escapeHtml = (value) => value.replace(/[&<>'"]/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;',
}[character]));

const replaceTag = (html, pattern, replacement) => html.replace(pattern, replacement);

const createRouteHtml = (template, route) => {
  const url = `${siteUrl}${route.path}`;
  const isArabic = route.path === '/ar' || route.path.startsWith('/ar/');
  const englishPath = isArabic ? (route.path.replace(/^\/ar(?=\/|$)/, '') || '/') : route.path;
  const englishUrl = `${siteUrl}${englishPath}`;
  const arabicUrl = `${siteUrl}/ar${englishPath === '/' ? '' : englishPath}`;
  const alternateLinks = [
    `<link rel="alternate" hreflang="en-AE" href="${englishUrl}">`,
    `<link rel="alternate" hreflang="ar-AE" href="${arabicUrl}">`,
    `<link rel="alternate" hreflang="x-default" href="${englishUrl}">`,
  ].join('\n');
  const serviceList = route.services.map((service) => `<li>${escapeHtml(service)}</li>`).join('');
  const isArticle = route.schemaType === 'Article';
  const isBlogCollection = route.schemaType === 'CollectionPage';
  const breadcrumbItems = [
    { '@type': 'ListItem', position: 1, name: isArabic ? 'الرئيسية' : 'Home', item: isArabic ? `${siteUrl}/ar` : `${siteUrl}/` },
    ...(isArticle
      ? [{ '@type': 'ListItem', position: 2, name: isArabic ? 'المقالات' : 'Blog', item: isArabic ? `${siteUrl}/ar/blog` : `${siteUrl}/blog` }]
      : []),
    {
      '@type': 'ListItem',
      position: isArticle ? 3 : 2,
      name: isBlogCollection ? (isArabic ? 'المقالات' : 'Blog') : route.heading,
      item: url,
    },
  ];
  const pageEntity = {
    '@type': isBlogCollection ? 'CollectionPage' : 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: route.title,
    description: route.description,
    inLanguage: isArabic ? 'ar-AE' : 'en-AE',
    isPartOf: { '@id': `${siteUrl}/#website` },
  };
  const subjectEntity = isArticle
    ? {
        '@type': 'Article',
        '@id': `${url}#article`,
        headline: route.heading,
        description: route.description,
        url,
        inLanguage: isArabic ? 'ar-AE' : 'en-AE',
        mainEntityOfPage: { '@id': `${url}#webpage` },
        author: { '@type': 'Organization', name: isArabic ? 'فريق ورشة ديجي-تك' : 'DIGI-TEC Workshop', url: siteUrl },
        publisher: { '@type': 'Organization', name: 'Digi-Tec Performance Center', url: siteUrl },
        isAccessibleForFree: true,
      }
    : isBlogCollection
      ? {
          '@type': 'Blog',
          '@id': `${url}#blog`,
          name: route.heading,
          description: route.description,
          url,
          inLanguage: isArabic ? 'ar-AE' : 'en-AE',
          publisher: { '@type': 'Organization', name: 'Digi-Tec Performance Center', url: siteUrl },
        }
      : {
          '@type': 'Service',
          '@id': `${url}#service`,
          name: route.heading,
          description: route.description,
          url,
          inLanguage: isArabic ? 'ar-AE' : 'en-AE',
          provider: { '@id': `${siteUrl}/#business` },
          areaServed: { '@type': 'City', name: isArabic ? 'دبي' : 'Dubai' },
        };
  const schema = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      pageEntity,
      subjectEntity,
      {
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbItems,
      },
    ],
  }).replace(/</g, '\\u003c');

  let html = template;
  html = html.replace(/<html lang="[^"]*"(?: dir="[^"]*")?>/i, `<html lang="${isArabic ? 'ar' : 'en'}"${isArabic ? ' dir="rtl"' : ''}>`);
  html = replaceTag(html, /<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(route.title)}</title>`);
  html = replaceTag(html, /<meta name="description"[^>]*>/i, `<meta name="description" content="${escapeHtml(route.description)}">`);
  html = replaceTag(html, /<link rel="canonical"[^>]*>/i, `<link rel="canonical" href="${url}">`);
  html = html.replace(/\s*<link rel="alternate" hreflang="(?:en-AE|ar-AE|x-default)"[^>]*>\n?/gi, '');
  html = replaceTag(html, /<meta property="og:url"[^>]*>/i, `<meta property="og:url" content="${url}">`);
  html = replaceTag(html, /<meta property="og:locale"[^>]*>/i, `<meta property="og:locale" content="${isArabic ? 'ar_AE' : 'en_AE'}">`);
  html = replaceTag(html, /<meta property="og:type"[^>]*>/i, `<meta property="og:type" content="${isArticle ? 'article' : 'website'}">`);
  html = replaceTag(html, /<meta property="og:title"[^>]*>/i, `<meta property="og:title" content="${escapeHtml(route.title)}">`);
  html = replaceTag(html, /<meta name="twitter:title"[^>]*>/i, `<meta name="twitter:title" content="${escapeHtml(route.title)}">`);
  html = replaceTag(html, /<meta property="og:description"[^>]*>/i, `<meta property="og:description" content="${escapeHtml(route.description)}">`);
  html = replaceTag(html, /<meta name="twitter:description"[^>]*>/i, `<meta name="twitter:description" content="${escapeHtml(route.description)}">`);
  html = html.replace('</head>', `${alternateLinks}\n<script type="application/ld+json" data-prerendered-seo="true">${schema}</script>\n</head>`);
  html = html.replace(
    '<div id="root"></div>',
    `<div id="root"><main data-prerendered-seo="true"><h1>${escapeHtml(route.heading)}</h1><p>${escapeHtml(route.summary)}</p><h2>${escapeHtml(route.sectionHeading)}</h2><ul>${serviceList}</ul><p>${isArabic ? 'احجز فحصاً لدى مركز ديجي-تك في القوز، دبي. اتصل على +971 4 340 2223 أو تواصل معنا عبر واتساب.' : 'Book an inspection with Digi-Tec Performance Centre in Al Quoz, Dubai. Call +971 4 340 2223 or contact us on WhatsApp.'}</p></main></div>`,
  );
  return html;
};

const distDirectory = path.resolve('dist');
const template = await readFile(path.join(distDirectory, 'index.html'), 'utf8');
const sitemap = await readFile(path.resolve('public/sitemap.xml'), 'utf8');
const sitemapPaths = [...sitemap.matchAll(/<loc>(https:\/\/digitecme\.com[^<]+)<\/loc>/g)]
  .map(([, url]) => new URL(url).pathname)
  .filter((pathname) =>
    /^(?:\/ar)?\/(?:brands|services)\//.test(pathname)
    || /^(?:\/ar)?\/blog(?:\/|$)/.test(pathname));
const routeByPath = new Map(priorityRoutes.map((route) => [route.path, route]));

for (const pathname of sitemapPaths) {
  if (!routeByPath.has(pathname)) {
    const route = createGeneratedRoute(pathname);
    if (route) routeByPath.set(pathname, route);
  }
}

for (const route of routeByPath.values()) {
  const outputDirectory = path.join(distDirectory, route.path.replace(/^\//, ''));
  await mkdir(outputDirectory, { recursive: true });
  await writeFile(path.join(outputDirectory, 'index.html'), createRouteHtml(template, route));
}

console.log(`Generated crawlable HTML for ${routeByPath.size} brand, service and blog routes.`);
