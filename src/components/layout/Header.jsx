import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router';
import { mainNav, site } from '../../config/site';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useScrollLock } from '../../hooks/useScrollLock';
import { useScrolledPast } from '../../hooks/useScrolledPast';
import { cx } from '../../lib/cx';
import { Button } from '../ui/Button';
import { ClockIcon, EnvelopeSimpleIcon, ListIcon, MapPinIcon, PhoneIcon, XIcon } from '../ui/icons';
import { BrandLogo } from './BrandLogo';
import './Header.css';

/** Address, email, hours and social links above the navigation (wide screens; folds away on scroll). */
function InfoBar() {
  return (
    <div className="topbar">
      <ul role="list" className="topbar__info">
        <li>
          <MapPinIcon weight="duotone" aria-hidden="true" />
          <a href={site.map.linkUrl} target="_blank" rel="noreferrer">
            {site.address.short}
          </a>
        </li>
        <li>
          <EnvelopeSimpleIcon weight="duotone" aria-hidden="true" />
          <a href={`mailto:${site.email.info}`}>{site.email.info}</a>
        </li>
        <li className="topbar__hours">
          <ClockIcon weight="duotone" aria-hidden="true" />
          <span>{site.hours.long}</span>
        </li>
      </ul>
      <ul role="list" className="topbar__social">
        {site.social.map(({ label, href, icon: Icon }) => (
          <li key={label}>
            <a href={href} aria-label={label}>
              <Icon aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Header() {
  const scrolled = useScrolledPast(40);
  const isDesktop = useMediaQuery('(min-width: 1000px)');
  const location = useLocation();
  // The menu belongs to the page it was opened on, so any navigation closes it.
  const [menuKey, setMenuKey] = useState(null);
  const open = !isDesktop && menuKey === location.key;
  const toggleRef = useRef(null);
  const panelRef = useRef(null);

  useScrollLock(open);

  useEffect(() => {
    if (!open) return undefined;
    const outside = [document.getElementById('main'), document.querySelector('.site-footer')].filter(Boolean);
    outside.forEach((el) => el.setAttribute('inert', ''));
    panelRef.current?.querySelector('a')?.focus();

    const onKeyDown = (event) => {
      if (event.key !== 'Escape') return;
      setMenuKey(null);
      toggleRef.current?.focus();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      outside.forEach((el) => el.removeAttribute('inert'));
    };
  }, [open]);

  const infoBar = site.flags.showHeaderInfoBar;

  return (
    <header className={cx('site-header', infoBar && 'site-header--info', scrolled && 'is-scrolled', open && 'is-open')}>
      <div className="container site-header__inner">
        <div className="site-header__brand">
          <BrandLogo placement="header" />
        </div>

        {infoBar && <InfoBar />}

        <div className="site-header__bar">
          <nav className="site-nav" aria-label="Main">
            <ul role="list">
              {mainNav.map((item) => (
                <li key={item.to}>
                  <NavLink to={item.to} end={item.to === '/'} className="site-nav__link">
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <Button to="/contact" size="sm" className="site-header__cta">
            Get in Touch
          </Button>

          <button
            ref={toggleRef}
            type="button"
            className="site-header__toggle"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuKey(open ? null : location.key)}
          >
            {open ? <XIcon aria-hidden="true" /> : <ListIcon aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div id="mobile-nav" ref={panelRef} className="mobile-nav" hidden={!open}>
        <nav className="container" aria-label="Main">
          <ul role="list">
            {mainNav.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.to === '/'} className="mobile-nav__link">
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <Button to="/contact" block className="mobile-nav__cta">
            Get in Touch
          </Button>
          <ul role="list" className="mobile-nav__contact">
            <li className="hue-magenta">
              <MapPinIcon weight="duotone" aria-hidden="true" />
              <span>{site.address.full}</span>
            </li>
            <li className="hue-blue">
              <PhoneIcon weight="duotone" aria-hidden="true" />
              <a href={site.phone.href}>{site.phone.display}</a>
            </li>
            <li className="hue-cyan">
              <EnvelopeSimpleIcon weight="duotone" aria-hidden="true" />
              <a href={`mailto:${site.email.info}`}>{site.email.info}</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
