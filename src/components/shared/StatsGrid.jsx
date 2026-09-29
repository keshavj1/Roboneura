import { stats as defaultStats } from '../../data/company';
import { cx } from '../../lib/cx';
import { hueAt } from '../../lib/hues';
import { CountUp } from '../ui/CountUp';
import { IconBox } from '../ui/IconBox';
import { Reveal } from '../ui/Reveal';
import './StatsGrid.css';

/** Headline numbers. variant "tiles" (home, with icons) or "band" (About page, large). */
export function StatsGrid({ items = defaultStats, variant = 'tiles' }) {
  if (variant === 'band') {
    return (
      <ul role="list" className="stats-band">
        {items.map((stat, index) => (
          <Reveal as="li" key={stat.label} delay={index * 100} className={cx('stats-band__item', `hue-${hueAt(index)}`)}>
            <CountUp end={stat.value} suffix={stat.suffix} className="stats-band__value" />
            <span className="stats-band__label">{stat.label}</span>
          </Reveal>
        ))}
      </ul>
    );
  }

  return (
    <ul role="list" className="stats-tiles">
      {items.map((stat, index) => (
        <li key={stat.label} className="stats-tile">
          <IconBox icon={stat.icon} size={44} tone="glass" hue={hueAt(index)} iconSize={22} />
          <div>
            <CountUp end={stat.value} suffix={stat.suffix} className="stats-tile__value" />
            <span className="stats-tile__label">{stat.label}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
