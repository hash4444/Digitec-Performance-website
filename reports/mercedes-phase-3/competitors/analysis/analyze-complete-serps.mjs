// Offline interpretation of root-captured complete desktop SERP snapshots only.
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {resolve} from 'node:path';
const here=fileURLToPath(new URL('./',import.meta.url));
const serp=fileURLToPath(new URL('../serp/',import.meta.url));
const manifest=JSON.parse(await readFile(resolve(serp,'complete-manifest.json'),'utf8'));
const hash=s=>createHash('sha256').update(s).digest('hex');
const observations=[];
for(const entry of manifest){
  const rawLinks=await readFile(resolve(serp,entry.linksFile),'utf8');
  const rawVisible=await readFile(resolve(serp,entry.textFile),'utf8');
  const links=JSON.parse(rawLinks);
  const headed=links.filter(l=>l.heading && !/^(?:www\.)?google\.com$|^(?:search|maps)\.google\.com$/.test(new URL(l.href).hostname));
  if(headed.length!==8)throw new Error('Expected manually reviewed eight headed web-result anchors for '+entry.query);
  if(headed.some(l=>/ritzautocare\.ae/.test(l.href)))throw new Error('Sponsored Ritz result entered organic set.');
  observations.push({query:entry.query,capturedAtUtc:entry.capturedAt,searchUrl:entry.searchUrl,requestedCountry:entry.requestedCountry,language:entry.language,pws:entry.pws,signedIn:entry.signedIn,googleDisplayedLocation:entry.googleDisplayedLocation,scope:entry.scope,organicHeadedResultCount:headed.length,organicUrlsInObservedAnchorOrder:headed.map(l=>l.href),digitecOrganicUrls:headed.filter(l=>new URL(l.href).hostname==='digitecme.com').map(l=>l.href),digitecObserved:headed.some(l=>new URL(l.href).hostname==='digitecme.com'),notObservedMeaning:'Absent from these captured headed first-page web results only; no numerical rank bound inferred.',sourceFiles:{links:{file:entry.linksFile,sha256:hash(rawLinks)},visible:{file:entry.textFile,sha256:hash(rawVisible)},ax:entry.axFile},excludedLinkRecords:links.filter(l=>!headed.includes(l)).length,exclusionRule:'For these manually reviewed snapshots, retain nonnull result-heading anchors only; exclude sponsored blocks including null-heading Ritz inside rso, owner Search Console widget, local pack/maps, AI/knowledge, related-search and read-more/duplicate anchors.'});
}
const domains=[...new Set(observations.flatMap(o=>o.organicUrlsInObservedAnchorOrder.map(u=>new URL(u).hostname.replace(/^www\./,''))))];
const recurring=domains.map(domain=>({domain,observedQueryCount:observations.filter(o=>o.organicUrlsInObservedAnchorOrder.some(u=>new URL(u).hostname.replace(/^www\./,'')===domain)).length,queries:observations.filter(o=>o.organicUrlsInObservedAnchorOrder.some(u=>new URL(u).hostname.replace(/^www\./,'')===domain)).map(o=>o.query)})).sort((a,b)=>b.observedQueryCount-a.observedQueryCount||a.domain.localeCompare(b.domain));
const result={generatedAtUtc:new Date().toISOString(),sourceSet:'complete-manifest.json and *-complete-* files only; earlier partial files deliberately excluded',searchContext:{singleDesktopSession:true,googleReportedNonPersonalised:true,signedIn:true,countryBias:'ae',language:'en',requestedPersonalization:'pws=0',googleReportedIpLocation:'Al Qouz Ind.third, Dubai, United Arab Emirates',formalRankTracking:false,independentGeographicVantages:false,mobileTest:false},interpretationLimits:['Anchor order is a local captured observation, not formal or universal rank.','The absence of DIGI-TEC from four captured result sets does not establish rank greater than10 or no impressions.','Sponsored,local,AI/knowledge and owner Search Console panels are excluded from organic comparison.','Owner-only Search Console widget metrics have unequal presets and unspecified filters; do not treat them as matched performance datasets.','Organic recurrence counts describe six snapshots, not traffic, demand, links or market share.','Directory/listicle, official-network, forum and workshop pages are different intents and are not interchangeable competitors.'],observations,recurringDomains:recurring};
await mkdir(here,{recursive:true});await writeFile(resolve(here,'organic-snapshot-summary.json'),JSON.stringify(result,null,2)+'\n');
const csv=rows=>rows.map(row=>row.map(v=>'"'+String(v??'').replaceAll('"','""')+'"').join(',')).join('\r\n')+'\r\n';
await writeFile(resolve(here,'six-query-organic-comparison.csv'),csv([['query','captured_at_utc','country_bias','google_ip_location','headed_web_results','digitec_observed_urls','other_observed_urls','scope'],...observations.map(o=>[o.query,o.capturedAtUtc,o.requestedCountry,'Al Qouz Ind.third, Dubai',o.organicHeadedResultCount,o.digitecOrganicUrls.join(' | '),o.organicUrlsInObservedAnchorOrder.filter(u=>new URL(u).hostname!=='digitecme.com').join(' | '),'single desktop snapshot; no formal rank; ads/local/AI/owner panel excluded'])]));
console.log(JSON.stringify({queries:observations.length,digitecObserved:observations.filter(o=>o.digitecObserved).map(o=>({query:o.query,urls:o.digitecOrganicUrls})),recurring}));
