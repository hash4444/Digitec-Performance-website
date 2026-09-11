from pathlib import Path
import json

ROOT = Path(__file__).resolve().parents[2]

def update_record(filename, slug, title, meta, description, content):
    path = ROOT / filename
    source = path.read_text(encoding='utf-8')
    start = source.index("  {\n    slug: '" + slug + "',")
    end = source.index("\n  {\n    slug:", start + 5)
    old = source[start:end]
    import re
    date = re.search(r"date: '([^']+)'", old).group(1)
    record = {
        'slug': slug, 'title': title, 'excerpt': description,
        'category': 'Mercedes', 'author': 'DIGI-TEC Workshop', 'date': date,
        'updatedDate': '2026-09-08', 'readTime': '5 min read',
        'coverGradient': 'from-burnt-orange/30 via-charcoal to-black',
        'metaTitle': meta, 'metaDescription': description, 'ogType': 'article',
        'content': content,
    }
    source = source[:start] + '  ' + json.dumps(record, ensure_ascii=False, indent=2).replace('\n', '\n  ') + ',\n' + source[end:]
    path.write_text(source, encoding='utf-8')

def block(kind, text): return {'type': kind, 'text': text}
def bullets(items): return {'type': 'ul', 'items': items}

update_record('src/data/aiGuidePosts.ts', 'mercedes-service-cost-dubai-guide',
    'Mercedes Service Cost in Dubai: Service A & B Scope',
    'Mercedes Service Cost Dubai | A & B Scope | Digi-Tec',
    'Understand Mercedes Service A and B cost factors in Dubai: due work, oil specification, parts, labour, diagnosis and the details an itemized quote should show.', [
    block('p', 'A useful Mercedes service quote starts with the vehicle and the work due. The VIN, model year, mileage, ASSYST display and recorded service history determine the scope. Engine oil capacity, fluid approvals, parts choice, labour and additional findings then affect the cost. A package label alone is not enough to compare two estimates.'),
    block('h2', 'How Service A and Service B affect the quote'),
    block('p', 'Service A generally describes a smaller scheduled visit and Service B a broader one, but the precise checklist must be matched to the vehicle. Oil and filter work, inspections and other due items should be listed individually. Cabin filters, spark plugs, brake fluid and transmission servicing must not be assumed to be included simply because an estimate says Service B or major service.'),
    block('h2', 'What an itemized estimate should include'),
    bullets(['The exact vehicle, mileage and service message used to select the work.', 'Engine oil approval, quantity, oil filter and required seals or consumables.', 'Every additional due filter, plug or fluid item, with its parts option and quantity.', 'Labour, diagnostic charges, applicable VAT and the total payable.', 'Exclusions, parts availability, expected timing and the approval process for additional findings.']),
    block('h2', 'Routine maintenance and fault diagnosis have different scopes'),
    block('p', 'An oil service does not automatically investigate a warning light, repair a leak or resolve a gearbox fault. Describe those concerns before booking so the workshop can separate scheduled work from diagnostic time. If investigation requires further dismantling, agree that stage and its cost before it proceeds.'),
    block('h2', 'How Dubai use influences the assessment'),
    block('p', 'Explain short trips, extended parking, towing, heavy loads and any cooling or AC concern. The vehicle schedule remains the basis for due work; observed condition and applicable operating guidance determine additional checks. A local climate alone does not justify one replacement interval for every Mercedes.'),
    block('h2', 'Compare parts and records, as well as the total'),
    block('p', 'Ask which items are genuine Mercedes-Benz, OE-supplier or a proposed alternative, and confirm compatibility before approval. Keep invoices showing date, mileage, parts, fluids and work performed. These records help a future buyer assess the history, but they do not guarantee a particular resale value.'),
    {'type': 'p', 'text': 'For booking and detailed scope, use these service pages:', 'links': [{'href': '/brands/mercedes-benz-service-dubai', 'label': 'Mercedes Service A/B and repair booking'}, {'href': '/services/mercedes-oil-change-dubai', 'label': 'Mercedes oil and filter service'}, {'href': '/blog/mercedes-service-intervals-dubai-heat', 'label': 'ASSYST and service-interval guide'}]},
    block('h2', 'FAQs'),
    block('h3', 'Can I get a fixed price without the vehicle details?'),
    block('p', 'The workshop needs the model and year or VIN, mileage, service message and relevant history to confirm the due scope. An initial estimate may still depend on inspection findings. Ask for assumptions and exclusions in writing.'),
    block('h3', 'Is coding or programming part of a routine service?'),
    block('p', 'Only if a required, supported function is explicitly included. Eligibility depends on the vehicle, module, requested work and access. A routine service does not establish coverage for all coding or programming functions.'),
    block('h3', 'Where can I arrange a Mercedes service quote?'),
    block('p', 'Contact Digi-Tec Performance Center in Al Quoz Industrial Area 3, Dubai, on +971 4 340 2223 by phone or WhatsApp. Send the vehicle details and confirm the appointment and availability before visiting.'),
])

