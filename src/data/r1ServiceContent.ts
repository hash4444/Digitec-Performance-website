import type { BrandServiceCombo, ServiceKey } from './brandServices';

type ServiceDetail = {
  label: string;
  title: string;
  rrDescription: string;
  defenderDescription: string;
  rrIntro: string;
  defenderIntro: string;
  focusTitle: string;
  rrFocus: string;
  defenderFocus: string;
  symptoms: string[];
  steps: { title: string; description: string }[];
  question: string;
  answer: string;
};

// Vehicle information is selected by VIN/model year, not by badge alone:
// https://www.ownerinfo.landrover.com/
// Official Defender 110 specifications distinguish coil and air suspension:
// https://www.landrover.co.uk/content/dam/lrdx/pdfs/uk/MIRO_Specification-DEFENDER_110_STANDARD.pdf
// These references establish equipment variation, not DIGITEC's tool ownership.
const english: Partial<Record<ServiceKey, ServiceDetail>> = {
  'suspension-repair': {
    label: 'Suspension Repair', title: 'Suspension & Air Suspension Repair',
    rrDescription: 'Range Rover suspension and air-suspension repair in Al Quoz, Dubai. Leaning, compressor operation, leaks and height-sensor faults assessed before parts.',
    defenderDescription: 'Land Rover Defender suspension repair in Al Quoz, Dubai. Coil or air systems, height warnings, wear and chassis symptoms assessed for the fitted vehicle.',
    rrIntro: 'A Range Rover sitting low after parking, leaning to one side or lifting slowly needs assessment of the fitted suspension. At DIGITEC in Al Quoz Industrial Area 3, Dubai, the inspection considers ride height, leaks, compressor operation and supported diagnostic data before an air spring, compressor or valve block is proposed. Sport, Vogue, Autobiography, Velar and Evoque equipment must be identified separately.',
    defenderIntro: 'Defender suspension repair starts by identifying the generation and fitted coil or air system. For modern Defender 90, 110 and 130 enquiries, DIGITEC reviews the warning, ride height, noise, wear and any impact or load history. Air-spring, compressor and height-control tests apply only where that equipment is present; older Defender chassis work requires separate scope confirmation.',
    focusTitle: 'Compressor, leaks and chassis checks',
    rrFocus: 'On an air-equipped Range Rover, a low corner can involve an air spring, pipe, valve block, sensor, supply or control concern. Repeated compressor operation does not establish compressor failure: leak testing, electrical supply and relevant pressure or height information may be needed. Mechanical bushes, arms, joints, dampers and tyre condition remain part of the investigation.',
    defenderFocus: 'An air-equipped Defender may need leak, compressor, valve-block, height-sensor and electrical checks. A coil-equipped vehicle needs a different assessment of springs, dampers, bushes and joints. Record any impact, towing or load change; a warning or uneven stance alone cannot identify the failed component. Calibration is quoted only when required and supported.',
    symptoms: ['Suspension or height-control warning displayed', 'One corner drops after parking or the vehicle sits unevenly', 'Slow height change or repeated compressor operation where air suspension is fitted', 'Knocking, damper leakage, uneven tyre wear or a change in ride quality'],
    steps: [
      { title: 'Identify the fitted chassis', description: 'Check the VIN, generation, suspension options, tyre condition, reported warning and load or impact history.' },
      { title: 'Inspect the mechanical condition', description: 'Assess ride height, springs, dampers, bushes, joints and visible damage before narrowing the fault.' },
      { title: 'Test the relevant air or control system', description: 'Where fitted, use appropriate leak, compressor-supply, valve and height-sensor checks with supported data.' },
      { title: 'Quote and verify the repair', description: 'Confirm compatible parts and any supported calibration, alignment or road-test checks before approval.' },
    ],
    question: 'Does a low corner prove that an air spring has failed?',
    answer: 'No. Air lines, valves, sensors, compressor operation, electrical supply and mechanical condition can require checking. The fitted system and test findings determine the proposed repair.',
  },
  'transmission-repair': {
    label: 'Gearbox & Transmission Repair', title: 'Gearbox & Transmission Repair',
    rrDescription: 'Range Rover gearbox repair in Al Quoz, Dubai for delayed engagement, harsh shifts, leaks and warnings. Fitted transmission and test findings guide the repair.',
    defenderDescription: 'Land Rover Defender gearbox and driveline assessment in Al Quoz, Dubai. Shifts, leaks, transfer-case symptoms and vibrations checked before repair.',
    rrIntro: 'Delayed drive or reverse, harsh shifts and transmission warnings can have several causes. DIGITEC assesses your Range Rover gearbox concern using the exact vehicle details, service history, leak checks and compatible diagnostic information. Fluid service, supported adaptation and repair of a confirmed fault are separate decisions; no single gearbox procedure is applied to every Range Rover model.',
    defenderIntro: 'A Defender driveline vibration or 4x4 warning should not automatically be called a gearbox failure. DIGITEC distinguishes shift and engagement concerns from possible transfer-case, differential, shaft or mounting symptoms. The modern Defender and older generations can have different transmissions and four-wheel-drive arrangements, so identification comes before fluid, parts or repair recommendations.',
    focusTitle: 'Gearbox and driveline diagnosis',
    rrFocus: 'Record whether the concern occurs cold or warm, during drive/reverse engagement, at a particular shift or with road speed. Supported fault and live data, leaks, fluid requirements, mounts and engine-running condition help define the next step. Internal gearbox, converter or control-unit repair availability is confirmed only after the fitted unit and findings are known.',
    defenderFocus: 'Tell us whether vibration follows engine speed, road speed, load or a gear change, and whether it began after off-road use or recent work. Appropriate inspection may cover mounts, shafts, transfer case, differentials and the gearbox. Electronic four-wheel-drive data is reviewed where supported; older mechanical systems are assessed according to their own arrangement.',
    symptoms: ['Delayed or inconsistent drive or reverse engagement', 'Harsh shifts, slipping or a transmission warning', 'Fluid loss or noise around the gearbox or driveline', 'Vibration or a four-wheel-drive concern that changes with speed or load'],
    steps: [
      { title: 'Record when the symptom occurs', description: 'Review model, year, mileage, service history, cold/warm behaviour and recent gearbox or driveline work.' },
      { title: 'Identify the gearbox and driveline', description: 'Confirm the installed transmission, transfer and differential arrangement before selecting fluids or tests.' },
      { title: 'Separate the possible causes', description: 'Combine supported diagnostic information with leak, mounting and mechanical checks; road-test only when appropriate.' },
      { title: 'Agree the supported work', description: 'Explain whether service, further diagnosis or repair is justified, with parts, fill procedure and completion checks confirmed.' },
    ],
    question: 'Will a gearbox oil change fix a warning or harsh shift?',
    answer: 'Not necessarily. Fluid condition is one part of the assessment. A warning, engagement fault or vibration may need electrical or mechanical testing before service or repair can be recommended.',
  },
  'mechanical-repair': {
    label: 'Engine & Mechanical Repair', title: 'Engine & Cooling Repair',
    rrDescription: 'Range Rover engine repair and cooling assessment in Al Quoz, Dubai. Coolant loss, overheating, oil leaks and rough running investigated before repair.',
    defenderDescription: 'Land Rover Defender engine and cooling repair assessment in Al Quoz, Dubai. Leaks, temperature warnings, noise and drivability concerns investigated.',
    rrIntro: 'Coolant loss, an overheating warning, an oil leak or rough running needs a cause-based inspection. DIGITEC reviews the Range Rover engine and cooling configuration, reported conditions and maintenance history, then combines suitable leak or mechanical tests with compatible diagnostic data. External repairs, further dismantling and internal engine work are confirmed as separate scopes.',
    defenderIntro: 'Defender engine and mechanical repair depends on the generation, powertrain and how the vehicle is used. For a temperature warning, coolant loss, oil leak or unusual noise, DIGITEC reviews the symptom and relevant systems before proposing parts. Tell us about towing, off-road use, underbody impacts and recent work; these guide inspection without proving a particular failure.',
    focusTitle: 'Cooling, leaks and engine condition',
    rrFocus: 'A coolant leak can come from several points in the circuit. Suitable checks may include visible joints and hoses, pump or radiator areas, fan operation and system integrity as appropriate to the complaint. Oil leaks and running concerns are investigated separately. A warning or a photograph cannot establish an internal-engine failure.',
    defenderFocus: 'Cooling airflow, visible leaks, hose condition and relevant engine data are considered alongside the load and conditions when the symptom appeared. Driveline or mounting vibration can need a different test path from engine roughness. Modern petrol, diesel or electrified variants and older Defender engines are not assigned one repair procedure.',
    symptoms: ['Coolant loss, temperature warning or overheating', 'Oil or coolant visible below the vehicle', 'Rough running, unusual engine noise or a change in power', 'Mechanical vibration, smell or a concern found during maintenance'],
    steps: [
      { title: 'Document the engine and concern', description: 'Identify the exact engine, warning, fluid-level changes, service history and operating conditions.' },
      { title: 'Locate the affected system', description: 'Inspect the leak or noise area and use suitable cooling, mechanical or electrical tests to narrow the cause.' },
      { title: 'Explain findings and further tests', description: 'Separate confirmed faults from work requiring additional testing or dismantling before quoting a repair.' },
      { title: 'Approve and check the repair', description: 'Confirm parts, fluids, available repair scope and suitable leak, temperature or running checks after agreed work.' },
    ],
    question: 'Should I keep driving with an overheating warning?',
    answer: 'Follow the vehicle warning and handbook. Stop safely if overheating or an urgent oil-pressure warning is displayed; arrange recovery if continued driving is unsafe. Do not open a hot cooling-system cap.',
  },
  'engine-diagnostics': {
    label: 'Diagnostics', title: 'Diagnostics & Warning-Light Assessment',
    rrDescription: 'Range Rover diagnostics in Al Quoz, Dubai for warning lights, rough running and intermittent faults. Compatible data and physical tests guide the next step.',
    defenderDescription: 'Land Rover Defender diagnostics in Al Quoz, Dubai. Engine, 4x4 and suspension warnings assessed with supported data and appropriate physical tests.',
    rrIntro: 'A Range Rover warning can involve the engine, transmission, suspension or electrical supply. DIGITEC starts with the full warning text, when it appears and how the vehicle behaves. Supported module data is reviewed alongside physical checks, so a stored fault code is evidence for investigation rather than an instruction to replace the named part.',
    defenderIntro: 'Defender diagnostics begins with the exact warning and fitted generation, not a universal scan promise. Engine, 4x4, suspension and communication concerns can require different test paths. DIGITEC confirms compatible access for your Defender, then compares available fault information with the symptom, vehicle condition and appropriate mechanical or electrical tests.',
    focusTitle: 'From a warning to a supported repair plan',
    rrFocus: 'Send a photograph or transcription of the warning, whether the vehicle starts normally, any recent battery or repair work, and whether the fault occurs after parking or when warm. Reading fault codes does not establish access to every module, programming function or calibration. Those functions are checked individually before inclusion in a quote.',
    defenderFocus: 'For a 4x4 or chassis warning, include the driving conditions, any impact, water or sand exposure and changes in vehicle behaviour. Older Defender systems may require a different mechanical or electrical investigation from modern vehicles. Coding, security access and high-voltage work are not implied by an initial diagnostic assessment.',
    symptoms: ['Engine, powertrain, suspension or four-wheel-drive warning', 'Rough running, hesitation, reduced power or intermittent starting', 'Several warnings after battery discharge or recent work', 'An intermittent concern that returns under particular conditions'],
    steps: [
      { title: 'Record the warning and history', description: 'Review the exact message, vehicle behaviour, timing, recent work and model-year information.' },
      { title: 'Confirm compatible access', description: 'Identify available modules and fault or live data; do not assume coding or programming coverage from a code read.' },
      { title: 'Test the suspected system', description: 'Use appropriate physical, electrical or mechanical checks to compare the data with the reported symptom.' },
      { title: 'Report the next step', description: 'Explain what is confirmed, what needs further testing and which supported repair can be quoted for approval.' },
    ],
    question: 'Does a diagnostic code identify the failed part?',
    answer: 'No. A code records a condition detected by a system. Power supply, wiring, sensor information or a mechanical concern can need testing before a component is recommended.',
  },
  'electrical-repair': {
    label: 'Electrical Repair', title: 'Electrical Repair & Fault Tracing',
    rrDescription: 'Range Rover electrical repair in Al Quoz, Dubai. Battery, charging, wiring, screen and module-communication concerns tested before parts are proposed.',
    defenderDescription: 'Land Rover Defender electrical repair in Al Quoz, Dubai. Low-voltage, wiring, camera and communication faults assessed for the fitted equipment.',
    rrIntro: 'Intermittent screens, warning messages, battery discharge or accessory faults need electrical fault tracing. DIGITEC checks the Range Rover concern against low-voltage supply, charging, relevant circuits and supported module information. A display or communication symptom does not prove a failed module; programming and integration functions are confirmed separately.',
    defenderIntro: 'Defender electrical repair follows the fitted systems and generation. For starting, charging, lighting, camera or intermittent warning concerns, DIGITEC records the conditions and checks the relevant low-voltage circuit or system. Recent battery work, accessories and off-road exposure help describe the problem without establishing that a specific sensor or control unit has failed.',
    focusTitle: 'Low-voltage supply, wiring and communication',
    rrFocus: 'Battery condition, charging, grounds, connectors and suitable circuit measurements may explain several apparently unrelated warnings. Screen and camera concerns can involve power, signal, wiring or the display as well as a module. Compatible replacement, coding and configuration are confirmed before acceptance; a code read is not a programming promise.',
    defenderFocus: 'Describe which function stops working and whether the concern changes with heat, movement, parking or recent accessory work. Modern networks, cameras and sensors are not assumed on an older Defender. Circuit testing and available data guide the repair; retrofit, camera calibration and high-voltage work need their own capability confirmation.',
    symptoms: ['Battery discharge, charging warning or intermittent no-start', 'Screen, reversing-camera or accessory function changes where fitted', 'Lighting, switch, sensor or wiring concern', 'Several warnings or communication faults after battery or repair work'],
    steps: [
      { title: 'Identify the affected function', description: 'Record fitted equipment, original or added accessories, timing, recent battery work and intermittent conditions.' },
      { title: 'Check low-voltage supply', description: 'Assess battery, charging, grounds and relevant fuses or connections as appropriate to the concern.' },
      { title: 'Trace the circuit and data', description: 'Use suitable voltage, continuity, current or communication checks instead of selecting a part from a warning alone.' },
      { title: 'Confirm repair and integration', description: 'Quote supported wiring or component work and confirm any required coding, setup or verification separately.' },
    ],
    question: 'Does a blank camera image prove the camera has failed?',
    answer: 'No. Power, wiring, connections, signal, display or communication issues can cause similar symptoms. The fitted equipment and test results determine the supported repair.',
  },
  'ac-repair': {
    label: 'AC Repair', title: 'AC Repair & Cooling Assessment',
    rrDescription: 'Range Rover AC repair in Al Quoz, Dubai for weak cooling, airflow and cabin-zone concerns. Leak, refrigerant and electrical checks before service.',
    defenderDescription: 'Land Rover Defender AC repair in Al Quoz, Dubai. Weak cooling, airflow, leaks and control concerns assessed before refrigerant or parts are proposed.',
    rrIntro: 'Range Rover AC repair needs more than a refrigerant top-up. DIGITEC reviews airflow, cooling at idle and on the move, and front or rear cabin-zone symptoms where fitted. The vehicle label, system layout, compatible equipment and test findings determine the refrigerant and repair scope for your exact Range Rover.',
    defenderIntro: 'For weak Defender AC, tell DIGITEC whether the air remains strong but warm, airflow is reduced or the concern changes in traffic. Dust, use and previous AC work help define the first checks, but do not prove a leak or compressor failure. Refrigerant, climate equipment and access vary with the Defender generation and specification.',
    focusTitle: 'Airflow, leaks and temperature control',
    rrFocus: 'Separate a front/rear temperature difference from weak cooling throughout the cabin. Appropriate checks may include vent temperatures, airflow, pressures, leak evidence, fans, compressor control or cabin actuators. Cabin layout and access affect the quote; one fault does not establish that the whole climate system needs replacement.',
    defenderFocus: 'Inspection can consider filter restriction, visible condenser condition, fan behaviour, leak evidence and climate-control data as appropriate. An older Defender may have a different or modified climate installation from a modern 90, 110 or 130. Identify what is fitted before selecting components, refrigerant or procedures.',
    symptoms: ['AC air is warm, weak or changes temperature in traffic', 'Reduced airflow or uneven cabin-zone cooling where equipped', 'Unusual blower or compressor-area noise', 'Recurring loss of cooling after previous refrigerant work'],
    steps: [
      { title: 'Describe the cooling pattern', description: 'Record airflow, affected vents or zones, idle versus road behaviour and previous AC service or repair.' },
      { title: 'Verify the fitted system', description: 'Check the refrigerant label, climate configuration and compatible service equipment before adding refrigerant.' },
      { title: 'Test performance and possible leaks', description: 'Use appropriate temperature, airflow, pressure, leak and electrical checks to narrow the concern.' },
      { title: 'Quote and recheck', description: 'Confirm parts, access, refrigerant quantities and the agreed repair, then assess cooling under suitable conditions.' },
    ],
    question: 'Is an AC top-up the right first repair for warm air?',
    answer: 'Not automatically. Airflow, electrical control, fan operation or a leak may be involved. Confirm the fitted refrigerant and inspect the system before proposing charging or components.',
  },
  'brake-repair': {
    label: 'Brake Repair', title: 'Brake Repair & Inspection',
    rrDescription: 'Range Rover brake repair in Al Quoz, Dubai. Sport SVR brake pads, discs, wear warnings and vibration assessed against the fitted braking system.',
    defenderDescription: 'Land Rover Defender brake repair in Al Quoz, Dubai. Pad and disc wear, fluid, vibration and warnings assessed with use and fitted hardware in mind.',
    rrIntro: 'A Range Rover brake noise, vibration or warning needs inspection of the fitted braking hardware and the circumstances when it happens. DIGITEC checks appropriate pad, disc, caliper, fluid and electronic information before recommending components. Sport or Autobiography badges alone do not establish the correct brake parts or procedures.',
    defenderIntro: 'Defender brake inspection considers daily traffic, towing or off-road use alongside the actual wear and symptom. DIGITEC identifies the generation and fitted hardware, then assesses pads, discs, calipers, fluid and relevant warnings. Wheel or chassis vibration may need a separate investigation from friction-brake wear.',
    focusTitle: 'Measurements before replacement',
    rrFocus: 'Explain whether vibration is felt through the pedal, steering wheel or body and at what speed it occurs. Relevant measurements and inspection help distinguish friction wear, hydraulic concerns and other sources of vibration. Electronic parking-brake procedures and supported resets are confirmed for the exact vehicle.',
    defenderFocus: 'Report braking changes after towing, sand use, an impact or recent wheel work. Inspection can consider visible contamination, component condition, fluid and wheel or suspension influences as appropriate. Modern electronic functions and older mechanical arrangements require different procedures; no single brake package is assumed.',
    symptoms: ['Brake wear or brake-system warning', 'Vibration or a change in braking feel', 'Persistent scraping, grinding or other new brake noise', 'Fluid loss, a soft pedal or reduced braking performance'],
    steps: [
      { title: 'Record the braking concern', description: 'Review the warning, pedal feel, speed, recent work, use and fitted brake system.' },
      { title: 'Inspect and measure', description: 'Assess appropriate pad, disc, caliper, hose and fluid condition rather than choosing parts from noise alone.' },
      { title: 'Confirm compatible parts and procedures', description: 'Match hardware, fluid, electronic parking-brake requirements and supported functions to the exact vehicle.' },
      { title: 'Approve and verify', description: 'Explain the repair and complete suitable leak, pedal, warning or road-test checks as vehicle condition permits.' },
    ],
    question: 'When should I avoid driving with a brake concern?',
    answer: 'Stop safely if braking performance or pedal feel changes, fluid is leaking or an urgent brake instruction appears. Arrange recovery if braking is unsafe and follow the vehicle handbook.',
  },
  'oil-change': {
    label: 'Oil Change & Maintenance', title: 'Oil Change & Maintenance',
    rrDescription: 'Range Rover oil change and maintenance in Al Quoz, Dubai. Engine-specific oil, filters, due items and service history checked before quotation.',
    defenderDescription: 'Land Rover Defender oil change and servicing in Al Quoz, Dubai. Correct engine oil, filters and due inspections matched to model, history and use.',
    rrIntro: 'Range Rover oil change and maintenance begins with the exact engine, model year, mileage and service record. DIGITEC confirms oil approval, viscosity, quantity, filter and level-check procedure before quoting. A due oil service is distinct from a full maintenance visit or investigation of a leak; Vogue, Sport, Autobiography, Velar and Evoque do not share one universal schedule.',
    defenderIntro: 'Defender service and oil-change requirements follow the fitted engine and generation. DIGITEC reviews the recorded schedule, mileage, history and use before confirming oil, filters, inspection items and any supported service reset. Sand driving, towing and storage can justify reviewing condition, but do not establish one invented service interval for every Defender.',
    focusTitle: 'Due maintenance and separate repair findings',
    rrFocus: 'Send the service reminder and previous invoice if available. The agreed scope can identify due filters, fluid checks and relevant cooling, brake, battery or suspension inspections. Oil-level warnings, pressure warnings and leaks are different concerns; adding oil or resetting a reminder does not diagnose them.',
    defenderFocus: 'Tell us about the last service, off-road use, loads and time in storage. Relevant filter, cooling, underbody, brake and driveline-condition checks can be discussed alongside the vehicle schedule. Older Defender oils, filters and procedures are confirmed separately from modern 90, 110 and 130 models.',
    symptoms: ['Oil service or maintenance reminder due', 'Incomplete service history or an unfamiliar previous oil specification', 'Vehicle returning to use after storage or a recent purchase', 'Oil-level concern, visible leak or an additional issue to inspect separately'],
    steps: [
      { title: 'Review the service record', description: 'Confirm the engine, model year, mileage, reminder, previous work and actual vehicle use.' },
      { title: 'Verify oil and due items', description: 'Check the applicable oil approval, quantity, filter, seals and manufacturer service information for the exact vehicle.' },
      { title: 'Agree the maintenance scope', description: 'Separate scheduled work from leaks or additional findings that need a repair assessment and approval.' },
      { title: 'Complete and document', description: 'Use the correct fill and level procedure, include a reset only where supported and record the agreed work.' },
    ],
    question: 'Is there one oil grade or service interval for every model?',
    answer: 'No. The exact engine, model year, market specification, service information, history and use determine the oil and due maintenance. An oil-pressure warning needs a safe stop and assessment rather than a routine service booking.',
  },
};

