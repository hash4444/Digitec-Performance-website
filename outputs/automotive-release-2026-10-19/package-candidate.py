import hashlib,json,pathlib,zipfile
root=pathlib.Path.cwd()/"outputs/automotive-release-2026-10-19"
plan=json.loads((root/"candidate-plan.json").read_text(encoding="utf-8"))
candidate=pathlib.Path(plan["candidate"])
artifacts=root/"artifacts"
artifacts.mkdir(exist_ok=True)
def digest(file):
    sha=hashlib.sha256()
    with file.open("rb") as stream:
        for data in iter(lambda:stream.read(1024*1024),b""):sha.update(data)
    return sha.hexdigest()
source=[]
with zipfile.ZipFile(artifacts/"automotive-source-overlay.zip","w",zipfile.ZIP_DEFLATED) as archive:
    for name in plan["selected"]:
        file=candidate/name
        archive.write(file,name)
        source.append({"path":name,"sha256":digest(file),"bytes":file.stat().st_size})
dist=[]
with zipfile.ZipFile(artifacts/"automotive-built-dist.zip","w",zipfile.ZIP_DEFLATED) as archive:
    for file in sorted((candidate/"dist").rglob("*")):
        if not file.is_file():continue
        name=file.relative_to(candidate/"dist").as_posix()
        if name.endswith(".env") or "node_modules" in name.split("/"):raise RuntimeError("Unexpected private build input")
        archive.write(file,name)
        dist.append({"path":name,"sha256":digest(file),"bytes":file.stat().st_size})
(artifacts/"source-overlay-manifest.json").write_text(json.dumps({"base":plan["base"],"files":source},indent=2),encoding="utf-8")
(artifacts/"dist-file-manifest.json").write_text(json.dumps({"base":plan["base"],"files":dist},indent=2),encoding="utf-8")
items=[]
for file in [artifacts/"automotive-source-overlay.zip",artifacts/"automotive-built-dist.zip",artifacts/"source-overlay-manifest.json",artifacts/"dist-file-manifest.json",root/"scope/automotive-source-only.patch"]:
    items.append({"file":file.relative_to(root).as_posix(),"bytes":file.stat().st_size,"sha256":digest(file)})
(artifacts/"artifact-checksums.json").write_text(json.dumps({"base":plan["base"],"sourceFiles":len(source),"distFiles":len(dist),"files":items,"deploymentStatus":"HELD: production authentication, live state and rollback gates are unresolved"},indent=2),encoding="utf-8")
print(json.dumps({"sourceFiles":len(source),"distFiles":len(dist),"artifacts":items},indent=2))
