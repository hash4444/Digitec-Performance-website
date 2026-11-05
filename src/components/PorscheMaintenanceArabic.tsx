import { MessageCircle } from 'lucide-react';
import Header from '@/components/Header';
import { Footer } from '@/components/Footer';
import { LocalizedLink as Link } from '@/components/LocalizedLink';
import { useSeo } from '@/hooks/use-seo';
import { buildArticle, buildBreadcrumb, buildFAQ, buildWebPage, pageGraph, SITE_URL } from '@/lib/schema';
import { porscheEnquiryHref } from '@/data/porscheEnquiry';

const path = '/ar/blog/porsche-maintenance-guide-dubai';
const title = 'صيانة بورشه في دبي | الجدول والأعمال المستحقة';
const headline = 'دليل صيانة بورشه في دبي: المواعيد وما تشمل الخدمة';
const description = 'خطط لصيانة بورشه حسب الطراز والسنة والمسافة والسجل. تعرّف إلى الفرق بين تغيير الزيت والصيانة الكاملة والأعمال المستحقة وكيفية طلب عرض سعر.';
const faqs = [
  { question: 'متى تحتاج بورشه إلى الصيانة في دبي؟', answer: 'اتبع جدول الطراز وسنة الصنع ونظام الدفع والسوق ومؤشر الخدمة، مع مراجعة سجل الأعمال. قد تستدعي ظروف الاستخدام فحوص حالة إضافية؛ لا توجد فترة واحدة مناسبة لكل بورشه.' },
  { question: 'هل تغيير الزيت هو الصيانة الكاملة؟', answer: 'لا. الزيت والفلتر مهمة محددة للمحرك المناسب. قد تستحق السيارة سوائل أو فلاتر أو بواجي أو أعمالاً أخرى في مواعيد مختلفة. تُحدد البنود من بيانات السيارة ولا تُضاف تلقائياً.' },
  { question: 'ماذا لو كان سجل الصيانة ناقصاً؟', answer: 'أرسل السجلات المتاحة والمسافة ومؤشر الخدمة. لا يعني غياب الفاتورة وجوب استبدال كل شيء. اتفق على فحص أولي وقائمة بالأعمال المستحقة أو التي تحتاج إلى تأكيد قبل الموافقة.' },
  { question: 'كيف أحصل على تكلفة وموعد؟', answer: 'أرسل الطراز والسنة والمسافة والسجل والخدمة أو الأعراض. اطلب بيان البنود والقطع والسوائل والعمالة وأي تكلفة تشخيص أولي. تُؤكد المدة والموعد بعد مراجعة العمل والتوفر.' },
];

