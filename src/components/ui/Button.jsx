import { cx } from '../../lib/cx';
import { ArrowRightIcon } from './icons';
import { SmartLink } from './SmartLink';
import './Button.css';

const preventPlaceholderLink = (event) => event.preventDefault();

/**
 * Pill button. Renders a router link (`to`), a plain link (`href`) or a <button>.
 * variant: primary | dark | outline | outline-light | link
 * size: sm | md | lg. Pass icon={null} for no icon; iconPosition="start" puts it first.
 */
export function Button({
  to,
  href,
  variant = 'primary',
  size = 'md',
  icon: Icon = ArrowRightIcon,
  iconPosition = 'end',
  glow = false,
  block = false,
  className,
  children,
  onClick,
  ...rest
}) {
  const classes = cx(
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    glow && 'btn--glow',
    block && 'btn--block',
    iconPosition === 'start' && 'btn--icon-start',
    className,
  );
  const icon = Icon ? (
    <Icon className={cx('btn__icon', Icon === ArrowRightIcon && 'btn__icon--nudge')} aria-hidden="true" />
  ) : null;
  const content = (
    <>
      {iconPosition === 'start' && icon}
      <span className="btn__label">{children}</span>
      {iconPosition !== 'start' && icon}
    </>
  );

  if (to !== undefined) {
    return (
      <SmartLink to={to} className={classes} onClick={onClick} {...rest}>
        {content}
      </SmartLink>
    );
  }
  if (href !== undefined) {
    // "#" marks content that is not published yet: keep the design, skip the jump to top.
    return (
      <a href={href} className={classes} onClick={href === '#' ? preventPlaceholderLink : onClick} {...rest}>
        {content}
      </a>
    );
  }
  return (
    <button type="button" className={classes} onClick={onClick} {...rest}>
      {content}
    </button>
  );
}
