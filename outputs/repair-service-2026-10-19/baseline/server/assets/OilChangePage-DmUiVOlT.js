import { jsxs, jsx } from "react/jsx-runtime";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ArrowDown, MessageCircle, Phone, Check, ArrowUpRight, TriangleAlert, Thermometer, Clock3, Route, MapPin } from "lucide-react";
import { H as Header, F as Footer } from "./Footer-D0Xl6ot8.js";
import { d as useSeo, L as LocalizedLink, b as brands, p as pageGraph, a as buildWebPage, S as SITE_URL, g as buildBreadcrumb, h as buildService, c as buildFAQ } from "../entry-server.js";
import { A as Accordion, a as AccordionItem, b as AccordionTrigger, c as AccordionContent } from "./accordion-DINZxoib.js";
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
import "@radix-ui/react-accordion";
const OIL_CHANGE_PATH = "/services/oil-change-dubai";
const OIL_CHANGE_TITLE = "Car Oil Change Dubai | Engine Oil & Filter Service | DIGI-TEC";
const OIL_CHANGE_DESCRIPTION = "Book a car oil change in Al Quoz, Dubai. Vehicle-specific engine oil, filter and supported service reset. Send your car details for an exact DIGI-TEC quote.";
const OIL_CHANGE_H1 = "Car Oil Change in Dubai";
const OIL_CHANGE_INTRO = "Vehicle-specific engine oil and filter service in Al Quoz, Dubai. DIGI-TEC confirms the required oil specification, filter and supported service-reset requirements for your exact vehicle before work begins.";
const OIL_CHANGE_WHATSAPP = `https://wa.me/97143402223?text=${encodeURIComponent("Hi DIGI-TEC, I would like to book an engine oil and filter change.\n\nMake, model and year: \nMileage: \nLast oil service, if known: \nService reminder or concern: \nPreferred appointment: ")}`;
const OIL_CHANGE_QUOTE = `https://wa.me/97143402223?text=${encodeURIComponent("Hi DIGI-TEC, please quote for an engine oil and filter change.\n\nMake, model and year: \nEngine or VIN, if needed: \nMileage: \nLast service, if known: \nPlease confirm the oil specification, quantity, filter, any seals, supported reset and total agreed scope.")}`;
const OIL_SERVICE_ADVICE = `https://wa.me/97143402223?text=${encodeURIComponent("Hi DIGI-TEC, I am not sure whether my car needs an oil change or a scheduled service.\n\nMake, model and year: \nMileage: \nService reminder: \nLast service and any symptoms: ")}`;
const oilScope = [
  { title: "Correct engine oil", detail: "The viscosity and oil approval or specification required by the exact engine." },
  { title: "Matching oil filter", detail: "The applicable filter and associated seals, identified in the agreed scope." },
  { title: "Drain plug & seals", detail: "Check the sealing requirements; replacement parts are confirmed where needed." },
  { title: "Correct fill quantity", detail: "Oil quantity and filling procedure matched to the engine and service information." },
  { title: "Oil-level verification", detail: "The appropriate dipstick or electronic level procedure for the vehicle." },
  { title: "Supported service reset", detail: "Reminder reset and agreed final checks where applicable and supported." }
];
const oilProcess = [
  { title: "Identify your vehicle", detail: "Confirm make, model, year, mileage and service history. Check the engine or VIN where needed." },
  { title: "Agree oil & filter", detail: "Confirm oil specification, quantity, filter and sealing requirements in the estimate." },
  { title: "Drain & replace", detail: "Drain the existing engine oil and replace the applicable filter and agreed sealing components." },
  { title: "Refill & verify", detail: "Refill using the vehicle-specific procedure and verify the oil level appropriately." },
  { title: "Reset & review", detail: "Complete a supported reminder reset and agreed post-service checks. Review the work with you." }
];
const oilBrandPaths = [
  { name: "Mercedes-Benz", slug: "mercedes-benz-service-dubai", path: "/services/mercedes-oil-change-dubai" },
  { name: "BMW", slug: "bmw-service-dubai", path: "/brands/bmw-service-dubai/oil-change" },
  { name: "Porsche", slug: "porsche-service-dubai", path: "/brands/porsche-service-dubai/oil-change" },
  { name: "Lamborghini", slug: "lamborghini-service-dubai", path: "/brands/lamborghini-service-dubai/oil-change" },
  { name: "Ferrari", slug: "ferrari-service-dubai", path: "/brands/ferrari-service-dubai/oil-change" },
  { name: "McLaren", slug: "mclaren-service-dubai", path: "/brands/mclaren-service-dubai/oil-change" },
  { name: "Rolls-Royce", slug: "rolls-royce-service-dubai", path: "/brands/rolls-royce-service-dubai/oil-change" },
  { name: "Bentley", slug: "bentley-service-dubai", path: "/brands/bentley-service-dubai/oil-change" }
];
const oilFaqs = [
  { question: "How much does a car oil change cost in Dubai?", answer: "The cost depends on your engine, required oil specification and quantity, filter, seals and service procedure. Send the make, model, year and mileage to DIGI-TEC for an itemized quote. Any additional work is agreed separately." },
  { question: "How often should I change my engine oil in Dubai?", answer: "Follow the manufacturer’s requirements for your exact vehicle, alongside its service reminder and history. Short trips, extended idling and other driving conditions can affect the applicable schedule. There is no single mileage interval that suits every car." },
  { question: "Which engine oil does my car need?", answer: "The viscosity grade is only part of the specification. The engine variant, model year and market specification determine the required oil approval or standard and quantity. DIGI-TEC confirms these details before proposing the oil for your car." },
  { question: "Does an oil change include the oil filter?", answer: "Our oil-and-filter service is scoped with the applicable oil filter and associated seals. The quotation identifies the filter, oil and any separately required parts so you can confirm exactly what is included before work begins." },
  { question: "Can you reset the service reminder after an oil change?", answer: "A service reminder reset is included in the agreed scope where it is applicable and supported for the vehicle. An oil-service reset does not confirm that other scheduled maintenance is complete, and a fault warning may require diagnosis." },
  { question: "What is the difference between an oil change and a full service?", answer: "An oil change focuses on engine oil, the applicable filter and sealing components, level verification and a supported reset. A scheduled car service may include additional filters, fluids and inspections required by the vehicle’s service schedule and history." },
  { question: "Where can I get an oil change in Al Quoz?", answer: "You can book at DIGI-TEC Performance Center in Al Quoz Industrial Area 3, Dubai. Call or WhatsApp +971 4 340 2223 with your vehicle details to confirm the oil-and-filter scope, parts availability and appointment before travelling." },
  { question: "Can you change the oil on luxury and performance cars?", answer: "DIGI-TEC accepts enquiries for luxury, performance and selected everyday cars. Oil, filter, procedures and availability are confirmed for the exact engine. Use the manufacturer-specific oil pages for more detail about your brand." },
  { question: "What happens if my oil warning light is on?", answer: "Identify the exact warning in your vehicle handbook. An oil-pressure warning can require you to stop safely and switch off the engine; follow the manufacturer’s instructions and seek assistance. Repeated low levels, pressure warnings or leaks need assessment and may involve more than an oil change." },
  { question: "How do I know if my car needs more than an oil change?", answer: "Share the service reminder, history, any warning message, visible leak, unusual noise or recurring need to add oil. These can call for a wider inspection or diagnosis. Dark oil on its own does not establish that oil is overdue or identify an engine fault." }
];
const url = `${SITE_URL}${OIL_CHANGE_PATH}`;
const graph = pageGraph([
  buildWebPage({ url, name: OIL_CHANGE_TITLE, description: OIL_CHANGE_DESCRIPTION, breadcrumbId: `${url}#breadcrumb`, mainEntityId: `${url}#service` }),
  buildBreadcrumb(url, [{ name: "Home", url: "/" }, { name: "Services", url: "/services" }, { name: OIL_CHANGE_H1, url }]),
  buildService({ url, name: OIL_CHANGE_H1, serviceType: "Engine oil and oil filter change", description: OIL_CHANGE_INTRO }),
  buildFAQ(url, oilFaqs)
]);
function WhatsApp({ children, placement, quote = false }) {
  return /* @__PURE__ */ jsxs("a", { className: "oil-button oil-button-primary", href: quote ? OIL_CHANGE_QUOTE : OIL_CHANGE_WHATSAPP, target: "_blank", rel: "noopener noreferrer", "data-cta-placement": `oil_${placement}`, children: [
    /* @__PURE__ */ jsx(MessageCircle, { size: 18, "aria-hidden": "true" }),
    children
  ] });
}
function OilChangePage() {
  const { hash } = useLocation();
  useEffect(() => {
    var _a;
    if (hash) (_a = document.getElementById(hash.slice(1))) == null ? void 0 : _a.scrollIntoView({ block: "start", behavior: "instant" });
  }, [hash]);
  useSeo({ title: OIL_CHANGE_TITLE, description: OIL_CHANGE_DESCRIPTION, canonical: url, jsonLd: graph });
  return /* @__PURE__ */ jsxs("div", { className: "oil-page", children: [
    /* @__PURE__ */ jsx(Header, { overlay: true }),
    /* @__PURE__ */ jsxs("main", { id: "main-content", children: [
      /* @__PURE__ */ jsxs("section", { className: "oil-hero oil-shell", "aria-labelledby": "oil-title", children: [
        /* @__PURE__ */ jsxs("nav", { className: "oil-breadcrumb", "aria-label": "Breadcrumb", children: [
          /* @__PURE__ */ jsx(LocalizedLink, { to: "/", children: "Home" }),
          /* @__PURE__ */ jsx("span", { children: "/" }),
          /* @__PURE__ */ jsx(LocalizedLink, { to: "/services", children: "Services" }),
          /* @__PURE__ */ jsx("span", { children: "/" }),
          /* @__PURE__ */ jsx("span", { "aria-current": "page", children: "Oil change" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "oil-hero-grid", children: [
          /* @__PURE__ */ jsxs("div", { className: "oil-hero-copy", children: [
            /* @__PURE__ */ jsxs("p", { className: "oil-kicker", children: [
              /* @__PURE__ */ jsx("span", {}),
              "Engine oil + filter / Al Quoz"
            ] }),
            /* @__PURE__ */ jsxs("h1", { id: "oil-title", children: [
              "Car Oil Change ",
              /* @__PURE__ */ jsx("span", { children: "in Dubai" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "oil-lead", children: OIL_CHANGE_INTRO }),
            /* @__PURE__ */ jsxs("div", { className: "oil-actions", children: [
              /* @__PURE__ */ jsxs("a", { className: "oil-button oil-button-primary", href: "#oil-booking", children: [
                "Book an Oil Change ",
                /* @__PURE__ */ jsx(ArrowDown, { size: 18, "aria-hidden": "true" })
              ] }),
              /* @__PURE__ */ jsxs("a", { className: "oil-button oil-button-secondary", href: OIL_CHANGE_WHATSAPP, target: "_blank", rel: "noopener noreferrer", "data-cta-placement": "oil_hero_whatsapp", children: [
                /* @__PURE__ */ jsx(MessageCircle, { size: 18, "aria-hidden": "true" }),
                "WhatsApp DIGI-TEC"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "oil-hero-meta", children: [
              /* @__PURE__ */ jsxs("a", { href: "tel:+97143402223", "data-cta-placement": "oil_hero_call", children: [
                /* @__PURE__ */ jsx(Phone, { size: 16, "aria-hidden": "true" }),
                "Call DIGI-TEC"
              ] }),
              /* @__PURE__ */ jsx("span", { children: "Scope confirmed before work begins" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("figure", { className: "oil-hero-visual", children: [
            /* @__PURE__ */ jsx("img", { src: "/images/paint-correction/workshop-floor-960.webp", srcSet: "/images/paint-correction/workshop-floor-540.webp 540w, /images/paint-correction/workshop-floor-960.webp 960w", sizes: "(min-width: 701px) 44vw, calc(100vw - 40px)", width: "960", height: "1280", ...{ fetchpriority: "high" }, alt: "Vehicles and service bays inside the DIGI-TEC workshop in Al Quoz, Dubai" }),
            /* @__PURE__ */ jsxs("div", { className: "oil-service-ticket", children: [
              /* @__PURE__ */ jsx("span", { className: "oil-ticket-label", children: "Engine oil service" }),
              /* @__PURE__ */ jsxs("strong", { children: [
                "The right specification. ",
                /* @__PURE__ */ jsx("br", {}),
                "For your engine."
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("span", { children: "Oil" }),
                /* @__PURE__ */ jsx("span", { children: "Filter" }),
                /* @__PURE__ */ jsx("span", { children: "Level check" })
              ] })
            ] }),
            /* @__PURE__ */ jsx("figcaption", { children: "DIGI-TEC workshop · Al Quoz Industrial Area 3" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("nav", { className: "oil-jump-links", "aria-label": "Oil change page sections", children: [
          /* @__PURE__ */ jsx("a", { href: "#oil-scope", children: "What’s included" }),
          /* @__PURE__ */ jsx("a", { href: "#oil-process", children: "Our process" }),
          /* @__PURE__ */ jsx("a", { href: "#oil-cost", children: "Cost & quote" }),
          /* @__PURE__ */ jsx("a", { href: "#oil-faq", children: "Common questions" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("section", { id: "oil-scope", className: "oil-scope", "aria-labelledby": "oil-scope-title", children: /* @__PURE__ */ jsxs("div", { className: "oil-shell", children: [
        /* @__PURE__ */ jsxs("div", { className: "oil-section-head", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "oil-kicker", children: "Know the scope" }),
            /* @__PURE__ */ jsx("h2", { id: "oil-scope-title", children: "What your oil change includes" })
          ] }),
          /* @__PURE__ */ jsx("p", { children: "Your quote sets out the oil, filter and applicable service items. Extra inspections, repairs or maintenance are agreed separately." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "oil-scope-grid", children: oilScope.map((item, index) => /* @__PURE__ */ jsxs("article", { children: [
          /* @__PURE__ */ jsxs("span", { className: "oil-index", children: [
            "0",
            index + 1
          ] }),
          /* @__PURE__ */ jsx("h3", { children: item.title }),
          /* @__PURE__ */ jsx("p", { children: item.detail })
        ] }, item.title)) })
      ] }) }),
      /* @__PURE__ */ jsxs("section", { id: "oil-specification", className: "oil-section oil-shell oil-specification", "aria-labelledby": "oil-spec-title", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "oil-kicker", children: "Matched to the vehicle" }),
          /* @__PURE__ */ jsxs("h2", { id: "oil-spec-title", children: [
            "There’s more to oil ",
            /* @__PURE__ */ jsx("br", {}),
            "than its viscosity."
          ] }),
          /* @__PURE__ */ jsx("p", { children: "A viscosity grade describes how an oil flows. It does not, by itself, confirm that the oil meets the specification required by your engine." }),
          /* @__PURE__ */ jsx("p", { children: "We check the engine variant, model year and market specification before agreeing the oil, filter and procedure. Two cars with the same badge may need different oil-service details." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "oil-spec-sheet", children: [
          /* @__PURE__ */ jsxs("div", { className: "oil-spec-sheet-heading", children: [
            /* @__PURE__ */ jsx("span", { children: "Before the first drop" }),
            /* @__PURE__ */ jsx(Check, { size: 20, "aria-hidden": "true" })
          ] }),
          /* @__PURE__ */ jsx("dl", { children: [
            ["Vehicle", "Model year · engine variant · market specification"],
            ["Oil", "Viscosity + required approval or specification"],
            ["Filter", "Correct fitment + associated seals"],
            ["Quantity", "Engine capacity + filling and level procedure"],
            ["Reset", "Applicable service reminder + supported access"]
          ].map(([term, detail]) => /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("dt", { children: term }),
            /* @__PURE__ */ jsx("dd", { children: detail })
          ] }, term)) }),
          /* @__PURE__ */ jsx("p", { children: "Confirmed for your car, then listed in the agreed scope." })
        ] })
      ] }),
      /* @__PURE__ */ jsx("section", { id: "oil-process", className: "oil-process", "aria-labelledby": "oil-process-title", children: /* @__PURE__ */ jsxs("div", { className: "oil-shell", children: [
        /* @__PURE__ */ jsxs("div", { className: "oil-section-head", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "oil-kicker", children: "From check-in to handover" }),
            /* @__PURE__ */ jsx("h2", { id: "oil-process-title", children: "Our oil change process" })
          ] }),
          /* @__PURE__ */ jsx("p", { children: "A clear sequence, with the oil specification and service scope agreed before work begins." })
        ] }),
        /* @__PURE__ */ jsx("ol", { className: "oil-process-steps", children: oilProcess.map((step, index) => /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsxs("span", { "aria-hidden": "true", children: [
            "0",
            index + 1
          ] }),
          /* @__PURE__ */ jsx("h3", { children: step.title }),
          /* @__PURE__ */ jsx("p", { children: step.detail })
        ] }, step.title)) }),
        /* @__PURE__ */ jsxs("div", { className: "oil-process-action", children: [
          /* @__PURE__ */ jsx("p", { children: "Have your model, year and mileage ready." }),
          /* @__PURE__ */ jsx(WhatsApp, { placement: "process_quote", quote: true, children: "Request an Oil Change Quote" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("section", { id: "oil-vehicles", className: "oil-section oil-shell", "aria-labelledby": "oil-vehicles-title", children: [
        /* @__PURE__ */ jsxs("div", { className: "oil-section-head", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "oil-kicker", children: "Find your vehicle" }),
            /* @__PURE__ */ jsxs("h2", { id: "oil-vehicles-title", children: [
              "Oil change for luxury, ",
              /* @__PURE__ */ jsx("br", {}),
              "performance & daily cars"
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { children: "Oil requirements vary by engine and platform. Explore the dedicated oil-service page for your brand, or send your vehicle details so we can confirm coverage and availability." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "oil-brand-paths", children: oilBrandPaths.map((item) => {
          var _a;
          return /* @__PURE__ */ jsxs(LocalizedLink, { to: item.path, children: [
            /* @__PURE__ */ jsx("span", { className: "oil-brand-logo", children: /* @__PURE__ */ jsx("img", { src: (_a = brands.find((brand) => brand.slug === item.slug)) == null ? void 0 : _a.logo, alt: "", width: "56", height: "56", loading: "lazy" }) }),
            /* @__PURE__ */ jsxs("span", { children: [
              /* @__PURE__ */ jsx("strong", { children: item.name }),
              /* @__PURE__ */ jsx("span", { children: "Oil change service" })
            ] }),
            /* @__PURE__ */ jsx(ArrowUpRight, { size: 18, "aria-hidden": "true" })
          ] }, item.slug);
        }) }),
        /* @__PURE__ */ jsx("p", { className: "oil-small-note", children: "Your car isn’t listed? Share the make, model, year and engine details with the workshop before booking." })
      ] }),
      /* @__PURE__ */ jsx("section", { id: "oil-due", className: "oil-due", "aria-labelledby": "oil-due-title", children: /* @__PURE__ */ jsxs("div", { className: "oil-shell oil-due-grid", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "oil-kicker", children: "Read the reminder. Note the symptoms." }),
          /* @__PURE__ */ jsxs("h2", { id: "oil-due-title", children: [
            "When should I book ",
            /* @__PURE__ */ jsx("br", {}),
            "an oil change?"
          ] }),
          /* @__PURE__ */ jsx("p", { children: "The service display and your vehicle’s maintenance schedule are the starting point. Unknown history or a concern about the oil is a reason to check what is due." }),
          /* @__PURE__ */ jsxs("ul", { className: "oil-due-list", children: [
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx(Check, { size: 18, "aria-hidden": "true" }),
              "Oil-service reminder is due"
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx(Check, { size: 18, "aria-hidden": "true" }),
              "The applicable time or mileage interval is reached"
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx(Check, { size: 18, "aria-hidden": "true" }),
              "The last oil service or specification is unknown"
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { children: "Dark oil alone does not prove it is overdue. Consider the service history, interval and any symptoms together." })
        ] }),
        /* @__PURE__ */ jsxs("aside", { className: "oil-warning", "aria-labelledby": "oil-warning-title", children: [
          /* @__PURE__ */ jsx(TriangleAlert, { size: 26, "aria-hidden": "true" }),
          /* @__PURE__ */ jsx("h3", { id: "oil-warning-title", children: "Some concerns need diagnosis." }),
          /* @__PURE__ */ jsx("p", { children: "Repeatedly falling oil levels, visible leakage, a burnt-oil smell or an oil warning may need assessment beyond a routine oil change." }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "An oil-pressure warning can require you to stop safely and switch off the engine." }),
            " Follow your vehicle handbook and seek assistance; do not assume a routine oil change will resolve it."
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "oil-context-links", children: [
            /* @__PURE__ */ jsxs(LocalizedLink, { to: "/services/car-diagnostics-dubai", children: [
              "Engine diagnostics ",
              /* @__PURE__ */ jsx(ArrowUpRight, { size: 16, "aria-hidden": "true" })
            ] }),
            /* @__PURE__ */ jsxs(LocalizedLink, { to: "/services/mechanical-repair-dubai", children: [
              "Mechanical inspection & repair ",
              /* @__PURE__ */ jsx(ArrowUpRight, { size: 16, "aria-hidden": "true" })
            ] })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("section", { id: "oil-dubai", className: "oil-section oil-shell oil-dubai", "aria-labelledby": "oil-dubai-title", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "oil-kicker", children: "Your car. Your driving pattern." }),
          /* @__PURE__ */ jsxs("h2", { id: "oil-dubai-title", children: [
            "Oil changes for Dubai ",
            /* @__PURE__ */ jsx("br", {}),
            "driving conditions"
          ] }),
          /* @__PURE__ */ jsx("p", { children: "High ambient temperatures, stop-start traffic, short trips, extended idling and dust are relevant when reviewing how the car is used." }),
          /* @__PURE__ */ jsx("p", { children: "The appropriate interval still depends on the manufacturer’s requirements, vehicle history and usage pattern. Dubai driving does not create one universal shorter interval for every engine." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "oil-driving-factors", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Thermometer, { size: 28, "aria-hidden": "true" }),
            /* @__PURE__ */ jsx("h3", { children: "Heat & traffic" }),
            /* @__PURE__ */ jsx("p", { children: "Review operating conditions and the manufacturer’s service guidance." })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Clock3, { size: 28, "aria-hidden": "true" }),
            /* @__PURE__ */ jsx("h3", { children: "Short trips & idling" }),
            /* @__PURE__ */ jsx("p", { children: "Mileage alone may not describe how the engine spends its time." })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Route, { size: 28, "aria-hidden": "true" }),
            /* @__PURE__ */ jsx("h3", { children: "Dust & usage" }),
            /* @__PURE__ */ jsx("p", { children: "Consider the actual driving pattern alongside the service history." })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("section", { id: "oil-service-comparison", className: "oil-comparison", "aria-labelledby": "oil-comparison-title", children: /* @__PURE__ */ jsxs("div", { className: "oil-shell", children: [
        /* @__PURE__ */ jsx("p", { className: "oil-kicker", children: "Choose the right visit" }),
        /* @__PURE__ */ jsx("h2", { id: "oil-comparison-title", children: "Oil change or full car service?" }),
        /* @__PURE__ */ jsx("p", { className: "oil-section-intro", children: "An oil change may be the work you need. A service reminder can also mean other scheduled maintenance is due." }),
        /* @__PURE__ */ jsxs("div", { className: "oil-comparison-columns", children: [
          /* @__PURE__ */ jsxs("article", { children: [
            /* @__PURE__ */ jsx("span", { className: "oil-comparison-label", children: "Focused engine-oil maintenance" }),
            /* @__PURE__ */ jsx("h3", { children: "Oil change" }),
            /* @__PURE__ */ jsxs("ul", { children: [
              /* @__PURE__ */ jsx("li", { children: "Vehicle-specified engine oil" }),
              /* @__PURE__ */ jsx("li", { children: "Applicable filter and sealing components" }),
              /* @__PURE__ */ jsx("li", { children: "Correct fill and oil-level verification" }),
              /* @__PURE__ */ jsx("li", { children: "Supported reset and agreed final checks" })
            ] }),
            /* @__PURE__ */ jsx("p", { children: "The oil-and-filter scope is confirmed for your vehicle." })
          ] }),
          /* @__PURE__ */ jsxs("article", { children: [
            /* @__PURE__ */ jsx("span", { className: "oil-comparison-label", children: "A wider scheduled visit" }),
            /* @__PURE__ */ jsx("h3", { children: "Full car service" }),
            /* @__PURE__ */ jsxs("ul", { children: [
              /* @__PURE__ */ jsx("li", { children: "Maintenance due by time, mileage or condition" }),
              /* @__PURE__ */ jsx("li", { children: "Additional filters and fluids where required" }),
              /* @__PURE__ */ jsx("li", { children: "Scheduled inspection items for the vehicle" }),
              /* @__PURE__ */ jsx("li", { children: "Scope selected from the schedule and service history" })
            ] }),
            /* @__PURE__ */ jsxs(LocalizedLink, { to: "/services/car-service-dubai", children: [
              "Explore Car Service Dubai ",
              /* @__PURE__ */ jsx(ArrowUpRight, { size: 18, "aria-hidden": "true" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "oil-advice", children: [
          /* @__PURE__ */ jsx("p", { children: "Not sure which service is due? Ask DIGI-TEC." }),
          /* @__PURE__ */ jsxs("a", { href: OIL_SERVICE_ADVICE, className: "oil-button oil-button-secondary", target: "_blank", rel: "noopener noreferrer", "data-cta-placement": "oil_service_advice", children: [
            "Ask Which Service Is Due ",
            /* @__PURE__ */ jsx(ArrowUpRight, { size: 18, "aria-hidden": "true" })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("section", { id: "oil-filter", className: "oil-section oil-shell oil-filter", "aria-labelledby": "oil-filter-title", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "oil-kicker", children: "Oil + filter, specified together" }),
          /* @__PURE__ */ jsx("h2", { id: "oil-filter-title", children: "The right filter matters, too." })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { children: "The correct oil filter and associated seals are selected for the vehicle specification and agreed service scope. Filter fitment, housing and sealing requirements are checked alongside the oil details." }),
          /* @__PURE__ */ jsx("p", { children: "Ask the team to identify the proposed filter and any additional seals or parts in the quote. A manufacturer-branded filter is not assumed for every service." })
        ] })
      ] }),
      /* @__PURE__ */ jsx("section", { id: "oil-cost", className: "oil-cost", "aria-labelledby": "oil-cost-title", children: /* @__PURE__ */ jsxs("div", { className: "oil-shell oil-cost-grid", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "oil-kicker", children: "A quote for your engine" }),
          /* @__PURE__ */ jsxs("h2", { id: "oil-cost-title", children: [
            "What affects oil change ",
            /* @__PURE__ */ jsx("br", {}),
            "cost in Dubai?"
          ] }),
          /* @__PURE__ */ jsx("p", { children: "Make, model and year help identify the engine and service requirements. The final quote follows the confirmed oil, parts and work your car needs." }),
          /* @__PURE__ */ jsx(WhatsApp, { placement: "exact_quote", quote: true, children: "Get an Exact Oil Change Quote" }),
          /* @__PURE__ */ jsx("p", { className: "oil-small-note", children: "Share your vehicle details. Review the scope before approving work." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "oil-cost-factors", children: [
          ["Oil specification", "The oil approval, viscosity and product required by the engine."],
          ["Oil quantity", "The engine’s capacity and the applicable service procedure."],
          ["Filter & seals", "Vehicle-specific filter, sealing components and any required parts."],
          ["Reset & agreed work", "Supported reminder procedures, labour and any additional approved work."]
        ].map(([title, description]) => /* @__PURE__ */ jsxs("article", { children: [
          /* @__PURE__ */ jsx("h3", { children: title }),
          /* @__PURE__ */ jsx("p", { children: description })
        ] }, title)) })
      ] }) }),
      /* @__PURE__ */ jsxs("section", { id: "oil-faq", className: "oil-section oil-shell oil-faq-grid", "aria-labelledby": "oil-faq-title", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "oil-kicker", children: "Before you book" }),
          /* @__PURE__ */ jsxs("h2", { id: "oil-faq-title", children: [
            "Oil change questions, ",
            /* @__PURE__ */ jsx("br", {}),
            "answered."
          ] }),
          /* @__PURE__ */ jsx("p", { children: "Oil, intervals, scope and the next step for your car." })
        ] }),
        /* @__PURE__ */ jsx(Accordion, { className: "oil-faq", type: "single", collapsible: true, children: oilFaqs.map((faq, index) => /* @__PURE__ */ jsxs(AccordionItem, { value: `oil-faq-${index}`, children: [
          /* @__PURE__ */ jsx(AccordionTrigger, { children: faq.question }),
          /* @__PURE__ */ jsx(AccordionContent, { forceMount: true, children: /* @__PURE__ */ jsx("p", { children: faq.answer }) })
        ] }, faq.question)) })
      ] }),
      /* @__PURE__ */ jsxs("section", { id: "oil-booking", className: "oil-booking oil-shell", "aria-labelledby": "oil-booking-title", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "oil-kicker", children: "Your next oil service" }),
          /* @__PURE__ */ jsx("h2", { id: "oil-booking-title", children: "Book your oil change." }),
          /* @__PURE__ */ jsx("p", { children: "Send your make, model, year and mileage. We’ll confirm the oil-and-filter scope, quote and available appointment." }),
          /* @__PURE__ */ jsx(WhatsApp, { placement: "booking", children: "Book Your Oil Change" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "oil-location", children: [
          /* @__PURE__ */ jsx(MapPin, { size: 25, "aria-hidden": "true" }),
          /* @__PURE__ */ jsx("h3", { children: "Oil change in Al Quoz, Dubai" }),
          /* @__PURE__ */ jsxs("p", { children: [
            "DIGI-TEC Performance Center ",
            /* @__PURE__ */ jsx("br", {}),
            "Al Quoz Industrial Area 3 ",
            /* @__PURE__ */ jsx("br", {}),
            "Dubai, UAE"
          ] }),
          /* @__PURE__ */ jsxs("a", { href: "https://maps.google.com/?q=Digi-Tec+Performance+Center+Al+Quoz+Industrial+Area+3+Dubai", target: "_blank", rel: "noopener noreferrer", "data-cta-placement": "oil_directions", children: [
            "Get directions ",
            /* @__PURE__ */ jsx(ArrowUpRight, { size: 18, "aria-hidden": "true" })
          ] }),
          /* @__PURE__ */ jsx("a", { href: "tel:+97143402223", "data-cta-placement": "oil_booking_call", children: "+971 4 340 2223" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
export {
  OilChangePage as default
};
