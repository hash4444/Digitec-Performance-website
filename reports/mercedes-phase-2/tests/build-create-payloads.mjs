// Generates disabled review JSON files locally. No network or API client.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
const root = new URL('../', import.meta.url);
const proposal = JSON.parse(await readFile(new URL('routing/redirect-proposals.json', root), 'utf8'));
const inventory = JSON.parse(await readFile(new URL('evidence/cloudflare/current-inventory.json', root), 'utf8'));
const anchor = proposal.position.verified_www_rule_id;
if (!inventory.rules.some(r => r.id === anchor && r.expression === '(http.host eq "www.digitecme.com")')) throw new Error('Current saved www anchor does not match; review inventory drift.');
await mkdir(new URL('routing/rules/', root), { recursive: true });
for (const [i, r] of proposal.rules.entries()) {
  if (r.cloudflare_rule.enabled !== false) throw new Error('Review definitions must remain disabled.');
  const payload = { ...r.cloudflare_rule, position: { before: anchor } };
  await writeFile(new URL(`routing/rules/${i + 1}-${r.key}.json`, root), JSON.stringify(payload, null, 2) + '\n');
}
console.log('Wrote four disabled create payloads locally; no Cloudflare draft or rule was created.');
