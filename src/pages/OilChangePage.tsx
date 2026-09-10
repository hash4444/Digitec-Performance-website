import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowDown, ArrowUpRight, Check, MapPin, MessageCircle, Phone, Thermometer, Clock3, Route, TriangleAlert } from 'lucide-react';
import Header from '@/components/Header';
import { Footer } from '@/components/Footer';
import { LocalizedLink as Link } from '@/components/LocalizedLink';
import { useSeo } from '@/hooks/use-seo';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { buildBreadcrumb, buildFAQ, buildService, buildWebPage, pageGraph, SITE_URL } from '@/lib/schema';
import { brands } from '@/data/brands';
import { OIL_CHANGE_PATH, OIL_CHANGE_TITLE, OIL_CHANGE_DESCRIPTION, OIL_CHANGE_H1, OIL_CHANGE_INTRO, OIL_CHANGE_WHATSAPP, OIL_CHANGE_QUOTE, OIL_SERVICE_ADVICE, oilScope, oilProcess, oilBrandPaths, oilFaqs } from '@/data/oilChangeContent';

const url = `${SITE_URL}${OIL_CHANGE_PATH}`;
const graph = pageGraph([
  buildWebPage({ url, name: OIL_CHANGE_TITLE, description: OIL_CHANGE_DESCRIPTION, breadcrumbId: `${url}#breadcrumb`, mainEntityId: `${url}#service` }),
  buildBreadcrumb(url, [{name:'Home', url:'/'}, {name:'Services', url:'/services'}, {name:OIL_CHANGE_H1, url}]),
  buildService({url, name:OIL_CHANGE_H1, serviceType:'Engine oil and oil filter change', description:OIL_CHANGE_INTRO}),
  buildFAQ(url, oilFaqs),
]);

function WhatsApp({ children, placement, quote = false }: {children: React.ReactNode; placement: string; quote?: boolean}) {
  return <a className="oil-button oil-button-primary" href={quote ? OIL_CHANGE_QUOTE : OIL_CHANGE_WHATSAPP} target="_blank" rel="noopener noreferrer" data-cta-placement={`oil_${placement}`}><MessageCircle size={18} aria-hidden="true" />{children}</a>;
}

