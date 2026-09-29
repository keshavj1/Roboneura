import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router/dom';
// Poppins in the four weights the site uses; Playfair Display italic for accent words in titles.
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import '@fontsource-variable/playfair-display/wght-italic.css';
import './styles/tokens.css';
import './styles/base.css';
import './styles/animations.css';
import './components/ui/Button.css';
import { site } from './config/site';
import { hidePreloader } from './lib/preloader';
import { router } from './router';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

hidePreloader({ enabled: site.flags.showPreloader });
