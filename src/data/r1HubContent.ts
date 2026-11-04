/** R1: existing Range Rover / Defender hub content only; no route creation. */
import type { Brand } from '@/data/brands';
export type R1HubKind = 'range-rover' | 'defender';
type Item = { title: string; text: string; link?: { path: string; label: string }; enquiryModel?: string };
type ServiceItem = Item & { slug: string };
export interface R1HubContent {
  kind: R1HubKind;
  name: string;
  title: string;
  description: string;
  h1: string;
  eyebrow: string;
  intro: string;
  modelsTitle: string;
  modelsIntro: string;
  models: Item[];
  servicesTitle: string;
  servicesIntro: string;
  services: ServiceItem[];
  feature: Item;
  process: Item[];
  faqs: { q: string; a: string }[];
  message: string;
  workshopCaption: string;
  guides: { title: string; path: string }[];
}

const rangeRoverEn: R1HubContent = {
  kind: 'range-rover', name: 'Range Rover',
  title: 'Range Rover Service & Repair Dubai | DIGITEC',
  description: 'Range Rover service and repair in Al Quoz, Dubai. Independent maintenance, air suspension, gearbox, engine and electrical diagnostics. Enquire with DIGITEC.',
  h1: 'Range Rover Service & Repair in Dubai',
  eyebrow: 'Independent Range Rover specialist · Al Quoz',
  intro: 'Care for the way your Range Rover drives, rides and feels. DIGITEC Performance Center in Al Quoz Industrial Area 3 assesses maintenance, warning messages and repair concerns for Range Rover, Sport, Vogue, Autobiography, Velar and Evoque owners. We identify the vehicle and explain the findings before you approve the work.',
  modelsTitle: 'Individual models. Individual service plans.',
  modelsIntro: 'The badge alone does not define the engine, gearbox or suspension. Share the model, year, VIN and service history so the fitted systems and available workshop scope can be confirmed.',
  models: [
    { title: 'Range Rover · Vogue · Autobiography', text: 'Vogue and Autobiography enquiries are matched to the exact generation and specification. Ride-height concerns, comfort electronics, engine cooling and maintenance are assessed for the vehicle; trim names do not establish identical mechanical equipment.' },
    { title: 'Range Rover Sport', text: 'Describe whether the concern is a warning, uneven ride, shift quality, braking or a service reminder. The model year, powertrain and fitted chassis equipment guide the inspection and parts specification.', link: { path: '/brands/range-rover-service-dubai/brake-repair', label: 'Sport and SVR brake-pad assessment' } },
    { title: 'Range Rover Velar', text: 'A screen concern, battery drain, cooling problem or suspension warning needs its own investigation. The fitted suspension and electrical equipment are identified before a repair or supported calibration is proposed.' },
    { title: 'Range Rover Evoque', text: 'Maintenance, transmission and driveline work follow the installed systems and service record. Evoque owners should share the year, engine and symptoms rather than assume the same procedure as a full-size Range Rover.' },
  ],
  servicesTitle: 'Restore confidence in every journey',
  servicesIntro: 'Choose the service that matches your concern. A symptom or fault code is a starting point for inspection; it does not prove that a particular component has failed.',
  services: [
    { slug: 'suspension-repair', title: 'Air suspension & ride comfort', text: 'Leaning overnight, slow lifting or a compressor running repeatedly can have several causes. On vehicles with air suspension, inspection can cover air leaks, struts, the compressor, valve block, height sensors and electrical supply before parts are selected.' },
    { slug: 'transmission-repair', title: 'Gearbox & transmission repair', text: 'Delayed engagement, harsh shifts, fluid leaks and transmission warnings need the fitted gearbox identified first. Fault data, leak and fluid checks and a suitable road test help distinguish scheduled fluid service from repair of a confirmed fault.' },
    { slug: 'mechanical-repair', title: 'Engine & cooling repairs', text: 'Coolant loss, overheating, oil leaks, unusual noise and changes in drivability need physical checks as well as diagnostic information. The findings determine the mechanical repair options, parts and fluids. Arrange advice before driving with an overheating warning.' },
    { slug: 'engine-diagnostics', title: 'Diagnostics & warning messages', text: 'Share the exact warning and when it appears. Compatible fault reading, live data and targeted physical checks are considered for the vehicle. Access to service resets, adaptations, coding or calibration is confirmed for the model and module before being quoted.' },
    { slug: 'electrical-repair', title: 'Electrical & comfort systems', text: 'Starting faults, battery drain, intermittent screens or several warning messages may involve voltage, charging, wiring or communication faults. Testing starts with the affected system; replacing a battery or module is not assumed from the symptom alone.' },
    { slug: 'ac-repair', title: 'Air conditioning & cabin cooling', text: 'Weak cooling, uneven vent temperatures or unusual AC noise call for checks of output, leak evidence and the relevant electrical and cooling systems. Refrigerant type and service procedures follow the exact vehicle; topping up is not a diagnosis.' },
    { slug: 'brake-repair', title: 'Brakes & stopping confidence', text: 'Vibration, noise, a warning or a change in pedal feel needs inspection of the pads, discs, sensors and hydraulic system as appropriate. The cause and measured condition guide the proposed repair, rather than replacing pads for every complaint.' },
    { slug: 'oil-change', title: 'Scheduled service & oil change', text: 'Oil approval, filters, fluids and inspection items follow the engine, model-year instructions, service reminder and history. Dubai heat, dust and traffic inform condition checks; there is no single oil grade or service interval for every Range Rover.' },
    { slug: 'body-repair', title: 'Body & accident repair', text: 'For damaged panels, a bumper or an accident concern, send the model, year and clear photographs. A vehicle inspection establishes the accessible and hidden damage, proposed panel or paint work and any related checks before repair is agreed.' },
  ],
  feature: { title: 'Luxury service begins with a clear explanation', text: 'Tell us what has changed: a low corner after parking, a shift when warm, a warning on startup or a service due. We review the vehicle and history, agree the first assessment and explain the proposed work. Parts options, fluids and labour are set out before approval; extra findings are discussed before expanding the job.' },
  process: [
    { title: 'Share your vehicle', text: 'Send the model, year, mileage, service history and exact symptom. A photo of the warning and when it occurs helps prepare the right first assessment.' },
    { title: 'Inspect and explain', text: 'The vehicle and fitted systems guide diagnostic and physical checks. We explain the findings, supported repair options, parts and quotation before asking for approval.' },
    { title: 'Agree the next step', text: 'Approved work and relevant checks follow the agreed scope. Timing depends on the findings and parts availability; the team confirms it for your vehicle.' },
  ],
  faqs: [
    { q: 'Do you service Range Rover Sport, Vogue and Autobiography?', a: 'You can enquire about service and repairs for these vehicles, along with Range Rover, Velar and Evoque. Send the year, VIN, mileage and requested work so coverage can be confirmed. Vogue and Autobiography names do not mean every generation has the same engine, gearbox or suspension.' },
    { q: 'Does a Range Rover that leans need a new compressor?', a: 'Leaning or slow lifting does not identify a failed compressor by itself. On an air-equipped vehicle, pressure loss, an air strut, a valve block, a height sensor, wiring or compressor operation may need checking. Inspection establishes the cause before a parts recommendation.' },
    { q: 'Can a gearbox oil change fix harsh shifting?', a: 'A fluid service and diagnosis of harsh shifting are separate decisions. The fitted transmission, service history, warning data, fluid condition and test findings determine the appropriate next step. A fluid change alone is not promised to resolve an existing fault.' },
    { q: 'Are Velar and Evoque maintenance requirements the same?', a: 'No single maintenance package applies to both model families or to all their generations. The engine, installed gearbox, service instructions, mileage and previous work determine the oil, filters, fluids and checks that are due.' },
    { q: 'How often should I service a Range Rover in Dubai?', a: 'Follow the service reminder and handbook for the exact model, year and market specification. Share the mileage and service history. Heat, traffic, dust and actual use may justify additional condition checks, but an interval is confirmed for the vehicle rather than published as one rule for all Range Rovers.' },
    { q: 'How do I request a Range Rover repair estimate?', a: 'Call +971 4 340 2223 or open the WhatsApp enquiry with the model, year, mileage, service history and concern. DIGITEC is an independent workshop in Al Quoz Industrial Area 3, Dubai. The team confirms the first assessment and availability; a repair quotation may require vehicle inspection.' },
  ],
  message: 'Hello DIGITEC, I would like to enquire about Range Rover repair or servicing.\n\nModel and year: \nMileage: \nService history: \nService required, warning or symptom: \nPreferred appointment: ',
  workshopCaption: 'Range Rover Vogue on a lift in the existing DIGITEC workshop gallery, Al Quoz, Dubai. The service plan is confirmed for the individual vehicle.',
  guides: [
    { title: 'Range Rover Sport owner guide', path: '/blog/range-rover-sport-service-dubai-guide' },
    { title: 'Range Rover Vogue owner guide', path: '/blog/range-rover-vogue-service-dubai-guide' },
    { title: 'Choosing a Range Rover workshop', path: '/best-range-rover-workshop-dubai' },
  ],
};

