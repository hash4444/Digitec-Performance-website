/**
 * Brand × Service SEO landing pages.
 *
 * 13 brands × 6 services = 78 dedicated pages at
 *   /brands/{brandSlug}/{serviceSlug}
 *
 * Each page composes from BRAND_PROFILES (brand-specific tech vocabulary) +
 * a per-service composer, so every combination reads with real brand
 * specifics (Longlife-04, PIWIS, XENTRY, PDK, AIRMATIC, etc.) rather than
 * templated filler.
 */

export type ServiceKey =
  | 'oil-change'
  | 'brake-repair'
  | 'transmission-repair'
  | 'ac-repair'
  | 'suspension-repair'
  | 'engine-diagnostics';

export const SERVICE_KEYS: ServiceKey[] = [
  'oil-change',
  'brake-repair',
  'transmission-repair',
  'ac-repair',
  'suspension-repair',
  'engine-diagnostics',
];

export interface BrandProfile {
  brandSlug: string;
  brandName: string;
  shortName: string;
  models: string[];
  diagnosticTool: string;
  engineFamily: string;
  engineCodes: string[];
  oilSpec: string;
  oilIntervalKm: number;
  transmissionName: string;
  transmissionFluid: string;
  brakeSystem: string;
  suspensionType: string;
  acRefrigerant: string;
  climateNote: string;
  heritageLine: string;
}

