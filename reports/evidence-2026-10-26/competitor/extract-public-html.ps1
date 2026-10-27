$ErrorActionPreference = 'Stop'
$evidenceRoot = Join-Path $PSScriptRoot '.'
function PlainText([string] $html) {
    return ([System.Net.WebUtility]::HtmlDecode([regex]::Replace($html, '<[^>]*>', ' ')) -replace '\s+', ' ').Trim()
}
$targets = @(
    @{ name = 'silberarrows'; url = 'https://mercedes-benz.silberarrows.com/services' },
    @{ name = 'dascenter'; url = 'https://www.dascenter.ae/mercedes-repair-dubai/' },
    @{ name = 'bavarland'; url = 'https://bavarland.ae/mercedes-service-dubai.html' },
    @{ name = 'jadgarage'; url = 'https://www.jadgarage.com/brand/mercedes-benz' },
    @{ name = 'hallmark'; url = 'https://hallmarkautoservice.ae/service/mercedes-benz-repair/' },
    @{ name = 'prolab'; url = 'https://prolabmotorsport.com/brands/mercedes-benz/' }
)
$results = foreach ($target in $targets) {
    $path = Join-Path $evidenceRoot ($target.name + '.html')
    $raw = Get-Content -LiteralPath $path -Raw
    $title = [regex]::Match($raw, '(?is)<title[^>]*>(.*?)</title>')
    $headings = @([regex]::Matches($raw, '(?is)<h([1-6])\b[^>]*>(.*?)</h\1>') | ForEach-Object { @{ level = [int]$_.Groups[1].Value; text = (PlainText $_.Groups[2].Value) } })
    $jsonld = @([regex]::Matches($raw, '(?is)<script\b[^>]*type=["'']application/ld\+json["''][^>]*>(.*?)</script>') | ForEach-Object {
        try { $_.Groups[1].Value | ConvertFrom-Json -Depth 100 } catch { @{ parseError = $_.Exception.Message } }
    })
    $links = @([regex]::Matches($raw, '(?is)<a\b[^>]*href=["'']([^"'']+)["''][^>]*>(.*?)</a>') | ForEach-Object { @{ href = [System.Net.WebUtility]::HtmlDecode($_.Groups[1].Value); text = (PlainText $_.Groups[2].Value) } })
    @{
        name = $target.name
        url = $target.url
        retrieval_date = '2026-10-26'
        method = 'Public HTTP GET via Invoke-WebRequest; extracted from source HTML, no browser execution'
        status = 200
        title = PlainText $title.Groups[1].Value
        headings = $headings
        json_ld = $jsonld
        links = $links
        json_ld_block_count = $jsonld.Count
        h1_count = @($headings | Where-Object { $_.level -eq 1 }).Count
        source_file = $target.name + '.html'
    }
}
$results | ConvertTo-Json -Depth 100 | Set-Content -LiteralPath (Join-Path $evidenceRoot 'page-extracts.json') -Encoding UTF8
foreach ($r in $results) {
    Write-Output ($r.name + ' | ' + $r.title)
    Write-Output ('H1=' + (($r.headings | Where-Object { $_.level -eq 1 } | ForEach-Object {$_.text}) -join ' | '))
    Write-Output ('H1 count=' + $r.h1_count + '; JSON-LD blocks=' + $r.json_ld_block_count)
    Write-Output ('H2=' + (($r.headings | Where-Object { $_.level -eq 2 } | ForEach-Object {$_.text}) -join ' | '))
}

