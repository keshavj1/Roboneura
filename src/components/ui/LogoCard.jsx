import { img } from '../../lib/assets';
import { cx } from '../../lib/cx';
import './LogoCard.css';

/**
 * The complete ROBONEURA logo (logo-full-sm@2x.png) on a white card with the logo stripe along
 * the bottom. Used in place of a photo in the "About Us" and "Who We Are" sections.
 * ratio: optional aspect ratio of the card, e.g. "247 / 170".
 */
export function LogoCard({ ratio, className }) {
  return (
    <div className={cx('logo-card', className)} style={ratio ? { aspectRatio: ratio } : undefined}>
      <img
        className="logo-card__logo"
        src={img('brand/logo-full-sm@2x.png')}
        srcSet={`${img('brand/logo-full-sm@2x.png')} 1x, ${img('brand/logo-full.png')} 2x`}
        alt="ROBONEURA Dynamics logo"
        width="280"
        height="208"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}
