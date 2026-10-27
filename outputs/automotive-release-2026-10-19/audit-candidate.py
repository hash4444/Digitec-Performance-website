import hashlib,json,pathlib,zipfile
root=pathlib.Path.cwd()/"outputs/automotive-release-2026-10-19"
plan=json.loads((root/"candidate-plan.json").read_text(encoding="utf-8"))
candidate=pathlib.Path(plan["candidate"])
allowed=set(plan["selected"])
hash_bytes=lambda b:hashlib.sha256(b).hexdigest()
records=[]
with zipfile.ZipFile(root/"baseline/remote-base-source.zip") as archive:
    for item in archive.infolist():
        if item.is_dir():continue
        before=archive.read(item)
        file=candidate/item.filename
        if not file.exists():
            records.append({"file":item.filename,"kind":"missing","allowed":False})
            continue
        after=file.read_bytes()
        if before==after:continue
        normalize=lambda b:b.replace(b"\r\n",b"\n")
        same=normalize(before)==normalize(after)
        generated=item.filename in ["cloudflare/routing-response-data.js","public/sitemap.xml","src/lib/routing-paths.json","docs/seo/paint-care-cluster-audit.json","docs/seo/protection-release-validation.json","docs/seo/query-release-validation.json","docs/seo/route-schema-matrix.csv"]
        records.append({"file":item.filename,"kind":"line-endings-only" if same else "content","sprint":item.filename in allowed,"generatedBuildOutput":generated,"baseSha256":hash_bytes(before),"candidateSha256":hash_bytes(after),"allowed":same or item.filename in allowed or generated})
for file in allowed:
    if not any(r["file"]==file for r in records):
        records.append({"file":file,"kind":"added","sprint":True,"allowed":True,"candidateSha256":hash_bytes((candidate/file).read_bytes())})
report={"base":plan["base"],"differences":records,"unexpected":[r for r in records if not r["allowed"]],"passed":all(r["allowed"] for r in records)}
(root/"candidate-base-comparison.json").write_text(json.dumps(report,indent=2),encoding="utf-8")
print(json.dumps(report,indent=2))
