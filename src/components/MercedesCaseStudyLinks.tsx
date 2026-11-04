import { ArrowRight } from 'lucide-react';
import { LocalizedLink as Link } from '@/components/LocalizedLink';
import { getMercedesCaseStudiesForPath, mercedesCaseStudies } from '@/data/mercedesCaseStudies';

/** The section only exists once approved workshop records have been supplied. */
export const MercedesCaseStudyLinks = ({ path, limit = 3 }: { path?: string; limit?: number }) => {
  const studies = (path ? getMercedesCaseStudiesForPath(path) : mercedesCaseStudies)
    .slice()
    .sort((a, b) => b.datePublished.localeCompare(a.datePublished))
    .slice(0, limit);
  if (!studies.length) return null;

  return (
    <section aria-label="Documented Mercedes workshop repairs" className="rounded-2xl border border-white/10 bg-charcoal/20 p-5 sm:p-7">
      <p className="eyebrow mb-3">From the workshop</p>
      <h2 className="text-2xl font-black">Documented Mercedes repair cases</h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/60">Follow a real vehicle from the reported symptom through diagnostic findings, the agreed repair and checks afterward.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {studies.map((study) => (
          <Link key={study.slug} to={`/mercedes/case-studies/${study.slug}`} className="group rounded-xl border border-white/10 bg-black/20 p-5">
            <p className="text-xs text-white/50">{study.modelYear} · {study.vehicle}</p>
            <h3 className="mt-2 font-bold group-hover:text-burnt-orange">{study.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/60">{study.result}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-burnt-orange">Read the repair record <ArrowRight className="h-4 w-4" aria-hidden="true" /></span>
          </Link>
        ))}
      </div>
    </section>
  );
};
