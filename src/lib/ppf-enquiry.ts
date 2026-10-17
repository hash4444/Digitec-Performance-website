/** Restricted, self-reported acquisition context for a WhatsApp draft only.
 * Never treats client labels or an enquiry reference as proof of receipt/sale.
 * No persistence, network access or analytics emission belongs in this module.
 */
const sources = new Set(['google', 'bing', 'chatgpt', 'openai', 'perplexity', 'gemini', 'claude', 'copilot', 'duckduckgo', 'instagram', 'facebook', 'youtube', 'newsletter', 'whatsapp']);
const media = new Set(['organic', 'cpc', 'ppc', 'paid_search', 'paid_social', 'social', 'email', 'referral', 'display', 'direct', 'organic_social']);
const landingPaths = new Set(['/', '/ar', '/services', '/ar/services', ...['/services/paint-protection-film', '/services/paint-protection-dubai', '/services/ceramic-coating', '/blog/ceramic-coating-vs-ppf-dubai'].flatMap(path => [path, '/ar' + path]), '/services/car-polishing-dubai']);
const searchGroups = new Set(['ppf_general', 'ppf_full_body', 'ppf_quote']);
const safeLabel = (value: unknown, allowed: Set<string>) => typeof value === 'string' && allowed.has(value.toLowerCase().trim()) ? value.toLowerCase().trim() : 'unknown';

export interface PpfEnquiryContext {
  source: string;
  medium: string;
  campaign: string;
  ad_group: string;
  landing_page: string;
}

export function buildPpfEnquiryContext(href: string, firstTouch: unknown = {}): PpfEnquiryContext {
  const url = new URL(href);
  const stored = firstTouch && typeof firstTouch === 'object' && !Array.isArray(firstTouch) ? firstTouch as Record<string, unknown> : {};
  // A tagged current visit is kept together. Never attach a current campaign to
  // source/medium/landing from a different stored first-touch visit.
  const tagged = url.searchParams.has('utm_source') || url.searchParams.has('utm_medium') || url.searchParams.has('utm_campaign');
  const source = safeLabel(tagged ? url.searchParams.get('utm_source') : stored.utm_source, sources);
  const medium = safeLabel(tagged ? url.searchParams.get('utm_medium') : stored.utm_medium, media);
  let landing = tagged ? url.href : typeof stored.landing_page === 'string' ? stored.landing_page : url.href;
  try {
    const parsed = new URL(landing, url.origin);
    landing = parsed.origin === url.origin && landingPaths.has(parsed.pathname) ? parsed.pathname : 'unknown';
  } catch { landing = 'unknown'; }
  let campaign = 'unknown';
  let adGroup = 'unknown';
  const candidate = url.searchParams.get('utm_campaign');
  const group = url.searchParams.get('utm_content');
  if (tagged && source === 'google' && ['cpc', 'ppc', 'paid_search'].includes(medium) && candidate === 'ppf_search') {
    campaign = candidate;
    if (group && searchGroups.has(group)) adGroup = group;
  } else if (tagged && ['facebook', 'instagram'].includes(source) && medium === 'paid_social' && ['ppf_meta_prospecting', 'ppf_meta_retargeting'].includes(candidate ?? '')) {
    campaign = candidate!;
    const expectedGroup = candidate === 'ppf_meta_prospecting' ? 'ppf_prospecting' : 'ppf_retargeting';
    if (group === expectedGroup) adGroup = group;
  }
  return { source, medium, campaign, ad_group: adGroup, landing_page: landing };
}

export function createPpfEnquiryReference(random: Pick<Crypto, 'getRandomValues'> = crypto): string {
  const bytes = random.getRandomValues(new Uint8Array(12));
  return 'PPF-' + Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('').toUpperCase();
}

export function ppfReferenceLines(reference: string, context: PpfEnquiryContext): string[] {
  return [
    'Enquiry reference: ' + reference,
    'Reported source / medium: ' + context.source + ' / ' + context.medium,
    'Reported campaign / ad group: ' + context.campaign + ' / ' + context.ad_group,
    'Landing page: ' + context.landing_page,
  ];
}
