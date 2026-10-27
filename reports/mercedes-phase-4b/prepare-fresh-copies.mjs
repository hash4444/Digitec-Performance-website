import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
const report=path.dirname(fileURLToPath(import.meta.url));
const root=path.resolve(report,'../..');
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const inputs=JSON.parse(await fs.readFile(path.join(root,'reports/mercedes-phase-4/original-input-manifest.json'),'utf8'));
for(const r of inputs.files)if(sha(await fs.readFile(path.join(root,r.file)))!==r.sha256)throw new Error('Original input changed: '+r.file);
const proposals=[
 ['src/pages/BrandPage.tsx','reports/mercedes-phase-3/proposals/hub/proposed/BrandPage.tsx','fed34d81d52c879960d90eb38db91e31d9290ceb7b9895a222a2d075feb13bc2'],
 ['src/data/mercedesServiceContent.ts','reports/mercedes-phase-3/proposals/services/proposed/src/data/mercedesServiceContent.ts','bd941c4c6e03c43501e32f304fea8df5de07941b93be3598b1d07431eb91b339'],
 ['src/pages/BrandServicePage.tsx','reports/mercedes-phase-3/proposals/services/proposed/src/pages/BrandServicePage.tsx','38bca41fbfd9d7fba3a5ce9701791facc77d1fc0a7a67806903f71e7a096512c']
];
for(const[,file,expected]of proposals)if(sha(await fs.readFile(path.join(root,file)))!==expected)throw new Error('Reviewed proposal changed');
for(const name of ['baseline','candidate','release-b']){
 const dest=path.join(report,name+'.local');
 try{await fs.access(dest);throw new Error('Refusing overwrite '+dest);}catch(error){if(error.code!=='ENOENT')throw error;}
 await fs.mkdir(dest);
 for(const r of inputs.files){await fs.mkdir(path.dirname(path.join(dest,r.file)),{recursive:true});await fs.copyFile(path.join(root,r.file),path.join(dest,r.file));}
 for(const r of inputs.files)if(sha(await fs.readFile(path.join(dest,r.file)))!==r.sha256)throw new Error('Copy failed');
 if(name!=='baseline')for(const[file,proposal]of proposals)await fs.copyFile(path.join(root,proposal),path.join(dest,file));
}
await fs.writeFile(path.join(report,'fresh-input-manifest.json'),JSON.stringify({createdAt:new Date().toISOString(),root,source:'Phase4 original-input-manifest, reverified against shared checkout',inputs:inputs.files,approvedProposals:proposals,copies:['baseline.local','candidate.local','release-b.local'],environmentFilesCopied:false,dependencyInstall:false},null,2));
let build=await fs.readFile(path.join(root,'reports/mercedes-phase-4/run-build.mjs'),'utf8');
build=build.replace("['baseline','candidate'].includes(name)","['baseline','candidate','release-b'].includes(name)")
 .replace("const out=path.join(report,'build',name);", "const out=path.join(report,'build',name,process.argv[3]||'run-1');");
await fs.writeFile(path.join(report,'run-build.mjs'),build);
await fs.mkdir(path.join(report,'tests'),{recursive:true});
await fs.copyFile(path.join(root,'reports/mercedes-phase-4/tests/verify-ssr-scope.mjs'),path.join(report,'tests/verify-ssr-scope.mjs'));
console.log('665 original inputs verified; three fresh isolated copies prepared; candidate/release-b contain only three reviewed source edits.');
