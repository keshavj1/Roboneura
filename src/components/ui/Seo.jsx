import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { site } from '../../config/site';

const BRAND = 'ROBONEURA Dynamics';
const DEFAULT_TITLE = `${BRAND} | Robotics, Drones & Automation`;

function setAttr(selector, attr, value) {
  document.head.querySelector(selector)?.setAttribute(attr, value);
}

/** Updates the document title, description and canonical/social URLs for the current page. */
export function Seo({ title, description, noindex = false }) {
  const { pathname } = useLocation();

  useEffect(() => {
    const fullTitle = title ? `${title} | ${BRAND}` : DEFAULT_TITLE;
    const url = `${site.url}${pathname}`;
    document.title = fullTitle;
    setAttr('meta[property="og:title"]', 'content', fullTitle);
    setAttr('link[rel="canonical"]', 'href', url);
    setAttr('meta[property="og:url"]', 'content', url);
    if (description) {
      setAttr('meta[name="description"]', 'content', description);
      setAttr('meta[property="og:description"]', 'content', description);
    }

    let robots = document.head.querySelector('meta[name="robots"]');
    if (noindex) {
      if (!robots) {
        robots = document.createElement('meta');
        robots.name = 'robots';
        document.head.append(robots);
      }
      robots.content = 'noindex';
    } else {
      robots?.remove();
    }
  }, [title, description, noindex, pathname]);

  return null;
}
