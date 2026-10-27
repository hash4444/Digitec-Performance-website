import { LocalizedLink as Link } from '@/components/LocalizedLink';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function MercedesMaintenanceScope({ isArabic }: { isArabic: boolean }) {
  const { hash } = useLocation();
  useEffect(() => {
    if (hash === '#mercedes-maintenance-scope') document.getElementById('mercedes-maintenance-scope')?.scrollIntoView({ block: 'start' });
  }, [hash]);
  const rows = isArabic ? [
    ['Mercedes Service A', 'تشمل عادةً زيت المحرك والفلتر وفحص السوائل وضغط الإطارات والفرامل والفحوص المقررة. تُراجع البنود المستحقة حسب الطراز والسنة ومواصفات السوق والسجل قبل التسعير.'],
    ['Mercedes Service B', 'تضيف عادةً بنود صيانة وفحص أخرى إلى الخدمة الأساسية. قد يستحق فلتر المقصورة أو سائل الفرامل وفق جدول السيارة؛ يُحدد العمل من بيانات ASSYST والسجل دون افتراض شموله لكل سيارة.'],
    ['الصيانة الصغيرة والكبيرة', 'هذه أسماء لوصف نطاق العمل وليست قائمة موحدة. تُدرج الفلاتر الإضافية وشمعات الإشعال والسوائل عند استحقاقها حسب السيارة، وقد لا يفي تغيير الزيت وحده بجميع المتطلبات.'],
    ['الأعمال الإضافية', 'تشخيص الأعطال والإصلاحات والتسريبات والإطارات والفرامل وصيانة ناقل الحركة تُدرج بصورة منفصلة ما لم ينص عرض السعر على شمولها.'],
  ] : [
    ['Mercedes Service A', 'Commonly includes engine oil and filter work, fluid-level and tyre-pressure checks, brake inspection and scheduled checks. Due items are confirmed for the model, year, market specification and history before quotation.'],
    ['Mercedes Service B', 'Generally adds further maintenance and inspections to the basic visit. Cabin-filter or brake-fluid work may be due under the vehicle schedule; ASSYST information and records determine the scope, rather than assuming every item is included.'],
    ['Minor and major maintenance', 'These describe the scope, not a universal checklist. Additional filters, spark plugs and fluid work are listed when due for the vehicle. An oil change alone may not complete all the required service items.'],
    ['Separately quoted work', 'Fault diagnosis, repairs, leaks, tyres, brakes and transmission servicing are separate unless expressly included. Additional findings are explained before extra work is approved.'],
  ];
  return (
    <section id="mercedes-maintenance-scope" className="brand-section scroll-mt-[10rem] border-t border-white/5 bg-charcoal/20 py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h2 className="text-2xl font-black sm:text-4xl">{isArabic ? 'صيانة مرسيدس Service A وService B: ما النطاق المناسب؟' : 'Mercedes Service A and Service B: which work is due?'}</h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-white/65">{isArabic ? 'ابدأ برسالة الصيانة كاملةً والمسافة وسجل الأعمال السابقة. يحدد دليل الطراز ومواصفات السوق والمتطلبات الزمنية الفحص والصيانة المستحقة؛ ولا تُفرض فترة واحدة لكل سيارات مرسيدس في دبي.' : 'Start with the complete service-display message, mileage and previous-work records. The model handbook, market specification and time-based requirements guide due maintenance and inspections; there is no single Dubai interval for every Mercedes.'}</p>
        <dl className="mt-7 grid gap-4 sm:grid-cols-2">
          {rows.map(([title, description]) => <div key={title} className="card-premium rounded-2xl p-5 sm:p-6"><dt className="text-lg font-bold">{title}</dt><dd className="mt-3 text-sm leading-7 text-white/65">{description}</dd></div>)}
        </dl>
        <div className="mt-8 max-w-3xl space-y-4 text-sm leading-7 text-white/65">
          <h3 className="text-xl font-bold text-off-white">{isArabic ? 'الزيت والفلاتر والفحص المناسب للسيارة' : 'Oil, filters and vehicle-specific inspections'}</h3>
          <p>{isArabic ? 'يُحدد المحرك ومواصفة الزيت المعتمدة والفلتر وكمية السوائل قبل العمل. تُراجع الإطارات والفرامل والتسريبات والتبريد والبطارية بحسب النطاق المتفق عليه. قد تزيد الحرارة والغبار والرحلات القصيرة والازدحام من الحاجة إلى فحوص الحالة؛ وتظل تعليمات السيارة هي المرجع لتعديل الصيانة.' : 'Identify the engine, required oil approval, filter and fluid quantities before work. Tyres, brakes, leaks, cooling and battery condition are reviewed within the agreed inspection scope. Heat, dust, short trips and stop-start driving can justify closer condition checks; any change to maintenance follows the guidance for the exact vehicle.'}</p>
          <p>{isArabic ? 'تختلف متطلبات مرسيدس AMG بحسب المحرك والفرامل وناقل الحركة والاستخدام. اذكر القيادة على الحلبة أو التعديلات عند طلب الموعد. تُؤكد القطع والسوائل والإجراءات المتاحة للطراز؛ ولا تُفترض أنظمة أو وظائف واحدة لكل فئات AMG.' : 'Mercedes-AMG maintenance depends on the fitted engine, brakes, transmission and use. Mention track driving or modifications when requesting an appointment. Parts, fluids and available procedures are confirmed for the model; AMG versions do not all share the same systems or service needs.'}</p>
          <h3 className="text-xl font-bold text-off-white">{isArabic ? 'ما المعلومات المطلوبة للحجز وعرض السعر؟' : 'What to send for a service quote'}</h3>
          <p>{isArabic ? 'أرسل طراز مرسيدس وسنة الصنع والمسافة ورسالة Service A أو Service B أو أي رسالة صيانة أخرى، وسجل آخر زيارة إن توفر والموعد المفضل. قد يُطلب رقم الهيكل لتحديد القطع. اذكر التحذير أو التسريب أو الصوت غير المعتاد بصورة منفصلة عن الصيانة الدورية.' : 'Send your Mercedes model, year, mileage, Service A/B reminder or other service message, last service record if available and preferred appointment. A VIN may be requested to identify parts. Describe any warning, leak or unusual noise separately from scheduled servicing.'}</p>
          <p>{isArabic ? 'يوضح العرض قطع الغيار والسوائل والكميات وأجرة العمل والتشخيص والضريبة وأي أعمال غير مشمولة. نؤكد توفر القطع والموعد والمدة المتوقعة قبل بدء العمل.' : 'The estimate should identify parts, fluid specifications and quantities, labour, diagnosis, tax and exclusions. Parts availability, appointment time and expected duration are confirmed before work begins.'}</p>
          <p>{isArabic ? <>الورشة في القوز الصناعية 3، دبي. اتصل أو راسلنا على <bdi dir="ltr">+971 4 340 2223</bdi> لتأكيد الموعد قبل الزيارة.</> : 'Visit the workshop in Al Quoz Industrial Area 3, Dubai. Call or WhatsApp +971 4 340 2223 to confirm the appointment before travelling.'}</p>
          <a href="#mercedes-booking" className="inline-flex min-h-11 items-center font-semibold text-burnt-orange underline">{isArabic ? 'جهّز تفاصيل طلب موعد الصيانة' : 'Prepare your service appointment details'}</a>
          <div className="flex flex-wrap gap-x-6 gap-y-3 pt-2">
            <Link to="/services/mercedes-oil-change-dubai" className="font-semibold text-burnt-orange hover:underline">{isArabic ? 'تغيير زيت مرسيدس والفلتر' : 'Engine oil and filter scope'}</Link>
            <Link to="/blog/mercedes-service-cost-dubai-guide" className="font-semibold text-burnt-orange hover:underline">{isArabic ? 'كيف تُحسب تكلفة صيانة مرسيدس؟' : 'How service costs are calculated'}</Link>
            <Link to="/blog/mercedes-service-intervals-dubai-heat" className="font-semibold text-burnt-orange hover:underline">{isArabic ? 'مواعيد الصيانة ومؤشر ASSYST' : 'ASSYST and service intervals'}</Link>
            <Link to="/blog/mercedes-benz-maintenance-guide-dubai" className="font-semibold text-burnt-orange hover:underline">{isArabic ? 'تنظيم سجل الصيانة وأولويات الإصلاح' : 'Organise maintenance records and repair priorities'}</Link>
            <Link to="/blog/best-oil-change-dubai-mercedes" className="font-semibold text-burnt-orange hover:underline">{isArabic ? 'مقارنة عروض تغيير الزيت' : 'Compare oil-change proposals'}</Link>
            <Link to="/blog/mercedes-repair-dubai-complete-guide" className="font-semibold text-burnt-orange hover:underline">{isArabic ? 'تمييز أعراض الأعطال والخطوة التالية' : 'Match a warning sign to the next inspection'}</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
