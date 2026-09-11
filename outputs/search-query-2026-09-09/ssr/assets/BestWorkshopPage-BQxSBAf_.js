import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import React__default from "react";
import { useLocation, Navigate } from "react-router-dom";
import { u as useLocale, bb as getBestWorkshopPage, a as buildBreadcrumb, S as SITE_URL, b as buildWebPage, d as buildFAQ, c as buildService, p as pageGraph, e as useSeo, bc as bestWorkshopPages, H as Header, L as LocalizedLink, C as CtaAssurance, G as Accordion, I as AccordionItem, J as AccordionTrigger, K as AccordionContent, f as Footer } from "../entry-server.js";
import { MapPin, MessageCircle, Phone, ArrowRight, CheckCircle2 } from "lucide-react";
import { l as localizeBestWorkshopPageToArabic } from "./ar-best-workshop-BMuRYA1p.js";
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
const BestWorkshopPage = () => {
  const { isArabic, localizedPath } = useLocale();
  const { pathname } = useLocation();
  const slug = pathname.replace(/^\/ar(?=\/|$)/, "").replace(/^\/+/, "").split("/")[0];
  const sourcePage = slug ? getBestWorkshopPage(slug) : void 0;
  const page = sourcePage && isArabic ? localizeBestWorkshopPageToArabic(sourcePage) : sourcePage;
  const url = `${SITE_URL}${isArabic ? "/ar" : ""}/${slug}`;
  const jsonLd = React__default.useMemo(() => {
    if (!page) return void 0;
    const breadcrumb = buildBreadcrumb(url, [
      { name: isArabic ? "الرئيسية" : "Home", url: `${SITE_URL}${isArabic ? "/ar" : "/"}` },
      { name: page.h1, url }
    ]);
    const webPage = buildWebPage({
      url,
      name: page.h1,
      description: page.metaDescription,
      breadcrumbId: `${url}#breadcrumb`,
      mainEntityId: `${url}#service`,
      primaryImage: page.brandLogo
    });
    const faq = buildFAQ(url, page.faqs.map((f) => ({ question: f.q, answer: f.a })));
    const service = buildService({
      url,
      name: page.h1,
      serviceType: `${page.brandKeyword ?? page.brand ?? "Luxury Car"} Workshop`,
      description: page.metaDescription,
      image: page.brandLogo,
      brand: page.brandKeyword ?? page.brand,
      offers: page.brandKeyword === "Range Rover" ? ["Range Rover diagnostics", "Range Rover air suspension repair", "Range Rover service", "Range Rover transmission repair"] : void 0,
      areaServed: ["Dubai"]
    });
    return pageGraph([webPage, breadcrumb, service, ...faq ? [faq] : []]);
  }, [isArabic, page, url]);
  useSeo({
    title: page ? page.metaTitle : isArabic ? "ورشة سيارات مستقلة في دبي | ديجي-تك" : "Independent Car Workshop Dubai | Digi-Tec",
    description: page ? page.metaDescription : isArabic ? "ورشة سيارات مستقلة ومتخصصة في دبي." : "Independent European and luxury car workshop in Dubai.",
    canonical: page ? url : `${SITE_URL}/`,
    noindex: !page,
    jsonLd
  });
  if (!page) return /* @__PURE__ */ jsx(Navigate, { to: localizedPath("/"), replace: true });
  const whatsappHref = `https://wa.me/97143402223?text=${encodeURIComponent(
    isArabic ? `مرحباً ديجي-تك، أبحث عن ورشة متخصصة في ${page.brand ?? "السيارات"} بدبي. هل يمكنكم مساعدتي؟` : `Hi Digi-Tec, I'm looking for an independent ${page.brand ?? "car"} workshop in Dubai. Can you help?`
  )}`;
  const otherPages = bestWorkshopPages.filter((p) => p.slug !== page.slug).map((item) => isArabic ? localizeBestWorkshopPageToArabic(item) : item);
  return /* @__PURE__ */ jsxs("div", { className: "site-page min-h-screen bg-black text-off-white", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsx("nav", { "aria-label": isArabic ? "مسار التنقل" : "Breadcrumb", className: "max-w-7xl mx-auto px-4 sm:px-6 pt-6 text-xs sm:text-sm text-gray-400", children: /* @__PURE__ */ jsxs("ol", { className: "flex flex-wrap items-center gap-2", children: [
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(LocalizedLink, { to: "/", className: "hover:text-burnt-orange", children: isArabic ? "الرئيسية" : "Home" }) }),
      /* @__PURE__ */ jsx("li", { "aria-hidden": "true", children: "/" }),
      /* @__PURE__ */ jsx("li", { className: "text-off-white font-semibold", children: page.h1 })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "relative overflow-hidden border-b border-white/[0.08] bg-[#101113]", children: /* @__PURE__ */ jsx("div", { className: "relative z-10 mx-auto max-w-[90rem] px-5 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-24", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl", children: [
      page.brandLogo && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-6", children: [
        /* @__PURE__ */ jsx("div", { className: "flex h-14 w-20 items-center justify-center bg-white/[0.94] p-2 sm:h-16 sm:w-24", children: /* @__PURE__ */ jsx("img", { src: page.brandLogo, alt: isArabic ? `شعار ${page.brand}` : `${page.brand} logo`, className: "w-full h-full object-contain" }) }),
        /* @__PURE__ */ jsx("span", { className: "home-kicker", children: isArabic ? `متخصصون في ${page.brand}` : `${page.brand} Specialists` })
      ] }),
      /* @__PURE__ */ jsx("h1", { className: "mb-6 max-w-4xl text-[clamp(2.75rem,5vw,5.25rem)] font-semibold leading-[0.98] tracking-[-0.05em]", children: page.h1 }),
      /* @__PURE__ */ jsx("p", { className: "mb-7 max-w-3xl border-l border-burnt-orange pl-5 text-base leading-8 text-white/62 sm:text-lg", children: page.directAnswer }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-wrap items-center gap-4 sm:gap-6 mb-6 sm:mb-8 text-sm sm:text-base text-gray-300", children: /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(MapPin, { className: "w-4 h-4 text-burnt-orange" }),
        " ",
        isArabic ? "القوز، دبي" : "Al Quoz, Dubai"
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-3 sm:gap-4", children: [
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: whatsappHref,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "btn-primary",
            children: [
              /* @__PURE__ */ jsx(MessageCircle, { className: "w-5 h-5" }),
              isArabic ? "تواصل معنا عبر واتساب" : "WhatsApp Us"
            ]
          }
        ),
        /* @__PURE__ */ jsxs("a", { href: "tel:+97143402223", className: "btn-secondary", children: [
          /* @__PURE__ */ jsx(Phone, { className: "w-5 h-5" }),
          isArabic ? "اتصل على ‎+971 4 340 2223" : "Call +971 4 340 2223"
        ] })
      ] }),
      /* @__PURE__ */ jsx(CtaAssurance, { className: "mt-4", align: "start" })
    ] }) }) }),
    page.brandKeyword === "Range Rover" && /* @__PURE__ */ jsx("section", { className: "py-12 sm:py-16 bg-gradient-to-br from-charcoal/40 to-black border-t border-white/5", children: /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto px-4 sm:px-6", children: /* @__PURE__ */ jsxs("div", { className: "card-premium rounded-2xl p-6 sm:p-8", children: [
      /* @__PURE__ */ jsx("span", { className: "text-burnt-orange text-xs font-bold uppercase tracking-widest", children: "Range Rover specialist hub" }),
      /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-4xl font-black mt-3", children: "Need Range Rover Repair or Service in Dubai?" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-300 text-sm sm:text-base leading-relaxed mt-4", children: "Explore Digi-Tec's main Range Rover workshop page for model coverage, common faults, JLR diagnostics and dedicated service pages for air suspension, transmission, AC, brakes, electrical systems and scheduled maintenance." }),
      /* @__PURE__ */ jsxs(LocalizedLink, { to: "/brands/range-rover-service-dubai", className: "btn-primary mt-6", children: [
        "Visit Our Range Rover Workshop Page ",
        /* @__PURE__ */ jsx(ArrowRight, { className: "w-5 h-5" })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "py-12 sm:py-16 bg-black border-t border-white/5", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-4xl font-black mb-6 sm:mb-8", children: isArabic ? /* @__PURE__ */ jsxs(Fragment, { children: [
        "معلومات عن ",
        /* @__PURE__ */ jsx("span", { className: "text-burnt-orange", children: "ديجي-تك" })
      ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        "About the ",
        /* @__PURE__ */ jsx("span", { className: "text-burnt-orange", children: "Workshop" })
      ] }) }),
      /* @__PURE__ */ jsx("ul", { className: "grid sm:grid-cols-2 gap-3 sm:gap-4", children: page.whyList.map((item, i) => /* @__PURE__ */ jsxs("li", { className: "card-premium flex items-start gap-3 rounded-2xl p-4 sm:p-5", children: [
        /* @__PURE__ */ jsx(CheckCircle2, { className: "w-5 h-5 text-burnt-orange flex-shrink-0 mt-0.5" }),
        /* @__PURE__ */ jsx("span", { className: "text-gray-300 text-sm sm:text-base leading-relaxed", children: item })
      ] }, i)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-12 sm:py-16 bg-gradient-to-br from-charcoal/40 to-black border-t border-white/5", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-4xl font-black mb-3", children: isArabic ? /* @__PURE__ */ jsxs(Fragment, { children: [
        "معايير اختيار ",
        /* @__PURE__ */ jsxs("span", { className: "text-burnt-orange", children: [
          "ورشة ",
          page.brandKeyword ?? "سيارات"
        ] })
      ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        "What to Compare in a ",
        /* @__PURE__ */ jsxs("span", { className: "text-burnt-orange", children: [
          page.brandKeyword ?? "Car",
          " Workshop"
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm sm:text-base mb-6 sm:mb-8", children: isArabic ? "معايير عملية يمكن مقارنتها قبل حجز الفحص أو الموافقة على العمل." : "Practical criteria to compare before booking an inspection or approving work." }),
      /* @__PURE__ */ jsx("div", { className: "overflow-hidden rounded-2xl border border-white/10", children: /* @__PURE__ */ jsxs("table", { className: `w-full ${isArabic ? "text-right" : "text-left"}`, children: [
        /* @__PURE__ */ jsx("thead", { className: "bg-charcoal/60 text-off-white text-sm sm:text-base", children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { className: "px-4 sm:px-6 py-3 sm:py-4 font-bold", children: isArabic ? "المعيار" : "Criterion" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 sm:px-6 py-3 sm:py-4 font-bold", children: "Digi-Tec" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { className: "bg-black/50 text-sm sm:text-base", children: page.criteria.map((c, i) => /* @__PURE__ */ jsxs("tr", { className: "border-t border-white/5", children: [
          /* @__PURE__ */ jsx("td", { className: "px-4 sm:px-6 py-3 sm:py-4 text-gray-300", children: c.criterion }),
          /* @__PURE__ */ jsx("td", { className: "px-4 sm:px-6 py-3 sm:py-4 text-off-white font-semibold", children: c.digitec })
        ] }, i)) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-12 sm:py-16 bg-black border-t border-white/5", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto px-4 sm:px-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-4xl font-black text-center mb-8 sm:mb-10", children: isArabic ? /* @__PURE__ */ jsxs(Fragment, { children: [
        "الأسئلة الشائعة عن ورشة ",
        /* @__PURE__ */ jsxs("span", { className: "text-burnt-orange", children: [
          page.brandKeyword ?? "السيارات",
          " في دبي"
        ] })
      ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        page.brandKeyword ?? "Workshop",
        " in Dubai ",
        /* @__PURE__ */ jsx("span", { className: "text-burnt-orange", children: "FAQs" })
      ] }) }),
      /* @__PURE__ */ jsx(Accordion, { type: "single", collapsible: true, className: "space-y-3", children: page.faqs.map((f, i) => /* @__PURE__ */ jsxs(AccordionItem, { value: `q-${i}`, className: "bg-white/[0.03] border border-white/10 rounded-2xl px-5 sm:px-6 data-[state=open]:border-burnt-orange/40", children: [
        /* @__PURE__ */ jsx(AccordionTrigger, { className: `${isArabic ? "text-right" : "text-left"} text-off-white font-semibold text-base sm:text-lg hover:no-underline py-5`, children: f.q }),
        /* @__PURE__ */ jsx(AccordionContent, { className: "text-gray-300 text-sm sm:text-base leading-relaxed pb-5", children: f.a })
      ] }, i)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-12 sm:py-16 bg-gradient-to-br from-charcoal/40 to-black border-t border-white/5", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-4xl font-black mb-6 sm:mb-8", children: isArabic ? /* @__PURE__ */ jsxs(Fragment, { children: [
        "أدلة الورش حسب ",
        /* @__PURE__ */ jsx("span", { className: "text-burnt-orange", children: "العلامة" })
      ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        "Workshop Guides by ",
        /* @__PURE__ */ jsx("span", { className: "text-burnt-orange", children: "Brand" })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4", children: otherPages.map((p) => /* @__PURE__ */ jsxs(
        LocalizedLink,
        {
          to: `/${p.slug}`,
          className: "card-premium group flex flex-col justify-between rounded-2xl p-4 sm:p-5 transition-all duration-300",
          children: [
            /* @__PURE__ */ jsx("span", { className: "text-off-white font-bold text-sm sm:text-base leading-tight group-hover:text-burnt-orange", children: p.h1 }),
            /* @__PURE__ */ jsx(ArrowRight, { className: `w-4 h-4 text-burnt-orange mt-3 ${isArabic ? "rotate-180" : ""}` })
          ]
        },
        p.slug
      )) })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
export {
  BestWorkshopPage as default
};
