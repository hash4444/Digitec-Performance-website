import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import React__default from "react";
import { u as useLocale, p as pageGraph, b as buildWebPage, a as buildBreadcrumb, s as services, g as englishOnlyServices, h as arServiceCards, e as useSeo, H as Header, A as AnswerBlock, T as TrustBar, i as arHome, L as LocalizedLink, F as FinalCTA, f as Footer } from "../entry-server.js";
import { P as PageIntro } from "./PageIntro-BZbZzflk.js";
import "node:stream";
import "react-dom/server";
import "react-router-dom/server.mjs";
import "@radix-ui/react-toast";
import "class-variance-authority";
import "lucide-react";
import "clsx";
import "tailwind-merge";
import "next-themes";
import "sonner";
import "@radix-ui/react-tooltip";
import "@tanstack/react-query";
import "react-router-dom";
import "@radix-ui/react-accordion";
const categories = [
  "Core Mechanical Services",
  "Diagnostics & Electrical",
  "Comfort Systems",
  "Body & Visual Work"
];
const categoryHeadings = {
  "Core Mechanical Services": "Core Mechanical Services in Dubai",
  "Diagnostics & Electrical": "Diagnostics & Electrical Services in Dubai",
  "Comfort Systems": "Car Comfort Systems in Dubai",
  "Body & Visual Work": "Car Body, Paint & Visual Services in Dubai"
};
const Services = () => {
  const { isArabic } = useLocale();
  const url = `https://digitecme.com${isArabic ? "/ar" : ""}/services`;
  const servicesGraph = React__default.useMemo(
    () => pageGraph([
      buildWebPage({
        url,
        name: isArabic ? "خدمات صيانة وإصلاح السيارات في دبي | ديجي-تك" : "All Services | DIGI-TEC Performance Center Dubai",
        description: isArabic ? "دليل خدمات السيارات في دبي من الإصلاح الميكانيكي والتشخيص إلى الهيكل وحماية الطلاء لدى مركز ديجي-تك." : "Full catalog of automotive services in Dubai — mechanical repair, diagnostics, body work, and paint protection at DIGI-TEC Performance Center.",
        type: "CollectionPage",
        breadcrumbId: `${url}#breadcrumb`,
        mainEntityId: `${url}#servicelist`
      }),
      buildBreadcrumb(url, [
        { name: isArabic ? "الرئيسية" : "Home", url: `https://digitecme.com${isArabic ? "/ar" : "/"}` },
        { name: isArabic ? "الخدمات" : "Services", url }
      ]),
      {
        "@type": "ItemList",
        "@id": `${url}#servicelist`,
        name: isArabic ? "الخدمات التي يقدمها مركز ديجي-تك" : "Services offered by Digitec Performance Center",
        numberOfItems: [...services, ...isArabic ? [] : englishOnlyServices].filter((s) => s.slug !== "mercedes-repair-dubai").length,
        itemListElement: [...services, ...isArabic ? [] : englishOnlyServices].filter((s) => s.slug !== "mercedes-repair-dubai").map((s, i) => {
          var _a;
          return {
            "@type": "ListItem",
            position: i + 1,
            url: `https://digitecme.com${isArabic ? "/ar" : ""}/services/${s.slug}`,
            name: isArabic ? ((_a = arServiceCards[s.slug]) == null ? void 0 : _a.title) ?? s.title : s.title
          };
        })
      }
    ]),
    [isArabic, url]
  );
  useSeo({
    title: isArabic ? "خدمات صيانة وإصلاح السيارات في دبي | ديجي-تك" : "All Services | DIGI-TEC Performance Center Dubai",
    description: isArabic ? "اكتشف خدمات ديجي-تك لصيانة وإصلاح السيارات في دبي، من الميكانيكا والتشخيص إلى كهرباء السيارات والتكييف والهيكل وحماية الطلاء." : "Explore our full range of automotive services in Dubai — from mechanical repair and diagnostics to body work and paint protection. DIGI-TEC Performance Center.",
    canonical: url,
    jsonLd: servicesGraph
  });
  return /* @__PURE__ */ jsxs("div", { className: "site-page min-h-screen bg-black text-off-white", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsx(
      PageIntro,
      {
        eyebrow: isArabic ? "ما نقدمه" : "What We Offer",
        title: isArabic ? "خدماتنا" : "Our Services",
        description: isArabic ? "يعرض مركز ديجي-تك خدمات صيانة وفحص وإصلاح وبرمجة وأعمال هيكل وعناية بالسيارات من ورشته المستقلة في القوز، دبي. يمكن لمالكي السيارات الأوروبية والفاخرة وبعض السيارات الكهربائية واليومية إرسال رقم الهيكل وتفاصيل العطل أو الخدمة المطلوبة للتأكد من التغطية وتحديد نطاق الفحص المناسب قبل الموعد." : "Digi-Tec lists vehicle maintenance, inspection, repair, programming, bodywork and car-care services from its independent workshop in Al Quoz, Dubai. Owners of European, luxury, selected electric and everyday vehicles can share the VIN and requested service or symptoms so coverage and the appropriate inspection scope can be confirmed before an appointment."
      }
    ),
    /* @__PURE__ */ jsx(
      AnswerBlock,
      {
        question: isArabic ? "ما الخدمات التي يقدمها ديجي-تك في دبي؟" : "What car services does Digi-Tec offer in Dubai?",
        answer: isArabic ? "يقدم ديجي-تك في القوز، دبي الصيانة الدورية وتغيير الزيت، والتشخيص الإلكتروني، وإصلاح المحرك وناقل الحركة، والفرامل والتعليق والتوجيه، وإصلاح التكييف والكهرباء، والبرمجة والتكويد، وأعمال الهيكل والطلاء، وحماية الطلاء والسيراميك، وتطوير الأداء. يشمل ذلك مرسيدس وبي إم دبليو وأودي وبورشه والسيارات الفاخرة والكهربائية." : "Digi-Tec in Al Quoz, Dubai covers scheduled servicing and oil changes, electronic diagnostics, engine and transmission repair, brakes, suspension and steering, air conditioning and electrical repair, module coding and programming, body and paint work, paint protection film and ceramic coating, and performance tuning. Brands include Mercedes-Benz, BMW, Audi, Porsche, Ferrari, Lamborghini, Range Rover and luxury electric vehicles.",
        facts: isArabic ? [
          "صفحات منفصلة للعلامات وفئات الإصلاح المعروضة",
          "تُحدد خيارات القطع حسب رقم الهيكل والإصلاح وعرض السعر المتفق عليه",
          "تُناقش نتائج الفحص ونطاق العمل المقترح قبل الموافقة"
        ] : [
          "Separate pages for the listed brands and repair categories",
          "Parts options are specified for the VIN, repair and agreed quotation",
          "Inspection findings and the proposed work scope are discussed before approval"
        ]
      }
    ),
    /* @__PURE__ */ jsx(TrustBar, { className: "mb-8 sm:mb-16" }),
    /* @__PURE__ */ jsx("section", { className: "pb-16 sm:pb-28", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-[90rem] space-y-14 px-5 sm:space-y-20 sm:px-8 lg:px-12", children: categories.map((cat) => {
      const items = [...services, ...isArabic ? [] : englishOnlyServices].filter((s) => s.category === cat && s.slug !== "mercedes-repair-dubai");
      if (items.length === 0) return null;
      return /* @__PURE__ */ jsxs("div", { className: "border-t border-white/[0.09] pt-6 sm:pt-8", children: [
        /* @__PURE__ */ jsx("h2", { className: "mb-6 max-w-2xl text-2xl font-semibold tracking-[-0.03em] text-white sm:mb-9 sm:text-3xl", children: isArabic ? arHome.services.categories[cat] : categoryHeadings[cat] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-x-3 gap-y-7 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8", children: items.map((s) => {
          var _a, _b, _c;
          return /* @__PURE__ */ jsxs(
            LocalizedLink,
            {
              to: `/services/${s.slug}`,
              className: "group block overflow-hidden",
              children: [
                /* @__PURE__ */ jsx("div", { className: "aspect-[4/3] overflow-hidden rounded-lg bg-white/[0.03]", children: /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: s.image,
                    alt: isArabic ? ((_a = arServiceCards[s.slug]) == null ? void 0 : _a.title) ?? s.title : s.title,
                    className: "h-full w-full object-cover transition duration-500 group-hover:scale-[1.025] group-hover:opacity-90",
                    loading: "lazy",
                    onError: (e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop";
                    }
                  }
                ) }),
                /* @__PURE__ */ jsxs("div", { className: "pt-3 sm:pt-4", children: [
                  /* @__PURE__ */ jsx("h3", { className: "line-clamp-2 text-sm font-semibold leading-tight tracking-[-0.01em] transition-colors group-hover:text-burnt-orange sm:text-base lg:text-lg", children: isArabic ? ((_b = arServiceCards[s.slug]) == null ? void 0 : _b.title) ?? s.title : s.title }),
                  /* @__PURE__ */ jsx("p", { className: "mt-1.5 line-clamp-2 text-xs leading-relaxed text-white/45 sm:text-sm", children: isArabic ? ((_c = arServiceCards[s.slug]) == null ? void 0 : _c.description) ?? s.description : s.description })
                ] })
              ]
            },
            s.slug
          );
        }) })
      ] }, cat);
    }) }) }),
    /* @__PURE__ */ jsx(FinalCTA, {}),
    /* @__PURE__ */ jsx("section", { className: "border-t border-white/10 bg-black py-12 sm:py-16", "aria-labelledby": "local-garage-services", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-12", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-7 max-w-2xl", children: [
        /* @__PURE__ */ jsx("p", { className: "eyebrow mb-3", children: isArabic ? "طرق أخرى لمساعدتك" : "More Ways We Can Help" }),
        /* @__PURE__ */ jsx("h2", { id: "local-garage-services", className: "text-2xl font-semibold tracking-[-0.03em] sm:text-4xl", children: isArabic ? /* @__PURE__ */ jsxs(Fragment, { children: [
          "اختر ",
          /* @__PURE__ */ jsx("span", { className: "text-burnt-orange", children: "دعم الورشة المناسب" })
        ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          "Find the right ",
          /* @__PURE__ */ jsx("span", { className: "text-burnt-orange", children: "workshop support" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid gap-4 md:grid-cols-3", children: [
        { href: "/services/garage-near-me-dubai", title: isArabic ? "ورشة سيارات قريبة مني في دبي" : "Garage Near Me in Dubai", text: isArabic ? "اعثر على ديجي-تك في القوز للفحص والتشخيص والصيانة والإصلاح." : "Find DIGI-TEC in Al Quoz for inspections, diagnostics, maintenance and repair support." },
        { href: "/services/roadside-assistance-dubai", title: isArabic ? "المساعدة على الطريق" : "Roadside Assistance", text: isArabic ? "احصل على إرشاد آمن وتنسيق النقل وفحص لاحق داخل الورشة." : "Get safe next-step guidance, recovery coordination and a follow-up workshop inspection." },
        { href: "/services/car-garage-dubai", title: isArabic ? "كراج سيارات في دبي" : "Car Garage Dubai", text: isArabic ? "خدمات متكاملة للصيانة والإصلاح والتشخيص وسيارات الأداء." : "Explore our complete garage support for servicing, repairs, diagnostics and performance cars." }
      ].map((page) => /* @__PURE__ */ jsxs(LocalizedLink, { to: page.href, className: "group border-t border-white/[0.1] py-6 transition-colors hover:border-burnt-orange/60", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold tracking-[-0.02em] group-hover:text-burnt-orange", children: page.title }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 max-w-sm text-sm leading-relaxed text-white/48", children: page.text }),
        /* @__PURE__ */ jsx("span", { className: "mt-5 inline-block text-sm font-medium text-burnt-orange", children: isArabic ? "استكشف الخدمة ←" : "Explore service →" })
      ] }, page.href)) })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
export {
  Services as default
};
