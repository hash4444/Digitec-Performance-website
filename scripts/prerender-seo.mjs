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
  {
    path: '/brands/range-rover-service-dubai',
    title: 'Range Rover Repair Dubai | JLR Specialists | Digi-Tec',
    description: 'Range Rover repair and service in Dubai for Range Rover, Sport, Velar and Evoque. JLR diagnostics, air suspension, cooling and ZF repair in Al Quoz.',
    heading: 'Range Rover Repair & Service Dubai',
    sectionHeading: 'Independent Range Rover specialist workshop in Dubai',
    summary: 'Digi-Tec Performance Centre is an independent Range Rover specialist workshop in Al Quoz, Dubai. We diagnose, maintain and repair Range Rover, Range Rover Sport, Velar and Evoque models with JLR-compatible diagnostics, a clear inspection and estimate before approved work begins.',
    services: ['JLR diagnostics and calibration', 'Range Rover air suspension repair', 'ZF 8HP transmission diagnosis and repair', 'Ingenium and V8 maintenance', 'AC, cooling, brakes and electrical repair', 'Range Rover Sport, Velar and Evoque service'],
  },
  {
    path: '/brands/defender-service-dubai',
    title: 'Defender Repair Dubai | Land Rover Specialists | Digi-Tec',
    description: 'Land Rover Defender repair and service in Dubai for Defender 90, 110, 130, V8 and OCTA. JLR diagnostics, air suspension and 4x4 care in Al Quoz.',
    heading: 'Defender Repair & Service Dubai',
    sectionHeading: 'Independent Land Rover Defender specialist workshop in Dubai',
    summary: 'Digi-Tec Performance Centre is an independent Defender specialist workshop in Al Quoz, Dubai. We diagnose, maintain and repair Defender 90, 110, 130, V8 and OCTA models with JLR-compatible diagnostics, a clear inspection and estimate before approved work begins.',
    services: ['JLR diagnostics and calibration', 'Defender air suspension repair', '4x4, Terrain Response and driveline diagnosis', 'Defender 90, 110 and 130 maintenance', 'Cooling, AC, brakes and electrical repair', 'Defender V8 and OCTA specialist support'],
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
  .replace('Land Rover', 'Land Rover')
  .replace(/^Bmw$/, 'BMW')
  .replace(/^Mclaren$/, 'McLaren')
  .replace(/^Mini$/, 'MINI')
  .replace(/^Gmc$/, 'GMC')
  .replace(/^Byd$/, 'BYD');

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
  'ferrari-maintenance-guide-dubai': {
    en: {
      title: 'Ferrari Maintenance Dubai | Service Schedule & Costs',
      heading: 'Ferrari Maintenance in Dubai: Service Schedule, Costs & What to Expect',
      description: 'Plan Ferrari maintenance in Dubai: service intervals, cost factors, warning signs and essential checks for UAE heat, storage and performance driving.',
      summary: 'A practical Ferrari maintenance guide for Dubai owners, covering service timing, cost factors, warning signs and the checks that matter in UAE conditions.',
      image: '/images/ferrari-maintenance-dubai.jpg',
      datePublished: '2026-07-16',
      dateModified: '2026-08-05',
    },
    ar: {
      title: 'صيانة فيراري في دبي | جدول الخدمة والتكلفة',
      heading: 'صيانة فيراري في دبي: جدول الخدمة والتكلفة وما يجب توقعه',
      description: 'دليل صيانة فيراري في دبي: مواعيد الخدمة وعوامل التكلفة وعلامات التحذير والفحوص المهمة في حرارة الإمارات وفترات التخزين.',
      summary: 'دليل عملي لمالكي فيراري في دبي عن مواعيد الصيانة وعوامل التكلفة والفحوص المهمة في ظروف الإمارات.',
      image: '/images/ferrari-maintenance-dubai.jpg',
      datePublished: '2026-07-16',
      dateModified: '2026-08-05',
    },
  },
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
  'mercedes-amg-gt-black-series-1300hp-build-dubai': {
    en: {
      title: 'GT Black Series 1300 HP Build Dubai | Digi-Tec',
      heading: 'Mercedes-AMG GT Black Series: 730 HP to 1,300 HP Custom Build',
      description: 'See Digi-Tec’s Mercedes-AMG GT Black Series transformation in Dubai: a full custom build developed from 730 hp to a 1,300 hp project specification with ECU calibration.',
      summary: 'A full custom Mercedes-AMG GT Black Series transformation at Digi-Tec in Dubai, developed from its factory 730 hp rating to a 1,300 hp project specification with bespoke ECU calibration.',
    },
    ar: {
      title: 'مشروع GT Black Series بقوة 1300 حصان في دبي | ديجي-تك',
      heading: 'مرسيدس AMG GT Black Series: مشروع مخصص من 730 إلى 1300 حصان',
      description: 'شاهد مشروع مرسيدس AMG GT Black Series المخصص في دبي لدى ديجي-تك، من قوة المصنع 730 حصان إلى مواصفات مشروع 1300 حصان مع برمجة ECU مخصصة.',
      summary: 'مشروع تطوير مخصص لمرسيدس AMG GT Black Series في دبي، مبني حول مواصفات 1300 حصان مع برمجة ECU مخصصة.',
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
    if (!brandSlug) return null;
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
    if (!brandSlug) return null;
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

// ---------------------------------------------------------------------------
// Static (non brand/service/blog) routes. Without these the SPA fallback
// serves the homepage title, description and canonical on every one of them.
// ---------------------------------------------------------------------------
const staticRoutes = {
  '/about': {
    title: 'About Digi-Tec Performance Center Dubai | Since 2002',
    description: 'Digi-Tec Performance Center has served luxury and German car owners in Al Quoz, Dubai since 2002, with factory-level diagnostics and specialist technicians.',
    heading: 'About Digi-Tec Performance Center in Dubai',
    sectionHeading: 'An independent luxury and German car workshop in Al Quoz',
    summary: 'Digi-Tec Performance Center is an independent luxury and German car workshop in Al Quoz, Dubai, operating since 2002. Our technicians work on Mercedes-Benz, BMW, Audi, Porsche, Range Rover, Ferrari, Lamborghini, Bentley and Rolls-Royce vehicles with factory-level diagnostic equipment, a written inspection and an estimate before any approved work starts.',
    services: ['Specialist diagnostics and inspection', 'Mechanical, electrical and transmission repair', 'Luxury and performance car maintenance', 'Bodywork, paint protection and detailing', 'Performance tuning with GAD Motors'],
  },
  '/services': {
    title: 'Car Services in Dubai | Digi-Tec Performance Center',
    description: 'Car service in Dubai for Mercedes, BMW, Audi, Porsche and Range Rover: diagnostics, oil change, brakes, AC, suspension, transmission and electrical repair.',
    heading: 'Car Services in Dubai',
    sectionHeading: 'Workshop services available at our Al Quoz centre',
    summary: 'Digi-Tec Performance Center in Al Quoz, Dubai provides routine servicing, electronic diagnostics, mechanical and electrical repair, AC and cooling work, brakes, suspension, transmission repair, bodywork and paint protection for luxury and German vehicles.',
    services: ['Car service and oil change', 'Engine and electronic diagnostics', 'Brake, suspension and steering repair', 'AC, cooling and electrical repair', 'Transmission and mechanical repair', 'Bodywork, PPF and ceramic coating'],
  },
  '/faq': {
    title: 'Car Service FAQ Dubai | Digi-Tec Performance Center',
    description: 'Answers to common questions about car service in Dubai: diagnostics, estimates, parts, warranty, service intervals and booking at Digi-Tec Al Quoz.',
    heading: 'Car Service Questions Answered',
    sectionHeading: 'Common questions from Dubai vehicle owners',
    summary: 'Answers to the questions Dubai owners ask most often about diagnostics, written estimates, parts quality, service intervals, warranty impact and how to book an inspection at our Al Quoz workshop.',
    services: ['How diagnostics and estimates work', 'Parts, warranty and aftercare', 'Service intervals in Dubai heat', 'How to book an inspection'],
  },
  '/tuning': {
    title: 'Car Tuning Dubai | GAD Motors Partner | Digi-Tec',
    description: 'Performance tuning in Dubai with official GAD Motors calibration for Mercedes-AMG, BMW M, Audi RS and Porsche, plus supporting hardware and inspection.',
    heading: 'Performance Tuning in Dubai',
    sectionHeading: 'Official GAD Motors tuning partner in Dubai',
    summary: 'Digi-Tec Performance Center is the official GAD Motors tuning partner in Dubai. Every project starts with a mechanical health inspection, then calibration and supporting hardware chosen for the vehicle and how it is actually driven in UAE conditions.',
    services: ['ECU calibration by GAD Motors', 'Mercedes-AMG and BMW M projects', 'Supporting hardware and cooling', 'Pre-tuning mechanical inspection'],
  },
  '/vrx': {
    title: 'VRX Performance Programs Dubai | Digi-Tec',
    description: 'VRX performance programs at Digi-Tec Dubai: engineered upgrade packages, calibration and supporting hardware for luxury and performance vehicles.',
    heading: 'VRX Performance Programs in Dubai',
    sectionHeading: 'Engineered performance packages at our Dubai workshop',
    summary: 'VRX performance programs at Digi-Tec Performance Center in Al Quoz, Dubai combine calibration, supporting hardware and inspection into engineered upgrade packages for luxury and performance vehicles.',
    services: ['Engineered upgrade packages', 'Calibration and hardware matching', 'Cooling and drivetrain support', 'Workshop inspection and testing'],
  },
  '/blog': null,
  '/sitemap': {
    title: 'Site Map | Digi-Tec Performance Center Dubai',
    description: 'Browse every Digi-Tec Performance Center page: car services in Dubai, brand specialist pages, owner guides and workshop information.',
    heading: 'Digi-Tec Site Map',
    sectionHeading: 'Every page on the Digi-Tec website',
    summary: 'Browse the full Digi-Tec Performance Center website: car service pages, brand specialist pages for Mercedes, BMW, Audi, Porsche and Range Rover, owner guides and workshop information for Al Quoz, Dubai.',
    services: ['Car service pages', 'Brand specialist pages', 'Owner guides and articles', 'Workshop information'],
  },
};

const arabicStaticRoutes = {
  '/about': {
    title: 'عن مركز ديجي-تك في دبي | خبرة منذ 2002',
    description: 'مركز ديجي-تك في القوز، دبي يخدم مالكي السيارات الفاخرة والألمانية منذ 2002 بأجهزة تشخيص متقدمة وفنيين متخصصين وفحص واضح قبل العمل.',
    heading: 'عن مركز ديجي-تك للسيارات في دبي',
    sectionHeading: 'ورشة مستقلة للسيارات الفاخرة والألمانية في القوز',
    summary: 'مركز ديجي-تك ورشة مستقلة في القوز، دبي تعمل منذ 2002 في صيانة وإصلاح مرسيدس وبي إم دبليو وأودي وبورشه ورينج روفر وفيراري ولامبورغيني وبنتلي ورولز رويس، مع فحص مكتوب وعرض سعر قبل بدء أي عمل.',
    services: ['تشخيص وفحص متخصص', 'إصلاحات ميكانيكية وكهربائية وناقل الحركة', 'صيانة السيارات الفاخرة والرياضية', 'الهيكل وحماية الطلاء والعناية', 'تطوير الأداء مع GAD Motors'],
  },
  '/services': {
    title: 'خدمات صيانة السيارات في دبي | ديجي-تك',
    description: 'خدمات صيانة السيارات في دبي لمرسيدس وبي إم دبليو وأودي وبورشه ورينج روفر: تشخيص، تغيير زيت، فرامل، تكييف، تعليق، ناقل حركة وكهرباء.',
    heading: 'خدمات صيانة السيارات في دبي',
    sectionHeading: 'خدمات ورشتنا في القوز، دبي',
    summary: 'يوفر مركز ديجي-تك في القوز، دبي الصيانة الدورية والتشخيص الإلكتروني والإصلاحات الميكانيكية والكهربائية وأعمال التكييف والتبريد والفرامل والتعليق وناقل الحركة والهيكل وحماية الطلاء للسيارات الفاخرة والألمانية.',
    services: ['صيانة السيارات وتغيير الزيت', 'تشخيص المحرك والأنظمة الإلكترونية', 'إصلاح الفرامل والتعليق والتوجيه', 'التكييف والتبريد والكهرباء', 'ناقل الحركة والإصلاحات الميكانيكية', 'الهيكل وفيلم الحماية والسيراميك'],
  },
  '/faq': {
    title: 'أسئلة شائعة عن صيانة السيارات في دبي | ديجي-تك',
    description: 'أجوبة عن أكثر الأسئلة شيوعاً حول صيانة السيارات في دبي: التشخيص وعرض السعر والقطع والضمان ومواعيد الخدمة وطريقة الحجز في القوز.',
    heading: 'أسئلة شائعة عن صيانة السيارات',
    sectionHeading: 'أسئلة يطرحها مالكو السيارات في دبي',
    summary: 'أجوبة عن الأسئلة التي يطرحها مالكو السيارات في دبي حول التشخيص وعرض السعر المكتوب وجودة القطع ومواعيد الصيانة في الحرارة وتأثير العمل على الضمان وطريقة حجز فحص في ورشتنا بالقوز.',
    services: ['كيف يتم التشخيص وعرض السعر', 'القطع والضمان وخدمة ما بعد الإصلاح', 'مواعيد الصيانة في حرارة دبي', 'كيفية حجز موعد فحص'],
  },
  '/tuning': {
    title: 'برمجة وتطوير أداء السيارات في دبي | ديجي-تك',
    description: 'تطوير أداء السيارات في دبي مع برمجة GAD Motors الرسمية لمرسيدس AMG وبي إم دبليو M وأودي RS وبورشه، مع القطع الداعمة والفحص المسبق.',
    heading: 'تطوير أداء السيارات في دبي',
    sectionHeading: 'الشريك الرسمي لـ GAD Motors في دبي',
    summary: 'مركز ديجي-تك هو الشريك الرسمي لـ GAD Motors في دبي. يبدأ كل مشروع بفحص ميكانيكي شامل، ثم البرمجة والقطع الداعمة المناسبة للسيارة وطريقة استخدامها في أجواء الإمارات.',
    services: ['برمجة ECU من GAD Motors', 'مشاريع مرسيدس AMG وبي إم دبليو M', 'القطع الداعمة وأنظمة التبريد', 'فحص ميكانيكي قبل البرمجة'],
  },
  '/vrx': {
    title: 'برامج أداء VRX في دبي | ديجي-تك',
    description: 'برامج أداء VRX في مركز ديجي-تك دبي: حزم ترقية مدروسة وبرمجة وقطع داعمة للسيارات الفاخرة والرياضية مع فحص واختبار نهائي.',
    heading: 'برامج أداء VRX في دبي',
    sectionHeading: 'حزم أداء مدروسة في ورشتنا بدبي',
    summary: 'تجمع برامج VRX في مركز ديجي-تك بالقوز، دبي بين البرمجة والقطع الداعمة والفحص في حزم ترقية مدروسة للسيارات الفاخرة والرياضية.',
    services: ['حزم ترقية مدروسة', 'مطابقة البرمجة والقطع', 'دعم التبريد ونقل القوة', 'الفحص والاختبار في الورشة'],
  },
  '/sitemap': {
    title: 'خريطة الموقع | مركز ديجي-تك دبي',
    description: 'تصفح جميع صفحات مركز ديجي-تك: خدمات صيانة السيارات في دبي وصفحات العلامات وأدلة المالكين ومعلومات الورشة في القوز.',
    heading: 'خريطة موقع ديجي-تك',
    sectionHeading: 'جميع صفحات موقع ديجي-تك',
    summary: 'تصفح موقع مركز ديجي-تك بالكامل: صفحات خدمات السيارات وصفحات العلامات لمرسيدس وبي إم دبليو وأودي وبورشه ورينج روفر وأدلة المالكين ومعلومات ورشتنا في القوز، دبي.',
    services: ['صفحات خدمات السيارات', 'صفحات العلامات التجارية', 'أدلة ومقالات المالكين', 'معلومات الورشة'],
  },
};

const bestWorkshopBrand = (pathname) => {
  const match = pathname.replace(/^\/ar/, '').match(/^\/best-([a-z0-9-]+)-workshop-dubai$/);
  if (!match) return null;
  const slug = match[1];
  if (slug === 'car') return { slug, brand: null };
  return { slug, brand: brandNameFromSlug(`${slug}-service-dubai`).replace('Bmw', 'BMW').replace('Mclaren', 'McLaren') };
};

const createStaticRoute = (pathname) => {
  const isArabic = pathname === '/ar' || pathname.startsWith('/ar/');
  const basePath = isArabic ? (pathname.replace(/^\/ar(?=\/|$)/, '') || '/') : pathname;

  const fixed = (isArabic ? arabicStaticRoutes : staticRoutes)[basePath];
  if (fixed) return { path: pathname, ...fixed };

  const workshop = bestWorkshopBrand(basePath);
  if (workshop) {
    const { brand } = workshop;
    if (isArabic) {
      const label = brand ? `ورشة ${brand}` : 'ورشة سيارات';
      return {
        path: pathname,
        title: `أفضل ${label} في دبي | ديجي-تك`,
        description: `تبحث عن أفضل ${label} في دبي؟ مركز ديجي-تك في القوز يقدم تشخيصاً دقيقاً وفنيين متخصصين وعرض سعر واضح قبل بدء العمل.`,
        heading: `أفضل ${label} في دبي`,
        sectionHeading: `لماذا يختار المالكون ديجي-تك في دبي؟`,
        summary: `مركز ديجي-تك في القوز، دبي ورشة مستقلة متخصصة تعمل منذ 2002، وتقدم تشخيصاً بأجهزة متقدمة وفحصاً مكتوباً وعرض سعر واضح قبل بدء أي عمل${brand ? ` على سيارات ${brand}` : ''}.`,
        services: ['فنيون متخصصون وخبرة طويلة', 'تشخيص بأجهزة متقدمة', 'عرض سعر واضح قبل العمل', 'قطع مناسبة وخدمة ما بعد الإصلاح'],
      };
    }
    const label = brand ? `${brand} Workshop` : 'Car Workshop';
    return {
      path: pathname,
      title: `Best ${label} in Dubai | Digi-Tec Al Quoz`,
      description: `Looking for the best ${brand ?? 'car'} workshop in Dubai? Digi-Tec in Al Quoz offers specialist diagnostics, experienced technicians and a written estimate before work starts.`,
      heading: `Best ${label} in Dubai`,
      sectionHeading: `Why owners choose Digi-Tec in Dubai`,
      summary: `Digi-Tec Performance Center is an independent specialist workshop in Al Quoz, Dubai, operating since 2002. We diagnose${brand ? ` ${brand} vehicles` : ' vehicles'} with factory-level equipment, give a written inspection and estimate before approved work, and test every repair before handover.`,
      services: ['Experienced specialist technicians', 'Factory-level diagnostic equipment', 'Written estimate before work starts', 'Suitable parts and aftercare'],
    };
  }

  return null;
};

// ---------------------------------------------------------------------------
// Crawlable internal linking. Without real anchors the crawler sees isolated
// pages: orphan pages, no incoming internal links and excessive crawl depth.
// ---------------------------------------------------------------------------
const primaryBrandSlugs = [
  'mercedes-benz', 'bmw', 'audi', 'porsche', 'range-rover', 'land-rover',
  'ferrari', 'lamborghini', 'bentley', 'rolls-royce', 'mclaren', 'maserati',
  'aston-martin', 'maybach', 'defender', 'toyota', 'lexus', 'nissan',
];
const primaryServiceSlugs = [
  'car-service-dubai', 'oil-change-dubai', 'brake-repair-dubai', 'car-ac-repair-dubai',
  'engine-diagnostics-dubai', 'suspension-repair-dubai', 'transmission-repair-dubai',
  'mercedes-repair-dubai',
];
const brandServiceSlugs = [
  'oil-change', 'brake-repair', 'ac-repair', 'engine-diagnostics',
  'suspension-repair', 'transmission-repair', 'mechanical-repair', 'electrical-repair',
  'battery-replacement', 'tire-repair', 'exhaust-repair', 'steering-repair',
  'fuel-system-repair', 'body-repair',
];

const anchor = (href, label) => `<a href="${href}">${escapeHtml(label)}</a>`;

const linkList = (heading, links) => (links.length
  ? `<nav aria-label="${escapeHtml(heading)}"><h2>${escapeHtml(heading)}</h2><ul>${links.map((link) => `<li>${anchor(link.href, link.label)}</li>`).join('')}</ul></nav>`
  : '');

const siteNavLinks = (isArabic) => {
  const prefix = isArabic ? '/ar' : '';
  const labels = isArabic
    ? { home: 'الرئيسية', services: 'خدمات السيارات', about: 'عن ديجي-تك', blog: 'المقالات', faq: 'أسئلة شائعة', tuning: 'تطوير الأداء', sitemap: 'خريطة الموقع' }
    : { home: 'Home', services: 'Car services in Dubai', about: 'About Digi-Tec', blog: 'Owner guides', faq: 'FAQ', tuning: 'Performance tuning', sitemap: 'Site map' };
  return [
    { href: `${prefix || '/'}`, label: labels.home },
    { href: `${prefix}/services`, label: labels.services },
    { href: `${prefix}/about`, label: labels.about },
    { href: `${prefix}/blog`, label: labels.blog },
    { href: `${prefix}/faq`, label: labels.faq },
    { href: `${prefix}/tuning`, label: labels.tuning },
    { href: `${prefix}/sitemap`, label: labels.sitemap },
  ];
};

const relatedLinksFor = (route) => {
  const isArabic = route.path === '/ar' || route.path.startsWith('/ar/');
  const prefix = isArabic ? '/ar' : '';
  const basePath = isArabic ? (route.path.replace(/^\/ar(?=\/|$)/, '') || '/') : route.path;
  const segments = basePath.split('/').filter(Boolean);
  const [section, first, second] = segments;

  if (section === 'brands' && first) {
    const brand = brandNameFromSlug(first);
    const services = brandServiceSlugs
      .filter((slug) => slug !== second)
      .slice(0, 8)
      .map((slug) => ({
        href: `${prefix}/brands/${first}/${slug}`,
        label: isArabic ? `${arabicServiceNameFromSlug(slug)} ${brand}` : `${brand} ${serviceNameFromSlug(slug)} Dubai`,
      }));
    const links = second
      ? [{ href: `${prefix}/brands/${first}`, label: isArabic ? `صيانة ${brand} في دبي` : `${brand} service Dubai` }, ...services]
      : services;
    return links.slice(0, 9);
  }

  if (section === 'services') {
    return primaryBrandSlugs.slice(0, 8).map((slug) => ({
      href: `${prefix}/brands/${slug}-service-dubai`,
      label: isArabic ? `صيانة ${brandNameFromSlug(`${slug}-service-dubai`)} في دبي` : `${brandNameFromSlug(`${slug}-service-dubai`)} service Dubai`,
    }));
  }

  return primaryServiceSlugs.map((slug) => ({
    href: `${prefix}/services/${slug}`,
    label: isArabic ? `${arabicServiceNameFromSlug(slug)} في دبي` : `${serviceNameFromSlug(slug.replace(/-dubai$/, ''))} Dubai`,
  }));
};

const brandHubLinks = (isArabic) => {
  const prefix = isArabic ? '/ar' : '';
  return primaryBrandSlugs.slice(0, 12).map((slug) => ({
    href: `${prefix}/brands/${slug}-service-dubai`,
    label: isArabic ? `صيانة ${brandNameFromSlug(`${slug}-service-dubai`)}` : `${brandNameFromSlug(`${slug}-service-dubai`)} specialist`,
  }));
};

// ---------------------------------------------------------------------------
// Unique body copy per service topic, so brand x service pages stop reading as
// near-duplicates of each other in the crawlable HTML.
// ---------------------------------------------------------------------------
const serviceProfiles = {
  'oil-change': {
    en: {
      scope: 'draining the engine oil at temperature, replacing the oil filter and sealing washers, refilling with the exact viscosity and approval the engine was designed for, then resetting the service counter and checking for leaks on the lift.',
      symptoms: ['a service or oil countdown message on the dashboard', 'oil level dropping between services', 'dark, thin oil or a burnt smell', 'a tapping noise on cold start'],
      checks: ['oil level, condition and consumption history', 'filter housing, drain plug and gasket condition', 'undertray, sump and turbo oil line inspection', 'service counter reset and post-service leak check'],
      question: 'How often should the oil be changed in Dubai?',
      answer: 'In Dubai heat and stop-start traffic, most owners are better served by shortening the factory interval, typically every 8,000 to 10,000 km or once a year, whichever comes first. Short trips, track use and long idling periods shorten it further.',
    },
    ar: {
      scope: 'تصريف زيت المحرك وهو دافئ، وتبديل الفلتر والحلقات، وتعبئة الزيت بالمواصفة واللزوجة المعتمدة للمحرك، ثم تصفير عداد الصيانة وفحص التسريبات على الرافعة.',
      symptoms: ['ظهور رسالة موعد الصيانة على الشاشة', 'انخفاض مستوى الزيت بين الصيانات', 'زيت داكن أو رائحة احتراق', 'صوت طقطقة عند التشغيل البارد'],
      checks: ['مستوى الزيت وحالته ومعدل استهلاكه', 'حالة بيت الفلتر وصامولة التصريف والحشوات', 'فحص الكرتير وخطوط زيت التيربو والدرع السفلي', 'تصفير عداد الصيانة وفحص التسريب بعد العمل'],
      question: 'كم مرة يجب تغيير الزيت في دبي؟',
      answer: 'في حرارة دبي والازدحام اليومي يفضل تقصير الفترة المعتمدة من المصنع، عادة كل 8,000 إلى 10,000 كم أو مرة سنوياً أيهما أقرب، وتقل هذه المدة مع الرحلات القصيرة والاستخدام الرياضي.',
    },
  },
  'brake-repair': {
    en: {
      scope: 'measuring pad thickness and disc runout, inspecting calipers, guides and flexible lines, checking brake fluid moisture content, then replacing worn components and bedding the brakes in on a road test.',
      symptoms: ['squealing or grinding under braking', 'a pulsing or vibrating brake pedal', 'longer stopping distances', 'a brake wear or fluid warning on the dashboard'],
      checks: ['pad and disc measurement against wear limits', 'caliper piston, slider and dust boot condition', 'brake fluid moisture and boiling point test', 'handbrake, ABS sensors and road test'],
      question: 'Why do brakes wear faster in Dubai?',
      answer: 'Heat, heavy stop-start traffic and fine airborne sand all accelerate pad and disc wear, and they age brake fluid faster than a temperate climate. Measuring pads and testing fluid at every service is the reliable way to catch it early.',
    },
    ar: {
      scope: 'قياس سماكة الفحمات وانحراف الأقراص، وفحص الكاليبرات والمساند وخراطيم الفرامل، وقياس نسبة الرطوبة في زيت الفرامل، ثم تبديل القطع المتآكلة وتجربة الطريق.',
      symptoms: ['صرير أو صوت حك عند الفرملة', 'اهتزاز في دواسة الفرامل', 'زيادة مسافة التوقف', 'ظهور تحذير الفرامل أو الزيت'],
      checks: ['قياس الفحمات والأقراص مقارنة بحدود التآكل', 'حالة مكابس الكاليبر والمساند والأغطية', 'فحص رطوبة زيت الفرامل ودرجة غليانه', 'فرامل اليد وحساسات ABS وتجربة الطريق'],
      question: 'لماذا تتآكل الفرامل أسرع في دبي؟',
      answer: 'الحرارة والازدحام والغبار الناعم تسرّع تآكل الفحمات والأقراص وتُقصّر عمر زيت الفرامل. لذلك يجب قياس الفحمات وفحص الزيت في كل صيانة.',
    },
  },
  'ac-repair': {
    en: {
      scope: 'measuring high and low side pressures, leak testing with dye or nitrogen, checking compressor engagement, condenser airflow, blend flaps and cabin filter, then repairing the actual fault before recharging the system.',
      symptoms: ['air that is cool at speed but warm in traffic', 'a musty smell from the vents', 'compressor cutting in and out', 'water pooling in the footwell'],
      checks: ['system pressure and temperature readings', 'leak test on condenser, lines and evaporator', 'compressor, clutch and control valve operation', 'condenser cleaning, cabin filter and blend actuator test'],
      question: 'Why does the AC only blow cold when the car is moving?',
      answer: 'That pattern usually points to poor condenser airflow or a low refrigerant charge: at speed the airflow masks the problem, in traffic it cannot. A pressure test with a condenser and fan inspection identifies which one it is.',
    },
    ar: {
      scope: 'قياس ضغط الجهتين العالية والمنخفضة، وفحص التسريب بالصبغة أو النيتروجين، وفحص عمل الكمبروسر وتدفق الهواء على المكثف ومراوح التبريد وفلتر المقصورة، ثم إصلاح العطل قبل إعادة الشحن.',
      symptoms: ['تبريد جيد أثناء السير وضعيف في الازدحام', 'رائحة غير مستحبة من الفتحات', 'فصل ووصل متكرر للكمبروسر', 'تجمع ماء داخل المقصورة'],
      checks: ['قراءات الضغط ودرجات الحرارة', 'فحص تسريب المكثف والخطوط والمبخر', 'عمل الكمبروسر والكلتش وصمام التحكم', 'تنظيف المكثف وفلتر المقصورة وفحص محركات الهواء'],
      question: 'لماذا يبرد المكيف أثناء السير فقط؟',
      answer: 'غالباً بسبب ضعف تدفق الهواء على المكثف أو نقص غاز التبريد، فالسرعة تخفي المشكلة والازدحام يظهرها. فحص الضغط مع المكثف والمراوح يحدد السبب.',
    },
  },
  'engine-diagnostics': {
    en: {
      scope: 'reading stored and pending fault codes with manufacturer-level equipment, reviewing live data and freeze frame, then verifying the fault physically before any part is quoted or replaced.',
      symptoms: ['a check engine or limp mode warning', 'rough idle, misfire or hesitation', 'higher fuel consumption than usual', 'a warning that clears then returns'],
      checks: ['full system scan across all control modules', 'live data, fuel trims and sensor plausibility', 'smoke, pressure or compression testing where needed', 'code clearing and verification road test'],
      question: 'Is a fault code enough to know what to replace?',
      answer: 'No. A code names the circuit or symptom, not the failed part. Live data and a physical test confirm the cause, which is what prevents owners paying for parts that were never faulty.',
    },
    ar: {
      scope: 'قراءة الأعطال المخزنة والمعلقة بأجهزة بمستوى الوكالة، ومراجعة البيانات الحية ولقطة العطل، ثم التأكد من العطل عملياً قبل تسعير أو تبديل أي قطعة.',
      symptoms: ['إضاءة لمبة المحرك أو الدخول في وضع الطوارئ', 'اهتزاز في الوقوف أو تقطيع أو تأخر استجابة', 'زيادة استهلاك الوقود', 'تحذير يختفي ثم يعود'],
      checks: ['فحص شامل لجميع وحدات التحكم', 'البيانات الحية ونسب الوقود ومنطقية الحساسات', 'فحص الدخان أو الضغط أو الضغط الانضغاطي عند الحاجة', 'مسح الأكواد وتجربة الطريق للتأكد'],
      question: 'هل يكفي كود العطل لمعرفة القطعة التي يجب تبديلها؟',
      answer: 'لا. الكود يشير إلى الدائرة أو العرض وليس إلى القطعة التالفة. البيانات الحية والفحص العملي هما ما يؤكد السبب ويمنع تبديل قطع سليمة.',
    },
  },
  'suspension-repair': {
    en: {
      scope: 'inspecting springs, dampers, air struts, compressors, bushings and links, reading suspension control module data on air-sprung cars, then repairing leaks or worn components and re-calibrating ride height.',
      symptoms: ['the car sitting low or leaning on one corner', 'a suspension fault message on start-up', 'knocking over speed bumps', 'the compressor running for a long time'],
      checks: ['air spring, airline and valve block leak test', 'compressor duty cycle and dryer condition', 'damper, bushing, arm and link inspection', 'ride height calibration and alignment check'],
      question: 'Can an air suspension fault be repaired instead of replaced?',
      answer: 'Often yes. Leaks frequently sit in an airline, valve block or a single air spring, and a compressor may only need a dryer. A pressure test shows exactly which component is losing air before anything is ordered.',
    },
    ar: {
      scope: 'فحص الينابيع والمساعدات والوسائد الهوائية والكمبروسر والجلب والوصلات، وقراءة بيانات وحدة التعليق في السيارات الهوائية، ثم إصلاح التسريب أو تبديل القطع ومعايرة ارتفاع السيارة.',
      symptoms: ['انخفاض السيارة أو ميلانها على أحد الأركان', 'رسالة عطل في نظام التعليق', 'أصوات طرق على المطبات', 'عمل الكمبروسر لفترات طويلة'],
      checks: ['فحص تسريب الوسائد وخطوط الهواء وبلوك الصمامات', 'ساعات عمل الكمبروسر وحالة المجفف', 'فحص المساعدات والجلب والأذرع والوصلات', 'معايرة الارتفاع وفحص الزوايا'],
      question: 'هل يمكن إصلاح عطل التعليق الهوائي بدل تبديله بالكامل؟',
      answer: 'غالباً نعم. يكون التسريب في خط هواء أو بلوك صمامات أو وسادة واحدة، وقد يحتاج الكمبروسر إلى مجفف فقط. فحص الضغط يحدد القطعة المسربة قبل طلب أي قطع.',
    },
  },
  'transmission-repair': {
    en: {
      scope: 'reading transmission adaptation and temperature data, testing shift quality under load, inspecting the mechatronic unit, valve body, torque converter and cooler circuit, then repairing and re-adapting the gearbox.',
      symptoms: ['a jerk or flare between gears', 'delayed engagement into drive or reverse', 'a gearbox fault or limp home message', 'a red fluid leak under the car'],
      checks: ['live gearbox temperature, pressure and adaptation values', 'valve body and mechatronic inspection', 'fluid condition, level and cooler flow', 'road test with adaptation reset'],
      question: 'Does a transmission fault always mean a rebuild?',
      answer: 'No. Many faults are traced to fluid condition, a valve body solenoid, a mechatronic sleeve leak or a failing cooler, all repairable without a full rebuild when diagnosed early.',
    },
    ar: {
      scope: 'قراءة بيانات التكيّف والحرارة، وتجربة نقل السرعات تحت الحمل، وفحص الميكاترونيك وبلوك الصمامات والتورك كونفرتر ودائرة التبريد، ثم الإصلاح وإعادة التكيّف.',
      symptoms: ['خبطة أو تأخر بين السرعات', 'تأخر الدخول في D أو R', 'رسالة عطل في ناقل الحركة أو وضع الطوارئ', 'تسريب زيت أحمر أسفل السيارة'],
      checks: ['قيم الحرارة والضغط والتكيّف الحية', 'فحص بلوك الصمامات والميكاترونيك', 'حالة الزيت ومستواه وتدفق دائرة التبريد', 'تجربة الطريق مع إعادة التكيّف'],
      question: 'هل كل عطل في ناقل الحركة يعني عمرة كاملة؟',
      answer: 'لا. كثير من الأعطال سببها حالة الزيت أو صمام في بلوك الصمامات أو تسريب في الميكاترونيك أو ضعف التبريد، وكلها قابلة للإصلاح عند التشخيص المبكر.',
    },
  },
  'mechanical-repair': {
    en: {
      scope: 'diagnosing engine, cooling, drivetrain and ancillary faults, confirming the cause with pressure, leak-down or scope testing, then carrying out the repair with a documented estimate before parts are ordered.',
      symptoms: ['unusual noise, vibration or loss of power', 'coolant or oil loss with no obvious leak', 'overheating in traffic', 'a rough or unstable idle'],
      checks: ['cooling system pressure and thermostat test', 'compression and leak-down testing', 'mount, belt, pulley and driveline inspection', 'post-repair road test and re-check'],
      question: 'What should a mechanical repair estimate include?',
      answer: 'It should list the confirmed cause, the parts required, labour hours and anything found but not yet urgent, so the owner can approve work in a sensible order instead of all at once.',
    },
    ar: {
      scope: 'تشخيص أعطال المحرك والتبريد ونقل الحركة والملحقات، وتأكيد السبب بفحص الضغط أو التسريب أو الراسم، ثم تنفيذ الإصلاح بعرض سعر موثق قبل طلب القطع.',
      symptoms: ['أصوات أو اهتزاز أو ضعف في القوة', 'نقص في الماء أو الزيت دون تسريب واضح', 'ارتفاع الحرارة في الازدحام', 'عدم استقرار الوقوف'],
      checks: ['فحص ضغط نظام التبريد والثرموستات', 'فحص الضغط الانضغاطي وتسريب الأسطوانات', 'فحص الكراسي والسيور والبكرات ونقل الحركة', 'تجربة الطريق وإعادة الفحص بعد الإصلاح'],
      question: 'ماذا يجب أن يتضمن عرض سعر الإصلاح الميكانيكي؟',
      answer: 'يجب أن يوضح السبب المؤكد والقطع المطلوبة وساعات العمل والملاحظات غير العاجلة، ليتمكن المالك من اعتماد الأعمال بترتيب منطقي.',
    },
  },
  'electrical-repair': {
    en: {
      scope: 'tracing parasitic drain, voltage drop and communication faults with wiring diagrams and an oscilloscope, testing modules, grounds and connectors, then repairing the circuit rather than replacing modules on guesswork.',
      symptoms: ['a battery that drains overnight', 'warning lights appearing together', 'windows, seats or lights working intermittently', 'modules dropping off the diagnostic bus'],
      checks: ['parasitic draw measurement over a rest period', 'voltage drop and ground integrity tests', 'CAN and LIN bus signal inspection', 'connector, harness and corrosion inspection'],
      question: 'Why do several warning lights appear at once?',
      answer: 'Multiple simultaneous warnings usually mean a supply, ground or bus communication problem rather than several failed parts. Testing the network and power feeds first avoids replacing healthy modules.',
    },
    ar: {
      scope: 'تتبع السحب الكهربائي وانخفاض الجهد وأعطال الاتصال باستخدام المخططات والراسم، وفحص الوحدات ونقاط الأرضي والوصلات، ثم إصلاح الدائرة بدل تبديل الوحدات بالتخمين.',
      symptoms: ['فراغ البطارية أثناء الوقوف ليلاً', 'ظهور عدة تحذيرات معاً', 'عمل متقطع للنوافذ أو المقاعد أو الإضاءة', 'اختفاء وحدات من جهاز الفحص'],
      checks: ['قياس السحب الكهربائي بعد فترة سكون', 'فحص انخفاض الجهد وسلامة الأرضي', 'فحص إشارات شبكة CAN وLIN', 'فحص الوصلات والضفيرة والتأكسد'],
      question: 'لماذا تظهر عدة لمبات تحذير في وقت واحد؟',
      answer: 'ظهور عدة تحذيرات معاً يشير عادة إلى مشكلة في التغذية أو الأرضي أو شبكة الاتصال وليس إلى تلف عدة قطع، وفحص الشبكة أولاً يمنع تبديل وحدات سليمة.',
    },
  },
  'battery-replacement': {
    en: {
      scope: 'load testing the battery, measuring charging output and parasitic draw, fitting the correct AGM or EFB specification, then registering or coding the new battery to the energy management system.',
      symptoms: ['slow cranking, especially after a hot day', 'start-stop no longer working', 'a battery or electrical warning', 'needing a jump start after short standing'],
      checks: ['state of charge and load test result', 'alternator output and charging profile', 'parasitic draw measurement', 'battery registration and coding to the vehicle'],
      question: 'How long does a car battery last in Dubai?',
      answer: 'Sustained heat shortens battery life, so two to three years is common in the UAE compared with four or more in cooler climates. Annual testing from year two gives warning before a failure to start.',
    },
    ar: {
      scope: 'فحص البطارية تحت الحمل، وقياس أداء الشحن والسحب الكهربائي، وتركيب البطارية بالمواصفة الصحيحة AGM أو EFB، ثم برمجتها في نظام إدارة الطاقة.',
      symptoms: ['بطء في التدوير خاصة بعد يوم حار', 'توقف عمل نظام التشغيل والإطفاء', 'ظهور تحذير البطارية أو الكهرباء', 'الحاجة إلى شحن خارجي بعد وقوف قصير'],
      checks: ['حالة الشحن ونتيجة فحص الحمل', 'أداء الدينامو ومنحنى الشحن', 'قياس السحب الكهربائي', 'برمجة البطارية الجديدة في السيارة'],
      question: 'كم يدوم عمر بطارية السيارة في دبي؟',
      answer: 'الحرارة المستمرة تقصّر عمر البطارية، لذا يشيع عمر سنتين إلى ثلاث في الإمارات مقابل أربع سنوات أو أكثر في المناخ المعتدل. الفحص السنوي بعد السنة الثانية يعطي إنذاراً مبكراً.',
    },
  },
  'tire-repair': {
    en: {
      scope: 'inspecting tread depth, age code, sidewall condition and pressures, repairing punctures within the safe repair area, balancing wheels and resetting the tyre pressure monitoring system.',
      symptoms: ['a pressure warning that keeps returning', 'vibration at highway speed', 'uneven or feathered tread wear', 'cracking on the sidewall'],
      checks: ['tread depth, age and damage inspection', 'puncture assessment against safe repair limits', 'road force or dynamic balancing', 'TPMS reset and alignment check'],
      question: 'When is a puncture unsafe to repair?',
      answer: 'Damage in the sidewall or shoulder, a cut larger than the repair limit, or a tyre already run flat should be replaced rather than plugged. Heat in the UAE makes a marginal repair far riskier at highway speed.',
    },
    ar: {
      scope: 'فحص عمق المداس وتاريخ الإطار وحالة الجدار الجانبي والضغط، وإصلاح الثقوب ضمن المنطقة الآمنة، وترصيص العجلات وتصفير حساسات الضغط.',
      symptoms: ['تحذير ضغط الإطارات المتكرر', 'اهتزاز على السرعات العالية', 'تآكل غير متساوٍ في المداس', 'تشققات في الجدار الجانبي'],
      checks: ['فحص عمق المداس والعمر والأضرار', 'تقييم الثقب مقارنة بحدود الإصلاح الآمن', 'ترصيص ديناميكي دقيق', 'تصفير حساسات الضغط وفحص الزوايا'],
      question: 'متى يكون إصلاح الثقب غير آمن؟',
      answer: 'إذا كان الضرر في الجدار الجانبي أو الكتف أو أكبر من حد الإصلاح أو تم السير على الإطار فارغاً، فالتبديل هو الخيار الآمن، خاصة مع حرارة الإمارات والسرعات العالية.',
    },
  },
  'exhaust-repair': {
    en: {
      scope: 'inspecting manifolds, flexible joints, catalytic converters, particulate filters and mountings, pressure or smoke testing for leaks, then repairing or replacing sections and checking downstream sensor readings.',
      symptoms: ['a droning or rasping noise under load', 'a smell of exhaust gas in the cabin', 'a check engine light for catalyst efficiency', 'vibration through the floor at idle'],
      checks: ['leak test across manifold, joints and welds', 'catalyst and sensor performance data', 'mounting, hanger and heat shield inspection', 'post-repair noise and emissions check'],
      question: 'Can an exhaust section be repaired instead of replaced?',
      answer: 'Yes, in many cases a cracked flex joint, hanger or weld can be repaired properly. A full section is only needed when the pipe wall or catalyst substrate itself has failed.',
    },
    ar: {
      scope: 'فحص المشعبات والوصلات المرنة والحفازات وفلاتر العادم والحوامل، وفحص التسريب بالضغط أو الدخان، ثم إصلاح أو تبديل الأجزاء ومراجعة قراءات الحساسات.',
      symptoms: ['صوت مرتفع أو خشن عند التسارع', 'رائحة عادم داخل المقصورة', 'إضاءة لمبة المحرك بسبب كفاءة الحفاز', 'اهتزاز في أرضية السيارة أثناء الوقوف'],
      checks: ['فحص تسريب المشعب والوصلات واللحامات', 'أداء الحفاز وبيانات الحساسات', 'فحص الحوامل والعوازل الحرارية', 'فحص الصوت والانبعاثات بعد الإصلاح'],
      question: 'هل يمكن إصلاح جزء من العادم بدل تبديله؟',
      answer: 'نعم، في حالات كثيرة يمكن إصلاح الوصلة المرنة أو الحامل أو اللحام بشكل سليم، ولا يلزم تبديل القسم كاملاً إلا عند تلف جدار الأنبوب أو قلب الحفاز.',
    },
  },
  'steering-repair': {
    en: {
      scope: 'testing steering rack, pump, column and electric assist operation, inspecting track rods, joints and bushings, then repairing leaks or play and completing a four-wheel alignment.',
      symptoms: ['play or a dead spot in the steering', 'a heavy or inconsistent assist feel', 'the wheel not centred on a straight road', 'a whine when turning at low speed'],
      checks: ['rack, pump and hose leak inspection', 'track rod, joint and bushing play test', 'steering angle sensor and assist module data', 'four-wheel alignment and road test'],
      question: 'Does steering play always mean a new rack?',
      answer: 'Not usually. Play is often in the track rod ends, joints or bushings, which are far cheaper to replace. A rack is only condemned once it is confirmed as leaking or worn internally.',
    },
    ar: {
      scope: 'فحص عمل صندوق التوجيه والمضخة والعمود ونظام المساعدة الكهربائية، وفحص أذرع التوجيه والمفاصل والجلب، ثم إصلاح التسريب أو الخلخلة وضبط زوايا العجلات الأربع.',
      symptoms: ['خلخلة أو منطقة ميتة في المقود', 'ثقل أو تفاوت في مساعدة التوجيه', 'انحراف المقود عن الوسط على طريق مستقيم', 'صوت أزيز عند اللف ببطء'],
      checks: ['فحص تسريب الصندوق والمضخة والخراطيم', 'فحص خلخلة الأذرع والمفاصل والجلب', 'بيانات حساس زاوية التوجيه ووحدة المساعدة', 'ضبط زوايا العجلات وتجربة الطريق'],
      question: 'هل الخلخلة في المقود تعني تبديل صندوق التوجيه دائماً؟',
      answer: 'غالباً لا. تكون الخلخلة في أطراف الأذرع أو المفاصل أو الجلب وهي أقل تكلفة بكثير، ولا يُحكم على الصندوق إلا بعد تأكيد التسريب أو التآكل الداخلي.',
    },
  },
  'fuel-system-repair': {
    en: {
      scope: 'measuring low and high pressure fuel delivery, testing injectors and pumps, inspecting filters, lines and tank components, then repairing the fault and verifying fuel trims after the work.',
      symptoms: ['a long crank before the engine starts', 'hesitation or a flat spot under acceleration', 'a fuel pressure or mixture fault code', 'a strong fuel smell near the car'],
      checks: ['low and high pressure delivery measurement', 'injector return, spray and balance testing', 'filter, line and tank component inspection', 'fuel trim verification on a road test'],
      question: 'What causes hesitation under acceleration?',
      answer: 'Weak fuel delivery, a failing high pressure pump, restricted filters or injectors that no longer atomise correctly are the common causes. Live fuel trim and pressure data separate them quickly.',
    },
    ar: {
      scope: 'قياس ضغط الوقود المنخفض والعالي، وفحص البخاخات والمضخات، وفحص الفلاتر والخطوط ومكونات الخزان، ثم إصلاح العطل والتأكد من قيم الوقود بعد العمل.',
      symptoms: ['تأخر التشغيل عند إدارة المحرك', 'تردد أو ضعف عند التسارع', 'كود عطل في ضغط الوقود أو الخليط', 'رائحة وقود قوية قرب السيارة'],
      checks: ['قياس الضغط المنخفض والعالي', 'فحص رجوع البخاخات ورشها واتزانها', 'فحص الفلاتر والخطوط ومكونات الخزان', 'التأكد من قيم الوقود في تجربة الطريق'],
      question: 'ما سبب التردد عند التسارع؟',
      answer: 'الأسباب الشائعة هي ضعف تغذية الوقود أو مضخة الضغط العالي أو انسداد الفلاتر أو بخاخات لا ترش بشكل صحيح، وبيانات الضغط ونسب الوقود الحية تفرّق بينها بسرعة.',
    },
  },
  'body-repair': {
    en: {
      scope: 'assessing panel and structural damage, stripping affected areas to check for hidden damage, repairing or replacing panels, then colour matching, refinishing and reassembling to factory panel gaps.',
      symptoms: ['accident damage or misaligned panels', 'paint chips, scratches or sand blasting on the front end', 'doors or the tailgate no longer closing evenly', 'corrosion under trim or around fixings'],
      checks: ['strip-down and hidden damage inspection', 'panel alignment and gap measurement', 'colour matching and multi-stage refinishing', 'final polish, reassembly and quality check'],
      question: 'How is paint matched on a luxury car?',
      answer: 'The paint code is the starting point, but faded and multi-stage finishes need spray-out test cards and blending into adjacent panels so the repair is invisible in Dubai sunlight.',
    },
    ar: {
      scope: 'تقييم أضرار الهيكل والقطع، وتفكيك المناطق المتضررة للكشف عن الأضرار المخفية، وإصلاح أو تبديل القطع، ثم مطابقة اللون والدهان وإعادة التركيب بفراغات مطابقة للمصنع.',
      symptoms: ['أضرار حادث أو عدم استواء القطع', 'خدوش أو تطاير حصى في المقدمة', 'عدم إغلاق الأبواب أو الصندوق بشكل متساوٍ', 'تأكسد أسفل الزخارف أو حول المسامير'],
      checks: ['التفكيك وفحص الأضرار المخفية', 'قياس استواء القطع والفراغات', 'مطابقة اللون والدهان متعدد الطبقات', 'التلميع وإعادة التركيب وفحص الجودة'],
      question: 'كيف تتم مطابقة الدهان في السيارات الفاخرة؟',
      answer: 'يبدأ العمل من كود اللون، لكن الألوان الباهتة والدهانات متعددة الطبقات تحتاج إلى عينات رش ودمج مع القطع المجاورة حتى لا يظهر الإصلاح تحت شمس دبي.',
    },
  },
};

const serviceProfileFor = (slug) => {
  if (!slug) return null;
  const normalized = slug.replace(/-dubai$/, '').replace(/^mercedes-/, '').replace(/^car-/, '');
  const aliases = {
    'service': 'oil-change',
    'repair': 'mechanical-repair',
    'diagnostics': 'engine-diagnostics',
    'car-diagnostics': 'engine-diagnostics',
    'auto-electrical-repair': 'electrical-repair',
    'car-battery': 'battery-replacement',
    'battery': 'battery-replacement',
    'ac': 'ac-repair',
    'car-ac-repair': 'ac-repair',
  };
  const key = aliases[normalized] ?? normalized;
  return serviceProfiles[key]?.en ? serviceProfiles[key] : null;
};

const buildTopicSections = (route) => {
  const isArabic = route.path === '/ar' || route.path.startsWith('/ar/');
  const language = isArabic ? 'ar' : 'en';
  const basePath = isArabic ? (route.path.replace(/^\/ar(?=\/|$)/, '') || '/') : route.path;
  const segments = basePath.split('/').filter(Boolean);
  const [section, first, second] = segments;

  const serviceSlug = section === 'brands' ? second : (section === 'services' ? first : null);
  const profile = serviceProfileFor(serviceSlug)?.[language];
  if (!profile) return '';

  const brand = section === 'brands' ? brandNameFromSlug(first) : null;
  const topic = isArabic
    ? (brand ? `${arabicServiceNameFromSlug(serviceSlug)} لسيارات ${brand}` : arabicServiceNameFromSlug(serviceSlug))
    : (brand ? `${brand} ${serviceNameFromSlug(serviceSlug.replace(/-dubai$/, ''))}` : serviceNameFromSlug(serviceSlug.replace(/-dubai$/, '')));

  const headings = isArabic
    ? { scope: `ماذا يشمل ${topic} في ديجي-تك؟`, symptoms: 'علامات تستدعي الفحص', checks: 'خطوات العمل في الورشة', faq: 'سؤال شائع' }
    : { scope: `What ${topic} includes at Digi-Tec`, symptoms: 'Signs it is time to book', checks: 'How we work through it', faq: 'Common question' };

  const intro = isArabic
    ? `${topic} في مركز ديجي-تك بالقوز، دبي يشمل ${profile.scope}`
    : `${topic} at Digi-Tec Performance Center in Al Quoz, Dubai involves ${profile.scope}`;

  const context = isArabic
    ? `${brand ? `نتعامل مع سيارات ${brand} يومياً في دبي، ` : ''}وتؤثر حرارة الإمارات والغبار الناعم والازدحام اليومي في عمر القطع، لذلك نبني خطة العمل على حالة السيارة الفعلية وطريقة استخدامها وليس على جدول عام فقط. يحصل المالك على فحص مكتوب وعرض سعر واضح قبل اعتماد أي عمل، مع توضيح ما هو عاجل وما يمكن تأجيله.`
    : `${brand ? `We work on ${brand} vehicles daily in Dubai, and ` : ''}UAE heat, fine airborne sand and stop-start traffic all shorten component life, so the plan is built around the condition of your car and how it is actually used rather than a generic schedule alone. You get a written inspection and a clear estimate before anything is approved, with urgent items separated from what can safely wait.`;

  const list = (items) => `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`;

  return [
    `<h2>${escapeHtml(headings.scope)}</h2><p>${escapeHtml(intro)}</p><p>${escapeHtml(context)}</p>`,
    `<h2>${escapeHtml(headings.symptoms)}</h2>${list(profile.symptoms)}`,
    `<h2>${escapeHtml(headings.checks)}</h2>${list(profile.checks)}`,
    `<h2>${escapeHtml(profile.question)}</h2><p>${escapeHtml(profile.answer)}</p>`,
  ].join('');
};

// ---------------------------------------------------------------------------
// Pruning: obscure brand x niche service combinations add duplicate mass with
// no search demand. They stay reachable but are kept out of the index.
// ---------------------------------------------------------------------------
const prunedCoreServices = new Set(['oil-change', 'brake-repair', 'ac-repair', 'engine-diagnostics']);
const priorityBrandSet = new Set(primaryBrandSlugs);

const isLowValuePath = (pathname) => {
  const basePath = pathname.replace(/^\/ar(?=\/|$)/, '') || '/';
  const match = basePath.match(/^\/brands\/([a-z0-9-]+)-service-dubai\/([a-z0-9-]+)$/);
  if (!match) return false;
  const [, brandSlug, serviceSlug] = match;
  if (priorityBrandSet.has(brandSlug)) return false;
  return !prunedCoreServices.has(serviceSlug);
};

const replaceTag = (html, pattern, replacement) => html.replace(pattern, replacement);

const createRouteHtml = (template, route) => {
  const url = `${siteUrl}${route.path}`;
  const routeImage = route.image ? `${siteUrl}${route.image}` : null;
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
    ...(routeImage ? { primaryImageOfPage: { '@type': 'ImageObject', url: routeImage, contentUrl: routeImage } } : {}),
    ...(route.datePublished ? { datePublished: route.datePublished } : {}),
    ...(route.dateModified ? { dateModified: route.dateModified } : {}),
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
        ...(routeImage ? { image: { '@type': 'ImageObject', url: routeImage, contentUrl: routeImage } } : {}),
        ...(route.datePublished ? { datePublished: route.datePublished } : {}),
        ...(route.dateModified ? { dateModified: route.dateModified } : {}),
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
  if (routeImage) {
    html = replaceTag(html, /<meta property="og:image"[^>]*>/i, `<meta property="og:image" content="${routeImage}">`);
    html = replaceTag(html, /<meta name="twitter:image"[^>]*>/i, `<meta name="twitter:image" content="${routeImage}">`);
  }
  html = html.replace('</head>', `${alternateLinks}\n<script type="application/ld+json" data-prerendered-seo="true">${schema}</script>\n</head>`);
  if (isLowValuePath(route.path)) {
    html = html.replace('</head>', '<meta name="robots" content="noindex,follow">\n</head>');
  }
  const breadcrumbNav = `<nav aria-label="${isArabic ? 'مسار التنقل' : 'Breadcrumb'}"><ul><li>${anchor(isArabic ? '/ar' : '/', isArabic ? 'الرئيسية' : 'Home')}</li>${isArticle ? `<li>${anchor(isArabic ? '/ar/blog' : '/blog', isArabic ? 'المقالات' : 'Owner guides')}</li>` : ''}<li>${escapeHtml(route.heading)}</li></ul></nav>`;
  const topicSections = buildTopicSections(route);
  const navBlock = linkList(isArabic ? 'أقسام الموقع' : 'Site sections', siteNavLinks(isArabic));
  const relatedBlock = linkList(isArabic ? 'صفحات ذات صلة' : 'Related pages', relatedLinksFor(route));
  const brandBlock = linkList(isArabic ? 'العلامات التي نخدمها' : 'Brands we service', brandHubLinks(isArabic));
  html = html.replace(
    '<div id="root"></div>',
    `<div id="root">${breadcrumbNav}<main data-prerendered-seo="true"><h1>${escapeHtml(route.heading)}</h1><p>${escapeHtml(route.summary)}</p><h2>${escapeHtml(route.sectionHeading)}</h2><ul>${serviceList}</ul>${topicSections}<p>${isArabic ? 'احجز فحصاً لدى مركز ديجي-تك في القوز، دبي. اتصل على +971 4 340 2223 أو تواصل معنا عبر واتساب.' : 'Book an inspection with Digi-Tec Performance Centre in Al Quoz, Dubai. Call +971 4 340 2223 or contact us on WhatsApp.'}</p></main>${relatedBlock}${brandBlock}${navBlock}</div>`,
  );
  return html;
};

const distDirectory = path.resolve('dist');
const template = await readFile(path.join(distDirectory, 'index.html'), 'utf8');
const sitemap = await readFile(path.resolve('public/sitemap.xml'), 'utf8');
const sitemapPaths = [...sitemap.matchAll(/<loc>(https:\/\/digitecme\.com[^<]+)<\/loc>/g)]
  .map(([, url]) => new URL(url).pathname)
  .filter((pathname) => pathname !== '/');
const routeByPath = new Map(priorityRoutes.map((route) => [route.path, route]));

for (const pathname of sitemapPaths) {
  if (!routeByPath.has(pathname)) {
    const route = createGeneratedRoute(pathname) ?? createStaticRoute(pathname);
    if (route) routeByPath.set(pathname, route);
  }
}

// Pruned brand x service combinations are no longer in the sitemap, but they
// still need crawlable HTML with their own title, description and canonical.
const prunedPaths = [...sitemap.matchAll(/<!-- pruned: ([^ ]+) -->/g)].map(([, path]) => path);
for (const pathname of prunedPaths) {
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
