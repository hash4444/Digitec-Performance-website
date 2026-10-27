import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ArrowDown, MapPin, Phone, ArrowUpRight, TriangleAlert, Check, MessageCircle } from "lucide-react";
import { H as Header, F as Footer } from "./Footer-D0Xl6ot8.js";
import { d as useSeo, L as LocalizedLink, i as suspensionRepairImage, b as brands, S as SITE_URL, p as pageGraph, a as buildWebPage, g as buildBreadcrumb, h as buildService, c as buildFAQ } from "../entry-server.js";
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
const SUSPENSION_PATH = "/services/suspension-repair-dubai";
const SUSPENSION_TITLE = "Car Suspension Repair Dubai | Air Suspension | DIGI-TEC";
const SUSPENSION_DESCRIPTION = "Clunks, a harsh ride or sagging air suspension? Book a suspension inspection in Al Quoz, Dubai. Vehicle-specific diagnosis and a clear repair quote.";
const SUSPENSION_H1 = "Car Suspension Repair in Dubai";
const SUSPENSION_INTRO = "Knocks over bumps, an uneven ride height or a harsher ride? DIGI-TEC inspects conventional, adaptive and air suspension in Al Quoz, Dubai. We identify the fitted system and assess the fault before recommending parts or repairs.";
const suspensionWhatsApp = (concern = "I would like to book a suspension inspection.") => `https://wa.me/97143402223?text=${encodeURIComponent(`Hi DIGI-TEC, ${concern}

