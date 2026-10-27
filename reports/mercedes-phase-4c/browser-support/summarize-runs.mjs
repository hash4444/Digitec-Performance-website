import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.dirname(fileURLToPath(import.meta.url));
const dir=path.join(root,'runs');
const summary={generatedAt:new Date().toISOString(),scope:'In-page QA diagnostics only. Native browser/tool logs must be reconciled separately.',runs:[]};
for(const file of (await fs.readdir(dir).catch(()=>[])).filter(x=>x.endsWith('.ndjson')).sort()){
 const lines=(await fs.readFile(path.join(dir,file),'utf8')).trim().split('\n').filter(Boolean);
 const rows=lines.map(line=>JSON.parse(line));
 const events=rows.filter(row=>row.type==='browser-event');
 const kindCounts={};for(const row of events)kindCounts[row.event.kind]=(kindCounts[row.event.kind]||0)+1;
 const exceptionKinds=['window-error','unhandled-rejection','console-error','observe-invalid-target','observe-native-exception'];
 const exceptions=events.filter(row=>exceptionKinds.includes(row.event.kind));
 const serverErrors=rows.filter(row=>row.type==='qa-server-error');
 const appLoads=events.filter(row=>row.event.kind==='window-load').map(row=>({serverAt:row.serverAt,clientAt:row.event.clientAt,path:row.event.state.path,hash:row.event.state.hash,build:row.event.detail?.scripts?.filter(x=>x.src)||[],width:row.event.state.width}));
 summary.runs.push({file,rowCount:rows.length,firstAt:rows[0]?.serverAt||null,lastAt:rows.at(-1)?.serverAt||null,option:rows[0]?.serverOption||null,mode:rows[0]?.serverMode||null,kindCounts,exceptionCount:exceptions.length,exceptions,serverErrors,appLoads});
}
await fs.writeFile(path.join(root,'runs-summary.json'),JSON.stringify(summary,null,2)+'\n');
console.log(JSON.stringify(summary.runs.map(run=>({file:run.file,option:run.option,mode:run.mode,rows:run.rowCount,exceptions:run.exceptionCount,loads:run.appLoads.length,serverErrors:run.serverErrors.length})),null,2));
