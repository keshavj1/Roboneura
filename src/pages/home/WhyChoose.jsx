import { IconBox } from '../../components/ui/IconBox';
import { Img } from '../../components/ui/Img';
import { Reveal } from '../../components/ui/Reveal';
import { Section } from '../../components/ui/Section';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { reasons } from '../../data/company';
import { img } from '../../lib/assets';
import { hueAt } from '../../lib/hues';

export function WhyChoose() {
  return (
    <Section tone="band" className="why">
      <div className="why__grid">
        <Reveal>
          <SectionHeading title="Why *Choose* ROBONEURA?" lead="We don't just build technology, we build trust." />
          <ul role="list" className="why__list">
            {reasons.map((reason, index) => (
              <li key={reason.title} className="why__item">
                <IconBox icon={reason.icon} size={46} shape="circle" tone="glass-ring" hue={hueAt(index)} iconSize={22} />
                <div>
                  <h3 className="why__title">{reason.title}</h3>
                  <p className="why__text">{reason.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
        <div className="why__visual">
          <div className="why__float">
            <Img
              src={img('why-choose.webp')}
              alt="A quadruped robot carrying a drone across a mountain ridge at sunset"
              className="why__image"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
