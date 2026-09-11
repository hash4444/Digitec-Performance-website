import { jsx, jsxs } from "react/jsx-runtime";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { useParams, Navigate } from "react-router-dom";
import { aC as getMercedesCaseStudy, S as SITE_URL, av as MERCEDES_HUB_PATH, p as pageGraph, b as buildWebPage, a as buildBreadcrumb, aj as buildArticle, e as useSeo, H as Header, L as LocalizedLink, f as Footer } from "../entry-server.js";
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
const MercedesCaseStudyPage = () => {
  var _a;
  const { slug } = useParams();
  const caseStudy = slug ? getMercedesCaseStudy(slug) : void 0;
  const canonical = caseStudy ? `${SITE_URL}/mercedes/case-studies/${caseStudy.slug}` : `${SITE_URL}${MERCEDES_HUB_PATH}`;
  const primaryImage = (_a = caseStudy == null ? void 0 : caseStudy.workshopImages[0]) == null ? void 0 : _a.src;
  const jsonLd = caseStudy ? pageGraph([
    buildWebPage({
      url: canonical,
      name: caseStudy.metaTitle,
      description: caseStudy.metaDescription,
      type: "ItemPage",
      breadcrumbId: `${canonical}#breadcrumb`,
      primaryImage,
      datePublished: caseStudy.datePublished,
      dateModified: caseStudy.dateModified,
      mainEntityId: `${canonical}#article`
    }),
    buildBreadcrumb(canonical, [
      { name: "Home", url: `${SITE_URL}/` },
      { name: "Mercedes-Benz Repair & Service Dubai", url: `${SITE_URL}${MERCEDES_HUB_PATH}` },
      { name: caseStudy.vehicle, url: canonical }
    ]),
    buildArticle({
      url: canonical,
      headline: caseStudy.title,
      description: caseStudy.metaDescription,
      datePublished: caseStudy.datePublished,
      dateModified: caseStudy.dateModified,
      author: "DIGI-TEC Workshop",
      authorType: "Organization",
      image: primaryImage,
      section: "Verified Mercedes repair case study",
      keywords: `${caseStudy.vehicle}, ${caseStudy.enginePlatform}, Mercedes repair case study Dubai`
    })
  ]) : void 0;
  useSeo({
    title: (caseStudy == null ? void 0 : caseStudy.metaTitle) ?? "Mercedes-Benz Repair Case Studies | Digi-Tec",
    description: (caseStudy == null ? void 0 : caseStudy.metaDescription) ?? "Verified Mercedes-Benz workshop case studies from Digi-Tec in Dubai.",
    canonical,
    ogImage: primaryImage,
    ogImageAlt: caseStudy ? `${caseStudy.vehicle} repair case study at Digi-Tec in Dubai` : void 0,
    ogType: "article",
    jsonLd,
    hasArabicVersion: false
  });
  if (!caseStudy) return /* @__PURE__ */ jsx(Navigate, { to: MERCEDES_HUB_PATH, replace: true });
  const sections = [
    ["Customer complaint", [caseStudy.customerComplaint]],
    ["Symptoms", caseStudy.symptoms],
    ["Initial inspection", caseStudy.initialInspection],
    ["Diagnostic process", caseStudy.diagnosticProcess],
    ["Fault identified", [caseStudy.faultIdentified]],
    ["Repair performed", caseStudy.repairPerformed],
    ["Parts and components used", caseStudy.partsComponentsUsed],
    ["Testing after repair", caseStudy.testingAfterRepair],
    ["Result", [caseStudy.result]]
  ];
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-black text-off-white", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsx("nav", { "aria-label": "Breadcrumb", className: "border-b border-white/5", children: /* @__PURE__ */ jsxs("ol", { className: "mx-auto flex max-w-6xl flex-wrap items-center gap-2 px-4 py-4 text-xs text-white/50 sm:px-6", children: [
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(LocalizedLink, { to: "/", className: "hover:text-burnt-orange", children: "Home" }) }),
        /* @__PURE__ */ jsx("li", { children: "/" }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(LocalizedLink, { to: MERCEDES_HUB_PATH, className: "hover:text-burnt-orange", children: "Mercedes-Benz" }) }),
        /* @__PURE__ */ jsx("li", { children: "/" }),
        /* @__PURE__ */ jsxs("li", { className: "text-white/80", children: [
          caseStudy.vehicle,
          " case study"
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "border-b border-white/10 bg-gradient-to-br from-charcoal/40 to-black py-16 sm:py-24", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl px-4 sm:px-6", children: [
        /* @__PURE__ */ jsx("p", { className: "eyebrow mb-5", children: "Real vehicle · documented workshop evidence" }),
        /* @__PURE__ */ jsx("h1", { className: "max-w-5xl text-3xl font-black sm:text-5xl", children: caseStudy.title }),
        /* @__PURE__ */ jsx("dl", { className: "mt-8 grid gap-4 sm:grid-cols-3", children: [
          ["Vehicle", caseStudy.vehicle],
          ["Model year", caseStudy.modelYear],
          ["Engine / platform", caseStudy.enginePlatform]
        ].map(([label, value]) => /* @__PURE__ */ jsxs("div", { className: "card-premium rounded-xl p-4", children: [
          /* @__PURE__ */ jsx("dt", { className: "text-xs font-bold uppercase tracking-wider text-burnt-orange", children: label }),
          /* @__PURE__ */ jsx("dd", { className: "mt-2 text-white/75", children: value })
        ] }, label)) })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20", children: [
        caseStudy.workshopImages.length > 0 ? /* @__PURE__ */ jsx("section", { "aria-label": "Workshop images", className: "mb-14 grid gap-5 sm:grid-cols-2", children: caseStudy.workshopImages.map((image) => /* @__PURE__ */ jsxs("figure", { className: "overflow-hidden rounded-2xl border border-white/10 bg-charcoal/20", children: [
          /* @__PURE__ */ jsx("img", { src: image.src, alt: image.alt, className: "aspect-[4/3] w-full object-cover", loading: "lazy" }),
          /* @__PURE__ */ jsx("figcaption", { className: "p-4 text-sm leading-relaxed text-white/55", children: image.caption })
        ] }, image.src)) }) : null,
        /* @__PURE__ */ jsx("div", { className: "space-y-10", children: sections.map(([title, items]) => /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black sm:text-3xl", children: title }),
          /* @__PURE__ */ jsx("ul", { className: "mt-5 space-y-3", children: items.map((item) => /* @__PURE__ */ jsxs("li", { className: "flex gap-3 leading-relaxed text-white/70", children: [
            /* @__PURE__ */ jsx(CheckCircle2, { className: "mt-1 h-4 w-4 shrink-0 text-burnt-orange" }),
            item
          ] }, item)) })
        ] }, title)) }),
        /* @__PURE__ */ jsxs("section", { className: "mt-14 border-t border-white/10 pt-10", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black", children: "Follow the evidence path" }),
          /* @__PURE__ */ jsx("div", { className: "mt-6 grid gap-4 sm:grid-cols-3", children: [caseStudy.relatedModel, caseStudy.relatedProblemGuide, caseStudy.relatedService].map((item) => /* @__PURE__ */ jsxs(LocalizedLink, { to: item.path, className: "card-premium group rounded-xl p-5 font-bold hover:text-burnt-orange", children: [
            item.label,
            " ",
            /* @__PURE__ */ jsx(ArrowRight, { className: "ml-1 inline h-4 w-4" })
          ] }, item.path)) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
export {
  MercedesCaseStudyPage as default
};
