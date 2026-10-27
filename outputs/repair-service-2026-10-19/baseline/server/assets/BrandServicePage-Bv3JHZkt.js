import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import React__default from "react";
import { useParams, Navigate } from "react-router-dom";
import { L as LocalizedLink, u as useLocale, b7 as getBrandServiceCombo, a_ as getBrandBySlug, i as suspensionRepairImage, m as mercedesEngineWorkshop, S as SITE_URL, g as buildBreadcrumb, a as buildWebPage, b0 as buildBrand, h as buildService, c as buildFAQ, p as pageGraph, b4 as BRAND_PROFILES, d as useSeo, b8 as serviceEnquiryLabel, b3 as getServicesForBrand, aw as MERCEDES_PROBLEMS_PATH, b9 as FERRARI_MAINTENANCE_GUIDE_PATH } from "../entry-server.js";
import { Camera, ArrowRight, MessageCircle, Phone, CheckCircle2, ShieldCheck, Wrench } from "lucide-react";
import { H as Header, F as Footer } from "./Footer-D0Xl6ot8.js";
import { F as FinalCTA } from "./FinalCTA-DCkhXNCr.js";
import { A as Accordion, a as AccordionItem, b as AccordionTrigger, c as AccordionContent } from "./accordion-DINZxoib.js";
import { C as CtaAssurance } from "./TrustBar-D6jkMLGQ.js";
import { A as ASTON_SERVICES } from "./astonMartinHubContent-LMYRY7RB.js";
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
import "./Reveal-B0bzMO-v.js";
import "@radix-ui/react-accordion";
const cameraWhatsAppHref = `https://wa.me/97143402223?text=${encodeURIComponent(
  "Hello DIGI-TEC, I would like to discuss a Bentley reverse camera.\n\nModel and year: \nExisting camera or new installation: \nDisplay/system details: \nSymptoms or desired result: \nPreferred appointment: "
)}`;
const cameraFaqs = [
  {
    question: "Can a reverse camera work with my Bentley factory display?",
    answer: "Compatibility depends on the model year, fitted display, control units, connections and any previous modifications. The workshop checks the integration route, available camera options and parking functions before confirming an installation."
  },
  {
    question: "Does a blank camera image mean the camera needs replacing?",
    answer: "Not necessarily. Power supply, wiring, connectors, the interface, display or control system can also cause a missing or intermittent image. Testing determines whether the camera, a connection or another component needs attention."
  },
  {
    question: "Will parking sensors and guidance lines still work?",
    answer: "Existing parking sensors, screen switching and any guidance-line functions are reviewed before work is agreed. Their behaviour depends on the fitted equipment and proposed integration. Retained functions and any limitations are explained in the estimate and checked after the work."
  }
];
function BentleyCameraSection() {
  return /* @__PURE__ */ jsx("section", { id: "reverse-camera", "aria-labelledby": "bentley-camera-heading", className: "scroll-mt-28 border-t border-white/10 bg-gradient-to-br from-charcoal/40 to-black py-12 sm:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-5 sm:px-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "max-w-3xl", children: [
      /* @__PURE__ */ jsxs("p", { className: "eyebrow mb-4 inline-flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Camera, { className: "h-4 w-4", "aria-hidden": "true" }),
        " Parking visibility and integration"
      ] }),
      /* @__PURE__ */ jsx("h2", { id: "bentley-camera-heading", className: "text-3xl font-black leading-tight sm:text-5xl", children: "Bentley reverse-camera fault assessment in Dubai" }),
      /* @__PURE__ */ jsx("p", { className: "mt-5 text-base leading-8 text-gray-300", children: "A missing, flickering or distorted reversing image needs fault assessment before a camera is replaced. DIGI-TEC also handles separate installation enquiries at its Al Quoz workshop. For Continental GT, Flying Spur and Bentayga, we check the exact year, display and fitted equipment before confirming a repair or installation scope." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-8 grid gap-5 md:grid-cols-2", children: [
      /* @__PURE__ */ jsxs("article", { className: "card-premium rounded-2xl p-6 sm:p-8", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold", children: "Repairing a missing or intermittent image" }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-base leading-7 text-gray-300", children: "A black screen, flickering picture or failure to switch into camera view needs diagnosis. Camera power, wiring, connectors, the display and interface are checked as appropriate. Describe whether the fault is constant, appears after starting or changes when selecting reverse." })
      ] }),
      /* @__PURE__ */ jsxs("article", { className: "card-premium rounded-2xl p-6 sm:p-8", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold", children: "Adding a reverse camera" }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-base leading-7 text-gray-300", children: "Installation is a separate request from repairing a fitted camera. We review the display interface, camera mounting, wiring route and reverse-gear activation, along with parking functions you want to retain. Compatibility, parts and any supported setup procedures are agreed before installation." })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-8 grid gap-8 lg:grid-cols-[1.1fr_.9fr]", children: [
      /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-white/10 p-6 sm:p-8", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold", children: "What is checked before handover" }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-base leading-7 text-gray-300", children: "After the agreed work, the team checks image operation, reverse selection, screen switching and the parking functions included in the scope. Any required setup or calibration is identified for the fitted system before work is accepted." }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-base leading-7 text-gray-300", children: "The camera is a parking aid. Continue to use mirrors and direct observation, and check the surrounding area before moving." }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-col items-start gap-3 text-sm font-semibold", children: [
          /* @__PURE__ */ jsxs(LocalizedLink, { to: "/brands/bentley-service-dubai", className: "inline-flex items-center gap-2 text-burnt-orange hover:underline", children: [
            "Bentley service and maintenance ",
            /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4 shrink-0", "aria-hidden": "true" })
          ] }),
          /* @__PURE__ */ jsxs(LocalizedLink, { to: "/services/auto-electrical-repair-dubai", className: "inline-flex items-center gap-2 text-burnt-orange hover:underline", children: [
            "Electrical and wiring fault diagnosis ",
            /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4 shrink-0", "aria-hidden": "true" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("aside", { className: "rounded-2xl border border-burnt-orange/25 bg-burnt-orange/5 p-6 sm:p-8", "aria-label": "Bentley camera enquiry details", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold", children: "Request a camera assessment" }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-base leading-7 text-gray-300", children: "Send the model and year, a photo of the display, details of any existing camera or modifications, and the fault or result you want. The estimate depends on compatible parts, access, integration and any diagnostic work needed." }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-col gap-3", children: [
          /* @__PURE__ */ jsxs("a", { href: cameraWhatsAppHref, "data-cta-placement": "camera_scope", target: "_blank", rel: "noopener noreferrer", className: "btn-primary", children: [
            /* @__PURE__ */ jsx(MessageCircle, { className: "h-5 w-5 shrink-0", "aria-hidden": "true" }),
            " Discuss a Bentley camera"
          ] }),
          /* @__PURE__ */ jsxs("a", { href: "tel:+97143402223", "data-cta-placement": "camera_scope", className: "btn-secondary", children: [
            /* @__PURE__ */ jsx(Phone, { className: "h-5 w-5 shrink-0", "aria-hidden": "true" }),
            " Call the Al Quoz workshop"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-10 max-w-4xl", children: [
      /* @__PURE__ */ jsx("h3", { className: "mb-5 text-xl font-bold", children: "Bentley reverse-camera questions" }),
      /* @__PURE__ */ jsx("div", { className: "space-y-3", children: cameraFaqs.map(({ question, answer }) => /* @__PURE__ */ jsxs("details", { className: "rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 open:border-burnt-orange/40", children: [
        /* @__PURE__ */ jsx("summary", { className: "cursor-pointer text-base font-semibold leading-7 text-off-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-burnt-orange", children: question }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-base leading-7 text-gray-300", children: answer })
      ] }, question)) })
    ] })
  ] }) });
}
const arabicServiceContent = {
  "oil-change": {
    summary: "تحديد مواصفة الزيت والكمية والفلتر والبنود المستحقة من بيانات السيارة وسجل صيانتها.",
    symptoms: ["حلول موعد الخدمة أو ظهور تذكير الصيانة", "نقص مستوى الزيت أو وجود تسرب", "سجل صيانة غير مكتمل", "الحاجة إلى مراجعة الصيانة بعد فترة تخزين"],
    question: "هل يناسب الزيت نفسه جميع طرازات العلامة؟",
    answer: "لا. تعتمد المواصفة واللزوجة والكمية على المحرك والسنة ومعلومات السيارة. تتم مراجعة دليل المالك أو بيانات الخدمة قبل تحديد الزيت والفلتر وموعد الخدمة التالي."
  },
  "brake-repair": {
    summary: "فحص الضجيج والاهتزاز وتحذيرات الفرامل، مع تحديد نوع الأقراص والفحمات وحالتها قبل اقتراح العمل.",
    symptoms: ["ظهور تحذير الفرامل أو تآكل الفحمات", "صوت عند الفرملة", "اهتزاز أو تغير في إحساس الدواسة", "الحاجة إلى مراجعة حالة الأقراص أو سائل الفرامل"],
    question: "هل يثبت صوت الفرامل ضرورة تبديل الأقراص؟",
    answer: "الصوت وحده لا يحدد القطعة المتضررة. يعتمد القرار على فحص الفحمات والأقراص والمكونات المرتبطة وقياس الحالة وفق نوع نظام الفرامل المركب."
  },
  "transmission-repair": {
    summary: "تقييم تأخر التعشيق وتغير النقل والتسرب والتحذيرات حسب ناقل الحركة المركب وسجل الخدمة.",
    symptoms: ["تأخر التعشيق أو تغير جودة نقل السرعات", "ظهور تحذير ناقل الحركة", "تسرب سائل أو صوت قرب ناقل الحركة", "رجفة أو تردد أثناء التسارع"],
    question: "هل يحل تغيير الزيت كل مشاكل ناقل الحركة؟",
    answer: "لا. يجب ربط الأعراض وبيانات الأعطال بحالة الناقل والسائل قبل اقتراح خدمة أو إصلاح. تحدد وحدة ناقل الحركة الفعلية المواصفة والإجراء المناسبين."
  },
  "ac-repair": {
    summary: "فحص ضعف التبريد وتفاوت الهواء والتسرب، مع التأكد من نوع غاز التبريد المكتوب على السيارة.",
    symptoms: ["تبريد ضعيف أو هواء دافئ", "اختلاف التبريد بين فتحات الهواء أو مناطق المقصورة", "صوت من الضاغط أو المروحة", "رائحة أو تسرب مياه أو فقدان متكرر للتبريد"],
    question: "هل تكفي تعبئة غاز التبريد عند تكرر ضعف المكيف؟",
    answer: "قد تحتاج الحالة إلى فحص التسرب والضغوط وتدفق الهواء والمكونات. لا تعالج التعبئة وحدها مصدر تسرب، ويحدد ملصق السيارة نوع الغاز وكميته المطلوبة."
  },
  "suspension-repair": {
    summary: "تقييم تغير ارتفاع السيارة والضجيج والراحة والتآكل غير المنتظم للإطارات حسب نظام التعليق المركب.",
    symptoms: ["ميلان السيارة أو اختلاف ارتفاعها", "ظهور تحذير التعليق أو ارتفاع الركوب", "طرق أو ضجيج عند المطبات", "تغير الراحة أو تآكل غير منتظم للإطارات"],
    question: "هل انخفاض السيارة يثبت تعطل المساعد الهوائي؟",
    answer: "لا. قد يلزم فحص التسرب والخطوط والصمامات والحساسات والضاغط والمكونات الميكانيكية. لا يفترض وجود تعليق هوائي في كل طراز، وتحدد التجهيزات الاختبارات المناسبة."
  },
  "engine-diagnostics": {
    summary: "ربط رسائل التحذير وبيانات الأعطال بالفحص الفعلي لتحديد سبب المشكلة قبل اقتراح تبديل القطع.",
    symptoms: ["ظهور ضوء المحرك أو رسالة تحذير", "تقطيع أو اهتزاز أثناء التشغيل", "تراجع الاستجابة أو القدرة", "صعوبة تشغيل أو عطل متقطع"],
    question: "هل يحدد رمز العطل القطعة التي يجب تبديلها؟",
    answer: "ليس بالضرورة. قد يشير الرمز إلى حالة أو دائرة متأثرة ويحتاج إلى بيانات حية أو اختبارات كهربائية أو ميكانيكية. يتم تأكيد وظائف التشخيص المتاحة للسيارة قبل قبول العمل."
  },
  "mechanical-repair": {
    summary: "تقييم التسرب والضجيج والاهتزاز ومشاكل التبريد أو الحركة لتحديد نطاق الإصلاح من نتائج الفحص.",
    symptoms: ["تسرب زيت أو سائل تبريد", "ضجيج أو اهتزاز غير معتاد", "ارتفاع الحرارة أو تحذير متعلق بالمحرك", "تغير الأداء أو ظهور مشكلة بعد صيانة سابقة"],
    question: "ما الفرق بين التشخيص والإصلاح الميكانيكي؟",
    answer: "يحدد التشخيص مصدر المشكلة والعمل المطلوب، ثم يعالج الإصلاح النتائج التي توافق عليها. اطلب فصل الاختبارات وأي فك مطلوب لتأكيد السبب عن تكلفة القطع وعمالة الإصلاح."
  },
  "steering-repair": {
    summary: "فحص ثقل المقود والضجيج والانحراف، ومراجعة تأثير الإطارات والتعليق والزوايا في التوجيه.",
    symptoms: ["ثقل المقود أو ضجيج عند الدوران", "ظهور تحذير نظام التوجيه", "انحراف السيارة أو اهتزاز المقود", "تآكل غير منتظم للإطارات"],
    question: "هل الانحراف يعني ضرورة تبديل علبة الدركسون؟",
    answer: "لا يحدد الانحراف وحده سبب المشكلة. قد تحتاج الإطارات والزوايا والتعليق ومكونات التوجيه إلى فحص قبل اقتراح قطعة، مع تأكيد أي معايرة مطلوبة ومتاحة."
  },
  "battery-replacement": {
    summary: "فحص البطارية منخفضة الجهد ونظام الشحن والتوصيلات قبل تأكيد الحاجة إلى الاستبدال والمواصفة المناسبة.",
    symptoms: ["ضعف أو تعذر التشغيل", "تحذير البطارية أو الجهد المنخفض", "تفريغ البطارية بعد الوقوف", "تعطل بعض الوظائف الكهربائية بشكل متقطع"],
    question: "هل تشمل هذه الخدمة بطارية الدفع في السيارة الكهربائية أو الهجينة؟",
    answer: "تتناول الصفحة البطارية منخفضة الجهد وأنظمة التشغيل أو الملحقات المرتبطة بها. تحتاج بطارية الدفع وأعمال الجهد العالي إلى تأكيد منفصل للقدرة والنطاق حسب السيارة."
  },
  "electrical-repair": {
    summary: "تتبع أعطال التوصيلات والدوائر والحساسات ووظائف الراحة اعتماداً على الأعراض والاختبارات المناسبة.",
    symptoms: ["وظيفة كهربائية لا تعمل أو تعمل بشكل متقطع", "تفريغ البطارية أو تكرر احتراق فيوز", "تحذير اتصال بين الوحدات", "مشكلة في الإضاءة أو الحساسات أو نظام الشحن"],
    question: "هل مسح الأعطال يكفي لإصلاح المشكلة الكهربائية؟",
    answer: "لا. لا يعالج مسح الرمز سبب المشكلة. قد يلزم فحص مصدر التغذية والتوصيلات والدائرة والبيانات قبل اقتراح الإصلاح. البرمجة أو الترميز يتطلبان تأكيد التوافق والوصول المتاح."
  },
  "exhaust-repair": {
    summary: "فحص التسرب والاهتزاز والضجيج وتحذيرات العادم قبل اقتراح إصلاح المكون المتأثر.",
    symptoms: ["صوت أو اهتزاز غير معتاد في العادم", "رائحة أو تسرب ظاهر", "تحذير متعلق بالمحرك أو الانبعاثات", "تغير الأداء مع مشكلة بالعادم"],
    question: "هل تحذير الانبعاثات يثبت تعطل المحول الحفاز؟",
    answer: "لا يثبت الرمز وحده تعطل المحول. قد يلزم فحص التسرب والحساسات والأسلاك وحالة تشغيل المحرك قبل اقتراح استبدال أحد مكونات العادم."
  },
  "fuel-system-repair": {
    summary: "تقييم صعوبة التشغيل والتقطيع وأعطال ضغط الوقود والبخاخات باختبارات تحدد السبب قبل الاستبدال.",
    symptoms: ["صعوبة تشغيل أو تردد أثناء التسارع", "تقطيع أو انخفاض القدرة", "رائحة وقود أو تغير الاستهلاك", "رمز عطل متعلق بضغط الوقود أو البخاخات"],
    question: "ما المعلومات المفيدة عند طلب فحص نظام الوقود؟",
    answer: "أرسل الطراز والسنة ونوع الوقود والمسافة والتحذير الظاهر. اذكر إن بدأت المشكلة بعد تعبئة الوقود أو عمل حديث، وإن كانت تظهر عند التشغيل أو التوقف أو التسارع."
  },
  "body-repair": {
    summary: "تقييم تلف الألواح والطلاء والزينة لتحديد الإصلاح أو الاستبدال، وما قد يتطلب فحصاً إضافياً بعد الفك.",
    symptoms: ["خدوش أو انبعاجات أو تلف في الطلاء", "أضرار نتيجة اصطدام", "عدم محاذاة لوح أو صدام أو قطعة زينة", "تآكل أو تلف ظاهر في الهيكل"],
    question: "هل تحتاج كل الخدوش إلى إعادة طلاء؟",
    answer: "يعتمد الخيار على عمق العلامة وحالة الطلاء. قد يختلف نطاق تصحيح السطح عن الطلاء الموضعي أو إصلاح اللوح. تساعد الصور في الطلب الأولي، وقد يلزم الفحص لتأكيد الطريقة."
  },
  "tire-repair": {
    summary: "فحص فقدان الضغط والثقب والاهتزاز وحالة الإطار لتحديد صلاحية الإصلاح أو مواصفة الاستبدال.",
    symptoms: ["فقدان ضغط أو ثقب", "تحذير مراقبة ضغط الإطارات", "اهتزاز أو ضجيج أثناء السير", "تآكل غير منتظم أو تلف ظاهر"],
    question: "هل يمكن إصلاح كل إطار مثقوب؟",
    answer: "لا. يعتمد القرار على موضع الضرر وبنية الإطار وحالته وما إذا استُخدم بضغط منخفض. يحدد الفحص ملاءمة الإصلاح أو الحاجة إلى الاستبدال."
  },
  "soft-close-door-installation": {
    summary: "مراجعة توافق أقفال الأبواب والتوصيلات والمحاذاة لتركيب الإغلاق الناعم أو فحص مشكلة في نظام قائم.",
    symptoms: ["الحاجة إلى دفع الباب بقوة ليغلق", "توقف السحب في منتصف الإغلاق", "صوت نقر أو استمرار تحذير الباب", "طلب إضافة وظيفة الإغلاق الناعم"],
    question: "ما الذي يحدد توافق نظام الإغلاق الناعم؟",
    answer: "تحدد السيارة والقفل والتوصيلات والمحاذاة والتجهيزات الموجودة نطاق التركيب. تتم مراجعة الأجزاء المتاحة ووظائف الأبواب قبل اعتماد المكونات والعمل."
  }
};
const problem = "/mercedes/problems";
const MERCEDES_ADDITIONAL_SERVICE_SCOPE = {
  "mechanical-repair": {
    heading: "Engine symptoms and the inspection they need",
    intro: "Tell us when the change happens: cold start, warm idle, acceleration, traffic or after parking. That context helps separate an engine-running fault from transmission, mount or driveline vibration.",
    items: [
      { id: "rough-idle", title: "Rough idle, shaking or vibration", description: "Record whether it happens while stationary, in gear or only at road speed. Ignition, fuel delivery, air leaks, compression and mount condition are different test paths; shaking alone does not establish which part needs work.", path: `${problem}/check-engine-light`, linkLabel: "Warning lights and engine-running symptoms" },
      { id: "exhaust-smoke", title: "White or blue exhaust smoke", description: "Note the colour, duration, smell and whether oil or coolant is being lost. Brief condensation and persistent smoke need different assessment. Smoke colour alone cannot confirm a head-gasket, turbocharger or internal-engine fault." },
      { id: "coolant-leak", title: "Coolant loss and rising temperature", description: "Leak tracing and cooling-system tests establish the source before a hose, pump, thermostat or internal repair is proposed. A temperature warning needs prompt attention; do not open a hot cooling system.", path: `${problem}/engine-overheating`, linkLabel: "Overheating: stop and assessment guidance" },
      { id: "loss-of-power", title: "Loss of power or a turbo-related warning", description: "Air/boost leaks, fuel or ignition faults, exhaust restrictions and control problems can feel similar. Diagnostic evidence comes first; turbo or engine repairs follow only if the fault is confirmed.", path: "/services/mercedes-diagnostics-dubai", linkLabel: "XENTRY diagnosis for reduced power" },
      { id: "oil-leaks", title: "Oil leaks and burning smells", description: "Identify the fluid, source and spread of the leak. Oil on an undertray or a photograph of a wet engine cannot establish which seal or component failed.", path: `${problem}/oil-leak`, linkLabel: "How an oil leak is investigated" },
      { id: "mounts-belts", title: "Mounts, belts, pulleys and engine noise", description: "The inspection checks when a noise or movement occurs and which assembly it follows. Parts compatibility, access and any further dismantling are explained before the repair is authorised." }
    ]
  },
  "transmission-repair": {
    heading: "Identify the gearbox before choosing the repair",
    intro: "7G-Tronic, 9G-Tronic and AMG transmission variants are not interchangeable. The VIN, fitted unit and service history determine fluid requirements, access to live data and any supported adaptation procedure.",
    items: [
      { title: "Jerking or harsh changes", description: "Describe the gear, speed, temperature and load at which the change occurs. Engine-running or driveline faults can imitate a gearbox complaint.", path: `${problem}/gearbox-jerking`, linkLabel: "Understand jerking and delayed engagement" },
      { title: "Slipping or engine speed rising without drive", description: "Report loss of drive and warning messages before arranging the visit. Repeatedly forcing acceleration to reproduce the symptom can worsen the situation.", path: `${problem}/transmission-slipping`, linkLabel: "Slipping symptoms and inspection guidance" },
      { title: "Fluid leaks and service history", description: "Confirm the leak source, fluid condition and applicable schedule. A fluid change is due maintenance when specified; it is not a guaranteed repair for internal wear or control faults." },
      { title: "Control, mechatronic and mechanical findings", description: "Power supply, wiring, sensors, hydraulic operation and internal condition may require different tests. The estimate distinguishes supported component repair, further investigation and replacement." },
      { title: "Adaptations after agreed work", description: "Resets, coding or relearning are performed only where required by the completed repair and supported for the fitted gearbox. Clearing learned values is not a universal cure." },
      { title: "What a quote should explain", description: "Ask for the diagnosed concern, labour, fluid approval, parts route, exclusions and verification. A rebuild or replacement is not selected from a fault-code label alone." }
    ]
  },
  "ac-repair": {
    heading: "Weak cooling, airflow and climate-control faults",
    intro: "Compare the complaint at idle and while driving, on each side of the cabin and at different fan settings. The fitted refrigerant and climate equipment are checked before any service is quoted.",
    items: [
      { title: "Not cold or blowing warm air", description: "Vent temperature, operating pressures and leak evidence help distinguish refrigerant loss from a compressor, condenser or control concern.", path: `${problem}/ac-not-cooling`, linkLabel: "Why Mercedes AC may stop cooling" },
      { title: "Weak airflow or blower stops", description: "A filter restriction, blower, regulator, supply or control fault can reduce airflow even when the refrigerant circuit is functioning. Report fan behaviour separately from air temperature." },
      { title: "One side warm or rear cabin not cooling", description: "The exact climate-zone configuration matters. Sensors, blend-door operation, refrigerant performance and communication may need assessment; a warm vent does not prove a failed compressor." },
      { title: "Refrigerant and compressor decisions", description: "Confirm the correct refrigerant, charge specification and oil before work. Any leak or electrical concern is explained first; a refill alone does not fix every cooling fault." }
    ]
  },
  "battery-replacement": {
    heading: "Test the battery and identify its role",
    intro: "A starting battery, an auxiliary supply and a 48V or traction-battery system are different jobs. Send the exact message and model details so the appropriate low-voltage assessment can be confirmed.",
    items: [
      { title: "Starting battery test and fitment", description: "Condition, charging, connections and the reported starting behaviour guide the decision. Replacement type, capacity, access and installation procedure must match the exact vehicle." },
      { title: "Auxiliary battery message", description: "The message can refer to different components across generations. Identify the system before quoting an auxiliary battery or related component.", path: `${problem}/battery-warning`, linkLabel: "Understand 12V, auxiliary and 48V warnings" },
      { title: "Registration or coding", description: "Confirm whether the fitted system requires a replacement registration, supported reset or coding, and include the agreed procedure in the quote. It is not one universal process for every Mercedes." },
      { title: "A new battery repeatedly goes flat", description: "Repeated discharge may require charging, connection or unwanted-draw testing. Replacing another battery without tracing the fault can leave the concern unresolved.", path: "/services/mercedes-electrical-repair-dubai#battery-drain", linkLabel: "Electrical investigation for repeated drain" }
    ]
  },
  "electrical-repair": {
    heading: "Repair the electrical fault supported by testing",
    intro: "XENTRY and physical electrical tests help isolate the concern before a repair is proposed. For software configuration requests, discuss the required function through Mercedes diagnostics and coding.",
    items: [
      { id: "battery-drain", title: "Battery keeps dying after parking", description: "Tell us how long the car stands, its recent battery history and any aftermarket equipment. Charging, connections and sleep-current behaviour may need separate testing before a component is blamed.", path: `${problem}/wont-start`, linkLabel: "Separate no-power, no-crank and no-start symptoms" },
      { id: "charging-fault", title: "Charging and voltage warnings", description: "Supply, grounds, connectors and charging equipment are assessed for the fitted system. A 48V message is not permission to disconnect or work on that system yourself.", path: `${problem}/battery-warning`, linkLabel: "Battery and charging-warning guide" },
      { id: "reverse-camera", title: "Reverse camera not working", description: "Record whether the display changes in reverse, shows a warning or stays blank. Camera supply, wiring, communication and display integration are checked before camera or head-unit replacement is proposed.", path: "/services/head-unit-repair-dubai", linkLabel: "Head-unit assessment if other screen functions also fail" },
      { title: "Wiring, water ingress and intermittent accessories", description: "Recent repairs, water entry and the exact failing functions guide connector, circuit and network checks. Confirm the supported repair and any further observation needed for an intermittent fault." },
      { title: "ECU, SAM and communication faults", description: "Fault-code wording alone does not confirm module damage. Repairability, replacement compatibility and any necessary software work depend on the part number and test findings." },
      { title: "Coding is a separate scope", description: "Supported coding, programming and adaptations require the vehicle, module, function and access to be confirmed. Electrical repair may be necessary before software work can proceed.", path: "/services/mercedes-diagnostics-dubai", linkLabel: "Discuss XENTRY and supported coding" }
    ]
  },
  "brake-repair": {
    heading: "Brake noise, vibration and warning messages",
    intro: "The fitted brake package, measured condition and driving symptom determine the work. Standard and AMG components must be identified before pads, discs or other parts are ordered.",
    items: [
      { id: "brake-noise", title: "Squeaking or grinding brakes", description: "Noise can involve pad/disc condition, contamination, mounting or another component. Grinding, changed braking feel or reduced braking warrants prompt assessment; do not assume a pad change alone is sufficient." },
      { title: "Vibration when braking", description: "Record whether vibration appears only under braking or also at speed. Brake condition, wheel/tyre condition and suspension can require different checks.", path: "/services/mercedes-steering-repair-dubai#steering-vibration", linkLabel: "Steering-wheel vibration and related checks" },
      { title: "Wear, ABS or other brake warnings", description: "Record the exact warning and follow the vehicle handbook. Wear sensors, hydraulic concerns and electronic warnings require different investigation; a warning alone does not identify every part needed." },
      { title: "Parts, measurements and completion checks", description: "The quote identifies the brake equipment, measured findings, parts and fluid work where due. Supported service functions and checks after repair are confirmed for the vehicle." }
    ]
  },
  "steering-repair": {
    heading: "Separate steering, wheel and suspension concerns",
    intro: "Describe whether the change occurs when turning, accelerating, braking or cruising. Steering assistance and chassis equipment vary by model and generation.",
    items: [
      { id: "steering-vibration", title: "Steering-wheel vibration", description: "The speed and operating condition matter. Wheel/tyre balance or damage, brake condition, joints and mountings may require assessment before the steering rack is considered.", path: "/services/mercedes-tire-repair-dubai", linkLabel: "Tyre and wheel-condition assessment" },
      { title: "Heavy steering or assistance warning", description: "Identify the electric or hydraulic assistance system, then check relevant supply, fluid or mechanical findings. Sudden loss of assistance needs prompt advice before driving further." },
      { title: "Pulling or off-centre steering", description: "Tyre pressure/condition, alignment and steering or suspension wear are separate checks. Alignment is not a substitute for repairing a worn or damaged part.", path: "/services/mercedes-suspension-repair-dubai", linkLabel: "Suspension and chassis inspection" },
      { title: "After a steering repair", description: "The estimate explains alignment and any supported steering-angle or assistance calibration required by the work. Not every repair requires the same procedure." }
    ]
  },
  "body-repair": {
    heading: "Accident, panel and paintwork assessment",
    intro: "Photographs help plan an inspection. They cannot establish structural condition, hidden damage or the final repair cost.",
    items: [
      { title: "Bumpers, dents and panel damage", description: "Inspect the material, access, mountings and adjoining components before selecting repair or replacement. The estimate identifies the affected panels and any dismantling assumptions." },
      { title: "Sensors and equipment behind the damage", description: "Parking sensors, cameras, lighting and wiring may need separate checks. Required calibration, specialist processes and who will perform them are confirmed before work is accepted." },
      { title: "Paint preparation and finish", description: "Existing paint, repair history and finish determine preparation and blending requirements. Review the agreed finish, panel fit and relevant functions at handover." },
      { title: "Protection after repair", description: "PPF, ceramic coating and polishing have different purposes and are separately agreed only when suitable for the repaired finish.", path: "/services/paint-protection-dubai", linkLabel: "Compare paint-care and protection options" }
    ]
  },
  "exhaust-repair": {
    heading: "Exhaust leaks, noise and related engine warnings",
    intro: "Inspection starts with the fitted petrol, diesel or AMG system and any previous modification. Repair and performance upgrades are separate requests.",
    items: [
      { title: "Rattle, leak or changed sound", description: "Check joints, mountings, shields and damaged sections before replacing an assembly. Describe when the noise occurs and any impact or recent work." },
      { title: "Smoke or loss of power", description: "Engine-running and boost concerns can appear at the exhaust. Smoke or a warning does not prove that an exhaust component is the cause.", path: "/services/mercedes-mechanical-repair-dubai#exhaust-smoke", linkLabel: "Engine smoke and power-loss assessment" },
      { title: "Sensor or emissions-related code", description: "Confirm relevant wiring, leaks and operating data before selecting a sensor or component. Diagnostic work and any supported repair are quoted for the fitted system.", path: "/services/mercedes-diagnostics-dubai", linkLabel: "Diagnosis before exhaust-component replacement" }
    ]
  },
  "fuel-system-repair": {
    heading: "Fuel delivery and injector concerns",
    intro: "Petrol and diesel fuel systems require different specifications and test procedures. The fitted system and evidence determine the work; a misfire does not by itself identify a faulty injector.",
    items: [
      { title: "Hard starting, rough running or hesitation", description: "Ignition, air, fuel supply and mechanical causes may overlap. Compare relevant pressure/data and physical findings before selecting a pump or injector.", path: `${problem}/check-engine-light`, linkLabel: "Engine-warning and running-fault guide" },
      { title: "Fuel smell or suspected leakage", description: "A strong fuel smell or visible leak needs prompt workshop advice. Avoid starting or continuing to drive a leaking vehicle; do not loosen high-pressure fuel components." },
      { title: "Confirmed component repair", description: "The quote identifies the tested fault, compatible component, seals and labour. Injector coding or other service functions are included only where required and supported." },
      { title: "No-start investigation", description: "Fuel delivery is one possible cause of crank-no-start. No power and no crank follow different electrical or starting-system checks.", path: `${problem}/wont-start`, linkLabel: "Describe the exact starting symptom" }
    ]
  },
  "tire-repair": {
    heading: "Tyre damage, pressure warnings and vibration",
    intro: "Confirm the actual wheel sizes, axle fitment and tyre specification. A repair is offered only when the damage and tyre condition are suitable.",
    items: [
      { title: "Puncture or repeated pressure loss", description: "Inspect the tyre, valve and wheel to identify the leak and assess repairability. Sidewall damage, internal condition and previous low-pressure use can rule out a repair." },
      { title: "Run-flat and mixed axle fitments", description: "Check the fitted specification and manufacturer requirements before selecting a replacement. Do not assume every Mercedes uses run-flat tyres or the same size on both axles." },
      { title: "Vibration or uneven wear", description: "Wheel condition, balance, alignment and chassis wear may need separate checks. Replacing tyres alone may not resolve the underlying concern.", path: "/services/mercedes-steering-repair-dubai#steering-vibration", linkLabel: "Vibration and steering-related checks" },
      { title: "Pressure monitoring", description: "Set pressures using the applicable vehicle guidance and confirm the supported reset or sensor procedure. A warning can require more than a dashboard reset." }
    ]
  }
};
const MERCEDES_ARABIC_SERVICE_CONTENT = {
  "mechanical-repair": {
    serviceName: "إصلاح المحرك والأعطال الميكانيكية",
    serviceType: "فحص وإصلاح محرك مرسيدس وأنظمة التبريد",
    h1: "إصلاح محرك مرسيدس والأعطال الميكانيكية في دبي",
    metaTitle: "إصلاح محرك مرسيدس في دبي | ديجي تيك القوز",
    metaDescription: "فحص أعطال محرك مرسيدس في القوز، دبي: تسريب الزيت، ارتفاع الحرارة، الاهتزاز والدخان. نحدد سبب العطل ونوضح نطاق الإصلاح قبل العمل.",
    heroCopy: "اهتزاز مرسيدس عند الوقوف، نقص سائل التبريد أو ظهور دخان يحتاج إلى فحص يحدد السبب. نراجع بيانات السيارة وتاريخ الصيانة، ثم نجمع بين الفحص الميكانيكي وبيانات التشخيص اللازمة لتوضيح خيارات الإصلاح. لا نوصي بتغيير المحرك أو التيربو بناءً على رسالة تحذير وحدها.",
    symptoms: [
      "اهتزاز أو عدم انتظام دوران المحرك عند الوقوف",
      "تسريب زيت أو نقص متكرر في سائل التبريد",
      "ارتفاع حرارة المحرك أو ظهور رسالة تحذير للحرارة",
      "دخان أبيض أو أزرق، ضعف في العزم أو اهتزاز من قواعد المحرك"
    ],
    processSteps: [
      { title: "تحديد ظروف ظهور العطل", description: "نراجع رقم الهيكل، نوع المحرك، المسافة وتاريخ الإصلاحات. نحتاج إلى معرفة ما إذا كان الاهتزاز أو الدخان يظهر عند التشغيل البارد، بعد التسخين أو أثناء التسارع." },
      { title: "فحص السبب المحتمل", description: "نختار اختبارات التسريب والتبريد والاشتعال والضغط الميكانيكي بحسب الأعراض والنتائج. فقدان العزم قد يستلزم تشخيصاً أولياً قبل تحديد وجود عطل ميكانيكي أو خلل في الشحن التوربيني." },
      { title: "توضيح الإصلاح والتحقق منه", description: "نفصل بين إصلاح جزء خارجي، العمل الذي يتطلب فكاً إضافياً، والإصلاح الداخلي للمحرك. بعد الموافقة والتنفيذ نتحقق من موضع التسريب ودرجة التشغيل والأعراض المرتبطة بالعمل." }
    ],
    partsCopy: "يحدد عرض العمل القطع والجوانات والسوائل وأجور الفك والتركيب المطلوبة للمحرك الفعلي. نوضح أي فحص إضافي قبل تنفيذه، ونتحقق من توافق الزيت وسائل التبريد والقطع مع بيانات السيارة.",
    faqs: [
      { question: "لماذا تهتز مرسيدس وهي واقفة؟", answer: "قد يرتبط الاهتزاز بالاشتعال أو الهواء والوقود أو الضغط داخل المحرك أو قواعد التثبيت. معرفة ظروف ظهوره وقراءة البيانات والفحص المباشر تساعد على التمييز بين هذه الأسباب." },
      { question: "هل الدخان الأزرق أو الأبيض يعني تلف التيربو؟", answer: "لون الدخان وحده لا يكفي. نراجع استمراره وحرارة المحرك واستهلاك الزيت أو سائل التبريد، ثم نفحص الأنظمة ذات الصلة قبل اقتراح إصلاح التيربو أو المحرك." },
      { question: "هل يمكن تحديد إصلاح تسريب سائل التبريد من صورة؟", answer: "الصورة تساعد على ترتيب الفحص، لكن السائل قد ينتقل بعيداً عن موضع التسريب. يلزم تحديد المصدر وحالة الأجزاء المتصلة به لتوضيح نطاق الإصلاح." }
    ]
  },
  "suspension-repair": {
    serviceName: "إصلاح التعليق وAIRMATIC",
    serviceType: "فحص التعليق الهوائي والميكانيكي لمرسيدس",
    h1: "إصلاح تعليق مرسيدس ونظام AIRMATIC في دبي",
    metaTitle: "إصلاح تعليق مرسيدس وAIRMATIC في دبي | ديجي تيك",
    metaDescription: "فحص تعليق مرسيدس وAIRMATIC في القوز: هبوط السيارة، اختلاف الارتفاع، تسريب الهواء وأصوات التعليق. تشخيص حسب التجهيزات الفعلية.",
    heroCopy: "هبوط زاوية من السيارة بعد الوقوف أو تكرار عمل ضاغط الهواء لا يحدد وحده القطعة التالفة. نتحقق أولاً من نوع التعليق الموجود في مرسيدس، ثم نفحص الارتفاع والتسريب والتحكم أو الأجزاء الميكانيكية. يختلف نطاق العمل بين التعليق التقليدي وAIRMATIC والأنظمة النشطة الأخرى.",
    symptoms: [
      "انخفاض أحد جوانب السيارة بعد بقائها متوقفة",
      "رسالة AIRMATIC أو تحذير بانخفاض مستوى السيارة",
      "تشغيل متكرر للضاغط أو بطء في تعديل الارتفاع",
      "طقطقة، قساوة في الركوب أو تآكل غير منتظم للإطارات"
    ],
    processSteps: [
      { title: "تأكيد نوع التعليق", description: "نحدد التجهيزات من بيانات السيارة والفحص. اسم الفئة أو شعار AMG لا يكفي لتحديد وجود تعليق هوائي أو نوع المساعدات ووحدات التحكم." },
      { title: "قياس الارتفاع وتتبع الخلل", description: "بحسب النظام، نفحص النوابض والمساعدات والأذرع أو نبحث عن تسريب في الدعامات والخطوط الهوائية. نفحص الضاغط وكتلة الصمامات وحساسات الارتفاع عندما تدعم النتائج ذلك." },
      { title: "إصلاح السبب ومراجعة التشغيل", description: "يوضح العرض القطع والعمل اللازم وأي معايرة مدعومة أو فحص لزوايا العجلات. نراجع الاحتفاظ بالارتفاع واستجابة النظام وأثر الإصلاح على الراحة والضوضاء." }
    ],
    partsCopy: "نطابق الدعامات الهوائية والضواغط والصمامات والأذرع والجلب مع تجهيزات السيارة. نوضح إذا كان هناك تسريب تسبب في إجهاد الضاغط؛ لا نفترض أن كل عطل يستلزم تغيير نظام التعليق بالكامل.",
    faqs: [
      { question: "هل جميع سيارات مرسيدس مزودة بنظام AIRMATIC؟", answer: "لا. يختلف التعليق باختلاف الجيل والفئة والتجهيزات. نؤكد النظام قبل اختيار الاختبارات أو القطع، ولا نطبق إجراءات AIRMATIC على نظام مختلف." },
      { question: "هل هبوط السيارة ليلاً يعني ضرورة تغيير الضاغط؟", answer: "قد يكون السبب تسريباً أو صماماً أو خللاً في التحكم. نفحص مصدر فقدان الارتفاع وكفاءة توليد الضغط قبل التوصية بتغيير الضاغط." },
      { question: "هل أستطيع القيادة إذا ظهرت رسالة بأن السيارة منخفضة جداً؟", answer: "إذا كانت السيارة منخفضة بوضوح، أو يلامس الإطار الهيكل، أو تأثر التوجيه أو الكبح، فتوقف في مكان آمن ورتب نقلها. اتبع رسالة السيارة ولا تعتمد على اختفاء التحذير مؤقتاً." }
    ]
  },
  "transmission-repair": {
    serviceName: "إصلاح ناقل الحركة والقير",
    serviceType: "تشخيص وصيانة وإصلاح قير مرسيدس",
    h1: "إصلاح قير مرسيدس وناقل الحركة في دبي",
    metaTitle: "إصلاح قير مرسيدس في دبي | 7G و9G | ديجي تيك",
    metaDescription: "فحص قير مرسيدس في القوز، دبي عند النتعة أو الانزلاق أو تأخر التعشيق. نميز بين خدمة الزيت وإصلاح العطل حسب ناقل الحركة المثبت.",
    heroCopy: "النتعة أو تأخر التعشيق أو ارتفاع دوران المحرك دون تسارع مناسب يستدعي تشخيص القير. نحدد ناقل الحركة المثبت، سواء كان 7G-TRONIC أو 9G-TRONIC أو إحدى وحدات AMG، ونراجع حالته وتاريخه قبل اقتراح خدمة زيت أو إصلاح. تغيير الزيت وحده ليس ضماناً لحل عطل قائم.",
    symptoms: [
      "نتعة أو تبديل قاسٍ بين السرعات",
      "تأخر التعشيق عند اختيار الحركة الأمامية أو الرجوع",
      "انزلاق أو ارتفاع دوران المحرك دون زيادة مناسبة في السرعة",
      "تحذير ناقل الحركة، تسريب زيت أو تقييد السرعات المتاحة"
    ],
    processSteps: [
      { title: "تحديد القير وتاريخ خدمته", description: "نراجع بيانات السيارة ومواصفة الزيت وأعمال الصيانة السابقة. نواقل AMG ليست جميعها من نوع واحد، ولا تتشارك بالضرورة السوائل أو إجراءات الخدمة." },
      { title: "تمييز العطل عن الصيانة الدورية", description: "نراجع بيانات الأعطال والتسريب ومستوى الزيت وحالته وفق الإجراء المناسب. قد يلزم فحص المحرك والقواعد ومجموعة نقل الحركة إذا كانت الأعراض متشابهة." },
      { title: "الاتفاق على العمل وفحص النتيجة", description: "نفصل خدمة الزيت والفلتر عن إصلاح التحكم أو جسم الصمامات أو العمل الداخلي. أي تهيئة أو برمجة تقتصر على ما تتطلبه الوحدة وما تدعمه الإمكانات المتاحة، ثم نراجع التشغيل والتسريب." }
    ],
    partsCopy: "يتضمن العرض مواصفة الزيت والكمية والفلتر أو حوض الزيت والجوانات بحسب القير. نوضح أجور التشخيص وأي فك إضافي أو تهيئة مطلوبة؛ ولا نعرض استبدال القير كخيار تلقائي قبل الفحص.",
    faqs: [
      { question: "هل تغيير زيت القير يعالج النتعة في مرسيدس؟", answer: "يتوقف ذلك على السبب. قد ترتبط النتعة بالزيت أو التحكم أو التآكل الداخلي أو عطل خارج القير. الفحص يحدد إن كانت خدمة الزيت مناسبة وما إذا كان هناك إصلاح آخر مطلوب." },
      { question: "متى يجب تغيير زيت قير 7G أو 9G؟", answer: "نعتمد على نوع القير المثبت وجدول السيارة وتاريخ الخدمة. لا توجد مسافة موحدة تنطبق على كل سيارات مرسيدس أو كل نواقل الحركة." },
      { question: "هل إعادة التهيئة أو البرمجة تصلح أي عطل في القير؟", answer: "لا. التهيئة أو البرمجة إجراء محدد عند الحاجة وتوفر الدعم، وليست بديلاً عن إصلاح تسريب أو تآكل أو خلل ميكانيكي مثبت." }
    ]
  },
  "oil-change": {
    serviceName: "تغيير زيت المحرك والفلتر",
    serviceType: "خدمة زيت محرك مرسيدس",
    h1: "تغيير زيت مرسيدس والفلتر في دبي",
    metaTitle: "تغيير زيت مرسيدس في دبي | المواصفة الصحيحة | ديجي تيك",
    metaDescription: "تغيير زيت مرسيدس والفلتر في القوز، دبي حسب موافقة الزيت المطلوبة للمحرك والكمية الصحيحة. نطاق واضح يميز خدمة الزيت عن Service A وB.",
    heroCopy: "نحدد زيت محرك مرسيدس من بيانات السيارة وموافقة الزيت المطلوبة والكمية المناسبة، ثم نوضح الفلتر والمستهلكات والعمل المشمول. درجة اللزوجة وحدها لا تكفي لاختيار الزيت. تغيير الزيت قد يكون جزءاً من Service A أو Service B، لكنه لا يعني تنفيذ جميع البنود المستحقة في تلك الخدمة.",
    symptoms: [
      "ظهور موعد خدمة الزيت على شاشة السيارة",
      "عدم وضوح مواصفة الزيت المستخدم أو تاريخ تغييره",
      "الحاجة إلى عرض مفصل للزيت والفلتر",
      "رسالة مستوى الزيت أو تسريب يحتاج إلى فحص منفصل"
    ],
    processSteps: [
      { title: "مراجعة بيانات المحرك وموعد الخدمة", description: "نراجع رقم الهيكل والمسافة وسجل الصيانة ورسالة ASSYST. نميز بين تذكير الصيانة وتحذير مستوى الزيت أو ضغطه الذي قد يتطلب تشخيصاً." },
      { title: "تحديد الزيت وبنود العرض", description: "نوضح موافقة مرسيدس المطلوبة والكمية والفلتر وأجزاء الإحكام وأجور العمل. تسجل أي بنود إضافية مستحقة بصورة منفصلة قبل الموافقة." },
      { title: "تنفيذ الخدمة ومراجعة المستوى", description: "بعد تغيير الزيت والفلتر نتحقق من المستوى والتسريب وفق إجراء السيارة. يقتصر تصفير التذكير المدعوم على الصيانة التي نفذت فعلاً، مع تسجيل تفاصيل العمل." }
    ],
    partsCopy: "فلاتر الهواء والمقصورة وشمعات الإشعال وسائل الفرامل وخدمة القير بنود مستقلة ما لم يذكرها العرض. نؤكد توافق الزيت والفلتر مع المحرك، ولا نعتمد زيتاً واحداً أو فترة تغيير واحدة لجميع الفئات.",
    faqs: [
      { question: "ما الزيت المناسب لمرسيدس؟", answer: "نحتاج إلى بيانات المحرك ورقم الهيكل لتأكيد موافقة الزيت والكمية. تشابه اللزوجة على عبوتين لا يعني أن الزيتين يلبيان متطلبات المحرك نفسه." },
      { question: "هل تغيير الزيت هو نفسه Service A أو Service B؟", answer: "لا. قد تشمل الخدمة الدورية الزيت والفلتر وفحوصاً وبنوداً أخرى يحددها جدول السيارة ورسالة الخدمة وتاريخها. نوضح البنود المستحقة قبل الحجز." },
      { question: "هل يتم تصفير رسالة ASSYST بعد الخدمة؟", answer: "ننفذ التصفير عندما تدعمه السيارة والإجراء المتاح، وللعمل المنجز فقط. أما إمكانية تحديث السجل الرقمي للصيانة فتؤكد بصورة منفصلة عند طلبها." },
      { question: "ما المعلومات المطلوبة للحصول على عرض تغيير الزيت؟", answer: "أرسل رقم الهيكل أو الموديل والسنة، والمسافة ورسالة الخدمة وأي تحذير أو تسريب. نستخدمها لتحديد المواصفة والكمية ونطاق الفحص المطلوب." }
    ]
  },
  "ac-repair": {
    serviceName: "إصلاح وصيانة المكيف",
    serviceType: "فحص نظام تكييف مرسيدس",
    h1: "إصلاح مكيف مرسيدس في دبي",
    metaTitle: "إصلاح مكيف مرسيدس في دبي | ديجي تيك القوز",
    metaDescription: "فحص مكيف مرسيدس في القوز عند ضعف التبريد أو اختلاف حرارة الفتحات أو تكرر فقدان التبريد. تحديد التسريب والهواء والتحكم قبل الإصلاح.",
    heroCopy: "ضعف تبريد مكيف مرسيدس قد يرتبط بتسريب وسيط التبريد أو تدفق الهواء أو التحكم أو عطل ميكانيكي. نختبر النظام في ظروف مشابهة لظهور المشكلة ونوضح الفرق بين شحن النظام وإصلاح سبب الخلل. اختلاف الحرارة بين جانبي المقصورة لا يكفي للحكم على الضاغط.",
    symptoms: [
      "هواء دافئ أو ضعف التبريد عند الوقوف والزحام",
      "اختلاف درجة الحرارة بين فتحات المقصورة",
      "ضعف تدفق الهواء أو عمل المكيف بصورة متقطعة",
      "عودة ضعف التبريد بعد شحن النظام"
    ],
    processSteps: [
      { title: "تحديد ظروف ضعف التبريد", description: "نسجل الفئة والسنة ونوع وسيط التبريد وتجهيزات مناطق المقصورة. نميز بين مشكلة مستمرة وأخرى تظهر عند الوقوف أو بعد ارتفاع حرارة السيارة." },
      { title: "فحص الهواء ودائرة التبريد", description: "نراجع حرارة الفتحات وتدفق الهواء وبيانات التحكم، مع اختبارات الضغط والتسريب المناسبة. قد يشمل الفحص المراوح والفلاتر والحساسات وتوزيع الهواء." },
      { title: "إصلاح السبب وقياس الأداء", description: "نوضح إن كان المطلوب شحناً محدداً أو إصلاح تسريب أو تغيير جزء ثبت خلله. بعد العمل نراجع أداء التبريد وتوزيعه مع مراعاة حرارة الجو وظروف التشغيل." }
    ],
    partsCopy: "يحدد العرض وسيط التبريد والزيت والكمية المناسبة للنظام، إضافة إلى الجوانات والقطع وأجور الوصول إليها. أعمال المبخر أو الضاغط تختلف عن الشحن؛ ونوضح الفك والتركيب المطلوب قبل الموافقة.",
    faqs: [
      { question: "لماذا يبرد المكيف أثناء السير ويضعف عند الوقوف؟", answer: "قد تتغير كفاءة تدفق الهواء أو عمل المراوح أو ضغوط النظام مع ظروف التشغيل. نكرر الفحص في الظروف المذكورة لتحديد السبب بدلاً من افتراض نقص وسيط التبريد." },
      { question: "هل تكرار تعبئة غاز المكيف يحل المشكلة؟", answer: "فقدان التبريد المتكرر يحتاج إلى فحص. الشحن لا يصلح التسريب، كما أن بعض الأعطال تتعلق بالهواء أو التحكم ولا تعالج بإضافة وسيط التبريد." },
      { question: "هل خروج هواء دافئ من جهة واحدة يعني تلف الضاغط؟", answer: "ليس بالضرورة. قد يكون الخلل في توزيع الهواء أو حساس أو التحكم أو شحنة النظام. الاختبار يحدد الإصلاح المناسب." }
    ]
  },
  "battery-replacement": {
    serviceName: "فحص وتبديل البطارية",
    serviceType: "فحص بطارية مرسيدس والشحن والتشغيل",
    h1: "فحص وتبديل بطارية مرسيدس في دبي",
    metaTitle: "تبديل بطارية مرسيدس في دبي | فحص 12V | ديجي تيك",
    metaDescription: "فحص بطارية مرسيدس 12V في القوز، دبي مع مراجعة الشحن والتوصيلات واختيار البطارية المناسبة. نطاق منفصل للبطارية المساعدة وأنظمة 48V.",
    heroCopy: "ضعف التشغيل أو رسالة البطارية لا يعني دائماً أن البطارية تحتاج إلى تغيير. نفحص بطارية مرسيدس منخفضة الجهد ودائرة الشحن والتوصيلات قبل اقتراح الاستبدال. نميز بين بطارية 12V الرئيسية والبطارية المساعدة بحسب التجهيزات؛ ورسائل 48V أو بطارية الدفع تحتاج إلى تحديد نطاق مختلف قبل الحجز.",
    symptoms: [
      "بطء دوران المحرك عند التشغيل أو تعذر التشغيل",
      "رسالة تخص البطارية الرئيسية أو المساعدة",
      "الحاجة المتكررة إلى المساعدة في التشغيل",
      "ضعف البطارية بعد الوقوف أو ظهور تحذير للشحن"
    ],
    processSteps: [
      { title: "تحديد البطارية والتحذير", description: "نراجع رقم الهيكل ونص الرسالة وتجهيزات السيارة. قد يشير وصف البطارية المساعدة إلى مكونات مختلفة، ولا نعامل نظام 48V أو بطارية الدفع كبديل مباشر لبطارية 12V." },
      { title: "اختبار البطارية والشحن", description: "نراجع حالة البطارية والتوصيلات وأداء الشحن بحسب ظروف السيارة. إذا تكرر التفريغ، فقد يلزم فحص كهربائي مستقل لتتبع استهلاك التيار أثناء الوقوف." },
      { title: "الاستبدال والتحقق عند الحاجة", description: "نختار السعة والتقنية والمقاس المناسب، ونوضح أي تهيئة أو تسجيل مطلوب ومدعوم. بعد التركيب نراجع التشغيل والجهد والرسائل المرتبطة بالعمل." }
    ],
    partsCopy: "يحدد العرض نوع البطارية وسعتها وتوافقها وأجور التركيب وأي إجراء مدعوم بعده. لا يشمل تبديل بطارية 12V تلقائياً إصلاح تسريب تيار أو عطل في نظام 48V أو بطارية الدفع.",
    faqs: [
      { question: "هل تحذير البطارية المساعدة يعني أن البطارية الرئيسية تالفة؟", answer: "لا. يختلف المكون المقصود باختلاف السيارة. نقرأ نص التحذير وبيانات النظام ونفحص المكون المعني قبل اختيار القطعة." },
      { question: "هل تحتاج بطارية مرسيدس الجديدة إلى برمجة؟", answer: "يتوقف الإجراء على الفئة والسنة والنظام. نؤكد ما إذا كان التسجيل أو التهيئة مطلوباً ومدعوماً، ولا نفترض إجراء واحداً لجميع سيارات مرسيدس." },
      { question: "لماذا تفرغ البطارية مجدداً بعد تبديلها؟", answer: "قد توجد مشكلة شحن أو استهلاك تيار أثناء الوقوف أو توصيل غير سليم. تكرار التفريغ يستدعي تتبعاً كهربائياً؛ تركيب بطارية أخرى وحده قد لا يعالج السبب." },
      { question: "هل هذه الخدمة تشمل بطارية 48V أو بطارية السيارة الكهربائية؟", answer: "هذه الصفحة تخص أساساً فحص واستبدال البطارية منخفضة الجهد ضمن النطاق المؤكد للسيارة. أرسل رقم الهيكل والتحذير لتحديد إمكانية العمل على أي نظام آخر ومتطلباته قبل الحجز." }
    ]
  },
  "brake-repair": {
    serviceName: "إصلاح الفرامل",
    serviceType: "فحص فحمات ودسكات ونظام فرامل مرسيدس",
    h1: "إصلاح فرامل مرسيدس في دبي",
    metaTitle: "إصلاح فرامل مرسيدس في دبي | فحمات ودسكات | ديجي تيك",
    metaDescription: "فحص فرامل مرسيدس في القوز عند الصفير أو الاحتكاك أو الاهتزاز أثناء الكبح. قياس التآكل ومطابقة الفحمات والدسكات مع تجهيزات السيارة.",
    heroCopy: "صفير الفرامل أو احتكاكها أو اهتزاز السيارة أثناء الكبح يحتاج إلى فحص حالة الأجزاء وقياسها. نحدد تجهيزات فرامل مرسيدس، بما فيها اختلافات AMG، ثم نوضح ما يلزم من فحمات أو دسكات أو إصلاح آخر. صوت الفرامل وحده لا يحدد القطعة المطلوبة.",
    symptoms: [
      "صفير أو صوت احتكاك عند الضغط على الفرامل",
      "اهتزاز في الدواسة أو المقود أثناء الكبح",
      "تحذير تآكل الفحمات أو رسالة تخص الفرامل",
      "تغير إحساس الدواسة أو انحراف السيارة عند التوقف"
    ],
    processSteps: [
      { title: "تحديد التجهيزات والأعراض", description: "نراجع رقم الهيكل ونوع نظام الفرامل وظروف الصوت أو الاهتزاز. تختلف المقاسات والخامات بين الفئات والتجهيزات، ولا يكفي اسم AMG لاختيار القطع." },
      { title: "قياس وفحص مكونات الكبح", description: "نفحص سماكة الفحمات والدسكات وحالة الأسطح والحساسات وحركة الأجزاء. نوسع الفحص للسائل والتسريب والتحكم إذا كانت الأعراض أو التحذيرات تستدعي ذلك." },
      { title: "تنفيذ العمل والتحقق من الكبح", description: "يوضح العرض القطع والعمل والإجراءات الخاصة بالنظام المثبت. بعد الإصلاح نراجع التجميع والتسريب والرسائل وأداء الكبح باختبار ملائم لحالة السيارة." }
    ],
    partsCopy: "نطابق الفحمات والدسكات وحساسات التآكل والسائل مع مواصفات السيارة. أي تجهيزات خاصة أو فرامل كربون سيراميك تتطلب تأكيد نطاق الفحص والقطع المتاحة قبل الموافقة على العمل.",
    faqs: [
      { question: "هل صفير فرامل مرسيدس يعني ضرورة تغيير الفحمات؟", answer: "قد يرتبط الصفير بالتآكل أو حالة سطح الدسك أو مكونات التركيب أو ظروف التشغيل. نحدد حالة الأجزاء بالفحص والقياس قبل التوصية بالتغيير." },
      { question: "هل يلزم تغيير الدسكات مع كل تغيير للفحمات؟", answer: "نقرر وفق السماكة والحالة وحدود الخدمة المناسبة للدسك. يوضح العرض نتيجة الفحص وسبب الإبقاء على الدسك أو استبداله." },
      { question: "هل اهتزاز المقود أثناء الفرملة سببه الفرامل دائماً؟", answer: "قد يرتبط بمكونات الكبح أو العجلات أو التعليق أو التوجيه. ظروف ظهور الاهتزاز والقياسات تساعد على عزل السبب قبل الإصلاح." }
    ]
  },
  "engine-diagnostics": {
    serviceName: "تشخيص الأعطال باستخدام XENTRY",
    serviceType: "فحص مرسيدس بالكمبيوتر وتشخيص أنظمة التحكم",
    h1: "فحص وتشخيص أعطال مرسيدس باستخدام XENTRY في دبي",
    metaTitle: "فحص مرسيدس XENTRY في دبي | تشخيص الأعطال | ديجي تيك",
    metaDescription: "تشخيص مرسيدس باستخدام XENTRY في القوز، دبي. قراءة الأعطال والبيانات واختبارات مدعومة، مع تأكيد نطاق الترميز والبرمجة حسب السيارة والوحدة.",
    heroCopy: "نستخدم XENTRY في ورشة ديجي تيك المستقلة لفحص أنظمة مرسيدس المدعومة وربط رموز الأعطال بالأعراض والبيانات الفعلية. يشمل التقييم ما يلزم من اختبارات موجهة قبل اقتراح الإصلاح. إمكانات الترميز أو التهيئة أو البرمجة تؤكد للسيارة والوحدة والإجراء المطلوب؛ وجود الجهاز لا يعني دعم كل وظيفة في كل موديل.",
    symptoms: [
      "لمبة فحص المحرك أو عدة تحذيرات متزامنة",
      "ضعف عزم أو وضع حماية مع تقييد الأداء",
      "عطل متقطع أو عودة التحذير بعد مسح الرموز",
      "الحاجة إلى تحديد إجراء ترميز أو تهيئة لوحدة معينة"
    ],
    processSteps: [
      { title: "تسجيل الشكوى وتأكيد نطاق الدعم", description: "نراجع رقم الهيكل ونص التحذير وظروف ظهوره وأي قطع أو وحدات استبدلت. قبل أي طلب برمجة نؤكد الوحدة والوظيفة وإمكانية تنفيذها بالأدوات والصلاحيات المتاحة." },
      { title: "قراءة البيانات واختبار السبب", description: "نراجع رموز الأعطال والبيانات الحية وإجراءات الاختبار المدعومة في XENTRY بحسب النظام. قد تحتاج النتائج إلى قياس كهربائي أو فحص ميكانيكي؛ الرمز لا يثبت وحده تلف قطعة." },
      { title: "شرح النتيجة والإجراء المقترح", description: "نوضح ما ثبت وما يحتاج إلى فحص إضافي، ونفصل التشخيص عن إصلاح الأسلاك أو استبدال القطع. تدرج التهيئة أو الترميز أو البرمجة كأعمال محددة فقط عند ضرورتها وتوفر دعمها." },
      { title: "التحقق وتوثيق ما تبقى", description: "بعد الإجراء المتفق عليه نعيد فحص الوظيفة والأعطال ذات الصلة وفق ظروف الاختبار. نوضح القيود أو الأعطال المتقطعة التي لم يمكن تكرارها، ولا نعد مسح الرمز وحده إصلاحاً." }
    ],
    partsCopy: "خدمة التشخيص تحدد مسار العمل؛ استبدال وحدة أو إصلاح ضفيرة أو عمل ميكانيكي يحتاج إلى نطاق وموافقة منفصلين. أي متطلبات وصول أو تحديث أو إجراءات خاصة بالوحدة تؤكد قبل تنفيذ الترميز أو البرمجة.",
    faqs: [
      { question: "هل يتوفر فحص XENTRY لمرسيدس في ديجي تيك؟", answer: "نعم، نستخدم XENTRY للأنظمة والوظائف المدعومة. نؤكد التوافق ونطاق الاختبار من رقم الهيكل وطبيعة العطل، مع فحوص إضافية عند الحاجة للوصول إلى السبب." },
      { question: "هل تدعمون ترميز وبرمجة جميع وحدات مرسيدس؟", answer: "الدعم يختلف باختلاف الجيل والوحدة والإجراء ومتطلبات الوصول. نحتاج إلى بيانات السيارة والوحدة المطلوبة لتأكيد الإمكانية والنطاق؛ ولا نقدم وعداً عاماً ببرمجة كل الوحدات." },
      { question: "هل كود العطل يحدد القطعة التي يجب تغييرها؟", answer: "لا. قد ينتج الرمز عن جهد غير مناسب أو أسلاك أو حساس أو سبب ميكانيكي. نربط الرمز بالبيانات واختبارات النظام قبل توصية الإصلاح." },
      { question: "هل ضعف العزم أو وضع الحماية يعني تلف التيربو؟", answer: "قد ينتج عن الشحن التوربيني أو الهواء أو الوقود أو التحكم أو أسباب أخرى. يبدأ المسار بالتشخيص، ثم يحال إلى الإصلاح الميكانيكي أو الكهربائي الذي تدعمه النتائج." }
    ]
  },
  "electrical-repair": {
    serviceName: "إصلاح الأعطال الكهربائية",
    serviceType: "إصلاح دوائر وأسلاك ومكونات كهرباء مرسيدس",
    h1: "إصلاح كهرباء مرسيدس في دبي",
    metaTitle: "إصلاح كهرباء مرسيدس في دبي | تشخيص الدوائر | ديجي تيك",
    metaDescription: "فحص وإصلاح كهرباء مرسيدس في القوز: تفريغ البطارية المتكرر، التوصيلات، الأسلاك والكاميرا الخلفية. تحديد الدائرة والسبب قبل تغيير القطع.",
    heroCopy: "تكرار تفريغ البطارية أو تعطل كاميرا الرجوع أو وظائف كهربائية متقطعة يحتاج إلى تتبع الدائرة المعنية. نراجع التغذية والتأريض والتوصيلات والمكونات بحسب العطل. قراءة الكمبيوتر تساعد على تحديد المسار، بينما إصلاح الأسلاك أو القطع الكهربائية يعتمد على نتائج القياس والفحص.",
    symptoms: [
      "تفريغ البطارية بصورة متكررة أثناء الوقوف",
      "تعطل كاميرا الرجوع أو ظهور الصورة بصورة متقطعة",
      "خلل في الإضاءة أو النوافذ أو وظائف كهربائية أخرى",
      "انقطاع متكرر لوظيفة أو وجود آثار ماء قرب التوصيلات"
    ],
    processSteps: [
      { title: "تحديد الدائرة وظروف الخلل", description: "نراجع رقم الهيكل والأعراض وما إذا بدأ الخلل بعد تركيب ملحق أو إصلاح سابق أو تعرض للماء. أعطال الشاشة ووحدة الوسائط قد تتطلب مسار فحص مستقل." },
      { title: "القياس وتتبع التوصيلات", description: "نختبر التغذية والتأريض والموصلات والدوائر وفق الحاجة. في التفريغ المتكرر قد يلزم مراقبة استهلاك التيار بعد دخول الأنظمة في وضع السكون لتحديد المصدر." },
      { title: "إصلاح موضع الخلل ومراجعة الوظيفة", description: "نوضح إصلاح الضفيرة أو الموصل أو المكون الذي أثبت الفحص خلله. إذا تطلبت القطعة تهيئة أو ترميزاً، نؤكد دعم الإجراء ونطاقه، ثم نعيد اختبار الوظيفة والأعراض." }
    ],
    partsCopy: "يتحدد نطاق إصلاح الضفيرة والموصلات والحساسات والمكونات من موضع الضرر وقابلية الإصلاح والتوافق. استبدال البطارية أو وحدة التحكم لا يعتمد على التحذير وحده؛ وأي برمجة لازمة تذكر بصورة منفصلة.",
    faqs: [
      { question: "لماذا تفرغ بطارية مرسيدس رغم أنها جديدة؟", answer: "قد يكون هناك استهلاك تيار أثناء الوقوف أو خلل في الشحن أو التوصيلات. نراجع هذه الاحتمالات قبل التوصية ببطارية أخرى، وقد يلزم وقت مراقبة لتكرار العطل." },
      { question: "هل تعطل كاميرا الرجوع يعني تغيير الشاشة؟", answer: "لا. نفحص مصدر الصورة والتغذية والتوصيلات والتواصل بحسب تجهيزات السيارة. إذا ثبت ارتباط المشكلة بوحدة الوسائط، يحدد لها نطاق إصلاح منفصل." },
      { question: "ما الفرق بين فحص XENTRY وإصلاح الكهرباء؟", answer: "التشخيص يقرأ البيانات ويختبر الأنظمة المدعومة لتحديد السبب. إصلاح الكهرباء يعالج دائرة أو توصيلة أو مكوناً ثبت خلله، وقد يجمع العمل بين المسارين بحسب النتائج." }
    ]
  },
  "body-repair": {
    serviceName: "إصلاح الهيكل والطلاء",
    serviceType: "تقييم أضرار هيكل وطلاء مرسيدس",
    h1: "إصلاح هيكل وطلاء مرسيدس في دبي",
    metaTitle: "إصلاح هيكل وطلاء مرسيدس في دبي | ديجي تيك",
    metaDescription: "تقييم أضرار هيكل وطلاء مرسيدس في القوز، دبي. تحديد الأجزاء المتضررة ونطاق الإصلاح والطلاء ومتطلبات الحساسات قبل عرض العمل.",
    heroCopy: "نبدأ إصلاح هيكل مرسيدس بتقييم موضع الضرر والأجزاء التي تأثرت به، ثم نوضح ما يمكن إصلاحه وما يحتاج إلى استبدال أو فحص إضافي. ضرر الصدام أو اللوح الخارجي قد يؤثر في قواعد أو حساسات خلفه، لذلك لا نعتمد على مظهر الطلاء وحده لتحديد العمل.",
    symptoms: [
      "انبعاج أو خدش عميق أو تلف في الطلاء",
      "ضرر في الصدام أو الرفرف أو الباب بعد احتكاك",
      "اختلاف في محاذاة الألواح أو إغلاق الأبواب",
      "تحذير حساس ظهر بعد ضرر خارجي أو إصلاح سابق"
    ],
    processSteps: [
      { title: "تقييم الضرر والوصول إلى الأجزاء", description: "نراجع موضع الصدمة وحالة الألواح والقواعد والأجزاء القريبة. إذا احتاج تقييم الضرر المخفي إلى فك، نوضح ذلك قبل توسيع العمل." },
      { title: "تحديد الإصلاح والطلاء", description: "نفصل إصلاح اللوح عن استبداله ونوضح المناطق التي تتطلب تجهيزاً أو طلاءً ومطابقة لون. يحدد الفحص حدود العمل وما يلزم من قطع ومثبتات." },
      { title: "مراجعة التشطيب والوظائف", description: "نراجع المحاذاة والإغلاق والتشطيب والأجزاء التي شملها العمل. نؤكد مسبقاً أي فحص أو معايرة لازمة للحساسات وإمكانية تنفيذها ضمن نطاق الإصلاح." }
    ],
    partsCopy: "يحدد العرض الألواح أو الصدامات أو القواعد والمثبتات والمواد وأعمال الطلاء المشمولة. أفلام الحماية PPF والسيراميك والتلميع خدمات منفصلة، ولا تعد بديلاً عن إصلاح ضرر في الهيكل أو طبقة الطلاء.",
    faqs: [
      { question: "هل يمكن إعطاء عرض نهائي لإصلاح الصدام من صورة؟", answer: "تساعد الصور على التقييم الأولي، لكن القواعد والحساسات والضرر خلف الصدام قد تحتاج إلى فحص مباشر. نوضح أي تغيير في النطاق إذا ظهر ضرر مخفي." },
      { question: "هل فيلم الحماية أو التلميع يخفي تلف الطلاء؟", answer: "يعتمد ذلك على نوع الأثر وعمقه، لكن تلف الطلاء أو تشوه اللوح يحتاج إلى تقييم إصلاح. خدمات الحماية والتلميع لها نطاق منفصل ولا تعالج كل أنواع الضرر." },
      { question: "هل يلزم فحص الحساسات بعد إصلاح الهيكل؟", answer: "يتوقف ذلك على موضع الضرر والأجزاء التي فكت أو تغيرت ومتطلبات السيارة. نحدد الفحص أو المعايرة اللازمة ونتحقق من إمكانية تنفيذها قبل الاتفاق على العمل." }
    ]
  },
  "steering-repair": {
    serviceName: "إصلاح نظام التوجيه",
    serviceType: "فحص المقود ومكونات توجيه مرسيدس",
    h1: "إصلاح نظام توجيه مرسيدس في دبي",
    metaTitle: "إصلاح توجيه مرسيدس في دبي | فحص المقود | ديجي تيك",
    metaDescription: "فحص توجيه مرسيدس في القوز عند ثقل المقود أو الاهتزاز أو الانحراف. تمييز عطل التوجيه عن الإطارات والتعليق قبل اختيار الإصلاح.",
    heroCopy: "ثقل المقود أو اهتزازه أو انحراف مرسيدس يحتاج إلى فحص ظروف العطل ونوع نظام التوجيه. قد تتشابه أعراض الإطارات والتعليق والفرامل مع مشكلة في التوجيه. نحدد السبب قبل اقتراح تغيير علبة التوجيه أو أي جزء آخر، ونوضح متطلبات الضبط أو المعايرة بحسب التجهيزات.",
    symptoms: [
      "ثقل غير معتاد في المقود أو تغير المساعدة",
      "اهتزاز المقود عند سرعة معينة أو أثناء الكبح",
      "انحراف السيارة أو عدم استقامة المقود",
      "صوت أو خلوص عند الالتفاف أو تحذير لنظام التوجيه"
    ],
    processSteps: [
      { title: "تمييز نوع النظام والأعراض", description: "نحدد نوع التوجيه المثبت ووقت ظهور الثقل أو الاهتزاز. نراجع أي ضربة للعجلة أو عمل سابق في الإطارات أو التعليق." },
      { title: "فحص التوجيه والأنظمة المتصلة", description: "نفحص الوصلات والمفاصل والتثبيت والخلوص، ونراجع المساعدة الكهربائية أو الدائرة الهيدروليكية بحسب السيارة. يشمل المسار العجلات والتعليق عندما تشير الأعراض إليها." },
      { title: "إصلاح السبب وضبط ما يلزم", description: "يحدد العرض القطعة أو التوصيلة التي ثبت خللها وأي فحص زوايا أو معايرة مطلوبة ومدعومة. نراجع استجابة التوجيه والأعراض بعد العمل في ظروف اختبار مناسبة." }
    ],
    partsCopy: "نطابق علبة التوجيه والأذرع والمفاصل والسوائل، إن وجدت، مع النظام المثبت. نوضح أي متطلبات تهيئة أو ضبط بعد الاستبدال، ولا نفترض أن اهتزاز المقود يستدعي تغيير العلبة.",
    faqs: [
      { question: "هل اهتزاز مقود مرسيدس يعني تلف علبة التوجيه؟", answer: "قد يرتبط بالإطارات أو اتزان العجلات أو التعليق أو الفرامل، خصوصاً إذا ظهر في سرعة محددة أو أثناء الكبح. الفحص يميز هذه الأسباب عن عطل التوجيه." },
      { question: "هل كل سيارات مرسيدس تحتاج إلى زيت باور؟", answer: "لا. تختلف أنظمة التوجيه بين كهربائية وهيدروليكية وغيرها بحسب التجهيزات. نؤكد النظام قبل اقتراح فحص سائل أو أي خدمة مرتبطة به." },
      { question: "هل ضبط الزوايا يعالج ثقل المقود؟", answer: "ليس في كل الحالات. نراجع ضغط الإطارات والمكونات والمساعدة والتحذيرات أولاً، ثم نحدد ما إذا كان ضبط الزوايا جزءاً من الحل." }
    ]
  },
  "exhaust-repair": {
    serviceName: "إصلاح نظام العادم",
    serviceType: "فحص تسريب وضوضاء ومكونات عادم مرسيدس",
    h1: "إصلاح عادم مرسيدس في دبي",
    metaTitle: "إصلاح عادم مرسيدس في دبي | فحص التسريب | ديجي تيك",
    metaDescription: "فحص عادم مرسيدس في القوز، دبي عند التسريب أو الضوضاء أو رائحة العادم. تشخيص المكونات والحساسات قبل اقتراح الإصلاح أو الاستبدال.",
    heroCopy: "صوت العادم المتغير أو الرائحة أو رسالة مرتبطة بالانبعاثات يحتاج إلى تحديد مصدر الخلل. نفحص الوصلات والتثبيت والمكونات والحساسات بحسب تجهيزات مرسيدس. إصلاح العادم لاستعادة وظيفته يختلف عن تعديل الصوت أو ترقية الأداء، ولا نعرض حذف تجهيزات الانبعاثات كإصلاح.",
    symptoms: [
      "ضوضاء أو رنين أو صوت تسريب من أسفل السيارة",
      "رائحة عادم غير معتادة حول السيارة أو داخل المقصورة",
      "تلف ظاهر أو ارتخاء في جزء من نظام العادم",
      "لمبة المحرك مع رموز تستدعي فحص الانبعاثات"
    ],
    processSteps: [
      { title: "تحديد موضع الصوت أو الرائحة", description: "نراجع نوع المحرك وتجهيزات العادم وظروف ظهور العرض. وجود رائحة في المقصورة يحتاج إلى فحص مباشر قبل الاستخدام المعتاد للسيارة." },
      { title: "فحص التسريب والبيانات", description: "نفحص الأنابيب والوصلات والعوازل والمثبتات والمكونات المعنية. عند ظهور رموز أعطال نربطها ببيانات الحساسات وحالة تشغيل المحرك قبل اتهام المحول الحفاز أو جزء آخر." },
      { title: "إصلاح المكون والتحقق من الإحكام", description: "نوضح إمكان الإصلاح أو الحاجة إلى استبدال الجزء بحسب حالته ومواصفاته. بعد العمل نراجع التسريب والضوضاء والتثبيت والبيانات المرتبطة بالإصلاح." }
    ],
    partsCopy: "يحدد العرض الجوانات والوصلات والمثبتات والأنابيب أو الحساسات المطلوبة. المكونات الخاصة بالانبعاثات تختار وفق تجهيزات السيارة، وأي تعديل أداء له تقييم ونطاق منفصل عن إصلاح العادم.",
    faqs: [
      { question: "هل رمز كفاءة المحول الحفاز يعني ضرورة تغييره فوراً؟", answer: "يلزم فحص الرمز مع أداء المحرك والتسريب وقراءات الحساسات. قد تؤثر أعطال أخرى في النتيجة، لذلك نحدد السبب قبل توصية الاستبدال." },
      { question: "هل صوت الرنين يحتاج إلى تغيير العادم بالكامل؟", answer: "قد يكون مصدره مثبتاً أو عازلاً حرارياً أو وصلة أو جزءاً داخلياً. الفحص يحدد موضعه وما إذا كان إصلاح جزء محدد كافياً." },
      { question: "هل خدمة إصلاح العادم تشمل رفع الصوت أو تعديل الأداء؟", answer: "الإصلاح يركز على الخلل المثبت ووظيفة النظام. طلبات تعديل الصوت أو الأداء تناقش كعمل منفصل بعد التحقق من ملاءمتها ومتطلباتها." }
    ]
  },
  "fuel-system-repair": {
    serviceName: "إصلاح نظام الوقود",
    serviceType: "فحص ضغط الوقود والمضخة والبخاخات",
    h1: "إصلاح نظام وقود مرسيدس في دبي",
    metaTitle: "إصلاح نظام وقود مرسيدس في دبي | ديجي تيك القوز",
    metaDescription: "فحص نظام وقود مرسيدس في القوز عند صعوبة التشغيل أو التقطيع أو ضعف العزم. اختبارات ضغط وتغذية وبخاخات حسب المحرك قبل اختيار القطع.",
    heroCopy: "صعوبة التشغيل أو تقطيع المحرك أو ضعف العزم قد يرتبط بالوقود، لكنه قد ينتج أيضاً عن الاشتعال أو الهواء أو التحكم. نختبر نظام الوقود المناسب لمحرك مرسيدس ونراجع الضغط والتغذية وبيانات التشغيل قبل اقتراح مضخة أو بخاخات أو إصلاح آخر.",
    symptoms: [
      "تأخر التشغيل أو توقف المحرك بصورة متقطعة",
      "تقطيع أو ضعف عزم تحت الحمل",
      "رموز أعطال تستدعي فحص ضغط الوقود أو الخليط",
      "رائحة وقود أو آثار تسريب تحتاج إلى تقييم مباشر"
    ],
    processSteps: [
      { title: "تحديد المحرك وظروف العطل", description: "نراجع نوع الوقود والمحرك وتاريخ الخدمة ووقت ظهور الشكوى. نحدد أولاً إن كانت الأعراض تستلزم تشخيصاً أوسع للهواء والاشتعال والتحكم." },
      { title: "اختبار الإمداد والضغط", description: "نراجع بيانات التشغيل وننفذ اختبارات الضغط والتغذية والتوصيلات والتسريب المناسبة للنظام. فحص البخاخات أو دائرة الضغط المرتفع يحدد بحسب النتائج وإمكانية الإجراء." },
      { title: "اعتماد الإصلاح ومراجعة التشغيل", description: "نوضح الجزء الذي ثبت خلله وأي أجزاء إحكام أو تهيئة لازمة ومدعومة. بعد التنفيذ نراجع الإحكام والضغط والتشغيل في الظروف المرتبطة بالشكوى." }
    ],
    partsCopy: "نختار المضخة والبخاخات والمرشحات والحساسات وأجزاء الإحكام وفق رقم الهيكل ونظام الحقن. تنظيف البخاخات أو تبديلها ليس إجراءً تلقائياً لكل تقطيع؛ ويحدد نطاقه بعد الفحص.",
    faqs: [
      { question: "هل صعوبة تشغيل مرسيدس تعني تلف طرمبة البنزين؟", answer: "قد تتعلق بالوقود أو البطارية أو بادئ التشغيل أو التحكم أو أسباب أخرى. نختبر المسار الذي تدعمه الأعراض والبيانات قبل التوصية بالمضخة." },
      { question: "هل تنظيف البخاخات يعالج كل حالات التقطيع؟", answer: "لا. قد ينتج التقطيع عن الاشتعال أو دخول الهواء أو الضغط الميكانيكي أو الوقود. نؤكد السبب وإمكانية الإجراء قبل اقتراح تنظيف أو استبدال." },
      { question: "ماذا أفعل عند وجود رائحة وقود قوية أو تسريب؟", answer: "توقف في مكان آمن وأطفئ المحرك وتجنب مصادر الاشتعال، ثم رتب فحص السيارة أو نقلها. لا تحاول فتح خطوط الوقود أو إصلاح التسريب بنفسك." }
    ]
  },
  "tire-repair": {
    serviceName: "فحص وإصلاح الإطارات",
    serviceType: "تقييم إطارات مرسيدس والاهتزاز وفقدان الضغط",
    h1: "فحص وإصلاح إطارات مرسيدس في دبي",
    metaTitle: "إصلاح إطارات مرسيدس في دبي | فحص الضغط والتآكل | ديجي تيك",
    metaDescription: "فحص إطارات مرسيدس في القوز، دبي عند فقدان الضغط أو الاهتزاز أو التآكل غير المنتظم. تقييم قابلية الإصلاح ومطابقة المقاس ومؤشرات التحمل.",
    heroCopy: "فقدان ضغط الإطار أو اهتزاز السيارة يحتاج إلى فحص الإطار والعجلة وظروف الاستخدام. نحدد موضع الضرر وحالة الإطار قبل تقرير إمكانية الإصلاح أو ضرورة الاستبدال. تختلف المقاسات والتجهيزات بين فئات مرسيدس، وقد تختلف الإطارات الأمامية والخلفية في السيارة نفسها.",
    symptoms: [
      "هبوط متكرر في ضغط أحد الإطارات",
      "اهتزاز يظهر عند سرعات محددة",
      "تآكل غير متساوٍ أو انتفاخ أو تلف ظاهر",
      "تحذير ضغط الإطارات أو ضرر بعد اصطدام بحفرة"
    ],
    processSteps: [
      { title: "تأكيد المقاس والتجهيز", description: "نراجع المقاسات الأمامية والخلفية ومؤشرات الحمولة والسرعة ونوع الإطار وتجهيز مراقبة الضغط. نأخذ في الحسبان تعديلات العجلات السابقة إن وجدت." },
      { title: "فحص الضرر ومصدر الاهتزاز", description: "نفحص موضع التسريب وحالة الإطار والصمام والعجلة. قابلية إصلاح الثقب تعتمد على موضعه وحجمه والحالة الداخلية وتاريخ السير بضغط منخفض، وليست مضمونة من الصورة." },
      { title: "إصلاح مناسب ومراجعة الضغط", description: "نوضح الإصلاح الممكن أو مواصفات البديل وأي حاجة إلى فحص الاتزان أو الزوايا. بعد العمل نراجع الضغط والتسريب وإجراء مراقبة الضغط المدعوم بحسب السيارة." }
    ],
    partsCopy: "يحدد العرض مواصفات الإطار والصمام أو حساس الضغط عند الحاجة والعمل المشمول. نراعي اختلاف مقاسات المحورين ومتطلبات مجموعة الإطارات بحسب السيارة، ولا نعتمد المقاس وحده لتأكيد التوافق.",
    faqs: [
      { question: "هل يمكن إصلاح أي ثقب في إطار مرسيدس؟", answer: "لا. يعتمد القرار على موضع الضرر وحجمه وحالة الإطار الداخلية ونوعه وتعليمات صانعه. تلف الجدار الجانبي أو الانتفاخ أو آثار السير بضغط منخفض يحتاج إلى تقييم مختلف." },
      { question: "هل تحذير ضغط الإطارات يعني تلف الحساس؟", answer: "قد يكون الضغط منخفضاً فعلاً أو يوجد تسريب، وقد يتعلق التحذير بالنظام أو الحساس. نتحقق من الضغط وحالة الإطارات أولاً ثم نفحص النظام عند الحاجة." },
      { question: "هل اتزان العجلات يعالج كل اهتزاز في السيارة؟", answer: "قد يكون الاهتزاز من الإطار أو العجلة أو التعليق أو الفرامل أو التوجيه. السرعة وظروف ظهوره والفحص تساعد على تحديد ما إذا كان الاتزان هو الإجراء المناسب." }
    ]
  }
};
const MERCEDES_ARABIC_RELATED_CONTENT = {
  "mechanical-repair": [
    { label: "تشخيص تحذيرات المحرك وضعف العزم", path: "/ar/services/mercedes-diagnostics-dubai" },
    { label: "خدمة زيت المحرك والفلتر", path: "/ar/services/mercedes-oil-change-dubai" },
    { label: "دليل أعطال مرسيدس وخيارات الإصلاح", path: "/ar/blog/mercedes-repair-dubai-complete-guide" },
    { label: "اختلاف المحرك والتبريد في AMG G63", path: "/ar/blog/mercedes-g63-service-dubai-guide" }
  ],
  "suspension-repair": [
    { label: "فحص نظام التوجيه واهتزاز المقود", path: "/ar/services/mercedes-steering-repair-dubai" },
    { label: "فحص تآكل الإطارات وفقدان الضغط", path: "/ar/services/mercedes-tire-repair-dubai" },
    { label: "دليل صيانة مرسيدس الفئة S", path: "/ar/blog/mercedes-s-class-service-dubai-guide" }
  ],
  "transmission-repair": [
    { label: "تشخيص رموز الأعطال باستخدام XENTRY", path: "/ar/services/mercedes-diagnostics-dubai" },
    { label: "فحص المحرك والقواعد والأعطال الميكانيكية", path: "/ar/services/mercedes-mechanical-repair-dubai" },
    { label: "دليل صيانة مرسيدس الفئة E", path: "/ar/blog/mercedes-e-class-service-dubai-guide" }
  ],
  "oil-change": [
    { label: "اختيار زيت مرسيدس ونطاق خدمة الزيت", path: "/ar/blog/best-oil-change-dubai-mercedes" },
    { label: "مواعيد صيانة مرسيدس في أجواء دبي", path: "/ar/blog/mercedes-service-intervals-dubai-heat" },
    { label: "فحص تسريب الزيت والأعطال الميكانيكية", path: "/ar/services/mercedes-mechanical-repair-dubai" },
    { label: "اختيار خدمة C200 وC240 وC300 حسب الجيل", path: "/ar/blog/mercedes-c-class-service-dubai-guide" }
  ],
  "ac-repair": [
    { label: "فحص التوصيلات والأعطال الكهربائية", path: "/ar/services/mercedes-electrical-repair-dubai" },
    { label: "تشخيص أنظمة التحكم في مرسيدس", path: "/ar/services/mercedes-diagnostics-dubai" },
    { label: "دليل تخطيط صيانة مرسيدس", path: "/ar/blog/mercedes-benz-maintenance-guide-dubai" }
  ],
  "battery-replacement": [
    { label: "تتبع تفريغ البطارية والأعطال الكهربائية", path: "/ar/services/mercedes-electrical-repair-dubai" },
    { label: "تشخيص رسائل التحذير والأنظمة المدعومة", path: "/ar/services/mercedes-diagnostics-dubai" }
  ],
  "brake-repair": [
    { label: "فحص اهتزاز المقود ونظام التوجيه", path: "/ar/services/mercedes-steering-repair-dubai" },
    { label: "فحص الإطارات والعجلات", path: "/ar/services/mercedes-tire-repair-dubai" },
    { label: "دليل تخطيط صيانة مرسيدس", path: "/ar/blog/mercedes-benz-maintenance-guide-dubai" }
  ],
  "engine-diagnostics": [
    { label: "إصلاح الدوائر والتوصيلات الكهربائية", path: "/ar/services/mercedes-electrical-repair-dubai" },
    { label: "إصلاح أعطال المحرك الميكانيكية", path: "/ar/services/mercedes-mechanical-repair-dubai" },
    { label: "دليل أعطال مرسيدس وخيارات الإصلاح", path: "/ar/blog/mercedes-repair-dubai-complete-guide" }
  ],
  "electrical-repair": [
    { label: "فحص مرسيدس باستخدام XENTRY", path: "/ar/services/mercedes-diagnostics-dubai" },
    { label: "اختبار البطارية واستبدالها عند الحاجة", path: "/ar/services/mercedes-battery-replacement-dubai" }
  ],
  "body-repair": [
    { label: "فحص الأعطال الكهربائية المرتبطة بالضرر", path: "/ar/services/mercedes-electrical-repair-dubai" },
    { label: "دليل تقييم أعطال مرسيدس والإصلاح", path: "/ar/blog/mercedes-repair-dubai-complete-guide" }
  ],
  "steering-repair": [
    { label: "فحص التعليق والأذرع والجلب", path: "/ar/services/mercedes-suspension-repair-dubai" },
    { label: "فحص الإطارات والاهتزاز", path: "/ar/services/mercedes-tire-repair-dubai" },
    { label: "تشخيص تحذيرات أنظمة مرسيدس", path: "/ar/services/mercedes-diagnostics-dubai" }
  ],
  "exhaust-repair": [
    { label: "تشخيص لمبة المحرك وبيانات الحساسات", path: "/ar/services/mercedes-diagnostics-dubai" },
    { label: "فحص الدخان وأداء المحرك", path: "/ar/services/mercedes-mechanical-repair-dubai" }
  ],
  "fuel-system-repair": [
    { label: "تشخيص التقطيع وضعف العزم", path: "/ar/services/mercedes-diagnostics-dubai" },
    { label: "فحص المحرك والأسباب الميكانيكية", path: "/ar/services/mercedes-mechanical-repair-dubai" }
  ],
  "tire-repair": [
    { label: "فحص انحراف السيارة واهتزاز المقود", path: "/ar/services/mercedes-steering-repair-dubai" },
    { label: "فحص التعليق والتآكل غير المنتظم", path: "/ar/services/mercedes-suspension-repair-dubai" }
  ]
};
const PORSCHE_RELATED_CONTENT = {
  "steering-repair": [
    { label: "Porsche suspension inspection", path: "/brands/porsche-service-dubai/suspension-repair" },
    { label: "Porsche Cayenne chassis guide", path: "/blog/porsche-cayenne-service-dubai-guide" },
    { label: "Porsche service and repair", path: "/brands/porsche-service-dubai" }
  ],
  "oil-change": [
    { label: "Porsche oil-change interval guidance", path: "/porsche/guides/oil-change-intervals" },
    { label: "Porsche 911 maintenance planning", path: "/blog/porsche-911-service-dubai-guide" },
    { label: "Porsche Cayenne maintenance planning", path: "/blog/porsche-cayenne-service-dubai-guide" },
    { label: "Porsche maintenance in Dubai", path: "/blog/porsche-maintenance-guide-dubai" }
  ],
  "transmission-repair": [
    { label: "How Porsche PDK works", path: "/porsche/systems/pdk" },
    { label: "PDK jerking: what to record before diagnosis", path: "/porsche/problems/pdk-jerking" },
    { label: "911 manual and PDK systems", path: "/blog/porsche-911-service-dubai-guide" },
    { label: "Macan PDK, PTM and driveline", path: "/porsche/macan" },
    { label: "Panamera PDK considerations", path: "/blog/porsche-panamera-service-dubai-guide" }
  ],
  "suspension-repair": [
    { label: "How PASM works", path: "/porsche/systems/pasm" },
    { label: "PASM fault warning: first checks", path: "/porsche/problems/pasm-fault" },
    { label: "Cayenne air suspension and chassis", path: "/blog/porsche-cayenne-service-dubai-guide" },
    { label: "Panamera PASM and air suspension", path: "/blog/porsche-panamera-service-dubai-guide" },
    { label: "Taycan chassis systems", path: "/porsche/taycan" }
  ],
  "engine-diagnostics": [
    { label: "Porsche check-engine light guidance", path: "/porsche/problems/check-engine-light" },
    { label: "Porsche 997 diagnostic considerations", path: "/porsche/911/997" },
    { label: "Porsche 991 diagnostic considerations", path: "/porsche/911/991" },
    { label: "Porsche 992 diagnostic considerations", path: "/porsche/911/992" }
  ],
  "mechanical-repair": [
    { label: "Porsche 911 cooling and engine systems", path: "/blog/porsche-911-service-dubai-guide" },
    { label: "Cayenne engine and cooling systems", path: "/blog/porsche-cayenne-service-dubai-guide" },
    { label: "718 powertrain and cooling", path: "/porsche/718" }
  ],
  "brake-repair": [
    { label: "Porsche PCCB explained", path: "/porsche/systems/pccb" },
    { label: "What a Porsche brake warning may mean", path: "/porsche/problems/brake-warning-light" },
    { label: "911 steel and PCCB systems", path: "/blog/porsche-911-service-dubai-guide" },
    { label: "Cayenne braking considerations", path: "/blog/porsche-cayenne-service-dubai-guide" },
    { label: "Taycan regenerative and friction brakes", path: "/porsche/taycan" }
  ],
  "electrical-repair": [
    { label: "Porsche battery warning guide", path: "/porsche/problems/battery-warning" },
    { label: "Taycan low-voltage and charging overview", path: "/porsche/taycan" },
    { label: "Panamera electrical considerations", path: "/blog/porsche-panamera-service-dubai-guide" },
    { label: "Macan electrical and diagnostic scope", path: "/porsche/macan" }
  ],
  "battery-replacement": [
    { label: "Porsche battery warning and charging checks", path: "/porsche/problems/battery-warning" },
    { label: "Taycan 12-volt system overview", path: "/porsche/taycan" },
    { label: "Porsche maintenance in Dubai", path: "/blog/porsche-maintenance-guide-dubai" },
    { label: "Porsche 992 electrical considerations", path: "/porsche/911/992" }
  ],
  "ac-repair": [
    { label: "911 cooling and AC considerations", path: "/blog/porsche-911-service-dubai-guide" },
    { label: "Cayenne climate-system considerations", path: "/blog/porsche-cayenne-service-dubai-guide" },
    { label: "Taycan thermal-management overview", path: "/porsche/taycan" }
  ]
};
const MERCEDES_RELATED_CONTENT = {
  "oil-change": [
    { label: "Mercedes Service A/B and maintenance booking", path: "/brands/mercedes-benz-service-dubai#mercedes-maintenance-scope" },
    { label: "How Mercedes service costs are calculated", path: "/blog/mercedes-service-cost-dubai-guide" },
    { label: "ASSYST and Mercedes service intervals", path: "/blog/mercedes-service-intervals-dubai-heat" },
    { label: "How oil approvals are selected", path: "/blog/oil-specification-guide-dubai-luxury" }
  ],
  "brake-repair": [
    { label: "Brake inspection and repair guide", path: "/blog/brake-repair-dubai" },
    { label: "C63 AMG brake-package considerations", path: "/mercedes/models/c63-service-repair-dubai" },
    { label: "Steering vibration beyond the brakes", path: "/services/mercedes-steering-repair-dubai#steering-vibration" }
  ],
  "body-repair": [
    { label: "Body repair and paintwork scope", path: "/services/car-body-repair-dubai" },
    { label: "Paint protection film options", path: "/services/paint-protection-film" },
    { label: "Documented G63 conversion project", path: "/blog/g63-to-brabus-g800-conversion-dubai" }
  ],
  "steering-repair": [
    { label: "Mercedes suspension assessment", path: "/services/mercedes-suspension-repair-dubai" },
    { label: "Tyre damage and pressure checks", path: "/services/mercedes-tire-repair-dubai" }
  ],
  "exhaust-repair": [
    { label: "Check-engine and emissions warnings", path: `${MERCEDES_PROBLEMS_PATH}/check-engine-light` },
    { label: "Engine checks for white or blue exhaust smoke", path: "/services/mercedes-mechanical-repair-dubai#exhaust-smoke" },
    { label: "Performance hardware and tuning assessment", path: "/tuning" }
  ],
  "fuel-system-repair": [
    { label: "Cranking without starting: the diagnostic sequence", path: `${MERCEDES_PROBLEMS_PATH}/wont-start` },
    { label: "Rough idle, misfire and engine shaking", path: "/services/mercedes-mechanical-repair-dubai#rough-idle" }
  ],
  "tire-repair": [
    { label: "Steering vibration and pulling checks", path: "/services/mercedes-steering-repair-dubai#steering-vibration" },
    { label: "Suspension inspection after an impact", path: "/services/mercedes-suspension-repair-dubai" }
  ],
  "transmission-repair": [
    { label: "7G and 9G transmission service guide", path: "/blog/transmission-service-7g-9g-dubai" },
    { label: "Why a Mercedes gearbox jerks", path: `${MERCEDES_PROBLEMS_PATH}/gearbox-jerking` },
    { label: "How to recognise transmission slipping", path: `${MERCEDES_PROBLEMS_PATH}/transmission-slipping` },
    { label: "E-Class transmission considerations", path: "/blog/mercedes-e-class-service-dubai-guide" }
  ],
  "suspension-repair": [
    { label: "What an AIRMATIC malfunction means", path: `${MERCEDES_PROBLEMS_PATH}/airmatic-malfunction` },
    { label: "Why air suspension drops overnight", path: `${MERCEDES_PROBLEMS_PATH}/suspension-dropping-overnight` },
    { label: "Mercedes diagnostics for control and sensor warnings", path: "/services/mercedes-diagnostics-dubai" },
    { label: "S-Class suspension systems", path: "/blog/mercedes-s-class-service-dubai-guide" }
  ],
  "engine-diagnostics": [
    { label: "Electrical and ECU hardware faults", path: "/services/mercedes-electrical-repair-dubai" },
    { label: "Mercedes battery and 48V warning guide", path: `${MERCEDES_PROBLEMS_PATH}/battery-warning` },
    { label: "Mercedes check-engine light guide", path: `${MERCEDES_PROBLEMS_PATH}/check-engine-light` },
    { label: "Mercedes won't-start guide", path: `${MERCEDES_PROBLEMS_PATH}/wont-start` },
    { label: "Browse all Mercedes diagnostic guides", path: MERCEDES_PROBLEMS_PATH }
  ],
  "mechanical-repair": [
    { label: "Mercedes transmission and gearbox assessment", path: "/services/mercedes-transmission-repair-dubai" },
    { label: "What to do when a Mercedes overheats", path: `${MERCEDES_PROBLEMS_PATH}/engine-overheating` },
    { label: "How a Mercedes oil leak is traced", path: `${MERCEDES_PROBLEMS_PATH}/oil-leak` },
    { label: "AMG G63 platform guide", path: "/blog/mercedes-g63-service-dubai-guide" }
  ],
  "ac-repair": [
    { label: "Why Mercedes AC stops cooling", path: `${MERCEDES_PROBLEMS_PATH}/ac-not-cooling` },
    { label: "GLE cooling and climate considerations", path: "/mercedes/models/gle-service-repair-dubai" },
    { label: "GLS three-row climate considerations", path: "/mercedes/models/gls-service-repair-dubai" }
  ],
  "battery-replacement": [
    { label: "What a Mercedes battery warning means", path: `${MERCEDES_PROBLEMS_PATH}/battery-warning` },
    { label: "Mercedes won't-start guide", path: `${MERCEDES_PROBLEMS_PATH}/wont-start` },
    { label: "E-Class 12V and 48V considerations", path: "/blog/mercedes-e-class-service-dubai-guide" }
  ],
  "electrical-repair": [
    { label: "Head-unit and COMAND fault repair", path: "/services/head-unit-repair-dubai" },
    { label: "Mercedes stereo and sound-system upgrades", path: "/services/mercedes-audio-upgrade-dubai" },
    { label: "Car electrical diagnosis and wiring repair", path: "/services/auto-electrical-repair-dubai" },
    { label: "Supported diagnostics, coding and programming", path: "/services/mercedes-diagnostics-dubai" },
    { label: "Mercedes battery and charging warnings", path: `${MERCEDES_PROBLEMS_PATH}/battery-warning` },
    { label: "No-crank and crank-no-start diagnosis", path: `${MERCEDES_PROBLEMS_PATH}/wont-start` },
    { label: "S-Class electrical considerations", path: "/blog/mercedes-s-class-service-dubai-guide" }
  ]
};
const FERRARI_RELATED_CONTENT = {
  "oil-change": [
    { label: "Ferrari 296 hybrid maintenance considerations", path: "/brands/ferrari-service-dubai/296" },
    { label: "Ferrari 812 V12 maintenance considerations", path: "/brands/ferrari-service-dubai/812" },
    { label: "Ferrari maintenance guide for Dubai", path: FERRARI_MAINTENANCE_GUIDE_PATH }
  ],
  "brake-repair": [
    { label: "Ferrari 296 regenerative braking overview", path: "/brands/ferrari-service-dubai/296" },
    { label: "Ferrari 812 brake-system overview", path: "/brands/ferrari-service-dubai/812" },
    { label: "Ferrari Purosangue braking considerations", path: "/brands/ferrari-service-dubai/purosangue" }
  ],
  "transmission-repair": [
    { label: "Portofino seven- versus eight-speed DCT", path: "/brands/ferrari-service-dubai/portofino" },
    { label: "Ferrari 812 seven-speed transaxle overview", path: "/brands/ferrari-service-dubai/812" },
    { label: "Purosangue eight-speed DCT and 4RM-S evo", path: "/brands/ferrari-service-dubai/purosangue" }
  ],
  "suspension-repair": [
    { label: "Portofino SCM-E suspension overview", path: "/brands/ferrari-service-dubai/portofino" },
    { label: "Ferrari 812 steering and SCM-E overview", path: "/brands/ferrari-service-dubai/812" },
    { label: "Purosangue TASV active suspension", path: "/brands/ferrari-service-dubai/purosangue" }
  ],
  "engine-diagnostics": [
    { label: "Ferrari 296 hybrid diagnostic scope", path: "/brands/ferrari-service-dubai/296" },
    { label: "Ferrari 812 V12 diagnostic considerations", path: "/brands/ferrari-service-dubai/812" },
    { label: "Purosangue V12 and chassis diagnostics", path: "/brands/ferrari-service-dubai/purosangue" }
  ],
  "mechanical-repair": [
    { label: "Portofino V8 and roof-system overview", path: "/brands/ferrari-service-dubai/portofino" },
    { label: "Ferrari 812 V12 and transaxle overview", path: "/brands/ferrari-service-dubai/812" },
    { label: "Purosangue V12 and 4RM-S evo overview", path: "/brands/ferrari-service-dubai/purosangue" }
  ],
  "electrical-repair": [
    { label: "Ferrari 296 hybrid and low-voltage scope", path: "/brands/ferrari-service-dubai/296" },
    { label: "Portofino roof and electrical systems", path: "/brands/ferrari-service-dubai/portofino" },
    { label: "Purosangue 12-volt, 48-volt and comfort systems", path: "/brands/ferrari-service-dubai/purosangue" }
  ],
  "battery-replacement": [
    { label: "Ferrari 296 low-voltage and hybrid considerations", path: "/brands/ferrari-service-dubai/296" },
    { label: "Portofino storage and roof-system considerations", path: "/brands/ferrari-service-dubai/portofino" },
    { label: "Purosangue 12-volt and 48-volt considerations", path: "/brands/ferrari-service-dubai/purosangue" }
  ],
  "ac-repair": [
    { label: "Ferrari 296 thermal-management overview", path: "/brands/ferrari-service-dubai/296" },
    { label: "Portofino cooling and AC considerations", path: "/brands/ferrari-service-dubai/portofino" },
    { label: "Purosangue four-seat climate considerations", path: "/brands/ferrari-service-dubai/purosangue" }
  ]
};
const serviceNamesArabic = {
  "oil-change": "تغيير الزيت",
  "brake-repair": "إصلاح الفرامل",
  "transmission-repair": "إصلاح ناقل الحركة",
  "ac-repair": "إصلاح التكييف",
  "suspension-repair": "إصلاح التعليق",
  "engine-diagnostics": "تشخيص المحرك",
  "mechanical-repair": "الإصلاح الميكانيكي",
  "steering-repair": "إصلاح نظام التوجيه",
  "battery-replacement": "تبديل البطارية",
  "electrical-repair": "إصلاح الكهرباء",
  "exhaust-repair": "إصلاح العادم",
  "fuel-system-repair": "إصلاح نظام الوقود",
  "body-repair": "إصلاح الهيكل",
  "tire-repair": "إصلاح الإطارات",
  "soft-close-door-installation": "تركيب وإصلاح الإغلاق الناعم للأبواب"
};
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
const MERCEDES_SERVICE_SCOPE = {
  ...MERCEDES_ADDITIONAL_SERVICE_SCOPE,
  "engine-diagnostics": {
    heading: "Mercedes systems we diagnose",
    intro: "Start with the exact warning or behaviour. Compatible scan data is combined with the physical, electrical or mechanical test the affected system requires.",
    items: [
      { title: "Engine and drivability", description: "Check-engine lights, misfires, reduced power and intermittent running faults.", path: `${MERCEDES_PROBLEMS_PATH}/check-engine-light` },
      { title: "No-start, 12V and 48V", description: "No power, no crank, crank-no-start and battery or charging warnings follow different test paths.", path: `${MERCEDES_PROBLEMS_PATH}/wont-start` },
      { title: "7G, 9G and AMG gearboxes", description: "Shift warnings, harsh engagement and live transmission data are assessed with the fitted unit identified.", path: `${MERCEDES_PROBLEMS_PATH}/gearbox-jerking` },
      { title: "AIRMATIC and active chassis", description: "Ride-height, pressure, voltage and sensor evidence are compared before a component is proposed.", path: `${MERCEDES_PROBLEMS_PATH}/airmatic-malfunction` },
      { title: "AC and body electronics", description: "Climate, comfort, communication and control faults are traced beyond a basic emissions-code scan.", path: `${MERCEDES_PROBLEMS_PATH}/ac-not-cooling` },
      { title: "Coding and programming", description: "VIN, module, requested function, software compatibility and required access are checked before acceptance." }
    ]
  },
  "oil-change": {
    heading: "What your Mercedes oil service includes",
    intro: "The quote identifies the engine-specific oil service first, then separates any additional Service A, Service B or fault-related work.",
    items: [
      { title: "VIN and engine check", description: "Confirm the exact engine, model year, service display and available history." },
      { title: "MB oil approval", description: "Select the required approval and viscosity from vehicle-specific information." },
      { title: "Oil, filter and seal", description: "List the proposed products, filter, drain seal and required fill quantity." },
      { title: "Level and leak check", description: "Set the level using the vehicle procedure and inspect the serviced area for leakage." },
      { title: "Supported ASSYST reset", description: "Reset the relevant reminder only for completed work and where the procedure is supported." },
      { title: "Itemized record", description: "Record the oil service and show inspections, extra filters or repairs as separate scope." }
    ]
  },
  "suspension-repair": {
    heading: "Match the suspension symptom to the right test",
    intro: "Parked height, warning text, compressor behaviour and fitted suspension narrow the test plan; none proves a failed part alone.",
    items: [
      { title: "AIRMATIC malfunction or Vehicle Too Low", description: "Compare pressure, actual height, voltage and stored fault context.", path: `${MERCEDES_PROBLEMS_PATH}/airmatic-malfunction` },
      { title: "One corner or the rear drops overnight", description: "Use controlled height and leak-retention checks before blaming the compressor.", path: `${MERCEDES_PROBLEMS_PATH}/suspension-dropping-overnight` },
      { title: "Compressor runs repeatedly", description: "Test pressure build, current, supply and the leak that may be increasing run time." },
      { title: "Air lines, fittings or valve block", description: "Trace the pneumatic path and isolate the source before parts are ordered." },
      { title: "E-Class rear self-levelling", description: "Confirm whether the exact saloon or estate uses steel springs, rear levelling or AIRMATIC.", path: "/blog/mercedes-e-class-service-dubai-guide" },
      { title: "GLE or GLS sits low", description: "Identify AIRMATIC or E-ACTIVE equipment and test the relevant rear or corner circuit.", path: "/mercedes/models/gle-service-repair-dubai" }
    ]
  }
};
const MERCEDES_MODEL_PATHS = {
  "C-Class": "/blog/mercedes-c-class-service-dubai-guide",
  "E-Class": "/blog/mercedes-e-class-service-dubai-guide",
  "S-Class": "/blog/mercedes-s-class-service-dubai-guide",
  "G-Class": "/mercedes/models/g-class-service-repair-dubai",
  GLE: "/mercedes/models/gle-service-repair-dubai",
  GLS: "/mercedes/models/gls-service-repair-dubai"
};
const MERCEDES_SERVICE_MEDIA = {
  "engine-diagnostics": {
    src: mercedesEngineWorkshop,
    alt: "Mercedes-AMG engine undergoing diagnostic inspection at Digi-Tec in Dubai",
    caption: "Mercedes-AMG engine inspection at Digi-Tec. Scan results are checked against the vehicle and the affected system before repair is proposed.",
    width: 1086,
    height: 1448
  },
  "suspension-repair": {
    src: suspensionRepairImage,
    alt: "Mercedes suspension, steering and brake hardware ready for inspection",
    caption: "Mercedes suspension hardware differs by chassis and equipment. Vehicle identification comes before leak, pressure, sensor or wear testing.",
    width: 1600,
    height: 1066
  }
};
const astonServiceOverride = (combo) => {
  const content = ASTON_SERVICES.find((s) => s.slug === combo.serviceSlug);
  if (!content) return combo;
  const name = combo.serviceSlug === "mechanical-repair" ? "Engine & Mechanical Repair" : combo.serviceName;
  return {
    ...combo,
    h1: `Aston Martin ${name} Dubai`,
    metaTitle: `Aston Martin ${name} Dubai | DIGI-TEC`,
    metaDescription: `Aston Martin ${content.title.toLowerCase()} in Al Quoz, Dubai. Discuss symptoms, inspection findings and a vehicle-specific estimate with DIGI-TEC.`,
    heroCopy: content.copy,
    symptoms: content.concerns,
    partsCopy: "The estimate identifies proposed parts and fluids, their specification and availability. The exact vehicle and findings determine the work. Ask about the options before approving the quote.",
    processSteps: [{ title: "Record the concern", description: "Review model, year, mileage, history and when the symptom occurs." }, { title: "Inspect the relevant system", description: content.check }, { title: "Explain findings and estimate", description: "Separate confirmed findings from further tests. Confirm parts, accepted scope, labour and timing before approval." }, { title: "Complete agreed work", description: "Carry out approved work and relevant verification, recording the service or repair performed." }],
    faqs: [{ question: content.question, answer: content.answer }, { question: `What affects Aston Martin ${content.title.toLowerCase()} cost?`, answer: "The model, fitted equipment, diagnostic time, findings, parts and labour determine the estimate." }, { question: "What information should I send?", answer: "Send the model, year, mileage and concern. A VIN is not required for the initial enquiry." }],
    whatsAppMessage: `Hello DIGI-TEC, I would like to discuss Aston Martin ${content.title.toLowerCase()}. Model/year: Mileage: Symptoms: Preferred time:`
  };
};
const mcLarenServiceOverride = (combo) => {
  const enquiry = `Hi DIGI-TEC, I would like to request a McLaren ${combo.serviceName.toLowerCase()} assessment.

Model: 
Year: 
Mileage: 
Warning or symptoms: `;
  const shared = {
    whatsAppMessage: enquiry,
    partsCopy: "Parts, fluids and procedures are selected only after the VIN, fitted system and inspection findings are reviewed. The estimate identifies the proposed option and availability before approval; no one specification is applied to every McLaren model."
  };
  if (combo.serviceSlug === "transmission-repair") return {
    ...combo,
    ...shared,
    h1: "McLaren Transmission Repair Dubai",
    metaTitle: "McLaren Transmission Repair Dubai | DIGI-TEC",
    metaDescription: "McLaren transmission and gearbox assessment in Al Quoz, Dubai. Discuss DCT or SSG warnings, shift concerns, leaks and service scope with DIGI-TEC.",
    heroCopy: "DIGI-TEC assesses McLaren gearbox warnings, shift concerns, leaks and drivability symptoms in Al Quoz. The VIN and fitted transmission are identified first because seven-speed SSG/DCT and Artura eight-speed DCT systems have different fluids, procedures and supported functions. Service, clutch, calibration or internal repair availability is confirmed after assessment.",
    symptoms: ["Transmission or gearbox warning displayed", "Delayed, harsh or inconsistent engagement", "Change in shift quality or clutch behaviour", "Fluid leak or unusual noise near the transmission"],
    processSteps: [{ title: "Identify the fitted transmission", description: "Confirm the model, VIN, gearbox variant, history and reported symptom." }, { title: "Assess the concern", description: "Review compatible fault data, leaks, fluid condition and drivability where appropriate." }, { title: "Define the supported scope", description: "Confirm fluid, parts, service functions and whether further specialist repair is available." }, { title: "Estimate before approval", description: "Explain the findings, proposed work and expected timing before authorised work begins." }],
    faqs: [{ question: "Do all McLaren models use the same gearbox?", answer: "No. Transmission design and specification vary by model and generation; Artura also uses a different hybrid transmission arrangement. The VIN and fitted unit are confirmed before fluid or procedures are proposed." }, { question: "Can a fluid service fix a gearbox warning?", answer: "A fluid service is not a universal fix. The warning, fault data, condition and symptoms must be assessed first. The recommended service or repair depends on the findings." }, { question: "Do you rebuild McLaren gearboxes?", answer: "Assessment is available. Internal repair, clutch, mechatronic, calibration and rebuild scope must be confirmed for the exact transmission after diagnosis; this page does not promise every operation." }, { question: "What determines the estimate?", answer: "Diagnostic time, the fitted gearbox, service or repair scope, parts and fluid requirements, and availability determine the estimate." }]
  };
  if (combo.serviceSlug === "engine-diagnostics") return {
    ...combo,
    ...shared,
    h1: "McLaren Engine Diagnostics Dubai",
    metaTitle: "McLaren Engine Diagnostics Dubai | DIGI-TEC",
    metaDescription: "McLaren warning-light and drivability diagnostics in Al Quoz, Dubai. Compatible scan coverage and physical testing are confirmed for the vehicle.",
    heroCopy: "DIGI-TEC assesses McLaren warning lights, reduced performance, misfires, starting concerns and intermittent faults. Compatible scan coverage, live data and physical testing are matched to the exact model and complaint. A stored code is evidence for diagnosis, not proof that the named component must be replaced.",
    symptoms: ["Engine or powertrain warning displayed", "Misfire, rough idle or hesitation", "Reduced performance or unusual drivability", "Starting, low-voltage or intermittent electrical concern"],
    processSteps: [{ title: "Record the exact symptom", description: "Review the warning text, when it occurs, recent work and service history." }, { title: "Confirm diagnostic coverage", description: "Check compatible module access and collect supported fault and live data." }, { title: "Test the likely system", description: "Use suitable electrical or mechanical checks rather than replacing a part from a code alone." }, { title: "Explain the next step", description: "Separate confirmed faults from further testing and quote approved work." }],
    faqs: [{ question: "Can you clear a McLaren warning light?", answer: "Codes may be cleared where supported, but clearing a warning does not repair its cause. The diagnostic aim is to identify the reason and explain the next step." }, { question: "Do you program McLaren modules?", answer: "Programming is not assumed. Module, security and software access and workshop capability must be confirmed for the exact vehicle before such work is accepted." }, { question: "How much does diagnosis cost?", answer: "The fee depends on the concern, module access and test time. The initial assessment scope and price are confirmed before work." }, { question: "What should I send before booking?", answer: "Send the model, year, mileage, exact warning, symptoms and when they occur. Photos or a short video may help describe an intermittent concern." }]
  };
  if (combo.serviceSlug === "oil-change") return {
    ...combo,
    ...shared,
    h1: "McLaren Oil Change & Maintenance Dubai",
    metaTitle: "McLaren Oil Change & Maintenance Dubai | DIGI-TEC",
    metaDescription: "McLaren oil service and maintenance assessment in Al Quoz, Dubai. Oil, filters and service scope are matched to the exact model and year.",
    heroCopy: "McLaren oil and maintenance requirements vary by model, engine, year and market. DIGI-TEC reviews the VIN, service information, mileage, history and use before confirming the correct oil, filter, seals, inspection items and supported service reset. No universal grade or interval is published for every McLaren.",
    symptoms: ["Service or maintenance reminder due", "Unknown or incomplete service history", "Oil level warning or evidence of a leak", "Preparing a stored or recently purchased vehicle for use"],
    processSteps: [{ title: "Review model and history", description: "Confirm the VIN, year, mileage, previous service and intended use." }, { title: "Verify the service specification", description: "Identify the applicable oil, filter, fluids and inspection items from vehicle-specific information." }, { title: "Inspect before adding work", description: "Check relevant leaks, levels and visible condition; explain any separate concerns." }, { title: "Complete the agreed scope", description: "Carry out the approved service and supported reset, then record the work." }],
    faqs: [{ question: "Which oil does my McLaren need?", answer: "The correct approval and viscosity depend on the exact model, engine, year and market. They are verified from vehicle-specific information before quotation." }, { question: "How often should a McLaren be serviced?", answer: "Follow the schedule for the exact model and year, then consider mileage, history, storage and use. One interval is not applied to every McLaren." }, { question: "Do you offer major and minor service packages?", answer: "The workshop confirms the maintenance items due for the vehicle rather than inventing a universal package. Ask for an itemised scope." }, { question: "What determines oil-service cost?", answer: "The model, required oil quantity and specification, filters, seals, due inspection items and any separate findings determine the estimate." }]
  };
  if (combo.serviceSlug === "mechanical-repair") return {
    ...combo,
    ...shared,
    h1: "McLaren Engine & Mechanical Repair Dubai",
    metaTitle: "McLaren Engine & Mechanical Repair Dubai | DIGI-TEC",
    metaDescription: "McLaren engine, cooling and mechanical assessment in Al Quoz, Dubai. Repair scope is confirmed from the vehicle, symptoms and inspection findings.",
    heroCopy: "DIGI-TEC assesses McLaren oil leaks, coolant loss, overheating, unusual engine noise and drivability concerns. The exact engine, conventional or hybrid platform, symptoms and test findings determine the next step. Engine removal, internal repair, hybrid high-voltage work and specialist calibration are not assumed and must be confirmed separately.",
    symptoms: ["Coolant loss, temperature warning or overheating", "Oil leak, unusual smell or visible fluid", "Unusual engine noise, vibration or reduced performance", "Mechanical concern found during service or diagnosis"],
    processSteps: [{ title: "Document the concern", description: "Record the warning, operating conditions, history and any recent work." }, { title: "Inspect and test", description: "Combine compatible diagnostics with cooling, leak or mechanical tests appropriate to the symptom." }, { title: "Confirm capability and parts", description: "Define the supported repair, further specialist work and vehicle-specific parts before approval." }, { title: "Verify agreed work", description: "Complete the approved scope and appropriate post-repair checks." }],
    faqs: [{ question: "Can you assess McLaren overheating or coolant loss?", answer: "Yes, an assessment can review the warning, visible leaks, cooling performance and related data. The repair scope depends on the source and vehicle." }, { question: "Do you repair Artura high-voltage systems?", answer: "High-voltage repair is not advertised here. Conventional checks and the concern can be discussed, but training, access and supported high-voltage scope require explicit confirmation before booking." }, { question: "Do you repair carbon-tub structural damage?", answer: "Carbon-tub structural repair is not promised by this page. Body damage needs a separate assessment and confirmation of an appropriate repair route." }, { question: "How is the estimate prepared?", answer: "The estimate follows identification, testing and the supported repair scope. Parts, access, further testing and specialist operations affect cost and timing." }]
  };
  return { ...combo, ...shared };
};
const rollsRoyceServiceOverride = (combo) => {
  const shared = {
    whatsAppMessage: `Hi DIGI-TEC, I would like to request a Rolls-Royce ${combo.serviceName.toLowerCase()} assessment.

Model: 
Year: 
Mileage: 
Service history: 
Warning or symptoms: `,
    partsCopy: "Parts, fluids and procedures are selected after the exact Rolls-Royce, fitted system and inspection findings are reviewed. The itemised estimate identifies the proposed option and availability before approval; one specification is not applied to every model or generation."
  };
  if (combo.serviceSlug === "engine-diagnostics") return {
    ...combo,
    ...shared,
    h1: "Rolls-Royce Engine Diagnostics Dubai",
    metaTitle: "Rolls-Royce Engine Diagnostics Dubai | DIGI-TEC",
    metaDescription: "Rolls-Royce warning-light and drivability diagnostics in Al Quoz, Dubai. Compatible scan coverage and physical testing are confirmed for the vehicle.",
    heroCopy: "DIGI-TEC assesses Rolls-Royce warning messages, misfires, starting concerns and changes in drivability. Compatible module access, available fault data and physical testing are matched to the exact model and complaint. A stored code is a starting point for diagnosis, not proof that the named component has failed.",
    symptoms: ["Engine or powertrain warning displayed", "Misfire, rough running or reduced performance", "Starting, low-voltage or intermittent concern", "Warning that returns after previous work"],
    processSteps: [{ title: "Record the exact concern", description: "Review the warning text, operating conditions, model year, history and recent work." }, { title: "Confirm diagnostic coverage", description: "Check compatible module access and collect supported fault and live data." }, { title: "Test the affected system", description: "Use suitable electrical or mechanical checks instead of replacing a part from a code alone." }, { title: "Explain and quote the next step", description: "Separate confirmed faults from further testing and quote supported work before approval." }],
    faqs: [{ question: "Can you clear a Rolls-Royce warning light?", answer: "Codes may be cleared where supported, but clearing a warning does not repair its cause. The aim is to identify the reason and explain the appropriate next step." }, { question: "Do you use manufacturer-level Rolls-Royce diagnostics?", answer: "That claim is not made. Compatible coverage and supported functions are confirmed for the exact vehicle; coding, programming and security access are not assumed." }, { question: "Can a code identify the failed part?", answer: "Not by itself. Fault context, physical testing and the vehicle condition may be needed before a component is recommended." }, { question: "What should I send before booking?", answer: "Send the model, year, mileage, exact warning, symptoms, when they occur and any recent work." }]
  };
  if (combo.serviceSlug === "mechanical-repair") return {
    ...combo,
    ...shared,
    h1: "Rolls-Royce Engine & Mechanical Repair Dubai",
    metaTitle: "Rolls-Royce Engine Repair Dubai | DIGI-TEC",
    metaDescription: "Rolls-Royce engine, cooling and mechanical assessment in Al Quoz, Dubai. Repair scope follows vehicle identification and inspection findings.",
    heroCopy: "DIGI-TEC assesses Rolls-Royce oil leaks, coolant loss, overheating, unusual noise and drivability concerns. The exact combustion model, engine, history, symptoms and test findings determine the repair route. Spectre is electric and is not included in combustion-engine service or repair descriptions.",
    symptoms: ["Coolant loss, temperature warning or overheating", "Oil leak, unusual smell or visible fluid", "Unusual engine noise, vibration or reduced performance", "Mechanical concern found during maintenance or diagnosis"],
    processSteps: [{ title: "Identify the vehicle and concern", description: "Confirm the model, year, history, warning and operating conditions." }, { title: "Inspect and test", description: "Combine compatible diagnostics with leak, cooling or mechanical tests appropriate to the symptom." }, { title: "Confirm capability and parts", description: "Define the supported repair, parts and any specialist route before approval." }, { title: "Verify the agreed work", description: "Complete the approved scope and appropriate post-repair checks." }],
    faqs: [{ question: "Can you assess Rolls-Royce overheating or coolant loss?", answer: "The concern can be assessed with checks appropriate to the exact vehicle. Repair scope depends on identifying the source." }, { question: "Is Spectre included on this engine-repair page?", answer: "No. Spectre is fully electric and is not associated with V12 oil service, spark plugs, exhaust work or combustion-engine diagnosis." }, { question: "Do you repair every Rolls-Royce engine internally?", answer: "No universal internal-engine capability is promised. The team confirms the supported repair route after identification and diagnosis." }, { question: "How is the estimate prepared?", answer: "The estimate follows inspection and the confirmed scope, with diagnostic time, access, parts and further specialist operations identified where applicable." }]
  };
  if (combo.serviceSlug === "transmission-repair") return {
    ...combo,
    ...shared,
    h1: "Rolls-Royce Transmission Repair Dubai",
    metaTitle: "Rolls-Royce Transmission Repair Dubai | DIGI-TEC",
    metaDescription: "Rolls-Royce transmission and gearbox assessment in Al Quoz, Dubai for warnings, leaks, engagement and shift-quality concerns.",
    heroCopy: "DIGI-TEC assesses Rolls-Royce gearbox warnings, leaks, delayed engagement and changes in shift quality. Transmission specification and functions vary by model and generation, so the fitted unit, service history and evidence are identified before fluid, parts, adaptation or repair work is proposed.",
    symptoms: ["Transmission or gearbox warning displayed", "Delayed, harsh or inconsistent engagement", "Change in shift quality or drivability", "Fluid leak or unusual noise near the transmission"],
    processSteps: [{ title: "Identify the fitted transmission", description: "Confirm the exact model, year, gearbox, history and reported symptom." }, { title: "Assess the evidence", description: "Review supported fault data, leaks, fluid condition and drivability where appropriate." }, { title: "Define the supported scope", description: "Confirm fluid, parts, service functions and repair availability for the fitted unit." }, { title: "Estimate before approval", description: "Explain findings, proposed work and timing before authorised work begins." }],
    faqs: [{ question: "Do all Rolls-Royce models use the same transmission?", answer: "No. The fitted transmission and applicable procedures must be confirmed for the exact model and generation." }, { question: "Can a fluid service fix a gearbox warning?", answer: "Not necessarily. The warning, data, condition and symptoms should be assessed before service or repair is recommended." }, { question: "Is satellite-aided transmission fitted to every Rolls-Royce?", answer: "No. Rolls-Royce describes it for relevant newer Ghost engineering; the feature is not assumed across all models and generations." }, { question: "Do you rebuild every Rolls-Royce gearbox?", answer: "No. Internal repair, mechatronic, converter and rebuild availability is confirmed for the exact unit after diagnosis." }]
  };
  if (combo.serviceSlug === "suspension-repair") return {
    ...combo,
    ...shared,
    h1: "Rolls-Royce Air Suspension Repair Dubai",
    metaTitle: "Rolls-Royce Suspension Repair Dubai | DIGI-TEC",
    metaDescription: "Rolls-Royce ride-height, air-suspension and ride-quality assessment in Al Quoz, Dubai. Fitted systems and repair scope are confirmed first.",
    heroCopy: "DIGI-TEC assesses ride-height warnings, leaning, compressor operation, leaks, suspension noise and changes in ride quality. The fitted system varies by model and generation. Planar and Flagbearer references are limited to the relevant newer Ghost generation rather than applied to every Rolls-Royce.",
    symptoms: ["Suspension or ride-height warning", "Vehicle sits unevenly or changes height slowly", "Compressor runs frequently or unusual suspension noise is present", "Ride quality or handling has changed"],
    processSteps: [{ title: "Identify the fitted suspension", description: "Confirm model, year, options, ride height and the exact symptom." }, { title: "Inspect and test", description: "Check visible condition and supported fault or pressure information as applicable." }, { title: "Confirm the repair route", description: "Define supported compressor, strut, valve, sensor, damper, parts and calibration scope." }, { title: "Quote and verify", description: "Explain proposed work and suitable post-repair checks before approval." }],
    faqs: [{ question: "Do you inspect Rolls-Royce air-suspension problems?", answer: "Ride-height and air-suspension concerns can be assessed. Parts, procedures and supported calibration functions are confirmed for the exact vehicle." }, { question: "Does every Rolls-Royce use Planar and Flagbearer?", answer: "No. Official Rolls-Royce material describes those systems for the relevant newer Ghost generation. They should not be universalised." }, { question: "Does leaning prove an air strut has failed?", answer: "No. Leaks, lines, valves, sensors, compressor operation and mechanical condition may need testing before a part is proposed." }, { question: "What affects suspension-repair cost?", answer: "The fitted system, diagnostic time, failed component, parts, access and supported calibration or alignment work determine the estimate." }]
  };
  if (combo.serviceSlug === "oil-change") return {
    ...combo,
    ...shared,
    h1: "Rolls-Royce Oil Change & Maintenance Dubai",
    metaTitle: "Rolls-Royce Oil Change & Maintenance Dubai | DIGI-TEC",
    metaDescription: "Rolls-Royce oil service and maintenance assessment in Al Quoz, Dubai. Oil, filters and due items are matched to the exact combustion model.",
    heroCopy: "Rolls-Royce oil and maintenance requirements vary by combustion model, engine, year and market. DIGI-TEC reviews the vehicle, service information, mileage and history before confirming oil, filters, seals, inspection items and any supported reset. Spectre is electric and is not included in engine-oil servicing.",
    symptoms: ["Service or maintenance reminder due", "Unknown or incomplete service history", "Oil-level warning or evidence of a leak", "Stored or low-mileage combustion model requiring a maintenance review"],
    processSteps: [{ title: "Review model and history", description: "Confirm the combustion model, year, mileage, previous service and use." }, { title: "Verify service information", description: "Identify the applicable oil, filters, fluids and due inspection items." }, { title: "Inspect before adding work", description: "Explain leaks, levels or other findings separately from scheduled work." }, { title: "Complete the approved scope", description: "Carry out the agreed service and supported reset, then record the work." }],
    faqs: [{ question: "Which oil does my Rolls-Royce need?", answer: "The correct approval and viscosity depend on the exact combustion model, engine, year and market. They are verified before quotation." }, { question: "How often should a Rolls-Royce be serviced?", answer: "Use the model-year service information, mileage, history, condition, storage and use. One annual or kilometre interval is not applied to every vehicle." }, { question: "Is Spectre included in an oil change?", answer: "No. Spectre is fully electric and is not associated with engine-oil or combustion maintenance." }, { question: "What affects maintenance cost?", answer: "Oil quantity and specification, filters, fluids, due inspection items, labour and separate findings determine the estimate." }]
  };
  if (combo.serviceSlug === "ac-repair") return {
    ...combo,
    ...shared,
    h1: "Rolls-Royce AC Repair Dubai",
    metaTitle: "Rolls-Royce AC Repair Dubai | DIGI-TEC",
    metaDescription: "Rolls-Royce air-conditioning assessment in Al Quoz, Dubai for weak cooling, airflow, leaks, compressor and cabin-zone concerns.",
    heroCopy: "DIGI-TEC assesses weak cooling, airflow problems, leaks, compressor noise and cabin-zone concerns. Refrigerant, system layout, equipment, access and parts vary by model and market, so the vehicle label and exact configuration are checked before service or repair. The starlight headliner is not described as a ventilation system.",
    symptoms: ["AC is weak or not cooling", "Airflow differs between vents or cabin zones", "Unusual compressor, blower or actuator noise", "Odour, water ingress or a recurring loss of cooling"],
    processSteps: [{ title: "Confirm the exact climate system", description: "Identify the model, year, configuration, refrigerant label and complaint." }, { title: "Test performance and leaks", description: "Check temperatures, airflow, pressures and relevant electrical data as appropriate." }, { title: "Define the supported repair", description: "Confirm equipment, access, parts and any supported calibration before approval." }, { title: "Verify cooling performance", description: "Complete the agreed work and recheck the system under suitable conditions." }],
    faqs: [{ question: "Which refrigerant does my Rolls-Royce use?", answer: "The vehicle label and model details determine the correct refrigerant. One type is not assumed for every Rolls-Royce." }, { question: "Can you inspect rear-cabin climate concerns?", answer: "The concern can be assessed, but the fitted zones, access, parts and accepted repair scope must be confirmed for the exact vehicle." }, { question: "Is the starlight headliner part of AC ventilation?", answer: "That connection is not claimed. Starlight headliner features should not be presented as a climate-system specification without authoritative vehicle documentation." }, { question: "What affects the AC estimate?", answer: "Testing time, refrigerant, fault location, access, parts, equipment and supported functions determine the estimate." }]
  };
  if (combo.serviceSlug === "battery-replacement") return {
    ...combo,
    ...shared,
    h1: "Rolls-Royce Battery Replacement & Diagnosis Dubai",
    metaTitle: "Rolls-Royce Battery Replacement Dubai | DIGI-TEC",
    metaDescription: "Rolls-Royce low-voltage battery, charging and battery-drain assessment in Al Quoz, Dubai. Specification and supported functions are confirmed.",
    heroCopy: "DIGI-TEC assesses low-voltage starting, charging, battery-drain and storage-related concerns. Battery specification, access, safe replacement procedure and any supported registration or initialization function are confirmed for the exact Rolls-Royce. Low-voltage work does not establish Spectre high-voltage capability.",
    symptoms: ["Slow crank, no-start or low-voltage warning", "Battery discharges after parking", "Charging-system or intermittent electrical concern", "Replacement recommended after testing"],
    processSteps: [{ title: "Identify the low-voltage system", description: "Confirm the exact model and keep low-voltage work separate from Spectre high-voltage systems." }, { title: "Test before replacement", description: "Check battery condition, charging and unwanted current draw where relevant." }, { title: "Verify specification and procedure", description: "Confirm battery type, fitment and supported registration or initialization requirements." }, { title: "Complete and recheck", description: "Fit only the approved battery and verify low-voltage operation." }],
    faqs: [{ question: "Do all Rolls-Royce models use the same battery?", answer: "No. Specification, fitment and procedure vary and must be verified for the exact vehicle." }, { question: "Can you diagnose battery drain?", answer: "An assessment may include battery, charging and unwanted-current-draw testing appropriate to the concern." }, { question: "Is this Spectre high-voltage battery repair?", answer: "No. Low-voltage battery work does not establish high-voltage battery, charging or isolation capability." }, { question: "Is battery registration always required?", answer: "Not necessarily. Any registration or initialization depends on the vehicle and supported workshop access." }]
  };
  if (combo.serviceSlug === "electrical-repair") return {
    ...combo,
    ...shared,
    h1: "Rolls-Royce Electrical Repair Dubai",
    metaTitle: "Rolls-Royce Electrical Repair Dubai | DIGI-TEC",
    metaDescription: "Rolls-Royce electrical fault and low-voltage assessment in Al Quoz, Dubai. Wiring, charging and module concerns are tested before repair.",
    heroCopy: "DIGI-TEC assesses low-voltage, charging, wiring, sensor and module-communication concerns with testing appropriate to the exact vehicle. Compatible diagnostic access and supported functions are confirmed before quotation. Coding, programming, security access and Spectre high-voltage work are not assumed.",
    symptoms: ["Low-voltage or charging warning", "Intermittent no-start or battery discharge", "Lighting, switch, sensor or comfort-system concern", "Module-communication or wiring fault"],
    processSteps: [{ title: "Record the electrical concern", description: "Review the exact symptom, timing, battery history and recent work." }, { title: "Confirm supported diagnostic access", description: "Identify available module data and functions for the exact vehicle." }, { title: "Test the circuit or system", description: "Use appropriate voltage, current, continuity or component checks before proposing parts." }, { title: "Explain the supported repair", description: "Quote confirmed wiring, component or further diagnostic work before approval." }],
    faqs: [{ question: "Can you diagnose intermittent electrical faults?", answer: "The concern can be assessed using history, compatible fault data and appropriate electrical testing. Intermittent faults may require additional time or repeat conditions." }, { question: "Do you program Rolls-Royce modules?", answer: "Programming is not promised. Software, security access, compatibility and workshop capability must be confirmed for the exact module and vehicle." }, { question: "Does this page include Spectre high-voltage work?", answer: "No. High-voltage battery, charging and isolation work is not advertised without confirmed training, equipment and accepted scope." }, { question: "What determines the estimate?", answer: "Diagnostic time, access, wiring or component findings, parts and supported functions determine the estimate." }]
  };
  return { ...combo, ...shared };
};
const bentleyServiceOverride = (combo) => {
  const shared = {
    whatsAppMessage: `Hi DIGI-TEC, I would like to request a Bentley ${combo.serviceName.toLowerCase()} assessment.

Model: 
Year: 
Mileage: 
Service history: 
Warning or symptoms: `,
    partsCopy: "Parts, fluids and procedures are selected after the exact Bentley, fitted system and inspection findings are reviewed. The itemised estimate identifies the proposed option and availability before approval; one specification is not applied to every model or generation."
  };
  if (combo.serviceSlug === "transmission-repair") return {
    ...combo,
    ...shared,
    h1: "Bentley Transmission Repair Dubai",
    metaTitle: "Bentley Transmission Repair Dubai | DIGI-TEC",
    metaDescription: "Bentley gearbox and transmission assessment in Al Quoz, Dubai. Warning, leak, engagement and shift concerns are assessed for the exact vehicle.",
    heroCopy: "DIGI-TEC assesses Bentley gearbox warnings, leaks, engagement and shift-quality concerns in Al Quoz. The model, year and fitted transmission are identified before compatible data, fluid, procedures, parts or supported repair scope are proposed. A warning or symptom does not by itself prove a failed component.",
    symptoms: ["Transmission or gearbox warning displayed", "Delayed, harsh or inconsistent engagement", "Change in shift quality or drivability", "Fluid leak or unusual noise near the transmission"],
    processSteps: [{ title: "Identify the fitted transmission", description: "Confirm the model, year, VIN where needed, transmission variant, history and concern." }, { title: "Assess the evidence", description: "Review compatible fault data, physical condition, leaks and drivability where appropriate." }, { title: "Define the supported scope", description: "Confirm fluid, parts, service functions and whether further specialist repair is available." }, { title: "Estimate before approval", description: "Explain findings, proposed work and expected timing before authorised work begins." }],
    faqs: [{ question: "Do all Bentley models use the same transmission?", answer: "No. Transmission design, fluid and procedure vary by model and generation. The exact vehicle and fitted unit are confirmed before work is proposed." }, { question: "Can a fluid service fix a gearbox warning?", answer: "A fluid service is not a universal fix. The warning, symptoms, fault data and condition must be assessed first." }, { question: "Do you rebuild Bentley gearboxes?", answer: "Assessment is available. Internal repair, calibration and rebuild scope must be confirmed for the exact transmission after diagnosis." }, { question: "What determines the estimate?", answer: "Diagnostic time, the fitted transmission, service or repair scope, parts, fluid and availability determine the estimate." }]
  };
  if (combo.serviceSlug === "suspension-repair") return {
    ...combo,
    ...shared,
    h1: "Bentley Suspension Repair Dubai",
    metaTitle: "Bentley Suspension Repair Dubai | DIGI-TEC",
    metaDescription: "Bentley suspension, ride-height and ride-quality assessment in Al Quoz, Dubai. Fitted air suspension, damping and 48-volt systems are identified first.",
    heroCopy: "Bentley suspension systems vary by model, generation and option. DIGI-TEC identifies the fitted arrangement before assessing ride-height warnings, leaning, compressor operation, noise or ride-quality changes. Air suspension, damping and 48-volt equipment are not assumed to be the same across every Bentley.",
    symptoms: ["Suspension or ride-height warning", "Vehicle sits unevenly or changes height slowly", "Compressor noise, leak or unusual suspension noise", "Ride-quality, handling or steering change"],
    processSteps: [{ title: "Identify the fitted system", description: "Confirm the model, year, options and exact symptom." }, { title: "Inspect the concern", description: "Check visible condition and supported fault or pressure information as applicable." }, { title: "Confirm repair capability", description: "Define supported mechanical, pneumatic, hydraulic, parts and calibration scope." }, { title: "Quote and verify", description: "Explain the proposed work and suitable post-repair checks before approval." }],
    faqs: [{ question: "Do all Bentleys have the same air suspension?", answer: "No. The exact model, year and fitted equipment must be identified before inspection or parts are proposed." }, { question: "Can a ride-height warning prove a failed air spring?", answer: "No. Leaks, compressor operation, valves, sensors and other mechanical or electrical factors may need testing." }, { question: "Do you calibrate Bentley suspension?", answer: "Supported calibration functions depend on the exact vehicle, access and accepted workshop scope." }, { question: "What affects suspension-repair cost?", answer: "The fitted system, diagnosis, parts, access, calibration requirements and findings determine the estimate." }]
  };
  if (combo.serviceSlug === "ac-repair") return {
    ...combo,
    ...shared,
    h1: "Bentley AC Repair Dubai",
    metaTitle: "Bentley AC Repair Dubai | DIGI-TEC",
    metaDescription: "Bentley air-conditioning assessment in Al Quoz, Dubai for weak cooling, leaks, airflow and compressor concerns. Refrigerant and repair scope are confirmed per vehicle.",
    heroCopy: "DIGI-TEC assesses Bentley weak cooling, leaks, airflow, compressor noise and cabin-zone concerns. The exact vehicle, climate-system configuration and test findings determine the supported repair scope. Refrigerant, service equipment and parts are confirmed from the vehicle label and assessment before work.",
    symptoms: ["Weak or uneven cabin cooling", "Air-conditioning warning, unusual smell or poor airflow", "Compressor noise or suspected refrigerant leak", "Cabin-zone or control concern"],
    processSteps: [{ title: "Record the concern", description: "Confirm the exact symptom, operating conditions and previous work." }, { title: "Identify the fitted system", description: "Check the vehicle label and climate-system configuration before service." }, { title: "Test before parts or refrigerant", description: "Use appropriate leak, pressure, airflow and electrical checks." }, { title: "Quote the supported repair", description: "Explain findings, parts, procedure and timing before approval." }],
    faqs: [{ question: "Does every Bentley use the same refrigerant?", answer: "No. The vehicle label and model-specific information determine the correct refrigerant and service equipment." }, { question: "Can low refrigerant identify the leak source?", answer: "No. A leak assessment may be needed before refrigerant or parts are recommended." }, { question: "Can you fix multi-zone cooling issues?", answer: "The concern can be assessed, but the fitted climate system, access, parts and supported repair scope are confirmed first." }, { question: "What affects AC repair cost?", answer: "Test time, leak source, parts, refrigerant specification, access and findings determine the estimate." }]
  };
  return { ...combo, ...shared };
};
const lamborghiniServiceOverride = (combo) => {
  const shared = {
    whatsAppMessage: `Hi DIGI-TEC, I would like to request a Lamborghini ${combo.serviceName.toLowerCase()} assessment.

Model: 
Year: 
Mileage: 
Warning or symptoms: `,
    partsCopy: "Parts, fluids, procedures and supported service functions are confirmed after the exact Lamborghini and fitted system are identified. The estimate lists the proposed scope before approval; no one specification is applied to every model."
  };
  if (combo.serviceSlug === "electrical-repair") return {
    ...combo,
    ...shared,
    h1: "Lamborghini Electrical & Camera Fault Assessment Dubai",
    metaTitle: "Lamborghini Electrical Repair Dubai | DIGI-TEC",
    metaDescription: "Lamborghini electrical, screen and reversing-camera fault assessment in Al Quoz, Dubai. Fitted equipment and supported repair scope are checked per vehicle.",
    heroCopy: "A blank reversing-camera image, intermittent display or electrical warning does not identify a failed camera by itself. DIGI-TEC first confirms the Lamborghini model and fitted equipment, then checks the reported conditions, power, connections and compatible fault information before proposing a supported repair. Camera installation or retrofit is a separate request whose compatibility and workshop scope must be confirmed.",
    symptoms: ["Reversing-camera image is blank, intermittent or distorted where fitted", "Display or infotainment system does not respond as expected", "Electrical warning or accessory function changes after battery work", "Intermittent power, connector or wiring concern"],
    processSteps: [{ title: "Confirm the fitted equipment", description: "Identify the model, year, original or retrofitted camera and exact symptom." }, { title: "Trace the signal and power path", description: "Inspect suitable connections, supply, display behaviour and compatible fault data before blaming a component." }, { title: "Agree the repair scope", description: "Confirm parts, access and any supported configuration function for the exact vehicle." }, { title: "Verify the result", description: "Recheck the affected function under the conditions that triggered the concern." }],
    faqs: [{ question: "Can you assess a Lamborghini reversing-camera fault?", answer: "Yes, the symptom can be assessed where the equipment is fitted. The camera, display, wiring, power and any supported module information are considered before repair is proposed." }, { question: "Do you install a reversing camera in every Lamborghini?", answer: "No universal retrofit is advertised. Compatibility, parts, integration and workshop scope must be confirmed for the exact model and existing equipment before accepting an installation request." }, { question: "Does a blank screen prove the camera has failed?", answer: "No. Display, power, connector, wiring or communication issues can produce a similar symptom. Testing is needed to isolate the cause." }, { question: "Will a fault scan always locate the failed part?", answer: "No. Available fault information guides the investigation; physical and electrical checks may still be required." }]
  };
  if (combo.serviceSlug === "transmission-repair") return {
    ...combo,
    ...shared,
    h1: "Lamborghini Transmission & Gearbox Assessment Dubai",
    metaTitle: "Lamborghini Transmission Repair Dubai | DIGI-TEC",
    metaDescription: "Lamborghini gearbox and transmission assessment in Al Quoz, Dubai. LDF, ISR and automatic systems are identified before service or repair is proposed.",
    heroCopy: "Lamborghini transmission architecture varies by model. Huracán EVO uses a seven-speed LDF dual-clutch transmission, Urus S an eight-speed automatic, and Aventador SVJ an ISR gearbox. DIGI-TEC identifies the fitted unit and assesses the warning, leak, shift or clutch concern before confirming fluid, service functions, parts or available repair scope.",
    symptoms: ["Transmission or gearbox warning displayed", "Change in engagement or shift quality", "Clutch, hydraulic or drivability concern", "Fluid leak or unusual noise near the transmission"],
    processSteps: [{ title: "Identify the transmission", description: "Confirm the model, VIN, fitted gearbox, history and reported concern." }, { title: "Assess the evidence", description: "Review compatible fault data, physical condition, leaks and drivability where appropriate." }, { title: "Confirm supported scope", description: "Match fluid, procedures, parts and available service or repair functions to the fitted unit." }, { title: "Estimate before approval", description: "Explain findings, proposed work and timing before authorised work begins." }],
    faqs: [{ question: "Do Urus and Huracán use the same transmission?", answer: "No. Urus S uses an eight-speed automatic while Huracán EVO uses a seven-speed LDF dual-clutch transmission. Other variants must be verified separately." }, { question: "Does Aventador use the Huracán LDF?", answer: "No. Aventador SVJ uses an ISR gearbox. Its clutch, hydraulic and service considerations should not be described as Huracán LDF procedures." }, { question: "Do you rebuild Lamborghini gearboxes?", answer: "Assessment is available, but internal repair, clutch, hydraulic, calibration and rebuild capability must be confirmed for the exact transmission after diagnosis." }, { question: "Can one symptom prove a failed component?", answer: "No. Speed, shift behaviour or a warning alone does not prove a failed clutch, torque converter or hydraulic component. Testing and the fitted architecture matter." }]
  };
  if (combo.serviceSlug === "battery-replacement") return {
    ...combo,
    ...shared,
    h1: "Lamborghini Battery Replacement & Diagnosis Dubai",
    metaTitle: "Lamborghini Battery Replacement Dubai | DIGI-TEC",
    metaDescription: "Lamborghini low-voltage battery, charging and starting assessment in Al Quoz, Dubai. Battery specification and supported registration are confirmed per vehicle.",
    heroCopy: "DIGI-TEC assesses low-voltage starting, charging, battery-drain and accessory-battery concerns. The required battery specification, safe replacement procedure and any supported registration or coding function are confirmed for the exact Lamborghini. This page does not advertise hybrid traction-battery repair.",
    symptoms: ["Slow crank, no-start or low-voltage warning", "Battery discharges after parking", "Charging-system or intermittent electrical concern", "Replacement required after testing"],
    processSteps: [{ title: "Confirm the battery system", description: "Identify the exact vehicle and separate low-voltage work from any hybrid high-voltage system." }, { title: "Test before replacement", description: "Check battery condition, charging and unwanted current draw where relevant." }, { title: "Verify specification and procedure", description: "Confirm battery type, fitment and supported registration or initialization requirements." }, { title: "Complete and recheck", description: "Fit only the approved battery and verify low-voltage operation." }],
    faqs: [{ question: "Is this hybrid-battery repair?", answer: "No. This page covers low-voltage starting and accessory battery work. Hybrid traction-battery service requires separate confirmed capability." }, { question: "Does every Lamborghini use the same battery?", answer: "No. Specification, chemistry, fitment and procedure vary. They are verified for the exact vehicle." }, { question: "Is battery registration always required?", answer: "Not necessarily. Any registration, coding or initialization depends on the vehicle and supported workshop access." }, { question: "What determines the estimate?", answer: "Testing time, battery specification, access, required procedure and findings determine the estimate." }]
  };
  if (combo.serviceSlug === "engine-diagnostics") return {
    ...combo,
    ...shared,
    h1: "Lamborghini Engine Diagnostics Dubai",
    metaTitle: "Lamborghini Engine Diagnostics Dubai | DIGI-TEC",
    metaDescription: "Lamborghini warning-light and drivability diagnostics in Al Quoz, Dubai. Compatible data and physical testing are matched to the exact vehicle.",
    heroCopy: "Warning lights, misfires, reduced performance, starting concerns and intermittent faults require more than a code read. DIGI-TEC confirms compatible diagnostic access for the exact vehicle and combines available data with appropriate electrical or mechanical testing before recommending parts.",
    symptoms: ["Engine or powertrain warning displayed", "Misfire, rough running or hesitation", "Reduced performance or unusual drivability", "Starting or intermittent electrical concern"],
    processSteps: [{ title: "Record the exact concern", description: "Review warning text, operating conditions, history and recent work." }, { title: "Confirm diagnostic access", description: "Collect supported fault and live data for the relevant modules." }, { title: "Test the affected system", description: "Use suitable physical tests instead of treating a code as a parts diagnosis." }, { title: "Explain the result", description: "Separate confirmed faults from further testing and quote the supported work." }],
    faqs: [{ question: "Can a code identify the failed part?", answer: "Not by itself. A code indicates a condition or affected system; physical and electrical testing may still be needed." }, { question: "Do you offer proprietary Lamborghini programming?", answer: "Programming is not assumed. Software, security access and workshop capability must be confirmed for the exact vehicle." }, { question: "Can you diagnose engine and gearbox warnings?", answer: "The initial concern can be assessed, with supported module access and test scope confirmed before booking." }, { question: "What should I send first?", answer: "Send the model, year, mileage, exact warning, symptoms and when they occur." }]
  };
  if (combo.serviceSlug === "mechanical-repair") return {
    ...combo,
    ...shared,
    h1: "Lamborghini Engine & Mechanical Repair Dubai",
    metaTitle: "Lamborghini Engine Repair Dubai | DIGI-TEC",
    metaDescription: "Lamborghini engine, cooling and mechanical assessment in Al Quoz, Dubai. Repair scope follows vehicle identification and diagnostic findings.",
    heroCopy: "DIGI-TEC assesses oil leaks, coolant loss, overheating, unusual engine noise and drivability concerns. The exact V8, V10, V12 or hybrid platform, symptoms and findings determine the next step. Internal engine, hybrid high-voltage and carbon-structure work are not assumed.",
    symptoms: ["Coolant loss, temperature warning or overheating", "Oil leak, smell or visible fluid", "Unusual engine noise, vibration or reduced performance", "Mechanical concern found during maintenance"],
    processSteps: [{ title: "Document the concern", description: "Confirm the model, history, warning and operating conditions." }, { title: "Inspect and test", description: "Combine compatible diagnostics with leak, cooling or mechanical tests appropriate to the symptom." }, { title: "Confirm capability and parts", description: "Define supported repair work and any required specialist route before approval." }, { title: "Verify agreed work", description: "Complete the approved scope and appropriate post-repair checks." }],
    faqs: [{ question: "Can you assess overheating or coolant loss?", answer: "The concern can be assessed, but repair scope depends on the source and exact vehicle." }, { question: "Do you repair Lamborghini hybrid high-voltage systems?", answer: "High-voltage repair is not advertised by this page and requires explicit capability confirmation." }, { question: "Do you repair carbon structures?", answer: "Carbon-structure repair is not promised here. Damage requires separate assessment and an appropriate repair route." }, { question: "How is cost estimated?", answer: "Cost follows identification, testing, parts availability and the supported repair scope." }]
  };
  if (combo.serviceSlug === "suspension-repair") return {
    ...combo,
    ...shared,
    h1: "Lamborghini Suspension Assessment Dubai",
    metaTitle: "Lamborghini Suspension Repair Dubai | DIGI-TEC",
    metaDescription: "Lamborghini suspension, ride-height and front-lift assessment in Al Quoz. Urus air suspension and supercar lift systems are identified separately.",
    heroCopy: "Lamborghini suspension systems vary by model and variant. Urus S uses adaptive air suspension, while a supercar front-axle lift is a different system. DIGI-TEC identifies the fitted arrangement and assesses warnings, uneven height, leaks, noise or handling concerns before confirming supported hydraulic, mechanical or calibration work.",
    symptoms: ["Suspension or ride-height warning", "Vehicle sits unevenly or changes height slowly", "Front-lift concern, leak or unusual noise", "Handling, damper or ride-quality change"],
    processSteps: [{ title: "Identify the fitted system", description: "Confirm model, variant, options and the exact symptom." }, { title: "Inspect the concern", description: "Check visible condition and supported fault or pressure information as applicable." }, { title: "Confirm repair capability", description: "Define supported hydraulic, mechanical, parts and calibration scope." }, { title: "Quote and verify", description: "Explain the proposed work and suitable post-repair checks before approval." }],
    faqs: [{ question: "Is Urus air suspension the same as front lift?", answer: "No. Urus S adaptive air suspension and a supercar front-axle lift are distinct systems." }, { question: "Do all Urus variants use the same suspension?", answer: "No assumption is made. The exact variant and fitted equipment are identified first." }, { question: "Can every hydraulic repair be accepted?", answer: "No. Hydraulic procedures, tooling, parts and supported calibration must be confirmed for the vehicle." }, { question: "Can suspension symptoms have electrical causes?", answer: "Yes, but electrical, hydraulic and mechanical evidence must be tested before parts are proposed." }]
  };
  if (combo.serviceSlug === "oil-change") return {
    ...combo,
    ...shared,
    h1: "Lamborghini Oil Change & Maintenance Dubai",
    metaTitle: "Lamborghini Oil Change & Maintenance Dubai | DIGI-TEC",
    metaDescription: "Lamborghini oil service and maintenance assessment in Al Quoz, Dubai. Oil, filters and due items are matched to the exact model and year.",
    heroCopy: "Oil and maintenance requirements vary by model, engine, year and market. DIGI-TEC reviews the exact vehicle, service information, mileage, history and use before confirming oil, filters, seals, inspection items and any supported reset. No universal grade, interval or major/minor package is promised.",
    symptoms: ["Service or maintenance reminder due", "Unknown or incomplete service history", "Oil-level warning or evidence of a leak", "Stored or recently purchased vehicle returning to use"],
    processSteps: [{ title: "Review model and history", description: "Confirm year, mileage, previous service and use." }, { title: "Verify service information", description: "Identify the applicable oil, filters, fluids and due inspection items." }, { title: "Inspect before adding work", description: "Explain leaks, levels or other findings separately." }, { title: "Complete the approved scope", description: "Carry out the agreed service and supported reset, then record the work." }],
    faqs: [{ question: "Which oil does my Lamborghini need?", answer: "The correct approval and viscosity depend on the exact model, engine, year and market." }, { question: "How often should it be serviced?", answer: "Follow manufacturer information for the exact model and year, then consider history, storage, mileage and use." }, { question: "Do you sell universal major or minor packages?", answer: "The due items are confirmed for the vehicle rather than applying one invented package to every Lamborghini." }, { question: "What affects oil-service cost?", answer: "Oil quantity and specification, filters, seals and due inspection items determine the estimate." }]
  };
  if (combo.serviceSlug === "brake-repair") return {
    ...combo,
    ...shared,
    h1: "Lamborghini Brake Inspection & Repair Dubai",
    metaTitle: "Lamborghini Brake Repair Dubai | DIGI-TEC",
    metaDescription: "Lamborghini brake inspection in Al Quoz, Dubai for warnings, vibration, pads, discs and fluid. Fitted steel or carbon-ceramic systems are confirmed first.",
    heroCopy: "Brake specification varies by model and option. DIGI-TEC inspects warnings, vibration, pads, discs, sensors, calipers, fluid and tyre condition, then confirms the appropriate measurement, parts and supported repair procedure. Carbon-ceramic resurfacing is not promised.",
    symptoms: ["Brake warning or wear message", "Vibration, noise or change in pedal feel", "Pad, disc or fluid service concern", "Carbon-ceramic condition or measurement enquiry"],
    processSteps: [{ title: "Confirm the fitted brakes", description: "Identify model, option and complaint." }, { title: "Inspect and measure", description: "Check applicable friction, hydraulic and electronic components." }, { title: "Define parts and procedure", description: "Confirm availability and supported work for steel or carbon-ceramic equipment." }, { title: "Estimate before repair", description: "Explain findings and approved scope before work starts." }],
    faqs: [{ question: "Do all Lamborghinis have the same brakes?", answer: "No. The exact steel or carbon-ceramic system and options must be identified." }, { question: "Do you resurface carbon-ceramic discs?", answer: "Carbon-ceramic resurfacing is not advertised. Inspection and available replacement scope are confirmed first." }, { question: "Can vibration prove a warped disc?", answer: "No. Disc, pad, hub, tyre, suspension and installation factors may need inspection." }, { question: "What affects brake-service cost?", answer: "The fitted system, measurements, parts, fluid, labour and findings determine the estimate." }]
  };
  if (combo.serviceSlug === "ac-repair") return {
    ...combo,
    ...shared,
    heroCopy: "DIGI-TEC assesses Lamborghini weak cooling, leaks, airflow and compressor concerns. The exact vehicle, fitted system and test findings determine the supported repair scope. Refrigerant, programming and special functions are never assumed from the badge alone."
  };
  return { ...combo, ...shared };
};
const BrandServicePage = ({
  brandSlugOverride,
  serviceSlugOverride,
  canonicalPath
}) => {
  const { isArabic, localizedPath } = useLocale();
  const { brandSlug: routeBrandSlug, serviceSlug: routeServiceSlug } = useParams();
  const brandSlug = brandSlugOverride ?? routeBrandSlug;
  const serviceSlug = serviceSlugOverride ?? routeServiceSlug;
  const sourceCombo = brandSlug && serviceSlug ? getBrandServiceCombo(brandSlug, serviceSlug, { mercedesEnglishContent: !isArabic }) : void 0;
  const localizedCombo = sourceCombo && isArabic ? (() => {
    const serviceName = serviceNamesArabic[sourceCombo.serviceSlug] ?? "خدمة السيارات";
    const serviceCopy = arabicServiceContent[sourceCombo.serviceSlug];
    const standardFaqs = [
      { question: serviceCopy.question, answer: serviceCopy.answer },
      { question: `ما الذي يحدد تكلفة ${serviceName} لسيارة ${sourceCombo.brandName}؟`, answer: "تعتمد التكلفة على الطراز والسنة والنظام المركب ووقت الفحص والنتائج والقطع المطلوبة. اطلب توضيح نطاق الاختبارات والقطع والعمالة قبل الموافقة على العمل." },
      ...sourceCombo.brandSlug === "porsche-service-dubai" ? [] : [
        { question: "كيف يتم اختيار القطع؟", answer: "يتم تأكيد المواصفة والتوافق والمصدر والتوفر للسيارة والعمل المطلوب. اطلب بيان خيارات القطع وشروطها في عرض السعر؛ لا يفترض مصدر محدد قبل التأكيد." },
        { question: "ما المعلومات المطلوبة لحجز الفحص؟", answer: "أرسل الطراز والسنة والمسافة وسجل الصيانة ونص التحذير أو وصف المشكلة ووقت ظهورها. يتم تأكيد نطاق الخدمة ووظائف التشخيص المتاحة والموعد بناءً على السيارة." }
      ]
    ];
    const steps = [
      { title: "الفحص الأولي", description: "مراجعة الأعراض وسجل السيارة وإجراء فحص بصري ومنظم." },
      { title: "الاختبارات المناسبة", description: "تحديد الاختبارات المطلوبة والبيانات المتاحة حسب النظام المركب ونطاق التشخيص المؤكد." },
      { title: "مراجعة عرض الإصلاح", description: "تأكيد القطع والإجراءات والعمالة وأي برمجة أو معايرة مطلوبة ومتاحة قبل الموافقة." },
      { title: "مراجعة النتيجة", description: "مناقشة اختبارات التحقق المناسبة للعمل والنتائج والتوصيات عند التسليم." }
    ];
    return {
      ...sourceCombo,
      serviceName,
      serviceType: serviceName,
      h1: `${serviceName} ${sourceCombo.brandName} في دبي`,
      metaTitle: `${serviceName} ${sourceCombo.brandName} في دبي | ديجي-تك`,
      metaDescription: `${serviceName} ${sourceCombo.brandName} في دبي. ${serviceCopy.summary}`,
      heroCopy: `${serviceName} لسيارات ${sourceCombo.brandName} لدى ديجي-تك في القوز، دبي. ${serviceCopy.summary} يتم تأكيد قبول السيارة والاختبارات والقطع المطلوبة قبل اعتماد العمل.`,
      symptoms: serviceCopy.symptoms,
      processSteps: steps,
      partsCopy: `تحدد بيانات سيارة ${sourceCombo.brandName} والنظام المركب والنتائج القطع المناسبة. يتم تأكيد التوافق والمصدر والتوفر وأي وظائف برمجة أو معايرة مطلوبة قبل طلب المكونات.`,
      faqs: standardFaqs,
      whatsAppMessage: `مرحباً ديجي-تك، أريد حجز ${serviceName} لسيارة ${sourceCombo.brandName}.`,
      ...sourceCombo.brandSlug === "mercedes-benz-service-dubai" ? MERCEDES_ARABIC_SERVICE_CONTENT[sourceCombo.serviceSlug] : {},
      ...sourceCombo.brandSlug === "rox-service-dubai" && sourceCombo.serviceSlug === "oil-change" ? {
        h1: "خدمة زيت محرك مولد المدى ROX 01 في دبي",
        metaTitle: "خدمة زيت مولد المدى ROX 01 في دبي | ديجي-تك",
        metaDescription: "استفسر عن زيت محرك مولد المدى في ROX 01 بعد التحقق من مواصفات السيارة وسجل الصيانة. لا تشمل الخدمة أعمال بطارية الجر أو الجهد العالي.",
        heroCopy: "تعمل ROX 01 بمحركات كهربائية للدفع وتستخدم محرك احتراق لتوليد الطاقة وزيادة المدى. يقتصر طلب خدمة الزيت على محرك المولد حسب متطلبات السيارة المحددة؛ لا يفترض ذلك توفر أعمال بطارية الجر أو نظام الدفع الكهربائي."
      } : {},
      ...sourceCombo.brandSlug === "rox-service-dubai" && sourceCombo.serviceSlug === "engine-diagnostics" ? {
        h1: "فحص أعطال ROX 01 في دبي",
        metaTitle: "فحص أعطال ROX 01 في دبي | ديجي-تك",
        metaDescription: "فحص التحذيرات والأنظمة منخفضة الجهد أو تجهيزات الراحة في ROX 01 وفق الوظائف المتاحة للسيارة. لا يفترض توفر إصلاح أنظمة الجهد العالي.",
        heroCopy: "يبدأ فحص تحذير ROX 01 بتسجيل الأعراض والتأكد من وظائف التشخيص المتاحة للسيارة المحددة. يمكن مناقشة الأنظمة منخفضة الجهد وتجهيزات الراحة، ولا يتم الإعلان عن إصلاح بطارية الجر أو نظام الدفع أو الشحن عالي الجهد."
      } : {},
      ...sourceCombo.brandSlug === "rox-service-dubai" && sourceCombo.serviceSlug === "soft-close-door-installation" ? {
        h1: "تركيب الإغلاق الناعم لأبواب ROX 01 في دبي",
        metaTitle: "تركيب الإغلاق الناعم لأبواب ROX 01 | ديجي-تك",
        metaDescription: "استفسر عن توافق تركيب الإغلاق الناعم لأبواب ROX 01 في دبي. يتم فحص الأبواب والأسلاك والقطع قبل تأكيد إمكانية التركيب وعرض السعر.",
        heroCopy: "يخص هذا المسار طلب تركيب الإغلاق الناعم لأبواب ROX 01 بعد التأكد من توافق السيارة والقطع. إذا كانت وظيفة مركبة مسبقاً لا تعمل، يبدأ الأمر بفحص عطل الباب عبر خدمة الإصلاح العامة."
      } : {}
    };
  })() : sourceCombo;
  const combo = localizedCombo && !isArabic && localizedCombo.brandSlug === "aston-martin-service-dubai" ? astonServiceOverride(localizedCombo) : localizedCombo && !isArabic && localizedCombo.brandSlug === "mclaren-service-dubai" ? mcLarenServiceOverride(localizedCombo) : localizedCombo && !isArabic && localizedCombo.brandSlug === "lamborghini-service-dubai" ? lamborghiniServiceOverride(localizedCombo) : localizedCombo && !isArabic && localizedCombo.brandSlug === "rolls-royce-service-dubai" ? rollsRoyceServiceOverride(localizedCombo) : localizedCombo && !isArabic && localizedCombo.brandSlug === "bentley-service-dubai" ? bentleyServiceOverride(localizedCombo) : localizedCombo;
  const brand = brandSlug ? getBrandBySlug(brandSlug) : void 0;
  const profile = brandSlug ? BRAND_PROFILES[brandSlug] : void 0;
  const mercedesServiceMedia = combo && !isArabic && combo.brandSlug === "mercedes-benz-service-dubai" ? MERCEDES_SERVICE_MEDIA[combo.serviceSlug] : void 0;
  const url = combo ? canonicalPath ? `${SITE_URL}${canonicalPath}` : `${SITE_URL}${isArabic ? "/ar" : ""}/brands/${combo.brandSlug}/${combo.serviceSlug}` : SITE_URL;
  const jsonLd = React__default.useMemo(() => {
    if (!combo || !brand || !profile) return void 0;
    const schemaDescription = combo.metaDescription;
    const schemaImage = (mercedesServiceMedia == null ? void 0 : mercedesServiceMedia.src) ?? brand.logo ?? void 0;
    const breadcrumb = buildBreadcrumb(url, [
      { name: isArabic ? "الرئيسية" : "Home", url: `${SITE_URL}${isArabic ? "/ar" : "/"}` },
      { name: isArabic ? "العلامات" : "Brands", url: `${SITE_URL}${isArabic ? "/ar" : ""}/brands` },
      { name: combo.brandName, url: `${SITE_URL}${isArabic ? "/ar" : ""}/brands/${combo.brandSlug}` },
      { name: combo.serviceName, url }
    ]);
    const webPage = buildWebPage({
      url,
      name: combo.h1,
      description: schemaDescription,
      breadcrumbId: `${url}#breadcrumb`,
      primaryImage: schemaImage,
      mainEntityId: `${url}#service`
    });
    const brandEntity = buildBrand({
      name: combo.brandName,
      logo: brand.logo || void 0
    });
    const service = buildService({
      url,
      name: combo.h1,
      serviceType: `${combo.brandName} ${combo.serviceType}`,
      description: schemaDescription,
      image: schemaImage,
      brand: combo.brandName,
      areaServed: [isArabic ? "دبي" : "Dubai"]
    });
    const faq = buildFAQ(url, combo.faqs);
    return pageGraph([webPage, breadcrumb, brandEntity, service, ...faq ? [faq] : []]);
  }, [combo, brand, isArabic, mercedesServiceMedia, profile, url]);
  useSeo({
    title: combo ? combo.metaTitle : isArabic ? "خدمة السيارات | مركز ديجي-تك" : "Brand Service | Digi-Tec Performance Centre",
    description: combo ? combo.metaDescription : isArabic ? "خدمة متخصصة للسيارات في دبي لدى مركز ديجي-تك." : "Specialist brand service in Dubai at Digi-Tec Performance Centre.",
    canonical: combo ? url : `${SITE_URL}/services`,
    noindex: !combo || !brand || !profile,
    hasArabicVersion: !((combo == null ? void 0 : combo.brandSlug) === "rox-service-dubai" && combo.serviceSlug === "soft-close-door-installation"),
    jsonLd
  });
  if (!combo || !brand) {
    return /* @__PURE__ */ jsx(Navigate, { to: localizedPath("/services"), replace: true });
  }
  const whatsappHref = `https://wa.me/97143402223?text=${encodeURIComponent(combo.whatsAppMessage)}`;
  const enquiryLabel = serviceEnquiryLabel(combo.serviceSlug, combo.brandName === "Mercedes-Benz" ? "Mercedes" : combo.brandName);
  const otherServices = getServicesForBrand(combo.brandSlug).filter((s) => s.serviceSlug !== combo.serviceSlug);
  const relatedMercedesContent = combo.brandSlug === "mercedes-benz-service-dubai" ? (isArabic ? MERCEDES_ARABIC_RELATED_CONTENT[combo.serviceSlug] : MERCEDES_RELATED_CONTENT[combo.serviceSlug]) ?? [] : [];
  const mercedesServiceScope = combo.brandSlug === "mercedes-benz-service-dubai" && !isArabic ? MERCEDES_SERVICE_SCOPE[combo.serviceSlug] : void 0;
  const relatedPorscheContent = combo.brandSlug === "porsche-service-dubai" ? PORSCHE_RELATED_CONTENT[combo.serviceSlug] ?? [
    { label: "Browse the Porsche Knowledge Centre", path: "/brands/porsche-service-dubai#porsche-knowledge-centre" },
    { label: "Porsche 911 model guide", path: "/blog/porsche-911-service-dubai-guide" },
    { label: "Porsche Macan model guide", path: "/porsche/macan" }
  ] : [];
  const relatedBmwContent = combo.brandSlug === "bmw-service-dubai" ? [
    { label: "BMW X5 service guide", path: "/brands/bmw-service-dubai/x5" },
    { label: combo.serviceSlug === "transmission-repair" ? "BMW M5 drivetrain guide" : "BMW 3 Series service guide", path: combo.serviceSlug === "transmission-repair" ? "/brands/bmw-service-dubai/m5" : "/brands/bmw-service-dubai/3-series" },
    { label: combo.serviceSlug === "suspension-repair" ? "BMW X6 chassis guide" : "BMW M3 service guide", path: combo.serviceSlug === "suspension-repair" ? "/brands/bmw-service-dubai/x6" : "/brands/bmw-service-dubai/m3" }
  ] : [];
  const relatedFerrariContent = combo.brandSlug === "ferrari-service-dubai" ? FERRARI_RELATED_CONTENT[combo.serviceSlug] ?? [
    { label: "Ferrari 296 model guide", path: "/brands/ferrari-service-dubai/296" },
    { label: "Ferrari Purosangue model guide", path: "/brands/ferrari-service-dubai/purosangue" },
    { label: "Ferrari maintenance guide for Dubai", path: FERRARI_MAINTENANCE_GUIDE_PATH }
  ] : [];
  const relatedRollsRoyceContent = combo.brandSlug === "rolls-royce-service-dubai" ? [
    { label: "Rolls-Royce service and repair hub", path: "/brands/rolls-royce-service-dubai" },
    { label: "Rolls-Royce Ghost service guide", path: "/blog/rolls-royce-ghost-service-dubai-guide" },
    { label: "How to compare Rolls-Royce workshops", path: "/blog/rolls-royce-best-workshop-dubai" }
  ] : [];
  const relatedAuthorityContent = relatedMercedesContent.length > 0 ? relatedMercedesContent : relatedPorscheContent.length > 0 ? relatedPorscheContent : relatedBmwContent.length > 0 ? relatedBmwContent : relatedFerrariContent.length > 0 ? relatedFerrariContent : relatedRollsRoyceContent;
  return /* @__PURE__ */ jsxs("div", { className: "site-page min-h-screen bg-black text-off-white", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsx("nav", { "aria-label": "Breadcrumb", className: "max-w-7xl mx-auto px-4 sm:px-6 pt-6 text-xs sm:text-sm text-gray-400", children: /* @__PURE__ */ jsxs("ol", { className: "flex flex-wrap items-center gap-2", children: [
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(LocalizedLink, { to: "/", className: "hover:text-burnt-orange", children: isArabic ? "الرئيسية" : "Home" }) }),
        /* @__PURE__ */ jsx("li", { "aria-hidden": "true", children: "/" }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(LocalizedLink, { to: "/brands", className: "hover:text-burnt-orange", children: isArabic ? "العلامات" : "Brands" }) }),
        /* @__PURE__ */ jsx("li", { "aria-hidden": "true", children: "/" }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(LocalizedLink, { to: `/brands/${combo.brandSlug}`, className: "hover:text-burnt-orange", children: combo.brandName }) }),
        /* @__PURE__ */ jsx("li", { "aria-hidden": "true", children: "/" }),
        /* @__PURE__ */ jsx("li", { className: "text-off-white font-semibold", children: combo.serviceName })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "relative overflow-hidden border-b border-white/[0.08] bg-[#101113]", children: /* @__PURE__ */ jsx("div", { className: "relative z-10 mx-auto max-w-[90rem] px-5 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-24", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-6 flex items-center gap-4", children: [
          /* @__PURE__ */ jsx("div", { className: "flex h-14 w-20 items-center justify-center overflow-hidden bg-white/[0.94] p-2 sm:h-16 sm:w-24", children: brand.logo ? /* @__PURE__ */ jsx("img", { src: brand.logo, alt: `${combo.brandName} logo`, width: "96", height: "64", decoding: "async", className: "w-full h-full object-contain" }) : /* @__PURE__ */ jsx("span", { className: "text-2xl font-semibold text-burnt-orange", children: combo.brandName.charAt(0) }) }),
          /* @__PURE__ */ jsx("span", { className: "home-kicker", children: isArabic ? `متخصصون في ${combo.brandName}` : `${combo.brandName} Specialists` })
        ] }),
        /* @__PURE__ */ jsx("h1", { className: "mb-5 max-w-4xl text-[clamp(2.65rem,5vw,5.1rem)] font-semibold leading-[0.98] tracking-[-0.05em]", children: combo.h1 }),
        /* @__PURE__ */ jsx("p", { className: "mb-8 max-w-2xl text-base leading-8 text-white/58 sm:text-lg", children: combo.heroCopy }),
        !isArabic && combo.serviceSlug === "body-repair" && /* @__PURE__ */ jsxs("p", { className: "mb-7 max-w-2xl text-base leading-8 text-white/65", children: [
          "For shallow finish marks, start with ",
          /* @__PURE__ */ jsx(LocalizedLink, { to: "/services/car-polishing-dubai", className: "text-burnt-orange underline", children: "polishing and paint correction assessment" }),
          ". After any necessary repair, compare ",
          /* @__PURE__ */ jsx(LocalizedLink, { to: "/services/paint-protection-film", className: "text-burnt-orange underline", children: "paint protection film" }),
          " and ",
          /* @__PURE__ */ jsx(LocalizedLink, { to: "/services/ceramic-coating", className: "text-burnt-orange underline", children: "ceramic coating" }),
          "; paint condition and product requirements determine suitable timing."
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-3 sm:gap-4", children: [
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
                isArabic ? "راسلنا عبر واتساب" : enquiryLabel
              ]
            }
          ),
          /* @__PURE__ */ jsxs("a", { href: "tel:+97143402223", "data-cta-placement": "hero", className: "btn-secondary", children: [
            /* @__PURE__ */ jsx(Phone, { className: "w-5 h-5" }),
            isArabic ? "اتصل على +971 4 340 2223" : "Call +971 4 340 2223"
          ] })
        ] }),
        /* @__PURE__ */ jsx(CtaAssurance, { className: "mt-4", align: "start", text: isArabic ? "تواصل معنا لمناقشة السيارة وطلب موعد" : void 0 }),
        !isArabic && combo.brandSlug === "mercedes-benz-service-dubai" && /* @__PURE__ */ jsx("p", { className: "mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-white/45", children: "Independent Mercedes workshop in Al Quoz · Established 2002 · XENTRY/Star diagnosis where compatible" })
      ] }) }) }),
      /* @__PURE__ */ jsx("nav", { "aria-label": isArabic ? "في هذه الصفحة" : "On this page", className: "border-b border-white/10 bg-black", children: /* @__PURE__ */ jsx("div", { className: "mx-auto flex max-w-5xl gap-2 overflow-x-auto px-4 py-3 sm:px-6", children: [
        [isArabic ? "الأعراض" : "Symptoms", "#service-symptoms"],
        ...mercedesServiceScope ? [["Scope", "#service-scope"]] : [],
        [isArabic ? "خطوات الفحص" : "Process", "#service-process"],
        ...relatedAuthorityContent.length && (!isArabic || combo.brandSlug === "mercedes-benz-service-dubai") ? [[isArabic ? "أدلة مرتبطة" : "Guides", "#service-guides"]] : [],
        [isArabic ? "الأسئلة الشائعة" : "FAQs", "#service-faqs"],
        [isArabic ? "الحجز" : "Book", "#service-booking"]
      ].map(([label, href]) => /* @__PURE__ */ jsx("a", { href, className: "inline-flex min-h-11 shrink-0 items-center rounded-full border border-white/10 px-4 py-2 text-xs font-semibold text-white/65 transition-colors hover:border-burnt-orange/50 hover:text-burnt-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burnt-orange", children: label }, href)) }) }),
      /* @__PURE__ */ jsx("section", { id: "service-symptoms", className: "scroll-mt-24 py-12 sm:py-16 bg-black border-t border-white/5", children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto px-4 sm:px-6", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-4xl font-black mb-6 sm:mb-8", children: isArabic ? /* @__PURE__ */ jsxs(Fragment, { children: [
          "متى تحجز ",
          /* @__PURE__ */ jsxs("span", { className: "text-burnt-orange", children: [
            combo.serviceName,
            " ",
            combo.brandName
          ] }),
          "؟"
        ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          "When to Book ",
          /* @__PURE__ */ jsxs("span", { className: "text-burnt-orange", children: [
            combo.brandName,
            " ",
            combo.serviceName
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 gap-3 sm:gap-4", children: combo.symptoms.map((s, i) => /* @__PURE__ */ jsxs("div", { className: "card-premium flex items-start gap-3 rounded-2xl p-4 sm:p-5", children: [
          /* @__PURE__ */ jsx(CheckCircle2, { className: "w-5 h-5 text-burnt-orange flex-shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsx("span", { className: "text-gray-300 text-sm sm:text-base leading-relaxed", children: s })
        ] }, i)) })
      ] }) }),
      mercedesServiceScope && /* @__PURE__ */ jsx("section", { id: "service-scope", className: "scroll-mt-24 border-t border-white/5 bg-gradient-to-br from-charcoal/35 to-black py-12 sm:py-16", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl px-4 sm:px-6", children: [
        /* @__PURE__ */ jsx("p", { className: "eyebrow mb-4", children: "Vehicle-specific scope" }),
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black sm:text-4xl", children: mercedesServiceScope.heading }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-3xl text-sm leading-relaxed text-white/60 sm:text-base", children: mercedesServiceScope.intro }),
        /* @__PURE__ */ jsx("div", { className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: mercedesServiceScope.items.map((item) => {
          const content = /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("h3", { className: "font-bold text-off-white group-hover:text-burnt-orange", children: item.title }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm leading-relaxed text-white/55", children: item.description }),
            item.path ? /* @__PURE__ */ jsxs("span", { className: "mt-4 inline-flex items-center gap-1 text-xs font-semibold text-burnt-orange", children: [
              item.linkLabel ?? "Read the relevant guide",
              " ",
              /* @__PURE__ */ jsx(ArrowRight, { className: "h-3.5 w-3.5" })
            ] }) : null
          ] });
          return item.path ? /* @__PURE__ */ jsx(LocalizedLink, { id: item.id, to: item.path, className: "card-premium group scroll-mt-28 rounded-2xl p-5", children: content }, item.title) : /* @__PURE__ */ jsx("article", { id: item.id, className: "card-premium group scroll-mt-28 rounded-2xl p-5", children: content }, item.title);
        }) }),
        mercedesServiceMedia ? /* @__PURE__ */ jsxs("figure", { className: "mt-8 overflow-hidden rounded-2xl border border-white/10 bg-black", children: [
          /* @__PURE__ */ jsx("img", { src: mercedesServiceMedia.src, alt: mercedesServiceMedia.alt, width: mercedesServiceMedia.width, height: mercedesServiceMedia.height, loading: "lazy", decoding: "async", className: "max-h-[30rem] w-full object-cover" }),
          /* @__PURE__ */ jsx("figcaption", { className: "px-5 py-4 text-sm leading-relaxed text-white/50", children: mercedesServiceMedia.caption })
        ] }) : null
      ] }) }),
      combo.brandSlug === "mercedes-benz-service-dubai" && combo.serviceSlug === "mechanical-repair" && !isArabic && /* @__PURE__ */ jsxs("figure", { className: "mx-auto max-w-5xl px-4 pb-12 sm:px-6", children: [
        /* @__PURE__ */ jsx("img", { src: mercedesEngineWorkshop, alt: "Mercedes-AMG engine work at the Digi-Tec workshop", loading: "lazy", className: "max-h-[32rem] w-full rounded-2xl object-cover" }),
        /* @__PURE__ */ jsx("figcaption", { className: "mt-3 text-sm text-white/60", children: "Mercedes-AMG engine work photographed at Digi-Tec. The assessment and repair scope for your engine are confirmed separately." })
      ] }),
      !isArabic && combo.serviceSlug === "oil-change" && ["mercedes-benz-service-dubai", "bmw-service-dubai", "porsche-service-dubai", "lamborghini-service-dubai", "ferrari-service-dubai", "mclaren-service-dubai", "rolls-royce-service-dubai", "bentley-service-dubai"].includes(combo.brandSlug) && /* @__PURE__ */ jsx("div", { className: "border-t border-white/10 bg-charcoal/20 py-6", children: /* @__PURE__ */ jsxs("p", { className: "mx-auto max-w-5xl px-4 text-base leading-8 text-gray-300 sm:px-6", children: [
        "For general scope, quote factors and the difference from a full service, see our ",
        /* @__PURE__ */ jsx(LocalizedLink, { to: "/services/oil-change-dubai", className: "text-burnt-orange underline underline-offset-4", children: "car oil and filter change in Dubai" }),
        " guide. The oil specification and procedure for your ",
        combo.brandName,
        " remain specific to its engine."
      ] }) }),
      !isArabic && combo.serviceSlug === "suspension-repair" && ["mercedes-benz-service-dubai", "bmw-service-dubai", "porsche-service-dubai", "audi-service-dubai", "range-rover-service-dubai", "bentley-service-dubai"].includes(combo.brandSlug) && /* @__PURE__ */ jsx("div", { className: "border-t border-white/10 bg-charcoal/20 py-6", children: /* @__PURE__ */ jsxs("p", { className: "mx-auto max-w-5xl px-4 text-base leading-8 text-gray-300 sm:px-6", children: [
        "For help describing noises, ride-height changes or warnings, see our ",
        /* @__PURE__ */ jsx(LocalizedLink, { to: "/services/suspension-repair-dubai", className: "text-burnt-orange underline underline-offset-4", children: "car suspension inspection and repair in Dubai" }),
        " guide. Your ",
        combo.brandName,
        "’s fitted system determines the relevant diagnostic and repair procedure."
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "py-12 sm:py-16 bg-gradient-to-br from-charcoal/40 to-black", children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto px-4 sm:px-6", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-4xl font-black mb-3", children: isArabic ? /* @__PURE__ */ jsxs(Fragment, { children: [
          "طرازات ",
          combo.brandName,
          " والأنظمة المركبة"
        ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          combo.brandName,
          " models and fitted systems"
        ] }) }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm sm:text-base mb-6 sm:mb-8", children: isArabic ? `يتم تأكيد نطاق الخدمة حسب طراز ${combo.brandName} والنظام المركب قبل الحجز.` : `Workshop scope, compatible functions and parts are confirmed for the exact ${combo.brandName} model before booking.` }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3", children: combo.models.map((m) => {
          const modelPath = combo.brandSlug === "mercedes-benz-service-dubai" && !isArabic ? MERCEDES_MODEL_PATHS[m] : void 0;
          return modelPath ? /* @__PURE__ */ jsx(LocalizedLink, { to: modelPath, className: "card-premium group rounded-2xl p-3 text-center sm:p-4", children: /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold text-off-white group-hover:text-burnt-orange sm:text-sm", children: m }) }, m) : /* @__PURE__ */ jsx("div", { className: "card-premium rounded-2xl p-3 text-center sm:p-4", children: /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold text-off-white sm:text-sm", children: m }) }, m);
        }) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { id: "service-process", className: "scroll-mt-24 py-12 sm:py-16 bg-black border-t border-white/5", children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto px-4 sm:px-6", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-4xl font-black mb-6 sm:mb-10", children: isArabic ? /* @__PURE__ */ jsxs(Fragment, { children: [
          "خطوات ",
          /* @__PURE__ */ jsx("span", { className: "text-burnt-orange", children: combo.serviceName })
        ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          "Our ",
          /* @__PURE__ */ jsx("span", { className: "text-burnt-orange", children: combo.serviceName }),
          " Process"
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 gap-4 sm:gap-6", children: combo.processSteps.map((step, i) => /* @__PURE__ */ jsxs("div", { className: "card-premium rounded-2xl p-5 sm:p-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
            /* @__PURE__ */ jsx("span", { className: "w-8 h-8 rounded-full bg-burnt-orange text-black font-black flex items-center justify-center text-sm", children: i + 1 }),
            /* @__PURE__ */ jsx("h3", { className: "text-base sm:text-lg font-bold text-off-white", children: step.title })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm sm:text-base leading-relaxed pl-11", children: step.description })
        ] }, i)) })
      ] }) }),
      !isArabic && combo.brandSlug === "bentley-service-dubai" && combo.serviceSlug === "electrical-repair" && /* @__PURE__ */ jsx(BentleyCameraSection, {}),
      /* @__PURE__ */ jsx("section", { className: "py-12 sm:py-16 bg-gradient-to-br from-charcoal/40 to-black border-t border-white/5", children: /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto px-4 sm:px-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
        /* @__PURE__ */ jsx(ShieldCheck, { className: "w-8 h-8 sm:w-10 sm:h-10 text-burnt-orange flex-shrink-0" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl sm:text-3xl font-black mb-3", children: isArabic ? /* @__PURE__ */ jsxs(Fragment, { children: [
            "خيارات قطع ",
            /* @__PURE__ */ jsx("span", { className: "text-burnt-orange", children: combo.brandName }),
            " موثقة"
          ] }) : combo.brandSlug === "mercedes-benz-service-dubai" && combo.serviceSlug === "engine-diagnostics" ? /* @__PURE__ */ jsxs(Fragment, { children: [
            "Diagnostic findings and ",
            /* @__PURE__ */ jsx("span", { className: "text-burnt-orange", children: "module compatibility" })
          ] }) : combo.brandSlug === "mercedes-benz-service-dubai" && combo.serviceSlug === "oil-change" ? /* @__PURE__ */ jsxs(Fragment, { children: [
            "What your ",
            /* @__PURE__ */ jsx("span", { className: "text-burnt-orange", children: "oil-service quote" }),
            " includes"
          ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("span", { className: "text-burnt-orange", children: combo.brandName }),
            " Parts Options, Documented"
          ] }) }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-300 text-sm sm:text-base leading-relaxed", children: combo.partsCopy }),
          !isArabic && ["mercedes-benz-service-dubai", "bmw-service-dubai", "porsche-service-dubai", "aston-martin-service-dubai", "mclaren-service-dubai"].includes(combo.brandSlug) && /* @__PURE__ */ jsxs("a", { href: whatsappHref, "data-cta-placement": "service_scope", target: "_blank", rel: "noopener noreferrer", className: "mt-6 inline-flex items-center gap-2 text-base font-semibold text-burnt-orange hover:underline", children: [
            enquiryLabel,
            /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4 shrink-0" })
          ] })
        ] })
      ] }) }) }),
      relatedAuthorityContent.length > 0 && (!isArabic || combo.brandSlug === "mercedes-benz-service-dubai") && /* @__PURE__ */ jsx("section", { id: "service-guides", className: "scroll-mt-24 border-t border-white/5 bg-charcoal/15 py-12 sm:py-16", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl px-4 sm:px-6", children: [
        /* @__PURE__ */ jsx("p", { className: "eyebrow mb-4", children: isArabic ? "أدلة وخدمات مرتبطة" : "Model and owner guides" }),
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-black sm:text-4xl", children: isArabic ? `معلومات مرتبطة بخدمة ${combo.serviceName}` : combo.brandSlug === "mercedes-benz-service-dubai" && combo.serviceSlug === "oil-change" ? "Choose the correct Mercedes maintenance scope" : combo.brandSlug === "mercedes-benz-service-dubai" && combo.serviceSlug === "engine-diagnostics" ? "Continue with the relevant Mercedes diagnostic path" : combo.brandSlug === "mercedes-benz-service-dubai" && combo.serviceSlug === "suspension-repair" ? "Compare the warning with the likely test path" : "Understand the symptom before the repair" }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-3xl text-sm leading-relaxed text-white/55", children: isArabic ? "تساعد هذه الأدلة في توضيح الأعراض أو بيانات الطراز ونطاق العمل عند التواصل مع الورشة." : "Explore the relevant symptom, model or service scope to help describe the concern when you contact the workshop." }),
        /* @__PURE__ */ jsx("ul", { className: "mt-7 grid gap-4 sm:grid-cols-3", children: relatedAuthorityContent.map((item) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(LocalizedLink, { to: item.path, className: "card-premium group flex h-full items-center justify-between gap-3 rounded-xl p-4 text-sm font-semibold text-white/70 hover:text-burnt-orange", children: [
          /* @__PURE__ */ jsx("span", { children: item.label }),
          /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4 shrink-0" })
        ] }) }, item.path)) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { id: "service-faqs", className: "scroll-mt-24 py-12 sm:py-16 bg-black border-t border-white/5", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto px-4 sm:px-6", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-2xl sm:text-4xl font-black text-center mb-8 sm:mb-10", children: [
          combo.brandName,
          " ",
          combo.serviceName,
          " ",
          /* @__PURE__ */ jsx("span", { className: "text-burnt-orange", children: isArabic ? "الأسئلة الشائعة" : "FAQs" })
        ] }),
        /* @__PURE__ */ jsx(Accordion, { type: "single", collapsible: true, className: "space-y-3", children: combo.faqs.map((f, i) => /* @__PURE__ */ jsxs(AccordionItem, { value: `q-${i}`, className: "bg-white/[0.03] border border-white/10 rounded-2xl px-5 sm:px-6 data-[state=open]:border-burnt-orange/40", children: [
          /* @__PURE__ */ jsx(AccordionTrigger, { className: "text-left text-off-white font-semibold text-base sm:text-lg hover:no-underline py-5", children: f.question }),
          /* @__PURE__ */ jsx(AccordionContent, { forceMount: true, className: "text-gray-300 text-sm sm:text-base leading-relaxed pb-5", children: f.answer })
        ] }, i)) })
      ] }) }),
      !isArabic && combo.brandSlug === "volkswagen-service-dubai" && combo.serviceSlug === "engine-diagnostics" && /* @__PURE__ */ jsx("section", { className: "border-t border-white/10 bg-black py-8", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl px-4 sm:px-6", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold", children: "When a gearbox warning needs repair" }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 leading-relaxed text-gray-300", children: "ODIS-supported information can guide a gearbox investigation, but diagnosis and a confirmed repair are different tasks. If inspection points to the fitted DSG or another transmission, review the proposed service or repair scope." }),
        /* @__PURE__ */ jsx(LocalizedLink, { to: "/services/transmission-repair-dubai", className: "mt-4 inline-block text-burnt-orange underline", children: "Transmission and DSG assessment" })
      ] }) }),
      !isArabic && combo.brandSlug === "rox-service-dubai" && combo.serviceSlug === "soft-close-door-installation" && /* @__PURE__ */ jsx("section", { className: "border-t border-white/10 bg-black py-8", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl px-4 sm:px-6", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold", children: "Already fitted, but no longer pulling closed?" }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 leading-relaxed text-gray-300", children: "That is a fault-inspection task. The cross-brand soft-close service checks the latch, actuator, wiring and door alignment before a repair is proposed. Installation here starts with ROX 01 compatibility and component availability." }),
        /* @__PURE__ */ jsx(LocalizedLink, { to: "/services/soft-close-door-repair-dubai", className: "mt-4 inline-block text-burnt-orange underline", children: "Soft-close door fault inspection" })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "py-12 sm:py-16 bg-gradient-to-br from-charcoal/40 to-black border-t border-white/5", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6 sm:mb-8", children: [
          /* @__PURE__ */ jsx(Wrench, { className: "w-6 h-6 sm:w-8 sm:h-8 text-burnt-orange" }),
          /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-4xl font-black", children: isArabic ? /* @__PURE__ */ jsxs(Fragment, { children: [
            "المزيد من خدمات ",
            /* @__PURE__ */ jsx("span", { className: "text-burnt-orange", children: combo.brandName })
          ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            "More ",
            /* @__PURE__ */ jsx("span", { className: "text-burnt-orange", children: combo.brandName }),
            " Services"
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4", children: [
          otherServices.map((s) => /* @__PURE__ */ jsxs(
            LocalizedLink,
            {
              to: combo.brandSlug === "mercedes-benz-service-dubai" ? MERCEDES_SERVICE_PATHS[s.serviceSlug] ?? `/brands/${combo.brandSlug}/${s.serviceSlug}` : `/brands/${combo.brandSlug}/${s.serviceSlug}`,
              className: "card-premium group flex flex-col justify-between rounded-2xl p-4 sm:p-5 transition-all duration-300",
              children: [
                /* @__PURE__ */ jsxs("span", { className: "text-off-white font-bold text-sm sm:text-base leading-tight group-hover:text-burnt-orange", children: [
                  combo.brandName,
                  " ",
                  isArabic ? serviceNamesArabic[s.serviceSlug] ?? s.label : s.label
                ] }),
                /* @__PURE__ */ jsx(ArrowRight, { className: `w-4 h-4 text-burnt-orange mt-3 ${isArabic ? "rotate-180" : ""}` })
              ]
            },
            s.serviceSlug
          )),
          /* @__PURE__ */ jsxs(
            LocalizedLink,
            {
              to: `/brands/${combo.brandSlug}`,
              className: "group flex flex-col justify-between bg-burnt-orange/10 border border-burnt-orange/30 hover:bg-burnt-orange/20 rounded-2xl p-4 sm:p-5 transition-all duration-300",
              children: [
                /* @__PURE__ */ jsx("span", { className: "text-off-white font-bold text-sm sm:text-base leading-tight", children: isArabic ? `جميع خدمات ${combo.brandName}` : `All ${combo.brandName} Services` }),
                /* @__PURE__ */ jsx(ArrowRight, { className: `w-4 h-4 text-burnt-orange mt-3 ${isArabic ? "rotate-180" : ""}` })
              ]
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("div", { id: "service-booking", className: "scroll-mt-24", children: /* @__PURE__ */ jsx(
        FinalCTA,
        {
          title: `${combo.brandName} ${combo.serviceName}: discuss the next step`,
          description: combo.brandSlug === "mercedes-benz-service-dubai" && combo.serviceSlug === "engine-diagnostics" ? "Send the model, year, VIN, exact warning or symptom, when it occurs and any coding or programming request. We will confirm the appropriate first diagnostic stage and available access." : combo.brandSlug === "mercedes-benz-service-dubai" && combo.serviceSlug === "oil-change" ? "Send the model, year, VIN, mileage, ASSYST message and any oil warning or leak. We will confirm the oil approval, itemized scope and appointment availability." : combo.brandSlug === "mercedes-benz-service-dubai" && combo.serviceSlug === "suspension-repair" ? "Send the model, year, VIN, mileage, exact warning, which corner drops and when. We will confirm the appropriate suspension inspection and appointment availability." : "Share the model, year, mileage and the concern you want checked. The workshop can confirm the appropriate assessment, scope and appointment availability.",
          label: enquiryLabel,
          href: whatsappHref
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
export {
  BrandServicePage as default
};
