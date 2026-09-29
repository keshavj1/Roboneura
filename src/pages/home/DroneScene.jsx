import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { img } from '../../lib/assets';

/*
 * Animated 3D quadcopter for the home hero (React Three Fiber). The model is built from
 * primitives, so no model file is downloaded. Loaded on demand by HeroDrone.jsx.
 * Forward is +z; the drone is about 3 units wide including the propellers.
 */

const BASE_YAW = -0.62;
const BASE_PITCH = 0.08;
const ARM_TIPS = [
  { x: 0.86, z: 0.78, spin: 1, light: 'green' },
  { x: -0.86, z: 0.78, spin: -1, light: 'red' },
  { x: 0.86, z: -0.78, spin: -1, light: 'white' },
  { x: -0.86, z: -0.78, spin: 1, light: 'white' },
];
const ARM_LENGTH = Math.hypot(0.86, 0.78);

/** Creates three.js resources once and frees them when the scene unmounts. */
function useDisposable(create) {
  const resources = useMemo(() => create(), [create]);
  useEffect(() => () => Object.values(resources).forEach((item) => item.dispose?.()), [resources]);
  return resources;
}

const createMaterials = () => ({
  shell: new THREE.MeshPhysicalMaterial({
    color: '#f3f5fa',
    roughness: 0.3,
    metalness: 0.05,
    clearcoat: 1,
    clearcoatRoughness: 0.2,
  }),
  trim: new THREE.MeshStandardMaterial({ color: '#1b2030', roughness: 0.45, metalness: 0.55 }),
  motor: new THREE.MeshStandardMaterial({ color: '#262b38', roughness: 0.3, metalness: 0.85 }),
  cap: new THREE.MeshStandardMaterial({ color: '#c8cdd8', roughness: 0.22, metalness: 1 }),
  blade: new THREE.MeshStandardMaterial({ color: '#12151d', roughness: 0.45, metalness: 0.2 }),
  blur: new THREE.MeshBasicMaterial({
    color: '#dfe6ff',
    transparent: true,
    opacity: 0.07,
    depthWrite: false,
    side: THREE.DoubleSide,
  }),
  accent: new THREE.MeshStandardMaterial({ color: '#fec603', emissive: '#fec603', emissiveIntensity: 0.4, roughness: 0.4 }),
  lens: new THREE.MeshPhysicalMaterial({
    color: '#0b1330',
    roughness: 0.05,
    metalness: 0.3,
    clearcoat: 1,
    emissive: '#233e98',
    emissiveIntensity: 0.5,
  }),
  logo: new THREE.MeshStandardMaterial({ transparent: true, roughness: 0.4 }),
  red: new THREE.MeshStandardMaterial({ color: '#ff3b3b', emissive: '#ff2020', emissiveIntensity: 2.2 }),
  green: new THREE.MeshStandardMaterial({ color: '#3bff7a', emissive: '#20ff60', emissiveIntensity: 2.2 }),
  white: new THREE.MeshStandardMaterial({ color: '#ffffff', emissive: '#ffffff', emissiveIntensity: 0.3 }),
  pad: new THREE.MeshBasicMaterial({ transparent: true, depthWrite: false }),
  ringA: new THREE.MeshBasicMaterial({ color: '#ffd23f', transparent: true, opacity: 0.6, depthWrite: false }),
  ringB: new THREE.MeshBasicMaterial({ color: '#9db4ec', transparent: true, opacity: 0.5, depthWrite: false }),
});