export default function PorscheMaintenanceArabic() {
  const url = `${SITE_URL}${path}`;
  const whatsapp = porscheEnquiryHref('تخطيط صيانة بورشه', true);
  useSeo({ title, description, canonical: url, ogType: 'article', jsonLd: pageGraph([
    buildWebPage({ url, name: headline, description, type: 'ItemPage', breadcrumbId: `${url}#breadcrumb`, mainEntityId: `${url}#article` }),
    buildBreadcrumb(url, [{ name: 'الرئيسية', url: `${SITE_URL}/ar` }, { name: 'Porsche', url: `${SITE_URL}/ar/brands/porsche-service-dubai` }, { name: 'دليل الصيانة', url }]),
    buildArticle({ url, headline, description, datePublished: '2026-07-16', dateModified: '2026-11-04', author: 'DIGI-TEC Workshop', section: 'صيانة بورشه' }),
    buildFAQ(url, faqs),
  ]) });
  return <div className="min-h-screen bg-black text-off-white"><Header /><main>
    <nav aria-label="مسار الصفحة" className="mx-auto flex max-w-7xl flex-wrap gap-2 px-4 pt-6 text-sm text-gray-400 sm:px-6"><Link to="/">الرئيسية</Link><span>/</span><Link to="/brands/porsche-service-dubai">Porsche</Link><span>/</span><span>دليل الصيانة</span></nav>
    <header className="border-b border-white/10 py-14 sm:py-20"><div className="mx-auto max-w-5xl px-4 sm:px-6"><p className="eyebrow mb-4">دليل مالك بورشه</p><h1 className="text-4xl font-black leading-tight sm:text-6xl">{headline}</h1><p className="mt-6 text-lg leading-relaxed text-gray-300">تبدأ خطة الصيانة بتحديد السيارة وما أُنجز سابقاً. فرّق بين العمل المستحق حسب الجدول والعطل الجديد الذي يحتاج إلى تشخيص، ثم راجع عرضاً واضحاً قبل الموافقة.</p><a href={whatsapp} data-cta-placement="porsche_maintenance_hero" target="_blank" rel="noopener noreferrer" className="btn-primary mt-7"><MessageCircle className="h-5 w-5 shrink-0" />ناقش صيانة سيارتك</a><p className="mt-5 text-sm text-gray-400"><time dateTime="2026-11-04">تحديث 4 نوفمبر 2026</time></p></div></header>
    <article className="mx-auto max-w-5xl space-y-10 px-4 py-12 sm:px-6 sm:py-16">
      <section><h2 className="text-2xl font-black sm:text-3xl">جدول السيارة وما يستحق الآن</h2><p className="mt-4 leading-relaxed text-gray-300">تختلف المتطلبات حسب الطراز والسنة والمحرك أو نظام الدفع والسوق. تُراجع المسافة والعمر ومؤشر الخدمة والفواتير. تؤثر الحرارة والرحلات القصيرة والوقوف في فحوص الحالة، لكنها لا تبرر فرض فترة استبدال واحدة أو باقة ثابتة على جميع السيارات.</p></section>
      <section><h2 className="text-2xl font-black sm:text-3xl">الزيت والصيانة الكاملة وتشخيص الأعطال</h2><p className="mt-4 leading-relaxed text-gray-300">تُؤكد مواصفة زيت المحرك والكمية والفلتر وإجراء قياس المستوى عند انطباقها على السيارة. قد تُستحق سوائل الفرامل أو خدمة الناقل أو البواجي أو الفلاتر بشكل منفصل. لا تنطبق خدمة زيت محرك الاحتراق أو PDK تلقائياً على منصة كهربائية.</p><p className="mt-4 leading-relaxed text-gray-300">تحذير أو تسرب أو رجة جديدة يحتاج إلى وصف وفحص مناسبين؛ تغيير الزيت أو مسح رمز العطل لا يثبت حل السبب. تُفصل الصيانة المجدولة عن الاختبارات والإصلاحات الإضافية في العرض.</p></section>
      <section className="rounded-2xl border border-white/10 p-6"><h2 className="text-2xl font-black">ما الذي تراجعه في عرض السعر؟</h2><ul className="mt-5 list-disc space-y-3 ps-5 leading-relaxed text-gray-300"><li>الأعمال المستحقة من جدول السيارة والسجل، وما يحتاج إلى فحص للتأكد.</li><li>مواصفات ومصدر القطع والسوائل والعمالة وتكلفة الفحص الأولي.</li><li>الموافقة على أي نطاق إضافي والوقت المتوقع حسب النتائج والتوفر.</li></ul><Link to="/brands/porsche-service-dubai" className="btn-secondary mt-6">اطلب الصيانة المناسبة عبر صفحة بورشه</Link></section>
      <section><h2 className="text-2xl font-black sm:text-3xl">الخدمة أو دليل الطراز المناسب</h2><div className="mt-6 grid gap-3 sm:grid-cols-2">{[
        ['تغيير زيت بورشه والفلاتر', '/brands/porsche-service-dubai/oil-change'], ['صيانة ناقل الحركة وفحص PDK', '/brands/porsche-service-dubai/transmission-repair'], ['تشخيص التحذيرات والأعراض', '/brands/porsche-service-dubai/engine-diagnostics'], ['فحص الفرامل', '/brands/porsche-service-dubai/brake-repair'], ['دليل بورشه 911', '/blog/porsche-911-service-dubai-guide'], ['دليل كايين', '/blog/porsche-cayenne-service-dubai-guide'], ['دليل باناميرا', '/blog/porsche-panamera-service-dubai-guide'],
      ].map(([label, destination]) => <Link key={destination} to={destination} className="card-premium flex min-h-11 items-center rounded-xl p-4 text-burnt-orange hover:underline">{label}</Link>)}</div></section>
      <section><h2 className="text-2xl font-black sm:text-3xl">أسئلة عن صيانة بورشه</h2><div className="mt-6 space-y-5">{faqs.map(faq => <div key={faq.question}><h3 className="text-lg font-bold">{faq.question}</h3><p className="mt-3 leading-relaxed text-gray-300">{faq.answer}</p></div>)}</div></section>
      <section className="rounded-2xl border border-burnt-orange/30 p-6 sm:p-8"><h2 className="text-2xl font-black">أرسل بيانات السيارة وسجلها</h2><p className="mt-4 leading-relaxed text-gray-300">أرسل الطراز والسنة والمسافة والخدمة المطلوبة أو الأعراض ونص التحذير والسجل المتاح. راجع المسودة واضغط إرسال في واتساب ليصل طلبك. يُؤكد نطاق الفحص وأي تكلفة والموعد بصورة منفصلة.</p><a href={whatsapp} data-cta-placement="porsche_maintenance_final" target="_blank" rel="noopener noreferrer" className="btn-primary mt-6"><MessageCircle className="h-5 w-5 shrink-0" />تواصل بشأن الصيانة</a></section>
    </article>
  </main><Footer /></div>;
}
