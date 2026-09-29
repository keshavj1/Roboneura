import { Link } from 'react-router';
import { CapabilitiesGrid } from '../../components/shared/CapabilitiesGrid';
import { CtaBanner } from '../../components/shared/CtaBanner';
import { HeroChips, PageHero } from '../../components/shared/PageHero';
import { ProcessSteps } from '../../components/shared/ProcessSteps';
import { Button } from '../../components/ui/Button';
import { IconBox } from '../../components/ui/IconBox';
import { CheckCircleIcon } from '../../components/ui/icons';
import { Img } from '../../components/ui/Img';
import { Reveal } from '../../components/ui/Reveal';
import { Section } from '../../components/ui/Section';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { Seo } from '../../components/ui/Seo';
import { industries } from '../../data/industries';
import { solutions } from '../../data/solutions';
import { cx } from '../../lib/cx';
import { hueAt } from '../../lib/hues';
import './solutions.css';

export default function SolutionsPage() {
  return (
    <>
      <Seo
        title="Solutions"
        description="Robotics, drone solutions, automation systems and computer vision from ROBONEURA Dynamics: designed around your site, payload and workflow."
      />
      <PageHero
        crumb="Solutions"
        title="Tailored Technology for Real-World Impact"
        lead="From autonomous robots to advanced drone systems, we build solutions that help industries work smarter, safer and more efficiently."
      >
        <HeroChips items={solutions.map((s) => ({ label: s.title, to: `#${s.id}`, icon: s.icon }))} label="Solutions on this page" />
      </PageHero>

      <Section tone="light" spacing="lg">
        <div className="solution-rows">
          {solutions.map((solution, index) => (
            <article
              key={solution.id}
              id={solution.id}
              className={cx('solution-row', `hue-${solution.hue}`, index % 2 === 1 && 'solution-row--reverse')}
              aria-labelledby={`${solution.id}-title`}
            >
              <Reveal className="solution-row__media">
                <div className="solution-row__frame" data-tilt="">
                  <Img src={solution.image} alt={solution.imageAlt} ratio="16 / 10" position={solution.imagePosition} />
                </div>
              </Reveal>
              <Reveal delay={120} className="solution-row__body">
                <p className="eyebrow">
                  <IconBox icon={solution.icon} size={40} tone="soft" iconSize={22} />
                  {solution.kicker}
                </p>
                <h2 id={`${solution.id}-title`} className="solution-row__title">
                  {solution.title}
                </h2>
                <p className="solution-row__text">{solution.body}</p>
                <ul role="list" className="check-list solution-row__features">
                  {solution.features.map((feature) => (
                    <li key={feature}>
                      <CheckCircleIcon weight="duotone" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button to={`/contact?interest=${encodeURIComponent(solution.interest)}`} variant="dark" className="solution-row__cta">
                  Request a Consultation
                </Button>
              </Reveal>
            </article>
          ))}
        </div>
      </Section>

      <CapabilitiesGrid id="technology" showLink />

      <Section tone="light">
        <Reveal>
          <SectionHeading eyebrow="Industries" title="Deployed Across *Sectors*" />
        </Reveal>
        <Reveal delay={100}>
          <ul role="list" className="industry-pills">
            {industries.map(({ id, name, icon: Icon }, index) => (
              <li key={id}>
                <Link to={`/industries#${id}`} className={`industry-pill hue-${hueAt(index)}`}>
                  <Icon weight="duotone" aria-hidden="true" />
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <ProcessSteps tone="white" />

      <CtaBanner />
    </>
  );
}