Make, model and year: 
Mileage: 
When it happens / affected corner: 
Warning message, if any: 
Recent repairs or impact, if relevant: 
Preferred appointment: `)}`;
const suspensionConcerns = [
  { id: "noise", label: "Knocks & clunks", short: "Over bumps, when turning or on rough roads", heading: "Tell us when the noise happens.", detail: "A knock can come from more than one component. The inspection may cover control arms, bushes, ball joints, stabilizer links, mounts and related steering or wheel components.", prompt: "Note the affected corner, road surface and whether turning or braking changes the sound.", enquiry: "I would like a suspension inspection for knocking or clunking." },
  { id: "height", label: "Low or uneven height", short: "One corner drops or the car settles overnight", heading: "Start with the fitted suspension system.", detail: "On an air-suspension vehicle, leaks, valve operation, height data and compressor performance may need testing. Uneven height does not, on its own, identify which part has failed.", prompt: "Tell us which corner drops, how long it takes and whether the height changes after starting.", enquiry: "I would like a suspension inspection for low or uneven ride height." },
  { id: "ride", label: "Harsh or bouncy ride", short: "More movement, vibration or a change in control", heading: "Look at the complete ride concern.", detail: "Dampers, springs, mounts, tyres, wheels and fitted electronic controls can all be relevant. A road assessment is considered only when appropriate and safe.", prompt: "Describe the speed, road conditions and any recent tyre, wheel or suspension work.", enquiry: "I would like a suspension inspection for a harsh, bouncy or unsettled ride." },
  { id: "warning", label: "Suspension warning", short: "A dashboard message or restricted height adjustment", heading: "Share the exact warning message.", detail: "A compatible scan can support the inspection, but a fault code alone is not a replacement instruction. Mechanical condition, wiring, sensors and system operation may also need checking.", prompt: "Send the message and when it appears. Follow the vehicle handbook if it instructs you to stop.", enquiry: "I would like advice about a suspension warning before arranging an inspection." }
];
const suspensionScope = [
  { title: "Shocks, struts & mounts", detail: "Assess damping concerns, condition, leakage and mounting components before confirming replacement scope." },
  { title: "Control arms, bushes & joints", detail: "Inspect for relevant wear, damage or movement; confirm the parts arrangement for the vehicle." },
  { title: "Springs & stabilizer links", detail: "Check applicable springs, links and related components against the reported noise or ride concern." },
  { title: "Air suspension", detail: "Vehicle-specific leak, air-spring, compressor, valve and ride-height checks where the fitted system supports them." },
  { title: "Adaptive & active systems", detail: "Identify the installed equipment and confirm diagnostic access, component options and supported procedures." },
  { title: "Geometry & final checks", detail: "Define any required alignment, supported calibration and post-repair checks in the agreed estimate." }
];
const suspensionProcess = [
  { title: "Understand the concern", detail: "Record symptoms, affected corner, warning messages, history and the exact vehicle configuration." },
  { title: "Inspect & test", detail: "Use relevant mechanical, ride-height, leak and compatible electronic checks. Road assessment depends on safety and the concern." },
  { title: "Explain & agree", detail: "Discuss the findings, proposed parts, labour, required procedures and expected timing before repair approval." },
  { title: "Repair & verify", detail: "Carry out agreed work and applicable final checks, including alignment or supported calibration when required." }
];
const suspensionBrands = [
  { name: "Mercedes-Benz", slug: "mercedes-benz-service-dubai", path: "/services/mercedes-suspension-repair-dubai" },
  { name: "BMW", slug: "bmw-service-dubai", path: "/brands/bmw-service-dubai/suspension-repair" },
  { name: "Porsche", slug: "porsche-service-dubai", path: "/brands/porsche-service-dubai/suspension-repair" },
  { name: "Audi", slug: "audi-service-dubai", path: "/brands/audi-service-dubai/suspension-repair" },
  { name: "Range Rover", slug: "range-rover-service-dubai", path: "/brands/range-rover-service-dubai/suspension-repair" },
  { name: "Bentley", slug: "bentley-service-dubai", path: "/brands/bentley-service-dubai/suspension-repair" }
];
const suspensionFaqs = [
  { question: "How much does suspension repair cost in Dubai?", answer: "Cost depends on the exact vehicle, fitted suspension, diagnostic work, failed components, parts option and labour. Required alignment or supported calibration can also affect the estimate. DIGI-TEC confirms the inspection scope and proposes a repair quote from the findings." },
  { question: "Can I drive with a suspension warning or a car sitting low?", answer: "Driving suitability cannot be confirmed from a message alone. Follow the vehicle handbook. If the car is severely low, a tyre is rubbing, control feels unstable or the display instructs you to stop, stop safely and seek assistance before continuing. Ask the team about inspection arrangements." },
  { question: "Why does my air suspension drop overnight?", answer: "Loss of height can involve an air spring, connection, line, valve or another system issue. The affected corner, time taken to drop, height data and appropriate leak or pressure checks help establish the cause. A low corner does not automatically mean the compressor needs replacement." },
  { question: "Does a suspension knock mean I need new shock absorbers?", answer: "No. Mounts, control arms, bushes, joints, stabilizer links and related components can also create noise. Tell the workshop when the noise occurs so the inspection can target the concern before parts are proposed." },
  { question: "Do you repair conventional, adaptive and air suspension?", answer: "DIGI-TEC accepts enquiries for supported conventional, adaptive and air-suspension systems. The model, year, VIN where needed and fitted equipment determine the required tools, parts and repair coverage. Hydraulic or active-system work is confirmed separately for the vehicle." },
  { question: "Do you inspect Mercedes AIRMATIC and ABC suspension?", answer: "Supported Mercedes AIRMATIC and Active Body Control applications can be assessed. AIRMATIC air suspension and ABC hydraulic suspension use different systems and procedures. Chassis-specific access, parts and repair scope are confirmed before work is accepted." },
  { question: "Is wheel alignment the same as suspension repair?", answer: "No. Alignment concerns wheel geometry; it does not replace a worn joint, damaged arm, failed damper or leaking air component. The findings determine whether repairs are needed and whether alignment is required afterwards." },
  { question: "Will my car need ride-height calibration after repair?", answer: "Some vehicles and repair procedures require supported ride-height or related system calibration. It depends on the fitted system, work performed and manufacturer procedure. It is confirmed in the agreed scope rather than added to every repair automatically." },
  { question: "How long does suspension repair take?", answer: "Timing depends on the inspection, fault, parts availability, access and any alignment or supported calibration. The workshop confirms the expected timing after defining the work. A fixed completion time cannot be assumed for every suspension concern." },
  { question: "Do you use genuine or other replacement suspension parts?", answer: "The quote identifies the proposed parts for the exact vehicle and repair. Ask the team about available sourcing options and the differences relevant to your car. A particular parts source or specification is not assumed before it is confirmed." },
  { question: "Where can I book a suspension inspection in Al Quoz?", answer: "DIGI-TEC Performance Center is in Al Quoz Industrial Area 3, Dubai. Call or WhatsApp +971 4 340 2223 with your make, model, year and symptoms to confirm coverage and arrange an inspection before travelling." },
  { question: "What should I send when requesting a suspension quote?", answer: "Send your make, model, year, mileage, affected corner, exact warning and when the issue occurs. Mention recent repairs, tyre changes or an impact if relevant. A safe photo or existing video can help describe the concern; a final repair quote may still require inspection." }
];
const url = `${SITE_URL}${SUSPENSION_PATH}`;
const graph = pageGraph([
  buildWebPage({ url, name: SUSPENSION_TITLE, description: SUSPENSION_DESCRIPTION, breadcrumbId: `${url}#breadcrumb`, mainEntityId: `${url}#service`, primaryImage: suspensionRepairImage }),
  buildBreadcrumb(url, [{ name: "Home", url: "/" }, { name: "Services", url: "/services" }, { name: SUSPENSION_H1, url }]),
  buildService({ url, name: SUSPENSION_H1, serviceType: "Car suspension inspection and repair", description: SUSPENSION_INTRO, image: suspensionRepairImage }),
  buildFAQ(url, suspensionFaqs)
]);
function Enquiry({ children, placement, concern }) {
  return /* @__PURE__ */ jsxs("a", { className: "susp-button susp-primary", href: suspensionWhatsApp(concern), target: "_blank", rel: "noopener noreferrer", "data-cta-placement": `suspension_${placement}`, children: [
    /* @__PURE__ */ jsx(MessageCircle, { size: 18, "aria-hidden": "true" }),
    children
  ] });
}
function SuspensionRepairPage() {
  const [selected, setSelected] = useState("noise");
  const { hash } = useLocation();
  useEffect(() => {
    var _a;
    if (hash) (_a = document.getElementById(hash.slice(1))) == null ? void 0 : _a.scrollIntoView({ block: "start", behavior: "instant" });
  }, [hash]);
  useSeo({ title: SUSPENSION_TITLE, description: SUSPENSION_DESCRIPTION, canonical: url, jsonLd: graph });
  const concern = suspensionConcerns.find((item) => item.id === selected) ?? suspensionConcerns[0];
  return /* @__PURE__ */ jsxs("div", { className: "susp-page", children: [
    /* @__PURE__ */ jsx(Header, { overlay: true }),
    /* @__PURE__ */ jsxs("main", { id: "main-content", children: [
      /* @__PURE__ */ jsxs("section", { className: "susp-hero susp-shell", "aria-labelledby": "susp-title", children: [
        /* @__PURE__ */ jsxs("nav", { className: "susp-breadcrumb", "aria-label": "Breadcrumb", children: [
          /* @__PURE__ */ jsx(LocalizedLink, { to: "/", children: "Home" }),
          /* @__PURE__ */ jsx("span", { children: "/" }),
          /* @__PURE__ */ jsx(LocalizedLink, { to: "/services", children: "Services" }),
          /* @__PURE__ */ jsx("span", { children: "/" }),
          /* @__PURE__ */ jsx("span", { "aria-current": "page", children: "Suspension repair" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "susp-hero-grid", children: [
          /* @__PURE__ */ jsxs("div", { className: "susp-hero-copy", children: [
            /* @__PURE__ */ jsx("p", { className: "susp-kicker", children: "Ride quality. Control. Confidence." }),
            /* @__PURE__ */ jsxs("h1", { id: "susp-title", children: [
              "Car Suspension ",
              /* @__PURE__ */ jsx("br", {}),
              "Repair ",
              /* @__PURE__ */ jsx("span", { children: "in Dubai" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "susp-lead", children: SUSPENSION_INTRO }),
            /* @__PURE__ */ jsxs("div", { className: "susp-actions", children: [
              /* @__PURE__ */ jsx(Enquiry, { placement: "hero", children: "Book a Suspension Inspection" }),
              /* @__PURE__ */ jsxs("a", { href: "#susp-symptoms", className: "susp-text-link", children: [
                "Explore your symptoms ",
                /* @__PURE__ */ jsx(ArrowDown, { size: 17, "aria-hidden": "true" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "susp-hero-details", children: [
              /* @__PURE__ */ jsxs("span", { children: [
                /* @__PURE__ */ jsx(MapPin, { size: 16, "aria-hidden": "true" }),
                "Al Quoz Industrial Area 3"
              ] }),
              /* @__PURE__ */ jsxs("a", { href: "tel:+97143402223", "data-cta-placement": "suspension_hero_call", children: [
                /* @__PURE__ */ jsx(Phone, { size: 16, "aria-hidden": "true" }),
                "Call DIGI-TEC"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("figure", { className: "susp-hero-photo", children: [
            /* @__PURE__ */ jsx("img", { src: suspensionRepairImage, width: 1600, height: 1066, ...{ fetchpriority: "high" }, alt: "Suspension strut, control arms and brake assembly with the wheel removed" }),
            /* @__PURE__ */ jsx("figcaption", { children: "Suspension detail · components vary by vehicle" }),
            /* @__PURE__ */ jsxs("div", { className: "susp-photo-label", children: [
              /* @__PURE__ */ jsx("span", { children: "Identify the system" }),
              /* @__PURE__ */ jsx("span", { children: "Inspect the concern" }),
              /* @__PURE__ */ jsx("span", { children: "Agree the repair" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "susp-intent-strip", children: [
          /* @__PURE__ */ jsx("span", { children: "Shock absorbers & struts" }),
          /* @__PURE__ */ jsx("span", { children: "Arms, bushes & joints" }),
          /* @__PURE__ */ jsx("span", { children: "Air & adaptive suspension" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { id: "susp-symptoms", className: "susp-section susp-shell", "aria-labelledby": "susp-symptoms-title", children: [
        /* @__PURE__ */ jsxs("div", { className: "susp-section-heading", children: [
          /* @__PURE__ */ jsx("p", { className: "susp-kicker", children: "Start with what you notice" }),
          /* @__PURE__ */ jsxs("h2", { id: "susp-symptoms-title", children: [
            "What has changed ",
            /* @__PURE__ */ jsx("br", {}),
            "about your ride?"
          ] }),
          /* @__PURE__ */ jsx("p", { children: "Select the concern closest to yours. These are starting points for an inspection, not a diagnosis." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "susp-concern-layout", children: [
          /* @__PURE__ */ jsx("div", { className: "susp-concern-options", role: "group", "aria-label": "Choose a suspension concern", children: suspensionConcerns.map((item) => /* @__PURE__ */ jsxs("button", { type: "button", id: `susp-choice-${item.id}`, "aria-pressed": selected === item.id, "aria-controls": `susp-panel-${item.id}`, onClick: () => setSelected(item.id), children: [
            /* @__PURE__ */ jsxs("span", { children: [
              /* @__PURE__ */ jsx("strong", { children: item.label }),
              /* @__PURE__ */ jsx("span", { children: item.short })
            ] }),
            /* @__PURE__ */ jsx(ArrowUpRight, { size: 20, "aria-hidden": "true" })
          ] }, item.id)) }),
          /* @__PURE__ */ jsxs("div", { className: "susp-concern-answer", "aria-live": "polite", children: [
            suspensionConcerns.map((item) => /* @__PURE__ */ jsxs("div", { id: `susp-panel-${item.id}`, "aria-labelledby": `susp-choice-${item.id}`, hidden: selected !== item.id, children: [
              /* @__PURE__ */ jsx("p", { className: "susp-panel-label", children: "Your inspection starts here" }),
              /* @__PURE__ */ jsx("h3", { children: item.heading }),
              /* @__PURE__ */ jsx("p", { children: item.detail }),
              /* @__PURE__ */ jsxs("div", { className: "susp-prompt", children: [
                /* @__PURE__ */ jsx("span", { children: "Useful details to share" }),
                /* @__PURE__ */ jsx("p", { children: item.prompt })
              ] })
            ] }, item.id)),
            /* @__PURE__ */ jsx(Enquiry, { placement: "selected_concern", concern: concern.enquiry, children: "Discuss This Concern" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("aside", { className: "susp-safety", children: [
          /* @__PURE__ */ jsx(TriangleAlert, { size: 21, "aria-hidden": "true" }),
          /* @__PURE__ */ jsx("p", { children: "If the car is severely low, a tyre is rubbing, control feels unstable or the handbook tells you to stop, stop safely and seek assistance before continuing." })
        ] })
      ] }),
      /* @__PURE__ */ jsx("section", { id: "susp-repairs", className: "susp-repairs", "aria-labelledby": "susp-repairs-title", children: /* @__PURE__ */ jsxs("div", { className: "susp-shell", children: [
        /* @__PURE__ */ jsxs("div", { className: "susp-split-heading", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "susp-kicker", children: "The work your car may need" }),
            /* @__PURE__ */ jsxs("h2", { id: "susp-repairs-title", children: [
              "Suspension repair, ",
              /* @__PURE__ */ jsx("br", {}),
              "matched to the findings."
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { children: "The vehicle specification and inspection determine which components need attention. Your estimate sets out parts, labour and any required follow-up procedures." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "susp-repair-list", children: suspensionScope.map((item, index) => /* @__PURE__ */ jsxs("article", { children: [
          /* @__PURE__ */ jsxs("span", { className: "susp-repair-number", children: [
            "0",
            index + 1
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { children: item.title }),
            /* @__PURE__ */ jsx("p", { children: item.detail })
          ] })
        ] }, item.title)) }),
        /* @__PURE__ */ jsx("p", { className: "susp-small", children: "Coverage and parts availability are confirmed for the exact vehicle. The list describes possible work, not a package automatically applied to every car." })
      ] }) }),
      /* @__PURE__ */ jsxs("section", { id: "susp-air", className: "susp-section susp-shell susp-air", "aria-labelledby": "susp-air-title", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "susp-kicker", children: "When ride height changes" }),
          /* @__PURE__ */ jsxs("h2", { id: "susp-air-title", children: [
            "Air suspension ",
            /* @__PURE__ */ jsx("br", {}),
            "repair in Dubai"
          ] }),
          /* @__PURE__ */ jsx("p", { children: "A car that settles overnight or struggles to change height needs an assessment of the fitted system. Air-spring leaks, lines, valves, compressor performance and height information can be relevant." }),
          /* @__PURE__ */ jsx("p", { children: "Replacing a visible component without checking the cause may leave the original problem unresolved. We define the relevant tests before agreeing the repair." }),
          /* @__PURE__ */ jsxs(LocalizedLink, { to: "/services/mercedes-suspension-repair-dubai", className: "susp-text-link", children: [
            "Mercedes AIRMATIC & suspension support ",
            /* @__PURE__ */ jsx(ArrowUpRight, { size: 17, "aria-hidden": "true" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "susp-air-checks", children: [
          /* @__PURE__ */ jsx("p", { className: "susp-panel-label", children: "An inspection can connect these checks" }),
          [
            ["01", "Height & history", "Which corner changes, when it happens and what the service history shows."],
            ["02", "Leaks & air paths", "Relevant air springs, connections, lines and valve operation."],
            ["03", "Supply & compressor", "Pressure supply and compressor operation, where supported."],
            ["04", "Sensors & controls", "Height information, wiring and compatible fault or live-data checks."]
          ].map(([number, title, detail]) => /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { children: number }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { children: title }),
              /* @__PURE__ */ jsx("p", { children: detail })
            ] })
          ] }, number)),
          /* @__PURE__ */ jsx("p", { className: "susp-system-note", children: "Air suspension, adaptive damping and hydraulic active suspension are different arrangements. The model, options and installed equipment determine the procedure." })
        ] })
      ] }),
      /* @__PURE__ */ jsx("section", { id: "susp-process", className: "susp-process", "aria-labelledby": "susp-process-title", children: /* @__PURE__ */ jsxs("div", { className: "susp-shell", children: [
        /* @__PURE__ */ jsx("p", { className: "susp-kicker", children: "A clear path to the repair" }),
        /* @__PURE__ */ jsxs("h2", { id: "susp-process-title", children: [
          "Understand. Test. ",
          /* @__PURE__ */ jsx("br", {}),
          "Agree. Repair."
        ] }),
        /* @__PURE__ */ jsx("ol", { children: suspensionProcess.map((step, index) => /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsxs("span", { "aria-hidden": "true", children: [
            "0",
            index + 1
          ] }),
          /* @__PURE__ */ jsx("h3", { children: step.title }),
          /* @__PURE__ */ jsx("p", { children: step.detail })
        ] }, step.title)) }),
        /* @__PURE__ */ jsxs("div", { className: "susp-process-end", children: [
          /* @__PURE__ */ jsx("p", { children: "Start with the symptoms and your vehicle details." }),
          /* @__PURE__ */ jsx(Enquiry, { placement: "process", children: "Request a Suspension Assessment" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("section", { id: "susp-alignment", className: "susp-section susp-shell susp-alignment", "aria-labelledby": "susp-alignment-title", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "susp-kicker", children: "Repair, alignment or another system?" }),
          /* @__PURE__ */ jsxs("h2", { id: "susp-alignment-title", children: [
            "Will alignment ",
            /* @__PURE__ */ jsx("br", {}),
            "solve the problem?"
          ] }),
          /* @__PURE__ */ jsx("p", { children: "Wheel alignment concerns geometry. It does not repair a worn joint, damaged control arm, failed damper or leaking air component." }),
          /* @__PURE__ */ jsx("p", { children: "A pull, vibration or uneven tyre wear can also involve tyres, wheels, steering or other components. Tell us about an impact, recent tyre changes or earlier repairs so the inspection can follow the evidence." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "susp-alignment-notes", children: [
          /* @__PURE__ */ jsxs("article", { children: [
            /* @__PURE__ */ jsx(Check, { size: 22, "aria-hidden": "true" }),
            /* @__PURE__ */ jsx("h3", { children: "Repair what the inspection finds" }),
            /* @__PURE__ */ jsx("p", { children: "Any worn or damaged components that affect the work are considered before the final geometry is set." })
          ] }),
          /* @__PURE__ */ jsxs("article", { children: [
            /* @__PURE__ */ jsx(Check, { size: 22, "aria-hidden": "true" }),
            /* @__PURE__ */ jsx("h3", { children: "Confirm the required final procedure" }),
            /* @__PURE__ */ jsx("p", { children: "Alignment and supported ride-height calibration depend on the vehicle and repair. Neither is assumed for every visit." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "susp-related-links", children: [
            /* @__PURE__ */ jsxs(LocalizedLink, { to: "/services/steering-repair-dubai", children: [
              "Steering & rack inspection ",
              /* @__PURE__ */ jsx(ArrowUpRight, { size: 16, "aria-hidden": "true" })
            ] }),
            /* @__PURE__ */ jsxs(LocalizedLink, { to: "/services/tire-repair-dubai", children: [
              "Tyre & wheel concerns ",
              /* @__PURE__ */ jsx(ArrowUpRight, { size: 16, "aria-hidden": "true" })
            ] }),
            /* @__PURE__ */ jsxs(LocalizedLink, { to: "/services/car-diagnostics-dubai", children: [
              "Vehicle diagnostics ",
              /* @__PURE__ */ jsx(ArrowUpRight, { size: 16, "aria-hidden": "true" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("section", { id: "susp-cost", className: "susp-cost", "aria-labelledby": "susp-cost-title", children: /* @__PURE__ */ jsxs("div", { className: "susp-shell susp-cost-grid", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "susp-kicker", children: "A quote with a defined scope" }),
          /* @__PURE__ */ jsxs("h2", { id: "susp-cost-title", children: [
            "What affects suspension ",
            /* @__PURE__ */ jsx("br", {}),
            "repair cost in Dubai?"
          ] }),
          /* @__PURE__ */ jsx("p", { children: "The same symptom can lead to different repairs. The inspection establishes the fault and the work needed before a final repair estimate is agreed." }),
          /* @__PURE__ */ jsx(Enquiry, { placement: "quote", concern: "I would like to discuss a suspension inspection and repair estimate.", children: "Ask About Inspection & Repair Cost" })
        ] }),
        /* @__PURE__ */ jsx("dl", { children: [
          ["Vehicle & system", "Model, year, fitted conventional, air, adaptive or active equipment."],
          ["Diagnosis & access", "The tests and component access needed to establish the cause."],
          ["Parts & labour", "The confirmed repair, proposed parts option and installation work."],
          ["Final procedures", "Required alignment, supported calibration and agreed verification."]
        ].map(([term, detail]) => /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("dt", { children: term }),
          /* @__PURE__ */ jsx("dd", { children: detail })
        ] }, term)) })
      ] }) }),
      /* @__PURE__ */ jsxs("section", { id: "susp-vehicles", className: "susp-section susp-shell", "aria-labelledby": "susp-vehicles-title", children: [
        /* @__PURE__ */ jsxs("div", { className: "susp-split-heading", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "susp-kicker", children: "Find your fitted system" }),
            /* @__PURE__ */ jsxs("h2", { id: "susp-vehicles-title", children: [
              "Suspension support ",
              /* @__PURE__ */ jsx("br", {}),
              "for your vehicle"
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { children: "Use your brand’s suspension page for model and system context. For other vehicles, send the make, model and year to confirm coverage before booking." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "susp-brand-links", children: suspensionBrands.map((brand) => {
          var _a;
          return /* @__PURE__ */ jsxs(LocalizedLink, { to: brand.path, children: [
            /* @__PURE__ */ jsx("img", { src: (_a = brands.find((item) => item.slug === brand.slug)) == null ? void 0 : _a.logo, alt: "", width: 48, height: 48, loading: "lazy" }),
            /* @__PURE__ */ jsxs("span", { children: [
              /* @__PURE__ */ jsx("strong", { children: brand.name }),
              /* @__PURE__ */ jsx("span", { children: "Suspension repair" })
            ] }),
            /* @__PURE__ */ jsx(ArrowUpRight, { size: 18, "aria-hidden": "true" })
          ] }, brand.slug);
        }) })
      ] }),
      /* @__PURE__ */ jsx("section", { id: "susp-faq", className: "susp-faq-section", "aria-labelledby": "susp-faq-title", children: /* @__PURE__ */ jsxs("div", { className: "susp-shell susp-faq-grid", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "susp-kicker", children: "Before the workshop visit" }),
          /* @__PURE__ */ jsxs("h2", { id: "susp-faq-title", children: [
            "Your suspension ",
            /* @__PURE__ */ jsx("br", {}),
            "questions, answered."
          ] }),
          /* @__PURE__ */ jsx("p", { children: "Cost, warning messages, air suspension and what to expect from the inspection." })
        ] }),
        /* @__PURE__ */ jsx(Accordion, { type: "single", collapsible: true, className: "susp-faq", children: suspensionFaqs.map((faq, index) => /* @__PURE__ */ jsxs(AccordionItem, { value: `susp-faq-${index}`, children: [
          /* @__PURE__ */ jsx(AccordionTrigger, { children: faq.question }),
          /* @__PURE__ */ jsx(AccordionContent, { forceMount: true, children: /* @__PURE__ */ jsx("p", { children: faq.answer }) })
        ] }, faq.question)) })
      ] }) }),
      /* @__PURE__ */ jsxs("section", { id: "susp-booking", className: "susp-booking susp-shell", "aria-labelledby": "susp-booking-title", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "susp-kicker", children: "Al Quoz · Dubai" }),
          /* @__PURE__ */ jsxs("h2", { id: "susp-booking-title", children: [
            "Let’s understand ",
            /* @__PURE__ */ jsx("br", {}),
            "what your car needs."
          ] }),
          /* @__PURE__ */ jsx("p", { children: "Send the vehicle details and what you have noticed. We’ll confirm coverage, the inspection scope and an available appointment." }),
          /* @__PURE__ */ jsx(Enquiry, { placement: "booking", children: "Arrange Your Suspension Inspection" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "susp-location", children: [
          /* @__PURE__ */ jsx(MapPin, { size: 26, "aria-hidden": "true" }),
          /* @__PURE__ */ jsx("h3", { children: "DIGI-TEC Performance Center" }),
          /* @__PURE__ */ jsxs("p", { children: [
            "Al Quoz Industrial Area 3 ",
            /* @__PURE__ */ jsx("br", {}),
            "Dubai, UAE"
          ] }),
          /* @__PURE__ */ jsxs("a", { href: "https://maps.google.com/?q=Digi-Tec+Performance+Center+Al+Quoz+Industrial+Area+3+Dubai", target: "_blank", rel: "noopener noreferrer", children: [
            "Get directions ",
            /* @__PURE__ */ jsx(ArrowUpRight, { size: 17, "aria-hidden": "true" })
          ] }),
          /* @__PURE__ */ jsx("a", { href: "tel:+97143402223", "data-cta-placement": "suspension_booking_call", children: "+971 4 340 2223" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
export {
  SuspensionRepairPage as default
};
