import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { ArrowDown, Phone, Check, ChevronRight, ScanLine, Gauge, Settings2, Wrench, ArrowUpRight, TriangleAlert, MapPin, MessageCircle } from "lucide-react";
import { H as Header, F as Footer } from "./Footer-D0Xl6ot8.js";
import { d as useSeo, L as LocalizedLink, S as SITE_URL, p as pageGraph, a as buildWebPage, g as buildBreadcrumb, h as buildService, c as buildFAQ } from "../entry-server.js";
import { A as Accordion, a as AccordionItem, b as AccordionTrigger, c as AccordionContent } from "./accordion-DINZxoib.js";
import "react-router-dom";
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
const TRANSMISSION_PATH = "/services/transmission-repair-dubai";
const TRANSMISSION_TITLE = "Transmission Repair Dubai | Gearbox Specialists | DIGI-TEC";
const TRANSMISSION_DESCRIPTION = "Transmission and gearbox repair in Dubai for automatic, DCT, DSG, CVT and manual systems. Diagnostics, fluid service and repair at DIGI-TEC Al Quoz.";
const TRANSMISSION_H1 = "Transmission Repair & Gearbox Repair in Dubai";
const TRANSMISSION_INTRO = "Experiencing jerking, slipping gears, delayed shifting, a gearbox warning or unusual transmission noise? DIGI-TEC diagnoses supported automatic, DCT, DSG, CVT and manual systems at its Al Quoz workshop before recommending service or repair.";
const draft = (message) => `https://wa.me/97143402223?text=${encodeURIComponent(`${message}

