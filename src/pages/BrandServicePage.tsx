import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { LocalizedLink as Link } from '@/components/LocalizedLink';
import { Phone, MessageCircle, CheckCircle2, ArrowRight, Wrench, ShieldCheck } from 'lucide-react';
import Header from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useSeo } from '@/hooks/use-seo';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  BRAND_PROFILES,
  getBrandServiceCombo,
  getServicesForBrand,
} from '@/data/brandServices';
import { getBrandBySlug } from '@/data/brands';
import { CtaAssurance } from '@/components/TrustBar';
import {
  buildBrand,
  buildBreadcrumb,
  buildFAQ,
  buildService,
  buildWebPage,
  pageGraph,
  SITE_URL,
} from '@/lib/schema';
import { useLocale } from '@/i18n/use-locale';
import { MERCEDES_PROBLEMS_PATH } from '@/data/mercedesProblemGuides';
import {
  FERRARI_MAINTENANCE_GUIDE_PATH,
} from '@/data/ferrariModelPages';

const PORSCHE_RELATED_CONTENT: Record<string, { label: string; path: string }[]> = {
  'oil-change': [
    { label: 'Porsche 911 maintenance planning', path: '/blog/porsche-911-service-dubai-guide' },
    { label: 'Porsche Cayenne maintenance planning', path: '/blog/porsche-cayenne-service-dubai-guide' },
    { label: 'Porsche maintenance in Dubai', path: '/blog/porsche-maintenance-guide-dubai' },
  ],
  'transmission-repair': [
    { label: '911 manual and PDK systems', path: '/blog/porsche-911-service-dubai-guide' },
    { label: 'Macan PDK, PTM and driveline', path: '/porsche/macan' },
    { label: 'Panamera PDK considerations', path: '/blog/porsche-panamera-service-dubai-guide' },
  ],
  'suspension-repair': [
    { label: 'Cayenne air suspension and chassis', path: '/blog/porsche-cayenne-service-dubai-guide' },
    { label: 'Panamera PASM and air suspension', path: '/blog/porsche-panamera-service-dubai-guide' },
    { label: 'Taycan chassis systems', path: '/porsche/taycan' },
  ],
  'engine-diagnostics': [
    { label: 'Porsche 997 diagnostic considerations', path: '/porsche/911/997' },
    { label: 'Porsche 991 diagnostic considerations', path: '/porsche/911/991' },
    { label: 'Porsche 992 diagnostic considerations', path: '/porsche/911/992' },
  ],
  'mechanical-repair': [
    { label: 'Porsche 911 cooling and engine systems', path: '/blog/porsche-911-service-dubai-guide' },
    { label: 'Cayenne engine and cooling systems', path: '/blog/porsche-cayenne-service-dubai-guide' },
    { label: '718 powertrain and cooling', path: '/porsche/718' },
  ],
  'brake-repair': [
    { label: '911 steel and PCCB systems', path: '/blog/porsche-911-service-dubai-guide' },
    { label: 'Cayenne braking considerations', path: '/blog/porsche-cayenne-service-dubai-guide' },
    { label: 'Taycan regenerative and friction brakes', path: '/porsche/taycan' },
  ],
  'electrical-repair': [
    { label: 'Taycan low-voltage and charging overview', path: '/porsche/taycan' },
    { label: 'Panamera electrical considerations', path: '/blog/porsche-panamera-service-dubai-guide' },
    { label: 'Macan electrical and diagnostic scope', path: '/porsche/macan' },
  ],
  'battery-replacement': [
    { label: 'Taycan 12-volt system overview', path: '/porsche/taycan' },
    { label: 'Porsche maintenance in Dubai', path: '/blog/porsche-maintenance-guide-dubai' },
    { label: 'Porsche 992 electrical considerations', path: '/porsche/911/992' },
  ],
  'ac-repair': [
    { label: '911 cooling and AC considerations', path: '/blog/porsche-911-service-dubai-guide' },
    { label: 'Cayenne climate-system considerations', path: '/blog/porsche-cayenne-service-dubai-guide' },
    { label: 'Taycan thermal-management overview', path: '/porsche/taycan' },
  ],
};

const MERCEDES_RELATED_CONTENT: Record<string, { label: string; path: string }[]> = {
  'transmission-repair': [
    { label: 'Why a Mercedes gearbox jerks', path: `${MERCEDES_PROBLEMS_PATH}/gearbox-jerking` },
    { label: 'How to recognise transmission slipping', path: `${MERCEDES_PROBLEMS_PATH}/transmission-slipping` },
    { label: 'E-Class transmission considerations', path: '/blog/mercedes-e-class-service-dubai-guide' },
  ],
  'suspension-repair': [
    { label: 'What an AIRMATIC malfunction means', path: `${MERCEDES_PROBLEMS_PATH}/airmatic-malfunction` },
    { label: 'Why air suspension drops overnight', path: `${MERCEDES_PROBLEMS_PATH}/suspension-dropping-overnight` },
    { label: 'S-Class suspension systems', path: '/blog/mercedes-s-class-service-dubai-guide' },
  ],
  'engine-diagnostics': [
    { label: 'Mercedes check-engine light guide', path: `${MERCEDES_PROBLEMS_PATH}/check-engine-light` },
    { label: "Mercedes won't-start guide", path: `${MERCEDES_PROBLEMS_PATH}/wont-start` },
    { label: 'Browse all Mercedes diagnostic guides', path: MERCEDES_PROBLEMS_PATH },
  ],
  'mechanical-repair': [
    { label: 'What to do when a Mercedes overheats', path: `${MERCEDES_PROBLEMS_PATH}/engine-overheating` },
    { label: 'How a Mercedes oil leak is traced', path: `${MERCEDES_PROBLEMS_PATH}/oil-leak` },
    { label: 'AMG G63 platform guide', path: '/blog/mercedes-g63-service-dubai-guide' },
  ],
  'ac-repair': [
    { label: 'Why Mercedes AC stops cooling', path: `${MERCEDES_PROBLEMS_PATH}/ac-not-cooling` },
    { label: 'GLE cooling and climate considerations', path: '/mercedes/models/gle-service-repair-dubai' },
    { label: 'GLS three-row climate considerations', path: '/mercedes/models/gls-service-repair-dubai' },
  ],
  'battery-replacement': [
    { label: 'What a Mercedes battery warning means', path: `${MERCEDES_PROBLEMS_PATH}/battery-warning` },
    { label: "Mercedes won't-start guide", path: `${MERCEDES_PROBLEMS_PATH}/wont-start` },
    { label: 'E-Class 12V and 48V considerations', path: '/blog/mercedes-e-class-service-dubai-guide' },
  ],
  'electrical-repair': [
    { label: 'Mercedes battery and charging warnings', path: `${MERCEDES_PROBLEMS_PATH}/battery-warning` },
    { label: "No-crank and crank-no-start diagnosis", path: `${MERCEDES_PROBLEMS_PATH}/wont-start` },
    { label: 'S-Class electrical considerations', path: '/blog/mercedes-s-class-service-dubai-guide' },
  ],
};

const FERRARI_RELATED_CONTENT: Record<string, { label: string; path: string }[]> = {
  'oil-change': [
    { label: 'Ferrari 296 hybrid maintenance considerations', path: '/brands/ferrari-service-dubai/296' },
    { label: 'Ferrari 812 V12 maintenance considerations', path: '/brands/ferrari-service-dubai/812' },
    { label: 'Ferrari maintenance guide for Dubai', path: FERRARI_MAINTENANCE_GUIDE_PATH },
  ],
  'brake-repair': [
    { label: 'Ferrari 296 regenerative braking overview', path: '/brands/ferrari-service-dubai/296' },
    { label: 'Ferrari 812 brake-system overview', path: '/brands/ferrari-service-dubai/812' },
    { label: 'Ferrari Purosangue braking considerations', path: '/brands/ferrari-service-dubai/purosangue' },
  ],
  'transmission-repair': [
    { label: 'Portofino seven- versus eight-speed DCT', path: '/brands/ferrari-service-dubai/portofino' },
    { label: 'Ferrari 812 seven-speed transaxle overview', path: '/brands/ferrari-service-dubai/812' },
    { label: 'Purosangue eight-speed DCT and 4RM-S evo', path: '/brands/ferrari-service-dubai/purosangue' },
  ],
  'suspension-repair': [
    { label: 'Portofino SCM-E suspension overview', path: '/brands/ferrari-service-dubai/portofino' },
    { label: 'Ferrari 812 steering and SCM-E overview', path: '/brands/ferrari-service-dubai/812' },
    { label: 'Purosangue TASV active suspension', path: '/brands/ferrari-service-dubai/purosangue' },
  ],
  'engine-diagnostics': [
    { label: 'Ferrari 296 hybrid diagnostic scope', path: '/brands/ferrari-service-dubai/296' },
    { label: 'Ferrari 812 V12 diagnostic considerations', path: '/brands/ferrari-service-dubai/812' },
    { label: 'Purosangue V12 and chassis diagnostics', path: '/brands/ferrari-service-dubai/purosangue' },
  ],
  'mechanical-repair': [
    { label: 'Portofino V8 and roof-system overview', path: '/brands/ferrari-service-dubai/portofino' },
    { label: 'Ferrari 812 V12 and transaxle overview', path: '/brands/ferrari-service-dubai/812' },
    { label: 'Purosangue V12 and 4RM-S evo overview', path: '/brands/ferrari-service-dubai/purosangue' },
  ],
  'electrical-repair': [
    { label: 'Ferrari 296 hybrid and low-voltage scope', path: '/brands/ferrari-service-dubai/296' },
    { label: 'Portofino roof and electrical systems', path: '/brands/ferrari-service-dubai/portofino' },
    { label: 'Purosangue 12-volt, 48-volt and comfort systems', path: '/brands/ferrari-service-dubai/purosangue' },
  ],
  'battery-replacement': [
    { label: 'Ferrari 296 low-voltage and hybrid considerations', path: '/brands/ferrari-service-dubai/296' },
    { label: 'Portofino storage and roof-system considerations', path: '/brands/ferrari-service-dubai/portofino' },
    { label: 'Purosangue 12-volt and 48-volt considerations', path: '/brands/ferrari-service-dubai/purosangue' },
  ],
  'ac-repair': [
    { label: 'Ferrari 296 thermal-management overview', path: '/brands/ferrari-service-dubai/296' },
    { label: 'Portofino cooling and AC considerations', path: '/brands/ferrari-service-dubai/portofino' },
    { label: 'Purosangue four-seat climate considerations', path: '/brands/ferrari-service-dubai/purosangue' },
  ],
};