const defenderEn: R1HubContent = {
  kind: 'defender', name: 'Land Rover Defender',
  title: 'Land Rover Defender Service & Repair Dubai | DIGITEC',
  description: 'Land Rover Defender service and repair in Al Quoz, Dubai. Discuss 90, 110, 130 and V8 maintenance, drivetrain, suspension and diagnostics with DIGITEC.',
  h1: 'Land Rover Defender Service & Repair in Dubai',
  eyebrow: 'Capability · Engineering · Reliability',
  intro: 'Keep your Defender ready for the way you use it. DIGITEC Performance Center in Al Quoz Industrial Area 3 reviews servicing, warning lights, drivetrain, suspension and repair concerns for modern Defender 90, 110, 130 and V8 variants. The year, powertrain, fitted equipment and actual symptoms define the work.',
  modelsTitle: 'Identify the Defender before planning the work',
  modelsIntro: 'Body style is only the starting point. Modern and older Defenders have different engines, transmissions, suspension and diagnostic requirements. Availability is confirmed for the exact vehicle and request.',
  models: [
    { title: 'Defender 90', text: 'Share the model year, engine, mileage and how the vehicle is used. The fitted coil or air suspension, driveline and service history guide inspections; the 90 badge alone does not define the required parts or procedure.', enquiryModel: 'Defender 90' },
    { title: 'Defender 110', text: 'Describe load, daily use and any change after a trip, impact or previous repair. Cooling, brakes, tyres, suspension and driveline concerns are checked against the installed equipment and the reported symptom.', enquiryModel: 'Defender 110' },
    { title: 'Defender 130 & V8 variants', text: 'Confirm the body style, powertrain and specification separately. A 130 service request and a V8 engine concern do not establish a common mechanical package. Fluids, diagnostic access and repair availability are verified before booking.', enquiryModel: 'Defender 130 / V8 — confirm the exact variant' },
    { title: 'Older Defender enquiries', text: 'For a classic or earlier Defender, send the year, VIN, fitted engine and gearbox, any conversion history and the work requested. The team must confirm support before a visit; modern Defender procedures and electronic systems are not applied to older vehicles.' },
  ],
  servicesTitle: 'Understand the system. Find the cause.',
  servicesIntro: 'Use the relevant repair page for symptoms and inspection scope. A warning light, vibration or noise can have several causes; it is evidence to investigate rather than a component diagnosis.',
  services: [
    { slug: 'engine-diagnostics', title: 'Diagnostics & warning lights', text: 'Send the wording of the warning, the conditions when it appears and any recent work. Compatible scan information, live data and targeted checks are matched to the model and fitted modules. Supported resets, programming and calibration are confirmed before quotation.' },
    { slug: 'suspension-repair', title: 'Suspension & chassis', text: 'Height-control faults are assessed only where air suspension is fitted. Uneven ride, knocks or wear may involve different components on coil-equipped vehicles. Inspection identifies the system, affected corner, leak or mechanical and electrical evidence before parts or calibration are proposed.' },
    { slug: 'transmission-repair', title: 'Transmission & gearbox', text: 'Delayed engagement, harsh changes, a fluid leak or a transmission warning requires the gearbox to be identified. History, fault information, condition checks and appropriate testing guide the decision between routine service, further diagnosis and repair.' },
    { slug: 'mechanical-repair', title: 'Engine & cooling systems', text: 'Oil leaks, coolant loss, overheating, noises and running concerns are assessed for the fitted engine. Cooling and mechanical inspections follow the symptoms and findings. Earlier and modern Defenders do not share one engine or repair procedure.' },
    { slug: 'electrical-repair', title: 'Electrical & electronic faults', text: 'Battery drain, no-start, intermittent functions and multiple warnings need voltage, charging, wiring and communication checks as relevant. A module fault code does not by itself establish a module failure. Repair functions depend on vehicle-specific access.' },
    { slug: 'ac-repair', title: 'AC & cabin cooling', text: 'Poor vent cooling or inconsistent airflow needs measured assessment and checks of the appropriate system. Dubai heat informs the inspection, while refrigerant type, electrical equipment and supported AC service are confirmed for the exact Defender.' },
    { slug: 'brake-repair', title: 'Brakes & road-use checks', text: 'A brake warning, vibration, noise or changed pedal feel calls for examination of the relevant braking components. Share recent trips, impacts or work. The findings determine the repair; roadworthiness concerns should be discussed before continuing to drive.' },
    { slug: 'oil-change', title: 'Preventive maintenance & oil change', text: 'Service reminders, model-year instructions, mileage and history determine due oil, filters, fluids and inspections. Mention demanding use, dust or recent trips so additional condition checks can be considered without inventing a universal interval.' },
  ],
  feature: { title: 'Four-wheel drive & driveline: follow the evidence', text: 'A vibration under load, noise on turning or a four-wheel-drive warning can come from more than one system. Describe the speed, load, road conditions and when it occurs. Inspection may need to consider the transfer case, differentials, shafts, joints, mounts, tyres or control information as relevant to the fitted vehicle. A road test is used only where suitable; a symptom does not prove a transfer-case or differential failure.' },
  process: [
    { title: 'Record the conditions', text: 'Tell us the variant, year, engine, mileage and warning. Note whether it occurs cold, warm, under load, on turning or after a trip or previous repair.' },
    { title: 'Match the checks', text: 'We identify the fitted systems and review scan information and physical evidence as appropriate. Available diagnostic functions and repair scope are confirmed for the vehicle.' },
    { title: 'Approve a defined repair', text: 'The findings, proposed parts, fluids, labour and relevant checks are explained before work is approved. Extra findings and expected timing are discussed for the actual job.' },
  ],
  faqs: [
    { q: 'Do Defender 90, 110 and 130 share the same service requirements?', a: 'The body-style number does not define the engine, transmission or suspension. The year, powertrain, fitted equipment, service instructions and previous work determine the appropriate service. Send those details so the team can confirm the supported scope for your Defender.' },
    { q: 'Can I enquire about Defender V8 servicing?', a: 'Yes. Send the VIN, year, mileage and the maintenance or repair requested. The fitted powertrain, service information, parts and diagnostic access are reviewed before confirming the appointment. V8 work is not treated as a universal procedure for every Defender.' },
    { q: 'Does every Defender use air suspension?', a: 'No. The suspension fitted to the exact vehicle must be identified. Height-control or compressor checks apply where air suspension is present; coil-equipped vehicles need checks appropriate to their mechanical suspension and reported symptoms.' },
    { q: 'Does a driveline vibration mean the transfer case has failed?', a: 'No. A vibration can involve tyres, shafts, joints, mounts, differentials, the transfer case or another system. The conditions when it occurs, inspection and suitable tests determine the cause before a repair or replacement is recommended.' },
    { q: 'Do you service classic or older Defenders?', a: 'Coverage must be confirmed before booking. Send the year, VIN, fitted engine and gearbox, conversion history and requested work. The modern Defender service description does not establish workshop support for every older generation or modified vehicle.' },
    { q: 'How do I plan Defender maintenance before a trip?', a: 'Share the vehicle details, service history, planned use and any current concerns. Due service items and condition checks for cooling, brakes, tyres, suspension or driveline are discussed for the vehicle. A check is not a guarantee against future faults; the team confirms the agreed scope and availability.' },
    { q: 'Where can I book Defender service in Dubai?', a: 'DIGITEC Performance Center is an independent workshop in Al Quoz Industrial Area 3, Dubai. Call +971 4 340 2223 or send the Defender model, year, mileage and concern on WhatsApp. The team confirms the first assessment and availability; repair pricing may require inspection.' },
  ],
  message: 'Hello DIGITEC, I would like to enquire about Land Rover Defender repair or servicing.\n\nDefender variant and year: \nEngine, if known: \nMileage: \nService history: \nWarning or symptom and when it occurs: \nPreferred appointment: ',
  workshopCaption: 'An existing Defender accident-repair photograph from the DIGITEC workshop case study. See the documented inspection and reassembly process; your vehicle receives its own assessment.',
  guides: [
    { title: 'Defender 90, 110 and 130 owner guide', path: '/blog/defender-service-dubai-guide' },
    { title: 'Defender accident-repair workshop case', path: '/blog/best-defender-workshop-dubai' },
  ],
};

