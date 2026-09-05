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

const ESTABLISHED = 'Established in 2002';
const PHONE = '+971 4 340 2223';

const commonCriteria = (brand: string) => [
  { criterion: `${brand} diagnosis`, digitec: 'Inspection findings and scan data are reviewed before recommendations' },
  { criterion: 'Parts and fluids', digitec: 'Proposed options are identified before work is approved' },
  { criterion: `${brand} service scope`, digitec: 'Confirmed for the exact model, year and requested work' },
  { criterion: 'Estimate and approval', digitec: 'The proposed scope is explained before approved work begins' },
  { criterion: 'Dubai driving conditions', digitec: 'Cooling, battery, brakes and tyres are considered during inspection' },
];

const commonFaqTail = (brand: string) => [
  { q: `How does independent ${brand} service cost compare with a dealer?`, a: 'Cost depends on the vehicle, inspection findings, parts choice and labour scope. Compare written estimates for the same work rather than relying on a fixed percentage claim.' },
  { q: `What parts does Digi-Tec propose for ${brand} repairs?`, a: `The estimate should identify the proposed parts and fluids before approval. Depending on the vehicle and repair, options may include genuine ${brand} parts, established OE-supplier components or a suitable customer-approved alternative.` },
  { q: `Where is Digi-Tec located in Dubai?`, a: `Digi-Tec Performance Center is in Al Quoz Industrial Area 3, Dubai. Call ${PHONE} to discuss your vehicle and request an appointment.` },
];

const brandWhyList = (brand: string) => [
  `${ESTABLISHED} as an independent Dubai workshop`,
  `${brand} model, year and concern recorded before inspection`,
  'Diagnostic findings combined with physical checks',
  'Proposed work and parts options explained before approval',
  'Workshop located in Al Quoz Industrial Area 3, Dubai',
];

