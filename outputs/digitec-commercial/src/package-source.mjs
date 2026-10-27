import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import crypto from 'node:crypto';
import {createRequire} from 'node:module';
import {PROJECT} from './runtime.mjs';
const require=createRequire(import.meta.url);
let JSZip;try{JSZip=require('jszip');}catch{JSZip=require(path.join(process.env.CODEX_DEPENDENCY_ROOT||path.join(os.homedir(),'.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules'),'jszip'));}
const uhd=process.argv.includes('--4k'),tag=uhd?'-4k':'';
const zip=new JSZip(),root=zip.folder(`digitec-editable-source${tag}`);
function addDir(relative){const dir=path.join(PROJECT,relative);for(const entry of fs.readdirSync(dir,{withFileTypes:true})){const file=path.join(relative,entry.name);if(entry.isDirectory())addDir(file);else root.file(file.replaceAll('\\','/'),fs.readFileSync(path.join(PROJECT,file)));}}
for(const dir of ['src','assets','docs'])addDir(dir);
for(const f of ['package.json','README.md','QA-REPORT.md','asset-manifest.json','review.html'])root.file(f,fs.readFileSync(path.join(PROJECT,f)));
if(uhd)root.file('QA-4K-REPORT.md',fs.readFileSync(path.join(PROJECT,'QA-4K-REPORT.md')));
const qaFiles=uhd?['technical-report-4k.json','browser-playback-4k.json','numbering-audit-4k.json','vertical-4k-render.json','decoded-contact-sheet-4k.jpg']:['technical-report.json','browser-playback.json','vertical-render.json','horizontal-render.json','decoded-contact-sheet.jpg'];
for(const f of qaFiles)if(fs.existsSync(path.join(PROJECT,'qa',f)))root.file('qa/'+f,fs.readFileSync(path.join(PROJECT,'qa',f)));
root.file(`renders/digitec-cover${tag}.png`,fs.readFileSync(path.join(PROJECT,'renders',`digitec-cover${tag}.png`)));
const bytes=await zip.generateAsync({type:'nodebuffer',compression:'DEFLATE',compressionOptions:{level:6}}),file=path.join(PROJECT,'renders',`digitec-editable-source${tag}.zip`);fs.writeFileSync(file,bytes);
const entries=Object.keys((await JSZip.loadAsync(bytes,{checkCRC32:true})).files);if(!entries.some(e=>e.endsWith('src/composition.mjs'))||!entries.some(e=>e.endsWith('assets/audio/master.wav')))throw new Error('Incomplete source archive');
const names=uhd?['digitec-vertical-4k.mp4','digitec-cover-4k.png','digitec-editable-source-4k.zip']:['digitec-vertical.mp4','digitec-horizontal.mp4','digitec-cover.png','digitec-editable-source.zip'];
const deliverables=names.map(name=>{const b=fs.readFileSync(path.join(PROJECT,'renders',name));return{file:'renders/'+name,bytes:b.length,sha256:crypto.createHash('sha256').update(b).digest('hex')};});
fs.writeFileSync(path.join(PROJECT,'qa',`delivery-manifest${tag}.json`),JSON.stringify({date:'2026-10-20',sourceArchiveEntries:entries.length,files:deliverables},null,2)+'\n');
console.log(`Source archive verified: ${entries.length} entries, ${bytes.length} bytes. Delivery SHA-256 manifest saved.`);
