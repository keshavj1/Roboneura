const MIN_VISIBLE_MS = 700;
const MAX_VISIBLE_MS = 2200;

/**
 * Fades out the static preloader from index.html once the page has loaded
 * (shown for at least MIN_VISIBLE_MS, never longer than MAX_VISIBLE_MS).
 */
export function hidePreloader({ enabled = true } = {}) {
  const el = document.getElementById('preloader');
  if (!el) return;

  let done = false;
  const finish = () => {
    if (done) return;
    done = true;
    el.classList.add('is-done');
    window.setTimeout(() => el.remove(), 600);
  };

  if (!enabled) {
    el.remove();
    return;
  }

  const afterMinimum = () => {
    const elapsed = performance.now();
    window.setTimeout(finish, Math.max(0, MIN_VISIBLE_MS - elapsed));
  };

  if (document.readyState === 'complete') afterMinimum();
  else window.addEventListener('load', afterMinimum, { once: true });

  window.setTimeout(finish, Math.max(0, MAX_VISIBLE_MS - performance.now()));
}
