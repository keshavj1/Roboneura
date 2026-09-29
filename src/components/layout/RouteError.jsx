import { isRouteErrorResponse, Link, useRouteError } from 'react-router';
import './RouteError.css';

/** Shown if a page fails to render. Keeps the visitor one click away from home. */
export function RouteError() {
  const error = useRouteError();
  const message = isRouteErrorResponse(error) ? `${error.status} ${error.statusText}` : 'Something went wrong.';

  return (
    <div className="route-error" role="alert">
      <p className="route-error__code">Error</p>
      <h1>{message}</h1>
      <p>Please try again, or go back to the home page.</p>
      <div className="route-error__actions">
        <button type="button" className="btn btn--primary btn--md" onClick={() => window.location.reload()}>
          Reload page
        </button>
        <Link to="/" className="btn btn--outline-light btn--md">
          Go to home page
        </Link>
      </div>
    </div>
  );
}
