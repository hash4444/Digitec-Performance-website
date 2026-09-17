import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { LocalizedLink as Link } from '@/components/LocalizedLink';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowLeft, User } from 'lucide-react';
import { useSeo } from '@/hooks/use-seo';
import Header from '@/components/Header';
import { FinalCTA } from '@/components/FinalCTA';
import { Footer } from '@/components/Footer';
import { getBlogPostBySlug, blogPosts } from '@/data/blogPosts';
import { buildArticle, buildBreadcrumb, buildFAQ, buildWebPage, pageGraph } from '@/lib/schema';
import { useLocale } from '@/i18n/use-locale';
import { categoryArabic, localizeBlogPostToArabic, localizePostSummaryToArabic } from '@/i18n/ar-blog';
import { MERCEDES_UNTRANSLATED_MODEL_PATHS } from '@/i18n/mercedes-language';
import { getRelatedArticles } from '@/lib/related-articles';

type ContentBlock = { type: 'h2' | 'h3' | 'p' | 'ul'; text?: string; items?: string[] };

/** Extract only the visible question-and-answer pairs beneath an article FAQ heading. */
const getArticleFaqs = (content: ContentBlock[]) => {
  const faqs: { question: string; answer: string }[] = [];
  let inFaqSection = false;

  content.forEach((block, index) => {
    if (block.type === 'h2') {
      inFaqSection = /\bfaqs?\b/i.test(block.text ?? '') || /الأسئلة الشائعة/.test(block.text ?? '');
      return;
    }
    if (!inFaqSection || block.type !== 'h3' || !block.text) return;

    const answer = content[index + 1];
    if (answer?.type === 'p' && answer.text) {
      faqs.push({ question: block.text, answer: answer.text });
    }
  });

  return faqs;
};

const relatedServiceByPost: Record<string, { href: string; label: string; description: string }> = {
  'aston-martin-db11-service-dubai-guide': { href: '/brands/aston-martin-service-dubai', label: 'Aston Martin service and repair in Dubai', description: 'Discuss your model, maintenance or repair concern with the Al Quoz workshop.' },
  'how-much-is-my-mercedes-worth-dubai': {
    href: '/brands/mercedes-benz-service-dubai',
    label: 'Mercedes valuation and sale support in Dubai',
    description: 'Ask Digi-Tec to inspect, value, prepare and help sell your Mercedes through an agreed, transparent process.',
  },
  'best-oil-change-dubai-mercedes': {
    href: '/services/mercedes-oil-change-dubai',
    label: 'Mercedes oil change in Dubai',
    description: 'Arrange a Mercedes oil service and vehicle health check with our specialists in Al Quoz.',
  },
  'car-ac-repair-dubai': {
    href: '/services/car-ac-repair-dubai',
    label: 'Car AC repair in Dubai',
    description: 'Book a diagnostic for weak cooling, leaks, compressor concerns, or inconsistent cabin temperature.',
  },
  'brake-repair-dubai': {
    href: '/services/brake-repair-dubai',
    label: 'Brake repair in Dubai',
    description: 'Arrange a brake inspection for noise, vibration, warning lights, or reduced stopping confidence.',
  },
  'car-battery-replacement-dubai': {
    href: '/services/battery-replacement-dubai',
    label: 'Car battery testing and replacement',
    description: 'Get a professional battery health check before replacing a weak or unreliable battery.',
  },
  'best-car-workshop-dubai': {
    href: '/best-car-workshop-dubai',
    label: 'car workshop services in Dubai',
    description: 'See the workshop overview, service scope, and direct ways to contact Digi-Tec in Al Quoz.',
  },
  'mercedes-repair-dubai-complete-guide': {
    href: '/mercedes/problems',
    label: 'Mercedes problem and diagnostic guides',
    description: 'Continue from this broad ownership overview into focused AIRMATIC, transmission, cooling, AC, oil-leak, no-start and battery-warning guides.',
  },
  'range-rover-land-rover-air-suspension-problems-dubai': {
    href: '/services/suspension-repair-dubai',
    label: 'Range Rover and Land Rover suspension repair in Dubai',
    description: 'Book a suspension inspection for a leaning vehicle, Suspension Fault warning, slow lifting or compressor concerns.',
  },
  'best-defender-workshop-dubai': {
    href: '/brands/defender-service-dubai',
    label: 'Defender service in Dubai',
    description: 'Arrange a Defender inspection for accident damage, warning lights, diagnostics, bodywork or ongoing maintenance.',
  },
  'g63-to-brabus-g800-conversion-dubai': {
    href: '/blog/mercedes-g63-service-dubai-guide',
    label: 'Mercedes-AMG G63 model service guide',
    description: 'Review G63 generation, V8, transmission, chassis, cooling and diagnostic considerations before arranging an inspection.',
  },
  'mercedes-amg-gt-black-series-1300hp-build-dubai': {
    href: '/tuning',
    label: 'Mercedes-AMG performance tuning in Dubai',
    description: 'Discuss a custom AMG build, ECU calibration or performance-project inspection with Digi-Tec in Al Quoz.',
  },
  'air-suspension-repair-dubai-guide': {
    href: '/mercedes/problems/airmatic-malfunction',
    label: 'Mercedes AIRMATIC malfunction guide',
    description: 'See how the Mercedes-specific warning, air system and chassis variants change the diagnostic path.',
  },
  'transmission-service-7g-9g-dubai': {
    href: '/mercedes/problems/gearbox-jerking',
    label: 'Mercedes gearbox-jerking guide',
    description: 'Separate 7G-TRONIC, 9G-TRONIC and AMG symptom diagnosis from routine transmission service intent.',
  },
  'check-engine-light-dubai-guide': {
    href: '/mercedes/problems/check-engine-light',
    label: 'Mercedes check-engine light guide',
    description: 'Continue with Mercedes-specific warning urgency, fault context and diagnostic steps.',
  },
  'engine-overheating-dubai-what-to-do': {
    href: '/mercedes/problems/engine-overheating',
    label: 'Mercedes overheating guide',
    description: 'Review Mercedes cooling-circuit, fan, thermostat, pump and Dubai traffic considerations.',
  },
  'ferrari-488-service-dubai-guide': {
    href: '/brands/ferrari-service-dubai/488',
    label: 'Ferrari 488 model service information',
    description: 'Continue to the model page for 488 powertrain, seven-speed dual-clutch, SCM-E, brake, diagnostic and Dubai ownership considerations.',
  },
  'rolls-royce-ghost-service-dubai-guide': {
    href: '/brands/rolls-royce-service-dubai',
    label: 'Rolls-Royce service and repair in Dubai',
    description: 'Continue to the Rolls-Royce hub for maintenance, diagnostics, suspension, transmission and vehicle-specific repair enquiries in Al Quoz.',
  },
};

