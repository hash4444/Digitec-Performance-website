/**
 * Publication contract for verified Mercedes repair case studies.
 *
 * Keep this collection empty until the workshop supplies a real vehicle,
 * diagnostic record, repair outcome and images. A record added here becomes
 * eligible for routing, internal links and sitemap inclusion.
 */
export interface MercedesCaseStudyImage {
  src: string;
  alt: string;
  caption: string;
}

export interface MercedesCaseStudyLink {
  label: string;
  path: string;
}

export interface MercedesCaseStudy {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  datePublished: string;
  dateModified?: string;
  vehicle: string;
  modelYear: string;
  enginePlatform: string;
  customerComplaint: string;
  symptoms: string[];
  initialInspection: string[];
  diagnosticProcess: string[];
  faultIdentified: string;
  repairPerformed: string[];
  partsComponentsUsed: string[];
  testingAfterRepair: string[];
  result: string;
  workshopImages: MercedesCaseStudyImage[];
  relatedService: MercedesCaseStudyLink;
  relatedModel: MercedesCaseStudyLink;
  relatedProblemGuide: MercedesCaseStudyLink;
}

export const mercedesCaseStudies: MercedesCaseStudy[] = [];

export const getMercedesCaseStudy = (slug: string) =>
  mercedesCaseStudies.find((caseStudy) => caseStudy.slug === slug);
