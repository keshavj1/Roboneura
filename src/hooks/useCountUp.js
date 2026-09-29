import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from './useMediaQuery';

/** Animates 0 -> end (ease-out cubic) once `active` turns true. */
export function useCountUp(end, { active, duration = 1600 }) {
  const reduced = usePrefersReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active || reduced) return undefined;
    let frame = 0;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      setValue(Math.round(end * (1 - (1 - progress) ** 3)));
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [active, reduced, end, duration]);

  return reduced ? end : value;
}
