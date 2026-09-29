import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Phosphor ships six weights of every icon; this site only uses regular, duotone,
 * bold and fill. Dropping the "thin" and "light" SVG paths at build time removes
 * about a third of the icon data from the bundle. (Dev server is unaffected.)
 */
function trimPhosphorWeights() {
  const unusedWeight = /,\r?\n {2}\[\r?\n {4}"(?:thin|light)",[\s\S]*?\r?\n {2}\]/g;
  return {
    name: 'trim-phosphor-weights',
    apply: 'build',
    transform(code, id) {
      if (!/[\\/]@phosphor-icons[\\/]react[\\/]dist[\\/]defs[\\/]/.test(id)) return null;
      return { code: code.replace(unusedWeight, ''), map: null };
    },
  };
}

// VITE_BASE lets the site live in a sub-folder (e.g. "/roboneura/").
// The router basename and image paths follow import.meta.env.BASE_URL automatically.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    base: env.VITE_BASE || '/',
    plugins: [react(), trimPhosphorWeights()],
    build: {
      // The home hero's 3D drone (three.js, ~240 kB gzipped) is one lazily loaded chunk of ~900 kB.
      chunkSizeWarningLimit: 1000,
      rolldownOptions: {
        output: {
          // React + router change rarely: a separate chunk stays cached across site updates.
          codeSplitting: {
            groups: [
              {
                name: 'react-vendor',
                test: /[\\/]node_modules[\\/](react|react-dom|react-router|scheduler|cookie|set-cookie-parser)[\\/]/,
                priority: 20,
              },
            ],
          },
        },
      },
    },
  };
});
