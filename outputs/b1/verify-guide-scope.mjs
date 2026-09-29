import fs from 'node:fs';
import ts from '../../node_modules/typescript/lib/typescript.js';
const root = process.cwd();
const targets = {
  'src/data/blogPosts.ts': ['best-oil-change-dubai-mercedes','mercedes-service-intervals-dubai-heat','mercedes-repair-dubai-complete-guide'],
  'src/data/aiGuidePosts.ts': ['mercedes-service-cost-dubai-guide'],
  'src/data/aiGuidePostsExtra.ts': ['transmission-service-7g-9g-dubai','air-suspension-repair-dubai-guide'],
  'src/i18n/ar-service-blog-content.ts': ['best-oil-change-dubai-mercedes','mercedes-service-intervals-dubai-heat'],
  'src/i18n/ar-general-blog-content.ts': ['mercedes-service-cost-dubai-guide'],
  'src/i18n/ar-specialist-blog-content.ts': ['mercedes-repair-dubai-complete-guide'],
};
function tokenize(code) {
  const scanner=ts.createScanner(ts.ScriptTarget.Latest,true,ts.LanguageVariant.Standard,code);
  const result=[];
  for(let token=scanner.scan();token!==ts.SyntaxKind.EndOfFileToken;token=scanner.scan()) result.push([token,scanner.getTokenValue()||scanner.getTokenText()]);
  return JSON.stringify(result);
}
function records(file) {
  const code=fs.readFileSync(file,'utf8'); const sf=ts.createSourceFile(file,code,ts.ScriptTarget.Latest,true);const result={};
  function visit(n) {
    if(ts.isObjectLiteralExpression(n)){
      const slug=n.properties.find(p=>ts.isPropertyAssignment(p)&&p.name.getText(sf).replace(/['"]/g,'')==='slug');
      if(slug&&ts.isStringLiteral(slug.initializer)) result[slug.initializer.text]=n.getText(sf);
      for(const prop of n.properties) if(ts.isPropertyAssignment(prop)&&ts.isStringLiteral(prop.name)&&/mercedes|air-suspension|transmission-service/.test(prop.name.text)) result[prop.name.text]=prop.getText(sf);
    }
    ts.forEachChild(n,visit);
  }
  visit(sf);return result;
}
const routes=new Set(JSON.parse(fs.readFileSync('outputs/b1/before-routes.json')).map(r=>r.path));
const result=[];let failed=false;
for(const [file,allowed] of Object.entries(targets)){
  const before=records(`${root}/outputs/b1/before/${file}`), after=records(`${root}/${file}`);
  const changed=Object.keys(after).filter(k=>tokenize(after[k])!==tokenize(before[k]||''));
  const unexpected=changed.filter(k=>!allowed.includes(k));
  const missingLinks=[];
  for(const slug of allowed) for(const match of (after[slug]||'').matchAll(/(?:href["']?\s*:\s*)["'](\/[^"']+)["']/g)) if(!routes.has(match[1])) missingLinks.push(match[1]);
  result.push({file,changed,unexpected,missingLinks}); failed ||=unexpected.length>0||missingLinks.length>0;
}
const helper=fs.readFileSync('src/data/mercedesMaintenanceGuide.ts','utf8');
const helperMissing=[...helper.matchAll(/href: '(\/[^']+)'/g)].map(m=>m[1]).filter(p=>!routes.has(p));
result.push({file:'src/data/mercedesMaintenanceGuide.ts',missingLinks:helperMissing});failed ||=helperMissing.length>0;
fs.writeFileSync('outputs/b1/guides-source-qa.json',JSON.stringify({passed:!failed,checks:result},null,2));
console.log(JSON.stringify({passed:!failed,checks:result},null,2));
process.exitCode=failed?1:0;
