import type { BrandServiceCombo, ServiceKey } from './brandServices';

// Reviewed service-specific content for the approved Search Console owners.
// Apply before localization; these are not new landing pages or capability claims.
type Content = Partial<BrandServiceCombo>;
const bmw: Partial<Record<ServiceKey, Content>> = {
  'oil-change': {
    metaTitle: 'BMW Oil Change Dubai | Engine-Specific Service | DIGI-TEC',
    metaDescription: 'BMW oil and filter service in Al Quoz. The engine, applicable BMW oil approval, service display and history guide the agreed maintenance scope.',
    heroCopy: 'A BMW oil-service booking begins with the model, engine, year, Condition Based Service display and service history. DIGI-TEC confirms the applicable oil approval, filter and quantity before work. An oil-pressure warning or active leak needs investigation rather than a routine oil change. Dubai driving conditions inform an inspection, but there is no one interval or oil grade for every BMW.',
    faqs: [
      { question: 'Does every BMW use the same oil or interval?', answer: 'No. The engine, model year, applicable approval and vehicle service information determine the oil and schedule. The Condition Based Service display and history help plan the work.' },
      { question: 'Will an oil change resolve an oil-pressure warning?', answer: 'Not necessarily. Follow the vehicle warning and stop safely if it instructs you to stop. The level, pressure and underlying cause need checking before routine maintenance.' },
      { question: 'Can you reset the BMW service reminder?', answer: 'A supported reminder reset follows the maintenance actually performed. The available function is confirmed for the exact vehicle.' },
    ],
  },
  'brake-repair': {
    metaDescription: 'BMW brake inspection and repair in Al Quoz. Pads, discs, sensors, calipers and the fitted standard or M brake system are checked before parts are quoted.',
    heroCopy: 'Squealing, grinding, vibration or a brake warning can have different causes. DIGI-TEC measures wear, checks discs, pads, calipers, sensors and fluid condition, and identifies the fitted standard, M Sport or M system before proposing parts. A warning alone does not prove pad or disc replacement is due.',
    faqs: [
      { question: 'Does a BMW brake warning always mean new pads?', answer: 'No. The warning, wear sensor, measured pad and disc condition, fluid and control-system information must be checked.' },
      { question: 'Are BMW M brakes serviced like standard brakes?', answer: 'The fitted hardware determines parts and procedure. M Sport, M Compound and optional ceramic systems must be identified before a quote.' },
      { question: 'When should I stop driving with a brake concern?', answer: 'Stop safely if braking performance or pedal feel changes, fluid is leaking, or the vehicle displays an urgent brake instruction. Arrange recovery if braking is unsafe.' },
    ],
  },
  'transmission-repair': {
    heroCopy: 'Delayed engagement, rough shifts, slipping or a gearbox warning need diagnosis before a BMW transmission repair is quoted. At DIGI-TEC in Al Quoz, we identify the fitted gearbox and review the service history, fault data and driving symptoms. A fluid and filter service, a control-system fault and internal gearbox wear require different decisions; a service is not presented as a cure for every warning.',
    symptoms: ['Delayed engagement into Drive or Reverse', 'Rough shifts, slipping or judder under load', 'Transmission warning or reduced drive', 'A fluid leak, unusual noise or change in shift behaviour'],
    processSteps: [
      { title: 'Identify the gearbox and symptom', description: 'Confirm the model, year, fitted transmission and service history. Automatic, dual-clutch and manual units have different inspection and maintenance requirements.' },
      { title: 'Separate control faults from wear', description: 'Review supported fault and live data, leaks and relevant driveline checks. Describe when the symptom occurs, including whether the gearbox is cold or warm.' },
      { title: 'Compare service and repair options', description: 'Fluid/filter maintenance, wiring or control faults and internal repair are assessed separately. Further dismantling, repair availability, parts and costs are agreed from the findings.' },
      { title: 'Verify the agreed work', description: 'Confirm the applicable fluid and level procedure. Carry out supported adaptations only when required, then check the original concern under appropriate conditions.' },
    ],
    faqs: [
      { question: 'Will a BMW gearbox oil change fix rough shifts?', answer: 'Not necessarily. Fluid condition is one possible factor. Fault data, engagement, leaks and the fitted transmission need assessment before deciding between maintenance and repair.' },
      { question: 'Can the gearbox be repaired rather than replaced?', answer: 'The cause, component condition, parts and supported repair scope determine the options. A replacement is not recommended solely from a dashboard warning; any further investigation is agreed first.' },
      { question: 'What determines BMW transmission repair cost?', answer: 'Diagnostic time, gearbox variant, access, fluid and filter requirements, parts and the approved repair determine the quote. Send the model, year, mileage and symptoms to arrange an inspection.' },
      { question: 'Do all BMW gearboxes use the same fluid or interval?', answer: 'No. The fitted transmission, vehicle specification, service schedule and history determine the required fluid, procedure and due maintenance.' },
    ],
  },
  'engine-diagnostics': {
    h1: 'BMW Diagnostics & Supported Coding in Dubai',
    metaTitle: 'BMW ISTA+ Diagnostics & Coding Dubai | DIGI-TEC',
    metaDescription: 'BMW ISTA+ diagnostics in Al Quoz for warnings and drivability faults. Coding and programming are separate, supported functions confirmed for your vehicle.',
    heroCopy: 'A BMW warning light, drivetrain message, rough idle or intermittent fault needs more than a code reset. DIGI-TEC uses ISTA+ capability to review supported fault data, live values and test plans, then checks relevant mechanical or electrical causes. A code directs testing; it does not automatically identify a failed part. Diagnosis, coding and programming are different tasks, and each requested function is confirmed for the exact vehicle and control unit before work.',
    symptoms: ['Engine or drivetrain warning, misfire or reduced performance', 'Starting problem or intermittent electrical function', 'A fault that returns after clearing or a previous repair', 'A specific coding or replacement-module question needing compatibility review'],
    processSteps: [
      { title: 'Describe the concern', description: 'Share model, year, mileage, warning text and when it occurs. Mention recent battery, module or mechanical work.' },
      { title: 'Confirm access and collect evidence', description: 'Check compatible module access and review supported fault and live data. Codes help direct testing; they do not establish which part to replace.' },
      { title: 'Test or assess the requested function', description: 'Use relevant circuit or mechanical tests for a fault. For coding or programming, confirm the requested function, hardware, software, access and power-supply requirements first.' },
      { title: 'Explain findings and next steps', description: 'Separate confirmed faults, further testing and repair costs. Retrofit supply or installation is not promised solely because a coding function exists.' },
    ],
  },
  'suspension-repair': {
    metaTitle: 'BMW Suspension & Air Suspension Repair Dubai | DIGI-TEC',
    metaDescription: 'BMW suspension inspection in Al Quoz for knocks, uneven ride height and chassis warnings. Air or adaptive components are assessed where fitted.',
    heroCopy: 'A knock, harsh ride, leaning corner or chassis warning needs the fitted system identified first. DIGI-TEC inspects arms, bushes, dampers, tyres and alignment; on air-equipped BMWs, the air circuit, compressor, valves and height sensing may need separate tests. A warning or low corner does not by itself prove a failed strut or compressor.',
    faqs: [
      { question: 'Does every BMW have air or adaptive suspension?', answer: 'No. Spring, damper and ride-height equipment vary by model, generation and options. The fitted components are identified before testing or quoting.' },
      { question: 'Does a low corner mean the air strut has failed?', answer: 'Not always. Air lines, valves, sensors, compressor operation and the strut can affect ride height. The source of a leak or control fault needs isolation.' },
      { question: 'Can a suspension warning be diagnosed with ISTA+ alone?', answer: 'Supported fault and live data help direct checks, but wiring, supply voltage and physical components may also need inspection.' },
    ],
  },
  'ac-repair': {
    metaDescription: 'BMW AC repair in Al Quoz for warm air, weak cooling and airflow faults. Refrigerant circuit, fans and controls are checked before a recharge or repair.',
    heroCopy: 'Weak BMW AC cooling can involve refrigerant loss, condenser airflow, fan operation, a compressor, a blower or climate controls. DIGI-TEC checks the symptom at idle and while driving, then tests the relevant circuit. The refrigerant type and quantity come from the vehicle specification; a recharge is not presented as a cure for every cooling complaint.',
  },
  'mechanical-repair': {
    metaTitle: 'BMW Engine & Mechanical Repair Dubai | DIGI-TEC',
    metaDescription: 'BMW engine and mechanical repair assessment in Al Quoz for leaks, overheating, rough running and power loss. A diagnosis precedes a repair quote.',
    heroCopy: 'An oil stain, coolant loss, rough idle, overheating or reduced power does not identify one failed BMW component. DIGI-TEC checks the exact engine and history, then inspects the relevant cooling, lubrication, ignition, fuel, boost or mechanical path. VANOS and Valvetronic concerns are assessed where fitted and indicated by evidence. The repair proposal separates confirmed findings from further testing or dismantling.',
  },
  'battery-replacement': {
    metaTitle: 'BMW Battery Replacement & Registration Dubai | DIGI-TEC',
    metaDescription: 'BMW 12V battery, charging and drain checks in Al Quoz. Replacement specification and supported battery registration are confirmed for the vehicle.',
    heroCopy: 'A BMW battery warning, slow start or repeated discharge may involve the 12-volt battery, charging system, connections or unwanted current draw. DIGI-TEC tests the low-voltage system and confirms the correct battery type and capacity before replacement. Registration, and coding after a specification change where required, depend on the fitted energy-management system and supported function. An EV high-voltage battery is outside this page’s 12-volt scope.',
  },
  'electrical-repair': {
    metaTitle: 'BMW Electrical & iDrive Fault Repair Dubai | DIGI-TEC',
    metaDescription: 'BMW electrical and iDrive fault assessment in Al Quoz for screens, modules, wiring and intermittent functions. Repair scope follows diagnosis.',
    heroCopy: 'A black screen, iDrive reboot, camera fault or repeated battery drain can involve supply voltage, wiring, display, head unit or module communication. DIGI-TEC traces the reported function and identifies the fitted CCC, CIC, NBT or later architecture where relevant. Fault repair differs from an audio or infotainment upgrade. Coding and programming are offered only if the vehicle, module and required access support the requested function.',
    faqs: [
      { question: 'Does a black BMW iDrive screen mean the head unit must be replaced?', answer: 'No. Power supply, display, software state, wiring and communication need checking before a unit is condemned.' },
      { question: 'Can every BMW module be coded or programmed?', answer: 'No. The vehicle generation, control unit, function, hardware and required access determine what is supported.' },
      { question: 'Is an iDrive upgrade the same as repairing a fault?', answer: 'No. A fault investigation identifies why the current system does not work. A retrofit or upgrade requires separate compatibility and scope confirmation.' },
    ],
  },
};

