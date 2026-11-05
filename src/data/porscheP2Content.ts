import type { BrandServiceCombo, ServiceKey } from './brandServices';
import { porscheEnquiryMessage } from './porscheEnquiry';

export type PorscheServiceDetail = { heading: string; text: string; links: { label: string; path: string }[] };
const hub = '/brands/porsche-service-dubai';
const link = (label: string, path: string) => ({ label, path });

// Business confirmation, 4 November 2026: PIWIS 3 is currently in use;
// supported functions are confirmed for each vehicle. This does not establish
// Porsche authorization, unrestricted programming or high-voltage capability.
const english: Partial<Record<ServiceKey, Partial<BrandServiceCombo>>> = {
  'transmission-repair': {
    h1: 'Porsche Transmission & PDK Repair in Dubai',
    metaTitle: 'Porsche Transmission Repair Dubai | PDK & Tiptronic',
    metaDescription: 'Porsche PDK, Tiptronic and manual gearbox service and repair in Al Quoz. Fitted-unit checks separate scheduled fluid work from fault diagnosis.',
    symptoms: ['Jerking or a harsh shift, especially when cold or hot', 'Delayed drive or reverse engagement, slipping or loss of drive', 'A gearbox warning, visible leak or unusual noise', 'Scheduled transmission maintenance due or incomplete fluid-service history'],
    processSteps: [
      { title: 'Identify the gearbox and history', description: 'Confirm the model, year, fitted PDK, Tiptronic or manual unit, mileage and previous fluid or repair work. Record the gear, temperature and conditions of a reported fault.' },
      { title: 'Separate maintenance from diagnosis', description: 'Check the applicable schedule for due fluid, filter or seal work. For a warning or shift concern, review supported PIWIS 3 information alongside leaks, mounts, engine operation and driveline condition.' },
      { title: 'Explain the proposed work', description: 'Itemise the initial investigation, any scheduled service and a findings-led repair separately. Fluid circuits, specification, level procedure and supported functions depend on the fitted unit.' },
      { title: 'Verify the agreed repair or service', description: 'Confirm the applicable leak, level and operating checks. A road test or supported service function is included only where appropriate to the vehicle and approved work.' },
    ],
    partsCopy: 'A PDK symptom does not by itself justify a gearbox replacement. The estimate identifies the fitted unit, proposed fluids and parts, labour and any further testing. Internal work, control repair and programming require their own scope and capability confirmation.',
  },
  'battery-replacement': {
    h1: 'Porsche 12V Battery Replacement in Dubai',
    metaTitle: 'Porsche 12V Battery Replacement Dubai | DIGI-TEC',
    metaDescription: 'Porsche 12V battery testing and replacement in Al Quoz. Charging, battery specification and supported registration are checked for the exact vehicle.',
    processSteps: [
      { title: 'Record the starting or discharge concern', description: 'Confirm the Porsche model, year, battery age if known, warning and parking pattern. Distinguish no crank from an engine that cranks but will not start.' },
      { title: 'Test the low-voltage supply', description: 'Assess the battery, connections and charging path as relevant. Repeated discharge may need a separate current-draw investigation rather than another battery.' },
      { title: 'Confirm specification and fitting scope', description: 'Check the required chemistry, capacity, dimensions, connections and vehicle procedure before selecting a replacement. Registration or initialization is confirmed where required and supported.' },
      { title: 'Fit and verify the approved battery', description: 'Complete the agreed low-voltage work and relevant post-fitting checks. Explain any remaining charging, wiring or intermittent drain concern separately.' },
    ],
    partsCopy: 'The quote separates testing, the specified 12V battery, fitting and any supported registration. This service does not include high-voltage traction-battery repair. A Taycan 12V request and a high-voltage battery concern require different scope decisions.',
  },
  'engine-diagnostics': {
    h1: 'Porsche Diagnostics in Dubai',
    metaTitle: 'Porsche Diagnostics Dubai | PIWIS 3 | DIGI-TEC',
    metaDescription: 'Porsche warning-light and engine diagnostics in Al Quoz. Supported PIWIS 3 data and physical tests guide findings and the proposed next step.',
    heroCopy: 'DIGI-TEC uses PIWIS 3 for Porsche fault investigation in Al Quoz, Dubai, with available functions confirmed for each vehicle. Start with the exact warning, running or starting symptom, model year and recent work. Engine, PDK, chassis and electrical concerns need different test paths: supported fault and live data are combined with relevant physical checks. A code alone does not identify a failed part. Coding, programming, security access and high-voltage work require separate confirmation.',
    processSteps: [
      { title: 'Record the warning and conditions', description: 'Review the model, year, mileage, exact message, whether the engine cranks, when the fault occurs and recent servicing. An existing scan can help plan the first assessment.' },
      { title: 'Confirm PIWIS 3 coverage', description: 'Confirm the supported modules, fault information and live values for the exact vehicle. Reading fault data does not establish access to every adaptation, programming or security function.' },
      { title: 'Test the suspected cause', description: 'Use relevant supply, wiring, component or mechanical tests alongside the data. Intermittent faults may need staged investigation; agree further testing before expanding the initial scope.' },
      { title: 'Explain findings and the next step', description: 'Separate confirmed findings from unresolved possibilities. Quote any repair, parts and separately supported procedures for approval, with completion checks appropriate to the agreed work.' },
    ],
    faqs: [
      { question: 'Does PIWIS 3 identify the failed part automatically?', answer: 'No. It provides supported diagnostic information. Supply, wiring, sensor or mechanical causes may still need testing before a failed part can be identified.' },
      { question: 'Can DIGI-TEC perform every Porsche coding or programming function?', answer: 'No blanket access is claimed. Supported functions depend on the model, year, control unit and available access. Ask the team to confirm the exact request before booking.' },
      { question: 'What should I send for a diagnostic appointment?', answer: 'Send the Porsche model, year, mileage, exact warning, symptoms, when they occur and recent servicing or repairs. Say whether the engine cranks. The workshop confirms the first assessment, any diagnostic charge and appointment availability.' },
      { question: 'Does diagnosis include high-voltage repair?', answer: 'No. High-voltage work and programming are separate scope and capability decisions, not assumed from the ability to read fault information.' },
      { question: 'How are diagnostic charges and further tests agreed?', answer: 'Confirm the initial investigation and charge before work begins. Intermittent faults may require further testing; findings, additional scope and any repair estimate are explained for approval.' },
    ],
  },
  'suspension-repair': {
    h1: 'Porsche Suspension Repair in Dubai',
    metaTitle: 'Porsche Suspension Repair Dubai | PASM & Air Suspension',
    metaDescription: 'Porsche suspension assessment in Al Quoz for noise, uneven height and PASM warnings. Fitted equipment and physical findings guide the repair scope.',
    processSteps: [
      { title: 'Identify the fitted suspension', description: 'Confirm the model, year, spring and damper arrangement and any PASM, air suspension or PDCC equipment. These systems are not interchangeable.' },
      { title: 'Inspect the symptom and height', description: 'Review joints, bushes, dampers, tyres and the reported corner or noise. For height loss, assess the relevant air circuit and leak behaviour before proposing an air spring or compressor.' },
      { title: 'Combine tests with supported data', description: 'Assess relevant power supply, wiring, sensors and PIWIS 3 information where supported. A chassis warning alone does not identify a failed damper.' },
      { title: 'Quote repair and required checks', description: 'Explain the findings, parts and repair options. Geometry, ride-height or steering calibration and verification are confirmed for the actual repair and fitted equipment.' },
    ],
  },
  'brake-repair': {
    processSteps: [
      { title: 'Identify the fitted brake package', description: 'Confirm the model, year and installed steel, surface-coated PSCB or ceramic-composite PCCB system before choosing inspection criteria or parts.' },
      { title: 'Inspect and measure the concern', description: 'Review the exact warning, pedal feel, pads, discs, sensors, fluid and relevant hydraulic or parking-brake functions. Vibration can also require hub, tyre or suspension checks.' },
      { title: 'Explain measurements and parts', description: 'Base the proposed scope on measured condition and the vehicle procedure. PCCB handling and supported work are confirmed separately; a warning does not automatically mean new pads.' },
      { title: 'Complete agreed work and verification', description: 'Confirm the applicable fluid, installation and functional checks for the approved repair. Parts, labour and any further investigation are explained before approval.' },
    ],
  },
  'ac-repair': {
    symptoms: ['Warm air or cooling that changes between idle and driving', 'Weak airflow, different temperatures across zones or blower noise', 'An unusual smell, visible moisture or water in the cabin that needs investigation', 'A recurring climate warning or refrigerant loss after previous work'],
  },
};

