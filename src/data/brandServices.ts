/**
 * Brand × Service SEO landing pages.
 *
 * Every brand has six core service pages; selected brands with confirmed workshop
 * coverage also expose extended repair pages at
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
  | 'engine-diagnostics'
  | 'mechanical-repair'
  | 'steering-repair'
  | 'battery-replacement'
  | 'electrical-repair'
  | 'exhaust-repair'
  | 'fuel-system-repair'
  | 'body-repair'
  | 'tire-repair'
  | 'soft-close-door-installation';

type ExtendedServiceKey =
  | 'mechanical-repair'
  | 'steering-repair'
  | 'battery-replacement'
  | 'electrical-repair'
  | 'exhaust-repair'
  | 'fuel-system-repair'
  | 'body-repair'
  | 'tire-repair'
  | 'soft-close-door-installation';

export const SERVICE_KEYS: ServiceKey[] = [
  'oil-change',
  'brake-repair',
  'transmission-repair',
  'ac-repair',
  'suspension-repair',
  'engine-diagnostics',
];

const EXTENDED_SERVICE_KEYS: ExtendedServiceKey[] = [
  'mechanical-repair',
  'steering-repair',
  'battery-replacement',
  'electrical-repair',
  'exhaust-repair',
  'fuel-system-repair',
  'body-repair',
  'tire-repair',
];

const ALL_SERVICE_KEYS: ServiceKey[] = [...SERVICE_KEYS, ...EXTENDED_SERVICE_KEYS];

const EXTENDED_SERVICE_BRANDS = new Set([
  'mercedes-benz-service-dubai',
  'maybach-service-dubai',
  'porsche-service-dubai',
  'bmw-service-dubai',
  'lamborghini-service-dubai',
  'mclaren-service-dubai',
  'aston-martin-service-dubai',
  'ferrari-service-dubai',
  'land-rover-service-dubai',
  'audi-service-dubai',
  'bentley-service-dubai',
  'rolls-royce-service-dubai',
  'bugatti-service-dubai',
  'jeep-service-dubai',
  'nissan-service-dubai',
  'maserati-service-dubai',
  'toyota-service-dubai',
  'pagani-service-dubai',
  'volkswagen-service-dubai',
  'volvo-service-dubai',
  'jetour-service-dubai',
  'cadillac-service-dubai',
  'byd-service-dubai',
  'rox-service-dubai',
  'range-rover-service-dubai',
  'defender-service-dubai',
]);

// Electric-only platforms should not expose combustion-engine service URLs.
const BRAND_SERVICE_OVERRIDES: Partial<Record<string, ServiceKey[]>> = {
  'tesla-service-dubai': [
    'brake-repair',
    'ac-repair',
    'suspension-repair',
    'mechanical-repair',
    'steering-repair',
    'battery-replacement',
    'electrical-repair',
    'body-repair',
    'tire-repair',
  ],
  'rox-service-dubai': [...ALL_SERVICE_KEYS, 'soft-close-door-installation'],
};

const getAvailableServiceKeys = (brandSlug: string): ServiceKey[] =>
  BRAND_SERVICE_OVERRIDES[brandSlug]
  ?? (EXTENDED_SERVICE_BRANDS.has(brandSlug) ? ALL_SERVICE_KEYS : SERVICE_KEYS);

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

BRAND_PROFILES['range-rover-service-dubai'] = {
  ...BRAND_PROFILES['land-rover-service-dubai'],
  brandSlug: 'range-rover-service-dubai',
  brandName: 'Range Rover',
  shortName: 'Range Rover',
  models: ['Range Rover', 'Range Rover Sport', 'Range Rover Velar', 'Range Rover Evoque'],
  heritageLine: 'Range Rover expertise, transparent reporting, and Dubai-ready workshop care.',
};

BRAND_PROFILES['defender-service-dubai'] = {
  ...BRAND_PROFILES['land-rover-service-dubai'],
  brandSlug: 'defender-service-dubai',
  brandName: 'Defender',
  shortName: 'Defender',
  models: ['Defender 90', 'Defender 110', 'Defender 130', 'Defender V8', 'Defender OCTA'],
  heritageLine: 'Defender diagnostics, driveline care, and Dubai-ready workshop support.',
};

const createAdditionalServiceProfile = (
  brandSlug: string,
  brandName: string,
  models: string[],
  diagnosticTool: string,
  engineFamily: string,
  transmissionName: string,
  details: Partial<BrandProfile> = {},
): BrandProfile => ({
  brandSlug,
  brandName,
  shortName: brandName,
  models,
  diagnosticTool,
  engineFamily,
  engineCodes: [engineFamily.split(/,| and /)[0]],
  oilSpec: 'manufacturer-approved engine oil matched to the vehicle specification',
  oilIntervalKm: 10000,
  transmissionName,
  transmissionFluid: 'manufacturer-approved transmission fluid matched to the vehicle specification',
  brakeSystem: 'factory braking system with electronic brake control and ABS/ESC diagnostics',
  suspensionType: 'factory suspension system with steering-angle and ride-height checks where fitted',
  acRefrigerant: 'R-134a or R-1234yf, confirmed by vehicle specification',
  climateNote: `${brandName} cooling, air-conditioning, battery, brake, and suspension systems are inspected with Dubai heat, stop-start traffic, and dust exposure in mind.`,
  heritageLine: `Digi-Tec applies a documented, diagnostic-first process to every ${brandName} service in Dubai.`,
  ...details,
});

Object.assign(BRAND_PROFILES, {
  'jeep-service-dubai': createAdditionalServiceProfile('jeep-service-dubai', 'Jeep', ['Wrangler', 'Grand Cherokee', 'Gladiator', 'Compass', 'Cherokee'], 'WiTECH-compatible diagnostic access and advanced live-data testing', 'Pentastar V6, Hurricane turbo, and plug-in hybrid platforms', '8-speed automatic and four-wheel-drive drivetrain systems'),
  'nissan-service-dubai': createAdditionalServiceProfile('nissan-service-dubai', 'Nissan', ['Patrol', 'Pathfinder', 'X-Trail', 'Altima', 'Maxima', 'Z', 'GT-R'], 'CONSULT-III-compatible diagnostic access and advanced live-data testing', 'VQ V6, VK56 V8, VR38DETT, and e-POWER platforms', 'automatic, CVT, dual-clutch, and four-wheel-drive drivetrain systems'),
  'maserati-service-dubai': createAdditionalServiceProfile('maserati-service-dubai', 'Maserati', ['Ghibli', 'Quattroporte', 'Levante', 'Grecale', 'GranTurismo', 'MC20'], 'Maserati-compatible diagnostic access and advanced live-data testing', 'V6 twin-turbo, V8, and Nettuno V6 platforms', 'ZF 8-speed automatic and dual-clutch transmission systems'),
  'toyota-service-dubai': createAdditionalServiceProfile('toyota-service-dubai', 'Toyota', ['Land Cruiser', 'Land Cruiser Prado', 'Camry', 'Hilux', 'Fortuner', 'Corolla', 'GR Supra'], 'Toyota Techstream-compatible diagnostic access and advanced live-data testing', 'petrol, diesel, hybrid, and GR performance platforms', 'automatic, manual, hybrid, and four-wheel-drive drivetrain systems'),
  'pagani-service-dubai': createAdditionalServiceProfile('pagani-service-dubai', 'Pagani', ['Huayra', 'Zonda', 'Utopia'], 'advanced multi-brand diagnostics with specialist fault tracing and workshop procedures', 'Mercedes-AMG V12 twin-turbo platforms', 'automated manual and bespoke drivetrain systems'),
  'volkswagen-service-dubai': createAdditionalServiceProfile('volkswagen-service-dubai', 'Volkswagen', ['Golf', 'Golf GTI', 'Golf R', 'Tiguan', 'Touareg', 'Passat', 'T-Roc'], 'ODIS-compatible diagnostic access and advanced live-data testing', 'TSI petrol, TDI diesel, GTI, R, and plug-in hybrid platforms', 'DSG dual-clutch, automatic, and 4MOTION drivetrain systems'),
  'volvo-service-dubai': createAdditionalServiceProfile('volvo-service-dubai', 'Volvo', ['XC40', 'XC60', 'XC90', 'S60', 'S90', 'V60', 'EX30'], 'VIDA-compatible diagnostic access and advanced live-data testing', 'turbocharged petrol, mild-hybrid, plug-in hybrid, and electric platforms', 'automatic, hybrid, and all-wheel-drive drivetrain systems'),
  'jetour-service-dubai': createAdditionalServiceProfile('jetour-service-dubai', 'Jetour', ['T2', 'X70', 'X90 Plus', 'Dashing', 'X50'], 'factory-compatible diagnostic access and advanced live-data testing', 'turbocharged petrol and hybrid platforms', 'dual-clutch, automatic, and all-wheel-drive drivetrain systems'),
  'cadillac-service-dubai': createAdditionalServiceProfile('cadillac-service-dubai', 'Cadillac', ['Escalade', 'CT4', 'CT5', 'XT4', 'XT5', 'XT6', 'Lyriq'], 'GM GDS2-compatible diagnostic access and advanced live-data testing', 'turbocharged petrol, V8, Super Cruise, and electric platforms', 'automatic, all-wheel-drive, and performance drivetrain systems'),
  'abarth-service-dubai': createAdditionalServiceProfile('abarth-service-dubai', 'Abarth', ['595', '695', '124 Spider', '500e'], 'Fiat and Abarth-compatible diagnostics with live-data and actuator testing', 'T-Jet, MultiAir, and electric performance platforms', 'C510 manual, MTA automated manual, and electric drive systems', {
    engineCodes: ['1.4 T-Jet', 'MultiAir', 'electric drive'],
    brakeSystem: 'performance brake packages including Brembo-equipped 595 and 695 variants',
    suspensionType: 'Koni FSD and performance damper systems used across 595, 695, and 124 Spider models',
  }),
  'alfa-romeo-service-dubai': createAdditionalServiceProfile('alfa-romeo-service-dubai', 'Alfa Romeo', ['Giulia', 'Stelvio', 'Tonale', 'Giulietta', '4C'], 'Alfa Romeo-compatible diagnostics with module coding and live-data testing', 'GME turbo-four, 2.9 V6 biturbo, MultiAir, and hybrid platforms', 'ZF 8-speed automatic, TCT dual-clutch, and manual transmissions', {
    engineCodes: ['GME 2.0T', '690T 2.9 V6', 'MultiAir'],
    brakeSystem: 'electro-hydraulic and Brembo performance braking systems, including Quadrifoglio applications',
    suspensionType: 'Alfa Active Suspension and double-wishbone front suspension systems',
  }),
  'chevrolet-service-dubai': createAdditionalServiceProfile('chevrolet-service-dubai', 'Chevrolet', ['Tahoe', 'Suburban', 'Silverado', 'Camaro', 'Traverse', 'Captiva'], 'GM GDS2-compatible diagnostics with module programming and live-data testing', 'EcoTec petrol, small-block V8, turbocharged, and Duramax diesel platforms', 'GM 6-speed, 8-speed, and 10-speed automatic transmissions', {
    engineCodes: ['EcoTec', 'LT V8', 'Duramax'],
    brakeSystem: 'GM ABS and electronic brake-control systems with performance Brembo packages where fitted',
    suspensionType: 'conventional, Magnetic Ride Control, and air ride systems depending on model',
  }),
  'chrysler-service-dubai': createAdditionalServiceProfile('chrysler-service-dubai', 'Chrysler', ['300', 'Pacifica', 'Voyager', '200'], 'WiTECH-compatible diagnostics with module configuration and live-data testing', 'Pentastar V6, HEMI V8, and plug-in hybrid platforms', 'ZF 8-speed and 9-speed automatic transmissions', {
    engineCodes: ['Pentastar V6', 'HEMI V8', 'PHEV'],
    suspensionType: 'touring suspension with adaptive damping on selected 300 variants',
  }),
  'corvette-service-dubai': createAdditionalServiceProfile('corvette-service-dubai', 'Corvette', ['C6', 'C7 Stingray', 'C7 Z06', 'C8 Stingray', 'C8 Z06', 'E-Ray'], 'GM GDS2-compatible diagnostics with performance data and module testing', 'LS and LT V8 platforms, including supercharged and hybrid applications', 'Tremec manual, 8-speed automatic, and C8 dual-clutch transmissions', {
    engineCodes: ['LS3', 'LT1', 'LT4', 'LT6'],
    brakeSystem: 'Brembo performance brakes with steel or carbon-ceramic rotors depending on specification',
    suspensionType: 'Magnetic Ride Control and performance damper systems',
  }),
  'dodge-service-dubai': createAdditionalServiceProfile('dodge-service-dubai', 'Dodge', ['Charger', 'Challenger', 'Durango', 'Hornet', 'Viper'], 'WiTECH-compatible diagnostics with module configuration and performance data logging', 'Pentastar V6, HEMI V8, supercharged Hellcat, and Hurricane platforms', 'ZF 8-speed automatic, Tremec manual, and all-wheel-drive systems', {
    engineCodes: ['Pentastar V6', 'HEMI V8', 'Hellcat 6.2'],
    brakeSystem: 'standard and Brembo high-performance braking systems used on SRT and Hellcat models',
    suspensionType: 'adaptive damping and performance suspension systems on SRT applications',
  }),
  'fiat-service-dubai': createAdditionalServiceProfile('fiat-service-dubai', 'FIAT', ['500', '500X', '500e', 'Tipo', 'Panda', 'Doblo'], 'Fiat-compatible diagnostics with live-data, module, and service-function access', 'FIRE, MultiAir, turbo-petrol, diesel, and electric platforms', 'manual, dual-clutch, automatic, and electric drive systems', {
    engineCodes: ['FIRE', 'MultiAir', 'electric drive'],
    suspensionType: 'compact-car strut and torsion-beam systems with electronic steering integration',
  }),
  'ford-service-dubai': createAdditionalServiceProfile('ford-service-dubai', 'Ford', ['Mustang', 'F-150', 'Explorer', 'Expedition', 'Bronco', 'Ranger'], 'Ford FDRS and IDS-compatible diagnostics with module programming and live-data testing', 'EcoBoost, Coyote V8, Power Stroke diesel, hybrid, and electric platforms', '10R80 automatic, SelectShift, manual, and four-wheel-drive systems', {
    engineCodes: ['EcoBoost', 'Coyote V8', 'Power Stroke'],
    brakeSystem: 'Ford ABS and electronic brake-control systems with Brembo performance packages where fitted',
    suspensionType: 'independent, live-axle, adaptive, and off-road suspension systems across the Ford range',
  }),
  'genesis-service-dubai': createAdditionalServiceProfile('genesis-service-dubai', 'Genesis', ['G70', 'G80', 'G90', 'GV60', 'GV70', 'GV80'], 'Genesis GDS-compatible diagnostics with calibration and live-data testing', 'Smartstream turbo-four, twin-turbo V6, V8, hybrid, and electric platforms', '8-speed automatic, all-wheel-drive, and electric drive systems', {
    engineCodes: ['Smartstream 2.5T', 'Lambda 3.5T', 'electric drive'],
    brakeSystem: 'electronic brake-control systems with performance Brembo packages on selected models',
    suspensionType: 'electronically controlled suspension with road-preview functions where fitted',
  }),
  'gmc-service-dubai': createAdditionalServiceProfile('gmc-service-dubai', 'GMC', ['Yukon', 'Yukon Denali', 'Sierra', 'Terrain', 'Acadia', 'Hummer EV'], 'GM GDS2-compatible diagnostics with module programming and drivetrain testing', 'EcoTec V8, turbocharged petrol, Duramax diesel, and Ultium electric platforms', 'GM 8-speed, 10-speed, four-wheel-drive, and electric drive systems', {
    engineCodes: ['EcoTec V8', 'Duramax', 'Ultium electric'],
    suspensionType: 'Magnetic Ride Control, Adaptive Air Ride, and heavy-duty truck suspension systems',
  }),
  'hummer-service-dubai': createAdditionalServiceProfile('hummer-service-dubai', 'Hummer', ['H1', 'H2', 'H3', 'Hummer EV Pickup', 'Hummer EV SUV'], 'GM-compatible diagnostics for legacy Hummer and current Hummer EV systems', 'V8 petrol, diesel, and Ultium electric platforms', 'heavy-duty automatic, four-wheel-drive, and electric drive systems', {
    engineCodes: ['Vortec V8', 'Duramax', 'Ultium electric'],
    suspensionType: 'heavy-duty independent suspension and Adaptive Air Ride on Hummer EV',
  }),
  'infiniti-service-dubai': createAdditionalServiceProfile('infiniti-service-dubai', 'Infiniti', ['Q50', 'Q60', 'QX50', 'QX60', 'QX80', 'Q70'], 'Nissan CONSULT-compatible diagnostics with module coding and live-data testing', 'VQ V6, VR30 twin-turbo V6, VK V8, and variable-compression turbo platforms', '7-speed, 9-speed, CVT, and all-wheel-drive systems', {
    engineCodes: ['VQ V6', 'VR30DDTT', 'VK56 V8'],
    suspensionType: 'conventional, adaptive, and Hydraulic Body Motion Control systems depending on model',
  }),
  'jaguar-service-dubai': createAdditionalServiceProfile('jaguar-service-dubai', 'Jaguar', ['F-PACE', 'F-TYPE', 'XE', 'XF', 'XJ', 'I-PACE'], 'JLR SDD and Pathfinder-compatible diagnostics with coding and live-data testing', 'Ingenium four- and six-cylinder, AJ-V8, and electric platforms', 'ZF 8-speed automatic, all-wheel-drive, and electric drive systems', {
    engineCodes: ['Ingenium', 'AJ133 V8', 'electric drive'],
    brakeSystem: 'Jaguar electronic brake-control systems with performance packages on R and SVR models',
    suspensionType: 'Adaptive Dynamics, air suspension, and performance damper systems depending on model',
  }),
  'koenigsegg-service-dubai': createAdditionalServiceProfile('koenigsegg-service-dubai', 'Koenigsegg', ['Agera', 'Regera', 'Jesko', 'Gemera', 'CCX'], 'specialist diagnostic access supported by model-specific workshop procedures', 'twin-turbo V8 and high-voltage hybrid hypercar platforms', 'multi-clutch Light Speed Transmission, Direct Drive, and automated manual systems', {
    engineCodes: ['Koenigsegg twin-turbo V8', 'hybrid drive'],
    brakeSystem: 'carbon-ceramic performance braking systems with model-specific service procedures',
    suspensionType: 'Triplex and electronically adjustable performance suspension systems',
  }),
  'lexus-service-dubai': createAdditionalServiceProfile('lexus-service-dubai', 'Lexus', ['LX', 'GX', 'RX', 'LS', 'ES', 'LC', 'IS'], 'Toyota Techstream-compatible diagnostics with hybrid, module, and live-data testing', 'V6, V8, turbocharged, naturally aspirated, and hybrid platforms', '8-speed, 10-speed, eCVT, and four-wheel-drive systems', {
    engineCodes: ['2GR V6', '1UR V8', 'V35A-FTS'],
    brakeSystem: 'Lexus electronic brake-control and regenerative braking systems where fitted',
    suspensionType: 'Adaptive Variable Suspension and air suspension on selected luxury models',
  }),
  'lincoln-service-dubai': createAdditionalServiceProfile('lincoln-service-dubai', 'Lincoln', ['Navigator', 'Aviator', 'Nautilus', 'Corsair', 'Continental', 'MKZ'], 'Ford FDRS and IDS-compatible diagnostics with module programming and live-data testing', 'EcoBoost V6, turbo-four, V8, and plug-in hybrid platforms', '10-speed, 8-speed, all-wheel-drive, and hybrid systems', {
    engineCodes: ['EcoBoost V6', 'turbo-four', 'PHEV'],
    suspensionType: 'Air Glide and adaptive suspension systems on Navigator and selected Lincoln models',
  }),
  'lotus-service-dubai': createAdditionalServiceProfile('lotus-service-dubai', 'Lotus', ['Emira', 'Eletre', 'Emeya', 'Evora', 'Exige', 'Elise'], 'Lotus-compatible diagnostics with powertrain, chassis, and module testing', 'supercharged V6, turbo-four, and high-voltage electric platforms', 'manual, dual-clutch, automatic, and electric drive systems', {
    engineCodes: ['2GR-FE V6', 'M139 turbo-four', 'electric drive'],
    brakeSystem: 'AP Racing and performance braking systems with model-specific pad and rotor specifications',
    suspensionType: 'lightweight performance suspension and semi-active damping on current platforms',
  }),
  'mazda-service-dubai': createAdditionalServiceProfile('mazda-service-dubai', 'Mazda', ['CX-5', 'CX-9', 'CX-60', 'Mazda3', 'Mazda6', 'MX-5'], 'Mazda IDS-compatible diagnostics with module, live-data, and service-function access', 'Skyactiv-G petrol, Skyactiv-D diesel, turbocharged, and mild-hybrid platforms', 'Skyactiv-Drive 6-speed, 8-speed automatic, and manual transmissions', {
    engineCodes: ['Skyactiv-G', 'Skyactiv-D', 'e-Skyactiv'],
    suspensionType: 'Skyactiv chassis systems with electronic steering and driver-assistance calibration',
  }),
  'mini-service-dubai': createAdditionalServiceProfile('mini-service-dubai', 'MINI', ['Cooper', 'Cooper S', 'John Cooper Works', 'Countryman', 'Clubman', 'Aceman'], 'BMW ISTA-compatible diagnostics with coding, service functions, and live-data testing', 'B38 three-cylinder, B48 four-cylinder, and electric platforms', 'Getrag dual-clutch, Aisin automatic, manual, and electric drive systems', {
    engineCodes: ['B38', 'B48', 'electric drive'],
    brakeSystem: 'standard and John Cooper Works performance braking systems',
    suspensionType: 'sport, adaptive, and electronically controlled damper systems depending on model',
  }),
  'mitsubishi-service-dubai': createAdditionalServiceProfile('mitsubishi-service-dubai', 'Mitsubishi', ['Pajero', 'Outlander', 'L200', 'ASX', 'Eclipse Cross', 'Montero Sport'], 'MUT-III-compatible diagnostics with drivetrain, hybrid, and live-data testing', 'MIVEC petrol, turbo-diesel, and plug-in hybrid platforms', 'CVT, automatic, manual, Super Select 4WD, and hybrid drive systems', {
    engineCodes: ['MIVEC', '4N15 diesel', 'PHEV'],
    suspensionType: 'SUV, pickup, and road-car suspension systems with four-wheel-drive integration',
  }),
  'renault-service-dubai': createAdditionalServiceProfile('renault-service-dubai', 'Renault', ['Duster', 'Koleos', 'Megane', 'Arkana', 'Captur', 'Symbol'], 'Renault CLIP-compatible diagnostics with module configuration and live-data testing', 'TCe petrol, dCi diesel, naturally aspirated, and E-Tech hybrid platforms', 'EDC dual-clutch, CVT, automatic, manual, and hybrid systems', {
    engineCodes: ['TCe', 'dCi', 'E-Tech hybrid'],
    suspensionType: 'passenger-car and SUV suspension systems with electronic steering integration',
  }),
  'subaru-service-dubai': createAdditionalServiceProfile('subaru-service-dubai', 'Subaru', ['WRX', 'BRZ', 'Forester', 'Outback', 'Crosstrek', 'Ascent'], 'Subaru Select Monitor-compatible diagnostics with AWD and live-data testing', 'FA and FB boxer-four, EJ turbo, and hybrid platforms', 'Lineartronic CVT, manual, automatic, and Symmetrical AWD systems', {
    engineCodes: ['FA24', 'FB25', 'EJ25'],
    brakeSystem: 'Subaru ABS and Vehicle Dynamics Control systems with Brembo packages on performance models',
    suspensionType: 'Symmetrical AWD chassis systems with sport suspension on WRX and BRZ models',
  }),
  'tesla-service-dubai': createAdditionalServiceProfile('tesla-service-dubai', 'Tesla', ['Model S', 'Model 3', 'Model X', 'Model Y', 'Cybertruck'], 'Tesla-compatible service diagnostics with high-voltage safety procedures and live-data testing', 'high-voltage battery, inverter, and electric motor platforms', 'single-speed reduction gear and dual-motor all-wheel-drive systems', {
    engineCodes: ['electric drive unit', 'high-voltage battery'],
    oilSpec: 'model-specific electric drive-unit fluid where scheduled',
    transmissionFluid: 'Tesla-specified drive-unit fluid',
    brakeSystem: 'regenerative braking integrated with hydraulic Brembo or Tesla braking hardware',
    suspensionType: 'coil-spring or adaptive air suspension depending on model',
    acRefrigerant: 'model-specific refrigerant confirmed from the vehicle label before service',
    climateNote: 'Tesla battery cooling, air conditioning, suspension, tyres, brakes, and low-voltage systems are checked for Dubai heat and high cabin-cooling demand.',
  }),
  'byd-service-dubai': createAdditionalServiceProfile('byd-service-dubai', 'BYD', ['ATTO 3', 'Dolphin', 'Seal', 'Sealion 7', 'Song Plus', 'Tang'], 'BYD-compatible diagnostics with high-voltage safety procedures, live-data testing, and module checks', 'high-voltage electric, plug-in hybrid, and DM-i powertrain platforms', 'single-speed electric drive units and hybrid transaxle systems', {
    engineCodes: ['e-Platform electric drive', 'DM-i hybrid system'],
    oilSpec: 'manufacturer-approved engine oil matched to the vehicle specification on hybrid models',
    transmissionFluid: 'manufacturer-approved electric drive-unit or hybrid transaxle fluid matched to the vehicle specification',
    brakeSystem: 'regenerative braking integrated with hydraulic ABS and electronic brake-control systems',
    suspensionType: 'independent or multi-link suspension with electronic steering and ride-height checks where fitted',
    acRefrigerant: 'vehicle-specified refrigerant confirmed from the under-bonnet label before service',
    climateNote: 'BYD battery cooling, cabin air conditioning, low-voltage systems, tyres, brakes, and suspension are inspected with Dubai heat and high cabin-cooling demand in mind.',
  }),
  'rox-service-dubai': createAdditionalServiceProfile('rox-service-dubai', 'ROX', ['ROX 01'], 'ROX-compatible diagnostics with high-voltage safety procedures, live-data testing, and module checks', 'range-extender electric, high-voltage battery, and generator-engine platforms', 'electric drive units, range-extender generator systems, and all-wheel-drive drivetrain systems', {
    engineCodes: ['range-extender electric drive', 'generator engine', 'high-voltage battery system'],
    oilSpec: 'manufacturer-approved engine oil matched to the range-extender generator specification',
    transmissionFluid: 'manufacturer-approved electric drive-unit fluid matched to the vehicle specification',
    brakeSystem: 'regenerative braking integrated with hydraulic ABS and electronic brake-control systems',
    suspensionType: 'SUV suspension with electronic steering, ride-height checks, and comfort-system inspection',
    acRefrigerant: 'vehicle-specified refrigerant confirmed from the under-bonnet label before service',
    climateNote: 'ROX high-voltage systems, generator cooling, air conditioning, soft-close comfort features, brakes, tyres, and suspension are inspected for Dubai heat and daily SUV use.',
  }),
});

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
  'mechanical-repair': { name: 'Mechanical Repair', serviceType: 'Mechanical & Drivetrain Repair', label: 'Mechanical Repair' },
  'steering-repair': { name: 'Steering Repair', serviceType: 'Steering & Alignment Repair', label: 'Steering Repair' },
  'battery-replacement': { name: 'Battery Replacement', serviceType: 'Battery Testing & Replacement', label: 'Battery Replacement' },
  'electrical-repair': { name: 'Electrical Repair', serviceType: 'Vehicle Electrical System Repair', label: 'Electrical Repair' },
  'exhaust-repair': { name: 'Exhaust Repair', serviceType: 'Exhaust System Repair', label: 'Exhaust Repair' },
  'fuel-system-repair': { name: 'Fuel System Repair', serviceType: 'Fuel Injection & Delivery Repair', label: 'Fuel System Repair' },
  'body-repair': { name: 'Body Repair', serviceType: 'Bodywork & Paint Repair', label: 'Body Repair' },
  'tire-repair': { name: 'Tyre Repair', serviceType: 'Tyre Repair & Replacement', label: 'Tyre Repair' },
  'soft-close-door-installation': { name: 'Soft Close Door Installation', serviceType: 'Soft Close Door Installation & Repair', label: 'Soft Close Installation' },
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

const EXTENDED_SERVICE_COPY: Record<ExtendedServiceKey, {
  symptoms: string[];
  process: string[];
  parts: string;
}> = {
  'mechanical-repair': {
    symptoms: ['Unusual engine noise, vibration, oil leak, or loss of power', 'Warning light, overheating, or rough running under load', 'Drivetrain clunk, hesitation, or vibration during acceleration'],
    process: ['Full vehicle inspection and diagnostic scan', 'Component-level testing and a clear repair plan', 'Genuine or OE-quality parts fitting, calibration, and road test'],
    parts: 'engine, cooling, drivetrain, and mounting components',
  },
  'steering-repair': {
    symptoms: ['Heavy, vague, or noisy steering', 'Steering warning on the dashboard', 'Pulling, vibration, or uneven tyre wear'],
    process: ['Steering, suspension, and alignment inspection', 'Diagnostic scan and component-level fault tracing', 'Repair, calibration, alignment, and road test'],
    parts: 'steering racks, pumps, sensors, tie rods, and related suspension components',
  },
  'battery-replacement': {
    symptoms: ['Slow crank, no-start condition, or battery warning', 'Electrical faults after the car has been parked', 'Start-stop system unavailable or repeated low-voltage messages'],
    process: ['Battery and charging-system load test', 'Correct specification battery selection and safe replacement', 'Battery registration, coding where required, and final charging check'],
    parts: 'correct-specification AGM, EFB, or conventional batteries and battery-management components',
  },
  'electrical-repair': {
    symptoms: ['Intermittent warning lights or electrical functions failing', 'Battery drain, blown fuses, or module communication faults', 'Lighting, comfort-system, sensor, or charging-system issues'],
    process: ['Full module scan and wiring inspection', 'Live-data testing to identify the failed circuit or component', 'Repair, coding, and confirmation road test'],
    parts: 'genuine sensors, modules, wiring repairs, relays, and charging-system components',
  },
  'exhaust-repair': {
    symptoms: ['Exhaust warning light, unusual noise, or rattling', 'Loss of power, fuel economy, or emissions-test failure', 'Exhaust smell, vibration, or visible leak'],
    process: ['Visual inspection, diagnostic scan, and leak test', 'Measure catalyst, sensor, and back-pressure performance', 'Repair or replace the affected component and verify emissions readiness'],
    parts: 'exhaust sensors, gaskets, catalytic components, silencers, and OE-quality pipework',
  },
  'fuel-system-repair': {
    symptoms: ['Hard starting, hesitation, misfire, or reduced power', 'Fuel smell, poor consumption, or engine warning light', 'Fuel-pressure or injector-related fault codes'],
    process: ['Fuel-pressure, injector, and live-data assessment', 'Targeted component testing before replacement', 'Repair, adaptation reset, and road-test confirmation'],
    parts: 'injectors, pumps, filters, fuel lines, seals, and pressure-control components',
  },
  'body-repair': {
    symptoms: ['Scratches, dents, collision damage, or paint damage', 'Misaligned panel, bumper, or trim', 'Visible corrosion or damage affecting resale value'],
    process: ['Damage assessment and repair plan', 'Precision panel, paint, and trim repair', 'Colour-match quality check and final handover inspection'],
    parts: 'genuine panels, trim, paint materials, and repair consumables',
  },
  'tire-repair': {
    symptoms: ['Puncture, pressure loss, vibration, or uneven wear', 'Tyre-pressure warning or sidewall damage', 'Poor handling, pulling, or noise at speed'],
    process: ['Tyre, wheel, and pressure-system inspection', 'Safe repair or correct tyre replacement recommendation', 'Balance, pressure reset, and road-test check'],
    parts: 'manufacturer-approved tyres, repair materials, valves, and wheel-balance weights',
  },
  'soft-close-door-installation': {
    symptoms: ['Door needs to be slammed to latch fully', 'Soft-close function stops partway, clicks, or does not pull the door in', 'Door warning remains on after closing', 'You would like soft-close door functionality added to your ROX 01'],
    process: ['Inspect the door latch, alignment, wiring, and comfort-system operation', 'Confirm suitable soft-close components and provide a clear installation or repair plan', 'Install or repair components, test every door, and complete final safety checks'],
    parts: 'soft-close latches, motors, sensors, wiring, door-striker components, and suitable comfort-system parts',
  },
};

function composeExtendedService(p: BrandProfile, key: ExtendedServiceKey): Composed {
  const meta = SERVICE_META[key];
  const copy = EXTENDED_SERVICE_COPY[key];
  return {
    h1: `${p.brandName} ${meta.name} Dubai`,
    metaTitle: `${p.brandName} ${meta.name} Dubai | Digi-Tec`,
    metaDescription: `${p.brandName} ${meta.name.toLowerCase()} in Dubai using ${p.diagnosticTool}. Genuine parts, transparent diagnostics, and specialist repair at Digi-Tec.`,
    heroCopy: `Digi-Tec provides specialist ${p.brandName} ${meta.name.toLowerCase()} in Dubai with the right diagnostic access, workshop process, and parts standards for your vehicle. Modern ${p.brandName} platforms depend on integrated mechanical and electronic systems, so we diagnose the root cause before quoting repairs. ${p.climateNote} ${p.heritageLine}`,
    symptoms: copy.symptoms,
    models: p.models.slice(0, 6),
    processSteps: copy.process.map((title) => ({ title, description: `${title} for your ${p.brandName}, using ${p.diagnosticTool} and documented workshop procedures.` })),
    partsCopy: `We use genuine ${p.brandName} parts or approved OE-supplier alternatives for ${copy.parts}. Every recommendation is documented before work begins.`,
    faqs: [
      { question: `Do you handle ${p.brandName} ${meta.name.toLowerCase()} in Dubai?`, answer: `Yes. Our workshop diagnoses and repairs ${p.brandName} ${meta.name.toLowerCase()} using ${p.diagnosticTool}, the correct parts, and a documented repair process.` },
      { question: `How long does ${p.brandName} ${meta.name.toLowerCase()} take?`, answer: 'Simple inspections and minor repairs can often be completed the same day. Complex faults or parts-dependent work are quoted with a clear timeline after diagnosis.' },
      { question: `Do you use genuine ${p.brandName} parts?`, answer: `Genuine ${p.brandName} parts are our default. Approved OE-supplier alternatives are available when appropriate and are always clearly documented.` },
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
  'mechanical-repair': (p) => composeExtendedService(p, 'mechanical-repair'),
  'steering-repair': (p) => composeExtendedService(p, 'steering-repair'),
  'battery-replacement': (p) => composeExtendedService(p, 'battery-replacement'),
  'electrical-repair': (p) => composeExtendedService(p, 'electrical-repair'),
  'exhaust-repair': (p) => composeExtendedService(p, 'exhaust-repair'),
  'fuel-system-repair': (p) => composeExtendedService(p, 'fuel-system-repair'),
  'body-repair': (p) => composeExtendedService(p, 'body-repair'),
  'tire-repair': (p) => composeExtendedService(p, 'tire-repair'),
  'soft-close-door-installation': (p) => composeExtendedService(p, 'soft-close-door-installation'),
};

export function getBrandServiceCombo(brandSlug: string, serviceSlug: string): BrandServiceCombo | undefined {
  const profile = BRAND_PROFILES[brandSlug];
  if (!profile) return undefined;
  const availableServices = getAvailableServiceKeys(brandSlug);
  if (!(availableServices as string[]).includes(serviceSlug)) return undefined;
  const key = serviceSlug as ServiceKey;
  const meta = SERVICE_META[key];
  const composed = COMPOSERS[key](profile);
  const isRoxSoftClose = brandSlug === 'rox-service-dubai' && key === 'soft-close-door-installation';
  const whatsAppMessage = `Hi, I would like to enquire about ${profile.brandName} ${meta.label} at Digi-Tec Performance Centre.`;
  return {
    brandSlug,
    serviceSlug: key,
    brandName: profile.brandName,
    serviceName: meta.name,
    serviceType: meta.serviceType,
    whatsAppMessage,
    ...composed,
    ...(isRoxSoftClose ? {
      h1: 'ROX 01 Soft Close Installation Dubai',
      metaTitle: 'ROX 01 Soft Close Installation Dubai | Digi-Tec',
      metaDescription: 'ROX 01 soft close installation in Dubai. Digi-Tec fits, diagnoses and repairs soft close door systems with compatibility checks in Al Quoz.',
      heroCopy: 'Digi-Tec provides dedicated ROX 01 soft close installation in Dubai for owners who want the premium pull-close function added to their SUV. Our Al Quoz workshop checks door compatibility, latch fitment, wiring routes, door alignment and safety operation before installation. We also diagnose and repair ROX soft close systems that click, stop halfway, fail to pull the door shut or leave a door-open warning on the display.',
      symptoms: [
        'You want soft close functionality installed on your ROX 01',
        'The door needs to be slammed before it latches correctly',
        'The soft close motor clicks, grinds, stops halfway or does not pull the door in',
        'A door-open warning remains after the door is closed',
      ],
      processSteps: [
        { title: 'ROX 01 compatibility inspection', description: 'We inspect the doors, latch area, trim, wiring routes and vehicle configuration before recommending the correct ROX soft close installation.' },
        { title: 'Installation plan and clear quote', description: 'You receive a clear scope covering components, fitting, calibration and the expected workshop time before work starts.' },
        { title: 'Professional fitment and adjustment', description: 'Our technicians install or repair the required latches, actuators, wiring and door-striker components, then set the alignment correctly.' },
        { title: 'Safety and locking verification', description: 'Every fitted door is tested for pull-close operation, locking, anti-pinch safety and warning-light behaviour before handover.' },
      ],
      partsCopy: 'For ROX 01 soft close installation and repair, we use suitable latches, actuators, motors, sensors, wiring and door-striker components selected after the compatibility inspection. We document the recommended solution and verify the locking and safety functions after fitting.',
      faqs: [
        { question: 'Can you install soft close doors on a ROX 01 in Dubai?', answer: 'Yes. Digi-Tec provides ROX 01 soft close installation in Dubai. We inspect compatibility, door fitment and wiring first, then install and test the system in our Al Quoz workshop.' },
        { question: 'Can you repair a ROX soft close door that is not working?', answer: 'Yes. We diagnose ROX soft close faults such as clicking, incomplete pull-close action, latch issues, wiring faults, door alignment problems and warning messages before replacing any parts.' },
        { question: 'How long does ROX 01 soft close installation take?', answer: 'Timing depends on the number of doors, the selected components and the vehicle inspection. We confirm the installation plan and timeline after checking your ROX 01.' },
        { question: 'Where can I find ROX soft close installation near me in Dubai?', answer: 'Digi-Tec Performance Centre is in Al Quoz Industrial Area 3, Dubai. Contact us by WhatsApp or phone to arrange a ROX 01 soft close compatibility inspection.' },
        { question: 'Do you work on ROX 01 door latches and comfort-system wiring?', answer: 'Yes. Our service includes inspection of the latch, actuator, wiring, sensors, door alignment and related comfort-system operation.' },
      ],
    } : {
      metaTitle: `${profile.brandName} ${meta.name} Dubai | Digi-Tec`,
      metaDescription: `Specialist ${profile.brandName} ${meta.name.toLowerCase()} in Dubai with model-specific diagnostics, approved parts, clear quotes, and workshop care at Digi-Tec, Al Quoz.`,
    }),
  };
}

export function getAllBrandServiceCombos(): { brandSlug: string; serviceSlug: ServiceKey }[] {
  const combos: { brandSlug: string; serviceSlug: ServiceKey }[] = [];
  for (const brandSlug of BRAND_SLUGS) {
    const services = getAvailableServiceKeys(brandSlug);
    for (const serviceSlug of services) {
      combos.push({ brandSlug, serviceSlug });
    }
  }
  return combos;
}

export function getServicesForBrand(brandSlug: string): { serviceSlug: ServiceKey; label: string }[] {
  if (!BRAND_PROFILES[brandSlug]) return [];
  const services = getAvailableServiceKeys(brandSlug);
  return services.map((s) => ({ serviceSlug: s, label: SERVICE_META[s].label }));
}

export function getServiceLabel(serviceSlug: ServiceKey): string {
  return SERVICE_META[serviceSlug].label;
}
