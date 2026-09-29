import { useCallback } from 'react';
import { observe } from '../lib/observe';
import { prefersReducedMotion } from '../lib/motion';

/**
 * Callback ref for the fade-up-on-scroll effect (styles in animations.css).
 * Elements already on screen when they mount are shown immediately, so nothing
 * above the fold ever flashes; the rest are revealed as they scroll into view.
 */
export function useReveal() {
  return useCallback((el) => {
    if (!el) return undefined;

    if (prefersReducedMotion() || el.getBoundingClientRect().top < window.innerHeight * 0.9) {
      el.dataset.revealed = 'instant';
      return undefined;
    }

    return observe(
      el,
      (record) => {
        if (!record.isIntersecting) return false;
        el.dataset.revealed = 'true';
        return true;
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0 },
    );
  }, []);
}
