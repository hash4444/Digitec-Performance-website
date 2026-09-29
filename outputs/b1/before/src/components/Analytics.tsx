import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { safeWhatsAppUrl, trackWhatsAppClick } from '@/lib/whatsapp-tracking';
import { analyticsPageUrl, analyticsReferrer, ATTRIBUTION_KEY, buildAttribution, sanitizeAttribution, type ContactAttribution } from '@/lib/contact-attribution';

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

const readAttribution = (): ContactAttribution => {
  try {
    const stored = window.sessionStorage.getItem(ATTRIBUTION_KEY);
    const attribution = stored
      ? sanitizeAttribution(JSON.parse(stored), window.location.origin)
      : buildAttribution(window.location.href, document.referrer);
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
  const attribution = useRef<ContactAttribution>({});

  useEffect(() => {
    attribution.current = readAttribution();
  }, []);

  useEffect(() => {
    const pageContext = {
      page_location: analyticsPageUrl(window.location.href, window.location.origin),
      page_referrer: analyticsReferrer(document.referrer),
    };
    // Keep automatic events aligned with the current SPA route as well.
    window.gtag?.('set', pageContext);
    if (initialPageView.current) {
      initialPageView.current = false;
      return;
    }
    window.gtag?.('event', 'page_view', {
      page_title: document.title,
      ...pageContext,
      page_path: pathname,
      ...attribution.current,
    });
  }, [pathname, search]);

  useEffect(() => {
    const trackContact = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest('a[href]') : null;
      if (!(target instanceof HTMLAnchorElement)) return;
      const method = contactMethod(target.href);
      if (!method) return;
      if (method === 'whatsapp') trackWhatsAppClick(target.href);
      window.gtag?.('event', contactEvent[method], {
        method,
        link_url: method === 'whatsapp' ? safeWhatsAppUrl(target.href) : target.href,
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
