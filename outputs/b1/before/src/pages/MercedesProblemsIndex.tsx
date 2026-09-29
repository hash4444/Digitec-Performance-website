import { AlertTriangle, ArrowRight, Gauge, Snowflake, Wrench } from 'lucide-react';
import Header from '@/components/Header';
import { Footer } from '@/components/Footer';
import { LocalizedLink as Link } from '@/components/LocalizedLink';
import { MERCEDES_HUB_PATH } from '@/data/mercedesModelPages';
import { MERCEDES_PROBLEMS_PATH, mercedesProblemGuides } from '@/data/mercedesProblemGuides';
import { useSeo } from '@/hooks/use-seo';
import { buildBreadcrumb, buildWebPage, pageGraph, SITE_URL } from '@/lib/schema';

const categoryFor = (slug: string) => {
  if (slug.includes('airmatic') || slug.includes('suspension')) return { label: 'Suspension', Icon: Gauge };
  if (slug.includes('gearbox') || slug.includes('transmission')) return { label: 'Transmission', Icon: Wrench };
  if (slug.includes('ac-')) return { label: 'Climate', Icon: Snowflake };
  return { label: 'Engine & electrical', Icon: AlertTriangle };
};

const MercedesProblemsIndex = () => {
  const canonical = `${SITE_URL}${MERCEDES_PROBLEMS_PATH}`;
  const listId = `${canonical}#sitemap-list`;
  const metaTitle = 'Mercedes Problems & Diagnostic Guides | Digi-Tec Dubai';
  const metaDescription = 'Practical Mercedes owner guides for AIRMATIC, gearbox jerking, overheating, AC, oil leaks, no-start and battery warnings, with safe next steps.';
  const jsonLd = pageGraph([
    buildWebPage({
      url: canonical,
      name: metaTitle,
      description: metaDescription,
      type: 'CollectionPage',
      breadcrumbId: `${canonical}#breadcrumb`,
      mainEntityId: listId,
      dateModified: '2026-08-31',
    }),
    buildBreadcrumb(canonical, [
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'Mercedes-Benz Repair & Service Dubai', url: `${SITE_URL}${MERCEDES_HUB_PATH}` },
      { name: 'Mercedes Problems & Diagnostic Guides', url: canonical },
    ]),
    {
      '@type': 'ItemList',
      '@id': listId,
      name: 'Mercedes-Benz problem and diagnostic guides',
      numberOfItems: mercedesProblemGuides.length,
      itemListElement: mercedesProblemGuides.map((guide, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: guide.h1,
        item: `${SITE_URL}${guide.path}`,
      })),
    },
  ]);

  useSeo({
    title: metaTitle,
    description: metaDescription,
    canonical,
    ogImage: '/images/mercedes-repair-dubai-hero.jpg',
    ogImageAlt: 'Mercedes diagnostic and repair guides from Digi-Tec Performance Centre in Dubai',
    jsonLd,
    hasArabicVersion: false,
  });

  return (
    <div className="min-h-screen bg-black text-off-white">
      <Header />
      <main>
        <nav aria-label="Breadcrumb" className="border-b border-white/5">
          <ol className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-4 py-4 text-xs text-white/50 sm:px-6">
            <li><Link to="/" className="hover:text-burnt-orange">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link to={MERCEDES_HUB_PATH} className="hover:text-burnt-orange">Mercedes-Benz</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-white/80">Problems & guides</li>
          </ol>
        </nav>

        <section className="relative isolate overflow-hidden border-b border-white/10 py-16 sm:py-24">
          <img src="/images/mercedes-repair-dubai-hero.jpg" alt="Mercedes workshop diagnostics at Digi-Tec in Dubai" className="absolute inset-0 h-full w-full object-cover opacity-20" width="1920" height="1080" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/95 to-black/65" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
            <p className="eyebrow mb-5">Owner-first diagnostic information</p>
            <h1 className="max-w-5xl text-3xl font-black leading-tight sm:text-5xl lg:text-6xl">Mercedes Problems & Diagnostic Guides</h1>
            <p className="mt-6 max-w-4xl text-base leading-relaxed text-white/70 sm:text-xl">Understand what the symptom feels like, what can cause it, when to stop driving and what evidence should support a repair recommendation. These guides inform; the linked service pages handle commercial repair intent.</p>
          </div>
        </section>

        <section className="py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {mercedesProblemGuides.map((guide) => {
                const { label, Icon } = categoryFor(guide.slug);
                return (
                  <Link key={guide.slug} to={guide.path} className="card-premium group flex h-full flex-col rounded-2xl p-5 sm:p-6">
                    <div className="flex items-center justify-between gap-4">
                      <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-burnt-orange"><Icon className="h-4 w-4" /> {label}</span>
                      {guide.urgent ? <span className="text-[0.65rem] font-bold uppercase tracking-wider text-red-300">Driving advice</span> : null}
                    </div>
                    <h2 className="mt-5 text-xl font-black group-hover:text-burnt-orange">{guide.h1}</h2>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-white/60">{guide.summary}</p>
                    <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-burnt-orange">Read diagnostic guide <ArrowRight className="h-4 w-4" /></span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-y border-white/5 bg-charcoal/20 py-14 sm:py-20">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-3">
            {[
              ['1', 'Identify the symptom', 'Record the warning text, temperature, gear, speed, parking duration or other condition that makes it repeatable.'],
              ['2', 'Test the system', 'Combine vehicle-compatible scan data with pressure, voltage, leak, wiring and physical checks relevant to the fault.'],
              ['3', 'Link to the repair', 'Move to the commercial service page only after the likely system and appropriate repair route are understood.'],
            ].map(([number, title, copy]) => (
              <article key={number}>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-burnt-orange font-black text-black">{number}</span>
                <h2 className="mt-5 text-xl font-black">{title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="py-14 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
            <p className="eyebrow mb-4">Need commercial service information?</p>
            <h2 className="text-2xl font-black sm:text-4xl">Return to the Mercedes-Benz service hub</h2>
            <p className="mx-auto mt-4 max-w-3xl text-white/60">The parent hub contains Digi-Tec service coverage, workshop information, booking options and links to the correct Mercedes commercial service page.</p>
            <Link to={MERCEDES_HUB_PATH} className="btn-primary mt-8">Explore Mercedes service & repair</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default MercedesProblemsIndex;