export const BRAND_PROFILES: Record<string, BrandProfile> = {
  'mercedes-benz-service-dubai': {
    brandSlug: 'mercedes-benz-service-dubai',
    brandName: 'Mercedes-Benz',
    shortName: 'Mercedes',
    models: ['C-Class', 'E-Class', 'S-Class', 'GLE', 'GLS', 'G-Class', 'AMG GT', 'CLS', 'EQS'],
    diagnosticTool: 'Mercedes XENTRY / DAS with Star Diagnostics',
    engineFamily: 'M254, M256, M177, and M279 platforms',
    engineCodes: ['M254', 'M256', 'M177', 'M279', 'OM656'],
    oilSpec: 'MB 229.5 / 229.71 approved 5W-30 or 0W-30',
    oilIntervalKm: 10000,
    transmissionName: '9G-Tronic (725.0) and AMG SpeedShift MCT',
    transmissionFluid: 'MB 236.15 / 236.17 ATF',
    brakeSystem: 'AMG four-piston and six-piston calipers, with optional carbon ceramic on AMG GT and S 63',
    suspensionType: 'AIRMATIC air suspension and E-ACTIVE Body Control on S-Class and GLS',
    acRefrigerant: 'R-1234yf on post-2017 platforms',
    climateNote: 'Mercedes AIRMATIC compressors and OM656 diesels are especially sensitive to fine Dubai dust and 45C-plus underhood temperatures.',
    heritageLine: 'The three-pointed star has led Digi-Tec workshop bays for over two decades.',
  },
  'maybach-service-dubai': {
    brandSlug: 'maybach-service-dubai',
    brandName: 'Mercedes-Maybach',
    shortName: 'Maybach',
    models: ['Maybach S 580', 'Maybach S 680', 'Maybach GLS 600', 'Maybach S-Class Edition 100'],
    diagnosticTool: 'Mercedes XENTRY with Maybach-level module coverage',
    engineFamily: 'M256 inline-six, M177 V8 biturbo, and M279 V12 biturbo',
    engineCodes: ['M256', 'M177', 'M279'],
    oilSpec: 'MB 229.5 for V12, MB 229.71 for M256 and M177 hybrids',
    oilIntervalKm: 10000,
    transmissionName: 'MCT 9G-Tronic (725.0)',
    transmissionFluid: 'MB 236.17 ATF',
    brakeSystem: 'Silent-tuned six-piston front calipers with ceramic-optimised pads',
    suspensionType: 'E-ACTIVE Body Control with road-scanning camera and curve tilting',
    acRefrigerant: 'R-1234yf with four-zone climate and rear-cabin fragrance',
    climateNote: 'Chauffeur-driven Maybachs in Dubai idle in traffic for hours, which stresses the compressor, transmission cooler, and rear-cabin AC lines.',
    heritageLine: 'Maybach clients expect concierge handling, and Digi-Tec delivers exactly that.',
  },
  'porsche-service-dubai': {
    brandSlug: 'porsche-service-dubai',
    brandName: 'Porsche',
    shortName: 'Porsche',
    models: ['911 Carrera', '911 Turbo S', '911 GT3', 'Cayman', 'Cayenne', 'Panamera', 'Macan', 'Taycan'],
    diagnosticTool: 'PIWIS Tester 3 (PT3G) with factory-level coding rights',
    engineFamily: '9A2 flat-six, M177 V8 biturbo (Cayenne / Panamera), and 4.0 GT flat-six',
    engineCodes: ['9A2', 'MDG', 'M177', 'MCG', 'MDC.WA'],
    oilSpec: 'Mobil 1 0W-40 A40 for 911, 5W-40 C40 for 9A2 turbo flat-six',
    oilIntervalKm: 15000,
    transmissionName: '7-speed PDK (7DT-45 and 7DT-70) and 8-speed Tiptronic S',
    transmissionFluid: 'Porsche PDK fluid 999.917.080.00',
    brakeSystem: 'Steel or PCCB Porsche Ceramic Composite Brakes on Turbo S, GT3, and Cayenne Turbo GT',
    suspensionType: 'PASM adaptive dampers and PDCC active roll stabilisation',
    acRefrigerant: 'R-1234yf on 992, 9YA Cayenne, and Taycan; R-134a on older platforms',
    climateNote: 'Cayenne air suspension bags and 911 GT3 track-day cars both suffer accelerated wear in Dubai summer heat.',
    heritageLine: 'Every Porsche in our care is treated to Stuttgart-grade precision.',
  },
  'audi-service-dubai': {
    brandSlug: 'audi-service-dubai',
    brandName: 'Audi',
    shortName: 'Audi',
    models: ['A4', 'A6', 'A7', 'A8', 'Q5', 'Q7', 'Q8', 'RS6 Avant', 'RS7', 'R8'],
    diagnosticTool: 'ODIS Service and Engineering, plus VCDS for legacy platforms',
    engineFamily: 'EA888 2.0 TFSI, EA839 3.0 TFSI V6, and 4.0 TFSI V8 biturbo',
    engineCodes: ['EA888', 'EA839', 'DJPA', 'DCPC', '4.0 TFSI'],
    oilSpec: 'VW 508 00 / 509 00 or 502 00 / 505 00 depending on engine',
    oilIntervalKm: 15000,
    transmissionName: 'S Tronic DL501 (7-speed DCT) and ZF 8HP Tiptronic',
    transmissionFluid: 'VW G 055 529 A2 (DL501) and ZF Lifeguard 8',
    brakeSystem: 'Six-piston front calipers with optional carbon ceramic on RS models',
    suspensionType: 'Adaptive air suspension with Audi Drive Select on Q7, Q8, A8, and RS6',
    acRefrigerant: 'R-1234yf on B9 and D5 and 4M platforms',
    climateNote: 'Audi 4.0 TFSI intake manifold flaps and EA888 PCV systems are known Dubai-heat wear points we inspect on every visit.',
    heritageLine: 'quattro grip, Vorsprung durch Technik precision, Digi-Tec attention.',
  },
  'bmw-service-dubai': {
    brandSlug: 'bmw-service-dubai',
    brandName: 'BMW',
    shortName: 'BMW',
    models: ['3 Series', '5 Series', '7 Series', 'X3', 'X5', 'X7', 'M3', 'M5', 'M8', 'i8'],
    diagnosticTool: 'ISTA+ with E-Sys coding and full ENET access',
    engineFamily: 'B58 inline-six, N63 and S63 V8, and S55 and S58 M-power six',
    engineCodes: ['B58', 'B48', 'S55', 'S58', 'N63', 'S63'],
    oilSpec: 'BMW Longlife-04 (LL-04) 5W-30 or LL-01 FE 0W-30 for M cars',
    oilIntervalKm: 12000,
    transmissionName: 'ZF 8HP (8HP50, 8HP70, 8HP76) and DCT M-DCT on F80 and F82',
    transmissionFluid: 'ZF Lifeguard 8 (ATF for 8HP), BMW MTF-LT-5 for M-DCT',
    brakeSystem: 'M Compound and optional M Carbon Ceramic on M3, M4, M5, M8',
    suspensionType: 'Adaptive M suspension and rear air suspension on X5, X7, and G-Series 5 and 7',
    acRefrigerant: 'R-1234yf on F and G platforms',
    climateNote: 'BMW N63 and S63 twin-turbo V8s log real-world 130C-plus underhood temps in Dubai summer, which is why our Vanos and oil separator inspections are strict.',
    heritageLine: 'M-power heritage meets independent workshop pricing.',
  },
  'lamborghini-service-dubai': {
    brandSlug: 'lamborghini-service-dubai',
    brandName: 'Lamborghini',
    shortName: 'Lamborghini',
    models: ['Huracan EVO', 'Huracan STO', 'Urus', 'Urus Performante', 'Revuelto', 'Aventador SVJ'],
    diagnosticTool: 'Lamborghini LDAS with authorised software levels',
    engineFamily: '5.2 V10 naturally aspirated, 6.5 V12, and 4.0 V8 biturbo (Urus)',
    engineCodes: ['5.2 V10', '6.5 V12', '4.0 V8 biturbo'],
    oilSpec: 'Lamborghini-approved 5W-40 fully synthetic',
    oilIntervalKm: 10000,
    transmissionName: 'LDF 7-speed DCT (Huracan and Urus) and ISR 7-speed single-clutch (Aventador)',
    transmissionFluid: 'Lamborghini-approved DCT fluid',
    brakeSystem: 'CCB carbon-ceramic 380 mm front and 356 mm rear on most V10 and V12 platforms',
    suspensionType: 'Magneto-rheological dampers with ANIMA Strada, Sport, and Corsa drive modes',
    acRefrigerant: 'R-1234yf on current cars',
    climateNote: 'V10 and V12 Lamborghinis run high underhood temps that, combined with Dubai summer heat, shorten coolant, brake fluid, and gearbox oil life.',
    heritageLine: "Sant Agata engineering, Al Quoz precision.",
  },
  'bentley-service-dubai': {
    brandSlug: 'bentley-service-dubai',
    brandName: 'Bentley',
    shortName: 'Bentley',
    models: ['Continental GT', 'Continental GTC', 'Flying Spur', 'Bentayga', 'Bentayga EWB'],
    diagnosticTool: 'ODIS with Bentley-level rights, plus PICO scope work when required',
    engineFamily: '6.0 W12 TSI twin-turbo and 4.0 V8 biturbo (shared with Audi RS)',
    engineCodes: ['W12 TSI', '4.0 V8 biturbo'],
    oilSpec: 'VW 502 00 / 505 00 approved 5W-40 for W12',
    oilIntervalKm: 16000,
    transmissionName: 'ZF 8HP70 8-speed automatic (Bentley-calibrated)',
    transmissionFluid: 'ZF Lifeguard 8',
    brakeSystem: 'Ten-piston front and four-piston rear on W12 Continental, with optional CSiC carbon-silicon-carbide',
    suspensionType: '48V active anti-roll (Dynamic Ride) with three-chamber air suspension',
    acRefrigerant: 'R-1234yf with four-zone climate',
    climateNote: 'The W12 coolant transfer pipe is a known heat-cycled wear item we inspect on every Bentley visit.',
    heritageLine: 'Crewe craftsmanship, cared for like it belongs in a private collection.',
  },
  'mclaren-service-dubai': {
    brandSlug: 'mclaren-service-dubai',
    brandName: 'McLaren',
    shortName: 'McLaren',
    models: ['540C', '570S', '600LT', '650S', '720S', '765LT', 'GT', 'Artura', '750S'],
    diagnosticTool: 'McLaren MDS diagnostic platform',
    engineFamily: 'M838T 3.8 twin-turbo V8, M840T 4.0 twin-turbo V8, and Artura hybrid V6',
    engineCodes: ['M838T', 'M840T', 'M630 V6 hybrid'],
    oilSpec: 'Mobil 1 or Nulon 5W-40 to McLaren spec',
    oilIntervalKm: 10000,
    transmissionName: 'Graziano SSG 7-speed seamless-shift DCT (Artura uses 8-speed DCT)',
    transmissionFluid: 'McLaren-approved SSG fluid',
    brakeSystem: 'Carbon-ceramic rotors with six-piston front and four-piston rear aluminium calipers',
    suspensionType: 'Proactive Chassis Control II hydraulic suspension (no anti-roll bars)',
    acRefrigerant: 'R-1234yf on 720S onwards',
    climateNote: 'The PCC II hydraulic system and its accumulators are the single most heat-sensitive component we inspect on any Dubai McLaren.',
    heritageLine: 'Woking-grade carbon monocoque care, out of Al Quoz.',
  },
  'ferrari-service-dubai': {
    brandSlug: 'ferrari-service-dubai',
    brandName: 'Ferrari',
    shortName: 'Ferrari',
    models: ['488 GTB', '488 Pista', 'F8 Tributo', 'SF90 Stradale', 'Roma', 'Portofino M', '812 Superfast', '296 GTB', 'Purosangue'],
    diagnosticTool: 'Ferrari SD3 / DEIS diagnostic suite',
    engineFamily: 'F154 3.9 twin-turbo V8, F140 6.5 V12, and F163 3.0 twin-turbo V6 hybrid',
    engineCodes: ['F154', 'F140', 'F163'],
    oilSpec: 'Shell Helix Ultra 5W-40 SP to Ferrari spec',
    oilIntervalKm: 12500,
    transmissionName: 'Getrag 7-speed F1 DCT (7DL750) and 8-speed DCT (SF90, 296, Roma)',
    transmissionFluid: 'Ferrari-approved F1 DCT fluid',
    brakeSystem: 'CCM3 and CCM-R carbon-ceramic rotors with Brembo six-piston calipers',
    suspensionType: 'SCM-E magnetorheological dampers with Ferrari Dynamic Enhancer',
    acRefrigerant: 'R-1234yf on current V8, V6, and V12 platforms',
    climateNote: 'F1 DCT clutch wear accelerates in Dubai stop-start traffic, and we measure clutch position via SD3 on every visit.',
    heritageLine: 'Maranello engineering, reverent service, transparent reporting.',
  },
  'bugatti-service-dubai': {
    brandSlug: 'bugatti-service-dubai',
    brandName: 'Bugatti',
    shortName: 'Bugatti',
    models: ['Veyron', 'Veyron Grand Sport', 'Chiron', 'Chiron Pur Sport', 'Chiron Super Sport', 'Divo', 'Mistral'],
    diagnosticTool: 'Bugatti-authorised diagnostic tooling with Molsheim-level access',
    engineFamily: '8.0 W16 quad-turbo',
    engineCodes: ['W16 quad-turbo'],
    oilSpec: 'Castrol Edge Professional to Bugatti spec, W16 requires approximately 15 litres',
    oilIntervalKm: 10000,
    transmissionName: 'Ricardo 7-speed DCT (dual-clutch)',
    transmissionFluid: 'Bugatti-approved DCT fluid',
    brakeSystem: 'Eight-piston front and six-piston rear titanium calipers on CSiC carbon-silicon-carbide rotors',
    suspensionType: 'Adaptive damping with speed-dependent ride-height and active aero',
    acRefrigerant: 'R-1234yf',
    climateNote: 'The W16 quad-turbo runs a bespoke cooling loop with ten separate radiators, all of which we pressure-test in Dubai heat.',
    heritageLine: 'Molsheim-grade discretion, climate-controlled bays, NDA-backed handling.',
  },
  'land-rover-service-dubai': {
    brandSlug: 'land-rover-service-dubai',
    brandName: 'Land Rover',
    shortName: 'Range Rover',
    models: ['Range Rover', 'Range Rover Sport', 'Range Rover Velar', 'Range Rover Evoque', 'Defender 90', 'Defender 110', 'Discovery'],
    diagnosticTool: 'JLR SDD and Pathfinder factory diagnostic tooling',
    engineFamily: '5.0 supercharged V8, 3.0 Ingenium inline-six mild-hybrid, and 4.4 twin-turbo V8 (P530)',
    engineCodes: ['AJ-V8 5.0 SC', 'Ingenium I6', 'P530 4.4 V8 TT'],
    oilSpec: 'JLR STJLR.03.5006 5W-30 or STJLR.51.5122 0W-20',
    oilIntervalKm: 16000,
    transmissionName: 'ZF 8HP70 and 8HP75 (JLR-calibrated) 8-speed automatic',
    transmissionFluid: 'ZF Lifeguard 8',
    brakeSystem: 'Brembo six-piston front on SVR and SV models, standard four-piston elsewhere',
    suspensionType: 'EAS four-corner air suspension with Terrain Response 2 and Dynamic Response',
    acRefrigerant: 'R-1234yf on L460, L461, and L462 platforms',
    climateNote: 'Range Rover air compressors, valve blocks, and supercharger snouts are the classic Dubai-heat failure trio we solve every week.',
    heritageLine: 'From Solihull originals to L460 flagships, we know every generation.',
  },
  'rolls-royce-service-dubai': {
    brandSlug: 'rolls-royce-service-dubai',
    brandName: 'Rolls-Royce',
    shortName: 'Rolls-Royce',
    models: ['Phantom VIII', 'Ghost', 'Ghost Extended', 'Cullinan', 'Cullinan Black Badge', 'Wraith', 'Dawn', 'Spectre'],
    diagnosticTool: 'Rolls-Royce diagnostic tool (BMW ISTA-derived) with Goodwood-level access',
    engineFamily: 'N74 6.6 and 6.75 twin-turbo V12, plus SGe-75 electric drive in Spectre',
    engineCodes: ['N74B66', 'N74B68', 'SGe-75'],
    oilSpec: 'BMW Longlife-01 (LL-01) 5W-30, Goodwood-approved',
    oilIntervalKm: 16000,
    transmissionName: 'ZF 8HP satellite-aided 8-speed automatic',
    transmissionFluid: 'ZF Lifeguard 8',
    brakeSystem: 'Silent-tuned four-piston calipers with acoustic-damped rotors',
    suspensionType: 'Self-levelling air suspension with Planar system and Flagbearer road-scanning camera',
    acRefrigerant: 'R-1234yf with four-zone climate and starlight-headliner ventilation',
    climateNote: 'Phantom and Cullinan air struts and N74 V12 valve stem seals are our two most-requested Dubai Rolls-Royce jobs.',
    heritageLine: 'Goodwood grace, workshop discretion, complete confidentiality.',
  },
  'aston-martin-service-dubai': {
    brandSlug: 'aston-martin-service-dubai',
    brandName: 'Aston Martin',
    shortName: 'Aston Martin',
    models: ['DB11', 'DB12', 'Vantage', 'Vantage F1 Edition', 'DBS Superleggera', 'DBX', 'DBX707'],
    diagnosticTool: 'Aston Martin AMDS diagnostic system',
    engineFamily: 'AMG-sourced M177 4.0 twin-turbo V8 and Aston 5.2 twin-turbo V12',
    engineCodes: ['M177 4.0 V8', '5.2 V12 twin-turbo'],
    oilSpec: 'Mobil 1 5W-40 (M177) or Aston-approved 0W-40 (5.2 V12)',
    oilIntervalKm: 16000,
    transmissionName: 'ZF 8HP transaxle 8-speed automatic',
    transmissionFluid: 'ZF Lifeguard 8',
    brakeSystem: 'Six-piston front and four-piston rear, with CCM carbon-ceramic on DBS and F1 Edition',
    suspensionType: 'Adaptive damping (Skyhook-derived) with GT, Sport, and Sport+ modes',
    acRefrigerant: 'R-1234yf on all current models',
    climateNote: 'The transaxle mounting and torque-tube on DB11 and DBS are heat-cycled wear points we inspect on every Dubai service.',
    heritageLine: 'Gaydon-grade care, quietly, on your schedule.',
  },
};

