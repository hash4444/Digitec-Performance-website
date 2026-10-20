import { useState, type ChangeEvent, type FormEvent } from 'react';
import { z } from 'zod';
import { MessageCircle } from 'lucide-react';
import { useLocale } from '@/i18n/use-locale';
import { trackWhatsAppClick } from '@/lib/whatsapp-tracking';

const initialValues = { model: '', year: '', mileage: '', issue: '', history: '', appointment: '', name: '', phone: '' };
type Field = keyof typeof initialValues;

export default function MercedesServiceBookingForm() {
  const { isArabic } = useLocale();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const schema = z.object({
    model: z.string().trim().min(2, isArabic ? 'يرجى إدخال الطراز' : 'Enter your Mercedes model').max(80),
    year: z.string().trim().max(30),
    mileage: z.string().trim().max(40),
    issue: z.string().trim().min(2, isArabic ? 'أدخل رسالة الصيانة أو اكتب غير معروف' : 'Enter the service message, or write unknown').max(600),
    history: z.string().trim().max(400),
    appointment: z.string().trim().max(120),
    name: z.string().trim().max(80),
    phone: z.string().trim().max(20).refine(value => !value || (/^[+0-9\s()-]+$/.test(value) && value.replace(/\D/g, '').length >= 7), isArabic ? 'أدخل رقم هاتف صحيحاً أو اتركه فارغاً' : 'Enter a valid phone number or leave it blank'),
  });
  const fields: { key: Field; label: string; placeholder: string; limit: number; required?: boolean; multiline?: boolean }[] = isArabic ? [
    { key: 'model', label: 'طراز مرسيدس', placeholder: 'مثلاً C200 أو GLC 300', limit: 80, required: true },
    { key: 'year', label: 'سنة الصنع (إن عُرفت)', placeholder: 'مثلاً 2020', limit: 30 },
    { key: 'mileage', label: 'المسافة المقطوعة والوحدة (إن عُرفت)', placeholder: 'مثلاً 45000 كم', limit: 40 },
    { key: 'issue', label: 'رسالة Service A أو Service B أو رسالة الصيانة الأخرى', placeholder: 'انقل الرسالة، أو اكتب غير معروف. اذكر أي تحذير أو أعراض منفصلة.', limit: 600, required: true, multiline: true },
    { key: 'history', label: 'سجل الصيانة السابق (إن توفر)', placeholder: 'تاريخ آخر خدمة والمسافة والأعمال المنفذة، أو غير معروف', limit: 400, multiline: true },
    { key: 'appointment', label: 'الموعد المفضل (اختياري)', placeholder: 'اليوم والوقت المفضلان؛ يؤكد الفريق التوفر', limit: 120 },
    { key: 'name', label: 'الاسم (اختياري)', placeholder: 'اسمك', limit: 80 },
    { key: 'phone', label: 'رقم للاتصال (اختياري)', placeholder: '+971 50 000 0000', limit: 20 },
  ] : [
    { key: 'model', label: 'Mercedes model', placeholder: 'e.g. C200 or GLC 300', limit: 80, required: true },
    { key: 'year', label: 'Model year (if known)', placeholder: 'e.g. 2020', limit: 30 },
    { key: 'mileage', label: 'Mileage and unit (if known)', placeholder: 'e.g. 45,000 km', limit: 40 },
    { key: 'issue', label: 'Service A/B reminder or other service message', placeholder: 'Copy the message, or write unknown. Mention any separate warning or symptoms.', limit: 600, required: true, multiline: true },
    { key: 'history', label: 'Previous service history (if available)', placeholder: 'Last service date, mileage and completed work, or unknown', limit: 400, multiline: true },
    { key: 'appointment', label: 'Preferred appointment (optional)', placeholder: 'Preferred day/time; the team confirms availability', limit: 120 },
    { key: 'name', label: 'Name (optional)', placeholder: 'Your name', limit: 80 },
    { key: 'phone', label: 'Callback number (optional)', placeholder: '+971 50 000 0000', limit: 20 },
  ];
  function submit(event: FormEvent) {
    event.preventDefault();
    const result = schema.safeParse(values);
    if (!result.success) {
      const nextErrors: Partial<Record<Field, string>> = {};
      for (const issue of result.error.issues) nextErrors[issue.path[0] as Field] = issue.message;
      setErrors(nextErrors);
      return;
    }
    setErrors({});
    const data = result.data;
    const message = [
      isArabic ? 'طلب موعد لصيانة مرسيدس من digitecme.com' : 'Mercedes service appointment request from digitecme.com',
      ...fields.flatMap(field => data[field.key] ? [`${field.label}: ${data[field.key]}`] : []),
    ].join('\n');
    const url = `https://wa.me/97143402223?text=${encodeURIComponent(message)}`;
    trackWhatsAppClick(url);
    window.gtag?.('event', 'whatsapp_draft_opened', {
      brand: 'Mercedes-Benz', page_path: window.location.pathname, form_id: 'brand-booking-form',
      cta_placement: 'booking_form', service_intent: 'scheduled_maintenance',
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  }
  const inputClass = 'w-full rounded-2xl border border-white/10 bg-black/60 px-4 py-3 text-off-white outline-none transition-colors placeholder:text-gray-500 focus:border-burnt-orange/60';
  return (
    <form id="brand-booking-form" data-mercedes-service-form onSubmit={submit} className="space-y-4" noValidate aria-describedby="mercedes-draft-note">
      {fields.map(field => {
        const common = {
          id: `bf-${field.key}`, value: values[field.key], required: field.required,
          onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setValues(previous => ({ ...previous, [field.key]: event.target.value })),
          maxLength: field.limit, placeholder: field.placeholder, 'aria-invalid': Boolean(errors[field.key]),
          'aria-describedby': errors[field.key] ? `bf-${field.key}-error` : undefined,
        };
        return <div key={field.key}>
          <label htmlFor={common.id} className="mb-2 block text-sm text-gray-300">{field.label}</label>
          {field.multiline ? <textarea {...common} rows={3} className={`${inputClass} resize-y`} /> : <input {...common} type={field.key === 'phone' ? 'tel' : 'text'} autoComplete={field.key === 'phone' ? 'tel' : field.key === 'name' ? 'name' : undefined} dir={field.key === 'phone' ? 'ltr' : undefined} className={inputClass} />}
          {errors[field.key] && <p id={`bf-${field.key}-error`} role="alert" className="mt-1 text-xs text-burnt-orange">{errors[field.key]}</p>}
        </div>;
      })}
      <button type="submit" className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-burnt-orange px-6 py-4 font-bold text-black transition-colors hover:bg-burnt-orange/90 sm:w-auto">
        <MessageCircle className="h-5 w-5 shrink-0" />{isArabic ? 'جهّز طلب الصيانة في واتساب' : 'Prepare service request in WhatsApp'}
      </button>
      <p id="mercedes-draft-note" className="text-xs leading-6 text-gray-400">{isArabic ? 'يكفي الطراز ورسالة الصيانة للبدء؛ يمكنك كتابة غير معروف. يجهز النموذج مسودة فقط. راجعها وأرسلها في واتساب ليتلقى الفريق الطلب. فتح المسودة لا يؤكد موعداً؛ يؤكد الفريق نطاق العمل والتوفر بعد الرد.' : 'Your model and service message are enough to start; you can write unknown. This form only prepares a draft. Review and send it in WhatsApp so the team receives your request. Opening the draft does not confirm an appointment; the team confirms the scope and availability when replying.'}</p>
    </form>
  );
}
