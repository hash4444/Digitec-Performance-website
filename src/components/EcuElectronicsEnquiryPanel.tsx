import { LocalizedLink } from '@/components/LocalizedLink';
import type { EcuElectronicsContent } from '@/data/ecuElectronicsContent';

export function EcuElectronicsEnquiryPanel({ content, isArabic }: { content: EcuElectronicsContent; isArabic: boolean }) {
  const whatsappHref = `https://wa.me/97143402223?text=${encodeURIComponent(content.whatsAppMessage)}`;
  const label = isArabic
    ? content.mode === 'software' ? 'ناقش الترميز أو البرمجة المطلوبة' : 'اطلب فحص العطل الإلكتروني'
    : content.mode === 'software' ? 'Discuss coding or programming' : content.mode === 'infotainment' ? 'Discuss the fitted unit' : 'Request electrical assessment';
  return (
    <section data-ecu-electronics-enquiry={content.mode} aria-labelledby="ecu-electronics-scope-title" className="border-t border-white/10 py-8">
      <h2 id="ecu-electronics-scope-title" className="text-2xl font-semibold sm:text-3xl">{content.heading}</h2>
      <p className="mt-4 text-base leading-8 text-gray-300">{content.intro}</p>
      <div className="mt-6 space-y-6">
        {content.questions.map(item => <article key={item.question} data-ecu-function-question>
          <h3 className="text-lg font-semibold">{item.question}</h3>
          <p className="mt-2 text-base leading-8 text-gray-300">{item.answer}</p>
        </article>)}
      </div>
      <div data-ecu-intake className="mt-7 space-y-3">
        <h3 className="text-lg font-semibold">{isArabic ? 'ما المعلومات المطلوبة لمراجعة العمل وعرض السعر؟' : 'What helps confirm the work and quotation?'}</h3>
        <p className="text-base leading-8 text-gray-300">{content.record}</p>
        <p className="text-base leading-8 text-gray-300">{content.intakeQuote}</p>
      </div>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <a href={whatsappHref} data-cta-placement="ecu_electronics_quote" target="_blank" rel="noopener noreferrer" className="btn-primary justify-center">{label}</a>
        <a href="tel:+97143402223" data-cta-placement="ecu_electronics_quote" className="btn-secondary justify-center">{isArabic ? <>اتصل بالورشة <bdi dir="ltr">+971 4 340 2223</bdi></> : 'Call +971 4 340 2223'}</a>
      </div>
      <p data-ecu-draft-note className="mt-4 text-sm leading-7 text-gray-400">{isArabic ? 'يفتح الرابط مسودة واتساب. أكمل التفاصيل وراجعها ثم اضغط إرسال في واتساب ليستلمها الفريق. فتح المسودة لا يؤكد استلام الطلب أو حجز موعد؛ يؤكد الفريق التوفر والعمل المدعوم بعد استلام الرسالة.' : 'The link opens a WhatsApp draft. Complete the details, review it and press Send in WhatsApp for the team to receive it. Opening the draft does not confirm receipt or an appointment; the team confirms availability and supported work after receiving your message.'}</p>
      <p data-ecu-privacy className="mt-3 text-sm leading-7 text-gray-400">{isArabic ? 'شارك بيانات السيارة والعطل فقط واحذف البيانات الشخصية غير الضرورية من التقارير. لا ترسل كلمات مرور أو بيانات دخول للحسابات.' : 'Share relevant vehicle and fault details, and remove unnecessary personal information from reports. Do not send passwords or account credentials.'}</p>
      <nav aria-label={isArabic ? 'مسارات فحص وإجراءات مرتبطة' : 'Related fault and module assessment paths'} className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-6">
        {content.links.map(link => <LocalizedLink key={link.path} to={link.path} className="inline-flex min-h-11 items-center text-sm font-semibold text-burnt-orange underline">{isArabic ? link.ar : link.en}</LocalizedLink>)}
      </nav>
    </section>
  );
}
