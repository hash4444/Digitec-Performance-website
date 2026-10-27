import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import path from 'node:path';

const sourceRoot = process.cwd();
const qaRoot = path.join(sourceRoot, 'outputs/mercedes-oil-investigation-2026-10-21/qa');
const buildRoot = path.join(qaRoot, 'build');
await mkdir(path.join(qaRoot, 'logs'), { recursive: true });
const hash = data => createHash('sha256').update(data).digest('hex');
async function manifest() {
  const paths = [];
  async function walk(relative) {
    for (const item of await readdir(path.join(sourceRoot, relative), { withFileTypes: true })) {
      const p = path.join(relative, item.name);
      if (item.isDirectory()) await walk(p);
      else if (item.isFile()) paths.push(p);
    }
  }
  for (const dir of ['src', 'public', 'scripts', 'cloudflare', 'docs']) await walk(dir);
  for (const f of ['package.json','package-lock.json','index.html','vite.config.ts','tailwind.config.ts','postcss.config.js','tsconfig.json','tsconfig.app.json','tsconfig.node.json']) paths.push(f);
  const result = [];
  for (const p of paths.sort()) result.push({ path: p.replaceAll('\\','/'), sha256: hash(await readFile(path.join(sourceRoot,p))) });
  return result;
}
const before = await manifest();
await writeFile(path.join(qaRoot, 'shared-source-before.json'), JSON.stringify(before, null, 2));
const pkg = JSON.parse(await readFile(path.join(buildRoot, 'package.json'), 'utf8'));
const commands = pkg.scripts.build.split(' && ');
const report = { checkedAt: new Date().toISOString(), sourceRoot, buildRoot, mode: 'isolated copied source baseline; no requested source correction', dependencyResolution: 'Node resolves installed packages from ancestor repository node_modules; no dependency installation, mutation or successful junction creation', steps: [], sourcePreserved: null, allPassed: false };
function run(command, args, label) {
  const start = Date.now();
  const result = spawnSync(process.execPath, args, { cwd: buildRoot, encoding:'utf8', maxBuffer:64*1024*1024, windowsHide:true });
  const log = `logs/${String(report.steps.length + 1).padStart(2,'0')}-${label}.log`;
  const body = `${result.stdout || ''}\n${result.stderr || ''}${result.error ? '\n' + result.error.stack : ''}`;
  return writeFile(path.join(qaRoot, log), body).then(() => {
    const step = { command, exitCode: result.status, seconds: Math.round((Date.now()-start)/100)/10, log };
    report.steps.push(step);
    console.log(`${result.status === 0 ? 'PASS' : 'FAIL'} ${command} (${step.seconds}s)`);
    console.log(body.split(/\r?\n/).filter(line => /built in|Prerendered|passed|[0-9]+ errors|[0-9]+ warnings|Error:|AssertionError|error TS|ENOENT|failed/i.test(line)).slice(-6).join('\n').slice(-3000));
    return result.status;
  });
}
await run('tsc --noEmit -p tsconfig.app.json', [path.join(sourceRoot,'node_modules/typescript/bin/tsc'),'--noEmit','-p','tsconfig.app.json'], 'typecheck-app');
await run('tsc --noEmit -p tsconfig.node.json', [path.join(sourceRoot,'node_modules/typescript/bin/tsc'),'--noEmit','-p','tsconfig.node.json'], 'typecheck-node');
let built = true;
for (let i=0;i<commands.length;i++) {
  const command=commands[i];
  const parts=command.split(/\s+/);
  const args=parts[0]==='vite' ? [path.join(sourceRoot,'node_modules/vite/bin/vite.js'),...parts.slice(1)] : parts.slice(1);
  const status = await run(command,args,`production-${i+1}`);
  await writeFile(path.join(qaRoot,'qa-results.json'),JSON.stringify(report,null,2));
  if (status !== 0 && i < 6) { built=false; break; }
}
if (built) {
  for (const script of ['validate-master-seo.mjs','test-routing-response.mjs','validate-tuning.mjs','validate-paint-care-cluster.mjs']) await run(`node scripts/${script}`,[`scripts/${script}`],script.replace('.mjs',''));
}
const after = await manifest();
await writeFile(path.join(qaRoot,'shared-source-after.json'), JSON.stringify(after,null,2));
report.sourcePreserved = JSON.stringify(before) === JSON.stringify(after);
report.allPassed = report.steps.every(step => step.exitCode === 0);
report.finishedAt = new Date().toISOString();
await writeFile(path.join(qaRoot,'qa-results.json'),JSON.stringify(report,null,2));
console.log(JSON.stringify({sourcePreserved:report.sourcePreserved,allPassed:report.allPassed,steps:report.steps.length,failures:report.steps.filter(s=>s.exitCode!==0)},null,2));
