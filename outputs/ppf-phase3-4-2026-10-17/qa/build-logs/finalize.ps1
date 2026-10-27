$ErrorActionPreference = 'Stop'
$manifest = Get-Content -LiteralPath 'release-qa.local/source-manifest.json' -Raw | ConvertFrom-Json
$build = Get-Content -LiteralPath 'release-qa.local/build-results.json' -Raw | ConvertFrom-Json
$changed = @($manifest | Where-Object { (Get-FileHash -Algorithm SHA256 -LiteralPath $_.file).Hash.ToLower() -ne $_.sha256 } | ForEach-Object {$_.file})
$knownFiles = @($manifest | ForEach-Object {$_.file})
$rootPath = (Get-Location).Path
$newFiles = @(Get-ChildItem -LiteralPath 'src','public','scripts' -Recurse -File | ForEach-Object {$_.FullName.Substring($rootPath.Length + 1).Replace('\','/')} | Where-Object {$_ -ne 'public/sitemap.xml' -and $_ -notin $knownFiles})
$validation = Get-Content -LiteralPath 'docs/seo/protection-release-validation.json' -Raw | ConvertFrom-Json
$artifactMismatches = @($validation.pages | Where-Object {(Get-FileHash -Algorithm SHA256 -LiteralPath ('dist' + $_.route + '/index.html')).Hash.ToLower() -ne $_.htmlSha256} | ForEach-Object {$_.route})
$clientUnchanged = (Get-FileHash -Algorithm SHA256 -LiteralPath ('dist/' + $validation.clientEntry)).Hash.ToLower() -eq $validation.clientSha256
$testFiles = @('release-qa.local/integration/browser-results.json','release-qa.local/ppf/browser-results.json','release-qa.local/ceramic/ceramic-browser-results.json','release-qa.local/paint/browser-results.json')
$testResults = @($testFiles | ForEach-Object {
  $result = Get-Content -LiteralPath $_ -Raw | ConvertFrom-Json
  [pscustomobject]@{File=$_; Passed=$result.passed; Fresh=((Get-Item -LiteralPath $_).LastWriteTimeUtc -ge [datetime]::Parse($build.finishedAt).ToUniversalTime())}
})
$integration = Get-Content -LiteralPath $testFiles[0] -Raw | ConvertFrom-Json
$summary = [pscustomobject]@{CheckedAt=(Get-Date).ToUniversalTime().ToString('o'); SourceSha256=$build.sourceSha256; ChangedSource=$changed; AddedSource=$newFiles; ChangedHtml=$artifactMismatches; ClientUnchanged=$clientUnchanged; BrowserSuites=$testResults; Passed=($build.passed -and $validation.passed -and $changed.Count -eq 0 -and $newFiles.Count -eq 0 -and $artifactMismatches.Count -eq 0 -and $clientUnchanged -and @($testResults | Where-Object {-not $_.Passed -or -not $_.Fresh}).Count -eq 0 -and $integration.sourceSha256 -eq $build.sourceSha256)}
$summary | ConvertTo-Json -Depth 6 | Set-Content -LiteralPath 'release-qa.local/final-consistency.json' -Encoding UTF8
$summary | ConvertTo-Json -Depth 6
if (-not $summary.Passed) { throw 'Final release consistency check failed; report remains pending.' }
$summary | ConvertTo-Json -Depth 6 | Set-Content -LiteralPath 'docs/seo/protection-release-qa.json' -Encoding UTF8
$reportPath = Join-Path $rootPath 'docs/seo/protection-release-report.md'
$report = [System.IO.File]::ReadAllText($reportPath)
$report = $report.Replace('**Status: final consistency verification pending.**', '**Release verdict: READY for a separately authorized production release. `/services/car-polishing-dubai` is ready in the combined build, together with PPF and ceramic coating.**')
$identity = "`n## Final candidate identity`n`nSource SHA-256: ``$($build.sourceSha256)``. Client entry: ``$($validation.clientEntry)``. Final consistency check: $($summary.CheckedAt).`n`n[Final build/browser consistency evidence](./protection-release-qa.json). All four browser reports were produced after this build completed; source, client and page HTML still matched at the final check.`n"
[System.IO.File]::WriteAllText($reportPath, $report + $identity)
