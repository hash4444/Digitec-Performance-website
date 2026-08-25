/**
 * Exercises dist/_worker.js in isolation and asserts the required
 * production HTTP behaviour. Run after generate-hosting-rules.mjs.
 */
import fs from 'node:fs';
import path from 'node:path';

const distDir = path.join(process.cwd(), 'dist');
const workerPath = path.join(distDir, '_worker.js');
if (!fs.existsSync(workerPath)) {
  console.error('test-hosting-rules: dist/_worker.js missing. Run the build first.');
  process.exit(1);
}

const worker = (await import(`file://${workerPath}?t=${Date.now()}`)).default;

// Minimal ASSETS binding: serves whatever exists in dist/.
const env = {
  ASSETS: {
    async fetch(input) {
      const url = new URL(typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url);
      const p = url.pathname;
      const candidates = [
        path.join(distDir, p),
        path.join(distDir, p, 'index.html'),
      ];
      for (const file of candidates) {
        if (fs.existsSync(file) && fs.statSync(file).isFile()) {
          return new Response(fs.readFileSync(file), { status: 200 });
        }
      }
      return new Response('missing', { status: 404 });
    },
  },
};

const call = (url) => worker.fetch(new Request(url), env);

let failures = 0;
const check = async (label, url, expectStatus, expectLocation) => {
  const res = await call(url);
  const location = res.headers.get('location');
  const ok =
    res.status === expectStatus &&
    (expectLocation === undefined || location === expectLocation);
  if (!ok) failures += 1;
  console.log(
    `${ok ? 'PASS' : 'FAIL'}  ${label}\n      -> ${res.status}${
      location ? ` ${location}` : ''
    }${ok ? '' : `\n      expected ${expectStatus}${expectLocation ? ` ${expectLocation}` : ''}`}`,
  );
  return res;
};

const A = 'https://digitecme.com';

await check('home 200', `${A}/`, 200);
await check('brand page 200', `${A}/brands/porsche-service-dubai`, 200);
await check('robots.txt 200', `${A}/robots.txt`, 200);
await check('sitemap.xml 200', `${A}/sitemap.xml`, 200);
await check('llms.txt 200', `${A}/llms.txt`, 200);
await check('legacy /about-us', `${A}/about-us`, 308, `${A}/about`);
await check(
  'legacy /services/engine-diagnostics',
  `${A}/services/engine-diagnostics`,
  308,
  `${A}/services/car-diagnostics-dubai`,
);
await check(
  'legacy /mechanical-repair',
  `${A}/mechanical-repair`,
  308,
  `${A}/services/mechanical-repair-dubai`,
);
await check(
  'query preserved on redirect',
  `${A}/about-us?utm_source=test&gclid=abc`,
  308,
  `${A}/about?utm_source=test&gclid=abc`,
);
await check(
  'www -> apex with query',
  'https://www.digitecme.com/brands/porsche-service-dubai?utm_source=test',
  308,
  `${A}/brands/porsche-service-dubai?utm_source=test`,
);

const nf = await check(
  'unknown URL 404',
  `${A}/no-such-page-${Date.now()}`,
  404,
);
if (nf.headers.get('x-robots-tag') !== 'noindex, follow') {
  failures += 1;
  console.log('FAIL  404 missing X-Robots-Tag: noindex, follow');
} else {
  console.log('PASS  404 sends X-Robots-Tag: noindex, follow');
}

// No redirect may land on another redirect (no chains).
const csv = fs
  .readFileSync(path.join(process.cwd(), 'docs/seo/permanent-redirects.csv'), 'utf8')
  .trim()
  .split('\n')
  .slice(1)
  .map((line) => line.split(','));
const sources = new Set(csv.map(([from]) => from));
const chained = csv.filter(([, to]) => sources.has(to));
if (chained.length) {
  failures += 1;
  console.log(`FAIL  ${chained.length} redirect chains: ${chained.slice(0, 5).map(([f, t]) => `${f}->${t}`).join(', ')}`);
} else {
  console.log(`PASS  no redirect chains (${csv.length} rules)`);
}

// Nothing may redirect to the homepage as a catch-all for unknown URLs.
console.log(failures ? `\n${failures} failing check(s)` : '\nAll hosting-rule checks passed');
process.exit(failures ? 1 : 0);
