/*
 * One shared IntersectionObserver per option set, instead of one per element.
 * observe() returns an unobserve function; if the callback returns true the element
 * is unobserved automatically (one-shot reveals, count-ups, ...).
 */
const registry = new Map();

export function observe(el, callback, { rootMargin = '0px', threshold = 0.15 } = {}) {
  if (typeof IntersectionObserver === 'undefined') {
    callback({ isIntersecting: true, target: el });
    return () => {};
  }

  const key = `${rootMargin}|${threshold}`;
  let entry = registry.get(key);
  if (!entry) {
    const callbacks = new Map();
    const io = new IntersectionObserver(
      (records) => {
        for (const record of records) {
          const cb = callbacks.get(record.target);
          if (cb && cb(record) === true) {
            io.unobserve(record.target);
            callbacks.delete(record.target);
          }
        }
      },
      { rootMargin, threshold },
    );
    entry = { io, callbacks };
    registry.set(key, entry);
  }

  entry.callbacks.set(el, callback);
  entry.io.observe(el);

  return () => {
    entry.io.unobserve(el);
    entry.callbacks.delete(el);
  };
}
