from pathlib import Path
from datetime import datetime, timezone
import csv,json,subprocess,shutil

ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'outputs/mercedes-release-2026-09-08'
PLAN=json.loads((Path(__file__).parent/'plan.json').read_text(encoding='utf-8'))
QA=json.loads((OUT/'generated-html-verification.json').read_text(encoding='utf-8'))
LIVE=json.loads((OUT/'production-final.json').read_text(encoding='utf-8')) if (OUT/'production-final.json').exists() else None
BASE={r['path']:r for r in PLAN['live']}
AFTER={r['path']:r for r in QA['records']}
BUILD=json.loads((ROOT/'release-qa.local/build-results.json').read_text())

changes={
 'HUB':'Kept the broad hub title/H1 and URL. Added bilingual minor/major and A/B scope comparison, exclusions, quote inputs and appointment information. The top maintenance card now reaches the comparison on this hub; AC has its own correctly targeted card. Fixed anchor scrolling and Arabic booking controls.',
 'ENGINE':'Replaced generic mechanical copy with engine-first leaks, overheating, misfires, mounts, testing, repair/replacement assessment, quote components and post-work checks. Added the existing workshop engine photo with a limited factual caption and a direct gearbox link.',
 'SUSP':'Added coil-versus-air identification, measured height/leak investigation, compressor/valve-block/sensor checks, estimate inclusions and verification. Retained the separate symptom guides.',
 'TRANS':'Separated scheduled fluid work from diagnosis, control/valve-body work, internal repair and replacement. Added exact gearbox identification, 7G/9G/AMG qualifications, quote components and post-work checks.',
 'OIL':'Added VIN-based approval/quantity/filter selection, itemized scope, reset and record checks, due-item exclusions and links back to A/B booking on the hub.',
 'AC':'Added uneven/weak cooling and airflow assessment, vehicle refrigerant identification, leak/recharge distinction, compressor/evaporator access scope and measured post-work checks.',
 'BATTERY':'Separated main, auxiliary, 48V and charging/drain concerns. Added specification selection, conditional adaptation and installation checks; identified the Al Quoz appointment location.',
 'BRAKES':'Added measured pad/disc condition, sensors and hydraulic/fluid checks, AMG package identification, estimate inclusions and post-repair verification.',
 'DIAG':'Added distinct diagnostic scanning, supported coding and programming sections, VIN/module/access eligibility, reports and post-work checks. Linked hardware faults to electrical repair and performance requests to tuning.',
 'ELEC':'Separated supply/grounds/wiring/network and SAM investigation from coding. Explained conditional ECU repair/replacement and compatibility, with links to diagnostics and battery/no-start guides.',
 'BODY':'Added panel/dent/bumper/paint inspection, hidden-damage and access scope, estimate exclusions and specialist-performer confirmation. Linked shared body repair, PPF and the separately identified G63 conversion project.',
 'STEER':'Added electric/hydraulic/rack identification, testing before replacement, parts scope and conditional alignment/calibration checks. Linked suspension assessment.',
 'EXHAUST':'Added leak/mount/noise/sensor diagnosis, compatible repair options and verification. Kept performance hardware enquiries on the tuning page.',
 'G63':'Preserved the existing generation-specific content and documented conversion link. Added contextual engine, suspension, gearbox and other system links; scheduled maintenance now leads to the hub.',
 'GCLASS':'Preserved the substantial petrol/diesel/4x4 and coil-spring content. Added direct G63 sibling navigation, system service links and the correct scheduled-maintenance destination.',
 'C63':'Preserved W204/W205/W206 and hybrid distinctions. Qualified coupe/cabriolet coverage by generation and added contextual system links and hub maintenance booking.',
 'CCLASS':'Corrected W205 optional AIRMATIC to cover both axles. Added qualified C200/C300 and C205/A205 family coverage. Added system links and corrected maintenance booking.',
 'E63':'Preserved the detailed W212/W213, AMG transmission and driveline content. Added system-level links and corrected scheduled-maintenance booking; no unsupported model rewrite.',
 'ECLASS':'Added generation-qualified E300/E350 and C207/A207/C238/A238 coupe/cabriolet coverage, avoiding a W214 coupe claim. Added engine and other system links and corrected maintenance booking.',
 'SCLASS':'Added qualified C217/A217 and S65 V12 enquiries, direct Maybach/S63 navigation and contextual engine/gearbox/system links.',
 'S63':'Added C217/A217 coupe/cabriolet identification, separated S65 V12 enquiries and linked S-Class/Maybach and relevant system services.',
 'GLE':'Qualified M-Class/ML63/GLE63 and SUV/Coupe equipment. Removed the assumption that every AMG uses conventional 9G-TRONIC. Added engine/system links and hub maintenance booking.',
 'GLS':'Qualified conventional versus AMG transmission scope and linked Maybach-specific enquiries. Added engine/system links and corrected scheduled-maintenance booking.',
 'TUNE':'Preserved the title, H1 and configurator. Added Mercedes-AMG assessment, stage definitions, hardware/fuel dependencies, coding distinction and all four planned project/guide links. Rendered the existing EN/AR FAQs so FAQ schema matches visible content.',
 'MAYBACH':'Preserved the dedicated hub and its existing service/repair title/H1. Added S-Class and Mercedes-hub navigation with VIN/Maybach equipment qualifications. No expansion based on the small query sample.',
 'COST':'Applied the cost-specific title/H1. Replaced universal A/B inclusions, annual outer-limit, blanket programming and resale guarantees with vehicle-specific scope, itemized costs, tax, exclusions and recordkeeping. Kept the original publication date and added an update date.',
 'INTERVAL':'Applied the ASSYST title/H1. Removed fixed Dubai-wide oil/brake-fluid/coolant/transmission intervals and the European-only schedule claim. Added VIN/history/display selection and conditional A3/A9/AH interpretation. Kept the original publication date and added an update date.',
 'OWNERSHIP':'Added a Gulf ownership/reliability answer based on condition, history and fitted equipment, plus the pre-purchase guide link. Replaced blanket shortened-interval language and removed Mercedes customer-facing editorial/image-production instructions.',
 'PPF':'Already satisfied: retained the shared PPF page, existing title/H1, conditional packages and Mercedes-hub links. Added an inbound link from Mercedes body repair; no thin Mercedes-only PPF page.',
 'AR':'Applied natural Arabic Mercedes name/title/H1, supported workshop/process/quote FAQs and bilingual maintenance comparison. Corrected Arabic OG fallback, readable phone ordering and mobile booking labels. Verified reciprocal hub language links and RTL layout.',
 'AUDIO':'No page created. Existing audio fault-repair wording does not establish upgrade capability. All three assigned audio-upgrade queries remain in the coverage register pending service confirmation.',
}
evidence={
 'HUB':'New repair case histories need original records and customer publication permission.',
 'ENGINE':'Existing engine photo reused; no documented diagnostic findings, repair scope and outcome record was supplied.',
 'SUSP':'A real before/after ride-height record is still needed.',
 'TRANS':'A documented repair and post-repair check record is still needed.',
 'OIL':'Genuine oil-service photographs were not supplied; no fabricated photo or priced example added.',
 'AC':'A real diagnostic case with measured output results is still needed.',
 'BRAKES':'A real inspection/measurement record is still needed.',
 'DIAG':'Verified supported coding/programming job examples are still needed; eligibility remains conditional.',
 'ELEC':'A real electrical diagnostic case is still needed.',
 'BODY':'A genuine body-repair before/after record is still needed; the conversion is not presented as an accident repair.',
 'STEER':'Model-specific repair evidence can be added when an actual job record is supplied.',
 'EXHAUST':'A real inspected repair record is still needed.',
 'COST':'Workshop-approved dated prices, VAT treatment and vehicle assumptions were not supplied; no price claims added.',
 'PPF':'No original Mercedes film-job record/package details were found; a Mercedes case remains conditional.',
 'AR':'The hub copy was reviewed in source and browser; no independent native-language business sign-off was supplied. Four old Arabic model templates are noindex and no longer advertised as equivalent translations.',
 'AUDIO':'Confirm the offered upgrade service, supported configurations, fitting scope and actual examples before creating this page.',
}
model_ids={'G63','GCLASS','C63','CCLASS','E63','ECLASS','SCLASS','S63','GLE','GLS'}
for key in model_ids:evidence[key]=('Existing G63 conversion retained, but no new model repair case was supplied.' if key=='G63' else 'No documented model repair case was supplied.')+' Current query-to-page/indexing data was not available; recommended assignments are not observed ranking URLs.'
service_ids={'ENGINE','SUSP','TRANS','OIL','AC','BATTERY','BRAKES','DIAG','ELEC','BODY','STEER','EXHAUST'}
def files_for(key):
    if key in service_ids:return ['src/data/mercedesServiceContent.ts','src/data/brandServices.ts','src/pages/BrandServicePage.tsx']
    if key in model_ids:return ['src/data/mercedesModelPages.ts','src/pages/MercedesModelPage.tsx','src/i18n/mercedes-language.ts']
    return {
      'HUB':['src/pages/BrandPage.tsx','src/components/MercedesMaintenanceScope.tsx'],
      'AR':['src/i18n/ar-brands.ts','src/pages/BrandPage.tsx','src/components/MercedesMaintenanceScope.tsx'],
      'TUNE':['src/pages/Tuning.tsx','src/data/aiGuidePosts.ts'], 'MAYBACH':['src/pages/BrandPage.tsx'],
      'COST':['src/data/aiGuidePosts.ts','src/data/blogPosts.ts','src/pages/BlogPost.tsx'],
      'INTERVAL':['src/data/blogPosts.ts','src/pages/BlogPost.tsx'],
      'OWNERSHIP':['src/data/brandWorkshopArticles.ts','src/pages/BrandWorkshopArticlePage.tsx'],
      'PPF':['src/pages/BrandServicePage.tsx (inbound link only)'],'AUDIO':[],
    }[key]
