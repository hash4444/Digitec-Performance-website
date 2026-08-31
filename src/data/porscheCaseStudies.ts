export interface PorscheCaseStudy {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  vehicle: string;
  model: string;
  generation?: string;
  modelYear?: string;
  engine?: string;
  transmission?: string;
  mileage?: string;
  customerComplaint: string;
  symptoms: string[];
  initialInspection: string[];
  diagnosticProcess: string[];
  faultIdentified: string;
  repairPerformed: string[];
  components: string[];
  testing: string[];
  result: string;
  workshopImages: { src: string; alt: string; caption: string }[];
  relatedModel: { label: string; path: string };
  relatedSystem?: { label: string; path: string };
  relatedProblem?: { label: string; path: string };
  relatedService: { label: string; path: string };
  datePublished: string;
}

/**
 * Intentionally empty. Add a record only after the workshop supplies a real job
 * sheet, outcome and DIGI-TEC-owned images. Empty data creates no sitemap URL.
 */
export const porscheCaseStudies: PorscheCaseStudy[] = [];
export const getPorscheCaseStudy = (slug: string) => porscheCaseStudies.find((item) => item.slug === slug);
