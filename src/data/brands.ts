export interface Brand {
  name: string;
  slug: string;
  logo: string;
  intro: string;
  specialization: string;
  whyChoose: { title: string; description: string }[];
  faqs: { q: string; a: string }[];
  relatedServices: string[];
}

const partsAvailabilityAnswer = (brand: string) =>
  `Parts are selected for the exact ${brand} VIN, repair and agreed quotation. Depending on availability and the job, the estimate may specify a genuine part, an established OE-supplier component or another suitable customer-approved option; no source is assumed before it is confirmed.`;

const serviceTimingAnswer = (brand: string) =>
  `${brand} workshop time depends on the exact model, inspection findings, parts availability and any supported calibration or road testing. The expected timeline is confirmed after the vehicle and required work are reviewed.`;

const serviceIntervalAnswer = (brand: string) =>
  `Follow the service reminder and handbook for the exact ${brand} model, year and market specification. Dubai heat, traffic, dust and the way the vehicle is used may justify additional condition checks, so the VIN and service history should be reviewed before an interval is recommended.`;

export const brands: Brand[] = [
  {
    name: 'Mercedes-Benz',
    slug: 'mercedes-benz-service-dubai',
    logo: '/brand-logos/showcase/mercedes-benz.png',
    specialization: 'Repair • Maintenance • Diagnostics • Performance',
    intro:
      'Digi-Tec Performance Centre is an independent Mercedes-Benz workshop in Al Quoz, Dubai. Owners of C-Class, E-Class, S-Class, G-Class, GLE, GLS, AMG and other Mercedes models can request inspection, maintenance and repair; diagnostic functions and the final scope are confirmed for the vehicle before work begins.',
    whyChoose: [
      { title: 'Mercedes-Compatible Diagnostics', description: 'Fault-code analysis, live data, guided testing, service resets or adaptations may be used where the fitted control systems and available vehicle access support them; functions are confirmed from the VIN and vehicle.' },
      { title: 'AIRMATIC, ABC & E-ACTIVE Suspension', description: 'System testing for low ride height, slow lifting, compressor noise, harsh ride and suspension warnings before a component is recommended.' },
      { title: '7G-Tronic, 9G-Tronic & AMG SpeedShift', description: 'Diagnosis for delayed engagement, rough shifting, slipping, leaks and transmission warnings, followed by the repair scope the test results support.' },
      { title: 'Mercedes-AMG & G-Class Experience', description: 'Model-aware diagnostics and mechanical support for C63, E63, G63, S63, AMG GT and other high-output Mercedes platforms.' },
    ],
    faqs: [
      { q: 'Where can I find a Mercedes specialist in Dubai?', a: 'Digi-Tec Performance Centre is an independent workshop in Al Quoz Industrial Area 3, Dubai. Mercedes owners can request scheduled maintenance, diagnostics or mechanical, transmission, suspension, AC, brake and electrical work; exact scope is confirmed for the vehicle.' },
      { q: 'How often should a Mercedes-Benz be serviced in Dubai?', a: 'Follow the ASSYST service reminder and the interval specified for the exact model and year. Dubai heat, traffic, dust, mileage and driving pattern can justify additional inspections or earlier fluid attention, so we confirm the scope from the vehicle rather than applying one interval to every Mercedes.' },
      { q: 'What is the difference between Mercedes Service A and Service B?', a: 'Service A is generally the smaller scheduled visit, while Service B adds a wider set of inspections and service items. The exact checklist varies by model, age, mileage and the ASSYST display, so the VIN and service history should be checked before quoting.' },
      { q: 'Do you use genuine Mercedes-Benz parts?', a: partsAvailabilityAnswer('Mercedes-Benz') },
      { q: 'How long does Mercedes repair or service take?', a: serviceTimingAnswer('Mercedes-Benz') },
      { q: 'Do you repair Mercedes AIRMATIC suspension faults?', a: 'AIRMATIC, ABC and E-ACTIVE symptoms such as one side sitting low, slow lifting, compressor noise, harsh ride and suspension warnings can be inspected. The cause and available repair scope are confirmed for the vehicle before replacement is recommended.' },
      { q: 'Can you diagnose 7G-Tronic and 9G-Tronic transmission problems?', a: 'Delayed engagement, jerking, slipping, leaks and transmission warnings can be assessed using the checks supported by the vehicle, with a road test where appropriate. The repair scope is confirmed after inspection.' },
      { q: 'Which Mercedes models do you repair?', a: 'Appointments can be requested for A-Class, C-Class, E-Class, S-Class, CLA, CLS, GLA, GLB, GLC, GLE, GLS, G-Class, AMG models, selected EQ vehicles and V-Class. Send the VIN and concern so model, system and parts coverage can be confirmed before booking.' },
      { q: 'Do you use Mercedes-compatible diagnostics?', a: 'Diagnostic support depends on the VIN, fitted modules and the functions required. Available scanning, live-data, reset, adaptation or programming functions are confirmed for the vehicle before they are included in the work scope.' },
      { q: 'Is Digi-Tec a Mercedes garage in Al Quoz, Dubai?', a: 'Yes. The workshop is in Al Quoz Industrial Area 3, Warehouses 11–15, Dubai. The Mercedes page includes a direct Google Maps link, phone number and WhatsApp booking option.' },
      { q: 'How should I choose the best Mercedes workshop in Dubai?', a: 'Look for Mercedes-specific diagnostics, a model-aware inspection process, clear evidence behind the diagnosis, written parts and fluid options, and approval before work begins. Ask the workshop to explain the test results and post-repair checks for your exact model.' },
    ],
    relatedServices: ['mercedes-oil-change-dubai', 'mercedes-transmission-repair-dubai', 'mercedes-suspension-repair-dubai', 'mercedes-diagnostics-dubai'],
  },
  {
    name: 'Maybach',
    slug: 'maybach-service-dubai',
    logo: '/brand-logos/showcase/maybach.png',
    specialization: 'Repair • Maintenance • Diagnostics • Performance',
    intro:
      'Maybach owners can request vehicle-specific inspection, scheduled maintenance, mechanical or electrical repair and detailing at Digi-Tec in Al Quoz. Model, system, parts and diagnostic requirements are confirmed from the VIN and vehicle before the work scope is agreed.',
    whyChoose: [
      { title: 'E-ACTIVE Body Control Inspection', description: 'Maybach S-Class active-suspension concerns can be inspected; any supported calibration or camera-alignment function is confirmed for the vehicle before booking.' },
      { title: 'Rear-Cabin Electronics & MBUX', description: 'Reclining seats, rear infotainment, fragrance and ambient-lighting concerns can be assessed, with module access and repair scope confirmed from the vehicle.' },
      { title: 'V12 M279 Powertrain Systems', description: 'The M279 V12 used in Maybach S600 and S680 has model-specific ignition, intake and turbo systems that should be inspected before parts or work are proposed.' },
      { title: 'Vehicle-Specific Service Planning', description: 'Send the VIN, model, concern and requested service so workshop, parts and any transport requirements can be confirmed before the appointment.' },
    ],
    faqs: [
      { q: 'How often should a Maybach be serviced in Dubai?', a: serviceIntervalAnswer('Maybach') },
      { q: 'Do you use genuine Maybach parts?', a: partsAvailabilityAnswer('Maybach') },
      { q: 'How long does a typical Maybach service take?', a: serviceTimingAnswer('Maybach') },
      { q: 'Can you service the rear executive cabin and fragrance system?', a: 'Rear-seat, massage, fragrance and rear-MBUX concerns can be inspected. Exact diagnostic access, parts availability and repair scope are confirmed from the VIN and vehicle before work is accepted.' },
    ],
    relatedServices: ['mercedes-oil-change-dubai', 'suspension-repair-dubai', 'car-ac-repair-dubai', 'paint-protection-dubai'],
  },
  {
    name: 'Porsche',
    slug: 'porsche-service-dubai',
    logo: '/brand-logos/showcase/porsche.png',
    specialization: 'Repair • Maintenance • Diagnostics • Performance',
    intro:
      'Owners of Porsche 911, Cayman, Cayenne, Panamera, Macan and other models can request inspection and workshop support at Digi-Tec. PDK, powertrain, brake, suspension and diagnostic scope is confirmed from the VIN, fitted systems and vehicle condition before work begins.',
    whyChoose: [
      { title: 'Porsche-Compatible Diagnostics', description: 'Scanning, live data, service functions, coding or programming depend on the model, modules and required access; supported functions are confirmed before booking.' },
      { title: 'PDK & Tiptronic Inspection', description: '7-speed PDK and 8-speed Tiptronic fluid, mechatronic and clutch concerns can be inspected before a service or repair scope is proposed.' },
      { title: 'PCCB Carbon-Ceramic Brake Inspection', description: 'PCCB rotor, pad and warning concerns can be measured and reviewed; parts, handling procedure and repair availability are confirmed for the vehicle.' },
      { title: 'Performance Project Consultation', description: 'Turbo, intake, exhaust or calibration requests begin with a vehicle health check and a discussion of intended use; no output or package is assumed before review.' },
    ],
    faqs: [
      { q: 'How often should a Porsche be serviced in Dubai?', a: serviceIntervalAnswer('Porsche') },
      { q: 'Do you use genuine Porsche parts?', a: partsAvailabilityAnswer('Porsche') },
      { q: 'How long does a typical Porsche service take?', a: serviceTimingAnswer('Porsche') },
      { q: 'Can you service PDK transmissions?', a: 'PDK symptoms and service history can be inspected first. Fluid, filter, mechatronic, clutch and supported diagnostic requirements are confirmed for the exact gearbox and vehicle before work is accepted.' },
    ],
    relatedServices: ['mechanical-repair-dubai', 'transmission-repair-dubai', 'brake-repair-dubai', 'car-diagnostics-dubai'],
  },
  {
    name: 'Audi',
    slug: 'audi-service-dubai',
    logo: '/brand-logos/showcase/audi.png',
    specialization: 'Repair • Maintenance • Diagnostics • Performance',
    intro:
      'Audi A4, A6, A8, Q, S, RS and R8 owners can request vehicle-specific inspection and service at Digi-Tec. Quattro, S Tronic, powertrain, brake, suspension and performance-project scope is confirmed from the VIN and vehicle before work begins.',
    whyChoose: [
      { title: 'Audi-Compatible Diagnostics', description: 'Scanning, live data, service functions, adaptations, coding or software work depend on the fitted modules and available access; functions are confirmed per vehicle.' },
      { title: 'Quattro & Sport Differential Inspection', description: 'Haldex, centre-differential and rear sport-differential concerns can be inspected; fluid, parts and supported calibration requirements are confirmed for the exact vehicle.' },
      { title: 'S Tronic DCT Gearbox Systems', description: 'DL501 / DQ500 mechatronic, clutch and fluid requirements are checked for the exact gearbox before service or basic-setting work is proposed.' },
      { title: 'EA888 & 4.0 TFSI Project Consultation', description: 'RS3, RS4, RS6 and RS7 performance requests are reviewed against vehicle health, fitted hardware and intended use before any tuning scope is proposed.' },
    ],
    faqs: [
      { q: 'How often should an Audi be serviced in Dubai?', a: serviceIntervalAnswer('Audi') },
      { q: 'Do you use genuine Audi parts?', a: partsAvailabilityAnswer('Audi') },
      { q: 'How long does a typical Audi service take?', a: serviceTimingAnswer('Audi') },
      { q: 'Can you tune an RS3, RS6, or RS7?', a: 'A performance consultation can be requested. Vehicle health, software and hardware compatibility, supported calibration access and the intended use are reviewed before any package is proposed.' },
    ],
    relatedServices: ['mechanical-repair-dubai', 'transmission-repair-dubai', 'car-diagnostics-dubai', 'brake-repair-dubai'],
  },
  {
    name: 'BMW',
    slug: 'bmw-service-dubai',
    logo: '/brand-logos/showcase/bmw.png',
    specialization: 'Repair • Maintenance • Diagnostics • Performance',
    intro:
      'BMW owners can request routine maintenance, fault inspection and performance-project consultation at Digi-Tec in Al Quoz. Diagnostic, iDrive, coding, parts and repair availability are confirmed for the VIN, fitted modules and requested work before the scope is agreed.',
    whyChoose: [
      { title: 'BMW-Compatible Diagnostics & Coding Review', description: 'Scan, live-data, service, coding or retrofit functions depend on the F, G or i-Series vehicle and required access; availability is confirmed before booking.' },
      { title: 'S55, S58 & S63 Engine Systems', description: 'Charge-pipe, oil-cooler, VANOS and performance-project requests for M3, M4, M5 and X5M/X6M are reviewed against the vehicle before a scope is proposed.' },
      { title: 'ZF 8HP Transmission Review', description: 'Fluid, filter, fault and shift-quality concerns can be inspected. The exact fluid, supported service functions and any performance request are reviewed for the fitted gearbox before a scope is proposed.' },
      { title: 'iDrive & Retrofit Consultation', description: 'CarPlay, Live Cockpit, DAB+ or other retrofit requests are checked for hardware, software and coding compatibility before a scope is offered.' },
    ],
    faqs: [
      { q: 'How often should a BMW be serviced in Dubai?', a: serviceIntervalAnswer('BMW') },
      { q: 'What does BMW Condition Based Service mean?', a: 'Condition Based Service uses time, mileage and vehicle data to estimate when monitored items are due. It does not replace inspection, service-history review or diagnosis of a warning or symptom.' },
      { q: 'Can you diagnose a BMW drivetrain malfunction?', a: 'Yes. The exact warning and stored faults are reviewed with live data and physical tests because engine, boost, ignition, fuel, voltage, transmission or driveline conditions can trigger the message.' },
      { q: 'Does a BMW ZF 8HP need servicing?', a: 'The appropriate service decision depends on the fitted 8HP variant, BMW and transmission information, history, condition and symptoms. The gearbox is identified before fluid, filter or procedure is proposed.' },
      { q: 'Why is my BMW losing coolant?', a: 'Possible causes include an external leak, expansion tank, hose, radiator, thermostat housing, water pump or an internal engine concern. Avoid repeated top-ups without finding the source, and stop if the engine overheats.' },
      { q: 'Can BMW batteries be replaced and registered?', a: 'Battery replacement and registration can be assessed. The replacement specification and supported registration function depend on the exact vehicle, energy-management system and installed battery.' },
      { q: 'What BMW models use the B58?', a: 'B58 applications include selected 340i and M340i, 440i and M440i, 540i, 740i, X3 M40i, X4 M40i and X5 40i variants. Fitment varies by generation and market, so the VIN should confirm the exact engine.' },
      { q: 'Do you use genuine BMW parts?', a: partsAvailabilityAnswer('BMW') },
      { q: 'How long does a typical BMW service take?', a: serviceTimingAnswer('BMW') },
      { q: 'Can you code iDrive features and retrofits?', a: 'Coding or retrofit support depends on the exact head unit, software level, vehicle order, hardware and required access. Compatibility and available functions are confirmed from the VIN and vehicle before work is accepted.' },
    ],
    relatedServices: ['mechanical-repair-dubai', 'car-diagnostics-dubai', 'transmission-repair-dubai', 'brake-repair-dubai'],
  },
  {
    name: 'Lamborghini',
    slug: 'lamborghini-service-dubai',
    logo: '/brand-logos/showcase/lamborghini.png',
    specialization: 'Repair • Maintenance • Diagnostics • Performance',
    intro:
      'Huracán, Urus, Aventador and other Lamborghini owners can request a vehicle inspection at Digi-Tec. Workshop capability, diagnostic functions, parts and the service or repair scope are confirmed for the VIN and vehicle before booking.',
    whyChoose: [
      { title: 'Lamborghini-Compatible Diagnostic Review', description: 'Required scan, live-data, service or software functions are checked against the model, modules and available access before the appointment is accepted.' },
      { title: 'CCB Carbon-Ceramic Brake Inspection', description: 'CCB rotor and pad concerns can be measured; parts, handling procedure and repair availability are confirmed for the exact vehicle.' },
      { title: 'LDF / ISR Gearbox Inspection', description: 'LDF and ISR symptoms, service history and fluid requirements can be assessed before a service or repair scope is proposed.' },
      { title: 'ANIMA & Adaptive Damper Inspection', description: 'Drive-mode, selector and adaptive-damper concerns can be inspected; supported diagnostic or calibration functions are confirmed for the exact vehicle.' },
    ],
    faqs: [
      { q: 'How often should a Lamborghini be serviced in Dubai?', a: serviceIntervalAnswer('Lamborghini') },
      { q: 'Do you use genuine Lamborghini parts?', a: partsAvailabilityAnswer('Lamborghini') },
      { q: 'How long does a typical Lamborghini service take?', a: serviceTimingAnswer('Lamborghini') },
      { q: 'Can you service carbon ceramic brakes?', a: 'Carbon-ceramic brake concerns can be inspected and measured. The compatible pads, rotor condition, required procedure and available repair scope are confirmed for the specific vehicle.' },
    ],
    relatedServices: ['mechanical-repair-dubai', 'brake-repair-dubai', 'suspension-repair-dubai', 'paint-protection-dubai'],
  },
  {
    name: 'Bentley',
    slug: 'bentley-service-dubai',
    logo: '/brand-logos/showcase/bentley.png',
    specialization: 'Repair • Maintenance • Diagnostics • Performance',
    intro:
      'Continental GT, Flying Spur and Bentayga owners can request vehicle-specific inspection and service at Digi-Tec. W12, V8, transmission, air-suspension and interior-work scope is confirmed from the VIN, condition and parts availability.',
    whyChoose: [
      { title: 'W12 TSI Twin-Turbo Systems', description: 'Coil, coolant-transfer-pipe and timing concerns on the 6.0 W12 can be inspected before parts and repair scope are confirmed.' },
      { title: 'Continuous Damping Control & Air Suspension', description: '48V active anti-roll and air-suspension concerns can be inspected; supported calibration and repair functions are confirmed for the vehicle.' },
      { title: 'ZF 8HP Gearbox Review', description: 'Fluid, filter and shift concerns can be inspected. Fluid specification, fill procedure and any supported adaptation function are confirmed for the exact gearbox before work.' },
      { title: 'Interior Condition Review', description: 'Leather, veneer and headlining requests are reviewed for the specific materials and vehicle before work is accepted.' },
    ],
    faqs: [
      { q: 'How often should a Bentley be serviced in Dubai?', a: serviceIntervalAnswer('Bentley') },
      { q: 'Do you use genuine Bentley parts?', a: partsAvailabilityAnswer('Bentley') },
      { q: 'How long does a typical Bentley service take?', a: serviceTimingAnswer('Bentley') },
      { q: 'Do you service the W12 coolant transfer pipe?', a: 'A suspected W12 coolant-transfer-pipe concern can be inspected. The required part source, coolant specification and repair availability are confirmed from the VIN and findings before work is accepted.' },
    ],
    relatedServices: ['mechanical-repair-dubai', 'suspension-repair-dubai', 'transmission-repair-dubai', 'paint-protection-dubai'],
  },
  {
    name: 'McLaren',
    slug: 'mclaren-service-dubai',
    logo: '/brand-logos/showcase/mclaren.png',
    specialization: 'Repair • Maintenance • Diagnostics • Performance',
    intro:
      'McLaren 570S, 720S, Artura and other model owners can request a vehicle-specific assessment. Carbon-chassis handling requirements, diagnostic access, parts and service or recalibration scope must be confirmed from the VIN and vehicle before booking.',
    whyChoose: [
      { title: 'MonoCell II / II-T Carbon Tub Requirements', description: 'The model-specific lift points, torque procedures and workshop requirements are reviewed before the vehicle is accepted.' },
      { title: 'M838T & M840T Twin-Turbo V8 Systems', description: 'Coil, dry-sump oil and turbo concerns on 3.8 and 4.0 V8 models can be inspected before service availability is confirmed.' },
      { title: 'Proactive Chassis Control & Active Aero Review', description: 'Hydraulic-suspension, accumulator and active-aero concerns can be assessed; tooling, parts and supported calibration functions are confirmed for the model before work is accepted.' },
      { title: 'SSG 7-Speed DCT Gearbox', description: 'Graziano SSG fluid and clutch concerns can be inspected; tooling, parts and repair availability are confirmed for the vehicle.' },
    ],
    faqs: [
      { q: 'How often should a McLaren be serviced in Dubai?', a: serviceIntervalAnswer('McLaren') },
      { q: 'Do you use genuine McLaren parts?', a: partsAvailabilityAnswer('McLaren') },
      { q: 'How long does a typical McLaren service take?', a: serviceTimingAnswer('McLaren') },
      { q: 'Can you service the hydraulic suspension accumulators?', a: 'Accumulator concerns on 12C, 650S, 720S and 765LT can be assessed. Parts, hydraulic procedure and repair availability are confirmed for the exact model before work is accepted.' },
    ],
    relatedServices: ['mechanical-repair-dubai', 'brake-repair-dubai', 'suspension-repair-dubai', 'paint-protection-dubai'],
  },
  {
    name: 'Ferrari',
    slug: 'ferrari-service-dubai',
    logo: '/brand-logos/showcase/ferrari.png',
    specialization: 'Repair • Maintenance • Diagnostics • Performance',
    intro:
      'Ferrari 488, F8, SF90, Roma and other model owners can request a vehicle-specific inspection at DIGI-TEC. Diagnostic functions, F1 or dual-clutch transmission, brake, suspension, parts and repair requirements are confirmed before the scope is agreed.',
    whyChoose: [
      { title: 'Ferrari-Compatible Diagnostic Review', description: 'Scan, live-data, adaptation or programming requirements are checked against the model, modules and available access before booking.' },
      { title: 'F1 & Dual-Clutch Gearbox Review', description: 'Single-clutch F1, seven-speed DCT and later eight-speed DCT systems differ by model. Fluid, shift, clutch-data and supported diagnostic requirements are confirmed for the exact vehicle.' },
      { title: 'Steel & Carbon-Ceramic Brake Inspection', description: 'The fitted steel or Ferrari carbon-ceramic system is identified before measurement, compatible parts or a repair procedure is proposed.' },
      { title: 'Model-Specific Suspension Inspection', description: 'Conventional or SCM/SCM-E adaptive-damper concerns can be inspected; fitted hardware, parts and supported diagnostic or calibration requirements are confirmed for the vehicle.' },
    ],
    faqs: [
      { q: 'How often should a Ferrari be serviced in Dubai?', a: serviceIntervalAnswer('Ferrari') },
      { q: 'Do you use genuine Ferrari parts?', a: partsAvailabilityAnswer('Ferrari') },
      { q: 'How long does a typical Ferrari service take?', a: serviceTimingAnswer('Ferrari') },
      { q: 'Can you measure F1 clutch wear?', a: 'F1 clutch concerns can be assessed where the exact vehicle and available diagnostic functions support the required measurement. Scope and report availability are confirmed before booking.' },
    ],
    relatedServices: ['mechanical-repair-dubai', 'brake-repair-dubai', 'transmission-repair-dubai', 'paint-protection-dubai'],
  },
  {
    name: 'Bugatti',
    slug: 'bugatti-service-dubai',
    logo: '/brand-logos/showcase/bugatti.png',
    specialization: 'Repair • Maintenance • Diagnostics • Performance',
    intro:
      'Bugatti Veyron, Chiron and other rare-model owners may request a preliminary workshop review. Digi-Tec confirms the VIN, vehicle condition, required tooling, parts sourcing, external support and safe workshop scope before accepting any appointment.',
    whyChoose: [
      { title: 'W16 Quad-Turbo System Review', description: 'The Veyron and Chiron W16 cooling, oil and ignition requirements are reviewed against the exact vehicle before any workshop scope is offered.' },
      { title: 'DSG 7-Speed DCT Requirements', description: 'Ricardo DCT fluid, clutch and tooling requirements are checked from the VIN and service information before work is accepted.' },
      { title: 'Carbon-Ceramic Brake Assessment', description: 'Rotor, pad and caliper concerns may be assessed after the compatible measurement process, parts and support are confirmed.' },
      { title: 'Appointment Confirmation', description: 'Workshop handling, transport, privacy requests and any third-party support are agreed for the specific vehicle before arrival.' },
    ],
    faqs: [
      { q: 'How often should a Bugatti be serviced in Dubai?', a: serviceIntervalAnswer('Bugatti') },
      { q: 'Do you use genuine Bugatti parts?', a: partsAvailabilityAnswer('Bugatti') },
      { q: 'How long does a typical Bugatti service take?', a: serviceTimingAnswer('Bugatti') },
      { q: 'Can Digi-Tec accept my Bugatti?', a: 'Acceptance is not automatic. Send the VIN, model, service history and requested work so tooling, parts, external support, handling requirements and workshop scope can be confirmed before booking.' },
    ],
    relatedServices: ['mechanical-repair-dubai', 'brake-repair-dubai', 'paint-protection-dubai', 'car-diagnostics-dubai'],
  },
  {
    name: 'Land Rover',
    slug: 'land-rover-service-dubai',
    logo: '/brand-logos/showcase/land-rover.png',
    specialization: 'Repair • Maintenance • Diagnostics • Performance',
    intro:
      'Range Rover, Defender and Discovery owners can request inspection and service at Digi-Tec. Air-suspension, Terrain Response, V8, Ingenium, transmission and diagnostic scope is confirmed from the VIN and vehicle before work begins.',
    whyChoose: [
      { title: 'EAS Air Suspension Systems', description: 'Air-strut, compressor, valve-block and ride-height-sensor concerns can be inspected before repair scope is confirmed.' },
      { title: 'Terrain Response 2 Inspection', description: 'TR2, active differential and Wade Sensing concerns can be inspected; supported diagnostic or calibration functions are confirmed for the vehicle.' },
      { title: 'Supercharged 5.0 V8 & Ingenium Review', description: 'Supercharger, intercooler, timing, oil and cooling concerns can be inspected before the applicable service or repair scope is confirmed.' },
      { title: 'ZF 8HP & Active Driveline Review', description: 'Transmission, differential and PTU fluid or fault concerns can be inspected; exact specifications, parts and supported service functions are confirmed for the vehicle.' },
    ],
    faqs: [
      { q: 'How often should a Range Rover be serviced in Dubai?', a: serviceIntervalAnswer('Range Rover') },
      { q: 'Do you use genuine Land Rover parts?', a: partsAvailabilityAnswer('Land Rover') },
      { q: 'How long does a typical Range Rover service take?', a: serviceTimingAnswer('Range Rover') },
      { q: 'Can you repair Range Rover air suspension?', a: 'Air-strut, compressor, valve-block and height-sensor concerns can be inspected. Parts, available calibration functions and repair scope are confirmed for the exact vehicle before work begins.' },
    ],
    relatedServices: ['suspension-repair-dubai', 'mechanical-repair-dubai', 'car-diagnostics-dubai', 'transmission-repair-dubai'],
  },
  {
    name: 'Rolls-Royce',
    slug: 'rolls-royce-service-dubai',
    logo: '/brand-logos/showcase/rolls-royce.png',
    specialization: 'Repair • Maintenance • Diagnostics • Performance',
    intro:
      'Phantom, Ghost, Wraith, Cullinan and other Rolls-Royce owners may request a vehicle-specific assessment. V12, air-suspension, interior, tooling, parts and handling requirements are confirmed before an appointment is accepted.',
    whyChoose: [
      { title: 'N74 V12 Twin-Turbo Systems', description: 'Coil, VVT and turbo concerns on 6.6 and 6.75 N74 V12 models can be inspected before work is accepted.' },
      { title: 'Self-Levelling Air Suspension', description: 'Air-strut, compressor and road-scanning-camera concerns can be inspected; calibration access is confirmed for the vehicle.' },
      { title: 'Planar Suspension & Flagbearer Camera', description: 'Current Ghost and Spectre use model-specific Planar and camera systems whose service requirements must be confirmed before work.' },
      { title: 'Interior Condition Review', description: 'Leather, veneer and starlight-headliner requests are reviewed for the vehicle, materials and requested work before a scope is offered.' },
    ],
    faqs: [
      { q: 'How often should a Rolls-Royce be serviced in Dubai?', a: serviceIntervalAnswer('Rolls-Royce') },
      { q: 'Do you use genuine Rolls-Royce parts?', a: partsAvailabilityAnswer('Rolls-Royce') },
      { q: 'How long does a typical Rolls-Royce service take?', a: serviceTimingAnswer('Rolls-Royce') },
      { q: 'Can Digi-Tec accept my Rolls-Royce?', a: 'Send the VIN, model, concern and any transport or privacy request first. Workshop scope, parts, tooling, timing and handling arrangements are confirmed before the appointment.' },
    ],
    relatedServices: ['mechanical-repair-dubai', 'suspension-repair-dubai', 'paint-protection-dubai', 'car-ac-repair-dubai'],
  },
  {
    name: 'Aston Martin',
    slug: 'aston-martin-service-dubai',
    logo: '/brand-logos/showcase/aston-martin.png',
    specialization: 'Repair • Maintenance • Diagnostics • Performance',
    intro:
      'DB11, Vantage, DBS and DBX owners can request vehicle-specific inspection and service at Digi-Tec. V8, V12, ZF transmission, suspension, brake, parts and diagnostic requirements are confirmed from the VIN before work begins.',
    whyChoose: [
      { title: 'AMG M177 V8 & AM V12 Systems', description: 'The AMG-sourced 4.0 V8 and Aston Martin 5.2 V12 have model-specific requirements that are confirmed from the VIN before service.' },
      { title: 'ZF 8HP Transaxle Review', description: 'Transaxle fluid, filter, mounting and torque-tube concerns can be inspected; specifications and repair availability are confirmed for the exact DB11, Vantage or DBS.' },
      { title: 'Adaptive Damping & Carbon-Ceramic Brake Inspection', description: 'Damper and CCM brake concerns can be assessed; compatible parts, measurement procedures and supported functions are confirmed for the vehicle.' },
      { title: 'Interior Condition Review', description: 'Leather and trim requests are reviewed for the specific materials and vehicle before work is accepted.' },
    ],
    faqs: [
      { q: 'How often should an Aston Martin be serviced in Dubai?', a: serviceIntervalAnswer('Aston Martin') },
      { q: 'Do you use genuine Aston Martin parts?', a: partsAvailabilityAnswer('Aston Martin') },
      { q: 'How long does a typical Aston Martin service take?', a: serviceTimingAnswer('Aston Martin') },
      { q: 'Can you service the V12 in DB11 AMR and DBS?', a: 'V12 ignition, cooling, turbo or timing concerns can be inspected. Exact tooling, parts and repair availability are confirmed from the VIN and findings before a scope is accepted.' },
    ],
    relatedServices: ['mechanical-repair-dubai', 'transmission-repair-dubai', 'brake-repair-dubai', 'paint-protection-dubai'],
  },
  {
    name: 'Maserati',
    slug: 'maserati-service-dubai',
    logo: '/brand-logos/showcase/maserati.png',
    specialization: 'Repair • Maintenance • Diagnostics • Performance',
    intro: 'Maserati Ghibli, Quattroporte, Levante, Grecale, GranTurismo and MC20 owners can request vehicle-specific inspection and service at Digi-Tec in Al Quoz. Diagnostic access, parts, fluids and the final workshop scope are confirmed from the VIN and vehicle before work begins.',
    whyChoose: [
      { title: 'Maserati-Compatible Diagnostics', description: 'Fault scanning, live data, service functions and any supported reset or adaptation are confirmed for the exact model and fitted modules before quotation.' },
      { title: 'V6, V8 & Nettuno Engine Inspection', description: 'Cooling, ignition, turbo, oil-leak and drivability concerns can be inspected on twin-turbo V6, V8 and Nettuno-powered models before parts are recommended.' },
      { title: 'ZF 8-Speed & Dual-Clutch Drivetrain Review', description: 'Shift quality, fluid, leak, clutch and driveline concerns are checked against the fitted transmission before a service or repair scope is proposed.' },
      { title: 'Skyhook Suspension & Brake Inspection', description: 'Adaptive-damper, suspension-warning, steering and brake concerns can be measured and diagnosed with the correct procedure confirmed for the vehicle.' },
    ],
    faqs: [
      { q: 'How often should a Maserati be serviced in Dubai?', a: serviceIntervalAnswer('Maserati') },
      { q: 'Do you use genuine Maserati parts?', a: partsAvailabilityAnswer('Maserati') },
      { q: 'How long does a Maserati service take?', a: serviceTimingAnswer('Maserati') },
      { q: 'Can you diagnose a Maserati suspension or transmission warning?', a: 'A vehicle-specific inspection can be requested. Available diagnostic functions, fluid specifications, parts and repair scope are confirmed from the VIN, fitted systems and findings before work begins.' },
    ],
    relatedServices: ['mechanical-repair-dubai', 'transmission-repair-dubai', 'suspension-repair-dubai', 'car-diagnostics-dubai'],
  },
  {
    name: 'Cadillac',
    slug: 'cadillac-service-dubai',
    logo: '/brand-logos/showcase/cadillac.png',
    specialization: 'Repair • Maintenance • Diagnostics • Performance',
    intro: 'Cadillac Escalade, CT4, CT5, XT4, XT5, XT6 and Lyriq owners can request inspection, maintenance and repair support at Digi-Tec in Al Quoz. Diagnostic access, parts and the available scope are confirmed from the VIN, fitted systems and requested work.',
    whyChoose: [
      { title: 'Cadillac-Compatible Diagnostic Review', description: 'Available GM-compatible scanning, live data, service functions and module access are confirmed for the exact vehicle before the diagnostic scope is quoted.' },
      { title: 'V8, Turbo & Cooling-System Inspection', description: 'Escalade V8 and CT-series turbocharged engine concerns can be inspected alongside cooling, ignition, oil, fuel and drivability systems before parts are proposed.' },
      { title: 'Magnetic Ride & Air Suspension Review', description: 'Ride-control, air-suspension, steering and chassis warnings can be assessed, with supported calibration and repair requirements confirmed for the vehicle.' },
      { title: 'AC, Electrical & Driver-Assistance Systems', description: 'Dubai AC performance, battery, charging, sensors and electrical concerns can be inspected; any supported calibration or module function is confirmed before work.' },
    ],
    faqs: [
      { q: 'How often should a Cadillac be serviced in Dubai?', a: serviceIntervalAnswer('Cadillac') },
      { q: 'Do you use genuine Cadillac parts?', a: partsAvailabilityAnswer('Cadillac') },
      { q: 'How long does Cadillac service or repair take?', a: serviceTimingAnswer('Cadillac') },
      { q: 'Can you diagnose Cadillac suspension and warning-light problems?', a: 'A warning-light or suspension inspection can be requested. Compatible diagnostic access, parts and repair scope are confirmed for the exact Cadillac before the appointment or quotation is finalized.' },
    ],
    relatedServices: ['mechanical-repair-dubai', 'car-diagnostics-dubai', 'suspension-repair-dubai', 'car-ac-repair-dubai'],
  },
];

