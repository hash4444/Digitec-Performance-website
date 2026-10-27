import type { BrandServiceCombo } from './brandServices';

type Target = {
  mode: 'diagnostics' | 'ac';
  name: string;
  ar: string;
  context: string;
  arabicContext: string;
};

// These existing owners supplement the completed repair sprint; all other
// brand/service combinations keep their established content and routing.
const TARGETS: Record<string, Target> = {
  'bmw-service-dubai/engine-diagnostics': {
    mode: 'diagnostics', name: 'BMW', ar: 'بي إم دبليو',
    context: 'A BMW drivetrain message does not by itself confirm a gearbox failure. Note whether the concern follows engine speed, a gear change or road speed so the relevant system can be investigated.',
    arabicContext: 'تحذير مجموعة الدفع في بي إم دبليو لا يثبت وحده تلف ناقل الحركة. اذكر هل تتبع المشكلة سرعة المحرك أو نقلة معينة أو سرعة السيارة لتوجيه فحص النظام المعني.',
  },
  'porsche-service-dubai/engine-diagnostics': {
    mode: 'diagnostics', name: 'Porsche', ar: 'بورشه',
    context: 'Porsche systems differ by model, generation and powertrain. An engine warning, a PDK complaint and an electrical warning need different test paths; the supported investigation is confirmed for the fitted system.',
    arabicContext: 'تختلف أنظمة بورشه حسب الطراز والجيل ونظام الدفع. يحتاج تحذير المحرك ومشكلة PDK والتحذير الكهربائي إلى مسارات فحص مختلفة؛ يُؤكد الفحص المتاح للنظام المركب.',
  },
  'mercedes-benz-service-dubai/ac-repair': {
    mode: 'ac', name: 'Mercedes', ar: 'مرسيدس',
    context: 'On a Mercedes with separate cabin zones, say whether one vent, one side or the whole cabin is affected. Uneven temperature does not identify a failed compressor or a particular actuator without testing.',
    arabicContext: 'إذا كان تكييف مرسيدس مقسماً إلى مناطق، وضح هل المشكلة في فتحة واحدة أو جهة محددة أو المقصورة كلها. اختلاف الحرارة لا يحدد وحده تلف الضاغط أو مشغل معين دون فحص.',
  },
  'bmw-service-dubai/ac-repair': {
    mode: 'ac', name: 'BMW', ar: 'بي إم دبليو',
    context: 'For BMW cooling concerns, record whether the airflow stays strong while the air becomes warm, whether the concern changes at idle and whether different cabin zones behave differently. These observations help define the initial checks.',
    arabicContext: 'عند ضعف تكييف بي إم دبليو، اذكر هل يبقى تدفق الهواء قوياً بينما يصبح دافئاً، وهل تتغير المشكلة عند الوقوف أو تختلف بين مناطق المقصورة. تساعد هذه الملاحظات في تحديد الفحوص الأولية.',
  },
  'volkswagen-service-dubai/ac-repair': {
    mode: 'ac', name: 'Volkswagen', ar: 'فولكس فاجن',
    context: 'Volkswagen climate equipment varies by model and trim. Describe the fitted controls, airflow and any warning rather than assuming the same compressor, refrigerant or control procedure applies to every Golf, Tiguan or Touareg.',
    arabicContext: 'تختلف تجهيزات تكييف فولكس فاجن حسب الطراز والفئة. صف أدوات التحكم وتدفق الهواء وأي تحذير؛ لا تُعمم مواصفة الضاغط أو وسيط التبريد أو إجراءات التحكم على كل Golf أو Tiguan أو Touareg.',
  },
  'range-rover-service-dubai/ac-repair': {
    mode: 'ac', name: 'Range Rover', ar: 'رينج روفر',
    context: 'For a Range Rover with rear climate controls, identify whether the concern affects the front, rear or both. Cabin layout, access and the fitted system determine the available investigation and any proposed repair.',
    arabicContext: 'إذا كانت رينج روفر مجهزة بتحكم خلفي في التكييف، حدد هل المشكلة أمامية أم خلفية أم في الجهتين. تحدد المقصورة وإمكانية الوصول والنظام المركب نطاق الفحص وأي إصلاح مقترح.',
  },
};

