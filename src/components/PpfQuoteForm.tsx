import { useEffect, useRef, useState, type FormEvent } from 'react';
import { MessageCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { trackWhatsAppClick } from '@/lib/whatsapp-tracking';
import { ppfCoverage } from '@/data/ppfContent';

export default function PpfQuoteForm() {
  const [values, setValues] = useState({ brand: '', model: '', year: '', coverage: 'Full Body' });
  const [error, setError] = useState('');
  const started = useRef(false);
  const submitting = useRef(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
    const resetSubmission = () => { submitting.current = false; };
    window.addEventListener('pageshow', resetSubmission);
    return () => window.removeEventListener('pageshow', resetSubmission);
  }, []);
  const track = (event: string) => window.gtag?.('event', event, {
    page_path: window.location.pathname, form_id: 'ppf-quote-form', cta_placement: 'ppf_quote', service: 'ppf',
  });
  const update = (key: keyof typeof values, value: string) => {
    if (!started.current) { started.current = true; track('quote_started'); }
    submitting.current = false;
    setValues((current) => ({ ...current, [key]: value }));
    setError('');
  };
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!values.brand.trim() || !values.model.trim()) {
      setError('Please enter your vehicle brand and model.');
      return;
    }
    if (submitting.current) return;
    submitting.current = true;
    const message = `PPF quote request from digitecme.com\nVehicle brand: ${values.brand.trim()}\nModel: ${values.model.trim()}\nYear: ${values.year}\nRequested coverage: ${values.coverage}\nPlease confirm panel coverage, film options, preparation, price and installation time.`;
    const url = `https://wa.me/97143402223?text=${encodeURIComponent(message)}`;
    // Button submission does not bubble through the global anchor click tracker.
    // Use the established booking-form path once, with no entered values in events.
    trackWhatsAppClick(url);
    track('whatsapp_draft_opened');
    window.location.assign(url);
  };
  return (
    <form id="ppf-quote-form" className="ppf-form" onSubmit={submit} aria-describedby="ppf-privacy">
      <div className="ppf-form-grid">
        <div><label htmlFor="ppf-brand">Vehicle brand</label><input id="ppf-brand" name="vehicle_brand" required maxLength={60} value={values.brand} onChange={(e) => update('brand', e.target.value)} placeholder="e.g. Porsche" autoComplete="off" /></div>
        <div><label htmlFor="ppf-model">Vehicle model</label><input id="ppf-model" name="vehicle_model" required maxLength={80} value={values.model} onChange={(e) => update('model', e.target.value)} placeholder="e.g. 911 Carrera" autoComplete="off" /></div>
        <div><label htmlFor="ppf-year">Year</label><input id="ppf-year" name="vehicle_year" type="number" inputMode="numeric" required min={1900} max={new Date().getFullYear() + 1} step={1} value={values.year} onChange={(e) => update('year', e.target.value)} placeholder="e.g. 2025" /></div>
        <div><label id="ppf-coverage-label" htmlFor="ppf-requested-coverage">Requested coverage</label><Select value={values.coverage} onValueChange={(value) => update('coverage', value)}><SelectTrigger id="ppf-requested-coverage" aria-labelledby="ppf-coverage-label" className="ppf-select"><SelectValue /></SelectTrigger><SelectContent>{ppfCoverage.map(({ name }) => <SelectItem key={name} value={name}>{name}</SelectItem>)}</SelectContent></Select></div>
      </div>
      {error && <p role="alert">{error}</p>}
      <button type="submit" disabled={!ready} className="ppf-button ppf-button-primary"><MessageCircle size={19} aria-hidden="true" />Continue to WhatsApp</button>
      <p id="ppf-privacy" className="ppf-small">Opens a WhatsApp draft with these vehicle details. Review and send it to request your quote. No name or phone number is needed here. <a href="/privacy-policy.pdf" target="_blank" rel="noopener noreferrer">Privacy policy</a></p>
      <noscript><p>Please use the WhatsApp or call links on this page to request your quote.</p></noscript>
    </form>
  );
}
