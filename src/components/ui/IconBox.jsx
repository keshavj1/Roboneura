import { cx } from '../../lib/cx';
import './IconBox.css';

/**
 * Icon inside a tinted square or circle.
 * tone: soft | solid | glass | glass-ring | white | muted | award | mint
 * hue: one of the logo colours (blue | yellow | magenta | cyan | purple); defaults to the accent.
 */
export function IconBox({
  icon: Icon,
  size = 52,
  iconSize,
  shape = 'rounded',
  tone = 'soft',
  hue,
  weight = 'duotone',
  className,
}) {
  const style = { '--ib-size': `${size}px`, '--ib-icon': `${iconSize ?? Math.round(size * 0.54)}px` };
  return (
    <span
      className={cx('iconbox', `iconbox--${tone}`, shape === 'circle' && 'iconbox--circle', hue && `hue-${hue}`, className)}
      style={style}
      aria-hidden="true"
    >
      <Icon weight={weight} />
    </span>
  );
}
