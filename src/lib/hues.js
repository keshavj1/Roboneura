import { solutionById } from '../data/solutions';

/**
 * The five logo colours, in the order of the logo's stripes. Lists colour-code their icons and
 * badges with them (CSS classes .hue-blue, .hue-yellow, ... in src/styles/base.css).
 */
export const HUES = ['blue', 'yellow', 'magenta', 'cyan', 'purple'];

/** Colour for the n-th item of a list, cycling through the logo colours. */
export const hueAt = (index) => HUES[index % HUES.length];

/** Colour of a solution category such as "Drones" or "Vision" (the solution's own `hue`). */
export const categoryHue = (category) => solutionById[category.toLowerCase()]?.hue ?? HUES[0];
