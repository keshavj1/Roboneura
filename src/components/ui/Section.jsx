import { cx } from '../../lib/cx';
import './Section.css';

/**
 * Page band with a background tone and vertical rhythm.
 * tone: light (pale blue-grey) | white | navy (dark slate) | band (dark gradient)
 * spacing: md | lg | sm | none. Add className="section--flush-top" to drop the top padding.
 */
export function Section({
  as: Tag = 'section',
  tone = 'light',
  spacing = 'md',
  bleed = false,
  className,
  containerClassName,
  children,
  ...rest
}) {
  return (
    <Tag className={cx('section', `tone-${tone}`, `section--${spacing}`, className)} {...rest}>
      {bleed ? children : <div className={cx('container', containerClassName)}>{children}</div>}
    </Tag>
  );
}