rows=[]
for p in PLAN['pages']:
    qs=[q for q in PLAN['queries'] if q['id']==p['id']]
    before=BASE.get(p['path'],{});after=AFTER.get(p['path'],{})
    live=next((r for r in (LIVE or {}).get('canonicalPages',[]) if r['path']==p['path']),None)
    rows.append({'briefId':p['id'],'url':p['url'],'queryCount':len(qs),'targetQueryGroups':'; '.join(sorted({q['cluster'] for q in qs})),
      'status':'Blocked' if p['id']=='AUDIO' else 'Already satisfied' if p['id']=='PPF' else 'Changed in prepared release',
      'beforeTitle':before.get('title',p.get('currentTitle','')),'afterTitle':after.get('title','Not created'),
      'beforeH1':'; '.join(before.get('h1',[])),'afterH1':after.get('h1','Not created'),
      'beforeDescription':before.get('description',''),'afterDescription':after.get('description',''),
      'specificChanges':changes[p['id']], 'filesChanged':'; '.join(files_for(p['id'])),
      'validation':'Passed generated HTML, canonical/indexing, sitemap, unique metadata, internal links/assets and schema checks' if after else 'Verified absent; conditional query assignments retained',
      'production':'Publication blocked by app write permissions; '+('current page matches the prepared checks' if live and live.get('matchesRelease') else 'updated release not verified live'),
      'remainingEvidence':evidence.get(p['id'],'No additional business-evidence dependency identified.')})