const porsche: Partial<Record<ServiceKey, Content>> = {
  'oil-change': {
    metaTitle: 'Porsche Oil Change Dubai | Correct Oil Approval | DIGI-TEC',
    metaDescription: 'Porsche oil and filter service in Al Quoz. DIGI-TEC confirms the engine, approved oil, quantity, filter and supported reminder reset before quoting.',
    heroCopy: 'A Porsche oil service starts with the exact engine, model year and applicable maintenance information. DIGI-TEC checks the required oil approval and viscosity, filter, fill quantity and level procedure before quoting. A service reminder, oil-level concern and oil-pressure warning call for different actions; an oil-pressure warning should not be treated as a routine oil-change booking. Dubai use and history inform the inspection, but do not create one interval for every Porsche.',
    faqs: [
      { question: 'Does every Porsche use the same engine oil?', answer: 'No. Approval, viscosity, quantity and filter vary by engine, model year and market. The applicable vehicle information is checked before oil is selected.' },
      { question: 'Is an oil-pressure warning solved by an oil change?', answer: 'Not necessarily. Stop safely if the vehicle instructs you to stop or oil pressure is low. The level, pressure and underlying cause need assessment before routine service.' },
      { question: 'Can DIGI-TEC reset my Porsche service reminder?', answer: 'A reminder reset can be included after the agreed work where the function is supported for the exact vehicle. Available PIWIS 3 functions are confirmed before booking.' },
      { question: 'What determines the oil-service quote?', answer: 'The engine, required oil approval and quantity, filter, seals, access and agreed inspection scope determine the estimate. No single price applies across the Porsche range.' },
    ],
  },
  'brake-repair': {
    metaTitle: 'Porsche Brake Repair Dubai | Steel, PSCB & PCCB | DIGI-TEC',
    metaDescription: 'Porsche brake inspection and repair in Al Quoz for the fitted steel, PSCB or PCCB system. Pads, discs, fluid and repair scope confirmed after measurement.',
    heroCopy: 'Porsche brake work starts by identifying the fitted steel, surface-coated or ceramic-composite system. DIGI-TEC measures the relevant wear items, checks pedal feel and warning data, and assesses calipers, fluid and electronic parking-brake functions where fitted. PCCB components need their own inspection and handling criteria. A brake warning or vibration is a reason to inspect, not proof that pads or discs alone require replacement.',
    faqs: [
      { question: 'Does every Porsche have ceramic brakes?', answer: 'No. The fitted brake package depends on model, generation and option. Parts and inspection methods are selected from the actual vehicle.' },
      { question: 'Does a Porsche brake warning always mean new pads?', answer: 'No. Wear, sensor, fluid, ABS, parking-brake and power-supply concerns are possible. The exact warning and measured condition guide the next step.' },
      { question: 'Can PCCB be assessed like a steel disc?', answer: 'No. Porsche ceramic-composite brakes require system-specific inspection, compatible parts and handling. The workshop confirms the exact scope before accepting work.' },
      { question: 'When should I stop driving with a brake concern?', answer: 'Stop safely for a red brake warning, changed pedal feel, fluid loss or reduced braking. Do not continue driving merely to reach a workshop if braking is unsafe.' },
    ],
  },
  'transmission-repair': {
    h1: 'Porsche Transmission & PDK Repair in Dubai',
    metaTitle: 'Porsche Transmission & PDK Repair Dubai | DIGI-TEC',
    metaDescription: 'Porsche PDK, Tiptronic and manual transmission assessment in Al Quoz. Jerking, delayed engagement, slipping and warnings diagnosed before repair is quoted.',
    heroCopy: 'PDK, Tiptronic and manual gearboxes have different operating principles, fluids and service procedures. DIGI-TEC identifies the fitted unit and records whether a jerk, slip, delayed engagement or warning occurs cold, hot, under load or in a particular mode. PIWIS 3 data where supported is considered alongside leak, mount, engine and driveline checks. Fluid service, control repair and internal work are separate decisions; a PDK symptom alone does not justify gearbox replacement.',
    faqs: [
      { question: 'Does PDK jerking mean the gearbox needs replacing?', answer: 'No. Temperature, clutch control, engine torque, mounts, tyres and driveline condition can affect the sensation. The exact symptom and fitted unit must be diagnosed.' },
      { question: 'Are PDK and Tiptronic serviced the same way?', answer: 'No. They are different transmission designs with vehicle-specific fluids, fill procedures and maintenance requirements. The gearbox is identified before work is quoted.' },
      { question: 'Can PIWIS 3 identify a Porsche transmission fault?', answer: 'Supported fault, live and adaptation data can direct testing, but a code alone does not confirm a failed part. Available functions depend on the vehicle and control unit.' },
      { question: 'When should I avoid driving with a gearbox warning?', answer: 'Follow the displayed instruction. Stop and arrange recovery if drive is lost, severe slipping occurs, there is a significant leak or the vehicle directs you not to continue.' },
    ],
  },
  'suspension-repair': {
    h1: 'Porsche Suspension & PASM Repair in Dubai',
    metaTitle: 'Porsche Suspension & PASM Repair Dubai | DIGI-TEC',
    metaDescription: 'Porsche suspension inspection in Al Quoz for ride-height changes, noise, vibration and PASM warnings. Fitted equipment is confirmed before repair.',
    heroCopy: 'Porsche suspension work depends on the fitted springs, dampers, PASM, PDCC and air-suspension equipment. DIGI-TEC combines the exact warning and PIWIS 3 data where supported with physical checks of joints, bushes, dampers, tyres, leaks and ride height. A PASM warning does not prove a damper has failed, and an overnight drop needs leak isolation before a compressor or air spring is proposed.',
    faqs: [
      { question: 'Does every Porsche have PASM or air suspension?', answer: 'No. Suspension equipment varies by model, generation and specification. The fitted system is confirmed before fault testing or parts selection.' },
      { question: 'Does a PASM warning mean a damper must be replaced?', answer: 'No. Power supply, wiring, sensors, control and mechanical condition may all need checking. Fault data is combined with a physical inspection.' },
      { question: 'What if my Porsche drops at one corner overnight?', answer: 'Record the height change on level ground and avoid driving if tyre contact or severe imbalance is possible. Air loss, valves, lines, sensors and compressor condition need separate checks.' },
      { question: 'Will alignment be needed after suspension work?', answer: 'It depends on the repaired component and vehicle procedure. Ride-height or steering calibration and geometry are confirmed for the actual repair.' },
    ],
  },
  'ac-repair': {
    metaTitle: 'Porsche AC Repair Dubai | Cooling & Leak Diagnosis | DIGI-TEC',
    metaDescription: 'Porsche AC repair in Al Quoz. Cooling at idle and speed, airflow, refrigerant leaks and fitted climate controls are checked before repair.',
    heroCopy: 'Warm air, weak airflow and cooling that changes between idle and road speed can have different causes. DIGI-TEC checks condenser airflow, fans, cabin filter, refrigerant circuit and control signals as indicated by the symptom. The refrigerant type and charge are read from the vehicle label; repeated top-ups are not offered as a substitute for locating a leak. Taycan thermal concerns are accepted only within confirmed workshop scope.',
    faqs: [
      { question: 'Will an AC regas fix a Porsche that blows warm air?', answer: 'Only if low charge is the cause and any leak is addressed. Airflow, fans, controls, sensors and compressor operation may also need checking.' },
      { question: 'Which refrigerant does my Porsche use?', answer: 'The vehicle label and model-specific service information determine the correct refrigerant and charge. These are confirmed before equipment is connected.' },
      { question: 'Why is the AC cooler while driving than at idle?', answer: 'Condenser airflow, fan operation, pressure control and charge are possible factors. Measuring the system under both conditions is more useful than assuming a compressor fault.' },
      { question: 'Can DIGI-TEC inspect Taycan climate concerns?', answer: 'The concern can be reviewed, but any high-voltage or battery-thermal work requires separate confirmation of workshop capability and the exact vehicle scope.' },
    ],
  },
  'mechanical-repair': {
    metaTitle: 'Porsche Engine & Mechanical Repair Dubai | DIGI-TEC',
    metaDescription: 'Porsche mechanical repair assessment in Al Quoz for overheating, leaks, running faults and driveline concerns. Inspection precedes an itemized repair quote.',
    heroCopy: 'An oil stain, temperature rise, rough running or vibration does not identify a failed component by itself. DIGI-TEC identifies the Porsche engine and driveline, reviews the exact symptom and service history, and checks the relevant cooling, lubrication, ignition, mount or mechanical path. The repair proposal separates confirmed findings from any further testing or dismantling.',
    faqs: [
      { question: 'Does an oil stain identify the leaking Porsche seal?', answer: 'No. Oil can travel along covers and undertrays. The highest fresh source is traced after inspection or cleaning where needed.' },
      { question: 'Can overheating be handled as routine service?', answer: 'A rising temperature or coolant loss needs diagnosis first. Stop safely if the vehicle warns of overheating; continued operation can cause further damage.' },
      { question: 'Do you repair every Porsche engine variant?', answer: 'Inspection and available repair scope are confirmed for the exact engine and concern. Specialized work, parts and procedures are assessed before accepting a job.' },
    ],
  },
  'battery-replacement': {
    metaTitle: 'Porsche 12V Battery Replacement Dubai | DIGI-TEC',
    metaDescription: 'Porsche 12V battery and charging assessment in Al Quoz. Battery specification, fitting and supported registration are confirmed by vehicle.',
    heroCopy: 'A Porsche battery warning or no-start condition may involve the 12-volt battery, charging system, connection or parasitic draw. DIGI-TEC tests the low-voltage supply and confirms the correct battery specification before replacement. Any required registration or coding is carried out only when supported for the exact vehicle. High-voltage traction-battery repair is a separate capability decision, not part of this service.',
    faqs: [
      { question: 'Does a Porsche battery warning always require replacement?', answer: 'No. Charging, cables, current monitoring or storage-related discharge may be involved. Testing comes before a replacement recommendation.' },
      { question: 'Will the new battery need registration?', answer: 'The requirement and supported function depend on the model and battery-management system. DIGI-TEC confirms the procedure for the vehicle before fitting.' },
      { question: 'Does this service include a Taycan high-voltage battery?', answer: 'No. This page covers 12-volt supply and related checks. High-voltage work requires separate scope and safety confirmation.' },
    ],
  },
  'electrical-repair': {
    metaTitle: 'Porsche Electrical Repair Dubai | Wiring & Modules | DIGI-TEC',
    metaDescription: 'Porsche electrical fault assessment in Al Quoz for wiring, charging, intermittent functions and module communication. Supported work confirmed after diagnosis.',
    heroCopy: 'Intermittent functions, repeated battery discharge, screen faults and communication warnings can stem from supply voltage, wiring, connectors, control units or the fitted equipment. DIGI-TEC records the exact condition, checks relevant circuits and uses supported PIWIS 3 data where helpful. Coding and programming are separate functions with vehicle, module and access requirements; neither is promised from a fault code alone.',
    faqs: [
      { question: 'Does a Porsche PCM screen fault mean the unit must be replaced?', answer: 'No. Power supply, connectors, software state, display and control-unit communication may need assessment before repair or replacement is discussed.' },
      { question: 'Can PIWIS 3 code every Porsche module?', answer: 'No. Available functions depend on model, generation, control unit, access and required procedure. DIGI-TEC confirms support for the requested function before accepting work.' },
      { question: 'Can repeated battery drain be traced?', answer: 'The pattern, 12-volt battery health, charging, sleep behaviour and affected circuits can be assessed. Intermittent faults may require staged observation.' },
    ],
  },
  'steering-repair': {
    heroCopy: 'Heavy steering, free play, a knock while turning or a steering warning needs the cause identified before parts are ordered. DIGI-TEC assesses Porsche steering concerns in Al Quoz, first identifying the fitted rack and electric or hydraulic assistance where applicable. Tyres, suspension joints and alignment can affect the same symptoms, so the inspection separates these from a rack, pump, sensor or wiring fault.',
    symptoms: ['Steering feels heavy, inconsistent or unusually loose', 'Knocking, vibration or noise while turning', 'A steering warning, assistance loss or visible fluid leak', 'Pulling or uneven tyre wear alongside a steering concern'],
    processSteps: [
      { title: 'Identify the fitted steering system', description: 'Confirm the Porsche model, year, installed rack and assistance type. Rear-axle steering or other optional equipment is considered only when fitted.' },
      { title: 'Inspect and trace the symptom', description: 'Check tyres, joints, boots, mounts and visible leakage. For hydraulic systems assess the relevant fluid and pressure circuit; for electric assistance review compatible fault data, power supply and wiring where indicated.' },
      { title: 'Choose a repair from the findings', description: 'Explain whether the concern involves an external joint, hose, electrical fault or rack assembly. Component repair, replacement and further testing depend on condition and confirmed workshop scope.' },
      { title: 'Check geometry and operation', description: 'Review alignment after relevant steering or suspension work. Required steering-angle calibration and verification are confirmed for the fitted system and agreed repair.' },
    ],
    partsCopy: 'Rack type, assistance system, part compatibility, access and any alignment or calibration determine the estimate. A rack is not replaced solely because the steering feels heavy. The quotation distinguishes diagnosis, parts, labour and follow-up checks.',
    faqs: [
      { question: 'Does every Porsche use hydraulic power steering?', answer: 'No. Steering equipment varies by model and generation. The fitted system is identified before fluid, pump, electric-assistance or rack work is proposed.' },
      { question: 'Does pulling to one side mean the steering rack has failed?', answer: 'No. Tyre condition, alignment, suspension and other causes can affect direction. Inspection is needed to distinguish these from steering-system faults.' },
      { question: 'Can a Porsche steering rack be repaired?', answer: 'The fault, rack design, component condition, parts and supported repair availability determine whether repair or replacement is appropriate. The options are explained after diagnosis.' },
      { question: 'What should I send for a steering enquiry?', answer: 'Send the model, year, mileage and symptoms, including when the noise or warning occurs and any recent tyre, alignment or suspension work. The workshop is in Al Quoz, Dubai.' },
    ],
  },
  'engine-diagnostics': {
    h1: 'Porsche Diagnostics in Dubai',
    metaTitle: 'Porsche PIWIS 3 Diagnostics Dubai | DIGI-TEC',
    metaDescription: 'Porsche PIWIS 3 diagnostics in Al Quoz for warnings, drivability and module concerns. Supported functions and repair scope confirmed for the exact vehicle.',
    heroCopy: 'DIGI-TEC has PIWIS 3 capability for Porsche fault investigation in Al Quoz. The model, generation, fitted powertrain and complaint determine which control units, live values, guided functions or service functions are available. A stored code is a starting point, not automatic proof of a failed part. Coding, programming and adaptations are assessed separately and offered only where the exact vehicle, module and workshop access support them.',
    processSteps: [
      { title: 'Record the warning and conditions', description: 'Share the model, year, mileage, exact warning and when the fault occurs. Recent work and service history help plan the diagnostic scope.' },
      { title: 'Confirm relevant module coverage', description: 'Review compatible fault and live data for the fitted vehicle. Diagnostic coverage, coding and programming are separate functions and must each be confirmed.' },
      { title: 'Test the suspected cause', description: 'Use physical, electrical or mechanical checks as the evidence requires. A code naming a component does not prove that component has failed.' },
      { title: 'Agree the next step', description: 'Explain confirmed findings, further testing and available repair options. Wiring or component repair is quoted separately from the initial diagnostic assessment.' },
    ],
  },
};

