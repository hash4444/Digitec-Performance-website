export type Stage = 'stock' | 'stage1' | 'stage2' | 'stage3' | 'stage4' | 'stage5' | 'vip';

export interface PerformanceSpec {
  hp: number;
  torque: number;
  zeroToHundred: number;
}

export interface StageInfo {
  spec: PerformanceSpec;
  mods: string[];
  price: string;
  time: string;
  powerCurve: { rpm: number; power: number; torque: number }[];
}

export interface TuningCar {
  id: string;
  name: string;
  brand: string;
  engine: string;
  image: string;
  stages: Partial<Record<Stage, StageInfo>>;
  availableStages: Stage[];
}

const mercedesImage = '/images/cars/mercedes-c63.png';
const bmwImage = '/images/cars/bmw-m3.png';
const audiImage = '/images/cars/audi-rs6.png';
const porscheImage = '/images/cars/porsche-911.png';

function generatePowerCurve(basePower: number, baseTorque: number): { rpm: number; power: number; torque: number }[] {
  return [
    { rpm: 2000, power: Math.round(basePower * 0.35), torque: Math.round(baseTorque * 0.7) },
    { rpm: 3000, power: Math.round(basePower * 0.55), torque: Math.round(baseTorque * 0.85) },
    { rpm: 4000, power: Math.round(basePower * 0.72), torque: Math.round(baseTorque * 0.95) },
    { rpm: 5000, power: Math.round(basePower * 0.88), torque: Math.round(baseTorque * 1.0) },
    { rpm: 6000, power: Math.round(basePower * 0.97), torque: Math.round(baseTorque * 0.92) },
    { rpm: 7000, power: Math.round(basePower * 1.0), torque: Math.round(baseTorque * 0.82) },
    { rpm: 8000, power: Math.round(basePower * 0.92), torque: Math.round(baseTorque * 0.7) },
  ];
}

function mkStage(hp: number, torque: number, zeroToHundred: number, mods: string[], price: string, time: string): StageInfo {
  return {
    spec: { hp, torque, zeroToHundred },
    mods,
    price,
    time,
    powerCurve: generatePowerCurve(hp, torque),
  };
}

