import { createBrowserRouter } from 'react-router';
import { RootLayout } from './components/layout/RootLayout';
import { RouteError } from './components/layout/RouteError';
import HomePage from './pages/home/HomePage';
import NotFoundPage from './pages/NotFoundPage';

// Other pages load on demand (the router fetches the file before showing the page).
const page = (load) => async () => ({ Component: (await load()).default });

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <RootLayout />,
      errorElement: <RouteError />,
      // Shown only while the first page's code loads; the preloader covers the screen anyway.
      hydrateFallbackElement: <div className="page-loading" />,
      children: [
        {
          // Page-level errors render inside the layout, so header and footer stay usable.
          errorElement: <RouteError />,
          children: [
            { index: true, element: <HomePage /> },
            { path: 'about', lazy: page(() => import('./pages/about/AboutPage')) },
            { path: 'owner', lazy: page(() => import('./pages/owner/OwnerPage')) },
            { path: 'solutions', lazy: page(() => import('./pages/solutions/SolutionsPage')) },
            { path: 'industries', lazy: page(() => import('./pages/industries/IndustriesPage')) },
            { path: 'technology', lazy: page(() => import('./pages/technology/TechnologyPage')) },
            { path: 'careers', lazy: page(() => import('./pages/careers/CareersPage')) },
            { path: 'contact', lazy: page(() => import('./pages/contact/ContactPage')) },
            { path: 'privacy-policy', lazy: page(() => import('./pages/legal/PrivacyPolicyPage')) },
            { path: 'terms', lazy: page(() => import('./pages/legal/TermsPage')) },
            { path: '*', element: <NotFoundPage /> },
          ],
        },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL },
);
