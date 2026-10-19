export type EcuElectronicsMode = 'software' | 'electrical' | 'infotainment';

export interface EcuElectronicsContent {
  mode: EcuElectronicsMode;
  heading: string;
  intro: string;
  questions: { question: string; answer: string }[];
  record: string;
  intakeQuote: string;
  links: { path: string; en: string; ar: string }[];
  whatsAppMessage: string;
}

interface EcuOwner {
  mode: EcuElectronicsMode;
  name: string;
  arabicName: string;
  hasArabic: boolean;
  links: EcuElectronicsContent['links'];
}

const diagnostics = { path: '/services/car-diagnostics-dubai', en: 'Diagnostics and supported module functions', ar: 'التشخيص والإجراءات المدعومة لوحدات التحكم' };
const electrical = { path: '/services/auto-electrical-repair-dubai', en: 'Electrical and communication fault assessment', ar: 'فحص الأعطال الكهربائية والاتصال بين الوحدات' };
const tuning = { path: '/tuning', en: 'Performance tuning enquiries', ar: 'استفسارات تعديل برمجة الأداء' };
const headUnit = { path: '/services/head-unit-repair-dubai', en: 'Head-unit and COMAND fault assessment', ar: 'فحص أعطال الوحدة الرئيسية وCOMAND' };
const cue = { path: '/services/cadillac-cue-screen-repair-dubai', en: 'Cadillac CUE touchscreen assessment', ar: 'فحص شاشة كاديلاك CUE' };

const owners: Record<string, EcuOwner> = {
  '/services/car-diagnostics-dubai': {
    mode: 'software', name: 'vehicle', arabicName: 'السيارة', hasArabic: true,
    links: [electrical, tuning],
  },
  '/services/mercedes-diagnostics-dubai': {
    mode: 'software', name: 'Mercedes', arabicName: 'مرسيدس', hasArabic: true,
    links: [
      { path: '/services/mercedes-electrical-repair-dubai', en: 'Mercedes electrical fault assessment', ar: 'فحص الأعطال الكهربائية لمرسيدس' },
      diagnostics,
      tuning,
    ],
  },
  '/brands/bmw-service-dubai/engine-diagnostics': {
    mode: 'software', name: 'BMW', arabicName: 'BMW', hasArabic: true,
    links: [
      { path: '/brands/bmw-service-dubai/electrical-repair', en: 'BMW electrical fault assessment', ar: 'فحص الأعطال الكهربائية لسيارات BMW' },
      diagnostics,
      tuning,
    ],
  },
  '/services/auto-electrical-repair-dubai': {
    mode: 'electrical', name: 'vehicle', arabicName: 'السيارة', hasArabic: true,
    links: [diagnostics, headUnit],
  },
  '/services/mercedes-electrical-repair-dubai': {
    mode: 'electrical', name: 'Mercedes', arabicName: 'مرسيدس', hasArabic: true,
    links: [
      { path: '/services/mercedes-diagnostics-dubai', en: 'Mercedes diagnostics and supported module functions', ar: 'تشخيص مرسيدس والإجراءات المدعومة للوحدات' },
      headUnit,
    ],
  },
  '/brands/bmw-service-dubai/electrical-repair': {
    mode: 'electrical', name: 'BMW', arabicName: 'BMW', hasArabic: true,
    links: [
      { path: '/brands/bmw-service-dubai/engine-diagnostics', en: 'BMW diagnostics and coding assessment', ar: 'تشخيص BMW ومراجعة إجراءات الترميز' },
      electrical,
    ],
  },
  '/services/cadillac-cue-screen-repair-dubai': {
    mode: 'infotainment', name: 'Cadillac CUE', arabicName: 'كاديلاك CUE', hasArabic: false,
    links: [headUnit, electrical],
  },
  '/services/head-unit-repair-dubai': {
    mode: 'infotainment', name: 'head-unit', arabicName: 'الوحدة الرئيسية', hasArabic: false,
    links: [cue, electrical],
  },
};

