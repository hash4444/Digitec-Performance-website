import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { LocalizedLink as Link } from '@/components/LocalizedLink';
import { ArrowRight, Calendar, CheckCircle2, MapPin, MessageCircle, Phone, Wrench } from 'lucide-react';
import Header from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FinalCTA } from '@/components/FinalCTA';
import { CtaAssurance } from '@/components/TrustBar';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { getBrandWorkshopArticle, brandWorkshopArticles, type BrandWorkshopArticle } from '@/data/brandWorkshopArticles';
import { useSeo } from '@/hooks/use-seo';
import { buildArticle, buildBreadcrumb, buildFAQ, buildService, buildWebPage, pageGraph, SITE_URL } from '@/lib/schema';
import { useLocale } from '@/i18n/use-locale';
import { localizeBrandWorkshopArticleToArabic, localizePostSummaryToArabic } from '@/i18n/ar-blog';

const generalServiceLinks = [
  { label: 'Diagnostics', arLabel: 'فحص وتشخيص السيارة', href: '/services/car-diagnostics-dubai' },
  { label: 'Oil Change', arLabel: 'تغيير الزيت', href: '/services/oil-change-dubai' },
  { label: 'Mechanical Repair', arLabel: 'الإصلاح الميكانيكي', href: '/services/mechanical-repair-dubai' },
  { label: 'Transmission Repair', arLabel: 'إصلاح ناقل الحركة', href: '/services/transmission-repair-dubai' },
  { label: 'Suspension Repair', arLabel: 'إصلاح نظام التعليق', href: '/services/suspension-repair-dubai' },
  { label: 'Brake Repair', arLabel: 'إصلاح الفرامل', href: '/services/brake-repair-dubai' },
  { label: 'Electrical Repair', arLabel: 'إصلاح كهرباء السيارة', href: '/services/auto-electrical-repair-dubai' },
  { label: 'Performance Tuning', arLabel: 'تطوير الأداء', href: '/tuning' },
];

const mercedesServiceLinks = [
  { label: 'Mercedes Hub', arLabel: 'مركز خدمات مرسيدس', href: '/brands/mercedes-benz-service-dubai' },
  { label: 'Mercedes Diagnostics', arLabel: 'فحص وتشخيص مرسيدس', href: '/services/mercedes-diagnostics-dubai' },
  { label: 'Mercedes Oil Change', arLabel: 'تغيير زيت مرسيدس', href: '/services/mercedes-oil-change-dubai' },
  { label: 'Mercedes Mechanical Repair', arLabel: 'إصلاح مرسيدس الميكانيكي', href: '/services/mercedes-mechanical-repair-dubai' },
  { label: 'Mercedes Transmission Repair', arLabel: 'إصلاح ناقل حركة مرسيدس', href: '/services/mercedes-transmission-repair-dubai' },
  { label: 'Mercedes Suspension Repair', arLabel: 'إصلاح تعليق مرسيدس', href: '/services/mercedes-suspension-repair-dubai' },
  { label: 'Mercedes Brake Repair', arLabel: 'إصلاح فرامل مرسيدس', href: '/services/mercedes-brake-repair-dubai' },
  { label: 'Mercedes Electrical Repair', arLabel: 'إصلاح كهرباء مرسيدس', href: '/services/mercedes-electrical-repair-dubai' },
];

const ferrariServiceLinks = [
  { label: 'Ferrari Hub', arLabel: 'مركز خدمات فيراري', href: '/brands/ferrari-service-dubai' },
  { label: 'Ferrari Diagnostics', arLabel: 'فحص وتشخيص فيراري', href: '/brands/ferrari-service-dubai/engine-diagnostics' },
  { label: 'Ferrari Oil Service', arLabel: 'خدمة زيت فيراري', href: '/brands/ferrari-service-dubai/oil-change' },
  { label: 'Ferrari Transmission Repair', arLabel: 'إصلاح ناقل حركة فيراري', href: '/brands/ferrari-service-dubai/transmission-repair' },
  { label: 'Ferrari Suspension Repair', arLabel: 'إصلاح تعليق فيراري', href: '/brands/ferrari-service-dubai/suspension-repair' },
  { label: 'Ferrari Brake Repair', arLabel: 'إصلاح فرامل فيراري', href: '/brands/ferrari-service-dubai/brake-repair' },
];

const mclarenServiceLinks = [
  { label: 'McLaren Service Hub', arLabel: 'مركز خدمات ماكلارين', href: '/brands/mclaren-service-dubai' },
  { label: 'McLaren Engine Diagnostics', arLabel: 'تشخيص محرك ماكلارين', href: '/brands/mclaren-service-dubai/engine-diagnostics' },
  { label: 'McLaren Oil Service', arLabel: 'خدمة زيت ماكلارين', href: '/brands/mclaren-service-dubai/oil-change' },
  { label: 'McLaren Mechanical Repair', arLabel: 'إصلاح ماكلارين الميكانيكي', href: '/brands/mclaren-service-dubai/mechanical-repair' },
  { label: 'McLaren Transmission Assessment', arLabel: 'فحص ناقل حركة ماكلارين', href: '/brands/mclaren-service-dubai/transmission-repair' },
  { label: 'McLaren Suspension Assessment', arLabel: 'فحص تعليق ماكلارين', href: '/brands/mclaren-service-dubai/suspension-repair' },
];

const lamborghiniServiceLinks = [
  { label: 'Lamborghini Service Hub', arLabel: 'مركز خدمات لامبورغيني', href: '/brands/lamborghini-service-dubai' },
  { label: 'Engine Diagnostics', arLabel: 'تشخيص المحرك', href: '/brands/lamborghini-service-dubai/engine-diagnostics' },
  { label: 'Oil and Maintenance', arLabel: 'الزيت والصيانة', href: '/brands/lamborghini-service-dubai/oil-change' },
  { label: 'Transmission Assessment', arLabel: 'فحص ناقل الحركة', href: '/brands/lamborghini-service-dubai/transmission-repair' },
  { label: 'Suspension Assessment', arLabel: 'فحص التعليق', href: '/brands/lamborghini-service-dubai/suspension-repair' },
  { label: 'Battery Assessment', arLabel: 'فحص البطارية', href: '/brands/lamborghini-service-dubai/battery-replacement' },
];

const rollsRoyceServiceLinks = [
  { label: 'Rolls-Royce Service Hub', arLabel: 'مركز خدمات رولز رويس', href: '/brands/rolls-royce-service-dubai' },
  { label: 'Engine Diagnostics', arLabel: 'تشخيص المحرك', href: '/brands/rolls-royce-service-dubai/engine-diagnostics' },
  { label: 'Oil and Maintenance', arLabel: 'الزيت والصيانة', href: '/brands/rolls-royce-service-dubai/oil-change' },
  { label: 'Transmission Assessment', arLabel: 'فحص ناقل الحركة', href: '/brands/rolls-royce-service-dubai/transmission-repair' },
  { label: 'Suspension Assessment', arLabel: 'فحص التعليق', href: '/brands/rolls-royce-service-dubai/suspension-repair' },
  { label: 'AC Assessment', arLabel: 'فحص التكييف', href: '/brands/rolls-royce-service-dubai/ac-repair' },
];

