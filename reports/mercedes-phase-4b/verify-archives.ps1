$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.IO.Compression.FileSystem
$archiveResults = @()
foreach ($releaseOption in @('A', 'B')) {
  $optionPath = Join-Path $PSScriptRoot ('options/' + $releaseOption)
  $manifest = Get-Content -LiteralPath (Join-Path $optionPath 'publication-manifest.json') -Raw | ConvertFrom-Json
  $expectedFiles = @{}
  foreach ($row in $manifest.files) { $expectedFiles[$row.file] = $row }
  $zipPath = Join-Path $optionPath 'application-static.zip'
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
  $archiveResults += [pscustomobject]@{option=$releaseOption;checkedAtUtc=[DateTime]::UtcNow.ToString('o');archiveSha256=(Get-FileHash -LiteralPath $zipPath -Algorithm SHA256).Hash.ToLowerInvariant();fileCount=$checks.Count;expectedFileCount=$manifest.fileCount;passed=($failures.Count -eq 0 -and $checks.Count -eq $manifest.fileCount);failures=$failures}
}
$archiveResults | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath (Join-Path $PSScriptRoot 'options/archive-verification.json') -Encoding UTF8
$archiveResults | Select-Object option,fileCount,passed,archiveSha256 | ConvertTo-Json
if (@($archiveResults | Where-Object { -not $_.passed }).Count -ne 0) { throw 'Archive differs from publication manifest' }
