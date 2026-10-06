import { tuningCars, type TuningCar } from '@/data/tuningCars';

export interface TuningModelPageDefinition {
  slug: string;
  path: string;
  name: string;
  shortName: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  carIds: string[];
  image: string;
  engine: string;
  generation: string;
  intro: string;
  platformNotes: string[];
  packageHeading: string;
  packageExplanation: string[];
  brandHub: { label: string; path: string };
  relatedLinks: { label: string; path: string }[];
  faqs: { question: string; answer: string }[];
}

export const tuningModelPages: TuningModelPageDefinition[] = [
  {
    slug: 'mercedes-amg-gt',
    path: '/tuning/mercedes-amg-gt',
    name: 'Mercedes-AMG GT / GTS / GTC / GTR',
    shortName: 'AMG GT family',
    h1: 'Mercedes-AMG GT Performance Tuning Dubai',
    metaTitle: 'Mercedes AMG GT Tuning Dubai | Stages & Prices | Digi-Tec',
    metaDescription: 'Compare M178 AMG GT/GTS and GTC/GTR tuning in Dubai: Stage 1–5, VIN-dependent VIP builds, horsepower, torque, euro prices and workshop time.',
    carIds: ['amg-gt-gts', 'amg-gtc-gtr'],
    image: '/images/cars/amg-gt.png',
    engine: 'M178',
    generation: 'C190 / R190',
    intro: 'The M178 AMG GT range has two separate entries in the DIGI-TEC Performance Configurator: GT/GTS and GTC/GTR. Their starting outputs differ, so this page keeps both package sets together while showing each stock reference, tuned output and price separately. Stage 1 through Stage 5 and a custom VIP option are listed for each entry.',
    platformNotes: [
      'The GT/GTS reference is 522 HP and 670 Nm; GTC/GTR uses 557 HP and 700 Nm. Stage 1 lists 605 HP / 750 Nm for GT/GTS and 640 HP / 800 Nm for GTC/GTR. These are the configurator references for the selected packages, rather than a specification for every GT derivative.',
      'The source identifies the C190/R190 M178 platform. The AMG GT63 four-door has a separate M177 record and its own tuning page; the GT Black Series project article describes an individual build rather than another selectable GT/GTS package.',
    ],
    packageHeading: 'M178 software, turbo and double-clutch packages',
    packageExplanation: [
      'Stage 2 adds a sport-catalyst downpipe, downpipe heat coating and transmission software optimization. Stage 3 adds the listed GAD turbocharger, Pulse Flow exhaust manifold, increased-flow high-pressure fuel system and double-clutch reinforcement. Later stages have their own turbocharger and engine-component lists, shown below in full.',
      'GT/GTS and GTC/GTR share listed euro package prices while their power and torque figures differ. Compare the exact configuration before choosing work. VIP is priced on request and includes bespoke calibration and dyno testing in the source package; VIN availability is explicitly requested for these two VIP entries.',
    ],
    brandHub: { label: 'Mercedes-Benz service and repair', path: '/brands/mercedes-benz-service-dubai' },
    relatedLinks: [
      { label: 'AMG GT tuning and hardware planning guide', path: '/blog/mercedes-amg-gt-tuning-dubai' },
      { label: 'AMG GT Black Series individual build', path: '/blog/mercedes-amg-gt-black-series-1300hp-build-dubai' },
      { label: 'AMG GT63 four-door tuning packages', path: '/tuning/mercedes-amg-gt63' },
    ],
    faqs: [
      { question: 'Are GT/GTS and GTC/GTR tuning figures the same?', answer: 'No. Both are M178 entries with Stage 1–5 and VIP options, but their stock and several tuned outputs differ. Stage 1 is listed at 605 HP / 750 Nm for GT/GTS and 640 HP / 800 Nm for GTC/GTR. Choose the correct configurator entry and confirm the VIN.' },
      { question: 'What does AMG GT Stage 1 cost?', answer: 'Both GT/GTS and GTC/GTR Stage 1 entries list €2,721 and 1–2 days, including an airfilter, engine software optimization and V-Max speed-limiter deactivation. The vehicle and agreed scope must be confirmed before work.' },
      { question: 'Is gearbox software included in every AMG GT stage?', answer: 'The listed GT/GTS and GTC/GTR Stage 2 packages include transmission software optimization. Stage 3–5 lists also name TCU software and double-clutch reinforcement. The Stage 1 list does not name TCU work, and the VIP scope is individual.' },
    ],
  },
  {
    slug: 'mercedes-amg-e63',
    path: '/tuning/mercedes-amg-e63',
    name: 'Mercedes-AMG E63',
    shortName: 'E63 AMG',
    h1: 'Mercedes-AMG E63 Performance Tuning Dubai',
    metaTitle: 'Mercedes E63 Tuning Dubai | M177 Stages & Prices | Digi-Tec',
    metaDescription: 'Explore W213 E63 M177 tuning in Dubai: Stage 1–4 and custom VIP packages, stock vs tuned output, CPC/TCU scope, euro prices and installation time.',
    carIds: ['e63'],
    image: '/images/cars/e63.png',
    engine: 'M177',
    generation: 'W213',
    intro: 'The W213 E63 M177 entry starts from a configurator reference of 612 HP and 850 Nm. Its Stage 1 package lists 780 HP and 1,000 Nm with engine software, an airfilter, V-Max deactivation and central powertrain controller software. More extensive Stage 2–4 packages and an individually scoped VIP build are available in the same record.',
    platformNotes: [
      'This page covers the W213 M177 package set identified by the configurator. An E63 badge alone does not establish the engine, existing calibration or compatible control-unit software; send the VIN and year so the team can match the actual vehicle to this record.',
      'CPC software is explicitly listed in Stage 1 and Stage 2. The Stage 3 and Stage 4 lists add TCU software and NAG 3 transmission reinforcement alongside their different turbocharger specifications. These entries explain why engine output and drivetrain scope should be compared together.',
    ],
    packageHeading: 'E63 CPC calibration and NAG 3 supporting work',
    packageExplanation: [
      'Stage 2 lists a sport-catalyst downpipe and special ceramic heat coating. Stage 3 specifies the GAD 177 55/68 upgrade turbocharger; Stage 4 specifies the GAD 177 60/76R turbocharger and increased-flow high-pressure fuel system. Each package has a separate total price and installation estimate.',
      'The E63 VIP record is a custom build priced on request, with bespoke ECU calibration and dyno testing. Its listed output is a configurator project reference and requires an individual vehicle and hardware proposal.',
    ],
    brandHub: { label: 'Mercedes-Benz service and repair', path: '/brands/mercedes-benz-service-dubai' },
    relatedLinks: [{ label: 'E63 maintenance and repair by generation', path: '/mercedes/models/e63-service-repair-dubai' }],
    faqs: [
      { question: 'What is the listed E63 Stage 1 output and price?', answer: 'The W213 M177 E63 record lists 780 HP and 1,000 Nm, compared with its stock reference of 612 HP and 850 Nm. Stage 1 is €5,663 with an estimate of 1–2 days. Match the vehicle and software before agreeing the project.' },
      { question: 'Which E63 packages include TCU work?', answer: 'Stage 3 and Stage 4 explicitly list TCU software and Stage 1 NAG 3 automatic-transmission reinforcement, described at approximately 1,150 Nm. Stage 1 and Stage 2 list CPC software but do not name TCU work.' },
      { question: 'Does the E63 configurator offer Stage 5?', answer: 'No. This E63 record offers Stock, Stage 1, Stage 2, Stage 3, Stage 4 and VIP. A Stage 5 package is not advertised for this vehicle.' },
    ],
  },
  {
    slug: 'mercedes-amg-g63',
    path: '/tuning/mercedes-amg-g63',
    name: 'Mercedes-AMG G63',
    shortName: 'G63 AMG',
    h1: 'Mercedes-AMG G63 Performance Tuning Dubai',
    metaTitle: 'Mercedes G63 Tuning Dubai | M177 Stages & Prices | Digi-Tec',
    metaDescription: 'Compare G63 AMG M177 Stage 1–4 and custom VIP tuning in Dubai, including horsepower, torque, CPC/TCU work, euro package prices and workshop time.',
    carIds: ['g63'],
    image: '/images/cars/g63.png',
    engine: 'M177',
    generation: 'W463',
    intro: 'The G63 AMG M177 package set uses a stock reference of 585 HP and 850 Nm. Stage 1 lists 780 HP and 1,000 Nm, while Stage 2–4 add their specified exhaust, turbo and drivetrain work. This G63 page brings the individual package prices and time estimates together so owners can compare the actual scope of each option.',
    platformNotes: [
      'The configurator source identifies W463 and M177. Confirm the exact G63 year, engine, ECU/CPC software and existing modifications before applying these package references to your vehicle; this record does not define tuning support for every G-Class engine.',
      'The G63 Stage 2 package lists exhaust-system optimization as well as a downpipe and ceramic heat coating. That additional scope distinguishes its total price from other M177 vehicles that share some of the same power figures.',
    ],
    packageHeading: 'G63 exhaust scope, CPC software and transmission reinforcement',
    packageExplanation: [
      'Stage 3 adds the GAD 177 55/68 turbocharger, TCU software and NAG 3 reinforcement. Stage 4 instead specifies the GAD 177 60/76R turbocharger and an increased-flow high-pressure fuel system. The full included-work lists below preserve these differences.',
      'VIP is an individual custom-build option with a listed reference of 1,100 HP and 1,350 Nm, bespoke ECU calibration and dyno testing. Its price is on request and its workshop estimate is 6–10 weeks. A final scope requires the specific vehicle and supporting work to be agreed.',
    ],
    brandHub: { label: 'Mercedes-Benz service and repair', path: '/brands/mercedes-benz-service-dubai' },
    relatedLinks: [
      { label: 'G63 service and repair planning', path: '/blog/mercedes-g63-service-dubai-guide' },
      { label: 'G-Class maintenance and repair', path: '/mercedes/models/g-class-service-repair-dubai' },
    ],
    faqs: [
      { question: 'What does G63 Stage 1 tuning cost?', answer: 'The G63 M177 Stage 1 entry lists €5,663 and 1–2 days. Its included work is an airfilter, engine software optimization, V-Max speed-limiter deactivation and CPC software. The listed output is 780 HP and 1,000 Nm.' },
      { question: 'What changes between G63 Stage 1 and Stage 2?', answer: 'Stage 2 lists 820 HP and 1,050 Nm, with a €14,063 total price and 3–5 days. Its package adds a sport-catalyst downpipe, special ceramic heat coating and exhaust-system optimization to the software and airfilter scope.' },
      { question: 'Is G63 gearbox tuning a separate universal package?', answer: 'The source identifies TCU software and NAG 3 reinforcement within G63 Stage 3 and Stage 4 packages. Their availability does not establish a standalone gearbox package or TCU support for every G-Class vehicle.' },
    ],
  },
  {
    slug: 'mercedes-amg-gt63',
    path: '/tuning/mercedes-amg-gt63',
    name: 'Mercedes-AMG GT63 4-Door',
    shortName: 'AMG GT63 4-Door',
    h1: 'Mercedes-AMG GT63 Performance Tuning Dubai',
    metaTitle: 'AMG GT63 Tuning Dubai | 4-Door Stages & Prices | Digi-Tec',
    metaDescription: 'View X290 AMG GT63 4-Door M177 Stage 1–4 and custom VIP tuning packages in Dubai, with power, torque, euro prices, time and included CPC/TCU work.',
    carIds: ['gt63'],
    image: '/images/cars/gt63.png',
    engine: 'M177',
    generation: 'X290',
    intro: 'The AMG GT63 four-door has its own M177 configurator entry, separate from the two-door M178 AMG GT family. This record uses a stock reference of 630 HP and 900 Nm, with Stage 1–4 and a custom VIP option. Its price, control-unit software and supporting-hardware lists are shown for each configuration.',
    platformNotes: [
      'The source identifies X290 AMG GT 4-Door and M177. Confirm the VIN, year, original output and software version rather than selecting a two-door GT/GTS or GTC/GTR package from the model name alone.',
      'Stage 1 lists 780 HP and 1,000 Nm; Stage 4 lists 940 HP and 1,200 Nm. These are reference outputs tied to the configurations below. Existing vehicle condition, software, modifications and agreed project scope determine whether a listed package is suitable.',
    ],
    packageHeading: 'GT63 four-door control-unit and turbo packages',
    packageExplanation: [
      'The Stage 1 list includes CPC software with engine software optimization, an airfilter and V-Max deactivation. Stage 2 introduces its downpipe and ceramic heat coating. Stage 3–4 explicitly add TCU software and NAG 3 reinforcement with different GAD turbocharger specifications.',
      'The VIP entry is priced on request and lists a custom 1,000+ HP build, bespoke ECU calibration and dyno testing. It is an individual proposal, separate from the fixed euro totals for Stage 1–4.',
    ],
    brandHub: { label: 'Mercedes-Benz service and repair', path: '/brands/mercedes-benz-service-dubai' },
    relatedLinks: [{ label: 'M178 AMG GT two-door tuning packages', path: '/tuning/mercedes-amg-gt' }],
    faqs: [
      { question: 'Does the GT63 four-door use the same tuning record as the AMG GT?', answer: 'No. The GT63 4-Door record is identified as X290 with M177 and a 630 HP / 900 Nm stock reference. The separate GT/GTS and GTC/GTR records use M178 and different stock outputs.' },
      { question: 'What is the GT63 Stage 2 package price?', answer: 'The GT63 Stage 2 entry lists €12,563 total and 3–5 days, with an output of 820 HP and 1,050 Nm. Its included-work list names an airfilter, engine software, V-Max deactivation, a sport-catalyst downpipe, ceramic heat coating and CPC software.' },
      { question: 'Which GT63 stages list gearbox software?', answer: 'The Stage 3 and Stage 4 package lists name TCU software and NAG 3 automatic-transmission reinforcement. The Stage 1 and Stage 2 lists do not name TCU work. VIP software and hardware are agreed individually.' },
    ],
  },
  {
    slug: 'mercedes-amg-s65',
    path: '/tuning/mercedes-amg-s65',
    name: 'Mercedes-AMG S65',
    shortName: 'S65 AMG',
    h1: 'Mercedes-AMG S65 Performance Tuning Dubai',
    metaTitle: 'Mercedes S65 Tuning Dubai | M279 Stages & Prices | Digi-Tec',
    metaDescription: 'Compare W222/W217 S65 M279 Stage 1–5 tuning in Dubai: power, torque, euro package totals, PCM/TCU work, NAG2 reinforcement and installation time.',
    carIds: ['s65'],
    image: '/images/cars/s63.png',
    engine: 'M279',
    generation: 'W222 / W217',
    intro: 'The S65 AMG configurator record covers the M279 platform identified as W222/W217. Its 630 HP and 1,000 Nm stock reference progresses through five listed stages, with Stage 5 showing 900 HP and 1,400 Nm. PCM adjustment, TCU software and NAG2 reinforcement appear at specific stages, making drivetrain scope a central part of the comparison.',
    platformNotes: [
      'Match the M279 engine, body variant, control units and existing modifications to this record before discussing a package. The S65 M279 stages are distinct from the S63 M177 + Electric entry and do not establish tuning support for an unspecified S-Class.',
      'The NAG2 (7G-Tronic) reinforcement descriptions differ between the higher stages. Stage 3–4 identify Stage 1 reinforcement around 1,250 Nm, while Stage 5 lists Stage 2 reinforcement around 1,400 Nm. Those package descriptions should be confirmed with the proposed engine and torque scope.',
    ],
    packageHeading: 'M279 PCM, low-temperature circuit and NAG2 packages',
    packageExplanation: [
      'Stage 2 introduces a downpipe, PCM adjustment and TCU software. Stage 3 adds the GAD 279 60/76R turbocharger and transmission reinforcement. Stage 4 lists a GAD airfilter box and low-temperature-circuit optimization; Stage 5 also names a high-performance intercooler and its different transmission reinforcement.',
      'All five S65 tuning stages have stated euro prices and time estimates. The source contains no S65 VIP option, so the page compares only its actual Stage 1–5 configurations.',
    ],
    brandHub: { label: 'Mercedes-Benz service and repair', path: '/brands/mercedes-benz-service-dubai' },
    relatedLinks: [{ label: 'S-Class service and maintenance planning', path: '/blog/mercedes-s-class-service-dubai-guide' }],
    faqs: [
      { question: 'What is the S65 Stage 1 price and output?', answer: 'The S65 M279 Stage 1 entry lists €3,350, 1–2 days and 680 HP / 1,050 Nm. The stock reference is 630 HP / 1,000 Nm. Stage 1 includes an airfilter, engine software optimization and V-Max deactivation.' },
      { question: 'What is included in S65 Stage 5?', answer: 'The Stage 5 list includes a GAD airfilter box, engine software, V-Max deactivation, a downpipe, GAD 279 60/76R turbocharger, PCM adjustment, low-temperature-circuit optimization, a high-performance intercooler, TCU software and Stage 2 NAG2 reinforcement. It lists €72,468 total and 3–6 weeks.' },
      { question: 'Does S65 tuning include a VIP configuration?', answer: 'No VIP configuration is present in the S65 record. The available choices are Stock and Stage 1 through Stage 5, each with its own stated package data.' },
    ],
  },
  {
    slug: 'mercedes-amg-c63',
    path: '/tuning/mercedes-amg-c63',
    name: 'Mercedes-AMG C63 (W205)',
    shortName: 'C63 AMG W205',
    h1: 'Mercedes-AMG C63 Performance Tuning Dubai',
    metaTitle: 'Mercedes C63 Tuning Dubai | W205 Stages & Prices | Digi-Tec',
    metaDescription: 'Explore W205 C63 M177 Stage 1–5 and custom VIP tuning in Dubai, with horsepower, torque, euro prices, time, turbo components and MCT package scope.',
    carIds: ['c63-w205'],
    image: '/images/cars/c63.png',
    engine: 'M177',
    generation: 'W205',
    intro: 'This C63 tuning page is specifically for the W205 M177 record in the Performance Configurator. It starts from 476 HP and 650 Nm and offers Stage 1–5 plus a custom VIP option. The packages progress from the listed software and airfilter work to turbo, fuel-system, engine-component and MCT transmission work, with a separate total and time estimate for each stage.',
    platformNotes: [
      'The W205 scope matters: this record does not supply tuning figures for W204 or W206 C63 vehicles, nor for every C63 S calibration. Confirm the VIN, engine, original output and software before matching a vehicle to the listed reference.',
      'Stage 3 lists 700 HP and 900 Nm with MCT reinforcement around 1,100 Nm. Stage 5 lists 850 HP and 1,100 Nm, with Stage 2 MCT reinforcement and a wet clutch described around 1,350 Nm. These are different packages with different supporting components.',
    ],
    packageHeading: 'W205 turbo progression and MCT reinforcement',
    packageExplanation: [
      'The Stage 2 list adds a sport-catalyst downpipe and ceramic heat coating. Stage 3 specifies GAD 177 50/63 turbochargers. Stage 4 switches to open airboxes, the GAD 177 55/63 turbocharger, a Pulse Flow manifold and increased-flow high-pressure fuel system.',
      'Stage 5 names the GAD 177 55/68 turbocharger, forged pistons, cylinder-head bolts, an engine gasket set, oil and oil filter in addition to its other work. VIP is a custom build priced on request with bespoke ECU calibration and dyno testing; it should be discussed separately from the priced Stage 1–5 packages.',
    ],
    brandHub: { label: 'Mercedes-Benz service and repair', path: '/brands/mercedes-benz-service-dubai' },
    relatedLinks: [{ label: 'C63 service and repair by generation', path: '/mercedes/models/c63-service-repair-dubai' }],
    faqs: [
      { question: 'Which C63 generation do these tuning packages cover?', answer: 'The source entry is C63 AMG (W205) with M177 and a stock reference of 476 HP / 650 Nm. These package figures should not be applied automatically to W204, W206 or a different original-output variant.' },
      { question: 'What does W205 C63 Stage 1 cost?', answer: 'The C63 W205 Stage 1 entry lists €3,146 total, 1–2 days and 590 HP / 780 Nm. Included work is an airfilter, engine software optimization and V-Max speed-limiter deactivation.' },
      { question: 'Where is TCU work listed for the C63?', answer: 'Stage 3, Stage 4 and Stage 5 list TCU software with their specified MCT reinforcement. Stage 5 names Stage 2 reinforcement with a wet clutch; Stage 3–4 list Stage 1 reinforcement. The Stage 1–2 lists do not name TCU work.' },
    ],
  },
  {
    slug: 'mercedes-amg-glc63',
    path: '/tuning/mercedes-amg-glc63',
    name: 'Mercedes-AMG GLC63',
    shortName: 'GLC63 AMG',
    h1: 'Mercedes-AMG GLC63 Performance Tuning Dubai',
    metaTitle: 'Mercedes GLC63 Tuning Dubai | M177 Stages & Prices | Digi-Tec',
    metaDescription: 'Compare GLC63 AMG M177 Stage 1–5 tuning in Dubai, with stock vs tuned power, torque, euro price ranges, workshop time and transmission package work.',
    carIds: ['glc63'],
    image: '/images/cars/glc63.png',
    engine: 'M177',
    generation: 'W253 (configurator source identifier)',
    intro: 'The GLC63 AMG M177 record starts from 476 HP and 650 Nm and includes five priced tuning stages. Its higher-stage totals are published as euro ranges, so they are retained as ranges here. Compare the listed turbo, fuel-system and transmission work alongside power, torque and workshop time rather than treating one price as applicable to every GLC63.',
    platformNotes: [
      'The source uses the identifier W253 for this M177 record. Vehicle identification must confirm the actual generation, body style, original output and control-unit versions before the workshop matches the package. This page does not apply the figures to another engine or later hybrid platform.',
      'GAD publishes Stage 3 totals of €17,876 for its seven-speed reinforcement option and €19,346 for its nine-speed option. Stage 4 is €33,335 or €34,805, and Stage 5 is €51,335 or €52,805, respectively. GAD does not map these alternatives to model years or variants; the actual gearbox and fit must be confirmed in the written proposal.',
    ],
    packageHeading: 'GLC63 priced ranges and transmission package contents',
    packageExplanation: [
      'Stage 2 lists 615 HP and 810 Nm with downpipe and ceramic heat-coating work. Stage 3 adds the GAD 177 50/63 turbocharger, TCU software and GAD transmission reinforcement. Stage 4 adds open airboxes, a Pulse Flow manifold and increased-flow high-pressure fuel system with its specified turbocharger.',
      'Stage 5 has the listed GAD 177 55/68 turbocharger, forged pistons, cylinder-head bolts, engine gasket set, oil and oil filter as part of its full package. The included-work lists below describe the nine-speed reinforcement option, rated around 1,250 Nm. GAD also lists a seven-speed option around 1,100 Nm at the lower endpoint of each higher-stage price range. These ratings describe transmission reinforcement capacity. No VIP configuration is present for this record.',
    ],
    brandHub: { label: 'Mercedes-Benz service and repair', path: '/brands/mercedes-benz-service-dubai' },
    relatedLinks: [],
    faqs: [
      { question: 'What is the GLC63 Stage 1 tuning price?', answer: 'The GLC63 M177 Stage 1 entry lists €3,146 total and 1–2 days, with 590 HP / 780 Nm. Its stock reference is 476 HP / 650 Nm. The package includes an airfilter, engine software optimization and V-Max deactivation.' },
      { question: 'Why do higher GLC63 stages show a price range?', answer: 'GAD lists a seven-speed transmission-reinforcement option at each lower endpoint and a nine-speed option at each upper endpoint: Stage 3 €17,876 / €19,346, Stage 4 €33,335 / €34,805 and Stage 5 €51,335 / €52,805 total. These published EUR alternatives are preserved; the actual gearbox and package fit must be confirmed before booking.' },
      { question: 'Is TCU software listed in the GLC63 packages?', answer: 'Stage 3, Stage 4 and Stage 5 list TCU software. GAD describes seven-speed reinforcement around 1,100 Nm and nine-speed reinforcement around 1,250 Nm. The lists here show the nine-speed option; confirm compatibility for the actual vehicle. Stage 1 and Stage 2 do not name TCU work.' },
    ],
  },
  {
    slug: 'aston-martin-db11',
    path: '/tuning/aston-martin-db11',
    name: 'Aston Martin DB11',
    shortName: 'Aston Martin DB11',
    h1: 'Aston Martin DB11 Performance Tuning Dubai',
    metaTitle: 'Aston Martin DB11 Tuning Dubai | Stages & Prices | Digi-Tec',
    metaDescription: 'View the supported M177 Aston Martin DB11 Stage 1–5 tuning packages in Dubai, with power, torque, euro prices, workshop time and included hardware.',
    carIds: ['db11'],
    image: '/images/cars/db11.png',
    engine: 'M177',
    generation: '',
    intro: 'The supported Aston Martin DB11 record is identified by its M177 engine, with a stock reference of 503 HP and 675 Nm. Five tuning stages are listed, each with horsepower, torque, euro price, time and its own included-work list. The engine identification is essential when discussing a DB11 project because this record does not define a package for every DB11 powertrain.',
    platformNotes: [
      'The source does not specify a year range or a separate generation field. Send the VIN, year and engine details to confirm the vehicle matches this M177 package set; a DB11 model badge alone is insufficient.',
      'Stage 1 lists 590 HP and 750 Nm; Stage 5 lists 850 HP and 1,100 Nm. The higher configurations include their own turbo, fuel-system and engine-component lists, so each output belongs to its particular installed package.',
    ],
    packageHeading: 'DB11 M177 calibration and supporting-component progression',
    packageExplanation: [
      'Stage 2 names a sport-catalyst downpipe, ceramic heat coating and transmission software optimization. Stage 3 adds its GAD 177 50/63 turbocharger and TCU software. Stage 4 specifies open airboxes, GAD 177 55/63 turbochargers, a Pulse Flow manifold and an increased-flow high-pressure fuel system.',
      'Stage 5 adds the listed GAD 177 55/68 turbocharger, forged pistons, cylinder-head bolts, an engine gasket set, oil and oilfilter. An inherited reinforcement item has been withheld because its applicability to the DB11 transmission is unverified. The workshop must confirm any additional transmission hardware in a vehicle-specific proposal; no replacement reinforcement package is claimed here.',
    ],
    brandHub: { label: 'Aston Martin service and repair', path: '/brands/aston-martin-service-dubai' },
    relatedLinks: [{ label: 'DB11 service and repair guide', path: '/blog/aston-martin-db11-service-dubai-guide' }],
    faqs: [
      { question: 'Do these packages apply to every Aston Martin DB11?', answer: 'No. The supported record is specifically identified as M177, with a 503 HP / 675 Nm stock reference. The source gives no year range, so the VIN, engine and software must be checked before matching a DB11 to a listed package.' },
      { question: 'What is the listed DB11 Stage 1 tuning price?', answer: 'Stage 1 lists €3,346 total, 1–2 days and 590 HP / 750 Nm. Its included work is an airfilter, engine software optimization and V-Max speed-limiter deactivation.' },
      { question: 'Does the DB11 package list include transmission work?', answer: 'Stage 2 lists transmission software optimization, and Stage 3–5 list TCU software. An inherited reinforcement item is withheld because DB11 compatibility is unverified. Any transmission hardware requires a confirmed vehicle-specific proposal.' },
    ],
  },
  {
    slug: 'lamborghini-urus',
    path: '/tuning/lamborghini-urus',
    name: 'Lamborghini Urus',
    shortName: 'Lamborghini Urus',
    h1: 'Lamborghini Urus Performance Tuning Dubai',
    metaTitle: 'Lamborghini Urus Tuning Dubai | Stages & Prices | Digi-Tec',
    metaDescription: 'Compare the supported V8 twin-turbo Urus Stage 1–4 tuning packages in Dubai: power, torque, euro prices, time, turbo installation kit and intercooler.',
    carIds: ['urus'],
    image: '/images/cars/urus.png',
    engine: 'V8 Twin-Turbo',
    generation: '',
    intro: 'The Lamborghini Urus entry has a 650 HP and 850 Nm stock reference and four tuning stages. Its Stage 1 included-work list contains engine software optimization only. Higher stages introduce the specified downpipe, heat coating, GAD turbocharger and installation kit, with an additional intercooler in Stage 4.',
    platformNotes: [
      'The engine field is V8 Twin-Turbo; the source does not state an engine code, year range or generation. Confirm the VIN, original output and software version before applying these package references to a specific Urus variant.',
      'Stage 1 lists 750 HP and 950 Nm, while Stage 4 lists 904 HP and 1,150 Nm. The corresponding package contents differ materially. The source contains no Urus TCU item, so these engine packages do not establish a gearbox-tuning offer.',
    ],
    packageHeading: 'Urus software, GAD turbo installation and intercooler packages',
    packageExplanation: [
      'Stage 2 adds an airfilter, sport-catalyst downpipe and special ceramic heat coating. Stage 3 names the GAD 825-60/71R ball-bearing Twin Scroll turbocharger and an installation kit with cooling-water and oil lines. Stage 4 retains those listed items and adds a custom high-flow intercooler.',
      'The record ends at Stage 4 and has no Stage 5 or VIP configuration. All four stages have euro total prices and workshop estimates. Existing modifications, hardware compatibility and inspection findings are reviewed before the exact installation scope is agreed.',
    ],
    brandHub: { label: 'Lamborghini service and repair', path: '/brands/lamborghini-service-dubai' },
    relatedLinks: [{ label: 'Urus workshop and service guide', path: '/blog/lamborghini-urus-service-dubai-guide' }],
    faqs: [
      { question: 'What is included in Urus Stage 1 tuning?', answer: 'The Stage 1 list names engine software optimization only. It lists 750 HP / 950 Nm, €5,418 total and 1–2 days. No airfilter, downpipe or TCU work is listed within this Stage 1 package.' },
      { question: 'How do Urus Stage 3 and Stage 4 differ?', answer: 'Both list the GAD 825-60/71R turbocharger and its cooling-water/oil-line installation kit. Stage 4 adds a custom high-flow intercooler and lists 904 HP / 1,150 Nm at €35,992 total, compared with Stage 3 at 870 HP / 1,100 Nm and €26,842 total.' },
      { question: 'Does the Urus configurator include gearbox tuning or a VIP stage?', answer: 'No TCU or gearbox-tuning item appears in the Urus included-work lists. The available configurations are Stock and Stage 1–4; no Stage 5 or VIP entry is present.' },
    ],
  },
];

export const TUNING_MODEL_PAGES = tuningModelPages;

export const getTuningModelByPath = (pathname: string) =>
  tuningModelPages.find(model => model.path === pathname.replace(/\/$/, ''));

export const getTuningModelCars = (model: TuningModelPageDefinition): TuningCar[] =>
  model.carIds.map(id => tuningCars.find(car => car.id === id)).filter((car): car is TuningCar => Boolean(car));
