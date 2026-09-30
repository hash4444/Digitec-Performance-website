# G1 pre-implementation owner map

Baseline: 1f4960a35d330ea56a1871cbd6efa06233828757. Created before source edits.

Queries establish editorial intent, not historical landing URLs. Existing architecture first; no new URL proposed. Brand-first observations are retained in the evidence ledger but excluded from generic demand.

| Service family | Selected existing owner | Boundary / disposition |
|---|---|---|
| Broad workshop | / | Independent workshop overview; navigation to individual services |
| Workshop selection | /best-car-workshop-dubai | Workshop selection criteria, not broad booking ownership |
| Garage visit | /services/car-garage-dubai | Planning a workshop visit and approved repair scope |
| Local access | /services/garage-near-me-dubai | Al Quoz access and contact, not fictional local branches |
| Diagnostics | /services/car-diagnostics-dubai | Fault investigation and supported data; repair separate |
| Electrical | /services/auto-electrical-repair-dubai | Circuit, wiring, charging and electrical repair |
| Mechanical | /services/mechanical-repair-dubai | Mechanical inspection and confirmed repair |
| Engine | /services/mechanical-repair-dubai | Engine work within existing mechanical owner |
| Engine rebuild | /services/mechanical-repair-dubai | Selected engine-rebuild work stated on existing page; exact scope confirmed |
| Transmission repair | /services/transmission-repair-dubai | Gearbox repair after diagnosis; system-specific scope |
| Transmission maintenance | /services/transmission-repair-dubai | Separate fluid/filter maintenance section within repair owner |
| Mechatronic / DCT / DSG | /services/transmission-repair-dubai | Generic transmission system assessment; VW DSG relationship retained |
| Suspension | /services/suspension-repair-dubai | Conventional/adaptive suspension assessment |
| Air suspension | /services/suspension-repair-dubai | Distinct air-suspension section within existing suspension owner |
| Steering | /services/steering-repair-dubai | Steering assistance/rack task |
| Brakes | /services/brake-repair-dubai | Measured wear and brake-service task |
| AC repair | /services/car-ac-repair-dubai | Cabin AC fault inspection and repair |
| AC recharge | /services/car-ac-repair-dubai | Refrigerant service follows identification and leak assessment |
| Battery | /services/battery-replacement-dubai | Low-voltage battery testing/fitting; registration only if applicable |
| Oil change | /services/oil-change-dubai | Engine oil and filter maintenance |
| Routine service | /services/car-service-dubai | Scheduled maintenance beyond oil alone |
| Cooling / radiator | /services/mechanical-repair-dubai | Cooling-system section under mechanical |
| Turbo repair | /services/mechanical-repair-dubai | Turbo assessment within mechanical; scope confirmed |
| Fuel system | /services/fuel-system-repair-dubai | Fuel-system checks and confirmed repair |
| Exhaust repair | /services/exhaust-repair-dubai | Leaks and damaged exhaust components; modifications separate |
| Body / collision | /services/car-body-repair-dubai | Damage restoration, dents and paint repair; protection deferred |
| Tyres | /services/tire-repair-dubai | Tyre/tire spelling variants share puncture/replacement owner |
| Wheel alignment / balancing | /services/tire-repair-dubai | Existing fitment/balancing/alignment scope; not new page |
| Screen repair | /services/auto-electrical-repair-dubai | Display/touchscreen assessment section; head unit separate |
| Head unit | /services/head-unit-repair-dubai | Existing generic head-unit assessment with protected COMAND relationship |
| Audio repair | /services/head-unit-repair-dubai | Audio fault assessment; amplifier/circuit causes considered |
| Audio upgrade | NOT TARGETED / UNVERIFIED | Only existing Mercedes upgrade scope verified; generic multi-brand scope unverified |
| Reverse camera repair | /services/auto-electrical-repair-dubai | Camera power/wiring/display inspection section; installation separate |
| Reverse camera installation | NOT TARGETED / UNVERIFIED | No verified generic installation capability; do not infer from repair |
| Soft-close repair | /services/soft-close-door-repair-dubai | Generic fitted-system repair, preserve B9 ROX installation owner |
| Soft-close installation | /services/soft-close-door-repair-dubai | Existing generic compatibility enquiry; ROX fitting remains brand-specific |
| Coding / programming | /services/car-diagnostics-dubai | Supported functions require vehicle/module/access confirmation |
| ECU repair | /services/auto-electrical-repair-dubai | Module/circuit assessment; component repair only after supported scope confirmed |
| Key programming | NOT TARGETED / UNVERIFIED | No independently verified key-service capability; excluded |
| Performance tuning | /tuning | Existing GAD Motors relationship and project consultation |
| Performance exhaust | /tuning | Agreed project consultation; not generic exhaust repair |
| Infotainment upgrades | NOT TARGETED / UNVERIFIED | Generic CarPlay/Android retrofit capability unverified |
| High-voltage service | NOT TARGETED / UNVERIFIED | High-voltage/traction-battery capability unverified |
| Body electronics | /services/auto-electrical-repair-dubai | Window, door, seat electrical mechanisms within scope |
| Pre-purchase inspection | NOT TARGETED / UNVERIFIED | Separate pre-purchase inspection offering not established by routine inspection |
| Roadside assistance | /services/roadside-assistance-dubai | Existing roadside enquiry page; availability confirmed |
| Wheel / rim repair | NOT TARGETED / UNVERIFIED | Rim restoration distinct from tyre balancing; capability unverified |

## Implementation decisions

Retain the existing specialized transmission, suspension, AC, oil, tyre and head-unit owners unless rendered QA identifies a defect. The mixed head-unit/COMAND owner and soft-close repair/ROX installation relationships are protected.

Diagnostics: remove unsupported key-programming promotion; focus the heading on fault investigation; distinguish a diagnostic finding from a repair or programming decision. Electrical: make screen and reverse-camera fault assessment visible without promising screen replacement or installation. Routine service: focus the heading on maintenance rather than a list of brand names. Broad garage: distinguish planning an appointment from the homepage business overview.

Capability ceiling: a current site statement is site evidence, not independent manufacturer authorization. Supported coding/programming, engine rebuild and performance exhaust remain vehicle-specific enquiries. Generic key programming, CarPlay, audio upgrades, camera installation, wheel restoration, pre-purchase inspection and high-voltage work are not promoted.

Broad overlap remains an editorial risk, not proven harmful cannibalization. No redirects, mergers or canonical changes. Backlink/conversion evidence and generic query × page joins are unavailable.
