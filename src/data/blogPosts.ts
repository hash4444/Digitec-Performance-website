export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: 'Maintenance' | 'Tuning' | 'Mercedes' | 'Detailing';
  author: string;
  date: string; // ISO
  readTime: string;
  coverGradient: string; // tailwind gradient classes
  metaTitle: string;
  metaDescription: string;
  keywords?: string;
  content: { type: 'h2' | 'h3' | 'p' | 'ul'; text?: string; items?: string[] }[];
}

export const blogCategories = ['All', 'Maintenance', 'Tuning', 'Mercedes', 'Detailing'] as const;

export const blogPosts: BlogPost[] = [
  {
    slug: 'best-car-workshop-dubai',
    title: 'Best Car Workshop in Dubai (2026 Guide)',
    excerpt:
      "In a city driven by ambition and home to extraordinary automobiles, Digitec Performance Center in Al Quoz has earned the trust of the UAE's most discerning drivers.",
    category: 'Mercedes',
    author: 'DIGI-TEC Performance',
    date: '2026-04-17',
    readTime: '9 min read',
    coverGradient: 'from-burnt-orange/50 via-charcoal to-black',
    metaTitle: 'Best Car Workshop in Dubai (2026) | Digitec Performance Center',
    metaDescription:
      'Looking for the best car workshop in Dubai? Digitec Performance Center offers expert repair, Mercedes service, ECU tuning, and GAD performance upgrades. Book today.',
    keywords:
      'best car workshop Dubai, car repair Dubai, German car specialist Dubai, Mercedes service Dubai, ECU tuning Dubai',
    content: [
      {
        type: 'p',
        text: "In a city driven by ambition and home to some of the world's most extraordinary automobiles, finding a workshop that truly understands your vehicle is essential. Digitec Performance Center, located in the heart of Al Quoz, Dubai, has spent decades earning the trust of the UAE's most discerning drivers, including owners of Mercedes-Benz, Porsche, Audi, BMW, Ferrari, and more. This is not just a car workshop. It is a performance institution.",
      },
      {
        type: 'p',
        text: 'Whether you are searching for the best car workshop in Dubai, require expert Mercedes car service, need a certified German car specialist in Dubai, or are looking for precision ECU tuning and GAD Motors performance upgrades, Digitec Performance Center is the answer.',
      },
      {
        type: 'p',
        text: 'This article explores five key pillars that define Digitec\u2019s position in the automotive industry: excellence, proven results, trust, reputation, and leadership.',
      },
      { type: 'h2', text: 'Why Digitec Performance Center Is Great' },
      { type: 'h3', text: 'A Complete Automotive Universe Under One Roof' },
      {
        type: 'p',
        text: 'What separates a great workshop from a good one is breadth without compromise. Digitec Performance Center offers an exceptional range of services covering mechanical, electrical, and performance disciplines required by luxury and high-performance vehicles. From routine oil changes to full AMG and GAD tuning projects, every service is delivered with dealer-level precision.',
      },
      { type: 'h3', text: 'Comprehensive Service Offering' },
      {
        type: 'p',
        text: 'Clients visiting for car repair in Dubai can access a full suite of specialist services, including:',
      },
      {
        type: 'ul',
        items: [
          'Engine diagnostics, repair, and rebuild',
          'Transmission repair in Dubai, including automatic, manual, and dual-clutch systems',
          'Gearbox repair and full gearbox servicing, including fluid overhauls and rebuilds',
          'Suspension repair, including geometry correction and full suspension overhauls',
          'Brake repair services, including pad replacement, rotor resurfacing, and complete brake servicing',
          'Battery replacement and car battery change for all luxury vehicles, including Mercedes models',
          'Tire repair, tire replacement, and precision wheel alignment',
          'Car AC repair and full air conditioning servicing',
          'ECU tuning and performance optimization',
          'Car tuning using GAD Motors systems and AMG performance upgrades',
          'Premium oil services using manufacturer-approved lubricants',
          'Bodywork, paint correction, and custom modifications',
        ],
      },
      {
        type: 'p',
        text: 'This integrated approach ensures that clients do not need to visit multiple workshops. Every service is delivered with continuity, precision, and accountability.',
      },
      { type: 'h3', text: 'German Engineered Expertise for German Vehicles' },
      {
        type: 'p',
        text: "At the core of Digitec's identity is deep expertise in German automotive engineering. As a recognized German car specialist in Dubai, the workshop's technicians are trained to meet the exact standards required by Mercedes-Benz, Porsche, Audi, and BMW.",
      },
      {
        type: 'p',
        text: 'For Mercedes car service, Digitec is widely regarded as a leading independent alternative to official dealerships in the UAE. Every model, from the C-Class to AMG and Maybach, is serviced using manufacturer approved diagnostic tools, OEM parts, and advanced calibration systems.',
      },
    ],
  },
  {
    slug: 'mercedes-service-intervals-dubai-heat',
    title: 'Mercedes Service Intervals in Dubai Heat: What You Need to Know',
    excerpt:
      'Dubai temperatures push every component to the limit. Here is how often your Mercedes really needs servicing in the UAE climate.',
    category: 'Mercedes',
    author: 'DIGI-TEC Workshop',
    date: '2026-04-10',
    readTime: '6 min read',
    coverGradient: 'from-burnt-orange/40 via-charcoal to-black',
    metaTitle: 'Mercedes Service Intervals Dubai | Digitec Performance',
    metaDescription:
      'Learn the right Mercedes service interval for Dubai heat. Expert advice on oil, coolant, and brake intervals from Digitec Performance Center.',
    content: [
      {
        type: 'p',
        text: 'Mercedes-Benz factory service intervals are calibrated for European driving conditions. In Dubai, where ambient temperatures regularly exceed 45°C and stop-and-go traffic stresses every cooling and lubrication system, those intervals need adjustment.',
      },
      { type: 'h2', text: 'Why Dubai Heat Changes Everything' },
      {
        type: 'p',
        text: 'Engine oil breaks down faster under sustained high temperatures. Coolant degrades. Rubber hoses harden. Brake fluid absorbs moisture from the humid coastal air. Every fluid in your car ages quicker here than it would in Stuttgart.',
      },
      { type: 'h2', text: 'Recommended Intervals for the UAE' },
      {
        type: 'ul',
        items: [
          'Engine oil and filter: every 10,000 km or 6 months',
          'Brake fluid: every 18 months (vs factory 24)',
          'Coolant flush: every 3 years',
          'Transmission service: every 60,000 km',
          'AC system inspection: annually before summer',
        ],
      },
      { type: 'h2', text: 'Signs You Should Not Ignore' },
      {
        type: 'p',
        text: 'Dashboard warnings, longer cranking, gearbox hesitation, weak AC, or a faint coolant smell all point to heat-stressed components. Address them early. In Dubai, small issues escalate fast.',
      },
    ],
  },
  {
    slug: 'gad-tuning-explained',
    title: 'GAD Tuning Explained: What Makes It Different',
    excerpt:
      'GAD Motors is one of Germany’s most respected Mercedes tuning houses. Here is what their philosophy means for your car.',
    category: 'Tuning',
    author: 'DIGI-TEC Performance',
    date: '2026-04-08',
    readTime: '7 min read',
    coverGradient: 'from-burnt-orange/50 via-black to-burnt-orange/20',
    metaTitle: 'GAD Tuning Explained | Digitec Performance Center Dubai',
    metaDescription:
      'Discover what makes GAD Motors tuning different. Official GAD partner in Dubai explains the engineering behind every stage.',
    content: [
      {
        type: 'p',
        text: 'GAD Motors built its reputation on one principle: factory reliability with significantly more performance. Their tuning is engineered, not improvised.',
      },
      { type: 'h2', text: 'The GAD Philosophy' },
      {
        type: 'p',
        text: 'Every GAD remap starts from the original Mercedes calibration. Engineers map fuel, ignition, boost, and torque limiters individually for each engine variant. Nothing is generic.',
      },
      { type: 'h2', text: 'What You Actually Get' },
      {
        type: 'ul',
        items: [
          'Custom ECU files developed on dyno, not downloaded',
          'Hardware kits matched to UAE fuel quality',
          'Full warranty package backed by GAD Germany',
          'Reversibility: factory file always preserved',
        ],
      },
      { type: 'h2', text: 'Why It Matters in Dubai' },
      {
        type: 'p',
        text: 'Heat reduces air density, which kills turbo efficiency. GAD calibrations account for this with corrected boost curves and adjusted enrichment, so you get the promised performance even in August.',
      },
    ],
  },
  {
    slug: 'why-ceramic-coating-matters-uae',
    title: 'Why Ceramic Coating Matters in the UAE',
    excerpt:
      'Sun, sand, and salt air destroy paint faster than anywhere else. Ceramic coating is not optional in the Gulf, it is essential.',
    category: 'Detailing',
    author: 'DIGI-TEC Detailing',
    date: '2026-04-05',
    readTime: '5 min read',
    coverGradient: 'from-charcoal via-burnt-orange/30 to-black',
    metaTitle: 'Ceramic Coating UAE | Digitec Performance Center Dubai',
    metaDescription:
      'Learn why ceramic coating is essential for cars in the UAE. Protection from sun, sand, and salt by Digitec Performance Center Dubai.',
    content: [
      {
        type: 'p',
        text: 'Three forces work against your paint in the UAE: ultraviolet radiation, abrasive sand, and salt-laden coastal humidity. A ceramic coating addresses all three in a single application.',
      },
      { type: 'h2', text: 'What Ceramic Coating Actually Does' },
      {
        type: 'p',
        text: 'It bonds chemically to the clear coat, forming a hydrophobic, UV-resistant layer measured in microns but engineered to last years. Water beads off. Dust releases easily. Bird droppings and tree sap cannot etch the paint.',
      },
      { type: 'h2', text: 'Coating vs Wax vs PPF' },
      {
        type: 'ul',
        items: [
          'Wax: cheap, lasts weeks, no real protection',
          'Ceramic coating: chemical bond, 2 to 5 years, gloss + UV defence',
          'PPF: physical film, blocks rock chips, ideal for front clip',
          'Best result: PPF on impact zones, ceramic over the rest',
        ],
      },
      { type: 'h2', text: 'What to Expect at Digitec' },
      {
        type: 'p',
        text: 'Full paint correction first, then a multi-layer ceramic system applied in a controlled environment. The car cures for 24 to 48 hours. After that, washing becomes a 15-minute job.',
      },
    ],
  },
];

export const getBlogPostBySlug = (slug: string) =>
  blogPosts.find((p) => p.slug === slug);
