import { site } from '../../config/site';
import { directorNames, owner } from '../../data/owner';
import { img } from '../../lib/assets';
import { cx } from '../../lib/cx';
import { Button } from '../ui/Button';
import { QuotesIcon } from '../ui/icons';
import { PlaceholderNote } from '../ui/PlaceholderNote';
import { Reveal } from '../ui/Reveal';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import './OwnerSpotlight.css';

/** Navy panel listing the directors by name and designation (Home, About and Owner pages). */
export function DirectorsPanel({ className }) {
  return (
    <div className={cx('directors-panel', className)}>
      <div className="directors-panel__head">
        {/* The complete logo on a white tile, as in the header and footer. */}
        <span className="directors-panel__logo">
          <img src={img('brand/logo-full-sm@2x.png')} alt="" width="280" height="208" loading="lazy" decoding="async" />
        </span>
        <p className="directors-panel__company">{site.legalName}</p>
      </div>
      <p className="directors-panel__title">Board of Directors</p>
      <ul role="list" className="directors-panel__list">
        {owner.directors.map((director) => (
          <li key={director.name} className="directors-panel__item">
            <span className="directors-panel__name">{director.name}</span>
            <span className="directors-panel__role">{director.designation}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** "Meet the Owners" section linking to the Owner page. */
export function OwnerSpotlight({ tone = 'white' }) {
  return (
    <Section id="owner" tone={tone} spacing="lg" aria-labelledby="owner-spotlight-title">
      <div className="owner-spot">
        <Reveal className="owner-spot__media">
          <DirectorsPanel />
        </Reveal>

        <Reveal delay={120}>
          <SectionHeading eyebrow="Meet the Owners" title="The *Vision* Behind ROBONEURA" id="owner-spotlight-title" />
          <blockquote className="owner-spot__quote">
            <QuotesIcon weight="fill" className="owner-spot__quote-icon" aria-hidden="true" />
            <p>{owner.message.excerpt}</p>
          </blockquote>
          <p className="owner-spot__intro">{owner.intro}</p>
          <p className="owner-spot__sign">
            <span className="owner-spot__name">{directorNames}</span>
            <span className="owner-spot__role">Directors, {site.shortName}</span>
          </p>
          <Button to="/owner" className="owner-spot__cta">
            Read the Directors&apos; Message
          </Button>
          <PlaceholderNote>* Draft message, to be confirmed by the directors.</PlaceholderNote>
        </Reveal>
      </div>
    </Section>
  );
}
