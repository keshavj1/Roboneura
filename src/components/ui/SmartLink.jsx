import { Link, useLocation } from 'react-router';
import { scrollToElement } from '../../lib/motion';

/**
 * Router <Link> that smooth-scrolls when the target is a #section on the current page.
 * Cross-page links such as "/about#careers" are handled by <ScrollRestoration/>.
 */
export function SmartLink({ to, onClick, ...rest }) {
  const { pathname } = useLocation();

  const handleClick = (event) => {
    onClick?.(event);
    if (event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (typeof to !== 'string' || !to.includes('#')) return;

    const [path, hash] = to.split('#');
    if (path && path !== pathname) return;
    const target = document.getElementById(decodeURIComponent(hash));
    if (!target) return;

    event.preventDefault();
    scrollToElement(target);
    window.history.replaceState(window.history.state, '', `#${hash}`);
  };

  return <Link to={to} onClick={handleClick} {...rest} />;
}
