import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { useDisposable } from './kit';

/*
 * Robots for the "Why Choose" fleet scene, built from primitives. Forward is +z and the ground
 * is y = 0. QuadrupedRobot: a four-legged inspection robot with a drone landing pad on its back.
 * Rover: a small wheeled delivery robot with a spinning lidar.
 */

// Body centre above the ground; the top of the landing pad is 0.14 higher (y = 0.76).
const BODY_Y = 0.62;
const HIP_BASE = 0.55; // thigh angled back, knees point backwards (so the feet sit under the hips)
const KNEE_BASE = -1.1;
const GAIT_SPEED = 7; // rad/s, about 1.1 steps per second per leg

// Scratch vector for the head's look-at maths (no allocations per frame).
const target = new THREE.Vector3();

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const createMaterials = () => ({
  shell: new THREE.MeshPhysicalMaterial({
    color: '#eef1f6',
    roughness: 0.35,
    metalness: 0.05,
    clearcoat: 0.6,
    clearcoatRoughness: 0.25,
  }),
  dark: new THREE.MeshStandardMaterial({ color: '#1a1f2c', roughness: 0.5, metalness: 0.5 }),
  joint: new THREE.MeshStandardMaterial({ color: '#2b3140', roughness: 0.3, metalness: 0.8 }),
  rubber: new THREE.MeshStandardMaterial({ color: '#0e1117', roughness: 0.9 }),
  accent: new THREE.MeshStandardMaterial({ color: '#fec603', emissive: '#fec603', emissiveIntensity: 0.45, roughness: 0.4 }),
  lens: new THREE.MeshPhysicalMaterial({
    color: '#0b1330',
    roughness: 0.05,
    clearcoat: 1,
    emissive: '#3b6cff',
    emissiveIntensity: 0.9,
  }),
  pad: new THREE.MeshStandardMaterial({ color: '#151a28', roughness: 0.6, metalness: 0.3 }),
  padRing: new THREE.MeshBasicMaterial({ color: '#fec603' }),
  lidar: new THREE.MeshStandardMaterial({ color: '#5cc6f2', emissive: '#5cc6f2', emissiveIntensity: 1.4 }),
  crate: new THREE.MeshStandardMaterial({ color: '#fec603', roughness: 0.55 }),
});

const createGeometries = () => ({
  // Quadruped
  body: new RoundedBoxGeometry(0.5, 0.24, 1.05, 4, 0.09),
  sidePanel: new THREE.BoxGeometry(0.02, 0.13, 0.78),
  stripe: new THREE.BoxGeometry(0.022, 0.025, 0.78),
  head: new RoundedBoxGeometry(0.34, 0.15, 0.16, 3, 0.05),
  eye: new THREE.SphereGeometry(0.035, 16, 12),
  headLight: new THREE.BoxGeometry(0.2, 0.012, 0.01),
  hip: new THREE.SphereGeometry(0.07, 20, 14),
  thigh: new THREE.CapsuleGeometry(0.05, 0.2, 6, 14),
  knee: new THREE.SphereGeometry(0.052, 18, 12),
  shin: new THREE.CapsuleGeometry(0.034, 0.22, 6, 12),
  foot: new THREE.SphereGeometry(0.048, 16, 12),
  pad: new THREE.CylinderGeometry(0.23, 0.23, 0.02, 40),
  padRing: new THREE.RingGeometry(0.17, 0.2, 48),
  // Rover
  chassis: new RoundedBoxGeometry(0.36, 0.14, 0.52, 3, 0.05),
  bumper: new THREE.BoxGeometry(0.34, 0.06, 0.04),
  deck: new THREE.BoxGeometry(0.3, 0.012, 0.44),
  wheel: new THREE.CylinderGeometry(0.065, 0.065, 0.045, 24),
  spoke: new THREE.BoxGeometry(0.012, 0.09, 0.02),
  lidar: new THREE.CylinderGeometry(0.05, 0.05, 0.05, 24),
  lidarBand: new THREE.CylinderGeometry(0.052, 0.052, 0.012, 24),
  lightBar: new THREE.BoxGeometry(0.2, 0.02, 0.01),
  crate: new THREE.BoxGeometry(0.18, 0.14, 0.18),
});

