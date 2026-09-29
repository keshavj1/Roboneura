import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { img } from '../../../lib/assets';
import { useDisposable } from './kit';

/*
 * The ROBONEURA quadcopter, built from primitives (no model file). Forward is +z; it is about
 * 3 units wide with propellers, and its landing skids rest at y = -0.48.
 */

const ARM_TIPS = [
  { x: 0.86, z: 0.78, spin: 1, light: 'green' },
  { x: -0.86, z: 0.78, spin: -1, light: 'red' },
  { x: 0.86, z: -0.78, spin: -1, light: 'white' },
  { x: -0.86, z: -0.78, spin: 1, light: 'white' },
];
const ARM_LENGTH = Math.hypot(0.86, 0.78);
const FULL_SPEED = { current: 1 };

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
  accent: new THREE.MeshStandardMaterial({ color: '#e9c311', emissive: '#e9c311', emissiveIntensity: 0.4, roughness: 0.4 }),
  lens: new THREE.MeshPhysicalMaterial({
    color: '#0b1330',
    roughness: 0.05,
    metalness: 0.3,
    clearcoat: 1,
    emissive: '#2347bf',
    emissiveIntensity: 0.5,
  }),
  logo: new THREE.MeshStandardMaterial({ transparent: true, roughness: 0.4 }),
  red: new THREE.MeshStandardMaterial({ color: '#ff3b3b', emissive: '#ff2020', emissiveIntensity: 2.2 }),
  green: new THREE.MeshStandardMaterial({ color: '#3bff7a', emissive: '#20ff60', emissiveIntensity: 2.2 }),
  white: new THREE.MeshStandardMaterial({ color: '#ffffff', emissive: '#ffffff', emissiveIntensity: 0.3 }),
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
  decal: new THREE.PlaneGeometry(0.42, 0.2265), // logo rings, 445 × 240
});

function createTextures() {
  // The rings of the logo: the full circuit mark's thin lines would disappear at this size.
  const logo = new THREE.TextureLoader().load(img('brand/logo-icon.png'));
  logo.colorSpace = THREE.SRGBColorSpace;
  logo.anisotropy = 4;
  return { logo };
}

/** One rotor: two blades plus a faint disc that shows the blur while spinning. */
function Propeller({ x, z, spin, speed, geometries, materials }) {
  const rotor = useRef(null);
  const blur = useRef(null);
  useFrame((_, delta) => {
    const rate = speed.current;
    if (rotor.current) rotor.current.rotation.y += delta * 32 * spin * rate;
    if (blur.current) blur.current.material.opacity = 0.08 * rate;
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
      <mesh ref={blur} geometry={geometries.blur} material={materials.blur} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]} />
    </group>
  );
}

/**
 * The drone. Extra props (position, rotation, scale, ref ...) go to its root group.
 * speed: optional ref ({ current: 0..1 }) with the propeller speed; full speed by default.
 */
export function DroneModel({ speed = FULL_SPEED, ...props }) {
  const lights = useRef(null);
  const materials = useDisposable(createMaterials);
  const geometries = useDisposable(createGeometries);
  const textures = useDisposable(createTextures);

  // Rear navigation lights blink.
  useFrame((state) => {
    const blink = state.clock.elapsedTime % 1.4 < 0.12 ? 4 : 0.3;
    lights.current?.children.forEach((led, index) => {
      if (ARM_TIPS[index].light === 'white') led.material.emissiveIntensity = blink;
    });
  });

  return (
    <group {...props}>
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

      {/* Arms, motors and propellers */}
      {ARM_TIPS.map(({ x, z, spin }) => (
        <group key={`${x}-${z}`}>
          <mesh
            geometry={geometries.arm}
            material={materials.shell}
            position={[x / 2, 0.02, z / 2]}
            rotation={[0, Math.atan2(x, z), 0]}
          />
          <mesh geometry={geometries.collar} material={materials.shell} position={[x, 0.02, z]} />
          <mesh geometry={geometries.motor} material={materials.motor} position={[x, 0.11, z]} />
          <mesh geometry={geometries.cap} material={materials.cap} position={[x, 0.185, z]} />
          <Propeller x={x} z={z} spin={spin} speed={speed} geometries={geometries} materials={materials} />
        </group>
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
      <mesh geometry={geometries.lensBarrel} material={materials.lens} position={[0, -0.27, 0.5]} rotation={[Math.PI / 2, 0, 0]} />

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
  );
}
