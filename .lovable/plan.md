

## Plan: Connect All CTA Buttons to WhatsApp

Currently, only the PPF/Ceramic section's "Get a Free Quote" button links to WhatsApp. Several other buttons across the site are not connected. Here's what will be updated:

### Buttons to connect

| Component | Button | WhatsApp Message |
|-----------|--------|-----------------|
| **Hero** | "Book Appointment" | "Hi, I'd like to book an appointment at Digi-Tec Performance Center." |
| **Hero** | "Get a Free Diagnosis" | "Hi, I'm interested in getting a free diagnosis for my vehicle." |
| **FinalCTA** | "Schedule Your Consultation" | "Hi, I'd like to schedule a consultation at Digi-Tec Performance Center." |
| **FinalCTA** | "Call +971 4 340 2223" | Direct phone link (`tel:+97143402223`) — not WhatsApp |
| **Footer** | "Book Appointment" link | "Hi, I'd like to book an appointment." |
| **PPFCeramicSection** | Already connected | No change needed |

### Technical approach

- Convert each `<Button>` to an `<a>` tag (or wrap it) linking to `https://wa.me/97143402223?text=...` with `target="_blank"` and `rel="noopener noreferrer"`
- The "Call" button will use `tel:+97143402223` instead of WhatsApp
- All WhatsApp messages will be URL-encoded

### Files to edit
1. `src/components/Hero.tsx` — both buttons
2. `src/components/FinalCTA.tsx` — both buttons
3. `src/components/Footer.tsx` — "Book Appointment" link