export const BRAND_SLUGS = Object.keys(BRAND_PROFILES);

export interface FAQ {
  question: string;
  answer: string;
}

export interface BrandServiceCombo {
  brandSlug: string;
  serviceSlug: ServiceKey;
  brandName: string;
  serviceName: string;
  serviceType: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  heroCopy: string;
  symptoms: string[];
  models: string[];
  processSteps: { title: string; description: string }[];
  partsCopy: string;
  faqs: FAQ[];
  whatsAppMessage: string;
}

const SERVICE_META: Record<ServiceKey, { name: string; serviceType: string; label: string }> = {
  'oil-change': { name: 'Oil Change', serviceType: 'Engine Oil & Filter Service', label: 'Oil Change' },
  'brake-repair': { name: 'Brake Repair', serviceType: 'Brake System Repair', label: 'Brake Repair' },
  'transmission-repair': { name: 'Transmission Repair', serviceType: 'Automatic & DCT Transmission Repair', label: 'Transmission Repair' },
  'ac-repair': { name: 'AC Repair', serviceType: 'Air Conditioning Repair', label: 'AC Repair' },
  'suspension-repair': { name: 'Suspension Repair', serviceType: 'Suspension & Air Ride Repair', label: 'Suspension Repair' },
  'engine-diagnostics': { name: 'Engine Diagnostics', serviceType: 'Engine & ECU Diagnostics', label: 'Engine Diagnostics' },
};

