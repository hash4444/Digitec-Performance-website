import { LocalizedLink as Link } from '@/components/LocalizedLink';
import { verifiedProtectionProjects, type VerifiedProtectionProject } from '@/data/paintCareProjects';

export default function ProtectionProjects({ service, className }: { service: VerifiedProtectionProject['service']; className: string }) {
  const projects = verifiedProtectionProjects.filter((project) => project.service === service && project.verified && project.evidence.length > 0);
  if (!projects.length) return null;
  return <section className={className} aria-labelledby={`${service}-projects-heading`}>
    <h2 id={`${service}-projects-heading`}>{service === 'ppf' ? 'Recent PPF Work' : 'Recent Ceramic Coating Work'}</h2>
    <div className="grid gap-8 sm:grid-cols-2">{projects.map((project) => <article key={project.id}>
      <h3>{project.vehicle}</h3>
      <img {...project.image} loading="lazy" decoding="async" />
      <p><strong>Initial condition:</strong> {project.initialCondition}</p>
      <p><strong>Work performed:</strong> {project.workPerformed}</p>
      <p><strong>Result:</strong> {project.result}</p>
      <div className="flex flex-wrap gap-4"><Link to={project.brandPath} className="underline">Explore the vehicle’s brand workshop</Link>{project.caseStudyPath && <Link to={project.caseStudyPath} className="underline">Read the documented project</Link>}</div>
    </article>)}</div>
  </section>;
}
