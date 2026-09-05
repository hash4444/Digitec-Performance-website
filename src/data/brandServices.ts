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

export const getAvailableServiceKeys = (brandSlug: string): ServiceKey[] =>
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
    diagnosticTool: 'Mercedes-compatible diagnostics; available functions confirmed from the VIN and vehicle',
    engineFamily: 'M254, M256, M177, and M279 platforms',
    engineCodes: ['M254', 'M256', 'M177', 'M279', 'OM656'],
    oilSpec: 'MB 229.5 / 229.71 approved 5W-30 or 0W-30',
    oilIntervalKm: 10000,
    transmissionName: '9G-Tronic (725.0) and AMG SpeedShift MCT',
    transmissionFluid: 'MB 236.15 / 236.17 ATF',
    brakeSystem: 'AMG four-piston and six-piston calipers, with optional carbon ceramic on AMG GT and S 63',
    suspensionType: 'AIRMATIC air suspension and E-ACTIVE Body Control on S-Class and GLS',
    acRefrigerant: 'R-1234yf on post-2017 platforms',
    climateNote: 'Mercedes AIRMATIC, cooling and OM656 concerns may warrant additional condition checks where Dubai heat or dust exposure is relevant.',
    heritageLine: 'Digi-Tec has operated in Dubai since 2002; the Mercedes workshop scope is confirmed for each vehicle.',
  },
  'maybach-service-dubai': {
    brandSlug: 'maybach-service-dubai',
    brandName: 'Mercedes-Maybach',
    shortName: 'Maybach',
    models: ['Maybach S 580', 'Maybach S 680', 'Maybach GLS 600', 'Maybach S-Class Edition 100'],
    diagnosticTool: 'Mercedes-Maybach-compatible diagnostics; available functions confirmed from the VIN and vehicle',
    engineFamily: 'M256 inline-six, M177 V8 biturbo, and M279 V12 biturbo',
    engineCodes: ['M256', 'M177', 'M279'],
    oilSpec: 'MB 229.5 for V12, MB 229.71 for M256 and M177 hybrids',
    oilIntervalKm: 10000,
    transmissionName: 'MCT 9G-Tronic (725.0)',
    transmissionFluid: 'MB 236.17 ATF',
    brakeSystem: 'Silent-tuned six-piston front calipers with ceramic-optimised pads',
    suspensionType: 'E-ACTIVE Body Control with road-scanning camera and curve tilting',
    acRefrigerant: 'R-1234yf with four-zone climate and rear-cabin fragrance',
    climateNote: 'Extended idling and high ambient temperature can be considered when inspecting Maybach cooling, transmission and rear-cabin climate concerns.',
    heritageLine: 'Digi-Tec has operated in Dubai since 2002; the Mercedes-Maybach workshop scope is confirmed for each vehicle.',
  },
  'porsche-service-dubai': {
    brandSlug: 'porsche-service-dubai',
    brandName: 'Porsche',
    shortName: 'Porsche',
    models: ['911 Carrera', '911 Turbo S', '911 GT3', 'Cayman', 'Cayenne', 'Panamera', 'Macan', 'Taycan'],
    diagnosticTool: 'Porsche-compatible diagnostics; coding or programming functions confirmed per vehicle',
    engineFamily: 'Porsche flat-six, V6, V8 and electric powertrains; exact engine or drive-unit identification confirmed from the VIN',
    engineCodes: ['9A2', 'MDG', 'MCG', 'MDC.WA'],
    oilSpec: 'Mobil 1 0W-40 A40 for 911, 5W-40 C40 for 9A2 turbo flat-six',
    oilIntervalKm: 15000,
    transmissionName: '7-speed PDK (7DT-45 and 7DT-70) and 8-speed Tiptronic S',
    transmissionFluid: 'Porsche PDK fluid 999.917.080.00',
    brakeSystem: 'Steel or PCCB Porsche Ceramic Composite Brakes on Turbo S, GT3, and Cayenne Turbo GT',
    suspensionType: 'PASM adaptive dampers and PDCC active roll stabilisation',
    acRefrigerant: 'R-1234yf on 992, 9YA Cayenne, and Taycan; R-134a on older platforms',
    climateNote: 'Cayenne air-suspension and 911 GT3 track-use concerns are assessed against heat exposure, use, history and measured condition.',
    heritageLine: 'Digi-Tec has operated in Dubai since 2002; the Porsche workshop scope is confirmed for each vehicle.',
  },
  'audi-service-dubai': {
    brandSlug: 'audi-service-dubai',
    brandName: 'Audi',
    shortName: 'Audi',
    models: ['A4', 'A6', 'A7', 'A8', 'Q5', 'Q7', 'Q8', 'RS6 Avant', 'RS7', 'R8'],
    diagnosticTool: 'Audi-compatible diagnostics; ODIS or VCDS functions confirmed per vehicle',
    engineFamily: 'EA888 2.0 TFSI, EA839 3.0 TFSI V6, and 4.0 TFSI V8 biturbo',
    engineCodes: ['EA888', 'EA839', 'DJPA', 'DCPC', '4.0 TFSI'],
    oilSpec: 'VW 508 00 / 509 00 or 502 00 / 505 00 depending on engine',
    oilIntervalKm: 15000,
    transmissionName: 'S Tronic DL501 (7-speed DCT) and ZF 8HP Tiptronic',
    transmissionFluid: 'VW G 055 529 A2 (DL501) and ZF Lifeguard 8',
    brakeSystem: 'Six-piston front calipers with optional carbon ceramic on RS models',
    suspensionType: 'Adaptive air suspension with Audi Drive Select on Q7, Q8, A8, and RS6',
    acRefrigerant: 'R-1234yf on B9 and D5 and 4M platforms',
    climateNote: 'Audi 4.0 TFSI intake-manifold flap and EA888 PCV concerns may warrant inspection where symptoms, history or condition indicate it.',
    heritageLine: 'Digi-Tec has operated in Dubai since 2002; the Audi workshop scope is confirmed for each vehicle.',
  },
  'bmw-service-dubai': {
    brandSlug: 'bmw-service-dubai',
    brandName: 'BMW',
    shortName: 'BMW',
    models: ['3 Series', '5 Series', '7 Series', 'X3', 'X5', 'X7', 'M3', 'M5', 'M8', 'i8'],
    diagnosticTool: 'BMW-compatible diagnostics; ISTA, E-Sys or ENET functions confirmed per vehicle',
    engineFamily: 'B58 inline-six, N63 and S63 V8, and S55 and S58 M-power six',
    engineCodes: ['B58', 'B48', 'S55', 'S58', 'N63', 'S63'],
    oilSpec: 'BMW-approved oil matched to the exact engine, model year and market specification',
    oilIntervalKm: 12000,
    transmissionName: 'ZF 8HP (8HP50, 8HP70, 8HP76) and DCT M-DCT on F80 and F82',
    transmissionFluid: 'gearbox-specific approved fluid confirmed from the fitted ZF 8HP, M-DCT or manual transmission',
    brakeSystem: 'M Compound and optional M Carbon Ceramic on M3, M4, M5, M8',
    suspensionType: 'steel-spring, Adaptive M, rear self-levelling and two-axle air-suspension systems depending on chassis and options',
    acRefrigerant: 'refrigerant identified from the vehicle label before AC service',
    climateNote: 'BMW N63 and S63 heat load, oil-separator and VANOS concerns may warrant inspection where symptoms, use or service history indicate it.',
    heritageLine: 'Digi-Tec has operated in Dubai since 2002; the BMW workshop scope is confirmed for each vehicle.',
  },
  'lamborghini-service-dubai': {
    brandSlug: 'lamborghini-service-dubai',
    brandName: 'Lamborghini',
    shortName: 'Lamborghini',
    models: ['Huracán EVO', 'Huracán STO', 'Urus', 'Urus S', 'Urus Performante', 'Revuelto', 'Aventador SVJ'],
    diagnosticTool: 'Lamborghini-compatible diagnostics; software functions confirmed per vehicle',
    engineFamily: '5.2 V10 naturally aspirated, 6.5 V12, and 4.0 V8 biturbo (Urus)',
    engineCodes: ['5.2 V10', '6.5 V12', '4.0 V8 biturbo'],
    oilSpec: 'engine oil matched to the exact Lamborghini engine and market specification',
    oilIntervalKm: 0,
    transmissionName: 'model-specific transmissions including Huracán EVO seven-speed LDF DCT, Urus S eight-speed automatic and Aventador SVJ ISR',
    transmissionFluid: 'transmission fluid matched to the exact Lamborghini gearbox specification',
    brakeSystem: 'model-specific steel or carbon-ceramic brake systems confirmed from the exact vehicle',
    suspensionType: 'model- and variant-specific systems, including Urus S adaptive air suspension and distinct supercar suspension or front-lift arrangements',
    acRefrigerant: 'refrigerant identified from the vehicle label before AC service',
    climateNote: 'Cooling, air-conditioning, low-voltage battery, tyre, brake and fluid condition are reviewed against the exact Lamborghini, history and Dubai use.',
    heritageLine: 'Digi-Tec has operated in Dubai since 2002; the Lamborghini workshop scope is confirmed for each vehicle.',
  },
  'bentley-service-dubai': {
    brandSlug: 'bentley-service-dubai',
    brandName: 'Bentley',
    shortName: 'Bentley',
    models: ['Continental GT', 'Continental GTC', 'Flying Spur', 'Bentayga', 'Bentayga EWB'],
    diagnosticTool: 'Bentley-compatible diagnostics; ODIS or scope functions confirmed per vehicle',
    engineFamily: '6.0 W12 TSI twin-turbo and 4.0 V8 biturbo (shared with Audi RS)',
    engineCodes: ['W12 TSI', '4.0 V8 biturbo'],
    oilSpec: 'VW 502 00 / 505 00 approved 5W-40 for W12',
    oilIntervalKm: 16000,
    transmissionName: 'ZF 8HP70 8-speed automatic (Bentley-calibrated)',
    transmissionFluid: 'ZF Lifeguard 8',
    brakeSystem: 'Ten-piston front and four-piston rear on W12 Continental, with optional CSiC carbon-silicon-carbide',
    suspensionType: '48V active anti-roll (Dynamic Ride) with three-chamber air suspension',
    acRefrigerant: 'R-1234yf with four-zone climate',
    climateNote: 'W12 cooling-system concerns, including transfer-pipe condition, may warrant inspection where symptoms or history indicate it.',
    heritageLine: 'Digi-Tec has operated in Dubai since 2002; the Bentley workshop scope is confirmed for each vehicle.',
  },
  'mclaren-service-dubai': {
    brandSlug: 'mclaren-service-dubai',
    brandName: 'McLaren',
    shortName: 'McLaren',
    models: ['540C', '570S', '600LT', '650S', '720S', '765LT', 'GT', 'Artura', '750S'],
    diagnosticTool: 'McLaren-compatible diagnostics; available functions confirmed per vehicle',
    engineFamily: 'M838T 3.8 twin-turbo V8, M840T 4.0 twin-turbo V8, and Artura hybrid V6',
    engineCodes: ['M838T', 'M840T', 'M630 V6 hybrid'],
    oilSpec: 'engine oil matched to the exact McLaren model, engine, year and market specification',
    oilIntervalKm: 0,
    transmissionName: 'Graziano SSG 7-speed seamless-shift DCT (Artura uses 8-speed DCT)',
    transmissionFluid: 'transmission fluid matched to the exact McLaren SSG specification',
    brakeSystem: 'model-specific steel or carbon-ceramic brake systems, confirmed from the vehicle',
    suspensionType: 'model-specific conventional or linked hydraulic suspension and vehicle-lift systems',
    acRefrigerant: 'refrigerant identified from the vehicle label and model-specific information',
    climateNote: 'Suspension, vehicle-lift and accumulator concerns require identification of the fitted McLaren system before repair scope is proposed.',
    heritageLine: 'Digi-Tec has operated in Dubai since 2002; McLaren-compatible work is confirmed from the vehicle and requested scope.',
  },
  'ferrari-service-dubai': {
    brandSlug: 'ferrari-service-dubai',
    brandName: 'Ferrari',
    shortName: 'Ferrari',
    models: ['488 GTB', '488 Pista', 'F8 Tributo', 'SF90 Stradale', 'Roma', 'Portofino M', '812 Superfast', '296 GTB', 'Purosangue'],
    diagnosticTool: 'Ferrari-compatible diagnostics; available SD3, DEIS or other functions are confirmed per vehicle and requested scope',
    engineFamily: 'F154 3.9 twin-turbo V8, F140 6.5 V12, and F163 3.0 twin-turbo V6 hybrid',
    engineCodes: ['F154', 'F140', 'F163'],
    oilSpec: 'Ferrari-approved engine oil matched to the exact model, engine, year and market specification',
    oilIntervalKm: 12500,
    transmissionName: 'single-clutch F1, seven-speed dual-clutch and eight-speed dual-clutch systems depending on model and generation',
    transmissionFluid: 'vehicle- and gearbox-specific Ferrari transmission fluid',
    brakeSystem: 'steel or Ferrari carbon-ceramic systems depending on model, generation and fitted option',
    suspensionType: 'conventional or SCM/SCM-E adaptive magnetorheological damping depending on model and generation',
    acRefrigerant: 'refrigerant specified on the exact vehicle label',
    climateNote: 'Ferrari cooling, air-conditioning, battery and drivetrain concerns are assessed against the exact model, symptoms and service history.',
    heritageLine: 'DIGI-TEC has operated in Dubai since 2002; Ferrari-compatible work is confirmed from the vehicle and requested scope.',
  },
  'bugatti-service-dubai': {
    brandSlug: 'bugatti-service-dubai',
    brandName: 'Bugatti',
    shortName: 'Bugatti',
    models: ['Veyron', 'Veyron Grand Sport', 'Chiron', 'Chiron Pur Sport', 'Chiron Super Sport', 'Divo', 'Mistral'],
    diagnosticTool: 'Bugatti diagnostic requirements; tooling and external support confirmed before booking',
    engineFamily: '8.0 W16 quad-turbo',
    engineCodes: ['W16 quad-turbo'],
    oilSpec: 'Castrol Edge Professional to Bugatti spec, W16 requires approximately 15 litres',
    oilIntervalKm: 10000,
    transmissionName: 'Ricardo 7-speed DCT (dual-clutch)',
    transmissionFluid: 'transmission fluid matched to the exact Bugatti gearbox specification',
    brakeSystem: 'Eight-piston front and six-piston rear titanium calipers on CSiC carbon-silicon-carbide rotors',
    suspensionType: 'Adaptive damping with speed-dependent ride-height and active aero',
    acRefrigerant: 'R-1234yf',
    climateNote: 'W16 cooling-system requirements and available pressure-testing scope are confirmed for the exact vehicle before booking.',
    heritageLine: 'Digi-Tec has operated in Dubai since 2002; Bugatti work, handling requirements and external support are confirmed before booking.',
  },
  'land-rover-service-dubai': {
    brandSlug: 'land-rover-service-dubai',
    brandName: 'Land Rover',
    shortName: 'Range Rover',
    models: ['Range Rover', 'Range Rover Sport', 'Range Rover Velar', 'Range Rover Evoque', 'Defender 90', 'Defender 110', 'Discovery'],
    diagnosticTool: 'JLR-compatible diagnostics; SDD or Pathfinder functions confirmed per vehicle',
    engineFamily: '5.0 supercharged V8, 3.0 Ingenium inline-six mild-hybrid, and 4.4 twin-turbo V8 (P530)',
    engineCodes: ['AJ-V8 5.0 SC', 'Ingenium I6', 'P530 4.4 V8 TT'],
    oilSpec: 'JLR STJLR.03.5006 5W-30 or STJLR.51.5122 0W-20',
    oilIntervalKm: 16000,
    transmissionName: 'ZF 8HP70 and 8HP75 (JLR-calibrated) 8-speed automatic',
    transmissionFluid: 'ZF Lifeguard 8',
    brakeSystem: 'Brembo six-piston front on SVR and SV models, standard four-piston elsewhere',
    suspensionType: 'EAS four-corner air suspension with Terrain Response 2 and Dynamic Response',
    acRefrigerant: 'R-1234yf on L460, L461, and L462 platforms',
    climateNote: 'Range Rover air-compressor, valve-block and supercharger concerns may warrant inspection where symptoms or history indicate it.',
    heritageLine: 'Digi-Tec has operated in Dubai since 2002; Land Rover workshop scope is confirmed for the exact generation and vehicle.',
  },
  'rolls-royce-service-dubai': {
    brandSlug: 'rolls-royce-service-dubai',
    brandName: 'Rolls-Royce',
    shortName: 'Rolls-Royce',
    models: ['Phantom VIII', 'Ghost', 'Ghost Extended', 'Cullinan', 'Cullinan Black Badge', 'Wraith', 'Dawn', 'Spectre'],
    diagnosticTool: 'Rolls-Royce-compatible diagnostics; available functions confirmed per vehicle',
    engineFamily: 'model-specific combustion or electric architecture confirmed from the exact vehicle',
    engineCodes: ['model-specific combustion engine', 'electric drive'],
    oilSpec: 'engine oil matched to the exact Rolls-Royce engine and market specification',
    oilIntervalKm: 0,
    transmissionName: 'model-specific automatic transmission',
    transmissionFluid: 'vehicle-specified transmission fluid',
    brakeSystem: 'model-specific braking hardware and electronic functions',
    suspensionType: 'model-specific self-levelling or adaptive suspension where fitted',
    acRefrigerant: 'vehicle-specified refrigerant confirmed from the under-bonnet label',
    climateNote: 'Cooling, low-voltage battery, air-conditioning and suspension concerns are assessed against the exact model, history and Dubai use.',
    heritageLine: 'Digi-Tec has operated in Dubai since 2002; Rolls-Royce workshop scope and handling requirements are confirmed before booking.',
  },
  'aston-martin-service-dubai': {
    brandSlug: 'aston-martin-service-dubai',
    brandName: 'Aston Martin',
    shortName: 'Aston Martin',
    models: ['DB11', 'DB12', 'Vantage', 'Vantage F1 Edition', 'DBS Superleggera', 'DBX', 'DBX707'],
    diagnosticTool: 'Aston Martin-compatible diagnostics; AMDS functions confirmed per vehicle',
    engineFamily: 'AMG-sourced M177 4.0 twin-turbo V8 and Aston 5.2 twin-turbo V12',
    engineCodes: ['M177 4.0 V8', '5.2 V12 twin-turbo'],
    oilSpec: 'engine oil matched to the exact Aston Martin engine and market specification',
    oilIntervalKm: 16000,
    transmissionName: 'ZF 8HP transaxle 8-speed automatic',
    transmissionFluid: 'ZF Lifeguard 8',
    brakeSystem: 'Six-piston front and four-piston rear, with CCM carbon-ceramic on DBS and F1 Edition',
    suspensionType: 'Adaptive damping (Skyhook-derived) with GT, Sport, and Sport+ modes',
    acRefrigerant: 'R-1234yf profile reference; verify the vehicle label and VIN',
    climateNote: 'DB11 and DBS transaxle-mounting or torque-tube concerns may warrant inspection where symptoms, history or condition indicate it.',
    heritageLine: 'Digi-Tec has operated in Dubai since 2002; Aston Martin workshop scope is confirmed for each vehicle.',
  },
};