const createGeometries = () => ({
  body: new RoundedBoxGeometry(0.8, 0.28, 1.15, 5, 0.14),
  sphere: new THREE.SphereGeometry(1, 32, 16),
  arm: new THREE.BoxGeometry(0.11, 0.08, ARM_LENGTH),
  collar: new THREE.CylinderGeometry(0.14, 0.14, 0.07, 32),
  motor: new THREE.CylinderGeometry(0.1, 0.11, 0.12, 32),
  cap: new THREE.CylinderGeometry(0.06, 0.06, 0.04, 24),
  hub: new THREE.CylinderGeometry(0.04, 0.04, 0.05, 16),
  blur: new THREE.CircleGeometry(0.5, 48),
  strut: new THREE.CylinderGeometry(0.024, 0.024, 0.34, 12),
  skid: new THREE.CylinderGeometry(0.032, 0.032, 0.95, 16),
  lensBarrel: new THREE.CylinderGeometry(0.045, 0.045, 0.06, 24),
  led: new THREE.SphereGeometry(0.03, 12, 12),
  stripe: new THREE.BoxGeometry(0.02, 0.04, 0.78),
  decal: new THREE.PlaneGeometry(0.36, 0.27),
  ring: new THREE.RingGeometry(0.975, 1, 128),
  pad: new THREE.CircleGeometry(1.15, 64),
});

/** Soft radial glow for the hover pad (alpha gradient, so it also works on a transparent canvas). */
function createPadTexture() {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, 'rgba(143, 166, 238, 0.55)');
  gradient.addColorStop(0.45, 'rgba(90, 120, 220, 0.22)');
  gradient.addColorStop(1, 'rgba(35, 62, 152, 0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function createLogoTexture() {
  const texture = new THREE.TextureLoader().load(img('brand/logo-mark.png'));
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

const createTextures = () => ({ pad: createPadTexture(), logo: createLogoTexture() });

/**
 * Renderer set-up: neutral studio reflections generated on the GPU (no environment map to
 * download). Shader log checks are off because Windows' Direct3D shader compiler reports harmless
 * precision warnings for three.js' built-in shaders, which would fill the console.
 */
function setUpRenderer({ gl, scene }) {
  gl.debug.checkShaderErrors = false;
  const pmrem = new THREE.PMREMGenerator(gl);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.55;
  pmrem.dispose();
}

function Propeller({ x, z, spin, geometries, materials }) {
  const rotor = useRef(null);
  useFrame((_, delta) => {
    if (rotor.current) rotor.current.rotation.y += delta * 32 * spin;
  });
  return (
    <group position={[x, 0.2, z]}>
      <mesh geometry={geometries.hub} material={materials.motor} />
      <group ref={rotor}>
        <mesh
          geometry={geometries.sphere}
          material={materials.blade}
          position={[0.24, 0.02, 0]}
          rotation={[0.22 * spin, 0, 0]}
          scale={[0.25, 0.008, 0.045]}
        />
        <mesh
          geometry={geometries.sphere}
          material={materials.blade}
          position={[-0.24, 0.02, 0]}
          rotation={[-0.22 * spin, 0, 0]}
          scale={[0.25, 0.008, 0.045]}
        />
      </group>
      {/* Faint disc: the blur of the spinning blades */}
      <mesh geometry={geometries.blur} material={materials.blur} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]} />
    </group>
  );
}

function Arm({ x, z, spin, geometries, materials }) {
  return (
    <group>
      <mesh
        geometry={geometries.arm}
        material={materials.shell}
        position={[x / 2, 0.02, z / 2]}
        rotation={[0, Math.atan2(x, z), 0]}
      />
      <mesh geometry={geometries.collar} material={materials.shell} position={[x, 0.02, z]} />
      <mesh geometry={geometries.motor} material={materials.motor} position={[x, 0.11, z]} />
      <mesh geometry={geometries.cap} material={materials.cap} position={[x, 0.185, z]} />
      <Propeller x={x} z={z} spin={spin} geometries={geometries} materials={materials} />
    </group>
  );
}

/** Glow and expanding rings under the drone. */
function HoverPad({ geometries, materials, textures }) {
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
      <mesh ref={pad} geometry={geometries.pad} material={materials.pad} material-map={textures.pad} />
      <group ref={rings}>
        <mesh geometry={geometries.ring} material={materials.ringA} />
        <mesh geometry={geometries.ring} material={materials.ringB} />
      </group>
    </group>
  );
}

