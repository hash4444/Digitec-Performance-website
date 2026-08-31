export const MERCEDES_HUB_PATH = '/brands/mercedes-benz-service-dubai';
export const MERCEDES_PROBLEMS_PATH = '/mercedes/problems';

export const MERCEDES_SERVICE_LINKS = {
  maintenance: '/services/mercedes-oil-change-dubai',
  mechanical: '/services/mercedes-mechanical-repair-dubai',
  transmission: '/services/mercedes-transmission-repair-dubai',
  suspension: '/services/mercedes-suspension-repair-dubai',
  diagnostics: '/services/mercedes-diagnostics-dubai',
  electrical: '/services/mercedes-electrical-repair-dubai',
  ac: '/services/mercedes-ac-repair-dubai',
  brakes: '/services/mercedes-brake-repair-dubai',
  battery: '/services/mercedes-battery-replacement-dubai',
  tires: '/services/mercedes-tire-repair-dubai',
} as const;

export interface MercedesModelSection {
  title: string;
  summary: string;
  points: string[];
}

export interface MercedesModelSymptom {
  title: string;
  detail: string;
  guidePath: string;
  guideLabel: string;
}

export interface MercedesModelLink {
  label: string;
  path: string;
  description: string;
}

export interface MercedesModelPageData {
  name: string;
  shortName: string;
  path: string;
  legacyBlogSlug?: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  coverage: string[];
  maintenance: MercedesModelSection;
  powertrain: MercedesModelSection;
  transmission: MercedesModelSection;
  suspension: MercedesModelSection;
  climate: MercedesModelSection;
  electrical: MercedesModelSection;
  symptoms: MercedesModelSymptom[];
  services: MercedesModelLink[];
  faqs: { question: string; answer: string }[];
  vehicleImage?: string;
  vehicleImageAlt?: string;
  caseStudies?: MercedesModelLink[];
}

const problem = (slug: string) => `${MERCEDES_PROBLEMS_PATH}/${slug}`;

const service = (
  label: string,
  path: string,
  description: string,
): MercedesModelLink => ({ label, path, description });

