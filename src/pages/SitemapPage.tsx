import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useSeo } from '@/hooks/use-seo';
import { services } from '@/data/services';
import { brands } from '@/data/brands';
import { blogPosts } from '@/data/blogPosts';
import { bestWorkshopPages } from '@/data/bestWorkshopPages';

const SitemapPage = () => {
  useSeo({
    title: 'HTML Sitemap | Digi-Tec Performance Centre Dubai',
    description: 'Browse Digi-Tec Performance Centre services, specialist car brands, workshop guides, and Dubai location information.',
    canonical: 'https://digitecme.com/sitemap',
  });

  const groups = [
    {
      title: 'Main pages',
      links: [
        { label: 'Home', to: '/' },
        { label: 'Car services', to: '/services' },
        { label: 'Performance tuning', to: '/tuning' },
        { label: 'About Digi-Tec', to: '/about' },
        { label: 'Frequently asked questions', to: '/faq' },
        { label: 'Workshop guides', to: '/blog' },
      ],
    },
    {
      title: 'Core services',
      links: services.map((service) => ({ label: service.title, to: `/services/${service.slug}` })),
    },
    {
      title: 'Brands we service',
      links: brands.map((brand) => ({ label: `${brand.name} service in Dubai`, to: `/brands/${brand.slug}` })),
    },
    {
      title: 'Workshop guides',
      links: blogPosts.map((post) => ({ label: post.title, to: `/blog/${post.slug}` })),
    },
    {
      title: 'Find the right workshop',
      links: bestWorkshopPages.map((page) => ({ label: page.h1, to: `/${page.slug}` })),
    },
  ];

  return (
    <div className="min-h-screen bg-black text-off-white">
      <Header />
      <main className="max-w-6xl mx-auto px-5 sm:px-6 py-16 md:py-24">
        <p className="eyebrow mb-4">Website navigation</p>
        <h1 className="text-3xl sm:text-5xl font-black mb-4">HTML <span className="text-burnt-orange">Sitemap</span></h1>
        <p className="text-white/60 max-w-2xl leading-relaxed mb-12">
          Browse Digi-Tec services, specialist brand pages, and practical workshop advice for luxury and performance vehicles in Dubai.
        </p>
        <div className="grid md:grid-cols-2 gap-5">
          {groups.map((group) => (
            <section key={group.title} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6">
              <h2 className="text-xl font-bold mb-4">{group.title}</h2>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-sm text-white/65 hover:text-burnt-orange transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SitemapPage;
