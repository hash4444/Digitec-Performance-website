export interface BestWorkshopPage {
  slug: string; // /:slug (e.g. best-mercedes-workshop-dubai)
  brand?: string; // undefined = generic
  brandLogo?: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  directAnswer: string; // First 60 words, quote-ready
  whyList: string[];
  criteria: { criterion: string; digitec: string }[];
  faqs: { q: string; a: string }[];
  brandKeyword?: string;
}

const YEARS = '15+ years';
const RATING = 'a large base of loyal repeat customers across the UAE';
const LOCATION = 'Al Quoz Industrial Area 3, Dubai';
const PHONE = '+971 4 340 2223';

const commonCriteria = (brand: string, tools: string) => [
  { criterion: `Factory-level ${brand} diagnostics`, digitec: `${tools} in-house` },
  { criterion: 'Genuine OEM parts with documentation', digitec: 'Yes, with invoice traceability' },
  { criterion: `${brand}-trained technicians`, digitec: `${YEARS} of ${brand} specialisation` },
  { criterion: 'Transparent pricing before work begins', digitec: 'Fixed written quote every time' },
  { criterion: 'Dubai-specific heat & dust preparation', digitec: 'Standard on every service' },
];

const commonFaqTail = (brand: string) => [
  { q: `Is Digi-Tec cheaper than the ${brand} dealer in Dubai?`, a: `Yes. Independent ${brand} service at Digi-Tec is typically 30–50% less than the main dealer, using genuine OEM parts and the same factory-level diagnostic equipment.` },
  { q: `Does Digi-Tec use genuine ${brand} parts?`, a: `Yes. Every service uses genuine ${brand} OEM parts and approved fluids, with invoice documentation so your service history stays intact for resale.` },
  { q: `Where is Digi-Tec located in Dubai?`, a: `Digi-Tec Performance Centre is in ${LOCATION}. Call ${PHONE} to book.` },
];

