import { PageHero } from '../components/shared/PageHero';
import { Button } from '../components/ui/Button';
import { HouseIcon } from '../components/ui/icons';
import { Seo } from '../components/ui/Seo';

export default function NotFoundPage() {
  return (
    <>
      <Seo title="Page not found" description="The page you are looking for could not be found." noindex />
      <PageHero
        crumb="Page not found"
        title="This page has moved, or never existed"
        lead="The link may be out of date. Try the home page, or tell us what you were looking for."
      >
        <div className="not-found__actions">
          <Button to="/" icon={HouseIcon} iconPosition="start">
            Back to home
          </Button>
          <Button to="/contact" variant="outline-light">
            Contact us
          </Button>
        </div>
      </PageHero>
    </>
  );
}
