import { jsx, jsxs } from "react/jsx-runtime";
import React__default from "react";
import { useLocation, useParams, Navigate } from "react-router-dom";
import { u as useLocale, a6 as getLocalGaragePage, S as SITE_URL, a as buildBreadcrumb, b as buildWebPage, c as buildService, d as buildFAQ, p as pageGraph, e as useSeo, H as Header, L as LocalizedLink, G as Accordion, I as AccordionItem, J as AccordionTrigger, K as AccordionContent, F as FinalCTA, f as Footer } from "../entry-server.js";
import { MessageCircle, Phone, CheckCircle2, MapPin } from "lucide-react";
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
import "@radix-ui/react-accordion";
const localArabicCopy = {
  "garage-near-me-dubai": { title: "ورشة سيارات قريبة مني في دبي", eyebrow: "ورشة موثوقة في القوز", h2: "ورشة سيارات متخصصة بالقرب منك في دبي", intro: "إذا كنت تبحث عن ورشة سيارات قريبة منك في دبي، يقدم مركز ديجي-تك في القوز خدمات الفحص والتشخيص والصيانة والإصلاح للسيارات الفاخرة واليومية.", detail: "نبدأ بفهم المشكلة وفحص السيارة قبل اقتراح الإصلاح. تشمل إمكاناتنا الصيانة الدورية والميكانيكا والكهرباء والتكييف والفرامل والتعليق والبرمجة، مع شرح واضح للأعمال والأولويات." },
  "roadside-assistance-dubai": { title: "المساعدة على الطريق في دبي", eyebrow: "دعم عند تعطل السيارة", h2: "مساعدة آمنة وخطوة واضحة بعد العطل", intro: "نساعدك على تقييم الخطوة التالية وتنسيق نقل السيارة إلى ورشتنا في القوز عند الحاجة، ثم إجراء فحص لتحديد سبب العطل.", detail: "سلامتك تأتي أولاً. لا تحاول قيادة السيارة إذا كانت ترتفع حرارتها أو فقدت الزيت أو ظهرت مشكلة بالفرامل أو التوجيه. تواصل معنا بتفاصيل الموقع والسيارة والأعراض لنرشدك إلى الخيار المناسب." },
  "car-garage-dubai": { title: "كراج سيارات في دبي", eyebrow: "خدمة سيارات متكاملة", h2: "كراج متكامل للصيانة والإصلاح في دبي", intro: "يوفر مركز ديجي-تك خدمات متكاملة للسيارات في دبي تشمل الصيانة والتشخيص والإصلاحات الميكانيكية والكهربائية والعناية بالأداء.", detail: "تتعامل ورشتنا مع مجموعة واسعة من العلامات والطرازات باستخدام أجهزة حديثة وفنيين متخصصين. نوضح نتيجة الفحص وخيارات القطع والتكلفة قبل بدء العمل." }
};
const LocalGaragePage = () => {
  const { isArabic, localizedPath } = useLocale();
  const { pathname } = useLocation();
  const { slug: routeSlug } = useParams();
  const parts = pathname.split("/").filter(Boolean);
  const slug = routeSlug ?? parts[parts.length - 1];
  const sourcePage = slug ? getLocalGaragePage(slug) : void 0;
  const page = sourcePage && isArabic ? (() => {
    const copy = localArabicCopy[sourcePage.slug];
    if (!copy) return sourcePage;
    const highlights = ["فحص وتشخيص منظم", "فنيون ذوو خبرة", "قطع بالمواصفات المناسبة", "تسعير واضح قبل العمل"];
    const faqs = [
      { question: "أين تقع ديجي-تك؟", answer: "نقع في القوز الصناعية 3، دبي." },
      { question: "كيف أحجز موعداً؟", answer: "اتصل بنا أو أرسل رسالة واتساب تتضمن نوع السيارة ووصف الخدمة أو المشكلة." },
      { question: "هل يتم فحص السيارة قبل الإصلاح؟", answer: "نعم. نبدأ بالفحص المناسب ثم نوضح النتيجة والخطوات المقترحة." }
    ];
    return { ...sourcePage, ...copy, metaTitle: `${copy.title} | مركز ديجي-تك`, metaDescription: `${copy.intro} احجز فحصاً لدى مركز ديجي-تك في القوز.`, highlights: sourcePage.highlights.map((_, i) => highlights[i % highlights.length]), faqs: sourcePage.faqs.map((_, i) => faqs[i % faqs.length]) };
  })() : sourcePage;
  const url = `${SITE_URL}${isArabic ? "/ar" : ""}/services/${(page == null ? void 0 : page.slug) ?? slug ?? ""}`;
  const whatsapp = page ? `https://wa.me/97143402223?text=${encodeURIComponent(isArabic ? `مرحباً ديجي-تك، أحتاج مساعدة بخصوص ${page.title}.` : `Hi DIGI-TEC, I need help with ${page.title.toLowerCase()}.`)}` : "";
  const jsonLd = React__default.useMemo(() => {
    if (!page) return void 0;
    const breadcrumb = buildBreadcrumb(url, [{ name: isArabic ? "الرئيسية" : "Home", url: isArabic ? "/ar" : "/" }, { name: isArabic ? "الخدمات" : "Services", url: isArabic ? "/ar/services" : "/services" }, { name: page.title, url }]);
    const webPage = buildWebPage({ url, name: page.metaTitle, description: page.metaDescription, breadcrumbId: `${url}#breadcrumb`, mainEntityId: `${url}#service` });
    const service = buildService({ url, name: page.title, serviceType: page.title, description: page.metaDescription, areaServed: [isArabic ? "دبي" : "Dubai"] });
    const faq = buildFAQ(url, page.faqs);
    return pageGraph([webPage, breadcrumb, service, ...faq ? [faq] : []]);
  }, [isArabic, page, url]);
  useSeo({
    title: (page == null ? void 0 : page.metaTitle) ?? (isArabic ? "الخدمة غير موجودة | ديجي-تك" : "Service Not Found | DIGI-TEC"),
    description: (page == null ? void 0 : page.metaDescription) ?? "",
    canonical: page ? url : void 0,
    ogTitle: page == null ? void 0 : page.metaTitle,
    ogDescription: page == null ? void 0 : page.metaDescription,
    noindex: !page,
    jsonLd
  });
  if (!page) return /* @__PURE__ */ jsx(Navigate, { to: localizedPath("/services"), replace: true });
  return /* @__PURE__ */ jsxs("div", { className: "site-page min-h-screen bg-black text-off-white", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsx("section", { className: "relative overflow-hidden border-b border-white/[0.08] bg-[#101113]", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-[90rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28", children: [
        /* @__PURE__ */ jsx("p", { className: "eyebrow mb-5", children: page.eyebrow }),
        /* @__PURE__ */ jsx("h1", { className: "max-w-4xl text-[clamp(2.75rem,5.2vw,5.5rem)] font-semibold leading-[0.98] tracking-[-0.05em]", children: page.title }),
        /* @__PURE__ */ jsx("p", { className: "mt-6 max-w-2xl text-base leading-8 text-white/55 sm:text-lg", children: page.intro }),
        /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-col gap-3 sm:flex-row", children: [
          /* @__PURE__ */ jsxs("a", { href: whatsapp, target: "_blank", rel: "noopener noreferrer", className: "btn-primary", children: [
            /* @__PURE__ */ jsx(MessageCircle, { className: "h-5 w-5" }),
            isArabic ? "راسلنا عبر واتساب" : "WhatsApp Us"
          ] }),
          /* @__PURE__ */ jsxs("a", { href: "tel:+97143402223", className: "btn-secondary", children: [
            /* @__PURE__ */ jsx(Phone, { className: "h-5 w-5" }),
            isArabic ? "اتصل على +971 4 340 2223" : "Call +971 4 340 2223"
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("article", { className: "mx-auto max-w-4xl px-5 py-16 sm:px-6 sm:py-20", children: [
        /* @__PURE__ */ jsxs("nav", { "aria-label": isArabic ? "مسار التنقل" : "Breadcrumb", className: "mb-10 text-sm text-gray-400", children: [
          /* @__PURE__ */ jsx(LocalizedLink, { to: "/", className: "hover:text-burnt-orange", children: isArabic ? "الرئيسية" : "Home" }),
          " ",
          /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "/" }),
          " ",
          /* @__PURE__ */ jsxs(LocalizedLink, { to: "/services", className: "hover:text-burnt-orange", children: [
            " ",
            isArabic ? "الخدمات" : "Services"
          ] }),
          " ",
          /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "/" }),
          " ",
          page.title
        ] }),
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-black", children: page.h2 }),
        /* @__PURE__ */ jsx("p", { className: "mt-5 text-lg leading-relaxed text-gray-300", children: page.detail }),
        /* @__PURE__ */ jsx("div", { className: "mt-10 grid gap-4 sm:grid-cols-2", children: page.highlights.map((highlight) => /* @__PURE__ */ jsxs("div", { className: "card-premium flex gap-3 rounded-2xl p-5", children: [
          /* @__PURE__ */ jsx(CheckCircle2, { className: "mt-0.5 h-5 w-5 shrink-0 text-burnt-orange" }),
          /* @__PURE__ */ jsx("span", { className: "text-gray-200", children: highlight })
        ] }, highlight)) }),
        /* @__PURE__ */ jsxs("section", { className: "mt-14 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black", children: isArabic ? "زوروا ديجي-تك في القوز" : "Visit DIGI-TEC in Al Quoz" }),
          /* @__PURE__ */ jsx("p", { className: "mt-4 leading-relaxed text-gray-300", children: isArabic ? "يقع مركز ديجي-تك في القوز الصناعية 3، دبي. تواصل معنا قبل الزيارة لترتيب موعد الفحص أو الخدمة المناسبة." : "DIGI-TEC Performance Center is located in Al Quoz Industrial Area 3, Dubai. Contact the team before you visit so the right inspection time and workshop support can be arranged." }),
          /* @__PURE__ */ jsxs("a", { href: "https://maps.google.com/?q=Al+Quoz+Industrial+Area+3+Dubai", target: "_blank", rel: "noopener noreferrer", className: "btn-secondary mt-5 inline-flex", children: [
            /* @__PURE__ */ jsx(MapPin, { className: "h-5 w-5" }),
            isArabic ? "الاتجاهات" : "Get Directions"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "mt-14", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-black", children: isArabic ? "الأسئلة الشائعة" : "Frequently asked questions" }),
          /* @__PURE__ */ jsx(Accordion, { type: "single", collapsible: true, className: "mt-6 space-y-3", children: page.faqs.map((faq, i) => /* @__PURE__ */ jsxs(AccordionItem, { value: `faq-${i}`, className: "rounded-xl border border-white/10 px-5", children: [
            /* @__PURE__ */ jsx(AccordionTrigger, { className: `${isArabic ? "text-right" : "text-left"} font-bold hover:no-underline`, children: faq.question }),
            /* @__PURE__ */ jsx(AccordionContent, { className: "leading-relaxed text-gray-300", children: faq.answer })
          ] }, faq.question)) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(FinalCTA, {}),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
export {
  LocalGaragePage as default
};
