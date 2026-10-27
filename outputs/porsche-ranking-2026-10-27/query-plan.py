import json
from pathlib import Path

root = Path(__file__).parent
source = Path(r'C:\Users\ADMIN\Downloads\digitecme.com-Performance-on-Search-2026-10-27.xlsx')
data = json.loads(Path('outputs/seo-review-2026-10-27/workbook-data.json').read_text(encoding='utf-8'))
rows = [r for r in data['Queries'] if 'porsche' in r['Top queries'].lower()]
assert len(rows) == 21
hub = '/brands/porsche-service-dubai'
def decision(q):
    if 'macan' in q:
        return '/porsche/macan', 'Priority: petrol 95B service; confirm petrol vs electric Turbo intent.'
    if '997' in q:
        return '/porsche/911/997', 'Protect and strengthen; very small ranking sample.'
    if 'carrera' in q:
        return '/blog/porsche-911-service-dubai-guide', 'Confirm generation; use existing 997/991/992 children.'
    if 'transmission' in q:
        return hub+'/transmission-repair', 'Scheduled service and fault repair are distinct scopes.'
    if 'brake' in q:
        return hub+'/brake-repair', 'Keep existing owner; small ranking sample.'
    if 'engine rebuild' in q:
        return hub+'/mechanical-repair', 'Hold rebuild promotion until actual workshop capability is confirmed.'
    if 'engine repair' in q:
        return hub+'/mechanical-repair', 'Existing engine/mechanical owner.'
    if 'performance tuning' in q:
        return '/tuning', 'Secondary to service/repair campaign; no tuning changes in this pass.'
    if 'boxster' in q:
        return hub, 'Broad Boxster scope needs confirmation; /porsche/718 only covers 982.'
    if 'inspection' in q:
        return hub, 'Provisional: distinguish fault diagnosis from pre-purchase inspection.'
    if 'performance service' in q:
        return hub, 'Ambiguous; treat maintenance as initial hypothesis and inspect actual query/page data.'
    return hub, 'Primary broad Porsche service/repair/workshop owner.'

lines = [
    '# Porsche search priorities', '',
    'Prepared 27 October 2026. Goal: increase relevant Porsche workshop enquiries and work toward stronger positions for Dubai service and repair searches. Position one is a target, not a promised outcome.', '',
    '## Query ownership plan', '',
    f'Source: [{source.name}]({source.as_posix()}). Period: 19–25 October 2026. The export contains 21 visible queries with the word Porsche, 88 impressions and zero clicks. It is limited to 1,000 exported queries overall. This is not a complete Porsche keyword universe or a 28-day trend.', '',
    '**Owners below are proposed editorial destinations, not proof of the URLs Google actually ranked.** Queries and Pages are separate aggregate tabs. Confirm UAE country, device and query-to-page data before diagnosing cannibalization or interpreting the very small samples.', '',
    '| Exact query | Impressions | Average position | Intended owner | Decision |',
    '| --- | ---: | ---: | --- | --- |',
]
for r in rows:
    q = r['Top queries']
    owner, note = decision(q)
    lines.append(f'| {q} | {int(r["Impressions"])} | {r["Position"]:.2f} | `{owner}` | {note} |')
lines += [
    '', '## Implementation completed locally', '',
    '- Earlier pass: service-first Porsche hub, original workshop images, clearer booking, metadata and all 14 service links.',
    '- This pass: workshop-selection page now has a distinct checklist role and links to the commercial hub. Existing URLs and canonicals are preserved.',
    '- Macan and 997 have service-planning guidance and specific FAQs. Existing Porsche model pages have a clear service/repair booking section and tagged contact actions. FAQ answers render in initial HTML.',
    '- Transmission owner explains scheduled maintenance as well as PDK/Tiptronic/manual fault diagnosis.',
    '- Other brand pages, including English/Arabic Mercedes hub and workshop-selection pages, match the baseline visible content and SEO in rendered checks.',
    '', '## What needs to happen next', '',
    '1. Complete release and visual checks, then publish the isolated Porsche changes. They currently remain local, so no ranking improvement is attributed to them.',
    '2. Establish a 28-day UAE baseline, split mobile/desktop and query-to-page. Track page/query clicks and impressions separately from received enquiries, confirmed appointments and attended visits.',
    '3. Add real Porsche jobs with model/year, complaint, actual tests, findings, approved work, final checks, dates and permissioned photographs. No completed repair story has been invented.',
    '4. Confirm real diagnostic fees, included service work, VAT, parts, warranty and timing before publishing an offer. Confirm rebuild, older Boxster, electric-platform and pre-purchase-inspection scope before targeting those claims.',
    '5. Review the existing Google Business Profile for accurate location, hours and services; use genuine workshop photos and honest customer reviews. Obtain relevant business mentions and links through real relationships. No profile or third-party account changes were made.',
    '', '## Search guidance', '',
    '- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide): ranking improvements are not guaranteed and may take time.',
    '- [Google local ranking guidance](https://support.google.com/business/answer/7091?hl=en): relevance, distance and prominence affect local results. A fixed Maps position cannot be promised for all searchers.',
    '- [Google link guidance](https://developers.google.com/search/docs/crawling-indexing/links-crawlable): useful crawlable internal links connect relevant pages.',
    '', '## Validation', '',
    'Passed focused lint, app/Node TypeScript, client and server bundle builds, plus scoped rendered-page and preservation checks. Interactive visual verification and the full publication pipeline remain outstanding. No publication or ranking result is claimed.',
]
(root/'query-plan.md').write_text('\n'.join(lines)+'\n', encoding='utf-8')
print('Saved 21-query Porsche ownership and release plan.')
