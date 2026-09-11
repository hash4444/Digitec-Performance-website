import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import React__default from "react";
import { useParams, Navigate } from "react-router-dom";
import { u as useLocale, B as getServiceBySlug, a as buildBreadcrumb, b as buildWebPage, D as detectBrand, c as buildService, d as buildFAQ, p as pageGraph, e as useSeo, H as Header, L as LocalizedLink, f as Footer, E as allServices, G as Accordion, I as AccordionItem, J as AccordionTrigger, K as AccordionContent, r as brands, F as FinalCTA } from "../entry-server.js";
import { ChevronRight, Check, MessageCircle, Phone } from "lucide-react";
import { l as localizeServiceToArabic } from "./ar-services-FRxiHbXW.js";
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
  const sourceService = slug && !newSlug && !externalRedirect ? getServiceBySlug(slug) : void 0;
  const service = sourceService && isArabic ? localizeServiceToArabic(sourceService) : sourceService;
  const servicePath = service ? canonicalPath ?? `/services/${service.slug}` : void 0;
  const url = servicePath ? `https://digitecme.com${isArabic ? "/ar" : ""}${servicePath}` : void 0;
  const serviceJsonLd = React__default.useMemo(() => {
    if (!service || !url) return void 0;
    const schemaDescription = isArabic ? `${service.title} لدى مركز ديجي-تك بيرفورمانس في القوز، دبي. تواصل مع الورشة لترتيب الفحص أو الخدمة المناسبة.` : `${service.title} at Digi-Tec Performance Center in Al Quoz, Dubai. Contact the workshop to arrange the appropriate inspection or service.`;
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
    const faq = service.faqs && service.faqs.length > 0 ? buildFAQ(url, service.faqs) : null;
    return pageGraph([webPage, breadcrumb, svc, ...faq ? [faq] : []]);
  }, [service, brandPath, isArabic, url]);
  useSeo({
    title: (service == null ? void 0 : service.metaTitle) || (service ? `${service.seoKeyword} | DIGI-TEC Performance Center` : "Service Not Found | DIGI-TEC"),
    description: (service == null ? void 0 : service.metaDescription) || (service ? `${service.intro.slice(0, 155)}…` : ""),
    canonical: url,
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
  const related = allServices.filter((s) => s.category === (sourceService == null ? void 0 : sourceService.category) && s.slug !== service.slug).filter((s) => isMercedes ? s.slug.startsWith("mercedes-") : !s.slug.startsWith("mercedes-")).slice(0, 3);
  return /* @__PURE__ */ jsxs("div", { className: "site-page min-h-screen bg-black text-off-white", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsxs("section", { className: "theme-dark-section relative flex min-h-[56vh] items-end overflow-hidden border-b border-white/[0.08] pb-14 sm:min-h-[62vh] sm:pb-20", children: [
      /* @__PURE__ */ jsxs("div", { className: "absolute inset-0", children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: service.image,
            alt: service.title,
            className: "w-full h-full object-cover",
            onError: (e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&h=600&fit=crop";
            }
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-[#101113] via-black/65 to-black/20" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "relative z-10 mx-auto w-full max-w-[90rem] px-5 sm:px-8 lg:px-12", children: [
        /* @__PURE__ */ jsxs("nav", { className: "mb-6 flex items-center gap-2 text-xs text-white/48 sm:text-sm", children: [
          /* @__PURE__ */ jsx(LocalizedLink, { to: "/", className: "hover:text-burnt-orange transition-colors", children: isArabic ? "الرئيسية" : "Home" }),
          /* @__PURE__ */ jsx(ChevronRight, { className: `w-4 h-4 ${isArabic ? "rotate-180" : ""}` }),
          /* @__PURE__ */ jsx(LocalizedLink, { to: brandPath ?? "/services", className: "hover:text-burnt-orange transition-colors", children: brandPath ? "Mercedes-Benz" : isArabic ? "الخدمات" : "Services" }),
          /* @__PURE__ */ jsx(ChevronRight, { className: `w-4 h-4 ${isArabic ? "rotate-180" : ""}` }),
          /* @__PURE__ */ jsx("span", { className: "text-burnt-orange", children: service.title })
        ] }),
        /* @__PURE__ */ jsx("span", { className: "home-kicker mb-4 block", children: service.category }),
        /* @__PURE__ */ jsx("h1", { className: "mb-5 max-w-4xl text-[clamp(2.75rem,5vw,5.25rem)] font-semibold leading-[0.98] tracking-[-0.05em]", children: service.title }),
        /* @__PURE__ */ jsx("p", { className: "max-w-2xl text-base leading-7 text-white/64 sm:text-lg", children: service.description })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "py-16 sm:py-24", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-6xl px-5 sm:px-8", children: /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-3 gap-12", children: [
      /* @__PURE__ */ jsxs("div", { className: "md:col-span-2 space-y-12", children: [
        /* @__PURE__ */ jsxs("div", { id: service.slug === "paint-protection-dubai" ? "paint-correction" : void 0, children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-3xl font-bold mb-5", children: isArabic ? "نظرة عامة" : "Overview" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-300 leading-relaxed text-lg", children: service.intro }),
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
                /* @__PURE__ */ jsx(AccordionContent, { className: "text-gray-300 text-base leading-relaxed pb-5", children: faq.answer })
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
            isArabic ? "توضيح القطع والسوائل المقترحة قبل الموافقة" : "Proposed parts and fluids explained before approval"
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-burnt-orange mt-1", children: "✓" }),
            isArabic ? "فحص وتشخيص يناسب السيارة" : "Vehicle-specific inspection and diagnostics"
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
              href: "https://wa.me/97143402223",
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
        const s = isArabic ? localizeServiceToArabic(sourceRelated) : sourceRelated;
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
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm sm:text-base", children: isArabic ? `نقدم ${(service == null ? void 0 : service.title) ?? "هذه الخدمة"} للعلامات التالية.` : `Every ${(service == null ? void 0 : service.title.toLowerCase()) ?? "service"} we perform is available for the marques below.` })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-3", children: brands.map((b) => /* @__PURE__ */ jsxs(
        LocalizedLink,
        {
          to: `/brands/${b.slug}`,
          "aria-label": `${b.name} service Dubai`,
          className: "group flex flex-col items-center gap-2 p-3 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-burnt-orange/40 rounded-2xl transition-all duration-300",
          children: [
            /* @__PURE__ */ jsx("div", { className: "w-12 h-12 sm:w-14 sm:h-14 p-1.5 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300", children: /* @__PURE__ */ jsx("img", { src: b.logo, alt: `${b.name} service Dubai`, loading: "lazy", className: "w-full h-full object-contain" }) }),
            /* @__PURE__ */ jsx("span", { className: "text-[11px] sm:text-xs text-gray-300 group-hover:text-burnt-orange text-center font-medium leading-tight", children: isArabic ? `خدمة ${b.name}` : `${b.name} Service` })
          ]
        },
        b.slug
      )) })
    ] }) }),
    /* @__PURE__ */ jsx(FinalCTA, {}),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
export {
  ServicePage as default
};
