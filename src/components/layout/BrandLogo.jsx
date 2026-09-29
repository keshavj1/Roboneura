import { Link } from 'react-router';
import { img } from '../../lib/assets';
import { cx } from '../../lib/cx';
import './BrandLogo.css';

const FILES = {
  // Full-colour logo for light backgrounds.
  color: { mark: 'brand/logo-mark.png', wordmark: 'brand/logo-wordmark.png', full: 'brand/logo-full.png' },
  // Version for dark backgrounds: the dark-blue parts and the lettering are white.
  light: { mark: 'brand/logo-mark-light.png', wordmark: 'brand/logo-wordmark-light.png', full: 'brand/logo-full-light.png' },
};

/**
 * ROBONEURA logo, linking home. Files live in public/images/brand/.
 * layout: stacked (the complete logo as supplied; header and footer, same size in both: --logo-w) |
 *         horizontal (circuit mark + ROBONEURA + DYNAMICS PRIVATE LIMITED, for tight spaces)
 * variant: color (light backgrounds) | light (dark backgrounds)
 */
export function BrandLogo({ layout = 'stacked', variant = 'color', className }) {
  const files = FILES[variant];
  const label = 'ROBONEURA Dynamics Private Limited, home';

  if (layout === 'horizontal') {
    return (
      <Link to="/" className={cx('brand', 'brand--horizontal', `brand--${variant}`, className)} aria-label={label}>
        <img className="brand__mark" src={img(files.mark)} alt="" width="395" height="240" decoding="async" />
        <span className="brand__text" aria-hidden="true">
          <img className="brand__wordmark" src={img(files.wordmark)} alt="" width="896" height="80" decoding="async" />
          <span className="brand__sub">DYNAMICS PRIVATE LIMITED</span>
        </span>
      </Link>
    );
  }

  // Copies pre-sized to 140 / 280 px wide, so the fine circuit lines stay crisp.
  const sized = variant === 'color';
  const src = sized ? 'brand/logo-full-sm.png' : files.full;
  return (
    <Link to="/" className={cx('brand', 'brand--stacked', className)} aria-label={label}>
      <img
        className="brand__full"
        src={img(src)}
        srcSet={sized ? `${img(src)} 1x, ${img('brand/logo-full-sm@2x.png')} 2x` : undefined}
        alt=""
        width={sized ? 140 : 900}
        height={sized ? 104 : 670}
        decoding="async"
      />
    </Link>
  );
}