export default function OilChangePage() {
  const { hash } = useLocation();
  useEffect(() => { if (hash) document.getElementById(hash.slice(1))?.scrollIntoView({block:'start', behavior:'instant'}); }, [hash]);
  useSeo({title:OIL_CHANGE_TITLE, description:OIL_CHANGE_DESCRIPTION, canonical:url, jsonLd:graph});

  return <div className="oil-page"><Header overlay /><main id="main-content">
    <section className="oil-hero oil-shell" aria-labelledby="oil-title">
      <nav className="oil-breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><Link to="/services">Services</Link><span>/</span><span aria-current="page">Oil change</span></nav>
      <div className="oil-hero-grid"><div className="oil-hero-copy">
        <p className="oil-kicker"><span />Engine oil + filter / Al Quoz</p>
        <h1 id="oil-title">Car Oil Change <span>in Dubai</span></h1>
        <p className="oil-lead">{OIL_CHANGE_INTRO}</p>
        <div className="oil-actions"><a className="oil-button oil-button-primary" href="#oil-booking">Book an Oil Change <ArrowDown size={18} aria-hidden="true" /></a><a className="oil-button oil-button-secondary" href={OIL_CHANGE_WHATSAPP} target="_blank" rel="noopener noreferrer" data-cta-placement="oil_hero_whatsapp"><MessageCircle size={18} aria-hidden="true" />WhatsApp DIGI-TEC</a></div>
        <div className="oil-hero-meta"><a href="tel:+97143402223" data-cta-placement="oil_hero_call"><Phone size={16} aria-hidden="true" />Call DIGI-TEC</a><span>Scope confirmed before work begins</span></div>
      </div><figure className="oil-hero-visual"><img src="/images/paint-correction/workshop-floor-960.webp" srcSet="/images/paint-correction/workshop-floor-540.webp 540w, /images/paint-correction/workshop-floor-960.webp 960w" sizes="(min-width: 701px) 44vw, calc(100vw - 40px)" width="960" height="1280" {...{ fetchpriority: "high" }} alt="Vehicles and service bays inside the DIGI-TEC workshop in Al Quoz, Dubai" /><div className="oil-service-ticket"><span className="oil-ticket-label">Engine oil service</span><strong>The right specification. <br />For your engine.</strong><div><span>Oil</span><span>Filter</span><span>Level check</span></div></div><figcaption>DIGI-TEC workshop · Al Quoz Industrial Area 3</figcaption></figure></div>
      <nav className="oil-jump-links" aria-label="Oil change page sections"><a href="#oil-scope">What’s included</a><a href="#oil-process">Our process</a><a href="#oil-cost">Cost & quote</a><a href="#oil-faq">Common questions</a></nav>
    </section>

    <section id="oil-scope" className="oil-scope" aria-labelledby="oil-scope-title"><div className="oil-shell">
      <div className="oil-section-head"><div><p className="oil-kicker">Know the scope</p><h2 id="oil-scope-title">What your oil change includes</h2></div><p>Your quote sets out the oil, filter and applicable service items. Extra inspections, repairs or maintenance are agreed separately.</p></div>
      <div className="oil-scope-grid">{oilScope.map((item,index)=><article key={item.title}><span className="oil-index">0{index+1}</span><h3>{item.title}</h3><p>{item.detail}</p></article>)}</div>
    </div></section>

    <section id="oil-specification" className="oil-section oil-shell oil-specification" aria-labelledby="oil-spec-title">
      <div><p className="oil-kicker">Matched to the vehicle</p><h2 id="oil-spec-title">There’s more to oil <br />than its viscosity.</h2><p>A viscosity grade describes how an oil flows. It does not, by itself, confirm that the oil meets the specification required by your engine.</p><p>We check the engine variant, model year and market specification before agreeing the oil, filter and procedure. Two cars with the same badge may need different oil-service details.</p></div>
      <div className="oil-spec-sheet"><div className="oil-spec-sheet-heading"><span>Before the first drop</span><Check size={20} aria-hidden="true" /></div><dl>{[
        ['Vehicle', 'Model year · engine variant · market specification'],
        ['Oil', 'Viscosity + required approval or specification'],
        ['Filter', 'Correct fitment + associated seals'],
        ['Quantity', 'Engine capacity + filling and level procedure'],
        ['Reset', 'Applicable service reminder + supported access'],
      ].map(([term,detail])=><div key={term}><dt>{term}</dt><dd>{detail}</dd></div>)}</dl><p>Confirmed for your car, then listed in the agreed scope.</p></div>
    </section>

    <section id="oil-process" className="oil-process" aria-labelledby="oil-process-title"><div className="oil-shell">
      <div className="oil-section-head"><div><p className="oil-kicker">From check-in to handover</p><h2 id="oil-process-title">Our oil change process</h2></div><p>A clear sequence, with the oil specification and service scope agreed before work begins.</p></div>
      <ol className="oil-process-steps">{oilProcess.map((step,index)=><li key={step.title}><span aria-hidden="true">0{index+1}</span><h3>{step.title}</h3><p>{step.detail}</p></li>)}</ol>
      <div className="oil-process-action"><p>Have your model, year and mileage ready.</p><WhatsApp placement="process_quote" quote>Request an Oil Change Quote</WhatsApp></div>
    </div></section>

    <section id="oil-vehicles" className="oil-section oil-shell" aria-labelledby="oil-vehicles-title">
      <div className="oil-section-head"><div><p className="oil-kicker">Find your vehicle</p><h2 id="oil-vehicles-title">Oil change for luxury, <br />performance & daily cars</h2></div><p>Oil requirements vary by engine and platform. Explore the dedicated oil-service page for your brand, or send your vehicle details so we can confirm coverage and availability.</p></div>
      <div className="oil-brand-paths">{oilBrandPaths.map(item=><Link key={item.slug} to={item.path}><span className="oil-brand-logo"><img src={brands.find(brand=>brand.slug===item.slug)?.logo} alt="" width="56" height="56" loading="lazy" /></span><span><strong>{item.name}</strong><span>Oil change service</span></span><ArrowUpRight size={18} aria-hidden="true" /></Link>)}</div>
      <p className="oil-small-note">Your car isn’t listed? Share the make, model, year and engine details with the workshop before booking.</p>
    </section>

    <section id="oil-due" className="oil-due" aria-labelledby="oil-due-title"><div className="oil-shell oil-due-grid">
      <div><p className="oil-kicker">Read the reminder. Note the symptoms.</p><h2 id="oil-due-title">When should I book <br />an oil change?</h2><p>The service display and your vehicle’s maintenance schedule are the starting point. Unknown history or a concern about the oil is a reason to check what is due.</p><ul className="oil-due-list"><li><Check size={18} aria-hidden="true" />Oil-service reminder is due</li><li><Check size={18} aria-hidden="true" />The applicable time or mileage interval is reached</li><li><Check size={18} aria-hidden="true" />The last oil service or specification is unknown</li></ul><p>Dark oil alone does not prove it is overdue. Consider the service history, interval and any symptoms together.</p></div>
      <aside className="oil-warning" aria-labelledby="oil-warning-title"><TriangleAlert size={26} aria-hidden="true" /><h3 id="oil-warning-title">Some concerns need diagnosis.</h3><p>Repeatedly falling oil levels, visible leakage, a burnt-oil smell or an oil warning may need assessment beyond a routine oil change.</p><p><strong>An oil-pressure warning can require you to stop safely and switch off the engine.</strong> Follow your vehicle handbook and seek assistance; do not assume a routine oil change will resolve it.</p><div className="oil-context-links"><Link to="/services/car-diagnostics-dubai">Engine diagnostics <ArrowUpRight size={16} aria-hidden="true" /></Link><Link to="/services/mechanical-repair-dubai">Mechanical inspection & repair <ArrowUpRight size={16} aria-hidden="true" /></Link></div></aside>
    </div></section>

    <section id="oil-dubai" className="oil-section oil-shell oil-dubai" aria-labelledby="oil-dubai-title"><div><p className="oil-kicker">Your car. Your driving pattern.</p><h2 id="oil-dubai-title">Oil changes for Dubai <br />driving conditions</h2><p>High ambient temperatures, stop-start traffic, short trips, extended idling and dust are relevant when reviewing how the car is used.</p><p>The appropriate interval still depends on the manufacturer’s requirements, vehicle history and usage pattern. Dubai driving does not create one universal shorter interval for every engine.</p></div><div className="oil-driving-factors"><div><Thermometer size={28} aria-hidden="true" /><h3>Heat & traffic</h3><p>Review operating conditions and the manufacturer’s service guidance.</p></div><div><Clock3 size={28} aria-hidden="true" /><h3>Short trips & idling</h3><p>Mileage alone may not describe how the engine spends its time.</p></div><div><Route size={28} aria-hidden="true" /><h3>Dust & usage</h3><p>Consider the actual driving pattern alongside the service history.</p></div></div></section>

    <section id="oil-service-comparison" className="oil-comparison" aria-labelledby="oil-comparison-title"><div className="oil-shell"><p className="oil-kicker">Choose the right visit</p><h2 id="oil-comparison-title">Oil change or full car service?</h2><p className="oil-section-intro">An oil change may be the work you need. A service reminder can also mean other scheduled maintenance is due.</p><div className="oil-comparison-columns"><article><span className="oil-comparison-label">Focused engine-oil maintenance</span><h3>Oil change</h3><ul><li>Vehicle-specified engine oil</li><li>Applicable filter and sealing components</li><li>Correct fill and oil-level verification</li><li>Supported reset and agreed final checks</li></ul><p>The oil-and-filter scope is confirmed for your vehicle.</p></article><article><span className="oil-comparison-label">A wider scheduled visit</span><h3>Full car service</h3><ul><li>Maintenance due by time, mileage or condition</li><li>Additional filters and fluids where required</li><li>Scheduled inspection items for the vehicle</li><li>Scope selected from the schedule and service history</li></ul><Link to="/services/car-service-dubai">Explore Car Service Dubai <ArrowUpRight size={18} aria-hidden="true" /></Link></article></div><div className="oil-advice"><p>Not sure which service is due? Ask DIGI-TEC.</p><a href={OIL_SERVICE_ADVICE} className="oil-button oil-button-secondary" target="_blank" rel="noopener noreferrer" data-cta-placement="oil_service_advice">Ask Which Service Is Due <ArrowUpRight size={18} aria-hidden="true" /></a></div></div></section>

    <section id="oil-filter" className="oil-section oil-shell oil-filter" aria-labelledby="oil-filter-title"><div><p className="oil-kicker">Oil + filter, specified together</p><h2 id="oil-filter-title">The right filter matters, too.</h2></div><div><p>The correct oil filter and associated seals are selected for the vehicle specification and agreed service scope. Filter fitment, housing and sealing requirements are checked alongside the oil details.</p><p>Ask the team to identify the proposed filter and any additional seals or parts in the quote. A manufacturer-branded filter is not assumed for every service.</p></div></section>

    <section id="oil-cost" className="oil-cost" aria-labelledby="oil-cost-title"><div className="oil-shell oil-cost-grid"><div><p className="oil-kicker">A quote for your engine</p><h2 id="oil-cost-title">What affects oil change <br />cost in Dubai?</h2><p>Make, model and year help identify the engine and service requirements. The final quote follows the confirmed oil, parts and work your car needs.</p><WhatsApp placement="exact_quote" quote>Get an Exact Oil Change Quote</WhatsApp><p className="oil-small-note">Share your vehicle details. Review the scope before approving work.</p></div><div className="oil-cost-factors">{[
      ['Oil specification', 'The oil approval, viscosity and product required by the engine.'],
      ['Oil quantity', 'The engine’s capacity and the applicable service procedure.'],
      ['Filter & seals', 'Vehicle-specific filter, sealing components and any required parts.'],
      ['Reset & agreed work', 'Supported reminder procedures, labour and any additional approved work.'],
    ].map(([title,description])=><article key={title}><h3>{title}</h3><p>{description}</p></article>)}</div></div></section>

    <section id="oil-faq" className="oil-section oil-shell oil-faq-grid" aria-labelledby="oil-faq-title"><div><p className="oil-kicker">Before you book</p><h2 id="oil-faq-title">Oil change questions, <br />answered.</h2><p>Oil, intervals, scope and the next step for your car.</p></div><Accordion className="oil-faq" type="single" collapsible>{oilFaqs.map((faq,index)=><AccordionItem key={faq.question} value={`oil-faq-${index}`}><AccordionTrigger>{faq.question}</AccordionTrigger><AccordionContent forceMount><p>{faq.answer}</p></AccordionContent></AccordionItem>)}</Accordion></section>

    <section id="oil-booking" className="oil-booking oil-shell" aria-labelledby="oil-booking-title"><div><p className="oil-kicker">Your next oil service</p><h2 id="oil-booking-title">Book your oil change.</h2><p>Send your make, model, year and mileage. We’ll confirm the oil-and-filter scope, quote and available appointment.</p><WhatsApp placement="booking">Book Your Oil Change</WhatsApp></div><div className="oil-location"><MapPin size={25} aria-hidden="true" /><h3>Oil change in Al Quoz, Dubai</h3><p>DIGI-TEC Performance Center <br />Al Quoz Industrial Area 3 <br />Dubai, UAE</p><a href="https://maps.google.com/?q=Digi-Tec+Performance+Center+Al+Quoz+Industrial+Area+3+Dubai" target="_blank" rel="noopener noreferrer" data-cta-placement="oil_directions">Get directions <ArrowUpRight size={18} aria-hidden="true" /></a><a href="tel:+97143402223" data-cta-placement="oil_booking_call">+971 4 340 2223</a></div></section>
  </main><Footer /></div>;
}
