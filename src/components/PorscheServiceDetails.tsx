import { ArrowRight, MessageCircle } from 'lucide-react';
import { LocalizedLink as Link } from '@/components/LocalizedLink';
import type { ServiceKey } from '@/data/brandServices';
import { getPorscheServiceDetail } from '@/data/porscheP2Content';

export default function PorscheServiceDetails({ service, isArabic, whatsappHref }: { service: ServiceKey; isArabic: boolean; whatsappHref: string }) {
  const detail = getPorscheServiceDetail(service, isArabic);
  if (!detail) return null;
  return <section className="border-t border-white/10 bg-charcoal/20 py-10 sm:py-14" aria-labelledby="porsche-service-scope-heading">
    <div className="mx-auto max-w-5xl px-4 sm:px-6">
      <h2 id="porsche-service-scope-heading" className="text-2xl font-black sm:text-3xl">{detail.heading}</h2>
      <p className="mt-4 max-w-4xl text-base leading-relaxed text-gray-300">{detail.text}</p>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">{detail.links.map(item => <li key={item.path}><Link to={item.path} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-burnt-orange hover:underline"><span>{item.label}</span><ArrowRight className="h-4 w-4 shrink-0" /></Link></li>)}</ul>
      <a href={whatsappHref} target="_blank" rel="noopener noreferrer" data-cta-placement="porsche_service_scope" className="btn-primary mt-6"><MessageCircle className="h-5 w-5 shrink-0" />{isArabic ? 'أرسل بيانات سيارتك ونص التحذير' : 'Send your Porsche details and concern'}</a>
      <p className="mt-4 text-sm leading-relaxed text-gray-400">{isArabic ? 'راجع الرسالة واضغط إرسال في واتساب ليصل طلبك. يُؤكد نطاق الفحص وتكلفته والموعد بصورة منفصلة.' : 'Review the draft and press Send in WhatsApp so the team receives your request. Inspection scope, any charge and appointment availability are confirmed separately.'}</p>
    </div>
  </section>;
}