const additionalBrandEntries: Array<[string, string]> = [
  ['Abarth', 'abarth-service-dubai'], ['Alfa Romeo', 'alfa-romeo-service-dubai'],
  ['BYD', 'byd-service-dubai'],
  ['Chevrolet', 'chevrolet-service-dubai'], ['Chrysler', 'chrysler-service-dubai'],
  ['Corvette', 'corvette-service-dubai'],
  ['Dodge', 'dodge-service-dubai'], ['FIAT', 'fiat-service-dubai'], ['Ford', 'ford-service-dubai'],
  ['Genesis', 'genesis-service-dubai'], ['GMC', 'gmc-service-dubai'],
  ['Hummer', 'hummer-service-dubai'], ['Infiniti', 'infiniti-service-dubai'],
  ['Jaguar', 'jaguar-service-dubai'], ['Jeep', 'jeep-service-dubai'], ['Jetour', 'jetour-service-dubai'],
  ['Koenigsegg', 'koenigsegg-service-dubai'], ['Lexus', 'lexus-service-dubai'], ['Lincoln', 'lincoln-service-dubai'],
  ['Lotus', 'lotus-service-dubai'], ['Mazda', 'mazda-service-dubai'],
  ['MINI', 'mini-service-dubai'], ['Mitsubishi', 'mitsubishi-service-dubai'],
  ['Nissan', 'nissan-service-dubai'], ['Pagani', 'pagani-service-dubai'],
  ['Renault', 'renault-service-dubai'],
  ['ROX', 'rox-service-dubai'],
  ['Subaru', 'subaru-service-dubai'], ['Tesla', 'tesla-service-dubai'],
  ['Toyota', 'toyota-service-dubai'], ['Volkswagen', 'volkswagen-service-dubai'], ['Volvo', 'volvo-service-dubai'],
];