// The symptom/model destinations below are English-only. Link Arabic readers
// to an existing Arabic service owner instead of constructing a missing route.
const arabicRelatedServiceByPost: Record<string, { href: string; label: string }> = {
  'air-suspension-repair-dubai-guide': { href: '/services/mercedes-suspension-repair-dubai', label: 'فحص وإصلاح تعليق مرسيدس' },
  'check-engine-light-dubai-guide': { href: '/services/mercedes-diagnostics-dubai', label: 'فحص وتشخيص مرسيدس' },
  'engine-overheating-dubai-what-to-do': { href: '/services/mercedes-mechanical-repair-dubai', label: 'فحص وإصلاح مرسيدس الميكانيكي' },
  'ferrari-488-service-dubai-guide': { href: '/brands/ferrari-service-dubai', label: 'خدمات صيانة وإصلاح فيراري' },
  'mercedes-repair-dubai-complete-guide': { href: '/brands/mercedes-benz-service-dubai', label: 'خدمات صيانة وإصلاح مرسيدس' },
  'transmission-service-7g-9g-dubai': { href: '/services/mercedes-transmission-repair-dubai', label: 'فحص ناقل حركة مرسيدس' },
};

const BlogPost = () => {
  const { isArabic, localizedPath } = useLocale();
  const { slug } = useParams<{ slug: string }>();
  const sourcePost = slug ? getBlogPostBySlug(slug) : undefined;
  const post = sourcePost && isArabic ? localizeBlogPostToArabic(sourcePost) : sourcePost;

  const articleJsonLd = React.useMemo(() => {
    if (!post) return undefined;
    const url = `https://digitecme.com${isArabic ? '/ar' : ''}/blog/${post.slug}`;
    const breadcrumb = buildBreadcrumb(url, [
      { name: isArabic ? 'الرئيسية' : 'Home', url: `https://digitecme.com${isArabic ? '/ar' : '/'}` },
      { name: isArabic ? 'المقالات' : 'Blog', url: `https://digitecme.com${isArabic ? '/ar' : ''}/blog` },
      { name: post.title, url },
    ]);
    const webPage = buildWebPage({
      url,
      name: post.metaTitle,
      description: post.metaDescription,
      type: 'ItemPage',
      breadcrumbId: `${url}#breadcrumb`,
      primaryImage: post.coverImage,
      datePublished: post.date,
      dateModified: post.updatedDate,
      mainEntityId: `${url}#article`,
    });
    const article = buildArticle({
      url,
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      dateModified: post.updatedDate,
      author: post.author,
      authorType: 'Organization',
      image: post.coverImage,
      section: post.category,
      keywords: post.keywords,
    });
    const faq = buildFAQ(url, getArticleFaqs(post.content));
    return pageGraph([webPage, breadcrumb, article, ...(faq ? [faq] : [])]);
  }, [isArabic, post]);

  useSeo({
    title: post?.metaTitle || 'Blog | Digitec Performance Center',
    description: post?.metaDescription || 'Digitec Performance Center blog.',
    keywords: post?.keywords,
    ogTitle: post?.ogTitle,
    ogDescription: post?.ogDescription,
    ogType: post?.ogType,
    twitterCard: post?.twitterCard,
    twitterTitle: post?.twitterTitle,
    twitterDescription: post?.twitterDescription,
    canonical:
      post ? `https://digitecme.com${isArabic ? '/ar' : ''}/blog/${post.slug}` : `https://digitecme.com${isArabic ? '/ar' : ''}/blog`,
    jsonLd: articleJsonLd,
    noindex: isArabic && Boolean(post && MERCEDES_UNTRANSLATED_MODEL_PATHS.has(`/blog/${post.slug}`)),
  });

  if (!post) return <Navigate to={localizedPath('/blog')} replace />;

  const related = getRelatedArticles(sourcePost ?? post, blogPosts.filter((item) => !isArabic || !MERCEDES_UNTRANSLATED_MODEL_PATHS.has(`/blog/${item.slug}`)))
    .map((item) => (isArabic ? localizePostSummaryToArabic(item) : item));
  const articleSections = post.content.flatMap((block, index) => block.type === 'h2' && block.text ? [{ title: block.text, id: `article-section-${index + 1}` }] : []);
  const relatedService = relatedServiceByPost[post.slug];
  const relatedServiceCopy = relatedService && isArabic
    ? {
        ...relatedService,
        label: 'الخدمة المرتبطة بهذا الموضوع',
        description: 'احجز فحصاً متخصصاً لدى فريق ديجي-تك في القوز لتحديد السبب والحصول على توصية واضحة قبل بدء الإصلاح.',
        ...arabicRelatedServiceByPost[post.slug],
      }
    : relatedService;

  return (
    <div className="site-page min-h-screen bg-black text-off-white">
      <Header />
      <main>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/[0.08] bg-[#101113] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-12">
          <div className="max-w-4xl">
          <Link
            to="/blog"
            className="mb-8 inline-flex items-center gap-2 text-sm text-white/48 transition-colors hover:text-burnt-orange"
          >
            <ArrowLeft className={`w-4 h-4 ${isArabic ? 'rotate-180' : ''}`} />
            {isArabic ? 'العودة إلى المقالات' : 'Back to journal'}
          </Link>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="home-kicker mb-5 block"
          >
            {isArabic ? categoryArabic[post.category] ?? post.category : post.category}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-7 max-w-4xl text-[clamp(2.65rem,5vw,5rem)] font-semibold leading-[1.02] tracking-[-0.045em]"
          >
            {post.title}
          </motion.h1>
          <div className="flex flex-wrap items-center gap-5 text-sm text-white/45">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {new Date(post.date).toLocaleDateString(isArabic ? 'ar-AE' : 'en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                timeZone: 'UTC',
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
            {post.updatedDate && <span>{isArabic ? 'تحديث: ' : 'Updated: '}{post.updatedDate}</span>}
          </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-5 sm:px-6">
          <p className="text-lg text-white/70 leading-relaxed mb-10 font-light italic border-l-2 border-burnt-orange pl-5">
            {post.excerpt}
          </p>
          {post.coverImage && (
            <figure className="mb-10 overflow-hidden rounded-2xl border border-white/10 bg-charcoal">
              <img
                src={post.coverImage}
                alt={post.title}
                className="h-[28rem] w-full object-cover object-center sm:h-[34rem]"
                loading="eager"
              />
              <figcaption className="px-4 py-3 text-sm text-white/55">
                {post.title}
              </figcaption>
            </figure>
          )}
          {post.video && (
            <figure className="mb-10 overflow-hidden rounded-2xl border border-white/10 bg-charcoal">
              <video
                className="max-h-[38rem] w-full bg-black object-contain"
                controls
                preload="metadata"
                poster={post.video.poster}
              >
                <source src={post.video.src} type="video/quicktime" />
                {isArabic ? 'المتصفح لا يدعم تشغيل هذا الفيديو.' : 'Your browser does not support this video.'}
              </video>
              <figcaption className="px-4 py-3 text-sm text-white/55">{post.video.caption}</figcaption>
            </figure>
          )}
          {post.gallery && post.gallery.length > 0 && (
            <section className="mb-10" aria-label={isArabic ? 'صور دراسة حالة من الورشة' : 'Workshop case study gallery'}>
              <p className="mb-4 text-burnt-orange text-xs font-bold uppercase tracking-wider">{isArabic ? 'حالة عمل حقيقية من الورشة' : 'Real workshop case study'}</p>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {post.gallery.map((image) => (
                  <figure key={image.src} className="overflow-hidden rounded-2xl border border-white/10 bg-charcoal">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="aspect-[4/5] w-full object-cover object-center"
                      loading="lazy"
                    />
                    <figcaption className="px-4 py-3 text-sm leading-relaxed text-white/55">{image.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </section>
          )}
          {articleSections.length >= 3 && (
            <nav aria-label={isArabic ? 'في هذا المقال' : 'In this article'} className="mb-10 rounded-xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
              <p className="mb-3 font-semibold">{isArabic ? 'في هذا المقال' : 'In this article'}</p>
              <ol className="grid gap-3 text-sm leading-relaxed sm:grid-cols-2">
                {articleSections.map((section) => <li key={section.id}><a href={`#${section.id}`} className="text-white/70 underline decoration-white/20 underline-offset-4 hover:text-burnt-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burnt-orange">{section.title}</a></li>)}
              </ol>
            </nav>
          )}
          <article className="space-y-6">
            {post.content.map((block, i) => {
              if (block.type === 'h2')
                return (
                  <h2 key={i} id={`article-section-${i + 1}`} className="scroll-mt-28 text-2xl sm:text-3xl font-black mt-10 mb-2">
                    {block.text}
                  </h2>
                );
              if (block.type === 'h3')
                return (
                  <h3 key={i} className="text-xl font-bold mt-6">
                    {block.text}
                  </h3>
                );
              if (block.type === 'ul')
                return (
                  <ul key={i} className="space-y-2 pl-1">
                    {block.items?.map((it, j) => (
                      <li key={j} className="flex gap-3 text-white/70 leading-relaxed">
                        <span className="text-burnt-orange mt-1.5">▸</span>
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                );
              return (
                <p key={i} className="text-white/70 leading-relaxed text-base">
                  {block.text}
                  {!isArabic && block.links?.length ? <span className="mt-3 flex flex-wrap gap-x-5 gap-y-2">{block.links.map((link) => <Link key={link.href} to={link.href} className="text-burnt-orange underline">{link.label}</Link>)}</span> : null}
                </p>
              );
            })}
          </article>
        </div>
      </section>

      {relatedServiceCopy && (
        <section className="pb-12 md:pb-16">
          <div className="max-w-3xl mx-auto px-5 sm:px-6">
            <aside className="border border-burnt-orange/30 bg-burnt-orange/10 p-5 sm:p-6" aria-label={isArabic ? 'خدمة ذات صلة' : 'Related service'}>
              <p className="text-burnt-orange text-xs font-bold uppercase tracking-wider mb-2">{isArabic ? 'خدمة ذات صلة' : 'Related service'}</p>
              <h2 className="text-xl sm:text-2xl font-black mb-2">{isArabic ? 'هل تحتاج إلى فحص متخصص؟' : `Need ${relatedServiceCopy.label}?`}</h2>
              <p className="text-white/70 leading-relaxed mb-4">{relatedServiceCopy.description}</p>
              <Link to={relatedServiceCopy.href} className="btn-primary inline-flex">
                {isArabic ? 'استكشف الخدمة واحجز موعداً' : `Explore ${relatedServiceCopy.label}`}
              </Link>
            </aside>
          </div>
        </section>
      )}

      {/* Related */}
      {related.length > 0 && (
        <section className="pb-20">
          <div className="max-w-5xl mx-auto px-5 sm:px-6">
            <h2 className="text-2xl font-black mb-8">
              {isArabic ? <>تابع <span className="text-burnt-orange">القراءة</span></> : <>Continue <span className="text-burnt-orange">reading</span></>}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  to={`/blog/${p.slug}`}
                  className="card-premium group rounded-2xl p-6 transition-all"
                >
                  <span className="text-burnt-orange text-xs font-bold uppercase tracking-wider">
                    {isArabic ? categoryArabic[p.category] ?? p.category : p.category}
                  </span>
                  <h3 className="font-bold text-lg mt-2 mb-2 group-hover:text-burnt-orange transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-white/50 text-sm line-clamp-2">{p.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
