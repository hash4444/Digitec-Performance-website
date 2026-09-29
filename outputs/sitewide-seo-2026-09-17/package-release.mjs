import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';

const directory = 'outputs/sitewide-seo-2026-09-17';
const manifest = JSON.parse(await readFile(`${directory}/release-files.json`, 'utf8'));
const staging = path.resolve(directory, 'release');
await mkdir(staging, { recursive: true });
for (const file of manifest.files) {
  const target = path.resolve(staging, file.path);
  if (!target.startsWith(staging + path.sep)) throw new Error('Invalid release path');
  const raw = await readFile(file.path);
  const bytes = file.binary ? raw : Buffer.from(raw.toString('utf8').replace(/\r\n/g, '\n'));
  if (createHash('sha256').update(bytes).digest('hex') !== file.sha256) throw new Error('Release drift: ' + file.path);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, bytes);
}
await writeFile(path.join(staging, 'SEO-RELEASE-MANIFEST.json'), JSON.stringify(manifest, null, 2));
await writeFile(path.join(staging, 'SEO-RELEASE-README.md'), `# Validated SEO release — 17 September 2026\n\nThis archive contains ${manifest.files.length} new or replacement files, with their repository-relative paths. Apply it to hash4444/Digitec-Performance-website based on commit ${manifest.base}; review and reconcile any later remote changes first. It is not a complete repository. Existing source and original artwork remain in the local workspace.\n\n1. Review the included public release notes and the SHA-256 manifest.\n2. Copy the listed files into the existing checkout, preserving paths and unrelated work.\n3. Run the production build, TypeScript and ESLint checks.\n4. Commit and push through an account with repository write access.\n5. Confirm the Lovable project has synchronized that commit, then publish it to the existing domain.\n6. Re-run the full live crawl and check representative content against the built release.\n\nAll 15 production-build stages, 1,247 route validations, 996 sitemap URLs and 28 responsive browser checks passed locally. Two no-JavaScript checks and two navigation journeys passed. The source fingerprint is 2cd4ef57011a6fd0ec6ab8784946c1872b9507181dcae909a145ad8531b8d9ec.\n\nPublishing is currently blocked by GitHub integration write access (HTTP 403). No release commit or live deployment has been made. Cloudflare domain routing separately requires access to the controlling zone; static publication does not activate its redirects or missing-page status responses. No ranking improvement has yet been measured.\n`);
console.log(JSON.stringify({ staging, files: manifest.files.length, base: manifest.base }));
