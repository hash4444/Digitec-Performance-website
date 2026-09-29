import {readFile,writeFile} from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import ts from 'typescript';
const base='outputs/sitewide-seo-2026-09-17/audit';
const phase=process.argv.find(a=>a.startsWith('--phase='))?.split('=')[1]||'final';
const sourceOnly=process.argv.includes('--source-only');
if(!/^[a-z0-9-]+$/.test(phase))throw Error('Invalid phase');
// Load only pure content modules in memory. No Vite build or output mutation.
// Asset bindings are source-path strings, sufficient to test preservation.
const cache=new Map();
async function moduleUrl(filename) {
  filename=path.resolve(filename);if(cache.has(filename))return cache.get(filename);
  let source=ts.transpileModule(await readFile(filename,'utf8'),{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext}}).outputText;
  const imports=[...source.matchAll(/import\s+([\s\S]*?)\s+from\s+['"]([^'"]+)['"];?/g)];
  for(const [statement,binding,specifier] of imports) {
    if(/\.(png|jpe?g|webp|avif|svg|mov|mp4)$/i.test(specifier))source=source.replace(statement,`const ${binding} = ${JSON.stringify(specifier)};`);
    else {
      const resolved=specifier.startsWith('@/')?path.resolve('src',specifier.slice(2)):path.resolve(path.dirname(filename),specifier);
      const dependency=await moduleUrl(resolved.endsWith('.ts')?resolved:resolved+'.ts');
      source=source.replace(statement,`import ${binding} from ${JSON.stringify(dependency)};`);
    }
  }
  const url='data:text/javascript;base64,'+Buffer.from(source).toString('base64');cache.set(filename,url);return url;
}
const [{blogPosts},{localizeBlogPostToArabic}]=await Promise.all([moduleUrl('src/data/blogPosts.ts').then(u=>import(u)),moduleUrl('src/i18n/ar-blog.ts').then(u=>import(u))]);
const decode=s=>s.replace(/&#x([\da-f]+);/gi,(_,n)=>String.fromCodePoint(parseInt(n,16))).replace(/&#(\d+);/g,(_,n)=>String.fromCodePoint(+n)).replaceAll('&quot;','"').replaceAll('&amp;','&').replaceAll('&lt;','<').replaceAll('&gt;','>').replaceAll('&#39;',"'").replaceAll('&nbsp;',' ');
const normalize=s=>decode(String(s)).replace(/\s+/g,' ').trim();
const rows=[];
for(const original of blogPosts) {
  const localized=localizeBlogPostToArabic(original);
  const route='/ar/blog/'+original.slug;
  const errors=[];
  if(localized.updatedDate!=='2026-09-17')errors.push('No explicit September 17 adaptation selected');
  if(localized.date!==original.date)errors.push('Original publication date changed');
  if(localized.coverImage!==original.coverImage)errors.push('Original cover image changed');
  if(JSON.stringify(localized.video)!==JSON.stringify(original.video))errors.push('Original video changed');
  if(JSON.stringify(localized.gallery?.map(i=>i.src))!==JSON.stringify(original.gallery?.map(i=>i.src)))errors.push('Original gallery image sources changed');
  for(const field of ['title','excerpt','metaTitle','metaDescription'])if(!/[\u0600-\u06ff]/.test(localized[field]||''))errors.push(`Missing Arabic ${field}`);
  if(localized.ogType!=='article')errors.push('Wrong Open Graph article type');
  const expected=localized.content.flatMap(block=>[block.text||'',...(block.items||[])]).filter(Boolean);
  if(!sourceOnly) {
    const html=await readFile(`dist${route}/index.html`,'utf8');
    const bodyHtml=html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1]||'';
    const body=normalize(bodyHtml.replace(/<(script|style|svg)\b[^>]*>[\s\S]*?<\/\1>/gi,' ').replace(/<[^>]*>/g,' '));
    for(const text of expected)if(!body.includes(normalize(text)))errors.push(`Adaptation block missing in built HTML: ${text.slice(0,85)}`);
    const title=normalize(html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1]||'');
    if(title!==normalize(localized.metaTitle))errors.push('Built title differs from adaptation');
  }
  rows.push({route,slug:original.slug,publicationDate:localized.date,updatedDate:localized.updatedDate,bodyBlocks:expected.length,mediaPreserved:!errors.some(e=>/image|video|gallery/i.test(e)),passed:errors.length===0,errors});
}
const report={checkedAt:new Date().toISOString(),phase,mode:sourceOnly?'source-resolver-only':'source-resolver-and-built-html',total:rows.length,passed:rows.filter(r=>r.passed).length,failed:rows.filter(r=>!r.passed).length,rows};
await writeFile(`${base}/${phase}-arabic-adaptation-verification.json`,JSON.stringify(report,null,2));
console.log(JSON.stringify({phase,mode:report.mode,total:report.total,passed:report.passed,failed:report.failed,failures:rows.filter(r=>!r.passed)},null,2));
assert.equal(rows.length,51,'Expected original 51 BlogPost records');
assert.equal(report.failed,0,'Arabic adaptation verification failed');
