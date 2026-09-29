import { Link } from 'react-router';
import { industries } from '../../data/industries';
import { hueAt } from '../../lib/hues';
import { IconBox } from '../ui/IconBox';
import { Img } from '../ui/Img';
import { Reveal } from '../ui/Reveal';
import './IndustriesGrid.css';

/** Compact industry cards linking to their section on the Industries page. */
export function IndustriesGrid() {
  return (
    <ul role="list" className="industries">
      {industries.map((industry, index) => (
        <Reveal as="li" key={industry.id} delay={(index % 4) * 80}>
          <Link to={`/industries#${industry.id}`} className="industry-card" data-tilt="">
            <Img src={industry.image} alt="" ratio="130 / 72" position={industry.imagePosition} />
            <div className="industry-card__body">
              <IconBox
                icon={industry.icon}
                size={40}
                tone="solid"
                hue={hueAt(index)}
                iconSize={20}
                className="industry-card__badge"
              />
              <h3 className="industry-card__name">{industry.name}</h3>
            </div>
          </Link>
        </Reveal>
      ))}
    </ul>
  );
}