assert len(rows)==31 and sum(r['queryCount'] for r in rows)==353
with (OUT/'page-change-register.csv').open('w',encoding='utf-8-sig',newline='') as f:
    w=csv.DictWriter(f,fieldnames=list(rows[0]));w.writeheader();w.writerows(rows)
(OUT/'page-change-register.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2),encoding='utf-8')
git='C:/Users/ADMIN/.cache/codex-runtimes/codex-primary-runtime/dependencies/native/git/cmd/git.exe'
commit=subprocess.check_output([git,'rev-parse','HEAD']).decode().strip()
changed=subprocess.check_output([git,'diff','--name-only','704245d7ebfb561c9ad29d6001fa76c6d8564c11','HEAD']).decode().splitlines()
shutil.copyfile(ROOT/'release-qa.local/build-results.json',OUT/'build-results.json')
summary=(LIVE or {}).get('summary',{})
lines=[
 '# Mercedes SEO implementation report — 8 September 2026',
 '', '**Prepared and tested locally; production publication is blocked. No ranking improvement is claimed.**',
 '', 'The release accounts for all **353 queries and 31 briefs**: 29 briefs changed in the prepared release, the shared PPF brief retained as already satisfied, and the audio-upgrade page blocked by unconfirmed service capability. Original Search Console query, click, impression, CTR and position values match the original workbook exactly.',
 '', '## Publication status and exact remaining actions',
 '', '- GitHub repository reads succeeded, but creating the source tree returned HTTP 403: “Resource not accessible by integration.” No GitHub source update succeeded.',
 '- The matching Lovable project is `b8255283-fdd9-4c2d-8b46-ccb596f695e1` (`dubai-performance-art`). File import was rejected because the connection lacks `projects:write`. No Lovable content update or deployment was submitted.',
 '- Re-authorize Lovable with `projects:write` (the connector reports that it must be removed and added again; reconnecting retains old scopes), import the exact reviewed patch, verify file hashes/build, and publish the existing project. Alternatively, provide an authorized GitHub source-write connection and use its normal sync route.',
 '- Cloudflare is logged out in the available browser. Sign in to the account managing `digitecme.com`, then activate the prepared **Mercedes-only** Worker or exact Bulk Redirect rule. This is separate from content publication.',
 '- Public `_redirects` and `_worker.js` are served as assets by Lovable and do not themselves execute. Do not activate the older global Worker as part of this scoped release.',
 '', f'Latest public check: `{(LIVE or {}).get("checkedAt","not yet recorded")}`. Permanent redirect tests passing: **{summary.get("permanentRedirectsPassing","pending")}/{summary.get("redirectsChecked",16)}**. See [production-final.json](production-final.json) for each GET/HEAD result, Location, title and canonical. Unchanged pages matching existing checks are not evidence of release publication.',
 '', '## Prepared release and validation',
 '', f'- Branch: `codex/mercedes-seo-2026-09-08`; local commit: `{commit}`.',
 f'- Full production pipeline: **{len(BUILD["steps"])} steps passed**; 1,438 rendered routes and 1,154 sitemap URLs. Source fingerprint: `{BUILD["sourceSha256"]}`.',
 '- Routing: **792 alias cases**, 67 canonical slash variants, direct destinations, preserved repeated UTMs/click IDs, GET/HEAD, concrete Arabic fallbacks, and unrelated/mutation passthrough passed.',
 '- TypeScript and whitespace/diff checks passed. The existing SEO, PPF, paint-correction and protection-release checks passed without being disabled.',
 '- The language check now requires an indexable counterpart: a retained noindex template does not count as a translated page. Four old Arabic model templates are noindex, excluded from the sitemap and omitted from alternate-language declarations.',
 f'- Focused generated-HTML review: **{QA["pagesChecked"]} pages** checked, including every existing brief target and supporting Arabic/tuning changes. Titles/descriptions are unique among these pages; every page has one H1, correct canonical/indexing, valid internal links/assets and parseable schema.',
 '- FAQ questions were checked in initial HTML. Service FAQs use the same data as their schema; representative browser expansion confirmed the visible answer. Tuning FAQs are now visibly rendered in both languages.',
 '- Browser checks covered desktop 1440×1000 and mobile 390×844: hub, oil/diagnostics service and C-Class model layouts; no horizontal overflow; hub-to-service and maintenance-anchor navigation; FAQ expansion; Arabic RTL and reciprocal hub links; phone/WhatsApp targets. No test enquiry or call was sent.',
 '- A built-preview alias check confirmed that UTMs, gclid, msclkid and fbclid survive browser fallback. The homepage-fallback hydration mismatch discovered during that check was corrected separately in `src/main.tsx` and rechecked.',
 '', '## Files to review',
 '', '- [Page change register — every brief](page-change-register.csv)',
 '- [All 353 query assignments with original measurements](query-coverage.csv)',
 '- [Generated HTML verification](generated-html-verification.json)',
 '- [Production checks](production-final.json)',
 '- [Build results](build-results.json)',
 '- [Exact reviewed source patch](Mercedes-reviewed-release.patch)',
 '- [Expected source file hashes](source-file-hashes.json)',
 '- [Browser verification record](browser-verification.json)',
 '- [Publication attempt record](publication-attempts.json)',
 '- [Every prepared Mercedes alias and permanent destination](../../docs/seo/mercedes-permanent-redirects.csv)',
 '- [Production deployment instructions](../../docs/seo/mercedes-release-deployment.md)',
 '', 'The original plan workbook remains unchanged. Its page assignments are recommendations, not evidence of the page currently ranked by Google. Fresh joint query/page and indexing data is still required for that conclusion.',
 '', '## All 31 briefs',
 '', '| Brief | Target URL | Queries | Disposition |', '|---|---|---:|---|',
]
for r in rows:lines.append(f'| {r["briefId"]} | {r["url"]} | {r["queryCount"]} | {r["status"]} |')
for r in rows:
    lines += ['',f'### {r["briefId"]} — {r["url"]}', '',f'**Query groups:** {r["targetQueryGroups"] or "Supporting page"}. **Disposition:** {r["status"]}.', '',r['specificChanges'], '',f'- Title before: {r["beforeTitle"] or "No page"}',f'- Title after: {r["afterTitle"]}',f'- H1 before: {r["beforeH1"] or "Not recorded"}',f'- H1 after: {r["afterH1"]}',f'- Files: {r["filesChanged"] or "None; proposed page withheld"}',f'- Validation: {r["validation"]}',f'- Remaining evidence: {r["remainingEvidence"]}']
lines += ['', '## Additional affected URLs', '']
for r in QA['records']:
    if 'briefId' not in r:lines.append(f'- `https://digitecme.com{r["path"]}` — {r["robots"]}; {r["title"]}. '+('Generic Arabic model template removed from indexing/alternate claims; the browser language link points explicitly to the Arabic hub.' if r['robots'].startswith('noindex') else 'Supporting FAQ, ownership or tuning claim corrections described above.'))
lines += ['', '## Files changed in the prepared source release', '']
lines += ['- `'+f+'`' for f in changed]
lines += ['', '## Evidence still needed', '', 'Real diagnostic/repair records, before/after measurements and approved publication permission are required before adding the proposed repair cases. Existing workshop/project photographs are reused only for what they document. Prices, upgrade capability, guaranteed outcomes and new qualifications were not invented. These evidence gaps affect those claims or case studies; they did not prevent the remaining implementation.', '', '## Primary technical references', '', '- [Mercedes C-Class generations, body styles and optional W205 AIRMATIC](https://media.mercedes-benz.com/article/ced8c5a0-ceee-4901-97d2-e5b1ed70fd7f)', '- [Mercedes E-Class coupe/cabriolet history](https://media.mercedes-benz.fr/nouvelles-mercedes-benz-classe-e-coupe-et-cabriolet/)', '- [Mercedes S-Class S63/S65 coupe and cabriolet](https://media.mercedes-benz.pt/os-novos-classe-s-coupe-e-classe-s-cabriolet/)', '- [Lovable custom-domain hosting](https://docs.lovable.dev/features/custom-domain)', '- [Cloudflare Bulk Redirect parameters](https://developers.cloudflare.com/rules/url-forwarding/bulk-redirects/reference/parameters/)', '']
(OUT/'Completion-report.md').write_text('\n'.join(lines),encoding='utf-8')
print(json.dumps({'briefs':len(rows),'queries':sum(r['queryCount'] for r in rows),'sourceCommit':commit,'report':str(OUT/'Completion-report.md')}))
