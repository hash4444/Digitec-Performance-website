import { jsx, jsxs } from "react/jsx-runtime";
import { ArrowRight, Phone } from "lucide-react";
import { R as Reveal } from "./Reveal-B0bzMO-v.js";
import { u as useLocale } from "../entry-server.js";
import { a as arHome } from "./Footer-D0Xl6ot8.js";
const FinalCTA = ({ title, description, label, href } = {}) => {
  const { isArabic } = useLocale();
  const copy = isArabic ? arHome.cta : null;
  const steps = [
    { title: (copy == null ? void 0 : copy.cards[0].title) ?? "Share the details", text: (copy == null ? void 0 : copy.cards[0].text) ?? "Make, model, year and current concern" },
    { title: (copy == null ? void 0 : copy.cards[1].title) ?? "Arrange the visit", text: (copy == null ? void 0 : copy.cards[1].text) ?? "Choose the appropriate workshop inspection or service" },
    { title: (copy == null ? void 0 : copy.cards[2].title) ?? "Review the scope", text: (copy == null ? void 0 : copy.cards[2].text) ?? "Discuss findings and proposed work before approval" }
  ];
  return /* @__PURE__ */ jsx("section", { className: "home-section border-t border-white/[0.08] bg-[#101113]", children: /* @__PURE__ */ jsxs("div", { className: "home-container", children: [
    /* @__PURE__ */ jsxs(Reveal, { className: "grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "home-kicker mb-4", children: (copy == null ? void 0 : copy.eyebrow) ?? "Contact the workshop" }),
        /* @__PURE__ */ jsx("h2", { className: "home-heading max-w-3xl", children: (copy == null ? void 0 : copy.title) ?? title ?? "Tell us about your vehicle." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "lg:pt-2", children: [
        /* @__PURE__ */ jsx("p", { className: "home-lead", children: (copy == null ? void 0 : copy.description) ?? description ?? "Share the make, model, year and the service or symptoms you want checked. The Digi-Tec team can help arrange the appropriate workshop visit." }),
        /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-col gap-3 sm:flex-row", children: [
          /* @__PURE__ */ jsxs(
            "a",
            {
              "data-cta-placement": "final_cta",
              href: href ?? `https://wa.me/97143402223?text=${encodeURIComponent("Hi, I'd like to schedule a consultation at Digi-Tec Performance Center.")}`,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "home-button home-button-primary",
              children: [
                (copy == null ? void 0 : copy.schedule) ?? label ?? "Request an appointment",
                " ",
                /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4 shrink-0" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs("a", { href: "tel:+97143402223", "data-cta-placement": "final_cta", className: "home-button home-button-secondary", children: [
            /* @__PURE__ */ jsx(Phone, { className: "h-4 w-4" }),
            " ",
            (copy == null ? void 0 : copy.call) ?? "Call +971 4 340 2223"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-20 grid border-y border-white/[0.09] sm:grid-cols-3", children: steps.map((step, index) => /* @__PURE__ */ jsxs("div", { className: "border-b border-white/[0.09] py-6 sm:border-b-0 sm:border-r sm:px-7 sm:last:border-r-0 sm:first:pl-0", children: [
      /* @__PURE__ */ jsxs("span", { className: "text-xs text-burnt-orange", children: [
        "0",
        index + 1
      ] }),
      /* @__PURE__ */ jsx("h3", { className: "mt-6 text-base font-semibold text-white", children: step.title }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm leading-6 text-white/42", children: step.text })
    ] }, step.title)) })
  ] }) });
};
export {
  FinalCTA as F
};
