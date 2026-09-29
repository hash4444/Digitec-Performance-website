import { createRequire } from 'node:module';
import { mkdir, stat } from 'node:fs/promises';
import path from 'node:path';

// Uses an existing Sharp installation; does not modify dependencies or sources.
// Pass the bundled node_modules directory as the first argument when required.
const require = createRequire(path.resolve(process.argv[2] || '.', 'package.json'));
const sharp = require('sharp');
await mkdir('public/images/ppf', { recursive: true });
for (const [source, name, widths] of [
  ['src/assets/ppf-application.jpg', 'film-application', [640, 1200]],
  ['src/assets/digitec-workshop-luxury-bays.jpg', 'workshop', [540, 960]],
]) {
  for (const width of widths) {
    const output = `public/images/ppf/${name}-${width}.webp`;
    await sharp(source).resize({ width, withoutEnlargement: true }).webp({ quality: 86, effort: 6 }).toFile(output);
    console.log(`${output}: ${(await stat(output)).size} bytes`);
  }
}
