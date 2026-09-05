import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const contactMethod = (href: string): string | null => {
  const normalized = href.toLowerCase();
  if (normalized.startsWith('tel:')) return 'phone';
  if (normalized.startsWith('mailto:')) return 'email';
  if (normalized.includes('wa.me/') || normalized.includes('whatsapp.com/')) return 'whatsapp';
  if (normalized.includes('maps.google.')) return 'directions';
  return null;
};

const contactEvent: Record<string, string> = {
  phone: 'telephone_link_clicked',
  email: 'email_link_clicked',
  whatsapp: 'whatsapp_chat_opened',
  directions: 'directions_clicked',
};

type Attribution = Record<string, string>;
const ATTRIBUTION_KEY = 'digitec_first_touch';

const classifyAiReferrer = (value: string) => {
  const host = value.toLowerCase();
  if (host.includes('chatgpt.com') || host.includes('openai.com')) return 'chatgpt';
  if (host.includes('perplexity.ai')) return 'perplexity';
  if (host.includes('copilot.microsoft.com') || host.includes('bing.com/chat')) return 'copilot';
  if (host.includes('gemini.google.com') || host.includes('bard.google.com')) return 'gemini';
  if (host.includes('claude.ai')) return 'claude';
  return '';
};

const readAttribution = (): Attribution => {
  try {
    const stored = window.sessionStorage.getItem(ATTRIBUTION_KEY);
    if (stored) return JSON.parse(stored) as Attribution;

    const params = new URLSearchParams(window.location.search);
    const attribution: Attribution = {
      landing_page: window.location.href,
      initial_referrer: document.referrer || 'direct',
    };
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid']
      .forEach((key) => {
        const value = params.get(key);
        if (value) attribution[key] = value;
      });
    const aiReferrer = classifyAiReferrer(
      `${params.get('utm_source') ?? ''} ${document.referrer}`,
    );
    if (aiReferrer) attribution.ai_referrer = aiReferrer;
    window.sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(attribution));
    return attribution;
  } catch {
    return {};
  }
};

/** SPA page views and high-intent contact clicks for the existing GA4 property. */
const Analytics = () => {
  const { pathname, search } = useLocation();
  const initialPageView = useRef(true);
  const attribution = useRef<Attribution>({});

  useEffect(() => {
    attribution.current = readAttribution();
  }, []);

  useEffect(() => {
    if (initialPageView.current) {
      initialPageView.current = false;
      return;
    }
    window.gtag?.('event', 'page_view', {
      page_title: document.title,
      page_location: window.location.href,
      page_path: `${pathname}${search}`,
      ...attribution.current,
    });
  }, [pathname, search]);

  useEffect(() => {
    const trackContact = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest('a[href]') : null;
      if (!(target instanceof HTMLAnchorElement)) return;
      const method = contactMethod(target.href);
      if (!method) return;
      window.gtag?.('event', contactEvent[method], {
        method,
        link_url: target.href,
        page_path: window.location.pathname,
        cta_placement: target.dataset.ctaPlacement || 'unspecified',
        ...attribution.current,
      });
    };

    document.addEventListener('click', trackContact);
    return () => {
      document.removeEventListener('click', trackContact);
    };
  }, []);

  return null;
};

export default Analytics;
