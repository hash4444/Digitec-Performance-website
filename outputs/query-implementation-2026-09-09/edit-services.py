from pathlib import Path
import re
ROOT=Path(__file__).resolve().parents[2]
p=ROOT/'src/data/services.ts';s=p.read_text('utf-8')
changes={
 'oil-change-dubai':("Book an Oil Change","Send the model, year, mileage and service history. Oil approval, quantity, filter and any due maintenance are confirmed for the fitted engine before the estimate is agreed.", [('Car service and maintenance','/services/car-service-dubai'),('Mercedes oil service','/services/mercedes-oil-change-dubai'),('BMW oil service','/brands/bmw-service-dubai/oil-change')]),
 'steering-repair-dubai':("Request a Steering Inspection","Describe when the steering becomes heavy, noisy or loose, and mention recent tyre, alignment or suspension work. The inspection distinguishes rack or assistance faults from joints, tyres and geometry before repair or replacement is quoted.",[('Suspension and alignment considerations','/services/suspension-repair-dubai'),('Porsche steering inspection','/brands/porsche-service-dubai/steering-repair'),('Mercedes steering inspection','/services/mercedes-steering-repair-dubai')]),
 'exhaust-repair-dubai':("Request an Exhaust Inspection","Share the vehicle details and whether the concern is noise, a leak, vibration or a warning. The quote separates the affected joints, pipework, silencer or control components. Performance changes require a separate compatibility and scope discussion.",[('Performance exhaust and tuning assessment','/tuning'),('Mechanical inspection','/services/mechanical-repair-dubai')]),
 'suspension-repair-dubai':("Request a Suspension Inspection","Tell us which corner sits low, when the noise occurs and whether a warning is displayed. Parts, ride-height calibration and alignment are quoted only where the fitted system and findings require them.",[('Steering and rack inspection','/services/steering-repair-dubai'),('Mercedes AIRMATIC assessment','/services/mercedes-suspension-repair-dubai'),('Porsche suspension assessment','/brands/porsche-service-dubai/suspension-repair')]),
 'brake-repair-dubai':("Request a Brake Inspection","Describe the warning, noise or change in pedal feel. Pad and disc measurements, fluid condition, fitted hardware and required electronic functions determine the repair and estimate.",[('BMW brake inspection','/brands/bmw-service-dubai/brake-repair'),('Mercedes brake service','/services/mercedes-brake-repair-dubai')]),
 'battery-replacement-dubai':("Request a Battery Check","Tell us the model, year and whether the concern is slow starting, a warning or repeated discharge. Testing determines whether replacement or further fault diagnosis is appropriate. Workshop availability is confirmed before visiting; mobile delivery is not included by default.",[('Electrical fault diagnosis','/services/auto-electrical-repair-dubai'),('Mercedes battery assessment','/services/mercedes-battery-replacement-dubai')]),
 'fuel-system-repair-dubai':("Request Fuel-System Diagnosis","Share the starting or running symptom, any warning and recent repairs. Test requirements, the fitted fuel system and findings determine injector, pump, line or control work and its cost.",[('Engine and control-system diagnostics','/services/car-diagnostics-dubai')]),
 'mechanical-repair-dubai':("Request a Mechanical Inspection","Share the model, year, mileage and when the noise, leak or drivability concern occurs. The findings determine the next test and whether component repair or more detailed investigation is appropriate.",[('Steering and rack repair','/services/steering-repair-dubai'),('Exhaust leak and silencer repair','/services/exhaust-repair-dubai'),('Suspension inspection','/services/suspension-repair-dubai')]),
 'paint-protection-dubai':("Discuss Paint Protection Options","Start with the paint condition and your priority: improving existing marks, adding a physical film barrier or making finish maintenance easier. Preparation, covered surfaces and product compatibility should be agreed together.",[]),
}
def tsquote(v):return "'"+v.replace('\\','\\\\').replace("'","\\'")+"'"
for slug,(label,guidance,links) in changes.items():
 marker=f"    slug: '{slug}',"
 assert s.count(marker)==1,slug
 extra=f"\n    ctaLabel: {tsquote(label)},\n    quoteGuidance: {tsquote(guidance)},"
 if links:extra+='\n    relatedServiceLinks: ['+', '.join('{ label: '+tsquote(label)+', path: '+tsquote(path)+' }' for label,path in links)+'],'
 s=s.replace(marker,marker+extra)
replacements={
 'Steering Repair Dubai | Power Steering, Rack & EPS':'Power Steering & Rack Repair Dubai | DIGI-TEC',
 'Exhaust Repair Dubai | Cat, Muffler, DPF & Performance':'Exhaust & Muffler Repair Dubai | DIGI-TEC',
 'Car Oil Change Dubai | Vehicle-Specified Oil & Filter | Digi-Tec':'Car Oil Change Dubai | Oil & Filter Service | DIGI-TEC',
 "title: 'Oil Change in Dubai'":"title: 'Car Oil Change in Dubai'",
 'Exhaust inspection and repair in Dubai for leaks, mufflers, sensors, catalysts, DPF concerns and compatible performance systems.':'Exhaust and muffler repair in Al Quoz, Dubai. Assessment of leaks, noise, sensors and catalyst or DPF concerns before repair is quoted at DIGI-TEC.'
}
for old,new in replacements.items():assert old in s,old;s=s.replace(old,new)
p.write_text(s,'utf-8')
p=ROOT/'src/pages/BrandPage.tsx';s=p.read_text('utf-8');s=s.replace("{isArabic ? 'واتساب الآن' : 'WhatsApp Now'}", "{isArabic ? 'واتساب الآن' : isMercedesServiceHub ? 'Book Mercedes Service' : `Request ${brand.name} Service`}");p.write_text(s,'utf-8')
