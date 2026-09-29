import { processSteps } from '../../data/process';
import { hueAt } from '../../lib/hues';
import { IconBox } from '../ui/IconBox';
import { Reveal } from '../ui/Reveal';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import './ProcessSteps.css';

/** Numbered steps joined by a dashed line (Discover -> Deploy, hiring steps, ...). */
export function ProcessSteps({
  steps = processSteps,
  eyebrow = 'Our Process',
  title = 'From Concept to Real-World *Deployment*',
  lead,
  tone = 'light',
  id,
  className,
}) {
  return (
    <Section id={id} tone={tone} className={className}>
      <Reveal>
        <SectionHeading eyebrow={eyebrow} title={title} lead={lead} />
      </Reveal>
      <ol role="list" className="process">
        {steps.map((step, index) => (
          <Reveal as="li" key={step.title} delay={index * 100} className={`process__step hue-${hueAt(index)}`}>
            <div className="process__head">
              <IconBox icon={step.icon} size={64} shape="circle" tone={tone === 'white' ? 'muted' : 'white'} iconSize={30} />
              <span className="process__line" aria-hidden="true" />
            </div>
            <h3 className="process__title">
              <span className="process__num">{index + 1}.</span> {step.title}
            </h3>
            <p className="process__text">{step.body}</p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
