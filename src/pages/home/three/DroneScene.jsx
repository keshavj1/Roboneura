import { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { DroneModel } from './DroneModel';
import { glowTexture, setUpRenderer, useDisposable } from './kit';

/*
 * Home hero, "Fig. 1": the ROBONEURA quadcopter hovering over a glowing pad, leaning gently
 * towards the mouse. Loaded on demand through LazyScene.
 */

const BASE_YAW = -0.62;
const BASE_PITCH = 0.08;

const createPad = () => ({
  glow: glowTexture([
    [0, 'rgba(143, 166, 238, 0.55)'],
    [0.45, 'rgba(90, 120, 220, 0.22)'],
    [1, 'rgba(35, 62, 152, 0)'],
  ]),
  padGeometry: new THREE.CircleGeometry(1.15, 64),
  ringGeometry: new THREE.RingGeometry(0.975, 1, 128),
  padMaterial: new THREE.MeshBasicMaterial({ transparent: true, depthWrite: false }),
  ringA: new THREE.MeshBasicMaterial({ color: '#ffd23f', transparent: true, opacity: 0.6, depthWrite: false }),
  ringB: new THREE.MeshBasicMaterial({ color: '#9db4ec', transparent: true, opacity: 0.5, depthWrite: false }),
});

/** Glow and expanding rings under the drone. */
function HoverPad() {
  const kit = useDisposable(createPad);
  const rings = useRef(null);
  const pad = useRef(null);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    rings.current?.children.forEach((ring, index) => {
      const phase = (t * 0.4 + index * 0.5) % 1;
      ring.scale.setScalar(0.55 + phase * 0.75);
      ring.material.opacity = 0.65 * Math.sin(Math.PI * phase);
    });
    if (pad.current) pad.current.material.opacity = 0.85 + Math.sin(t * 1.3) * 0.15;
  });
  return (
    <group position={[0, -0.95, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <mesh ref={pad} geometry={kit.padGeometry} material={kit.padMaterial} material-map={kit.glow} />
      <group ref={rings}>
        <mesh geometry={kit.ringGeometry} material={kit.ringA} />
        <mesh geometry={kit.ringGeometry} material={kit.ringB} />
      </group>
    </group>
  );
}

function HoveringDrone({ pointer, onReady }) {
  const root = useRef(null);

  useEffect(() => {
    onReady?.();
  }, [onReady]);

  useFrame((state, delta) => {
    const drone = root.current;
    if (!drone) return;
    const t = state.clock.elapsedTime;
    const { x, y } = pointer.current;
    const follow = 1 - Math.exp(-2.5 * delta);
    drone.position.y = 0.22 + Math.sin(t * 1.3) * 0.12;
    drone.rotation.y += (BASE_YAW + x * 0.35 + Math.sin(t * 0.35) * 0.18 - drone.rotation.y) * follow;
    drone.rotation.x += (BASE_PITCH - y * 0.12 + Math.cos(t * 0.9) * 0.03 - drone.rotation.x) * follow;
    drone.rotation.z += (Math.sin(t * 0.8) * 0.05 - x * 0.08 - drone.rotation.z) * follow;
  });

  return <DroneModel ref={root} rotation={[BASE_PITCH, BASE_YAW, 0]} position={[0, 0.22, 0]} />;
}

/** Canvas with lights and the drone. `active` pauses rendering while the hero is off screen. */
export default function DroneScene({ active, onReady }) {
  const pointer = useRef({ x: 0, y: 0 });

  // The drone leans gently towards the mouse, wherever it is on the page.
  useEffect(() => {
    const onMove = (event) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = 1 - (event.clientY / window.innerHeight) * 2;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  return (
    <Canvas
      className="scene3d__canvas"
      style={{ position: 'absolute', inset: 0 }}
      frameloop={active ? 'always' : 'never'}
      dpr={[1, 2]}
      camera={{ position: [0, 1.5, 5.3], fov: 32 }}
      gl={{ antialias: true, alpha: true }}
      onCreated={setUpRenderer}
    >
      <ambientLight intensity={0.35} />
      <hemisphereLight args={['#dbe6ff', '#0b1330', 0.9]} />
      <directionalLight position={[4, 6, 5]} intensity={2.4} />
      <directionalLight position={[-5, 3, -4]} intensity={1.8} color="#8fa6ee" />
      <pointLight position={[0, -0.8, 0.8]} intensity={1.5} distance={3.5} color="#fec603" />
      <HoveringDrone pointer={pointer} onReady={onReady} />
      <HoverPad />
    </Canvas>
  );
}
