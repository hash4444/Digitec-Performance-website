// Offline evidence packaging only. Does not fetch URLs, build or edit application files.
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const excluded = new Set(['evidence-manifest.json', 'package-validation.json']);
async function files(dir) {
  const out = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...await files(full));
    else if (entry.isFile() && !excluded.has(path.relative(root, full))) out.push(full);
  }
  return out.sort();
}
const entries = [];
const jsonErrors = [];
const linkErrors = [];
let jsonCount = 0;
let localLinks = 0;
for (const file of await files(root)) {
  const bytes = await fs.readFile(file);
  const relative = path.relative(root, file).split(path.sep).join('/');
  entries.push({ path: relative, bytes: bytes.length, sha256: crypto.createHash('sha256').update(bytes).digest('hex') });
  if (file.endsWith('.json')) {
    jsonCount++;
    try { JSON.parse(bytes.toString('utf8').replace(/^\uFEFF/, '')); }
    catch (error) { jsonErrors.push({ path: relative, error: error.message }); }
  }
  if (file.endsWith('.md')) {
    for (const match of bytes.toString('utf8').matchAll(/\[[^\]]*\]\(([^\n)]+)\)/g)) {
      let target = match[1].trim().replace(/^<|>$/g, '');
      if (/^(?:[a-z]+:|#)/i.test(target)) continue;
      target = decodeURIComponent(target.split('#')[0]);
      if (!target) continue;
      localLinks++;
      const resolved = path.resolve(path.dirname(file), target);
      // These two declared outputs are written successfully before the result is returned.
      if (excluded.has(path.relative(root, resolved))) continue;
      try { await fs.access(resolved); }
      catch { linkErrors.push({ path: relative, target }); }
    }
  }
}
const generatedAtUtc = new Date().toISOString();
const validation = { generatedAtUtc, offlineOnly: true, networkRequests: 0, filesHashed: entries.length, jsonFilesParsed: jsonCount, localMarkdownLinksChecked: localLinks, jsonErrors, linkErrors, allPassed: !jsonErrors.length && !linkErrors.length };
await fs.writeFile(path.join(root, 'evidence-manifest.json'), JSON.stringify({ generatedAtUtc, scope: 'Phase 3 local deliverables; excludes this manifest and package-validation.json', entries }, null, 2) + '\n');
await fs.writeFile(path.join(root, 'package-validation.json'), JSON.stringify(validation, null, 2) + '\n');
process.stdout.write(JSON.stringify(validation, null, 2) + '\n');
if (!validation.allPassed) process.exitCode = 1;
