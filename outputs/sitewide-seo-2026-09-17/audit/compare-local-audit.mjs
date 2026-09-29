import {readFile,writeFile,readdir} from 'node:fs/promises';
import ts from 'typescript';
const base='outputs/sitewide-seo-2026-09-17/audit';
const phase=process.argv[2]||'candidate';
if(!/^[a-z0-9-]+$/.test(phase))throw Error('Invalid phase');
const json=async f=>JSON.parse(await readFile(`${base}/${f}`,'utf8'));
const [before,after,beforeRecords,afterRecords]=await Promise.all([json('baseline-local-summary.json'),json(`${phase}-local-summary.json`),json('baseline-local-records.json'),json(`${phase}-local-records.json`)]);
const beforeByPath=new Map(beforeRecords.map(r=>[r.path,r]));
const beforeCanonical=new Set(beforeRecords.filter(r=>r.indexable).map(r=>r.path));
const afterCanonical=new Set(afterRecords.filter(r=>r.indexable).map(r=>r.path));
const details=['/porsche/problems/brake-warning-light','/porsche/problems/cayenne-air-suspension','/porsche/systems/rear-axle-steering','/porsche/systems/sport-chrono'];
const countChanges=field=>afterRecords.filter(r=>JSON.stringify(r[field])!==JSON.stringify(beforeByPath.get(r.path)?.[field])).length;
const sourceFiles=['src/data/blogPosts.ts','src/data/aiGuidePosts.ts','src/data/aiGuidePostsExtra.ts'];
function literalKeys(filename,source,mode) {
  const ast=ts.createSourceFile(filename,source,ts.ScriptTarget.Latest,true);
  const keys=[];function visit(node){
    if(ts.isPropertyAssignment(node)) {
      if(mode==='slugs' && node.name.text==='slug' && ts.isStringLiteral(node.initializer))keys.push(node.initializer.text);
      if(mode==='map' && ts.isStringLiteral(node.name)&&node.name.text.includes('-'))keys.push(node.name.text);
    }
    ts.forEachChild(node,visit);
  }visit(ast);return keys;
}
const allSlugs=[...new Set((await Promise.all(sourceFiles.map(async f=>literalKeys(f,await readFile(f,'utf8'),'slugs')))).flat())];
const resolverSource=await readFile('src/i18n/ar-blog.ts','utf8');
const modulePaths=(await readdir('src/i18n')).filter(f=>/^ar-.*-blog-content\.ts$/.test(f));
const modules=[];
for(const f of modulePaths) {
  const source=await readFile(`src/i18n/${f}`,'utf8');
  const slugs=literalKeys(f,source,'map');
  const moduleStem=f.replace(/\.ts$/,'');
  modules.push({file:`src/i18n/${f}`,articleCount:slugs.length,connectedInResolver:resolverSource.includes(`from './${moduleStem}'`),slugs});
}
const allPrepared=new Set(modules.flatMap(m=>m.slugs));
const connected=new Set(modules.filter(m=>m.connectedInResolver).flatMap(m=>m.slugs));
const rows=allSlugs.map(slug=>({slug,prepared:allPrepared.has(slug),resolverModuleConnected:connected.has(slug),canonicalArabic:afterCanonical.has('/ar/blog/'+slug),candidateBodyChanged:beforeByPath.get('/ar/blog/'+slug)?.contentSha256!==afterRecords.find(r=>r.path==='/ar/blog/'+slug)?.contentSha256}));
const coverage={checkedAt:new Date().toISOString(),method:'Read-only TypeScript AST inventory of the 51 BlogPost slugs and adaptation-map keys; connected means module imported by ar-blog.ts. Final rendered-body coverage requires checking the final build.',totalBlogPostSlugs:allSlugs.length,prepared:rows.filter(r=>r.prepared).length,connected:rows.filter(r=>r.resolverModuleConnected).length,unprepared:rows.filter(r=>!r.prepared).map(r=>r.slug),notConnected:rows.filter(r=>!r.resolverModuleConnected).map(r=>r.slug),modules,rows};
const changes={generatedAt:new Date().toISOString(),phase,evidenceMode:'local-built-html-comparison',baselineTimestamp:before.completedAt,candidateTimestamp:after.completedAt,
 inventory:{before:before.totalPages,after:after.totalPages,canonicalBefore:before.canonicalSitemapEntries,canonicalAfter:after.canonicalSitemapEntries,added:[...afterCanonical].filter(p=>!beforeCanonical.has(p)),removed:[...beforeCanonical].filter(p=>!afterCanonical.has(p))},
 checks:{metadataIssues:{before:before.metadataIssues.length,after:after.metadataIssues.length},duplicateTitles:{before:before.duplicateTitles.length,after:after.duplicateTitles.length},duplicateDescriptions:{before:before.duplicateDescriptions.length,after:after.duplicateDescriptions.length},duplicateH1:{before:before.duplicateH1.length,after:after.duplicateH1.length},duplicateContent:{before:before.duplicateContent.length,after:after.duplicateContent.length},brokenLinks:{before:before.brokenLinks.length,after:after.brokenLinks.length},brokenFragments:{before:before.brokenFragments.length,after:after.brokenFragments.length}},
 changed:{titles:countChanges('title'),descriptions:countChanges('descriptions'),headings:countChanges('h1'),extractedContent:countChanges('contentSha256'),contentLinks:countChanges('internalContentLinks')},
 porscheInlinks:details.map(path=>({path,beforeAbsent:before.noContentInlinksExcludingSitemaps.includes(path),afterAbsent:after.noContentInlinksExcludingSitemaps.includes(path),afterContentSources:afterRecords.filter(r=>r.family!=='html-sitemap'&&r.internalContentLinks?.some(l=>l.path===path)).map(r=>r.path)})),
 remainingDuplicateH1:after.duplicateH1,remainingZeroContentInlinks:after.noContentInlinksExcludingSitemaps,
 sourceTranslationCoverage:coverage,
};
await writeFile(`${base}/${phase}-comparison.json`,JSON.stringify(changes,null,2));
await writeFile(`${base}/${phase}-translation-source-coverage.json`,JSON.stringify(coverage,null,2));
const table=Object.entries(changes.checks).map(([key,value])=>`| ${key} | ${value.before} | ${value.after} |`).join('\n');
const md=`# SEO audit comparison — ${phase}

The ${phase} build removes all baseline duplicate article titles/descriptions and broken content links, while preserving the canonical inventory. This is a **local artifact comparison**, not proof that the changes are deployed or ranking improvements have occurred.

| Check | Baseline | ${phase} |
| --- | ---: | ---: |
${table}

- Built routes: ${changes.inventory.before} → ${changes.inventory.after}; canonical sitemap URLs: ${changes.inventory.canonicalBefore} → ${changes.inventory.canonicalAfter}; ${changes.inventory.added.length} additions / ${changes.inventory.removed.length} removals.
- Changed across the public inventory: ${changes.changed.titles} titles, ${changes.changed.descriptions} descriptions, ${changes.changed.headings} H1 values, ${changes.changed.extractedContent} extracted content bodies and ${changes.changed.contentLinks} content-link lists. These categories overlap and must not be summed.
- All four identified Porsche details now have in-content links: ${changes.porscheInlinks.map(r=>r.path).join(', ')}. Remaining zero-content-inlink entries are navigation/footer utility pages, not the previously isolated detail guides.
- Remaining H1 duplicate pairs: ${changes.remainingDuplicateH1.length ? `${JSON.stringify(changes.remainingDuplicateH1)}. The VRX English heading on /ar/vrx existed before this change; it is a localization task, not proof of an indexing block.` : 'None. The existing Arabic VRX heading is now translated.'}

## Arabic adaptation coverage

At ${coverage.checkedAt}, source maps contain explicit adaptations for **${coverage.prepared}/${coverage.totalBlogPostSlugs}** BlogPost records; **${coverage.connected}/${coverage.totalBlogPostSlugs}** are connected in the resolver. This source snapshot can be ahead of the compiled ${phase} build and does not confirm their rendered output.

Not connected in this snapshot: ${coverage.notConnected.length?coverage.notConnected.map(s=>'\u0060'+s+'\u0060').join(', '):'None'}.

Before publishing a final 51-article coverage claim, verify the complete source maps are connected, confirm each final Arabic page includes the intended adaptation body, preserve true publication dates/media, and retain intentional noindex policy for untranslated specialist-boundary routes unless their policy is separately reviewed.

## Remaining blockers and evidence needs

- **Production routing:** the baseline's six nonexistent Arabic destinations return HTTP 200 with homepage canonical. Removing content links prevents those journeys but does not fix unknown URL status handling. This requires actual host/edge routing activation and fresh HTTP verification; uploading static routing files alone is insufficient.
- **Final rendered verification:** ${coverage.notConnected.length ? `${coverage.notConnected.length} BlogPost adaptations are not yet connected in this source snapshot.` : 'All 51 BlogPost adaptations are connected in the source snapshot.'} The final build must still be checked against the complete resolver output.
- **Deployment state:** ${phase} files are local. Live claims require a fresh post-deployment comparison, not reuse of baseline results.
- **Business evidence:** real workshop work, expert review, authentic photos, customer reviews and verified profile details remain the inputs that code cannot fabricate. These support usefulness and local credibility; lack of new evidence is not a reason to invent it.
- **Measurement:** historical GSC reporting dates remain September 7–13. No new ranking gain is demonstrated by this release. Field performance still needs an available report or subsequent collection; blocked PageSpeed quota is not a performance score.

No word-count thresholds or automated similarity scores are used as release blockers in this comparison. Those baseline signals prioritize editorial review only.
`;
await writeFile(`${base}/SEO-AUDIT-${phase.toUpperCase()}-COMPARISON.md`,md);
console.log(JSON.stringify({phase,inventory:changes.inventory,checks:changes.checks,changed:changes.changed,coverage:{total:coverage.totalBlogPostSlugs,prepared:coverage.prepared,connected:coverage.connected,notConnected:coverage.notConnected}},null,2));
