import { Navigate, useLocation } from 'react-router-dom';
import { Footer } from '@/components/Footer';
import Header from '@/components/Header';
import { LocalizedLink as Link } from '@/components/LocalizedLink';
import TuningConfigurationDetails from '@/components/TuningConfigurationDetails';
import TuningModelStageSelector from '@/components/TuningModelStageSelector';
import { getTuningModelByPath, getTuningModelCars } from '@/data/tuningModelPages';
import { tuningModelEditorial, type TuningEditorialSection } from '@/data/tuningModelEditorial';
import { stageLabels } from '@/data/tuningCars';
import { useSeo } from '@/hooks/use-seo';
import { buildBreadcrumb, buildFAQ, buildService, buildWebPage, pageGraph, SITE_URL } from '@/lib/schema';

const TuningModelPage = () => {
  const { pathname } = useLocation();
  const model = getTuningModelByPath(pathname);
  const cars = model ? getTuningModelCars(model) : [];
  const editorial = model ? tuningModelEditorial[model.slug] : undefined;
  const canonical = `${SITE_URL}${model?.path ?? '/tuning'}`;
  const stageNames = [...new Set(cars.flatMap(car => car.availableStages.filter(stage => stage !== 'stock').map(stage => stageLabels[stage])))];
  const hasVehicleImage = model?.slug !== 'mercedes-amg-s65';
  const image = hasVehicleImage ? model?.image : '/images/tuning-hero-bg.jpg';
  const graph = model ? pageGraph([
    buildWebPage({ url: canonical, name: model.metaTitle, description: model.metaDescription, breadcrumbId: `${canonical}#breadcrumb`, primaryImage: image, mainEntityId: `${canonical}#service` }),
    buildBreadcrumb(canonical, [{ name: 'Home', url: `${SITE_URL}/` }, { name: 'Performance Tuning Dubai', url: `${SITE_URL}/tuning` }, { name: model.shortName, url: canonical }]),
    buildService({ url: canonical, name: model.h1, serviceType: `${model.name} ECU tuning and configuration-specific performance packages`, description: model.metaDescription, image, brand: cars[0]?.brand === 'Mercedes' ? 'Mercedes-Benz' : cars[0]?.brand, offers: stageNames.map(stage => `${model.shortName} ${stage} package`), areaServed: ['Dubai'] }),
    buildFAQ(canonical, model.faqs),
  ]) : undefined;

  useSeo({ title: model?.metaTitle ?? 'Performance Tuning Dubai | Digi-Tec', description: model?.metaDescription ?? 'Vehicle-specific performance tuning packages at DIGITEC in Al Quoz, Dubai.', canonical, ogImage: image ?? '/images/tuning-hero-bg.jpg', ogImageAlt: hasVehicleImage && model ? `${model.name} vehicle illustration for the tuning package guide` : 'DIGITEC performance tuning', hasArabicVersion: false, jsonLd: graph });
  if (!model || !editorial || cars.length !== model.carIds.length) return <Navigate to="/tuning" replace />;

  const whatsappHref = `https://wa.me/97143402223?text=${encodeURIComponent(`Hello DIGITEC, I would like to enquire about ${model.name} performance tuning. My VIN is ____, model year is ____, fuel is ____ and current modifications are ____.`)}`;
  const stock = cars[0].stages.stock!.spec;
  const firstStage = cars[0].stages.stage1!.spec;

  const renderSection = (section: TuningEditorialSection) => {
    switch (section) {
      case 'platform': return <section key={section} id="vehicle-compatibility" data-model-section={section} className="tm-section tm-platform"><div className="tm-container">
        <div className="tm-section-heading"><div><p className="tm-eyebrow">Start with the right vehicle</p><h2>{model.shortName}: engine and generation compatibility</h2></div></div>
        <dl className="tm-platform-facts"><div><dt>Engine record</dt><dd>{model.engine}</dd></div><div><dt>Platform</dt><dd>{model.generation || 'Confirm year and variant by VIN'}</dd></div><div><dt>Listed options</dt><dd>{stageNames.join(' · ')}</dd></div></dl>
        {cars.length > 1 && <div className="tm-variant-cards">{cars.map(car => <article key={car.id}><p className="tm-eyebrow">{car.engine}</p><h3>{car.name}</h3><p>{car.stages.stock!.spec.hp} HP / {car.stages.stock!.spec.torque} Nm stock reference</p><p>Stage 1: {car.stages.stage1!.spec.hp} HP / {car.stages.stage1!.spec.torque} Nm</p></article>)}</div>}
        <div className="tm-prose">{model.platformNotes.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
      </div></section>;
      case 'selector': return <TuningModelStageSelector key={`${model.slug}-selector`} cars={cars} modelName={model.name} heading={`${model.shortName} stock vs tuned: compare stages`} />;
      case 'engineering': return <section key={section} id="tuning-engineering" data-model-section={section} className="tm-section tm-engineering"><div className="tm-container">
        <p className="tm-eyebrow">{editorial.concept}</p><h2>{editorial.focusTitle}</h2><p className="tm-section-intro">{editorial.focusIntro}</p>
        <div className="tm-engineering-grid">{editorial.highlights.map((item, index) => <article key={item.label}><span className="tm-index" aria-hidden="true">0{index + 1}</span><h3>{item.label}</h3><p>{item.body}</p></article>)}</div>
        <div className="tm-prose tm-package-story"><h3>{model.packageHeading}</h3>{model.packageExplanation.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
        {editorial.caution && <aside className="tm-notice"><h3>Drivetrain specification to confirm</h3><p>{editorial.caution}</p></aside>}
      </div></section>;
      case 'guide': return <section key={section} id="upgrade-planning" data-model-section={section} className="tm-section tm-guide"><div className="tm-container">
        <p className="tm-eyebrow">Before choosing your package</p><h2>{editorial.guideTitle}</h2>
        <ol className="tm-guide-list">{editorial.guide.map((item, index) => <li key={item.title}><span className="tm-index" aria-hidden="true">0{index + 1}</span><div><h3>{item.title}</h3><p>{item.body}</p></div></li>)}</ol>
        <a href={whatsappHref} data-cta-placement="tuning_model_planning" target="_blank" rel="noopener noreferrer" className="tm-text-link">Plan your {model.shortName} tune with DIGITEC <span aria-hidden="true">↗</span></a>
      </div></section>;
      case 'packages': return <div key={section} data-model-section={section} className="tm-packages"><TuningConfigurationDetails cars={cars} isArabic={false} heading={`${model.shortName} tuning packages: full specifications and prices`} /></div>;
    }
  };

  return <div className={`site-page tuning-model-page tm-${model.slug} min-h-screen bg-black text-off-white`} data-tuning-concept={model.slug}>
    <Header />
    <main>
      <nav aria-label="Breadcrumb" className="tm-breadcrumb"><ol className="tm-container"><li><Link to="/">Home</Link></li><li aria-hidden="true">/</li><li><Link to="/tuning">Performance tuning</Link></li><li aria-hidden="true">/</li><li aria-current="page">{model.shortName}</li></ol></nav>
      <section className="tm-hero theme-dark-section">
        <div className="tm-container tm-hero-grid">
          <div className="tm-hero-copy"><p className="tm-eyebrow">{editorial.kicker} · Dubai</p><h1>{model.h1}</h1><p className="tm-hero-intro">{model.intro}</p><div className="tm-hero-actions"><a href="#stage-advisor" className="btn-primary">Explore tuning stages</a><a href={whatsappHref} data-cta-placement="tuning_model_hero" target="_blank" rel="noopener noreferrer" className="btn-secondary">Enquire on WhatsApp</a></div><p className="tm-small">Al Quoz Industrial Area 3 · Vehicle-specific ECU tuning and hardware planning</p></div>
          <div className="tm-hero-visual">{hasVehicleImage ? <img src={model.image} alt={`${model.name} vehicle illustration`} width="640" height="400" {...{ fetchpriority: 'high' }} loading="eager" /> : <div className="tm-engine-identity" aria-label="M279 V12 engine platform"><span>Mercedes-AMG</span><strong>V12</strong><span>M279 · S65</span></div>}<div className="tm-hero-reference"><span>{cars.length > 1 ? 'GT/GTS Stage 1 reference' : 'Stage 1 package reference'}</span><strong>{firstStage.hp}<small>HP</small></strong><span>from {stock.hp} HP stock · {firstStage.torque} Nm</span><span>Confirm exact variant and vehicle condition</span></div></div>
        </div>
      </section>
      <nav aria-label={`${model.shortName} page sections`} className="tm-local-nav"><div className="tm-container"><a href="#vehicle-compatibility">Compatibility</a><a href="#stage-advisor">Compare stages</a><a href="#tuning-engineering">Engineering</a><a href="#performance-packages">Packages & prices</a><a href="#tuning-questions">Questions</a></div></nav>
      {editorial.sectionOrder.map(renderSection)}
      <section className="tm-section tm-assessment"><div className="tm-container tm-assessment-grid"><div><p className="tm-eyebrow">DIGITEC × GAD Motors</p><h2>Define the complete tuning project</h2></div><div className="tm-prose"><p>GAD Motors lists DIGITEC as a UAE contact in Al Quoz, Dubai. Where a package names GAD software or components, the calibration supplier, component specification and installation scope should be identified in your written proposal.</p><p>Fuel, engine health, software version, existing modifications and component compatibility affect the proposed work. The published EUR prices and time estimates describe the listed packages; confirm the final scope, currency and schedule with the workshop.</p><Link to="/tuning#gad-tuning-dubai" className="tm-text-link">GAD Motors tuning at DIGITEC <span aria-hidden="true">↗</span></Link></div></div></section>
      <section id="tuning-questions" className="tm-section tm-faq"><div className="tm-container"><p className="tm-eyebrow">Model-specific answers</p><h2>{model.shortName} ECU tuning questions</h2><div className="tm-faq-grid">{model.faqs.map(faq => <article key={faq.question}><h3>{faq.question}</h3><p>{faq.answer}</p></article>)}</div></div></section>
      <section className="tm-section tm-contact"><div className="tm-container"><p className="tm-eyebrow">Your car. Your specification.</p><h2>Discuss your {model.shortName} tuning in Dubai</h2><p className="tm-section-intro">Send your VIN, model year, fuel and current modifications to DIGITEC Performance Center in Al Quoz. We can review the matching package and agree the work before an appointment.</p><div className="tm-hero-actions"><a href={whatsappHref} data-cta-placement="tuning_model_final" target="_blank" rel="noopener noreferrer" className="btn-primary">Request a tuning quotation</a><a href="tel:+97143402223" data-cta-placement="tuning_model_phone" className="btn-secondary">Call +971 4 340 2223</a></div><nav aria-label="Related tuning and workshop resources"><ul className="tm-related-links"><li><Link to="/tuning">Performance tuning Dubai: ECU remapping and all supported models</Link></li><li><Link to={`/tuning#${cars[0].id}-packages`}>{model.shortName} in the main tuning configurator</Link></li><li><Link to={model.brandHub.path}>{model.brandHub.label}</Link></li>{model.relatedLinks.map(link => <li key={link.path}><Link to={link.path}>{link.label}</Link></li>)}</ul></nav></div></section>
    </main>
    <Footer />
  </div>;
};

export default TuningModelPage;