function diagnosticsCopy(target: Target, isArabic: boolean): Partial<BrandServiceCombo> {
  const { name, ar } = target;
  return isArabic ? {
    serviceName: 'تشخيص الأعطال',
    serviceType: 'تشخيص أعطال السيارة',
    h1: `تشخيص أعطال ${ar} في دبي`,
    metaTitle: `تشخيص أعطال ${ar} في دبي | ديجي-تك`,
    metaDescription: `فحص تحذيرات وأعطال ${ar} في القوز، دبي. تُراجع بيانات التشخيص المتاحة مع الاختبارات المناسبة قبل اقتراح الإصلاح. اطلب تقييم الحالة.`,
    heroCopy: `يبدأ فحص ${ar} لدى ديجي-تك في القوز، دبي بوصف التحذير وسلوك السيارة وظروف ظهور المشكلة. تُراجع رموز الأعطال والبيانات المتاحة مع الفحص الفعلي والاختبارات الكهربائية أو الميكانيكية المناسبة. رمز العطل يصف حالة رصدها النظام ولا يثبت وحده تلف قطعة. ${target.arabicContext} يُؤكد الوصول إلى الوحدات والوظائف المطلوبة للسيارة قبل الحجز؛ لا تُفترض إمكانية إصلاح كل وحدة أو نظام جهد عالٍ.`,
    symptoms: [
      'ضوء فحص المحرك أو تحذير متكرر مع تسجيل النص كما يظهر',
      'اهتزاز أو تقطيع أو تردد أو تغير في قوة السيارة',
      'عدم دوران المحرك عند التشغيل أو دورانه دون أن يعمل',
      'عطل متقطع يتغير مع الحرارة أو الحمل أو بعد الوقوف',
      'عدة تحذيرات أو تغير في الوظائف بعد تغيير البطارية أو عمل حديث',
    ],
    processSteps: [
      { title: 'توثيق السيارة والأعراض', description: 'مراجعة الطراز والسنة والمسافة والتجهيزات والتحذير وظروف ظهوره وسجل الأعمال الأخيرة.' },
      { title: 'تأكيد البيانات المتاحة', description: 'تحديد نطاق المسح والوحدات والبيانات الحية المتاحة للسيارة؛ لا يعني توفر قراءة الأعطال توفر البرمجة.' },
      { title: 'اختبار السبب المحتمل', description: 'مقارنة البيانات بالفحص والاختبارات المناسبة للتغذية أو الدائرة أو النظام الميكانيكي. تُناقش أي اختبارات إضافية قبل توسيع النطاق.' },
      { title: 'شرح النتيجة وعرض العمل', description: 'توضيح ما ثبت وما يحتاج إلى فحص إضافي. يُفصل عرض الإصلاح عن الفحص الأولي وتُؤكد القطع والإجراءات المدعومة وفحوص التحقق قبل الموافقة.' },
    ],
    partsCopy: 'لا تُختار قطعة من اسم رمز العطل وحده. تُراجع النتائج وتوافق القطعة والإجراءات والتوفر قبل عرض الإصلاح. يُؤكد دعم أي ترميز أو برمجة أو معايرة بصورة مستقلة حسب السيارة والوحدة والصلاحيات المتاحة. الفحص لا يُعد وعداً بإصلاح كل وحدة تحكم أو نظام هجين أو عالي الجهد.',
    faqs: [
      { question: 'هل رمز العطل يحدد القطعة التي يجب استبدالها؟', answer: 'لا. يصف الرمز حالة رصدها النظام، وقد تتعلق بتغذية أو أسلاك أو حساس أو مشكلة ميكانيكية. تساعد البيانات والفحوص المناسبة في تحديد السبب قبل اقتراح القطع.' },
      { question: `ما التفاصيل المطلوبة لفحص ${ar}؟`, answer: 'أرسل الطراز والسنة والمسافة ونص التحذير والأعراض ووقت ظهورها وأي صيانة أو إصلاح حديث. اذكر هل يدور المحرك عند محاولة التشغيل. أرفق تقرير فحص سابق إن توفر؛ يُؤكد نطاق الفحص الأولي والموعد بعد مراجعة الطلب.' },
      { question: 'هل مسح التحذير يعني إصلاح السبب؟', answer: 'لا. قد يعود التحذير إذا بقي السبب. يُناقش مسح الرموز حيث يكون مدعوماً ومناسباً ضمن نطاق الفحص أو الإصلاح، ولا يُقدّم بديلاً عن تحديد العطل.' },
      { question: 'هل يتضمن الفحص البرمجة أو إصلاح الجهد العالي؟', answer: 'هذه أعمال منفصلة تحتاج إلى تأكيد القدرة والتوافق والصلاحيات. لا يُفترض توفرها لمجرد إمكانية قراءة أعطال السيارة.' },
      { question: 'كيف تُحدد التكلفة والخطوة التالية؟', answer: 'يُؤكد نطاق الفحص الأولي وتكلفته قبل البدء. قد يحتاج العطل المتقطع إلى اختبارات على مراحل. تُشرح النتائج والعمل الإضافي وعرض الإصلاح قبل الموافقة، ويُؤكد الموعد بصورة منفصلة.' },
    ],
  } : {
    h1: `${name} Diagnostics in Dubai`,
    metaTitle: `${name} Diagnostics Dubai | Fault Assessment | DIGI-TEC`,
    metaDescription: `${name} diagnostics in Al Quoz, Dubai for warning lights, rough running and starting faults. Supported scan data and physical tests guide the next step.`,
    heroCopy: `A ${name} warning light, running fault or starting problem begins with the exact symptom and when it occurs. At DIGI-TEC in Al Quoz, Dubai, available fault and live data are considered alongside physical inspection and relevant electrical or mechanical tests. A fault code describes a detected condition; it does not by itself prove that a part has failed. ${target.context} Module access and requested functions are confirmed for the vehicle before booking. Access to diagnostic data does not establish repair coverage for every module or high-voltage system.`,
    symptoms: [
      'Check-engine light or a recurring warning: record the exact message',
      'Rough idle, misfire, hesitation or a change in power',
      'No crank, or the engine cranks but does not start',
      'An intermittent fault that changes with heat, load or time parked',
      'Several warnings or changed functions after battery or repair work',
    ],
    processSteps: [
      { title: 'Record the vehicle and concern', description: 'Review the model, year, mileage, fitted system, warning, operating conditions and recent work.' },
      { title: 'Confirm supported data access', description: 'Identify the available modules, fault information and live values. The ability to read a code does not establish programming access.' },
      { title: 'Test the possible cause', description: 'Compare the data with appropriate supply, circuit, component or mechanical checks. Agree further investigation before expanding the initial scope.' },
      { title: 'Explain findings and proposed work', description: 'Separate what is established from what needs more testing. Quote repairs, compatible parts, supported procedures and suitable completion checks for approval.' },
    ],
    partsCopy: 'A code name alone does not select the replacement part. Findings, compatible parts, procedures and availability are reviewed before a repair is proposed. Coding, programming, calibration and security access are separate functions confirmed for the exact vehicle and control unit. Diagnostic assessment does not promise repair of every ECU, hybrid or high-voltage system.',
    faqs: [
      { question: 'Does a fault code identify the part that needs replacing?', answer: 'No. A code describes a condition detected by the vehicle. Supply, wiring, sensor or mechanical causes may need investigation. Relevant data and physical tests help establish the cause before parts are proposed.' },
      { question: `What should I send for a ${name} diagnostic appointment?`, answer: 'Send the model, year, mileage, exact warning, symptoms, when the fault occurs and any recent servicing or repairs. Say whether the engine cranks when you try to start it. An existing scan report can help; the workshop confirms the initial assessment and appointment after reviewing the request.' },
      { question: 'Does clearing a warning repair the fault?', answer: 'No. A warning may return if the cause remains. Code clearing is considered only where supported and appropriate to the agreed assessment or repair; it does not replace fault investigation.' },
      { question: 'Does diagnosis include programming or high-voltage repair?', answer: 'Those are separate tasks requiring confirmation of workshop capability, vehicle compatibility and available access. They are not assumed from the ability to read fault data.' },
      { question: 'How are the diagnostic cost and next step agreed?', answer: 'Confirm the initial investigation scope and cost before work starts. Intermittent faults may need staged testing. Findings, further tests and any repair estimate are explained for approval; opening an enquiry does not confirm an appointment.' },
    ],
  };
}

