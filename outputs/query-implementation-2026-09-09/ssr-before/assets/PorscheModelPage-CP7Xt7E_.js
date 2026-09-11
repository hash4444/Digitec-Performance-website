import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { MessageCircle, Phone, CheckCircle2, ArrowRight } from "lucide-react";
import { useLocation, Navigate } from "react-router-dom";
import { at as stripLocalePrefix, aD as getPorscheModelByPath, S as SITE_URL, ao as PORSCHE_HUB_PATH, a as buildBreadcrumb, p as pageGraph, b as buildWebPage, c as buildService, aj as buildArticle, e as useSeo, aE as porscheModelPages, H as Header, L as LocalizedLink, G as Accordion, I as AccordionItem, J as AccordionTrigger, K as AccordionContent, f as Footer } from "../entry-server.js";
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
const SystemSection = ({ section }) => /* @__PURE__ */ jsxs("section", { className: "card-premium rounded-2xl p-5 sm:p-7", children: [
  /* @__PURE__ */ jsx("h2", { className: "text-xl font-black sm:text-2xl", children: section.title }),
  /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-relaxed text-white/65 sm:text-base", children: section.summary }),
  /* @__PURE__ */ jsx("ul", { className: "mt-5 space-y-3", children: section.points.map((point) => /* @__PURE__ */ jsxs("li", { className: "flex gap-3 text-sm leading-relaxed text-white/70", children: [
    /* @__PURE__ */ jsx(CheckCircle2, { className: "mt-0.5 h-4 w-4 shrink-0 text-burnt-orange" }),
    /* @__PURE__ */ jsx("span", { children: point })
  ] }, point)) })
] });
const PorscheModelPage = () => {
  const { pathname } = useLocation();
  const path = stripLocalePrefix(pathname).replace(/\/$/, "") || "/";
  const model = getPorscheModelByPath(path);
  const canonical = model ? `${SITE_URL}${model.path}` : `${SITE_URL}${PORSCHE_HUB_PATH}`;
  const breadcrumb = model ? buildBreadcrumb(canonical, [
    { name: "Home", url: SITE_URL },
    { name: "Porsche", url: `${SITE_URL}${PORSCHE_HUB_PATH}` },
    ...model.parentPath ? [{ name: model.parentLabel ?? "Model", url: `${SITE_URL}${model.parentPath}` }] : [],
    { name: model.shortName, url: canonical }
  ]) : void 0;
  const isBlogPath = path.startsWith("/blog/");
  const jsonLd = model ? pageGraph([
    buildWebPage({ url: canonical, name: model.h1, description: model.metaDescription, type: isBlogPath ? "ItemPage" : void 0, breadcrumbId: `${canonical}#breadcrumb`, mainEntityId: isBlogPath ? `${canonical}#article` : `${canonical}#service` }),
    breadcrumb,
    buildService({ url: canonical, name: model.h1, serviceType: `${model.name} inspection, maintenance and repair`, description: model.metaDescription, brand: "Porsche", areaServed: ["Dubai"] }),
    ...isBlogPath ? [buildArticle({ url: canonical, headline: model.h1, description: model.metaDescription, datePublished: "2026-08-31", author: "DIGI-TEC Workshop", section: "Porsche Ownership" })] : []
  ]) : void 0;
  useSeo({ title: (model == null ? void 0 : model.metaTitle) ?? "Porsche Service Dubai | Digi-Tec", description: (model == null ? void 0 : model.metaDescription) ?? "Porsche service in Dubai.", canonical, noindex: !model, jsonLd, hasArabicVersion: isBlogPath });
  if (!model) return /* @__PURE__ */ jsx(Navigate, { to: PORSCHE_HUB_PATH, replace: true });
  const whatsapp = `https://wa.me/97143402223?text=${encodeURIComponent(`Hi Digi-Tec, I would like to arrange a ${model.shortName} inspection.

Model year: 
VIN: 
Mileage: 
Warning or symptom: `)}`;
  const siblings = porscheModelPages.filter((item) => item.path !== model.path && !item.parentPath);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-black text-off-white", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsx("nav", { "aria-label": "Breadcrumb", className: "mx-auto max-w-7xl px-4 pt-6 text-sm text-white/50 sm:px-6", children: /* @__PURE__ */ jsxs("ol", { className: "flex flex-wrap gap-2", children: [
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(LocalizedLink, { to: "/", children: "Home" }) }),
        /* @__PURE__ */ jsx("li", { children: "/" }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(LocalizedLink, { to: PORSCHE_HUB_PATH, children: "Porsche" }) }),
        model.parentPath ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("li", { children: "/" }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(LocalizedLink, { to: model.parentPath, children: model.parentLabel }) })
        ] }) : null,
        /* @__PURE__ */ jsx("li", { children: "/" }),
        /* @__PURE__ */ jsx("li", { className: "text-white", children: model.shortName })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "border-b border-white/5 py-14 sm:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
        /* @__PURE__ */ jsx("p", { className: "eyebrow mb-4", children: "Porsche model guide" }),
        /* @__PURE__ */ jsx("h1", { className: "max-w-5xl text-4xl font-black sm:text-6xl", children: model.h1 }),
        /* @__PURE__ */ jsx("p", { className: "mt-6 max-w-4xl text-base leading-relaxed text-white/70 sm:text-lg", children: model.intro }),
        /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-col gap-3 sm:flex-row", children: [
          /* @__PURE__ */ jsxs("a", { className: "btn-primary", href: whatsapp, children: [
            /* @__PURE__ */ jsx(MessageCircle, { className: "h-4 w-4" }),
            " WhatsApp your concern"
          ] }),
          /* @__PURE__ */ jsxs("a", { className: "btn-secondary", href: "tel:+97143402223", children: [
            /* @__PURE__ */ jsx(Phone, { className: "h-4 w-4" }),
            " Call +971 4 340 2223"
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "py-14 sm:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[.7fr_1.3fr]", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "eyebrow mb-4", children: "Coverage" }),
          /* @__PURE__ */ jsxs("h2", { className: "text-3xl font-black", children: [
            "Which ",
            model.shortName,
            " vehicles this page covers"
          ] })
        ] }),
        /* @__PURE__ */ jsx("ul", { className: "grid gap-4", children: model.coverage.map((item) => /* @__PURE__ */ jsxs("li", { className: "card-premium flex gap-3 rounded-2xl p-5 text-sm leading-relaxed text-white/70", children: [
          /* @__PURE__ */ jsx(CheckCircle2, { className: "mt-0.5 h-5 w-5 shrink-0 text-burnt-orange" }),
          item
        ] }, item)) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "bg-charcoal/20 py-14 sm:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-10 text-center", children: [
          /* @__PURE__ */ jsx("p", { className: "eyebrow mb-4", children: "Model-specific systems" }),
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-black sm:text-4xl", children: "What changes the service and repair plan" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid gap-5 lg:grid-cols-2", children: model.sections.map((section) => /* @__PURE__ */ jsx(SystemSection, { section }, section.title)) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "border-y border-white/5 py-14 sm:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
        /* @__PURE__ */ jsx("p", { className: "eyebrow mb-4", children: "Start with the symptom" }),
        /* @__PURE__ */ jsxs("h2", { className: "text-3xl font-black", children: [
          "Concerns ",
          model.shortName,
          " owners describe"
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-8 grid gap-5 md:grid-cols-2", children: model.symptoms.map((item) => /* @__PURE__ */ jsxs("article", { className: "rounded-2xl border border-white/10 bg-white/[.025] p-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold", children: item.title }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm text-white/60", children: item.detail }),
          /* @__PURE__ */ jsxs(LocalizedLink, { to: item.path, className: "mt-4 inline-flex items-center gap-1 text-sm font-semibold text-burnt-orange", children: [
            item.label,
            /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
          ] })
        ] }, item.title)) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "py-14 sm:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-black", children: "Relevant DIGI-TEC services" }),
        /* @__PURE__ */ jsx("div", { className: "mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4", children: model.services.map((item) => /* @__PURE__ */ jsxs(LocalizedLink, { to: item.path, className: "card-premium group rounded-2xl p-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold group-hover:text-burnt-orange", children: item.label }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm text-white/55", children: item.description }),
          /* @__PURE__ */ jsxs("span", { className: "mt-4 inline-flex items-center gap-1 text-sm font-semibold text-burnt-orange", children: [
            "View service ",
            /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
          ] })
        ] }, item.path)) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "border-y border-white/5 py-14 sm:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[.7fr_1.3fr]", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "eyebrow mb-4", children: "Questions before booking" }),
          /* @__PURE__ */ jsxs("h2", { className: "text-3xl font-black", children: [
            model.shortName,
            " service FAQ"
          ] })
        ] }),
        /* @__PURE__ */ jsx(Accordion, { type: "single", collapsible: true, className: "space-y-3", children: model.faqs.map((faq, i) => /* @__PURE__ */ jsxs(AccordionItem, { value: `faq-${i}`, className: "rounded-2xl border border-white/10 px-5", children: [
          /* @__PURE__ */ jsx(AccordionTrigger, { className: "text-left", children: faq.question }),
          /* @__PURE__ */ jsx(AccordionContent, { className: "leading-relaxed text-white/65", children: faq.answer })
        ] }, faq.question)) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "py-14 sm:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black", children: "Continue through the Porsche knowledge centre" }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsx(LocalizedLink, { className: "btn-secondary", to: PORSCHE_HUB_PATH, children: "Porsche hub" }),
          siblings.slice(0, 5).map((item) => /* @__PURE__ */ jsx(LocalizedLink, { className: "btn-secondary", to: item.path, children: item.shortName }, item.path))
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
export {
  PorscheModelPage as default
};
