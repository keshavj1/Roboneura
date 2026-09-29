import { useState } from 'react';
import { site } from '../../config/site';
import { projectCategories, projects } from '../../data/projects';
import { categoryHue } from '../../lib/hues';
import { FilterPills } from '../ui/FilterPills';
import { Img } from '../ui/Img';
import { Reveal } from '../ui/Reveal';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import './CaseStudies.css';

/** "Case Studies from the Field" with category filter. `limitAll` caps the "All" view. */
export function CaseStudies({
  tone = 'light',
  limitAll = 3,
  eyebrow = 'Featured Projects',
  title = 'Case Studies from the *Field*',
  className,
}) {
  const [filter, setFilter] = useState('All');
  const matching = projects.filter((project) => filter === 'All' || project.category === filter);
  const shown = filter === 'All' ? matching.slice(0, limitAll) : matching;

  return (
    <Section tone={tone} spacing="lg" className={className}>
      <Reveal>
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          actions={
            <FilterPills options={projectCategories} value={filter} onChange={setFilter} label="Filter case studies" />
          }
        />
      </Reveal>

      {/* Keyed by filter so the staggered fade replays on every change. */}
      <ul role="list" className="projects stagger" key={filter}>
        {shown.map((project, index) => (
          <li key={project.title} style={{ '--i': index }}>
            <article className="project" data-tilt="">
              <Img src={project.image} alt="" fill />
              <div className="project__shade" aria-hidden="true" />
              <div className="project__body">
                <span className={`project__tag hue-${categoryHue(project.category)}`}>{project.category}</span>
                <h3 className="project__title">{project.title}</h3>
                <p className="project__result">
                  {project.result}
                  {site.flags.showPlaceholderNotes && ' (placeholder)'}
                </p>
              </div>
            </article>
          </li>
        ))}
      </ul>
      <p className="sr-only" aria-live="polite">
        {shown.length} case studies shown
      </p>
    </Section>
  );
}
