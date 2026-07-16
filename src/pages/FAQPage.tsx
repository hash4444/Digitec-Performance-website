import React from 'react';
import { useSeo } from '@/hooks/use-seo';
import Header from '@/components/Header';
import { FAQ, allFaqs } from '@/components/FAQ';
import { buildBreadcrumb, buildFAQ, buildWebPage, pageGraph } from '@/lib/schema';
import { FinalCTA } from '@/components/FinalCTA';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { useLocale } from '@/i18n/use-locale';
import { arFaqCategories } from '@/i18n/ar-home';

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
          type: 'FAQPage',
          breadcrumbId: `${url}#breadcrumb`,
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
    <div className="min-h-screen bg-black text-off-white">
      <Header />

      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-charcoal/30 to-black" />
        <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="eyebrow mb-4"
          >
            {isArabic ? 'نحن هنا للمساعدة' : "We're Here to Help"}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black mb-6"
          >
            {isArabic ? <>الأسئلة <span className="text-burnt-orange">الشائعة</span></> : <>Frequently Asked <span className="text-burnt-orange">Questions</span></>}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/50 text-base sm:text-lg max-w-2xl mx-auto"
          >
            {isArabic ? 'كل ما تحتاج إلى معرفته عن خدماتنا وطريقة عملنا وخبراتنا.' : 'Everything you need to know about our services, process, and expertise.'}
          </motion.p>
        </div>
      </section>

      {/* Reused FAQ component */}
      <FAQ />

      <FinalCTA />
      <Footer />
    </div>
  );
};

export default FAQPage;
