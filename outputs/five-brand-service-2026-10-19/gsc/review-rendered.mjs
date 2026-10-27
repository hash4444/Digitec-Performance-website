import fs from 'node:fs/promises';
import { renderRoute, getPublicRoutes } from '../../../dist-server/entry-server.js';

const root = 'outputs/five-brand-service-2026-10-19/gsc';
const slugs = ['rolls-royce', 'lamborghini', 'volkswagen', 'mercedes-benz', 'bmw'];
const manifest = new Map(getPublicRoutes().map(route => [route.path, route]));
const results = [];
for (const lang of ['', '/ar']) {
  for (const slug of slugs) {
    const route = `${lang}/brands/${slug}-service-dubai`;
    const rendered = await renderRoute(route);
    const { seo, html } = rendered;
    const nodes = seo.jsonLd['@graph'];
    const service = nodes.find(node => node['@type'] === 'Service');
    const catalog = service.hasOfferCatalog;
    const links = [...html.matchAll(/href="(\/[^"]*)"/g)].map(match => match[1]).filter(link => !link.startsWith('/#'));
    const contentLinks = links.filter(link => !link.startsWith('/assets/'));
    const missingLinks = contentLinks.filter(link => !manifest.has(link.split(/[?#]/)[0]));
    const noindexLinks = contentLinks.filter(link => manifest.has(link.split(/[?#]/)[0]) && !manifest.get(link.split(/[?#]/)[0]).indexable);
    const offerNames = catalog?.itemListElement?.map(offer => offer.itemOffered?.name) ?? [];
    const offerNamesMissingInBody = offerNames.filter(name => !html.includes(name));
    const faq = nodes.find(node => node['@type'] === 'FAQPage');
    const faqMissingInBody = faq?.mainEntity.filter(question => !html.includes(question.name) || !html.includes(question.acceptedAnswer.text)).map(question => question.name) ?? [];
    results.push({route, canonical: seo.canonical, noindex: seo.noindex, h1Count: [...html.matchAll(/<h1\b/g)].length, brandNode: nodes.find(node => node['@type'] === 'Brand')?.['@id'], serviceBrandRef: service.brand, businessRef: service.provider, missingLinks: [...new Set(missingLinks)], noindexLinks: [...new Set(noindexLinks)], offerCount: offerNames.length, offerNamesMissingInBody, faqCount: faq?.mainEntity?.length ?? 0, faqMissingInBody, whatsappDraftCopy: html.includes('Opening the draft does not confirm an appointment.') || html.includes('فتح المسودة لا يؤكد الحجز.'), htmlLength: html.length});
  }
}
await fs.writeFile(`${root}/independent-render-review.json`, JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));