const arabic: Partial<Record<ServiceKey, Partial<BrandServiceCombo>>> = {
  'transmission-repair': {
    h1: 'إصلاح ناقل حركة بورشه وPDK في دبي', metaTitle: 'إصلاح ناقل حركة بورشه دبي | PDK وTiptronic',
    metaDescription: 'فحص وصيانة ناقل بورشه في القوز. يُحدد ناقل PDK أو Tiptronic أو اليدوي، وتُفصل صيانة السوائل المستحقة عن تشخيص الأعطال والإصلاح.',
    heroCopy: 'تختلف نواقل PDK وTiptronic والناقل اليدوي في التشغيل والسوائل والإجراءات. يبدأ الطلب بتحديد الناقل وسنة السيارة والمسافة وسجل الخدمة. تحتاج الرجة أو الانزلاق أو تأخر التعشيق أو التحذير إلى فحص مستقل؛ لا يثبت العَرَض وحده الحاجة إلى استبدال الناقل، ولا يُعرض تغيير الزيت بوصفه علاجاً مضموناً للعطل.',
    processSteps: [
      { title: 'تحديد الناقل والسجل', description: 'تأكيد الطراز والسنة والناقل المركب والصيانة السابقة، وتسجيل النقلة والحرارة وظروف ظهور العَرَض.' },
      { title: 'فصل الصيانة عن تشخيص العطل', description: 'مراجعة جدول السيارة للأعمال المستحقة، وفحص التسرب والمحرك والقواعد ونظام الدفع مع بيانات PIWIS 3 المتاحة عند وجود مشكلة.' },
      { title: 'توضيح الاختبارات والعمل المقترح', description: 'تُفصل تكلفة الفحص وخدمة السوائل وأي إصلاح مقترح. تُحدد مواصفة السوائل والدوائر والإجراءات حسب الناقل.' },
      { title: 'التحقق بعد العمل المعتمد', description: 'تُؤكد فحوص المستوى والتسرب والتشغيل وأي اختبار طريق أو وظيفة خدمة مناسبة للسيارة والعمل المتفق عليه.' },
    ],
  },
  'battery-replacement': {
    h1: 'فحص وتغيير بطارية بورشه 12 فولت في دبي', metaTitle: 'تغيير بطارية بورشه 12 فولت دبي | ديجي-تك',
    metaDescription: 'فحص وتغيير بطارية بورشه 12 فولت في القوز. تُراجع البطارية والشحن والمواصفة وإمكانية التسجيل حسب السيارة قبل اقتراح الاستبدال.',
    heroCopy: 'قد يرتبط تحذير البطارية أو تعذر التشغيل ببطارية 12 فولت أو الشحن أو التوصيلات أو استهلاك التيار أثناء الوقوف. تُفحص التغذية منخفضة الجهد قبل اقتراح الاستبدال، وتُؤكد كيمياء البطارية وسعتها وإجراءات التركيب والتسجيل المتاحة للسيارة. لا تشمل هذه الخدمة إصلاح بطارية الجر عالية الجهد.',
    faqs: [
      { question: 'هل يعني التحذير ضرورة تغيير البطارية؟', answer: 'ليس بالضرورة. قد يكون السبب في الشحن أو التوصيلات أو التفريغ أثناء الوقوف. يحدد الفحص الحاجة إلى البطارية أو اختبارات إضافية.' },
      { question: 'هل تحتاج البطارية إلى تسجيل؟', answer: 'يعتمد الإجراء والوظيفة المتاحة على الطراز ونظام إدارة البطارية، ويُؤكد ذلك قبل التركيب.' },
      { question: 'هل تشمل الخدمة بطارية تايكان عالية الجهد؟', answer: 'لا. يقتصر هذا المسار على بطارية 12 فولت والفحوص ذات الصلة؛ تُؤكد أعمال الجهد العالي بصورة منفصلة.' },
    ],
  },
  'engine-diagnostics': {
    h1: 'تشخيص أعطال بورشه في دبي', metaTitle: 'تشخيص بورشه دبي | PIWIS 3 | ديجي-تك',
    metaDescription: 'تشخيص تحذيرات وأعطال بورشه في القوز باستخدام بيانات PIWIS 3 المتاحة والفحوص الفعلية. تُؤكد الوظائف حسب السيارة قبل الحجز.',
    heroCopy: 'يستخدم ديجي-تك PIWIS 3 لفحص أعطال بورشه مع تأكيد الوظائف المتاحة لكل سيارة. أرسل الطراز والسنة والمسافة ونص التحذير والأعراض والإصلاحات الأخيرة. تختلف اختبارات المحرك وPDK والشاسيه والكهرباء؛ تُراجع البيانات مع الفحوص المناسبة، ولا يثبت رمز العطل وحده تلف قطعة. تُؤكد البرمجة والصلاحيات وأعمال الجهد العالي بصورة منفصلة.',
  },
  'suspension-repair': {
    h1: 'فحص وإصلاح تعليق بورشه في دبي', metaTitle: 'إصلاح تعليق بورشه دبي | PASM والتعليق الهوائي',
    metaDescription: 'فحص تعليق بورشه في القوز للأصوات وتغير الارتفاع وتحذيرات PASM. يحدد التجهيز المركب والقياسات نطاق الإصلاح المقترح.',
    heroCopy: 'تُحدد النوابض والمخمدات وتجهيزات PASM والتعليق الهوائي وPDCC المركبة قبل الفحص. يجمع التقييم بين حالة الوصلات والإطارات والارتفاع والتسرب والبيانات المتاحة. لا يثبت تحذير PASM تلف المخمد، ولا يعني انخفاض زاوية بعد الوقوف ضرورة استبدال الضاغط دون عزل السبب.',
  },
  'brake-repair': {
    h1: 'فحص وإصلاح فرامل بورشه في دبي', metaTitle: 'إصلاح فرامل بورشه دبي | فحص النظام المركب',
    metaDescription: 'فحص فرامل بورشه في القوز. تُحدد فرامل الحديد أو PSCB أو PCCB، وتُراجع القياسات والتحذيرات قبل اقتراح القطع والإصلاح.',
    heroCopy: 'يبدأ فحص فرامل بورشه بتحديد النظام المركب من الحديد أو PSCB أو PCCB. تُراجع حالة الفحمات والأقراص والحساسات والسائل والدواسة والوظائف المتاحة. يحتاج الاهتزاز إلى تقييم أسبابه المحتملة؛ لا يثبت وحده تلف القرص، وتُؤكد إجراءات التعامل مع PCCB ونطاق العمل قبل القبول.',
  },
};

