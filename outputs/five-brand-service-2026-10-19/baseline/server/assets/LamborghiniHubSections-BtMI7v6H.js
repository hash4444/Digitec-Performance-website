import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { MapPin, CheckCircle2, MessageCircle, Phone, ArrowRight } from "lucide-react";
import { L as LocalizedLink, a9 as lamborghiniUrusWorkshop } from "../entry-server.js";
import { L as LAMBORGHINI_WHATSAPP_HREF, h as LAMBORGHINI_SERVICES, i as LAMBORGHINI_HUB_PATH, j as LAMBORGHINI_SECONDARY_SERVICES } from "./BrandPage-j3Vp_AUl.js";
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
import "./Footer-D0Xl6ot8.js";
import "./accordion-DINZxoib.js";
import "@radix-ui/react-accordion";
import "zod";
import "./GoogleReviews-CcWxYJRB.js";
import "./Reveal-B0bzMO-v.js";
import "./TrustBar-D6jkMLGQ.js";
import "./ar-brands-CBVflR7-.js";
import "./ar-services-CclXnKHT.js";
import "./porsche-workshop-dubai-BV044Qn8.js";
import "./astonMartinHubContent-LMYRY7RB.js";
const modelGroups = [
  { name: "Urus", models: "Urus, Urus S and Urus Performante", copy: "Service, brakes, cooling, low-voltage electrical, eight-speed automatic and model-specific suspension enquiries can be discussed. Urus S adaptive air suspension should not be assumed for every variant.", links: [["Urus owner guide", "/blog/lamborghini-urus-service-dubai-guide"], ["Urus suspension assessment", `${LAMBORGHINI_HUB_PATH}/suspension-repair`]] },
  { name: "Huracán", models: "Huracán, EVO, Tecnica, STO and Sterrato", copy: "The Huracán EVO uses a seven-speed LDF dual-clutch transmission. Maintenance, warning-light, brake, lift and gearbox concerns still require exact model and fitted-system confirmation.", links: [["Huracán gearbox assessment", `${LAMBORGHINI_HUB_PATH}/transmission-repair`], ["Engine diagnostics", `${LAMBORGHINI_HUB_PATH}/engine-diagnostics`]] },
  { name: "Aventador", models: "Aventador, S, SV and SVJ", copy: "Aventador SVJ uses an ISR gearbox rather than the Huracán LDF. Clutch, hydraulic, lift and suspension discussions must be tied to the exact vehicle and accepted workshop capability.", links: [["Aventador transmission assessment", `${LAMBORGHINI_HUB_PATH}/transmission-repair`], ["Mechanical assessment", `${LAMBORGHINI_HUB_PATH}/mechanical-repair`]] }
];
const LamborghiniHubSections = () => /* @__PURE__ */ jsxs(Fragment, { children: [
  /* @__PURE__ */ jsx("section", { className: "border-t border-white/5 bg-gradient-to-br from-charcoal/50 to-black py-12 sm:py-16", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-7xl gap-7 px-4 sm:px-6 lg:grid-cols-[1.15fr_.85fr]", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { className: "eyebrow mb-4", children: "Independent Lamborghini service in Dubai" }),
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-black sm:text-5xl", children: "Identify the vehicle before defining the work" }),
      /* @__PURE__ */ jsx("p", { className: "mt-5 max-w-3xl leading-8 text-gray-300", children: "The badge alone does not define the correct gearbox, suspension, battery or maintenance procedure. DIGI-TEC reviews the model, year, mileage, history and concern, then confirms diagnostic access, parts and available workshop scope." }),
      /* @__PURE__ */ jsxs("a", { "data-cta-placement": "location_section", href: "https://maps.google.com/?q=Al+Quoz+Industrial+Area+3+Dubai", target: "_blank", rel: "noopener noreferrer", className: "mt-5 inline-flex items-center gap-2 font-semibold text-burnt-orange", children: [
        /* @__PURE__ */ jsx(MapPin, { className: "h-5 w-5" }),
        "Directions to the Al Quoz workshop"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "card-premium rounded-2xl p-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold", children: "What to send before booking" }),
      /* @__PURE__ */ jsx("ul", { className: "mt-4 space-y-3", children: ["Lamborghini model and year", "Mileage and available service history", "Exact warning, symptom and when it occurs", "Preferred appointment time"].map((item) => /* @__PURE__ */ jsxs("li", { className: "flex gap-3 text-gray-300", children: [
        /* @__PURE__ */ jsx(CheckCircle2, { className: "mt-1 h-4 w-4 shrink-0 text-burnt-orange" }),
        item
      ] }, item)) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-col gap-3", children: [
        /* @__PURE__ */ jsxs("a", { "data-cta-placement": "details_card", href: LAMBORGHINI_WHATSAPP_HREF, target: "_blank", rel: "noopener noreferrer", className: "btn-primary", children: [
          /* @__PURE__ */ jsx(MessageCircle, { className: "h-5 w-5" }),
          "Request a Lamborghini Assessment"
        ] }),
        /* @__PURE__ */ jsxs("a", { "data-cta-placement": "details_card", href: "tel:+97143402223", className: "btn-secondary", children: [
          /* @__PURE__ */ jsx(Phone, { className: "h-5 w-5" }),
          "Call the Workshop"
        ] })
      ] })
    ] })
  ] }) }),
  /* @__PURE__ */ jsx("section", { className: "border-t border-white/5 bg-black py-12 sm:py-20", "aria-labelledby": "lamborghini-services", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
    /* @__PURE__ */ jsx("p", { className: "eyebrow mb-4", children: "Maintenance, diagnosis and repair" }),
    /* @__PURE__ */ jsx("h2", { id: "lamborghini-services", className: "text-3xl font-black sm:text-5xl", children: "Lamborghini service areas" }),
    /* @__PURE__ */ jsx("p", { className: "mt-5 max-w-3xl leading-8 text-gray-300", children: "Use the focused page that matches the work or symptom. This hub owns broad Lamborghini service, repair, workshop and specialist intent without duplicating every child page." }),
    /* @__PURE__ */ jsx("div", { className: "mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3", children: LAMBORGHINI_SERVICES.map((service) => /* @__PURE__ */ jsxs(LocalizedLink, { to: `${LAMBORGHINI_HUB_PATH}/${service.slug}`, className: "card-premium group flex flex-col rounded-2xl p-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold group-hover:text-burnt-orange", children: service.title }),
      /* @__PURE__ */ jsx("p", { className: "my-4 text-sm leading-7 text-gray-300", children: service.copy }),
      /* @__PURE__ */ jsxs("span", { className: "mt-auto inline-flex items-center gap-2 text-sm font-semibold text-burnt-orange", children: [
        service.anchor,
        /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
      ] })
    ] }, service.slug)) }),
    /* @__PURE__ */ jsx("h3", { className: "mt-10 text-xl font-bold", children: "Other existing Lamborghini service pages" }),
    /* @__PURE__ */ jsx("div", { className: "mt-4 flex flex-wrap gap-3", children: LAMBORGHINI_SECONDARY_SERVICES.map((service) => /* @__PURE__ */ jsx(LocalizedLink, { to: `${LAMBORGHINI_HUB_PATH}/${service.slug}`, className: "rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-gray-200 hover:border-burnt-orange hover:text-burnt-orange", children: service.label }, service.slug)) })
  ] }) }),
  /* @__PURE__ */ jsx("section", { className: "border-t border-white/5 bg-gradient-to-br from-charcoal/40 to-black py-12 sm:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
    /* @__PURE__ */ jsx("p", { className: "eyebrow mb-4", children: "Model-specific guidance" }),
    /* @__PURE__ */ jsx("h2", { className: "text-3xl font-black sm:text-5xl", children: "Urus, Huracán and Aventador are not interchangeable" }),
    /* @__PURE__ */ jsx("div", { className: "mt-9 grid gap-5 lg:grid-cols-3", children: modelGroups.map((group) => /* @__PURE__ */ jsxs("article", { className: "card-premium rounded-2xl p-6", children: [
      /* @__PURE__ */ jsx("p", { className: "text-xs font-bold uppercase tracking-widest text-burnt-orange", children: group.name }),
      /* @__PURE__ */ jsx("h3", { className: "mt-2 text-xl font-bold", children: group.models }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm leading-7 text-gray-300", children: group.copy }),
      /* @__PURE__ */ jsx("div", { className: "mt-5 space-y-2", children: group.links.map(([label, path]) => /* @__PURE__ */ jsxs(LocalizedLink, { to: path, className: "flex items-center gap-2 text-sm font-semibold text-burnt-orange", children: [
        label,
        /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
      ] }, path)) })
    ] }, group.name)) })
  ] }) }),
  /* @__PURE__ */ jsx("section", { className: "border-t border-white/5 bg-black py-12 sm:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2", children: [
    /* @__PURE__ */ jsxs("figure", { className: "overflow-hidden rounded-2xl border border-white/10", children: [
      /* @__PURE__ */ jsx("img", { src: lamborghiniUrusWorkshop, alt: "Lamborghini Urus on a lift inside the DIGI-TEC workshop in Al Quoz, Dubai", loading: "lazy", width: "1086", height: "1448", className: "aspect-[4/3] w-full object-cover" }),
      /* @__PURE__ */ jsx("figcaption", { className: "p-5 text-sm text-gray-300", children: "A Lamborghini Urus in the DIGI-TEC workshop. The image supports the facility context and does not claim a particular repair outcome." })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { className: "eyebrow mb-4", children: "Inspection, estimate and approval" }),
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-black sm:text-4xl", children: "Service cost follows the confirmed scope" }),
      /* @__PURE__ */ jsxs("ol", { className: "mt-6 space-y-5 text-gray-300", children: [
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { className: "text-white", children: "1. Identify:" }),
          " confirm the vehicle, fitted system, history and concern."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { className: "text-white", children: "2. Assess:" }),
          " combine compatible data with suitable physical tests."
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { className: "text-white", children: "3. Estimate:" }),
          " explain findings, proposed parts, scope and timing before approval."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-7 flex flex-wrap gap-4", children: [
        /* @__PURE__ */ jsxs(LocalizedLink, { to: "/best-lamborghini-workshop-dubai", className: "inline-flex items-center gap-2 font-semibold text-burnt-orange", children: [
          "How to compare a Lamborghini workshop",
          /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
        ] }),
        /* @__PURE__ */ jsxs(LocalizedLink, { to: "/blog/lamborghini-maintenance-guide-dubai", className: "inline-flex items-center gap-2 font-semibold text-burnt-orange", children: [
          "Read the maintenance guide",
          /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
        ] })
      ] })
    ] })
  ] }) })
] });
export {
  LamborghiniHubSections
};
