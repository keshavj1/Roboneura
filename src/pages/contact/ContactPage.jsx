import { useLocation } from 'react-router';
import { PageHero } from '../../components/shared/PageHero';
import { Button } from '../../components/ui/Button';
import { IconBox } from '../../components/ui/IconBox';
import { EnvelopeSimpleIcon, MapPinIcon, PhoneIcon } from '../../components/ui/icons';
import { Reveal } from '../../components/ui/Reveal';
import { Seo } from '../../components/ui/Seo';
import { TitleText } from '../../components/ui/TitleText';
import { site } from '../../config/site';
import { hueAt } from '../../lib/hues';
import { ContactForm } from './ContactForm';
import './contact.css';

const infoCards = [
  {
    title: 'Call Us',
    icon: PhoneIcon,
    lines: [<a key="phone" href={site.phone.href}>{site.phone.display}</a>, site.hours.short],
  },
  {
    title: 'Email Us',
    icon: EnvelopeSimpleIcon,
    lines: [
      <a key="info" href={`mailto:${site.email.info}`}>{site.email.info}</a>,
      <a key="careers" href={`mailto:${site.email.careers}`}>{site.email.careers}</a>,
    ],
  },
  { title: 'Visit Us', icon: MapPinIcon, lines: site.address.lines },
];

export default function ContactPage() {
  const { search } = useLocation();

  return (
    <>
      <Seo
        title="Contact"
        description="Tell ROBONEURA Dynamics about your robotics, drone, automation or computer vision project. An engineer will reply within one working day."
      />
      <PageHero
        crumb="Contact"
        overlap
        title="Let's Build Something Intelligent Together"
        lead="Tell us about your project. An engineer will get back to you within one working day."
      />

      <section className="contact-info" aria-label="Contact details">
        <div className="container">
          <ul role="list" className="contact-info__grid">
            {infoCards.map(({ title, icon, lines }, index) => (
              <Reveal as="li" key={title} delay={index * 100}>
                <div className="info-card" data-tilt="">
                  <IconBox icon={icon} size={52} tone="soft" hue={hueAt(index)} iconSize={26} />
                  <div>
                    <h2 className="info-card__title">{title}</h2>
                    {lines.map((line, i) => (
                      <p key={i} className="info-card__line">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="contact-main">
        <div className="container contact-main__grid">
          <Reveal className="contact-card">
            <p className="eyebrow">Send a Message</p>
            <h2 className="contact-card__title">
              <TitleText>Start Your *Project*</TitleText>
            </h2>
            {/* Remount when the query changes (e.g. a different "Apply Now" link). */}
            <ContactForm key={search} />
          </Reveal>

          <Reveal delay={120} className="contact-side">
            <div className="map-card">
              <iframe
                title="ROBONEURA office location on Google Maps"
                src={site.map.embedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <div className="hours-card">
              <div>
                <h2 className="hours-card__title">Office Hours</h2>
                <p>{site.hours.long}</p>
                <a href={site.map.linkUrl} className="hours-card__map" target="_blank" rel="noreferrer">
                  Open in Google Maps
                </a>
              </div>
              <Button href={site.phone.href} size="sm" icon={PhoneIcon} iconPosition="start">
                Call Us
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
