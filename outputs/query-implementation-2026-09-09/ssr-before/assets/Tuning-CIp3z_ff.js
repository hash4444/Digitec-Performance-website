import { jsx, jsxs } from "react/jsx-runtime";
import { u as useLocale, p as pageGraph, b as buildWebPage, a as buildBreadcrumb, c as buildService, d as buildFAQ, e as useSeo, H as Header, C as CtaAssurance, T as TrustBar, A as AnswerBlock, L as LocalizedLink, F as FinalCTA, f as Footer } from "../entry-server.js";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Wrench, DollarSign, Clock, Crown, ChevronLeft, ChevronRight } from "lucide-react";
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
import "@radix-ui/react-accordion";
const amgGtImage = "/images/cars/amg-gt.png";
const amgGtrImage = "/images/cars/amg-gtr.png";
const e63Image = "/images/cars/e63.png";
const g63Image = "/images/cars/g63.png";
const gt63Image = "/images/cars/gt63.png";
const s63Image = "/images/cars/s63.png";
const c63Image = "/images/cars/c63.png";
const glc63Image = "/images/cars/glc63.png";
const c43Image = "/images/cars/c43.png";
const cla45Image = "/images/cars/cla45.png";
const a45Image = "/images/cars/a45.png";
const db11Image = "/images/cars/db11.png";
const urusImage = "/images/cars/urus.png";
function generatePowerCurve(basePower, baseTorque) {
  return [
    { rpm: 2e3, power: Math.round(basePower * 0.35), torque: Math.round(baseTorque * 0.7) },
    { rpm: 3e3, power: Math.round(basePower * 0.55), torque: Math.round(baseTorque * 0.85) },
    { rpm: 4e3, power: Math.round(basePower * 0.72), torque: Math.round(baseTorque * 0.95) },
    { rpm: 5e3, power: Math.round(basePower * 0.88), torque: Math.round(baseTorque * 1) },
    { rpm: 6e3, power: Math.round(basePower * 0.97), torque: Math.round(baseTorque * 0.92) },
    { rpm: 7e3, power: Math.round(basePower * 1), torque: Math.round(baseTorque * 0.82) },
    { rpm: 8e3, power: Math.round(basePower * 0.92), torque: Math.round(baseTorque * 0.7) }
  ];
}
function mkStage(hp, torque, zeroToHundred, mods, price, time) {
  return {
    spec: { hp, torque, zeroToHundred },
    mods,
    price,
    time,
    powerCurve: generatePowerCurve(hp, torque)
  };
}
const tuningCars = [
  // ── C190/R190 GT/GTS M178 ──
  {
    id: "amg-gt-gts",
    name: "AMG GT / GTS",
    brand: "Mercedes",
    engine: "M178",
    image: amgGtImage,
    availableStages: ["stock", "stage1", "stage2", "stage3", "stage4", "stage5", "vip"],
    stages: {
      stock: mkStage(522, 670, 3.7, ["Factory Specifications"], "—", "—"),
      stage1: mkStage(605, 750, 3.4, [
        "Airfilter",
        "Optimization of engine software",
        "Deactivation of the speed limiter V-Max"
      ], "€2,721", "1–2 days"),
      stage2: mkStage(620, 780, 3.3, [
        "Airfilter",
        "Optimization of engine software",
        "Deactivation of the speed limiter V-Max",
        "Downpipe with sport catalytic converter",
        "Heat coating for downpipe",
        "Transmission software optimization (TCU)"
      ], "€10,721 total", "3–5 days"),
      stage3: mkStage(760, 900, 3, [
        "Airfilter",
        "Optimization of engine software",
        "Deactivation of the speed limiter V-Max",
        "Downpipe with sport catalytic converter",
        "Pulse Flow exhaust manifold",
        "Twin Scroll GAD Turbocharger (GAD 177 55/63)",
        "Heat coating for downpipe",
        "High pressure fuel system with increased flow",
        "TCU-Software",
        "Stage 1 GAD SLS/GTS/GTR double-clutch reinforcement (~1200 Nm)"
      ], "€32,221 total", "7–14 days"),
      stage4: mkStage(840, 1e3, 2.8, [
        "Airfilter",
        "Optimization of engine software",
        "Deactivation of the speed limiter V-Max",
        "Downpipe with sport catalytic converter",
        "Heat coating for downpipe",
        "GAD Upgrade Twin Scroll turbocharger (GAD 177 55/68)",
        "Pulse Flow exhaust manifold",
        "High pressure fuel system with increased flow",
        "GAD forged pistons with lower compression",
        "TCU-Software",
        "Stage 1 GAD SLS/GTS/GTR double-clutch reinforcement (~1200 Nm)"
      ], "€45,121 total", "14–21 days"),
      stage5: mkStage(920, 1100, 2.6, [
        "Airfilter",
        "Optimization of engine software",
        "Deactivation of the speed limiter V-Max",
        "Downpipe with sport catalytic converter",
        "Heat coating for downpipe",
        "GAD ball-bearing Twin Scroll turbocharger (GAD 177 60/76R)",
        "Pulse Flow exhaust manifold",
        "High pressure fuel system with increased flow",
        "Engine gasket set",
        "GAD forged pistons with lower compression",
        "GAD optimized cylinder heads with larger channels",
        "Cylinder head bolts",
        "Oil & Oilfilter",
        "TCU-Software",
        "Stage 1 GAD SLS/GTS/GTR double-clutch reinforcement (~1200 Nm)"
      ], "€51,991 total", "3–6 weeks"),
      vip: mkStage(1300, 1400, 2.2, [
        "Full Custom Build",
        "Bespoke ECU Calibration",
        "Dyno Testing & Validation",
        "Exclusive tuning on individual request",
        "Send VIN for availability"
      ], "On Request", "6–10 weeks")
    }
  },
  // ── C190/R190 GTC/GTR M178 ──
  {
    id: "amg-gtc-gtr",
    name: "AMG GTC / GTR",
    brand: "Mercedes",
    engine: "M178",
    image: amgGtrImage,
    availableStages: ["stock", "stage1", "stage2", "stage3", "stage4", "stage5", "vip"],
    stages: {
      stock: mkStage(557, 700, 3.6, ["Factory Specifications"], "—", "—"),
      stage1: mkStage(640, 800, 3.3, [
        "Airfilter",
        "Optimization of engine software",
        "Deactivation of the speed limiter V-Max"
      ], "€2,721", "1–2 days"),
      stage2: mkStage(660, 830, 3.2, [
        "Airfilter",
        "Optimization of engine software",
        "Deactivation of the speed limiter V-Max",
        "Downpipe with sport catalytic converter",
        "Heat coating for downpipe",
        "Transmission software optimization (TCU)"
      ], "€10,721 total", "3–5 days"),
      stage3: mkStage(780, 950, 2.9, [
        "Airfilter",
        "Optimization of engine software",
        "Deactivation of the speed limiter V-Max",
        "Downpipe with sport catalytic converter",
        "Pulse Flow exhaust manifold",
        "Twin Scroll GAD Turbocharger (GAD 177 55/63)",
        "Heat coating for downpipe",
        "High pressure fuel system with increased flow",
        "TCU-Software",
        "Stage 1 GAD SLS/GTS/GTR double-clutch reinforcement (~1200 Nm)"
      ], "€32,221 total", "7–14 days"),
      stage4: mkStage(840, 1e3, 2.7, [
        "Airfilter",
        "Optimization of engine software",
        "Deactivation of the speed limiter V-Max",
        "Downpipe with sport catalytic converter",
        "Heat coating for downpipe",
        "GAD Upgrade Twin Scroll turbocharger (GAD 177 55/68)",
        "Pulse Flow exhaust manifold",
        "High pressure fuel system with increased flow",
        "GAD forged pistons with lower compression",
        "TCU-Software",
        "Stage 1 GAD SLS/GTS/GTR double-clutch reinforcement (~1200 Nm)"
      ], "€45,121 total", "14–21 days"),
      stage5: mkStage(920, 1100, 2.5, [
        "Airfilter",
        "Optimization of engine software",
        "Deactivation of the speed limiter V-Max",
        "Downpipe with sport catalytic converter",
        "Heat coating for downpipe",
        "GAD ball-bearing Twin Scroll turbocharger (GAD 177 60/76R)",
        "Pulse Flow exhaust manifold",
        "High pressure fuel system with increased flow",
        "Engine gasket set",
        "GAD forged pistons with lower compression",
        "GAD optimized cylinder heads with larger channels",
        "Cylinder head bolts",
        "Oil & Oilfilter",
        "TCU-Software",
        "Stage 1 GAD SLS/GTS/GTR double-clutch reinforcement (~1200 Nm)"
      ], "€51,991 total", "3–6 weeks"),
      vip: mkStage(1300, 1400, 2.1, [
        "Full Custom Build",
        "Bespoke ECU Calibration",
        "Dyno Testing & Validation",
        "Exclusive tuning on individual request",
        "Send VIN for availability"
      ], "On Request", "6–10 weeks")
    }
  },
  // ── W213 E63 M177 ──
  {
    id: "e63",
    name: "E63 AMG",
    brand: "Mercedes",
    engine: "M177",
    image: e63Image,
    availableStages: ["stock", "stage1", "stage2", "stage3", "stage4", "vip"],
    stages: {
      stock: mkStage(612, 850, 3.4, ["Factory Specifications"], "—", "—"),
      stage1: mkStage(780, 1e3, 3, [
        "Airfilter",
        "Optimization of engine software",
        "Deactivation of the speed limiter V-Max",
        "Software for CPC (central powertrain controller)"
      ], "€5,663", "1–2 days"),
      stage2: mkStage(820, 1050, 2.9, [
        "Airfilter",
        "Optimization of engine software",
        "Deactivation of the speed limiter V-Max",
        "Downpipe with sport catalytic converter",
        "Special ceramic heat coating",
        "Software for CPC (central powertrain controller)"
      ], "€12,563 total", "3–5 days"),
      stage3: mkStage(860, 1100, 2.7, [
        "Airfilter",
        "Optimization of engine software",
        "Deactivation of the speed limiter V-Max",
        "Downpipe with sport catalytic converter",
        "Special ceramic heat coating",
        "Software for CPC",
        "Upgrade Twin Scroll Turbocharger GAD 177 55/68",
        "TCU-Software",
        "Stage 1 Automatic transmission NAG 3 reinforcement (~1150 Nm)"
      ], "€27,076 total", "7–14 days"),
      stage4: mkStage(940, 1200, 2.5, [
        "Airfilter",
        "Optimization of engine software",
        "Deactivation of the speed limiter V-Max",
        "Downpipe with sport catalytic converter",
        "Special ceramic heat coating",
        "Software for CPC",
        "Upgrade Twin Scroll Turbocharger GAD 177 60/76R",
        "High pressure fuel system with increased flow",
        "TCU-Software",
        "Stage 1 Automatic transmission NAG 3 reinforcement (~1150 Nm)"
      ], "€36,576 total", "14–21 days"),
      vip: mkStage(1300, 1500, 2.2, [
        "Full Custom Build – up to 1300 hp",
        "Bespoke ECU Calibration",
        "Dyno Testing & Validation",
        "Exclusive tuning on individual request"
      ], "On Request", "6–10 weeks")
    }
  },
  // ── W463 G63 M177 ──
  {
    id: "g63",
    name: "G63 AMG",
    brand: "Mercedes",
    engine: "M177",
    image: g63Image,
    availableStages: ["stock", "stage1", "stage2", "stage3", "stage4", "vip"],
    stages: {
      stock: mkStage(585, 850, 4.5, ["Factory Specifications"], "—", "—"),
      stage1: mkStage(780, 1e3, 3.8, [
        "Airfilter",
        "Optimization of engine software",
        "Deactivation of the speed limiter V-Max",
        "Software for CPC (central powertrain controller)"
      ], "€5,663", "1–2 days"),
      stage2: mkStage(820, 1050, 3.6, [
        "Airfilter",
        "Optimization of engine software",
        "Deactivation of the speed limiter V-Max",
        "Downpipe with sport catalytic converter",
        "Special ceramic heat coating",
        "Software for CPC",
        "Optimization of the exhaust system"
      ], "€14,063 total", "3–5 days"),
      stage3: mkStage(860, 1100, 3.4, [
        "Airfilter",
        "Optimization of engine software",
        "Deactivation of the speed limiter V-Max",
        "Downpipe with sport catalytic converter",
        "Special ceramic heat coating",
        "Software for CPC",
        "Upgrade Twin Scroll Turbocharger GAD 177 55/68",
        "Optimization of the exhaust system",
        "TCU-Software",
        "Stage 1 Automatic transmission NAG 3 reinforcement (~1150 Nm)"
      ], "€28,576 total", "7–14 days"),
      stage4: mkStage(940, 1200, 3.2, [
        "Airfilter",
        "Optimization of engine software",
        "Deactivation of the speed limiter V-Max",
        "Downpipe with sport catalytic converter",
        "Special ceramic heat coating",
        "Software for CPC",
        "Optimization of the exhaust system",
        "GAD Twin Scroll Turbocharger GAD 177 60/76R",
        "High pressure fuel system with increased flow",
        "TCU-Software",
        "Stage 1 Automatic transmission NAG 3 reinforcement (~1150 Nm)"
      ], "€38,076 total", "14–21 days"),
      vip: mkStage(1100, 1350, 2.9, [
        "Full Custom Build – 1100+ hp",
        "Bespoke ECU Calibration",
        "Dyno Testing & Validation",
        "Exclusive tuning on individual request"
      ], "On Request", "6–10 weeks")
    }
  },
  // ── X290 GT63 M177 (AMG GT 4-Door) ──
  {
    id: "gt63",
    name: "AMG GT63 4-Door",
    brand: "Mercedes",
    engine: "M177",
    image: gt63Image,
    availableStages: ["stock", "stage1", "stage2", "stage3", "stage4", "vip"],
    stages: {
      stock: mkStage(630, 900, 3.2, ["Factory Specifications"], "—", "—"),
      stage1: mkStage(780, 1e3, 2.9, [
        "Airfilter",
        "Optimization of engine software",
        "Deactivation of the speed limiter V-Max",
        "Software for CPC (central powertrain controller)"
      ], "€5,663", "1–2 days"),
      stage2: mkStage(820, 1050, 2.8, [
        "Airfilter",
        "Optimization of engine software",
        "Deactivation of the speed limiter V-Max",
        "Downpipe with sport catalytic converter",
        "Special ceramic heat coating",
        "Software for CPC"
      ], "€12,563 total", "3–5 days"),
      stage3: mkStage(860, 1100, 2.6, [
        "Airfilter",
        "Optimization of engine software",
        "Deactivation of the speed limiter V-Max",
        "Downpipe with sport catalytic converter",
        "Special ceramic heat coating",
        "Software for CPC",
        "Upgrade Twin Scroll Turbocharger GAD 177 55/68",
        "TCU-Software",
        "Stage 1 Automatic transmission NAG 3 reinforcement (~1150 Nm)"
      ], "€27,076 total", "7–14 days"),
      stage4: mkStage(940, 1200, 2.4, [
        "Airfilter",
        "Optimization of engine software",
        "Deactivation of the speed limiter V-Max",
        "Downpipe with sport catalytic converter",
        "Special ceramic heat coating",
        "Software for CPC",
        "Upgrade Twin Scroll Turbocharger GAD 177 60/76R",
        "High pressure fuel system with increased flow",
        "TCU-Software",
        "Stage 1 Automatic transmission NAG 3 reinforcement (~1150 Nm)"
      ], "€36,576 total", "14–21 days"),
      vip: mkStage(1e3, 1300, 2.2, [
        "Full Custom Build – 1000+ hp",
        "Bespoke ECU Calibration",
        "Dyno Testing & Validation",
        "Exclusive tuning on individual request"
      ], "On Request", "6–10 weeks")
    }
  },
  // ── W223 S63 AMG E Performance ──
  {
    id: "s63",
    name: "S63 AMG E Performance",
    brand: "Mercedes",
    engine: "M177 + Electric",
    image: s63Image,
    availableStages: ["stock", "stage1", "stage2", "stage3", "stage4", "vip"],
    stages: {
      stock: mkStage(612, 900, 3.5, ["Factory Specifications"], "—", "—"),
      stage1: mkStage(780, 1e3, 3.1, [
        "Airfilter",
        "Optimization of engine software",
        "Deactivation of the speed limiter V-Max",
        "Software for CPC (central powertrain controller)"
      ], "€5,663", "1–2 days"),
      stage2: mkStage(820, 1050, 3, [
        "Airfilter",
        "Optimization of engine software",
        "Deactivation of the speed limiter V-Max",
        "Downpipe with sport catalytic converter",
        "Special ceramic heat coating",
        "Software for CPC"
      ], "€12,563 total", "3–5 days"),
      stage3: mkStage(860, 1100, 2.8, [
        "Airfilter",
        "Optimization of engine software",
        "Deactivation of the speed limiter V-Max",
        "Downpipe with sport catalytic converter",
        "Special ceramic heat coating",
        "Software for CPC",
        "Upgrade Twin Scroll Turbocharger GAD 177 55/68",
        "TCU-Software",
        "Stage 1 Automatic transmission NAG 3 reinforcement (~1150 Nm)"
      ], "€27,076 total", "7–14 days"),
      stage4: mkStage(940, 1200, 2.6, [
        "Airfilter",
        "Optimization of engine software",
        "Deactivation of the speed limiter V-Max",
        "Downpipe with sport catalytic converter",
        "Special ceramic heat coating",
        "Software for CPC",
        "Upgrade Twin Scroll Turbocharger GAD 177 60/76R",
        "High pressure fuel system with increased flow",
        "TCU-Software",
        "Stage 1 Automatic transmission NAG 3 reinforcement (~1150 Nm)"
      ], "€36,576 total", "14–21 days"),
      vip: mkStage(1e3, 1300, 2.4, [
        "Full Custom Build – 1000+ hp",
        "Bespoke ECU Calibration",
        "Dyno Testing & Validation",
        "Exclusive tuning on individual request"
      ], "On Request", "6–10 weeks")
    }
  },
  // ── W222/W217 S65 M279 ──
  {
    id: "s65",
    name: "S65 AMG",
    brand: "Mercedes",
    engine: "M279",
    image: s63Image,
    availableStages: ["stock", "stage1", "stage2", "stage3", "stage4", "stage5"],
    stages: {
      stock: mkStage(630, 1e3, 4.1, ["Factory Specifications"], "—", "—"),
      stage1: mkStage(680, 1050, 3.8, [
        "Airfilter",
        "Optimization of engine software",
        "Deactivation of the speed limiter V-Max"
      ], "€3,350", "1–2 days"),
      stage2: mkStage(720, 1100, 3.6, [
        "Airfilter",
        "Optimization of engine software",
        "Deactivation of the speed limiter V-Max",
        "Downpipe with sport catalytic converter",
        "Adjustment of the PCM (Powertrain control module)",
        "TCU-Software"
      ], "€18,350 total", "3–5 days"),
      stage3: mkStage(800, 1200, 3.3, [
        "Airfilter",
        "Optimization of engine software",
        "Deactivation of the speed limiter V-Max",
        "Downpipe with sport catalytic converter",
        "Upgrade turbocharger (GAD 279 60/76R)",
        "Adjustment of the PCM",
        "TCU-Software",
        "Stage 1 GAD reinforcement NAG2 (7G-Tronic) with torque converter (~1250 Nm)"
      ], "€43,613 total", "7–14 days"),
      stage4: mkStage(850, 1300, 3.1, [
        "GAD Airfilter box",
        "Optimization of engine software",
        "Deactivation of the speed limiter V-Max",
        "Downpipe with sport catalytic converter",
        "Upgrade turbocharger (GAD 279 60/76R)",
        "Adjustment of the PCM",
        "Optimization of the low-temperature circuit",
        "TCU-Software",
        "Stage 1 GAD reinforcement NAG2 (7G-Tronic) (~1250 Nm)"
      ], "€54,713 total", "14–21 days"),
      stage5: mkStage(900, 1400, 2.9, [
        "GAD Airfilter box",
        "Optimization of engine software",
        "Deactivation of the speed limiter V-Max",
        "Downpipe with sport catalytic converter",
        "Upgrade turbocharger (GAD 279 60/76R)",
        "Adjustment of the PCM",
        "Optimization of the low-temperature circuit",
        "High Performance Intercooler",
        "TCU-Software",
        "Stage 2 GAD reinforcement NAG2 (7G-Tronic) (~1400 Nm)"
      ], "€72,468 total", "3–6 weeks")
    }
  },
  // ── W205 C63 M177 ──
  {
    id: "c63-w205",
    name: "C63 AMG (W205)",
    brand: "Mercedes",
    engine: "M177",
    image: c63Image,
    availableStages: ["stock", "stage1", "stage2", "stage3", "stage4", "stage5", "vip"],
    stages: {
      stock: mkStage(476, 650, 4, ["Factory Specifications"], "—", "—"),
      stage1: mkStage(590, 780, 3.6, [
        "Airfilter",
        "Optimization of engine software",
        "Deactivation of the speed limiter V-Max"
      ], "€3,146 total", "1–2 days"),
      stage2: mkStage(615, 810, 3.5, [
        "Airfilter",
        "Optimization of engine software",
        "Deactivation of the speed limiter V-Max",
        "Downpipe with sport catalytic converter",
        "Special ceramic heat coating"
      ], "€8,732 total", "3–5 days"),
      stage3: mkStage(700, 900, 3.2, [
        "Airfilter",
        "Optimization of engine software",
        "Deactivation of the speed limiter V-Max",
        "Downpipe with sport catalytic converter",
        "Upgrade turbocharger (GAD 177 50/63)",
        "Special ceramic heat coating",
        "TCU-Software",
        "Stage 1 GAD transmission reinforcement MCT (~1100 Nm)"
      ], "€17,876 total", "7–14 days"),
      stage4: mkStage(795, 1e3, 2.9, [
        "Open airboxes",
        "Optimization of engine software",
        "Deactivation of the speed limiter V-Max",
        "Downpipe with sport catalytic converter",
        "Special ceramic heat coating",
        "Twin Scroll GAD Turbocharger (GAD 177 55/63)",
        "Pulse Flow exhaust manifold",
        "High pressure fuel system with increased flow",
        "TCU-Software",
        "Stage 1 GAD transmission reinforcement MCT (~1100 Nm)"
      ], "€33,460 total", "14–21 days"),
      stage5: mkStage(850, 1100, 2.7, [
        "Open airboxes",
        "Optimization of engine software",
        "Deactivation of the speed limiter V-Max",
        "Downpipe with sport catalytic converter",
        "GAD upgrade Twinscroll Turbocharger (GAD 177 55/68)",
        "Pulse Flow exhaust manifold",
        "Special ceramic heat coating",
        "High pressure fuel system with increased flow",
        "GAD forged pistons with lower compression",
        "Cylinder head bolts",
        "Engine gasket set",
        "Oil & Oil filter",
        "TCU-Software",
        "Stage 2 GAD transmission reinforcement MCT with wet clutch (~1350 Nm)"
      ], "€53,435 total", "3–6 weeks"),
      vip: mkStage(1e3, 1250, 2.5, [
        "Full Custom Build – 1000+ hp",
        "Bespoke ECU Calibration",
        "Dyno Testing & Validation",
        "Exclusive tuning on individual request"
      ], "On Request", "6–10 weeks")
    }
  },
  // ── W253 GLC63 M177 ──
  {
    id: "glc63",
    name: "GLC63 AMG",
    brand: "Mercedes",
    engine: "M177",
    image: glc63Image,
    availableStages: ["stock", "stage1", "stage2", "stage3", "stage4", "stage5"],
    stages: {
      stock: mkStage(476, 650, 3.8, ["Factory Specifications"], "—", "—"),
      stage1: mkStage(590, 780, 3.4, [
        "Airfilter",
        "Optimization of engine software",
        "Deactivation of the speed limiter V-Max"
      ], "€3,146 total", "1–2 days"),
      stage2: mkStage(615, 810, 3.3, [
        "Airfilter",
        "Optimization of engine software",
        "Deactivation of the speed limiter V-Max",
        "Downpipe with sport catalytic converter",
        "Special ceramic heat coating"
      ], "€7,471 total", "3–5 days"),
      stage3: mkStage(700, 900, 3, [
        "Airfilter",
        "Optimization of engine software",
        "Deactivation of the speed limiter V-Max",
        "Downpipe with sport catalytic converter",
        "Upgrade turbocharger (GAD 177 50/63)",
        "Special ceramic heat coating",
        "TCU-Software",
        "GAD transmission reinforcement (~1250 Nm)"
      ], "€17,876–€19,346 total", "7–14 days"),
      stage4: mkStage(795, 1e3, 2.8, [
        "Open airboxes",
        "Optimization of engine software",
        "Deactivation of the speed limiter V-Max",
        "Downpipe with sport catalytic converter",
        "Twin Scroll GAD Turbocharger (GAD 177 55/63)",
        "Pulse Flow exhaust manifold",
        "Special ceramic heat coating",
        "High pressure fuel system with increased flow",
        "TCU-Software",
        "GAD transmission reinforcement (~1250 Nm)"
      ], "€33,335–€34,805 total", "14–21 days"),
      stage5: mkStage(850, 1100, 2.6, [
        "Open airboxes",
        "Optimization of engine software",
        "Deactivation of the speed limiter V-Max",
        "Downpipe with sport catalytic converter",
        "GAD TwinScroll Turbocharger (GAD 177 55/68)",
        "Pulse Flow exhaust manifold",
        "Special ceramic heat coating",
        "High pressure fuel system with increased flow",
        "GAD forged pistons with lower compression",
        "Cylinder head bolts",
        "Engine gasket set",
        "Oil & Oil filter",
        "TCU-Software",
        "GAD transmission reinforcement (~1250 Nm)"
      ], "€51,335–€52,805 total", "3–6 weeks")
    }
  },
  // ── W205 C43 M276 ──
  {
    id: "c43",
    name: "C43 AMG (W205)",
    brand: "Mercedes",
    engine: "M276",
    image: c43Image,
    availableStages: ["stock", "stage1", "stage2"],
    stages: {
      stock: mkStage(390, 520, 4.7, ["Factory Specifications"], "—", "—"),
      stage1: mkStage(450, 580, 4.3, [
        "Airfilter",
        "Optimization of engine software",
        "Deactivation of the speed limiter V-Max"
      ], "€2,110", "1–2 days"),
      stage2: mkStage(500, 650, 3.9, [
        "Airfilter",
        "Optimization of engine software",
        "Deactivation of the speed limiter V-Max",
        "Turbocharger upgrade",
        "GAD high pressure pump",
        "Exhaust system"
      ], "€16,350 total", "5–7 days")
    }
  },
  // ── W205 C450 M276 ──
  {
    id: "c450",
    name: "C450 AMG (W205)",
    brand: "Mercedes",
    engine: "M276",
    image: c43Image,
    availableStages: ["stock", "stage1", "stage2"],
    stages: {
      stock: mkStage(367, 520, 4.9, ["Factory Specifications"], "—", "—"),
      stage1: mkStage(450, 580, 4.4, [
        "Airfilter",
        "Optimization of engine software",
        "Deactivation of the speed limiter V-Max"
      ], "€2,110", "1–2 days"),
      stage2: mkStage(500, 650, 4, [
        "Airfilter",
        "Optimization of engine software",
        "Deactivation of the speed limiter V-Max",
        "Turbocharger upgrade",
        "GAD high pressure pump",
        "Exhaust system"
      ], "€16,350 total", "5–7 days")
    }
  },
  // ── W205 C400 M276 ──
  {
    id: "c400",
    name: "C400 (W205)",
    brand: "Mercedes",
    engine: "M276",
    image: c43Image,
    availableStages: ["stock", "stage1", "stage2"],
    stages: {
      stock: mkStage(333, 480, 5.2, ["Factory Specifications"], "—", "—"),
      stage1: mkStage(420, 560, 4.6, [
        "Airfilter",
        "Optimization of engine software",
        "Deactivation of the speed limiter V-Max"
      ], "€2,110", "1–2 days"),
      stage2: mkStage(500, 650, 4.1, [
        "Airfilter",
        "Optimization of engine software",
        "Deactivation of the speed limiter V-Max",
        "Turbocharger upgrade",
        "GAD high pressure pump",
        "Exhaust system"
      ], "€16,350 total", "5–7 days")
    }
  },
  // ── W117 CLA45 M133 ──
  {
    id: "cla45",
    name: "CLA45 AMG",
    brand: "Mercedes",
    engine: "M133",
    image: cla45Image,
    availableStages: ["stock", "stage1", "stage2"],
    stages: {
      stock: mkStage(381, 475, 4.2, ["Factory Specifications"], "—", "—"),
      stage1: mkStage(427, 530, 3.9, [
        "Airfilter",
        "Optimization of engine software",
        "Deactivation of the speed limiter V-Max"
      ], "€2,353", "1–2 days"),
      stage2: mkStage(457, 560, 3.7, [
        "Airfilter",
        "Optimization of engine software",
        "Deactivation of the speed limiter V-Max",
        "Downpipe with sport catalytic converter"
      ], "€6,153 total", "3–5 days")
    }
  },
  // ── W176 A45 M133 ──
  {
    id: "a45",
    name: "A45 AMG",
    brand: "Mercedes",
    engine: "M133",
    image: a45Image,
    availableStages: ["stock", "stage1", "stage2"],
    stages: {
      stock: mkStage(381, 475, 4.2, ["Factory Specifications"], "—", "—"),
      stage1: mkStage(427, 530, 3.9, [
        "Airfilter",
        "Optimization of engine software",
        "Deactivation of the speed limiter V-Max"
      ], "€2,353", "1–2 days"),
      stage2: mkStage(457, 560, 3.7, [
        "Airfilter",
        "Optimization of engine software",
        "Deactivation of the speed limiter V-Max",
        "Downpipe with sport catalytic converter"
      ], "€6,153 total", "3–5 days")
    }
  },
  // ── Aston Martin DB11 ──
  {
    id: "db11",
    name: "Aston Martin DB11",
    brand: "Aston Martin",
    engine: "M177",
    image: db11Image,
    availableStages: ["stock", "stage1", "stage2", "stage3", "stage4", "stage5"],
    stages: {
      stock: mkStage(503, 675, 3.9, ["Factory Specifications"], "—", "—"),
      stage1: mkStage(590, 750, 3.5, [
        "Airfilter",
        "Optimization of engine software",
        "Deactivation of the speed limiter V-Max"
      ], "€3,346 total", "1–2 days"),
      stage2: mkStage(615, 790, 3.4, [
        "Airfilter",
        "Optimization of engine software",
        "Deactivation of the speed limiter V-Max",
        "Downpipe with sport catalytic converter",
        "Special ceramic heat coating",
        "Transmission software optimization (TCU)"
      ], "€10,232 total", "3–5 days"),
      stage3: mkStage(700, 900, 3.1, [
        "Airfilter",
        "Optimization of engine software",
        "Deactivation of the speed limiter V-Max",
        "Downpipe with sport catalytic converter",
        "Upgrade turbocharger (GAD 177 50/63)",
        "Special ceramic heat coating",
        "TCU-Software",
        "Stage 1 GAD transmission reinforcement MCT (~1100 Nm)"
      ], "€18,333 total", "7–14 days"),
      stage4: mkStage(795, 1e3, 2.8, [
        "Open airboxes",
        "Optimization of engine software",
        "Deactivation of the speed limiter V-Max",
        "Downpipe with sport catalytic converter",
        "Twin Scroll GAD Turbocharger (GAD 177 55/63)",
        "Pulse Flow exhaust manifold",
        "Special ceramic heat coating",
        "High pressure fuel system with increased flow",
        "TCU-Software",
        "Stage 1 GAD transmission reinforcement MCT (~1100 Nm)"
      ], "€33,792 total", "14–21 days"),
      stage5: mkStage(850, 1100, 2.6, [
        "Open airboxes",
        "Optimization of engine software",
        "Deactivation of the speed limiter V-Max",
        "Downpipe with sport catalytic converter",
        "GAD upgrade Twinscroll Turbocharger (GAD 177 55/68)",
        "Pulse Flow exhaust manifold",
        "Special ceramic heat coating",
        "High pressure fuel system with increased flow",
        "GAD forged pistons with lower compression",
        "Cylinder head bolts",
        "Engine gasket set",
        "Oil & Oilfilter",
        "TCU-Software",
        "Stage 2 GAD transmission reinforcement MCT with wet clutch (~1350 Nm)"
      ], "€56,435 total", "3–6 weeks")
    }
  },
  // ── Lamborghini Urus ──
  {
    id: "urus",
    name: "Lamborghini Urus",
    brand: "Lamborghini",
    engine: "V8 Twin-Turbo",
    image: urusImage,
    availableStages: ["stock", "stage1", "stage2", "stage3", "stage4"],
    stages: {
      stock: mkStage(650, 850, 3.6, ["Factory Specifications"], "—", "—"),
      stage1: mkStage(750, 950, 3.3, [
        "Optimization of engine software"
      ], "€5,418 total", "1–2 days"),
      stage2: mkStage(800, 1e3, 3.1, [
        "Airfilter",
        "Optimization of engine software",
        "Downpipe with sport catalytic converter",
        "Special ceramic heat coating"
      ], "€13,842 total", "3–5 days"),
      stage3: mkStage(870, 1100, 2.9, [
        "Airfilter",
        "Optimization of engine software",
        "Downpipe with sport catalytic converter",
        "Special ceramic heat coating",
        "GAD Upgrade ball-bearing Twin Scroll Turbocharger (GAD 825-60/71R)",
        "Turbo installation kit (cooling water and oil lines)"
      ], "€26,842 total", "7–14 days"),
      stage4: mkStage(904, 1150, 2.7, [
        "Airfilter",
        "Optimization of engine software",
        "Downpipe with sport catalytic converter",
        "Special ceramic heat coating",
        "GAD Upgrade ball-bearing Twin Scroll Turbocharger (GAD 825-60/71R)",
        "Turbo installation kit (cooling water and oil lines)",
        "Custom high flow intercooler"
      ], "€35,992 total", "14–21 days")
    }
  }
];
const stageLabels = {
  stock: "Stock",
  stage1: "Stage 1",
  stage2: "Stage 2",
  stage3: "Stage 3",
  stage4: "Stage 4",
  stage5: "Stage 5",
  vip: "VIP"
};
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
const arTuning = {
  seo: {
    title: "برمجة وتطوير أداء السيارات في دبي | ديجي-تك",
    description: "برمجة ECU ومشاريع تطوير أداء مرتبطة بحالة السيارة والوقود والاستخدام والقطع الداعمة لدى ديجي-تك في القوز، دبي."
  },
  hero: {
    eyebrow: "مشاريع تطوير أداء مخصصة للسيارة في دبي",
    titlePrefix: "GAD Motors",
    titleSuffix: "لتطوير الأداء",
    description: "نخطط برمجة وحدة التحكم وتطوير الأداء وفق السيارة وحالتها والوقود والاستخدام والقطع الداعمة، مع شرح الخطة والنتيجة المتوقعة قبل بدء العمل.",
    moreInfo: "للمزيد من المعلومات، تفضل بزيارة",
    cta: "احجز استشارة تطوير الأداء",
    whatsapp: "مرحباً، أود الاستفسار عن تطوير أداء سيارتي باستخدام حلول GAD."
  },
  content: {
    heading: "برمجة ECU ومشاريع تطوير الأداء في دبي",
    intro: "تقيّم ديجي-تك مشاريع تطوير الأداء لسيارات مرسيدس وبورش ولامبورغيني وأستون مارتن وغيرها. نربط نطاق العمل بالسيارة وحالتها وهدف المالك، وندرس البرمجة والقطع الداعمة معاً.",
    vrx: "مشروع GAD Motors V-Class VRX في ورشتنا بدبي",
    vrxSuffix: "— مشروع مرسيدس V-Class مخصص يجمع هندسة الأداء من GAD مع المقصورة الفاخرة.",
    parts: "نوفر مجموعة واسعة من قطع GAD Motors في دبي، تشمل أنظمة الوقود منخفض الضغط ومجمعات السحب والتيربو والإنتركولر والمكابس وأذرع التوصيل وترقيات ناقل الحركة وحِزم التيربو لسيارات Mercedes-AMG ومنصات الأداء الأخرى. تُختار كل قطعة وفق هدف المشروع وحالة السيارة، وتُركب وتُضبط لتقديم أداء ثابت في الظروف القاسية.",
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
    vipDescription: "مشروع مخصص لأقصى أداء، يشمل معايرة ECU حسب السيارة واختبارات داينو احترافية وترقيات عتاد متقدمة ومهندس أداء يتابع المشروع.",
    vipItems: ["ضبط مخصص على الداينو", "مكونات أداء عالية الجودة"],
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
  vip: "VIP"
};
const arabicModificationTemplates = [
  "فحص شامل وقراءة بيانات السيارة قبل البرمجة",
  "معايرة مخصصة لوحدة التحكم بالمحرك",
  "تحسين استجابة دواسة الوقود ومنحنى العزم",
  "ضبط حدود الضغط والوقود بما يناسب المنصة",
  "ترقية القطع الداعمة وفق متطلبات المرحلة",
  "اختبار الأداء والتحقق من البيانات بعد التنفيذ"
];
const localizeTuningMod = (_mod, index) => arabicModificationTemplates[index % arabicModificationTemplates.length];
const localizeDuration = (value) => value.replace(/days?/gi, "أيام").replace(/hours?/gi, "ساعات").replace(/weeks?/gi, "أسابيع");
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
                    initial: { opacity: 0, y: 10 },
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
        "aria-label": isArabic ? `اختر السيارة رقم ${i + 1}` : `Select car ${i + 1}`,
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
  const hpGain = stageInfo.spec.hp - stockSpec.hp;
  stageInfo.spec.torque - stockSpec.torque;
  +(stageInfo.spec.zeroToHundred - stockSpec.zeroToHundred).toFixed(1);
  return /* @__PURE__ */ jsx("section", { className: "relative overflow-hidden border-y border-white/[0.08] bg-[#101113] py-16 transition-colors duration-700 md:py-24", children: /* @__PURE__ */ jsxs("div", { className: "relative z-10 mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-12 max-w-3xl", children: [
      /* @__PURE__ */ jsx("p", { className: "home-kicker mb-3", children: isArabic ? arTuning.configurator.eyebrow : "Performance Configurator" }),
      /* @__PURE__ */ jsxs("h2", { className: "text-3xl font-semibold tracking-[-0.04em] text-off-white sm:text-4xl md:text-5xl", children: [
        isArabic ? arTuning.configurator.headingPrefix : "Build Your",
        " ",
        /* @__PURE__ */ jsx("span", { className: "text-burnt-orange", children: isArabic ? arTuning.configurator.headingAccent : "Power" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-lg text-sm leading-7 text-white/45 md:text-base", children: isArabic ? arTuning.configurator.description : "Select your vehicle and configure your performance stage" })
    ] }),
    /* @__PURE__ */ jsx(CarSelector, { cars: tuningCars, selectedIndex: carIndex, onSelect: setCarIndex, isArabic }),
    /* @__PURE__ */ jsx("div", { className: "mt-10 mb-10", children: /* @__PURE__ */ jsx(StageSelector, { stages: availableStages, active: stage, onChange: setStage, isArabic }) }),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4 },
        className: "flex justify-center mb-12",
        children: /* @__PURE__ */ jsx(AnimatedStat, { label: isArabic ? arTuning.configurator.horsepower : "Horsepower", value: stageInfo.spec.hp, unit: "HP", icon: Zap, gain: hpGain })
      },
      `${car.id}-${stage}`
    ),
    /* @__PURE__ */ jsx("div", { className: "relative mb-12 flex items-center justify-center", children: /* @__PURE__ */ jsx(
      motion.img,
      {
        src: car.image,
        alt: car.name,
        className: "relative z-10 h-auto w-[260px] object-contain sm:w-[340px] md:w-[500px]",
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.5 }
      },
      `${car.id}-img`
    ) }),
    /* @__PURE__ */ jsx("div", { className: "max-w-2xl mx-auto mb-12", children: /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4 },
        className: "border-t border-white/[0.1] py-6 md:py-8",
        children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-lg font-bold text-off-white mb-4 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Wrench, { className: "w-4 h-4 text-burnt-orange" }),
            stage === "stock" ? isArabic ? arTuning.configurator.factory : "Factory Specifications" : isArabic ? `${arTuning.configurator.package} ${arabicStageLabels[stage]}` : `${stageLabels[stage]} Package`
          ] }),
          /* @__PURE__ */ jsx("ul", { className: "space-y-3 mb-6", children: stageInfo.mods.map((mod, i) => /* @__PURE__ */ jsxs(
            motion.li,
            {
              initial: { opacity: 0, x: -10 },
              animate: { opacity: 1, x: 0 },
              transition: { delay: i * 0.05 },
              className: "flex items-start gap-3 text-sm text-white/70",
              children: [
                /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-burnt-orange flex-shrink-0 mt-1.5" }),
                isArabic ? localizeTuningMod(mod, i) : mod
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
          /* @__PURE__ */ jsx("p", { className: "text-white/50 max-w-xl mx-auto mb-6 text-sm md:text-base", children: isArabic ? arTuning.configurator.vipDescription : "Custom-built for maximum performance. Includes bespoke ECU calibration, professional dyno testing, advanced hardware upgrades, and a dedicated performance engineer assigned to your build." }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 max-w-lg mx-auto", children: (isArabic ? arTuning.configurator.vipItems : ["Custom Dyno Tuning", "Premium Components"]).map((item) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-2 text-sm text-burnt-orange font-medium", children: [
            /* @__PURE__ */ jsx("div", { className: "w-1 h-1 rounded-full bg-burnt-orange" }),
            item
          ] }, item)) }),
          /* @__PURE__ */ jsx("button", { className: "btn-primary mt-8", children: isArabic ? arTuning.configurator.vipCta : "Request VIP Consultation" })
        ]
      }
    ) })
  ] }) });
}
const Tuning = () => {
  const { isArabic } = useLocale();
  const url = `https://digitecme.com${isArabic ? "/ar" : ""}/tuning`;
  const englishFaqs = [
    { question: "How does Digi-Tec plan an ECU tuning project?", answer: "The team starts with the vehicle, current condition, fuel, intended use and supporting hardware. The proposed calibration and any hardware requirements are then explained before work begins." },
    { question: "How much power can a tuned car gain?", answer: "The result depends on the exact platform, its condition, fuel, calibration and supporting hardware. Vehicle-specific figures should be confirmed after inspection rather than treated as a universal promise." },
    { question: "Which cars can Digi-Tec assess for tuning?", answer: "Digi-Tec assesses Mercedes-Benz and AMG, Porsche, Audi, BMW and other performance platforms for software and supporting-hardware projects in Dubai." }
  ];
  const arabicFaqs = [
    { question: "كيف تخطط ديجي-تك لمشروع برمجة ECU؟", answer: "نبدأ بمراجعة السيارة وحالتها ونوع الوقود والاستخدام والقطع الداعمة، ثم نشرح المعايرة المقترحة وأي متطلبات قبل بدء العمل." },
    { question: "كم يمكن أن تزيد قوة السيارة بعد البرمجة؟", answer: "تعتمد النتيجة على المنصة وحالة السيارة والوقود والمعايرة والقطع الداعمة. يجب تأكيد الأرقام الخاصة بالسيارة بعد الفحص بدلاً من اعتبارها وعداً عاماً." },
    { question: "ما السيارات التي يمكن تقييمها لتطوير الأداء؟", answer: "نقيّم سيارات مرسيدس وAMG وبورش وأودي وBMW وغيرها من منصات الأداء لمشاريع البرمجة والقطع الداعمة في دبي." }
  ];
  const tuningFaqs = isArabic ? arabicFaqs : englishFaqs;
  const tuningGraph = pageGraph([
    buildWebPage({
      url,
      name: isArabic ? arTuning.seo.title : "Performance Tuning Dubai | ECU & Hardware Projects | Digi-Tec",
      description: isArabic ? arTuning.seo.description : "Vehicle-specific ECU tuning and supporting-hardware projects for performance cars at Digi-Tec in Al Quoz, Dubai.",
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
      description: isArabic ? arTuning.seo.description : "Vehicle-specific ECU tuning and supporting-hardware projects for performance cars at Digi-Tec in Al Quoz, Dubai.",
      image: "https://digitecme.com/images/tuning-hero-bg.jpg",
      offers: isArabic ? [
        "برمجة وحدة التحكم ECU",
        "برمجة المرحلة الأولى",
        "برمجة المرحلة الثانية",
        "حِزم التيربو",
        "ترقية مجمعات السحب",
        "داون بايب وأنظمة العادم",
        "ترقيات Mercedes-AMG"
      ] : [
        "ECU Remapping",
        "Stage 1 Tuning",
        "Stage 2 Tuning",
        "Turbo Kits",
        "Intake Manifold Upgrades",
        "Downpipes & Exhaust Systems",
        "AMG Performance Upgrades"
      ]
    }),
    ...tuningFaqs.length > 0 ? [buildFAQ(url, tuningFaqs)] : []
  ]);
  useSeo({
    title: isArabic ? arTuning.seo.title : "Performance Tuning Dubai | ECU & Hardware Projects | Digi-Tec",
    description: isArabic ? arTuning.seo.description : "Vehicle-specific ECU tuning and supporting-hardware projects for performance cars at Digi-Tec in Al Quoz, Dubai.",
    canonical: url,
    ogImage: "https://digitecme.com/images/tuning-hero-bg.jpg",
    jsonLd: tuningGraph
  });
  return /* @__PURE__ */ jsxs("div", { className: "site-page min-h-screen bg-black text-off-white", children: [
    /* @__PURE__ */ jsx(Header, {}),
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
              /* @__PURE__ */ jsx("span", { className: "text-red-600", children: isArabic ? arTuning.hero.titlePrefix : "GAD Motors" }),
              " ",
              isArabic ? arTuning.hero.titleSuffix : "Performance Tuning"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "max-w-2xl text-base leading-8 text-white/68 sm:text-lg", children: isArabic ? arTuning.hero.description : "Digi-Tec plans ECU tuning around the exact vehicle, its current condition, fuel, intended use and supporting hardware. The team explains the proposed calibration and expected result before the project begins." }),
            /* @__PURE__ */ jsxs("p", { className: "mt-4 text-sm text-white/48 sm:text-base", children: [
              isArabic ? arTuning.hero.moreInfo : "For more info visit",
              " ",
              /* @__PURE__ */ jsx("a", { href: "https://www.gad-motors.de/", target: "_blank", rel: "noopener noreferrer", className: "text-burnt-orange hover:underline", children: "www.gad-motors.de" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mt-8 flex flex-col items-start gap-3 sm:flex-row", children: /* @__PURE__ */ jsx(
              "a",
              {
                href: `https://wa.me/97143402223?text=${encodeURIComponent(isArabic ? arTuning.hero.whatsapp : "Hi, I'm interested in GAD performance tuning for my car.")}`,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "btn-primary w-full sm:w-auto",
                children: isArabic ? arTuning.hero.cta : "Book a Tuning Consultation"
              }
            ) }),
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
    /* @__PURE__ */ jsx("section", { id: "gad-tuning-dubai", className: "relative py-16 md:py-24 bg-black overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl sm:text-3xl md:text-4xl font-bold text-off-white mb-6 leading-tight", children: isArabic ? arTuning.content.heading : "Performance Tuning and Supporting Hardware in Dubai" }),
      /* @__PURE__ */ jsx("p", { className: "text-base md:text-lg text-white/70 leading-relaxed mb-8", children: isArabic ? arTuning.content.intro : "Digi-Tec assesses performance projects for Mercedes, Porsche, Lamborghini, Aston Martin and other platforms. The scope is matched to the vehicle, its condition and the owner’s goal, with software and supporting hardware considered together." }),
      /* @__PURE__ */ jsxs("p", { className: "text-base md:text-lg text-white/70 leading-relaxed mb-8", children: [
        isArabic ? "استكشف " : "Explore the ",
        /* @__PURE__ */ jsx(LocalizedLink, { to: "/vrx", className: "text-burnt-orange hover:underline font-semibold", children: isArabic ? arTuning.content.vrx : "GAD Motors V-Class VRX at our Dubai workshop" }),
        " ",
        isArabic ? arTuning.content.vrxSuffix : "— a bespoke Mercedes V-Class project combining GAD performance engineering with a luxury conversion."
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-base md:text-lg text-white/70 leading-relaxed mb-8", children: isArabic ? arTuning.content.parts : "A project may involve fuel-system, intake, turbocharger, intercooler, engine or gearbox components depending on the platform and target. Parts are proposed only after the team reviews compatibility and the supporting systems required by the build." }),
      /* @__PURE__ */ jsx("h3", { id: "gad-parts-dubai", className: "text-xl sm:text-2xl md:text-3xl font-bold text-off-white mb-4", children: isArabic ? arTuning.content.partsHeading : "GAD Motors Performance Parts in Dubai" }),
      /* @__PURE__ */ jsx("p", { className: "text-base md:text-lg text-white/70 leading-relaxed", children: isArabic ? arTuning.content.partsBody : "Digi-Tec combines inspection, installation and calibration at its Al Quoz workshop. Owners receive a vehicle-specific proposal covering the intended software, supporting components and checks required after installation." })
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
    /* @__PURE__ */ jsx("section", { id: "gad-tuning-near-me", className: "relative py-16 md:py-24 bg-black overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl sm:text-2xl md:text-3xl font-bold text-off-white mb-4", children: isArabic ? arTuning.content.nearHeading : "GAD Tuning Near Me in Dubai" }),
      /* @__PURE__ */ jsx("p", { className: "text-base md:text-lg text-white/70 leading-relaxed mb-6", children: isArabic ? arTuning.content.nearBody : "Digi-Tec provides performance-project assessment and ECU tuning from its workshop in Al Quoz Industrial Area 3, Dubai." }),
      /* @__PURE__ */ jsx("p", { className: "text-base md:text-lg text-white/70 leading-relaxed", children: isArabic ? arTuning.content.nearBodyTwo : "Contact the team with the make, model, year, current modifications and intended use so the appropriate inspection and project scope can be discussed." })
    ] }) }) }),
    /* @__PURE__ */ jsx(FinalCTA, {}),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
export {
  Tuning as default
};
