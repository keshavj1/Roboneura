import { Accordion } from '../../components/ui/Accordion';
import { Button } from '../../components/ui/Button';
import { Reveal } from '../../components/ui/Reveal';
import { Section } from '../../components/ui/Section';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { faqs } from '../../data/content';

export function Faq() {
  return (
    <Section tone="white" spacing="lg">
      <div className="faq">
        <Reveal>
          <SectionHeading
            eyebrow="FAQ"
            title="Frequently Asked *Questions*"
            lead="Can't find what you need? Our engineers will answer directly."
          />
          <Button to="/contact" variant="dark" className="faq__cta">
            Ask a Question
          </Button>
        </Reveal>
        <Reveal delay={100}>
          <Accordion items={faqs} defaultOpen={0} />
        </Reveal>
      </div>
    </Section>
  );
}