const serviceNamesArabic: Record<string, string> = {
  'oil-change': 'تغيير الزيت', 'brake-repair': 'إصلاح الفرامل', 'transmission-repair': 'إصلاح ناقل الحركة', 'ac-repair': 'إصلاح التكييف', 'suspension-repair': 'إصلاح التعليق', 'engine-diagnostics': 'تشخيص المحرك', 'mechanical-repair': 'الإصلاح الميكانيكي', 'steering-repair': 'إصلاح نظام التوجيه', 'battery-replacement': 'تبديل البطارية', 'electrical-repair': 'إصلاح الكهرباء', 'exhaust-repair': 'إصلاح العادم', 'fuel-system-repair': 'إصلاح نظام الوقود', 'body-repair': 'إصلاح الهيكل', 'tire-repair': 'إصلاح الإطارات',
  'soft-close-door-installation': 'تركيب وإصلاح الإغلاق الناعم للأبواب',
};

const MERCEDES_SERVICE_PATHS: Record<string, string> = {
  'oil-change': '/services/mercedes-oil-change-dubai',
  'brake-repair': '/services/mercedes-brake-repair-dubai',
  'transmission-repair': '/services/mercedes-transmission-repair-dubai',
  'ac-repair': '/services/mercedes-ac-repair-dubai',
  'suspension-repair': '/services/mercedes-suspension-repair-dubai',
  'engine-diagnostics': '/services/mercedes-diagnostics-dubai',
  'mechanical-repair': '/services/mercedes-mechanical-repair-dubai',
  'steering-repair': '/services/mercedes-steering-repair-dubai',
  'battery-replacement': '/services/mercedes-battery-replacement-dubai',
  'electrical-repair': '/services/mercedes-electrical-repair-dubai',
  'exhaust-repair': '/services/mercedes-exhaust-repair-dubai',
  'fuel-system-repair': '/services/mercedes-fuel-system-repair-dubai',
  'body-repair': '/services/mercedes-body-repair-dubai',
  'tire-repair': '/services/mercedes-tire-repair-dubai',
};

interface BrandServicePageProps {
  brandSlugOverride?: string;
  serviceSlugOverride?: string;
  canonicalPath?: string;
}

const mcLarenServiceOverride = (combo: NonNullable<ReturnType<typeof getBrandServiceCombo>>) => {
  const enquiry = `Hi DIGI-TEC, I would like to request a McLaren ${combo.serviceName.toLowerCase()} assessment.\n\nModel: \nYear: \nMileage: \nWarning or symptoms: `;
  const shared = {
    whatsAppMessage: enquiry,
    partsCopy: 'Parts, fluids and procedures are selected only after the VIN, fitted system and inspection findings are reviewed. The estimate identifies the proposed option and availability before approval; no one specification is applied to every McLaren model.',
  };
  if (combo.serviceSlug === 'transmission-repair') return { ...combo, ...shared,
    h1: 'McLaren Transmission Repair Dubai', metaTitle: 'McLaren Transmission Repair Dubai | DIGI-TEC',
    metaDescription: 'McLaren transmission and gearbox assessment in Al Quoz, Dubai. Discuss DCT or SSG warnings, shift concerns, leaks and service scope with DIGI-TEC.',
    heroCopy: 'DIGI-TEC assesses McLaren gearbox warnings, shift concerns, leaks and drivability symptoms in Al Quoz. The VIN and fitted transmission are identified first because seven-speed SSG/DCT and Artura eight-speed DCT systems have different fluids, procedures and supported functions. Service, clutch, calibration or internal repair availability is confirmed after assessment.',
    symptoms: ['Transmission or gearbox warning displayed', 'Delayed, harsh or inconsistent engagement', 'Change in shift quality or clutch behaviour', 'Fluid leak or unusual noise near the transmission'],
    processSteps: [{title:'Identify the fitted transmission',description:'Confirm the model, VIN, gearbox variant, history and reported symptom.'},{title:'Assess the concern',description:'Review compatible fault data, leaks, fluid condition and drivability where appropriate.'},{title:'Define the supported scope',description:'Confirm fluid, parts, service functions and whether further specialist repair is available.'},{title:'Estimate before approval',description:'Explain the findings, proposed work and expected timing before authorised work begins.'}],
    faqs: [{question:'Do all McLaren models use the same gearbox?',answer:'No. Transmission design and specification vary by model and generation; Artura also uses a different hybrid transmission arrangement. The VIN and fitted unit are confirmed before fluid or procedures are proposed.'},{question:'Can a fluid service fix a gearbox warning?',answer:'A fluid service is not a universal fix. The warning, fault data, condition and symptoms must be assessed first. The recommended service or repair depends on the findings.'},{question:'Do you rebuild McLaren gearboxes?',answer:'Assessment is available. Internal repair, clutch, mechatronic, calibration and rebuild scope must be confirmed for the exact transmission after diagnosis; this page does not promise every operation.'},{question:'What determines the estimate?',answer:'Diagnostic time, the fitted gearbox, service or repair scope, parts and fluid requirements, and availability determine the estimate.'}] };
  if (combo.serviceSlug === 'engine-diagnostics') return { ...combo, ...shared,
    h1:'McLaren Engine Diagnostics Dubai', metaTitle:'McLaren Engine Diagnostics Dubai | DIGI-TEC',
    metaDescription:'McLaren warning-light and drivability diagnostics in Al Quoz, Dubai. Compatible scan coverage and physical testing are confirmed for the vehicle.',
    heroCopy:'DIGI-TEC assesses McLaren warning lights, reduced performance, misfires, starting concerns and intermittent faults. Compatible scan coverage, live data and physical testing are matched to the exact model and complaint. A stored code is evidence for diagnosis, not proof that the named component must be replaced.',
    symptoms:['Engine or powertrain warning displayed','Misfire, rough idle or hesitation','Reduced performance or unusual drivability','Starting, low-voltage or intermittent electrical concern'],
    processSteps:[{title:'Record the exact symptom',description:'Review the warning text, when it occurs, recent work and service history.'},{title:'Confirm diagnostic coverage',description:'Check compatible module access and collect supported fault and live data.'},{title:'Test the likely system',description:'Use suitable electrical or mechanical checks rather than replacing a part from a code alone.'},{title:'Explain the next step',description:'Separate confirmed faults from further testing and quote approved work.'}],
    faqs:[{question:'Can you clear a McLaren warning light?',answer:'Codes may be cleared where supported, but clearing a warning does not repair its cause. The diagnostic aim is to identify the reason and explain the next step.'},{question:'Do you program McLaren modules?',answer:'Programming is not assumed. Module, security and software access and workshop capability must be confirmed for the exact vehicle before such work is accepted.'},{question:'How much does diagnosis cost?',answer:'The fee depends on the concern, module access and test time. The initial assessment scope and price are confirmed before work.'},{question:'What should I send before booking?',answer:'Send the model, year, mileage, exact warning, symptoms and when they occur. Photos or a short video may help describe an intermittent concern.'}] };
  if (combo.serviceSlug === 'oil-change') return { ...combo, ...shared,
    h1:'McLaren Oil Change & Maintenance Dubai', metaTitle:'McLaren Oil Change & Maintenance Dubai | DIGI-TEC',
    metaDescription:'McLaren oil service and maintenance assessment in Al Quoz, Dubai. Oil, filters and service scope are matched to the exact model and year.',
    heroCopy:'McLaren oil and maintenance requirements vary by model, engine, year and market. DIGI-TEC reviews the VIN, service information, mileage, history and use before confirming the correct oil, filter, seals, inspection items and supported service reset. No universal grade or interval is published for every McLaren.',
    symptoms:['Service or maintenance reminder due','Unknown or incomplete service history','Oil level warning or evidence of a leak','Preparing a stored or recently purchased vehicle for use'],
    processSteps:[{title:'Review model and history',description:'Confirm the VIN, year, mileage, previous service and intended use.'},{title:'Verify the service specification',description:'Identify the applicable oil, filter, fluids and inspection items from vehicle-specific information.'},{title:'Inspect before adding work',description:'Check relevant leaks, levels and visible condition; explain any separate concerns.'},{title:'Complete the agreed scope',description:'Carry out the approved service and supported reset, then record the work.'}],
    faqs:[{question:'Which oil does my McLaren need?',answer:'The correct approval and viscosity depend on the exact model, engine, year and market. They are verified from vehicle-specific information before quotation.'},{question:'How often should a McLaren be serviced?',answer:'Follow the schedule for the exact model and year, then consider mileage, history, storage and use. One interval is not applied to every McLaren.'},{question:'Do you offer major and minor service packages?',answer:'The workshop confirms the maintenance items due for the vehicle rather than inventing a universal package. Ask for an itemised scope.'},{question:'What determines oil-service cost?',answer:'The model, required oil quantity and specification, filters, seals, due inspection items and any separate findings determine the estimate.'}] };
  if (combo.serviceSlug === 'mechanical-repair') return { ...combo, ...shared,
    h1:'McLaren Engine & Mechanical Repair Dubai', metaTitle:'McLaren Engine & Mechanical Repair Dubai | DIGI-TEC',
    metaDescription:'McLaren engine, cooling and mechanical assessment in Al Quoz, Dubai. Repair scope is confirmed from the vehicle, symptoms and inspection findings.',
    heroCopy:'DIGI-TEC assesses McLaren oil leaks, coolant loss, overheating, unusual engine noise and drivability concerns. The exact engine, conventional or hybrid platform, symptoms and test findings determine the next step. Engine removal, internal repair, hybrid high-voltage work and specialist calibration are not assumed and must be confirmed separately.',
    symptoms:['Coolant loss, temperature warning or overheating','Oil leak, unusual smell or visible fluid','Unusual engine noise, vibration or reduced performance','Mechanical concern found during service or diagnosis'],
    processSteps:[{title:'Document the concern',description:'Record the warning, operating conditions, history and any recent work.'},{title:'Inspect and test',description:'Combine compatible diagnostics with cooling, leak or mechanical tests appropriate to the symptom.'},{title:'Confirm capability and parts',description:'Define the supported repair, further specialist work and vehicle-specific parts before approval.'},{title:'Verify agreed work',description:'Complete the approved scope and appropriate post-repair checks.'}],
    faqs:[{question:'Can you assess McLaren overheating or coolant loss?',answer:'Yes, an assessment can review the warning, visible leaks, cooling performance and related data. The repair scope depends on the source and vehicle.'},{question:'Do you repair Artura high-voltage systems?',answer:'High-voltage repair is not advertised here. Conventional checks and the concern can be discussed, but training, access and supported high-voltage scope require explicit confirmation before booking.'},{question:'Do you repair carbon-tub structural damage?',answer:'Carbon-tub structural repair is not promised by this page. Body damage needs a separate assessment and confirmation of an appropriate repair route.'},{question:'How is the estimate prepared?',answer:'The estimate follows identification, testing and the supported repair scope. Parts, access, further testing and specialist operations affect cost and timing.'}] };
  return { ...combo, ...shared };
};

