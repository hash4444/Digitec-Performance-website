import type { BrandServiceCombo } from './brandServices';

// Existing commercial URL only. Photographs establish workshop context; no
// Range Rover accident job, generation, parts list or outcome is inferred.
const workshopImage = {
  src: '/images/range-rover-service-dubai-hero.jpg',
  width: 941,
  height: 1672,
};

export function getR11RangeRoverBodyContent(base: BrandServiceCombo | undefined, isArabic: boolean) {
  if (!base || base.brandSlug !== 'range-rover-service-dubai' || base.serviceSlug !== 'body-repair') return undefined;
  const name = isArabic ? 'رينج روفر' : 'Range Rover';
  const combo: BrandServiceCombo = {
    ...base,
    brandName: name,
    serviceName: isArabic ? 'إصلاح الهيكل والطلاء' : 'Body & Paint Repair',
    serviceType: isArabic ? 'فحص أضرار الهيكل والطلاء وإصلاحها' : 'Bodywork, Paint & Accident Damage Assessment',
    h1: isArabic ? 'إصلاح هيكل وطلاء رينج روفر في دبي' : 'Range Rover Body Repair in Dubai',
    metaTitle: isArabic ? 'إصلاح هيكل رينج روفر في دبي | ديجي-تك' : 'Range Rover Body Repair Dubai | DIGITEC',
    metaDescription: isArabic
      ? 'إصلاح هيكل رينج روفر في القوز، دبي. تقييم أضرار الألواح والصدام والحوادث والطلاء، وفحص الأنظمة المتأثرة قبل تحديد القطع والإصلاح المناسب.'
      : 'Range Rover body repair in Al Quoz, Dubai. Assess panel, bumper and accident damage, hidden-system concerns and paintwork options before agreeing repairs.',
    heroCopy: isArabic
      ? 'تبدأ معاينة أضرار رينج روفر في ديجي-تك بوصف ما حدث وصور الضرر والطراز وسنة الصنع. نراجع الألواح والصدام والأنوار والفواصل الظاهرة، ونحدد ما إذا كان الوصول خلفها ضرورياً لفحص نقاط التثبيت أو الأنظمة المتأثرة. يُوضح نطاق إصلاح القطع أو استبدالها والطلاء وأي فحوص إضافية قبل الموافقة؛ ولا يكفي المظهر الخارجي وحده لتحديد كامل الضرر.'
      : 'Range Rover body repair at DIGITEC starts with what happened, photographs of the damage, the model and year. Visible panels, bumpers, lamps and fit are assessed, then access behind them is considered where an impact may have affected mounts or other systems. Repair, replacement, refinishing and any associated checks are explained before approval; an exterior photograph alone cannot establish the full damage.',
    models: ['Range Rover', 'Range Rover Sport', 'Vogue', 'Autobiography', 'Velar', 'Evoque'],
    symptoms: isArabic ? [
      'بعج أو خدوش عميقة أو تشقق في الطلاء أو الصدام',
      'اختلاف فواصل الألواح أو تثبيت غير محكم للصدام أو المصباح بعد صدمة',
      'تحذير حساس أو كاميرا أو إنارة ظهر بعد ضرر أو إصلاح سابق',
      'تسرب أو تغير في التبريد أو التكييف بعد صدمة، يحتاج فحصاً منفصلاً',
    ] : [
      'Dents, deep scratches, cracked paint or damaged bumper surfaces',
      'Changed panel gaps, loose bumper fit or lamp mounting after an impact',
      'A sensor, camera or lighting warning after damage or earlier bodywork',
      'A leak or change in cooling or AC after an impact requiring separate system checks',
    ],
    processSteps: isArabic ? [
      { title: 'تحديد السيارة والضرر', description: 'مراجعة الطراز والسنة ورقم الهيكل ومكان الصدمة والصور وأي تحذير أو تغير في القيادة. تُؤكد طريقة إحضار السيارة بأمان قبل الزيارة عند الحاجة.' },
      { title: 'المعاينة والوصول المناسب', description: 'فحص الألواح والفواصل والتثبيت، وتوضيح أي فك مقترح للوصول إلى المناطق المخفية بدلاً من افتراض سلامتها من الصورة.' },
      { title: 'توضيح الأنظمة وخيارات الإصلاح', description: 'تحديد فحوص التبريد أو الكهرباء أو الحساسات بحسب المنطقة المتأثرة، ومراجعة القطع والطلاء وإجراءات المعايرة المطلوبة والمدعومة للسيارة.' },
      { title: 'الاتفاق والتحقق', description: 'شرح العمل والقطع وأجرة العمل والفحوص المقترحة للموافقة، ثم مراجعة التثبيت والأنظمة المرتبطة وفق الإصلاح المتفق عليه.' },
    ] : [
      { title: 'Identify the vehicle and damage', description: 'Review the model, year, VIN, impact area, photographs and any warning or driving change. Confirm a safe arrival plan where needed.' },
      { title: 'Inspect and agree access', description: 'Assess panels, gaps and mounting. Explain any proposed dismantling to inspect hidden areas rather than judging their condition from an exterior photo.' },
      { title: 'Define the related checks', description: 'Identify cooling, electrical or sensor checks according to the affected area. Confirm parts, paintwork and any required, supported calibration for the exact vehicle.' },
      { title: 'Approve and verify the scope', description: 'Explain the proposed work, parts, labour and completion checks before approval. Review fitment and related functions according to the agreed repair.' },
    ],
    partsCopy: isArabic
      ? 'يحدد عرض العمل الألواح أو القطع المقترح إصلاحها أو استبدالها ومناطق الطلاء وأجرة العمل وأي فحوص للأنظمة المتأثرة. تُراجع مطابقة القطع والإجراءات لرقم الهيكل والتجهيزات والتوفر. تُشرح أي نتائج إضافية قبل توسيع العمل؛ ويتوقف الموعد والمدة على الفحص والنطاق والقطع.'
      : 'The estimate identifies proposed panel repair or replacement, refinishing areas, labour and checks for affected systems. Parts compatibility, procedures and availability are confirmed against the VIN and fitted equipment. Additional findings are explained before work is expanded; appointment and completion timing depend on assessment, scope and parts.',
    faqs: isArabic ? [
      { question: 'هل تكفي صور الضرر لتحديد سعر الإصلاح النهائي؟', answer: 'تساعد الصور على فهم المنطقة المتأثرة والتحضير للمعاينة، لكنها قد لا تظهر التثبيت أو الضرر خلف الألواح. قد يلزم فحص أو فك متفق عليه قبل تحديد كامل العمل والقطع والتكلفة.' },
      { question: 'هل يثبت تحذير الحساس بعد الصدمة أنه يحتاج إلى تبديل؟', answer: 'لا. قد تتأثر الأسلاك أو التوصيلات أو التثبيت أو الحساس نفسه. تُراجع بيانات الأعطال والفحص المناسب حسب السيارة قبل اختيار القطع، وتُؤكد المعايرة المطلوبة والوظائف المدعومة بصورة منفصلة.' },
      { question: 'هل تتطابق إجراءات الهيكل والطلاء بين فوج وسبورت وفيلار وإيفوك؟', answer: 'لا تحدد الشارة وحدها مواد الألواح أو القطع أو ترتيب الحساسات وإجراءات الإصلاح. نراجع رقم الهيكل والسنة والتجهيزات والعمل المطلوب؛ ولا تُعمم إجراءات طراز أو جيل على غيره.' },
      { question: 'هل يمكن قيادة السيارة إلى الورشة بعد الضرر؟', answer: 'إذا تغير التوجيه أو الفرامل، أو ظهر تسرب أو ارتفاع حرارة أو جزء غير مثبت، تجنب القيادة وتواصل لتأكيد ترتيب فحص آمن. أرسل الصور ووصف الأعراض؛ لا تُؤكد سلامة القيادة من صورة وحدها.' },
      { question: 'ما التفاصيل المطلوبة لحجز معاينة في القوز؟', answer: 'أرسل الطراز وسنة الصنع ومكان الضرر وصوراً واضحة وأي تحذير أو تغير في القيادة، أو اتصل على +971 4 340 2223. ديجي-تك في القوز الصناعية 3، دبي. يفتح الرابط مسودة واتساب؛ راجعها وأرسلها ليؤكد الفريق النطاق والموعد.' },
    ] : [
      { question: 'Can damage photographs establish a final body-repair price?', answer: 'Photos help explain the affected area and prepare for assessment, but may not show mounting damage or systems behind the panels. Inspection or agreed dismantling may be required before the full work, parts and estimate are defined.' },
      { question: 'Does a sensor warning after an impact mean the sensor needs replacement?', answer: 'No. Wiring, connectors, mounting or the sensor itself may be involved. Relevant fault information and physical checks guide the parts decision. Required calibration and supported functions are confirmed separately for the vehicle.' },
      { question: 'Are Vogue, Sport, Velar and Evoque body-repair procedures identical?', answer: 'The badge does not establish panel materials, parts, sensor layout or repair procedures. The VIN, model year, fitted equipment and requested work are reviewed; one model or generation is not used as the procedure for another.' },
      { question: 'Can I drive a damaged Range Rover to the workshop?', answer: 'If steering or braking changes, fluid is leaking, the vehicle overheats or parts are insecure, avoid driving and contact the team about a safe inspection arrangement. Share photographs and symptoms; driving safety cannot be confirmed from a photograph alone.' },
      { question: 'What should I send for a body-repair assessment in Al Quoz?', answer: 'Send the model, year, damaged area, clear photographs and any warning or change in how the vehicle drives, or call +971 4 340 2223. DIGITEC is in Al Quoz Industrial Area 3, Dubai. Review and send the WhatsApp draft so the team can confirm scope and appointment availability.' },
    ],
    whatsAppMessage: isArabic
      ? 'مرحباً ديجي-تك، أود الاستفسار عن إصلاح هيكل وطلاء رينج روفر.\n\nالطراز وسنة الصنع: \nمنطقة الضرر وما حدث: \nالتحذير أو تغير القيادة إن وجد: \nسأرفق صوراً واضحة للضرر في واتساب. يرجى تأكيد الفحص وترتيب إحضار السيارة بأمان عند الحاجة.'
      : 'Hello DIGITEC, I would like to enquire about Range Rover body repair.\n\nModel and year: \nDamaged area and what happened: \nWarning or driving change, if any: \nI will attach clear damage photographs in WhatsApp. Please confirm the assessment and a safe arrival arrangement if needed.',
  };
  return {
    combo,
    scopeHeading: isArabic ? 'فحص أضرار رينج روفر قبل اختيار الإصلاح' : 'Assess Range Rover body damage before choosing the repair',
    focusTitle: isArabic ? 'الضرر الظاهر وما خلف الألواح' : 'Visible damage and what lies behind it',
    focus: isArabic
      ? 'قد تؤثر الصدمة قرب الصدام أو المصباح في نقاط التثبيت أو مجاري الهواء أو التبريد أو الأسلاك أو الحساسات. يحدد موضع الضرر والأعراض ما يستحق الفحص؛ ولا يعني وجود خدش أو بعج أن كل هذه الأنظمة تضررت. يُوضح الوصول والفحوص المقترحة قبل الموافقة.'
      : 'An impact near a bumper or lamp may affect mounting, air guides, cooling parts, wiring or sensors. The damaged area and symptoms determine what needs inspection; a scuff or dent does not establish damage to all those systems. Proposed access and checks are explained before approval.',
    modelNote: isArabic
      ? 'تُراجع رينج روفر وسبورت وفوج وأوتوبيوغرافي وفيلار وإيفوك حسب السنة ورقم الهيكل والتجهيز. لا تُستنتج مواد الهيكل أو إجراءات الإصلاح أو المعايرة من اسم الطراز أو من صورة سيارة أخرى؛ يُؤكد النطاق المتاح لكل سيارة.'
      : 'Range Rover, Sport, Vogue, Autobiography, Velar and Evoque enquiries are reviewed by year, VIN and equipment. Panel construction, repair procedures and calibration requirements are not inferred from a badge or another vehicle photograph; available scope is confirmed for the individual vehicle.',
    links: [
      { path: '/brands/range-rover-service-dubai', label: isArabic ? 'صيانة رينج روفر وخدمات الإصلاح' : 'Range Rover service and repair' },
      { path: '/brands/range-rover-service-dubai/mechanical-repair', label: isArabic ? 'فحص محرك وتبريد رينج روفر بعد الأعراض' : 'Range Rover engine and cooling assessment' },
      { path: '/brands/range-rover-service-dubai/electrical-repair', label: isArabic ? 'فحص كهرباء رينج روفر والتحذيرات المرتبطة' : 'Range Rover electrical fault assessment' },
    ],
    image: {
      ...workshopImage,
      alt: isArabic ? 'رينج روفر داخل ورشة ديجي-تك في القوز، دبي' : 'Range Rover inside the DIGITEC workshop in Al Quoz, Dubai',
      caption: isArabic ? 'صورة رينج روفر من معرض الورشة الحالي. أرسل صور الضرر الخاص بسيارتك بصورة منفصلة للتحضير للمعاينة.' : 'Range Rover photograph from the existing workshop gallery. Share photographs of your own damage separately to prepare for assessment.',
    },
  };
}
