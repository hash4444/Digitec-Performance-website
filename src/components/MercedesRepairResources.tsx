import { Link } from 'react-router-dom';
import { useLocale } from '@/i18n/use-locale';

/** Explicit language destinations: diagnostic guides and model tunes are EN-only. */
export function MercedesRepairResources() {
  const { isArabic } = useLocale();
  const links = isArabic ? [
    { href: '/ar/services/mercedes-diagnostics-dubai', title: 'فحص أعطال مرسيدس', text: 'ابدأ بالفحص عند ظهور تحذير أو تغير في أداء السيارة.' },
    { href: '/ar/brands/mercedes-benz-service-dubai', title: 'صيانة وإصلاح مرسيدس', text: 'حدد نطاق الخدمة بحسب الطراز والسجل والحالة الفعلية.' },
    { href: '/ar/tuning', title: 'تخطيط مشروع الأداء', text: 'ناقش توافق السيارة وحالتها والقطع والبرمجيات قبل اختيار الحزمة.' },
  ] : [
    { href: '/mercedes/problems', title: 'Understand a Mercedes warning or symptom', text: 'Start with focused guides for AIRMATIC, shifting, cooling, AC, oil leaks and starting concerns.' },
    { href: '/services/mercedes-diagnostics-dubai', title: 'Arrange Mercedes fault diagnosis', text: 'Share the model, year and exact symptoms so the appropriate inspection can be agreed.' },
    { href: '/tuning', title: 'Plan an AMG tuning project', text: 'Compare supported packages, then confirm vehicle condition, software, hardware and the validation scope.' },
  ];
  return (
    <section aria-labelledby="mercedes-next-step-heading" className="border-t border-white/10 py-10 sm:py-14">
      <div className="mx-auto max-w-5xl px-5 sm:px-6">
        <h2 id="mercedes-next-step-heading" className="text-2xl font-bold">{isArabic ? 'الخطوة التالية لسيارة مرسيدس' : 'Mercedes repair and tuning: choose your next step'}</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {links.map((item) => (
            <Link key={item.href} to={item.href} className="group rounded-xl border border-white/10 bg-white/[0.025] p-5 transition-colors hover:border-burnt-orange/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burnt-orange">
              <h3 className="font-bold text-off-white group-hover:text-burnt-orange">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/65">{item.text}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
