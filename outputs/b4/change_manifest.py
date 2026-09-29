"""Record B4-only source changes relative to the preserved dirty-tree checkpoint."""
import hashlib,json
from pathlib import Path
R=Path(__file__).resolve().parents[2];O=R/'outputs/b4'
before=json.loads((O/'source-hashes-before.json').read_text(encoding='utf-8'))
source_changed=[p for p,h in before.items() if (R/p).exists() and hashlib.sha256((R/p).read_bytes()).hexdigest()!=h]
source_added=['src/data/b4UpdatedPaths.ts']
after=json.loads((O/'audit-summary.json').read_text(encoding='utf-8'))
manifest={'head_before':(O/'head-before.txt').read_text().strip(),'head_final':(O/'head-final.txt').read_text().strip(),
 'branch_before':(O/'branch-before.txt').read_text().strip(),'branch_final':(O/'branch-final.txt').read_text().strip(),
 'changed_existing_source_and_generated_files':source_changed,'added_source_files':source_added,
 'ferrari_rendered_urls_changed':after['brands']['ferrari']['changed_urls'],
 'lamborghini_rendered_urls_changed':after['brands']['lamborghini']['changed_urls'],
 'shared_directory_semantic_changes':['/blog','/ar/blog','/ar/sitemap'],
 'new_public_urls':0,'lastmod_only_route_changes':after['lastmod_changes'],
 'route_policy_changes':after['route_policy_changes'],'seo_policy_changes':after['seo_policy_changes'],
 'committed':False,'pushed':False,'deployed':False}
(O/'change-manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps({'source_changed':len(source_changed),'source_added':source_added,'B4_rendered_changed':len(manifest['ferrari_rendered_urls_changed'])+len(manifest['lamborghini_rendered_urls_changed']),'head_unchanged':manifest['head_before']==manifest['head_final']},indent=2))
