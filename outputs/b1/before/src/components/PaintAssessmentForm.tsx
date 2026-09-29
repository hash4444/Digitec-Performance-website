import { useEffect, useRef, useState, type FormEvent } from 'react';
import { MessageCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { trackWhatsAppClick } from '@/lib/whatsapp-tracking';
import { paintConcerns, paintWhatsappHref } from '@/data/paintCorrectionContent';

export default function PaintAssessmentForm() {
  const [values, setValues] = useState({ brand: '', model: '', year: '', concern: 'Not sure / Need assessment' });
  const [error, setError] = useState('');
  const [opening, setOpening] = useState(false);
  const started = useRef(false);
  const submitting = useRef(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
    const resetSubmission = () => { submitting.current = false; setOpening(false); };
    window.addEventListener('pageshow', resetSubmission);
    return () => window.removeEventListener('pageshow', resetSubmission);
  }, []);
  const track = (name: string) => window.gtag?.('event', name, {
    page_path: window.location.pathname,
    service: 'paint_correction', form_id: 'paint-assessment-form', cta_placement: 'paint_assessment',
  });
  const update = (key: keyof typeof values, value: string) => {
    if (!started.current) { started.current = true; track('quote_started'); }
    submitting.current = false;
    setOpening(false);
    setError('');
    setValues((current) => ({ ...current, [key]: value }));
  };
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!values.brand.trim() || !values.model.trim()) { setError('Please enter your vehicle brand and model.'); return; }
    if (submitting.current) return;
    const message = `Paint assessment request from digitecme.com\nVehicle brand: ${values.brand.trim()}\nModel: ${values.model.trim()}\nYear: ${values.year}\nMain concern: ${values.concern}\nI would like advice on polishing or paint correction. I can attach photos in this chat. Please confirm whether an in-person assessment is needed and advise on the scope and price.`;
    const href = paintWhatsappHref(message);
    // Uses the established button-based booking flow, without a second anchor
    // event or any entered values in analytics. Photos are attached in WhatsApp.
    submitting.current = true;
    setOpening(true);
    trackWhatsAppClick(href);
    track('whatsapp_draft_opened');
    window.location.assign(href);
  };
  return (
    <form id="paint-assessment-form" className="paint-form" onSubmit={submit} aria-describedby="paint-form-privacy">
      <div className="paint-form-fields">
        <div><label htmlFor="paint-brand">Vehicle brand</label><input id="paint-brand" required maxLength={60} autoComplete="off" placeholder="e.g. Mercedes-Benz" value={values.brand} onChange={(e) => update('brand', e.target.value)} /></div>
        <div><label htmlFor="paint-model">Vehicle model</label><input id="paint-model" required maxLength={80} autoComplete="off" placeholder="e.g. G 63" value={values.model} onChange={(e) => update('model', e.target.value)} /></div>
        <div><label htmlFor="paint-year">Year</label><input id="paint-year" required type="number" inputMode="numeric" min={1900} max={new Date().getFullYear() + 1} step={1} placeholder="e.g. 2024" value={values.year} onChange={(e) => update('year', e.target.value)} /></div>
        <div><label id="paint-concern-label" htmlFor="paint-concern">Main concern</label><Select value={values.concern} onValueChange={(value) => update('concern', value)}><SelectTrigger id="paint-concern" aria-labelledby="paint-concern-label" className="paint-select"><SelectValue /></SelectTrigger><SelectContent>{paintConcerns.map((concern) => <SelectItem key={concern} value={concern}>{concern}</SelectItem>)}</SelectContent></Select></div>
      </div>
      {error && <p role="alert">{error}</p>}
      <button className="paint-button paint-primary" type="submit" disabled={!ready || opening}><MessageCircle size={19} aria-hidden="true" />{opening ? 'Opening WhatsApp…' : 'Continue to WhatsApp'}</button>
      <p id="paint-form-privacy" className="paint-note">Review the draft and add photos in WhatsApp before sending. No name, phone number or registration is required here. <a href="/privacy-policy.pdf" target="_blank" rel="noopener noreferrer">Privacy policy</a></p>
      <noscript><p>Use a WhatsApp link or call the workshop to request your assessment.</p></noscript>
    </form>
  );
}
