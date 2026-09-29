import { Link } from 'react-router';
import { industries } from '../../data/industries';
import { Button } from '../ui/Button';
import { IconBox } from '../ui/IconBox';
import { CheckCircleIcon } from '../ui/icons';
import { Img } from '../ui/Img';
import { Modal } from '../ui/Modal';
import './SolutionModal.css';

const industryById = Object.fromEntries(industries.map((industry) => [industry.id, industry]));

/** "Learn More" details for a solution. Pass solution={null} to close. */
export function SolutionModal({ solution, onClose }) {
  return (
    <Modal open={Boolean(solution)} onClose={onClose} labelledBy="solution-modal-title" size="lg">
      {solution && (
        <div className={`solution-modal hue-${solution.hue}`}>
          <div className="solution-modal__media">
            <Img src={solution.image} alt={solution.imageAlt} fill position={solution.imagePosition} />
          </div>
          <div className="solution-modal__body">
            <p className="eyebrow">
              <IconBox icon={solution.icon} size={40} tone="soft" iconSize={22} />
              {solution.kicker}
            </p>
            <h2 id="solution-modal-title" className="solution-modal__title">
              {solution.title}
            </h2>
            <p className="solution-modal__text">{solution.body}</p>

            <h3 className="solution-modal__subtitle">What we deliver</h3>
            <ul role="list" className="check-list solution-modal__list">
              {solution.features.map((feature) => (
                <li key={feature}>
                  <CheckCircleIcon weight="duotone" aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>

            <h3 className="solution-modal__subtitle">Typical projects</h3>
            <ul role="list" className="solution-modal__uses">
              {solution.useCases.map((useCase) => (
                <li key={useCase}>{useCase}</li>
              ))}
            </ul>

            <h3 className="solution-modal__subtitle">Industries</h3>
            <ul role="list" className="tag-list">
              {solution.industries.map((id) => (
                <li key={id}>
                  <Link to={`/industries#${id}`} className="tag">
                    {industryById[id]?.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="solution-modal__actions">
              <Button to={`/contact?interest=${encodeURIComponent(solution.interest)}`}>Request a Consultation</Button>
              <Button to={`/solutions#${solution.id}`} variant="outline">
                See full details
              </Button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
