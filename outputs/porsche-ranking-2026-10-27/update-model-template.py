from pathlib import Path

p = Path('src/pages/PorscheModelPage.tsx')
s = p.read_text(encoding='utf-8')
pairs = [
    ('<a className="btn-primary" href={whatsapp}>', '<a className="btn-primary" href={whatsapp} data-cta-placement="porsche_model_hero" target="_blank" rel="noopener noreferrer">'),
    ('<a className="btn-secondary" href="tel:+97143402223">', '<a className="btn-secondary" href="tel:+97143402223" data-cta-placement="porsche_model_hero">'),
    ('<section className="py-14 sm:py-20"><div className="mx-auto max-w-7xl px-4 sm:px-6"><h2 className="text-2xl font-black">Continue through the Porsche knowledge centre</h2>', '<PorscheModelBooking modelName={model.name} whatsappHref={whatsapp} />\n      <section className="py-14 sm:py-20"><div className="mx-auto max-w-7xl px-4 sm:px-6"><h2 className="text-2xl font-black">More Porsche service and model guides</h2>'),
]
for old, new in pairs:
    assert s.count(old) == 1, old
    s = s.replace(old, new)
p.write_text(s, encoding='utf-8')
print('Updated Porsche model booking paths and CTA placement.')