export const tuningCars: TuningCar[] = [
  // ── C190/R190 GT/GTS M178 ──
  {
    id: 'amg-gt-gts',
    name: 'AMG GT / GTS',
    brand: 'Mercedes',
    engine: 'M178',
    image: mercedesImage,
    availableStages: ['stock', 'stage1', 'stage2', 'stage3', 'stage4', 'stage5', 'vip'],
    stages: {
      stock: mkStage(522, 670, 3.7, ['Factory Specifications'], '—', '—'),
      stage1: mkStage(605, 750, 3.4, [
        'Airfilter', 'Optimization of engine software', 'Deactivation of the speed limiter V-Max',
      ], '€2,721', '1–2 days'),
      stage2: mkStage(620, 780, 3.3, [
        'Airfilter', 'Optimization of engine software', 'Deactivation of the speed limiter V-Max',
        'Downpipe with sport catalytic converter', 'Heat coating for downpipe',
        'Transmission software optimization (TCU)',
      ], '€10,721 total', '3–5 days'),
      stage3: mkStage(760, 900, 3.0, [
        'Airfilter', 'Optimization of engine software', 'Deactivation of the speed limiter V-Max',
        'Downpipe with sport catalytic converter', 'Pulse Flow exhaust manifold',
        'Twin Scroll GAD Turbocharger (GAD 177 55/63)', 'Heat coating for downpipe',
        'High pressure fuel system with increased flow',
        'TCU-Software', 'Stage 1 GAD SLS/GTS/GTR double-clutch reinforcement (~1200 Nm)',
      ], '€32,221 total', '7–14 days'),
      stage4: mkStage(840, 1000, 2.8, [
        'Airfilter', 'Optimization of engine software', 'Deactivation of the speed limiter V-Max',
        'Downpipe with sport catalytic converter', 'Heat coating for downpipe',
        'GAD Upgrade Twin Scroll turbocharger (GAD 177 55/68)', 'Pulse Flow exhaust manifold',
        'High pressure fuel system with increased flow', 'GAD forged pistons with lower compression',
        'TCU-Software', 'Stage 1 GAD SLS/GTS/GTR double-clutch reinforcement (~1200 Nm)',
      ], '€45,121 total', '14–21 days'),
      stage5: mkStage(920, 1100, 2.6, [
        'Airfilter', 'Optimization of engine software', 'Deactivation of the speed limiter V-Max',
        'Downpipe with sport catalytic converter', 'Heat coating for downpipe',
        'GAD ball-bearing Twin Scroll turbocharger (GAD 177 60/76R)', 'Pulse Flow exhaust manifold',
        'High pressure fuel system with increased flow', 'Engine gasket set',
        'GAD forged pistons with lower compression', 'GAD optimized cylinder heads with larger channels',
        'Cylinder head bolts', 'Oil & Oilfilter',
        'TCU-Software', 'Stage 1 GAD SLS/GTS/GTR double-clutch reinforcement (~1200 Nm)',
      ], '€51,991 total', '3–6 weeks'),
      vip: mkStage(1300, 1400, 2.2, [
        'Full Custom Build', 'Bespoke ECU Calibration', 'Dyno Testing & Validation',
        'Exclusive tuning on individual request', 'Send VIN for availability',
      ], 'On Request', '6–10 weeks'),
    },
  },

  // ── C190/R190 GTC/GTR M178 ──
  {
    id: 'amg-gtc-gtr',
    name: 'AMG GTC / GTR',
    brand: 'Mercedes',
    engine: 'M178',
    image: mercedesImage,
    availableStages: ['stock', 'stage1', 'stage2', 'stage3', 'stage4', 'stage5', 'vip'],
    stages: {
      stock: mkStage(557, 700, 3.6, ['Factory Specifications'], '—', '—'),
      stage1: mkStage(640, 800, 3.3, [
        'Airfilter', 'Optimization of engine software', 'Deactivation of the speed limiter V-Max',
      ], '€2,721', '1–2 days'),
      stage2: mkStage(660, 830, 3.2, [
        'Airfilter', 'Optimization of engine software', 'Deactivation of the speed limiter V-Max',
        'Downpipe with sport catalytic converter', 'Heat coating for downpipe',
        'Transmission software optimization (TCU)',
      ], '€10,721 total', '3–5 days'),
      stage3: mkStage(780, 950, 2.9, [
        'Airfilter', 'Optimization of engine software', 'Deactivation of the speed limiter V-Max',
        'Downpipe with sport catalytic converter', 'Pulse Flow exhaust manifold',
        'Twin Scroll GAD Turbocharger (GAD 177 55/63)', 'Heat coating for downpipe',
        'High pressure fuel system with increased flow',
        'TCU-Software', 'Stage 1 GAD SLS/GTS/GTR double-clutch reinforcement (~1200 Nm)',
      ], '€32,221 total', '7–14 days'),
      stage4: mkStage(840, 1000, 2.7, [
        'Airfilter', 'Optimization of engine software', 'Deactivation of the speed limiter V-Max',
        'Downpipe with sport catalytic converter', 'Heat coating for downpipe',
        'GAD Upgrade Twin Scroll turbocharger (GAD 177 55/68)', 'Pulse Flow exhaust manifold',
        'High pressure fuel system with increased flow', 'GAD forged pistons with lower compression',
        'TCU-Software', 'Stage 1 GAD SLS/GTS/GTR double-clutch reinforcement (~1200 Nm)',
      ], '€45,121 total', '14–21 days'),
      stage5: mkStage(920, 1100, 2.5, [
        'Airfilter', 'Optimization of engine software', 'Deactivation of the speed limiter V-Max',
        'Downpipe with sport catalytic converter', 'Heat coating for downpipe',
        'GAD ball-bearing Twin Scroll turbocharger (GAD 177 60/76R)', 'Pulse Flow exhaust manifold',
        'High pressure fuel system with increased flow', 'Engine gasket set',
        'GAD forged pistons with lower compression', 'GAD optimized cylinder heads with larger channels',
        'Cylinder head bolts', 'Oil & Oilfilter',
        'TCU-Software', 'Stage 1 GAD SLS/GTS/GTR double-clutch reinforcement (~1200 Nm)',
      ], '€51,991 total', '3–6 weeks'),
      vip: mkStage(1300, 1400, 2.1, [
        'Full Custom Build', 'Bespoke ECU Calibration', 'Dyno Testing & Validation',
        'Exclusive tuning on individual request', 'Send VIN for availability',
      ], 'On Request', '6–10 weeks'),
    },
  },

  // ── W213 E63 M177 ──
  {
    id: 'e63',
    name: 'E63 AMG',
    brand: 'Mercedes',
    engine: 'M177',
    image: mercedesImage,
    availableStages: ['stock', 'stage1', 'stage2', 'stage3', 'stage4', 'vip'],
    stages: {
      stock: mkStage(612, 850, 3.4, ['Factory Specifications'], '—', '—'),
      stage1: mkStage(780, 1000, 3.0, [
        'Airfilter', 'Optimization of engine software', 'Deactivation of the speed limiter V-Max',
        'Software for CPC (central powertrain controller)',
      ], '€5,663', '1–2 days'),
      stage2: mkStage(820, 1050, 2.9, [
        'Airfilter', 'Optimization of engine software', 'Deactivation of the speed limiter V-Max',
        'Downpipe with sport catalytic converter', 'Special ceramic heat coating',
        'Software for CPC (central powertrain controller)',
      ], '€12,563 total', '3–5 days'),
      stage3: mkStage(860, 1100, 2.7, [
        'Airfilter', 'Optimization of engine software', 'Deactivation of the speed limiter V-Max',
        'Downpipe with sport catalytic converter', 'Special ceramic heat coating',
        'Software for CPC', 'Upgrade Twin Scroll Turbocharger GAD 177 55/68',
        'TCU-Software', 'Stage 1 Automatic transmission NAG 3 reinforcement (~1150 Nm)',
      ], '€27,076 total', '7–14 days'),
      stage4: mkStage(940, 1200, 2.5, [
        'Airfilter', 'Optimization of engine software', 'Deactivation of the speed limiter V-Max',
        'Downpipe with sport catalytic converter', 'Special ceramic heat coating',
        'Software for CPC', 'Upgrade Twin Scroll Turbocharger GAD 177 60/76R',
        'High pressure fuel system with increased flow',
        'TCU-Software', 'Stage 1 Automatic transmission NAG 3 reinforcement (~1150 Nm)',
      ], '€36,576 total', '14–21 days'),
      vip: mkStage(1300, 1500, 2.2, [
        'Full Custom Build – up to 1300 hp', 'Bespoke ECU Calibration',
        'Dyno Testing & Validation', 'Exclusive tuning on individual request',
      ], 'On Request', '6–10 weeks'),
    },
  },

  // ── W463 G63 M177 ──
  {
    id: 'g63',
    name: 'G63 AMG',
    brand: 'Mercedes',
    engine: 'M177',
    image: mercedesImage,
    availableStages: ['stock', 'stage1', 'stage2', 'stage3', 'stage4', 'vip'],
    stages: {
      stock: mkStage(585, 850, 4.5, ['Factory Specifications'], '—', '—'),
      stage1: mkStage(780, 1000, 3.8, [
        'Airfilter', 'Optimization of engine software', 'Deactivation of the speed limiter V-Max',
        'Software for CPC (central powertrain controller)',
      ], '€5,663', '1–2 days'),
      stage2: mkStage(820, 1050, 3.6, [
        'Airfilter', 'Optimization of engine software', 'Deactivation of the speed limiter V-Max',
        'Downpipe with sport catalytic converter', 'Special ceramic heat coating',
        'Software for CPC', 'Optimization of the exhaust system',
      ], '€14,063 total', '3–5 days'),
      stage3: mkStage(860, 1100, 3.4, [
        'Airfilter', 'Optimization of engine software', 'Deactivation of the speed limiter V-Max',
        'Downpipe with sport catalytic converter', 'Special ceramic heat coating',
        'Software for CPC', 'Upgrade Twin Scroll Turbocharger GAD 177 55/68',
        'Optimization of the exhaust system',
        'TCU-Software', 'Stage 1 Automatic transmission NAG 3 reinforcement (~1150 Nm)',
      ], '€28,576 total', '7–14 days'),
      stage4: mkStage(940, 1200, 3.2, [
        'Airfilter', 'Optimization of engine software', 'Deactivation of the speed limiter V-Max',
        'Downpipe with sport catalytic converter', 'Special ceramic heat coating',
        'Software for CPC', 'Optimization of the exhaust system',
        'GAD Twin Scroll Turbocharger GAD 177 60/76R',
        'High pressure fuel system with increased flow',
        'TCU-Software', 'Stage 1 Automatic transmission NAG 3 reinforcement (~1150 Nm)',
      ], '€38,076 total', '14–21 days'),
      vip: mkStage(1100, 1350, 2.9, [
        'Full Custom Build – 1100+ hp', 'Bespoke ECU Calibration',
        'Dyno Testing & Validation', 'Exclusive tuning on individual request',
      ], 'On Request', '6–10 weeks'),
    },
  },

  // ── X290 GT63 M177 (AMG GT 4-Door) ──
  {
    id: 'gt63',
    name: 'AMG GT63 4-Door',
    brand: 'Mercedes',
    engine: 'M177',
    image: mercedesImage,
    availableStages: ['stock', 'stage1', 'stage2', 'stage3', 'stage4', 'vip'],
    stages: {
      stock: mkStage(630, 900, 3.2, ['Factory Specifications'], '—', '—'),
      stage1: mkStage(780, 1000, 2.9, [
        'Airfilter', 'Optimization of engine software', 'Deactivation of the speed limiter V-Max',
        'Software for CPC (central powertrain controller)',
      ], '€5,663', '1–2 days'),
      stage2: mkStage(820, 1050, 2.8, [
        'Airfilter', 'Optimization of engine software', 'Deactivation of the speed limiter V-Max',
        'Downpipe with sport catalytic converter', 'Special ceramic heat coating',
        'Software for CPC',
      ], '€12,563 total', '3–5 days'),
      stage3: mkStage(860, 1100, 2.6, [
        'Airfilter', 'Optimization of engine software', 'Deactivation of the speed limiter V-Max',
        'Downpipe with sport catalytic converter', 'Special ceramic heat coating',
        'Software for CPC', 'Upgrade Twin Scroll Turbocharger GAD 177 55/68',
        'TCU-Software', 'Stage 1 Automatic transmission NAG 3 reinforcement (~1150 Nm)',
      ], '€27,076 total', '7–14 days'),
      stage4: mkStage(940, 1200, 2.4, [
        'Airfilter', 'Optimization of engine software', 'Deactivation of the speed limiter V-Max',
        'Downpipe with sport catalytic converter', 'Special ceramic heat coating',
        'Software for CPC', 'Upgrade Twin Scroll Turbocharger GAD 177 60/76R',
        'High pressure fuel system with increased flow',
        'TCU-Software', 'Stage 1 Automatic transmission NAG 3 reinforcement (~1150 Nm)',
      ], '€36,576 total', '14–21 days'),
      vip: mkStage(1000, 1300, 2.2, [
        'Full Custom Build – 1000+ hp', 'Bespoke ECU Calibration',
        'Dyno Testing & Validation', 'Exclusive tuning on individual request',
      ], 'On Request', '6–10 weeks'),
    },
  },

  // ── W222 S63 M177 ──
  {
    id: 's63',
    name: 'S63 AMG',
    brand: 'Mercedes',
    engine: 'M177',
    image: mercedesImage,
    availableStages: ['stock', 'stage1', 'stage2', 'stage3', 'stage4', 'vip'],
    stages: {
      stock: mkStage(612, 900, 3.5, ['Factory Specifications'], '—', '—'),
      stage1: mkStage(780, 1000, 3.1, [
        'Airfilter', 'Optimization of engine software', 'Deactivation of the speed limiter V-Max',
        'Software for CPC (central powertrain controller)',
      ], '€5,663', '1–2 days'),
      stage2: mkStage(820, 1050, 3.0, [
        'Airfilter', 'Optimization of engine software', 'Deactivation of the speed limiter V-Max',
        'Downpipe with sport catalytic converter', 'Special ceramic heat coating',
        'Software for CPC',
      ], '€12,563 total', '3–5 days'),
      stage3: mkStage(860, 1100, 2.8, [
        'Airfilter', 'Optimization of engine software', 'Deactivation of the speed limiter V-Max',
        'Downpipe with sport catalytic converter', 'Special ceramic heat coating',
        'Software for CPC', 'Upgrade Twin Scroll Turbocharger GAD 177 55/68',
        'TCU-Software', 'Stage 1 Automatic transmission NAG 3 reinforcement (~1150 Nm)',
      ], '€27,076 total', '7–14 days'),
      stage4: mkStage(940, 1200, 2.6, [
        'Airfilter', 'Optimization of engine software', 'Deactivation of the speed limiter V-Max',
        'Downpipe with sport catalytic converter', 'Special ceramic heat coating',
        'Software for CPC', 'Upgrade Twin Scroll Turbocharger GAD 177 60/76R',
        'High pressure fuel system with increased flow',
        'TCU-Software', 'Stage 1 Automatic transmission NAG 3 reinforcement (~1150 Nm)',
      ], '€36,576 total', '14–21 days'),
      vip: mkStage(1000, 1300, 2.4, [
        'Full Custom Build – 1000+ hp', 'Bespoke ECU Calibration',
        'Dyno Testing & Validation', 'Exclusive tuning on individual request',
      ], 'On Request', '6–10 weeks'),
    },
  },

  // ── W222/W217 S65 M279 ──
  {
    id: 's65',
    name: 'S65 AMG',
    brand: 'Mercedes',
    engine: 'M279',
    image: mercedesImage,
    availableStages: ['stock', 'stage1', 'stage2', 'stage3', 'stage4', 'stage5'],
    stages: {
      stock: mkStage(630, 1000, 4.1, ['Factory Specifications'], '—', '—'),
      stage1: mkStage(680, 1050, 3.8, [
        'Airfilter', 'Optimization of engine software', 'Deactivation of the speed limiter V-Max',
      ], '€3,350', '1–2 days'),
      stage2: mkStage(720, 1100, 3.6, [
        'Airfilter', 'Optimization of engine software', 'Deactivation of the speed limiter V-Max',
        'Downpipe with sport catalytic converter',
        'Adjustment of the PCM (Powertrain control module)',
        'TCU-Software',
      ], '€18,350 total', '3–5 days'),
      stage3: mkStage(800, 1200, 3.3, [
        'Airfilter', 'Optimization of engine software', 'Deactivation of the speed limiter V-Max',
        'Downpipe with sport catalytic converter',
        'Upgrade turbocharger (GAD 279 60/76R)', 'Adjustment of the PCM',
        'TCU-Software', 'Stage 1 GAD reinforcement NAG2 (7G-Tronic) with torque converter (~1250 Nm)',
      ], '€43,613 total', '7–14 days'),
      stage4: mkStage(850, 1300, 3.1, [
        'GAD Airfilter box', 'Optimization of engine software', 'Deactivation of the speed limiter V-Max',
        'Downpipe with sport catalytic converter',
        'Upgrade turbocharger (GAD 279 60/76R)', 'Adjustment of the PCM',
        'Optimization of the low-temperature circuit',
        'TCU-Software', 'Stage 1 GAD reinforcement NAG2 (7G-Tronic) (~1250 Nm)',
      ], '€54,713 total', '14–21 days'),
      stage5: mkStage(900, 1400, 2.9, [
        'GAD Airfilter box', 'Optimization of engine software', 'Deactivation of the speed limiter V-Max',
        'Downpipe with sport catalytic converter',
        'Upgrade turbocharger (GAD 279 60/76R)', 'Adjustment of the PCM',
        'Optimization of the low-temperature circuit', 'High Performance Intercooler',
        'TCU-Software', 'Stage 2 GAD reinforcement NAG2 (7G-Tronic) (~1400 Nm)',
      ], '€72,468 total', '3–6 weeks'),
    },
  },

  // ── W205 C63 M177 ──
  {
    id: 'c63-w205',
    name: 'C63 AMG (W205)',
    brand: 'Mercedes',
    engine: 'M177',
    image: mercedesImage,
    availableStages: ['stock', 'stage1', 'stage2', 'stage3', 'stage4', 'stage5', 'vip'],
    stages: {
      stock: mkStage(476, 650, 4.0, ['Factory Specifications'], '—', '—'),
      stage1: mkStage(590, 780, 3.6, [
        'Airfilter', 'Optimization of engine software', 'Deactivation of the speed limiter V-Max',
      ], '€3,146 total', '1–2 days'),
      stage2: mkStage(615, 810, 3.5, [
        'Airfilter', 'Optimization of engine software', 'Deactivation of the speed limiter V-Max',
        'Downpipe with sport catalytic converter', 'Special ceramic heat coating',
      ], '€8,732 total', '3–5 days'),
      stage3: mkStage(700, 900, 3.2, [
        'Airfilter', 'Optimization of engine software', 'Deactivation of the speed limiter V-Max',
        'Downpipe with sport catalytic converter',
        'Upgrade turbocharger (GAD 177 50/63)', 'Special ceramic heat coating',
        'TCU-Software', 'Stage 1 GAD transmission reinforcement MCT (~1100 Nm)',
      ], '€17,876 total', '7–14 days'),
      stage4: mkStage(795, 1000, 2.9, [
        'Open airboxes', 'Optimization of engine software', 'Deactivation of the speed limiter V-Max',
        'Downpipe with sport catalytic converter', 'Special ceramic heat coating',
        'Twin Scroll GAD Turbocharger (GAD 177 55/63)', 'Pulse Flow exhaust manifold',
        'High pressure fuel system with increased flow',
        'TCU-Software', 'Stage 1 GAD transmission reinforcement MCT (~1100 Nm)',
      ], '€33,460 total', '14–21 days'),
      stage5: mkStage(850, 1100, 2.7, [
        'Open airboxes', 'Optimization of engine software', 'Deactivation of the speed limiter V-Max',
        'Downpipe with sport catalytic converter',
        'GAD upgrade Twinscroll Turbocharger (GAD 177 55/68)', 'Pulse Flow exhaust manifold',
        'Special ceramic heat coating', 'High pressure fuel system with increased flow',
        'GAD forged pistons with lower compression', 'Cylinder head bolts',
        'Engine gasket set', 'Oil & Oil filter',
        'TCU-Software', 'Stage 2 GAD transmission reinforcement MCT with wet clutch (~1350 Nm)',
      ], '€53,435 total', '3–6 weeks'),
      vip: mkStage(1000, 1250, 2.5, [
        'Full Custom Build – 1000+ hp', 'Bespoke ECU Calibration',
        'Dyno Testing & Validation', 'Exclusive tuning on individual request',
      ], 'On Request', '6–10 weeks'),
    },
  },

  // ── W253 GLC63 M177 ──
  {
    id: 'glc63',
    name: 'GLC63 AMG',
    brand: 'Mercedes',
    engine: 'M177',
    image: mercedesImage,
    availableStages: ['stock', 'stage1', 'stage2', 'stage3', 'stage4', 'stage5'],
    stages: {
      stock: mkStage(476, 650, 3.8, ['Factory Specifications'], '—', '—'),
      stage1: mkStage(590, 780, 3.4, [
        'Airfilter', 'Optimization of engine software', 'Deactivation of the speed limiter V-Max',
      ], '€3,146 total', '1–2 days'),
      stage2: mkStage(615, 810, 3.3, [
        'Airfilter', 'Optimization of engine software', 'Deactivation of the speed limiter V-Max',
        'Downpipe with sport catalytic converter', 'Special ceramic heat coating',
      ], '€7,471 total', '3–5 days'),
      stage3: mkStage(700, 900, 3.0, [
        'Airfilter', 'Optimization of engine software', 'Deactivation of the speed limiter V-Max',
        'Downpipe with sport catalytic converter',
        'Upgrade turbocharger (GAD 177 50/63)', 'Special ceramic heat coating',
        'TCU-Software', 'GAD transmission reinforcement (~1250 Nm)',
      ], '€17,876–€19,346 total', '7–14 days'),
      stage4: mkStage(795, 1000, 2.8, [
        'Open airboxes', 'Optimization of engine software', 'Deactivation of the speed limiter V-Max',
        'Downpipe with sport catalytic converter',
        'Twin Scroll GAD Turbocharger (GAD 177 55/63)', 'Pulse Flow exhaust manifold',
        'Special ceramic heat coating', 'High pressure fuel system with increased flow',
        'TCU-Software', 'GAD transmission reinforcement (~1250 Nm)',
      ], '€33,335–€34,805 total', '14–21 days'),
      stage5: mkStage(850, 1100, 2.6, [
        'Open airboxes', 'Optimization of engine software', 'Deactivation of the speed limiter V-Max',
        'Downpipe with sport catalytic converter',
        'GAD TwinScroll Turbocharger (GAD 177 55/68)', 'Pulse Flow exhaust manifold',
        'Special ceramic heat coating', 'High pressure fuel system with increased flow',
        'GAD forged pistons with lower compression', 'Cylinder head bolts',
        'Engine gasket set', 'Oil & Oil filter',
        'TCU-Software', 'GAD transmission reinforcement (~1250 Nm)',
      ], '€51,335–€52,805 total', '3–6 weeks'),
    },
  },

  // ── W205 C43 M276 ──
  {
    id: 'c43',
    name: 'C43 AMG (W205)',
    brand: 'Mercedes',
    engine: 'M276',
    image: mercedesImage,
    availableStages: ['stock', 'stage1', 'stage2'],
    stages: {
      stock: mkStage(390, 520, 4.7, ['Factory Specifications'], '—', '—'),
      stage1: mkStage(450, 580, 4.3, [
        'Airfilter', 'Optimization of engine software', 'Deactivation of the speed limiter V-Max',
      ], '€2,110', '1–2 days'),
      stage2: mkStage(500, 650, 3.9, [
        'Airfilter', 'Optimization of engine software', 'Deactivation of the speed limiter V-Max',
        'Turbocharger upgrade', 'GAD high pressure pump', 'Exhaust system',
      ], '€16,350 total', '5–7 days'),
    },
  },

  // ── W205 C450 M276 ──
  {
    id: 'c450',
    name: 'C450 AMG (W205)',
    brand: 'Mercedes',
    engine: 'M276',
    image: mercedesImage,
    availableStages: ['stock', 'stage1', 'stage2'],
    stages: {
      stock: mkStage(367, 520, 4.9, ['Factory Specifications'], '—', '—'),
      stage1: mkStage(450, 580, 4.4, [
        'Airfilter', 'Optimization of engine software', 'Deactivation of the speed limiter V-Max',
      ], '€2,110', '1–2 days'),
      stage2: mkStage(500, 650, 4.0, [
        'Airfilter', 'Optimization of engine software', 'Deactivation of the speed limiter V-Max',
        'Turbocharger upgrade', 'GAD high pressure pump', 'Exhaust system',
      ], '€16,350 total', '5–7 days'),
    },
  },

  // ── W205 C400 M276 ──
  {
    id: 'c400',
    name: 'C400 (W205)',
    brand: 'Mercedes',
    engine: 'M276',
    image: mercedesImage,
    availableStages: ['stock', 'stage1', 'stage2'],
    stages: {
      stock: mkStage(333, 480, 5.2, ['Factory Specifications'], '—', '—'),
      stage1: mkStage(420, 560, 4.6, [
        'Airfilter', 'Optimization of engine software', 'Deactivation of the speed limiter V-Max',
      ], '€2,110', '1–2 days'),
      stage2: mkStage(500, 650, 4.1, [
        'Airfilter', 'Optimization of engine software', 'Deactivation of the speed limiter V-Max',
        'Turbocharger upgrade', 'GAD high pressure pump', 'Exhaust system',
      ], '€16,350 total', '5–7 days'),
    },
  },

  // ── W117 CLA45 M133 ──
  {
    id: 'cla45',
    name: 'CLA45 AMG',
    brand: 'Mercedes',
    engine: 'M133',
    image: mercedesImage,
    availableStages: ['stock', 'stage1', 'stage2'],
    stages: {
      stock: mkStage(381, 475, 4.2, ['Factory Specifications'], '—', '—'),
      stage1: mkStage(427, 530, 3.9, [
        'Airfilter', 'Optimization of engine software', 'Deactivation of the speed limiter V-Max',
      ], '€2,353', '1–2 days'),
      stage2: mkStage(457, 560, 3.7, [
        'Airfilter', 'Optimization of engine software', 'Deactivation of the speed limiter V-Max',
        'Downpipe with sport catalytic converter',
      ], '€6,153 total', '3–5 days'),
    },
  },

  // ── W176 A45 M133 ──
  {
    id: 'a45',
    name: 'A45 AMG',
    brand: 'Mercedes',
    engine: 'M133',
    image: mercedesImage,
    availableStages: ['stock', 'stage1', 'stage2'],
    stages: {
      stock: mkStage(381, 475, 4.2, ['Factory Specifications'], '—', '—'),
      stage1: mkStage(427, 530, 3.9, [
        'Airfilter', 'Optimization of engine software', 'Deactivation of the speed limiter V-Max',
      ], '€2,353', '1–2 days'),
      stage2: mkStage(457, 560, 3.7, [
        'Airfilter', 'Optimization of engine software', 'Deactivation of the speed limiter V-Max',
        'Downpipe with sport catalytic converter',
      ], '€6,153 total', '3–5 days'),
    },
  },

  // ── Aston Martin DB11 ──
  {
    id: 'db11',
    name: 'Aston Martin DB11',
    brand: 'Aston Martin',
    engine: 'M177',
    image: mercedesImage,
    availableStages: ['stock', 'stage1', 'stage2', 'stage3', 'stage4', 'stage5'],
    stages: {
      stock: mkStage(503, 675, 3.9, ['Factory Specifications'], '—', '—'),
      stage1: mkStage(590, 750, 3.5, [
        'Airfilter', 'Optimization of engine software', 'Deactivation of the speed limiter V-Max',
      ], '€3,346 total', '1–2 days'),
      stage2: mkStage(615, 790, 3.4, [
        'Airfilter', 'Optimization of engine software', 'Deactivation of the speed limiter V-Max',
        'Downpipe with sport catalytic converter', 'Special ceramic heat coating',
        'Transmission software optimization (TCU)',
      ], '€10,232 total', '3–5 days'),
      stage3: mkStage(700, 900, 3.1, [
        'Airfilter', 'Optimization of engine software', 'Deactivation of the speed limiter V-Max',
        'Downpipe with sport catalytic converter',
        'Upgrade turbocharger (GAD 177 50/63)', 'Special ceramic heat coating',
        'TCU-Software', 'Stage 1 GAD transmission reinforcement MCT (~1100 Nm)',
      ], '€18,333 total', '7–14 days'),
      stage4: mkStage(795, 1000, 2.8, [
        'Open airboxes', 'Optimization of engine software', 'Deactivation of the speed limiter V-Max',
        'Downpipe with sport catalytic converter',
        'Twin Scroll GAD Turbocharger (GAD 177 55/63)', 'Pulse Flow exhaust manifold',
        'Special ceramic heat coating', 'High pressure fuel system with increased flow',
        'TCU-Software', 'Stage 1 GAD transmission reinforcement MCT (~1100 Nm)',
      ], '€33,792 total', '14–21 days'),
      stage5: mkStage(850, 1100, 2.6, [
        'Open airboxes', 'Optimization of engine software', 'Deactivation of the speed limiter V-Max',
        'Downpipe with sport catalytic converter',
        'GAD upgrade Twinscroll Turbocharger (GAD 177 55/68)', 'Pulse Flow exhaust manifold',
        'Special ceramic heat coating', 'High pressure fuel system with increased flow',
        'GAD forged pistons with lower compression', 'Cylinder head bolts',
        'Engine gasket set', 'Oil & Oilfilter',
        'TCU-Software', 'Stage 2 GAD transmission reinforcement MCT with wet clutch (~1350 Nm)',
      ], '€56,435 total', '3–6 weeks'),
    },
  },

  // ── Lamborghini Urus ──
  {
    id: 'urus',
    name: 'Lamborghini Urus',
    brand: 'Lamborghini',
    engine: 'V8 Twin-Turbo',
    image: porscheImage,
    availableStages: ['stock', 'stage1', 'stage2', 'stage3', 'stage4'],
    stages: {
      stock: mkStage(650, 850, 3.6, ['Factory Specifications'], '—', '—'),
      stage1: mkStage(750, 950, 3.3, [
        'Optimization of engine software',
      ], '€5,418 total', '1–2 days'),
      stage2: mkStage(800, 1000, 3.1, [
        'Airfilter', 'Optimization of engine software',
        'Downpipe with sport catalytic converter', 'Special ceramic heat coating',
      ], '€13,842 total', '3–5 days'),
      stage3: mkStage(870, 1100, 2.9, [
        'Airfilter', 'Optimization of engine software',
        'Downpipe with sport catalytic converter', 'Special ceramic heat coating',
        'GAD Upgrade ball-bearing Twin Scroll Turbocharger (GAD 825-60/71R)',
        'Turbo installation kit (cooling water and oil lines)',
      ], '€26,842 total', '7–14 days'),
      stage4: mkStage(904, 1150, 2.7, [
        'Airfilter', 'Optimization of engine software',
        'Downpipe with sport catalytic converter', 'Special ceramic heat coating',
        'GAD Upgrade ball-bearing Twin Scroll Turbocharger (GAD 825-60/71R)',
        'Turbo installation kit (cooling water and oil lines)',
        'Custom high flow intercooler',
      ], '€35,992 total', '14–21 days'),
    },
  },
];

export const stageLabels: Record<Stage, string> = {
  stock: 'Stock',
  stage1: 'Stage 1',
  stage2: 'Stage 2',
  stage3: 'Stage 3',
  stage4: 'Stage 4',
  stage5: 'Stage 5',
  vip: 'VIP',
};

export const stageOrder: Stage[] = ['stock', 'stage1', 'stage2', 'stage3', 'stage4', 'stage5', 'vip'];
