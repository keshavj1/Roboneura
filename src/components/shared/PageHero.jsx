import { cx } from '../../lib/cx';
import { Breadcrumb } from '../ui/Breadcrumb';
import { SmartLink } from '../ui/SmartLink';
import './PageHero.css';

/** Navy title band at the top of every inner page. */
export function PageHero({ crumb, title, lead, overlap = false, children }) {
  return (
    <section className={cx('page-hero', overlap && 'page-hero--overlap')} aria-labelledby="page-title">
      <div className="page-hero__grid" aria-hidden="true" />
      <div className="container page-hero__inner">
        <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: crumb }]} />
        <h1 id="page-title" className="page-hero__title">
          {title}
        </h1>
        {lead && <p className="page-hero__lead">{lead}</p>}
        {children}
      </div>
    </section>
  );
}

/** Outline chips under a page title that jump to sections of the page. */
export function HeroChips({ items, label = 'On this page' }) {
  return (
    <nav aria-label={label}>
      <ul role="list" className="hero-chips">
        {items.map(({ label: text, to, icon: Icon }) => (
          <li key={to}>
            <SmartLink to={to} className="hero-chip">
              {Icon && <Icon weight="duotone" aria-hidden="true" />}
              {text}
            </SmartLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
