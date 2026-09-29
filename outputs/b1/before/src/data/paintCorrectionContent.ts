export const PAINT_CORRECTION_PATH = '/services/car-polishing-dubai';
export const PAINT_CORRECTION_TITLE = 'Car Polishing & Paint Correction Dubai | DIGI-TEC';
export const PAINT_CORRECTION_H1 = 'Car Polishing & Paint Correction Dubai';
export const PAINT_CORRECTION_DESCRIPTION = 'Professional car polishing and paint correction in Dubai. Assess swirl marks, light scratches and dull paint on your premium car. Get a DIGI-TEC quote.';
export const PAINT_WHATSAPP = 'https://wa.me/97143402223';
export const paintWhatsappHref = (message: string) => `${PAINT_WHATSAPP}?text=${encodeURIComponent(message)}`;
export const PAINT_ASSESSMENT_HREF = paintWhatsappHref('Hi DIGI-TEC, I would like a paint assessment and quote for car polishing or paint correction. I can send photos of the paint condition.');
export const PAINT_PHOTO_HREF = paintWhatsappHref('Hi DIGI-TEC, I would like advice on scratches or marks in my car’s paint. I will attach photos here. Please advise whether an in-person paint assessment is needed.');

export const paintConcerns = ['Swirl marks', 'Scratches', 'Dull paint', 'Water spots', 'Paint enhancement', 'Not sure / Need assessment'];
export const paintBrandNames = ['Mercedes-Benz', 'BMW', 'Porsche', 'Ferrari', 'Lamborghini', 'McLaren', 'Aston Martin', 'Rolls-Royce', 'Range Rover'];

export const paintProblems = [
  { title: 'Swirl marks', appearance: 'Fine, circular-looking marks around a light reflection.', assessment: 'Often shallow wash-related scratches. Correction may improve them within the paint’s safe limits.' },
  { title: 'Light surface scratches', appearance: 'Fine lines that interrupt the reflection in the paint.', assessment: 'Some clear-coat marks may be improved. Depth and remaining clear coat determine what is safe.' },
  { title: 'Haze & loss of gloss', appearance: 'Cloudy reflections or paint that looks flat after washing.', assessment: 'Polishing may improve clarity where the finish is sound. Clear-coat failure needs a different repair.' },
  { title: 'Water spots', appearance: 'Mineral rings, outlines or etched marks after water dries.', assessment: 'Surface deposits and deeper etching need different treatment. Some marks may remain after safe correction.' },
  { title: 'Oxidation & dull paint', appearance: 'A faded or chalky-looking finish with reduced clarity.', assessment: 'Some oxidation can be improved, depending on the paint system and condition. Peeling or failed clear coat cannot be polished back.' },
  { title: 'Poor previous polishing', appearance: 'Holograms, trails or uneven reflections under strong light.', assessment: 'Refinement may help, but previous work and paint condition must be assessed first.' },
  { title: 'Paint contamination', appearance: 'Bonded deposits or a rough-feeling surface after washing.', assessment: 'Appropriate cleaning may be needed before deciding whether polishing is necessary. Contamination is not automatically a paint defect.' },
];

export interface PaintServiceLevel {
  name: string;
  purpose: string;
  suitable: string;
  /** Populate only from an approved DIGI-TEC price and its source record. */
  fromAed?: number;
  priceSource?: string;
}
export const paintServiceLevels: PaintServiceLevel[] = [
  { name: 'Car Polishing', purpose: 'Improve gloss, clarity and suitable minor surface imperfections.', suitable: 'Discuss paint enhancement when your main concern is a dull or hazy finish, with limited defect correction needed.' },
  { name: 'Paint Correction', purpose: 'Target swirl marks and other safely correctable paint defects.', suitable: 'Discuss correction when visible marks require closer assessment and a more deliberate plan for the affected paint.' },
];

export interface VerifiedPaintProject {
  id: string;
  vehicle: string;
  brandPath: string;
  /** Existing documented project route, when one is available. */
  caseStudyPath?: string;
  initialCondition: string;
  service: string;
  result: string;
  before: { src: string; alt: string; width: number; height: number };
  after: { src: string; alt: string; width: number; height: number };
  verified: true;
  /** Internal provenance: a real job record and permission to use the photographs. */
  evidence: string[];
}
// No documented polishing/correction pairs were found. Do not turn unrelated
// body repairs or workshop photography into invented correction case studies.
export const verifiedPaintProjects: VerifiedPaintProject[] = [];