function Drone({ pointer, onReady }) {
  const root = useRef(null);
  const lights = useRef(null);
  const materials = useDisposable(createMaterials);
  const geometries = useDisposable(createGeometries);
  const textures = useDisposable(createTextures);

  useEffect(() => {
    onReady?.();
  }, [onReady]);

  useFrame((state, delta) => {
    const drone = root.current;
    if (!drone) return;
    const t = state.clock.elapsedTime;
    const { x, y } = pointer.current;
    const ease = 1 - Math.exp(-2.5 * delta);
    drone.position.y = 0.22 + Math.sin(t * 1.3) * 0.12;
    drone.rotation.y += (BASE_YAW + x * 0.35 + Math.sin(t * 0.35) * 0.18 - drone.rotation.y) * ease;
    drone.rotation.x += (BASE_PITCH - y * 0.12 + Math.cos(t * 0.9) * 0.03 - drone.rotation.x) * ease;
    drone.rotation.z += (Math.sin(t * 0.8) * 0.05 - x * 0.08 - drone.rotation.z) * ease;
    // Rear navigation lights blink.
    const blink = t % 1.4 < 0.12 ? 4 : 0.3;
    lights.current?.children.forEach((led, index) => {
      if (ARM_TIPS[index].light === 'white') led.material.emissiveIntensity = blink;
    });
  });

  return (
    <>
      <group ref={root} rotation={[BASE_PITCH, BASE_YAW, 0]} position={[0, 0.22, 0]}>
        {/* Fuselage, canopy with the logo, yellow side stripes, front sensors */}
        <mesh geometry={geometries.body} material={materials.shell} />
        <mesh geometry={geometries.sphere} material={materials.shell} position={[0, 0.11, -0.03]} scale={[0.34, 0.12, 0.46]} />
        <mesh
          geometry={geometries.decal}
          material={materials.logo}
          material-map={textures.logo}
          position={[0, 0.232, -0.03]}
          rotation={[-Math.PI / 2, 0, 0]}
        />
        <mesh geometry={geometries.stripe} material={materials.accent} position={[0.405, 0, 0]} />
        <mesh geometry={geometries.stripe} material={materials.accent} position={[-0.405, 0, 0]} />
        <mesh geometry={geometries.sphere} material={materials.lens} position={[0.13, 0.01, 0.57]} scale={[0.065, 0.04, 0.02]} />
        <mesh geometry={geometries.sphere} material={materials.lens} position={[-0.13, 0.01, 0.57]} scale={[0.065, 0.04, 0.02]} />

        {ARM_TIPS.map(({ x, z, spin }) => (
          <Arm key={`${x}-${z}`} x={x} z={z} spin={spin} geometries={geometries} materials={materials} />
        ))}

        {/* Navigation lights under the motors */}
        <group ref={lights}>
          {ARM_TIPS.map(({ x, z, light }) => (
            <mesh key={`${x}-${z}`} geometry={geometries.led} material={materials[light]} position={[x, -0.02, z]} />
          ))}
        </group>

        {/* Gimbal camera */}
        <mesh geometry={geometries.sphere} material={materials.trim} position={[0, -0.18, 0.38]} scale={[0.11, 0.06, 0.09]} />
        <mesh geometry={geometries.sphere} material={materials.trim} position={[0, -0.27, 0.42]} scale={0.09} />
        <mesh
          geometry={geometries.lensBarrel}
          material={materials.lens}
          position={[0, -0.27, 0.5]}
          rotation={[Math.PI / 2, 0, 0]}
        />

        {/* Landing gear */}
        {[0.32, -0.32].map((side) => (
          <group key={side}>
            <mesh
              geometry={geometries.strut}
              material={materials.shell}
              position={[side * 1.1, -0.27, 0.28]}
              rotation={[0, 0, side > 0 ? -0.2 : 0.2]}
            />
            <mesh
              geometry={geometries.strut}
              material={materials.shell}
              position={[side * 1.1, -0.27, -0.28]}
              rotation={[0, 0, side > 0 ? -0.2 : 0.2]}
            />
            <mesh geometry={geometries.skid} material={materials.shell} position={[side * 1.22, -0.44, 0]} rotation={[Math.PI / 2, 0, 0]} />
          </group>
        ))}
      </group>
      <HoverPad geometries={geometries} materials={materials} textures={textures} />
    </>
  );
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
      className="hero-drone__canvas"
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
      <Drone pointer={pointer} onReady={onReady} />
    </Canvas>
  );
}
