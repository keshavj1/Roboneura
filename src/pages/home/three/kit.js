import { useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

/*
 * Shared helpers for the home page's three.js scenes (hero drone, "Why Choose" fleet).
 * This module imports three.js, so only the lazily loaded scene files may import it.
 */

/** Creates three.js resources (materials, geometries, textures) once and frees them on unmount. */
export function useDisposable(create) {
  const resources = useMemo(() => create(), [create]);
  useEffect(() => () => Object.values(resources).forEach((item) => item.dispose?.()), [resources]);
  return resources;
}

/**
 * Renderer set-up for a <Canvas onCreated>: neutral studio reflections generated on the GPU
 * (no environment map to download). Shader log checks are off because Windows' Direct3D shader
 * compiler reports harmless precision warnings for three.js' built-in shaders.
 */
export function setUpRenderer({ gl, scene }) {
  gl.debug.checkShaderErrors = false;
  const pmrem = new THREE.PMREMGenerator(gl);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.55;
  pmrem.dispose();
}

/** Texture drawn on a 2D canvas: draw(ctx, size). */
export function canvasTexture(size, draw) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  draw(canvas.getContext('2d'), size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

/** Soft round glow as an alpha gradient (works on a transparent canvas). stops: [[offset, rgba], ...] */
export function glowTexture(stops) {
  return canvasTexture(128, (ctx, size) => {
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    stops.forEach(([offset, color]) => gradient.addColorStop(offset, color));
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
  });
}

// Animation helpers
export const clamp01 = (value) => Math.min(1, Math.max(0, value));
/** Smoothstep easing of a 0..1 progress value. */
export const ease = (value) => {
  const x = clamp01(value);
  return x * x * (3 - 2 * x);
};
export const lerp = (from, to, amount) => from + (to - from) * amount;
/** Interpolates between two angles along the shorter way round. */
export function lerpAngle(from, to, amount) {
  const turn = Math.PI * 2;
  const delta = ((((to - from) % turn) + turn * 1.5) % turn) - Math.PI;
  return from + delta * amount;
}