export const mercedesModelPages: MercedesModelPageData[] = [
  {
    name: 'Mercedes-AMG G63',
    shortName: 'AMG G63',
    path: '/blog/mercedes-g63-service-dubai-guide',
    legacyBlogSlug: 'mercedes-g63-service-dubai-guide',
    h1: 'Mercedes-AMG G63 Service & Repair Dubai',
    metaTitle: 'Mercedes-AMG G63 Service & Repair Dubai | Digi-Tec',
    metaDescription: 'G63 service and repair in Dubai for M157 and M177 V8s, AMG transmissions, cooling, brakes, differential locks and G-Class diagnostics.',
    intro: 'A G63 needs more than a generic Mercedes checklist. Digi-Tec scopes maintenance and diagnosis around the exact generation, AMG V8, transmission, transfer case, differential-lock system and fitted suspension—then confirms the work before repair begins.',
    coverage: [
      'Earlier W463 AMG G63 applications, including M157 5.5-litre biturbo V8 vehicles with the seven-speed AMG transmission.',
      '2018-on G63 vehicles with the M177 4.0-litre biturbo V8 and AMG SPEEDSHIFT TCT 9G.',
      'Updated G63 variants with 48-volt assistance, subject to VIN, market specification and workshop compatibility.',
    ],
    maintenance: {
      title: 'G63 maintenance priorities',
      summary: 'The service display is the starting point, but vehicle use and history determine the final scope. Heavy urban use, towing, off-road driving or performance modifications can justify additional inspection without inventing a shorter universal interval.',
      points: [
        'Use the engine-oil approval and fill quantity identified for the exact M157 or M177 application.',
        'Inspect the cooling stack, charge-air cooling, hoses and expansion tanks for contamination, damage or seepage.',
        'Check transfer-case, axle and differential-lock operation and review the recorded fluid history.',
        'Measure AMG brake and tyre condition rather than estimating wear from mileage alone.',
      ],
    },
    powertrain: {
      title: 'M157 and M177 AMG V8 considerations',
      summary: 'Both engines are high-output biturbo V8s, but their layouts, control systems and service requirements differ. Oil or coolant residue around one component does not establish the source because the undertray and airflow can carry fluid away from the leak.',
      points: [
        'A misfire may involve ignition, fuelling, air or boost leakage, mechanical condition or control inputs; the stored code identifies the affected event, not automatically the failed part.',
        'Oil level, oil pressure concerns, crankcase ventilation and visible leakage should be assessed together.',
        'Cooling diagnosis may need separate checks of the engine and charge-air circuits fitted to the vehicle.',
      ],
    },
    transmission: {
      title: 'AMG transmission, transfer case and differentials',
      summary: 'Earlier and later G63s do not share one gearbox. A shift concern must be matched to the fitted seven-speed or TCT 9G transmission and separated from engine torque, mount, propshaft, transfer-case or axle behaviour.',
      points: [
        'Record when the shift occurs, fluid temperature, drive mode and whether it happens under light or heavy load.',
        'Inspect for leaks and confirm fluid specification before proposing a service.',
        'Test low range and all three differential locks safely; an indicator concern may be mechanical, actuator-related or electrical.',
      ],
    },
    suspension: {
      title: 'G63 suspension is not AIRMATIC',
      summary: 'The G63 uses coil springs rather than Mercedes AIRMATIC air springs. Earlier W463 vehicles use rigid axles, while the 2018-on platform combines an independent front axle with a rigid rear axle and AMG-tuned adaptive damping.',
      points: [
        'Knocks, steering looseness and uneven tyre wear require checks of joints, bushes, dampers, wheel bearings and alignment.',
        'Ride-control warnings on equipped vehicles should be diagnosed as damper-control faults, not assumed to be leaking air springs.',
        'Wheel and tyre size, load rating and alignment matter on this heavy, high-output platform.',
      ],
    },
    climate: {
      title: 'Cooling and AC under Dubai load',
      summary: 'A clean condenser face does not prove that the entire cooling stack has adequate airflow. The G63 packages several heat exchangers behind an upright front end, so temperature, fan operation, airflow and system pressure all matter.',
      points: [
        'Investigate rising coolant temperature promptly rather than relying on repeated coolant top-ups.',
        'Weak cabin cooling may come from refrigerant loss, condenser airflow, compressor control, blower or flap operation.',
        'Confirm the refrigerant label and compatible service equipment before recovery or recharge.',
      ],
    },
    electrical: {
      title: 'Electrical and diagnostic checks',
      summary: 'The G63 combines Mercedes body electronics with AMG powertrain and G-Class four-wheel-drive controls. Stable 12-volt supply is essential, and later variants may also contain a 48-volt system that requires separate safety and diagnostic procedures.',
      points: [
        'Scan all relevant modules and retain freeze-frame or event data before clearing faults.',
        'Test the main battery and charging system when multiple unrelated warnings appear together.',
        'Confirm camera, radar and parking-system calibration needs after relevant body, steering or suspension work.',
      ],
    },
    symptoms: [
      { title: 'Harsh or jerking gear changes', detail: 'May involve gearbox control, adaptations, fluid condition, mounts, engine torque delivery or driveline play.', guidePath: problem('gearbox-jerking'), guideLabel: 'Read the gearbox-jerking guide' },
      { title: 'Coolant temperature rising', detail: 'Stop and investigate before heat causes secondary damage.', guidePath: problem('engine-overheating'), guideLabel: 'Read the overheating guide' },
      { title: 'Check-engine light or misfire', detail: 'A code needs supporting live data and physical testing.', guidePath: problem('check-engine-light'), guideLabel: 'Read the warning-light guide' },
      { title: 'Oil found on the undertray', detail: 'Trace the highest fresh point before naming a seal or housing.', guidePath: problem('oil-leak'), guideLabel: 'Read the oil-leak guide' },
    ],
    services: [
      service('G63 scheduled maintenance', MERCEDES_SERVICE_LINKS.maintenance, 'Oil, filters and inspection items scoped to the exact engine and service history.'),
      service('AMG mechanical repair', MERCEDES_SERVICE_LINKS.mechanical, 'Engine, cooling and driveline diagnosis for the fitted G63 platform.'),
      service('Mercedes transmission repair', MERCEDES_SERVICE_LINKS.transmission, 'Seven-speed and TCT 9G diagnosis separated from transfer-case and axle concerns.'),
      service('Mercedes diagnostics', MERCEDES_SERVICE_LINKS.diagnostics, 'Vehicle-compatible module scanning followed by directed tests.'),
    ],
    faqs: [
      { question: 'Does the Mercedes-AMG G63 use AIRMATIC?', answer: 'No. G63 suspension uses coil springs. Equipment and axle design vary by generation, so a ride or suspension warning should be identified against the exact chassis rather than treated as an AIRMATIC leak.' },
      { question: 'Is every G63 fitted with the same transmission?', answer: 'No. Earlier M157-era vehicles use a seven-speed AMG transmission, while the 2018-on M177 platform uses AMG SPEEDSHIFT TCT 9G. The VIN and transmission identification determine the fluid, procedure and diagnostic route.' },
      { question: 'Can a fault code confirm which G63 part has failed?', answer: 'Usually not by itself. A code records a condition seen by a control unit. Live data, wiring or pressure checks, physical inspection and sometimes a controlled road test are needed before a component is condemned.' },
      { question: 'How do I book a G63 inspection in Dubai?', answer: 'Send Digi-Tec the model year, VIN, mileage, warning message and a clear description of when the symptom occurs. The workshop can then confirm the appropriate first inspection and available appointment.' },
    ],
    vehicleImage: '/images/cars/g63.png',
    vehicleImageAlt: 'Mercedes-AMG G63 model profile for service and repair planning in Dubai',
    caseStudies: [
      service('G63 to G 800-style conversion', '/blog/g63-to-brabus-g800-conversion-dubai', 'A documented Digi-Tec workshop project with strip-down, preparation, fitment and finished-vehicle images.'),
    ],
  },
  {
    name: 'Mercedes G-Class',
    shortName: 'G-Class',
    path: '/mercedes/models/g-class-service-repair-dubai',
    h1: 'Mercedes G-Class Service & Repair Dubai',
    metaTitle: 'Mercedes G-Class Service & Repair Dubai | Digi-Tec',
    metaDescription: 'Mercedes G-Class service and repair in Dubai for G500, G550 and diesel models: 4MATIC driveline, differential locks, cooling and diagnostics.',
    intro: 'The non-AMG G-Class combines Mercedes road-car electronics and powertrains with a transfer case, low range and three differential locks. Digi-Tec separates routine service, chassis wear and four-wheel-drive faults from the AMG-specific requirements covered on the G63 page.',
    coverage: [
      'Earlier W463 G-Class petrol and diesel models, with equipment confirmed from VIN and market specification.',
      'Later G500/G550 and diesel applications using modern 7G-TRONIC or 9G-TRONIC powertrains.',
      'Current-generation G-Class vehicles with independent front suspension, rigid rear axle and electronically managed off-road systems.',
    ],
    maintenance: {
      title: 'G-Class maintenance beyond oil and filters',
      summary: 'A road-only G-Class and a vehicle used in sand, water crossings or towing do not have identical inspection needs. Service planning should include the actual duty cycle and a check of the four-wheel-drive hardware.',
      points: [
        'Confirm engine oil and filter requirements from the exact petrol or diesel powertrain.',
        'Review transmission, transfer-case and axle-fluid history and inspect for leakage.',
        'Check differential-lock engagement, low range, propshaft joints and protective underbody components.',
        'Inspect brake, tyre and steering components for the vehicle weight and fitted wheel package.',
      ],
    },
    powertrain: {
      title: 'Petrol and diesel G-Class powertrains',
      summary: 'G-Class engine families span naturally aspirated, turbocharged and 48-volt-assisted petrol engines plus several diesel generations. The engine code matters more than the G500, G550 or G350 badge when selecting oil, filters, cooling components and diagnostic tests.',
      points: [
        'Diesel complaints may require air, boost, fuel-pressure and aftertreatment checks rather than an emissions-code guess.',
        'Petrol misfire and reduced-power complaints should be tested across ignition, fuel, air, boost and mechanical condition.',
        'A visible leak should be cleaned and traced because fluid can travel along the block, bellhousing or undertray.',
      ],
    },
    transmission: {
      title: 'Transmission and three-lock driveline',
      summary: 'A G-Class vibration, thump or engagement delay can originate in the automatic gearbox, engine or gearbox mounts, propshaft, transfer case, differentials or lock actuators. Replacing transmission parts before isolating the driveline can miss the cause.',
      points: [
        'Identify the fitted transmission and reproduce the symptom at a known fluid temperature.',
        'Check driveline play and mounts before attributing every thump to internal gearbox wear.',
        'Test low range and differential locks according to the vehicle procedure and surface conditions.',
      ],
    },
    suspension: {
      title: 'Coil-spring suspension and steering',
      summary: 'G-Class models use coil springs, not AIRMATIC. Earlier vehicles use rigid axles front and rear; newer models use independent front suspension with a rigid rear axle.',
      points: [
        'Inspect steering joints, bushes, dampers and wheel bearings when the vehicle wanders or knocks.',
        'Check ride-height differences for spring, damper, bush or load-related causes rather than an air leak.',
        'Complete alignment only after worn or bent components have been addressed.',
      ],
    },
    climate: {
      title: 'Cooling and cabin climate',
      summary: 'Dubai heat exposes marginal airflow, coolant loss and AC performance. Engine temperature and cabin cooling should be tested under realistic load instead of judged only at idle in a cool workshop.',
      points: [
        'Inspect radiator and condenser condition, fan operation and coolant leakage.',
        'Check AC pressures, vent temperature and airflow before adding refrigerant.',
        'Use the refrigerant and compressor oil specified on the vehicle label.',
      ],
    },
    electrical: {
      title: 'G-Class diagnostics and electrical systems',
      summary: 'Differential locks, transfer-case controls, stability systems and body electronics share information. Low voltage or a wheel-speed issue can therefore affect more than one warning system.',
      points: [
        'Run a full module scan and preserve fault context before clearing codes.',
        'Test battery, charging and ground integrity when several warnings appear together.',
        'Inspect wiring and connectors exposed to underbody impacts, water or accessory installations.',
      ],
    },
    symptoms: [
      { title: 'Won’t engage a differential lock', detail: 'May involve operating conditions, an actuator, position feedback, wiring or a mechanical fault.', guidePath: problem('check-engine-light'), guideLabel: 'Understand evidence-led diagnostics' },
      { title: 'Harsh engagement or gear change', detail: 'Separate gearbox behaviour from mounts and four-wheel-drive play.', guidePath: problem('gearbox-jerking'), guideLabel: 'Read the gearbox-jerking guide' },
      { title: 'Engine temperature rising', detail: 'Coolant loss or fan and flow problems require prompt testing.', guidePath: problem('engine-overheating'), guideLabel: 'Read the overheating guide' },
      { title: 'Intermittent no-start', detail: 'First distinguish no-crank from crank-no-start.', guidePath: problem('wont-start'), guideLabel: 'Read the no-start guide' },
    ],
    services: [
      service('G-Class maintenance', MERCEDES_SERVICE_LINKS.maintenance, 'Scheduled items plus driveline and vehicle-use checks.'),
      service('Mercedes mechanical repair', MERCEDES_SERVICE_LINKS.mechanical, 'Engine, cooling, transfer-case and driveline inspection.'),
      service('Mercedes transmission repair', MERCEDES_SERVICE_LINKS.transmission, '7G-TRONIC or 9G-TRONIC diagnosis for the identified vehicle.'),
      service('Mercedes electrical repair', MERCEDES_SERVICE_LINKS.electrical, 'Wiring, module and control-system fault tracing.'),
    ],
    faqs: [
      { question: 'What is the difference between this G-Class page and the G63 page?', answer: 'This page covers the wider non-AMG G-Class family and its transfer case, differential locks, diesel or petrol powertrains and utility use. The G63 page focuses on AMG V8, AMG transmission, brakes and adaptive-damping considerations.' },
      { question: 'Does a Mercedes G-Class use air suspension?', answer: 'The G-Class uses coil springs. Suspension design differs between earlier rigid-front-axle vehicles and the newer independent-front-suspension platform, so the exact chassis still matters.' },
      { question: 'Should all three differential locks be tested during service?', answer: 'If their condition or operation is relevant to the vehicle’s use, the system should be exercised using the correct procedure and suitable conditions. A warning or refusal to engage needs diagnosis rather than repeated forcing of the controls.' },
      { question: 'Can Digi-Tec confirm coverage before I visit?', answer: 'Yes. Send the VIN, model year and requested work so the workshop can confirm the compatible diagnostic and repair scope before the appointment.' },
    ],
    vehicleImage: '/images/cars/g63.png',
    vehicleImageAlt: 'Mercedes G-Class model profile for service and driveline repair in Dubai',
  },
  {
    name: 'Mercedes-AMG C63',
    shortName: 'AMG C63',
    path: '/mercedes/models/c63-service-repair-dubai',
    h1: 'Mercedes-AMG C63 Service & Repair Dubai',
    metaTitle: 'Mercedes-AMG C63 Service & Repair Dubai | Digi-Tec',
    metaDescription: 'Mercedes-AMG C63 service in Dubai for W204, W205 and W206: M156, M177 and M139 hybrid powertrains, AMG transmissions, brakes and cooling.',
    intro: 'C63 generations share a badge but not a powertrain: the W204 uses a naturally aspirated V8, the W205 a biturbo V8 and the W206 a four-cylinder E PERFORMANCE hybrid system. Service and diagnosis must follow the generation, engine and high-voltage equipment actually fitted.',
    coverage: [
      'W204 C63 and C63 Black Series applications with the M156 6.2-litre naturally aspirated V8.',
      'W205 C63 and C63 S applications with the M177 4.0-litre biturbo V8.',
      'W206 C63 S E PERFORMANCE applications with the M139l 2.0-litre engine, rear electric drive unit and high-voltage battery.',
    ],
    maintenance: {
      title: 'Generation-specific C63 maintenance',
      summary: 'Oil approval, spark plugs, filters, coolant circuits, transmission service and brake specification change across the three platforms. The service record and present condition should be checked before recommending catch-up work.',
      points: [
        'Confirm engine code and oil approval; do not treat all C63s as M177 vehicles.',
        'Measure brake discs and inspect the installed steel or optional carbon-ceramic package.',
        'Inspect differential, mounts and driveline components in the context of tyre condition and vehicle use.',
        'Apply high-voltage isolation and competence requirements to W206 hybrid-system work.',
      ],
    },
    powertrain: {
      title: 'M156, M177 and M139 E PERFORMANCE',
      summary: 'Each C63 generation has different thermal, lubrication and control architecture. Common-sounding symptoms such as a misfire, coolant loss or oil smell therefore lead to different test plans.',
      points: [
        'M156 diagnosis may involve ignition, fuelling, intake, valve-train or mechanical checks depending on the evidence.',
        'M177 diagnosis may also require charge-air, turbocharger, crankcase-ventilation and separate cooling-circuit checks.',
        'W206 diagnosis can cross combustion engine, high-voltage battery, inverter, electric drive unit and 12/48-volt support systems.',
      ],
    },
    transmission: {
      title: 'AMG SPEEDSHIFT across three generations',
      summary: 'W204, W205 and W206 C63s use different versions of the AMG multi-clutch transmission concept. A harsh shift or flare must be diagnosed with the correct control strategy and then separated from engine torque reduction, mounts, differential and hybrid intervention.',
      points: [
        'Record drive mode, temperature, gear and throttle position when the symptom occurs.',
        'Confirm fluid type and service procedure by transmission identification.',
        'Do not reset adaptations as a substitute for diagnosing a repeatable mechanical or hydraulic fault.',
      ],
    },
    suspension: {
      title: 'AMG RIDE CONTROL and chassis wear',
      summary: 'C63 models use performance-oriented steel-spring suspension rather than AIRMATIC. Adaptive damping, rear-axle differential hardware and generation-specific steering systems still require scan data and physical inspection.',
      points: [
        'Check dampers, top mounts, control arms and bushes when the car knocks, wanders or wears tyres unevenly.',
        'A damper-control warning is not an air-suspension leak.',
        'Verify wheel alignment after suspension work and inspect wheel or tyre damage before chasing calibration.',
      ],
    },
    climate: {
      title: 'Multiple cooling loads in Dubai',
      summary: 'AMG engines and the W206 hybrid system use several thermal circuits. A single dashboard gauge cannot describe charge-air, engine-oil, transmission or high-voltage component temperature.',
      points: [
        'Inspect heat-exchanger condition and airflow before assuming an internal component fault.',
        'Pressure-test the relevant coolant circuit when there is verified loss.',
        'Diagnose weak AC using temperatures, pressures, airflow and control data rather than refrigerant top-up alone.',
      ],
    },
    electrical: {
      title: 'AMG and hybrid diagnostics',
      summary: 'The W204 and W205 require coordinated engine, transmission, differential and chassis diagnosis. The W206 adds high-voltage components and additional safety boundaries, so workshop compatibility must be confirmed before hybrid repair is booked.',
      points: [
        'Retain freeze-frame and event data before clearing performance or hybrid faults.',
        'Test 12-volt supply because low voltage can interrupt module communication and create secondary warnings.',
        'Treat high-voltage warnings as a specialist safety concern; do not open or probe the system without the required procedure.',
      ],
    },
    symptoms: [
      { title: 'Jerking or delayed gear engagement', detail: 'The fitted AMG transmission and engine-torque data both matter.', guidePath: problem('gearbox-jerking'), guideLabel: 'Read the gearbox-jerking guide' },
      { title: 'Check-engine light under load', detail: 'Ignition, fuel, boost, air and mechanical evidence should be compared.', guidePath: problem('check-engine-light'), guideLabel: 'Read the check-engine guide' },
      { title: 'Coolant warning or temperature rise', detail: 'Identify the affected cooling circuit and stop if overheating is confirmed.', guidePath: problem('engine-overheating'), guideLabel: 'Read the overheating guide' },
      { title: 'Oil smell after driving', detail: 'Trace leaks away from hot exhaust and turbocharger areas.', guidePath: problem('oil-leak'), guideLabel: 'Read the oil-leak guide' },
    ],
    services: [
      service('C63 maintenance', MERCEDES_SERVICE_LINKS.maintenance, 'Generation-specific oil, filters and inspection scope.'),
      service('AMG engine and mechanical repair', MERCEDES_SERVICE_LINKS.mechanical, 'M156, M177 or compatible W206 inspection subject to exact scope.'),
      service('AMG transmission diagnosis', MERCEDES_SERVICE_LINKS.transmission, 'Evidence-led diagnosis for the fitted SPEEDSHIFT transmission.'),
      service('AMG brake inspection', MERCEDES_SERVICE_LINKS.brakes, 'Measured inspection of the installed steel or carbon-ceramic package.'),
    ],
    faqs: [
      { question: 'Do all Mercedes-AMG C63 models have a V8?', answer: 'No. W204 and W205 C63 models use V8 engines, while the W206 C63 S E PERFORMANCE uses a turbocharged four-cylinder engine combined with an electrified rear drive system.' },
      { question: 'Does a C63 use AIRMATIC?', answer: 'No. C63 models use performance steel-spring suspension with generation-specific adaptive damping. A chassis warning must be matched to the fitted damper and control system.' },
      { question: 'Can a W206 C63 be diagnosed like a W205?', answer: 'No. The W206 adds a high-voltage battery, inverter and electric drive unit, so the safety procedure, compatible diagnostics and repair scope are materially different.' },
      { question: 'What should I send before booking?', answer: 'Send the VIN, generation or model year, mileage, modifications, warning message and the conditions that reproduce the concern. Digi-Tec can then confirm the suitable first inspection.' },
    ],
    vehicleImage: '/images/cars/c63.png',
    vehicleImageAlt: 'Mercedes-AMG C63 model profile covering W204, W205 and W206 service in Dubai',
  },
  {
    name: 'Mercedes C-Class',
    shortName: 'C-Class',
    path: '/blog/mercedes-c-class-service-dubai-guide',
    legacyBlogSlug: 'mercedes-c-class-service-dubai-guide',
    h1: 'Mercedes C-Class Service & Repair Dubai',
    metaTitle: 'Mercedes C-Class Service & Repair Dubai | Digi-Tec',
    metaDescription: 'Mercedes C-Class service and repair in Dubai for W204, W205 and W206 models, covering 7G/9G transmissions, cooling, AC, suspension and diagnostics.',
    intro: 'C-Class servicing changes with the W204, W205 and W206 platform, engine, transmission and level of electrification. Digi-Tec identifies those systems first, then scopes maintenance or diagnosis for the vehicle rather than applying one C-Class package to every badge.',
    coverage: [
      'W204 C-Class saloon, estate and coupe derivatives with petrol or diesel engines and 5G/7G-era transmissions.',
      'W205 C-Class models including M274/M264 petrol, OM651/OM654 diesel and selected plug-in hybrid variants.',
      'W206 C-Class models with 9G-TRONIC, 48-volt mild-hybrid or plug-in hybrid systems depending on specification.',
    ],
    maintenance: {
      title: 'C-Class service planning',
      summary: 'ASSYST information, VIN, mileage and documented history determine the visit. A Service A or B label does not replace the vehicle-specific list of oil approval, filters, brake fluid, plugs and other time- or mileage-dependent items.',
      points: [
        'Confirm oil approval and quantity from the exact engine.',
        'Review transmission-fluid history against the fitted gearbox rather than assuming “sealed for life”.',
        'Measure brakes and tyres and inspect suspension joints, bushes and dampers.',
        'Test battery and AC performance before Dubai summer demand peaks.',
      ],
    },
    powertrain: {
      title: 'C-Class engine and hybrid differences',
      summary: 'The C-Class spans several four- and six-cylinder petrol and diesel families plus mild-hybrid and plug-in hybrid variants. Engine-code identification prevents the wrong oil, part or diagnostic assumption.',
      points: [
        'Rough running may come from ignition, fuel, air, boost, emissions or mechanical condition.',
        'Diesel warning lights may require aftertreatment and differential-pressure evidence in addition to engine data.',
        '48-volt and plug-in hybrid complaints require the relevant electrical safety and compatibility checks.',
      ],
    },
    transmission: {
      title: '7G-TRONIC and 9G-TRONIC behaviour',
      summary: 'C-Class generations can use different automatic or AMG transmissions. A jerk, flare or delayed engagement should be reproduced and logged before fluid service or internal work is proposed.',
      points: [
        'Check engine and gearbox mounts because movement can amplify otherwise normal torque changes.',
        'Inspect leaks and fluid condition using the procedure for the exact unit.',
        'Use adaptation data as supporting evidence, not proof that a valve body or complete transmission has failed.',
      ],
    },
    suspension: {
      title: 'C-Class suspension and steering',
      summary: 'Most C-Class vehicles use steel springs with multi-link suspension; adaptive dampers or rear air assistance depend on body style and equipment. The fitted system must be verified before diagnosis.',
      points: [
        'Knocking may come from control-arm bushes, ball joints, top mounts or dampers.',
        'Uneven tyre wear requires tyre, wheel, joint and alignment checks together.',
        'Steering or driver-assistance calibrations are considered only when the completed repair and vehicle procedure require them.',
      ],
    },
    climate: {
      title: 'Cooling and AC in Dubai traffic',
      summary: 'Continuous low-speed AC operation makes condenser airflow and fan performance important. An AC complaint and an engine-cooling complaint can share an airflow cause but still require separate pressure and temperature tests.',
      points: [
        'Measure centre-vent temperature and check blower airflow and flap control.',
        'Look for coolant residue and pressure-test a verified loss.',
        'Confirm refrigerant type before any recovery or recharge.',
      ],
    },
    electrical: {
      title: 'C-Class electrical diagnosis',
      summary: 'Low battery voltage, network faults and sensor issues can create several warnings. W206 models add 48-volt or plug-in hybrid systems on some variants, increasing the importance of correct vehicle identification.',
      points: [
        'Test the battery and charging system before replacing multiple modules.',
        'Use a full-vehicle scan and freeze-frame data to choose targeted tests.',
        'Check for water, connector or wiring damage where the fault history points to a physical circuit.',
      ],
    },
    symptoms: [
      { title: 'Rough or jerking shift', detail: 'Common language can describe very different gearbox and mount faults.', guidePath: problem('gearbox-jerking'), guideLabel: 'Read the gearbox-jerking guide' },
      { title: 'Check-engine light', detail: 'The code describes a detected condition, not automatically the failed component.', guidePath: problem('check-engine-light'), guideLabel: 'Read the check-engine guide' },
      { title: 'AC not cooling at idle', detail: 'Airflow, refrigerant and compressor control all need checking.', guidePath: problem('ac-not-cooling'), guideLabel: 'Read the AC guide' },
      { title: 'No crank or intermittent start', detail: 'Battery, starter, authorization and engine inputs follow different test paths.', guidePath: problem('wont-start'), guideLabel: 'Read the no-start guide' },
    ],
    services: [
      service('C-Class scheduled service', MERCEDES_SERVICE_LINKS.maintenance, 'Vehicle-specific Service A/B and maintenance items.'),
      service('Mercedes diagnostics', MERCEDES_SERVICE_LINKS.diagnostics, 'Full-module scan and directed testing for warning lights.'),
      service('Mercedes transmission repair', MERCEDES_SERVICE_LINKS.transmission, '7G/9G service and repair only after identification and diagnosis.'),
      service('Mercedes AC repair', MERCEDES_SERVICE_LINKS.ac, 'Leak, pressure, airflow and control diagnosis for the fitted refrigerant system.'),
    ],
    faqs: [
      { question: 'Which C-Class generations does Digi-Tec cover?', answer: 'This page covers common W204, W205 and W206 service and diagnostic considerations. Exact workshop coverage is confirmed from the VIN, engine, fitted systems and requested work before booking.' },
      { question: 'Does every C-Class need the same Service A or Service B items?', answer: 'No. The label is only a starting point. Model year, engine, market, ASSYST message, mileage and history determine the oil, filters, fluids, plugs and checks due.' },
      { question: 'Can a transmission fluid change fix jerking?', answer: 'Sometimes fluid condition contributes, but jerking can also come from control, hydraulic, mechanical, mount or engine-torque issues. Diagnose the symptom before assuming a service will cure it.' },
      { question: 'How do I arrange a C-Class appointment?', answer: 'Send Digi-Tec the VIN, year, mileage, service message and symptoms by WhatsApp. The workshop can confirm the appropriate inspection and booking options.' },
    ],
    vehicleImage: '/images/cars/mercedes-c63.png',
    vehicleImageAlt: 'Mercedes C-Class service and repair model profile for Dubai owners',
  },
  {
    name: 'Mercedes-AMG E63',
    shortName: 'AMG E63',
    path: '/mercedes/models/e63-service-repair-dubai',
    h1: 'Mercedes-AMG E63 Service & Repair Dubai',
    metaTitle: 'Mercedes-AMG E63 Service & Repair Dubai | Digi-Tec',
    metaDescription: 'Mercedes-AMG E63 service and repair in Dubai for W212 and W213 M156, M157 and M177 models, AMG MCT, 4MATIC+, air suspension and cooling.',
    intro: 'E63 maintenance must distinguish the rear-drive and 4MATIC W212 variants from the W213 M177 platform with AMG Performance 4MATIC+, MCT 9G and AMG RIDE CONTROL+ air suspension. Digi-Tec bases the plan on the exact generation and complaint.',
    coverage: [
      'W212 E63 applications with M156 or M157 V8 engines and generation-specific AMG seven-speed transmissions.',
      'W213 E63 and E63 S with M177 4.0-litre biturbo V8, AMG SPEEDSHIFT MCT 9G and AMG Performance 4MATIC+.',
      'Saloon and estate variants, with suspension, wheel, brake and rear-axle equipment confirmed from VIN.',
    ],
    maintenance: {
      title: 'E63 service priorities',
      summary: 'High output, vehicle mass and Dubai heat make fluid specification, cooling condition, brakes and tyres important, but parts should still be replaced on schedule or measured condition rather than a generic AMG package.',
      points: [
        'Use the engine-specific oil approval and review spark-plug and filter history.',
        'Inspect gearbox, transfer case and differential fluids according to the fitted driveline.',
        'Measure brake-disc and pad condition, including the installed steel or carbon-ceramic package.',
        'Check air-suspension height retention and compressor behaviour on W213 vehicles.',
      ],
    },
    powertrain: {
      title: 'M156, M157 and M177 V8 diagnosis',
      summary: 'The naturally aspirated M156, earlier biturbo M157 and later hot-V M177 have different lubrication, cooling, boost and control systems. A model-specific test plan avoids carrying a known issue from one engine family onto another.',
      points: [
        'Compare misfire counts, fuel data and mechanical evidence before replacing ignition parts.',
        'Check air and boost integrity on biturbo engines when performance is reduced.',
        'Trace oil and coolant leakage after cleaning; underbody airflow can obscure the source.',
      ],
    },
    transmission: {
      title: 'AMG MCT and 4MATIC+ driveline',
      summary: 'The MCT uses a wet start-off clutch rather than a conventional torque converter. W213 also adds fully variable 4MATIC+, so shunt or vibration may involve the transmission, transfer system, differentials, mounts or tyres.',
      points: [
        'Log temperature, gear, clutch data and operating mode when reproducing the fault.',
        'Inspect tyre size and rolling circumference on all-wheel-drive vehicles.',
        'Confirm adaptation and fluid data before proposing mechatronic or internal repair.',
      ],
    },
    suspension: {
      title: 'AMG RIDE CONTROL+ air suspension',
      summary: 'W213 E63 models use AMG RIDE CONTROL+ air suspension with adaptive damping, while earlier E63 equipment differs. An overnight drop, slow rise or warning needs leak, pressure, height-sensor and control testing.',
      points: [
        'Compare static height after a controlled parking period when the complaint is an overnight drop.',
        'Assess compressor run time and temperature rather than replacing it solely because it is noisy.',
        'Check arms, bushes, wheel bearings and alignment alongside the pneumatic system.',
      ],
    },
    climate: {
      title: 'Cooling, charge-air cooling and AC',
      summary: 'The E63 cooling stack serves engine and, on biturbo generations, charge-air needs while sitting behind an AC condenser. Debris, fan performance and separate circuit faults can affect the car differently under traffic and performance load.',
      points: [
        'Investigate a repeat coolant top-up rather than normalising it.',
        'Check heat-exchanger faces and airflow before assuming pump or internal failure.',
        'Measure AC pressures, vent temperature and fan response in realistic ambient conditions.',
      ],
    },
    electrical: {
      title: 'AMG module and chassis diagnostics',
      summary: 'Engine, transmission, all-wheel drive, suspension and stability systems exchange torque and wheel-speed data. A single sensor, voltage or communication fault can therefore change more than one system.',
      points: [
        'Perform a full scan and review event sequence rather than treating codes independently.',
        'Test the main and any auxiliary battery relevant to the exact vehicle.',
        'Calibrate ride height or steering only when the repair procedure calls for it.',
      ],
    },
    symptoms: [
      { title: 'Gear flare or clutch slip feeling', detail: 'Reduce load and diagnose; continuing hard acceleration can worsen an internal fault.', guidePath: problem('transmission-slipping'), guideLabel: 'Read the transmission-slipping guide' },
      { title: 'One corner low after parking', detail: 'Leak isolation should precede compressor replacement.', guidePath: problem('suspension-dropping-overnight'), guideLabel: 'Read the overnight-drop guide' },
      { title: 'AIRMATIC or suspension warning', detail: 'Voltage, pressure, sensor and control faults can look similar on the display.', guidePath: problem('airmatic-malfunction'), guideLabel: 'Read the AIRMATIC guide' },
      { title: 'Check-engine light under boost', detail: 'Ignition, fuel, air and boost evidence must be compared.', guidePath: problem('check-engine-light'), guideLabel: 'Read the check-engine guide' },
    ],
    services: [
      service('E63 scheduled service', MERCEDES_SERVICE_LINKS.maintenance, 'Engine- and driveline-specific maintenance for W212 or W213.'),
      service('AMG transmission repair', MERCEDES_SERVICE_LINKS.transmission, 'MCT and 4MATIC+ diagnosis using vehicle-specific evidence.'),
      service('Mercedes suspension repair', MERCEDES_SERVICE_LINKS.suspension, 'AMG RIDE CONTROL+ leak, compressor, valve and height diagnosis.'),
      service('AMG mechanical repair', MERCEDES_SERVICE_LINKS.mechanical, 'V8, cooling and driveline inspection based on the exact platform.'),
    ],
    faqs: [
      { question: 'Does every E63 use air suspension?', answer: 'No. Suspension equipment changes by generation. W213 E63 models use AMG RIDE CONTROL+ air suspension; earlier E63 vehicles require their own chassis identification and test plan.' },
      { question: 'Is the W213 E63 transmission a normal 9G-TRONIC?', answer: 'It is an AMG SPEEDSHIFT MCT 9G using a wet start-off clutch and AMG control strategy. Fluid, adaptation and repair decisions should be based on the identified unit.' },
      { question: 'Can different tyre sizes cause an E63 driveline complaint?', answer: 'Incorrect size, uneven wear or materially different rolling circumference can affect an all-wheel-drive vehicle. Tyres are one check within a wider driveline diagnosis.' },
      { question: 'What information helps before booking?', answer: 'Provide the VIN, year, mileage, service history, modifications and the exact speed, gear, temperature or parking duration linked to the symptom.' },
    ],
    vehicleImage: '/images/cars/e63.png',
    vehicleImageAlt: 'Mercedes-AMG E63 service and repair profile for W212 and W213 models in Dubai',
  },
  {
    name: 'Mercedes E-Class',
    shortName: 'E-Class',
    path: '/blog/mercedes-e-class-service-dubai-guide',
    legacyBlogSlug: 'mercedes-e-class-service-dubai-guide',
    h1: 'Mercedes E-Class Service & Repair Dubai',
    metaTitle: 'Mercedes E-Class Service & Repair Dubai | Digi-Tec',
    metaDescription: 'Mercedes E-Class service and repair in Dubai for W212, W213 and W214, including 7G/9G transmissions, suspension, 48V systems, AC and diagnostics.',
    intro: 'E-Class generations vary from conventional petrol and diesel W212 models to W213 and W214 vehicles with 9G-TRONIC, 48-volt assistance, plug-in hybrid options and increasingly networked chassis systems. Digi-Tec identifies the fitted configuration before setting the service or diagnostic scope.',
    coverage: [
      'W212 E-Class saloon and estate models with generation-specific petrol, diesel, 7G-TRONIC and suspension equipment.',
      'W213 E-Class models with 9G-TRONIC, optional AIRMATIC and selected mild-hybrid or plug-in hybrid systems.',
      'W214 E-Class vehicles with 48-volt or plug-in hybrid powertrains and newer MBUX/electrical architecture, subject to exact compatibility.',
    ],
    maintenance: {
      title: 'E-Class maintenance by VIN and history',
      summary: 'Service A/B information should be reconciled with time, mileage and completed work. The model badge alone cannot identify the correct oil approval, filter set, brake package or transmission procedure.',
      points: [
        'Record the engine, gearbox and any hybrid system before ordering parts or fluids.',
        'Review brake fluid, plugs, cabin and engine filters and transmission service history.',
        'Inspect front and rear multi-link suspension, steering, tyres and wheel alignment evidence.',
        'Test 12-volt and, where fitted, 48-volt system condition through compatible procedures.',
      ],
    },
    powertrain: {
      title: 'Petrol, diesel and electrified E-Class systems',
      summary: 'W212, W213 and W214 cover several engine families. A conservative diagnostic process starts with the engine code and fault context rather than a list of “common failures”.',
      points: [
        'Petrol reduced-power complaints can involve ignition, fuel, air, boost, emissions or mechanical condition.',
        'Diesel faults may require boost, fuel-pressure and aftertreatment testing.',
        'Mild-hybrid and plug-in hybrid faults cross additional electrical and cooling circuits and require compatible access.',
      ],
    },
    transmission: {
      title: '7G-TRONIC and 9G-TRONIC diagnosis',
      summary: 'E-Class shift quality depends on transmission hardware, software, adaptations, fluid condition, engine torque and mounts. A road test and live data should guide whether the next step is maintenance, electrical testing or internal repair.',
      points: [
        'Note cold-versus-hot operation, the affected gear and whether the fault occurs during acceleration or coast-down.',
        'Inspect for leaks and verify fluid specification and level procedure.',
        'Treat fault codes and adaptation values as evidence, not automatic authorization for a gearbox replacement.',
      ],
    },
    suspension: {
      title: 'Multi-link, AIRMATIC and estate rear suspension',
      summary: 'Many E-Class vehicles use steel springs, while optional AIRMATIC and estate-specific rear levelling appear on selected variants. Identifying the fitted system prevents a steel-suspension noise from being described as an air fault—or vice versa.',
      points: [
        'Check bushes, arms, ball joints, top mounts and dampers for knocks or vague steering.',
        'For an air-suspension complaint, compare ride height, pressure, compressor operation and leakage.',
        'Inspect tyre condition and alignment only in combination with the mechanical suspension state.',
      ],
    },
    climate: {
      title: 'Dubai cooling and climate checks',
      summary: 'An E-Class that cools well on the motorway but poorly in traffic may have an airflow or compressor-control problem; the opposite pattern can point elsewhere. Pressure, temperature and fan data make the distinction.',
      points: [
        'Confirm refrigerant type from the vehicle label.',
        'Inspect condenser and radiator faces, cooling fan response and coolant leakage.',
        'Check cabin-filter restriction, blower output and temperature-flap control.',
      ],
    },
    electrical: {
      title: 'Electrical and driver-assistance systems',
      summary: 'The E-Class uses multiple networks and, on later models, 48-volt or high-voltage systems. Low 12-volt supply can still be the first cause of apparently unrelated warnings.',
      points: [
        'Test battery and charging performance before module replacement.',
        'Use fault chronology and freeze-frame data to choose circuit and component tests.',
        'Confirm radar, camera or steering calibration only when the relevant repair or fault requires it.',
      ],
    },
    symptoms: [
      { title: 'Jerking between gears', detail: 'Reproduce it and separate transmission behaviour from engine torque and mounts.', guidePath: problem('gearbox-jerking'), guideLabel: 'Read the gearbox-jerking guide' },
      { title: 'Rear or corner drops when parked', detail: 'Applicable only to air-equipped variants and requires leak isolation.', guidePath: problem('suspension-dropping-overnight'), guideLabel: 'Read the suspension-drop guide' },
      { title: 'Battery or charging warning', detail: 'The warning can indicate a charging-system fault rather than a battery needing replacement.', guidePath: problem('battery-warning'), guideLabel: 'Read the battery-warning guide' },
      { title: 'AC weak in traffic', detail: 'Fan, airflow, pressure and compressor command should be checked.', guidePath: problem('ac-not-cooling'), guideLabel: 'Read the AC guide' },
    ],
    services: [
      service('E-Class scheduled service', MERCEDES_SERVICE_LINKS.maintenance, 'Service items matched to engine, gearbox and history.'),
      service('Mercedes transmission repair', MERCEDES_SERVICE_LINKS.transmission, '7G/9G diagnosis and fluid work for the identified unit.'),
      service('Mercedes suspension repair', MERCEDES_SERVICE_LINKS.suspension, 'Steel and air-suspension inspection based on fitted equipment.'),
      service('Mercedes diagnostics', MERCEDES_SERVICE_LINKS.diagnostics, 'Network and system diagnosis for engine, chassis and body warnings.'),
    ],
    faqs: [
      { question: 'Does every Mercedes E-Class have AIRMATIC?', answer: 'No. Many use steel springs. AIRMATIC and rear self-levelling equipment appear on selected models and body styles, so the VIN and a physical check determine the system fitted.' },
      { question: 'Which transmission is fitted to my E-Class?', answer: 'It depends on generation, engine and market. The VIN and transmission identification are used to distinguish 7G-TRONIC, 9G-TRONIC and other variants before parts or fluid are selected.' },
      { question: 'Can low battery voltage create several warnings?', answer: 'Yes, but voltage is only one possible cause. Battery, charging, network and affected-system tests are needed before a battery or module is recommended.' },
      { question: 'How should I describe an E-Class fault when booking?', answer: 'Include the warning text, whether the engine was cold or hot, vehicle speed, gear, recent repairs and how often the symptom occurs. That helps select the first diagnostic checks.' },
    ],
    vehicleImage: '/images/cars/e63.png',
    vehicleImageAlt: 'Mercedes E-Class service and repair profile covering W212, W213 and W214 in Dubai',
  },
  {
    name: 'Mercedes S-Class',
    shortName: 'S-Class',
    path: '/blog/mercedes-s-class-service-dubai-guide',
    legacyBlogSlug: 'mercedes-s-class-service-dubai-guide',
    h1: 'Mercedes S-Class Service & Repair Dubai',
    metaTitle: 'Mercedes S-Class Service & Repair Dubai | Digi-Tec',
    metaDescription: 'Mercedes S-Class service and repair in Dubai for W221, W222 and W223, covering AIRMATIC, ABC, E-ACTIVE BODY CONTROL, 9G and electronics.',
    intro: 'An S-Class is a networked luxury platform, not just an engine and oil filter. Maintenance and diagnosis must account for the W221, W222 or W223 chassis, fitted AIRMATIC/ABC/E-ACTIVE system, 7G or 9G transmission, comfort electronics and any 48-volt or plug-in hybrid equipment.',
    coverage: [
      'W221 S-Class petrol and diesel variants with AIRMATIC or ABC depending on model and specification.',
      'W222 S-Class variants with AIRMATIC, MAGIC BODY CONTROL/ABC on selected models, 7G or 9G transmissions and complex comfort systems.',
      'W223 S-Class with AIRMATIC or optional E-ACTIVE BODY CONTROL, rear-axle steering on equipped vehicles and electrified powertrains depending on model.',
    ],
    maintenance: {
      title: 'S-Class service and condition checks',
      summary: 'The service display identifies scheduled work, while the inspection should document the condition of suspension, batteries, brakes, tyres, cooling and comfort systems. Optional equipment changes the checklist materially.',
      points: [
        'Confirm engine, transmission, wheelbase and suspension configuration from the VIN.',
        'Test the main and relevant auxiliary battery systems before chasing intermittent comfort faults.',
        'Measure brake and tyre condition and inspect ride height at all four corners.',
        'Review coolant, transmission and hydraulic-system history where applicable.',
      ],
    },
    powertrain: {
      title: 'S-Class engine and electrification range',
      summary: 'Across three generations the S-Class uses four-, six-, eight- and twelve-cylinder engines plus mild and plug-in hybrid systems. Diagnosis must follow the engine and electrical architecture, not the luxury trim badge.',
      points: [
        'Separate engine roughness from mount, transmission or hybrid start/stop behaviour.',
        'Trace coolant loss across the relevant engine, charge-air or hybrid cooling circuit.',
        'Treat oil residue and oil-consumption complaints as different diagnostic questions.',
      ],
    },
    transmission: {
      title: 'S-Class transmission behaviour',
      summary: 'W221 and W222 commonly use 7G-TRONIC or 9G-TRONIC depending on variant; W223 uses later 9G applications. Smooth calibration can mask early faults, so the exact symptom, temperature and adaptation evidence matter.',
      points: [
        'Check mounts and engine torque delivery when engagement feels abrupt.',
        'Verify fluid and pan/filter requirements for the identified transmission.',
        'Do not use a fault code alone to choose between service, valve-body work, internal repair or replacement.',
      ],
    },
    suspension: {
      title: 'AIRMATIC, ABC, MAGIC BODY CONTROL and E-ACTIVE',
      summary: 'The S-Class can use pneumatic, hydraulic or 48-volt electrohydraulic suspension technology depending on generation and equipment. The display message “AIRMATIC malfunction” should not be applied to an ABC or E-ACTIVE fault without identification.',
      points: [
        'Measure ride height and leak-down behaviour before naming a strut or valve block.',
        'Check compressor or hydraulic pressure, temperature, sensors and supply voltage as applicable.',
        'Confirm ride-height and steering calibration procedures after relevant repairs.',
      ],
    },
    climate: {
      title: 'Multi-zone AC and cooling',
      summary: 'S-Class climate systems can include multiple zones, rear controls, auxiliary pumps and extensive ducting. A front-versus-rear temperature difference can be a control or airflow issue even when refrigerant pressure is acceptable.',
      points: [
        'Measure vent temperatures by zone and check blower and flap operation.',
        'Inspect condenser/radiator airflow, fan performance and coolant-circuit integrity.',
        'Confirm refrigerant type and equipment compatibility before service.',
      ],
    },
    electrical: {
      title: 'Comfort, chassis and safety electronics',
      summary: 'Seat, door, infotainment, suspension, driver-assistance and powertrain modules depend on stable voltage and network communication. A scan should establish fault chronology before expensive modules are proposed.',
      points: [
        'Test battery capacity, charging and quiescent draw where the complaint is intermittent or occurs after parking.',
        'Inspect network and power supply when many modules report communication faults.',
        'Treat radar, camera, rear-steering and high-voltage functions as configuration-specific systems.',
      ],
    },
    symptoms: [
      { title: 'One corner low in the morning', detail: 'Static leak-down testing helps distinguish a spring, line or valve path.', guidePath: problem('suspension-dropping-overnight'), guideLabel: 'Read the suspension-drop guide' },
      { title: 'AIRMATIC malfunction message', detail: 'Pressure, height, compressor, voltage and communication faults can create similar warnings.', guidePath: problem('airmatic-malfunction'), guideLabel: 'Read the AIRMATIC guide' },
      { title: 'Multiple warnings after start-up', detail: 'Low voltage is possible, but charging and network evidence are still required.', guidePath: problem('battery-warning'), guideLabel: 'Read the battery-warning guide' },
      { title: 'AC uneven between zones', detail: 'Airflow and flap control may be as important as refrigerant charge.', guidePath: problem('ac-not-cooling'), guideLabel: 'Read the AC guide' },
    ],
    services: [
      service('S-Class scheduled service', MERCEDES_SERVICE_LINKS.maintenance, 'Maintenance scoped to the exact engine and equipment.'),
      service('Mercedes suspension repair', MERCEDES_SERVICE_LINKS.suspension, 'AIRMATIC, ABC and compatible E-ACTIVE diagnosis.'),
      service('Mercedes electrical repair', MERCEDES_SERVICE_LINKS.electrical, 'Comfort, network and module fault tracing.'),
      service('Mercedes diagnostics', MERCEDES_SERVICE_LINKS.diagnostics, 'Full-vehicle scan and directed testing for interdependent systems.'),
    ],
    faqs: [
      { question: 'Does every S-Class use AIRMATIC?', answer: 'No. AIRMATIC is common, but selected variants use ABC, MAGIC BODY CONTROL or E-ACTIVE BODY CONTROL depending on generation and equipment. The VIN and physical system must be confirmed.' },
      { question: 'Why can one weak battery cause several S-Class warnings?', answer: 'Modules can report undervoltage or communication events when supply drops. That makes battery and charging tests useful, but it does not prove the battery is the only cause.' },
      { question: 'Can an S-Class air leak be diagnosed overnight?', answer: 'A controlled static-height test can be useful, but temperature, parking surface and system venting must be considered. The result is combined with leak, pressure and valve tests.' },
      { question: 'What should I provide before an S-Class appointment?', answer: 'Send the VIN, model year, mileage, warning text, recent battery or suspension work and when the fault appears. This helps confirm diagnostic compatibility and booking scope.' },
    ],
    vehicleImage: '/images/cars/s63.png',
    vehicleImageAlt: 'Mercedes S-Class service and repair profile covering W221, W222 and W223 in Dubai',
  },
  {
    name: 'Mercedes-AMG S63',
    shortName: 'AMG S63',
    path: '/mercedes/models/s63-service-repair-dubai',
    h1: 'Mercedes-AMG S63 Service & Repair Dubai',
    metaTitle: 'Mercedes-AMG S63 Service & Repair Dubai | Digi-Tec',
    metaDescription: 'Mercedes-AMG S63 service and repair in Dubai for W221, W222 and W223 E PERFORMANCE models: V8, MCT, air suspension, hybrid and cooling.',
    intro: 'The S63 layers AMG powertrain and brake hardware onto the S-Class comfort, suspension and electrical architecture. W221, W222 and W223 E PERFORMANCE vehicles require different engine, transmission, air-suspension and electrical test plans.',
    coverage: [
      'W221 S63 applications with M156 or later M157 V8 powertrains and generation-specific AMG transmission equipment.',
      'W222 S63 applications with M157 or M177 biturbo V8, AMG transmission and AIRMATIC-based AMG RIDE CONTROL.',
      'W223 S63 E PERFORMANCE with M177 V8, rear electric drive unit, high-voltage battery and AMG SPEEDSHIFT MCT 9G.',
    ],
    maintenance: {
      title: 'S63 maintenance priorities',
      summary: 'Service planning must combine the engine schedule with AMG transmission, brakes, tyres, suspension and the vehicle’s comfort or hybrid systems. The W223 high-voltage system introduces additional safety and cooling checks.',
      points: [
        'Confirm engine oil approval, filter and ignition items for the exact generation.',
        'Measure the installed steel or carbon-ceramic brake package.',
        'Inspect AIRMATIC height retention and compressor behaviour.',
        'Apply compatible high-voltage procedures before W223 hybrid work.',
      ],
    },
    powertrain: {
      title: 'AMG V8 and E PERFORMANCE systems',
      summary: 'M156, M157 and M177 engines have different air, fuel, boost, cooling and lubrication systems. The W223 adds a performance hybrid system whose rear electric drive can influence acceleration and fault behaviour.',
      points: [
        'Diagnose misfires using counts, fuel and air data plus mechanical evidence.',
        'Inspect boost and charge-air circuits on biturbo generations.',
        'Identify which cooling circuit is losing fluid before pressure testing or component replacement.',
      ],
    },
    transmission: {
      title: 'AMG SPEEDSHIFT MCT and driveline',
      summary: 'AMG MCT behaviour changes by generation, and W223 torque delivery includes electric rear-drive intervention. A perceived transmission slip can therefore need engine, gearbox, hybrid and wheel-speed data together.',
      points: [
        'Log the concern by gear, temperature, drive mode and state of charge where relevant.',
        'Inspect mounts, shafts, differential and tyre condition as part of driveline diagnosis.',
        'Confirm fluid specification and adaptation procedure before service or repair.',
      ],
    },
    suspension: {
      title: 'AMG RIDE CONTROL air suspension',
      summary: 'S63 applications use AMG-tuned air suspension, with technology varying by generation. Height loss, harsh ride or a warning may come from pneumatic leakage, a compressor, valve block, sensor, damper or voltage issue.',
      points: [
        'Compare static height and commanded/actual height values.',
        'Check pressure production, compressor temperature and leak paths.',
        'Inspect mechanical arms, bushes and tyres rather than treating every ride complaint as pneumatic.',
      ],
    },
    climate: {
      title: 'High-output cooling and multi-zone AC',
      summary: 'The S63 combines AMG thermal load with an S-Class multi-zone cabin. W223 adds hybrid cooling. Diagnosis should identify the affected circuit or zone instead of treating all temperature complaints as one system.',
      points: [
        'Inspect cooling-stack airflow and fan response under load.',
        'Measure vent temperature and flap control by zone.',
        'Treat hybrid cooling warnings as a separate safety-aware diagnostic path.',
      ],
    },
    electrical: {
      title: 'AMG, comfort and high-voltage diagnostics',
      summary: 'S63 faults may cross AMG drivetrain, air suspension, rear steering, comfort electronics and driver-assistance systems. W223 high-voltage work is accepted only where the exact requested scope and workshop compatibility are confirmed.',
      points: [
        'Scan the full vehicle and preserve chronological event data.',
        'Test 12-volt supply before interpreting widespread communication codes.',
        'Do not open or probe high-voltage components without the specified isolation and verification process.',
      ],
    },
    symptoms: [
      { title: 'Transmission flare under acceleration', detail: 'Reduce load and diagnose gearbox, engine and hybrid torque evidence.', guidePath: problem('transmission-slipping'), guideLabel: 'Read the transmission-slipping guide' },
      { title: 'S63 settles on one corner', detail: 'A controlled leak-down test helps isolate the pneumatic path.', guidePath: problem('suspension-dropping-overnight'), guideLabel: 'Read the suspension-drop guide' },
      { title: 'AIRMATIC warning', detail: 'Do not assume the compressor has failed without pressure and supply tests.', guidePath: problem('airmatic-malfunction'), guideLabel: 'Read the AIRMATIC guide' },
      { title: 'Oil or burning smell', detail: 'Locate the source promptly around hot V8 and exhaust components.', guidePath: problem('oil-leak'), guideLabel: 'Read the oil-leak guide' },
    ],
    services: [
      service('S63 scheduled service', MERCEDES_SERVICE_LINKS.maintenance, 'Generation-specific AMG and S-Class maintenance.'),
      service('AMG mechanical repair', MERCEDES_SERVICE_LINKS.mechanical, 'V8, cooling and compatible hybrid-system inspection.'),
      service('AMG transmission repair', MERCEDES_SERVICE_LINKS.transmission, 'MCT diagnosis using drivetrain and torque evidence.'),
      service('Mercedes suspension repair', MERCEDES_SERVICE_LINKS.suspension, 'AMG air-suspension pressure, leak and control testing.'),
    ],
    faqs: [
      { question: 'Is the W223 S63 only a V8?', answer: 'No. The W223 S63 E PERFORMANCE combines an M177 V8 with a rear electric drive unit and high-voltage battery, so diagnosis crosses combustion, transmission and hybrid systems.' },
      { question: 'Can S63 suspension be diagnosed from the parked height alone?', answer: 'Parked height is useful evidence but not a complete diagnosis. Temperature, parking surface, commanded venting, pressure, leakage, sensors and mechanical condition also matter.' },
      { question: 'Does a transmission slip always mean the MCT needs replacement?', answer: 'No. The sensation can involve control, fluid, clutch, engine torque, hybrid intervention or another driveline component. The fault must be reproduced and measured.' },
      { question: 'How is W223 repair coverage confirmed?', answer: 'Send the VIN and exact warning or requested work. Digi-Tec will confirm compatible high-voltage and diagnostic scope before accepting the appointment.' },
    ],
    vehicleImage: '/images/cars/s63.png',
    vehicleImageAlt: 'Mercedes-AMG S63 service profile covering W221, W222 and W223 E PERFORMANCE in Dubai',
  },
  {
    name: 'Mercedes GLE',
    shortName: 'GLE',
    path: '/mercedes/models/gle-service-repair-dubai',
    h1: 'Mercedes GLE Service & Repair Dubai',
    metaTitle: 'Mercedes GLE Service & Repair Dubai | Digi-Tec',
    metaDescription: 'Mercedes GLE service and repair in Dubai for W166 and W167: 4MATIC, 7G/9G, AIRMATIC, E-ACTIVE BODY CONTROL, cooling and diagnostics.',
    intro: 'The GLE spans the W166-era M-Class/GLE and the W167 platform, with petrol, diesel, AMG, mild-hybrid and plug-in hybrid variants. Transmission, 4MATIC, suspension and cooling equipment must be identified before service or repair is scoped.',
    coverage: [
      'W166 M-Class and GLE applications with petrol, diesel or AMG powertrains, 7G/9G transmissions and optional air suspension depending on specification.',
      'W167 GLE SUV and Coupe variants with 9G-TRONIC, 4MATIC and optional AIRMATIC or E-ACTIVE BODY CONTROL.',
      'Mild-hybrid, plug-in hybrid and AMG variants where compatible diagnostic and repair scope is confirmed from the VIN.',
    ],
    maintenance: {
      title: 'GLE maintenance and SUV duty cycle',
      summary: 'Vehicle mass, tyre package, towing, urban use and off-road exposure affect inspection priorities. The scheduled service remains VIN-led, with additional condition checks tied to how the vehicle is actually used.',
      points: [
        'Confirm engine oil, filters and plugs for the exact petrol, diesel or hybrid model.',
        'Review transmission, transfer-case and differential fluid history.',
        'Measure brakes and tyres and inspect suspension at normal ride height.',
        'Check cooling-stack cleanliness, battery condition and AC output before high summer load.',
      ],
    },
    powertrain: {
      title: 'GLE petrol, diesel, AMG and hybrid powertrains',
      summary: 'The GLE family includes engines such as M276/M278 and OM642 on earlier vehicles, and M256/OM656 plus electrified variants on later models. Those examples guide identification; the engine code and VIN remain authoritative.',
      points: [
        'Use boost, fuel and air data to diagnose reduced power on turbo petrol or diesel engines.',
        'Investigate coolant loss across engine, charge-air and hybrid circuits fitted to the vehicle.',
        'Confirm high-voltage or 48-volt compatibility before accepting related repair work.',
      ],
    },
    transmission: {
      title: '7G/9G transmission and 4MATIC',
      summary: 'A GLE shudder, jerk or binding sensation may originate in the transmission, mounts, transfer case, differentials, shafts or mismatched tyres. Road-test conditions and live data help separate them.',
      points: [
        'Identify the transmission and reproduce the symptom at a known temperature.',
        'Inspect all four tyre sizes, wear and rolling circumference on 4MATIC vehicles.',
        'Check transfer-case and driveline evidence before condemning the automatic gearbox.',
      ],
    },
    suspension: {
      title: 'Steel suspension, AIRMATIC and E-ACTIVE BODY CONTROL',
      summary: 'GLE equipment ranges from steel springs to AIRMATIC and, on selected W167 vehicles, 48-volt E-ACTIVE BODY CONTROL working with air springs. The test plan changes substantially between these systems.',
      points: [
        'For a low corner, compare static height and leak paths before replacing the compressor.',
        'For E-ACTIVE warnings, confirm 48-volt supply, hydraulic control and system compatibility.',
        'Inspect mechanical arms, bushes and tyres alongside active suspension data.',
      ],
    },
    climate: {
      title: 'GLE cooling and AC in Dubai',
      summary: 'A large SUV cooling stack can collect debris between heat exchangers even when the front face appears clean. The AC condenser, engine radiator, charge-air coolers and fans should be considered as a working airflow system.',
      points: [
        'Measure AC pressures and vent temperature at idle and raised airflow where appropriate.',
        'Inspect coolant leakage, thermostat/pump evidence and fan command when temperature rises.',
        'Confirm rear-zone airflow and flap control on multi-zone vehicles.',
      ],
    },
    electrical: {
      title: 'GLE electrical, 48-volt and driver-assistance systems',
      summary: 'W167 vehicles may combine 12-volt, 48-volt or high-voltage systems with networked suspension and driver assistance. Low supply voltage can cause secondary events, but it should be measured rather than assumed.',
      points: [
        'Retain scan data across powertrain, transfer case, suspension and body modules.',
        'Test main battery and charging/DC-DC behaviour as applicable.',
        'Confirm radar or camera calibration after relevant windscreen, body or alignment work.',
      ],
    },
    symptoms: [
      { title: 'Rear or one corner low overnight', detail: 'Applicable to air-equipped GLE variants and needs leak isolation.', guidePath: problem('suspension-dropping-overnight'), guideLabel: 'Read the suspension-drop guide' },
      { title: 'AIRMATIC or E-ACTIVE warning', detail: 'Identify the fitted system before interpreting pressure or voltage faults.', guidePath: problem('airmatic-malfunction'), guideLabel: 'Read the AIRMATIC guide' },
      { title: 'Jerking or shuddering driveline', detail: 'Separate gearbox, transfer-case, tyre and mount behaviour.', guidePath: problem('gearbox-jerking'), guideLabel: 'Read the gearbox guide' },
      { title: 'Weak AC in the third row or rear', detail: 'Zone airflow and control may be involved alongside refrigerant performance.', guidePath: problem('ac-not-cooling'), guideLabel: 'Read the AC guide' },
    ],
    services: [
      service('GLE scheduled service', MERCEDES_SERVICE_LINKS.maintenance, 'Maintenance matched to engine, hybrid equipment and history.'),
      service('Mercedes suspension repair', MERCEDES_SERVICE_LINKS.suspension, 'AIRMATIC and compatible E-ACTIVE diagnosis.'),
      service('Mercedes transmission repair', MERCEDES_SERVICE_LINKS.transmission, '7G/9G and driveline diagnosis for the identified platform.'),
      service('Mercedes AC repair', MERCEDES_SERVICE_LINKS.ac, 'Front and multi-zone climate diagnosis under Dubai load.'),
    ],
    faqs: [
      { question: 'Does every Mercedes GLE have AIRMATIC?', answer: 'No. GLE suspension can be steel-spring, AIRMATIC or E-ACTIVE BODY CONTROL with air springs depending on generation and specification.' },
      { question: 'Can mismatched tyres affect GLE 4MATIC?', answer: 'Significantly different size, wear or rolling circumference can affect an all-wheel-drive system. Tyre inspection is one part of a proper shudder or binding diagnosis.' },
      { question: 'Is an E-ACTIVE fault the same as a normal AIRMATIC leak?', answer: 'No. E-ACTIVE BODY CONTROL adds a 48-volt electrohydraulic system to the air-spring foundation. Diagnosis can involve pneumatic, hydraulic, electrical and control-system evidence.' },
      { question: 'What details should I send for a GLE booking?', answer: 'Provide the VIN, model year, engine badge, warning text, whether the vehicle rises after start and the conditions that trigger the concern.' },
    ],
  },
  {
    name: 'Mercedes GLS',
    shortName: 'GLS',
    path: '/mercedes/models/gls-service-repair-dubai',
    h1: 'Mercedes GLS Service & Repair Dubai',
    metaTitle: 'Mercedes GLS Service & Repair Dubai | Digi-Tec',
    metaDescription: 'Mercedes GLS service and repair in Dubai for X166 and X167: 9G-TRONIC, 4MATIC, AIRMATIC, E-ACTIVE BODY CONTROL, cooling and electronics.',
    intro: 'The seven-seat GLS places high load on tyres, brakes, cooling, 4MATIC and self-levelling suspension. X166 and X167 vehicles also use different engine, electrical and active-chassis technology, so Digi-Tec confirms the exact configuration before quoting work.',
    coverage: [
      'X166 GL/GLS petrol, diesel and AMG variants with 7G or 9G-era equipment and AIRMATIC depending on market and specification.',
      'X167 GLS variants with 9G-TRONIC, 4MATIC and AIRMATIC as the basis of the current chassis.',
      'Selected X167 vehicles with E-ACTIVE BODY CONTROL, 48-volt engines or AMG/Maybach equipment, subject to VIN-specific scope.',
    ],
    maintenance: {
      title: 'GLS maintenance for mass, load and heat',
      summary: 'The correct schedule comes from vehicle data and history. A GLS used fully loaded, for long-distance travel or towing also benefits from condition checks of tyres, brakes, suspension and driveline rather than arbitrary part replacement.',
      points: [
        'Confirm engine oil, filters, plugs and diesel aftertreatment items by engine code.',
        'Review transmission, transfer-case and differential-fluid history.',
        'Measure brake discs/pads and inspect tyre load rating, age and wear across all four corners.',
        'Check AIRMATIC height retention and cooling/AC performance.',
      ],
    },
    powertrain: {
      title: 'GLS six-, eight-cylinder and electrified powertrains',
      summary: 'The family spans earlier V6/V8 petrol and diesel engines and newer inline-six, V8 and 48-volt-assisted applications. The fitted engine determines lubrication, boost, cooling and electrical test procedures.',
      points: [
        'Use fuel, air, boost and mechanical evidence for reduced-power diagnosis.',
        'Trace oil and coolant leakage after cleaning because undertrays can move fluid away from the source.',
        'Confirm 48-volt safety and diagnostic compatibility on later variants.',
      ],
    },
    transmission: {
      title: '9G-TRONIC and 4MATIC driveline',
      summary: 'Most later GLS variants use 9G-TRONIC with permanent all-wheel drive. A low-speed shudder, delayed drive or clunk should be separated across gearbox, mounts, transfer case, shafts, differentials and tyre condition.',
      points: [
        'Reproduce the symptom by temperature, steering angle, gear and load.',
        'Inspect tyre size and rolling circumference before internal driveline work.',
        'Confirm fluid and adaptation evidence for the exact 9G application.',
      ],
    },
    suspension: {
      title: 'GLS AIRMATIC and E-ACTIVE systems',
      summary: 'AIRMATIC maintains ride height as passenger and luggage load changes. Selected X167 vehicles add 48-volt E-ACTIVE BODY CONTROL. A low rear, slow lift or warning message can therefore involve leakage, pressure, sensors, voltage or active hydraulic control.',
      points: [
        'Measure all four corners after a controlled parked period.',
        'Check compressor run time, pressure build and valve behaviour before recommending a compressor.',
        'Inspect arms, bushes, dampers, wheels and tyres alongside active-system data.',
      ],
    },
    climate: {
      title: 'Three-row climate and cooling',
      summary: 'A GLS may have multiple climate zones and a large cabin. Poor third-row cooling can involve rear airflow or flap control, while poor cooling everywhere may point to refrigerant, condenser, fan or compressor performance.',
      points: [
        'Measure vent temperature and airflow in the affected zones.',
        'Inspect condenser/radiator blockage and fan operation under load.',
        'Investigate coolant loss promptly on a heavily loaded SUV.',
      ],
    },
    electrical: {
      title: 'GLS network and 48-volt diagnostics',
      summary: 'Suspension, powertrain, seating, tailgate, climate and driver-assistance modules share power and network data. A useful scan connects code chronology with battery and circuit measurements.',
      points: [
        'Test the 12-volt battery and charging system when several warnings appear after start.',
        'Assess 48-volt/DC-DC warnings with the correct safety and diagnostic procedure.',
        'Confirm calibration needs after windscreen, body, steering or suspension work.',
      ],
    },
    symptoms: [
      { title: 'GLS drops at the rear overnight', detail: 'Load levelling does not make overnight height loss normal; the system should be leak-tested.', guidePath: problem('suspension-dropping-overnight'), guideLabel: 'Read the suspension-drop guide' },
      { title: 'AIRMATIC warning and slow rise', detail: 'Pressure supply, leaks, sensors and voltage all matter.', guidePath: problem('airmatic-malfunction'), guideLabel: 'Read the AIRMATIC guide' },
      { title: 'Low-speed shudder or harsh shift', detail: 'Gearbox, 4MATIC, tyre and mount causes need separating.', guidePath: problem('gearbox-jerking'), guideLabel: 'Read the gearbox guide' },
      { title: 'Battery warning while driving', detail: 'Reduce electrical load and assess charging-system risk promptly.', guidePath: problem('battery-warning'), guideLabel: 'Read the battery-warning guide' },
    ],
    services: [
      service('GLS scheduled service', MERCEDES_SERVICE_LINKS.maintenance, 'Vehicle-specific maintenance and SUV condition checks.'),
      service('Mercedes suspension repair', MERCEDES_SERVICE_LINKS.suspension, 'AIRMATIC and compatible E-ACTIVE pressure, leak and control diagnosis.'),
      service('Mercedes transmission repair', MERCEDES_SERVICE_LINKS.transmission, '9G and 4MATIC-related diagnosis using measured evidence.'),
      service('Mercedes electrical repair', MERCEDES_SERVICE_LINKS.electrical, '12-volt, 48-volt, wiring and module fault tracing.'),
    ],
    faqs: [
      { question: 'Is AIRMATIC standard on every GLS?', answer: 'Equipment varies across older GL/GLS markets and generations. The current X167 platform uses AIRMATIC as its suspension basis, while E-ACTIVE BODY CONTROL is a more complex option on selected vehicles.' },
      { question: 'Why might a GLS drop at the rear after parking?', answer: 'Possible paths include a rear air spring, line, fitting or valve block. A controlled height and leak test is needed because replacing the compressor does not repair the leak that may have overworked it.' },
      { question: 'Can a battery warning be caused by the 48-volt system?', answer: 'On equipped models, the charging architecture includes more than a conventional alternator and battery. The exact warning and vehicle configuration determine whether 12-volt, 48-volt, belt-drive, DC-DC or wiring tests are needed.' },
      { question: 'How do I book a GLS inspection?', answer: 'Send Digi-Tec the VIN, year, mileage, warning text, whether the fault changes with load or parking duration, and any recent battery, tyre or suspension work.' },
    ],
  },
];

export const getMercedesModelByPath = (path: string) =>
  mercedesModelPages.find((model) => model.path === path);

export const getMercedesModelByLegacyBlogSlug = (slug: string) =>
  mercedesModelPages.find((model) => model.legacyBlogSlug === slug);

export const newMercedesModelPages = mercedesModelPages.filter((model) => !model.legacyBlogSlug);
