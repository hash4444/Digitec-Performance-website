/** Content for the five existing service hubs; no new keyword or model routes. */
export const SERVICE_SPRINT_BRANDS: Record<string, { arabicName: string; maintenance: string; arabicMaintenance: string; arabicModels: string }> = {
  'rolls-royce-service-dubai': {
    arabicName: 'رولز رويس',
    maintenance: '',
    arabicMaintenance: 'تُراجع تعليمات سنة الطراز والمسافة وسجل الصيانة لتحديد الزيت والفلاتر والسوائل والفحوص المستحقة. تُؤكد المواصفات ونطاق العمل قبل عرض السعر.',
    arabicModels: 'تُراجع طلبات Ghost وCullinan وPhantom وWraith وDawn حسب سنة الصنع والتجهيزات. سيارة Spectre كهربائية وتختلف عن صيانة محركات الاحتراق؛ لا يُفترض توفر إصلاح البطارية عالية الجهد أو نظام الشحن.',
  },
  'lamborghini-service-dubai': {
    arabicName: 'لامبورغيني',
    maintenance: '',
    arabicMaintenance: 'يُحدد الزيت والفلاتر والفحوص المستحقة من بيانات الطراز وسنة الصنع وسجل الصيانة والاستخدام. لا توجد حزمة أو فترة صيانة واحدة لجميع سيارات لامبورغيني.',
    arabicModels: 'تختلف أنظمة Urus وHuracán وAventador وGallardo وRevuelto. يُؤكد نوع المحرك والقير والتعليق والفرامل قبل قبول العمل؛ لا يشمل طلب فحص الكهرباء منخفضة الجهد وعداً بإصلاح بطارية النظام الهجين.',
  },
  'volkswagen-service-dubai': {
    arabicName: 'فولكس فاجن',
    maintenance: 'Oil, filters, fluid checks and inspection items follow the exact model-year schedule, mileage, history and fitted engine. The oil approval and any gearbox service procedure are confirmed before quotation; there is no single interval for every Volkswagen.',
    arabicMaintenance: 'تُحدد أعمال الزيت والفلاتر والسوائل والفحص حسب تعليمات سنة الطراز والمسافة والسجل والمحرك المركب. تُؤكد مواصفات الزيت وإجراء صيانة القير قبل التسعير دون فرض فترة واحدة على جميع السيارات.',
    arabicModels: 'أرسل فئة Golf أو GTI أو Golf R أو Tiguan أو Touareg أو Passat أو T-Roc وسنة الصنع. تُؤكد رموز المحرك والقير قبل العمل. تختلف سيارات ID الكهربائية عن سيارات الاحتراق ولا يُفترض توفر إصلاح أنظمة الجهد العالي.',
  },
  'mercedes-benz-service-dubai': {
    arabicName: 'مرسيدس بنز',
    maintenance: '',
    arabicMaintenance: 'يُراجع مؤشر ASSYST وتعليمات الطراز وسجل الصيانة لتحديد بنود Service A أو Service B والعناصر الإضافية المستحقة. تُؤكد مواصفات الزيت والفلاتر والسوائل قبل الموافقة.',
    arabicModels: 'تختلف متطلبات C-Class وE-Class وS-Class وGLC وGLE وG-Class وAMG حسب الجيل والتجهيزات. يُراجع رقم الهيكل والمحرك والقير ونوع التعليق قبل تحديد الإجراء والقطع المناسبة.',
  },
  'bmw-service-dubai': {
    arabicName: 'بي إم دبليو',
    maintenance: '',
    arabicMaintenance: 'تبدأ الخطة من مؤشر Condition Based Service وتعليمات الطراز والمسافة وسجل الصيانة. تُدرج أعمال الزيت والفلاتر وشمعات الإشعال وسائل الفرامل عند استحقاقها وحسب المحرك ونطاق الخدمة المتفق عليه.',
    arabicModels: 'أرسل طراز BMW وسنة الصنع والمحرك والتجهيزات، سواء كان من فئات 3 أو 5 أو X5 أو X6 أو M. تُؤكد إجراءات الصيانة ووظائف التشخيص والقطع للسيارة نفسها؛ لا تُعمم متطلبات طراز واحد على بقية الفئات.',
  },
};

