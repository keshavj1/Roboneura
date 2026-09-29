import { Link } from 'react-router';
import { CtaBanner } from '../../components/shared/CtaBanner';
import { OwnerPortrait } from '../../components/shared/OwnerSpotlight';
import { PageHero } from '../../components/shared/PageHero';
import { Button } from '../../components/ui/Button';
import { IconBox } from '../../components/ui/IconBox';
import { ArrowRightIcon, LinkedinLogoIcon, QuotesIcon } from '../../components/ui/icons';
import { PlaceholderNote } from '../../components/ui/PlaceholderNote';
import { Reveal } from '../../components/ui/Reveal';
import { Section } from '../../components/ui/Section';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { Seo } from '../../components/ui/Seo';
import { site } from '../../config/site';
import { owner } from '../../data/owner';
import { solutions } from '../../data/solutions';
import { hueAt } from '../../lib/hues';
import './owner.css';

const facts = [
  { label: 'Company', value: site.legalName },
  { label: 'Based in', value: 'Lucknow, Uttar Pradesh, India' },
  { label: 'Focus', value: solutions.map((s) => s.title).join(' · ') },
];

export default function OwnerPage() {
  return (
    <>
      <Seo
        title="Owner"
        description="Meet the owner of ROBONEURA DYNAMICS PRIVATE LIMITED and read their message on building robots, drones and automation that do real work."
      />
      <PageHero
        crumb="Owner"
        title="Meet the Owner"
        lead="The person leading ROBONEURA Dynamics, and the principles behind every robot, drone and system we deliver."
      />

      <Section tone="light" spacing="lg" aria-labelledby="owner-name">
        <div className="owner-profile">
          <Reveal>
            <OwnerPortrait />
          </Reveal>

          <Reveal delay={120}>
            <p className="eyebrow">Owner Profile</p>
            <h2 id="owner-name" className="owner-profile__name">
              {owner.name}
            </h2>
            <p className="owner-profile__role">
              {owner.designation}, {site.legalName}
            </p>
            <p className="owner-profile__intro">{owner.intro}</p>
            {owner.bio.map((paragraph) => (
              <p key={paragraph} className="owner-profile__text">
                {paragraph}
              </p>
            ))}
            <dl className="owner-facts">
              {facts.map(({ label, value }) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
            <div className="owner-profile__actions">
              <Button to="/contact">Get in Touch</Button>
              {owner.linkedin && (
                <Button
                  href={owner.linkedin}
                  variant="outline"
                  icon={LinkedinLogoIcon}
                  iconPosition="start"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </Button>
              )}
            </div>
            <PlaceholderNote>
              * Placeholder: add the owner&apos;s name, designation, photo and message in src/data/owner.js.
            </PlaceholderNote>
          </Reveal>
        </div>
      </Section>

      <Section tone="white" spacing="lg" aria-labelledby="owner-message-title">
        <Reveal className="owner-letter">
          <QuotesIcon weight="fill" className="owner-letter__icon" aria-hidden="true" />
          <SectionHeading
            eyebrow="In the Owner's Words"
            title="A Message from the *Owner*"
            id="owner-message-title"
            align="center"
          />
          <div className="owner-letter__body">
            {owner.message.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <p className="owner-letter__sign">
            <span className="owner-letter__name">{owner.name}</span>
            <span className="owner-letter__role">
              {owner.designation}, {site.shortName}
            </span>
          </p>
        </Reveal>
      </Section>

      <Section tone="band" aria-labelledby="owner-principles-title">
        <Reveal>
          <SectionHeading
            eyebrow="Leadership Principles"
            title="What Guides Every *Project*"
            id="owner-principles-title"
            align="center"
          />
        </Reveal>
        <ul role="list" className="owner-principles">
          {owner.principles.map((principle, index) => (
            <Reveal as="li" key={principle.title} delay={index * 100}>
              <article className="principle-card">
                <IconBox icon={principle.icon} size={56} tone="glass" hue={hueAt(index)} iconSize={30} />
                <h3 className="principle-card__title">{principle.title}</h3>
                <p className="principle-card__text">{principle.body}</p>
              </article>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section tone="light" spacing="lg" aria-labelledby="owner-focus-title">
        <Reveal>
          <SectionHeading
            eyebrow="Areas of Focus"
            title="Where We Put Our *Energy*"
            id="owner-focus-title"
            lead="Four solution areas, one engineering team, from the first site visit to the system in service."
          />
        </Reveal>
        <ul role="list" className="focus-grid">
          {solutions.map((solution, index) => (
            <Reveal as="li" key={solution.id} delay={index * 80}>
              <Link to={`/solutions#${solution.id}`} className="focus-card" data-tilt="">
                <IconBox icon={solution.icon} size={52} tone="soft" hue={solution.hue} iconSize={28} />
                <h3 className="focus-card__title">{solution.title}</h3>
                <p className="focus-card__text">{solution.summary}</p>
                <span className="focus-card__more">
                  Explore <ArrowRightIcon aria-hidden="true" />
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Section>

      <CtaBanner flushTop />
    </>
  );
}
