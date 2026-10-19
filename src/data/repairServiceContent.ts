import type { BrandServiceCombo } from './brandServices';
import { getRepairArabicOverride } from './repairServiceArabic';

type RepairMode = 'engine' | 'transmission' | 'suspension' | 'diagnostics';
type RepairLink = { path: string; en: string; ar: string };
export type RepairServiceContent = {
  label: string;
  arabicLabel: string;
  mode: RepairMode;
  record: string;
  arabicRecord: string;
  links: RepairLink[];
  metadata?: { metaTitle: string; metaDescription: string };
};
const mercedes = '/services/mercedes-';
const brand = (name: string, service: string) => `/brands/${name}-service-dubai/${service}`;

/** Existing commercial owners selected from measured repair-query evidence. */
export const REPAIR_SERVICE_CONTENT: Record<string, RepairServiceContent> = {
  'mercedes-benz-service-dubai/mechanical-repair': {
    label: 'Mercedes engine repair', arabicLabel: 'إصلاح محرك مرسيدس', mode: 'engine',
    record: 'For an oil leak, coolant loss, rough idle or unusual engine noise, record whether it happens at cold start, warm idle or under load. Note changes in oil or coolant level and any recent repair. A warning, photograph or smoke colour helps describe the concern but cannot establish an internal-engine or turbocharger failure.',
    arabicRecord: 'عند تسرب الزيت أو نقص سائل التبريد أو الاهتزاز أو الضجيج، وضح هل تظهر الأعراض عند التشغيل البارد أو السلانسيه بعد التسخين أو مع الحمل. اذكر تغير مستوى السوائل وأي إصلاح حديث. الصورة أو لون الدخان أو التحذير يساعد في وصف المشكلة ولا يثبت وحده تلف المحرك أو التيربو.',
    links: [{path:`${mercedes}diagnostics-dubai`,en:'Mercedes fault diagnosis before choosing parts',ar:'تشخيص أعطال مرسيدس قبل اختيار القطع'},{path:`${mercedes}transmission-repair-dubai`,en:'For shifting or engagement concerns',ar:'فحص تغيرات القير والتعشيق'}],
  },
  'mercedes-benz-service-dubai/suspension-repair': {
    label: 'Mercedes suspension repair', arabicLabel: 'إصلاح تعليق مرسيدس', mode: 'suspension',
    record: 'Describe which corner changes height, how long the car was parked, whether the compressor runs repeatedly and the exact warning. AIRMATIC, ABC and other fitted systems need different checks. Low ride height alone does not prove an air strut has failed; the fitted system and test findings determine the repair.',
    arabicRecord: 'اذكر الركن الذي يتغير ارتفاعه ومدة الوقوف وهل يعمل الضاغط بصورة متكررة ونص التحذير. تختلف فحوص AIRMATIC وABC والأنظمة الأخرى حسب التجهيزات. انخفاض السيارة وحده لا يثبت تلف المساعد الهوائي؛ يحدد النظام المركب ونتائج الاختبارات الإصلاح المناسب.',
    links: [{path:`${mercedes}diagnostics-dubai`,en:'Diagnostic checks for suspension warnings',ar:'تشخيص رسائل تحذير التعليق'},{path:'/services/mercedes-steering-repair-dubai',en:'Steering or wheel-vibration assessment',ar:'فحص التوجيه واهتزاز المقود'}],
  },
  'mercedes-benz-service-dubai/engine-diagnostics': {
    label: 'Mercedes diagnostics', arabicLabel: 'تشخيص أعطال مرسيدس', mode: 'diagnostics',
    record: 'Send the full warning text, whether the vehicle starts and runs normally, when the fault returns and any battery or repair history. XENTRY findings are reviewed with physical checks. A diagnostic report and a repair estimate are different steps; coding or programming is included only when the exact function and access are confirmed.',
    arabicRecord: 'أرسل نص التحذير كاملاً وهل تعمل السيارة بصورة طبيعية ووقت عودة العطل وسجل البطارية أو الإصلاحات الحديثة. تُراجع بيانات XENTRY مع الفحص الفعلي. تقرير التشخيص وعرض الإصلاح خطوتان مختلفتان؛ لا تُدرج البرمجة إلا بعد تأكيد الوظيفة والصلاحيات المتاحة للسيارة.',
    links: [{path:`${mercedes}mechanical-repair-dubai`,en:'When testing identifies a mechanical concern',ar:'عندما يحدد الفحص مشكلة ميكانيكية'},{path:'/services/mercedes-electrical-repair-dubai',en:'Electrical and wiring fault assessment',ar:'فحص الأعطال الكهربائية والأسلاك'}],
    metadata: {metaTitle:'Mercedes Diagnostics Dubai | XENTRY Fault Tracing | DIGI-TEC',metaDescription:'Mercedes diagnostics in Al Quoz, Dubai for warning lights, no-start and drivability faults. XENTRY findings and physical tests guide the next step. Request assessment.'},
  },
  'mercedes-benz-service-dubai/transmission-repair': {
    label: 'Mercedes transmission repair', arabicLabel: 'إصلاح ناقل حركة مرسيدس', mode: 'transmission',
    record: 'Note whether jerking, slipping or delayed drive/reverse occurs cold or warm, at which shift and after which recent work. 7G-Tronic, 9G-Tronic and AMG variants require identification of the fitted gearbox. Fluid service, a supported adaptation and repair of a confirmed fault are separate decisions.',
    arabicRecord: 'وضح هل يظهر النتع أو الانزلاق أو تأخر التعشيق بارداً أم بعد التسخين وفي أي نقلة، واذكر أعمال الصيانة السابقة. تتطلب فئات 7G-Tronic و9G-Tronic وAMG تحديد القير المركب. تغيير الزيت وإعادة التعلم أو التهيئة المدعومة وإصلاح عطل مؤكد قرارات منفصلة.',
    links: [{path:`${mercedes}diagnostics-dubai`,en:'Fault diagnosis for gearbox warnings',ar:'تشخيص تحذيرات ناقل الحركة'},{path:`${mercedes}mechanical-repair-dubai`,en:'Engine symptoms that need a different inspection',ar:'أعراض المحرك التي تحتاج فحصاً مختلفاً'}],
  },
  'bmw-service-dubai/mechanical-repair': {
    label: 'BMW engine repair', arabicLabel: 'إصلاح محرك بي إم دبليو', mode: 'engine',
    record: 'Describe oil or coolant loss, rough running, overheating or power loss and when it begins. The engine code, history, leak source and test findings determine the next step. An engine-running fault and a gearbox complaint can feel similar, so record whether the concern follows engine speed, a shift or road speed.',
    arabicRecord: 'وضح فقدان الزيت أو سائل التبريد أو الخشونة أو ارتفاع الحرارة أو ضعف العزم ووقت ظهورها. يحدد رمز المحرك والسجل وموضع التسرب ونتائج الفحص الخطوة التالية. قد تتشابه أعراض المحرك والقير؛ اذكر هل تتبع سرعة المحرك أو نقلة معينة أو سرعة السيارة.',
    links: [{path:brand('bmw','engine-diagnostics'),en:'BMW warning-light and fault diagnosis',ar:'تشخيص تحذيرات وأعطال بي إم دبليو'},{path:brand('bmw','transmission-repair'),en:'For shift or gearbox concerns',ar:'لفحص مشاكل نقل السرعات والقير'}],
  },
  'bmw-service-dubai/transmission-repair': {
    label: 'BMW transmission repair', arabicLabel: 'إصلاح ناقل حركة بي إم دبليو', mode: 'transmission',
    record: 'Record delayed engagement, slipping, harsh shifts, warnings or a leak, including whether the vehicle is cold or warm. ZF automatic, M-DCT and manual gearboxes have different requirements. A fluid service is not a universal repair for a warning or shift fault; findings determine the supported work.',
    arabicRecord: 'سجل تأخر التعشيق أو الانزلاق أو النقلات القاسية أو التحذير أو التسرب، وهل تظهر الأعراض بارداً أم بعد التسخين. تختلف متطلبات القير الأوتوماتيكي ZF وM-DCT واليدوي. تغيير الزيت لا يعالج كل تحذير أو خلل في النقل؛ تحدد النتائج العمل المتاح.',
    links: [{path:brand('bmw','engine-diagnostics'),en:'BMW diagnostics for a drivetrain warning',ar:'تشخيص تحذير مجموعة الدفع في بي إم دبليو'},{path:brand('bmw','mechanical-repair'),en:'Engine or cooling-system assessment',ar:'فحص المحرك ونظام التبريد'}],
    metadata: {metaTitle:'BMW Transmission & Gearbox Repair Dubai | DIGI-TEC',metaDescription:'BMW transmission repair in Al Quoz, Dubai for harsh shifts, slipping, leaks and gearbox warnings. Vehicle-specific assessment before a repair quote. Contact DIGI-TEC.'},
  },
  'rolls-royce-service-dubai/mechanical-repair': {
    label: 'Rolls-Royce engine repair', arabicLabel: 'إصلاح محرك رولز رويس', mode: 'engine',
    record: 'Send the combustion model and year, service history, warning and when oil loss, coolant loss, noise or a drivability change occurs. Spectre is electric and is outside this combustion-engine repair scope. External repairs, further dismantling and internal-engine work require separate scope confirmation after assessment.',
    arabicRecord: 'أرسل طراز سيارة الاحتراق وسنة الصنع وسجلها والتحذير ووقت ظهور فقدان الزيت أو سائل التبريد أو الضجيج أو تغير الأداء. سيارة Spectre كهربائية وخارج نطاق إصلاح محركات الاحتراق هنا. يُؤكد الإصلاح الخارجي والفك الإضافي والعمل الداخلي كل على حدة بعد الفحص.',
    links: [{path:brand('rolls-royce','engine-diagnostics'),en:'Rolls-Royce warning-light assessment',ar:'فحص تحذيرات رولز رويس'},{path:brand('rolls-royce','suspension-repair'),en:'For ride-height or suspension concerns',ar:'لفحص ارتفاع السيارة ومشاكل التعليق'}],
  },
  'rolls-royce-service-dubai/suspension-repair': {
    label: 'Rolls-Royce suspension repair', arabicLabel: 'إصلاح تعليق رولز رويس', mode: 'suspension',
    record: 'Describe the affected corner, change after parking, compressor behaviour and warning. Fitted suspension varies by model and generation; newer Ghost terminology is not applied to every Rolls-Royce. Leaks, sensors, supply and control faults require assessment before a strut or compressor is selected.',
    arabicRecord: 'وضح الركن المتأثر والتغير بعد الوقوف وسلوك الضاغط ونص التحذير. يختلف التعليق حسب الطراز والجيل، ولا تُعمم أنظمة Ghost الأحدث على جميع سيارات رولز رويس. تحتاج التسريبات والحساسات والتغذية والتحكم إلى الفحص قبل اختيار المساعد أو الضاغط.',
    links: [{path:brand('rolls-royce','engine-diagnostics'),en:'Diagnostic assessment for a recurring warning',ar:'التشخيص عند تكرار التحذير'},{path:brand('rolls-royce','mechanical-repair'),en:'Separate engine and cooling concerns',ar:'فصل أعطال المحرك والتبريد عن التعليق'}],
  },
  'lamborghini-service-dubai/mechanical-repair': {
    label: 'Lamborghini engine repair', arabicLabel: 'إصلاح محرك لامبورغيني', mode: 'engine',
    record: 'Record the exact model, oil or coolant loss, temperature warning, unusual noise and when performance changes. The fitted engine and conventional or hybrid architecture determine which inspection can be accepted. Internal-engine work, hybrid high-voltage work and specialist calibration are not assumed from an engine-repair enquiry.',
    arabicRecord: 'سجل الطراز وفقدان الزيت أو سائل التبريد وتحذير الحرارة والضجيج ووقت تغير الأداء. يحدد المحرك والبنية التقليدية أو الهجينة الفحص الذي يمكن قبوله. لا يعني طلب إصلاح المحرك توفر العمل الداخلي أو إصلاح الجهد العالي في الهجين أو المعايرة المتخصصة.',
    links: [{path:brand('lamborghini','engine-diagnostics'),en:'Lamborghini warning-light diagnosis',ar:'تشخيص تحذيرات محرك لامبورغيني'},{path:brand('lamborghini','transmission-repair'),en:'For gearbox or engagement symptoms',ar:'لفحص أعراض القير والتعشيق'}],
  },
  'lamborghini-service-dubai/transmission-repair': {
    label: 'Lamborghini transmission repair', arabicLabel: 'إصلاح ناقل حركة لامبورغيني', mode: 'transmission',
    record: 'Describe the warning, gear, temperature and engagement or shift concern. Huracan EVO LDF, Aventador SVJ ISR and Urus S automatic transmissions use different architectures. A symptom does not establish a clutch, hydraulic or internal fault; repair, service and calibration availability are confirmed for the fitted unit.',
    arabicRecord: 'وضح التحذير والنقلة ودرجة التشغيل ومشكلة التعشيق أو النقل. تختلف بنية LDF في Huracan EVO وISR في Aventador SVJ والأوتوماتيكي في Urus S. لا يثبت العرض وحده تلف القابض أو النظام الهيدروليكي أو جزء داخلي؛ تُؤكد أعمال الإصلاح والصيانة والمعايرة للقير المركب.',
    links: [{path:brand('lamborghini','engine-diagnostics'),en:'Fault assessment before gearbox work',ar:'تشخيص العطل قبل العمل على القير'},{path:brand('lamborghini','mechanical-repair'),en:'For engine or cooling-system symptoms',ar:'لفحص أعراض المحرك والتبريد'}],
  },
};

export const getRepairServiceContent = (brandSlug?: string, serviceSlug?: string) =>
  brandSlug && serviceSlug ? REPAIR_SERVICE_CONTENT[`${brandSlug}/${serviceSlug}`] : undefined;

export function refineRepairService(combo: BrandServiceCombo, isArabic: boolean): BrandServiceCombo {
  const content = getRepairServiceContent(combo.brandSlug, combo.serviceSlug);
  if (!content) return combo;
  const localized = isArabic ? getRepairArabicOverride(combo.brandSlug, combo.serviceSlug) : content.metadata;
  const label = isArabic ? content.arabicLabel : content.label;
  return {
    ...combo,
    ...localized,
    whatsAppMessage: isArabic
      ? `مرحباً ديجي-تك، أود طلب فحص بخصوص ${label}.\n\nالطراز: \nسنة الصنع: \nالمسافة: \nسجل الصيانة أو العمل الأخير: \nالتحذير أو الأعراض: \nمتى تظهر: \nالموعد المفضل: `
      : `Hi DIGI-TEC, I would like to request a ${label} assessment.\n\nModel: \nYear: \nMileage: \nService history or recent work: \nWarning or symptoms: \nWhen it occurs: \nPreferred appointment time: `,
  };
}