const details: Partial<Record<ServiceKey, [PorscheServiceDetail, PorscheServiceDetail]>> = {
  'transmission-repair': [
    { heading: 'Scheduled gearbox service or a new shifting fault?', text: 'A due fluid service follows the identified gearbox schedule and history. Jerking, slipping or a warning needs its own investigation. Ask for the service, diagnostic stage and any proposed repair to be distinguished in the estimate.', links: [link('PDK operation and warning signs', '/porsche/systems/pdk'), link('Tiptronic operation', '/porsche/systems/tiptronic'), link('PDK jerking: what to record', '/porsche/problems/pdk-jerking')] },
    { heading: 'صيانة الناقل المستحقة أم عطل جديد؟', text: 'تتبع خدمة السوائل جدول الناقل المحدد وسجله. تحتاج الرجة أو الانزلاق أو التحذير إلى تشخيص مستقل. اطلب فصل الصيانة والفحص والإصلاح المقترح في عرض السعر.', links: [link('دليل ناقل بورشه 911', '/blog/porsche-911-service-dubai-guide'), link('بورشه باناميرا', '/blog/porsche-panamera-service-dubai-guide')] },
  ],
  'battery-replacement': [
    { heading: 'Replacement battery or an unresolved charging fault?', text: 'Repeated discharge can persist after fitting a battery if charging, connections or an unwanted current draw remain unresolved. Share how long the car is parked and whether recent electrical work preceded the concern. A 12V battery enquiry does not establish high-voltage repair scope.', links: [link('Electrical and charging diagnosis', `${hub}/electrical-repair`), link('Battery warning guidance', '/porsche/problems/battery-warning'), link('Taycan 12V concerns', '/porsche/problems/taycan-12v-battery')] },
    { heading: 'بطارية بديلة أم مشكلة شحن لم تُحل؟', text: 'قد يتكرر التفريغ إذا بقي عطل الشحن أو التوصيلات أو استهلاك التيار. اذكر مدة الوقوف وأي أعمال كهربائية سابقة. تتوقف المواصفة وإجراءات التركيب والفحص بعده على السيارة؛ لا يشمل الطلب تلقائياً أعمال الجهد العالي.', links: [link('فحص كهرباء بورشه والشحن', `${hub}/electrical-repair`), link('تشخيص أعطال بورشه', `${hub}/engine-diagnostics`)] },
  ],
  'engine-diagnostics': [
    { heading: 'PIWIS 3 coverage and the agreed diagnostic scope', text: 'PIWIS 3 is currently in use at DIGI-TEC. Supported modules and functions are checked for your model, year and concern. A scan, fault investigation, adaptation and programming are different tasks. Confirm the first diagnostic stage and charge; any further testing or repair needs its own explanation and approval.', links: [link('Electrical faults and module communication', `${hub}/electrical-repair`), link('Engine and mechanical investigation', `${hub}/mechanical-repair`), link('PDK and transmission assessment', `${hub}/transmission-repair`)] },
    { heading: 'نطاق PIWIS 3 والفحص المتفق عليه', text: 'يُستخدم PIWIS 3 حالياً لدى ديجي-تك، وتُؤكد الوحدات والوظائف حسب الطراز والسنة والمشكلة. قراءة الأعطال والتحقيق في السبب والتكييف والبرمجة مهام مختلفة. اتفق على مرحلة الفحص الأولى وتكلفتها، ثم راجع أي اختبارات أو إصلاحات إضافية قبل الموافقة.', links: [link('كهرباء بورشه والوحدات', `${hub}/electrical-repair`), link('فحص المحرك والأعطال الميكانيكية', `${hub}/mechanical-repair`), link('فحص ناقل الحركة', `${hub}/transmission-repair`)] },
  ],
  'suspension-repair': [
    { heading: 'PASM, air suspension and PDCC are different systems', text: 'PASM controls damping; air suspension controls springing and ride height where fitted; PDCC addresses body roll. They can coexist, but a warning or low corner does not identify a failed component. Fitted equipment, physical condition and suitable data determine the test path.', links: [link('PASM explained', '/porsche/systems/pasm'), link('Air suspension explained', '/porsche/systems/air-suspension'), link('Suspension dropping overnight', '/porsche/problems/suspension-dropping-overnight'), link('Cayenne chassis guidance', '/blog/porsche-cayenne-service-dubai-guide')] },
    { heading: 'التمييز بين PASM والتعليق الهوائي وPDCC', text: 'يتحكم PASM في التخميد، ويرتبط التعليق الهوائي بالنوابض والارتفاع عند وجوده، ويحد PDCC من ميلان الهيكل. قد تجتمع الأنظمة، لكن التحذير لا يحدد القطعة التالفة. تُؤكد اختبارات التسرب والحساسات والهندسة والمعايرة حسب التجهيز والإصلاح.', links: [link('تعليق بورشه كايين', '/blog/porsche-cayenne-service-dubai-guide'), link('أنظمة باناميرا', '/blog/porsche-panamera-service-dubai-guide')] },
  ],
  'brake-repair': [
    { heading: 'Brake measurements before a parts decision', text: 'Identify the fitted brake type and ask which measurements or findings justify the proposed work. Pads, discs, sensors, fluid, parking-brake functions and vibration sources are separate checks. A steel-disc procedure must not be assumed for ceramic-composite components.', links: [link('PCCB inspection differences', '/porsche/systems/pccb'), link('Brake warning guidance', '/porsche/problems/brake-warning-light'), link('911 brake and model guidance', '/blog/porsche-911-service-dubai-guide')] },
    { heading: 'قياسات الفرامل قبل اختيار القطع', text: 'اطلب تحديد نوع الفرامل والقياسات أو النتائج التي تبرر الإصلاح. تُفصل فحوص الفحمات والأقراص والحساسات والسائل وفرامل الوقوف وأسباب الاهتزاز. لا تُطبق إجراءات الأقراص الحديدية تلقائياً على المكونات السيراميكية.', links: [link('فرامل بورشه 911 حسب التجهيز', '/blog/porsche-911-service-dubai-guide'), link('فرامل كايين', '/blog/porsche-cayenne-service-dubai-guide')] },
  ],
};