const BrandWorkshopArticleContent = ({ article, isArabic }: { article: BrandWorkshopArticle; isArabic: boolean }) => {
  const url = `${SITE_URL}${isArabic ? '/ar' : ''}/blog/${article.slug}`;
  const metaTitle = isArabic
    ? article.brand === 'Ferrari'
      ? 'صيانة فيراري في دبي | جدول الخدمة والتكلفة'
      : `ورشة ${article.brand} في دبي | ديجي-تك`
    : article.metaTitle ?? (article.existingBestPage
      ? `${article.brand} Maintenance Dubai | DIGI-TEC`
      : `${article.brand} Workshop Selection Guide Dubai | DIGI-TEC`);
  const metaDescription = isArabic
    ? article.brand === 'Ferrari'
      ? 'دليل صيانة فيراري في دبي: مواعيد الخدمة وعوامل التكلفة وعلامات التحذير والفحوص المهمة في حرارة الإمارات وفترات التخزين.'
      : `ورشة متخصصة في ${article.brand} بدبي للفحص والصيانة والإصلاح. احجز لدى ديجي-تك في القوز للحصول على تشخيص واضح وخدمة احترافية.`
    : article.metaDescription ?? `${article.brand} workshop in Dubai for diagnostics, maintenance and repair. Visit DIGI-TEC in Al Quoz for clear inspections, practical guidance and booking support.`;
  const datePublished = article.datePublished ?? '2026-07-16';
  const dateModified = article.dateModified;
  const displayDate = dateModified ?? datePublished;
  const ogImage = article.coverImage ? `${SITE_URL}${article.coverImage}` : undefined;
  const keywords = isArabic
    ? `ورشة ${article.brand} دبي، تصليح ${article.brand} دبي، صيانة ${article.brand} دبي، متخصص ${article.brand} دبي`
    : article.brand === 'Ferrari'
      ? 'Ferrari maintenance Dubai, Ferrari service Dubai, Ferrari repair Dubai, Ferrari servicing, Ferrari service center Dubai, Ferrari specialist Dubai, Ferrari engine repair Dubai, Ferrari brake repair Dubai'
      : `${article.primaryKeyword}, ${article.brand} repair Dubai, ${article.brand} garage Dubai, ${article.brand} specialist Dubai, ${article.brand} maintenance Dubai`;
  const englishFaqs = [
    ...(article.brand === 'Ferrari' ? [
      { question: 'How often should a Ferrari be serviced in Dubai?', answer: 'Ferrari\'s official 7-Year Genuine Maintenance programme describes service options of every 20,000 km or once a year. Your model handbook, age, service history, storage pattern and driving conditions should still guide the final maintenance plan.' },
      { question: 'How much does Ferrari maintenance cost in Dubai?', answer: 'There is no reliable single price for every Ferrari. Cost depends on the model and generation, scheduled service scope, diagnostic time, fluids, parts, tyre and brake condition, previous maintenance and whether storage or heat has caused additional work. Ask for an itemised inspection and estimate before approving repairs.' },
    ] : []),
    { question: `How do I choose a ${article.brand} workshop in Dubai?`, answer: `Choose a workshop that starts with a documented inspection, explains the fault in plain language, gives a written estimate before work, and can show how the proposed repair relates to your ${article.brand}'s service history and current condition.` },
    { question: `Does Dubai heat change ${article.brand} maintenance?`, answer: `It can. High ambient temperature, stop-start traffic, dust and heavy air-conditioning demand can increase the importance of cooling, tyres, brakes, batteries and fluid-condition checks. The right interval depends on the model and how it is used.` },
    { question: `What should a ${article.brand} diagnostic include?`, answer: `A useful diagnostic is more than reading a code. It should combine a scan, live data where relevant, visual checks, a road test when appropriate, and a clear explanation of confirmed faults versus items that need monitoring.` },
    { question: `Should I use OEM or aftermarket ${article.brand} parts?`, answer: `The right choice depends on the component, vehicle age, budget and intended use. Safety-critical, electronic and complex driveline parts often need careful sourcing. Ask for the part brand, specification and applicable warranty terms in writing.` },
    { question: `Can DIGI-TEC inspect a ${article.brand} before I buy it?`, answer: `Yes. A pre-purchase inspection can review visible condition, fault memory, service evidence, tyres, brakes, suspension, cooling and drivability so you can make a better-informed decision before committing.` },
    { question: `How long does a ${article.brand} service take?`, answer: `Timing depends on the exact service, inspection findings, parts availability and workshop schedule. Ask for an estimated completion time after the vehicle and requested work have been reviewed.` },
    { question: `Can I book a ${article.brand} inspection by WhatsApp?`, answer: `Yes. Send the model, year, mileage, concern and any warning-light information to DIGI-TEC on WhatsApp. The team can advise the best next step and arrange an inspection in Al Quoz.` },
    { question: `Is performance tuning suitable for every ${article.brand}?`, answer: `No. A performance plan should be based on mechanical health, service history, cooling, brakes, tyres, driveline capacity and intended use. A diagnostic baseline comes before any upgrade recommendation.` },
    { question: `Where is the ${article.brand} workshop located?`, answer: 'DIGI-TEC Performance Center is in Al Quoz Industrial Area 3, Dubai.' },
    { question: `What should I bring to my ${article.brand} appointment?`, answer: `Bring the key, service history if available, details of recent work, photos or videos of intermittent concerns, and the circumstances in which the issue occurs. This helps the inspection begin with useful context.` },
  ];
  const arabicFaqs = [
    ...(article.brand === 'Ferrari' ? [
      { question: 'كم مرة يجب صيانة فيراري في دبي؟', answer: 'يعتمد برنامج الصيانة الأصلية من فيراري على الصيانة كل 20,000 كيلومتر أو مرة سنوياً. ويبقى دليل الطراز وعمر السيارة وسجلها وطريقة تخزينها واستخدامها عوامل أساسية لتحديد الخطة المناسبة.' },
      { question: 'كم تبلغ تكلفة صيانة فيراري في دبي؟', answer: 'لا يوجد سعر واحد يناسب جميع سيارات فيراري. تعتمد التكلفة على الطراز والجيل ونطاق الصيانة ووقت التشخيص والسوائل والقطع وحالة الإطارات والفرامل وسجل الأعمال السابقة. اطلب فحصاً وعرض سعر مفصلاً قبل اعتماد الإصلاح.' },
    ] : []),
    { question: `كيف أختار ورشة ${article.brand} متخصصة في دبي؟`, answer: `اختر ورشة تبدأ بفحص موثق، وتشرح سبب العطل بوضوح، وتقدم عرضاً مكتوباً قبل العمل، وتربط التوصية بسجل صيانة ${article.brand} وحالتها الحالية.` },
    { question: `هل تؤثر حرارة دبي في صيانة ${article.brand}؟`, answer: 'نعم. الحرارة والازدحام والغبار والاستخدام المتواصل للمكيف تزيد أهمية فحص التبريد والإطارات والفرامل والبطارية والسوائل وفق حالة السيارة وطريقة استخدامها.' },
    { question: `ماذا يجب أن يشمل فحص ${article.brand}؟`, answer: 'يشمل الفحص المفيد قراءة الأنظمة الإلكترونية والبيانات الحية عند الحاجة، والفحص البصري، وتجربة الطريق عندما تكون آمنة، مع توضيح الأعطال المؤكدة وما يحتاج إلى متابعة.' },
    { question: `هل أختار قطعاً أصلية أم بديلة لسيارة ${article.brand}؟`, answer: 'يعتمد الاختيار على نوع القطعة وعمر السيارة والاستخدام والميزانية. نوضح مصدر القطعة ومواصفاتها والضمان قبل اعتمادها، مع عناية خاصة بأنظمة السلامة والإلكترونيات.' },
    { question: `هل تقدم ديجي-تك فحص ${article.brand} قبل الشراء؟`, answer: 'نعم. يمكن مراجعة الحالة الظاهرة وذاكرة الأعطال وسجل الصيانة والإطارات والفرامل والتعليق والتبريد وقابلية القيادة قبل اتخاذ قرار الشراء.' },
    { question: `كم تستغرق صيانة ${article.brand}؟`, answer: 'يمكن إنجاز بعض أعمال الصيانة الدورية في اليوم نفسه حسب توفر الموعد والقطع. أما التشخيص والإصلاحات الكبيرة فتحدد مدتها بعد الفحص الأولي.' },
    { question: `هل يمكن حجز فحص ${article.brand} عبر واتساب؟`, answer: 'نعم. أرسل الطراز والسنة والمسافة ووصف المشكلة ورسالة التحذير إن وجدت، وسيساعدك الفريق في ترتيب الموعد المناسب في القوز.' },
    { question: `هل يناسب تطوير الأداء جميع سيارات ${article.brand}؟`, answer: 'لا. يجب أولاً التأكد من صحة المحرك والتبريد والفرامل والإطارات وناقل الحركة، ثم اختيار خطة تناسب الاستخدام وقدرة المكونات.' },
    { question: `أين تقع ورشة ${article.brand}؟`, answer: 'يقع مركز ديجي-تك بيرفورمانس في منطقة القوز الصناعية 3 في دبي، ويخدم مالكي السيارات من مختلف مناطق دبي والإمارات بالمواعيد.' },
    { question: `ماذا أحضر إلى موعد ${article.brand}؟`, answer: 'أحضر المفتاح وسجل الصيانة إن توفر وتفاصيل الأعمال الأخيرة وأي صور أو فيديو للأعراض المتقطعة والظروف التي تظهر فيها المشكلة.' },
  ];
  const mclarenFaqs = [
    { question: 'How should I compare McLaren workshops in Dubai?', answer: 'Ask how the workshop will identify the exact vehicle and fitted systems, what the initial assessment includes, which diagnostic functions are available, how parts and procedures are confirmed, and whether you will receive an itemised estimate before work.' },
    { question: 'Is DIGI-TEC a McLaren-authorised repairer?', answer: 'This page presents DIGI-TEC as an independent workshop in Al Quoz, Dubai. Vehicle acceptance, diagnostic access, parts and repair scope are confirmed for the exact model before booking.' },
    { question: 'What should I send before requesting an estimate?', answer: 'Send the model, year, mileage, warning text, symptoms, when they occur and your preferred appointment time. An accurate repair estimate may require an in-workshop inspection.' },
    { question: 'Does Dubai heat affect McLaren maintenance?', answer: 'Heat, traffic, dust, storage and heavy AC use can make cooling, battery, tyre, brake and fluid-condition checks especially important. The final schedule still comes from model-specific service information and the vehicle history.' },
    { question: 'Can every warning be diagnosed from a fault code?', answer: 'No. A code is evidence, not a parts diagnosis. The assessment may require compatible data, physical tests and a road test when appropriate; coverage is confirmed for the vehicle.' },
    { question: 'Do you quote McLaren repairs online?', answer: 'The team can discuss the likely first step online, but final cost depends on the exact vehicle, diagnostic time, findings, parts and agreed scope. Request an itemised estimate before approving work.' },
  ];
  const mclarenFaqsArabic = [
    { question: 'كيف أقارن بين ورش مكلارين في دبي؟', answer: 'اسأل كيف ستحدد الورشة السيارة والأنظمة المركبة، وما يشمله الفحص الأول، وما وظائف التشخيص المتاحة، وكيف يتم تأكيد القطع والإجراءات، وهل ستحصل على عرض مفصل قبل بدء العمل.' },
    { question: 'هل ديجي-تك مركز إصلاح مكلارين معتمداً؟', answer: 'تقدم هذه الصفحة ديجي-تك كورشة مستقلة في القوز بدبي. يتم تأكيد قبول السيارة والوصول التشخيصي والقطع ونطاق الإصلاح للطراز المحدد قبل الحجز.' },
    { question: 'ماذا أرسل قبل طلب عرض السعر؟', answer: 'أرسل الطراز والسنة والمسافة ونص التحذير والأعراض ووقت ظهورها والموعد المفضل. قد يتطلب عرض الإصلاح الدقيق فحص السيارة داخل الورشة.' },
    { question: 'هل تؤثر حرارة دبي في صيانة مكلارين؟', answer: 'قد تزيد الحرارة والازدحام والغبار والتخزين والاستخدام المتواصل للمكيف أهمية فحص التبريد والبطارية والإطارات والفرامل والسوائل. يبقى الجدول النهائي معتمداً على معلومات الطراز وسجل السيارة.' },
    { question: 'هل يمكن تشخيص كل تحذير من رمز العطل؟', answer: 'لا. الرمز دليل أولي وليس تشخيصاً لقطعة. قد يحتاج الفحص إلى بيانات متوافقة واختبارات فعلية وتجربة طريق عند ملاءمتها، ويتم تأكيد التغطية للسيارة.' },
    { question: 'هل يمكن تسعير إصلاح مكلارين عبر الإنترنت؟', answer: 'يمكن للفريق مناقشة الخطوة الأولى، لكن التكلفة النهائية تعتمد على السيارة ووقت التشخيص والنتائج والقطع والنطاق المتفق عليه. اطلب عرضاً مفصلاً قبل اعتماد العمل.' },
  ];
  const rollsRoyceFaqs = [
    { question: 'How should I compare Rolls-Royce workshops in Dubai?', answer: 'Ask how the workshop identifies the exact model and fitted systems, what the first assessment includes, which diagnostic functions are available, how parts and fluids are confirmed, and whether you receive an itemised estimate before work.' },
    { question: 'Is DIGI-TEC a Rolls-Royce-authorised repairer?', answer: 'No authorised-repairer claim is made. DIGI-TEC is presented as an independent workshop in Al Quoz, Dubai. Vehicle acceptance, diagnostic access, parts and repair scope are confirmed for the requested work.' },
    { question: 'What should I send before requesting an estimate?', answer: 'Send the model, year, mileage, service history, warning or symptoms and preferred appointment time. A responsible repair estimate may require an in-workshop assessment.' },
    { question: 'Does every Rolls-Royce use the same suspension and transmission?', answer: 'No. Systems vary by model and generation. Rolls-Royce describes Planar, Flagbearer and satellite-aided transmission for the relevant newer Ghost generation, so those features are not assumed for every vehicle.' },
    { question: 'Can you service a Rolls-Royce Spectre?', answer: 'Spectre is fully electric and is kept separate from combustion servicing. General and low-voltage enquiries may be discussed, but high-voltage battery, charging and isolation work is not advertised without confirmed training, equipment and scope.' },
    { question: 'What determines Rolls-Royce service cost?', answer: 'The model, year, mileage, history, due maintenance, diagnostic time, findings, parts, fluids, labour and access requirements determine the estimate.' },
  ];
  const rollsRoyceFaqsArabic = [
    { question: 'كيف أقارن بين ورش رولز رويس في دبي؟', answer: 'اسأل كيف تحدد الورشة الطراز والأنظمة المركبة، وما يشمله الفحص الأول، وما وظائف التشخيص المتاحة، وكيف تؤكد القطع والسوائل، وهل تقدم عرضاً مفصلاً قبل العمل.' },
    { question: 'هل ديجي-تك مركز رولز رويس معتمداً؟', answer: 'لا تقدم الصفحة هذا الادعاء. ديجي-تك ورشة مستقلة في القوز بدبي، ويتم تأكيد قبول السيارة والوصول التشخيصي والقطع ونطاق الإصلاح قبل الحجز.' },
    { question: 'ماذا أرسل قبل طلب عرض السعر؟', answer: 'أرسل الطراز والسنة والمسافة وسجل الصيانة والتحذير أو الأعراض والموعد المفضل. قد يتطلب عرض الإصلاح الدقيق فحص السيارة داخل الورشة.' },
    { question: 'هل تستخدم جميع سيارات رولز رويس نظام التعليق وناقل الحركة نفسيهما؟', answer: 'لا. تختلف الأنظمة حسب الطراز والجيل، لذلك يجب تحديد السيارة والتجهيزات قبل اعتماد إجراءات أو قطع.' },
    { question: 'هل تشمل الصفحة صيانة Spectre الكهربائية؟', answer: 'Spectre سيارة كهربائية وتبقى منفصلة عن صيانة محركات الاحتراق. لا يتم الإعلان عن أعمال البطارية عالية الجهد أو الشحن أو العزل من دون تأكيد التدريب والمعدات والنطاق.' },
    { question: 'ما الذي يحدد تكلفة خدمة رولز رويس؟', answer: 'تعتمد التكلفة على الطراز والسنة والمسافة والسجل والصيانة المطلوبة ووقت التشخيص والنتائج والقطع والسوائل والعمالة.' },
  ];
  const faqs = isArabic
    ? article.brand === 'McLaren' ? mclarenFaqsArabic : article.brand === 'Rolls-Royce' ? rollsRoyceFaqsArabic : arabicFaqs
    : article.brand === 'McLaren' ? mclarenFaqs : article.brand === 'Rolls-Royce' ? rollsRoyceFaqs : englishFaqs;
  const relatedServiceLinks = article.brand === 'Mercedes-Benz'
    ? mercedesServiceLinks
    : article.brand === 'Ferrari' ? ferrariServiceLinks
      : article.brand === 'McLaren' ? mclarenServiceLinks
        : article.brand === 'Lamborghini' ? lamborghiniServiceLinks
          : article.brand === 'Rolls-Royce' ? rollsRoyceServiceLinks : generalServiceLinks;

  const jsonLd = React.useMemo(() => {
    const breadcrumb = buildBreadcrumb(url, [
      { name: isArabic ? 'الرئيسية' : 'Home', url: isArabic ? '/ar' : '/' },
      { name: isArabic ? 'المقالات' : 'Blog', url: isArabic ? '/ar/blog' : '/blog' },
      { name: article.title, url },
    ]);
    const webPage = buildWebPage({
      url,
      name: article.title,
      description: metaDescription,
      type: 'ItemPage',
      breadcrumbId: `${url}#breadcrumb`,
      primaryImage: article.coverImage,
      datePublished,
      dateModified,
      mainEntityId: `${url}#article`,
    });
    const blogArticle = buildArticle({
      url,
      headline: article.title,
      description: metaDescription,
      datePublished,
      dateModified,
      author: isArabic ? 'فريق ورشة ديجي-تك' : 'DIGI-TEC Workshop',
      image: article.coverImage,
      section: isArabic ? 'أدلة الورشة' : 'Workshop Guides',
      keywords,
    });
    const service = buildService({
      url,
      name: isArabic ? `خدمات ورشة ${article.brand} في دبي` : `${article.brand} workshop support in Dubai`,
      serviceType: isArabic ? `فحص وصيانة وإصلاح ${article.brand}` : `${article.brand} diagnostics, maintenance and repair`,
      description: metaDescription,
      image: article.coverImage,
      brand: article.brand,
      offers: isArabic
        ? ['الصيانة الدورية', 'فحص وتشخيص السيارة', 'الإصلاح الميكانيكي', 'إصلاح الفرامل', 'إصلاح التعليق', 'إصلاح الكهرباء']
        : ['Scheduled servicing', 'Diagnostics', 'Mechanical repair', 'Brake repair', 'Suspension repair', 'Electrical repair'],
      areaServed: isArabic ? ['دبي'] : ['Dubai'],
    });
    const faq = buildFAQ(url, faqs);
    return pageGraph([webPage, breadcrumb, blogArticle, service, ...(faq ? [faq] : [])]);
  }, [article, dateModified, datePublished, faqs, isArabic, keywords, metaDescription, url]);

  useSeo({
    title: metaTitle,
    description: metaDescription,
    keywords,
    canonical: url,
    ogTitle: metaTitle,
    ogDescription: metaDescription,
    ogImage,
    ogType: 'article',
    twitterCard: 'summary_large_image',
    twitterTitle: metaTitle,
    twitterDescription: metaDescription,
    jsonLd,
  });

  const whatsappHref = `https://wa.me/97143402223?text=${encodeURIComponent(isArabic ? `مرحباً ديجي-تك، أود حجز فحص لسيارة ${article.brand} في دبي.` : `Hi DIGI-TEC, I would like to book a ${article.brand} inspection in Dubai.`)}`;
  const relatedArticles = brandWorkshopArticles
    .filter((item) => item.slug !== article.slug)
    .slice(0, 3)
    .map((item) => (isArabic ? localizePostSummaryToArabic({ ...item, excerpt: '' }) : item));
  const t = (english: string, arabic: string) => (isArabic ? arabic : english);

  return (
    <div className="min-h-screen bg-black text-off-white">
      <Header />
      <main>
        <nav aria-label={t('Breadcrumb', 'مسار التنقل')} className="mx-auto max-w-6xl px-5 pt-6 text-sm text-gray-400 sm:px-6">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link to="/" className="hover:text-burnt-orange">{t('Home', 'الرئيسية')}</Link></li><li aria-hidden="true">/</li>
            <li><Link to="/blog" className="hover:text-burnt-orange">{t('Blog', 'المقالات')}</Link></li><li aria-hidden="true">/</li>
            <li className="text-off-white">{article.brand}</li>
          </ol>
        </nav>

        <section className={`relative mt-5 overflow-hidden bg-gradient-to-br ${article.coverGradient}`}>
          {article.coverImage && <img src={article.coverImage} alt={article.imageAlt} className="absolute inset-0 h-full w-full object-cover" />}
          <div className="absolute inset-0 bg-black/55" />
          <div className="relative mx-auto max-w-4xl px-5 py-16 sm:px-6 sm:py-24">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-burnt-orange">{t('Dubai Workshop Guide', 'دليل ورش السيارات في دبي')}</p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">{article.title}</h1>
            <p className="mt-4 flex items-center gap-2 text-sm text-gray-300">
              <Calendar className="h-4 w-4 text-burnt-orange" />
              {t(dateModified ? 'Updated' : 'Published', dateModified ? 'آخر تحديث' : 'تاريخ النشر')} {new Date(displayDate).toLocaleDateString(isArabic ? 'ar-AE' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })}
              <span aria-hidden="true">·</span>
              {t('12 min read', '12 دقيقة قراءة')}
            </p>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-gray-200">
              {article.excerpt ?? t(
                `Looking for a ${article.brand} workshop in Dubai? This owner guide explains what a proper inspection should cover, the common concerns worth discussing, and how to plan maintenance around UAE driving conditions.`,
                `هل تبحث عن ورشة ${article.brand} في دبي؟ يوضح هذا الدليل ما يجب أن يشمله الفحص الصحيح، والأعطال التي تستحق المناقشة، وكيفية تخطيط الصيانة بما يناسب ظروف القيادة في الإمارات.`,
              )}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-primary"><MessageCircle className="h-5 w-5" />{t('Book on WhatsApp', 'احجز عبر واتساب')}</a>
              <a href="tel:+97143402223" className="btn-secondary"><Phone className="h-5 w-5" />{t('Call +971 4 340 2223', 'اتصل على ‎+971 4 340 2223')}</a>
            </div>
            <CtaAssurance className="mt-4" align="start" />
          </div>
        </section>

        <article className="mx-auto max-w-4xl px-5 py-14 sm:px-6 sm:py-20">
          <section className={`${isArabic ? 'border-r-2 pr-5' : 'border-l-2 pl-5'} border-burnt-orange`}>
            <h2 className="text-2xl font-black sm:text-3xl">{t(`A practical answer for ${article.brand} owners`, `إجابة عملية لمالكي ${article.brand}`)}</h2>
            <p className="mt-4 text-lg leading-relaxed text-gray-300">{t(`The best workshop decision is rarely about a slogan. It is about whether the team can understand the car, define the concern accurately, show you a sensible repair path and keep you informed before costs grow. At DIGI-TEC in Al Quoz, a ${article.brand} appointment starts with the vehicle’s history, symptoms and current condition—not an assumption.`, `اختيار الورشة المناسبة لا يعتمد على شعار، بل على قدرة الفريق على فهم السيارة وتحديد المشكلة بدقة وشرح مسار إصلاح منطقي قبل ارتفاع التكلفة. في ديجي-تك بالقوز، يبدأ موعد ${article.brand} بمراجعة تاريخ السيارة وأعراضها وحالتها الحالية، لا بالافتراضات.`)}</p>
            {article.existingBestPage && <p className="mt-4 leading-relaxed text-gray-400">{t('For a direct comparison of what to look for in a workshop, see our ', 'للمقارنة المباشرة بين معايير اختيار الورشة، راجع صفحة ')}<Link to={article.existingBestPage} className="font-semibold text-burnt-orange hover:underline">{article.brand === 'Mercedes-Benz' ? t('Mercedes-Benz repair and service hub', 'مركز إصلاح وصيانة مرسيدس-بنز') : t(`${article.brand} workshop selection page`, `دليل اختيار ورشة ${article.brand}`)}</Link>{t('. This article is intentionally focused on ownership, maintenance and repair preparation so it does not duplicate that landing page.', '؛ فهذا المقال يركز على الملكية والصيانة والاستعداد للإصلاح من دون تكرار محتوى صفحة الخدمة.')}</p>}
          </section>

          <section className="mt-14">
            <h2 className="text-2xl font-black sm:text-3xl">{t('Why a specialist approach matters', 'لماذا تهم الخبرة المتخصصة؟')}</h2>
            <p className="mt-4 leading-relaxed text-gray-300">{t(`Modern ${article.brand} vehicles combine mechanical systems with networked control modules, safety functions, comfort features and model-specific service procedures. A warning light may point to a symptom rather than the failed part. Replacing components without checking fault history, live information, wiring, fluids and the surrounding system can turn a straightforward repair into repeated expense.`, `تجمع سيارات ${article.brand} الحديثة بين الأنظمة الميكانيكية ووحدات التحكم المتصلة ووظائف السلامة والراحة وإجراءات صيانة خاصة بالطراز. قد تشير رسالة التحذير إلى عَرَض لا إلى القطعة التالفة، لذلك يؤدي استبدال المكونات من دون مراجعة سجل الأعطال والبيانات الحية والأسلاك والسوائل إلى تكاليف متكررة.`)}</p>
            <p className="mt-4 leading-relaxed text-gray-300">{article.brand === 'Rolls-Royce' ? t('A good workshop should state what is confirmed, what is likely and what still needs testing. That distinction matters when approving maintenance, a repair or a major component replacement, and it makes quotations easier to compare fairly.', 'توضح الورشة الجيدة ما تم تأكيده وما هو محتمل وما يزال يحتاج إلى اختبار. هذا الفرق مهم عند اعتماد الصيانة أو الإصلاح أو استبدال مكوّن رئيسي، ويساعد على مقارنة عروض الأسعار بإنصاف.') : t('A good workshop should be comfortable saying what is confirmed, what is likely, and what still needs testing. That distinction matters when you are deciding whether to approve maintenance, a repair, a major component replacement or a performance upgrade. It also makes it easier to compare quotes fairly.', 'توضح الورشة الجيدة ما تم تأكيده، وما هو محتمل، وما يزال يحتاج إلى اختبار. هذا الفرق مهم عند اعتماد الصيانة أو الإصلاح أو استبدال مكوّن كبير أو تطوير الأداء، ويساعدك أيضاً على مقارنة عروض الأسعار بإنصاف.')}</p>
          </section>

          <section className="mt-14">
            <h2 className="text-2xl font-black sm:text-3xl">{t(`${article.brand} models and common Dubai concerns`, `طرازات ${article.brand} والأعطال الشائعة في دبي`)}</h2>
            <p className="mt-4 leading-relaxed text-gray-300">{t(`We see owners of ${article.models} looking for clear answers around reliability, service planning and the effect of Dubai heat. The exact concern depends on age, mileage, driving pattern and previous work, but these are the areas worth raising during an inspection:`, `يبحث مالكو طرازات ${article.models} عن إجابات واضحة حول الاعتمادية وخطة الصيانة وتأثير حرارة دبي. تختلف الأولويات حسب العمر والمسافة وطريقة القيادة والأعمال السابقة، لكن هذه أهم النقاط التي تستحق الفحص:`)}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {article.commonProblems.map((problem) => <div key={problem} className="card-premium rounded-2xl p-5"><Wrench className="mb-3 h-5 w-5 text-burnt-orange" /><h3 className="font-bold">{problem}</h3><p className="mt-2 text-sm leading-relaxed text-gray-400">{t('The cause should be confirmed with a measured inspection before any major part is approved.', 'يجب تأكيد السبب بفحص وقياسات واضحة قبل اعتماد استبدال أي قطعة رئيسية.')}</p></div>)}
            </div>
            <p className="mt-6 leading-relaxed text-gray-300">{t('Heat, traffic, dust, occasional short journeys and long periods of idling can expose a marginal cooling system, tired battery, worn tyre or ageing fluid sooner than an owner expects. The goal is not to replace parts early without reason; it is to identify the items that can cause a breakdown, safety issue or more expensive repair if ignored.', 'قد تكشف الحرارة والازدحام والغبار والرحلات القصيرة وفترات التوقف الطويلة ضعف نظام التبريد أو البطارية أو الإطارات أو السوائل مبكراً. الهدف ليس تبديل القطع بلا سبب، بل تحديد ما قد يؤدي إلى تعطل أو مشكلة سلامة أو إصلاح أغلى إذا تم تجاهله.')}</p>
          </section>

          <section className="mt-14">
            <h2 className="text-2xl font-black sm:text-3xl">{t('Diagnostics and typical repair planning', 'التشخيص وخطة الإصلاح المناسبة')}</h2>
            <p className="mt-4 leading-relaxed text-gray-300">{t(`For ${article.brand} work, the diagnostic focus is ${article.diagnosticFocus}. The technician should connect the symptom to evidence, then explain the order of work. A thoughtful plan often starts with the least invasive checks, confirms the source of the issue, and only then moves to repair or component replacement.`, `يركز تشخيص ${article.brand} على ${article.diagnosticFocus}. يربط الفني العَرَض بالدليل ثم يشرح ترتيب العمل. تبدأ الخطة المدروسة عادة بأقل الاختبارات تدخلاً، وتؤكد مصدر المشكلة، ثم تنتقل إلى الإصلاح أو الاستبدال.`)}</p>
            <ul className="mt-5 space-y-3 text-gray-300">
              {article.repairFocus.map((repair) => <li key={repair} className="flex gap-3"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-burnt-orange" /><span>{repair}</span></li>)}
            </ul>
            <p className="mt-5 leading-relaxed text-gray-300">{t('A written inspection result helps you decide what is urgent, what can be scheduled, and which preventive items are genuinely worthwhile. It also gives you a useful record if you are comparing options, planning a long journey or preparing the car for sale.', 'تساعدك نتيجة الفحص المكتوبة على معرفة ما هو عاجل وما يمكن جدولته وما يستحق الصيانة الوقائية فعلاً. كما توفر سجلاً مفيداً عند مقارنة الخيارات أو التخطيط للسفر أو تجهيز السيارة للبيع.')}</p>
          </section>

          <section className="mt-14">
            <h2 className="text-2xl font-black sm:text-3xl">{t('Maintenance in Dubai: plan by condition, not guesswork', 'الصيانة في دبي: خطة مبنية على الحالة لا التخمين')}</h2>
            <p className="mt-4 leading-relaxed text-gray-300">{article.maintenanceNote}</p>
            <p className="mt-4 leading-relaxed text-gray-300">{t('A practical maintenance conversation covers engine oil and filters, brake condition, tyres, battery health, cooling performance, air-conditioning, fluids, leaks, service records and any stored warning codes. For performance, luxury and older vehicles, it also helps to discuss storage, battery conditioning and how often the car is driven. This gives the workshop a fuller picture than a mileage number on its own.', 'تشمل مناقشة الصيانة العملية زيت المحرك والفلاتر والفرامل والإطارات والبطارية والتبريد والمكيف والسوائل والتسريبات وسجل الصيانة ورموز الأعطال المخزنة. وفي السيارات الفاخرة أو عالية الأداء أو الأقدم، تفيد معرفة مدة التخزين وطريقة شحن البطارية وعدد مرات الاستخدام، لأن هذه الصورة أدق من رقم المسافة وحده.')}</p>
          </section>

          {article.brand === 'Ferrari' && (
            <>
              <section className="mt-14">
                <h2 className="text-2xl font-black sm:text-3xl">{t('Ferrari service schedule in Dubai: time matters as much as mileage', 'جدول صيانة فيراري في دبي: الوقت مهم بقدر المسافة')}</h2>
                <p className="mt-4 leading-relaxed text-gray-300">
                  {t('Ferrari states that its 7-Year Genuine Maintenance programme provides scheduled maintenance every 20,000 km or once a year, without a mileage restriction on the annual option. Treat that as a useful reference point, then check the handbook and service history for your exact model because limited editions, classic cars and vehicles outside the programme may have different requirements.', 'توضح فيراري أن برنامج الصيانة الأصلية لمدة سبع سنوات يعتمد الصيانة كل 20,000 كيلومتر أو مرة سنوياً. استخدم ذلك كمرجع أولي، ثم راجع دليل الطراز وسجل الصيانة لأن السيارات الكلاسيكية والإصدارات المحدودة والسيارات خارج البرنامج قد تختلف متطلباتها.')}{' '}
                  <a href="https://www.ferrari.com/en-EN/auto/car-part-services-warranty-maintenance" target="_blank" rel="noopener noreferrer" className="font-semibold text-burnt-orange hover:underline">{t('Ferrari maintenance programme details', 'تفاصيل برنامج صيانة فيراري')}</a>.
                </p>
                <p className="mt-4 leading-relaxed text-gray-300">{t('Low mileage does not remove the need for annual attention. Heat cycles, long storage, battery condition, tyre age, fluid ageing and seals can all matter before the odometer reaches the next distance-based interval. Cars used on track or driven hard should be assessed around that use rather than relying on the calendar alone.', 'قلة المسافة لا تلغي الحاجة إلى المتابعة السنوية. تؤثر الحرارة والتخزين الطويل وحالة البطارية وعمر الإطارات وتقادم السوائل والأختام حتى قبل بلوغ موعد المسافة التالي. أما سيارات الحلبة أو الاستخدام القوي فتحتاج إلى فحص يناسب طريقة استخدامها.')}</p>
              </section>

              <section className="mt-14">
                <h2 className="text-2xl font-black sm:text-3xl">{t('What affects Ferrari maintenance cost in Dubai?', 'ما العوامل التي تحدد تكلفة صيانة فيراري في دبي؟')}</h2>
                <p className="mt-4 leading-relaxed text-gray-300">{t('A responsible workshop cannot quote one Ferrari maintenance price without knowing the car. The cost changes with the model, generation, mileage, service history, scheduled scope and the evidence found during inspection. A routine annual visit is different from resolving an F1 gearbox concern, a cooling fault or deferred maintenance on a stored car.', 'لا يمكن تقديم سعر واحد مسؤول لصيانة جميع سيارات فيراري من دون معرفة السيارة. تتغير التكلفة حسب الطراز والجيل والمسافة والسجل ونطاق الصيانة ونتيجة الفحص. تختلف الزيارة السنوية المعتادة تماماً عن إصلاح ناقل حركة F1 أو عطل تبريد أو صيانة مؤجلة لسيارة مخزنة.')}</p>
                <ul className="mt-5 space-y-3 text-gray-300">
                  {[
                    t('The exact model, engine, transmission and model year', 'الطراز والمحرك وناقل الحركة وسنة الصنع'),
                    t('Scheduled fluids, filters, plugs and other required consumables', 'السوائل والفلاتر وشمعات الاحتراق والمواد المطلوبة'),
                    t('Diagnostic time for warning lights, drivability or electronic faults', 'وقت التشخيص لرسائل التحذير أو مشكلات القيادة والإلكترونيات'),
                    t('Tyre age, brake condition, suspension wear and battery health', 'عمر الإطارات وحالة الفرامل والتعليق والبطارية'),
                    t('OEM parts availability and any work discovered after inspection', 'توفر القطع الأصلية وأي أعمال تظهر بعد الفحص'),
                  ].map((factor) => <li key={factor} className="flex gap-3"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-burnt-orange" /><span>{factor}</span></li>)}
                </ul>
                <p className="mt-5 leading-relaxed text-gray-300">{t('Ask for an itemised estimate that separates diagnostics, labour, parts and optional preventive work. For a direct service overview or to arrange an inspection, visit our ', 'اطلب عرضاً مفصلاً يفصل التشخيص والعمالة والقطع والأعمال الوقائية الاختيارية. للاطلاع على الخدمات أو حجز فحص، زر صفحة ')}<Link to="/brands/ferrari-service-dubai" className="font-semibold text-burnt-orange hover:underline">{t('Ferrari service Dubai page', 'خدمة فيراري في دبي')}</Link>.</p>
              </section>

              {!isArabic && (
                <section className="mt-14">
                  <h2 className="text-2xl font-black sm:text-3xl">Ferrari service information by model</h2>
                  <p className="mt-4 max-w-3xl leading-relaxed text-gray-300">Use the model guides when the engine, transmission, suspension, braking or hybrid architecture changes the inspection path.</p>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                      ['Ferrari 488', '/brands/ferrari-service-dubai/488'],
                      ['Ferrari F8 Tributo', '/brands/ferrari-service-dubai/f8-tributo'],
                      ['Ferrari Roma', '/brands/ferrari-service-dubai/roma'],
                      ['Ferrari SF90', '/brands/ferrari-service-dubai/sf90'],
                      ['Ferrari 296', '/brands/ferrari-service-dubai/296'],
                      ['Ferrari Portofino', '/brands/ferrari-service-dubai/portofino'],
                      ['Ferrari 812', '/brands/ferrari-service-dubai/812'],
                      ['Ferrari Purosangue', '/brands/ferrari-service-dubai/purosangue'],
                    ].map(([label, path]) => <Link key={path} to={path} className="card-premium rounded-xl p-4 text-sm font-bold transition-colors hover:text-burnt-orange">{label}<ArrowRight className="mt-2 h-4 w-4 text-burnt-orange" /></Link>)}
                  </div>
                </section>
              )}
            </>
          )}

          <section className="mt-14">
            <h2 className="text-2xl font-black sm:text-3xl">{article.brand === 'McLaren' || article.brand === 'Rolls-Royce' ? t('Parts, fluids and confirmed workshop scope', 'القطع والسوائل ونطاق العمل المؤكد') : t('OEM parts, alternatives and performance work', 'القطع الأصلية والبدائل وتطوير الأداء')}</h2>
            <p className="mt-4 leading-relaxed text-gray-300">{t('Parts choices should be transparent. The workshop should tell you whether a component is genuine OEM, OEM-equivalent or aftermarket, why it suits the job, and what warranty terms apply. The right choice depends on the repair: safety, electronics, complex driveline components and software-sensitive systems deserve especially careful sourcing.', 'يجب أن يكون اختيار القطع واضحاً. من حقك معرفة ما إذا كانت القطعة أصلية أو مكافئة لمواصفات المصنع أو من سوق البدائل، ولماذا تناسب الإصلاح وما شروط ضمانها. تحتاج مكونات السلامة والإلكترونيات وناقل الحركة والأنظمة الحساسة للبرمجة إلى عناية خاصة في الاختيار.')}</p>
            <p className="mt-4 leading-relaxed text-gray-300">{article.performanceNote}</p>
          </section>

          <section className="mt-14">
            <h2 className="text-2xl font-black sm:text-3xl">{t('What a useful inspection should give you', 'ماذا يجب أن يمنحك الفحص المفيد؟')}</h2>
            <p className="mt-4 leading-relaxed text-gray-300">{t(`A workshop visit should leave a ${article.brand} owner with more than a list of parts. The useful outcome is a clear hierarchy: safety and breakdown risks first, faults that are confirmed by testing second, preventive work that makes sense for the car’s age and use third, and cosmetic or optional work last. This avoids treating every observation as an urgent repair while also preventing small concerns from being forgotten.`, `يجب أن يغادر مالك ${article.brand} الورشة بأكثر من قائمة قطع. النتيجة المفيدة هي ترتيب واضح: مخاطر السلامة والتعطل أولاً، ثم الأعطال المؤكدة بالاختبار، ثم الصيانة الوقائية المناسبة للعمر والاستخدام، وأخيراً الأعمال التجميلية أو الاختيارية. هكذا لا تتحول كل ملاحظة إلى إصلاح عاجل ولا تُنسى المشكلات الصغيرة.`)}</p>
            <p className="mt-4 leading-relaxed text-gray-300">{t('Ask for the symptom, the evidence behind the recommendation, the proposed repair, the parts specification and the expected next step. If a fault is intermittent, video, temperature, speed, warning-light timing and recent driving conditions can all be valuable clues. That context is often the difference between finding the root cause and repeating the same diagnostic visit.', 'اسأل عن العَرَض والدليل وراء التوصية والإصلاح المقترح ومواصفات القطع والخطوة التالية. وإذا كان العطل متقطعاً، فقد يكون الفيديو ودرجة الحرارة والسرعة وتوقيت رسالة التحذير وظروف القيادة أدلة مهمة للوصول إلى السبب الجذري.')}</p>
            <p className="mt-4 leading-relaxed text-gray-300">{article.brand === 'Rolls-Royce' ? t('A documented condition assessment can establish a useful baseline for an existing owner. It may record tyre age, brake condition, fluids, visible leaks, low-voltage battery health, fault memory and exposed suspension or cooling components within the agreed scope. Pre-purchase inspection is not advertised here without separate capability confirmation.', 'يمكن لفحص الحالة الموثق أن يحدد نقطة مرجعية مفيدة للمالك، تشمل عمر الإطارات وحالة الفرامل والسوائل والتسريبات الظاهرة والبطارية منخفضة الجهد وذاكرة الأعطال ومكونات التعليق أو التبريد ضمن النطاق المتفق عليه. لا تعلن الصفحة عن فحص ما قبل الشراء من دون تأكيد منفصل للقدرة.') : t(`For a used ${article.brand}, an inspection before purchase or before an extended trip can also establish a baseline. It can document tyre age, brake life, fluid condition, leak evidence, battery health, fault memory and the condition of exposed suspension and cooling components. The report is useful even when the car has no immediate fault because it helps the owner plan realistically.`, `في سيارة ${article.brand} مستعملة، يحدد فحص ما قبل الشراء أو السفر حالة مرجعية تشمل عمر الإطارات وحالة الفرامل والسوائل والتسريبات والبطارية وذاكرة الأعطال ومكونات التعليق والتبريد الظاهرة. يفيد التقرير حتى عند عدم وجود عطل فوري لأنه يساعد المالك على التخطيط الواقعي.`)}</p>
          </section>

          <section className="mt-14">
            <h2 className="text-2xl font-black sm:text-3xl">{t('A Dubai maintenance checklist for luxury and performance cars', 'قائمة صيانة سيارات الأداء والفخامة في دبي')}</h2>
            <p className="mt-4 leading-relaxed text-gray-300">{t('Service intervals in the handbook are a starting point, not a substitute for observation. Dubai places sustained demand on cooling and air-conditioning systems, and city traffic can add heat cycles without adding many kilometres. Owners should pay attention to changes in operating temperature, weak cooling, hard starting, vibrations, tyre pressure changes, braking feel, new noises and any warning message, even if it disappears.', 'فترات الصيانة في الكتيب نقطة بداية وليست بديلاً عن المراقبة. تضغط دبي باستمرار على التبريد والتكييف، ويضيف ازدحام المدينة دورات حرارية من دون زيادة كبيرة في الكيلومترات. راقب تغير الحرارة وضعف التبريد وصعوبة التشغيل والاهتزاز وضغط الإطارات وإحساس الفرامل والأصوات ورسائل التحذير حتى لو اختفت.')}</p>
            <p className="mt-4 leading-relaxed text-gray-300">{article.brand === 'Rolls-Royce' ? t('For combustion models, a sensible routine includes the correct engine oil and approved fluids at the appropriate interval. Across the range, tyres, brakes and the low-voltage battery deserve condition-based checks, especially when a car is stored. Spectre follows an electric-vehicle maintenance path and is not included in engine-oil servicing. Low mileage does not stop tyres, seals, fluids or low-voltage batteries from ageing.', 'لطرازات الاحتراق، يشمل الروتين المناسب زيت المحرك الصحيح والسوائل المعتمدة في الموعد الملائم. وتحتاج الإطارات والفرامل والبطارية منخفضة الجهد إلى فحوص بحسب الحالة، خاصة عند تخزين السيارة. تتبع Spectre مسار صيانة كهربائياً ولا تشملها خدمة زيت المحرك. لا تمنع قلة المسافة تقادم الإطارات والأختام والسوائل والبطارية منخفضة الجهد.') : t('A sensible routine includes checking engine oil and approved fluids at the right interval, monitoring tyres for age and uneven wear, inspecting brake condition before it becomes a metal-on-metal issue, and keeping the battery and charging system healthy. Vehicles that sit for long periods need particular attention: low mileage does not stop tyres, seals, fluids or batteries from ageing. A short drive is not always enough to recharge a battery or bring all systems through a complete operating cycle.', 'يشمل الروتين السليم فحص زيت المحرك والسوائل المعتمدة والإطارات وعمرها وتآكلها والفرامل قبل وصولها إلى احتكاك معدني، والمحافظة على البطارية ونظام الشحن. وتحتاج السيارات المخزنة إلى اهتمام خاص؛ فقلة المسافة لا تمنع تقادم الإطارات والأختام والسوائل والبطارية.')}</p>
            <p className="mt-4 leading-relaxed text-gray-300">{t(`When booking, describe how the ${article.brand} is used: city commuting, chauffeur work, school runs, weekend driving, towing, track days, desert trips or storage. That information helps the workshop tailor the inspection. A vehicle driven gently in Al Quoz traffic has different priorities from one used for high-speed motorway trips or performance driving, even when both have the same mileage.`, `عند الحجز، اشرح طريقة استخدام ${article.brand}: تنقل يومي، عمل بسائق، رحلات مدرسية، قيادة نهاية الأسبوع، سحب، حلبة، صحراء أو تخزين. تساعد هذه المعلومات الورشة على تخصيص الفحص، لأن سيارة تعمل في ازدحام القوز تختلف أولوياتها عن سيارة الطرق السريعة أو القيادة الرياضية حتى عند تساوي المسافة.`)}</p>
          </section>

          <section className="mt-14">
            <h2 className="text-2xl font-black sm:text-3xl">{t('How clear workshop communication protects your budget', 'كيف يحمي التواصل الواضح ميزانيتك؟')}</h2>
            <p className="mt-4 leading-relaxed text-gray-300">{t('Luxury-car repairs can become expensive when a workshop starts without a confirmed scope. A clear estimate should separate diagnosis, labour, parts, consumables and any work that could only be confirmed after dismantling. It should also identify which items are essential for safe operation and which are advisable but can be scheduled. That makes the decision yours rather than a surprise at collection time.', 'قد تصبح إصلاحات السيارات الفاخرة مكلفة عندما يبدأ العمل من دون نطاق مؤكد. يفصل عرض السعر الواضح بين التشخيص والعمالة والقطع والمواد وما لا يمكن تأكيده إلا بعد الفك، ويحدد ما يلزم للسلامة وما يمكن جدولته، حتى يبقى القرار بيدك ولا تتحول الفاتورة إلى مفاجأة.')}</p>
            <p className="mt-4 leading-relaxed text-gray-300">{t('If the vehicle requires further testing, the workshop should explain why. For example, a fault code may need wiring checks, pressure tests, a fluid inspection or a road test before a module, compressor, gearbox part or suspension component is blamed. That process takes more care than a quick scan, but it is usually the better way to avoid replacing a costly part that was not the cause.', 'إذا احتاجت السيارة إلى اختبارات إضافية، يجب شرح السبب. فقد يتطلب رمز العطل فحص الأسلاك أو الضغط أو السوائل أو تجربة الطريق قبل اتهام وحدة إلكترونية أو ضاغط أو جزء في ناقل الحركة أو التعليق. هذا أدق من المسح السريع ويمنع تبديل قطعة غالية ليست سبب المشكلة.')}</p>
            <p className="mt-4 leading-relaxed text-gray-300">{t(`Keep invoices and inspection reports with the service record. They support resale, help a future technician understand what has been done, and give you evidence of the fluids, parts and preventative work used on the car. This is especially useful on ${article.brand} vehicles with complex maintenance histories or owners who plan to sell within the UAE.`, `احتفظ بالفواتير وتقارير الفحص مع سجل الصيانة. فهي تدعم قيمة البيع وتساعد الفني لاحقاً على فهم ما تم إنجازه وتوثق السوائل والقطع والأعمال الوقائية، وهذا مهم خصوصاً لسيارات ${article.brand} ذات التاريخ المعقد أو عند البيع داخل الإمارات.`)}</p>
          </section>

          <section className="mt-14">
            <h2 className="text-2xl font-black sm:text-3xl">{t('Before you book: information that speeds up diagnosis', 'قبل الحجز: معلومات تسرّع التشخيص')}</h2>
            <p className="mt-4 leading-relaxed text-gray-300">{t(`You can make a ${article.brand} appointment more productive by sharing the model, year, mileage, VIN where appropriate, recent service work and the exact concern. Mention whether the issue occurs only when cold, in traffic, at speed, under braking, after refuelling, while using air-conditioning or after the vehicle has been parked. A short video of a noise or warning message can be more useful than a broad description.`, `اجعل موعد ${article.brand} أكثر فاعلية بإرسال الطراز والسنة والمسافة ورقم الهيكل عند الحاجة والأعمال الأخيرة ووصف المشكلة بدقة. اذكر إن كانت تظهر عند البرودة أو في الازدحام أو السرعة أو الفرملة أو بعد التعبئة أو تشغيل المكيف أو الوقوف. وقد يكون فيديو قصير للصوت أو التحذير أوضح من وصف عام.`)}</p>
            <p className="mt-4 leading-relaxed text-gray-300">{article.brand === 'McLaren' || article.brand === 'Rolls-Royce' ? t('For maintenance or repair, explain recent work, storage, upcoming travel and how the car is used. Ask the workshop to confirm the first inspection and accepted scope before arranging transport or relying on a preliminary estimate.', 'للصيانة أو الإصلاح، اشرح الأعمال الأخيرة والتخزين والسفر القريب وطريقة استخدام السيارة. اطلب من الورشة تأكيد الفحص الأول ونطاق العمل المقبول قبل ترتيب نقل السيارة أو الاعتماد على تقدير أولي.') : t('For maintenance work, tell the workshop about upcoming travel, inspection deadlines, track use, towing or plans for an upgrade. For a pre-purchase check, allow enough time for a proper review rather than asking for a rushed decision at the seller’s location. The purpose is not to make the process complicated; it is to give the technician enough information to inspect the right systems first and give you a more reliable answer.', 'في أعمال الصيانة، أخبر الورشة عن السفر القريب أو موعد الفحص أو استخدام الحلبة أو السحب أو خطة التطوير. وفي فحص ما قبل الشراء، امنح الفني وقتاً كافياً بدلاً من طلب قرار متسرع. الهدف هو تزويد الفني بالمعلومات اللازمة لفحص الأنظمة الصحيحة أولاً وتقديم إجابة أكثر موثوقية.')}</p>
          </section>

          <section className="mt-14">
            <h2 className="text-2xl font-black sm:text-3xl">{t(`When a ${article.brand} should be inspected urgently`, `متى تحتاج ${article.brand} إلى فحص عاجل؟`)}</h2>
            <p className="mt-4 leading-relaxed text-gray-300">{t('Some symptoms should not wait for the next scheduled service. Stop and arrange advice promptly if you see an overheating message, a red oil-pressure or brake warning, a strong fuel smell, smoke, a major coolant loss, sudden loss of power, a steering change, a harsh new transmission behaviour or a suspension warning that changes how the car sits or handles. Continuing to drive can turn a contained issue into damage to an engine, transmission, brake system or safety-related component.', 'بعض الأعراض لا تنتظر موعد الصيانة التالي. توقف واطلب المشورة عند ظهور سخونة أو تحذير أحمر لضغط الزيت أو الفرامل أو رائحة وقود قوية أو دخان أو فقدان كبير لسائل التبريد أو قوة المحرك أو تغير في التوجيه أو سلوك قاسٍ لناقل الحركة أو تحذير تعليق يؤثر في ارتفاع السيارة أو التحكم بها. استمرار القيادة قد يحول المشكلة إلى تلف أكبر.')}</p>
            <p className="mt-4 leading-relaxed text-gray-300">{t('For less urgent warnings, note the exact message and whether the car drives normally. Do not clear codes repeatedly before the appointment, because stored information may help identify the cause. If you are unsure whether it is safe to continue, contact the workshop with the warning, model and current symptoms. Clear information allows the team to advise whether to bring the vehicle in, arrange recovery or schedule a controlled inspection. It also prevents wasted time, protects the vehicle’s service record and helps you make a calmer, better-informed decision. A short call before driving across Dubai may save a costly avoidable failure today.', 'للتحذيرات الأقل إلحاحاً، دوّن الرسالة وهل تقود السيارة بصورة طبيعية، ولا تمسح الرموز مراراً قبل الموعد لأن البيانات المخزنة قد تكشف السبب. إذا شككت في سلامة الاستمرار، تواصل مع الورشة وأرسل التحذير والطراز والأعراض. تساعد هذه المعلومات الفريق على تحديد ما إذا كان يجب إحضار السيارة أو طلب سطحة أو ترتيب فحص، وقد تمنع عطلاً مكلفاً يمكن تجنبه.')}</p>
          </section>

          <section className="mt-14 rounded-3xl border border-burnt-orange/25 bg-burnt-orange/5 p-6 sm:p-8">
            <h2 className="text-2xl font-black sm:text-3xl">{t('Why book with DIGI-TEC in Al Quoz', 'لماذا تحجز لدى ديجي-تك في القوز؟')}</h2>
            <p className="mt-4 leading-relaxed text-gray-300">{article.brand === 'McLaren' ? t('DIGI-TEC Performance Center is an independent workshop in Al Quoz Industrial Area 3, Dubai. For a McLaren enquiry, share the model, year, mileage and concern so the team can confirm the appropriate first assessment and workshop scope before work moves forward.', 'ديجي-تك بيرفورمانس ورشة مستقلة في القوز الصناعية 3 بدبي. لاستفسار مكلارين، أرسل الطراز والسنة والمسافة والمشكلة حتى يؤكد الفريق الفحص الأول المناسب ونطاق العمل قبل بدء التنفيذ.') : article.brand === 'Rolls-Royce' ? t('DIGI-TEC Performance Center is an independent workshop in Al Quoz Industrial Area 3, Dubai. Share the Rolls-Royce model, year, mileage, history and concern so the team can confirm the appropriate first assessment, accepted scope and appointment availability before work moves forward.', 'ديجي-تك بيرفورمانس ورشة مستقلة في القوز الصناعية 3 بدبي. أرسل طراز رولز رويس والسنة والمسافة والسجل والمشكلة حتى يؤكد الفريق الفحص الأول والنطاق المقبول وتوفر الموعد قبل بدء العمل.') : t('DIGI-TEC Performance Center is located in Al Quoz Industrial Area 3, Dubai. Our team works with luxury, performance and everyday vehicles, using a clear inspection-first process, practical service advice and written communication before repair work moves forward. Whether you need routine maintenance, a warning-light diagnosis, a second opinion or a pre-purchase check, the aim is to give you a useful decision path—not vague recommendations.', 'يقع مركز ديجي-تك بيرفورمانس في منطقة القوز الصناعية 3 بدبي. يعمل فريقنا على السيارات الفاخرة وعالية الأداء والسيارات اليومية بمنهج يبدأ بالفحص، وتوصيات عملية، وتواصل مكتوب قبل بدء الإصلاح. سواء احتجت إلى صيانة دورية أو تشخيص تحذير أو رأي ثانٍ أو فحص قبل الشراء، هدفنا أن نمنحك مسار قرار واضحاً لا توصيات مبهمة.')}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row"><a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-primary"><MessageCircle className="h-5 w-5" />{t('Request a Quote', 'اطلب عرض سعر')}</a><a href="https://maps.google.com/?q=Al+Quoz+Industrial+Area+3+Dubai" target="_blank" rel="noopener noreferrer" className="btn-secondary"><MapPin className="h-5 w-5" />{t('Get Directions', 'اعرض الموقع على الخريطة')}</a></div>
          </section>

          <section className="mt-14">
            <h2 className="text-2xl font-black sm:text-3xl">{t('Related services and useful next steps', 'خدمات مرتبطة وخطوات تالية مفيدة')}</h2>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {relatedServiceLinks.map((service) => <Link key={service.href} to={service.href} className="card-premium rounded-xl p-4 text-sm font-bold transition-colors hover:text-burnt-orange">{isArabic ? service.arLabel : service.label}<ArrowRight className={`mt-2 h-4 w-4 text-burnt-orange ${isArabic ? 'rotate-180' : ''}`} /></Link>)}
            </div>
            {!article.coverImage && <p className="mt-6 text-sm leading-relaxed text-gray-400">{t(`Useful image plan for this article: a ${article.brand} arriving at the workshop, a technician using diagnostic equipment, a close-up of the relevant repair area, and a wide shot of the workshop. Suggested hero alt text: “${article.imageAlt}”.`, `خطة الصور المقترحة للمقال: سيارة ${article.brand} عند وصولها إلى الورشة، وفني يستخدم جهاز التشخيص، وصورة قريبة لمنطقة الإصلاح، وصورة واسعة للورشة. النص البديل المقترح للصورة الرئيسية: «${article.imageAlt}».`)}</p>}
          </section>

          <section className="mt-14">
            <h2 className="text-center text-2xl font-black sm:text-3xl">{t(`${article.brand} workshop FAQs`, `الأسئلة الشائعة عن ورشة ${article.brand}`)}</h2>
            <Accordion type="single" collapsible className="mt-7 space-y-3">
              {faqs.map((faq, index) => <AccordionItem key={faq.question} value={`faq-${index}`} className="rounded-2xl border border-white/10 bg-white/[0.03] px-5"><AccordionTrigger className={`${isArabic ? 'text-right' : 'text-left'} font-bold hover:no-underline`}>{faq.question}</AccordionTrigger><AccordionContent className="leading-relaxed text-gray-300">{faq.answer}</AccordionContent></AccordionItem>)}
            </Accordion>
          </section>

          <section className="mt-14 border-t border-white/10 pt-10">
            <h2 className="text-2xl font-black">{t('Related workshop guides', 'أدلة ورش مرتبطة')}</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">{relatedArticles.map((item) => <Link key={item.slug} to={`/blog/${item.slug}`} className="card-premium rounded-2xl p-5 transition-colors hover:text-burnt-orange"><p className="text-xs font-bold uppercase tracking-widest text-burnt-orange">{t('Workshop Guide', 'دليل الورشة')}</p><h3 className="mt-2 font-bold">{item.title}</h3></Link>)}</div>
          </section>
        </article>
      </main>
      <aside className={`fixed bottom-4 ${isArabic ? 'left-4' : 'right-4'} z-30 hidden rounded-2xl border border-burnt-orange/40 bg-black/95 p-4 shadow-2xl shadow-black/60 lg:block`} aria-label={t('Book a workshop inspection', 'احجز فحصاً في الورشة')}><p className="text-sm font-bold">{t(`Book a ${article.brand} inspection`, `احجز فحص ${article.brand}`)}</p><a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex text-sm font-bold text-burnt-orange hover:underline">{t('WhatsApp DIGI-TEC', 'تواصل مع ديجي-تك عبر واتساب')} <ArrowRight className={`${isArabic ? 'mr-1 rotate-180' : 'ml-1'} h-4 w-4`} /></a></aside>
      <FinalCTA />
      <Footer />
    </div>
  );
};

const BrandWorkshopArticlePage = () => {
  const { isArabic, localizedPath } = useLocale();
  const { slug } = useParams<{ slug: string }>();
  const sourceArticle = slug ? getBrandWorkshopArticle(slug) : undefined;

  if (!sourceArticle) return <Navigate to={localizedPath('/blog')} replace />;

  const article = isArabic ? localizeBrandWorkshopArticleToArabic(sourceArticle) : sourceArticle;
  return <BrandWorkshopArticleContent article={article} isArabic={isArabic} />;
};

export default BrandWorkshopArticlePage;
