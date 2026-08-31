export const FERRARI_HUB_PATH = '/brands/ferrari-service-dubai';
export const FERRARI_MAINTENANCE_GUIDE_PATH = '/blog/ferrari-maintenance-guide-dubai';
export const FERRARI_488_GUIDE_PATH = '/blog/ferrari-488-service-dubai-guide';

export const FERRARI_SERVICE_PATHS = {
  oil: `${FERRARI_HUB_PATH}/oil-change`,
  brakes: `${FERRARI_HUB_PATH}/brake-repair`,
  transmission: `${FERRARI_HUB_PATH}/transmission-repair`,
  ac: `${FERRARI_HUB_PATH}/ac-repair`,
  suspension: `${FERRARI_HUB_PATH}/suspension-repair`,
  diagnostics: `${FERRARI_HUB_PATH}/engine-diagnostics`,
  mechanical: `${FERRARI_HUB_PATH}/mechanical-repair`,
  battery: `${FERRARI_HUB_PATH}/battery-replacement`,
  electrical: `${FERRARI_HUB_PATH}/electrical-repair`,
  tires: `${FERRARI_HUB_PATH}/tire-repair`,
} as const;

export interface FerrariModelSection {
  title: string;
  directAnswer: string;
  points: string[];
}

export interface FerrariModelLink {
  label: string;
  path: string;
  description: string;
}

export interface FerrariModelPageData {
  slug: string;
  name: string;
  shortName: string;
  path: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  directAnswer: string;
  intro: string;
  coverage: string[];
  systems: FerrariModelSection[];
  warningSigns: string[];
  diagnosticApproach: string[];
  dubaiConsiderations: string[];
  services: FerrariModelLink[];
  guides: FerrariModelLink[];
  faqs: { question: string; answer: string }[];
  hybridScopeNote?: string;
}

const link = (label: string, path: string, description: string): FerrariModelLink => ({
  label,
  path,
  description,
});

const commonServiceLinks = {
  diagnostics: link(
    'Ferrari engine diagnostics',
    FERRARI_SERVICE_PATHS.diagnostics,
    'Warning-light, live-data and physical fault tracing with supported functions confirmed for the exact vehicle.',
  ),
  transmission: link(
    'Ferrari transmission inspection',
    FERRARI_SERVICE_PATHS.transmission,
    'Commercial inspection and repair planning for the fitted Ferrari transmission after the complaint is assessed.',
  ),
  brakes: link(
    'Ferrari brake inspection',
    FERRARI_SERVICE_PATHS.brakes,
    'Pad, rotor, fluid and caliper assessment using the method applicable to the fitted brake system.',
  ),
  suspension: link(
    'Ferrari suspension inspection',
    FERRARI_SERVICE_PATHS.suspension,
    'Mechanical and electronically controlled suspension checks matched to the fitted platform.',
  ),
  maintenance: link(
    'Ferrari oil and maintenance service',
    FERRARI_SERVICE_PATHS.oil,
    'Vehicle-specific oil, filter, inspection and supported reset scope confirmed before the appointment.',
  ),
  ac: link(
    'Ferrari AC inspection',
    FERRARI_SERVICE_PATHS.ac,
    'Climate performance, leak and component checks after the refrigerant and equipment requirements are identified.',
  ),
  electrical: link(
    'Ferrari electrical diagnosis',
    FERRARI_SERVICE_PATHS.electrical,
    'Low-voltage, wiring, module communication and charging concerns assessed before parts are proposed.',
  ),
};