Make, model and year: 
Mileage: 
Transmission or gearbox, if known: 
Warning and symptoms: 
When it happens: 
Preferred appointment: `)}`;
const TRANSMISSION_WHATSAPP = draft("Hi DIGI-TEC, I would like to arrange a transmission inspection.");
const transmissionSymptoms = [
  ["Jerking During Gear Changes", "Harsh or sudden shifts can be associated with transmission control, hydraulic, fluid, mount or internal gearbox problems. The cause needs diagnosis before service or repair is selected."],
  ["Transmission Slipping", "A flare in engine speed or loss of drive can have several transmission or control-related causes. Avoid heavy use and arrange an assessment."],
  ["Delayed Drive / Reverse", "A pause before engagement may relate to fluid level or pressure, control, clutch, converter or internal conditions depending on the fitted gearbox."],
  ["Gearbox Warning Light", "Record the exact message and driving condition. Compatible fault data and directed checks are needed before any component is blamed."],
  ["Transmission Fluid Leak", "Fluid near the gearbox may come from a seal, line, pan or another nearby system. The source and fluid level should be checked."],
  ["Grinding / Humming Noise", "Noise can travel through mounts and driveline components. Its location, speed, load and selected gear help define the inspection."],
  ["Vibration / Judder", "Judder may involve the gearbox, clutch, converter, mounts, shafts, wheels or engine operation. Testing separates overlapping causes."],
  ["Car Stuck in Gear", "A car that will not select or leave a gear may have an electronic, hydraulic, selector or mechanical fault. Follow the vehicle warning guidance and seek assistance if it cannot be driven safely."]
];
const transmissionServices = [
  ["Automatic transmission repair", "Diagnosis and supported repair for harsh shifts, slipping, delayed engagement, leaks and gearbox warnings."],
  ["Gearbox diagnostics", "Compatible fault-code, live-data and physical checks to separate electronic, hydraulic, mechanical and driveline causes."],
  ["Fluid & filter service", "Correct fluid, filter and level procedures for the identified transmission and agreed maintenance scope."],
  ["Mechatronic assessment", "Diagnosis and supported repair planning for electronic and hydraulic gearbox-control concerns."],
  ["Torque-converter assessment", "Investigation of supported converter-related judder, slipping and abnormal engagement before repair is proposed."],
  ["DCT & DSG service", "Diagnosis and servicing for supported dual-clutch systems, matched to the fitted gearbox and history."],
  ["CVT repair assessment", "Inspection, servicing and supported repair planning for continuously variable transmissions."],
  ["Manual gearbox & clutch", "Inspection of manual gearboxes and associated clutch, flywheel, mounts and driveline components."],
  ["Gearbox rebuild assessment", "Determine whether component repair, specialist rebuild assessment or replacement is the appropriate route. Rebuild capability is confirmed after diagnosis."]
];
const transmissionProcess = [
  ["Identify", "Confirm the vehicle, VIN where needed, fitted transmission, history and exact symptom."],
  ["Scan", "Review compatible stored faults and relevant operating data without treating a code as the diagnosis."],
  ["Inspect", "Check for visible leaks, damage and related drivetrain or mount concerns."],
  ["Assess", "Review behaviour, service history and fluid condition where applicable."],
  ["Recommend", "Explain the evidence and propose service, repair, further specialist assessment or replacement."],
  ["Test", "Complete applicable procedures and post-work testing after the agreed work is finished."]
];
const transmissionBrands = [
  ["Mercedes-Benz", "/services/mercedes-transmission-repair-dubai", "7G-TRONIC · 9G-TRONIC"],
  ["BMW", "/brands/bmw-service-dubai/transmission-repair", "ZF automatic · DCT · manual"],
  ["Porsche", "/brands/porsche-service-dubai/transmission-repair", "PDK · Tiptronic"],
  ["Audi", "/brands/audi-service-dubai/transmission-repair", "S tronic · Tiptronic"],
  ["Volkswagen", "/brands/volkswagen-service-dubai", "DSG · manual · fitted automatic"],
  ["Range Rover", "/brands/range-rover-service-dubai/transmission-repair", "Fitted ZF applications"],
  ["Rolls-Royce", "/brands/rolls-royce-service-dubai/transmission-repair", "Vehicle-specific automatic"],
  ["Bentley", "/brands/bentley-service-dubai/transmission-repair", "Model-specific gearbox"],
  ["Lamborghini", "/brands/lamborghini-service-dubai/transmission-repair", "Variant-specific transmission"]
];
const transmissionFaqs = [
  { question: "How much does transmission repair cost in Dubai?", answer: "Cost depends on the vehicle, fitted gearbox, fault, diagnostic time, parts and approved labour scope. DIGI-TEC defines the inspection first, then provides an estimate based on the findings." },
  { question: "What are the signs of a transmission problem?", answer: "Possible signs include jerking, slipping, delayed engagement, loss of drive, unusual noise, vibration, a fluid leak or a gearbox warning. These symptoms overlap with other systems, so diagnosis is required." },
  { question: "Can an automatic gearbox be repaired?", answer: "Many automatic-transmission concerns can be assessed for service or repair, but the available route depends on the exact gearbox and findings. Internal repair or rebuild capability is confirmed after diagnosis." },
  { question: "Can a transmission be repaired instead of replaced?", answer: "Sometimes. The choice between service, component repair, rebuild assessment and replacement depends on fault evidence, damage, parts, cost and the supported repair scope." },
  { question: "Why does my car jerk when changing gears?", answer: "Jerking can be associated with control, hydraulic, fluid, clutch, converter, mount, engine or internal transmission conditions. A symptom alone cannot identify the failed part." },
  { question: "Why is my transmission slipping?", answer: "Slipping or engine-speed flare may relate to control, pressure, clutch, converter, fluid or internal wear. Reduce unnecessary load and arrange diagnosis, especially if drive is unreliable or a warning appears." },
  { question: "Can low transmission fluid cause gearbox problems?", answer: "Incorrect fluid level can affect operation, but a low level may indicate a leak and is not the only possible cause. The correct fluid, level procedure and source of any loss must be confirmed." },
  { question: "Do you repair transmission mechatronic units?", answer: "DIGI-TEC can assess supported mechatronic concerns. Diagnostic access, parts and internal repair capability are confirmed for the exact unit before work is accepted." },
  { question: "Do you repair DCT, DSG and CVT transmissions?", answer: "Supported DCT, DSG and CVT systems can be inspected and serviced. The exact gearbox code, required procedures and repair capability are confirmed from the vehicle before booking." },
  { question: "Do you repair Mercedes, BMW, Audi and Porsche transmissions?", answer: "Dedicated pages cover transmission assessment for Mercedes-Benz, BMW, Audi and Porsche. The exact fitted gearbox and available diagnostic or repair scope are confirmed for each vehicle." },
  { question: "Where is DIGI-TEC located?", answer: "DIGI-TEC Performance Center is in Al Quoz Industrial Area 3, Dubai. Share your vehicle details and symptoms by WhatsApp or call +971 4 340 2223 before travelling." }
];
const url = `${SITE_URL}${TRANSMISSION_PATH}`;
const graph = pageGraph([buildWebPage({ url, name: TRANSMISSION_TITLE, description: TRANSMISSION_DESCRIPTION, breadcrumbId: `${url}#breadcrumb`, mainEntityId: `${url}#service` }), buildBreadcrumb(url, [{ name: "Home", url: "/" }, { name: "Services", url: "/services" }, { name: TRANSMISSION_H1, url }]), buildService({ url, name: TRANSMISSION_H1, serviceType: "Transmission diagnostics and gearbox repair", description: TRANSMISSION_INTRO }), buildFAQ(url, transmissionFaqs)]);
const WhatsApp = ({ children, placement, className = "trans-button trans-primary" }) => /* @__PURE__ */ jsxs("a", { className, href: TRANSMISSION_WHATSAPP, target: "_blank", rel: "noopener noreferrer", "data-cta-placement": `transmission_${placement}`, children: [
  /* @__PURE__ */ jsx(MessageCircle, { size: 18, "aria-hidden": "true" }),
  children
] });
function TransmissionPage() {
  const [active, setActive] = useState(0);
  useSeo({ title: TRANSMISSION_TITLE, description: TRANSMISSION_DESCRIPTION, canonical: url, jsonLd: graph });
  return /* @__PURE__ */ jsxs("div", { className: "trans-page", children: [
    /* @__PURE__ */ jsx(Header, { overlay: true }),
    /* @__PURE__ */ jsxs("main", { id: "main-content", children: [
      /* @__PURE__ */ jsxs("section", { className: "trans-hero trans-shell", "aria-labelledby": "trans-title", children: [
        /* @__PURE__ */ jsxs("nav", { className: "trans-crumb", "aria-label": "Breadcrumb", children: [
          /* @__PURE__ */ jsx(LocalizedLink, { to: "/", children: "Home" }),
          /* @__PURE__ */ jsx("span", { children: "/" }),
          /* @__PURE__ */ jsx(LocalizedLink, { to: "/services", children: "Services" }),
          /* @__PURE__ */ jsx("span", { children: "/" }),
          /* @__PURE__ */ jsx("span", { children: "Transmission repair" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "trans-hero-grid", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "trans-kicker", children: "Gearbox diagnosis · Al Quoz" }),
            /* @__PURE__ */ jsxs("h1", { id: "trans-title", children: [
              "Transmission Repair ",
              /* @__PURE__ */ jsx("span", { children: "& Gearbox Repair" }),
              " in Dubai"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "trans-lead", children: TRANSMISSION_INTRO }),
            /* @__PURE__ */ jsxs("div", { className: "trans-actions", children: [
              /* @__PURE__ */ jsx(WhatsApp, { placement: "hero", children: "WhatsApp a Transmission Specialist" }),
              /* @__PURE__ */ jsxs("a", { className: "trans-button trans-secondary", href: "#trans-book", children: [
                "Book Transmission Inspection ",
                /* @__PURE__ */ jsx(ArrowDown, { size: 18 })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("a", { className: "trans-call", href: "tel:+97143402223", "data-cta-placement": "transmission_hero_call", children: [
              /* @__PURE__ */ jsx(Phone, { size: 17 }),
              "Call DIGI-TEC"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("figure", { children: [
            /* @__PURE__ */ jsx("img", { src: "/images/paint-correction/workshop-floor-960.webp", srcSet: "/images/paint-correction/workshop-floor-540.webp 540w, /images/paint-correction/workshop-floor-960.webp 960w", sizes: "(min-width:800px) 46vw, calc(100vw - 40px)", width: "960", height: "1280", ...{ fetchpriority: "high" }, alt: "Luxury and performance cars in the DIGI-TEC workshop in Al Quoz" }),
            /* @__PURE__ */ jsx("figcaption", { children: "Inside DIGI-TEC Performance Center · Al Quoz Industrial Area 3" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "trans-trust", children: ["Al Quoz, Dubai", "Established 2002", "Advanced diagnostics", "Luxury & performance vehicles"].map((x) => /* @__PURE__ */ jsxs("span", { children: [
          /* @__PURE__ */ jsx(Check, { size: 15 }),
          x
        ] }, x)) })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "trans-symptoms", id: "symptoms", children: /* @__PURE__ */ jsxs("div", { className: "trans-shell trans-symptom-grid", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "trans-kicker", children: "Start with the behaviour" }),
          /* @__PURE__ */ jsx("h2", { children: "What is your car doing?" }),
          /* @__PURE__ */ jsx("p", { children: "Select a symptom commonly associated with transmission or drivetrain problems." }),
          /* @__PURE__ */ jsx("div", { className: "trans-symptom-list", role: "list", children: transmissionSymptoms.map(([label], i) => /* @__PURE__ */ jsxs("button", { onClick: () => setActive(i), "aria-expanded": active === i, className: active === i ? "active" : "", children: [
            /* @__PURE__ */ jsxs("span", { children: [
              "0",
              i + 1
            ] }),
            label,
            /* @__PURE__ */ jsx(ChevronRight, { size: 17 })
          ] }, label)) })
        ] }),
        /* @__PURE__ */ jsxs("aside", { "aria-live": "polite", children: [
          /* @__PURE__ */ jsx("span", { children: "Selected symptom" }),
          /* @__PURE__ */ jsx("h3", { children: transmissionSymptoms[active][0] }),
          /* @__PURE__ */ jsx("p", { children: transmissionSymptoms[active][1] }),
          /* @__PURE__ */ jsx("p", { children: "Have this symptom? Send the exact warning and when it happens." }),
          /* @__PURE__ */ jsx(WhatsApp, { placement: "symptom", children: "Send Vehicle Details" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "trans-diagnostic-strip", "aria-label": "Diagnostic workflow", children: [["Fault-code diagnosis", ScanLine], ["Live data analysis", Gauge], ["Fluid inspection", Settings2], ["Mechanical inspection", Wrench], ["Repair recommendation", ChevronRight], ["Post-work testing", Check]].map(([label, Icon]) => /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Icon, { size: 22 }),
        /* @__PURE__ */ jsx("span", { children: label })
      ] }, label)) }),
      /* @__PURE__ */ jsxs("section", { className: "trans-section trans-shell", id: "services", children: [
        /* @__PURE__ */ jsxs("div", { className: "trans-head", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "trans-kicker", children: "Service, diagnosis and repair" }),
            /* @__PURE__ */ jsx("h2", { children: "Transmission & gearbox services in Dubai" })
          ] }),
          /* @__PURE__ */ jsx("p", { children: "The fitted unit, evidence and service history determine the work—not the symptom alone." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "trans-service-grid", children: transmissionServices.map(([title, copy], i) => /* @__PURE__ */ jsxs("article", { children: [
          /* @__PURE__ */ jsx("span", { children: String(i + 1).padStart(2, "0") }),
          /* @__PURE__ */ jsx("h3", { children: title }),
          /* @__PURE__ */ jsx("p", { children: copy })
        ] }, title)) }),
        /* @__PURE__ */ jsxs("div", { className: "trans-inline-cta", children: [
          /* @__PURE__ */ jsx("p", { children: "Describe the warning, shift behaviour and when it happens." }),
          /* @__PURE__ */ jsx(WhatsApp, { placement: "services", children: "Request a Transmission Assessment" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "trans-systems", children: /* @__PURE__ */ jsxs("div", { className: "trans-shell trans-systems-grid", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "trans-kicker", children: "Identify the fitted unit first" }),
          /* @__PURE__ */ jsx("h2", { children: "Transmission systems we work with" }),
          /* @__PURE__ */ jsx("p", { children: "Names such as PDK, S tronic and 9G-TRONIC describe different gearbox families. Even within one family, specifications and procedures can vary by model and transmission code." }),
          /* @__PURE__ */ jsx("p", { children: "Coverage is confirmed from the exact vehicle before diagnostic, fluid or repair work is accepted." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "trans-system-board", children: [["Mercedes-Benz", "7G-TRONIC · 9G-TRONIC"], ["BMW / Rolls-Royce / selected Land Rover", "Supported ZF automatic applications"], ["Audi", "S tronic · Tiptronic · supported DSG"], ["Porsche", "PDK · Tiptronic"], ["Other supported systems", "Automatic · DCT · DSG · CVT · Manual"]].map(([a, b]) => /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("strong", { children: a }),
          /* @__PURE__ */ jsx("span", { children: b })
        ] }, a)) })
      ] }) }),
      /* @__PURE__ */ jsxs("section", { className: "trans-section trans-shell", "aria-labelledby": "volkswagen-dsg-title", children: [
        /* @__PURE__ */ jsx("p", { className: "trans-kicker", children: "Volkswagen DSG decisions" }),
        /* @__PURE__ */ jsx("h2", { id: "volkswagen-dsg-title", children: "DSG repair, maintenance or symptom diagnosis?" }),
        /* @__PURE__ */ jsx("p", { children: "A Volkswagen DSG enquiry can concern scheduled fluid service, a shift symptom or a confirmed gearbox fault. We identify the model, year and gearbox code, then review the warning, service history and supported diagnostic data before proposing work. Jerking or shuddering alone does not establish a failed clutch or mechatronic unit." }),
        /* @__PURE__ */ jsx("p", { children: "The mechatronic controls gearbox functions on relevant DSG applications, but fluid, clutch, electrical and other causes may need to be separated. DSG variants differ in clutch design, fluid and maintenance requirements; the applicable schedule and procedure come from the exact vehicle information." }),
        /* @__PURE__ */ jsxs("div", { className: "mt-5 flex flex-wrap gap-5", children: [
          /* @__PURE__ */ jsxs(LocalizedLink, { className: "trans-text-link", to: "/brands/volkswagen-service-dubai", children: [
            "Volkswagen service overview ",
            /* @__PURE__ */ jsx(ArrowUpRight, { size: 17 })
          ] }),
          /* @__PURE__ */ jsxs(LocalizedLink, { className: "trans-text-link", to: "/brands/volkswagen-service-dubai/engine-diagnostics", children: [
            "ODIS-supported warning diagnosis ",
            /* @__PURE__ */ jsx(ArrowUpRight, { size: 17 })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "trans-process", id: "process", children: /* @__PURE__ */ jsxs("div", { className: "trans-shell", children: [
        /* @__PURE__ */ jsx("p", { className: "trans-kicker", children: "Evidence before parts" }),
        /* @__PURE__ */ jsx("h2", { children: "How we diagnose transmission problems" }),
        /* @__PURE__ */ jsx("ol", { children: transmissionProcess.map(([title, copy], i) => /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsxs("span", { children: [
            "0",
            i + 1
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { children: title }),
            /* @__PURE__ */ jsx("p", { children: copy })
          ] })
        ] }, title)) }),
        /* @__PURE__ */ jsx(WhatsApp, { placement: "process", children: "Book Transmission Inspection" })
      ] }) }),
      /* @__PURE__ */ jsxs("section", { className: "trans-section trans-shell", id: "brands", children: [
        /* @__PURE__ */ jsxs("div", { className: "trans-head", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "trans-kicker", children: "Vehicle-specific pathways" }),
            /* @__PURE__ */ jsx("h2", { children: "European, luxury & performance transmissions" })
          ] }),
          /* @__PURE__ */ jsx("p", { children: "Choose your brand for details on the fitted gearbox, common symptoms and available transmission checks." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "trans-brand-grid", children: transmissionBrands.map(([brand, path, systems]) => /* @__PURE__ */ jsxs(LocalizedLink, { to: path, children: [
          /* @__PURE__ */ jsx("strong", { children: brand }),
          /* @__PURE__ */ jsx("span", { children: systems }),
          /* @__PURE__ */ jsx(ArrowUpRight, { size: 18 })
        ] }, brand)) }),
        /* @__PURE__ */ jsxs(LocalizedLink, { className: "trans-text-link", to: "/brands", children: [
          "View all supported brands ",
          /* @__PURE__ */ jsx(ArrowUpRight, { size: 17 })
        ] })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "trans-compare", children: /* @__PURE__ */ jsxs("div", { className: "trans-shell", children: [
        /* @__PURE__ */ jsx("p", { className: "trans-kicker", children: "Choose by condition" }),
        /* @__PURE__ */ jsx("h2", { children: "Transmission service or transmission repair?" }),
        /* @__PURE__ */ jsxs("div", { className: "trans-compare-grid", children: [
          /* @__PURE__ */ jsxs("article", { children: [
            /* @__PURE__ */ jsx("span", { children: "Scheduled maintenance" }),
            /* @__PURE__ */ jsx("h3", { children: "Transmission service" }),
            /* @__PURE__ */ jsxs("ul", { children: [
              /* @__PURE__ */ jsx("li", { children: "Correct transmission fluid" }),
              /* @__PURE__ */ jsx("li", { children: "Applicable filter and seals" }),
              /* @__PURE__ */ jsx("li", { children: "Vehicle-specific level procedure" }),
              /* @__PURE__ */ jsx("li", { children: "General condition and leak checks" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("article", { children: [
            /* @__PURE__ */ jsx("span", { children: "Existing fault or symptom" }),
            /* @__PURE__ */ jsx("h3", { children: "Transmission repair" }),
            /* @__PURE__ */ jsxs("ul", { children: [
              /* @__PURE__ */ jsx("li", { children: "Fault diagnosis and evidence" }),
              /* @__PURE__ */ jsx("li", { children: "Mechatronic or converter assessment" }),
              /* @__PURE__ */ jsx("li", { children: "Internal gearbox assessment" }),
              /* @__PURE__ */ jsx("li", { children: "Repair, rebuild or replacement route" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "trans-caution", children: [
          /* @__PURE__ */ jsx(TriangleAlert, { size: 24 }),
          /* @__PURE__ */ jsx("p", { children: "If the car is already jerking, slipping or displaying a transmission warning, do not assume a fluid change alone will solve it. Diagnose the fault first." })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("section", { className: "trans-section trans-shell trans-dubai", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "trans-kicker", children: "Heat, traffic and history" }),
          /* @__PURE__ */ jsx("h2", { children: "Transmission care in Dubai driving conditions" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { children: "High ambient temperatures, stop-start traffic and extended idling are relevant when reviewing transmission temperature, fluid condition and vehicle use. They do not prove a gearbox fault or create one universal service interval." }),
          /* @__PURE__ */ jsx("p", { children: "Follow the requirements for the fitted transmission and consider the vehicle’s history and actual use. Where a symptom exists, diagnosis should come before maintenance assumptions." }),
          /* @__PURE__ */ jsxs(LocalizedLink, { className: "trans-text-link", to: "/blog/transmission-service-7g-9g-dubai", children: [
            "Read the automatic transmission service guide ",
            /* @__PURE__ */ jsx(ArrowUpRight, { size: 17 })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "trans-resources", children: /* @__PURE__ */ jsxs("div", { className: "trans-shell", children: [
        /* @__PURE__ */ jsx("p", { className: "trans-kicker", children: "Continue with the right topic" }),
        /* @__PURE__ */ jsx("h2", { children: "Transmission guides & related services" }),
        /* @__PURE__ */ jsx("div", { children: [["Mercedes gearbox jerking guide", "/mercedes/problems/gearbox-jerking"], ["Mercedes transmission repair", "/services/mercedes-transmission-repair-dubai"], ["BMW transmission repair", "/brands/bmw-service-dubai/transmission-repair"], ["Porsche PDK & transmission repair", "/brands/porsche-service-dubai/transmission-repair"], ["Audi S tronic & transmission repair", "/brands/audi-service-dubai/transmission-repair"], ["Vehicle diagnostics", "/services/car-diagnostics-dubai"], ["Mechanical repair", "/services/mechanical-repair-dubai"]].map(([label, path]) => /* @__PURE__ */ jsxs(LocalizedLink, { to: path, children: [
          label,
          /* @__PURE__ */ jsx(ArrowUpRight, { size: 17 })
        ] }, path)) })
      ] }) }),
      /* @__PURE__ */ jsxs("section", { className: "trans-section trans-shell trans-faq", id: "faq", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "trans-kicker", children: "Before you book" }),
          /* @__PURE__ */ jsx("h2", { children: "Transmission repair questions" }),
          /* @__PURE__ */ jsx("p", { children: "Clear answers on symptoms, repair options, cost factors and supported gearbox work." })
        ] }),
        /* @__PURE__ */ jsx(Accordion, { type: "single", collapsible: true, children: transmissionFaqs.map((faq, i) => /* @__PURE__ */ jsxs(AccordionItem, { value: `trans-${i}`, children: [
          /* @__PURE__ */ jsx(AccordionTrigger, { children: faq.question }),
          /* @__PURE__ */ jsx(AccordionContent, { forceMount: true, children: /* @__PURE__ */ jsx("p", { children: faq.answer }) })
        ] }, faq.question)) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "trans-final trans-shell", id: "trans-book", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "trans-kicker", children: "Arrange a proper assessment" }),
          /* @__PURE__ */ jsx("h2", { children: "Having transmission problems?" }),
          /* @__PURE__ */ jsx("p", { children: "Don’t guess whether the gearbox needs servicing, electronic repair or mechanical work. Send the make, model, year, mileage and symptoms to arrange an inspection." }),
          /* @__PURE__ */ jsxs("div", { className: "trans-actions", children: [
            /* @__PURE__ */ jsx(WhatsApp, { placement: "final", children: "WhatsApp DIGI-TEC" }),
            /* @__PURE__ */ jsxs("a", { className: "trans-button trans-secondary", href: "tel:+97143402223", "data-cta-placement": "transmission_final_call", children: [
              /* @__PURE__ */ jsx(Phone, { size: 18 }),
              "Call DIGI-TEC"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("aside", { children: [
          /* @__PURE__ */ jsx(MapPin, { size: 25 }),
          /* @__PURE__ */ jsx("h3", { children: "DIGI-TEC Performance Center" }),
          /* @__PURE__ */ jsxs("p", { children: [
            "Al Quoz Industrial Area 3",
            /* @__PURE__ */ jsx("br", {}),
            "Dubai, UAE"
          ] }),
          /* @__PURE__ */ jsxs("a", { href: "https://maps.google.com/?q=Digi-Tec+Performance+Center+Al+Quoz+Industrial+Area+3+Dubai", target: "_blank", rel: "noopener noreferrer", children: [
            "Get directions ",
            /* @__PURE__ */ jsx(ArrowUpRight, { size: 17 })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
export {
  TransmissionPage as default
};
