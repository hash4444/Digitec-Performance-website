import type { ServiceKey } from './brandServices';

type ServiceFaq = { question: string; answer: string };

/** Decision questions for the shared repair templates; brand-specific overrides remain authoritative. */
export const serviceDecisionFaqs: Partial<Record<ServiceKey, ServiceFaq[]>> = {
  'mechanical-repair': [
    { question: 'What is the difference between diagnosis and mechanical repair?', answer: 'Diagnosis establishes the cause and the work needed. Repair addresses the findings you approve. Ask the estimate to separate the initial tests, any dismantling needed to confirm the cause, parts and repair labour.' },
    { question: 'What information helps with an intermittent mechanical problem?', answer: 'Record when the symptom appears, whether the engine is cold or warm, any warning message and recent work. Previous invoices and a description of the noise, leak or vibration help define the first inspection.' },
  ],
  'steering-repair': [
    { question: 'Does pulling to one side mean the steering rack needs replacement?', answer: 'Pulling alone does not identify a failed rack. Tyre condition, alignment, suspension and steering components may all need inspection before a repair is recommended.' },
    { question: 'What should a steering repair estimate explain?', answer: 'Ask which component or measurement supports the diagnosis, which parts are proposed, and whether alignment or a supported steering calibration is required for the work.' },
  ],
  'battery-replacement': [
    { question: 'Does a battery warning always mean the battery needs replacement?', answer: 'No. Battery condition, connections, charging performance and unwanted electrical drain may need separate checks. The findings should explain whether replacement addresses the reported concern.' },
    { question: 'Does this service include an electric or hybrid traction battery?', answer: 'This page concerns the low-voltage battery and related starting or accessory systems. Traction-battery and other high-voltage work needs separate confirmation of capability and scope for the exact vehicle.' },
  ],
  'electrical-repair': [
    { question: 'Is an electrical repair the same as clearing fault codes?', answer: 'No. A fault code can identify an affected circuit or system without proving which component failed. Wiring, connections, power supply and relevant live data may need testing before repair or replacement is proposed.' },
    { question: 'What helps diagnose a fault that disappears before the appointment?', answer: 'Share the exact message, affected function, when it happens and any recent battery or accessory work. Testing may need to reproduce the operating conditions; an intermittent fault can require more than one stage of assessment.' },
  ],
  'exhaust-repair': [
    { question: 'Can a warning light prove the catalytic converter has failed?', answer: 'A warning or fault code alone does not confirm a failed converter. Leaks, sensor readings, wiring and engine-running condition may need checking before an exhaust component is recommended.' },
    { question: 'Is exhaust repair the same as a performance exhaust upgrade?', answer: 'Repair addresses a diagnosed leak, damaged component, noise or operating fault. A performance change is a separate enquiry requiring its own compatibility and intended-use review.' },
  ],
  'fuel-system-repair': [
    { question: 'Do hard starting or injector codes prove the injectors need replacement?', answer: 'No. Fuel-pressure readings, electrical tests, fault data and engine condition help separate injector concerns from pump, supply or control faults. Ask what evidence supports each proposed replacement.' },
    { question: 'What details should I send with a fuel-system enquiry?', answer: 'Include the model, year, fuel type, mileage, warning text and whether the concern began after refuelling or recent work. Note whether the symptom appears during starting, idling or acceleration.' },
  ],
  'body-repair': [
    { question: 'Do scratches require paintwork or can polishing help?', answer: 'The depth of the mark and condition of the existing finish determine the appropriate option. Surface correction, local paintwork and panel repair have different scopes, so photographs can support an enquiry but an inspection may be needed to confirm the method.' },
    { question: 'What should be itemised in a body repair estimate?', answer: 'Ask which panels need repair or replacement, what paint and trim work is included, and whether dismantling could reveal additional damage. Any sensor or camera checks affected by the repair should be discussed for the fitted equipment.' },
  ],
  'tire-repair': [
    { question: 'Can every punctured tyre be repaired?', answer: 'No. The damage location, tyre construction, condition and evidence of running while underinflated affect repair suitability. Inspection determines whether an appropriate repair or replacement should be proposed.' },
    { question: 'Does a pressure warning prove there is a puncture?', answer: 'No. The tyre, valve, wheel and pressure-monitoring system may need checking. Ask which finding explains the warning and whether balancing or a supported pressure-system reset is included.' },
  ],
};
