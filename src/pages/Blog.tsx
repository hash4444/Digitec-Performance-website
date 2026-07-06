import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { useSeo } from '@/hooks/use-seo';
import Header from '@/components/Header';
import { FinalCTA } from '@/components/FinalCTA';
import { Footer } from '@/components/Footer';
import { blogPosts, blogCategories } from '@/data/blogPosts';
import { buildBreadcrumb, buildWebPage, organizationRef, pageGraph } from '@/lib/schema';

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const url = 'https://digitecme.com/blog';
  const blogGraph = React.useMemo(
    () =>
      pageGraph([
        buildWebPage({
          url,
          name: 'Automotive Blog Dubai | Digitec Performance Center',
          description:
            'Expert insights on Mercedes service, GAD tuning, ceramic coating and luxury car care in Dubai.',
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
          name: 'Digitec Performance Center Blog',
          url,
          publisher: organizationRef,
          blogPost: blogPosts.map((p) => ({
            '@type': 'BlogPosting',
            '@id': `https://digitecme.com/blog/${p.slug}#article`,
            headline: p.title,
            url: `https://digitecme.com/blog/${p.slug}`,
            datePublished: p.date,
            author: { '@type': 'Organization', name: p.author },
            publisher: organizationRef,
          })),
        },
      ]),
    [],
  );

  useSeo({
    title: 'Automotive Blog Dubai | Digitec Performance Center',
    description:
      'Expert insights on Mercedes service, GAD tuning, ceramic coating, and luxury car care in Dubai from Digitec Performance Center.',
    canonical: 'https://digitecme.com/blog',
    jsonLd: blogGraph,
  });

  const filtered = useMemo(
    () =>
      activeCategory === 'All'
        ? blogPosts
        : blogPosts.filter((p) => p.category === activeCategory),
    [activeCategory],
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
            className="text-burnt-orange text-xs uppercase tracking-[0.3em] font-semibold mb-4"
          >
            Insights & Expertise
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black mb-6"
          >
            The <span className="text-burnt-orange">Digitec</span> Journal
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-white/50 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Engineering insights, tuning deep dives, and luxury car care guides written by our Dubai workshop team.
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
                {cat}
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
                  className="block bg-white/[0.03] border border-white/[0.06] rounded-3xl overflow-hidden hover:border-burnt-orange/40 transition-all duration-500 h-full"
                >
                  <div
                    className={`aspect-[16/10] bg-gradient-to-br ${post.coverGradient} relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,107,53,0.3),_transparent_60%)]" />
                    <div className="absolute bottom-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm text-burnt-orange text-xs font-bold uppercase tracking-wider border border-burnt-orange/30">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-white/40 text-xs mb-3">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.date).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
                    <h2 className="text-lg font-bold mb-3 group-hover:text-burnt-orange transition-colors leading-snug">
                      {post.title}
                    </h2>
                    <p className="text-white/50 text-sm leading-relaxed mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-2 text-burnt-orange text-sm font-semibold">
                      Read article
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="text-center text-white/40 py-16">No articles in this category yet.</p>
          )}
        </div>
      </section>

      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Blog;
