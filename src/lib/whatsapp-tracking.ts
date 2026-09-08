declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

const isWhatsAppUrl = (href: string) => {
  try {
    const url = new URL(href, window.location.origin);
    return url.hostname === 'wa.me' || url.hostname.endsWith('.whatsapp.com');
  } catch {
    return false;
  }
};

const safeWhatsAppUrl = (href: string) => {
  const url = new URL(href, window.location.origin);
  // The prefilled `text` value can contain message content or form data.
  url.search = '';
  url.hash = '';
  return url.href;
};

export const trackWhatsAppClick = (href: string) => {
  if (!isWhatsAppUrl(href)) return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'whatsapp_click',
    link_url: safeWhatsAppUrl(href),
    page_path: window.location.pathname,
  });
};
