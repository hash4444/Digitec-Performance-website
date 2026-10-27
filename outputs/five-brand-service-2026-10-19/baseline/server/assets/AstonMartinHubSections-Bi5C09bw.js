import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { L as LocalizedLink } from "../entry-server.js";
import { A as ASTON_SERVICES, d as ASTON_HUB_PATH, c as ASTON_WHATSAPP_HREF } from "./astonMartinHubContent-LMYRY7RB.js";
import "node:stream";
import "react-dom/server";
import "react-router-dom/server.mjs";
import "react-router-dom";
import "react";
import "@radix-ui/react-toast";
import "class-variance-authority";
import "lucide-react";
import "clsx";
import "tailwind-merge";
import "next-themes";
import "sonner";
import "@radix-ui/react-tooltip";
import "@tanstack/react-query";
const Actions = () => /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-wrap gap-3", children: [
  /* @__PURE__ */ jsx("a", { className: "btn-primary", href: ASTON_WHATSAPP_HREF, target: "_blank", rel: "noopener noreferrer", children: "Request an Aston Martin Service Quote" }),
  /* @__PURE__ */ jsx("a", { className: "btn-secondary", href: "tel:+97143402223", children: "Call the Al Quoz workshop" })
] });
const AstonMartinHubSections = () => /* @__PURE__ */ jsxs(Fragment, { children: [
  /* @__PURE__ */ jsx("section", { className: "py-12 sm:py-16 border-t border-white/10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-5 sm:px-6 grid gap-8 lg:grid-cols-2", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { className: "eyebrow", children: "Independent Aston Martin service in Dubai" }),
      /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-4xl font-black mt-4", children: "Plan the work around your car" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-300 leading-8 mt-5", children: "Whether you need scheduled servicing or help with a warning, start with the model, year and service history. Our Al Quoz workshop reviews the concern, explains the inspection needed and prepares an estimate for your approval." }),
      /* @__PURE__ */ jsx(Actions, {})
    ] }),
    /* @__PURE__ */ jsxs("aside", { className: "card-premium rounded-2xl p-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold", children: "Helpful details before booking" }),
      /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-5 mt-4 space-y-3 text-gray-300", children: [
        /* @__PURE__ */ jsx("li", { children: "Model and year" }),
        /* @__PURE__ */ jsx("li", { children: "Mileage and service history" }),
        /* @__PURE__ */ jsx("li", { children: "Warning message, symptoms and when they occur" }),
        /* @__PURE__ */ jsx("li", { children: "Preferred appointment time" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-5 text-gray-300", children: "A VIN is not required for the first enquiry. It may be requested later to identify parts or fitted systems." }),
      /* @__PURE__ */ jsx("a", { className: "inline-block text-burnt-orange mt-5", href: "https://maps.google.com/?q=Al+Quoz+Industrial+Area+3+Dubai", target: "_blank", rel: "noopener noreferrer", children: "Directions to Al Quoz Industrial Area 3" })
    ] })
  ] }) }),
  /* @__PURE__ */ jsx("section", { className: "py-12 sm:py-16 border-t border-white/10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-5 sm:px-6", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-4xl font-black", children: "Aston Martin maintenance, diagnostics and repair" }),
    /* @__PURE__ */ jsx("p", { className: "mt-5 text-gray-300 leading-8", children: "Choose the service that matches your concern for inspection details and quotation factors." }),
    /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8", children: ASTON_SERVICES.slice(0, 9).map((s) => /* @__PURE__ */ jsxs(LocalizedLink, { to: `${ASTON_HUB_PATH}/${s.slug}`, className: "card-premium rounded-2xl p-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold", children: s.title }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-base leading-7 text-gray-300", children: s.copy }),
      /* @__PURE__ */ jsxs("span", { className: "inline-block mt-5 text-burnt-orange", children: [
        "Explore Aston Martin ",
        s.title.toLowerCase(),
        " →"
      ] })
    ] }, s.slug)) }),
    /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mt-8", children: "Bodywork and other repair enquiries" }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-4 mt-4", children: ASTON_SERVICES.slice(9).map((s) => /* @__PURE__ */ jsx(LocalizedLink, { className: "text-burnt-orange underline", to: `${ASTON_HUB_PATH}/${s.slug}`, children: s.title }, s.slug)) }),
    /* @__PURE__ */ jsx(Actions, {})
  ] }) }),
  /* @__PURE__ */ jsx("section", { className: "py-12 sm:py-16 border-t border-white/10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-5 sm:px-6", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-4xl font-black", children: "Aston Martin models and owner guidance" }),
    /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-6 mt-8", children: [
      ["DBX and DBX707", "Discuss maintenance, brakes, cooling, gearbox and suspension concerns. DBX707 specifications should not be applied to every DBX variant."],
      ["Vantage", "Identify the generation before discussing gearbox, engine or brake work. Historic Sportshift systems differ from later automatic arrangements."],
      ["DB11, DB12 and DBS", "Service history and the fitted V8 or V12 guide the first inspection. Engine, electronics and parts requirements differ between models and years."]
    ].map(([name, copy]) => /* @__PURE__ */ jsxs("article", { className: "card-premium rounded-2xl p-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold", children: name }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-gray-300 leading-7", children: copy })
    ] }, name)) }),
    /* @__PURE__ */ jsx(LocalizedLink, { className: "inline-block mt-6 text-burnt-orange underline", to: "/blog/aston-martin-db11-service-dubai-guide", children: "Read the Aston Martin DB11 service guide" })
  ] }) }),
  /* @__PURE__ */ jsx("section", { className: "py-12 sm:py-16 border-t border-white/10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-5 sm:px-6 grid lg:grid-cols-2 gap-8", children: [
    /* @__PURE__ */ jsxs("figure", { children: [
      /* @__PURE__ */ jsx("img", { src: "/images/aston-martin-service-dubai-hero.jpg", alt: "Aston Martin in the DIGI-TEC workshop", loading: "lazy", width: "941", height: "1672", className: "w-full aspect-[4/3] object-cover rounded-2xl" }),
      /* @__PURE__ */ jsx("figcaption", { className: "mt-3 text-sm text-gray-400", children: "An Aston Martin at the DIGI-TEC workshop in Al Quoz, Dubai." })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-black", children: "Assessment, quotation and approval" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-300 leading-8 mt-5", children: "Service cost depends on the model, history and items due. Repair estimates also depend on findings, test time, parts and labour. The team explains the proposed work and options before approval." }),
      /* @__PURE__ */ jsxs("ol", { className: "list-decimal pl-5 space-y-4 mt-5 text-gray-300", children: [
        /* @__PURE__ */ jsx("li", { children: "Review the vehicle and concern." }),
        /* @__PURE__ */ jsx("li", { children: "Inspect and test the relevant system." }),
        /* @__PURE__ */ jsx("li", { children: "Explain findings, parts options and timing." }),
        /* @__PURE__ */ jsx("li", { children: "Agree the work and appropriate checks afterwards." })
      ] }),
      /* @__PURE__ */ jsx(LocalizedLink, { className: "inline-block mt-6 text-burnt-orange underline", to: "/blog/aston-martin-best-workshop-dubai", children: "How to compare Aston Martin workshops" }),
      /* @__PURE__ */ jsx(Actions, {})
    ] })
  ] }) }),
  /* @__PURE__ */ jsx("section", { className: "border-t border-white/10 py-10 sm:py-12", "aria-labelledby": "aston-repair-assessment", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl px-5 sm:px-6", children: [
    /* @__PURE__ */ jsx("h2", { id: "aston-repair-assessment", className: "text-2xl font-bold sm:text-3xl", children: "Book the inspection that matches the concern" }),
    /* @__PURE__ */ jsxs("p", { className: "mt-4 text-base leading-8 text-gray-300", children: [
      "An engine warning, rough running or reduced performance calls for ",
      /* @__PURE__ */ jsx(LocalizedLink, { to: `${ASTON_HUB_PATH}/engine-diagnostics`, className: "font-semibold text-burnt-orange hover:underline", children: "Aston Martin engine diagnostics" }),
      ". Brake noise, vibration or a change in pedal feel needs a ",
      /* @__PURE__ */ jsx(LocalizedLink, { to: `${ASTON_HUB_PATH}/brake-repair`, className: "font-semibold text-burnt-orange hover:underline", children: "brake inspection" }),
      " that identifies the fitted system and checks its condition."
    ] }),
    /* @__PURE__ */ jsxs("p", { className: "mt-4 text-base leading-8 text-gray-300", children: [
      "For intermittent lighting, starting or comfort-system faults, ",
      /* @__PURE__ */ jsx(LocalizedLink, { to: "/services/auto-electrical-repair-dubai", className: "font-semibold text-burnt-orange hover:underline", children: "electrical circuit and wiring checks" }),
      " help establish the cause. Describe when the symptom occurs so the team can confirm the appropriate assessment before the visit."
    ] })
  ] }) })
] });
export {
  AstonMartinHubSections
};