const rangeRoverAr: R1HubContent = {
  kind: 'range-rover', name: 'رينج روفر',
  title: 'صيانة وإصلاح رينج روفر في دبي | ديجي-تك',
  description: 'صيانة وإصلاح رينج روفر في القوز الصناعية 3، دبي. ورشة مستقلة لفحص التعليق الهوائي والقير والمحرك والكهرباء والتكييف. تواصل مع ديجي-تك لطلب موعد.',
  h1: 'صيانة وإصلاح رينج روفر في دبي',
  eyebrow: 'ورشة مستقلة متخصصة في رينج روفر · القوز',
  intro: 'عناية بأداء سيارتك وراحة قيادتها. يستقبل مركز ديجي-تك بيرفورمانس في القوز الصناعية 3 طلبات صيانة وفحص رينج روفر وسبورت وفوج وأوتوبيوغرافي وفيلار وإيفوك. نحدد بيانات السيارة ونراجع الأعراض والسجل، ثم نشرح النتائج والعمل المقترح قبل الموافقة.',
  modelsTitle: 'خطة صيانة تناسب كل سيارة',
  modelsIntro: 'اسم الطراز وحده لا يحدد المحرك أو القير أو التعليق. أرسل الطراز وسنة الصنع ورقم الهيكل وسجل الصيانة لتأكيد التجهيزات المركبة ونطاق العمل المتاح.',
  models: [
    { title: 'رينج روفر · فوج · أوتوبيوغرافي', text: 'تُراجع طلبات فوج وأوتوبيوغرافي بحسب الجيل والمواصفات الفعلية. يُفحص ارتفاع السيارة وتجهيزات الراحة والتبريد والصيانة وفقاً للسيارة؛ لا تعني أسماء الفئات تطابق الأنظمة الميكانيكية بين الأجيال.' },
    { title: 'رينج روفر سبورت', text: 'وضح هل الطلب يتعلق بتحذير أو ميلان السيارة أو تبديلات القير أو الفرامل أو موعد الصيانة. تحدد سنة الصنع ومجموعة الحركة وتجهيزات الشاسيه الفحص ومواصفات القطع المناسبة.', link: { path: '/brands/range-rover-service-dubai/brake-repair', label: 'فحص فحمات وفرامل سبورت وSVR' } },
    { title: 'رينج روفر فيلار', text: 'تحتاج أعطال الشاشة أو استنزاف البطارية أو التبريد أو تحذيرات التعليق إلى فحص مناسب لكل حالة. نحدد التعليق والتجهيزات الكهربائية قبل اقتراح الإصلاح أو المعايرة المدعومة.' },
    { title: 'رينج روفر إيفوك', text: 'تتبع أعمال الصيانة والقير ومجموعة نقل الحركة الأنظمة المركبة وسجل السيارة. أرسل السنة والمحرك والأعراض؛ لا يُفترض تطبيق إجراء رينج روفر بالحجم الكامل على إيفوك.' },
  ],
  servicesTitle: 'ثقة في القيادة تبدأ بفحص واضح',
  servicesIntro: 'اختر الخدمة المرتبطة بالمشكلة. الأعراض ورموز الأعطال نقطة بداية للفحص، ولا تثبت وحدها تلف قطعة بعينها.',
  services: [
    { slug: 'suspension-repair', title: 'التعليق الهوائي وراحة الركوب', text: 'قد يرتبط هبوط جانب بعد الوقوف أو بطء الارتفاع أو تشغيل الضاغط المتكرر بأسباب مختلفة. في السيارات المجهزة بالتعليق الهوائي، يُفحص التسرب والمساعد الهوائي والضاغط وبلوك الصمامات وحساسات الارتفاع والتغذية الكهربائية قبل اختيار القطع.' },
    { slug: 'transmission-repair', title: 'إصلاح القير وناقل الحركة', text: 'يتطلب تأخر التعشيق أو النتع أو تسرب الزيت أو تحذير القير تحديد الناقل المركب أولاً. تساعد بيانات الأعطال وفحص التسرب والزيت واختبار القيادة المناسب في التمييز بين خدمة السوائل وإصلاح عطل مؤكد.' },
    { slug: 'mechanical-repair', title: 'المحرك ونظام التبريد', text: 'يحتاج نقص سائل التبريد أو ارتفاع الحرارة أو تسرب الزيت أو الضجيج أو تغير أداء المحرك إلى فحص فعلي مع البيانات التشخيصية. تحدد النتائج خيارات الإصلاح والقطع والسوائل. اطلب الإرشاد قبل القيادة مع تحذير ارتفاع الحرارة.' },
    { slug: 'engine-diagnostics', title: 'التشخيص ورسائل التحذير', text: 'أرسل نص التحذير ووقت ظهوره. تُراجع قراءة الأعطال والبيانات الحية والفحوص المناسبة للسيارة. تُؤكد وظائف إعادة الضبط أو التهيئة أو البرمجة أو المعايرة بحسب الطراز والوحدة قبل التسعير.' },
    { slug: 'electrical-repair', title: 'الكهرباء وتجهيزات الراحة', text: 'قد ترتبط صعوبة التشغيل أو استنزاف البطارية أو انقطاع الشاشة أو تعدد التحذيرات بجهد التغذية أو الشحن أو الأسلاك أو الاتصال بين الوحدات. يبدأ الفحص بالنظام المتأثر دون افتراض الحاجة إلى بطارية أو وحدة جديدة من الأعراض وحدها.' },
    { slug: 'ac-repair', title: 'التكييف وتبريد المقصورة', text: 'يحتاج ضعف التبريد أو اختلاف حرارة فتحات الهواء أو ضجيج التكييف إلى قياس الأداء وفحص دلائل التسرب والأنظمة الكهربائية والتبريد المرتبطة. يُحدد نوع غاز التبريد والإجراء من بيانات السيارة؛ تعبئة الغاز وحدها ليست تشخيصاً.' },
    { slug: 'brake-repair', title: 'الفرامل وثبات التوقف', text: 'تتطلب الرجة أو الضجيج أو التحذير أو تغير إحساس الدواسة فحص الفحمات والأقراص والحساسات والهيدروليك بحسب الحالة. يحدد السبب والقياس الإصلاح المقترح بدلاً من تبديل الفحمات لكل شكوى.' },
    { slug: 'oil-change', title: 'الصيانة الدورية وتغيير الزيت', text: 'تتبع مواصفات الزيت والفلاتر والسوائل والفحوص المحرك وتعليمات سنة الطراز ومؤشر الخدمة والسجل. تؤخذ حرارة دبي والغبار والازدحام في الاعتبار عند فحص الحالة، دون فرض زيت أو فترة واحدة لكل رينج روفر.' },
    { slug: 'body-repair', title: 'إصلاح الهيكل وأضرار الحوادث', text: 'للألواح أو الصدام المتضرر أو آثار حادث، أرسل الطراز والسنة وصوراً واضحة. يحدد فحص السيارة الضرر الظاهر والمخفي وأعمال الألواح أو الطلاء والفحوص المرتبطة قبل الاتفاق على الإصلاح.' },
  ],
  feature: { title: 'خدمة راقية تبدأ بشرح مفهوم', text: 'وضح ما تغير: هبوط جانب بعد الوقوف أو نتعة بعد التسخين أو تحذير عند التشغيل أو صيانة مستحقة. نراجع السيارة والسجل ونتفق على الفحص الأول ثم نشرح العمل المقترح. تُوضح خيارات القطع والسوائل وأجرة العمل قبل الموافقة، وتُناقش النتائج الإضافية قبل توسيع العمل.' },
  process: [
    { title: 'أرسل بيانات السيارة', text: 'أرسل الطراز والسنة والمسافة وسجل الصيانة ووصف الأعراض. تساعد صورة التحذير ووقت ظهوره في تحديد الفحص الأول المناسب.' },
    { title: 'فحص وشرح النتائج', text: 'تحدد السيارة وتجهيزاتها الفحوص التشخيصية والفعلية. نوضح النتائج وخيارات الإصلاح المدعومة والقطع وعرض السعر قبل طلب الموافقة.' },
    { title: 'الاتفاق على الخطوة التالية', text: 'تُنفذ الأعمال والفحوص ذات الصلة ضمن النطاق المتفق عليه. تعتمد المدة على النتائج وتوفر القطع ويؤكدها الفريق لسيارتك.' },
  ],
  faqs: [
    { q: 'هل تستقبلون رينج روفر سبورت وفوج وأوتوبيوغرافي؟', a: 'يمكنك الاستفسار عن صيانة وإصلاح هذه السيارات إلى جانب رينج روفر وفيلار وإيفوك. أرسل السنة ورقم الهيكل والمسافة والعمل المطلوب لتأكيد التغطية. لا تعني أسماء فوج وأوتوبيوغرافي تطابق المحرك والقير والتعليق في جميع الأجيال.' },
    { q: 'هل ميلان رينج روفر يعني ضرورة تبديل الضاغط؟', a: 'الميلان أو بطء الارتفاع لا يثبت وحده تعطل الضاغط. قد يحتاج فحص السيارة المجهزة بالتعليق الهوائي إلى التحقق من فقد الضغط أو المساعد الهوائي أو بلوك الصمامات أو حساس الارتفاع أو الأسلاك أو عمل الضاغط. يحدد الفحص السبب قبل توصية القطع.' },
    { q: 'هل تغيير زيت القير يعالج النتع؟', a: 'خدمة الزيت وتشخيص النتع قراران منفصلان. يحدد نوع القير والسجل وبيانات التحذير وحالة الزيت ونتائج الفحص الخطوة المناسبة. لا نعد بأن تغيير الزيت وحده يعالج عطلاً قائماً.' },
    { q: 'هل صيانة فيلار وإيفوك واحدة؟', a: 'لا توجد حزمة صيانة واحدة للطرازين أو لجميع أجيالهما. يحدد المحرك والقير المركب وتعليمات الخدمة والمسافة والأعمال السابقة الزيت والفلاتر والسوائل والفحوص المستحقة.' },
    { q: 'متى تحتاج رينج روفر إلى الصيانة في دبي؟', a: 'اتبع مؤشر الخدمة وكتيب السيارة بحسب الطراز والسنة ومواصفات السوق، وأرسل المسافة وسجل الصيانة. قد تتطلب الحرارة والازدحام والغبار والاستخدام فحوص حالة إضافية، لكن الفترة تُؤكد للسيارة بدلاً من تعميم موعد واحد على جميع سيارات رينج روفر.' },
    { q: 'كيف أطلب تقديراً لإصلاح رينج روفر؟', a: 'اتصل على ‎+971 4 340 2223 أو افتح طلب واتساب مع الطراز والسنة والمسافة والسجل والمشكلة. ديجي-تك ورشة مستقلة في القوز الصناعية 3، دبي. يؤكد الفريق الفحص الأول والتوفر، وقد يتطلب تسعير الإصلاح فحص السيارة.' },
  ],
  message: 'مرحباً ديجي-تك، أود الاستفسار عن صيانة أو إصلاح رينج روفر.\n\nالطراز وسنة الصنع: \nالمسافة المقطوعة: \nسجل الصيانة: \nالخدمة المطلوبة أو التحذير أو الأعراض: \nالموعد المفضل: ',
  workshopCaption: 'رينج روفر فوج على رافعة في صور ورشة ديجي-تك الحالية في القوز، دبي. تُؤكد خطة الصيانة لكل سيارة على حدة.',
  guides: [
    { title: 'دليل مالك رينج روفر سبورت', path: '/blog/range-rover-sport-service-dubai-guide' },
    { title: 'دليل مالك رينج روفر فوج', path: '/blog/range-rover-vogue-service-dubai-guide' },
    { title: 'اختيار ورشة رينج روفر', path: '/best-range-rover-workshop-dubai' },
  ],
};