function questionsFor(mode: EcuElectronicsMode, isArabic: boolean): EcuElectronicsContent['questions'] {
  if (mode === 'software') return isArabic ? [
    { question: 'ما الفرق بين التشخيص والترميز والبرمجة؟', answer: 'يبحث التشخيص عن سبب العطل. يضبط الترميز إعدادات مدعومة لتجهيزات السيارة، بينما تكتب البرمجة برنامجاً متوافقاً للوحدة. التهيئة أو المعايرة إجراء منفصل عند الحاجة. ويختلف تعديل برمجة الأداء عن هذه المهام.' },
    { question: 'هل تحتاج وحدة التحكم البديلة إلى برمجة؟', answer: 'قد تحتاج بعض الوحدات إلى إعداد أو ترميز أو برمجة أو تحقق خاص. لا تنطبق الإجراءات نفسها على كل استبدال. اذكر الوحدة وما إذا كانت جديدة أو مستعملة، وناقش التوافق قبل شرائها.' },
    { question: 'هل قراءة الأعطال تثبت توفر إجراء البرمجة المطلوب؟', answer: 'لا. يُراجع الطراز والسنة والوحدة وإصدار البرنامج والتجهيزات وإمكانية الوصول قبل تأكيد الإجراء. قراءة بيانات التشخيص لا تثبت توفر كل وظيفة، وتحديث البرنامج ليس حلاً تلقائياً لكل عطل.' },
  ] : [
    { question: 'How do diagnostics, coding and programming differ?', answer: 'Diagnostics investigates a fault. Coding configures supported settings for the fitted equipment; programming writes compatible control-unit software. Adaptation or calibration is a separate setup procedure when required. Performance remapping serves a different task.' },
    { question: 'Does a replacement control unit need programming?', answer: 'Some replacements require setup, coding, programming or validation. The same procedures do not apply to every replacement. Identify the unit and whether it is new or used, and discuss compatibility before buying it.' },
    { question: 'Does scan access prove the requested programming is available?', answer: 'No. Model, year, module, software, equipment and permitted access are reviewed before a function is confirmed. Reading diagnostic data does not establish every function, and a software update is not an automatic fault repair.' },
  ];
  if (mode === 'electrical') return isArabic ? [
    { question: 'هل فقدان الاتصال بوحدة يعني تلفها؟', answer: 'ليس بالضرورة. قد يرتبط العطل بالتغذية أو التأريض أو الموصلات أو الأسلاك أو مسار الاتصال. تُجرى الفحوص المناسبة قبل اقتراح إصلاح الوحدة أو استبدالها.' },
    { question: 'هل إصلاح الكهرباء يشمل برمجة وحدة التحكم؟', answer: 'إصلاح الدائرة والعمل البرمجي مهمتان منفصلتان. يُؤكد أي إعداد أو ترميز أو برمجة مطلوبة بعد الإصلاح للطراز والوحدة والإجراء المحدد قبل إدراجها في عرض السعر.' },
    { question: 'ما المعلومات المفيدة بعد استبدال وحدة أو بطارية؟', answer: 'اذكر القطعة التي تغيرت وتوقيت ظهور المشكلة وأي تقرير متوفر. لا يحدد تزامن العطل مع الاستبدال السبب وحده، ولا يثبت رمز العطل الحاجة إلى وحدة جديدة.' },
  ] : [
    { question: 'Does lost communication mean the control unit has failed?', answer: 'Not necessarily. Supply, earth, connectors, wiring or the communication path may be involved. Relevant checks come before a control-unit repair or replacement recommendation.' },
    { question: 'Does an electrical repair include ECU programming?', answer: 'Circuit repair and software work are separate tasks. Any setup, coding or programming required afterwards is confirmed for the vehicle, module and exact function before it is included in the quote.' },
    { question: 'What helps after a module or battery replacement?', answer: 'Identify what changed, when the symptoms started and any available report. A fault beginning after replacement does not alone establish its cause, and a code does not prove that another control unit is needed.' },
  ];
  return [
    { question: 'Is a touchscreen fault the same as a head-unit fault?', answer: 'No. Touch response, picture, sound and controls can fail separately. The screen, fitted unit, supply, connectors or communication path may need different checks before a repair is selected.' },
    { question: 'Does a replacement screen or head unit always need programming?', answer: 'No single rule covers every component. Compatible parts and any required configuration or software work are reviewed for the installed system. Similar appearance or matching connectors do not establish suitability.' },
    { question: 'What should I share before buying a replacement?', answer: 'Send the make, model, year, a dashboard photo and the functions affected. Mention recent replacement, retrofit or electrical work. The fitted generation and supported repair or setup scope are confirmed before parts are agreed.' },
  ];
}