const additionalBrandLogos: Record<string, string> = {
  // Locally hosted, transparent-margin-normalized artwork. Every image uses
  // the same canvas and a measured optical area for consistent presentation.
  Abarth: '/brand-logos/showcase/abarth.png',
  'Alfa Romeo': '/brand-logos/showcase/alfa-romeo.png',
  BYD: '/brand-logos/showcase/byd.png',
  Cadillac: '/brand-logos/showcase/cadillac.png',
  Chevrolet: '/brand-logos/showcase/chevrolet.png',
  Chrysler: '/brand-logos/showcase/chrysler.png',
  Corvette: '/brand-logos/showcase/corvette.png',
  Dodge: '/brand-logos/showcase/dodge.png',
  FIAT: '/brand-logos/showcase/fiat.png',
  Ford: '/brand-logos/showcase/ford.png',
  Genesis: '/brand-logos/showcase/genesis.png',
  GMC: '/brand-logos/showcase/gmc.png',
  Hummer: '/brand-logos/showcase/hummer.png',
  Infiniti: '/brand-logos/showcase/infiniti.png',
  Jaguar: '/brand-logos/showcase/jaguar.png',
  Jeep: '/brand-logos/showcase/jeep.png',
  Jetour: '/brand-logos/showcase/jetour.png',
  Koenigsegg: '/brand-logos/showcase/koenigsegg.png',
  Lexus: '/brand-logos/showcase/lexus.png',
  Lincoln: '/brand-logos/showcase/lincoln.png',
  Lotus: '/brand-logos/showcase/lotus.png',
  Maserati: '/brand-logos/showcase/maserati.png',
  Mazda: '/brand-logos/showcase/mazda.png',
  MINI: '/brand-logos/showcase/mini.png',
  Mitsubishi: '/brand-logos/showcase/mitsubishi.png',
  Nissan: '/brand-logos/showcase/nissan.png',
  Pagani: '/brand-logos/showcase/pagani.png',
  'Range Rover': '/brand-logos/showcase/land-rover.png',
  Renault: '/brand-logos/showcase/renault.png',
  ROX: '/brand-logos/showcase/rox.png',
  Subaru: '/brand-logos/showcase/subaru.png',
  Tesla: '/brand-logos/showcase/tesla.png',
  Toyota: '/brand-logos/showcase/toyota.png',
  Volkswagen: '/brand-logos/showcase/volkswagen.png',
  Volvo: '/brand-logos/showcase/volvo.png',
};

