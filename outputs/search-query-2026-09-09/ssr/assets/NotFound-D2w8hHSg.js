import { jsx, jsxs } from "react/jsx-runtime";
import { useLocation } from "react-router-dom";
import { u as useLocale, e as useSeo, L as LocalizedLink } from "../entry-server.js";
import { useEffect } from "react";
import "node:stream";
import "react-dom/server";
import "react-router-dom/server.mjs";
import "@radix-ui/react-toast";
import "class-variance-authority";
import "lucide-react";
import "clsx";
import "tailwind-merge";
import "next-themes";
import "sonner";
import "@radix-ui/react-tooltip";
import "@tanstack/react-query";
import "@radix-ui/react-accordion";
const NotFound = () => {
  const { isArabic } = useLocale();
  const location = useLocation();
  useSeo({
    title: isArabic ? "الصفحة غير موجودة | مركز ديجي-تك بيرفورمانس" : "Page Not Found | DIGI-TEC Performance Center",
    description: isArabic ? "الصفحة التي تبحث عنها غير موجودة. تصفح خدماتنا أو تواصل مع مركز ديجي-تك بيرفورمانس في دبي." : "The page you are looking for does not exist. Browse our services or contact Digitec Performance Center in Dubai.",
    noindex: true
  });
  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center bg-black text-off-white px-6", children: /* @__PURE__ */ jsxs("div", { className: "text-center max-w-md", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-6xl font-black mb-4 text-burnt-orange", children: "404" }),
    /* @__PURE__ */ jsx("p", { className: "text-xl mb-6", children: isArabic ? "الصفحة غير موجودة." : "Page not found." }),
    /* @__PURE__ */ jsx("p", { className: "text-white/60 mb-8 text-sm", children: isArabic ? "الصفحة التي طلبتها غير موجودة. يمكنك تصفح خدماتنا أو العودة إلى الصفحة الرئيسية." : "The page you requested does not exist. Try our services or head back home." }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-3 justify-center", children: [
      /* @__PURE__ */ jsx(LocalizedLink, { to: "/", className: "btn-primary", children: isArabic ? "الرئيسية" : "Home" }),
      /* @__PURE__ */ jsx(LocalizedLink, { to: "/services", className: "btn-secondary", children: isArabic ? "الخدمات" : "Services" })
    ] })
  ] }) });
};
export {
  NotFound as default
};
