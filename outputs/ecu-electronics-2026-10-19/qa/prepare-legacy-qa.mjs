import fs from 'node:fs/promises';
import path from 'node:path';
const workspace=process.cwd(),out=path.join(workspace,'outputs/ecu-electronics-2026-10-19/qa');
const old=path.join(workspace,'outputs/diagnostics-ac-2026-10-19/qa');
await fs.mkdir(out,{recursive:true});
for(const name of ['browser-safety-preload.mjs','validate-combined-static.mjs','test-tuning-browser.mjs','test-diagnostics-ac-browser.mjs','validate-diagnostics-ac-static.mjs']){
 let code=await fs.readFile(path.join(old,name),'utf8');
 code=code.replaceAll("root.includes('diagnostics-ac-2026-10-19')","root.includes('ecu-electronics-2026-10-19')");
 if(name==='test-diagnostics-ac-browser.mjs')code=code.replace("path.join(out,'../../audit/selected-owner-baseline.json')",JSON.stringify(path.join(workspace,'outputs/diagnostics-ac-2026-10-19/audit/selected-owner-baseline.json')));
 if(name==='validate-diagnostics-ac-static.mjs'){
  code=code.replace("path.join(out,'../audit/selected-owner-baseline.json')",JSON.stringify(path.join(workspace,'outputs/diagnostics-ac-2026-10-19/audit/selected-owner-baseline.json')));
  code=code.replace("path.join(out,'../audit/baseline-owner-audit.json')",JSON.stringify(path.join(workspace,'outputs/diagnostics-ac-2026-10-19/audit/baseline-owner-audit.json')));
  code=code.replace("path.resolve(out,'../../automotive-release-2026-10-19/candidate.local/dist')",JSON.stringify(path.join(workspace,'outputs/automotive-release-2026-10-19/candidate.local/dist')));
  // The current sprint adds a marked, independent enquiry/Q&A section. This
  // prior-sprint regression removes ONLY that newly tested section before its
  // existing protected HTML comparison. All old content/CTAs/attributes remain
  // under the old comparison; the ECU suite validates every new section.
  code=code.replace("const visibleHtml=html=>", "const removeEcuPanel=html=>html.replace(/<div class=\"(?:mt-7|mx-auto max-w-5xl px-4 pt-12 sm:px-6)\"><section\\b[^>]*data-ecu-electronics-enquiry=[\"'][^\"']+[\"'][^>]*>[\\s\\S]*?<\\/section><\\/div>/gi,'').replace(/<section\\b[^>]*data-ecu-electronics-enquiry=[\"'][^\"']+[\"'][^>]*>[\\s\\S]*?<\\/section>/gi,'');\nconst visibleHtml=html=>");
  code=code.replace("const visibleHash=html=>createHash('sha256').update(visibleHtml(html))", "const visibleHash=html=>createHash('sha256').update(visibleHtml(removeEcuPanel(html)))");
 }
 await fs.writeFile(path.join(out,name),code);
}
let cli=await fs.readFile(path.join(old,'run-combined-cli.mjs'),'utf8');
cli=cli.replaceAll("candidate.includes('diagnostics-ac-2026-10-19')","candidate.includes('ecu-electronics-2026-10-19')");
cli=cli.replace("['diagnostics-ac-static', [path.join(suiteDir, 'validate-diagnostics-ac-static.mjs'), output]],","['diagnostics-ac-static', [path.join(suiteDir, 'validate-diagnostics-ac-static.mjs'), path.join(output, 'diagnostics-ac-regression')]],\n  ['ecu-electronics-static', [path.join(suiteDir, 'validate-ecu-electronics-static.mjs'), output]],");
await fs.writeFile(path.join(out,'run-combined-cli.mjs'),cli);
let browser=await fs.readFile(path.join(old,'run-combined-browser.mjs'),'utf8');
browser=browser.replaceAll("candidate.includes('diagnostics-ac-2026-10-19')","candidate.includes('ecu-electronics-2026-10-19')");
browser=browser.replace('withPreview(5205','withPreview(5195').replace('withPreview(5206','withPreview(5196');
browser=browser.replace("} catch (error) {\n  results.push", "  await suite('diagnostics-ac-browser', [path.join(path.dirname(fileURLToPath(import.meta.url)), 'test-diagnostics-ac-browser.mjs'), path.join(output, 'diagnostics-ac-browser')]);\n  await suite('tuning-browser', [path.join(path.dirname(fileURLToPath(import.meta.url)), 'test-tuning-browser.mjs'), path.join(output, 'tuning-browser')]);\n  await suite('ecu-electronics-browser', [path.join(path.dirname(fileURLToPath(import.meta.url)), 'test-ecu-electronics-browser.mjs'), path.join(output, 'ecu-electronics-browser')]);\n} catch (error) {\n  results.push");
browser=browser.replaceAll('results.length === 5','results.length === 8').replaceAll('results.length !== 5','results.length !== 8');
await fs.writeFile(path.join(out,'run-combined-browser.mjs'),browser);
console.log(JSON.stringify({prepared:true,out,existingChecks:'Unchanged product assertions; path/port guards adapted for new isolated candidate. Prior protected HTML additionally removes only current marked ECU panel before comparison, which is validated separately.'}));
