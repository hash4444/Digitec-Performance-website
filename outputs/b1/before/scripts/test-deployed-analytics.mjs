import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

// Exercise the actual downloaded production handler in an isolated harness.
// This is NOT a claim of GA ingestion or a browser-network conversion test.
const directory = process.argv[2] || 'outputs/production-qa-2026-09-16';
const audit = JSON.parse(await readFile(`${directory}/http-audit.json`, 'utf8'));
const assetPath = audit.owners[0].scripts.find(p => p.startsWith('/assets/index-'));
const source = await readFile(`${directory}/${assetPath.split('/').pop()}`, 'utf8');
const start = source.indexOf('YS=e=>');
const end = source.indexOf(",oC='a, button", start);
assert.ok(start > 0 && end > start, 'Deployed bundle changed: re-identify the bounded analytics module before running');
const code = `const ${source.slice(start, end)};globalThis.auditComponent=iC;`;
assert.ok(code.includes('whatsapp_chat_opened') && code.includes('whatsapp_click') && code.length < 10000);
const results = [];
for (const owner of audit.owners) {
  const sentinel = 'PRODUCTION_QA_PRIVATE_TEXT';
  const url = new URL(owner.canonical + `?text=${sentinel}&utm_source=google&utm_medium=organic#private`);
  const listeners = new Map(), storage = new Map(), refs = [], effects = [];
  let refIndex = 0, effectIndex = 0;
  const events = [], cleanups = [];
  class Element { closest() { return this; } }
  class HTMLAnchorElement extends Element {
    href = `https://wa.me/97143402223?text=${sentinel}`;
    dataset = { ctaPlacement: 'service_scope' };
  }
  const window = { location: url, dataLayer: [], gtag: (...args) => events.push(args), sessionStorage: { getItem:k=>storage.get(k)||null, setItem:(k,v)=>storage.set(k,v) } };
  const document = { title:owner.title, referrer:'https://www.google.com/search?q=private', addEventListener:(type,fn)=>{listeners.set(type,fn);}, removeEventListener:(type,fn)=>{if(listeners.get(type)===fn)listeners.delete(type);} };
  const context = vm.createContext({ URL, window, document, Element, HTMLAnchorElement, Vt:()=>({pathname:window.location.pathname,search:window.location.search}), g:{
    useRef:initial=>{const i=refIndex++;return refs[i] || (refs[i]={current:initial});},
    useEffect:(fn,deps)=>{const i=effectIndex++;if(!effects[i]||deps.some((d,j)=>d!==effects[i][j])){cleanups[i]?.();cleanups[i]=fn();effects[i]=deps;}},
  } });
  vm.runInContext(code, context, {timeout:1000});
  const render = () => {refIndex=0;effectIndex=0;context.auditComponent();};
  render(); assert.equal(listeners.size,1);
  listeners.get('click')({target:new HTMLAnchorElement()});
  const clickEvents=window.dataLayer.filter(e=>e.event==='whatsapp_click');
  const chatEvents=events.filter(e=>e[0]==='event'&&e[1]==='whatsapp_chat_opened');
  assert.equal(clickEvents.length,1);assert.equal(chatEvents.length,1);
  assert.equal(clickEvents[0].link_url,'https://wa.me/97143402223');
  assert.equal(chatEvents[0][2].page_path,url.pathname);
  assert.equal(chatEvents[0][2].cta_placement,'service_scope');
  assert.ok(!JSON.stringify([...events,...window.dataLayer]).includes(sentinel));
  window.location=new URL('https://digitecme.com/services/head-unit-repair-dubai?text=private');render();
  assert.equal(events.filter(e=>e[0]==='event'&&e[1]==='page_view').length,1);
  cleanups.forEach(fn=>fn?.());assert.equal(listeners.size,0);
  results.push({route:owner.route,passed:true,whatsappClickCount:1,chatOpenedCount:1,spaPageViewCount:1,messageExcluded:true,handlerCleanup:true});
}
const report={testedAt:new Date().toISOString(),passed:true,method:'Downloaded production JS, isolated Node VM with React effect/document mocks; no network events or enquiries sent',assetPath,sha256:createHash('sha256').update(source).digest('hex'),results,gaIngestionVerified:false};
await writeFile(`${directory}/deployed-analytics-tests.json`,JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));
