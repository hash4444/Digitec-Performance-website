$ErrorActionPreference = 'Stop'
$taskRoot = (Get-Location).Path
$taskOut = Join-Path $taskRoot 'outputs/mercedes-service-top3-2026-10-20'
$taskManifest = Get-Content -Raw -LiteralPath (Join-Path $taskOut 'modified-files.json') | ConvertFrom-Json
Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem
$taskZipPath = Join-Path $taskOut 'mercedes-service-source-review.zip'
if (Test-Path -LiteralPath $taskZipPath) {
  $taskPriorDir = Join-Path $taskOut 'baseline/before-mobile-cta-fix.local'
  $taskPriorZip = Join-Path $taskPriorDir 'source-review.zip'
  if (-not $taskPriorZip.StartsWith($taskRoot + [IO.Path]::DirectorySeparatorChar, [StringComparison]::OrdinalIgnoreCase)) { throw 'Backup outside workspace' }
  if (-not $taskZipPath.StartsWith($taskRoot + [IO.Path]::DirectorySeparatorChar, [StringComparison]::OrdinalIgnoreCase)) { throw 'Archive outside workspace' }
  if (Test-Path -LiteralPath $taskPriorZip) { throw 'Prior archive already preserved' }
  New-Item -ItemType Directory -Path $taskPriorDir -Force | Out-Null
  Copy-Item -LiteralPath (Join-Path $taskOut 'source-package-manifest.json') -Destination (Join-Path $taskPriorDir 'source-package-manifest.json')
  Move-Item -LiteralPath $taskZipPath -Destination $taskPriorZip
}
$taskZip = [IO.Compression.ZipFile]::Open($taskZipPath, [IO.Compression.ZipArchiveMode]::Create)
try {
  foreach ($taskFile in $taskManifest.files) {
    $taskAbsolute = (Resolve-Path -LiteralPath $taskFile.file).Path
    if (-not $taskAbsolute.StartsWith($taskRoot + [IO.Path]::DirectorySeparatorChar, [StringComparison]::OrdinalIgnoreCase)) { throw 'Source outside workspace' }
    if ((Get-FileHash -Algorithm SHA256 -LiteralPath $taskAbsolute).Hash.ToLowerInvariant() -ne $taskFile.afterSha256) { throw 'Source differs from manifest' }
    [IO.Compression.ZipFileExtensions]::CreateEntryFromFile($taskZip, $taskAbsolute, $taskFile.file, [IO.Compression.CompressionLevel]::Optimal) | Out-Null
  }
} finally { $taskZip.Dispose() }
$taskZipRead = [IO.Compression.ZipFile]::OpenRead($taskZipPath)
try {
  if ($taskZipRead.Entries.Count -ne 6) { throw 'Archive file count mismatch' }
  foreach ($taskEntry in $taskZipRead.Entries) {
    $taskExpected = $taskManifest.files | Where-Object { $_.file -ceq $taskEntry.FullName }
    if (-not $taskExpected) { throw 'Unexpected archive entry' }
    $taskStream = $taskEntry.Open()
    $taskHasher = [Security.Cryptography.SHA256]::Create()
    try {
      $taskSha = [BitConverter]::ToString($taskHasher.ComputeHash($taskStream)).Replace('-', '').ToLowerInvariant()
      if ($taskSha -ne $taskExpected.afterSha256) { throw 'Archive content differs from reviewed source' }
    } finally { $taskHasher.Dispose(); $taskStream.Dispose() }
  }
} finally { $taskZipRead.Dispose() }
[PSCustomObject]@{
  createdAt = [DateTime]::UtcNow.ToString('o'); base = $taskManifest.base
  purpose = 'Local source review only'; archive = 'mercedes-service-source-review.zip'
  archiveSha256 = (Get-FileHash -Algorithm SHA256 -LiteralPath $taskZipPath).Hash.ToLowerInvariant()
  archiveVerified = $true; files = $taskManifest.files
  containsEnvironmentFiles = $false; containsBackendChanges = $false; containsPrivateResearch = $false
  committed = $false; pushed = $false; deployed = $false
} | ConvertTo-Json -Depth 7 | Set-Content -LiteralPath (Join-Path $taskOut 'source-package-manifest.json') -Encoding UTF8
Write-Output 'Six-file final source review archive created and verified; pre-fix archive preserved separately'
