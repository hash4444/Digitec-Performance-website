import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
const root='outputs/t1.1/owned-source-diffs';
const manifest=JSON.parse(await fs.readFile('outputs/t1.1/before/file-manifest.json','utf8'));
const hash=s=>crypto.createHash('sha256').update(s).digest('hex');
const changes=[];
for(const file of ['src/pages/BrandWorkshopArticlePage.tsx','src/data/brands.ts','src/i18n/ar-brands.ts','src/pages/Brands.tsx']) {
  const after=await fs.readFile(file,'utf8');
  let before=after;
  if(file==='src/pages/BrandWorkshopArticlePage.tsx') before=before.replace(/<p className="mt-4 leading-relaxed text-gray-300">\{isArabic && \['BMW', 'Audi'\]\.includes\(article\.brand\)\r?\n\s+\? `تُراجع الحالة الميكانيكية لسيارة \$\{article\.brand\} وفق نتائج التشخيص وحالة التبريد والفرامل والإطارات وطريقة الاستخدام\. تُسجل التعديلات الموجودة ضمن معلومات الفحص، وتُقترح الصيانة أو الإصلاح وفق النتائج\.`\r?\n\s+: article\.performanceNote\}<\/p>/,'<p className="mt-4 leading-relaxed text-gray-300">{article.performanceNote}</p>');
  if(file==='src/data/brands.ts') for(const brand of ['BMW','Audi']) before=before.replace(new RegExp(`(name: '${brand}',[\\s\\S]*?specialization: )'Repair • Maintenance • Diagnostics'`),"$1'Repair • Maintenance • Diagnostics • Performance'");
  if(file==='src/i18n/ar-brands.ts') before=before.replace("specialization: ['BMW', 'Audi'].includes(brand.name) ? 'إصلاح • صيانة • تشخيص' : 'إصلاح • صيانة • تشخيص • أداء',","specialization: 'إصلاح • صيانة • تشخيص • أداء',");
  if(file==='src/pages/Brands.tsx') before=before.replace("{isArabic ? (['BMW', 'Audi'].includes(brand.name) ? 'صيانة • إصلاح • تشخيص' : 'صيانة • إصلاح • تشخيص • أداء') : brand.specialization}","{isArabic ? 'صيانة • إصلاح • تشخيص • أداء' : brand.specialization}");
  const expected=manifest.find(r=>r.file===file)?.sha256;
  const candidates=[before,before.replace(/\r\n/g,'\n'),before.replace(/\r?\n/g,'\r\n')];
  // Brands.tsx already had mixed line endings at T1.1 start; apply_patch changes
  // the edited line's terminator to LF. Restore only that terminator and verify
  // the entire reconstructed byte stream against the captured pre-T1.1 hash.
  if(file==='src/pages/Brands.tsx') candidates.push(before.replace("{isArabic ? 'صيانة • إصلاح • تشخيص • أداء' : brand.specialization}</p>\n","{isArabic ? 'صيانة • إصلاح • تشخيص • أداء' : brand.specialization}</p>\r\n"));
  const matched=candidates.find(s=>hash(s)===expected);
  if(!matched&&file!=='src/pages/Brands.tsx') throw new Error(`${file}: pre-T1.1 byte verification failed`);
  const beforePath=path.join(root,'before',file), afterPath=path.join(root,'after',file);
  await fs.mkdir(path.dirname(beforePath),{recursive:true});await fs.mkdir(path.dirname(afterPath),{recursive:true});
  const snapshot=matched??before;
  await fs.writeFile(beforePath,snapshot);await fs.writeFile(afterPath,after);
  const beforeLines=snapshot.replace(/\r\n/g,'\n').split('\n'), afterLines=after.replace(/\r\n/g,'\n').split('\n');
  changes.push({file,preT11Sha256:expected,reconstructedSnapshotSha256:hash(snapshot),currentSha256:hash(after),verifiedAgainstPreT11Manifest:Boolean(matched),snapshotLimitation:matched?null:'Brands.tsx: original mixed line-ending byte stream was not recovered. The before snapshot is a reconstruction by reversing exactly the one authorized Arabic card conditional; it must not be represented as byte-identical to pre-T1.1. Original captured hash remains authoritative. The initial clean Git state and single conditional diff establish change scope.',beforePath,afterPath,beforeLineCount:beforeLines.length,afterLineCount:afterLines.length});
}
await fs.writeFile(path.join(root,'verified-manifest.json'),JSON.stringify(changes,null,2));
await fs.writeFile(path.join(root,'README.md'),'# Owned T1.1 source correction snapshots\n\nThree reconstructed before snapshots byte-match the pre-T1.1 captured file manifest: BrandWorkshopArticlePage.tsx, brands.ts and ar-brands.ts. Their original and current SHA-256 values and exact before/after copies are retained in verified-manifest.json. This compares to the actual T1.1 start, including prior T1 changes.\n\nBrands.tsx has an explicit byte-snapshot limitation: its original mixed line-ending byte stream could not be reconstructed to the captured pre-T1.1 hash. Its saved before copy reverses exactly the single authorized BMW/Audi-only Arabic card conditional, but is not claimed byte-identical. The original captured hash, initial clean Git state and one-conditional application diff establish the correction scope. No broader Brands.tsx content change was made.\n\nAll four changes preserve other brands and existing service architecture. Final production HTML, type/build/validator checks and the comprehensive rendered BMW/Audi semantic audit cover the resulting behavior.\n');
console.log(JSON.stringify(changes,null,2));
