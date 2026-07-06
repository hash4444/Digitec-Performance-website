import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowLeft, User } from 'lucide-react';
import { useSeo } from '@/hooks/use-seo';
import Header from '@/components/Header';
import { FinalCTA } from '@/components/FinalCTA';
import { Footer } from '@/components/Footer';
import { getBlogPostBySlug, blogPosts } from '@/data/blogPosts';
import { buildArticle, buildBreadcrumb, buildWebPage, pageGraph } from '@/lib/schema';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPostBySlug(slug) : undefined;

  const articleJsonLd = React.useMemo(() => {
    if (!post) return undefined;
    const url = post.canonicalOverride || `https://digitecme.com/blog/${post.slug}`;
    const breadcrumb = buildBreadcrumb(url, [
      { name: 'Home', url: 'https://digitecme.com/' },
      { name: 'Blog', url: 'https://digitecme.com/blog' },
      { name: post.title, url },
    ]);
    const webPage = buildWebPage({
      url,
      name: post.metaTitle,
      description: post.metaDescription,
      breadcrumbId: `${url}#breadcrumb`,
      datePublished: post.date,
      dateModified: post.date,
    });
    const article = buildArticle({
      url,
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      dateModified: post.date,
      author: post.author,
      authorType: 'Organization',
      section: post.category,
      keywords: post.keywords,
    });
    return pageGraph([webPage, breadcrumb, article]);
  }, [post]);

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
      post?.canonicalOverride ||
      (post ? `https://digitecme.com/blog/${post.slug}` : 'https://digitecme.com/blog'),
    jsonLd: articleJsonLd,
  });

  if (!post) return <Navigate to="/blog" replace />;

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

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
            <ArrowLeft className="w-4 h-4" />
            Back to journal
          </Link>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-3 py-1 rounded-full bg-burnt-orange/20 text-burnt-orange text-xs font-bold uppercase tracking-wider border border-burnt-orange/40 mb-5"
          >
            {post.category}
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
              {new Date(post.date).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
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

      {/* Related */}
      {related.length > 0 && (
        <section className="pb-20">
          <div className="max-w-5xl mx-auto px-5 sm:px-6">
            <h2 className="text-2xl font-black mb-8">
              Continue <span className="text-burnt-orange">reading</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  to={`/blog/${p.slug}`}
                  className="group bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 hover:border-burnt-orange/40 transition-all"
                >
                  <span className="text-burnt-orange text-xs font-bold uppercase tracking-wider">
                    {p.category}
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
