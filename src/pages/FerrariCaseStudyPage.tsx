import { ArrowRight, CheckCircle2, MessageCircle } from 'lucide-react';
import { Navigate, useParams } from 'react-router-dom';
import Header from '@/components/Header';
import { Footer } from '@/components/Footer';
import { LocalizedLink as Link } from '@/components/LocalizedLink';
import { FERRARI_HUB_PATH } from '@/data/ferrariModelPages';
import { getFerrariCaseStudyBySlug } from '@/data/ferrariCaseStudies';
import { useSeo } from '@/hooks/use-seo';
import { buildArticle, buildBreadcrumb, buildWebPage, pageGraph, SITE_URL } from '@/lib/schema';

const FerrariCaseStudyPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const study = slug ? getFerrariCaseStudyBySlug(slug) : undefined;
  const path = study ? `/ferrari/case-studies/${study.slug}` : FERRARI_HUB_PATH;
  const canonical = `${SITE_URL}${path}`;

  const jsonLd = study
    ? pageGraph([
        buildBreadcrumb(path, [
          { name: 'Home', url: '/' },
          { name: 'Ferrari service Dubai', url: FERRARI_HUB_PATH },
          { name: study.title, url: path },
        ]),
        buildWebPage({
          url: path,
          name: study.title,
          description: `${study.vehicle}: ${study.customerComplaint}`,
          type: 'ItemPage',
          breadcrumbId: `${canonical}#breadcrumb`,
          primaryImage: study.images[0]?.src,
          mainEntityId: `${canonical}#article`,
        }),
        buildArticle({
          url: path,
          headline: study.title,
          description: `${study.vehicle}: ${study.customerComplaint}`,
          author: 'DIGI-TEC Workshop',
          authorType: 'Organization',
          image: study.images[0]?.src,
          section: 'Verified Ferrari case studies',
          keywords: `${study.vehicle}, Ferrari diagnostics Dubai, Ferrari case study`,
        }),
      ])
    : undefined;

  useSeo({
    title: study ? `${study.title} | DIGI-TEC Dubai` : 'Ferrari Case Studies | DIGI-TEC Dubai',
    description: study ? `${study.vehicle}: ${study.customerComplaint}` : 'Verified Ferrari workshop case studies from DIGI-TEC Performance Centre in Dubai.',
    canonical,
    noindex: !study,
    jsonLd,
    hasArabicVersion: false,
  });

  if (!study) return <Navigate to={FERRARI_HUB_PATH} replace />;

  const sections = [
    ['Customer complaint', [study.customerComplaint]],
    ['Symptoms', study.symptoms],
    ['Initial inspection', study.initialInspection],
    ['Diagnostic findings', study.diagnosticFindings],
    ['Confirmed cause', [study.cause]],
    ['Recommended repair', study.recommendedRepair],
    ['Work performed', study.workPerformed],
    ['Post-repair verification', study.verification],
  ] as const;

  return (
    <div className="min-h-screen bg-black text-off-white">
      <Header />
      <main>
        <nav aria-label="Breadcrumb" className="border-b border-white/5">
          <ol className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 px-4 py-4 text-xs text-white/50 sm:px-6">
            <li><Link to="/" className="hover:text-burnt-orange">Home</Link></li><li>/</li>
            <li><Link to={FERRARI_HUB_PATH} className="hover:text-burnt-orange">Ferrari</Link></li><li>/</li>
            <li className="text-white/80">Case study</li>
          </ol>
        </nav>

        <section className="border-b border-white/5 bg-gradient-to-br from-charcoal/30 to-black py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <p className="eyebrow mb-4">Verified workshop case study</p>
            <h1 className="max-w-5xl text-3xl font-black sm:text-5xl">{study.title}</h1>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-white/55">
              <span className="rounded-full border border-white/10 px-4 py-2">{study.vehicle}</span>
              <span className="rounded-full border border-white/10 px-4 py-2">Model year {study.modelYear}</span>
              <span className="rounded-full border border-white/10 px-4 py-2">{study.enginePlatform}</span>
            </div>
          </div>
        </section>

        {study.images.length > 0 && (
          <section className="py-12">
            <div className="mx-auto grid max-w-6xl gap-5 px-4 sm:grid-cols-2 sm:px-6">
              {study.images.map((image) => <img key={image.src} src={image.src} alt={image.alt} className="w-full rounded-2xl border border-white/10 object-cover" loading="lazy" />)}
            </div>
          </section>
        )}

        <section className="py-14 sm:py-20">
          <div className="mx-auto grid max-w-6xl gap-5 px-4 sm:px-6 lg:grid-cols-2">
            {sections.map(([title, items]) => (
              <article key={title} className="card-premium rounded-2xl p-6">
                <h2 className="text-xl font-black">{title}</h2>
                <ul className="mt-4 space-y-3">
                  {items.map((item) => <li key={item} className="flex gap-3 text-sm leading-relaxed text-white/65"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-burnt-orange" /><span>{item}</span></li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="border-y border-white/5 bg-charcoal/15 py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="text-2xl font-black">Related Ferrari information</h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {study.relatedModelPath && <Link to={study.relatedModelPath} className="btn-secondary">Model guide <ArrowRight className="h-4 w-4" /></Link>}
              {[...study.relatedServicePaths, ...study.relatedGuidePaths].map((relatedPath) => <Link key={relatedPath} to={relatedPath} className="btn-secondary">Related page <ArrowRight className="h-4 w-4" /></Link>)}
            </div>
          </div>
        </section>

        <section className="py-16 text-center">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="text-3xl font-black">Discuss a Ferrari concern with DIGI-TEC</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/60">A case study documents one verified vehicle and is not a promise that another vehicle has the same cause or repair.</p>
            <a href="https://wa.me/97143402223" target="_blank" rel="noopener noreferrer" className="btn-primary mt-7"><MessageCircle className="h-4 w-4" /> WhatsApp DIGI-TEC</a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FerrariCaseStudyPage;
