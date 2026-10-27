from pathlib import Path
from datetime import datetime, timezone, timedelta
import json, hashlib

out = Path(__file__).resolve().parent
pkg = out.parents[1]
workspace = pkg.parents[1]
read = lambda p: json.loads(p.read_text(encoding='utf-8-sig'))
sha = lambda p: hashlib.sha256(p.read_bytes()).hexdigest()
fresh_path = pkg / 'evidence/http/pre-2026-10-26T07-06-59-812Z/capture.json'
reviewed_path = pkg / 'evidence/http/pre-2026-10-26T06-53-48-482Z/capture.json'
fresh, reviewed = read(fresh_path), read(reviewed_path)

def stable(case):
    return {
        'url': case['url'], 'method': case['method'],
        'chain': [{k: row.get(k) for k in ['url', 'method', 'status', 'title', 'h1', 'canonical', 'robots', 'mainTextSha256']} |
            {'location': row['headers'].get('location'), 'xRobotsTag': row['headers'].get('x-robots-tag')}
            for row in case['chain']],
        'loop': case.get('loop'), 'unsafeFollowTarget': case.get('unsafeFollowTarget'), 'exceededHopLimit': case.get('exceededHopLimit')
    }

prior = {(c['url'], c['method']): c for c in reviewed['cases']}
changes = [{'url': c['url'], 'method': c['method'], 'before': stable(prior[(c['url'], c['method'])]), 'after': stable(c)}
    for c in fresh['cases'] if stable(c) != stable(prior[(c['url'], c['method'])])]
protected = read(pkg / 'evidence/workspace/protected-source-before.json')
protected_rows = [{'path': row['path'], 'reviewedSha256': row['sha256'], 'freshSha256': sha(workspace / row['path'])} for row in protected]
protected_drift = [row for row in protected_rows if row['reviewedSha256'] != row['freshSha256']]
approved_files = [pkg/'routing/redirect-proposals.json', *sorted((pkg/'routing/rules').glob('*.json')), pkg/'hub/mercedes-hub-minimal.patch', pkg/'evidence/cloudflare/current-inventory.json', pkg/'tests/verify-http.mjs', pkg/'tests/check-redirect-conflicts.mjs']
manifest = [{'path': str(p.relative_to(workspace)), 'sha256': sha(p), 'bytes': p.stat().st_size} for p in [*approved_files, fresh_path]]
groups = {}
for c in fresh['cases']:
    groups[c['group']] = groups.get(c['group'], 0) + 1
destinations = [{k: c['chain'][0].get(k) for k in ['url','status','title','h1','canonical','robots','mainTextSha256']} |
    {'xRobotsTag': c['chain'][0]['headers'].get('x-robots-tag'), 'direct': len(c['chain']) == 1}
    for c in fresh['cases'] if c['group']=='destination' and c['method']=='GET' and not c['url'].endswith('/')]
dubai = lambda s: datetime.fromisoformat(s.replace('Z','+00:00')).astimezone(timezone(timedelta(hours=4))).isoformat()
summary = {
    'recordedAtUtc': datetime.now(timezone.utc).isoformat(), 'readOnly': True,
    'noCloudflareInspectionOrMutationByThisAgent': True,
    'freshBaselinePath': str(fresh_path.relative_to(workspace)), 'freshBaselineSha256': sha(fresh_path),
    'startedAtUtc': fresh['startedAt'], 'finishedAtUtc': fresh['finishedAt'],
    'startedAtDubai': dubai(fresh['startedAt']), 'finishedAtDubai': dubai(fresh['finishedAt']),
    'httpSummary': fresh['summary'], 'caseGroups': groups,
    'proposalSha256': fresh['proposalSha256'], 'verifierSha256': fresh['verifierSha256'],
    'reviewedBaselinePath': str(reviewed_path.relative_to(workspace)),
    'stableHttpCasesCompared': len(fresh['cases']), 'stableHttpDrift': changes,
    'robotsHashUnchangedFromReviewed': fresh['robotsReview']['textSha256']==reviewed['robotsReview']['textSha256'],
    'destinations': destinations,
    'protectedSourceFilesChecked': len(protected_rows), 'protectedSourceDrift': protected_drift,
    'proposalContract': read(pkg/'routing/local-test-results.json'),
    'syntheticConflictTests': read(pkg/'routing/conflict-checker-test-results.json'),
    'syntheticPostTests': read(pkg/'routing/http-post-mode-test-results.json'),
    'hubLinkTargets': read(pkg/'evidence/http/hub-link-targets/capture.json')['summary'],
    'localPublicGatePassed': fresh['summary']['failed']==0 and not changes and not protected_drift,
    'authenticatedCloudflareGate': 'Pending separate fresh authenticated review and conflict checks by root operator. This summary does not authorize proceeding alone.',
    'knownLimits': ['Google indexing/selected canonical and performance are separate from technical eligibility.', 'Package validator rechecks the historical saved inspection report, not fresh authenticated Search Console data.', 'Synthetic tests are not deployment or production after-state evidence.']
}
for name, value in [('read-only-preflight-summary.json',summary),('protected-source-fresh.json',protected_rows),('approved-and-evidence-hashes.json',manifest),('stable-http-drift.json',changes)]:
    (out/name).write_text(json.dumps(value,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({k:summary[k] for k in ['freshBaselinePath','freshBaselineSha256','startedAtUtc','finishedAtUtc','startedAtDubai','finishedAtDubai','httpSummary','stableHttpCasesCompared','stableHttpDrift','robotsHashUnchangedFromReviewed','protectedSourceFilesChecked','protectedSourceDrift','localPublicGatePassed']},indent=2))
