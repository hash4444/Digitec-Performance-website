import { jsx, jsxs } from "react/jsx-runtime";
import { MessageCircle, Phone, Gauge, CheckCircle2, AlertTriangle, SearchCheck, ArrowRight } from "lucide-react";
import { useLocation, Navigate } from "react-router-dom";
import { at as stripLocalePrefix, aM as getFerrariModelByPath, S as SITE_URL, aN as FERRARI_HUB_PATH, p as pageGraph, a as buildBreadcrumb, b as buildWebPage, c as buildService, e as useSeo, aO as ferrariModelPages, H as Header, L as LocalizedLink, G as Accordion, I as AccordionItem, J as AccordionTrigger, K as AccordionContent, f as Footer } from "../entry-server.js";
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
const workshopImage = "/images/ferrari-service-dubai-hero.jpg";
const SystemCard = ({ section }) => /* @__PURE__ */ jsxs("article", { className: "card-premium rounded-2xl p-5 sm:p-7", children: [
  /* @__PURE__ */ jsx("h2", { className: "text-xl font-black sm:text-2xl", children: section.title }),
  /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-relaxed text-white/75", children: section.directAnswer }),
  /* @__PURE__ */ jsx("ul", { className: "mt-5 space-y-3", children: section.points.map((point) => /* @__PURE__ */ jsxs("li", { className: "flex gap-3 text-sm leading-relaxed text-white/55", children: [
    /* @__PURE__ */ jsx(CheckCircle2, { className: "mt-0.5 h-4 w-4 shrink-0 text-burnt-orange", "aria-hidden": "true" }),
    /* @__PURE__ */ jsx("span", { children: point })
  ] }, point)) })
] });
const FerrariModelPage = () => {
  const { pathname } = useLocation();
  const cleanPath = stripLocalePrefix(pathname).replace(/\/$/, "") || "/";
  const model = getFerrariModelByPath(cleanPath);
  const canonical = model ? `${SITE_URL}${model.path}` : `${SITE_URL}${FERRARI_HUB_PATH}`;
  const breadcrumbId = `${canonical}#breadcrumb`;
  const jsonLd = model ? pageGraph([
    buildBreadcrumb(model.path, [
      { name: "Home", url: "/" },
      { name: "Ferrari service Dubai", url: FERRARI_HUB_PATH },
      { name: model.shortName, url: model.path }
    ]),
    buildWebPage({
      url: model.path,
      name: model.h1,
      description: model.metaDescription,
      breadcrumbId,
      primaryImage: workshopImage,
      mainEntityId: `${canonical}#service`
    }),
    buildService({
      url: model.path,
      name: model.h1,
      serviceType: `${model.name} maintenance, diagnostics and repair`,
      description: model.metaDescription,
      image: workshopImage,
      brand: "Ferrari",
      offers: model.services.map((item) => item.label),
      areaServed: ["Dubai"]
    })
  ]) : void 0;
  useSeo({
    title: (model == null ? void 0 : model.metaTitle) ?? "Ferrari Models | DIGI-TEC Dubai",
    description: (model == null ? void 0 : model.metaDescription) ?? "Ferrari model service information from DIGI-TEC Performance Centre in Dubai.",
    canonical,
    ogImage: workshopImage,
    ogImageAlt: model ? `Ferrari workshop service support for ${model.name} owners in Dubai` : void 0,
    ogType: "website",
    jsonLd,
    hasArabicVersion: false
  });
  if (!model) return /* @__PURE__ */ jsx(Navigate, { to: FERRARI_HUB_PATH, replace: true });
  const relatedModels = ferrariModelPages.filter((item) => item.path !== model.path).slice(0, 3);
  const whatsappText = encodeURIComponent(
    `Hi, I would like to arrange a ${model.name} inspection at DIGI-TEC. The model year is ____ and the concern is ____.`
  );
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-black text-off-white", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsx("nav", { "aria-label": "Breadcrumb", className: "border-b border-white/5 bg-black", children: /* @__PURE__ */ jsxs("ol", { className: "mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-4 py-4 text-xs text-white/50 sm:px-6", children: [
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(LocalizedLink, { to: "/", className: "hover:text-burnt-orange", children: "Home" }) }),
        /* @__PURE__ */ jsx("li", { "aria-hidden": "true", children: "/" }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(LocalizedLink, { to: FERRARI_HUB_PATH, className: "hover:text-burnt-orange", children: "Ferrari" }) }),
        /* @__PURE__ */ jsx("li", { "aria-hidden": "true", children: "/" }),
        /* @__PURE__ */ jsx("li", { className: "text-white/80", children: model.shortName })
      ] }) }),
      /* @__PURE__ */ jsxs("section", { className: "theme-dark-section relative isolate overflow-hidden border-b border-white/10 bg-charcoal/20", children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: workshopImage,
            alt: "Ferrari in the DIGI-TEC Performance Centre workshop in Dubai",
            className: "absolute inset-0 h-full w-full object-cover object-center opacity-30",
            width: "941",
            height: "1672",
            fetchPriority: "high"
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/55" }),
        /* @__PURE__ */ jsxs("div", { className: "relative mx-auto grid max-w-7xl items-center gap-8 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1fr_0.58fr] lg:py-28", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "eyebrow mb-5", children: "Independent Ferrari model expertise" }),
            /* @__PURE__ */ jsx("h1", { className: "max-w-4xl text-3xl font-black leading-tight sm:text-5xl lg:text-6xl", children: model.h1 }),
            /* @__PURE__ */ jsx("p", { className: "mt-6 max-w-3xl text-base leading-relaxed text-white/72 sm:text-lg", children: model.intro }),
            /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-col gap-3 sm:flex-row", children: [
              /* @__PURE__ */ jsxs("a", { className: "btn-primary", href: `https://wa.me/97143402223?text=${whatsappText}`, target: "_blank", rel: "noopener noreferrer", children: [
                /* @__PURE__ */ jsx(MessageCircle, { className: "h-4 w-4", "aria-hidden": "true" }),
                " WhatsApp your concern"
              ] }),
              /* @__PURE__ */ jsxs("a", { className: "btn-secondary", href: "tel:+97143402223", children: [
                /* @__PURE__ */ jsx(Phone, { className: "h-4 w-4", "aria-hidden": "true" }),
                " Call +971 4 340 2223"
              ] })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-2xl text-xs leading-relaxed text-white/45", children: "Send the VIN, year, mileage, service history, exact warning text and when the symptom occurs. Scope and diagnostic compatibility are confirmed for the vehicle before work is agreed." })
          ] }),
          /* @__PURE__ */ jsxs("aside", { className: "card-premium rounded-3xl p-7 sm:p-8", children: [
            /* @__PURE__ */ jsx(Gauge, { className: "h-9 w-9 text-burnt-orange", "aria-hidden": "true" }),
            /* @__PURE__ */ jsx("p", { className: "mt-5 text-xl font-black", children: "Direct answer" }),
            /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-relaxed text-white/65", children: model.directAnswer })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "border-b border-white/5 py-14 sm:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.72fr_1.28fr]", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "eyebrow mb-4", children: "Vehicle scope" }),
          /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-black sm:text-4xl", children: [
            "What this ",
            model.shortName,
            " page covers"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm leading-relaxed text-white/55", children: "Ferrari names can span different model years, drivetrains and equipment. The VIN and fitted hardware remain authoritative." })
        ] }),
        /* @__PURE__ */ jsx("ul", { className: "grid gap-4", children: model.coverage.map((item) => /* @__PURE__ */ jsxs("li", { className: "card-premium flex gap-3 rounded-2xl p-5 text-sm leading-relaxed text-white/70 sm:text-base", children: [
          /* @__PURE__ */ jsx(CheckCircle2, { className: "mt-0.5 h-5 w-5 shrink-0 text-burnt-orange", "aria-hidden": "true" }),
          /* @__PURE__ */ jsx("span", { children: item })
        ] }, item)) })
      ] }) }),
      model.hybridScopeNote ? /* @__PURE__ */ jsx("section", { className: "border-b border-amber-400/15 bg-amber-500/[0.06] py-8", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex max-w-7xl gap-4 px-4 sm:px-6", children: [
        /* @__PURE__ */ jsx(AlertTriangle, { className: "mt-0.5 h-6 w-6 shrink-0 text-amber-300", "aria-hidden": "true" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-black", children: "Hybrid scope is confirmed before booking" }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 max-w-4xl text-sm leading-relaxed text-white/65", children: model.hybridScopeNote })
        ] })
      ] }) }) : null,
      /* @__PURE__ */ jsx("section", { className: "bg-gradient-to-b from-charcoal/20 to-black py-14 sm:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "mx-auto mb-10 max-w-3xl text-center", children: [
          /* @__PURE__ */ jsx("p", { className: "eyebrow mb-4", children: "Model-specific systems" }),
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black sm:text-4xl", children: "A Ferrari repair plan starts with the fitted system" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid gap-5 lg:grid-cols-2", children: model.systems.map((section) => /* @__PURE__ */ jsx(SystemCard, { section }, section.title)) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "border-y border-white/5 py-14 sm:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "card-premium rounded-2xl p-6 sm:p-8", children: [
          /* @__PURE__ */ jsx(AlertTriangle, { className: "h-7 w-7 text-burnt-orange", "aria-hidden": "true" }),
          /* @__PURE__ */ jsx("h2", { className: "mt-4 text-2xl font-black", children: "Warnings and symptoms to document" }),
          /* @__PURE__ */ jsx("ul", { className: "mt-5 space-y-3", children: model.warningSigns.map((item) => /* @__PURE__ */ jsxs("li", { className: "text-sm leading-relaxed text-white/62", children: [
            "• ",
            item
          ] }, item)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "card-premium rounded-2xl p-6 sm:p-8", children: [
          /* @__PURE__ */ jsx(SearchCheck, { className: "h-7 w-7 text-burnt-orange", "aria-hidden": "true" }),
          /* @__PURE__ */ jsx("h2", { className: "mt-4 text-2xl font-black", children: "Our diagnostic approach" }),
          /* @__PURE__ */ jsx("ol", { className: "mt-5 space-y-3", children: model.diagnosticApproach.map((item, index) => /* @__PURE__ */ jsxs("li", { className: "flex gap-3 text-sm leading-relaxed text-white/62", children: [
            /* @__PURE__ */ jsxs("span", { className: "font-black text-burnt-orange", children: [
              index + 1,
              "."
            ] }),
            /* @__PURE__ */ jsx("span", { children: item })
          ] }, item)) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "bg-charcoal/15 py-14 sm:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
        /* @__PURE__ */ jsx("p", { className: "eyebrow mb-4", children: "Dubai ownership context" }),
        /* @__PURE__ */ jsx("h2", { className: "max-w-3xl text-2xl font-black sm:text-4xl", children: "Heat, traffic, dust and storage all affect the inspection" }),
        /* @__PURE__ */ jsx("div", { className: "mt-8 grid gap-4 md:grid-cols-3", children: model.dubaiConsiderations.map((item) => /* @__PURE__ */ jsx("p", { className: "card-premium rounded-2xl p-5 text-sm leading-relaxed text-white/62", children: item }, item)) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "border-y border-white/5 py-14 sm:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
        /* @__PURE__ */ jsx("p", { className: "eyebrow mb-4", children: "Service pathways" }),
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black sm:text-4xl", children: "Continue to the relevant Ferrari service" }),
        /* @__PURE__ */ jsx("div", { className: "mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4", children: model.services.map((item) => /* @__PURE__ */ jsxs(LocalizedLink, { to: item.path, className: "card-premium group rounded-2xl p-5 sm:p-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold group-hover:text-burnt-orange", children: item.label }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-relaxed text-white/55", children: item.description }),
          /* @__PURE__ */ jsxs("span", { className: "mt-4 inline-flex items-center gap-1 text-sm font-semibold text-burnt-orange", children: [
            "View service ",
            /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
          ] })
        ] }, item.path)) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "py-14 sm:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.72fr_1.28fr]", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "eyebrow mb-4", children: "Questions before booking" }),
          /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-black sm:text-4xl", children: [
            model.shortName,
            " service FAQ"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm leading-relaxed text-white/55", children: "These answers set expectations; vehicle-specific advice follows VIN and condition checks." })
        ] }),
        /* @__PURE__ */ jsx(Accordion, { type: "single", collapsible: true, className: "space-y-3", children: model.faqs.map((faq, index) => /* @__PURE__ */ jsxs(AccordionItem, { value: `faq-${index}`, className: "rounded-xl border border-white/10 bg-white/[0.025] px-5", children: [
          /* @__PURE__ */ jsx(AccordionTrigger, { className: "text-left font-bold hover:text-burnt-orange", children: faq.question }),
          /* @__PURE__ */ jsx(AccordionContent, { className: "text-sm leading-relaxed text-white/65", children: faq.answer })
        ] }, faq.question)) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "border-y border-white/5 bg-gradient-to-br from-burnt-orange/20 via-charcoal/30 to-black py-14 sm:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl px-4 text-center sm:px-6", children: [
        /* @__PURE__ */ jsx("p", { className: "eyebrow mb-4", children: "Independent Ferrari workshop in Al Quoz" }),
        /* @__PURE__ */ jsxs("h2", { className: "text-3xl font-black sm:text-5xl", children: [
          "Arrange a ",
          model.name,
          " inspection"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mx-auto mt-5 max-w-3xl text-sm leading-relaxed text-white/65 sm:text-base", children: "DIGI-TEC is independent and is not affiliated with Ferrari S.p.A. Vehicle scope, diagnostic access and the proposed repair are confirmed before work begins." }),
        /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-col justify-center gap-3 sm:flex-row", children: [
          /* @__PURE__ */ jsxs("a", { className: "btn-primary", href: `https://wa.me/97143402223?text=${whatsappText}`, target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ jsx(MessageCircle, { className: "h-4 w-4" }),
            " WhatsApp DIGI-TEC"
          ] }),
          /* @__PURE__ */ jsx(LocalizedLink, { className: "btn-secondary", to: FERRARI_HUB_PATH, children: "Return to Ferrari hub" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "py-12 sm:py-16", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-black sm:text-2xl", children: "Related Ferrari model pages" }),
        /* @__PURE__ */ jsxs("div", { className: "mt-5 flex flex-wrap gap-3", children: [
          relatedModels.map((item) => /* @__PURE__ */ jsxs(LocalizedLink, { to: item.path, className: "inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/65 hover:border-burnt-orange/40 hover:text-burnt-orange", children: [
            item.shortName,
            " ",
            /* @__PURE__ */ jsx(ArrowRight, { className: "h-3.5 w-3.5" })
          ] }, item.path)),
          model.guides.map((item) => /* @__PURE__ */ jsxs(LocalizedLink, { to: item.path, className: "inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/65 hover:border-burnt-orange/40 hover:text-burnt-orange", children: [
            item.label,
            " ",
            /* @__PURE__ */ jsx(ArrowRight, { className: "h-3.5 w-3.5" })
          ] }, item.path))
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
export {
  FerrariModelPage as default
};
