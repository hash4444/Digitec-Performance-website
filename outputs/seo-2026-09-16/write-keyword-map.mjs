import { readFile, writeFile } from 'node:fs/promises';
const root = 'outputs/seo-2026-09-16';
const evidence = JSON.parse(await readFile(`${root}/gsc-evidence.json`, 'utf8'));
const owners = {
  BMW: '/brands/bmw-service-dubai',
  'Rolls-Royce': '/brands/rolls-royce-service-dubai',
  'Aston Martin': '/brands/aston-martin-service-dubai',
  Bentley: '/brands/bentley-service-dubai',
  PPF: '/services/paint-protection-film',
  Ceramic: '/services/ceramic-coating',
  'Cadillac CUE': '/services/cadillac-cue-screen-repair-dubai',
  Electrical: '/services/auto-electrical-repair-dubai',
  'Head unit': '/services/head-unit-repair-dubai',
  'Mercedes audio': '/services/mercedes-audio-upgrade-dubai',
  'Bentley camera': '/brands/bentley-service-dubai/electrical-repair#reverse-camera',
  Tyres: '/services/tire-repair-dubai',
};
const cells = value => `"${String(value ?? '').replaceAll('"', '""')}"`;
const header = ['Query', 'Intent', 'Primary URL', 'Clicks', 'Impressions', 'CTR', 'Average position', 'Workbook range', 'Mapping basis'];
const rows = evidence.target_queries.map(row => {
  if (!owners[row.cluster]) throw new Error(`Missing owner: ${row.cluster}`);
  return [row.query, row.cluster, `https://digitecme.com${owners[row.cluster]}`, row.Clicks, row.Impressions, row.CTR, row.Position, row.source_range, 'Implemented intent ownership; not an observed query-page association'];
});
await writeFile(`${root}/keyword-url-map.csv`, [header, ...rows].map(row => row.map(cells).join(',')).join('\n') + '\n');
console.log(`Mapped ${rows.length} requested queries to ${new Set(rows.map(row => row[2])).size} intent owners.`);
