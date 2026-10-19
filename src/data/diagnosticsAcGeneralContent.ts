import type { ServiceData } from './services';

export type DiagnosticAcMode = 'diagnostics' | 'ac';
export type DiagnosticAcLink = { path: string; en: string; ar: string };

export function getGeneralDiagnosticAcMode(slug: string | undefined): DiagnosticAcMode | undefined {
  return slug === 'car-diagnostics-dubai' ? 'diagnostics' : slug === 'car-ac-repair-dubai' ? 'ac' : undefined;
}

/** Refine existing owners only; diagnostic access and repair scope remain vehicle-specific. */
export function refineDiagnosticAcGeneral(service: ServiceData, isArabic: boolean): ServiceData {
  const mode = getGeneralDiagnosticAcMode(service.slug);
  if (!mode) return service;
  if (mode === 'diagnostics') return {
    ...service,
    metaTitle: isArabic ? 'فحص كمبيوتر وتشخيص أعطال السيارات في دبي | ديجي-تك' : 'Car Diagnostics Dubai | Warning-Light Checks | DIGI-TEC',
    metaDescription: isArabic ? 'تشخيص أعطال السيارة في القوز، دبي للتحذيرات والتقطيع وصعوبة التشغيل. نراجع البيانات والفحص الفعلي قبل اقتراح الإصلاح. اطلب تقييماً لسيارتك.' : 'Car diagnostics in Al Quoz, Dubai for warning lights, misfires and starting faults. Compatible scan data and physical tests guide the next step. Request assessment.',
    title: isArabic ? 'فحص كمبيوتر وتشخيص أعطال السيارات في دبي' : 'Car Diagnostics & Warning-Light Assessment in Dubai',
    seoKeyword: isArabic ? 'تشخيص أعطال السيارات في دبي' : 'Car Diagnostics Dubai',
    description: isArabic ? 'فحص التحذيرات والأعراض بالبيانات المتاحة والاختبارات المناسبة قبل اختيار الإصلاح.' : 'Investigate warning lights, rough running and starting problems before choosing a repair.',
    intro: isArabic ? 'يبدأ تشخيص السيارة لدى ديجي-تك في القوز بتحديد السيارة والشكوى: هل تظهر لمبة المحرك أو يحدث تقطيع أو يصعب التشغيل؟ نسجل ظروف ظهور المشكلة والأعمال الحديثة، ثم نؤكد الوصول التشخيصي المتاح للسيارة والوحدات المعنية. تُستخدم البيانات المتوافقة والفحوص الفعلية لتحديد السبب قبل اقتراح القطع.' : 'Car diagnostics at DIGI-TEC in Al Quoz starts with the vehicle and the reported problem: a check-engine light, misfire, no-start or intermittent warning. We record when it happens and any recent work, then confirm diagnostic access for the fitted systems. Compatible scan information and appropriate physical tests guide the investigation before parts are proposed.',
    whyImportant: isArabic ? 'رمز العطل يصف حالة اكتشفها النظام ولا يثبت وحده تلف حساس أو وحدة. قد تتعلق الأعراض بالتغذية أو الأسلاك أو التسرب أو بحالة ميكانيكية. تُختار مراجعة البيانات والاختبارات بناءً على السيارة والنتائج، ويُوضح ما تأكد وما يحتاج إلى فحص إضافي.' : 'A fault code describes a detected condition; it does not prove that a sensor or module has failed. Power supply, wiring, leaks or a mechanical condition can produce related symptoms. Available live values and suitable physical checks help separate confirmed findings from issues that need further investigation.',
    whyChoose: isArabic ? 'نوضح نطاق الفحص الأولي وتكلفته قبل العمل. إذا احتاج تحديد السبب إلى وقت أو اختبارات إضافية، تُناقش أولاً. يختلف تقرير التشخيص عن عرض الإصلاح؛ يحدد العرض العمل والقطع والتحقق المناسب وفق النتائج والموافقة.' : 'Confirm the initial assessment scope and cost before work starts. If diagnosis needs further testing or access, discuss that first. A diagnostic report and a repair estimate are separate steps; the estimate identifies supported work, parts and relevant completion checks after the findings are reviewed.',
    includes: isArabic ? ['مراجعة التحذير والأعراض وسجل الصيانة والأعمال الحديثة', 'قراءة رموز الأعطال والبيانات الحية المتاحة حيث يدعم النظام ذلك', 'فحص فعلي واختبارات مرتبطة بالدائرة أو العطل المبلغ عنه', 'توضيح النتائج وحدود الفحص وخطوة الإصلاح التالية'] : ['Review warning text, symptoms, history and recent repairs', 'Read supported fault information and available live data', 'Select physical or circuit tests for the reported concern', 'Explain findings, diagnostic limits and the next repair decision'],
    extraSections: isArabic ? [
      { heading: 'لمبة المحرك أو التقطيع أو صعوبة التشغيل', text: 'أرسل نص التحذير وهل تعمل السيارة بصورة طبيعية. اذكر هل يظهر التقطيع عند التشغيل البارد أو السلانسيه أو التسارع، وهل تدور بادئة التشغيل عند تعذر التشغيل. تساعد التفاصيل في اختيار الفحص ولا تثبت وحدها سبب العطل.' },
      { heading: 'ماذا يوضح فحص الكمبيوتر؟', text: 'توضح الرموز والبيانات المتاحة أين يتركز البحث. قد يتطلب تحديد السبب فحص التغذية والأرضي والأسلاك أو اختباراً ميكانيكياً مناسباً. مسح الكود لا يعالج السبب ولا يُعد بديلاً عن التشخيص.' },
      { heading: 'توافق الفحص والبرمجة', text: 'تختلف إمكانات الوصول والوظائف حسب الطراز والسنة والوحدة والصلاحيات. يُؤكد توفر أي ترميز أو برمجة أو إعادة ضبط مطلوبة بصورة منفصلة. فحص التحذير لا يعني دعم إصلاح كل وحدة أو نظام هجين أو عالي الجهد.' },
    ] : [
      { heading: 'Check-engine light, misfire or no-start?', text: 'Send the exact warning and whether the car starts and runs normally. For rough running, note cold start, idle or acceleration. For a no-start, say whether the starter turns the engine. These details help select tests; they do not establish a failed component.' },
      { heading: 'What does a car computer diagnostic test show?', text: 'Codes and available data narrow the investigation. Supply, ground, wiring or suitable mechanical checks may still be needed to establish the cause. Clearing a code does not repair the underlying fault.' },
      { heading: 'Vehicle-specific access and module functions', text: 'Coverage depends on model, year, module, software and access. Confirm any requested coding, programming or reset separately. A warning-light assessment does not imply repair coverage for every ECU, hybrid or high-voltage system.' },
    ],
    faqs: isArabic ? [
      { question: 'هل رمز العطل يحدد القطعة الواجب تغييرها؟', answer: 'ليس بمفرده. يصف الكود حالة رصدها النظام؛ تُراجع البيانات والفحوص المناسبة لتحديد السبب قبل اقتراح قطعة.' },
      { question: 'هل يمكن فحص سيارة لا تعمل؟', answer: 'أرسل بيانات السيارة وهل تدور بادئة التشغيل ونص التحذير. يؤكد الفريق الفحص المدعوم وترتيب الزيارة؛ لا تُفترض خدمة فحص متنقلة أو سحب ضمن الطلب.' },
      { question: 'هل مسح لمبة المحرك يصلح العطل؟', answer: 'مسح الكود لا يصلح السبب. يناقش الفريق الفحص والنتائج والإصلاح المدعوم والتحقق المناسب قبل إغلاق العمل.' },
      { question: 'هل يشمل الفحص برمجة جميع الوحدات؟', answer: 'لا. يُؤكد توافق أي وظيفة برمجة أو ترميز والصلاحيات اللازمة بصورة منفصلة للسيارة والوحدة المعنية.' },
      { question: 'ما المعلومات المطلوبة لحجز فحص؟', answer: 'أرسل الصانع والطراز والسنة والمسافة والتحذير وظروف ظهوره والأعمال الحديثة. يحدد الفريق نطاق الفحص الأولي والتكلفة والتوفر قبل تأكيد الموعد.' },
    ] : [
      { question: 'Does a fault code tell you which part to replace?', answer: 'Not by itself. A code records a detected condition. Relevant data and appropriate tests are needed to establish the cause before recommending a part.' },
      { question: 'Can I request diagnosis for a car that will not start?', answer: 'Send the vehicle details, whether the starter turns the engine and the warning text. The team confirms supported investigation and visit arrangements; a mobile diagnosis or recovery service is not assumed.' },
      { question: 'Does clearing the check-engine light repair the fault?', answer: 'Clearing a code does not fix its cause. Discuss the investigation, findings, supported repair and relevant verification before closing the job.' },
      { question: 'Does a diagnostic appointment include every ECU programming function?', answer: 'No. Any coding, programming or reset requires separate confirmation of vehicle, module, function and access. Scan access alone does not establish programming compatibility.' },
      { question: 'What should I send before booking diagnostics?', answer: 'Send make, model, year, mileage, warning text, when the concern happens and recent repairs. The team confirms initial scope, cost and availability before an appointment is agreed.' },
    ],
    localIntent: isArabic ? 'اطلب فحصاً لدى ديجي-تك في القوز الصناعية 3، دبي. تُؤكد تغطية الفحص والتوفر قبل الزيارة؛ لا يشكل فتح مسودة واتساب حجزاً مؤكداً.' : 'Request diagnostic assessment at DIGI-TEC in Al Quoz Industrial Area 3, Dubai. Coverage and availability are confirmed before visiting; opening a WhatsApp draft does not book an appointment.',
    ctaLabel: isArabic ? 'اطلب تشخيص العطل عبر واتساب' : 'Request diagnostic assessment',
  };
  return {
    ...service,
    metaTitle: isArabic ? 'إصلاح تكييف السيارات في دبي | فحص التبريد والتسرب | ديجي-تك' : 'Car AC Repair Dubai | Cooling & Leak Diagnosis | DIGI-TEC',
    metaDescription: isArabic ? 'فحص وإصلاح تكييف السيارة في القوز، دبي لضعف التبريد والهواء الدافئ والتسرب. نحدد السبب والخدمة المتوافقة قبل اقتراح الغاز أو القطع. اطلب فحصاً.' : 'Car AC repair in Al Quoz, Dubai for warm air, weak cooling and leaks. Vehicle-specific checks before refrigerant service or parts are proposed. Request assessment.',
    title: isArabic ? 'فحص وإصلاح تكييف السيارات في دبي' : 'Car AC Repair & Cooling Diagnosis in Dubai',
    seoKeyword: isArabic ? 'إصلاح تكييف السيارات في دبي' : 'Car AC Repair Dubai',
    description: isArabic ? 'تقييم الهواء الدافئ وضعف التبريد والتسرب قبل تحديد خدمة التكييف المناسبة.' : 'Assess warm air, weak cooling and refrigerant loss before choosing AC service or repair.',
    intro: isArabic ? 'يعتمد تبريد المقصورة على وسيط التبريد وتدفق الهواء والضاغط والمبادلات الحرارية والتحكم. قد تظهر الأعراض نفسها لأسباب مختلفة. يراجع ديجي-تك السيارة وظروف ضعف التبريد في القوز، دبي، ويحدد الاختبارات والخدمة المدعومة قبل اقتراح تعبئة الغاز أو استبدال جزء.' : 'Cabin cooling depends on refrigerant, airflow, the compressor, heat exchangers and controls. Similar symptoms can have different causes. DIGI-TEC reviews the vehicle and when cooling changes at its Al Quoz workshop, then confirms suitable checks and supported service before proposing a recharge or replacement part.',
    whyImportant: isArabic ? 'الهواء الدافئ لا يثبت نقص الغاز، وضعف الهواء لا يثبت عطل الضاغط. قد تتعلق المشكلة بتسرب أو فلتر أو مروحة أو تحكم أو حالة جزء آخر. يُحدد وسيط التبريد من بيانات السيارة وتُراجع نتائج الفحص قبل اختيار الإصلاح.' : 'Warm air does not prove low refrigerant, and weak airflow does not establish compressor failure. A leak, filter, fan, control fault or another condition may be involved. Identify the refrigerant from vehicle information and review the test findings before choosing repair work.',
    whyChoose: isArabic ? 'نبدأ بوصف الأعراض وسجل أعمال التكييف ثم نحدد فحوص الأداء والتسرب والضغط والهواء والكهرباء المناسبة. يوضح عرض العمل ما تأكد والقطع أو الخدمة المدعومة والتكلفة والتحقق بعد العمل. تتوقف المدة على النتائج والتوفر والنطاق المتفق عليه.' : 'Start with symptoms and previous AC work, then select appropriate performance, leak, pressure, airflow or electrical checks. The proposal distinguishes confirmed findings from further investigation and identifies supported service, parts, cost and completion checks. Timing depends on findings, availability and agreed scope.',
    servicesIntro: { heading: isArabic ? 'من الشكوى إلى عرض إصلاح التكييف' : 'From cooling complaint to an AC repair quote', text: isArabic ? 'اذكر هل يتغير التبريد عند الوقوف أو القيادة أو بعد وقت من التشغيل وهل تختلف الفتحات أو المناطق. نؤكد نطاق الفحص أولاً، ونراجع النتائج قبل اقتراح الغاز أو القطع أو الحاجة إلى وصول إضافي.' : 'Describe whether cooling changes at idle, on the road or after running for a while, and whether vents or cabin zones differ. Confirm the initial inspection first; review findings before refrigerant, parts or further access are proposed.' },
    includes: isArabic ? ['مراجعة أداء التبريد وتدفق الهواء حسب الشكوى', 'تحديد وسيط التبريد ومتطلبات السيارة قبل الخدمة', 'فحص التسرب والضغط وحالة الأجزاء حيث يلزم', 'مراجعة الضاغط والمكثف والمبخر والخراطيم وفق النتائج', 'فحوص التحكم والكهرباء والهواء المدعومة حسب التجهيزات'] : ['Review cooling performance and cabin airflow against the complaint', 'Identify refrigerant and vehicle requirements before service', 'Select relevant leak, pressure and component-condition checks', 'Assess compressor, condenser, evaporator or hose concerns from findings', 'Confirm supported airflow, electrical and control-system investigation'],
    extraSections: isArabic ? [
      { heading: 'هواء دافئ أو تبريد ضعيف أو متقطع', text: 'سجل ظروف المشكلة واختلاف تدفق الهواء أو درجة التبريد بين الفتحات. يساعد فحص الأداء والتحكم والحالة الفعلية في فصل مشكلة التبريد عن مشكلة وصول الهواء إلى المقصورة.' },
      { heading: 'هل تعبئة غاز التكييف هي الحل؟', text: 'ليست التعبئة علاجاً لكل عطل. إذا تراجع التبريد بعد تعبئة سابقة، اذكر متى تمت والخدمة التي أُجريت. يُراجع التسرب وحالة النظام قبل اقتراح شحن متوافق؛ لا يُفترض نوع واحد من الغاز لكل السيارات.' },
      { heading: 'الضاغط والمكثف والمبخر والخراطيم', text: 'تُراجع حالة الضاغط والتحكم والضغط قبل تحديد الحاجة إلى إصلاحه أو استبداله. يحتاج الاشتباه بتسرب في المكثف أو المبخر أو خرطوم أو أنبوب إلى تأكيد موقعه. يُوضح أي فك أو وصول إضافي ونطاق العمل المدعوم قبل الموافقة.' },
      { heading: 'تدفق الهواء والروائح وأعطال التحكم', text: 'قد يرتبط ضعف الهواء بالفلتر أو المروحة أو مسار الهواء أو التحكم. الرائحة أو الماء في أرضية المقصورة لا يحددان وحدهما سبباً واحداً. تُفحص الشكوى قبل اقتراح تنظيف أو إصلاح جزء.' },
    ] : [
      { heading: 'Warm air, weak cooling or an intermittent AC fault', text: 'Record when the concern appears and whether airflow or temperature differs between vents. Performance, control and condition checks help distinguish poor cooling from a problem delivering air into the cabin.' },
      { heading: 'Is a car AC gas refill the right repair?', text: 'A refill is not a remedy for every AC fault. If cooling declined after an earlier recharge, say when it was done and what work was recorded. Check for leakage and system condition before proposing compatible charging; one refrigerant is not assumed for every vehicle.' },
      { heading: 'Compressor, condenser, evaporator and hose concerns', text: 'Assess compressor condition alongside controls and pressure before recommending repair or replacement. A suspected condenser, evaporator, hose or pipe leak needs its location confirmed. Explain further access or dismantling and supported repair scope before approval.' },
      { heading: 'Cabin airflow, smells and electrical controls', text: 'Weak airflow may involve the filter, blower, air path or controls. A smell or water in the footwell does not establish one cause. Inspect the complaint before proposing cleaning or a component repair.' },
    ],
    faqs: isArabic ? [
      { question: 'لماذا يخرج هواء دافئ من تكييف السيارة؟', answer: 'قد تختلف الأسباب بين وسيط التبريد أو التسرب أو الضاغط أو التحكم أو تدفق الهواء. يلزم فحص السيارة قبل تحديد الإصلاح؛ لا تثبت الأعراض وحدها حاجة الضاغط إلى التغيير.' },
      { question: 'هل يحتاج التكييف دائماً إلى تعبئة غاز؟', answer: 'لا. قد يكون ضعف التبريد مرتبطاً بعطل آخر. يُحدد وسيط التبريد وتُراجع حالة النظام والتسرب المحتمل قبل اقتراح الشحن.' },
      { question: 'هل يمكن تحديد تسرب في خرطوم أو مبخر قبل تغيير القطعة؟', answer: 'تُختار فحوص التسرب المناسبة للسيارة وتُراجع النتائج. قد يحتاج تأكيد بعض المواقع إلى وصول أو فك إضافي يُناقش قبل اعتماده؛ لا يُقترح الجزء من الأعراض وحدها.' },
      { question: 'هل تشمل الخدمة كل أنواع غاز التبريد والضواغط الكهربائية؟', answer: 'لا يُفترض توافق شامل. تُراجع بيانات السيارة ووسيط التبريد والإجراء المدعوم أولاً؛ لا تعني معاينة التكييف توفر إصلاح أنظمة الجهد العالي.' },
      { question: 'ماذا أرسل لطلب عرض فحص تكييف؟', answer: 'أرسل الصانع والطراز والسنة ووصف التبريد وظروف المشكلة وأي أعمال سابقة أو تعبئة غاز. يؤكد الفريق الفحص والتكلفة والتوفر قبل الموعد، ثم يُناقش الإصلاح وفق النتائج.' },
    ] : [
      { question: 'Why is my car AC blowing warm air?', answer: 'Possible causes include refrigerant loss, a leak, compressor operation, controls or airflow. The vehicle needs inspection before a repair is chosen; the symptom alone does not establish a failed compressor.' },
      { question: 'Does weak car AC always need a gas refill?', answer: 'No. Another fault may be responsible. Identify the refrigerant and assess system condition and possible leakage before recommending charging.' },
      { question: 'Can a hose or evaporator leak be checked before replacing parts?', answer: 'Select leak checks appropriate to the vehicle and review the findings. Some locations may need further access or dismantling, discussed before approval. Symptoms alone do not establish which part needs replacement.' },
      { question: 'Do you service every refrigerant and electric compressor?', answer: 'Universal compatibility is not assumed. Vehicle information, refrigerant and supported procedure are confirmed first. An AC assessment does not imply high-voltage repair coverage.' },
      { question: 'What should I send for an AC inspection quote?', answer: 'Send make, model, year, cooling symptoms, when they occur and previous repairs or refrigerant work. The team confirms initial scope, cost and availability; repair is discussed after findings.' },
    ],
    localIntent: isArabic ? 'ناقش فحص تكييف السيارة مع ديجي-تك في القوز الصناعية 3، دبي. تُؤكد تغطية الخدمة والتوفر قبل الزيارة؛ لا يُؤكد الموعد بفتح مسودة واتساب.' : 'Discuss car AC assessment with DIGI-TEC in Al Quoz Industrial Area 3, Dubai. Service coverage and availability are confirmed before visiting; opening a WhatsApp draft does not confirm an appointment.',
    ctaLabel: isArabic ? 'اطلب فحص التكييف عبر واتساب' : 'Request AC assessment',
  };
}

