import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';

/**
 * Moves keyboard/screen-reader focus to the main content after a page change,
 * so users are not left on the link they clicked in the header.
 */
export function useRouteFocus(targetRef) {
  const { pathname } = useLocation();
  const previous = useRef(pathname);

  useEffect(() => {
    if (previous.current === pathname) return;
    previous.current = pathname;
    targetRef.current?.focus({ preventScroll: true });
  }, [pathname, targetRef]);
}
