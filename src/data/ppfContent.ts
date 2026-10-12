// Scope and business claims are grounded in services.ts and the existing workshop
// content. Finish availability, product specifications and project results are
// deliberately not asserted without a confirmed product or job record.
export const PPF_PATH = '/services/paint-protection-film';
export const PPF_TITLE = 'PPF Dubai | Paint Protection Film Installation | DIGI-TEC';
export const PPF_DESCRIPTION = 'PPF installation in Al Quoz, Dubai. Compare full-body and selected-panel paint protection film, preparation and aftercare. Request a DIGI-TEC quote for your car.';
export const PPF_H1 = 'Paint Protection Film (PPF) Dubai';
export const PPF_WHATSAPP = `https://wa.me/97143402223?text=${encodeURIComponent('Hi DIGI-TEC, I would like a PPF quote for my car. Please help me choose the coverage.')}`;

export const ppfBrandNames = ['Mercedes-Benz', 'BMW', 'Porsche', 'Ferrari', 'Lamborghini', 'McLaren', 'Aston Martin', 'Rolls-Royce', 'Range Rover'];

import type { VerifiedStartingPrice } from '@/lib/verified-pricing';

interface PpfCoverageOption extends VerifiedStartingPrice {
  name: string; title: string; eyebrow: string; description: string; suitable: string; detail: string;
}

export const ppfCoverage: PpfCoverageOption[] = [
  {
    name: 'Full Body', title: 'Full Body PPF', eyebrow: 'Broad exterior coverage',
    description: 'Film across the agreed painted exterior panels, typically including the bonnet, bumpers, wings, doors, mirrors, sills and rear bodywork.',
    suitable: 'For owners who want consistent protection across a new, luxury or frequently driven car.',
    detail: 'Confirm the roof, painted trim, panel edges and any exclusions in the quote.',
  },
  {
    name: 'Full Front', title: 'Front PPF Coverage', eyebrow: 'Focus on the front',
    description: 'Front coverage can focus on the bumper, bonnet, front wings and painted mirror caps. DIGI-TEC’s existing options include partial-front coverage.',
    suitable: 'For regular highway driving, where forward-facing panels are a priority.',
    detail: 'Ask about full-front coverage for your model. The exact panels and partial or complete panel coverage must be confirmed.',
  },
  {
    name: 'Partial / High Impact Areas', title: 'Partial / High-Impact PPF', eyebrow: 'Selected panels',
    description: 'Target agreed areas exposed to regular contact or debris, such as painted sills, selected bumper sections or other suitable panels.',
    suitable: 'For a focused budget or a particular area you want to protect.',
    detail: 'Discuss panel suitability, visible film boundaries and coverage before installation.',
  },
];

export const ppfFaqs = [
  { question: 'What is PPF for cars?', answer: 'Paint protection film (PPF) is a transparent protective film applied to painted exterior surfaces. It creates a replaceable physical layer that can reduce stone-chip damage and minor surface abrasion on the panels it covers.' },
  { question: 'How much does PPF cost in Dubai?', answer: 'PPF cost depends on the car’s size and shape, covered panels, chosen film and finish, paint preparation and installation complexity. Send DIGI-TEC your brand, model, year and coverage preference for a vehicle-specific quotation. There is no single price for every car.' },
  { question: 'Is PPF worth it in Dubai?', answer: 'PPF can be useful when preserving paint is a priority, particularly for frequent highway driving or high-value vehicles. Consider the panels exposed to road debris, your budget and how you maintain the car. Film reduces some surface damage but does not make paint damage-proof.' },
  { question: 'How long does PPF last?', answer: 'Service life varies with the selected film, installation, exposure and care. Ask for the product’s rated lifespan, maintenance requirements and any written warranty terms in your quote. DIGI-TEC does not state a universal lifespan for all films.' },
  { question: 'Does PPF protect against scratches?', answer: 'PPF can reduce minor abrasion on covered areas, but it is not scratch-proof. Cuts, deep scratches and impacts may damage the film or the paint underneath. Have persistent marks assessed rather than attempting abrasive polishing or assuming every mark can be removed.' },
  { question: 'Does PPF protect against stone chips?', answer: 'PPF provides a physical barrier that can reduce paint damage from small stone impacts on covered panels. It cannot prevent every chip: impact energy, film properties and the point of contact all matter.' },
  { question: 'Does PPF protect against sand?', answer: 'Film can help reduce light abrasion on covered paint, but it is not sand-proof. Dust and grit still need careful removal. Avoid rubbing a dry, dusty surface and follow the film manufacturer’s washing guidance.' },
  { question: 'Can PPF be applied to a new car?', answer: 'Yes, subject to inspection of the paint and the chosen film’s requirements. New paint can still have contamination or defects, so its condition should be checked before coverage and preparation are agreed.' },
  { question: 'Can PPF be installed on a used car?', answer: 'Often, yes. Existing chips, scratches, previous repairs and repainted panels need assessment first. PPF does not repair damaged paint, and any necessary correction or refinishing should be discussed before installation.' },
  { question: 'What is the difference between PPF and ceramic coating?', answer: 'PPF is a physical film that can reduce stone-chip damage and minor abrasion. Ceramic coating is a surface treatment that can improve water behaviour, cleaning and appearance depending on the product. Coating does not provide the same stone-chip barrier as film.' },
  { question: 'Can ceramic coating be applied over PPF?', answer: 'A compatible coating may be applied over a suitable film. Confirm compatibility with both product manufacturers, including any effect on finish, care and warranty terms. DIGI-TEC can discuss combined options for compatible surfaces.' },
  { question: 'Does PPF change the appearance of the paint?', answer: 'Clear paint protection film is intended to preserve the appearance of the underlying paint, although its texture, edges and joins may be visible. Ask DIGI-TEC to confirm the available product and finish, show a sample and explain the expected result before choosing.' },
  { question: 'How long does PPF installation take?', answer: 'Timing depends on coverage, vehicle shape, paint preparation and the chosen installation method. Ask for the expected workshop time and any aftercare or settling period when the team confirms your car’s scope. Existing-film removal or replacement is a separate enquiry: confirm availability, paint condition, risks and scope before booking.' },
  { question: 'How should PPF be maintained?', answer: 'Follow the selected film manufacturer’s care instructions, including the first-wash interval and approved cleaning products. Remove dirt gently, avoid abrasive polishing and keep pressure-washer jets away from film edges. For bubbles, lifting edges, staining or damage, record the installation date and send photos. Settling, contamination, adhesion and physical damage need different assessments. Do not puncture, pull or heat the film yourself. Ask for inspection rather than assuming the film can be repaired or must be replaced.' },
];
