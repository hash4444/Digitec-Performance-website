// Read-only supplemental GET/HEAD capture for the proposed existing hub links.
import { mkdir, writeFile } from 'node:fs/promises';
const out = new URL('../evidence/http/hub-link-targets/', import.meta.url);
await mkdir(out, { recursive: true });
const report = { startedAt: new Date().toISOString(), readOnly: true, pages: [] };
for (const path of ['/services/mercedes-diagnostics-dubai', '/services/mercedes-mechanical-repair-dubai']) {
  const url = 'https://digitecme.com' + path;
  for (const method of ['GET', 'HEAD']) {
    const r = await fetch(url, { method, redirect: 'manual', signal: AbortSignal.timeout(25000) });
    const body = method === 'GET' ? await r.text() : '';
    const headers = Object.fromEntries([...r.headers].filter(([k]) => k !== 'set-cookie'));
    const row = { at: new Date().toISOString(), url, method, status: r.status, headers };
    if (method === 'GET') {
      const tags = [...body.matchAll(/<(?:link|meta)\b[^>]*>/gi)].map(m => m[0]);
      const attr = (s, n) => s.match(new RegExp(`(?:^|\\s)${n}=["']([^"']*)["']`, 'i'))?.[1] || '';
      row.canonical = tags.filter(t => attr(t, 'rel') === 'canonical').map(t => attr(t, 'href'));
      row.robots = tags.filter(t => /^(robots|googlebot)$/i.test(attr(t, 'name'))).map(t => attr(t, 'content'));
      row.htmlFile = path.split('/').at(-1) + '.html';
      await writeFile(new URL(row.htmlFile, out), body);
      row.passed = r.status === 200 && row.canonical.length === 1 && row.canonical[0] === url && row.robots.length > 0 && !row.robots.some(v => /noindex|none/i.test(v)) && !/noindex|none/i.test(headers['x-robots-tag'] || '');
    } else row.passed = r.status === 200 && !/noindex|none/i.test(headers['x-robots-tag'] || '');
    report.pages.push(row);
  }
}
report.finishedAt = new Date().toISOString();
report.summary = { cases: report.pages.length, passed: report.pages.filter(p => p.passed).length, failed: report.pages.filter(p => !p.passed).length };
await writeFile(new URL('capture.json', out), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report.summary));
process.exitCode = report.summary.failed ? 1 : 0;