BRAND_PROFILES['range-rover-service-dubai'] = {
  ...BRAND_PROFILES['land-rover-service-dubai'],
  brandSlug: 'range-rover-service-dubai',
  brandName: 'Range Rover',
  shortName: 'Range Rover',
  models: ['Range Rover', 'Range Rover Sport', 'Range Rover Velar', 'Range Rover Evoque'],
  heritageLine: 'Digi-Tec has operated in Dubai since 2002; Range Rover workshop scope is confirmed for the exact vehicle.',
};

BRAND_PROFILES['defender-service-dubai'] = {
  ...BRAND_PROFILES['land-rover-service-dubai'],
  brandSlug: 'defender-service-dubai',
  brandName: 'Defender',
  shortName: 'Defender',
  models: ['Defender 90', 'Defender 110', 'Defender 130', 'Defender V8', 'Defender OCTA'],
  heritageLine: 'Digi-Tec has operated in Dubai since 2002; Defender workshop scope is confirmed for the exact vehicle.',
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
  diagnosticTool: `${diagnosticTool}; exact scan, coding and programming functions confirmed from the VIN and vehicle before booking`,
  engineFamily,
  engineCodes: [engineFamily.split(/,| and /)[0]],
  oilSpec: 'engine oil matched to the vehicle-specific requirement',
  oilIntervalKm: 10000,
  transmissionName,
  transmissionFluid: 'transmission fluid matched to the vehicle-specific requirement',
  brakeSystem: 'fitted braking system with electronic brake control and ABS/ESC functions where supported',
  suspensionType: 'fitted suspension system with steering-angle and ride-height checks where supported',
  acRefrigerant: 'R-134a or R-1234yf, confirmed by vehicle specification',
  climateNote: `${brandName} cooling, air-conditioning, battery, brake, and suspension systems are inspected with Dubai heat, stop-start traffic, and dust exposure in mind.`,
  heritageLine: `Digi-Tec confirms ${brandName} workshop scope from the VIN, vehicle condition and requested work before booking.`,
  ...details,
});