const defenderAr: R1HubContent = {
  kind: 'defender', name: 'لاند روفر ديفندر',
  title: 'صيانة وإصلاح لاند روفر ديفندر في دبي | ديجي-تك',
  description: 'صيانة وإصلاح لاند روفر ديفندر في القوز، دبي. ناقش صيانة 90 و110 و130 وV8 وفحص مجموعة نقل الحركة والتعليق والأعطال مع ديجي-تك لطلب موعد.',
  h1: 'صيانة وإصلاح لاند روفر ديفندر في دبي',
  eyebrow: 'القدرة · الهندسة · الاعتمادية',
  intro: 'حافظ على جاهزية ديفندر لطريقة استخدامك. يراجع مركز ديجي-تك بيرفورمانس في القوز الصناعية 3 طلبات صيانة ديفندر الحديثة 90 و110 و130 وV8 وتحذيراتها وأعطال نقل الحركة والتعليق. تحدد سنة الصنع ومجموعة الحركة والتجهيزات والأعراض الفعلية نطاق العمل.',
  modelsTitle: 'تحديد ديفندر أولاً ثم تخطيط العمل',
  modelsIntro: 'شكل الهيكل نقطة بداية فقط. تختلف المحركات والقير والتعليق ومتطلبات التشخيص بين ديفندر الحديثة والأقدم. يُؤكد العمل المتاح للسيارة والطلب المحددين.',
  models: [
    { title: 'ديفندر 90', text: 'أرسل سنة الصنع والمحرك والمسافة وطريقة الاستخدام. يحدد التعليق الزنبركي أو الهوائي المركب ومجموعة نقل الحركة والسجل الفحوص المناسبة؛ اسم 90 وحده لا يحدد القطع أو الإجراء المطلوب.', enquiryModel: 'ديفندر 90' },
    { title: 'ديفندر 110', text: 'وضح الحمولة والاستخدام اليومي وأي تغير بعد رحلة أو صدمة أو إصلاح سابق. تُراجع أعطال التبريد والفرامل والإطارات والتعليق ونقل الحركة بحسب التجهيزات والأعراض الفعلية.', enquiryModel: 'ديفندر 110' },
    { title: 'ديفندر 130 وفئات V8', text: 'أكد شكل الهيكل ومجموعة الحركة والمواصفات كلّاً على حدة. لا يعني طلب صيانة 130 أو عطل محرك V8 وجود حزمة ميكانيكية مشتركة. تُراجع السوائل والصلاحيات التشخيصية والإصلاح المتاح قبل الموعد.', enquiryModel: 'ديفندر 130 أو V8 — يرجى تحديد الفئة' },
    { title: 'طلبات ديفندر الأقدم والكلاسيكية', text: 'أرسل السنة ورقم الهيكل والمحرك والقير المركبين وأي تعديلات سابقة والعمل المطلوب. يجب تأكيد الدعم قبل الزيارة؛ لا تُطبق إجراءات ديفندر الحديثة وأنظمتها الإلكترونية على السيارات الأقدم تلقائياً.' },
  ],
  servicesTitle: 'فهم النظام للوصول إلى سبب العطل',
  servicesIntro: 'راجع صفحة الإصلاح المناسبة للأعراض ونطاق الفحص. قد يكون للتحذير أو الاهتزاز أو الضجيج أكثر من سبب؛ فهو دليل للفحص وليس حكماً بتلف قطعة.',
  services: [
    { slug: 'engine-diagnostics', title: 'التشخيص ولمبات التحذير', text: 'أرسل نص التحذير وظروف ظهوره والأعمال السابقة. تُراجع بيانات الفحص والبيانات الحية والفحوص المناسبة بحسب الطراز والوحدات المركبة. تُؤكد وظائف إعادة الضبط والبرمجة والمعايرة المتاحة قبل التسعير.' },
    { slug: 'suspension-repair', title: 'التعليق والشاسيه', text: 'تُفحص أعطال التحكم في الارتفاع عند وجود تعليق هوائي فقط. قد يرتبط الميلان أو الطرق أو التآكل بقطع مختلفة في التعليق الزنبركي. يحدد الفحص النظام والجهة المتأثرة ودليل التسرب أو العطل قبل اقتراح القطع أو المعايرة.' },
    { slug: 'transmission-repair', title: 'القير وناقل الحركة', text: 'يتطلب تأخر التعشيق أو التبديلات القاسية أو تسرب الزيت أو تحذير القير تحديد الناقل. يساعد السجل وبيانات الأعطال وفحص الحالة والاختبارات المناسبة في اختيار الصيانة أو التشخيص الإضافي أو الإصلاح.' },
    { slug: 'mechanical-repair', title: 'المحرك ونظام التبريد', text: 'تُراجع تسربات الزيت ونقص سائل التبريد والحرارة والضجيج وأعطال التشغيل للمحرك المركب. تتبع الفحوص الأعراض والنتائج. لا تشترك ديفندر الأقدم والحديثة في محرك أو إجراء إصلاح واحد.' },
    { slug: 'electrical-repair', title: 'الأعطال الكهربائية والإلكترونية', text: 'يتطلب استنزاف البطارية أو عدم التشغيل أو انقطاع الوظائف أو تعدد التحذيرات فحص الجهد والشحن والأسلاك والاتصال بحسب الحاجة. رمز عطل الوحدة وحده لا يثبت تلفها، وتختلف وظائف الإصلاح بحسب الصلاحيات المتاحة للسيارة.' },
    { slug: 'ac-repair', title: 'التكييف وتبريد المقصورة', text: 'يحتاج ضعف تبريد الفتحات أو تغير تدفق الهواء إلى قياس وفحص النظام المناسب. تؤخذ حرارة دبي في الاعتبار، ويُحدد نوع غاز التبريد والتجهيزات الكهربائية وخدمة التكييف المدعومة لكل ديفندر.' },
    { slug: 'brake-repair', title: 'الفرامل وفحوص الاستخدام', text: 'يتطلب تحذير الفرامل أو الرجة أو الضجيج أو تغير إحساس الدواسة فحص المكونات ذات الصلة. اذكر الرحلات أو الصدمات أو الأعمال السابقة. تحدد النتائج الإصلاح، وينبغي مناقشة مخاوف سلامة القيادة قبل مواصلتها.' },
    { slug: 'oil-change', title: 'الصيانة الوقائية وتغيير الزيت', text: 'تحدد مؤشرات الخدمة وتعليمات سنة الطراز والمسافة والسجل الزيت والفلاتر والسوائل والفحوص المستحقة. اذكر الاستخدام الشاق والغبار والرحلات الأخيرة للنظر في فحوص إضافية دون تعميم فترة صيانة واحدة.' },
  ],
  feature: { title: 'الدفع الرباعي ونقل الحركة: الفحص وفق الدليل', text: 'قد ينشأ الاهتزاز تحت الحمل أو الضجيج عند الانعطاف أو تحذير الدفع الرباعي من أنظمة مختلفة. وضح السرعة والحمولة وظروف الطريق ووقت ظهوره. قد يشمل الفحص علبة التحويل والدفرنسات والأعمدة والوصلات والقواعد والإطارات أو بيانات التحكم بحسب تجهيزات السيارة. يُجرى اختبار قيادة عندما يكون مناسباً؛ ولا تثبت الأعراض وحدها تلف علبة التحويل أو الدفرنس.' },
  process: [
    { title: 'سجل ظروف ظهور المشكلة', text: 'أرسل الفئة والسنة والمحرك والمسافة والتحذير. وضح هل تظهر المشكلة باردة أو بعد التسخين أو تحت حمل أو عند الانعطاف أو بعد رحلة أو إصلاح.' },
    { title: 'فحوص تناسب الأنظمة', text: 'نحدد التجهيزات ونراجع بيانات الفحص والأدلة الفعلية بحسب الحالة. تُؤكد وظائف التشخيص والإصلاح المتاحة للسيارة.' },
    { title: 'الموافقة على إصلاح محدد', text: 'نشرح النتائج والقطع والسوائل والأجرة والفحوص ذات الصلة قبل الموافقة. تُناقش النتائج الإضافية والمدة المتوقعة بحسب العمل الفعلي.' },
  ],
  faqs: [
    { q: 'هل تتطابق صيانة ديفندر 90 و110 و130؟', a: 'رقم شكل الهيكل لا يحدد المحرك أو القير أو التعليق. تحدد السنة ومجموعة الحركة والتجهيزات وتعليمات الصيانة والأعمال السابقة الخدمة المناسبة. أرسل التفاصيل لتأكيد نطاق العمل المدعوم لسيارتك.' },
    { q: 'هل يمكن الاستفسار عن صيانة ديفندر V8؟', a: 'نعم. أرسل رقم الهيكل والسنة والمسافة والصيانة أو الإصلاح المطلوب. تُراجع مجموعة الحركة وتعليمات الخدمة والقطع والصلاحيات التشخيصية قبل تأكيد الموعد. لا تُعامل صيانة V8 كإجراء واحد لجميع ديفندر.' },
    { q: 'هل كل ديفندر مجهزة بتعليق هوائي؟', a: 'لا. يجب تحديد التعليق المركب في السيارة نفسها. تنطبق فحوص التحكم في الارتفاع أو الضاغط عند وجود تعليق هوائي؛ وتحتاج السيارات المجهزة بزنبركات إلى فحوص تناسب نظامها الميكانيكي وأعراضها.' },
    { q: 'هل اهتزاز مجموعة نقل الحركة يعني تلف علبة التحويل؟', a: 'لا. قد يرتبط الاهتزاز بالإطارات أو الأعمدة أو الوصلات أو القواعد أو الدفرنسات أو علبة التحويل أو نظام آخر. تحدد ظروف ظهوره والفحص والاختبارات المناسبة السبب قبل التوصية بإصلاح أو استبدال.' },
    { q: 'هل تستقبلون ديفندر الكلاسيكية أو الأقدم؟', a: 'يجب تأكيد التغطية قبل الحجز. أرسل السنة ورقم الهيكل والمحرك والقير المركبين وسجل التعديلات والعمل المطلوب. وصف خدمة ديفندر الحديثة لا يؤكد دعم كل جيل قديم أو سيارة معدلة.' },
    { q: 'كيف أخطط لصيانة ديفندر قبل رحلة؟', a: 'أرسل بيانات السيارة وسجلها والاستخدام المخطط وأي مشكلة قائمة. تُناقش الصيانة المستحقة وفحوص حالة التبريد والفرامل والإطارات والتعليق ونقل الحركة بحسب السيارة. لا يضمن الفحص عدم ظهور أعطال لاحقاً؛ يؤكد الفريق النطاق المتفق عليه والتوفر.' },
    { q: 'أين أحجز صيانة ديفندر في دبي؟', a: 'ديجي-تك بيرفورمانس ورشة مستقلة في القوز الصناعية 3، دبي. اتصل على ‎+971 4 340 2223 أو أرسل الطراز والسنة والمسافة والمشكلة عبر واتساب. يؤكد الفريق الفحص الأول والتوفر، وقد يحتاج تسعير الإصلاح إلى فحص السيارة.' },
  ],
  message: 'مرحباً ديجي-تك، أود الاستفسار عن صيانة أو إصلاح لاند روفر ديفندر.\n\nالفئة وسنة الصنع: \nالمحرك إن كان معروفاً: \nالمسافة المقطوعة: \nسجل الصيانة: \nالتحذير أو الأعراض ووقت ظهورها: \nالموعد المفضل: ',
  workshopCaption: 'صورة ديفندر من دراسة حالة إصلاح حادث منشورة لورشة ديجي-تك. راجع عملية الفحص وإعادة التجميع الموثقة؛ وتحتاج سيارتك إلى تقييم مستقل.',
  guides: [
    { title: 'دليل مالك ديفندر 90 و110 و130', path: '/blog/defender-service-dubai-guide' },
    { title: 'حالة إصلاح حادث ديفندر في الورشة', path: '/blog/best-defender-workshop-dubai' },
  ],
};

