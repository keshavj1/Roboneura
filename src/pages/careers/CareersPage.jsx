import { CtaBanner } from '../../components/shared/CtaBanner';
import { JobsBoard } from '../../components/shared/JobsBoard';
import { HeroChips, PageHero } from '../../components/shared/PageHero';
import { ProcessSteps } from '../../components/shared/ProcessSteps';
import { IconBox } from '../../components/ui/IconBox';
import { BriefcaseIcon, PathIcon, RocketLaunchIcon } from '../../components/ui/icons';
import { PlaceholderNote } from '../../components/ui/PlaceholderNote';
import { Reveal } from '../../components/ui/Reveal';
import { Section } from '../../components/ui/Section';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { Seo } from '../../components/ui/Seo';
import { site } from '../../config/site';
import { hiringSteps } from '../../data/process';
import { perks } from '../../data/jobs';
import { hueAt } from '../../lib/hues';
import './careers.css';

const chips = [
  { label: 'Why join us', to: '#why-join', icon: RocketLaunchIcon },
  { label: 'Open roles', to: '#openings', icon: BriefcaseIcon },
  { label: 'How we hire', to: '#hiring', icon: PathIcon },
];

export default function CareersPage() {
  return (
    <>
      <Seo
        title="Careers"
        description="Robotics, drone, embedded and computer vision jobs at ROBONEURA Dynamics in Lucknow. Build machines that work outside the lab."
      />
      <PageHero
        crumb="Career"
        title="Build the Future with Us"
        lead="We hire engineers who like to see their work run outside the lab."
      >
        <HeroChips items={chips} />
      </PageHero>

      <Section id="why-join" tone="white" spacing="lg">
        <Reveal>
          <SectionHeading
            eyebrow="Why ROBONEURA"
            title="Engineering That Leaves the *Lab*"
            lead="Small, hands-on teams building real machines for real sites. Here is what that means day to day."
          />
        </Reveal>
        <ul role="list" className="perks">
          {perks.map((perk, index) => (
            <Reveal as="li" key={perk.title} delay={index * 100}>
              <div className="perk">
                <IconBox icon={perk.icon} size={52} tone="soft" hue={hueAt(index)} iconSize={28} />
                <h3 className="perk__title">{perk.title}</h3>
                <p className="perk__text">{perk.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
        <PlaceholderNote>* Draft copy: confirm details with HR.</PlaceholderNote>
      </Section>

      <JobsBoard
        id="openings"
        eyebrow="Open Roles"
        title="Current *Openings*"
        lead="Choose a team to filter. Apply Now opens the contact form with the role filled in."
      />

      <ProcessSteps
        id="hiring"
        tone="white"
        steps={hiringSteps}
        eyebrow="How We Hire"
        title="A Hiring Process That Respects Your *Time*"
      />

      <CtaBanner
        title="Don’t See the Right *Role?*"
        text={`Send your CV and a note about what you would like to build to ${site.email.careers}.`}
        action={{ label: 'Email Your CV', href: `mailto:${site.email.careers}?subject=${encodeURIComponent('Open application')}` }}
      />
    </>
  );
}
