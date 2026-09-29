import { img } from '../../lib/assets';
import { cx } from '../../lib/cx';
import { Button } from '../ui/Button';
import { Img } from '../ui/Img';
import { Reveal } from '../ui/Reveal';
import { TitleText } from '../ui/TitleText';
import './CtaBanner.css';

/** Closing call-to-action card ("Let's Build Something Intelligent Together"). *Word* = accent. */
export function CtaBanner({
  title = 'Let’s Build Something *Intelligent* Together',
  text = 'Partner with us for innovative robotics and drone solutions.',
  action = { label: 'Contact Us', to: '/contact' },
  image = img('cta-drone.webp'),
  tone = 'light',
  flushTop = false,
}) {
  return (
    <section className={cx('section section--md cta-section', `tone-${tone}`, flushTop && 'section--flush-top')}>
      <div className="container">
        <Reveal className="cta">
          <div className="cta__body">
            <h2 className="cta__title">
              <TitleText>{title}</TitleText>
            </h2>
            <p className="cta__text">{text}</p>
            <Button to={action.to} href={action.href} size="lg" className="cta__button">
              {action.label}
            </Button>
          </div>
          <div className="cta__media">
            <Img src={image} alt="" fill position="center 45%" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