Object.assign(BRAND_PROFILES, {
  'jeep-service-dubai': createAdditionalServiceProfile('jeep-service-dubai', 'Jeep', ['Wrangler', 'Grand Cherokee', 'Gladiator', 'Compass', 'Cherokee'], 'WiTECH-compatible diagnostic access and advanced live-data testing', 'Pentastar V6, Hurricane turbo, and plug-in hybrid platforms', '8-speed automatic and four-wheel-drive drivetrain systems'),
  'nissan-service-dubai': createAdditionalServiceProfile('nissan-service-dubai', 'Nissan', ['Patrol', 'Pathfinder', 'X-Trail', 'Altima', 'Maxima', 'Z', 'GT-R'], 'CONSULT-III-compatible diagnostic access and advanced live-data testing', 'VQ V6, VK56 V8, VR38DETT, and e-POWER platforms', 'automatic, CVT, dual-clutch, and four-wheel-drive drivetrain systems'),
  'maserati-service-dubai': createAdditionalServiceProfile('maserati-service-dubai', 'Maserati', ['Ghibli', 'Quattroporte', 'Levante', 'Grecale', 'GranTurismo', 'MC20'], 'Maserati-compatible diagnostic access and advanced live-data testing', 'V6 twin-turbo, V8, and Nettuno V6 platforms', 'ZF 8-speed automatic and dual-clutch transmission systems'),
  'toyota-service-dubai': createAdditionalServiceProfile('toyota-service-dubai', 'Toyota', ['Land Cruiser', 'Land Cruiser Prado', 'Camry', 'Hilux', 'Fortuner', 'Corolla', 'GR Supra'], 'Toyota Techstream-compatible diagnostic access and advanced live-data testing', 'petrol, diesel, hybrid, and GR performance platforms', 'automatic, manual, hybrid, and four-wheel-drive drivetrain systems'),
  'pagani-service-dubai': createAdditionalServiceProfile('pagani-service-dubai', 'Pagani', ['Huayra', 'Zonda', 'Utopia'], 'compatible multi-brand diagnostics; fault-tracing and workshop scope confirmed per vehicle', 'Mercedes-AMG V12 twin-turbo platforms', 'automated manual and bespoke drivetrain systems'),
  'volkswagen-service-dubai': createAdditionalServiceProfile('volkswagen-service-dubai', 'Volkswagen', ['Golf', 'Golf GTI', 'Golf R', 'Tiguan', 'Touareg', 'Passat', 'T-Roc'], 'ODIS-compatible diagnostic access and advanced live-data testing', 'TSI petrol, TDI diesel, GTI, R, and plug-in hybrid platforms', 'DSG dual-clutch, automatic, and 4MOTION drivetrain systems'),
  'volvo-service-dubai': createAdditionalServiceProfile('volvo-service-dubai', 'Volvo', ['XC40', 'XC60', 'XC90', 'S60', 'S90', 'V60', 'EX30'], 'VIDA-compatible diagnostic access and advanced live-data testing', 'turbocharged petrol, mild-hybrid, plug-in hybrid, and electric platforms', 'automatic, hybrid, and all-wheel-drive drivetrain systems'),
  'jetour-service-dubai': createAdditionalServiceProfile('jetour-service-dubai', 'Jetour', ['T2', 'X70', 'X90 Plus', 'Dashing', 'X50'], 'compatible diagnostic access and live-data functions, confirmed per vehicle', 'turbocharged petrol and hybrid platforms', 'dual-clutch, automatic, and all-wheel-drive drivetrain systems'),
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
  'koenigsegg-service-dubai': createAdditionalServiceProfile('koenigsegg-service-dubai', 'Koenigsegg', ['Agera', 'Regera', 'Jesko', 'Gemera', 'CCX'], 'compatible diagnostic and model-specific workshop requirements confirmed before booking', 'twin-turbo V8 and high-voltage hybrid hypercar platforms', 'multi-clutch Light Speed Transmission, Direct Drive, and automated manual systems', {
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
    oilSpec: 'engine oil matched to the vehicle-specific requirement on hybrid models',
    transmissionFluid: 'electric drive-unit or hybrid transaxle fluid matched to the vehicle-specific requirement',
    brakeSystem: 'regenerative braking integrated with hydraulic ABS and electronic brake-control systems',
    suspensionType: 'independent or multi-link suspension with electronic steering and ride-height checks where fitted',
    acRefrigerant: 'vehicle-specified refrigerant confirmed from the under-bonnet label before service',
    climateNote: 'BYD battery cooling, cabin air conditioning, low-voltage systems, tyres, brakes, and suspension are inspected with Dubai heat and high cabin-cooling demand in mind.',
  }),
  'rox-service-dubai': createAdditionalServiceProfile('rox-service-dubai', 'ROX', ['ROX 01'], 'ROX-compatible diagnostics with high-voltage safety procedures, live-data testing, and module checks', 'range-extender electric, high-voltage battery, and generator-engine platforms', 'electric drive units, range-extender generator systems, and all-wheel-drive drivetrain systems', {
    engineCodes: ['range-extender electric drive', 'generator engine', 'high-voltage battery system'],
    oilSpec: 'engine oil matched to the range-extender generator requirement',
    transmissionFluid: 'electric drive-unit fluid matched to the vehicle-specific requirement',
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
    metaDescription: `${p.brandName} oil and filter service in Dubai, with oil specification, filter, reset functions and parts confirmed for the exact vehicle before work.`,
    heroCopy: `${p.brandName} oil requirements vary by engine, model year and market specification. The profile reference for these platforms is ${p.oilSpec}, but Digi-Tec verifies the VIN, handbook or under-bonnet specification before quoting oil, filter, seals and any supported service-reset function. Dubai heat, short trips and stop-start traffic can affect oil condition, so the vehicle history and use pattern are reviewed rather than applying one interval to every model. ${p.heritageLine}`,
    symptoms: [
      `${p.brandName} service reminder counting down within 1,500 km or 30 days`,
      'Oil looking dark or gritty on the dipstick, or a burnt smell after a long drive',
      `Low oil pressure warning on cold start, common on ${p.engineCodes[0]} engines that have missed a service`,
      'Ticking valvetrain noise that quietens once the engine warms up',
      'Any oil top-up over one litre between services, worth a leak inspection at the same time',
    ],
    models: p.models.slice(0, 6),
    processSteps: [
      { title: 'Confirm the vehicle specification', description: `The VIN, engine, service history and specified oil are checked before parts are ordered or work begins.` },
      { title: 'Drain, filter and sealing review', description: 'The required filter, seal or crush washer and drain-plug procedure are confirmed for the exact sump and engine.' },
      { title: 'Refill and level check', description: `Oil quantity and level-check procedure are matched to the fitted ${p.engineFamily} variant rather than assumed from the brand alone.` },
      { title: 'Supported reset and inspection', description: `A service-counter reset and additional inspection are completed only where the vehicle supports them and the agreed scope includes them; available diagnostic functions are confirmed first.` },
    ],
    partsCopy: `Oil, filter, seals and drain-plug parts are selected for the exact VIN and agreed quotation. Depending on specification and availability, the estimate may offer a genuine filter, an established OE-supplier component or another suitable customer-approved option. The proposed brand, part number and oil specification are confirmed before work.`,
    faqs: [
      { question: `How often should I change the oil on my ${p.brandName} in Dubai?`, answer: p.oilIntervalKm > 0
        ? `Follow the service reminder and handbook for the exact model, engine and year. ${p.oilIntervalKm.toLocaleString()} km is a profile reference only, not a universal interval; vehicle use, history and oil condition should be reviewed before recommending a schedule.`
        : `Follow the service reminder and handbook for the exact model, engine and year. Vehicle use, storage, service history and oil condition should be reviewed before recommending a schedule.` },
      { question: `Which oil grade does my ${p.brandName} need?`, answer: `${p.oilSpec} is a profile reference for the listed platforms, but the VIN, engine label and handbook determine the actual approval and viscosity. The specification is confirmed before the service is quoted.` },
      { question: `Do you reset the ${p.brandName} service computer?`, answer: 'A service-counter reset can be included where the fitted system supports it and compatible diagnostic access is available. The required function is confirmed from the VIN and vehicle before work.' },
      { question: 'How long does an oil change take?', answer: 'Workshop time depends on the vehicle, required parts, oil-level procedure and supported reset or inspection scope. The expected timeline is confirmed after the vehicle details are reviewed.' },
      { question: 'Can you top up between services?', answer: `A level check or top-up can be requested. The correct ${p.oilSpec} reference must still be verified for the exact vehicle, and availability or cost is confirmed at the time of the request.` },
    ],
  };
}

function composeBrakeRepair(p: BrandProfile): Composed {
  const isCarbon = /ceramic|CCB|CCM|PCCB|CSiC/i.test(p.brakeSystem);
  return {
    h1: `${p.brandName} Brake Repair Dubai`,
    metaTitle: `${p.brandName} Brake Repair Dubai | ${isCarbon ? 'Carbon-Ceramic Brake Service' : 'Pads, Discs & Fluid'} | Digi-Tec`,
    metaDescription: `${p.brandName} brake inspection and repair in Dubai. Pad, rotor, fluid, caliper, parts and supported electronic functions are confirmed for the vehicle.`,
    heroCopy: `${p.brandName} brake hardware and procedures vary by model and fitted option, including ${p.brakeSystem.toLowerCase()}. Digi-Tec begins with vehicle-specific measurements and confirms pad compound, rotor type, fluid specification, parts sourcing and any supported electronic parking-brake or sensor function before quoting repair. Carbon-ceramic systems require model-specific handling, so capability and parts are confirmed before the vehicle is accepted. ${p.heritageLine}`,
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
      { title: 'Measurement and supported scan', description: `Rotor, pad and caliper condition are measured. Electronic pad-wear or parking-brake data is read only where the vehicle and available diagnostic functions support it.` },
      { title: 'Confirm parts and compound', description: `${p.brandName} pads and rotors must match the fitted ${p.brakeSystem}. The proposed source, compound and compatibility are documented in the quotation before parts are ordered.` },
      { title: 'Fluid change and boil-point test', description: 'Full brake fluid replacement (DOT 4 LV or DOT 5.1 as your platform demands) with a refractometer boil-point test before and after, critical in Dubai summer.' },
      { title: 'Bedding-in and EPB function', description: 'The required bedding procedure, road test and any supported EPB retract or reset function are confirmed for the vehicle and included only where applicable.' },
    ],
    partsCopy: `Pads, rotors, sensors and fluid are selected for the exact VIN, fitted brake option and agreed use. The estimate may specify a genuine part, an established OE-supplier component or another suitable customer-approved option, subject to availability. Carbon-ceramic pad and rotor compatibility is confirmed before work.`,
    faqs: [
      { question: `How long do ${p.brandName} brake pads last in Dubai?`, answer: 'There is no reliable universal mileage. Pad life depends on the fitted brake system, vehicle weight, traffic, driving style, rotor condition and track use; inspection and measurement determine remaining service life.' },
      { question: `Do you fit genuine ${p.brandName} pads and rotors?`, answer: `The quotation can specify genuine ${p.brandName}, established OE-supplier or another suitable customer-approved option. Source, compound, compatibility and availability are confirmed before ordering.` },
      { question: isCarbon ? `Can you service the carbon-ceramic brake system?` : 'Do you machine or skim brake rotors?', answer: isCarbon ? 'Carbon-ceramic rotor and pad concerns can be inspected. Measurement method, compatible parts and repair availability are confirmed for the exact system before work is accepted.' : 'Whether a rotor may be machined depends on its design, condition and minimum thickness. The safe repair or replacement recommendation is made after measurement, not from the brand alone.' },
      { question: 'How often should brake fluid be changed?', answer: 'Follow the interval and fluid specification for the exact vehicle. Use, heat exposure and measured fluid condition can affect the recommendation, so no single interval is applied to every model.' },
      { question: 'How long does a full brake job take?', answer: 'Timing depends on inspection findings, fitted brake system, parts availability and any supported EPB or calibration function. The expected timeline is confirmed with the quotation.' },
      { question: `Can you fix a stuck ${p.brandName} EPB or handbrake fault?`, answer: 'An EPB or handbrake fault can be inspected. Retract, calibration, coding or motor-replacement availability depends on the fitted system and compatible access, which is confirmed before work.' },
    ],
  };
}

function composeTransmission(p: BrandProfile): Composed {
  return {
    h1: `${p.brandName} Transmission Repair Dubai`,
    metaTitle: `${p.brandName} Transmission Repair Dubai | ${p.transmissionName} | Digi-Tec`,
    metaDescription: `${p.brandName} transmission inspection, service and repair in Dubai. Fluid specification, parts, supported functions and repair scope are confirmed for the vehicle.`,
    heroCopy: `The ${p.transmissionName} in a ${p.brandName} has model-specific fluid, temperature and adaptation requirements. Digi-Tec first confirms the VIN, fitted gearbox, service history and symptoms. The specified fluid reference, fill procedure, compatible parts, supported diagnostic functions and workshop scope are then documented before service. Mechatronic, clutch-pack, torque-converter or rebuild work is recommended only after inspection, and availability is confirmed for the exact unit. ${p.heritageLine}`,
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
      { title: 'Fault-code scan and data review', description: `Available transmission codes, live data and adaptation values are reviewed using compatible diagnostic access. Supported functions vary by platform and are confirmed first.` },
      { title: 'Confirm fluid and fill procedure', description: `The applicable fluid reference, including whether ${p.transmissionFluid} is correct for the fitted unit, and its temperature-based fill procedure are verified from vehicle-specific information.` },
      { title: 'Filter, pan and magnet inspection', description: 'Where the gearbox design permits, the filter, pan, seals and magnets are inspected and compatible replacement parts are proposed after findings.' },
      { title: 'Supported adaptation and road test', description: 'Adaptation reset or relearn is carried out only when required, supported and appropriate for the repair, followed by a condition-appropriate road test.' },
    ],
    partsCopy: `Fluid, filters, gaskets, pan hardware and repair components are selected for the exact gearbox and VIN. The quotation identifies the verified fluid specification and may offer genuine, established OE-supplier, remanufactured or other suitable customer-approved components, subject to condition and availability.`,
    faqs: [
      { question: `How often should ${p.transmissionName} fluid be changed in Dubai?`, answer: 'The applicable interval depends on the exact gearbox, model year, service schedule, use and condition. We check vehicle-specific information and service history before recommending work.' },
      { question: `Do you use ${p.transmissionFluid}?`, answer: `${p.transmissionFluid} is a profile reference, not a universal fluid for every ${p.brandName}. The exact fluid and fill requirements are verified for the fitted gearbox before work.` },
      { question: `Can you rebuild a ${p.brandName} gearbox?`, answer: `The gearbox can be inspected and the appropriate repair route assessed. Mechatronic, clutch-pack, converter and rebuild availability is confirmed for the exact ${p.transmissionName} variant after diagnosis.` },
      { question: 'Will the car need a relearn drive after service?', answer: 'Only where the fitted gearbox, repair procedure and available functions require it. Any supported reset or relearn is agreed as part of the vehicle-specific scope.' },
      { question: 'How long does a transmission service take?', answer: 'Timing depends on the gearbox variant, inspection findings, fluid and parts availability, and whether additional repair or relearn work is required. An estimate is provided after the vehicle is checked.' },
      { question: `Is a transmission fluid change safe on a high-mileage ${p.brandName}?`, answer: 'Mileage alone does not determine the correct approach. Current shift behaviour, codes, fluid condition, service history and signs of internal wear must be assessed before recommending a service or repair.' },
    ],
  };
}

