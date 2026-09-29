import { LocalizedLink as Link } from '@/components/LocalizedLink';

type Pair = { en: string; ar: string };
type Section = { heading: Pair; paragraphs: Pair[] };
const guides: Record<'Range Rover' | 'Jaguar', { lead: Pair; sections: Section[]; links: { href: string; label: Pair }[] }> = {
  'Range Rover': {
    lead: { en: 'A Range Rover maintenance plan starts with the exact model, year, powertrain, history and fitted equipment. Range Rover, Sport, Velar and Evoque cannot share one oil grade, service interval or suspension procedure. Use the vehicle record to identify due work, then inspect any reported symptom separately.', ar: 'تبدأ خطة صيانة رينج روفر بتحديد الطراز والسنة ونظام الدفع والسجل والتجهيزات. لا يمكن تطبيق درجة زيت أو موعد صيانة أو إجراء تعليق واحد على رينج روفر وسبورت وفيلار وإيفوك. راجع سجل السيارة لتحديد الأعمال المستحقة وافحص أي عَرَض بصورة منفصلة.' },
    sections: [
      { heading: { en: 'Confirm what is fitted', ar: 'تأكد من التجهيزات المركبة' }, paragraphs: [
        { en: 'Air suspension is specification-dependent. An Evoque with passive suspension does not need an air-strut inspection, while an equipped Velar or Sport may need height, leak, compressor and sensor checks. Ask the workshop to identify the fitted system before approving parts.', ar: 'يعتمد التعليق الهوائي على المواصفات. لا تحتاج إيفوك ذات التعليق التقليدي إلى فحص دعامة هوائية، بينما قد تحتاج فيلار أو سبورت المجهزة به إلى فحص الارتفاع والتسرب والضاغط والحساسات. اطلب تحديد النظام المركب قبل اعتماد القطع.' },
        { en: 'The same applies to engine oil, transmission fluid and diagnostic functions. These are selected from the VIN, model year and applicable service data. A warning or fault code identifies a route for testing, not a failed component by itself.', ar: 'ينطبق ذلك أيضاً على زيت المحرك وسائل ناقل الحركة ووظائف التشخيص. تُحدد وفق رقم الهيكل والسنة وبيانات الصيانة المعمول بها. يوجّه التحذير أو رمز العطل الاختبار ولا يثبت تلف قطعة وحده.' },
      ] },
      { heading: { en: 'Plan the inspection and estimate', ar: 'خطط للفحص وعرض السعر' }, paragraphs: [
        { en: 'Bring the service record, mileage, recent repair details and the exact message or driving change. Dubai heat and traffic can make cooling, AC, battery and tyre condition worth checking, but additional work should follow observations and an agreed estimate.', ar: 'أحضر سجل الصيانة والمسافة وتفاصيل الإصلاحات الأخيرة ونص التحذير أو تغير القيادة. قد تجعل حرارة دبي وازدحامها فحص التبريد والتكييف والبطارية والإطارات مهماً، لكن الأعمال الإضافية تعتمد على النتائج وعرض سعر معتمد.' },
        { en: 'A service-cost question needs the due items, parts specification, labour and diagnostic findings. DIGI-TEC in Al Quoz can confirm the first inspection and supported scope for the vehicle before quoting; this guide is for planning, while the service hub handles booking.', ar: 'يتطلب سؤال التكلفة معرفة البنود المستحقة ومواصفات القطع والعمالة ونتائج التشخيص. تستطيع ديجي-تك في القوز تأكيد الفحص الأول والنطاق المتاح للسيارة قبل التسعير؛ هذا دليل للتخطيط وتبقى صفحة الخدمة للحجز.' },
      ] },
    ],
    links: [{ href: '/brands/range-rover-service-dubai', label: { en: 'Range Rover service options', ar: 'خدمات رينج روفر' } },{ href: '/brands/range-rover-service-dubai/suspension-repair', label: { en: 'Suspension assessment', ar: 'فحص التعليق' } },{ href: '/blog/range-rover-land-rover-air-suspension-problems-dubai', label: { en: 'Air-suspension symptoms', ar: 'أعراض التعليق الهوائي' } }],
  },
  Jaguar: {
    lead: { en: 'Compare a Jaguar workshop by the task it can verify on your exact vehicle. An F-PACE cooling warning, an XF shift concern and an I-PACE electrical question have different inspection paths. Ask what diagnostic access, physical checks and repair scope are available before treating an estimate as final.', ar: 'قارن ورش جاكوار وفق المهمة التي تستطيع تأكيدها للسيارة المحددة. يختلف مسار فحص تحذير تبريد F-PACE عن مشكلة تبديل XF أو سؤال كهرباء I-PACE. اسأل عن وصول التشخيص والفحوص الفعلية ونطاق الإصلاح قبل اعتماد أي تقدير نهائي.' },
    sections: [
      { heading: { en: 'Separate the symptom from the repair', ar: 'افصل العَرَض عن الإصلاح' }, paragraphs: [
        { en: 'A gearbox warning does not by itself require gearbox replacement. Record when the shift changes, whether the warning persists and what work was done recently. A workshop should check available fault and live data, fluid or leak evidence where applicable, and related electrical or driveline causes before recommending parts.', ar: 'لا يعني تحذير ناقل الحركة وحده ضرورة استبداله. دوّن وقت تغير التبديل واستمرار التحذير والأعمال الأخيرة. ينبغي فحص بيانات الأعطال والبيانات الحية المتاحة والسائل أو التسرب عند انطباق ذلك، والأسباب الكهربائية أو أسباب مجموعة الدفع قبل اقتراح القطع.' },
        { en: 'A suspension warning also depends on the fitted system. Conventional, adaptive and air-suspension equipment varies by Jaguar model and specification. Ask what physical and electronic observations support the proposed repair.', ar: 'يعتمد تحذير التعليق أيضاً على النظام المركب. تختلف تجهيزات التعليق التقليدي أو المتكيف أو الهوائي حسب طراز جاكوار ومواصفاته. اسأل عن الملاحظات الفعلية والإلكترونية التي تدعم الإصلاح المقترح.' },
      ] },
      { heading: { en: 'Check electric-vehicle scope and approval', ar: 'تحقق من نطاق السيارة الكهربائية والموافقة' }, paragraphs: [
        { en: 'I-PACE is fully electric. Combustion-engine oil, spark plugs and an ICE gearbox are not its service tasks. Discuss the exact brake, AC, low-voltage, chassis or warning concern and ask the workshop to confirm what it can safely inspect. Do not assume high-voltage battery or drive-unit repair capability.', ar: 'I-PACE كهربائية بالكامل. لا تشمل صيانتها زيت محرك الاحتراق أو شمعات الإشعال أو ناقل حركة محرك احتراق. اشرح مشكلة الفرامل أو التكييف أو الكهرباء منخفضة الجهد أو الهيكل أو التحذير بدقة، واطلب تأكيد ما يمكن فحصه بأمان. لا تفترض توفر إصلاح البطارية عالية الجهد أو وحدة الدفع.' },
        { en: 'DIGI-TEC is an independent workshop in Al Quoz. Send the model, year, VIN when requested, service record and symptom. The first inspection and any further approved repair should be explained separately in the estimate.', ar: 'ديجي-تك ورشة مستقلة في القوز. أرسل الطراز والسنة ورقم الهيكل عند الطلب والسجل والعَرَض. ينبغي شرح الفحص الأول وأي إصلاح لاحق معتمد بصورة منفصلة في عرض السعر.' },
      ] },
    ],
    links: [{ href: '/brands/jaguar-service-dubai', label: { en: 'Jaguar service options', ar: 'خدمات جاكوار' } },{ href: '/brands/jaguar-service-dubai/engine-diagnostics', label: { en: 'Jaguar diagnostic assessment', ar: 'فحص جاكوار' } },{ href: '/brands/jaguar-service-dubai/transmission-repair', label: { en: 'Transmission assessment', ar: 'فحص ناقل الحركة' } }],
  },
};

export function B6JlrGuideBody({ brand, isArabic }: { brand: 'Range Rover' | 'Jaguar'; isArabic: boolean }) {
  const guide=guides[brand], language=isArabic?'ar':'en';
  return <>
    <p className="border-l-2 border-burnt-orange pl-5 text-lg leading-relaxed text-gray-200">{guide.lead[language]}</p>
    {guide.sections.map(section=><section key={section.heading.en} className="mt-12"><h2 className="text-2xl font-black sm:text-3xl">{section.heading[language]}</h2>{section.paragraphs.map(p=><p key={p.en} className="mt-4 leading-relaxed text-gray-300">{p[language]}</p>)}</section>)}
    <section className="mt-12"><h2 className="text-2xl font-black sm:text-3xl">{isArabic?'الخطوة التالية':'Relevant next step'}</h2><div className="mt-5 grid gap-3 sm:grid-cols-2">{guide.links.map(link=><Link key={link.href} to={isArabic?`/ar${link.href}`:link.href} className="rounded-xl border border-white/10 p-4 font-semibold text-burnt-orange hover:border-burnt-orange/50">{link.label[language]}</Link>)}</div></section>
  </>;
}