type Composed = Omit<BrandServiceCombo, 'brandSlug' | 'serviceSlug' | 'brandName' | 'serviceName' | 'serviceType' | 'whatsAppMessage'>;

function composeOilChange(p: BrandProfile): Composed {
  return {
    h1: `${p.brandName} Oil Change Dubai`,
    metaTitle: `${p.brandName} Oil Change Dubai | ${p.oilSpec} | Digi-Tec`,
    metaDescription: `Genuine ${p.oilSpec} oil change for ${p.brandName} in Dubai. Filter, drain plug, and ${p.diagnosticTool} service reset by Digi-Tec Performance Centre.`,
    heroCopy: `Oil is the single most consequential fluid in your ${p.brandName}, and in Dubai it works harder than almost anywhere in the world. Digi-Tec performs full ${p.brandName} oil services using ${p.oilSpec}, genuine ${p.shortName} filters, and a new drain plug crush washer every visit. We follow the ${p.oilIntervalKm.toLocaleString()} km factory interval as a maximum, but for cars driven in ${p.brandName} performance envelope during Dubai summer we recommend shorter intervals: the ambient heat, short trips, and stop-start traffic all accelerate oxidation of the base stock. On completion we perform the CBS or oil service reset through ${p.diagnosticTool}, top up the correct coolant, and hand back a full inspection report covering fluids, brakes, and tyres. ${p.heritageLine}`,
    symptoms: [
      `${p.brandName} service reminder counting down within 1,500 km or 30 days`,
      'Oil looking dark or gritty on the dipstick, or a burnt smell after a long drive',
      `Low oil pressure warning on cold start, common on ${p.engineCodes[0]} engines that have missed a service`,
      'Ticking valvetrain noise that quietens once the engine warms up',
      'Any oil top-up over one litre between services, worth a leak inspection at the same time',
    ],
    models: p.models.slice(0, 6),
    processSteps: [
      { title: 'Warm the engine and read the ECU', description: `We bring the engine to operating temperature, then plug in ${p.diagnosticTool} to read live oil temperature, quality sensor data, and any pending service codes before we touch a spanner.` },
      { title: 'Drain, replace filter, torque plug', description: `Full sump drain with a new crush washer, genuine ${p.shortName} cartridge or spin-on filter, and the drain plug torqued to factory spec, never overtightened.` },
      { title: `Refill with ${p.oilSpec}`, description: `We refill by weight where the ${p.engineFamily} platform demands it, then run the engine to circulate and re-check level cold and hot.` },
      { title: 'Service reset and inspection report', description: `CBS or maintenance-computer reset via ${p.diagnosticTool}, plus a written multi-point inspection covering brake pad life, tyre wear, and fluid condition.` },
    ],
    partsCopy: `We use genuine ${p.brandName} oil filters and ${p.oilSpec}. Where a customer prefers an approved premium equivalent (Motul, Liqui Moly, Mobil 1 in the correct spec) we fit only fluids that meet or exceed the ${p.brandName} approval. Nothing generic, nothing unbranded, and every part number is documented on your invoice.`,
    faqs: [
      { question: `How often should I change the oil on my ${p.brandName} in Dubai?`, answer: `${p.brandName} calls for oil service every ${p.oilIntervalKm.toLocaleString()} km or 12 months. In Dubai we recommend halving that for track-driven, tuned, or short-trip cars, because summer heat degrades the base oil faster than the sensor detects.` },
      { question: `Which oil grade does my ${p.brandName} need?`, answer: `Your ${p.brandName} requires ${p.oilSpec}. Fitting a non-approved oil, even one of the correct viscosity, can trip long-term wear protection.` },
      { question: `Do you reset the ${p.brandName} service computer?`, answer: `Yes. Every oil change ends with the CBS or oil-service counter reset through ${p.diagnosticTool}, so the dashboard reminder and dealer service history stay accurate.` },
      { question: 'How long does an oil change take?', answer: `A standard ${p.brandName} oil and filter service is completed the same day, typically 60 to 90 minutes including the diagnostic reset and inspection report.` },
      { question: 'Can you top up between services?', answer: `Yes, and we recommend it for ${p.brandName} owners who cover long weekly mileage. Bring the car in for a five-minute level check and top-up with the correct ${p.oilSpec} at no charge to service customers.` },
    ],
  };
}

