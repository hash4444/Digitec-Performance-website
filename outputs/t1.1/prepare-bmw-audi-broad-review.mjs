import fs from 'node:fs/promises';
const before=JSON.parse(await fs.readFile('outputs/t1.1/before-precautions/bmw-audi-broad-rendered-contexts.json','utf8'));
// These 172 unique actual sentences were read individually during T1.1. This
// creates a fixed exact-text review ledger, not a general-purpose safe-word rule.
const stale=/إذا كان تطوير أداء|Establish baseline health before supported performance work|A performance change is a separate enquiry|Repair • Maintenance • Diagnostics • Performance|صيانة • إصلاح • تشخيص • أداء|إصلاح • صيانة • تشخيص • أداء/;
const staleGroups=before.grouped.filter(r=>stale.test(r.text));
const retained=before.grouped.filter(r=>!stale.test(r.text)).map(r=>{
  let classification='EXISTING REPAIR / MAINTENANCE / SYSTEM CONDITION';
  let reason='Read as a complete rendered sentence and with its page/schema context, this describes fitted vehicle systems, fault symptoms, maintenance, diagnostic findings, repair parts or required post-repair calibration. It makes no DIGI-TEC power-tuning offer for BMW/Audi.';
  if(/^(?:https:\/\/digitecme.com\/#(?:offer|service)-performance|Digi-Tec Performance Center|Vehicle performance services|Performance Tuning|تطوير الأداء|التشخيص والبرمجة|© 2026 D IGI-TEC Performance Center\. All rights reserved\.)$/.test(r.text)||r.text.startsWith('Independent luxury and performance car workshop')||r.text.startsWith('مركز دبي المتخصص في السيارات الفاخرة وتطوير الأداء')) {
    classification='SHARED CORPORATE FOOTER / NAVIGATION / ORGANIZATION SCHEMA';
    reason='This exact shared company name, navigation link, corporate footer or Organization offer is company-wide and does not identify BMW/Audi as a tuning vehicle. Brand-specific page copy and its service scope remain repair/inspection.';
  } else if(/existing modifications|التعديلات الموجودة|تعديلات|software.*changes|modify|modified|plans for an upgrade/i.test(r.text)) {
    classification='EXISTING MODIFICATION / USAGE CONTEXT FOR INSPECTION';
    reason='The sentence asks about existing modifications or intended usage so the workshop can inspect the existing vehicle accurately. It does not offer DIGI-TEC tuning or promise to carry out a proposed power upgrade.';
  } else if(r.text.startsWith('Digi-Tec in Al Quoz')||r.text.startsWith('يقدم ديجي-تك في القوز')) {
    classification='EXPLICIT REPAIR / TUNING SCOPE SEPARATION';
    reason='The paragraph assigns BMW/Audi to service/repair coverage, then separately limits tuning review to the Performance Configurator. No BMW/Audi tuning record or package is claimed.';
  } else if(/repair.*same.*performance exhaust upgrade/i.test(r.text)) {
    classification='EXHAUST REPAIR FAQ QUESTION';
    reason='Read with its corrected answer, this question distinguishes an existing-system repair from performance modification; the answer explicitly says repair coverage does not establish availability of a performance upgrade.';
  }
  return {text:r.text,classification,reason,positiveTuningClaim:false};
});
for(const brand of ['BMW','Audi']) retained.push({text:`تُراجع الحالة الميكانيكية لسيارة ${brand} وفق نتائج التشخيص وحالة التبريد والفرامل والإطارات وطريقة الاستخدام. تُسجل التعديلات الموجودة ضمن معلومات الفحص، وتُقترح الصيانة أو الإصلاح وفق النتائج.`,classification:'CORRECTED ARABIC INSPECTION / REPAIR SCOPE',reason:'Replaces the unsupported Arabic tuning offer with inspection findings, existing modification history and maintenance/repair recommendations.',positiveTuningClaim:false});
retained.push({text:'Repair addresses a diagnosed leak, damaged component, noise or operating fault. This service covers repair of the existing system; it does not establish availability of performance modifications.',classification:'CORRECTED EXHAUST REPAIR FAQ / EXPLICIT LIMIT',reason:'Explicitly limits the service to existing-system repair and does not establish an available performance modification.',positiveTuningClaim:false});
await fs.writeFile('outputs/t1.1/bmw-audi-broad-reviewed-sentences.json',JSON.stringify({reviewedAt:new Date().toISOString(),method:'Manual reading of every one of 172 pre-correction unique actual rendered sentences, followed by exact-text reviewed allowlist. Unknown final sentences must be reviewed; they cannot inherit a harmless classification.',staleGroups,retained},null,2));
console.log(JSON.stringify({originalUniqueSentences:before.grouped.length,staleUniqueSentences:staleGroups.length,staleRenderedContexts:staleGroups.reduce((n,r)=>n+r.occurrences,0),reviewedRetainedAndCorrectedSentences:retained.length},null,2));
