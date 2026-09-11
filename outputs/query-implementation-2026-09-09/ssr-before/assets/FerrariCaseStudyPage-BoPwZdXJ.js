import { jsx, jsxs } from "react/jsx-runtime";
import { CheckCircle2, ArrowRight, MessageCircle } from "lucide-react";
import { useParams, Navigate } from "react-router-dom";
import { aP as getFerrariCaseStudyBySlug, aN as FERRARI_HUB_PATH, p as pageGraph, a as buildBreadcrumb, b as buildWebPage, aj as buildArticle, e as useSeo, S as SITE_URL, H as Header, L as LocalizedLink, f as Footer } from "../entry-server.js";
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
const FerrariCaseStudyPage = () => {
  var _a, _b;
  const { slug } = useParams();
  const study = slug ? getFerrariCaseStudyBySlug(slug) : void 0;
  const path = study ? `/ferrari/case-studies/${study.slug}` : FERRARI_HUB_PATH;
  const canonical = `${SITE_URL}${path}`;
  const jsonLd = study ? pageGraph([
    buildBreadcrumb(path, [
      { name: "Home", url: "/" },
      { name: "Ferrari service Dubai", url: FERRARI_HUB_PATH },
      { name: study.title, url: path }
    ]),
    buildWebPage({
      url: path,
      name: study.title,
      description: `${study.vehicle}: ${study.customerComplaint}`,
      type: "ItemPage",
      breadcrumbId: `${canonical}#breadcrumb`,
      primaryImage: (_a = study.images[0]) == null ? void 0 : _a.src,
      mainEntityId: `${canonical}#article`
    }),
    buildArticle({
      url: path,
      headline: study.title,
      description: `${study.vehicle}: ${study.customerComplaint}`,
      datePublished: "2026-08-31",
      author: "DIGI-TEC Workshop",
      authorType: "Organization",
      image: (_b = study.images[0]) == null ? void 0 : _b.src,
      section: "Verified Ferrari case studies",
      keywords: `${study.vehicle}, Ferrari diagnostics Dubai, Ferrari case study`
    })
  ]) : void 0;
  useSeo({
    title: study ? `${study.title} | DIGI-TEC Dubai` : "Ferrari Case Studies | DIGI-TEC Dubai",
    description: study ? `${study.vehicle}: ${study.customerComplaint}` : "Verified Ferrari workshop case studies from DIGI-TEC Performance Centre in Dubai.",
    canonical,
    noindex: !study,
    jsonLd,
    hasArabicVersion: false
  });
  if (!study) return /* @__PURE__ */ jsx(Navigate, { to: FERRARI_HUB_PATH, replace: true });
  const sections = [
    ["Customer complaint", [study.customerComplaint]],
    ["Symptoms", study.symptoms],
    ["Initial inspection", study.initialInspection],
    ["Diagnostic findings", study.diagnosticFindings],
    ["Confirmed cause", [study.cause]],
    ["Recommended repair", study.recommendedRepair],
    ["Work performed", study.workPerformed],
    ["Post-repair verification", study.verification]
  ];
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-black text-off-white", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsx("nav", { "aria-label": "Breadcrumb", className: "border-b border-white/5", children: /* @__PURE__ */ jsxs("ol", { className: "mx-auto flex max-w-6xl flex-wrap items-center gap-2 px-4 py-4 text-xs text-white/50 sm:px-6", children: [
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(LocalizedLink, { to: "/", className: "hover:text-burnt-orange", children: "Home" }) }),
        /* @__PURE__ */ jsx("li", { children: "/" }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(LocalizedLink, { to: FERRARI_HUB_PATH, className: "hover:text-burnt-orange", children: "Ferrari" }) }),
        /* @__PURE__ */ jsx("li", { children: "/" }),
        /* @__PURE__ */ jsx("li", { className: "text-white/80", children: "Case study" })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "border-b border-white/5 bg-gradient-to-br from-charcoal/30 to-black py-16 sm:py-24", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl px-4 sm:px-6", children: [
        /* @__PURE__ */ jsx("p", { className: "eyebrow mb-4", children: "Verified workshop case study" }),
        /* @__PURE__ */ jsx("h1", { className: "max-w-5xl text-3xl font-black sm:text-5xl", children: study.title }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-wrap gap-3 text-sm text-white/55", children: [
          /* @__PURE__ */ jsx("span", { className: "rounded-full border border-white/10 px-4 py-2", children: study.vehicle }),
          /* @__PURE__ */ jsxs("span", { className: "rounded-full border border-white/10 px-4 py-2", children: [
            "Model year ",
            study.modelYear
          ] }),
          /* @__PURE__ */ jsx("span", { className: "rounded-full border border-white/10 px-4 py-2", children: study.enginePlatform })
        ] })
      ] }) }),
      study.images.length > 0 && /* @__PURE__ */ jsx("section", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "mx-auto grid max-w-6xl gap-5 px-4 sm:grid-cols-2 sm:px-6", children: study.images.map((image) => /* @__PURE__ */ jsx("img", { src: image.src, alt: image.alt, className: "w-full rounded-2xl border border-white/10 object-cover", loading: "lazy" }, image.src)) }) }),
      /* @__PURE__ */ jsx("section", { className: "py-14 sm:py-20", children: /* @__PURE__ */ jsx("div", { className: "mx-auto grid max-w-6xl gap-5 px-4 sm:px-6 lg:grid-cols-2", children: sections.map(([title, items]) => /* @__PURE__ */ jsxs("article", { className: "card-premium rounded-2xl p-6", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-black", children: title }),
        /* @__PURE__ */ jsx("ul", { className: "mt-4 space-y-3", children: items.map((item) => /* @__PURE__ */ jsxs("li", { className: "flex gap-3 text-sm leading-relaxed text-white/65", children: [
          /* @__PURE__ */ jsx(CheckCircle2, { className: "mt-0.5 h-4 w-4 shrink-0 text-burnt-orange" }),
          /* @__PURE__ */ jsx("span", { children: item })
        ] }, item)) })
      ] }, title)) }) }),
      /* @__PURE__ */ jsx("section", { className: "border-y border-white/5 bg-charcoal/15 py-12", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl px-4 sm:px-6", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black", children: "Related Ferrari information" }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-wrap gap-3", children: [
          study.relatedModelPath && /* @__PURE__ */ jsxs(LocalizedLink, { to: study.relatedModelPath, className: "btn-secondary", children: [
            "Model guide ",
            /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
          ] }),
          [...study.relatedServicePaths, ...study.relatedGuidePaths].map((relatedPath) => /* @__PURE__ */ jsxs(LocalizedLink, { to: relatedPath, className: "btn-secondary", children: [
            "Related page ",
            /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
          ] }, relatedPath))
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "py-16 text-center", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-4xl px-4 sm:px-6", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-black", children: "Discuss a Ferrari concern with DIGI-TEC" }),
        /* @__PURE__ */ jsx("p", { className: "mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/60", children: "A case study documents one verified vehicle and is not a promise that another vehicle has the same cause or repair." }),
        /* @__PURE__ */ jsxs("a", { href: "https://wa.me/97143402223", target: "_blank", rel: "noopener noreferrer", className: "btn-primary mt-7", children: [
          /* @__PURE__ */ jsx(MessageCircle, { className: "h-4 w-4" }),
          " WhatsApp DIGI-TEC"
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
export {
  FerrariCaseStudyPage as default
};