function acCopy(target: Target, isArabic: boolean): Partial<BrandServiceCombo> {
  const { name, ar } = target;
  return isArabic ? {
    serviceName: 'فحص وإصلاح التكييف', serviceType: 'فحص وإصلاح تكييف السيارة',
    h1: `فحص وإصلاح تكييف ${ar} في دبي`,
    metaTitle: `إصلاح تكييف ${ar} في دبي | ديجي-تك`,
    metaDescription: `فحص تكييف ${ar} في القوز، دبي للهواء الدافئ وضعف التدفق أو عودة ضعف التبريد. يُؤكد نطاق الاختبارات والإصلاح للسيارة قبل العمل.`,
    heroCopy: `قد يتشابه ضعف التبريد في ${ar} مع أعطال مختلفة. يراجع ديجي-تك في القوز، دبي أداء التبريد وتدفق الهواء وظروف المشكلة قبل اقتراح شحن وسيط التبريد أو اختيار القطع. ${target.arabicContext} تُؤكد بيانات السيارة ووسيط التبريد وتوافق المعدات وإمكانية الوصول ونطاق الإصلاح قبل قبول العمل؛ لا تُعمم خدمة واحدة على جميع الطرازات.`,
    symptoms: [
      'خروج هواء دافئ مع استمرار تدفق الهواء من الفتحات',
      'ضعف تدفق الهواء أو تغيره رغم رفع سرعة المروحة',
      'تغير التبريد بين الوقوف والقيادة أو بين مناطق المقصورة',
      'عودة ضعف التبريد بعد شحن أو إصلاح سابق',
      'ضجيج أو رائحة غير معتادة أو رطوبة أو ماء داخل المقصورة',
      'عدم استجابة أحد أدوات التحكم أو ظهور تحذير متعلق بالنظام',
    ],
    processSteps: [
      { title: 'تحديد السيارة وظروف المشكلة', description: 'تسجيل الطراز والسنة والمناطق المتأثرة ووقت حدوث المشكلة وأي عمل سابق على التكييف أو وسيط التبريد.' },
      { title: 'اختبار النظام المناسب', description: 'اختيار فحوص الحرارة والتدفق والضغط والتسريب أو الكهرباء والتحكم حسب النظام والأعراض. تُؤكد المعدات المتوافقة قبل أي خدمة لوسيط التبريد.' },
      { title: 'مراجعة النتائج ونطاق الإصلاح', description: 'توضيح ما ثبت وأي فحص إضافي مطلوب. تُراجع القطع وإمكانية الوصول والإجراءات والتكلفة قبل الموافقة؛ لا يُقرر تغيير ضاغط أو تعبئة الغاز من الأعراض وحدها.' },
      { title: 'التحقق من العمل المعتمد', description: 'إعادة فحص أداء التبريد والتدفق وتشغيل النظام في الظروف المناسبة بعد العمل المتفق عليه. تُدرج أي إعادة ضبط فقط إذا كانت مطلوبة ومدعومة.' },
    ],
    partsCopy: 'قد تتطلب المشكلة تقييم تسريب أو تحكم الضاغط أو المكثف وتدفق الهواء أو المبخر أو الخراطيم والأنابيب أو المروحة والفلاتر. هذه أنظمة محتملة للفحص وليست تشخيصاً أو وعداً باستبدال جميع الأجزاء. تحدد النتائج الخدمة المقترحة؛ يُؤكد وسيط التبريد والمعدات وتوافق القطع وإمكانية الوصول ونطاق العمل في العرض.',
    faqs: [
      { question: 'هل تعبئة غاز التكييف تعالج الهواء الدافئ دائماً؟', answer: 'لا. قد يتعلق ضعف التبريد بالتسريب أو تدفق الهواء أو الضاغط أو التحكم والكهرباء. تعبئة وسيط التبريد لا تصلح التسريب، لذلك تُختار الفحوص والخدمة بحسب النتائج.' },
      { question: 'هل ضعف التبريد يعني تلف الضاغط؟', answer: 'لا يثبت ذلك من العرض وحده. تُراجع الضغوط والتحكم والتدفق وحالة النظام حسب السيارة قبل اقتراح أعمال الضاغط أو استبدال أي قطعة.' },
      { question: 'كيف تُفحص مشاكل المكثف أو المبخر أو الخراطيم؟', answer: 'قد يدخل الضرر أو التسريب في هذه المناطق ضمن الفحص المناسب للأعراض. طريقة الاختبار وإمكانية الوصول والقطع وأهلية الإصلاح تُؤكد للسيارة بعد تحديد النطاق. لا يُفترض استبدال جزء معين مسبقاً.' },
      { question: 'هل الرائحة أو الماء داخل المقصورة يحددان السبب؟', answer: 'لا. تساعد الرائحة أو الرطوبة أو موضع الماء في وصف المشكلة، لكن قد تحتاج إلى فحص تدفق الهواء والتصريف وحالة المنطقة المعنية. لا تُعد هذه الأعراض وحدها تشخيصاً للمبخر أو التصريف.' },
      { question: 'ما المعلومات المطلوبة لعرض فحص التكييف؟', answer: 'أرسل الطراز والسنة والمسافة وصف الهواء الدافئ أو ضعف التدفق، وهل تتغير المشكلة عند الوقوف أو القيادة، والمناطق المتأثرة. اذكر أي إصلاح أو شحن سابق. تُؤكد تكلفة الفحص الأولي ونطاقه والموعد قبل العمل.' },
    ],
  } : {
    h1: `${name} AC Repair in Dubai`,
    metaTitle: `${name} AC Repair Dubai | Cooling Assessment | DIGI-TEC`,
    metaDescription: `${name} AC repair assessment in Al Quoz, Dubai for warm air, weak airflow or recurring cooling loss. Tests and supported scope confirmed before work.`,
    heroCopy: `Weak cooling in a ${name} can have several causes. DIGI-TEC in Al Quoz, Dubai reviews cooling performance, airflow and the conditions in which the concern occurs before proposing refrigerant service or parts. ${target.context} Vehicle details, refrigerant, equipment compatibility, access and the accepted repair scope are confirmed before work; one service procedure is not assumed across the brand.`,
    symptoms: [
      'Warm air while airflow from the vents remains strong',
      'Weak or changing airflow despite a higher fan setting',
      'Cooling changes at idle, while driving or between cabin zones',
      'Cooling fades again after previous refrigerant service or repair',
      'Unusual noise, odour, dampness or water inside the cabin',
      'A climate control does not respond or a relevant warning appears',
    ],
    processSteps: [
      { title: 'Identify the vehicle and conditions', description: 'Record the model, year, affected zones, operating conditions and previous AC repairs or refrigerant work.' },
      { title: 'Test the fitted system', description: 'Select appropriate temperature, airflow, pressure, leak, electrical or control checks from the symptom and fitted system. Confirm compatible equipment before refrigerant work.' },
      { title: 'Explain findings and repair scope', description: 'Identify what is established and whether further tests are needed. Confirm parts, access, procedures and cost for approval; symptoms alone do not justify a compressor or recharge.' },
      { title: 'Verify the agreed work', description: 'Recheck cooling performance, airflow and relevant system operation under suitable conditions after the approved work. Include a reset only where required and supported.' },
    ],
    partsCopy: 'A concern may involve a leak, compressor control, condenser condition or airflow, the evaporator, hoses or pipes, a blower or cabin filter. These are possible areas to investigate, not a diagnosis or a promise to replace every component. Findings determine the proposed service; refrigerant, equipment, parts compatibility, access and repair availability are confirmed in the estimate.',
    faqs: [
      { question: 'Will an AC gas refill always fix warm air?', answer: 'No. Weak cooling can involve a leak, airflow, compressor, control or electrical concern. Adding refrigerant does not repair a leak. Tests and the service recommendation follow the findings.' },
      { question: 'Does poor cooling mean the compressor has failed?', answer: 'Not by itself. Relevant pressure, control, airflow and system-condition checks may be needed before compressor work or replacement parts are proposed.' },
      { question: 'Can a condenser, evaporator or hose concern be assessed?', answer: 'Damage or a suspected leak in these areas may form part of the investigation appropriate to the symptoms. Test methods, access, parts and accepted repair scope are confirmed for the vehicle. A particular replacement is not assumed in advance.' },
      { question: 'Does a smell or water in the cabin establish the cause?', answer: 'No. Odour, dampness and the location of water help describe the concern, but airflow, drainage and the affected area may need inspection. These symptoms alone do not diagnose an evaporator or drain fault.' },
      { question: 'What should I send for an AC assessment quote?', answer: 'Send the model, year, mileage, warm-air or airflow symptoms, whether the concern changes at idle or while driving and which zones are affected. Mention previous AC repairs or refrigerant work. Confirm the initial assessment scope, cost and appointment before work begins.' },
    ],
  };
}

