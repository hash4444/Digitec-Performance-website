import { jsxs, jsx } from "react/jsx-runtime";
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { ChevronRight, MessageCircle, Phone } from "lucide-react";
import { H as Header, F as Footer } from "./Footer-D0Xl6ot8.js";
import { u as useLocale, S as SITE_URL, G as PAINT_PROTECTION_PATH, H as paintProtectionCopy, p as pageGraph, a as buildWebPage, g as buildBreadcrumb, h as buildService, d as useSeo, L as LocalizedLink, b as brands, I as PAINT_PROTECTION_UPDATED } from "../entry-server.js";
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
const hero = "/images/ppf/film-application-1200.webp";
const relevantBrands = brands.filter((brand) => ["Mercedes-Benz", "BMW", "Porsche", "Ferrari", "Lamborghini", "Rolls-Royce", "Range Rover"].includes(brand.name));
function PaintProtectionPage() {
  const { isArabic, locale, localizedPath } = useLocale();
  const { hash } = useLocation();
  const copy = paintProtectionCopy[locale];
  const url = `${SITE_URL}${localizedPath(PAINT_PROTECTION_PATH)}`;
  const whatsapp = `https://wa.me/97143402223?text=${encodeURIComponent(copy.draft)}`;
  useEffect(() => {
    var _a;
    if (hash) (_a = document.getElementById(hash.slice(1))) == null ? void 0 : _a.scrollIntoView({ block: "start" });
  }, [hash]);
  const graph = pageGraph([
    buildWebPage({ url, name: copy.title, description: copy.description, breadcrumbId: `${url}#breadcrumb`, mainEntityId: `${url}#service`, primaryImage: hero, dateModified: PAINT_PROTECTION_UPDATED }),
    buildBreadcrumb(url, [{ name: copy.home, url: localizedPath("/") }, { name: copy.services, url: localizedPath("/services") }, { name: copy.breadcrumb, url }]),
    buildService({ url, name: copy.h1, serviceType: copy.breadcrumb, description: copy.intro, image: hero })
  ]);
  useSeo({ title: copy.title, description: copy.description, canonical: url, hasArabicVersion: true, jsonLd: graph, ogImage: `${SITE_URL}${hero}`, ogImageAlt: copy.photoAlt, ogImageWidth: 1200, ogImageHeight: 1200 });
  const quote = (placement) => /* @__PURE__ */ jsxs("a", { href: whatsapp, target: "_blank", rel: "noopener noreferrer", "data-cta-placement": placement, className: "ph-button ph-primary", children: [
    /* @__PURE__ */ jsx(MessageCircle, { size: 19, "aria-hidden": "true" }),
    copy.quote
  ] });
  const call = (placement) => /* @__PURE__ */ jsxs("a", { href: "tel:+97143402223", "data-cta-placement": placement, className: "ph-button ph-secondary", children: [
    /* @__PURE__ */ jsx(Phone, { size: 19, "aria-hidden": "true" }),
    copy.call
  ] });
  return /* @__PURE__ */ jsxs("div", { className: "protection-hub site-page min-h-screen", dir: isArabic ? "rtl" : "ltr", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsxs("main", { id: "paint-protection-main", children: [
      /* @__PURE__ */ jsxs("section", { className: "ph-hero theme-dark-section", "aria-labelledby": "protection-title", children: [
        /* @__PURE__ */ jsxs("div", { className: "ph-hero-copy", children: [
          /* @__PURE__ */ jsxs("nav", { className: "ph-breadcrumb", "aria-label": isArabic ? "مسار الصفحة" : "Breadcrumb", children: [
            /* @__PURE__ */ jsx(LocalizedLink, { to: "/", children: copy.home }),
            /* @__PURE__ */ jsx(ChevronRight, { size: 14, "aria-hidden": "true" }),
            /* @__PURE__ */ jsx(LocalizedLink, { to: "/services", children: copy.services }),
            /* @__PURE__ */ jsx(ChevronRight, { size: 14, "aria-hidden": "true" }),
            /* @__PURE__ */ jsx("span", { "aria-current": "page", children: copy.breadcrumb })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "ph-kicker", children: copy.kicker }),
          /* @__PURE__ */ jsx("h1", { id: "protection-title", children: copy.h1 }),
          /* @__PURE__ */ jsx("p", { children: copy.intro }),
          /* @__PURE__ */ jsxs("div", { className: "ph-actions", children: [
            quote("hero"),
            call("hero")
          ] })
        ] }),
        /* @__PURE__ */ jsxs("figure", { children: [
          /* @__PURE__ */ jsx("img", { src: hero, srcSet: "/images/ppf/film-application-640.webp 640w, /images/ppf/film-application-1200.webp 1200w", sizes: "(min-width: 900px) 46vw, 100vw", width: 1200, height: 1200, fetchPriority: "high", alt: copy.photoAlt }),
          /* @__PURE__ */ jsx("figcaption", { children: copy.photoCaption })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("nav", { className: "ph-jump", "aria-label": isArabic ? "أقسام حماية الطلاء" : "Paint protection sections", children: [
        /* @__PURE__ */ jsx("a", { href: "#protection-options", children: copy.optionsTitle }),
        /* @__PURE__ */ jsx("a", { href: "#protection-comparison", children: copy.comparisonTitle }),
        /* @__PURE__ */ jsx("a", { href: "#protection-quote", children: copy.quote })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "ph-section", children: [
        /* @__PURE__ */ jsx("h2", { children: copy.whyTitle }),
        /* @__PURE__ */ jsx("p", { children: copy.why })
      ] }),
      /* @__PURE__ */ jsxs("section", { id: "protection-options", className: "ph-section ph-panel", children: [
        /* @__PURE__ */ jsx("h2", { children: copy.optionsTitle }),
        /* @__PURE__ */ jsx("div", { className: "ph-cards", children: copy.options.map((option) => /* @__PURE__ */ jsxs("article", { id: option.path.endsWith("car-polishing-dubai") ? "paint-correction" : void 0, children: [
          /* @__PURE__ */ jsx("h3", { children: option.heading }),
          /* @__PURE__ */ jsx("p", { children: option.text }),
          isArabic && option.path.endsWith("car-polishing-dubai") ? /* @__PURE__ */ jsx(Link, { to: option.path, className: "ph-link", children: option.label }) : /* @__PURE__ */ jsx(LocalizedLink, { to: option.path, className: "ph-link", children: option.label })
        ] }, option.path)) })
      ] }),
      /* @__PURE__ */ jsxs("section", { id: "protection-comparison", className: "ph-section", children: [
        /* @__PURE__ */ jsx("h2", { children: copy.comparisonTitle }),
        /* @__PURE__ */ jsx("p", { children: copy.comparisonIntro }),
        /* @__PURE__ */ jsx("div", { className: "ph-table", role: "region", "aria-label": copy.comparisonTitle, tabIndex: 0, children: /* @__PURE__ */ jsxs("table", { children: [
          /* @__PURE__ */ jsx("caption", { children: copy.comparisonTitle }),
          /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsx("tr", { children: copy.comparisonHeaders.map((label) => /* @__PURE__ */ jsx("th", { scope: "col", children: label }, label)) }) }),
          /* @__PURE__ */ jsx("tbody", { children: copy.comparison.map(([label, ...values]) => /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("th", { scope: "row", children: label }),
            values.map((value, index) => /* @__PURE__ */ jsx("td", { children: value }, index))
          ] }, label)) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "ph-section ph-panel", children: [
        /* @__PURE__ */ jsx("h2", { children: copy.choiceTitle }),
        /* @__PURE__ */ jsx("ul", { className: "ph-list", children: copy.choices.map((item) => /* @__PURE__ */ jsx("li", { children: item }, item)) })
      ] }),
      /* @__PURE__ */ jsxs("section", { id: "protection-process", className: "ph-section", children: [
        /* @__PURE__ */ jsx("h2", { children: copy.processTitle }),
        /* @__PURE__ */ jsx("ol", { className: "ph-cards", children: copy.process.map(([heading, text], index) => /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsxs("p", { className: "ph-kicker", children: [
            "0",
            index + 1
          ] }),
          /* @__PURE__ */ jsx("h3", { children: heading }),
          /* @__PURE__ */ jsx("p", { children: text })
        ] }, heading)) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "ph-section ph-panel", children: [
        /* @__PURE__ */ jsx("h2", { children: copy.vehicleTitle }),
        /* @__PURE__ */ jsx("p", { children: copy.vehicle }),
        /* @__PURE__ */ jsx("p", { children: copy.brandsLabel }),
        /* @__PURE__ */ jsx("nav", { className: "ph-brands", "aria-label": isArabic ? "صفحات العلامات" : "Brand workshop pages", children: relevantBrands.map((brand) => /* @__PURE__ */ jsx(LocalizedLink, { to: `/brands/${brand.slug}`, children: brand.name }, brand.slug)) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "ph-section", children: [
        /* @__PURE__ */ jsx("h2", { children: copy.aftercareTitle }),
        /* @__PURE__ */ jsx("p", { children: copy.aftercare })
      ] }),
      /* @__PURE__ */ jsxs("section", { id: "protection-faq", className: "ph-section ph-panel", children: [
        /* @__PURE__ */ jsx("h2", { children: copy.faqTitle }),
        copy.faqs.map((faq) => /* @__PURE__ */ jsxs("details", { children: [
          /* @__PURE__ */ jsx("summary", { children: faq.question }),
          /* @__PURE__ */ jsx("p", { children: faq.answer })
        ] }, faq.question))
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "ph-section", children: [
        /* @__PURE__ */ jsx("h2", { children: copy.learnTitle }),
        /* @__PURE__ */ jsxs("nav", { className: "ph-resources", "aria-label": copy.learnTitle, children: [
          /* @__PURE__ */ jsx(LocalizedLink, { to: "/blog/ceramic-coating-vs-ppf-dubai", children: copy.compareLabel }),
          /* @__PURE__ */ jsx(LocalizedLink, { to: "/blog/why-ceramic-coating-matters-uae", children: copy.guideLabel }),
          /* @__PURE__ */ jsx(LocalizedLink, { to: "/services/car-body-repair-dubai", children: copy.bodyLabel })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { id: "protection-quote", className: "ph-section ph-panel", children: [
        /* @__PURE__ */ jsx("h2", { children: copy.quoteTitle }),
        /* @__PURE__ */ jsx("p", { children: copy.quoteText }),
        /* @__PURE__ */ jsxs("div", { className: "ph-actions", children: [
          quote("service_details"),
          call("service_details")
        ] }),
        /* @__PURE__ */ jsxs("address", { children: [
          "DIGI-TEC Performance Center",
          /* @__PURE__ */ jsx("br", {}),
          copy.address,
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("a", { href: "tel:+97143402223", "data-cta-placement": "final_cta", children: "+971 4 340 2223" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Footer, {}),
    /* @__PURE__ */ jsxs("nav", { className: "ph-mobile", "aria-label": copy.mobileLabel, children: [
      quote("paint_protection_mobile"),
      call("paint_protection_mobile")
    ] })
  ] });
}
export {
  PaintProtectionPage as default
};