const rollsRoyceServiceOverride = (combo: NonNullable<ReturnType<typeof getBrandServiceCombo>>) => {
  const shared = {
    whatsAppMessage: `Hi DIGI-TEC, I would like to request a Rolls-Royce ${combo.serviceName.toLowerCase()} assessment.\n\nModel: \nYear: \nMileage: \nService history: \nWarning or symptoms: `,
    partsCopy: 'Parts, fluids and procedures are selected after the exact Rolls-Royce, fitted system and inspection findings are reviewed. The itemised estimate identifies the proposed option and availability before approval; one specification is not applied to every model or generation.',
  };
  if (combo.serviceSlug === 'engine-diagnostics') return { ...combo, ...shared,
    h1: 'Rolls-Royce Engine Diagnostics Dubai', metaTitle: 'Rolls-Royce Engine Diagnostics Dubai | DIGI-TEC', metaDescription: 'Rolls-Royce warning-light and drivability diagnostics in Al Quoz, Dubai. Compatible scan coverage and physical testing are confirmed for the vehicle.',
    heroCopy: 'DIGI-TEC assesses Rolls-Royce warning messages, misfires, starting concerns and changes in drivability. Compatible module access, available fault data and physical testing are matched to the exact model and complaint. A stored code is a starting point for diagnosis, not proof that the named component has failed.',
    symptoms: ['Engine or powertrain warning displayed','Misfire, rough running or reduced performance','Starting, low-voltage or intermittent concern','Warning that returns after previous work'],
    processSteps: [{title:'Record the exact concern',description:'Review the warning text, operating conditions, model year, history and recent work.'},{title:'Confirm diagnostic coverage',description:'Check compatible module access and collect supported fault and live data.'},{title:'Test the affected system',description:'Use suitable electrical or mechanical checks instead of replacing a part from a code alone.'},{title:'Explain and quote the next step',description:'Separate confirmed faults from further testing and quote supported work before approval.'}],
    faqs: [{question:'Can you clear a Rolls-Royce warning light?',answer:'Codes may be cleared where supported, but clearing a warning does not repair its cause. The aim is to identify the reason and explain the appropriate next step.'},{question:'Do you use manufacturer-level Rolls-Royce diagnostics?',answer:'That claim is not made. Compatible coverage and supported functions are confirmed for the exact vehicle; coding, programming and security access are not assumed.'},{question:'Can a code identify the failed part?',answer:'Not by itself. Fault context, physical testing and the vehicle condition may be needed before a component is recommended.'},{question:'What should I send before booking?',answer:'Send the model, year, mileage, exact warning, symptoms, when they occur and any recent work.'}] };
  if (combo.serviceSlug === 'mechanical-repair') return { ...combo, ...shared,
    h1: 'Rolls-Royce Engine & Mechanical Repair Dubai', metaTitle: 'Rolls-Royce Engine Repair Dubai | DIGI-TEC', metaDescription: 'Rolls-Royce engine, cooling and mechanical assessment in Al Quoz, Dubai. Repair scope follows vehicle identification and inspection findings.',
    heroCopy: 'DIGI-TEC assesses Rolls-Royce oil leaks, coolant loss, overheating, unusual noise and drivability concerns. The exact combustion model, engine, history, symptoms and test findings determine the repair route. Spectre is electric and is not included in combustion-engine service or repair descriptions.',
    symptoms: ['Coolant loss, temperature warning or overheating','Oil leak, unusual smell or visible fluid','Unusual engine noise, vibration or reduced performance','Mechanical concern found during maintenance or diagnosis'],
    processSteps: [{title:'Identify the vehicle and concern',description:'Confirm the model, year, history, warning and operating conditions.'},{title:'Inspect and test',description:'Combine compatible diagnostics with leak, cooling or mechanical tests appropriate to the symptom.'},{title:'Confirm capability and parts',description:'Define the supported repair, parts and any specialist route before approval.'},{title:'Verify the agreed work',description:'Complete the approved scope and appropriate post-repair checks.'}],
    faqs: [{question:'Can you assess Rolls-Royce overheating or coolant loss?',answer:'The concern can be assessed with checks appropriate to the exact vehicle. Repair scope depends on identifying the source.'},{question:'Is Spectre included on this engine-repair page?',answer:'No. Spectre is fully electric and is not associated with V12 oil service, spark plugs, exhaust work or combustion-engine diagnosis.'},{question:'Do you repair every Rolls-Royce engine internally?',answer:'No universal internal-engine capability is promised. The team confirms the supported repair route after identification and diagnosis.'},{question:'How is the estimate prepared?',answer:'The estimate follows inspection and the confirmed scope, with diagnostic time, access, parts and further specialist operations identified where applicable.'}] };
  if (combo.serviceSlug === 'transmission-repair') return { ...combo, ...shared,
    h1: 'Rolls-Royce Transmission Repair Dubai', metaTitle: 'Rolls-Royce Transmission Repair Dubai | DIGI-TEC', metaDescription: 'Rolls-Royce transmission and gearbox assessment in Al Quoz, Dubai for warnings, leaks, engagement and shift-quality concerns.',
    heroCopy: 'DIGI-TEC assesses Rolls-Royce gearbox warnings, leaks, delayed engagement and changes in shift quality. Transmission specification and functions vary by model and generation, so the fitted unit, service history and evidence are identified before fluid, parts, adaptation or repair work is proposed.',
    symptoms: ['Transmission or gearbox warning displayed','Delayed, harsh or inconsistent engagement','Change in shift quality or drivability','Fluid leak or unusual noise near the transmission'],
    processSteps: [{title:'Identify the fitted transmission',description:'Confirm the exact model, year, gearbox, history and reported symptom.'},{title:'Assess the evidence',description:'Review supported fault data, leaks, fluid condition and drivability where appropriate.'},{title:'Define the supported scope',description:'Confirm fluid, parts, service functions and repair availability for the fitted unit.'},{title:'Estimate before approval',description:'Explain findings, proposed work and timing before authorised work begins.'}],
    faqs: [{question:'Do all Rolls-Royce models use the same transmission?',answer:'No. The fitted transmission and applicable procedures must be confirmed for the exact model and generation.'},{question:'Can a fluid service fix a gearbox warning?',answer:'Not necessarily. The warning, data, condition and symptoms should be assessed before service or repair is recommended.'},{question:'Is satellite-aided transmission fitted to every Rolls-Royce?',answer:'No. Rolls-Royce describes it for relevant newer Ghost engineering; the feature is not assumed across all models and generations.'},{question:'Do you rebuild every Rolls-Royce gearbox?',answer:'No. Internal repair, mechatronic, converter and rebuild availability is confirmed for the exact unit after diagnosis.'}] };
  if (combo.serviceSlug === 'suspension-repair') return { ...combo, ...shared,
    h1: 'Rolls-Royce Air Suspension Repair Dubai', metaTitle: 'Rolls-Royce Suspension Repair Dubai | DIGI-TEC', metaDescription: 'Rolls-Royce ride-height, air-suspension and ride-quality assessment in Al Quoz, Dubai. Fitted systems and repair scope are confirmed first.',
    heroCopy: 'DIGI-TEC assesses ride-height warnings, leaning, compressor operation, leaks, suspension noise and changes in ride quality. The fitted system varies by model and generation. Planar and Flagbearer references are limited to the relevant newer Ghost generation rather than applied to every Rolls-Royce.',
    symptoms: ['Suspension or ride-height warning','Vehicle sits unevenly or changes height slowly','Compressor runs frequently or unusual suspension noise is present','Ride quality or handling has changed'],
    processSteps: [{title:'Identify the fitted suspension',description:'Confirm model, year, options, ride height and the exact symptom.'},{title:'Inspect and test',description:'Check visible condition and supported fault or pressure information as applicable.'},{title:'Confirm the repair route',description:'Define supported compressor, strut, valve, sensor, damper, parts and calibration scope.'},{title:'Quote and verify',description:'Explain proposed work and suitable post-repair checks before approval.'}],
    faqs: [{question:'Do you inspect Rolls-Royce air-suspension problems?',answer:'Ride-height and air-suspension concerns can be assessed. Parts, procedures and supported calibration functions are confirmed for the exact vehicle.'},{question:'Does every Rolls-Royce use Planar and Flagbearer?',answer:'No. Official Rolls-Royce material describes those systems for the relevant newer Ghost generation. They should not be universalised.'},{question:'Does leaning prove an air strut has failed?',answer:'No. Leaks, lines, valves, sensors, compressor operation and mechanical condition may need testing before a part is proposed.'},{question:'What affects suspension-repair cost?',answer:'The fitted system, diagnostic time, failed component, parts, access and supported calibration or alignment work determine the estimate.'}] };
  if (combo.serviceSlug === 'oil-change') return { ...combo, ...shared,
    h1: 'Rolls-Royce Oil Change & Maintenance Dubai', metaTitle: 'Rolls-Royce Oil Change & Maintenance Dubai | DIGI-TEC', metaDescription: 'Rolls-Royce oil service and maintenance assessment in Al Quoz, Dubai. Oil, filters and due items are matched to the exact combustion model.',
    heroCopy: 'Rolls-Royce oil and maintenance requirements vary by combustion model, engine, year and market. DIGI-TEC reviews the vehicle, service information, mileage and history before confirming oil, filters, seals, inspection items and any supported reset. Spectre is electric and is not included in engine-oil servicing.',
    symptoms: ['Service or maintenance reminder due','Unknown or incomplete service history','Oil-level warning or evidence of a leak','Stored or low-mileage combustion model requiring a maintenance review'],
    processSteps: [{title:'Review model and history',description:'Confirm the combustion model, year, mileage, previous service and use.'},{title:'Verify service information',description:'Identify the applicable oil, filters, fluids and due inspection items.'},{title:'Inspect before adding work',description:'Explain leaks, levels or other findings separately from scheduled work.'},{title:'Complete the approved scope',description:'Carry out the agreed service and supported reset, then record the work.'}],
    faqs: [{question:'Which oil does my Rolls-Royce need?',answer:'The correct approval and viscosity depend on the exact combustion model, engine, year and market. They are verified before quotation.'},{question:'How often should a Rolls-Royce be serviced?',answer:'Use the model-year service information, mileage, history, condition, storage and use. One annual or kilometre interval is not applied to every vehicle.'},{question:'Is Spectre included in an oil change?',answer:'No. Spectre is fully electric and is not associated with engine-oil or combustion maintenance.'},{question:'What affects maintenance cost?',answer:'Oil quantity and specification, filters, fluids, due inspection items, labour and separate findings determine the estimate.'}] };
  if (combo.serviceSlug === 'ac-repair') return { ...combo, ...shared,
    h1: 'Rolls-Royce AC Repair Dubai', metaTitle: 'Rolls-Royce AC Repair Dubai | DIGI-TEC', metaDescription: 'Rolls-Royce air-conditioning assessment in Al Quoz, Dubai for weak cooling, airflow, leaks, compressor and cabin-zone concerns.',
    heroCopy: 'DIGI-TEC assesses weak cooling, airflow problems, leaks, compressor noise and cabin-zone concerns. Refrigerant, system layout, equipment, access and parts vary by model and market, so the vehicle label and exact configuration are checked before service or repair. The starlight headliner is not described as a ventilation system.',
    symptoms: ['AC is weak or not cooling','Airflow differs between vents or cabin zones','Unusual compressor, blower or actuator noise','Odour, water ingress or a recurring loss of cooling'],
    processSteps: [{title:'Confirm the exact climate system',description:'Identify the model, year, configuration, refrigerant label and complaint.'},{title:'Test performance and leaks',description:'Check temperatures, airflow, pressures and relevant electrical data as appropriate.'},{title:'Define the supported repair',description:'Confirm equipment, access, parts and any supported calibration before approval.'},{title:'Verify cooling performance',description:'Complete the agreed work and recheck the system under suitable conditions.'}],
    faqs: [{question:'Which refrigerant does my Rolls-Royce use?',answer:'The vehicle label and model details determine the correct refrigerant. One type is not assumed for every Rolls-Royce.'},{question:'Can you inspect rear-cabin climate concerns?',answer:'The concern can be assessed, but the fitted zones, access, parts and accepted repair scope must be confirmed for the exact vehicle.'},{question:'Is the starlight headliner part of AC ventilation?',answer:'That connection is not claimed. Starlight headliner features should not be presented as a climate-system specification without authoritative vehicle documentation.'},{question:'What affects the AC estimate?',answer:'Testing time, refrigerant, fault location, access, parts, equipment and supported functions determine the estimate.'}] };
  if (combo.serviceSlug === 'battery-replacement') return { ...combo, ...shared,
    h1: 'Rolls-Royce Battery Replacement & Diagnosis Dubai', metaTitle: 'Rolls-Royce Battery Replacement Dubai | DIGI-TEC', metaDescription: 'Rolls-Royce low-voltage battery, charging and battery-drain assessment in Al Quoz, Dubai. Specification and supported functions are confirmed.',
    heroCopy: 'DIGI-TEC assesses low-voltage starting, charging, battery-drain and storage-related concerns. Battery specification, access, safe replacement procedure and any supported registration or initialization function are confirmed for the exact Rolls-Royce. Low-voltage work does not establish Spectre high-voltage capability.',
    symptoms: ['Slow crank, no-start or low-voltage warning','Battery discharges after parking','Charging-system or intermittent electrical concern','Replacement recommended after testing'],
    processSteps: [{title:'Identify the low-voltage system',description:'Confirm the exact model and keep low-voltage work separate from Spectre high-voltage systems.'},{title:'Test before replacement',description:'Check battery condition, charging and unwanted current draw where relevant.'},{title:'Verify specification and procedure',description:'Confirm battery type, fitment and supported registration or initialization requirements.'},{title:'Complete and recheck',description:'Fit only the approved battery and verify low-voltage operation.'}],
    faqs: [{question:'Do all Rolls-Royce models use the same battery?',answer:'No. Specification, fitment and procedure vary and must be verified for the exact vehicle.'},{question:'Can you diagnose battery drain?',answer:'An assessment may include battery, charging and unwanted-current-draw testing appropriate to the concern.'},{question:'Is this Spectre high-voltage battery repair?',answer:'No. Low-voltage battery work does not establish high-voltage battery, charging or isolation capability.'},{question:'Is battery registration always required?',answer:'Not necessarily. Any registration or initialization depends on the vehicle and supported workshop access.'}] };
  if (combo.serviceSlug === 'electrical-repair') return { ...combo, ...shared,
    h1: 'Rolls-Royce Electrical Repair Dubai', metaTitle: 'Rolls-Royce Electrical Repair Dubai | DIGI-TEC', metaDescription: 'Rolls-Royce electrical fault and low-voltage assessment in Al Quoz, Dubai. Wiring, charging and module concerns are tested before repair.',
    heroCopy: 'DIGI-TEC assesses low-voltage, charging, wiring, sensor and module-communication concerns with testing appropriate to the exact vehicle. Compatible diagnostic access and supported functions are confirmed before quotation. Coding, programming, security access and Spectre high-voltage work are not assumed.',
    symptoms: ['Low-voltage or charging warning','Intermittent no-start or battery discharge','Lighting, switch, sensor or comfort-system concern','Module-communication or wiring fault'],
    processSteps: [{title:'Record the electrical concern',description:'Review the exact symptom, timing, battery history and recent work.'},{title:'Confirm supported diagnostic access',description:'Identify available module data and functions for the exact vehicle.'},{title:'Test the circuit or system',description:'Use appropriate voltage, current, continuity or component checks before proposing parts.'},{title:'Explain the supported repair',description:'Quote confirmed wiring, component or further diagnostic work before approval.'}],
    faqs: [{question:'Can you diagnose intermittent electrical faults?',answer:'The concern can be assessed using history, compatible fault data and appropriate electrical testing. Intermittent faults may require additional time or repeat conditions.'},{question:'Do you program Rolls-Royce modules?',answer:'Programming is not promised. Software, security access, compatibility and workshop capability must be confirmed for the exact module and vehicle.'},{question:'Does this page include Spectre high-voltage work?',answer:'No. High-voltage battery, charging and isolation work is not advertised without confirmed training, equipment and accepted scope.'},{question:'What determines the estimate?',answer:'Diagnostic time, access, wiring or component findings, parts and supported functions determine the estimate.'}] };
  return { ...combo, ...shared };
};

