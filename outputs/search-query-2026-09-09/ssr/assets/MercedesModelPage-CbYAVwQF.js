import { jsx, jsxs } from "react/jsx-runtime";
import { MessageCircle, Phone, Wrench, CheckCircle2, ArrowRight } from "lucide-react";
import { useLocation, Navigate } from "react-router-dom";
import { as as stripLocalePrefix, at as getMercedesModelByPath, S as SITE_URL, au as MERCEDES_HUB_PATH, p as pageGraph, b as buildWebPage, a as buildBreadcrumb, c as buildService, e as useSeo, av as mercedesModelPages, H as Header, L as LocalizedLink, G as Accordion, I as AccordionItem, J as AccordionTrigger, K as AccordionContent, f as Footer } from "../entry-server.js";
import "node:stream";
import "react-dom/server";
import "react-router-dom/server.mjs";
import "react";
import "@radix-ui/react-toast";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "next-themes";
import "sonner";
import "@radix-ui/react-tooltip";
import "@tanstack/react-query";
import "@radix-ui/react-accordion";
const workshopImage = "/images/mercedes-repair-dubai-hero.jpg";
const ModelSystemSection = ({ section }) => /* @__PURE__ */ jsxs("section", { className: "card-premium rounded-2xl p-5 sm:p-7", children: [
  /* @__PURE__ */ jsx("h2", { className: "text-xl sm:text-2xl font-black text-off-white", children: section.title }),
  /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm sm:text-base leading-relaxed text-white/65", children: section.summary }),
  /* @__PURE__ */ jsx("ul", { className: "mt-5 space-y-3", children: section.points.map((point) => /* @__PURE__ */ jsxs("li", { className: "flex gap-3 text-sm leading-relaxed text-white/70", children: [
    /* @__PURE__ */ jsx(CheckCircle2, { className: "mt-0.5 h-4 w-4 shrink-0 text-burnt-orange", "aria-hidden": "true" }),
    /* @__PURE__ */ jsx("span", { children: point })
  ] }, point)) })
] });
const MercedesModelPage = () => {
  var _a;
  const { pathname } = useLocation();
  const englishPath = stripLocalePrefix(pathname);
  const model = getMercedesModelByPath(englishPath);
  const canonical = model ? `${SITE_URL}${model.path}` : `${SITE_URL}${MERCEDES_HUB_PATH}`;
  const serviceId = `${canonical}#service`;
  const breadcrumbId = `${canonical}#breadcrumb`;
  const jsonLd = model ? pageGraph([
    buildWebPage({
      url: canonical,
      name: model.metaTitle,
      description: model.metaDescription,
      type: "WebPage",
      breadcrumbId,
      primaryImage: workshopImage,
      mainEntityId: serviceId,
      dateModified: "2026-08-31"
    }),
    buildBreadcrumb(canonical, [
      { name: "Home", url: `${SITE_URL}/` },
      { name: "Mercedes-Benz Repair & Service Dubai", url: `${SITE_URL}${MERCEDES_HUB_PATH}` },
      { name: model.name, url: canonical }
    ]),
    buildService({
      url: canonical,
      name: model.h1,
      serviceType: `${model.name} maintenance, diagnostics and repair`,
      description: model.metaDescription,
      image: workshopImage,
      brand: "Mercedes-Benz",
      offers: model.services.map((item) => item.label),
      areaServed: ["Dubai"]
    })
  ]) : void 0;
  useSeo({
    title: (model == null ? void 0 : model.metaTitle) ?? "Mercedes-Benz Models | Digi-Tec Dubai",
    description: (model == null ? void 0 : model.metaDescription) ?? "Mercedes-Benz model service and repair information from Digi-Tec in Dubai.",
    canonical,
    ogImage: workshopImage,
    ogImageAlt: model ? `${model.name} service and repair at Digi-Tec Performance Centre in Dubai` : void 0,
    ogType: "website",
    jsonLd,
    hasArabicVersion: Boolean(model == null ? void 0 : model.legacyBlogSlug)
  });
  if (!model) return /* @__PURE__ */ jsx(Navigate, { to: MERCEDES_HUB_PATH, replace: true });
  const otherModels = mercedesModelPages.filter((item) => item.path !== model.path).filter((item) => {
    const isAmg = model.name.includes("AMG");
    return item.name.includes("AMG") === isAmg;
  }).slice(0, 3);
  const whatsappText = encodeURIComponent(
    `Hi, I'd like to arrange a ${model.name} inspection at Digi-Tec. My model year is ____ and the concern is ____.`
  );
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-black text-off-white", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsx("nav", { "aria-label": "Breadcrumb", className: "border-b border-white/5 bg-black", children: /* @__PURE__ */ jsxs("ol", { className: "mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-4 py-4 text-xs text-white/50 sm:px-6", children: [
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(LocalizedLink, { to: "/", className: "hover:text-burnt-orange", children: "Home" }) }),
        /* @__PURE__ */ jsx("li", { "aria-hidden": "true", children: "/" }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(LocalizedLink, { to: MERCEDES_HUB_PATH, className: "hover:text-burnt-orange", children: "Mercedes-Benz" }) }),
        /* @__PURE__ */ jsx("li", { "aria-hidden": "true", children: "/" }),
        /* @__PURE__ */ jsx("li", { className: "text-white/80", children: model.shortName })
      ] }) }),
      /* @__PURE__ */ jsxs("section", { className: "theme-dark-section relative isolate overflow-hidden border-b border-white/10 bg-charcoal/20", children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: workshopImage,
            alt: `${model.name} service and repair support at the Digi-Tec Mercedes workshop in Dubai`,
            className: "absolute inset-0 h-full w-full object-cover object-center opacity-25",
            width: "1920",
            height: "1080",
            loading: "eager"
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/50" }),
        /* @__PURE__ */ jsxs("div", { className: "relative mx-auto grid max-w-7xl items-center gap-8 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1fr_0.72fr] lg:py-28", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "eyebrow mb-5", children: "Mercedes model expertise" }),
            /* @__PURE__ */ jsx("h1", { className: "max-w-4xl text-3xl font-black leading-tight sm:text-5xl lg:text-6xl", children: model.h1 }),
            /* @__PURE__ */ jsx("p", { className: "mt-6 max-w-3xl text-base leading-relaxed text-white/70 sm:text-lg", children: model.intro }),
            /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-col gap-3 sm:flex-row", children: [
              /* @__PURE__ */ jsxs("a", { className: "btn-primary", href: `https://wa.me/97143402223?text=${whatsappText}`, children: [
                /* @__PURE__ */ jsx(MessageCircle, { className: "h-4 w-4", "aria-hidden": "true" }),
                " WhatsApp your concern"
              ] }),
              /* @__PURE__ */ jsxs("a", { className: "btn-secondary", href: "tel:+97143402223", children: [
                /* @__PURE__ */ jsx(Phone, { className: "h-4 w-4", "aria-hidden": "true" }),
                " Call +971 4 340 2223"
              ] })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mt-4 text-xs leading-relaxed text-white/45", children: "Send the VIN, model year, mileage, warning text and when the symptom occurs. Workshop scope is confirmed for the exact vehicle." })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "relative hidden min-h-72 lg:block", children: model.vehicleImage ? /* @__PURE__ */ jsx(
            "img",
            {
              src: model.vehicleImage,
              alt: model.vehicleImageAlt ?? `${model.name} model`,
              className: "absolute inset-0 m-auto max-h-80 w-full object-contain drop-shadow-[0_28px_30px_rgba(0,0,0,0.7)]",
              loading: "eager"
            }
          ) : /* @__PURE__ */ jsx("div", { className: "card-premium absolute inset-y-8 right-0 flex max-w-md items-center rounded-3xl p-8", children: /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Wrench, { className: "h-9 w-9 text-burnt-orange", "aria-hidden": "true" }),
            /* @__PURE__ */ jsx("p", { className: "mt-5 text-xl font-black", children: "Model first. System second. Evidence before parts." }),
            /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-relaxed text-white/60", children: "The VIN and fitted equipment determine the service procedure, compatible diagnostics and repair scope." })
          ] }) }) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "border-b border-white/5 py-14 sm:py-20", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-8 lg:grid-cols-[0.72fr_1.28fr]", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "eyebrow mb-4", children: "Platforms covered" }),
          /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-black sm:text-4xl", children: [
            "Which ",
            model.shortName,
            " vehicles this page covers"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm leading-relaxed text-white/55", children: "Badges can span several engine and chassis generations. Final compatibility is checked from the VIN and fitted systems." })
        ] }),
        /* @__PURE__ */ jsx("ul", { className: "grid gap-4", children: model.coverage.map((item) => /* @__PURE__ */ jsxs("li", { className: "card-premium flex gap-3 rounded-2xl p-5 text-sm leading-relaxed text-white/70 sm:text-base", children: [
          /* @__PURE__ */ jsx(CheckCircle2, { className: "mt-0.5 h-5 w-5 shrink-0 text-burnt-orange", "aria-hidden": "true" }),
          /* @__PURE__ */ jsx("span", { children: item })
        ] }, item)) })
      ] }) }) }),
      /* @__PURE__ */ jsx("section", { className: "bg-gradient-to-b from-charcoal/20 to-black py-14 sm:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "mx-auto mb-10 max-w-3xl text-center", children: [
          /* @__PURE__ */ jsx("p", { className: "eyebrow mb-4", children: "Model-specific systems" }),
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black sm:text-4xl", children: "What changes the service and repair plan" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid gap-5 lg:grid-cols-2", children: [model.maintenance, model.powertrain, model.transmission, model.suspension, model.climate, model.electrical].map((section) => /* @__PURE__ */ jsx(ModelSystemSection, { section }, section.title)) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "border-y border-white/5 py-14 sm:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-10 max-w-3xl", children: [
          /* @__PURE__ */ jsx("p", { className: "eyebrow mb-4", children: "Start with the symptom" }),
          /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-black sm:text-4xl", children: [
            "Common ",
            model.shortName,
            " concerns owners describe"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-4 text-white/60", children: "These guides explain what the symptom can mean and when to stop driving. They are informational; the commercial repair page is linked separately after diagnosis." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid gap-5 md:grid-cols-2", children: model.symptoms.map((symptom) => /* @__PURE__ */ jsxs("article", { className: "rounded-2xl border border-white/10 bg-white/[0.025] p-5 sm:p-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold", children: symptom.title }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-relaxed text-white/60", children: symptom.detail }),
          /* @__PURE__ */ jsxs(LocalizedLink, { to: symptom.guidePath, className: "mt-4 inline-flex items-center gap-1 text-sm font-semibold text-burnt-orange hover:text-off-white", children: [
            symptom.guideLabel,
            " ",
            /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4", "aria-hidden": "true" })
          ] })
        ] }, symptom.title)) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "bg-charcoal/15 py-14 sm:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-10 max-w-3xl", children: [
          /* @__PURE__ */ jsx("p", { className: "eyebrow mb-4", children: "Relevant Digi-Tec services" }),
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black sm:text-4xl", children: "Commercial service pages for the diagnosed need" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid gap-5 md:grid-cols-2 lg:grid-cols-4", children: model.services.map((item) => /* @__PURE__ */ jsxs(LocalizedLink, { to: item.path, className: "card-premium group rounded-2xl p-5 sm:p-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold group-hover:text-burnt-orange", children: item.label }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-relaxed text-white/55", children: item.description }),
          /* @__PURE__ */ jsxs("span", { className: "mt-4 inline-flex items-center gap-1 text-sm font-semibold text-burnt-orange", children: [
            "View service ",
            /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
          ] })
        ] }, item.path)) })
      ] }) }),
      ((_a = model.caseStudies) == null ? void 0 : _a.length) ? /* @__PURE__ */ jsx("section", { className: "border-t border-white/5 py-14 sm:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
        /* @__PURE__ */ jsx("p", { className: "eyebrow mb-4", children: "Real workshop evidence" }),
        /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-black sm:text-4xl", children: [
          "Documented ",
          model.shortName,
          " work"
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-8 grid gap-5 md:grid-cols-2", children: model.caseStudies.map((item) => /* @__PURE__ */ jsxs(LocalizedLink, { to: item.path, className: "card-premium group rounded-2xl p-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold group-hover:text-burnt-orange", children: item.label }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-relaxed text-white/60", children: item.description }),
          /* @__PURE__ */ jsxs("span", { className: "mt-4 inline-flex items-center gap-1 text-sm font-semibold text-burnt-orange", children: [
            "View documented project ",
            /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
          ] })
        ] }, item.path)) })
      ] }) }) : null,
      /* @__PURE__ */ jsx("section", { className: "border-y border-white/5 py-14 sm:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.7fr_1.3fr]", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "eyebrow mb-4", children: "Questions before booking" }),
          /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-black sm:text-4xl", children: [
            model.shortName,
            " service FAQ"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm leading-relaxed text-white/55", children: "Useful answers first; vehicle-specific decisions still depend on inspection and recorded evidence." })
        ] }),
        /* @__PURE__ */ jsx(Accordion, { type: "single", collapsible: true, className: "space-y-3", children: model.faqs.map((faq, index) => /* @__PURE__ */ jsxs(AccordionItem, { value: `faq-${index}`, className: "rounded-xl border border-white/10 bg-white/[0.025] px-5", children: [
          /* @__PURE__ */ jsx(AccordionTrigger, { className: "text-left font-bold hover:text-burnt-orange", children: faq.question }),
          /* @__PURE__ */ jsx(AccordionContent, { className: "text-sm leading-relaxed text-white/65", children: faq.answer })
        ] }, faq.question)) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "bg-gradient-to-br from-burnt-orange/20 via-charcoal/30 to-black py-14 sm:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl px-4 text-center sm:px-6", children: [
        /* @__PURE__ */ jsx("p", { className: "eyebrow mb-4", children: "Arrange the right first inspection" }),
        /* @__PURE__ */ jsxs("h2", { className: "text-3xl font-black sm:text-5xl", children: [
          "Book ",
          model.name,
          " service or diagnosis"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mx-auto mt-5 max-w-3xl text-sm leading-relaxed text-white/65 sm:text-base", children: "Send the VIN, year, mileage, warning message and symptoms. Digi-Tec will confirm the appropriate inspection and available booking options before work begins." }),
        /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-col justify-center gap-3 sm:flex-row", children: [
          /* @__PURE__ */ jsxs("a", { className: "btn-primary", href: `https://wa.me/97143402223?text=${whatsappText}`, children: [
            /* @__PURE__ */ jsx(MessageCircle, { className: "h-4 w-4" }),
            " WhatsApp Digi-Tec"
          ] }),
          /* @__PURE__ */ jsx(LocalizedLink, { className: "btn-secondary", to: MERCEDES_HUB_PATH, children: "Return to Mercedes hub" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "py-12 sm:py-16", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-black sm:text-2xl", children: "Related Mercedes model pages" }),
        /* @__PURE__ */ jsx("ul", { className: "mt-5 flex flex-wrap gap-3", children: otherModels.map((item) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(LocalizedLink, { to: item.path, className: "inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/65 hover:border-burnt-orange/40 hover:text-burnt-orange", children: [
          item.shortName,
          " ",
          /* @__PURE__ */ jsx(ArrowRight, { className: "h-3.5 w-3.5" })
        ] }) }, item.path)) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
export {
  MercedesModelPage as default
};
