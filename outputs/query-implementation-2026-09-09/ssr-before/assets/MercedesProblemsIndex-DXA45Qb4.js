import { jsxs, jsx } from "react/jsx-runtime";
import { ArrowRight, Gauge, Wrench, Snowflake, AlertTriangle } from "lucide-react";
import { p as pageGraph, ay as mercedesProblemGuides, S as SITE_URL, az as MERCEDES_PROBLEMS_PATH, b as buildWebPage, a as buildBreadcrumb, e as useSeo, H as Header, L as LocalizedLink, av as MERCEDES_HUB_PATH, f as Footer } from "../entry-server.js";
import "node:stream";
import "react-dom/server";
import "react-router-dom/server.mjs";
import "react-router-dom";
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
const categoryFor = (slug) => {
  if (slug.includes("airmatic") || slug.includes("suspension")) return { label: "Suspension", Icon: Gauge };
  if (slug.includes("gearbox") || slug.includes("transmission")) return { label: "Transmission", Icon: Wrench };
  if (slug.includes("ac-")) return { label: "Climate", Icon: Snowflake };
  return { label: "Engine & electrical", Icon: AlertTriangle };
};
const MercedesProblemsIndex = () => {
  const canonical = `${SITE_URL}${MERCEDES_PROBLEMS_PATH}`;
  const listId = `${canonical}#sitemap-list`;
  const metaTitle = "Mercedes Problems & Diagnostic Guides | Digi-Tec Dubai";
  const metaDescription = "Practical Mercedes owner guides for AIRMATIC, gearbox jerking, overheating, AC, oil leaks, no-start and battery warnings, with safe next steps.";
  const jsonLd = pageGraph([
    buildWebPage({
      url: canonical,
      name: metaTitle,
      description: metaDescription,
      type: "CollectionPage",
      breadcrumbId: `${canonical}#breadcrumb`,
      mainEntityId: listId,
      dateModified: "2026-08-31"
    }),
    buildBreadcrumb(canonical, [
      { name: "Home", url: `${SITE_URL}/` },
      { name: "Mercedes-Benz Repair & Service Dubai", url: `${SITE_URL}${MERCEDES_HUB_PATH}` },
      { name: "Mercedes Problems & Diagnostic Guides", url: canonical }
    ]),
    {
      "@type": "ItemList",
      "@id": listId,
      name: "Mercedes-Benz problem and diagnostic guides",
      numberOfItems: mercedesProblemGuides.length,
      itemListElement: mercedesProblemGuides.map((guide, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: guide.h1,
        item: `${SITE_URL}${guide.path}`
      }))
    }
  ]);
  useSeo({
    title: metaTitle,
    description: metaDescription,
    canonical,
    ogImage: "/images/mercedes-repair-dubai-hero.jpg",
    ogImageAlt: "Mercedes diagnostic and repair guides from Digi-Tec Performance Centre in Dubai",
    jsonLd,
    hasArabicVersion: false
  });
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-black text-off-white", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsx("nav", { "aria-label": "Breadcrumb", className: "border-b border-white/5", children: /* @__PURE__ */ jsxs("ol", { className: "mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-4 py-4 text-xs text-white/50 sm:px-6", children: [
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(LocalizedLink, { to: "/", className: "hover:text-burnt-orange", children: "Home" }) }),
        /* @__PURE__ */ jsx("li", { "aria-hidden": "true", children: "/" }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(LocalizedLink, { to: MERCEDES_HUB_PATH, className: "hover:text-burnt-orange", children: "Mercedes-Benz" }) }),
        /* @__PURE__ */ jsx("li", { "aria-hidden": "true", children: "/" }),
        /* @__PURE__ */ jsx("li", { className: "text-white/80", children: "Problems & guides" })
      ] }) }),
      /* @__PURE__ */ jsxs("section", { className: "relative isolate overflow-hidden border-b border-white/10 py-16 sm:py-24", children: [
        /* @__PURE__ */ jsx("img", { src: "/images/mercedes-repair-dubai-hero.jpg", alt: "Mercedes workshop diagnostics at Digi-Tec in Dubai", className: "absolute inset-0 h-full w-full object-cover opacity-20", width: "1920", height: "1080", loading: "eager" }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-black via-black/95 to-black/65" }),
        /* @__PURE__ */ jsxs("div", { className: "relative mx-auto max-w-7xl px-4 sm:px-6", children: [
          /* @__PURE__ */ jsx("p", { className: "eyebrow mb-5", children: "Owner-first diagnostic information" }),
          /* @__PURE__ */ jsx("h1", { className: "max-w-5xl text-3xl font-black leading-tight sm:text-5xl lg:text-6xl", children: "Mercedes Problems & Diagnostic Guides" }),
          /* @__PURE__ */ jsx("p", { className: "mt-6 max-w-4xl text-base leading-relaxed text-white/70 sm:text-xl", children: "Understand what the symptom feels like, what can cause it, when to stop driving and what evidence should support a repair recommendation. These guides inform; the linked service pages handle commercial repair intent." })
        ] })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "py-14 sm:py-20", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: /* @__PURE__ */ jsx("div", { className: "grid gap-5 md:grid-cols-2 lg:grid-cols-3", children: mercedesProblemGuides.map((guide) => {
        const { label, Icon } = categoryFor(guide.slug);
        return /* @__PURE__ */ jsxs(LocalizedLink, { to: guide.path, className: "card-premium group flex h-full flex-col rounded-2xl p-5 sm:p-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-4", children: [
            /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-burnt-orange", children: [
              /* @__PURE__ */ jsx(Icon, { className: "h-4 w-4" }),
              " ",
              label
            ] }),
            guide.urgent ? /* @__PURE__ */ jsx("span", { className: "text-[0.65rem] font-bold uppercase tracking-wider text-red-300", children: "Driving advice" }) : null
          ] }),
          /* @__PURE__ */ jsx("h2", { className: "mt-5 text-xl font-black group-hover:text-burnt-orange", children: guide.h1 }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 flex-1 text-sm leading-relaxed text-white/60", children: guide.summary }),
          /* @__PURE__ */ jsxs("span", { className: "mt-5 inline-flex items-center gap-1 text-sm font-semibold text-burnt-orange", children: [
            "Read diagnostic guide ",
            /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
          ] })
        ] }, guide.slug);
      }) }) }) }),
      /* @__PURE__ */ jsx("section", { className: "border-y border-white/5 bg-charcoal/20 py-14 sm:py-20", children: /* @__PURE__ */ jsx("div", { className: "mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-3", children: [
        ["1", "Identify the symptom", "Record the warning text, temperature, gear, speed, parking duration or other condition that makes it repeatable."],
        ["2", "Test the system", "Combine vehicle-compatible scan data with pressure, voltage, leak, wiring and physical checks relevant to the fault."],
        ["3", "Link to the repair", "Move to the commercial service page only after the likely system and appropriate repair route are understood."]
      ].map(([number, title, copy]) => /* @__PURE__ */ jsxs("article", { children: [
        /* @__PURE__ */ jsx("span", { className: "flex h-10 w-10 items-center justify-center rounded-full bg-burnt-orange font-black text-black", children: number }),
        /* @__PURE__ */ jsx("h2", { className: "mt-5 text-xl font-black", children: title }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-relaxed text-white/60", children: copy })
      ] }, number)) }) }),
      /* @__PURE__ */ jsx("section", { className: "py-14 sm:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl px-4 text-center sm:px-6", children: [
        /* @__PURE__ */ jsx("p", { className: "eyebrow mb-4", children: "Need commercial service information?" }),
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black sm:text-4xl", children: "Return to the Mercedes-Benz service hub" }),
        /* @__PURE__ */ jsx("p", { className: "mx-auto mt-4 max-w-3xl text-white/60", children: "The parent hub contains Digi-Tec service coverage, workshop information, booking options and links to the correct Mercedes commercial service page." }),
        /* @__PURE__ */ jsx(LocalizedLink, { to: MERCEDES_HUB_PATH, className: "btn-primary mt-8", children: "Explore Mercedes service & repair" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
export {
  MercedesProblemsIndex as default
};
