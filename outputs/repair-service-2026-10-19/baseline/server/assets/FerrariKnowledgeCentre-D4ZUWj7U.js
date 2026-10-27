import { jsx, jsxs } from "react/jsx-runtime";
import { ArrowRight, MessageCircle, Phone, CheckCircle2, Layers3 } from "lucide-react";
import { b1 as FERRARI_HUB_SERVICES, L as LocalizedLink, bi as FERRARI_WHATSAPP_HREF, aL as ferrariModelPages, b9 as FERRARI_MAINTENANCE_GUIDE_PATH, bc as FERRARI_488_GUIDE_PATH } from "../entry-server.js";
import { f as ferrariEngineWorkshop } from "./porsche-workshop-dubai-BV044Qn8.js";
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
const modelSummaries = {
  "488": "Twin-turbo V8, seven-speed DCT, cooling, SCM-E suspension, brakes and diagnostic considerations.",
  "f8-tributo": "Later F154 V8 development, seven-speed DCT, cooling, electronics and chassis-control systems.",
  "roma": "Front-mid-engine turbo V8, eight-speed DCT, comfort electronics, suspension and roof considerations.",
  "sf90": "Plug-in-hybrid V8, three-motor architecture, eight-speed DCT, regenerative braking and multiple cooling circuits.",
  "296": "Plug-in-hybrid V6, rear MGU-K, eight-speed DCT, charging, thermal management and electronic controls.",
  "portofino": "Turbo V8, retractable roof, model-dependent seven- or eight-speed DCT, SCM-E, cooling and AC.",
  "812": "Naturally aspirated V12, seven-speed transaxle, cooling, steering, SCM-E suspension and brake systems.",
  "purosangue": "Naturally aspirated V12, eight-speed rear transaxle, 4RM-S evo, 48-volt active suspension and electronics."
};
const FerrariKnowledgeCentre = () => /* @__PURE__ */ jsx("section", { id: "ferrari-services", className: "border-t border-white/5 bg-gradient-to-b from-charcoal/30 to-black py-14 sm:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
  /* @__PURE__ */ jsxs("div", { className: "mb-14 max-w-4xl", children: [
    /* @__PURE__ */ jsx("p", { className: "eyebrow mb-4", children: "Independent Ferrari workshop in Al Quoz" }),
    /* @__PURE__ */ jsx("h2", { className: "text-3xl font-black sm:text-5xl", children: "Ferrari specialist services in Dubai" }),
    /* @__PURE__ */ jsx("p", { className: "mt-5 text-base leading-relaxed text-gray-300", children: "DIGI-TEC provides Ferrari servicing, fault diagnosis and repair assessment from its Dubai workshop. Start with the symptom or maintenance due. The team identifies the exact model and fitted systems, then confirms the appropriate inspection, available diagnostic functions and repair scope." })
  ] }),
  /* @__PURE__ */ jsx("div", { className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-4", children: FERRARI_HUB_SERVICES.map((service) => /* @__PURE__ */ jsxs("article", { className: "card-premium flex flex-col rounded-2xl p-6", children: [
    /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold", children: service.title }),
    /* @__PURE__ */ jsx("p", { className: "mb-5 mt-3 text-base leading-relaxed text-gray-300", children: service.description }),
    /* @__PURE__ */ jsxs(LocalizedLink, { to: service.path, className: "mt-auto inline-flex items-center gap-2 text-sm font-semibold text-burnt-orange hover:underline", children: [
      service.anchor,
      /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4 shrink-0" })
    ] })
  ] }, service.path)) }),
  /* @__PURE__ */ jsxs("div", { className: "my-14 grid gap-6 rounded-2xl border border-white/10 bg-black/40 p-6 sm:p-8 lg:grid-cols-[1.1fr_0.9fr]", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black sm:text-4xl", children: "Book a Ferrari inspection" }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-2xl text-base leading-relaxed text-gray-300", children: "Send the model, year, mileage, service history, warning text or symptoms, and your preferred appointment time. DIGI-TEC will confirm the appropriate first inspection and current availability." }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-col flex-wrap gap-3 sm:flex-row", children: [
        /* @__PURE__ */ jsxs("a", { href: FERRARI_WHATSAPP_HREF, target: "_blank", rel: "noopener noreferrer", className: "btn-primary", children: [
          /* @__PURE__ */ jsx(MessageCircle, { className: "h-5 w-5" }),
          " Request a Ferrari inspection"
        ] }),
        /* @__PURE__ */ jsxs("a", { href: "tel:+97143402223", className: "btn-secondary", children: [
          /* @__PURE__ */ jsx(Phone, { className: "h-5 w-5" }),
          " Call DIGI-TEC"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-white/10 bg-white/[0.03] p-5", children: [
      /* @__PURE__ */ jsx("h3", { className: "font-bold", children: "Include before booking" }),
      /* @__PURE__ */ jsx("ul", { className: "mt-4 space-y-3 text-sm leading-relaxed text-gray-300", children: ["Ferrari model, year and VIN when available", "Mileage and available service history", "Exact warning message or symptoms", "When the concern occurs and preferred appointment time"].map((item) => /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsx(CheckCircle2, { className: "mt-0.5 h-4 w-4 shrink-0 text-burnt-orange" }),
        /* @__PURE__ */ jsx("span", { children: item })
      ] }, item)) })
    ] })
  ] }),
  /* @__PURE__ */ jsxs("div", { className: "grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { className: "eyebrow mb-4", children: "Ferrari knowledge centre" }),
      /* @__PURE__ */ jsx("h2", { className: "max-w-4xl text-3xl font-black sm:text-5xl", children: "Ferrari models we service" }),
      /* @__PURE__ */ jsx("p", { className: "mt-5 max-w-3xl text-base leading-relaxed text-gray-300", children: "Start with the model when engine, transmission, suspension, braking or diagnostic architecture changes the repair path. Hybrid-related work on the 296 and SF90 is accepted only after the warning, system, safety requirements and available workshop scope are confirmed." }),
      /* @__PURE__ */ jsx("div", { className: "mt-8 grid gap-4 sm:grid-cols-2", children: ferrariModelPages.map((model) => /* @__PURE__ */ jsxs(LocalizedLink, { to: model.path, className: "card-premium group rounded-2xl p-5", children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs font-bold uppercase tracking-widest text-burnt-orange", children: "Published model guide" }),
        /* @__PURE__ */ jsx("h3", { className: "mt-2 text-xl font-black group-hover:text-burnt-orange", children: model.name }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm leading-relaxed text-white/60", children: modelSummaries[model.slug] ?? "Maintenance, systems, symptoms and Dubai ownership considerations." }),
        /* @__PURE__ */ jsxs("span", { className: "mt-4 inline-flex items-center gap-1 text-sm font-semibold text-burnt-orange", children: [
          model.name,
          " service & repair ",
          /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
        ] })
      ] }, model.path)) })
    ] }),
    /* @__PURE__ */ jsxs("figure", { className: "overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025]", children: [
      /* @__PURE__ */ jsx("img", { src: ferrariEngineWorkshop, alt: "Ferrari engine work documented at DIGI-TEC Performance Centre in Dubai", className: "aspect-[4/5] w-full object-cover", width: "941", height: "1672", loading: "lazy" }),
      /* @__PURE__ */ jsx("figcaption", { className: "border-t border-white/10 p-5 text-xs leading-relaxed text-white/45", children: "Workshop imagery from DIGI-TEC. It documents Ferrari-related workshop work without assigning the vehicle to an unverified model or repair outcome." })
    ] })
  ] }),
  /* @__PURE__ */ jsxs("div", { className: "mt-10 grid gap-5 lg:grid-cols-[1fr_1fr]", children: [
    /* @__PURE__ */ jsxs("div", { className: "card-premium rounded-2xl p-6", children: [
      /* @__PURE__ */ jsx("p", { className: "text-xs font-bold uppercase tracking-widest text-burnt-orange", children: "Owner guides" }),
      /* @__PURE__ */ jsxs("div", { className: "mt-5 grid gap-3", children: [
        /* @__PURE__ */ jsxs(LocalizedLink, { to: FERRARI_MAINTENANCE_GUIDE_PATH, className: "flex items-center justify-between gap-4 rounded-xl border border-white/10 p-4 text-sm font-semibold hover:border-burnt-orange/40 hover:text-burnt-orange", children: [
          "Ferrari maintenance guide for Dubai ",
          /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4 shrink-0" })
        ] }),
        /* @__PURE__ */ jsxs(LocalizedLink, { to: FERRARI_488_GUIDE_PATH, className: "flex items-center justify-between gap-4 rounded-xl border border-white/10 p-4 text-sm font-semibold hover:border-burnt-orange/40 hover:text-burnt-orange", children: [
          "Ferrari 488 owner maintenance guide ",
          /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4 shrink-0" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "card-premium rounded-2xl p-6", children: [
      /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-burnt-orange", children: [
        /* @__PURE__ */ jsx(Layers3, { className: "h-4 w-4" }),
        " Model-specific architecture"
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-relaxed text-white/58", children: "Eight published model guides now separate V8, V12, seven- and eight-speed DCT, hybrid, active-suspension and GT roof-system requirements. Each guide returns to this hub for broad Ferrari service enquiries." }),
      /* @__PURE__ */ jsx("p", { className: "mt-5 text-sm font-semibold text-white/75", children: "488 · F8 · Roma · SF90 · 296 · Portofino · 812 · Purosangue" })
    ] })
  ] }),
  /* @__PURE__ */ jsxs("div", { className: "mt-10 grid gap-6 lg:grid-cols-3", children: [
    /* @__PURE__ */ jsxs("article", { className: "card-premium rounded-2xl p-6 lg:col-span-2", children: [
      /* @__PURE__ */ jsx("p", { className: "eyebrow mb-4", children: "Ferrari servicing for Dubai conditions" }),
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black sm:text-4xl", children: "Regular inspection matters even on low-mileage cars" }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-base leading-relaxed text-gray-300", children: "High ambient temperature places sustained demand on cooling and air conditioning. Heat and storage can affect batteries, tyres, rubber components and fluids, while dust and stop-start traffic change how the car is used. These conditions make documented inspections useful; the applicable Ferrari maintenance guidance, vehicle record and measured condition still determine the actual work." }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-base leading-relaxed text-gray-300", children: "For cars that sit for extended periods, report slow starting, warning messages, flat spots, leaks or changes in fluid level before driving to the workshop. A stored car may have time-related needs even when annual mileage is low." })
    ] }),
    /* @__PURE__ */ jsxs("article", { className: "rounded-2xl border border-white/10 p-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold", children: "How the repair scope is set" }),
      /* @__PURE__ */ jsxs("ol", { className: "mt-5 space-y-4 text-sm leading-relaxed text-gray-300", children: [
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { className: "text-off-white", children: "1. Identify:" }),
          " confirm the VIN, model, history and complaint."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { className: "text-off-white", children: "2. Inspect:" }),
          " combine compatible diagnostic information with physical tests."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { className: "text-off-white", children: "3. Approve:" }),
          " review the proposed work, parts, fluids and timing before repair."
        ] })
      ] })
    ] })
  ] })
] }) });
export {
  FerrariKnowledgeCentre as default
};
