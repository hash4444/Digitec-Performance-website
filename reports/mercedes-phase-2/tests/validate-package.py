from pathlib import Path
import json,hashlib,re,subprocess

pkg=Path(__file__).resolve().parents[1]
workspace=pkg.parents[1]
read_json=lambda p:json.loads(p.read_text(encoding='utf-8-sig'))
required=['README.md','cloudflare-review.md','verification-and-rollback.md','routing/README.md','routing/redirect-proposals.json','routing/http-summary.json','routing/local-test-results.json','routing/conflict-check.json','hub/README.md','hub/mercedes-hub-minimal.patch','hub/validation.json','search-console/README.md','search-console/api-readonly-request-templates.json','search-console/indexed-inspection-observations.json']
for name in required:
    assert (pkg/name).exists() and (pkg/name).stat().st_size>0,name
broken=[]
md=list(pkg.rglob('*.md'))
for p in md:
    for target in re.findall(r'\]\(([^)]+)\)',p.read_text(encoding='utf-8-sig')):
        if re.match(r'^[a-zA-Z][a-zA-Z0-9+.-]*:',target) or target.startswith('#'): continue
        path=target.split('#')[0]
        if path and not (p.parent/path).exists():broken.append({'file':str(p.relative_to(pkg)),'target':target})
assert not broken,broken
before=read_json(pkg/'evidence/workspace/protected-source-before.json')
source_drift=[]
for r in before:
    p=workspace/r['path']
    if not p.exists() or hashlib.sha256(p.read_bytes()).hexdigest()!=r['sha256']:source_drift.append(r['path'])
assert not source_drift,source_drift
proposal=read_json(pkg/'routing/redirect-proposals.json')
payloads=sorted((pkg/'routing/rules').glob('*.json'))
assert len(proposal['rules'])==len(payloads)==4
for rule,payload in zip(proposal['rules'],payloads):
    actual=read_json(payload)
    assert actual['enabled'] is False
    assert actual['position']=={'before':'9781b1ef743f4ffbaadbe5cb3250eeca'}
    assert {k:v for k,v in actual.items() if k!='position'}==rule['cloudflare_rule']
capture=read_json(pkg/read_json(pkg/'routing/http-summary.json')['capture'])
assert capture['stage']=='pre' and capture['summary']['failed']==0
assert capture['proposalSha256']==hashlib.sha256((pkg/'routing/redirect-proposals.json').read_bytes()).hexdigest()
for name in ['routing/local-test-results.json','routing/conflict-check.json','hub/validation.json','search-console/indexed-inspection-observations.json']:
    read_json(pkg/name)
inspections=read_json(pkg/'search-console/indexed-inspection-observations.json')['observations']
assert len(inspections)>=8
assert 'no new authenticated performance or URL Inspection results are claimed' not in (pkg/'search-console/README.md').read_text(encoding='utf-8')
result={'passed':True,'required_artifacts':required,'markdown_files_checked':len(md),'local_markdown_links_resolve':True,'protected_source_files_checked':len(before),'protected_source_drift':source_drift,'rule_payloads_disabled':4,'fresh_http_summary':capture['summary'],'capture_matches_proposal_hash':True,'indexed_inspections_saved':len(inspections),'no_live_after_state_claimed':True}
(pkg/'evidence/package-verification.json').write_text(json.dumps(result,indent=2),encoding='utf-8')
print(json.dumps(result,indent=2))
