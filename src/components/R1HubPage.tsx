import { ArrowRight, CheckCircle2, MapPin, MessageCircle, Phone } from 'lucide-react';
import Header from '@/components/Header';
import { Footer } from '@/components/Footer';
import BrandBookingForm from '@/components/BrandBookingForm';
import { LocalizedLink as Link } from '@/components/LocalizedLink';
import { r1WhatsAppHref, type R1HubContent } from '@/data/r1HubContent';
import defenderRepair from '@/assets/defender-accident-repair-corner.jpg';
import '@/styles/r1-hubs.css';

interface Props { content: R1HubContent; isArabic: boolean }

export default function R1HubPage({ content, isArabic }: Props) {
  const isRangeRover = content.kind === 'range-rover';
  const hubPath = `/brands/${isRangeRover ? 'range-rover' : 'defender'}-service-dubai`;
  const whatsappHref = r1WhatsAppHref(content);
  const heroImage = isRangeRover ? '/images/range-rover-service-dubai-hero.jpg' : '/images/defender-service-dubai-hero.jpg';
  const heroAlt = isArabic ? isRangeRover ? 'رينج روفر داخل ورشة ديجي-تك في القوز، دبي' : 'لاند روفر ديفندر في ورشة ديجي-تك بدبي' : isRangeRover ? 'Range Rover inside the DIGITEC workshop in Al Quoz, Dubai' : 'Land Rover Defender at the DIGITEC workshop in Dubai';
  const additionalServices = [
    { slug: 'steering-repair', label: isArabic ? 'فحص وإصلاح التوجيه' : 'Steering inspection & repair' },
    { slug: 'battery-replacement', label: isArabic ? 'فحص واستبدال البطارية' : 'Battery assessment & replacement' },
    { slug: 'exhaust-repair', label: isArabic ? 'فحص وإصلاح العادم' : 'Exhaust inspection & repair' },
    { slug: 'fuel-system-repair', label: isArabic ? 'فحص نظام الوقود' : 'Fuel-system inspection' },
    { slug: 'body-repair', label: isArabic ? 'الهيكل وإصلاح الحوادث' : 'Body & accident repair' },
    { slug: 'tire-repair', label: isArabic ? 'فحص وإصلاح الإطارات' : 'Tyre inspection & repair' },
  ].filter(service => !content.services.some(primary => primary.slug === service.slug));
  const actions = (placement: string, compact = false) => <div className={`r1-actions${compact ? ' r1-actions--compact' : ''}`}>
    <a href={whatsappHref} data-cta-placement={placement} target="_blank" rel="noopener noreferrer" className="r1-button r1-button--primary"><MessageCircle size={20} aria-hidden="true" />{isArabic ? 'استفسر عبر واتساب' : compact ? 'WhatsApp' : `Enquire about ${isRangeRover ? 'Range Rover' : 'Defender'} service`}</a>
    <a href="tel:+97143402223" data-cta-placement={placement} className="r1-button r1-button--secondary"><Phone size={18} aria-hidden="true" />{compact ? isArabic ? 'اتصل بالورشة' : 'Call workshop' : <bdi dir="ltr">+971 4 340 2223</bdi>}</a>
  </div>;

  return <div className={`r1-hub r1-hub--${content.kind} site-page`} dir={isArabic ? 'rtl' : 'ltr'} data-r1-hub={content.kind}>
    <Header overlay />
    <main id="main-content">
      <section className="r1-hero" aria-labelledby="r1-title">
        <div className="r1-shell">
          <nav aria-label={isArabic ? 'مسار التنقل' : 'Breadcrumb'} className="r1-breadcrumb"><ol><li><Link to="/">{isArabic ? 'الرئيسية' : 'Home'}</Link></li><li aria-hidden="true">/</li><li><Link to="/brands">{isArabic ? 'العلامات' : 'Brands'}</Link></li><li aria-hidden="true">/</li><li aria-current="page">{content.name}</li></ol></nav>
          <div className="r1-hero-grid">
            <div className="r1-hero-copy">
              <p className="r1-eyebrow">{content.eyebrow}</p>
              <h1 id="r1-title">{content.h1}</h1>
              <p className="r1-lead">{content.intro}</p>
              {actions('hero')}
              <p className="r1-hero-note"><CheckCircle2 size={16} aria-hidden="true" />{isArabic ? 'فحص واضح · شرح العمل · موافقة قبل الإصلاح' : 'Inspect clearly · Explain the work · Approve before repair'}</p>
            </div>
            <figure className="r1-hero-photo">
              <img src={heroImage} alt={heroAlt} width={isRangeRover ? 941 : 901} height={isRangeRover ? 1672 : 1600} fetchPriority="high" decoding="async" />
              <figcaption><span>{isArabic ? 'داخل ورشة ديجي-تك' : 'Inside DIGITEC'}</span><strong>{isArabic ? 'القوز الصناعية 3 · دبي' : 'Al Quoz Industrial Area 3 · Dubai'}</strong></figcaption>
            </figure>
          </div>
        </div>
      </section>

      <nav className="r1-section-nav" aria-label={isArabic ? 'أقسام الصفحة' : 'Page sections'}><div className="r1-shell">
        <a href="#r1-models">{isArabic ? 'الطرازات' : 'Models'}</a><a href="#r1-services">{isArabic ? 'خدمات الإصلاح' : 'Repair services'}</a><a href="#r1-process">{isArabic ? 'طريقة العمل' : 'Our process'}</a><a href="#r1-faqs">{isArabic ? 'الأسئلة' : 'Owner FAQs'}</a><a href="#r1-booking">{isArabic ? 'طلب موعد' : 'Request a visit'}</a>
      </div></nav>

      <section id="r1-models" className="r1-section r1-models" aria-labelledby="r1-models-title"><div className="r1-shell">
        <div className="r1-section-heading"><p className="r1-eyebrow">{isArabic ? 'الطراز والتجهيزات' : 'Model & specification'}</p><h2 id="r1-models-title">{content.modelsTitle}</h2><p>{content.modelsIntro}</p></div>
        <div className="r1-model-grid">{content.models.map((model, index) => <article key={model.title} className="r1-model-card">
          <span className="r1-index" aria-hidden="true">0{index + 1}</span><h3>{model.title}</h3><p>{model.text}</p>
          {model.link && <Link to={model.link.path} className="r1-text-link mt-4">{model.link.label}</Link>}
          {model.enquiryModel && <a href={r1WhatsAppHref(content, `${isArabic ? 'استفسار عن طراز' : 'Model enquiry'}: ${model.enquiryModel}`)} data-cta-placement={`model_${index + 1}`} target="_blank" rel="noopener noreferrer" className="r1-service-enquiry inline-block">{isArabic ? `استفسر عن صيانة ${model.title}` : `Enquire about ${model.title} servicing`}</a>}
        </article>)}</div>
      </div></section>

      <section id="r1-services" className="r1-section r1-services" aria-labelledby="r1-services-title"><div className="r1-shell">
        <div className="r1-section-heading"><p className="r1-eyebrow">{isArabic ? 'من الأعراض إلى خطة الإصلاح' : 'From symptom to repair plan'}</p><h2 id="r1-services-title">{content.servicesTitle}</h2><p>{content.servicesIntro}</p></div>
        <div className="r1-service-grid">{content.services.map((service) => <article key={service.slug} className="r1-service-card" style={isRangeRover && service.slug === 'body-repair' ? { gridColumn: '1 / -1' } : undefined}><h3>{service.title}</h3><p>{service.text}</p><Link to={`${hubPath}/${service.slug}`} className="r1-text-link">{isArabic ? `تفاصيل ${service.title}` : `${isRangeRover ? 'Range Rover' : 'Defender'} ${service.title.toLowerCase()}`}<ArrowRight size={17} aria-hidden="true" /></Link><a href={r1WhatsAppHref(content, `${isArabic ? 'الخدمة' : 'Service'}: ${service.title}`)} data-cta-placement={`service_${service.slug}`} target="_blank" rel="noopener noreferrer" className="r1-service-enquiry">{isArabic ? 'ناقش هذه الخدمة عبر واتساب' : 'Discuss this service on WhatsApp'}</a></article>)}</div>
        <div className="r1-other-services"><h3>{isArabic ? 'مخاوف أخرى تخص سيارتك' : 'Other concerns with your vehicle'}</h3><p>{isArabic ? 'تتوفر أيضاً صفحات الخدمات الحالية أدناه. أرسل بيانات السيارة والمشكلة لتأكيد الفحص والقطع ونطاق الإصلاح المتاح قبل الموعد.' : 'The existing service pages below cover further enquiries. Share the vehicle details and concern to confirm the available inspection, parts and repair scope before an appointment.'}</p><ul>{additionalServices.map((service) => <li key={service.slug}><Link to={`${hubPath}/${service.slug}`}>{service.label}</Link></li>)}</ul></div>
      </div></section>

      <section className="r1-section r1-feature" aria-labelledby="r1-feature-title"><div className="r1-shell r1-feature-grid">
        <div><p className="r1-eyebrow">{isArabic ? isRangeRover ? 'عناية مدروسة' : 'أنظمة تعمل معاً' : isRangeRover ? 'Considered care' : 'Systems working together'}</p><h2 id="r1-feature-title">{content.feature.title}</h2><p>{content.feature.text}</p>{!isRangeRover && <Link to={`${hubPath}/mechanical-repair`} className="r1-text-link">{isArabic ? 'فحص مجموعة نقل حركة ديفندر' : 'Defender driveline inspection'}<ArrowRight size={17} aria-hidden="true" /></Link>}</div>
        <aside className="r1-local-card"><MapPin size={23} aria-hidden="true" /><h3>{isArabic ? 'ورشة مستقلة في القوز' : 'An independent Al Quoz workshop'}</h3><p>{isArabic ? 'ديجي-تك بيرفورمانس، القوز الصناعية 3، دبي، الإمارات. أرسل بيانات السيارة أو اتصل لتأكيد نطاق الفحص والموعد قبل الزيارة.' : 'DIGITEC Performance Center, Al Quoz Industrial Area 3, Dubai, UAE. Share the vehicle details or call to confirm the inspection scope and appointment before travelling.'}</p><a href="https://maps.google.com/?q=Al+Quoz+Industrial+Area+3+Dubai" data-cta-placement="location_section" target="_blank" rel="noopener noreferrer" className="r1-text-link">{isArabic ? 'الاتجاهات إلى الورشة' : 'Directions to the workshop'}<ArrowRight size={17} aria-hidden="true" /></a></aside>
      </div></section>

      <section id="r1-process" className="r1-section" aria-labelledby="r1-process-title"><div className="r1-shell"><div className="r1-section-heading"><p className="r1-eyebrow">{isArabic ? 'ما الذي تتوقعه؟' : 'What to expect'}</p><h2 id="r1-process-title">{isArabic ? 'خطوات واضحة من الطلب إلى العمل' : 'A clear path from enquiry to agreed work'}</h2></div><ol className="r1-process-grid">{content.process.map((step, index) => <li key={step.title}><span className="r1-index" aria-hidden="true">0{index + 1}</span><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol></div></section>

      <section className="r1-section r1-workshop" aria-labelledby="r1-workshop-title"><div className="r1-shell r1-workshop-grid"><figure><img src={isRangeRover ? '/images/range-rover-vogue-service-a-workshop.webp' : defenderRepair} alt={isArabic ? isRangeRover ? 'رينج روفر فوج على رافعة في ورشة ديجي-تك بدبي' : 'زاوية ديفندر مفككة أثناء فحص إصلاح حادث في ورشة ديجي-تك' : isRangeRover ? 'Range Rover Vogue on a lift at the DIGITEC workshop in Dubai' : 'Defender front corner disassembled during the existing DIGITEC accident repair case'} width={isRangeRover ? 941 : 900} height={isRangeRover ? 1672 : 1600} loading="lazy" decoding="async" /><figcaption>{content.workshopCaption}</figcaption></figure><div><p className="r1-eyebrow">{isArabic ? 'من ورشتنا' : 'From our workshop'}</p><h2 id="r1-workshop-title">{isArabic ? isRangeRover ? 'تعرف على سيارتك قبل الزيارة' : 'تفاصيل عملية للمالك' : isRangeRover ? 'Know your vehicle before your visit' : 'Practical context for Defender owners'}</h2><p>{isArabic ? 'توفر الأدلة الحالية معلومات عن الصيانة والطراز وعملية الفحص. يبقى حجز الخدمة وتحديد الإصلاح مرتبطين بحالة سيارتك ونتائجها.' : 'The existing guides explain ownership, maintenance and the inspection process. Service booking and repair decisions remain specific to your vehicle and its findings.'}</p><ul className="r1-guide-links">{content.guides.map((guide) => <li key={guide.path}><Link to={guide.path}>{guide.title}<ArrowRight size={18} aria-hidden="true" /></Link></li>)}</ul><div className="r1-family-links"><Link to="/brands/land-rover-service-dubai">{isArabic ? 'صيانة لاند روفر: الصفحة الرئيسية للعلامة' : 'General Land Rover service enquiries'}</Link><Link to={`/brands/${isRangeRover ? 'defender' : 'range-rover'}-service-dubai`}>{isArabic ? isRangeRover ? 'صيانة وإصلاح لاند روفر ديفندر' : 'صيانة وإصلاح رينج روفر' : isRangeRover ? 'Land Rover Defender service & repair' : 'Range Rover service & repair'}</Link></div></div></div></section>

      {isRangeRover && <section className="r1-section r1-paint-care" aria-labelledby="r1-paint-title"><div className="r1-shell"><h2 id="r1-paint-title">{isArabic ? 'العناية بطلاء رينج روفر' : 'Paint care for your Range Rover'}</h2><p>{isArabic ? <>إذا كنت تخطط أيضاً للعناية بالمظهر، راجع <Link to="/services/paint-protection-film">خيارات تغطية أفلام حماية الطلاء</Link> للألواح التي تريد حمايتها، و<Link to="/services/ceramic-coating">تحضير السيراميك والعناية به</Link> لصيانة السطح. تُراجع حالة الطلاء وأي إصلاحات سابقة قبل الاتفاق على النطاق المناسب.</> : <>If you are also planning finish care, compare <Link to="/services/paint-protection-film">selected-panel and full-body paint protection film</Link> for the panels you want to protect, and <Link to="/services/ceramic-coating">ceramic coating preparation and maintenance</Link> for surface care. The paint condition and previous repairs are reviewed before a suitable scope is agreed.</>}</p></div></section>}

      <section id="r1-faqs" className="r1-section r1-faq" aria-labelledby="r1-faq-title"><div className="r1-shell"><div className="r1-section-heading"><p className="r1-eyebrow">{isArabic ? 'أسئلة الملاك' : 'Owner questions'}</p><h2 id="r1-faq-title">{isArabic ? `أسئلة عن صيانة ${content.name}` : `${content.name} service FAQs`}</h2></div><div className="r1-faq-list">{content.faqs.map((faq) => <details key={faq.q}><summary>{faq.q}</summary><p>{faq.a}</p></details>)}</div></div></section>

      <section id="r1-booking" className="r1-section r1-booking" aria-labelledby="r1-booking-title"><div className="r1-shell r1-booking-grid"><div><p className="r1-eyebrow">{isArabic ? 'ابدأ ببيانات سيارتك' : 'Start with your vehicle'}</p><h2 id="r1-booking-title">{isArabic ? `ناقش صيانة ${content.name}` : `Let's discuss your ${isRangeRover ? 'Range Rover' : 'Defender'}`}</h2><p>{isArabic ? 'أرسل الطراز والسنة والمسافة والسجل والخدمة المطلوبة أو الأعراض والموعد المفضل. يؤكد الفريق الفحص المناسب والتوفر بعد استلام رسالتك. قد يحتاج عرض سعر الإصلاح إلى فحص السيارة، وتُوضح القطع والسوائل والأجرة قبل الموافقة.' : 'Send the model, year, mileage, history, service required or symptoms and your preferred appointment. The team confirms the appropriate assessment and availability after receiving your message. Repair pricing may need inspection; parts, fluids and labour are explained before approval.'}</p>{actions('booking_section')}<p className="r1-small-note">{isArabic ? 'يفتح الرابط أو النموذج مسودة واتساب. راجع الرسالة واضغط إرسال في واتساب ليصل الطلب؛ فتح المسودة لا يؤكد الموعد.' : 'The link or form opens a WhatsApp draft. Review and send it in WhatsApp so the team receives your request; opening the draft does not confirm an appointment.'}</p><noscript><p>{isArabic ? 'استخدم رابط واتساب أو اتصل بالورشة لطلب موعد.' : 'Use the WhatsApp link or call the workshop to request an appointment.'}</p></noscript></div><div className="r1-booking-form"><BrandBookingForm brandName={content.name} issuePlaceholder={`${content.name} model, year, mileage, service history, warning or symptom, and preferred appointment`} /></div></div></section>
    </main>
    <Footer />
    <aside className="r1-mobile-bar" aria-label={isArabic ? `التواصل بشأن ${content.name}` : `${content.name} enquiry options`}>{actions('mobile_bar', true)}</aside>
  </div>;
}
