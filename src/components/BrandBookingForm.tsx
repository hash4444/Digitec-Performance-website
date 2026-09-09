import React, { useState } from 'react';
import { z } from 'zod';
import { MessageCircle } from 'lucide-react';
import { useLocale } from '@/i18n/use-locale';
import { trackWhatsAppClick } from '@/lib/whatsapp-tracking';

const getSchema = (isArabic: boolean) => z.object({
  name: z.string().trim().max(80),
  phone: z
    .string()
    .trim()
    .max(20)
    .refine(value => !value || (/^[+0-9\s()-]+$/.test(value) && value.replace(/\D/g, '').length >= 7), isArabic ? 'يرجى إدخال رقم هاتف صحيح أو تركه فارغاً' : 'Enter a valid phone number or leave it blank'),
  issue: z.string().trim().min(5, isArabic ? 'يرجى وصف الخدمة أو المشكلة باختصار' : 'Please describe the issue briefly').max(600),
});

interface Props {
  brandName: string;
  issuePlaceholder?: string;
}

const BrandBookingForm: React.FC<Props> = ({ brandName, issuePlaceholder }) => {
  const { isArabic } = useLocale();
  const [values, setValues] = useState({ name: '', phone: '', issue: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = getSchema(isArabic).safeParse(values);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((i) => {
        fieldErrors[i.path[0] as string] = i.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    const message = [
      isArabic ? 'طلب حجز من digitecme.com' : 'Booking request from digitecme.com',
      result.data.name && `${isArabic ? 'الاسم' : 'Name'}: ${result.data.name}`,
      result.data.phone && `${isArabic ? 'الهاتف' : 'Phone'}: ${result.data.phone}`,
      `${isArabic ? 'العلامة' : 'Brand'}: ${brandName}`,
      `${isArabic ? 'الخدمة أو المشكلة' : 'Issue'}: ${result.data.issue}`,
    ].filter(Boolean).join('\n');
    const url = `https://wa.me/97143402223?text=${encodeURIComponent(message)}`;
    trackWhatsAppClick(url);
    window.gtag?.('event', 'whatsapp_draft_opened', {
      brand: brandName,
      page_path: window.location.pathname,
      form_id: 'brand-booking-form',
      cta_placement: 'booking_form',
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const input =
    'w-full bg-black/60 border border-white/10 focus:border-burnt-orange/60 rounded-2xl px-4 py-3 text-off-white placeholder-gray-500 outline-none transition-colors';

  return (
    <form id="brand-booking-form" onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="bf-name" className="block text-sm text-gray-300 mb-2">{isArabic ? 'الاسم (اختياري)' : 'Name (optional)'}</label>
          <input
            id="bf-name"
            type="text"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'bf-name-error' : undefined}
            value={values.name}
            onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
            className={input}
            placeholder={isArabic ? 'مثال: أحمد المنصوري' : 'e.g. Ahmed Al Mansouri'}
            maxLength={80}
          />
          {errors.name && <p id="bf-name-error" role="alert" className="text-burnt-orange text-xs mt-1">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="bf-phone" className="block text-sm text-gray-300 mb-2">{isArabic ? 'رقم للاتصال (اختياري)' : 'Callback number (optional)'}</label>
          <input
            id="bf-phone"
            type="tel"
            autoComplete="tel"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'bf-phone-error' : undefined}
            value={values.phone}
            onChange={(e) => setValues((v) => ({ ...v, phone: e.target.value }))}
            className={input}
            placeholder="+971 50 000 0000"
            maxLength={20}
          />
          {errors.phone && <p id="bf-phone-error" role="alert" className="text-burnt-orange text-xs mt-1">{errors.phone}</p>}
        </div>
      </div>
      <div>
        <label htmlFor="bf-brand" className="block text-sm text-gray-300 mb-2">{isArabic ? 'العلامة' : 'Brand'}</label>
        <input
          id="bf-brand"
          type="text"
          value={brandName}
          readOnly
          className={`${input} opacity-80 cursor-not-allowed`}
        />
      </div>
      <div>
        <label htmlFor="bf-issue" className="block text-sm text-gray-300 mb-2">{isArabic ? 'كيف يمكننا مساعدتك؟' : 'How can we help?'}</label>
        <textarea
          id="bf-issue"
          rows={4}
          required
          aria-invalid={Boolean(errors.issue)}
          aria-describedby={errors.issue ? 'bf-issue-error' : undefined}
          value={values.issue}
          onChange={(e) => setValues((v) => ({ ...v, issue: e.target.value }))}
          className={`${input} resize-none`}
          placeholder={isArabic ? 'أخبرنا عن سيارتك وما تحتاج إليه: صيانة أو إصلاح أو تشخيص أو تطوير أداء' : issuePlaceholder ?? 'Tell us about your car and what you need (service, repair, diagnostics, tuning, etc.)'}
          maxLength={600}
        />
        {errors.issue && <p id="bf-issue-error" role="alert" className="text-burnt-orange text-xs mt-1">{errors.issue}</p>}
      </div>
      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-burnt-orange hover:bg-burnt-orange/90 text-black font-bold px-8 py-4 rounded-2xl transition-all duration-300 hover:scale-[1.02] shadow-xl"
      >
        <MessageCircle className="w-5 h-5" />
        {isArabic ? 'المتابعة إلى واتساب' : 'Continue to WhatsApp'}
      </button>
      <p className="text-xs text-gray-500">
        {isArabic ? 'الاسم ورقم الهاتف اختياريان. راجع رسالتك وأرسلها في واتساب. نرد خلال ساعات العمل: الاثنين–الجمعة من 8 صباحاً إلى 6:30 مساءً، والسبت من 8 صباحاً إلى 2 مساءً.' : 'Name and phone number are optional. Review and send your message in WhatsApp. We respond during working hours: Monday–Friday 8:00 AM–6:30 PM, Saturday 8:00 AM–2:00 PM.'}
      </p>
    </form>
  );
};

export default BrandBookingForm;
