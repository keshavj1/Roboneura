import { Component, lazy, Suspense, useCallback, useState } from 'react';
import { useInView } from '../../hooks/useInView';
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery';
import { img } from '../../lib/assets';
import { cx } from '../../lib/cx';

// three.js is large, so the scene is its own chunk, fetched after the page has rendered.
const DroneScene = lazy(() => import('./DroneScene'));

const WEBGL = (() => {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    gl?.getExtension('WEBGL_lose_context')?.loseContext();
    return Boolean(gl);
  } catch {
    return false;
  }
})();

/** If the 3D scene fails (e.g. the graphics driver refuses WebGL), keep showing the still image. */
class SceneBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

/**
 * Hovering 3D drone for the hero. A still render (drone-3d.webp) shows first and stays for
 * visitors who ask for reduced motion or whose browser has no WebGL; otherwise the live
 * scene fades in over it and pauses while the hero is scrolled out of view.
 */
export function HeroDrone() {
  const reducedMotion = usePrefersReducedMotion();
  const [ref, inView] = useInView({ once: false, threshold: 0 });
  const [live, setLive] = useState(false);
  const onReady = useCallback(() => setLive(true), []);

  return (
    <div ref={ref} className={cx('hero-drone', live && 'is-live')} aria-hidden="true">
      <img className="hero-drone__poster" src={img('drone-3d.webp')} alt="" width="1000" height="900" decoding="async" />
      {WEBGL && !reducedMotion && (
        <SceneBoundary>
          <Suspense fallback={null}>
            <DroneScene active={inView} onReady={onReady} />
          </Suspense>
        </SceneBoundary>
      )}
    </div>
  );
}
