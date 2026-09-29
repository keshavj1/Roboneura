import { StatsGrid } from '../../components/shared/StatsGrid';
import { Button } from '../../components/ui/Button';
import { Img } from '../../components/ui/Img';
import { PlaceholderNote } from '../../components/ui/PlaceholderNote';
import { Reveal } from '../../components/ui/Reveal';
import { Section } from '../../components/ui/Section';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { img } from '../../lib/assets';

export function AboutStrip() {
  return (
    <Section id="about" tone="navy">
      <div className="about-strip">
        <Reveal className="about-strip__media">
          <Img
            src={img('engineering-lab.webp')}
            srcSet={`${img('engineering-lab-840.webp')} 840w, ${img('engineering-lab.webp')} 1680w`}
            sizes="(min-width: 1000px) 400px, 100vw"
            alt="Engineers working with robots in a bright lab: a four-legged robot and a delivery robot by the open door, a humanoid robot at the desk, and a green city with wind turbines outside"
            ratio="1680 / 944"
            position="62% center"
          />
        </Reveal>
        <Reveal delay={100}>
          <SectionHeading
            eyebrow="About Us"
            size="sm"
            title="Engineering Intelligence for a Better *Future*"
            lead="ROBONEURA DYNAMICS PRIVATE LIMITED is a technology-driven company focused on robotics, drone systems and automation. We combine engineering expertise with innovation to create solutions that make industries safer, smarter and more sustainable."
          />
          <Button to="/about" className="about-strip__cta">
            Know More About Us
          </Button>
        </Reveal>
        <Reveal delay={200}>
          <StatsGrid variant="tiles" />
          <PlaceholderNote>* Placeholder figures, pending verified company data.</PlaceholderNote>
        </Reveal>
      </div>
    </Section>
  );
}
