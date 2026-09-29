import { LocalizedLink as Link } from '@/components/LocalizedLink';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function MercedesMaintenanceScope({ isArabic }: { isArabic: boolean }) {
  const { hash } = useLocation();
  useEffect(() => {
    if (hash === '#mercedes-maintenance-scope') document.getElementById('mercedes-maintenance-scope')?.scrollIntoView({ block: 'start' });
  }, [hash]);
  const rows = isArabic ? [
    ['الصيانة الأساسية أو الصغيرة', 'قد تشمل زيت المحرك والفلتر والفحوص المستحقة وفق بيانات السيارة. تغيير الزيت وحده لا يغطي بالضرورة جميع متطلبات الخدمة.'],
    ['الصيانة الموسعة أو الكبيرة', 'قد تتضمن عناصر إضافية مثل الفلاتر أو شمعات الإشعال أو السوائل عندما يحين موعدها. نحدد كل بند حسب الطراز وسجل الصيانة.'],
    ['Service A وService B', 'يرتبط نطاق الزيارة ببيانات السيارة ومؤشر ASSYST وسجل الأعمال السابقة. لا نعتمد قائمة موحدة لجميع طرازات مرسيدس.'],
    ['الأعمال الإضافية', 'تشخيص الأعطال والإصلاحات والتسريبات والإطارات والفرامل وصيانة ناقل الحركة تُدرج بصورة منفصلة ما لم ينص عرض السعر على شمولها.'],
  ] : [
    ['Minor service', 'Typically centres on due oil/filter work and scheduled inspections. An oil change alone may not complete all the service items required by the vehicle.'],
    ['Major service', 'May include additional filters, spark plugs or fluid work when due. Each item is selected from the exact vehicle schedule and history, rather than a fixed package name.'],
    ['Service A and Service B', 'The VIN, model year, mileage, ASSYST display and previous work determine the visit. A/B labels and minor/major labels do not establish one universal checklist.'],
    ['Separately quoted work', 'Fault diagnosis, repairs, leaks, tyres, brakes and transmission servicing are separate unless expressly included. Additional findings are explained before extra work is approved.'],
  ];
  return (
    <section id="mercedes-maintenance-scope" className="brand-section scroll-mt-[10rem] border-t border-white/5 bg-charcoal/20 py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h2 className="text-2xl font-black sm:text-4xl">{isArabic ? 'نطاق صيانة مرسيدس: الخدمة الصغيرة والكبيرة' : 'Mercedes minor and major service: what is included?'}</h2>
        <dl className="mt-7 grid gap-4 sm:grid-cols-2">
          {rows.map(([title, description]) => <div key={title} className="card-premium rounded-2xl p-5 sm:p-6"><dt className="text-lg font-bold">{title}</dt><dd className="mt-3 text-sm leading-7 text-white/65">{description}</dd></div>)}
        </dl>
        <div className="mt-8 max-w-3xl space-y-4 text-sm leading-7 text-white/65">
          <h3 className="text-xl font-bold text-off-white">{isArabic ? 'ما المعلومات المطلوبة للحجز وعرض السعر؟' : 'What to send for a service quote'}</h3>
          <p>{isArabic ? 'أرسل رقم الهيكل VIN أو الطراز وسنة الصنع، والمسافة المقطوعة، وصورة رسالة الصيانة، وسجل آخر زيارة إن توفر. اذكر أي تحذير أو تسريب أو صوت غير معتاد حتى نميز بين الصيانة الدورية وتشخيص العطل.' : 'Send the VIN or model and year, mileage, a photo of the service-display message and the last service record if available. Include any warning, leak or unusual noise so scheduled maintenance and fault investigation can be scoped separately.'}</p>
          <p>{isArabic ? 'يوضح العرض قطع الغيار والسوائل والكميات وأجرة العمل والتشخيص والضريبة وأي أعمال غير مشمولة. نؤكد توفر القطع والموعد والمدة المتوقعة قبل بدء العمل.' : 'The estimate should identify parts, fluid specifications and quantities, labour, diagnosis, tax and exclusions. Parts availability, appointment time and expected duration are confirmed before work begins.'}</p>
          <p>{isArabic ? 'الورشة في منطقة القوز الصناعية 3، دبي. للحجز ومعرفة ساعات العمل الحالية اتصل أو راسلنا على ‎+971 4 340 2223 قبل الزيارة.' : 'Visit the workshop in Al Quoz Industrial Area 3, Dubai. Call or WhatsApp +971 4 340 2223 to confirm the appointment and current opening hours before travelling.'}</p>
          <div className="flex flex-wrap gap-x-6 gap-y-3 pt-2">
            <Link to="/services/mercedes-oil-change-dubai" className="font-semibold text-burnt-orange hover:underline">{isArabic ? 'تغيير زيت مرسيدس والفلتر' : 'Engine oil and filter scope'}</Link>
            {!isArabic && <><Link to="/blog/mercedes-service-cost-dubai-guide" className="font-semibold text-burnt-orange hover:underline">How service costs are calculated</Link><Link to="/blog/mercedes-service-intervals-dubai-heat" className="font-semibold text-burnt-orange hover:underline">ASSYST and service intervals</Link></>}
          </div>
        </div>
      </div>
    </section>
  );
}
