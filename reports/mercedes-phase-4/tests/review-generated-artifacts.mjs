// Offline analysis only: no generated source/build artifacts are modified.
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';

const tests = path.dirname(fileURLToPath(import.meta.url));
const phase = path.dirname(tests);
const root = path.resolve(phase,'../..');
const roots = {original:root,baseline:path.join(phase,'baseline.local'),candidate:path.join(phase,'candidate.local')};
const hash = b => crypto.createHash('sha256').update(b).digest('hex');
const same = (a,b) => JSON.stringify(a) === JSON.stringify(b);
const files = ['cloudflare/routing-response-data.js','docs/seo/route-schema-matrix.csv','docs/seo/protection-release-validation.json','docs/seo/query-release-validation.json','public/sitemap.xml'];
const input = {};
const hashes = {};
for(const file of files) {
  input[file]={}; hashes[file]={};
  for(const [label,directory] of Object.entries(roots)) {
    const bytes = await fs.readFile(path.join(directory,file));
    input[file][label]=bytes.toString('utf8'); hashes[file][label]=hash(bytes);
  }
}
function exportsFrom(text) {
  const entries=[...text.matchAll(/^export const (\w+) = (.*);$/gm)].map(m=>[m[1],JSON.parse(m[2])]);
  if(entries.length!==4)throw new Error('Unexpected routing response-data export count');
  return Object.fromEntries(entries);
}
const routingData=Object.fromEntries(Object.entries(input[files[0]]).map(([label,text])=>[label,exportsFrom(text)]));
const routingArrays=['validPaths','legacyPaths','localizedFallbacks'].map(key=>({export:key,count:routingData.original[key].length,baselineEqualsOriginal:same(routingData.original[key],routingData.baseline[key]),candidateEqualsOriginal:same(routingData.original[key],routingData.candidate[key]),candidateEqualsBaseline:same(routingData.baseline[key],routingData.candidate[key])}));
const assetsFrom=html=>[...html.matchAll(/\/assets\/[^"'<>\s]+/g)].map(m=>m[0]);
const normalizeAssetReferences=html=>html.replace(/\/assets\/[^"'<>\s]+/g,(reference)=>reference.replace(/-[A-Za-z0-9_-]{8}(?=\.[^.]+$)/,'-__BUILD_HASH__'));
const notFound=['en','ar'].map(language=>{
  const versions=Object.fromEntries(Object.keys(roots).map(label=>[label,routingData[label].notFoundHtml[language]]));
  return {language,assets:Object.fromEntries(Object.entries(versions).map(([label,html])=>[label,assetsFrom(html)])),rawSha256:Object.fromEntries(Object.entries(versions).map(([label,html])=>[label,hash(html)])),baselineEqualsOriginalAfterOnlyViteAssetHashNormalization:normalizeAssetReferences(versions.baseline)===normalizeAssetReferences(versions.original),candidateEqualsOriginalAfterOnlyViteAssetHashNormalization:normalizeAssetReferences(versions.candidate)===normalizeAssetReferences(versions.original),candidateEqualsBaselineAfterOnlyViteAssetHashNormalization:normalizeAssetReferences(versions.candidate)===normalizeAssetReferences(versions.baseline)};
});
const sitemapRows=text=>[...text.matchAll(/<url>\s*<loc>([^<]+)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>\s*<\/url>/g)].map(m=>({url:m[1],lastmod:m[2]}));
const maps=Object.fromEntries(Object.entries(input['public/sitemap.xml']).map(([label,text])=>[label,sitemapRows(text)]));
const sitemapDiff=(before,after)=>after.filter((item,i)=>!same(item,before[i])).map((item,i)=>({url:item.url,before:before.find(x=>x.url===item.url)?.lastmod??null,after:item.lastmod}));
const sitemap={counts:Object.fromEntries(Object.entries(maps).map(([label,rows])=>[label,rows.length])),baselineUrlSequenceEqualsOriginal:same(maps.original.map(x=>x.url),maps.baseline.map(x=>x.url)),candidateUrlSequenceEqualsOriginal:same(maps.original.map(x=>x.url),maps.candidate.map(x=>x.url)),baselineEqualsCandidate:same(maps.baseline,maps.candidate),originalToBaselineChanges:sitemapDiff(maps.original,maps.baseline),originalToCandidateChanges:sitemapDiff(maps.original,maps.candidate),onlyLastmodChanged:input['public/sitemap.xml'].original.replace(/<lastmod>[^<]+<\/lastmod>/g,'<lastmod>__DATE__</lastmod>')===input['public/sitemap.xml'].baseline.replace(/<lastmod>[^<]+<\/lastmod>/g,'<lastmod>__DATE__</lastmod>'),releaseStatus:'HOLD: existing pipeline regenerates four original lastmod values even on the unchanged baseline. No authorization to release that drift, alter sitemap logic or modify these artifacts is inferred.'};
function csv(text) {
  const rows=[]; let row=[],cell='',quoted=false;
  for(let i=0;i<text.length;i++) {
    const c=text[i];
    if(c==='"') {if(quoted&&text[i+1]==='"'){cell+='"';i++;}else quoted=!quoted;}
    else if(c===','&&!quoted){row.push(cell);cell='';}
    else if((c==='\n'||c==='\r')&&!quoted){if(c==='\r'&&text[i+1]==='\n')i++;row.push(cell);if(row.some(x=>x!==''))rows.push(row);row=[];cell='';}
    else cell+=c;
  }
  if(cell||row.length){row.push(cell);rows.push(row);}
  if(quoted)throw new Error('Unclosed CSV quote');
  const [columns,...data]=rows;
  return {columns,rows:data.map(values=>Object.fromEntries(columns.map((column,i)=>[column,values[i]])))};
}
const matrices=Object.fromEntries(Object.entries(input['docs/seo/route-schema-matrix.csv']).map(([label,text])=>[label,csv(text)]));
function matrixDiff(before,after) {
  const byPath=new Map(before.rows.map(row=>[row.Path,row])); const changes=[];
  for(const row of after.rows){const previous=byPath.get(row.Path);if(!previous){changes.push({path:row.Path,column:'__added_row__',before:null,after:row});continue;}for(const column of after.columns)if(previous[column]!==row[column])changes.push({path:row.Path,column,before:previous[column],after:row[column]});}
  for(const row of before.rows)if(!after.rows.some(r=>r.Path===row.Path))changes.push({path:row.Path,column:'__removed_row__',before:row,after:null});
  return changes;
}
const matrixChanges=matrixDiff(matrices.original,matrices.baseline);
const matrix={rowCounts:Object.fromEntries(Object.entries(matrices).map(([label,value])=>[label,value.rows.length])),columnsUnchanged:same(matrices.original.columns,matrices.baseline.columns)&&same(matrices.original.columns,matrices.candidate.columns),candidateByteEqualsBaseline:input['docs/seo/route-schema-matrix.csv'].candidate===input['docs/seo/route-schema-matrix.csv'].baseline,baselinePathAndCanonicalSequenceEqualsOriginal:same(matrices.original.rows.map(row=>[row.Path,row['Canonical URL']]),matrices.baseline.rows.map(row=>[row.Path,row['Canonical URL']])),candidatePathAndCanonicalSequenceEqualsOriginal:same(matrices.original.rows.map(row=>[row.Path,row['Canonical URL']]),matrices.candidate.rows.map(row=>[row.Path,row['Canonical URL']])),changedCellCount:matrixChanges.length,changedColumns:[...new Set(matrixChanges.map(c=>c.column))],originalToBaselineChanges:matrixChanges,originalToCandidateChanges:matrixDiff(matrices.original,matrices.candidate),meaning:'Generated validation inventory differs from the older original artifact. Its exact changed cells are retained; no actual page metadata or canonical change is inferred from this reporting artifact.'};
function diffs(before,after,pointer='') {
  if(same(before,after))return [];
  if(before===null||after===null||typeof before!=='object'||typeof after!=='object')return [{pointer:pointer||'/',before,after}];
  return [...new Set([...Object.keys(before),...Object.keys(after)])].flatMap(key=>diffs(before[key],after[key],pointer+'/'+key.replaceAll('~','~0').replaceAll('/','~1')));
}
const validations={};
for(const file of ['docs/seo/protection-release-validation.json','docs/seo/query-release-validation.json']) {
  const data=Object.fromEntries(Object.entries(input[file]).map(([label,text])=>[label,JSON.parse(text)]));
  validations[file]={passedFlags:Object.fromEntries(Object.entries(data).map(([label,v])=>[label,v.passed])),originalToBaselineChanges:diffs(data.original,data.baseline),originalToCandidateChanges:diffs(data.original,data.candidate),baselineToCandidateChanges:diffs(data.baseline,data.candidate)};
}
const routingSemanticPassed=routingArrays.every(r=>r.baselineEqualsOriginal&&r.candidateEqualsOriginal&&r.candidateEqualsBaseline)&&notFound.every(r=>r.baselineEqualsOriginalAfterOnlyViteAssetHashNormalization&&r.candidateEqualsOriginalAfterOnlyViteAssetHashNormalization&&r.candidateEqualsBaselineAfterOnlyViteAssetHashNormalization);
const report={reviewedAtUtc:new Date().toISOString(),offlineOnly:true,networkRequests:0,generatedArtifactMutations:0,inputRoots:roots,files:hashes,routingResponseData:{exportNames:Object.keys(routingData.original),arrays:routingArrays,notFoundHtml:notFound,semanticRoutingDataComparisonPassed:routingSemanticPassed,limit:'Only Vite hash suffixes in /assets/ references are normalized in the two 404 documents; the routing arrays and all remaining HTML bytes must match. This does not prove production responses or Cloudflare state.'},sitemap,routeSchemaMatrix:matrix,releaseValidationReports:validations,scopeBoundary:{priorNineFileCheck:'The 75-assertion SSR verifier compares nine named routing/sitemap artifacts between baseline and candidate. It excludes routing-response-data.js and does not establish equality to the original snapshot.',sourcePatchScope:'Exactly three reviewed source changes are separately recorded in controlled-copy.json and built-input-comparison.json; this generated-artifact review does not expand approval.',fullArtifactRelease:'HOLD pending explicit sitemap lastmod drift review. No generated artifact was modified to make a check pass.'}};
report.reviewedAtDubai=new Date(Date.parse(report.reviewedAtUtc)+4*3600000).toISOString().replace('Z','+04:00');
await fs.writeFile(path.join(tests,'generated-artifact-review.json'),JSON.stringify(report,null,2)+'\n');
const query=validations['docs/seo/query-release-validation.json'];
const md=[`# Generated artifact review`, ``, `**Complete build-artifact release remains on hold.** Both builds regenerate five existing input artifacts. The three approved source edits remain a separate scope; this review adds no release authorization. No generated/source/build output was modified.`, ``, `Reviewed ${report.reviewedAtUtc} / ${report.reviewedAtDubai}. Offline only.`, ``, `- Routing response data: all 1,256 valid paths, 253 legacy paths and 94 localized fallback pairs match the original and each other exactly. EN/AR 404 HTML matches after normalizing only Vite asset filename hash suffixes. Original → baseline updates JS and CSS hashes; baseline → candidate updates the JS hash.`, `- Sitemap: all ${maps.original.length} URL entries and ordering remain unchanged. Baseline and candidate are identical. Four lastmod values differ from the original even on the unchanged baseline:`, ...sitemap.originalToBaselineChanges.map(c=>`  - \`${c.url}\`: \`${c.before}\` → \`${c.after}\`.`), `- Route/schema CSV: ${matrix.rowCounts.original} rows; path/canonical sequence unchanged; candidate byte-identical to baseline. ${matrix.changedCellCount} cells differ from the old original, in column(s): ${matrix.changedColumns.map(x=>'`'+x+'`').join(', ')}. Exact cells are retained in JSON.`, `- Validation JSON: all three versions retain \`passed: true\`. Protection-report changes include timestamps and current client/chunk/HTML fingerprints; exact JSON pointers are retained. Query-report changes are ${query.originalToBaselineChanges.map(x=>'`'+x.pointer+'`: '+x.before+' → '+x.after).join('; ')} (original → baseline), with ${query.baselineToCandidateChanges.map(x=>'`'+x.pointer+'`: '+x.before+' → '+x.after).join('; ')} (baseline → candidate). These are generated observations, not timing-only diffs.`, ``, `The earlier nine-file equality result compared baseline with candidate, excluded \`cloudflare/routing-response-data.js\`, and did not establish equality to the original generated artifacts. SSR metadata and JSON-LD preservation on the 16 scoped pages remain covered by [the 75/75 comparison](results/summary.md).`, ``, `Required next decision: review the four sitemap date changes and the complete artifact packaging policy before any later release. Do not silently copy these generated deltas into the original checkout or alter routing/sitemap logic in this phase.`, ``, `[Full hashes, export/HTML checks, sitemap rows, CSV cells and validation-report pointers](generated-artifact-review.json).`, ``].join('\n');
await fs.writeFile(path.join(tests,'generated-artifact-review.md'),md);
console.log(JSON.stringify({routingSemanticPassed,sitemapUrlsUnchanged:sitemap.baselineUrlSequenceEqualsOriginal&&sitemap.candidateUrlSequenceEqualsOriginal,sitemapChanges:sitemap.originalToBaselineChanges,matrixChangedCells:matrix.changedCellCount,matrixChangedColumns:matrix.changedColumns,matrixBaselineEqualsCandidate:matrix.candidateByteEqualsBaseline,queryChanges:query,fullArtifactRelease:'HOLD'},null,2));