/** One leg: hip → thigh → knee → shin → foot. Swings with a trot gait scaled by `gait` (0 = standing). */
function Leg({ position, phase, gait, materials, geometries }) {
  const hip = useRef(null);
  const knee = useRef(null);
  useFrame((state) => {
    const step = gait.current;
    const cycle = state.clock.elapsedTime * GAIT_SPEED + phase;
    const lift = step * Math.max(0, -Math.cos(cycle)); // foot lifts while it swings forward
    if (hip.current) hip.current.rotation.x = HIP_BASE + step * 0.16 * Math.sin(cycle) - 0.12 * lift;
    if (knee.current) knee.current.rotation.x = KNEE_BASE - 0.45 * lift;
  });
  return (
    <group position={position}>
      <mesh geometry={geometries.hip} material={materials.joint} />
      <group ref={hip} rotation={[HIP_BASE, 0, 0]}>
        <mesh geometry={geometries.thigh} material={materials.shell} position={[0, -0.15, 0]} />
        <mesh geometry={geometries.knee} material={materials.joint} position={[0, -0.3, 0]} />
        <group ref={knee} position={[0, -0.3, 0]} rotation={[KNEE_BASE, 0, 0]}>
          <mesh geometry={geometries.shin} material={materials.dark} position={[0, -0.145, 0]} />
          <mesh geometry={geometries.foot} material={materials.rubber} position={[0, -0.29, 0]} />
        </group>
      </group>
    </group>
  );
}

const LEGS = [
  { position: [0.21, -0.07, 0.38], phase: 0 },
  { position: [-0.21, -0.07, -0.38], phase: 0 },
  { position: [-0.21, -0.07, 0.38], phase: Math.PI },
  { position: [0.21, -0.07, -0.38], phase: Math.PI },
];

/**
 * Four-legged robot. Its head scans the area, or follows `watch` (a ref to an Object3D, e.g. the
 * drone) while that object is in the air above it. gait: ref ({ current: 0..1 }) for stepping.
 * Extra props (position, rotation, ref ...) go to its root group.
 */
