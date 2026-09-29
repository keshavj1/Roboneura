import { site } from '../../config/site';
import { cx } from '../../lib/cx';

/** Small "* Placeholder ..." note; hidden when site.flags.showPlaceholderNotes is false. */
export function PlaceholderNote({ children, className }) {
  if (!site.flags.showPlaceholderNotes) return null;
  return <p className={cx('ph-note', className)}>{children}</p>;
}
