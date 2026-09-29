import { site } from '../../config/site';
import { owner } from '../../data/owner';
import { cx } from '../../lib/cx';
import { Button } from '../ui/Button';
import { QuotesIcon, UserIcon } from '../ui/icons';
import { Img } from '../ui/Img';
import { PlaceholderNote } from '../ui/PlaceholderNote';
import { Reveal } from '../ui/Reveal';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import './OwnerSpotlight.css';

/** The owner's portrait with a designation badge (Home, About and Owner pages). */
export function OwnerPortrait({ className }) {
  return (
    <div className={cx('owner-portrait', className)}>
      <div className="owner-portrait__frame">
        <Img
          src={owner.photo}
          alt={owner.photo ? `${owner.name}, ${owner.designation}, ${site.shortName}` : ''}
          ratio="4 / 5"
          placeholder={{ tone: 'light', icon: UserIcon, label: 'Owner photo' }}
        />
      </div>
      <p className="owner-portrait__badge">
        <span className="owner-portrait__badge-title">{owner.designation}</span>
        <span className="owner-portrait__badge-sub">{site.shortName}</span>
      </p>
    </div>
  );
}

/** "Meet the Owner" section linking to the Owner page. */
export function OwnerSpotlight({ tone = 'white' }) {
  return (
    <Section id="owner" tone={tone} spacing="lg" aria-labelledby="owner-spotlight-title">
      <div className="owner-spot">
        <Reveal className="owner-spot__media">
          <OwnerPortrait />
        </Reveal>

        <Reveal delay={120}>
          <SectionHeading eyebrow="Meet the Owner" title="The *Vision* Behind ROBONEURA" id="owner-spotlight-title" />
          <blockquote className="owner-spot__quote">
            <QuotesIcon weight="fill" className="owner-spot__quote-icon" aria-hidden="true" />
            <p>{owner.message.excerpt}</p>
          </blockquote>
          <p className="owner-spot__intro">{owner.intro}</p>
          <p className="owner-spot__sign">
            <span className="owner-spot__name">{owner.name}</span>
            <span className="owner-spot__role">
              {owner.designation}, {site.shortName}
            </span>
          </p>
          <Button to="/owner" className="owner-spot__cta">
            Read the Owner&apos;s Message
          </Button>
          <PlaceholderNote>* Placeholder: add the owner&apos;s name, photo and message in src/data/owner.js.</PlaceholderNote>
        </Reveal>
      </div>
    </Section>
  );
}
