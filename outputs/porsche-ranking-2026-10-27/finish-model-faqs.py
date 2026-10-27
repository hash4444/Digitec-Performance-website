from pathlib import Path
p = Path('src/pages/PorscheModelPage.tsx')
s = p.read_text(encoding='utf-8')
old = 'value={`faq-${i}`} className="rounded-2xl border border-white/10 px-5"'
assert s.count(old) == 1
s = s.replace(old, 'value={`faq-${i}`} className="rounded-2xl border border-white/10 px-5 [&>[role=region][data-state=closed]]:hidden"')
old = '<AccordionContent className="leading-relaxed text-white/65">'
assert s.count(old) == 1
s = s.replace(old, '<AccordionContent forceMount className="leading-relaxed text-white/65">')
p.write_text(s, encoding='utf-8')
print('Porsche model FAQ answers render in initial HTML with closed regions hidden.')
