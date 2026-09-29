import { useEffect } from 'react';

let activeLocks = 0;

/** Locks page scrolling while `active` (reference-counted, safe for nested overlays). */
export function useScrollLock(active) {
  useEffect(() => {
    if (!active) return undefined;
    activeLocks += 1;
    document.documentElement.classList.add('is-locked');
    return () => {
      activeLocks -= 1;
      if (activeLocks === 0) document.documentElement.classList.remove('is-locked');
    };
  }, [active]);
}
