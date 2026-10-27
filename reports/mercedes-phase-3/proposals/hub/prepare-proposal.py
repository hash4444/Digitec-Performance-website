from pathlib import Path
from datetime import datetime,timezone
import hashlib,json,difflib

root=Path(__file__).resolve().parents[4]
out=Path(__file__).resolve().parent
path=root/'src/pages/BrandPage.tsx'
raw=path.read_bytes()
source=raw.decode('utf-8')
old_caption='<p className="text-gray-400 text-sm leading-relaxed mt-2">A real Mercedes-AMG engine in the Digi-Tec workshop. Diagnostics, fluid specifications and repair planning are matched to the fitted powertrain—not just the badge.</p>'
new_caption='<p className="text-gray-400 text-sm leading-relaxed mt-2">A real Mercedes-AMG engine in the Digi-Tec workshop. <Link to="/services/mercedes-diagnostics-dubai" className="text-burnt-orange hover:underline">Diagnostics</Link>, fluid specifications and <Link to="/services/mercedes-mechanical-repair-dubai" className="text-burnt-orange hover:underline">repair planning</Link> are matched to the fitted powertrain—not just the badge.</p>'
old_visit='<p className="text-gray-400 text-sm mt-2">Dubai, with a direct Google Maps route from this page.</p>'
new_visit='<p className="text-gray-400 text-sm mt-2">Dubai, with a direct Google Maps route from this page. <a href="tel:+97143402223" data-cta-placement="workshop_proof" className="text-burnt-orange hover:underline">Call +971 4 340 2223</a> to confirm arrival details.</p>'
assert source.count(old_caption)==source.count(old_visit)==1
proposed=source.replace(old_caption,new_caption).replace(old_visit,new_visit)
assert source.count('isMercedesServiceHub && !isArabic')==proposed.count('isMercedesServiceHub && !isArabic')
(out/'before').mkdir(exist_ok=True)
(out/'proposed').mkdir(exist_ok=True)
(out/'before/BrandPage.tsx').write_bytes(raw)
(out/'proposed/BrandPage.tsx').write_bytes(proposed.encode('utf-8'))
patch='diff --git a/src/pages/BrandPage.tsx b/src/pages/BrandPage.tsx\n'+''.join(difflib.unified_diff(source.splitlines(keepends=True),proposed.splitlines(keepends=True),fromfile='a/src/pages/BrandPage.tsx',tofile='b/src/pages/BrandPage.tsx'))
(out/'mercedes-hub-minimal.patch').write_bytes(patch.encode('utf-8'))
paths=['src/pages/BrandPage.tsx','src/components/MercedesMaintenanceScope.tsx','src/components/MercedesServiceBookingForm.tsx','src/data/mercedesServiceCampaign.ts','src/data/mercedesCaseStudies.ts','src/components/Footer.tsx','src/components/Analytics.tsx','src/lib/whatsapp-tracking.ts','src/lib/contact-attribution.ts','index.html']
hashes=[{'path':p,'sha256':hashlib.sha256((root/p).read_bytes()).hexdigest()} for p in paths]
result={'capturedAtUtc':datetime.now(timezone.utc).isoformat(),'proposalOnly':True,'sourceFilesChanged':0,'applicationSourceSha256':hashlib.sha256(raw).hexdigest(),'proposedCopySha256':hashlib.sha256(proposed.encode('utf-8')).hexdigest(),'sources':hashes,'changeCount':2,'changedOriginalLines':[source[:source.index(old_caption)].count('\n')+1,source[:source.index(old_visit)].count('\n')+1],'preserved':{'captionPlainText':True,'quotationCopy':True,'url':'https://digitecme.com/brands/mercedes-benz-service-dubai','title':'Mercedes Service Dubai | Maintenance & Repair | DIGI-TEC','h1':'Mercedes-Benz Service in Dubai','canonical':'https://digitecme.com/brands/mercedes-benz-service-dubai','schemaCodeUntouched':True,'arabicBranchesUntouched':True,'commercialRepairCopyUntouched':True},'publishedContactSource':'src/components/Footer.tsx:83-84; src/data/mercedesServiceCampaign.ts:13; index.html:92-99','independentWorkshopFactConfirmation':'Not obtained; no warehouse range/hours/new capability claim is added.','futureImplementationRequiresApproval':True}
(out/'source-evidence.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')
assert path.read_bytes()==raw
print(json.dumps({k:result[k] for k in ['capturedAtUtc','proposalOnly','sourceFilesChanged','applicationSourceSha256','changeCount','changedOriginalLines']},indent=2))