export const getServiceSprintBrand = (slug?: string) => slug ? SERVICE_SPRINT_BRANDS[slug] : undefined;

// These existing Volkswagen children are intentionally noindex. Direct hub
// links to the established shared service owners instead of those variants.
export const VOLKSWAGEN_SERVICE_OWNERS: Record<string, string> = {
  'transmission-repair': '/services/transmission-repair-dubai',
  'suspension-repair': '/services/suspension-repair-dubai',
  'mechanical-repair': '/services/mechanical-repair-dubai',
  'steering-repair': '/services/steering-repair-dubai',
  'battery-replacement': '/services/battery-replacement-dubai',
  'electrical-repair': '/services/auto-electrical-repair-dubai',
  'exhaust-repair': '/services/exhaust-repair-dubai',
  'fuel-system-repair': '/services/fuel-system-repair-dubai',
  'body-repair': '/services/car-body-repair-dubai',
  'tire-repair': '/services/tire-repair-dubai',
};

export function getSprintServices(slug: string, isArabic: boolean) {
  const content = getServiceSprintBrand(slug);
  if (!content) return [];
  if (isArabic) return [
    { title: 'الصيانة الدورية وتغيير الزيت', description: content.arabicMaintenance, path: slug === 'mercedes-benz-service-dubai' ? '/services/mercedes-oil-change-dubai' : `/brands/${slug}/oil-change`, label: 'تفاصيل تغيير الزيت والصيانة' },
    { title: 'التشخيص ورسائل التحذير', description: 'تُراجع الأعراض وبيانات الأعطال مع الفحص الفعلي. رمز العطل وحده لا يثبت تلف القطعة. تُؤكد وظائف التشخيص وإعادة الضبط والبرمجة المتاحة حسب السيارة والوحدة والصلاحيات.', path: slug === 'mercedes-benz-service-dubai' ? '/services/mercedes-diagnostics-dubai' : `/brands/${slug}/engine-diagnostics`, label: 'فحص الأعطال والتشخيص' },
    { title: 'فحص الأعطال الميكانيكية', description: 'يبدأ طلب إصلاح تسرب الزيت أو نقص سائل التبريد أو الضجيج بتحديد النظام وفحصه. يُوضح سبب الإصلاح المقترح والقطع والسوائل وأجرة العمل قبل الموافقة، وتُؤكد الإجراءات المتاحة للسيارة.', path: '/services/mechanical-repair-dubai', label: 'الفحص والإصلاح الميكانيكي' },
    { title: 'الكهرباء والبطارية', description: 'تحتاج صعوبة التشغيل أو ضعف البطارية أو الأعطال الكهربائية إلى فحص التغذية والشحن والأسلاك والنظام المتأثر قبل اختيار القطع. يُؤكد نطاق العمل المتاح، ولا يُفترض توفر إصلاح أنظمة الجهد العالي.', path: '/services/auto-electrical-repair-dubai', label: 'فحص كهرباء السيارة' },
  ];
  return [
    { title: 'Volkswagen routine maintenance', description: content.maintenance, path: `/brands/${slug}/oil-change`, label: 'Volkswagen oil change and maintenance checks' },
    { title: 'Diagnostics and warning lights', description: 'EPC, check-engine warnings, rough running and starting concerns need fault data and physical checks. Available ODIS functions depend on the vehicle and access; a code alone does not identify a failed part.', path: `/brands/${slug}/engine-diagnostics`, label: 'Volkswagen diagnostic assessment' },
    { title: 'Mechanical repair assessment', description: 'Oil leaks, coolant loss, unusual noise and drivability changes need inspection before a repair scope is agreed. The engine, fitted gearbox and test findings guide parts and fluid choices.', path: '/services/mechanical-repair-dubai', label: 'Mechanical inspection and repair' },
    { title: 'Electrical and battery concerns', description: 'Battery drain, no-start and electrical warnings can involve the battery, charging, wiring or another system. Testing comes before replacement; coding and programming are confirmed for the exact module and available access.', path: '/services/auto-electrical-repair-dubai', label: 'Electrical fault assessment' },
  ];
}
