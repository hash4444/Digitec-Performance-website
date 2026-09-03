import React from 'react';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import { LocalizedLink as Link } from '@/components/LocalizedLink';
import { CheckCircle2, MapPin, MessageCircle, Phone } from 'lucide-react';
import Header from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FinalCTA } from '@/components/FinalCTA';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { getLocalGaragePage } from '@/data/localGaragePages';
import { useSeo } from '@/hooks/use-seo';
import { buildBreadcrumb, buildFAQ, buildService, buildWebPage, pageGraph, SITE_URL } from '@/lib/schema';
import { useLocale } from '@/i18n/use-locale';

const localArabicCopy: Record<string, { title: string; eyebrow: string; h2: string; intro: string; detail: string }> = {
  'garage-near-me-dubai': { title: 'ورشة سيارات قريبة مني في دبي', eyebrow: 'ورشة موثوقة في القوز', h2: 'ورشة سيارات متخصصة بالقرب منك في دبي', intro: 'إذا كنت تبحث عن ورشة سيارات قريبة منك في دبي، يقدم مركز ديجي-تك في القوز خدمات الفحص والتشخيص والصيانة والإصلاح للسيارات الفاخرة واليومية.', detail: 'نبدأ بفهم المشكلة وفحص السيارة قبل اقتراح الإصلاح. تشمل إمكاناتنا الصيانة الدورية والميكانيكا والكهرباء والتكييف والفرامل والتعليق والبرمجة، مع شرح واضح للأعمال والأولويات.' },
  'roadside-assistance-dubai': { title: 'المساعدة على الطريق في دبي', eyebrow: 'دعم عند تعطل السيارة', h2: 'مساعدة آمنة وخطوة واضحة بعد العطل', intro: 'نساعدك على تقييم الخطوة التالية وتنسيق نقل السيارة إلى ورشتنا في القوز عند الحاجة، ثم إجراء فحص لتحديد سبب العطل.', detail: 'سلامتك تأتي أولاً. لا تحاول قيادة السيارة إذا كانت ترتفع حرارتها أو فقدت الزيت أو ظهرت مشكلة بالفرامل أو التوجيه. تواصل معنا بتفاصيل الموقع والسيارة والأعراض لنرشدك إلى الخيار المناسب.' },
  'car-garage-dubai': { title: 'كراج سيارات في دبي', eyebrow: 'خدمة سيارات متكاملة', h2: 'كراج متكامل للصيانة والإصلاح في دبي', intro: 'يوفر مركز ديجي-تك خدمات متكاملة للسيارات في دبي تشمل الصيانة والتشخيص والإصلاحات الميكانيكية والكهربائية والعناية بالأداء.', detail: 'تتعامل ورشتنا مع مجموعة واسعة من العلامات والطرازات باستخدام أجهزة حديثة وفنيين متخصصين. نوضح نتيجة الفحص وخيارات القطع والتكلفة قبل بدء العمل.' },
};