update_record('src/data/blogPosts.ts', 'mercedes-service-intervals-dubai-heat',
    'Mercedes Service Intervals & ASSYST in Dubai',
    'Mercedes Service Intervals & ASSYST Dubai | Digi-Tec',
    'How VIN, model year, ASSYST and service history determine Mercedes maintenance in Dubai. Interpret the displayed service code before selecting due work.', [
    block('p', 'There is no single oil, coolant, brake-fluid or transmission interval that applies to every Mercedes in Dubai. Use the exact vehicle schedule, the service display and the documented history to identify what is due. The workshop should explain any additional recommendation with reference to the fitted equipment, operating guidance or observed condition.'),
    block('h2', 'What to collect before choosing a service interval'),
    bullets(['VIN, model year, engine and transmission details where available.', 'Current mileage and a photograph of the complete ASSYST or service-display message.', 'Dates and mileages of earlier oil, fluid, filter and other maintenance work.', 'Use patterns such as short trips, towing, extended storage and any present warning or symptom.']),
    block('h2', 'ASSYST, Service A and Service B'),
    block('p', 'The display helps identify a scheduled visit, but the workshop must reconcile it with the vehicle data and work already completed. Oil approvals, filter requirements and additional time- or mileage-dependent items vary. A reset indicator alone does not establish that every due item was performed.'),
    block('h2', 'What do A3, A9 or AH service messages mean?'),
    block('p', 'Send the complete message exactly as displayed, together with the VIN and mileage. Letters and numbers must be interpreted using the service information applicable to that vehicle. Do not use an online A3, A9 or AH checklist as a universal parts order: model, year and previous work can change the due scope.'),
    block('h2', 'How heat, dust and use affect inspection priorities'),
    block('p', 'Mention weak AC, coolant loss, difficult starting or unusual operation when booking. Cooling, battery, tyre and airflow checks can be selected from the complaint and use of the vehicle. Replacing fluids or components earlier than the applicable schedule needs a stated reason; it should not follow an arbitrary Dubai-wide mileage rule.'),
    block('h2', 'A warning and a service reminder are different'),
    block('p', 'A scheduled service reminder identifies due maintenance. An oil-pressure, temperature, braking or other fault warning may require immediate assessment under the vehicle handbook instructions. Do not wait for the next routine service to describe a new fault to the workshop.'),
    block('h2', 'Record the completed work'),
    block('p', 'Keep the invoice with date, mileage, oil approval, quantities and completed items. Reset only the relevant completed service and use the record when planning the next visit. Unrecorded history may require an assessment of what can be verified before catch-up maintenance is proposed.'),
    {'type': 'p', 'text': 'Continue with the service scope and booking information:', 'links': [{'href': '/brands/mercedes-benz-service-dubai', 'label': 'Mercedes maintenance and repair booking'}, {'href': '/blog/mercedes-service-cost-dubai-guide', 'label': 'Service A/B scope and cost factors'}]},
])
