import { useId, useState } from 'react';
import { stageLabels, type Stage, type TuningCar } from '@/data/tuningCars';
import { getTuningPriceNote, getTuningPublicationNote, publishedTuningMods } from '@/data/tuningPublication';

/** Full package details also remain available in the initial rendered HTML. */
export default function TuningModelStageSelector({ cars, modelName, heading }: {
  cars: TuningCar[]; modelName: string; heading: string;
}) {
  const variantId = useId();
  const headingId = useId();
  const [carId, setCarId] = useState(cars[0].id);
  const [stage, setStage] = useState<Stage>('stage1');
  const car = cars.find(item => item.id === carId) ?? cars[0];
  const selectedStage = car.availableStages.includes(stage) ? stage : 'stage1';
  const info = car.stages[selectedStage]!;
  const stock = car.stages.stock!.spec;
  const mods = publishedTuningMods(car.id, selectedStage, info.mods);
  const message = `Hello DIGITEC, I would like to enquire about ${modelName} performance tuning: ${car.name}, ${stageLabels[selectedStage]}. My model year is ____, VIN is ____, fuel is ____ and current modifications are ____.`;

  return <section id="stage-advisor" data-model-section="selector" data-model-stage-selector data-stage-selected={selectedStage} data-vehicle-selected={car.id} aria-labelledby={headingId} className="tm-section tm-selector">
    <div className="tm-container">
      <div className="tm-section-heading"><div><p className="tm-eyebrow">Choose your configuration</p><h2 id={headingId}>{heading}</h2></div><a href="#performance-packages" className="tm-text-link">Full package specification <span aria-hidden="true">↗</span></a></div>
      {cars.length > 1 && <div className="tm-variant-control"><label htmlFor={variantId}>Vehicle variant</label><select id={variantId} value={car.id} onChange={event => setCarId(event.target.value)}>{cars.map(item => <option key={item.id} value={item.id}>{item.name} · {item.engine}</option>)}</select><p>GT/GTS and GTC/GTR use separate starting outputs. Select the matching record.</p></div>}
      <div className="tm-stage-buttons" role="group" aria-label={`${modelName} tuning stages`}>{car.availableStages.filter(item => item !== 'stock').map(item => <button key={item} type="button" aria-pressed={selectedStage === item} onClick={() => setStage(item)}>{stageLabels[item]}</button>)}</div>
      <div className="tm-stage-layout">
        <div className="tm-stage-readout" aria-live="polite" aria-atomic="true">
          <p className="tm-eyebrow">{car.name} · {car.engine} · {stageLabels[selectedStage]}</p>
          <dl className="tm-output-grid">
            <div><dt>Package power <span>HP</span></dt><dd><strong data-stage-hp>{info.spec.hp}</strong><p>Stock reference {stock.hp} HP · +{info.spec.hp - stock.hp} HP</p></dd></div>
            <div><dt>Package torque <span>Nm</span></dt><dd><strong data-stage-torque>{info.spec.torque}</strong><p>Stock reference {stock.torque} Nm · +{info.spec.torque - stock.torque} Nm</p></dd></div>
          </dl>
          <dl className="tm-project-facts"><div><dt>Published price · EUR</dt><dd data-stage-price>{info.price}</dd></div><div><dt>Estimated workshop time</dt><dd data-stage-time>{info.time}</dd></div></dl>
          <p className="tm-small">{selectedStage === 'vip' ? 'Custom project reference. Hardware, output and price require an individual written proposal.' : 'Package reference figures, subject to vehicle, fuel, condition and agreed scope. Confirm the final quotation and currency before booking.'} These figures are not a dyno measurement of your vehicle. <a href="#tuning-evidence" className="tm-text-link">Read about vehicle checks and evidence</a>.</p>
          <a data-cta-placement="tuning_model_stage" className="btn-primary" href={`https://wa.me/97143402223?text=${encodeURIComponent(message)}`} target="_blank" rel="noopener noreferrer">Discuss {stageLabels[selectedStage]} on WhatsApp</a>
        </div>
        <div className="tm-stage-work"><h3>{stageLabels[selectedStage]} included work</h3><ul data-stage-mods>{mods.map((mod, index) => <li key={`${index}-${mod}`}>{mod}</li>)}</ul>{getTuningPriceNote(car.id, selectedStage) && <p className="tm-small tm-notice">{getTuningPriceNote(car.id, selectedStage)}</p>}{getTuningPublicationNote(car.id) && <p className="tm-small tm-notice">{getTuningPublicationNote(car.id)}</p>}</div>
      </div>
      <noscript><p className="tm-small">For every stage and vehicle variant, use the <a href="#performance-packages">full package comparison below</a>.</p></noscript>
    </div>
  </section>;
}
