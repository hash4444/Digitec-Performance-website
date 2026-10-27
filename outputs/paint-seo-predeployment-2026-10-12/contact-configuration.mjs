import { spawnSync } from 'node:child_process';
import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
const output = path.resolve('outputs/paint-seo-predeployment-2026-10-12');
const workspace = path.join(output, 'build.local');
const files = ['index.html', 'src/components/PpfQuoteForm.tsx', 'src/components/PaintAssessmentForm.tsx', 'src/components/Analytics.tsx', 'src/lib/whatsapp-tracking.ts', 'src/lib/contact-attribution.ts'];
const unchanged = [];
for (const file of files) {
  const original = spawnSync('git', ['show', `HEAD:${file}`], { windowsHide: true });
  if (original.status !== 0) throw new Error(`Cannot read original ${file}`);
  const current = await readFile(file);
  const normalize = buffer => buffer.toString().replaceAll('\r\n', '\n');
  unchanged.push({ file, unchanged: normalize(original.stdout) === normalize(current) });
}
const ids = html => ({
  gtm: [...new Set(html.match(/GTM-[A-Z0-9]+/g) ?? [])],
  ga4: [...new Set([...html.matchAll(/[?&]id=(G-[A-Z0-9]+)|['"]config['"]\s*,\s*['"](G-[A-Z0-9]+)['"]/g)].map(match => match[1] ?? match[2]))],
});
const sourceConfig = ids(await readFile('index.html', 'utf8'));
let live;
try {
  const response = await fetch('https://digitecme.com/', { signal: AbortSignal.timeout(15000) });
  const html = await response.text();
  live = { url: response.url, status: response.status, ids: ids(html), htmlSha256: createHash('sha256').update(html).digest('hex'), sameGtm: JSON.stringify(ids(html).gtm) === JSON.stringify(sourceConfig.gtm), sameGa4: JSON.stringify(ids(html).ga4) === JSON.stringify(sourceConfig.ga4) };
  live.whatsappEndpoints = [...new Set([...html.matchAll(/href="(https:\/\/wa\.me\/[^"?]+)/g)].map(match => new URL(match[1]).pathname))];
  live.telephoneEndpoints = [...new Set([...html.matchAll(/href="(tel:[^"]+)"/g)].map(match => match[1]))];
  live.sameWhatsApp = live.whatsappEndpoints.length > 0 && live.whatsappEndpoints.every(endpoint => endpoint === '/97143402223');
  live.sameTelephone = live.telephoneEndpoints.length > 0 && live.telephoneEndpoints.every(endpoint => endpoint === 'tel:+97143402223');
} catch (error) { live = { unavailable: error.message }; }
const routes = ['/services/paint-protection-dubai', '/services/paint-protection-film', '/services/ceramic-coating', '/services/car-polishing-dubai', '/ar/services/paint-protection-dubai', '/ar/services/paint-protection-film', '/ar/services/ceramic-coating'];
const contactChecks = [];
for (const route of routes) {
  const html = await readFile(path.join(workspace, 'dist', route, 'index.html'), 'utf8');
  const anchors = [...html.matchAll(/<a\b([^>]*href="([^"]+)"[^>]*)>/g)].map(([, attributes, href]) => ({ attributes, href: href.replaceAll('&amp;', '&') }));
  const whatsapp = anchors.filter(link => link.href.startsWith('https://wa.me/'));
  const telephone = anchors.filter(link => link.href.startsWith('tel:'));
  if (!whatsapp.length || !telephone.length) throw new Error(`Missing contacts ${route}`);
  if (whatsapp.some(link => new URL(link.href).pathname !== '/97143402223')) throw new Error(`Wrong WhatsApp endpoint ${route}`);
  if (telephone.some(link => link.href !== 'tel:+97143402223')) throw new Error(`Wrong telephone endpoint ${route}`);
  if (JSON.stringify(ids(html)) !== JSON.stringify(sourceConfig)) throw new Error(`Wrong tracking config ${route}`);
  contactChecks.push({ route, whatsappLinks: whatsapp.length, telephoneLinks: telephone.length, endpointsMatch: true, trackingIdsMatch: true, forms: [...html.matchAll(/<form\b[^>]*id="([^"]+)"/g)].map(match => match[1]) });
}
const result = { checkedAt: new Date().toISOString(), unchanged, sourceConfig, live, contactChecks, existingFormInfrastructureUnchanged: unchanged.every(record => record.unchanged), externalMessagesSent: 0, analyticsTransport: 'External tracking blocked in browser tests; live IDs checked via public HTML only' };
await writeFile(path.join(output, 'contact-configuration.json'), JSON.stringify(result, null, 2));
console.log(result);
if (!result.existingFormInfrastructureUnchanged || (!live.unavailable && (!live.sameGtm || !live.sameGa4 || !live.sameWhatsApp || !live.sameTelephone))) process.exitCode = 1;
