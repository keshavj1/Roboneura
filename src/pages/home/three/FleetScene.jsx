import { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { DroneModel } from './DroneModel';
import { canvasTexture, ease, glowTexture, lerp, lerpAngle, setUpRenderer, useDisposable } from './kit';
import { QuadrupedRobot, Rover } from './RobotModels';

/*
 * "Why Choose ROBONEURA?", "Fig. 2": a small fleet on a round platform. The quadruped robot
 * turns on the spot, a rover drives around the rim, and the drone takes off from the robot's
 * back, circles the scene and lands again (the robot watches it). Loaded through LazyScene.
 */

const PLATFORM_R = 1.75;
const ROVER_R = 1.3;
const ROVER_SPEED = 0.45; // rad/s around the platform
const DRONE_SCALE = 0.42;
const LANDED_Y = 0.76 + 0.48 * DRONE_SCALE; // pad top + skid depth
const HOVER_Y = LANDED_Y + 0.9;
const ORBIT_R = 1.15;
const ORBIT_Y = 1.85;
const ORBIT_SPEED = 0.95;
const CYCLE = 15; // seconds per take-off → orbit → landing loop

/** Where the drone is at time `c` (0..CYCLE) of its loop. Returns [x, y, z, yaw, pitch, roll, propSpeed, flying]. */
function flightAt(c, robotYaw) {
  const orbitAngle = (c - 3) * ORBIT_SPEED;
  const orbit = [Math.cos(orbitAngle) * ORBIT_R, ORBIT_Y + 0.06 * Math.sin(c * 2), Math.sin(orbitAngle) * ORBIT_R];
  const heading = -orbitAngle; // facing along the circle

  if (c < 1.4) return [0, LANDED_Y, 0, robotYaw, 0, 0, 0.2 + 0.8 * ease(c / 1.4), false];
  if (c < 3) {
    const up = ease((c - 1.4) / 1.6);
    return [0, lerp(LANDED_Y, HOVER_Y, up), 0, robotYaw, 0, 0.03 * Math.sin(c * 5), 1, true];
  }
  if (c < 11.7) {
    // Out to the circle, round it, and back to the centre.
    const out = c < 4.2 ? ease((c - 3) / 1.2) : c > 10.5 ? 1 - ease((c - 10.5) / 1.2) : 1;
    return [
      orbit[0] * out,
      lerp(HOVER_Y, orbit[1], out),
      orbit[2] * out,
      lerpAngle(robotYaw, heading, out),
      0.14 * out,
      -0.2 * out,
      1,
      true,
    ];
  }
  if (c < 13.6) {
    const down = ease((c - 11.7) / 1.9);
    return [0, lerp(HOVER_Y, LANDED_Y, down), 0, robotYaw, 0, 0.03 * Math.sin(c * 5) * (1 - down), 1, true];
  }
  return [0, LANDED_Y, 0, robotYaw, 0, 0, 1 - 0.8 * ease((c - 13.6) / 1.4), false];
}

const createStage = () => ({
  base: new THREE.CylinderGeometry(PLATFORM_R, PLATFORM_R + 0.08, 0.12, 72),
  baseMaterial: new THREE.MeshStandardMaterial({ color: '#141c3a', roughness: 0.45, metalness: 0.6 }),
  top: new THREE.CircleGeometry(PLATFORM_R - 0.02, 72),
  // Hexagon grid on the platform, fading towards the edge.
  topTexture: canvasTexture(512, (ctx, size) => {
    const r = 18;
    const w = Math.sqrt(3) * r;
    ctx.strokeStyle = 'rgba(157, 180, 236, 0.35)';
    ctx.lineWidth = 1.5;
    for (let row = -1; row * 1.5 * r < size + r; row += 1) {
      for (let col = -1; col * w < size + w; col += 1) {
        const cx = col * w + (row % 2 ? w / 2 : 0);
        const cy = row * 1.5 * r;
        ctx.beginPath();
        for (let k = 0; k < 6; k += 1) {
          const angle = (Math.PI / 3) * k + Math.PI / 6;
          ctx.lineTo(cx + r * Math.cos(angle), cy + r * Math.sin(angle));
        }
        ctx.closePath();
        ctx.stroke();
      }
    }
    const fade = ctx.createRadialGradient(size / 2, size / 2, size * 0.1, size / 2, size / 2, size / 2);
    fade.addColorStop(0, 'rgba(0, 0, 0, 0)');
    fade.addColorStop(1, 'rgba(0, 0, 0, 1)');
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = fade;
    ctx.fillRect(0, 0, size, size);
  }),
  topMaterial: new THREE.MeshBasicMaterial({ transparent: true, depthWrite: false }),
  rim: new THREE.RingGeometry(PLATFORM_R - 0.07, PLATFORM_R - 0.02, 128),
  rimMaterial: new THREE.MeshBasicMaterial({ color: '#fec603', transparent: true, opacity: 0.9 }),
  track: new THREE.RingGeometry(ROVER_R - 0.012, ROVER_R + 0.012, 128),
  trackMaterial: new THREE.MeshBasicMaterial({ color: '#9db4ec', transparent: true, opacity: 0.35 }),
  glow: new THREE.CircleGeometry(PLATFORM_R + 0.9, 64),
  glowTexture: glowTexture([
    [0, 'rgba(90, 120, 220, 0.5)'],
    [0.55, 'rgba(60, 90, 200, 0.18)'],
    [1, 'rgba(35, 62, 152, 0)'],
  ]),
  glowMaterial: new THREE.MeshBasicMaterial({ transparent: true, depthWrite: false }),
});

/** Round platform with a hexagon grid, a yellow rim and the rover's track. */
function Stage() {
  const stage = useDisposable(createStage);
  return (
    <group>
      <mesh geometry={stage.glow} material={stage.glowMaterial} material-map={stage.glowTexture} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.13, 0]} />
      <mesh geometry={stage.base} material={stage.baseMaterial} position={[0, -0.06, 0]} />
      <mesh geometry={stage.top} material={stage.topMaterial} material-map={stage.topTexture} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0]} />
      <mesh geometry={stage.rim} material={stage.rimMaterial} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.004, 0]} />
      <mesh geometry={stage.track} material={stage.trackMaterial} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.004, 0]} />
    </group>
  );
}

