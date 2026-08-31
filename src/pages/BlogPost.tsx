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
      mainEntityId: `${url}#article`,
    });
    const article = buildArticle({
      url,
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
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
  });

  if (!post) return <Navigate to={localizedPath('/blog')} replace />;

  const related = blogPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2)
    .map((item) => (isArabic ? localizePostSummaryToArabic(item) : item));
  const relatedService = relatedServiceByPost[post.slug];
  const relatedServiceCopy = relatedService && isArabic
    ? {
        ...relatedService,
        label: 'الخدمة المرتبطة بهذا الموضوع',
        description: 'احجز فحصاً متخصصاً لدى فريق ديجي-تك في القوز لتحديد السبب والحصول على توصية واضحة قبل بدء الإصلاح.',
      }
    : relatedService;

  return (
    <div className="min-h-screen bg-black text-off-white">
      <Header />

      {/* Hero */}
      <section
        className={`relative py-20 md:py-28 overflow-hidden bg-gradient-to-br ${post.coverGradient}`}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-6">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-white/70 hover:text-burnt-orange text-sm mb-6 transition-colors"
          >
            <ArrowLeft className={`w-4 h-4 ${isArabic ? 'rotate-180' : ''}`} />
            {isArabic ? 'العودة إلى المقالات' : 'Back to journal'}
          </Link>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-3 py-1 rounded-full bg-burnt-orange/20 text-burnt-orange text-xs font-bold uppercase tracking-wider border border-burnt-orange/40 mb-5"
          >
            {isArabic ? categoryArabic[post.category] ?? post.category : post.category}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 leading-tight"
          >
            {post.title}
          </motion.h1>
          <div className="flex flex-wrap items-center gap-5 text-white/60 text-sm">
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
          <article className="space-y-6">
            {post.content.map((block, i) => {
              if (block.type === 'h2')
                return (
                  <h2 key={i} className="text-2xl sm:text-3xl font-black mt-10 mb-2">
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
      <Footer />
    </div>
  );
};

export default BlogPost;