export const paintFaqs = [
  { question: 'What is car polishing?', answer: 'Car polishing uses a polish and suitable technique to improve paint clarity and gloss and reduce some surface imperfections. Abrasive polishing removes a small amount of the finish, so the method must suit the paint condition. It does not repair dents, chips or missing paint.' },
  { question: 'What is paint correction?', answer: 'Paint correction is a deliberate assessment and polishing process aimed at improving defects such as swirl marks, haze and suitable light scratches. The achievable result depends on defect depth, paint condition, previous repairs and safe correction limits.' },
  { question: 'What is the difference between car polishing and paint correction?', answer: 'Polishing describes a technique that can enhance gloss and reduce minor marks. Paint correction describes a more targeted plan for assessed defects and may use polishing as part of that work. The terms overlap; the agreed scope matters more than the package name.' },
  { question: 'How much does car polishing cost in Dubai?', answer: 'Car polishing cost depends on vehicle size, paint condition, preparation and the improvement required. Optional protection afterward affects the total too. Send DIGI-TEC the model, year and paint concerns for a quotation; an in-person assessment may be needed.' },
  { question: 'How much does paint correction cost in Dubai?', answer: 'Paint correction pricing depends on the affected area, defect severity, previous paintwork, preparation and the amount of safe correction required. DIGI-TEC confirms the scope and cost for the vehicle rather than quoting one universal correction price.' },
  { question: 'Can polishing remove scratches?', answer: 'Some light marks within the clear coat can be improved or removed by suitable polishing. A photograph can help start the conversation, but it cannot reliably establish scratch depth or the remaining clear coat. The paint needs assessment before a removal claim can be made.' },
  { question: 'Can paint correction remove deep scratches?', answer: 'Deep scratches may extend beyond the layers that can safely be corrected. Chasing them with more polishing can remove too much finish. Touch-up, refinishing or body and paint repair may be more appropriate, and some marks may need to remain.' },
  { question: 'Can swirl marks be removed?', answer: 'Many shallow swirl marks can be improved through appropriate polishing or correction. The result depends on the paint and scratch depth. Gentle washing and clean wash materials help reduce the chance of new wash-related marks afterward.' },
  { question: 'Can water spots be removed?', answer: 'Some water spots are mineral deposits on the surface; others have etched into the finish. Cleaning or correction may help, but deeper etching may not be safely removable. The appropriate treatment depends on inspection.' },
  { question: 'Can dull paint be restored?', answer: 'Polishing may improve gloss and clarity on a sound paint finish. Oxidation, contamination and previous polishing can contribute to dullness, but peeling clear coat, missing paint or other finish failure require different repair methods.' },
  { question: 'Does polishing damage car paint?', answer: 'Abrasive polishing removes a small amount of material. Excessive or unsuitable polishing can thin or damage the finish, especially on edges or previously corrected areas. The aim is suitable improvement while preserving paint, rather than removing every visible mark.' },
  { question: 'How often should a car be polished?', answer: 'There is no universal schedule for abrasive polishing. Base it on paint condition and previous work rather than polishing at every wash. Good washing and suitable protection can reduce the need for repeated correction.' },
  { question: 'How long does paint correction take?', answer: 'Time depends on vehicle size, defect severity, preparation and the agreed correction and protection scope. DIGI-TEC confirms the expected workshop time after assessing the vehicle; a photo enquiry is an initial discussion, not a fixed turnaround promise.' },
  { question: 'Should I ceramic coat my car after paint correction?', answer: 'A suitable ceramic coating can be considered after the paint is prepared to help with water behaviour, cleaning and finish maintenance. Product properties and care vary. Coating does not remove defects or make the car scratch-proof.' },
  { question: 'Can PPF be applied after paint correction?', answer: 'PPF can be considered after suitable preparation, subject to the paint condition and selected film’s requirements. Film does not correct defects in the underlying paint. Confirm preparation, coverage, product compatibility and timing with the workshop.' },
  { question: 'How do I know what level of correction my car needs?', answer: 'Start with a paint assessment. Describe the marks, previous repairs or polishing, and the finish you want. Clear-coat condition and remaining material limit safe correction. Ask the team to explain what can improve, what may remain and what needs a different repair.' },
];
