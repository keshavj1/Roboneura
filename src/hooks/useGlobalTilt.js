import { useEffect } from 'react';

const MAX_DEG = 7;

/**
 * One delegated pointer listener tilts whichever [data-tilt] card is under a mouse
 * pointer (styles in animations.css). Touch devices and reduced motion are left alone.
 */
export function useGlobalTilt() {
  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let current = null;
    let lastEvent = null;
    let frame = 0;

    const reset = (el) => {
      el.style.removeProperty('--tilt-rx');
      el.style.removeProperty('--tilt-ry');
      el.style.removeProperty('--tilt-lift');
      el.removeAttribute('data-tilting');
    };

    const apply = () => {
      frame = 0;
      const event = lastEvent;
      const target = event?.target instanceof Element ? event.target.closest('[data-tilt]') : null;
      if (current && current !== target) {
        reset(current);
        current = null;
      }
      if (!target) return;
      const rect = target.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      target.style.setProperty('--tilt-rx', `${(-y * MAX_DEG).toFixed(2)}deg`);
      target.style.setProperty('--tilt-ry', `${(x * MAX_DEG).toFixed(2)}deg`);
      target.style.setProperty('--tilt-lift', '-4px');
      target.setAttribute('data-tilting', '');
      current = target;
    };

    const onMove = (event) => {
      if (event.pointerType !== 'mouse' || !finePointer.matches || reducedMotion.matches) return;
      lastEvent = event;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    const onLeave = () => {
      if (current) reset(current);
      current = null;
    };

    document.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      document.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(frame);
      if (current) reset(current);
    };
  }, []);
}
