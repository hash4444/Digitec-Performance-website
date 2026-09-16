import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowRight, Check, ChevronRight, MapPin, MessageCircle, Phone } from 'lucide-react';
import Header from '@/components/Header';
import { Footer } from '@/components/Footer';
import ProtectionProjects from '@/components/ProtectionProjects';
import { formatVerifiedStartingPrice } from '@/lib/verified-pricing';
import { LocalizedLink as Link } from '@/components/LocalizedLink';
import PpfQuoteForm from '@/components/PpfQuoteForm';
import { useSeo } from '@/hooks/use-seo';
import { buildBreadcrumb, buildService, buildWebPage, pageGraph, SITE_URL } from '@/lib/schema';
import { brands } from '@/data/brands';
import { PPF_PATH, PPF_TITLE, PPF_DESCRIPTION, PPF_H1, PPF_WHATSAPP, ppfCoverage, ppfFaqs, ppfBrandNames } from '@/data/ppfContent';
import '@/styles/ppf.css';

const url = `${SITE_URL}${PPF_PATH}`;
const heroImage = '/images/ppf/film-application-1200.webp';
const heroAlt = 'Transparent film being smoothed over a white Porsche bonnet';
const ppfBrands = ppfBrandNames.map((name) => brands.find((brand) => brand.name === name)).filter(Boolean);
const graph = pageGraph([
  buildWebPage({ url, name: PPF_TITLE, description: PPF_DESCRIPTION, breadcrumbId: `${url}#breadcrumb`, primaryImage: heroImage, mainEntityId: `${url}#service`, dateModified: '2026-09-16' }),
  buildBreadcrumb(url, [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: 'Paint Protection Film', url }]),
  buildService({ url, name: PPF_H1, serviceType: 'Paint Protection Film (PPF) installation', description: 'DIGI-TEC Performance Center offers paint protection film installation with full-body and selected-panel coverage at Al Quoz Industrial Area 3, Dubai. Film, preparation and covered panels are confirmed in the quotation.', image: heroImage }),
]);

function WhatsApp({ children = 'Get Your PPF Quote', placement }: { children?: React.ReactNode; placement: string }) {
  return <a href={PPF_WHATSAPP} target="_blank" rel="noopener noreferrer" data-cta-placement={`ppf_${placement}`} className="ppf-button ppf-button-primary"><MessageCircle size={19} aria-hidden="true" />{children}</a>;
}

const process = [
  ['Assess the paint', 'Discuss your car, existing paint condition and the areas you want to protect. Previous repairs or paint defects may affect preparation and suitability.'],
  ['Agree the scope', 'Confirm the chosen film, covered panels, preparation, cutting method and edge treatment in the quotation before work begins.'],
  ['Prepare and install', 'The paint preparation and film installation method follow the agreed scope for your vehicle and selected product. Any correction work is assessed separately.'],
  ['Review the finish and care', 'Review the optical finish, coverage and film edges with the team. Ask for product-specific washing, maintenance and warranty information at handover.'],
];