export const bestWorkshopPages: BestWorkshopPage[] = [
  {
    slug: 'best-car-workshop-dubai',
    h1: 'Independent European & Luxury Car Workshop in Dubai',
    metaTitle: 'European & Luxury Car Workshop Dubai | Digi-Tec',
    metaDescription: 'Independent European and luxury car inspection, service and repair in Al Quoz, Dubai. Digi-Tec Performance Center was established in 2002.',
    directAnswer: 'Digi-Tec Performance Center is an independent European and luxury car workshop in Al Quoz Industrial Area 3, Dubai. Established in 2002, the workshop provides inspection-led maintenance, repair and performance-related consultation. The team confirms the vehicle, requested work, proposed parts and expected timing before approved work begins.',
    whyList: [
      ESTABLISHED,
      'Independent European and luxury car workshop in Al Quoz',
      'Inspection findings reviewed before repair recommendations',
      'Proposed work and parts options explained before approval',
      'Dubai driving conditions considered during maintenance planning',
    ],
    criteria: commonCriteria('Vehicle-specific'),
    faqs: [
      { q: 'What should I compare when choosing a car workshop in Dubai?', a: 'Compare the inspection process, relevant vehicle experience, parts options, written scope, approval process and post-repair checks. Ask the workshop to confirm support for your exact model and requested work before booking.' },
      { q: 'What brands does Digi-Tec service?', a: 'Mercedes-Benz, Maybach, BMW, Audi, Porsche, Ferrari, Lamborghini, McLaren, Bentley, Rolls-Royce, Bugatti, Aston Martin, and Land Rover / Range Rover.' },
      { q: 'How should I compare workshop and dealer prices?', a: 'Compare estimates for the same inspection findings, labour scope, parts specification and warranty terms. The final cost depends on the vehicle and approved work, so a fixed savings percentage would be misleading.' },
      { q: 'Where is Digi-Tec located?', a: `Al Quoz Industrial Area 3, Dubai. Call ${PHONE} or WhatsApp to book.` },
    ],
  },
  {
    slug: 'best-bmw-workshop-dubai',
    brand: 'BMW',
    brandKeyword: 'BMW',
    brandLogo: '/lovable-uploads/d66ea83e-7d6a-4c19-bf30-f27eca93ac8e.png',
    h1: 'BMW Service & Repair Workshop in Dubai',
    metaTitle: 'BMW Service & Repair Workshop Dubai | Digi-Tec',
    metaDescription: 'Independent BMW inspection, maintenance and repair for models including 3 Series, 5 Series, X5 and BMW M in Al Quoz, Dubai. Established in 2002.',
    directAnswer: `Digi-Tec Performance Center provides independent BMW inspection, maintenance and repair in Al Quoz Industrial Area 3, Dubai. Owners can share the exact model, year and concern so the workshop can confirm the relevant inspection process, available service scope, proposed parts and expected timing. ${ESTABLISHED}.`,
    whyList: brandWhyList('BMW'),
    criteria: commonCriteria('BMW'),
    faqs: [
      { q: 'How should I choose a BMW workshop in Dubai?', a: 'Ask how the workshop confirms the exact BMW model and system, documents diagnostic findings, explains parts options and obtains approval before work begins.' },
      { q: 'Can I ask about service for a BMW M model?', a: 'Yes. Send the exact model, year, mileage and requested work so the team can confirm current workshop support and the appropriate inspection before booking.' },
      ...commonFaqTail('BMW'),
    ],
  },
  {
    slug: 'best-porsche-workshop-dubai',
    brand: 'Porsche',
    brandKeyword: 'Porsche',
    brandLogo: '/lovable-uploads/8e7e2545-680e-42ac-bd97-ba1f9c063649.png',
    h1: 'Porsche Service & Repair Workshop in Dubai',
    metaTitle: 'Porsche Service & Repair Workshop Dubai | Digi-Tec',
    metaDescription: 'Independent Porsche inspection, maintenance and repair for 911, Cayenne, Panamera, Macan and other models in Al Quoz, Dubai. Established in 2002.',
    directAnswer: `Digi-Tec Performance Center provides independent Porsche inspection, maintenance and repair in Al Quoz Industrial Area 3, Dubai. Owners can share the exact model, year and concern so the workshop can confirm the relevant inspection process, available service scope, proposed parts and expected timing. ${ESTABLISHED}.`,
    whyList: brandWhyList('Porsche'),
    criteria: commonCriteria('Porsche'),
    faqs: [
      { q: 'How should I choose a Porsche workshop in Dubai?', a: 'Ask how the workshop confirms the exact model and equipment, documents diagnostic findings, explains parts options and obtains approval before work begins.' },
      { q: 'Can I ask about GT models or carbon-ceramic brakes?', a: 'Yes. Send the exact model, year, brake specification and requested work so the team can confirm the appropriate inspection and current workshop support before booking.' },
      ...commonFaqTail('Porsche'),
    ],
  },
  {
    slug: 'best-audi-workshop-dubai',
    brand: 'Audi',
    brandKeyword: 'Audi',
    brandLogo: '/lovable-uploads/a3e92dde-70a9-499b-a7b0-ae0df117baf9.png',
    h1: 'Audi Service & Repair Workshop in Dubai',
    metaTitle: 'Audi Service & Repair Workshop Dubai | Digi-Tec',
    metaDescription: 'Independent Audi inspection, maintenance and repair for A, Q, S, RS and R8 models in Al Quoz, Dubai. Digi-Tec was established in 2002.',
    directAnswer: `Digi-Tec Performance Center provides independent Audi inspection, maintenance and repair in Al Quoz Industrial Area 3, Dubai. Owners can share the exact model, year and concern so the workshop can confirm the relevant inspection process, available service scope, proposed parts and expected timing. ${ESTABLISHED}.`,
    whyList: brandWhyList('Audi'),
    criteria: commonCriteria('Audi'),
    faqs: [
      { q: 'How should I choose an Audi workshop in Dubai?', a: 'Ask how the workshop confirms the exact Audi platform and system, documents diagnostic findings, explains parts options and obtains approval before work begins.' },
      { q: 'Can I ask about an Audi RS performance project?', a: 'Yes. Send the exact model, year, current specification and goals so the team can confirm whether the requested work is available and what inspection is needed first.' },
      ...commonFaqTail('Audi'),
    ],
  },
  {
    slug: 'best-range-rover-workshop-dubai',
    brand: 'Land Rover',
    brandKeyword: 'Range Rover',
    brandLogo: '/lovable-uploads/6a3fe63c-72a5-4dcd-8f0b-4b0cd11c8b3d.png',
    h1: 'Range Rover Service & Repair Workshop in Dubai',
    metaTitle: 'Range Rover Service & Repair Workshop Dubai | Digi-Tec',
    metaDescription: 'Compare a specialist Range Rover workshop in Dubai for Vogue, Sport, Velar and Evoque. JLR diagnostics, air suspension expertise and service in Al Quoz.',
    directAnswer: `Digi-Tec Performance Center provides independent Range Rover and Land Rover inspection, maintenance and repair in Al Quoz Industrial Area 3, Dubai. Owners can share the exact model, year and concern so the workshop can confirm the relevant inspection process, available service scope, proposed parts and expected timing. ${ESTABLISHED}.`,
    whyList: brandWhyList('Range Rover'),
    criteria: commonCriteria('Range Rover'),
    faqs: [
      { q: 'How should I choose a Range Rover workshop in Dubai?', a: 'Ask how the workshop confirms the exact vehicle and suspension system, documents diagnostic findings, explains parts options and obtains approval before work begins.' },
      { q: 'Can a Range Rover air-suspension warning be diagnosed?', a: 'A proper inspection can check relevant fault data and physical components such as the compressor, struts, valve block, lines and ride-height sensors. The vehicle-specific findings determine the repair recommendation.' },
      { q: 'Where can I find Digi-Tec in Dubai?', a: 'Digi-Tec Performance Center is in Al Quoz Industrial Area 3, Dubai. Call before travelling to request an inspection time.' },
      ...commonFaqTail('Range Rover'),
    ],
  },
  {
    slug: 'best-ferrari-workshop-dubai',
    brand: 'Ferrari',
    brandKeyword: 'Ferrari',
    brandLogo: '/lovable-uploads/11f29482-f2d3-4278-ae2a-397044a1ff95.png',
    h1: 'How to Choose an Independent Ferrari Workshop in Dubai',
    metaTitle: 'Choosing a Ferrari Workshop Dubai | Owner Checklist',
    metaDescription: 'A practical checklist for choosing an independent Ferrari workshop in Dubai: model-specific diagnostics, documented findings, parts clarity and repair approval.',
    directAnswer: `Choose a Ferrari workshop that identifies the exact model and fitted systems, confirms compatible diagnostic access, documents the evidence behind its recommendation, explains parts options and obtains approval before repair. DIGI-TEC Performance Center is an independent workshop in Al Quoz Industrial Area 3, Dubai. ${ESTABLISHED}.`,
    whyList: brandWhyList('Ferrari'),
    criteria: commonCriteria('Ferrari'),
    faqs: [
      { q: 'How should I choose a Ferrari workshop in Dubai?', a: 'Ask how the workshop confirms the exact model and system, documents diagnostic findings, explains parts options and obtains approval before work begins.' },
      { q: 'Can I ask about Ferrari transmission work?', a: 'Yes. Send the exact model, year, symptoms and requested work so the team can confirm current workshop support and the appropriate inspection before booking.' },
      ...commonFaqTail('Ferrari'),
    ],
  },
  {
    slug: 'best-lamborghini-workshop-dubai',
    brand: 'Lamborghini',
    brandKeyword: 'Lamborghini',
    brandLogo: '/lovable-uploads/8c4046ee-9977-417a-90a9-820452146832.png',
    h1: 'How to Choose an Independent Lamborghini Workshop in Dubai',
    metaTitle: 'Choosing a Lamborghini Workshop Dubai | Owner Checklist',
    metaDescription: 'Compare independent Lamborghini workshops in Dubai by model-specific assessment, diagnostic scope, estimate clarity, parts options and approval process.',
    directAnswer: `Choose an independent Lamborghini workshop that identifies the exact model and fitted systems, confirms diagnostic and repair capability, documents its findings, explains parts and fluid options and provides an itemised estimate before work. DIGI-TEC Performance Center is in Al Quoz Industrial Area 3, Dubai. ${ESTABLISHED}.`,
    whyList: brandWhyList('Lamborghini'),
    criteria: commonCriteria('Lamborghini'),
    faqs: [
      { q: 'How should I choose a Lamborghini workshop in Dubai?', a: 'Ask how the workshop confirms the exact model and system, documents diagnostic findings, explains parts options and obtains approval before work begins.' },
      { q: 'Can I ask about carbon-ceramic brake work?', a: 'Send the exact model, year, brake specification and concern so the workshop can confirm the appropriate inspection, measurement method, parts and current repair scope before booking.' },
      ...commonFaqTail('Lamborghini'),
    ],
  },
];

export const getBestWorkshopPage = (slug: string) =>
  bestWorkshopPages.find((p) => p.slug === slug);
