import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { u as useLocale, t as tuningCars, j as stageLabels, p as pageGraph, a as buildWebPage, g as buildBreadcrumb, h as buildService, c as buildFAQ, d as useSeo, L as LocalizedLink, k as tuningModelPages } from "../entry-server.js";
import { H as Header, F as Footer } from "./Footer-D0Xl6ot8.js";
import { A as AnswerBlock } from "./AnswerBlock-DWkHPVA7.js";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { h as hasPublishedTuningPackage, g as getTuningPublicationNote, a as getTuningPriceNote, p as publishedTuningMods, b as arTuning, c as arabicStageLabels, l as localizeTuningMod, d as localizeDuration, T as TuningConfigurationDetails } from "./TuningConfigurationDetails-BVfdP4Ia.js";
import { Zap, Wrench, DollarSign, Clock, Crown, ChevronLeft, ChevronRight } from "lucide-react";
import { C as CtaAssurance, T as TrustBar } from "./TrustBar-D6jkMLGQ.js";
import { F as FinalCTA } from "./FinalCTA-DCkhXNCr.js";
import "node:stream";
import "react-dom/server";
import "react-router-dom/server.mjs";
import "react-router-dom";
import "@radix-ui/react-toast";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "next-themes";
import "sonner";
import "@radix-ui/react-tooltip";
import "@tanstack/react-query";
import "./Reveal-B0bzMO-v.js";
function useAnimatedCounter(target, duration = 800, decimals = 0) {
  const [value, setValue] = useState(target);
  const animationRef = useRef();
  useRef();
  const fromRef = useRef(target);
  useEffect(() => {
    const from = fromRef.current;
    const diff = target - from;
    if (diff === 0) return;
    const start = performance.now();
    const animate = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = from + diff * eased;
      setValue(Number(current.toFixed(decimals)));
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        fromRef.current = target;
      }
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      fromRef.current = target;
    };
  }, [target, duration, decimals]);
  return value;
}
function AnimatedStat({ label, value, unit, icon: Icon, gain }) {
  const display = useAnimatedCounter(value, 700, unit === "s" ? 1 : 0);
  return /* @__PURE__ */ jsxs("div", { className: "flex min-w-52 flex-col items-center border-y border-white/[0.1] px-6 py-5 md:py-6", children: [
    /* @__PURE__ */ jsx(Icon, { className: "w-5 h-5 text-burnt-orange mb-2" }),
    /* @__PURE__ */ jsx("span", { className: "text-xs uppercase tracking-widest text-white/40 mb-1", children: label }),
    /* @__PURE__ */ jsxs("span", { className: "text-3xl font-semibold tracking-[-0.04em] text-off-white tabular-nums md:text-4xl", children: [
      display,
      /* @__PURE__ */ jsx("span", { className: "text-lg ml-1 text-white/50", children: unit })
    ] }),
    gain !== void 0 && gain !== 0 && /* @__PURE__ */ jsxs("span", { className: `text-sm mt-1 font-semibold ${gain > 0 ? "text-burnt-orange" : "text-green-400"}`, children: [
      gain > 0 ? "+" : "",
      gain,
      unit === "s" ? "s" : ` ${unit}`
    ] })
  ] });
}
function CarSelector({ cars, selectedIndex, onSelect, isArabic }) {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, scrollLeft: 0 });
  const scrollToIndex = useCallback((index) => {
    const el = scrollRef.current;
    if (!el) return;
    const child = el.children[index];
    if (!child) return;
    const childCenter = child.offsetLeft + child.offsetWidth / 2;
    el.scrollTo({ left: childCenter - el.clientWidth / 2, behavior: "smooth" });
  }, []);
  useEffect(() => {
    scrollToIndex(selectedIndex);
  }, [selectedIndex, scrollToIndex]);
  const handleMouseDown = (e) => {
    var _a;
    setIsDragging(true);
    dragStart.current = { x: e.pageX, scrollLeft: ((_a = scrollRef.current) == null ? void 0 : _a.scrollLeft) || 0 };
  };
  const handleMouseMove = (e) => {
    if (!isDragging || !scrollRef.current) return;
    const dx = e.pageX - dragStart.current.x;
    scrollRef.current.scrollLeft = dragStart.current.scrollLeft - dx;
  };
  const handleMouseUp = () => setIsDragging(false);
  const prev = () => onSelect(Math.max(0, selectedIndex - 1));
  const next = () => onSelect(Math.min(cars.length - 1, selectedIndex + 1));
  return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsx("button", { "aria-label": isArabic ? arTuning.configurator.previous : "Previous car", onClick: prev, className: "absolute left-1 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#151617] text-white/60 transition-colors hover:border-white/30 hover:text-white md:left-4 md:h-10 md:w-10", children: /* @__PURE__ */ jsx(ChevronLeft, { className: "w-4 h-4 md:w-5 md:h-5" }) }),
    /* @__PURE__ */ jsx("button", { "aria-label": isArabic ? arTuning.configurator.next : "Next car", onClick: next, className: "absolute right-1 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#151617] text-white/60 transition-colors hover:border-white/30 hover:text-white md:right-4 md:h-10 md:w-10", children: /* @__PURE__ */ jsx(ChevronRight, { className: "w-4 h-4 md:w-5 md:h-5" }) }),
    /* @__PURE__ */ jsx("div", { className: "absolute left-0 top-0 bottom-0 w-16 md:w-40 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" }),
    /* @__PURE__ */ jsx("div", { className: "absolute right-0 top-0 bottom-0 w-16 md:w-40 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" }),
    /* @__PURE__ */ jsx(
      "div",
      {
        ref: scrollRef,
        className: "flex overflow-x-auto scrollbar-hide gap-2 py-6 md:py-8 px-[35%] md:px-[40%] cursor-grab active:cursor-grabbing",
        style: { scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" },
        onMouseDown: handleMouseDown,
        onMouseMove: handleMouseMove,
        onMouseUp: handleMouseUp,
        onMouseLeave: handleMouseUp,
        children: cars.map((car, i) => {
          const isSelected = i === selectedIndex;
          return /* @__PURE__ */ jsxs(
            "div",
            {
              onClick: () => onSelect(i),
              className: "flex w-[220px] flex-shrink-0 cursor-pointer flex-col items-center transition-all duration-500 sm:w-[280px]",
              children: [
                /* @__PURE__ */ jsx("div", { className: `relative transition-all duration-500 ${isSelected ? "scale-105" : "scale-[0.82] opacity-35"}`, children: /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: car.image,
                    alt: car.name,
                    className: "w-48 h-28 md:w-64 md:h-40 object-contain drop-shadow-2xl",
                    loading: "lazy",
                    draggable: false
                  }
                ) }),
                /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: isSelected && /* @__PURE__ */ jsxs(
                  motion.div,
                  {
                    initial: false,
                    animate: { opacity: 1, y: 0 },
                    exit: { opacity: 0, y: -10 },
                    className: "mt-3 text-center",
                    children: [
                      /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-[0.2em] text-burnt-orange font-medium", children: car.brand }),
                      /* @__PURE__ */ jsx("h3", { className: "text-xl md:text-2xl font-bold text-off-white mt-1", children: car.name }),
                      /* @__PURE__ */ jsx("p", { className: "text-xs text-white/30 mt-0.5", children: car.engine })
                    ]
                  }
                ) })
              ]
            },
            car.id
          );
        })
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "flex justify-center gap-1 md:gap-1.5 mt-2 flex-wrap px-4", children: cars.map((_, i) => /* @__PURE__ */ jsx(
      "button",
      {
        "aria-label": isArabic ? `اختر ${cars[i].name}` : `Select ${cars[i].name}`,
        "aria-pressed": i === selectedIndex,
        onClick: () => onSelect(i),
        className: `w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all duration-300 ${i === selectedIndex ? "bg-burnt-orange w-4 md:w-6" : "bg-white/20 hover:bg-white/40"}`
      },
      i
    )) })
  ] });
}
function StageSelector({ stages, active, onChange, isArabic }) {
  return /* @__PURE__ */ jsx("div", { className: "mx-4 flex flex-wrap items-center justify-center gap-1 border-y border-white/[0.08] p-1.5 md:mx-auto md:w-fit md:gap-2", children: stages.map((stage) => {
    const isActive = stage === active;
    const isVip = stage === "vip";
    return /* @__PURE__ */ jsxs(
      "button",
      {
        "aria-pressed": isActive,
        onClick: () => onChange(stage),
        className: `relative px-2.5 sm:px-3 md:px-5 py-2 sm:py-2.5 rounded-xl text-[10px] sm:text-xs md:text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${isActive ? isVip ? "bg-burnt-orange text-black" : "bg-burnt-orange text-black" : "text-white/50 hover:text-white/80 hover:bg-white/[0.05]"}`,
        children: [
          isVip && /* @__PURE__ */ jsx(Crown, { className: "w-3 h-3 inline-block mr-1 -mt-0.5" }),
          isArabic ? arabicStageLabels[stage] : stageLabels[stage]
        ]
      },
      stage
    );
  }) });
}
function TuningConfigurator() {
  var _a;
  const { isArabic } = useLocale();
  const [carIndex, setCarIndex] = useState(0);
  const [stage, setStage] = useState("stage1");
  const car = tuningCars[carIndex];
  const availableStages = car.availableStages;
  useEffect(() => {
    if (!availableStages.includes(stage)) {
      setStage(availableStages[1] || availableStages[0]);
    }
  }, [carIndex, availableStages, stage]);
  const stageInfo = car.stages[stage];
  const stockSpec = (_a = car.stages.stock) == null ? void 0 : _a.spec;
  if (!stageInfo || !stockSpec) return null;
  const isVip = stage === "vip";
  const publishesPackage = hasPublishedTuningPackage(car.id);
  const publicationNote = getTuningPublicationNote(car.id, isArabic);
  const priceNote = getTuningPriceNote(car.id, stage, isArabic);
  const publicMods = publishedTuningMods(car.id, stage, stageInfo.mods);
  const hpGain = stageInfo.spec.hp - stockSpec.hp;
  stageInfo.spec.torque - stockSpec.torque;
  +(stageInfo.spec.zeroToHundred - stockSpec.zeroToHundred).toFixed(1);
  return /* @__PURE__ */ jsx("section", { id: "performance-configurator", className: "relative overflow-hidden border-y border-white/[0.08] bg-[#101113] py-16 transition-colors duration-700 md:py-24", children: /* @__PURE__ */ jsxs("div", { className: "relative z-10 mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-12 max-w-3xl", children: [
      /* @__PURE__ */ jsx("p", { className: "home-kicker mb-3", children: isArabic ? arTuning.configurator.eyebrow : "Performance Configurator" }),
      /* @__PURE__ */ jsxs("h2", { className: "text-3xl font-semibold tracking-[-0.04em] text-off-white sm:text-4xl md:text-5xl", children: [
        isArabic ? arTuning.configurator.headingPrefix : "Build Your",
        " ",
        /* @__PURE__ */ jsx("span", { className: "text-burnt-orange", children: isArabic ? arTuning.configurator.headingAccent : "Power" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-lg text-sm leading-7 text-white/45 md:text-base", children: isArabic ? arTuning.configurator.description : "Select your vehicle and configure your performance stage" }),
      /* @__PURE__ */ jsx("a", { href: "#performance-packages", className: "mt-4 inline-block text-sm text-burnt-orange underline", children: isArabic ? "قارن جميع الحِزم والأسعار" : "Compare all vehicle packages and prices" })
    ] }),
    /* @__PURE__ */ jsx(CarSelector, { cars: tuningCars, selectedIndex: carIndex, onSelect: setCarIndex, isArabic }),
    publishesPackage && /* @__PURE__ */ jsxs(Fragment, { children: [
      publicationNote && /* @__PURE__ */ jsx("p", { className: "mx-auto mt-8 max-w-2xl text-sm leading-7 text-white/70", "data-tuning-publication-note": car.id, children: publicationNote }),
      /* @__PURE__ */ jsx("div", { className: "mt-10 mb-10", children: /* @__PURE__ */ jsx(StageSelector, { stages: availableStages, active: stage, onChange: setStage, isArabic }) }),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: false,
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4 },
          className: "flex justify-center mb-12",
          children: /* @__PURE__ */ jsx(AnimatedStat, { label: isArabic ? arTuning.configurator.horsepower : "Horsepower", value: stageInfo.spec.hp, unit: "HP", icon: Zap, gain: hpGain })
        },
        `${car.id}-${stage}`
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "relative mb-12 flex items-center justify-center", children: /* @__PURE__ */ jsx(
      motion.img,
      {
        src: car.image,
        alt: car.name,
        className: "relative z-10 h-auto w-[260px] object-contain sm:w-[340px] md:w-[500px]",
        initial: false,
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.5 }
      },
      `${car.id}-img`
    ) }),
    publishesPackage ? /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("div", { className: "max-w-2xl mx-auto mb-12", children: /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: false,
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4 },
          className: "border-t border-white/[0.1] py-6 md:py-8",
          children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-lg font-bold text-off-white mb-4 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Wrench, { className: "w-4 h-4 text-burnt-orange" }),
              stage === "stock" ? isArabic ? arTuning.configurator.factory : "Factory Specifications" : isArabic ? `${arTuning.configurator.package} ${arabicStageLabels[stage]}` : `${stageLabels[stage]} Package`
            ] }),
            priceNote && /* @__PURE__ */ jsx("p", { className: "mb-5 text-sm leading-7 text-white/70", "data-tuning-price-note": `${car.id}:${stage}`, children: priceNote }),
            /* @__PURE__ */ jsx("ul", { className: "space-y-3 mb-6", children: publicMods.map((mod, i) => /* @__PURE__ */ jsxs(
              motion.li,
              {
                initial: false,
                animate: { opacity: 1, x: 0 },
                transition: { delay: i * 0.05 },
                className: "flex items-start gap-3 text-sm text-white/70",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-burnt-orange flex-shrink-0 mt-1.5" }),
                  isArabic ? localizeTuningMod(mod) : mod
                ]
              },
              mod
            )) }),
            stage !== "stock" && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6 pt-4 border-t border-white/[0.06]", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-white/50", children: [
                /* @__PURE__ */ jsx(DollarSign, { className: "w-4 h-4 text-burnt-orange" }),
                /* @__PURE__ */ jsx("span", { className: "text-off-white font-semibold", children: stageInfo.price })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-white/50", children: [
                /* @__PURE__ */ jsx(Clock, { className: "w-4 h-4 text-burnt-orange" }),
                /* @__PURE__ */ jsx("span", { className: "text-off-white font-semibold", children: isArabic ? localizeDuration(stageInfo.time) : stageInfo.time })
              ] })
            ] })
          ]
        },
        `mods-${car.id}-${stage}`
      ) }),
      /* @__PURE__ */ jsx(AnimatePresence, { children: isVip && /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: 30 },
          transition: { duration: 0.5 },
          className: "relative mx-auto max-w-4xl overflow-hidden border-t border-burnt-orange/35 py-8 text-center md:py-12",
          children: [
            /* @__PURE__ */ jsx(Crown, { className: "w-10 h-10 text-burnt-orange mx-auto mb-4" }),
            /* @__PURE__ */ jsx("h3", { className: "text-2xl md:text-3xl font-black text-off-white mb-3", children: isArabic ? arTuning.configurator.vipTitle : "VIP Performance Package" }),
            /* @__PURE__ */ jsx("p", { className: "text-white/50 max-w-xl mx-auto mb-6 text-sm md:text-base", children: isArabic ? arTuning.configurator.vipDescription : "Review the listed software and hardware for this vehicle’s VIP package with the workshop. Confirm compatibility, scope and testing before agreeing the build." }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 max-w-lg mx-auto", children: (isArabic ? arTuning.configurator.vipItems : ["Vehicle-specific scope", "Confirm package compatibility"]).map((item) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-2 text-sm text-burnt-orange font-medium", children: [
              /* @__PURE__ */ jsx("div", { className: "w-1 h-1 rounded-full bg-burnt-orange" }),
              item
            ] }, item)) }),
            /* @__PURE__ */ jsx("a", { href: `https://wa.me/97143402223?text=${encodeURIComponent(`Hi DIGI-TEC, I would like to discuss the ${car.name} ${car.engine} VIP tuning package.`)}`, target: "_blank", rel: "noopener noreferrer", className: "btn-primary mt-8 inline-flex", children: isArabic ? arTuning.configurator.vipCta : "Request VIP Consultation" })
          ]
        }
      ) })
    ] }) : /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-2xl border-t border-white/10 py-8 text-center", "data-tuning-enquiry": car.id, children: [
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-off-white", children: isArabic ? "استفسار عن S63 AMG E PERFORMANCE" : "S63 AMG E PERFORMANCE enquiry" }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm leading-7 text-white/70", children: publicationNote }),
      /* @__PURE__ */ jsx("a", { href: `https://wa.me/97143402223?text=${encodeURIComponent(isArabic ? "مرحباً ديجي-تك، أود تقييم تطوير أداء سيارتي S63 AMG E PERFORMANCE وتأكيد الحِزم المتاحة وفق رقم الهيكل." : "Hi DIGI-TEC, I would like an S63 AMG E PERFORMANCE assessment and confirmation of any model-specific tuning package for my VIN.")}`, target: "_blank", rel: "noopener noreferrer", className: "btn-primary mt-6 inline-flex", children: isArabic ? "اطلب تقييم سيارتك" : "Request vehicle assessment" })
    ] })
  ] }) });
}
const exampleVehicle = tuningCars.find((car) => car.id === "amg-gt-gts");
const exampleStage = exampleVehicle.stages.stage1;
const Tuning = () => {
  const { isArabic } = useLocale();
  const url = `https://digitecme.com${isArabic ? "/ar" : ""}/tuning`;
  const title = isArabic ? arTuning.seo.title : "Car Performance Tuning Dubai | ECU Remap & Prices | DIGI-TEC";
  const description = isArabic ? arTuning.seo.description : "Car performance tuning and ECU remapping in Al Quoz, Dubai. Compare supported vehicles, stage packages, power, torque, EUR prices and workshop time.";
  const englishFaqs = [
    { question: "How does Digi-Tec plan an ECU tuning project?", answer: "The team starts with the vehicle, current condition, fuel, intended use and supporting hardware. The proposed calibration and any hardware requirements are then explained before work begins." },
    { question: "How much power can a tuned car gain?", answer: "The result depends on the exact platform, its condition, fuel, calibration and supporting hardware. Vehicle-specific figures should be confirmed after inspection rather than treated as a universal promise." },
    { question: "Which cars does the Performance Configurator support?", answer: "The configurator lists specific Mercedes-Benz and AMG models, the Aston Martin DB11 and Lamborghini Urus. Use the exact engine and package listing rather than assuming every model from a brand is covered. Porsche tuning is available by enquiry; its model and configuration details must be confirmed with the workshop." },
    { question: "How much does ECU or Stage 1 tuning cost in Dubai?", answer: `Price depends on the model, engine and package. For example, the ${exampleVehicle.engine} ${exampleVehicle.name} Stage 1 package is listed at ${exampleStage.price} with ${exampleStage.spec.hp} HP and an estimated ${exampleStage.time}. The comparison below shows every listed configuration in EUR. Confirm the vehicle, software version, existing modifications and final scope before booking.` },
    { question: "Is chip tuning the same as an ECU remap?", answer: "Chip tuning is a common search term for performance software. The listed packages describe engine software optimization or calibration, not a promise of physical chip replacement. The supported ECU and software version determine the work for the vehicle." },
    { question: "Are Stage 1, Stage 2 and Stage 3 the same for every vehicle?", answer: "No. A stage is a vehicle-specific package label. The listed software, hardware, output, price and time vary by model and engine. Check each package rather than applying a universal stage definition." },
    { question: "Is gearbox or TCU tuning included with every engine tune?", answer: "No. TCU software and transmission reinforcement appear only in particular package lists. For example, M178 AMG GT / GTS Stage 2 lists transmission software optimization. Confirm the package and gearbox compatibility rather than assuming every ECU tune includes it." }
  ];
  const arabicFaqs = [
    { question: "كيف تخطط ديجي-تك لمشروع برمجة ECU؟", answer: "نبدأ بمراجعة السيارة وحالتها ونوع الوقود والاستخدام والقطع الداعمة، ثم نشرح المعايرة المقترحة وأي متطلبات قبل بدء العمل." },
    { question: "كم يمكن أن تزيد قوة السيارة بعد البرمجة؟", answer: "تعتمد النتيجة على المنصة وحالة السيارة والوقود والمعايرة والقطع الداعمة. يجب تأكيد الأرقام الخاصة بالسيارة بعد الفحص بدلاً من اعتبارها وعداً عاماً." },
    { question: "ما السيارات المدرجة في مُهيئ الأداء؟", answer: "يعرض المُهيئ طرازات محددة من Mercedes-Benz وAMG وأستون مارتن DB11 ولامبورغيني Urus. يجب مطابقة المحرك والحزمة، ولا يعني إدراج علامة دعم جميع طرازاتها. تتوفر استفسارات تطوير أداء بورش عبر الورشة مع تأكيد الطراز وتفاصيل الحزمة." },
    { question: "كم تبلغ تكلفة برمجة ECU أو المرحلة الأولى؟", answer: `يتحدد السعر حسب الطراز والمحرك والحزمة. مثلاً، حزمة المرحلة الأولى لمحرك ${exampleVehicle.engine} في ${exampleVehicle.name} مدرجة بسعر ${exampleStage.price} وقوة ${exampleStage.spec.hp} HP ومدة متوقعة ${exampleStage.time}. يعرض الجدول الأسعار باليورو كما نُشرت. أكّد مواصفات السيارة والبرمجة والتعديلات الحالية ونطاق العمل قبل الحجز.` },
    { question: "هل مصطلح chip tuning يعني استبدال شريحة؟", answer: "يُستخدم المصطلح عادة للبحث عن برمجة الأداء. تصف الحِزم المدرجة تحسين برمجة المحرك أو معايرته، ولا تعني وعداً باستبدال شريحة فعلية. تحدد وحدة ECU وإصدار البرمجة العمل المناسب للسيارة." },
    { question: "هل مواصفات مراحل تطوير الأداء موحدة؟", answer: "لا. المرحلة اسم لحزمة خاصة بالسيارة. تختلف البرمجة والقطع والقوة والسعر والمدة حسب الطراز والمحرك، لذا راجع قائمة كل حزمة." },
    { question: "هل تشمل كل حزمة برمجة ناقل الحركة؟", answer: "لا. تظهر برمجة TCU وتقوية ناقل الحركة في حِزم محددة فقط. مثلاً، تذكر المرحلة الثانية لمحرك M178 في AMG GT / GTS تحسين برمجة ناقل الحركة. أكّد توافق ناقل الحركة ونطاق الحزمة قبل العمل." }
  ];
  const tuningFaqs = isArabic ? arabicFaqs : englishFaqs;
  const tuningGraph = pageGraph([
    buildWebPage({
      url,
      name: title,
      description,
      breadcrumbId: `${url}#breadcrumb`,
      primaryImage: "https://digitecme.com/images/tuning-hero-bg.jpg",
      mainEntityId: `${url}#service`
    }),
    buildBreadcrumb(url, [
      { name: isArabic ? "الرئيسية" : "Home", url: `https://digitecme.com${isArabic ? "/ar" : "/"}` },
      { name: isArabic ? "تطوير الأداء" : "Tuning", url }
    ]),
    buildService({
      url,
      name: isArabic ? "برمجة وتطوير أداء السيارات في دبي" : "Performance Tuning in Dubai",
      serviceType: isArabic ? "برمجة ECU ومشاريع تطوير الأداء" : "ECU Tuning and Performance Projects",
      description,
      image: "https://digitecme.com/images/tuning-hero-bg.jpg",
      offers: isArabic ? [
        "برمجة وحدة التحكم ECU",
        "برمجة المرحلة الأولى",
        "برمجة المرحلة الثانية",
        "حِزم التيربو",
        "حِزم فلاتر وصناديق الهواء",
        "داون بايب وأنظمة العادم",
        "ترقيات Mercedes-AMG"
      ] : [
        "ECU Remapping",
        "Stage 1 Tuning",
        "Stage 2 Tuning",
        "Turbo Kits",
        "Airfilter and Airbox Packages",
        "Downpipes & Exhaust Systems",
        "AMG Performance Upgrades"
      ]
    }),
    ...tuningFaqs.length > 0 ? [buildFAQ(url, tuningFaqs)] : []
  ]);
  useSeo({
    title,
    description,
    canonical: url,
    ogImage: "https://digitecme.com/images/tuning-hero-bg.jpg",
    jsonLd: tuningGraph
  });
  return /* @__PURE__ */ jsxs("div", { className: "site-page min-h-screen bg-black text-off-white", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsxs(
        "section",
        {
          className: "theme-dark-section relative flex min-h-[68vh] items-end overflow-hidden bg-cover bg-center bg-no-repeat sm:min-h-[74vh]",
          style: { backgroundImage: "url('/images/tuning-hero-bg.jpg')" },
          children: [
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[linear-gradient(90deg,rgba(8,9,10,0.9)_0%,rgba(8,9,10,0.58)_48%,rgba(8,9,10,0.2)_100%)]" }),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-x-0 bottom-0 h-44 bg-gradient-to-b from-transparent to-[#101113]" }),
            /* @__PURE__ */ jsx("div", { className: "relative z-10 mx-auto w-full max-w-[90rem] px-5 pb-16 pt-24 sm:px-8 sm:pb-20 lg:px-12 lg:pb-24", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl", children: [
              /* @__PURE__ */ jsx("span", { className: "eyebrow mb-5", children: isArabic ? arTuning.hero.eyebrow : "Vehicle-specific performance projects · Dubai" }),
              /* @__PURE__ */ jsxs("h1", { className: "mb-5 text-[clamp(2.75rem,5vw,5rem)] font-semibold leading-[0.98] tracking-[-0.05em]", children: [
                /* @__PURE__ */ jsx("span", { className: "text-red-600", children: isArabic ? "تطوير أداء السيارات" : "Car Performance Tuning" }),
                " ",
                isArabic ? "في دبي" : "Dubai"
              ] }),
              /* @__PURE__ */ jsx("p", { className: "max-w-2xl text-base leading-8 text-white/68 sm:text-lg", children: isArabic ? arTuning.hero.description : "Digi-Tec plans ECU tuning around the exact vehicle, its current condition, fuel, intended use and supporting hardware. The team explains the proposed calibration and expected result before the project begins." }),
              /* @__PURE__ */ jsxs("p", { className: "mt-4 text-sm text-white/48 sm:text-base", children: [
                isArabic ? arTuning.hero.moreInfo : "For more info visit",
                " ",
                /* @__PURE__ */ jsx("a", { href: "https://www.gad-motors.de/", target: "_blank", rel: "noopener noreferrer", className: "text-burnt-orange hover:underline", children: "www.gad-motors.de" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-col items-start gap-3 sm:flex-row", children: [
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: `https://wa.me/97143402223?text=${encodeURIComponent(isArabic ? arTuning.hero.whatsapp : "Hi, I'm interested in GAD performance tuning for my car.")}`,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "btn-primary w-full sm:w-auto",
                    children: isArabic ? arTuning.hero.cta : "Book a Tuning Consultation"
                  }
                ),
                /* @__PURE__ */ jsx("a", { href: "#performance-configurator", className: "btn-secondary w-full sm:w-auto", children: isArabic ? "استكشف الحِزم والأسعار" : "Explore Packages & Prices" })
              ] }),
              /* @__PURE__ */ jsx(CtaAssurance, { className: "mt-4 justify-start" })
            ] }) })
          ]
        }
      ),
      /* @__PURE__ */ jsx(TrustBar, {}),
      /* @__PURE__ */ jsx(
        AnswerBlock,
        {
          question: isArabic ? "كيف تختار مشروع تطوير أداء مناسباً لسيارتك؟" : "How should a performance tuning project be planned?",
          answer: isArabic ? "يبدأ المشروع المناسب بفحص حالة السيارة وتحديد نوع الوقود والاستخدام والهدف والقطع الداعمة. توضح ديجي-تك في القوز خطة المعايرة والمتطلبات والنتيجة المتوقعة قبل بدء العمل." : "A suitable project starts with the vehicle’s condition, fuel, intended use, target and supporting hardware. Digi-Tec in Al Quoz explains the calibration plan, requirements and expected result before work begins.",
          facts: isArabic ? [
            "تقييم حالة السيارة قبل المعايرة",
            "خطة مرتبطة بالمنصة والوقود والاستخدام",
            "شرح المتطلبات والنتائج المتوقعة قبل العمل"
          ] : [
            "Vehicle-condition assessment before calibration",
            "A plan matched to the platform, fuel and intended use",
            "Requirements and expected results explained before work"
          ]
        }
      ),
      /* @__PURE__ */ jsx("section", { id: "ecu-remapping-dubai", className: "border-t border-white/10 py-14 sm:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl px-5 sm:px-8", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold sm:text-4xl", children: isArabic ? "برمجة ECU ومعايرة المحرك في دبي" : "ECU tuning, remapping and engine calibration in Dubai" }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 space-y-5 text-base leading-8 text-white/70", children: [
          /* @__PURE__ */ jsx("p", { children: isArabic ? "تحدد برمجة وحدة ECU طريقة إدارة المحرك للعزم والضغط والإشعال والوقود. تعتمد التغييرات المناسبة على المحرك ووحدة التحكم وإصدار البرمجة والوقود والقطع الحالية. يصف المُهيئ العمل البرمجي والمكونات لكل حزمة، مع تأكيد توافق السيارة قبل التنفيذ." : "Engine ECU calibration manages how the engine requests torque and controls boost, ignition and fuel delivery. The appropriate changes depend on the engine, control unit, software version, fuel and installed hardware. Our packages identify the software work and supporting components for each configuration, with compatibility confirmed before installation." }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-off-white", children: isArabic ? "ماذا يعني chip tuning؟" : "What does chip tuning mean?" }),
          /* @__PURE__ */ jsx("p", { children: isArabic ? "يبحث بعض المالكين عن chip tuning عند طلب تحسين برمجة الأداء. تصف الحِزم هنا تحسين برمجة المحرك ومعايرته. لا يعني المصطلح تلقائياً استبدال شريحة فعلية، ويجب تأكيد طريقة البرمجة لوحدة التحكم الخاصة بالسيارة." : "Owners often search for chip tuning when they mean performance software or an ECU remap. The packages here describe engine software optimization and calibration. The term does not automatically mean a physical chip is replaced; confirm the programming method for your control unit." }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-off-white", children: isArabic ? "لماذا تختلف النتائج؟" : "Why do performance results vary?" }),
          /* @__PURE__ */ jsx("p", { children: isArabic ? "تؤثر حالة السيارة والوقود ودرجات الحرارة والبرمجة والتعديلات السابقة في النتيجة. قارن القوة والعزم الأصليين بأرقام الحزمة المناسبة في الجدول، ثم ناقش متطلبات الفحص والعمل والقياس. لا تُطبق زيادة عامة على كل سيارة." : "Vehicle condition, fuel, temperature, software and previous modifications affect the result. Compare stock horsepower and torque with the reference output for the correct package below, then discuss inspection, installation and measurement requirements. A generic tuning label cannot establish a universal power gain." })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("section", { id: "tuning-stages-and-cost", className: "border-t border-white/10 bg-charcoal/20 py-14 sm:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl px-5 sm:px-8", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold sm:text-4xl", children: isArabic ? "مراحل تطوير الأداء والأسعار" : "Stage 1, Stage 2 and Stage 3 tuning: packages and cost" }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 space-y-5 text-base leading-8 text-white/70", children: [
          /* @__PURE__ */ jsx("p", { children: isArabic ? "كل مرحلة حزمة خاصة بالطراز والمحرك. مثلاً، تشمل المرحلة الأولى لمحرك M178 في AMG GT / GTS فلتر هواء وتحسين برمجة المحرك، وتضيف المرحلة الثانية داون بايب بمحفز رياضي وطلاء حراري وبرمجة ناقل الحركة. تتضمن المرحلة الثالثة قطع تيربو ووقود وتقوية ناقل الحركة ضمن قائمتها. تختلف الحِزم الأخرى، وتظهر المراحل الرابعة والخامسة وVIP فقط حيث يدعمها الطراز." : "A stage is a model and engine package. For example, M178 AMG GT / GTS Stage 1 lists an airfilter and engine software optimization. Stage 2 adds a sport-catalyst downpipe, heat coating and transmission software. Its Stage 3 list includes turbocharger and fuel-system work plus double-clutch reinforcement. Other models have different packages. Stage 4, Stage 5 and VIP appear only where listed for that vehicle." }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-off-white", children: isArabic ? "سعر برمجة السيارة حسب الحزمة" : "Car tuning price in Dubai depends on the configuration" }),
          /* @__PURE__ */ jsx("p", { children: isArabic ? "راجع سعر الحزمة المحددة ومدتها وقائمة العمل في الجداول. تعرض الأسعار باليورو EUR كما وردت في المُهيئ، مع إبقاء ملاحظات السعر مثل total أو From. لا يوجد سعر موحد لبرمجة ECU أو المرحلة الأولى أو الثانية. قد تؤثر مواصفات السيارة والقطع والبرمجة الحالية والفحص في نطاق العمل النهائي." : "Compare the price, estimated workshop time and included work for the exact model and engine. Prices are published in EUR, with source qualifiers such as “total” or “From” retained. There is no universal ECU, Stage 1 or Stage 2 price. Vehicle identification, hardware, software version, current modifications and inspection may affect the final agreed scope." }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-off-white", children: isArabic ? "برمجة ناقل الحركة وTCU" : "Gearbox tuning and TCU software" }),
          /* @__PURE__ */ jsxs("p", { children: [
            isArabic ? "برمجة ECU للمحرك لا تعني تلقائياً برمجة ناقل الحركة. تذكر المرحلة الثانية من AMG GT / GTS برمجة TCU. وتظهر تقوية ناقل الحركة بشكل منفصل في حِزم أعلى لطرازات محددة. راجع القائمة الخاصة بالسيارة للتفريق بين البرمجة وتقوية القطع. لأعطال ناقل الحركة ابدأ بالفحص والإصلاح." : "Engine ECU tuning does not automatically include gearbox calibration. AMG GT / GTS Stage 2 explicitly lists TCU software. Transmission reinforcement is listed separately in selected higher-stage packages. Check the vehicle’s list to distinguish software from mechanical reinforcement. For a gearbox fault, start with diagnosis and repair.",
            " ",
            /* @__PURE__ */ jsx(LocalizedLink, { to: "/services/transmission-repair-dubai", className: "text-burnt-orange underline", children: isArabic ? "فحص وإصلاح ناقل الحركة" : "Transmission diagnosis and repair" })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("section", { id: "gad-tuning-dubai", className: "relative py-16 md:py-24 bg-black overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-3xl md:text-4xl font-bold text-off-white mb-6 leading-tight", children: isArabic ? arTuning.content.heading : "Performance Tuning and Supporting Hardware in Dubai" }),
        /* @__PURE__ */ jsx("p", { className: "text-base md:text-lg text-white/70 leading-relaxed mb-8", children: isArabic ? arTuning.content.intro : "Compare the exact Mercedes-Benz and AMG, Aston Martin DB11 and Lamborghini Urus vehicles listed in our Performance Configurator. Each engine has its own software and supporting-hardware packages. For Porsche performance tuning, contact the workshop to confirm the supported model and configuration before discussing output or price." }),
        /* @__PURE__ */ jsxs("p", { className: "text-base md:text-lg text-white/70 leading-relaxed mb-8", children: [
          isArabic ? "استكشف " : "Explore the ",
          /* @__PURE__ */ jsx(LocalizedLink, { to: "/vrx", className: "text-burnt-orange hover:underline font-semibold", children: isArabic ? arTuning.content.vrx : "GAD Motors V-Class VRX at our Dubai workshop" }),
          " ",
          isArabic ? arTuning.content.vrxSuffix : "— a bespoke Mercedes V-Class project combining GAD performance engineering with a luxury conversion."
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-base md:text-lg text-white/70 leading-relaxed mb-8", children: isArabic ? arTuning.content.parts : "A project may involve fuel-system, intake, turbocharger, intercooler, engine or gearbox components depending on the platform and target. Parts are proposed only after the team reviews compatibility and the supporting systems required by the build." }),
        /* @__PURE__ */ jsx("h3", { id: "gad-parts-dubai", className: "text-xl sm:text-2xl md:text-3xl font-bold text-off-white mb-4", children: isArabic ? arTuning.content.partsHeading : "GAD Motors Performance Parts in Dubai" }),
        /* @__PURE__ */ jsx("p", { className: "text-base md:text-lg text-white/70 leading-relaxed", children: isArabic ? arTuning.content.partsBody : "Digi-Tec combines inspection, installation and calibration at its Al Quoz workshop. Owners receive a vehicle-specific proposal covering the intended software, supporting components and checks required after installation." }),
        /* @__PURE__ */ jsxs("p", { className: "mt-6 text-base leading-8 text-white/70", children: [
          isArabic ? "تُدرج GAD Motors ديجي-تك ضمن جهات الاتصال في الإمارات بالقوز، دبي. أكّد مصدر البرمجة والقطع ونطاق العمل لكل مشروع. " : "GAD Motors lists DIGI-TEC as a UAE contact in Al Quoz, Dubai. Confirm the calibration source, components and work included in your individual project. ",
          /* @__PURE__ */ jsx("a", { href: "https://www.gad-motors.de/", target: "_blank", rel: "noopener noreferrer", className: "text-burnt-orange underline", children: isArabic ? "جهات اتصال GAD Motors" : "GAD Motors worldwide contacts" })
        ] })
      ] }) }) }),
      !isArabic && /* @__PURE__ */ jsx("section", { id: "mercedes-amg-tuning", className: "border-t border-white/10 bg-charcoal/20 py-14 sm:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl px-4 sm:px-6", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold sm:text-4xl", children: "Mercedes-AMG ECU tuning and project planning" }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 space-y-5 text-base leading-8 text-white/65", children: [
          /* @__PURE__ */ jsx("p", { children: "Share the model, year, engine, current modifications, fuel and intended use. The starting point is the car's condition: warnings, cooling, fuel delivery, brakes, tyres and drivetrain concerns should be assessed before a performance proposal is agreed." }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-off-white", children: "What do Stage 1 and Stage 2 mean?" }),
          /* @__PURE__ */ jsx("p", { children: "Stage labels describe a supplier's package and vary by platform. Confirm the exact calibration, fuel requirement, hardware dependencies and testing for your vehicle. A software-focused proposal and one requiring supporting hardware have different costs and installation scope; a stage name alone does not establish suitability or a fixed power gain." }),
          /* @__PURE__ */ jsxs("p", { children: [
            "Diagnostic scanning and module coding serve different needs from performance tuning. For warnings or configuration requests, start with ",
            /* @__PURE__ */ jsx(LocalizedLink, { to: "/services/mercedes-diagnostics-dubai", className: "text-burnt-orange hover:underline", children: "Mercedes diagnostics and supported coding" }),
            ". Tuning availability is confirmed separately for the ECU, gearbox and vehicle specification."
          ] })
        ] }),
        /* @__PURE__ */ jsx("h3", { className: "mt-8 text-xl font-bold", children: "GAD guidance and documented Mercedes projects" }),
        /* @__PURE__ */ jsx("ul", { className: "mt-5 grid gap-4 sm:grid-cols-2", children: [
          ["Questions to ask about a GAD tuning project", "/blog/gad-tuning-explained"],
          ["Mercedes-AMG GT tuning assessment", "/blog/mercedes-amg-gt-tuning-dubai"],
          ["AMG GT Black Series project", "/blog/mercedes-amg-gt-black-series-1300hp-build-dubai"],
          ["G63 to Brabus G800 conversion project", "/blog/g63-to-brabus-g800-conversion-dubai"]
        ].map(([label, path]) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(LocalizedLink, { to: path, className: "card-premium block h-full rounded-xl p-5 text-sm font-semibold text-burnt-orange hover:underline", children: label }) }, path)) }),
        /* @__PURE__ */ jsx("p", { className: "mt-5 text-sm leading-7 text-white/55", children: "Project photographs and specifications describe those individual builds. Your proposal and expected result depend on the assessed vehicle and agreed supporting work." })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "border-t border-white/10 py-14 sm:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-4xl px-4 sm:px-6", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold sm:text-3xl", children: isArabic ? "أسئلة حول تطوير الأداء" : "Performance tuning questions" }),
        /* @__PURE__ */ jsx("div", { className: "mt-7 space-y-6", children: tuningFaqs.map((faq) => /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: faq.question }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm leading-7 text-white/65", children: faq.answer })
        ] }, faq.question)) })
      ] }) }),
      /* @__PURE__ */ jsx(TuningConfigurator, {}),
      /* @__PURE__ */ jsx(TuningConfigurationDetails, { cars: tuningCars, isArabic }),
      !isArabic && /* @__PURE__ */ jsx("section", { id: "model-tuning-pages", className: "border-t border-white/10 py-14 sm:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl px-5 sm:px-8", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold sm:text-4xl", children: "Compare performance tuning by model" }),
        /* @__PURE__ */ jsx("p", { className: "mt-5 max-w-3xl text-base leading-8 text-white/65", children: "Explore engine-specific software, hardware, stage prices and workshop estimates together on each model page. The remaining supported vehicles are included in the full configurator comparison above." }),
        /* @__PURE__ */ jsx("ul", { className: "mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: tuningModelPages.map((model) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(LocalizedLink, { to: model.path, className: "block rounded-xl border border-white/15 p-5 text-burnt-orange hover:underline", children: [
          model.name,
          " tuning packages"
        ] }) }, model.path)) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { id: "gad-tuning-near-me", className: "relative py-16 md:py-24 bg-black overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl sm:text-2xl md:text-3xl font-bold text-off-white mb-4", children: isArabic ? arTuning.content.nearHeading : "GAD Tuning Near Me in Dubai" }),
        /* @__PURE__ */ jsx("p", { className: "text-base md:text-lg text-white/70 leading-relaxed mb-6", children: isArabic ? arTuning.content.nearBody : "Digi-Tec provides performance-project assessment and ECU tuning from its workshop in Al Quoz Industrial Area 3, Dubai." }),
        /* @__PURE__ */ jsx("p", { className: "text-base md:text-lg text-white/70 leading-relaxed", children: isArabic ? arTuning.content.nearBodyTwo : "Contact the team with the make, model, year, current modifications and intended use so the appropriate inspection and project scope can be discussed." })
      ] }) }) }),
      /* @__PURE__ */ jsx(FinalCTA, {})
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
export {
  Tuning as default
};