const arabic: Partial<Record<ServiceKey, ServiceDetail>> = {
  'suspension-repair': {
    label: 'إصلاح التعليق', title: 'إصلاح التعليق والتعليق الهوائي',
    rrDescription: 'إصلاح تعليق رينج روفر في القوز، دبي. فحص هبوط السيارة وتسرب الهواء والضاغط وحساسات الارتفاع قبل اقتراح القطع حسب النظام المركب.',
    defenderDescription: 'إصلاح تعليق لاند روفر ديفندر في القوز، دبي. فحص النوابض أو التعليق الهوائي والتحذيرات والتآكل حسب الجيل وتجهيزات السيارة.',
    rrIntro: 'هبوط رينج روفر بعد الوقوف أو ميلها إلى جهة أو بطء رفعها يحتاج فحص نظام التعليق المركب. تراجع ديجي-تك في القوز الصناعية 3 بدبي الارتفاع والتسرب وتشغيل الضاغط وبيانات التشخيص المتاحة قبل اقتراح وسادة هوائية أو ضاغط أو مجموعة صمامات. تُحدد تجهيزات سبورت وفوج وأوتوبيوغرافي وفيلار وإيفوك بصورة منفصلة.',
    defenderIntro: 'يبدأ إصلاح تعليق ديفندر بتحديد الجيل ونوع التعليق، سواء بالنوابض أو الهواء. نراجع تحذير ديفندر 90 أو 110 أو 130 والارتفاع والضجيج والتآكل وسجل الأحمال أو الصدمات. تنطبق اختبارات الضاغط والتحكم بالارتفاع على السيارات المجهزة بها فقط؛ ويُؤكد نطاق أعمال شاسيه ديفندر القديمة بصورة منفصلة.',
    focusTitle: 'فحص الضاغط والتسرب وأجزاء التعليق',
    rrFocus: 'قد يرتبط هبوط ركن في رينج روفر المزودة بالهواء بالوسادة أو الأنبوب أو الصمامات أو الحساس أو التغذية والتحكم. تكرار عمل الضاغط لا يثبت تلفه؛ قد تلزم اختبارات تسرب وتغذية كهربائية ومراجعة بيانات الضغط أو الارتفاع. تُفحص الجلب والأذرع والمفاصل والمساعدات والإطارات بحسب الحالة.',
    defenderFocus: 'قد يحتاج تعليق ديفندر الهوائي إلى فحص التسرب والضاغط والصمامات وحساسات الارتفاع والكهرباء. أما التعليق بالنوابض فتختلف فحوصه وتشمل النوابض والمساعدات والجلب والمفاصل. اذكر الصدمة أو السحب أو تغير الحمل؛ لا يحدد التحذير وحده القطعة التالفة، وتُؤكد المعايرة عند الحاجة ودعم الوظيفة.',
    symptoms: ['تحذير التعليق أو التحكم بالارتفاع', 'هبوط ركن بعد الوقوف أو ميل السيارة', 'بطء تغير الارتفاع أو تكرار تشغيل الضاغط عند وجود تعليق هوائي', 'طقطقة أو تسرب من المساعد أو تآكل غير منتظم للإطارات أو تغير الراحة'],
    steps: [
      { title: 'تحديد نظام التعليق', description: 'مراجعة رقم الهيكل والجيل والتجهيزات والإطارات والتحذير وسجل الأحمال أو الصدمات.' },
      { title: 'فحص الحالة الميكانيكية', description: 'تقييم الارتفاع والنوابض والمساعدات والجلب والمفاصل والأضرار الظاهرة قبل تحديد مسار العطل.' },
      { title: 'اختبار الهواء أو التحكم عند وجوده', description: 'إجراء فحوص التسرب وتغذية الضاغط والصمامات وحساس الارتفاع المناسبة مع البيانات المدعومة.' },
      { title: 'عرض الإصلاح والتحقق', description: 'تأكيد القطع وأي معايرة مدعومة أو ضبط زوايا أو اختبار طريق مناسب قبل الموافقة.' },
    ],
    question: 'هل هبوط ركن يثبت تلف الوسادة الهوائية؟', answer: 'لا. قد تحتاج الأنابيب والصمامات والحساسات وتشغيل الضاغط والتغذية والحالة الميكانيكية إلى الفحص. يحدد النظام المركب ونتائج الاختبارات الإصلاح المقترح.',
  },
  'transmission-repair': {
    label: 'إصلاح القير وناقل الحركة', title: 'إصلاح القير وناقل الحركة',
    rrDescription: 'إصلاح قير رينج روفر في القوز، دبي. فحص تأخر التعشيق والنتع والتسرب والتحذيرات قبل تحديد الخدمة أو الإصلاح المناسب.',
    defenderDescription: 'فحص قير ونظام دفع لاند روفر ديفندر في القوز، دبي. مراجعة النقلات والتسرب والاهتزاز وأعراض علبة التحويل قبل الإصلاح.',
    rrIntro: 'قد يكون لتأخر تعشيق القير أو النتع أو تحذير ناقل الحركة أكثر من سبب. تراجع ديجي-تك بيانات رينج روفر وسجلها والتسرب ومعلومات التشخيص المتوافقة قبل اقتراح العمل. تغيير الزيت وإعادة التعلم المدعومة وإصلاح عطل مؤكد قرارات منفصلة؛ لا تُعمم إجراءات قير واحد على جميع طرازات رينج روفر.',
    defenderIntro: 'لا يعني اهتزاز نظام دفع ديفندر أو تحذير الدفع الرباعي تلقائياً تلف القير. نميز بين أعراض النقل والتعشيق وبين علبة التحويل والدفرنس وأعمدة الدفع والقواعد المحتملة. تختلف ترتيبات ناقل الحركة والدفع بين ديفندر الحديثة والأجيال القديمة، لذا تُحدد التجهيزات قبل توصية الزيت أو القطع.',
    focusTitle: 'تمييز القير عن بقية نظام الدفع',
    rrFocus: 'وضح هل تظهر المشكلة بارداً أو بعد التسخين، عند التعشيق الأمامي أو الخلفي، في نقلة معينة أم مع سرعة الطريق. تساعد البيانات المتاحة والتسرب ومتطلبات الزيت والقواعد وحالة تشغيل المحرك في تحديد الخطوة التالية. يُؤكد توفر الإصلاح الداخلي أو محول العزم أو وحدة التحكم بعد تحديد القير والنتائج.',
    defenderFocus: 'اذكر هل يتبع الاهتزاز سرعة المحرك أو الطريق أو الحمل أو نقلة معينة، وهل بدأ بعد قيادة خارج الطريق أو عمل حديث. قد يشمل الفحص القواعد والأعمدة وعلبة التحويل والدفرنس والقير. تُراجع بيانات الدفع الإلكتروني عند دعمها؛ وتُفحص الأنظمة الميكانيكية الأقدم وفق تصميمها.',
    symptoms: ['تأخر أو عدم انتظام التعشيق الأمامي أو الخلفي', 'نتع أو انزلاق أو تحذير ناقل الحركة', 'تسرب أو ضجيج قرب القير أو نظام الدفع', 'اهتزاز أو مشكلة دفع رباعي تتغير مع السرعة أو الحمل'],
    steps: [
      { title: 'توثيق ظروف المشكلة', description: 'مراجعة الطراز والسنة والمسافة والسجل وظهور الأعراض بارداً أو ساخناً وأعمال القير أو الدفع الحديثة.' },
      { title: 'تحديد القير ونظام الدفع', description: 'تأكيد ناقل الحركة وعلبة التحويل والدفرنس قبل اختيار السوائل أو الاختبارات.' },
      { title: 'تمييز الأسباب المحتملة', description: 'جمع البيانات المتاحة مع فحص التسرب والقواعد والحالة الميكانيكية، واختبار الطريق عند ملاءمته.' },
      { title: 'الاتفاق على العمل المتاح', description: 'شرح الحاجة إلى خدمة أو تشخيص إضافي أو إصلاح، مع تأكيد القطع وإجراء التعبئة وفحوص التحقق.' },
    ],
    question: 'هل تغيير زيت القير يعالج التحذير أو النتع؟', answer: 'ليس بالضرورة. حالة الزيت جزء من التقييم، وقد يحتاج التحذير أو تأخر التعشيق أو الاهتزاز إلى فحوص كهربائية أو ميكانيكية قبل التوصية بالخدمة أو الإصلاح.',
  },
  'mechanical-repair': {
    label: 'إصلاح المحرك والميكانيكا', title: 'إصلاح المحرك والتبريد',
    rrDescription: 'فحص وإصلاح محرك رينج روفر والتبريد في القوز، دبي. مراجعة نقص سائل التبريد وارتفاع الحرارة وتسرب الزيت والخشونة قبل الإصلاح.',
    defenderDescription: 'فحص محرك لاند روفر ديفندر والتبريد في القوز، دبي. تقييم التسرب وتحذيرات الحرارة والضجيج وتغير الأداء قبل تحديد الإصلاح.',
    rrIntro: 'يحتاج نقص سائل التبريد أو تحذير الحرارة أو تسرب الزيت أو الخشونة إلى فحص السبب. نراجع تجهيزات محرك رينج روفر والتبريد وظروف الأعراض والسجل، ثم نجمع اختبارات التسرب أو الميكانيكا المناسبة مع البيانات المتوافقة. تُؤكد الإصلاحات الخارجية والفك الإضافي والعمل الداخلي كنطاقات منفصلة.',
    defenderIntro: 'يعتمد إصلاح محرك ديفندر والميكانيكا على الجيل ومنظومة الحركة والاستخدام. نراجع التحذير أو نقص التبريد أو تسرب الزيت أو الضجيج والأنظمة المعنية قبل اقتراح القطع. اذكر السحب والقيادة خارج الطريق والصدمات السفلية والأعمال الحديثة؛ تساعد التفاصيل في توجيه الفحص دون إثبات عطل معين.',
    focusTitle: 'تحديد التسرب وحالة المحرك والتبريد',
    rrFocus: 'قد يأتي تسرب التبريد من مواضع مختلفة. تشمل الفحوص المناسبة الوصلات والخراطيم ومنطقة المضخة أو الرديتر وتشغيل المروحة وسلامة الدورة بحسب الشكوى. تُبحث تسربات الزيت ومشاكل التشغيل بصورة منفصلة. لا يثبت التحذير أو الصورة تلفاً داخلياً في المحرك.',
    defenderFocus: 'تُراجع تهوية التبريد والتسرب والخراطيم وبيانات المحرك مع الحمل والظروف وقت ظهور العرض. قد يحتاج اهتزاز الدفع أو القواعد إلى مسار مختلف عن خشونة المحرك. لا تُطبق إجراءات واحدة على محركات ديفندر الحديثة أو القديمة أو الفئات المكهربة.',
    symptoms: ['نقص سائل التبريد أو تحذير الحرارة أو ارتفاعها', 'زيت أو سائل تبريد أسفل السيارة', 'خشونة تشغيل أو ضجيج محرك غير معتاد أو تغير القوة', 'اهتزاز ميكانيكي أو رائحة أو ملاحظة ظهرت أثناء الصيانة'],
    steps: [
      { title: 'توثيق المحرك والأعراض', description: 'تحديد المحرك والتحذير وتغير مستويات السوائل والسجل وظروف التشغيل.' },
      { title: 'تحديد النظام المتأثر', description: 'فحص منطقة التسرب أو الضجيج واستخدام الاختبارات المناسبة للتبريد أو الميكانيكا أو الكهرباء.' },
      { title: 'شرح النتائج والفحص الإضافي', description: 'تمييز الأعطال المؤكدة عن العمل الذي يحتاج اختباراً أو فكاً إضافياً قبل عرض الإصلاح.' },
      { title: 'الموافقة والتحقق من الإصلاح', description: 'تأكيد القطع والسوائل والنطاق المتاح وفحوص التسرب أو الحرارة أو التشغيل المناسبة بعد العمل.' },
    ],
    question: 'هل أواصل القيادة مع تحذير ارتفاع الحرارة؟', answer: 'اتبع التحذير ودليل السيارة. توقف بأمان عند ارتفاع الحرارة أو ظهور تحذير عاجل لضغط الزيت، ورتب نقل السيارة إذا لم تكن القيادة آمنة. لا تفتح غطاء دورة التبريد وهي ساخنة.',
  },
  'engine-diagnostics': {
    label: 'تشخيص الأعطال', title: 'تشخيص الأعطال والتحذيرات',
    rrDescription: 'تشخيص أعطال رينج روفر في القوز، دبي. فحص التحذيرات والخشونة والأعطال المتقطعة بالبيانات المتوافقة والاختبارات الفعلية.',
    defenderDescription: 'تشخيص أعطال لاند روفر ديفندر في القوز، دبي. مراجعة تحذيرات المحرك والدفع الرباعي والتعليق مع البيانات والفحوص المناسبة.',
    rrIntro: 'قد يتعلق تحذير رينج روفر بالمحرك أو القير أو التعليق أو التغذية الكهربائية. نبدأ بالنص الكامل ووقت ظهوره وسلوك السيارة، ثم نراجع بيانات الوحدات المدعومة مع الفحص الفعلي. رمز العطل دليل للتحقيق، ولا يُعامل كأمر باستبدال القطعة المذكورة.',
    defenderIntro: 'يبدأ تشخيص ديفندر بالتحذير والجيل والتجهيزات، دون وعد بمسح شامل لكل الأنظمة. قد تحتاج تحذيرات المحرك والدفع والتعليق والاتصال إلى مسارات مختلفة. نؤكد الوصول المتوافق، ثم نقارن المعلومات المتاحة بالأعراض والحالة والاختبارات الميكانيكية أو الكهربائية المناسبة.',
    focusTitle: 'من التحذير إلى خطة إصلاح واضحة',
    rrFocus: 'أرسل صورة التحذير أو نصه، وهل تبدأ السيارة بصورة طبيعية، وأعمال البطارية أو الإصلاح الحديثة، وهل يظهر العطل بعد الوقوف أو التسخين. لا تعني قراءة الرموز توفر الوصول إلى كل وحدة أو وظيفة برمجة أو معايرة؛ تُؤكد كل وظيفة قبل إدراجها في العرض.',
    defenderFocus: 'لتحذير الدفع أو الشاسيه، اذكر ظروف القيادة وأي صدمة أو تعرض للماء أو الرمال وتغير السلوك. قد تحتاج أنظمة ديفندر القديمة إلى فحص مختلف عن الحديثة. لا يعني التقييم الأولي توفر الترميز أو الوصول الأمني أو إصلاح الجهد العالي.',
    symptoms: ['تحذير المحرك أو منظومة الحركة أو التعليق أو الدفع الرباعي', 'خشونة أو تردد أو ضعف قوة أو مشكلة تشغيل متقطعة', 'عدة تحذيرات بعد ضعف البطارية أو عمل حديث', 'عطل متقطع يعود في ظروف معينة'],
    steps: [
      { title: 'تسجيل التحذير والسجل', description: 'مراجعة النص الكامل وسلوك السيارة والتوقيت والأعمال الحديثة ومعلومات سنة الطراز.' },
      { title: 'تأكيد الوصول المتوافق', description: 'تحديد الوحدات وبيانات الأعطال أو البيانات الحية المتاحة دون افتراض توفر البرمجة من قراءة رمز.' },
      { title: 'اختبار النظام المشتبه به', description: 'استخدام الفحص الفعلي أو الكهربائي أو الميكانيكي المناسب لمقارنة البيانات بالأعراض.' },
      { title: 'شرح الخطوة التالية', description: 'توضيح ما تأكد وما يحتاج إلى اختبار إضافي والإصلاح المدعوم الذي يمكن عرضه للموافقة.' },
    ],
    question: 'هل يحدد رمز العطل القطعة التالفة؟', answer: 'لا. يسجل الرمز حالة رصدها النظام. قد تحتاج التغذية أو الأسلاك أو بيانات الحساس أو مشكلة ميكانيكية إلى الفحص قبل التوصية بقطعة.',
  },
  'electrical-repair': {
    label: 'إصلاح الكهرباء', title: 'إصلاح الكهرباء وتتبع الأعطال',
    rrDescription: 'إصلاح كهرباء رينج روفر في القوز، دبي. فحص البطارية والشحن والأسلاك والشاشة واتصال الوحدات قبل اقتراح القطع.',
    defenderDescription: 'إصلاح كهرباء لاند روفر ديفندر في القوز، دبي. تقييم أعطال الجهد المنخفض والأسلاك والكاميرا والاتصال حسب التجهيزات.',
    rrIntro: 'تحتاج الشاشة المتقطعة أو التحذيرات أو تفريغ البطارية أو أعطال الملحقات إلى تتبع كهربائي. نراجع مشكلة رينج روفر مع التغذية منخفضة الجهد والشحن والدوائر وبيانات الوحدات المدعومة. لا يثبت عطل العرض أو الاتصال تلف وحدة؛ وتُؤكد البرمجة والتكامل بصورة منفصلة.',
    defenderIntro: 'يتبع إصلاح كهرباء ديفندر الجيل والأنظمة المركبة. نُسجل ظروف أعطال التشغيل أو الشحن أو الإنارة أو الكاميرا أو التحذيرات المتقطعة، ثم نفحص دائرة الجهد المنخفض أو النظام المعني. تساعد أعمال البطارية والملحقات والتعرض خارج الطريق في وصف المشكلة دون إثبات تلف حساس أو وحدة.',
    focusTitle: 'التغذية منخفضة الجهد والأسلاك والاتصال',
    rrFocus: 'قد تفسر حالة البطارية والشحن والتأريض والوصلات والقياسات المناسبة عدة تحذيرات تبدو غير مرتبطة. قد تأتي مشكلة الشاشة أو الكاميرا من التغذية أو الإشارة أو الأسلاك أو العرض. يُؤكد توافق الاستبدال والترميز والتهيئة قبل قبول العمل؛ قراءة الرمز لا تعني وعداً بالبرمجة.',
    defenderFocus: 'وضح الوظيفة التي تتوقف وهل تتغير المشكلة مع الحرارة أو الحركة أو الوقوف أو تركيب ملحق. لا تُفترض الشبكات والكاميرات والحساسات الحديثة على ديفندر القديمة. تقود اختبارات الدائرة والبيانات المتاحة الإصلاح؛ ويُؤكد التركيب الإضافي أو معايرة الكاميرا أو الجهد العالي بصورة مستقلة.',
    symptoms: ['تفريغ البطارية أو تحذير الشحن أو عدم تشغيل متقطع', 'تغير عمل الشاشة أو كاميرا الرجوع أو ملحق مركب', 'مشكلة إنارة أو مفتاح أو حساس أو أسلاك', 'عدة تحذيرات أو أعطال اتصال بعد أعمال البطارية أو الإصلاح'],
    steps: [
      { title: 'تحديد الوظيفة المتأثرة', description: 'توثيق التجهيزات والملحقات الأصلية أو المضافة والتوقيت وأعمال البطارية وظروف التقطع.' },
      { title: 'فحص التغذية منخفضة الجهد', description: 'تقييم البطارية والشحن والتأريض والفيوزات أو التوصيلات المعنية حسب المشكلة.' },
      { title: 'تتبع الدائرة والبيانات', description: 'استخدام قياسات الجهد أو الاستمرارية أو التيار أو الاتصال المناسبة دون اختيار قطعة من التحذير وحده.' },
      { title: 'تأكيد الإصلاح والتكامل', description: 'عرض إصلاح الأسلاك أو القطع المتاح وتأكيد أي ترميز أو إعداد أو تحقق مطلوب بصورة مستقلة.' },
    ],
    question: 'هل غياب صورة الكاميرا يثبت تلفها؟', answer: 'لا. قد تسبب التغذية أو الأسلاك أو الوصلات أو الإشارة أو الشاشة أو الاتصال أعراضاً مشابهة. تحدد التجهيزات ونتائج الفحص الإصلاح المتاح.',
  },
  'ac-repair': {
    label: 'إصلاح التكييف', title: 'إصلاح التكييف وفحص التبريد',
    rrDescription: 'إصلاح تكييف رينج روفر في القوز، دبي. فحص ضعف التبريد والهواء ومناطق المقصورة والتسرب والكهرباء قبل الخدمة.',
    defenderDescription: 'إصلاح تكييف لاند روفر ديفندر في القوز، دبي. تقييم ضعف التبريد والهواء والتسرب والتحكم قبل اقتراح الغاز أو القطع.',
    rrIntro: 'يحتاج إصلاح تكييف رينج روفر إلى أكثر من تعبئة غاز. نراجع الهواء والتبريد أثناء الوقوف والسير ومناطق المقصورة الأمامية أو الخلفية عند وجودها. يحدد ملصق السيارة وتصميم النظام والمعدات المتوافقة والاختبارات نوع الغاز ونطاق الإصلاح المناسب.',
    defenderIntro: 'عند ضعف تكييف ديفندر، وضح هل يبقى الهواء قوياً لكنه دافئ، أم ينخفض تدفقه، أم تتغير المشكلة في الازدحام. يساعد الغبار والاستخدام والأعمال السابقة في تحديد الفحوص، دون إثبات تسرب أو تلف ضاغط. تختلف تجهيزات التكييف والغاز والوصول بحسب جيل السيارة ومواصفاتها.',
    focusTitle: 'تدفق الهواء والتسرب والتحكم بالحرارة',
    rrFocus: 'ميّز بين اختلاف الحرارة أماماً وخلفاً وضعف التبريد في المقصورة كلها. قد تشمل الفحوص حرارة الفتحات والهواء والضغط والتسرب والمراوح وتحكم الضاغط أو المشغلات. يؤثر تصميم المقصورة والوصول في العرض؛ لا يثبت عطل واحد ضرورة استبدال النظام كله.',
    defenderFocus: 'قد يشمل الفحص انسداد الفلتر وحالة المكثف الظاهرة والمراوح وأدلة التسرب وبيانات التحكم بحسب الشكوى. قد يختلف تركيب التكييف في ديفندر القديمة أو المعدلة عن 90 أو 110 أو 130 الحديثة. يُحدد المركب فعلياً قبل اختيار القطع أو الغاز أو الإجراءات.',
    symptoms: ['هواء دافئ أو تبريد ضعيف أو تغير الحرارة في الازدحام', 'انخفاض تدفق الهواء أو اختلاف تبريد مناطق المقصورة عند وجودها', 'ضجيج غير معتاد من المروحة أو منطقة الضاغط', 'عودة ضعف التبريد بعد أعمال غاز سابقة'],
    steps: [
      { title: 'وصف نمط التبريد', description: 'تسجيل الهواء والفتحات أو المناطق المتأثرة والفرق بين الوقوف والسير وأعمال التكييف السابقة.' },
      { title: 'تأكيد النظام المركب', description: 'مراجعة ملصق الغاز والتجهيزات ومعدات الخدمة المتوافقة قبل إضافة الغاز.' },
      { title: 'اختبار الأداء والتسرب', description: 'استخدام فحوص الحرارة والهواء والضغط والتسرب والكهرباء المناسبة لتحديد مسار المشكلة.' },
      { title: 'عرض العمل وإعادة الفحص', description: 'تأكيد القطع والوصول وكميات الغاز والإصلاح المتفق عليه ثم تقييم التبريد في ظروف مناسبة.' },
    ],
    question: 'هل تعبئة الغاز أول إصلاح مناسب للهواء الدافئ؟', answer: 'ليس تلقائياً. قد تتعلق المشكلة بالهواء أو التحكم الكهربائي أو المروحة أو التسرب. يُؤكد الغاز المركب ويُفحص النظام قبل اقتراح التعبئة أو القطع.',
  },
  'brake-repair': {
    label: 'إصلاح الفرامل', title: 'إصلاح الفرامل وفحصها',
    rrDescription: 'إصلاح فرامل رينج روفر في القوز، دبي. فحص فحمات سبورت SVR والأقراص والتحذيرات والاهتزاز بحسب نظام الفرامل المركب.',
    defenderDescription: 'إصلاح فرامل لاند روفر ديفندر في القوز، دبي. تقييم تآكل الفحمات والأقراص والسائل والاهتزاز مع مراعاة الاستخدام والتجهيزات.',
    rrIntro: 'يحتاج ضجيج فرامل رينج روفر أو اهتزازها أو تحذيرها إلى فحص القطع المركبة وظروف العرض. نراجع الفحمات والأقراص والكليبر والسائل والمعلومات الإلكترونية المناسبة قبل اقتراح القطع. لا تحدد شارة سبورت أو أوتوبيوغرافي وحدها مقاس الفرامل أو إجراءاتها.',
    defenderIntro: 'يراعي فحص فرامل ديفندر الازدحام اليومي والسحب أو القيادة خارج الطريق مع التآكل الفعلي والأعراض. نحدد الجيل والقطع المركبة ثم نراجع الفحمات والأقراص والكليبر والسائل والتحذيرات. قد يحتاج اهتزاز العجلات أو الشاسيه إلى فحص منفصل عن تآكل الفرامل.',
    focusTitle: 'القياسات قبل استبدال القطع',
    rrFocus: 'وضح هل يظهر الاهتزاز في الدواسة أو المقود أو الهيكل وعند أي سرعة. تساعد القياسات والفحص في تمييز التآكل ومشاكل الهيدروليك وأسباب الاهتزاز الأخرى. تُؤكد إجراءات فرامل الوقوف الإلكترونية وإعادة الضبط المدعومة للسيارة المحددة.',
    defenderFocus: 'اذكر تغير الفرامل بعد السحب أو الرمال أو الصدمة أو أعمال العجلات الحديثة. قد يشمل الفحص التلوث الظاهر وحالة القطع والسائل وتأثير العجلات أو التعليق. تختلف الوظائف الإلكترونية الحديثة عن الترتيبات الأقدم، ولا تُفترض باقة فرامل واحدة للجميع.',
    symptoms: ['تحذير تآكل الفرامل أو نظام الفرامل', 'اهتزاز أو تغير إحساس الفرملة', 'حك أو طحن مستمر أو ضجيج فرامل جديد', 'تسرب سائل أو دواسة رخوة أو ضعف الفرملة'],
    steps: [
      { title: 'توثيق مشكلة الفرملة', description: 'مراجعة التحذير وإحساس الدواسة والسرعة والعمل الحديث والاستخدام ونظام الفرامل المركب.' },
      { title: 'الفحص والقياس', description: 'تقييم الفحمات والأقراص والكليبر والخراطيم والسائل بدلاً من اختيار القطع من الضجيج وحده.' },
      { title: 'تأكيد القطع والإجراءات', description: 'مطابقة القطع والسائل ومتطلبات فرامل الوقوف الإلكترونية والوظائف المدعومة للسيارة.' },
      { title: 'الموافقة والتحقق', description: 'شرح الإصلاح وإجراء فحوص التسرب والدواسة والتحذيرات أو الطريق بحسب حالة السيارة.' },
    ],
    question: 'متى أتجنب القيادة عند وجود مشكلة فرامل؟', answer: 'توقف بأمان إذا تغيرت قدرة الفرملة أو إحساس الدواسة أو تسرب السائل أو ظهر توجيه عاجل للفرامل. رتب نقل السيارة إذا لم تكن الفرملة آمنة واتبع دليلها.',
  },
  'oil-change': {
    label: 'تغيير الزيت والصيانة', title: 'تغيير الزيت والصيانة',
    rrDescription: 'تغيير زيت رينج روفر وصيانتها في القوز، دبي. تأكيد مواصفة زيت المحرك والفلاتر والبنود المستحقة والسجل قبل عرض الخدمة.',
    defenderDescription: 'تغيير زيت لاند روفر ديفندر وصيانتها في القوز، دبي. مطابقة زيت المحرك والفلاتر والفحوص للطراز والسجل والاستخدام.',
    rrIntro: 'تبدأ صيانة رينج روفر وتغيير زيتها بالمحرك وسنة الطراز والمسافة والسجل. نؤكد اعتماد الزيت ولزوجته وكميته والفلتر وإجراء قياس المستوى قبل العرض. تختلف خدمة الزيت عن الصيانة الكاملة أو فحص تسرب؛ ولا تتبع فوج وسبورت وأوتوبيوغرافي وفيلار وإيفوك جدولاً واحداً للجميع.',
    defenderIntro: 'تتبع خدمة ديفندر وتغيير الزيت المحرك المركب والجيل. نراجع الجدول والسجل والمسافة والاستخدام لتأكيد الزيت والفلاتر والفحوص وأي إعادة ضبط مدعومة. قد يبرر استخدام الرمال أو السحب أو التخزين مراجعة الحالة، دون اختراع فترة صيانة واحدة لجميع سيارات ديفندر.',
    focusTitle: 'الصيانة المستحقة والنتائج التي تحتاج إصلاحاً',
    rrFocus: 'أرسل رسالة الصيانة والفاتورة السابقة إن توفرت. يمكن تحديد الفلاتر المستحقة وفحص السوائل والتبريد والفرامل والبطارية والتعليق ضمن النطاق المتفق عليه. تحذير المستوى وضغط الزيت والتسرب مشاكل مختلفة؛ لا يشخصها مجرد إضافة الزيت أو تصفير المؤشر.',
    defenderFocus: 'اذكر آخر صيانة والقيادة خارج الطريق والأحمال ومدة التخزين. تُناقش حالة الفلاتر والتبريد وأسفل السيارة والفرامل والدفع مع جدول الطراز. تُؤكد زيوت وفلاتر وإجراءات ديفندر القديمة بصورة منفصلة عن 90 و110 و130 الحديثة.',
    symptoms: ['استحقاق رسالة الزيت أو الصيانة', 'سجل غير مكتمل أو عدم معرفة الزيت المستخدم سابقاً', 'عودة السيارة للاستخدام بعد التخزين أو شرائها حديثاً', 'ملاحظة مستوى زيت أو تسرب أو مشكلة إضافية لفحصها بصورة منفصلة'],
    steps: [
      { title: 'مراجعة سجل الصيانة', description: 'تأكيد المحرك والسنة والمسافة والمؤشر والأعمال السابقة والاستخدام الفعلي.' },
      { title: 'تأكيد الزيت والبنود المستحقة', description: 'مراجعة اعتماد الزيت وكميته والفلتر والأختام ومعلومات الصيانة المناسبة للسيارة.' },
      { title: 'الاتفاق على نطاق الصيانة', description: 'فصل العمل المجدول عن التسرب أو النتائج الإضافية التي تحتاج تقييم إصلاح وموافقة.' },
      { title: 'الإتمام والتوثيق', description: 'اتباع التعبئة وقياس المستوى الصحيحين وإجراء إعادة الضبط عند دعمها وتوثيق العمل المتفق عليه.' },
    ],
    question: 'هل يصلح زيت أو جدول صيانة واحد لجميع الطرازات؟', answer: 'لا. يحدد المحرك والسنة والسوق ومعلومات الخدمة والسجل والاستخدام الزيت والصيانة المستحقة. يحتاج تحذير ضغط الزيت إلى توقف آمن وتقييم، وليس حجز تغيير زيت روتيني فقط.',
  },
};