export function getQueryServiceContent(brandSlug: string, serviceSlug: ServiceKey): Content {
  return (brandSlug === 'bmw-service-dubai' ? bmw : brandSlug === 'porsche-service-dubai' ? porsche : {})[serviceSlug] ?? {};
}

export function serviceEnquiryLabel(service: ServiceKey, brand: string): string {
  const article = /^[aeiou]/i.test(brand) ? 'an' : 'a';
  const labels: Record<ServiceKey, string> = {
    'oil-change': `Request ${brand} Oil Service`,
    'brake-repair': `Request ${article} ${brand} Brake Inspection`,
    'transmission-repair': `Request ${article} ${brand} Gearbox Inspection`,
    'ac-repair': `Request ${article} ${brand} AC Inspection`,
    'suspension-repair': `Request ${article} ${brand} Suspension Inspection`,
    'engine-diagnostics': `Book ${brand} Diagnostics`,
    'mechanical-repair': `Request ${article} ${brand} Engine Inspection`,
    'steering-repair': `Request ${article} ${brand} Steering Inspection`,
    'battery-replacement': `Request ${article} ${brand} Battery Check`,
    'electrical-repair': `Request ${brand} Electrical Diagnosis`,
    'exhaust-repair': `Request ${article} ${brand} Exhaust Inspection`,
    'fuel-system-repair': `Request ${brand} Fuel-System Diagnosis`,
    'body-repair': `Request ${article} ${brand} Body Repair Assessment`,
    'tire-repair': `Request ${article} ${brand} Tyre Check`,
    'soft-close-door-installation': `Discuss ${brand} Soft-Close Doors`,
  };
  return labels[service];
}
