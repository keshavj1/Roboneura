import { useId, useState } from 'react';
import { cx } from '../../lib/cx';
import { PlusIcon } from './icons';
import './Accordion.css';

/** Disclosure list; one item open at a time (index `defaultOpen`, or -1 for none). */
export function Accordion({ items, defaultOpen = 0, headingLevel: Heading = 'h3' }) {
  const [openIndex, setOpenIndex] = useState(defaultOpen);
  const baseId = useId();

  return (
    <div className="accordion">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const buttonId = `${baseId}-q${index}`;
        const panelId = `${baseId}-a${index}`;
        return (
          <div key={item.q} className={cx('accordion__item', isOpen && 'is-open')}>
            <Heading className="accordion__heading">
              <button
                id={buttonId}
                type="button"
                className="accordion__button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
              >
                <span>{item.q}</span>
                <span className="accordion__icon" aria-hidden="true">
                  <PlusIcon weight="bold" />
                </span>
              </button>
            </Heading>
            <div id={panelId} role="region" aria-labelledby={buttonId} className="accordion__panel" inert={!isOpen}>
              <div className="accordion__inner">
                <p>{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
