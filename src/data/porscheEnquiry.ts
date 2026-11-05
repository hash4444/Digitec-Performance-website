import type { ServiceKey } from './brandServices';

const questions: Partial<Record<ServiceKey, [string, string]>> = {
  'transmission-repair': ['Gearbox if known; cold/hot, selected gear and when the concern occurs', 'نوع ناقل الحركة إن عُرف، وهل تظهر المشكلة بارداً أو ساخناً وفي أي نقلة'],
  'battery-replacement': ['12V battery age if known; no-crank, charging warning or discharge after parking', 'عمر بطارية 12 فولت إن عُرف، وصعوبة التشغيل أو تحذير الشحن أو التفريغ بعد الوقوف'],
  'engine-diagnostics': ['Exact warning; whether the engine cranks; when the fault occurs; requested diagnostic function', 'نص التحذير، وهل يدور المحرك عند التشغيل، ووقت ظهور العطل ووظيفة الفحص المطلوبة'],
  'suspension-repair': ['Affected corner, overnight height change, noise and fitted suspension if known', 'الجهة المتأثرة، وتغير الارتفاع بعد الوقوف، والصوت ونوع التعليق إن عُرف'],
  'brake-repair': ['Exact brake warning, noise/vibration/pedal change and fitted brake type if known', 'تحذير الفرامل، والصوت أو الاهتزاز أو تغير الدواسة ونوع الفرامل إن عُرف'],
  'oil-change': ['Service reminder, last oil service and any oil-level/pressure warning or leak', 'مؤشر الصيانة، وآخر تغيير زيت وأي تحذير مستوى أو ضغط زيت أو تسرب'],
  'electrical-repair': ['Affected functions, repeated battery drain and when the fault occurs', 'الوظائف المتأثرة، وتكرار تفريغ البطارية ووقت ظهور العطل'],
  'ac-repair': ['Cooling at idle/driving, airflow, affected zones and previous refrigerant work', 'التبريد أثناء الوقوف والقيادة، وتدفق الهواء والمناطق المتأثرة وأعمال التكييف السابقة'],
};

// Contact drafts stay separate from received enquiries. Analytics continues to
// strip the message from tracked URLs in the existing WhatsApp tracking helper.
export function porscheEnquiryFields(isArabic = false, service?: ServiceKey, model = ''): string[] {
  const fields = isArabic
    ? [`طراز بورشه: ${model}`, 'سنة الصنع: ', 'المسافة المقطوعة: ', 'الخدمة المطلوبة أو الأعراض: ', 'نص التحذير إن وجد: ', 'سجل الصيانة والإصلاحات الأخيرة: ']
    : [`Porsche model: ${model}`, 'Model year: ', 'Mileage: ', 'Requested service or symptoms: ', 'Exact warning message, if any: ', 'Service history and recent repairs: '];
  const detail = service && questions[service];
  if (detail) fields.push(`${detail[isArabic ? 1 : 0]}: `);
  fields.push(isArabic ? 'الموعد المفضل: ' : 'Preferred appointment: ');
  return fields;
}

export function porscheEnquiryMessage(subject: string, isArabic = false, service?: ServiceKey, model = ''): string {
  return `${isArabic ? `مرحباً ديجي-تك، أود الاستفسار عن ${subject}.` : `Hi DIGI-TEC, I would like to discuss ${subject}.`}\n\n${porscheEnquiryFields(isArabic, service, model).join('\n')}`;
}

export const porscheEnquiryHref = (subject: string, isArabic = false, service?: ServiceKey, model = '') =>
  `https://wa.me/97143402223?text=${encodeURIComponent(porscheEnquiryMessage(subject, isArabic, service, model))}`;
