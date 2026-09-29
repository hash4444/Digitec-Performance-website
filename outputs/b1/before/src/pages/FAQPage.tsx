import React from 'react';
import { useSeo } from '@/hooks/use-seo';
import Header from '@/components/Header';
import { AnswerBlock } from '@/components/AnswerBlock';
import { FAQ, allFaqs } from '@/components/FAQ';
import { buildBreadcrumb, buildFAQ, buildWebPage, pageGraph } from '@/lib/schema';
import { FinalCTA } from '@/components/FinalCTA';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { useLocale } from '@/i18n/use-locale';
import { arFaqCategories } from '@/i18n/ar-home';
import { PageIntro } from '@/components/PageIntro';

const FAQPage = () => {
  const { isArabic } = useLocale();
  const url = `https://digitecme.com${isArabic ? '/ar' : ''}/faq`;
  const displayedFaqs = isArabic ? arFaqCategories.flatMap((category) => category.faqs) : allFaqs;
  const faqGraph = React.useMemo(
    () =>
      pageGraph([
        buildWebPage({
          url,
          name: isArabic ? 'الأسئلة الشائعة | مركز ديجي-تك دبي' : 'FAQ | DIGI-TEC Performance Center Dubai',
          description: isArabic ? 'إجابات عن صيانة وإصلاح السيارات الفاخرة والتشخيص والبرمجة وتطوير الأداء لدى ديجي-تك في دبي.' : 'Answers about luxury car servicing, ECU tuning, and performance upgrades at DIGI-TEC Performance Center Dubai.',
          type: 'WebPage',
          breadcrumbId: `${url}#breadcrumb`,
          mainEntityId: `${url}#faq`,
        }),
        buildBreadcrumb(url, [
          { name: isArabic ? 'الرئيسية' : 'Home', url: `https://digitecme.com${isArabic ? '/ar' : '/'}` },
          { name: isArabic ? 'الأسئلة الشائعة' : 'FAQ', url },
        ]),
        ...(displayedFaqs.length > 0 ? [buildFAQ(url, displayedFaqs)!] : []),
      ]),
    [displayedFaqs, isArabic, url],
  );

  useSeo({
    title: isArabic ? 'الأسئلة الشائعة | مركز ديجي-تك دبي' : 'FAQ | DIGI-TEC Performance Center Dubai',
    description: isArabic ? 'إجابات عن صيانة وإصلاح السيارات الفاخرة والتشخيص والبرمجة وتطوير الأداء وحجز المواعيد لدى ديجي-تك في دبي.' : 'Find answers to common questions about luxury car servicing, ECU tuning, and performance upgrades at DIGI-TEC Performance Center Dubai.',
    canonical: url,
    jsonLd: faqGraph,
  });

  return (
    <div className="site-page min-h-screen bg-black text-off-white">
      <Header />

      <PageIntro
        eyebrow={isArabic ? 'نحن هنا للمساعدة' : "We're Here to Help"}
        title={isArabic ? <>الأسئلة <span className="text-burnt-orange">الشائعة</span></> : <>Frequently Asked <span className="text-burnt-orange">Questions</span></>}
        description={isArabic ? 'كل ما تحتاج إلى معرفته عن خدماتنا وطريقة عملنا وخبراتنا.' : 'Everything you need to know about our services, process, and expertise.'}
      />
      <AnswerBlock
        question={isArabic ? 'كيف أحجز موعداً في ديجي-تك؟' : 'How do I book a service at Digi-Tec?'}
        answer={isArabic
          ? 'للحجز، اتصل أو أرسل رسالة واتساب إلى 971443402223+ مع ذكر طراز السيارة وسنة الصنع والأعراض التي تلاحظها، أو زر الورشة في القوز الصناعية 3، دبي. يبدأ العمل بالفحص، ثم يُشرح النطاق وعرض السعر قبل الموافقة على الإصلاح.'
          : 'To book, call or WhatsApp +971 4 340 2223 with your model, year and the symptoms you have noticed, or visit the workshop at Al Quoz Industrial Area 3, Dubai. Work starts with inspection, then the scope and estimate are explained before you approve any repair.'}
        facts={isArabic ? [
          'الهاتف والواتساب: 971443402223+',
          'العنوان: القوز الصناعية 3، دبي',
          'البريد الإلكتروني: info@digitecme.com',
        ] : [
          'Phone and WhatsApp: +971 4 340 2223',
          'Address: Al Quoz Industrial Area 3, Dubai',
          'Email: info@digitecme.com',
        ]}
      />

      {/* Reused FAQ component */}
      <FAQ />

      <FinalCTA />
      <Footer />
    </div>
  );
};

export default FAQPage;
