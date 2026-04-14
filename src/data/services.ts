export interface ServiceData {
  slug: string;
  title: string;
  description: string;
  image: string;
  category: string;
  details: string;
}

export const services: ServiceData[] = [
  {
    slug: 'mercedes-repair',
    title: 'Mercedes Repair',
    description: 'Factory-standard repair tailored for high-performance vehicles.',
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&h=600&fit=crop',
    category: 'Core Mechanical Services',
    details: 'Our Mercedes-Benz specialists deliver factory-standard diagnostics and repair using genuine OEM parts. From AMG performance tuning to routine servicing, we handle all models including C-Class, E-Class, S-Class, GLE, and GLC. Every repair follows Mercedes-Benz workshop protocols to maintain your warranty and vehicle integrity.',
  },
  {
    slug: 'mechanical-repair',
    title: 'Mechanical Repair',
    description: 'Precision work on all internal systems, from belts to blocks.',
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&h=600&fit=crop',
    category: 'Core Mechanical Services',
    details: 'Comprehensive mechanical repair covering engine rebuilds, timing belt/chain replacement, gasket repairs, coolant system overhauls, and drivetrain servicing. Our technicians use precision tooling and diagnostic equipment to identify and resolve issues at the root cause — not just the symptoms.',
  },
  {
    slug: 'transmission-services',
    title: 'Transmission Services',
    description: 'Full diagnostics, clutch replacement, and gear optimization.',
    image: '/lovable-uploads/b56133bf-55e4-4bc9-884f-15f732132259.png',
    category: 'Core Mechanical Services',
    details: 'Full-spectrum transmission care including automatic and manual gearbox repair, CVT servicing, clutch replacement, torque converter rebuilds, and transmission fluid flushes. We perform complete diagnostics before any work to ensure accurate, cost-effective repairs.',
  },
  {
    slug: 'suspension-repair',
    title: 'Suspension Repair',
    description: 'Smooth, responsive ride quality, tuned for control and comfort.',
    image: '/lovable-uploads/0f7fde8d-a57b-45bc-bb10-c80f98525682.png',
    category: 'Core Mechanical Services',
    details: 'Restore ride comfort and handling precision with our suspension services. We cover shock absorber and strut replacement, spring repairs, control arm bushings, sway bar links, and full suspension geometry alignment for all vehicle types.',
  },
  {
    slug: 'steering-repair',
    title: 'Steering Repair',
    description: 'Refined alignment and steering system recalibration.',
    image: '/lovable-uploads/b8278b01-7cf1-43fb-ae22-3f731c36cec5.png',
    category: 'Core Mechanical Services',
    details: 'Expert steering system repair including power steering pump replacement, rack and pinion repair, tie rod replacement, steering column service, and electronic power steering (EPS) diagnostics. We ensure precise, responsive steering feel.',
  },
  {
    slug: 'brake-system-repairs',
    title: 'Brake System Repairs',
    description: 'Peak stopping power with OEM or performance-grade parts.',
    image: '/lovable-uploads/99d04ebd-5104-40f5-961d-f26cff7f2030.png',
    category: 'Core Mechanical Services',
    details: 'Safety-critical brake servicing including pad and rotor replacement, brake caliper rebuilds, brake line inspection, ABS module diagnostics, and brake fluid flushes. We use OEM and performance-grade parts for maximum stopping power.',
  },
  {
    slug: 'routine-maintenance',
    title: 'Routine Maintenance',
    description: 'Scheduled servicing to preserve engine health and performance.',
    image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=800&h=600&fit=crop',
    category: 'Core Mechanical Services',
    details: "Scheduled maintenance packages tailored to your vehicle's manufacturer recommendations. Includes multi-point inspections, fluid top-ups, filter replacements, belt checks, and digital service records to keep your car running at peak performance.",
  },
  {
    slug: 'oil-change-service',
    title: 'Oil Change Service',
    description: 'Premium oils, maximum efficiency, extended engine life.',
    image: '/lovable-uploads/b25532a7-eae9-45ae-b8bf-425984dbfa6d.png',
    category: 'Core Mechanical Services',
    details: 'Premium oil change service using fully synthetic, semi-synthetic, or manufacturer-specified oils. Includes oil filter replacement, fluid level checks, and a complimentary under-hood inspection to catch potential issues early.',
  },
  {
    slug: 'tire-repair',
    title: 'Tire Repair',
    description: 'Balance, alignment, and performance-grade tire fitting.',
    image: '/lovable-uploads/00377e13-62b4-4290-8054-c0aad75b9c00.png',
    category: 'Core Mechanical Services',
    details: 'Complete tire services including puncture repair, tire rotation, wheel balancing, four-wheel alignment, and new tire fitting from leading brands. We help you choose the right tires for your driving style and conditions.',
  },
  {
    slug: 'battery-changes',
    title: 'Battery Changes',
    description: 'Fast, reliable battery replacements with top-tier brands.',
    image: '/lovable-uploads/c1c2c5d8-fd7e-4d38-945c-e52315b4229e.png',
    category: 'Core Mechanical Services',
    details: 'Fast, professional battery replacement with top-tier brands. Includes electrical system testing, alternator output check, and terminal cleaning. We stock batteries for all vehicle types and can handle start-stop system batteries.',
  },
  {
    slug: 'exhaust-repair',
    title: 'Exhaust Repair',
    description: 'Smooth airflow, roaring tone, and emissions compliance.',
    image: '/lovable-uploads/b400327f-926f-4da6-97f8-cff91a39e3ec.png',
    category: 'Core Mechanical Services',
    details: 'Full exhaust system services from catalytic converter repair to muffler replacement, exhaust manifold gaskets, and DPF cleaning. We ensure optimal exhaust flow, emissions compliance, and that signature engine tone.',
  },
  {
    slug: 'car-programming-diagnostic',
    title: 'Car Programming & Diagnostic',
    description: 'ECU coding, resets, and full digital system inspection.',
    image: '/lovable-uploads/150c684d-11eb-476b-b768-afe7cad297cc.png',
    category: 'Diagnostics & Electrical',
    details: 'Advanced ECU coding, key programming, module initialization, and full OBD-II diagnostics. We use dealer-level scan tools to read fault codes, perform live data analysis, and reset service indicators across all makes and models.',
  },
  {
    slug: 'electrical-system-repairs',
    title: 'Electrical System Repairs',
    description: 'Power delivery and sensor calibration to factory spec.',
    image: '/lovable-uploads/9f435c28-2f08-437b-99ad-2252d8ea2071.png',
    category: 'Diagnostics & Electrical',
    details: 'Comprehensive electrical diagnostics and repair covering alternators, starters, wiring harnesses, fuse boxes, lighting systems, window regulators, and sensor calibration. We trace and resolve even the most complex electrical faults.',
  },
  {
    slug: 'fuel-system-repair',
    title: 'Fuel System Repair',
    description: 'Optimal fuel delivery, flow, and combustion efficiency.',
    image: '/lovable-uploads/678fdd1f-2841-4606-8533-51f82257a4a0.png',
    category: 'Diagnostics & Electrical',
    details: 'Fuel system diagnostics and repair including injector cleaning/replacement, fuel pump service, fuel filter replacement, fuel rail pressure testing, and throttle body cleaning for optimal combustion efficiency and fuel economy.',
  },
  {
    slug: 'ac-repair-maintenance',
    title: 'AC Repair & Maintenance',
    description: 'Climate control diagnostics, refrigerant refills, and compressor tuning.',
    image: '/lovable-uploads/9db7fc3e-a988-4b9d-a7ab-a6494b58561e.png',
    category: 'Comfort Systems',
    details: 'Complete climate control services including refrigerant recharge, compressor replacement, condenser and evaporator repair, cabin filter replacement, and full system leak detection. Stay comfortable in any weather.',
  },
  {
    slug: 'car-body-repair',
    title: 'Car Body Repair',
    description: 'Precision repair for dents, cracks, scrapes, and frame issues.',
    image: '/lovable-uploads/car-body-repair-v2.png',
    category: 'Body & Visual Work',
    details: "Precision body repair for dents, scratches, scrapes, cracked bumpers, and minor collision damage. We use paintless dent removal, panel beating, and filler techniques to restore your vehicle's appearance to factory condition.",
  },
  {
    slug: 'car-paint-protection',
    title: 'Car Paint & Protection',
    description: 'Flawless finish. Ceramic coat. Paint protection films available.',
    image: '/lovable-uploads/f1cfe23e-d23b-4717-9f75-a07199716d98.png',
    category: 'Body & Visual Work',
    details: 'Professional paint correction, ceramic coating application, and paint protection film (PPF) installation. We offer full-body or partial wraps, color-matched touch-ups, and multi-layer ceramic coatings for lasting shine and protection.',
  },
];

export const getServiceBySlug = (slug: string): ServiceData | undefined => {
  return services.find((s) => s.slug === slug);
};
