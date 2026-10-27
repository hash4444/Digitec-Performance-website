import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import React__default, { useState, useEffect } from "react";
import { useLocation, useParams, Navigate } from "react-router-dom";
import { MessageCircle, Phone, MapPin, ArrowRight, CheckCircle2 } from "lucide-react";
import { H as Header, F as Footer } from "./Footer-D0Xl6ot8.js";
import { u as useLocale, r as trackWhatsAppClick, L as LocalizedLink, aH as BMW_HUB_PATH, a_ as getBrandBySlug, a$ as rangeRoverWorkshop, a8 as defenderWorkshop, g as buildBreadcrumb, a as buildWebPage, b0 as buildBrand, b1 as FERRARI_HUB_SERVICES, b2 as BRAND_OFFER_CATALOG, h as buildService, c as buildFAQ, p as pageGraph, d as useSeo, b as brands, K as getServiceBySlug, b3 as getServicesForBrand, b4 as BRAND_PROFILES, aF as audiModelPages, aD as audiModelPath, a9 as lamborghiniUrusWorkshop, b5 as g63BrabusFinishedFront, aw as MERCEDES_PROBLEMS_PATH, b6 as mercedesModelPages } from "../entry-server.js";
import { A as Accordion, a as AccordionItem, b as AccordionTrigger, c as AccordionContent } from "./accordion-DINZxoib.js";
import { z } from "zod";
import { G as GoogleReviews } from "./GoogleReviews-CcWxYJRB.js";
import { C as CtaAssurance } from "./TrustBar-D6jkMLGQ.js";
import { l as localizeBrandToArabic, a as arBrandServices, b as arBrandServiceNames } from "./ar-brands-DYbuhqMi.js";
import { l as localizeServiceToArabic } from "./ar-services-CclXnKHT.js";
import { m as maybachWorkshop, p as porscheGt3rsWorkshop, l as lamborghiniWorkshop, f as ferrariEngineWorkshop, a as porscheWorkshop } from "./porsche-workshop-dubai-BV044Qn8.js";
import { A as ASTON_SERVICES, a as ASTON_FAQS, b as ASTON_HUB_INTRO, c as ASTON_WHATSAPP_HREF } from "./astonMartinHubContent-LMYRY7RB.js";
const getSchema = (isArabic) => z.object({
  name: z.string().trim().max(80),
  phone: z.string().trim().max(20).refine((value) => !value || /^[+0-9\s()-]+$/.test(value) && value.replace(/\D/g, "").length >= 7, isArabic ? "يرجى إدخال رقم هاتف صحيح أو تركه فارغاً" : "Enter a valid phone number or leave it blank"),
  issue: z.string().trim().min(5, isArabic ? "يرجى وصف الخدمة أو المشكلة باختصار" : "Please describe the issue briefly").max(600)
});
const BrandBookingForm = ({ brandName, issuePlaceholder }) => {
  const { isArabic } = useLocale();
  const [values, setValues] = useState({ name: "", phone: "", issue: "" });
  const [errors, setErrors] = useState({});
  const handleSubmit = (e) => {
    var _a;
    e.preventDefault();
    const result = getSchema(isArabic).safeParse(values);
    if (!result.success) {
      const fieldErrors = {};
      result.error.issues.forEach((i) => {
        fieldErrors[i.path[0]] = i.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    const message = [
      isArabic ? "طلب حجز من digitecme.com" : "Booking request from digitecme.com",
      result.data.name && `${isArabic ? "الاسم" : "Name"}: ${result.data.name}`,
      result.data.phone && `${isArabic ? "الهاتف" : "Phone"}: ${result.data.phone}`,
      `${isArabic ? "العلامة" : "Brand"}: ${brandName}`,
      `${isArabic ? "الخدمة أو المشكلة" : "Issue"}: ${result.data.issue}`
    ].filter(Boolean).join("\n");
    const url = `https://wa.me/97143402223?text=${encodeURIComponent(message)}`;
    trackWhatsAppClick(url);
    (_a = window.gtag) == null ? void 0 : _a.call(window, "event", "whatsapp_draft_opened", {
      brand: brandName,
      page_path: window.location.pathname,
      form_id: "brand-booking-form",
      cta_placement: "booking_form"
    });
    window.open(url, "_blank", "noopener,noreferrer");
  };
  const input = "w-full bg-black/60 border border-white/10 focus:border-burnt-orange/60 rounded-2xl px-4 py-3 text-off-white placeholder-gray-500 outline-none transition-colors";
  return /* @__PURE__ */ jsxs("form", { id: "brand-booking-form", onSubmit: handleSubmit, className: "space-y-4", noValidate: true, children: [
    /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "bf-name", className: "block text-sm text-gray-300 mb-2", children: isArabic ? "الاسم (اختياري)" : "Name (optional)" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            id: "bf-name",
            type: "text",
            autoComplete: "name",
            "aria-invalid": Boolean(errors.name),
            "aria-describedby": errors.name ? "bf-name-error" : void 0,
            value: values.name,
            onChange: (e) => setValues((v) => ({ ...v, name: e.target.value })),
            className: input,
            placeholder: isArabic ? "مثال: أحمد المنصوري" : "e.g. Ahmed Al Mansouri",
            maxLength: 80
          }
        ),
        errors.name && /* @__PURE__ */ jsx("p", { id: "bf-name-error", role: "alert", className: "text-burnt-orange text-xs mt-1", children: errors.name })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "bf-phone", className: "block text-sm text-gray-300 mb-2", children: isArabic ? "رقم للاتصال (اختياري)" : "Callback number (optional)" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            id: "bf-phone",
            type: "tel",
            autoComplete: "tel",
            "aria-invalid": Boolean(errors.phone),
            "aria-describedby": errors.phone ? "bf-phone-error" : void 0,
            value: values.phone,
            onChange: (e) => setValues((v) => ({ ...v, phone: e.target.value })),
            className: input,
            placeholder: "+971 50 000 0000",
            maxLength: 20
          }
        ),
        errors.phone && /* @__PURE__ */ jsx("p", { id: "bf-phone-error", role: "alert", className: "text-burnt-orange text-xs mt-1", children: errors.phone })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { htmlFor: "bf-brand", className: "block text-sm text-gray-300 mb-2", children: isArabic ? "العلامة" : "Brand" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          id: "bf-brand",
          type: "text",
          value: brandName,
          readOnly: true,
          className: `${input} opacity-80 cursor-not-allowed`
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { htmlFor: "bf-issue", className: "block text-sm text-gray-300 mb-2", children: isArabic ? "كيف يمكننا مساعدتك؟" : "How can we help?" }),
      /* @__PURE__ */ jsx(
        "textarea",
        {
          id: "bf-issue",
          rows: 4,
          required: true,
          "aria-invalid": Boolean(errors.issue),
          "aria-describedby": errors.issue ? "bf-issue-error" : void 0,
          value: values.issue,
          onChange: (e) => setValues((v) => ({ ...v, issue: e.target.value })),
          className: `${input} resize-none`,
          placeholder: isArabic ? "أخبرنا عن سيارتك وما تحتاج إليه: صيانة أو إصلاح أو تشخيص" : issuePlaceholder ?? "Tell us about your car and what you need (service, repair or diagnostics)",
          maxLength: 600
        }
      ),
      errors.issue && /* @__PURE__ */ jsx("p", { id: "bf-issue-error", role: "alert", className: "text-burnt-orange text-xs mt-1", children: errors.issue })
    ] }),
    /* @__PURE__ */ jsxs(
      "button",
      {
        type: "submit",
        className: "inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-burnt-orange hover:bg-burnt-orange/90 text-black font-bold px-8 py-4 rounded-2xl transition-all duration-300 hover:scale-[1.02] shadow-xl",
        children: [
          /* @__PURE__ */ jsx(MessageCircle, { className: "w-5 h-5" }),
          isArabic ? "المتابعة إلى واتساب" : "Continue to WhatsApp"
        ]
      }
    ),
    /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: isArabic ? "الاسم ورقم الهاتف اختياريان. راجع رسالتك وأرسلها في واتساب. نرد خلال ساعات العمل: الاثنين–الجمعة من 8 صباحاً إلى 6:30 مساءً، والسبت من 8 صباحاً إلى 2 مساءً." : "Name and phone number are optional. Review and send your message in WhatsApp. We respond during working hours: Monday–Friday 8:00 AM–6:30 PM, Saturday 8:00 AM–2:00 PM." })
  ] });
};
const SERVICE_SPRINT_BRANDS = {
  "rolls-royce-service-dubai": {
    arabicName: "رولز رويس",
    maintenance: "",
    arabicMaintenance: "تُراجع تعليمات سنة الطراز والمسافة وسجل الصيانة لتحديد الزيت والفلاتر والسوائل والفحوص المستحقة. تُؤكد المواصفات ونطاق العمل قبل عرض السعر.",
    arabicModels: "تُراجع طلبات Ghost وCullinan وPhantom وWraith وDawn حسب سنة الصنع والتجهيزات. سيارة Spectre كهربائية وتختلف عن صيانة محركات الاحتراق؛ لا يُفترض توفر إصلاح البطارية عالية الجهد أو نظام الشحن."
  },
  "lamborghini-service-dubai": {
    arabicName: "لامبورغيني",
    maintenance: "",
    arabicMaintenance: "يُحدد الزيت والفلاتر والفحوص المستحقة من بيانات الطراز وسنة الصنع وسجل الصيانة والاستخدام. لا توجد حزمة أو فترة صيانة واحدة لجميع سيارات لامبورغيني.",
    arabicModels: "تختلف أنظمة Urus وHuracán وAventador وGallardo وRevuelto. يُؤكد نوع المحرك والقير والتعليق والفرامل قبل قبول العمل؛ لا يشمل طلب فحص الكهرباء منخفضة الجهد وعداً بإصلاح بطارية النظام الهجين."
  },
  "volkswagen-service-dubai": {
    arabicName: "فولكس فاجن",
    maintenance: "Oil, filters, fluid checks and inspection items follow the exact model-year schedule, mileage, history and fitted engine. The oil approval and any gearbox service procedure are confirmed before quotation; there is no single interval for every Volkswagen.",
    arabicMaintenance: "تُحدد أعمال الزيت والفلاتر والسوائل والفحص حسب تعليمات سنة الطراز والمسافة والسجل والمحرك المركب. تُؤكد مواصفات الزيت وإجراء صيانة القير قبل التسعير دون فرض فترة واحدة على جميع السيارات.",
    arabicModels: "أرسل فئة Golf أو GTI أو Golf R أو Tiguan أو Touareg أو Passat أو T-Roc وسنة الصنع. تُؤكد رموز المحرك والقير قبل العمل. تختلف سيارات ID الكهربائية عن سيارات الاحتراق ولا يُفترض توفر إصلاح أنظمة الجهد العالي."
  },
  "mercedes-benz-service-dubai": {
    arabicName: "مرسيدس بنز",
    maintenance: "",
    arabicMaintenance: "يُراجع مؤشر ASSYST وتعليمات الطراز وسجل الصيانة لتحديد بنود Service A أو Service B والعناصر الإضافية المستحقة. تُؤكد مواصفات الزيت والفلاتر والسوائل قبل الموافقة.",
    arabicModels: "تختلف متطلبات C-Class وE-Class وS-Class وGLC وGLE وG-Class وAMG حسب الجيل والتجهيزات. يُراجع رقم الهيكل والمحرك والقير ونوع التعليق قبل تحديد الإجراء والقطع المناسبة."
  },
  "bmw-service-dubai": {
    arabicName: "بي إم دبليو",
    maintenance: "",
    arabicMaintenance: "تبدأ الخطة من مؤشر Condition Based Service وتعليمات الطراز والمسافة وسجل الصيانة. تُدرج أعمال الزيت والفلاتر وشمعات الإشعال وسائل الفرامل عند استحقاقها وحسب المحرك ونطاق الخدمة المتفق عليه.",
    arabicModels: "أرسل طراز BMW وسنة الصنع والمحرك والتجهيزات، سواء كان من فئات 3 أو 5 أو X5 أو X6 أو M. تُؤكد إجراءات الصيانة ووظائف التشخيص والقطع للسيارة نفسها؛ لا تُعمم متطلبات طراز واحد على بقية الفئات."
  }
};
const getServiceSprintBrand = (slug) => slug ? SERVICE_SPRINT_BRANDS[slug] : void 0;
const VOLKSWAGEN_SERVICE_OWNERS = {
  "transmission-repair": "/services/transmission-repair-dubai",
  "suspension-repair": "/services/suspension-repair-dubai",
  "mechanical-repair": "/services/mechanical-repair-dubai",
  "steering-repair": "/services/steering-repair-dubai",
  "battery-replacement": "/services/battery-replacement-dubai",
  "electrical-repair": "/services/auto-electrical-repair-dubai",
  "exhaust-repair": "/services/exhaust-repair-dubai",
  "fuel-system-repair": "/services/fuel-system-repair-dubai",
  "body-repair": "/services/car-body-repair-dubai",
  "tire-repair": "/services/tire-repair-dubai"
};
function getSprintServices(slug, isArabic) {
  const content = getServiceSprintBrand(slug);
  if (!content) return [];
  if (isArabic) return [
    { title: "الصيانة الدورية وتغيير الزيت", description: content.arabicMaintenance, path: slug === "mercedes-benz-service-dubai" ? "/services/mercedes-oil-change-dubai" : `/brands/${slug}/oil-change`, label: "تفاصيل تغيير الزيت والصيانة" },
    { title: "التشخيص ورسائل التحذير", description: "تُراجع الأعراض وبيانات الأعطال مع الفحص الفعلي. رمز العطل وحده لا يثبت تلف القطعة. تُؤكد وظائف التشخيص وإعادة الضبط والبرمجة المتاحة حسب السيارة والوحدة والصلاحيات.", path: slug === "mercedes-benz-service-dubai" ? "/services/mercedes-diagnostics-dubai" : `/brands/${slug}/engine-diagnostics`, label: "فحص الأعطال والتشخيص" },
    { title: "فحص الأعطال الميكانيكية", description: "يبدأ طلب إصلاح تسرب الزيت أو نقص سائل التبريد أو الضجيج بتحديد النظام وفحصه. يُوضح سبب الإصلاح المقترح والقطع والسوائل وأجرة العمل قبل الموافقة، وتُؤكد الإجراءات المتاحة للسيارة.", path: "/services/mechanical-repair-dubai", label: "الفحص والإصلاح الميكانيكي" },
    { title: "الكهرباء والبطارية", description: "تحتاج صعوبة التشغيل أو ضعف البطارية أو الأعطال الكهربائية إلى فحص التغذية والشحن والأسلاك والنظام المتأثر قبل اختيار القطع. يُؤكد نطاق العمل المتاح، ولا يُفترض توفر إصلاح أنظمة الجهد العالي.", path: "/services/auto-electrical-repair-dubai", label: "فحص كهرباء السيارة" }
  ];
  return [
    { title: "Volkswagen routine maintenance", description: content.maintenance, path: `/brands/${slug}/oil-change`, label: "Volkswagen oil change and maintenance checks" },
    { title: "Diagnostics and warning lights", description: "EPC, check-engine warnings, rough running and starting concerns need fault data and physical checks. Available ODIS functions depend on the vehicle and access; a code alone does not identify a failed part.", path: `/brands/${slug}/engine-diagnostics`, label: "Volkswagen diagnostic assessment" },
    { title: "Mechanical repair assessment", description: "Oil leaks, coolant loss, unusual noise and drivability changes need inspection before a repair scope is agreed. The engine, fitted gearbox and test findings guide parts and fluid choices.", path: "/services/mechanical-repair-dubai", label: "Mechanical inspection and repair" },
    { title: "Electrical and battery concerns", description: "Battery drain, no-start and electrical warnings can involve the battery, charging, wiring or another system. Testing comes before replacement; coding and programming are confirmed for the exact module and available access.", path: "/services/auto-electrical-repair-dubai", label: "Electrical fault assessment" }
  ];
}
function BrandServiceScope({ slug, isArabic }) {
  const content = getServiceSprintBrand(slug);
  if (!content) return null;
  const services = getSprintServices(slug, isArabic);
  return /* @__PURE__ */ jsx("section", { className: "brand-section border-t border-white/5 bg-black py-12 sm:py-20", "aria-labelledby": "brand-service-scope-title", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl px-4 sm:px-6", children: [
    /* @__PURE__ */ jsx("h2", { id: "brand-service-scope-title", className: "text-2xl font-semibold sm:text-4xl", children: isArabic ? `صيانة وإصلاح ${content.arabicName} في دبي` : "Volkswagen maintenance, diagnostics and repair" }),
    /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-3xl text-base leading-8 text-gray-300", children: isArabic ? content.arabicModels : "Volkswagen (VW) Golf, GTI, Golf R, Tiguan, Touareg, Passat and T-Roc service requests start with the model, year, mileage and history. ID electric-drive enquiries need a separate scope check; combustion-engine service and high-voltage repair are not assumed." }),
    /* @__PURE__ */ jsx("div", { className: "mt-8 grid gap-6 sm:grid-cols-2", children: services.map((service) => /* @__PURE__ */ jsxs("article", { className: "rounded-2xl border border-white/10 p-5 sm:p-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold", children: service.title }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-7 text-gray-300", children: service.description }),
      /* @__PURE__ */ jsx(LocalizedLink, { to: service.path, className: "mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-burnt-orange underline", children: service.label })
    ] }, service.title)) })
  ] }) });
}
const contexts = {
  Audi: { introduction: "Before choosing protection for your Audi, assess the finish and compare ", filmAnchor: "paint protection film coverage", next: ". For swirls or haze, discuss ", href: "/services/car-polishing-dubai", anchor: "paint correction", ending: " before the preparation and protection are agreed." },
  Bentley: { introduction: "The paint history and finish on your Bentley guide the choice of ", filmAnchor: "physical film protection", next: ". If finish maintenance is the priority, compare ", href: "/services/ceramic-coating", anchor: "ceramic coating and its care requirements", ending: " for the surfaces you want treated." },
  "Mercedes-Benz": { introduction: "For your Mercedes-Benz, assess the finish and any previous paintwork before choosing ", filmAnchor: "paint protection film", next: ". If wash marks or haze are the concern, start with ", href: "/services/car-polishing-dubai", anchor: "a paint assessment", ending: " to discuss which defects may safely improve." },
  BMW: { introduction: "For a BMW used regularly, compare the covered panels and care needs of ", filmAnchor: "PPF coverage options", next: ". If easier washing is your main priority, explore ", href: "/services/ceramic-coating", anchor: "ceramic coating", ending: " and confirm the preparation appropriate for the paint." },
  Porsche: { introduction: "Original paint, repaired panels and how you use your Porsche all matter when selecting ", filmAnchor: "film protection for your Porsche", next: ". Existing surface marks may call for ", href: "/services/car-polishing-dubai", anchor: "polishing or paint correction", ending: " before the protection plan is agreed." },
  Ferrari: { introduction: "Discuss your Ferrari’s finish and the panels you want to preserve when reviewing ", filmAnchor: "paint protection film coverage", next: ". For swirls or dullness, ", href: "/services/car-polishing-dubai", anchor: "assess the paint’s correction limits", ending: " before pursuing a more intensive finish treatment." },
  Lamborghini: { introduction: "The finish and panel coverage on your Lamborghini should be confirmed before choosing ", filmAnchor: "full-body or selected-panel PPF", next: ". For surface behaviour and ongoing cleaning, compare ", href: "/services/ceramic-coating", anchor: "coating options", ending: " and ask which products suit the paint or film." },
  McLaren: { introduction: "Choose the areas you want to protect on your McLaren, then discuss the scope of ", filmAnchor: "PPF installation", next: ". The ", href: "/blog/ceramic-coating-vs-ppf-dubai", anchor: "film and ceramic comparison guide", ending: " explains the different roles of physical coverage and surface treatment." },
  "Aston Martin": { introduction: "Your Aston Martin’s paint history and current finish guide the choice of ", filmAnchor: "paint protection options with film", next: ". Where reflections look hazy or marked, discuss ", href: "/services/car-polishing-dubai", anchor: "restoring paint clarity", ending: " within the safe limits of the existing finish." },
  "Rolls-Royce": { introduction: "Preserving the presentation of your Rolls-Royce means considering both ", filmAnchor: "physical paint protection", next: " and the care routine. Explore ", href: "/services/ceramic-coating", anchor: "ceramic paint protection", ending: " if finish maintenance and easier cleaning are priorities." },
  "Range Rover": { introduction: "For your Range Rover, discuss the painted panels exposed in your normal driving and compare ", filmAnchor: "selected-panel and full-body film", next: ". For day-to-day surface care, review ", href: "/services/ceramic-coating", anchor: "coating preparation and maintenance", ending: " alongside the physical coverage you need." }
};
function BrandPaintCareLinks({ brandName }) {
  const context = contexts[brandName];
  if (!context) return null;
  return /* @__PURE__ */ jsx("section", { className: "brand-section py-12 border-t border-white/10", "aria-label": `${brandName} paint care`, children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto px-5 sm:px-6", children: [
    /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-bold mb-4", children: [
      "Paint care for your ",
      brandName
    ] }),
    /* @__PURE__ */ jsxs("p", { className: "text-gray-300 leading-8", children: [
      context.introduction,
      /* @__PURE__ */ jsx(LocalizedLink, { to: "/services/paint-protection-film", className: "text-burnt-orange underline", children: context.filmAnchor }),
      context.next,
      /* @__PURE__ */ jsx(LocalizedLink, { to: context.href, className: "text-burnt-orange underline", children: context.anchor }),
      context.ending
    ] })
  ] }) });
}
function MercedesMaintenanceScope({ isArabic }) {
  const { hash } = useLocation();
  useEffect(() => {
    var _a;
    if (hash === "#mercedes-maintenance-scope") (_a = document.getElementById("mercedes-maintenance-scope")) == null ? void 0 : _a.scrollIntoView({ block: "start" });
  }, [hash]);
  const rows = isArabic ? [
    ["الصيانة الأساسية أو الصغيرة", "قد تشمل زيت المحرك والفلتر والفحوص المستحقة وفق بيانات السيارة. تغيير الزيت وحده لا يغطي بالضرورة جميع متطلبات الخدمة."],
    ["الصيانة الموسعة أو الكبيرة", "قد تتضمن عناصر إضافية مثل الفلاتر أو شمعات الإشعال أو السوائل عندما يحين موعدها. نحدد كل بند حسب الطراز وسجل الصيانة."],
    ["Service A وService B", "يرتبط نطاق الزيارة ببيانات السيارة ومؤشر ASSYST وسجل الأعمال السابقة. لا نعتمد قائمة موحدة لجميع طرازات مرسيدس."],
    ["الأعمال الإضافية", "تشخيص الأعطال والإصلاحات والتسريبات والإطارات والفرامل وصيانة ناقل الحركة تُدرج بصورة منفصلة ما لم ينص عرض السعر على شمولها."]
  ] : [
    ["Minor service", "Typically centres on due oil/filter work and scheduled inspections. An oil change alone may not complete all the service items required by the vehicle."],
    ["Major service", "May include additional filters, spark plugs or fluid work when due. Each item is selected from the exact vehicle schedule and history, rather than a fixed package name."],
    ["Service A and Service B", "The VIN, model year, mileage, ASSYST display and previous work determine the visit. A/B labels and minor/major labels do not establish one universal checklist."],
    ["Separately quoted work", "Fault diagnosis, repairs, leaks, tyres, brakes and transmission servicing are separate unless expressly included. Additional findings are explained before extra work is approved."]
  ];
  return /* @__PURE__ */ jsx("section", { id: "mercedes-maintenance-scope", className: "brand-section scroll-mt-[10rem] border-t border-white/5 bg-charcoal/20 py-12 sm:py-16", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl px-4 sm:px-6", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black sm:text-4xl", children: isArabic ? "نطاق صيانة مرسيدس: الخدمة الصغيرة والكبيرة" : "Mercedes minor and major service: what is included?" }),
    /* @__PURE__ */ jsx("dl", { className: "mt-7 grid gap-4 sm:grid-cols-2", children: rows.map(([title, description]) => /* @__PURE__ */ jsxs("div", { className: "card-premium rounded-2xl p-5 sm:p-6", children: [
      /* @__PURE__ */ jsx("dt", { className: "text-lg font-bold", children: title }),
      /* @__PURE__ */ jsx("dd", { className: "mt-3 text-sm leading-7 text-white/65", children: description })
    ] }, title)) }),
    /* @__PURE__ */ jsxs("div", { className: "mt-8 max-w-3xl space-y-4 text-sm leading-7 text-white/65", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-off-white", children: isArabic ? "ما المعلومات المطلوبة للحجز وعرض السعر؟" : "What to send for a service quote" }),
      /* @__PURE__ */ jsx("p", { children: isArabic ? "أرسل رقم الهيكل VIN أو الطراز وسنة الصنع، والمسافة المقطوعة، وصورة رسالة الصيانة، وسجل آخر زيارة إن توفر. اذكر أي تحذير أو تسريب أو صوت غير معتاد حتى نميز بين الصيانة الدورية وتشخيص العطل." : "Send the VIN or model and year, mileage, a photo of the service-display message and the last service record if available. Include any warning, leak or unusual noise so scheduled maintenance and fault investigation can be scoped separately." }),
      /* @__PURE__ */ jsx("p", { children: isArabic ? "يوضح العرض قطع الغيار والسوائل والكميات وأجرة العمل والتشخيص والضريبة وأي أعمال غير مشمولة. نؤكد توفر القطع والموعد والمدة المتوقعة قبل بدء العمل." : "The estimate should identify parts, fluid specifications and quantities, labour, diagnosis, tax and exclusions. Parts availability, appointment time and expected duration are confirmed before work begins." }),
      /* @__PURE__ */ jsx("p", { children: isArabic ? "الورشة في منطقة القوز الصناعية 3، دبي. للحجز ومعرفة ساعات العمل الحالية اتصل أو راسلنا على ‎+971 4 340 2223 قبل الزيارة." : "Visit the workshop in Al Quoz Industrial Area 3, Dubai. Call or WhatsApp +971 4 340 2223 to confirm the appointment and current opening hours before travelling." }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-x-6 gap-y-3 pt-2", children: [
        /* @__PURE__ */ jsx(LocalizedLink, { to: "/services/mercedes-oil-change-dubai", className: "font-semibold text-burnt-orange hover:underline", children: isArabic ? "تغيير زيت مرسيدس والفلتر" : "Engine oil and filter scope" }),
        /* @__PURE__ */ jsx(LocalizedLink, { to: "/blog/mercedes-service-cost-dubai-guide", className: "font-semibold text-burnt-orange hover:underline", children: isArabic ? "كيف تُحسب تكلفة صيانة مرسيدس؟" : "How service costs are calculated" }),
        /* @__PURE__ */ jsx(LocalizedLink, { to: "/blog/mercedes-service-intervals-dubai-heat", className: "font-semibold text-burnt-orange hover:underline", children: isArabic ? "مواعيد الصيانة ومؤشر ASSYST" : "ASSYST and service intervals" }),
        /* @__PURE__ */ jsx(LocalizedLink, { to: "/blog/mercedes-benz-maintenance-guide-dubai", className: "font-semibold text-burnt-orange hover:underline", children: isArabic ? "تنظيم سجل الصيانة وأولويات الإصلاح" : "Organise maintenance records and repair priorities" }),
        /* @__PURE__ */ jsx(LocalizedLink, { to: "/blog/best-oil-change-dubai-mercedes", className: "font-semibold text-burnt-orange hover:underline", children: isArabic ? "مقارنة عروض تغيير الزيت" : "Compare oil-change proposals" }),
        /* @__PURE__ */ jsx(LocalizedLink, { to: "/blog/mercedes-repair-dubai-complete-guide", className: "font-semibold text-burnt-orange hover:underline", children: isArabic ? "تمييز أعراض الأعطال والخطوة التالية" : "Match a warning sign to the next inspection" })
      ] })
    ] })
  ] }) });
}
const PRIORITY_BRAND_SEO = {
  "maybach-service-dubai": {
    title: "Maybach Service & Repair Dubai | Digi-Tec Workshop",
    description: "Maybach service and repair in Dubai for S-Class, GLS, S580 and S680. Vehicle-specific diagnostics, suspension, AC and mechanical care in Al Quoz.",
    heroImage: "/images/maybach-service-dubai-hero.jpg",
    heroImageAlt: "Mercedes-Maybach receiving specialist service at Digi-Tec workshop in Dubai",
    heroImageWidth: 1200,
    heroImageHeight: 1600
  },
  "porsche-service-dubai": {
    title: "Porsche Service & Repair Dubai | Digi-Tec Workshop",
    description: "Porsche service and repair in Dubai for 911, Cayenne, Macan, Panamera, Cayman and Taycan, with diagnostics, PDK, brakes and suspension care in Al Quoz.",
    heroImage: "/images/porsche-service-dubai-hero.jpg",
    heroImageAlt: "Porsche GT3 RS inside the Digi-Tec specialist workshop in Dubai",
    heroImageWidth: 1200,
    heroImageHeight: 1600
  },
  "bmw-service-dubai": {
    title: "BMW Service & Repair Dubai | DIGI-TEC",
    description: "BMW service and repair in Al Quoz, Dubai. Independent workshop for scheduled maintenance, engine diagnostics, transmission, brakes, AC and electrical faults."
  },
  "lamborghini-service-dubai": {
    title: "Lamborghini Service & Repair Dubai | DIGI-TEC",
    description: "Lamborghini service and repair in Al Quoz, Dubai. Discuss maintenance, diagnostics and repairs for your model with DIGI-TEC. Request a service assessment.",
    heroImage: "/images/lamborghini-service-dubai-hero.jpg",
    heroImageAlt: "Lamborghini receiving specialist inspection at Digi-Tec workshop in Dubai",
    heroImageWidth: 900,
    heroImageHeight: 1600
  },
  "range-rover-service-dubai": {
    title: "Range Rover Repair Dubai | JLR Specialist Workshop",
    description: "Range Rover repair and service in Dubai for Range Rover, Sport, Velar and Evoque. JLR diagnostics, air suspension, cooling and ZF care in Al Quoz.",
    heroImage: "/images/range-rover-service-dubai-hero.jpg",
    heroImageAlt: "Range Rover inside the Digi-Tec specialist workshop in Al Quoz, Dubai",
    heroImageWidth: 941,
    heroImageHeight: 1672
  },
  "defender-service-dubai": {
    title: "Defender Service & Repair Dubai | Digi-Tec Workshop",
    description: "Land Rover Defender service and repair in Dubai for Defender 90, 110, 130, V8 and OCTA, including diagnostics, suspension, cooling and driveline care.",
    heroImage: "/images/defender-service-dubai-hero.jpg",
    heroImageAlt: "Land Rover Defender receiving workshop inspection at Digi-Tec in Dubai",
    heroImageWidth: 901,
    heroImageHeight: 1600
  },
  "rolls-royce-service-dubai": {
    title: "Rolls-Royce Service & Repair Dubai | DIGI-TEC",
    description: "Rolls-Royce service and repair in Al Quoz, Dubai for Ghost, Cullinan, Phantom, Wraith and Dawn. Independent maintenance, suspension and electrical diagnosis."
  },
  "bentley-service-dubai": {
    title: "Bentley Service & Repair Dubai | DIGI-TEC",
    description: "Bentley service and repair in Al Quoz, Dubai for Continental GT, Flying Spur and Bentayga. Independent maintenance, diagnostics and repair estimates.",
    heroImage: "/images/bentley-service-dubai-hero.jpg",
    heroImageAlt: "Bentley Flying Spur inside the Digi-Tec specialist workshop in Dubai",
    heroImageWidth: 941,
    heroImageHeight: 1672
  },
  "audi-service-dubai": {
    title: "Audi Service & Repair Dubai | Independent Audi Workshop | DIGI-TEC",
    description: "Audi service, repair, diagnostics and maintenance in Al Quoz, Dubai. Discuss engine, transmission, brakes, AC, suspension and battery concerns with DIGI-TEC."
  },
  "aston-martin-service-dubai": {
    title: "Aston Martin Service & Repair Dubai | DIGI-TEC",
    description: "Aston Martin service and repair in Al Quoz, Dubai for Vantage, DB11, DBX and DBS. Engine diagnostics, brakes, maintenance and electrical fault assessment.",
    heroImage: "/images/aston-martin-service-dubai-hero.jpg",
    heroImageAlt: "Aston Martin Vantage undergoing inspection at Digi-Tec workshop in Dubai",
    heroImageWidth: 941,
    heroImageHeight: 1672,
    supportingImages: [
      {
        src: "/images/aston-martin-service-dubai-workshop.jpg",
        alt: "Aston Martin Vantage rear view inside a Dubai automotive workshop",
        caption: "Aston Martin inspection in the workshop, with the exact diagnostic and repair scope confirmed from the vehicle before work begins.",
        width: 941,
        height: 1672
      }
    ]
  },
  "ferrari-service-dubai": {
    title: "Ferrari Service & Repair Dubai | DIGI-TEC",
    description: "Ferrari service and repair in Dubai at DIGI-TEC. Independent diagnostics, maintenance, engine, transmission, brake, suspension and electrical work in Al Quoz.",
    heroImage: "/images/ferrari-service-dubai-hero.jpg",
    heroImageAlt: "Ferrari receiving a mechanical inspection at DIGI-TEC workshop in Dubai",
    heroImageWidth: 941,
    heroImageHeight: 1672
  },
  "mclaren-service-dubai": {
    title: "McLaren Service & Repair Dubai | DIGI-TEC",
    description: "McLaren service and repair enquiries in Al Quoz, Dubai. Discuss maintenance, diagnostics and vehicle-specific repairs with DIGI-TEC. Request an assessment."
  },
  "maserati-service-dubai": {
    title: "Maserati Service & Repair Dubai | Digi-Tec Workshop",
    description: "Maserati service and repair in Dubai for Ghibli, Quattroporte, Levante, Grecale, GranTurismo and MC20, with diagnostics and mechanical care in Al Quoz.",
    heroImage: "/images/maserati-service-dubai-hero.jpg",
    heroImageAlt: "Maserati Ghibli inside the Digi-Tec specialist workshop in Dubai",
    heroImageWidth: 941,
    heroImageHeight: 1672
  },
  "cadillac-service-dubai": {
    title: "Cadillac Service & Repair Dubai | Digi-Tec Al Quoz",
    description: "Cadillac service and repair in Dubai for Escalade, CT4, CT5, XT models and Lyriq, including diagnostics, AC, suspension, brakes and mechanical inspection."
  },
  "volkswagen-service-dubai": {
    title: "Volkswagen Service & Repair Dubai | DIGI-TEC Al Quoz",
    description: "Volkswagen service and repair in Al Quoz, Dubai. Discuss routine maintenance, diagnostics, mechanical and electrical faults with DIGI-TEC. Request an assessment."
  },
  "rox-service-dubai": {
    title: "ROX 01 Service & Repair Dubai | DIGI-TEC Al Quoz",
    description: "ROX 01 service, repair and diagnostics in Al Quoz, Dubai. Discuss maintenance, AC, brakes, warning lights and soft-close-door concerns with DIGI-TEC."
  },
  "jetour-service-dubai": {
    title: "Jetour Service & Repair Dubai | DIGI-TEC Al Quoz",
    description: "Jetour service and repair enquiries in Al Quoz, Dubai. Discuss T2, X70, X90 Plus or Dashing maintenance, warnings, AC and brakes after vehicle-specific inspection."
  }
};
const PRIORITY_BRAND_SLUGS = Object.keys(PRIORITY_BRAND_SEO);
const getPriorityBrandSeo = (slug) => slug ? PRIORITY_BRAND_SEO[slug] : void 0;
const BMW_HUB_INTRO = "DIGI-TEC is an independent BMW workshop in Al Quoz, Dubai, for maintenance, repair and fault diagnosis. ISTA+ capability supports our assessment alongside physical tests. We check your model, VIN, service history and reported concern before recommending work; coding, programming and repair options are confirmed for the exact vehicle and requested function. Book an inspection on WhatsApp or call the workshop.";
const BMW_WHATSAPP_HREF = `https://wa.me/97143402223?text=${encodeURIComponent("Hi DIGI-TEC, I would like to book a BMW inspection.\n\nBMW model: \nYear: \nMileage: \nWarning lights or symptoms: \nPreferred appointment time: ")}`;
const BMW_CORE_SERVICES = [
  { title: "BMW maintenance & major service", slug: "oil-change", label: "BMW oil change and service checks", description: "Plan routine or major service around the Condition Based Service display, mileage and service history. Oil, filters, spark plugs, brake fluid and additional checks are included when due for the fitted engine and agreed service scope." },
  { title: "Engine repair & cooling", slug: "mechanical-repair", label: "BMW engine and mechanical repair", description: "Oil leaks, coolant loss, overheating and unusual engine noises need inspection before parts are chosen. The repair plan follows the engine code, test findings and condition of the cooling and lubrication systems." },
  { title: "BMW diagnostics", slug: "engine-diagnostics", label: "BMW diagnostics with ISTA+", description: "A drivetrain malfunction, check-engine light or rough idle can have several causes. ISTA+ fault review, live data and physical tests guide diagnosis; supported functions are confirmed for your model." },
  { title: "Transmission repair & ZF service", slug: "transmission-repair", label: "BMW transmission repair in Dubai", description: "Harsh shifts, slipping, leaks or a gearbox warning call for checks of fault data, fluid condition and the connected driveline. ZF 8HP service, M-DCT and manual gearbox procedures are matched to the transmission fitted." },
  { title: "Brake inspection & repair", slug: "brake-repair", label: "BMW brake repair", description: "Brake warnings, squealing or vibration can involve pads, discs, sensors, calipers or hydraulic components. We inspect the cause and confirm the standard, M Sport or M brake specification before proposing parts." },
  { title: "Suspension & air suspension", slug: "suspension-repair", label: "BMW suspension repair", description: "Knocking, uneven ride height or a harsh ride needs checks of bushes, arms, dampers and the fitted suspension system. Air springs, leaks, compressors and height sensors are considered on air-equipped models." },
  { title: "Air conditioning repair", slug: "ac-repair", label: "BMW AC repair in Dubai", description: "Weak cooling, warm air at idle or uneven cabin temperature needs AC performance testing. Inspection may cover refrigerant leaks, the compressor, condenser, fans and climate controls before a recharge or repair is proposed." },
  { title: "Electrical, iDrive & coding", slug: "electrical-repair", label: "BMW electrical repair and coding enquiries", description: "Electrical faults, iDrive issues and coding requests start with voltage, wiring, module and compatibility checks. Coding, programming and retrofit functions depend on the VIN, fitted hardware, software and required access." },
  { title: "Battery replacement & registration", slug: "battery-replacement", label: "BMW battery replacement", description: "Slow starting and battery warnings can also involve charging or unwanted current draw. Battery type, capacity and the supported registration or coding procedure are confirmed for the vehicle before replacement." }
];
const BMW_ADDITIONAL_SERVICES = [
  { slug: "body-repair", label: "BMW body repair", description: "Panel damage, paintwork and collision repair enquiries are assessed separately from routine mechanical servicing." },
  { slug: "steering-repair", label: "BMW steering repair" },
  { slug: "exhaust-repair", label: "BMW exhaust repair" },
  { slug: "fuel-system-repair", label: "BMW fuel system repair" },
  { slug: "tire-repair", label: "BMW tyre repair" }
];
const bmwServicePath = (slug) => `${BMW_HUB_PATH}/${slug}`;
const BMW_HUB_FAQS = [
  { q: "How often should a BMW be serviced in Dubai?", a: "Start with the BMW Condition Based Service display and the maintenance guidance for your exact model. We also review mileage, history and use in Dubai heat and traffic. An oil service, brake-fluid change or major service is quoted according to what is due; there is no single interval for every BMW." },
  { q: "What does BMW Condition Based Service mean?", a: "Condition Based Service uses time, mileage and vehicle data to estimate when monitored maintenance items are due. It helps plan servicing but does not replace inspection of a warning, leak, noise or other symptom." },
  { q: "Can you diagnose BMW drivetrain malfunction warnings?", a: "We can inspect the warning using compatible fault data, live readings and physical tests. Engine, ignition, boost, fuel, voltage, transmission and driveline concerns can trigger similar messages. Send the exact warning, model, year and symptoms so the workshop can confirm the first inspection." },
  { q: "Does a BMW ZF 8HP transmission need servicing?", a: "The service decision depends on the fitted 8HP variant, applicable BMW and transmission guidance, history, use and condition. We identify the gearbox before proposing fluid, a filter or a procedure. Harsh shifting or a warning needs diagnosis; fluid service alone may not resolve a shifting fault." },
  { q: "Can you replace and register a BMW battery?", a: "Battery replacement and registration are confirmed for the exact BMW and its energy-management system. We check the existing battery specification and charging condition, then confirm the correct replacement and supported registration function. A change in battery type or capacity may also require coding." },
  { q: "Can you repair BMW AC problems in Dubai?", a: "We can inspect weak cooling, warm air and climate-control faults. AC performance, leaks, compressor operation, airflow and electrical controls may need testing. The available repair and refrigerant specification are confirmed for your vehicle before work is agreed." },
  { q: "Do you offer BMW coding and iDrive diagnostics?", a: "Coding and iDrive requests are reviewed against the VIN, head unit, software level, fitted modules and required access. Tell us the fault or feature you want checked. Supported diagnostics, coding, programming or retrofit functions are confirmed before booking; availability varies by vehicle." },
  { q: "Do you use genuine BMW or OE-quality parts?", a: "Depending on the job and availability, parts options may include genuine BMW parts, established OE-supplier components or a suitable customer-approved alternative. Ask for the proposed manufacturer, specification and fluid approval in the estimate before agreeing to the work." },
  { q: "Why is my BMW losing coolant?", a: "Possible causes include a hose, expansion tank, radiator, thermostat housing, water pump or an internal engine concern. An inspection is needed to find the source. Repeated top-ups do not resolve a leak; stop driving if the engine overheats." },
  { q: "What BMW models use the B58?", a: "Selected 340i and M340i, 440i and M440i, 540i, 740i, X3 M40i, X4 M40i and X5 40i variants use the B58. Fitment varies by generation and market, so the VIN and engine code must confirm the specification." },
  { q: "How much does BMW service cost and how long does it take?", a: "Cost and timing depend on the model, due maintenance, diagnostic work, required parts and workshop availability. Send your model, year, mileage and symptoms for the appropriate next step. The team confirms the scope and available appointment; additional repair work may require an inspection first." }
];
const MCLAREN_HUB_PATH = "/brands/mclaren-service-dubai";
const MCLAREN_HUB_INTRO = "DIGI-TEC is an independent workshop in Al Quoz, Dubai, for McLaren service, maintenance, diagnostics and vehicle-specific repair enquiries. Tell us the model, year, mileage and concern; we then confirm the appropriate assessment, diagnostic access and workshop scope for the exact vehicle.";
const MCLAREN_WHATSAPP_HREF = `https://wa.me/97143402223?text=${encodeURIComponent("Hi DIGI-TEC, I would like to request a McLaren assessment.\n\nModel: \nYear: \nMileage: \nWarning or symptoms: \nPreferred appointment time: ")}`;
const MCLAREN_SERVICES = [
  { slug: "oil-change", title: "Maintenance and oil servicing", anchor: "McLaren oil change and maintenance", copy: "Service planning starts with the exact model, year, mileage and available history. Oil, filters, fluids and inspection items are confirmed from vehicle-specific information before an estimate is prepared." },
  { slug: "engine-diagnostics", title: "Engine diagnostics and warning lights", anchor: "McLaren engine diagnostics", copy: "Warning lights, reduced performance, misfires and starting concerns require compatible fault-data review and physical testing. Diagnostic coverage and supported functions are confirmed for the vehicle." },
  { slug: "mechanical-repair", title: "Engine, cooling and mechanical concerns", anchor: "McLaren mechanical repair assessment", copy: "Oil leaks, coolant loss, overheating, unusual noise and drivability concerns are assessed before parts or repair work are proposed." },
  { slug: "transmission-repair", title: "Transmission and gearbox assessment", anchor: "McLaren transmission repair assessment", copy: "Shift concerns, warning messages, leaks and clutch behaviour are assessed against the fitted transmission. Fluid service, calibration and internal repair availability are confirmed only after identification and inspection." },
  { slug: "suspension-repair", title: "Suspension and vehicle-lift concerns", anchor: "McLaren suspension assessment", copy: "Ride-height, front-lift, noise and handling concerns require identification of the model-specific suspension system. Hydraulic work, parts and supported calibration functions are confirmed before acceptance." },
  { slug: "brake-repair", title: "Brakes and tyres", anchor: "McLaren brake inspection", copy: "Brake warnings, vibration, pad or rotor wear and tyre condition are inspected against the fitted system. Carbon-ceramic components require vehicle-specific measurement and parts confirmation." },
  { slug: "electrical-repair", title: "Electrical and battery concerns", anchor: "McLaren electrical assessment", copy: "Battery drain, low-voltage warnings, starting problems and electrical faults are traced with appropriate testing. Module programming is not assumed and requires separate capability and vehicle-compatibility confirmation." },
  { slug: "ac-repair", title: "AC and climate concerns", anchor: "McLaren AC assessment", copy: "Weak cooling, leaks, compressor noise and airflow problems are tested before refrigerant or parts are recommended. The vehicle label determines the correct refrigerant and service equipment." }
];
const MCLAREN_SECONDARY_SERVICES = [
  { slug: "steering-repair", label: "McLaren steering assessment" },
  { slug: "battery-replacement", label: "McLaren battery replacement" },
  { slug: "exhaust-repair", label: "McLaren exhaust assessment" },
  { slug: "fuel-system-repair", label: "McLaren fuel-system assessment" },
  { slug: "body-repair", label: "McLaren body-repair enquiry" },
  { slug: "tire-repair", label: "McLaren tyre inspection" }
];
const MCLAREN_MODEL_GROUPS = [
  { name: "Sports Series", models: "570S, 570GT and 600LT", copy: "Maintenance, warning-light, cooling, brake, suspension and drivability enquiries are assessed against the exact generation and fitted systems." },
  { name: "Super Series", models: "650S, 675LT, 720S, 765LT and 750S", copy: "Engine, SSG transmission, braking, vehicle-lift and suspension considerations differ across generations, so scope is confirmed from the vehicle." },
  { name: "GT and GTS", models: "McLaren GT and GTS", copy: "Service history, mileage, storage, battery condition, cooling and the reported concern guide the first inspection." },
  { name: "Artura", models: "Artura and Artura Spider", copy: "General service and low-voltage enquiries can be discussed. Hybrid high-voltage work is not advertised and requires separate confirmation of training, equipment and scope." },
  { name: "Earlier road cars", models: "MP4-12C / 12C", copy: "Age, service history, parts access and the exact mechanical, electrical or hydraulic concern are reviewed before work is accepted." }
];
const MCLAREN_FAQS = [
  { q: "Where is your McLaren workshop in Dubai?", a: "DIGI-TEC Performance Center is in Al Quoz Industrial Area 3, Dubai. Use the directions link on this page or send your model, year, mileage and concern on WhatsApp before visiting." },
  { q: "Are you an independent McLaren workshop?", a: "Yes. DIGI-TEC is an independent vehicle workshop and is not presented as McLaren-authorised or factory-endorsed. Availability, diagnostic access, parts and procedures are confirmed for the exact vehicle and requested work." },
  { q: "What information is needed for a McLaren service quote?", a: "Send the model, year, mileage, available service history, requested work and any warning or symptom. A VIN may be requested later when it is needed to confirm the fitted system, parts or procedure." },
  { q: "How much does McLaren servicing cost in Dubai?", a: "There is no responsible single price for every McLaren. The estimate depends on the model, history, agreed inspection, diagnostic time, fluids, parts and findings. An accurate repair quote may require the vehicle to be inspected first." },
  { q: "How often should my McLaren be serviced?", a: "Follow the schedule and service information for the exact model and year, then consider mileage, history, storage and use. We do not apply one interval, oil grade or checklist to every McLaren." },
  { q: "Can you assess a McLaren engine warning light?", a: "An assessment can combine compatible fault data with physical checks and a road test when appropriate. A warning code is a starting point for diagnosis, not proof that the named component has failed." },
  { q: "Can you inspect McLaren gearbox or shifting problems?", a: "Gearbox warnings, leaks, engagement and shift-quality concerns can be assessed. The fitted transmission is identified first; service, clutch, calibration, internal repair and parts availability are confirmed only after diagnosis." },
  { q: "Which McLaren models and repair scopes can you accept?", a: "Enquiries can include Sports Series, Super Series, GT, GTS, Artura and earlier road cars. Maintenance, diagnostics and selected mechanical, transmission, suspension, brake, electrical, battery and AC concerns can be discussed, but acceptance depends on the exact model, systems, access and findings. Hybrid high-voltage work is not advertised." },
  { q: "What parts and fluids will be included in the estimate?", a: "The estimate should identify the proposed parts or fluid specification, quantity, labour and any diagnostic or additional work. Vehicle-specific information is checked before a part or fluid is proposed; availability and applicable terms are confirmed at quotation." },
  { q: "How do I request a McLaren appointment?", a: "Call the Al Quoz workshop or open the WhatsApp enquiry on this page. Share the model, year, mileage, warning or symptoms and preferred time. Sending the message requests an appointment; the team will confirm availability." }
];
const LAMBORGHINI_HUB_PATH = "/brands/lamborghini-service-dubai";
const LAMBORGHINI_HUB_INTRO = "DIGI-TEC is an independent workshop in Al Quoz, Dubai, where Lamborghini owners can request maintenance, diagnostics and vehicle-specific repair assessments. Send the model, year, mileage and concern so the team can confirm diagnostic access, parts and the appropriate workshop scope before booking.";
const LAMBORGHINI_WHATSAPP_HREF = `https://wa.me/97143402223?text=${encodeURIComponent("Hi DIGI-TEC, I would like to request a Lamborghini assessment.\n\nModel: \nYear: \nMileage: \nWarning or symptoms: \nPreferred appointment time: ")}`;
const LAMBORGHINI_SERVICES = [
  { slug: "oil-change", title: "Maintenance and oil servicing", anchor: "Lamborghini oil service in Dubai", copy: "Oil, filters, fluids and inspection items are confirmed from the exact model, year and available service information. We do not apply one interval or package to every Lamborghini." },
  { slug: "engine-diagnostics", title: "Engine diagnostics and warning lights", anchor: "Lamborghini engine diagnostics", copy: "Compatible fault data is combined with appropriate physical testing for warning lights, misfires, starting concerns and changes in drivability." },
  { slug: "mechanical-repair", title: "Engine, cooling and mechanical concerns", anchor: "Lamborghini mechanical repair assessment", copy: "Oil leaks, coolant loss, overheating, unusual noises and drivability concerns are assessed before parts or a repair scope are proposed." },
  { slug: "transmission-repair", title: "Transmission and gearbox assessment", anchor: "Lamborghini transmission assessment", copy: "The fitted transmission is identified first: Huracán EVO uses a seven-speed LDF dual-clutch transmission, Urus S an eight-speed automatic, and Aventador SVJ an ISR gearbox." },
  { slug: "suspension-repair", title: "Suspension and vehicle-lift concerns", anchor: "Lamborghini suspension assessment", copy: "Urus S adaptive air suspension is not the same system as a supercar front-axle lift. The model, variant and fitted equipment determine the inspection and supported repair scope." },
  { slug: "brake-repair", title: "Brake inspection and repair", anchor: "Lamborghini brake inspection", copy: "Pads, discs, sensors, calipers and fluid can be inspected. Carbon-ceramic component measurement, parts and procedures are confirmed for the fitted system." },
  { slug: "battery-replacement", title: "Low-voltage battery and starting concerns", anchor: "Lamborghini battery assessment", copy: "Starting, charging and battery-drain concerns are assessed as low-voltage work. Hybrid traction-battery service is not implied and requires separate capability confirmation." },
  { slug: "electrical-repair", title: "Electrical assessment", anchor: "Lamborghini electrical assessment", copy: "Voltage, wiring, sensors and module communication may require testing. Coding or programming is offered only when access and workshop capability are confirmed." },
  { slug: "ac-repair", title: "AC and climate concerns", anchor: "Lamborghini AC assessment", copy: "Weak cooling, leaks, airflow and compressor concerns are tested before refrigerant or parts are recommended; the vehicle label determines the specification." }
];
const LAMBORGHINI_SECONDARY_SERVICES = [
  { slug: "steering-repair", label: "Lamborghini steering assessment" },
  { slug: "exhaust-repair", label: "Lamborghini exhaust assessment" },
  { slug: "fuel-system-repair", label: "Lamborghini fuel-system assessment" },
  { slug: "body-repair", label: "Lamborghini body-repair enquiry" },
  { slug: "tire-repair", label: "Lamborghini tyre inspection" }
];
const LAMBORGHINI_FAQS = [
  { q: "Where is your Lamborghini workshop in Dubai?", a: "DIGI-TEC Performance Center is in Al Quoz Industrial Area 3, Dubai. Use the directions link or send the model, year, mileage and concern on WhatsApp before visiting." },
  { q: "Which Lamborghini models and services can you assess?", a: "Enquiries can include Urus, Huracán, Aventador, Gallardo and Revuelto models. Maintenance, diagnostics and selected mechanical, transmission, suspension, brake, low-voltage electrical and AC concerns can be discussed; acceptance depends on the exact vehicle and required scope." },
  { q: "What determines Lamborghini service cost?", a: "Cost depends on the model, history, diagnostic time, agreed service or repair scope, parts, fluids and findings. An accurate repair estimate may require an inspection." },
  { q: "Do you provide Lamborghini oil and filter servicing?", a: "Oil-service enquiries are welcome. The correct oil, filter, seals, due items and supported reset are confirmed from vehicle-specific information before quotation." },
  { q: "Can you investigate battery-drain or starting problems?", a: "Low-voltage battery, charging, unwanted-current and starting concerns can be assessed. Battery specification and any supported registration procedure are confirmed for the exact vehicle. This does not advertise hybrid traction-battery repair." },
  { q: "Can you diagnose engine or gearbox warning lights?", a: "Compatible fault information can be combined with physical tests and a road test when appropriate. A warning code does not by itself identify the failed part, and supported diagnostic functions are confirmed before booking." },
  { q: "Can you inspect Urus suspension or Lamborghini front-lift concerns?", a: "The concern can be discussed and the fitted system identified. Urus air suspension and supercar front-lift systems are different, so hydraulic procedures, calibration, parts and accepted repair scope are confirmed for the exact model." },
  { q: "Can you inspect carbon-ceramic brakes?", a: "Brake concerns can be inspected, but not every Lamborghini has the same brake specification. Measurement method, replacement parts and accepted workshop scope are confirmed for the fitted system." },
  { q: "How is the correct maintenance schedule determined?", a: "Use manufacturer service information for the exact model and year, then consider history, mileage, storage and Dubai use. DIGI-TEC does not publish one universal interval for every Lamborghini." },
  { q: "What information should I send for an estimate?", a: "Send the model, year, mileage, warning text, symptoms, when they occur and your preferred appointment time. A VIN is not required for the first enquiry but may be requested later to confirm systems or parts." }
];
const ROLLS_ROYCE_HUB_PATH = "/brands/rolls-royce-service-dubai";
const ROLLS_ROYCE_HUB_INTRO = "DIGI-TEC is an independent workshop in Al Quoz, Dubai, for Rolls-Royce maintenance, diagnostics and vehicle-specific repair enquiries. Send the model, year, mileage, service history and concern so the team can confirm the appropriate first assessment and workshop scope.";
const ROLLS_ROYCE_WHATSAPP_HREF = `https://wa.me/97143402223?text=${encodeURIComponent("Hi DIGI-TEC, I would like to request a Rolls-Royce service assessment.\n\nModel: \nYear: \nMileage: \nService history: \nWarning or symptoms: \nPreferred appointment time: ")}`;
const ROLLS_ROYCE_SERVICES = [
  { slug: "oil-change", title: "Maintenance and oil servicing", anchor: "Rolls-Royce oil service in Dubai", copy: "The model, year, mileage and service history determine the due maintenance items. Oil, filters, fluids and any supported service reset are confirmed from vehicle-specific information before quotation." },
  { slug: "engine-diagnostics", title: "Diagnostics and warning lights", anchor: "Rolls-Royce diagnostics in Dubai", copy: "Warning messages, misfires, starting concerns and changes in drivability are assessed with compatible fault data and appropriate physical testing. A stored code is evidence, not proof that a part has failed." },
  { slug: "mechanical-repair", title: "Engine, cooling and mechanical concerns", anchor: "Rolls-Royce mechanical repair assessment", copy: "Oil leaks, coolant loss, overheating, unusual noise and other mechanical concerns are inspected before a repair route, parts or timing are proposed." },
  { slug: "transmission-repair", title: "Transmission and gearbox assessment", anchor: "Rolls-Royce transmission assessment", copy: "Gearbox warnings, leaks, delayed engagement and shift-quality concerns are assessed against the fitted transmission. Fluid, service functions and repair availability are confirmed for the exact vehicle." },
  { slug: "suspension-repair", title: "Air suspension and ride quality", anchor: "Rolls-Royce suspension assessment", copy: "Ride-height warnings, leaning, compressor operation, noise and changes in ride quality require identification of the fitted suspension. Parts and supported calibration functions are confirmed before work." },
  { slug: "brake-repair", title: "Brakes, steering and tyres", anchor: "Rolls-Royce brake inspection", copy: "Brake warnings, vibration, pad and disc condition, steering concerns and tyre wear are measured before parts or alignment work are recommended." },
  { slug: "electrical-repair", title: "Electrical and battery concerns", anchor: "Rolls-Royce electrical assessment", copy: "Battery drain, low-voltage warnings, no-start concerns and electrical faults are traced with appropriate testing. Coding or programming is not assumed and requires separate confirmation." },
  { slug: "ac-repair", title: "Air conditioning and cabin climate", anchor: "Rolls-Royce AC assessment", copy: "Weak cooling, airflow, leaks, compressor noise and cabin-zone concerns are tested before refrigerant or parts are proposed. The vehicle label determines the correct refrigerant and service equipment." }
];
const ROLLS_ROYCE_SECONDARY_SERVICES = [
  { slug: "steering-repair", label: "Rolls-Royce steering assessment" },
  { slug: "battery-replacement", label: "Rolls-Royce battery assessment" },
  { slug: "exhaust-repair", label: "Rolls-Royce exhaust assessment" },
  { slug: "fuel-system-repair", label: "Rolls-Royce fuel-system assessment" },
  { slug: "body-repair", label: "Rolls-Royce body-repair enquiry" },
  { slug: "tire-repair", label: "Rolls-Royce tyre inspection" }
];
const ROLLS_ROYCE_MODEL_GROUPS = [
  { name: "Cullinan", models: "Cullinan and Black Badge Cullinan", copy: "Maintenance, brake, suspension, battery, cooling and warning-light enquiries are assessed against the exact model year and fitted equipment." },
  { name: "Ghost", models: "Ghost and Ghost Extended", copy: "Ghost generations differ. Planar, Flagbearer and satellite-aided transmission references apply to the relevant newer Ghost generation and are not assumed for every Ghost." },
  { name: "Phantom", models: "Phantom and Phantom Extended", copy: "Service history, age, mileage and the fitted mechanical, suspension, comfort and electrical systems guide the initial inspection." },
  { name: "Earlier coupé and convertible models", models: "Wraith and Dawn", copy: "Maintenance and repair enquiries are reviewed around the exact vehicle, history, parts access and reported concern. Roof work is not advertised without scope confirmation." },
  { name: "Spectre", models: "Spectre and Spectre Series II", copy: "Spectre is fully electric and is kept separate from combustion-engine servicing. General and low-voltage enquiries can be discussed; high-voltage battery, charging and isolation work is not advertised." }
];
const ROLLS_ROYCE_FAQS = [
  { q: "Where is your Rolls-Royce workshop in Dubai?", a: "DIGI-TEC Performance Center is in Al Quoz Industrial Area 3, Dubai. Use the directions link on this page or send the model, year, mileage and concern on WhatsApp before visiting." },
  { q: "Are you an independent Rolls-Royce workshop?", a: "Yes. DIGI-TEC is an independent vehicle workshop and is not presented as Rolls-Royce-authorised or factory-endorsed. Vehicle acceptance, diagnostic access, parts and procedures are confirmed for the requested work." },
  { q: "Which Rolls-Royce models and services can you accept?", a: "Enquiries can include Cullinan, Ghost, Phantom, Wraith, Dawn and Spectre. Maintenance, diagnostics and selected mechanical, transmission, suspension, brake, electrical, battery and AC concerns can be discussed. Acceptance depends on the exact model, systems, tooling, parts and findings." },
  { q: "What determines Rolls-Royce service cost?", a: "Model, year, mileage, history, due maintenance, diagnostic time, parts, fluids, labour and inspection findings affect the estimate. A responsible repair price may require an in-workshop assessment first." },
  { q: "Can you assess a Rolls-Royce engine or gearbox warning?", a: "The team can discuss an assessment using compatible fault data and appropriate physical checks. A warning or code does not by itself identify a failed component, and supported diagnostic functions are confirmed for the vehicle." },
  { q: "Can you investigate ride-height or suspension concerns?", a: "Ride-height warnings, leaning, compressor operation, noise and changes in ride quality can be assessed. The fitted suspension, parts and supported calibration procedures are confirmed before repair." },
  { q: "Can you inspect battery drain or cabin-cooling problems?", a: "Low-voltage battery, charging, unwanted current draw and cabin-cooling concerns can be discussed. Testing, refrigerant, equipment, parts and accepted repair scope are matched to the exact vehicle." },
  { q: "How is the correct maintenance schedule determined?", a: "The model-year service information, mileage, history, vehicle condition, storage and use determine the plan. DIGI-TEC does not apply one annual or kilometre interval to every Rolls-Royce." },
  { q: "Which parts and fluids will the estimate include?", a: "The estimate should identify proposed parts, fluids, quantities, labour and any diagnostic or additional work. The vehicle specification and availability are checked before an option is proposed for approval." },
  { q: "How do I request an appointment?", a: "Call the Al Quoz workshop or open the WhatsApp enquiry on this page. Send the model, year, mileage, service history, warning or symptoms and preferred time. The team will then confirm availability and the appropriate first step." }
];
const AUDI_HUB_PATH = "/brands/audi-service-dubai";
const AUDI_HUB_INTRO = "DIGI-TEC is an independent Audi workshop in Al Quoz, Dubai. Owners can request maintenance, diagnostics and repair assessment for an Audi, with the model, year, mileage, warning or symptom and fitted systems checked before work is recommended.";
const AUDI_WHATSAPP_HREF = `https://wa.me/97143402223?text=${encodeURIComponent("Hi DIGI-TEC, I would like to book an Audi inspection.\n\nModel: \nYear: \nMileage: \nWarning or symptoms: \nPreferred appointment time: ")}`;
const AUDI_SERVICES = [
  { slug: "oil-change", title: "Audi maintenance and oil service", anchor: "Audi oil service in Dubai", copy: "Service items, oil approval, filters and any supported reset are matched to the engine, model year, history and vehicle information." },
  { slug: "engine-diagnostics", title: "Engine diagnostics and warning lights", anchor: "Audi engine diagnostics", copy: "Fault context, live data and suitable physical checks help investigate warning lights, misfires, reduced power and starting concerns." },
  { slug: "mechanical-repair", title: "Engine, cooling and mechanical repair", anchor: "Audi mechanical repair assessment", copy: "Coolant loss, overheating, leaks, unusual noise and drivability concerns are assessed before parts or a repair path is proposed." },
  { slug: "transmission-repair", title: "Transmission and gearbox repair", anchor: "Audi transmission repair in Dubai", copy: "S tronic, tiptronic and quattro-related symptoms are separated by identifying the fitted transmission, driveline and vehicle history first." },
  { slug: "brake-repair", title: "Brake repair and inspection", anchor: "Audi brake repair in Dubai", copy: "Pads, discs, sensors, calipers, fluid and vibration concerns are inspected for the actual brake system fitted to the vehicle." },
  { slug: "suspension-repair", title: "Suspension and air-suspension repair", anchor: "Audi suspension repair in Dubai", copy: "Mechanical, adaptive and air-suspension concerns need different checks; ride-height systems are assessed only where fitted." },
  { slug: "ac-repair", title: "AC repair", anchor: "Audi AC repair in Dubai", copy: "Weak cooling, airflow, leak, compressor and climate-control concerns are tested under the vehicle-specific refrigerant and system specification." },
  { slug: "battery-replacement", title: "Battery replacement and charging diagnosis", anchor: "Audi battery replacement in Dubai", copy: "Battery condition, charging performance and unwanted-current concerns are tested before a low-voltage battery is recommended." },
  { slug: "body-repair", title: "Body repair", anchor: "Audi body repair in Dubai", copy: "Bodywork is a separate service option. The damage, paint, parts and repair route are assessed independently from mechanical diagnosis." }
];
const AUDI_SECONDARY_SERVICES = [
  { slug: "electrical-repair", label: "Audi electrical assessment" },
  { slug: "steering-repair", label: "Audi steering assessment" },
  { slug: "fuel-system-repair", label: "Audi fuel-system assessment" },
  { slug: "exhaust-repair", label: "Audi exhaust assessment" },
  { slug: "tire-repair", label: "Audi tyre inspection" }
];
const AUDI_FAQS = [
  { q: "Where is your Audi workshop in Dubai?", a: "DIGI-TEC Performance Center is in Al Quoz Industrial Area 3, Dubai. Send the Audi model, year, mileage and concern on WhatsApp before visiting so the appropriate inspection can be confirmed." },
  { q: "How often should an Audi be serviced in Dubai?", a: "Follow the service information for the exact model and year, then consider mileage, recorded history and conditions such as heat, traffic and dust. The correct due items are confirmed for the individual vehicle." },
  { q: "Can you diagnose Audi engine or drivetrain warnings?", a: "Compatible fault data can be combined with suitable physical testing and, where appropriate, a road test. A stored code is evidence for diagnosis, not proof that the named part must be replaced." },
  { q: "Can you investigate an Audi S tronic or tiptronic concern?", a: "Yes, transmission symptoms can be assessed. The fitted transmission, vehicle history, fault information and drivability concern must be identified before fluid, adaptation or repair work is recommended." },
  { q: "Can you replace an Audi battery?", a: "Low-voltage battery and charging concerns can be assessed. Battery specification, fitment and any supported registration or initialization requirement are confirmed for the exact vehicle before replacement." },
  { q: "Can you repair Audi AC problems in Dubai?", a: "Weak cooling, airflow, leaks, compressor and electrical climate concerns can be assessed. The exact vehicle and refrigerant label determine the relevant test and service specification." },
  { q: "Do you use genuine Audi or OE-quality parts?", a: "Parts options depend on the exact repair and availability. The estimate identifies the proposed part option before approval; part numbers and fitment are confirmed for the specific vehicle." },
  { q: "What should I send before booking?", a: "Send the Audi model, year, mileage, warning message or symptoms, when they occur and your preferred appointment time. Photos or a short video can help describe an intermittent concern." }
];
const BENTLEY_HUB_PATH = "/brands/bentley-service-dubai";
const BENTLEY_HUB_INTRO = "DIGI-TEC is an independent Bentley workshop in Al Quoz, Dubai. Bentley owners can request maintenance, repair and diagnostics for the exact vehicle; send the model, year, mileage, history and concern so the team can confirm the appropriate assessment, parts and workshop scope before booking.";
const BENTLEY_WHATSAPP_HREF = `https://wa.me/97143402223?text=${encodeURIComponent("Hi DIGI-TEC, I would like to request a Bentley service assessment.\n\nModel: \nYear: \nMileage: \nService history: \nWarning or symptoms: \nPreferred appointment time: ")}`;
const BENTLEY_SERVICES = [
  { slug: "oil-change", title: "Bentley maintenance and oil service", anchor: "Bentley maintenance in Dubai", copy: "The model year, engine, mileage, history and applicable service information determine the oil, filters, fluids and due inspection items. One generic package is not applied to every Bentley." },
  { slug: "engine-diagnostics", title: "Bentley diagnostics and warning lights", anchor: "Bentley diagnostics in Dubai", copy: "Warning messages, misfires, reduced performance and starting concerns are assessed with compatible data and suitable physical tests. A fault code is a diagnostic starting point, not a parts diagnosis." },
  { slug: "mechanical-repair", title: "Engine, cooling and mechanical repair", anchor: "Bentley mechanical repair assessment", copy: "Oil leaks, coolant loss, overheating, unusual noise and drivability concerns are inspected before a repair route, parts or timing are proposed." },
  { slug: "transmission-repair", title: "Bentley transmission repair", anchor: "Bentley transmission repair in Dubai", copy: "Gearbox warnings, leaks, engagement and shift-quality concerns are assessed against the fitted transmission. Fluid, service functions and repair scope are confirmed for the exact vehicle." },
  { slug: "suspension-repair", title: "Bentley suspension repair", anchor: "Bentley suspension repair in Dubai", copy: "Ride-height warnings, leaning, compressor operation, noise and ride-quality changes need a model-specific inspection. Air suspension, damping and 48-volt systems are not assumed across every Bentley." },
  { slug: "brake-repair", title: "Bentley brake inspection and repair", anchor: "Bentley brake repair in Dubai", copy: "Pads, discs, brake fluid, sensors, calipers, steering and tyre condition are checked before replacement parts or alignment work are recommended." },
  { slug: "electrical-repair", title: "Bentley electrical and battery concerns", anchor: "Bentley electrical repair in Dubai", copy: "Low-voltage warnings, battery drain, charging, comfort-system and module-communication faults require testing. Coding or programming depends on confirmed access and capability." },
  { slug: "ac-repair", title: "Bentley AC repair", anchor: "Bentley AC repair in Dubai", copy: "Weak cooling, leaks, airflow, compressor noise and cabin-zone concerns are tested before refrigerant or parts are proposed. The vehicle label determines the correct refrigerant and equipment." }
];
const BENTLEY_SECONDARY_SERVICES = [
  { slug: "battery-replacement", label: "Bentley battery assessment" },
  { slug: "steering-repair", label: "Bentley steering assessment" },
  { slug: "fuel-system-repair", label: "Bentley fuel-system assessment" },
  { slug: "exhaust-repair", label: "Bentley exhaust assessment" },
  { slug: "body-repair", label: "Bentley body-repair enquiry" },
  { slug: "tire-repair", label: "Bentley tyre inspection" }
];
const BENTLEY_MODEL_GROUPS = [
  { name: "Continental GT and GTC", copy: "Continental GT generations, engines and transmission arrangements differ. Maintenance, cooling, brake, suspension and drivetrain enquiries should be tied to the model year and fitted equipment.", guide: "/blog/bentley-continental-gt-service-dubai-guide" },
  { name: "Flying Spur", copy: "Flying Spur service enquiries can include maintenance, ride quality, cooling, brakes, electrical systems and warning messages. The model year and vehicle specification guide the initial assessment." },
  { name: "Bentayga and Bentayga EWB", copy: "Bentayga models use a mix of petrol and hybrid powertrains. Air suspension, Dynamic Ride and all-wheel steering references apply only where fitted; hybrid high-voltage work is not implied." },
  { name: "Earlier Bentley models", copy: "Mulsanne and earlier Continental or Flying Spur vehicles need an assessment based on age, history, condition and parts access. No universal system or repair procedure is assumed." }
];
const BENTLEY_FAQS = [
  { q: "Where is your Bentley workshop in Dubai?", a: "DIGI-TEC Performance Center is in Al Quoz Industrial Area 3, Dubai. Send the Bentley model, year, mileage and concern on WhatsApp before visiting so the suitable first assessment can be confirmed." },
  { q: "Are you an independent Bentley workshop?", a: "Yes. DIGI-TEC is an independent workshop and is not presented as Bentley-authorised or factory-endorsed. Vehicle acceptance, diagnostic access, parts and procedures are confirmed for the requested work." },
  { q: "What Bentley models can you assess?", a: "Enquiries can include Continental GT, Continental GTC, Flying Spur, Bentayga, Bentayga EWB and earlier Bentley models. The exact model year, engine, transmission and fitted systems determine the accepted scope." },
  { q: "Can you inspect a Bentley gearbox warning?", a: "A gearbox warning, leak, shift or engagement concern can be assessed against the fitted transmission. Compatible diagnostic access, fluid specification, parts and supported repair scope are confirmed before work." },
  { q: "Can you diagnose Bentley air-suspension concerns?", a: "Ride-height warnings, leaning, compressor operation, noise and changes in ride quality can be assessed. The fitted suspension, damping and 48-volt equipment must be identified before repairs or calibration are proposed." },
  { q: "Can you repair Bentley AC problems in Dubai?", a: "Weak cooling, leaks, airflow, compressor noise and cabin-zone concerns can be assessed. The refrigerant, equipment, parts and accepted repair scope are matched to the exact vehicle." },
  { q: "Can you replace a Bentley battery?", a: "Low-voltage starting, charging and battery-drain concerns can be assessed. Battery specification, fitment and any supported registration or initialization procedure are confirmed for the exact vehicle." },
  { q: "How is Bentley maintenance planned in Dubai?", a: "Use the service information for the exact model and year, then account for mileage, available history, storage, heat exposure and inspection findings. DIGI-TEC does not publish one universal Bentley interval." },
  { q: "Do you use genuine Bentley or OE-quality parts?", a: "The estimate should identify the proposed parts, fluids, quantities and labour before approval. Part choice and availability are confirmed for the vehicle rather than assumed from the badge." },
  { q: "What should I send before booking?", a: "Send the model, year, mileage, service history, warning or symptoms, when they occur and your preferred appointment time. A VIN may be requested later to confirm systems or parts." }
];
const ROX_HUB_INTRO = "ROX 01 owners can request maintenance, repair and diagnostic support at DIGI-TEC in Al Quoz, Dubai. We start with the vehicle version, reported warning or symptom and an inspection, then confirm the appropriate workshop scope before work is proposed.";
const ROX_HUB_FAQS = [
  { q: "Do you service ROX 01 vehicles in Dubai?", a: "ROX 01 maintenance, repair and diagnostic enquiries can be assessed at DIGI-TEC in Al Quoz. Send the model, year, mileage and concern so the appropriate inspection scope can be confirmed before booking." },
  { q: "Can you diagnose a ROX 01 warning light or driveability concern?", a: "An inspection can be requested for warning messages, driveability, low-voltage electrical or comfort-system concerns. Available diagnostic access is checked against the exact vehicle. High-voltage battery, electric-drive and charging-system repair are not assumed." },
  { q: "Can you install or repair ROX 01 soft-close doors?", a: "The ROX 01 installation page handles compatibility and fitting enquiries. A fitted door that stops pulling closed belongs to the separate soft-close repair assessment. Parts and available work are confirmed after inspection." },
  { q: "What should I send before booking a ROX 01 inspection?", a: "Please send the model year, mileage, warning message or symptom, recent service history where available, and your preferred appointment time. This helps the workshop prepare the most useful first inspection." }
];
const ROX_CORE_SERVICES = [
  { title: "ROX 01 diagnostics in Dubai", description: "A starting point for warnings and supported low-voltage or comfort-system checks. Diagnostic access and workshop scope are confirmed for the exact vehicle.", path: "/brands/rox-service-dubai/engine-diagnostics" },
  { title: "ROX 01 AC repair in Dubai", description: "For weak cabin cooling, unusual AC operation or climate-control concerns. Performance and the relevant system are inspected before refrigerant or parts are proposed.", path: "/brands/rox-service-dubai/ac-repair" },
  { title: "ROX 01 brake repair in Dubai", description: "Brake wear, vibration, warning messages and hydraulic-braking concerns are inspected alongside the vehicle’s regenerative-braking system.", path: "/brands/rox-service-dubai/brake-repair" },
  { title: "ROX 01 oil change in Dubai", description: "For the range-extender generator engine, oil and filter requirements are matched to the exact vehicle and service history.", path: "/brands/rox-service-dubai/oil-change" },
  { title: "ROX 01 soft-close door installation", description: "A dedicated compatibility and fitting enquiry for the ROX 01. Existing door faults follow the separate soft-close repair path.", path: "/brands/rox-service-dubai/soft-close-door-installation" }
];
const mercedesAmgEngine = "/images/seo/mercedes-engine-repair-1086.webp";
const PorscheKnowledgeCentre = React__default.lazy(() => import("./PorscheKnowledgeCentre-XITeXHWR.js"));
const BmwKnowledgeHub = React__default.lazy(() => import("./BmwKnowledgeHub-DNWRPwmR.js"));
const BmwBookingActions = React__default.lazy(() => import("./BmwHubSections-i4WAEaWx.js").then((module) => ({ default: module.BmwBookingActions })));
const BmwBookingChecklist = React__default.lazy(() => import("./BmwHubSections-i4WAEaWx.js").then((module) => ({ default: module.BmwBookingChecklist })));
const BmwCoreServices = React__default.lazy(() => import("./BmwHubSections-i4WAEaWx.js").then((module) => ({ default: module.BmwCoreServices })));
const BmwWorkshopProof = React__default.lazy(() => import("./BmwHubSections-i4WAEaWx.js").then((module) => ({ default: module.BmwWorkshopProof })));
const FerrariKnowledgeCentre = React__default.lazy(() => import("./FerrariKnowledgeCentre-D4ZUWj7U.js"));
const MclarenHubSections = React__default.lazy(() => import("./MclarenHubSections-BdoJOOJG.js").then((module) => ({ default: module.MclarenHubSections })));
const LamborghiniHubSections = React__default.lazy(() => import("./LamborghiniHubSections-BTFZbdrb.js").then((module) => ({ default: module.LamborghiniHubSections })));
const RollsRoyceHubSections = React__default.lazy(() => import("./RollsRoyceHubSections-6NewkJzS.js").then((module) => ({ default: module.RollsRoyceHubSections })));
const AudiHubSections = React__default.lazy(() => import("./AudiHubSections-DH2ftCqK.js").then((module) => ({ default: module.AudiHubSections })));
const BentleyHubSections = React__default.lazy(() => import("./BentleyHubSections-DU_PATuO.js").then((module) => ({ default: module.BentleyHubSections })));
const RoxHubSections = React__default.lazy(() => import("./RoxHubSections-BbOzcykN.js").then((module) => ({ default: module.RoxHubSections })));
const AstonMartinHubSections = React__default.lazy(() => import("./AstonMartinHubSections-Bi5C09bw.js").then((module) => ({ default: module.AstonMartinHubSections })));
const mercedesWorkshop = "/images/mercedes-repair-dubai-hero.jpg";
const MERCEDES_META_TITLE = "Mercedes Repair & Service Dubai | Al Quoz | Digi-Tec";
const MERCEDES_META_DESCRIPTION = "Independent Mercedes repair and service in Al Quoz, Dubai since 2002. XENTRY diagnostics, maintenance, gearbox, AIRMATIC, AC and electrical work.";
const DEFAULT_BRAND_PAGE_DESIGN = {
  art: "workshop",
  rhythm: "technical",
  accent: "#ff6638",
  accentRgb: "255, 102, 56",
  heroPosition: "center"
};
const BRAND_PAGE_DESIGNS = {
  "mercedes-benz-service-dubai": { art: "stuttgart", rhythm: "precision", accent: "#c7ced6", accentRgb: "199, 206, 214", heroPosition: "center 52%" },
  "maybach-service-dubai": { art: "couture", rhythm: "editorial", accent: "#d7bd82", accentRgb: "215, 189, 130", heroPosition: "center 48%" },
  "porsche-service-dubai": { art: "velocity", rhythm: "performance", accent: "#ef5a43", accentRgb: "239, 90, 67", heroPosition: "center 54%" },
  "audi-service-dubai": { art: "quattro", rhythm: "precision", accent: "#d24b50", accentRgb: "210, 75, 80", heroPosition: "center" },
  "bmw-service-dubai": { art: "bavaria", rhythm: "technical", accent: "#4d9be8", accentRgb: "77, 155, 232", heroPosition: "center" },
  "lamborghini-service-dubai": { art: "wedge", rhythm: "performance", accent: "#d8c44b", accentRgb: "216, 196, 75", heroPosition: "center 46%" },
  "bentley-service-dubai": { art: "coachbuilt", rhythm: "editorial", accent: "#95b4a2", accentRgb: "149, 180, 162", heroPosition: "center 46%" },
  "mclaren-service-dubai": { art: "apex", rhythm: "performance", accent: "#ff8a32", accentRgb: "255, 138, 50", heroPosition: "center" },
  "ferrari-service-dubai": { art: "scuderia", rhythm: "performance", accent: "#ef4b3f", accentRgb: "239, 75, 63", heroPosition: "center 44%" },
  "bugatti-service-dubai": { art: "vitesse", rhythm: "editorial", accent: "#77a7d2", accentRgb: "119, 167, 210", heroPosition: "center" },
  "land-rover-service-dubai": { art: "expedition", rhythm: "terrain", accent: "#97aa91", accentRgb: "151, 170, 145", heroPosition: "center" },
  "rolls-royce-service-dubai": { art: "gallery", rhythm: "editorial", accent: "#c9bca5", accentRgb: "201, 188, 165", heroPosition: "center" },
  "aston-martin-service-dubai": { art: "grand-tourer", rhythm: "editorial", accent: "#8eb39f", accentRgb: "142, 179, 159", heroPosition: "center 48%" },
  "maserati-service-dubai": { art: "trident", rhythm: "editorial", accent: "#6689b3", accentRgb: "102, 137, 179", heroPosition: "center 48%" },
  "cadillac-service-dubai": { art: "modernist", rhythm: "technical", accent: "#d6b66f", accentRgb: "214, 182, 111", heroPosition: "center" },
  "range-rover-service-dubai": { art: "horizon", rhythm: "terrain", accent: "#a5b49a", accentRgb: "165, 180, 154", heroPosition: "center 52%" },
  "defender-service-dubai": { art: "utility", rhythm: "terrain", accent: "#a8b0a4", accentRgb: "168, 176, 164", heroPosition: "center 48%" }
};
const RANGE_ROVER_META_TITLE = "Range Rover Workshop Dubai | Repair & Service";
const RANGE_ROVER_META_DESCRIPTION = "Range Rover workshop in Al Quoz, Dubai for Vogue, Sport, Velar and Evoque repair and service. JLR diagnostics, air suspension, cooling and ZF expertise.";
const DEFENDER_META_TITLE = "Defender Repair Dubai | Land Rover Specialists | Digi-Tec";
const DEFENDER_META_DESCRIPTION = "Land Rover Defender repair and service in Dubai for Defender 90, 110, 130, V8 and OCTA. JLR diagnostics, air suspension and 4x4 care in Al Quoz.";
const MERCEDES_SEO_COPY = {
  intro: "Digi-Tec Performance Centre in Al Quoz provides Mercedes-Benz repair, scheduled maintenance and diagnostics for daily drivers, luxury models, G-Class and AMG vehicles. We begin with the reported symptom, scan data and a physical inspection, then explain the recommended scope before repair work starts.",
  dubai: "Dubai heat, traffic and fine dust place extra load on Mercedes cooling systems, engine oil, batteries, rubber components and air conditioning. Our inspections account for the vehicle model, mileage and actual use rather than applying one generic schedule. Cooling performance, fluid condition, battery health, suspension wear and AC output receive particular attention.",
  expertise: "Digi-Tec has Mercedes XENTRY diagnostic capability for fault tracing, live data and guided tests. Service resets, adaptations, coding and programming depend on the exact vehicle, module and available access. We identify the fitted engine, gearbox and suspension system before agreeing the scope; AIRMATIC air suspension, ABC hydraulic suspension and E-ACTIVE BODY CONTROL require different checks.",
  parts: "Each estimate identifies the proposed parts and fluids before approval. Depending on the repair and owner preference, this can include genuine Mercedes-Benz parts, established OE-supplier components or a suitable customer-approved alternative. The correct Mercedes fluid specification, fitting procedure and post-repair checks matter more than a one-size-fits-all parts claim.",
  cta: "For Mercedes repair, maintenance or a second-opinion inspection in Dubai, call +971 4 340 2223, message Digi-Tec on WhatsApp or use the booking form below. Include the model, year, mileage, warning message and symptoms so the workshop can prepare for the right first inspection."
};
const MERCEDES_ARABIC_SEO_COPY = {
  intro: "ديجي-تك ورشة مستقلة لصيانة وإصلاح مرسيدس بنز في القوز الصناعية 3 بدبي. نبدأ بوصف المشكلة وبيانات السيارة وسجل صيانتها، ثم نوضح نتائج الفحص والأعمال المقترحة قبل الموافقة على الإصلاح.",
  dubai: "تؤخذ حرارة دبي والازدحام والغبار وطريقة الاستخدام في الاعتبار عند فحص التبريد والتكييف والبطارية والسوائل. تعتمد الصيانة المستحقة على تعليمات الطراز ومؤشر ASSYST والسجل والحالة الفعلية؛ ولا تُفرض فترة واحدة على جميع سيارات مرسيدس.",
  expertise: "يتوفر لدينا تشخيص مرسيدس باستخدام XENTRY لقراءة الأعطال والبيانات وإجراء الفحوص الموجهة. تتوقف وظائف إعادة الضبط والتكييف والبرمجة على الطراز والوحدة والصلاحيات المتاحة، ويُؤكد نطاقها قبل إدراجها في العمل.",
  parts: "يوضح عرض السعر القطع والسوائل المقترحة ومطابقتها لرقم الهيكل، إلى جانب أجرة العمل والفحوص المطلوبة. يمكن مناقشة القطع الأصلية أو خيارات الموردين المناسبة بحسب الإصلاح والتوفر وموافقة المالك.",
  cta: "لحجز فحص مرسيدس في القوز، اتصل على ‎+971 4 340 2223 أو أرسل رسالة واتساب تتضمن الطراز وسنة الصنع والمسافة المقطوعة ونص التحذير أو الأعراض. تساعد هذه التفاصيل في تحديد الفحص الأول المناسب."
};
const RANGE_ROVER_SEO_COPY = {
  intro: "Digi-Tec Performance Centre in Al Quoz provides specialist Range Rover repair, scheduled maintenance and diagnostics for Range Rover, Range Rover Sport, Velar and Evoque models. We start with the reported symptom, diagnostic data and a physical inspection, then explain the recommended work and parts options before any repair begins.",
  dubai: "Dubai heat, traffic and dust put extra demand on Range Rover cooling systems, air conditioning, batteries, air suspension and rubber components. Our inspection considers the exact model, mileage, service history and how the vehicle is used, with close attention to cooling performance, air-system leaks, brake wear and battery health.",
  expertise: "Range Rover work starts with the VIN, reported concern and vehicle condition. Compatible diagnostic access, live data, service functions and any calibration are confirmed for the exact model, module and required scope before they are quoted. Relevant systems may include Ingenium engines, V8 platforms, ZF transmissions, Terrain Response and electronic air suspension.",
  parts: "The estimate identifies proposed parts, fluids and any supported calibration before approval. Genuine JLR, established OE-supplier or suitable customer-approved alternatives may be quoted depending on the repair, availability and owner preference.",
  cta: "For Range Rover repair, service or an air-suspension inspection in Dubai, call +971 4 340 2223, send Digi-Tec a WhatsApp message or use the booking form below. Include your model, year, mileage, warning message and symptoms so we can prepare for the right first inspection."
};
const DEFENDER_SEO_COPY = {
  intro: "Digi-Tec Performance Centre in Al Quoz provides specialist Land Rover Defender repair, scheduled maintenance and diagnostics for Defender 90, Defender 110, Defender 130, Defender V8 and Defender OCTA models. We combine the reported symptom with JLR diagnostic data, a physical inspection and a road test where appropriate before recommending repairs.",
  dubai: "Defenders in Dubai deal with heat, stop-start traffic, sand and off-road use. We pay particular attention to cooling, air conditioning, battery condition, brakes, wheel and tyre condition, suspension, underbody and driveline systems—then tailor the work to the vehicle’s actual use rather than applying a generic schedule.",
  expertise: "Defender diagnosis starts with the VIN, reported concern and vehicle condition. Compatible diagnostic access, live data, service functions and any calibration are confirmed for the exact model, module and required scope before they are quoted. Relevant systems may include Ingenium, P400 or V8 powertrains, eight-speed transmissions, Terrain Response, four-wheel drive, air suspension and electrical systems.",
  parts: "Before approved work starts, the estimate identifies proposed parts and fluids. Genuine JLR, established OE-supplier or suitable customer-approved alternatives may be quoted depending on the repair, availability and owner preference; relevant post-repair checks depend on the system repaired.",
  cta: "For Defender repair, service, diagnostics or a pre-trip inspection in Dubai, call +971 4 340 2223, message Digi-Tec on WhatsApp or use the booking form below. Send the Defender model, year, mileage, warning message and symptoms for the most useful first inspection."
};
const RANGE_ROVER_COMMON_ISSUES = [
  { title: "Suspension Fault, low corner or slow lifting", description: "Electronic air suspension symptoms can come from an air strut, compressor, valve block, air leak, height sensor or electrical fault. We test the system before recommending parts.", path: "suspension-repair", label: "Range Rover air suspension repair" },
  { title: "Cooling warning, coolant loss or overheating", description: "Cooling-system concerns can involve a leak, thermostat, water pump, radiator, fan or another engine-management issue. We identify the cause before replacing components.", path: "mechanical-repair", label: "Range Rover mechanical repair" },
  { title: "Transmission warning, harsh shift or driveline noise", description: "ZF 8HP and four-wheel-drive symptoms require scan data, fluid and leak checks, a physical inspection and a road test where appropriate before repair scope is defined.", path: "transmission-repair", label: "Range Rover transmission repair" },
  { title: "Weak AC or poor cabin cooling", description: "Dubai temperatures expose weak compressors, leaks, condensers, cooling fans and climate-control issues. A proper diagnosis checks performance before refrigerant or parts are added.", path: "ac-repair", label: "Range Rover AC repair" },
  { title: "Warning lights or electrical concerns", description: "Battery voltage, charging faults, wiring, sensors and module communication can create several warning messages. We use diagnostic data together with electrical tests.", path: "electrical-repair", label: "Range Rover electrical diagnostics" },
  { title: "Brake vibration, warning or reduced confidence", description: "Brake checks cover pads, discs, sensors, calipers, fluid, hydraulic operation and the source of vibration before the parts route is agreed.", path: "brake-repair", label: "Range Rover brake repair" }
];
const DEFENDER_COMMON_ISSUES = [
  { title: "Suspension Fault or vehicle sitting unevenly", description: "Defender air-suspension symptoms can involve an air spring, compressor, valve block, air leak, height sensor or electrical issue. Diagnosis comes before parts replacement.", path: "suspension-repair", label: "Defender suspension repair" },
  { title: "4x4, Terrain Response or driveline warning", description: "A four-wheel-drive warning needs diagnostic data, transfer-case and differential checks, wheel-speed information and a physical inspection before a repair plan is made.", path: "mechanical-repair", label: "Defender 4x4 diagnostics" },
  { title: "Cooling, AC or engine warning", description: "Heat places high demand on cooling and climate systems. We inspect the reported warning or symptom, data and the physical system instead of treating the code alone as the cause.", path: "engine-diagnostics", label: "Defender diagnostics" },
  { title: "Battery, camera, sensor or electrical fault", description: "Modern Defender systems rely on stable voltage, communication networks and correctly calibrated cameras and sensors. Testing establishes the affected system before repair.", path: "electrical-repair", label: "Defender electrical repair" },
  { title: "Brake wear, vibration or warning light", description: "Inspection covers pads, discs, sensors, calipers, brake fluid and the cause of vibration, including the demands of towing, off-road driving and Dubai traffic.", path: "brake-repair", label: "Defender brake repair" },
  { title: "Steering, tyre or underbody concern", description: "After kerb impacts or off-road use, steering, tyre condition, wheel alignment and underbody components deserve a documented inspection before further work is planned.", path: "steering-repair", label: "Defender steering repair" }
];
const RANGE_ROVER_MODEL_GROUPS = [
  { title: "Range Rover", models: "Range Rover, Autobiography and SV", description: "Flagship Range Rover service, diagnostics, air suspension, cooling, brakes, electrical systems and powertrain work, confirmed against the vehicle’s exact specification." },
  { title: "Range Rover Sport", models: "Range Rover Sport, SV and SVR", description: "Maintenance and diagnosis for performance-oriented SUV systems, including brakes, cooling, driveline, ZF transmission and electronic air suspension." },
  { title: "Range Rover Velar", models: "Velar petrol, diesel and PHEV variants", description: "Model-aware servicing for engine, electrical, climate, steering, suspension and warning-light concerns, with the correct diagnostic functions used where applicable." },
  { title: "Range Rover Evoque", models: "Evoque petrol, diesel and PHEV variants", description: "Routine service, cooling, brakes, AC, electrical and drivetrain diagnosis for urban and UAE-driven Evoque models." }
];
const DEFENDER_MODEL_GROUPS = [
  { title: "Defender 90", models: "Three-door Defender 90", description: "Service, diagnostics, brakes, suspension, steering and four-wheel-drive checks tailored to the compact Defender platform." },
  { title: "Defender 110", models: "Five-door Defender 110", description: "Maintenance and repair for daily-driven, family and expedition Defender 110 vehicles, including cooling, driveline and electrical systems." },
  { title: "Defender 130", models: "Extended Defender 130", description: "Inspection and maintenance for the longer Defender platform, including braking, suspension, cooling and load-related drivetrain requirements." },
  { title: "Defender V8 & OCTA", models: "Defender V8 and Defender OCTA", description: "Model-aware diagnostic, mechanical, brake, suspension and cooling support for high-output Defender platforms." }
];
const getBrandSeoCopy = (brand) => {
  const focusAreas = brand.whyChoose.map((w) => w.title).slice(0, 4);
  return {
    intro: `Digi-Tec Performance Center is an independent European and luxury car workshop in Al Quoz, Dubai, established in 2002. This page explains the inspection, maintenance and repair topics owners can discuss for a ${brand.name}; the team confirms the exact model and requested work before booking.`,
    dubai: `Dubai heat, traffic and dust can add load to cooling, battery, brake, tyre and air-conditioning systems. A ${brand.name} inspection can account for those conditions, while the correct maintenance plan still depends on the exact model, recorded history, mileage and how the vehicle is used.`,
    expertise: `Common ${brand.name} enquiries include ${focusAreas.join(", ")}. The available inspection and repair scope depends on the vehicle and concern, so diagnostic findings are reviewed before parts or additional work are recommended.`,
    parts: `Each estimate should identify the proposed parts and fluids before approval. Depending on the repair, availability and owner preference, this may include genuine ${brand.name} parts, established OE-supplier components or another suitable customer-approved option.`,
    cta: `To discuss ${brand.specialization.toLowerCase()} or another ${brand.name} request, call +971 4 340 2223, send a WhatsApp enquiry or use the booking form. Include the model, year, mileage and concern so the team can confirm the appropriate next step and appointment availability.`
  };
};
const SERVICES = [
  {
    title: "Vehicle Maintenance",
    description: "Scheduled servicing, fluid changes, brake work and preventive inspections based on the vehicle and approved scope."
  },
  {
    title: "Mechanical Repairs",
    description: "Inspection and repair planning for engine, transmission, suspension and drivetrain concerns."
  },
  {
    title: "Auto Body & Painting",
    description: "Collision assessment, panel work and refinishing options based on the vehicle inspection."
  },
  {
    title: "Detailing",
    description: "Paint correction, ceramic coating, PPF, and full interior detailing tailored to luxury finishes."
  },
  {
    title: "Electrical & Diagnostics",
    description: "Fault-code review, physical testing and electrical repair planning for modern vehicle systems."
  }
];
const MERCEDES_SERVICE_PATHS = {
  "oil-change": "/services/mercedes-oil-change-dubai",
  "brake-repair": "/services/mercedes-brake-repair-dubai",
  "transmission-repair": "/services/mercedes-transmission-repair-dubai",
  "ac-repair": "/services/mercedes-ac-repair-dubai",
  "suspension-repair": "/services/mercedes-suspension-repair-dubai",
  "engine-diagnostics": "/services/mercedes-diagnostics-dubai",
  "mechanical-repair": "/services/mercedes-mechanical-repair-dubai",
  "steering-repair": "/services/mercedes-steering-repair-dubai",
  "battery-replacement": "/services/mercedes-battery-replacement-dubai",
  "electrical-repair": "/services/mercedes-electrical-repair-dubai",
  "exhaust-repair": "/services/mercedes-exhaust-repair-dubai",
  "fuel-system-repair": "/services/mercedes-fuel-system-repair-dubai",
  "body-repair": "/services/mercedes-body-repair-dubai",
  "tire-repair": "/services/mercedes-tire-repair-dubai"
};
const MERCEDES_SERVICE_LABELS = {
  "oil-change": "Mercedes-Benz Engine Oil and Filter Change in Dubai",
  "brake-repair": "Mercedes-Benz Brake Repair in Dubai",
  "transmission-repair": "Mercedes-Benz Transmission Repair in Dubai",
  "ac-repair": "Mercedes-Benz AC Repair in Dubai",
  "suspension-repair": "Mercedes-Benz Suspension Repair in Dubai",
  "engine-diagnostics": "Mercedes-Benz XENTRY Diagnostics in Dubai",
  "mechanical-repair": "Mercedes-Benz Mechanical Repair in Dubai",
  "steering-repair": "Mercedes-Benz Steering Repair in Dubai",
  "battery-replacement": "Mercedes-Benz Battery Replacement in Dubai",
  "electrical-repair": "Mercedes-Benz Electrical Repair in Dubai",
  "exhaust-repair": "Mercedes-Benz Exhaust Repair in Dubai",
  "fuel-system-repair": "Mercedes-Benz Fuel System Repair in Dubai",
  "body-repair": "Mercedes-Benz Body Repair in Dubai",
  "tire-repair": "Mercedes-Benz Tyre Repair in Dubai"
};
const MERCEDES_CORE_SERVICES = [
  {
    title: "Mercedes Service A, Service B & Maintenance",
    description: "Compare minor and major service scope, due oil and filter work, inspections, exclusions and the details needed for an itemized quote.",
    path: "/brands/mercedes-benz-service-dubai#mercedes-maintenance-scope"
  },
  {
    title: "XENTRY Diagnostics & Warning Lights",
    description: "Fault-code analysis, live data and guided testing for engine, transmission, suspension, safety, comfort and electrical systems.",
    path: MERCEDES_SERVICE_PATHS["engine-diagnostics"]
  },
  {
    title: "7G-Tronic & 9G-Tronic Transmission Repair",
    description: "Diagnosis for delayed engagement, rough shifting, slipping, leaks and transmission warnings before parts are recommended.",
    path: MERCEDES_SERVICE_PATHS["transmission-repair"]
  },
  {
    title: "AIRMATIC, ABC & Suspension Repair",
    description: "Testing for a low corner, slow lifting, compressor noise, harsh ride or a Mercedes suspension warning message.",
    path: MERCEDES_SERVICE_PATHS["suspension-repair"]
  },
  {
    title: "Mercedes Engine, Cooling & Mechanical Repair",
    description: "Assessment of overheating, coolant loss, oil leaks, misfires, engine vibration and repair-versus-replacement options.",
    path: MERCEDES_SERVICE_PATHS["mechanical-repair"]
  },
  {
    title: "Mercedes AC & Air Conditioning Repair",
    description: "Weak or uneven cooling, airflow and leak checks, with recharge, compressor and evaporator work scoped after diagnosis.",
    path: MERCEDES_SERVICE_PATHS["ac-repair"]
  }
];
const MERCEDES_COMMON_ISSUES = [
  {
    title: "No power, no crank or the engine will not start",
    description: "A Mercedes no-start can involve the 12-volt supply, starter circuit, key authorisation, fuel, ignition, engine-speed input or another control fault. The first step is to identify whether the car has no power, will not crank or cranks without starting.",
    path: `${MERCEDES_PROBLEMS_PATH}/wont-start`,
    label: "Read the Mercedes no-start guide"
  },
  {
    title: "Suspension Fault or one side sitting low",
    description: "On a Mercedes fitted with AIRMATIC, a low corner or warning can involve an air spring, compressor, valve block, leak, sensor or electrical fault. Confirm the fitted system before testing; ABC and E-ACTIVE BODY CONTROL use different procedures.",
    path: `${MERCEDES_PROBLEMS_PATH}/airmatic-malfunction`,
    label: "Understand the AIRMATIC warning"
  },
  {
    title: "Jerking, slipping or delayed gear engagement",
    description: "7G-Tronic, 9G-Tronic and AMG SpeedShift symptoms may relate to fluid condition, adaptations, sensors, a conductor plate, mechatronics or internal wear. A scan and road test help define the repair scope.",
    path: `${MERCEDES_PROBLEMS_PATH}/gearbox-jerking`,
    label: "Read the gearbox symptom guide"
  },
  {
    title: "Engine light, rough idle or loss of power",
    description: "The cause can sit in ignition, air metering, boost, fuel delivery, emissions or cooling—not just the component named by a stored code. XENTRY data and physical testing are used together.",
    path: `${MERCEDES_PROBLEMS_PATH}/check-engine-light`,
    label: "Read the check-engine guide"
  },
  {
    title: "Weak AC, warm air or uneven cabin cooling",
    description: "Poor cabin cooling needs airflow, refrigerant-pressure, leak and climate-control checks. A recharge is appropriate only after the cause and correct refrigerant specification are established.",
    path: `${MERCEDES_PROBLEMS_PATH}/ac-not-cooling`,
    label: "Read the weak-AC guide"
  },
  {
    title: "Overheating or repeated coolant loss",
    description: "A rising temperature warning concerns engine cooling. Stop safely if overheating is indicated, allow the system to cool and arrange assessment; do not open a hot coolant cap or keep driving to test the warning.",
    path: `${MERCEDES_PROBLEMS_PATH}/engine-overheating`,
    label: "Read the engine-overheating guide"
  },
  {
    title: "Battery warning or intermittent electrical faults",
    description: "A weak main or auxiliary battery, charging fault, voltage drop, wiring concern or control-module communication issue can create several warning messages at once. Any required battery registration or coding is confirmed for compatibility and quoted where supported.",
    path: `${MERCEDES_PROBLEMS_PATH}/battery-warning`,
    label: "Read the battery-warning guide"
  },
  {
    title: "Brake warning, vibration or reduced confidence",
    description: "Mercedes and AMG brake checks cover pad and disc condition, sensors, calipers, fluid, hydraulic operation and the cause of vibration. The correct parts route depends on the fitted brake package.",
    path: MERCEDES_SERVICE_PATHS["brake-repair"],
    label: "Mercedes brake repair"
  }
];
const MERCEDES_MODEL_GROUPS = [
  {
    title: "C-Class, CLA & compact models",
    models: "A-Class, B-Class, CLA, C-Class and CLE",
    description: "Scheduled service, warning-light diagnosis, brakes, AC, cooling, steering and suspension support for compact Mercedes saloons, hatchbacks, estates and coupes.",
    links: [
      { label: "Oil service", path: MERCEDES_SERVICE_PATHS["oil-change"] },
      { label: "Diagnostics", path: MERCEDES_SERVICE_PATHS["engine-diagnostics"] },
      { label: "Brake repair", path: MERCEDES_SERVICE_PATHS["brake-repair"] }
    ]
  },
  {
    title: "E-Class, CLS & executive models",
    models: "E-Class, CLS and earlier CLK platforms",
    description: "Diagnosis and repair for 7G-Tronic and 9G-Tronic behaviour, electrical warnings, selected AIRMATIC systems, cooling, oil leaks, brakes and climate-control concerns.",
    links: [
      { label: "Transmission repair", path: MERCEDES_SERVICE_PATHS["transmission-repair"] },
      { label: "Electrical repair", path: MERCEDES_SERVICE_PATHS["electrical-repair"] },
      { label: "AC repair", path: MERCEDES_SERVICE_PATHS["ac-repair"] }
    ]
  },
  {
    title: "S-Class & flagship Mercedes",
    models: "S-Class W221, W222 and W223, plus earlier flagship platforms",
    description: "Inspection of the fitted ride system, comfort electronics, engine, cooling and module warnings. S-Class generation and options determine whether AIRMATIC, ABC, E-ACTIVE BODY CONTROL or another system is present.",
    links: [
      { label: "Suspension repair", path: MERCEDES_SERVICE_PATHS["suspension-repair"] },
      { label: "Mechanical repair", path: MERCEDES_SERVICE_PATHS["mechanical-repair"] },
      { label: "Electrical repair", path: MERCEDES_SERVICE_PATHS["electrical-repair"] }
    ]
  },
  {
    title: "GLC, GLE, GLS & Mercedes SUVs",
    models: "GLA, GLB, GLC, GLE, GLS, ML, GL and GLK",
    description: "Dubai-focused maintenance and repair for SUV cooling, AC, 4MATIC driveline, transmission, brakes and air suspension, with model-specific inspection before quoting.",
    links: [
      { label: "Suspension repair", path: MERCEDES_SERVICE_PATHS["suspension-repair"] },
      { label: "Transmission repair", path: MERCEDES_SERVICE_PATHS["transmission-repair"] },
      { label: "Mechanical repair", path: MERCEDES_SERVICE_PATHS["mechanical-repair"] }
    ]
  },
  {
    title: "G-Class, G-Wagon & Mercedes-AMG",
    models: "G500, G550, G63, C43, C63, E53, E63, S63, SL and AMG GT",
    description: "AMG-aware engine, transmission, brake, suspension and diagnostic work for high-output Mercedes platforms, plus planned support for G-Class body and performance projects.",
    links: [
      { label: "AMG mechanical repair", path: MERCEDES_SERVICE_PATHS["mechanical-repair"] },
      { label: "AMG diagnostics", path: MERCEDES_SERVICE_PATHS["engine-diagnostics"] },
      { label: "G63 case study", path: "/blog/g63-to-brabus-g800-conversion-dubai" }
    ]
  },
  {
    title: "EQ, V-Class & specialist Mercedes platforms",
    models: "EQB, EQE, EQS, EQE SUV, EQS SUV, V-Class and Vito",
    description: "Diagnostic inspection, low-voltage electrical support, brakes, tyres, suspension and climate-system checks, with high-voltage work confirmed against the exact model and requested scope before booking.",
    links: [
      { label: "Electrical repair", path: MERCEDES_SERVICE_PATHS["electrical-repair"] },
      { label: "Diagnostics", path: MERCEDES_SERVICE_PATHS["engine-diagnostics"] },
      { label: "Tyre service", path: MERCEDES_SERVICE_PATHS["tire-repair"] }
    ]
  }
];
const MERCEDES_SCHEMA_OFFERS = [
  ...Object.entries(MERCEDES_SERVICE_PATHS).map(([serviceSlug, path]) => ({
    name: MERCEDES_SERVICE_LABELS[serviceSlug],
    path
  })),
  { name: "Mercedes COMAND and MBUX head-unit fault assessment", path: "/services/head-unit-repair-dubai" },
  { name: "Mercedes audio upgrade consultation", path: "/services/mercedes-audio-upgrade-dubai" }
];
const BRAND_MODELS = {
  "mercedes-benz-service-dubai": ["A-Class", "B-Class", "CLA", "C-Class", "CLE", "E-Class", "CLS", "S-Class", "GLA", "GLB", "GLC", "GLE", "GLS", "G-Class", "G63", "AMG GT", "SL", "EQB", "EQE", "EQS", "V-Class"],
  "maybach-service-dubai": ["Maybach S-Class", "Maybach GLS", "Maybach S680", "Maybach S580"],
  "porsche-service-dubai": ["911", "718 Cayman", "718 Boxster", "Panamera", "Macan", "Cayenne", "Taycan"],
  "audi-service-dubai": ["A3", "A4", "A5", "A6", "A7", "A8", "Q3", "Q5", "Q7", "Q8", "RS Range", "R8", "e-tron"],
  "bmw-service-dubai": ["1 Series", "3 Series", "4 Series", "5 Series", "7 Series", "8 Series", "X1", "X3", "X5", "X6", "X7", "M Range", "i Range"],
  "lamborghini-service-dubai": ["Huracán", "Urus", "Revuelto", "Aventador"],
  "bentley-service-dubai": ["Continental GT", "Flying Spur", "Bentayga"],
  "mclaren-service-dubai": ["720S", "765LT", "Artura", "GT", "750S"],
  "ferrari-service-dubai": ["Roma", "Portofino", "296", "SF90", "812", "Purosangue"],
  "bugatti-service-dubai": ["Chiron", "Divo", "Mistral"],
  "land-rover-service-dubai": ["Range Rover", "Range Rover Sport", "Range Rover Velar", "Range Rover Evoque", "Defender", "Discovery"],
  "range-rover-service-dubai": ["Range Rover", "Range Rover Sport", "Range Rover Velar", "Range Rover Evoque"],
  "defender-service-dubai": ["Defender 90", "Defender 110", "Defender 130", "Defender V8", "Defender OCTA"],
  "rolls-royce-service-dubai": ["Phantom", "Ghost", "Cullinan", "Spectre", "Wraith", "Dawn"],
  "aston-martin-service-dubai": ["DB12", "Vantage", "DBX", "DBS"],
  "maserati-service-dubai": ["Ghibli", "Quattroporte", "Levante", "Grecale", "GranTurismo", "MC20"],
  "cadillac-service-dubai": ["Escalade", "CT4", "CT5", "XT4", "XT5", "XT6", "Lyriq"]
};
const getServiceProfileSlug = (brandSlug) => brandSlug;
const BrandPage = () => {
  var _a;
  const { isArabic, localizedPath } = useLocale();
  const { slug } = useParams();
  const sourceBrand = slug ? getBrandBySlug(slug) : void 0;
  const serviceSprintBrand = getServiceSprintBrand(sourceBrand == null ? void 0 : sourceBrand.slug);
  const isEnglishBmwHub = !isArabic && (sourceBrand == null ? void 0 : sourceBrand.slug) === "bmw-service-dubai";
  const isEnglishFerrariHub = !isArabic && (sourceBrand == null ? void 0 : sourceBrand.slug) === "ferrari-service-dubai";
  const isEnglishMclarenHub = !isArabic && (sourceBrand == null ? void 0 : sourceBrand.slug) === "mclaren-service-dubai";
  const isEnglishLamborghiniHub = !isArabic && (sourceBrand == null ? void 0 : sourceBrand.slug) === "lamborghini-service-dubai";
  const isEnglishRollsRoyceHub = !isArabic && (sourceBrand == null ? void 0 : sourceBrand.slug) === "rolls-royce-service-dubai";
  const isEnglishAudiHub = !isArabic && (sourceBrand == null ? void 0 : sourceBrand.slug) === "audi-service-dubai";
  const isEnglishBentleyHub = !isArabic && (sourceBrand == null ? void 0 : sourceBrand.slug) === "bentley-service-dubai";
  const isEnglishRoxHub = !isArabic && (sourceBrand == null ? void 0 : sourceBrand.slug) === "rox-service-dubai";
  const isEnglishJetourHub = !isArabic && (sourceBrand == null ? void 0 : sourceBrand.slug) === "jetour-service-dubai";
  const isB9Brand = (sourceBrand == null ? void 0 : sourceBrand.slug) === "jetour-service-dubai" || (sourceBrand == null ? void 0 : sourceBrand.slug) === "rox-service-dubai";
  const isEnglishAstonHub = !isArabic && (sourceBrand == null ? void 0 : sourceBrand.slug) === "aston-martin-service-dubai";
  const brand = sourceBrand && isArabic ? localizeBrandToArabic(sourceBrand) : isEnglishBmwHub ? { ...sourceBrand, intro: BMW_HUB_INTRO, faqs: BMW_HUB_FAQS } : isEnglishMclarenHub ? { ...sourceBrand, intro: MCLAREN_HUB_INTRO, faqs: MCLAREN_FAQS, specialization: "Service • Maintenance • Diagnostics • Repairs" } : isEnglishLamborghiniHub ? { ...sourceBrand, intro: LAMBORGHINI_HUB_INTRO, faqs: [...LAMBORGHINI_FAQS], specialization: "Service • Maintenance • Diagnostics • Repairs" } : isEnglishRollsRoyceHub ? { ...sourceBrand, intro: ROLLS_ROYCE_HUB_INTRO, faqs: [...ROLLS_ROYCE_FAQS], specialization: "Service • Maintenance • Diagnostics • Repairs" } : isEnglishAudiHub ? { ...sourceBrand, intro: AUDI_HUB_INTRO, faqs: [...AUDI_FAQS], specialization: "Service • Maintenance • Diagnostics • Repairs" } : isEnglishBentleyHub ? { ...sourceBrand, intro: BENTLEY_HUB_INTRO, faqs: [...BENTLEY_FAQS], specialization: "Service • Maintenance • Diagnostics • Repairs" } : isEnglishRoxHub ? { ...sourceBrand, intro: ROX_HUB_INTRO, faqs: [...ROX_HUB_FAQS], specialization: "ROX 01 Service • Diagnostics • Comfort Systems" } : isEnglishAstonHub ? { ...sourceBrand, intro: ASTON_HUB_INTRO, faqs: ASTON_FAQS, specialization: "Maintenance • Diagnostics • Repairs" } : sourceBrand;
  const serviceProfileSlug = brand ? getServiceProfileSlug(brand.slug) : "";
  const priorityBrandSeo = getPriorityBrandSeo(sourceBrand == null ? void 0 : sourceBrand.slug);
  const prioritySeo = isArabic ? void 0 : priorityBrandSeo;
  const brandJsonLd = React__default.useMemo(() => {
    if (!brand) return void 0;
    const url = `https://digitecme.com${isArabic ? "/ar" : ""}/brands/${brand.slug}`;
    const isMercedes = brand.slug === "mercedes-benz-service-dubai";
    const isRangeRoverHub = brand.slug === "range-rover-service-dubai";
    const isDefenderHub = brand.slug === "defender-service-dubai";
    const entityName = isArabic ? `صيانة وإصلاح ${brand.name} في دبي` : `${brand.name} Service & Repair in Dubai`;
    const schemaDescription = isArabic ? `خدمة وفحص سيارات ${brand.name} لدى ورشة ديجي-تك في القوز، دبي. تواصل مع الفريق لتأكيد نطاق الخدمة المناسب لطراز سيارتك.` : (priorityBrandSeo == null ? void 0 : priorityBrandSeo.description) ?? `${brand.name} vehicle inspection, maintenance and repair at Digi-Tec Performance Center in Al Quoz, Dubai. Contact the team to confirm the appropriate service scope for your model.`;
    const schemaImage = (priorityBrandSeo == null ? void 0 : priorityBrandSeo.heroImage) ?? (isMercedes ? mercedesAmgEngine : isRangeRoverHub ? rangeRoverWorkshop : isDefenderHub ? defenderWorkshop : brand.logo || void 0);
    const breadcrumb = buildBreadcrumb(url, [
      { name: isArabic ? "الرئيسية" : "Home", url: `https://digitecme.com${isArabic ? "/ar" : "/"}` },
      { name: isArabic ? "العلامات" : "Brands", url: `https://digitecme.com${isArabic ? "/ar" : ""}/brands` },
      { name: brand.name, url }
    ]);
    const webPage = buildWebPage({
      url,
      name: entityName,
      description: schemaDescription,
      breadcrumbId: `${url}#breadcrumb`,
      primaryImage: schemaImage,
      mainEntityId: `${url}#service`
    });
    const brandEntity = buildBrand({
      name: (sourceBrand == null ? void 0 : sourceBrand.name) ?? brand.name,
      logo: brand.logo || void 0
    });
    const schemaOffers = serviceSprintBrand && (isArabic || brand.slug === "volkswagen-service-dubai") ? getSprintServices(brand.slug, isArabic).map((service) => service.title) : isMercedes && !isArabic ? MERCEDES_SCHEMA_OFFERS.map((offer) => offer.name) : isEnglishBmwHub ? [...BMW_CORE_SERVICES.map((service) => service.title), ...BMW_ADDITIONAL_SERVICES.map((service) => service.label)] : isEnglishFerrariHub ? FERRARI_HUB_SERVICES.map((service) => service.title) : isEnglishMclarenHub ? MCLAREN_SERVICES.map((service) => service.title) : isEnglishLamborghiniHub ? LAMBORGHINI_SERVICES.map((service) => service.title) : isEnglishRollsRoyceHub ? ROLLS_ROYCE_SERVICES.map((service) => service.title) : isEnglishAudiHub ? AUDI_SERVICES.map((service) => service.title) : isEnglishBentleyHub ? BENTLEY_SERVICES.map((service) => service.title) : isEnglishRoxHub ? ["ROX 01 diagnostics", "ROX 01 AC repair", "ROX 01 brake repair", "ROX 01 oil change", "ROX 01 soft-close door installation"] : isEnglishAstonHub ? ASTON_SERVICES.map((s) => s.title) : (isArabic ? arBrandServices.map((service) => service.title) : BRAND_OFFER_CATALOG).map((offer) => `${brand.name} ${offer}`);
    const svc = buildService({
      url,
      name: entityName,
      serviceType: isArabic ? `خدمة سيارات ${brand.name}` : `${brand.name} vehicle service`,
      description: schemaDescription,
      image: schemaImage,
      brand: (sourceBrand == null ? void 0 : sourceBrand.name) ?? brand.name,
      offers: schemaOffers,
      areaServed: [isArabic ? "دبي" : "Dubai"]
    });
    const faq = buildFAQ(
      url,
      brand.faqs.map((f) => ({ question: f.q, answer: f.a }))
    );
    return pageGraph([webPage, breadcrumb, brandEntity, svc, ...faq ? [faq] : []]);
  }, [brand, isArabic, isEnglishAstonHub, isEnglishAudiHub, isEnglishBentleyHub, isEnglishBmwHub, isEnglishFerrariHub, isEnglishLamborghiniHub, isEnglishMclarenHub, isEnglishRollsRoyceHub, isEnglishRoxHub, priorityBrandSeo, serviceSprintBrand, sourceBrand]);
  const isMercedesServiceHub = (brand == null ? void 0 : brand.slug) === "mercedes-benz-service-dubai";
  const isPorscheServiceHub = (brand == null ? void 0 : brand.slug) === "porsche-service-dubai";
  const isBmwServiceHub = (brand == null ? void 0 : brand.slug) === "bmw-service-dubai";
  const isPriorityLeadBrand = Boolean(serviceSprintBrand) || isEnglishAstonHub || isMercedesServiceHub || isPorscheServiceHub || isBmwServiceHub || isEnglishAudiHub || isEnglishLamborghiniHub || isEnglishRollsRoyceHub || isEnglishBentleyHub || isEnglishAstonHub || isEnglishRoxHub;
  const isRangeRoverServiceHub = (brand == null ? void 0 : brand.slug) === "range-rover-service-dubai";
  const isDefenderServiceHub = (brand == null ? void 0 : brand.slug) === "defender-service-dubai";
  const specialistHubTitle = (prioritySeo == null ? void 0 : prioritySeo.title) ?? (isMercedesServiceHub ? MERCEDES_META_TITLE : isRangeRoverServiceHub ? RANGE_ROVER_META_TITLE : isDefenderServiceHub ? DEFENDER_META_TITLE : void 0);
  const specialistHubDescription = (prioritySeo == null ? void 0 : prioritySeo.description) ?? (isMercedesServiceHub ? MERCEDES_META_DESCRIPTION : isRangeRoverServiceHub ? RANGE_ROVER_META_DESCRIPTION : isDefenderServiceHub ? DEFENDER_META_DESCRIPTION : void 0);
  useSeo({
    title: brand ? isArabic ? isMercedesServiceHub ? "إصلاح وصيانة مرسيدس في دبي | ديجي-تك" : `إصلاح وصيانة ${(serviceSprintBrand == null ? void 0 : serviceSprintBrand.arabicName) ?? brand.name} في دبي | مركز ديجي-تك` : specialistHubTitle ?? `${brand.name} Repair Dubai | Digi-Tec` : "Brand Service in Dubai | Digi-Tec Performance Centre",
    description: brand ? isArabic ? isMercedesServiceHub ? "ورشة مستقلة لصيانة وإصلاح مرسيدس في القوز، دبي. تشخيص XENTRY وفحص المحرك والقير والتعليق والتكييف والكهرباء مع توضيح النطاق والتكلفة قبل العمل." : serviceSprintBrand ? `صيانة وإصلاح ${serviceSprintBrand.arabicName} في القوز، دبي. ناقش الصيانة والتشخيص والأعطال الميكانيكية والكهربائية مع ديجي-تك لتأكيد نطاق الفحص وطلب موعد.` : `إصلاح وصيانة ${brand.name} في دبي: تشخيص وصيانة وفرامل وناقل حركة وتعليق وتكييف مع قطع بالمواصفات المناسبة لدى مركز ديجي-تك.` : specialistHubDescription ?? `Specialist ${brand.name} repair and service in Dubai: diagnostics, maintenance, brakes, transmission, suspension and AC at Digi-Tec, Al Quoz.` : "Expert luxury car maintenance, diagnostics, and performance tuning in Dubai at Digi-Tec Performance Centre.",
    canonical: brand ? `https://digitecme.com${isArabic ? "/ar" : ""}/brands/${brand.slug}` : `https://digitecme.com${isArabic ? "/ar" : "/"}`,
    ogImage: (priorityBrandSeo == null ? void 0 : priorityBrandSeo.heroImage) ? `https://digitecme.com${priorityBrandSeo.heroImage}` : isMercedesServiceHub ? `https://digitecme.com${mercedesAmgEngine}` : isRangeRoverServiceHub ? `https://digitecme.com${rangeRoverWorkshop}` : isDefenderServiceHub ? `https://digitecme.com${defenderWorkshop}` : void 0,
    ogImageAlt: (priorityBrandSeo == null ? void 0 : priorityBrandSeo.heroImageAlt) ?? (isMercedesServiceHub ? "Mercedes-AMG engine bay" : void 0),
    ogImageWidth: priorityBrandSeo == null ? void 0 : priorityBrandSeo.heroImageWidth,
    ogImageHeight: priorityBrandSeo == null ? void 0 : priorityBrandSeo.heroImageHeight,
    ogTitle: isArabic && isMercedesServiceHub ? void 0 : specialistHubTitle,
    ogDescription: isArabic && isMercedesServiceHub ? void 0 : specialistHubDescription,
    noindex: !brand,
    jsonLd: brandJsonLd
  });
  if (!brand) {
    return /* @__PURE__ */ jsx(Navigate, { to: localizedPath("/"), replace: true });
  }
  const whatsappHref = isEnglishAstonHub ? ASTON_WHATSAPP_HREF : isEnglishBmwHub ? BMW_WHATSAPP_HREF : isEnglishMclarenHub ? MCLAREN_WHATSAPP_HREF : isEnglishLamborghiniHub ? LAMBORGHINI_WHATSAPP_HREF : isEnglishRollsRoyceHub ? ROLLS_ROYCE_WHATSAPP_HREF : isEnglishAudiHub ? AUDI_WHATSAPP_HREF : isEnglishBentleyHub ? BENTLEY_WHATSAPP_HREF : `https://wa.me/97143402223?text=${encodeURIComponent(
    isArabic ? `مرحباً، أود الاستفسار عن خدمة ${brand.name} لدى مركز ديجي-تك بيرفورمانس. طراز السيارة وسنتها: ` : `Hi Digi-Tec, I am enquiring from your ${brand.name} service page and would like to arrange an inspection.

Model and year: 
Service, warning or symptom: `
  )}`;
  const otherBrands = (priorityBrandSeo ? PRIORITY_BRAND_SLUGS.map((prioritySlug) => getBrandBySlug(prioritySlug)).filter((item) => Boolean(item)) : brands).filter((b) => b.slug !== brand.slug).slice(0, 12);
  const relatedServices = brand.relatedServices.map((s) => getServiceBySlug(s)).filter((s) => Boolean(s));
  const seoCopy = isArabic && isMercedesServiceHub ? MERCEDES_ARABIC_SEO_COPY : isArabic ? {
    intro: `ديجي-تك مركز مستقل ومتخصص في خدمة ${brand.name} في دبي. نجمع بين التشخيص المتقدم والقطع المناسبة والفنيين ذوي الخبرة لتقديم صيانة وإصلاح واضحين من ورشتنا في القوز.`,
    dubai: `تضع حرارة الإمارات ضغطاً إضافياً على التبريد والزيوت والبطارية والمطاط والتكييف. لذلك نفحص سيارات ${brand.name} مع مراعاة ظروف دبي وطريقة الاستخدام الفعلية.`,
    expertise: serviceSprintBrand ? `يُحدد نطاق فحص سيارات ${brand.name} من الطراز وسنة الصنع والتجهيزات والأعراض. تُؤكد إجراءات الإصلاح ووظائف إعادة الضبط أو المعايرة أو البرمجة المتاحة للسيارة قبل عرض السعر؛ ويُشرح العمل المقترح قبل الموافقة.` : `تشمل خبرتنا بسيارات ${brand.name} الصيانة والتشخيص والمحرك وناقل الحركة والتعليق والفرامل والكهرباء والتكييف، مع المعايرة والاختبار بعد الإصلاح.`,
    parts: `يحدد عرض السعر القطع والسوائل المقترحة قبل الموافقة. قد تشمل الخيارات قطعاً أصلية أو من مورّد مطابق أو بديلاً مناسباً يوافق عليه المالك بحسب الإصلاح والتوفر.`,
    cta: `لحجز خدمة ${brand.name} في دبي، اتصل على +971 4 340 2223 أو أرسل رسالة واتساب أو استخدم نموذج الحجز في هذه الصفحة.`
  } : isMercedesServiceHub ? MERCEDES_SEO_COPY : isRangeRoverServiceHub ? RANGE_ROVER_SEO_COPY : isDefenderServiceHub ? DEFENDER_SEO_COPY : getBrandSeoCopy(brand);
  const displayedServices = isArabic ? arBrandServices : SERVICES;
  const brandServices = getServicesForBrand(serviceProfileSlug);
  const profile = BRAND_PROFILES[serviceProfileSlug];
  const models = BRAND_MODELS[brand.slug] ?? (profile == null ? void 0 : profile.models) ?? [];
  const getServicePath = (serviceSlug) => brand.slug === "mercedes-benz-service-dubai" ? MERCEDES_SERVICE_PATHS[serviceSlug] ?? `/brands/${serviceProfileSlug}/${serviceSlug}` : brand.slug === "volkswagen-service-dubai" ? VOLKSWAGEN_SERVICE_OWNERS[serviceSlug] ?? `/brands/${serviceProfileSlug}/${serviceSlug}` : `/brands/${serviceProfileSlug}/${serviceSlug}`;
  const isFerrari = brand.slug === "ferrari-service-dubai";
  const isRangeRover = brand.slug === "range-rover-service-dubai";
  const isDefender = brand.slug === "defender-service-dubai" || brand.name === "Defender";
  const isLamborghini = brand.slug === "lamborghini-service-dubai";
  const isPorsche = brand.slug === "porsche-service-dubai";
  const isMaybach = brand.slug === "maybach-service-dubai";
  const heroImage = (priorityBrandSeo == null ? void 0 : priorityBrandSeo.heroImage) ?? (isMercedesServiceHub ? mercedesWorkshop : isMaybach ? maybachWorkshop : isPorsche ? porscheGt3rsWorkshop : isLamborghini ? lamborghiniWorkshop : isDefender ? defenderWorkshop : isRangeRover ? rangeRoverWorkshop : isFerrari ? ferrariEngineWorkshop : void 0);
  const heroImageAlt = (priorityBrandSeo == null ? void 0 : priorityBrandSeo.heroImageAlt) ?? (isMercedesServiceHub ? "Mercedes-Benz and AMG vehicles inside the Digi-Tec specialist workshop in Dubai" : "");
  const brandPageDesign = BRAND_PAGE_DESIGNS[brand.slug] ?? DEFAULT_BRAND_PAGE_DESIGN;
  const brandPageStyle = {
    "--brand-accent": brandPageDesign.accent,
    "--brand-accent-rgb": brandPageDesign.accentRgb,
    "--brand-hero-position": brandPageDesign.heroPosition
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `brand-experience site-page min-h-screen bg-black text-off-white ${isPriorityLeadBrand ? "pb-20 md:pb-0" : ""}`,
      "data-brand-art": brandPageDesign.art,
      "data-brand-rhythm": brandPageDesign.rhythm,
      style: brandPageStyle,
      children: [
        /* @__PURE__ */ jsx(Header, { overlay: true }),
        /* @__PURE__ */ jsxs("main", { id: "main-content", className: "brand-page-main", children: [
          /* @__PURE__ */ jsx("nav", { "aria-label": isArabic ? "مسار التنقل" : "Breadcrumb", className: "brand-breadcrumb max-w-7xl mx-auto px-4 sm:px-6 pt-6 text-xs sm:text-sm text-gray-400", children: /* @__PURE__ */ jsxs("ol", { className: "flex flex-wrap items-center gap-2", children: [
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(LocalizedLink, { to: "/", className: "hover:text-burnt-orange", children: isArabic ? "الرئيسية" : "Home" }) }),
            /* @__PURE__ */ jsx("li", { "aria-hidden": "true", children: "/" }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(LocalizedLink, { to: "/brands", className: "hover:text-burnt-orange", children: isArabic ? "العلامات" : "Brands" }) }),
            /* @__PURE__ */ jsx("li", { "aria-hidden": "true", children: "/" }),
            /* @__PURE__ */ jsx("li", { className: "text-off-white font-semibold", "aria-current": "page", children: isArabic ? `إصلاح وصيانة ${brand.name} في دبي` : isEnglishBmwHub ? "BMW Service & Repair Dubai" : isFerrari ? "Ferrari Service & Repair Dubai" : isEnglishMclarenHub ? "McLaren Service & Repair Dubai" : isEnglishLamborghiniHub ? "Lamborghini Service & Repair Dubai" : isEnglishRollsRoyceHub ? "Rolls-Royce Service & Repair Dubai" : isEnglishAudiHub ? "Audi Service & Repair Dubai" : isEnglishBentleyHub ? "Bentley Service & Repair Dubai" : isEnglishRoxHub ? "ROX 01 Service & Repair Dubai" : isEnglishAstonHub ? "Aston Martin Service & Repair Dubai" : `${brand.name} Repair & Service Dubai` })
          ] }) }),
          /* @__PURE__ */ jsxs("section", { className: `brand-hero brand-hero--${brandPageDesign.art} theme-dark-section relative overflow-hidden border-b border-white/[0.08] bg-black`, children: [
            heroImage ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: heroImage,
                  alt: heroImageAlt,
                  "aria-hidden": heroImageAlt ? void 0 : true,
                  fetchPriority: "high",
                  width: (priorityBrandSeo == null ? void 0 : priorityBrandSeo.heroImageWidth) ?? (isMercedesServiceHub ? 1200 : void 0),
                  height: (priorityBrandSeo == null ? void 0 : priorityBrandSeo.heroImageHeight) ?? (isMercedesServiceHub ? 1600 : void 0),
                  className: "brand-hero__media absolute inset-0 h-full w-full object-cover opacity-70",
                  style: { objectPosition: brandPageDesign.heroPosition }
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "brand-hero__veil absolute inset-0" })
            ] }) : /* @__PURE__ */ jsx("div", { className: "brand-hero__ambient absolute inset-0" }),
            /* @__PURE__ */ jsx("div", { className: "brand-hero__shell relative z-10 mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-12", children: /* @__PURE__ */ jsx("div", { className: "brand-hero__copy max-w-4xl", children: /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("div", { className: "brand-hero__identity mb-6 flex items-center gap-4", children: [
                /* @__PURE__ */ jsx("div", { className: "brand-logo-lockup flex h-14 w-20 items-center justify-center overflow-hidden bg-white/[0.94] p-2 sm:h-16 sm:w-24", children: brand.logo ? /* @__PURE__ */ jsx("img", { src: brand.logo, alt: `${brand.name} logo`, width: "96", height: "64", decoding: "async", className: "w-full h-full object-contain" }) : /* @__PURE__ */ jsx("span", { className: "text-2xl font-semibold text-burnt-orange", children: brand.name.charAt(0) }) }),
                /* @__PURE__ */ jsx("span", { className: "brand-hero__kicker home-kicker", children: brand.specialization })
              ] }),
              /* @__PURE__ */ jsx("h1", { className: "brand-hero__title mb-5 max-w-4xl text-[clamp(2.75rem,5vw,5.25rem)] font-semibold leading-[0.98] tracking-[-0.05em]", children: isArabic && serviceSprintBrand ? /* @__PURE__ */ jsxs(Fragment, { children: [
                "إصلاح وصيانة ",
                /* @__PURE__ */ jsxs("span", { className: "text-white/62", children: [
                  serviceSprintBrand.arabicName,
                  " في دبي"
                ] })
              ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                isEnglishRoxHub ? "ROX 01" : brand.name,
                " ",
                /* @__PURE__ */ jsx("span", { className: "text-white/62", children: isArabic ? "للإصلاح والصيانة في دبي" : isEnglishBmwHub || isFerrari || isEnglishMclarenHub || isEnglishLamborghiniHub || isEnglishRollsRoyceHub || isEnglishAudiHub || isEnglishBentleyHub || isEnglishAstonHub || isEnglishRoxHub ? "Service & Repair Dubai" : "Repair & Service Dubai" })
              ] }) }),
              /* @__PURE__ */ jsx("p", { className: "brand-hero__intro mb-8 max-w-2xl text-base leading-8 text-white/62 sm:text-lg", children: brand.intro }),
              /* @__PURE__ */ jsxs("div", { className: isEnglishBmwHub ? "brand-hero__actions flex flex-col flex-wrap gap-3 sm:gap-4 xl:flex-row" : "brand-hero__actions flex flex-col sm:flex-row gap-3 sm:gap-4", children: [
                /* @__PURE__ */ jsxs(
                  "a",
                  {
                    href: whatsappHref,
                    "data-cta-placement": "hero",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "btn-primary",
                    children: [
                      /* @__PURE__ */ jsx(MessageCircle, { className: "w-5 h-5" }),
                      isArabic ? "راسلنا عبر واتساب" : isEnglishAstonHub ? "Request an Aston Martin Service Quote" : isEnglishBmwHub ? "Request BMW Service" : isEnglishAudiHub ? "Book an Audi inspection on WhatsApp" : isEnglishBentleyHub ? "Book a Bentley inspection on WhatsApp" : isEnglishRoxHub ? "Book a ROX 01 inspection on WhatsApp" : isFerrari ? "Request a Ferrari inspection" : isEnglishMclarenHub ? "Request McLaren Service" : isEnglishLamborghiniHub ? "Request a Lamborghini Assessment" : isEnglishRollsRoyceHub ? "Request a Rolls-Royce Service Quote" : isMercedesServiceHub ? "Book Mercedes Service" : isPriorityLeadBrand ? `Request a ${brand.name} Inspection` : `Request ${brand.name} Service`
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs("a", { href: "tel:+97143402223", "data-cta-placement": "hero", className: "btn-secondary", children: [
                  /* @__PURE__ */ jsx(Phone, { className: "w-5 h-5" }),
                  isArabic && serviceSprintBrand ? /* @__PURE__ */ jsxs(Fragment, { children: [
                    "اتصل على ",
                    /* @__PURE__ */ jsx("bdi", { dir: "ltr", children: "+971 4 340 2223" })
                  ] }) : isArabic ? "اتصل على +971 4 340 2223" : isEnglishBmwHub || isEnglishAudiHub || isEnglishRollsRoyceHub || isEnglishBentleyHub ? "Call the Al Quoz workshop" : "Call +971 4 340 2223"
                ] }),
                (isPriorityLeadBrand || isRangeRoverServiceHub || isDefenderServiceHub) && /* @__PURE__ */ jsxs(
                  "a",
                  {
                    href: "https://maps.google.com/?q=Al+Quoz+Industrial+Area+3+Dubai",
                    "data-cta-placement": "hero",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "btn-secondary",
                    children: [
                      /* @__PURE__ */ jsx(MapPin, { className: "w-5 h-5" }),
                      isArabic ? "الاتجاهات إلى القوز" : "Directions to Al Quoz"
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(CtaAssurance, { className: "mt-4", align: "start", text: isArabic ? "تواصل معنا لمناقشة السيارة وطلب موعد" : void 0 })
            ] }) }) })
          ] }),
          isEnglishBmwHub && /* @__PURE__ */ jsx("section", { className: "brand-section brand-section--local border-t border-white/5 bg-gradient-to-br from-charcoal/50 to-black py-10 sm:py-14", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "p-6 sm:p-8", children: [
              /* @__PURE__ */ jsx("p", { className: "eyebrow mb-4", children: "Al Quoz Industrial Area 3, Dubai" }),
              /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black sm:text-4xl", children: "A local workshop for your BMW" }),
              /* @__PURE__ */ jsx("p", { className: "mt-4 text-base leading-relaxed text-gray-300", children: "Bring your car service or repair enquiry to DIGI-TEC, an independent workshop established in 2002. Discuss due maintenance, a warning light or a change in how your BMW drives with the team before arranging the appropriate inspection." }),
              /* @__PURE__ */ jsxs("a", { href: "#bmw-services", className: "mt-5 inline-flex items-center gap-2 text-sm font-semibold text-burnt-orange hover:underline", children: [
                "Explore BMW services ",
                /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
              ] })
            ] }),
            /* @__PURE__ */ jsx(BmwBookingChecklist, {})
          ] }) }),
          isPriorityLeadBrand && !isArabic && !isEnglishBmwHub && !isEnglishAudiHub && !isEnglishMclarenHub && !isEnglishLamborghiniHub && !isEnglishRollsRoyceHub && !isEnglishBentleyHub && !isEnglishAstonHub && !isEnglishRoxHub && /* @__PURE__ */ jsx("section", { className: "brand-section brand-section--local border-t border-white/5 bg-gradient-to-br from-charcoal/50 to-black py-10 sm:py-14", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[1.25fr_0.75fr]", children: [
            /* @__PURE__ */ jsxs("div", { className: "card-premium rounded-2xl p-6 sm:p-8", children: [
              /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-burnt-orange", children: [
                /* @__PURE__ */ jsx(MapPin, { className: "h-4 w-4" }),
                " Al Quoz Industrial Area 3, Dubai"
              ] }),
              /* @__PURE__ */ jsxs("h2", { className: "mt-3 text-2xl font-black sm:text-4xl", children: [
                "Looking for a ",
                brand.name,
                " Workshop Near You?"
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "mt-4 max-w-3xl text-sm leading-relaxed text-gray-300 sm:text-base", children: [
                "Digi-Tec is an independent workshop established in 2002, close to Sheikh Zayed Road. We inspect ",
                brand.name,
                " maintenance, warning-light, AC, brake, suspension, engine and transmission concerns from our Al Quoz workshop."
              ] }),
              /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm leading-relaxed text-gray-400", children: "Send your model, year, mileage and symptoms before visiting. The team will confirm the appropriate first inspection and an available appointment rather than guessing from a warning code alone." }),
              /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-col gap-3 sm:flex-row", children: [
                /* @__PURE__ */ jsxs("a", { href: whatsappHref, "data-cta-placement": "location_section", target: "_blank", rel: "noopener noreferrer", className: "btn-primary", children: [
                  /* @__PURE__ */ jsx(MessageCircle, { className: "h-5 w-5" }),
                  " Request an Inspection"
                ] }),
                /* @__PURE__ */ jsxs("a", { href: "https://maps.google.com/?q=Al+Quoz+Industrial+Area+3+Dubai", "data-cta-placement": "location_section", target: "_blank", rel: "noopener noreferrer", className: "btn-secondary", children: [
                  /* @__PURE__ */ jsx(MapPin, { className: "h-5 w-5" }),
                  " Get Directions"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "card-premium rounded-2xl p-6 sm:p-8", children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs font-bold uppercase tracking-widest text-burnt-orange", children: "Models we commonly discuss" }),
              /* @__PURE__ */ jsxs("h2", { className: "mt-3 text-xl font-black sm:text-2xl", children: [
                "Your ",
                brand.name,
                ", identified correctly"
              ] }),
              /* @__PURE__ */ jsx("div", { className: "mt-5 flex flex-wrap gap-2", children: models.map((model) => /* @__PURE__ */ jsx("span", { className: "rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-gray-200", children: model }, model)) }),
              /* @__PURE__ */ jsx("p", { className: "mt-5 text-sm leading-relaxed text-gray-400", children: "VIN, fitted systems and service history are checked when they affect diagnostics, parts or procedures." })
            ] })
          ] }) }),
          isMercedesServiceHub && !isArabic && /* @__PURE__ */ jsx("nav", { "aria-label": "Mercedes page sections", className: "sticky top-[76px] z-30 border-y border-white/10 bg-black/90 backdrop-blur lg:top-[97px]", children: /* @__PURE__ */ jsxs("div", { className: "relative mx-auto max-w-7xl", children: [
            /* @__PURE__ */ jsx("div", { className: "flex gap-2 overflow-x-auto px-4 py-3 pr-12 sm:px-6 sm:pr-14", children: [
              ["Services", "#mercedes-services"],
              ["Problems", "#mercedes-problems"],
              ["Models", "#mercedes-models"],
              ["Maintenance", "#mercedes-maintenance-scope"],
              ["Reviews", "#mercedes-reviews"],
              ["FAQs", "#mercedes-faqs"],
              ["Book", "#mercedes-booking"]
            ].map(([label, href]) => /* @__PURE__ */ jsx("a", { href, className: "inline-flex min-h-11 shrink-0 items-center rounded-full border border-white/10 px-4 py-2 text-xs font-semibold text-white/65 transition-colors hover:border-burnt-orange/50 hover:text-burnt-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burnt-orange", children: label }, href)) }),
            /* @__PURE__ */ jsx("span", { "aria-hidden": "true", className: "pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-black via-black/85 to-transparent" })
          ] }) }),
          isPorscheServiceHub && !isArabic && /* @__PURE__ */ jsx(PorscheKnowledgeCentre, {}),
          isPorscheServiceHub && isArabic && /* @__PURE__ */ jsx("section", { className: "border-t border-white/5 bg-black py-12 sm:py-16", "aria-labelledby": "porsche-ar-guides-title", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
            /* @__PURE__ */ jsx("h2", { id: "porsche-ar-guides-title", className: "mb-3 text-2xl font-black text-off-white sm:text-3xl", children: "أدلة Porsche المتاحة بالعربية" }),
            /* @__PURE__ */ jsx("p", { className: "mb-6 max-w-3xl text-gray-300", children: "اختر الطراز أو اقرأ دليل الصيانة واختيار الورشة قبل تحديد نطاق الفحص المناسب لسيارتك." }),
            /* @__PURE__ */ jsx("div", { className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3", children: [
              { label: "صيانة Porsche 911", path: "/blog/porsche-911-service-dubai-guide" },
              { label: "صيانة Porsche Cayenne", path: "/blog/porsche-cayenne-service-dubai-guide" },
              { label: "صيانة Porsche Panamera", path: "/blog/porsche-panamera-service-dubai-guide" },
              { label: "تخطيط صيانة Porsche", path: "/blog/porsche-maintenance-guide-dubai" },
              { label: "كيف تختار ورشة Porsche", path: "/best-porsche-workshop-dubai" }
            ].map((item) => /* @__PURE__ */ jsxs(LocalizedLink, { to: item.path, className: "card-premium rounded-xl p-4 font-semibold text-off-white transition-colors hover:text-burnt-orange", children: [
              item.label,
              " ",
              /* @__PURE__ */ jsx(ArrowRight, { className: "inline h-4 w-4" })
            ] }, item.path)) })
          ] }) }),
          isFerrari && !isArabic && /* @__PURE__ */ jsx(FerrariKnowledgeCentre, {}),
          brand.slug === "audi-service-dubai" && !isArabic && !isEnglishAudiHub && /* @__PURE__ */ jsx("section", { className: "brand-section brand-section--knowledge border-t border-white/5 bg-gradient-to-br from-charcoal/50 to-black py-12 sm:py-16", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
            /* @__PURE__ */ jsx("p", { className: "eyebrow mb-4", children: "Audi model knowledge centre" }),
            /* @__PURE__ */ jsx("h2", { className: "max-w-4xl text-2xl font-black sm:text-4xl", children: "Audi service information by model, system and symptom" }),
            /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-3xl text-sm leading-relaxed text-white/65 sm:text-base", children: "Choose your Audi model for generation-aware service, engine, gearbox, quattro, suspension and Dubai maintenance guidance. Each page links back here for broad Audi service and repair enquiries." }),
            /* @__PURE__ */ jsx("div", { className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: audiModelPages.map((model) => /* @__PURE__ */ jsxs(LocalizedLink, { to: audiModelPath(model), className: "card-premium group rounded-2xl p-5", children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs font-bold uppercase tracking-widest text-burnt-orange", children: model.series }),
              /* @__PURE__ */ jsx("h3", { className: "mt-2 text-xl font-black group-hover:text-burnt-orange", children: model.name }),
              /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-white/55", children: "Service, repair, diagnostics and common concerns." }),
              /* @__PURE__ */ jsxs("span", { className: "mt-4 inline-flex items-center gap-1 text-sm font-semibold text-burnt-orange", children: [
                "View ",
                model.name,
                " ",
                /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
              ] })
            ] }, model.slug)) })
          ] }) }),
          isRangeRoverServiceHub && !isArabic && /* @__PURE__ */ jsx("section", { className: "brand-section brand-section--local-detail py-12 sm:py-16 bg-gradient-to-br from-charcoal/40 to-black border-t border-white/5", children: /* @__PURE__ */ jsx("div", { className: "max-w-5xl mx-auto px-4 sm:px-6", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-[1.3fr_0.7fr] gap-6 items-stretch", children: [
            /* @__PURE__ */ jsxs("div", { className: "card-premium rounded-2xl p-6 sm:p-8", children: [
              /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 text-burnt-orange text-xs font-bold uppercase tracking-widest", children: [
                /* @__PURE__ */ jsx(MapPin, { className: "w-4 h-4" }),
                " Al Quoz Industrial Area 3"
              ] }),
              /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-4xl font-black mt-3", children: "Range Rover Workshop Near You in Dubai" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-300 text-sm sm:text-base leading-relaxed mt-4", children: "Searching for a Range Rover workshop near you? Digi-Tec is located in Al Quoz Industrial Area 3, close to Sheikh Zayed Road. Our workshop serves Range Rover owners from Al Quoz, Downtown Dubai, Business Bay, Dubai Hills, Jumeirah, Umm Suqeim, Palm Jumeirah, Dubai Marina, Arabian Ranches and surrounding communities." }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm leading-relaxed mt-4", children: "Call before travelling so we can confirm the right inspection slot for your Range Rover, Sport, Velar or Evoque and prepare the appropriate JLR diagnostic equipment." }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-3 mt-6", children: [
                /* @__PURE__ */ jsxs("a", { href: "https://maps.google.com/?q=Al+Quoz+Industrial+Area+3+Dubai", target: "_blank", rel: "noopener noreferrer", className: "btn-primary", children: [
                  /* @__PURE__ */ jsx(MapPin, { className: "w-5 h-5" }),
                  " Get Directions"
                ] }),
                /* @__PURE__ */ jsxs("a", { href: "tel:+97143402223", className: "btn-secondary", children: [
                  /* @__PURE__ */ jsx(Phone, { className: "w-5 h-5" }),
                  " Call the Workshop"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "card-premium rounded-2xl p-6 sm:p-8 flex flex-col justify-center", children: [
              /* @__PURE__ */ jsx("span", { className: "text-burnt-orange text-xs font-bold uppercase tracking-widest", children: "Workshop selection guide" }),
              /* @__PURE__ */ jsx("h2", { className: "text-xl sm:text-2xl font-black mt-3", children: "Why Choose a Range Rover Specialist?" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm leading-relaxed mt-3", children: "See the diagnostic tools, technical capabilities and workshop criteria owners should compare before booking an independent Range Rover specialist in Dubai." }),
              /* @__PURE__ */ jsxs(LocalizedLink, { to: "/best-range-rover-workshop-dubai", className: "inline-flex items-center gap-2 text-burnt-orange font-semibold mt-5 hover:text-off-white transition-colors", children: [
                "Read the workshop selection guide ",
                /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
              ] })
            ] })
          ] }) }) }),
          serviceSprintBrand && (isArabic || brand.slug === "volkswagen-service-dubai") ? /* @__PURE__ */ jsx(BrandServiceScope, { slug: brand.slug, isArabic }) : isEnglishAstonHub ? /* @__PURE__ */ jsx(AstonMartinHubSections, {}) : isEnglishAudiHub ? /* @__PURE__ */ jsx(AudiHubSections, {}) : isEnglishBentleyHub ? /* @__PURE__ */ jsx(BentleyHubSections, {}) : isEnglishRoxHub ? /* @__PURE__ */ jsx(RoxHubSections, {}) : isEnglishMclarenHub ? /* @__PURE__ */ jsx(MclarenHubSections, {}) : isEnglishLamborghiniHub ? /* @__PURE__ */ jsx(LamborghiniHubSections, {}) : isEnglishRollsRoyceHub ? /* @__PURE__ */ jsx(RollsRoyceHubSections, {}) : isEnglishBmwHub ? /* @__PURE__ */ jsx(BmwCoreServices, {}) : isFerrari && !isArabic ? null : /* @__PURE__ */ jsx("section", { id: isPorscheServiceHub && !isArabic ? "porsche-services" : isMercedesServiceHub && !isArabic ? "mercedes-services" : void 0, className: `brand-section brand-section--services ${isMercedesServiceHub && !isArabic ? "scroll-mt-[10rem]" : "scroll-mt-24"} py-12 sm:py-20 bg-black border-t border-white/5`, children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "brand-section-heading text-center mb-10 sm:mb-14", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-4xl lg:text-5xl font-black mb-3 sm:mb-4", children: isArabic ? /* @__PURE__ */ jsxs(Fragment, { children: [
                "خدمات ",
                /* @__PURE__ */ jsx("span", { className: "text-burnt-orange", children: brand.name })
              ] }) : isMercedesServiceHub ? /* @__PURE__ */ jsxs(Fragment, { children: [
                "Mercedes ",
                /* @__PURE__ */ jsx("span", { className: "text-burnt-orange", children: "Repair & Maintenance" }),
                " in Dubai"
              ] }) : isPorscheServiceHub ? /* @__PURE__ */ jsxs(Fragment, { children: [
                "Porsche ",
                /* @__PURE__ */ jsx("span", { className: "text-burnt-orange", children: "Service & Repair" }),
                " in Dubai"
              ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                "Our ",
                /* @__PURE__ */ jsx("span", { className: "text-burnt-orange", children: brand.name }),
                " Services"
              ] }) }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-300 max-w-3xl mx-auto text-sm sm:text-lg", children: isArabic ? `عناية متكاملة بسيارات ${brand.name}، من الصيانة الدورية إلى الإصلاحات المتقدمة.` : isMercedesServiceHub ? "Start with the symptom or service your Mercedes needs. Each area below links to a focused page with the relevant warning signs, inspection process and model-specific technical detail." : isPorscheServiceHub ? "Choose the concern or scheduled work for your Porsche. The service directory above links to the relevant inspection scope, while model, system and symptom guides explain what may change the decision." : `Comprehensive care for every ${brand.name}, from routine maintenance to advanced performance work.` })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "brand-services-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6", children: isMercedesServiceHub && !isArabic ? MERCEDES_CORE_SERVICES.map((s) => /* @__PURE__ */ jsxs(
              LocalizedLink,
              {
                to: s.path,
                className: "card-premium group rounded-2xl p-6 sm:p-7 transition-all duration-300",
                children: [
                  /* @__PURE__ */ jsx("h3", { className: "text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-burnt-orange transition-colors", children: s.title }),
                  /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm sm:text-base leading-relaxed", children: s.description }),
                  /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 text-burnt-orange text-sm font-semibold mt-4", children: [
                    "Explore service ",
                    /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
                  ] })
                ]
              },
              s.title
            )) : displayedServices.map((s) => /* @__PURE__ */ jsxs(
              "div",
              {
                className: "card-premium rounded-2xl p-6 sm:p-7 transition-all duration-300",
                children: [
                  /* @__PURE__ */ jsx("h3", { className: "text-lg sm:text-xl font-bold text-white mb-2", children: s.title }),
                  /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm sm:text-base leading-relaxed", children: s.description })
                ]
              },
              s.title
            )) })
          ] }) }),
          isEnglishJetourHub && /* @__PURE__ */ jsx("section", { className: "brand-section border-t border-white/5 bg-charcoal/30 py-12 sm:py-16", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black text-white sm:text-3xl", children: "Jetour models and the next service step" }),
            /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-3xl text-gray-300", children: "T2, X70, X70 Plus, X90 Plus and Dashing enquiries can begin here. Service requirements depend on the model, year and fitted powertrain. Tell us the warning or work needed so the right existing service path can be confirmed." }),
            /* @__PURE__ */ jsx("div", { className: "mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: [
              { title: "Warning light or rough running", path: "/brands/jetour-service-dubai/engine-diagnostics", detail: "Request a diagnostic assessment before a part is recommended." },
              { title: "Weak cabin cooling", path: "/brands/jetour-service-dubai/ac-repair", detail: "Inspect cooling performance and the cause before refrigerant or parts are proposed." },
              { title: "Gearbox or shifting concern", path: "/services/transmission-repair-dubai", detail: "Identify the fitted gearbox and symptom before service or repair." },
              { title: "Screen or electrical fault", path: "/services/auto-electrical-repair-dubai", detail: "Check power, wiring and the affected function before replacement." }
            ].map((item) => /* @__PURE__ */ jsxs(LocalizedLink, { to: item.path, className: "card-premium rounded-2xl p-6", children: [
              /* @__PURE__ */ jsx("h3", { className: "font-bold text-white", children: item.title }),
              /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm leading-relaxed text-gray-400", children: item.detail }),
              /* @__PURE__ */ jsxs("span", { className: "mt-4 inline-flex items-center gap-1 text-sm font-semibold text-burnt-orange", children: [
                "View service ",
                /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
              ] })
            ] }, item.path)) })
          ] }) }),
          isEnglishBmwHub && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(BmwKnowledgeHub, {}),
            /* @__PURE__ */ jsx(BmwWorkshopProof, {})
          ] }),
          profile && !isEnglishBmwHub && !isEnglishAudiHub && !isEnglishBentleyHub && !isEnglishAstonHub && !isEnglishMclarenHub && !isEnglishLamborghiniHub && !isEnglishRollsRoyceHub && !isEnglishRoxHub && /* @__PURE__ */ jsx("section", { className: "brand-section brand-section--capability py-12 sm:py-20 bg-gradient-to-br from-charcoal/40 to-black border-t border-white/5", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "brand-section-heading text-center mb-8 sm:mb-12", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-4xl lg:text-5xl font-black mb-3", children: isArabic ? /* @__PURE__ */ jsxs(Fragment, { children: [
                "كيف نخدم ",
                /* @__PURE__ */ jsx("span", { className: "text-burnt-orange", children: brand.name }),
                " في دبي"
              ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                "How We Service ",
                /* @__PURE__ */ jsx("span", { className: "text-burnt-orange", children: brand.name }),
                " in Dubai"
              ] }) }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-400 max-w-3xl mx-auto text-sm sm:text-base", children: isArabic ? `نخصص خطوات الورشة لأنظمة التشخيص ومجموعة الحركة ونقاط التآكل المرتبطة بالمناخ في سيارة ${brand.name}.` : `The workshop process is tailored to the diagnostic systems, drivetrain, and climate-related wear points of your ${brand.name}.` })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "brand-capability-grid grid sm:grid-cols-3 gap-4 sm:gap-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "card-premium rounded-2xl p-5 sm:p-6", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-off-white mb-3", children: isArabic ? "منصة التشخيص" : "Diagnostic platform" }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm leading-relaxed", children: isArabic ? isPorsche ? "تتوفر لدى ديجي-تك قدرة التشخيص PIWIS 3 لسيارات Porsche. تعتمد قراءة الوحدات والبيانات الحية ووظائف الترميز والبرمجة على الطراز والجيل والوحدة وإمكانية الوصول؛ نؤكد النطاق قبل إدراجه في عرض السعر." : isB9Brand ? `يتم تأكيد إمكانات الفحص والخدمة المتاحة لسيارة ${brand.name} المحددة قبل عرض السعر. لا نفترض توفر برمجة الوحدات أو أعمال الجهد العالي.` : `يتم تأكيد توافق الفحص وقراءة البيانات وأي برمجة أو إعادة ضبط مطلوبة لسيارة ${brand.name} المحددة قبل إدراجها في عرض السعر.` : isB9Brand ? `${profile.diagnosticTool}. The available inspection and repair scope is confirmed for the exact vehicle; module programming and high-voltage work are not assumed.` : `${profile.diagnosticTool}. Compatible fault tracing, live data, coding, programming and service-reset functions are confirmed for the exact vehicle and required module before quotation.` })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "card-premium rounded-2xl p-5 sm:p-6", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-off-white mb-3", children: isArabic ? "الأنظمة الأساسية" : "Core systems" }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm leading-relaxed", children: isArabic ? isB9Brand ? `تختلف الأنظمة بحسب الطراز والمواصفات. نحدد نطاق الفحص والخدمة المناسب لسيارة ${brand.name} المحددة قبل العمل.` : `المحرك وناقل الحركة ونظام التعليق والأنظمة الإلكترونية الخاصة بطرازات ${brand.name}.` : /* @__PURE__ */ jsxs(Fragment, { children: [
                  profile.transmissionName,
                  " • ",
                  profile.suspensionType,
                  " • ",
                  profile.engineFamily
                ] }) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "card-premium rounded-2xl p-5 sm:p-6", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-off-white mb-3", children: isArabic ? "عناية تناسب دبي" : "Dubai-focused care" }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm leading-relaxed", children: isArabic ? "نفحص التبريد والبطارية والزيوت والإطارات والفرامل مع مراعاة حرارة دبي والازدحام وطريقة الاستخدام." : profile.climateNote })
              ] })
            ] }),
            isPorsche && /* @__PURE__ */ jsxs("figure", { className: "max-w-xl mx-auto mt-6 sm:mt-8 rounded-2xl overflow-hidden border border-white/10 bg-black/40 flex", children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: porscheWorkshop,
                  alt: "Porsche receiving specialist service at Digi-Tec Performance Centre in Dubai",
                  className: "w-28 sm:w-36 h-36 sm:h-40 object-cover",
                  loading: "lazy"
                }
              ),
              /* @__PURE__ */ jsxs("figcaption", { className: "p-4 sm:p-5 flex flex-col justify-center", children: [
                /* @__PURE__ */ jsx("span", { className: "text-burnt-orange text-xs font-bold uppercase tracking-widest mb-1", children: "Porsche workshop" }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-300 text-sm leading-relaxed", children: "Specialist care for Porsche performance, maintenance and repair in our Al Quoz workshop." })
              ] })
            ] }),
            isLamborghini && /* @__PURE__ */ jsxs("figure", { className: "max-w-xl mx-auto mt-6 sm:mt-8 rounded-2xl overflow-hidden border border-white/10 bg-black/40 flex", children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: lamborghiniUrusWorkshop,
                  alt: "Lamborghini Urus receiving specialist service on a lift at Digi-Tec Performance Centre in Dubai",
                  className: "w-28 sm:w-36 h-36 sm:h-40 object-cover",
                  loading: "lazy"
                }
              ),
              /* @__PURE__ */ jsxs("figcaption", { className: "p-4 sm:p-5 flex flex-col justify-center", children: [
                /* @__PURE__ */ jsx("span", { className: "text-burnt-orange text-xs font-bold uppercase tracking-widest mb-1", children: "Lamborghini workshop" }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-300 text-sm leading-relaxed", children: "Specialist Urus maintenance, diagnostics and repair in our Al Quoz workshop." })
              ] })
            ] }),
            isMercedesServiceHub && !isArabic && /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8", children: [
              /* @__PURE__ */ jsxs("figure", { className: "card-premium rounded-2xl overflow-hidden", children: [
                /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: mercedesAmgEngine,
                    alt: "Mercedes-AMG engine inspected at Digi-Tec Performance Centre in Al Quoz, Dubai",
                    className: "w-full aspect-[16/9] object-cover",
                    loading: "lazy",
                    width: "1086",
                    height: "1448"
                  }
                ),
                /* @__PURE__ */ jsxs("figcaption", { className: "p-5", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-burnt-orange text-xs font-bold uppercase tracking-widest", children: "Inside our Mercedes workshop" }),
                  /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-off-white mt-2", children: "Model-aware mechanical inspection" }),
                  /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm leading-relaxed mt-2", children: "A real Mercedes-AMG engine in the Digi-Tec workshop. Diagnostics, fluid specifications and repair planning are matched to the fitted powertrain—not just the badge." })
                ] })
              ] }),
              /* @__PURE__ */ jsxs(LocalizedLink, { to: "/blog/g63-to-brabus-g800-conversion-dubai", className: "card-premium group rounded-2xl overflow-hidden", children: [
                /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: g63BrabusFinishedFront,
                    alt: "Finished Mercedes-AMG G63 G 800-style conversion at Digi-Tec Dubai",
                    className: "w-full aspect-[16/9] object-cover object-center group-hover:scale-105 transition-transform duration-500",
                    loading: "lazy",
                    width: "1344",
                    height: "1792"
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "p-5", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-burnt-orange text-xs font-bold uppercase tracking-widest", children: "Recent Mercedes case study" }),
                  /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-off-white mt-2 group-hover:text-burnt-orange transition-colors", children: "Mercedes-AMG G63 to G 800-style conversion" }),
                  /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm leading-relaxed mt-2", children: "See the actual strip-down, body preparation, fitment and completed G-Class project from the Digi-Tec workshop." }),
                  /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 text-burnt-orange text-sm font-semibold mt-4", children: [
                    "View the G63 project ",
                    /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
                  ] })
                ] })
              ] })
            ] }),
            models.length > 0 && (!isMercedesServiceHub || isArabic) && /* @__PURE__ */ jsxs("div", { className: "mt-6 sm:mt-8 card-premium rounded-2xl p-5 sm:p-6", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-off-white mb-3", children: isArabic ? `طرازات ${brand.name} التي نخدمها` : `${brand.name} models we work with` }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm leading-relaxed", children: models.join(" • ") })
            ] }),
            !isArabic && ((_a = priorityBrandSeo == null ? void 0 : priorityBrandSeo.supportingImages) == null ? void 0 : _a.map((image) => /* @__PURE__ */ jsxs("figure", { className: "max-w-3xl mx-auto mt-6 sm:mt-8 card-premium rounded-2xl overflow-hidden grid sm:grid-cols-[0.8fr_1.2fr]", children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: image.src,
                  alt: image.alt,
                  loading: "lazy",
                  width: image.width,
                  height: image.height,
                  className: "w-full h-72 sm:h-full object-cover"
                }
              ),
              /* @__PURE__ */ jsxs("figcaption", { className: "p-5 sm:p-7 flex flex-col justify-center", children: [
                /* @__PURE__ */ jsxs("span", { className: "text-burnt-orange text-xs font-bold uppercase tracking-widest", children: [
                  "Inside our ",
                  brand.name,
                  " workshop"
                ] }),
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-off-white mt-2", children: "Vehicle-specific inspection in Dubai" }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm leading-relaxed mt-3", children: image.caption })
              ] })
            ] }, image.src)))
          ] }) }),
          isMercedesServiceHub && !isArabic && /* @__PURE__ */ jsx("section", { id: "mercedes-problems", className: "brand-section brand-section--issues scroll-mt-[10rem] py-12 sm:py-20 bg-black border-t border-white/5", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "brand-section-heading text-center mb-8 sm:mb-12", children: [
              /* @__PURE__ */ jsxs("h2", { className: "text-2xl sm:text-4xl lg:text-5xl font-black mb-3", children: [
                "Common ",
                /* @__PURE__ */ jsx("span", { className: "text-burnt-orange", children: "Mercedes Problems" }),
                " We Diagnose in Dubai"
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-400 max-w-3xl mx-auto text-sm sm:text-base", children: "A warning message or symptom is a starting point, not a final diagnosis. These are common reasons Mercedes owners contact our Al Quoz workshop and the focused page for each concern." })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "brand-issues-grid grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6", children: MERCEDES_COMMON_ISSUES.map((issue) => /* @__PURE__ */ jsxs(LocalizedLink, { to: issue.path, className: "card-premium group rounded-2xl p-5 sm:p-6", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-off-white group-hover:text-burnt-orange transition-colors", children: issue.title }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm leading-relaxed mt-3", children: issue.description }),
              /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 text-burnt-orange text-sm font-semibold mt-4", children: [
                issue.label,
                " ",
                /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
              ] })
            ] }, issue.title)) }),
            /* @__PURE__ */ jsx("div", { className: "mt-8 text-center", children: /* @__PURE__ */ jsxs(LocalizedLink, { to: MERCEDES_PROBLEMS_PATH, className: "inline-flex items-center gap-2 text-sm font-semibold text-burnt-orange hover:text-off-white", children: [
              "Browse all Mercedes diagnostic guides ",
              /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
            ] }) })
          ] }) }),
          (isRangeRoverServiceHub || isDefenderServiceHub) && !isArabic && /* @__PURE__ */ jsx("section", { className: "brand-section brand-section--issues py-12 sm:py-20 bg-black border-t border-white/5", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "brand-section-heading text-center mb-8 sm:mb-12", children: [
              /* @__PURE__ */ jsxs("h2", { className: "text-2xl sm:text-4xl lg:text-5xl font-black mb-3", children: [
                "Common ",
                /* @__PURE__ */ jsxs("span", { className: "text-burnt-orange", children: [
                  isRangeRoverServiceHub ? "Range Rover" : "Defender",
                  " Problems"
                ] }),
                " We Diagnose in Dubai"
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-400 max-w-3xl mx-auto text-sm sm:text-base", children: "The warning message or symptom is a starting point, not a diagnosis. These are the concerns owners commonly bring to our Al Quoz workshop and the specialist service area for each one." })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "brand-issues-grid grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6", children: (isRangeRoverServiceHub ? RANGE_ROVER_COMMON_ISSUES : DEFENDER_COMMON_ISSUES).map((issue) => /* @__PURE__ */ jsxs(LocalizedLink, { to: getServicePath(issue.path), className: "card-premium group rounded-2xl p-5 sm:p-6", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-off-white group-hover:text-burnt-orange transition-colors", children: issue.title }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm leading-relaxed mt-3", children: issue.description }),
              /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 text-burnt-orange text-sm font-semibold mt-4", children: [
                issue.label,
                " ",
                /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
              ] })
            ] }, issue.title)) })
          ] }) }),
          (isRangeRoverServiceHub || isDefenderServiceHub) && !isArabic && /* @__PURE__ */ jsx("section", { className: "brand-section brand-section--models py-12 sm:py-20 bg-gradient-to-br from-charcoal/40 to-black border-t border-white/5", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "brand-section-heading text-center mb-8 sm:mb-12", children: [
              /* @__PURE__ */ jsxs("h2", { className: "text-2xl sm:text-4xl lg:text-5xl font-black mb-3", children: [
                isRangeRoverServiceHub ? "Range Rover" : "Defender",
                " Models We ",
                /* @__PURE__ */ jsx("span", { className: "text-burnt-orange", children: "Repair & Service" }),
                " in Dubai"
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-400 max-w-3xl mx-auto text-sm sm:text-base", children: "The exact procedure, fluid specification, diagnostic function and repair scope are confirmed from the model, year, VIN, fitted systems and reported concern." })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "brand-models-grid grid md:grid-cols-2 gap-4 sm:gap-6", children: (isRangeRoverServiceHub ? RANGE_ROVER_MODEL_GROUPS : DEFENDER_MODEL_GROUPS).map((group) => /* @__PURE__ */ jsxs("article", { className: "card-premium rounded-2xl p-5 sm:p-6", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg sm:text-xl font-bold text-off-white", children: group.title }),
              /* @__PURE__ */ jsx("p", { className: "text-burnt-orange text-sm font-semibold mt-2", children: group.models }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm leading-relaxed mt-3", children: group.description }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-x-4 gap-y-2 mt-4", children: [
                /* @__PURE__ */ jsxs(LocalizedLink, { to: getServicePath("engine-diagnostics"), className: "inline-flex items-center gap-1 text-burnt-orange text-sm font-semibold hover:text-off-white transition-colors", children: [
                  "Diagnostics ",
                  /* @__PURE__ */ jsx(ArrowRight, { className: "w-3.5 h-3.5" })
                ] }),
                /* @__PURE__ */ jsxs(LocalizedLink, { to: getServicePath("suspension-repair"), className: "inline-flex items-center gap-1 text-burnt-orange text-sm font-semibold hover:text-off-white transition-colors", children: [
                  "Suspension repair ",
                  /* @__PURE__ */ jsx(ArrowRight, { className: "w-3.5 h-3.5" })
                ] }),
                /* @__PURE__ */ jsxs(LocalizedLink, { to: getServicePath("mechanical-repair"), className: "inline-flex items-center gap-1 text-burnt-orange text-sm font-semibold hover:text-off-white transition-colors", children: [
                  "Mechanical repair ",
                  /* @__PURE__ */ jsx(ArrowRight, { className: "w-3.5 h-3.5" })
                ] })
              ] })
            ] }, group.title)) }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm leading-relaxed max-w-4xl mx-auto mt-8 text-center", children: isRangeRoverServiceHub ? /* @__PURE__ */ jsxs(Fragment, { children: [
              "For Defender-specific repair and off-road systems, see our dedicated ",
              /* @__PURE__ */ jsx(LocalizedLink, { to: "/brands/defender-service-dubai", className: "text-burnt-orange font-semibold hover:text-off-white", children: "Defender service and repair page" }),
              "."
            ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              "For Range Rover, Range Rover Sport, Velar and Evoque service, see our dedicated ",
              /* @__PURE__ */ jsx(LocalizedLink, { to: "/brands/range-rover-service-dubai", className: "text-burnt-orange font-semibold hover:text-off-white", children: "Range Rover service and repair page" }),
              "."
            ] }) })
          ] }) }),
          isMercedesServiceHub && !isArabic && /* @__PURE__ */ jsx("section", { id: "mercedes-models", className: "brand-section brand-section--models scroll-mt-[10rem] py-12 sm:py-20 bg-gradient-to-br from-charcoal/40 to-black border-t border-white/5", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "brand-section-heading text-center mb-8 sm:mb-12", children: [
              /* @__PURE__ */ jsxs("h2", { className: "text-2xl sm:text-4xl lg:text-5xl font-black mb-3", children: [
                "Mercedes Models We ",
                /* @__PURE__ */ jsx("span", { className: "text-burnt-orange", children: "Repair & Service" }),
                " in Dubai"
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-400 max-w-3xl mx-auto text-sm sm:text-base", children: "Digi-Tec supports current and earlier Mercedes-Benz platforms. The exact diagnostic procedure, parts specification and workshop scope are confirmed from the model, year, VIN and fitted systems." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "brand-models-grid grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6", children: [
              /* @__PURE__ */ jsx("nav", { "aria-label": "Dedicated Mercedes model pages", className: "md:col-span-2 lg:col-span-3", children: /* @__PURE__ */ jsx("ul", { className: "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5", children: mercedesModelPages.map((model) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(LocalizedLink, { to: model.path, className: "group flex h-full items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/[0.025] px-4 py-3 text-sm font-semibold text-white/70 hover:border-burnt-orange/40 hover:text-burnt-orange", children: [
                /* @__PURE__ */ jsx("span", { children: model.shortName }),
                /* @__PURE__ */ jsx(ArrowRight, { className: "h-3.5 w-3.5 shrink-0" })
              ] }) }, model.path)) }) }),
              MERCEDES_MODEL_GROUPS.map((group) => /* @__PURE__ */ jsxs("article", { className: "card-premium rounded-2xl p-5 sm:p-6", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-lg sm:text-xl font-bold text-off-white", children: group.title }),
                /* @__PURE__ */ jsx("p", { className: "text-burnt-orange text-sm font-semibold mt-2", children: group.models }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm leading-relaxed mt-3", children: group.description }),
                /* @__PURE__ */ jsx("ul", { className: "flex flex-wrap gap-x-4 gap-y-2 mt-4", "aria-label": `${group.title} related services`, children: group.links.map((link) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(LocalizedLink, { to: link.path, className: "inline-flex items-center gap-1 text-burnt-orange text-sm font-semibold hover:text-off-white transition-colors", children: [
                  link.label,
                  " ",
                  /* @__PURE__ */ jsx(ArrowRight, { className: "w-3.5 h-3.5" })
                ] }) }, link.label)) })
              ] }, group.title))
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-gray-400 text-sm leading-relaxed max-w-4xl mx-auto mt-8 text-center", children: [
              "Mercedes-Maybach owners can view our dedicated ",
              /* @__PURE__ */ jsx(LocalizedLink, { to: "/brands/maybach-service-dubai", className: "text-burnt-orange font-semibold hover:text-off-white", children: "Maybach repair and service page" }),
              ". For an unlisted Mercedes model or earlier chassis, send the VIN and concern by WhatsApp so coverage can be confirmed before the visit."
            ] })
          ] }) }),
          !isEnglishBmwHub && !isEnglishAudiHub && !isEnglishBentleyHub && !isEnglishAstonHub && !isEnglishMclarenHub && !isEnglishLamborghiniHub && !isEnglishRollsRoyceHub && !isEnglishRoxHub && /* @__PURE__ */ jsx("section", { className: "brand-section brand-section--reasons py-12 sm:py-20 bg-gradient-to-br from-charcoal/40 to-black", children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto px-4 sm:px-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "brand-section-heading text-center mb-8 sm:mb-12", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-4xl lg:text-5xl font-black mb-3 sm:mb-4", children: isArabic ? /* @__PURE__ */ jsxs(Fragment, { children: [
                "لماذا يختار ملاك ",
                brand.name,
                " ",
                /* @__PURE__ */ jsx("span", { className: "text-burnt-orange", children: "D" }),
                "IGI-TEC؟"
              ] }) : isMercedesServiceHub ? /* @__PURE__ */ jsxs(Fragment, { children: [
                "Why Choose Digi-Tec as Your ",
                /* @__PURE__ */ jsx("span", { className: "text-burnt-orange", children: "Mercedes Workshop" }),
                " in Dubai?"
              ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                "Why ",
                brand.name,
                " Owners Choose ",
                /* @__PURE__ */ jsx("span", { className: "text-burnt-orange", children: "D" }),
                "igi-Tec"
              ] }) }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-400 max-w-2xl mx-auto text-sm sm:text-base", children: isArabic ? `خبرة فنية فعلية بأنظمة ${brand.name} وخدمة مصممة للسيارة، لا حلول عامة.` : isMercedesServiceHub ? "The right Mercedes specialist should be able to explain the diagnostic evidence, fitted systems, parts options and repair plan before asking you to approve the work." : `Real technical depth on the systems that define your ${brand.name}, not generic service copy.` })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "brand-reasons-grid grid sm:grid-cols-2 gap-4 sm:gap-5", children: brand.whyChoose.map((item) => /* @__PURE__ */ jsxs(
              "div",
              {
                className: "card-premium rounded-2xl p-5 sm:p-6 transition-colors",
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 mb-2", children: [
                    /* @__PURE__ */ jsx(CheckCircle2, { className: "w-5 h-5 sm:w-6 sm:h-6 text-burnt-orange flex-shrink-0 mt-1" }),
                    /* @__PURE__ */ jsx("h3", { className: "text-base sm:text-lg font-bold text-off-white", children: item.title })
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm sm:text-base leading-relaxed pl-8", children: item.description })
                ]
              },
              item.title
            )) })
          ] }) }),
          brandServices.length > 0 && !isEnglishBmwHub && !isEnglishAudiHub && !isEnglishBentleyHub && !isEnglishAstonHub && !isEnglishMclarenHub && !isEnglishLamborghiniHub && !isEnglishRollsRoyceHub && !isEnglishRoxHub && /* @__PURE__ */ jsx("section", { className: "brand-section brand-section--directory py-12 sm:py-20 bg-black border-t border-white/5", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "brand-section-heading text-center mb-8 sm:mb-12", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-4xl lg:text-5xl font-black mb-3", children: isArabic ? /* @__PURE__ */ jsxs(Fragment, { children: [
                brand.name,
                " ",
                /* @__PURE__ */ jsx("span", { className: "text-burnt-orange", children: "للإصلاح في دبي" }),
                " — جميع الخدمات"
              ] }) : isMercedesServiceHub ? /* @__PURE__ */ jsxs(Fragment, { children: [
                "Mercedes ",
                /* @__PURE__ */ jsx("span", { className: "text-burnt-orange", children: "Repair Services" }),
                " in Dubai"
              ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                brand.name,
                " ",
                /* @__PURE__ */ jsx("span", { className: "text-burnt-orange", children: "Repair Dubai" }),
                " — Every Service"
              ] }) }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-400 max-w-2xl mx-auto text-sm sm:text-base", children: isArabic ? `اختر صفحة إصلاح ${brand.name} أو تغيير الزيت أو إصلاح الفرامل لمراجعة المعلومات العامة، ثم تواصل معنا لتأكيد نطاق الخدمة المتاح لسيارتك.` : isMercedesServiceHub ? "Choose the service that matches your concern to review warning signs, inspection steps, quote inputs and booking options." : `Choose a ${brand.name} repair, oil-change or brake page for general guidance, then contact the workshop to confirm the available scope for your exact vehicle.` })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "brand-directory-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4", children: brandServices.map((s) => /* @__PURE__ */ jsxs(
              LocalizedLink,
              {
                to: getServicePath(s.serviceSlug),
                className: "card-premium group flex flex-col justify-between rounded-2xl p-4 sm:p-5 transition-all duration-300 min-h-[110px]",
                children: [
                  /* @__PURE__ */ jsxs("span", { className: "text-off-white font-bold text-sm sm:text-base leading-tight group-hover:text-burnt-orange", children: [
                    brand.name,
                    " ",
                    isArabic ? arBrandServiceNames[s.serviceSlug] ?? s.label : s.label
                  ] }),
                  /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 text-burnt-orange text-xs font-semibold mt-3", children: [
                    isArabic ? "اعرف المزيد" : "Learn more",
                    " ",
                    /* @__PURE__ */ jsx(ArrowRight, { className: `w-3.5 h-3.5 ${isArabic ? "rotate-180" : ""}` })
                  ] })
                ]
              },
              s.serviceSlug
            )) }),
            /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto mt-10 sm:mt-14 space-y-6 sm:space-y-8", children: isMercedesServiceHub && !isArabic ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xl sm:text-2xl font-bold text-off-white mb-2", children: "Mercedes Service A vs Service B" }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm sm:text-base leading-relaxed", children: "Mercedes Service A is generally the smaller scheduled visit, while Service B adds a wider set of inspections and maintenance items. The correct scope depends on the model, model year, mileage, ASSYST display and available service history. We confirm those details before quoting instead of applying the same checklist to every Mercedes." })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xl sm:text-2xl font-bold text-off-white mb-2", children: "How a Mercedes Repair Is Diagnosed" }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm sm:text-base leading-relaxed", children: "The process starts with the symptom and warning message, followed by XENTRY scan data, a physical inspection and a road test when appropriate. We then explain the likely cause, further tests if needed, parts options and estimated scope. A stored fault code is evidence, but it is not treated as proof that the named component must be replaced." })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xl sm:text-2xl font-bold text-off-white mb-2", children: "Mercedes Parts and Fluid Specifications" }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm sm:text-base leading-relaxed", children: "The estimate identifies the proposed genuine Mercedes-Benz, OE-supplier or customer-approved alternative parts and the fluid specification required by the vehicle. Approval comes before fitting, and post-repair checks are matched to the system repaired." })
              ] })
            ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xl sm:text-2xl font-bold text-off-white mb-2", children: isArabic ? `إصلاح ${brand.name} في دبي` : `${brand.name} Repair Dubai` }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm sm:text-base leading-relaxed", children: isArabic ? `يمكن أن يشمل الفحص مشكلات المحرك وناقل الحركة والتعليق والفرامل والتبريد والأنظمة الكهربائية. يُؤكد نطاق الإصلاح المتاح بعد مراجعة السيارة والمشكلة.` : `Inspection and repair planning can cover engine, transmission, suspension, brake, cooling and electrical concerns. The available repair scope is confirmed after the vehicle and concern are reviewed.` })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xl sm:text-2xl font-bold text-off-white mb-2", children: isArabic ? `تغيير زيت ${brand.name} في دبي` : `${brand.name} Oil Change Dubai` }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm sm:text-base leading-relaxed", children: isArabic ? `يتم تأكيد مواصفة الزيت والفلتر حسب طراز ${brand.name} والمحرك. وقد يشمل نطاق الخدمة المتفق عليه فحوصاً إضافية وإعادة ضبط المؤشر عند الحاجة.` : `The oil and filter specification is confirmed for the exact ${brand.name} model and engine. The agreed service scope may include additional checks and a service-indicator reset where applicable.` })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xl sm:text-2xl font-bold text-off-white mb-2", children: isArabic ? `إصلاح فرامل ${brand.name} في دبي` : `${brand.name} Brake Repair Dubai` }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm sm:text-base leading-relaxed", children: isArabic ? `يمكن أن يشمل الفحص الفحمات والأقراص والحساسات والكليبرات والنظام الهيدروليكي. تعتمد القطع والإجراءات المقترحة على نظام الفرامل المركب في السيارة.` : `Inspection can cover pads, discs, sensors, calipers and the hydraulic system. Proposed parts and procedures depend on the brake system fitted to the exact vehicle.` })
              ] })
            ] }) })
          ] }) }),
          isMercedesServiceHub && /* @__PURE__ */ jsx(MercedesMaintenanceScope, { isArabic }),
          isMercedesServiceHub && isArabic && /* @__PURE__ */ jsx("section", { className: "border-t border-white/5 bg-black py-10 sm:py-14", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl px-4 sm:px-6", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black sm:text-3xl", children: "التخطيط لصيانة طرازات مرسيدس" }),
            /* @__PURE__ */ jsx("p", { className: "mt-3 max-w-3xl text-sm leading-7 text-white/65", children: "تختلف أعمال الفحص والصيانة حسب الجيل والمحرك والتجهيزات. أرسل الطراز وسنة الصنع والأعراض لتأكيد الفحص المناسب؛ وقد يُطلب رقم الهيكل لاحقاً لتحديد القطع." }),
            /* @__PURE__ */ jsx("ul", { className: "mt-6 grid gap-3 sm:grid-cols-2", children: [
              { label: "C-Class: ‏C200 وC240 وC300", path: "/blog/mercedes-c-class-service-dubai-guide" },
              { label: "E-Class: ‏E200 وE300 وE350", path: "/blog/mercedes-e-class-service-dubai-guide" },
              { label: "S-Class: التعليق والراحة والتجهيزات", path: "/blog/mercedes-s-class-service-dubai-guide" },
              { label: "Mercedes-AMG G63: المحرك والناقل ونظام الدفع", path: "/blog/mercedes-g63-service-dubai-guide" }
            ].map((model) => /* @__PURE__ */ jsx("li", { className: "card-premium rounded-xl px-5 py-4 text-sm font-semibold text-white/80", children: model.label }, model.path)) }),
            /* @__PURE__ */ jsx(LocalizedLink, { to: "/blog/mercedes-benz-maintenance-guide-dubai", className: "mt-5 inline-flex min-h-11 items-center text-sm font-semibold text-burnt-orange underline", children: "دليل صيانة مرسيدس بالعربية" })
          ] }) }),
          isMaybach && !isArabic && /* @__PURE__ */ jsx("section", { className: "border-t border-white/5 py-10", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl px-4 sm:px-6", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold", children: "Mercedes-Maybach S-Class and GLS service planning" }),
            /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm leading-7 text-white/65", children: "A Maybach S-Class or GLS enquiry needs the exact VIN, year and fitted comfort, cabin and chassis equipment. Describe whether the concern is a ride-height warning, a rear-cabin function, cooling or scheduled maintenance so the appropriate first inspection can be agreed." }),
            /* @__PURE__ */ jsxs("div", { className: "mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold", children: [
              /* @__PURE__ */ jsx(LocalizedLink, { to: "/blog/maybach-s580-service-dubai-guide", className: "text-burnt-orange hover:underline", children: "Maybach S580 owner guide" }),
              /* @__PURE__ */ jsx(LocalizedLink, { to: "/brands/maybach-service-dubai/suspension-repair", className: "text-burnt-orange hover:underline", children: "Maybach suspension assessment" }),
              /* @__PURE__ */ jsx(LocalizedLink, { to: "/brands/maybach-service-dubai/engine-diagnostics", className: "text-burnt-orange hover:underline", children: "Maybach diagnostics" })
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "mt-5 text-sm leading-7 text-white/65", children: [
              "For a standard Mercedes S-Class or GLS, use the ",
              /* @__PURE__ */ jsx(LocalizedLink, { to: "/blog/mercedes-s-class-service-dubai-guide", className: "text-burnt-orange hover:underline", children: "S-Class guide" }),
              " or ",
              /* @__PURE__ */ jsx(LocalizedLink, { to: "/brands/mercedes-benz-service-dubai", className: "text-burnt-orange hover:underline", children: "Mercedes service hub" }),
              ". Shared systems do not make the vehicle-specific service scope identical."
            ] })
          ] }) }),
          !isEnglishBmwHub && !isFerrari && !isEnglishAudiHub && !isEnglishBentleyHub && !isEnglishAstonHub && !isEnglishMclarenHub && !isEnglishLamborghiniHub && !isEnglishRollsRoyceHub && !isEnglishRoxHub && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("section", { className: "brand-section brand-section--proof py-12 sm:py-20 bg-black border-t border-white/5", children: /* @__PURE__ */ jsx("div", { className: "max-w-5xl mx-auto px-4 sm:px-6", children: /* @__PURE__ */ jsx("div", { className: "brand-proof-card card-premium text-center rounded-2xl p-6 sm:p-10", children: isMercedesServiceHub && !isArabic ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx("p", { className: "text-off-white font-bold text-xl sm:text-2xl mb-2", children: "A Mercedes Workshop Process You Can Check" }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm sm:text-base mb-8", children: "Bring your service history and the warning or symptom details. We explain the inspection findings, proposed parts and next steps before you approve the work." }),
              /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-3 gap-4 sm:gap-6 text-left", children: [
                /* @__PURE__ */ jsxs("div", { className: "bg-black/30 border border-white/10 rounded-xl p-4", children: [
                  /* @__PURE__ */ jsx(MapPin, { className: "w-5 h-5 text-burnt-orange mb-3" }),
                  /* @__PURE__ */ jsx("h3", { className: "text-off-white font-bold", children: "Al Quoz Industrial Area 3" }),
                  /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm mt-2", children: "Dubai, with a direct Google Maps route from this page." })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "bg-black/30 border border-white/10 rounded-xl p-4", children: [
                  /* @__PURE__ */ jsx(CheckCircle2, { className: "w-5 h-5 text-burnt-orange mb-3" }),
                  /* @__PURE__ */ jsx("h3", { className: "text-off-white font-bold", children: "Mercedes XENTRY Diagnostics" }),
                  /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm mt-2", children: "Mercedes diagnostic data is combined with physical checks and model-specific testing." })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "bg-black/30 border border-white/10 rounded-xl p-4", children: [
                  /* @__PURE__ */ jsx(CheckCircle2, { className: "w-5 h-5 text-burnt-orange mb-3" }),
                  /* @__PURE__ */ jsx("h3", { className: "text-off-white font-bold", children: "Inspect, explain, approve" }),
                  /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm mt-2", children: "The recommended repair, parts route and expected timing are explained before approved work starts." })
                ] })
              ] })
            ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx("p", { className: "text-off-white font-bold text-xl sm:text-2xl mb-2", children: isArabic ? `خدمة مستقلة لسيارات ${brand.name} في دبي` : `Independent ${brand.name} service in Dubai` }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm sm:text-base mb-8", children: isArabic ? "نخدم دبي منذ عام 2002 مع شرح الفحص والعمل المقترح قبل الموافقة." : "Serving Dubai since 2002 with inspection findings and proposed work explained before approval." }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("div", { className: "text-2xl sm:text-4xl font-black text-burnt-orange", children: "2002" }),
                  /* @__PURE__ */ jsx("div", { className: "text-xs sm:text-sm text-gray-400 mt-1", children: isArabic ? "سنة التأسيس" : "Established" })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("div", { className: "text-2xl sm:text-4xl font-black text-burnt-orange", children: "Al Quoz" }),
                  /* @__PURE__ */ jsx("div", { className: "text-xs sm:text-sm text-gray-400 mt-1", children: isArabic ? "ورشة دبي" : "Dubai Workshop" })
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("div", { className: "text-2xl sm:text-4xl font-black text-burnt-orange", children: "40,000" }),
                  /* @__PURE__ */ jsx("div", { className: "text-xs sm:text-sm text-gray-400 mt-1", children: isArabic ? "قدم مربع مساحة المنشأة" : "Sq ft facility" })
                ] })
              ] })
            ] }) }) }) }),
            /* @__PURE__ */ jsx("section", { className: "brand-section brand-section--story py-12 sm:py-20 bg-black border-t border-white/5", children: /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto px-4 sm:px-6", children: /* @__PURE__ */ jsxs("article", { className: "brand-story space-y-8 sm:space-y-10", children: [
              /* @__PURE__ */ jsxs("header", { children: [
                /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 leading-tight", children: isArabic ? /* @__PURE__ */ jsxs(Fragment, { children: [
                  "خدمة مستقلة لسيارات ",
                  /* @__PURE__ */ jsx("span", { className: "text-burnt-orange", children: brand.name }),
                  " في دبي"
                ] }) : isMercedesServiceHub ? /* @__PURE__ */ jsxs(Fragment, { children: [
                  "Independent ",
                  /* @__PURE__ */ jsx("span", { className: "text-burnt-orange", children: "Mercedes-Benz Workshop" }),
                  " in Dubai"
                ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                  "Independent ",
                  /* @__PURE__ */ jsx("span", { className: "text-burnt-orange", children: brand.name }),
                  " Service in Dubai"
                ] }) }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-300 text-base sm:text-lg leading-relaxed", children: seoCopy.intro })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xl sm:text-2xl font-bold text-off-white mb-3", children: isArabic ? "خدمة تناسب ظروف القيادة في دبي" : "Built for Dubai Driving Conditions" }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-300 text-sm sm:text-base leading-relaxed", children: seoCopy.dubai })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xl sm:text-2xl font-bold text-off-white mb-3", children: isArabic ? `نطاق فحص وخدمة سيارات ${brand.name}` : `${brand.name} Inspection and Service Scope` }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-300 text-sm sm:text-base leading-relaxed", children: seoCopy.expertise })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xl sm:text-2xl font-bold text-off-white mb-3", children: isArabic ? "خيارات واضحة للقطع والسوائل" : "Clear Parts and Fluid Options" }),
                /* @__PURE__ */ jsx("p", { className: "text-gray-300 text-sm sm:text-base leading-relaxed", children: seoCopy.parts })
              ] }),
              /* @__PURE__ */ jsx("div", { className: `${isArabic ? "border-r-2 pr-5 sm:pr-6" : "border-l-2 pl-5 sm:pl-6"} border-burnt-orange`, children: /* @__PURE__ */ jsx("p", { className: "text-gray-200 text-sm sm:text-base leading-relaxed", children: seoCopy.cta }) })
            ] }) }) })
          ] }),
          /* @__PURE__ */ jsx("section", { id: isMercedesServiceHub && !isArabic ? "mercedes-faqs" : void 0, className: `brand-section brand-section--faq ${isMercedesServiceHub && !isArabic ? "scroll-mt-[10rem]" : "scroll-mt-24"} py-12 sm:py-20 bg-gradient-to-br from-charcoal/40 to-black border-t border-white/5`, children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto px-4 sm:px-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "brand-section-heading text-center mb-8 sm:mb-12", children: [
              /* @__PURE__ */ jsxs("h2", { className: "text-2xl sm:text-4xl lg:text-5xl font-black mb-3 sm:mb-4", children: [
                brand.name,
                " ",
                /* @__PURE__ */ jsx("span", { className: "text-burnt-orange", children: isArabic ? "الأسئلة الشائعة" : "FAQs" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm sm:text-base", children: isArabic ? `أكثر الأسئلة التي يطرحها ملاك ${brand.name}.` : `The questions ${brand.name} owners ask us most.` })
            ] }),
            /* @__PURE__ */ jsx(Accordion, { type: "single", collapsible: true, className: "brand-faq space-y-3", children: brand.faqs.map((f, i) => /* @__PURE__ */ jsxs(
              AccordionItem,
              {
                value: `q-${i}`,
                className: `bg-white/[0.03] border border-white/10 rounded-2xl px-5 sm:px-6 data-[state=open]:border-burnt-orange/40 ${isEnglishBmwHub || isEnglishAudiHub || isEnglishBentleyHub || isEnglishAstonHub || isEnglishMclarenHub || isEnglishLamborghiniHub || isEnglishRollsRoyceHub || isEnglishRoxHub || ["jetour-service-dubai", "rox-service-dubai"].includes(brand.slug) ? "[&>[role=region][data-state=closed]]:hidden" : ""}`,
                children: [
                  /* @__PURE__ */ jsx(AccordionTrigger, { className: `${isArabic ? "text-right" : "text-left"} text-off-white font-semibold text-base sm:text-lg hover:no-underline py-5`, children: f.q }),
                  /* @__PURE__ */ jsx(AccordionContent, { forceMount: true, className: "text-gray-300 text-sm sm:text-base leading-relaxed pb-5", children: f.a })
                ]
              },
              i
            )) })
          ] }) }),
          !isArabic && (brand.slug === "cadillac-service-dubai" || brand.slug === "mercedes-benz-service-dubai") && /* @__PURE__ */ jsx("section", { className: "border-t border-white/10 py-12 sm:py-16", "aria-labelledby": "brand-electronics-title", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl px-5 sm:px-8", children: [
            /* @__PURE__ */ jsx("h2", { id: "brand-electronics-title", className: "text-2xl font-semibold sm:text-3xl", children: brand.slug === "cadillac-service-dubai" ? "Cadillac CUE touchscreen concerns" : "Mercedes infotainment repair and audio upgrades" }),
            /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-3xl text-base leading-8 text-gray-300", children: brand.slug === "cadillac-service-dubai" ? "For an unresponsive touchscreen, ghost touches or a damaged display, explore the CUE repair process. Model year, fitted system and diagnosis determine the appropriate screen repair or replacement." : "A head-unit fault and a planned sound-system upgrade need different assessments. Describe the symptom or the improvement you want so we can confirm compatible equipment and the right scope." }),
            /* @__PURE__ */ jsx("div", { className: "mt-6 flex flex-wrap gap-x-8 gap-y-4", children: brand.slug === "cadillac-service-dubai" ? /* @__PURE__ */ jsx(LocalizedLink, { to: "/services/cadillac-cue-screen-repair-dubai", className: "text-burnt-orange underline", children: "Cadillac CUE screen repair and replacement" }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(LocalizedLink, { to: "/services/head-unit-repair-dubai", className: "text-burnt-orange underline", children: "Head-unit and COMAND repair" }),
              /* @__PURE__ */ jsx(LocalizedLink, { to: "/services/mercedes-audio-upgrade-dubai", className: "text-burnt-orange underline", children: "Mercedes stereo and audio upgrades" })
            ] }) })
          ] }) }),
          !isArabic && brand.slug === "volkswagen-service-dubai" && /* @__PURE__ */ jsx("section", { className: "border-t border-white/10 py-12 sm:py-16", "aria-labelledby": "volkswagen-next-steps-title", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl px-5 sm:px-8", children: [
            /* @__PURE__ */ jsx("h2", { id: "volkswagen-next-steps-title", className: "text-2xl font-semibold sm:text-3xl", children: "Volkswagen DSG and warning-light next steps" }),
            /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-3xl text-base leading-8 text-gray-300", children: "A DSG service request differs from a gearbox warning or jerking complaint. The fitted gearbox code and findings determine the fluid procedure or repair path. An EPC light or another warning calls for diagnostic assessment before a component is chosen." }),
            /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-wrap gap-x-8 gap-y-4", children: [
              /* @__PURE__ */ jsx(LocalizedLink, { to: "/services/transmission-repair-dubai", className: "text-burnt-orange underline", children: "DSG and transmission assessment" }),
              /* @__PURE__ */ jsx(LocalizedLink, { to: "/brands/volkswagen-service-dubai/engine-diagnostics", className: "text-burnt-orange underline", children: "ODIS-supported Volkswagen diagnostics" })
            ] })
          ] }) }),
          !isArabic && /* @__PURE__ */ jsx(BrandPaintCareLinks, { brandName: brand.name }),
          isMercedesServiceHub && !isArabic && /* @__PURE__ */ jsx("div", { id: "mercedes-reviews", className: "scroll-mt-[10rem]", children: /* @__PURE__ */ jsx(GoogleReviews, {}) }),
          /* @__PURE__ */ jsx("section", { id: isMercedesServiceHub && !isArabic ? "mercedes-booking" : void 0, className: `brand-section brand-section--booking ${isMercedesServiceHub && !isArabic ? "scroll-mt-[10rem]" : "scroll-mt-24"} py-12 sm:py-20 bg-black border-t border-white/5`, children: /* @__PURE__ */ jsx("div", { className: "max-w-5xl mx-auto px-4 sm:px-6", children: /* @__PURE__ */ jsxs("div", { className: "brand-booking-grid grid lg:grid-cols-2 gap-8 lg:gap-12 items-start", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 leading-tight", children: isArabic ? /* @__PURE__ */ jsxs(Fragment, { children: [
                "احجز خدمة ",
                /* @__PURE__ */ jsx("span", { className: "text-burnt-orange", children: brand.name })
              ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                "Book Your ",
                /* @__PURE__ */ jsx("span", { className: "text-burnt-orange", children: brand.name }),
                " Service"
              ] }) }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-300 text-base sm:text-lg leading-relaxed mb-6", children: serviceSprintBrand ? isArabic ? "أرسل الطراز وسنة الصنع والمسافة وسجل الصيانة والأعراض والموعد المفضل. يؤكد الفريق نطاق الفحص والتوفر بعد استلام رسالتك. قد يتطلب عرض سعر الإصلاح فحص السيارة؛ وتُوضح القطع والسوائل والأجرة قبل الموافقة على العمل." : "Send the model, year, mileage, service history, symptoms and preferred time. The team confirms the appropriate assessment and availability after receiving your message. A repair estimate may require inspection; proposed parts, fluids and labour are explained before you approve the work." : isArabic ? "أخبرنا عن سيارتك والخدمة المطلوبة، وسنتواصل معك عبر واتساب بعرض السعر وأقرب موعد متاح." : isEnglishAstonHub ? "Send your model, year, mileage and concern. The team will confirm the first assessment and appointment availability after receiving your message." : isEnglishRoxHub ? "Send the ROX 01 model year, mileage, warning or symptoms and preferred appointment time. The team will confirm the appropriate inspection and available workshop scope." : isEnglishAudiHub ? "Send the Audi model, year, mileage, warning or symptoms and preferred time. The team will confirm the appropriate assessment and available appointment. A repair estimate may require inspection." : isEnglishBentleyHub ? "Send the Bentley model, year, mileage, service history, warning or symptoms and preferred appointment time. The team will confirm the appropriate first assessment and available workshop scope. An accurate repair estimate may require inspection." : isEnglishMclarenHub ? "Send the McLaren model, year, mileage, warning or symptoms and preferred time. The team will confirm the appropriate assessment and available appointment. A repair estimate may require inspection." : isEnglishLamborghiniHub ? "Send the Lamborghini model, year, mileage, warning or symptoms and preferred time. The team will confirm the appropriate assessment and available workshop scope. An accurate repair estimate may require inspection." : isEnglishRollsRoyceHub ? "Send the Rolls-Royce model, year, mileage, service history, warning or symptoms and preferred time. The team will confirm the appropriate first assessment and appointment availability. An accurate repair estimate may require inspection." : isEnglishBmwHub ? "Send your BMW model, year, mileage, warning lights or symptoms, and preferred appointment time. The team will confirm the appropriate inspection and available booking options. For costs and timing, the scope may need to be established after inspection." : isFerrari ? "Send the Ferrari model, year, mileage, service history, warning message or symptoms, and preferred appointment time. The team will confirm the appropriate first inspection and available workshop scope." : isMercedesServiceHub ? "Tell us the Mercedes model, year, mileage, warning message and symptoms. We will reply on WhatsApp to confirm the appropriate first inspection and available booking options." : "Tell us about your car and the work you need. We will get back to you on WhatsApp with a quote and the earliest available slot." }),
              isEnglishBmwHub ? /* @__PURE__ */ jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsx(BmwBookingActions, {}) }) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-3 mb-6", children: [
                /* @__PURE__ */ jsxs(
                  "a",
                  {
                    href: whatsappHref,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "inline-flex items-center justify-center gap-2 bg-burnt-orange hover:bg-burnt-orange/90 text-black font-bold px-6 py-3 rounded-2xl transition-all duration-300 hover:scale-105 shadow-xl",
                    "data-cta-placement": "booking_section",
                    children: [
                      /* @__PURE__ */ jsx(MessageCircle, { className: "w-5 h-5" }),
                      isArabic ? "واتساب الآن" : isMercedesServiceHub ? "Book Mercedes Service" : `Request ${brand.name} Service`
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "a",
                  {
                    href: "tel:+97143402223",
                    className: "inline-flex items-center justify-center gap-2 bg-off-white text-black hover:bg-white font-bold px-6 py-3 rounded-2xl transition-all duration-300 shadow-xl",
                    "data-cta-placement": "booking_section",
                    children: [
                      /* @__PURE__ */ jsx(Phone, { className: "w-5 h-5" }),
                      isArabic && serviceSprintBrand ? /* @__PURE__ */ jsx("bdi", { dir: "ltr", children: "+971 4 340 2223" }) : "+971 4 340 2223"
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-sm", children: serviceSprintBrand ? isArabic ? "يجهز النموذج مسودة في واتساب. راجعها واضغط إرسال هناك ليتلقى الفريق طلبك؛ فتح المسودة لا يؤكد الحجز." : "The form prepares a WhatsApp draft. Review it and press Send in WhatsApp so the team receives your request. Opening the draft does not confirm an appointment." : isArabic ? "أو استخدم النموذج لإرسال تفاصيلك مباشرة." : "Or use the form to send your details directly." })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "card-premium rounded-2xl p-5 sm:p-8", children: /* @__PURE__ */ jsx(BrandBookingForm, { brandName: brand.name, issuePlaceholder: isEnglishAstonHub ? "Model, year, mileage, symptoms and preferred appointment" : isEnglishBmwHub ? "BMW model, year, mileage, warning lights or symptoms, and preferred appointment day/time" : isEnglishRoxHub ? "ROX 01 model year, mileage, warning or symptoms, and preferred appointment time" : isEnglishAudiHub ? "Audi model, year, mileage, warning lights or symptoms, and preferred appointment time" : isEnglishBentleyHub ? "Bentley model, year, mileage, service history, warning or symptoms, and preferred appointment time" : isFerrari ? "Ferrari model, year, mileage, service history, warning or symptoms, and preferred appointment time" : isEnglishMclarenHub ? "McLaren model, year, mileage, warning or symptoms, and preferred appointment time" : isEnglishLamborghiniHub ? "Lamborghini model, year, mileage, warning or symptoms, and preferred appointment time" : isEnglishRollsRoyceHub ? "Rolls-Royce model, year, mileage, service history, warning or symptoms, and preferred appointment time" : serviceSprintBrand && !isArabic ? "Model, year, mileage, service history, warning or symptoms, and preferred appointment time" : void 0 }) })
          ] }) }) }),
          relatedServices.length > 0 && !isMercedesServiceHub && /* @__PURE__ */ jsx("section", { className: "brand-section brand-section--related py-12 sm:py-20 bg-gradient-to-br from-charcoal/40 to-black border-t border-white/5", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "brand-section-heading text-center mb-8 sm:mb-12", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-4xl font-black mb-3", children: isArabic ? /* @__PURE__ */ jsxs(Fragment, { children: [
                "خدمات ",
                /* @__PURE__ */ jsx("span", { className: "text-burnt-orange", children: "ذات صلة" }),
                " بـ ",
                brand.name
              ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                "Related ",
                /* @__PURE__ */ jsx("span", { className: "text-burnt-orange", children: "Services" }),
                " for ",
                brand.name
              ] }) }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm sm:text-base", children: isArabic ? `أكثر الخدمات التي نقدمها لملاك ${brand.name}.` : `The specialist work we do most often for ${brand.name} owners.` })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "brand-related-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6", children: relatedServices.map((sourceService) => {
              const s = isArabic ? localizeServiceToArabic(sourceService) : sourceService;
              return /* @__PURE__ */ jsxs(
                LocalizedLink,
                {
                  to: `/services/${s.slug}`,
                  className: "card-premium group flex flex-col rounded-2xl overflow-hidden transition-all duration-300",
                  children: [
                    /* @__PURE__ */ jsx("div", { className: "aspect-[16/10] overflow-hidden bg-black", children: /* @__PURE__ */ jsx(
                      "img",
                      {
                        src: typeof s.image === "string" ? s.image : s.image,
                        alt: s.title,
                        loading: "lazy",
                        className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      }
                    ) }),
                    /* @__PURE__ */ jsxs("div", { className: "p-5 flex-1 flex flex-col", children: [
                      /* @__PURE__ */ jsx("h3", { className: "text-base sm:text-lg font-bold text-off-white mb-2 group-hover:text-burnt-orange transition-colors", children: s.title }),
                      /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm leading-relaxed mb-4 flex-1", children: s.description }),
                      /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 text-burnt-orange text-sm font-semibold", children: [
                        isArabic ? "اعرف المزيد" : "Learn more",
                        " ",
                        /* @__PURE__ */ jsx(ArrowRight, { className: `w-4 h-4 ${isArabic ? "rotate-180" : ""}` })
                      ] })
                    ] })
                  ]
                },
                s.slug
              );
            }) })
          ] }) }),
          !isMercedesServiceHub && /* @__PURE__ */ jsx("section", { className: "brand-section brand-section--other-brands py-12 sm:py-20 bg-black border-t border-white/5", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "brand-section-heading text-center mb-8 sm:mb-12", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-4xl font-black mb-3", children: isArabic ? /* @__PURE__ */ jsxs(Fragment, { children: [
                "علامات ",
                /* @__PURE__ */ jsx("span", { className: "text-burnt-orange", children: "أخرى" }),
                " نخدمها"
              ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                "Other ",
                /* @__PURE__ */ jsx("span", { className: "text-burnt-orange", children: "Brands" }),
                " We Service"
              ] }) }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm sm:text-base", children: isArabic ? "عناية متخصصة بمختلف علامات السيارات الفاخرة في ورشتنا." : "Specialist care for every prestige marque in our workshop." })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "brand-other-grid grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-5", children: otherBrands.map((b) => /* @__PURE__ */ jsxs(
              LocalizedLink,
              {
                to: `/brands/${b.slug}`,
                className: "group flex flex-col items-center gap-2 p-3 sm:p-4 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-burnt-orange/40 rounded-2xl transition-all duration-300",
                "aria-label": isArabic ? `خدمة ${b.name} في دبي` : `${b.name} service in Dubai`,
                children: [
                  /* @__PURE__ */ jsx("div", { className: "w-14 h-14 sm:w-16 sm:h-16 p-2 bg-white/90 rounded-full flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform duration-300", children: b.logo ? /* @__PURE__ */ jsx("img", { src: b.logo, alt: isArabic ? `شعار ${b.name}` : `${b.name} logo`, width: "64", height: "64", loading: "lazy", decoding: "async", className: "w-full h-full object-contain" }) : /* @__PURE__ */ jsx("span", { className: "text-xl font-black text-burnt-orange", children: b.name.charAt(0) }) }),
                  /* @__PURE__ */ jsx("span", { className: "text-[11px] sm:text-xs text-gray-300 group-hover:text-burnt-orange text-center font-medium leading-tight", children: b.name })
                ]
              },
              b.slug
            )) })
          ] }) })
        ] }),
        /* @__PURE__ */ jsx(Footer, {}),
        isPriorityLeadBrand && /* @__PURE__ */ jsx("aside", { className: "fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-black/95 p-3 shadow-2xl backdrop-blur md:hidden", "aria-label": isArabic && serviceSprintBrand ? `خيارات حجز صيانة ${serviceSprintBrand.arabicName}` : `${brand.name} booking options`, children: /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-lg grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxs("a", { href: whatsappHref, "data-cta-placement": "mobile_bar", target: "_blank", rel: "noopener noreferrer", className: "btn-primary justify-center px-3 py-3 text-sm", children: [
            /* @__PURE__ */ jsx(MessageCircle, { className: "h-5 w-5" }),
            " ",
            isArabic && serviceSprintBrand ? "واتساب" : "WhatsApp"
          ] }),
          /* @__PURE__ */ jsxs("a", { href: "tel:+97143402223", "data-cta-placement": "mobile_bar", className: "btn-secondary justify-center px-3 py-3 text-sm", children: [
            /* @__PURE__ */ jsx(Phone, { className: "h-5 w-5" }),
            " ",
            isArabic && serviceSprintBrand ? "اتصل بالورشة" : "Call Workshop"
          ] })
        ] }) })
      ]
    }
  );
};
const BrandPage$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: BrandPage
}, Symbol.toStringTag, { value: "Module" }));
export {
  AUDI_WHATSAPP_HREF as A,
  BMW_CORE_SERVICES as B,
  LAMBORGHINI_WHATSAPP_HREF as L,
  MCLAREN_WHATSAPP_HREF as M,
  ROLLS_ROYCE_WHATSAPP_HREF as R,
  BMW_ADDITIONAL_SERVICES as a,
  bmwServicePath as b,
  BMW_WHATSAPP_HREF as c,
  MCLAREN_SERVICES as d,
  MCLAREN_HUB_PATH as e,
  MCLAREN_SECONDARY_SERVICES as f,
  MCLAREN_MODEL_GROUPS as g,
  LAMBORGHINI_SERVICES as h,
  LAMBORGHINI_HUB_PATH as i,
  LAMBORGHINI_SECONDARY_SERVICES as j,
  ROLLS_ROYCE_SERVICES as k,
  ROLLS_ROYCE_HUB_PATH as l,
  ROLLS_ROYCE_SECONDARY_SERVICES as m,
  ROLLS_ROYCE_MODEL_GROUPS as n,
  AUDI_SERVICES as o,
  AUDI_HUB_PATH as p,
  AUDI_SECONDARY_SERVICES as q,
  BENTLEY_WHATSAPP_HREF as r,
  BENTLEY_SERVICES as s,
  BENTLEY_HUB_PATH as t,
  BENTLEY_SECONDARY_SERVICES as u,
  BENTLEY_MODEL_GROUPS as v,
  ROX_CORE_SERVICES as w,
  BrandPage$1 as x
};
