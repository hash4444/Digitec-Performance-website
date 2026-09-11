import { jsx, jsxs } from "react/jsx-runtime";
import { CheckCircle2, ShieldAlert, AlertTriangle, Stethoscope, ArrowRight, MessageCircle } from "lucide-react";
import { useParams, Navigate } from "react-router-dom";
import { ay as getMercedesProblemGuide, S as SITE_URL, ax as MERCEDES_PROBLEMS_PATH, p as pageGraph, b as buildWebPage, a as buildBreadcrumb, au as MERCEDES_HUB_PATH, aj as buildArticle, e as useSeo, aw as mercedesProblemGuides, H as Header, L as LocalizedLink, G as Accordion, I as AccordionItem, J as AccordionTrigger, K as AccordionContent, f as Footer, az as MERCEDES_GUIDE_PUBLISHED } from "../entry-server.js";
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
const guideImage = "/images/mercedes-repair-dubai-hero.jpg";
const MercedesProblemGuidePage = () => {
  const { slug } = useParams();
  const guide = slug ? getMercedesProblemGuide(slug) : void 0;
  const canonical = guide ? `${SITE_URL}${guide.path}` : `${SITE_URL}${MERCEDES_PROBLEMS_PATH}`;
  const articleId = `${canonical}#article`;
  const jsonLd = guide ? pageGraph([
    buildWebPage({
      url: canonical,
      name: guide.metaTitle,
      description: guide.metaDescription,
      type: "ItemPage",
      breadcrumbId: `${canonical}#breadcrumb`,
      primaryImage: guideImage,
      datePublished: MERCEDES_GUIDE_PUBLISHED,
      dateModified: MERCEDES_GUIDE_PUBLISHED,
      mainEntityId: articleId
    }),
    buildBreadcrumb(canonical, [
      { name: "Home", url: `${SITE_URL}/` },
      { name: "Mercedes-Benz Repair & Service Dubai", url: `${SITE_URL}${MERCEDES_HUB_PATH}` },
      { name: "Mercedes Problems & Guides", url: `${SITE_URL}${MERCEDES_PROBLEMS_PATH}` },
      { name: guide.h1, url: canonical }
    ]),
    buildArticle({
      url: canonical,
      headline: guide.title,
      description: guide.summary,
      datePublished: MERCEDES_GUIDE_PUBLISHED,
      dateModified: MERCEDES_GUIDE_PUBLISHED,
      author: "DIGI-TEC Workshop",
      authorType: "Organization",
      image: guideImage,
      section: "Mercedes diagnostic guides",
      keywords: `${guide.h1}, Mercedes diagnostics Dubai, Mercedes warning guide`
    })
  ]) : void 0;
  useSeo({
    title: (guide == null ? void 0 : guide.metaTitle) ?? "Mercedes Problems & Diagnostic Guides | Digi-Tec",
    description: (guide == null ? void 0 : guide.metaDescription) ?? "Mercedes-Benz symptom and diagnostic guides from Digi-Tec in Dubai.",
    canonical,
    ogImage: guideImage,
    ogImageAlt: guide ? `${guide.h1} diagnostic guide from Digi-Tec in Dubai` : void 0,
    ogType: "article",
    jsonLd,
    hasArabicVersion: false
  });
  if (!guide) return /* @__PURE__ */ jsx(Navigate, { to: MERCEDES_PROBLEMS_PATH, replace: true });
  const index = mercedesProblemGuides.findIndex((item) => item.slug === guide.slug);
  const adjacent = [mercedesProblemGuides[index - 1], mercedesProblemGuides[index + 1]].filter(Boolean);
  const whatsappText = encodeURIComponent(`Hi, I need a Mercedes diagnostic appointment. The symptom is: ${guide.h1}. My model/year is ____.`);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-black text-off-white", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsx("nav", { "aria-label": "Breadcrumb", className: "border-b border-white/5", children: /* @__PURE__ */ jsxs("ol", { className: "mx-auto flex max-w-6xl flex-wrap items-center gap-2 px-4 py-4 text-xs text-white/50 sm:px-6", children: [
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(LocalizedLink, { to: "/", className: "hover:text-burnt-orange", children: "Home" }) }),
        /* @__PURE__ */ jsx("li", { "aria-hidden": "true", children: "/" }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(LocalizedLink, { to: MERCEDES_HUB_PATH, className: "hover:text-burnt-orange", children: "Mercedes-Benz" }) }),
        /* @__PURE__ */ jsx("li", { "aria-hidden": "true", children: "/" }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(LocalizedLink, { to: MERCEDES_PROBLEMS_PATH, className: "hover:text-burnt-orange", children: "Problems & guides" }) }),
        /* @__PURE__ */ jsx("li", { "aria-hidden": "true", children: "/" }),
        /* @__PURE__ */ jsx("li", { className: "text-white/80", children: guide.h1 })
      ] }) }),
      /* @__PURE__ */ jsxs("section", { className: "relative isolate overflow-hidden border-b border-white/10 py-16 sm:py-24", children: [
        /* @__PURE__ */ jsx("img", { src: guideImage, alt: "Mercedes diagnostic inspection inside the Digi-Tec workshop in Dubai", className: "absolute inset-0 h-full w-full object-cover opacity-20", width: "1920", height: "1080", loading: "eager" }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-black via-black/95 to-black/65" }),
        /* @__PURE__ */ jsxs("div", { className: "relative mx-auto max-w-5xl px-4 sm:px-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-5 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.18em]", children: [
            /* @__PURE__ */ jsx("span", { className: "rounded-full border border-burnt-orange/35 bg-burnt-orange/10 px-3 py-1.5 text-burnt-orange", children: "Informational diagnostic guide" }),
            guide.urgent ? /* @__PURE__ */ jsx("span", { className: "rounded-full border border-red-400/30 bg-red-500/10 px-3 py-1.5 text-red-200", children: "Driving risk included" }) : null
          ] }),
          /* @__PURE__ */ jsx("h1", { className: "max-w-4xl text-3xl font-black leading-tight sm:text-5xl lg:text-6xl", children: guide.h1 }),
          /* @__PURE__ */ jsx("p", { className: "mt-6 max-w-4xl text-base leading-relaxed text-white/70 sm:text-xl", children: guide.summary }),
          /* @__PURE__ */ jsx("p", { className: "mt-6 text-sm text-white/45", children: "Reviewed for diagnostic intent on 31 August 2026 · This guide does not replace inspection of the exact vehicle." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,1fr)_19rem]", children: [
        /* @__PURE__ */ jsxs("article", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxs("section", { className: "rounded-2xl border border-burnt-orange/30 bg-burnt-orange/[0.08] p-5 sm:p-7", "aria-labelledby": "short-answer-heading", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs font-bold uppercase tracking-[0.2em] text-burnt-orange", children: "Short answer" }),
            /* @__PURE__ */ jsx("h2", { id: "short-answer-heading", className: "mt-3 text-xl font-black sm:text-2xl", children: "The symptom is evidence, not a parts diagnosis" }),
            /* @__PURE__ */ jsx("p", { className: "mt-3 leading-relaxed text-white/70", children: guide.summary })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-12 space-y-12", children: [
            guide.sections.map((section) => {
              var _a;
              return /* @__PURE__ */ jsxs("section", { children: [
                /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black sm:text-3xl", children: section.title }),
                /* @__PURE__ */ jsx("div", { className: "mt-4 space-y-4", children: section.paragraphs.map((paragraph) => /* @__PURE__ */ jsx("p", { className: "leading-relaxed text-white/70", children: paragraph }, paragraph)) }),
                ((_a = section.points) == null ? void 0 : _a.length) ? /* @__PURE__ */ jsx("ul", { className: "mt-5 grid gap-3 sm:grid-cols-2", children: section.points.map((point) => /* @__PURE__ */ jsxs("li", { className: "flex gap-3 rounded-xl border border-white/10 bg-white/[0.025] p-4 text-sm leading-relaxed text-white/65", children: [
                  /* @__PURE__ */ jsx(CheckCircle2, { className: "mt-0.5 h-4 w-4 shrink-0 text-burnt-orange", "aria-hidden": "true" }),
                  /* @__PURE__ */ jsx("span", { children: point })
                ] }, point)) }) : null
              ] }, section.title);
            }),
            /* @__PURE__ */ jsx("section", { className: "rounded-2xl border border-red-400/25 bg-red-500/[0.07] p-5 sm:p-7", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsx(ShieldAlert, { className: "mt-0.5 h-6 w-6 shrink-0 text-red-300", "aria-hidden": "true" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h2", { className: "text-xl font-black sm:text-2xl", children: "Should you continue driving?" }),
                /* @__PURE__ */ jsx("p", { className: "mt-3 leading-relaxed text-white/70", children: guide.driveAdvice })
              ] })
            ] }) }),
            /* @__PURE__ */ jsxs("section", { children: [
              /* @__PURE__ */ jsx("p", { className: "eyebrow mb-4", children: "Evidence-led process" }),
              /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black sm:text-3xl", children: "How this Mercedes symptom should be diagnosed" }),
              /* @__PURE__ */ jsx("ol", { className: "mt-6 space-y-4", children: guide.diagnosticSteps.map((step, stepIndex) => /* @__PURE__ */ jsxs("li", { className: "grid grid-cols-[2.25rem_1fr] gap-4 rounded-xl border border-white/10 bg-white/[0.025] p-4 sm:p-5", children: [
                /* @__PURE__ */ jsx("span", { className: "flex h-9 w-9 items-center justify-center rounded-full bg-burnt-orange text-sm font-black text-black", children: stepIndex + 1 }),
                /* @__PURE__ */ jsx("p", { className: "pt-1.5 text-sm leading-relaxed text-white/70 sm:text-base", children: step })
              ] }, step)) })
            ] }),
            /* @__PURE__ */ jsx("section", { className: "rounded-2xl border border-white/10 bg-charcoal/25 p-5 sm:p-7", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsx(AlertTriangle, { className: "mt-0.5 h-6 w-6 shrink-0 text-burnt-orange", "aria-hidden": "true" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h2", { className: "text-xl font-black sm:text-2xl", children: "Why a fault code does not prove a component failed" }),
                /* @__PURE__ */ jsx("p", { className: "mt-3 leading-relaxed text-white/70", children: guide.faultCodeNote })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx("section", { children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsx(Stethoscope, { className: "mt-0.5 h-6 w-6 shrink-0 text-burnt-orange", "aria-hidden": "true" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black sm:text-3xl", children: "When professional diagnosis is appropriate" }),
                /* @__PURE__ */ jsx("p", { className: "mt-4 leading-relaxed text-white/70", children: guide.professionalHelp })
              ] })
            ] }) }),
            /* @__PURE__ */ jsxs("section", { children: [
              /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black sm:text-3xl", children: "Frequently asked questions" }),
              /* @__PURE__ */ jsx(Accordion, { type: "single", collapsible: true, className: "mt-6 space-y-3", children: guide.faqs.map((faq, faqIndex) => /* @__PURE__ */ jsxs(AccordionItem, { value: `faq-${faqIndex}`, className: "rounded-xl border border-white/10 bg-white/[0.025] px-5", children: [
                /* @__PURE__ */ jsx(AccordionTrigger, { className: "text-left font-bold hover:text-burnt-orange", children: faq.question }),
                /* @__PURE__ */ jsx(AccordionContent, { className: "text-sm leading-relaxed text-white/65", children: faq.answer })
              ] }, faq.question)) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("aside", { className: "space-y-5 lg:sticky lg:top-24 lg:self-start", children: [
          /* @__PURE__ */ jsxs("section", { className: "rounded-2xl border border-burnt-orange/30 bg-burnt-orange/[0.08] p-5", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs font-bold uppercase tracking-[0.18em] text-burnt-orange", children: "After diagnosis" }),
            /* @__PURE__ */ jsx("h2", { className: "mt-3 text-lg font-black", children: "Related commercial service" }),
            /* @__PURE__ */ jsx("div", { className: "mt-4 space-y-4", children: guide.relatedServices.map((item) => /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(LocalizedLink, { to: item.path, className: "font-bold text-off-white hover:text-burnt-orange", children: item.label }),
              /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs leading-relaxed text-white/55", children: item.description })
            ] }, item.path)) })
          ] }),
          /* @__PURE__ */ jsxs("section", { className: "rounded-2xl border border-white/10 bg-white/[0.025] p-5", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-lg font-black", children: "Relevant model pages" }),
            /* @__PURE__ */ jsx("ul", { className: "mt-4 space-y-3", children: guide.relatedModels.map((item) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(LocalizedLink, { to: item.path, className: "inline-flex items-center gap-1 text-sm text-white/65 hover:text-burnt-orange", children: [
              item.label,
              " ",
              /* @__PURE__ */ jsx(ArrowRight, { className: "h-3.5 w-3.5" })
            ] }) }, item.path)) })
          ] }),
          /* @__PURE__ */ jsxs("section", { className: "rounded-2xl border border-white/10 bg-white/[0.025] p-5", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-lg font-black", children: "Need the symptom checked?" }),
            /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-relaxed text-white/55", children: "Send the model, year, VIN, warning text and when it occurs. Digi-Tec can confirm the appropriate first inspection." }),
            /* @__PURE__ */ jsxs("a", { href: `https://wa.me/97143402223?text=${whatsappText}`, className: "mt-5 inline-flex items-center gap-2 font-bold text-burnt-orange hover:text-off-white", children: [
              /* @__PURE__ */ jsx(MessageCircle, { className: "h-4 w-4" }),
              " WhatsApp Digi-Tec"
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "border-t border-white/5 py-12 sm:py-16", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl px-4 sm:px-6", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-black sm:text-2xl", children: "Continue through the Mercedes knowledge cluster" }),
        /* @__PURE__ */ jsx("div", { className: "mt-6 grid gap-4 md:grid-cols-2", children: adjacent.map((item) => /* @__PURE__ */ jsxs(LocalizedLink, { to: item.path, className: "card-premium group rounded-2xl p-5", children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs font-bold uppercase tracking-[0.18em] text-burnt-orange", children: "Diagnostic guide" }),
          /* @__PURE__ */ jsx("h3", { className: "mt-2 font-bold group-hover:text-burnt-orange", children: item.h1 }),
          /* @__PURE__ */ jsxs("span", { className: "mt-3 inline-flex items-center gap-1 text-sm text-white/55", children: [
            "Read guide ",
            /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
          ] })
        ] }, item.path)) }),
        /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsx(LocalizedLink, { to: MERCEDES_PROBLEMS_PATH, className: "btn-secondary", children: "All Mercedes problem guides" }),
          /* @__PURE__ */ jsx(LocalizedLink, { to: MERCEDES_HUB_PATH, className: "btn-secondary", children: "Mercedes service hub" })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
export {
  MercedesProblemGuidePage as default
};
