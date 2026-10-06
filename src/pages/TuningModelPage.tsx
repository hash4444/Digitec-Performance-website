import { Navigate, useLocation } from 'react-router-dom';
import { Footer } from '@/components/Footer';
import Header from '@/components/Header';
import { LocalizedLink as Link } from '@/components/LocalizedLink';
import TuningConfigurationDetails from '@/components/TuningConfigurationDetails';
import { getTuningModelByPath, getTuningModelCars } from '@/data/tuningModelPages';
import { stageLabels } from '@/data/tuningCars';
import { useSeo } from '@/hooks/use-seo';
import { buildBreadcrumb, buildFAQ, buildService, buildWebPage, pageGraph, SITE_URL } from '@/lib/schema';

const TuningModelPage = () => {
  const { pathname } = useLocation();
  const model = getTuningModelByPath(pathname);
  const cars = model ? getTuningModelCars(model) : [];
  const canonical = `${SITE_URL}${model?.path ?? '/tuning'}`;
  const stageNames = [...new Set(cars.flatMap(car => car.availableStages.filter(stage => stage !== 'stock').map(stage => stageLabels[stage])))];
  const graph = model ? pageGraph([
    buildWebPage({
      url: canonical,
      name: model.metaTitle,
      description: model.metaDescription,
      breadcrumbId: `${canonical}#breadcrumb`,
      primaryImage: model.image,
      mainEntityId: `${canonical}#service`,
    }),
    buildBreadcrumb(canonical, [
      { name: 'Home', url: `${SITE_URL}/` },
      { name: 'Performance Tuning Dubai', url: `${SITE_URL}/tuning` },
      { name: model.shortName, url: canonical },
    ]),
    buildService({
      url: canonical,
      name: model.h1,
      serviceType: `${model.name} ECU tuning and configuration-specific performance packages`,
      description: model.metaDescription,
      image: model.image,
      brand: cars[0]?.brand === 'Mercedes' ? 'Mercedes-Benz' : cars[0]?.brand,
      offers: stageNames.map(stage => `${model.shortName} ${stage} package`),
      areaServed: ['Dubai'],
    }),
    buildFAQ(canonical, model.faqs),
  ]) : undefined;

  useSeo({
    title: model?.metaTitle ?? 'Performance Tuning Dubai | Digi-Tec',
    description: model?.metaDescription ?? 'Vehicle-specific performance tuning packages at DIGI-TEC in Al Quoz, Dubai.',
    canonical,
    ogImage: model?.image ?? '/images/tuning-hero-bg.jpg',
    ogImageAlt: model ? `${model.name} listed in the DIGI-TEC Performance Configurator` : undefined,
    hasArabicVersion: false,
    jsonLd: graph,
  });

  if (!model || cars.length !== model.carIds.length) return <Navigate to="/tuning" replace />;

  const whatsappText = encodeURIComponent(`Hi, I would like to discuss ${model.name} tuning at DIGI-TEC. My VIN is ____, model year is ____, current modifications are ____ and I am interested in ____.`);

  return (
    <div className="site-page min-h-screen bg-black text-off-white">
      <Header />
      <main>
        <nav aria-label="Breadcrumb" className="border-b border-white/10">
          <ol className="mx-auto flex max-w-7xl flex-wrap gap-2 px-5 py-5 text-xs text-white/60 sm:px-8">
            <li><Link to="/" className="hover:text-burnt-orange">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link to="/tuning" className="hover:text-burnt-orange">Performance tuning</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">{model.shortName}</li>
          </ol>
        </nav>

        <section className="border-b border-white/10 bg-[#101113]">
          <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1.35fr_0.65fr]">
            <div>
              <p className="home-kicker mb-4">Vehicle-specific tuning · Al Quoz, Dubai</p>
              <h1 className="text-3xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl">{model.h1}</h1>
              <p className="mt-6 text-base leading-8 text-white/70">{model.intro}</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a href={`https://wa.me/97143402223?text=${whatsappText}`} target="_blank" rel="noopener noreferrer" className="btn-primary">Discuss your tuning package</a>
                <a href="#performance-packages" className="btn-secondary">Compare stages and prices</a>
              </div>
              <p className="mt-4 text-sm leading-7 text-white/55">Send the VIN, model year, software details and existing modifications so the workshop can confirm the vehicle and proposed scope.</p>
            </div>
            <img src={model.image} alt={model.name} width="640" height="400" className="mx-auto h-auto w-full max-w-md object-contain" loading="eager" />
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16" aria-labelledby="supported-platform">
          <h2 id="supported-platform" className="text-2xl font-semibold sm:text-3xl">Supported engine and vehicle specification</h2>
          <dl className="mt-6 grid gap-5 border-y border-white/10 py-6 sm:grid-cols-3">
            <div><dt className="text-sm text-white/50">Engine</dt><dd className="mt-1 font-semibold">{model.engine}</dd></div>
            <div><dt className="text-sm text-white/50">Generation / platform</dt><dd className="mt-1 font-semibold">{model.generation || 'Confirm exact vehicle by VIN'}</dd></div>
            <div><dt className="text-sm text-white/50">Available tuning options</dt><dd className="mt-1 text-sm font-semibold leading-7">{stageNames.join(' · ')}</dd></div>
          </dl>
          <div className="mt-6 max-w-4xl space-y-4 text-base leading-8 text-white/65">
            {model.platformNotes.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </section>

        <section className="border-y border-white/10 bg-charcoal/20">
          <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
            <h2 className="text-2xl font-semibold sm:text-3xl">{model.packageHeading}</h2>
            <div className="mt-6 max-w-4xl space-y-4 text-base leading-8 text-white/65">
              {model.packageExplanation.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>
        </section>

        <TuningConfigurationDetails cars={cars} isArabic={false} heading={`${model.shortName} stages, performance and prices`} />

        <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16" aria-labelledby="vehicle-assessment">
          <h2 id="vehicle-assessment" className="text-2xl font-semibold sm:text-3xl">Confirm the package for your vehicle</h2>
          <div className="mt-6 max-w-4xl space-y-4 text-base leading-8 text-white/65">
            <p>The figures, package contents, prices and time estimates above belong to the identified configurator entries. Fuel, vehicle condition, software version, existing modifications, component compatibility and the agreed installation scope must be reviewed before a result or completion date is confirmed.</p>
            <p>The package lists identify included work. Any additional required or optional hardware should be recorded in the written proposal after the vehicle is assessed. Prices remain in euros as published; a final quotation should clarify the exact scope and currency.</p>
            <p>Where the listed package names GAD components or software, ask DIGI-TEC to identify the calibration supplier, component specification and validation work in the agreed project. Read more about <Link to="/tuning#gad-tuning-dubai" className="text-burnt-orange hover:underline">GAD Motors and performance projects at DIGI-TEC</Link>.</p>
          </div>
        </section>

        <section className="border-y border-white/10 bg-charcoal/20">
          <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
            <h2 className="text-2xl font-semibold sm:text-3xl">{model.shortName} tuning questions</h2>
            <div className="mt-7 max-w-4xl space-y-7">
              {model.faqs.map(faq => <div key={faq.question}><h3 className="text-lg font-semibold">{faq.question}</h3><p className="mt-2 text-sm leading-7 text-white/65">{faq.answer}</p></div>)}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
          <h2 className="text-2xl font-semibold sm:text-3xl">Plan your next step with DIGI-TEC</h2>
          <p className="mt-5 max-w-4xl text-base leading-8 text-white/65">Contact DIGI-TEC Performance Center L.L.C. in Al Quoz Industrial Area 3, Dubai, with your vehicle details and preferred package. The team can review compatibility, condition and the scope before an appointment is agreed.</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a href={`https://wa.me/97143402223?text=${whatsappText}`} target="_blank" rel="noopener noreferrer" className="btn-primary">Request a vehicle-specific quotation</a>
            <a href="tel:+97143402223" className="btn-secondary">Call +971 4 340 2223</a>
          </div>
          <ul className="mt-8 space-y-3 text-sm">
            <li><Link to="/tuning" className="font-semibold text-burnt-orange hover:underline">Performance tuning Dubai: services and all supported packages</Link></li>
            <li><Link to={`/tuning#${cars[0].id}-packages`} className="text-burnt-orange hover:underline">Find {model.shortName} in the master configurator package list</Link></li>
            <li><Link to={model.brandHub.path} className="text-burnt-orange hover:underline">{model.brandHub.label}</Link></li>
            {model.relatedLinks.map(link => <li key={link.path}><Link to={link.path} className="text-burnt-orange hover:underline">{link.label}</Link></li>)}
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TuningModelPage;
