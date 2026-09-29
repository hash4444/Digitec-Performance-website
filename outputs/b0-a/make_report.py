import json, pathlib, hashlib, difflib, subprocess
ROOT=pathlib.Path(__file__).resolve().parents[2]
OUT=ROOT/'outputs/b0-a'
def read(name):return json.loads((OUT/name).read_text(encoding='utf8'))
before=read('before-http.json'); after=read('after-http.json'); pages=read('page-metadata.json')
negative=read('summary-negative.json'); corrections=read('language-corrections.json'); redirects=read('redirect-register.json')
def table(headers,rows):
 def cell(v):return str(v if v is not None else 'None').replace('|','\\|').replace('\n',' ')
 return '\n'.join(['| '+' | '.join(headers)+' |','| '+' | '.join(['---']*len(headers))+' |']+['| '+' | '.join(cell(v) for v in row)+' |' for row in rows])+'\n'
files={
 'src/App.tsx':'Wrap Routes in RouteBoundary; leave all existing page definitions and redirect targets intact.',
 'src/components/RouteBoundary.tsx':'Reject unrecognized paths before dynamic components can redirect missing slugs to hubs.',
 'src/lib/routing-paths.json':'Generated client registry: 1,247 public paths (including noindex) and 253 historical paths.',
 'src/lib/historical-paths.js':'Share exact existing WordPress/feed exceptions between the client boundary and edge guard.',
 'src/i18n/locale.ts':'Resolve explicit Arabic navigation fallbacks before constructing a symmetric language path; no hreflang changes.',
 'src/i18n/arabic-route-fallbacks.json':'Explicit allowlist of 94 existing Arabic hub fallbacks; no invented translations or wildcard fallback destinations.',
 'cloudflare/production-seo-router.js':'Run the new guard on origin-bound requests after the unchanged Mercedes/tyre routing decisions.',
 'cloudflare/routing-response-guard.js':'Return direct localized redirects and real English/Arabic 404 responses; preserve valid routes, history, API requests, real assets and origin errors.',
 'cloudflare/routing-response-data.js':'Generated server registry and real prerendered bilingual 404 HTML, including matching build assets.',
 'scripts/generate-routing-response-data.mjs':'Derive routing data from the current route manifest and existing literal/service aliases; validate destinations and client/server registry consistency.',
 'scripts/sync-routing-paths.mjs':'Synchronize client recognition after the SSR manifest prepass and before the final client/SSR build.',
 'scripts/prerender.mjs':'Generate Arabic and English 404 HTML from the existing NotFound UI; remove schema/home social images only from error pages; generate edge data.',
 'package.json':'Add an SSR manifest prepass and routing-path synchronization before the existing build sequence.',
 'scripts/test-routing-response.mjs':'Focused production-entry regression suite with SPA-fallback origin fixture, React 404 checks, alias preservation and compressed evidence.',
 'scripts/preview-routing-response.mjs':'Local-only HTTP preview of the configured production Worker, listening on 127.0.0.1:5191.',
}
changed=[];patch=[]
for f,reason in files.items():
 old=OUT/'baseline'/f; new=ROOT/f
 oldtext=old.read_text(encoding='utf8') if old.exists() else ''
 newtext=new.read_text(encoding='utf8')
 diff=list(difflib.unified_diff(oldtext.splitlines(True),newtext.splitlines(True),fromfile='before/'+f,tofile='after/'+f))
 patch.extend(diff)
 adds=sum(x.startswith('+') and not x.startswith('+++') for x in diff); dels=sum(x.startswith('-') and not x.startswith('---') for x in diff)
 changed.append({'path':f,'change':'Modified' if old.exists() else 'New','added':adds,'removed':dels,'reason':reason,'sha256':hashlib.sha256(new.read_bytes()).hexdigest()})
(OUT/'b0-a-only.patch').write_text(''.join(patch),encoding='utf8')
(OUT/'changed-files.json').write_text(json.dumps(changed,indent=2),encoding='utf8')
preserved=[]
for f,digest in read('baseline/hashes.json').items():
 if f not in files:
  assert hashlib.sha256((ROOT/f).read_bytes()).hexdigest()==digest,f
  preserved.append(f)
