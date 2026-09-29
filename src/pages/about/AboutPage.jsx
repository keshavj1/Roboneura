import { AwardsGrid } from '../../components/shared/AwardsGrid';
import { CtaBanner } from '../../components/shared/CtaBanner';
import { JobsBoard } from '../../components/shared/JobsBoard';
import { OwnerSpotlight } from '../../components/shared/OwnerSpotlight';
import { PageHero } from '../../components/shared/PageHero';
import { StatsGrid } from '../../components/shared/StatsGrid';
import { CountUp } from '../../components/ui/CountUp';
import { Img } from '../../components/ui/Img';
import { LinkedinLogoIcon, UserIcon } from '../../components/ui/icons';
import { PlaceholderNote } from '../../components/ui/PlaceholderNote';
import { Reveal } from '../../components/ui/Reveal';
import { Section } from '../../components/ui/Section';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { Seo } from '../../components/ui/Seo';
import { site } from '../../config/site';
import { pillars } from '../../data/company';
import { team } from '../../data/content';
import { img } from '../../lib/assets';
import './about.css';

export default function AboutPage() {
  return (
    <>
      <Seo
        title="About Us"
        description="Meet ROBONEURA DYNAMICS PRIVATE LIMITED: mechanical, electronics, embedded and AI engineers building robots, drones and automation that make industry safer and smarter."
      />
      <PageHero
        crumb="About Us"
        title="Engineering Intelligence for a Better Future"
        lead="A technology-driven company building robots, drones and automation that make industries safer, smarter and more sustainable."
      />

      <Section tone="light" spacing="lg">
        <div className="who">
          <Reveal className="who__media">
            <div className="who__frame">
              <Img
                src={img('real-world-robots.webp')}
                srcSet={`${img('real-world-robots-840.webp')} 840w, ${img('real-world-robots.webp')} 1680w`}
                sizes="(min-width: 1000px) 600px, 100vw"
                alt="Robots at work in the real world: a humanoid robot, a delivery robot and a four-legged robot on a city street, a farm robot among crops, and an inspection robot under a bridge"
                ratio="1680 / 944"
              />
            </div>
            <div className="who__badge">
              <CountUp end={5} suffix="+" className="who__badge-value" />
              <span className="who__badge-label">Industries served{site.flags.showPlaceholderNotes && '*'}</span>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <SectionHeading eyebrow="Who We Are" title="Robots that leave the lab and work in the *real world*" />
            <p className="who__text">
              ROBONEURA DYNAMICS PRIVATE LIMITED is a technology-driven company focused on robotics, drone systems and
              automation. We combine engineering expertise with innovation to create solutions that make industries safer,
              smarter and more sustainable.
            </p>
            <p className="who__text">
              Mechanical, electronics, embedded software and AI engineers work as one team, taking each project from first
              site visit to a system in service.
            </p>
            <ul role="list" className="pillars">
              {pillars.map(({ title, body, icon: Icon }) => (
                <li key={title} className="pillar">
                  <Icon weight="duotone" className="pillar__icon" aria-hidden="true" />
                  <div>
                    <h3 className="pillar__title">{title}</h3>
                    <p className="pillar__text">{body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <Section tone="navy" spacing="sm" aria-label="Company in numbers">
        <StatsGrid variant="band" />
        <PlaceholderNote>* Placeholder figures, pending verified company data.</PlaceholderNote>
      </Section>

      <OwnerSpotlight />

      <Section tone="light" spacing="lg">
        <Reveal>
          <SectionHeading eyebrow="Our Team" title="Meet the Engineers Behind the *Machines*" align="center" />
        </Reveal>
        <ul role="list" className="team">
          {team.map((member, index) => (
            <Reveal as="li" key={member.role} delay={index * 100}>
              <article className="team-card" data-tilt="">
                <Img
                  src={member.photo}
                  alt={member.photo ? `${member.name}, ${member.role}` : ''}
                  ratio="1 / 1"
                  placeholder={{ tone: 'light', icon: UserIcon, label: 'Team member photo' }}
                />
                <div className="team-card__body">
                  <div>
                    <h3 className="team-card__name">{member.name}</h3>
                    <p className="team-card__role">{member.role}</p>
                  </div>
                  <a href={member.linkedin} className="team-card__social" aria-label={`${member.name} on LinkedIn`}>
                    <LinkedinLogoIcon aria-hidden="true" />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section tone="white">
        <Reveal>
          <SectionHeading eyebrow="Awards & Certifications" title="Recognised for Quality and *Safety*" />
        </Reveal>
        <div className="about-awards">
          <AwardsGrid variant="card" />
        </div>
      </Section>

      <JobsBoard id="careers" showCareersLink />

      <CtaBanner flushTop />
    </>
  );
}
