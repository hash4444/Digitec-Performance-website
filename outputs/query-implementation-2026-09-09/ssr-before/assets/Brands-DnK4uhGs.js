import { jsxs, jsx } from "react/jsx-runtime";
import React__default from "react";
import { u as useLocale, p as pageGraph, r as brands, b as buildWebPage, a as buildBreadcrumb, e as useSeo, H as Header, A as AnswerBlock, L as LocalizedLink, f as Footer } from "../entry-server.js";
import { P as PageIntro } from "./PageIntro-BZbZzflk.js";
import "node:stream";
import "react-dom/server";
import "react-router-dom/server.mjs";
import "react-router-dom";
import "@radix-ui/react-toast";
import "class-variance-authority";
import "lucide-react";
import "clsx";
import "tailwind-merge";
import "next-themes";
import "sonner";
import "@radix-ui/react-tooltip";
import "@tanstack/react-query";
import "@radix-ui/react-accordion";
const Brands = () => {
  const { isArabic } = useLocale();
  const url = `https://digitecme.com${isArabic ? "/ar" : ""}/brands`;
  const jsonLd = React__default.useMemo(
    () => pageGraph([
      buildWebPage({
        url,
        name: isArabic ? "علامات السيارات التي نخدمها | ديجي-تك دبي" : "Luxury Car Brands We Service | DIGI-TEC Dubai",
        description: isArabic ? "استكشف علامات السيارات الفاخرة وعالية الأداء التي نخدمها لدى مركز ديجي-تك في القوز، دبي." : "Explore the luxury and performance car brands serviced at DIGI-TEC Performance Center in Al Quoz, Dubai.",
        type: "CollectionPage",
        breadcrumbId: `${url}#breadcrumb`,
        mainEntityId: `${url}#brandlist`
      }),
      buildBreadcrumb(url, [
        { name: isArabic ? "الرئيسية" : "Home", url: `https://digitecme.com${isArabic ? "/ar" : "/"}` },
        { name: isArabic ? "العلامات" : "Brands", url }
      ]),
      {
        "@type": "ItemList",
        "@id": `${url}#brandlist`,
        name: isArabic ? "علامات السيارات التي يخدمها مركز ديجي-تك" : "Car brands serviced by DIGI-TEC Performance Center",
        numberOfItems: brands.length,
        itemListElement: brands.map((brand, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: isArabic ? `خدمة ${brand.name} في دبي` : `${brand.name} Service Dubai`,
          url: `https://digitecme.com${isArabic ? "/ar" : ""}/brands/${brand.slug}`
        }))
      }
    ]),
    [isArabic, url]
  );
  useSeo({
    title: isArabic ? "علامات السيارات التي نخدمها | ديجي-تك دبي" : "Luxury Car Brands We Service | DIGI-TEC Dubai",
    description: isArabic ? "استكشف علامات السيارات الفاخرة وعالية الأداء التي نخدمها لدى مركز ديجي-تك في القوز، دبي." : "Explore the luxury and performance car brands serviced at DIGI-TEC Performance Center in Al Quoz, Dubai.",
    canonical: url,
    jsonLd
  });
  return /* @__PURE__ */ jsxs("div", { className: "site-page min-h-screen bg-black text-off-white", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsx(
      PageIntro,
      {
        eyebrow: isArabic ? "العلامات التي نخدمها" : "Brands We Serve",
        title: isArabic ? "علامات السيارات الفاخرة وعالية الأداء" : "Luxury & Performance Car Brands",
        description: isArabic ? "اختر علامة سيارتك للاطلاع على صفحة ديجي-تك المتخصصة وخدمات الورشة المتاحة لها في دبي." : "Choose your vehicle brand to explore its dedicated DIGI-TEC page and specialist workshop capability in Dubai."
      }
    ),
    /* @__PURE__ */ jsx(
      AnswerBlock,
      {
        question: isArabic ? "ما العلامات التي يخدمها ديجي-تك في دبي؟" : "Which car brands does Digi-Tec service in Dubai?",
        answer: isArabic ? "تسرد صفحات العلامات في ديجي-تك فئات السيارات التي يمكن مناقشة صيانتها أو فحصها أو إصلاحها في ورشة القوز، دبي. يتم تأكيد التغطية والأداة المناسبة والوظائف المتاحة من رقم الهيكل والموديل والسنة ونطاق العمل قبل الحجز." : "Digi-Tec’s brand pages list vehicle categories that owners can discuss for maintenance, inspection or repair at the Al Quoz, Dubai workshop. Coverage, suitable tooling and available functions are confirmed from the VIN, model, year and required work before booking.",
        facts: isArabic ? [
          "صفحة مخصصة لكل علامة مع نطاق الخدمة وطريقة الحجز",
          "تأكيد توافق الفحص والأدوات من السيارة المطلوبة",
          "ورشة ديجي-تك في القوز، دبي"
        ] : [
          "A dedicated page per brand covering service scope and how to book",
          "Vehicle-specific confirmation of diagnostic and tooling coverage",
          "Digi-Tec workshop in Al Quoz, Dubai"
        ]
      }
    ),
    /* @__PURE__ */ jsx("section", { className: "pb-20 sm:pb-28", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-12", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 border-t border-white/[0.1] sm:grid-cols-3 lg:grid-cols-4", children: brands.map((brand) => /* @__PURE__ */ jsxs(
      LocalizedLink,
      {
        to: `/brands/${brand.slug}`,
        className: "group flex min-h-32 items-center gap-4 border-b border-white/[0.1] px-2 py-5 transition-colors hover:bg-white/[0.025] sm:min-h-36 sm:px-5",
        "aria-label": isArabic ? `صيانة وإصلاح ${brand.name} في دبي` : `${brand.name} service and repair in Dubai`,
        children: [
          /* @__PURE__ */ jsx("div", { className: "flex h-12 w-16 shrink-0 items-center justify-center overflow-hidden bg-white/[0.94] p-2 sm:h-14 sm:w-20", children: brand.logo ? /* @__PURE__ */ jsx(
            "img",
            {
              src: brand.name === "ROX" ? "/brand-logos/rox-card.png" : brand.logo,
              alt: isArabic ? `شعار ${brand.name}` : `${brand.name} logo`,
              className: "h-full w-full object-contain",
              loading: "lazy"
            }
          ) : /* @__PURE__ */ jsx("span", { className: "text-lg font-semibold text-burnt-orange", children: brand.name.charAt(0) }) }),
          /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsx("h2", { className: "truncate text-sm font-semibold leading-tight tracking-[-0.01em] transition-colors group-hover:text-burnt-orange sm:text-base", children: brand.name }),
            /* @__PURE__ */ jsx("p", { className: "mt-1.5 line-clamp-2 text-[11px] leading-relaxed text-white/42 sm:text-xs", children: isArabic ? "صيانة • إصلاح • تشخيص • أداء" : brand.specialization })
          ] })
        ]
      },
      brand.slug
    )) }) }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
export {
  Brands as default
};
