import React from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { ArrowDown, CheckCircle2, MapPin, MessageCircle, Phone, ShieldCheck, Wrench } from 'lucide-react';
import Header from '@/components/Header';
import { useSeo } from '@/hooks/use-seo';
import { useArabicLocale } from '@/hooks/use-arabic-locale';
import { buildBreadcrumb, buildFAQ, buildService, buildWebPage, pageGraph, SITE_URL } from '@/lib/schema';

type PageCopy = {
  path: string;
  englishPath: string;
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  lead: string;
  sections: { heading: string; text: string }[];
  faqs: { question: string; answer: string }[];
};

const TrustItem = ({ value, label }: { value: string; label: string }) => (
  <div className="flex items-center justify-center gap-2.5 text-right">
    <ShieldCheck className="h-4 w-4 text-burnt-orange" />
    <div className="leading-tight"><span className="block text-sm font-bold tabular-nums text-off-white sm:text-base">{value}</span><span className="block text-[11px] text-gray-400 sm:text-xs">{label}</span></div>
  </div>
);

const pages: Record<string, PageCopy> = {
  '/ar': {
    path: '/ar', englishPath: '/', title: 'ديجي-تك دبي | ورشة سيارات فاخرة وألمانية',
    description: 'ديجي-تك مركز متخصص في صيانة وإصلاح السيارات الفاخرة والألمانية في دبي. تشخيص متقدم، صيانة دورية، إصلاح ميكانيكي وأداء في القوز.',
    eyebrow: 'مركز ديجي-تك للأداء', h1: 'ورشة متخصصة للسيارات الفاخرة في دبي',
    lead: 'نخدم ملاك مرسيدس، بي إم دبليو، بورشه، أودي، فيراري، لامبورغيني ورنج روفر من مركزنا في القوز، دبي. نبدأ بالفحص الواضح والتشخيص الدقيق قبل اقتراح أي إصلاح.',
    sections: [
      { heading: 'خدمة دقيقة تبدأ بالتشخيص', text: 'السيارات الحديثة تعتمد على أنظمة ميكانيكية وإلكترونية مترابطة. لذلك لا نكتفي بقراءة رمز العطل؛ بل نراجع الأعراض وسجل الصيانة والبيانات الفنية وحالة الأجزاء المرتبطة للوصول إلى سبب المشكلة ووضع خطة عملية للإصلاح.' },
      { heading: 'خدماتنا في القوز', text: 'نوفر الصيانة الدورية، تغيير الزيت، فحص الأعطال، إصلاح المحرك وناقل الحركة، الفرامل، التعليق، التكييف، الأنظمة الكهربائية والبرمجة. كما نساعد في التخطيط لترقيات الأداء بعد التأكد من جاهزية السيارة ميكانيكياً.' },
      { heading: 'لماذا ديجي-تك؟', text: 'نشرح نتيجة الفحص بلغة واضحة، ونناقش الأولويات قبل بدء العمل. هدفنا أن تعرف ما هو عاجل، وما يمكن متابعته لاحقاً، وما هي القطع أو الخطوات المقترحة قبل اعتماد التكلفة.' },
    ],
    faqs: [
      { question: 'أين تقع ورشة ديجي-تك؟', answer: 'تقع ديجي-تك في منطقة القوز الصناعية 3، دبي، الإمارات العربية المتحدة.' },
      { question: 'ما هي السيارات التي تخدمونها؟', answer: 'نخدم السيارات الفاخرة والألمانية وسيارات الأداء، إلى جانب مجموعة واسعة من السيارات الأخرى. أرسل لنا نوع السيارة وسنتأكد من أفضل موعد للفحص.' },
      { question: 'كيف أحجز موعداً؟', answer: 'يمكنك الاتصال بنا أو إرسال رسالة واتساب مع نوع السيارة، السنة، المسافة المقطوعة ووصف المشكلة.' },
    ],
  },
  '/ar/services': {
    path: '/ar/services', englishPath: '/services', title: 'خدمات إصلاح وصيانة السيارات في دبي | ديجي-تك',
    description: 'خدمات صيانة وإصلاح السيارات في دبي من ديجي-تك: تشخيص، ميكانيكا، ناقل حركة، فرامل، تعليق، كهرباء، تكييف وبرمجة في القوز.',
    eyebrow: 'خدمات الورشة', h1: 'خدمات صيانة وإصلاح السيارات في دبي',
    lead: 'من الفحص الدوري إلى الأعطال المعقدة، يقدم فريق ديجي-تك خطة خدمة مناسبة لحالة سيارتك واستخدامك لها في دبي.',
    sections: [
      { heading: 'الفحص والتشخيص', text: 'نستخدم تشخيصاً منظماً لفهم رسالة التحذير أو الصوت أو ضعف الأداء قبل ترشيح القطع. الفحص الجيد يربط بين البيانات والأعراض والفحص العملي، بدلاً من استبدال الأجزاء بالتخمين.' },
      { heading: 'الإصلاحات الميكانيكية وأنظمة القيادة', text: 'تشمل خدماتنا المحرك، ناقل الحركة، نظام التعليق، الفرامل والتوجيه. نعطي الأولوية للسلامة ومنع الأعطال الأكثر تكلفة، ثم نرتب الأعمال التي يمكن جدولتها لاحقاً.' },
      { heading: 'الكهرباء والبرمجة والتكييف', text: 'نساعد في مشاكل البطارية والشحن والحساسات والوحدات الإلكترونية والتكييف. حرارة دبي وحركة المرور قد تؤثر في البطاريات، التبريد، الإطارات والفرامل، لذلك نراجع هذه الأنظمة ضمن الفحص المناسب.' },
    ],
    faqs: [
      { question: 'هل تقدمون فحصاً قبل الإصلاح؟', answer: 'نعم. نبدأ بفهم المشكلة والفحص المناسب ثم نشرح ما تم تأكيده قبل البدء بالإصلاح.' },
      { question: 'هل يمكن حجز خدمة دورية؟', answer: 'نعم. أرسل نوع السيارة وسنة الصنع والمسافة المقطوعة وسجل الصيانة إن توفر.' },
      { question: 'هل تقدمون فحص ما قبل الشراء؟', answer: 'نعم، يمكننا ترتيب فحص لمساعدة المشتري على فهم الحالة العامة للسيارة قبل اتخاذ القرار.' },
    ],
  },
  '/ar/about': {
    path: '/ar/about', englishPath: '/about', title: 'عن ديجي-تك | ورشة سيارات في القوز دبي',
    description: 'تعرف على ديجي-تك مركز صيانة وإصلاح السيارات الفاخرة في القوز، دبي. فحص واضح، خدمة موجهة للعملاء وتشخيص للسيارات الحديثة.',
    eyebrow: 'عن ديجي-تك', h1: 'مركز سيارات متخصص في القوز، دبي',
    lead: 'ديجي-تك مركز صيانة وإصلاح للسيارات الفاخرة وسيارات الأداء في دبي. نركز على الفحص المنظم، التواصل الواضح وخدمة تحترم وقت العميل وسيارته.',
    sections: [
      { heading: 'منهجنا في العمل', text: 'كل زيارة تبدأ بالاستماع إلى ملاحظات المالك ومراجعة تاريخ السيارة وفحص الأعراض. بعد ذلك نوضح ما تم العثور عليه، وما يحتاج إلى إصلاح، وما يمكن مراقبته أو جدولته.' },
      { heading: 'خدمة مصممة لسيارتك', text: 'تختلف احتياجات السيارة اليومية عن سيارة الأداء أو السيارة التي تُستخدم بشكل محدود. نأخذ في الاعتبار الحرارة، الازدحام، المسافة المقطوعة، التخزين ونوع القيادة عند مناقشة الصيانة أو الإصلاح.' },
      { heading: 'تواصل وحجز', text: 'للحجز، أرسل نوع السيارة وسنة الصنع والمسافة المقطوعة وأي رسائل تحذير أو صور أو فيديو للمشكلة. هذه المعلومات تساعدنا على تجهيز الفحص المناسب قبل وصولك.' },
    ],
    faqs: [
      { question: 'أين يوجد مركز ديجي-تك؟', answer: 'في القوز الصناعية 3، دبي.' },
      { question: 'كيف أتواصل مع ديجي-تك؟', answer: 'اتصل على +971 4 340 2223 أو أرسل رسالة عبر واتساب لحجز موعد.' },
      { question: 'هل يمكن طلب عرض سعر؟', answer: 'نعم. أرسل تفاصيل السيارة والخدمة المطلوبة أو وصف المشكلة، وسنرشدك للخطوة المناسبة.' },
    ],
  },
  '/ar/blog': {
    path: '/ar/blog', englishPath: '/blog', title: 'مدونة ديجي-تك للسيارات | دبي',
    description: 'مقالات وإرشادات عملية عن صيانة السيارات الفاخرة، التشخيص، الأداء والعناية بالسيارات في دبي من فريق ديجي-تك.',
    eyebrow: 'معرفة وخبرة', h1: 'مدونة ديجي-تك للسيارات في دبي',
    lead: 'نشارك إرشادات عملية لمساعدة مالكي السيارات الفاخرة وسيارات الأداء على فهم الصيانة، علامات الأعطال، الفحوصات والترقيات المناسبة لظروف القيادة في الإمارات.',
    sections: [
      { heading: 'إرشادات من أرض الورشة', text: 'توضح مقالاتنا ما الذي يستحق الانتباه إليه قبل أن يتحول إلى إصلاح أكبر: مؤشرات التحذير، أصوات المحرك، سلوك ناقل الحركة، حالة الإطارات والفرامل، وتأثير حرارة دبي على الأنظمة الأساسية.' },
      { heading: 'الصيانة والأداء بقرار مدروس', text: 'الصيانة المنتظمة أساس الاعتمادية. وعند التفكير في تحسين الأداء أو البرمجة، نبدأ دائماً بالحالة الميكانيكية والفحص المناسب حتى تكون الترقية متوافقة مع استخدام السيارة وأولويات مالكها.' },
      { heading: 'اختر المعلومة المناسبة لسيارتك', text: 'تختلف احتياجات مرسيدس وبورشه وبي إم دبليو ورنج روفر وغيرها. يمكن لفريقنا مساعدتك في ربط الأعراض أو خطة الصيانة بطراز سيارتك وسنة الصنع والمسافة المقطوعة.' },
    ],
    faqs: [
      { question: 'هل يمكنكم تقديم نصيحة لطراز سيارة محدد؟', answer: 'نعم. أرسل نوع السيارة وطرازها وسنة الصنع والمسافة المقطوعة وأي أعراض أو رسائل تحذير.' },
      { question: 'هل تغني المقالات عن الفحص؟', answer: 'لا. المقالات للتوعية، أما التشخيص الصحيح فيعتمد على فحص السيارة وبياناتها وأعراضها الفعلية.' },
      { question: 'كيف أجد الخدمة المناسبة؟', answer: 'تصفح خدماتنا أو تواصل معنا وسنساعدك في تحديد الفحص أو الخدمة المناسبة.' },
    ],
  },
  '/ar/faq': {
    path: '/ar/faq', englishPath: '/faq', title: 'الأسئلة الشائعة | ديجي-تك دبي',
    description: 'إجابات واضحة عن صيانة وإصلاح السيارات الفاخرة، التشخيص، البرمجة وحجز المواعيد لدى ديجي-تك في دبي.',
    eyebrow: 'نحن هنا للمساعدة', h1: 'الأسئلة الشائعة عن خدمات ديجي-تك',
    lead: 'إجابات مختصرة عن طريقة عملنا، الفحص، الصيانة وحجز المواعيد في مركز ديجي-تك للأداء في القوز، دبي.',
    sections: [
      { heading: 'قبل وصول السيارة', text: 'عند الحجز، يفيدنا معرفة نوع السيارة وسنة الصنع والمسافة المقطوعة ووصف المشكلة. أرسل صور رسائل التحذير أو فيديو للصوت إن كان ذلك آمناً؛ يساعدنا ذلك في تجهيز الفحص المناسب.' },
      { heading: 'بعد الفحص', text: 'نشرح ما تم تأكيده وما يحتاج إلى متابعة، ونناقش الأولويات قبل البدء بالعمل. لا يعني رمز العطل دائماً أن القطعة نفسها هي السبب، ولهذا نربط التشخيص بالفحص العملي.' },
      { heading: 'خدمة تناسب ظروف دبي', text: 'تؤثر الحرارة والازدحام والمسافات اليومية في الزيوت، البطاريات، التبريد، الإطارات والفرامل. لذلك نراعي استخدام السيارة وسجلها عند مناقشة خطة الصيانة.' },
    ],
    faqs: [
      { question: 'هل تخدمون جميع أنواع السيارات؟', answer: 'نخدم السيارات الفاخرة والألمانية وسيارات الأداء ومجموعة واسعة من السيارات الأخرى. تواصل معنا لنؤكد الخدمة المناسبة لسيارتك.' },
      { question: 'هل تقدمون تشخيصاً قبل الإصلاح؟', answer: 'نعم. نبدأ بالفحص والتشخيص المناسبين ثم نوضح النتائج والخطوات المقترحة قبل تنفيذ الإصلاح.' },
      { question: 'كيف أحجز موعداً؟', answer: 'اتصل بنا أو أرسل رسالة واتساب تتضمن تفاصيل السيارة والخدمة المطلوبة أو وصف المشكلة.' },
      { question: 'أين تقع الورشة؟', answer: 'تقع ديجي-تك في القوز الصناعية 3، دبي، الإمارات العربية المتحدة.' },
    ],
  },
};

