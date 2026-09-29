import { Link } from 'react-router';
import { CaseStudies } from '../../components/shared/CaseStudies';
import { CtaBanner } from '../../components/shared/CtaBanner';
import { HeroChips, PageHero } from '../../components/shared/PageHero';
import { Button } from '../../components/ui/Button';
import { IconBox } from '../../components/ui/IconBox';
import { CheckCircleIcon } from '../../components/ui/icons';
import { Img } from '../../components/ui/Img';
import { Reveal } from '../../components/ui/Reveal';
import { Section } from '../../components/ui/Section';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { Seo } from '../../components/ui/Seo';
import { industries } from '../../data/industries';
import { solutionById } from '../../data/solutions';
import { hueAt } from '../../lib/hues';
import './industries.css';

export default function IndustriesPage() {
  return (
    <>
      <Seo
        title="Industries"
        description="Robotics, drones, automation and computer vision for manufacturing, infrastructure, agriculture, logistics, energy, research, security and construction."
      />
      <PageHero
        crumb="Industries"
        title="Robotics and Drones Built for Your Industry"
        lead="From factory floors to farmland, every system is engineered around the realities of your sector."
      >
        <HeroChips items={industries.map((i) => ({ label: i.name, to: `#${i.id}`, icon: i.icon }))} label="Industries on this page" />
      </PageHero>

      <Section tone="light" spacing="lg">
        <Reveal>
          <SectionHeading
            eyebrow="Industries We Serve"
            title="Smart Solutions for Multiple *Sectors*"
            lead="Our robotics and drone solutions are transforming industries, driving efficiency, safety and sustainability. Here is where they make the biggest difference."
          />
        </Reveal>

        <div className="industry-details">
          {industries.map((industry, index) => {
            const primary = solutionById[industry.solutions[0]];
            return (
              <Reveal
                as="article"
                key={industry.id}
                id={industry.id}
                delay={(index % 2) * 100}
                className="industry-detail"
                aria-labelledby={`${industry.id}-title`}
              >
                <div className="industry-detail__media">
                  <Img src={industry.image} alt={industry.imageAlt} ratio="16 / 9" position={industry.imagePosition} />
                  <IconBox
                    icon={industry.icon}
                    size={48}
                    tone="solid"
                    hue={hueAt(index)}
                    iconSize={24}
                    className="industry-detail__badge"
                  />
                </div>
                <div className="industry-detail__body">
                  <h2 id={`${industry.id}-title`} className="industry-detail__title">
                    {industry.name}
                  </h2>
                  <p className="industry-detail__text">{industry.summary}</p>
                  <ul role="list" className="check-list industry-detail__uses">
                    {industry.useCases.map((useCase) => (
                      <li key={useCase}>
                        <CheckCircleIcon weight="duotone" aria-hidden="true" />
                        {useCase}
                      </li>
                    ))}
                  </ul>
                  <div className="industry-detail__footer">
                    <ul role="list" className="tag-list" aria-label={`Solutions for ${industry.name}`}>
                      {industry.solutions.map((id) => (
                        <li key={id}>
                          <Link to={`/solutions#${id}`} className="tag">
                            {solutionById[id].title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Button to={`/contact?interest=${encodeURIComponent(primary.interest)}`} variant="link">
                      Discuss your project<span className="sr-only"> in {industry.name}</span>
                    </Button>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <CaseStudies tone="white" limitAll={6} />

      <CtaBanner />
    </>
  );
}
