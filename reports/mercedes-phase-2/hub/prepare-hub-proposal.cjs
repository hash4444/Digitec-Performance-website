const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const cp = require('node:child_process');
const root = process.cwd();
const hub = path.join(root, 'reports/mercedes-phase-2/hub');
const sha256 = b => crypto.createHash('sha256').update(b).digest('hex');
const paths = [
  'src/pages/BrandPage.tsx',
  'src/components/MercedesMaintenanceScope.tsx',
  'src/data/mercedesServiceCampaign.ts',
  'src/data/mercedesCaseStudies.ts',
  'src/components/Footer.tsx',
  'index.html',
  'src/data/mercedesServices.ts',
  'src/components/LocalizedLink.tsx',
];
const manifest = [];
for (const rel of paths) {
  const bytes = fs.readFileSync(path.join(root, rel));
  const dest = path.join(hub, 'before', rel);
  fs.mkdirSync(path.dirname(dest), {recursive: true});
  fs.writeFileSync(dest, bytes);
  manifest.push({path: rel, bytes: bytes.length, sha256: sha256(bytes)});
}
const rel = 'src/pages/BrandPage.tsx';
const original = fs.readFileSync(path.join(root, rel));
let proposed = original.toString('utf8');
const oldCaption = '<p className="text-gray-400 text-sm leading-relaxed mt-2">A real Mercedes-AMG engine in the Digi-Tec workshop. Diagnostics, fluid specifications and repair planning are matched to the fitted powertrain—not just the badge.</p>';
const newCaption = '<p className="text-gray-400 text-sm leading-relaxed mt-2">A Mercedes-AMG engine in the Digi-Tec workshop. Review our <Link to="/services/mercedes-diagnostics-dubai" className="text-burnt-orange hover:underline">Mercedes XENTRY diagnostics</Link> and <Link to="/services/mercedes-mechanical-repair-dubai" className="text-burnt-orange hover:underline">mechanical repair inspection scope</Link> for the steps relevant to your vehicle.</p>';
const oldLocation = '<p className="text-gray-400 text-sm mt-2">Dubai, with a direct Google Maps route from this page.</p>';
const newLocation = '<p className="text-gray-400 text-sm mt-2">Warehouses 11–15, Al Quoz Industrial Area 3, Dubai, UAE. Call +971 4 340 2223 to confirm your appointment and arrival details.</p>';
for (const [before, after] of [[oldCaption,newCaption],[oldLocation,newLocation]]) {
  if (proposed.split(before).length !== 2) throw Error('Expected one exact match: '+before);
  proposed = proposed.replace(before,after);
}
const proposedPath = path.join(hub, 'proposed', rel);
fs.mkdirSync(path.dirname(proposedPath), {recursive: true});
fs.writeFileSync(proposedPath, proposed, 'utf8');
const a = 'reports/mercedes-phase-2/hub/before/'+rel;
const b = 'reports/mercedes-phase-2/hub/proposed/'+rel;
let diff;
try { diff=cp.execFileSync('git', ['diff','--no-index','--no-ext-diff','--',a,b], {cwd:root, encoding:'utf8'}); }
catch(e) {if(e.status!==1) throw e; diff=e.stdout;}
diff=diff.replaceAll('a/'+a, 'a/'+rel).replaceAll('b/'+b,'b/'+rel);
fs.writeFileSync(path.join(hub,'mercedes-hub-minimal.patch'),diff,'utf8');
fs.writeFileSync(path.join(hub,'original-sha256.json'),JSON.stringify({capturedAt:new Date().toISOString(),hashAlgorithm:'SHA-256',sources:manifest},null,2)+'\n');
let patchCheck;
try { const output = cp.execFileSync('git',['apply','--check','--','reports/mercedes-phase-2/hub/mercedes-hub-minimal.patch'],{cwd:root,encoding:'utf8',stdio:['ignore','pipe','pipe']}); patchCheck = {command:'git apply --check -- reports/mercedes-phase-2/hub/mercedes-hub-minimal.patch',exitCode:0,output}; }
catch(e) {patchCheck={command:'git apply --check -- reports/mercedes-phase-2/hub/mercedes-hub-minimal.patch',exitCode:e.status,stdout:e.stdout?.toString(),stderr:e.stderr?.toString()};}
const ts = require('typescript');
const parsed = ts.createSourceFile('BrandPage.tsx',proposed,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
const diagnostics = parsed.parseDiagnostics.map(d=>({start:d.start,message:ts.flattenDiagnosticMessageText(d.messageText,' ')}));
const unchanged = manifest.every(item=>sha256(fs.readFileSync(path.join(root,item.path)))===item.sha256);
const changedLines=[];
const origLines=original.toString('utf8').split(/\r?\n/), nextLines=proposed.split(/\r?\n/);
for(let i=0;i<origLines.length;i++) if(origLines[i]!==nextLines[i]) changedLines.push(i+1);
const validation={validatedAt:new Date().toISOString(),patchCheck,typescriptTsxParse:{parseDiagnostics:diagnostics,passed:diagnostics.length===0,limitation:'Syntax parse only; no full project typecheck, build, route render or mobile QA run.'},proposal:{file:rel,changedLines,originalSha256:sha256(original),proposedSha256:sha256(Buffer.from(proposed)),newContextualLinks:['/services/mercedes-diagnostics-dubai','/services/mercedes-mechanical-repair-dubai']},sourceByteHashesUnchanged:unchanged,productionChanges:false};
fs.writeFileSync(path.join(hub,'validation.json'),JSON.stringify(validation,null,2)+'\n');
console.log(JSON.stringify(validation,null,2));
if(patchCheck.exitCode!==0||diagnostics.length||!unchanged) process.exitCode=1;