export const getPorscheServiceDetail = (service: ServiceKey, isArabic: boolean) => details[service]?.[isArabic ? 1 : 0];

// Deliberately last in page composition: generic diagnostic overrides must not
// replace this Porsche-specific owner. Other brands return the original object.
export function refinePorscheP2Service(combo: BrandServiceCombo | undefined, isArabic: boolean) {
  if (!combo || combo.brandSlug !== 'porsche-service-dubai') return combo;
  return { ...combo, ...(isArabic ? arabic : english)[combo.serviceSlug], whatsAppMessage: porscheEnquiryMessage(isArabic ? `${combo.serviceName} لسيارة بورشه` : `Porsche ${combo.serviceName.toLowerCase()}`, isArabic, combo.serviceSlug) };
}

export function porscheModelChipPath(model: string, isArabic: boolean): string | undefined {
  if (/^911\b/.test(model)) return '/blog/porsche-911-service-dubai-guide';
  if (model === 'Cayenne') return '/blog/porsche-cayenne-service-dubai-guide';
  if (model === 'Panamera') return '/blog/porsche-panamera-service-dubai-guide';
  if (isArabic) return undefined; // Do not invent untranslated model URLs.
  if (model === 'Macan') return '/porsche/macan';
  if (model === 'Taycan') return '/porsche/taycan';
  // "Cayman" alone can refer to pre-718 cars; don't send it to a 718 owner.
  if (/^718\b/.test(model)) return '/porsche/718';
  return undefined;
}
