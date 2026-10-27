$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.IO.Compression.FileSystem
$reviewedOption = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '../../mercedes-phase-4b/options/B'))
$manifestPath = Join-Path $reviewedOption 'publication-manifest.json'
$manifest = Get-Content -LiteralPath $manifestPath -Raw | ConvertFrom-Json
$expectedFiles = @{}
foreach ($row in $manifest.files) { $expectedFiles[$row.file] = $row }
$zipPath = Join-Path $reviewedOption 'application-static.zip'
$archive = [System.IO.Compression.ZipFile]::OpenRead($zipPath)
$checks = @()
try {
  foreach ($entry in $archive.Entries) {
    $relative = $entry.FullName.Replace('\','/')
    $expected = $expectedFiles[$relative]
    $stream = $entry.Open()
    $digest = [System.Security.Cryptography.SHA256]::Create()
    try { $observed = [System.BitConverter]::ToString($digest.ComputeHash($stream)).Replace('-','').ToLowerInvariant() }
    finally { $stream.Dispose(); $digest.Dispose() }
    $checks += [pscustomobject]@{file=$relative; bytes=$entry.Length; sha256=$observed; passed=($null -ne $expected -and $expected.sha256 -eq $observed -and $expected.bytes -eq $entry.Length)}
  }
} finally { $archive.Dispose() }
$failures = @($checks | Where-Object { -not $_.passed })
$uniqueFiles = @($checks.file | Sort-Object -Unique)
$record = [pscustomobject]@{checkedAtUtc=[DateTime]::UtcNow.ToString('o');readOnly=$true;archivePath=$zipPath;archiveSha256=(Get-FileHash -LiteralPath $zipPath -Algorithm SHA256).Hash.ToLowerInvariant();reviewedArchiveSha256='a2faa6a33475be10c600bbfdad3303a3408bbabafe87d9dd708ca872278806b3';manifestSha256=(Get-FileHash -LiteralPath $manifestPath -Algorithm SHA256).Hash.ToLowerInvariant();fileCount=$checks.Count;uniqueFileCount=$uniqueFiles.Count;expectedFileCount=$manifest.fileCount;passed=($failures.Count -eq 0 -and $checks.Count -eq 1634 -and $uniqueFiles.Count -eq 1634);failures=$failures;files=$checks}
if ($record.archiveSha256 -ne $record.reviewedArchiveSha256) { $record.passed = $false }
$record | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath (Join-Path $PSScriptRoot 'option-b-archive-verification.json') -Encoding UTF8
$record | Select-Object fileCount,uniqueFileCount,passed,archiveSha256 | ConvertTo-Json
if (-not $record.passed) { throw 'Archive differs from reviewed manifest or previous archive digest' }
