from pathlib import Path
root=Path(__file__).resolve().parents[2]
p=root/'src/pages/CeramicCoatingPage.tsx';s=p.read_text('utf-8')
old='Compare quotes using the same preparation, surfaces and product terms. Share your make, model, year and paint concerns to start the conversation; an inspection may be needed for an exact scope.'
new=old+'</p><h3>What should your coating quote identify?</h3><p>Ask for the selected coating, the panels and additional surfaces included, the agreed preparation or correction, workshop time and product-specific curing and first-wash guidance. If PPF is already fitted, confirm compatibility separately. A quoted layer count alone does not describe the preparation, protection or maintenance required.'
assert old in s;s=s.replace(old,new);p.write_text(s,'utf-8')
p=root/'src/components/BrandPaintCareLinks.tsx';s=p.read_text('utf-8')
marker='const contexts: Record<string, { introduction: string; filmAnchor: string; next: string; href: string; anchor: string; ending: string }> = {'
extra="""
  Audi: { introduction: 'Before choosing protection for your Audi, assess the finish and compare ', filmAnchor: 'paint protection film coverage', next: '. For swirls or haze, discuss ', href: '/services/car-polishing-dubai', anchor: 'paint correction', ending: ' before the preparation and protection are agreed.' },
  Bentley: { introduction: 'The paint history and finish on your Bentley guide the choice of ', filmAnchor: 'physical film protection', next: '. If finish maintenance is the priority, compare ', href: '/services/ceramic-coating', anchor: 'ceramic coating and its care requirements', ending: ' for the surfaces you want treated.' },
"""
assert marker in s;s=s.replace(marker,marker+extra);p.write_text(s,'utf-8')
