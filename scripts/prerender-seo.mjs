import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const siteUrl = 'https://digitecme.com';

// Lovable deploys this Vite app as a single-page application. These route files
// make the two primary Mercedes URLs independently understandable before JS runs.
// The visible React pages remain the source of truth; this is matching crawlable
// HTML for search engines and social crawlers that read the initial response only.
const routes = [
  {
    path: '/services/mercedes-repair-dubai',
    title: 'Mercedes Repair Dubai | AMG, Star Diagnostic, OEM Parts',
    description: 'Mercedes specialist in Dubai. AMG, Star Diagnostic and OEM parts, faster than the dealer with transparent pricing. Book today.',
    heading: 'Mercedes Repair in Dubai',
    summary: 'Digi-Tec Performance Centre is an independent Mercedes-Benz and AMG specialist in Al Quoz, Dubai. We provide dealer-level diagnostics, scheduled maintenance, mechanical repair, transmission work, AIRMATIC suspension repair, brakes, AC and electrical fault finding.',
    services: ['Mercedes diagnostics with XENTRY', 'AMG engine and mechanical repair', '9G-TRONIC and 7G-TRONIC transmission service', 'AIRMATIC and suspension repair', 'Mercedes Service A and Service B'],
  },
  {
    path: '/brands/mercedes-benz-service-dubai',
    title: 'Mercedes-Benz Service & Repair Dubai | DIGI-TEC',
    description: 'Mercedes-Benz service and repair in Dubai for C-Class, E-Class, S-Class, G-Class and AMG models. XENTRY diagnostics, OEM parts and clear quotes.',
    heading: 'Mercedes-Benz Service & Repair in Dubai',
    summary: 'Digi-Tec Performance Centre provides specialist Mercedes-Benz service and repair from its Al Quoz workshop in Dubai. Our technicians support daily Mercedes models, luxury S-Class and Maybach vehicles, and high-performance AMG platforms with diagnostic-first repairs and transparent advice.',
    services: ['Routine Mercedes maintenance', 'XENTRY diagnostics and coding', 'AMG performance and mechanical work', 'Brake, AC and electrical repair', 'Suspension and transmission service'],
  },
];

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
    `<div id="root"><main data-prerendered-seo="true"><h1>${escapeHtml(route.heading)}</h1><p>${escapeHtml(route.summary)}</p><h2>Mercedes specialist services in Dubai</h2><ul>${serviceList}</ul><p>Book an inspection with Digi-Tec Performance Centre in Al Quoz, Dubai. Call +971 4 340 2223 or contact us on WhatsApp.</p></main></div>`,
  );
  return html;
};

const distDirectory = path.resolve('dist');
const template = await readFile(path.join(distDirectory, 'index.html'), 'utf8');

for (const route of routes) {
  const outputDirectory = path.join(distDirectory, route.path.replace(/^\//, ''));
  await mkdir(outputDirectory, { recursive: true });
  await writeFile(path.join(outputDirectory, 'index.html'), createRouteHtml(template, route));
}

console.log(`Generated crawlable HTML for ${routes.length} Mercedes routes.`);
