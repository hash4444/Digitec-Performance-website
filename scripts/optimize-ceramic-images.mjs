import { createRequire } from 'node:module';
import { mkdir, stat } from 'node:fs/promises';
import path from 'node:path';

// Pass an existing dependency root containing node_modules/sharp if needed.
// Creates delivery variants without altering original photographs or PPF assets.
const require = createRequire(path.resolve(process.argv[2] || '.', 'package.json'));
const sharp = require('sharp');
await mkdir('public/images/ceramic-coating', { recursive: true });
for (const [source, name, widths] of [
  ['src/assets/ceramic-coating.jpg', 'black-mercedes-finish', [640, 1024]],
  ['src/assets/digitec-workshop-luxury-bays.jpg', 'workshop-vehicles', [540, 960]],
]) {
  for (const width of widths) {
    const output = `public/images/ceramic-coating/${name}-${width}.webp`;
    await sharp(source).resize({ width, withoutEnlargement: true }).webp({ quality: 86, effort: 6 }).toFile(output);
    console.log(`${output}: ${(await stat(output)).size} bytes`);
  }
}
