import { Link } from 'react-router';
import { img } from '../../lib/assets';
import { cx } from '../../lib/cx';
import './BrandLogo.css';

const FILES = {
  // Full-colour logo for light backgrounds (header).
  color: { mark: 'brand/logo-mark.png', wordmark: 'brand/logo-wordmark.png' },
  // Version for dark backgrounds (footer): the blue parts are white.
  light: { mark: 'brand/logo-mark-light.png', wordmark: 'brand/logo-wordmark-light.png' },
};

/**
 * ROBONEURA logo: mark + wordmark + "DYNAMICS PRIVATE LIMITED". Files live in public/images/brand/.
 * size: md (header) | lg (footer). variant: color (light backgrounds) | light (dark backgrounds)
 */
export function BrandLogo({ size = 'md', variant = 'color', className }) {
  const files = FILES[variant];
  return (
    <Link
      to="/"
      className={cx('brand', `brand--${size}`, `brand--${variant}`, className)}
      aria-label="ROBONEURA Dynamics Private Limited, home"
    >
      <img className="brand__mark" src={img(files.mark)} alt="" width="320" height="240" decoding="async" />
      <span className="brand__text" aria-hidden="true">
        <img className="brand__wordmark" src={img(files.wordmark)} alt="" width="938" height="80" decoding="async" />
        <span className="brand__sub">DYNAMICS PRIVATE LIMITED</span>
      </span>
    </Link>
  );
}
