import { awards as defaultAwards } from '../../data/company';
import { cx } from '../../lib/cx';
import { IconBox } from '../ui/IconBox';
import { Reveal } from '../ui/Reveal';
import './AwardsGrid.css';

/** Certifications and awards. variant "inline" (home) or "card" (About page). */
export function AwardsGrid({ items = defaultAwards, variant = 'inline' }) {
  const card = variant === 'card';
  return (
    <ul role="list" className={cx('awards', `awards--${variant}`)}>
      {items.map((award, index) => (
        <Reveal as="li" key={award.title} delay={card ? index * 100 : 0}>
          <div className="award" data-tilt={card ? '' : undefined}>
            <IconBox icon={award.icon} size={card ? 56 : 48} shape="circle" tone="award" iconSize={card ? 28 : 24} />
            <div>
              <h3 className="award__title">{award.title}</h3>
              <p className="award__sub">{award.sub}</p>
            </div>
          </div>
        </Reveal>
      ))}
    </ul>
  );
}
