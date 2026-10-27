import fs from 'node:fs/promises';
const out='outputs/ecu-electronics-2026-10-19/audit';
let source=await fs.readFile('outputs/diagnostics-ac-2026-10-19/audit/capture-public-owners.mjs','utf8');
source=source.replaceAll('outputs/diagnostics-ac-2026-10-19/audit',out);
const start=source.indexOf('const extra=');
const end=source.indexOf('\nconst routes=',start);
source=source.slice(0,start)+"const extra=[];"+source.slice(end);
await fs.writeFile(`${out}/capture-public-owners-run.mjs`,source);
await import('./capture-public-owners-run.mjs');
