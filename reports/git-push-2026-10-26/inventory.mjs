import fs from 'node:fs/promises';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
const root = process.cwd();
const out = path.join(root, 'reports/git-push-2026-10-26');
await fs.mkdir(out, { recursive: true });
const files = execFileSync('git', ['ls-files', '--others', '--exclude-standard', '-z'], { cwd: root, maxBuffer: 32 * 1024 * 1024 }).toString('utf8').split('\0').filter(Boolean);
const all = [];
for (const file of files) {
  const stat = await fs.stat(path.join(root, file));
  all.push({ path: file, bytes: stat.size });
}
const groups = new Map();
for (const row of all) {
  const key = row.path.split('/').slice(0, 2).join('/');
  const group = groups.get(key) ?? { path: key, count: 0, bytes: 0 };
  group.count++; group.bytes += row.bytes; groups.set(key, group);
}
const runtimePattern = /(?:^|\/)(?:analysis-runtime|artifact-work|workbook-runtime|tabular-work|npm-cache(?:\.local)?|pnpm-store(?:\.local)?|tools|vendor|site-packages|\.venv)(?:\/|$)|\.(?:exe|whl|pyc|pyd|dll)$/i;
const archivePattern = /\.(?:tar|tgz|zip|7z|rar|gz)$/i;
const mediaPattern = /\.(?:mp4|webm|mov|avi|mkv|wav|mp3)$/i;
const authPathPattern = /(?:gsc|search-console|cloudflare|authenticated|host\/|hosting|api-response|network|har)(?:[-_/\.]|$)/i;
const report = {
  capturedAt: new Date().toISOString(),
  source: 'git ls-files --others --exclude-standard -z; stat only, no file content transmitted',
  untracked: { count: all.length, bytes: all.reduce((sum, row) => sum + row.bytes, 0) },
  groups: [...groups.values()].sort((a,b) => b.bytes - a.bytes),
  above50MiB: all.filter(row => row.bytes > 50 * 1024 * 1024).sort((a,b)=>b.bytes-a.bytes),
  above100MiB: all.filter(row => row.bytes > 100 * 1024 * 1024).sort((a,b)=>b.bytes-a.bytes),
  localRuntimeCandidates: all.filter(row => runtimePattern.test(row.path)),
  archiveCandidates: all.filter(row => archivePattern.test(row.path)),
  mediaCandidates: all.filter(row => mediaPattern.test(row.path)),
  potentiallyAuthenticatedEvidencePaths: all.filter(row => authPathPattern.test(row.path)).map(row => ({ path: row.path, bytes: row.bytes })),
};
await fs.writeFile(path.join(out, 'untracked-inventory.json'), JSON.stringify(report, null, 2) + '\n');
await fs.writeFile(path.join(out, 'untracked-file-sizes.json'), JSON.stringify(all, null, 2) + '\n');
const summarize = rows => ({ count: rows.length, bytes: rows.reduce((sum, row)=>sum+row.bytes,0) });
console.log(JSON.stringify({ untracked: report.untracked, groups: report.groups, above50MiB: report.above50MiB, localRuntime: summarize(report.localRuntimeCandidates), archive: summarize(report.archiveCandidates), media: summarize(report.mediaCandidates), authenticatedPathCandidates: summarize(report.potentiallyAuthenticatedEvidencePaths) }, null, 2));
