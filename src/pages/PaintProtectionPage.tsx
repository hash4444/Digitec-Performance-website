import { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { ChevronRight, MessageCircle, Phone } from 'lucide-react';
import Header from '@/components/Header';
import { Footer } from '@/components/Footer';
import { LocalizedLink as Link } from '@/components/LocalizedLink';
import { useLocale } from '@/i18n/use-locale';
import { useSeo } from '@/hooks/use-seo';
import { buildBreadcrumb, buildService, buildWebPage, pageGraph, SITE_URL } from '@/lib/schema';
import { brands } from '@/data/brands';
import { PAINT_PROTECTION_PATH, PAINT_PROTECTION_UPDATED, paintProtectionCopy } from '@/data/paintProtectionContent';

const hero = '/images/ppf/film-application-1200.webp';
const relevantBrands = brands.filter(brand => ['Mercedes-Benz', 'BMW', 'Porsche', 'Ferrari', 'Lamborghini', 'Rolls-Royce', 'Range Rover'].includes(brand.name));

export default function PaintProtectionPage() {
  const { isArabic, locale, localizedPath } = useLocale();
  const { hash } = useLocation();
  const copy = paintProtectionCopy[locale];
  const url = `${SITE_URL}${localizedPath(PAINT_PROTECTION_PATH)}`;
  const whatsapp = `https://wa.me/97143402223?text=${encodeURIComponent(copy.draft)}`;
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView({ block: 'start' });
  }, [hash]);
  const graph = pageGraph([
    buildWebPage({ url, name: copy.title, description: copy.description, breadcrumbId: `${url}#breadcrumb`, mainEntityId: `${url}#service`, primaryImage: hero, dateModified: PAINT_PROTECTION_UPDATED }),
    buildBreadcrumb(url, [{ name: copy.home, url: localizedPath('/') }, { name: copy.services, url: localizedPath('/services') }, { name: copy.breadcrumb, url }]),
    buildService({ url, name: copy.h1, serviceType: copy.breadcrumb, description: copy.intro, image: hero }),
  ]);
  useSeo({ title: copy.title, description: copy.description, canonical: url, hasArabicVersion: true, jsonLd: graph, ogImage: `${SITE_URL}${hero}`, ogImageAlt: copy.photoAlt, ogImageWidth: 1200, ogImageHeight: 1200 });
  const quote = (placement: string) => <a href={whatsapp} target="_blank" rel="noopener noreferrer" data-cta-placement={placement} className="ph-button ph-primary"><MessageCircle size={19} aria-hidden="true" />{copy.quote}</a>;
  const call = (placement: string) => <a href="tel:+97143402223" data-cta-placement={placement} className="ph-button ph-secondary"><Phone size={19} aria-hidden="true" />{copy.call}</a>;
  return <div className="protection-hub site-page min-h-screen" dir={isArabic ? 'rtl' : 'ltr'}>
    <Header />
    <main id="paint-protection-main">
      <section className="ph-hero theme-dark-section" aria-labelledby="protection-title">
        <div className="ph-hero-copy">
          <nav className="ph-breadcrumb" aria-label={isArabic ? 'مسار الصفحة' : 'Breadcrumb'}><Link to="/">{copy.home}</Link><ChevronRight size={14} aria-hidden="true" /><Link to="/services">{copy.services}</Link><ChevronRight size={14} aria-hidden="true" /><span aria-current="page">{copy.breadcrumb}</span></nav>
          <p className="ph-kicker">{copy.kicker}</p><h1 id="protection-title">{copy.h1}</h1><p>{copy.intro}</p>
          <div className="ph-actions">{quote('hero')}{call('hero')}</div>
        </div>
        <figure><img src={hero} srcSet="/images/ppf/film-application-640.webp 640w, /images/ppf/film-application-1200.webp 1200w" sizes="(min-width: 900px) 46vw, 100vw" width={1200} height={1200} fetchPriority="high" alt={copy.photoAlt} /><figcaption>{copy.photoCaption}</figcaption></figure>
      </section>
      <nav className="ph-jump" aria-label={isArabic ? 'أقسام حماية الطلاء' : 'Paint protection sections'}><a href="#protection-options">{copy.optionsTitle}</a><a href="#protection-comparison">{copy.comparisonTitle}</a><a href="#protection-quote">{copy.quote}</a></nav>
      <section className="ph-section"><h2>{copy.whyTitle}</h2><p>{copy.why}</p></section>
      <section id="protection-options" className="ph-section ph-panel"><h2>{copy.optionsTitle}</h2><div className="ph-cards">{copy.options.map(option => <article key={option.path} id={option.path.endsWith('car-polishing-dubai') ? 'paint-correction' : undefined}><h3>{option.heading}</h3><p>{option.text}</p>{isArabic && option.path.endsWith('car-polishing-dubai') ? <RouterLink to={option.path} className="ph-link">{option.label}</RouterLink> : <Link to={option.path} className="ph-link">{option.label}</Link>}</article>)}</div></section>
      <section id="protection-comparison" className="ph-section"><h2>{copy.comparisonTitle}</h2><p>{copy.comparisonIntro}</p><div className="ph-table" role="region" aria-label={copy.comparisonTitle} tabIndex={0}><table><caption>{copy.comparisonTitle}</caption><thead><tr>{copy.comparisonHeaders.map(label => <th scope="col" key={label}>{label}</th>)}</tr></thead><tbody>{copy.comparison.map(([label, ...values]) => <tr key={label}><th scope="row">{label}</th>{values.map((value, index) => <td key={index}>{value}</td>)}</tr>)}</tbody></table></div></section>
      <section className="ph-section ph-panel"><h2>{copy.choiceTitle}</h2><ul className="ph-list">{copy.choices.map(item => <li key={item}>{item}</li>)}</ul></section>
      <section id="protection-process" className="ph-section"><h2>{copy.processTitle}</h2><ol className="ph-cards">{copy.process.map(([heading, text], index) => <li key={heading}><p className="ph-kicker">0{index + 1}</p><h3>{heading}</h3><p>{text}</p></li>)}</ol></section>
      <section className="ph-section ph-panel"><h2>{copy.vehicleTitle}</h2><p>{copy.vehicle}</p><p>{copy.brandsLabel}</p><nav className="ph-brands" aria-label={isArabic ? 'صفحات العلامات' : 'Brand workshop pages'}>{relevantBrands.map(brand => <Link to={`/brands/${brand.slug}`} key={brand.slug}>{brand.name}</Link>)}</nav></section>
      <section className="ph-section"><h2>{copy.aftercareTitle}</h2><p>{copy.aftercare}</p></section>
      <section id="protection-faq" className="ph-section ph-panel"><h2>{copy.faqTitle}</h2>{copy.faqs.map(faq => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</section>
      <section className="ph-section"><h2>{copy.learnTitle}</h2><nav className="ph-resources" aria-label={copy.learnTitle}><Link to="/blog/ceramic-coating-vs-ppf-dubai">{copy.compareLabel}</Link><Link to="/blog/why-ceramic-coating-matters-uae">{copy.guideLabel}</Link><Link to="/services/car-body-repair-dubai">{copy.bodyLabel}</Link></nav></section>
      <section id="protection-quote" className="ph-section ph-panel"><h2>{copy.quoteTitle}</h2><p>{copy.quoteText}</p><div className="ph-actions">{quote('service_details')}{call('service_details')}</div><address>DIGI-TEC Performance Center<br />{copy.address}<br /><a href="tel:+97143402223" data-cta-placement="final_cta">+971 4 340 2223</a></address></section>
    </main>
    <Footer />
    <nav className="ph-mobile" aria-label={copy.mobileLabel}>{quote('paint_protection_mobile')}{call('paint_protection_mobile')}</nav>
  </div>;
}
