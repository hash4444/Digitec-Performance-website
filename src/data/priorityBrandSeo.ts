export interface PriorityBrandSeo {
  title: string;
  description: string;
  heroImage?: string;
  heroImageAlt?: string;
  heroImageWidth?: number;
  heroImageHeight?: number;
  supportingImages?: Array<{
    src: string;
    alt: string;
    caption: string;
    width: number;
    height: number;
  }>;
}

/**
 * Search-focused metadata for the brand pages Digi-Tec is actively growing.
 * Keep workshop claims vehicle-specific: supported diagnostics, parts and the
 * final repair scope are confirmed from the VIN and inspection.
 */
export const PRIORITY_BRAND_SEO: Record<string, PriorityBrandSeo> = {
  'maybach-service-dubai': {
    title: 'Maybach Service & Repair Dubai | Digi-Tec Workshop',
    description: 'Maybach service and repair in Dubai for S-Class, GLS, S580 and S680. Vehicle-specific diagnostics, suspension, AC and mechanical care in Al Quoz.',
    heroImage: '/images/maybach-service-dubai-hero.jpg',
    heroImageAlt: 'Mercedes-Maybach receiving specialist service at Digi-Tec workshop in Dubai',
    heroImageWidth: 1200,
    heroImageHeight: 1600,
  },
  'porsche-service-dubai': {
    title: 'Porsche Service & Repair Dubai | Digi-Tec Workshop',
    description: 'Porsche service and repair in Dubai for 911, Cayenne, Macan, Panamera, Cayman and Taycan, with diagnostics, PDK, brakes and suspension care in Al Quoz.',
    heroImage: '/images/porsche-service-dubai-hero.jpg',
    heroImageAlt: 'Porsche GT3 RS inside the Digi-Tec specialist workshop in Dubai',
    heroImageWidth: 1200,
    heroImageHeight: 1600,
  },
  'bmw-service-dubai': {
    title: 'BMW Service & Repair Dubai | Independent BMW Workshop | DIGI-TEC',
    description: 'BMW service, repair, diagnostics and maintenance in Al Quoz, Dubai. DIGI-TEC inspects BMW engine, transmission, brakes, AC, electrical and coding concerns. Book via WhatsApp.',
  },
  'lamborghini-service-dubai': {
    title: 'Lamborghini Service & Repair Dubai | DIGI-TEC',
    description: 'Lamborghini service and repair in Al Quoz, Dubai. Discuss maintenance, diagnostics and repairs for your model with DIGI-TEC. Request a service assessment.',
    heroImage: '/images/lamborghini-service-dubai-hero.jpg',
    heroImageAlt: 'Lamborghini receiving specialist inspection at Digi-Tec workshop in Dubai',
    heroImageWidth: 900,
    heroImageHeight: 1600,
  },
  'range-rover-service-dubai': {
    title: 'Range Rover Repair Dubai | JLR Specialist Workshop',
    description: 'Range Rover repair and service in Dubai for Range Rover, Sport, Velar and Evoque. JLR diagnostics, air suspension, cooling and ZF care in Al Quoz.',
    heroImage: '/images/range-rover-service-dubai-hero.jpg',
    heroImageAlt: 'Range Rover inside the Digi-Tec specialist workshop in Al Quoz, Dubai',
    heroImageWidth: 941,
    heroImageHeight: 1672,
  },
  'defender-service-dubai': {
    title: 'Defender Service & Repair Dubai | Digi-Tec Workshop',
    description: 'Land Rover Defender service and repair in Dubai for Defender 90, 110, 130, V8 and OCTA, including diagnostics, suspension, cooling and driveline care.',
    heroImage: '/images/defender-service-dubai-hero.jpg',
    heroImageAlt: 'Land Rover Defender receiving workshop inspection at Digi-Tec in Dubai',
    heroImageWidth: 901,
    heroImageHeight: 1600,
  },
  'rolls-royce-service-dubai': {
    title: 'Rolls-Royce Service & Repair Dubai | DIGI-TEC',
    description: 'Independent Rolls-Royce service and repair in Al Quoz, Dubai. Contact DIGI-TEC for maintenance, diagnostics and a vehicle-specific service estimate.',
  },
  'bentley-service-dubai': {
    title: 'Bentley Service & Repair Dubai | Digi-Tec Workshop',
    description: 'Bentley service and repair in Dubai for Continental GT, Flying Spur and Bentayga, including diagnostics, W12 and V8 systems, suspension and gearbox care.',
    heroImage: '/images/bentley-service-dubai-hero.jpg',
    heroImageAlt: 'Bentley Flying Spur inside the Digi-Tec specialist workshop in Dubai',
    heroImageWidth: 941,
    heroImageHeight: 1672,
  },
  'aston-martin-service-dubai': {
    title: 'Aston Martin Service Dubai | Repair & Diagnostics',
    description: 'Aston Martin service and repair in Dubai for Vantage, DB11, DB12, DBS and DBX, including diagnostics, V8 and V12 systems, brakes and transmission care.',
    heroImage: '/images/aston-martin-service-dubai-hero.jpg',
    heroImageAlt: 'Aston Martin Vantage undergoing inspection at Digi-Tec workshop in Dubai',
    heroImageWidth: 941,
    heroImageHeight: 1672,
    supportingImages: [
      {
        src: '/images/aston-martin-service-dubai-workshop.jpg',
        alt: 'Aston Martin Vantage rear view inside a Dubai automotive workshop',
        caption: 'Aston Martin inspection in the workshop, with the exact diagnostic and repair scope confirmed from the vehicle before work begins.',
        width: 941,
        height: 1672,
      },
    ],
  },
  'ferrari-service-dubai': {
    title: 'Ferrari Service & Repair Dubai | DIGI-TEC',
    description: 'Ferrari service and repair in Dubai at DIGI-TEC. Independent diagnostics, maintenance, engine, transmission, brake, suspension and electrical work in Al Quoz.',
    heroImage: '/images/ferrari-service-dubai-hero.jpg',
    heroImageAlt: 'Ferrari receiving a mechanical inspection at DIGI-TEC workshop in Dubai',
    heroImageWidth: 941,
    heroImageHeight: 1672,
  },
  'mclaren-service-dubai': {
    title: 'McLaren Service & Repair Dubai | DIGI-TEC',
    description: 'McLaren service and repair enquiries in Al Quoz, Dubai. Discuss maintenance, diagnostics and vehicle-specific repairs with DIGI-TEC. Request an assessment.',
  },
  'maserati-service-dubai': {
    title: 'Maserati Service & Repair Dubai | Digi-Tec Workshop',
    description: 'Maserati service and repair in Dubai for Ghibli, Quattroporte, Levante, Grecale, GranTurismo and MC20, with diagnostics and mechanical care in Al Quoz.',
    heroImage: '/images/maserati-service-dubai-hero.jpg',
    heroImageAlt: 'Maserati Ghibli inside the Digi-Tec specialist workshop in Dubai',
    heroImageWidth: 941,
    heroImageHeight: 1672,
  },
  'cadillac-service-dubai': {
    title: 'Cadillac Service & Repair Dubai | Digi-Tec Al Quoz',
    description: 'Cadillac service and repair in Dubai for Escalade, CT4, CT5, XT models and Lyriq, including diagnostics, AC, suspension, brakes and mechanical inspection.',
  },
};

export const PRIORITY_BRAND_SLUGS = Object.keys(PRIORITY_BRAND_SEO);

export const getPriorityBrandSeo = (slug?: string) =>
  slug ? PRIORITY_BRAND_SEO[slug] : undefined;
