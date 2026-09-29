import { useRef } from 'react';
import { Outlet, ScrollRestoration } from 'react-router';
import { useGlobalTilt } from '../../hooks/useGlobalTilt';
import { useRouteFocus } from '../../hooks/useRouteFocus';
import { BackToTop } from './BackToTop';
import { Footer } from './Footer';
import { Header } from './Header';

export function RootLayout() {
  const mainRef = useRef(null);
  useGlobalTilt();
  useRouteFocus(mainRef);

  const skipToContent = (event) => {
    event.preventDefault();
    mainRef.current?.focus();
  };

  return (
    <>
      {/* First child on purpose: scroll is reset before pages measure their reveal positions. */}
      <ScrollRestoration />
      <a className="skip-link" href="#main" onClick={skipToContent}>
        Skip to content
      </a>
      <Header />
      <main id="main" ref={mainRef} tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
