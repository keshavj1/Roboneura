import { Component, Suspense, useCallback, useState } from 'react';
import { useInView } from '../../hooks/useInView';
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery';
import { cx } from '../../lib/cx';
import { supportsWebGL } from '../../lib/webgl';

/** If a 3D scene fails (e.g. the graphics driver refuses WebGL), keep showing the still image. */
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
 * Shows a still render of a three.js scene, then fades in the live scene once its code has loaded.
 * The still image stays for visitors who ask for reduced motion or whose browser has no WebGL.
 * The live scene pauses while it is scrolled out of view.
 *
 * scene: a React.lazy() component that takes { active, onReady }.
 */
export function LazyScene({ scene: Scene, poster, width, height, className }) {
  const reducedMotion = usePrefersReducedMotion();
  const [ref, inView] = useInView({ once: false, threshold: 0 });
  const [live, setLive] = useState(false);
  const onReady = useCallback(() => setLive(true), []);

  return (
    <div ref={ref} className={cx('scene3d', className, live && 'is-live')} aria-hidden="true">
      <img className="scene3d__poster" src={poster} alt="" width={width} height={height} decoding="async" />
      {supportsWebGL && !reducedMotion && (
        <SceneBoundary>
          <Suspense fallback={null}>
            <Scene active={inView} onReady={onReady} />
          </Suspense>
        </SceneBoundary>
      )}
    </div>
  );
}
