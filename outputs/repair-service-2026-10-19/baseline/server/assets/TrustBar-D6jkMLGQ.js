import { jsx, jsxs } from "react/jsx-runtime";
import { ShieldCheck } from "lucide-react";
import { u as useLocale } from "../entry-server.js";
import { a as arHome } from "./Footer-D0Xl6ot8.js";
const TrustBar = ({ className = "" }) => {
  const { isArabic } = useLocale();
  const englishItems = [
    {
      value: "Since 2002",
      label: "independent workshop"
    },
    {
      value: "European & luxury",
      label: "service and repair"
    },
    {
      value: "Inspection-led",
      label: "recommendations"
    },
    {
      value: "Al Quoz",
      label: "Dubai workshop"
    }
  ];
  const items = isArabic ? arHome.trust : englishItems;
  return /* @__PURE__ */ jsx("div", { className: `border-b border-white/[0.08] bg-[#101113] ${className}`, children: /* @__PURE__ */ jsx("div", { className: "mx-auto grid max-w-[90rem] grid-cols-2 px-5 sm:px-8 lg:grid-cols-4 lg:px-12", children: items.map((item) => /* @__PURE__ */ jsx("div", { className: "border-white/[0.08] py-6 odd:border-r odd:pr-5 even:pl-5 lg:border-r lg:px-8 lg:py-7 lg:first:pl-0 lg:last:border-r-0", children: /* @__PURE__ */ jsxs("div", { className: "text-left leading-tight", children: [
    /* @__PURE__ */ jsx("span", { className: "block text-sm font-semibold text-off-white sm:text-[0.95rem]", children: item.value }),
    /* @__PURE__ */ jsx("span", { className: "mt-1.5 block text-xs text-white/38", children: item.label })
  ] }) }, item.label)) }) });
};
const CtaAssurance = ({
  className = "",
  align = "center",
  text
}) => {
  const { isArabic } = useLocale();
  return /* @__PURE__ */ jsxs(
    "p",
    {
      className: `flex items-center ${align === "center" ? "justify-center" : "justify-start"} gap-2 text-[11px] sm:text-xs text-gray-400 tracking-wide ${className}`,
      children: [
        /* @__PURE__ */ jsx(ShieldCheck, { className: "w-3.5 h-3.5 text-burnt-orange shrink-0" }),
        text ?? (isArabic ? "تواصل معنا لمناقشة سيارتك وطلب موعد" : "Contact us to discuss your vehicle and request an appointment")
      ]
    }
  );
};
export {
  CtaAssurance as C,
  TrustBar as T
};