function composeAcRepair(p: BrandProfile): Composed {
  return {
    h1: `${p.brandName} AC Repair Dubai`,
    metaTitle: `${p.brandName} AC Repair Dubai | ${p.acRefrigerant} Service | Digi-Tec`,
    metaDescription: `${p.brandName} air-conditioning inspection and repair in Dubai. Refrigerant, equipment, parts and supported climate functions are confirmed for the vehicle.`,
    heroCopy: `Digi-Tec inspects ${p.brandName} air-conditioning concerns such as weak cooling, leaks, compressor noise, airflow problems and climate-zone faults. The refrigerant label and VIN are checked before recovery or charging because requirements vary by model and market. Equipment compatibility, parts availability, dashboard or evaporator work and any supported climate calibration are confirmed before the repair is accepted. ${p.heritageLine}`,
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
      { title: 'Performance and leak assessment', description: 'Vent temperature, airflow, pressures and relevant electrical or climate data are checked as appropriate to the complaint and fitted system.' },
      { title: 'Confirm refrigerant and equipment', description: `The underhood label and vehicle details are used to verify whether ${p.acRefrigerant} is applicable and whether compatible recovery and charging equipment is available.` },
      { title: 'Vehicle-specific repair proposal', description: 'The affected compressor, condenser, valve, evaporator, drier, blower or actuator is identified as far as testing permits, then parts and access requirements are quoted.' },
      { title: 'Recharge and supported calibration', description: 'Refrigerant and oil quantities follow the verified vehicle specification. Climate calibration or reset is included only where required and supported.' },
    ],
    partsCopy: `Compressors, condensers, valves, evaporators, driers and related components are selected for the exact VIN and fitted climate system. Genuine, established OE-supplier or other suitable customer-approved options may be quoted subject to compatibility and availability. Refrigerant type and quantity are verified from the vehicle before charging.`,
    faqs: [
      { question: `How much does ${p.brandName} AC regas cost in Dubai?`, answer: `A standard ${p.acRefrigerant} regas with UV dye leak check is priced transparently on quote. If the system is losing charge, a regas alone is not the answer: we quote the underlying repair rather than sell a temporary fix.` },
      { question: `Which refrigerant does my ${p.brandName} use?`, answer: `${p.acRefrigerant} applies to some relevant platforms, but the underhood label and vehicle details determine the correct refrigerant. It is verified before connection or charging.` },
      { question: 'Why does AC blow warm at idle but cold on the motorway?', answer: 'Possible causes include condenser airflow, cooling-fan performance, refrigerant charge, pressure control or compressor condition. Testing is needed before recommending cleaning or replacement.' },
      { question: 'How often should the AC system be serviced?', answer: 'Follow the vehicle schedule and respond to reduced performance, odour or unusual noise. Inspection, filter and refrigerant recommendations depend on the fitted system and measured condition.' },
      { question: `Do you repair ${p.brandName} rear-cabin climate zones?`, answer: `Rear-zone concerns can be inspected. Access, parts and repair availability for evaporators, valves, blowers or actuators are confirmed for the exact ${p.brandName} configuration.` },
      { question: 'How long does an AC repair take?', answer: 'Timing depends on testing, the fault location, dashboard access, compatible equipment and parts availability. The expected workshop time is confirmed after inspection.' },
    ],
  };
}

