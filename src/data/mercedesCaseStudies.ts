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

export interface MercedesCaseStudyReviewer {
  name: string;
  role: string;
  reviewedOn: string;
}

/** These confirmations must come from the workshop before a record is published. */
export interface MercedesCaseStudyEvidence {
  repairCompletedOn: string;
  workshopRecordsVerified: true;
  publicationApproved: true;
  originalMediaApproved: true;
  reviewedBy?: MercedesCaseStudyReviewer;
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
  evidence: MercedesCaseStudyEvidence;
}

const isDate = (value: unknown): value is string =>
  typeof value === 'string'
  && /^\d{4}-\d{2}-\d{2}$/.test(value)
  && !Number.isNaN(Date.parse(`${value}T00:00:00Z`))
  && new Date(`${value}T00:00:00Z`).toISOString().slice(0, 10) === value;

const isText = (value: unknown): value is string =>
  typeof value === 'string'
  && value.trim().length > 0
  && !/\b(?:TODO|TBC|TBD|lorem ipsum|replace me|example only)\b/i.test(value);

/** Fail the build instead of exposing an incomplete draft as a verified repair. */
export function validateMercedesCaseStudy(study: MercedesCaseStudy): string[] {
  const issues: string[] = [];
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(study.slug ?? '')) issues.push('slug must be a lowercase URL slug');
  const textFields = ['title', 'metaTitle', 'metaDescription', 'vehicle', 'modelYear', 'enginePlatform', 'customerComplaint', 'faultIdentified', 'result'] as const;
  for (const field of textFields) {
    if (!isText(study[field])) issues.push(`${field} must contain real publication-ready text`);
  }
  const listFields = ['symptoms', 'initialInspection', 'diagnosticProcess', 'repairPerformed', 'testingAfterRepair'] as const;
  for (const field of listFields) {
    if (!Array.isArray(study[field]) || !study[field].length || study[field].some((item) => !isText(item))) {
      issues.push(`${field} must contain documented findings or work`);
    }
  }
  if (!Array.isArray(study.partsComponentsUsed) || study.partsComponentsUsed.some((part) => !isText(part))) {
    issues.push('partsComponentsUsed must be a list of real parts, or an empty list when none were replaced');
  }
  if (!isDate(study.datePublished)) issues.push('datePublished must be a real ISO calendar date');
  if (study.dateModified && (!isDate(study.dateModified) || study.dateModified < study.datePublished)) {
    issues.push('dateModified must be a real date on or after datePublished');
  }
  const evidence = study.evidence;
  if (!evidence || !isDate(evidence.repairCompletedOn) || evidence.repairCompletedOn > study.datePublished) {
    issues.push('a documented repair completion date on or before publication is required');
  }
  for (const confirmation of ['workshopRecordsVerified', 'publicationApproved', 'originalMediaApproved'] as const) {
    if (evidence?.[confirmation] !== true) issues.push(`${confirmation} must be confirmed by the workshop`);
  }
  if (evidence?.reviewedBy) {
    const reviewer = evidence.reviewedBy;
    if (!isText(reviewer.name) || !isText(reviewer.role) || !isDate(reviewer.reviewedOn)
      || reviewer.reviewedOn < evidence.repairCompletedOn
      || reviewer.reviewedOn > (study.dateModified ?? study.datePublished)) {
      issues.push('reviewer attribution requires a real name, role and valid review date');
    }
  }
  if (!Array.isArray(study.workshopImages) || !study.workshopImages.length || study.workshopImages.some((image) =>
    !/^\/images\/(?!.*\.\.)[^?#]+\.(?:avif|webp|jpe?g|png)$/i.test(image?.src ?? '')
    || !isText(image?.alt) || !isText(image?.caption))) {
    issues.push('at least one approved local workshop image with alt text and caption is required');
  }
  for (const field of ['relatedService', 'relatedModel', 'relatedProblemGuide'] as const) {
    const link = study[field];
    if (!link || !isText(link.label) || !/^\/(?!\/)[^?]*$/.test(link.path)) {
      issues.push(`${field} must link to the relevant existing website page`);
    }
  }
  return issues;
}

export function defineMercedesCaseStudies(records: MercedesCaseStudy[]): MercedesCaseStudy[] {
  const seen = new Set<string>();
  for (const study of records) {
    const issues = validateMercedesCaseStudy(study);
    if (seen.has(study.slug)) issues.push('slug must be unique');
    if (issues.length) throw new Error(`Mercedes case study ${study.slug || '(missing slug)'}: ${issues.join('; ')}`);
    seen.add(study.slug);
  }
  return records;
}

// Add only genuine, approved records. Drafts and intake files belong outside src.
export const mercedesCaseStudies: MercedesCaseStudy[] = defineMercedesCaseStudies([]);

export const getMercedesCaseStudy = (slug: string) =>
  mercedesCaseStudies.find((caseStudy) => caseStudy.slug === slug);

export const getMercedesCaseStudiesForPath = (path: string) =>
  mercedesCaseStudies.filter((study) =>
    [study.relatedModel, study.relatedProblemGuide, study.relatedService].some((link) => link.path === path));
