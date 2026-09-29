import { IndustriesGrid } from '../../components/shared/IndustriesGrid';
import { Button } from '../../components/ui/Button';
import { Reveal } from '../../components/ui/Reveal';
import { Section } from '../../components/ui/Section';
import { SectionHeading } from '../../components/ui/SectionHeading';

export function IndustriesOverview() {
  return (
    <Section id="industries" tone="white" className="industries-overview">
      <Reveal>
        <SectionHeading
          eyebrow="Industries We Serve"
          title="Smart Solutions for Multiple *Sectors*"
          lead="Our robotics and drone solutions are transforming industries across the globe, driving efficiency, safety and sustainability."
          actions={
            <Button to="/industries" variant="outline" size="sm">
              View All Industries
            </Button>
          }
        />
      </Reveal>
      <IndustriesGrid />
    </Section>
  );
}