const createAdditionalBrand = ([name, slug]: [string, string]): Brand => ({
  name,
  slug,
  logo: additionalBrandLogos[name] ?? '',
  specialization: 'Repair • Maintenance • Diagnostics',
  intro: `${name} owners can request an inspection, maintenance or repair enquiry at Digi-Tec Performance Centre in Al Quoz, Dubai. Model, diagnostic, parts and service availability are confirmed from the VIN, vehicle condition and requested work before the scope is agreed.`,
  whyChoose: [
    { title: 'Diagnostic-First Inspection', description: `We inspect ${name} fault codes, live data, and the affected system before recommending a repair.` },
    { title: 'Maintenance & Mechanical Review', description: `Routine service, fluid, brake, suspension, cooling and mechanical enquiries for ${name} are reviewed against the VIN, vehicle condition and available workshop scope.` },
    { title: 'Electrical & Comfort-System Review', description: `Battery, charging, sensor, module, air-conditioning and electrical concerns can be inspected where compatible diagnostic access and repair support are available.` },
    { title: 'Clear Quotes and Customer Care', description: 'You receive a transparent estimate, practical repair options, and a clear handover once the work is complete.' },
  ],
  faqs: [
    { q: `Do you service ${name} vehicles in Dubai?`, a: `Send the VIN, model and requested work first. Digi-Tec confirms whether the required inspection, maintenance, diagnostic or repair scope is available for that ${name} before booking.` },
    { q: `Can you diagnose a warning light on my ${name}?`, a: `A warning-light inspection can be requested. Available scan and live-data functions depend on the vehicle and required access, so the diagnostic scope is confirmed before the appointment.` },
    { q: `Do you use quality parts for ${name} repairs?`, a: partsAvailabilityAnswer(name) },
    { q: `Where is Digi-Tec located?`, a: 'Digi-Tec Performance Centre is located in Al Quoz Industrial Area 3, Dubai. Call or WhatsApp us to arrange an inspection.' },
  ],
  relatedServices: ['mechanical-repair-dubai', 'car-diagnostics-dubai', 'brake-repair-dubai', 'car-ac-repair-dubai'],
});

