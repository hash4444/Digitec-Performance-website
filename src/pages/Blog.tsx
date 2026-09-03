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
import { PageIntro } from '@/components/PageIntro';

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
          mainEntityId: `${url}#blog`,
        }),
        buildBreadcrumb(url, [
          { name: isArabic ? 'الرئيسية' : 'Home', url: `https://digitecme.com${isArabic ? '/ar' : '/'}` },
          { name: isArabic ? 'المقالات' : 'Blog', url },
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
            author: organizationRef,
            publisher: organizationRef,
          })),
        },
      ]),
    [allPosts, isArabic, url],
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
    <div className="site-page min-h-screen bg-black text-off-white">
      <Header />

      <PageIntro
        eyebrow={isArabic ? 'خبرة ومعرفة' : 'Insights & Expertise'}
        title={isArabic ? <>مجلة <span className="text-burnt-orange">ديجي-تك</span></> : <>The <span className="text-burnt-orange">Digitec</span> Journal</>}
        description={isArabic ? 'مقالات هندسية وأدلة لتطوير الأداء والعناية بالسيارات الفاخرة يكتبها فريق ورشتنا في دبي.' : 'Engineering insights, tuning deep dives, and luxury car care guides written by our Dubai workshop team.'}
      />

      {/* Category filter */}
      <section className="border-b border-white/[0.08] py-7">
        <div className="mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-12">
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {blogCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`border-b py-2 text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? 'border-burnt-orange text-white'
                    : 'border-transparent text-white/48 hover:border-white/30 hover:text-white'
                }`}
              >
                {isArabic ? categoryArabic[cat] ?? cat : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts grid */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
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
                  className="block h-full overflow-hidden"
                >
                  <div
                    className={`relative aspect-[16/10] overflow-hidden rounded-lg bg-gradient-to-br ${post.coverGradient}`}
                  >
                    {post.coverImage && (
                      <img
                        src={post.coverImage}
                        alt={isArabic ? `صورة من ورشة ديجي-تك لمقال ${post.title}` : `Digi-Tec workshop illustration for ${post.title}`}
                        className="absolute inset-0 h-full w-full object-cover object-center"
                        loading={idx < 3 ? 'eager' : 'lazy'}
                      />
                    )}
                  </div>
                  <div className="pt-5">
                    <div className="mb-3 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-burnt-orange">
                      {isArabic ? categoryArabic[post.category] ?? post.category : post.category}
                    </div>
                    <div className="mb-3 flex items-center gap-4 text-xs text-white/38">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.date).toLocaleDateString(isArabic ? 'ar-AE' : 'en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          timeZone: 'UTC',
                        })}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3" />
                        {isArabic ? post.readTime.replace('min read', 'دقيقة قراءة') : post.readTime}
                      </span>
                    </div>
                    <h2 className="mb-3 text-xl font-semibold leading-snug tracking-[-0.025em] transition-colors group-hover:text-burnt-orange">
                      {post.title}
                    </h2>
                    <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-white/48">
                      {post.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-burnt-orange">
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