function Fleet({ onReady }) {
  const robot = useRef(null);
  const rover = useRef(null);
  const drone = useRef(null);
  const gait = useRef(0);
  const propSpeed = useRef(0.2);
  const robotYaw = useRef(-0.5);

  useEffect(() => {
    onReady?.();
  }, [onReady]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const c = t % CYCLE;

    // The rover drives round the rim, counter-clockwise.
    const angle = t * ROVER_SPEED;
    rover.current?.position.set(Math.cos(angle) * ROVER_R, 0, Math.sin(angle) * ROVER_R);
    if (rover.current) rover.current.rotation.y = -angle;

    // The drone flies its loop; the robot stands still for take-off and landing, and turns on
    // the spot (stepping) while the drone is away.
    const [x, y, z, yaw, pitch, roll, speed, flying] = flightAt(c, robotYaw.current);
    const away = flying && c > 3.2 && c < 11.4;
    gait.current += ((away ? 1 : 0) - gait.current) * (1 - Math.exp(-3 * delta));
    robotYaw.current += delta * 0.32 * gait.current;
    if (robot.current) robot.current.rotation.y = robotYaw.current;

    propSpeed.current = speed;
    if (drone.current) {
      drone.current.position.set(x, y, z);
      drone.current.rotation.set(pitch, yaw, roll);
    }
  });

  return (
    <>
      <Stage />
      <QuadrupedRobot ref={robot} watch={drone} gait={gait} />
      <Rover ref={rover} wheelSpin={(ROVER_SPEED * ROVER_R) / 0.065} />
      <DroneModel ref={drone} speed={propSpeed} scale={DRONE_SCALE} rotation={[0, 0, 0, 'YXZ']} />
    </>
  );
}

function aimCamera(state) {
  setUpRenderer(state);
  state.camera.lookAt(0, 0.6, 0);
}

/** Canvas with lights and the fleet. `active` pauses rendering while the section is off screen. */
export default function FleetScene({ active, onReady }) {
  return (
    <Canvas
      className="scene3d__canvas"
      style={{ position: 'absolute', inset: 0 }}
      frameloop={active ? 'always' : 'never'}
      dpr={[1, 2]}
      camera={{ position: [3.3, 2.75, 4.3], fov: 36 }}
      gl={{ antialias: true, alpha: true }}
      onCreated={aimCamera}
    >
      <ambientLight intensity={0.35} />
      <hemisphereLight args={['#dbe6ff', '#0b1330', 0.9]} />
      <directionalLight position={[4, 7, 5]} intensity={2.3} />
      <directionalLight position={[-5, 3, -4]} intensity={1.7} color="#8fa6ee" />
      <Fleet onReady={onReady} />
    </Canvas>
  );
}
