export interface VerifiedProtectionProject {
  id: string;
  service: 'ppf' | 'ceramic';
  vehicle: string;
  brandPath: string;
  initialCondition: string;
  workPerformed: string;
  result: string;
  image: { src: string; alt: string; width: number; height: number };
  /** Only an existing published case-study route; never an invented URL. */
  caseStudyPath?: string;
  verified: true;
  /** Real job record and permission/provenance for the imagery. */
  evidence: string[];
}

// Workshop photographs alone do not establish coating or film installations.
export const verifiedProtectionProjects: VerifiedProtectionProject[] = [];
