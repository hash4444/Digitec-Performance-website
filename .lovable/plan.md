

## Add Founder's Message Section to VRX Page

### Placement
Between the "Series vs GAD VRX" comparison table and the final CTA section.

### Layout (matching the screenshot reference)
A light/off-white background section with a 3-column layout:

1. **Left column**: Two VRX car images stacked vertically with "V-CLASS VRX" label and a "Watch video" link
2. **Center column**: Large photo of Sebastian Daminger (founder)
3. **Right column**: Headline, two paragraphs of copy, a red italic quote, signature image, and name/title

On mobile: stack vertically (images → founder photo → text).

### Assets needed
- Copy the uploaded screenshot as reference only (not embedded)
- Will need the founder's photo, car thumbnails, and signature as separate images. Since we only have the screenshot, we'll use placeholder structure and the screenshot crops or placeholder paths (`/images/vrx-founder.jpg`, `/images/vrx-signature.png`, etc.) that can be replaced later with real assets.

### Content (from screenshot, removing dashes per memory rules)
- Headline: "WE WERE READY TO TAKE THE LEAD IN DEVELOPING A PREMIUM VAN OURSELVES."
- Body paragraphs about the VRX vision
- Red quote: *"We don't sell cars. At GAD, we build them for those who never ask 'Why?' because they know there is no other level for them."*
- Signed by: Sebastian Daminger, GAD-MOTORS

### Technical Changes
- **`src/pages/VRX.tsx`**: Add a new section between the comparison table and CTA section with the 3-column responsive grid layout, using a light background (`bg-[#f0eeee]` or similar) to match the screenshot's off-white tone.

