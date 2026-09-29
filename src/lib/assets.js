const BASE = import.meta.env.BASE_URL; // "/" or e.g. "/roboneura/"

/** URL of a photo in public/images, respecting a sub-folder deployment. */
export const img = (file) => `${BASE}images/${file}`;
