$ErrorActionPreference = 'Stop'
$current = Get-Content -LiteralPath (Join-Path $PSScriptRoot 'indexed-inspection-observations.json') -Raw -Encoding UTF8 | ConvertFrom-Json
$reviewedPath = Join-Path $PSScriptRoot '..\..\search-console\indexed-inspection-observations.json'
$reviewed = Get-Content -LiteralPath $reviewedPath -Raw -Encoding UTF8 | ConvertFrom-Json

function Normalize-Observation($item) {
    $body = $item.indexed_report_text
    function Capture([string]$pattern) {
        $match = [regex]::Match($body, $pattern)
        if (!$match.Success) { throw "Missing required indexed report field for $($item.url): $pattern" }
        return $match.Groups[1].Value.Trim()
    }
    $declared = Capture 'User-declared canonical\n(?:info\n)?([^\n]+)'
    $selected = Capture 'Google-selected canonical\n(?:[^\p{L}\p{N}\r\n]+\n)?([^\n]+)'
    $selectedUrl = $selected
    if ($selected -eq 'Inspected URL') { $selectedUrl = $item.url }
    if ($selected -eq 'Same as user-declared canonical') { $selectedUrl = $declared }
    return [ordered]@{
        url = $item.url
        captured_at_utc = $item.captured_at
        page_indexing = Capture '\nPage indexing\n([^\n]+)'
        last_crawl_as_displayed = Capture '\nLast crawl\n([^\n]+)'
        crawled_as = Capture '\nCrawled as\n([^\n]+)'
        crawl_allowed = Capture '\nCrawl allowed\?\n([^\n]+)'
        page_fetch = Capture '\nPage fetch\n([^\n]+)'
        indexing_allowed = Capture '\nIndexing allowed\?\n([^\n]+)'
        user_declared_canonical = $declared
        google_selected_canonical_label = $selected
        google_selected_canonical_resolved = $selectedUrl
        sitemaps = Capture '\nDiscovery\nSitemaps\n([^\n]+)'
    }
}

$compared = foreach ($item in $current.observations) {
    $fresh = Normalize-Observation $item
    $priorItem = @($reviewed.observations | Where-Object url -eq $item.url)
    if ($priorItem.Count -ne 1) { throw "Missing or duplicate reviewed URL: $($item.url)" }
    $prior = Normalize-Observation $priorItem[0]
    $changes = @()
    foreach ($field in $fresh.Keys) {
        if ($field -notin @('captured_at_utc', 'url') -and $fresh[$field] -ne $prior[$field]) {
            $changes += [ordered]@{ field = $field; before = $prior[$field]; after = $fresh[$field] }
        }
    }
    [ordered]@{ current = $fresh; reviewed_captured_at_utc = $prior.captured_at_utc; changes = $changes }
}
$blockingFields = @('page_indexing','user_declared_canonical','google_selected_canonical_label','google_selected_canonical_resolved','crawl_allowed','page_fetch','indexing_allowed')
$blockers = @($compared | Where-Object { @($_.changes | Where-Object field -in $blockingFields).Count -gt 0 })
$out = [ordered]@{
    property = $current.property
    refreshed_utc_start = ($current.observations.captured_at | Sort-Object | Select-Object -First 1)
    refreshed_utc_end = ($current.observations.captured_at | Sort-Object | Select-Object -Last 1)
    method = $current.method
    observations_count = @($compared).Count
    status_canonical_crawl_changes_count = $blockers.Count
    last_crawl_timezone = $current.last_crawl_timezone
    no_indexing_requests = $true
    no_live_tests = $true
    comparisons = @($compared)
}
$out | ConvertTo-Json -Depth 10 | Set-Content -LiteralPath (Join-Path $PSScriptRoot 'indexed-inspection-comparison.json') -Encoding UTF8
if ($blockers.Count -gt 0) { throw 'Indexed inspection status/canonical/crawl fields changed; inspect comparison before deployment.' }
Write-Output "Compared $(@($compared).Count) indexed reports: no status, canonical or crawl-field changes; $(@($compared | Where-Object { $_.changes.Count -gt 0 }).Count) records have sitemap-discovery-only changes."