const LocalGaragePage = () => {
  const { isArabic, localizedPath } = useLocale();
  const { pathname } = useLocation();
  const { slug: routeSlug } = useParams<{ slug: string }>();
  const parts = pathname.split('/').filter(Boolean);
  const slug = routeSlug ?? parts[parts.length - 1];
  const sourcePage = slug ? getLocalGaragePage(slug) : undefined;
  const page = sourcePage && isArabic ? (() => {
    const copy = localArabicCopy[sourcePage.slug];
    if (!copy) return sourcePage;
    const highlights = ['فحص وتشخيص منظم', 'فنيون ذوو خبرة', 'قطع بالمواصفات المناسبة', 'تسعير واضح قبل العمل'];
    const faqs = [
      { question: 'أين تقع ديجي-تك؟', answer: 'نقع في القوز الصناعية 3، دبي.' },
      { question: 'كيف أحجز موعداً؟', answer: 'اتصل بنا أو أرسل رسالة واتساب تتضمن نوع السيارة ووصف الخدمة أو المشكلة.' },
      { question: 'هل يتم فحص السيارة قبل الإصلاح؟', answer: 'نعم. نبدأ بالفحص المناسب ثم نوضح النتيجة والخطوات المقترحة.' },
    ];
    return { ...sourcePage, ...copy, metaTitle: `${copy.title} | مركز ديجي-تك`, metaDescription: `${copy.intro} احجز فحصاً لدى مركز ديجي-تك في القوز.`, highlights: sourcePage.highlights.map((_, i) => highlights[i % highlights.length]), faqs: sourcePage.faqs.map((_, i) => faqs[i % faqs.length]) };
  })() : sourcePage;
  const url = `${SITE_URL}${isArabic ? '/ar' : ''}/services/${page?.slug ?? slug ?? ''}`;
  const whatsapp = page ? `https://wa.me/97143402223?text=${encodeURIComponent(isArabic ? `مرحباً ديجي-تك، أحتاج مساعدة بخصوص ${page.title}.` : `Hi DIGI-TEC, I need help with ${page.title.toLowerCase()}.`)}` : '';
  const jsonLd = React.useMemo(() => {
    if (!page) return undefined;
    const breadcrumb = buildBreadcrumb(url, [{ name: isArabic ? 'الرئيسية' : 'Home', url: isArabic ? '/ar' : '/' }, { name: isArabic ? 'الخدمات' : 'Services', url: isArabic ? '/ar/services' : '/services' }, { name: page.title, url }]);
    const webPage = buildWebPage({ url, name: page.metaTitle, description: page.metaDescription, breadcrumbId: `${url}#breadcrumb`, mainEntityId: `${url}#service` });
    const service = buildService({ url, name: page.title, serviceType: page.title, description: page.metaDescription, areaServed: [isArabic ? 'دبي' : 'Dubai'] });
    const faq = buildFAQ(url, page.faqs);
    return pageGraph([webPage, breadcrumb, service, ...(faq ? [faq] : [])]);
  }, [isArabic, page, url]);
  useSeo({
    title: page?.metaTitle ?? (isArabic ? 'الخدمة غير موجودة | ديجي-تك' : 'Service Not Found | DIGI-TEC'),
    description: page?.metaDescription ?? '',
    canonical: page ? url : undefined,
    ogTitle: page?.metaTitle,
    ogDescription: page?.metaDescription,
    noindex: !page,
    jsonLd,
  });

  if (!page) return <Navigate to={localizedPath('/services')} replace />;

  return <div className="site-page min-h-screen bg-black text-off-white"><Header /><main>
    <section className="relative overflow-hidden border-b border-white/[0.08] bg-[#101113]"><div className="mx-auto max-w-[90rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28"><p className="eyebrow mb-5">{page.eyebrow}</p><h1 className="max-w-4xl text-[clamp(2.75rem,5.2vw,5.5rem)] font-semibold leading-[0.98] tracking-[-0.05em]">{page.title}</h1><p className="mt-6 max-w-2xl text-base leading-8 text-white/55 sm:text-lg">{page.intro}</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><a href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn-primary"><MessageCircle className="h-5 w-5" />{isArabic ? 'راسلنا عبر واتساب' : 'WhatsApp Us'}</a><a href="tel:+97143402223" className="btn-secondary"><Phone className="h-5 w-5" />{isArabic ? 'اتصل على +971 4 340 2223' : 'Call +971 4 340 2223'}</a></div></div></section>
    <article className="mx-auto max-w-4xl px-5 py-16 sm:px-6 sm:py-20"><nav aria-label={isArabic ? 'مسار التنقل' : 'Breadcrumb'} className="mb-10 text-sm text-gray-400"><Link to="/" className="hover:text-burnt-orange">{isArabic ? 'الرئيسية' : 'Home'}</Link> <span aria-hidden="true">/</span> <Link to="/services" className="hover:text-burnt-orange"> {isArabic ? 'الخدمات' : 'Services'}</Link> <span aria-hidden="true">/</span> {page.title}</nav><h2 className="text-3xl font-black">{page.h2}</h2><p className="mt-5 text-lg leading-relaxed text-gray-300">{page.detail}</p><div className="mt-10 grid gap-4 sm:grid-cols-2">{page.highlights.map((highlight) => <div key={highlight} className="card-premium flex gap-3 rounded-2xl p-5"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-burnt-orange" /><span className="text-gray-200">{highlight}</span></div>)}</div><section className="mt-14 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"><h2 className="text-2xl font-black">{isArabic ? 'زوروا ديجي-تك في القوز' : 'Visit DIGI-TEC in Al Quoz'}</h2><p className="mt-4 leading-relaxed text-gray-300">{isArabic ? 'يقع مركز ديجي-تك في القوز الصناعية 3، دبي. تواصل معنا قبل الزيارة لترتيب موعد الفحص أو الخدمة المناسبة.' : 'DIGI-TEC Performance Center is located in Al Quoz Industrial Area 3, Dubai. Contact the team before you visit so the right inspection time and workshop support can be arranged.'}</p><a href="https://maps.google.com/?q=Al+Quoz+Industrial+Area+3+Dubai" target="_blank" rel="noopener noreferrer" className="btn-secondary mt-5 inline-flex"><MapPin className="h-5 w-5" />{isArabic ? 'الاتجاهات' : 'Get Directions'}</a></section><section className="mt-14"><h2 className="text-3xl font-black">{isArabic ? 'الأسئلة الشائعة' : 'Frequently asked questions'}</h2><Accordion type="single" collapsible className="mt-6 space-y-3">{page.faqs.map((faq, i) => <AccordionItem key={faq.question} value={`faq-${i}`} className="rounded-xl border border-white/10 px-5"><AccordionTrigger className={`${isArabic ? 'text-right' : 'text-left'} font-bold hover:no-underline`}>{faq.question}</AccordionTrigger><AccordionContent className="leading-relaxed text-gray-300">{faq.answer}</AccordionContent></AccordionItem>)}</Accordion></section></article>
  </main><FinalCTA /><Footer /></div>;
};

export default LocalGaragePage;