function composeBrakeRepair(p: BrandProfile): Composed {
  const isCarbon = /ceramic|CCB|CCM|PCCB|CSiC/i.test(p.brakeSystem);
  return {
    h1: `${p.brandName} Brake Repair Dubai`,
    metaTitle: `${p.brandName} Brake Repair Dubai | ${isCarbon ? 'Carbon Ceramic Specialists' : 'Pads, Discs & Fluid'} | Digi-Tec`,
    metaDescription: `${p.brandName} brake pads, rotors, fluid, and calipers in Dubai. ${p.brakeSystem}. Genuine parts and ${p.diagnosticTool} coding by Digi-Tec.`,
    heroCopy: `${p.brandName} brakes are engineered to shed enormous energy repeatedly without fade, and the ${p.brakeSystem.toLowerCase()} on your car is at the heart of that promise. In Dubai the brake system takes a punishing combination of stop-start traffic, high-speed autoroute cruising, and 45C-plus ambient temperatures that boil brake fluid faster than most owners expect. Digi-Tec is set up specifically for ${p.brandName} brake work: measurement, refurbishment, and full replacement using genuine ${p.shortName} pads and rotors, ${isCarbon ? 'with correct handling procedures for the carbon-ceramic rotors that must never see contaminated pads or a botched bedding-in sequence' : 'or high-quality OE-supplier friction where the customer specifies it'}. Every job ends with a fluid boil-point test, correct bedding-in sequence, and a ${p.diagnosticTool} reset of pad-wear sensors. ${p.heritageLine}`,
    symptoms: [
      'Brake pad wear warning on the instrument cluster or head-up display',
      'Squeal, grinding, or metallic scrape on light braking',
      'Steering-wheel or pedal vibration under braking from motorway speed',
      'Brake fluid warning or spongy pedal feel after a long descent',
      `Uneven pad wear front-to-rear, common on ${p.brandName} platforms with a stuck EPB caliper`,
      isCarbon ? 'Carbon-ceramic rotor edge cracks, glazing, or squeal that only ceramic-compound pads resolve' : 'Rotor lip more than 1.5 mm, a sign the discs are past service life, not just the pads',
    ],
    models: p.models.slice(0, 6),
    processSteps: [
      { title: 'Measurement and diagnostic scan', description: `We plug in ${p.diagnosticTool}, read live pad-wear sensor voltages, measure rotor thickness with a micrometer, and inspect caliper piston movement front and rear.` },
      { title: 'Genuine parts, correct compound', description: `${p.brandName} pads and rotors are matched precisely to ${p.brakeSystem}. ${isCarbon ? 'We only fit ceramic-compound pads on CCB, CCM, or PCCB rotors, never sintered or track-only pads that will destroy the surface layer.' : 'We fit genuine or approved OE-supplier friction with the correct dust and NVH characteristics for your platform.'}` },
      { title: 'Fluid change and boil-point test', description: 'Full brake fluid replacement (DOT 4 LV or DOT 5.1 as your platform demands) with a refractometer boil-point test before and after, critical in Dubai summer.' },
      { title: 'Bedding-in and EPB coding', description: `Correct bedding-in sequence on empty road, EPB retract-and-reset through ${p.diagnosticTool}, and a road-test to confirm pedal feel before the car leaves the workshop.` },
    ],
    partsCopy: `Genuine ${p.brandName} pads, rotors, and sensors are our default. ${isCarbon ? `Because your car uses carbon-ceramic rotors, we never substitute pad compound: a single wrong pad set can destroy a rotor that costs a five-figure sum to replace.` : `Where a customer prefers uprated track pads (Pagid RSL, Endless MX72, Ferodo DS2500) we fit them with clear documentation and the correct bedding sequence.`} Fluid is always fresh, sealed, and to ${p.brandName} spec.`,
    faqs: [
      { question: `How long do ${p.brandName} brake pads last in Dubai?`, answer: `Realistically 25,000 to 45,000 km for front pads on daily-driven ${p.brandName} models, less on ${isCarbon ? 'GT and Turbo variants with track use' : 'M, RS, or AMG performance variants'}. Dubai traffic and high ambient temperatures are the main variables.` },
      { question: `Do you fit genuine ${p.brandName} pads and rotors?`, answer: `Yes. Genuine ${p.brandName} parts are our default. Approved OE-supplier equivalents (Brembo, TRW, Textar) are available on request and always documented on the invoice.` },
      { question: isCarbon ? `Can you service the carbon-ceramic brake system?` : 'Do you machine or skim brake rotors?', answer: isCarbon ? `Yes. We measure carbon-ceramic rotor thickness, inspect the surface layer, and only fit approved ceramic-compound pads. On borderline rotors we recommend replacement rather than risk failure.` : `Not on ${p.brandName}. Skimming shortens rotor life and never restores original torque capacity. We replace rotors in pairs when they are past minimum thickness.` },
      { question: 'How often should brake fluid be changed?', answer: `Every 24 months at maximum, and every 12 months for track-driven ${p.brandName}s in Dubai. We use a refractometer to check boil point on every visit: old fluid loses fade resistance long before it looks dirty.` },
      { question: 'How long does a full brake job take?', answer: 'Pads and fluid same day. Pads plus rotors typically one working day. Caliper refurbishment or carbon-ceramic replacement is quoted with a clear timeline.' },
      { question: `Can you fix a stuck ${p.brandName} EPB or handbrake fault?`, answer: `Yes. Electronic parking brake retract, calibration, and motor replacement are all handled through ${p.diagnosticTool}, so the system returns to factory operation without dashboard warnings.` },
    ],
  };
}

