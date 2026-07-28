import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const siteUrl = 'https://digitecme.com';

// Lovable deploys this Vite app as a single-page application. These route files
// make the page metadata and main topic independently understandable before JS
// runs. The visible React pages remain the source of truth; this is matching
// crawlable HTML for search engines and social crawlers that read the initial
// response only.
const priorityRoutes = [
  {
    path: '/services/mercedes-repair-dubai',
    title: 'Mercedes Repair Dubai | AMG, Star Diagnostic, OEM Parts',
    description: 'Mercedes specialist in Dubai. AMG, Star Diagnostic and OEM parts, faster than the dealer with transparent pricing. Book today.',
    heading: 'Mercedes Repair in Dubai',
    sectionHeading: 'Mercedes specialist services in Dubai',
    summary: 'Digi-Tec Performance Centre is an independent Mercedes-Benz and AMG specialist in Al Quoz, Dubai. We provide dealer-level diagnostics, scheduled maintenance, mechanical repair, transmission work, AIRMATIC suspension repair, brakes, AC and electrical fault finding.',
    services: ['Mercedes diagnostics with XENTRY', 'AMG engine and mechanical repair', '9G-TRONIC and 7G-TRONIC transmission service', 'AIRMATIC and suspension repair', 'Mercedes Service A and Service B'],
  },
  {
    path: '/brands/mercedes-benz-service-dubai',
    title: 'Mercedes-Benz Service & Repair Dubai | DIGI-TEC',
    description: 'Mercedes-Benz service and repair in Dubai for C-Class, E-Class, S-Class, G-Class and AMG models. XENTRY diagnostics, OEM parts and clear quotes.',
    heading: 'Mercedes-Benz Service & Repair in Dubai',
    sectionHeading: 'Mercedes specialist services in Dubai',
    summary: 'Digi-Tec Performance Centre provides specialist Mercedes-Benz service and repair from its Al Quoz workshop in Dubai. Our technicians support daily Mercedes models, luxury S-Class and Maybach vehicles, and high-performance AMG platforms with diagnostic-first repairs and transparent advice.',
    services: ['Routine Mercedes maintenance', 'XENTRY diagnostics and coding', 'AMG performance and mechanical work', 'Brake, AC and electrical repair', 'Suspension and transmission service'],
  },
];

const titleCase = (value) => value
  .split('-')
  .filter(Boolean)
  .map((word) => ({ ac: 'AC', ecu: 'ECU', byd: 'BYD', rox: 'ROX', amg: 'AMG' }[word] ?? `${word.charAt(0).toUpperCase()}${word.slice(1)}`))
  .join(' ');

const brandNameFromSlug = (slug) => titleCase(slug.replace(/-service-dubai$/, ''))
  .replace('Mercedes Benz', 'Mercedes-Benz')
  .replace('Rolls Royce', 'Rolls-Royce')
  .replace('Land Rover', 'Land Rover');

const serviceNameFromSlug = (slug) => titleCase(slug)
  .replace('Ac ', 'AC ')
  .replace('Ecu ', 'ECU ');

const createGeneratedRoute = (pathname) => {
  const isArabic = pathname.startsWith('/ar/');
  const segments = pathname.replace(/^\/ar\//, '/').split('/').filter(Boolean);
  const [section, brandSlug, serviceSlug] = segments;

  if (section === 'brands') {
    const brand = brandNameFromSlug(brandSlug);
    const service = serviceSlug ? serviceNameFromSlug(serviceSlug) : null;
    const EnglishHeading = service ? `${brand} ${service} in Dubai` : `${brand} Service & Repair in Dubai`;
    const heading = isArabic
      ? (service ? `${service} ${brand} في دبي` : `صيانة وإصلاح ${brand} في دبي`)
      : EnglishHeading;
    const title = isArabic
      ? `${heading} | ديجي-تك`
      : `${EnglishHeading} | Digi-Tec`;
    const description = isArabic
      ? `خدمة ${brand} المتخصصة في دبي لدى ديجي-تك في القوز: فحص دقيق، صيانة وإصلاحات موثوقة.`
      : `${brand} specialist service in Dubai at Digi-Tec Al Quoz. Accurate diagnostics, maintenance and repairs with clear advice.`;

    return {
      path: pathname,
      title,
      description,
      heading,
      sectionHeading: isArabic ? `خدمات ${brand} المتخصصة في دبي` : `${brand} specialist services in Dubai`,
      summary: isArabic
        ? `يوفر ديجي-تك في القوز، دبي خدمة ${brand} المتخصصة، من التشخيص إلى الصيانة والإصلاح، مع فحص واضح قبل بدء العمل.`
        : `Digi-Tec Performance Centre in Al Quoz, Dubai provides specialist ${brand} diagnostics, maintenance and repair with a clear inspection before work begins.`,
      services: isArabic
        ? ['فحص وتشخيص متخصص', 'صيانة دورية', 'إصلاحات ميكانيكية وكهربائية', 'قطع مناسبة واختبار نهائي']
        : ['Specialist diagnostic inspection', 'Routine maintenance', 'Mechanical and electrical repair', 'Suitable parts and final testing'],
    };
  }

  if (section === 'services') {
    const service = serviceNameFromSlug(brandSlug.replace(/-dubai$/, ''));
    const EnglishHeading = `${service} in Dubai`;
    const heading = isArabic ? `${service} في دبي` : EnglishHeading;
    return {
      path: pathname,
      title: isArabic ? `${heading} | ديجي-تك` : `${EnglishHeading} | Digi-Tec`,
      description: isArabic
        ? `خدمة ${service} في دبي لدى ديجي-تك في القوز. فحص احترافي وإصلاحات موثوقة للسيارات.`
        : `${service} in Dubai at Digi-Tec Al Quoz. Professional inspection, clear advice and reliable vehicle repair.`,
      heading,
      sectionHeading: isArabic ? `خدمة سيارات متخصصة في دبي` : `Specialist vehicle service in Dubai`,
      summary: isArabic
        ? `يوفر ديجي-تك في القوز، دبي خدمة ${service} للسيارات مع فحص واضح وخطة عمل مناسبة.`
        : `Digi-Tec Performance Centre in Al Quoz, Dubai provides ${service} with a clear inspection and a suitable repair plan.`,
      services: isArabic
        ? ['فحص شامل', 'تشخيص دقيق', 'إصلاحات موثوقة', 'اختبار نهائي']
        : ['Vehicle inspection', 'Accurate diagnostics', 'Reliable repair', 'Final testing'],
    };
  }

  return null;
};

const escapeHtml = (value) => value.replace(/[&<>'"]/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;',
}[character]));

