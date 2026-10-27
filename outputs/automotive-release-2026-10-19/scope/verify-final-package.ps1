$ErrorActionPreference = 'Stop'
$taskRoot = Join-Path (Get-Location).Path 'outputs/automotive-release-2026-10-19'
$sourceManifest = Get-Content -Raw -LiteralPath (Join-Path $taskRoot 'scope/release-source-manifest.json') | ConvertFrom-Json
$overlayManifest = Get-Content -Raw -LiteralPath (Join-Path $taskRoot 'artifacts/source-overlay-manifest.json') | ConvertFrom-Json
$candidatePlan = Get-Content -Raw -LiteralPath (Join-Path $taskRoot 'candidate-plan.json') | ConvertFrom-Json
$artifactManifest = Get-Content -Raw -LiteralPath (Join-Path $taskRoot 'artifacts/artifact-checksums.json') | ConvertFrom-Json
Add-Type -AssemblyName System.IO.Compression.FileSystem
$archive = [System.IO.Compression.ZipFile]::OpenRead((Join-Path $taskRoot 'artifacts/automotive-source-overlay.zip'))
try {
    $rows = foreach ($record in $sourceManifest.files) {
        $overlayRecord = @($overlayManifest.files | Where-Object { $_.path -eq $record.file })
        $entry = @($archive.Entries | Where-Object { $_.FullName -eq $record.file })
        if ($entry.Count -ne 1 -or $overlayRecord.Count -ne 1) { throw "Missing or duplicate source record: $($record.file)" }
        $stream = $entry[0].Open()
        $hasher = [System.Security.Cryptography.SHA256]::Create()
        try { $zipHash = ([BitConverter]::ToString($hasher.ComputeHash($stream))).Replace('-', '').ToLowerInvariant() }
        finally { $stream.Dispose(); $hasher.Dispose() }
        $workspaceHash = (Get-FileHash -Algorithm SHA256 -LiteralPath $record.file).Hash.ToLowerInvariant()
        $candidateHash = (Get-FileHash -Algorithm SHA256 -LiteralPath (Join-Path $candidatePlan.candidate $record.file)).Hash.ToLowerInvariant()
        [pscustomobject]@{
            file=$record.file
            approvedSha256=$record.afterSha256
            workspaceSha256=$workspaceHash
            candidateSha256=$candidateHash
            packagedSha256=$zipHash
            overlayManifestSha256=$overlayRecord[0].sha256
            allHashesMatch=($workspaceHash -eq $record.afterSha256 -and $candidateHash -eq $record.afterSha256 -and $zipHash -eq $record.afterSha256 -and $overlayRecord[0].sha256 -eq $record.afterSha256)
        }
    }
    $archiveFileCount = $archive.Entries.Count
} finally { $archive.Dispose() }
$patchPath = Join-Path $taskRoot 'scope/automotive-source-only.patch'
$patchHash = (Get-FileHash -Algorithm SHA256 -LiteralPath $patchPath).Hash.ToLowerInvariant()
$packagedPatchRecord = @($artifactManifest.files | Where-Object { $_.file -eq 'scope/automotive-source-only.patch' })
git apply --check --reverse $patchPath
$patchCheckExit = $LASTEXITCODE
$result = [pscustomobject]@{
    checkedAt = [DateTime]::UtcNow.ToString('o')
    base = $candidatePlan.base
    sourceFileCount = $rows.Count
    archiveFileCount = $archiveFileCount
    allSourceHashesMatchApproved = (@($rows | Where-Object { -not $_.allHashesMatch }).Count -eq 0 -and $rows.Count -eq 11 -and $archiveFileCount -eq 11)
    sourcePatchSha256 = $patchHash
    patchMatchesOriginalReviewedHash = ($patchHash -eq 'b2b24835124a80c3def0ee4bb397a70b3d61474d51b57976564a589721f92d90')
    patchMatchesArtifactManifest = ($packagedPatchRecord.Count -eq 1 -and $packagedPatchRecord[0].sha256 -eq $patchHash)
    readOnlyReversePatchCheckExit = $patchCheckExit
    releaseRecommendation = 'GO for source candidate only. Production NO-GO: Cloudflare authentication returned 403; active production configuration and rollback remain unverified.'
    files = $rows
}
$result | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath (Join-Path $taskRoot 'scope/final-source-package-verification.json') -Encoding utf8
$result | Select-Object checkedAt,sourceFileCount,archiveFileCount,allSourceHashesMatchApproved,sourcePatchSha256,patchMatchesOriginalReviewedHash,patchMatchesArtifactManifest,readOnlyReversePatchCheckExit,releaseRecommendation | ConvertTo-Json
if (-not $result.allSourceHashesMatchApproved -or -not $result.patchMatchesOriginalReviewedHash -or -not $result.patchMatchesArtifactManifest -or $patchCheckExit -ne 0) { throw 'Final package validation failed.' }
