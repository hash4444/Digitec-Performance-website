export type Stage = 'stock' | 'stage1' | 'stage2' | 'stage3' | 'stage4' | 'vip';

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
  brand: 'Mercedes' | 'BMW' | 'Audi' | 'Porsche';
  image: string;
  stages: Record<Stage, StageInfo>;
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

function createStages(
  stockHp: number, stockTorque: number, stockTime: number
): Record<Stage, StageInfo> {
  return {
    stock: {
      spec: { hp: stockHp, torque: stockTorque, zeroToHundred: stockTime },
      mods: ['Factory Specifications'],
      price: '—',
      time: '—',
      powerCurve: generatePowerCurve(stockHp, stockTorque),
    },
    stage1: {
      spec: { hp: Math.round(stockHp * 1.15), torque: Math.round(stockTorque * 1.18), zeroToHundred: +(stockTime * 0.9).toFixed(1) },
      mods: ['ECU Remap', 'Performance Air Filter', 'Software Optimization'],
      price: 'From AED 3,500',
      time: '1–2 days',
      powerCurve: generatePowerCurve(Math.round(stockHp * 1.15), Math.round(stockTorque * 1.18)),
    },
    stage2: {
      spec: { hp: Math.round(stockHp * 1.3), torque: Math.round(stockTorque * 1.35), zeroToHundred: +(stockTime * 0.82).toFixed(1) },
      mods: ['Stage 1 +', 'Downpipe Upgrade', 'Intake System', 'Intercooler Upgrade'],
      price: 'From AED 8,500',
      time: '3–5 days',
      powerCurve: generatePowerCurve(Math.round(stockHp * 1.3), Math.round(stockTorque * 1.35)),
    },
    stage3: {
      spec: { hp: Math.round(stockHp * 1.5), torque: Math.round(stockTorque * 1.55), zeroToHundred: +(stockTime * 0.73).toFixed(1) },
      mods: ['Stage 2 +', 'Turbo Upgrade', 'Exhaust System', 'Fuel System Upgrade', 'Engine Internals'],
      price: 'From AED 18,000',
      time: '7–14 days',
      powerCurve: generatePowerCurve(Math.round(stockHp * 1.5), Math.round(stockTorque * 1.55)),
    },
    stage4: {
      spec: { hp: Math.round(stockHp * 1.75), torque: Math.round(stockTorque * 1.8), zeroToHundred: +(stockTime * 0.65).toFixed(1) },
      mods: ['Stage 3 +', 'Big Turbo Kit', 'Forged Internals', 'Race Fuel System', 'Transmission Upgrade'],
      price: 'From AED 35,000',
      time: '14–21 days',
      powerCurve: generatePowerCurve(Math.round(stockHp * 1.75), Math.round(stockTorque * 1.8)),
    },
    vip: {
      spec: { hp: Math.round(stockHp * 2.0), torque: Math.round(stockTorque * 2.05), zeroToHundred: +(stockTime * 0.55).toFixed(1) },
      mods: ['Full Custom Build', 'Bespoke ECU Calibration', 'Dyno Testing & Validation', 'Premium Components', 'Lifetime Software Updates', '1-Year Performance Warranty'],
      price: 'From AED 65,000',
      time: '3–6 weeks',
      powerCurve: generatePowerCurve(Math.round(stockHp * 2.0), Math.round(stockTorque * 2.05)),
    },
  };
}

export const tuningCars: TuningCar[] = [
  // Mercedes
  { id: 'c63', name: 'Mercedes C63 AMG', brand: 'Mercedes', image: mercedesImage, stages: createStages(476, 640, 4.0) },
  { id: 'e63', name: 'Mercedes E63 S AMG', brand: 'Mercedes', image: mercedesImage, stages: createStages(612, 850, 3.4) },
  { id: 'g63', name: 'Mercedes G63 AMG', brand: 'Mercedes', image: mercedesImage, stages: createStages(577, 850, 4.5) },
  { id: 'amg-gt', name: 'Mercedes AMG GT', brand: 'Mercedes', image: mercedesImage, stages: createStages(523, 670, 3.7) },
  // BMW
  { id: 'm3', name: 'BMW M3 Competition', brand: 'BMW', image: bmwImage, stages: createStages(510, 650, 3.9) },
  { id: 'm4', name: 'BMW M4 Competition', brand: 'BMW', image: bmwImage, stages: createStages(510, 650, 3.9) },
  { id: 'm5', name: 'BMW M5 CS', brand: 'BMW', image: bmwImage, stages: createStages(635, 750, 3.0) },
  { id: 'x5m', name: 'BMW X5 M Competition', brand: 'BMW', image: bmwImage, stages: createStages(625, 750, 3.8) },
  // Audi
  { id: 'rs3', name: 'Audi RS3 Sportback', brand: 'Audi', image: audiImage, stages: createStages(400, 500, 3.8) },
  { id: 'rs6', name: 'Audi RS6 Avant', brand: 'Audi', image: audiImage, stages: createStages(600, 800, 3.6) },
  { id: 'rs7', name: 'Audi RS7 Sportback', brand: 'Audi', image: audiImage, stages: createStages(600, 800, 3.6) },
  { id: 'rsq8', name: 'Audi RSQ8', brand: 'Audi', image: audiImage, stages: createStages(600, 800, 3.8) },
  // Porsche
  { id: '911-turbo', name: 'Porsche 911 Turbo S', brand: 'Porsche', image: porscheImage, stages: createStages(650, 800, 2.7) },
  { id: 'cayenne', name: 'Porsche Cayenne Turbo GT', brand: 'Porsche', image: porscheImage, stages: createStages(640, 850, 3.3) },
  { id: 'panamera', name: 'Porsche Panamera Turbo S', brand: 'Porsche', image: porscheImage, stages: createStages(630, 820, 3.1) },
  { id: 'macan', name: 'Porsche Macan GTS', brand: 'Porsche', image: porscheImage, stages: createStages(380, 520, 4.3) },
];

export const stageLabels: Record<Stage, string> = {
  stock: 'Stock',
  stage1: 'Stage 1',
  stage2: 'Stage 2',
  stage3: 'Stage 3',
  stage4: 'Stage 4',
  vip: 'VIP',
};

export const stageOrder: Stage[] = ['stock', 'stage1', 'stage2', 'stage3', 'stage4', 'vip'];
