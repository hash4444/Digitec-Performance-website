import { LocalizedLink } from '@/components/LocalizedLink';
import { diagnosticAcLinks, type DiagnosticAcMode } from '@/data/diagnosticsAcGeneralContent';

export function DiagnosticAcEnquiryPanel({ mode, isArabic, whatsappHref, brandSlug }: { mode: DiagnosticAcMode; isArabic: boolean; whatsappHref: string; brandSlug?: string }) {
  return (
    <section data-diagnostic-ac-enquiry={mode} aria-labelledby="diagnostic-ac-enquiry-title" className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
      <h2 id="diagnostic-ac-enquiry-title" className="text-2xl font-semibold sm:text-3xl">{isArabic ? 'اطلب الفحص ثم ناقش عرض الإصلاح' : 'Request assessment, then review the repair quote'}</h2>
      <p className="mt-4 text-base leading-8 text-gray-300">{isArabic
        ? mode === 'ac' ? 'أرسل الصانع والطراز والسنة ووصف التبريد وتدفق الهواء وظروف المشكلة وأعمال التكييف أو تعبئة الغاز السابقة. يُؤكد نطاق الفحص وتكلفته قبل البدء؛ تُناقش أي اختبارات أو أعمال فك إضافية قبل اعتمادها. تُحدد الخدمة أو القطع من النتائج، مع توضيح التكلفة والتحقق المناسب والتوفر.' : 'أرسل الصانع والطراز والسنة والمسافة والتحذير والأعراض ووقت ظهورها والأعمال الحديثة. يُؤكد نطاق الفحص وتكلفته أولاً. يوضح الفريق ما تأكد وما يحتاج إلى اختبار إضافي قبل عرض الإصلاح؛ لا يُقرر تغيير وحدة أو قطعة من رمز عطل وحده.'
        : mode === 'ac' ? 'Send make, model, year, cooling and airflow symptoms, when they happen and previous AC repairs or refrigerant work. Confirm the initial inspection scope and cost first; discuss further testing or dismantling before approval. Findings determine supported service or parts, with cost, completion checks and availability explained.' : 'Send make, model, year, mileage, warning text, symptoms, when they occur and recent work. Confirm the initial assessment scope and cost first. The team separates confirmed findings from further tests before a repair estimate; a code alone does not establish a failed module or part.'}</p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <a href={whatsappHref} data-cta-placement="diagnostic_ac_quote" target="_blank" rel="noopener noreferrer" className="btn-primary justify-center">{isArabic ? mode === 'ac' ? 'اطلب فحص التكييف عبر واتساب' : 'اطلب تشخيص العطل عبر واتساب' : mode === 'ac' ? 'Discuss AC assessment on WhatsApp' : 'Discuss diagnostics on WhatsApp'}</a>
        <a href="tel:+97143402223" data-cta-placement="diagnostic_ac_quote" className="btn-secondary justify-center">{isArabic ? <>اتصل بالورشة <bdi dir="ltr">+971 4 340 2223</bdi></> : 'Call +971 4 340 2223'}</a>
      </div>
      <p data-diagnostic-ac-draft-note className="mt-4 text-sm leading-7 text-gray-400">{isArabic ? 'يفتح الرابط مسودة واتساب. أكمل التفاصيل وراجعها واضغط إرسال في واتساب ليستلمها الفريق. فتح المسودة لا يؤكد استلام الطلب أو حجز موعد؛ يؤكد الفريق التوفر ونطاق الفحص بعد استلام الرسالة.' : 'The link opens a WhatsApp draft. Complete the details, review it and press Send in WhatsApp for the team to receive it. Opening the draft does not confirm receipt or book an appointment; the team confirms availability and scope after receiving your message.'}</p>
      <nav aria-label={isArabic ? 'الفحوص والخدمات المرتبطة' : 'Related diagnostic and AC services'} className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-6">
        {diagnosticAcLinks(mode, brandSlug).map(link => <LocalizedLink key={link.path} to={link.path} className="inline-flex min-h-11 items-center text-sm font-semibold text-burnt-orange underline">{isArabic ? link.ar : link.en}</LocalizedLink>)}
      </nav>
    </section>
  );
}
