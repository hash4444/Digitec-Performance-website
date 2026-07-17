import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const brandsSource = fs.readFileSync(path.join(root, 'src/data/brands.ts'), 'utf8');
const servicesSource = fs.readFileSync(path.join(root, 'src/data/brandServices.ts'), 'utf8');
const sitemapPath = path.join(root, 'public/sitemap.xml');

const unique = (values) => [...new Set(values)];
const collectMatches = (source, expression) => [...source.matchAll(expression)].map((match) => match[1]);

const brandSlugs = unique([
  ...collectMatches(brandsSource, /^    slug: '([^']+-service-dubai)'/gm),
  ...collectMatches(brandsSource, /\['[^']+',\s*'([^']+-service-dubai)'\]/g),
]);
const profileSlugs = unique([
  ...collectMatches(servicesSource, /^  '([^']+-service-dubai)': \{/gm),
  ...collectMatches(servicesSource, /createAdditionalServiceProfile\('([^']+-service-dubai)'/g),
]);

const allServices = [
  'oil-change', 'brake-repair', 'transmission-repair', 'ac-repair', 'suspension-repair',
  'engine-diagnostics', 'mechanical-repair', 'steering-repair', 'battery-replacement',
  'electrical-repair', 'exhaust-repair', 'fuel-system-repair', 'body-repair', 'tire-repair',
];
const teslaServices = [
  'brake-repair', 'ac-repair', 'suspension-repair', 'mechanical-repair', 'steering-repair',
  'battery-replacement', 'electrical-repair', 'body-repair', 'tire-repair',
];
const mercedesServicePaths = {
  'oil-change': 'mercedes-oil-change-dubai', 'brake-repair': 'mercedes-brake-repair-dubai',
  'transmission-repair': 'mercedes-transmission-repair-dubai', 'ac-repair': 'mercedes-ac-repair-dubai',
  'suspension-repair': 'mercedes-suspension-repair-dubai', 'engine-diagnostics': 'mercedes-diagnostics-dubai',
  'mechanical-repair': 'mercedes-mechanical-repair-dubai', 'steering-repair': 'mercedes-steering-repair-dubai',
  'battery-replacement': 'mercedes-battery-replacement-dubai', 'electrical-repair': 'mercedes-electrical-repair-dubai',
  'exhaust-repair': 'mercedes-exhaust-repair-dubai', 'fuel-system-repair': 'mercedes-fuel-system-repair-dubai',
  'body-repair': 'mercedes-body-repair-dubai', 'tire-repair': 'mercedes-tire-repair-dubai',
};
const extendedServiceBrands = new Set([
  'mercedes-benz-service-dubai', 'maybach-service-dubai', 'porsche-service-dubai',
  'bmw-service-dubai', 'lamborghini-service-dubai', 'mclaren-service-dubai',
  'aston-martin-service-dubai', 'ferrari-service-dubai', 'land-rover-service-dubai',
  'audi-service-dubai', 'bentley-service-dubai', 'rolls-royce-service-dubai',
  'bugatti-service-dubai', 'jeep-service-dubai', 'nissan-service-dubai',
  'maserati-service-dubai', 'toyota-service-dubai', 'pagani-service-dubai',
  'volkswagen-service-dubai', 'volvo-service-dubai', 'jetour-service-dubai',
  'cadillac-service-dubai',
]);

const canonicalPaths = new Set();
for (const brandSlug of brandSlugs) canonicalPaths.add(`/brands/${brandSlug}`);
for (const brandSlug of profileSlugs) {
  const services = brandSlug === 'tesla-service-dubai'
    ? teslaServices
    : extendedServiceBrands.has(brandSlug) ? allServices : allServices.slice(0, 6);
  for (const serviceSlug of services) {
    canonicalPaths.add(brandSlug === 'mercedes-benz-service-dubai'
      ? `/services/${mercedesServicePaths[serviceSlug]}`
      : `/brands/${brandSlug}/${serviceSlug}`);
  }
}

const generatedStart = '<!-- BEGIN GENERATED BRAND URLS -->';
const generatedEnd = '<!-- END GENERATED BRAND URLS -->';
const rawSitemap = fs.readFileSync(sitemapPath, 'utf8');
const sitemap = rawSitemap
  .replace(new RegExp(`${generatedStart}[\\s\\S]*?${generatedEnd}\\s*`, 'g'), '')
  .replace(/\s*<url>\s*<loc>https:\/\/digitecme\.com[^<]+<\/loc>\s*<lastmod>2026-07-17<\/lastmod>\s*<changefreq>monthly<\/changefreq>\s*<priority>0\.7<\/priority>\s*<\/url>/g, '');
const existingUrls = new Set(collectMatches(sitemap, /<loc>(https:\/\/digitecme\.com[^<]*)<\/loc>/g));
const urlsToAdd = [];
for (const canonicalPath of [...canonicalPaths].sort()) {
  for (const localePrefix of ['', '/ar']) {
    const url = `https://digitecme.com${localePrefix}${canonicalPath}`;
    if (!existingUrls.has(url)) urlsToAdd.push(url);
  }
}

const entries = urlsToAdd.map((url) => `  <url>\n    <loc>${url}</loc>\n    <lastmod>2026-07-17</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`).join('\n');
const generatedBlock = entries ? `${generatedStart}\n${entries}\n${generatedEnd}` : '';
const nextSitemap = sitemap.replace(/\s*<\/urlset>\s*$/, `\n${generatedBlock}\n</urlset>\n`);
fs.writeFileSync(sitemapPath, nextSitemap);
console.log(`Brand sitemap is current. Synced ${urlsToAdd.length} generated canonical URLs.`);