export const getR1HubContent = (slug: string | undefined, isArabic: boolean): R1HubContent | undefined =>
  slug === 'range-rover-service-dubai' ? isArabic ? rangeRoverAr : rangeRoverEn
    : slug === 'defender-service-dubai' ? isArabic ? defenderAr : defenderEn : undefined;

export const r1WhatsAppHref = (content: R1HubContent, service?: string) =>
  `https://wa.me/97143402223?text=${encodeURIComponent(`${content.message}${service ? `\n${service}` : ''}`)}`;

export const getR1ParentContent = (isArabic: boolean) => isArabic ? {
  name: 'لاند روفر', specialization: 'صيانة لاند روفر · تشخيص · إصلاح',
  title: 'صيانة وإصلاح لاند روفر في دبي | ديجي-تك',
  description: 'صيانة وإصلاح لاند روفر في القوز الصناعية 3، دبي. تعرف على فحص ديسكفري والصيانة والتشخيص، وانتقل إلى صفحات رينج روفر وديفندر المخصصة.',
  intro: 'ديجي-تك ورشة مستقلة لصيانة وإصلاح لاند روفر في القوز الصناعية 3، دبي. ناقش صيانة ديسكفري أو أي طراز آخر مع بيانات السيارة والسجل والأعراض. تتوفر صفحات مخصصة لخدمة رينج روفر وديفندر، ويُؤكد نطاق الفحص والإصلاح بحسب التجهيزات الفعلية.',
  whyChoose: [
    { title: 'تحديد السيارة ونطاق العمل', description: 'تُراجع سنة الصنع ورقم الهيكل والمحرك والقير والتعليق قبل تأكيد الفحص والقطع والإجراءات المناسبة.' },
    { title: 'صيانة وفق السجل والحالة', description: 'تحدد تعليمات الطراز ومؤشر الخدمة والسجل والمسافة البنود المستحقة، مع مراعاة ظروف الاستخدام في دبي.' },
    { title: 'تشخيص قبل اختيار القطع', description: 'تُجمع الأعراض وبيانات الأعطال والفحص الفعلي لتحديد الخطوة المناسبة؛ لا يثبت الرمز وحده تلف قطعة.' },
    { title: 'شرح قبل الموافقة', description: 'نوضح العمل والقطع والسوائل وأجرة العمل قبل التنفيذ، وتُؤكد الوظائف التشخيصية ونطاق الإصلاح لكل سيارة.' },
  ],
  faqs: [
    { q: 'كيف أطلب صيانة لاند روفر في دبي؟', a: 'أرسل الطراز والسنة ورقم الهيكل والمسافة وسجل الصيانة والخدمة المطلوبة إلى ديجي-تك، أو اتصل على ‎+971 4 340 2223. الورشة في القوز الصناعية 3، دبي. يؤكد الفريق الفحص الأول والتوفر قبل الزيارة.' },
    { q: 'هل يمكن الاستفسار عن ديسكفري؟', a: 'أرسل بيانات ديسكفري أو ديسكفري سبورت والعمل المطلوب لتأكيد الدعم. لا تحدد التسمية وحدها المحرك أو القير أو التعليق؛ تُراجع المواصفات والصلاحيات والقطع المتاحة لكل سيارة.' },
    { q: 'هل تتطابق الصيانة بين طرازات لاند روفر؟', a: 'لا. تختلف الأنظمة والمواصفات والفترات بحسب الطراز والسنة ومجموعة الحركة والسجل. يُراجع كتيب السيارة ومؤشر الخدمة دون فرض زيت أو فترة صيانة واحدة على الجميع.' },
    { q: 'أين أجد معلومات رينج روفر وديفندر؟', a: 'استخدم صفحة رينج روفر المخصصة أو صفحة لاند روفر ديفندر المرتبطتين هنا لمراجعة الطرازات والأعراض وخدمات الإصلاح الخاصة بكل عائلة. تبقى هذه الصفحة للاستفسارات الأوسع عن لاند روفر.' },
  ],
} : {
  name: 'Land Rover', specialization: 'Land Rover Maintenance · Diagnostics · Repairs',
  title: 'Land Rover Service & Repair Dubai | DIGITEC',
  description: 'Land Rover service and repair in Al Quoz, Dubai. Discuss Discovery maintenance and diagnostics, or find dedicated Range Rover and Defender service pages.',
  intro: 'DIGITEC is an independent Land Rover service and repair workshop in Al Quoz Industrial Area 3, Dubai. Discuss Discovery or another Land Rover with the vehicle details, history and concern. Dedicated Range Rover and Defender pages provide family-specific guidance; the fitted systems determine the available inspection and repair scope.',
  whyChoose: [
    { title: 'Identify the vehicle and scope', description: 'Model year, VIN, engine, gearbox and fitted suspension are reviewed before the appropriate checks, parts and procedures are confirmed.' },
    { title: 'Maintain from history and condition', description: 'Model instructions, service reminders, mileage and previous work determine due items, with Dubai use and conditions considered.' },
    { title: 'Diagnose before choosing parts', description: 'Reported symptoms, fault information and physical inspection guide the next step; a code alone does not prove that a part has failed.' },
    { title: 'Explain before approval', description: 'The proposed work, parts, fluids and labour are explained before repair. Diagnostic functions and repair availability are confirmed for the individual vehicle.' },
  ],
  faqs: [
    { q: 'How do I request Land Rover service in Dubai?', a: 'Send the model, year, VIN, mileage, service history and requested work to DIGITEC, or call +971 4 340 2223. The workshop is in Al Quoz Industrial Area 3, Dubai. The team confirms the first assessment and availability before your visit.' },
    { q: 'Can I enquire about Discovery servicing?', a: 'Send the Discovery or Discovery Sport details and requested work so support can be confirmed. A model name does not establish the engine, gearbox or suspension; specification, diagnostic access and parts availability are reviewed for the vehicle.' },
    { q: 'Do all Land Rover models need the same maintenance?', a: 'No. Systems, specifications and intervals differ by model, year, powertrain and history. The handbook and service reminder are reviewed rather than applying one oil or maintenance interval to every vehicle.' },
    { q: 'Where can I find Range Rover and Defender guidance?', a: 'Use the dedicated Range Rover or Land Rover Defender service page linked here for the relevant models, symptoms and repair services. This page remains the broader Land Rover enquiry resource.' },
  ],
};

export function applyR1BrandContent(brand: Brand | undefined, content: R1HubContent | undefined, parent: ReturnType<typeof getR1ParentContent> | undefined): Brand | undefined {
  if (!brand) return undefined;
  if (content) return { ...brand, name: content.name, intro: content.intro, specialization: content.eyebrow, faqs: content.faqs };
  if (parent) return { ...brand, ...parent };
  return brand;
}
