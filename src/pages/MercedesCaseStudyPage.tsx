import { ArrowRight, CheckCircle2, MessageCircle } from 'lucide-react';
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
        {
          ...buildWebPage({
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
          ...(caseStudy.evidence.reviewedBy ? {
            reviewedBy: {
              '@type': 'Person',
              name: caseStudy.evidence.reviewedBy.name,
              jobTitle: caseStudy.evidence.reviewedBy.role,
            },
            lastReviewed: caseStudy.evidence.reviewedBy.reviewedOn,
          } : {}),
        },
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

  const formatDate = (value: string) => new Intl.DateTimeFormat('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
  }).format(new Date(`${value}T00:00:00Z`));
  const reviewer = caseStudy.evidence.reviewedBy;
  const whatsappText = encodeURIComponent(`Hi, I read your ${caseStudy.vehicle} repair case study. My Mercedes model/year is ____. The symptom I want checked is ____.`);

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
      <Header hasArabicVersion={false} />
      <main>
        <nav aria-label="Breadcrumb" className="border-b border-white/5">
          <ol className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 px-4 py-4 text-xs text-white/50 sm:px-6">
            <li><Link to="/" className="hover:text-burnt-orange">Home</Link></li><li aria-hidden="true">/</li>
            <li><Link to={MERCEDES_HUB_PATH} className="hover:text-burnt-orange">Mercedes-Benz</Link></li><li aria-hidden="true">/</li>
            <li className="text-white/80">{caseStudy.vehicle} case study</li>
          </ol>
        </nav>
        <section className="border-b border-white/10 bg-gradient-to-br from-charcoal/40 to-black py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <p className="eyebrow mb-5">Real vehicle · documented workshop evidence</p>
            <h1 className="max-w-5xl text-3xl font-black sm:text-5xl">{caseStudy.title}</h1>
            <p className="mt-5 max-w-4xl text-lg leading-relaxed text-white/70">{caseStudy.customerComplaint}</p>
            <p className="mt-5 text-sm text-white/50">By <Link to="/about" className="underline decoration-white/25 underline-offset-4 hover:text-burnt-orange">DIGI-TEC Workshop</Link> · Published {formatDate(caseStudy.datePublished)}{caseStudy.dateModified ? ` · Updated ${formatDate(caseStudy.dateModified)}` : ''}</p>
            {reviewer ? <p className="mt-2 text-sm text-white/55">Technical review: {reviewer.name}, {reviewer.role} · {formatDate(reviewer.reviewedOn)}</p> : null}
            <dl className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                ['Vehicle', caseStudy.vehicle],
                ['Model year', caseStudy.modelYear],
                ['Engine / platform', caseStudy.enginePlatform],
                ['Repair completed', formatDate(caseStudy.evidence.repairCompletedOn)],
              ].map(([label, value]) => (
                <div key={label} className="card-premium rounded-xl p-4"><dt className="text-xs font-bold uppercase tracking-wider text-burnt-orange">{label}</dt><dd className="mt-2 text-white/75">{value}</dd></div>
              ))}
            </dl>
            <div className="mt-8 rounded-2xl border border-burnt-orange/30 bg-burnt-orange/[0.08] p-5 sm:p-6">
              <h2 className="text-xl font-black">Repair outcome</h2>
              <p className="mt-3 max-w-4xl leading-relaxed text-white/75">{caseStudy.result}</p>
            </div>
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
                  {items.length ? items.map((item) => <li key={item} className="flex gap-3 leading-relaxed text-white/70"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-burnt-orange" aria-hidden="true" />{item}</li>) : <li className="leading-relaxed text-white/70">No replacement parts recorded for this repair.</li>}
                </ul>
              </section>
            ))}
          </div>
          <section className="mt-14 border-t border-white/10 pt-10">
            <h2 className="text-2xl font-black">Explore this Mercedes model, symptom and repair service</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {[caseStudy.relatedModel, caseStudy.relatedProblemGuide, caseStudy.relatedService].map((item) => (
                <Link key={item.path} to={item.path} className="card-premium group rounded-xl p-5 font-bold hover:text-burnt-orange">{item.label} <ArrowRight className="ml-1 inline h-4 w-4" /></Link>
              ))}
            </div>
          </section>
          <section className="mt-10 rounded-2xl border border-burnt-orange/30 bg-burnt-orange/[0.08] p-5 sm:p-7">
            <h2 className="text-2xl font-black">Does your Mercedes have a similar symptom?</h2>
            <p className="mt-4 max-w-3xl leading-relaxed text-white/65">This record describes the findings on one vehicle. Send your model, year, warning message and when the symptom occurs so the workshop can confirm the appropriate inspection for your car.</p>
            <a href={`https://wa.me/97143402223?text=${whatsappText}`} target="_blank" rel="noopener noreferrer" data-cta-placement="mercedes_case_study" className="btn-primary mt-6 inline-flex items-center gap-2"><MessageCircle className="h-4 w-4" aria-hidden="true" /> Discuss a Mercedes inspection</a>
            <a href="tel:+97143402223" className="ml-0 mt-4 block text-sm text-white/70 hover:text-burnt-orange sm:ml-6 sm:inline-block">Call +971 4 340 2223</a>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MercedesCaseStudyPage;
