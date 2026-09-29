import { StatsGrid } from '../../components/shared/StatsGrid';
import { Button } from '../../components/ui/Button';
import { LogoCard } from '../../components/ui/LogoCard';
import { PlaceholderNote } from '../../components/ui/PlaceholderNote';
import { Reveal } from '../../components/ui/Reveal';
import { Section } from '../../components/ui/Section';
import { SectionHeading } from '../../components/ui/SectionHeading';

export function AboutStrip() {
  return (
    <Section id="about" tone="navy">
      <div className="about-strip">
        <Reveal className="about-strip__media">
          <LogoCard />
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