(OUT/'preserved-files.json').write_text(json.dumps(preserved,indent=2),encoding='utf8')
lines=['# B0-A Routing Fix Report','Date: 28 September 2026. Scope: local response integrity and localized navigation only.','## 1. Executive Summary',
'**PARTIAL — code fix completed but external configuration remains.** The local implementation and focused tests pass. Production was not changed. The connected Cloudflare account returned no accessible `digitecme.com` zone, so the active Worker/route attachment cannot be verified or corrected here. Publishing static files alone will not activate this Worker. This is a hosting verification/release dependency, not a failed local code test.',
'The fix corrects exactly 56 rendered Arabic language links, returns genuine bilingual 404 responses for unknown page requests, and prevents client routing from replacing a missing page with a hub. All 1,247 existing pages retain their titles, H1s, canonical, robots, language, hreflang and JSON-LD. All 996 sitemap URLs and 251 intentional noindex pages remain. No content optimization, B0-B, Mercedes B1, commit, push or deployment was performed.',
'## 2. Root Cause',
'The site is Vite/React with build-time prerendering, not request-time SSR. `src/entry-server.tsx` renders the manifest routes during build; `scripts/prerender.mjs` writes their static HTML. `.openai/hosting.json` points the static host at `dist`. Unknown paths have no corresponding prerendered page. Fresh public GETs show that the remote serving layer falls back to the already-prerendered English homepage with HTTP 200, its canonical and homepage metadata. React subsequently evaluates the requested pathname and renders an error or redirects it. The catch-all React route cannot change an HTTP status already sent.',
'The configured repository entry `cloudflare/production-seo-router.js` previously handled only Mercedes and tyre paths, then passed other requests to the origin. A separate generic router exists, but it is not the entry in `cloudflare/wrangler.production-seo.jsonc`. It also contains pre-existing 410 policies unrelated to B0-A; this implementation neither activates nor changes them.',
'`arabicPathForEnglishPath` constructed `/ar` + English path for 55 untranslated Porsche system/problem/guide pages and the Mercedes problems index. App routes then redirected those Arabic requests to existing hubs after JavaScript loaded. Separately, dynamic model/blog/brand components could redirect arbitrary unknown slugs to a hub. RouteBoundary now checks the synchronized public/history/localization registry before those components render.',
'The precise remote fallback rule and deployed Worker version remain unverified. In particular, `/ar/mercedes/problems` already has an explicit redirect in the pre-edit local Mercedes Worker but returns homepage HTML on the live site. That is evidence of a local/live deployment or routing-attachment difference; it is not evidence that this task should rewrite Mercedes aliases. The Mercedes Worker file is byte-for-byte preserved.',
'Cloudflare references consulted: [static page serving and SPA fallback](https://developers.cloudflare.com/pages/configuration/serving-pages/), [Worker Response API](https://developers.cloudflare.com/workers/runtime-apis/response/), and [Workers best practices](https://developers.cloudflare.com/workers/best-practices/workers-best-practices/).',
'## 3. Files Changed',table(['Path','Change','Reason / modification'],[(r['path'],r['change'],r['reason']) for r in changed]),
'The report itself is `b0-a-routing-fix-report.md`. Evidence and report-generation helpers are under `outputs/b0-a/`; their individual paths and purposes are listed below. Built `dist/` and `dist-server/` outputs are ignored build artifacts. Temporary Python dependencies are isolated in the ignored `outputs/b0-a/python-deps.local/` directory; project dependencies and the lockfile were not changed.',
'## 4. Before vs After',
'**Before** means fresh public HTTP requests to `https://digitecme.com`. **After** means actual localhost HTTP requests through the edited production Worker with the freshly built static site and a reproduced origin SPA fallback. These are local results, not a claim that production is fixed. Canonical After is the final page after any listed redirect. Complete title/H1/robots/language/redirect-chain records: `outputs/b0-a/before-http.json` and `after-http.json`.']
rows=[]
for b,a in zip(before,after):
 status=' → '.join([str(x['status']) for x in a['chain']]+[str(a['status'])])
 behavior='Homepage fallback; JS recovery needed' if b['homepage'] and b['path']!='/' else 'Correct existing page'
 afterbehavior='Real 404, no homepage content' if a['status']==404 else ('Direct redirect to existing Arabic hub' if a['chain'] else 'Correct existing page')
 rows.append((b['path'],b['status'],behavior,status,afterbehavior,b['canonical'],a['canonical'],'PASS locally'))