const replaceTag = (html, pattern, replacement) => html.replace(pattern, replacement);

const createRouteHtml = (template, route) => {
  const url = `${siteUrl}${route.path}`;
  const serviceList = route.services.map((service) => `<li>${escapeHtml(service)}</li>`).join('');
  const schema = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: route.title,
        description: route.description,
        isPartOf: { '@id': `${siteUrl}/#website` },
      },
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: route.heading,
        description: route.description,
        url,
        provider: { '@id': `${siteUrl}/#business` },
        areaServed: { '@type': 'City', name: 'Dubai' },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: route.heading, item: url },
        ],
      },
    ],
  }).replace(/</g, '\\u003c');

  let html = template;
  html = replaceTag(html, /<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(route.title)}</title>`);
  html = replaceTag(html, /<meta name="description"[^>]*>/i, `<meta name="description" content="${escapeHtml(route.description)}">`);
  html = replaceTag(html, /<link rel="canonical"[^>]*>/i, `<link rel="canonical" href="${url}">`);
  html = replaceTag(html, /<meta property="og:url"[^>]*>/i, `<meta property="og:url" content="${url}">`);
  html = replaceTag(html, /<meta property="og:title"[^>]*>/i, `<meta property="og:title" content="${escapeHtml(route.title)}">`);
  html = replaceTag(html, /<meta name="twitter:title"[^>]*>/i, `<meta name="twitter:title" content="${escapeHtml(route.title)}">`);
  html = replaceTag(html, /<meta property="og:description"[^>]*>/i, `<meta property="og:description" content="${escapeHtml(route.description)}">`);
  html = replaceTag(html, /<meta name="twitter:description"[^>]*>/i, `<meta name="twitter:description" content="${escapeHtml(route.description)}">`);
  html = html.replace('</head>', `<script type="application/ld+json" data-prerendered-seo="true">${schema}</script>\n</head>`);
  html = html.replace(
    '<div id="root"></div>',
    `<div id="root"><main data-prerendered-seo="true"><h1>${escapeHtml(route.heading)}</h1><p>${escapeHtml(route.summary)}</p><h2>${escapeHtml(route.sectionHeading)}</h2><ul>${serviceList}</ul><p>Book an inspection with Digi-Tec Performance Centre in Al Quoz, Dubai. Call +971 4 340 2223 or contact us on WhatsApp.</p></main></div>`,
  );
  return html;
};

const distDirectory = path.resolve('dist');
const template = await readFile(path.join(distDirectory, 'index.html'), 'utf8');
const sitemap = await readFile(path.resolve('public/sitemap.xml'), 'utf8');
const sitemapPaths = [...sitemap.matchAll(/<loc>(https:\/\/digitecme\.com[^<]+)<\/loc>/g)]
  .map(([, url]) => new URL(url).pathname)
  .filter((pathname) => /^(?:\/ar)?\/(?:brands|services)\//.test(pathname));
const routeByPath = new Map(priorityRoutes.map((route) => [route.path, route]));

for (const pathname of sitemapPaths) {
  if (!routeByPath.has(pathname)) {
    const route = createGeneratedRoute(pathname);
    if (route) routeByPath.set(pathname, route);
  }
}

for (const route of routeByPath.values()) {
  const outputDirectory = path.join(distDirectory, route.path.replace(/^\//, ''));
  await mkdir(outputDirectory, { recursive: true });
  await writeFile(path.join(outputDirectory, 'index.html'), createRouteHtml(template, route));
}

console.log(`Generated crawlable HTML for ${routeByPath.size} brand and service routes.`);