function composeSuspension(p: BrandProfile): Composed {
  const isAir = /air suspension|airmatic|air ride|EAS|Planar|self-levelling|ABC|E-ACTIVE/i.test(p.suspensionType);
  return {
    h1: `${p.brandName} Suspension Repair Dubai`,
    metaTitle: `${p.brandName} Suspension Repair Dubai | ${isAir ? 'Air Suspension Service' : 'Adaptive Damping'} | Digi-Tec`,
    metaDescription: `${p.brandName} suspension inspection and repair in Dubai. Parts, compatible diagnostic functions and calibration requirements are confirmed for the vehicle.`,
    heroCopy: `Digi-Tec inspects ${p.brandName} suspension concerns involving ${p.suspensionType.toLowerCase()}, including ride-height changes, warning messages, leaks, noise and poor handling. The exact fitted system, failed component, compatible parts and supported diagnostic or calibration functions are confirmed before repair. Air strut, compressor, valve-block, damper and sensor work depends on the model, findings and parts availability. ${p.climateNote} ${p.heritageLine}`,
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
      { title: 'Suspension inspection', description: 'Ride height, visible leaks, joints, mounts, tyres and relevant mechanical condition are checked; compatible fault data is reviewed where available.' },
      { title: 'Component-level assessment', description: `Testing narrows the concern to relevant components such as ${isAir ? 'an air strut, compressor, dryer, valve block or height sensor' : 'a damper, mount, bushing or control component'}. Further testing may be required before a final repair quote.` },
      { title: 'Confirm compatible parts', description: 'The quotation identifies suitable part options for the VIN and fitted suspension, subject to condition, source and availability.' },
      { title: 'Supported calibration and road test', description: 'Ride-height or damper calibration is included only if required and supported for the platform, followed by an appropriate alignment check and road test.' },
    ],
    partsCopy: `${isAir ? `Air struts, compressors, valve blocks and sensors are selected for the exact ${p.brandName} system.` : `Dampers, mounts, control arms and bushings are selected for the exact ${p.brandName} configuration.`} The quotation may identify genuine, established OE-supplier, upgrade or other suitable customer-approved options, with compatibility and availability confirmed before ordering.`,
    faqs: [
      { question: isAir ? `How long do ${p.brandName} air struts last in Dubai?` : `How often should ${p.brandName} shocks be replaced?`, answer: 'There is no reliable universal mileage. Heat exposure, road use, vehicle weight, leaks and component condition affect service life; inspection determines whether replacement is appropriate.' },
      { question: `Do you handle ${p.suspensionType.split(' with')[0]} systems?`, answer: `The system can be inspected and a repair route proposed. Compressor, valve-block, sensor, damper and calibration availability is confirmed for the exact ${p.brandName} platform before work.` },
      { question: 'Can you convert air suspension to coilover?', answer: isAir ? 'Compatibility, warning-light implications, ride changes and legal or insurance considerations must be reviewed for the exact vehicle before any conversion can be proposed.' : `This profile references adaptive damping rather than an air-suspension conversion. The fitted system is confirmed from the vehicle before advice is given.` },
      { question: 'Will the car need wheel alignment after suspension work?', answer: 'It depends on which components and geometry settings are disturbed. Alignment inspection or adjustment is quoted where the repair procedure or measured condition requires it.' },
      { question: 'How long does a strut or air-spring replacement take?', answer: 'Timing depends on the fitted system, inspection findings, parts availability, access and any supported calibration or alignment work. It is confirmed with the quotation.' },
      { question: 'Do you offer collection and delivery for lowered cars?', answer: 'Transport requirements can be discussed when booking. Availability, loading suitability, location, vehicle condition and the appropriate carrier must be confirmed in advance.' },
    ],
  };
}

