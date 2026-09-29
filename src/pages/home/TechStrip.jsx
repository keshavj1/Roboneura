import { IconBox } from '../../components/ui/IconBox';
import { Reveal } from '../../components/ui/Reveal';
import { capabilities } from '../../data/capabilities';

/** White capability strip overlapping the hero. Each item opens the Learn More modal. */
export function TechStrip({ onSelect }) {
  return (
    <section className="tech-strip" aria-label="What we do">
      <div className="container">
        <Reveal className="tech-strip__panel">
          <ul role="list" className="tech-strip__list">
            {capabilities.map((capability) => (
              <li key={capability.id}>
                <button
                  type="button"
                  className="tech-strip__item"
                  onClick={() => onSelect(capability.solutionId)}
                  aria-haspopup="dialog"
                >
                  <IconBox icon={capability.icon} size={52} tone="soft" hue={capability.hue} iconSize={28} />
                  <span>
                    <span className="tech-strip__name">{capability.name}</span>
                    <span className="tech-strip__text">{capability.strip}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
