import type { Stage } from './tuningCars';

/** Preserve inherited source records while withholding unverified public claims. */
export const hasPublishedTuningPackage = (carId: string): boolean => carId !== 's63';

const unverifiedDb11Reinforcement = new Set([
  'Stage 1 GAD transmission reinforcement MCT (~1100 Nm)',
  'Stage 2 GAD transmission reinforcement MCT with wet clutch (~1350 Nm)',
]);

export const publishedTuningMods = (carId: string, stage: Stage, mods: readonly string[]): string[] => {
  if (!hasPublishedTuningPackage(carId)) return [];
  if (carId === 'db11' && ['stage3', 'stage4', 'stage5'].includes(stage)) {
    return mods.filter(mod => !unverifiedDb11Reinforcement.has(mod));
  }
  return [...mods];
};

export const getTuningPublicationNote = (carId: string, isArabic = false): string | undefined => {
  if (carId === 's63') return isArabic
    ? 'حِزم S63 AMG E PERFORMANCE وطريقة تحديد ناتج الأداء بانتظار التحقق الخاص بهذا الطراز. لذلك لا تُعرض أرقام المراحل والأسعار والمدد والأعمال المشمولة. أرسل رقم الهيكل والتعديلات الحالية لتأكيد نطاق العمل المناسب لسيارتك.'
    : 'S63 AMG E PERFORMANCE packages and output basis are awaiting model-specific verification. Stage figures, prices, workshop times and included work are withheld. Send your VIN and current modifications so the team can confirm the applicable scope.';
  if (carId === 'db11') return isArabic
    ? 'حُجب وصف تقوية ناقل الحركة الموروث لأن ملاءمته لهذا التكوين من DB11 لم تُتحقق. أكّد نوع ناقل الحركة وأي أعمال تقوية ونطاق الحزمة النهائي في المقترح المكتوب.'
    : 'The inherited transmission-reinforcement description has been withheld because its compatibility with this DB11 configuration is unverified. Confirm gearbox identification, any reinforcement work and the final package scope in the written proposal.';
  return undefined;
};

const glc63PriceEndpoints: Partial<Record<Stage, readonly [string, string]>> = {
  stage3: ['€17,876', '€19,346'],
  stage4: ['€33,335', '€34,805'],
  stage5: ['€51,335', '€52,805'],
};

export const getTuningPriceNote = (carId: string, stage: Stage, isArabic = false): string | undefined => {
  const endpoints = carId === 'glc63' ? glc63PriceEndpoints[stage] : undefined;
  if (!endpoints) return undefined;
  const [sevenSpeed, nineSpeed] = endpoints;
  return isArabic
    ? `تسجل GAD السعر الإجمالي ${sevenSpeed} باليورو لحزمة تقوية ناقل NAG2 ذي سبع سرعات (قدرة تحمّل تقارب 1100 نيوتن متر)، و${nineSpeed} باليورو لحزمة تقوية ناقل NAG3 ذي تسع سرعات (قدرة تحمّل تقارب 1250 نيوتن متر). تصف قائمة الأعمال المشمولة أدناه خيار التسع سرعات. أكّد ناقل الحركة المركب في سيارتك ونطاق الحزمة المناسب في المقترح المكتوب. هذه القيم تخص قدرة تحمّل ناقل الحركة وليست عزم المحرك بعد التعديل.`
    : `GAD lists ${sevenSpeed} total in EUR for the seven-speed NAG2 reinforcement package (~1100 Nm gearbox capacity), and ${nineSpeed} total in EUR for the nine-speed NAG3 reinforcement package (~1250 Nm gearbox capacity). The included-work list below describes the nine-speed option. Confirm the gearbox fitted to your vehicle and the applicable scope in the written proposal. These ratings describe gearbox capacity, not tuned torque.`;
};
