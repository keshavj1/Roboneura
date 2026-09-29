import { PageHero } from '../../components/shared/PageHero';
import { PlaceholderNote } from '../../components/ui/PlaceholderNote';
import { Section } from '../../components/ui/Section';
import { Seo } from '../../components/ui/Seo';
import { site } from '../../config/site';
import './legal.css';

/** Renders a legal document from src/data/legal.js (Privacy Policy, Terms & Conditions). */
export default function LegalPage({ doc }) {
  return (
    <>
      <Seo title={doc.title} description={doc.intro} />
      <PageHero crumb={doc.title} title={doc.title} lead={`Last updated: ${doc.updated}`} />
      <Section tone="light">
        <article className="legal">
          <p className="legal__intro">{doc.intro}</p>
          {doc.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
          <section>
            <h2>Contact</h2>
            <p>
              Questions about this page? Write to <a href={`mailto:${site.email.info}`}>{site.email.info}</a> or call{' '}
              <a href={site.phone.href}>{site.phone.display}</a>.
            </p>
          </section>
          <PlaceholderNote>* Template text: have it reviewed by your legal advisor before launch.</PlaceholderNote>
        </article>
      </Section>
    </>
  );
}