function composeTransmission(p: BrandProfile): Composed {
  return {
    h1: `${p.brandName} Transmission Repair Dubai`,
    metaTitle: `${p.brandName} Transmission Repair Dubai | ${p.transmissionName} | Digi-Tec`,
    metaDescription: `${p.brandName} transmission service and repair in Dubai. ${p.transmissionName} fluid, mechatronic, and clutch-pack work by Digi-Tec Performance Centre.`,
    heroCopy: `The ${p.transmissionName} in your ${p.brandName} is a precision assembly with tight fluid, temperature, and adaptation tolerances. Modern automatic and DCT gearboxes are marketed as sealed for life, but life in Dubai is not the same as life in Stuttgart or Woking: 45C-plus ambient temperatures, stop-start traffic, and enthusiastic driving all shorten fluid life significantly. Digi-Tec offers full ${p.brandName} transmission service using ${p.transmissionFluid}, correct temperature-based fill procedure, and full adaptation reset through ${p.diagnosticTool}. For symptomatic gearboxes we diagnose mechatronic units, solenoid packs, clutch-pack wear, and torque-converter lock-up condition, and we tell you honestly whether a fluid service is enough or whether a rebuild is the correct answer. ${p.heritageLine}`,
    symptoms: [
      `Hard 1-2 or 2-3 shift on the ${p.transmissionName.split(' ')[0]}, particularly cold`,
      'Flare or slip on part-throttle upshift, or delayed engagement into D or R',
      'Judder on light-throttle cruise between 40 and 80 km/h (classic torque-converter lock-up wear)',
      'Transmission fluid stain on the underside of the car or on the driveway',
      `Gearbox warning light or ${p.brandName}-specific "Transmission Malfunction, Consult Workshop" message`,
      'Loss of gears (limp home to third) after hard driving in summer heat',
    ],
    models: p.models.slice(0, 6),
    processSteps: [
      { title: 'Fault-code scan and live-data capture', description: `${p.diagnosticTool} reads TCU codes, live line pressure, solenoid duty cycles, and adaptation values before we make any decision.` },
      { title: 'Temperature-based fluid service', description: `Full ${p.transmissionFluid} exchange with the gearbox at correct operating temperature (typically 35 to 45C for fill check), the only way to reach the factory fluid level.` },
      { title: 'Filter, pan, and magnet inspection', description: 'New OE filter, new pan gasket where fitted, and inspection of the sump magnets for debris, a critical early-warning check for clutch or planetary wear.' },
      { title: 'Adaptation reset and road test', description: `Clear adaptation values via ${p.diagnosticTool}, then a structured relearn drive through the full shift map to lock in smooth, factory-correct shift quality.` },
    ],
    partsCopy: `We only fit ${p.transmissionFluid}: this is not a place for generic ATF. Filters, gaskets, and pan bolts are genuine ${p.brandName} or approved OE-supplier. Mechatronic units and torque converters, when needed, are supplied factory-remanufactured.`,
    faqs: [
      { question: `How often should ${p.transmissionName} fluid be changed in Dubai?`, answer: `We recommend every 60,000 to 80,000 km, or every 4 years, whichever comes first. ${p.brandName} lists the box as sealed for life, but Dubai heat means fluid oxidises well before that mileage.` },
      { question: `Do you use ${p.transmissionFluid}?`, answer: 'Yes, always. Fitting the wrong ATF or DCT fluid, even one of the correct viscosity, will cause harsh shifting, solenoid faults, and long-term clutch pack wear.' },
      { question: `Can you rebuild a ${p.brandName} gearbox?`, answer: `Yes. From clutch-pack replacement to mechatronic unit remanufacture and full rebuild, we handle the ${p.transmissionName} end to end in-house.` },
      { question: 'Will the car need a relearn drive after service?', answer: `Yes. After adaptation reset via ${p.diagnosticTool}, we complete a structured drive cycle so the TCU relearns your driving style. Owners can expect crisp, factory-correct shifts within 100 km of returning the car.` },
      { question: 'How long does a transmission service take?', answer: 'A standard fluid and filter service is completed in one working day. Mechatronic or clutch-pack work is quoted individually with a clear timeline before we begin.' },
      { question: `Is a transmission fluid change safe on a high-mileage ${p.brandName}?`, answer: 'Yes, provided the box is not already slipping. We inspect the pan magnets and fluid condition first, and if we see heavy clutch material we recommend a full rebuild rather than a fluid change that could unmask the underlying wear.' },
    ],
  };
}

function composeAcRepair(p: BrandProfile): Composed {
  return {
    h1: `${p.brandName} AC Repair Dubai`,
    metaTitle: `${p.brandName} AC Repair Dubai | ${p.acRefrigerant} Specialists | Digi-Tec`,
    metaDescription: `${p.brandName} air conditioning repair, ${p.acRefrigerant} regas, compressor, and evaporator service in Dubai by Digi-Tec Performance Centre.`,
    heroCopy: `In Dubai, air conditioning is not a comfort feature on your ${p.brandName}: it is a survival system. Cabin temperatures inside a parked car exceed 70C in July, and every AC component from compressor to evaporator to blower motor lives at the edge of its design envelope. Digi-Tec is fully equipped for ${p.brandName} climate work, including ${p.acRefrigerant} recovery and recharge, leak detection with UV dye and electronic sniffer, compressor replacement, evaporator core work, and ${p.diagnosticTool} calibration of the climate control head unit. We also address the specific ${p.brandName} weak points: condenser fouling from Dubai dust, expansion valve icing, and blower resistor failure that leaves one zone stuck on hot. ${p.heritageLine}`,
    symptoms: [
      'AC blowing warm at idle, cold only at motorway speed',
      'Weak airflow from vents on maximum fan setting, or noisy blower motor',
      'Vinegar or damp smell on first startup, classic evaporator microbial growth',
      `${p.brandName} AC warning light or "Refrigerant Low, Have Serviced" message on the cluster`,
      'Clutch cycling on and off rapidly, or a knock from the compressor at engine start',
      'Water dripping into passenger footwell, blocked evaporator drain',
    ],
    models: p.models.slice(0, 6),
    processSteps: [
      { title: 'Performance test and pressure reading', description: `We hook up ${p.brandName}-approved gauges, measure high and low side pressures at idle and at 2,000 rpm, and log vent temperature so we know exactly what is failing.` },
      { title: `${p.acRefrigerant} recovery and vacuum`, description: 'Full refrigerant recovery to environmental spec, deep vacuum to eliminate moisture, and a leak-down test before any recharge, never a "top up and hope" job.' },
      { title: 'Repair the actual fault', description: `Compressor, condenser, expansion valve, evaporator, receiver-drier, blower motor, or blend-door actuator, whichever component the diagnosis points to, replaced with genuine ${p.brandName} parts.` },
      { title: 'Recharge, PAG oil, and climate calibration', description: `Exact ${p.acRefrigerant} charge by weight, correct PAG oil quantity, then a climate-control calibration via ${p.diagnosticTool} to reset any stored temperature adaptations.` },
    ],
    partsCopy: `Compressors, condensers, expansion valves, and evaporator cores are all sourced as genuine ${p.brandName} parts or as OE-supplier equivalents (Denso, Behr, Sanden, Valeo) that meet factory specification. We never substitute refrigerant type: a ${p.brandName} designed for ${p.acRefrigerant} receives ${p.acRefrigerant}, full stop.`,
    faqs: [
      { question: `How much does ${p.brandName} AC regas cost in Dubai?`, answer: `A standard ${p.acRefrigerant} regas with UV dye leak check is priced transparently on quote. If the system is losing charge, a regas alone is not the answer: we quote the underlying repair rather than sell a temporary fix.` },
      { question: `Which refrigerant does my ${p.brandName} use?`, answer: `${p.brandName} uses ${p.acRefrigerant} on the platforms we service most in Dubai. The correct refrigerant is stamped on the underhood label: we always cross-check before charging.` },
      { question: 'Why does AC blow warm at idle but cold on the motorway?', answer: 'Almost always a fouled condenser or a weak cooling fan. Dubai dust and sand build up on condenser fins, and at idle there is not enough airflow to reject heat. Cleaning or replacement solves it.' },
      { question: 'How often should the AC system be serviced?', answer: 'An annual performance test and cabin filter change is the single most valuable preventive step in Dubai. Full regas is only needed if pressures or vent temperature indicate a real fault.' },
      { question: `Do you repair ${p.brandName} rear-cabin climate zones?`, answer: `Yes. Rear evaporators, expansion valves, blower motors, and blend doors on ${p.models[0]}, ${p.models[1] ?? p.models[0]} and similar are handled routinely.` },
      { question: 'How long does an AC repair take?', answer: 'Regas and leak test same day. Condenser or expansion valve typically one day. Full evaporator core replacement is a two to three day job because the dashboard must come out, quoted upfront.' },
    ],
  };
}

