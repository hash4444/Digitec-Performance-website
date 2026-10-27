import { mkdir, readdir, readFile, writeFile, unlink } from 'node:fs/promises';
import path from 'node:path';
const root = 'outputs/five-brand-service-2026-10-19';
const manifestPath = `${root}/baseline/generated-manifest.json`;
const mode = process.argv[2] || 'save';
if (mode === 'save') {
  const files = ['public/sitemap.xml', 'outputs/seo-2026-09-16/master-validation.json'];
  async function walk(dir) {
    for (const entry of await readdir(dir, {withFileTypes:true})) {
      const file = `${dir}/${entry.name}`;
      if(entry.isDirectory()) await walk(file); else files.push(file);
    }
  }
  for(const dir of ['docs/seo', 'outputs/seo-2026-09-16/browser']) {
    try { await walk(dir); } catch(error) { if(error.code !== 'ENOENT') throw error; }
  }
  const records=[];
  for(const file of files) {
    const saved=`${root}/baseline/generated/${file}`;
    await mkdir(path.dirname(saved),{recursive:true});
    const data=await readFile(file);
    await writeFile(saved,data);
    records.push({file,saved});
  }
  await writeFile(manifestPath,JSON.stringify(records,null,2));
  console.log(`Preserved ${records.length} pre-existing generated files`);
} else {
  const records=JSON.parse(await readFile(manifestPath,'utf8'));
  let changes=0;
  for(const {file,saved} of records) {
    const before=await readFile(saved), after=await readFile(file);
    if(!before.equals(after)) {
      const evidence=`${root}/qa/generated/${file}`;
      await mkdir(path.dirname(evidence),{recursive:true});
      await writeFile(evidence,after);
      await writeFile(file,before);
      changes++;
    }
  }
  const known=new Set(records.map(r=>r.file));
  const newFiles=[];
  async function findNew(dir) {
    for(const entry of await readdir(dir,{withFileTypes:true})) {
      const file=`${dir}/${entry.name}`;
      if(entry.isDirectory()) await findNew(file);
      else if(!known.has(file)) newFiles.push(file);
    }
  }
  for(const dir of ['docs/seo','outputs/seo-2026-09-16/browser']) await findNew(dir);
  for(const file of newFiles) {
    const target=path.resolve(file);
    if(!['docs/seo','outputs/seo-2026-09-16/browser'].some(dir=>target.startsWith(path.resolve(dir)+path.sep))) throw Error('Generated-file archive escaped its known output directories');
    const evidence=`${root}/qa/generated/${file}`;
    await mkdir(path.dirname(evidence),{recursive:true});
    await writeFile(evidence,await readFile(file));
    await unlink(file);
  }
  await writeFile(`${root}/qa/generated-restoration.json`,JSON.stringify({restored:changes,newFilesArchived:newFiles,preExistingFiles:records.length},null,2));
  console.log(`Archived check results and restored ${changes} generated files to exact pre-sprint bytes`);
}
