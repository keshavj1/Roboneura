import { useCallback, useState } from 'react';
import { observe } from '../lib/observe';

/**
 * Returns [ref, inView]. With `once` (default) the element stops being observed
 * the first time it becomes visible.
 */
export function useInView({ once = true, rootMargin, threshold } = {}) {
  const [inView, setInView] = useState(false);

  const ref = useCallback(
    (el) => {
      if (!el) return undefined;
      return observe(
        el,
        (record) => {
          setInView(record.isIntersecting);
          return once && record.isIntersecting;
        },
        { rootMargin, threshold },
      );
    },
    [once, rootMargin, threshold],
  );

  return [ref, inView];
}
