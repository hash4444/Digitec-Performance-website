import { LocalizedLink as Link } from '@/components/LocalizedLink';
import { useLocale } from '@/i18n/use-locale';

/** Visible publisher context; it never implies a named technical review. */
export function WorkshopGuideContext({ project = false }: { project?: boolean }) {
  const { isArabic } = useLocale();
  return (
    <aside aria-label={isArabic ? 'عن هذا المحتوى' : 'About this content'} className="mt-10 rounded-xl border border-white/10 bg-white/[0.025] p-5 text-sm leading-relaxed text-white/65">
      <h2 className="font-bold text-off-white">{isArabic ? 'عن هذا المحتوى' : project ? 'About this workshop project' : 'About this guide'}</h2>
      <p className="mt-3">
        {isArabic ? 'ينشر هذا المحتوى مركز ديجي-تك، ورشة مستقلة في القوز الصناعية 3 بدبي. ' : 'Published by DIGI-TEC Performance Center, an independent workshop in Al Quoz Industrial Area 3, Dubai. '}
        {isArabic
          ? project
            ? 'تخص الأعمال والمواصفات المذكورة هذا المشروع. لا تُعد الصور أو أرقام الحزم أو أهداف المشروع نتائج أداء مقاسة ما لم تُرفق بسجل قياس موثق.'
            : 'المعلومات العامة لا تحدد عطل سيارتك؛ ويتطلب التشخيص تحديد الطراز وسنة الصنع والتجهيزات وفحص السيارة.'
          : project
            ? 'The work and specifications described belong to this project. Photos, package figures and build targets should be read separately from any documented measured result.'
            : 'General guidance cannot diagnose your car. The model, year, fitted systems and inspection findings determine the appropriate repair.'}
      </p>
      <p className="mt-3">
        <Link to="/about#workshop-guides" className="font-semibold text-burnt-orange underline underline-offset-4">{isArabic ? 'معايير الأدلة والتصحيحات' : 'Evidence and correction standards'}</Link>
        {' · '}
        <a href="mailto:info@digitecme.com?subject=Website%20guide%20question%20or%20correction" className="text-burnt-orange underline underline-offset-4">{isArabic ? 'إرسال سؤال أو تصحيح' : 'Send a question or correction'}</a>
      </p>
    </aside>
  );
}
