import { useEffect, useState } from 'react';
import { AwardsGrid } from '../../components/shared/AwardsGrid';
import { CountUp } from '../../components/ui/CountUp';
import { CaretLeftIcon, CaretRightIcon, QuotesIcon, SmileyIcon } from '../../components/ui/icons';
import { PlaceholderNote } from '../../components/ui/PlaceholderNote';
import { Reveal } from '../../components/ui/Reveal';
import { Section } from '../../components/ui/Section';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { satisfaction } from '../../data/company';
import { testimonials } from '../../data/content';
import { useDocumentVisible } from '../../hooks/useDocumentVisible';
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery';
import { cx } from '../../lib/cx';

const INTERVAL_MS = 7000;

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [stopped, setStopped] = useState(false); // any manual navigation stops autoplay for good
  const visible = useDocumentVisible();
  const reduced = usePrefersReducedMotion();
  const count = testimonials.length;
  const autoplay = !paused && !stopped && visible && !reduced;

  useEffect(() => {
    if (!autoplay) return undefined;
    const timer = setInterval(() => setIndex((current) => (current + 1) % count), INTERVAL_MS);
    return () => clearInterval(timer);
  }, [autoplay, count]);

  const goTo = (next) => {
    setStopped(true);
    setIndex((next + count) % count);
  };

  return (
    <Section tone="white">
      <Reveal>
        <SectionHeading title="What Our Clients *Say*" lead="Trusted by industries. Chosen for innovation." />
      </Reveal>

      <Reveal delay={100} className="testimonials">
        <div
          className="t-card"
          role="group"
          aria-roledescription="carousel"
          aria-label="Client testimonials"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
          }}
        >
          <QuotesIcon weight="duotone" className="t-card__icon" aria-hidden="true" />
          <div className="t-slides" aria-live={autoplay ? 'off' : 'polite'}>
            {testimonials.map((item, i) => (
              <figure
                key={`${item.name}-${i}`}
                className={cx('t-slide', i === index && 'is-active')}
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${count}`}
                aria-hidden={i !== index}
                inert={i !== index}
              >
                <blockquote className="t-slide__quote">
                  <p>“{item.quote}”</p>
                </blockquote>
                <figcaption className="t-slide__author">
                  <span className="t-slide__avatar" aria-hidden="true">
                    {item.initials}
                  </span>
                  <span>
                    <span className="t-slide__name">{item.name}</span>
                    <span className="t-slide__role">{item.role}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="t-controls">
            <button type="button" className="t-arrow" onClick={() => goTo(index - 1)} aria-label="Previous testimonial">
              <CaretLeftIcon aria-hidden="true" />
            </button>
            <div className="t-dots">
              {testimonials.map((item, i) => (
                <button
                  key={`${item.name}-dot-${i}`}
                  type="button"
                  className={cx('t-dot', i === index && 'is-active')}
                  onClick={() => goTo(i)}
                  aria-label={`Show testimonial ${i + 1}`}
                  aria-current={i === index ? 'true' : undefined}
                />
              ))}
            </div>
            <button type="button" className="t-arrow" onClick={() => goTo(index + 1)} aria-label="Next testimonial">
              <CaretRightIcon aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="t-score">
          <div className="t-score__row">
            <CountUp end={satisfaction.value} suffix={satisfaction.suffix} className="t-score__value" />
            <SmileyIcon weight="duotone" className="t-score__icon" aria-hidden="true" />
          </div>
          <p className="t-score__label">{satisfaction.label}</p>
          <PlaceholderNote>* Placeholder figure</PlaceholderNote>
        </div>
      </Reveal>

      <div className="testimonials__awards">
        <AwardsGrid variant="inline" />
      </div>
    </Section>
  );
}
