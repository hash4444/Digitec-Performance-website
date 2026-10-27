import { jsx, jsxs } from "react/jsx-runtime";
import { R as Reveal } from "./Reveal-B0bzMO-v.js";
import { u as useLocale } from "../entry-server.js";
import { a as arHome } from "./Footer-D0Xl6ot8.js";
const WhyChooseUs = () => {
  const { isArabic } = useLocale();
  const copy = isArabic ? arHome.why : null;
  const reasons = [
    { value: "2002", title: "Established in Dubai", description: "Serving vehicle owners from our Al Quoz workshop since 2002" },
    { value: "Al Quoz", title: "Dubai Workshop", description: "Located in Al Quoz Industrial Area 3" },
    { value: "Inspect", title: "Start With the Vehicle", description: "The reported concern and current condition guide the next step" },
    { value: "Explain", title: "Clear Repair Scope", description: "Findings and proposed work are discussed before approval" }
  ];
  const displayedReasons = reasons.map((reason, index) => copy ? { ...reason, ...copy.reasons[index] } : reason);
  return /* @__PURE__ */ jsx("section", { className: "home-section border-y border-white/[0.08] bg-[#0c0d0e]", children: /* @__PURE__ */ jsxs("div", { className: "home-container", children: [
    /* @__PURE__ */ jsxs(Reveal, { className: "max-w-4xl", children: [
      /* @__PURE__ */ jsx("p", { className: "home-kicker mb-4", children: (copy == null ? void 0 : copy.eyebrow) ?? "The DIGI-TEC standard" }),
      /* @__PURE__ */ jsx("h2", { className: "home-heading", children: (copy == null ? void 0 : copy.title) ?? "Experience shaped by a clear process." }),
      /* @__PURE__ */ jsx("p", { className: "home-lead mt-6", children: (copy == null ? void 0 : copy.description) ?? "An independent Dubai workshop for maintenance, diagnostics, repair, body work and vehicle-specific performance projects, established in 2002." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-16 grid border-y border-white/[0.09] sm:grid-cols-2 lg:mt-24 lg:grid-cols-4", children: displayedReasons.map((reason, index) => /* @__PURE__ */ jsxs(Reveal, { delay: index * 0.06, className: "border-b border-white/[0.09] p-6 sm:border-r lg:border-b-0 lg:p-8 lg:first:pl-0 lg:last:border-r-0", children: [
      /* @__PURE__ */ jsx("p", { className: "text-lg font-medium tracking-[-0.02em] text-burnt-orange", children: reason.value }),
      /* @__PURE__ */ jsx("h3", { className: "mt-8 text-lg font-semibold text-white", children: reason.title }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-6 text-white/45", children: reason.description })
    ] }, reason.title)) }),
    /* @__PURE__ */ jsxs(Reveal, { className: "mt-20 grid gap-10 lg:mt-28 lg:grid-cols-2 lg:items-start", children: [
      /* @__PURE__ */ jsx("h3", { className: "max-w-xl text-3xl font-semibold tracking-[-0.04em] text-white sm:text-5xl", children: (copy == null ? void 0 : copy.facilityTitle) ?? "Our workshop in Al Quoz, Dubai" }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "home-lead", children: (copy == null ? void 0 : copy.facilityText) ?? "Visit Digi-Tec Performance Center at Al Quoz Industrial Area 3. Contact the team with your vehicle details so the appropriate inspection or service can be arranged." }),
        /* @__PURE__ */ jsx("div", { className: "mt-10 divide-y divide-white/[0.09] border-y border-white/[0.09]", children: [0, 1, 2].map((index) => /* @__PURE__ */ jsxs("div", { className: "grid gap-2 py-5 sm:grid-cols-[12rem_1fr] sm:gap-6", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-white", children: (copy == null ? void 0 : copy.facilities[index].title) ?? ["Advanced Diagnostics", "Workshop Services", "Project Planning"][index] }),
          /* @__PURE__ */ jsx("p", { className: "text-sm leading-6 text-white/42", children: (copy == null ? void 0 : copy.facilities[index].text) ?? [
            "Fault finding based on the reported concern and vehicle condition",
            "Maintenance plus mechanical, electrical and body repair",
            "Vehicle-specific discussion before performance or conversion work"
          ][index] })
        ] }, index)) })
      ] })
    ] })
  ] }) });
};
export {
  WhyChooseUs as W
};
