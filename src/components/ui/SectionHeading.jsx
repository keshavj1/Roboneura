import { cx } from '../../lib/cx';
import { TitleText } from './TitleText';
import './SectionHeading.css';

/**
 * Eyebrow + title + logo-colour bar + optional lead, with an optional actions slot on the right.
 * Wrap the accent word of the title in asterisks: "Case Studies from the *Field*".
 * bar={false} hides the bar.
 */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  as: Heading = 'h2',
  id,
  align = 'start',
  size = 'md',
  bar = true,
  actions,
  className,
  children,
}) {
  return (
    <div className={cx('sh', align === 'center' && 'sh--center', actions && 'sh--split', size === 'sm' && 'sh--sm', className)}>
      <div className="sh__text">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <Heading id={id} className="sh__title">
          <TitleText>{title}</TitleText>
        </Heading>
        {bar && <span className="sh__bar" aria-hidden="true" />}
        {lead && <p className="sh__lead">{lead}</p>}
        {children}
      </div>
      {actions && <div className="sh__actions">{actions}</div>}
    </div>
  );
}
