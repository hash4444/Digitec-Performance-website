import { jsx, jsxs } from "react/jsx-runtime";
import { MessageCircle, Phone, CheckCircle2, ArrowRight } from "lucide-react";
import { useLocation, Navigate } from "react-router-dom";
import { aD as getAudiModelBySlug, aE as audiModelPath, aF as AUDI_HUB_PATH, d as buildFAQ, p as pageGraph, b as buildWebPage, a as buildBreadcrumb, S as SITE_URL, c as buildService, e as useSeo, aG as audiModelPages, H as Header, L as LocalizedLink, G as Accordion, I as AccordionItem, J as AccordionTrigger, K as AccordionContent, f as Footer } from "../entry-server.js";
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
const AudiModelPage = () => {
  const { pathname } = useLocation();
  const model = getAudiModelBySlug(pathname.split("/").filter(Boolean).pop());
  const path = model ? audiModelPath(model) : AUDI_HUB_PATH;
  const canonical = `${SITE_URL}${path}`;
  const faq = model ? buildFAQ(canonical, model.faqs.map((item) => ({ question: item.question, answer: item.answer }))) : null;
  const jsonLd = model ? pageGraph([
    buildWebPage({ url: canonical, name: model.metaTitle, description: model.metaDescription, breadcrumbId: `${canonical}#breadcrumb`, primaryImage: workshopImage, mainEntityId: `${canonical}#service`, dateModified: "2026-08-31" }),
    buildBreadcrumb(canonical, [
      { name: "Home", url: `${SITE_URL}/` },
      { name: "Brands", url: `${SITE_URL}/brands` },
      { name: "Audi", url: `${SITE_URL}${AUDI_HUB_PATH}` },
      { name: model.name, url: canonical }
    ]),
    buildService({ url: canonical, name: model.h1, serviceType: `${model.name} maintenance, diagnostics and repair`, description: model.metaDescription, image: workshopImage, brand: "Audi", offers: model.services.map((item) => item.label), areaServed: ["Dubai"] }),
    faq
  ]) : void 0;
  useSeo({ title: (model == null ? void 0 : model.metaTitle) ?? "Audi Models | Digi-Tec Dubai", description: (model == null ? void 0 : model.metaDescription) ?? "Audi model service and repair information from Digi-Tec in Dubai.", canonical, ogImage: workshopImage, ogImageAlt: model ? `${model.name} service and repair at Digi-Tec in Dubai` : void 0, jsonLd, hasArabicVersion: false });
  if (!model) return /* @__PURE__ */ jsx(Navigate, { to: AUDI_HUB_PATH, replace: true });
  const related = audiModelPages.filter((item) => item.slug !== model.slug && item.series === model.series).slice(0, 3);
  const whatsapp = encodeURIComponent(`Hi, I would like to arrange an ${model.name} inspection at Digi-Tec. Model year: ____; mileage: ____; issue: ____.`);
  const systemSections = [
    ["Vehicle coverage", model.generations],
    ["Engine systems", model.engines],
    ["Transmission & quattro", model.transmission],
    ["Suspension & chassis", model.suspension]
  ];
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-black text-off-white", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsx("nav", { "aria-label": "Breadcrumb", className: "border-b border-white/5", children: /* @__PURE__ */ jsxs("ol", { className: "mx-auto flex max-w-7xl flex-wrap gap-2 px-4 py-4 text-xs text-white/55 sm:px-6", children: [
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(LocalizedLink, { to: "/", className: "hover:text-burnt-orange", children: "Home" }) }),
        /* @__PURE__ */ jsx("li", { children: "/" }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(LocalizedLink, { to: "/brands", className: "hover:text-burnt-orange", children: "Brands" }) }),
        /* @__PURE__ */ jsx("li", { children: "/" }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(LocalizedLink, { to: AUDI_HUB_PATH, className: "hover:text-burnt-orange", children: "Audi" }) }),
        /* @__PURE__ */ jsx("li", { children: "/" }),
        /* @__PURE__ */ jsx("li", { className: "text-white/85", children: model.name })
      ] }) }),
      /* @__PURE__ */ jsxs("section", { className: "theme-dark-section relative isolate overflow-hidden border-b border-white/10", children: [
        /* @__PURE__ */ jsx("img", { src: workshopImage, alt: "", className: "absolute inset-0 h-full w-full object-cover opacity-20" }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/60" }),
        /* @__PURE__ */ jsxs("div", { className: "relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24", children: [
          /* @__PURE__ */ jsxs("p", { className: "eyebrow mb-5", children: [
            "Audi ",
            model.series,
            " expertise"
          ] }),
          /* @__PURE__ */ jsx("h1", { className: "max-w-4xl text-3xl font-black leading-tight sm:text-5xl lg:text-6xl", children: model.h1 }),
          /* @__PURE__ */ jsx("p", { className: "mt-6 max-w-3xl text-base leading-relaxed text-white/70 sm:text-lg", children: model.intro }),
          /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-col gap-3 sm:flex-row", children: [
            /* @__PURE__ */ jsxs("a", { className: "btn-primary", href: `https://wa.me/97143402223?text=${whatsapp}`, children: [
              /* @__PURE__ */ jsx(MessageCircle, { className: "h-4 w-4" }),
              " Book Audi inspection"
            ] }),
            /* @__PURE__ */ jsxs("a", { className: "btn-secondary", href: "tel:+97143402223", children: [
              /* @__PURE__ */ jsx(Phone, { className: "h-4 w-4" }),
              " Call +971 4 340 2223"
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-4 text-xs text-white/45", children: "Include the VIN, year, mileage, warning text and when the issue occurs. The appropriate inspection is confirmed for the exact vehicle." })
        ] })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "py-14 sm:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-10 max-w-3xl", children: [
          /* @__PURE__ */ jsx("p", { className: "eyebrow mb-4", children: "Model-specific service" }),
          /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-black sm:text-4xl", children: [
            "What changes the ",
            model.name,
            " repair plan"
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid gap-5 lg:grid-cols-2", children: systemSections.map(([title, copy]) => /* @__PURE__ */ jsxs("article", { className: "card-premium rounded-2xl p-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-black", children: title }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-relaxed text-white/65", children: copy })
        ] }, title)) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "border-y border-white/5 bg-charcoal/20 py-14 sm:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "eyebrow mb-4", children: "Common concerns" }),
          /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-black sm:text-4xl", children: [
            "Audi ",
            model.name.replace("Audi ", ""),
            " problems that need diagnosis"
          ] }),
          /* @__PURE__ */ jsx("ul", { className: "mt-6 space-y-4", children: model.commonProblems.map((item) => /* @__PURE__ */ jsxs("li", { className: "flex gap-3 text-sm leading-relaxed text-white/70", children: [
            /* @__PURE__ */ jsx(CheckCircle2, { className: "mt-0.5 h-5 w-5 shrink-0 text-burnt-orange" }),
            item
          ] }, item)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-burnt-orange/25 bg-burnt-orange/5 p-6", children: [
          /* @__PURE__ */ jsx("p", { className: "eyebrow mb-4", children: "Dubai ownership" }),
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-black", children: "Preventive checks that make sense locally" }),
          /* @__PURE__ */ jsx("ul", { className: "mt-5 space-y-4", children: model.dubaiCare.map((item) => /* @__PURE__ */ jsxs("li", { className: "flex gap-3 text-sm leading-relaxed text-white/70", children: [
            /* @__PURE__ */ jsx(CheckCircle2, { className: "mt-0.5 h-5 w-5 shrink-0 text-burnt-orange" }),
            item
          ] }, item)) }),
          /* @__PURE__ */ jsx("h3", { className: "mt-7 font-bold", children: "Book promptly if you notice" }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-relaxed text-white/60", children: model.warningSigns.join(" · ") })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "py-14 sm:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
        /* @__PURE__ */ jsx("p", { className: "eyebrow mb-4", children: "Relevant service pages" }),
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black sm:text-4xl", children: "The next step after diagnosis" }),
        /* @__PURE__ */ jsx("div", { className: "mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4", children: model.services.map((item) => /* @__PURE__ */ jsxs(LocalizedLink, { to: item.path, className: "card-premium group rounded-2xl p-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold group-hover:text-burnt-orange", children: item.label }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-relaxed text-white/60", children: item.description }),
          /* @__PURE__ */ jsxs("span", { className: "mt-4 inline-flex items-center gap-1 text-sm font-semibold text-burnt-orange", children: [
            "View service ",
            /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
          ] })
        ] }, item.path)) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "border-y border-white/5 py-14 sm:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.7fr_1.3fr]", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "eyebrow mb-4", children: "Direct answers" }),
          /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-black sm:text-4xl", children: [
            model.name,
            " FAQ"
          ] })
        ] }),
        /* @__PURE__ */ jsx(Accordion, { type: "single", collapsible: true, className: "space-y-3", children: model.faqs.map((item, index) => /* @__PURE__ */ jsxs(AccordionItem, { value: `faq-${index}`, className: "rounded-xl border border-white/10 bg-white/[0.025] px-5", children: [
          /* @__PURE__ */ jsx(AccordionTrigger, { className: "text-left font-bold hover:text-burnt-orange", children: item.question }),
          /* @__PURE__ */ jsx(AccordionContent, { className: "text-sm leading-relaxed text-white/65", children: item.answer })
        ] }, item.question)) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "bg-gradient-to-br from-burnt-orange/20 via-charcoal/30 to-black py-14 sm:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl px-4 text-center sm:px-6", children: [
        /* @__PURE__ */ jsx("p", { className: "eyebrow mb-4", children: "Clear booking information" }),
        /* @__PURE__ */ jsxs("h2", { className: "text-3xl font-black sm:text-5xl", children: [
          "Request ",
          model.name,
          " service or diagnosis"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mx-auto mt-5 max-w-3xl text-sm leading-relaxed text-white/65", children: "Tell us the model year, mileage and issue, then Digi-Tec can confirm the suitable inspection and available scope before work begins." }),
        /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-col justify-center gap-3 sm:flex-row", children: [
          /* @__PURE__ */ jsxs("a", { className: "btn-primary", href: `https://wa.me/97143402223?text=${whatsapp}`, children: [
            /* @__PURE__ */ jsx(MessageCircle, { className: "h-4 w-4" }),
            " WhatsApp workshop"
          ] }),
          /* @__PURE__ */ jsx(LocalizedLink, { className: "btn-secondary", to: AUDI_HUB_PATH, children: "Return to Audi hub" })
        ] })
      ] }) }),
      related.length ? /* @__PURE__ */ jsx("section", { className: "py-12", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-black", children: "Related Audi model pages" }),
        /* @__PURE__ */ jsx("div", { className: "mt-5 flex flex-wrap gap-3", children: related.map((item) => /* @__PURE__ */ jsxs(LocalizedLink, { to: audiModelPath(item), className: "rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/65 hover:text-burnt-orange", children: [
          item.name,
          " ",
          /* @__PURE__ */ jsx(ArrowRight, { className: "ml-1 inline h-3.5 w-3.5" })
        ] }, item.slug)) })
      ] }) }) : null
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
export {
  AudiModelPage as default
};
