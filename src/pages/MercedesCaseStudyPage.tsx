import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Navigate, useParams } from 'react-router-dom';
import Header from '@/components/Header';
import { Footer } from '@/components/Footer';
import { LocalizedLink as Link } from '@/components/LocalizedLink';
import { getMercedesCaseStudy } from '@/data/mercedesCaseStudies';
import { MERCEDES_HUB_PATH } from '@/data/mercedesModelPages';
import { useSeo } from '@/hooks/use-seo';
import { buildArticle, buildBreadcrumb, buildWebPage, pageGraph, SITE_URL } from '@/lib/schema';

const MercedesCaseStudyPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const caseStudy = slug ? getMercedesCaseStudy(slug) : undefined;
  const canonical = caseStudy ? `${SITE_URL}/mercedes/case-studies/${caseStudy.slug}` : `${SITE_URL}${MERCEDES_HUB_PATH}`;
  const primaryImage = caseStudy?.workshopImages[0]?.src;

  const jsonLd = caseStudy
    ? pageGraph([
        buildWebPage({
          url: canonical,
          name: caseStudy.metaTitle,
          description: caseStudy.metaDescription,
          type: 'ItemPage',
          breadcrumbId: `${canonical}#breadcrumb`,
          primaryImage,
          datePublished: caseStudy.datePublished,
          dateModified: caseStudy.dateModified,
          mainEntityId: `${canonical}#article`,
        }),
        buildBreadcrumb(canonical, [
          { name: 'Home', url: `${SITE_URL}/` },
          { name: 'Mercedes-Benz Repair & Service Dubai', url: `${SITE_URL}${MERCEDES_HUB_PATH}` },
          { name: caseStudy.vehicle, url: canonical },
        ]),
        buildArticle({
          url: canonical,
          headline: caseStudy.title,
          description: caseStudy.metaDescription,
          datePublished: caseStudy.datePublished,
          dateModified: caseStudy.dateModified,
          author: 'DIGI-TEC Workshop',
          authorType: 'Organization',
          image: primaryImage,
          section: 'Verified Mercedes repair case study',
          keywords: `${caseStudy.vehicle}, ${caseStudy.enginePlatform}, Mercedes repair case study Dubai`,
        }),
      ])
    : undefined;

  useSeo({
    title: caseStudy?.metaTitle ?? 'Mercedes-Benz Repair Case Studies | Digi-Tec',
    description: caseStudy?.metaDescription ?? 'Verified Mercedes-Benz workshop case studies from Digi-Tec in Dubai.',
    canonical,
    ogImage: primaryImage,
    ogImageAlt: caseStudy ? `${caseStudy.vehicle} repair case study at Digi-Tec in Dubai` : undefined,
    ogType: 'article',
    jsonLd,
    hasArabicVersion: false,
  });

  if (!caseStudy) return <Navigate to={MERCEDES_HUB_PATH} replace />;

  const sections = [
    ['Customer complaint', [caseStudy.customerComplaint]],
    ['Symptoms', caseStudy.symptoms],
    ['Initial inspection', caseStudy.initialInspection],
    ['Diagnostic process', caseStudy.diagnosticProcess],
    ['Fault identified', [caseStudy.faultIdentified]],
    ['Repair performed', caseStudy.repairPerformed],
    ['Parts and components used', caseStudy.partsComponentsUsed],
    ['Testing after repair', caseStudy.testingAfterRepair],
    ['Result', [caseStudy.result]],
  ] as const;

  return (
    <div className="min-h-screen bg-black text-off-white">
      <Header />
      <main>
        <nav aria-label="Breadcrumb" className="border-b border-white/5">
          <ol className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 px-4 py-4 text-xs text-white/50 sm:px-6">
            <li><Link to="/" className="hover:text-burnt-orange">Home</Link></li><li>/</li>
            <li><Link to={MERCEDES_HUB_PATH} className="hover:text-burnt-orange">Mercedes-Benz</Link></li><li>/</li>
            <li className="text-white/80">{caseStudy.vehicle} case study</li>
          </ol>
        </nav>
        <section className="border-b border-white/10 bg-gradient-to-br from-charcoal/40 to-black py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <p className="eyebrow mb-5">Real vehicle · documented workshop evidence</p>
            <h1 className="max-w-5xl text-3xl font-black sm:text-5xl">{caseStudy.title}</h1>
            <dl className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                ['Vehicle', caseStudy.vehicle],
                ['Model year', caseStudy.modelYear],
                ['Engine / platform', caseStudy.enginePlatform],
              ].map(([label, value]) => (
                <div key={label} className="card-premium rounded-xl p-4"><dt className="text-xs font-bold uppercase tracking-wider text-burnt-orange">{label}</dt><dd className="mt-2 text-white/75">{value}</dd></div>
              ))}
            </dl>
          </div>
        </section>
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          {caseStudy.workshopImages.length > 0 ? (
            <section aria-label="Workshop images" className="mb-14 grid gap-5 sm:grid-cols-2">
              {caseStudy.workshopImages.map((image) => (
                <figure key={image.src} className="overflow-hidden rounded-2xl border border-white/10 bg-charcoal/20">
                  <img src={image.src} alt={image.alt} className="aspect-[4/3] w-full object-cover" loading="lazy" />
                  <figcaption className="p-4 text-sm leading-relaxed text-white/55">{image.caption}</figcaption>
                </figure>
              ))}
            </section>
          ) : null}
          <div className="space-y-10">
            {sections.map(([title, items]) => (
              <section key={title}>
                <h2 className="text-2xl font-black sm:text-3xl">{title}</h2>
                <ul className="mt-5 space-y-3">
                  {items.map((item) => <li key={item} className="flex gap-3 leading-relaxed text-white/70"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-burnt-orange" />{item}</li>)}
                </ul>
              </section>
            ))}
          </div>
          <section className="mt-14 border-t border-white/10 pt-10">
            <h2 className="text-2xl font-black">Follow the evidence path</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {[caseStudy.relatedModel, caseStudy.relatedProblemGuide, caseStudy.relatedService].map((item) => (
                <Link key={item.path} to={item.path} className="card-premium group rounded-xl p-5 font-bold hover:text-burnt-orange">{item.label} <ArrowRight className="ml-1 inline h-4 w-4" /></Link>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MercedesCaseStudyPage;
