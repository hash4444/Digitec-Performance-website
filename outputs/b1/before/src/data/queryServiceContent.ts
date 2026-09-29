import type { BrandServiceCombo, ServiceKey } from './brandServices';

// Reviewed service-specific content for the approved Search Console owners.
// Apply before localization; these are not new landing pages or capability claims.
type Content = Partial<BrandServiceCombo>;
const bmw: Partial<Record<ServiceKey, Content>> = {
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
    metaTitle: 'BMW Diagnostics & Coding Dubai | DIGI-TEC',
    metaDescription: 'BMW diagnostics in Al Quoz, Dubai for warning lights and drivability faults. Coding and programming coverage confirmed for your vehicle. Book DIGI-TEC.',
    heroCopy: 'A BMW warning light, rough idle, starting problem or intermittent fault needs more than a code reset. DIGI-TEC reviews the complaint, compatible module data and relevant mechanical or electrical tests in Al Quoz. Fault finding identifies the cause; coding changes supported configuration; programming writes compatible software. Availability is checked for the exact BMW and requested function before booking.',
    symptoms: ['Engine or drivetrain warning, misfire or reduced performance', 'Starting problem or intermittent electrical function', 'A fault that returns after clearing or a previous repair', 'A specific coding or replacement-module question needing compatibility review'],
    processSteps: [
      { title: 'Describe the concern', description: 'Share model, year, mileage, warning text and when it occurs. Mention recent battery, module or mechanical work.' },
      { title: 'Confirm access and collect evidence', description: 'Check compatible module access and review supported fault and live data. Codes help direct testing; they do not establish which part to replace.' },
      { title: 'Test or assess the requested function', description: 'Use relevant circuit or mechanical tests for a fault. For coding or programming, confirm the requested function, hardware, software, access and power-supply requirements first.' },
      { title: 'Explain findings and next steps', description: 'Separate confirmed faults, further testing and repair costs. Retrofit supply or installation is not promised solely because a coding function exists.' },
    ],
  },
};

const porsche: Partial<Record<ServiceKey, Content>> = {
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
    metaTitle: 'Porsche Diagnostics Dubai | DIGI-TEC Al Quoz',
    metaDescription: 'Porsche diagnostics in Al Quoz, Dubai for warning lights, drivability and module concerns. Compatible testing and repair scope confirmed at DIGI-TEC.',
    heroCopy: 'DIGI-TEC investigates Porsche warning lights, misfires, starting concerns and changes in drivability at the Al Quoz workshop. The model, fitted powertrain and complaint determine which compatible modules, live data and physical tests are relevant. A stored code is a starting point; diagnosis separates an electrical, mechanical or control concern before repair is quoted.',
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