export function getDiagnosticsAcBrandContent(
  brandSlug: string | undefined,
  serviceSlug: string | undefined,
  isArabic: boolean,
): Partial<BrandServiceCombo> | undefined {
  if (!brandSlug || !serviceSlug) return undefined;
  const target = TARGETS[`${brandSlug}/${serviceSlug}`];
  if (!target) return undefined;
  const isAc = target.mode === 'ac';
  return {
    ...(isAc ? acCopy(target, isArabic) : diagnosticsCopy(target, isArabic)),
    whatsAppMessage: isArabic
      ? `مرحباً ديجي-تك، أود طلب ${isAc ? 'فحص التكييف' : 'تشخيص الأعطال'} لسيارة ${target.ar}.\n\nالطراز: \nسنة الصنع: \nالمسافة: \n${isAc ? 'التبريد وتدفق الهواء والمناطق المتأثرة' : 'التحذير والأعراض وهل يدور المحرك عند التشغيل'}: \nمتى تظهر المشكلة: \n${isAc ? 'إصلاحات التكييف أو شحن وسيط التبريد السابق' : 'الصيانة أو الإصلاحات الأخيرة'}: \nالموعد المفضل: `
      : `Hi DIGI-TEC, I would like a ${target.name} ${isAc ? 'AC assessment' : 'diagnostic assessment'}.\n\nModel: \nYear: \nMileage: \n${isAc ? 'Cooling, airflow and affected zones' : 'Warning, symptoms and whether the engine cranks'}: \nWhen it occurs: \n${isAc ? 'Previous AC repairs or refrigerant work' : 'Recent servicing or repairs'}: \nPreferred appointment: `,
  };
}
