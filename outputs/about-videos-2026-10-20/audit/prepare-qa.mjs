import fs from 'node:fs/promises';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
const root=process.cwd(), task=path.join(root,'outputs/about-videos-2026-10-20'), candidate=path.join(task,'candidate.local'), qa=path.join(task,'qa');
await fs.mkdir(candidate,{recursive:true});await fs.mkdir(qa,{recursive:true});
const head=execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim();
const archive=path.join(task,'head-source.local.tar');
execFileSync('git',['archive','--format=tar','--output',archive,head]);
execFileSync('tar',['-xf',archive,'-C',candidate]);
const prior=path.join(root,'outputs/mercedes-service-top3-2026-10-20/candidate.local');
await fs.cp(path.join(prior,'outputs'),path.join(candidate,'outputs'),{recursive:true});
await fs.copyFile(path.join(prior,'.env'),path.join(candidate,'.env'));
const merc=JSON.parse(await fs.readFile('outputs/mercedes-service-top3-2026-10-20/modified-files.json','utf8')).files.map(r=>r.file);
const ours=['src/pages/AboutUs.tsx','src/components/AboutVideoStrip.tsx','src/components/AboutVideoStrip.css',...Array.from({length:8},(_,i)=>String(i+1).padStart(2,'0')).flatMap(n=>[`public/videos/about/video-${n}.mp4`,`public/videos/about/video-${n}-poster.jpg`])];
const records=[];for(const file of[...merc,...ours]){const b=await fs.readFile(path.join(root,file));await fs.mkdir(path.dirname(path.join(candidate,file)),{recursive:true});await fs.writeFile(path.join(candidate,file),b);records.push({file,sha256:createHash('sha256').update(b).digest('hex'),bytes:b.length,role:merc.includes(file)?'preserved pending Mercedes source':'About video sprint'});}
try{await fs.lstat(path.join(candidate,'node_modules'));}catch{await fs.symlink(path.join(root,'node_modules'),path.join(candidate,'node_modules'),'junction');}
await fs.writeFile(path.join(qa,'frozen-source-overlay.json'),JSON.stringify({at:new Date().toISOString(),head,files:records},null,2));
let bootstrap=await fs.readFile('outputs/mercedes-service-top3-2026-10-20/qa/bootstrap-generated-input.mjs','utf8');bootstrap=bootstrap.replaceAll('mercedes-service-top3-2026-10-20','about-videos-2026-10-20');await fs.writeFile(path.join(qa,'bootstrap-generated-input.mjs'),bootstrap);
console.log(JSON.stringify({candidate,qa,overlayFiles:records.length,gitArchive:head}));
