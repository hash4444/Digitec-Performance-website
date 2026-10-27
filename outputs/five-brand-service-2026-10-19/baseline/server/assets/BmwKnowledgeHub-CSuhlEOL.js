import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { ArrowRight } from "lucide-react";
import { aI as bmwModelPages, L as LocalizedLink, aH as BMW_HUB_PATH } from "../entry-server.js";
import { b as bmwServicePath } from "./BrandPage-j3Vp_AUl.js";
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
const priorityModels = [
  { slug: "3-series", description: "Service planning by generation, with engine, transmission and chassis checks for your 3 Series." },
  { slug: "m5", description: "M5 engine, cooling, brakes and drivetrain guidance matched to the generation and fitted systems." },
  { slug: "m4", description: "M4 maintenance, oil service, S55/S58 engine and transmission considerations by generation." }
];
const BmwKnowledgeHub = () => /* @__PURE__ */ jsxs(Fragment, { children: [
  /* @__PURE__ */ jsx("section", { className: "border-y border-white/5 bg-gradient-to-b from-blue-950/15 to-black py-14 sm:py-20", "aria-labelledby": "choose-your-bmw", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "max-w-3xl", children: [
      /* @__PURE__ */ jsx("p", { className: "eyebrow mb-4", children: "Find your model" }),
      /* @__PURE__ */ jsx("h2", { id: "choose-your-bmw", className: "text-3xl font-black sm:text-5xl", children: "BMW service by model" }),
      /* @__PURE__ */ jsx("p", { className: "mt-5 text-base leading-relaxed text-gray-300", children: "Find maintenance and repair guidance for your model, including the generations, engines and fitted systems that affect the service plan." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-10 grid gap-5 lg:grid-cols-3", children: priorityModels.map(({ slug, description }) => {
      const model = bmwModelPages.find((item) => item.slug === slug);
      return model ? /* @__PURE__ */ jsxs(LocalizedLink, { to: `${BMW_HUB_PATH}/${slug}`, className: "card-premium group rounded-2xl p-6", children: [
        /* @__PURE__ */ jsxs("h3", { className: "text-xl font-bold group-hover:text-burnt-orange", children: [
          model.name,
          " service in Dubai"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 text-base leading-relaxed text-gray-300", children: description }),
        /* @__PURE__ */ jsxs("span", { className: "mt-5 inline-flex items-center gap-2 text-sm font-semibold text-burnt-orange", children: [
          "View model guide ",
          /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
        ] })
      ] }, slug) : null;
    }) }),
    /* @__PURE__ */ jsx("div", { className: "mt-7 flex flex-wrap gap-3", children: bmwModelPages.filter((model) => !priorityModels.some(({ slug }) => slug === model.slug)).map((model) => /* @__PURE__ */ jsxs(LocalizedLink, { to: `${BMW_HUB_PATH}/${model.slug}`, className: "rounded-full border border-white/15 px-5 py-3 text-sm font-semibold hover:border-burnt-orange hover:text-burnt-orange", children: [
      model.name,
      " service guide"
    ] }, model.slug)) }),
    /* @__PURE__ */ jsx("p", { className: "mt-6 text-sm leading-relaxed text-gray-400", children: "For other 1–8 Series, X, M or i models, send the model and year so the team can confirm service availability and the required diagnostic access." })
  ] }) }),
  /* @__PURE__ */ jsx("section", { className: "py-14 sm:py-20", "aria-labelledby": "bmw-authority-systems", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
    /* @__PURE__ */ jsx("p", { className: "eyebrow mb-4", children: "BMW systems and diagnosis" }),
    /* @__PURE__ */ jsx("h2", { id: "bmw-authority-systems", className: "text-2xl font-black sm:text-4xl", children: "What a BMW specialist checks before recommending repairs" }),
    /* @__PURE__ */ jsxs("div", { className: "mt-8 grid gap-5 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxs("article", { className: "rounded-2xl border border-white/10 p-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold", children: "Engine code and fitted components" }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 text-base leading-relaxed text-gray-300", children: "B48, B58, N20, N54, N55, N63, S55, S58 and S63 engines have different maintenance and diagnostic requirements. The VIN and engine code guide checks of cooling, oil leaks, charge pipes, oil separators or VANOS when symptoms and history warrant them." })
      ] }),
      /* @__PURE__ */ jsxs("article", { className: "rounded-2xl border border-white/10 p-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold", children: "ZF 8HP, M-DCT and chassis systems" }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 text-base leading-relaxed text-gray-300", children: "The fitted gearbox determines the fluid, filter and service procedure. ZF 8HP variants, M-DCT and manual gearboxes need different checks. Suspension inspection also distinguishes steel springs, Adaptive M dampers, rear self-levelling and two-axle air systems." })
      ] }),
      /* @__PURE__ */ jsxs("article", { className: "rounded-2xl border border-white/10 p-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold", children: "ISTA+ testing and supported functions" }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 text-base leading-relaxed text-gray-300", children: "ISTA+ fault review and live data are combined with physical tests. Service functions, battery registration, coding and programming are separate tasks; each depends on the exact vehicle, control unit and required access. An iDrive or retrofit enquiry needs hardware and software compatibility checks before work is accepted." })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-8 rounded-2xl border border-white/10 bg-blue-950/10 p-6 sm:p-8", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold", children: "BMW maintenance for Dubai heat and traffic" }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 max-w-4xl text-base leading-relaxed text-gray-300", children: "Heat, stop-start driving and dust add load to cooling, batteries, air conditioning and filters. Share how the car is used alongside its service history. Cooling performance, leaks, battery health, brake wear and AC output can then be considered in the inspection, with the service plan matched to your BMW." }),
      /* @__PURE__ */ jsxs(LocalizedLink, { to: bmwServicePath("oil-change"), className: "mt-5 inline-flex items-center gap-2 text-sm font-semibold text-burnt-orange hover:underline", children: [
        "Oil specification and maintenance checks ",
        /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
      ] })
    ] })
  ] }) }),
  /* @__PURE__ */ jsx("section", { className: "border-t border-white/5 py-14 sm:py-20", "aria-labelledby": "bmw-warning-paths", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
    /* @__PURE__ */ jsx("h2", { id: "bmw-warning-paths", className: "text-2xl font-black sm:text-4xl", children: "Find the right first check for a BMW warning or symptom" }),
    /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-3xl text-base leading-relaxed text-gray-300", children: "A message or symptom does not identify a failed part. Tell the workshop when it occurs, what the display says and whether the car can be driven safely." }),
    /* @__PURE__ */ jsx("div", { className: "mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3", children: [
      { title: "Drivetrain malfunction or engine warning", path: bmwServicePath("engine-diagnostics"), detail: "Start with ISTA+ supported fault data and physical checks before choosing a repair." },
      { title: "Rough shift or gearbox warning", path: bmwServicePath("transmission-repair"), detail: "Identify the fitted transmission and separate gearbox, engine and driveline causes." },
      { title: "Overheating or coolant loss", path: bmwServicePath("mechanical-repair"), detail: "Stop safely for an overheating instruction; trace the cooling fault before replacing parts." },
      { title: "Low ride height or chassis warning", path: bmwServicePath("suspension-repair"), detail: "Check the fitted suspension, electrical controls and physical condition." },
      { title: "iDrive screen or camera fault", path: bmwServicePath("electrical-repair"), detail: "Assess voltage, wiring, display and module communication before a head-unit decision." },
      { title: "Repeated battery warning", path: bmwServicePath("battery-replacement"), detail: "Test the 12V battery, charging and possible drain before replacement or registration." }
    ].map((item) => /* @__PURE__ */ jsxs("article", { className: "rounded-2xl border border-white/10 p-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold", children: item.title }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-relaxed text-gray-300", children: item.detail }),
      /* @__PURE__ */ jsxs(LocalizedLink, { to: item.path, className: "mt-4 inline-flex items-center gap-2 text-sm font-semibold text-burnt-orange hover:underline", children: [
        "View the relevant service ",
        /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
      ] })
    ] }, item.title)) }),
    /* @__PURE__ */ jsxs("p", { className: "mt-8 text-sm leading-relaxed text-gray-300", children: [
      "Planning routine work instead? Read the ",
      /* @__PURE__ */ jsx(LocalizedLink, { to: "/blog/bmw-maintenance-guide-dubai", className: "font-semibold text-burnt-orange hover:underline", children: "BMW maintenance guide" }),
      " or the ",
      /* @__PURE__ */ jsx(LocalizedLink, { to: "/blog/bmw-m-service-dubai-guide", className: "font-semibold text-burnt-orange hover:underline", children: "BMW M guide" }),
      ". Model-specific service paths appear above."
    ] })
  ] }) })
] });
export {
  BmwKnowledgeHub as default
};