export function diagnosticAcMessage(mode: DiagnosticAcMode, isArabic: boolean, brandName?: string): string {
  const vehicle = brandName ? `${brandName} ` : '';
  const arabicVehicle = brandName ? `سيارة ${brandName}` : 'سيارتي';
  return isArabic
    ? `مرحباً ديجي-تك، أريد طلب ${mode === 'ac' ? 'فحص تكييف' : 'تشخيص أعطال'} ل${arabicVehicle}. الصانع والطراز والسنة: المسافة المقطوعة: ${mode === 'ac' ? 'أعراض التبريد وتدفق الهواء: ظروف المشكلة: أعمال التكييف أو تعبئة الغاز السابقة:' : 'التحذيرات والأعراض: متى تظهر المشكلة: الإصلاحات أو الصيانة الحديثة:'} الموعد المفضل:`
    : `Hi DIGI-TEC, I would like a ${vehicle}${mode === 'ac' ? 'AC assessment' : 'diagnostic assessment'}. Make/model/year: Mileage: ${mode === 'ac' ? 'Cooling and airflow symptoms: When it happens: Previous AC repairs or refrigerant work:' : 'Warning lights and symptoms: When it happens: Recent repairs or servicing:'} Preferred appointment:`;
}

export function diagnosticAcLinks(mode: DiagnosticAcMode, brandSlug?: string): DiagnosticAcLink[] {
  if (brandSlug) return mode === 'ac' ? [
    { path: brandSlug === 'mercedes-benz-service-dubai' ? '/services/mercedes-diagnostics-dubai' : `/brands/${brandSlug}/engine-diagnostics`, en: 'Warning-light and control-system diagnosis', ar: 'تشخيص التحذيرات وأنظمة التحكم' },
    { path: '/services/car-ac-repair-dubai', en: 'Cooling symptoms and the AC inspection process', ar: 'أعراض التبريد وخطوات فحص التكييف' },
  ] : [
    { path: `/brands/${brandSlug}/mechanical-repair`, en: 'When findings point to a mechanical repair', ar: 'عندما تحدد النتائج إصلاحاً ميكانيكياً' },
    { path: '/services/auto-electrical-repair-dubai', en: 'Electrical circuit and wiring assessment', ar: 'فحص الدوائر الكهربائية والأسلاك' },
  ];
  return mode === 'ac' ? [
    { path: '/services/mercedes-ac-repair-dubai', en: 'Mercedes AC assessment', ar: 'فحص تكييف مرسيدس' },
    { path: '/brands/bmw-service-dubai/ac-repair', en: 'BMW AC assessment', ar: 'فحص تكييف بي إم دبليو' },
    { path: '/brands/volkswagen-service-dubai/ac-repair', en: 'Volkswagen AC assessment', ar: 'فحص تكييف فولكس واجن' },
    { path: '/brands/range-rover-service-dubai/ac-repair', en: 'Range Rover AC assessment', ar: 'فحص تكييف رينج روفر' },
  ] : [
    { path: '/services/mercedes-diagnostics-dubai', en: 'Mercedes warning-light assessment', ar: 'فحص تحذيرات مرسيدس' },
    { path: '/brands/bmw-service-dubai/engine-diagnostics', en: 'BMW diagnostic assessment', ar: 'تشخيص أعطال بي إم دبليو' },
    { path: '/brands/porsche-service-dubai/engine-diagnostics', en: 'Porsche diagnostic assessment', ar: 'تشخيص أعطال بورشه' },
  ];
}
