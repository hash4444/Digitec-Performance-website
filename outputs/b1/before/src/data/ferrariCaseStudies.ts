export interface FerrariCaseStudy {
  slug: string;
  title: string;
  vehicle: string;
  modelYear: string;
  enginePlatform: string;
  customerComplaint: string;
  symptoms: string[];
  initialInspection: string[];
  diagnosticFindings: string[];
  cause: string;
  recommendedRepair: string[];
  workPerformed: string[];
  verification: string[];
  images: Array<{ src: string; alt: string }>;
  relatedModelPath?: string;
  relatedServicePaths: string[];
  relatedGuidePaths: string[];
  verified: true;
}

/**
 * Publish only documented workshop vehicles with verified notes and imagery.
 * An empty collection intentionally keeps unverified case studies out of routes,
 * sitemaps and internal-link modules.
 */
export const ferrariCaseStudies: FerrariCaseStudy[] = [];

export const getFerrariCaseStudyBySlug = (slug: string) =>
  ferrariCaseStudies.find((study) => study.slug === slug);
