import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const auditPath = path.join(root, 'outputs/repair-service-2026-10-19/audit');
const { records: before } = JSON.parse(await fs.readFile(path.join(auditPath, 'baseline-repair-owner-audit.json'), 'utf8'));
const decode = value => String(value ?? '').replace(/&#x([\da-f]+);/gi, (_, c) => String.fromCodePoint(parseInt(c, 16))).replace(/&#(\d+);/g, (_, c) => String.fromCodePoint(Number(c))).replaceAll('&quot;', '"').replaceAll('&apos;', "'").replaceAll('&nbsp;', ' ').replaceAll('&lt;', '<').replaceAll('&gt;', '>').replaceAll('&amp;', '&');
const clean = value => decode(String(value ?? '').replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();
const attr = (tag, name) => { const m = tag.match(new RegExp(`(?:^|\\s)${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`, 'i')); return m ? decode(m[1] ?? m[2]) : undefined; };
const tags = (html, tag) => [...html.matchAll(new RegExp(`<${tag}\\b[^>]*>`, 'gi'))].map(m => m[0]);
const meta = (html, name) => tags(html, 'meta').filter(t => attr(t, 'name') === name || attr(t, 'property') === name).map(t => attr(t, 'content'));
const source = await fs.readFile(path.join(root, 'src/data/repairServiceContent.ts'), 'utf8');
const arabic = await fs.readFile(path.join(root, 'src/data/repairServiceArabic.ts'), 'utf8');
const selectedKeys = [...source.matchAll(/^  '([^']+-service-dubai\/[^']+)': \{/gm)].map(m => m[1]);
const arabicKeys = [...arabic.matchAll(/^  '([^']+-service-dubai\/[^']+)': \{/gm)].map(m => m[1]);
const records = [];
for (const old of before) {
  const html = await fs.readFile(path.join(root, 'dist', old.route.slice(1), 'index.html'), 'utf8');
  const title = [...html.matchAll(/<title[^>]*>([\s\S]*?)<\/title>/gi)].map(m => clean(m[1]));
  const description = meta(html, 'description');
  const nodes = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)].filter(m => attr(m[1], 'type') === 'application/ld+json').flatMap(m => { const parsed = JSON.parse(m[2]); return Array.isArray(parsed) ? parsed : parsed['@graph'] ?? [parsed]; });
  const service = nodes.filter(n => n['@type'] === 'Service' && n.url === 'https://digitecme.com' + old.route);
  const canonical = tags(html, 'link').filter(t => attr(t, 'rel') === 'canonical').map(t => attr(t, 'href'));
  const body = clean(html.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, ''));
  records.push({
    route: old.route, locale: old.locale,
    metadataChanged: JSON.stringify(title) !== JSON.stringify(old.title) || JSON.stringify(description) !== JSON.stringify(old.description),
    title, description,
    businessProviderRetained: service.length === 1 && service[0].provider?.['@id'] === 'https://digitecme.com/#business',
    brandEntityRetained: service.length === 1 && JSON.stringify(service[0].brand) === JSON.stringify(old.serviceSchema[0].brand),
    canonicalRetained: JSON.stringify(canonical) === JSON.stringify(old.canonicals),
    panelCount: (html.match(/data-repair-enquiry="true"/g) ?? []).length,
    unselectedTextUnchanged: old.route.includes('/lamborghini-service-dubai/engine-diagnostics') ? body === old.visibleText : undefined,
  });
}
const report = {
  reviewedAt: new Date().toISOString(),
  sourceFiles: ['src/pages/BrandServicePage.tsx', 'src/data/repairServiceContent.ts', 'src/data/repairServiceArabic.ts', 'src/components/RepairEnquiryPanel.tsx'],
  selectedKeys, selectedCount: selectedKeys.length, arabicKeys, arabicOverrideCount: arabicKeys.length,
  metadataChanges: records.filter(r => r.metadataChanged).map(r => ({ route: r.route, locale: r.locale, title: r.title, description: r.description })),
  renderedRecords: records,
};
await fs.writeFile(path.join(auditPath, 'final-scope-review.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify({ selectedCount: report.selectedCount, arabicOverrideCount: report.arabicOverrideCount, metadataChanges: report.metadataChanges, allProviderIdsRetained: records.every(r => r.businessProviderRetained), allBrandIdsRetained: records.every(r => r.brandEntityRetained), allCanonicalsRetained: records.every(r => r.canonicalRetained), unselectedDiagnostics: records.filter(r => r.route.includes('/lamborghini-service-dubai/engine-diagnostics')).map(r => ({ route: r.route, textUnchanged: r.unselectedTextUnchanged, panelCount: r.panelCount })) }, null, 2));
