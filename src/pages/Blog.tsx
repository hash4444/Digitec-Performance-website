import React, { useState, useMemo } from 'react';
import { LocalizedLink as Link } from '@/components/LocalizedLink';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { useSeo } from '@/hooks/use-seo';
import Header from '@/components/Header';
import { FinalCTA } from '@/components/FinalCTA';
import { Footer } from '@/components/Footer';
import { blogPosts, blogCategories } from '@/data/blogPosts';
import { brandWorkshopArticleSummaries } from '@/data/brandWorkshopArticles';
import { buildBreadcrumb, buildWebPage, organizationRef, pageGraph } from '@/lib/schema';
import { useLocale } from '@/i18n/use-locale';
import { categoryArabic, localizePostSummaryToArabic } from '@/i18n/ar-blog';

const Blog = () => {
  const { isArabic } = useLocale();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const url = `https://digitecme.com${isArabic ? '/ar' : ''}/blog`;
  const allPosts = [...brandWorkshopArticleSummaries, ...blogPosts]
    .map((post) => (isArabic ? localizePostSummaryToArabic(post) : post))
    .sort((first, second) => new Date(second.date).getTime() - new Date(first.date).getTime());
  const blogGraph = React.useMemo(
    () =>
      pageGraph([
        buildWebPage({
          url,
          name: isArabic ? 'مدونة السيارات في دبي | مركز ديجي-تك' : 'Automotive Blog Dubai | Digitec Performance Center',
          description: isArabic
            ? 'مقالات وإرشادات عربية عن صيانة السيارات الفاخرة وإصلاحها وتطوير أدائها والعناية بها في دبي.'
            : 'Expert insights on Mercedes service, GAD tuning, ceramic coating and luxury car care in Dubai.',
          type: 'CollectionPage',
          breadcrumbId: `${url}#breadcrumb`,
        }),
        buildBreadcrumb(url, [
          { name: 'Home', url: 'https://digitecme.com/' },
          { name: 'Blog', url },
        ]),
        {
          '@type': 'Blog',
          '@id': `${url}#blog`,
          name: isArabic ? 'مدونة مركز ديجي-تك بيرفورمانس' : 'Digitec Performance Center Blog',
          url,
          publisher: organizationRef,
          blogPost: allPosts.map((p) => ({
            '@type': 'BlogPosting',
            '@id': `https://digitecme.com${isArabic ? '/ar' : ''}/blog/${p.slug}#article`,
            headline: p.title,
            url: `https://digitecme.com${isArabic ? '/ar' : ''}/blog/${p.slug}`,
            datePublished: p.date,
            author: { '@type': 'Organization', name: p.author },
            publisher: organizationRef,
          })),
        },
      ]),
    [allPosts],
  );

  useSeo({
    title: isArabic ? 'مدونة السيارات في دبي | مركز ديجي-تك' : 'Automotive Blog Dubai | Digitec Performance Center',
    description: isArabic ? 'مقالات وإرشادات عن صيانة السيارات الفاخرة وإصلاح مرسيدس وتطوير الأداء وحماية الطلاء والعناية بالسيارات في دبي.' : 'Expert insights on Mercedes service, GAD tuning, ceramic coating, and luxury car care in Dubai from Digitec Performance Center.',
    canonical: url,
    jsonLd: blogGraph,
  });

  const filtered = useMemo(
    () =>
      activeCategory === 'All'
        ? allPosts
        : allPosts.filter((p) => p.category === activeCategory),
    [activeCategory, allPosts],
  );

  return (
    <div className="min-h-screen bg-black text-off-white">
      <Header />

      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-charcoal/30 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,107,53,0.06)_0%,_transparent_70%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="eyebrow mb-4"
          >
            {isArabic ? 'خبرة ومعرفة' : 'Insights & Expertise'}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black mb-6"
          >
            {isArabic ? <>مجلة <span className="text-burnt-orange">ديجي-تك</span></> : <>The <span className="text-burnt-orange">Digitec</span> Journal</>}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-white/50 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            {isArabic ? 'مقالات هندسية وأدلة لتطوير الأداء والعناية بالسيارات الفاخرة يكتبها فريق ورشتنا في دبي.' : 'Engineering insights, tuning deep dives, and luxury car care guides written by our Dubai workshop team.'}
          </motion.p>
        </div>
      </section>

      {/* Category filter */}
      <section className="pb-8">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <div className="flex flex-wrap gap-2 justify-center">
            {blogCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${
                  activeCategory === cat
                    ? 'bg-burnt-orange text-white border-burnt-orange'
                    : 'bg-white/[0.03] text-white/60 border-white/10 hover:border-burnt-orange/40 hover:text-white'
                }`}
              >
                {isArabic ? categoryArabic[cat] ?? cat : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts grid */}
      <section className="pb-20 md:pb-28">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post, idx) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="group"
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="card-premium block rounded-2xl overflow-hidden transition-all duration-500 h-full"
                >
                  <div
                    className={`aspect-[16/10] bg-gradient-to-br ${post.coverGradient} relative overflow-hidden`}
                  >
                    {post.coverImage && (
                      <img
                        src={post.coverImage}
                        alt={`Digi-Tec workshop illustration for ${post.title}`}
                        className="absolute inset-0 h-full w-full object-cover object-center"
                        loading={idx < 3 ? 'eager' : 'lazy'}
                      />
                    )}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,107,53,0.3),_transparent_60%)]" />
                    <div className="absolute bottom-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm text-burnt-orange text-xs font-bold uppercase tracking-wider border border-burnt-orange/30">
                        {isArabic ? categoryArabic[post.category] ?? post.category : post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-white/40 text-xs mb-3">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.date).toLocaleDateString(isArabic ? 'ar-AE' : 'en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3" />
                        {isArabic ? post.readTime.replace('min read', 'دقيقة قراءة') : post.readTime}
                      </span>
                    </div>
                    <h2 className="text-lg font-bold mb-3 group-hover:text-burnt-orange transition-colors leading-snug">
                      {post.title}
                    </h2>
                    <p className="text-white/50 text-sm leading-relaxed mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-2 text-burnt-orange text-sm font-semibold">
                      {isArabic ? 'اقرأ المقال' : 'Read article'}
                      <ArrowRight className={`w-4 h-4 transition-transform ${isArabic ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="text-center text-white/40 py-16">{isArabic ? 'لا توجد مقالات في هذا التصنيف حالياً.' : 'No articles in this category yet.'}</p>
          )}
        </div>
      </section>

      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Blog;
