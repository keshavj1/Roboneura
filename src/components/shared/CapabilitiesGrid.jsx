import { capabilities } from '../../data/capabilities';
import { Button } from '../ui/Button';
import { IconBox } from '../ui/IconBox';
import { Reveal } from '../ui/Reveal';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import './CapabilitiesGrid.css';

/** "The Capabilities Inside Every System" on a navy gradient band. */
export function CapabilitiesGrid({ id = 'technology', showLink = false }) {
  return (
    <Section id={id} tone="band">
      <Reveal>
        <SectionHeading
          eyebrow="Technology"
          title="The Capabilities Inside Every *System*"
          actions={
            showLink ? (
              <Button to="/technology" variant="outline-light" size="sm">
                Explore our technology
              </Button>
            ) : null
          }
        />
      </Reveal>
      <ul role="list" className="capabilities">
        {capabilities.map((capability, index) => (
          <Reveal as="li" key={capability.id} delay={index * 100}>
            <div className="capability" data-tilt="">
              <IconBox icon={capability.icon} size={56} tone="glass" hue={capability.hue} iconSize={30} />
              <h3 className="capability__name">{capability.name}</h3>
              <p className="capability__text">{capability.body}</p>
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