export function getR1ServiceContent(base: BrandServiceCombo | undefined, isArabic: boolean) {
  if (!base || !['range-rover-service-dubai', 'defender-service-dubai'].includes(base.brandSlug)) return undefined;
  const detail = (isArabic ? arabic : english)[base.serviceSlug];
  if (!detail) return undefined;
  const isRangeRover = base.brandSlug === 'range-rover-service-dubai';
  const name = isArabic ? isRangeRover ? 'رينج روفر' : 'لاند روفر ديفندر' : isRangeRover ? 'Range Rover' : 'Land Rover Defender';
  const titleLabel = base.serviceSlug === 'suspension-repair' ? isArabic ? 'إصلاح التعليق' : 'Suspension Repair'
    : base.serviceSlug === 'transmission-repair' ? isArabic ? 'إصلاح القير' : 'Gearbox Repair'
    : base.serviceSlug === 'mechanical-repair' ? isArabic ? 'إصلاح المحرك' : 'Engine Repair'
    : base.serviceSlug === 'engine-diagnostics' ? isArabic ? 'تشخيص أعطال' : 'Diagnostics'
    : base.serviceSlug === 'electrical-repair' ? isArabic ? 'إصلاح كهرباء' : 'Electrical Repair'
    : base.serviceSlug === 'ac-repair' ? isArabic ? 'إصلاح تكييف' : 'AC Repair'
    : base.serviceSlug === 'brake-repair' ? isArabic ? 'إصلاح فرامل' : 'Brake Repair'
    : isArabic ? 'تغيير زيت وصيانة' : 'Oil Change & Service';
  const combo: BrandServiceCombo = {
    ...base,
    brandName: name,
    serviceName: detail.label,
    serviceType: detail.title,
    h1: isArabic ? `${detail.title} ${name} في دبي` : `${name} ${detail.title} in Dubai`,
    metaTitle: isArabic ? `${titleLabel} ${name} في دبي | ديجي-تك` : `${name} ${titleLabel} Dubai | DIGITEC`,
    metaDescription: isRangeRover ? detail.rrDescription : detail.defenderDescription,
    heroCopy: isRangeRover ? detail.rrIntro : detail.defenderIntro,
    models: isRangeRover ? ['Range Rover', 'Range Rover Sport', 'Vogue', 'Autobiography', 'Velar', 'Evoque'] : ['Defender 90', 'Defender 110', 'Defender 130', 'Defender V8'],
    symptoms: detail.symptoms,
    processSteps: detail.steps,
    partsCopy: isArabic
      ? `يوضح عرض ${detail.label} لسيارة ${name} وقت الفحص والنتائج والقطع والسوائل والإجراءات المدعومة وفحوص التحقق المناسبة. تُراجع مطابقة رقم الهيكل والمصدر والتوفر قبل الطلب. تُناقش الاختبارات أو الأعمال الإضافية للموافقة قبل التنفيذ؛ وتتوقف المدة على النطاق والقطع.`
      : `The ${name} ${detail.label.toLowerCase()} estimate identifies assessment time, findings, proposed parts and fluids, supported procedures and suitable completion checks. VIN compatibility, source and availability are confirmed before ordering. Additional tests or work are discussed for approval first; timing follows scope and parts availability.`,
    faqs: [
      { question: detail.question, answer: detail.answer },
      ...(isRangeRover && base.serviceSlug === 'brake-repair' ? [{
        question: isArabic ? 'ما الذي يلزم لطلب تغيير فحمات رينج روفر سبورت SVR؟' : 'What is needed for a Range Rover Sport SVR brake-pad enquiry?',
        answer: isArabic ? 'أرسل سنة الصنع ورقم الهيكل والمسافة ونص التحذير أو وصف الضجيج أو الاهتزاز. تُراجع الفحمات والأقراص والكليبر والحساسات المركبة قبل اختيار القطع أو تحديد إن كان المطلوب تغيير الفحمات فقط. لا تحدد تسمية SVR وحدها المقاس أو رقم القطعة، ويحتاج اختيارها وتقدير العمل إلى تأكيد تجهيزات السيارة ونتائج الفحص.' : 'Send the year, VIN, mileage and exact warning, noise or vibration. Pad and disc measurements and inspection of the fitted calipers and sensors help establish whether pad replacement alone is appropriate. The SVR badge alone is not a brake size or part number; parts and work are confirmed against the vehicle and inspection findings.',
      }] : []),
      { question: isArabic ? `هل تتبع جميع طرازات ${name} الإجراء نفسه؟` : `Do all ${name} models use the same procedure?`, answer: isArabic
        ? isRangeRover ? 'لا. تختلف المحركات والقير والتعليق والتجهيزات بحسب الطراز والجيل والسوق. لا تحدد تسمية فوج أو أوتوبيوغرافي وحدها المواصفات؛ تُراجع بيانات السيارة قبل تأكيد الخدمة.' : 'لا. تختلف التجهيزات بين 90 و110 و130 والفئات وسنوات الإنتاج. تُؤكد إجراءات ديفندر القديمة وقبول العمل بصورة منفصلة؛ ولا تُطبق عليها افتراضات الأنظمة الحديثة.'
        : isRangeRover ? 'No. Engines, transmissions, suspension and equipment vary by model, generation and market. Vogue or Autobiography wording does not establish the fitted specification; vehicle details are checked first.' : 'No. Equipment varies across 90, 110, 130, variants and model years. Older Defender procedures and acceptance are confirmed separately, without assuming modern systems are fitted.' },
      { question: isArabic ? `ما الذي يحدد تكلفة ${detail.label}؟` : `What determines the ${detail.label.toLowerCase()} quote?`, answer: isArabic
        ? 'تؤثر بيانات السيارة ووقت الفحص والنتائج والوصول والقطع والسوائل وأجرة العمل وأي وظائف مدعومة في العرض. قد يلزم فحص قبل تسعير الإصلاح؛ لا نضع سعراً واحداً لجميع الطرازات.'
        : 'Vehicle details, assessment time, findings, access, parts, fluids, labour and any supported functions determine the estimate. An inspection may be needed before a repair quote; one price is not applied to every model.' },
      { question: isArabic ? 'كيف أطلب موعداً في القوز؟' : 'How do I request an appointment in Al Quoz?', answer: isArabic
        ? 'راسل ديجي-تك أو اتصل على +971 4 340 2223 مع الطراز والسنة والمسافة والسجل والتحذير أو الأعراض. الورشة في القوز الصناعية 3، دبي. يفتح واتساب مسودة؛ راجعها واضغط إرسال، ثم يؤكد الفريق النطاق والموعد المتاح.'
        : 'Message DIGITEC or call +971 4 340 2223 with the model, year, mileage, history and warning or symptoms. The workshop is in Al Quoz Industrial Area 3, Dubai. Review and send the WhatsApp draft; the team then confirms scope and appointment availability.' },
    ],
    whatsAppMessage: isArabic
      ? `مرحباً ديجي-تك، أود الاستفسار عن ${detail.label} لسيارة ${name}.\n\nالطراز والسنة: \nالمسافة: \nسجل الصيانة: \nالتحذير أو الأعراض ووقت ظهورها: `
      : `Hello DIGITEC, I would like to enquire about ${name} ${detail.label.toLowerCase()}.\n\nModel and year: \nMileage: \nService history: \nWarning or symptoms and when they occur: `,
  };
  const relevantService: ServiceKey = ['engine-diagnostics', 'electrical-repair'].includes(base.serviceSlug) ? 'mechanical-repair' : 'engine-diagnostics';
  return {
    combo,
    scopeHeading: isArabic ? `${detail.label}: الفحص حسب تجهيزات السيارة` : `${name} ${detail.label}: the assessment scope`,
    focusTitle: detail.focusTitle,
    focus: isRangeRover ? detail.rrFocus : detail.defenderFocus,
    modelNote: isArabic
      ? isRangeRover ? 'نراجع سبورت وفوج وأوتوبيوغرافي وفيلار وإيفوك حسب بيانات السيارة. قد تختلف التجهيزات بين الأجيال والفئات؛ لا تُفترض مواصفة المحرك أو القير أو التعليق من الاسم وحده.' : 'تختلف ديفندر الحديثة 90 و110 و130 وفئات V8 عن الأجيال القديمة. أرسل سنة الصنع ورقم الهيكل؛ تُؤكد إمكانية قبول ديفندر القديمة وقطعها وإجراءاتها قبل الحجز، ولا تُفترض أنظمة الهواء أو الإلكترونيات الحديثة عليها.'
      : isRangeRover ? 'Sport, Vogue, Autobiography, Velar and Evoque enquiries are reviewed against the exact vehicle. Generations and variants can differ; a model or trim name alone does not establish the engine, gearbox or suspension specification.' : 'Modern Defender 90, 110, 130 and V8 variants differ from older generations. Send the year and VIN: acceptance, parts and procedures for an older Defender are confirmed before booking, without assuming modern air or electronic systems.',
    links: [
      { path: `/brands/${base.brandSlug}`, label: isArabic ? `خدمات ${name} والصيانة` : `${name} service and repair` },
      { path: `/brands/${base.brandSlug}/${relevantService}`, label: isArabic ? relevantService === 'engine-diagnostics' ? `تشخيص أعطال ${name}` : `فحص محرك ${name} والتبريد` : relevantService === 'engine-diagnostics' ? `${name} warning-light diagnostics` : `${name} engine and cooling assessment` },
      { path: isRangeRover ? base.serviceSlug === 'suspension-repair' ? '/blog/range-rover-land-rover-air-suspension-problems-dubai' : '/blog/range-rover-maintenance-guide-dubai' : '/blog/defender-service-dubai-guide', label: isArabic ? isRangeRover ? base.serviceSlug === 'suspension-repair' ? 'فهم أعراض التعليق الهوائي' : 'دليل تخطيط صيانة رينج روفر' : 'دليل صيانة ديفندر والاستخدام' : isRangeRover ? base.serviceSlug === 'suspension-repair' ? 'Understanding air-suspension symptoms' : 'Range Rover maintenance planning guide' : 'Defender maintenance and use guide' },
    ],
  };
}
