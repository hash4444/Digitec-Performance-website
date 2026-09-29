export type ContactAttribution = Record<string, string>;
export const ATTRIBUTION_KEY = 'digitec_first_touch';

/** Keep route attribution without copying enquiry parameters or fragments. */
export const analyticsPageUrl = (value: string, origin: string): string => {
  try {
    const url = new URL(value, origin);
    return url.origin === origin ? `${url.origin}${url.pathname}` : origin;
  } catch {
    return origin;
  }
};

export const analyticsReferrer = (value: string): string => {
  if (!value || value === 'direct') return 'direct';
  try {
    const url = new URL(value);
    return ['http:', 'https:'].includes(url.protocol) ? url.origin : 'direct';
  } catch {
    return 'direct';
  }
};

const sources = new Set(['google', 'bing', 'chatgpt', 'openai', 'perplexity', 'gemini', 'claude', 'copilot', 'duckduckgo', 'instagram', 'facebook', 'youtube', 'newsletter', 'whatsapp']);
const media = new Set(['organic', 'cpc', 'ppc', 'paid_search', 'paid_social', 'social', 'email', 'referral', 'display', 'direct', 'organic_social']);
const safeLabel = (value: unknown, allowed: Set<string>): string => {
  const normalized = typeof value === 'string' ? value.toLowerCase().trim().replace(/^www\./, '').replace(/\.com$/, '') : '';
  return allowed.has(normalized) ? normalized : '';
};

export function sanitizeAttribution(value: unknown, origin: string): ContactAttribution {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  const input = value as Record<string, unknown>;
  const output: ContactAttribution = {};
  if (typeof input.landing_page === 'string') output.landing_page = analyticsPageUrl(input.landing_page, origin);
  output.initial_referrer = analyticsReferrer(typeof input.initial_referrer === 'string' ? input.initial_referrer : '');
  const source = safeLabel(input.utm_source, sources);
  const medium = safeLabel(input.utm_medium, media);
  if (source) output.utm_source = source;
  if (medium) output.utm_medium = medium;

  const referrerHost = output.initial_referrer === 'direct' ? '' : new URL(output.initial_referrer).hostname;
  const aiHosts: Record<string, string[]> = {
    chatgpt: ['chatgpt.com', 'openai.com'],
    perplexity: ['perplexity.ai'],
    copilot: ['copilot.microsoft.com'],
    gemini: ['gemini.google.com', 'bard.google.com'],
    claude: ['claude.ai'],
  };
  for (const [name, hosts] of Object.entries(aiHosts)) {
    if (source === name || (name === 'chatgpt' && source === 'openai') || hosts.some(host => referrerHost === host || referrerHost.endsWith(`.${host}`))) {
      output.ai_referrer = name;
      break;
    }
  }
  // Arbitrary campaign/content/search terms and legacy stored keys can contain
  // names or enquiry text. They are deliberately not copied into analytics.
  return output;
}

export function buildAttribution(href: string, referrer: string): ContactAttribution {
  const url = new URL(href);
  return sanitizeAttribution({
    landing_page: href,
    initial_referrer: referrer,
    utm_source: url.searchParams.get('utm_source'),
    utm_medium: url.searchParams.get('utm_medium'),
  }, url.origin);
}