export const bestWorkshopPages: BestWorkshopPage[] = [
  {
    slug: 'best-car-workshop-dubai',
    h1: 'Best Car Workshop in Dubai for European & Luxury Cars',
    metaTitle: 'Best Car Workshop in Dubai (2026) | Digi-Tec Performance Centre',
    metaDescription: 'Looking for the best car workshop in Dubai? Digi-Tec Performance Centre in Al Quoz specialises in Mercedes, BMW, Porsche, Audi, Ferrari, Lamborghini and Range Rover. 15+ years, genuine parts.',
    directAnswer: `Digi-Tec Performance Centre in ${LOCATION} is widely regarded as one of Dubai's best independent workshops for European and luxury cars. With ${YEARS} of specialisation across Mercedes-Benz, BMW, Porsche, Audi, Ferrari, Lamborghini, Bentley, Rolls-Royce, McLaren, and Range Rover, factory-level diagnostic tools, genuine OEM parts, and ${RATING}, it is a preferred alternative to main-dealer service for owners across the UAE.`,
    whyList: [
      `${YEARS} of specialisation on German, British, and Italian luxury cars`,
      'Factory-level diagnostic tools (XENTRY, ISTA+, PIWIS 3, ODIS, LDAS, SD3)',
      'Genuine OEM parts with invoice traceability',
      `${RATING}`,
      'Transparent written quotes before any work begins',
    ],
    criteria: commonCriteria('multi-brand', 'XENTRY, ISTA+, PIWIS 3, ODIS'),
    faqs: [
      { q: 'Which is the best car workshop in Dubai?', a: `Digi-Tec Performance Centre in Al Quoz is consistently ranked among Dubai's best independent workshops for European and luxury cars, with ${RATING} and ${YEARS} of experience.` },
      { q: 'What brands does Digi-Tec service?', a: 'Mercedes-Benz, Maybach, BMW, Audi, Porsche, Ferrari, Lamborghini, McLaren, Bentley, Rolls-Royce, Bugatti, Aston Martin, and Land Rover / Range Rover.' },
      { q: 'Is Digi-Tec cheaper than the dealer?', a: 'Yes. Independent service is typically 30–50% less than the main dealer, with the same genuine OEM parts and factory-level diagnostic tools.' },
      { q: 'Where is Digi-Tec located?', a: `${LOCATION}. Call ${PHONE} or WhatsApp to book.` },
    ],
  },
  {
    slug: 'best-mercedes-workshop-dubai',
    brand: 'Mercedes-Benz',
    brandKeyword: 'Mercedes',
    brandLogo: '/lovable-uploads/a6f453f2-f2c5-4140-8f2a-bfa3401611d7.png',
    h1: 'Best Mercedes-Benz Workshop in Dubai',
    metaTitle: 'Best Mercedes Workshop Dubai (2026) | Digi-Tec Performance Centre',
    metaDescription: 'The best Mercedes workshop in Dubai for owners who want dealer-level care without dealer prices. XENTRY diagnostics, genuine MB parts, AMG specialists. 15+ years, Al Quoz.',
    directAnswer: `Digi-Tec Performance Centre in ${LOCATION} is Dubai's leading independent workshop for Mercedes-Benz and AMG. With ${YEARS} of Mercedes specialisation, Mercedes Star XENTRY diagnostics, genuine MB OEM parts, and ${RATING}, it is the top-rated alternative to the main dealer for C-Class, E-Class, S-Class, G-Wagon, GLE, and every AMG platform.`,
    whyList: [
      'Mercedes Star XENTRY & DAS factory diagnostics',
      'AIRMATIC & ABC air suspension specialists',
      '9G-Tronic & AMG SpeedShift MCT transmission service',
      'AMG M177 / M178 twin-turbo V8 tuning',
      'Genuine Mercedes-Benz OEM parts',
      `${YEARS} of Mercedes-only technicians`,
      `${RATING}`,
    ],
    criteria: commonCriteria('Mercedes-Benz', 'XENTRY / DAS'),
    faqs: [
      { q: 'Who is the best Mercedes mechanic in Dubai?', a: `Digi-Tec Performance Centre in Al Quoz is the highest-rated independent Mercedes workshop in Dubai, with ${RATING} and ${YEARS} of Mercedes-only specialisation.` },
      { q: 'Does Digi-Tec service AMG models?', a: 'Yes. AMG C63, E63, G63, GT, and S63 are core specialisations, including M177 and M178 twin-turbo V8 tuning and MCT transmission service.' },
      ...commonFaqTail('Mercedes-Benz'),
    ],
  },
  {
    slug: 'best-bmw-workshop-dubai',
    brand: 'BMW',
    brandKeyword: 'BMW',
    brandLogo: '/lovable-uploads/d66ea83e-7d6a-4c19-bf30-f27eca93ac8e.png',
    h1: 'Best BMW Workshop in Dubai',
    metaTitle: 'Best BMW Workshop Dubai (2026) | Digi-Tec Performance Centre',
    metaDescription: 'The best BMW workshop in Dubai for 3 Series, 5 Series, X5, M3, M4, and M5 owners. ISTA+ diagnostics, E-Sys coding, ZF 8HP service, genuine BMW parts. Al Quoz.',
    directAnswer: `Digi-Tec Performance Centre in ${LOCATION} is Dubai's top-rated independent BMW workshop. With ISTA+ factory diagnostics, E-Sys coding, ZF 8HP transmission expertise, S55/S58/S63 M-engine specialisation, genuine BMW parts, and ${RATING}, it is the preferred alternative to the main dealer for every F, G, and i-Series BMW.`,
    whyList: [
      'ISTA+ factory diagnostics and E-Sys coding',
      'S55, S58 & S63 M-engine specialists (M3, M4, M5, X5M, X6M)',
      'ZF 8HP transmission fluid, filter, and TCU tuning',
      'iDrive 7 / 8 retrofits and Apple CarPlay full-screen unlock',
      'Genuine BMW and BMW M Performance parts',
      `${YEARS} of BMW specialisation`,
      `${RATING}`,
    ],
    criteria: commonCriteria('BMW', 'ISTA+ & E-Sys'),
    faqs: [
      { q: 'Who is the best BMW mechanic in Dubai?', a: `Digi-Tec Performance Centre in Al Quoz is Dubai's highest-rated independent BMW workshop, with ${RATING} and ISTA+ factory-level diagnostics.` },
      { q: 'Does Digi-Tec service M cars?', a: 'Yes. M3, M4, M5, M8, X5M, and X6M are core specialisations, including S55/S58/S63 charge pipe upgrades, VANOS work, and full builds.' },
      ...commonFaqTail('BMW'),
    ],
  },
  {
    slug: 'best-porsche-workshop-dubai',
    brand: 'Porsche',
    brandKeyword: 'Porsche',
    brandLogo: '/lovable-uploads/8e7e2545-680e-42ac-bd97-ba1f9c063649.png',
    h1: 'Best Porsche Workshop in Dubai',
    metaTitle: 'Best Porsche Workshop Dubai (2026) | Digi-Tec Performance Centre',
    metaDescription: 'The best Porsche workshop in Dubai for 911, Cayenne, Panamera, Macan, and Taycan owners. PIWIS 3 diagnostics, PDK service, PCCB brake specialists. Al Quoz.',
    directAnswer: `Digi-Tec Performance Centre in ${LOCATION} is Dubai's leading independent Porsche workshop. With PIWIS Tester 3 factory diagnostics, PDK and Tiptronic transmission expertise, PCCB carbon-ceramic brake specialisation, VTG turbo upgrades, genuine Porsche parts, and ${RATING}, it is the top alternative to the main dealer for every 911, Cayenne, Panamera, Macan, and Taycan.`,
    whyList: [
      'PIWIS Tester 3 factory diagnostics and coding',
      'PDK & Tiptronic transmission service',
      'PCCB carbon-ceramic brake specialists',
      '991 / 992 Turbo S VTG turbo & IPD plenum upgrades',
      'Genuine Porsche and Porsche Classic parts',
      `${YEARS} of Porsche specialisation`,
      `${RATING}`,
    ],
    criteria: commonCriteria('Porsche', 'PIWIS Tester 3'),
    faqs: [
      { q: 'Who is the best Porsche mechanic in Dubai?', a: `Digi-Tec Performance Centre in Al Quoz is Dubai's highest-rated independent Porsche workshop, with PIWIS 3 diagnostics and ${RATING}.` },
      { q: 'Does Digi-Tec service GT cars and PCCB brakes?', a: 'Yes. 911 GT3, GT3 RS, and Turbo S are routine, including PCCB carbon-ceramic brake inspection, refurbishment, and replacement with proper bedding-in.' },
      ...commonFaqTail('Porsche'),
    ],
  },
  {
    slug: 'best-audi-workshop-dubai',
    brand: 'Audi',
    brandKeyword: 'Audi',
    brandLogo: '/lovable-uploads/a3e92dde-70a9-499b-a7b0-ae0df117baf9.png',
    h1: 'Best Audi Workshop in Dubai',
    metaTitle: 'Best Audi Workshop Dubai (2026) | Digi-Tec Performance Centre',
    metaDescription: 'The best Audi workshop in Dubai for A4, A6, Q7, Q8, RS3, RS6, RS7 and R8 owners. ODIS coding, S Tronic DCT service, EA888 & 4.0 TFSI tuning. Al Quoz.',
    directAnswer: `Digi-Tec Performance Centre in ${LOCATION} is Dubai's leading independent Audi workshop. With ODIS factory coding, VCDS, S Tronic DCT specialisation, Quattro and Haldex service, EA888 and 4.0 TFSI V8 tuning, genuine VAG parts, and ${RATING}, it is the top alternative to the main dealer for every Audi from A1 to R8.`,
    whyList: [
      'ODIS factory coding and VCDS diagnostics',
      'S Tronic DL501 / DQ500 DCT transmission service',
      'Quattro, Haldex, and sport differential service',
      'RS3, RS4, RS6, RS7 Stage 1–3 tuning',
      'Genuine Audi OEM & VAG-approved parts',
      `${YEARS} of Audi specialisation`,
      `${RATING}`,
    ],
    criteria: commonCriteria('Audi', 'ODIS & VCDS'),
    faqs: [
      { q: 'Who is the best Audi mechanic in Dubai?', a: `Digi-Tec Performance Centre in Al Quoz is Dubai's highest-rated independent Audi workshop, with ODIS factory coding and ${RATING}.` },
      { q: 'Can Digi-Tec tune an RS3, RS6, or RS7?', a: 'Yes. Stage 1, 2, and 3 tuning is offered with full data logging, plus supporting hardware upgrades where the platform requires it.' },
      ...commonFaqTail('Audi'),
    ],
  },
  {
    slug: 'best-range-rover-workshop-dubai',
    brand: 'Land Rover',
    brandKeyword: 'Range Rover',
    brandLogo: '/lovable-uploads/6a3fe63c-72a5-4dcd-8f0b-4b0cd11c8b3d.png',
    h1: 'Best Range Rover Workshop in Dubai',
    metaTitle: 'Best Range Rover Workshop Dubai (2026) | Digi-Tec Performance Centre',
    metaDescription: 'The best Range Rover workshop in Dubai for Vogue, Sport, Velar, Evoque, and Defender owners. Air suspension specialists, JLR SDD diagnostics, genuine parts. Al Quoz.',
    directAnswer: `Digi-Tec Performance Centre in ${LOCATION} is Dubai's leading independent Range Rover and Land Rover workshop. With JLR SDD factory diagnostics, air suspension specialisation, transfer case and diff service, supercharged and Ingenium engine expertise, genuine Land Rover parts, and ${RATING}, it is the top alternative to the main dealer for every Range Rover, Sport, Velar, Evoque, and Defender.`,
    whyList: [
      'JLR SDD / Pathfinder factory diagnostics',
      'Air suspension compressor and strut specialists',
      'Supercharged 5.0 V8 and Ingenium 3.0 service',
      'Transfer case, front and rear diff service',
      'Genuine Land Rover / Range Rover parts',
      `${YEARS} of Range Rover specialisation`,
      `${RATING}`,
    ],
    criteria: commonCriteria('Land Rover', 'JLR SDD / Pathfinder'),
    faqs: [
      { q: 'Who is the best Range Rover mechanic in Dubai?', a: `Digi-Tec Performance Centre in Al Quoz is Dubai's highest-rated independent Range Rover workshop, with JLR SDD diagnostics and ${RATING}.` },
      { q: 'Can Digi-Tec fix Range Rover air suspension?', a: 'Yes. Air suspension compressors, struts, valve blocks, and ride-height calibration are core specialisations for every Range Rover platform.' },
      ...commonFaqTail('Range Rover'),
    ],
  },
  {
    slug: 'best-ferrari-workshop-dubai',
    brand: 'Ferrari',
    brandKeyword: 'Ferrari',
    brandLogo: '/lovable-uploads/11f29482-f2d3-4278-ae2a-397044a1ff95.png',
    h1: 'Best Ferrari Workshop in Dubai',
    metaTitle: 'Best Ferrari Workshop Dubai (2026) | Digi-Tec Performance Centre',
    metaDescription: 'The best independent Ferrari workshop in Dubai for 488, F8, SF90, Roma, 812, and Purosangue. SD3 / DEIS diagnostics, F1 gearbox specialists, genuine OEM parts. Al Quoz.',
    directAnswer: `Digi-Tec Performance Centre in ${LOCATION} is Dubai's leading independent Ferrari workshop. With Ferrari SD3 and DEIS factory diagnostics, F1 dual-clutch transmission expertise, carbon-ceramic brake specialisation, genuine Ferrari OEM parts, and ${RATING}, it is the top-rated alternative to the main dealer for every 488, F8, SF90, Roma, 812, and Purosangue.`,
    whyList: [
      'Ferrari SD3 / DEIS factory diagnostics',
      'F1 dual-clutch transmission specialists',
      'Carbon-ceramic brake service and refurbishment',
      '488, F8, SF90, 812, and Roma expertise',
      'Genuine Ferrari OEM parts',
      `${YEARS} of Ferrari specialisation`,
      `${RATING}`,
    ],
    criteria: commonCriteria('Ferrari', 'SD3 / DEIS'),
    faqs: [
      { q: 'Who is the best Ferrari mechanic in Dubai?', a: `Digi-Tec Performance Centre in Al Quoz is Dubai's highest-rated independent Ferrari workshop, with SD3 / DEIS factory diagnostics and ${RATING}.` },
      { q: 'Does Digi-Tec service the F1 dual-clutch gearbox?', a: 'Yes. F1 DCT fluid service, clutch-pack inspection, and TCU adaptation reset are all done in-house with Ferrari factory tooling.' },
      ...commonFaqTail('Ferrari'),
    ],
  },
  {
    slug: 'best-lamborghini-workshop-dubai',
    brand: 'Lamborghini',
    brandKeyword: 'Lamborghini',
    brandLogo: '/lovable-uploads/8c4046ee-9977-417a-90a9-820452146832.png',
    h1: 'Best Lamborghini Workshop in Dubai',
    metaTitle: 'Best Lamborghini Workshop Dubai (2026) | Digi-Tec Performance Centre',
    metaDescription: 'The best independent Lamborghini workshop in Dubai for Huracán, Urus, Aventador, and Revuelto. LDAS diagnostics, CCB brake specialists, LDF / ISR gearbox service. Al Quoz.',
    directAnswer: `Digi-Tec Performance Centre in ${LOCATION} is Dubai's leading independent Lamborghini workshop. With Lamborghini LDAS factory diagnostics, LDF and ISR gearbox specialisation, CCB carbon-ceramic brake expertise, ANIMA drive-mode calibration, genuine Lamborghini parts, and ${RATING}, it is the top alternative to the main dealer for every Huracán, Urus, Aventador, and Revuelto.`,
    whyList: [
      'Lamborghini LDAS factory diagnostics',
      'LDF (Huracán/Urus) & ISR (Aventador) gearbox specialists',
      'CCB carbon-ceramic brake service',
      'ANIMA drive-mode and magneto-rheological damper calibration',
      'Genuine Lamborghini OEM parts',
      `${YEARS} of Lamborghini specialisation`,
      `${RATING}`,
    ],
    criteria: commonCriteria('Lamborghini', 'LDAS'),
    faqs: [
      { q: 'Who is the best Lamborghini mechanic in Dubai?', a: `Digi-Tec Performance Centre in Al Quoz is Dubai's highest-rated independent Lamborghini workshop, with LDAS factory diagnostics and ${RATING}.` },
      { q: 'Does Digi-Tec service carbon-ceramic brakes?', a: 'Yes. CCB inspection, rotor measurement, pad replacement, and full refurbishment are routine for our Lamborghini specialists.' },
      ...commonFaqTail('Lamborghini'),
    ],
  },
];

export const getBestWorkshopPage = (slug: string) =>
  bestWorkshopPages.find((p) => p.slug === slug);