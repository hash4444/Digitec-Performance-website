from pathlib import Path
import json

ROOT = Path(__file__).resolve().parents[2]
def p(text, links=None):
    result = {'type': 'p', 'text': text}
    if links: result['links'] = [{'href': path, 'label': label} for path, label in links]
    return result
def h(text): return {'type': 'h2', 'text': text}
def q(text): return {'type': 'h3', 'text': text}
def ul(*items): return {'type': 'ul', 'items': items}
def replace_record(path, slug, record):
    text = path.read_text(encoding='utf-8')
    start = text.index("  {\n    slug: '" + slug + "'")
    end = text.index("\n  {\n    slug: '", start + 1)
    rendered = json.dumps(record, ensure_ascii=False, indent=2).replace('"__WORKSHOP_IMAGE__"', 'mercedesRepairGuideWorkshop')
    text = text[:start] + '\n'.join('  ' + line for line in rendered.splitlines()) + ',' + text[end:]
    path.write_text(text, encoding='utf-8', newline='\n')

oil = {
 'slug': 'best-oil-change-dubai-mercedes',
 'title': 'How to Choose a Mercedes Oil Change in Dubai',
 'excerpt': 'Compare Mercedes oil-service proposals by engine approval, filter and seals, included checks and completed-work records before you choose a workshop.',
 'category': 'Mercedes', 'author': 'DIGI-TEC Workshop', 'date': '2026-08-13', 'updatedDate': '2026-09-28', 'readTime': '4 min read',
 'coverGradient': 'from-burnt-orange/40 via-charcoal to-black', 'coverImage': '__WORKSHOP_IMAGE__',
 'metaTitle': 'Choosing a Mercedes Oil Change Dubai | Owner Checklist',
 'metaDescription': 'Compare Mercedes oil changes in Dubai: confirm the exact oil approval, filter, included checks, service reset and records before choosing a workshop.',
 'keywords': 'choosing Mercedes oil change Dubai, Mercedes oil approval, oil service checklist, best oil change Dubai Mercedes',
 'ogTitle': 'How to Choose a Mercedes Oil Change in Dubai', 'ogDescription': 'A practical checklist for comparing oil approvals, service scope and records.',
 'ogType': 'article', 'twitterCard': 'summary_large_image', 'twitterTitle': 'Choosing a Mercedes Oil Change in Dubai', 'twitterDescription': 'Questions to ask before approving a Mercedes oil and filter service.',
 'content': [
 h('Compare the proposed work, not just the package name'),
 p('The best oil-service choice for your Mercedes is a proposal matched to the exact engine and due work. Ask each provider to identify the vehicle, specify the oil and filter, and state which checks and records are included. A workshop label or a low headline price does not establish that scope.'),
 h('Confirm the oil approval and the engine application'),
 p('An oil viscosity such as 5W-30 does not, by itself, confirm suitability. The required Mercedes-Benz approval and permitted viscosity must be checked against the exact engine, year and service information. Ask for the product name and approval on the estimate, then check the recorded oil and quantity on the invoice.'),
 p('Mercedes-Benz publishes approved products and application guidance. A product appearing on one approval sheet is not evidence that it suits every Mercedes engine.', [('https://operatingfluids.mercedes-benz.com/', 'Mercedes-Benz operating-fluid approvals')]),
 h('Use the same checklist for each quote'),
 ul('Vehicle identification, applicable oil approval, product and fill quantity.', 'Oil filter and the sealing components required by the engine-specific procedure.', 'Agreed inspection for leaks and any oil-consumption or warning concern you reported.', 'Which additional checks are included, such as other fluid levels, tyres or brakes.', 'Supported service-record handling and reset of the relevant reminder only after the agreed work is complete.', 'Itemised parts, labour, total price, exclusions and a dated invoice with mileage.'),
 h('Separate oil-only work from Service A or Service B'),
 p('An oil and filter change is not automatically the complete scheduled visit. Service A/B scope and additional due items must be checked for the vehicle and its history. Ask which items are included, which are due separately and whether fault diagnosis has its own charge.'),
 p('Use these guides when comparing the wider visit:', [('/blog/mercedes-service-cost-dubai-guide', 'Compare Service A/B scope and cost factors'), ('/blog/mercedes-service-intervals-dubai-heat', 'Check ASSYST and service timing')]),
 h('Describe the way the car is used'),
 p('Mention short trips, extended parking, heavy use and previous oil or cooling concerns. The schedule and any applicable difficult-use guidance should determine the recommendation. Ask why any work is proposed earlier; do not accept one oil interval or grade for every Mercedes in Dubai.'),
 h('Report a warning separately from routine maintenance'),
 p('An oil-pressure warning, abnormal temperature, active leak or unusual engine noise needs assessment under the vehicle handbook instructions. Do not assume an oil change will fix it. Send the exact message and circumstances before booking so the team can distinguish maintenance from diagnostic work.'),
 p('Once the scope is clear, continue to the service owner:', [('/services/mercedes-oil-change-dubai', 'Book a Mercedes oil and filter service'), ('/blog/mercedes-benz-maintenance-guide-dubai', 'Keep a practical maintenance record')]),
 h('FAQs'), q('Can I choose oil from the viscosity alone?'), p('No. Confirm the approval and permitted viscosity for the exact engine and service information. Ask the provider to identify the product and record what was used.'),
 q('How do I compare two different oil-service prices?'), p('Compare the same oil specification and quantity, filter and seals, included checks, labour, tax and exclusions. Check whether either quote includes additional due maintenance or diagnostic work.'),
 q('Does a service-reset message prove the work was completed?'), p('No. Keep the invoice and completed-work record. The reminder should reflect the relevant service actually performed, rather than standing in for evidence of the work.'),
 ]
}
replace_record(ROOT / 'src/data/blogPosts.ts', oil['slug'], oil)