const lamborghiniServiceOverride = (combo: NonNullable<ReturnType<typeof getBrandServiceCombo>>) => {
  const shared = {
    whatsAppMessage: `Hi DIGI-TEC, I would like to request a Lamborghini ${combo.serviceName.toLowerCase()} assessment.\n\nModel: \nYear: \nMileage: \nWarning or symptoms: `,
    partsCopy: 'Parts, fluids, procedures and supported service functions are confirmed after the exact Lamborghini and fitted system are identified. The estimate lists the proposed scope before approval; no one specification is applied to every model.',
  };
  if (combo.serviceSlug === 'transmission-repair') return { ...combo, ...shared,
    h1:'Lamborghini Transmission & Gearbox Assessment Dubai', metaTitle:'Lamborghini Transmission Repair Dubai | DIGI-TEC', metaDescription:'Lamborghini gearbox and transmission assessment in Al Quoz, Dubai. LDF, ISR and automatic systems are identified before service or repair is proposed.',
    heroCopy:'Lamborghini transmission architecture varies by model. Huracán EVO uses a seven-speed LDF dual-clutch transmission, Urus S an eight-speed automatic, and Aventador SVJ an ISR gearbox. DIGI-TEC identifies the fitted unit and assesses the warning, leak, shift or clutch concern before confirming fluid, service functions, parts or available repair scope.',
    symptoms:['Transmission or gearbox warning displayed','Change in engagement or shift quality','Clutch, hydraulic or drivability concern','Fluid leak or unusual noise near the transmission'],
    processSteps:[{title:'Identify the transmission',description:'Confirm the model, VIN, fitted gearbox, history and reported concern.'},{title:'Assess the evidence',description:'Review compatible fault data, physical condition, leaks and drivability where appropriate.'},{title:'Confirm supported scope',description:'Match fluid, procedures, parts and available service or repair functions to the fitted unit.'},{title:'Estimate before approval',description:'Explain findings, proposed work and timing before authorised work begins.'}],
    faqs:[{question:'Do Urus and Huracán use the same transmission?',answer:'No. Urus S uses an eight-speed automatic while Huracán EVO uses a seven-speed LDF dual-clutch transmission. Other variants must be verified separately.'},{question:'Does Aventador use the Huracán LDF?',answer:'No. Aventador SVJ uses an ISR gearbox. Its clutch, hydraulic and service considerations should not be described as Huracán LDF procedures.'},{question:'Do you rebuild Lamborghini gearboxes?',answer:'Assessment is available, but internal repair, clutch, hydraulic, calibration and rebuild capability must be confirmed for the exact transmission after diagnosis.'},{question:'Can one symptom prove a failed component?',answer:'No. Speed, shift behaviour or a warning alone does not prove a failed clutch, torque converter or hydraulic component. Testing and the fitted architecture matter.'}] };
  if (combo.serviceSlug === 'battery-replacement') return { ...combo, ...shared,
    h1:'Lamborghini Battery Replacement & Diagnosis Dubai', metaTitle:'Lamborghini Battery Replacement Dubai | DIGI-TEC', metaDescription:'Lamborghini low-voltage battery, charging and starting assessment in Al Quoz, Dubai. Battery specification and supported registration are confirmed per vehicle.',
    heroCopy:'DIGI-TEC assesses low-voltage starting, charging, battery-drain and accessory-battery concerns. The required battery specification, safe replacement procedure and any supported registration or coding function are confirmed for the exact Lamborghini. This page does not advertise hybrid traction-battery repair.',
    symptoms:['Slow crank, no-start or low-voltage warning','Battery discharges after parking','Charging-system or intermittent electrical concern','Replacement required after testing'],
    processSteps:[{title:'Confirm the battery system',description:'Identify the exact vehicle and separate low-voltage work from any hybrid high-voltage system.'},{title:'Test before replacement',description:'Check battery condition, charging and unwanted current draw where relevant.'},{title:'Verify specification and procedure',description:'Confirm battery type, fitment and supported registration or initialization requirements.'},{title:'Complete and recheck',description:'Fit only the approved battery and verify low-voltage operation.'}],
    faqs:[{question:'Is this hybrid-battery repair?',answer:'No. This page covers low-voltage starting and accessory battery work. Hybrid traction-battery service requires separate confirmed capability.'},{question:'Does every Lamborghini use the same battery?',answer:'No. Specification, chemistry, fitment and procedure vary. They are verified for the exact vehicle.'},{question:'Is battery registration always required?',answer:'Not necessarily. Any registration, coding or initialization depends on the vehicle and supported workshop access.'},{question:'What determines the estimate?',answer:'Testing time, battery specification, access, required procedure and findings determine the estimate.'}] };
  if (combo.serviceSlug === 'engine-diagnostics') return { ...combo, ...shared,
    h1:'Lamborghini Engine Diagnostics Dubai', metaTitle:'Lamborghini Engine Diagnostics Dubai | DIGI-TEC', metaDescription:'Lamborghini warning-light and drivability diagnostics in Al Quoz, Dubai. Compatible data and physical testing are matched to the exact vehicle.',
    heroCopy:'Warning lights, misfires, reduced performance, starting concerns and intermittent faults require more than a code read. DIGI-TEC confirms compatible diagnostic access for the exact vehicle and combines available data with appropriate electrical or mechanical testing before recommending parts.',
    symptoms:['Engine or powertrain warning displayed','Misfire, rough running or hesitation','Reduced performance or unusual drivability','Starting or intermittent electrical concern'],
    processSteps:[{title:'Record the exact concern',description:'Review warning text, operating conditions, history and recent work.'},{title:'Confirm diagnostic access',description:'Collect supported fault and live data for the relevant modules.'},{title:'Test the affected system',description:'Use suitable physical tests instead of treating a code as a parts diagnosis.'},{title:'Explain the result',description:'Separate confirmed faults from further testing and quote the supported work.'}],
    faqs:[{question:'Can a code identify the failed part?',answer:'Not by itself. A code indicates a condition or affected system; physical and electrical testing may still be needed.'},{question:'Do you offer proprietary Lamborghini programming?',answer:'Programming is not assumed. Software, security access and workshop capability must be confirmed for the exact vehicle.'},{question:'Can you diagnose engine and gearbox warnings?',answer:'The initial concern can be assessed, with supported module access and test scope confirmed before booking.'},{question:'What should I send first?',answer:'Send the model, year, mileage, exact warning, symptoms and when they occur.'}] };
  if (combo.serviceSlug === 'mechanical-repair') return { ...combo, ...shared,
    h1:'Lamborghini Engine & Mechanical Repair Dubai', metaTitle:'Lamborghini Engine Repair Dubai | DIGI-TEC', metaDescription:'Lamborghini engine, cooling and mechanical assessment in Al Quoz, Dubai. Repair scope follows vehicle identification and diagnostic findings.',
    heroCopy:'DIGI-TEC assesses oil leaks, coolant loss, overheating, unusual engine noise and drivability concerns. The exact V8, V10, V12 or hybrid platform, symptoms and findings determine the next step. Internal engine, hybrid high-voltage and carbon-structure work are not assumed.',
    symptoms:['Coolant loss, temperature warning or overheating','Oil leak, smell or visible fluid','Unusual engine noise, vibration or reduced performance','Mechanical concern found during maintenance'],
    processSteps:[{title:'Document the concern',description:'Confirm the model, history, warning and operating conditions.'},{title:'Inspect and test',description:'Combine compatible diagnostics with leak, cooling or mechanical tests appropriate to the symptom.'},{title:'Confirm capability and parts',description:'Define supported repair work and any required specialist route before approval.'},{title:'Verify agreed work',description:'Complete the approved scope and appropriate post-repair checks.'}],
    faqs:[{question:'Can you assess overheating or coolant loss?',answer:'The concern can be assessed, but repair scope depends on the source and exact vehicle.'},{question:'Do you repair Lamborghini hybrid high-voltage systems?',answer:'High-voltage repair is not advertised by this page and requires explicit capability confirmation.'},{question:'Do you repair carbon structures?',answer:'Carbon-structure repair is not promised here. Damage requires separate assessment and an appropriate repair route.'},{question:'How is cost estimated?',answer:'Cost follows identification, testing, parts availability and the supported repair scope.'}] };
  if (combo.serviceSlug === 'suspension-repair') return { ...combo, ...shared,
    h1:'Lamborghini Suspension Assessment Dubai', metaTitle:'Lamborghini Suspension Repair Dubai | DIGI-TEC', metaDescription:'Lamborghini suspension, ride-height and front-lift assessment in Al Quoz. Urus air suspension and supercar lift systems are identified separately.',
    heroCopy:'Lamborghini suspension systems vary by model and variant. Urus S uses adaptive air suspension, while a supercar front-axle lift is a different system. DIGI-TEC identifies the fitted arrangement and assesses warnings, uneven height, leaks, noise or handling concerns before confirming supported hydraulic, mechanical or calibration work.',
    symptoms:['Suspension or ride-height warning','Vehicle sits unevenly or changes height slowly','Front-lift concern, leak or unusual noise','Handling, damper or ride-quality change'],
    processSteps:[{title:'Identify the fitted system',description:'Confirm model, variant, options and the exact symptom.'},{title:'Inspect the concern',description:'Check visible condition and supported fault or pressure information as applicable.'},{title:'Confirm repair capability',description:'Define supported hydraulic, mechanical, parts and calibration scope.'},{title:'Quote and verify',description:'Explain the proposed work and suitable post-repair checks before approval.'}],
    faqs:[{question:'Is Urus air suspension the same as front lift?',answer:'No. Urus S adaptive air suspension and a supercar front-axle lift are distinct systems.'},{question:'Do all Urus variants use the same suspension?',answer:'No assumption is made. The exact variant and fitted equipment are identified first.'},{question:'Can every hydraulic repair be accepted?',answer:'No. Hydraulic procedures, tooling, parts and supported calibration must be confirmed for the vehicle.'},{question:'Can suspension symptoms have electrical causes?',answer:'Yes, but electrical, hydraulic and mechanical evidence must be tested before parts are proposed.'}] };
  if (combo.serviceSlug === 'oil-change') return { ...combo, ...shared,
    h1:'Lamborghini Oil Change & Maintenance Dubai', metaTitle:'Lamborghini Oil Change & Maintenance Dubai | DIGI-TEC', metaDescription:'Lamborghini oil service and maintenance assessment in Al Quoz, Dubai. Oil, filters and due items are matched to the exact model and year.',
    heroCopy:'Oil and maintenance requirements vary by model, engine, year and market. DIGI-TEC reviews the exact vehicle, service information, mileage, history and use before confirming oil, filters, seals, inspection items and any supported reset. No universal grade, interval or major/minor package is promised.',
    symptoms:['Service or maintenance reminder due','Unknown or incomplete service history','Oil-level warning or evidence of a leak','Stored or recently purchased vehicle returning to use'],
    processSteps:[{title:'Review model and history',description:'Confirm year, mileage, previous service and use.'},{title:'Verify service information',description:'Identify the applicable oil, filters, fluids and due inspection items.'},{title:'Inspect before adding work',description:'Explain leaks, levels or other findings separately.'},{title:'Complete the approved scope',description:'Carry out the agreed service and supported reset, then record the work.'}],
    faqs:[{question:'Which oil does my Lamborghini need?',answer:'The correct approval and viscosity depend on the exact model, engine, year and market.'},{question:'How often should it be serviced?',answer:'Follow manufacturer information for the exact model and year, then consider history, storage, mileage and use.'},{question:'Do you sell universal major or minor packages?',answer:'The due items are confirmed for the vehicle rather than applying one invented package to every Lamborghini.'},{question:'What affects oil-service cost?',answer:'Oil quantity and specification, filters, seals and due inspection items determine the estimate.'}] };
  if (combo.serviceSlug === 'brake-repair') return { ...combo, ...shared,
    h1:'Lamborghini Brake Inspection & Repair Dubai', metaTitle:'Lamborghini Brake Repair Dubai | DIGI-TEC', metaDescription:'Lamborghini brake inspection in Al Quoz, Dubai for warnings, vibration, pads, discs and fluid. Fitted steel or carbon-ceramic systems are confirmed first.',
    heroCopy:'Brake specification varies by model and option. DIGI-TEC inspects warnings, vibration, pads, discs, sensors, calipers, fluid and tyre condition, then confirms the appropriate measurement, parts and supported repair procedure. Carbon-ceramic resurfacing is not promised.',
    symptoms:['Brake warning or wear message','Vibration, noise or change in pedal feel','Pad, disc or fluid service concern','Carbon-ceramic condition or measurement enquiry'],
    processSteps:[{title:'Confirm the fitted brakes',description:'Identify model, option and complaint.'},{title:'Inspect and measure',description:'Check applicable friction, hydraulic and electronic components.'},{title:'Define parts and procedure',description:'Confirm availability and supported work for steel or carbon-ceramic equipment.'},{title:'Estimate before repair',description:'Explain findings and approved scope before work starts.'}],
    faqs:[{question:'Do all Lamborghinis have the same brakes?',answer:'No. The exact steel or carbon-ceramic system and options must be identified.'},{question:'Do you resurface carbon-ceramic discs?',answer:'Carbon-ceramic resurfacing is not advertised. Inspection and available replacement scope are confirmed first.'},{question:'Can vibration prove a warped disc?',answer:'No. Disc, pad, hub, tyre, suspension and installation factors may need inspection.'},{question:'What affects brake-service cost?',answer:'The fitted system, measurements, parts, fluid, labour and findings determine the estimate.'}] };
  if (combo.serviceSlug === 'ac-repair' || combo.serviceSlug === 'electrical-repair') return { ...combo, ...shared,
    heroCopy:`DIGI-TEC assesses Lamborghini ${combo.serviceSlug === 'ac-repair' ? 'weak cooling, leaks, airflow and compressor concerns' : 'voltage, charging, wiring, sensor and module-communication concerns'}. The exact vehicle, fitted system and test findings determine the supported repair scope. Refrigerant, programming and special functions are never assumed from the badge alone.` };
  return { ...combo, ...shared };
};

