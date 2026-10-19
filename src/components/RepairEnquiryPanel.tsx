import { LocalizedLink } from '@/components/LocalizedLink';
import type { RepairServiceContent } from '@/data/repairServiceContent';

export function RepairEnquiryPanel({ content, isArabic, whatsappHref }: { content: RepairServiceContent; isArabic: boolean; whatsappHref: string }) {
  return (
    <section data-repair-enquiry className="border-t border-white/10 bg-charcoal/20 py-12 sm:py-16" aria-labelledby="repair-enquiry-title">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h2 id="repair-enquiry-title" className="text-2xl font-semibold sm:text-4xl">
          {isArabic ? `${content.arabicLabel}: الفحص وعرض السعر` : `${content.label}: assessment and quotation`}
        </h2>
        <div className="mt-7 grid gap-6 sm:grid-cols-2">
          <article>
            <h3 className="text-xl font-semibold">{isArabic ? 'ما التفاصيل التي تساعد على ترتيب الفحص؟' : 'What helps arrange the right inspection?'}</h3>
            <p className="mt-3 text-sm leading-7 text-gray-300">{isArabic ? content.arabicRecord : content.record}</p>
          </article>
          <article>
            <h3 className="text-xl font-semibold">{isArabic ? 'ما الذي يحتاج إلى التأكيد قبل الإصلاح؟' : 'What needs confirming before repair?'}</h3>
            <p className="mt-3 text-sm leading-7 text-gray-300">
              {isArabic ? 'يُؤكد نطاق الفحص الأولي وتكلفته قبل البدء. قد يتطلب تحديد الإصلاح اختبارات أو فكاً إضافياً تتم مناقشته أولاً. يوضح عرض الإصلاح النتائج والقطع والسوائل وأجرة العمل والإجراءات المدعومة وفحوص التحقق المناسبة. لا يُوسع العمل دون الموافقة، وتتوقف المدة على النطاق والقطع المتاحة.' : 'Confirm the initial assessment scope and its cost before work starts. A repair decision may need further tests or dismantling, discussed first. The repair estimate identifies findings, parts, fluids, labour, supported procedures and relevant completion checks. Additional work needs approval; timing depends on the agreed scope and parts availability.'}
            </p>
          </article>
        </div>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a href={whatsappHref} data-cta-placement="repair_quote" target="_blank" rel="noopener noreferrer" className="btn-primary justify-center">
            {isArabic ? 'اطلب فحصاً وعرض سعر عبر واتساب' : 'Request an assessment on WhatsApp'}
          </a>
          <a href="tel:+97143402223" data-cta-placement="repair_quote" className="btn-secondary justify-center">
            {isArabic ? <>اتصل بالورشة <bdi dir="ltr">+971 4 340 2223</bdi></> : 'Call +971 4 340 2223'}
          </a>
        </div>
        <p data-repair-draft-note className="mt-4 text-sm leading-7 text-gray-400">
          {isArabic ? 'يفتح الرابط مسودة واتساب. أكمل التفاصيل وراجع الرسالة ثم اضغط إرسال في واتساب ليستلمها الفريق. فتح الرابط لا يؤكد استلام الطلب أو حجز موعد؛ يؤكد الفريق التوفر والفحص المناسب بعد استلام الرسالة.' : 'The link opens a WhatsApp draft. Complete the details, review it and press Send in WhatsApp so the team receives your request. Opening the link does not confirm receipt or an appointment; the team confirms availability and the appropriate assessment after receiving the message.'}
        </p>
        <nav aria-label={isArabic ? 'مسارات فحص مرتبطة' : 'Related assessment paths'} className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-7">
          {content.links.map(link => <LocalizedLink key={link.path} to={link.path} className="inline-flex min-h-11 items-center text-sm font-semibold text-burnt-orange underline">{isArabic ? link.ar : link.en}</LocalizedLink>)}
        </nav>
      </div>
    </section>
  );
}
