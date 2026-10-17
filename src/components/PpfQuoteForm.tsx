import { useEffect, useRef, useState, type FormEvent } from 'react';
import { MessageCircle } from 'lucide-react';
import { trackWhatsAppClick } from '@/lib/whatsapp-tracking';
import { useLocale } from '@/i18n/use-locale';
import { ATTRIBUTION_KEY } from '@/lib/contact-attribution';
import { buildPpfEnquiryContext, createPpfEnquiryReference, ppfReferenceLines } from '@/lib/ppf-enquiry';

export default function PpfQuoteForm() {
  const { isArabic } = useLocale();
  const text = (en: string, ar: string) => isArabic ? ar : en;
  const [values, setValues] = useState({ brand: '', model: '', year: '', coverage: 'Unsure — advise me', name: '', contactMethod: 'WhatsApp', contact: '', notes: '' });
  const [error, setError] = useState('');
  const started = useRef(false);
  const submitting = useRef(false);
  const enquiryReference = useRef<string>();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
    const resetSubmission = () => { submitting.current = false; };
    window.addEventListener('pageshow', resetSubmission);
    return () => window.removeEventListener('pageshow', resetSubmission);
  }, []);
  const track = (event: string) => window.gtag?.('event', event, {
    page_path: window.location.pathname, form_id: 'ppf-quote-form', cta_placement: 'ppf_quote', service: 'ppf',
  });
  const update = (key: keyof typeof values, value: string) => {
    if (!started.current) { started.current = true; track('quote_started'); }
    submitting.current = false;
    setValues((current) => ({ ...current, [key]: value, ...(key === 'contactMethod' ? { contact: '' } : {}) }));
    setError('');
  };
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!ready || submitting.current) return;
    if (![values.brand, values.model, values.name, values.contact].every(value => value.trim())) {
      setError(text('Please enter your vehicle, name and contact details.', 'يرجى إدخال بيانات السيارة والاسم وبيانات التواصل.'));
      return;
    }
    const year = Number(values.year);
    if (!Number.isInteger(year) || year < 1900 || year > new Date().getFullYear() + 1) {
      setError(text('Please enter a valid vehicle year.', 'يرجى إدخال سنة صنع صحيحة.'));
      return;
    }
    const contact = values.contact.trim();
    const validContact = values.contactMethod === 'Email'
      ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact)
      : /^\+?[\d\s().-]+$/.test(contact) && contact.replace(/\D/g, '').length >= 7 && contact.replace(/\D/g, '').length <= 15;
    if (!validContact) {
      setError(text('Please enter a valid email address or phone number with country code for your selected contact method.', 'يرجى إدخال بريد إلكتروني صحيح أو رقم هاتف مع رمز الدولة حسب وسيلة التواصل المختارة.'));
      return;
    }
    let reference = enquiryReference.current;
    if (!reference) {
      try { reference = createPpfEnquiryReference(); }
      catch {
        setError(text('The request could not be prepared. Please try again or use the WhatsApp or call links on this page.', 'تعذّر إعداد الطلب. يرجى المحاولة مجدداً أو استخدام روابط واتساب أو الاتصال في هذه الصفحة.'));
        return;
      }
      enquiryReference.current = reference;
    }
    let storedAttribution: unknown;
    try { storedAttribution = JSON.parse(window.sessionStorage.getItem(ATTRIBUTION_KEY) || '{}'); }
    catch { storedAttribution = {}; }
    const context = buildPpfEnquiryContext(window.location.href, storedAttribution);
    submitting.current = true;
    const message = [
      text('PPF quote request from digitecme.com', 'طلب عرض سعر PPF من digitecme.com'),
      ...ppfReferenceLines(reference, context),
      'Vehicle brand: ' + values.brand.trim(), 'Model: ' + values.model.trim(), 'Year: ' + values.year,
      'Requested coverage: ' + values.coverage, 'Customer name: ' + values.name.trim(),
      'Preferred contact method: ' + values.contactMethod, 'Contact details: ' + contact,
      ...(values.notes.trim() ? ['Customer notes: ' + values.notes.trim()] : []),
      'Please confirm panel coverage, film options, preparation, price and installation time.',
      'Contact permission: reply to this quote request only; no marketing subscription.',
    ].join('\n');
    const url = 'https://wa.me/97143402223?text=' + encodeURIComponent(message);
    // A draft handoff has no receipt acknowledgement. Never emit submitted-lead
    // or booking-confirmed events here, or include entered values in analytics.
    trackWhatsAppClick(url);
    track('whatsapp_draft_opened');
    window.location.assign(url);
  };
  return (
    <form id="ppf-quote-form" className="ppf-form" onSubmit={submit} aria-describedby="ppf-privacy" dir={isArabic ? 'rtl' : undefined}>
      {/* Disable all fields before hydration to prevent implicit GETs on Enter. */}
      <fieldset disabled={!ready}>
        <legend className="sr-only">{text('Your PPF quotation details', 'بيانات طلب عرض سعر PPF')}</legend>
        <div className="ppf-form-grid">
          <div><label htmlFor="ppf-brand">{text('Vehicle brand', 'ماركة السيارة')}</label><input id="ppf-brand" dir="auto" name="vehicle_brand" required maxLength={60} value={values.brand} onChange={(e) => update('brand', e.target.value)} placeholder={text('e.g. Porsche', 'مثلاً بورشه')} autoComplete="off" /></div>
          <div><label htmlFor="ppf-model">{text('Vehicle model', 'طراز السيارة')}</label><input id="ppf-model" dir="auto" name="vehicle_model" required maxLength={80} value={values.model} onChange={(e) => update('model', e.target.value)} placeholder={text('e.g. 911 Carrera', 'مثلاً 911 كاريرا')} autoComplete="off" /></div>
          <div><label htmlFor="ppf-year">{text('Year', 'سنة الصنع')}</label><input id="ppf-year" name="vehicle_year" type="number" inputMode="numeric" required min={1900} max={new Date().getFullYear() + 1} step={1} value={values.year} onChange={(e) => update('year', e.target.value)} placeholder="2025" /></div>
          <div><label htmlFor="ppf-requested-coverage">{text('Requested coverage', 'التغطية المطلوبة')}</label><select id="ppf-requested-coverage" name="coverage" required value={values.coverage} onChange={(e) => update('coverage', e.target.value)}>
            <option value="Unsure — advise me">{text('Unsure — advise me', 'غير متأكد — أحتاج إلى المشورة')}</option>
            <option value="Full Body">{text('Full Body', 'تغطية كاملة للهيكل')}</option>
            <option value="Full Front">{text('Full Front — confirm availability', 'تغطية أمامية كاملة — تُؤكّد الإتاحة')}</option>
            <option value="Partial / High Impact Areas">{text('Partial / High Impact Areas', 'تغطية جزئية / مناطق معرّضة للصدمات')}</option>
          </select></div>
          <div><label htmlFor="ppf-name">{text('Customer name', 'الاسم')}</label><input id="ppf-name" dir="auto" name="customer_name" autoComplete="name" required maxLength={100} value={values.name} onChange={(e) => update('name', e.target.value)} /></div>
          <div><label htmlFor="ppf-contact-method">{text('Preferred contact method', 'وسيلة التواصل المفضلة')}</label><select id="ppf-contact-method" name="contact_method" required value={values.contactMethod} onChange={(e) => update('contactMethod', e.target.value)}><option value="WhatsApp">{text('WhatsApp', 'واتساب')}</option><option value="Phone">{text('Phone', 'الهاتف')}</option><option value="Email">{text('Email', 'البريد الإلكتروني')}</option></select></div>
          <div className="ppf-form-wide"><label htmlFor="ppf-contact-details">{values.contactMethod === 'Email' ? text('Email address', 'البريد الإلكتروني') : text('Phone number including country code', 'رقم الهاتف مع رمز الدولة')}</label><input id="ppf-contact-details" name="contact_details" required type={values.contactMethod === 'Email' ? 'email' : 'tel'} autoComplete={values.contactMethod === 'Email' ? 'email' : 'tel'} maxLength={160} value={values.contact} onChange={(e) => update('contact', e.target.value)} aria-describedby="ppf-contact-help" dir="ltr" /><p id="ppf-contact-help" className="ppf-small">{text('Your preferred reply method will be included in the WhatsApp request.', 'ستُدرج وسيلة الرد المفضلة في طلب واتساب.')}</p></div>
          <div className="ppf-form-wide"><label htmlFor="ppf-notes">{text('Customer notes (optional)', 'ملاحظات (اختياري)')}</label><textarea id="ppf-notes" dir="auto" name="customer_notes" rows={3} maxLength={1000} value={values.notes} onChange={(e) => update('notes', e.target.value)} /></div>
        </div>
        {error && <p id="ppf-form-error" role="alert">{error}</p>}
        <button type="submit" disabled={!ready} className="ppf-button ppf-button-primary"><MessageCircle size={19} aria-hidden="true" />{text('Continue to WhatsApp', 'المتابعة إلى واتساب')}</button>
      </fieldset>
      <p id="ppf-privacy" className="ppf-small">{text('Continuing shares these vehicle and contact details with WhatsApp to prepare an editable draft. Review and send it to request a quote from DIGI-TEC Performance Center L.L.C. An enquiry reference and limited source labels help the team match your request to a quote. This form cannot confirm receipt. Choosing Phone or Email specifies how you prefer a reply. These details are for this enquiry and do not subscribe you to marketing. ', 'بالمتابعة تُشارك بيانات السيارة والتواصل مع واتساب لإعداد مسودة قابلة للتعديل. راجعها وأرسلها لطلب عرض سعر من DIGI-TEC Performance Center L.L.C. يساعد رقم مرجعي للاستفسار ومعلومات مصدر محدودة في ربط طلبك بعرض السعر. لا يمكن لهذا النموذج تأكيد الاستلام. اختيار الهاتف أو البريد الإلكتروني يحدّد وسيلة الرد المفضلة. البيانات لهذا الاستفسار فقط ولا تشترك بها في رسائل تسويقية. ')}<a href="/privacy-policy.pdf" target="_blank" rel="noopener noreferrer">{text('Privacy policy', 'سياسة الخصوصية')}</a></p>
      <noscript><p>{text('Please use the WhatsApp or call links on this page to request your quote.', 'يرجى استخدام روابط واتساب أو الاتصال في هذه الصفحة لطلب عرض السعر.')}</p></noscript>
    </form>
  );
}