const BrandServicePage: React.FC<BrandServicePageProps> = ({
  brandSlugOverride,
  serviceSlugOverride,
  canonicalPath,
}) => {
  const { isArabic, localizedPath } = useLocale();
  const { brandSlug: routeBrandSlug, serviceSlug: routeServiceSlug } = useParams<{ brandSlug: string; serviceSlug: string }>();
  const brandSlug = brandSlugOverride ?? routeBrandSlug;
  const serviceSlug = serviceSlugOverride ?? routeServiceSlug;
  const sourceCombo = brandSlug && serviceSlug ? getBrandServiceCombo(brandSlug, serviceSlug) : undefined;
  const localizedCombo = sourceCombo && isArabic ? (() => {
    const serviceName = serviceNamesArabic[sourceCombo.serviceSlug] ?? 'خدمة السيارات';
    const standardFaqs = [
      { question: `متى تحتاج سيارة ${sourceCombo.brandName} إلى ${serviceName}؟`, answer: 'عند ظهور تحذير أو صوت أو تغير في الأداء، أو وفق موعد الصيانة الموصى به للطراز والاستخدام.' },
      { question: 'هل يتم الفحص قبل الإصلاح؟', answer: 'نعم. نبدأ بالتشخيص ثم نوضح النتيجة وخيارات الإصلاح والتكلفة قبل بدء العمل.' },
      { question: 'هل تستخدمون قطعاً أصلية؟', answer: 'نوفر قطع OEM أصلية أو بدائل موثوقة مطابقة للمواصفات، ونوضح الخيارات قبل التركيب.' },
      { question: 'كيف أحجز موعداً؟', answer: 'اتصل بنا أو أرسل رسالة واتساب مع تفاصيل السيارة والخدمة المطلوبة.' },
    ];
    const steps = [
      { title: 'الفحص الأولي', description: 'مراجعة الأعراض وسجل السيارة وإجراء فحص بصري ومنظم.' },
      { title: 'التشخيص المتقدم', description: 'قراءة الأعطال والبيانات الحية واختبار المكونات المرتبطة.' },
      { title: 'الإصلاح والمعايرة', description: 'تنفيذ العمل المتفق عليه باستخدام قطع وإجراءات مناسبة للسيارة.' },
      { title: 'الفحص النهائي', description: 'اختبار النظام والسيارة وتوثيق النتيجة والتوصيات.' },
    ];
    const symptoms = ['ظهور رسالة أو ضوء تحذير', 'تغير ملحوظ في أداء السيارة', 'صوت أو اهتزاز غير معتاد', 'تأخر موعد الصيانة أو تكرار المشكلة'];
    return {
      ...sourceCombo,
      serviceName,
      serviceType: serviceName,
      h1: `${serviceName} ${sourceCombo.brandName} في دبي`,
      metaTitle: `${serviceName} ${sourceCombo.brandName} في دبي | ديجي-تك`,
      metaDescription: `${serviceName} متخصص لسيارات ${sourceCombo.brandName} في دبي مع تشخيص متقدم وقطع مناسبة وتسعير واضح لدى مركز ديجي-تك.`,
      heroCopy: `يقدم مركز ديجي-تك خدمة ${serviceName} المتخصصة لسيارات ${sourceCombo.brandName} في دبي، بدءاً من التشخيص الدقيق وحتى الإصلاح والمعايرة والاختبار النهائي.`,
      symptoms: sourceCombo.symptoms.map((_, index) => symptoms[index % symptoms.length]),
      processSteps: sourceCombo.processSteps.map((_, index) => steps[index % steps.length]),
      partsCopy: `نستخدم قطع OEM أصلية أو بدائل موثوقة مطابقة لمواصفات ${sourceCombo.brandName}، مع توثيق القطع والأعمال بوضوح.`,
      faqs: sourceCombo.faqs.map((_, index) => standardFaqs[index % standardFaqs.length]),
      whatsAppMessage: `مرحباً ديجي-تك، أريد حجز ${serviceName} لسيارة ${sourceCombo.brandName}.`,
    };
  })() : sourceCombo;
  const combo = localizedCombo && !isArabic && localizedCombo.brandSlug === 'mclaren-service-dubai'
    ? mcLarenServiceOverride(localizedCombo)
    : localizedCombo && !isArabic && localizedCombo.brandSlug === 'lamborghini-service-dubai'
      ? lamborghiniServiceOverride(localizedCombo)
      : localizedCombo && !isArabic && localizedCombo.brandSlug === 'rolls-royce-service-dubai'
        ? rollsRoyceServiceOverride(localizedCombo)
      : localizedCombo;
  const brand = brandSlug ? getBrandBySlug(brandSlug) : undefined;
  const profile = brandSlug ? BRAND_PROFILES[brandSlug] : undefined;

  const url = combo
    ? canonicalPath ? `${SITE_URL}${canonicalPath}` : `${SITE_URL}${isArabic ? '/ar' : ''}/brands/${combo.brandSlug}/${combo.serviceSlug}`
    : SITE_URL;

  const jsonLd = React.useMemo(() => {
    if (!combo || !brand || !profile) return undefined;
    const schemaDescription = isArabic
      ? `${combo.serviceName} لسيارات ${combo.brandName} لدى ورشة ديجي-تك في القوز، دبي. تواصل لترتيب الفحص أو الخدمة المناسبة.`
      : `${combo.serviceName} for ${combo.brandName} vehicles at Digi-Tec Performance Center in Al Quoz, Dubai. Contact the workshop to arrange the appropriate inspection or service.`;
    const breadcrumb = buildBreadcrumb(url, [
      { name: isArabic ? 'الرئيسية' : 'Home', url: `${SITE_URL}${isArabic ? '/ar' : '/'}` },
      { name: isArabic ? 'العلامات' : 'Brands', url: `${SITE_URL}${isArabic ? '/ar' : ''}/brands` },
      { name: combo.brandName, url: `${SITE_URL}${isArabic ? '/ar' : ''}/brands/${combo.brandSlug}` },
      { name: combo.serviceName, url },
    ]);
    const webPage = buildWebPage({
      url,
      name: combo.h1,
      description: schemaDescription,
      breadcrumbId: `${url}#breadcrumb`,
      primaryImage: brand.logo || undefined,
      mainEntityId: `${url}#service`,
    });
    const brandEntity = buildBrand({
      name: combo.brandName,
      logo: brand.logo || undefined,
    });
    const service = buildService({
      url,
      name: combo.h1,
      serviceType: `${combo.brandName} ${combo.serviceType}`,
      description: schemaDescription,
      brand: combo.brandName,
      areaServed: [isArabic ? 'دبي' : 'Dubai'],
    });
    const faq = buildFAQ(url, combo.faqs);
    return pageGraph([webPage, breadcrumb, brandEntity, service, ...(faq ? [faq] : [])]);
  }, [combo, brand, isArabic, profile, url]);

  useSeo({
    title: combo ? combo.metaTitle : isArabic ? 'خدمة السيارات | مركز ديجي-تك' : 'Brand Service | Digi-Tec Performance Centre',
    description: combo ? combo.metaDescription : isArabic ? 'خدمة متخصصة للسيارات في دبي لدى مركز ديجي-تك.' : 'Specialist brand service in Dubai at Digi-Tec Performance Centre.',
    canonical: combo ? url : `${SITE_URL}/services`,
    noindex: !combo || !brand || !profile,
    jsonLd,
  });

  if (!combo || !brand) {
    return <Navigate to={localizedPath('/services')} replace />;
  }

  const whatsappHref = `https://wa.me/97143402223?text=${encodeURIComponent(combo.whatsAppMessage)}`;
  const otherServices = getServicesForBrand(combo.brandSlug).filter((s) => s.serviceSlug !== combo.serviceSlug);
  const relatedMercedesContent = combo.brandSlug === 'mercedes-benz-service-dubai'
    ? MERCEDES_RELATED_CONTENT[combo.serviceSlug] ?? []
    : [];
  const relatedPorscheContent = combo.brandSlug === 'porsche-service-dubai'
    ? PORSCHE_RELATED_CONTENT[combo.serviceSlug] ?? [
        { label: 'Browse the Porsche Knowledge Centre', path: '/brands/porsche-service-dubai#porsche-knowledge-centre' },
        { label: 'Porsche 911 model guide', path: '/blog/porsche-911-service-dubai-guide' },
        { label: 'Porsche Macan model guide', path: '/porsche/macan' },
      ]
    : [];
  const relatedBmwContent = combo.brandSlug === 'bmw-service-dubai'
    ? [
        { label: 'BMW X5 service guide', path: '/brands/bmw-service-dubai/x5' },
        { label: combo.serviceSlug === 'transmission-repair' ? 'BMW M5 drivetrain guide' : 'BMW 3 Series service guide', path: combo.serviceSlug === 'transmission-repair' ? '/brands/bmw-service-dubai/m5' : '/brands/bmw-service-dubai/3-series' },
        { label: combo.serviceSlug === 'suspension-repair' ? 'BMW X6 chassis guide' : 'BMW M3 service guide', path: combo.serviceSlug === 'suspension-repair' ? '/brands/bmw-service-dubai/x6' : '/brands/bmw-service-dubai/m3' },
      ]
    : [];
  const relatedFerrariContent = combo.brandSlug === 'ferrari-service-dubai'
    ? FERRARI_RELATED_CONTENT[combo.serviceSlug] ?? [
        { label: 'Ferrari 296 model guide', path: '/brands/ferrari-service-dubai/296' },
        { label: 'Ferrari Purosangue model guide', path: '/brands/ferrari-service-dubai/purosangue' },
        { label: 'Ferrari maintenance guide for Dubai', path: FERRARI_MAINTENANCE_GUIDE_PATH },
      ]
    : [];
  const relatedRollsRoyceContent = combo.brandSlug === 'rolls-royce-service-dubai'
    ? [
        { label: 'Rolls-Royce service and repair hub', path: '/brands/rolls-royce-service-dubai' },
        { label: 'Rolls-Royce Ghost service guide', path: '/blog/rolls-royce-ghost-service-dubai-guide' },
        { label: 'How to compare Rolls-Royce workshops', path: '/blog/rolls-royce-best-workshop-dubai' },
      ]
    : [];
  const relatedAuthorityContent = relatedMercedesContent.length > 0
    ? relatedMercedesContent
    : relatedPorscheContent.length > 0
      ? relatedPorscheContent
      : relatedBmwContent.length > 0 ? relatedBmwContent
        : relatedFerrariContent.length > 0 ? relatedFerrariContent : relatedRollsRoyceContent;

  return (
    <div className="site-page min-h-screen bg-black text-off-white">
      <Header />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 text-xs sm:text-sm text-gray-400">
        <ol className="flex flex-wrap items-center gap-2">
          <li><Link to="/" className="hover:text-burnt-orange">{isArabic ? 'الرئيسية' : 'Home'}</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link to="/brands" className="hover:text-burnt-orange">{isArabic ? 'العلامات' : 'Brands'}</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link to={`/brands/${combo.brandSlug}`} className="hover:text-burnt-orange">{combo.brandName}</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-off-white font-semibold">{combo.serviceName}</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/[0.08] bg-[#101113]">
        <div className="relative z-10 mx-auto max-w-[90rem] px-5 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
          <div className="max-w-4xl">
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-14 w-20 items-center justify-center overflow-hidden bg-white/[0.94] p-2 sm:h-16 sm:w-24">
                {brand.logo ? (
                  <img src={brand.logo} alt={`${combo.brandName} logo`} className="w-full h-full object-contain" />
                ) : (
                  <span className="text-2xl font-semibold text-burnt-orange">{combo.brandName.charAt(0)}</span>
                )}
              </div>
              <span className="home-kicker">
                {isArabic ? `متخصصون في ${combo.brandName}` : `${combo.brandName} Specialists`}
              </span>
            </div>
            <h1 className="mb-5 max-w-4xl text-[clamp(2.65rem,5vw,5.1rem)] font-semibold leading-[0.98] tracking-[-0.05em]">
            {isArabic ? <><span className="text-white/62">{combo.serviceName}</span> {combo.brandName} في دبي</> : combo.brandSlug === 'rox-service-dubai' && combo.serviceSlug === 'soft-close-door-installation' ? <>ROX 01 <span className="text-white/62">Soft Close Installation Dubai</span></> : combo.brandSlug === 'mclaren-service-dubai' || combo.brandSlug === 'lamborghini-service-dubai' || combo.brandSlug === 'rolls-royce-service-dubai' ? <>{combo.h1}</> : <>{combo.brandName} <span className="text-white/62">{combo.serviceName}</span> Dubai</>}
            </h1>
            <p className="mb-8 max-w-2xl text-base leading-8 text-white/58 sm:text-lg">
              {combo.heroCopy}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <MessageCircle className="w-5 h-5" />
                {isArabic ? 'راسلنا عبر واتساب' : 'WhatsApp Us'}
              </a>
              <a href="tel:+97143402223" className="btn-secondary">
                <Phone className="w-5 h-5" />
                {isArabic ? 'اتصل على +971 4 340 2223' : 'Call +971 4 340 2223'}
              </a>
            </div>
            <CtaAssurance className="mt-4" align="start" text={isArabic ? 'تواصل معنا لمناقشة السيارة وطلب موعد' : undefined} />
          </div>
        </div>
      </section>

      {/* Symptoms */}
      <section className="py-12 sm:py-16 bg-black border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-4xl font-black mb-6 sm:mb-8">
            {isArabic ? <>متى تحجز <span className="text-burnt-orange">{combo.serviceName} {combo.brandName}</span>؟</> : <>When to Book <span className="text-burnt-orange">{combo.brandName} {combo.serviceName}</span></>}
          </h2>
          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
            {combo.symptoms.map((s, i) => (
              <div key={i} className="card-premium flex items-start gap-3 rounded-2xl p-4 sm:p-5">
                <CheckCircle2 className="w-5 h-5 text-burnt-orange flex-shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm sm:text-base leading-relaxed">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Models */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-charcoal/40 to-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-4xl font-black mb-3">
            {isArabic ? <>طرازات {combo.brandName} التي نوفر لها <span className="text-burnt-orange">{combo.serviceName}</span></> : combo.brandSlug === 'mclaren-service-dubai' ? <>McLaren models for <span className="text-burnt-orange">{combo.serviceName}</span></> : combo.brandSlug === 'lamborghini-service-dubai' ? <>Models covered by this <span className="text-burnt-orange">Lamborghini service</span></> : combo.brandSlug === 'rolls-royce-service-dubai' ? <>Rolls-Royce models for <span className="text-burnt-orange">{combo.serviceName}</span></> : <>{combo.brandName} Models We <span className="text-burnt-orange">{combo.serviceName}</span></>}
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mb-6 sm:mb-8">
            {isArabic ? `يتم تأكيد نطاق الخدمة حسب طراز ${combo.brandName} والنظام المركب قبل الحجز.` : `Workshop scope, compatible functions and parts are confirmed for the exact ${combo.brandName} model before booking.`}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {combo.models.map((m) => (
              <div key={m} className="card-premium rounded-2xl p-3 sm:p-4 text-center">
                <span className="text-off-white text-xs sm:text-sm font-semibold">{m}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-12 sm:py-16 bg-black border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-4xl font-black mb-6 sm:mb-10">
            {isArabic ? <>خطوات <span className="text-burnt-orange">{combo.serviceName}</span></> : <>Our <span className="text-burnt-orange">{combo.serviceName}</span> Process</>}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {combo.processSteps.map((step, i) => (
              <div key={i} className="card-premium rounded-2xl p-5 sm:p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-burnt-orange text-black font-black flex items-center justify-center text-sm">{i + 1}</span>
                  <h3 className="text-base sm:text-lg font-bold text-off-white">{step.title}</h3>
                </div>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed pl-11">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Parts */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-charcoal/40 to-black border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-start gap-4">
            <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10 text-burnt-orange flex-shrink-0" />
            <div>
              <h2 className="text-xl sm:text-3xl font-black mb-3">
                {isArabic ? <>خيارات قطع <span className="text-burnt-orange">{combo.brandName}</span> موثقة</> : <><span className="text-burnt-orange">{combo.brandName}</span> Parts Options, Documented</>}
              </h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{combo.partsCopy}</p>
            </div>
          </div>
        </div>
      </section>

      {relatedAuthorityContent.length > 0 && !isArabic && (
        <section className="border-t border-white/5 bg-charcoal/15 py-12 sm:py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <p className="eyebrow mb-4">Model and owner guides</p>
            <h2 className="text-2xl font-black sm:text-4xl">Understand the symptom before the repair</h2>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/55">These informational pages explain the warning or platform. This page remains the commercial destination for the confirmed service need.</p>
            <ul className="mt-7 grid gap-4 sm:grid-cols-3">
              {relatedAuthorityContent.map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="card-premium group flex h-full items-center justify-between gap-3 rounded-xl p-4 text-sm font-semibold text-white/70 hover:text-burnt-orange">
                    <span>{item.label}</span><ArrowRight className="h-4 w-4 shrink-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="py-12 sm:py-16 bg-black border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-4xl font-black text-center mb-8 sm:mb-10">
            {combo.brandName} {combo.serviceName} <span className="text-burnt-orange">{isArabic ? 'الأسئلة الشائعة' : 'FAQs'}</span>
          </h2>
          <Accordion type="single" collapsible className="space-y-3">
            {combo.faqs.map((f, i) => (
              <AccordionItem key={i} value={`q-${i}`} className="bg-white/[0.03] border border-white/10 rounded-2xl px-5 sm:px-6 data-[state=open]:border-burnt-orange/40">
                <AccordionTrigger className="text-left text-off-white font-semibold text-base sm:text-lg hover:no-underline py-5">
                  {f.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 text-sm sm:text-base leading-relaxed pb-5">
                  {f.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Cross-links: other services for this brand */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-charcoal/40 to-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <Wrench className="w-6 h-6 sm:w-8 sm:h-8 text-burnt-orange" />
            <h2 className="text-2xl sm:text-4xl font-black">
              {isArabic ? <>المزيد من خدمات <span className="text-burnt-orange">{combo.brandName}</span></> : <>More <span className="text-burnt-orange">{combo.brandName}</span> Services</>}
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {otherServices.map((s) => (
              <Link
                key={s.serviceSlug}
                to={combo.brandSlug === 'mercedes-benz-service-dubai'
                  ? MERCEDES_SERVICE_PATHS[s.serviceSlug] ?? `/brands/${combo.brandSlug}/${s.serviceSlug}`
                  : `/brands/${combo.brandSlug}/${s.serviceSlug}`}
                className="card-premium group flex flex-col justify-between rounded-2xl p-4 sm:p-5 transition-all duration-300"
              >
                <span className="text-off-white font-bold text-sm sm:text-base leading-tight group-hover:text-burnt-orange">
                  {combo.brandName} {isArabic ? serviceNamesArabic[s.serviceSlug] ?? s.label : s.label}
                </span>
                <ArrowRight className={`w-4 h-4 text-burnt-orange mt-3 ${isArabic ? 'rotate-180' : ''}`} />
              </Link>
            ))}
            <Link
              to={`/brands/${combo.brandSlug}`}
              className="group flex flex-col justify-between bg-burnt-orange/10 border border-burnt-orange/30 hover:bg-burnt-orange/20 rounded-2xl p-4 sm:p-5 transition-all duration-300"
            >
              <span className="text-off-white font-bold text-sm sm:text-base leading-tight">
                {isArabic ? `جميع خدمات ${combo.brandName}` : `All ${combo.brandName} Services`}
              </span>
              <ArrowRight className={`w-4 h-4 text-burnt-orange mt-3 ${isArabic ? 'rotate-180' : ''}`} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BrandServicePage;
