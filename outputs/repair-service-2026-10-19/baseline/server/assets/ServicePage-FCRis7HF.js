import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import React__default from "react";
import { u as useLocale, J as electronicsServices, K as getServiceBySlug, g as buildBreadcrumb, a as buildWebPage, M as detectBrand, h as buildService, c as buildFAQ, p as pageGraph, d as useSeo, L as LocalizedLink, N as allServices, b as brands } from "../entry-server.js";
import { useParams, Navigate } from "react-router-dom";
import { H as Header, F as Footer } from "./Footer-D0Xl6ot8.js";
import { F as FinalCTA } from "./FinalCTA-DCkhXNCr.js";
import { ChevronRight, MessageCircle, Phone, Check } from "lucide-react";
import { A as Accordion, a as AccordionItem, b as AccordionTrigger, c as AccordionContent } from "./accordion-DINZxoib.js";
import { l as localizeServiceToArabic } from "./ar-services-CclXnKHT.js";
import { P as PpfQuoteForm } from "./PpfQuoteForm-RKK9h8TG.js";
import "node:stream";
import "react-dom/server";
import "react-router-dom/server.mjs";
import "@radix-ui/react-toast";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "next-themes";
import "sonner";
import "@radix-ui/react-tooltip";
import "@tanstack/react-query";
import "./Reveal-B0bzMO-v.js";
import "@radix-ui/react-accordion";
const protection = {
  "paint-protection-dubai": {
    title: "خيارات حماية طلاء السيارة في دبي",
    metaTitle: "حماية طلاء السيارة في دبي | مقارنة الخيارات | ديجي-تك",
    metaDescription: "قارن أفلام PPF والطلاء السيراميكي وتحضير الطلاء في القوز، دبي. اختر التغطية والعناية حسب حالة السيارة واطلب عرضاً للنطاق المناسب.",
    description: "اختر بين الفيلم والسيراميك بعد تقييم حالة الطلاء والهدف من الحماية.",
    intro: "ابدأ بتحديد ما تريد حمايته: الألواح المعرضة للحصى، أم مظهر الطلاء وسهولة تنظيفه؟ تضيف أفلام PPF طبقة مادية على الأجزاء المغطاة، بينما يركز السيراميك على خصائص السطح والعناية به وفق المنتج. التلميع وتصحيح الطلاء يعالجان عيوباً سطحية مناسبة قبل اختيار الحماية؛ وهما ليسا طبقة حماية بحد ذاتهما.",
    whyImportant: "لا يوجد خيار واحد مناسب لكل سيارة. تتأثر الخطة بحالة الطلاء والإصلاحات السابقة وطريقة الاستخدام والميزانية. الخدوش العميقة أو فقدان الطلاء قد يحتاجان إلى إصلاح دهان، ولا يعالجهما وضع فيلم أو طلاء سيراميكي فوق الضرر.",
    includes: ["تقييم الطلاء والتجهيز الموجود والإصلاحات السابقة", "مقارنة الفيلم والسيراميك حسب الهدف", "تحديد التحضير والألواح أو الأسطح المشمولة", "توضيح العناية والتكلفة قبل الموافقة"],
    faqs: [
      { question: "ما الفرق بين حماية الطلاء بالفيلم والسيراميك؟", answer: "الفيلم طبقة مادية قد تقلل ضرر الحصى والاحتكاك الخفيف على الألواح المغطاة. السيراميك معالجة سطحية قد تسهل التنظيف وتحسن سلوك الماء حسب المنتج، لكنه لا يقدم حاجز الصدمات نفسه." },
      { question: "هل تحتاج السيارة إلى تصحيح الطلاء قبل الحماية؟", answer: "يعتمد ذلك على حالة السطح والعيوب الموجودة وحدود التصحيح الآمن. لا تحتاج كل سيارة إلى العمل نفسه، ولا يعالج التصحيح الدهان المفقود أو الانبعاجات." }
    ]
  },
  "paint-protection-film": {
    ctaLabel: "اطلب عرض سعر لتركيب PPF",
    imageAlt: "فرد فيلم حماية شفاف على غطاء محرك بورشه بيضاء",
    title: "تركيب أفلام حماية الطلاء PPF في دبي",
    metaTitle: "أفلام حماية الطلاء PPF دبي | التغطية والتركيب | ديجي-تك",
    metaDescription: "تركيب أفلام PPF في القوز، دبي. ناقش تغطية كاملة أو جزئية وتحضير الطلاء والحواف والعناية حسب الفيلم والسيارة. اطلب عرضاً للتغطية المطلوبة.",
    description: "طبقة فيلم على الألواح المتفق عليها، مع تحضير وتغطية مناسبين للسيارة.",
    intro: "فيلم حماية الطلاء PPF طبقة مادية توضع على أسطح مناسبة بعد تقييم الطلاء والتحضير. قد تقلل بعض آثار الحصى والاحتكاك الخفيف، لكنها لا تمنع كل خدش أو ضرر ولا تصلح الطلاء المتضرر تحتها. تختلف خصائص الفيلم بحسب المنتج المختار.",
    whyImportant: "الحماية تخص الألواح المغطاة فعلياً. ناقش تغطية الجسم كاملة أو المقدمة أو أجزاء مختارة، وحدد السقف والحواف والقطع المستثناة. قد تبقى حواف الفيلم أو ملمسه ظاهرة، لذلك تُناقش طريقة التركيب والتشطيب قبل الموافقة.",
    includes: ["تقييم حالة الطلاء والألواح المعاد طلاؤها", "تأكيد الفيلم والألواح المغطاة والاستثناءات", "تحضير السطح وطريقة القص ومعالجة الحواف حسب السيارة", "مراجعة التشطيب وتعليمات الغسيل والعناية الخاصة بالفيلم"],
    extraSections: [
      { heading: "التغطية الكاملة أم الجزئية؟", text: "تغطي التغطية الجزئية ألواحاً محددة مثل أجزاء المقدمة حسب الاتفاق، وتبقى الأجزاء الأخرى دون فيلم. أما التغطية الكاملة فتتطلب قائمة واضحة بالألواح والحواف والقطع المستثناة. تؤثر مساحة التغطية وتعقيد الألواح والتحضير في التكلفة؛ لا تختَر الاسم وحده دون مراجعة النطاق." },
      { heading: "أفلام PPF أم تصحيح الطلاء؟", text: "يستخدم تصحيح الطلاء التلميع لتقليل العيوب السطحية المناسبة ضمن حدود طبقات الطلاء الآمنة. تضيف أفلام PPF حاجزاً مادياً قابلاً للاستبدال على الألواح المغطاة، لكنها لا تصحح الطلاء تحتها. قيّم الدوامات والخدوش والإصلاحات السابقة قبل اختيار التحضير والحماية؛ فقد يحتاج الضرر العميق أو فقدان الطلاء إلى إصلاح منفصل." },
      { heading: "قبل زيارة الورشة في القوز", text: "شارك بيانات السيارة والتغطية المطلوبة مع الفريق لترتيب الوقت المناسب. أكّد ساعات العمل الحالية وتوفر الموعد ومدخل العملاء قبل التوجه إلى الورشة." },
      { heading: "تحضير الطلاء وتركيب الفيلم", text: "يُقيّم الطلاء والإصلاحات السابقة والحماية الحالية أولاً. يُتفق على التنظيف وإزالة الملوثات وأي تصحيح مناسب قبل التركيب. توضع طبقة الفيلم على الأسطح المتوافقة وفق طريقة القص والحواف المتفق عليها، ثم تُراجع التغطية والتشطيب عند التسليم. لا يعالج الفيلم العيوب الموجودة تحته." },
      { heading: "العناية بعد تركيب PPF", text: "اتبع تعليمات المنتج والورشة بشأن استقرار الفيلم وأول غسيل والمواد المناسبة. استخدم غسيلاً لطيفاً ولا توجه ضغط الماء عن قرب إلى الحواف. عند ظهور ارتفاع في الحافة أو تغير في السطح، صوّر المنطقة وناقشها مع الورشة؛ لا تسحب الفيلم أو تعالجه بالحرارة بنفسك." },
      { heading: "احتفظ بسجل التركيب والعناية", text: "عند التسليم، اطلب اسم الفيلم المركّب وتاريخ التركيب والألواح المغطاة وتعليمات العناية الخاصة بالمنتج. احتفظ بها مع النطاق المتفق عليه وأي شروط ضمان مكتوبة. أكّد موعد استئناف الغسيل ومواد التنظيف المناسبة؛ فقد لا تنطبق تعليمات فيلم آخر على فيلم سيارتك." }
    ],
    faqs: [
      { question: "هل يمنع PPF كل خدش أو ضرر؟", answer: "لا. قد يقلل الفيلم بعض آثار الحصى والاحتكاك الخفيف على الألواح المغطاة، لكن الصدمات والقطع والضرر العميق قد تؤثر في الفيلم أو الطلاء. راجع خصائص المنتج المحدد ونطاق التغطية قبل الموافقة." },
      { question: "ما الذي يحدد تكلفة تركيب PPF؟", answer: "تؤثر أبعاد السيارة والألواح المختارة والفيلم وحالة الطلاء والتحضير وتعقيد التركيب في السعر. أرسل الطراز والسنة والتغطية المطلوبة للحصول على عرض خاص بالسيارة." },
      { question: "ماذا أفعل عند ظهور فقاعات أو ارتفاع حافة الفيلم؟", answer: "اذكر تاريخ التركيب وصوّر المنطقة وراجع تعليمات المنتج والورشة. لا تثقب الفيلم أو تسحبه أو تستخدم الحرارة بنفسك. تحتاج الحالة إلى معاينة قبل تحديد العناية أو العمل المناسب؛ لا يعني كل أثر ضرورة استبدال الفيلم." },
      { question: "هل إزالة الفيلم أو استبداله مشمولان في التركيب؟", answer: "لا يُفترضان ضمن عرض التركيب. اذكر عمر الفيلم وحالته وأي طلاء سابق، واطلب تأكيد توفر العمل وملاءمته ومخاطره ونطاقه قبل الحجز." }
    ]
  },
  "ceramic-coating": {
    ctaLabel: "اطلب عرض سعر لسيراميك السيارة",
    imageAlt: "مرسيدس جي كلاس سوداء تظهر على هيكلها انعكاسات إضاءة الورشة",
    title: "الطلاء السيراميكي للسيارات في دبي",
    metaTitle: "طلاء سيراميك السيارات دبي | التحضير والعناية | ديجي-تك",
    metaDescription: "ناقش الطلاء السيراميكي وتحضير السطح والعناية في القوز، دبي. خصائص المنتج والأسطح وحالة الطلاء تحدد النطاق والتكلفة. اطلب عرضاً لسيارتك.",
    description: "معالجة سطحية مع تحضير وعناية يحددهما المنتج وحالة الطلاء.",
    intro: "الطلاء السيراميكي معالجة للأسطح المتوافقة قد تحسن سلوك الماء والمظهر وتسهّل التنظيف حسب المنتج والتحضير والعناية. لا يزيل الخدوش الموجودة ولا يجعل الطلاء دائماً أو خالياً من الصيانة. يناقش الفريق حالة السطح قبل الاتفاق على التطبيق.",
    whyImportant: "السيراميك ليس بديلاً عن الفيلم للحماية المادية من الحصى. قد تبقى بقع الماء وآثار الغسيل والملوثات، وتختلف مقاومة العوامل البيئية باختلاف المنتج. تُحدد الحاجة إلى التلميع أو التصحيح والأسطح الإضافية بصورة منفصلة في عرض العمل.",
    includes: ["تقييم حالة الطلاء والحماية السابقة", "الاتفاق على التنظيف والتحضير والتصحيح عند الحاجة", "تحديد المنتج والأسطح المشمولة والمتوافقة", "توضيح متطلبات التطبيق والتجفيف والغسيل والعناية"],
    extraSections: [
      { heading: "الفرق بين تلميع السيارة والسيراميك", text: "يعالج التلميع أو تصحيح الطلاء العيوب السطحية المناسبة ضمن حدود الطبقات الآمنة. السيراميك معالجة لاحقة لسطح مُحضّر، ولا يزيل الدوامات أو الخدوش تحتها. تُحدد الحاجة إلى التصحيح قبل التطبيق؛ ولا تحتاج كل سيارة إلى التحضير نفسه." },
      { heading: "التحضير والتطبيق والتصلب", text: "تُراجع حالة الطلاء والإصلاحات والمنتجات السابقة، ثم يُتفق على التنظيف وإزالة الملوثات والتصحيح عند الحاجة. يطبق المنتج المناسب على الأسطح المتوافقة ضمن ظروف ومتطلبات المنتج المحدد. تُؤكد فترة التصلب وموعد أول غسيل عند التسليم دون افتراض مدة موحدة." },
      { heading: "الغسيل والعناية بعد السيراميك", text: "تبقى إزالة الغبار وأوساخ الطريق والغسيل اللطيف والتجفيف ضرورية. استخدم أدوات نظيفة ومنتجات متوافقة وتجنب مسح الغبار الجاف. قد تظهر بقع الماء حتى مع تكوّن القطرات. ناقش ضعف سلوك الماء أو تغير المظهر مع الورشة قبل التلميع الكاشط أو إعادة التطبيق." }
    ],
    faqs: [
      { question: "هل يمنع السيراميك الخدوش والحصى؟", answer: "لا يجعل الطلاء مقاوماً لكل خدش، ولا يقدم حاجزاً مادياً مثل PPF. يظل الغسيل اللطيف وإزالة الأوساخ بالطريقة المناسبة ضروريين." },
      { question: "كم يدوم الطلاء السيراميكي؟", answer: "تعتمد المدة على المنتج والتحضير والتعرض والعناية. اطلب تعليمات المنتج وأي شروط ضمان مكتوبة؛ لا توجد مدة موحدة لكل الطلاءات." },
      { question: "هل يمكن وضع السيراميك فوق PPF؟", answer: "يمكن مناقشة الجمع بينهما عند توافق الفيلم والطلاء والأسطح. تُؤكد متطلبات المنتجين وترتيب التطبيق والعناية قبل الموافقة، ولا يُفترض توافق جميع المنتجات." },
      { question: "متى أغسل السيارة بعد التطبيق؟", answer: "اتبع تعليمات التسليم والمنتج المحدد بشأن التجفيف وأول غسيل والمواد المناسبة. لا تفترض فترة واحدة لجميع الطلاءات، وناقش أي تغير في السطح قبل طلب إعادة التطبيق." }
    ]
  }
};
const refineArabicProtectionService = (service) => {
  const copy = protection[service.slug];
  if (!copy) return service;
  return {
    ...service,
    ...copy,
    whyChoose: "ناقش الطراز والسنة وحالة الطلاء والإصلاحات السابقة والنتيجة المطلوبة مع ورشة ديجي-تك في القوز الصناعية 3. يُحدد المنتج والتحضير والأسطح والتكلفة في العرض قبل الموافقة، مع تعليمات العناية الخاصة بالخيار.",
    localIntent: "أرسل بيانات السيارة وصور الطلاء والتغطية المطلوبة إلى ديجي-تك في القوز، دبي. تساعد الصور في بدء النقاش وقد تحتاج الحالة إلى معاينة لتأكيد العمل والتكلفة.",
    details: copy.intro,
    extraSections: copy.extraSections,
    modelsSection: void 0,
    servicesIntro: void 0
  };
};
const scope = {
  "car-diagnostics-dubai": ["يبدأ تشخيص السيارة بتحديد الطراز وسنة الصنع والتحذير أو العطل المبلغ عنه. نراجع البيانات المتاحة ونختار الاختبارات المناسبة قبل اقتراح الإصلاح.", "رمز العطل يصف حالة اكتشفها النظام ولا يحدد وحده القطعة التالفة. تُؤكد إمكانات الوصول إلى الوحدة والوظائف المطلوبة لكل سيارة.", ["قراءة رموز الأعطال والبيانات المتاحة", "اختبارات مرتبطة بالأعراض ونتائج الفحص", "تأكيد توافق أي برمجة أو إعادة ضبط مطلوبة قبل الحجز"]],
  "auto-electrical-repair-dubai": ["تشمل معاينة كهرباء السيارة دوائر التشغيل والشحن والأسلاك والموصلات والأنظمة المدعومة. اذكر متى يظهر العطل وما إذا بدأ بعد تغيير بطارية أو تركيب تجهيزات.", "قد تتعلق مشكلة الشاشة أو الكاميرا بالتغذية أو التوصيلات أو الوحدة المرتبطة. غياب الصورة لا يثبت وحده الحاجة إلى استبدال الشاشة أو الكاميرا؛ تركيب تجهيز جديد طلب مستقل.", ["فحص التغذية والتوصيلات والأرضي", "تتبع العطل في الدائرة المعنية", "تقييم الشاشة والكاميرا حسب التجهيز الموجود", "تحديد الإصلاح وأي تهيئة مدعومة بعد التشخيص"]],
  "car-service-dubai": ["تُحدد الصيانة الدورية وفق جدول السيارة وسجلها والمسافة المقطوعة وحالتها. أرسل بيانات السيارة وآخر صيانة لتحديد الأعمال المطلوبة.", "تغيير الزيت أحد بنود الصيانة وليس بديلاً عن جميع بنود الجدول. تختلف السوائل والفلاتر والفواصل بحسب السيارة والاستخدام.", ["مراجعة جدول الصيانة وسجل الأعمال", "الزيت والفلاتر المحددة ضمن النطاق المعتمد", "فحص السوائل والفرامل والبطارية والأجزاء ذات الصلة"]],
  "oil-change-dubai": ["تبدأ خدمة تغيير الزيت بتحديد المحرك ومواصفة الزيت والفلتر المناسبين. تُوضح المواد والكميات والأعمال المشمولة في عرض الخدمة.", "لا توجد درجة زيت أو فترة تغيير موحدة لكل السيارات. يجب الرجوع إلى متطلبات السيارة وسجل الاستخدام.", ["تأكيد مواصفة الزيت والفلتر", "تغيير المواد ضمن النطاق المتفق عليه", "فحص المستوى والتسريب وإعادة الضبط حيث تدعمها السيارة"]],
  "battery-replacement-dubai": ["نراجع البطارية ونظام الشحن قبل اقتراح الاستبدال. أخبر الورشة عن صعوبة التشغيل أو تكرار التفريغ ومواصفات السيارة.", "قد يكون ضعف التشغيل مرتبطاً بالتوصيلات أو الشحن وليس بالبطارية وحدها. نوع البطارية ومقاسها ومتطلبات التسجيل تُحدد للسيارة المعنية.", ["اختبار البطارية والشحن", "تأكيد المواصفة والتوفر قبل الاستبدال", "التركيب والتسجيل المدعوم عند الحاجة"]],
  "brake-repair-dubai": ["تُفحص الفرامل لتحديد حالة الأجزاء وسبب الصوت أو الاهتزاز أو تغير الإحساس بالدواسة. تُبنى توصية الإصلاح على النتائج.", "تختلف حدود التآكل ومواصفات القطع والسوائل بحسب نظام الفرامل. لا يُقرر تغيير قطعة اعتماداً على الصوت وحده.", ["فحص حالة الأجزاء والقياسات المناسبة", "تحديد القطع أو خدمة السوائل المطلوبة", "اختبار التشغيل بعد العمل المعتمد"]],
  "car-ac-repair-dubai": ["نراجع أداء تكييف المقصورة وتدفق الهواء وبيانات السيارة قبل تحديد الاختبارات. صف ضعف التبريد وما إذا كان يتغير أثناء الوقوف أو القيادة.", "تعبئة الغاز لا تعالج كل أسباب ضعف التبريد. نوع وسيط التبريد وحالة النظام والتسريب المحتمل تحدد الخدمة المناسبة.", ["فحص التبريد وتدفق الهواء", "تحديد وسيط التبريد وفحص النظام", "اقتراح الإصلاح أو خدمة الشحن بناءً على النتائج"]],
  "suspension-repair-dubai": ["نقيّم نظام التعليق حسب تجهيز السيارة والشعور أثناء القيادة وارتفاعها. تُفحص الأجزاء المعنية قبل تحديد الإصلاح.", "انخفاض السيارة أو ظهور تحذير لا يثبت تلف المساعد الهوائي. تختلف أنظمة التعليق التقليدي والهوائي والمتكيف بحسب الطراز والتجهيز.", ["تحديد نوع التعليق الموجود", "فحص الأجزاء والتسريب والبيانات حيث تتاح", "اقتراح الإصلاح ثم التحقق من التشغيل"]],
  "steering-repair-dubai": ["تشمل معاينة التوجيه وصف الثقل أو الصوت أو الخلوص وظروف ظهوره. نحدد نظام المساعدة الموجود ونفحص الأجزاء ذات الصلة.", "اختلاف اتجاه السير قد يتطلب فحص الإطارات أو التعليق أو الزوايا؛ لا يعني بالضرورة استبدال علبة التوجيه.", ["تحديد نظام التوجيه والتجهيز", "فحص الوصلات والمساعدة والأجزاء المعنية", "تأكيد الإصلاح وأي ضبط مطلوب"]],
  "transmission-repair-dubai": ["نراجع نوع ناقل الحركة وسجل الخدمة والأعراض قبل اقتراح الإصلاح. صف ظروف التأخير أو الاهتزاز والتحذيرات بدقة.", "خدمة الزيت والفلاتر تختلف عن إصلاح عطل مؤكد. تختلف المواصفات والإجراءات بحسب الناقل ولا يُقرر الإصلاح الشامل من الأعراض وحدها.", ["تحديد الناقل وسجل الصيانة", "فحص البيانات والتسريب والتشغيل حيث يدعم النظام", "فصل الصيانة الدورية عن نطاق الإصلاح"]],
  "mechanical-repair-dubai": ["تشمل المعاينة الميكانيكية المحرك والأجزاء المرتبطة بالمشكلة المبلغ عنها. أرسل وصف الصوت أو التسريب أو تغير الأداء وسجل الأعمال الأخيرة.", "فحص التبريد أو التيربو أو المحرك يتبع الحالة الفعلية ومواصفات السيارة. أي أعمال داخلية واسعة تتطلب تحديد النطاق والتوفر قبل الموافقة.", ["فحص الأجزاء المرتبطة بالعطل", "تقييم التبريد والتسريب بحسب الحالة", "عرض الإصلاح والقطع والأعمال الإضافية المطلوبة"]],
  "fuel-system-repair-dubai": ["تبدأ خدمة نظام الوقود بتحديد المحرك ونوع النظام والأعراض. نراجع البيانات والاختبارات المناسبة قبل اقتراح أعمال المضخة أو الحقن.", "تغير الأداء قد تكون له أسباب خارج نظام الوقود. لا يثبت رمز العطل وحده أن الحاقن أو المضخة يحتاج إلى الاستبدال.", ["تحديد نظام الوقود", "فحص البيانات والتوصيلات والأجزاء ذات الصلة", "الإصلاح أو الاستبدال بعد تأكيد السبب"]],
  "exhaust-repair-dubai": ["نعاين نظام العادم عند وجود صوت أو تسريب أو تلف أو تحذير. تُحدد الوصلات والأنابيب والمكونات التي تحتاج إلى العمل.", "الإصلاح يختلف عن تعديل الأداء. توافق القطع ومتطلبات الاستخدام ونطاق أي تعديل تُناقش بشكل مستقل قبل الحجز.", ["فحص التسريب والتلف والمكونات", "تقييم أعمال الإصلاح أو الاستبدال", "تأكيد أي مشروع تعديل بصورة منفصلة"]],
  "tire-repair-dubai": ["تُقيّم حالة الإطار ومكان الضرر وتاريخ فقدان الضغط قبل تحديد إمكان الإصلاح. يُراجع المقاس والمواصفات عند طلب الاستبدال.", "ليست كل الثقوب أو أنواع الإطارات قابلة للإصلاح. قد يتطلب الاهتزاز أو التآكل غير المتساوي فحص التوازن أو الزوايا والأجزاء المرتبطة.", ["تقييم أهلية إصلاح الضرر", "تأكيد مواصفة الإطار البديل وتوفره", "تحديد الحاجة إلى موازنة أو ضبط مناسب"]],
  "car-body-repair-dubai": ["نعاين أضرار الهيكل والألواح والطلاء لتحديد نطاق الإصلاح. تساعد صور الضرر وبيانات السيارة في ترتيب المعاينة لكنها لا تغني عنها.", "إصلاح الضرر وإعادة الطلاء يختلفان عن التلميع أو الحماية. يُوضح عرض العمل الأجزاء والتحضير والتشطيب المطلوب.", ["توثيق الضرر وفحص المنطقة المعنية", "تحديد الإصلاح وأعمال الطلاء", "مراجعة النطاق والتكلفة قبل البدء"]],
  "soft-close-door-repair-dubai": ["صف ما إذا كان نظام الإغلاق الناعم موجوداً وتعطل، أم أنك تسأل عن تركيبه. هذان طلبان مختلفان ويجب تحديد تجهيز السيارة أولاً.", "إصلاح نظام موجود يعتمد على الفحص، بينما يحتاج التركيب إلى تأكيد توافق المنتج والسيارة. لا نفترض توافقاً عاماً لكل الطرازات.", ["فحص النظام الموجود عند طلب الإصلاح", "تأكيد التوافق والنطاق عند طلب التركيب", "توضيح القطع والعمل قبل الموافقة"]]
};
const refineGenericArabicService = (service) => {
  var _a;
  const copy = scope[service.slug];
  if (!copy) return service;
  return {
    ...service,
    intro: copy[0],
    whyImportant: copy[1],
    includes: copy[2],
    whyChoose: "توضح الورشة نتائج الفحص والأعمال المقترحة والقطع والتكلفة قبل الموافقة. يُؤكد نطاق الخدمة والإجراءات المتاحة للسيارة المعنية.",
    extraSections: void 0,
    faqs: (_a = service.faqs) == null ? void 0 : _a.filter((faq, index, all) => all.findIndex((other) => other.question === faq.question) === index),
    details: copy[0]
  };
};
const OLD_TO_NEW_SLUG = {
  // Original slugs → new H1-derived slugs
  "mercedes-repair": "mercedes-repair-dubai",
  "mechanical-repair": "mechanical-repair-dubai",
  "transmission-services": "transmission-repair-dubai",
  "suspension-repair": "suspension-repair-dubai",
  "steering-repair": "steering-repair-dubai",
  "brake-system-repairs": "brake-repair-dubai",
  "routine-maintenance": "car-service-dubai",
  "oil-change-service": "oil-change-dubai",
  "tire-repair": "tire-repair-dubai",
  "battery-changes": "battery-replacement-dubai",
  "exhaust-repair": "exhaust-repair-dubai",
  "car-programming-diagnostic": "car-diagnostics-dubai",
  "electrical-system-repairs": "auto-electrical-repair-dubai",
  "fuel-system-repair": "fuel-system-repair-dubai",
  "ac-repair-maintenance": "car-ac-repair-dubai",
  "car-body-repair": "car-body-repair-dubai",
  "car-paint-protection": "paint-protection-dubai",
  // Legacy Google-indexed slugs → new slugs (flattened to one hop)
  "engine-diagnostics-dubai": "car-diagnostics-dubai"
};
const EXTERNAL_REDIRECTS = {
  "performance-tuning-dubai": "/tuning"
};
const ServicePage = ({ slugOverride, canonicalPath, brandPath }) => {
  var _a;
  const { isArabic, localizedPath } = useLocale();
  const { slug: routeSlug } = useParams();
  const slug = slugOverride ?? routeSlug;
  const externalRedirect = slug ? EXTERNAL_REDIRECTS[slug] : void 0;
  const newSlug = slug ? OLD_TO_NEW_SLUG[slug] : void 0;
  const isElectronics = electronicsServices.some((item) => item.slug === slug);
  const isProtectionService = !brandPath && ["paint-protection-dubai", "paint-protection-film", "ceramic-coating"].includes(slug ?? "");
  const sourceService = slug && !newSlug && !externalRedirect && !(isArabic && isElectronics) ? getServiceBySlug(slug) : void 0;
  const service = sourceService && isArabic ? brandPath ? localizeServiceToArabic(sourceService) : refineArabicProtectionService(refineGenericArabicService(localizeServiceToArabic(sourceService))) : sourceService && !brandPath && sourceService.pageTitle ? { ...sourceService, title: sourceService.pageTitle } : sourceService;
  const servicePath = service ? canonicalPath ?? `/services/${service.slug}` : void 0;
  const url = servicePath ? `https://digitecme.com${isArabic ? "/ar" : ""}${servicePath}` : void 0;
  const serviceJsonLd = React__default.useMemo(() => {
    if (!service || !url) return void 0;
    const schemaDescription = isProtectionService ? service.intro : isArabic ? `${service.title} لدى مركز ديجي-تك بيرفورمانس في القوز، دبي. تواصل مع الورشة لترتيب الفحص أو الخدمة المناسبة.` : `${service.title} at Digi-Tec Performance Center in Al Quoz, Dubai. Contact the workshop to arrange the appropriate inspection or service.`;
    const breadcrumb = buildBreadcrumb(url, [
      { name: isArabic ? "الرئيسية" : "Home", url: isArabic ? "https://digitecme.com/ar" : "https://digitecme.com/" },
      { name: brandPath ? "Mercedes-Benz" : isArabic ? "الخدمات" : "Services", url: `https://digitecme.com${isArabic ? "/ar" : ""}${brandPath ?? "/services"}` },
      { name: service.title, url }
    ]);
    const webPage = buildWebPage({
      url,
      name: service.metaTitle || `${service.title} | DIGI-TEC`,
      description: schemaDescription,
      breadcrumbId: `${url}#breadcrumb`,
      primaryImage: typeof service.image === "string" ? service.image : void 0,
      mainEntityId: `${url}#service`
    });
    const brand = detectBrand(service.slug, service.seoKeyword);
    const isMercedesRepair = service.slug === "mercedes-repair-dubai";
    const svc = buildService({
      url,
      name: service.title,
      serviceType: service.seoKeyword,
      description: schemaDescription,
      image: typeof service.image === "string" ? service.image : void 0,
      brand,
      ...isMercedesRepair ? {
        offers: isArabic ? [
          "إصلاح محرك مرسيدس",
          "إصلاح ناقل حركة مرسيدس",
          "برمجة مرسيدس",
          "إصلاح تعليق مرسيدس",
          "إصلاح فرامل مرسيدس",
          "إصلاح تكييف مرسيدس",
          "تغيير زيت مرسيدس"
        ] : [
          "Mercedes Engine Repair",
          "Mercedes Transmission Repair",
          "Mercedes ECU Programming",
          "Mercedes ECU Remapping",
          "Mercedes Suspension Repair",
          "Mercedes Brake Repair",
          "Mercedes Air Conditioning Repair",
          "Mercedes Oil Service"
        ]
      } : {}
    });
    const faq = !isElectronics && service.faqs && service.faqs.length > 0 ? buildFAQ(url, service.faqs) : null;
    return pageGraph([webPage, breadcrumb, svc, ...faq ? [faq] : []]);
  }, [service, brandPath, isArabic, isElectronics, isProtectionService, url]);
  useSeo({
    title: (service == null ? void 0 : service.metaTitle) || (service ? `${service.seoKeyword} | DIGI-TEC Performance Center` : "Service Not Found | DIGI-TEC"),
    description: (service == null ? void 0 : service.metaDescription) || (service ? `${service.intro.slice(0, 155)}…` : ""),
    canonical: url,
    hasArabicVersion: !isElectronics,
    ogImage: isElectronics && service ? `https://digitecme.com${service.image}` : void 0,
    ogImageAlt: service == null ? void 0 : service.imageAlt,
    noindex: !service && !newSlug && !externalRedirect,
    jsonLd: serviceJsonLd
  });
  if (externalRedirect) {
    return /* @__PURE__ */ jsx(Navigate, { to: localizedPath(externalRedirect), replace: true });
  }
  if (newSlug) {
    return /* @__PURE__ */ jsx(Navigate, { to: localizedPath(`/services/${newSlug}`), replace: true });
  }
  if (!service) {
    return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-black text-off-white", children: [
      /* @__PURE__ */ jsx(Header, {}),
      /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center min-h-[60vh]", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold mb-4", children: isArabic ? "الخدمة غير موجودة" : "Service Not Found" }),
        /* @__PURE__ */ jsx(LocalizedLink, { to: "/services", className: "text-burnt-orange hover:underline", children: isArabic ? "العودة إلى الخدمات ←" : "← Back to Services" })
      ] }) }),
      /* @__PURE__ */ jsx(Footer, {})
    ] });
  }
  const isMercedes = service.slug.startsWith("mercedes-");
  const protectionImage = isProtectionService ? service.slug === "ceramic-coating" ? { srcSet: "/images/ceramic-coating/black-mercedes-finish-640.webp 640w, /images/ceramic-coating/black-mercedes-finish-1024.webp 1024w", width: 1024, height: 1536 } : { srcSet: "/images/ppf/film-application-640.webp 640w, /images/ppf/film-application-1200.webp 1200w", width: 1200, height: 1200 } : void 0;
  const enquiryLabel = isArabic ? isProtectionService ? service.ctaLabel ?? "اطلب عرض سعر لسيارتك" : "ناقش الخدمة عبر واتساب" : service.ctaLabel;
  const enquiryHref = `https://wa.me/97143402223?text=${encodeURIComponent(isArabic ? `مرحباً ديجي-تك، أود مناقشة ${service.title}.` : `Hi DIGI-TEC, I would like to discuss ${service.title}. Model/year: Mileage: Concern: Preferred appointment:`)}`;
  const related = allServices.filter((s) => s.category === (sourceService == null ? void 0 : sourceService.category) && s.slug !== service.slug).filter((s) => isMercedes ? s.slug.startsWith("mercedes-") : !s.slug.startsWith("mercedes-")).slice(0, 3);
  return /* @__PURE__ */ jsxs("div", { className: `site-page ${isProtectionService ? "protection-service-page " : ""}min-h-screen bg-black text-off-white`, children: [
    /* @__PURE__ */ jsx(Header, { hasArabicVersion: !isElectronics }),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsxs("section", { className: `theme-dark-section ${isProtectionService ? "protection-service-hero " : ""}relative flex min-h-[56vh] items-end overflow-hidden border-b border-white/[0.08] pb-14 pt-32 sm:min-h-[62vh] sm:pb-20 sm:pt-36`, children: [
        /* @__PURE__ */ jsxs("div", { className: "absolute inset-0", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: service.image,
              srcSet: (protectionImage == null ? void 0 : protectionImage.srcSet) ?? (isElectronics ? "/images/paint-correction/workshop-floor-540.webp 540w, /images/paint-correction/workshop-floor-960.webp 960w" : void 0),
              sizes: isElectronics || isProtectionService ? "100vw" : void 0,
              width: (protectionImage == null ? void 0 : protectionImage.width) ?? (isElectronics ? 960 : void 0),
              height: (protectionImage == null ? void 0 : protectionImage.height) ?? (isElectronics ? 1280 : void 0),
              alt: service.imageAlt ?? service.title,
              fetchPriority: "high",
              className: "w-full h-full object-cover",
              onError: (e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&h=600&fit=crop";
              }
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-[#101113] via-black/65 to-black/20" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative z-10 mx-auto w-full max-w-[90rem] px-5 sm:px-8 lg:px-12", children: [
          /* @__PURE__ */ jsxs("nav", { "aria-label": "Breadcrumb", className: "mb-6 flex flex-wrap items-center gap-2 text-xs text-white/48 sm:text-sm", children: [
            /* @__PURE__ */ jsx(LocalizedLink, { to: "/", className: "hover:text-burnt-orange transition-colors", children: isArabic ? "الرئيسية" : "Home" }),
            /* @__PURE__ */ jsx(ChevronRight, { className: `w-4 h-4 ${isArabic ? "rotate-180" : ""}` }),
            /* @__PURE__ */ jsx(LocalizedLink, { to: brandPath ?? "/services", className: "hover:text-burnt-orange transition-colors", children: brandPath ? "Mercedes-Benz" : isArabic ? "الخدمات" : "Services" }),
            /* @__PURE__ */ jsx(ChevronRight, { className: `w-4 h-4 ${isArabic ? "rotate-180" : ""}` }),
            /* @__PURE__ */ jsx("span", { className: "text-burnt-orange", children: service.title })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "home-kicker mb-4 block", children: service.category }),
          /* @__PURE__ */ jsx("h1", { className: "mb-5 max-w-4xl text-[clamp(2.75rem,5vw,5.25rem)] font-semibold leading-[0.98] tracking-[-0.05em]", children: service.title }),
          /* @__PURE__ */ jsx("p", { className: "max-w-2xl text-base leading-7 text-white/64 sm:text-lg", children: service.description }),
          (service.ctaLabel || isProtectionService) && /* @__PURE__ */ jsxs("div", { className: "mt-7 flex flex-col flex-wrap gap-3 sm:flex-row", children: [
            /* @__PURE__ */ jsxs("a", { href: enquiryHref, "data-cta-placement": "hero", target: "_blank", rel: "noopener noreferrer", className: "btn-primary", children: [
              /* @__PURE__ */ jsx(MessageCircle, { className: "h-5 w-5 shrink-0" }),
              enquiryLabel
            ] }),
            /* @__PURE__ */ jsxs("a", { href: "tel:+97143402223", "data-cta-placement": "hero", className: "btn-secondary", children: [
              /* @__PURE__ */ jsx(Phone, { className: "h-5 w-5 shrink-0" }),
              isArabic ? "اتصل بالورشة" : "Call the Al Quoz workshop"
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "py-16 sm:py-24", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-6xl px-5 sm:px-8", children: /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-3 gap-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "md:col-span-2 space-y-12", children: [
          /* @__PURE__ */ jsxs("div", { id: service.slug === "paint-protection-dubai" ? "paint-correction" : void 0, children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-3xl font-bold mb-5", children: isArabic ? "نظرة عامة" : "Overview" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-300 leading-relaxed text-lg", children: service.intro }),
            !isArabic && service.relatedServiceLinks && /* @__PURE__ */ jsx("nav", { className: "mt-5 flex flex-wrap gap-x-6 gap-y-3", "aria-label": "Related inspection and service options", children: service.relatedServiceLinks.map((link) => /* @__PURE__ */ jsx(LocalizedLink, { to: link.path, className: "text-base text-burnt-orange underline", children: link.label }, link.path)) }),
            isArabic && ["paint-protection-dubai", "paint-protection-film", "ceramic-coating"].includes(service.slug) && /* @__PURE__ */ jsxs("p", { className: "mt-5 text-gray-300 leading-relaxed text-lg", children: [
              "قارن ",
              /* @__PURE__ */ jsx(LocalizedLink, { to: "/services/paint-protection-dubai", className: "text-burnt-orange underline", children: "خيارات حماية الطلاء" }),
              "، وراجع ",
              /* @__PURE__ */ jsx(LocalizedLink, { to: "/services/paint-protection-film", className: "text-burnt-orange underline", children: "تغطية أفلام PPF" }),
              " أو",
              /* @__PURE__ */ jsx(LocalizedLink, { to: "/services/ceramic-coating", className: "text-burnt-orange underline", children: " معالجة السيراميك والعناية" }),
              ". يساعد ",
              /* @__PURE__ */ jsx(LocalizedLink, { to: "/blog/ceramic-coating-vs-ppf-dubai", className: "text-burnt-orange underline", children: "دليل المقارنة" }),
              " في اختيار الهدف؛ أما فقدان الطلاء أو الضرر العميق فيحتاج إلى ",
              /* @__PURE__ */ jsx(LocalizedLink, { to: "/services/car-body-repair-dubai", className: "text-burnt-orange underline", children: "تقييم إصلاح الهيكل والدهان" }),
              "."
            ] }),
            !isArabic && service.slug === "paint-protection-dubai" && /* @__PURE__ */ jsxs("p", { className: "mt-5 text-gray-300 leading-relaxed text-lg", children: [
              /* @__PURE__ */ jsx(LocalizedLink, { to: "/services/car-polishing-dubai", className: "text-burnt-orange underline", children: "Car polishing and paint correction" }),
              " address existing surface defects before protection is selected. For a physical barrier against road debris, explore ",
              /* @__PURE__ */ jsx(LocalizedLink, { to: "/services/paint-protection-film", className: "text-burnt-orange underline", children: "PPF coverage and installation in Dubai" }),
              ". For water behaviour and finish maintenance, see our ",
              /* @__PURE__ */ jsx(LocalizedLink, { to: "/services/ceramic-coating", className: "text-burnt-orange underline", children: "ceramic coating service" }),
              ". Preparation and product compatibility are assessed for your car."
            ] }),
            !isArabic && service.slug === "car-body-repair-dubai" && /* @__PURE__ */ jsxs("p", { className: "mt-5 text-gray-300 leading-relaxed text-lg", children: [
              "For shallow surface marks, ",
              /* @__PURE__ */ jsx(LocalizedLink, { to: "/services/car-polishing-dubai#paint-scratches", className: "text-burnt-orange underline", children: "assess whether polishing can improve the scratch" }),
              ". Deeper damage, missing paint and dents need a different repair approach."
            ] }),
            !isArabic && service.slug === "ceramic-coating" && /* @__PURE__ */ jsxs("p", { className: "mt-5 text-gray-300 leading-relaxed text-lg", children: [
              "Looking for a physical barrier against stone chips? Compare ",
              /* @__PURE__ */ jsx(LocalizedLink, { to: "/services/paint-protection-film#ppf-comparison", className: "text-burnt-orange underline", children: "paint protection film with ceramic coating" }),
              " and review full-body or selected-panel film coverage. A compatible coating can complement suitable PPF."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-3xl font-bold mb-5", children: isArabic ? "لماذا هذه الخدمة مهمة؟" : "Why It Matters" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-300 leading-relaxed text-lg", children: service.whyImportant })
          ] }),
          service.modelsSection && /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-3xl font-bold mb-5", children: service.modelsSection.heading }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-300 leading-relaxed text-lg mb-4", children: service.modelsSection.intro }),
            /* @__PURE__ */ jsx("ul", { className: "space-y-3 mb-4", children: service.modelsSection.models.map((model, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3 text-gray-300 text-lg", children: [
              /* @__PURE__ */ jsx(Check, { className: "w-5 h-5 text-burnt-orange mt-1 shrink-0" }),
              model
            ] }, i)) }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-300 leading-relaxed text-lg", children: service.modelsSection.outro })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-3xl font-bold mb-5", children: isArabic ? "لماذا تختار ديجي-تك؟" : "Why Choose Digi-Tec" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-300 leading-relaxed text-lg", children: service.whyChoose })
          ] }),
          service.servicesIntro && /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-3xl font-bold mb-5", children: service.servicesIntro.heading }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-300 leading-relaxed text-lg", children: service.servicesIntro.text })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-3xl font-bold mb-5", children: isArabic ? "ماذا تشمل الخدمة؟" : "What's Included" }),
            /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: service.includes.map((item, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3 text-gray-300 text-lg", children: [
              /* @__PURE__ */ jsx(Check, { className: "w-5 h-5 text-burnt-orange mt-1 shrink-0" }),
              item
            ] }, i)) })
          ] }),
          !isArabic && service.quoteGuidance && /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8", children: [
            /* @__PURE__ */ jsx("h2", { className: "mb-4 text-2xl font-bold", children: "Discuss the inspection and quote" }),
            /* @__PURE__ */ jsx("p", { className: "mb-6 text-base leading-8 text-gray-300", children: service.quoteGuidance }),
            /* @__PURE__ */ jsxs("a", { href: enquiryHref, "data-cta-placement": "service_scope", target: "_blank", rel: "noopener noreferrer", className: "btn-primary", children: [
              /* @__PURE__ */ jsx(MessageCircle, { className: "h-5 w-5 shrink-0" }),
              enquiryLabel
            ] })
          ] }),
          (_a = service.extraSections) == null ? void 0 : _a.map((section, i) => /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-3xl font-bold mb-5", children: section.heading }),
            section.text && /* @__PURE__ */ jsx("p", { className: "text-gray-300 leading-relaxed text-lg mb-4", children: section.text }),
            section.items && /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: section.items.map((item, j) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3 text-gray-300 text-lg", children: [
              /* @__PURE__ */ jsx(Check, { className: "w-5 h-5 text-burnt-orange mt-1 shrink-0" }),
              item
            ] }, j)) })
          ] }, i)),
          service.faqs && service.faqs.length > 0 && /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-3xl font-bold mb-5", children: isArabic ? "الأسئلة الشائعة" : service.slug === "oil-change-dubai" ? "Oil Change FAQs" : service.slug === "car-service-dubai" ? "Car Service FAQs" : "Frequently Asked Questions" }),
            /* @__PURE__ */ jsx(Accordion, { type: "single", collapsible: true, className: "space-y-3", children: service.faqs.map((faq, i) => /* @__PURE__ */ jsxs(
              AccordionItem,
              {
                value: `faq-${i}`,
                className: "bg-white/[0.03] border border-white/10 rounded-2xl px-5 sm:px-6 data-[state=open]:border-burnt-orange/40",
                children: [
                  /* @__PURE__ */ jsx(AccordionTrigger, { className: "text-left text-base sm:text-lg font-semibold hover:no-underline py-4", children: faq.question }),
                  /* @__PURE__ */ jsx(AccordionContent, { forceMount: true, className: "text-gray-300 text-base leading-relaxed pb-5", children: faq.answer })
                ]
              },
              i
            )) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "card-premium rounded-2xl p-6 sm:p-8", children: /* @__PURE__ */ jsx("p", { className: "text-gray-300 leading-relaxed text-lg italic", children: service.localIntent }) }),
          service.slug === "battery-replacement-dubai" && /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-burnt-orange/10 to-charcoal/40 border border-burnt-orange/30 rounded-2xl p-6 sm:p-8", children: [
            /* @__PURE__ */ jsx("span", { className: "text-burnt-orange text-xs font-bold uppercase tracking-widest mb-3 block", children: isArabic ? "اعرف المزيد" : "Learn More" }),
            /* @__PURE__ */ jsx("h3", { className: "text-2xl sm:text-3xl font-bold mb-3", children: isArabic ? "هل تريد معرفة المزيد عن بطارية سيارتك؟" : "Want to understand more about your car battery?" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-300 leading-relaxed text-lg mb-5", children: isArabic ? "اطّلع على دليلنا حول تأثير حرارة دبي في البطارية وعلامات الضعف والأسئلة الشائعة عن الاستبدال." : "Check out our in-depth guide on why batteries fail in Dubai's heat, warning signs to watch for, and answers to the most common replacement questions." }),
            /* @__PURE__ */ jsxs(
              LocalizedLink,
              {
                to: "/blog/car-battery-replacement-dubai",
                className: "inline-flex items-center gap-2 bg-burnt-orange hover:bg-burnt-orange/90 text-black font-bold py-3 px-6 rounded-xl transition-all duration-300",
                children: [
                  isArabic ? "اقرأ دليل البطارية" : "Read the Battery Guide",
                  /* @__PURE__ */ jsx(ChevronRight, { className: "w-5 h-5" })
                ]
              }
            )
          ] }),
          service.slug === "brake-repair-dubai" && /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-burnt-orange/10 to-charcoal/40 border border-burnt-orange/30 rounded-2xl p-6 sm:p-8", children: [
            /* @__PURE__ */ jsx("span", { className: "text-burnt-orange text-xs font-bold uppercase tracking-widest mb-3 block", children: isArabic ? "اعرف المزيد" : "Learn More" }),
            /* @__PURE__ */ jsx("h3", { className: "text-2xl sm:text-3xl font-bold mb-3", children: isArabic ? "هل تريد معرفة المزيد عن فرامل سيارتك؟" : "Want to understand more about your brakes?" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-300 leading-relaxed text-lg mb-5", children: isArabic ? "اقرأ دليلنا عن أسباب تآكل الفرامل في دبي وعلامات التحذير وأهم أسئلة الإصلاح." : "Check out our in-depth guide on why brakes wear faster in Dubai, the warning signs to watch for, and answers to the most common brake repair questions." }),
            /* @__PURE__ */ jsxs(
              LocalizedLink,
              {
                to: "/blog/brake-repair-dubai",
                className: "inline-flex items-center gap-2 bg-burnt-orange hover:bg-burnt-orange/90 text-black font-bold py-3 px-6 rounded-xl transition-all duration-300",
                children: [
                  isArabic ? "اقرأ دليل الفرامل" : "Read the Brake Guide",
                  /* @__PURE__ */ jsx(ChevronRight, { className: "w-5 h-5" })
                ]
              }
            )
          ] }),
          service.slug === "mercedes-repair-dubai" && /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-burnt-orange/10 to-charcoal/40 border border-burnt-orange/30 rounded-2xl p-6 sm:p-8", children: [
            /* @__PURE__ */ jsx("span", { className: "text-burnt-orange text-xs font-bold uppercase tracking-widest mb-3 block", children: isArabic ? "اعرف المزيد" : "Learn More" }),
            /* @__PURE__ */ jsx("h3", { className: "text-2xl sm:text-3xl font-bold mb-3", children: isArabic ? "هل تريد دليل مالك مرسيدس في دبي؟" : "Want the complete Mercedes owner guide for Dubai?" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-300 leading-relaxed text-lg mb-5", children: isArabic ? "اقرأ دليل مرسيدس الذي يغطي الأعطال الشائعة وأنظمة AIRMATIC وAMG وعلامات التحذير واختيار الورشة المتخصصة." : "Read our 2026 Mercedes repair guide covering common UAE issues, AIRMATIC and AMG specifics, warning signs, and how to choose the right specialist workshop." }),
            /* @__PURE__ */ jsxs(
              LocalizedLink,
              {
                to: "/blog/mercedes-repair-dubai-complete-guide",
                className: "inline-flex items-center gap-2 bg-burnt-orange hover:bg-burnt-orange/90 text-black font-bold py-3 px-6 rounded-xl transition-all duration-300",
                children: [
                  isArabic ? "اقرأ دليل مرسيدس" : "Read the Mercedes Guide",
                  /* @__PURE__ */ jsx(ChevronRight, { className: "w-5 h-5" })
                ]
              }
            )
          ] }),
          service.slug === "car-ac-repair-dubai" && /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-burnt-orange/10 to-charcoal/40 border border-burnt-orange/30 rounded-2xl p-6 sm:p-8", children: [
            /* @__PURE__ */ jsx("span", { className: "text-burnt-orange text-xs font-bold uppercase tracking-widest mb-3 block", children: isArabic ? "اعرف المزيد" : "Learn More" }),
            /* @__PURE__ */ jsx("h3", { className: "text-2xl sm:text-3xl font-bold mb-3", children: isArabic ? "لماذا يتوقف تكييف السيارة عن التبريد في دبي؟" : "Why does your car AC stop cooling in Dubai?" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-300 leading-relaxed text-lg mb-5", children: isArabic ? "اقرأ دليلنا عن تأثير حرارة دبي في التكييف وأعطال الضاغط وغاز التبريد والحلول طويلة المدى." : "Read our specialist guide on why AC systems fail in Dubai's heat, the most common compressor and refrigerant issues, and what actually fixes them long term." }),
            /* @__PURE__ */ jsxs(
              LocalizedLink,
              {
                to: "/blog/car-ac-repair-dubai",
                className: "inline-flex items-center gap-2 bg-burnt-orange hover:bg-burnt-orange/90 text-black font-bold py-3 px-6 rounded-xl transition-all duration-300",
                children: [
                  isArabic ? "اقرأ دليل إصلاح التكييف" : "Read the AC Repair Guide",
                  /* @__PURE__ */ jsx(ChevronRight, { className: "w-5 h-5" })
                ]
              }
            )
          ] }),
          service.slug === "soft-close-door-repair-dubai" && /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-burnt-orange/10 to-charcoal/40 border border-burnt-orange/30 rounded-2xl p-6 sm:p-8", children: [
            /* @__PURE__ */ jsx("span", { className: "text-burnt-orange text-xs font-bold uppercase tracking-widest mb-3 block", children: isArabic ? "خدمة ROX 01 المتخصصة" : "ROX 01 Specialist Service" }),
            /* @__PURE__ */ jsx("h3", { className: "text-2xl sm:text-3xl font-bold mb-3", children: isArabic ? "هل تحتاج إلى تركيب الإغلاق الناعم لسيارة ROX 01؟" : "Need ROX 01 soft close installation in Dubai?" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-300 leading-relaxed text-lg mb-5", children: isArabic ? "تعرّف على خدمة ROX 01 المخصصة لتركيب الإغلاق الناعم وفحص التوافق وإصلاح الأقفال والأسلاك في ورشتنا بالقوز." : "Explore our dedicated ROX 01 page for soft close installation, compatibility checks, latch diagnosis and comfort-system repair at our Al Quoz workshop." }),
            /* @__PURE__ */ jsxs(
              LocalizedLink,
              {
                to: "/brands/rox-service-dubai/soft-close-door-installation",
                className: "inline-flex items-center gap-2 bg-burnt-orange hover:bg-burnt-orange/90 text-black font-bold py-3 px-6 rounded-xl transition-all duration-300",
                children: [
                  isArabic ? "استكشف خدمة ROX 01" : "Explore ROX 01 Soft Close Service",
                  /* @__PURE__ */ jsx(ChevronRight, { className: "w-5 h-5" })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-6", children: /* @__PURE__ */ jsxs("div", { className: "card-premium rounded-2xl p-6 sticky top-24", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold mb-4 text-burnt-orange", children: isArabic ? "لماذا تختارنا؟" : "Why Choose Us" }),
          /* @__PURE__ */ jsxs("ul", { className: "space-y-3 text-gray-300 text-sm mb-6", children: [
            /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-burnt-orange mt-1", children: "✓" }),
              isProtectionService ? isArabic ? "تحديد المنتج والتحضير والأسطح المشمولة" : "Product, preparation and covered surfaces agreed" : isArabic ? "توضيح القطع والسوائل المقترحة قبل الموافقة" : "Proposed parts and fluids explained before approval"
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-burnt-orange mt-1", children: "✓" }),
              isProtectionService ? isArabic ? "تقييم حالة الطلاء والإصلاحات السابقة" : "Paint condition and previous repairs assessed" : isArabic ? "فحص وتشخيص يناسب السيارة" : "Vehicle-specific inspection and diagnostics"
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-burnt-orange mt-1", children: "✓" }),
              isArabic ? "شرح نطاق العمل والتكلفة قبل البدء" : "Scope and pricing explained before work begins"
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-burnt-orange mt-1", children: "✓" }),
              isArabic ? "نخدم دبي منذ عام 2002" : "Serving Dubai since 2002"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: enquiryHref,
                "data-cta-placement": "service_details",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "flex items-center justify-center gap-2 w-full bg-burnt-orange hover:bg-[#ff7d4d] text-black font-bold text-sm uppercase tracking-[0.12em] py-3.5 rounded-lg transition-colors duration-300",
                children: [
                  /* @__PURE__ */ jsx(MessageCircle, { className: "w-5 h-5" }),
                  isArabic ? "راسلنا عبر واتساب" : "WhatsApp Us"
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: "tel:+97143402223",
                "data-cta-placement": "service_details",
                className: "flex items-center justify-center gap-2 w-full border border-white/20 text-off-white hover:border-burnt-orange/70 hover:text-burnt-orange font-bold text-sm uppercase tracking-[0.12em] py-3.5 rounded-lg transition-all duration-300",
                children: [
                  /* @__PURE__ */ jsx(Phone, { className: "w-5 h-5" }),
                  isArabic ? "اتصل الآن" : "Call Now"
                ]
              }
            ),
            /* @__PURE__ */ jsx("p", { className: "text-[11px] text-gray-500 text-center leading-snug pt-1", children: isArabic ? "تواصل معنا لمناقشة سيارتك وطلب موعد" : "Contact us to discuss your vehicle and request an appointment" })
          ] })
        ] }) })
      ] }) }) }),
      related.length > 0 && /* @__PURE__ */ jsx("section", { className: "py-16 border-t border-gray-800/50", children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto px-4 sm:px-6", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-3xl font-bold mb-8", children: isArabic ? "خدمات ذات صلة" : "Related Services" }),
        /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 md:grid-cols-3 gap-6", children: related.map((sourceRelated) => {
          const localizedRelated = isArabic ? localizeServiceToArabic(sourceRelated) : sourceRelated;
          const s = isArabic && ["paint-protection-dubai", "paint-protection-film", "ceramic-coating"].includes(service.slug) ? refineArabicProtectionService(localizedRelated) : localizedRelated;
          return /* @__PURE__ */ jsxs(
            LocalizedLink,
            {
              to: `/services/${s.slug}`,
              className: "card-premium group rounded-2xl overflow-hidden transition-all duration-300",
              children: [
                /* @__PURE__ */ jsx("div", { className: "aspect-[4/3] overflow-hidden", children: /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: s.image,
                    alt: s.title,
                    width: service.slug === "paint-protection-film" ? 400 : void 0,
                    height: service.slug === "paint-protection-film" ? 300 : void 0,
                    loading: "lazy",
                    className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500",
                    onError: (e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop";
                    }
                  }
                ) }),
                /* @__PURE__ */ jsxs("div", { className: "p-5", children: [
                  /* @__PURE__ */ jsx("h3", { className: "font-bold text-lg group-hover:text-burnt-orange transition-colors", children: s.title }),
                  /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm mt-2", children: s.description })
                ] })
              ]
            },
            s.slug
          );
        }) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "py-14 border-t border-gray-800/50 bg-gradient-to-br from-charcoal/30 to-black", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-8", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-3xl font-bold mb-2", children: isArabic ? /* @__PURE__ */ jsxs(Fragment, { children: [
            "متخصصون في العلامات بمدينة ",
            /* @__PURE__ */ jsx("span", { className: "text-burnt-orange", children: "دبي" })
          ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            "Brand Specialists in ",
            /* @__PURE__ */ jsx("span", { className: "text-burnt-orange", children: "Dubai" })
          ] }) }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm sm:text-base", children: isArabic ? ["paint-protection-dubai", "paint-protection-film", "ceramic-coating"].includes(service.slug) ? "استعرض صفحات العلامات، وأكد ملاءمة المنتج والسطح ونطاق العمل للسيارة المعنية قبل الحجز." : `نقدم ${(service == null ? void 0 : service.title) ?? "هذه الخدمة"} للعلامات التالية.` : "Explore our brand service pages. Coverage for a particular repair or upgrade is confirmed for the exact vehicle and fitted equipment." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-3", children: brands.map((b) => /* @__PURE__ */ jsxs(
          LocalizedLink,
          {
            to: `/brands/${b.slug}`,
            "aria-label": `${b.name} service Dubai`,
            className: "group flex flex-col items-center gap-2 p-3 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-burnt-orange/40 rounded-2xl transition-all duration-300",
            children: [
              /* @__PURE__ */ jsx("div", { className: "w-12 h-12 sm:w-14 sm:h-14 p-1.5 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300", children: /* @__PURE__ */ jsx("img", { src: b.logo, alt: `${b.name} service Dubai`, width: service.slug === "paint-protection-film" ? 56 : void 0, height: service.slug === "paint-protection-film" ? 56 : void 0, loading: "lazy", className: "w-full h-full object-contain" }) }),
              /* @__PURE__ */ jsx("span", { className: "text-[11px] sm:text-xs text-gray-300 group-hover:text-burnt-orange text-center font-medium leading-tight", children: isArabic ? `خدمة ${b.name}` : `${b.name} Service` })
            ]
          },
          b.slug
        )) })
      ] }) }),
      isArabic && !brandPath && service.slug === "paint-protection-film" && /* @__PURE__ */ jsxs("section", { id: "ppf-quote", className: "mx-auto max-w-5xl px-5 py-16 sm:px-8", "aria-labelledby": "ppf-quote-heading", children: [
        /* @__PURE__ */ jsx("h2", { id: "ppf-quote-heading", className: "mb-5 text-2xl font-bold sm:text-3xl", children: "اطلب عرض سعر لأفلام حماية الطلاء" }),
        /* @__PURE__ */ jsx("p", { className: "mb-8 leading-8 text-gray-300", children: "شارك بيانات السيارة والتغطية المطلوبة ووسيلة التواصل المفضلة. اختر «غير متأكد» للمساعدة في تحديد التغطية. راجع الطلب وأرسله في واتساب؛ تُؤكّد التغطية والتحضير والمنتج في عرض السعر." }),
        /* @__PURE__ */ jsx(PpfQuoteForm, {})
      ] }),
      /* @__PURE__ */ jsx(FinalCTA, { title: service.ctaLabel ? service.title : void 0, label: enquiryLabel, href: enquiryHref })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
export {
  ServicePage as default
};
