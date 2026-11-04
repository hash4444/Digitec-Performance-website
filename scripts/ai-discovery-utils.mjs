// Shared, dependency-free checks for local HTML and read-only HTTP probes.
// A probe carrying a crawler's name does not verify access from that crawler.
export const SITE_ORIGIN = 'https://digitecme.com';
export const DISCOVERY_AGENTS = ['OAI-SearchBot', 'Googlebot', 'Google-Extended', 'bingbot'];
export const PRIORITY_PATHS = [
  '/',
  '/brands/mercedes-benz-service-dubai',
  '/services/mercedes-diagnostics-dubai',
  '/services/mercedes-transmission-repair-dubai',
  '/services/mercedes-suspension-repair-dubai',
  '/mercedes/problems',
  '/mercedes/problems/airmatic-malfunction',
  '/mercedes/problems/gearbox-jerking',
  '/tuning',
  '/tuning/mercedes-amg-g63',
  '/tuning/mercedes-amg-c63',
  '/tuning/mercedes-amg-gt',
  '/ar/brands/mercedes-benz-service-dubai',
];

export const decodeHtml = value => String(value)
  .replace(/&#x([\da-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
  .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
  .replace(/&quot;/g, '"').replace(/&#39;/g, "'")
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ');
const attribute = (tag, name) => decodeHtml(tag.match(new RegExp(`(?:^|\\s)${name}\\s*=\\s*["']([^"']*)["']`, 'i'))?.[1] ?? '');
const cleanText = html => decodeHtml(html.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();

export function inspectHtml(html) {
  const metas = [...html.matchAll(/<meta\b[^>]*>/gi)].map(match => match[0]);
  const links = [...html.matchAll(/<link\b[^>]*>/gi)].map(match => match[0]);
  const body = html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? '';
  const robots = metas.filter(tag => /^(robots|googlebot|bingbot|oai-searchbot)$/i.test(attribute(tag, 'name')))
    .map(tag => ({ agent: attribute(tag, 'name'), content: attribute(tag, 'content') }));
  const jsonLdErrors = [];
  const nodes = [];
  for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    if (attribute(match[1], 'type') !== 'application/ld+json') continue;
    try {
      const document = JSON.parse(match[2]);
      nodes.push(...(Array.isArray(document) ? document : document['@graph'] ?? [document]));
    } catch (error) { jsonLdErrors.push(error.message); }
  }
  const initialText = cleanText(body.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, ''));
  return {
    title: cleanText(html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? ''),
    description: metas.filter(tag => attribute(tag, 'name').toLowerCase() === 'description').map(tag => attribute(tag, 'content')),
    canonical: links.filter(tag => attribute(tag, 'rel').toLowerCase() === 'canonical').map(tag => attribute(tag, 'href')),
    h1: [...body.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map(match => cleanText(match[1])),
    robots,
    restricted: robots.some(({ content }) => /(?:^|[,\s])(?:noindex|none|nosnippet)(?:$|[,\s])|max-snippet\s*:\s*0(?:$|[,\s])/i.test(content)),
    textLength: initialText.length,
    jsonLdErrors,
    schemaTypes: [...new Set(nodes.flatMap(node => [].concat(node['@type'] ?? [])))],
  };
}

export function parseRobots(text) {
  const groups = [];
  const sitemaps = [];
  let group;
  let hasRules = false;
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.replace(/#.*/, '').trim();
    const separator = line.indexOf(':');
    if (separator < 0) continue;
    const field = line.slice(0, separator).trim().toLowerCase();
    const value = line.slice(separator + 1).trim();
    if (field === 'sitemap') { sitemaps.push(value); continue; }
    if (field === 'user-agent') {
      if (!group || hasRules) { group = { agents: [], rules: [] }; groups.push(group); hasRules = false; }
      group.agents.push(value.toLowerCase());
    } else if (group && ['allow', 'disallow'].includes(field)) {
      hasRules = true;
      if (value) group.rules.push({ allow: field === 'allow', pattern: value });
    }
  }
  return { groups, sitemaps };
}

export function robotsPermission(parsed, agent, pathname) {
  const token = agent.toLowerCase();
  const matches = parsed.groups.map(group => ({
    ...group,
    specificity: Math.max(-1, ...group.agents.filter(value => value !== '*' && token.includes(value)).map(value => value.length)),
  }));
  const longest = Math.max(-1, ...matches.map(group => group.specificity));
  const applicable = longest >= 0
    ? matches.filter(group => group.specificity === longest)
    : matches.filter(group => group.agents.includes('*'));
  const rules = applicable.flatMap(group => group.rules).filter(rule => {
    const end = rule.pattern.endsWith('$');
    const pattern = (end ? rule.pattern.slice(0, -1) : rule.pattern)
      .split('*').map(part => part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('.*');
    return new RegExp(`^${pattern}${end ? '$' : ''}`).test(pathname);
  }).sort((a, b) => b.pattern.replace(/[*$]/g, '').length - a.pattern.replace(/[*$]/g, '').length || Number(b.allow) - Number(a.allow));
  return { allowed: rules[0]?.allow ?? true, matchedRule: rules[0] ?? null };
}

export const markdownLinks = text => [...text.matchAll(/\[[^\]]+\]\((https?:\/\/[^\s)]+)\)/g)].map(match => match[1]);
export const sitemapLinks = xml => [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)].map(match => decodeHtml(match[1]));

export function htmlChecks(page, pathname) {
  return {
    title: Boolean(page.title),
    description: page.description.length === 1 && Boolean(page.description[0]),
    oneH1: page.h1.length === 1 && Boolean(page.h1[0]),
    canonical: page.canonical.length === 1 && page.canonical[0] === `${SITE_ORIGIN}${pathname === '/' ? '/' : pathname}`,
    snippetEligible: !page.restricted,
    initialHtml: page.textLength >= 700,
    structuredData: page.jsonLdErrors.length === 0 && page.schemaTypes.length > 0
      && (['/', '/ar'].includes(pathname) || page.schemaTypes.includes('BreadcrumbList')),
  };
}