export default function PpfPage() {
  const { hash } = useLocation();
  useEffect(() => {
    // Restore a contextual section target after the shared route scroll reset.
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView({ block: 'start', behavior: 'instant' });
  }, [hash]);
  useSeo({ title: PPF_TITLE, description: PPF_DESCRIPTION, canonical: url, ogImage: `${SITE_URL}${heroImage}`, ogImageAlt: heroAlt, ogImageWidth: 1200, ogImageHeight: 1200, jsonLd: graph });
  return (
    <div className="ppf-page min-h-screen bg-black text-off-white">
      <Header />
      <main id="ppf-main">
        <section className="ppf-hero theme-dark-section" aria-labelledby="ppf-heading">
          <div className="ppf-hero-copy">
            <nav className="ppf-breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><ChevronRight size={14} aria-hidden="true" /><Link to="/services">Services</Link><ChevronRight size={14} aria-hidden="true" /><span aria-current="page">Paint Protection Film</span></nav>
            <p className="ppf-eyebrow">DIGI-TEC Performance Center · Al Quoz, Dubai</p>
            <h1 id="ppf-heading">Paint Protection Film <span>(PPF) Dubai</span></h1>
            <p className="ppf-lead">Preserve the paint. Enjoy the drive.</p>
            <p>Car paint protection with PPF for luxury and performance vehicles at DIGI-TEC in Al Quoz, Dubai. Explore full-body and selected-panel film coverage, with preparation agreed for your car.</p>
            <div className="ppf-actions"><WhatsApp placement="hero" /><a href="tel:+97143402223" data-cta-placement="ppf_hero" className="ppf-button ppf-button-secondary"><Phone size={18} aria-hidden="true" />Call the workshop</a></div>
            <a className="ppf-text-link" href="#ppf-quote">Have your car details ready? Build your quote request <ArrowRight size={16} aria-hidden="true" /></a>
          </div>
          <figure className="ppf-hero-image"><img src={heroImage} srcSet="/images/ppf/film-application-640.webp 640w, /images/ppf/film-application-1200.webp 1200w" sizes="(min-width: 1000px) 50vw, 100vw" width={1200} height={1200} alt={heroAlt} fetchPriority="high" /><figcaption>Film application detail</figcaption></figure>
        </section>

        <div className="ppf-proof" aria-label="Workshop and service facts"><div><strong>Al Quoz Industrial Area 3</strong><span>Dubai workshop</span></div><div><strong>Luxury & performance vehicles</strong><span>Independent workshop care</span></div><div><strong>Coverage agreed for your car</strong><span>Film and preparation in the quotation</span></div></div>
        <nav className="ppf-jump" aria-label="On this page"><a href="#ppf-coverage">Coverage</a><a href="#ppf-cost">Price & quote</a><a href="#ppf-process">Process</a><a href="#ppf-care">Care & removal</a><a href="#ppf-comparison">PPF vs coating</a><a href="#ppf-faq">FAQs</a></nav>

        <section className="ppf-section ppf-two-column" aria-labelledby="ppf-definition">
          <div><p className="ppf-eyebrow">A physical layer of protection</p><h2 id="ppf-definition">What Is Paint Protection Film?</h2></div>
          <div><p>Paint protection film, or PPF, is a transparent protective film applied to painted exterior surfaces. It forms a replaceable barrier over the original paint to help reduce damage from small stone impacts, road debris and minor surface abrasion.</p><p>Coverage matters: only the filmed areas receive that barrier. PPF does not repair existing chips or make a car damage-proof. Some films offer a self-healing surface for light marks, subject to the product’s specified conditions.</p></div>
        </section>

        <section id="ppf-coverage" className="ppf-section ppf-tinted" aria-labelledby="coverage-heading">
          <div className="ppf-section-intro"><p className="ppf-eyebrow">Choose where protection matters</p><h2 id="coverage-heading">PPF Coverage Options</h2><p>Start with how you drive and the panels you want to preserve. DIGI-TEC offers full-body, partial-front and selected-panel options; the exact scope is agreed for each car.</p></div>
          <div className="ppf-coverage-grid">{ppfCoverage.map((option, index) => <article key={option.name} className={`ppf-coverage-card ${index === 0 ? 'ppf-coverage-featured' : ''}`}><span className="ppf-eyebrow">0{index + 1} / {option.eyebrow}</span><h3>{option.title}</h3><p>{option.description}</p><p><strong>Consider it:</strong> {option.suitable}</p><p className="ppf-small">{option.detail}</p>{formatVerifiedStartingPrice(option) && <p className="ppf-price font-semibold">{formatVerifiedStartingPrice(option)}</p>}<a href="#ppf-quote" className="ppf-text-link">Discuss {index === 0 ? 'full-body' : index === 1 ? 'front' : 'partial'} coverage <ArrowRight size={16} aria-hidden="true" /></a></article>)}</div>
          <div className="ppf-full-body"><div><h3>Full Body PPF in Dubai</h3><p>For owners seeking full car PPF in Dubai, broad coverage helps protect paint beyond the front impact zones. Doors, rear panels and other agreed painted surfaces can also benefit from a physical barrier against everyday light abrasion.</p><p>“Full body” describes a coverage plan. It does not automatically include every trim piece, light, glass surface or hidden edge. Review a panel-by-panel scope with the workshop, including preparation for previous repairs and the finish you want.</p></div><WhatsApp placement="full_body">Ask About Full Body PPF</WhatsApp></div>
        </section>

        <section className="ppf-section ppf-two-column" aria-labelledby="dubai-heading"><div><p className="ppf-eyebrow">Paint care for local driving</p><h2 id="dubai-heading">Why PPF Makes Sense in Dubai</h2></div><div><p>Frequent journeys on Sheikh Zayed Road and other Dubai highways expose forward-facing panels to road debris. Sand and dust also accumulate between washes, and rubbing a dry surface can create abrasion. PPF can help reduce some of that wear on covered paint.</p><p>Intense sun and heat make product selection and care relevant too. UV, staining and heat-related properties vary by film; ask for the selected product’s guidance. Careful washing remains essential, especially for high-value cars whose original paint you want to preserve.</p></div></section>

        <section className="ppf-section ppf-tinted ppf-two-column" aria-labelledby="finish-heading"><div><p className="ppf-eyebrow">Appearance & film choice</p><h2 id="finish-heading">Clear, Matte & Satin PPF: What Changes?</h2></div><div><p><strong>Clear gloss PPF</strong> is intended to retain the paint’s colour and glossy appearance. <strong>Matte PPF</strong> gives a flatter look, while <strong>satin PPF</strong> has a softer sheen between matte and gloss. These are finish categories, and the result depends on the underlying paint and film.</p><p>Ask DIGI-TEC which finishes are available for your car and request a sample of the selected product. Self-healing and water-beading properties are film-specific, so confirm them alongside finish, care and any warranty terms.</p><h3>What does self-healing PPF mean?</h3><p>On suitable films, the top surface can reduce light marks under the selected product’s specified conditions. It does not repair a cut, torn film, deep scratch or a chip in the paint underneath. Ask which film is proposed and what care or inspection is needed if a mark remains; do not assume every finish has the same properties.</p></div></section>

        <section id="ppf-process" className="ppf-section" aria-labelledby="process-heading"><p className="ppf-eyebrow">From paint assessment to handover</p><h2 id="process-heading">Our PPF Installation Process</h2><p className="ppf-section-intro">The vehicle’s condition and selected film determine the preparation and installation method. These are the key stages to discuss with the workshop.</p><ol className="ppf-process">{process.map(([title, description], index) => <li key={title}><span aria-hidden="true">0{index + 1}</span><div><h3>{title}</h3><p>{description}</p></div></li>)}</ol></section>

        <section className="ppf-section ppf-tinted ppf-two-column" aria-labelledby="ppf-installers-heading">
          <div><p className="ppf-eyebrow">Review the work behind the quote</p><h2 id="ppf-installers-heading">Choosing Paint Protection Film Installers</h2></div>
          <div>
            <p>Compare installation scope as well as film choice. Ask to see work on similar panel shapes and inspect edges, joins and the finish under good lighting. Discuss visible boundaries before choosing partial-panel coverage.</p>
            <p>Share any repainting, previous film or existing damage during the assessment. Ask how the installer will prepare those areas and whether correction or repair is needed first.</p>
            <p>A useful quote identifies the film, covered panels, exclusions, cutting method and aftercare. Confirm any written product or installation warranty terms separately; the word “PPF” alone does not specify them.</p>
          </div>
        </section>

        <section id="ppf-care" className="ppf-section ppf-two-column" aria-labelledby="ppf-care-heading">
          <div><p className="ppf-eyebrow">After installation</p><h2 id="ppf-care-heading">PPF Care, Lifespan & Removal</h2></div>
          <div>
            <h3>Maintain the film as well as the paint</h3>
            <p>Follow the chosen film’s first-wash interval and approved cleaning guidance. Remove dust gently, avoid dry rubbing and keep pressure-washer jets away from edges. Driving, parking exposure, film choice and care all influence service life; there is no single replacement schedule for every car.</p>
            <h3>When the film needs attention</h3>
            <p>Have lifting edges, persistent staining, cuts or damaged areas assessed. Do not assume an aged or damaged film can be restored by polishing or that a mark has only affected the film. An inspection helps establish whether the affected coverage needs replacement and whether the paint underneath needs work.</p>
            <h3>Can PPF be removed?</h3>
            <p>Yes. Professional removal should follow the film manufacturer’s guidance. Tell the workshop about previous repainting or repairs before a removal method is agreed. The existing film and paint condition need assessment; removal should not be promised as risk-free.</p>
            <p className="ppf-small">If the paint needs attention before new film, discuss <Link to="/services/car-polishing-dubai">polishing and paint correction</Link> or <Link to="/services/car-body-repair-dubai">body and paint repair</Link> according to the damage.</p>
          </div>
        </section>

        <section id="ppf-workshop" className="ppf-section ppf-tinted ppf-workshop" aria-labelledby="workshop-heading"><figure><img src="/images/ppf/workshop-960.webp" srcSet="/images/ppf/workshop-540.webp 540w, /images/ppf/workshop-960.webp 960w" sizes="(min-width: 900px) 42vw, 100vw" width={960} height={1280} loading="lazy" decoding="async" alt="Porsche cars in DIGI-TEC’s workshop bays, with a BMW on a lift behind them" /><figcaption>Inside the DIGI-TEC workshop in Al Quoz. Workshop vehicle photograph; PPF coverage is not documented for these cars.</figcaption></figure><div><p className="ppf-eyebrow">Meet the workshop</p><h2 id="workshop-heading">Why Choose DIGI-TEC for PPF in Dubai?</h2><p>DIGI-TEC Performance Center is an independent Dubai workshop working with luxury and performance vehicles. Paint protection sits alongside paint correction, ceramic coating and bodywork, so existing paint condition can be considered before film is applied.</p><ul className="ppf-checks"><li><Check aria-hidden="true" />Full-body and selected-panel coverage options</li><li><Check aria-hidden="true" />Film, preparation and coverage documented in the estimate</li><li><Check aria-hidden="true" />Related paint-care services in the same workshop</li><li><Check aria-hidden="true" />A workshop location in Al Quoz Industrial Area 3</li></ul><p>Before choosing, ask to see recent PPF work and finish examples relevant to your car and requested coverage.</p><div className="ppf-actions"><Link to="/about" className="ppf-text-link">About DIGI-TEC <ArrowRight size={16} aria-hidden="true" /></Link><a href="#ppf-contact" className="ppf-text-link">Visit the workshop <MapPin size={16} aria-hidden="true" /></a></div></div></section>

        <ProtectionProjects service="ppf" className="ppf-section" />

        <section id="ppf-cost" className="ppf-section ppf-two-column" aria-labelledby="cost-heading"><div><p className="ppf-eyebrow">A quote for your car</p><h2 id="cost-heading">How Much Does PPF Cost in Dubai?</h2><WhatsApp placement="price">Get an Exact PPF Quote for Your Car</WhatsApp></div><div><p>PPF price in Dubai depends on the vehicle and installation scope. A selected-panel application and a full-body installation involve different material, preparation and fitting requirements.</p><dl className="ppf-cost-factors"><div><dt>Vehicle size & shape</dt><dd>Panel area, curves, bumpers and access affect film use and fitting complexity.</dd></div><div><dt>Coverage</dt><dd>The number of panels and whether coverage is partial or complete change the scope.</dd></div><div><dt>Film & finish</dt><dd>The confirmed product and available finish determine material choices and properties.</dd></div><div><dt>Paint preparation</dt><dd>Existing defects, contamination or previous repairs may require assessment and preparation before film.</dd></div></dl><p>Compare quotations using the same covered panels, film, preparation and care terms. A headline price alone does not explain what is included.</p></div></section>

        <section id="ppf-comparison" className="ppf-section ppf-tinted" aria-labelledby="comparison-heading"><p className="ppf-eyebrow">Two different jobs</p><h2 id="comparison-heading">PPF vs Ceramic Coating</h2><p className="ppf-section-intro">Choose film when a physical barrier is the priority. Consider coating for surface behaviour and appearance. Compatible products can be used together.</p><div className="ppf-table-wrap" role="region" aria-label="PPF and ceramic coating comparison" tabIndex={0}><table><caption className="sr-only">How PPF and ceramic coating compare; properties depend on the selected product.</caption><thead><tr><th scope="col">Consideration</th><th scope="col">Paint protection film</th><th scope="col">Ceramic coating</th></tr></thead><tbody>{[
          ['Physical barrier', 'A replaceable film over covered paint', 'A bonded surface treatment'],
          ['Stone chips', 'Can reduce damage from small impacts', 'Not a stone-chip barrier'],
          ['Light abrasion', 'Can reduce surface abrasion; some films self-heal light marks', 'Does not prevent scratches or deep abrasion'],
          ['Water behaviour', 'Depends on the film’s top surface', 'Can improve water beading and ease of cleaning'],
          ['Appearance', 'Clear or sheen-changing finishes, subject to availability', 'Can enhance gloss after appropriate preparation'],
          ['Typical use', 'Preserving paint on impact areas or across the body', 'Supporting cleaning and finish maintenance'],
        ].map(([label, film, coating]) => <tr key={label}><th scope="row">{label}</th><td>{film}</td><td>{coating}</td></tr>)}</tbody></table></div><div className="ppf-actions" aria-label="Related paint care services"><Link to="/services/ceramic-coating" className="ppf-text-link">Explore ceramic coating <ArrowRight size={16} aria-hidden="true" /></Link><Link to="/blog/ceramic-coating-vs-ppf-dubai" className="ppf-text-link">Read the comparison guide <ArrowRight size={16} aria-hidden="true" /></Link></div><p className="ppf-small">Existing swirls or paint defects? Explore <Link to="/services/car-polishing-dubai">car polishing and paint correction</Link> before selecting protection.</p></section>

        <section className="ppf-section" aria-labelledby="brands-heading"><p className="ppf-eyebrow">Keep the original finish in focus</p><h2 id="brands-heading">PPF for Luxury & Performance Cars in Dubai</h2><p className="ppf-section-intro">A daily-driven performance car and a carefully kept weekend car may need different coverage. Discuss how you use the vehicle, its paint condition and the finish you want to retain. Explore DIGI-TEC’s existing brand workshop pages below, then ask about PPF suitability for your model.</p><div className="ppf-brand-links">{ppfBrands.map((brand) => brand && <Link key={brand.slug} to={`/brands/${brand.slug}`}>{brand.name}<ArrowRight size={16} aria-hidden="true" /></Link>)}</div><p className="ppf-small">DIGI-TEC is an independent workshop. Brand names identify the vehicles discussed.</p></section>

        <section id="ppf-quote" className="ppf-section ppf-quote-section" aria-labelledby="quote-heading"><div><p className="ppf-eyebrow">Your car. Your coverage.</p><h2 id="quote-heading">Get Your PPF Quote</h2><p>Share four details so the workshop can discuss suitable film, coverage and preparation. If you are unsure about coverage, choose the closest option and ask the team to help.</p><p>Full-front requests are subject to confirmation for the vehicle. The quotation will identify what is included.</p></div><PpfQuoteForm /></section>

        <section id="ppf-faq" className="ppf-section" aria-labelledby="faq-heading"><p className="ppf-eyebrow">Before you decide</p><h2 id="faq-heading">PPF Questions, Answered</h2><div className="ppf-faqs">{ppfFaqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div></section>

        <section id="ppf-contact" className="ppf-section ppf-tinted ppf-two-column" aria-labelledby="contact-heading"><div><p className="ppf-eyebrow">PPF near you in Dubai</p><h2 id="contact-heading">Talk to DIGI-TEC in Al Quoz</h2><address>DIGI-TEC Performance Center<br />Al Quoz Industrial Area 3<br />Dubai, UAE<br /><a href="tel:+97143402223" data-cta-placement="ppf_contact">+971 4 340 2223</a></address></div><div><p>Send your vehicle details before visiting to discuss the scope and arrange a suitable time. Confirm current opening hours and appointment availability with the workshop.</p><div className="ppf-actions"><WhatsApp placement="contact">WhatsApp DIGI-TEC</WhatsApp><a className="ppf-button ppf-button-secondary" href="https://maps.google.com/?q=Al+Quoz+Industrial+Area+3+Dubai" target="_blank" rel="noopener noreferrer" data-cta-placement="ppf_contact"><MapPin size={18} aria-hidden="true" />View workshop area</a></div><p className="ppf-small"><Link to="/services/paint-protection-dubai">Compare paint-care options</Link> or <Link to="/services">explore all workshop services</Link>.</p></div></section>
      </main>
      <Footer />
      <nav className="ppf-mobile-contact" aria-label="PPF contact shortcuts"><a href={PPF_WHATSAPP} target="_blank" rel="noopener noreferrer" data-cta-placement="ppf_mobile"><MessageCircle size={20} aria-hidden="true" />WhatsApp quote</a><a href="tel:+97143402223" data-cta-placement="ppf_mobile"><Phone size={19} aria-hidden="true" />Call</a></nav>
    </div>
  );
}