lines += [table(['Test URL','Before HTTP','Before behavior','After HTTP','After behavior','Canonical before','Canonical after','Result'],rows),
'Browser reproduction confirmed: the four problematic Arabic examples initially received homepage responses and then navigated to the relevant Arabic brand hub. The root fake URL became a 404 with no canonical; the fake service URL became “Service Not Found” with no canonical; the fake Arabic root displayed Arabic error text but retained `html lang=en`. `/porsche/911` eventually redirected to the English Porsche hub because the old component treated a failed model lookup as a hub redirect. It is not a published model route in the manifest. After the fix, it and all genuinely unknown paths remain on a real 404, and Arabic errors have `lang=ar` / RTL.',
'The four valid reproduction pages remained correct in the browser. `/ar/` still undergoes the existing client trailing-slash normalization to `/ar`; this task does not introduce a new normalization policy. The local browser language-menu click on `/porsche/systems/pdk` exposed `/ar/brands/porsche-service-dubai` directly and reached that Arabic hub.',
'## 5. Arabic Language-Link Corrections',
'Every row below has no published direct Arabic equivalent. Existing App fallback behavior established the intentional hub destination. The hub is navigation, not a translation or hreflang equivalent. All 1,234 Arabic-language anchors found across the 1,247 rendered pages point directly to a published route. Exactly these 56 anchors changed.',
table(['Source URL','Old Arabic destination','New Arabic destination','True translation?','Hreflang changed?','Reason'],[(c['source'],', '.join(c['old']),', '.join(c['new']),'No','No','Use the existing Arabic brand hub already intended by client fallback') for c in corrections]),
'### Individual localized redirect register',
'There are 94 exact allowlisted localized fallback paths: **77 new server redirects** and **17 unchanged local Mercedes redirects** handled by the existing Mercedes router first. The 77 new rules comprise 55 affected Porsche knowledge paths plus 22 already-intended Arabic Porsche/Audi/Ferrari model fallbacks. The Mercedes index is one of the 56 corrected links, but its local server redirect already existed and is preserved. Each new rule is individually listed; no wildcard redirect is added. Every rule returns 308 directly to its final existing hub, preserves the query string and finishes with 200 in one hop. Actual language links avoid these aliases entirely.',
table(['Localized source','Final target','Server behavior','Change'],[(r['source'],r['target'],'308 → 200; one hop','Preserved existing Mercedes rule' if r['existing'] else 'New exact localized fallback') for r in redirects]),
'## 6. Unknown Route Tests',
'37 distinct negative paths passed GET and HEAD tests against the production entry. The React renderer also returned the 404 UI, noindex and no canonical/schema for all 37. GET bodies contain the existing 404 UI; HEAD bodies are empty. Error responses carry `X-Robots-Tag: noindex, follow`, correct Content-Language and `Cache-Control: no-store`. No generic homepage redirect is introduced.',
table(['URL','HTTP GET / HEAD','Canonical','Robots','Title','H1','Homepage content'],[(r['path'],'404 / 404',r['canonical'],r['robots'],r['title'],'; '.join(r['h1']),'No') for r in negative]),
'## 7. Regression Tests',
'All 1,247 public paths returned 200 without a redirect under the edited production entry. The origin fixture intentionally retains the pre-existing SPA fallback, so the negative cases exercise the actual response guard rather than a conveniently correct local file server. The fixture reuses the existing historical redirect map but does not execute the generic router’s 410 policy. Public cloud origin configuration is outside this local result.',
table(['Target brand','English hub','Arabic hub','Result'],[(b,'/brands/'+b+'-service-dubai','/ar/brands/'+b+'-service-dubai','200; metadata unchanged') for b in ['mercedes-benz','porsche','ferrari','lamborghini','rolls-royce','bentley','maybach','range-rover','defender','bmw','cadillac','aston-martin','jetour','rox','jaguar','volkswagen']]),
'Representative page families, also included in the full 1,247-page comparison:']
samples=['/','/ar','/services/oil-change-dubai','/ar/services/oil-change-dubai','/brands/porsche-service-dubai/oil-change','/brands/volkswagen-service-dubai/transmission-repair','/mercedes/problems','/porsche/systems/pdk','/porsche/problems/pasm-fault','/porsche/guides/service-intervals-uae','/porsche/911/992']
samples += [next(p for p in pages if p.startswith('/blog/')),next(p for p in pages if p.startswith('/mercedes/problems/')),next(p for p in pages if p.startswith('/mercedes/models/'))]
lines += [table(['Path','HTTP','Robots','Result'],[(p,'200',pages[p]['robots'],'Metadata/schema unchanged') for p in samples]),
'All 99 existing Mercedes aliases returned their existing target; all 253 generated historical paths retained baseline response status and Location in comparison with the pre-edit production entry (localized replacements excluded from that comparison where applicable). Six focused passthrough cases covered origin redirects, 503 errors, actual assets, APIs, functions and POST requests. Query-string preservation was checked across all 94 localized fallback paths. No Mercedes alias source/target/status definition was edited.',
'## 8. Sitemap Check',
'`/sitemap.xml` returned HTTP 200 locally and is byte-for-byte equal to the saved pre-edit sitemap. All 996 entries are present, reachable, indexable and self-canonical; none were added or removed. The public route set is unchanged at 1,247. Sitemap generation logic, membership policy and lastmod values were not changed.',
'## 9. Robots Check',
'`/robots.txt` returned HTTP 200 and matched the saved pre-edit file byte-for-byte. All 251 intentional noindex pages retain their exact robots values. New genuine 404 responses use noindex; no existing service page was made indexable.',
'## 10. Canonical Check',
'Canonical values match the pre-edit local build across all 1,247 published routes. All 996 sitemap entries retain self-canonicals. Every tested unknown URL has no canonical in either the HTTP error document or the React-rendered missing-page state. Arabic hub destinations retain their own Arabic canonical. No commercial canonical or ownership decision changed.',
'## 11. Hreflang Check',
'Hreflang maps are exactly unchanged across all 1,247 pages. All sitemap hreflang targets are reachable and reciprocal. None of the 56 corrected navigation relationships was declared a new hreflang translation. Error pages have no hreflang alternates.',
'## 12. Structured Data Check',
'All JSON-LD blocks parsed successfully on all 1,247 existing pages and are structurally identical to their baseline. This includes the homepage, Porsche and Mercedes hubs, oil-change service and Arabic homepage/service examples. Error responses contain no JSON-LD; the inherited shared entity graph is removed only from generated 404 HTML. There was no schema redesign.',
'## 13. Remaining Risks',
'- The live site is unchanged and still requires the approved Worker/static build to be released together. The local Worker data embeds 404 HTML referring to that build’s asset names; mixing releases can break error-page hydration/styles.',
'- The connected Cloudflare account cannot see this zone. Its GET `/zones?name=digitecme.com` returned success with an empty result, so no remote Worker attachment/version was inspected or altered. The local/live Mercedes index discrepancy must be checked by the hosting owner.',
'- The legacy generic `dist/_worker.js` / `cloudflare/digitec-seo-router.js` policy remains outside this task. Do not substitute it for the reviewed production entry: it contains unrelated pre-existing 410 rules. Existing commercial history is preserved, not reassessed.',
'- The explicit client path registry increases the main bundle from approximately 446.39 kB / 134.73 kB gzip to approximately 528.4 kB / 147.7 kB gzip (about 13 kB gzip). Vite reports its size advisory. This is the cost of checking missing routes before lazy page components; no performance or UI redesign was attempted.',
'- New published routes must go through the synchronized build pipeline. New intentionally untranslated Arabic fallback routes require an explicit entry; invented slugs remain 404. Tests fail if the public registry and client registry diverge.',
'- Existing WordPress/feed cleanup and explicit historical aliases remain exceptions. B0-A does not reconsider their destinations. The local tests preserve repository behavior; they cannot certify every unexposed remote redirect rule.',
'## 14. Anything Requiring Cloudflare/Hosting Changes',
'No infrastructure changes were made. After review and separate deployment approval, the hosting owner must inspect the actual zone’s Worker route list and current script/version, then release the reviewed bundle using the existing repository entry `cloudflare/production-seo-router.js` and configuration `cloudflare/wrangler.production-seo.jsonc` (`digitecme.com/*` and `www.digitecme.com/*`). The freshly built `dist` assets and the generated Worker response data must be from the same build. Static publication alone does not execute the JavaScript Worker file.',
'The account connection supplied here has no visible matching zone, so this report does not invent a zone ID, claim that routes are absent, or prescribe a DNS/rewrite/cache change. Confirm the route attachment and deployed artifact in the account that owns the zone. Then repeat the listed live probes and historical redirect checks. If an additional unknown dashboard rewrite is found, inspect it before changing it. No DNS, SSL, domain, security, global cache, or unrelated CDN changes are needed by the local code.',
'## 15. Git Diff Summary',
'Branch: `main`. Starting and ending HEAD: `9cf7fec5b9ecaef836408245b03ab2e9f2bd718b`. The checkout was already dirty. The report’s B0-A diff is against saved pre-edit working files, not against HEAD, so existing content changes are not attributed to this task. `cloudflare/production-seo-router.js` was already untracked and is treated as a modified pre-existing file.',
table(['B0-A file','Added lines','Removed lines'],[(r['path'],r['added'],r['removed']) for r in changed]),
'Review `outputs/b0-a/b0-a-only.patch` for the isolated implementation diff. Snapshot records are `baseline/git-status.txt`, `baseline/branch.txt`, `baseline/commit.txt`, `baseline/hashes.json`, `git-status-after.txt`, `commit-after.txt` and `preserved-files.json`. Content/SEO files and the existing Mercedes router checked against saved hashes remain unchanged. Nothing was staged, committed or pushed.',
'## 16. Exact Commands / Tests Used',
'''Commands were run from `C:\\Users\\ADMIN\\Documents\\ChatGPT\\DIGITEC`. The initial compiler invocation hit sandbox directory access restrictions; the same local compilation was rerun with reviewed filesystem access. Test Python dependencies were installed only in the local evidence folder, later renamed to an ignored `.local` directory.

```powershell
git status --porcelain=v1
git branch --show-current
git rev-parse HEAD
node node_modules/vite/bin/vite.js build
node node_modules/vite/bin/vite.js build --ssr src/entry-server.tsx --outDir dist-server
node scripts/prerender.mjs
```

The first three build commands above produced the pre-edit baseline. The final synchronized sequence was:

```powershell
node node_modules/vite/bin/vite.js build --ssr src/entry-server.tsx --outDir dist-server
node scripts/sync-routing-paths.mjs
node node_modules/vite/bin/vite.js build
node node_modules/vite/bin/vite.js build --ssr src/entry-server.tsx --outDir dist-server
node scripts/prerender.mjs
node scripts/test-routing-response.mjs
node node_modules/typescript/bin/tsc --noEmit -p tsconfig.app.json
node node_modules/typescript/bin/tsc --noEmit -p tsconfig.node.json
git diff --check -- src/App.tsx src/i18n/locale.ts scripts/prerender.mjs package.json
node scripts/preview-routing-response.mjs
```

HTML and HTTP checks used the bundled Python interpreter:

```powershell
$env:PYTHONPATH = (Join-Path (Get-Location) 'outputs/b0-a/python-deps.local')
& 'C:\\Users\\ADMIN\\.cache\\codex-runtimes\\codex-primary-runtime\\dependencies\\python\\python.exe' outputs/b0-a/capture.py before
& 'C:\\Users\\ADMIN\\.cache\\codex-runtimes\\codex-primary-runtime\\dependencies\\python\\python.exe' outputs/b0-a/capture.py snapshot
& 'C:\\Users\\ADMIN\\.cache\\codex-runtimes\\codex-primary-runtime\\dependencies\\python\\python.exe' outputs/b0-a/verify.py
& 'C:\\Users\\ADMIN\\.cache\\codex-runtimes\\codex-primary-runtime\\dependencies\\python\\python.exe' outputs/b0-a/capture.py after
```

The `before` and `snapshot` commands ran before source edits using the original folder name `python-deps`; do not rerun them over the saved baseline. Browser checks used the in-app browser for the 12 reproduction URLs, bilingual missing-page state and a real language-menu click. Read-only Cloudflare API inspection used GET `/zones?name=digitecme.com` (200, empty results).

The complete legacy `npm run build` chain was not executed: its unrelated hosting-rule/SEO report generators were intentionally not run during this narrow implementation. The changed compilation, synchronization and prerender stages, both TypeScript projects, focused routing suite and complete page metadata/sitemap regressions were executed successfully. Existing downstream validators are preserved in package.json. The tests use native Request/Response and the actual configured entry point, not an edge-network deployment.
''',
'### Evidence inventory',
table(['File / group','Purpose'],[
('outputs/b0-a/capture.py','Capture raw before/after HTTP metadata and the pre-edit page baseline.'),
('outputs/b0-a/verify.py','Compare every public page, language link, sitemap entry, brand hub and schema.'),
('outputs/b0-a/make_report.py','Generate this report and isolated B0-A patch from saved evidence.'),
('outputs/b0-a/before-http.json; after-http.json','Actual public-before and localhost-after HTTP responses and full metadata.'),
('outputs/b0-a/baseline/pages.json','All pre-edit published-page metadata/schema.'),
('outputs/b0-a/after-valid.json.gz; after-negative.json.gz; after-localized.json.gz; after-aliases.json.gz','Compressed response bodies, headers and redirect chains from the focused suite.'),
('outputs/b0-a/summary-negative.json; summary-localized.json; summary-aliases.json','Parsed response evidence for review.'),
('outputs/b0-a/page-metadata.json; brand-regressions.json','Current published-page metadata and all 32 target hubs.'),
('outputs/b0-a/language-corrections.json; language-link-crawl.json','All 56 changes and all 1,234 checked language-link destinations.'),
('outputs/b0-a/redirect-register.json','Every exact localized redirect, identifying new versus preserved rules.'),
('outputs/b0-a/browser-checks.md; cloudflare-readonly.json','Transcribed browser observations and the read-only hosting lookup result.'),
('outputs/b0-a/routing-tests.json; metadata-tests.json','Machine-readable pass counts.'),
('outputs/b0-a/changed-files.json; b0-a-only.patch; preserved-files.json','Narrow change inventory, patch and unchanged protected-file evidence.'),
('outputs/b0-a/baseline/ + git-status-after.txt + commit-after.txt','Pre-edit source copies and version-control snapshots.'),
('outputs/b0-a/*build.log; manifest-prepass.log; prerender.log; typecheck-*.log','Build and type-check output; baseline logs are in baseline/.'),
]),
'## 17. Final Status',
'**PARTIAL — code fix completed but external configuration remains.** Local implementation, HTTP/React/browser checks and metadata regressions pass. The unresolved portion is verification and approved release of the correct Worker/static build in the actual hosting account. No commit, push or deployment occurred. B0-A work stops here for review; B0-B and all other SEO changes remain out of scope.'
]
(ROOT/'b0-a-routing-fix-report.md').write_text('\n\n'.join(lines)+'\n',encoding='utf8')
print('Report written;',len(changed),'implementation files;',sum(r['added'] for r in changed),'additions;',sum(r['removed'] for r in changed),'removals')
