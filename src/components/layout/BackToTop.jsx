import { usePrefersReducedMotion } from '../../hooks/useMediaQuery';
import { useScrolledPast } from '../../hooks/useScrolledPast';
import { ArrowUpIcon } from '../ui/icons';
import './BackToTop.css';

export function BackToTop() {
  const visible = useScrolledPast(600);
  const reduced = usePrefersReducedMotion();
  if (!visible) return null;
  return (
    <button
      type="button"
      className="back-to-top"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })}
    >
      <ArrowUpIcon weight="bold" aria-hidden="true" />
    </button>
  );
}
