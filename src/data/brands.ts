export interface Brand {
  name: string;
  slug: string;
  logo: string;
  intro: string;
  specialization: string;
}

export const brands: Brand[] = [
  {
    name: 'Mercedes-Benz',
    slug: 'mercedes-benz-service-dubai',
    logo: '/lovable-uploads/a6f453f2-f2c5-4140-8f2a-bfa3401611d7.png',
    specialization: 'AMG Performance & Star Diagnostics',
    intro:
      "Digi-Tec Performance Centre has been the trusted choice for Mercedes-Benz owners across Dubai for over two decades. Our certified technicians use genuine parts and Star Diagnostics to keep every model, from C-Class to AMG GT, performing at factory standards and beyond.",
  },
  {
    name: 'Maybach',
    slug: 'maybach-service-dubai',
    logo: '/lovable-uploads/5cc5b8af-7dd9-46a9-9ee2-3e5b14fda559.png',
    specialization: 'Ultra-Luxury Comfort & Precision Service',
    intro:
      "Maybach demands the highest standard of care, and Digi-Tec delivers exactly that. From chauffeur-driven sedans to private ownership, we provide white-glove maintenance, advanced diagnostics, and bespoke detailing tailored to the marque's ultra-luxury heritage.",
  },
  {
    name: 'Porsche',
    slug: 'porsche-service-dubai',
    logo: '/lovable-uploads/8e7e2545-680e-42ac-bd97-ba1f9c063649.png',
    specialization: 'GT3 & Turbo Powertrain Tuning',
    intro:
      "From 911 GT3 track cars to Cayenne daily drivers, Digi-Tec is Dubai's destination for Porsche service. Our specialists handle PDK transmissions, turbocharger systems, and chassis alignment with the precision Stuttgart engineering deserves.",
  },
  {
    name: 'Audi',
    slug: 'audi-service-dubai',
    logo: '/lovable-uploads/a3e92dde-70a9-499b-a7b0-ae0df117baf9.png',
    specialization: 'Quattro Systems & RS Performance',
    intro:
      "Digi-Tec services the full Audi range, from A4 sedans to RS6 Avants and R8 supercars. Our team is equipped for Quattro drivetrain work, S Tronic gearbox service, and RS-grade performance upgrades using genuine VAG components.",
  },
  {
    name: 'BMW',
    slug: 'bmw-service-dubai',
    logo: '/lovable-uploads/d66ea83e-7d6a-4c19-bf30-f27eca93ac8e.png',
    specialization: 'M Series Optimization & iDrive Coding',
    intro:
      "BMW owners in Dubai trust Digi-Tec for everything from routine 5 Series maintenance to full M Series performance builds. Our workshop is equipped with the latest ISTA diagnostic tools, iDrive coding capability, and genuine BMW parts inventory.",
  },
  {
    name: 'Lamborghini',
    slug: 'lamborghini-service-dubai',
    logo: '/lovable-uploads/8c4046ee-9977-417a-90a9-820452146832.png',
    specialization: 'V10 & V12 Specialists',
    intro:
      "Whether it's a Huracán, Urus, or Aventador, Digi-Tec has the specialists, the lift capacity, and the patience to service Lamborghini's V10 and V12 platforms. We handle major services, carbon-ceramic brake work, and bespoke aesthetic enhancements.",
  },
  {
    name: 'Bentley',
    slug: 'bentley-service-dubai',
    logo: '/lovable-uploads/b2cd5f78-8a43-4a9b-8a0a-19124642ca5a.png',
    specialization: 'Continental & Flying Spur Excellence',
    intro:
      "Bentley craftsmanship deserves equally meticulous service. Digi-Tec supports the entire Bentley range, including Continental GT, Flying Spur, and Bentayga, with W12 powertrain expertise, air suspension service, and interior preservation work.",
  },
  {
    name: 'McLaren',
    slug: 'mclaren-service-dubai',
    logo: '/lovable-uploads/7f8d98f4-3581-451c-bfaf-262eb67cf14b.png',
    specialization: 'Carbon Fiber & Turbo V8 Mastery',
    intro:
      "Digi-Tec is one of the few Dubai workshops equipped to service McLaren's MonoCell carbon chassis and twin-turbo V8 platform. From 570S to 720S to Artura, we handle scheduled service, fluid changes, and performance recalibration in a controlled environment.",
  },
  {
    name: 'Ferrari',
    slug: 'ferrari-service-dubai',
    logo: '/lovable-uploads/11f29482-f2d3-4278-ae2a-397044a1ff95.png',
    specialization: 'F1 ECU Tuning & Performance Calibration',
    intro:
      "Ferrari ownership is a relationship, and Digi-Tec treats every Prancing Horse with the reverence it deserves. We service the full range, including 488, F8, SF90, and Roma, with factory-grade diagnostics, F1 transmission expertise, and genuine OEM parts.",
  },
  {
    name: 'Bugatti',
    slug: 'bugatti-service-dubai',
    logo: '/lovable-uploads/69bd2660-e800-47b4-bc4d-de6e6b65b984.png',
    specialization: 'Quad Turbo Optimization & Luxury Diagnostics',
    intro:
      "Servicing a Bugatti requires a level of precision few workshops can match. Digi-Tec works on Veyron and Chiron platforms with appropriate tooling, climate-controlled bays, and complete confidentiality for every owner.",
  },
  {
    name: 'Land Rover',
    slug: 'land-rover-service-dubai',
    logo: '/lovable-uploads/4bb58917-704a-4c5d-84b6-dc428a00c004.png',
    specialization: 'Terrain Response & Luxury SUV Systems',
    intro:
      "From Range Rover Autobiography to Defender and Discovery, Digi-Tec services the full Land Rover lineup. Our specialists handle air suspension, Terrain Response systems, and the supercharged V8 powertrains that define the marque.",
  },
  {
    name: 'Rolls-Royce',
    slug: 'rolls-royce-service-dubai',
    logo: '/lovable-uploads/a4c040e8-740a-4fcb-b837-b86e15c25306.png',
    specialization: 'Quiet, Precise, Luxurious: Inside and Out',
    intro:
      "Rolls-Royce service at Digi-Tec is delivered with the discretion and precision the marque demands. We support Phantom, Ghost, Wraith, and Cullinan with V12 expertise, air suspension service, and meticulous interior preservation.",
  },
  {
    name: 'Aston Martin',
    slug: 'aston-martin-service-dubai',
    logo: '/lovable-uploads/8d3bad14-09df-4ef1-86c6-13cfcba7042b.png',
    specialization: 'British Elegance & V12 Precision',
    intro:
      "Digi-Tec services the full Aston Martin range, from DB11 grand tourers to Vantage performance cars and DBX SUVs. Our workshop is equipped for V8 and V12 powertrain work, ZF transmission service, and genuine parts replacement.",
  },
];

export const getBrandBySlug = (slug: string) => brands.find((b) => b.slug === slug);

export const getSlugForOrbitName = (orbitName: string): string | undefined => {
  // Map BrandsWeServe display names to brand slugs.
  const map: Record<string, string> = {
    'Range Rover': 'land-rover-service-dubai',
    'Rolls Royce': 'rolls-royce-service-dubai',
  };
  if (map[orbitName]) return map[orbitName];
  return brands.find((b) => b.name === orbitName)?.slug;
};