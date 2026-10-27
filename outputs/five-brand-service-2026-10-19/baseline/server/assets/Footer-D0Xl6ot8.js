import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { X, Menu, Sun, Moon, ChevronDown } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import { aT as englishPathForArabicPath, aU as arabicPathForEnglishPath, o as cn, aV as localeMessages, aW as isEnglishMercedesModelPath, aX as LOCALE_STORAGE_KEY, u as useLocale, L as LocalizedLink } from "../entry-server.js";
const arHome = {
  hero: {
    eyebrow: "ورشة دبي المتخصصة للسيارات عالية الأداء",
    titleLine: "مركز الأداء",
    subtitle: "ورشة سيارات مستقلة في القوز، دبي",
    description: "ديجي-تك ورشة مستقلة في دبي تأسست عام 2002 لخدمة السيارات الأوروبية والفاخرة، وتشمل أعمالها الفحص والصيانة والإصلاح ومناقشة مشاريع الأداء بحسب السيارة.",
    book: "احجز موعداً"
  },
  trust: [
    { value: "منذ 2002", label: "ورشة مستقلة" },
    { value: "أوروبية وفاخرة", label: "خدمة وإصلاح" },
    { value: "فحص منظم", label: "قبل التوصية" },
    { value: "القوز", label: "ورشتنا في دبي" }
  ],
  expertise: {
    eyebrow: "خبراتنا",
    title: "ماذا نقدم",
    description: "نحوّل السيارات الفاخرة إلى سيارات أداء مصممة حسب الطلب، عبر هندسة دقيقة وتشخيص متقدم وحرفية عالمية، مع الحفاظ على جودة السيارة وقيمتها.",
    cards: [
      { title: "تطوير الأداء", text: "برمجة وحدة التحكم، وترقية التيربو، وتحسين نظام العادم لإطلاق قدرات سيارتك الحقيقية." },
      { title: "التعديلات الجمالية", text: "هياكل مخصصة، وقطع من ألياف الكربون، وترقيات عجلات فاخرة لمظهر أكثر تميزاً." },
      { title: "صيانة دقيقة", text: "تشخيص شامل وصيانة وقائية للحفاظ على سيارتك الفاخرة في أفضل حالة." }
    ]
  },
  brands: {
    eyebrow: "متخصصون في العلامات الفاخرة",
    title: "العلامات التي نخدمها",
    description: "خدمة دقيقة لعدد من أرقى علامات السيارات في العالم.",
    note: "خدمة متخصصة لسيارتك الفاخرة",
    view: "عرض المزيد"
  },
  services: {
    eyebrow: "عناية متكاملة",
    title: "اكتشف مجموعتنا الكاملة من الخدمات",
    description: "عناية احترافية بكل نظام، وكل تفصيل، وفي كل رحلة.",
    viewAll: "عرض جميع الخدمات",
    categories: {
      "Core Mechanical Services": "الخدمات الميكانيكية الأساسية",
      "Diagnostics & Electrical": "التشخيص والأنظمة الكهربائية",
      "Comfort Systems": "أنظمة الراحة",
      "Body & Visual Work": "الهيكل والعناية الخارجية"
    }
  },
  why: {
    eyebrow: "معيار ديجي-تك",
    title: "لماذا تختار ديجي-تك؟",
    description: "ورشة مستقلة في دبي لخدمة السيارات الأوروبية والفاخرة، مع شرح الفحص والعمل المقترح قبل بدء الأعمال المعتمدة.",
    reasons: [
      { title: "تأسست عام 2002", description: "ورشة مستقلة في دبي منذ عام 2002" },
      { title: "موقع القوز", description: "القوز الصناعية 3" },
      { title: "فحص واضح", description: "مراجعة حالة السيارة قبل تقديم التوصية" },
      { title: "موافقة مسبقة", description: "شرح نطاق العمل وخيارات القطع قبل البدء" }
    ],
    facilityTitle: "ورشتنا في القوز، دبي",
    facilityText: "تقع ورشة ديجي-تك في القوز الصناعية 3. تواصل معنا قبل الزيارة لتأكيد موعد الفحص أو الخدمة المناسبة.",
    facilities: [
      { title: "فحص منظم", text: "مراجعة الأعراض ونتائج الفحص قبل التوصية" },
      { title: "خيارات واضحة", text: "توضيح نطاق العمل والقطع المقترحة" },
      { title: "موافقة العميل", text: "بدء الأعمال المعتمدة بعد شرحها" }
    ]
  },
  faq: {
    eyebrow: "الإجابات",
    title: "الأسئلة الشائعة",
    description: "اختر الموضوع لتجد إجابات عن خدماتنا وخبراتنا وطريقة عملنا.",
    still: "هل لديك سؤال آخر؟",
    chat: "تحدث معنا الآن"
  },
  cta: {
    eyebrow: "ابدأ الآن",
    title: "هل أنت مستعد لتطوير سيارة أحلامك؟",
    description: "تواصل مع مركز ديجي-تك لمناقشة سيارتك والخدمة المطلوبة وطلب موعد في ورشتنا بالقوز.",
    schedule: "احجز استشارتك",
    call: "اتصل على +971 4 340 2223",
    cards: [
      { title: "طلب موعد", text: "شاركنا طراز السيارة والعمل المطلوب" },
      { title: "مراجعة أولية", text: "نؤكد نطاق الفحص المتاح قبل الحجز" },
      { title: "خطة واضحة", text: "تُشرح التوصيات قبل الموافقة على العمل" }
    ]
  },
  footer: {
    description: "مركز دبي المتخصص في السيارات الفاخرة وتطوير الأداء، بخبرة تجمع بين الهندسة الدقيقة والخدمة الاحترافية.",
    contact: "تواصل معنا",
    rights: "جميع الحقوق محفوظة.",
    sitemap: "خريطة الموقع",
    privacy: "سياسة الخصوصية"
  }
};
const arServiceCards = {
  "mercedes-repair-dubai": { title: "إصلاح مرسيدس في دبي", description: "خدمة وتشخيص وإصلاح متخصص لسيارات مرسيدس-بنز." },
  "mechanical-repair-dubai": { title: "الإصلاح الميكانيكي في دبي", description: "إصلاح المحرك ومجموعة نقل الحركة على أيدي متخصصين." },
  "transmission-repair-dubai": { title: "إصلاح ناقل الحركة في دبي", description: "تشخيص وإصلاح الجير الأوتوماتيكي وأنظمة نقل الحركة." },
  "suspension-repair-dubai": { title: "إصلاح نظام التعليق في دبي", description: "إصلاح التعليق التقليدي والهوائي للسيارات الفاخرة." },
  "steering-repair-dubai": { title: "إصلاح نظام التوجيه في دبي", description: "إصلاح الدركسون الهيدروليكي وعلبة التوجيه والأنظمة الكهربائية." },
  "brake-repair-dubai": { title: "إصلاح الفرامل في دبي", description: "فحمات وأقراص وكليبرات وتشخيص نظام ABS." },
  "car-service-dubai": { title: "صيانة السيارات في دبي", description: "صيانة دورية وفق جداول الشركة المصنّعة." },
  "oil-change-dubai": { title: "تغيير زيت السيارة في دبي", description: "زيوت وفلاتر عالية الجودة مع فحص أساسي للسيارة." },
  "mercedes-oil-change-dubai": { title: "تغيير زيت مرسيدس في دبي", description: "زيوت معتمدة وخدمة متخصصة لسيارات مرسيدس-بنز." },
  "tire-repair-dubai": { title: "إصلاح الإطارات في دبي", description: "إصلاح الثقوب وتبديل الإطارات وضبط زوايا العجلات." },
  "battery-replacement-dubai": { title: "تبديل بطارية السيارة في دبي", description: "فحص واستبدال وبرمجة بطاريات السيارات الحديثة." },
  "exhaust-repair-dubai": { title: "إصلاح نظام العادم في دبي", description: "فحص وإصلاح العادم والكاتاليزر وأنظمة الصوت." },
  "car-diagnostics-dubai": { title: "برمجة وتشخيص السيارات", description: "برمجة وحدات التحكم وإعادة الضبط والفحص الرقمي الكامل." },
  "auto-electrical-repair-dubai": { title: "إصلاح كهرباء السيارات", description: "تشخيص وإصلاح أنظمة الطاقة والحساسات والوحدات الإلكترونية." },
  "fuel-system-repair-dubai": { title: "إصلاح نظام الوقود", description: "استعادة ضغط الوقود وتدفقه وكفاءة الاحتراق." },
  "car-ac-repair-dubai": { title: "إصلاح تكييف السيارات في دبي", description: "تشخيص التكييف وتعبئة الغاز وإصلاح الضاغط." },
  "soft-close-door-repair-dubai": { title: "تركيب وإصلاح الأبواب ذات الإغلاق الناعم", description: "تركيب وتحديث وإصلاح نظام الإغلاق الناعم لجميع السيارات، ومنها ROX." },
  "car-body-repair-dubai": { title: "إصلاح هيكل السيارة", description: "إصلاح دقيق للانبعاجات والخدوش والأضرار الهيكلية." },
  "paint-protection-dubai": { title: "حماية طلاء السيارة", description: "طلاء سيراميك وأفلام حماية للحفاظ على مظهر السيارة." },
  "paint-protection-film": { title: "فيلم حماية الطلاء PPF", description: "فيلم يساعد على حماية الطلاء، مع اختيار التغطية حسب حالة السيارة والمنتج." },
  "ceramic-coating": { title: "الطلاء السيراميكي", description: "طلاء سطحي بعد تجهيز الطلاء، وتعتمد خصائصه والعناية به على المنتج المستخدم." }
};
const arFaqCategories = [
  {
    id: "general",
    label: "عام",
    faqs: [
      { question: "كم مرة يجب أن أصون سيارتي الفاخرة في دبي؟", answer: "لا توجد فترة واحدة تناسب جميع السيارات. ابدأ بجدول الطراز المحدد، ثم راجع العمر والمسافة وسجل الصيانة وطريقة الاستخدام وظروف دبي قبل تحديد موعد الفحص أو الخدمة." },
      { question: "ما العلامات التي تستدعي فحص السيارة فوراً؟", answer: "أضواء التحذير، والتقطيع، وارتفاع الحرارة، وتأخر تبديل السرعات، والاهتزازات أو ضعف الكفاءة علامات تستحق فحصاً سريعاً قبل أن تتطور المشكلة." },
      { question: "ما الذي يميز ديجي-تك عن الورش العادية؟", answer: "ديجي-تك ورشة مستقلة في دبي تأسست عام 2002 وتركز على السيارات الأوروبية والفاخرة، مع فحص واضح وشرح نطاق العمل قبل موافقة العميل." },
      { question: "هل تصلحون السيارات الهجينة والكهربائية الفاخرة؟", answer: "تختلف الأنظمة والتجهيزات المطلوبة حسب الطراز. أرسل نوع السيارة وسنة الصنع ووصف المشكلة لنتأكد من نطاق الخدمة المتاح وإجراءات الفحص قبل الحجز." }
    ]
  },
  {
    id: "car-service",
    label: "صيانة السيارات",
    faqs: [
      { question: "ماذا تشمل صيانة السيارة في دبي؟", answer: "تشمل عادةً تغيير زيت المحرك والفلتر، وفحص السوائل والفرامل والبطارية والإطارات، إضافة إلى فحص عام وفق جدول الشركة المصنّعة." },
      { question: "كم تستغرق الصيانة الدورية؟", answer: "تعتمد المدة على السيارة ونطاق الخدمة ونتائج الفحص وتوفر القطع وأي أعمال إضافية يوافق عليها المالك. اطلب تأكيد الوقت المتوقع عند الحجز." },
      { question: "هل تحتاج مرسيدس وبي إم دبليو وأودي إلى خدمة متخصصة؟", answer: "قد تحتاج هذه السيارات إلى سوائل وقطع وخطوات فحص وإعادة ضبط تختلف حسب الطراز. أرسل نوع السيارة وسنة الصنع والعمل المطلوب لتأكيد نطاق الخدمة المتاح." },
      { question: "هل تخدمون فيراري وغيرها من سيارات الأداء؟", answer: "أرسل العلامة والطراز والسنة والمسافة والعمل المطلوب لنتأكد من نطاق الفحص أو الخدمة المتاح قبل الحجز." }
    ]
  },
  {
    id: "performance",
    label: "الأداء والبرمجة",
    faqs: [
      { question: "هل تقدمون برمجة ECU وزيادة القوة؟", answer: "يعتمد العمل المتاح على السيارة ومواصفاتها الحالية وحالتها الميكانيكية والاستخدام المطلوب. أرسل التفاصيل لنتأكد من الخيارات المتاحة والفحص المطلوب أولاً." },
      { question: "هل تعملون على طرازات AMG؟", answer: "أرسل طراز AMG والسنة والمسافة ووصف المشكلة أو العمل المطلوب لنتأكد من نطاق الفحص أو الإصلاح أو الأداء المتاح قبل الحجز." }
    ]
  },
  {
    id: "ac-repair",
    label: "تكييف السيارة",
    faqs: [
      { question: "لماذا لا يبرد تكييف سيارتي في دبي؟", answer: "قد يكون السبب نقص غاز التبريد، أو تسريباً، أو ضعف الضاغط، أو خللاً كهربائياً. نبدأ بالفحص لتحديد السبب قبل تعبئة الغاز أو تغيير القطع." },
      { question: "هل تعبئة الغاز وحدها تحل المشكلة؟", answer: "ليس دائماً. إذا كان هناك تسريب فستكون التعبئة حلاً مؤقتاً، ويجب تحديد مصدر التسريب وإصلاحه." },
      { question: "كم مرة يجب فحص تكييف السيارة؟", answer: "لا توجد فترة واحدة تناسب كل سيارة. اطلب الفحص عند ضعف التبريد أو ظهور صوت أو سلوك غير طبيعي، ويمكن مناقشة فحص الحالة قبل أشهر الحر بحسب سجل السيارة." }
    ]
  },
  {
    id: "location",
    label: "الموقع والخدمة",
    faqs: [
      { question: "أين تقع ديجي-تك في دبي؟", answer: "تقع ورشة ديجي-تك في القوز الصناعية 3، دبي." },
      { question: "هل تقدمون خدمة استلام وتسليم السيارة؟", answer: "تواصل مع الفريق للتأكد من توفر خدمة الاستلام أو التسليم لموقعك وموعدك قبل الحجز." },
      { question: "هل يمكن زيارة الورشة من خارج دبي؟", answer: "تقع الورشة في القوز الصناعية 3 بدبي. اتصل قبل السفر لتأكيد موعد الفحص والخدمة المطلوبة." }
    ]
  }
];
const primaryLinks = [
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Brands", href: "/brands" },
  { name: "GAD", href: "/tuning" },
  { name: "VRX", href: "/vrx" },
  { name: "Blog", href: "/blog" },
  { name: "FAQ", href: "/faq" }
];
const whatsappHref = `https://wa.me/97143402223?text=${encodeURIComponent(
  "Hi DIGI-TEC, I would like to get in touch about my vehicle."
)}`;
const THEME_STORAGE_KEY = "digitec-color-theme";
const Header = ({ overlay = false, hasArabicVersion = true }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [colorTheme, setColorTheme] = useState("dark");
  const [themeReady, setThemeReady] = useState(false);
  const headerRef = useRef(null);
  const location = useLocation();
  const isArabic = location.pathname === "/ar" || location.pathname.startsWith("/ar/");
  const isHome = location.pathname === "/" || location.pathname === "/ar";
  const englishPath = englishPathForArabicPath(location.pathname);
  const arabicPath = arabicPathForEnglishPath(location.pathname);
  const links = isArabic ? [
    { name: localeMessages.ar.nav.about, href: "/ar/about" },
    { name: localeMessages.ar.nav.services, href: "/ar/services" },
    { name: localeMessages.ar.nav.brands, href: "/ar/brands" },
    { name: localeMessages.ar.nav.performance, href: "/ar/tuning" },
    { name: localeMessages.ar.nav.vrx, href: "/ar/vrx" },
    { name: localeMessages.ar.nav.blog, href: "/ar/blog" },
    { name: localeMessages.ar.nav.faq, href: "/ar/faq" }
  ] : primaryLinks;
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    setIsMenuOpen(false);
    setIsLanguageOpen(false);
  }, [location.pathname]);
  useEffect(() => {
    if (!isMenuOpen && !isLanguageOpen) return void 0;
    const closeOnOutsideClick = (event) => {
      var _a;
      if (!((_a = headerRef.current) == null ? void 0 : _a.contains(event.target))) {
        setIsMenuOpen(false);
        setIsLanguageOpen(false);
      }
    };
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        setIsLanguageOpen(false);
      }
    };
    document.addEventListener("mousedown", closeOnOutsideClick);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isMenuOpen, isLanguageOpen]);
  useEffect(() => {
    document.documentElement.lang = isArabic ? "ar" : "en";
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
  }, [isArabic]);
  useEffect(() => {
    setColorTheme(window.localStorage.getItem(THEME_STORAGE_KEY) === "light" ? "light" : "dark");
    setThemeReady(true);
  }, []);
  useEffect(() => {
    if (!themeReady) return;
    const isLight = colorTheme === "light";
    document.documentElement.classList.toggle("theme-light", isLight);
    document.documentElement.style.colorScheme = isLight ? "light" : "dark";
    window.localStorage.setItem(THEME_STORAGE_KEY, colorTheme);
  }, [colorTheme, themeReady]);
  const rememberLocale = (locale) => localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("header", { ref: headerRef, className: "pointer-events-none fixed inset-x-0 top-0 z-[70] px-3 pt-4 sm:px-6 sm:pt-5 lg:px-10 lg:pt-7", children: /* @__PURE__ */ jsxs("div", { className: "relative mx-auto flex max-w-[112rem] items-center justify-between", children: [
      /* @__PURE__ */ jsx(
        Link,
        {
          to: isArabic ? "/ar" : "/",
          className: "pointer-events-auto flex h-[60px] w-11 shrink-0 items-center justify-center overflow-visible transition-transform hover:-translate-y-0.5 sm:w-14 lg:h-[70px] lg:w-[86px]",
          "aria-label": isArabic ? "الصفحة الرئيسية لديجي-تك" : "DIGI-TEC home",
          children: colorTheme === "dark" ? /* @__PURE__ */ jsx("span", { className: "relative block h-12 w-11 overflow-hidden sm:w-14 lg:h-[70px] lg:w-[86px]", "aria-hidden": "true", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: "/images/digitec-d-mark.png",
              alt: "",
              width: "1536",
              height: "1024",
              decoding: "async",
              className: "absolute left-1/2 top-1/2 w-[220px] max-w-none -translate-x-1/2 -translate-y-1/2 mix-blend-screen sm:w-[250px] lg:w-[350px]"
            }
          ) }) : /* @__PURE__ */ jsx("span", { className: "d-logo-mark block h-10 w-11 sm:h-11 sm:w-14 lg:h-[52px] lg:w-[70px]", "aria-hidden": "true" })
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "pointer-events-auto relative w-fit lg:absolute lg:left-1/2 lg:-translate-x-1/2", children: [
        /* @__PURE__ */ jsxs("div", { className: cn(
          "flex h-[60px] w-fit items-center rounded-full border px-1.5 shadow-[0_12px_32px_rgba(0,0,0,0.24)] transition-colors duration-300",
          colorTheme === "light" ? "border-black/[0.08] bg-white text-[#171819]" : "border-white/[0.08] bg-[#171819] text-white",
          isScrolled && "shadow-[0_14px_36px_rgba(0,0,0,0.36)]"
        ), children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: () => {
                setIsMenuOpen((open) => !open);
                setIsLanguageOpen(false);
              },
              className: cn(
                "flex h-11 shrink-0 items-center gap-2.5 rounded-full px-3 text-left text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burnt-orange",
                isArabic ? "w-[104px]" : "w-[92px]",
                colorTheme === "light" ? "hover:bg-black/[0.05]" : "hover:bg-white/[0.05]"
              ),
              "aria-expanded": isMenuOpen,
              "aria-controls": "floating-navigation",
              children: [
                isMenuOpen ? /* @__PURE__ */ jsx(X, { className: "h-4 w-4 opacity-70" }) : /* @__PURE__ */ jsx(Menu, { className: "h-4 w-4 opacity-70" }),
                /* @__PURE__ */ jsx("span", { children: isArabic ? "القائمة" : "Menu" })
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setColorTheme((theme) => theme === "dark" ? "light" : "dark"),
              className: cn(
                "mx-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burnt-orange",
                colorTheme === "light" ? "border-black/15 hover:bg-black/[0.05]" : "border-white/18 hover:bg-white/[0.05]"
              ),
              "aria-label": colorTheme === "dark" ? isArabic ? "تفعيل المظهر الفاتح" : "Use light theme" : isArabic ? "تفعيل المظهر الداكن" : "Use dark theme",
              title: colorTheme === "dark" ? isArabic ? "المظهر الفاتح" : "Light theme" : isArabic ? "المظهر الداكن" : "Dark theme",
              children: colorTheme === "dark" ? /* @__PURE__ */ jsx(Sun, { className: "h-[17px] w-[17px]", strokeWidth: 1.6 }) : /* @__PURE__ */ jsx(Moon, { className: "h-[17px] w-[17px]", strokeWidth: 1.6 })
            }
          ),
          hasArabicVersion ? /* @__PURE__ */ jsxs("div", { className: "relative ml-1", children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: () => {
                  setIsLanguageOpen((open) => !open);
                  setIsMenuOpen(false);
                },
                className: cn(
                  "flex h-11 min-w-[70px] items-center justify-center gap-1.5 rounded-full px-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burnt-orange",
                  colorTheme === "light" ? "bg-black/[0.06] hover:bg-black/[0.1]" : "bg-white/[0.08] hover:bg-white/[0.13]"
                ),
                "aria-label": isArabic ? localeMessages.ar.language.menu : localeMessages.en.language.menu,
                "aria-expanded": isLanguageOpen,
                children: [
                  isArabic ? "AR" : "EN",
                  /* @__PURE__ */ jsx(ChevronDown, { className: cn("h-4 w-4 opacity-60 transition-transform", isLanguageOpen && "rotate-180") })
                ]
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: cn(
              "absolute right-0 top-[calc(100%+0.75rem)] w-36 origin-top-right overflow-hidden rounded-2xl border p-1.5 shadow-2xl transition-all",
              colorTheme === "light" ? "border-black/10 bg-white text-[#171819]" : "border-white/10 bg-[#171922] text-white",
              isLanguageOpen ? "visible scale-100 opacity-100" : "invisible scale-95 opacity-0"
            ), children: [
              /* @__PURE__ */ jsx(Link, { to: englishPath, onClick: () => rememberLocale("en"), className: cn("block rounded-xl px-4 py-2.5 text-sm font-semibold", colorTheme === "light" ? "hover:bg-black/[0.05]" : "hover:bg-white/10", !isArabic && "text-burnt-orange"), children: "English" }),
              /* @__PURE__ */ jsx(Link, { to: arabicPath, onClick: () => rememberLocale("ar"), className: cn("block rounded-xl px-4 py-2.5 text-sm font-semibold", colorTheme === "light" ? "hover:bg-black/[0.05]" : "hover:bg-white/10", isArabic && "text-burnt-orange"), children: isEnglishMercedesModelPath(englishPath) ? "العربية — خدمات مرسيدس" : "العربية" })
            ] })
          ] }) : null
        ] }),
        /* @__PURE__ */ jsxs(
          "nav",
          {
            id: "floating-navigation",
            className: cn(
              "absolute right-0 top-[calc(100%+0.75rem)] w-[258px] max-w-[calc(100vw-1.5rem)] origin-top overflow-hidden rounded-[1.25rem] border p-2.5 shadow-2xl transition-all duration-200 lg:left-1/2 lg:right-auto lg:-translate-x-1/2",
              colorTheme === "light" ? "border-black/10 bg-white text-[#171819] shadow-black/15" : "border-white/10 bg-[#171922] text-white shadow-black/60",
              isMenuOpen ? "visible translate-y-0 scale-100 opacity-100" : "invisible -translate-y-2 scale-[0.98] opacity-0"
            ),
            "aria-label": isArabic ? "التنقل الرئيسي" : "Main navigation",
            children: [
              /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-1", children: links.map((item) => /* @__PURE__ */ jsx(Link, { to: item.href, className: cn("rounded-xl px-3 py-3 text-sm font-semibold opacity-75 transition-colors hover:opacity-100", colorTheme === "light" ? "hover:bg-black/[0.05]" : "hover:bg-white/[0.07]"), children: item.name }, item.href)) }),
              /* @__PURE__ */ jsx("a", { href: whatsappHref, target: "_blank", rel: "noopener noreferrer", className: "mt-2 flex items-center justify-center rounded-2xl bg-burnt-orange px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-orange-600", children: isArabic ? "تواصل معنا" : "Contact Us" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: whatsappHref,
          target: "_blank",
          rel: "noopener noreferrer",
          className: cn(
            "pointer-events-auto hidden min-h-[52px] min-w-[156px] items-center justify-center rounded-full border px-6 text-sm font-semibold shadow-[0_12px_32px_rgba(0,0,0,0.16)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burnt-orange lg:flex",
            colorTheme === "light" ? "border-black/[0.08] bg-white text-[#171819] hover:bg-[#f4f4f2]" : "border-transparent bg-[#171819] text-white hover:bg-[#202122]"
          ),
          children: isArabic ? "تواصل معنا" : "Contact Us"
        }
      )
    ] }) }),
    !isHome && !overlay && /* @__PURE__ */ jsx("div", { className: "h-[98px] lg:h-[126px]" })
  ] });
};
const quickLinks = [
  { label: "About Us", arabicLabel: "من نحن", to: "/about" },
  { label: "All Services", arabicLabel: "جميع الخدمات", to: "/services" },
  { label: "Brands We Service", arabicLabel: "العلامات التي نخدمها", to: "/brands" },
  { label: "Performance Tuning", arabicLabel: "تطوير الأداء", to: "/tuning" },
  { label: "VRX", arabicLabel: "VRX", to: "/vrx" },
  { label: "Workshop Guides", arabicLabel: "دليل الورشة", to: "/blog" }
];
const serviceLinks = [
  { label: "Mercedes Repair", arabicLabel: "إصلاح مرسيدس", to: "/brands/mercedes-benz-service-dubai" },
  { label: "Diagnostics & Programming", arabicLabel: "التشخيص والبرمجة", to: "/services/car-diagnostics-dubai" },
  { label: "Oil Change Service", arabicLabel: "تغيير الزيت", to: "/services/oil-change-dubai" },
  { label: "Transmission Repair", arabicLabel: "إصلاح ناقل الحركة", to: "/services/transmission-repair-dubai" },
  { label: "Brake Repair", arabicLabel: "إصلاح الفرامل", to: "/services/brake-repair-dubai" },
  { label: "Performance Tuning", arabicLabel: "تطوير الأداء", to: "/tuning" }
];
const Footer = () => {
  const { isArabic } = useLocale();
  const copy = isArabic ? arHome.footer : null;
  const linkClass = "block py-1.5 text-sm text-white/45 transition-colors hover:text-white";
  return /* @__PURE__ */ jsx("footer", { className: "border-t border-white/[0.08] bg-[#0b0c0d] py-16 sm:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-[1.4fr_0.8fr_1fr_1.1fr] xl:gap-12", children: [
      /* @__PURE__ */ jsxs("section", { "aria-label": isArabic ? "مركز ديجي-تك بيرفورمانس" : "DIGI-TEC Performance Center", children: [
        /* @__PURE__ */ jsx(LocalizedLink, { to: "/", className: "inline-block", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: "/lovable-uploads/916789e0-b6fb-43d4-9d52-79899ce5a1c2.png",
            alt: isArabic ? "مركز ديجي-تك بيرفورمانس" : "DIGI-TEC Performance Center",
            width: "429",
            height: "49",
            loading: "lazy",
            decoding: "async",
            className: "h-9 w-auto brightness-110"
          }
        ) }),
        /* @__PURE__ */ jsx("p", { className: "mt-6 max-w-sm text-sm leading-7 text-white/45", children: (copy == null ? void 0 : copy.description) ?? "Independent luxury and performance car workshop in Al Quoz, Dubai. Specialist diagnostics, repair, maintenance and performance upgrades since 2002." }),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "https://maps.google.com/?q=Al+Quoz+Industrial+Area+3+Dubai",
            target: "_blank",
            rel: "noopener noreferrer",
            className: "mt-6 inline-flex text-sm font-medium text-white transition-colors hover:text-burnt-orange",
            children: isArabic ? "احصل على الاتجاهات إلى ورشتنا ←" : "Get directions to our workshop →"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("nav", { "aria-label": isArabic ? "روابط سريعة" : "Quick links", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-sm font-semibold text-off-white", children: isArabic ? "روابط سريعة" : "Quick Links" }),
        /* @__PURE__ */ jsx("div", { className: "mt-5", children: quickLinks.map((link) => /* @__PURE__ */ jsx(LocalizedLink, { to: link.to, className: linkClass, children: isArabic ? link.arabicLabel : link.label }, link.to)) })
      ] }),
      /* @__PURE__ */ jsxs("nav", { "aria-label": isArabic ? "خدمات مختارة" : "Selected services", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-sm font-semibold text-off-white", children: isArabic ? "خدمات مختارة" : "Popular Services" }),
        /* @__PURE__ */ jsx("div", { className: "mt-5", children: serviceLinks.map((link) => /* @__PURE__ */ jsx(LocalizedLink, { to: link.to, className: linkClass, children: isArabic ? link.arabicLabel : link.label }, link.to)) })
      ] }),
      /* @__PURE__ */ jsxs("section", { "aria-label": (copy == null ? void 0 : copy.contact) ?? "Contact", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-sm font-semibold text-off-white", children: (copy == null ? void 0 : copy.contact) ?? "Contact" }),
        /* @__PURE__ */ jsxs("div", { className: "mt-5 space-y-5 text-sm leading-6 text-white/45", children: [
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("span", { className: "block font-semibold text-off-white", children: isArabic ? "ورشة دبي" : "Dubai Workshop" }),
            isArabic ? /* @__PURE__ */ jsxs(Fragment, { children: [
              "المستودعات 11–15، منطقة القوز الصناعية 3",
              /* @__PURE__ */ jsx("br", {}),
              "دبي، الإمارات"
            ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              "Warehouses 11–15, Al Quoz Industrial Area 3",
              /* @__PURE__ */ jsx("br", {}),
              "Dubai, UAE"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("a", { href: "tel:+97143402223", className: "font-semibold text-off-white transition-colors hover:text-burnt-orange", children: "+971 4 340 2223" }),
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("a", { href: "mailto:info@digitecme.com", className: "transition-colors hover:text-burnt-orange", children: "info@digitecme.com" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-5 flex gap-3", "aria-label": isArabic ? "حسابات التواصل الاجتماعي" : "Social media", children: [
          /* @__PURE__ */ jsx("a", { href: "https://www.instagram.com/digi_tec/", target: "_blank", rel: "noopener noreferrer", className: "text-xs font-semibold text-white/45 transition-colors hover:text-white", "aria-label": isArabic ? "ديجي-تك على إنستغرام" : "DIGI-TEC on Instagram", children: "Instagram" }),
          /* @__PURE__ */ jsx("a", { href: "https://www.facebook.com/Digitecme/", target: "_blank", rel: "noopener noreferrer", className: "text-xs font-semibold text-white/45 transition-colors hover:text-white", "aria-label": isArabic ? "ديجي-تك على فيسبوك" : "DIGI-TEC on Facebook", children: "Facebook" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-14 flex flex-col gap-4 border-t border-white/[0.08] pt-7 text-xs text-white/30 md:flex-row md:items-center md:justify-between", children: [
      /* @__PURE__ */ jsx("p", { children: isArabic ? /* @__PURE__ */ jsxs(Fragment, { children: [
        "© 2026 مركز ",
        /* @__PURE__ */ jsx("span", { className: "text-burnt-orange", children: "ديجي-تك" }),
        " بيرفورمانس. ",
        copy == null ? void 0 : copy.rights
      ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        "© 2026 ",
        /* @__PURE__ */ jsx("span", { className: "text-burnt-orange", children: "D" }),
        "IGI-TEC Performance Center. All rights reserved."
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-x-5 gap-y-2", children: [
        /* @__PURE__ */ jsx(LocalizedLink, { to: "/faq", className: "transition-colors hover:text-burnt-orange", children: isArabic ? "الأسئلة الشائعة" : "FAQ" }),
        /* @__PURE__ */ jsx(LocalizedLink, { to: "/sitemap", className: "transition-colors hover:text-burnt-orange", children: (copy == null ? void 0 : copy.sitemap) ?? "Sitemap" }),
        /* @__PURE__ */ jsx("a", { href: "/privacy-policy.pdf", target: "_blank", rel: "noopener noreferrer", className: "transition-colors hover:text-burnt-orange", children: (copy == null ? void 0 : copy.privacy) ?? "Privacy Policy" })
      ] })
    ] })
  ] }) });
};
export {
  Footer as F,
  Header as H,
  arHome as a,
  arServiceCards as b,
  arFaqCategories as c
};
