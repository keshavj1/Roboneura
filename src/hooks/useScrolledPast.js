import { useSyncExternalStore } from 'react';

function subscribe(onChange) {
  window.addEventListener('scroll', onChange, { passive: true });
  window.addEventListener('resize', onChange);
  return () => {
    window.removeEventListener('scroll', onChange);
    window.removeEventListener('resize', onChange);
  };
}

/** True once the page is scrolled beyond `offset` px. Re-renders only when that flips. */
export function useScrolledPast(offset) {
  return useSyncExternalStore(
    subscribe,
    () => window.scrollY > offset,
    () => false,
  );
}