export function getEcuElectronicsContent(ownerKey: string, isArabic: boolean): EcuElectronicsContent | undefined {
  const owner = owners[ownerKey];
  if (!owner || (isArabic && !owner.hasArabic)) return undefined;
  const software = owner.mode === 'software';
  const infotainment = owner.mode === 'infotainment';
  const label = owner.name === 'vehicle' ? 'vehicle' : owner.name;
  const arabicVehicleSuffix = owner.name === 'vehicle' ? '' : ' ' + owner.arabicName;
  const heading = isArabic
    ? software ? 'فهم الإجراء المطلوب قبل برمجة وحدة التحكم' : 'فحص العطل قبل اختيار وحدة بديلة'
    : software ? 'Confirm the module function before programming' : infotainment ? 'Confirm the fitted system before replacement' : 'Investigate the fault before replacing a module';
  const intro = isArabic
    ? 'في ديجي-تك بالقوز، دبي، يبدأ النقاش بالأعراض والإجراء المطلوب. يُؤكد نطاق الفحص والإجراءات المدعومة للسيارة قبل قبول العمل؛ لا يحدد اسم الوحدة أو رمز العطل الإصلاح بمفرده.'
    : 'At DIGI-TEC in Al Quoz, Dubai, the enquiry starts with the symptoms and requested task. Assessment and supported functions are confirmed for the ' + label + ' before work is accepted; a module name or fault code alone does not select the repair.';
  const record = isArabic
    ? 'أرسل الصانع والطراز والسنة والأعراض ورسالة التحذير وتقريراً متعلقاً بالعطل إن توفر. اذكر أي وحدة استُبدلت مؤخراً ووقت الموعد المفضل. احذف البيانات الشخصية غير الضرورية من التقرير.'
    : 'Share make, model, year, symptoms, warning text and a relevant report if available. Mention any recently replaced module and preferred appointment time. Remove unnecessary personal details from reports.';
  const intakeQuote = isArabic
    ? 'يُؤكد الفحص الأولي وتكلفته أولاً، ثم تُوضح النتائج والاختبارات الإضافية والإجراء المدعوم والقطع وأجرة العمل والتحقق المطلوب قبل الموافقة.'
    : 'Confirm initial assessment scope and cost first. Findings, further tests, supported functions, parts, labour and required verification are explained before approval.';
  const enquiryStart = isArabic
    ? software
      ? 'مرحباً ديجي-تك، أود مناقشة التشخيص أو إجراء ترميز أو برمجة مدعوم لسيارتي' + arabicVehicleSuffix + '.'
      : infotainment
        ? 'مرحباً ديجي-تك، أود مناقشة عطل في الشاشة أو الصوت أو الوحدة الرئيسية بسيارتي.'
        : 'مرحباً ديجي-تك، أود مناقشة عطل كهربائي أو مشكلة اتصال بين وحدات سيارتي' + arabicVehicleSuffix + '.'
    : software
      ? 'Hi DIGI-TEC, I would like to discuss diagnostics or supported coding/programming for my ' + label + '.'
      : infotainment
        ? 'Hi DIGI-TEC, I would like to discuss a screen, sound or head-unit fault on my vehicle' + (ownerKey === cue.path ? ' with Cadillac CUE.' : '.')
        : 'Hi DIGI-TEC, I would like to discuss an electrical or module communication fault on my ' + label + '.';
  const whatsAppMessage = isArabic
    ? enquiryStart + '\nالصانع والطراز والسنة:\nالأعراض ووقت ظهورها:\nرسالة التحذير:\nهل يتوفر تقرير فحص متعلق بالعطل؟ (اختياري):\nهل استُبدلت وحدة تحكم مؤخراً؟ ما الوحدة وهل كانت جديدة أم مستعملة؟\nالإجراء المطلوب إن كان معروفاً:\nوقت الموعد المفضل:\nيرجى تأكيد دعم العمل المطلوب ونطاق الفحص الأولي وتكلفته.'
    : enquiryStart + '\nMake/model/year:\nSymptoms and when they occur:\nWarning message:\nRelevant diagnostic report available (optional):\nWas a control module recently replaced? Which unit, and was it new or used?\nRequested function, if known:\nPreferred appointment time:\nPlease confirm supported work and the initial assessment scope and cost.';
  const links = isArabic
    ? owner.links.filter(link => link.path !== headUnit.path && link.path !== cue.path)
    : owner.links;
  return { mode: owner.mode, heading, intro, questions: questionsFor(owner.mode, isArabic), record, intakeQuote, links, whatsAppMessage };
}
