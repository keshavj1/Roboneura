import { Link } from 'react-router';
import { legalNav, mainNav, site } from '../../config/site';
import { EnvelopeSimpleIcon, MapPinIcon, PhoneIcon } from '../ui/icons';
import { BrandLogo } from './BrandLogo';
import { NewsletterForm } from './NewsletterForm';
import './Footer.css';

const YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <section className="newsletter" aria-labelledby="newsletter-title">
          <div className="newsletter__copy">
            <h2 id="newsletter-title" className="newsletter__title">
              Subscribe to our newsletter
            </h2>
            <p>Project stories, product updates and engineering notes. No spam.</p>
          </div>
          <NewsletterForm />
        </section>

        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <BrandLogo size="lg" />
            <p>
              {site.pillars}
              <br />
              {site.tagline}
            </p>
          </div>

          <nav aria-labelledby="footer-links">
            <h2 id="footer-links" className="site-footer__title">
              Quick Links
            </h2>
            <ul role="list" className="site-footer__links">
              {mainNav.map((item) => (
                <li key={item.to}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="site-footer__title">Contact Us</h2>
            <ul role="list" className="site-footer__contact">
              <li className="hue-blue">
                <PhoneIcon weight="duotone" aria-hidden="true" />
                <a href={site.phone.href}>{site.phone.display}</a>
              </li>
              <li className="hue-cyan">
                <EnvelopeSimpleIcon weight="duotone" aria-hidden="true" />
                <a href={`mailto:${site.email.info}`}>{site.email.info}</a>
              </li>
              <li className="hue-magenta">
                <MapPinIcon weight="duotone" aria-hidden="true" />
                <span>{site.address.full}</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="site-footer__title">Follow Us</h2>
            <ul role="list" className="social">
              {site.social.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a href={href} className="social__link" aria-label={label}>
                    <Icon aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p>
            © {YEAR} {site.legalName}. All Rights Reserved.
          </p>
          <ul role="list">
            {legalNav.map((item) => (
              <li key={item.to}>
                <Link to={item.to}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