export function QuadrupedRobot({ watch, gait, ...props }) {
  const materials = useDisposable(createMaterials);
  const geometries = useDisposable(createGeometries);
  const body = useRef(null);
  const head = useRef(null);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const step = gait.current;
    const cycle = t * GAIT_SPEED;
    if (body.current) {
      body.current.position.y = BODY_Y + 0.012 * Math.cos(2 * cycle) * step + 0.006 * Math.sin(t * 1.6);
      body.current.rotation.z = 0.02 * Math.sin(cycle) * step;
    }
    if (!head.current) return;

    // Look around, or watch the drone while it flies above the robot.
    let yawGoal = 0.35 * Math.sin(t * 0.6);
    let pitchGoal = 0.04;
    if (watch?.current && body.current) {
      watch.current.getWorldPosition(target);
      body.current.worldToLocal(target);
      target.sub(head.current.position);
      const across = Math.hypot(target.x, target.z);
      if (target.y > 0.3) {
        yawGoal = across > 0.35 ? clamp(Math.atan2(target.x, target.z), -0.9, 0.9) : 0;
        pitchGoal = clamp(-Math.atan2(target.y, across), -0.75, 0.2);
      }
    }
    const follow = 1 - Math.exp(-3 * delta);
    head.current.rotation.y += (yawGoal - head.current.rotation.y) * follow;
    head.current.rotation.x += (pitchGoal - head.current.rotation.x) * follow;
  });

  return (
    <group {...props}>
      <group ref={body} position={[0, BODY_Y, 0]}>
        <mesh geometry={geometries.body} material={materials.shell} />
        <mesh geometry={geometries.sidePanel} material={materials.dark} position={[0.255, 0, 0]} />
        <mesh geometry={geometries.sidePanel} material={materials.dark} position={[-0.255, 0, 0]} />
        <mesh geometry={geometries.stripe} material={materials.accent} position={[0.262, 0.045, 0]} />
        <mesh geometry={geometries.stripe} material={materials.accent} position={[-0.262, 0.045, 0]} />

        {/* Drone landing pad on the back */}
        <mesh geometry={geometries.pad} material={materials.pad} position={[0, 0.13, 0]} />
        <mesh geometry={geometries.padRing} material={materials.padRing} position={[0, 0.141, 0]} rotation={[-Math.PI / 2, 0, 0]} />

        {/* Sensor head */}
        <group ref={head} position={[0, 0.03, 0.5]}>
          <mesh geometry={geometries.head} material={materials.dark} position={[0, 0, 0.07]} />
          <mesh geometry={geometries.eye} material={materials.lens} position={[0.08, 0.01, 0.15]} scale={[1, 1, 0.5]} />
          <mesh geometry={geometries.eye} material={materials.lens} position={[-0.08, 0.01, 0.15]} scale={[1, 1, 0.5]} />
          <mesh geometry={geometries.headLight} material={materials.accent} position={[0, -0.045, 0.152]} />
        </group>

        {LEGS.map((leg) => (
          <Leg key={leg.position.join()} {...leg} gait={gait} materials={materials} geometries={geometries} />
        ))}
      </group>
    </group>
  );
}

const WHEELS = [
  [0.195, 0.065, 0.16],
  [-0.195, 0.065, 0.16],
  [0.195, 0.065, -0.16],
  [-0.195, 0.065, -0.16],
];

/**
 * Wheeled delivery robot with a yellow crate and a spinning lidar. wheelSpin: wheel speed in rad/s
 * (match it to how fast the rover is moved). Extra props go to its root group.
 */
export function Rover({ wheelSpin = 9, ...props }) {
  const materials = useDisposable(createMaterials);
  const geometries = useDisposable(createGeometries);
  const wheels = useRef(null);
  const lidar = useRef(null);

  useFrame((_, delta) => {
    wheels.current?.children.forEach((wheel) => {
      wheel.rotation.x += delta * wheelSpin;
    });
    if (lidar.current) lidar.current.rotation.y += delta * 5;
  });

  return (
    <group {...props}>
      <mesh geometry={geometries.chassis} material={materials.shell} position={[0, 0.135, 0]} />
      <mesh geometry={geometries.bumper} material={materials.dark} position={[0, 0.11, 0.27]} />
      <mesh geometry={geometries.bumper} material={materials.dark} position={[0, 0.11, -0.27]} />
      <mesh geometry={geometries.deck} material={materials.dark} position={[0, 0.211, 0]} />
      <mesh geometry={geometries.lightBar} material={materials.accent} position={[0, 0.16, 0.293]} />
      <mesh geometry={geometries.crate} material={materials.crate} position={[0, 0.287, -0.07]} />
      <group ref={lidar} position={[0, 0.242, 0.13]}>
        <mesh geometry={geometries.lidar} material={materials.dark} />
        <mesh geometry={geometries.lidarBand} material={materials.lidar} position={[0, 0.006, 0]} />
      </group>
      <group ref={wheels}>
        {WHEELS.map(([x, y, z]) => (
          <group key={`${x}-${z}`} position={[x, y, z]}>
            <mesh geometry={geometries.wheel} material={materials.rubber} rotation={[0, 0, Math.PI / 2]} />
            <mesh geometry={geometries.spoke} material={materials.joint} position={[x > 0 ? 0.025 : -0.025, 0, 0]} />
          </group>
        ))}
      </group>
    </group>
  );
}
