import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync, spawnSync } from 'node:child_process';
const root=process.cwd();
const git=(args)=>execFileSync('git',args,{cwd:root,maxBuffer:8*1024*1024});
const norm=b=>b.toString('utf8').replace(/\r\n/g,'\n');
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const changes=JSON.parse(await fs.readFile('reports/mercedes-phase-4b/options/B/source-changes.json','utf8'));
const summary='docs/seo/mercedes-release-preparation-2026-10-26.md';
const names=git(['diff','--cached','--name-only','-z']).toString().split('\0').filter(Boolean);
const expected=[...changes.map(r=>r.file),summary].sort();
const files=[];
for(const c of changes){
 const staged=git(['show',`:${c.file}`]);
 const reviewed=await fs.readFile(path.join('reports/mercedes-phase-4b/production-matched.local/release-b.local',c.file));
 const reviewedBefore=await fs.readFile(path.join('reports/mercedes-phase-4b/production-matched.local/baseline.local',c.file));
 const before=git(['show',`HEAD:${c.file}`]);
 files.push({file:c.file,stagedSha256:sha(staged),stagedNormalizedSha256:sha(norm(staged)),reviewedRecordedAfterSha256:c.afterSha256,reviewedRawSha256:sha(reviewed),reviewedMatchesRecordedRaw:sha(reviewed)===c.afterSha256,reviewedNormalizedSha256:sha(norm(reviewed)),matchesReviewedNormalized:norm(staged)===norm(reviewed),beforeNormalizedSha256:sha(norm(before)),reviewedRecordedBeforeSha256:c.beforeSha256,reviewedBeforeRawSha256:sha(reviewedBefore),beforeMatchesRecordedRaw:sha(reviewedBefore)===c.beforeSha256,beforeMatchesReviewedNormalized:norm(before)===norm(reviewedBefore)});
}
const prose=git(['show',`:${summary}`]).toString('utf8');
const whitespace=spawnSync('git',['diff','--cached','--check'],{cwd:root,encoding:'utf8'});
const checks={
 exactFivePaths:JSON.stringify([...names].sort())===JSON.stringify(expected),
 allSourceMatchesReviewedNormalized:files.every(r=>r.matchesReviewedNormalized),
 allReviewedRawHashesMatchRecorded:files.every(r=>r.reviewedMatchesRecordedRaw&&r.beforeMatchesRecordedRaw),
 allBeforeContextsMatchNormalized:files.every(r=>r.beforeMatchesReviewedNormalized),
 whitespaceClean:whitespace.status===0,
 noReportsOutputsArchivesBackendStaged:!names.some(p=>/^(?:reports|outputs|supabase)\//.test(p)||/\.(?:zip|tar|exe|whl)$/i.test(p)),
 summaryRetainsNoGo:/NO-GO/.test(prose)&&/not production publication approval/.test(prose),
 summaryContainsNoPrivateRawReferences:!/(?:account_id|accountId|zone_id|zoneId|gaia_id|owner_id|workspace_id|access_token|refresh_token|authorization\s*:|eyJ[A-Za-z0-9_-]{16,}\.)/.test(prose),
 summaryNoPrivateAccountValues:!/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(prose),
};
const result={capturedAt:new Date().toISOString(),method:'Independent index readback compared to immutable reviewed B copy; no index mutation.',stagedPaths:names,checks,files,summaryReview:'Manually reviewed all 48 lines: source scope, bounded test outcomes, existing public source identity and unresolved production gates only. No raw authenticated captures, private query/page data, account identifiers, credentials, or private exports included.',pass:Object.values(checks).every(Boolean)};
await fs.writeFile('reports/git-push-2026-10-26/staged-review.json',JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify({pass:result.pass,checks,files},null,2));
