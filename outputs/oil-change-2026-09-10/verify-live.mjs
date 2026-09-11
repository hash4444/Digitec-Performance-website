import { writeFile } from 'node:fs/promises';
const dir = 'outputs/oil-change-2026-09-10';
const paths = ['/services/oil-change-dubai', '/brands/bmw-service-dubai/oil-change', '/sitemap.xml'];
const checks = [];
for (const route of paths) {
  try {
    const response = await fetch(`https://digitecme.com${route}`, {headers:{'cache-control':'no-cache'}, signal:AbortSignal.timeout(30000)});
    const body = await response.text();
    await writeFile(`${dir}/live-${route.slice(1).replaceAll('/','__')}.txt`, body);
    checks.push({route,status:response.status,finalUrl:response.url,title:body.match(/<title>(.*?)<\/title>/s)?.[1],dedicatedOilPage:route.includes('services/oil-change-dubai') ? body.includes('class="oil-page"') : undefined,returnLink:route.includes('/bmw-') ? body.includes('car oil and filter change in Dubai') : undefined,newOilSitemapDate:route==='/sitemap.xml' ? /<loc>https:\/\/digitecme.com\/services\/oil-change-dubai<\/loc>\s*<lastmod>2026-09-10<\/lastmod>/.test(body) : undefined});
  } catch(error) {checks.push({route,error:error.message});}
}
const result={checkedAt:new Date().toISOString(),checks};
await writeFile(`${dir}/live-verification.json`,JSON.stringify(result,null,2));
console.log(JSON.stringify(result));