function composeSuspension(p: BrandProfile): Composed {
  const isAir = /air suspension|airmatic|air ride|EAS|Planar|self-levelling|ABC|E-ACTIVE/i.test(p.suspensionType);
  return {
    h1: `${p.brandName} Suspension Repair Dubai`,
    metaTitle: `${p.brandName} Suspension Repair Dubai | ${isAir ? 'Air Suspension Specialists' : 'Adaptive Damping'} | Digi-Tec`,
    metaDescription: `${p.brandName} suspension repair in Dubai. ${p.suspensionType}. Struts, air springs, compressor, valve blocks, and ride-height calibration by Digi-Tec.`,
    heroCopy: `Your ${p.brandName} rides on ${p.suspensionType.toLowerCase()}, and in Dubai that system does hard work: expansion joints on Sheikh Zayed Road, kerb strikes on parking ramps, and constant 40C-plus heat cycling on the rubber and hydraulic components. Digi-Tec has invested specifically in ${isAir ? 'air suspension' : 'adaptive damping'} tooling and diagnostic access for ${p.brandName}, so we can not only replace failed struts and ${isAir ? 'compressors and valve blocks' : 'dampers'} but properly recalibrate ride height, adaptive damping, and drive-mode behaviour through ${p.diagnosticTool}. ${p.climateNote} ${p.heritageLine}`,
    symptoms: [
      isAir ? `${p.brandName} car sitting low on one corner overnight, leaking air strut or valve block seal` : 'Knocking or clunking over expansion joints from front or rear suspension',
      isAir ? 'Compressor running continuously or throwing a "Suspension Malfunction" warning' : 'Wandering steering feel or uneven tyre wear across the tread',
      'Ride feels harsh in Comfort and no different in Sport, adaptive damper failure',
      `Ride-height warning on the ${p.brandName} cluster, or refusal to raise or lower on request`,
      'Grease or oil weeping from strut body, worn shaft seal, replace before it fails completely',
      'Nose dive under braking and squat under acceleration heavier than you remember from new',
    ],
    models: p.models.slice(0, 6),
    processSteps: [
      { title: 'Full suspension audit', description: `Corner-weight check, ride-height measurement at all four corners, ${p.diagnosticTool} scan of the suspension module for fault codes and adaptation values.` },
      { title: 'Component-level diagnosis', description: `We identify exactly what has failed: ${isAir ? 'air strut bag, damper cartridge inside the strut, compressor, dryer, valve block, or ride-height sensor' : 'damper unit, top mount, bushing, or adaptive-damper valve'}, and quote only the parts that need replacing.` },
      { title: 'Genuine part replacement', description: `Struts, air springs, ${isAir ? 'compressors, and valve blocks are supplied genuine or Arnott-grade OE-supplier for known-good longevity' : 'and adaptive damper units are genuine ' + p.shortName + ' parts, correctly coded to the vehicle after fitment'}.` },
      { title: 'Ride-height calibration and road test', description: `${isAir ? 'Ride-height reset and level calibration via ' + p.diagnosticTool + ', then a full road test through all drive modes' : 'Adaptive damper adaptation clear via ' + p.diagnosticTool + ', followed by a road test through Comfort, Sport, and Sport+'}: the car leaves handling like it did new.` },
    ],
    partsCopy: `${isAir ? `Air struts, compressors, and valve blocks for ${p.brandName} are supplied as genuine parts or as Arnott, Bilstein, or Wabco OE-supplier equivalents. Rubber and seal quality on Dubai-driven cars is critical: we never fit cheap unbranded air components.` : `Adaptive damper units, top mounts, control arms, and bushings are genuine ${p.brandName} or approved OE-supplier. Where the customer requests an upgrade path (e.g. Bilstein B6, KW Variant 3), we fit only with documented ride-height and geometry setup.`}`,
    faqs: [
      { question: isAir ? `How long do ${p.brandName} air struts last in Dubai?` : `How often should ${p.brandName} shocks be replaced?`, answer: isAir ? 'Typically 80,000 to 120,000 km for the air bag portion, though Dubai heat can shorten that. Compressors often outlast the struts if they are not left to run continuously against a leaking system.' : `${p.brandName} adaptive dampers are usually good for 90,000 to 130,000 km. Aggressive road use in Dubai (expansion joints, kerbs) reduces that. We measure damping performance before recommending replacement.` },
      { question: `Do you handle full ${p.suspensionType.split(' with')[0]} systems?`, answer: `Yes. This is one of our core specialisations for ${p.brandName}. Compressor, valve block, ride-height sensors, and full calibration are all handled in-house.` },
      { question: 'Can you convert air suspension to coilover?', answer: isAir ? `We can, but for a daily-driven ${p.brandName} we usually recommend against it: you lose ride quality, adaptive modes, and often trip warning lights. We are happy to discuss the trade-offs honestly.` : `Not applicable to your platform: ${p.brandName} uses adaptive damping rather than air suspension.` },
      { question: 'Will the car need wheel alignment after suspension work?', answer: `Yes. Any suspension work that disturbs geometry requires a four-wheel laser alignment before the car leaves. It is included in every ${p.brandName} suspension quote we provide.` },
      { question: 'How long does a strut or air-spring replacement take?', answer: 'One to two working days for a single-corner air strut replacement including calibration. Full four-corner suspension is quoted individually.' },
      { question: 'Do you offer collection and delivery for lowered cars?', answer: `Yes. We use a low-loader with covered transport for any ${p.brandName} that will not safely load on a standard flatbed. Discreet, on your schedule, anywhere in the UAE.` },
    ],
  };
}

