import { jsx, jsxs } from "react/jsx-runtime";
import { MessageCircle, Phone, CheckCircle2, ArrowRight } from "lucide-react";
import { useParams, Navigate } from "react-router-dom";
import { aH as getBmwModelBySlug, S as SITE_URL, aI as BMW_HUB_PATH, e as useSeo, p as pageGraph, b as buildWebPage, a as buildBreadcrumb, c as buildService, aJ as bmwModelPages, H as Header, L as LocalizedLink, G as Accordion, I as AccordionItem, J as AccordionTrigger, K as AccordionContent, f as Footer } from "../entry-server.js";
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
const heroImage = "/brand-logos/showcase/bmw.png";
const BmwModelPage = ({ modelSlugOverride }) => {
  const { modelSlug } = useParams();
  const model = getBmwModelBySlug(modelSlugOverride ?? modelSlug);
  const canonical = model ? `${SITE_URL}${BMW_HUB_PATH}/${model.slug}` : `${SITE_URL}${BMW_HUB_PATH}`;
  const breadcrumbId = `${canonical}#breadcrumb`;
  const serviceId = `${canonical}#service`;
  useSeo({
    title: (model == null ? void 0 : model.metaTitle) ?? "BMW Models | Digi-Tec Dubai",
    description: (model == null ? void 0 : model.metaDescription) ?? "BMW model-specific service and repair information from Digi-Tec Dubai.",
    canonical,
    ogImage: heroImage,
    ogImageAlt: model ? `${model.name} service and repair in Dubai` : "BMW service in Dubai",
    hasArabicVersion: false,
    jsonLd: model ? pageGraph([
      buildWebPage({ url: canonical, name: model.metaTitle, description: model.metaDescription, breadcrumbId, mainEntityId: serviceId, dateModified: "2026-08-31" }),
      buildBreadcrumb(canonical, [
        { name: "Home", url: `${SITE_URL}/` },
        { name: "BMW Service & Repair Dubai", url: `${SITE_URL}${BMW_HUB_PATH}` },
        { name: model.name, url: canonical }
      ]),
      buildService({ url: canonical, name: model.h1, serviceType: `${model.name} maintenance, diagnostics and repair`, description: model.metaDescription, brand: "BMW", offers: model.services.map((item) => item.label), areaServed: ["Dubai"] })
    ]) : void 0
  });
  if (!model) return /* @__PURE__ */ jsx(Navigate, { to: BMW_HUB_PATH, replace: true });
  const related = bmwModelPages.filter((item) => item.slug !== model.slug).slice(0, 4);
  const whatsappText = encodeURIComponent(`Hi, I would like to arrange a ${model.name} inspection. Model year: ____; concern: ____.`);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-black text-off-white", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsx("nav", { "aria-label": "Breadcrumb", className: "border-b border-white/5", children: /* @__PURE__ */ jsxs("ol", { className: "mx-auto flex max-w-7xl flex-wrap gap-2 px-4 py-4 text-xs text-white/50 sm:px-6", children: [
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(LocalizedLink, { to: "/", className: "hover:text-burnt-orange", children: "Home" }) }),
        /* @__PURE__ */ jsx("li", { "aria-hidden": "true", children: "/" }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(LocalizedLink, { to: BMW_HUB_PATH, className: "hover:text-burnt-orange", children: "BMW" }) }),
        /* @__PURE__ */ jsx("li", { "aria-hidden": "true", children: "/" }),
        /* @__PURE__ */ jsx("li", { className: "text-white/80", children: model.name })
      ] }) }),
      /* @__PURE__ */ jsxs("section", { className: "theme-dark-section relative isolate overflow-hidden border-b border-white/10 bg-gradient-to-br from-blue-950/40 via-black to-black", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute right-[8%] top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-blue-600/10 blur-3xl" }),
        /* @__PURE__ */ jsxs("div", { className: "relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1fr_0.35fr]", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "eyebrow mb-5", children: "BMW model expertise" }),
            /* @__PURE__ */ jsx("h1", { className: "max-w-4xl text-3xl font-black leading-tight sm:text-5xl lg:text-6xl", children: model.h1 }),
            /* @__PURE__ */ jsx("p", { className: "mt-6 max-w-3xl text-base leading-relaxed text-white/70 sm:text-lg", children: model.intro }),
            /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-col gap-3 sm:flex-row", children: [
              /* @__PURE__ */ jsxs("a", { className: "btn-primary", href: `https://wa.me/97143402223?text=${whatsappText}`, children: [
                /* @__PURE__ */ jsx(MessageCircle, { className: "h-4 w-4" }),
                " WhatsApp your concern"
              ] }),
              /* @__PURE__ */ jsxs("a", { className: "btn-secondary", href: "tel:+97143402223", children: [
                /* @__PURE__ */ jsx(Phone, { className: "h-4 w-4" }),
                " Call +971 4 340 2223"
              ] })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mt-4 text-xs text-white/45", children: "Scope statement: the VIN, generation, fitted hardware and reported concern determine available diagnostics, parts and repair work." })
          ] }),
          /* @__PURE__ */ jsx("img", { src: heroImage, alt: "BMW roundel", className: "mx-auto hidden w-52 drop-shadow-[0_20px_40px_rgba(30,100,255,0.25)] lg:block", width: "320", height: "320" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "py-14 sm:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
        /* @__PURE__ */ jsx("p", { className: "eyebrow mb-4", children: "Generation knowledge" }),
        /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-black sm:text-4xl", children: [
          model.name,
          " generations covered"
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-8 grid gap-5 md:grid-cols-3", children: model.generations.map((item) => /* @__PURE__ */ jsxs("article", { className: "card-premium rounded-2xl p-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold", children: item.code }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-relaxed text-white/60", children: item.detail })
        ] }, item.code)) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "border-y border-white/5 bg-charcoal/20 py-14 sm:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
        /* @__PURE__ */ jsx("p", { className: "eyebrow mb-4", children: "Model-specific systems" }),
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black sm:text-4xl", children: "What changes the service plan" }),
        /* @__PURE__ */ jsx("div", { className: "mt-8 grid gap-5 lg:grid-cols-3", children: model.sections.map((section) => /* @__PURE__ */ jsxs("article", { className: "card-premium rounded-2xl p-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold", children: section.title }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-relaxed text-white/60", children: section.summary }),
          /* @__PURE__ */ jsx("ul", { className: "mt-5 space-y-3", children: section.points.map((point) => /* @__PURE__ */ jsxs("li", { className: "flex gap-3 text-sm leading-relaxed text-white/70", children: [
            /* @__PURE__ */ jsx(CheckCircle2, { className: "mt-0.5 h-4 w-4 shrink-0 text-burnt-orange" }),
            /* @__PURE__ */ jsx("span", { children: point })
          ] }, point)) })
        ] }, section.title)) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "py-14 sm:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
        /* @__PURE__ */ jsx("p", { className: "eyebrow mb-4", children: "Start with the symptom" }),
        /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-black sm:text-4xl", children: [
          "Common ",
          model.name,
          " concerns"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-3xl text-sm leading-relaxed text-white/55", children: "These are possible diagnostic routes, not a remote diagnosis. Stop driving if there is overheating, low oil pressure, unsafe braking, severe vibration, smoke or another immediate safety risk." }),
        /* @__PURE__ */ jsx("div", { className: "mt-8 grid gap-5 md:grid-cols-3", children: model.symptoms.map((item) => /* @__PURE__ */ jsxs("article", { className: "rounded-2xl border border-white/10 bg-white/[0.025] p-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold", children: item.title }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-relaxed text-white/60", children: item.detail }),
          /* @__PURE__ */ jsxs(LocalizedLink, { to: item.servicePath, className: "mt-4 inline-flex items-center gap-1 text-sm font-semibold text-burnt-orange", children: [
            item.serviceLabel,
            " ",
            /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
          ] })
        ] }, item.title)) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "border-y border-white/5 bg-charcoal/15 py-14 sm:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
        /* @__PURE__ */ jsx("p", { className: "eyebrow mb-4", children: "Related BMW services" }),
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black sm:text-4xl", children: "Continue to the right commercial service" }),
        /* @__PURE__ */ jsx("div", { className: "mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4", children: model.services.map((item) => /* @__PURE__ */ jsxs(LocalizedLink, { to: item.path, className: "card-premium group rounded-2xl p-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold group-hover:text-burnt-orange", children: item.label }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-relaxed text-white/55", children: item.detail }),
          /* @__PURE__ */ jsxs("span", { className: "mt-4 inline-flex items-center gap-1 text-sm font-semibold text-burnt-orange", children: [
            "View service ",
            /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
          ] })
        ] }, item.path)) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "py-14 sm:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.7fr_1.3fr]", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "eyebrow mb-4", children: "Owner questions" }),
          /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-black sm:text-4xl", children: [
            model.name,
            " service FAQ"
          ] })
        ] }),
        /* @__PURE__ */ jsx(Accordion, { type: "single", collapsible: true, className: "space-y-3", children: model.faqs.map((faq, index) => /* @__PURE__ */ jsxs(AccordionItem, { value: `faq-${index}`, className: "rounded-xl border border-white/10 bg-white/[0.025] px-5", children: [
          /* @__PURE__ */ jsx(AccordionTrigger, { className: "text-left font-bold hover:text-burnt-orange", children: faq.question }),
          /* @__PURE__ */ jsx(AccordionContent, { className: "text-sm leading-relaxed text-white/65", children: faq.answer })
        ] }, faq.question)) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "border-t border-white/5 py-14 sm:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black sm:text-4xl", children: "Explore related BMW models" }),
        /* @__PURE__ */ jsx("div", { className: "mt-7 flex flex-wrap gap-3", children: related.map((item) => /* @__PURE__ */ jsx(LocalizedLink, { to: `${BMW_HUB_PATH}/${item.slug}`, className: "rounded-full border border-white/10 px-5 py-3 text-sm font-semibold hover:border-burnt-orange hover:text-burnt-orange", children: item.name }, item.slug)) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "bg-gradient-to-br from-blue-900/30 via-charcoal/30 to-black py-16", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-4xl px-4 text-center sm:px-6", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-3xl font-black sm:text-5xl", children: [
          "Book ",
          model.name,
          " service or diagnosis"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mx-auto mt-5 max-w-2xl text-white/65", children: "Send the VIN, year, mileage, warning text and when the symptom occurs so the workshop can prepare the right first inspection." }),
        /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-col justify-center gap-3 sm:flex-row", children: [
          /* @__PURE__ */ jsxs("a", { className: "btn-primary", href: `https://wa.me/97143402223?text=${whatsappText}`, children: [
            /* @__PURE__ */ jsx(MessageCircle, { className: "h-4 w-4" }),
            " WhatsApp Digi-Tec"
          ] }),
          /* @__PURE__ */ jsx(LocalizedLink, { className: "btn-secondary", to: BMW_HUB_PATH, children: "Return to BMW hub" })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
export {
  BmwModelPage as default
};
