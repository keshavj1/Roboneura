import { IconBox } from '../../components/ui/IconBox';
import { PlaceholderNote } from '../../components/ui/PlaceholderNote';
import { Reveal } from '../../components/ui/Reveal';
import { Section } from '../../components/ui/Section';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { techStack } from '../../data/techStack';
import { hueAt } from '../../lib/hues';

export function TechStack() {
  return (
    <Section id="tech-stack" tone="white" spacing="lg">
      <Reveal>
        <SectionHeading
          eyebrow="Technology Stack"
          title="Proven Tools, Engineered *Together*"
          lead="We build on mature, well-supported tools at every layer, so your system stays maintainable long after handover."
        />
      </Reveal>
      <ul role="list" className="stack-grid">
        {techStack.map((group, index) => (
          <Reveal as="li" key={group.title} delay={(index % 3) * 100}>
            <div className="stack-card">
              <div className="stack-card__head">
                <IconBox icon={group.icon} size={48} tone="soft" hue={hueAt(index)} iconSize={26} />
                <div>
                  <h3 className="stack-card__title">{group.title}</h3>
                  <p className="stack-card__layers">
                    <span className="sr-only">Architecture layers: </span>
                    {group.layers.join(' · ')}
                  </p>
                </div>
              </div>
              <p className="stack-card__purpose">{group.purpose}</p>
              <ul role="list" className="stack-card__items">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </ul>
      <PlaceholderNote>* Representative stack; the exact tools are chosen per project.</PlaceholderNote>
    </Section>
  );
}
