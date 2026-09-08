import { verifiedPaintProjects, type VerifiedPaintProject } from '@/data/paintCorrectionContent';
import { LocalizedLink as Link } from '@/components/LocalizedLink';

export function PaintProjectComparison({ project }: { project: VerifiedPaintProject }) {
  if (!project.verified || !project.evidence.length) return null;
  return (
    <article className="paint-project">
      <h3>{project.vehicle}</h3>
      <div className="paint-project-pair">
        <figure><img {...project.before} loading="lazy" decoding="async" /><figcaption>Before · {project.initialCondition}</figcaption></figure>
        <figure><img {...project.after} loading="lazy" decoding="async" /><figcaption>After · {project.result}</figcaption></figure>
      </div>
      <p><strong>Service performed:</strong> {project.service}</p>
      <div className="flex flex-wrap gap-4"><Link to={project.brandPath} className="paint-link">Explore the vehicle’s brand workshop</Link>{project.caseStudyPath && <Link to={project.caseStudyPath} className="paint-link">Read the documented project</Link>}</div>
    </article>
  );
}

export default function PaintCorrectionProjects() {
  const projects = verifiedPaintProjects.filter((project) => project.verified && project.evidence.length > 0);
  if (!projects.length) return null;
  return <section id="paint-projects" className="paint-section" aria-labelledby="paint-projects-title"><p className="paint-kicker">Documented workshop results</p><h2 id="paint-projects-title">Recent Paint Correction & Polishing Work</h2>{projects.map((project) => <PaintProjectComparison key={project.id} project={project} />)}</section>;
}
