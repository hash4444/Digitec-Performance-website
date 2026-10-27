import { jsx, jsxs } from "react/jsx-runtime";
import { useLocation, Navigate } from "react-router-dom";
import { H as Header, F as Footer } from "./Footer-D0Xl6ot8.js";
import { l as getTuningModelByPath, n as getTuningModelCars, S as SITE_URL, j as stageLabels, p as pageGraph, a as buildWebPage, g as buildBreadcrumb, h as buildService, c as buildFAQ, d as useSeo, L as LocalizedLink } from "../entry-server.js";
import { T as TuningConfigurationDetails } from "./TuningConfigurationDetails-BVfdP4Ia.js";
import "react";
import "lucide-react";
import "node:stream";
import "react-dom/server";
import "react-router-dom/server.mjs";
import "@radix-ui/react-toast";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "next-themes";
import "sonner";
import "@radix-ui/react-tooltip";
import "@tanstack/react-query";
const TuningModelPage = () => {
  var _a, _b;
  const { pathname } = useLocation();
  const model = getTuningModelByPath(pathname);
  const cars = model ? getTuningModelCars(model) : [];
  const canonical = `${SITE_URL}${(model == null ? void 0 : model.path) ?? "/tuning"}`;
  const stageNames = [...new Set(cars.flatMap((car) => car.availableStages.filter((stage) => stage !== "stock").map((stage) => stageLabels[stage])))];
  const graph = model ? pageGraph([
    buildWebPage({
      url: canonical,
      name: model.metaTitle,
      description: model.metaDescription,
      breadcrumbId: `${canonical}#breadcrumb`,
      primaryImage: model.image,
      mainEntityId: `${canonical}#service`
    }),
    buildBreadcrumb(canonical, [
      { name: "Home", url: `${SITE_URL}/` },
      { name: "Performance Tuning Dubai", url: `${SITE_URL}/tuning` },
      { name: model.shortName, url: canonical }
    ]),
    buildService({
      url: canonical,
      name: model.h1,
      serviceType: `${model.name} ECU tuning and configuration-specific performance packages`,
      description: model.metaDescription,
      image: model.image,
      brand: ((_a = cars[0]) == null ? void 0 : _a.brand) === "Mercedes" ? "Mercedes-Benz" : (_b = cars[0]) == null ? void 0 : _b.brand,
      offers: stageNames.map((stage) => `${model.shortName} ${stage} package`),
      areaServed: ["Dubai"]
    }),
    buildFAQ(canonical, model.faqs)
  ]) : void 0;
  useSeo({
    title: (model == null ? void 0 : model.metaTitle) ?? "Performance Tuning Dubai | Digi-Tec",
    description: (model == null ? void 0 : model.metaDescription) ?? "Vehicle-specific performance tuning packages at DIGI-TEC in Al Quoz, Dubai.",
    canonical,
    ogImage: (model == null ? void 0 : model.image) ?? "/images/tuning-hero-bg.jpg",
    ogImageAlt: model ? `${model.name} listed in the DIGI-TEC Performance Configurator` : void 0,
    hasArabicVersion: false,
    jsonLd: graph
  });
  if (!model || cars.length !== model.carIds.length) return /* @__PURE__ */ jsx(Navigate, { to: "/tuning", replace: true });
  const whatsappText = encodeURIComponent(`Hi, I would like to discuss ${model.name} tuning at DIGI-TEC. My VIN is ____, model year is ____, current modifications are ____ and I am interested in ____.`);
  return /* @__PURE__ */ jsxs("div", { className: "site-page min-h-screen bg-black text-off-white", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsx("nav", { "aria-label": "Breadcrumb", className: "border-b border-white/10", children: /* @__PURE__ */ jsxs("ol", { className: "mx-auto flex max-w-7xl flex-wrap gap-2 px-5 py-5 text-xs text-white/60 sm:px-8", children: [
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(LocalizedLink, { to: "/", className: "hover:text-burnt-orange", children: "Home" }) }),
        /* @__PURE__ */ jsx("li", { "aria-hidden": "true", children: "/" }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(LocalizedLink, { to: "/tuning", className: "hover:text-burnt-orange", children: "Performance tuning" }) }),
        /* @__PURE__ */ jsx("li", { "aria-hidden": "true", children: "/" }),
        /* @__PURE__ */ jsx("li", { "aria-current": "page", children: model.shortName })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "border-b border-white/10 bg-[#101113]", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-7xl items-center gap-8 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1.35fr_0.65fr]", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "home-kicker mb-4", children: "Vehicle-specific tuning · Al Quoz, Dubai" }),
          /* @__PURE__ */ jsx("h1", { className: "text-3xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl", children: model.h1 }),
          /* @__PURE__ */ jsx("p", { className: "mt-6 text-base leading-8 text-white/70", children: model.intro }),
          /* @__PURE__ */ jsxs("div", { className: "mt-7 flex flex-col gap-3 sm:flex-row", children: [
            /* @__PURE__ */ jsx("a", { href: `https://wa.me/97143402223?text=${whatsappText}`, target: "_blank", rel: "noopener noreferrer", className: "btn-primary", children: "Discuss your tuning package" }),
            /* @__PURE__ */ jsx("a", { href: "#performance-packages", className: "btn-secondary", children: "Compare stages and prices" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm leading-7 text-white/55", children: "Send the VIN, model year, software details and existing modifications so the workshop can confirm the vehicle and proposed scope." })
        ] }),
        /* @__PURE__ */ jsx("img", { src: model.image, alt: model.name, width: "640", height: "400", className: "mx-auto h-auto w-full max-w-md object-contain", loading: "eager" })
      ] }) }),
      /* @__PURE__ */ jsxs("section", { className: "mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16", "aria-labelledby": "supported-platform", children: [
        /* @__PURE__ */ jsx("h2", { id: "supported-platform", className: "text-2xl font-semibold sm:text-3xl", children: "Supported engine and vehicle specification" }),
        /* @__PURE__ */ jsxs("dl", { className: "mt-6 grid gap-5 border-y border-white/10 py-6 sm:grid-cols-3", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("dt", { className: "text-sm text-white/50", children: "Engine" }),
            /* @__PURE__ */ jsx("dd", { className: "mt-1 font-semibold", children: model.engine })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("dt", { className: "text-sm text-white/50", children: "Generation / platform" }),
            /* @__PURE__ */ jsx("dd", { className: "mt-1 font-semibold", children: model.generation || "Confirm exact vehicle by VIN" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("dt", { className: "text-sm text-white/50", children: "Available tuning options" }),
            /* @__PURE__ */ jsx("dd", { className: "mt-1 text-sm font-semibold leading-7", children: stageNames.join(" · ") })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-6 max-w-4xl space-y-4 text-base leading-8 text-white/65", children: model.platformNotes.map((paragraph) => /* @__PURE__ */ jsx("p", { children: paragraph }, paragraph)) })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "border-y border-white/10 bg-charcoal/20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold sm:text-3xl", children: model.packageHeading }),
        /* @__PURE__ */ jsx("div", { className: "mt-6 max-w-4xl space-y-4 text-base leading-8 text-white/65", children: model.packageExplanation.map((paragraph) => /* @__PURE__ */ jsx("p", { children: paragraph }, paragraph)) })
      ] }) }),
      /* @__PURE__ */ jsx(TuningConfigurationDetails, { cars, isArabic: false, heading: `${model.shortName} stages, performance and prices` }),
      /* @__PURE__ */ jsxs("section", { className: "mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16", "aria-labelledby": "vehicle-assessment", children: [
        /* @__PURE__ */ jsx("h2", { id: "vehicle-assessment", className: "text-2xl font-semibold sm:text-3xl", children: "Confirm the package for your vehicle" }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 max-w-4xl space-y-4 text-base leading-8 text-white/65", children: [
          /* @__PURE__ */ jsx("p", { children: "The figures, package contents, prices and time estimates above belong to the identified configurator entries. Fuel, vehicle condition, software version, existing modifications, component compatibility and the agreed installation scope must be reviewed before a result or completion date is confirmed." }),
          /* @__PURE__ */ jsx("p", { children: "The package lists identify included work. Any additional required or optional hardware should be recorded in the written proposal after the vehicle is assessed. Prices remain in euros as published; a final quotation should clarify the exact scope and currency." }),
          /* @__PURE__ */ jsxs("p", { children: [
            "Where the listed package names GAD components or software, ask DIGI-TEC to identify the calibration supplier, component specification and validation work in the agreed project. Read more about ",
            /* @__PURE__ */ jsx(LocalizedLink, { to: "/tuning#gad-tuning-dubai", className: "text-burnt-orange hover:underline", children: "GAD Motors and performance projects at DIGI-TEC" }),
            "."
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "border-y border-white/10 bg-charcoal/20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-semibold sm:text-3xl", children: [
          model.shortName,
          " tuning questions"
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-7 max-w-4xl space-y-7", children: model.faqs.map((faq) => /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: faq.question }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm leading-7 text-white/65", children: faq.answer })
        ] }, faq.question)) })
      ] }) }),
      /* @__PURE__ */ jsxs("section", { className: "mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold sm:text-3xl", children: "Plan your next step with DIGI-TEC" }),
        /* @__PURE__ */ jsx("p", { className: "mt-5 max-w-4xl text-base leading-8 text-white/65", children: "Contact DIGI-TEC Performance Center L.L.C. in Al Quoz Industrial Area 3, Dubai, with your vehicle details and preferred package. The team can review compatibility, condition and the scope before an appointment is agreed." }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-col gap-3 sm:flex-row", children: [
          /* @__PURE__ */ jsx("a", { href: `https://wa.me/97143402223?text=${whatsappText}`, target: "_blank", rel: "noopener noreferrer", className: "btn-primary", children: "Request a vehicle-specific quotation" }),
          /* @__PURE__ */ jsx("a", { href: "tel:+97143402223", className: "btn-secondary", children: "Call +971 4 340 2223" })
        ] }),
        /* @__PURE__ */ jsxs("ul", { className: "mt-8 space-y-3 text-sm", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(LocalizedLink, { to: "/tuning", className: "font-semibold text-burnt-orange hover:underline", children: "Performance tuning Dubai: services and all supported packages" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(LocalizedLink, { to: `/tuning#${cars[0].id}-packages`, className: "text-burnt-orange hover:underline", children: [
            "Find ",
            model.shortName,
            " in the master configurator package list"
          ] }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(LocalizedLink, { to: model.brandHub.path, className: "text-burnt-orange hover:underline", children: model.brandHub.label }) }),
          model.relatedLinks.map((link) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(LocalizedLink, { to: link.path, className: "text-burnt-orange hover:underline", children: link.label }) }, link.path))
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
export {
  TuningModelPage as default
};
