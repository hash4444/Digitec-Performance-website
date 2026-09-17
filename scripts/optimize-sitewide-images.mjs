import { createRequire } from 'node:module';
import { mkdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';

// Re-encode existing approved artwork only; no imagery or business evidence is invented.
const require = createRequire(path.resolve(process.argv[2] || '.', 'package.json'));
const sharp = require('sharp');
const output = 'public/images/seo';
await mkdir(output, { recursive: true });
const records = [];
for (const [source, name, widths] of [
  ['public/images/hero-bg.png', 'hero', [768, 1536]],
  ['public/images/mascot.png', 'mascot', [256]],
  ['public/images/mascot-wave.png', 'mascot-wave', [256]],
  ['public/images/mercedes-engine-repair.png', 'mercedes-engine-repair', [1086]],
]) {
  for (const width of widths) {
    const file = `${output}/${name}-${width}.webp`;
    await sharp(source).resize({ width, withoutEnlargement: true }).webp({ quality: 88, alphaQuality: 100, effort: 6 }).toFile(file);
    const before = (await stat(source)).size;
    const after = (await stat(file)).size;
    records.push({ source, file, before, after, reductionPercent: +(100 * (1 - after / before)).toFixed(1) });
  }
}
await mkdir('outputs/sitewide-seo-2026-09-17', { recursive: true });
await writeFile('outputs/sitewide-seo-2026-09-17/image-savings.json', JSON.stringify(records, null, 2));
console.log(JSON.stringify(records, null, 2));