export const ferrariModelPages: FerrariModelPageData[] = [
  {
    slug: '488',
    name: 'Ferrari 488',
    shortName: '488',
    path: `${FERRARI_HUB_PATH}/488`,
    h1: 'Ferrari 488 Service & Repair Dubai',
    metaTitle: 'Ferrari 488 Service & Repair Dubai | DIGI-TEC',
    metaDescription: 'Ferrari 488 service and repair enquiries in Dubai for GTB, Spider and Pista models, covering F154 V8, 7-speed DCT, cooling, SCM suspension, brakes and diagnostics.',
    directAnswer: 'DIGI-TEC accepts Ferrari 488 service, inspection and diagnostic enquiries in Al Quoz, Dubai. The exact GTB, Spider or Pista variant, service history, fitted systems and complaint are reviewed before the workshop confirms tooling, parts and repair scope.',
    intro: 'The 488 combines a mid-rear twin-turbo V8 with a seven-speed dual-clutch transmission, integrated chassis controls and model-dependent brake and suspension hardware. Maintenance and diagnosis should distinguish a 488 GTB or Spider from a Pista rather than treating every 488 as one specification.',
    coverage: [
      'Ferrari 488 GTB and 488 Spider, with exact market and model-year specification confirmed from the vehicle.',
      'Ferrari 488 Pista and 488 Pista Spider enquiries, where chassis, brake, aerodynamic and usage requirements can differ from the standard 488.',
      'Road, low-mileage, storage and track-exposed vehicles, with the inspection plan adjusted to history and actual use.',
    ],
    systems: [
      {
        title: '488 maintenance planning',
        directAnswer: 'The correct service scope comes from the vehicle schedule, service record, model year and condition—not a universal mileage rule.',
        points: [
          'Confirm the applicable engine-oil specification, filter, quantities and level procedure for the exact vehicle.',
          'Review time, mileage, storage periods and previous work before recommending fluids or replacement parts.',
          'Inspect tyres by age, condition, pressure and damage as well as tread depth.',
        ],
      },
      {
        title: 'F154 twin-turbo V8',
        directAnswer: '488 road cars use a 3.9-litre F154-family twin-turbo V8, but the GTB/Spider and Pista calibrations and hardware should not be assumed identical.',
        points: [
          'Engine warnings, misfire, reduced performance, oil or coolant loss require scan evidence plus mechanical inspection.',
          'Boost, intake, ignition, fuel, crankcase and exhaust systems may produce overlapping symptoms.',
          'Oil level, pressure or temperature warnings should be treated as urgent until their cause and severity are established.',
        ],
      },
      {
        title: 'Seven-speed F1 dual-clutch transmission',
        directAnswer: 'The 488 uses a seven-speed dual-clutch transmission; it is not the same system as an older single-clutch Ferrari F1 gearbox or the later eight-speed DCT.',
        points: [
          'Record whether the concern occurs cold, hot, during selection, launch, low-speed manoeuvring or an upshift.',
          'Review codes, temperatures and supported data before proposing fluid, adaptation, clutch, hydraulic or internal work.',
          'A gearbox warning or shift symptom does not prove a clutch or mechatronic assembly has failed.',
        ],
      },
      {
        title: 'SCM-E chassis and suspension',
        directAnswer: 'The 488 platform integrates electronically controlled magnetorheological damping with its dynamic-control systems; Pista functions add further variant-specific differences.',
        points: [
          'Inspect dampers for leakage and damage, then separate mechanical wear from sensor, wiring or control faults.',
          'Control arms, bushes, wheel bearings, alignment, wheels and tyres remain part of the diagnosis.',
          'Do not describe the 488 as using generic air suspension.',
        ],
      },
      {
        title: 'Cooling and turbocharger heat management',
        directAnswer: 'Stable engine, charge-air and cabin cooling depend on clean heat exchangers, sound coolant circuits, correct airflow and functioning control systems.',
        points: [
          'Inspect visible coolant loss, residue, hose condition and heat-exchanger blockage before blaming a single component.',
          'A temperature warning, repeated fan operation or power reduction needs evidence-led diagnosis before further hard driving.',
          'Heavy AC use can expose marginal airflow or refrigerant-system performance without proving compressor failure.',
        ],
      },
      {
        title: 'Brakes, electrical systems and diagnostics',
        directAnswer: 'Brake specification and electronic functions must be identified from the vehicle; carbon-ceramic replacement decisions are condition- and procedure-based, not mileage-based.',
        points: [
          'Assess rotor, pad, caliper and fluid condition using the applicable Ferrari information and measurement method.',
          'Low battery voltage can create several warnings, but warnings must still be checked rather than attributed automatically to the battery.',
          'Compatible scan coverage, live data and special functions are confirmed per module and vehicle.',
        ],
      },
    ],
    warningSigns: [
      'Check-engine, reduced-performance or persistent misfire warning.',
      'Gearbox warning, refusal to select a gear, severe shift behaviour or fluid leakage.',
      'Coolant or oil warning, rising temperature, smoke or a strong fluid smell.',
      'Brake-pedal change, severe vibration, grinding or a red brake warning.',
      'Suspension warning, new instability, damper leakage or sudden tyre-wear change.',
      'Repeated low-voltage or module warnings after starting or storage.',
    ],
    diagnosticApproach: [
      'Capture the exact warning text, operating temperature and driving condition.',
      'Identify the variant, modifications, recent work and complete service history available.',
      'Scan relevant modules where supported and preserve codes, freeze-frame and useful live data.',
      'Test the mechanical, hydraulic or electrical system implicated by the evidence.',
      'Explain findings, further test needs, repair options and verification before approved work begins.',
    ],
    dubaiConsiderations: [
      'High ambient temperature increases the importance of cooling-system condition; it does not automatically cause a failure.',
      'Long storage can affect low-voltage battery charge, tyres, fluids and brake surfaces even when annual mileage is low.',
      'Dust and debris may reduce heat-exchanger airflow, so visible condition is checked before cleaning or replacement is proposed.',
      'Frequent short journeys and stop-start traffic can change the inspection priorities compared with open-road use.',
    ],
    services: [commonServiceLinks.maintenance, commonServiceLinks.diagnostics, commonServiceLinks.transmission, commonServiceLinks.brakes, commonServiceLinks.suspension, commonServiceLinks.ac],
    guides: [
      link('Ferrari 488 owner maintenance guide', FERRARI_488_GUIDE_PATH, 'Existing informational guidance about service planning, storage, tyres, cooling and workshop preparation.'),
      link('Ferrari maintenance in Dubai', FERRARI_MAINTENANCE_GUIDE_PATH, 'Broad ownership guidance that remains separate from this commercial model page.'),
    ],
    faqs: [
      { question: 'Where can I service a Ferrari 488 in Dubai?', answer: 'DIGI-TEC accepts Ferrari 488 service and diagnostic enquiries in Al Quoz. Send the VIN, variant, mileage, service history and requested work so the available inspection and repair scope can be confirmed.' },
      { question: 'Is the 488 gearbox the same as an older Ferrari F1 gearbox?', answer: 'No. The 488 uses a seven-speed dual-clutch transmission. Older Ferrari models may use a single-clutch automated-manual F1 system, and newer models may use a different eight-speed DCT.' },
      { question: 'Can a diagnostic scan confirm that a 488 component has failed?', answer: 'Not by itself. Codes and live data help identify the affected system, but physical, electrical or hydraulic testing may be needed before a component is condemned.' },
      { question: 'Does a low-mileage 488 still need inspection?', answer: 'Yes. Time, storage, battery charge, tyre age, fluids and brake condition still matter. The appropriate service interval and scope should follow the exact vehicle schedule, history and condition.' },
      { question: 'Do you replace 488 carbon-ceramic rotors by mileage?', answer: 'No. Any replacement recommendation should follow the applicable inspection and measurement procedure, visible condition and vehicle-specific limits rather than mileage alone.' },
    ],
  },
  {
    slug: 'f8-tributo',
    name: 'Ferrari F8 Tributo',
    shortName: 'F8 Tributo',
    path: `${FERRARI_HUB_PATH}/f8-tributo`,
    h1: 'Ferrari F8 Tributo Service & Repair Dubai',
    metaTitle: 'Ferrari F8 Tributo Service & Repair Dubai | DIGI-TEC',
    metaDescription: 'Ferrari F8 Tributo and F8 Spider service and repair enquiries in Dubai, covering F154 V8, 7-speed DCT, cooling, SCM-E, FDE+, brakes, AC and diagnostics.',
    directAnswer: 'DIGI-TEC accepts Ferrari F8 Tributo and F8 Spider service, inspection and diagnostic enquiries in Dubai. The vehicle, usage, service record and concern are reviewed before the supported diagnostic, maintenance or repair scope is confirmed.',
    intro: 'The F8 evolves the mid-rear-engine Ferrari V8 platform beyond the 488, pairing the 3.9-litre twin-turbo V8 with a seven-speed dual-clutch transmission and later-generation dynamic controls including SSC 6.1 with FDE+. Those differences deserve F8-specific service and fault-finding rather than copied 488 language.',
    coverage: [
      'Ferrari F8 Tributo coupé and F8 Spider, with body, roof and market-specific equipment confirmed from the vehicle.',
      'Standard road cars and modified or track-exposed vehicles, with changes documented before diagnosis.',
      'Low-mileage or stored vehicles where battery, tyres, fluids and heat-cycle history may matter more than distance alone.',
    ],
    systems: [
      {
        title: 'F8 maintenance planning',
        directAnswer: 'Service planning should follow the applicable schedule, recorded history, time, mileage and condition of the exact F8.',
        points: [
          'Confirm oil, filters, fluids and supported service functions before quoting the visit.',
          'Review prior track use, modifications and repeated high-temperature operation where relevant.',
          'Inspect tyres, brakes and cooling as an integrated performance baseline.',
        ],
      },
      {
        title: 'F154-family 3.9 twin-turbo V8',
        directAnswer: 'The F8 uses a later, high-output development of Ferrari’s 3.9-litre twin-turbo V8; 488 specifications should not be substituted automatically.',
        points: [
          'Diagnose misfire, boost, fuel, oil or temperature symptoms from recorded evidence and tests.',
          'Inspect intake, turbocharger, charge-air, cooling and exhaust systems as connected systems.',
          'Account for approved modifications because software or hardware changes alter the diagnostic baseline.',
        ],
      },
      {
        title: 'Seven-speed dual-clutch transmission',
        directAnswer: 'The F8 retains a seven-speed dual-clutch transmission, distinct from Ferrari’s later eight-speed DCT used by Roma, SF90 and other newer platforms.',
        points: [
          'Separate engine torque disturbances, mounts and driveline behaviour from an internal gearbox fault.',
          'Review supported codes, temperatures and adaptation data before proposing service or component work.',
          'Confirm the correct fluid, fill process, parts and available functions for the exact gearbox.',
        ],
      },
      {
        title: 'SSC 6.1, FDE+ and SCM-E',
        directAnswer: 'F8 chassis behaviour integrates SSC 6.1, Ferrari Dynamic Enhancer Plus and electronically controlled magnetorheological damping.',
        points: [
          'A chassis warning may involve sensors, brake control, damping, wiring, tyres or mechanical components.',
          'Inspect dampers, joints, mounts, alignment and tyre condition before assuming an electronic failure.',
          'Calibration or reset functions are included only when required and supported for the exact repair.',
        ],
      },
      {
        title: 'Cooling, airflow and AC',
        directAnswer: 'F8 thermal management depends on unobstructed airflow and sound engine, charge-air and climate-control systems.',
        points: [
          'Assess heat-exchanger faces, fans, coolant circuits and available temperature data when heat warnings occur.',
          'Do not treat repeated fan activity or reduced performance as proof of one failed component.',
          'Confirm refrigerant and equipment requirements from the vehicle label before AC recovery or charging.',
        ],
      },
      {
        title: 'Brakes, tyres and electrical diagnosis',
        directAnswer: 'F8 braking and electrical checks should use the fitted specification, measured condition and exact warning history.',
        points: [
          'Use the applicable carbon-ceramic inspection method and limits where that system is fitted.',
          'Check tyre age, heat damage, pressure and matching fitment as part of chassis diagnosis.',
          'Load-test the low-voltage system where appropriate but preserve diagnostic evidence before clearing warnings.',
        ],
      },
    ],
    warningSigns: [
      'Engine warning, misfire, reduced power or unusual turbo/intake noise.',
      'Gearbox warning, delayed selection, severe shift change or visible fluid leak.',
      'Temperature warning, coolant loss, smoke or persistent hot-fluid odour.',
      'Suspension or stability-system warning, leaking damper or handling change.',
      'Brake warning, pedal change, severe vibration or abnormal rotor/pad noise.',
      'Multiple electrical warnings after storage, charging or battery work.',
    ],
    diagnosticApproach: [
      'Confirm the F8 variant, modifications, service history and exact driver complaint.',
      'Record warnings and reproduce the concern only when it is safe and appropriate.',
      'Review supported module data alongside mechanical and electrical checks.',
      'Test the implicated system and explain what the evidence proves—and what it does not.',
      'Confirm repair scope, parts, supported procedures and final verification before work proceeds.',
    ],
    dubaiConsiderations: [
      'Cooling and AC condition deserve attention before peak-temperature or repeated high-load use.',
      'Low annual mileage does not prevent battery discharge, tyre ageing or fluid deterioration.',
      'Dust may affect visible heat-exchanger condition, but cleaning should follow inspection rather than assumption.',
      'Tyre pressure and condition change with temperature and remain central to chassis performance.',
    ],
    services: [commonServiceLinks.maintenance, commonServiceLinks.diagnostics, commonServiceLinks.transmission, commonServiceLinks.suspension, commonServiceLinks.brakes, commonServiceLinks.ac],
    guides: [
      link('Ferrari maintenance in Dubai', FERRARI_MAINTENANCE_GUIDE_PATH, 'Ownership planning for heat, storage, tyres, batteries, fluids and inspection preparation.'),
      link('Ferrari 488 maintenance guide', FERRARI_488_GUIDE_PATH, 'A related predecessor-platform guide; F8 specifications must still be confirmed independently.'),
    ],
    faqs: [
      { question: 'Where can I service a Ferrari F8 in Dubai?', answer: 'DIGI-TEC accepts F8 Tributo and F8 Spider service and diagnostic enquiries in Al Quoz. Share the VIN, year, mileage, service history and requested work so scope can be confirmed.' },
      { question: 'Is an F8 mechanically the same as a Ferrari 488?', answer: 'No. They share a platform lineage and a 3.9-litre twin-turbo V8 architecture, but engine, controls, aerodynamics and other specifications differ. Parts and procedures should be confirmed for the F8.' },
      { question: 'Does the F8 use an eight-speed gearbox?', answer: 'No. The F8 uses a seven-speed dual-clutch transmission. The eight-speed Ferrari DCT appears on later platforms such as the Roma and SF90.' },
      { question: 'Can you diagnose an F8 suspension warning from the code alone?', answer: 'No. Codes identify an affected circuit or control condition, but damper condition, sensors, wiring, tyres, alignment and other chassis inputs may need inspection.' },
      { question: 'Should an F8 be inspected after long storage?', answer: 'A post-storage assessment can review battery charge, tyres, fluids, brake condition, leaks and stored warnings. The exact scope depends on storage duration and vehicle condition.' },
    ],
  },
  {
    slug: 'roma',
    name: 'Ferrari Roma',
    shortName: 'Roma',
    path: `${FERRARI_HUB_PATH}/roma`,
    h1: 'Ferrari Roma Service & Repair Dubai',
    metaTitle: 'Ferrari Roma Service & Repair Dubai | DIGI-TEC',
    metaDescription: 'Ferrari Roma and Roma Spider service and repair enquiries in Dubai, covering 3.9 turbo V8, 8-speed DCT, SCM-E, cooling, brakes, AC and electrical diagnostics.',
    directAnswer: 'DIGI-TEC accepts Ferrari Roma and Roma Spider inspection, maintenance and diagnostic enquiries in Dubai. The exact vehicle, service history, warning message and fitted equipment are reviewed before workshop scope is confirmed.',
    intro: 'The Roma is a front-mid-engine Ferrari GT with a 3.9-litre turbocharged V8 and the newer eight-speed dual-clutch transmission. Its packaging, chassis electronics, comfort systems and usage pattern differ from the mid-engine 488 and F8, so the service plan must be Roma-specific.',
    coverage: [
      'Ferrari Roma coupé and Roma Spider, with roof, body and model-year differences identified before work.',
      'Daily-used, touring, low-mileage and stored vehicles, each of which can create a different inspection priority.',
      'Standard and modified vehicles after the installed hardware and software changes are documented.',
    ],
    systems: [
      {
        title: 'Roma maintenance and GT usage',
        directAnswer: 'Roma service scope should reflect its schedule, history, time, mileage and real use rather than adopting a mid-engine Ferrari checklist.',
        points: [
          'Review engine oil, filters, fluid condition, tyres, brakes, battery and climate performance.',
          'Account for short trips, extended parking, touring and frequent AC use when planning checks.',
          'Confirm supported service-reset and diagnostic-report functions before quoting them.',
        ],
      },
      {
        title: '3.9-litre turbocharged V8',
        directAnswer: 'The Roma uses a front-mid-mounted 3.9-litre turbo V8 from the F154 family, with Roma-specific hardware and calibration.',
        points: [
          'Misfire, boost, temperature, oil or fuel symptoms can have several interacting causes.',
          'Inspect the intake, ignition, fuel, cooling, turbo and exhaust systems according to the complaint.',
          'Do not substitute 488 or F8 oil, cooling or parts information without vehicle confirmation.',
        ],
      },
      {
        title: 'Eight-speed F1 dual-clutch transmission',
        directAnswer: 'The Roma uses Ferrari’s newer eight-speed dual-clutch transmission, not the seven-speed unit used by the 488 and F8.',
        points: [
          'Document shift quality, engagement, temperature, warning text and the conditions that reproduce the complaint.',
          'Review supported data and separate engine, mount and driveline inputs from a gearbox fault.',
          'Verify fluid, parts, functions and repair availability for the exact unit before work.',
        ],
      },
      {
        title: 'SCM-E Frs, SSC 6.0 and FDE',
        directAnswer: 'Roma chassis control integrates electronically controlled damping and dynamic-control systems that differ from both older Ferrari GTs and the F8.',
        points: [
          'Inspect dampers, arms, bushes, sensors, wiring, alignment, wheels and tyres as one diagnostic path.',
          'A dynamic-control warning does not establish whether the fault is mechanical, electrical or calibration-related.',
          'The Roma should not be described using generic air-suspension terminology.',
        ],
      },
      {
        title: 'Cooling, AC and everyday operation',
        directAnswer: 'The Roma’s GT use can combine stop-start traffic, sustained AC demand and turbocharged-engine heat, making airflow and cooling condition important inspection areas.',
        points: [
          'Check condenser and radiator condition, fans, coolant circuits and available temperature data as appropriate.',
          'Diagnose weak AC using pressures, temperatures, airflow and leak testing rather than an automatic regas.',
          'Confirm refrigerant and equipment compatibility from the vehicle before connection.',
        ],
      },
      {
        title: 'Electrical, comfort and brake systems',
        directAnswer: 'Roma diagnostics may involve powertrain, chassis, body, infotainment, roof or comfort modules depending on the exact variant and symptom.',
        points: [
          'Low-voltage testing may be relevant after storage or repeated warnings, but it does not replace module diagnosis.',
          'Inspect brake hardware and fluid using the vehicle-specific system and condition rather than a generic Ferrari interval.',
          'Module programming or special functions are promised only after compatibility and access are confirmed.',
        ],
      },
    ],
    warningSigns: [
      'Check-engine or reduced-performance warning, misfire or hesitation.',
      'Gearbox warning, harsh or delayed engagement, or inability to select a drive mode.',
      'Cooling warning, coolant odour, fluid loss or repeated high-temperature message.',
      'Chassis, suspension or stability warning with a change in ride or handling.',
      'Persistent body, infotainment, roof or comfort-system fault.',
      'Brake warning, pedal change, vibration or unusual noise.',
    ],
    diagnosticApproach: [
      'Identify Roma or Roma Spider, model year, equipment, changes and service history.',
      'Record the exact warning and whether the concern is temperature-, speed- or time-dependent.',
      'Scan the relevant supported modules and preserve useful data before clearing anything.',
      'Perform the mechanical, electrical, pressure or leak tests required by the evidence.',
      'Provide a staged repair and verification plan where the concern cannot be proven in one step.',
    ],
    dubaiConsiderations: [
      'Stop-start traffic and heavy AC use can reveal marginal cooling or electrical condition without being the sole cause.',
      'Stored GT vehicles still need battery, tyre, brake and fluid-condition attention.',
      'Long road trips should follow checks of tyres, cooling, fluids and recorded warnings appropriate to the vehicle.',
      'Dust exposure can be considered during airflow inspection without assuming that every heat issue comes from blockage.',
    ],
    services: [commonServiceLinks.maintenance, commonServiceLinks.diagnostics, commonServiceLinks.transmission, commonServiceLinks.suspension, commonServiceLinks.ac, commonServiceLinks.electrical],
    guides: [
      link('Ferrari maintenance in Dubai', FERRARI_MAINTENANCE_GUIDE_PATH, 'Broad maintenance, storage and workshop-preparation guidance for Ferrari owners.'),
      link('Ferrari brake inspection', FERRARI_SERVICE_PATHS.brakes, 'Commercial brake-system assessment for the fitted Roma specification.'),
    ],
    faqs: [
      { question: 'Where can I service a Ferrari Roma in Dubai?', answer: 'DIGI-TEC accepts Roma and Roma Spider inspection, maintenance and diagnostic enquiries in Al Quoz. Send the VIN, year, mileage, service record and concern before booking.' },
      { question: 'Does the Ferrari Roma use the same gearbox as a 488?', answer: 'No. The Roma uses an eight-speed dual-clutch transmission, while the 488 uses a seven-speed DCT. Their service data, parts and diagnostic procedures should not be interchanged.' },
      { question: 'Can low battery voltage cause several Roma warnings?', answer: 'Low voltage can contribute to multiple warnings, especially after storage, but each warning still requires evidence-led assessment. A battery test alone does not prove every fault is voltage-related.' },
      { question: 'Is weak Roma AC always low refrigerant?', answer: 'No. Possible causes include charge level, leakage, airflow, fan performance, pressure control, compressor operation, sensors or actuators. Testing should identify the cause before charging or replacement.' },
      { question: 'Can DIGI-TEC confirm programming availability before booking?', answer: 'Yes. Send the VIN, model year, module and requested function. Availability depends on the vehicle, software, security or account requirements and compatible tool access.' },
    ],
  },
  {
    slug: 'sf90',
    name: 'Ferrari SF90',
    shortName: 'SF90',
    path: `${FERRARI_HUB_PATH}/sf90`,
    h1: 'Ferrari SF90 Service & Diagnostic Assessment Dubai',
    metaTitle: 'Ferrari SF90 Service & Diagnostics Dubai | DIGI-TEC',
    metaDescription: 'Ferrari SF90 service and diagnostic assessment enquiries in Dubai for V8, plug-in hybrid, 8-speed DCT, E4WD, cooling, brakes, low-voltage and warning concerns.',
    directAnswer: 'DIGI-TEC accepts Ferrari SF90 service and diagnostic-assessment enquiries in Dubai. Because the SF90 is a plug-in hybrid with high-voltage systems, the VIN, warning, affected system and required safety or tool access are reviewed before any workshop scope is confirmed.',
    intro: 'The SF90 is not a conventional V8 Ferrari with an added battery. It combines a 4.0-litre twin-turbo V8, three electric motors, a high-voltage battery, electric front axle, rear motor, eight-speed DCT, regenerative braking and multiple cooling circuits. Inspection must separate these systems and remain inside verified high-voltage capability.',
    hybridScopeNote: 'DIGI-TEC does not claim high-voltage battery-pack opening, inverter repair, electric-motor repair or high-voltage component replacement on this page. Any hybrid work is limited to a vehicle-specific diagnostic review and scope confirmation before the car is accepted.',
    coverage: [
      'Ferrari SF90 Stradale and SF90 Spider enquiries, including exact model year and market specification.',
      'Assetto Fiorano-equipped vehicles after fitted suspension, wheels, tyres and other option differences are identified.',
      'SF90 XX enquiries only after the precise variant, transport, safety, tooling and workshop scope are confirmed; standard SF90 procedures must not be assumed.',
    ],
    systems: [
      {
        title: 'SF90 maintenance and safety planning',
        directAnswer: 'Routine and diagnostic work begins by separating low-voltage, high-voltage, combustion-engine, transmission and chassis requirements.',
        points: [
          'Confirm the exact vehicle, service history, warning state, storage condition and requested work before arrival.',
          'Identify whether high-voltage isolation, specialist PPE, access information or transport constraints affect safe acceptance.',
          'Keep routine service decisions tied to the applicable Ferrari schedule and vehicle record.',
        ],
      },
      {
        title: '4.0-litre twin-turbo V8',
        directAnswer: 'The SF90 uses a dry-sump 4.0-litre twin-turbo V8 that operates as one part of an integrated hybrid powertrain.',
        points: [
          'Engine warnings may be influenced by combustion, boost, fuel, cooling, exhaust or hybrid torque-management conditions.',
          'Do not diagnose the V8 independently from the recorded hybrid and transmission state.',
          'Fluid, filter, oil-level and repair procedures must be confirmed for the exact SF90 variant.',
        ],
      },
      {
        title: 'Plug-in hybrid and high-voltage systems',
        directAnswer: 'The SF90 combines two front electric motors, one rear motor and a high-voltage battery with the combustion engine.',
        points: [
          'A hybrid warning may involve isolation, cooling, charging, communications, sensors, power electronics or another linked system.',
          'Fault codes alone cannot establish that a battery, inverter or motor requires replacement.',
          'Diagnostic coverage and safe workshop scope are confirmed before any high-voltage-related appointment.',
        ],
      },
      {
        title: 'Eight-speed DCT and E4WD',
        directAnswer: 'The SF90 uses an eight-speed dual-clutch transmission and an electrically driven front axle, so driveline diagnosis must consider both mechanical and electric torque paths.',
        points: [
          'Record whether the issue appears in eDrive, Hybrid, Performance or Qualify operation and at what state of charge.',
          'Selection, reverse, launch and shift complaints may involve different systems and require different safety decisions.',
          'Transmission fluid, adaptation or internal-work availability is confirmed for the exact unit after diagnosis.',
        ],
      },
      {
        title: 'Cooling, charging and electrical networks',
        directAnswer: 'The SF90 has separate thermal needs for the engine, transmission, turbo charge air, battery, motors, inverter, charging and brake systems.',
        points: [
          'Temperature or charging warnings require identification of the affected circuit before parts are proposed.',
          'Low-voltage battery condition and module communication still matter even though the car has a high-voltage battery.',
          'Charging-equipment or inlet concerns must be separated from vehicle, supply and high-voltage faults.',
        ],
      },
      {
        title: 'Regenerative braking and active chassis',
        directAnswer: 'SF90 braking blends regenerative and friction braking, while eSSC, E4WD, SCM and FDE functions coordinate the active chassis.',
        points: [
          'A brake or chassis warning can involve hydraulic, friction, regenerative, sensor, electrical or tyre-related inputs.',
          'Inspect carbon-ceramic components using the applicable condition and measurement procedure.',
          'Calibration, bleeding or control functions are included only when the exact repair and available access support them.',
        ],
      },
    ],
    warningSigns: [
      'Red high-voltage, isolation, charging, brake, oil-pressure or temperature warning.',
      'Loss of drive, inability to select a mode, severe gearbox behaviour or unexpected reverse limitation.',
      'Repeated hybrid-system warning, reduced combined performance or abnormal state-of-charge behaviour.',
      'Coolant loss, smoke, strong electrical or fluid smell, or visible leakage.',
      'Brake-pedal change, chassis warning or sudden change in vehicle stability.',
      'Multiple low-voltage or communication warnings after storage or charging.',
    ],
    diagnosticApproach: [
      'Confirm whether the vehicle is safe to move and whether recovery is more appropriate than driving.',
      'Record the exact mode, state of charge, temperature, warning text and operating condition.',
      'Identify the implicated low-voltage, high-voltage, engine, transmission, cooling, charging or chassis system.',
      'Confirm compatible access, safety procedure and workshop capability before testing continues.',
      'Present findings and a supported next step without promising work outside the verified scope.',
    ],
    dubaiConsiderations: [
      'High ambient temperature makes unobstructed cooling and correct system operation important, but heat alone is not a diagnosis.',
      'Charging and storage routines can affect low-voltage condition and the symptoms an owner observes.',
      'AC, battery and power-electronics cooling may place simultaneous thermal demand on the vehicle.',
      'Transport and safe handling should be discussed before moving a car with a red hybrid, isolation or temperature warning.',
    ],
    services: [commonServiceLinks.diagnostics, commonServiceLinks.maintenance, commonServiceLinks.transmission, commonServiceLinks.brakes, commonServiceLinks.electrical, commonServiceLinks.ac],
    guides: [
      link('Ferrari maintenance in Dubai', FERRARI_MAINTENANCE_GUIDE_PATH, 'General ownership guidance; the SF90 still requires its own hybrid-aware plan.'),
      link('Ferrari battery and electrical inspection', FERRARI_SERVICE_PATHS.electrical, 'Commercial low-voltage and supported electrical diagnosis, with high-voltage scope confirmed separately.'),
    ],
    faqs: [
      { question: 'Where can I service a Ferrari SF90 in Dubai?', answer: 'DIGI-TEC accepts SF90 service and diagnostic-assessment enquiries in Al Quoz. Send the VIN, model year, warning text, operating mode and requested work first so safety, tooling and available scope can be confirmed.' },
      { question: 'Does DIGI-TEC repair SF90 high-voltage battery packs?', answer: 'No such capability is claimed on this page. Battery-pack opening, inverter repair, motor repair and high-voltage component replacement require specific verified capability. The workshop will review the vehicle and requested scope before accepting high-voltage-related work.' },
      { question: 'Is an SF90 gearbox warning always a DCT fault?', answer: 'No. The SF90 coordinates an eight-speed DCT, rear electric motor, front electric axle, combustion engine and hybrid controls. The warning context and supporting evidence determine which system requires testing.' },
      { question: 'Can the SF90 be driven with a hybrid warning?', answer: 'It depends on the exact warning, colour, vehicle behaviour and safety state. Stop for red warnings, smoke, fluid loss, strong odour, overheating or loss of drive and request advice or recovery.' },
      { question: 'Why can low-voltage condition matter on a plug-in hybrid Ferrari?', answer: 'Control modules, contactors, communications and startup sequences still depend on the low-voltage system. Testing it can be relevant, but it does not replace diagnosis of the high-voltage or affected system.' },
    ],
  },
  {
    slug: '296',
    name: 'Ferrari 296',
    shortName: '296',
    path: `${FERRARI_HUB_PATH}/296`,
    h1: 'Ferrari 296 Service & Diagnostic Assessment Dubai',
    metaTitle: 'Ferrari 296 Service & Diagnostics Dubai | DIGI-TEC',
    metaDescription: 'Ferrari 296 GTB and GTS service and diagnostic assessment in Dubai for V6 PHEV, MGU-K, 8-speed DCT, cooling, brakes, charging and warning concerns.',
    directAnswer: 'DIGI-TEC accepts Ferrari 296 GTB and 296 GTS service and diagnostic-assessment enquiries in Dubai. Because the 296 uses a plug-in hybrid system, the VIN, exact variant, warning state, requested work and required safety or diagnostic access are reviewed before workshop acceptance.',
    intro: 'The Ferrari 296 combines a rear-mid-mounted 120-degree twin-turbo V6 with a rear electric MGU-K, Transition Manager Actuator, high-voltage battery and eight-speed dual-clutch transmission. Unlike the all-wheel-drive SF90, the 296 road-car hybrid architecture drives the rear wheels, so the two platforms should not share generic hybrid wording or diagnostic assumptions.',
    hybridScopeNote: 'DIGI-TEC does not claim 296 high-voltage battery-pack opening, inverter repair, electric-motor repair or high-voltage component replacement on this page. Hybrid-related enquiries receive a vehicle-specific safety and diagnostic-scope review before the car is accepted.',
    coverage: [
      'Ferrari 296 GTB and 296 GTS, with retractable-hard-top, model-year and market differences identified before work.',
      'Low-mileage, stored, touring and track-exposed vehicles, with service and inspection priorities adjusted to recorded use.',
      '296 Speciale or Speciale A enquiries only after the exact variant, technical information, tooling, transport and workshop scope are confirmed.',
    ],
    systems: [
      {
        title: '296 maintenance and hybrid safety',
        directAnswer: 'Maintenance planning must separate routine combustion-engine work from low-voltage, high-voltage, charging, transmission and chassis requirements.',
        points: [
          'Confirm the VIN, variant, service history, battery state, warning status and requested work before arrival.',
          'Identify any high-voltage isolation, PPE, transport or information requirement before accepting hybrid-related work.',
          'Use the applicable Ferrari schedule and vehicle record rather than importing an SF90 or non-hybrid service checklist.',
        ],
      },
      {
        title: '120-degree twin-turbo V6',
        directAnswer: 'The 296 uses a dry-sump 3.0-litre twin-turbo V6 that operates as part of an integrated plug-in hybrid powertrain.',
        points: [
          'Engine warnings may involve combustion, boost, fuel, exhaust, cooling or hybrid torque-management conditions.',
          'Verify oil, filter, quantity, level and bleeding procedures for the exact 296 variant.',
          'Do not diagnose the V6 independently from recorded MGU-K, TMA, DCT and hybrid-control state.',
        ],
      },
      {
        title: 'MGU-K, TMA and high-voltage system',
        directAnswer: 'The rear electric motor sits between the combustion engine and eight-speed DCT, while the TMA manages connection and disconnection of the two power sources.',
        points: [
          'A hybrid warning can involve charging, isolation, cooling, communications, sensors, inverter, battery or TMA-related conditions.',
          'Fault codes do not prove that a battery pack, inverter, motor or actuator requires replacement.',
          'Diagnostic coverage and safe workshop scope are confirmed before any high-voltage-related appointment.',
        ],
      },
      {
        title: 'Eight-speed DCT and rear-wheel-drive hybrid',
        directAnswer: 'The 296 uses an eight-speed dual-clutch transmission coordinated with the rear MGU-K; it does not use the SF90 electric front axle.',
        points: [
          'Record mode, state of charge, temperature and the exact selection, engagement or shift condition.',
          'Separate engine, electric-motor, TMA, mounting and control inputs from an internal DCT fault.',
          'Fluid, supported adaptation data and internal-work availability are confirmed for the fitted unit.',
        ],
      },
      {
        title: 'Cooling, charging and low-voltage networks',
        directAnswer: 'Engine, turbocharger, transmission, cabin, high-voltage and power-electronics thermal demands can overlap during Dubai use.',
        points: [
          'Identify the affected circuit before treating a temperature or charging warning as one generic cooling fault.',
          'Low-voltage condition and module communication remain relevant to startup and hybrid-control sequences.',
          'Separate charging-equipment, supply, inlet and vehicle faults before recommending parts.',
        ],
      },
      {
        title: 'eSSC, braking and chassis controls',
        directAnswer: 'The 296 integrates regenerative and friction braking with eSSC, ABS Evo, SCM and Ferrari Dynamic Enhancer functions.',
        points: [
          'A brake or chassis warning may involve hydraulic, friction, regenerative, tyre, sensor or network inputs.',
          'Inspect the fitted brake system using the applicable measurement and condition procedure.',
          'Bleeding, calibration and supported chassis functions are included only when confirmed for the repair.',
        ],
      },
    ],
    warningSigns: [
      'Red hybrid, isolation, charging, brake, oil-pressure or temperature warning.',
      'Loss of drive, inability to select a mode, abnormal engagement or severe shift behaviour.',
      'Repeated hybrid warning, reduced combined performance or unexpected state-of-charge behaviour.',
      'Coolant loss, smoke, strong electrical or fluid odour, or visible leakage.',
      'Brake-pedal change, chassis warning or sudden change in stability.',
      'Multiple communication or low-voltage warnings after storage or charging.',
    ],
    diagnosticApproach: [
      'Confirm whether the vehicle is safe to move or requires recovery.',
      'Record the exact eManettino mode, state of charge, temperature, warning text and operating condition.',
      'Separate low-voltage, high-voltage, V6, MGU-K, TMA, DCT, cooling, charging and chassis systems.',
      'Confirm compatible access, safety procedure and workshop capability before testing continues.',
      'Provide a documented next step without promising work outside the verified scope.',
    ],
    dubaiConsiderations: [
      'High ambient temperature increases thermal demand but does not by itself identify the failed system.',
      'Long storage can affect low-voltage condition, tyres, fluids and the symptoms seen during hybrid startup.',
      'Charging, cabin AC and powertrain cooling may create simultaneous demand during hot-weather use.',
      'Discuss recovery before moving a 296 with a red hybrid, isolation, temperature or loss-of-drive warning.',
    ],
    services: [commonServiceLinks.diagnostics, commonServiceLinks.maintenance, commonServiceLinks.transmission, commonServiceLinks.brakes, commonServiceLinks.electrical, commonServiceLinks.ac],
    guides: [
      link('Ferrari maintenance in Dubai', FERRARI_MAINTENANCE_GUIDE_PATH, 'Broad ownership and workshop-preparation guidance; the 296 still requires a hybrid-aware plan.'),
      link('Ferrari electrical diagnosis', FERRARI_SERVICE_PATHS.electrical, 'Commercial low-voltage and supported electrical diagnosis, with high-voltage scope confirmed separately.'),
    ],
    faqs: [
      { question: 'Where can I service a Ferrari 296 in Dubai?', answer: 'DIGI-TEC accepts 296 GTB and GTS service and diagnostic-assessment enquiries in Al Quoz. Send the VIN, exact variant, warning text, state of charge and requested work so safety and workshop scope can be confirmed.' },
      { question: 'Does DIGI-TEC repair Ferrari 296 high-voltage battery packs?', answer: 'No such capability is claimed on this page. Battery-pack opening, inverter repair, motor repair and high-voltage component replacement require specific verified capability. The requested work is reviewed before acceptance.' },
      { question: 'Is the Ferrari 296 hybrid system the same as the SF90?', answer: 'No. Both use plug-in hybrid technology and an eight-speed DCT, but the 296 has a rear-wheel-drive hybrid architecture with one rear MGU-K; the SF90 also has an electric front axle and three electric motors in total.' },
      { question: 'Is a 296 gearbox warning always an internal DCT fault?', answer: 'No. The DCT is coordinated with the V6, MGU-K, TMA and hybrid controls. Warning context and test evidence determine which system needs further assessment.' },
      { question: 'Can a Ferrari 296 be driven with a hybrid warning?', answer: 'It depends on the exact warning and vehicle behaviour. Stop for red warnings, smoke, strong odour, fluid loss, overheating or loss of drive and request advice or recovery.' },
    ],
  },
  {
    slug: 'portofino',
    name: 'Ferrari Portofino',
    shortName: 'Portofino',
    path: `${FERRARI_HUB_PATH}/portofino`,
    h1: 'Ferrari Portofino Service & Repair Dubai',
    metaTitle: 'Ferrari Portofino Service & Repair Dubai | DIGI-TEC',
    metaDescription: 'Ferrari Portofino and Portofino M service and repair enquiries in Dubai for V8, 7- or 8-speed DCT, retractable roof, SCM-E, cooling, AC and diagnostics.',
    directAnswer: 'DIGI-TEC accepts Ferrari Portofino and Portofino M service, inspection and diagnostic enquiries in Al Quoz, Dubai. The exact model, gearbox, roof system, service history and complaint are identified before diagnostic access, parts and repair scope are confirmed.',
    intro: 'The original Portofino and the later Portofino M share a front-mid-engine turbocharged V8 GT layout, but they should not be treated as one specification. The original uses a seven-speed dual-clutch transmission, while the Portofino M introduced an eight-speed DCT and later dynamic-control package.',
    coverage: [
      'Ferrari Portofino with the original seven-speed dual-clutch transmission and model-specific control systems.',
      'Ferrari Portofino M with the later eight-speed DCT, five-position Manettino and revised dynamic controls.',
      'Daily-driven, touring, low-mileage and stored cars, including retractable-hard-top concerns after the fitted system and symptom are confirmed.',
    ],
    systems: [
      {
        title: 'Portofino maintenance planning',
        directAnswer: 'Service scope comes from the exact Portofino version, schedule, recorded history, time, mileage and condition.',
        points: [
          'Confirm engine-oil approval, filters, fluid requirements and supported reset functions for the VIN.',
          'Review roof operation, battery condition, tyres, brakes, cooling and AC alongside routine powertrain work.',
          'Account for storage and short-trip use without applying one universal Ferrari interval.',
        ],
      },
      {
        title: '3.9-litre twin-turbo V8',
        directAnswer: 'Both Portofino generations use an F154-family 3.9-litre twin-turbo V8, with model-specific hardware and calibration.',
        points: [
          'Trace misfire, boost, temperature, oil, coolant or fuel concerns using scan evidence and physical testing.',
          'Inspect intake, ignition, fuel, turbocharger, exhaust and cooling systems according to the complaint.',
          'Do not substitute Roma, California or mid-engine Ferrari parts information without vehicle confirmation.',
        ],
      },
      {
        title: 'Seven-speed versus eight-speed DCT',
        directAnswer: 'The original Portofino uses a seven-speed DCT; the Portofino M uses a later eight-speed DCT.',
        points: [
          'Identify the exact gearbox before discussing fluid, data, adaptation, parts or internal repair.',
          'Record whether the concern occurs cold, hot, during selection, low-speed manoeuvring or a particular shift.',
          'Separate powertrain, mounting and control inputs from an internal transmission fault.',
        ],
      },
      {
        title: 'SCM-E, steering and dynamic controls',
        directAnswer: 'Portofino chassis systems use electronically controlled magnetorheological damping, while Portofino M adds later SSC integration and FDE operation in Race mode.',
        points: [
          'Inspect dampers, mounts, arms, bushes, tyres, alignment, sensors and wiring as one chassis path.',
          'Do not describe the Portofino as using generic air suspension.',
          'Calibration or special functions are included only when supported for the exact version and repair.',
        ],
      },
      {
        title: 'Retractable hard top and body systems',
        directAnswer: 'Roof diagnosis must consider hydraulic or electric actuation, latches, position inputs, partitions, wiring, voltage and mechanical alignment as fitted.',
        points: [
          'Record the exact stage at which roof movement stops, slows or produces a warning.',
          'Check battery voltage and module data without assuming low voltage is the sole cause.',
          'Confirm parts, access and roof-repair scope before dismantling or component replacement.',
        ],
      },
      {
        title: 'Cooling, AC, brakes and electrical systems',
        directAnswer: 'GT use in Dubai combines turbocharged-engine heat, sustained AC demand and comfort-system electrical load.',
        points: [
          'Inspect radiators, condensers, fans, coolant circuits and relevant temperature data when symptoms justify it.',
          'Confirm refrigerant and equipment requirements from the vehicle before AC connection or charging.',
          'Identify the fitted brake system and use condition-based measurement rather than mileage alone.',
        ],
      },
    ],
    warningSigns: [
      'Check-engine, reduced-performance, oil-pressure or cooling warning.',
      'Gearbox warning, delayed engagement or repeatable harsh shift.',
      'Roof warning, incomplete latch, stopped movement or water-entry concern.',
      'Suspension, steering or stability warning with changed ride or handling.',
      'Weak AC, coolant odour, fluid loss or repeated high temperature.',
      'Brake warning, pedal change, vibration or persistent abnormal noise.',
    ],
    diagnosticApproach: [
      'Identify original Portofino or Portofino M, model year, VIN, fitted options and prior work.',
      'Record the exact warning and conditions that reproduce the engine, DCT, roof, chassis or climate concern.',
      'Scan the relevant supported modules and preserve useful data before clearing faults.',
      'Perform the required mechanical, electrical, pressure, alignment or leak tests.',
      'Confirm a staged repair and verification plan when the concern cannot be proven in one step.',
    ],
    dubaiConsiderations: [
      'Heat and stop-start traffic increase cooling and AC demand but are not a diagnosis by themselves.',
      'Long storage can affect low-voltage condition, tyre age, fluids, roof operation and brake surfaces.',
      'Roof seals and drains deserve condition checks where water entry, noise or prior work is reported.',
      'Before touring, review tyres, cooling, fluids, roof operation and recorded warnings appropriate to the vehicle.',
    ],
    services: [commonServiceLinks.maintenance, commonServiceLinks.diagnostics, commonServiceLinks.transmission, commonServiceLinks.suspension, commonServiceLinks.ac, commonServiceLinks.electrical],
    guides: [
      link('Ferrari maintenance in Dubai', FERRARI_MAINTENANCE_GUIDE_PATH, 'Ownership, storage and inspection preparation for Ferrari owners in Dubai.'),
      link('Ferrari brake inspection', FERRARI_SERVICE_PATHS.brakes, 'Commercial brake-system assessment after the fitted Portofino specification is identified.'),
    ],
    faqs: [
      { question: 'Where can I service a Ferrari Portofino in Dubai?', answer: 'DIGI-TEC accepts Portofino and Portofino M service and diagnostic enquiries in Al Quoz. Send the VIN, exact model, year, mileage, service history and concern before booking.' },
      { question: 'Does every Ferrari Portofino use the same gearbox?', answer: 'No. The original Portofino uses a seven-speed dual-clutch transmission, while the Portofino M uses an eight-speed DCT. Their fluid, parts and procedures should not be interchanged.' },
      { question: 'Can low battery voltage stop the Portofino roof?', answer: 'Low voltage can contribute to roof or communication warnings, especially after storage, but latch, sensor, actuator, wiring, hydraulic and alignment conditions may also require testing.' },
      { question: 'Is a Portofino suspension warning an air-suspension fault?', answer: 'No generic air-suspension claim should be made. Portofino models use SCM-E magnetorheological damping; the exact mechanical, sensor, wiring or control cause needs diagnosis.' },
      { question: 'Can DIGI-TEC confirm roof-repair scope before booking?', answer: 'The VIN, warning, roof position and symptoms can be reviewed first. Final parts and repair scope may still require an in-workshop inspection.' },
    ],
  },
  {
    slug: '812',
    name: 'Ferrari 812',
    shortName: '812',
    path: `${FERRARI_HUB_PATH}/812`,
    h1: 'Ferrari 812 Service & Repair Dubai',
    metaTitle: 'Ferrari 812 Service & Repair Dubai | DIGI-TEC',
    metaDescription: 'Ferrari 812 Superfast, GTS and Competizione service and repair enquiries in Dubai for 6.5 V12, 7-speed DCT, SCM-E, steering, cooling and diagnostics.',
    directAnswer: 'DIGI-TEC accepts Ferrari 812 Superfast, 812 GTS and 812 Competizione-family service, inspection and diagnostic enquiries in Dubai. The exact variant, usage, fitted chassis systems, service history and requested work are confirmed before workshop scope.',
    intro: 'The 812 family combines a front-mid-mounted naturally aspirated 6.5-litre V12 with a rear seven-speed dual-clutch transaxle. Superfast and GTS models use an earlier chassis-control package than the limited Competizione variants, whose steering, damping, aerodynamics and calibration require separate treatment.',
    coverage: [
      'Ferrari 812 Superfast and 812 GTS, including retractable-hard-top considerations for the GTS.',
      'Ferrari 812 Competizione and Competizione A enquiries after exact variant, options, handling and technical-information requirements are confirmed.',
      'Road, touring, storage and track-exposed vehicles, with the inspection plan tied to actual history and condition.',
    ],
    systems: [
      {
        title: '812 maintenance planning',
        directAnswer: 'The correct service scope follows the exact 812 variant, schedule, history, use and condition—not one universal V12 checklist.',
        points: [
          'Confirm engine-oil approval, filters, quantities, level procedure and scheduled consumables from vehicle-specific information.',
          'Review tyres, brakes, battery, cooling, leaks and recorded warnings alongside routine servicing.',
          'Account for low mileage, storage and track exposure when prioritising condition checks.',
        ],
      },
      {
        title: 'F140-family 6.5-litre V12',
        directAnswer: 'The 812 uses a dry-sump naturally aspirated V12, but Superfast, GTS and Competizione calibrations and components should not be assumed identical.',
        points: [
          'Investigate misfire, temperature, oil-pressure, fuel, intake or exhaust concerns with scan evidence and mechanical testing.',
          'Stop safely for a red oil-pressure warning, severe overheating, smoke, major fluid loss or abnormal mechanical noise.',
          'Verify parts, fluids, tightening and bleeding procedures for the exact variant.',
        ],
      },
      {
        title: 'Seven-speed F1 dual-clutch transaxle',
        directAnswer: '812 variants use a rear seven-speed dual-clutch transmission; this is not the later eight-speed DCT used by Roma, SF90, 296 and Purosangue.',
        points: [
          'Record engagement, selection, shift, temperature and warning behaviour under repeatable conditions.',
          'Review supported codes and data without promising a universal clutch-life value.',
          'Confirm fluid, parts, supported functions and internal-repair availability for the exact transaxle.',
        ],
      },
      {
        title: 'SCM-E, EPS and rear-wheel steering',
        directAnswer: 'The 812 integrates adaptive damping, electric steering and Virtual Short Wheelbase control, with later Competizione variants using a further-evolved four-wheel independent steering system.',
        points: [
          'Inspect dampers, mounts, arms, bushes, steering, sensors, wheels, tyres and alignment together.',
          'A steering or chassis warning does not by itself identify a failed actuator or damper.',
          'Do not describe the 812 using generic air-suspension terminology.',
        ],
      },
      {
        title: 'Cooling, airflow and Dubai operation',
        directAnswer: 'Sustained V12 and cabin-cooling demand makes verified airflow, fan, coolant and AC performance important when symptoms appear.',
        points: [
          'Inspect radiator and condenser condition, fans, leaks and relevant temperature data according to the complaint.',
          'Diagnose high temperature rather than assigning every case to ambient heat or dust.',
          'Confirm refrigerant and equipment requirements from the vehicle before AC work.',
        ],
      },
      {
        title: 'Brakes, tyres and GTS roof systems',
        directAnswer: 'Brake and tyre condition must follow the fitted 812 specification, while GTS roof concerns add body-control, latch, sensor and alignment requirements.',
        points: [
          'Use the applicable brake inspection and measurement process rather than replacement by mileage alone.',
          'Check tyre age, damage, pressure, wear pattern and specification as well as tread depth.',
          'For GTS roof faults, document the exact movement stage and confirm electrical, hydraulic and mechanical scope.',
        ],
      },
    ],
    warningSigns: [
      'Red oil-pressure, temperature, brake or steering warning.',
      'Check-engine light, misfire, hesitation or unexpected loss of power.',
      'Gearbox warning, delayed engagement or repeatable severe shift behaviour.',
      'Steering, suspension or stability warning with changed response or handling.',
      'Coolant loss, fuel or fluid odour, smoke or abnormal V12 mechanical noise.',
      'GTS roof warning, incomplete latch or movement stopping partway.',
    ],
    diagnosticApproach: [
      'Identify Superfast, GTS, Competizione or Competizione A and document model year, options and prior work.',
      'Record the warning, temperature, speed, gear, roof position and driving condition that reproduce the concern.',
      'Scan supported modules and preserve useful codes, freeze-frame and live data.',
      'Carry out the mechanical, electrical, pressure, alignment or leak tests supported by the evidence.',
      'Confirm parts, technical information and a condition-appropriate verification plan before repair.',
    ],
    dubaiConsiderations: [
      'High ambient temperature increases cooling and AC demand, but measured evidence determines the cause of a warning.',
      'Low-use V12 cars still require battery, tyre, brake-surface, fluid and seal attention.',
      'Track or high-load use should be disclosed so brakes, tyres, fluids and cooling can be assessed appropriately.',
      'Before long-distance use, review tyres, cooling, fluid condition and stored warnings for the exact vehicle.',
    ],
    services: [commonServiceLinks.maintenance, commonServiceLinks.diagnostics, commonServiceLinks.transmission, commonServiceLinks.suspension, commonServiceLinks.brakes, commonServiceLinks.ac],
    guides: [
      link('Ferrari maintenance in Dubai', FERRARI_MAINTENANCE_GUIDE_PATH, 'General ownership, storage and workshop-preparation guidance for Ferrari vehicles.'),
      link('Ferrari electrical diagnosis', FERRARI_SERVICE_PATHS.electrical, 'Supported electrical and module-communication diagnosis after scope is confirmed.'),
    ],
    faqs: [
      { question: 'Where can I service a Ferrari 812 in Dubai?', answer: 'DIGI-TEC accepts 812 Superfast, GTS and Competizione-family service and diagnostic enquiries in Al Quoz. Send the VIN, exact variant, mileage, history and concern before booking.' },
      { question: 'Does the Ferrari 812 use an eight-speed gearbox?', answer: 'No. The 812 family uses a seven-speed dual-clutch transmission. Later Ferrari platforms such as Roma, SF90, 296 and Purosangue use eight-speed DCT architectures.' },
      { question: 'Are all Ferrari 812 chassis systems identical?', answer: 'No. Superfast and GTS use PCV 2.0-era controls, while Competizione variants use a further-evolved chassis package including four-wheel independent steering. Procedures and parts must match the exact variant.' },
      { question: 'Can an 812 carbon-ceramic rotor be replaced by mileage alone?', answer: 'No. Replacement should follow the applicable inspection, measurement and visible-condition procedure plus vehicle-specific limits.' },
      { question: 'Can DIGI-TEC inspect an 812 GTS roof warning?', answer: 'A roof concern can be inspected after the exact warning, movement stage, vehicle condition and available diagnostic or repair scope are confirmed.' },
    ],
  },
  {
    slug: 'purosangue',
    name: 'Ferrari Purosangue',
    shortName: 'Purosangue',
    path: `${FERRARI_HUB_PATH}/purosangue`,
    h1: 'Ferrari Purosangue Service & Repair Dubai',
    metaTitle: 'Ferrari Purosangue Service & Repair Dubai | DIGI-TEC',
    metaDescription: 'Ferrari Purosangue service and diagnostic enquiries in Dubai for 6.5 V12, 8-speed DCT, 4RM-S evo, TASV active suspension, cooling, brakes and electronics.',
    directAnswer: 'DIGI-TEC accepts Ferrari Purosangue service and diagnostic-assessment enquiries in Dubai. Because its V12, rear eight-speed transaxle, 4RM-S evo system and 48-volt TASV active suspension require model-specific procedures, tooling and parts, workshop scope is confirmed before booking.',
    intro: 'The Purosangue is Ferrari’s four-door, four-seat V12 model, not a conventional SUV with generic air suspension. It combines a front-mid-mounted naturally aspirated 6.5-litre V12, rear eight-speed dual-clutch transaxle, 4RM-S evo and a Multimatic TASV-based active suspension system with 48-volt motor actuators.',
    coverage: [
      'Ferrari Purosangue vehicles after the VIN, model year, market specification and fitted options are confirmed.',
      'Daily-driven, touring, low-mileage and stored vehicles with inspection priorities tied to actual use and history.',
      'Modified, damaged or heavily loaded vehicles only after changes, transport requirements and safe workshop scope are reviewed.',
    ],
    systems: [
      {
        title: 'Purosangue maintenance planning',
        directAnswer: 'Service planning must account for the exact vehicle schedule plus its V12, driveline, active chassis, tyre, brake and everyday-use requirements.',
        points: [
          'Confirm oil, filters, fluids, service items and supported reset functions from VIN-specific information.',
          'Review tyre specification, brakes, battery, cooling, AC, doors and comfort systems alongside routine servicing.',
          'Use mileage, time, load, storage and driving history rather than applying a generic SUV interval.',
        ],
      },
      {
        title: '6.5-litre naturally aspirated V12',
        directAnswer: 'The Purosangue uses a dry-sump 6.5-litre V12, but 812 parts or procedures must not be substituted automatically.',
        points: [
          'Trace misfire, oil, temperature, fuel, intake or exhaust symptoms using scan evidence and mechanical testing.',
          'Verify fluid, filter, level, tightening and bleeding procedures for the exact Purosangue specification.',
          'Treat red oil-pressure or temperature warnings, smoke, major fluid loss or severe noise as urgent.',
        ],
      },
      {
        title: 'Eight-speed DCT and 4RM-S evo',
        directAnswer: 'The Purosangue uses a rear eight-speed dual-clutch transaxle coordinated with its 4RM-S evo four-wheel-drive control system.',
        points: [
          'Record selection, shift, temperature, traction and driveline behaviour under repeatable conditions.',
          'Separate tyre, steering, control, mounting and front-drive inputs from an internal DCT fault.',
          'Confirm fluid, parts, supported functions and repair availability for the exact drivetrain before work.',
        ],
      },
      {
        title: 'TASV Ferrari active suspension',
        directAnswer: 'Purosangue active suspension integrates 48-volt electric motor actuation with hydraulic dampers; it is not a conventional air-suspension system.',
        points: [
          'Inspect dampers, actuators, position and acceleration inputs, wiring, power supply, arms, tyres and alignment together.',
          'A chassis warning does not establish whether the cause is mechanical, electrical, hydraulic or control-related.',
          'Special procedures, handling, parts and supported calibration scope are confirmed before repair acceptance.',
        ],
      },
      {
        title: 'SSC 8.0, brakes, steering and tyres',
        directAnswer: 'SSC 8.0 integrates 4RM-S evo, active suspension, F1-Trac and ABS Evo, so tyres and chassis inputs matter to several warnings.',
        points: [
          'Identify the fitted wheel and tyre specification and inspect age, pressure, damage and wear pattern.',
          'Use the applicable brake measurement and condition process rather than a universal mileage rule.',
          'Confirm steering, brake or chassis calibrations only where the exact repair and available access require them.',
        ],
      },
      {
        title: 'Cooling, AC, 48-volt and comfort systems',
        directAnswer: 'Dubai use can combine high V12 cooling demand with cabin AC, active-suspension power and four-seat comfort-system load.',
        points: [
          'Inspect cooling airflow, fans, circuits, leaks and temperature data according to the reported concern.',
          'Separate 12-volt, 48-volt, module-communication and component faults before recommending parts.',
          'Welcome-door, latch, seat, climate or infotainment concerns require system-specific diagnosis.',
        ],
      },
    ],
    warningSigns: [
      'Red oil-pressure, temperature, brake, steering or chassis warning.',
      'Check-engine warning, misfire, hesitation or unexpected loss of V12 performance.',
      'Transmission or 4RM warning, severe shift behaviour or loss of expected drive.',
      'Active-suspension warning with a sudden change in ride, stance or handling.',
      'Coolant loss, smoke, strong fluid odour or visible leakage.',
      'Repeated 12-volt, 48-volt, door, seat, climate or communication warnings.',
    ],
    diagnosticApproach: [
      'Confirm VIN, model year, options, tyre specification, service history, loads and prior work.',
      'Record warning text, speed, temperature, Manettino setting, road condition and when the symptom occurs.',
      'Separate V12, DCT, 4RM-S evo, TASV, brake, steering, tyre, 12-volt, 48-volt and comfort-system paths.',
      'Confirm compatible diagnostic access, special handling, parts and workshop capability before intrusive work.',
      'Document findings and an appropriate verification plan before repair approval.',
    ],
    dubaiConsiderations: [
      'High ambient temperature and four-seat AC demand increase thermal load but do not identify the failed part.',
      'Large staggered tyres require attention to pressure, age, damage, matching specification and alignment.',
      'Frequent short trips, long idle periods or storage can affect batteries, fluids and warning behaviour.',
      'Discuss recovery if a red chassis, oil-pressure, temperature, brake or loss-of-drive warning is present.',
    ],
    services: [commonServiceLinks.maintenance, commonServiceLinks.diagnostics, commonServiceLinks.transmission, commonServiceLinks.suspension, commonServiceLinks.brakes, commonServiceLinks.electrical, commonServiceLinks.ac],
    guides: [
      link('Ferrari maintenance in Dubai', FERRARI_MAINTENANCE_GUIDE_PATH, 'General ownership, storage and inspection-planning guidance; Purosangue still needs a model-specific plan.'),
      link('Ferrari tyre inspection', FERRARI_SERVICE_PATHS.tires, 'Commercial tyre, wheel and condition assessment for the fitted Purosangue specification.'),
    ],
    faqs: [
      { question: 'Where can I service a Ferrari Purosangue in Dubai?', answer: 'DIGI-TEC accepts Purosangue service and diagnostic-assessment enquiries in Al Quoz. Send the VIN, model year, mileage, tyre specification, warning text and requested work before booking.' },
      { question: 'Does the Ferrari Purosangue use air suspension?', answer: 'No. It uses Ferrari active suspension technology based on Multimatic TASV dampers with 48-volt motor actuators. It should not be diagnosed or described as a conventional air-suspension system.' },
      { question: 'Does the Purosangue use the same gearbox as an 812?', answer: 'No. The Purosangue uses an eight-speed DCT, while the 812 family uses a seven-speed dual-clutch transmission. Parts and procedures should not be interchanged.' },
      { question: 'Can a tyre mismatch contribute to Purosangue chassis warnings?', answer: 'Tyre size, specification, pressure, wear and rolling-radius differences can affect chassis and four-wheel-drive inputs, but diagnostic evidence is required before assigning the warning to tyres.' },
      { question: 'Can DIGI-TEC confirm active-suspension repair scope before booking?', answer: 'The VIN, warning, vehicle stance and symptoms can be reviewed first. Compatible diagnostic access, parts, procedures and repair capability are confirmed before the vehicle is accepted.' },
    ],
  },
];

export const getFerrariModelBySlug = (slug?: string) =>
  ferrariModelPages.find((model) => model.slug === slug);

export const getFerrariModelByPath = (path: string) =>
  ferrariModelPages.find((model) => model.path === path.replace(/\/$/, ''));
