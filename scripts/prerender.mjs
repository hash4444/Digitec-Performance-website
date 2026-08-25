import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const SITE_URL = 'https://digitecme.com';
const root = process.cwd();
const distDirectory = path.join(root, 'dist');
const serverEntry = path.join(root, 'dist-server', 'entry-server.js');
const { getPublicRoutes, renderRoute } = await import(pathToFileURL(serverEntry).href);
const routes = getPublicRoutes();
const baseTemplate = await readFile(path.join(distDirectory, 'index.html'), 'utf8');

const escapeHtml = (value = '') => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

const replaceOrInsertHeadTag = (html, pattern, replacement) => {
  if (pattern.test(html)) return html.replace(pattern, replacement);
  return html.replace('</head>', `  ${replacement}\n  </head>`);
};

const routeHtml = (template, route, rendered) => {
  const { seo } = rendered;
  if (!seo) throw new Error(`No SEO metadata was collected for ${route.path}`);

  const englishPath = route.path === '/ar'
    ? '/'
    : route.path.replace(/^\/ar(?=\/|$)/, '') || '/';
  const englishUrl = `${SITE_URL}${englishPath}`;
  const arabicUrl = `${SITE_URL}/ar${englishPath === '/' ? '' : englishPath}`;
  const canonical = seo.canonical;
  const language = seo.language;
  const ogImage = seo.ogImage;

  let html = template;
  html = html.replace(/<html\b[^>]*>/i, `<html lang="${language}"${language === 'ar' ? ' dir="rtl"' : ''}>`);
  html = replaceOrInsertHeadTag(html, /<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(seo.title)}</title>`);
  html = replaceOrInsertHeadTag(html, /<meta\s+name="description"[^>]*>/i, `<meta name="description" content="${escapeHtml(seo.description)}">`);
  html = replaceOrInsertHeadTag(
    html,
    /<meta\s+name="robots"[^>]*>/i,
    `<meta name="robots" content="${seo.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}">`,
  );
  html = html.replace(/\s*<meta\s+name="keywords"[^>]*>\s*/gi, '\n');

  html = replaceOrInsertHeadTag(html, /<meta\s+property="og:title"[^>]*>/i, `<meta property="og:title" content="${escapeHtml(seo.ogTitle || seo.title)}">`);
  html = replaceOrInsertHeadTag(html, /<meta\s+property="og:description"[^>]*>/i, `<meta property="og:description" content="${escapeHtml(seo.ogDescription || seo.description)}">`);
  html = replaceOrInsertHeadTag(html, /<meta\s+property="og:type"[^>]*>/i, `<meta property="og:type" content="${escapeHtml(seo.ogType || 'website')}">`);
  html = replaceOrInsertHeadTag(html, /<meta\s+property="og:locale"[^>]*>/i, `<meta property="og:locale" content="${language === 'ar' ? 'ar_AE' : 'en_AE'}">`);
  html = replaceOrInsertHeadTag(html, /<meta\s+name="twitter:card"[^>]*>/i, `<meta name="twitter:card" content="${escapeHtml(seo.twitterCard || 'summary_large_image')}">`);
  html = replaceOrInsertHeadTag(html, /<meta\s+name="twitter:title"[^>]*>/i, `<meta name="twitter:title" content="${escapeHtml(seo.twitterTitle || seo.ogTitle || seo.title)}">`);
  html = replaceOrInsertHeadTag(html, /<meta\s+name="twitter:description"[^>]*>/i, `<meta name="twitter:description" content="${escapeHtml(seo.twitterDescription || seo.ogDescription || seo.description)}">`);
  if (ogImage) {
    html = replaceOrInsertHeadTag(html, /<meta\s+property="og:image"[^>]*>/i, `<meta property="og:image" content="${escapeHtml(ogImage)}">`);
    html = replaceOrInsertHeadTag(html, /<meta\s+name="twitter:image"[^>]*>/i, `<meta name="twitter:image" content="${escapeHtml(ogImage)}">`);
    if (seo.ogImageAlt) {
      html = replaceOrInsertHeadTag(html, /<meta\s+property="og:image:alt"[^>]*>/i, `<meta property="og:image:alt" content="${escapeHtml(seo.ogImageAlt)}">`);
      html = replaceOrInsertHeadTag(html, /<meta\s+name="twitter:image:alt"[^>]*>/i, `<meta name="twitter:image:alt" content="${escapeHtml(seo.ogImageAlt)}">`);
    }
    if (seo.ogImageWidth) {
      html = replaceOrInsertHeadTag(html, /<meta\s+property="og:image:width"[^>]*>/i, `<meta property="og:image:width" content="${escapeHtml(seo.ogImageWidth)}">`);
    }
    if (seo.ogImageHeight) {
      html = replaceOrInsertHeadTag(html, /<meta\s+property="og:image:height"[^>]*>/i, `<meta property="og:image:height" content="${escapeHtml(seo.ogImageHeight)}">`);
    }
  }

  html = html.replace(/\s*<link\s+rel="canonical"[^>]*>\s*/gi, '\n');
  html = html.replace(/\s*<meta\s+property="og:url"[^>]*>\s*/gi, '\n');
  if (canonical) {
    html = html.replace('</head>', `  <link rel="canonical" href="${escapeHtml(canonical)}">\n  <meta property="og:url" content="${escapeHtml(canonical)}">\n  </head>`);
  }

  html = html.replace(/\s*<link\s+rel="alternate"\s+hreflang="[^"]+"[^>]*>\s*/gi, '\n');
  if (!seo.noindex && canonical) {
    const alternates = [
      `<link rel="alternate" hreflang="en-AE" href="${englishUrl}">`,
      `<link rel="alternate" hreflang="ar-AE" href="${arabicUrl}">`,
      `<link rel="alternate" hreflang="x-default" href="${englishUrl}">`,
    ].join('\n  ');
    html = html.replace('</head>', `  ${alternates}\n  </head>`);
  }

  html = html.replace(/\s*<script\b[^>]*data-route-jsonld="true"[^>]*>[\s\S]*?<\/script>\s*/gi, '\n');
  if (seo.jsonLd) {
    const jsonLd = JSON.stringify(seo.jsonLd).replace(/</g, '\\u003c');
    html = html.replace('</head>', `  <script type="application/ld+json" data-route-jsonld="true">${jsonLd}</script>\n  </head>`);
  }

  if (!html.includes('<div id="root"></div>')) {
    throw new Error('Client build template is missing an empty #root element.');
  }
  return html.replace('<div id="root"></div>', `<div id="root">${rendered.html}</div>`);
};

let renderedCount = 0;
const batchSize = 8;
for (let offset = 0; offset < routes.length; offset += batchSize) {
  const batch = routes.slice(offset, offset + batchSize);
  await Promise.all(batch.map(async (route) => {
    const rendered = await renderRoute(route.path);
    const html = routeHtml(baseTemplate, route, rendered);
    const outputFile = route.path === '/'
      ? path.join(distDirectory, 'index.html')
      : path.join(distDirectory, route.path.replace(/^\//, ''), 'index.html');
    await mkdir(path.dirname(outputFile), { recursive: true });
    await writeFile(outputFile, html);
  }));
  renderedCount += batch.length;
  if (renderedCount % 100 < batch.length || renderedCount === routes.length) {
    process.stdout.write(`Prerendered ${renderedCount}/${routes.length}\n`);
  }
}

const notFound = await renderRoute('/__404__');
await writeFile(
  path.join(distDirectory, '404.html'),
  routeHtml(baseTemplate, { path: '/__404__', indexable: false }, notFound),
);

const sitemapEntries = routes
  .filter((route) => route.indexable)
  .map((route) => [
    '  <url>',
    `    <loc>${SITE_URL}${route.path}</loc>`,
    `    <lastmod>${route.lastmod}</lastmod>`,
    '  </url>',
  ].join('\n'))
  .join('\n');
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries}\n</urlset>\n`;
await writeFile(path.join(root, 'public', 'sitemap.xml'), sitemap);
await writeFile(path.join(distDirectory, 'sitemap.xml'), sitemap);

console.log(`Prerendered ${renderedCount} real React routes; sitemap contains ${routes.filter((route) => route.indexable).length} canonical URLs.`);