function composeDiagnostics(p: BrandProfile): Composed {
  return {
    h1: `${p.brandName} Engine Diagnostics Dubai`,
    metaTitle: `${p.brandName} Engine Diagnostics Dubai | ${p.diagnosticTool.split(' ')[0]} | Digi-Tec`,
    metaDescription: `${p.brandName} engine diagnostics in Dubai. Compatible scan coverage, live data and supported coding or programming functions are confirmed for the vehicle.`,
    heroCopy: `Digi-Tec investigates ${p.brandName} warning lights and drivability concerns with compatible diagnostic equipment, live-data review and physical testing as appropriate. Module coverage and special functions vary by platform, software, account access and vehicle condition, so scan, coding, programming and retrofit availability are confirmed from the VIN and complaint before booking. A fault code is treated as a starting point rather than proof that a particular component has failed. ${p.heritageLine}`,
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
      { title: 'Compatible vehicle scan', description: 'Available modules, codes and freeze-frame data are collected where the vehicle and diagnostic access support them. Coverage is confirmed rather than assumed.' },
      { title: 'Live-data review', description: 'Relevant sensor and actuator values may be checked at idle or under a safe test condition. Results are interpreted alongside symptoms and physical inspection.' },
      { title: 'Component testing', description: `Where a code is ambiguous, suitable electrical, mechanical or actuator tests are proposed. A ${p.brandName} misfire, for example, can have several possible causes.` },
      { title: 'Agreed repair and verification', description: 'The repair is quoted for approval. Any supported coding, adaptation, code clearing or road-test verification required by that repair is documented in the scope.' },
    ],
    partsCopy: `Sensors, injectors, coils, modules and wiring components are specified after diagnosis. A quotation may offer genuine, established OE-supplier, remanufactured or other suitable customer-approved options. Replacement-module coding, programming, security access and configuration depend on platform support and are confirmed before parts are ordered.`,
    faqs: [
      { question: `How much does a ${p.brandName} diagnostic cost?`, answer: 'The fee depends on the complaint, required test time and module access. The initial scope, price and any relationship to a later repair quote are confirmed before testing.' },
      { question: `Can you clear the ${p.brandName} check engine light?`, answer: 'Codes can be cleared where supported, but clearing does not repair the cause and a warning may return. Findings and the recommended next step are explained before repair work.' },
      { question: 'Can you code a new ECU or module?', answer: `Coding or programming may be available for some modules. VIN compatibility, security access, software requirements, power supply and supported ${p.diagnosticTool.includes('E-Sys') ? 'configuration functions' : 'variant functions'} are checked before accepting the job.` },
      { question: 'Will you tell me what needs fixing before repair work?', answer: 'Diagnostic findings and the proposed repair scope are quoted for approval before additional repair work starts. Some intermittent or complex faults may require staged testing.' },
      { question: 'How long does a diagnostic take?', answer: 'Timing depends on the symptom, reproducibility, module communication and required mechanical or electrical testing. An initial estimate is provided and updated if staged testing is needed.' },
      { question: `Do you keep records of ${p.brandName} diagnostic sessions?`, answer: 'Available reports and record-retention details can be confirmed when booking. The information captured depends on the diagnostic platform and agreed scope.' },
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
    process: ['Vehicle inspection and compatible diagnostic scan', 'Component-level testing and a clear repair plan', 'Confirm compatible parts, required calibration, and road-test scope'],
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
    parts: 'compatible sensors, modules, wiring repairs, relays, and charging-system components',
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
    parts: 'compatible panels, trim, paint materials, and repair consumables',
  },
  'tire-repair': {
    symptoms: ['Puncture, pressure loss, vibration, or uneven wear', 'Tyre-pressure warning or sidewall damage', 'Poor handling, pulling, or noise at speed'],
    process: ['Tyre, wheel, and pressure-system inspection', 'Safe repair or correct tyre replacement recommendation', 'Balance, pressure reset, and road-test check'],
    parts: 'vehicle-compatible tyres, repair materials, valves, and wheel-balance weights',
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
    metaDescription: `${p.brandName} ${meta.name.toLowerCase()} in Dubai with vehicle-specific inspection, confirmed parts options and a clear repair quote at Digi-Tec.`,
    heroCopy: `Digi-Tec inspects ${p.brandName} ${meta.name.toLowerCase()} concerns in Dubai and confirms the vehicle-specific workshop scope before repair. Compatible scan coverage, special functions, parts, procedures and calibration requirements vary by model and are checked from the VIN, fitted system and findings. ${p.climateNote} ${p.heritageLine}`,
    symptoms: copy.symptoms,
    models: p.models.slice(0, 6),
    processSteps: copy.process.map((title) => ({ title, description: `${title} for your ${p.brandName}. Compatible ${p.diagnosticTool} functions and applicable workshop procedures are confirmed for the vehicle.` })),
    partsCopy: `Parts for ${copy.parts} are selected for the exact vehicle and agreed repair. The quotation may identify genuine, established OE-supplier, remanufactured or other suitable customer-approved options, subject to compatibility and availability.`,
    faqs: [
      { question: `Do you handle ${p.brandName} ${meta.name.toLowerCase()} in Dubai?`, answer: `The concern can be inspected and a vehicle-specific repair route proposed. Diagnostic functions, procedures, parts and repair availability are confirmed before work is accepted.` },
      { question: `How long does ${p.brandName} ${meta.name.toLowerCase()} take?`, answer: 'Timing depends on inspection findings, access, parts and any supported calibration or programming requirements. The expected timeline is confirmed with the quotation.' },
      { question: `Do you use genuine ${p.brandName} parts?`, answer: `A quotation may specify genuine ${p.brandName}, established OE-supplier, remanufactured or another suitable customer-approved option. Compatibility, source and availability are documented before ordering.` },
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

const ferrariBranding = (value: string) => value.split('Digi-Tec').join('DIGI-TEC');

function refineFerrariContent(key: ServiceKey, composed: Composed): Composed {
  const base: Composed = {
    ...composed,
    metaTitle: ferrariBranding(composed.metaTitle),
    metaDescription: ferrariBranding(composed.metaDescription),
    heroCopy: ferrariBranding(composed.heroCopy),
    partsCopy: ferrariBranding(composed.partsCopy),
    processSteps: composed.processSteps.map((step) => ({
      ...step,
      description: ferrariBranding(step.description),
    })),
    faqs: composed.faqs.map((faq) => ({
      question: ferrariBranding(faq.question),
      answer: ferrariBranding(faq.answer),
    })),
  };

  if (key === 'oil-change') {
    return {
      ...base,
      heroCopy: 'Ferrari oil approval, viscosity, quantity, filter and level procedure depend on the model, engine, year and market specification. DIGI-TEC verifies the VIN, handbook or applicable service data before quoting. Dubai use and service history are considered, but one universal oil grade or kilometre interval is not applied across the Ferrari range.',
      symptoms: [
        'A service reminder is due or the recorded maintenance history is incomplete',
        'An oil-level or oil-pressure warning appears; an oil-pressure warning requires the engine to be stopped safely',
        'Fresh oil is visible beneath the vehicle or around an inspected engine area',
        'The oil specification or quantity used at the previous service cannot be verified',
        'The vehicle has seen extended storage, repeated short trips or unusually demanding use',
      ],
      faqs: [
        { question: 'How often should Ferrari engine oil be changed in Dubai?', answer: 'Follow the schedule for the exact model, year and market, then consider documented history, use and condition. DIGI-TEC does not apply one mileage or annual interval to every Ferrari.' },
        { question: 'Which engine oil does my Ferrari need?', answer: 'The required approval, viscosity and quantity are checked against the exact model, engine, year and applicable vehicle information before service. A single grade cannot be assumed for the whole Ferrari range.' },
        { question: 'Can you reset the Ferrari service reminder?', answer: 'A supported service reset can be included where compatible access is available and the agreed service has been completed. The function is confirmed for the vehicle first.' },
        { question: 'How long does a Ferrari oil service take?', answer: 'Workshop time depends on access, parts, oil-level procedure and the agreed inspection or reset scope. The expected timing is confirmed after the vehicle details are checked.' },
        { question: 'Can you investigate an oil leak at the same visit?', answer: 'Yes, an inspection can be requested. Cleaning, tracing or further testing may be needed before the source and repair scope can be confirmed.' },
      ],
    };
  }

  if (key === 'brake-repair') {
    return {
      ...base,
      heroCopy: 'Ferrari brake hardware varies by model, generation and fitted option. The vehicle may use steel or carbon-ceramic components, so DIGI-TEC identifies the installed system and checks compatible measurement, handling, parts and fluid requirements before accepting repair work. Noise alone does not prove that a rotor or pad has failed.',
      symptoms: [
        'Brake wear or brake-system warning displayed in the instrument cluster',
        'A change in pedal feel, braking confidence or stopping behaviour',
        'Vibration through the pedal or steering wheel under repeatable braking conditions',
        'Visible fluid loss, a fluid warning or an unusually soft pedal',
        'New scraping, grinding or persistent noise that needs inspection',
        'Concern about steel or carbon-ceramic component condition after storage, road use or track use',
      ],
      processSteps: [
        { title: 'Identify the fitted brake system', description: 'The VIN, hardware and fitted option are checked before measurement methods, parts or procedures are proposed.' },
        { title: 'Inspect pads, rotors, calipers and fluid', description: 'Condition and relevant measurements are reviewed without treating one visual mark or noise as proof of failure.' },
        { title: 'Confirm parts and handling requirements', description: 'Steel and carbon-ceramic systems require different compatible components and handling. Availability and workshop scope are confirmed before work.' },
        { title: 'Verify the agreed repair', description: 'Relevant leak, pedal, warning and road-test checks are completed as appropriate to the repair and vehicle condition.' },
      ],
    };
  }

  if (key === 'transmission-repair') {
    return {
      ...base,
      heroCopy: 'Ferrari transmission architecture varies by model and generation, including single-clutch F1 systems, seven-speed dual-clutch systems and later eight-speed dual-clutch systems. DIGI-TEC identifies the fitted gearbox, reported symptom, fluid requirement and supported diagnostic data before recommending service or repair. Clutch or adaptation values are reviewed only where supported and technically meaningful for that system.',
      symptoms: [
        'Delayed or inconsistent engagement that can be reproduced and documented',
        'Harsh, missed or unexpected shifts in a repeatable operating condition',
        'A gearbox or transmission warning shown in the instrument cluster',
        'Fluid leakage or contamination identified during inspection',
        'Abnormal noise or vibration linked to a particular gear or manoeuvre',
        'Driveability changing after heat, storage, battery work or previous transmission service',
      ],
    };
  }

  if (key === 'suspension-repair') {
    return {
      ...base,
      heroCopy: 'Ferrari suspension differs across generations and may use conventional hardware or SCM/SCM-E adaptive magnetorheological damping. DIGI-TEC confirms the fitted system, symptom, visible condition, tyre influence and compatible diagnostic or calibration scope before proposing repair. Ferrari Dynamic Enhancer functions are model-specific and are not described as universal equipment.',
      symptoms: [
        'A suspension or adaptive-damping warning appears in the instrument cluster',
        'Repeatable knocking, clunking or creaking over a particular road input',
        'A change in ride quality, stability or response between supported drive settings',
        'Visible damper leakage or damage found during inspection',
        'Uneven tyre wear, alignment change or steering pull',
        'Handling changed after an impact, tyre replacement or previous suspension work',
      ],
    };
  }

  return base;
}

export function getBrandServiceCombo(brandSlug: string, serviceSlug: string): BrandServiceCombo | undefined {
  const profile = BRAND_PROFILES[brandSlug];
  if (!profile) return undefined;
  const availableServices = getAvailableServiceKeys(brandSlug);
  if (!(availableServices as string[]).includes(serviceSlug)) return undefined;
  const key = serviceSlug as ServiceKey;
  const meta = SERVICE_META[key];
  const composed = brandSlug === 'ferrari-service-dubai'
    ? refineFerrariContent(key, COMPOSERS[key](profile))
    : COMPOSERS[key](profile);
  const isRoxSoftClose = brandSlug === 'rox-service-dubai' && key === 'soft-close-door-installation';
  const displayBrand = brandSlug === 'ferrari-service-dubai' ? 'DIGI-TEC' : 'Digi-Tec';
  const whatsAppMessage = `Hi, I would like to enquire about ${profile.brandName} ${meta.label} at ${displayBrand} Performance Centre.`;
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
        { question: 'Can you install soft close doors on a ROX 01 in Dubai?', answer: 'Compatibility, door fitment, wiring, component availability and installation scope are inspected first. A clear installation proposal is provided only when the vehicle and selected system are suitable.' },
        { question: 'Can you repair a ROX soft close door that is not working?', answer: 'The fault can be inspected for latch, actuator, wiring, sensor and alignment concerns. Repair availability and parts are confirmed after diagnosis.' },
        { question: 'How long does ROX 01 soft close installation take?', answer: 'Timing depends on the number of doors, the selected components and the vehicle inspection. We confirm the installation plan and timeline after checking your ROX 01.' },
        { question: 'Where can I find ROX soft close installation near me in Dubai?', answer: 'Digi-Tec Performance Centre is in Al Quoz Industrial Area 3, Dubai. Contact us by WhatsApp or phone to arrange a ROX 01 soft close compatibility inspection.' },
        { question: 'Do you work on ROX 01 door latches and comfort-system wiring?', answer: 'Latch, actuator, wiring, sensor, alignment and related comfort-system concerns can be inspected. The supported repair scope is confirmed for the vehicle.' },
      ],
    } : {
      metaTitle: `${profile.brandName} ${meta.name} Dubai | ${displayBrand}`,
      metaDescription: `${profile.brandName} ${meta.name.toLowerCase()} in Dubai with model-specific inspection, confirmed parts options and a clear quote at ${displayBrand}, Al Quoz.`,
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