const ArabicPage = () => {
  const { pathname } = useLocation();
  const page = pages[pathname];
  if (!page) return <Navigate to="/ar" replace />;

  const arabicUrl = `${SITE_URL}${page.path}`;
  const englishUrl = `${SITE_URL}${page.englishPath}`;
  useArabicLocale(arabicUrl, englishUrl);

  const graph = React.useMemo(() => {
    const breadcrumb = buildBreadcrumb(arabicUrl, [
      { name: 'الرئيسية', url: '/ar' },
      ...(page.path !== '/ar' ? [{ name: page.h1, url: page.path }] : []),
    ]);
    const webPage = { ...buildWebPage({ url: arabicUrl, name: page.h1, description: page.description, breadcrumbId: `${arabicUrl}#breadcrumb` }), inLanguage: 'ar-AE' };
    const service = buildService({ url: arabicUrl, name: page.h1, serviceType: 'صيانة وإصلاح السيارات', description: page.description, offers: ['الفحص والتشخيص', 'الصيانة الدورية', 'الإصلاح الميكانيكي', 'إصلاح الفرامل والتعليق'] });
    const faq = buildFAQ(arabicUrl, page.faqs);
    return pageGraph([webPage, breadcrumb, service, ...(faq ? [faq] : [])]);
  }, [arabicUrl, page]);

  useSeo({ title: page.title, description: page.description, canonical: arabicUrl, ogTitle: page.title, ogDescription: page.description, ogType: 'website', twitterCard: 'summary_large_image', twitterTitle: page.title, twitterDescription: page.description, jsonLd: graph });
  const whatsapp = `https://wa.me/97143402223?text=${encodeURIComponent('مرحباً ديجي-تك، أريد حجز فحص لسيارتي في دبي.')}`;
  const isHome = page.path === '/ar';

  return (
    <div className="min-h-screen bg-black text-off-white" dir="rtl">
      <Header />
      <main>
        {isHome ? (
          <>
            <section className="relative flex min-h-[88vh] items-center justify-center overflow-hidden px-4 sm:min-h-screen sm:px-6">
              <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/hero-bg.png')" }} />
              <div className="absolute inset-0 bg-black/70" />
              <div className="absolute inset-0 bg-gradient-to-r from-burnt-orange/5 via-transparent to-burnt-orange/5" />
              <div className="absolute bottom-1/4 right-1/4 h-40 w-40 rounded-full bg-chocolate/10 blur-3xl sm:h-80 sm:w-80" />
              <div className="absolute left-1/4 top-1/4 h-48 w-48 rounded-full bg-burnt-orange/10 blur-3xl sm:h-96 sm:w-96" />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-black sm:h-40" />
              <div className="relative z-10 mx-auto max-w-6xl text-center">
                <span className="eyebrow mb-4 sm:mb-8">مركز دبي المتخصص للأداء</span>
                <h1 className="mb-3 text-[2rem] font-black leading-tight sm:mb-8 sm:text-5xl md:text-6xl lg:text-8xl"><span className="text-burnt-orange">D</span>IGI-TEC<br />مركز الأداء</h1>
                <h2 className="mb-3 text-base font-bold tracking-tight text-burnt-orange sm:mb-6 sm:text-2xl md:text-3xl lg:text-4xl">حيث يلتقي الأداء بالدقة.</h2>
                <p className="mx-auto mb-6 max-w-3xl px-4 text-sm leading-snug text-gray-300 sm:mb-12 sm:text-lg sm:leading-relaxed md:text-xl">ديجي-تك مركز متخصص للسيارات الفاخرة وسيارات الأداء في دبي. من التشخيص الدقيق إلى الصيانة والإصلاحات والترقيات، نقدم خدمة مدروسة لسيارتك في القوز.</p>
                <div className="flex flex-col items-center justify-center gap-3 px-4 sm:flex-row sm:gap-5">
                  <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn-primary w-full sm:w-auto">احجز موعداً</a>
                  <a href="tel:+97143402223" className="btn-secondary w-full sm:w-auto">احصل على فحص أولي</a>
                </div>
                <p className="mt-4 flex items-center justify-center gap-2 text-[11px] tracking-wide text-gray-400 sm:mt-5 sm:text-xs"><ShieldCheck className="h-3.5 w-3.5 shrink-0 text-burnt-orange" />فحص أولي بلا التزام · رد عبر واتساب خلال دقائق</p>
                <div className="mt-8 animate-bounce sm:mt-16"><div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 backdrop-blur-sm sm:h-11 sm:w-11"><ArrowDown className="text-burnt-orange" size={18} /></div></div>
              </div>
            </section>
            <section className="border-y border-white/[0.07] bg-white/[0.02]"><div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-4 gap-y-3 px-4 py-4 sm:px-6 sm:py-5 lg:grid-cols-4"><TrustItem value="+40 عاماً" label="خبرة متخصصة" /><TrustItem value="+50,000" label="سيارة تم خدمتها" /><TrustItem value="بمعيار OEM" label="تشخيص وقطع" /><TrustItem value="القوز" label="ورشة دبي" /></div></section>
          </>
        ) : (
          <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-burnt-orange/15 via-black to-black"><div className="mx-auto max-w-5xl px-5 py-16 sm:px-6 sm:py-24"><p className="text-xs font-bold tracking-[0.2em] text-burnt-orange">{page.eyebrow}</p><h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight sm:text-6xl">{page.h1}</h1><p className="mt-6 max-w-3xl text-lg leading-loose text-gray-300">{page.lead}</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><a href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn-primary"><MessageCircle className="h-5 w-5" />احجز عبر واتساب</a><a href="tel:+97143402223" className="btn-secondary"><Phone className="h-5 w-5" />اتصل بنا</a></div></div></section>
        )}
        <section className="mx-auto max-w-4xl px-5 py-16 sm:px-6 sm:py-20">
          {page.sections.map((section) => <section key={section.heading} className="mt-12 first:mt-0"><h2 className="text-2xl font-black sm:text-3xl">{section.heading}</h2><p className="mt-4 leading-loose text-gray-300">{section.text}</p></section>)}
          <section id="contact" className="mt-14 rounded-3xl border border-burnt-orange/30 bg-burnt-orange/5 p-6 sm:p-8"><h2 className="text-2xl font-black">زوروا ديجي-تك في القوز</h2><p className="mt-4 leading-loose text-gray-300">القوز الصناعية 3، مستودع رقم 11-15، دبي. شارك معنا تفاصيل سيارتك لنساعدك في ترتيب الخدمة أو الفحص المناسب.</p><div className="mt-6 grid gap-3 sm:grid-cols-3"><a href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn-primary"><MessageCircle className="h-5 w-5" />واتساب</a><a href="tel:+97143402223" className="btn-secondary"><Phone className="h-5 w-5" />+971 4 340 2223</a><a href="https://maps.google.com/?q=Al+Quoz+Industrial+Area+3+Warehouse+No.11-15+Dubai" target="_blank" rel="noopener noreferrer" className="btn-secondary"><MapPin className="h-5 w-5" />الاتجاهات</a></div></section>
          <section className="mt-14"><h2 className="text-2xl font-black">الأسئلة الشائعة</h2><div className="mt-6 space-y-4">{page.faqs.map((faq) => <div key={faq.question} className="card-premium rounded-2xl p-5"><h3 className="font-bold">{faq.question}</h3><p className="mt-3 leading-loose text-gray-300">{faq.answer}</p></div>)}</div></section>
          <section className="mt-14 grid gap-3 sm:grid-cols-3"><Link to="/ar" className="card-premium rounded-2xl p-5"><CheckCircle2 className="mb-3 h-5 w-5 text-burnt-orange" />الرئيسية</Link><Link to="/ar/services" className="card-premium rounded-2xl p-5"><Wrench className="mb-3 h-5 w-5 text-burnt-orange" />خدماتنا</Link><Link to="/ar/about" className="card-premium rounded-2xl p-5"><MapPin className="mb-3 h-5 w-5 text-burnt-orange" />موقعنا وتواصل معنا</Link></section>
        </section>
      </main>
      <footer className="border-t border-white/10 bg-charcoal/30 px-5 py-10 text-center text-sm text-gray-400"><p className="font-bold text-off-white">مركز ديجي-تك للأداء</p><p className="mt-2">القوز، دبي، الإمارات العربية المتحدة</p><Link to={page.englishPath} className="mt-4 inline-block text-burnt-orange hover:underline">English</Link></footer>
    </div>
  );
};

export default ArabicPage;