brands.push(...additionalBrandEntries.map(createAdditionalBrand));

brands.push(
  {
    name: 'Range Rover',
    slug: 'range-rover-service-dubai',
    logo: '/brand-logos/showcase/land-rover.png',
    specialization: 'Service • Repair • Diagnostics • Air Suspension',
    intro: 'Range Rover, Range Rover Sport, Velar and Evoque owners can request inspection and service at Digi-Tec in Al Quoz. Diagnostic functions, parts, air-suspension and repair scope are confirmed from the VIN and vehicle before work begins.',
    whyChoose: [
      { title: 'JLR-Compatible Diagnostic Review', description: 'Fault tracing, service resets, programming or calibration functions depend on the vehicle and available access; supported functions are confirmed before booking.' },
      { title: 'Air Suspension Inspection', description: 'Air-strut, compressor, valve-block and ride-height-sensor concerns can be inspected before parts and repair scope are proposed.' },
      { title: 'Ingenium, V8 & ZF 8HP Review', description: 'Service and mechanical concerns involving Ingenium engines, V8s or ZF transmissions are reviewed for the exact vehicle before work is accepted.' },
      { title: 'Dubai-Focused Maintenance', description: 'Cooling, AC, suspension and battery checks tailored to Dubai heat, dust and daily driving conditions.' },
    ],
    faqs: [
      { q: 'Do you service Range Rover vehicles in Dubai?', a: 'Send the VIN, model and requested work so inspection, parts and repair availability can be confirmed before booking.' },
      { q: 'Can you repair Range Rover air suspension?', a: 'Air-strut, compressor, valve-block and height-sensor concerns can be inspected. Parts, calibration access and repair scope are confirmed for the exact vehicle.' },
      { q: 'Do you use JLR-compatible diagnostics?', a: 'Available fault-reading, live-data, reset, programming and calibration functions depend on the VIN and fitted modules. The supported scope is confirmed before booking.' },
      { q: 'How often should a Range Rover be serviced in Dubai?', a: serviceIntervalAnswer('Range Rover') },
    ],
    relatedServices: ['suspension-repair-dubai', 'mechanical-repair-dubai', 'car-diagnostics-dubai', 'transmission-repair-dubai'],
  },
  {
    name: 'Defender',
    slug: 'defender-service-dubai',
    logo: '/brand-logos/showcase/land-rover.png',
    specialization: 'Service • Repair • Diagnostics • Off-Road Systems',
    intro: 'Defender 90, Defender 110 and other Defender owners can request inspection and service at Digi-Tec in Al Quoz. Diagnostic, maintenance, air-suspension, cooling, brake, driveline and electrical scope is confirmed for the vehicle before booking.',
    whyChoose: [
      { title: 'Defender 90 & 110 Diagnostic Review', description: 'Warning, scan, coding or calibration functions depend on the fitted systems and available vehicle access; supported functions are confirmed before booking.' },
      { title: 'Terrain Response & Driveline Review', description: 'Four-wheel-drive, Terrain Response, transfer-case, differential and off-road-system concerns can be inspected; supported functions and repair scope are confirmed for the vehicle.' },
      { title: 'Air Suspension & Cooling Inspection', description: 'Air-suspension and cooling concerns can be assessed, with parts, calibration requirements and repair availability confirmed before work.' },
      { title: 'Clear Workshop Reporting', description: 'We explain the fault, the practical options and the parts required before work starts.' },
    ],
    faqs: [
      { q: 'Do you service the new Land Rover Defender in Dubai?', a: 'Send the VIN, model and requested work so diagnostic, maintenance, brake, suspension or electrical scope can be confirmed before booking.' },
      { q: 'Can you diagnose Defender warning lights?', a: 'A warning-light inspection can be requested. Available scan and live-data functions are confirmed for the fitted systems before the appointment.' },
      { q: 'Do you repair Defender air suspension?', a: 'Air-suspension concerns can be inspected. Parts, supported height-calibration access and the repair scope are confirmed for the exact vehicle before work begins.' },
      { q: 'Where is your Defender workshop?', a: 'Digi-Tec Performance Centre is in Al Quoz Industrial Area 3, Dubai. Contact us to book an inspection.' },
    ],
    relatedServices: ['suspension-repair-dubai', 'mechanical-repair-dubai', 'car-diagnostics-dubai', 'brake-repair-dubai'],
  },
);

export const getBrandBySlug = (slug: string) => brands.find((b) => b.slug === slug);

export const getSlugForOrbitName = (orbitName: string): string | undefined => {
  // Map BrandsWeServe display names to brand slugs.
  const map: Record<string, string> = {
    'Range Rover': 'land-rover-service-dubai',
    'Rolls Royce': 'rolls-royce-service-dubai',
  };
  if (map[orbitName]) return map[orbitName];
  return brands.find((b) => b.name === orbitName)?.slug;
};
