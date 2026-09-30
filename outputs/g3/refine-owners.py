from pathlib import Path
p=Path('outputs/g3/owners.py');s=p.read_text(encoding='utf-8-sig');s=s.replace("unicodedata.normalize('NFKC',s).lower()", "unicodedata.normalize('NFKC',s).lower().replace('paint prtection','paint protection').replace('paint protection films','paint protection film').replace('ceramic coatings','ceramic coating')")
s=s.replace("if brand and cl.startswith", "if 'tint' in q or q == 'protect performance':owner='';support='';family='Outside protection scope';cl='NOT TARGETED — INTENTIONALLY';reason='Window tinting or ambiguous performance wording is not paint protection; retained in evidence reconciliation but not targeted by G3.'\n if brand and cl.startswith")
p.write_text(s,encoding='utf-8')
