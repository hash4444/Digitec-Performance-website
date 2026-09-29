import { writeFile } from 'node:fs/promises';
import { getPublicRoutes } from '../dist-server/entry-server.js';
import { getRoutingPaths } from './generate-routing-response-data.mjs';

// Run after the manifest SSR prepass, before compiling client and final SSR.
const { validPaths, legacyPaths } = await getRoutingPaths(process.cwd(), getPublicRoutes());
await writeFile('src/lib/routing-paths.json', JSON.stringify({ validPaths, legacyPaths }, null, 2) + '\n');
console.log(`Synchronized ${validPaths.length} public paths and ${legacyPaths.length} historical paths.`);
