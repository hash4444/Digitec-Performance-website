import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

const manifest = JSON.parse(readFileSync('outputs/sitewide-seo-2026-09-17/release-files.json', 'utf8'));
const [index, offset, length] = process.argv.slice(2).map(Number);
const file = manifest.files[index];
if (!file || !Number.isInteger(offset) || !Number.isInteger(length)) throw new Error('Invalid payload range');
const raw = readFileSync(file.path);
const bytes = file.binary ? raw : Buffer.from(raw.toString('utf8').replace(/\r\n/g, '\n'));
if (createHash('sha256').update(bytes).digest('hex') !== file.sha256) throw new Error('Release source changed: ' + file.path);
process.stdout.write(bytes.toString('base64').slice(offset, offset + length));
