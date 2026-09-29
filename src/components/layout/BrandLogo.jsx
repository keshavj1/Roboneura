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
 * layout: stacked (the complete logo as supplied; header and footer) |
 *         horizontal (circuit mark + ROBONEURA + DYNAMICS PRIVATE LIMITED, for tight spaces)
 * placement: header (58px high, width auto) | footer (--logo-w wide)
 * variant: color (light backgrounds) | light (dark backgrounds)
 */
export function BrandLogo({ layout = 'stacked', placement = 'footer', variant = 'color', className }) {
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

  // Copies pre-sized for each place (1x and 2x), so the fine circuit lines stay crisp:
  // header 58px high (78 × 58), footer 140 × 104.
  const sizes = {
    header: { file: 'brand/logo-header', width: 78, height: 58 },
    footer: { file: 'brand/logo-full-sm', width: 140, height: 104 },
  };
  const sized = variant === 'color' ? sizes[placement] : null;
  return (
    <Link to="/" className={cx('brand', 'brand--stacked', `brand--${placement}`, className)} aria-label={label}>
      <img
        className="brand__full"
        src={img(sized ? `${sized.file}.png` : files.full)}
        srcSet={sized ? `${img(`${sized.file}.png`)} 1x, ${img(`${sized.file}@2x.png`)} 2x` : undefined}
        alt=""
        width={sized ? sized.width : 900}
        height={sized ? sized.height : 670}
        decoding="async"
      />
    </Link>
  );
}