function composeDiagnostics(p: BrandProfile): Composed {
  return {
    h1: `${p.brandName} Engine Diagnostics Dubai`,
    metaTitle: `${p.brandName} Engine Diagnostics Dubai | ${p.diagnosticTool.split(' ')[0]} | Digi-Tec`,
    metaDescription: `${p.brandName} engine diagnostics in Dubai using ${p.diagnosticTool}. Live-data logging, coding, and ECU programming for ${p.engineFamily}.`,
    heroCopy: `A generic OBD-II code reader tells you a light is on. ${p.diagnosticTool} tells you why. Digi-Tec runs the same factory diagnostic platform your ${p.brandName} dealer uses, which means we read every module, not just the engine, capture live data at operating temperature, and identify the actual failed component before quoting a repair. This is particularly important on the ${p.engineFamily} platforms fitted to ${p.models.slice(0,3).join(', ')} and similar, where superficially identical fault codes can be caused by very different underlying issues. We are also equipped for full ECU programming, module coding after replacement, and feature retrofits where the hardware supports them. ${p.heritageLine}`,
    symptoms: [
      'Check engine light, EML, or amber engine warning on the cluster',
      `${p.brandName}-specific message such as "Reduced Engine Power" or "Consult Workshop"`,
      'Rough idle, misfire, or noticeable hesitation under throttle',
      'Failed emissions test or Nol technical test refusal',
      `Cluster or infotainment communication fault after a battery disconnect on the ${p.engineCodes[0]}`,
      'Loss of turbo boost, limp-home mode, or unusual exhaust smoke colour',
    ],
    models: p.models.slice(0, 6),
    processSteps: [
      { title: 'Full-vehicle scan across every module', description: `${p.diagnosticTool} reads every ECU on the car (engine, transmission, ABS, gateway, comfort, infotainment) and captures freeze-frame data with every code so we know the conditions when the fault triggered.` },
      { title: 'Live-data logging under load', description: 'Where the code points to a sensor or actuator, we log live values (fuel trims, MAF, MAP, boost, lambda, cam timing, misfire counters) at idle and under road load, so we replace only what has actually failed.' },
      { title: 'Component test and confirmation', description: `Actuator tests, individual coil or injector cut-out tests, and physical inspection where a code alone is ambiguous. A ${p.brandName} misfire code, for example, can be coil, plug, injector, compression, or wiring: we prove which before quoting.` },
      { title: 'Repair, code, and clear', description: `After repair, we code any new module to the vehicle, run adaptation resets, clear codes, and complete a road-test drive cycle so the readiness monitors return to "ready" for compliance testing.` },
    ],
    partsCopy: `We use genuine ${p.brandName} sensors, injectors, coils, and modules by default. ECU, TCU, or gateway replacements are coded to the vehicle with ${p.diagnosticTool}, including SFA or FA update where the ${p.brandName} platform requires it. No "cleared codes" without a fix: every diagnostic ends with a plain-English report explaining what we found and what we did.`,
    faqs: [
      { question: `How much does a full ${p.brandName} diagnostic cost?`, answer: `A full ${p.diagnosticTool.split(' ')[0]} scan with report is a fixed fee, credited in full toward any repair we carry out. This is very different from a free code-read at a parts shop: we give you the actual root cause, not a guess.` },
      { question: `Can you clear the ${p.brandName} check engine light without a proper fix?`, answer: `We can, but we will not. Clearing a code without addressing the fault means it will return, and on modern ${p.brandName} platforms it can also trigger cascade faults across the CAN network. We recommend the repair honestly, then clear.` },
      { question: 'Can you code a new ECU or module?', answer: `Yes. Module coding, programming, and ${p.diagnosticTool.includes('E-Sys') ? 'FA edits or retrofit coding' : 'variant coding after replacement'} are handled in-house. This is often the missing step other workshops skip that leaves a repaired car with warning lights still on.` },
      { question: 'Will you tell me what needs fixing before charging me?', answer: 'Yes. We complete the diagnostic, quote the repair, and you approve before any work starts. No open-ended bills, no surprises.' },
      { question: 'How long does a full diagnostic take?', answer: 'Typically one to two hours for a straightforward complaint. Complex CAN or communication faults occasionally need a day of logging under different conditions: we tell you upfront which category your issue falls into.' },
      { question: `Do you keep records of ${p.brandName} diagnostic sessions?`, answer: 'Yes. Every scan report is saved against your VIN so return visits and future owners have a complete diagnostic history, valuable for resale.' },
    ],
  };
}

const COMPOSERS: Record<ServiceKey, (p: BrandProfile) => Composed> = {
  'oil-change': composeOilChange,
  'brake-repair': composeBrakeRepair,
  'transmission-repair': composeTransmission,
  'ac-repair': composeAcRepair,
  'suspension-repair': composeSuspension,
  'engine-diagnostics': composeDiagnostics,
};

export function getBrandServiceCombo(brandSlug: string, serviceSlug: string): BrandServiceCombo | undefined {
  const profile = BRAND_PROFILES[brandSlug];
  if (!profile) return undefined;
  if (!(SERVICE_KEYS as string[]).includes(serviceSlug)) return undefined;
  const key = serviceSlug as ServiceKey;
  const meta = SERVICE_META[key];
  const composed = COMPOSERS[key](profile);
  const whatsAppMessage = `Hi, I would like to enquire about ${profile.brandName} ${meta.label} at Digi-Tec Performance Centre.`;
  return {
    brandSlug,
    serviceSlug: key,
    brandName: profile.brandName,
    serviceName: meta.name,
    serviceType: meta.serviceType,
    whatsAppMessage,
    ...composed,
  };
}

export function getAllBrandServiceCombos(): { brandSlug: string; serviceSlug: ServiceKey }[] {
  const combos: { brandSlug: string; serviceSlug: ServiceKey }[] = [];
  for (const brandSlug of BRAND_SLUGS) {
    for (const serviceSlug of SERVICE_KEYS) {
      combos.push({ brandSlug, serviceSlug });
    }
  }
  return combos;
}

export function getServicesForBrand(brandSlug: string): { serviceSlug: ServiceKey; label: string }[] {
  if (!BRAND_PROFILES[brandSlug]) return [];
  return SERVICE_KEYS.map((s) => ({ serviceSlug: s, label: SERVICE_META[s].label }));
}

export function getServiceLabel(serviceSlug: ServiceKey): string {
  return SERVICE_META[serviceSlug].label;
}
