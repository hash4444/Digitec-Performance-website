import React, { useState } from 'react';
import { z } from 'zod';
import { MessageCircle } from 'lucide-react';
import { useLocale } from '@/i18n/use-locale';

const getSchema = (isArabic: boolean) => z.object({
  name: z.string().trim().min(2, isArabic ? 'يرجى إدخال الاسم' : 'Please enter your name').max(80),
  phone: z
    .string()
    .trim()
    .min(7, isArabic ? 'يرجى إدخال رقم هاتف صحيح' : 'Please enter a valid phone number')
    .max(20)
    .regex(/^[+0-9\s()-]+$/, isArabic ? 'يمكن أن يحتوي الهاتف على أرقام وعلامات + ( ) - فقط' : 'Phone can only contain digits and + ( ) -'),
  issue: z.string().trim().min(5, isArabic ? 'يرجى وصف الخدمة أو المشكلة باختصار' : 'Please describe the issue briefly').max(600),
});

interface Props {
  brandName: string;
}

const BrandBookingForm: React.FC<Props> = ({ brandName }) => {
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
    const message =
      (isArabic ? `طلب حجز من digitecme.com\nالاسم: ${result.data.name}\nالهاتف: ${result.data.phone}\nالعلامة: ${brandName}\nالخدمة أو المشكلة: ${result.data.issue}` : `Booking request from digitecme.com\nName: ${result.data.name}\nPhone: ${result.data.phone}\nBrand: ${brandName}\nIssue: ${result.data.issue}`);
    const url = `https://wa.me/97143402223?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const input =
    'w-full bg-black/60 border border-white/10 focus:border-burnt-orange/60 rounded-2xl px-4 py-3 text-off-white placeholder-gray-500 outline-none transition-colors';

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="bf-name" className="block text-sm text-gray-300 mb-2">{isArabic ? 'الاسم الكامل' : 'Full name'}</label>
          <input
            id="bf-name"
            type="text"
            value={values.name}
            onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
            className={input}
            placeholder={isArabic ? 'مثال: أحمد المنصوري' : 'e.g. Ahmed Al Mansouri'}
            maxLength={80}
          />
          {errors.name && <p className="text-burnt-orange text-xs mt-1">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="bf-phone" className="block text-sm text-gray-300 mb-2">{isArabic ? 'الهاتف' : 'Phone'}</label>
          <input
            id="bf-phone"
            type="tel"
            value={values.phone}
            onChange={(e) => setValues((v) => ({ ...v, phone: e.target.value }))}
            className={input}
            placeholder="+971 50 000 0000"
            maxLength={20}
          />
          {errors.phone && <p className="text-burnt-orange text-xs mt-1">{errors.phone}</p>}
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
          value={values.issue}
          onChange={(e) => setValues((v) => ({ ...v, issue: e.target.value }))}
          className={`${input} resize-none`}
          placeholder={isArabic ? 'أخبرنا عن سيارتك وما تحتاج إليه: صيانة أو إصلاح أو تشخيص أو تطوير أداء' : 'Tell us about your car and what you need (service, repair, diagnostics, tuning, etc.)'}
          maxLength={600}
        />
        {errors.issue && <p className="text-burnt-orange text-xs mt-1">{errors.issue}</p>}
      </div>
      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-burnt-orange hover:bg-burnt-orange/90 text-black font-bold px-8 py-4 rounded-2xl transition-all duration-300 hover:scale-[1.02] shadow-xl"
      >
        <MessageCircle className="w-5 h-5" />
        {isArabic ? 'إرسال عبر واتساب' : 'Send via WhatsApp'}
      </button>
      <p className="text-xs text-gray-500">
        {isArabic ? 'ستفتح بياناتك محادثة واتساب مجهزة مع فريق الخدمة. نرد خلال ساعات العمل: الاثنين–الجمعة من 8 صباحاً إلى 6:30 مساءً، والسبت من 8 صباحاً إلى 2 مساءً.' : 'Your details open a pre-filled WhatsApp chat with our service team. We respond during working hours: Monday–Friday 8:00 AM–6:30 PM, Saturday 8:00 AM–2:00 PM.'}
      </p>
    </form>
  );
};

export default BrandBookingForm;