problem = {
 'slug': 'mercedes-repair-dubai-complete-guide', 'title': 'Mercedes Warning Signs in Dubai: An Owner’s Guide',
 'excerpt': 'Recognise Mercedes warning and symptom patterns, record useful evidence and choose the right next assessment without guessing which part has failed.',
 'category': 'Mercedes', 'author': 'DIGI-TEC Workshop', 'date': '2026-04-21', 'updatedDate': '2026-09-28', 'readTime': '6 min read',
 'coverGradient': 'from-burnt-orange/40 via-charcoal to-black', 'coverImage': '__WORKSHOP_IMAGE__',
 'metaTitle': 'Mercedes Problems & Warning Signs Dubai | Owner Guide',
 'metaDescription': 'Mercedes warning signs in Dubai: cooling, AIRMATIC, gearbox, battery, oil leaks and AC symptoms. Record the concern and find the right diagnostic next step.',
 'keywords': 'Mercedes problems Dubai, Mercedes warning signs, Mercedes symptoms, Mercedes owner guide',
 'ogTitle': 'Mercedes Warning Signs in Dubai: An Owner’s Guide', 'ogDescription': 'Understand symptom patterns and the evidence needed before approving a repair.', 'ogType': 'article', 'twitterCard': 'summary_large_image', 'twitterTitle': 'Mercedes Warning Signs: Owner Guide', 'twitterDescription': 'Find the relevant symptom guide and distinguish a warning from scheduled maintenance.',
 'canonicalOverride': 'https://digitecme.com/blog/mercedes-repair-dubai-complete-guide',
 'content': [
 h('Start with the exact warning and what changed'),
 p('A Mercedes warning can have several possible causes. This overview helps you describe the concern and find the relevant guide; it is not a failure-rate ranking or a remote parts diagnosis. Model year, engine, fitted systems, service history and current test results matter more than a general list of common faults.'),
 p('Follow the instructions in the vehicle handbook and the displayed message. If it calls for stopping, or the car has severe overheating, loss of braking or steering control, an unsafe ride height or another immediate safety concern, stop in a safe place and arrange assistance. Do not keep driving simply to reproduce a fault.'),
 h('Engine warnings, cooling changes and leaks'),
 p('Record whether a check-engine light is steady or flashing and whether rough running, reduced power, smoke or a temperature warning accompanies it. Coolant loss or oil beneath the car needs source identification. Scan information, physical inspection and system tests help separate possible causes; an engine name or stored code does not establish which component needs replacement.'),
 p('Continue with the symptom that matches the car:', [('/mercedes/problems/check-engine-light', 'Check-engine warning'), ('/mercedes/problems/engine-overheating', 'Engine overheating'), ('/mercedes/problems/oil-leak', 'Oil-leak symptoms'), ('/services/mercedes-mechanical-repair-dubai', 'Mechanical assessment and repair')]),
 h('Suspension warnings and dropping after parking'),
 p('Confirm which suspension is fitted. AIRMATIC is one system, not a feature of every Mercedes. On an air-sprung car, a low corner, repeated compressor operation or a levelling warning can prompt checks of leaks, pressure generation, valves, sensors and electrical supply. A warning message and an overnight height change are related observations, but each gives different diagnostic context.'),
 p('Use the focused guides for the observation:', [('/mercedes/problems/airmatic-malfunction', 'AIRMATIC malfunction message'), ('/mercedes/problems/suspension-dropping-overnight', 'Suspension dropping overnight'), ('/services/mercedes-suspension-repair-dubai', 'Mercedes suspension assessment')]),
 h('Gearbox jerking, slipping or delayed engagement'),
 p('Describe when the behaviour occurs: cold or warm, selecting a gear, changing up or down, or accelerating under load. Jerking and slipping are different symptoms. Identify the installed gearbox and relevant service history before deciding whether fluid service, a control-system investigation or mechanical repair is appropriate. Fresh fluid is not a guaranteed repair for a shift fault.'),
 p('Read the matching guide before discussing repair scope:', [('/mercedes/problems/gearbox-jerking', 'Gearbox jerking'), ('/mercedes/problems/transmission-slipping', 'Transmission slipping'), ('/services/mercedes-transmission-repair-dubai', 'Mercedes transmission assessment')]),
 h('Battery warnings, repeated discharge and no-start'),
 p('Record the precise message and whether the vehicle cranks, clicks or does not respond. A battery warning does not prove that the main or auxiliary battery needs replacement. Battery condition, charging, connections and a possible drain need the relevant tests. Multiple warnings may share a voltage or communication cause, so replacing several modules from code names alone is not a diagnosis.'),
 p('Separate the warning from the confirmed job:', [('/mercedes/problems/battery-warning', 'Battery-warning guide'), ('/mercedes/problems/wont-start', 'Mercedes will not start'), ('/services/mercedes-electrical-repair-dubai', 'Charging, wiring and repeated battery drain')]),
 h('Weak AC, frozen screens and sound-system concerns'),
 p('For AC, distinguish weak airflow from air that flows normally but is warm, and note whether the fault changes in traffic or between cabin zones. Refrigerant top-up does not resolve every cause. For a frozen or black COMAND/MBUX display, describe the installed system, resets and other lost functions. Restoring faulty equipment is a different task from improving a working sound system.'),
 p('Choose the relevant next step:', [('/mercedes/problems/ac-not-cooling', 'AC not cooling'), ('/services/head-unit-repair-dubai', 'COMAND, MBUX and head-unit fault assessment'), ('/services/mercedes-audio-upgrade-dubai', 'Upgrade a functioning Mercedes audio system')]),
 h('Prepare useful evidence before the assessment'),
 ul('Model, year, mileage and relevant service or repair records.', 'The exact message, a safe photograph and when the concern occurs.', 'Whether the symptom depends on temperature, speed, parking time or a recent repair.', 'What was tested before, including any invoices and diagnostic findings.'),
 p('DIGI-TEC has XENTRY. The useful diagnostic scope still depends on the vehicle, module and supported function, and scan findings need to be checked against the complaint and appropriate physical tests. Ask what is confirmed, what still needs investigation and what post-repair checks are proposed.'),
 p('For the assessment or planned maintenance:', [('/services/mercedes-diagnostics-dubai', 'Mercedes XENTRY diagnostics'), ('/blog/mercedes-benz-maintenance-guide-dubai', 'Build a maintenance plan'), ('/brands/mercedes-benz-service-dubai', 'Mercedes service and repair options')]),
 h('FAQs'), q('Can a fault code tell me which part to replace?'), p('A code identifies a recorded condition or system concern. It needs the vehicle context, supporting data and appropriate tests before a failed component is confirmed.'),
 q('Should I wait until the next scheduled service?'), p('A new fault is separate from the maintenance schedule. Follow the warning instructions, describe the concern promptly and confirm whether the vehicle can be driven safely before arranging the assessment.'),
 q('Will a diagnosis guarantee that no other fault develops?'), p('No. A diagnosis addresses the agreed concern and evidence available at the time. Ask what was tested, any limits of the assessment and which observations require follow-up.'),
 ]
}
replace_record(ROOT / 'src/data/blogPosts.ts', problem['slug'], problem)
