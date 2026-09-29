import { useState } from 'react';
import { cx } from '../../lib/cx';
import { ImageIcon } from './icons';
import './Img.css';

/**
 * Image in a fixed-ratio box. If the file is missing (or src is empty) a branded
 * placeholder is shown instead, so a photo that has not been supplied yet never
 * breaks the layout.
 */
export function Img({
  src,
  srcSet,
  alt = '',
  ratio,
  fill = false,
  fit = 'cover',
  position,
  priority = false,
  sizes,
  className,
  placeholder,
}) {
  const [failedSrc, setFailedSrc] = useState(null);
  const missing = !src || failedSrc === src;

  return (
    <div className={cx('media', fill && 'media--fill', className)} style={ratio ? { aspectRatio: ratio } : undefined}>
      {missing ? (
        <ImgPlaceholder alt={alt} {...placeholder} />
      ) : (
        <img
          src={src}
          srcSet={srcSet}
          alt={alt}
          sizes={sizes}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : undefined}
          style={{ objectFit: fit, objectPosition: position }}
          onError={() => setFailedSrc(src)}
        />
      )}
    </div>
  );
}

function ImgPlaceholder({ alt, label, icon: Icon = ImageIcon, tone = 'dark' }) {
  return (
    <div
      className={cx('media__placeholder', `media__placeholder--${tone}`)}
      role={alt ? 'img' : undefined}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
    >
      <Icon weight="duotone" aria-hidden="true" />
      {label && <span>{label}</span>}
    </div>
  );
}
