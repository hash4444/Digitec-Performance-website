export type LocalGaragePage = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  intro: string;
  h2: string;
  detail: string;
  highlights: string[];
  faqs: { question: string; answer: string }[];
};

export const localGaragePages: LocalGaragePage[] = [
  {
    slug: 'garage-near-me-dubai',
    title: 'Garage Near Me in Dubai',
    metaTitle: 'Garage Near Me Dubai | DIGI-TEC Al Quoz',
    metaDescription: 'Looking for a garage near you in Dubai? Visit DIGI-TEC in Al Quoz for diagnostics, maintenance, repairs and clear workshop advice for all vehicle types.',
    eyebrow: 'Al Quoz Workshop Access',
    intro: 'If you are searching for a garage near me in Dubai, DIGI-TEC Performance Center in Al Quoz Industrial Area 3 offers scheduled inspections, diagnostics, maintenance and repair support for luxury, performance and everyday cars.',
    h2: 'A practical nearby garage option in Dubai',
    detail: 'The right garage should be easy to reach and easy to work with. Before any repair, the priority is to understand the concern, inspect the relevant systems and explain the next step clearly. Whether your car has a warning light, weak air-conditioning, a noise, a maintenance reminder or a drivability concern, the workshop team can help you arrange the correct inspection.',
    highlights: ['Workshop location in Al Quoz Industrial Area 3', 'Diagnostics and inspection before major repairs', 'Maintenance, mechanical, brake, suspension and electrical support', 'WhatsApp, phone and directions available before you visit'],
    faqs: [
      { question: 'Where is DIGI-TEC located in Dubai?', answer: 'DIGI-TEC Performance Center is in Al Quoz Industrial Area 3, Dubai.' },
      { question: 'Can I book a garage inspection by WhatsApp?', answer: 'Yes. Send your car model, year, mileage and concern on WhatsApp so the team can help arrange the right appointment.' },
      { question: 'What should I bring to a workshop appointment?', answer: 'Bring the vehicle key, service history if available, and photos or videos of intermittent warnings or noises.' },
    ],
  },
  {
    slug: 'roadside-assistance-dubai',
    title: 'Roadside Assistance in Dubai',
    metaTitle: 'Roadside Assistance Dubai | DIGI-TEC',
    metaDescription: 'Need roadside assistance in Dubai? Contact DIGI-TEC for workshop guidance, vehicle recovery coordination and a follow-up inspection in Al Quoz.',
    eyebrow: 'When Your Car Cannot Continue',
    intro: 'For roadside assistance in Dubai, contact DIGI-TEC with your vehicle location, model and the issue you are seeing. The team can advise the safest next step, help coordinate vehicle recovery where required, and arrange a workshop inspection once the car arrives.',
    h2: 'Roadside support that leads to a proper repair plan',
    detail: 'A breakdown is stressful, especially when a warning light, overheating message, tyre issue or no-start condition appears unexpectedly. The immediate priority is safety: move to a safe location if possible, avoid driving with serious warnings, and share clear details with the workshop. Once the vehicle is secure, a diagnostic inspection can identify the cause instead of relying on guesses made at the roadside.',
    highlights: ['Guidance on safe next steps for common breakdown symptoms', 'Vehicle recovery coordination when the car should not be driven', 'Workshop diagnostics after recovery', 'Clear updates and an inspection plan before repair work begins'],
    faqs: [
      { question: 'Should I drive with an overheating warning?', answer: 'No. Stop safely as soon as possible and seek advice. Continuing to drive while overheating can cause severe engine damage.' },
      { question: 'What details should I send for roadside help?', answer: 'Share your location, car model, registration details if required, the warning message, symptoms and whether the car can move safely.' },
      { question: 'Can DIGI-TEC inspect my car after recovery?', answer: 'Yes. Once the vehicle arrives at the workshop, the team can arrange a diagnostic assessment and explain the repair options.' },
    ],
  },
  {
    slug: 'car-garage-dubai',
    title: 'Car Garage in Dubai',
    metaTitle: 'Car Garage Dubai | DIGI-TEC Performance Center',
    metaDescription: 'DIGI-TEC is a car garage in Dubai for diagnostics, servicing, mechanical repair, brakes, suspension, electrical systems and performance vehicles in Al Quoz.',
    eyebrow: 'Vehicle Service & Repair',
    intro: 'DIGI-TEC Performance Center is a car garage in Dubai serving luxury, performance and everyday vehicles from Al Quoz Industrial Area 3. Book an inspection for routine servicing, diagnostics or a repair concern before it becomes a larger issue.',
    h2: 'A car garage built around clear inspections',
    detail: 'A reliable car garage does more than replace parts. It should identify what is confirmed, what needs monitoring and what can be planned for later. DIGI-TEC provides a workshop route for scheduled maintenance, mechanical repairs, diagnostics, brakes, suspension, electrical systems and performance-focused work, with a clear conversation before major work begins.',
    highlights: ['Scheduled servicing and oil changes', 'Engine, transmission and mechanical repair', 'Diagnostics, programming and electrical-system checks', 'Brake, suspension, tyre and comfort-system support'],
    faqs: [
      { question: 'What services does DIGI-TEC offer?', answer: 'The workshop provides diagnostics, maintenance, mechanical repair, brakes, suspension, electrical work, air-conditioning, body and performance-related services.' },
      { question: 'Do you work on luxury and performance cars?', answer: 'Yes. DIGI-TEC works with luxury, performance and everyday vehicles, with an inspection approach matched to the vehicle and concern.' },
      { question: 'How do I request a quote?', answer: 'Call or WhatsApp the workshop with the car model, year, mileage and concern. An inspection may be needed before a precise repair quote is given.' },
    ],
  },
];

export const getLocalGaragePage = (slug: string) => localGaragePages.find((page) => page.slug === slug);
