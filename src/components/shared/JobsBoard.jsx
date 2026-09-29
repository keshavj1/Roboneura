import { useState } from 'react';
import { jobDepartments, jobs } from '../../data/jobs';
import { Button } from '../ui/Button';
import { FilterPills } from '../ui/FilterPills';
import { BriefcaseIcon, ClockIcon, MapPinIcon } from '../ui/icons';
import { PlaceholderNote } from '../ui/PlaceholderNote';
import { Reveal } from '../ui/Reveal';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import './JobsBoard.css';

/** Open roles with a department filter. "Apply Now" pre-fills the contact form. */
export function JobsBoard({
  id,
  tone = 'light',
  eyebrow = 'Careers',
  title = 'Build the *Future* with Us',
  lead = 'We hire engineers who like to see their work run outside the lab.',
  showCareersLink = false,
}) {
  const [department, setDepartment] = useState('All');
  const shown = jobs.filter((job) => department === 'All' || job.dept === department);

  return (
    <Section id={id} tone={tone} spacing="lg">
      <Reveal>
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          lead={lead}
          actions={
            <FilterPills options={jobDepartments} value={department} onChange={setDepartment} label="Filter roles by team" />
          }
        />
      </Reveal>

      <ul role="list" className="jobs stagger" key={department}>
        {shown.map((job, index) => (
          <li key={job.id} className="job" style={{ '--i': index }}>
            <div className="job__main">
              <h3 className="job__title">{job.title}</h3>
              <p className="job__meta">
                <span>
                  <BriefcaseIcon weight="duotone" aria-hidden="true" />
                  <span className="sr-only">Team: </span>
                  {job.dept}
                </span>
                <span>
                  <MapPinIcon weight="duotone" aria-hidden="true" />
                  <span className="sr-only">Location: </span>
                  {job.location}
                </span>
                <span>
                  <ClockIcon weight="duotone" aria-hidden="true" />
                  <span className="sr-only">Type: </span>
                  {job.type}
                </span>
              </p>
            </div>
            <Button
              to={`/contact?interest=Careers&role=${encodeURIComponent(job.title)}`}
              variant="dark"
              size="sm"
              aria-label={`Apply now for ${job.title}`}
            >
              Apply Now
            </Button>
          </li>
        ))}
      </ul>
      <p className="sr-only" aria-live="polite">
        {shown.length} roles shown
      </p>

      <div className="jobs__footer">
        <PlaceholderNote>* Example roles, replace with current openings.</PlaceholderNote>
        {showCareersLink && (
          <Button to="/careers" variant="link">
            Life at ROBONEURA and how we hire
          </Button>
        )}
      </div>
    </Section>
  );
}
