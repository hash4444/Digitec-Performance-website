import { LocalizedLink as Link } from '@/components/LocalizedLink';
import Header from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useSeo } from '@/hooks/use-seo';
import { allServices } from '@/data/services';
import { brands } from '@/data/brands';
import { blogPosts } from '@/data/blogPosts';
import { brandWorkshopArticleSummaries } from '@/data/brandWorkshopArticles';
import { localGaragePages } from '@/data/localGaragePages';
import { bestWorkshopPages } from '@/data/bestWorkshopPages';
import { useLocale } from '@/i18n/use-locale';
import { localizeServiceToArabic } from '@/i18n/ar-services';
import { localizeBrandToArabic } from '@/i18n/ar-brands';
import { localizePostSummaryToArabic } from '@/i18n/ar-blog';
import { localizeBestWorkshopPageToArabic } from '@/i18n/ar-best-workshop';
import { buildBreadcrumb, buildWebPage, pageGraph, SITE_URL } from '@/lib/schema';

const SitemapPage = () => {
  const { isArabic } = useLocale();
  const url = `${SITE_URL}${isArabic ? '/ar' : ''}/sitemap`;

  const displayedServices = allServices
    .filter((service) => !['mercedes-repair-dubai', 'mercedes-service-dubai'].includes(service.slug))
    .map((service) => (isArabic ? localizeServiceToArabic(service) : service));
  const displayedBrands = brands.map((brand) => (isArabic ? localizeBrandToArabic(brand) : brand));
  const displayedPosts = [...brandWorkshopArticleSummaries, ...blogPosts]
    .map((post) => (isArabic ? localizePostSummaryToArabic(post) : post));
  const displayedWorkshopPages = bestWorkshopPages.map((page) => (isArabic ? localizeBestWorkshopPageToArabic(page) : page));

  const groups = [
    {
      title: isArabic ? 'الصفحات الرئيسية' : 'Main pages',
      links: [
        { label: isArabic ? 'الرئيسية' : 'Home', to: '/' },
        { label: isArabic ? 'خدمات السيارات' : 'Car services', to: '/services' },
        { label: isArabic ? 'علامات السيارات' : 'Car brands', to: '/brands' },
        { label: isArabic ? 'تطوير الأداء' : 'Performance tuning', to: '/tuning' },
        { label: isArabic ? 'عن ديجي-تك' : 'About Digi-Tec', to: '/about' },
        { label: isArabic ? 'الأسئلة الشائعة' : 'Frequently asked questions', to: '/faq' },
        { label: isArabic ? 'أدلة الورشة' : 'Workshop guides', to: '/blog' },
      ],
    },
    {
      title: isArabic ? 'الخدمات الأساسية' : 'Core services',
      links: [
        ...displayedServices.map((service) => ({ label: service.title, to: `/services/${service.slug}` })),
        ...localGaragePages.map((page) => ({
          label: isArabic
            ? ({
                'garage-near-me-dubai': 'ورشة سيارات قريبة في دبي',
                'roadside-assistance-dubai': 'المساعدة على الطريق في دبي',
                'car-garage-dubai': 'كراج سيارات في دبي',
              }[page.slug] ?? page.title)
            : page.title,
          to: `/services/${page.slug}`,
        })),
      ],
    },
    {
      title: isArabic ? 'العلامات التي نخدمها' : 'Brands we service',
      links: displayedBrands.map((brand) => ({ label: isArabic ? `خدمة ${brand.name} في دبي` : `${brand.name} service in Dubai`, to: `/brands/${brand.slug}` })),
    },
    {
      title: isArabic ? 'أدلة الورشة' : 'Workshop guides',
      links: displayedPosts.map((post) => ({ label: post.title, to: `/blog/${post.slug}` })),
    },
    {
      title: isArabic ? 'اعثر على الورشة المناسبة' : 'Find the right workshop',
      links: displayedWorkshopPages.map((page) => ({ label: page.h1, to: `/${page.slug}` })),
    },
  ];

  const sitemapItems = groups.flatMap((group) => group.links);
  const localizedUrl = (path: string) =>
    `${SITE_URL}${isArabic ? '/ar' : ''}${path === '/' ? (isArabic ? '' : '/') : path}`;
  const sitemapListId = `${url}#sitemap-list`;
  const sitemapGraph = pageGraph([
    buildWebPage({
      url,
      name: isArabic ? 'خريطة موقع ديجي-تك بيرفورمانس' : 'Digi-Tec Performance Centre HTML Sitemap',
      description: isArabic
        ? 'دليل منظم للصفحات الرئيسية والخدمات والعلامات وأدلة الورشة على موقع ديجي-تك.'
        : 'An organized directory of Digi-Tec main pages, services, vehicle brands and workshop guides.',
      type: 'CollectionPage',
      breadcrumbId: `${url}#breadcrumb`,
      mainEntityId: sitemapListId,
    }),
    buildBreadcrumb(url, [
      { name: isArabic ? 'الرئيسية' : 'Home', url: localizedUrl('/') },
      { name: isArabic ? 'خريطة الموقع' : 'Sitemap', url },
    ]),
    {
      '@type': 'ItemList',
      '@id': sitemapListId,
      name: isArabic ? 'صفحات موقع ديجي-تك' : 'Digi-Tec website pages',
      numberOfItems: sitemapItems.length,
      itemListElement: sitemapItems.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.label,
        item: localizedUrl(item.to),
      })),
    },
  ]);

  useSeo({
    title: isArabic ? 'خريطة الموقع | ديجي-تك بيرفورمانس دبي' : 'HTML Sitemap | Digi-Tec Performance Centre Dubai',
    description: isArabic ? 'تصفح خدمات ديجي-تك وصفحات العلامات المتخصصة وأدلة الورشة ومعلومات موقعنا في دبي.' : 'Browse Digi-Tec Performance Centre services, specialist car brands, workshop guides, and Dubai location information.',
    canonical: url,
    jsonLd: sitemapGraph,
  });

  return (
    <div className="min-h-screen bg-black text-off-white">
      <Header />
      <main className="max-w-6xl mx-auto px-5 sm:px-6 py-16 md:py-24">
        <p className="eyebrow mb-4">{isArabic ? 'التنقل في الموقع' : 'Website navigation'}</p>
        <h1 className="text-3xl sm:text-5xl font-black mb-4">{isArabic ? <>خريطة <span className="text-burnt-orange">الموقع</span></> : <>HTML <span className="text-burnt-orange">Sitemap</span></>}</h1>
        <p className="text-white/60 max-w-2xl leading-relaxed mb-12">
          {isArabic ? 'تصفح خدمات ديجي-تك وصفحات العلامات المتخصصة ونصائح الورشة العملية للسيارات الفاخرة وعالية الأداء في دبي.' : 'Browse Digi-Tec services, specialist brand pages, and practical workshop advice for luxury and performance vehicles in Dubai.'}
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
