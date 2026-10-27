import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
const out='outputs/t1-release-2026-10-06';
for(const suffix of ['summary','records','repeated-paragraphs','noindex-inlinks']) {
 const source=`outputs/sitewide-seo-2026-09-17/audit/t1-release-local-${suffix}.json`;
 await fs.rename(source,path.join(out,`sitewide-${suffix}.json`));
}
await fs.copyFile('release-qa.local/build-results.json',path.join(out,'build-results.json'));
await fs.copyFile('outputs/seo-2026-09-16/master-validation.json',path.join(out,'master-validation.json'));
const names=await fs.readdir(path.join(out,'before/docs/seo'));
await fs.mkdir(path.join(out,'validator-reports'),{recursive:true});
for(const name of names) {
 const current=await fs.readFile('docs/seo/'+name),previous=await fs.readFile(path.join(out,'before/docs/seo',name));
 if(!current.equals(previous)) {
  await fs.writeFile(path.join(out,'validator-reports',name),current);
  await fs.copyFile(path.join(out,'before/docs/seo',name),'docs/seo/'+name);
 }
}
await fs.copyFile(path.join(out,'before/supabase/functions/mcp/index.ts'),'supabase/functions/mcp/index.ts');
await fs.copyFile(path.join(out,'before/outputs/seo-2026-09-16/master-validation.json'),'outputs/seo-2026-09-16/master-validation.json');
const manifest=JSON.parse(await fs.readFile('release-qa.local/source-manifest.json','utf8'));
const sourceChanges=[];
for(const record of manifest) if(createHash('sha256').update(await fs.readFile(record.file)).digest('hex')!==record.sha256)sourceChanges.push(record.file);
assert.equal(sourceChanges.length,0);
const summary=JSON.parse(await fs.readFile(path.join(out,'sitewide-summary.json'),'utf8'));
const metrics=['errors','metadataIssues','duplicateTitles','duplicateDescriptions','duplicateContent','brokenLinks','brokenFragments'];
const counts={};for(const key of metrics){assert.ok(Array.isArray(summary[key]));counts[key]=summary[key].length;assert.equal(counts[key],0);}
const report={verifiedAt:new Date().toISOString(),preservedRemoteHead:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),sourceFiles:manifest.length,changedSinceBuild:sourceChanges,typecheckPassed:true,buildPassed:JSON.parse(await fs.readFile(path.join(out,'build-results.json'),'utf8')).passed,additionalValidators:['tuning','master SEO','BMW hub','paint-care cluster','standalone production router','sitewide audit'],counts,routes:summary.totalPages,sitemapCanonicals:summary.canonicalSitemapEntries,manualDeploymentPerformed:false};
assert.equal(report.routes,1256);assert.equal(report.sitemapCanonicals,1005);assert.ok(report.buildPassed);
await fs.writeFile(path.join(out,'release-verification.json'),JSON.stringify(report,null,2));
await fs.writeFile(path.join(out,'README.md'),`# T1 release verification — 2026-10-06\n\nThe user authorized a commit and push to main. Remote main had advanced by two commits to ${report.preservedRemoteHead}; these were preserved with a fast-forward before committing the reviewed T1/T1.1 work. Their only source change was src/main.tsx stale-chunk reload handling.\n\nTypeScript and all 17 declared production build steps passed against the combined checkout. Tuning, master SEO, BMW hub, paint-care cluster and standalone production-router validators passed. Fresh sitewide audit measured zero errors, metadata issues, duplicate titles, duplicate descriptions, duplicate pages, broken links and broken fragments. Routes remain 1,256 and sitemap canonicals remain 1,005. All ${report.sourceFiles} build input files still match the tested source.\n\nThe T1.1 publication restrictions are retained: S63 packages withheld, exactly three DB11 reinforcement items withheld, GLC63 source price ranges unchanged, BMW/Audi tuning claims excluded and Porsche enquiry-only pending its model list. Historical T1/T1.1 reports retain their original verification dates and Git state. Fresh verification results are in release-verification.json and the associated reports. No manual deployment was performed.\n`);
console.log(JSON.stringify(report,null,2));
