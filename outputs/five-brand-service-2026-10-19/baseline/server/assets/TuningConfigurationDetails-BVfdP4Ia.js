import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { j as stageLabels } from "../entry-server.js";
const hasPublishedTuningPackage = (carId) => carId !== "s63";
const unverifiedDb11Reinforcement = /* @__PURE__ */ new Set([
  "Stage 1 GAD transmission reinforcement MCT (~1100 Nm)",
  "Stage 2 GAD transmission reinforcement MCT with wet clutch (~1350 Nm)"
]);
const publishedTuningMods = (carId, stage, mods) => {
  if (!hasPublishedTuningPackage(carId)) return [];
  if (carId === "db11" && ["stage3", "stage4", "stage5"].includes(stage)) {
    return mods.filter((mod) => !unverifiedDb11Reinforcement.has(mod));
  }
  return [...mods];
};
const getTuningPublicationNote = (carId, isArabic = false) => {
  if (carId === "s63") return isArabic ? "حِزم S63 AMG E PERFORMANCE وطريقة تحديد ناتج الأداء بانتظار التحقق الخاص بهذا الطراز. لذلك لا تُعرض أرقام المراحل والأسعار والمدد والأعمال المشمولة. أرسل رقم الهيكل والتعديلات الحالية لتأكيد نطاق العمل المناسب لسيارتك." : "S63 AMG E PERFORMANCE packages and output basis are awaiting model-specific verification. Stage figures, prices, workshop times and included work are withheld. Send your VIN and current modifications so the team can confirm the applicable scope.";
  if (carId === "db11") return isArabic ? "حُجب وصف تقوية ناقل الحركة الموروث لأن ملاءمته لهذا التكوين من DB11 لم تُتحقق. أكّد نوع ناقل الحركة وأي أعمال تقوية ونطاق الحزمة النهائي في المقترح المكتوب." : "The inherited transmission-reinforcement description has been withheld because its compatibility with this DB11 configuration is unverified. Confirm gearbox identification, any reinforcement work and the final package scope in the written proposal.";
  return void 0;
};
const glc63PriceEndpoints = {
  stage3: ["€17,876", "€19,346"],
  stage4: ["€33,335", "€34,805"],
  stage5: ["€51,335", "€52,805"]
};
const getTuningPriceNote = (carId, stage, isArabic = false) => {
  const endpoints = carId === "glc63" ? glc63PriceEndpoints[stage] : void 0;
  if (!endpoints) return void 0;
  const [sevenSpeed, nineSpeed] = endpoints;
  return isArabic ? `تسجل GAD السعر الإجمالي ${sevenSpeed} باليورو لحزمة تقوية ناقل NAG2 ذي سبع سرعات (قدرة تحمّل تقارب 1100 نيوتن متر)، و${nineSpeed} باليورو لحزمة تقوية ناقل NAG3 ذي تسع سرعات (قدرة تحمّل تقارب 1250 نيوتن متر). تصف قائمة الأعمال المشمولة أدناه خيار التسع سرعات. أكّد ناقل الحركة المركب في سيارتك ونطاق الحزمة المناسب في المقترح المكتوب. هذه القيم تخص قدرة تحمّل ناقل الحركة وليست عزم المحرك بعد التعديل.` : `GAD lists ${sevenSpeed} total in EUR for the seven-speed NAG2 reinforcement package (~1100 Nm gearbox capacity), and ${nineSpeed} total in EUR for the nine-speed NAG3 reinforcement package (~1250 Nm gearbox capacity). The included-work list below describes the nine-speed option. Confirm the gearbox fitted to your vehicle and the applicable scope in the written proposal. These ratings describe gearbox capacity, not tuned torque.`;
};
const arTuning = {
  seo: {
    title: "برمجة وتطوير أداء السيارات في دبي | ديجي-تك",
    description: "برمجة ECU ومشاريع تطوير أداء مرتبطة بحالة السيارة والوقود والاستخدام والقطع الداعمة لدى ديجي-تك في القوز، دبي."
  },
  hero: {
    eyebrow: "مشاريع تطوير أداء مخصصة للسيارة في دبي",
    description: "نخطط برمجة وحدة التحكم وتطوير الأداء وفق السيارة وحالتها والوقود والاستخدام والقطع الداعمة، مع شرح الخطة والنتيجة المتوقعة قبل بدء العمل.",
    moreInfo: "للمزيد من المعلومات، تفضل بزيارة",
    cta: "احجز استشارة تطوير الأداء",
    whatsapp: "مرحباً، أود الاستفسار عن تطوير أداء سيارتي باستخدام حلول GAD."
  },
  content: {
    heading: "برمجة ECU ومشاريع تطوير الأداء في دبي",
    intro: "يعرض مهيئ الأداء الحالي طرازات محددة من مرسيدس وأستون مارتن DB11 ولامبورغيني Urus. تتوفر أيضاً مشاريع تطوير أداء بورشه، وتُؤكد تفاصيل الطراز والحزمة مباشرة مع الفريق إلى أن تُضاف بياناتها إلى المهيئ. يرتبط كل مقترح بالسيارة وحالتها وهدف المالك، مع مراجعة البرمجة والقطع الداعمة معاً.",
    vrx: "مشروع GAD Motors V-Class VRX في ورشتنا بدبي",
    vrxSuffix: "— مشروع مرسيدس V-Class مخصص يجمع هندسة الأداء من GAD مع المقصورة الفاخرة.",
    parts: "قد تتضمن الحزمة قطعاً لنظام الوقود أو السحب أو التيربو أو التبريد أو المحرك أو ناقل الحركة، وفق بيانات التكوين المختار. لا تتضمن جميع المراحل القطع نفسها أو برمجة ناقل الحركة؛ تُراجع الملاءمة والمتطلبات لكل سيارة قبل الاتفاق على نطاق العمل.",
    partsHeading: "قطع GAD Motors لتطوير الأداء في دبي",
    partsBody: "تجمع ديجي-تك بين الفحص والتركيب والمعايرة في ورشتها بالقوز. يحصل المالك على مقترح خاص بالسيارة يوضح البرمجة والقطع الداعمة والفحوص المطلوبة بعد التركيب.",
    nearHeading: "برمجة GAD بالقرب منك في دبي",
    nearBody: "تقدم ديجي-تك تقييم مشاريع تطوير الأداء وبرمجة ECU من ورشتها في القوز الصناعية 3، دبي.",
    nearBodyTwo: "تواصل معنا مع نوع السيارة وطرازها وسنة الصنع والتعديلات الحالية والاستخدام المطلوب لمناقشة الفحص ونطاق المشروع المناسب."
  },
  configurator: {
    eyebrow: "مُهيئ الأداء",
    headingPrefix: "اصنع",
    headingAccent: "قوتك",
    description: "اختر سيارتك وحدد مرحلة تطوير الأداء",
    horsepower: "القوة الحصانية",
    factory: "مواصفات المصنع",
    package: "حزمة",
    vipTitle: "حزمة الأداء VIP",
    vipDescription: "مشروع مخصص وفق مواصفات السيارة ونطاق العمل المتفق عليه. راجع البنود المدرجة للتكوين المختار وأرسل رقم الهيكل لتأكيد التوفر.",
    vipItems: [],
    vipCta: "اطلب استشارة VIP",
    previous: "السيارة السابقة",
    next: "السيارة التالية"
  }
};
const arabicStageLabels = {
  stock: "المصنع",
  stage1: "المرحلة 1",
  stage2: "المرحلة 2",
  stage3: "المرحلة 3",
  stage4: "المرحلة 4",
  stage5: "المرحلة 5",
  vip: "VIP"
};
const arabicTuningModifications = {
  "Factory Specifications": "مواصفات المصنع",
  "Airfilter": "فلتر هواء",
  "Optimization of engine software": "تحسين برمجيات المحرك",
  "Deactivation of the speed limiter V-Max": "تعطيل محدد السرعة القصوى V-Max",
  "Downpipe with sport catalytic converter": "داون بايب مع محول حفاز رياضي",
  "Heat coating for downpipe": "طلاء حراري للداون بايب",
  "Transmission software optimization (TCU)": "تحسين برمجيات وحدة التحكم بناقل الحركة TCU",
  "TCU-Software": "برمجيات وحدة التحكم بناقل الحركة TCU",
  "Pulse Flow exhaust manifold": "مجمع عادم Pulse Flow",
  "Twin Scroll GAD Turbocharger (GAD 177 55/63)": "تيربو GAD ثنائي المسار (GAD 177 55/63)",
  "GAD Upgrade Twin Scroll turbocharger (GAD 177 55/68)": "تيربو GAD مطور ثنائي المسار (GAD 177 55/68)",
  "GAD upgrade Twinscroll Turbocharger (GAD 177 55/68)": "تيربو GAD مطور ثنائي المسار (GAD 177 55/68)",
  "GAD TwinScroll Turbocharger (GAD 177 55/68)": "تيربو GAD ثنائي المسار (GAD 177 55/68)",
  "GAD ball-bearing Twin Scroll turbocharger (GAD 177 60/76R)": "تيربو GAD ثنائي المسار بمحامل كروية (GAD 177 60/76R)",
  "GAD Twin Scroll Turbocharger GAD 177 60/76R": "تيربو GAD ثنائي المسار GAD 177 60/76R",
  "GAD Upgrade ball-bearing Twin Scroll Turbocharger (GAD 825-60/71R)": "تيربو GAD مطور ثنائي المسار بمحامل كروية (GAD 825-60/71R)",
  "High pressure fuel system with increased flow": "نظام وقود عالي الضغط بتدفق أعلى",
  "Stage 1 GAD SLS/GTS/GTR double-clutch reinforcement (~1200 Nm)": "تقوية GAD المرحلة 1 لناقل SLS/GTS/GTR مزدوج القابض (~1200 نيوتن متر)",
  "GAD forged pistons with lower compression": "مكابس GAD مطروقة بنسبة انضغاط أقل",
  "GAD optimized cylinder heads with larger channels": "رؤوس أسطوانات GAD محسنة بقنوات أكبر",
  "Cylinder head bolts": "مسامير رؤوس الأسطوانات",
  "Engine gasket set": "طقم حشوات المحرك",
  "Oil & Oilfilter": "زيت وفلتر زيت",
  "Oil & Oil filter": "زيت وفلتر زيت",
  "Bespoke ECU Calibration": "معايرة ECU مخصصة",
  "Dyno Testing & Validation": "اختبار داينو والتحقق من النتائج",
  "Full Custom Build": "مشروع مخصص بالكامل",
  "Full Custom Build – 1000+ hp": "مشروع مخصص بالكامل – 1000+ حصان",
  "Full Custom Build – 1100+ hp": "مشروع مخصص بالكامل – 1100+ حصان",
  "Full Custom Build – up to 1300 hp": "مشروع مخصص بالكامل – حتى 1300 حصان",
  "Exclusive tuning on individual request": "تطوير أداء مخصص بناءً على طلب فردي",
  "Send VIN for availability": "أرسل رقم الهيكل لتأكيد التوفر",
  "Adjustment of the PCM": "ضبط PCM",
  "Adjustment of the PCM (Powertrain control module)": "ضبط PCM (وحدة التحكم بمجموعة نقل الحركة)",
  "GAD Airfilter box": "علبة فلتر هواء GAD",
  "GAD high pressure pump": "مضخة GAD عالية الضغط",
  "GAD transmission reinforcement (~1250 Nm)": "تقوية ناقل الحركة من GAD (~1250 نيوتن متر)",
  "Stage 1 Automatic transmission NAG 3 reinforcement (~1150 Nm)": "تقوية المرحلة 1 لناقل الحركة الأوتوماتيكي NAG 3 (~1150 نيوتن متر)",
  "Stage 1 GAD reinforcement NAG2 (7G-Tronic) (~1250 Nm)": "تقوية GAD المرحلة 1 لناقل NAG2 (7G-Tronic) (~1250 نيوتن متر)",
  "Stage 1 GAD reinforcement NAG2 (7G-Tronic) with torque converter (~1250 Nm)": "تقوية GAD المرحلة 1 لناقل NAG2 (7G-Tronic) مع محول العزم (~1250 نيوتن متر)",
  "Stage 1 GAD transmission reinforcement MCT (~1100 Nm)": "تقوية GAD المرحلة 1 لناقل MCT (~1100 نيوتن متر)",
  "Stage 2 GAD reinforcement NAG2 (7G-Tronic) (~1400 Nm)": "تقوية GAD المرحلة 2 لناقل NAG2 (7G-Tronic) (~1400 نيوتن متر)",
  "Stage 2 GAD transmission reinforcement MCT with wet clutch (~1350 Nm)": "تقوية GAD المرحلة 2 لناقل MCT مع قابض رطب (~1350 نيوتن متر)",
  "High Performance Intercooler": "إنتركولر عالي الأداء",
  "Custom high flow intercooler": "إنتركولر مخصص عالي التدفق",
  "Exhaust system": "نظام عادم",
  "Optimization of the exhaust system": "تحسين نظام العادم",
  "Optimization of the low-temperature circuit": "تحسين دائرة التبريد منخفضة الحرارة",
  "Open airboxes": "علب فلتر هواء مفتوحة",
  "Software for CPC": "برمجيات CPC",
  "Software for CPC (central powertrain controller)": "برمجيات CPC (وحدة التحكم المركزية بمجموعة نقل الحركة)",
  "Special ceramic heat coating": "طلاء حراري سيراميكي خاص",
  "Turbo installation kit (cooling water and oil lines)": "طقم تركيب التيربو (خطوط ماء التبريد والزيت)",
  "Turbocharger upgrade": "ترقية التيربو",
  "Upgrade Twin Scroll Turbocharger GAD 177 55/68": "تيربو مطور ثنائي المسار GAD 177 55/68",
  "Upgrade Twin Scroll Turbocharger GAD 177 60/76R": "تيربو مطور ثنائي المسار GAD 177 60/76R",
  "Upgrade turbocharger (GAD 177 50/63)": "تيربو مطور (GAD 177 50/63)",
  "Upgrade turbocharger (GAD 279 60/76R)": "تيربو مطور (GAD 279 60/76R)"
};
const localizeTuningMod = (mod, _index) => arabicTuningModifications[mod] ?? mod;
const localizeDuration = (value) => value.replace(/days?/gi, "أيام").replace(/hours?/gi, "ساعات").replace(/weeks?/gi, "أسابيع");
function TuningConfigurationDetails({ cars, isArabic = false, heading }) {
  const brands = [...new Set(cars.map((car) => car.brand))];
  return /* @__PURE__ */ jsx("section", { id: "performance-packages", className: "border-t border-white/10 py-14 sm:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl px-5 sm:px-8", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold sm:text-4xl", children: heading ?? (isArabic ? "السيارات والحِزم وأسعار تطوير الأداء" : "Supported vehicles, tuning packages and prices") }),
    /* @__PURE__ */ jsx("p", { className: "mt-5 max-w-4xl text-sm leading-7 text-white/65", children: isArabic ? "افتح الطراز لمقارنة جميع الحِزم. الأرقام والأسعار والمدد هي بيانات مُهيئ الأداء. الأسعار باليورو كما نُشرت، وليست تحويلاً إلى الدرهم. أكّد مواصفات السيارة وبرمجتها والقطع الحالية ونطاق العمل مع الورشة قبل الحجز. أرقام المُهيئ مرجعية ولا تضمن نتيجة كل سيارة." : "Open a model to compare every listed package. Figures, prices and workshop estimates come from the Performance Configurator. Prices remain in EUR as published. Confirm the exact vehicle, software version, existing modifications and final installation scope with the workshop before booking. Reference outputs are not a guarantee for every car." }),
    brands.map((brand) => /* @__PURE__ */ jsxs("div", { className: "mt-10", children: [
      /* @__PURE__ */ jsx("h3", { className: "mb-4 text-xl font-semibold", children: brand }),
      /* @__PURE__ */ jsx("div", { className: "space-y-4", children: cars.filter((car) => car.brand === brand).map((car, index) => {
        var _a;
        const stock = (_a = car.stages.stock) == null ? void 0 : _a.spec;
        const stages = car.availableStages.filter((stage) => stage !== "stock");
        const publicationNote = getTuningPublicationNote(car.id, isArabic);
        return /* @__PURE__ */ jsxs("details", { id: `${car.id}-packages`, open: cars.length === 1 || index === 0, className: "rounded-xl border border-white/15 bg-white/[0.02] p-4 sm:p-6", children: [
          /* @__PURE__ */ jsxs("summary", { className: "cursor-pointer text-lg font-semibold text-off-white", children: [
            car.name,
            " · ",
            car.engine
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-5", children: [
            publicationNote && /* @__PURE__ */ jsx("p", { "data-tuning-publication-note": car.id, className: "mb-4 text-sm leading-7 text-white/70", children: publicationNote }),
            hasPublishedTuningPackage(car.id) && /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsxs("h4", { className: "font-semibold", children: [
                car.name,
                " — ",
                isArabic ? "المحرك والمواصفات الأصلية" : "engine and stock output"
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "mt-2 text-sm leading-7 text-white/70", children: [
                car.engine,
                stock && ` · ${stock.hp} HP · ${stock.torque} Nm`
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "mt-2 text-sm text-white/65", children: [
                isArabic ? "المراحل المتاحة: " : "Available packages: ",
                stages.map((stage) => isArabic ? arabicStageLabels[stage] : stageLabels[stage]).join(", ")
              ] }),
              /* @__PURE__ */ jsx("div", { className: "mt-5 overflow-x-auto rounded-lg border border-white/10", role: "region", "aria-label": `${car.name} ${isArabic ? "مقارنة الحِزم" : "package comparison"}`, tabIndex: 0, children: /* @__PURE__ */ jsxs("table", { className: "w-full min-w-[760px] text-left text-sm", children: [
                /* @__PURE__ */ jsxs("caption", { className: "px-4 py-3 text-left text-white/70", children: [
                  car.name,
                  ": ",
                  isArabic ? "القوة والعزم والسعر والوقت لكل حزمة" : "stock vs tuned power, torque, price and workshop time"
                ] }),
                /* @__PURE__ */ jsx("thead", { className: "bg-white/5", children: /* @__PURE__ */ jsx("tr", { children: (isArabic ? ["الحزمة", "قوة المصنع HP", "قوة الحزمة HP", "زيادة HP", "عزم المصنع Nm", "عزم الحزمة Nm", "زيادة Nm", "السعر EUR", "المدة المتوقعة"] : ["Package", "Stock HP", "Tuned HP", "HP gain", "Stock Nm", "Tuned Nm", "Nm gain", "Price (EUR)", "Estimated time"]).map((label) => /* @__PURE__ */ jsx("th", { scope: "col", className: "px-3 py-3 font-semibold", children: label }, label)) }) }),
                /* @__PURE__ */ jsx("tbody", { children: stages.map((stage) => {
                  const info = car.stages[stage];
                  if (!info) return null;
                  return /* @__PURE__ */ jsxs("tr", { "data-tuning-package": `${car.id}:${stage}`, className: "border-t border-white/10", children: [
                    /* @__PURE__ */ jsx("th", { scope: "row", className: "px-3 py-3 text-left font-medium", children: isArabic ? arabicStageLabels[stage] : stageLabels[stage] }),
                    /* @__PURE__ */ jsx("td", { className: "px-3 py-3", children: stock == null ? void 0 : stock.hp }),
                    /* @__PURE__ */ jsx("td", { className: "px-3 py-3", children: info.spec.hp }),
                    /* @__PURE__ */ jsx("td", { className: "px-3 py-3", children: stock ? info.spec.hp - stock.hp : "" }),
                    /* @__PURE__ */ jsx("td", { className: "px-3 py-3", children: stock == null ? void 0 : stock.torque }),
                    /* @__PURE__ */ jsx("td", { className: "px-3 py-3", children: info.spec.torque }),
                    /* @__PURE__ */ jsx("td", { className: "px-3 py-3", children: stock ? info.spec.torque - stock.torque : "" }),
                    /* @__PURE__ */ jsx("td", { className: "whitespace-nowrap px-3 py-3", children: info.price }),
                    /* @__PURE__ */ jsx("td", { className: "whitespace-nowrap px-3 py-3", children: isArabic ? localizeDuration(info.time) : info.time })
                  ] }, stage);
                }) })
              ] }) }),
              /* @__PURE__ */ jsx("div", { className: "mt-6 grid gap-6 md:grid-cols-2", children: stages.map((stage) => {
                const info = car.stages[stage];
                if (!info) return null;
                return /* @__PURE__ */ jsxs("div", { id: `${car.id}-${stage}`, children: [
                  /* @__PURE__ */ jsxs("h5", { className: "font-semibold text-burnt-orange", children: [
                    isArabic ? arabicStageLabels[stage] : stageLabels[stage],
                    " — ",
                    isArabic ? "العمل المشمول" : "what’s included"
                  ] }),
                  getTuningPriceNote(car.id, stage, isArabic) && /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-7 text-white/70", children: getTuningPriceNote(car.id, stage, isArabic) }),
                  /* @__PURE__ */ jsx("ul", { className: "mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-white/70", children: publishedTuningMods(car.id, stage, info.mods).map((mod, i) => /* @__PURE__ */ jsx("li", { children: isArabic ? localizeTuningMod(mod) : mod }, `${mod}-${i}`)) })
                ] }, stage);
              }) })
            ] })
          ] })
        ] }, car.id);
      }) })
    ] }, brand))
  ] }) });
}
export {
  TuningConfigurationDetails as T,
  getTuningPriceNote as a,
  arTuning as b,
  arabicStageLabels as c,
  localizeDuration as d,
  getTuningPublicationNote as g,
  hasPublishedTuningPackage as h,
  localizeTuningMod as l,
  publishedTuningMods as p
};
