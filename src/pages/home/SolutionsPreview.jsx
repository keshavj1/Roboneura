import { Button } from '../../components/ui/Button';
import { Img } from '../../components/ui/Img';
import { Reveal } from '../../components/ui/Reveal';
import { Section } from '../../components/ui/Section';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { solutions } from '../../data/solutions';

const featured = solutions.filter((solution) => solution.featured);

export function SolutionsPreview({ onLearnMore }) {
  return (
    <Section id="solutions" tone="light" spacing="lg">
      <div className="solutions-preview">
        <Reveal className="solutions-preview__intro">
          <SectionHeading
            eyebrow="Our Solutions"
            title="Tailored Technology for Real-World *Impact*"
            lead="From autonomous robots to advanced drone systems, we build solutions that help industries work smarter, safer and more efficiently."
          />
          <Button to="/solutions" variant="dark" className="solutions-preview__cta">
            View All Solutions
          </Button>
        </Reveal>

        {featured.map((solution, index) => (
          <Reveal as="article" key={solution.id} delay={index * 120} className="solution-card-wrap">
            <div className="solution-card" data-tilt="">
              <Img src={solution.image} alt="" ratio="16 / 10" position={solution.imagePosition} />
              <div className="solution-card__body">
                <h3 className="solution-card__title">{solution.title}</h3>
                <p className="solution-card__text">{solution.summary}</p>
                <Button variant="link" onClick={() => onLearnMore(solution.id)} aria-haspopup="dialog">
                  Learn More<span className="sr-only"> about {solution.title}</span>
                </Button>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
