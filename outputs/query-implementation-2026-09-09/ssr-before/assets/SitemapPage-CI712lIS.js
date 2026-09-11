import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { u as useLocale, E as allServices, r as brands, ae as brandWorkshopArticleSummaries, af as blogPosts, be as bestWorkshopPages, b2 as FERRARI_MAINTENANCE_GUIDE_PATH, b3 as FERRARI_488_GUIDE_PATH, az as MERCEDES_PROBLEMS_PATH, g as englishOnlyServices, bf as localGaragePages, aI as audiModelPages, aG as audiModelPath, aO as ferrariModelPages, aw as mercedesModelPages, ay as mercedesProblemGuides, p as pageGraph, S as SITE_URL, b as buildWebPage, a as buildBreadcrumb, e as useSeo, H as Header, L as LocalizedLink, f as Footer } from "../entry-server.js";
import { l as localizeServiceToArabic } from "./ar-services-FRxiHbXW.js";
import { l as localizeBrandToArabic } from "./ar-brands-CgvxLF5U.js";
import { l as localizePostSummaryToArabic } from "./ar-blog-DylLIgex.js";
import { l as localizeBestWorkshopPageToArabic } from "./ar-best-workshop-BMuRYA1p.js";
import "node:stream";
import "react-dom/server";
import "react-router-dom/server.mjs";
import "react-router-dom";
import "react";
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
const SitemapPage = () => {
  const { isArabic } = useLocale();
  const url = `${SITE_URL}${isArabic ? "/ar" : ""}/sitemap`;
  const displayedServices = allServices.filter((service) => !["mercedes-repair-dubai", "mercedes-service-dubai"].includes(service.slug)).map((service) => isArabic ? localizeServiceToArabic(service) : service);
  const displayedBrands = brands.map((brand) => isArabic ? localizeBrandToArabic(brand) : brand);
  const displayedPosts = [...brandWorkshopArticleSummaries, ...blogPosts].map((post) => isArabic ? localizePostSummaryToArabic(post) : post);
  const displayedWorkshopPages = bestWorkshopPages.map((page) => isArabic ? localizeBestWorkshopPageToArabic(page) : page);
  const groups = [
    {
      title: isArabic ? "الصفحات الرئيسية" : "Main pages",
      links: [
        { label: isArabic ? "الرئيسية" : "Home", to: "/" },
        { label: isArabic ? "خدمات السيارات" : "Car services", to: "/services" },
        { label: isArabic ? "علامات السيارات" : "Car brands", to: "/brands" },
        { label: isArabic ? "تطوير الأداء" : "Performance tuning", to: "/tuning" },
        { label: isArabic ? "عن ديجي-تك" : "About Digi-Tec", to: "/about" },
        { label: isArabic ? "الأسئلة الشائعة" : "Frequently asked questions", to: "/faq" },
        { label: isArabic ? "أدلة الورشة" : "Workshop guides", to: "/blog" }
      ]
    },
    {
      title: isArabic ? "الخدمات الأساسية" : "Core services",
      links: [
        ...displayedServices.map((service) => ({ label: service.title, to: `/services/${service.slug}` })),
        ...isArabic ? [] : englishOnlyServices.map((service) => ({ label: service.title, to: `/services/${service.slug}` })),
        ...localGaragePages.map((page) => ({
          label: isArabic ? {
            "garage-near-me-dubai": "ورشة سيارات قريبة في دبي",
            "roadside-assistance-dubai": "المساعدة على الطريق في دبي",
            "car-garage-dubai": "كراج سيارات في دبي"
          }[page.slug] ?? page.title : page.title,
          to: `/services/${page.slug}`
        }))
      ]
    },
    {
      title: isArabic ? "العلامات التي نخدمها" : "Brands we service",
      links: displayedBrands.map((brand) => ({ label: isArabic ? `خدمة ${brand.name} في دبي` : `${brand.name} service in Dubai`, to: `/brands/${brand.slug}` }))
    },
    {
      title: isArabic ? "أدلة الورشة" : "Workshop guides",
      links: displayedPosts.map((post) => ({ label: post.title, to: `/blog/${post.slug}` }))
    },
    {
      title: isArabic ? "اعثر على الورشة المناسبة" : "Find the right workshop",
      links: displayedWorkshopPages.map((page) => ({ label: page.h1, to: `/${page.slug}` }))
    },
    ...!isArabic ? [{
      title: "Audi model service & repair pages",
      links: audiModelPages.map((model) => ({ label: model.h1, to: audiModelPath(model) }))
    }, {
      title: "Ferrari model & ownership guides",
      links: [
        ...ferrariModelPages.map((model) => ({ label: model.h1, to: model.path })),
        { label: "Ferrari maintenance guide for Dubai", to: FERRARI_MAINTENANCE_GUIDE_PATH },
        { label: "Ferrari 488 owner maintenance guide", to: FERRARI_488_GUIDE_PATH }
      ]
    }, {
      title: "Mercedes model & diagnostic guides",
      links: [
        ...mercedesModelPages.map((model) => ({ label: model.h1, to: model.path })),
        { label: "Mercedes Problems & Diagnostic Guides", to: MERCEDES_PROBLEMS_PATH },
        ...mercedesProblemGuides.map((guide) => ({ label: guide.h1, to: guide.path }))
      ]
    }] : []
  ];
  const sitemapItems = groups.flatMap((group) => group.links);
  const localizedUrl = (path) => `${SITE_URL}${isArabic ? "/ar" : ""}${path === "/" ? isArabic ? "" : "/" : path}`;
  const sitemapListId = `${url}#sitemap-list`;
  const sitemapGraph = pageGraph([
    buildWebPage({
      url,
      name: isArabic ? "خريطة موقع ديجي-تك بيرفورمانس" : "Digi-Tec Performance Centre HTML Sitemap",
      description: isArabic ? "دليل منظم للصفحات الرئيسية والخدمات والعلامات وأدلة الورشة على موقع ديجي-تك." : "An organized directory of Digi-Tec main pages, services, vehicle brands and workshop guides.",
      type: "CollectionPage",
      breadcrumbId: `${url}#breadcrumb`,
      mainEntityId: sitemapListId
    }),
    buildBreadcrumb(url, [
      { name: isArabic ? "الرئيسية" : "Home", url: localizedUrl("/") },
      { name: isArabic ? "خريطة الموقع" : "Sitemap", url }
    ]),
    {
      "@type": "ItemList",
      "@id": sitemapListId,
      name: isArabic ? "صفحات موقع ديجي-تك" : "Digi-Tec website pages",
      numberOfItems: sitemapItems.length,
      itemListElement: sitemapItems.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.label,
        item: localizedUrl(item.to)
      }))
    }
  ]);
  useSeo({
    title: isArabic ? "خريطة الموقع | ديجي-تك بيرفورمانس دبي" : "HTML Sitemap | Digi-Tec Performance Centre Dubai",
    description: isArabic ? "تصفح خدمات ديجي-تك وصفحات العلامات المتخصصة وأدلة الورشة ومعلومات موقعنا في دبي." : "Browse Digi-Tec Performance Centre services, specialist car brands, workshop guides, and Dubai location information.",
    canonical: url,
    jsonLd: sitemapGraph
  });
  return /* @__PURE__ */ jsxs("div", { className: "site-page min-h-screen bg-black text-off-white", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsxs("main", { className: "mx-auto max-w-[90rem] px-5 py-20 sm:px-8 md:py-24 lg:px-12", children: [
      /* @__PURE__ */ jsx("p", { className: "eyebrow mb-4", children: isArabic ? "التنقل في الموقع" : "Website navigation" }),
      /* @__PURE__ */ jsx("h1", { className: "mb-5 text-[clamp(2.75rem,5vw,5.25rem)] font-semibold leading-[0.98] tracking-[-0.05em]", children: isArabic ? /* @__PURE__ */ jsxs(Fragment, { children: [
        "خريطة ",
        /* @__PURE__ */ jsx("span", { className: "text-burnt-orange", children: "الموقع" })
      ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        "HTML ",
        /* @__PURE__ */ jsx("span", { className: "text-burnt-orange", children: "Sitemap" })
      ] }) }),
      /* @__PURE__ */ jsx("p", { className: "text-white/60 max-w-2xl leading-relaxed mb-12", children: isArabic ? "تصفح خدمات ديجي-تك وصفحات العلامات المتخصصة ونصائح الورشة العملية للسيارات الفاخرة وعالية الأداء في دبي." : "Browse Digi-Tec services, specialist brand pages, and practical workshop advice for luxury and performance vehicles in Dubai." }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 gap-5", children: groups.map((group) => /* @__PURE__ */ jsxs("section", { className: "border-t border-white/[0.1] py-6", children: [
        /* @__PURE__ */ jsx("h2", { className: "mb-4 text-xl font-semibold", children: group.title }),
        /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: group.links.map((link) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(LocalizedLink, { to: link.to, className: "text-sm text-white/65 hover:text-burnt-orange transition-colors", children: link.label }) }, link.to)) })
      ] }, group.title)) })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
export {
  SitemapPage as default
};
