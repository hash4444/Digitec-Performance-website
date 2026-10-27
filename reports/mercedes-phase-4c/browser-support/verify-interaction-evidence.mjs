import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
const out=path.dirname(fileURLToPath(import.meta.url));
const file=path.resolve(out,'../browser/interaction-results.json');const bytes=await fs.readFile(file),data=JSON.parse(bytes),checks=[];
const check=(name,passed,observed)=>checks.push({name,passed,observed});
const get=name=>data.observations.find(x=>x.case===name);
const draft='Hi Digi-Tec, I would like a Mercedes bodywork assessment.\n\nModel/year: \nAffected panels: \nPrevious paint or repair (if known): \nSensor warning (if any): \nI can attach clear photos of the damage.';
check('Recorded observation count',data.observations.length===16,data.observations.length);
check('Native B console empty',data.nativeBConsole.length===0,data.nativeBConsole);
const diag=get('B desktop new Diagnostics sequentialTab')?.focus;
check('New diagnostics target/focus',diag?.href==='/services/mercedes-diagnostics-dubai'&&diag.focusVisible===true,diag);
check('Repair planning Enter destination',get('B repair planning Enter')?.urlHeader.includes('http://127.0.0.1:5202/services/mercedes-mechanical-repair-dubai'),get('B repair planning Enter'));
for(const [name,placement] of [['B workshop phone Enter','workshop_proof'],['B final phone Enter','final_cta']]){
 const raw=get(name)?.captured||'';const detail=JSON.parse(raw.replace(/^QA CONTACT INTERCEPTED: /,''));
 check(name+' number and placement',detail.href==='tel:+97143402223'&&detail.placement===placement,detail);
}
for(const [name,placement] of [['B assessment hero','hero'],['B assessment service_scope','service_scope'],['B assessment final_cta','final_cta'],['B320 final assessment Enter','final_cta']]){
 const raw=get(name)?.captured||'';const detail=JSON.parse(raw.replace(/^QA CONTACT INTERCEPTED: /,'')),url=new URL(detail.href);
 check(name+' recipient',url.protocol==='https:'&&url.hostname==='wa.me'&&url.pathname==='/97143402223',url.origin+url.pathname);
 check(name+' complete reviewed draft',url.searchParams.get('text')===draft,url.searchParams.get('text'));
 check(name+' attribution',detail.placement===placement,detail.placement);
}
for(const observation of data.observations.filter(x=>x.metrics)){
 const metrics=JSON.parse(observation.metrics);
 check(observation.case+' no horizontal overflow',metrics.scrollWidth===metrics.clientWidth,{width:metrics.width,scrollWidth:metrics.scrollWidth,clientWidth:metrics.clientWidth});
 check(observation.case+' ready and mounted',metrics.readyState==='complete'&&metrics.rootPresent&&metrics.bodyPresent,{readyState:metrics.readyState,rootPresent:metrics.rootPresent,bodyPresent:metrics.bodyPresent});
}
const finalFocus=JSON.parse(get('B320 final assessment focus').metrics);
check('320px CTA focus visible',finalFocus.focus.focusVisible===true,finalFocus.focus);
check('320px CTA fully in viewport',finalFocus.focus.rect.left>=0&&finalFocus.focus.rect.right<=finalFocus.width&&finalFocus.focus.rect.top>=0&&finalFocus.focus.rect.bottom<=finalFocus.height,finalFocus.focus.rect);
check('Final phone sequential focus',get('B final phone sequentialTab')?.focus.focusVisible&&get('B final phone sequentialTab')?.focus.href==='tel:+97143402223',get('B final phone sequentialTab'));
check('FAQ expands via Enter',get('B FAQ keyboard Enter')?.expanded===true,get('B FAQ keyboard Enter'));
check('Menu Escape restores focus',get('B320 Menu Enter/Escape')?.focusedMenu===true,get('B320 Menu Enter/Escape'));
const analysis={checkedAt:new Date().toISOString(),source:'../browser/interaction-results.json',sourceSha256:crypto.createHash('sha256').update(bytes).digest('hex'),scope:'Offline validation of recorded browser evidence, not an additional UI replay or live contact send.',checks,passed:checks.filter(x=>x.passed).length,total:checks.length,allPassed:checks.every(x=>x.passed),limitations:['Responsive frames use the desktop browser engine.','Native contact targets were intercepted by QA response code; no real call, message or production analytics behavior is claimed.']};
await fs.writeFile(path.join(out,'interaction-evidence-validation.json'),JSON.stringify(analysis,null,2)+'\n');console.log(JSON.stringify({allPassed:analysis.allPassed,passed:analysis.passed,total:analysis.total,failed:checks.filter(x=>!x.passed)}));if(!analysis.allPassed)process.exitCode=1;
